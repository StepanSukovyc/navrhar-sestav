"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Bar.WebClient.GBardnxx.js                                                        </Name>
//    <Description> GBardnxx                                                                                  </Description>
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
    var Bar;
    (function (Bar) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GBardnxx = class GBardnxx extends Gordic.GContentBase {
                constructor() {
                    //        title = "Balancovani"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    //        taskId = "actBalancniVerzeData"; // označení položky v taskListu
                    super(...arguments);
                    this.sirka_sloupce_koef = 4;
                    this.row = null;
                    this.akt_podminka_all = " 1==1 ";
                }
                ;
                ;
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    $tab.empty();
                    this.title = "Balancovani";
                    this.actions.addRange({
                        actClose: {
                            caption: "Zrušit",
                            tooltip: "Zrušit",
                            run: function () { that.tryClose(); }
                        }
                    });
                    this.actions.add(GAction.createPrintAction({
                        name: "actTiskBal",
                        tema: "bar_ptm_barbase",
                        caption: "Tisk",
                        tooltip: "Tisk",
                        parentContent: that,
                        serverParameterMethod: "Gordic.Bar.WebClient.GBardnxx:ConvertReportParams",
                        reportStarting: (rep) => {
                            return this.generateReport(rep);
                        }
                    }));
                    this.actions.addRange({
                        actNacist: {
                            caption: "Vybrat",
                            tooltip: "Vybrat",
                            run: function () { that.nacti_data(); }
                        }
                    });
                    this.actions.addRange({
                        actVerze: {
                            caption: "Verze",
                            tooltip: "Verze",
                            run: function () { that.verze(); }
                        }
                    });
                    this.actions.addRange({
                        actZrusitFiltr: {
                            caption: "Zrušit filtr",
                            tooltip: "Zrušit filtr",
                            run: function () { that.zrusit_filtr(); }
                        }
                    });
                    this.actions.addRange({
                        actUlozitVerzi: {
                            caption: "Uložit",
                            tooltip: "Uložit",
                            run: function () {
                                this.setPending(that.ulozit_verzi());
                            }
                        }
                    });
                    this.actions.addRange({
                        actHodnota: {
                            caption: "Hodnota",
                            tooltip: "Hodnota",
                            run: function () {
                                var puvodni_castka_c0 = new Decimal(0);
                                var puvodni_castka_c1 = new Decimal(0);
                                var vybraneRadky = that.$mainTable.ggrid("getSelection", true);
                                if (vybraneRadky.length >= 0) {
                                    vybraneRadky.forEach((r) => {
                                        puvodni_castka_c0 = parseDecimal(puvodni_castka_c0).plus(parseDecimal(r.data.c0));
                                        puvodni_castka_c1 = parseDecimal(puvodni_castka_c1).plus(parseDecimal(r.data.c1));
                                    });
                                    //that.view_ISL.process({ procenta: null });
                                    //that.view_ISL.process({ sumare: null });
                                    //that.view_ISL.process({ summaryRow: null });
                                    that.zmenaHodnotyHrom(puvodni_castka_c0, puvodni_castka_c1).then(function (nove_castky) {
                                        var nova_castka_c0 = nove_castky.c0_new_balanc;
                                        var nova_castka_c1 = nove_castky.c1_new_balanc;
                                        var nova_castka_c0_radek = new Decimal(0);
                                        var nova_castka_c1_radek = new Decimal(0);
                                        vybraneRadky.forEach((r) => {
                                            if (r) {
                                                nova_castka_c0_radek = new Decimal(0);
                                                nova_castka_c1_radek = new Decimal(0);
                                                if (!puvodni_castka_c0.eq(0)) {
                                                    nova_castka_c0_radek = parseDecimal(r.data.c0).mul(parseDecimal(nova_castka_c0).div(parseDecimal(puvodni_castka_c0)));
                                                }
                                                if (!puvodni_castka_c1.eq(0)) {
                                                    nova_castka_c1_radek = parseDecimal(r.data.c1).mul(parseDecimal(nova_castka_c1).div(parseDecimal(puvodni_castka_c1)));
                                                }
                                                if (r.data.c0_new != nova_castka_c0_radek) {
                                                    r.data.c0_new = nova_castka_c0_radek;
                                                    r.data.sor_id = 1;
                                                }
                                                if (r.data.c1_new != nova_castka_c1_radek) {
                                                    r.data.c1_new = nova_castka_c1_radek;
                                                    r.data.sor_id = 1;
                                                }
                                                if (r.data.sor_id == 1) {
                                                    //that.view_ISL.updateData(r, "update");
                                                }
                                            }
                                        });
                                        that.view_ISL.updateData(vybraneRadky, "update");
                                        //that.view_ISL.process({ procenta: that.procenta_processor });
                                        //that.view_ISL.process({ sumare: that.sumare_processor });
                                    });
                                    ;
                                }
                            }
                        }
                    });
                    this.menubarparametry = this.actions.createBar([
                        { action: this.actions.actTiskBal, favorite: true },
                        { type: "separator" },
                        { action: this.actions.actVerze, favorite: true },
                        { action: this.actions.actNacist, favorite: true },
                        { action: this.actions.actZrusitFiltr, favorite: true },
                        { type: "separator" },
                        { action: this.actions.actHodnota, favorite: true },
                        { action: this.actions.actUlozitVerzi, favorite: true },
                    ]);
                    //nastavení menuBaru
                    this.menuBar(this.menubarparametry);
                    var a_verze = "Balanční verze: " + this.globals.g_verze_c + "." + this.globals.g_verze_k;
                    this.statusBarVerze = new GObservableObject({ visible: true, id: "statusverze", tooltip: "Aktuální balanční verze", caption: a_verze, type: "static", customClass: "g-state-info g-state-text" });
                    this.statusbarparametry = [];
                    this.statusbarparametry.push(this.statusBarVerze);
                    this.statusBar(this.statusbarparametry);
                    this.my_CondFormats = [];
                    this.my_CondFormats = this.nastav_podmineny_format();
                    that.gridFormatSeznam = that.nastav_gridformat();
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { name: "BalFormular", layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    // KPI nad seznamem se sumarnimi castkami
                    var result = [];
                    //result.push(new GObservableObject({
                    //    name: "kpicelk0", title: "Záznamů", detailsDirection: "vertical", details: [{ description: " ", value: data[0].m, formatter: "C", unit: "", meaning: "info" }]
                    //}));
                    //that.KPI_verze = new GObservableObject({
                    //    name: "kpicelkverze", title: "Balanční verze", detailsDirection: "vertical", isCurrency: false, details: [{ description: " ", value: "0.0", formatter: "", unit: "", meaning: "info" }]
                    //});
                    that.KPI_sum_c0 = new GObservableObject({
                        name: "kpicelk1", title: "MD původní", detailsDirection: "vertical", details: [{ description: " ", value: 0, formatter: "C", unit: "Kč", meaning: "info" }],
                        action: new GAction({
                            name: "filtr_c0",
                            run(ev, ctx) {
                                // that.nastav_filtr( " c0 != 0 " )
                            }
                        })
                    });
                    that.KPI_sum_c0_new = new GObservableObject({
                        name: "kpicelk2", title: "MD nové", detailsDirection: "vertical", details: [{ description: " ", value: 0, formatter: "C", unit: "Kč", meaning: "info" }],
                        action: new GAction({
                            name: "filtr_c0n",
                            run(ev, ctx) {
                                // that.nastav_filtr(" c0_new != 0 ")
                            }
                        })
                    });
                    that.KPI_proc_c0 = new GObservableObject({
                        itemTemplate: Gordic.Prefabs.Panels.kpiChartTwoRowsTextTemplate().itemTemplate,
                        chart: { type: "gauge3", data: Decimal.round(parseDecimal(0).times(10000)).div(100) },
                        name: "kpiproc1", title: "% MD", detailsDirection: "vertical", details: [{ description: " ", value: null, formatter: "C", unit: "", meaning: "info" }]
                    });
                    that.KPI_sum_c1 = new GObservableObject({
                        name: "kpicelk3", title: "Dal původní", detailsDirection: "vertical", details: [{ description: " ", value: 0, formatter: "C", unit: "Kč", meaning: "info" }],
                        action: new GAction({
                            name: "filtr_c1n",
                            run(ev, ctx) {
                                // that.nastav_filtr(" c1 != 0 ")
                            }
                        })
                    });
                    that.KPI_sum_c1_new = new GObservableObject({
                        name: "kpicelk4", title: "Dal nové", detailsDirection: "vertical", details: [{ description: " ", value: 0, formatter: "C", unit: "Kč", meaning: "info" }],
                        action: new GAction({
                            name: "filtr_c1n",
                            run(ev, ctx) {
                                // that.nastav_filtr(" c1_new != 0 ")
                            }
                        })
                    });
                    that.KPI_proc_c1 = new GObservableObject({
                        itemTemplate: Gordic.Prefabs.Panels.kpiChartTwoRowsTextTemplate().itemTemplate,
                        chart: { type: "gauge3", data: Decimal.round(parseDecimal(0).times(10000)).div(100) },
                        name: "kpiproc2", title: "% Dal", detailsDirection: "vertical", details: [{ description: " ", value: null, formatter: "C", unit: "", meaning: "info" }]
                    });
                    that.KPI_sum_rozdil_new = new GObservableObject({
                        name: "kpicelk5", title: "Rozdíl MD-Dal nové", detailsDirection: "vertical", details: [{ description: " ", value: parseDecimal(0).minus(parseDecimal(0)), formatter: "C", unit: "Kč", meaning: "info" }]
                    });
                    //result.push(that.KPI_verze);
                    result.push(that.KPI_sum_c0);
                    result.push(that.KPI_sum_c0_new);
                    result.push(that.KPI_proc_c0);
                    result.push(that.KPI_sum_c1);
                    result.push(that.KPI_sum_c1_new);
                    result.push(that.KPI_proc_c1);
                    result.push(that.KPI_sum_rozdil_new);
                    //that.procenta_processor = new Gordic.Data.ComputedFieldsProcessor((rows) => {
                    //    var pp: Decimal;
                    //    rows.forEach((r) => {
                    //        r.data.pp = (parseDecimal(r.data.c0!).equals(0)) ? null : (parseDecimal(r.data.c0_new!).dividedBy(r.data.c0!).mul(100));
                    //        r.data.pv = (parseDecimal(r.data.c1!).equals(0)) ? null : (parseDecimal(r.data.c1_new!).dividedBy(r.data.c1!).mul(100));
                    //        return rows;
                    //    })
                    //});
                    that.procenta_processor = new Gordic.Data.BaseProcessor({
                        tiers: { view: { order: 2 } },
                        process: (tiers, data, ctx) => {
                            var pp;
                            data.forEach((r) => {
                                r.data.pp = (parseDecimal(r.data.c0).equals(0)) ? null : (parseDecimal(r.data.c0_new).dividedBy(r.data.c0).mul(100));
                                r.data.pv = (parseDecimal(r.data.c1).equals(0)) ? null : (parseDecimal(r.data.c1_new).dividedBy(r.data.c1).mul(100));
                            });
                            return data;
                        }
                    });
                    that.sumare_processor = new Gordic.Data.BaseProcessor({
                        tiers: { view: { order: 1 } },
                        process: (tiers, data, ctx) => {
                            var datasum = data.find((r) => {
                                if ((r._isSummary) && (r._isSummary == true)) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            });
                            if (datasum) {
                                if (that.KPI_sum_c0 && that.KPI_sum_c0.details) {
                                    that.KPI_sum_c0.details[0].value = datasum.data.c0;
                                    that.KPI_sum_c0.details[0].meaning = (parseDecimal(datasum.data.c0).lessThan(0)) ? "negative" : "info";
                                    that.KPI_sum_c0.update();
                                }
                                if (that.KPI_sum_c1 && that.KPI_sum_c1.details) {
                                    that.KPI_sum_c1.details[0].value = datasum.data.c1;
                                    that.KPI_sum_c1.details[0].meaning = (parseDecimal(datasum.data.c1).lessThan(0)) ? "negative" : "info";
                                    that.KPI_sum_c1.update();
                                }
                                if (that.KPI_sum_c0_new && that.KPI_sum_c0_new.details) {
                                    that.KPI_sum_c0_new.details[0].value = datasum.data.c0_new;
                                    that.KPI_sum_c0_new.details[0].meaning = (parseDecimal(datasum.data.c0_new).lessThan(0)) ? "negative" : "info";
                                    if (parseDecimal(datasum.data.c0).equals(0) == false) {
                                        var proc_c0 = parseDecimal(datasum.data.c0_new).div(parseDecimal(datasum.data.c0));
                                        that.KPI_proc_c0.chart.data = Decimal.round(parseDecimal(proc_c0).times(10000)).div(100);
                                        that.KPI_proc_c0.update();
                                        that.KPI_sum_c0_new.unit = "";
                                        that.KPI_sum_c0_new.formatter = "C";
                                        //                                that.KPI_sum_c0_new.chart = { type: "liquid", data: Decimal.round(parseDecimal(proc_c0).times(10000)).div(100) };
                                        that.KPI_sum_c0_new.primaryText = "";
                                        that.KPI_sum_c0_new.secondaryText = "";
                                    }
                                    that.KPI_sum_c0_new.update();
                                }
                                if (that.KPI_sum_c1_new && that.KPI_sum_c1_new.details) {
                                    that.KPI_sum_c1_new.details[0].value = datasum.data.c1_new;
                                    that.KPI_sum_c1_new.details[0].meaning = (parseDecimal(datasum.data.c1_new).lessThan(0)) ? "negative" : "info";
                                    if (parseDecimal(datasum.data.c1).equals(0) == false) {
                                        var proc_c1 = parseDecimal(datasum.data.c1_new).div(parseDecimal(datasum.data.c1));
                                        that.KPI_proc_c1.chart.data = Decimal.round(parseDecimal(proc_c1).times(10000)).div(100);
                                        that.KPI_proc_c1.update();
                                        that.KPI_sum_c1_new.unit = "";
                                        that.KPI_sum_c1_new.formatter = "C";
                                        //                                that.KPI_sum_c1_new.chart = { type: "liquid", data: Decimal.round(parseDecimal(proc_c1).times(10000)).div(100) };
                                        that.KPI_sum_c1_new.primaryText = "";
                                        that.KPI_sum_c1_new.secondaryText = "";
                                    }
                                    that.KPI_sum_c1_new.update();
                                }
                                if (that.KPI_sum_rozdil_new && that.KPI_sum_rozdil_new.details) {
                                    that.KPI_sum_rozdil_new.details[0].value = (parseDecimal(datasum.data.c0_new).minus(parseDecimal(datasum.data.c1_new)));
                                    that.KPI_sum_rozdil_new.details[0].meaning = ((parseDecimal(datasum.data.c0_new).minus(parseDecimal(datasum.data.c1_new))).lessThan(0)) ? "negative" : "info";
                                    that.KPI_sum_rozdil_new.update();
                                }
                            }
                            ;
                            return data;
                        }
                    });
                    that.view_ISL = new Gordic.Isl.View(this.isl.BalancniVerzeData.list({}), {
                        startEmpty: true,
                        processors: {
                            procenta: that.procenta_processor,
                            sumare: that.sumare_processor
                        }
                    });
                    $("<div>").appendTo(mainForm).gkpipanel({
                        displayMode: "panel",
                        sortable: true,
                        data: result,
                        //    fixedWidth: true,
                        //    width: 220
                    });
                    this.$mainTable = $("<div>")
                        //.css("height", "100%")
                        .appendTo(mainForm)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        multi: true,
                        data: that.view_ISL,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run(ev, ctx) {
                                that.row = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                                if (that.row) {
                                    if ((ctx.cellInfo.column.name == "c0_new") || (ctx.cellInfo.column.name == "c1_new")) {
                                        console.log("dialog na zmenu castky");
                                        var nova_castka;
                                        if (ctx.cellInfo.column.name == "c0_new") {
                                            that.zmenaHodnoty(ctx.cellInfo.column.name, that.row.c0, that.row.c1).then(function (nove_castky) {
                                                if (that.row) {
                                                    if (that.row.c0_new != nove_castky.c0_new_balanc) {
                                                        that.row.c0_new = nove_castky.c0_new_balanc;
                                                        that.row.sor_id = 1;
                                                        that.view_ISL.updateData(that.row, "update");
                                                    }
                                                }
                                            });
                                        }
                                        if (ctx.cellInfo.column.name == "c1_new") {
                                            that.zmenaHodnoty(ctx.cellInfo.column.name, that.row.c0, that.row.c1).then(function (nove_castky) {
                                                if (that.row) {
                                                    if (that.row.c1_new != nove_castky.c1_new_balanc) {
                                                        that.row.c1_new = nove_castky.c1_new_balanc;
                                                        that.row.sor_id = 1;
                                                        that.view_ISL.updateData(that.row, "update");
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        }),
                        cellActivate: function (ev, ctx) {
                        },
                        selection: function (ev, ctx) {
                        },
                        navigationMode: "row",
                        searchColumns: Gordic.Bar.WebClient.BarFunction.zjisti_sloupce_search(that.gridFormatSeznam),
                        defaultProfile: {
                            //columnList: "klik, nks, ued, uee, c0, c0_new, c1, c1_new",
                            condFormats: this.my_CondFormats //columnList: Gordic.Bar.WebClient.BarFunction.zjisti_sloupce(that.gridFormatSeznam), condFormats: this.my_CondFormats
                        },
                        //profiles: [
                        //    { name: "Zjednodušený", columnList: "klik, nks, ued, uee, c0, c0_new, pp, c1, c1_new, pv", condFormats: this.my_CondFormats, _locked: true },
                        //    { name: "Úplný", columnList: Gordic.Bar.WebClient.BarFunction.zjisti_sloupce(that.gridFormatSeznam), condFormats: this.my_CondFormats, _locked: true } //gridFormatSeznam.columns.filter((c) => c.name != "kniha").join() },
                        //    ],
                        columns: that.gridFormatSeznam,
                    }).ggrideko({
                        // součtový řádek
                        summaryRowAllowed: true,
                        summaryRowColumns: ["c0", "c1", "c0_new", "c1_new"],
                        // dlouhý seznam
                        longListAllowed: false,
                        //longListModel: "Global.Bar.AppSettings",
                        //longListCountMethod: (rq) => cnt.isl.Akce.listCount(rq).get()
                    });
                    this.$mainTable.gshortcut({
                        key: "lclick",
                        group: Gordic.Shortcuts.Groups.Grid,
                        description: "Pozitivní filtr",
                        canExecute: function (ev, ctx) {
                            return ($(ev.target).hasClass("cell"));
                        },
                        action: new GAction({
                            name: "selPositivFiltrAct",
                            run: (ev, ctx) => {
                                that.nastav_klik(ev, ctx, true);
                            }
                        }),
                    });
                    this.$mainTable.gshortcut({
                        key: "rclick",
                        group: Gordic.Shortcuts.Groups.Grid,
                        description: "Negativní filtr",
                        canExecute: function (ev, ctx) {
                            return ($(ev.target).hasClass("cell"));
                        },
                        action: new GAction({
                            name: "selNegativFiltrAct",
                            run: (ev, ctx) => {
                                that.nastav_klik(ev, ctx, true);
                            }
                        }),
                    });
                    this.$mainTable.gshortcut();
                    that.view_ISL.requestData();
                    //            this.$mainTable.ggrid("setData", that.view_ISL);
                }
                generateReport(rep) {
                    var cnt = this;
                    //rep.customDto = cnt.currentfilter;
                }
                zmenaHodnoty(sloupec, castka_c0, castka_c1) {
                    var that = this;
                    var new_castka_c0;
                    var new_castka_c1;
                    var in_data = {};
                    new_castka_c0 = castka_c0;
                    new_castka_c1 = castka_c1;
                    in_data.c0_new = castka_c0;
                    in_data.c0_new_balanc = castka_c0;
                    in_data.c1_new = castka_c1;
                    in_data.c1_new_balanc = castka_c1;
                    in_data.procent = new Decimal(100);
                    in_data.rozdil = new Decimal(0);
                    var def = $.Deferred();
                    var l_oDiv = that.dialogs.showModalWindow("Gordic.Bar.WebClient.GBarCastkaForm", { model: in_data }, "Úprava částky", 350, 500, true);
                    $(l_oDiv).on('close', function (ev, ctx) {
                        if ((ctx != undefined) && (ctx != null)) {
                            var akt_data = ctx.data;
                            if (akt_data != null) {
                                def.resolve(akt_data);
                                return;
                            }
                        }
                        def.reject();
                    });
                    return def.promise();
                }
                zmenaHodnotyHrom(puv_c0, puv_c1) {
                    var that = this;
                    var new_castka_c0;
                    var new_castka_c1;
                    var in_data = {};
                    new_castka_c0 = new Decimal(0);
                    new_castka_c1 = new Decimal(0);
                    in_data.c0_new = puv_c0;
                    in_data.c0_new_balanc = puv_c0;
                    in_data.c1_new = puv_c1;
                    in_data.c1_new_balanc = puv_c1;
                    in_data.procent = new Decimal(100);
                    in_data.rozdil = new Decimal(0);
                    var def = $.Deferred();
                    var l_oDiv = that.dialogs.showModalWindow("Gordic.Bar.WebClient.GBarCastkaForm", { model: in_data }, "Úprava částky hromadně", 350, 500, true);
                    $(l_oDiv).on('close', function (ev, ctx) {
                        if ((ctx != undefined) && (ctx != null)) {
                            var akt_data = ctx.data;
                            if (akt_data != null) {
                                def.resolve(akt_data);
                                return;
                            }
                        }
                        def.reject();
                    });
                    return def.promise();
                }
                nastav_klik(ev, ctx, pozitivni) {
                    var that = this;
                    var sloupec_info_name = "";
                    var index_sloupce = Number($(ev.target).attr("data-column-index"));
                    var index_radku = Number($(ev.target).closest(".row").attr("data-row-index"));
                    var moje_cell_info = that.$mainTable.ggrid("cellInfo", index_radku, index_sloupce);
                    if (moje_cell_info.meta._isSummary != true) {
                        var akt_klik = moje_cell_info.data.klik;
                        var new_klik = moje_cell_info.data.klik;
                        var sloupec_info_name = "";
                        var sloupec_info = moje_cell_info.column;
                        if (sloupec_info) {
                            sloupec_info_name = sloupec_info.name;
                        }
                        if ((sloupec_info_name != undefined) && (sloupec_info_name != "") && (sloupec_info_name != "klik")) {
                            if ((sloupec_info_name != "c0_new") && (sloupec_info_name != "c1_new")) {
                                var index = that.dej_uroven_num(sloupec_info_name); // dotahnout poradi z konfigurace
                                if (index >= 0) {
                                    var akt_znak = akt_klik[index];
                                    var znak = (akt_znak == "0") ? "1" : (akt_znak == "1") ? "2" : "0";
                                    // pokusim se najit jestli uz na stejny sloupec nebylo kliknuto a pokud ano, tak mu nastavim na danou pozici "0"
                                    if (znak != "0") {
                                        var dataklik = that.view_ISL.getDataRows(true).find((r) => {
                                            if ((r._isSummary) && (r._isSummary == true)) {
                                                return false;
                                            }
                                            else {
                                                if (r.data.klik?.charAt(index) != "0") {
                                                    return true;
                                                }
                                                else {
                                                    return false;
                                                }
                                            }
                                        });
                                        if (dataklik) {
                                            var klikradek = dataklik.data.klik;
                                            var a = dataklik.data.klik.split("");
                                            a[index] = "0";
                                            dataklik.data.klik = a.join("");
                                            that.view_ISL.updateData(dataklik, "update");
                                        }
                                    }
                                    that.row = moje_cell_info.data; //data, ze kterych byl vytvoren radek
                                    that.row = that.$mainTable.ggrid("activeRow");
                                    if (that.row != null) {
                                        var a = that.row.klik.split("");
                                        a[index] = znak;
                                        that.row.klik = a.join("");
                                        that.view_ISL.updateData(that.row, "update");
                                    }
                                }
                            }
                            else {
                                // jenom pro c0_new a c1_new
                                var index = that.dej_uroven_num(sloupec_info_name); // dotahnout poradi z konfigurace
                                if (index >= 0) {
                                    var akt_znak = akt_klik[index];
                                    var znak = (akt_znak == "0") ? "3" : "0";
                                    // pokusim se najit jestli uz na stejny sloupec nebylo kliknuto a pokud ano, tak mu nastavim na danou pozici "0"
                                    if (znak != "0") {
                                        var dataklik = that.view_ISL.getDataRows(true).find((r) => {
                                            if ((r._isSummary) && (r._isSummary == true)) {
                                                return false;
                                            }
                                            else {
                                                if (r.data.klik?.charAt(index) != "0") {
                                                    return true;
                                                }
                                                else {
                                                    return false;
                                                }
                                            }
                                        });
                                        if (dataklik) {
                                            var klikradek = dataklik.data.klik;
                                            var a = dataklik.data.klik.split("");
                                            a[index] = "0";
                                            dataklik.data.klik = a.join("");
                                            that.view_ISL.updateData(dataklik, "update");
                                        }
                                    }
                                    that.row = moje_cell_info.data; //data, ze kterych byl vytvoren radek
                                    that.row = that.$mainTable.ggrid("activeRow");
                                    if (that.row != null) {
                                        var a = that.row.klik.split("");
                                        a[index] = znak;
                                        that.row.klik = a.join("");
                                        that.view_ISL.updateData(that.row, "update");
                                    }
                                }
                            }
                        }
                    }
                }
                dej_hodnotu_sloupce_podminka(jmeno_sloupce, r, in_operator) {
                    var out_podminka = "";
                    var jmeno_sloupce_data = "";
                    switch (jmeno_sloupce) {
                        case "c0n": {
                            jmeno_sloupce_data = "c1_new";
                            break;
                        }
                        case "c1n": {
                            jmeno_sloupce_data = "c1_new";
                            break;
                        }
                        case "dzm": {
                            jmeno_sloupce_data = "dat_zmena";
                            break;
                        }
                        case "kom": {
                            jmeno_sloupce_data = "komodita";
                            break;
                        }
                        case "kop": {
                            jmeno_sloupce_data = "komp";
                            break;
                        }
                        case "pop": {
                            jmeno_sloupce_data = "popis";
                            break;
                        }
                        case "xco": {
                            jmeno_sloupce_data = "t_ico";
                            break;
                        }
                        case "xe0": {
                            jmeno_sloupce_data = "t_te0";
                            break;
                        }
                        case "xe1": {
                            jmeno_sloupce_data = "t_te1";
                            break;
                        }
                        case "xks": {
                            jmeno_sloupce_data = "t_nks";
                            break;
                        }
                        case "zmp": {
                            jmeno_sloupce_data = "zmenu_prov_txt";
                            break;
                        }
                        default: {
                            jmeno_sloupce_data = jmeno_sloupce;
                            break;
                        }
                    }
                    switch (jmeno_sloupce) {
                        case "dzm":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.dat_zmena + "' ) ";
                                break;
                            }
                            ;
                        case "c0":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " " + r.c0 + ") ";
                                break;
                            }
                            ;
                        case "c0n":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " " + r.c0_new + ") ";
                                break;
                            }
                            ;
                        case "c1":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " " + r.c1 + ") ";
                                break;
                            }
                            ;
                        case "c1n":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " " + r.c1_new + ") ";
                                break;
                            }
                            ;
                        case "den":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " " + r.den + ") ";
                                break;
                            }
                            ;
                        case "drd":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " " + r.drd + ") ";
                                break;
                            }
                            ;
                        case "mes":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " " + r.mesic + ") ";
                                break;
                            }
                            ;
                        case "rok":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " " + r.rok + ") ";
                                break;
                            }
                            ;
                        case "sor_id":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " " + r.sor_id + ") ";
                                break;
                            }
                            ;
                        case "ico":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.ico + "' ) ";
                                break;
                            }
                            ;
                        case "ixp":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.ixp + "' ) ";
                                break;
                            }
                            ;
                        case "kom":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.komodita + "' ) ";
                                break;
                            }
                            ;
                        case "kop":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.komp + "' ) ";
                                break;
                            }
                            ;
                        case "lic":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.lic + "' ) ";
                                break;
                            }
                            ;
                        case "nks":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.nks + "' ) ";
                                break;
                            }
                            ;
                        case "pop":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.popis + "' ) ";
                                break;
                            }
                            ;
                        case "xco":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.t_ico + "' ) ";
                                break;
                            }
                            ;
                        case "xks":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.t_nks + "' ) ";
                                break;
                            }
                            ;
                        case "xe0":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.t_te0 + "' ) ";
                                break;
                            }
                            ;
                        case "xe1":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.t_te1 + "' ) ";
                                break;
                            }
                            ;
                        case "te0":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.te0 + "' ) ";
                                break;
                            }
                            ;
                        case "te1":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.te1 + "' ) ";
                                break;
                            }
                            ;
                        case "te2":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.te2 + "' ) ";
                                break;
                            }
                            ;
                        case "te3":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.te3 + "' ) ";
                                break;
                            }
                            ;
                        case "te4":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.te4 + "' ) ";
                                break;
                            }
                            ;
                        case "ucs":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.ucs + "' ) ";
                                break;
                            }
                            ;
                        case "uea":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.uea + "' ) ";
                                break;
                            }
                            ;
                        case "ueb":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.ueb + "' ) ";
                                break;
                            }
                            ;
                        case "uec":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.uec + "' ) ";
                                break;
                            }
                            ;
                        case "ued":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.ued + "' ) ";
                                break;
                            }
                            ;
                        case "uee":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.uee + "' ) ";
                                break;
                            }
                            ;
                        case "uef":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.uef + "' ) ";
                                break;
                            }
                            ;
                        case "ueg":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.ueg + "' ) ";
                                break;
                            }
                            ;
                        case "ueh":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.ueh + "' ) ";
                                break;
                            }
                            ;
                        case "uei":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.uei + "' ) ";
                                break;
                            }
                            ;
                        case "uej":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.uej + "' ) ";
                                break;
                            }
                            ;
                        case "uus":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.uus + "' ) ";
                                break;
                            }
                            ;
                        case "verze_c":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.verze_c + "' ) ";
                                break;
                            }
                            ;
                        case "xpf_fs":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.xpf_fs + "' ) ";
                                break;
                            }
                            ;
                        case "xpf_pf":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.xpf_pf + "' ) ";
                                break;
                            }
                            ;
                        case "zmenu_prov":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.zmenu_prov + "' ) ";
                                break;
                            }
                            ;
                        case "zmp":
                            {
                                out_podminka = "(" + jmeno_sloupce_data + " " + in_operator + " '" + r.zmenu_prov_txt + "' )  ";
                                break;
                            }
                            ;
                    }
                    return out_podminka;
                }
                dej_uroven_num(jmeno_sloupce) {
                    var that = this;
                    var x_name = "";
                    switch (jmeno_sloupce) {
                        case "c0_new": {
                            x_name = "c0n";
                            break;
                        }
                        case "c1_new": {
                            x_name = "c1n";
                            break;
                        }
                        case "dat_zmena": {
                            x_name = "dzm";
                            break;
                        }
                        case "komodita": {
                            x_name = "kom";
                            break;
                        }
                        case "komp": {
                            x_name = "kop";
                            break;
                        }
                        case "popis": {
                            x_name = "pop";
                            break;
                        }
                        case "t_ico": {
                            x_name = "xco";
                            break;
                        }
                        case "t_te0": {
                            x_name = "xe0";
                            break;
                        }
                        case "t_te1": {
                            x_name = "xe1";
                            break;
                        }
                        case "t_nks": {
                            x_name = "xks";
                            break;
                        }
                        case "zmenu_prov_txt": {
                            x_name = "zmp";
                            break;
                        }
                        default: {
                            x_name = jmeno_sloupce;
                            break;
                        }
                    }
                    var out_uroven_num = -1;
                    var pole = that.globals.Konfigurace_balanc;
                    var zaznam;
                    var radek_kon = pole.find((r) => {
                        if (r.db_nazev == x_name) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    if (radek_kon) {
                        out_uroven_num = radek_kon.uroven_num - 1;
                    }
                    //pole!.forEach((r) => {
                    //    zaznam = r;
                    //    if (zaznam.db_nazev == x_name) {
                    //        out_uroven_num = zaznam.uroven_num!;
                    //        out_uroven_num = out_uroven_num - 1;
                    //        return out_uroven_num;
                    //    }
                    //});
                    return out_uroven_num;
                }
                nastav_podmineny_format() {
                    var that = this;
                    var out_CondFormat;
                    var out_CondFormaty;
                    var pole = that.globals.Konfigurace_balanc;
                    var zaznam;
                    var x_name = "";
                    out_CondFormaty = [];
                    //var akt_formula_1 = "(MID(@klik, 23, 1)== \"1\")"
                    //out_CondFormat = { applyTo: x_name, description: "klik POZ " + x_name, formula: akt_formula_1, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.darkred };
                    //out_CondFormaty.push(out_CondFormat);
                    //var akt_formula_2 = "(MID(@klik, 23, 1)== \"2\")"
                    //out_CondFormat = { applyTo: x_name, description: "klik NEG " + x_name, formula: akt_formula_2, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.darkblue };
                    //out_CondFormaty.push(out_CondFormat);
                    pole.forEach((r) => {
                        if (r.pouziti == 1) {
                            switch (r.db_nazev) {
                                case "c0n": {
                                    x_name = "c0_new";
                                    break;
                                }
                                case "c1n": {
                                    x_name = "c1_new";
                                    break;
                                }
                                case "dzm": {
                                    x_name = "dat_zmena";
                                    break;
                                }
                                case "kom": {
                                    x_name = "komodita";
                                    break;
                                }
                                case "kop": {
                                    x_name = "komp";
                                    break;
                                }
                                case "pop": {
                                    x_name = "popis";
                                    break;
                                }
                                case "xco": {
                                    x_name = "t_ico";
                                    break;
                                }
                                case "xe0": {
                                    x_name = "t_te0";
                                    break;
                                }
                                case "xe1": {
                                    x_name = "t_te1";
                                    break;
                                }
                                case "xks": {
                                    x_name = "t_nks";
                                    break;
                                }
                                case "zmp": {
                                    x_name = "zmenu_prov_txt";
                                    break;
                                }
                                default: {
                                    x_name = r.db_nazev;
                                    break;
                                }
                            }
                            var akt_formula_1 = "(MID(@klik, " + r.uroven_num + ", 1)== \"1\")";
                            out_CondFormat = { applyTo: x_name, description: "klik POZ " + x_name, formula: akt_formula_1, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.darkgreen };
                            out_CondFormaty.push(out_CondFormat);
                            var akt_formula_2 = "(MID(@klik, " + r.uroven_num + ", 1)== \"2\")";
                            out_CondFormat = { applyTo: x_name, description: "klik NEG " + x_name, formula: akt_formula_2, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.darkpurple };
                            out_CondFormaty.push(out_CondFormat);
                            if ((x_name == "c0_new") || (x_name == "c1_new")) {
                                var akt_formula_3 = "(MID(@klik, " + r.uroven_num + ", 1)== \"3\")";
                                out_CondFormat = { applyTo: x_name, description: "klik castka " + x_name, formula: akt_formula_3, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.darkblue };
                                out_CondFormaty.push(out_CondFormat);
                            }
                        }
                    });
                    console.log("COND", out_CondFormaty);
                    return out_CondFormaty;
                }
                nastav_gridformat() {
                    var that = this;
                    var out_GridFormat;
                    var pole = that.globals.Konfigurace_balanc;
                    out_GridFormat = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "klik",
                        caption: "klik",
                        width: 0,
                        hidden: true
                    });
                    out_GridFormat
                        .addIconColumn({
                        name: "sor_id",
                        field: "sor_id",
                        caption: " Z ",
                        formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                        iconTemplate: function (data) {
                            switch (data.sor_id) {
                                case 1: return { icon: "gi-tick", text: " Z ", caption: "Z", tooltip: "Změněno" };
                                case 0: return { icon: "fa-fw", text: " ", caption: " ", tooltip: " " };
                                default: return null;
                            }
                        }
                    });
                    //.addIconColumn({
                    //    name: "aktivita",
                    //    field: "aktivita",
                    //    caption: "Stav",
                    //    // width: 25,
                    //    formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                    //    iconTemplate: function (data) {
                    //        switch (data.aktivita) {
                    //            case 100: return { icon: "fa-check-circle-o g-state-success g-state-text", text: "Aktivní", caption: "Aktivní", tooltip: "Aktivní" };
                    //            case 300: return { icon: "fa-check-circle g-state-warning g-state-text", text: "Návrh", caption: "Návrh", tooltip: "Návrh" };
                    //            case 500: return { icon: "fa-trash g-state-error g-state-text", text: "Neaktivní", caption: "Neaktivní", tooltip: "Neaktivní" };
                    //            default: return null;
                    //        }
                    //    }
                    //})
                    console.log("pole", pole);
                    pole.forEach((r) => {
                        if (r.pouziti == 1) {
                            switch (r.db_nazev) {
                                case "c0n":
                                    {
                                        out_GridFormat.addCurrencyColumn({
                                            name: "c0_new",
                                            caption: r.nazev_zobr,
                                            width: WebClient.BarConst.sirkaCastky
                                        });
                                        break;
                                    }
                                    ;
                                case "c1n":
                                    {
                                        out_GridFormat.addCurrencyColumn({
                                            name: "c1_new",
                                            caption: r.nazev_zobr,
                                            width: WebClient.BarConst.sirkaCastky
                                        });
                                        break;
                                    }
                                    ;
                                case "c0":
                                case "c1":
                                    {
                                        out_GridFormat.addCurrencyColumn({
                                            name: r.db_nazev,
                                            caption: r.nazev_zobr,
                                            width: WebClient.BarConst.sirkaCastky
                                        });
                                        break;
                                    }
                                    ;
                                case "pp":
                                case "pv":
                                    {
                                        out_GridFormat.addCurrencyColumn({
                                            name: r.db_nazev,
                                            caption: r.nazev_zobr,
                                            width: 60
                                        });
                                        break;
                                    }
                                    ;
                                case "rok":
                                case "mes":
                                case "den":
                                case "drd":
                                    {
                                        out_GridFormat.addNumberColumn({
                                            name: r.db_nazev,
                                            caption: r.nazev_zobr,
                                            width: r.delka * that.sirka_sloupce_koef
                                        });
                                        break;
                                    }
                                    ;
                                case "uea":
                                case "ueb":
                                case "uec":
                                case "ued":
                                case "uee":
                                case "uef":
                                case "ueg":
                                case "ueh":
                                case "uei":
                                case "uej":
                                case "te0":
                                case "te1":
                                case "te2":
                                case "te3":
                                case "te4":
                                    {
                                        out_GridFormat.addTextColumn({
                                            name: r.db_nazev,
                                            caption: r.nazev_zobr,
                                            width: r.delka * that.sirka_sloupce_koef
                                        });
                                        break;
                                    }
                                    ;
                                case "dzm":
                                    {
                                        out_GridFormat.addDateTimeColumn({
                                            name: "dat_zmena",
                                            caption: r.nazev_zobr,
                                            customClass: "dt-left",
                                            width: 140,
                                        });
                                        break;
                                    }
                                    ;
                                case "dfs":
                                    {
                                        out_GridFormat.addTextColumn({
                                            name: r.db_nazev,
                                            caption: r.nazev_zobr,
                                            width: r.delka * that.sirka_sloupce_koef
                                        });
                                        break;
                                    }
                                    ;
                                case "kom":
                                    {
                                        out_GridFormat.addTextColumn({
                                            name: "komodita",
                                            caption: r.nazev_zobr,
                                            width: r.delka * that.sirka_sloupce_koef
                                        });
                                        break;
                                    }
                                    ;
                                case "kop":
                                    {
                                        out_GridFormat.addTextColumn({
                                            name: "komp",
                                            caption: r.nazev_zobr,
                                            width: r.delka * that.sirka_sloupce_koef
                                        });
                                        break;
                                    }
                                    ;
                                case "pop":
                                    {
                                        out_GridFormat.addTextColumn({
                                            name: "popis",
                                            caption: r.nazev_zobr,
                                            width: r.delka * that.sirka_sloupce_koef
                                        });
                                        break;
                                    }
                                    ;
                                case "t1a":
                                    {
                                        out_GridFormat.addTextColumn({
                                            name: r.db_nazev,
                                            caption: r.nazev_zobr,
                                            width: r.delka * that.sirka_sloupce_koef
                                        });
                                        break;
                                    }
                                    ;
                                case "t1b":
                                    {
                                        out_GridFormat.addTextColumn({
                                            name: r.db_nazev,
                                            caption: r.nazev_zobr,
                                            width: r.delka * that.sirka_sloupce_koef
                                        });
                                        break;
                                    }
                                    ;
                                case "xco":
                                    {
                                        out_GridFormat.addTextColumn({
                                            name: "t_ico",
                                            caption: r.nazev_zobr,
                                            width: r.delka * that.sirka_sloupce_koef
                                        });
                                        break;
                                    }
                                    ;
                                case "xe0":
                                    {
                                        out_GridFormat.addTextColumn({
                                            name: "t_te0",
                                            caption: r.nazev_zobr,
                                            width: r.delka * that.sirka_sloupce_koef
                                        });
                                        break;
                                    }
                                    ;
                                case "xe1":
                                    {
                                        out_GridFormat.addTextColumn({
                                            name: "t_te1",
                                            caption: r.nazev_zobr,
                                            width: r.delka * that.sirka_sloupce_koef
                                        });
                                        break;
                                    }
                                    ;
                                case "xks":
                                    {
                                        out_GridFormat.addTextColumn({
                                            name: "t_nks",
                                            caption: r.nazev_zobr,
                                            width: r.delka * that.sirka_sloupce_koef
                                        });
                                        break;
                                    }
                                    ;
                                case "zmp":
                                    {
                                        out_GridFormat.addTextColumn({
                                            name: "zmenu_prov_txt",
                                            caption: r.nazev_zobr,
                                            width: r.delka * that.sirka_sloupce_koef
                                        });
                                        break;
                                    }
                                    ;
                                case "ico":
                                case "ucs":
                                case "uus":
                                case "nks":
                                case "ixp":
                                    {
                                        out_GridFormat.addTextColumn({
                                            name: r.db_nazev,
                                            caption: r.nazev_zobr,
                                            width: r.delka * that.sirka_sloupce_koef
                                        });
                                        break;
                                    }
                                    ;
                                default:
                                    {
                                        break;
                                    }
                                    ;
                            }
                        }
                    });
                    return out_GridFormat;
                }
                nacti_data() {
                    var that = this;
                    console.log("nacti_data", "1");
                    // vezmu radky na ktere bylo kliknuto
                    var dataklik = that.view_ISL.getDataRows().filter((r) => {
                        return r.klik != '00000000000000000000000000000000000000000000000000';
                    });
                    console.log("nacti_data", "2");
                    var podminka_all = "";
                    podminka_all = this.akt_podminka_all;
                    // vyhodnotim filtr dle kliknutych uz jen z omezenych dat
                    dataklik.forEach((r) => {
                        var kliknuto = r.klik;
                        var jmeno_sloupce = "";
                        var podminka_1 = "";
                        var poz1_od = 0;
                        var poz1 = 0;
                        var poz2_od = 0;
                        var poz2 = 0;
                        var pole = that.globals.Konfigurace_balanc;
                        var zaznam;
                        do {
                            poz1 = kliknuto.indexOf("1", poz1_od);
                            if (poz1 > 0) {
                                pole.forEach((r1) => {
                                    zaznam = r1;
                                    if (zaznam.uroven_num == poz1 + 1) {
                                        jmeno_sloupce = zaznam.db_nazev;
                                        return;
                                    }
                                });
                                poz1_od = poz1 + 1;
                                podminka_1 = this.dej_hodnotu_sloupce_podminka(jmeno_sloupce, r, "==");
                                if (podminka_all == "") {
                                    podminka_all = podminka_1;
                                }
                                else {
                                    podminka_all = podminka_all + " && " + podminka_1;
                                }
                            }
                        } while (poz1 >= 0);
                        do {
                            poz2 = kliknuto.indexOf("2", poz2_od);
                            if (poz2 > 0) {
                                pole.forEach((r1) => {
                                    zaznam = r1;
                                    if (zaznam.uroven_num == poz2 + 1) {
                                        jmeno_sloupce = zaznam.db_nazev;
                                        return;
                                    }
                                });
                                poz2_od = poz2 + 1;
                                podminka_1 = this.dej_hodnotu_sloupce_podminka(jmeno_sloupce, r, "!=");
                                if (podminka_all == "") {
                                    podminka_all = podminka_1;
                                }
                                else {
                                    podminka_all = podminka_all + " && " + podminka_1;
                                }
                            }
                        } while (poz2 >= 0);
                    });
                    console.log("podminka", podminka_all);
                    that.view_ISL.process({
                        filterExpression: new Gordic.Data.FilterProcessor(podminka_all)
                    });
                    this.akt_podminka_all = podminka_all;
                    console.log("dataView", that.view_ISL.getDataRows());
                    that.view_ISL.getDataRows().forEach((r) => {
                        if (r.klik != '00000000000000000000000000000000000000000000000000') {
                            r.klik = '00000000000000000000000000000000000000000000000000';
                            that.view_ISL.updateData(r, "update");
                        }
                    });
                    console.log("nacti_data", "konec");
                }
                zrusit_filtr() {
                    var that = this;
                    that.akt_podminka_all = " 1==1 ";
                    that.view_ISL.process({
                        filterExpression: new Gordic.Data.FilterProcessor(" 1==1")
                    });
                    that.view_ISL.getDataRows().forEach((r) => {
                        if (r.klik != '00000000000000000000000000000000000000000000000000') {
                            r.klik = '00000000000000000000000000000000000000000000000000';
                            that.view_ISL.updateData(r, "update");
                        }
                    });
                }
                ulozit_verzi() {
                    var that = this;
                    var data_verze = {};
                    data_verze.data_bar = that.view_ISL.getDataRows();
                    data_verze.ico = this.gpc.ico;
                    data_verze.rok = this.globals.RokSberu;
                    data_verze.verze_c = "";
                    data_verze.verze_k = 0;
                    var l_oForm = new Gordic.Forms.Form({
                        name: "wizParamsVerze",
                        layoutDescriptor: "L1M1S1, L-2-8-2, M-2-8-2, S-12-12-0",
                        complete: function (a) {
                        }
                    })
                        .addRow({ label: "Verze" })
                        .addField("gstringbox", {
                        name: "new_verze_c",
                        flag: "required",
                        validators: [
                            new Gordic.Validators.RegExp({ pattern: "^[0-9]*$", errorType: "error", stopping: true, message: "Nepovolené znaky" }),
                            new Gordic.Validators.Required()
                        ],
                    })
                        .addField("gnumberbox", {
                        name: "new_verze_k",
                        //flag: "required",
                        disabled: true,
                        //validators: [
                        //    new Gordic.Validators.RegExp({ pattern: "^[0-9]*$", errorType: "error", stopping: true, message: "Nepovolené znaky" }),
                        //    new Gordic.Validators.Required()
                        //],
                    });
                    var akt_verze_c = this.globals.g_verze_c;
                    var akt_verze_c_cislo = parseInt(this.globals.g_verze_c);
                    var new_verze_c_cislo = akt_verze_c_cislo + 1;
                    var new_verze_c = new_verze_c_cislo.toString();
                    var new_verze_k = 0;
                    let prom_vysledek = that.dialogs.simpleForm("Uložit jako verzi", l_oForm, { new_verze_c: new_verze_c, new_verze_k: new_verze_k }, { width: 400, height: 400 });
                    //             prom_vysledek.findFields("cislo_new").gfield("focus");
                    return prom_vysledek.createDialogPromise( /*"close"*/ /*"yes"*/ /*"ok"*/ /*, { duvod: string }*/)
                        .then(function (data) {
                        data_verze.verze_c = data.new_verze_c;
                        that.zrusit_filtr();
                        that.beginOperation();
                        return that.isl.BalancniVerzeData.create_List({ data: data_verze })
                            .getData()
                            .done(function (data) {
                            that.globals.g_verze_c = data.verze_c;
                            that.globals.g_verze_k = data.verze_k;
                            var a_verze = "Balanční verze: " + that.globals.g_verze_c + "." + that.globals.g_verze_k;
                            that.statusBarVerze.update({ caption: a_verze });
                            that.view_ISL.requestData({});
                            //that.showFlash("Balanční verze: " + that.globals.g_verze_c + "." + that.globals.g_verze_k?.toString() + " byla uložena.", "g-state-info", 5000, "id-flash-ulozeni");
                            that.dialogs.messageBox("Informace", "Balanční verze: " + that.globals.g_verze_c + "." + that.globals.g_verze_k?.toString() + " byla uložena.", [GDlg.mbbOk], GDlg.mbiSuccess);
                        }).always(() => that.endOperation());
                    });
                }
                verze() {
                    var that = this;
                    var newverze = new Gordic.Data.Selectors.DefaultSelector($.extend(true, Gordic.Data.Selectors.barsverBar(), { serverFilters: { komp_dec: "00" }, related: that.element })).show().then(function (data) {
                        // kontrola, že to není pole    
                        if (!(data instanceof Array)) {
                            that.globals.g_verze_c = data.verze_c;
                            that.globals.g_verze_k = data.verze_k;
                            console.log("data", data);
                            var data_verze = {};
                            data_verze.data_bar = that.view_ISL.getDataRows();
                            data_verze.ico = that.gpc.ico;
                            data_verze.rok = that.globals.RokSberu;
                            data_verze.verze_c = that.globals.g_verze_c;
                            data_verze.verze_k = that.globals.g_verze_k;
                            that.isl.BalancniVerzeData.set_Verze({ data: data_verze })
                                .getData()
                                .done(function (data) {
                                var a_verze = "Balanční verze: " + that.globals.g_verze_c + "." + that.globals.g_verze_k;
                                that.statusBarVerze.update({ caption: a_verze });
                                that.view_ISL.requestData({});
                            });
                        }
                    });
                    //that.view_ISL = new Gordic.Isl.View(this.isl.BalancniVerze.list({ filters: {} }));
                    //var l_oForm = new Gordic.Forms.Form({
                    //    name: "wizParamsVerzeVyber",
                    //    layoutDescriptor: "L1M1S1, L-2-8-2, M-2-8-2, S-12-12-0",
                    //    complete: function (a) {
                    //        var form = $(this).closest(".gform");
                    //        var $mainTable = $("<div>")
                    //            //.css("height", "100%")
                    //            .appendTo(form)
                    //            .gautofit()
                    //            .ggrid({
                    //                columnMode: "full",
                    //                defaultAction: new GAction({
                    //                    name: "gridRowSelectedAct",
                    //                    run(ev, ctx) {
                    //                        that.row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                    //                        return;
                    //                    }
                    //                }),
                    //                cellActivate(ev, ctx) {
                    //                    that.row = $mainTable.ggrid("activeRow");
                    //                    if (that.row !== null) {
                    //                    }
                    //                },
                    //                searchColumns: ["*verze_c", "*verze_k"],
                    //                columns: gfVyberVerze,
                    //                data: that.view_ISL
                    //            });
                    //    }
                    //})
                    //.addField("gdummyfield", "w-h", {
                    //    model: "verze_c",
                    //    name: "verze_c"
                    //})
                    //.addField("gdummyfield", "w-h", {
                    //    model: "verze_c",
                    //    name: "verze_c"
                    //});
                    //var gfVyberVerze = new Gordic.Data.GridFormat()
                    //    .addTextColumn({
                    //        name: "verze_c",
                    //        caption: "Centrální",
                    //        width: 100
                    //    })
                    //    .addNumberColumn({
                    //        name: "verze_k",
                    //        caption: "Kompetentská",
                    //        width: 100
                    //    })
                    //let prom_vysledek = that.dialogs.simpleForm("Vybrat verzi", l_oForm, {}, { width: 400, height: 400 });
                    ////             prom_vysledek.findFields("cislo_new").gfield("focus");
                    //let prom_vysledek_pro = prom_vysledek.createDialogPromise(/*"close"*//*"yes"*//*"ok"*//*, { duvod: string }*/)
                    //    .then(function (data) {
                    //        that.globals.g_verze_c = data.verze_c;
                    //        that.globals.g_verze_k = data.verze_k;
                    //        console.log("data", data);
                    //        that.showFlash("Nová balanční verze: " + that.globals.g_verze_c + "." + that.globals.g_verze_k?.toString(), "g-state-info", 5000, "id-flash-ulozeni");
                    //    });
                }
                ;
                nastav_filtr(in_filtr) {
                    var that = this;
                    that.view_ISL.process({
                        filterExpression: new Gordic.Data.FilterProcessor(in_filtr)
                    });
                }
                ;
            };
            GBardnxx = __decorate([
                gcontent
            ], GBardnxx);
            WebClient.GBardnxx = GBardnxx;
        })(WebClient = Bar.WebClient || (Bar.WebClient = {}));
    })(Bar = Gordic.Bar || (Gordic.Bar = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0JhcmRueHguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbIlNjcmlwdHMvR0JhcmRueHgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0E0M0NmO0FBNTNDRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0M0NuQjtJQTUzQ2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTQzQzdCO1FBNTNDb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUyxTQUFRLE9BQUEsWUFBWTtnQkFBMUM7b0JBRUosb0dBQW9HO29CQUNwRywwRUFBMEU7O29CQWdCMUQsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO29CQU12QixRQUFHLEdBQTRDLElBQUksQ0FBQztvQkFHcEQscUJBQWdCLEdBQVcsUUFBUSxDQUFDO2dCQTIxQ2hELENBQUM7Z0JBOTFDK0QsQ0FBQztnQkFDYixDQUFDO2dCQXFCakQsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRTlCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFYixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztvQkFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLFFBQVEsRUFBRTs0QkFDTixPQUFPLEVBQUUsUUFBUTs0QkFDakIsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQ3hDO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlC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TUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQ3ZHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssSUFBSTs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQ3ZHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQ3pHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQ3pHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzNHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQ3pHLEtBQUssUUFBUTs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQy9HLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQ2pILEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzdHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzlHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzlHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzlHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzlHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzlHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssS0FBSzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQzVHLEtBQUssU0FBUzs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQ3BILEtBQUssUUFBUTs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQ2xILEtBQUssUUFBUTs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0NBQUMsTUFBTTs0QkFBQyxDQUFDOzRCQUFBLENBQUM7d0JBQ2xILEtBQUssWUFBWTs0QkFBRSxDQUFDO2dDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxH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UUFBUTtlQUNJLFFBQVEsQ0F1M0NwQjtZQXYzQ1ksa0JBQVEsV0F1M0NwQixDQUFBO1FBQ0wsQ0FBQyxFQTUzQ29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTQzQzdCO0lBQUQsQ0FBQyxFQTUzQ2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTQzQ25CO0FBQUQsQ0FBQyxFQTUzQ1MsTUFBTSxLQUFOLE1BQU0sUUE0M0NmIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CYXIuV2ViQ2xpZW50LkdCYXJkbnh4LmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR0JhcmRueHggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQmFyLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdCYXJkbnh4IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbi8vICAgICAgICB0aXRsZSA9IFwiQmFsYW5jb3ZhbmlcIjsgLy9hYnkgc2UgZGFsbyBwxZlpc3RvdXBpdCB6IGJyZWFkY3J1bWJzLCBqZSBuYXN0YXZlbm8gemRlIG3DrXN0byB2IEMjXHJcbi8vICAgICAgICB0YXNrSWQgPSBcImFjdEJhbGFuY25pVmVyemVEYXRhXCI7IC8vIG96bmHEjWVuw60gcG9sb8W+a3kgdiB0YXNrTGlzdHVcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBteV9Db25kRm9ybWF0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXQ7XHJcbiAgICAgICAgcHJpdmF0ZSBteV9Db25kRm9ybWF0czogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0W107XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZEZvcm1hdFNlem5hbTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuQmFyLkludGVyZmFjZS5HQmFyZG4wMER0bz47XHJcblxyXG4gICAgICAgIHByaXZhdGUgS1BJX3N1bV9jMDogR09ic2VydmFibGVPYmplY3Q8R0twaUl0ZW1PcHRpb25zPjtcclxuICAgICAgICBwcml2YXRlIEtQSV9zdW1fYzE6IEdPYnNlcnZhYmxlT2JqZWN0PEdLcGlJdGVtT3B0aW9ucz47XHJcbiAgICAgICAgcHJpdmF0ZSBLUElfc3VtX2MwX25ldzogR09ic2VydmFibGVPYmplY3Q8R0twaUl0ZW1PcHRpb25zPjtcclxuICAgICAgICBwcml2YXRlIEtQSV9zdW1fYzFfbmV3OiBHT2JzZXJ2YWJsZU9iamVjdDxHS3BpSXRlbU9wdGlvbnM+O1xyXG4gICAgICAgIHByaXZhdGUgS1BJX3Byb2NfYzA6IEdPYnNlcnZhYmxlT2JqZWN0PEdLcGlJdGVtT3B0aW9ucz47XHJcbiAgICAgICAgcHJpdmF0ZSBLUElfcHJvY19jMTogR09ic2VydmFibGVPYmplY3Q8R0twaUl0ZW1PcHRpb25zPjtcclxuICAgICAgICBwcml2YXRlIEtQSV9zdW1fcm96ZGlsX25ldzogR09ic2VydmFibGVPYmplY3Q8R0twaUl0ZW1PcHRpb25zPjtcclxuICAgICAgICBwcml2YXRlIEtQSV92ZXJ6ZTogR09ic2VydmFibGVPYmplY3Q8R0twaUl0ZW1PcHRpb25zPjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaXJrYV9zbG91cGNlX2tvZWYgPSA0O1xyXG5cclxuICAgICAgICBwcml2YXRlICRtYWluVGFibGU7XHJcbi8vICAgICAgICBwcml2YXRlICRtYWluVGFibGU6IEpRdWVyeTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RlbGJhcjogR29yZGljLkJhci5JbnRlcmZhY2UuR0JhcmRuMDBEdG9bXTtcclxuICAgICAgICBwcml2YXRlIHJvdzogR29yZGljLkJhci5JbnRlcmZhY2UuR0JhcmRuMDBEdG8gfCBudWxsID0gbnVsbDs7XHJcbiAgICAgICAgcHJpdmF0ZSBzdW1hcjogR29yZGljLkJhci5JbnRlcmZhY2UuR0JhcmRuMDBEdG87O1xyXG5cclxuICAgICAgICBwcml2YXRlIGFrdF9wb2RtaW5rYV9hbGw6IHN0cmluZyA9IFwiIDE9PTEgXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VudGVuY2U6IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkdEYXRhU2VudGVuY2VEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBtZW51YmFycGFyYW1ldHJ5OiBNZW51UGFyYW1zW107XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHN0YXYgdmVyemVcclxuICAgICAgICAgKiBAdHlwZSB7R09ic2VydmFibGVPYmplY3Q8TWVudVBhcmFtcz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0dXNCYXJWZXJ6ZTogR09ic2VydmFibGVPYmplY3Q8TWVudVBhcmFtcz47XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0dXNiYXJwYXJhbWV0cnk6IE1lbnVQYXJhbXNbXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzOiBHb3JkaWMuQmFyLldlYkNsaWVudC5EVE8uR0Jhckdsb2JhbHNEdG87XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmlld19JU0w6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuQmFyLkludGVyZmFjZS5HQmFyZG4wMER0bz47XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBwcm9jZW50YV9wcm9jZXNzb3I6IEdvcmRpYy5EYXRhLkNvbXB1dGVkRmllbGRzUHJvY2Vzc29yPEdvcmRpYy5CYXIuSW50ZXJmYWNlLkdCYXJkbjAwRHRvPjtcclxuICAgICAgICBwcml2YXRlIHByb2NlbnRhX3Byb2Nlc3NvcjogR29yZGljLkRhdGEuQmFzZVByb2Nlc3NvcjxHb3JkaWMuQmFyLkludGVyZmFjZS5HQmFyZG4wMER0bz47XHJcbiAgICAgICAgcHJpdmF0ZSBzdW1hcmVfcHJvY2Vzc29yOiBHb3JkaWMuRGF0YS5CYXNlUHJvY2Vzc29yPEdvcmRpYy5CYXIuSW50ZXJmYWNlLkdCYXJkbjAwRHRvPjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciAkdGFiID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG5cclxuICAgICAgICAgICAgJHRhYi5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiQmFsYW5jb3ZhbmlcIjsgXHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0Q2xvc2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpydcWhaXRcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlpydcWhaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC50cnlDbG9zZSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZChHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza0JhbFwiLFxyXG4gICAgICAgICAgICAgICAgdGVtYTogXCJiYXJfcHRtX2JhcmJhc2VcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVGlza1wiLFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGF0LFxyXG4gICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5CYXIuV2ViQ2xpZW50LkdCYXJkbnh4OkNvbnZlcnRSZXBvcnRQYXJhbXNcIixcclxuICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiAocmVwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVSZXBvcnQocmVwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE5hY2lzdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnlicmF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJWeWJyYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5uYWN0aV9kYXRhKCk7IH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0VmVyemU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZlcnplXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJWZXJ6ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnZlcnplKCk7IH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0WnJ1c2l0RmlsdHI6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpydcWhaXQgZmlsdHJcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlpydcWhaXQgZmlsdHJcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC56cnVzaXRfZmlsdHIoKTsgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RVbG96aXRWZXJ6aToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiVWxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC51bG96aXRfdmVyemkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0SG9kbm90YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiSG9kbm90YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiSG9kbm90YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHV2b2RuaV9jYXN0a2FfYzAgPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHB1dm9kbmlfY2FzdGthX2MxID0gbmV3IERlY2ltYWwoMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdnlicmFuZVJhZGt5ID0gdGhhdC4kbWFpblRhYmxlLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2eWJyYW5lUmFka3kubGVuZ3RoID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ5YnJhbmVSYWRreSEuZm9yRWFjaCgocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1dm9kbmlfY2FzdGthX2MwID0gcGFyc2VEZWNpbWFsKHB1dm9kbmlfY2FzdGthX2MwKS5wbHVzKHBhcnNlRGVjaW1hbChyLmRhdGEuYzApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXZvZG5pX2Nhc3RrYV9jMSA9IHBhcnNlRGVjaW1hbChwdXZvZG5pX2Nhc3RrYV9jMSkucGx1cyhwYXJzZURlY2ltYWwoci5kYXRhLmMxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQudmlld19JU0wucHJvY2Vzcyh7IHByb2NlbnRhOiBudWxsIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnZpZXdfSVNMLnByb2Nlc3MoeyBzdW1hcmU6IG51bGwgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQudmlld19JU0wucHJvY2Vzcyh7IHN1bW1hcnlSb3c6IG51bGwgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56bWVuYUhvZG5vdHlIcm9tKHB1dm9kbmlfY2FzdGthX2MwLCBwdXZvZG5pX2Nhc3RrYV9jMSkudGhlbihmdW5jdGlvbiAobm92ZV9jYXN0a3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm92YV9jYXN0a2FfYzAgPSBub3ZlX2Nhc3RreS5jMF9uZXdfYmFsYW5jO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub3ZhX2Nhc3RrYV9jMSA9IG5vdmVfY2FzdGt5LmMxX25ld19iYWxhbmM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub3ZhX2Nhc3RrYV9jMF9yYWRlayA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub3ZhX2Nhc3RrYV9jMV9yYWRlayA9IG5ldyBEZWNpbWFsKDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2eWJyYW5lUmFka3khLmZvckVhY2goKHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3ZhX2Nhc3RrYV9jMF9yYWRlayA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm92YV9jYXN0a2FfYzFfcmFkZWsgPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcHV2b2RuaV9jYXN0a2FfYzAuZXEoMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3ZhX2Nhc3RrYV9jMF9yYWRlayA9IHBhcnNlRGVjaW1hbChyLmRhdGEuYzApLm11bChwYXJzZURlY2ltYWwobm92YV9jYXN0a2FfYzAhKS5kaXYocGFyc2VEZWNpbWFsKHB1dm9kbmlfY2FzdGthX2MwKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcHV2b2RuaV9jYXN0a2FfYzEuZXEoMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3ZhX2Nhc3RrYV9jMV9yYWRlayA9IHBhcnNlRGVjaW1hbChyLmRhdGEuYzEpLm11bChwYXJzZURlY2ltYWwobm92YV9jYXN0a2FfYzEhKS5kaXYocGFyc2VEZWNpbWFsKHB1dm9kbmlfY2FzdGthX2MxKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyLmRhdGEuYzBfbmV3ICE9IG5vdmFfY2FzdGthX2MwX3JhZGVrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgci5kYXRhLmMwX25ldyA9IG5vdmFfY2FzdGthX2MwX3JhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgci5kYXRhLnNvcl9pZCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoci5kYXRhLmMxX25ldyAhPSBub3ZhX2Nhc3RrYV9jMV9yYWRlaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZGF0YS5jMV9uZXcgPSBub3ZhX2Nhc3RrYV9jMV9yYWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZGF0YS5zb3JfaWQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyLmRhdGEuc29yX2lkID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQudmlld19JU0wudXBkYXRlRGF0YShyLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEodnlicmFuZVJhZGt5LCBcInVwZGF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnZpZXdfSVNMLnByb2Nlc3MoeyBwcm9jZW50YTogdGhhdC5wcm9jZW50YV9wcm9jZXNzb3IgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnZpZXdfSVNMLnByb2Nlc3MoeyBzdW1hcmU6IHRoYXQuc3VtYXJlX3Byb2Nlc3NvciB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51YmFycGFyYW1ldHJ5ID0gdGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFRpc2tCYWwsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwic2VwYXJhdG9yXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VmVyemUsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdE5hY2lzdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0WnJ1c2l0RmlsdHIsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwic2VwYXJhdG9yXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0SG9kbm90YSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VWxveml0VmVyemksIGZhdm9yaXRlOiB0cnVlIH1cclxuXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLm1lbnViYXJwYXJhbWV0cnkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFfdmVyemUgPSBcIkJhbGFuxI1uw60gdmVyemU6IFwiICsgdGhpcy5nbG9iYWxzLmdfdmVyemVfYyArIFwiLlwiICsgdGhpcy5nbG9iYWxzLmdfdmVyemVfaztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzQmFyVmVyemUgPSBuZXcgR09ic2VydmFibGVPYmplY3Q8TWVudVBhcmFtcz4oeyB2aXNpYmxlOiB0cnVlLCBpZDogXCJzdGF0dXN2ZXJ6ZVwiLCB0b29sdGlwOiBcIkFrdHXDoWxuw60gYmFsYW7EjW7DrSB2ZXJ6ZVwiLCBjYXB0aW9uOiBhX3ZlcnplLCB0eXBlOiBcInN0YXRpY1wiLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLWluZm8gZy1zdGF0ZS10ZXh0XCIgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YXR1c2JhcnBhcmFtZXRyeSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXR1c2JhcnBhcmFtZXRyeS5wdXNoKHRoaXMuc3RhdHVzQmFyVmVyemUpXHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzQmFyKHRoaXMuc3RhdHVzYmFycGFyYW1ldHJ5KTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLm15X0NvbmRGb3JtYXRzID0gW107XHJcblxyXG4gICAgICAgICAgICB0aGlzLm15X0NvbmRGb3JtYXRzID10aGlzLm5hc3Rhdl9wb2RtaW5lbnlfZm9ybWF0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmdyaWRGb3JtYXRTZXpuYW0gPSB0aGF0Lm5hc3Rhdl9ncmlkZm9ybWF0KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcInNldHVwXCIsIHsgbmFtZTogXCJCYWxGb3JtdWxhclwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIgfSkuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gS1BJIG5hZCBzZXpuYW1lbSBzZSBzdW1hcm5pbWkgY2FzdGthbWlcclxuXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQ6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgLy9yZXN1bHQucHVzaChuZXcgR09ic2VydmFibGVPYmplY3Qoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJrcGljZWxrMFwiLCB0aXRsZTogXCJaw6F6bmFtxa9cIiwgZGV0YWlsc0RpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLCBkZXRhaWxzOiBbeyBkZXNjcmlwdGlvbjogXCIgXCIsIHZhbHVlOiBkYXRhWzBdLm0sIGZvcm1hdHRlcjogXCJDXCIsIHVuaXQ6IFwiXCIsIG1lYW5pbmc6IFwiaW5mb1wiIH1dXHJcbiAgICAgICAgICAgICAgICAvL30pKTtcclxuICAgICAgICAgICAgLy90aGF0LktQSV92ZXJ6ZSA9IG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwia3BpY2Vsa3ZlcnplXCIsIHRpdGxlOiBcIkJhbGFuxI1uw60gdmVyemVcIiwgZGV0YWlsc0RpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLCBpc0N1cnJlbmN5OiBmYWxzZSwgZGV0YWlsczogW3sgZGVzY3JpcHRpb246IFwiIFwiLCB2YWx1ZTogXCIwLjBcIiwgZm9ybWF0dGVyOiBcIlwiLCB1bml0OiBcIlwiLCBtZWFuaW5nOiBcImluZm9cIiB9XVxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5LUElfc3VtX2MwID0gbmV3IEdPYnNlcnZhYmxlT2JqZWN0KHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwia3BpY2VsazFcIiwgdGl0bGU6IFwiTUQgcMWvdm9kbsOtXCIsIGRldGFpbHNEaXJlY3Rpb246IFwidmVydGljYWxcIiwgZGV0YWlsczogW3sgZGVzY3JpcHRpb246IFwiIFwiLCB2YWx1ZTogMCwgZm9ybWF0dGVyOiBcIkNcIiwgdW5pdDogXCJLxI1cIiwgbWVhbmluZzogXCJpbmZvXCIgfV0sXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZpbHRyX2MwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhhdC5uYXN0YXZfZmlsdHIoIFwiIGMwICE9IDAgXCIgKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5LUElfc3VtX2MwX25ldyA9IG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImtwaWNlbGsyXCIsIHRpdGxlOiBcIk1EIG5vdsOpXCIsIGRldGFpbHNEaXJlY3Rpb246IFwidmVydGljYWxcIiwgZGV0YWlsczogW3sgZGVzY3JpcHRpb246IFwiIFwiLCB2YWx1ZTogMCwgZm9ybWF0dGVyOiBcIkNcIiwgdW5pdDogXCJLxI1cIiwgbWVhbmluZzogXCJpbmZvXCIgfV0sXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZpbHRyX2MwblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bihldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoYXQubmFzdGF2X2ZpbHRyKFwiIGMwX25ldyAhPSAwIFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5LUElfcHJvY19jMCA9IG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IEdvcmRpYy5QcmVmYWJzLlBhbmVscy5rcGlDaGFydFR3b1Jvd3NUZXh0VGVtcGxhdGUoKS5pdGVtVGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICBjaGFydDogeyB0eXBlOiBcImdhdWdlM1wiLCBkYXRhOiBEZWNpbWFsLnJvdW5kKHBhcnNlRGVjaW1hbCgwKS50aW1lcygxMDAwMCkpLmRpdigxMDApIH0sXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImtwaXByb2MxXCIsIHRpdGxlOiBcIiUgTURcIiwgZGV0YWlsc0RpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLCBkZXRhaWxzOiBbeyBkZXNjcmlwdGlvbjogXCIgXCIsIHZhbHVlOiBudWxsLCBmb3JtYXR0ZXI6IFwiQ1wiLCB1bml0OiBcIlwiLCBtZWFuaW5nOiBcImluZm9cIiB9XVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuS1BJX3N1bV9jMSA9IG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImtwaWNlbGszXCIsIHRpdGxlOiBcIkRhbCBwxa92b2Ruw61cIiwgZGV0YWlsc0RpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLCBkZXRhaWxzOiBbeyBkZXNjcmlwdGlvbjogXCIgXCIsIHZhbHVlOiAwLCBmb3JtYXR0ZXI6IFwiQ1wiLCB1bml0OiBcIkvEjVwiLCBtZWFuaW5nOiBcImluZm9cIiB9XSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlsdHJfYzFuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhhdC5uYXN0YXZfZmlsdHIoXCIgYzEgIT0gMCBcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhhdC5LUElfc3VtX2MxX25ldyA9IG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImtwaWNlbGs0XCIsIHRpdGxlOiBcIkRhbCBub3bDqVwiLCBkZXRhaWxzRGlyZWN0aW9uOiBcInZlcnRpY2FsXCIsIGRldGFpbHM6IFt7IGRlc2NyaXB0aW9uOiBcIiBcIiwgdmFsdWU6IDAsIGZvcm1hdHRlcjogXCJDXCIsIHVuaXQ6IFwiS8SNXCIsIG1lYW5pbmc6IFwiaW5mb1wiIH1dLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmaWx0cl9jMW5cIixcclxuICAgICAgICAgICAgICAgICAgICBydW4oZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGF0Lm5hc3Rhdl9maWx0cihcIiBjMV9uZXcgIT0gMCBcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuS1BJX3Byb2NfYzEgPSBuZXcgR09ic2VydmFibGVPYmplY3Qoe1xyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpQ2hhcnRUd29Sb3dzVGV4dFRlbXBsYXRlKCkuaXRlbVRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgY2hhcnQ6IHsgdHlwZTogXCJnYXVnZTNcIiwgZGF0YTogRGVjaW1hbC5yb3VuZChwYXJzZURlY2ltYWwoMCkudGltZXMoMTAwMDApKS5kaXYoMTAwKSB9LFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJrcGlwcm9jMlwiLCB0aXRsZTogXCIlIERhbFwiLCBkZXRhaWxzRGlyZWN0aW9uOiBcInZlcnRpY2FsXCIsIGRldGFpbHM6IFt7IGRlc2NyaXB0aW9uOiBcIiBcIiwgdmFsdWU6IG51bGwsIGZvcm1hdHRlcjogXCJDXCIsIHVuaXQ6IFwiXCIsIG1lYW5pbmc6IFwiaW5mb1wiIH1dXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5LUElfc3VtX3JvemRpbF9uZXcgPSBuZXcgR09ic2VydmFibGVPYmplY3Qoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJrcGljZWxrNVwiLCB0aXRsZTogXCJSb3pkw61sIE1ELURhbCBub3bDqVwiLCBkZXRhaWxzRGlyZWN0aW9uOiBcInZlcnRpY2FsXCIsIGRldGFpbHM6IFt7IGRlc2NyaXB0aW9uOiBcIiBcIiwgdmFsdWU6IHBhcnNlRGVjaW1hbCgwKS5taW51cyhwYXJzZURlY2ltYWwoMCkpLCBmb3JtYXR0ZXI6IFwiQ1wiLCB1bml0OiBcIkvEjVwiLCBtZWFuaW5nOiBcImluZm9cIiB9XVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3Jlc3VsdC5wdXNoKHRoYXQuS1BJX3ZlcnplKTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhhdC5LUElfc3VtX2MwKTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhhdC5LUElfc3VtX2MwX25ldyk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoYXQuS1BJX3Byb2NfYzApO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGF0LktQSV9zdW1fYzEpO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGF0LktQSV9zdW1fYzFfbmV3KTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhhdC5LUElfcHJvY19jMSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoYXQuS1BJX3N1bV9yb3pkaWxfbmV3KTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC5wcm9jZW50YV9wcm9jZXNzb3IgPSBuZXcgR29yZGljLkRhdGEuQ29tcHV0ZWRGaWVsZHNQcm9jZXNzb3IoKHJvd3MpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgdmFyIHBwOiBEZWNpbWFsO1xyXG4gICAgICAgICAgICAvLyAgICByb3dzLmZvckVhY2goKHIpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHIuZGF0YS5wcCA9IChwYXJzZURlY2ltYWwoci5kYXRhLmMwISkuZXF1YWxzKDApKSA/IG51bGwgOiAocGFyc2VEZWNpbWFsKHIuZGF0YS5jMF9uZXchKS5kaXZpZGVkQnkoci5kYXRhLmMwISkubXVsKDEwMCkpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgci5kYXRhLnB2ID0gKHBhcnNlRGVjaW1hbChyLmRhdGEuYzEhKS5lcXVhbHMoMCkpID8gbnVsbCA6IChwYXJzZURlY2ltYWwoci5kYXRhLmMxX25ldyEpLmRpdmlkZWRCeShyLmRhdGEuYzEhKS5tdWwoMTAwKSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gcm93cztcclxuICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQucHJvY2VudGFfcHJvY2Vzc29yID0gbmV3IEdvcmRpYy5EYXRhLkJhc2VQcm9jZXNzb3Ioe1xyXG4gICAgICAgICAgICAgICAgdGllcnM6IHsgdmlldzogeyBvcmRlcjogMiB9IH0sXHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzOiAodGllcnMsIGRhdGEsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcDogRGVjaW1hbDtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goKHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgci5kYXRhLnBwID0gKHBhcnNlRGVjaW1hbChyLmRhdGEuYzAhKS5lcXVhbHMoMCkpID8gbnVsbCA6IChwYXJzZURlY2ltYWwoci5kYXRhLmMwX25ldyEpLmRpdmlkZWRCeShyLmRhdGEuYzAhKS5tdWwoMTAwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIuZGF0YS5wdiA9IChwYXJzZURlY2ltYWwoci5kYXRhLmMxISkuZXF1YWxzKDApKSA/IG51bGwgOiAocGFyc2VEZWNpbWFsKHIuZGF0YS5jMV9uZXchKS5kaXZpZGVkQnkoci5kYXRhLmMxISkubXVsKDEwMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5zdW1hcmVfcHJvY2Vzc29yID0gbmV3IEdvcmRpYy5EYXRhLkJhc2VQcm9jZXNzb3IoeyAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aWVyczogeyB2aWV3OiB7IG9yZGVyOiAxIH0gfSxcclxuICAgICAgICAgICAgICAgIHByb2Nlc3M6ICh0aWVycywgZGF0YSwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFzdW0gPSBkYXRhLmZpbmQoKHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChyLl9pc1N1bW1hcnkpICYmIChyLl9pc1N1bW1hcnkgPT0gdHJ1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhc3VtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LktQSV9zdW1fYzAgJiYgdGhhdC5LUElfc3VtX2MwLmRldGFpbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuS1BJX3N1bV9jMC5kZXRhaWxzWzBdLnZhbHVlID0gZGF0YXN1bS5kYXRhLmMwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5LUElfc3VtX2MwLmRldGFpbHNbMF0ubWVhbmluZyA9IChwYXJzZURlY2ltYWwoZGF0YXN1bS5kYXRhLmMwISkubGVzc1RoYW4oMCkpID8gXCJuZWdhdGl2ZVwiIDogXCJpbmZvXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LktQSV9zdW1fYzAudXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuS1BJX3N1bV9jMSAmJiB0aGF0LktQSV9zdW1fYzEuZGV0YWlscykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5LUElfc3VtX2MxLmRldGFpbHNbMF0udmFsdWUgPSBkYXRhc3VtLmRhdGEuYzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LktQSV9zdW1fYzEuZGV0YWlsc1swXS5tZWFuaW5nID0gKHBhcnNlRGVjaW1hbChkYXRhc3VtLmRhdGEuYzEhKS5sZXNzVGhhbigwKSkgPyBcIm5lZ2F0aXZlXCIgOiBcImluZm9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuS1BJX3N1bV9jMS51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5LUElfc3VtX2MwX25ldyAmJiB0aGF0LktQSV9zdW1fYzBfbmV3LmRldGFpbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuS1BJX3N1bV9jMF9uZXcuZGV0YWlsc1swXS52YWx1ZSA9IGRhdGFzdW0uZGF0YS5jMF9uZXchO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5LUElfc3VtX2MwX25ldy5kZXRhaWxzWzBdLm1lYW5pbmcgPSAocGFyc2VEZWNpbWFsKGRhdGFzdW0uZGF0YS5jMF9uZXchKS5sZXNzVGhhbigwKSkgPyBcIm5lZ2F0aXZlXCIgOiBcImluZm9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZURlY2ltYWwoZGF0YXN1bS5kYXRhLmMwISkuZXF1YWxzKDApID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2NfYzAgPSBwYXJzZURlY2ltYWwoZGF0YXN1bS5kYXRhLmMwX25ldyEpLmRpdihwYXJzZURlY2ltYWwoZGF0YXN1bS5kYXRhLmMwISkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuS1BJX3Byb2NfYzAuY2hhcnQuZGF0YSA9IERlY2ltYWwucm91bmQocGFyc2VEZWNpbWFsKHByb2NfYzApLnRpbWVzKDEwMDAwKSkuZGl2KDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5LUElfcHJvY19jMC51cGRhdGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5LUElfc3VtX2MwX25ldy51bml0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LktQSV9zdW1fYzBfbmV3LmZvcm1hdHRlciA9IFwiQ1wiO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5LUElfc3VtX2MwX25ldy5jaGFydCA9IHsgdHlwZTogXCJsaXF1aWRcIiwgZGF0YTogRGVjaW1hbC5yb3VuZChwYXJzZURlY2ltYWwocHJvY19jMCkudGltZXMoMTAwMDApKS5kaXYoMTAwKSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuS1BJX3N1bV9jMF9uZXcucHJpbWFyeVRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuS1BJX3N1bV9jMF9uZXcuc2Vjb25kYXJ5VGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LktQSV9zdW1fYzBfbmV3LnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LktQSV9zdW1fYzFfbmV3ICYmIHRoYXQuS1BJX3N1bV9jMV9uZXcuZGV0YWlscykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5LUElfc3VtX2MxX25ldy5kZXRhaWxzWzBdLnZhbHVlID0gZGF0YXN1bS5kYXRhLmMxX25ldyE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LktQSV9zdW1fYzFfbmV3LmRldGFpbHNbMF0ubWVhbmluZyA9IChwYXJzZURlY2ltYWwoZGF0YXN1bS5kYXRhLmMxX25ldyEpLmxlc3NUaGFuKDApKSA/IFwibmVnYXRpdmVcIiA6IFwiaW5mb1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRGVjaW1hbChkYXRhc3VtLmRhdGEuYzEhKS5lcXVhbHMoMCkgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY19jMSA9IHBhcnNlRGVjaW1hbChkYXRhc3VtLmRhdGEuYzFfbmV3ISkuZGl2KHBhcnNlRGVjaW1hbChkYXRhc3VtLmRhdGEuYzEhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5LUElfcHJvY19jMS5jaGFydC5kYXRhID0gRGVjaW1hbC5yb3VuZChwYXJzZURlY2ltYWwocHJvY19jMSkudGltZXMoMTAwMDApKS5kaXYoMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LktQSV9wcm9jX2MxLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LktQSV9zdW1fYzFfbmV3LnVuaXQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuS1BJX3N1bV9jMV9uZXcuZm9ybWF0dGVyID0gXCJDXCI7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LktQSV9zdW1fYzFfbmV3LmNoYXJ0ID0geyB0eXBlOiBcImxpcXVpZFwiLCBkYXRhOiBEZWNpbWFsLnJvdW5kKHBhcnNlRGVjaW1hbChwcm9jX2MxKS50aW1lcygxMDAwMCkpLmRpdigxMDApIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5LUElfc3VtX2MxX25ldy5wcmltYXJ5VGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5LUElfc3VtX2MxX25ldy5zZWNvbmRhcnlUZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuS1BJX3N1bV9jMV9uZXcudXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LktQSV9zdW1fcm96ZGlsX25ldyAmJiB0aGF0LktQSV9zdW1fcm96ZGlsX25ldy5kZXRhaWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LktQSV9zdW1fcm96ZGlsX25ldy5kZXRhaWxzWzBdLnZhbHVlID0gKHBhcnNlRGVjaW1hbChkYXRhc3VtLmRhdGEuYzBfbmV3ISkubWludXMocGFyc2VEZWNpbWFsKGRhdGFzdW0uZGF0YS5jMV9uZXchKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5LUElfc3VtX3JvemRpbF9uZXcuZGV0YWlsc1swXS5tZWFuaW5nID0gKChwYXJzZURlY2ltYWwoZGF0YXN1bS5kYXRhLmMwX25ldyEpLm1pbnVzKHBhcnNlRGVjaW1hbChkYXRhc3VtLmRhdGEuYzFfbmV3ISkpKS5sZXNzVGhhbigwKSkgPyBcIm5lZ2F0aXZlXCIgOiBcImluZm9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuS1BJX3N1bV9yb3pkaWxfbmV3LnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnZpZXdfSVNMID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGlzLmlzbC5CYWxhbmNuaVZlcnplRGF0YS5saXN0KHt9KSwge1xyXG4gICAgICAgICAgICAgICAgc3RhcnRFbXB0eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9jZW50YTogdGhhdC5wcm9jZW50YV9wcm9jZXNzb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VtYXJlOiB0aGF0LnN1bWFyZV9wcm9jZXNzb3JcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgICAgICAkKFwiPGRpdj5cIikuYXBwZW5kVG8obWFpbkZvcm0pLmdrcGlwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5TW9kZTogXCJwYW5lbFwiLFxyXG4gICAgICAgICAgICAgICAgc29ydGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByZXN1bHQsIFxyXG4gICAgICAgICAgICAvLyAgICBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICB3aWR0aDogMjIwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kbWFpblRhYmxlID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnZpZXdfSVNMLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUm93U2VsZWN0ZWRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm93ID0gY3R4LmNlbGxJbmZvLmRhdGE7ICAgIC8vZGF0YSwgemUga3RlcnljaCBieWwgdnl0dm9yZW4gcmFkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY3R4LmNlbGxJbmZvLmNvbHVtbi5uYW1lID09IFwiYzBfbmV3XCIpIHx8IChjdHguY2VsbEluZm8uY29sdW1uLm5hbWUgPT0gXCJjMV9uZXdcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkaWFsb2cgbmEgem1lbnUgY2FzdGt5XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub3ZhX2Nhc3RrYTogRGVjaW1hbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC5jZWxsSW5mby5jb2x1bW4ubmFtZSA9PSBcImMwX25ld1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnptZW5hSG9kbm90eShjdHguY2VsbEluZm8uY29sdW1uLm5hbWUsIHRoYXQucm93LmMwLCB0aGF0LnJvdy5jMSkudGhlbihmdW5jdGlvbiAobm92ZV9jYXN0a3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5yb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucm93LmMwX25ldyAhPSBub3ZlX2Nhc3RreS5jMF9uZXdfYmFsYW5jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJvdy5jMF9uZXcgPSBub3ZlX2Nhc3RreS5jMF9uZXdfYmFsYW5jO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cuc29yX2lkID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YSh0aGF0LnJvdywgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC5jZWxsSW5mby5jb2x1bW4ubmFtZSA9PSBcImMxX25ld1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnptZW5hSG9kbm90eShjdHguY2VsbEluZm8uY29sdW1uLm5hbWUsIHRoYXQucm93LmMwLCB0aGF0LnJvdy5jMSkudGhlbihmdW5jdGlvbiAobm92ZV9jYXN0a3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5yb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucm93LmMxX25ldyAhPSBub3ZlX2Nhc3RreS5jMV9uZXdfYmFsYW5jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJvdy5jMV9uZXcgPSBub3ZlX2Nhc3RreS5jMV9uZXdfYmFsYW5jO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cuc29yX2lkID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YSh0aGF0LnJvdywgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbihldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTpcInJvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IEdvcmRpYy5CYXIuV2ViQ2xpZW50LkJhckZ1bmN0aW9uLnpqaXN0aV9zbG91cGNlX3NlYXJjaCh0aGF0LmdyaWRGb3JtYXRTZXpuYW0pLCBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbHVtbkxpc3Q6IFwia2xpaywgbmtzLCB1ZWQsIHVlZSwgYzAsIGMwX25ldywgYzEsIGMxX25ld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czogdGhpcy5teV9Db25kRm9ybWF0cyAgICAgICAgICAgICAgICAgICAgICAgIC8vY29sdW1uTGlzdDogR29yZGljLkJhci5XZWJDbGllbnQuQmFyRnVuY3Rpb24uemppc3RpX3Nsb3VwY2UodGhhdC5ncmlkRm9ybWF0U2V6bmFtKSwgY29uZEZvcm1hdHM6IHRoaXMubXlfQ29uZEZvcm1hdHNcclxuICAgICAgICAgICAgICAgICAgICB9LCBcclxuICAgICAgICAgICAgICAgICAgICAvL3Byb2ZpbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgeyBuYW1lOiBcIlpqZWRub2R1xaFlbsO9XCIsIGNvbHVtbkxpc3Q6IFwia2xpaywgbmtzLCB1ZWQsIHVlZSwgYzAsIGMwX25ldywgcHAsIGMxLCBjMV9uZXcsIHB2XCIsIGNvbmRGb3JtYXRzOiB0aGlzLm15X0NvbmRGb3JtYXRzLCBfbG9ja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgeyBuYW1lOiBcIsOacGxuw71cIiwgY29sdW1uTGlzdDogR29yZGljLkJhci5XZWJDbGllbnQuQmFyRnVuY3Rpb24uemppc3RpX3Nsb3VwY2UodGhhdC5ncmlkRm9ybWF0U2V6bmFtKSwgY29uZEZvcm1hdHM6IHRoaXMubXlfQ29uZEZvcm1hdHMsIF9sb2NrZWQ6IHRydWUgfSAvL2dyaWRGb3JtYXRTZXpuYW0uY29sdW1ucy5maWx0ZXIoKGMpID0+IGMubmFtZSAhPSBcImtuaWhhXCIpLmpvaW4oKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5ncmlkRm9ybWF0U2V6bmFtLFxyXG4gICAgICAgICAgICAgICAgfSkuZ2dyaWRla28oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc291xI10b3bDvSDFmcOhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeVJvd0FsbG93ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeVJvd0NvbHVtbnM6IFtcImMwXCIsIFwiYzFcIiwgXCJjMF9uZXdcIiwgXCJjMV9uZXdcIl0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRsb3Vow70gc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgbG9uZ0xpc3RBbGxvd2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2xvbmdMaXN0TW9kZWw6IFwiR2xvYmFsLkJhci5BcHBTZXR0aW5nc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbG9uZ0xpc3RDb3VudE1ldGhvZDogKHJxKSA9PiBjbnQuaXNsLkFrY2UubGlzdENvdW50KHJxKS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRtYWluVGFibGUuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCJsY2xpY2tcIixcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG96aXRpdm7DrSBmaWx0clwiLFxyXG4gICAgICAgICAgICAgICAgY2FuRXhlY3V0ZTogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCQoZXYudGFyZ2V0KS5oYXNDbGFzcyhcImNlbGxcIikpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2VsUG9zaXRpdkZpbHRyQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3Rhdl9rbGlrKGV2LCBjdHgsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJG1haW5UYWJsZS5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcInJjbGlja1wiLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkdyaWQsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOZWdhdGl2bsOtIGZpbHRyXCIsXHJcbiAgICAgICAgICAgICAgICBjYW5FeGVjdXRlOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoJChldi50YXJnZXQpLmhhc0NsYXNzKFwiY2VsbFwiKSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2VsTmVnYXRpdkZpbHRyQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3Rhdl9rbGlrKGV2LCBjdHgsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJG1haW5UYWJsZS5nc2hvcnRjdXQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wucmVxdWVzdERhdGEoKTtcclxuLy8gICAgICAgICAgICB0aGlzLiRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld19JU0wpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdlbmVyYXRlUmVwb3J0KHJlcCkge1xyXG4gICAgICAgICAgICB2YXIgY250ID0gdGhpcztcclxuICAgICAgICAgICAgLy9yZXAuY3VzdG9tRHRvID0gY250LmN1cnJlbnRmaWx0ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB6bWVuYUhvZG5vdHkoc2xvdXBlYywgY2FzdGthX2MwLCBjYXN0a2FfYzEpOiBKUXVlcnlQcm9taXNlPEdvcmRpYy5CYXIuSW50ZXJmYWNlLkdCYXJDYXN0a3lEdG8+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbmV3X2Nhc3RrYV9jMDogRGVjaW1hbDtcclxuICAgICAgICAgICAgdmFyIG5ld19jYXN0a2FfYzE6IERlY2ltYWw7XHJcbiAgICAgICAgICAgIHZhciBpbl9kYXRhOiBHb3JkaWMuQmFyLkludGVyZmFjZS5HQmFyQ2FzdGt5RHRvID0ge307XHJcbiAgICAgICAgICAgIG5ld19jYXN0a2FfYzAgPSBjYXN0a2FfYzA7XHJcbiAgICAgICAgICAgIG5ld19jYXN0a2FfYzEgPSBjYXN0a2FfYzE7XHJcblxyXG4gICAgICAgICAgICBpbl9kYXRhLmMwX25ldyA9IGNhc3RrYV9jMDtcclxuICAgICAgICAgICAgaW5fZGF0YS5jMF9uZXdfYmFsYW5jID0gY2FzdGthX2MwO1xyXG4gICAgICAgICAgICBpbl9kYXRhLmMxX25ldyA9IGNhc3RrYV9jMTtcclxuICAgICAgICAgICAgaW5fZGF0YS5jMV9uZXdfYmFsYW5jID0gY2FzdGthX2MxO1xyXG4gICAgICAgICAgICBpbl9kYXRhLnByb2NlbnQgPSBuZXcgRGVjaW1hbCgxMDApO1xyXG4gICAgICAgICAgICBpbl9kYXRhLnJvemRpbCA9IG5ldyBEZWNpbWFsKDApO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsX29EaXYgPSB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkJhci5XZWJDbGllbnQuR0JhckNhc3RrYUZvcm1cIiwgeyBtb2RlbDogaW5fZGF0YSB9LCBcIsOacHJhdmEgxI3DoXN0a3lcIiwgMzUwLCA1MDAsIHRydWUpXHJcblxyXG5cclxuICAgICAgICAgICAgJChsX29EaXYpLm9uKCdjbG9zZScsIGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGN0eCAhPSB1bmRlZmluZWQpICYmIChjdHggIT0gbnVsbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWt0X2RhdGEgPSBjdHguZGF0YSE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFrdF9kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoYWt0X2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgem1lbmFIb2Rub3R5SHJvbShwdXZfYzAsIHB1dl9jMSk6IEpRdWVyeVByb21pc2UgPCBHb3JkaWMuQmFyLkludGVyZmFjZS5HQmFyQ2FzdGt5RHRvID4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBuZXdfY2FzdGthX2MwOiBEZWNpbWFsO1xyXG4gICAgICAgICAgICB2YXIgbmV3X2Nhc3RrYV9jMTogRGVjaW1hbDtcclxuICAgICAgICAgICAgdmFyIGluX2RhdGE6IEdvcmRpYy5CYXIuSW50ZXJmYWNlLkdCYXJDYXN0a3lEdG8gPSB7fTtcclxuICAgICAgICAgICAgbmV3X2Nhc3RrYV9jMCA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICBuZXdfY2FzdGthX2MxID0gbmV3IERlY2ltYWwoMCk7XHJcblxyXG4gICAgICAgICAgICBpbl9kYXRhLmMwX25ldyA9IHB1dl9jMDtcclxuICAgICAgICAgICAgaW5fZGF0YS5jMF9uZXdfYmFsYW5jID0gcHV2X2MwO1xyXG4gICAgICAgICAgICBpbl9kYXRhLmMxX25ldyA9IHB1dl9jMTtcclxuICAgICAgICAgICAgaW5fZGF0YS5jMV9uZXdfYmFsYW5jID0gcHV2X2MxO1xyXG4gICAgICAgICAgICBpbl9kYXRhLnByb2NlbnQgPSBuZXcgRGVjaW1hbCgxMDApO1xyXG4gICAgICAgICAgICBpbl9kYXRhLnJvemRpbCA9IG5ldyBEZWNpbWFsKDApO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsX29EaXYgPSB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkJhci5XZWJDbGllbnQuR0JhckNhc3RrYUZvcm1cIiwgeyBtb2RlbDogaW5fZGF0YSB9LCBcIsOacHJhdmEgxI3DoXN0a3kgaHJvbWFkbsSbXCIsIDM1MCwgNTAwLCB0cnVlKVxyXG5cclxuXHJcbiAgICAgICAgICAgICQobF9vRGl2KS5vbignY2xvc2UnLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKChjdHggIT0gdW5kZWZpbmVkKSAmJiAoY3R4ICE9IG51bGwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFrdF9kYXRhID0gY3R4LmRhdGEhO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGFrdF9kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hc3Rhdl9rbGlrKGV2LCBjdHgsIHBveml0aXZuaTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2xvdXBlY19pbmZvX25hbWUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIGluZGV4X3Nsb3VwY2UgPSBOdW1iZXIoICQoZXYudGFyZ2V0KS5hdHRyKFwiZGF0YS1jb2x1bW4taW5kZXhcIikpO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXhfcmFka3UgPSBOdW1iZXIoICQoZXYudGFyZ2V0KS5jbG9zZXN0KFwiLnJvd1wiKS5hdHRyKFwiZGF0YS1yb3ctaW5kZXhcIikpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1vamVfY2VsbF9pbmZvID0gdGhhdC4kbWFpblRhYmxlLmdncmlkKFwiY2VsbEluZm9cIiwgaW5kZXhfcmFka3UsIGluZGV4X3Nsb3VwY2UpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1vamVfY2VsbF9pbmZvLm1ldGEuX2lzU3VtbWFyeSAhPSB0cnVlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGFrdF9rbGlrID0gbW9qZV9jZWxsX2luZm8uZGF0YS5rbGlrO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld19rbGlrID0gbW9qZV9jZWxsX2luZm8uZGF0YS5rbGlrO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzbG91cGVjX2luZm9fbmFtZSA9IFwiXCI7XHJcbiBcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc2xvdXBlY19pbmZvID0gbW9qZV9jZWxsX2luZm8uY29sdW1uO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3VwZWNfaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsb3VwZWNfaW5mb19uYW1lID0gc2xvdXBlY19pbmZvLm5hbWUhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKChzbG91cGVjX2luZm9fbmFtZSAhPSB1bmRlZmluZWQpICYmIChzbG91cGVjX2luZm9fbmFtZSAhPSBcIlwiKSAmJiAoc2xvdXBlY19pbmZvX25hbWUgIT0gXCJrbGlrXCIpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoc2xvdXBlY19pbmZvX25hbWUgIT0gXCJjMF9uZXdcIikgJiYgKHNsb3VwZWNfaW5mb19uYW1lICE9IFwiYzFfbmV3XCIpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhhdC5kZWpfdXJvdmVuX251bShzbG91cGVjX2luZm9fbmFtZSk7IC8vIGRvdGFobm91dCBwb3JhZGkgeiBrb25maWd1cmFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFrdF96bmFrID0gYWt0X2tsaWtbaW5kZXghXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB6bmFrID0gKGFrdF96bmFrID09IFwiMFwiKSA/IFwiMVwiIDogKGFrdF96bmFrID09IFwiMVwiKSA/IFwiMlwiIDogXCIwXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdXNpbSBzZSBuYWppdCBqZXN0bGkgdXogbmEgc3Rlam55IHNsb3VwZWMgbmVieWxvIGtsaWtudXRvIGEgcG9rdWQgYW5vLCB0YWsgbXUgbmFzdGF2aW0gbmEgZGFub3UgcG96aWNpIFwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoem5hayAhPSBcIjBcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YWtsaWsgPSB0aGF0LnZpZXdfSVNMLmdldERhdGFSb3dzKHRydWUpLmZpbmQoKHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChyLl9pc1N1bW1hcnkpICYmIChyLl9pc1N1bW1hcnkgPT0gdHJ1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyLmRhdGEua2xpaz8uY2hhckF0KGluZGV4KSAhPSBcIjBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFrbGlrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrbGlrcmFkZWs6IHN0cmluZyA9IGRhdGFrbGlrIS5kYXRhIS5rbGlrITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSBkYXRha2xpayEuZGF0YSEua2xpayEuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFbaW5kZXghXSA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRha2xpayEuZGF0YSEua2xpayA9IGEuam9pbihcIlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShkYXRha2xpaywgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm93ID0gbW9qZV9jZWxsX2luZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm93ID0gdGhhdC4kbWFpblRhYmxlLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucm93ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IHRoYXQucm93LmtsaWshLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFbaW5kZXghXSA9IHpuYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cua2xpayA9IGEuam9pbihcIlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHRoYXQucm93LCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBqZW5vbSBwcm8gYzBfbmV3IGEgYzFfbmV3XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoYXQuZGVqX3Vyb3Zlbl9udW0oc2xvdXBlY19pbmZvX25hbWUpOyAvLyBkb3RhaG5vdXQgcG9yYWRpIHoga29uZmlndXJhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBha3Rfem5hayA9IGFrdF9rbGlrW2luZGV4IV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgem5hayA9IChha3Rfem5hayA9PSBcIjBcIikgPyBcIjNcIiA6IFwiMFwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VzaW0gc2UgbmFqaXQgamVzdGxpIHV6IG5hIHN0ZWpueSBzbG91cGVjIG5lYnlsbyBrbGlrbnV0byBhIHBva3VkIGFubywgdGFrIG11IG5hc3RhdmltIG5hIGRhbm91IHBvemljaSBcIjBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHpuYWsgIT0gXCIwXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFrbGlrID0gdGhhdC52aWV3X0lTTC5nZXREYXRhUm93cyh0cnVlKS5maW5kKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoci5faXNTdW1tYXJ5KSAmJiAoci5faXNTdW1tYXJ5ID09IHRydWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoci5kYXRhLmtsaWs/LmNoYXJBdChpbmRleCkgIT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRha2xpaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIga2xpa3JhZGVrOiBzdHJpbmcgPSBkYXRha2xpayEuZGF0YSEua2xpayE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhID0gZGF0YWtsaWshLmRhdGEhLmtsaWshLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhW2luZGV4IV0gPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YWtsaWshLmRhdGEhLmtsaWsgPSBhLmpvaW4oXCJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEoZGF0YWtsaWssIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJvdyA9IG1vamVfY2VsbF9pbmZvLmRhdGE7ICAgIC8vZGF0YSwgemUga3RlcnljaCBieWwgdnl0dm9yZW4gcmFkZWtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJvdyA9IHRoYXQuJG1haW5UYWJsZS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnJvdyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSB0aGF0LnJvdy5rbGlrIS5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhW2luZGV4IV0gPSB6bmFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm93LmtsaWsgPSBhLmpvaW4oXCJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YSh0aGF0LnJvdywgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlal9ob2Rub3R1X3Nsb3VwY2VfcG9kbWlua2Eoam1lbm9fc2xvdXBjZTogc3RyaW5nLCByOiBHb3JkaWMuQmFyLkludGVyZmFjZS5HQmFyZG4wMER0bywgaW5fb3BlcmF0b3IgOiBzdHJpbmcgKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIG91dF9wb2RtaW5rYTogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIGptZW5vX3Nsb3VwY2VfZGF0YTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoam1lbm9fc2xvdXBjZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImMwblwiOiB7IGptZW5vX3Nsb3VwY2VfZGF0YSA9IFwiYzFfbmV3XCI7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYzFuXCI6IHsgam1lbm9fc2xvdXBjZV9kYXRhID0gXCJjMV9uZXdcIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJkem1cIjogeyBqbWVub19zbG91cGNlX2RhdGEgPSBcImRhdF96bWVuYVwiOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBcImtvbVwiOiB7IGptZW5vX3Nsb3VwY2VfZGF0YSA9IFwia29tb2RpdGFcIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJrb3BcIjogeyBqbWVub19zbG91cGNlX2RhdGEgPSBcImtvbXBcIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJwb3BcIjogeyBqbWVub19zbG91cGNlX2RhdGEgPSBcInBvcGlzXCI7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwieGNvXCI6IHsgam1lbm9fc2xvdXBjZV9kYXRhID0gXCJ0X2ljb1wiOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBcInhlMFwiOiB7IGptZW5vX3Nsb3VwY2VfZGF0YSA9IFwidF90ZTBcIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ4ZTFcIjogeyBqbWVub19zbG91cGNlX2RhdGEgPSBcInRfdGUxXCI7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwieGtzXCI6IHsgam1lbm9fc2xvdXBjZV9kYXRhID0gXCJ0X25rc1wiOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBcInptcFwiOiB7IGptZW5vX3Nsb3VwY2VfZGF0YSA9IFwiem1lbnVfcHJvdl90eHRcIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHsgam1lbm9fc2xvdXBjZV9kYXRhID0gam1lbm9fc2xvdXBjZTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2ggKGptZW5vX3Nsb3VwY2UpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJkem1cIjogeyBvdXRfcG9kbWlua2EgPSBcIihcIiArIGptZW5vX3Nsb3VwY2VfZGF0YSArIFwiIFwiICsgaW5fb3BlcmF0b3IgKyBcIiAnXCIgKyByLmRhdF96bWVuYSArIFwiJyApIFwiOyBicmVhazsgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJjMFwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiIFwiICsgci5jMCArIFwiKSBcIjsgYnJlYWs7IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYzBuXCI6IHsgb3V0X3BvZG1pbmthID0gXCIoXCIgKyBqbWVub19zbG91cGNlX2RhdGEgKyBcIiBcIiArIGluX29wZXJhdG9yICsgXCIgXCIgKyByLmMwX25ldyArIFwiKSBcIjsgYnJlYWs7IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYzFcIjogeyBvdXRfcG9kbWlua2EgPSBcIihcIiArIGptZW5vX3Nsb3VwY2VfZGF0YSArIFwiIFwiICsgaW5fb3BlcmF0b3IgKyBcIiBcIiArIHIuYzEgKyBcIikgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImMxblwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiIFwiICsgci5jMV9uZXcgKyBcIikgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImRlblwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiIFwiICsgci5kZW4gKyBcIikgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImRyZFwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiIFwiICsgci5kcmQgKyBcIikgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1lc1wiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiIFwiICsgci5tZXNpYyArIFwiKSBcIjsgYnJlYWs7IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicm9rXCI6IHsgb3V0X3BvZG1pbmthID0gXCIoXCIgKyBqbWVub19zbG91cGNlX2RhdGEgKyBcIiBcIiArIGluX29wZXJhdG9yICsgXCIgXCIgKyByLnJvayArIFwiKSBcIjsgYnJlYWs7IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic29yX2lkXCI6IHsgb3V0X3BvZG1pbmthID0gXCIoXCIgKyBqbWVub19zbG91cGNlX2RhdGEgKyBcIiBcIiArIGluX29wZXJhdG9yICsgXCIgXCIgKyByLnNvcl9pZCArIFwiKSBcIjsgYnJlYWs7IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiaWNvXCI6IHsgb3V0X3BvZG1pbmthID0gXCIoXCIgKyBqbWVub19zbG91cGNlX2RhdGEgKyBcIiBcIiArIGluX29wZXJhdG9yICsgXCIgJ1wiICsgci5pY28gKyBcIicgKSBcIjsgYnJlYWs7IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiaXhwXCI6IHsgb3V0X3BvZG1pbmthID0gXCIoXCIgKyBqbWVub19zbG91cGNlX2RhdGEgKyBcIiBcIiArIGluX29wZXJhdG9yICsgXCIgJ1wiICsgci5peHAgKyBcIicgKSBcIjsgYnJlYWs7IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwia29tXCI6IHsgb3V0X3BvZG1pbmthID0gXCIoXCIgKyBqbWVub19zbG91cGNlX2RhdGEgKyBcIiBcIiArIGluX29wZXJhdG9yICsgXCIgJ1wiICsgci5rb21vZGl0YSArIFwiJyApIFwiOyBicmVhazsgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJrb3BcIjogeyBvdXRfcG9kbWlua2EgPSBcIihcIiArIGptZW5vX3Nsb3VwY2VfZGF0YSArIFwiIFwiICsgaW5fb3BlcmF0b3IgKyBcIiAnXCIgKyByLmtvbXAgKyBcIicgKSBcIjsgYnJlYWs7IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibGljXCI6IHsgb3V0X3BvZG1pbmthID0gXCIoXCIgKyBqbWVub19zbG91cGNlX2RhdGEgKyBcIiBcIiArIGluX29wZXJhdG9yICsgXCIgJ1wiICsgci5saWMgKyBcIicgKSBcIjsgYnJlYWs7IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibmtzXCI6IHsgb3V0X3BvZG1pbmthID0gXCIoXCIgKyBqbWVub19zbG91cGNlX2RhdGEgKyBcIiBcIiArIGluX29wZXJhdG9yICsgXCIgJ1wiICsgci5ua3MgKyBcIicgKSBcIjsgYnJlYWs7IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicG9wXCI6IHsgb3V0X3BvZG1pbmthID0gXCIoXCIgKyBqbWVub19zbG91cGNlX2RhdGEgKyBcIiBcIiArIGluX29wZXJhdG9yICsgXCIgJ1wiICsgci5wb3BpcyArIFwiJyApIFwiOyBicmVhazsgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ4Y29cIjogeyBvdXRfcG9kbWlua2EgPSBcIihcIiArIGptZW5vX3Nsb3VwY2VfZGF0YSArIFwiIFwiICsgaW5fb3BlcmF0b3IgKyBcIiAnXCIgKyByLnRfaWNvICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInhrc1wiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudF9ua3MgKyBcIicgKSBcIjsgYnJlYWs7IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwieGUwXCI6IHsgb3V0X3BvZG1pbmthID0gXCIoXCIgKyBqbWVub19zbG91cGNlX2RhdGEgKyBcIiBcIiArIGluX29wZXJhdG9yICsgXCIgJ1wiICsgci50X3RlMCArIFwiJyApIFwiOyBicmVhazsgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ4ZTFcIjogeyBvdXRfcG9kbWlua2EgPSBcIihcIiArIGptZW5vX3Nsb3VwY2VfZGF0YSArIFwiIFwiICsgaW5fb3BlcmF0b3IgKyBcIiAnXCIgKyByLnRfdGUxICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInRlMFwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudGUwICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInRlMVwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudGUxICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInRlMlwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudGUyICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInRlM1wiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudGUzICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInRlNFwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudGU0ICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInVjc1wiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudWNzICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInVlYVwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudWVhICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInVlYlwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudWViICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInVlY1wiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudWVjICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInVlZFwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudWVkICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInVlZVwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudWVlICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInVlZlwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudWVmICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInVlZ1wiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudWVnICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInVlaFwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudWVoICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInVlaVwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudWVpICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInVlalwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudWVqICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInV1c1wiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIudXVzICsgXCInICkgXCI7IGJyZWFrOyB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInZlcnplX2NcIjogeyBvdXRfcG9kbWlua2EgPSBcIihcIiArIGptZW5vX3Nsb3VwY2VfZGF0YSArIFwiIFwiICsgaW5fb3BlcmF0b3IgKyBcIiAnXCIgKyByLnZlcnplX2MgKyBcIicgKSBcIjsgYnJlYWs7IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwieHBmX2ZzXCI6IHsgb3V0X3BvZG1pbmthID0gXCIoXCIgKyBqbWVub19zbG91cGNlX2RhdGEgKyBcIiBcIiArIGluX29wZXJhdG9yICsgXCIgJ1wiICsgci54cGZfZnMgKyBcIicgKSBcIjsgYnJlYWs7IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwieHBmX3BmXCI6IHsgb3V0X3BvZG1pbmthID0gXCIoXCIgKyBqbWVub19zbG91cGNlX2RhdGEgKyBcIiBcIiArIGluX29wZXJhdG9yICsgXCIgJ1wiICsgci54cGZfcGYgKyBcIicgKSBcIjsgYnJlYWs7IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiem1lbnVfcHJvdlwiOiB7IG91dF9wb2RtaW5rYSA9IFwiKFwiICsgam1lbm9fc2xvdXBjZV9kYXRhICsgXCIgXCIgKyBpbl9vcGVyYXRvciArIFwiICdcIiArIHIuem1lbnVfcHJvdiArIFwiJyApIFwiOyBicmVhazsgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ6bXBcIjogeyBvdXRfcG9kbWlua2EgPSBcIihcIiArIGptZW5vX3Nsb3VwY2VfZGF0YSArIFwiIFwiICsgaW5fb3BlcmF0b3IgKyBcIiAnXCIgKyByLnptZW51X3Byb3ZfdHh0ICsgXCInICkgIFwiOyBicmVhazsgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG91dF9wb2RtaW5rYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlal91cm92ZW5fbnVtKGptZW5vX3Nsb3VwY2U6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciB4X25hbWU6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGptZW5vX3Nsb3VwY2UpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJjMF9uZXdcIjogeyB4X25hbWUgPSBcImMwblwiOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBcImMxX25ld1wiOiB7IHhfbmFtZSA9IFwiYzFuXCI7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGF0X3ptZW5hXCI6IHsgeF9uYW1lID0gXCJkem1cIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJrb21vZGl0YVwiOiB7IHhfbmFtZSA9IFwia29tXCI7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwia29tcFwiOiB7IHhfbmFtZSA9IFwia29wXCI7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicG9waXNcIjogeyB4X25hbWUgPSBcInBvcFwiOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBcInRfaWNvXCI6IHsgeF9uYW1lID0gXCJ4Y29cIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0X3RlMFwiOiB7IHhfbmFtZSA9IFwieGUwXCI7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwidF90ZTFcIjogeyB4X25hbWUgPSBcInhlMVwiOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBcInRfbmtzXCI6IHsgeF9uYW1lID0gXCJ4a3NcIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ6bWVudV9wcm92X3R4dFwiOiB7IHhfbmFtZSA9IFwiem1wXCI7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7IHhfbmFtZSA9IGptZW5vX3Nsb3VwY2U7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBvdXRfdXJvdmVuX251bSA9IC0xO1xyXG4gICAgICAgICAgICB2YXIgcG9sZSA6IEdvcmRpYy5CYXIuSW50ZXJmYWNlLkdTcnZzY2Z1RHRvW10gPSB0aGF0Lmdsb2JhbHMuS29uZmlndXJhY2VfYmFsYW5jITtcclxuICAgICAgICAgICAgdmFyIHphem5hbTogR29yZGljLkJhci5JbnRlcmZhY2UuR1NydnNjZnVEdG87XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcmFkZWtfa29uID0gcG9sZSEuZmluZCgocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHIuZGJfbmF6ZXYgPT0geF9uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChyYWRla19rb24pIHtcclxuICAgICAgICAgICAgICAgIG91dF91cm92ZW5fbnVtID0gcmFkZWtfa29uIS51cm92ZW5fbnVtISAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vcG9sZSEuZm9yRWFjaCgocikgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICB6YXpuYW0gPSByO1xyXG4gICAgICAgICAgICAvLyAgICBpZiAoemF6bmFtLmRiX25hemV2ID09IHhfbmFtZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgb3V0X3Vyb3Zlbl9udW0gPSB6YXpuYW0udXJvdmVuX251bSE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBvdXRfdXJvdmVuX251bSA9IG91dF91cm92ZW5fbnVtIC0gMTtcclxuICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiBvdXRfdXJvdmVuX251bTtcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG91dF91cm92ZW5fbnVtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFzdGF2X3BvZG1pbmVueV9mb3JtYXQoKTogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0W10ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBvdXRfQ29uZEZvcm1hdDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0O1xyXG4gICAgICAgICAgICB2YXIgb3V0X0NvbmRGb3JtYXR5OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRbXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwb2xlOiBHb3JkaWMuQmFyLkludGVyZmFjZS5HU3J2c2NmdUR0b1tdID0gdGhhdC5nbG9iYWxzLktvbmZpZ3VyYWNlX2JhbGFuYyE7XHJcbiAgICAgICAgICAgIHZhciB6YXpuYW06IEdvcmRpYy5CYXIuSW50ZXJmYWNlLkdTcnZzY2Z1RHRvO1xyXG4gICAgICAgICAgICB2YXIgeF9uYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgb3V0X0NvbmRGb3JtYXR5ID0gW107XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBha3RfZm9ybXVsYV8xID0gXCIoTUlEKEBrbGlrLCAyMywgMSk9PSBcXFwiMVxcXCIpXCJcclxuICAgICAgICAgICAgLy9vdXRfQ29uZEZvcm1hdCA9IHsgYXBwbHlUbzogeF9uYW1lLCBkZXNjcmlwdGlvbjogXCJrbGlrIFBPWiBcIiArIHhfbmFtZSwgZm9ybXVsYTogYWt0X2Zvcm11bGFfMSwgYmc6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdEJnLmRhcmtyZWQgfTtcclxuICAgICAgICAgICAgLy9vdXRfQ29uZEZvcm1hdHkucHVzaChvdXRfQ29uZEZvcm1hdCk7XHJcbiAgICAgICAgICAgIC8vdmFyIGFrdF9mb3JtdWxhXzIgPSBcIihNSUQoQGtsaWssIDIzLCAxKT09IFxcXCIyXFxcIilcIlxyXG4gICAgICAgICAgICAvL291dF9Db25kRm9ybWF0ID0geyBhcHBseVRvOiB4X25hbWUsIGRlc2NyaXB0aW9uOiBcImtsaWsgTkVHIFwiICsgeF9uYW1lLCBmb3JtdWxhOiBha3RfZm9ybXVsYV8yLCBiZzogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0QmcuZGFya2JsdWUgfTtcclxuICAgICAgICAgICAgLy9vdXRfQ29uZEZvcm1hdHkucHVzaChvdXRfQ29uZEZvcm1hdCk7XHJcblxyXG4gICAgICAgICAgICBwb2xlIS5mb3JFYWNoKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoci5wb3V6aXRpID09IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyLmRiX25hemV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjMG5cIjogeyB4X25hbWUgPSBcImMwX25ld1wiOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYzFuXCI6IHsgeF9uYW1lID0gXCJjMV9uZXdcIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImR6bVwiOiB7IHhfbmFtZSA9IFwiZGF0X3ptZW5hXCI7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJrb21cIjogeyB4X25hbWUgPSBcImtvbW9kaXRhXCI7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJrb3BcIjogeyB4X25hbWUgPSBcImtvbXBcIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInBvcFwiOiB7IHhfbmFtZSA9IFwicG9waXNcIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInhjb1wiOiB7IHhfbmFtZSA9IFwidF9pY29cIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInhlMFwiOiB7IHhfbmFtZSA9IFwidF90ZTBcIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInhlMVwiOiB7IHhfbmFtZSA9IFwidF90ZTFcIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInhrc1wiOiB7IHhfbmFtZSA9IFwidF9ua3NcIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInptcFwiOiB7IHhfbmFtZSA9IFwiem1lbnVfcHJvdl90eHRcIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogeyB4X25hbWUgPSByLmRiX25hemV2ITsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBha3RfZm9ybXVsYV8xID0gXCIoTUlEKEBrbGlrLCBcIiArIHIudXJvdmVuX251bSArIFwiLCAxKT09IFxcXCIxXFxcIilcIlxyXG4gICAgICAgICAgICAgICAgICAgIG91dF9Db25kRm9ybWF0ID0geyBhcHBseVRvOiB4X25hbWUsIGRlc2NyaXB0aW9uOiBcImtsaWsgUE9aIFwiICsgeF9uYW1lLCBmb3JtdWxhOiBha3RfZm9ybXVsYV8xLCBiZzogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0QmcuZGFya2dyZWVuIH07XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0X0NvbmRGb3JtYXR5LnB1c2gob3V0X0NvbmRGb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBha3RfZm9ybXVsYV8yID0gXCIoTUlEKEBrbGlrLCBcIiArIHIudXJvdmVuX251bSArIFwiLCAxKT09IFxcXCIyXFxcIilcIlxyXG4gICAgICAgICAgICAgICAgICAgIG91dF9Db25kRm9ybWF0ID0geyBhcHBseVRvOiB4X25hbWUsIGRlc2NyaXB0aW9uOiBcImtsaWsgTkVHIFwiICsgeF9uYW1lLCBmb3JtdWxhOiBha3RfZm9ybXVsYV8yLCBiZzogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0QmcuZGFya3B1cnBsZSB9O1xyXG4gICAgICAgICAgICAgICAgICAgIG91dF9Db25kRm9ybWF0eS5wdXNoKG91dF9Db25kRm9ybWF0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh4X25hbWUgPT0gXCJjMF9uZXdcIikgfHwgKHhfbmFtZSA9PSBcImMxX25ld1wiKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBha3RfZm9ybXVsYV8zID0gXCIoTUlEKEBrbGlrLCBcIiArIHIudXJvdmVuX251bSArIFwiLCAxKT09IFxcXCIzXFxcIilcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRfQ29uZEZvcm1hdCA9IHsgYXBwbHlUbzogeF9uYW1lLCBkZXNjcmlwdGlvbjogXCJrbGlrIGNhc3RrYSBcIiArIHhfbmFtZSwgZm9ybXVsYTogYWt0X2Zvcm11bGFfMywgYmc6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdEJnLmRhcmtibHVlIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dF9Db25kRm9ybWF0eS5wdXNoKG91dF9Db25kRm9ybWF0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDT05EXCIsIG91dF9Db25kRm9ybWF0eSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gb3V0X0NvbmRGb3JtYXR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFzdGF2X2dyaWRmb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuQmFyLkludGVyZmFjZS5HQmFyZG4wMER0bz57XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG91dF9HcmlkRm9ybWF0OiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5CYXIuSW50ZXJmYWNlLkdCYXJkbjAwRHRvPjtcclxuXHJcbiAgICAgICAgICAgIHZhciBwb2xlOiBHb3JkaWMuQmFyLkludGVyZmFjZS5HU3J2c2NmdUR0b1tdID0gdGhhdC5nbG9iYWxzLktvbmZpZ3VyYWNlX2JhbGFuYyE7XHJcblxyXG4gICAgICAgICAgICBvdXRfR3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5CYXIuSW50ZXJmYWNlLkdCYXJkbjAwRHRvPigpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrbGlrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJrbGlrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG91dF9HcmlkRm9ybWF0XHJcbiAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzb3JfaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogXCJzb3JfaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIiBaIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdFByZXNldDogR29yZGljLkdsb2JhbC5FbnVtcy5HcmlkQ29sdW1uRm9ybWF0SWNvbi5pY29uLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhIS5zb3JfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIHsgaWNvbjogXCJnaS10aWNrXCIsIHRleHQ6IFwiIFogXCIsIGNhcHRpb246IFwiWlwiLCB0b29sdGlwOiBcIlptxJtuxJtub1wiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiB7IGljb246IFwiZmEtZndcIiwgdGV4dDogXCIgXCIsIGNhcHRpb246IFwiIFwiLCB0b29sdGlwOiBcIiBcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZmllbGQ6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiU3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gd2lkdGg6IDI1LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZm9ybWF0UHJlc2V0OiBHb3JkaWMuR2xvYmFsLkVudW1zLkdyaWRDb2x1bW5Gb3JtYXRJY29uLmljb24sXHJcbiAgICAgICAgICAgICAgICAvLyAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgc3dpdGNoIChkYXRhLmFrdGl2aXRhKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNhc2UgMTAwOiByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZS1vIGctc3RhdGUtc3VjY2VzcyBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJBa3Rpdm7DrVwiLCBjYXB0aW9uOiBcIkFrdGl2bsOtXCIsIHRvb2x0aXA6IFwiQWt0aXZuw61cIiB9O1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjYXNlIDMwMDogcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS13YXJuaW5nIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIk7DoXZyaFwiLCBjYXB0aW9uOiBcIk7DoXZyaFwiLCB0b29sdGlwOiBcIk7DoXZyaFwiIH07XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNhc2UgNTAwOiByZXR1cm4geyBpY29uOiBcImZhLXRyYXNoIGctc3RhdGUtZXJyb3IgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiTmVha3Rpdm7DrVwiLCBjYXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgdG9vbHRpcDogXCJOZWFrdGl2bsOtXCIgfTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwb2xlXCIsIHBvbGUpO1xyXG5cclxuICAgICAgICAgICAgcG9sZSEuZm9yRWFjaCgocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHIucG91eml0aSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyLmRiX25hemV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjMG5cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0X0dyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMF9uZXdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiByLm5hemV2X3pvYnIhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBCYXJDb25zdC5zaXJrYUNhc3RreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYzFuXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dF9HcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFfbmV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogci5uYXpldl96b2JyISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogQmFyQ29uc3Quc2lya2FDYXN0a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImMwXCI6IGNhc2UgXCJjMVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRfR3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByLmRiX25hemV2ISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiByLm5hemV2X3pvYnIhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBCYXJDb25zdC5zaXJrYUNhc3RreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInBwXCI6IGNhc2UgXCJwdlwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRfR3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByLmRiX25hemV2ISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiByLm5hemV2X3pvYnIhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJva1wiOiBjYXNlIFwibWVzXCI6IGNhc2UgXCJkZW5cIjogY2FzZSBcImRyZFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRfR3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogci5kYl9uYXpldiEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogci5uYXpldl96b2JyISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogci5kZWxrYSEgKiB0aGF0LnNpcmthX3Nsb3VwY2Vfa29lZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInVlYVwiOiBjYXNlIFwidWViXCI6IGNhc2UgXCJ1ZWNcIjogY2FzZSBcInVlZFwiOiBjYXNlIFwidWVlXCI6IGNhc2UgXCJ1ZWZcIjogY2FzZSBcInVlZ1wiOiBjYXNlIFwidWVoXCI6IGNhc2UgXCJ1ZWlcIjogY2FzZSBcInVlalwiOiBjYXNlIFwidGUwXCI6IGNhc2UgXCJ0ZTFcIjogY2FzZSBcInRlMlwiOiBjYXNlIFwidGUzXCI6IGNhc2UgXCJ0ZTRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0X0dyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogci5kYl9uYXpldiEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogci5uYXpldl96b2JyISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogci5kZWxrYSEgKiB0aGF0LnNpcmthX3Nsb3VwY2Vfa29lZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImR6bVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dF9HcmlkRm9ybWF0LmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogci5uYXpldl96b2JyISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRmc1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dF9HcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByLmRiX25hemV2ISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogci5uYXpldl96b2JyISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHIuZGVsa2EhICogdGhhdC5zaXJrYV9zbG91cGNlX2tvZWZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJrb21cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRfR3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrb21vZGl0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiByLm5hemV2X3pvYnIhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogci5kZWxrYSEgKiB0aGF0LnNpcmthX3Nsb3VwY2Vfa29lZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImtvcFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dF9HcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtvbXBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogci5uYXpldl96b2JyISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHIuZGVsa2EhICogdGhhdC5zaXJrYV9zbG91cGNlX2tvZWZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwb3BcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRfR3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiByLm5hemV2X3pvYnIhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogci5kZWxrYSEgKiB0aGF0LnNpcmthX3Nsb3VwY2Vfa29lZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInQxYVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dF9HcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByLmRiX25hemV2ISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogci5uYXpldl96b2JyISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHIuZGVsa2EhICogdGhhdC5zaXJrYV9zbG91cGNlX2tvZWZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0MWJcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRfR3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogci5kYl9uYXpldiEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHIubmF6ZXZfem9iciEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiByLmRlbGthISAqIHRoYXQuc2lya2Ffc2xvdXBjZV9rb2VmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInhjb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dF9HcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRfaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHIubmF6ZXZfem9iciEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiByLmRlbGthISAqIHRoYXQuc2lya2Ffc2xvdXBjZV9rb2VmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwieGUwXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0X0dyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidF90ZTBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogci5uYXpldl96b2JyISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHIuZGVsa2EhICogdGhhdC5zaXJrYV9zbG91cGNlX2tvZWZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInhlMVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dF9HcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRfdGUxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHIubmF6ZXZfem9iciEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiByLmRlbGthISAqIHRoYXQuc2lya2Ffc2xvdXBjZV9rb2VmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ4a3NcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRfR3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0X25rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiByLm5hemV2X3pvYnIhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogci5kZWxrYSEgKiB0aGF0LnNpcmthX3Nsb3VwY2Vfa29lZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInptcFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dF9HcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInptZW51X3Byb3ZfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHIubmF6ZXZfem9iciEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiByLmRlbGthISAqIHRoYXQuc2lya2Ffc2xvdXBjZV9rb2VmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaWNvXCI6IGNhc2UgXCJ1Y3NcIjogY2FzZSBcInV1c1wiOiBjYXNlIFwibmtzXCI6IGNhc2UgXCJpeHBcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRfR3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogci5kYl9uYXpldiEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHIubmF6ZXZfem9iciEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiByLmRlbGthISAqIHRoYXQuc2lya2Ffc2xvdXBjZV9rb2VmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG91dF9HcmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFjdGlfZGF0YSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJuYWN0aV9kYXRhXCIsIFwiMVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZlem11IHJhZGt5IG5hIGt0ZXJlIGJ5bG8ga2xpa251dG9cclxuICAgICAgICAgICAgdmFyIGRhdGFrbGlrID0gdGhhdC52aWV3X0lTTC5nZXREYXRhUm93cygpLmZpbHRlcigocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHIua2xpayAhPSAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAnO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmFjdGlfZGF0YVwiLCBcIjJcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgcG9kbWlua2FfYWxsOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICBwb2RtaW5rYV9hbGwgPSB0aGlzLmFrdF9wb2RtaW5rYV9hbGw7XHJcblxyXG4gICAgICAgICAgICAvLyB2eWhvZG5vdGltIGZpbHRyIGRsZSBrbGlrbnV0eWNoIHV6IGplbiB6IG9tZXplbnljaCBkYXRcclxuICAgICAgICAgICAgZGF0YWtsaWsuZm9yRWFjaCgocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtsaWtudXRvOiBzdHJpbmcgPSByLmtsaWshO1xyXG4gICAgICAgICAgICAgICAgdmFyIGptZW5vX3Nsb3VwY2UgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICB2YXIgcG9kbWlua2FfMTogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHZhciBwb3oxX29kID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciBwb3oxID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciBwb3oyX29kID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciBwb3oyID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciBwb2xlOiBHb3JkaWMuQmFyLkludGVyZmFjZS5HU3J2c2NmdUR0b1tdID0gdGhhdC5nbG9iYWxzLktvbmZpZ3VyYWNlX2JhbGFuYyE7XHJcbiAgICAgICAgICAgICAgICB2YXIgemF6bmFtOiBHb3JkaWMuQmFyLkludGVyZmFjZS5HU3J2c2NmdUR0bztcclxuXHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG96MSA9IGtsaWtudXRvLmluZGV4T2YoXCIxXCIsIHBvejFfb2QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3oxID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2xlIS5mb3JFYWNoKChyMSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgemF6bmFtID0gcjE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoemF6bmFtLnVyb3Zlbl9udW0gPT0gcG96MSArIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqbWVub19zbG91cGNlID0gemF6bmFtLmRiX25hemV2ITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcG96MV9vZCA9IHBvejEgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2RtaW5rYV8xID0gdGhpcy5kZWpfaG9kbm90dV9zbG91cGNlX3BvZG1pbmthKGptZW5vX3Nsb3VwY2UsIHIsIFwiPT1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9kbWlua2FfYWxsID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvZG1pbmthX2FsbCA9IHBvZG1pbmthXzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2RtaW5rYV9hbGwgPSBwb2RtaW5rYV9hbGwgKyBcIiAmJiBcIiArIHBvZG1pbmthXzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChwb3oxID49IDApO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3oyID0ga2xpa251dG8uaW5kZXhPZihcIjJcIiwgcG96Ml9vZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvejIgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvbGUhLmZvckVhY2goKHIxKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6YXpuYW0gPSByMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh6YXpuYW0udXJvdmVuX251bSA9PSBwb3oyICsgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGptZW5vX3Nsb3VwY2UgPSB6YXpuYW0uZGJfbmF6ZXYhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3oyX29kID0gcG96MiArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvZG1pbmthXzEgPSB0aGlzLmRlal9ob2Rub3R1X3Nsb3VwY2VfcG9kbWlua2Eoam1lbm9fc2xvdXBjZSwgciwgXCIhPVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb2RtaW5rYV9hbGwgPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9kbWlua2FfYWxsID0gcG9kbWlua2FfMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvZG1pbmthX2FsbCA9IHBvZG1pbmthX2FsbCArIFwiICYmIFwiICsgcG9kbWlua2FfMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKHBvejIgPj0gMCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicG9kbWlua2FcIiwgcG9kbWlua2FfYWxsKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wucHJvY2Vzcyh7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJFeHByZXNzaW9uOiBuZXcgR29yZGljLkRhdGEuRmlsdGVyUHJvY2Vzc29yKHBvZG1pbmthX2FsbClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWt0X3BvZG1pbmthX2FsbCA9IHBvZG1pbmthX2FsbDtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YVZpZXdcIiwgdGhhdC52aWV3X0lTTC5nZXREYXRhUm93cygpKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0LnZpZXdfSVNMLmdldERhdGFSb3dzKCkuZm9yRWFjaCgocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHIua2xpayAhPSAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgci5rbGlrID0gJzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJztcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEociwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJuYWN0aV9kYXRhXCIsIFwia29uZWNcIik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgenJ1c2l0X2ZpbHRyKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFrdF9wb2RtaW5rYV9hbGwgPSBcIiAxPT0xIFwiO1xyXG4gICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnByb2Nlc3Moe1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyRXhwcmVzc2lvbjogbmV3IEdvcmRpYy5EYXRhLkZpbHRlclByb2Nlc3NvcihcIiAxPT0xXCIpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTC5nZXREYXRhUm93cygpLmZvckVhY2goKHIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyLmtsaWsgIT0gJzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHIua2xpayA9ICcwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHIsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1bG96aXRfdmVyemkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRhdGFfdmVyemU6IEdvcmRpYy5CYXIuSW50ZXJmYWNlLkdCYXJWZXJ6ZUR0byA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZGF0YV92ZXJ6ZS5kYXRhX2JhciA9IHRoYXQudmlld19JU0wuZ2V0RGF0YVJvd3MoKTtcclxuICAgICAgICAgICAgZGF0YV92ZXJ6ZS5pY28gPSB0aGlzLmdwYy5pY287XHJcbiAgICAgICAgICAgIGRhdGFfdmVyemUucm9rID0gdGhpcy5nbG9iYWxzLlJva1NiZXJ1O1xyXG4gICAgICAgICAgICBkYXRhX3ZlcnplLnZlcnplX2MgPSBcIlwiO1xyXG4gICAgICAgICAgICBkYXRhX3ZlcnplLnZlcnplX2sgPSAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxfb0Zvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ3aXpQYXJhbXNWZXJ6ZVwiLFxyXG4gICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMi04LTIsIE0tMi04LTIsIFMtMTItMTItMFwiLFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIChhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlZlcnplXCIgfSlcclxuICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm5ld192ZXJ6ZV9jXCIsXHJcbiAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlZ0V4cCh7IHBhdHRlcm46IFwiXlswLTldKiRcIiwgZXJyb3JUeXBlOiBcImVycm9yXCIsIHN0b3BwaW5nOiB0cnVlLCBtZXNzYWdlOiBcIk5lcG92b2xlbsOpIHpuYWt5XCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKClcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmV3X3ZlcnplX2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgIC8vZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZWdFeHAoeyBwYXR0ZXJuOiBcIl5bMC05XSokXCIsIGVycm9yVHlwZTogXCJlcnJvclwiLCBzdG9wcGluZzogdHJ1ZSwgbWVzc2FnZTogXCJOZXBvdm9sZW7DqSB6bmFreVwiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKClcclxuICAgICAgICAgICAgICAgICAgICAgIC8vXSxcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGFrdF92ZXJ6ZV9jID0gdGhpcy5nbG9iYWxzLmdfdmVyemVfYztcclxuICAgICAgICAgICAgdmFyIGFrdF92ZXJ6ZV9jX2Npc2xvID0gcGFyc2VJbnQoIHRoaXMuZ2xvYmFscy5nX3ZlcnplX2MhICk7XHJcbiAgICAgICAgICAgIHZhciBuZXdfdmVyemVfY19jaXNsbyA9IGFrdF92ZXJ6ZV9jX2Npc2xvICsgMTtcclxuICAgICAgICAgICAgdmFyIG5ld192ZXJ6ZV9jID0gbmV3X3ZlcnplX2NfY2lzbG8udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdmFyIG5ld192ZXJ6ZV9rID0gMDtcclxuXHJcbiAgICAgICAgICAgIGxldCBwcm9tX3Z5c2xlZGVrID0gdGhhdC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJVbG/Fvml0IGpha28gdmVyemlcIiwgbF9vRm9ybSwgeyBuZXdfdmVyemVfYzogbmV3X3ZlcnplX2MsIG5ld192ZXJ6ZV9rOiBuZXdfdmVyemVfayB9LCB7IHdpZHRoOiA0MDAsIGhlaWdodDogNDAwIH0pO1xyXG4vLyAgICAgICAgICAgICBwcm9tX3Z5c2xlZGVrLmZpbmRGaWVsZHMoXCJjaXNsb19uZXdcIikuZ2ZpZWxkKFwiZm9jdXNcIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJvbV92eXNsZWRlay5jcmVhdGVEaWFsb2dQcm9taXNlKC8qXCJjbG9zZVwiKi8vKlwieWVzXCIqLy8qXCJva1wiKi8vKiwgeyBkdXZvZDogc3RyaW5nIH0qLylcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YV92ZXJ6ZS52ZXJ6ZV9jID0gZGF0YS5uZXdfdmVyemVfYztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC56cnVzaXRfZmlsdHIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuQmFsYW5jbmlWZXJ6ZURhdGEuY3JlYXRlX0xpc3QoeyBkYXRhOiBkYXRhX3ZlcnplIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ2xvYmFscy5nX3ZlcnplX2MgPSBkYXRhLnZlcnplX2M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lmdsb2JhbHMuZ192ZXJ6ZV9rID0gZGF0YS52ZXJ6ZV9rO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFfdmVyemUgPSBcIkJhbGFuxI1uw60gdmVyemU6IFwiICsgdGhhdC5nbG9iYWxzLmdfdmVyemVfYyArIFwiLlwiICsgdGhhdC5nbG9iYWxzLmdfdmVyemVfaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RhdHVzQmFyVmVyemUudXBkYXRlKHsgY2FwdGlvbjogYV92ZXJ6ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wucmVxdWVzdERhdGEoe30pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goXCJCYWxhbsSNbsOtIHZlcnplOiBcIiArIHRoYXQuZ2xvYmFscy5nX3ZlcnplX2MgKyBcIi5cIiArIHRoYXQuZ2xvYmFscy5nX3ZlcnplX2s/LnRvU3RyaW5nKCkgKyBcIiBieWxhIHVsb8W+ZW5hLlwiLCBcImctc3RhdGUtaW5mb1wiLCA1MDAwLCBcImlkLWZsYXNoLXVsb3plbmlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcIkluZm9ybWFjZVwiLCBcIkJhbGFuxI1uw60gdmVyemU6IFwiICsgdGhhdC5nbG9iYWxzLmdfdmVyemVfYyArIFwiLlwiICsgdGhhdC5nbG9iYWxzLmdfdmVyemVfaz8udG9TdHJpbmcoKSArIFwiIGJ5bGEgdWxvxb5lbmEuXCIsIFsgR0RsZy5tYmJPayBdLCBHRGxnLm1iaVN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4gdGhhdC5lbmRPcGVyYXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmVyemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbmV3dmVyemUgPSBuZXcgR29yZGljLkRhdGEuU2VsZWN0b3JzLkRlZmF1bHRTZWxlY3RvcjxHb3JkaWMuRGF0YS5SZWFkZXJzLkJhcnN2ZXJEdG8+KCQuZXh0ZW5kKHRydWUsIEdvcmRpYy5EYXRhLlNlbGVjdG9ycy5iYXJzdmVyQmFyKCksIHsgc2VydmVyRmlsdGVyczogeyBrb21wX2RlYzogXCIwMFwiIH0sIHJlbGF0ZWQ6IHRoYXQuZWxlbWVudCB9KSkuc2hvdygpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vIGtvbnRyb2xhLCDFvmUgdG8gbmVuw60gcG9sZSAgICBcclxuICAgICAgICAgICAgICAgIGlmICghKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lmdsb2JhbHMuZ192ZXJ6ZV9jID0gZGF0YS52ZXJ6ZV9jO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ2xvYmFscy5nX3ZlcnplX2sgPSBkYXRhLnZlcnplX2s7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhXCIsIGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YV92ZXJ6ZTogR29yZGljLkJhci5JbnRlcmZhY2UuR0JhclZlcnplRHRvID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFfdmVyemUuZGF0YV9iYXIgPSB0aGF0LnZpZXdfSVNMLmdldERhdGFSb3dzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YV92ZXJ6ZS5pY28gPSB0aGF0LmdwYy5pY287XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YV92ZXJ6ZS5yb2sgPSB0aGF0Lmdsb2JhbHMuUm9rU2JlcnU7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YV92ZXJ6ZS52ZXJ6ZV9jID0gdGhhdC5nbG9iYWxzLmdfdmVyemVfYztcclxuICAgICAgICAgICAgICAgICAgICBkYXRhX3ZlcnplLnZlcnplX2sgPSB0aGF0Lmdsb2JhbHMuZ192ZXJ6ZV9rO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5CYWxhbmNuaVZlcnplRGF0YS5zZXRfVmVyemUoeyBkYXRhOiBkYXRhX3ZlcnplIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhX3ZlcnplID0gXCJCYWxhbsSNbsOtIHZlcnplOiBcIiArIHRoYXQuZ2xvYmFscy5nX3ZlcnplX2MgKyBcIi5cIiArIHRoYXQuZ2xvYmFscy5nX3ZlcnplX2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YXR1c0JhclZlcnplLnVwZGF0ZSh7IGNhcHRpb246IGFfdmVyemUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy90aGF0LnZpZXdfSVNMID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGlzLmlzbC5CYWxhbmNuaVZlcnplLmxpc3QoeyBmaWx0ZXJzOiB7fSB9KSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBsX29Gb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJ3aXpQYXJhbXNWZXJ6ZVZ5YmVyXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTItOC0yLCBNLTItOC0yLCBTLTEyLTEyLTBcIixcclxuICAgICAgICAgICAgLy8gICAgY29tcGxldGU6IGZ1bmN0aW9uIChhKSB7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLmNsb3Nlc3QoXCIuZ2Zvcm1cIik7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgdmFyICRtYWluVGFibGUgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLmFwcGVuZFRvKGZvcm0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUm93U2VsZWN0ZWRBY3RcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHJ1bihldiwgY3R4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZShldiwgY3R4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aGF0LnJvdyA9ICRtYWluVGFibGUuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5yb3cgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcIip2ZXJ6ZV9jXCIsIFwiKnZlcnplX2tcIl0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGNvbHVtbnM6IGdmVnliZXJWZXJ6ZSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgZGF0YTogdGhhdC52aWV3X0lTTFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgfVxyXG5cclxuICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAvLy5hZGRGaWVsZChcImdkdW1teWZpZWxkXCIsIFwidy1oXCIsIHtcclxuICAgICAgICAgICAgLy8gICAgbW9kZWw6IFwidmVyemVfY1wiLFxyXG4gICAgICAgICAgICAvLyAgICBuYW1lOiBcInZlcnplX2NcIlxyXG4gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ2R1bW15ZmllbGRcIiwgXCJ3LWhcIiwge1xyXG4gICAgICAgICAgICAvLyAgICBtb2RlbDogXCJ2ZXJ6ZV9jXCIsXHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwidmVyemVfY1wiXHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBnZlZ5YmVyVmVyemUgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwidmVyemVfY1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2FwdGlvbjogXCJDZW50csOhbG7DrVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwidmVyemVfa1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2FwdGlvbjogXCJLb21wZXRlbnRza8OhXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgIC8vICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgLy9sZXQgcHJvbV92eXNsZWRlayA9IHRoYXQuZGlhbG9ncy5zaW1wbGVGb3JtKFwiVnlicmF0IHZlcnppXCIsIGxfb0Zvcm0sIHt9LCB7IHdpZHRoOiA0MDAsIGhlaWdodDogNDAwIH0pO1xyXG4gICAgICAgICAgICAvLy8vICAgICAgICAgICAgIHByb21fdnlzbGVkZWsuZmluZEZpZWxkcyhcImNpc2xvX25ld1wiKS5nZmllbGQoXCJmb2N1c1wiKTtcclxuXHJcbiAgICAgICAgICAgIC8vbGV0IHByb21fdnlzbGVkZWtfcHJvID0gcHJvbV92eXNsZWRlay5jcmVhdGVEaWFsb2dQcm9taXNlKC8qXCJjbG9zZVwiKi8vKlwieWVzXCIqLy8qXCJva1wiKi8vKiwgeyBkdXZvZDogc3RyaW5nIH0qLylcclxuICAgICAgICAgICAgLy8gICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuZ2xvYmFscy5nX3ZlcnplX2MgPSBkYXRhLnZlcnplX2M7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGF0Lmdsb2JhbHMuZ192ZXJ6ZV9rID0gZGF0YS52ZXJ6ZV9rO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coXCJkYXRhXCIsIGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiTm92w6EgYmFsYW7EjW7DrSB2ZXJ6ZTogXCIgKyB0aGF0Lmdsb2JhbHMuZ192ZXJ6ZV9jICsgXCIuXCIgKyB0aGF0Lmdsb2JhbHMuZ192ZXJ6ZV9rPy50b1N0cmluZygpLCBcImctc3RhdGUtaW5mb1wiLCA1MDAwLCBcImlkLWZsYXNoLXVsb3plbmlcIik7XHJcblxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbmFzdGF2X2ZpbHRyKCBpbl9maWx0cikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnByb2Nlc3Moe1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyRXhwcmVzc2lvbjogbmV3IEdvcmRpYy5EYXRhLkZpbHRlclByb2Nlc3Nvcihpbl9maWx0cilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iXX0=
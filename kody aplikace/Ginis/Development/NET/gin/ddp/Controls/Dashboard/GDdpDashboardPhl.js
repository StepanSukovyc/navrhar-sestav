"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GDdpDashboardPhl.ts                    </Name>
//    <Description> Úvodní informační dashboard DDPek                           </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-14                                                  </Created>
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
            //const { gcontent } = Decorators;
            let GDdpDashboardPhl = class GDdpDashboardPhl extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /** Sdílené DDP methody a funkce */
                    this.ddpMethod = Ddp.WebClient.Common.Base;
                    ///** Vytvoří FORMulář podle záložky Pohledávky, NKS v TK */
                    //private createFilterPohledavkyNks() {
                    //    debugger;
                    //    const that = this;
                    //    //return new Gordic.Forms.Form({ tabLabel: "Pohledávky, NKS", layoutDescriptor: "L3M3S2, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" })
                    //    var test = new Gordic.Forms.Form({ name: "testForm", tabLabel: "Pohledávky, NKS" })
                    //        //.addSection("Pohledávky")
                    //        .addRow("Pohledávky")
                    //        .addField("gselectbox", "w-12", Prefabs.Select.ddpstpp(), {
                    //            name: "typ_phl_sez",
                    //            model: "model.typ_phl=value.typ_phl_sez",
                    //            dropdown: false,
                    //            multi: true,
                    //            list: false,
                    //            serverFilters: {
                    //                aktivita: new Gordic.Forms.Dependency("aktivní_sez_typ_phl", "aktivita", false, false, that.element) //?? that.typ_phl
                    //            },
                    //            //initialValue: { typ_phl: that.typ_phl },
                    //            //defaultValue: { typ_phl: that.typ_phl },
                    //        })
                    //        .addRow()
                    //        .addField("gcheck", "w-12", { name: "aktivní_sez_typ_phl", label: "Pouze aktivní" })
                    //        //.addSection("Řádky")
                    //        .addRow("Řádky")
                    //        .addField("gselectbox", "w-12", Prefabs.Select.ciselnikRadku(), {
                    //            name: "ddp_radek",
                    //            model: "model.ixp_den=value.IxpDen;model.typ_phl=value.typ_phl_sez;model.ddp_radek=value.ddp_radek",
                    //            dropdown: false,
                    //            multi: true,
                    //            list: false,
                    //            serverFilters: {
                    //                ixp_den: that.IxpDen,
                    //                typ_phl: new Gordic.Forms.Dependency("typ_phl_sez", "typ_phl", true, false, that.element) //?? that.typ_phl
                    //            },
                    //        })
                    //        //.addSection("Čtvrti")
                    //        .addRow("Čtvrti")
                    //        .addField("gselectbox", "w-12", Prefabs.Select.ciselnikCtvrti(), {
                    //            name: "ddp_ctvrt",
                    //            model: "model.ixp_den=value.IxpDen;model.typ_phl=value.typ_phl_sez;model.ddp_ctvrt=value.ddp_ctvrt",
                    //            dropdown: false,
                    //            multi: true,
                    //            list: false,
                    //            serverFilters: {
                    //                ixp_den: that.IxpDen,
                    //                typ_phl: new Gordic.Forms.Dependency("typ_phl_sez", "typ_phl", true, false, that.element) //?? that.typ_phl
                    //            },
                    //        })
                    //        //.addSection("Střediska")
                    //        .addRow("Střediska")
                    //        .addField("gselectbox", "w-12", Prefabs.Select.ekosnks(), {
                    //            name: "nks_sez",
                    //            model: "model.nks=value.nks_sez;model.ico=value.Ico",
                    //            dropdown: false,
                    //            multi: true,
                    //            list: false,
                    //            serverFilters: {
                    //                ico: that.Ico,
                    //                akt_prohl: 100,
                    //                aktivita: 100,
                    //                rok_od: {
                    //                    o: "<=",
                    //                    v: that.Rok
                    //                },
                    //                rok_do: {
                    //                    o: ">=",
                    //                    v: that.Rok
                    //                }
                    //            }
                    //        })
                    //        //.addSection("Sazby")
                    //        .addRow("Sazby") //cis_sazby_sez
                    //        .addField("gselectbox", Prefabs.Select.ddpdsaz(), { //Prefabs.Select.gNReaderDdpdsaz()
                    //            name: "cis_sazby_sez",
                    //            model: "model.cis_sazby=value.cis_sazby_sez;model.typ_phl=value.typ_phl_sez",
                    //            dropdown: false,
                    //            multi: true,
                    //            list: false,
                    //            serverFilters: {
                    //                typ_phl: new Gordic.Forms.Dependency("typ_phl_sez", "typ_phl", true, false, that.element) //?? that.typ_phl
                    //            },
                    //        })
                    //        ;
                    //    var defaultForm = $("<div>").appendTo(that.element).gform("createFrom", test);
                    //    //let formStatistikaPhl = new Gordic.Forms.Form({ name: "formStatistikaPhl", layoutDescriptor: "L2M2S2" })
                    //    //.addSection()
                    //    //.addRow({ label: "Typ pohledávky" })
                    //    //.addField("gselectbox", Prefabs.Select.ddpstpp(), {
                    //    //    name: "typ_phl",
                    //    //    model: "model.typ_phl=value.typ_phl",
                    //    //})
                    //    //.addRow({ label: "Datum uzávěrky" })
                    //    //.addField("gdatebox", { name: "Nastaveni.dat_uzav", disabled: true })
                    //    //.addRow({ label: "Rok" })
                    //    //.addField("gselectbox", Prefabs.Select.rok(), { name: "Nastaveni.rok", model: "model.Nastaveni.rok=value.rok", disabled: true })
                    //    //.addRow({ label: "IČO" })
                    //    //.addField("gnumberbox", { name: "Nastaveni.ico", disabled: true })
                    //    //.addRow({ label: "Učetní středisko" })
                    //    //.addField("gselectbox", Prefabs.Select.ekosucs(), { name: "Nastaveni.ucs", model: "model.Nastaveni.ucs=value.ucs;model.Nastaveni.ico=value.ico", disabled: true })
                    //    //.addRow({ label: "Poznámka" })
                    //    //.addField("gstringbox", { name: "poznamka", disabled: true })
                    //    //.addRow({ label: "Stav pohledávky" })
                    //    //.addField("gselectbox", Prefabs.Select.ddpcstp(), { name: "Nastaveni.stav_phl", model: "model.Nastaveni.stav_phl=value.stav_phl", disabled: true })
                    //    //?-------------------------------------------------------
                    //    //.addSection()
                    //    //.addRow("Počet aktivních případů")
                    //    //.addField("gnumberbox", { name: "aktivni_pripady", disabled: true })
                    //    //.addRow("Počet zrušených případů")
                    //    //.addField("gnumberbox", { name: "zrusene_pripady", disabled: true })
                    //    //.addRow("Počet ukončených případů")
                    //    //.addField("gnumberbox", { name: "ukoncene_pripady", disabled: true })
                    //    //.addSection()
                    //    //.addRow("Počet případů celkem")
                    //    //.addField("gnumberbox", { name: "celkem_pripadu", disabled: true })
                    //    //.addRow("z toho aktivních plátců samost")
                    //    //.addField("gnumberbox", { name: "aktivnich_platcu_samost", disabled: true })
                    //    //.addRow("aktivních plátců za popl")
                    //    //.addField("gnumberbox", { name: "aktivnich_platcu_popl", disabled: true })
                    //    //.addRow("a napojených poplatníků")
                    //    //.addField("gnumberbox", { name: "napojenych_poplatniku", disabled: true })
                    //    //.addSection()
                    //    //.addRow("Předpisů celkem")
                    //    //.addField("gnumberbox", Prefabs.Number.currency(), { name: "celkem_predpisu", disabled: true })
                    //    //.addRow("Plateb celkem")
                    //    //.addField("gnumberbox", Prefabs.Number.currency(), { name: "celkem_plateb", disabled: true })
                    //    //.addRow("Počet předpisů")
                    //    //.addField("gnumberbox", { name: "pocet_predpisu", disabled: true })
                    //    //.addRow("Počet plateb")
                    //    //.addField("gnumberbox", { name: "pocet_plateb", disabled: true });
                    //    //var statistika = $("<div>").appendTo(that.element).gform("createFrom", formStatistikaPhl)
                    //}
                }
                //private tabManager: JQuery<HTMLElement>;
                onContentReady() {
                    const that = this;
                    that.taskId = "actGDashboardDdp";
                    that.id = "DDPGDashboardDdp#";
                    that.title = "Úvodní stránka";
                    //that.setBreadcrumbs([{
                    //    caption: that.title,
                    //    defaultAction: true
                    //}]);
                    var promise = that.isl.TypPohledavky.read(rq => {
                        return {
                            data: {
                                typ_phl: that.typ_phl,
                            },
                            fragments: ["*", "Nastaveni.*"]
                        };
                    }).get();
                    //that.createActions();
                    if (that.x_Debug) {
                        that.createMenu(); //Menu nad filtrem (s akcí pro test okna opravy)
                    }
                    //that.createFilterPohledavkyNks();
                    that.createContet();
                    promise.done((data) => {
                        that.dto = data.data;
                        that.findFields().gfield("model", "apply", that.dto);
                        //that.gridDoplnkoveUdaje.ggrid("setData", Common.TypPohledavky.getTexts(that.dto));
                        //that.dirty = false;
                        that.ddpMethod.DdpEkoInit(that, that.InitErrorText);
                    });
                }
                ;
                createMenu() {
                    const that = this;
                    that.actions.addRange([
                        {
                            name: "actGOtevritPripad",
                            caption: "Otevřít detail",
                            icon: "gi-detail",
                            run: (ev, ctx) => {
                                that.dialogs.prompt("Zadej PID", "IXP", "").on("close", (ev, retVal) => {
                                    if (!retVal)
                                        return;
                                    if (retVal.text.length != 12)
                                        return that.dialogs.error("Chyba", "Nebyl zadán validní případ");
                                    // else
                                    WebClient.Common.Pripady.openPripadDetail(this, retVal.text);
                                });
                            }
                        },
                        {
                            name: "actGOtevritPripadTest",
                            caption: "Detail",
                            icon: "gi-detail g-state-text g-state-info",
                            run: (ev, ctx) => {
                                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GDdpPid", { ID: "DDPGDdpPid#" })
                                    .on("close", (ev, retVal) => {
                                    //if (retVal) that.dialogs.warning("Test", retVal.toString());
                                });
                            }
                        },
                    ]);
                    let menu = [
                        {
                            action: that.actions["actGOtevritPripad"],
                            favorite: true,
                        },
                        {
                            action: that.actions["actGOtevritPripadTest"],
                            favorite: true,
                        },
                    ];
                    that.menuBar(menu);
                }
                createActions() {
                    const that = this;
                    that.actions.addRange([
                    //{
                    //    name: "actGTestOknaOpravy",
                    //    caption: "Test",
                    //    description: "Nezapomenout smazat!",
                    //    run: (ev, ctx) => {
                    //        that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GOpravaPredpisu", { Ixp: 'UP76X001P93H', Radek_uhr: 52, Typ_phl: '0931', Dat_od: new Date("2011-06-28"), ID: "DDPGOpravaPredpisu#" }, `Oprava předpisu - případ UP76X001P93H`, 700, 700)
                    //            .on("close", () => {
                    //            });
                    //    }
                    //}                
                    ]);
                }
                createContet() {
                    const that = this;
                    const subDataViews = {
                        platcy: new Gordic.Data.View(),
                        statusy: new Gordic.Data.View(),
                        predpisy: new Gordic.Data.View(),
                        platby: new Gordic.Data.View(),
                        kontroly: new Gordic.Data.View()
                    };
                    const dataView = new Gordic.Data.View([
                        {
                            title: "Statusy Plátců",
                            mode: "vertical", //horizontal
                            zone: 0,
                            defaultSelected: false,
                            data: subDataViews.platcy
                        },
                        {
                            title: "Statusy Případů",
                            mode: "vertical", //horizontal
                            zone: 0,
                            defaultSelected: false,
                            data: subDataViews.statusy
                        },
                        {
                            title: "Statusy Předpisů",
                            mode: "vertical", //horizontal
                            zone: 1,
                            defaultSelected: false,
                            data: subDataViews.predpisy
                        },
                        {
                            title: "Statusy Plateb",
                            mode: "vertical", //horizontal
                            zone: 1,
                            defaultSelected: false,
                            data: subDataViews.platby
                        },
                        {
                            title: "Kontroly",
                            mode: "vertical", //vertical
                            zone: 2,
                            defaultSelected: false,
                            data: subDataViews.kontroly
                        },
                    ]);
                    $("<div>").appendTo(that.element).gdashboardpanel({
                        data: dataView,
                        layout: "horizontal", //vertical
                        title: "Dashboard",
                        zones: 3,
                        sortable: true,
                    });
                    let def = $.Deferred();
                    let fields = that.findForms("formStatistikaPhl").findFields("aktivni_pripady", "zrusene_pripady", "ukoncene_pripady", "celkem_pripadu", "aktivnich_platcu_samost", "aktivnich_platcu_popl", "napojenych_poplatniku");
                    fields.gfield("option", "waitingForValue", def.promise());
                    fields.gprogressoverlay({}).gprogressoverlay("setPending", true);
                    let def2 = $.Deferred();
                    let fields2 = that.findForms("formStatistikaPhl").findFields("celkem_predpisu", "pocet_predpisu");
                    fields2.gfield("option", "waitingForValue", def2.promise());
                    fields2.gprogressoverlay({}).gprogressoverlay("setPending", true);
                    let def3 = $.Deferred();
                    let fields3 = that.findForms("formStatistikaPhl").findFields("celkem_plateb", "pocet_plateb");
                    fields3.gfield("option", "waitingForValue", def3.promise());
                    fields3.gprogressoverlay({}).gprogressoverlay("setPending", true);
                    let r = { typ_phl: that.typ_phl };
                    if (that.InitErrorText == null || that.InitErrorText.length == 0) {
                        that.InitErrorContent = "Všechny kontroly proběhly v pořádku";
                        that.InitErrorTitle = "Nastavení v pořádku";
                        that.InitErrorIcon = "fa-check-circle g-state-text g-state-success";
                    }
                    else {
                        that.InitErrorContent = that.InitErrorText;
                        that.InitErrorTitle = "Chyba nastavení";
                        that.InitErrorIcon = "fa-exclamation-triangle g-state-text g-state-error";
                    }
                    subDataViews.kontroly.updateData([{
                            icon: that.InitErrorIcon,
                            title: that.InitErrorTitle,
                            id: "InitKontroly",
                            value: that.InitErrorContent
                        }]);
                    that.isl.TypPohledavky.statistikaPripady(r)
                        .get()
                        .done((data) => {
                        subDataViews.statusy.updateData([
                            {
                                title: "Počet aktivních případů",
                                id: "aktivni_pripady",
                                value: Number(data.aktivni_pripady).toLocaleString()
                            },
                            {
                                title: "Počet zrušených případů",
                                id: "zrusene_pripady",
                                value: Number(data.zrusene_pripady).toLocaleString()
                            },
                            {
                                title: "Počet ukončených případů",
                                id: "ukoncene_pripady",
                                value: Number(data.ukoncene_pripady).toLocaleString()
                            }
                        ]);
                        subDataViews.platcy.updateData([
                            {
                                title: "Počet případů celkem",
                                id: "celkem_pripadu",
                                value: Number(data.celkem_pripadu).toLocaleString()
                            },
                            {
                                title: "Aktivních plátců samost.",
                                id: "aktivnich_platcu_samost",
                                value: Number(data.aktivnich_platcu_samost).toLocaleString()
                            },
                            {
                                title: "Aktivních plátců za popl.",
                                id: "aktivnich_platcu_popl",
                                value: Number(data.aktivnich_platcu_popl).toLocaleString()
                            },
                            {
                                title: "Napojených poplatníků",
                                id: "napojenych_poplatniku",
                                value: Number(data.napojenych_poplatniku).toLocaleString()
                            },
                        ]);
                        fields.gfield("model", "apply", data);
                        def.resolve();
                    })
                        .fail(() => {
                        def.reject();
                    })
                        .always(() => {
                        fields.gprogressoverlay("setPending", false);
                    });
                    that.isl.TypPohledavky.statistikaPredpisy(r)
                        .get()
                        .done((data) => {
                        subDataViews.predpisy.updateData([
                            {
                                title: "Počet předpisů",
                                id: "celkem_predpisu",
                                value: Number(data.celkem_predpisu).toLocaleString()
                            },
                            {
                                title: "Počet predpisů",
                                id: "pocet_predpisu",
                                value: Number(data.pocet_predpisu).toLocaleString()
                            },
                        ]);
                        fields2.gfield("model", "apply", data);
                        def2.resolve();
                    })
                        .fail(() => {
                        def2.reject();
                    })
                        .always(() => {
                        fields2.gprogressoverlay("setPending", false);
                    });
                    that.isl.TypPohledavky.statistikaPlatby(r)
                        .get()
                        .done((data) => {
                        subDataViews.platby.updateData([
                            {
                                title: "Plateb celkem",
                                id: "celkem_plateb",
                                value: Number(data.celkem_plateb).toLocaleString()
                            },
                            {
                                title: "Počet plateb",
                                id: "pocet_plateb",
                                value: Number(data.pocet_plateb).toLocaleString()
                            },
                        ]);
                        fields3.gfield("model", "apply", data);
                        def3.resolve();
                    })
                        .fail(() => {
                        def3.reject();
                    })
                        .always(() => {
                        fields3.gprogressoverlay("setPending", false);
                    });
                }
            };
            GDdpDashboardPhl = __decorate([
                Decorators.gcontent
            ], GDdpDashboardPhl);
            WebClient.GDdpDashboardPhl = GDdpDashboardPhl;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//{
//    action: that.actions["actGException"],
//},
//{
//    action: that.actions["actGArgumentException"],    
//},
//{
//    action: that.actions["actGArgumentNullException"],            
//},
//{
//    action: that.actions["actGDdpServerException"],     
//},
//{
//    action: that.actions["actGNotImplementedException"],            
//},
//{
//    action: that.actions["actGDataInvalidException"],          
//},
//{
//    action: that.actions["actGNonFatalException"],     
//},
//{
//    action: that.actions["actGNonFatalSplException"],          
//}
//{
//    name: "actGException",
//        caption: "GException",
//            run: () => {
//                that.isl.PripadSpisy.actGException(input).get()
//                    .done((ret) => { return that.ddpMethod.setNotificationAfterOperation(that, "actGException", ret.result.errors[0].message!); })
//                    .fail(function (jqXHR, typ, obj) { return that.ddpMethod.getFailFromIsl(that, jqXHR, typ, obj); });
//            }
//}, {
//    name: "actGArgumentException",
//        caption: "GArgumentException",
//            run: () => {
//                that.isl.PripadSpisy.actGArgumentException(input).get()
//                    .done((ret) => { return that.ddpMethod.setNotificationAfterOperation(that, "actGArgumentException", ret.result.errors[0].message!); })
//                    .fail(function (jqXHR, typ, obj) { return that.ddpMethod.getFailFromIsl(that, jqXHR, typ, obj); });
//            }
//}, {
//    name: "actGArgumentNullException",
//        caption: "GArgumentNullException",
//            run: () => {
//                that.isl.PripadSpisy.actGArgumentNullException(input).get()
//                    .done((ret) => { return that.ddpMethod.setNotificationAfterOperation(that, "actGArgumentNullException", ret.result.errors[0].message!); })
//                    .fail(function (jqXHR, typ, obj) { return that.ddpMethod.getFailFromIsl(that, jqXHR, typ, obj); });
//            }
//}, {
//    name: "actGDdpServerException",
//        caption: "GDdpServerException",
//            run: () => {
//                that.isl.PripadSpisy.actGDdpServerException(input).get()
//                    .done((ret) => { return that.ddpMethod.setNotificationAfterOperation(that, "actGDdpServerException", ret.result.errors[0].message!); })
//                    .fail(function (jqXHR, typ, obj) { return that.ddpMethod.getFailFromIsl(that, jqXHR, typ, obj); });
//            }
//}, {
//    name: "actGNotImplementedException",
//        caption: "GNotImplementedException",
//            run: () => {
//                that.isl.PripadSpisy.actGNotImplementedException(input).get()
//                    .done((ret) => { return that.ddpMethod.setNotificationAfterOperation(that, "actGNotImplementedException", ret.result.errors[0].message!); })
//                    .fail(function (jqXHR, typ, obj) { return that.ddpMethod.getFailFromIsl(that, jqXHR, typ, obj); });
//            }
//}, {
//    name: "actGDataInvalidException",
//        caption: "GDataInvalidException",
//            run: () => {
//                that.isl.PripadSpisy.actGDataInvalidException(input).get()
//                    .done((ret) => { return that.ddpMethod.setNotificationAfterOperation(that, "actGDataInvalidException", ret.result.errors[0].message!); })
//                    .fail(function (jqXHR, typ, obj) { return that.ddpMethod.getFailFromIsl(that, jqXHR, typ, obj); });
//            }
//}, {
//    name: "actGNonFatalException",
//        caption: "GNonFatalException",
//            run: () => {
//                that.isl.PripadSpisy.actGNonFatalException(input).get()
//                    .done((ret) => { return that.ddpMethod.setNotificationAfterOperation(that, "actGNonFatalException", ret.result.errors[0].message!); })
//                    .fail(function (jqXHR, typ, obj) { return that.ddpMethod.getFailFromIsl(that, jqXHR, typ, obj); });
//            }
//}, {
//    name: "actGNonFatalSplException",
//        caption: "GNonFatalSplException",
//            run: () => {
//                that.isl.PripadSpisy.actGNonFatalSplException(input).get()
//                    .done((ret) => { return that.ddpMethod.setNotificationAfterOperation(that, "actGNonFatalSplException", ret.result.errors[0].message!); })
//                    .fail(function (jqXHR, typ, obj) { return that.ddpMethod.getFailFromIsl(that, jqXHR, typ, obj); });
//            }
//}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RkcERhc2hib2FyZFBobC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEZHBEYXNoYm9hcmRQaGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0EwZGY7QUExZEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMGRuQjtJQTFkZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMGQ3QjtRQTFkb0IsV0FBQSxTQUFTO1lBQzFCLGtDQUFrQztZQUVsQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTtnQkFBbEQ7O29CQW1CSSxtQ0FBbUM7b0JBQ25DLGNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBd1R0Qyw0REFBNEQ7b0JBQzVELHVDQUF1QztvQkFDdkMsZUFBZTtvQkFDZix3QkFBd0I7b0JBQ3hCLGlKQUFpSjtvQkFDakoseUZBQXlGO29CQUN6RixxQ0FBcUM7b0JBQ3JDLCtCQUErQjtvQkFDL0IscUVBQXFFO29CQUNyRSxrQ0FBa0M7b0JBQ2xDLHVEQUF1RDtvQkFDdkQsOEJBQThCO29CQUM5QiwwQkFBMEI7b0JBQzFCLDBCQUEwQjtvQkFDMUIsOEJBQThCO29CQUM5Qix3SUFBd0k7b0JBQ3hJLGdCQUFnQjtvQkFDaEIsd0RBQXdEO29CQUN4RCx3REFBd0Q7b0JBQ3hELFlBQVk7b0JBQ1osbUJBQW1CO29CQUNuQiw4RkFBOEY7b0JBQzlGLGdDQUFnQztvQkFDaEMsMEJBQTBCO29CQUMxQiwyRUFBMkU7b0JBQzNFLGdDQUFnQztvQkFDaEMsa0hBQWtIO29CQUNsSCw4QkFBOEI7b0JBQzlCLDBCQUEwQjtvQkFDMUIsMEJBQTBCO29CQUMxQiw4QkFBOEI7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QUc7QUFDSCxHQUFHO0FBQ0gsNEJBQTRCO0FBQzVCLGdDQUFnQztBQUNoQywwQkFBMEI7QUFDMUIsaUVBQWlFO0FBQ2pFLG9KQUFvSjtBQUNwSix5SEFBeUg7QUFDekgsZUFBZTtBQUNmLE1BQU07QUFDTixvQ0FBb0M7QUFDcEMsd0NBQXdDO0FBQ3hDLDBCQUEwQjtBQUMxQix5RUFBeUU7QUFDekUsNEpBQTRKO0FBQzVKLHlIQUF5SDtBQUN6SCxlQUFlO0FBQ2YsTUFBTTtBQUNOLHdDQUF3QztBQUN4Qyw0Q0FBNEM7QUFDNUMsMEJBQTBCO0FBQzFCLDZFQUE2RTtBQUM3RSxnS0FBZ0s7QUFDaEsseUhBQXlIO0FBQ3pILGVBQWU7QUFDZixNQUFNO0FBQ04scUNBQXFDO0FBQ3JDLHlDQUF5QztBQUN6QywwQkFBMEI7QUFDMUIsMEVBQTBFO0FBQzFFLDZKQUE2SjtBQUM3Six5SEFBeUg7QUFDekgsZUFBZTtBQUNmLE1BQU07QUFDTiwwQ0FBMEM7QUFDMUMsOENBQThDO0FBQzlDLDBCQUEwQjtBQUMxQiwrRUFBK0U7QUFDL0Usa0tBQWtLO0FBQ2xLLHlIQUF5SDtBQUN6SCxlQUFlO0FBQ2YsTUFBTTtBQUNOLHVDQUF1QztBQUN2QywyQ0FBMkM7QUFDM0MsMEJBQTBCO0FBQzFCLDRFQUE0RTtBQUM1RSwrSkFBK0o7QUFDL0oseUhBQXlIO0FBQ3pILGVBQWU7QUFDZixNQUFNO0FBQ04sb0NBQW9DO0FBQ3BDLHdDQUF3QztBQUN4QywwQkFBMEI7QUFDMUIseUVBQXlFO0FBQ3pFLDRKQUE0SjtBQUM1Six5SEFBeUg7QUFDekgsZUFBZTtBQUNmLE1BQU07QUFDTix1Q0FBdUM7QUFDdkMsMkNBQTJDO0FBQzNDLDBCQUEwQjtBQUMxQiw0RUFBNEU7QUFDNUUsK0pBQStKO0FBQy9KLHlIQUF5SDtBQUN6SCxlQUFlO0FBQ2YsR0FBRyIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HRGRwRGFzaGJvYXJkUGhsLnRzICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gw5p2b2Ruw60gaW5mb3JtYcSNbsOtIGRhc2hib2FyZCBERFBlayAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDQtMTQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICAvL2NvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnM7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZHBEYXNoYm9hcmRQaGwgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvKiogVGl0dWxlayBzdHLDoW5reSAqL1xyXG4gICAgICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIMSMw61zbG8gdHlwdSBwb2hsZWTDoXZreSB6IGVrb3BhcmFtcyAqL1xyXG4gICAgICAgIHR5cF9waGw6IHN0cmluZztcclxuICAgICAgICAvKiogSXhwIGRlbiB6IGVrb3BhcmFtcyAqL1xyXG4gICAgICAgIEl4cERlbjogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBJY28gKi9cclxuICAgICAgICBJY286IHN0cmluZztcclxuICAgICAgICAvKiogUm9rICovXHJcbiAgICAgICAgUm9rOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFRleHQgdnLDoWNlbsO9IHBvIGluaXR1IEtuaWh5IGEgVHlwdSBwb2hsZWTDoXZreSAqL1xyXG4gICAgICAgIEluaXRFcnJvclRleHQ6IHN0cmluZyB8IG51bGw7XHJcbiAgICAgICAgSW5pdEVycm9ySWNvbjogc3RyaW5nO1xyXG4gICAgICAgIEluaXRFcnJvclRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgSW5pdEVycm9yQ29udGVudDogc3RyaW5nO1xyXG4gICAgICAgIHhfRGVidWc6IGJvb2xlYW5cclxuXHJcbiAgICAgICAgLyoqIFNkw61sZW7DqSBERFAgbWV0aG9keSBhIGZ1bmtjZSAqL1xyXG4gICAgICAgIGRkcE1ldGhvZCA9IERkcC5XZWJDbGllbnQuQ29tbW9uLkJhc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqIEZvcm0gcHJvIHN0YXRpc3Rpa3UgcMWZw61wYWTFr1xyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnk8Pn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGZvcm1TdGF0aXN0aWthUGhsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIC8qKiBEVE8gb2JqIFR5cHUgcG9obGVkw6F2a3lcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZHRvOiBJbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvO1xyXG4gICAgICAgIC8vcHJpdmF0ZSB0YWJNYW5hZ2VyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnRhc2tJZCA9IFwiYWN0R0Rhc2hib2FyZERkcFwiO1xyXG4gICAgICAgICAgICB0aGF0LmlkID0gXCJERFBHRGFzaGJvYXJkRGRwI1wiO1xyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gXCLDmnZvZG7DrSBzdHLDoW5rYVwiO1xyXG4gICAgICAgICAgICAvL3RoYXQuc2V0QnJlYWRjcnVtYnMoW3tcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogdGhhdC50aXRsZSxcclxuICAgICAgICAgICAgLy8gICAgZGVmYXVsdEFjdGlvbjogdHJ1ZVxyXG4gICAgICAgICAgICAvL31dKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gdGhhdC5pc2wuVHlwUG9obGVkYXZreS5yZWFkKHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiB0aGF0LnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IFtcIipcIiwgXCJOYXN0YXZlbmkuKlwiXVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSkuZ2V0KCk7XHJcblxyXG4gICAgICAgICAgICAvL3RoYXQuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBpZiAodGhhdC54X0RlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZU1lbnUoKTsgLy9NZW51IG5hZCBmaWx0cmVtIChzIGFrY8OtIHBybyB0ZXN0IG9rbmEgb3ByYXZ5KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdGhhdC5jcmVhdGVGaWx0ZXJQb2hsZWRhdmt5TmtzKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQ29udGV0KCk7XHJcblxyXG4gICAgICAgICAgICBwcm9taXNlLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZHRvID0gZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0LmR0byk7XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQuZ3JpZERvcGxua292ZVVkYWplLmdncmlkKFwic2V0RGF0YVwiLCBDb21tb24uVHlwUG9obGVkYXZreS5nZXRUZXh0cyh0aGF0LmR0bykpO1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LmRpcnR5ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5kZHBNZXRob2QuRGRwRWtvSW5pdCh0aGF0LCB0aGF0LkluaXRFcnJvclRleHQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHT3RldnJpdFByaXBhZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT3RldsWZw610IGRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MucHJvbXB0KFwiWmFkZWogUElEXCIsIFwiSVhQXCIsIFwiXCIpLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmV0VmFsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsLnRleHQubGVuZ3RoICE9IDEyKSByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJOZWJ5bCB6YWTDoW4gdmFsaWRuw60gcMWZw61wYWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21tb24uUHJpcGFkeS5vcGVuUHJpcGFkRGV0YWlsKHRoaXMsIHJldFZhbC50ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHT3RldnJpdFByaXBhZFRlc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGRwUGlkXCIsIHsgSUQ6IFwiRERQR0RkcFBpZCNcIiB9KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocmV0VmFsKSB0aGF0LmRpYWxvZ3Mud2FybmluZyhcIlRlc3RcIiwgcmV0VmFsLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBsZXQgbWVudTogTWVudVBhcmFtc1tdID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R090ZXZyaXRQcmlwYWRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LCAgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHT3RldnJpdFByaXBhZFRlc3RcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LCAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB0aGF0Lm1lbnVCYXIobWVudSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImFjdEdUZXN0T2tuYU9wcmF2eVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJUZXN0XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkZXNjcmlwdGlvbjogXCJOZXphcG9tZW5vdXQgc21hemF0IVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HT3ByYXZhUHJlZHBpc3VcIiwgeyBJeHA6ICdVUDc2WDAwMVA5M0gnLCBSYWRla191aHI6IDUyLCBUeXBfcGhsOiAnMDkzMScsIERhdF9vZDogbmV3IERhdGUoXCIyMDExLTA2LTI4XCIpLCBJRDogXCJERFBHT3ByYXZhUHJlZHBpc3UjXCIgfSwgYE9wcmF2YSBwxZllZHBpc3UgLSBwxZnDrXBhZCBVUDc2WDAwMVA5M0hgLCA3MDAsIDcwMClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29udGV0KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN1YkRhdGFWaWV3cyA9IHtcclxuICAgICAgICAgICAgICAgIHBsYXRjeTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoKSxcclxuICAgICAgICAgICAgICAgIHN0YXR1c3k6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KCksXHJcbiAgICAgICAgICAgICAgICBwcmVkcGlzeTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoKSxcclxuICAgICAgICAgICAgICAgIHBsYXRieTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoKSxcclxuICAgICAgICAgICAgICAgIGtvbnRyb2x5OiBuZXcgR29yZGljLkRhdGEuVmlldygpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAgICAgY29uc3QgZGF0YVZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhdHVzeSBQbMOhdGPFr1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGU6IFwidmVydGljYWxcIiwgLy9ob3Jpem9udGFsXHJcbiAgICAgICAgICAgICAgICAgICAgem9uZTogMCxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0U2VsZWN0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHN1YkRhdGFWaWV3cy5wbGF0Y3lcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhdHVzeSBQxZnDrXBhZMWvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJ2ZXJ0aWNhbFwiLCAvL2hvcml6b250YWxcclxuICAgICAgICAgICAgICAgICAgICB6b25lOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogc3ViRGF0YVZpZXdzLnN0YXR1c3lcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhdHVzeSBQxZllZHBpc8WvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJ2ZXJ0aWNhbFwiLCAvL2hvcml6b250YWxcclxuICAgICAgICAgICAgICAgICAgICB6b25lOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogc3ViRGF0YVZpZXdzLnByZWRwaXN5XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlN0YXR1c3kgUGxhdGViXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJ2ZXJ0aWNhbFwiLCAvL2hvcml6b250YWxcclxuICAgICAgICAgICAgICAgICAgICB6b25lOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogc3ViRGF0YVZpZXdzLnBsYXRieVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJLb250cm9seVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGU6IFwidmVydGljYWxcIiwgLy92ZXJ0aWNhbFxyXG4gICAgICAgICAgICAgICAgICAgIHpvbmU6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBzdWJEYXRhVmlld3Mua29udHJvbHlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pXHJcblxyXG4gICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2Rhc2hib2FyZHBhbmVsKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFWaWV3LFxyXG4gICAgICAgICAgICAgICAgbGF5b3V0OiBcImhvcml6b250YWxcIiwgLy92ZXJ0aWNhbFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiRGFzaGJvYXJkXCIsXHJcbiAgICAgICAgICAgICAgICB6b25lczogMyxcclxuICAgICAgICAgICAgICAgIHNvcnRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgbGV0IGZpZWxkcyA9IHRoYXQuZmluZEZvcm1zKFwiZm9ybVN0YXRpc3Rpa2FQaGxcIikuZmluZEZpZWxkcyhcImFrdGl2bmlfcHJpcGFkeVwiLCBcInpydXNlbmVfcHJpcGFkeVwiLCBcInVrb25jZW5lX3ByaXBhZHlcIiwgXCJjZWxrZW1fcHJpcGFkdVwiLCBcImFrdGl2bmljaF9wbGF0Y3Vfc2Ftb3N0XCIsIFwiYWt0aXZuaWNoX3BsYXRjdV9wb3BsXCIsIFwibmFwb2plbnljaF9wb3BsYXRuaWt1XCIpO1xyXG4gICAgICAgICAgICBmaWVsZHMuZ2ZpZWxkKFwib3B0aW9uXCIsIFwid2FpdGluZ0ZvclZhbHVlXCIsIGRlZi5wcm9taXNlKCkpO1xyXG4gICAgICAgICAgICBmaWVsZHMuZ3Byb2dyZXNzb3ZlcmxheSh7fSkuZ3Byb2dyZXNzb3ZlcmxheShcInNldFBlbmRpbmdcIiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGVmMiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgbGV0IGZpZWxkczIgPSB0aGF0LmZpbmRGb3JtcyhcImZvcm1TdGF0aXN0aWthUGhsXCIpLmZpbmRGaWVsZHMoXCJjZWxrZW1fcHJlZHBpc3VcIiwgXCJwb2NldF9wcmVkcGlzdVwiKTtcclxuICAgICAgICAgICAgZmllbGRzMi5nZmllbGQoXCJvcHRpb25cIiwgXCJ3YWl0aW5nRm9yVmFsdWVcIiwgZGVmMi5wcm9taXNlKCkpO1xyXG4gICAgICAgICAgICBmaWVsZHMyLmdwcm9ncmVzc292ZXJsYXkoe30pLmdwcm9ncmVzc292ZXJsYXkoXCJzZXRQZW5kaW5nXCIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRlZjMgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGxldCBmaWVsZHMzID0gdGhhdC5maW5kRm9ybXMoXCJmb3JtU3RhdGlzdGlrYVBobFwiKS5maW5kRmllbGRzKFwiY2Vsa2VtX3BsYXRlYlwiLCBcInBvY2V0X3BsYXRlYlwiKTtcclxuICAgICAgICAgICAgZmllbGRzMy5nZmllbGQoXCJvcHRpb25cIiwgXCJ3YWl0aW5nRm9yVmFsdWVcIiwgZGVmMy5wcm9taXNlKCkpO1xyXG4gICAgICAgICAgICBmaWVsZHMzLmdwcm9ncmVzc292ZXJsYXkoe30pLmdwcm9ncmVzc292ZXJsYXkoXCJzZXRQZW5kaW5nXCIsIHRydWUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCByOiBhbnkgPSB7IHR5cF9waGw6IHRoYXQudHlwX3BobCB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuSW5pdEVycm9yVGV4dCA9PSBudWxsIHx8IHRoYXQuSW5pdEVycm9yVGV4dC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5Jbml0RXJyb3JDb250ZW50ID0gXCJWxaFlY2hueSBrb250cm9seSBwcm9ixJtobHkgdiBwb8WZw6Fka3VcIjtcclxuICAgICAgICAgICAgICAgIHRoYXQuSW5pdEVycm9yVGl0bGUgPSBcIk5hc3RhdmVuw60gdiBwb8WZw6Fka3VcIjtcclxuICAgICAgICAgICAgICAgIHRoYXQuSW5pdEVycm9ySWNvbiA9IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuSW5pdEVycm9yQ29udGVudCA9IHRoYXQuSW5pdEVycm9yVGV4dDtcclxuICAgICAgICAgICAgICAgIHRoYXQuSW5pdEVycm9yVGl0bGUgPSBcIkNoeWJhIG5hc3RhdmVuw61cIjtcclxuICAgICAgICAgICAgICAgIHRoYXQuSW5pdEVycm9ySWNvbiA9IFwiZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdWJEYXRhVmlld3Mua29udHJvbHkudXBkYXRlRGF0YShbe1xyXG4gICAgICAgICAgICAgICAgaWNvbjogdGhhdC5Jbml0RXJyb3JJY29uLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRoYXQuSW5pdEVycm9yVGl0bGUsXHJcbiAgICAgICAgICAgICAgICBpZDogXCJJbml0S29udHJvbHlcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGF0LkluaXRFcnJvckNvbnRlbnRcclxuICAgICAgICAgICAgfV0pXHJcblxyXG4gICAgICAgICAgICB0aGF0LmlzbC5UeXBQb2hsZWRhdmt5LnN0YXRpc3Rpa2FQcmlwYWR5KHIpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViRGF0YVZpZXdzLnN0YXR1c3kudXBkYXRlRGF0YShbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlBvxI1ldCBha3Rpdm7DrWNoIHDFmcOtcGFkxa9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFrdGl2bmlfcHJpcGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IE51bWJlcihkYXRhLmFrdGl2bmlfcHJpcGFkeSkudG9Mb2NhbGVTdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJQb8SNZXQgenJ1xaFlbsO9Y2ggcMWZw61wYWTFr1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwienJ1c2VuZV9wcmlwYWR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogTnVtYmVyKGRhdGEuenJ1c2VuZV9wcmlwYWR5KS50b0xvY2FsZVN0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlBvxI1ldCB1a29uxI1lbsO9Y2ggcMWZw61wYWTFr1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidWtvbmNlbmVfcHJpcGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IE51bWJlcihkYXRhLnVrb25jZW5lX3ByaXBhZHkpLnRvTG9jYWxlU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YkRhdGFWaWV3cy5wbGF0Y3kudXBkYXRlRGF0YShbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlBvxI1ldCBwxZnDrXBhZMWvIGNlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiY2Vsa2VtX3ByaXBhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBOdW1iZXIoZGF0YS5jZWxrZW1fcHJpcGFkdSkudG9Mb2NhbGVTdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJBa3Rpdm7DrWNoIHBsw6F0Y8WvIHNhbW9zdC5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFrdGl2bmljaF9wbGF0Y3Vfc2Ftb3N0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogTnVtYmVyKGRhdGEuYWt0aXZuaWNoX3BsYXRjdV9zYW1vc3QpLnRvTG9jYWxlU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQWt0aXZuw61jaCBwbMOhdGPFryB6YSBwb3BsLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYWt0aXZuaWNoX3BsYXRjdV9wb3BsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogTnVtYmVyKGRhdGEuYWt0aXZuaWNoX3BsYXRjdV9wb3BsKS50b0xvY2FsZVN0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5hcG9qZW7DvWNoIHBvcGxhdG7DrWvFr1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmFwb2plbnljaF9wb3BsYXRuaWt1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogTnVtYmVyKGRhdGEubmFwb2plbnljaF9wb3BsYXRuaWt1KS50b0xvY2FsZVN0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkcy5ncHJvZ3Jlc3NvdmVybGF5KFwic2V0UGVuZGluZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlR5cFBvaGxlZGF2a3kuc3RhdGlzdGlrYVByZWRwaXN5KHIpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViRGF0YVZpZXdzLnByZWRwaXN5LnVwZGF0ZURhdGEoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJQb8SNZXQgcMWZZWRwaXPFr1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiY2Vsa2VtX3ByZWRwaXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogTnVtYmVyKGRhdGEuY2Vsa2VtX3ByZWRwaXN1KS50b0xvY2FsZVN0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlBvxI1ldCBwcmVkcGlzxa9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInBvY2V0X3ByZWRwaXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogTnVtYmVyKGRhdGEucG9jZXRfcHJlZHBpc3UpLnRvTG9jYWxlU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHMyLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmMi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZjIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzMi5ncHJvZ3Jlc3NvdmVybGF5KFwic2V0UGVuZGluZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlR5cFBvaGxlZGF2a3kuc3RhdGlzdGlrYVBsYXRieShyKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YkRhdGFWaWV3cy5wbGF0YnkudXBkYXRlRGF0YShbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlBsYXRlYiBjZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImNlbGtlbV9wbGF0ZWJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBOdW1iZXIoZGF0YS5jZWxrZW1fcGxhdGViKS50b0xvY2FsZVN0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlBvxI1ldCBwbGF0ZWJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInBvY2V0X3BsYXRlYlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IE51bWJlcihkYXRhLnBvY2V0X3BsYXRlYikudG9Mb2NhbGVTdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkczMuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWYzLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmMy5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHMzLmdwcm9ncmVzc292ZXJsYXkoXCJzZXRQZW5kaW5nXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyoqIFZ5dHZvxZnDrSBGT1JNdWzDocWZIHBvZGxlIHrDoWxvxb5reSBQb2hsZWTDoXZreSwgTktTIHYgVEsgKi9cclxuICAgICAgICAvL3ByaXZhdGUgY3JlYXRlRmlsdGVyUG9obGVkYXZreU5rcygpIHtcclxuICAgICAgICAvLyAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAvLyAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyAgICAvL3JldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJQb2hsZWTDoXZreSwgTktTXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDNNM1MyLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMSwgYnJlYWtzLTcwMC0xMDAwXCIgfSlcclxuICAgICAgICAvLyAgICB2YXIgdGVzdCA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwidGVzdEZvcm1cIiwgdGFiTGFiZWw6IFwiUG9obGVkw6F2a3ksIE5LU1wiIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC8vLmFkZFNlY3Rpb24oXCJQb2hsZWTDoXZreVwiKVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkUm93KFwiUG9obGVkw6F2a3lcIilcclxuICAgICAgICAvLyAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwgUHJlZmFicy5TZWxlY3QuZGRwc3RwcCgpLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcInR5cF9waGxfc2V6XCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBtb2RlbDogXCJtb2RlbC50eXBfcGhsPXZhbHVlLnR5cF9waGxfc2V6XCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgICAgIGxpc3Q6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGFrdGl2aXRhOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJha3Rpdm7DrV9zZXpfdHlwX3BobFwiLCBcImFrdGl2aXRhXCIsIGZhbHNlLCBmYWxzZSwgdGhhdC5lbGVtZW50KSAvLz8/IHRoYXQudHlwX3BobFxyXG4gICAgICAgIC8vICAgICAgICAgICAgfSxcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiB7IHR5cF9waGw6IHRoYXQudHlwX3BobCB9LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy9kZWZhdWx0VmFsdWU6IHsgdHlwX3BobDogdGhhdC50eXBfcGhsIH0sXHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTEyXCIsIHsgbmFtZTogXCJha3Rpdm7DrV9zZXpfdHlwX3BobFwiLCBsYWJlbDogXCJQb3V6ZSBha3Rpdm7DrVwiIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC8vLmFkZFNlY3Rpb24oXCLFmMOhZGt5XCIpXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRSb3coXCLFmMOhZGt5XCIpXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTEyXCIsIFByZWZhYnMuU2VsZWN0LmNpc2VsbmlrUmFka3UoKSwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJkZHBfcmFkZWtcIixcclxuICAgICAgICAvLyAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4cF9kZW49dmFsdWUuSXhwRGVuO21vZGVsLnR5cF9waGw9dmFsdWUudHlwX3BobF9zZXo7bW9kZWwuZGRwX3JhZGVrPXZhbHVlLmRkcF9yYWRla1wiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBsaXN0OiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBpeHBfZGVuOiB0aGF0Lkl4cERlbixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0eXBfcGhsOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJ0eXBfcGhsX3NlelwiLCBcInR5cF9waGxcIiwgdHJ1ZSwgZmFsc2UsIHRoYXQuZWxlbWVudCkgLy8/PyB0aGF0LnR5cF9waGxcclxuICAgICAgICAvLyAgICAgICAgICAgIH0sXHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vICAgICAgICAvLy5hZGRTZWN0aW9uKFwixIx0dnJ0aVwiKVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkUm93KFwixIx0dnJ0aVwiKVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCBQcmVmYWJzLlNlbGVjdC5jaXNlbG5pa0N0dnJ0aSgpLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImRkcF9jdHZydFwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhwX2Rlbj12YWx1ZS5JeHBEZW47bW9kZWwudHlwX3BobD12YWx1ZS50eXBfcGhsX3Nlejttb2RlbC5kZHBfY3R2cnQ9dmFsdWUuZGRwX2N0dnJ0XCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgICAgIGxpc3Q6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoYXQuSXhwRGVuLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHR5cF9waGw6IG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcInR5cF9waGxfc2V6XCIsIFwidHlwX3BobFwiLCB0cnVlLCBmYWxzZSwgdGhhdC5lbGVtZW50KSAvLz8/IHRoYXQudHlwX3BobFxyXG4gICAgICAgIC8vICAgICAgICAgICAgfSxcclxuICAgICAgICAvLyAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gICAgICAgIC8vLmFkZFNlY3Rpb24oXCJTdMWZZWRpc2thXCIpXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRSb3coXCJTdMWZZWRpc2thXCIpXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTEyXCIsIFByZWZhYnMuU2VsZWN0LmVrb3Nua3MoKSwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJua3Nfc2V6XCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5ua3M9dmFsdWUubmtzX3Nlejttb2RlbC5pY289dmFsdWUuSWNvXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgICAgIGxpc3Q6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGljbzogdGhhdC5JY28sXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgYWt0X3Byb2hsOiAxMDAsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICByb2tfb2Q6IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgbzogXCI8PVwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB2OiB0aGF0LlJva1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgcm9rX2RvOiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIG86IFwiPj1cIixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdjogdGhhdC5Sb2tcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vICAgICAgICAvLy5hZGRTZWN0aW9uKFwiU2F6YnlcIilcclxuICAgICAgICAvLyAgICAgICAgLmFkZFJvdyhcIlNhemJ5XCIpIC8vY2lzX3NhemJ5X3NlelxyXG4gICAgICAgIC8vICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmRkcGRzYXooKSwgeyAvL1ByZWZhYnMuU2VsZWN0LmdOUmVhZGVyRGRwZHNheigpXHJcbiAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImNpc19zYXpieV9zZXpcIixcclxuICAgICAgICAvLyAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmNpc19zYXpieT12YWx1ZS5jaXNfc2F6Ynlfc2V6O21vZGVsLnR5cF9waGw9dmFsdWUudHlwX3BobF9zZXpcIixcclxuICAgICAgICAvLyAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgbGlzdDogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdHlwX3BobDogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwidHlwX3BobF9zZXpcIiwgXCJ0eXBfcGhsXCIsIHRydWUsIGZhbHNlLCB0aGF0LmVsZW1lbnQpIC8vPz8gdGhhdC50eXBfcGhsXHJcbiAgICAgICAgLy8gICAgICAgICAgICB9LFxyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICA7XHJcbiAgICAgICAgLy8gICAgdmFyIGRlZmF1bHRGb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHRlc3QpO1xyXG5cclxuICAgICAgICAvLyAgICAvL2xldCBmb3JtU3RhdGlzdGlrYVBobCA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybVN0YXRpc3Rpa2FQaGxcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzJcIiB9KVxyXG4gICAgICAgIC8vICAgIC8vLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgIC8vICAgIC8vLmFkZFJvdyh7IGxhYmVsOiBcIlR5cCBwb2hsZWTDoXZreVwiIH0pXHJcbiAgICAgICAgLy8gICAgLy8uYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmRkcHN0cHAoKSwge1xyXG4gICAgICAgIC8vICAgIC8vICAgIG5hbWU6IFwidHlwX3BobFwiLFxyXG4gICAgICAgIC8vICAgIC8vICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9waGw9dmFsdWUudHlwX3BobFwiLFxyXG4gICAgICAgIC8vICAgIC8vfSlcclxuICAgICAgICAvLyAgICAvLy5hZGRSb3coeyBsYWJlbDogXCJEYXR1bSB1esOhdsSbcmt5XCIgfSlcclxuICAgICAgICAvLyAgICAvLy5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJOYXN0YXZlbmkuZGF0X3V6YXZcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAvLyAgICAvLy5hZGRSb3coeyBsYWJlbDogXCJSb2tcIiB9KVxyXG4gICAgICAgIC8vICAgIC8vLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5yb2soKSwgeyBuYW1lOiBcIk5hc3RhdmVuaS5yb2tcIiwgbW9kZWw6IFwibW9kZWwuTmFzdGF2ZW5pLnJvaz12YWx1ZS5yb2tcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAvLyAgICAvLy5hZGRSb3coeyBsYWJlbDogXCJJxIxPXCIgfSlcclxuICAgICAgICAvLyAgICAvLy5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgeyBuYW1lOiBcIk5hc3RhdmVuaS5pY29cIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAvLyAgICAvLy5hZGRSb3coeyBsYWJlbDogXCJVxI1ldG7DrSBzdMWZZWRpc2tvXCIgfSlcclxuICAgICAgICAvLyAgICAvLy5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZWtvc3VjcygpLCB7IG5hbWU6IFwiTmFzdGF2ZW5pLnVjc1wiLCBtb2RlbDogXCJtb2RlbC5OYXN0YXZlbmkudWNzPXZhbHVlLnVjczttb2RlbC5OYXN0YXZlbmkuaWNvPXZhbHVlLmljb1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG5cclxuICAgICAgICAvLyAgICAvLy5hZGRSb3coeyBsYWJlbDogXCJQb3puw6Fta2FcIiB9KVxyXG4gICAgICAgIC8vICAgIC8vLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG96bmFta2FcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuXHJcbiAgICAgICAgLy8gICAgLy8uYWRkUm93KHsgbGFiZWw6IFwiU3RhdiBwb2hsZWTDoXZreVwiIH0pXHJcbiAgICAgICAgLy8gICAgLy8uYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmRkcGNzdHAoKSwgeyBuYW1lOiBcIk5hc3RhdmVuaS5zdGF2X3BobFwiLCBtb2RlbDogXCJtb2RlbC5OYXN0YXZlbmkuc3Rhdl9waGw9dmFsdWUuc3Rhdl9waGxcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAvLyAgICAvLz8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gICAgLy8uYWRkU2VjdGlvbigpXHJcbiAgICAgICAgLy8gICAgLy8uYWRkUm93KFwiUG/EjWV0IGFrdGl2bsOtY2ggcMWZw61wYWTFr1wiKVxyXG4gICAgICAgIC8vICAgIC8vLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwiYWt0aXZuaV9wcmlwYWR5XCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgLy8gICAgLy8uYWRkUm93KFwiUG/EjWV0IHpydcWhZW7DvWNoIHDFmcOtcGFkxa9cIilcclxuICAgICAgICAvLyAgICAvLy5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgeyBuYW1lOiBcInpydXNlbmVfcHJpcGFkeVwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgIC8vICAgIC8vLmFkZFJvdyhcIlBvxI1ldCB1a29uxI1lbsO9Y2ggcMWZw61wYWTFr1wiKVxyXG4gICAgICAgIC8vICAgIC8vLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwidWtvbmNlbmVfcHJpcGFkeVwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgIC8vICAgIC8vLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgIC8vICAgIC8vLmFkZFJvdyhcIlBvxI1ldCBwxZnDrXBhZMWvIGNlbGtlbVwiKVxyXG4gICAgICAgIC8vICAgIC8vLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwiY2Vsa2VtX3ByaXBhZHVcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAvLyAgICAvLy5hZGRSb3coXCJ6IHRvaG8gYWt0aXZuw61jaCBwbMOhdGPFryBzYW1vc3RcIilcclxuICAgICAgICAvLyAgICAvLy5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgeyBuYW1lOiBcImFrdGl2bmljaF9wbGF0Y3Vfc2Ftb3N0XCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgLy8gICAgLy8uYWRkUm93KFwiYWt0aXZuw61jaCBwbMOhdGPFryB6YSBwb3BsXCIpXHJcbiAgICAgICAgLy8gICAgLy8uYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHsgbmFtZTogXCJha3Rpdm5pY2hfcGxhdGN1X3BvcGxcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAvLyAgICAvLy5hZGRSb3coXCJhIG5hcG9qZW7DvWNoIHBvcGxhdG7DrWvFr1wiKVxyXG4gICAgICAgIC8vICAgIC8vLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwibmFwb2plbnljaF9wb3BsYXRuaWt1XCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgLy8gICAgLy8uYWRkU2VjdGlvbigpXHJcbiAgICAgICAgLy8gICAgLy8uYWRkUm93KFwiUMWZZWRwaXPFryBjZWxrZW1cIilcclxuICAgICAgICAvLyAgICAvLy5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBuYW1lOiBcImNlbGtlbV9wcmVkcGlzdVwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgIC8vICAgIC8vLmFkZFJvdyhcIlBsYXRlYiBjZWxrZW1cIilcclxuICAgICAgICAvLyAgICAvLy5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBuYW1lOiBcImNlbGtlbV9wbGF0ZWJcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAvLyAgICAvLy5hZGRSb3coXCJQb8SNZXQgcMWZZWRwaXPFr1wiKVxyXG4gICAgICAgIC8vICAgIC8vLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwicG9jZXRfcHJlZHBpc3VcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAvLyAgICAvLy5hZGRSb3coXCJQb8SNZXQgcGxhdGViXCIpXHJcbiAgICAgICAgLy8gICAgLy8uYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHsgbmFtZTogXCJwb2NldF9wbGF0ZWJcIiwgZGlzYWJsZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgLy8gICAgLy92YXIgc3RhdGlzdGlrYSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtU3RhdGlzdGlrYVBobClcclxuXHJcbiAgICAgICAgLy99XHJcbiAgICB9XHJcbn1cclxuXHJcbi8ve1xyXG4vLyAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdFeGNlcHRpb25cIl0sXHJcbi8vfSxcclxuLy97XHJcbi8vICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0FyZ3VtZW50RXhjZXB0aW9uXCJdLCAgICBcclxuLy99LFxyXG4vL3tcclxuLy8gICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQXJndW1lbnROdWxsRXhjZXB0aW9uXCJdLCAgICAgICAgICAgIFxyXG4vL30sXHJcbi8ve1xyXG4vLyAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdEZHBTZXJ2ZXJFeGNlcHRpb25cIl0sICAgICBcclxuLy99LFxyXG4vL3tcclxuLy8gICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHTm90SW1wbGVtZW50ZWRFeGNlcHRpb25cIl0sICAgICAgICAgICAgXHJcbi8vfSxcclxuLy97XHJcbi8vICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0RhdGFJbnZhbGlkRXhjZXB0aW9uXCJdLCAgICAgICAgICBcclxuLy99LFxyXG4vL3tcclxuLy8gICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHTm9uRmF0YWxFeGNlcHRpb25cIl0sICAgICBcclxuLy99LFxyXG4vL3tcclxuLy8gICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHTm9uRmF0YWxTcGxFeGNlcHRpb25cIl0sICAgICAgICAgIFxyXG4vL31cclxuLy97XHJcbi8vICAgIG5hbWU6IFwiYWN0R0V4Y2VwdGlvblwiLFxyXG4vLyAgICAgICAgY2FwdGlvbjogXCJHRXhjZXB0aW9uXCIsXHJcbi8vICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgIHRoYXQuaXNsLlByaXBhZFNwaXN5LmFjdEdFeGNlcHRpb24oaW5wdXQpLmdldCgpXHJcbi8vICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmV0KSA9PiB7IHJldHVybiB0aGF0LmRkcE1ldGhvZC5zZXROb3RpZmljYXRpb25BZnRlck9wZXJhdGlvbih0aGF0LCBcImFjdEdFeGNlcHRpb25cIiwgcmV0LnJlc3VsdC5lcnJvcnNbMF0ubWVzc2FnZSEpOyB9KVxyXG4vLyAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikgeyByZXR1cm4gdGhhdC5kZHBNZXRob2QuZ2V0RmFpbEZyb21Jc2wodGhhdCwganFYSFIsIHR5cCwgb2JqKTsgfSk7XHJcbi8vICAgICAgICAgICAgfVxyXG4vL30sIHtcclxuLy8gICAgbmFtZTogXCJhY3RHQXJndW1lbnRFeGNlcHRpb25cIixcclxuLy8gICAgICAgIGNhcHRpb246IFwiR0FyZ3VtZW50RXhjZXB0aW9uXCIsXHJcbi8vICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgIHRoYXQuaXNsLlByaXBhZFNwaXN5LmFjdEdBcmd1bWVudEV4Y2VwdGlvbihpbnB1dCkuZ2V0KClcclxuLy8gICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXQpID0+IHsgcmV0dXJuIHRoYXQuZGRwTWV0aG9kLnNldE5vdGlmaWNhdGlvbkFmdGVyT3BlcmF0aW9uKHRoYXQsIFwiYWN0R0FyZ3VtZW50RXhjZXB0aW9uXCIsIHJldC5yZXN1bHQuZXJyb3JzWzBdLm1lc3NhZ2UhKTsgfSlcclxuLy8gICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHsgcmV0dXJuIHRoYXQuZGRwTWV0aG9kLmdldEZhaWxGcm9tSXNsKHRoYXQsIGpxWEhSLCB0eXAsIG9iaik7IH0pO1xyXG4vLyAgICAgICAgICAgIH1cclxuLy99LCB7XHJcbi8vICAgIG5hbWU6IFwiYWN0R0FyZ3VtZW50TnVsbEV4Y2VwdGlvblwiLFxyXG4vLyAgICAgICAgY2FwdGlvbjogXCJHQXJndW1lbnROdWxsRXhjZXB0aW9uXCIsXHJcbi8vICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgIHRoYXQuaXNsLlByaXBhZFNwaXN5LmFjdEdBcmd1bWVudE51bGxFeGNlcHRpb24oaW5wdXQpLmdldCgpXHJcbi8vICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmV0KSA9PiB7IHJldHVybiB0aGF0LmRkcE1ldGhvZC5zZXROb3RpZmljYXRpb25BZnRlck9wZXJhdGlvbih0aGF0LCBcImFjdEdBcmd1bWVudE51bGxFeGNlcHRpb25cIiwgcmV0LnJlc3VsdC5lcnJvcnNbMF0ubWVzc2FnZSEpOyB9KVxyXG4vLyAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikgeyByZXR1cm4gdGhhdC5kZHBNZXRob2QuZ2V0RmFpbEZyb21Jc2wodGhhdCwganFYSFIsIHR5cCwgb2JqKTsgfSk7XHJcbi8vICAgICAgICAgICAgfVxyXG4vL30sIHtcclxuLy8gICAgbmFtZTogXCJhY3RHRGRwU2VydmVyRXhjZXB0aW9uXCIsXHJcbi8vICAgICAgICBjYXB0aW9uOiBcIkdEZHBTZXJ2ZXJFeGNlcHRpb25cIixcclxuLy8gICAgICAgICAgICBydW46ICgpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkU3Bpc3kuYWN0R0RkcFNlcnZlckV4Y2VwdGlvbihpbnB1dCkuZ2V0KClcclxuLy8gICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXQpID0+IHsgcmV0dXJuIHRoYXQuZGRwTWV0aG9kLnNldE5vdGlmaWNhdGlvbkFmdGVyT3BlcmF0aW9uKHRoYXQsIFwiYWN0R0RkcFNlcnZlckV4Y2VwdGlvblwiLCByZXQucmVzdWx0LmVycm9yc1swXS5tZXNzYWdlISk7IH0pXHJcbi8vICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7IHJldHVybiB0aGF0LmRkcE1ldGhvZC5nZXRGYWlsRnJvbUlzbCh0aGF0LCBqcVhIUiwgdHlwLCBvYmopOyB9KTtcclxuLy8gICAgICAgICAgICB9XHJcbi8vfSwge1xyXG4vLyAgICBuYW1lOiBcImFjdEdOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvblwiLFxyXG4vLyAgICAgICAgY2FwdGlvbjogXCJHTm90SW1wbGVtZW50ZWRFeGNlcHRpb25cIixcclxuLy8gICAgICAgICAgICBydW46ICgpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkU3Bpc3kuYWN0R05vdEltcGxlbWVudGVkRXhjZXB0aW9uKGlucHV0KS5nZXQoKVxyXG4vLyAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJldCkgPT4geyByZXR1cm4gdGhhdC5kZHBNZXRob2Quc2V0Tm90aWZpY2F0aW9uQWZ0ZXJPcGVyYXRpb24odGhhdCwgXCJhY3RHTm90SW1wbGVtZW50ZWRFeGNlcHRpb25cIiwgcmV0LnJlc3VsdC5lcnJvcnNbMF0ubWVzc2FnZSEpOyB9KVxyXG4vLyAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikgeyByZXR1cm4gdGhhdC5kZHBNZXRob2QuZ2V0RmFpbEZyb21Jc2wodGhhdCwganFYSFIsIHR5cCwgb2JqKTsgfSk7XHJcbi8vICAgICAgICAgICAgfVxyXG4vL30sIHtcclxuLy8gICAgbmFtZTogXCJhY3RHRGF0YUludmFsaWRFeGNlcHRpb25cIixcclxuLy8gICAgICAgIGNhcHRpb246IFwiR0RhdGFJbnZhbGlkRXhjZXB0aW9uXCIsXHJcbi8vICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgIHRoYXQuaXNsLlByaXBhZFNwaXN5LmFjdEdEYXRhSW52YWxpZEV4Y2VwdGlvbihpbnB1dCkuZ2V0KClcclxuLy8gICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXQpID0+IHsgcmV0dXJuIHRoYXQuZGRwTWV0aG9kLnNldE5vdGlmaWNhdGlvbkFmdGVyT3BlcmF0aW9uKHRoYXQsIFwiYWN0R0RhdGFJbnZhbGlkRXhjZXB0aW9uXCIsIHJldC5yZXN1bHQuZXJyb3JzWzBdLm1lc3NhZ2UhKTsgfSlcclxuLy8gICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHsgcmV0dXJuIHRoYXQuZGRwTWV0aG9kLmdldEZhaWxGcm9tSXNsKHRoYXQsIGpxWEhSLCB0eXAsIG9iaik7IH0pO1xyXG4vLyAgICAgICAgICAgIH1cclxuLy99LCB7XHJcbi8vICAgIG5hbWU6IFwiYWN0R05vbkZhdGFsRXhjZXB0aW9uXCIsXHJcbi8vICAgICAgICBjYXB0aW9uOiBcIkdOb25GYXRhbEV4Y2VwdGlvblwiLFxyXG4vLyAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICB0aGF0LmlzbC5QcmlwYWRTcGlzeS5hY3RHTm9uRmF0YWxFeGNlcHRpb24oaW5wdXQpLmdldCgpXHJcbi8vICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmV0KSA9PiB7IHJldHVybiB0aGF0LmRkcE1ldGhvZC5zZXROb3RpZmljYXRpb25BZnRlck9wZXJhdGlvbih0aGF0LCBcImFjdEdOb25GYXRhbEV4Y2VwdGlvblwiLCByZXQucmVzdWx0LmVycm9yc1swXS5tZXNzYWdlISk7IH0pXHJcbi8vICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7IHJldHVybiB0aGF0LmRkcE1ldGhvZC5nZXRGYWlsRnJvbUlzbCh0aGF0LCBqcVhIUiwgdHlwLCBvYmopOyB9KTtcclxuLy8gICAgICAgICAgICB9XHJcbi8vfSwge1xyXG4vLyAgICBuYW1lOiBcImFjdEdOb25GYXRhbFNwbEV4Y2VwdGlvblwiLFxyXG4vLyAgICAgICAgY2FwdGlvbjogXCJHTm9uRmF0YWxTcGxFeGNlcHRpb25cIixcclxuLy8gICAgICAgICAgICBydW46ICgpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkU3Bpc3kuYWN0R05vbkZhdGFsU3BsRXhjZXB0aW9uKGlucHV0KS5nZXQoKVxyXG4vLyAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJldCkgPT4geyByZXR1cm4gdGhhdC5kZHBNZXRob2Quc2V0Tm90aWZpY2F0aW9uQWZ0ZXJPcGVyYXRpb24odGhhdCwgXCJhY3RHTm9uRmF0YWxTcGxFeGNlcHRpb25cIiwgcmV0LnJlc3VsdC5lcnJvcnNbMF0ubWVzc2FnZSEpOyB9KVxyXG4vLyAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikgeyByZXR1cm4gdGhhdC5kZHBNZXRob2QuZ2V0RmFpbEZyb21Jc2wodGhhdCwganFYSFIsIHR5cCwgb2JqKTsgfSk7XHJcbi8vICAgICAgICAgICAgfVxyXG4vL30iXX0=
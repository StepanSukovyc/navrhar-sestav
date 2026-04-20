"use strict";
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
            let gcontent = Decorators.gcontent;
            /**
             * GDetailDavkaPDB
             *
             * @author vblabla
             * @since 52620.2
             */
            let GDetailDavkaPDB = class GDetailDavkaPDB extends Gordic.GDetailBuilderContent {
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    this.aktualizaceDetailu();
                    //this.element.findForms("formPrikaz").gform("viewMode", "view");
                }
                /**
                 * Obsluha události builderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder detailbuilder
                 */
                onDetailBuilderInit(builder) {
                    let that = this;
                    var resultTabGroups;
                    resultTabGroups = [{
                            id: "_obsah",
                            caption: "Obsah"
                        },
                        {
                            id: "_podpisy",
                            caption: "Podpisy",
                        }];
                    var headerForm = new Gordic.Forms.Form({ name: "formDavkaPDB", layoutDescriptor: "L3M3S3" /*L-4-8-0, M-4-8-0, S-12-12-0*/ })
                        .addSection()
                        .addRow("Identifikátor").addField("gstringbox", Gordic.Prefabs.String.ixs(false), /* Gordic.Prefabs.Actions.UlozitDoClipboardu(that.element.findFields("ixp_dav").gfield("getValue")),*/ { name: "ixp_dav", /*model: "model.ixp = value.ixp",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        //.addRow("Banka").addField("gstringbox", { name: "banka", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ }).addSection()
                        .addRow("Banka").addField("gstringbox", { name: "sk_vl", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addRow("Datum vzniku").addField("gdatebox", { name: "dat_vzn", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addRow("Počet podpisů").addField("gstringbox", { name: "poc_pod", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addRow("Počet podpisů požadovaných").addField("gstringbox", { name: "poc_pod", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addSection()
                        .addRow("Číslo dávky").addField("gstringbox", { name: "cislo_davky", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addRow("Stav dávky").addField("gstringbox", { name: "s_dpb_txt", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addRow("Počet příkazů").addField("gstringbox", { name: "poc_pri", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addRow("Datum podpisu").addField("gdatebox", { name: "dat_ppo", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addRow("Počet podpisů uložených").addField("gstringbox", { name: "poc_pod_ulo", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addSection()
                        .addRow("Vlastník").addField("gstringbox", { name: "vlastnik", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addRow("Označení dávky").addField("gstringbox", { name: "soubor", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addRow("Částka").addField("gstringbox", { name: "castka", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addRow("Datum odeslání").addField("gdatebox", { name: "dat_ode", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addRow("Stav transakce").addField("gstringbox", { name: "stav_tra", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ });
                    // prvky pro statusbar
                    this.statusBarStav = Gordic.Eko.Detail.StatusBar.createItem(); //new GObservableObject<MenuParams>({ type: "static", caption: "", customClass: "g-state-text" });
                    // úprava bočního panelu
                    builder.moveDefinitionAfter("panelInformace", "panelNavigator", GDbd.DefinitionKind.SidePanel);
                    // definice akcí, tabů, kpi, menu apod.
                    builder.withComponent("GDetailPrikaz", {
                        headerForm: headerForm,
                        actions: {
                            actDokoncit: {
                                caption: "jres:33140076", //RC 33140076 : Dokončit
                                run: function () {
                                }
                            },
                            actStav: {
                                caption: "jres:33140077", //RC 33140077 : Stav
                                run: function () {
                                }
                            },
                            actProtokol: {
                                caption: "jres:33140094", //RC 33140094 : Protokol
                                run: function () {
                                },
                                enabled: (that.DetailDto.banka?.parametryDopresnujici?.stah_prot ? true : false)
                            },
                            actOdstranit: {
                                caption: "Odstranit",
                                run: function () {
                                    var dataForm = {};
                                    dataForm.ikc;
                                    var dataRQ;
                                    if (Gordic.Utils.WidgetExists("ggrid", that.gridPodpisy)) {
                                        dataRQ = that.gridPodpisy.ggrid("getSelection");
                                    }
                                    var def = $.Deferred();
                                    that.actions.actOdstranit?.setPending(def.promise());
                                    var selection = that.gridPodpisy.ggrid("getSelection");
                                    that.dialogs.confirm("Komunikace s bankou", "Opravdu chcete podpis odstranit?", 550, 150).on("close", (ev, obj) => {
                                        if (obj == "yes") {
                                            that.isl.PodDavDPB.stornujPodpis({ data: { rows: dataRQ, ikc: that.Ikc, poc_pod: that.poc_pod } }).getData()
                                                .done(function (result) {
                                                that.viewPodpisy.requestData();
                                                def.resolve();
                                            }).fail((e) => {
                                                def.reject();
                                            });
                                        }
                                        else {
                                            def.reject();
                                        }
                                    });
                                },
                                enabled: false //Defaultně False - změna přichází až s načtením seznamu
                            }
                        },
                        menuBar: ["actDokoncit", "actStav", "actProtokol"],
                        //commandBar: ["actClose"],
                        statusBar: [
                            //Gordic.Eko.Detail.StatusBar.createUzo({ ixp: that.DetailDto.ixp, uzo: that.DetailDto.dokument?.uzo, readonly: that.DetailDto.ixs_fun_akt !== ($.content("main") as any).IxsFunAkt, globalSettings: this?.globalSettings }, () => that.setActiveOperationAndReloadData(true), { id: "statusBarUzo" }),
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarStav" }),
                        ],
                        kpis: {},
                        tabGroups: resultTabGroups,
                        tabs: {
                            tabObsah: {
                                tabParams: {
                                    title: "Obsah dávky s příkazy",
                                    opened: true,
                                    group: { id: "_obsah" },
                                },
                                init: function (tab) {
                                    // doplnění prvků do tabu
                                    debugger;
                                    if (!that.DetailDto.Permissions?.LzeZobrazit.value) {
                                        var formObsah = that.createEmptyPaymentForm();
                                        $.newDiv().appendTo(tab).gform("createFrom", formObsah);
                                    }
                                    else {
                                        that.viewObsah = new Gordic.Isl.View(that.isl.DavkaPDBPolozka.list(rq => { return { filters: { ixp_dav: that.DetailDto.ixp_dav } }; }));
                                        that.gridFormatObsah = that.createGridFormatObsah();
                                        that.gridPodpisy = $.newDiv("divObsahPDB").gautofit({ resizersOnTab: false }).appendTo(tab).ggrid({
                                            data: that.viewPodpisy,
                                            name: "gridObsahPDB",
                                            renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                                            columnMode: "full", // fit (defaultne by melo byt toto), full
                                            navigationMode: "row", // row, cell
                                            columns: that.gridFormatObsah,
                                            rowNumbers: true
                                        });
                                    }
                                }
                            },
                            tabPodpisy: {
                                tabParams: {
                                    title: "Podpisy",
                                    opened: true,
                                    group: { id: "_podpisy" },
                                    menuBar: [
                                        {
                                            action: "actOdstranit", favorite: true
                                        },
                                        {
                                            action: new GAction({
                                                name: "actRefreshPayment",
                                                icon: "gi-refresh",
                                                caption: "Aktualizovat",
                                                run: () => {
                                                    that.viewPodpisy.requestData();
                                                }
                                            }),
                                            favorite: true
                                        }
                                    ]
                                },
                                init: function (tab) {
                                    // doplnění prvků do tabu
                                    that.viewPodpisy = new Gordic.Isl.View(that.isl.PodDavDPB.list(rq => { return { filters: { ixp: that.DetailDto.ixp_dav } }; }), {
                                        onResponse: (data) => {
                                            if (data.servicePermissions != undefined) {
                                                that.permissionsPodpis = data.servicePermissions;
                                            }
                                            if (that.permissionsPodpis) {
                                                if ("LzeOdstranit" in that.permissionsPodpis && that.permissionsPodpis.LzeOdstranit.value == true) {
                                                    that.actions.actOdstranit?.enabled(true);
                                                }
                                                else {
                                                    that.actions.actOdstranit?.enabled(false);
                                                }
                                            }
                                            return data;
                                        }
                                    });
                                    that.gridFormatPodpisy = that.createGridFormatPodpisy();
                                    that.gridPodpisy = $.newDiv("divSigns").gautofit({ resizersOnTab: false }).appendTo(tab).ggrid({
                                        data: that.viewPodpisy,
                                        name: "gridSigns",
                                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                                        columnMode: "full", // fit (defaultne by melo byt toto), full
                                        navigationMode: "row", // row, cell
                                        columns: that.gridFormatPodpisy,
                                        rowNumbers: true
                                    });
                                }
                            },
                        }
                    }, true);
                    // nastavení kpipanelu
                    //$.extend(builder.kpiTabOptions, { title: "Souhrn" });
                    //$.extend(builder.kpiPanelOptions, { sortable: true });
                    // nastavení kpipanelu
                    $.extend(builder.kpiPanelOptions, { sortable: true });
                }
                /**
                 * vytvořit formulář prázdných příkazů k úhradě z d§vodu nedostatečného oprávnění
                 */
                createEmptyPaymentForm() {
                    const that = this;
                    let formEmptyPayment = new Gordic.Forms.Form({
                        name: "FormEmptyPaymentGrid",
                        tabLabel: "jres:32000041", //RC 32000041 : Kompletní filtr
                        layoutDescriptor: "L1M1S1, L-3-6-3, M-3-6-3, S-12-11-1, breaks-600-1100" //"L5M3S1"//, L-2-9-1, M-12-11-1, S-12-11-1, breaks-700-1000"
                    });
                    formEmptyPayment
                        .addSection("")
                        .addField("gstatic", {
                        name: "staticField",
                        customClass: "w-2",
                    })
                        .addRow()
                        .addField("gstatic", {
                        name: "static",
                        icon: "fa-ban g-state-text minifoto",
                        caption: "<i style='font-size:x-large;'>Není povoleno prohlížení příkazů!",
                        customClass: "w-12 g-state-text g-state-inactive font-size: x-large",
                    })
                        //.addField("gstaticfield", {
                        //    name: "staticStringField",
                        //    initialValue: "<i style='font-size:x-large;'> Není povoleno prohlížení příkazů! </i>",
                        //    customClass: "w-12 g-state-text g-state-inactive"
                        //})
                        .addRow()
                        .addField("gstatic", {
                        name: "gstaticEmptyRowField",
                        customClass: "w-3",
                    });
                    return formEmptyPayment;
                }
                /**
                * vytvořit formát sloupců seznamu s podpisy dávky
                */
                createGridFormatPodpisy() {
                    var columnsDefinition = new Gordic.Data.GridFormat();
                    columnsDefinition
                        .addTextColumn({
                        name: "ixb",
                        caption: "Ixb",
                    })
                        .addTextColumn({
                        name: "ixs_cer",
                        caption: "IxsCer",
                    })
                        .addTextColumn({
                        name: "jmeno",
                        caption: "Jméno",
                    })
                        .addTextColumn({
                        name: "firma",
                        caption: "Firma",
                    })
                        .addDateTimeColumn({
                        name: "dat_od",
                        caption: "Plat.od",
                    })
                        .addDateTimeColumn({
                        name: "dat_do",
                        caption: "Plat.do",
                    })
                        .addTextColumn({
                        name: "nazev_ref",
                        caption: "Podepsal  ",
                    })
                        .addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "Datum podpisu",
                    })
                        .addNumberColumn({
                        name: "pocet",
                        caption: "Počet podpisů",
                    });
                    return columnsDefinition;
                }
                /**
                * vytvořit formát sloupců seznamu s obsahem dávky
                */
                createGridFormatObsah() {
                    var columnsDefinition = new Gordic.Data.GridFormat();
                    columnsDefinition
                        .addTextColumn({
                        name: "ixp",
                        caption: "Identifikátor",
                    })
                        .addNumberColumn({
                        name: "radek_uhr",
                        caption: "Ř.úhr.",
                    })
                        .addTextColumn({
                        name: "stav",
                        caption: "Stav příkazu v bance",
                    })
                        .addTextColumn({
                        name: "vs",
                        caption: "VS",
                    })
                        .addCurrencyColumn({
                        name: "c",
                        caption: "Částka",
                    })
                        .addTextColumn({
                        name: "ks",
                        caption: "KS",
                    })
                        .addTextColumn({
                        name: "ss",
                        caption: "SS",
                    })
                        .addNumberColumn({
                        name: "sk_vl",
                        caption: "Sk. vlastní",
                    })
                        .addNumberColumn({
                        name: "bu_vl",
                        caption: "BÚ. vlastní",
                    })
                        .addNumberColumn({
                        name: "sk_ci",
                        caption: "Sk. příjem",
                    })
                        .addNumberColumn({
                        name: "bu_ci",
                        caption: "BÚ. příjem",
                    });
                    return columnsDefinition;
                }
                /**
                 * Obsluha události builderBuild
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder detailbuilder
                 */
                onDetailBuilderBuild(builder) {
                    let that = this;
                    // napojení standardní EK O hlavičky
                    const formSetup = {};
                    const headerForm = new Gordic.Forms.Form({ name: "formHeader" });
                    // úpravy standardních komponent
                    // šipky pro posun po seznamu
                    //this.listControls_setup({
                    //    rowToDto: function (gridState) {
                    //        return {
                    //            Ixp: gridState.currentRow.data.ixp,
                    //            //Sbu: gridState.currentRow.data.sbu,
                    //            //NasledujiciDetail: true,
                    //        };
                    //    },
                    //    nextItemTemplate: "Následující: {ixp}",
                    //    prevItemTemplate: "Předchozí: {ixp}",
                    //    beforeMove: that.closing
                    //});
                }
                /**
                 * Nastavení prvků ve formuláři
                 */
                enable() {
                    // status bar
                    Gordic.Eko.Detail.StatusBar.updateItem(this.statuses["statusBarStav"], this.DetailDto.s_dpb_txt, null);
                }
                /**
                 * Zadání parametrů tisku
                 *
                 * @param {IGPrintActionReportStarting} rep parametry tisku
                 */
                reportStarting(rep) {
                    // pouze PID, nic jiného se nepředává
                    rep.params.X0005 = this.Ixp;
                }
                /**
                 * Aktualizace dat v detailu podle modelu a nastavení stavu prvků
                 */
                aktualizaceDetailu() {
                    let that = this;
                    // načtení dat
                    // deferred objekt pro zřetězení akcí
                    let def = $.Deferred().resolve().promise();
                    // obsluha jednotlivých fází
                    this.beginOperation("Načítám data");
                    def.then(function () {
                        let def = $.Deferred();
                        // naplnění políček
                        let fieldsDavkaInfo = that.findForms("formDavkaPDB").findFields();
                        fieldsDavkaInfo
                            .gfield("model", "apply", that.DetailDto, { initialValues: true })
                            .gfield("model", "validators", that.validators);
                        def.resolve();
                        return def.promise();
                    })
                        .done(function () {
                        // nastavení stavu políček a akcí
                        that.enable();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                }
                /**
                 * Test, jestli je možné okno zavřít
                 *
                 * @returns {JQueryPromise<any> | boolean} promise (resolve = je možné zavřít, reject = není možné zavřít) nebo přímo boolean; boolean určuje, jestli byla nějaká aktivní operace (true) nebo ne (false)
                 */
                closing() {
                    let that = this;
                    // kontrola na změněné položky
                    let formChanged = this.findForms().gform("hasChanged");
                    return that.AktivniOperace;
                }
            };
            GDetailDavkaPDB = __decorate([
                gcontent
            ], GDetailDavkaPDB);
            WebClient.GDetailDavkaPDB = GDetailDavkaPDB;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbERhdmthUERCLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbERhdmthUERCLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0EyakJmO0FBM2pCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EyakJuQjtJQTNqQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTJqQjdCO1FBM2pCb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFLbkM7Ozs7O2VBS0c7WUFFSCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEscUJBQTBDO2dCQTBGM0U7O21CQUVHO2dCQUNJLGNBQWM7b0JBQ2pCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO29CQUMxQixpRUFBaUU7Z0JBQ3JFLENBQUM7Z0JBR0Q7Ozs7bUJBSUc7Z0JBQ0ksbUJBQW1CLENBQUMsT0FBZ0Q7b0JBQ3ZFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxlQUFlLENBQUM7b0JBRWhCLGVBQWUsR0FBRyxDQUFDOzRCQUNmLEVBQUUsRUFBRSxRQUFROzRCQUNaLE9BQU8sRUFBRSxPQUFPO3lCQUNuQjt3QkFDRDs0QkFDSSxFQUFFLEVBQUUsVUFBVTs0QkFDZCxPQUFPLEVBQUUsU0FBUzt5QkFDckIsQ0FBQyxDQUFBO29CQUlOLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsQ0FBQywrQkFBK0IsRUFBRSxDQUFDO3lCQUN2SCxVQUFVLEVBQUU7eUJBQ1osTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxF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Z0JBQ0ksT0FBTztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLDhCQUE4QjtvQkFDOUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFFdkQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUMvQixDQUFDO2FBQ0osQ0FBQTtZQTdpQlksZUFBZTtnQkFEM0IsUUFBUTtlQUNJLGVBQWUsQ0E2aUIzQjtZQTdpQlkseUJBQWUsa0JBNmlCM0IsQ0FBQTtRQUNMLENBQUMsRUEzakJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEyakI3QjtJQUFELENBQUMsRUEzakJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEyakJuQjtBQUFELENBQUMsRUEzakJTLE1BQU0sS0FBTixNQUFNLFFBMmpCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICBsZXQgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIER0b1R5cGVEYXZrYSA9IEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQkR0bztcclxuICAgIGV4cG9ydCB0eXBlIFVzZWRDb21wb25lbnRzRGF2a2EgPSBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXJDb21wb25lbnRzLkdMaXN0Q29udHJvbHNFeHRlbnNpb25zPEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQkR0bz47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHRGV0YWlsRGF2a2FQREJcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciB2YmxhYmxhXHJcbiAgICAgKiBAc2luY2UgNTI2MjAuMlxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsRGF2a2FQREIgZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQ8VXNlZENvbXBvbmVudHNEYXZrYT4gaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIElLQ1xyXG4gICAgICAgICAqIEB0eXBlIHtHb3JkaWMuR2VuZXJhbC5HSWtjfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgSWtjOiBHb3JkaWMuR2VuZXJhbC5HSWtjO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBzdGF2IHZlIHN0YXR1c2JhcnVcclxuICAgICAgICAgKiBAdHlwZSB7R09ic2VydmFibGVPYmplY3Q8TWVudVBhcmFtcz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0dXNCYXJTdGF2OiBHT2JzZXJ2YWJsZU9iamVjdDxNZW51UGFyYW1zPjtcclxuXHJcbiAgICAgICAgLy8gdmxhc3Rub3N0aSB6IEMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUElEIGRva3VtZW50dSAoRMOhdmthUERCKVxyXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBJeHA6IHN0cmluZztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZw616bmFrIGVkaXRvdsOhbsOtIGRldGFpbHVcclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEVkaXRhY2U6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnlsYSBha3Rpdm7DrSBvcGVyYWNlIG5hIGRldGFpbHU/XHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBBa3Rpdm5pT3BlcmFjZTogYm9vbGVhbjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEVE8gZGV0YWlsdSBQcmlrYXp1IGsgdWhyYWRlXHJcbiAgICAgICAgICogQHR5cGUge0dvcmRpYy5CdWMuSW50ZXJmYWNlLkdQcmlrYXpEdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBEZXRhaWxEdG86IEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQkR0bztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWYWxpZMOhdG9yeVxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3RbXX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHZhbGlkYXRvcnM6IG9iamVjdFtdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrdHXDoWxuw60gcm9rXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJvazogbnVtYmVyO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIGlzbCB2aWV3IGdyaWR1IE9ic2FoIGTDoXZreVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3T2JzYWg6IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR0RhdmthUERCRHRvPjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBpc2wgdmlldyBncmlkdSBQb2RwaXN5XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHZpZXdQb2RwaXN5OiBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdQb2REYXZEUEJEdG8+O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIGdyaWQgT2JzYWhcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZE9ic2FoOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIGdyaWQgUG9kcGlzeVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkUG9kcGlzeTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogZm9ybWF0IGdyaWR1IE9ic2FoIGTDoXZreVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkRm9ybWF0T2JzYWg6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogZm9ybWF0IGdyaWR1IFBvZHBpc3lcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZEZvcm1hdFBvZHBpc3k6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHBlcm1pc3Npb25zIHBybyBwb2RwaXN5XHJcbiAgICAgICAgICogQHR5cGUge3t9IHwgdW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcGVybWlzc2lvbnNQb2RwaXM6IHt9IHwgR29yZGljLkJ1Yy5JbnRlcmZhY2UuR1BvZERhdlBEQlNlcnZpY2VQZXJtaXNzaW9uIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBwb2NfcG9kIC0gUG/EjWV0IHBvZHBpc8WvIGTDoXZreVxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwb2NfcG9kOiBudW1iZXJcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmFkZWZpbm92w6Fuw60gZm9ybXVsw6HFmWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuYWt0dWFsaXphY2VEZXRhaWx1KCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcImZvcm1QcmlrYXpcIikuZ2Zvcm0oXCJ2aWV3TW9kZVwiLCBcInZpZXdcIik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JzbHVoYSB1ZMOhbG9zdGkgYnVpbGRlckluaXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlciBkZXRhaWxidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciByZXN1bHRUYWJHcm91cHM7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzdWx0VGFiR3JvdXBzID0gW3tcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJfb2JzYWhcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9ic2FoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiX3BvZHBpc3lcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvZHBpc3lcIiwgXHJcbiAgICAgICAgICAgICAgICB9XVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgaGVhZGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybURhdmthUERCXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDNNM1MzXCIgLypMLTQtOC0wLCBNLTQtOC0wLCBTLTEyLTEyLTAqLyB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIklkZW50aWZpa8OhdG9yXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcuaXhzKGZhbHNlKSwvKiBHb3JkaWMuUHJlZmFicy5BY3Rpb25zLlVsb3ppdERvQ2xpcGJvYXJkdSh0aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcIml4cF9kYXZcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikpLCovIHsgbmFtZTogXCJpeHBfZGF2XCIsIC8qbW9kZWw6IFwibW9kZWwuaXhwID0gdmFsdWUuaXhwXCIsKi8gZGlzYWJsZWQ6IHRydWUsIC8qY3VzdG9tQ2xhc3M6IFwiZm9udC13ZWlnaHQ6IGJvbGRcIiovIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJCYW5rYVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImJhbmthXCIsIC8qbW9kZWw6IFwibW9kZWwuYWMgPSB2YWx1ZS5hY1wiLCovIGRpc2FibGVkOiB0cnVlLCAvKmN1c3RvbUNsYXNzOiBcImZvbnQtd2VpZ2h0OiBib2xkXCIqLyB9KS5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJCYW5rYVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInNrX3ZsXCIsIC8qbW9kZWw6IFwibW9kZWwuYWMgPSB2YWx1ZS5hY1wiLCovIGRpc2FibGVkOiB0cnVlLCAvKmN1c3RvbUNsYXNzOiBcImZvbnQtd2VpZ2h0OiBib2xkXCIqLyB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIHZ6bmlrdVwiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfdnpuXCIsIC8qbW9kZWw6IFwibW9kZWwuYWMgPSB2YWx1ZS5hY1wiLCovIGRpc2FibGVkOiB0cnVlLCAvKmN1c3RvbUNsYXNzOiBcImZvbnQtd2VpZ2h0OiBib2xkXCIqLyB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvxI1ldCBwb2RwaXPFr1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInBvY19wb2RcIiwgLyptb2RlbDogXCJtb2RlbC5hYyA9IHZhbHVlLmFjXCIsKi8gZGlzYWJsZWQ6IHRydWUsIC8qY3VzdG9tQ2xhc3M6IFwiZm9udC13ZWlnaHQ6IGJvbGRcIiovIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG/EjWV0IHBvZHBpc8WvIHBvxb5hZG92YW7DvWNoXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG9jX3BvZFwiLCAvKm1vZGVsOiBcIm1vZGVsLmFjID0gdmFsdWUuYWNcIiwqLyBkaXNhYmxlZDogdHJ1ZSwgLypjdXN0b21DbGFzczogXCJmb250LXdlaWdodDogYm9sZFwiKi8gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCLEjMOtc2xvIGTDoXZreVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImNpc2xvX2Rhdmt5XCIsIC8qbW9kZWw6IFwibW9kZWwuYWMgPSB2YWx1ZS5hY1wiLCovIGRpc2FibGVkOiB0cnVlLCAvKmN1c3RvbUNsYXNzOiBcImZvbnQtd2VpZ2h0OiBib2xkXCIqLyB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgZMOhdmt5XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwic19kcGJfdHh0XCIsIC8qbW9kZWw6IFwibW9kZWwuYWMgPSB2YWx1ZS5hY1wiLCovIGRpc2FibGVkOiB0cnVlLCAvKmN1c3RvbUNsYXNzOiBcImZvbnQtd2VpZ2h0OiBib2xkXCIqLyB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvxI1ldCBwxZnDrWthesWvXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG9jX3ByaVwiLCAvKm1vZGVsOiBcIm1vZGVsLmFjID0gdmFsdWUuYWNcIiwqLyBkaXNhYmxlZDogdHJ1ZSwgLypjdXN0b21DbGFzczogXCJmb250LXdlaWdodDogYm9sZFwiKi8gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBwb2RwaXN1XCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF9wcG9cIiwgLyptb2RlbDogXCJtb2RlbC5hYyA9IHZhbHVlLmFjXCIsKi8gZGlzYWJsZWQ6IHRydWUsIC8qY3VzdG9tQ2xhc3M6IFwiZm9udC13ZWlnaHQ6IGJvbGRcIiovIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG/EjWV0IHBvZHBpc8WvIHVsb8W+ZW7DvWNoXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG9jX3BvZF91bG9cIiwgLyptb2RlbDogXCJtb2RlbC5hYyA9IHZhbHVlLmFjXCIsKi8gZGlzYWJsZWQ6IHRydWUsIC8qY3VzdG9tQ2xhc3M6IFwiZm9udC13ZWlnaHQ6IGJvbGRcIiovIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVmxhc3Ruw61rXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwidmxhc3RuaWtcIiwgLyptb2RlbDogXCJtb2RlbC5hYyA9IHZhbHVlLmFjXCIsKi8gZGlzYWJsZWQ6IHRydWUsIC8qY3VzdG9tQ2xhc3M6IFwiZm9udC13ZWlnaHQ6IGJvbGRcIiovIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiT3puYcSNZW7DrSBkw6F2a3lcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJzb3Vib3JcIiwgLyptb2RlbDogXCJtb2RlbC5hYyA9IHZhbHVlLmFjXCIsKi8gZGlzYWJsZWQ6IHRydWUsIC8qY3VzdG9tQ2xhc3M6IFwiZm9udC13ZWlnaHQ6IGJvbGRcIiovIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwixIzDoXN0a2FcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJjYXN0a2FcIiwgLyptb2RlbDogXCJtb2RlbC5hYyA9IHZhbHVlLmFjXCIsKi8gZGlzYWJsZWQ6IHRydWUsIC8qY3VzdG9tQ2xhc3M6IFwiZm9udC13ZWlnaHQ6IGJvbGRcIiovIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gb2Rlc2zDoW7DrVwiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfb2RlXCIsIC8qbW9kZWw6IFwibW9kZWwuYWMgPSB2YWx1ZS5hY1wiLCovIGRpc2FibGVkOiB0cnVlLCAvKmN1c3RvbUNsYXNzOiBcImZvbnQtd2VpZ2h0OiBib2xkXCIqLyB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgdHJhbnNha2NlXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwic3Rhdl90cmFcIiwgLyptb2RlbDogXCJtb2RlbC5hYyA9IHZhbHVlLmFjXCIsKi8gZGlzYWJsZWQ6IHRydWUsIC8qY3VzdG9tQ2xhc3M6IFwiZm9udC13ZWlnaHQ6IGJvbGRcIiovIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gcHJ2a3kgcHJvIHN0YXR1c2JhclxyXG4gICAgICAgICAgICB0aGlzLnN0YXR1c0JhclN0YXYgPSBHb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIuY3JlYXRlSXRlbSgpOyAvL25ldyBHT2JzZXJ2YWJsZU9iamVjdDxNZW51UGFyYW1zPih7IHR5cGU6IFwic3RhdGljXCIsIGNhcHRpb246IFwiXCIsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtdGV4dFwiIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gw7pwcmF2YSBib8SNbsOtaG8gcGFuZWx1XHJcbiAgICAgICAgICAgIGJ1aWxkZXIubW92ZURlZmluaXRpb25BZnRlcihcInBhbmVsSW5mb3JtYWNlXCIsIFwicGFuZWxOYXZpZ2F0b3JcIiwgR0RiZC5EZWZpbml0aW9uS2luZC5TaWRlUGFuZWwpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIGFrY8OtLCB0YWLFrywga3BpLCBtZW51IGFwb2QuXHJcbiAgICAgICAgICAgIGJ1aWxkZXIud2l0aENvbXBvbmVudDx0aGlzPihcIkdEZXRhaWxQcmlrYXpcIiwge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyRm9ybTogaGVhZGVyRm9ybSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBhY3REb2tvbmNpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMxNDAwNzZcIiwgIC8vUkMgMzMxNDAwNzYgOiBEb2tvbsSNaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0U3Rhdjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMxNDAwNzdcIiwgICAvL1JDIDMzMTQwMDc3IDogU3RhdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFByb3Rva29sOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzE0MDA5NFwiLCAgLy9SQyAzMzE0MDA5NCA6IFByb3Rva29sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogKHRoYXQuRGV0YWlsRHRvLmJhbmthPy5wYXJhbWV0cnlEb3ByZXNudWppY2k/LnN0YWhfcHJvdCA/IHRydWUgOiBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE9kc3RyYW5pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9kc3RyYW5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhRm9ybTogR29yZGljLkJ1Yy5JbnRlcmZhY2UuR1BvZERhdlBEQlByaXByYXZEYXRhT3BlcmF0aW9uRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhRm9ybS5pa2NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhUlFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHb3JkaWMuVXRpbHMuV2lkZ2V0RXhpc3RzKFwiZ2dyaWRcIiwgdGhhdC5ncmlkUG9kcGlzeSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUlEgPSB0aGF0LmdyaWRQb2RwaXN5LmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE9kc3RyYW5pdD8uc2V0UGVuZGluZyhkZWYucHJvbWlzZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWRQb2RwaXN5LmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcIktvbXVuaWthY2UgcyBiYW5rb3VcIiwgXCJPcHJhdmR1IGNoY2V0ZSBwb2RwaXMgb2RzdHJhbml0P1wiLCA1NTAsIDE1MCkub24oXCJjbG9zZVwiLCAoZXYsIG9iajogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iaiA9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlBvZERhdkRQQi5zdG9ybnVqUG9kcGlzKHsgZGF0YTogeyByb3dzOiBkYXRhUlEsIGlrYzogdGhhdC5Ja2MsIHBvY19wb2Q6IHRoYXQucG9jX3BvZCB9IH0pLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld1BvZHBpc3kucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UgLy9EZWZhdWx0bsSbIEZhbHNlIC0gem3Em25hIHDFmWljaMOhesOtIGHFviBzIG5hxI10ZW7DrW0gc2V6bmFtdVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtZW51QmFyOiBbXCJhY3REb2tvbmNpdFwiLCBcImFjdFN0YXZcIiwgXCJhY3RQcm90b2tvbFwiXSxcclxuICAgICAgICAgICAgICAgIC8vY29tbWFuZEJhcjogW1wiYWN0Q2xvc2VcIl0sXHJcbiAgICAgICAgICAgICAgICBzdGF0dXNCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICAvL0dvcmRpYy5Fa28uRGV0YWlsLlN0YXR1c0Jhci5jcmVhdGVVem8oeyBpeHA6IHRoYXQuRGV0YWlsRHRvLml4cCwgdXpvOiB0aGF0LkRldGFpbER0by5kb2t1bWVudD8udXpvLCByZWFkb25seTogdGhhdC5EZXRhaWxEdG8uaXhzX2Z1bl9ha3QgIT09ICgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkuSXhzRnVuQWt0LCBnbG9iYWxTZXR0aW5nczogdGhpcz8uZ2xvYmFsU2V0dGluZ3MgfSwgKCkgPT4gdGhhdC5zZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKHRydWUpLCB7IGlkOiBcInN0YXR1c0JhclV6b1wiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uRGV0YWlsLlN0YXR1c0Jhci5jcmVhdGVJdGVtKHsgaWQ6IFwic3RhdHVzQmFyU3RhdlwiIH0pLFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGtwaXM6IHtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0YWJHcm91cHM6IHJlc3VsdFRhYkdyb3VwcyxcclxuXHJcbiAgICAgICAgICAgICAgICB0YWJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiT2JzYWg6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJPYnNhaCBkw6F2a3kgcyBwxZnDrWthenlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcIl9vYnNhaFwiIH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb3BsbsSbbsOtIHBydmvFryBkbyB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LkRldGFpbER0by5QZXJtaXNzaW9ucz8uTHplWm9icmF6aXQudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybU9ic2FoID0gdGhhdC5jcmVhdGVFbXB0eVBheW1lbnRGb3JtKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRhYikuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1PYnNhaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdPYnNhaCA9IG5ldyBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR0RhdmthUERCRHRvPih0aGF0LmlzbC5EYXZrYVBEQlBvbG96a2EubGlzdChycSA9PiB7IHJldHVybiB7IGZpbHRlcnM6IHsgaXhwX2RhdjogdGhhdC5EZXRhaWxEdG8uaXhwX2RhdiB9IH0gfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkRm9ybWF0T2JzYWggPSB0aGF0LmNyZWF0ZUdyaWRGb3JtYXRPYnNhaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZFBvZHBpc3kgPSAkLm5ld0RpdihcImRpdk9ic2FoUERCXCIpLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSkuYXBwZW5kVG8odGFiKS5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudmlld1BvZHBpc3ksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZE9ic2FoUERCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gYXV0bywgYWxsLWF0LW9uY2UsIHBhZ2VkLXN5bmMsIHBhZ2VkLWFzeW5jXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gZml0IChkZWZhdWx0bmUgYnkgbWVsbyBieXQgdG90byksIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsXHRcdFx0XHRcdFx0XHRcdFx0Ly8gcm93LCBjZWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoYXQuZ3JpZEZvcm1hdE9ic2FoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYlBvZHBpc3k6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJQb2RwaXN5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogeyBpZDogXCJfcG9kcGlzeVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFwiYWN0T2RzdHJhbml0XCIsIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdG5hbWU6IFwiYWN0UmVmcmVzaFBheW1lbnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHRpY29uOiBcImdpLXJlZnJlc2hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHRjYXB0aW9uOiBcIkFrdHVhbGl6b3ZhdFwiLFx0XHRcdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdFx0dGhhdC52aWV3UG9kcGlzeS5yZXF1ZXN0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvcGxuxJtuw60gcHJ2a8WvIGRvIHRhYnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld1BvZHBpc3kgPSBuZXcgR29yZGljLklzbC5WaWV3PEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdQb2REYXZEUEJEdG8+KHRoYXQuaXNsLlBvZERhdkRQQi5saXN0KHJxID0+IHsgcmV0dXJuIHsgZmlsdGVyczogeyBpeHA6IHRoYXQuRGV0YWlsRHRvLml4cF9kYXYgfSB9IH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25SZXNwb25zZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc2VydmljZVBlcm1pc3Npb25zICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wZXJtaXNzaW9uc1BvZHBpcyA9IGRhdGEuc2VydmljZVBlcm1pc3Npb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucGVybWlzc2lvbnNQb2RwaXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcIkx6ZU9kc3RyYW5pdFwiIGluIHRoYXQucGVybWlzc2lvbnNQb2RwaXMgJiYgdGhhdC5wZXJtaXNzaW9uc1BvZHBpcy5MemVPZHN0cmFuaXQudmFsdWUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPZHN0cmFuaXQ/LmVuYWJsZWQodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPZHN0cmFuaXQ/LmVuYWJsZWQoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRGb3JtYXRQb2RwaXN5ID0gdGhhdC5jcmVhdGVHcmlkRm9ybWF0UG9kcGlzeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkUG9kcGlzeSA9ICQubmV3RGl2KFwiZGl2U2lnbnNcIikuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KS5hcHBlbmRUbyh0YWIpLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnZpZXdQb2RwaXN5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFNpZ25zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGZpdCAoZGVmYXVsdG5lIGJ5IG1lbG8gYnl0IHRvdG8pLCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsXHRcdFx0XHRcdFx0XHRcdFx0Ly8gcm93LCBjZWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5ncmlkRm9ybWF0UG9kcGlzeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGtwaXBhbmVsdVxyXG4gICAgICAgICAgICAvLyQuZXh0ZW5kKGJ1aWxkZXIua3BpVGFiT3B0aW9ucywgeyB0aXRsZTogXCJTb3Vocm5cIiB9KTtcclxuICAgICAgICAgICAgLy8kLmV4dGVuZChidWlsZGVyLmtwaVBhbmVsT3B0aW9ucywgeyBzb3J0YWJsZTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuw60ga3BpcGFuZWx1XHJcbiAgICAgICAgICAgICQuZXh0ZW5kKGJ1aWxkZXIua3BpUGFuZWxPcHRpb25zLCB7IHNvcnRhYmxlOiB0cnVlIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdnl0dm/FmWl0IGZvcm11bMOhxZkgcHLDoXpkbsO9Y2ggcMWZw61rYXrFryBrIMO6aHJhZMSbIHogZMKndm9kdSBuZWRvc3RhdGXEjW7DqWhvIG9wcsOhdm7Em27DrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRW1wdHlQYXltZW50Rm9ybSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgZm9ybUVtcHR5UGF5bWVudCA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkZvcm1FbXB0eVBheW1lbnRHcmlkXCIsXHJcbiAgICAgICAgICAgICAgICB0YWJMYWJlbDogXCJqcmVzOjMyMDAwMDQxXCIsIC8vUkMgMzIwMDAwNDEgOiBLb21wbGV0bsOtIGZpbHRyXHJcbiAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0zLTYtMywgTS0zLTYtMywgUy0xMi0xMS0xLCBicmVha3MtNjAwLTExMDBcIiAvL1wiTDVNM1MxXCIvLywgTC0yLTktMSwgTS0xMi0xMS0xLCBTLTEyLTExLTEsIGJyZWFrcy03MDAtMTAwMFwiXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZvcm1FbXB0eVBheW1lbnRcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RhdGljXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXRpY0ZpZWxkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidy0yXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RhdGljXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXRpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtYmFuIGctc3RhdGUtdGV4dCBtaW5pZm90b1wiLFx0XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjpcIjxpIHN0eWxlPSdmb250LXNpemU6eC1sYXJnZTsnPk5lbsOtIHBvdm9sZW5vIHByb2hsw63FvmVuw60gcMWZw61rYXrFryFcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ3LTEyIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluYWN0aXZlIGZvbnQtc2l6ZTogeC1sYXJnZVwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3N0YXRpY2ZpZWxkXCIsIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwic3RhdGljU3RyaW5nRmllbGRcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGluaXRpYWxWYWx1ZTogXCI8aSBzdHlsZT0nZm9udC1zaXplOngtbGFyZ2U7Jz4gTmVuw60gcG92b2xlbm8gcHJvaGzDrcW+ZW7DrSBwxZnDrWthesWvISA8L2k+XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjdXN0b21DbGFzczogXCJ3LTEyIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluYWN0aXZlXCJcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0YXRpY1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJnc3RhdGljRW1wdHlSb3dGaWVsZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInctM1wiLFxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybUVtcHR5UGF5bWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogdnl0dm/FmWl0IGZvcm3DoXQgc2xvdXBjxa8gc2V6bmFtdSBzIHBvZHBpc3kgZMOhdmt5XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXRQb2RwaXN5KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbHVtbnNEZWZpbml0aW9uID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbHVtbnNEZWZpbml0aW9uXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJJeGJcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfY2VyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJJeHNDZXJcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJqbWVub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiSm3DqW5vXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlybWFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkZpcm1hXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUGxhdC5vZFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBsYXQuZG9cIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldl9yZWZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvZGVwc2FsICBcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEYXR1bSBwb2RwaXN1XCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb2NldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG/EjWV0IHBvZHBpc8WvXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gY29sdW1uc0RlZmluaXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIHZ5dHZvxZlpdCBmb3Jtw6F0IHNsb3VwY8WvIHNlem5hbXUgcyBvYnNhaGVtIGTDoXZreVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0T2JzYWgoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sdW1uc0RlZmluaXRpb24gPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpO1xyXG5cclxuICAgICAgICAgICAgY29sdW1uc0RlZmluaXRpb25cclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIklkZW50aWZpa8OhdG9yXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla191aHJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIsWYLsO6aHIuXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3RhdiBwxZnDrWthenUgdiBiYW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWU1wiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCLEjMOhc3RrYVwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLU1wiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTU1wiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2tfdmxcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNrLiB2bGFzdG7DrVwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYnVfdmxcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkLDmi4gdmxhc3Ruw61cIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNrX2NpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTay4gcMWZw61qZW1cIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJ1X2NpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJCw5ouIHDFmcOtamVtXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gY29sdW1uc0RlZmluaXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9ic2x1aGEgdWTDoWxvc3RpIGJ1aWxkZXJCdWlsZFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyIGRldGFpbGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25EZXRhaWxCdWlsZGVyQnVpbGQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG5hcG9qZW7DrSBzdGFuZGFyZG7DrSBFSyBPIGhsYXZpxI1reVxyXG4gICAgICAgICAgICBjb25zdCBmb3JtU2V0dXAgPSB7fTtcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybUhlYWRlclwiIH0pXHJcblxyXG4gICAgICAgICAgICAvLyDDunByYXZ5IHN0YW5kYXJkbsOtY2gga29tcG9uZW50XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIMWhaXBreSBwcm8gcG9zdW4gcG8gc2V6bmFtdVxyXG4gICAgICAgICAgICAvL3RoaXMubGlzdENvbnRyb2xzX3NldHVwKHtcclxuICAgICAgICAgICAgLy8gICAgcm93VG9EdG86IGZ1bmN0aW9uIChncmlkU3RhdGUpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgSXhwOiBncmlkU3RhdGUuY3VycmVudFJvdy5kYXRhLml4cCxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL1NidTogZ3JpZFN0YXRlLmN1cnJlbnRSb3cuZGF0YS5zYnUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9OYXNsZWR1amljaURldGFpbDogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgIG5leHRJdGVtVGVtcGxhdGU6IFwiTsOhc2xlZHVqw61jw606IHtpeHB9XCIsXHJcbiAgICAgICAgICAgIC8vICAgIHByZXZJdGVtVGVtcGxhdGU6IFwiUMWZZWRjaG96w606IHtpeHB9XCIsXHJcbiAgICAgICAgICAgIC8vICAgIGJlZm9yZU1vdmU6IHRoYXQuY2xvc2luZ1xyXG4gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW7DrSBwcnZrxa8gdmUgZm9ybXVsw6HFmWlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy8gc3RhdHVzIGJhclxyXG4gICAgICAgICAgICBFa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXNlcyFbXCJzdGF0dXNCYXJTdGF2XCJdISxcclxuICAgICAgICAgICAgICAgIHRoaXMuRGV0YWlsRHRvLnNfZHBiX3R4dCEsXHJcbiAgICAgICAgICAgICAgICBudWxsKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmFkw6Fuw60gcGFyYW1ldHLFryB0aXNrdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7SUdQcmludEFjdGlvblJlcG9ydFN0YXJ0aW5nfSByZXAgcGFyYW1ldHJ5IHRpc2t1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHJlcG9ydFN0YXJ0aW5nKHJlcDogSUdQcmludEFjdGlvblJlcG9ydFN0YXJ0aW5nKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBwb3V6ZSBQSUQsIG5pYyBqaW7DqWhvIHNlIG5lcMWZZWTDoXbDoVxyXG4gICAgICAgICAgICByZXAucGFyYW1zLlgwMDA1ID0gdGhpcy5JeHA7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrdHVhbGl6YWNlIGRhdCB2IGRldGFpbHUgcG9kbGUgbW9kZWx1IGEgbmFzdGF2ZW7DrSBzdGF2dSBwcnZrxa9cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGFrdHVhbGl6YWNlRGV0YWlsdSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gbmHEjXRlbsOtIGRhdFxyXG4gICAgICAgICAgICAvLyBkZWZlcnJlZCBvYmpla3QgcHJvIHrFmWV0xJt6ZW7DrSBha2PDrVxyXG4gICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIC8vIG9ic2x1aGEgamVkbm90bGl2w71jaCBmw6F6w61cclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbihcIk5hxI3DrXTDoW0gZGF0YVwiKTtcclxuICAgICAgICAgICAgZGVmLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgIC8vIG5hcGxuxJtuw60gcG9sw63EjWVrXHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRzRGF2a2FJbmZvID0gdGhhdC5maW5kRm9ybXMoXCJmb3JtRGF2a2FQREJcIikuZmluZEZpZWxkcygpO1xyXG4gICAgICAgICAgICAgICAgZmllbGRzRGF2a2FJbmZvXHJcbiAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5EZXRhaWxEdG8sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhhdC52YWxpZGF0b3JzKTtcclxuICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIHN0YXZ1IHBvbMOtxI1layBhIGFrY8OtXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdCwgamVzdGxpIGplIG1vxb5uw6kgb2tubyB6YXbFmcOtdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPGFueT4gfCBib29sZWFufSBwcm9taXNlIChyZXNvbHZlID0gamUgbW/Fvm7DqSB6YXbFmcOtdCwgcmVqZWN0ID0gbmVuw60gbW/Fvm7DqSB6YXbFmcOtdCkgbmVibyBwxZnDrW1vIGJvb2xlYW47IGJvb2xlYW4gdXLEjXVqZSwgamVzdGxpIGJ5bGEgbsSbamFrw6EgYWt0aXZuw60gb3BlcmFjZSAodHJ1ZSkgbmVibyBuZSAoZmFsc2UpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHwgYm9vbGVhbiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBrb250cm9sYSBuYSB6bcSbbsSbbsOpIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgIGxldCBmb3JtQ2hhbmdlZCA9IHRoaXMuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuQWt0aXZuaU9wZXJhY2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
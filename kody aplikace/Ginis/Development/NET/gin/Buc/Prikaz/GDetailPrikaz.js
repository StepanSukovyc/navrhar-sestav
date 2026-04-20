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
             * Detail příkazu k úhradě
             *
             * @author Vojtěch Blabla
             * @since 486.0.0.
             */
            let GDetailPrikaz = class GDetailPrikaz extends Gordic.GDetailBuilderContent {
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
                    if (that.IISP == 0) {
                        resultTabGroups = [{
                                id: "_zakladniUdaje",
                                caption: "jres:33140005" //RC 33140005 : Základní údaje
                            },
                            {
                                id: "_udajeKZahranicniPlatbe",
                                caption: "jres:33140006", //RC 33140006 : Údaje k zahraniční platbě
                                visible: (that.DetailDto.upl && that.DetailDto.upl > 0 ? true : false) //( viditelnost upl > 0 )
                            }];
                    }
                    else {
                        resultTabGroups = [{
                                id: "_zakladniUdaje",
                                caption: "jres:33140005" //RC 33140005 : Základní údaje
                            },
                            {
                                id: "_udajeKZahranicniPlatbe",
                                caption: "jres:33140006", //RC 33140006 : Údaje k zahraniční platbě
                                visible: (that.DetailDto.upl && that.DetailDto.upl > 0 ? true : false) //( viditelnost upl > 0 )
                            },
                            {
                                id: "_rezervaceIISP",
                                caption: "jres:33140007", //RC 33140007 : Rezervace v IISP
                                //visible: (that.DetailDto.priz_sr && that.DetailDto.priz_sr > 0 ? true : false) //( viditelnost priz_sr > 0 )
                            }];
                    }
                    var headerForm = new Gordic.Forms.Form({ name: "formPrikaz", layoutDescriptor: "L3M3S1, L-4-8-0, M-4-8-0, S-12-12-0" })
                        .addSection("")
                        .addPrefab(Gordic.Eko.Detail.Field.fieldPID({ isPid: true, fieldOpt: { name: 'ixp', model: 'ixp', disabled: true } }, { name: 'ixp' }))
                        .addPrefab(Gordic.Eko.Detail.Field.fieldAgendoveCislo({ name: "ac", model: "ac", disabled: true }, { name: "ac" }))
                        .addSection("")
                        .addRow("Typ dokladu").addField("gselectbox", Gordic.Prefabs.Select.ginckat(), { name: "ktg_typ", model: "ktg_typ=ktg_typ;ktg_typ_txt=ktg_typ_txt", disabled: true })
                        .addRow("Zpracovatel").addField("gselectbox", Gordic.Prefabs.Select.ginszmp(), { name: "ixs_zmp_prik", model: "model.ixs_zmp_prik=value.ixs_zmp", disabled: true })
                        .addSection("")
                        .addRow("Datum schválení").addField("gdatebox", { name: "dat_sch", disabled: true })
                        .addRow("UUS").addField("gstringbox", { name: "uus", disabled: true });
                    // prvky pro statusbar
                    this.statusBarStav = Gordic.Eko.Detail.StatusBar.createItem(); //new GObservableObject<MenuParams>({ type: "static", caption: "", customClass: "g-state-text" });
                    // úprava bočního panelu
                    builder.moveDefinitionAfter("panelInformace", "panelNavigator", GDbd.DefinitionKind.SidePanel);
                    // definice akcí, tabů, kpi, menu apod.
                    builder.withComponent("GDetailPrikaz", {
                        headerForm: headerForm,
                        actions: {
                            actClose: {
                                caption: "Zavřít",
                                run: function () {
                                    that.tryClose();
                                }
                            },
                        },
                        menuBar: [],
                        commandBar: ["actClose"],
                        statusBar: [
                            //Gordic.Eko.Detail.StatusBar.createUzo({ ixp: that.DetailDto.ixp, uzo: that.DetailDto.dokument?.uzo, readonly: that.DetailDto.ixs_fun_akt !== ($.content("main") as any).IxsFunAkt, globalSettings: this?.globalSettings }, () => that.setActiveOperationAndReloadData(true), { id: "statusBarUzo" }),
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarStav" }),
                        ],
                        kpis: {},
                        tabGroups: resultTabGroups,
                        tabs: {
                            tabZakladniUdaje: {
                                tabParams: {
                                    title: "Informace o platbě", opened: true, group: { id: "_zakladniUdaje" }, //RC 33110596 : Obsah balíku licencí
                                },
                                init: function (tab) {
                                    // doplnění prvků do tabu
                                    let form = new Gordic.Forms.Form({ name: "formPrikaz", layoutDescriptor: "L2M2S1, L-4-8-0, M-4-8-0, S-12-12-0" })
                                        .addSection("Bankovní údaje")
                                        .addRow("Bankovní účet vlastní").addField("gselectbox", { disabled: true, name: "ucet_vl", model: "model.bu_vl=value.bu_vl;model.sk_vl=value.sk_vl", itemTemplate: "{bu_vl}/{sk_vl}", showSelectButton: false })
                                        .addRow("Bankovní účet cizí").addField("gselectbox", { disabled: true, name: "ucet_ci", model: "model.bu_ci=value.bu_ci;model.sk_ci=value.sk_ci", itemTemplate: "{bu_ci}/{sk_ci}", showSelectButton: false })
                                        .addRow("VS, KS, SS").addField("gstringbox", "w-4", { disabled: true, name: "vs" })
                                        .addField("gstringbox", "w-4", { disabled: true, name: "ks" })
                                        .addField("gstringbox", "w-4", { disabled: true, name: "ss" })
                                        .addSection("Částka")
                                        .addRow("Částka v měně").addField("gnumberbox", "w-8", { disabled: true, name: "c_mena", decimalSeparator: ",", thousandsSeparator: " ", decimals: 2 })
                                        .addField("gstringbox", "w-4", { disabled: true, name: "mena_txt" })
                                        .addRow("Částka v CZK").addField("gnumberbox", { disabled: true, name: "c", decimalSeparator: ",", thousandsSeparator: " ", decimals: 2 })
                                        .addSection("Data")
                                        .addRow("Splatnost").addField("gdatebox", { disabled: true, name: "dat_spl" })
                                        .addRow("Splatnost v agendě").addField("gdatebox", { disabled: true, name: "dat_spl_ag" })
                                        .addSection("Externí subjekt")
                                        .addRow("Subjekt").addField("gstringbox", { disabled: true, name: "nazev" })
                                        .addRow("IČO, DIČ").addField("gstringbox", "w-6", { disabled: true, name: "ico_esu" }).addField("gstringbox", "w-6", { disabled: true, name: "dic" })
                                        .addSection("Hrazení")
                                        .addRow("Způsob úhrady").addField("gselectbox", Gordic.Prefabs.Select.ekocizp(), { disabled: true, name: "zp", model: "zp=zp;zp_zkr=zp_zkr;zp_txt=zp_txt" })
                                        .addSection("Primární agenda")
                                        .addRow("Agenda").addField("gstringbox", { disabled: true, name: "zkr_ag" })
                                        //.addRow("Klíčová slova - test").addField("gkeywordsbar", { name: "KlicSlovaField", ixp: /*""*/ /*"DEMOX003XCRQ",*/ that.Ixp, saveData: "apply", tooltip: "Klíčová slova"  }) //DEMOX003XCRQ
                                        .addSection("Popis")
                                        .addRow("Zpráva pro příjemce").addField("gstringbox", { disabled: true, name: "popis" })
                                        .addSection("");
                                    tab.gform("createFrom", form);
                                }
                            },
                            tabUdajeKZahranicniPlatbe: {
                                group: { id: "_udajeKZahranicniPlatbe" },
                                contentParams: GContent.createInitializer("Gordic.Buc.WebClient.GDetailPrikazZP", { Ixp: that.Ixp, DetailDto: that.DetailDto }),
                                init: function (tab) {
                                }
                            },
                            tabRezervaceIISP: {
                                tabParams: {
                                    title: "<b>Rezervace v IISP</b>", opened: true, group: { id: "_rezervaceIISP" },
                                    menuBar: []
                                },
                                init: function (tab) {
                                    //content pro rezervaci IISP
                                    //that.viewIISP = new Gordic.Isl.View(that.isl.Prikaz.list(rq => { return { filters: { ixp: that.DetailDto.ixp } } }));
                                    if (that.DetailDto.rsp != null) {
                                        that.viewIISP = new Gordic.Data.View(that.DetailDto.rsp);
                                    }
                                    else {
                                        that.viewIISP = new Gordic.Data.View();
                                    }
                                    that.gridFormatIISP = that.createGridFormatIISP();
                                    that.gridIISP = $("<div>").gautofit({ resizersOnTab: false }).appendTo(tab).ggrid({
                                        data: that.viewIISP,
                                        name: "gridIISP",
                                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                                        columnMode: "full", // fit (defaultne by melo byt toto), full
                                        navigationMode: "row", // row, cell
                                        columns: that.gridFormatIISP,
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
                * vytvořit formát sloupců seznamu Rezervace v IISP
                */
                createGridFormatIISP() {
                    var columnsDefinition = new Gordic.Data.GridFormat();
                    columnsDefinition
                        .addTextColumn({
                        name: "id_hdr_ris",
                        caption: "ID RIS",
                        width: 130,
                    })
                        .addNumberColumn({
                        name: "radek_hdr",
                        caption: "Ř. RIS",
                        width: 120,
                    })
                        .addCurrencyColumn({
                        name: "c_rez",
                        caption: "Částka v Kč",
                        width: 250,
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
                    // napojení standardní EKO hlavičky
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
                    Gordic.Eko.Detail.StatusBar.updateItem(this.statuses["statusBarStav"], this.DetailDto.s_uhrp_txt, null);
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
                        let fieldsObecneUdaje = that.findForms("formPrikaz").findFields();
                        fieldsObecneUdaje
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
            GDetailPrikaz = __decorate([
                gcontent
            ], GDetailPrikaz);
            WebClient.GDetailPrikaz = GDetailPrikaz;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFByaWthei5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEZXRhaWxQcmlrYXoudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQTBYZjtBQTFYRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EwWG5CO0lBMVhnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EwWDdCO1FBMVhvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUtuQzs7Ozs7ZUFLRztZQUVILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLHFCQUF1QztnQkE4RHRFOzttQkFFRztnQkFDSSxjQUFjO29CQUNqQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztvQkFDMUIsaUVBQWlFO2dCQUNyRSxDQUFDO2dCQUdEOzs7O21CQUlHO2dCQUNJLG1CQUFtQixDQUFDLE9BQWdEO29CQUN2RSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksZUFBZSxDQUFDO29CQUVwQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQ2pCLGVBQWUsR0FBRyxDQUFDO2dDQUNmLEVBQUUsRUFBRSxnQkFBZ0I7Z0NBQ3BCLE9BQU8sRUFBRSxlQUFlLENBQUMsOEJBQThCOzZCQUMxRDs0QkFDRDtnQ0FDSSxFQUFFLEVBQUUseUJBQXlCO2dDQUM3QixPQUFPLEVBQUUsZUFBZSxFQUFFLHlDQUF5QztnQ0FDbkUsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLHlCQUF5Qjs2QkFDbkcsQ0FBQyxDQUFBO29CQUNOLENBQUM7eUJBQ0ksQ0FBQzt3QkFDRixl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V1ksYUFBYTtnQkFEekIsUUFBUTtlQUNJLGFBQWEsQ0E0V3pCO1lBNVdZLHVCQUFhLGdCQTRXekIsQ0FBQTtRQUNMLENBQUMsRUExWG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTBYN0I7SUFBRCxDQUFDLEVBMVhnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEwWG5CO0FBQUQsQ0FBQyxFQTFYUyxNQUFNLEtBQU4sTUFBTSxRQTBYZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICBsZXQgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIER0b1R5cGVaTCA9IEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdQcmlrYXpEdG87XHJcbiAgICBleHBvcnQgdHlwZSBVc2VkQ29tcG9uZW50c1pMID0gR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5HTGlzdENvbnRyb2xzRXh0ZW5zaW9uczxHb3JkaWMuQnVjLkludGVyZmFjZS5HUHJpa2F6RHRvPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFpbCBwxZnDrWthenUgayDDumhyYWTEm1xyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIFZvanTEm2NoIEJsYWJsYVxyXG4gICAgICogQHNpbmNlIDQ4Ni4wLjAuXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxQcmlrYXogZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQ8VXNlZENvbXBvbmVudHNaTD4gaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBzdGF2IHZlIHN0YXR1c2JhcnVcclxuICAgICAgICAgKiBAdHlwZSB7R09ic2VydmFibGVPYmplY3Q8TWVudVBhcmFtcz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0dXNCYXJTdGF2OiBHT2JzZXJ2YWJsZU9iamVjdDxNZW51UGFyYW1zPjtcclxuXHJcbiAgICAgICAgLy8gdmxhc3Rub3N0aSB6IEMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUElEIGRva3VtZW50dSAocMWZw61rYXp1IGsgw7pocmFkxJspXHJcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEl4cDogc3RyaW5nO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZnDrXpuYWsgZWRpdG92w6Fuw60gZGV0YWlsdVxyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgRWRpdGFjZTogYm9vbGVhbjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCeWxhIGFrdGl2bsOtIG9wZXJhY2UgbmEgZGV0YWlsdT9cclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEFrdGl2bmlPcGVyYWNlOiBib29sZWFuO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERUTyBkZXRhaWx1IFByaWthenUgayB1aHJhZGVcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLkJ1Yy5JbnRlcmZhY2UuR1ByaWthekR0b31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIERldGFpbER0bzogR29yZGljLkJ1Yy5JbnRlcmZhY2UuR1ByaWthekR0bztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWYWxpZMOhdG9yeVxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3RbXX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHZhbGlkYXRvcnM6IG9iamVjdFtdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrdHXDoWxuw60gcm9rXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJvazogbnVtYmVyO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZnDrXpuYWsgcmV6ZXJ2YWNlIHZlIHN0w6F0bsOtIHBva2xhZG7EmyAoMD1ORS8xPUFubylcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUlTUDogbnVtYmVyO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIGlzbCB2aWV3IGdyaWR1IFJlemVydmFjZSBJSVNQXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHZpZXdJSVNQOiBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdSZXpJSVNTUER0bz47XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogZ3JpZCBSZXplcnZhY2UgSUlTUFxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkSUlTUDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBmb3JtYXQgZ3JpZHUgUmV6ZXJ2YWNlIElJU1BcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZEZvcm1hdElJU1A6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphZGVmaW5vdsOhbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmFrdHVhbGl6YWNlRGV0YWlsdSgpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZWxlbWVudC5maW5kRm9ybXMoXCJmb3JtUHJpa2F6XCIpLmdmb3JtKFwidmlld01vZGVcIiwgXCJ2aWV3XCIpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9ic2x1aGEgdWTDoWxvc3RpIGJ1aWxkZXJJbml0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXIgZGV0YWlsYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkRldGFpbEJ1aWxkZXJJbml0KGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcik6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0VGFiR3JvdXBzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuSUlTUCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRUYWJHcm91cHMgPSBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIl96YWtsYWRuaVVkYWplXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMTQwMDA1XCIgLy9SQyAzMzE0MDAwNSA6IFrDoWtsYWRuw60gw7pkYWplXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIl91ZGFqZUtaYWhyYW5pY25pUGxhdGJlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMTQwMDA2XCIsIC8vUkMgMzMxNDAwMDYgOiDDmmRhamUgayB6YWhyYW5pxI1uw60gcGxhdGLEm1xyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6ICh0aGF0LkRldGFpbER0by51cGwgJiYgdGhhdC5EZXRhaWxEdG8udXBsID4gMCA/IHRydWUgOiBmYWxzZSkgLy8oIHZpZGl0ZWxub3N0IHVwbCA+IDAgKVxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFRhYkdyb3VwcyA9IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiX3pha2xhZG5pVWRhamVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMxNDAwMDVcIiAvL1JDIDMzMTQwMDA1IDogWsOha2xhZG7DrSDDumRhamVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiX3VkYWplS1phaHJhbmljbmlQbGF0YmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMxNDAwMDZcIiwgLy9SQyAzMzE0MDAwNiA6IMOaZGFqZSBrIHphaHJhbmnEjW7DrSBwbGF0YsSbXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogKHRoYXQuRGV0YWlsRHRvLnVwbCAmJiB0aGF0LkRldGFpbER0by51cGwgPiAwID8gdHJ1ZSA6IGZhbHNlKSAvLyggdmlkaXRlbG5vc3QgdXBsID4gMCApXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIl9yZXplcnZhY2VJSVNQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMTQwMDA3XCIsIC8vUkMgMzMxNDAwMDcgOiBSZXplcnZhY2UgdiBJSVNQXHJcbiAgICAgICAgICAgICAgICAgICAgLy92aXNpYmxlOiAodGhhdC5EZXRhaWxEdG8ucHJpel9zciAmJiB0aGF0LkRldGFpbER0by5wcml6X3NyID4gMCA/IHRydWUgOiBmYWxzZSkgLy8oIHZpZGl0ZWxub3N0IHByaXpfc3IgPiAwIClcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgaGVhZGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybVByaWthelwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwzTTNTMSwgTC00LTgtMCwgTS00LTgtMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5Fa28uRGV0YWlsLkZpZWxkLmZpZWxkUElEKHsgaXNQaWQ6IHRydWUsIGZpZWxkT3B0OiB7IG5hbWU6ICdpeHAnLCBtb2RlbDogJ2l4cCcsIGRpc2FibGVkOiB0cnVlIH0gfSwgeyBuYW1lOiAnaXhwJyB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkVrby5EZXRhaWwuRmllbGQuZmllbGRBZ2VuZG92ZUNpc2xvKHsgbmFtZTogXCJhY1wiLCBtb2RlbDogXCJhY1wiLCBkaXNhYmxlZDogdHJ1ZSB9LCB7IG5hbWU6IFwiYWNcIiB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIGRva2xhZHVcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5ja2F0KCksIHsgbmFtZTogXCJrdGdfdHlwXCIsIG1vZGVsOiBcImt0Z190eXA9a3RnX3R5cDtrdGdfdHlwX3R4dD1rdGdfdHlwX3R4dFwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlpwcmFjb3ZhdGVsXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc3ptcCgpLCB7IG5hbWU6IFwiaXhzX3ptcF9wcmlrXCIsIG1vZGVsOiBcIm1vZGVsLml4c196bXBfcHJpaz12YWx1ZS5peHNfem1wXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIHNjaHbDoWxlbsOtXCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF9zY2hcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJVVVNcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJ1dXNcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBwcnZreSBwcm8gc3RhdHVzYmFyXHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzQmFyU3RhdiA9IEdvcmRpYy5Fa28uRGV0YWlsLlN0YXR1c0Jhci5jcmVhdGVJdGVtKCk7IC8vbmV3IEdPYnNlcnZhYmxlT2JqZWN0PE1lbnVQYXJhbXM+KHsgdHlwZTogXCJzdGF0aWNcIiwgY2FwdGlvbjogXCJcIiwgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS10ZXh0XCIgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyDDunByYXZhIGJvxI1uw61obyBwYW5lbHVcclxuICAgICAgICAgICAgYnVpbGRlci5tb3ZlRGVmaW5pdGlvbkFmdGVyKFwicGFuZWxJbmZvcm1hY2VcIiwgXCJwYW5lbE5hdmlnYXRvclwiLCBHRGJkLkRlZmluaXRpb25LaW5kLlNpZGVQYW5lbCk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgYWtjw60sIHRhYsWvLCBrcGksIG1lbnUgYXBvZC5cclxuICAgICAgICAgICAgYnVpbGRlci53aXRoQ29tcG9uZW50PHRoaXM+KFwiR0RldGFpbFByaWthelwiLCB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJGb3JtOiBoZWFkZXJGb3JtLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdENsb3NlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtZW51QmFyOiBbXHJcblxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRCYXI6IFtcImFjdENsb3NlXCJdLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzQmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgLy9Hb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIuY3JlYXRlVXpvKHsgaXhwOiB0aGF0LkRldGFpbER0by5peHAsIHV6bzogdGhhdC5EZXRhaWxEdG8uZG9rdW1lbnQ/LnV6bywgcmVhZG9ubHk6IHRoYXQuRGV0YWlsRHRvLml4c19mdW5fYWt0ICE9PSAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCwgZ2xvYmFsU2V0dGluZ3M6IHRoaXM/Lmdsb2JhbFNldHRpbmdzIH0sICgpID0+IHRoYXQuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSh0cnVlKSwgeyBpZDogXCJzdGF0dXNCYXJVem9cIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIuY3JlYXRlSXRlbSh7IGlkOiBcInN0YXR1c0JhclN0YXZcIiB9KSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBrcGlzOiB7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGFiR3JvdXBzOiByZXN1bHRUYWJHcm91cHMsXHJcblxyXG4gICAgICAgICAgICAgICAgdGFiczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYlpha2xhZG5pVWRhamU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJbmZvcm1hY2UgbyBwbGF0YsSbXCIsIG9wZW5lZDogdHJ1ZSwgZ3JvdXA6IHsgaWQ6IFwiX3pha2xhZG5pVWRhamVcIiB9LCAvL1JDIDMzMTEwNTk2IDogT2JzYWggYmFsw61rdSBsaWNlbmPDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb3BsbsSbbsOtIHBydmvFryBkbyB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybVByaWthelwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC00LTgtMCwgTS00LTgtMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIkJhbmtvdm7DrSDDumRhamVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiQmFua292bsOtIMO6xI1ldCB2bGFzdG7DrVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJ1Y2V0X3ZsXCIsIG1vZGVsOiBcIm1vZGVsLmJ1X3ZsPXZhbHVlLmJ1X3ZsO21vZGVsLnNrX3ZsPXZhbHVlLnNrX3ZsXCIsIGl0ZW1UZW1wbGF0ZTogXCJ7YnVfdmx9L3tza192bH1cIiwgc2hvd1NlbGVjdEJ1dHRvbjogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiQmFua292bsOtIMO6xI1ldCBjaXrDrVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJ1Y2V0X2NpXCIsIG1vZGVsOiBcIm1vZGVsLmJ1X2NpPXZhbHVlLmJ1X2NpO21vZGVsLnNrX2NpPXZhbHVlLnNrX2NpXCIsIGl0ZW1UZW1wbGF0ZTogXCJ7YnVfY2l9L3tza19jaX1cIiwgc2hvd1NlbGVjdEJ1dHRvbjogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiVlMsIEtTLCBTU1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTRcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJ2c1wiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNFwiLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImtzXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy00XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwic3NcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwixIzDoXN0a2FcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwixIzDoXN0a2EgdiBtxJtuxJtcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy04XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiY19tZW5hXCIsIGRlY2ltYWxTZXBhcmF0b3I6IFwiLFwiLCB0aG91c2FuZHNTZXBhcmF0b3I6IFwiIFwiLCBkZWNpbWFsczogMiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTRcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJtZW5hX3R4dFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw6FzdGthIHYgQ1pLXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImNcIiwgZGVjaW1hbFNlcGFyYXRvcjogXCIsXCIsIHRob3VzYW5kc1NlcGFyYXRvcjogXCIgXCIsIGRlY2ltYWxzOiAyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJEYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlNwbGF0bm9zdFwiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiZGF0X3NwbFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlNwbGF0bm9zdCB2IGFnZW5kxJtcIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImRhdF9zcGxfYWdcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiRXh0ZXJuw60gc3ViamVrdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTdWJqZWt0XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcIm5hemV2XCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJxIxPLCBEScSMXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImljb19lc3VcIiB9KS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJkaWNcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiSHJhemVuw61cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiWnDFr3NvYiDDumhyYWR5XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvY2l6cCgpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcInpwXCIsIG1vZGVsOiBcInpwPXpwO3pwX3prcj16cF96a3I7enBfdHh0PXpwX3R4dFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJQcmltw6FybsOtIGFnZW5kYVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJBZ2VuZGFcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiemtyX2FnXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJLbMOtxI1vdsOhIHNsb3ZhIC0gdGVzdFwiKS5hZGRGaWVsZChcImdrZXl3b3Jkc2JhclwiLCB7IG5hbWU6IFwiS2xpY1Nsb3ZhRmllbGRcIiwgaXhwOiAvKlwiXCIqLyAvKlwiREVNT1gwMDNYQ1JRXCIsKi8gdGhhdC5JeHAsIHNhdmVEYXRhOiBcImFwcGx5XCIsIHRvb2x0aXA6IFwiS2zDrcSNb3bDoSBzbG92YVwiICB9KSAvL0RFTU9YMDAzWENSUVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUG9waXNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiWnByw6F2YSBwcm8gcMWZw61qZW1jZVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJwb3Bpc1wiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYi5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYlVkYWplS1phaHJhbmljbmlQbGF0YmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiX3VkYWplS1phaHJhbmljbmlQbGF0YmVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50UGFyYW1zOiBHQ29udGVudC5jcmVhdGVJbml0aWFsaXplcihcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdEZXRhaWxQcmlrYXpaUFwiLCB7IEl4cDogdGhhdC5JeHAsIERldGFpbER0bzogdGhhdC5EZXRhaWxEdG8gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJSZXplcnZhY2VJSVNQOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiPGI+UmV6ZXJ2YWNlIHYgSUlTUDwvYj5cIiwgb3BlbmVkOiB0cnVlLCBncm91cDogeyBpZDogXCJfcmV6ZXJ2YWNlSUlTUFwiIH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb250ZW50IHBybyByZXplcnZhY2kgSUlTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnZpZXdJSVNQID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGF0LmlzbC5QcmlrYXoubGlzdChycSA9PiB7IHJldHVybiB7IGZpbHRlcnM6IHsgaXhwOiB0aGF0LkRldGFpbER0by5peHAgfSB9IH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LkRldGFpbER0by5yc3AgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld0lJU1AgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGF0LkRldGFpbER0by5yc3ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3SUlTUCA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRGb3JtYXRJSVNQID0gdGhhdC5jcmVhdGVHcmlkRm9ybWF0SUlTUCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkSUlTUCA9ICQoXCI8ZGl2PlwiKS5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlIH0pLmFwcGVuZFRvKHRhYikuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudmlld0lJU1AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkSUlTUFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gYXV0bywgYWxsLWF0LW9uY2UsIHBhZ2VkLXN5bmMsIHBhZ2VkLWFzeW5jXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLFx0XHRcdFx0XHRcdFx0XHRcdC8vIHJvdywgY2VsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoYXQuZ3JpZEZvcm1hdElJU1AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuw60ga3BpcGFuZWx1XHJcbiAgICAgICAgICAgIC8vJC5leHRlbmQoYnVpbGRlci5rcGlUYWJPcHRpb25zLCB7IHRpdGxlOiBcIlNvdWhyblwiIH0pO1xyXG4gICAgICAgICAgICAvLyQuZXh0ZW5kKGJ1aWxkZXIua3BpUGFuZWxPcHRpb25zLCB7IHNvcnRhYmxlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBrcGlwYW5lbHVcclxuICAgICAgICAgICAgJC5leHRlbmQoYnVpbGRlci5rcGlQYW5lbE9wdGlvbnMsIHsgc29ydGFibGU6IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIHZ5dHZvxZlpdCBmb3Jtw6F0IHNsb3VwY8WvIHNlem5hbXUgUmV6ZXJ2YWNlIHYgSUlTUFxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0SUlTUCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0IHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2x1bW5zRGVmaW5pdGlvbiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7XHJcblxyXG4gICAgICAgICAgICBjb2x1bW5zRGVmaW5pdGlvblxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkX2hkcl9yaXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIklEIFJJU1wiLCAgXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX2hkclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwixZguIFJJU1wiLCAgXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19yZXpcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIsSMw6FzdGthIHYgS8SNXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyNTAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gY29sdW1uc0RlZmluaXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JzbHVoYSB1ZMOhbG9zdGkgYnVpbGRlckJ1aWxkXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXIgZGV0YWlsYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkRldGFpbEJ1aWxkZXJCdWlsZChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gbmFwb2plbsOtIHN0YW5kYXJkbsOtIEVLTyBobGF2acSNa3lcclxuICAgICAgICAgICAgY29uc3QgZm9ybVNldHVwID0ge307XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1IZWFkZXJcIiB9KVxyXG5cclxuICAgICAgICAgICAgLy8gw7pwcmF2eSBzdGFuZGFyZG7DrWNoIGtvbXBvbmVudFxyXG5cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyDFoWlwa3kgcHJvIHBvc3VuIHBvIHNlem5hbXVcclxuICAgICAgICAgICAgLy90aGlzLmxpc3RDb250cm9sc19zZXR1cCh7XHJcbiAgICAgICAgICAgIC8vICAgIHJvd1RvRHRvOiBmdW5jdGlvbiAoZ3JpZFN0YXRlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIEl4cDogZ3JpZFN0YXRlLmN1cnJlbnRSb3cuZGF0YS5peHAsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9TYnU6IGdyaWRTdGF0ZS5jdXJyZW50Um93LmRhdGEuc2J1LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vTmFzbGVkdWppY2lEZXRhaWw6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICBuZXh0SXRlbVRlbXBsYXRlOiBcIk7DoXNsZWR1asOtY8OtOiB7aXhwfVwiLFxyXG4gICAgICAgICAgICAvLyAgICBwcmV2SXRlbVRlbXBsYXRlOiBcIlDFmWVkY2hvesOtOiB7aXhwfVwiLFxyXG4gICAgICAgICAgICAvLyAgICBiZWZvcmVNb3ZlOiB0aGF0LmNsb3NpbmdcclxuICAgICAgICAgICAgLy99KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuw60gcHJ2a8WvIHZlIGZvcm11bMOhxZlpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vIHN0YXR1cyBiYXJcclxuICAgICAgICAgICAgRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbShcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzZXMhW1wic3RhdHVzQmFyU3RhdlwiXSEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLkRldGFpbER0by5zX3VocnBfdHh0ISxcclxuICAgICAgICAgICAgICAgIG51bGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphZMOhbsOtIHBhcmFtZXRyxa8gdGlza3VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0lHUHJpbnRBY3Rpb25SZXBvcnRTdGFydGluZ30gcmVwIHBhcmFtZXRyeSB0aXNrdVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyByZXBvcnRTdGFydGluZyhyZXA6IElHUHJpbnRBY3Rpb25SZXBvcnRTdGFydGluZyk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gcG91emUgUElELCBuaWMgamluw6lobyBzZSBuZXDFmWVkw6F2w6FcclxuICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwNSA9IHRoaXMuSXhwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dWFsaXphY2UgZGF0IHYgZGV0YWlsdSBwb2RsZSBtb2RlbHUgYSBuYXN0YXZlbsOtIHN0YXZ1IHBydmvFr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgYWt0dWFsaXphY2VEZXRhaWx1KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0XHJcbiAgICAgICAgICAgIC8vIGRlZmVycmVkIG9iamVrdCBwcm8gesWZZXTEm3plbsOtIGFrY8OtXHJcbiAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgLy8gb2JzbHVoYSBqZWRub3RsaXbDvWNoIGbDoXrDrVxyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKFwiTmHEjcOtdMOhbSBkYXRhXCIpO1xyXG4gICAgICAgICAgICBkZWYudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gbmFwbG7Em27DrSBwb2zDrcSNZWtcclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZHNPYmVjbmVVZGFqZSA9IHRoYXQuZmluZEZvcm1zKFwiZm9ybVByaWthelwiKS5maW5kRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICBmaWVsZHNPYmVjbmVVZGFqZVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQuRGV0YWlsRHRvLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoYXQudmFsaWRhdG9ycyk7XHJcbiAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBzdGF2dSBwb2zDrcSNZWsgYSBha2PDrVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlc3QsIGplc3RsaSBqZSBtb8W+bsOpIG9rbm8gemF2xZnDrXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTxhbnk+IHwgYm9vbGVhbn0gcHJvbWlzZSAocmVzb2x2ZSA9IGplIG1vxb5uw6kgemF2xZnDrXQsIHJlamVjdCA9IG5lbsOtIG1vxb5uw6kgemF2xZnDrXQpIG5lYm8gcMWZw61tbyBib29sZWFuOyBib29sZWFuIHVyxI11amUsIGplc3RsaSBieWxhIG7Em2pha8OhIGFrdGl2bsOtIG9wZXJhY2UgKHRydWUpIG5lYm8gbmUgKGZhbHNlKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjbG9zaW5nKCk6IEpRdWVyeVByb21pc2U8YW55PiB8IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8ga29udHJvbGEgbmEgem3Em27Em27DqSBwb2xvxb5reVxyXG4gICAgICAgICAgICBsZXQgZm9ybUNoYW5nZWQgPSB0aGlzLmZpbmRGb3JtcygpLmdmb3JtKFwiaGFzQ2hhbmdlZFwiKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LkFrdGl2bmlPcGVyYWNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=
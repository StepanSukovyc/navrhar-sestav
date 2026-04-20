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
            const { gcontent } = Decorators;
            /**
             * actionNames - použití enumu pro actionnames
             *
             * @author vblabla
             * @since 52430.11
             */
            let actionNames;
            (function (actionNames) {
                actionNames["actDokoncit"] = "actDokoncit";
                actionNames["actStav"] = "actStav";
                actionNames["actProtokol"] = "actProtokol";
            })(actionNames || (actionNames = {}));
            /**
             * Detail Dávky s příkazy do banky
             *
             * @author vblabla
             * @since 52430.10
             */
            let GDetailDavka = class GDetailDavka extends Gordic.GContentBase {
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    this.init();
                    this.aktualizaceDetailu();
                    this.createStatusBar();
                }
                /** init content */
                init() {
                    const that = this;
                    //this.aktualizaceDetailu();
                    this.title = "Dávka příkazů do banky";
                    // akce detailu
                    this.actions.addRange({
                        actDokoncit: new GAction({ name: actionNames.actDokoncit, caption: "jres:33140076", run: function () { } }), //RC 33140076 : Dokončit
                        actStav: new GAction({ name: actionNames.actStav, caption: "jres:33140077", run: function () { }, visible: (that.DetailDto.banka?.parametryDopresnujici?.stav_prik ? true : false) }), //RC 33140077 : Stav
                        actProtokol: new GAction({ name: actionNames.actProtokol, caption: "jres:33140094", run: function () { that.zobrazitProtokol(); }, enabled: (that.DetailDto.banka?.parametryDopresnujici?.stah_prot ? true : false) }), //RC 33140094 : Protokol
                    });
                    // menubar
                    this.menuBar(this.actions.createBar(this.getMenuActions()));
                    // commandbar
                    const commandBar = [];
                    commandBar.push({
                        favorite: true,
                        action: this.actions.add(new GAction({
                            name: "actZavrit",
                            icon: "gi-window-close",
                            caption: "Zavřít", //RC 32000022 : Zavřít
                            run: () => {
                                this.tryClose();
                            }
                        }))
                    });
                    this.commandBar(commandBar);
                    //this.element.findForms().gform("options", "model", "apply", this.DetailDto);
                    //this.element.findForms("formPrikaz").gform("viewMode", "view");
                    //Formulář s detailem dávky příkazů
                    let formDetailDavka = new Gordic.Forms.Form({ name: "formDavka", layoutDescriptor: "L3M3S3", /*, L-2-8-2, M-4-8-0, S-12-12-0"*/ })
                        .addSection().addRow("Identifikátor").addField("gstringbox", Gordic.Prefabs.String.ixs(false), /* Gordic.Prefabs.Actions.UlozitDoClipboardu(that.element.findFields("ixp_dav").gfield("getValue")),*/ { name: "ixp_dav", /*model: "model.ixp = value.ixp",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        //.addRow("Banka").addField("gstringbox", { name: "banka", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ }).addSection()
                        .addSection().addRow("Číslo dávky").addField("gstringbox", { name: "cislo_davky", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addSection().addRow("Vlastník").addField("gstringbox", { name: "vlastnik", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addSection().addRow("Banka").addField("gstringbox", { name: "sk_vl", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        //.addField("gselectbox", Gordic.Prefabs.Select.ekosuvl(), {
                        //    name: "sk_vl",
                        //   // model: "model.sk_vl=value.sk_vl", //;model.sbu=value.sbu",
                        //    disabled: true,
                        //})
                        .addSection().addRow("Stav dávky").addField("gstringbox", { name: "s_dpb_txt", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addSection().addRow("Označení dávky").addField("gstringbox", { name: "soubor", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addSection().addRow("Datum vzniku").addField("gdatebox", { name: "dat_vzn", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addSection().addRow("Počet příkazů").addField("gstringbox", { name: "poc_pri", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addSection().addRow("Částka").addField("gstringbox", { name: "castka", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addSection().addRow("Počet podpisů").addField("gstringbox", { name: "poc_pod", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addSection().addRow("Datum podpisu").addField("gdatebox", { name: "dat_ppo", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addSection().addRow("Datum odeslání").addField("gdatebox", { name: "dat_ode", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addSection().addRow("Počet podpisů požadovaných").addField("gstringbox", { name: "poc_pod", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addSection().addRow("Počet podpisů uložených").addField("gstringbox", { name: "poc_pod_ulo", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ })
                        .addSection().addRow("Stav transakce").addField("gstringbox", { name: "stav_tra", /*model: "model.ac = value.ac",*/ disabled: true, /*customClass: "font-weight: bold"*/ });
                    this.element.gform("createFrom", formDetailDavka);
                }
                /**
         * vytvořit statusbar
         */
                createStatusBar() {
                    const bar = [];
                    bar.push({
                        id: "statusStav",
                        type: "static",
                        caption: this.DetailDto.s_dpb_txt,
                        customClass: Gordic.Utils.Colors.textActive
                    });
                    this.statusBar(bar);
                }
                /**
                * Seznam akcí pro menu (hamburger nebo kontextové menu gridu)
                *
                * @param {boolean} contextMenu formát pro kontextové menu gridu (true (default) = ano, false = ne)
                * @param {IGGridCellContext<Gordic.Buc.Interface.GDavkaPDBDto>} [cellContext] kontext z gridu (pouze pro contextMenu = true) (default = undefined)
                * @returns {any} seznam akcí
                */
                getMenuActions(contextMenu = false, cellContext) {
                    return contextMenu
                        ? [
                            "actDokoncit",
                            "actStav",
                            "actProtokol",
                        ]
                        : [
                            { action: this.actions.actDokoncit, primary: true, favorite: true },
                            //"actDokoncit*",
                            "actStav*",
                            "actProtokol*",
                        ];
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
                        let fieldsObecneUdaje = that.findForms("formDavka").findFields();
                        fieldsObecneUdaje
                            .gfield("model", "apply", that.DetailDto, { initialValues: true })
                            .gfield("model", "validators", that.validators);
                        def.resolve();
                        return def.promise();
                    })
                        .done(function () {
                        // nastavení stavu políček a akcí
                        //that.enable();
                    })
                        .always(function () {
                        that.endOperation();
                    });
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
                 * zobrazitProtokol - filepreview souboru s výsledkem odeslání dávky do banky
                 */
                zobrazitProtokol() {
                    let that = this;
                    var filePreview = $('<div>').gfilepreview({ modifymenubar: function (ev, ctx) { ctx.menuBar = ctx.menuBar.filter(function (it) { return it.action?.name != 'fullscreenAction'; }); } });
                    that.isl.DavkaPDB.vratSouborProtokolu({ data: that.DetailDto })
                        .get()
                        .then(function (ret) {
                        that.dialogs.showModalWindow(filePreview)
                            .dialog('maximize', true)
                            .dialog('option', {
                            'noMaximize': true,
                            draggable: false,
                            resizable: false,
                            title: 'Náhled souboru - režim celé obrazovky',
                        });
                        var previewElement = $(".detail-content")[0];
                        $(previewElement).empty();
                        var preview = $(that.element).gfilepreview({}).appendTo(previewElement);
                        filePreview.gfilepreview("displayFromServer", new GContent("Gordic.Gui.WebControls.GFileServiceProvider"), "PreviewFile", { fileInfo: ret.result.data, fieldDownloaderType: "Gordic.Documents.WebClient.GFileFieldService" });
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
            GDetailDavka = __decorate([
                gcontent
            ], GDetailDavka);
            WebClient.GDetailDavka = GDetailDavka;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbERhdmthLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbERhdmthLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FzUWY7QUF0UUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBc1FuQjtJQXRRZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBc1E3QjtRQXRRb0IsV0FBQSxTQUFTO1lBRTFCLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFFaEM7Ozs7O2VBS0c7WUFDSCxJQUFLLFdBSUo7WUFKRCxXQUFLLFdBQVc7Z0JBQ1osMENBQTJCLENBQUE7Z0JBQzNCLGtDQUFtQixDQUFBO2dCQUNuQiwwQ0FBMkIsQ0FBQTtZQUMvQixDQUFDLEVBSkksV0FBVyxLQUFYLFdBQVcsUUFJZjtZQUVEOzs7OztlQUtHO1lBRUgsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBYSxTQUFRLE9BQUEsWUFBWTtnQkEyQzFDOzttQkFFRztnQkFDSSxjQUFjO29CQUNqQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ1osSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7b0JBQzFCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtnQkFDMUIsQ0FBQztnQkFJRCxtQkFBbUI7Z0JBQ1gsSUFBSTtvQkFDUixNQUFNLElBQUksR0FBRyxJQUFJLENBQUE7b0JBQ2pCLDRCQUE0QjtvQkFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyx3QkFBd0IsQ0FBQTtvQkFDckMsZUFBZTtvQkFDZixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFFbEIsV0FBVyxFQUFFLElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxHQUFHLEVBQUUsY0FBbUMsQ0FBQyxFQUFFLENBQUMsRUFBRSx3QkFBd0I7d0JBQzFKLE9BQU8s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ZUE4T3hCLENBQUE7UUFDTCxDQUFDLEVBdFFvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFzUTdCO0lBQUQsQ0FBQyxFQXRRZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBc1FuQjtBQUFELENBQUMsRUF0UVMsTUFBTSxLQUFOLE1BQU0sUUFzUWYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnQge1xyXG5cclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhY3Rpb25OYW1lcyAtIHBvdcW+aXTDrSBlbnVtdSBwcm8gYWN0aW9ubmFtZXNcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciB2YmxhYmxhXHJcbiAgICAgKiBAc2luY2UgNTI0MzAuMTFcclxuICAgICAqL1xyXG4gICAgZW51bSBhY3Rpb25OYW1lcyB7XHJcbiAgICAgICAgYWN0RG9rb25jaXQgPSBcImFjdERva29uY2l0XCIsXHJcbiAgICAgICAgYWN0U3RhdiA9IFwiYWN0U3RhdlwiLFxyXG4gICAgICAgIGFjdFByb3Rva29sID0gXCJhY3RQcm90b2tvbFwiLFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWlsIETDoXZreSBzIHDFmcOta2F6eSBkbyBiYW5reVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIHZibGFibGFcclxuICAgICAqIEBzaW5jZSA1MjQzMC4xMFxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsRGF2a2EgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogc3RhdiB2ZSBzdGF0dXNiYXJ1XHJcbiAgICAgICAgICogQHR5cGUge0dPYnNlcnZhYmxlT2JqZWN0PE1lbnVQYXJhbXM+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc3RhdHVzQmFyU3RhdjogR09ic2VydmFibGVPYmplY3Q8TWVudVBhcmFtcz47XHJcblxyXG4gICAgICAgIC8vIHZsYXN0bm9zdGkgeiBDI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBJRCBkb2t1bWVudHUgKETDoXZreSBzIHDFmcOta2F6eSlcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgSXhwOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmcOtem5hayBlZGl0b3bDoW7DrSBkZXRhaWx1XHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBFZGl0YWNlOiBib29sZWFuO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJ5bGEgYWt0aXZuw60gb3BlcmFjZSBuYSBkZXRhaWx1P1xyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgQWt0aXZuaU9wZXJhY2U6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRFRPIGRldGFpbHUgUHJpa2F6dSBrIHVocmFkZVxyXG4gICAgICAgICAqIEB0eXBlIHtHb3JkaWMuQnVjLkludGVyZmFjZS5HRGF2a2FQREJEdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBEZXRhaWxEdG86IEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQkR0bztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWYWxpZMOhdG9yeVxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3RbXX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHZhbGlkYXRvcnM6IG9iamVjdFtdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrdHXDoWxuw60gcm9rXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJvazogbnVtYmVyO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWRlZmlub3bDoW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWt0dWFsaXphY2VEZXRhaWx1KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU3RhdHVzQmFyKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvKiogaW5pdCBjb250ZW50ICovXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICAgICAgICAvL3RoaXMuYWt0dWFsaXphY2VEZXRhaWx1KCk7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIkTDoXZrYSBwxZnDrWthesWvIGRvIGJhbmt5XCJcclxuICAgICAgICAgICAgLy8gYWtjZSBkZXRhaWx1XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGFjdERva29uY2l0OiBuZXcgR0FjdGlvbih7IG5hbWU6IGFjdGlvbk5hbWVzLmFjdERva29uY2l0LCBjYXB0aW9uOiBcImpyZXM6MzMxNDAwNzZcIiwgcnVuOiBmdW5jdGlvbiAoKSB7IC8qdGhhdC5kb2tvbmNpdCgpOyovIH0gfSksIC8vUkMgMzMxNDAwNzYgOiBEb2tvbsSNaXRcclxuICAgICAgICAgICAgICAgIGFjdFN0YXY6IG5ldyBHQWN0aW9uKHsgbmFtZTogYWN0aW9uTmFtZXMuYWN0U3RhdiwgY2FwdGlvbjogXCJqcmVzOjMzMTQwMDc3XCIsIHJ1bjogZnVuY3Rpb24gKCkgeyAvKnRoYXQuc3RhdigpOyovIH0sIHZpc2libGU6ICh0aGF0LkRldGFpbER0by5iYW5rYT8ucGFyYW1ldHJ5RG9wcmVzbnVqaWNpPy5zdGF2X3ByaWsgPyB0cnVlIDogZmFsc2UgKSB9KSwgLy9SQyAzMzE0MDA3NyA6IFN0YXZcclxuICAgICAgICAgICAgICAgIGFjdFByb3Rva29sOiBuZXcgR0FjdGlvbih7IG5hbWU6IGFjdGlvbk5hbWVzLmFjdFByb3Rva29sLCBjYXB0aW9uOiBcImpyZXM6MzMxNDAwOTRcIiwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuem9icmF6aXRQcm90b2tvbCgpIH0sIGVuYWJsZWQ6ICh0aGF0LkRldGFpbER0by5iYW5rYT8ucGFyYW1ldHJ5RG9wcmVzbnVqaWNpPy5zdGFoX3Byb3QgPyB0cnVlIDogZmFsc2UpIH0pLCAvL1JDIDMzMTQwMDk0IDogUHJvdG9rb2xcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIG1lbnViYXJcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIodGhpcy5nZXRNZW51QWN0aW9ucygpKSk7XHJcbiAgICAgICAgICAgIC8vIGNvbW1hbmRiYXJcclxuICAgICAgICAgICAgY29uc3QgY29tbWFuZEJhcjogTWVudVBhcmFtc1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBjb21tYW5kQmFyLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WmF2cml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHRcdFx0XHQvL1JDIDMyMDAwMDIyIDogWmF2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihjb21tYW5kQmFyKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5lbGVtZW50LmZpbmRGb3JtcygpLmdmb3JtKFwib3B0aW9uc1wiLCBcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5EZXRhaWxEdG8pO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwiZm9ybVByaWthelwiKS5nZm9ybShcInZpZXdNb2RlXCIsIFwidmlld1wiKTtcclxuXHJcbiAgICAgICAgICAgIC8vRm9ybXVsw6HFmSBzIGRldGFpbGVtIGTDoXZreSBwxZnDrWthesWvXHJcbiAgICAgICAgICAgIGxldCBmb3JtRGV0YWlsRGF2a2EgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1EYXZrYVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwzTTNTM1wiLCAgLyosIEwtMi04LTIsIE0tNC04LTAsIFMtMTItMTItMFwiKi8gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKCkuYWRkUm93KFwiSWRlbnRpZmlrw6F0b3JcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy5peHMoZmFsc2UpLC8qIEdvcmRpYy5QcmVmYWJzLkFjdGlvbnMuVWxveml0RG9DbGlwYm9hcmR1KHRoYXQuZWxlbWVudC5maW5kRmllbGRzKFwiaXhwX2RhdlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSksKi8geyBuYW1lOiBcIml4cF9kYXZcIiwgLyptb2RlbDogXCJtb2RlbC5peHAgPSB2YWx1ZS5peHBcIiwqLyBkaXNhYmxlZDogdHJ1ZSwgLypjdXN0b21DbGFzczogXCJmb250LXdlaWdodDogYm9sZFwiKi8gfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFJvdyhcIkJhbmthXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiYmFua2FcIiwgLyptb2RlbDogXCJtb2RlbC5hYyA9IHZhbHVlLmFjXCIsKi8gZGlzYWJsZWQ6IHRydWUsIC8qY3VzdG9tQ2xhc3M6IFwiZm9udC13ZWlnaHQ6IGJvbGRcIiovIH0pLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKS5hZGRSb3coXCLEjMOtc2xvIGTDoXZreVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImNpc2xvX2Rhdmt5XCIsIC8qbW9kZWw6IFwibW9kZWwuYWMgPSB2YWx1ZS5hY1wiLCovIGRpc2FibGVkOiB0cnVlLCAvKmN1c3RvbUNsYXNzOiBcImZvbnQtd2VpZ2h0OiBib2xkXCIqLyB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKS5hZGRSb3coXCJWbGFzdG7DrWtcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJ2bGFzdG5pa1wiLCAvKm1vZGVsOiBcIm1vZGVsLmFjID0gdmFsdWUuYWNcIiwqLyBkaXNhYmxlZDogdHJ1ZSwgLypjdXN0b21DbGFzczogXCJmb250LXdlaWdodDogYm9sZFwiKi8gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKCkuYWRkUm93KFwiQmFua2FcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJza192bFwiLCAvKm1vZGVsOiBcIm1vZGVsLmFjID0gdmFsdWUuYWNcIiwqLyBkaXNhYmxlZDogdHJ1ZSwgLypjdXN0b21DbGFzczogXCJmb250LXdlaWdodDogYm9sZFwiKi8gfSlcclxuICAgICAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1dmwoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwic2tfdmxcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgIC8vIG1vZGVsOiBcIm1vZGVsLnNrX3ZsPXZhbHVlLnNrX3ZsXCIsIC8vO21vZGVsLnNidT12YWx1ZS5zYnVcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpLmFkZFJvdyhcIlN0YXYgZMOhdmt5XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwic19kcGJfdHh0XCIsIC8qbW9kZWw6IFwibW9kZWwuYWMgPSB2YWx1ZS5hY1wiLCovIGRpc2FibGVkOiB0cnVlLCAvKmN1c3RvbUNsYXNzOiBcImZvbnQtd2VpZ2h0OiBib2xkXCIqLyB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKS5hZGRSb3coXCJPem5hxI1lbsOtIGTDoXZreVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInNvdWJvclwiLCAvKm1vZGVsOiBcIm1vZGVsLmFjID0gdmFsdWUuYWNcIiwqLyBkaXNhYmxlZDogdHJ1ZSwgLypjdXN0b21DbGFzczogXCJmb250LXdlaWdodDogYm9sZFwiKi8gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKCkuYWRkUm93KFwiRGF0dW0gdnpuaWt1XCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF92em5cIiwgLyptb2RlbDogXCJtb2RlbC5hYyA9IHZhbHVlLmFjXCIsKi8gZGlzYWJsZWQ6IHRydWUsIC8qY3VzdG9tQ2xhc3M6IFwiZm9udC13ZWlnaHQ6IGJvbGRcIiovIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpLmFkZFJvdyhcIlBvxI1ldCBwxZnDrWthesWvXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG9jX3ByaVwiLCAvKm1vZGVsOiBcIm1vZGVsLmFjID0gdmFsdWUuYWNcIiwqLyBkaXNhYmxlZDogdHJ1ZSwgLypjdXN0b21DbGFzczogXCJmb250LXdlaWdodDogYm9sZFwiKi8gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKCkuYWRkUm93KFwixIzDoXN0a2FcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJjYXN0a2FcIiwgLyptb2RlbDogXCJtb2RlbC5hYyA9IHZhbHVlLmFjXCIsKi8gZGlzYWJsZWQ6IHRydWUsIC8qY3VzdG9tQ2xhc3M6IFwiZm9udC13ZWlnaHQ6IGJvbGRcIiovIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpLmFkZFJvdyhcIlBvxI1ldCBwb2RwaXPFr1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInBvY19wb2RcIiwgLyptb2RlbDogXCJtb2RlbC5hYyA9IHZhbHVlLmFjXCIsKi8gZGlzYWJsZWQ6IHRydWUsIC8qY3VzdG9tQ2xhc3M6IFwiZm9udC13ZWlnaHQ6IGJvbGRcIiovIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpLmFkZFJvdyhcIkRhdHVtIHBvZHBpc3VcIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IG5hbWU6IFwiZGF0X3Bwb1wiLCAvKm1vZGVsOiBcIm1vZGVsLmFjID0gdmFsdWUuYWNcIiwqLyBkaXNhYmxlZDogdHJ1ZSwgLypjdXN0b21DbGFzczogXCJmb250LXdlaWdodDogYm9sZFwiKi8gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKCkuYWRkUm93KFwiRGF0dW0gb2Rlc2zDoW7DrVwiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfb2RlXCIsIC8qbW9kZWw6IFwibW9kZWwuYWMgPSB2YWx1ZS5hY1wiLCovIGRpc2FibGVkOiB0cnVlLCAvKmN1c3RvbUNsYXNzOiBcImZvbnQtd2VpZ2h0OiBib2xkXCIqLyB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKS5hZGRSb3coXCJQb8SNZXQgcG9kcGlzxa8gcG/FvmFkb3ZhbsO9Y2hcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJwb2NfcG9kXCIsIC8qbW9kZWw6IFwibW9kZWwuYWMgPSB2YWx1ZS5hY1wiLCovIGRpc2FibGVkOiB0cnVlLCAvKmN1c3RvbUNsYXNzOiBcImZvbnQtd2VpZ2h0OiBib2xkXCIqLyB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKS5hZGRSb3coXCJQb8SNZXQgcG9kcGlzxa8gdWxvxb5lbsO9Y2hcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJwb2NfcG9kX3Vsb1wiLCAvKm1vZGVsOiBcIm1vZGVsLmFjID0gdmFsdWUuYWNcIiwqLyBkaXNhYmxlZDogdHJ1ZSwgLypjdXN0b21DbGFzczogXCJmb250LXdlaWdodDogYm9sZFwiKi8gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKCkuYWRkUm93KFwiU3RhdiB0cmFuc2FrY2VcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJzdGF2X3RyYVwiLCAvKm1vZGVsOiBcIm1vZGVsLmFjID0gdmFsdWUuYWNcIiwqLyBkaXNhYmxlZDogdHJ1ZSwgLypjdXN0b21DbGFzczogXCJmb250LXdlaWdodDogYm9sZFwiKi8gfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybURldGFpbERhdmthKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gKiB2eXR2b8WZaXQgc3RhdHVzYmFyXHJcbiAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlU3RhdHVzQmFyKCkge1xyXG4gICAgICAgICAgICBjb25zdCBiYXI6IE1lbnVQYXJhbXNbXSA9IFtdO1xyXG4gICAgICAgICAgICBiYXIucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJzdGF0dXNTdGF2XCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN0YXRpY1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5EZXRhaWxEdG8uc19kcGJfdHh0ISxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBHb3JkaWMuVXRpbHMuQ29sb3JzLnRleHRBY3RpdmVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXNCYXIoYmFyKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBTZXpuYW0gYWtjw60gcHJvIG1lbnUgKGhhbWJ1cmdlciBuZWJvIGtvbnRleHRvdsOpIG1lbnUgZ3JpZHUpXHJcbiAgICAgICAgKiBcclxuICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY29udGV4dE1lbnUgZm9ybcOhdCBwcm8ga29udGV4dG92w6kgbWVudSBncmlkdSAodHJ1ZSAoZGVmYXVsdCkgPSBhbm8sIGZhbHNlID0gbmUpXHJcbiAgICAgICAgKiBAcGFyYW0ge0lHR3JpZENlbGxDb250ZXh0PEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQkR0bz59IFtjZWxsQ29udGV4dF0ga29udGV4dCB6IGdyaWR1IChwb3V6ZSBwcm8gY29udGV4dE1lbnUgPSB0cnVlKSAoZGVmYXVsdCA9IHVuZGVmaW5lZClcclxuICAgICAgICAqIEByZXR1cm5zIHthbnl9IHNlem5hbSBha2PDrVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRNZW51QWN0aW9ucyhjb250ZXh0TWVudTogYm9vbGVhbiA9IGZhbHNlLCBjZWxsQ29udGV4dD86IElHR3JpZENlbGxDb250ZXh0PEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQkR0bz4pOiBhbnkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHRNZW51XHJcbiAgICAgICAgICAgICAgICA/IFtcclxuICAgICAgICAgICAgICAgICAgICBcImFjdERva29uY2l0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RTdGF2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RQcm90b2tvbFwiLFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3REb2tvbmNpdCwgcHJpbWFyeTogdHJ1ZSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL1wiYWN0RG9rb25jaXQqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RTdGF2KlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0UHJvdG9rb2wqXCIsXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dWFsaXphY2UgZGF0IHYgZGV0YWlsdSBwb2RsZSBtb2RlbHUgYSBuYXN0YXZlbsOtIHN0YXZ1IHBydmvFr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgYWt0dWFsaXphY2VEZXRhaWx1KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBkYXRcclxuICAgICAgICAgICAgLy8gZGVmZXJyZWQgb2JqZWt0IHBybyB6xZlldMSbemVuw60gYWtjw61cclxuICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAvLyBvYnNsdWhhIGplZG5vdGxpdsO9Y2ggZsOhesOtXHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oXCJOYcSNw610w6FtIGRhdGFcIik7XHJcbiAgICAgICAgICAgIGRlZi50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gbmFwbG7Em27DrSBwb2zDrcSNZWtcclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZHNPYmVjbmVVZGFqZSA9IHRoYXQuZmluZEZvcm1zKFwiZm9ybURhdmthXCIpLmZpbmRGaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkc09iZWNuZVVkYWplXHJcbiAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5EZXRhaWxEdG8sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhhdC52YWxpZGF0b3JzKTtcclxuICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIHN0YXZ1IHBvbMOtxI1layBhIGFrY8OtXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmFkw6Fuw60gcGFyYW1ldHLFryB0aXNrdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7SUdQcmludEFjdGlvblJlcG9ydFN0YXJ0aW5nfSByZXAgcGFyYW1ldHJ5IHRpc2t1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHJlcG9ydFN0YXJ0aW5nKHJlcDogSUdQcmludEFjdGlvblJlcG9ydFN0YXJ0aW5nKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBwb3V6ZSBQSUQsIG5pYyBqaW7DqWhvIHNlIG5lcMWZZWTDoXbDoVxyXG4gICAgICAgICAgICByZXAucGFyYW1zLlgwMDA1ID0gdGhpcy5JeHA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB6b2JyYXppdFByb3Rva29sIC0gZmlsZXByZXZpZXcgc291Ym9ydSBzIHbDvXNsZWRrZW0gb2Rlc2zDoW7DrSBkw6F2a3kgZG8gYmFua3lcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHpvYnJheml0UHJvdG9rb2woKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGZpbGVQcmV2aWV3ID0gJCgnPGRpdj4nKS5nZmlsZXByZXZpZXcoeyBtb2RpZnltZW51YmFyOiBmdW5jdGlvbiAoZXYsIGN0eCkgeyBjdHgubWVudUJhciA9IGN0eC5tZW51QmFyLmZpbHRlcihmdW5jdGlvbiAoaXQpIHsgcmV0dXJuIGl0LmFjdGlvbj8ubmFtZSAhPSAnZnVsbHNjcmVlbkFjdGlvbicgfSk7IH0gfSlcclxuICAgICAgICAgICAgdGhhdC5pc2wuRGF2a2FQREIudnJhdFNvdWJvclByb3Rva29sdSh7IGRhdGE6IHRoYXQuRGV0YWlsRHRvIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KGZpbGVQcmV2aWV3KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGlhbG9nKCdtYXhpbWl6ZScsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kaWFsb2coJ29wdGlvbicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub01heGltaXplJzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdOw6FobGVkIHNvdWJvcnUgLSByZcW+aW0gY2Vsw6kgb2JyYXpvdmt5JywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJldmlld0VsZW1lbnQgPSAkKFwiLmRldGFpbC1jb250ZW50XCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICQocHJldmlld0VsZW1lbnQpLmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZpZXcgPSAkKHRoYXQuZWxlbWVudCkuZ2ZpbGVwcmV2aWV3KHt9KS5hcHBlbmRUbyhwcmV2aWV3RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZVByZXZpZXcuZ2ZpbGVwcmV2aWV3KFwiZGlzcGxheUZyb21TZXJ2ZXJcIiwgbmV3IEdDb250ZW50KFwiR29yZGljLkd1aS5XZWJDb250cm9scy5HRmlsZVNlcnZpY2VQcm92aWRlclwiKSwgXCJQcmV2aWV3RmlsZVwiLCB7IGZpbGVJbmZvOiByZXQucmVzdWx0LmRhdGEsIGZpZWxkRG93bmxvYWRlclR5cGU6IFwiR29yZGljLkRvY3VtZW50cy5XZWJDbGllbnQuR0ZpbGVGaWVsZFNlcnZpY2VcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUZXN0LCBqZXN0bGkgamUgbW/Fvm7DqSBva25vIHphdsWZw610XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8YW55PiB8IGJvb2xlYW59IHByb21pc2UgKHJlc29sdmUgPSBqZSBtb8W+bsOpIHphdsWZw610LCByZWplY3QgPSBuZW7DrSBtb8W+bsOpIHphdsWZw610KSBuZWJvIHDFmcOtbW8gYm9vbGVhbjsgYm9vbGVhbiB1csSNdWplLCBqZXN0bGkgYnlsYSBuxJtqYWvDoSBha3Rpdm7DrSBvcGVyYWNlICh0cnVlKSBuZWJvIG5lIChmYWxzZSlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPGFueT4gfCBib29sZWFuIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGtvbnRyb2xhIG5hIHptxJtuxJtuw6kgcG9sb8W+a3lcclxuICAgICAgICAgICAgbGV0IGZvcm1DaGFuZ2VkID0gdGhpcy5maW5kRm9ybXMoKS5nZm9ybShcImhhc0NoYW5nZWRcIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5Ba3Rpdm5pT3BlcmFjZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
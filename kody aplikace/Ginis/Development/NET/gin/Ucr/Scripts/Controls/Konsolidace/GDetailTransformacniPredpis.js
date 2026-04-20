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
            /**
             *  Detail transformacniho predpisu
             *
             *
             *
             *
             * */
            var gcontent = Decorators.gcontent;
            let GDetailTransformacniPredpis = class GDetailTransformacniPredpis extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GDetailTransformacniPredpis#";
                    // modifikace udaju
                    this.refresh = false;
                    this.error = false;
                }
                // parametry
                //private globalParams:Gordic.Uct.Interface.GUcrGlobalsDto;
                onContentReady() {
                    let that = this;
                    that.init();
                }
                prepareContent() {
                }
                /*
                 * Inicializace formulare
                 *
                 * */
                init() {
                    debugger;
                    this.refresh = false;
                    let that = this;
                    // pocatecni nastaveni atributu
                    // vytvoreni akci
                    that.createActions();
                    // prikazova lista
                    that.commandBar([
                        { action: that.actions.actUlozit },
                        { action: that.actions.actZavrit, primary: true },
                    ]);
                    this.menuBar([
                        { action: that.actions.actUlozit, favorite: true }
                    ]);
                    var filters = { ico: this.Globals.EkoParams?.ICO, akt_prohl: 100, aktivita: undefined };
                    var form = new Gordic.Forms.Form({ layoutDescriptor: "L4M3S1, L-12-12-0,L-12-12-0, S-12-12-0", tabLabel: "", opened: true })
                        .addSection()
                        .addRow({ label: this.Globals.Zkratky?.Nks })
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosnks(), {
                        name: "nks_0",
                        //modelDefaults: modelDefaults,
                        model: "model.nks_0=value.nks",
                        itemTemplate: "{nks:trim:encode}",
                        strict: false,
                        tabbable: false,
                        serverFilters: filters,
                    })
                        .addSection()
                        .addRow(this.Globals.Zkratky?.Ucs)
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosucs(), {
                        name: "ucs_0",
                        //modelDefaults: modelDefaults,
                        model: "model.ucs_0=value.ucs",
                        itemTemplate: "{ucs:trim:encode}",
                        strict: false,
                        tabbable: false,
                        verify: (o) => { return o; },
                        serverFilters: { ico: that.Globals.EkoParams?.ICO, akt_prohl: 100, aktivita: undefined },
                    })
                        .addSection()
                        .addRow(this.Globals.Zkratky?.Uus)
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosuus(), {
                        name: "uus_0",
                        //modelDefaults: modelDefaults,
                        model: "model.uus_0=value.uus",
                        itemTemplate: "{uus:trim:encode}",
                        strict: false,
                        tabbable: false,
                        verify: (o) => { return o; },
                        serverFilters: { ico: that.Globals.EkoParams?.ICO, ucs: undefined, akt_prohl: 100, aktivita: undefined },
                    })
                        .addSection({ customClass: "w-L-12 w-M-12" })
                        .addRow("jres:30250308").addField("gstringbox", { name: "popis" }) //RC 30250308 : Popis
                        .addSection({ label: "jres:30250324", customClass: "w-L-12 w-M-12" }) //RC 30250324 : Vstup
                        .addSection().addRow("jres:30250309").addField("gnumberbox", { name: "drd", decimals: 0, minValue: 0, maxValue: 100 }) //RC 30250309 : DRD
                        .addSection()
                        .addRow("jres:30250310").addField("gstringbox", { name: "ac_0" }) //RC 30250310 : Doklad
                        .addSection()
                        .addRow("jres:30250311").addField("gnumberbox", { name: "md_dal" }) //RC 30250311 : Str
                    ;
                    //var formPrefab = Gordic.Eko.WebClient.GPorizovacPrefabs.getMagicFormRows(this.dataSentence, {
                    //    autoJump: true, mode: "onlyHelp", postfix: "_0", onlyLoadData: true,
                    //    getOnlyFields: true,
                    //    widthField: { _global: "w-3" },
                    //    validators: [ new Gordic.Validators.Base({
                    //        validate: function (value, field) {
                    //            if (!value) return true;
                    //            //value = Gordic.Eko.Filters.Utils.paddValue(value, options.cfu.maxLength);
                    //            if (!new RegExp("^[0-9xX]*$", "").test(value.code)) return false;
                    //            return true;
                    //        }
                    //    })]
                    //}); // získání prefabu formuláře
                    //let pole = formPrefab[0].fields;
                    debugger;
                    //for (var i = 0; i < pole!.length; i++) {
                    //    let field = pole![i];
                    //    if (i == 0) {
                    //        form.addSection().addRow({ label: field.options["dataWord"].Zkratka});
                    //    }
                    //    else
                    //        form.addSection().addRow(field.options["dataWord"].Zkratka);
                    //    form.addField(field);
                    //}
                    that.modifyCfu.columns.forEach((item, index) => {
                        item.name = item.name.substr(0, item.name.length - 2);
                        form.addSection().addRow(item.caption)
                            .addField("gselectbox", Gordic.Eko.Prefabs.cfu({ isRoz: false, isUct: true, cfu: item }), {
                            name: item.name,
                            create: function (ev) {
                                //Omezeni delky na urcity pocet znaku
                                Gordic.Eko.Filters.Utils.inputToUpperCaseFunc.apply(this, [ev]);
                                $(this).find(".gfield-input").attr("maxlength", item.maxLength);
                            },
                            change: function (ev, o) {
                                if ($(this).gfield("option", "disabled"))
                                    return;
                                var value = ($.isPlainObject(o.value) ? o.value.code : o.value);
                                if (!value)
                                    return;
                                value = Gordic.Eko.Filters.Utils.paddValue(value, item.maxLength);
                                value = value.toUpperCase();
                                $(this).gfield("setValue", value);
                            },
                            model: "model." + item.name + "_0=value",
                            strict: false,
                            tabbable: false,
                            buttons: [] //, selector: false
                        });
                        //item.name = item.name.substr(0, item.name.length - 2);
                    });
                    form.addSection({ label: "jres:30250325", customClass: "w-L-12 w-M-12" }) //RC 30250325 : Výstup
                        .addSection().addRow("jres:30250321").addField("gstringbox", { name: "uec_1" }) //RC 30250321 : Okruh
                    ;
                    let detail = $.newDiv("detail-header").appendTo(this.element).gform("createFrom", form);
                    //var tabHead = $("<div>")
                    //    .appendTo(this.element)
                    //this.defaultForm = this.element;
                    //form.appendTo(tabHead);
                    //var tab = $("<div>")
                    //    .appendTo(this.element)
                    //    .gform("createFrom", defaultForm);
                    ;
                    detail.gmagicprefabsmanager({
                        initializedDataSentence: this.dataSentence
                    });
                    //var tabRadky = $("<div>")
                    //    .appendTo(this.element)
                    // vyplneni hodnotami na vstupu                                     
                    this.fillValues(detail);
                    this.setActions();
                }
                /**
                 * Vytvoreni akci
                 * */
                createActions() {
                    let that = this;
                    that.actions.addRange({
                        actUlozit: Gordic.Eko.Action.actionUlozit({ enabled: false, run: function () { that.save(); } }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({ enabled: true, run: function () { that.tryClose(); } }),
                    });
                }
                /**
                 * Uprava viditelnosti akci
                 *
                 * */
                setActions() {
                    // pokud neni grid, nic nedelej
                    if (this.closed)
                        return;
                    let visible = Ucr.Globals.GUcrGlobals.Rad_Konsolidace === 2 /* Gordic.Uct.Interface.GUcrZobrazeniVdu.AnoEditace */;
                    this.actions.actUlozit.update({ enabled: !this.error, visible: visible });
                }
                /**
                 * Vyplneni dat
                 * @param form
                 */
                fillValues(form) {
                    this.findFields()
                        // { initialValues: true} - nevyvola se udalost change po naplneni dat
                        // verificationNeeded: false  - nevyvola se validace z databaze, zda je hodnota ok
                        .gfield("model", "apply", this.currentRow, { initialValues: true, setFlags: { triggerChange: false } }); // verificationNeeded: false
                    //var view = new Gordic.Data.View<Gordic.Uct.Interface.GUctssudModDto>(this.data);
                }
                /**
                 * Ulozeni dat
                 *
                 * */
                save() {
                    let that = this;
                    let saveDataDto = {};
                    that.beginOperation("jres:30250322"); //RC 30250322 : Probíhá ukládání
                    that.findFields().gfield("model", "collect", saveDataDto); // verificationNeeded: false
                    saveDataDto.por_cislo = that.currentRow.por_cislo;
                    debugger;
                    that.isl.UcrKonsolidaceTransformace.upsert({ row: saveDataDto })
                        .get()
                        .then(() => {
                        that.parentContent.showFlash({ label: "jres:30250323", state: "success" }); //RC 30250323 : Uložení proběhlo v pořádku
                        that.refresh = true;
                        that.tryClose();
                        return;
                    })
                        .always(() => that.endOperation());
                }
                /**
                * Uzavirani okna
                * @returns
                */
                closing() {
                    var that = this;
                    //if (!that.modified) return $.Deferred().resolve().promise();
                    return $.Deferred().resolve({ row: that.currentRow, refresh: that.refresh }).promise();
                }
            };
            GDetailTransformacniPredpis = __decorate([
                gcontent
            ], GDetailTransformacniPredpis);
            WebClient.GDetailTransformacniPredpis = GDetailTransformacniPredpis;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFRyYW5zZm9ybWFjbmlQcmVkcGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbFRyYW5zZm9ybWFjbmlQcmVkcGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0EwUWY7QUExUUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMFFuQjtJQTFRZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMFE3QjtRQTFRb0IsV0FBQSxTQUFTO1lBQzFCOzs7Ozs7aUJBTUs7WUFDTCxJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DLElBQWEsMkJBQTJCLEdBQXhDLE1BQWEsMkJBQTRCLFNBQVEsT0FBQSxZQUFZO2dCQUE3RDs7b0JBQ0ksUUFBRyxHQUFHLDhCQUE4QixDQUFDO29CQUlyQyxtQkFBbUI7b0JBQ1gsWUFBTyxHQUFZLEtBQUssQ0FBQztvQkFDekIsVUFBSyxHQUFZLEtBQUssQ0FBQztnQkF1UG5DLENBQUM7Z0JBalBHLFlBQVk7Z0JBQ1osMkRBQTJEO2dCQUMzRCxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNoQixDQUFDO2dCQUNELGNBQWM7Z0JBRWQsQ0FBQztnQkFDRDs7O3FCQUdLO2dCQUNFLElBQUk7b0JBQ1AsUUFBUSxDQUFDO29CQUNULElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO29CQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLCtCQUErQjtvQkFFL0IsaUJBQWlCO29CQUNqQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLGtCQUFrQjtvQkFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQzt3QkFDWixFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTt3QkFDbEMsRUFBRSxNQUFNLEVBQUUs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Ozs7a0JBR0U7Z0JBQ0ssT0FBTztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLDhEQUE4RDtvQkFDOUQsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUMzRixDQUFDO2FBQ0osQ0FBQTtZQTlQWSwyQkFBMkI7Z0JBRHZDLFFBQVE7ZUFDSSwyQkFBMkIsQ0E4UHZDO1lBOVBZLHFDQUEyQiw4QkE4UHZDLENBQUE7UUFFTCxDQUFDLEVBMVFvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEwUTdCO0lBQUQsQ0FBQyxFQTFRZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMFFuQjtBQUFELENBQUMsRUExUVMsTUFBTSxLQUFOLE1BQU0sUUEwUWYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiAgRGV0YWlsIHRyYW5zZm9ybWFjbmlobyBwcmVkcGlzdVxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiAqL1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxUcmFuc2Zvcm1hY25pUHJlZHBpcyBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudHtcclxuICAgICAgICB1aWQgPSBcIkdEZXRhaWxUcmFuc2Zvcm1hY25pUHJlZHBpcyNcIjtcclxuICAgICAgICAvLyBWc3R1cG5pIHBhcmFtZXRyeVxyXG4gICAgICAgIHByaXZhdGUgY3VycmVudFJvdzogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGRtcGFEdG87XHJcbiAgICAgICAgZGF0YVNlbnRlbmNlOiBHb3JkaWMuRWtvLldlYkNsaWVudC5HRGF0YVNlbnRlbmNlRHRvO1xyXG4gICAgICAgIC8vIG1vZGlmaWthY2UgdWRhanVcclxuICAgICAgICBwcml2YXRlIHJlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIGVycm9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgLy9wcml2YXRlIHR5cEFnOiBudW1iZXI9MDtcclxuICAgICAgICAvL3ByaXZhdGUgZGF0YTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdHNzdWRNb2REdG9bXTtcclxuICAgICAgICBwcml2YXRlIEdsb2JhbHM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JHbG9iYWxEdG87XHJcbiAgICAgICAgLy8gY2Z1IHBybyBzZXpuYW1cclxuICAgICAgICBwcml2YXRlIG1vZGlmeUNmdTogR3VpLldlYkFwcC5HR3JpZEZvcm1hdER0bztcclxuICAgICAgICAvLyBwYXJhbWV0cnlcclxuICAgICAgICAvL3ByaXZhdGUgZ2xvYmFsUGFyYW1zOkdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JHbG9iYWxzRHRvO1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIEluaWNpYWxpemFjZSBmb3JtdWxhcmVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoID0gZmFsc2VcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gcG9jYXRlY25pIG5hc3RhdmVuaSBhdHJpYnV0dVxyXG5cclxuICAgICAgICAgICAgLy8gdnl0dm9yZW5pIGFrY2lcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIC8vIHByaWthem92YSBsaXN0YVxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RVbG96aXQgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0WmF2cml0LCBwcmltYXJ5OiB0cnVlIH0sXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoWyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFVsb3ppdCwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgZmlsdGVycyA9IHsgaWNvOiB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08sIGFrdF9wcm9obDogMTAwLCBha3Rpdml0YTogdW5kZWZpbmVkIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDRNM1MxLCBMLTEyLTEyLTAsTC0xMi0xMi0wLCBTLTEyLTEyLTBcIiwgdGFiTGFiZWw6IFwiXCIsIG9wZW5lZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uTmtzfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3Nua3MoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXzBcIixcclxuICAgICAgICAgICAgICAgICAgICAvL21vZGVsRGVmYXVsdHM6IG1vZGVsRGVmYXVsdHMsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwubmtzXzA9dmFsdWUubmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntua3M6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaWN0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJiYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogZmlsdGVycyxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VY3MpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdWNzKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc18wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tb2RlbERlZmF1bHRzOiBtb2RlbERlZmF1bHRzLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnVjc18wPXZhbHVlLnVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7dWNzOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmljdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiYmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlcmlmeTogKG8pID0+IHsgcmV0dXJuIG87IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyBpY286IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LklDTywgYWt0X3Byb2hsOiAxMDAsIGFrdGl2aXRhOiB1bmRlZmluZWQgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VdXMpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdXVzKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c18wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tb2RlbERlZmF1bHRzOiBtb2RlbERlZmF1bHRzLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnV1c18wPXZhbHVlLnV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7dXVzOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmljdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiYmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlcmlmeTogKG8pID0+IHsgcmV0dXJuIG87IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyBpY286IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LklDTywgdWNzOiB1bmRlZmluZWQsIGFrdF9wcm9obDogMTAwLCBha3Rpdml0YTogdW5kZWZpbmVkIH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBjdXN0b21DbGFzczogXCJ3LUwtMTIgdy1NLTEyXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMzA4XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG9waXNcIiB9KSAvL1JDIDMwMjUwMzA4IDogUG9waXNcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbGFiZWw6IFwianJlczozMDI1MDMyNFwiLCBjdXN0b21DbGFzczogXCJ3LUwtMTIgdy1NLTEyXCIgfSkgLy9SQyAzMDI1MDMyNCA6IFZzdHVwXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpLmFkZFJvdyhcImpyZXM6MzAyNTAzMDlcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHsgbmFtZTogXCJkcmRcIiwgZGVjaW1hbHM6IDAsIG1pblZhbHVlOiAwLCBtYXhWYWx1ZTogMTAwIH0pIC8vUkMgMzAyNTAzMDkgOiBEUkRcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMzEwXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiYWNfMFwiIH0pIC8vUkMgMzAyNTAzMTAgOiBEb2tsYWRcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMzExXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwibWRfZGFsXCIgfSkgLy9SQyAzMDI1MDMxMSA6IFN0clxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAvL3ZhciBmb3JtUHJlZmFiID0gR29yZGljLkVrby5XZWJDbGllbnQuR1Bvcml6b3ZhY1ByZWZhYnMuZ2V0TWFnaWNGb3JtUm93cyh0aGlzLmRhdGFTZW50ZW5jZSwge1xyXG4gICAgICAgICAgICAvLyAgICBhdXRvSnVtcDogdHJ1ZSwgbW9kZTogXCJvbmx5SGVscFwiLCBwb3N0Zml4OiBcIl8wXCIsIG9ubHlMb2FkRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgZ2V0T25seUZpZWxkczogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgd2lkdGhGaWVsZDogeyBfZ2xvYmFsOiBcInctM1wiIH0sXHJcbiAgICAgICAgICAgIC8vICAgIHZhbGlkYXRvcnM6IFsgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgZmllbGQpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy92YWx1ZSA9IEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5wYWRkVmFsdWUodmFsdWUsIG9wdGlvbnMuY2Z1Lm1heExlbmd0aCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKCFuZXcgUmVnRXhwKFwiXlswLTl4WF0qJFwiLCBcIlwiKS50ZXN0KHZhbHVlLmNvZGUpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9KV1cclxuICAgICAgICAgICAgLy99KTsgLy8gesOtc2vDoW7DrSBwcmVmYWJ1IGZvcm11bMOhxZllXHJcbiAgICAgICAgICAgIC8vbGV0IHBvbGUgPSBmb3JtUHJlZmFiWzBdLmZpZWxkcztcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcblxyXG4gICAgICAgICAgICAvL2ZvciAodmFyIGkgPSAwOyBpIDwgcG9sZSEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gICAgbGV0IGZpZWxkID0gcG9sZSFbaV07XHJcbiAgICAgICAgICAgIC8vICAgIGlmIChpID09IDApIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGZvcm0uYWRkU2VjdGlvbigpLmFkZFJvdyh7IGxhYmVsOiBmaWVsZC5vcHRpb25zW1wiZGF0YVdvcmRcIl0uWmtyYXRrYX0pO1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIGVsc2VcclxuICAgICAgICAgICAgLy8gICAgICAgIGZvcm0uYWRkU2VjdGlvbigpLmFkZFJvdyhmaWVsZC5vcHRpb25zW1wiZGF0YVdvcmRcIl0uWmtyYXRrYSk7XHJcbiAgICAgICAgICAgIC8vICAgIGZvcm0uYWRkRmllbGQoZmllbGQpO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgdGhhdC5tb2RpZnlDZnUuY29sdW1ucy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5uYW1lID0gaXRlbS5uYW1lLnN1YnN0cigwLCBpdGVtLm5hbWUubGVuZ3RoIC0gMik7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmFkZFNlY3Rpb24oKS5hZGRSb3coaXRlbS5jYXB0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLkVrby5QcmVmYWJzLmNmdSh7IGlzUm96OiBmYWxzZSwgaXNVY3Q6IHRydWUsIGNmdTogaXRlbSB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKHRoaXM6IEhUTUxFbGVtZW50LCBldjogSlF1ZXJ5RXZlbnRPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vT21lemVuaSBkZWxreSBuYSB1cmNpdHkgcG9jZXQgem5ha3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5pbnB1dFRvVXBwZXJDYXNlRnVuYy5hcHBseSh0aGlzLCBbZXZdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZChcIi5nZmllbGQtaW5wdXRcIikuYXR0cihcIm1heGxlbmd0aFwiLCBpdGVtLm1heExlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2OiBKUXVlcnlFdmVudE9iamVjdCwgbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gKCQuaXNQbGFpbk9iamVjdChvLnZhbHVlKSA/IG8udmFsdWUuY29kZSA6IG8udmFsdWUpIGFzIHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLnBhZGRWYWx1ZSh2YWx1ZSwgaXRlbS5tYXhMZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLlwiICsgaXRlbS5uYW1lICsgXCJfMD12YWx1ZVwiLCAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJiYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtdLy8sIHNlbGVjdG9yOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy9pdGVtLm5hbWUgPSBpdGVtLm5hbWUuc3Vic3RyKDAsIGl0ZW0ubmFtZS5sZW5ndGggLSAyKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmb3JtLmFkZFNlY3Rpb24oeyBsYWJlbDogXCJqcmVzOjMwMjUwMzI1XCIsIGN1c3RvbUNsYXNzOiBcInctTC0xMiB3LU0tMTJcIiB9KSAvL1JDIDMwMjUwMzI1IDogVsO9c3R1cFxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKS5hZGRSb3coXCJqcmVzOjMwMjUwMzIxXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwidWVjXzFcIiB9KSAvL1JDIDMwMjUwMzIxIDogT2tydWhcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBkZXRhaWwgPSAkLm5ld0RpdihcImRldGFpbC1oZWFkZXJcIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciB0YWJIZWFkID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgIC8vICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgIC8vdGhpcy5kZWZhdWx0Rm9ybSA9IHRoaXMuZWxlbWVudDtcclxuICAgICAgICAgICAgLy9mb3JtLmFwcGVuZFRvKHRhYkhlYWQpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgdGFiID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgIC8vICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgIC8vICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgZGVmYXVsdEZvcm0pO1xyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIGRldGFpbC5nbWFnaWNwcmVmYWJzbWFuYWdlcih7XHJcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplZERhdGFTZW50ZW5jZTogdGhpcy5kYXRhU2VudGVuY2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vdmFyIHRhYlJhZGt5ID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgIC8vICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcblxyXG4gICAgICAgICAgICAvLyB2eXBsbmVuaSBob2Rub3RhbWkgbmEgdnN0dXB1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmZpbGxWYWx1ZXMoZGV0YWlsKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRBY3Rpb25zKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgYWtjaVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RVbG96aXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblVsb3ppdCh7IGVuYWJsZWQ6IGZhbHNlLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5zYXZlKCk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblphdnJpdCh7IGVuYWJsZWQ6IHRydWUsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnRyeUNsb3NlKCk7IH0gfSksXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVwcmF2YSB2aWRpdGVsbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICAvLyBwb2t1ZCBuZW5pIGdyaWQsIG5pYyBuZWRlbGVqXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCApIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IHZpc2libGUgPSBHbG9iYWxzLkdVY3JHbG9iYWxzLlJhZF9Lb25zb2xpZGFjZSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclpvYnJhemVuaVZkdS5Bbm9FZGl0YWNlO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VWxveml0IS51cGRhdGUoeyBlbmFibGVkOiAhdGhpcy5lcnJvciAsIHZpc2libGU6IHZpc2libGUgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5cGxuZW5pIGRhdFxyXG4gICAgICAgICAqIEBwYXJhbSBmb3JtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBmaWxsVmFsdWVzKGZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD4pOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgICAgIC8vIHsgaW5pdGlhbFZhbHVlczogdHJ1ZX0gLSBuZXZ5dm9sYSBzZSB1ZGFsb3N0IGNoYW5nZSBwbyBuYXBsbmVuaSBkYXRcclxuICAgICAgICAgICAgICAgIC8vIHZlcmlmaWNhdGlvbk5lZWRlZDogZmFsc2UgIC0gbmV2eXZvbGEgc2UgdmFsaWRhY2UgeiBkYXRhYmF6ZSwgemRhIGplIGhvZG5vdGEgb2tcclxuXHJcbiAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLmN1cnJlbnRSb3csIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSwgc2V0RmxhZ3M6IHsgdHJpZ2dlckNoYW5nZTogZmFsc2UgfSB9KSAvLyB2ZXJpZmljYXRpb25OZWVkZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3ZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdHNzdWRNb2REdG8+KHRoaXMuZGF0YSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVWxvemVuaSBkYXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgc2F2ZSgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgc2F2ZURhdGFEdG86IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RkbXBhRHRvID0ge307XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMzIyXCIpOyAvL1JDIDMwMjUwMzIyIDogUHJvYsOtaMOhIHVrbMOhZMOhbsOtXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBzYXZlRGF0YUR0bykgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZVxyXG4gICAgICAgICAgICBzYXZlRGF0YUR0by5wb3JfY2lzbG8gPSB0aGF0LmN1cnJlbnRSb3cucG9yX2Npc2xvO1xyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgdGhhdC5pc2wuVWNyS29uc29saWRhY2VUcmFuc2Zvcm1hY2UudXBzZXJ0KHsgcm93OiBzYXZlRGF0YUR0b30pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENvbnRlbnQhLnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzAyNTAzMjNcIiwgc3RhdGU6IFwic3VjY2Vzc1wiIH0pOyAvL1JDIDMwMjUwMzIzIDogVWxvxb5lbsOtIHByb2LEm2hsbyB2IHBvxZnDoWRrdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHRoYXQuZW5kT3BlcmF0aW9uKCkpXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBVemF2aXJhbmkgb2tuYVxyXG4gICAgICAgICogQHJldHVybnNcclxuICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjbG9zaW5nKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vaWYgKCF0aGF0Lm1vZGlmaWVkKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSh7IHJvdzogdGhhdC5jdXJyZW50Um93LCByZWZyZXNoOiB0aGF0LnJlZnJlc2ggfSkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXX0=
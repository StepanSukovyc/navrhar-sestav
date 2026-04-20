"use strict";
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
            let GDetailObdobi = 
            /**
             *  Detail zna. obdobi dph
             */
            class GDetailObdobi extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /**
                     * Obecne property
                     *
                     *
                     */
                    this.myLoading = false;
                    this.cancel = true;
                    this.refresh = false;
                }
                prepareContent(vstup) {
                    // nastaveni atributu tridy
                    var that = this;
                    that.cancel = true;
                    that.rok = vstup.rok;
                    that.ico = vstup.ico;
                    that.agenda = vstup.agenda;
                    that.operace = vstup.operace;
                    that.GlobalParams = vstup.globalParams;
                    // doplnění prvků do tabu
                    //var form = new Gordic.Forms.Form({ name: "formDetail", layoutDescriptor: "L2M2S1" })
                    var form = new Gordic.Forms.Form({ name: "formDetailObdobi", layoutDescriptor: "L1M1S1 M-3-9-0 L-3-9-0 breaks-400-500" })
                        .addField("gdummyfield", "w-h", {
                        model: "radek",
                        name: "radek"
                    })
                        .addRow("Rok")
                        .addField("gnumberbox", "w-8", { name: "rok", disabled: true })
                        .addRow("Měsíc")
                        .addField("gnumberbox", "w-8", { name: "mesic", disabled: true })
                        .addRow("UCS")
                        .addField("gselectbox", "w-8", {
                        itemTemplate: "{ucs}",
                        name: "ucs",
                        disabled: vstup.operace !== 10 /* Gordic.Inu.Interface.GEOperaceSObdobim.OtevreniObdobi */,
                        strict: false,
                        validators: [new Gordic.Validators.Required()],
                        initialValue: {},
                        model: "ucs=ucs;",
                        helperColumns: ["ucs"],
                        serverFilters: { ico: vstup.ico, aktivita: 100, },
                        change: function (ev, changeObj) {
                            // vycisteni policka lic
                            that
                                .findFields("lic")
                                .gfield("clear");
                            var ucs = changeObj.value == null ? "" : changeObj.value.ucs;
                            var data = that.findFields("lic").gfield("option", "data");
                            that.findFields("lic").gfield("option", "disabled", true);
                            // nacteni dat
                            var data = data.getData({ rok: that.rok, ico: that.ico, ucs: ucs }, undefined, that.findFields("lic"));
                            data.done((result) => {
                                // nastaveni hodnoty dle 1. sloupce
                                if (result.length > 0)
                                    that.findFields("lic").gfield("setValue", result[0], true);
                                // bude mozno zmenit, pokud bude vice licenci
                                that.findFields("lic").gfield("option", "disabled", result.length < 2);
                                // nutno docist
                                if (that.operace == 10 /* Interface.GEOperaceSObdobim.OtevreniObdobi */) {
                                    var value = that.findFields("lic").gfield("getValue");
                                    // dohledani mesice, ktery se muze otevrit
                                    if (value && value.lic)
                                        that.isl.InuObdobi.getObdodobiKOtevreni({
                                            agenda: that.agenda,
                                            lokalita: value.lic,
                                            ucs: ucs
                                        }).get()
                                            .done((result) => {
                                            that.findFields("mesic").gfield("setValue", result);
                                        });
                                }
                            });
                        }
                    }, Gordic.Prefabs.Select.ekosucs())
                        .addRow("Lokalita")
                        .addField("gselectbox", "w-8", Gordic.Prefabs.Select.ekovucl(), {
                        itemTemplate: "{lic}",
                        validators: [new Gordic.Validators.Required()],
                        disabled: true,
                        //visibled: vstup.operace !== Gordic.Inu.Interface.GEOperaceSObdobim.OtevreniObdobi,
                        serverFilters: {
                            ico: vstup.ico, rok: vstup.rok,
                            aktivita: 100,
                            ucs: new Gordic.Forms.Dependency("ucs", (value) => { if (value && value.ucs)
                                return value.ucs;
                            else
                                return ""; }, true),
                        },
                        // zmena gridformatu
                        selectorFormat: new Gordic.Data.GridFormat().addTextColumn({ name: "lic", caption: "jres:30250340" }) //RC 30250340 : Lokalita
                            .addTextColumn({ name: "ucs", caption: "jres:30250338" }) //RC 30250338 : Stř. účtování
                            .addTextColumn({ name: "ico", caption: "jres:30250339" }), //RC 30250339 : IČO
                        name: "lic",
                        strict: false,
                        initialValue: {},
                        model: "lic=lic;",
                        helperColumns: ["lic"],
                    })
                        //.addRow("UCS")
                        //.addField("gstringbox", "w-8",
                        //    { name: "ucs", disabled: true })
                        .addRow({ label: "Stav", name: "mystav", customClass: "sc_mystav" })
                        .addField("gstringbox", "w-8", { name: "aktivita_txt", disabled: true });
                    var tabHead = $("<div>")
                        .appendTo(this.element);
                    // pro validatory ze serveru
                    this.defaultForm = this.element; //tabHead;
                    form.appendTo(tabHead);
                    //fieldchange
                    // akce seznamu
                    this.actions.addRange({
                        actUlozit: Gordic.Eko.Action.actionOk({
                            enabled: true,
                            caption: that.operace == 10 /* Interface.GEOperaceSObdobim.OtevreniObdobi */ ? "jres:30450014" : that.operace == 20 /* Interface.GEOperaceSObdobim.UzavreniObdobi */ ? "jres:30450015" : "jres:30450016", //RC 30450016 : OK
                            visible: that.operace == 10 /* Interface.GEOperaceSObdobim.OtevreniObdobi */ || that.operace == 20 /* Interface.GEOperaceSObdobim.UzavreniObdobi */,
                            run: () => {
                                var s_dotaz = "Opravdu uložit provedené změny (nevratný krok) ?";
                                that.dialogs.messageBox("Dotaz", s_dotaz, GDlg.mbbYesNo, GDlg.mbiQuestion).createDialogPromise("yes")
                                    .then(function () {
                                    that.cancel = false;
                                    if (that.operace == 10 /* Interface.GEOperaceSObdobim.OtevreniObdobi */) {
                                        if (!that.element.findForms().gform("isValid"))
                                            return;
                                        var value = that.findFields("lic").gfield("getValue");
                                        if (value == null || typeof value.lic == "undefined" || value.lic == null || value.lic.trim() == "") {
                                            that.dialogs.warning("jres:30250343", //RC 30250343 : Upozornění
                                            "jres:30250344"); //RC 30250344 : Lokalita musí být zadána
                                            return;
                                        }
                                        var mesic = that.findFields("mesic").gfield("getValue");
                                        if (typeof mesic == "undefined" || mesic == null || mesic < 1) {
                                            that.dialogs.warning("jres:30250343", //RC 30250343 : Upozornění
                                            "jres:30250348"); //RC 30250348 : Nenalezen měsíc k otevření
                                            return;
                                        }
                                    }
                                    that.tryClose();
                                });
                            }
                        }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: () => {
                                {
                                    that.tryClose();
                                }
                            }
                        }),
                    });
                    // Tlacitko zavrit
                    that.commandBar([
                        { action: this.actions.actUlozit, primary: true },
                        { action: this.actions.actZavrit },
                    ]);
                    if (that.operace == 10 /* Interface.GEOperaceSObdobim.OtevreniObdobi */) {
                        //that.findFields("").
                        //Gordic.Inu.Interface.GEOperaceSObdobim.OtevreniObdobi
                        if (vstup.data == null || typeof vstup.data.ucs === "undefined") {
                            vstup.data = {
                                ico: that.GlobalParams.EkoParams?.ICO, rok: that.GlobalParams.EkoParams?.ROK, lic: that.GlobalParams.EkoParams?.Licence
                            };
                        }
                    }
                    that.findFields()
                        // { initialValues: true} - nevyvola se udalost change po naplneni dat
                        // verificationNeeded: false  - nevyvola se validace z databaze, zda je hodnota ok
                        .gfield("model", "apply", vstup.data, { initialValues: true, setFlags: { triggerChange: false } }); // verificationNeeded: false
                    // dohledani obdobi k otevreni
                    if (that.operace == 10 /* Interface.GEOperaceSObdobim.OtevreniObdobi */) {
                        that.element.find(".sc_mystav").hide();
                        that.findFields("aktivita_txt").hide();
                        if (vstup.data == null || typeof vstup.data.ucs === "undefined") {
                            that.findFields("ucs").gfield("setValue", { ico: that.GlobalParams.EkoParams?.ICO, ucs: that.GlobalParams.EkoParams?.UCS }, true);
                            that.findFields("mesic").gfield("setValue", 1);
                        }
                        else {
                            var value = vstup.data.lic;
                            // dohledani mesice, ktery se muze otevrit
                            if (value)
                                that.isl.InuObdobi.getObdodobiKOtevreni({
                                    agenda: that.agenda,
                                    lokalita: value,
                                    ucs: vstup.data.ucs
                                }).get()
                                    .done((result) => {
                                    that.findFields("mesic").gfield("setValue", result);
                                });
                        }
                    }
                    // focus na prvni editovatelnou bunku
                    this.element.find('.gfield:not(.ui-state-disabled)').first().gfield('focus');
                    //that.element.findFields("vyzva_odp").gfield("setValue", { vyzva_odp: that.model.vyzva_odp }, false);
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                NastaveniAkci() {
                    //if (this.porCislo < 1) {
                    //    // novy zaznam
                    //    this.findFields("dat_zjist_dod").gfield("option", "disabled", this.typPriznani !== Interface.GETypPriznaniDPH.Dodatecne);
                    //}
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    var that = this;
                    var def = $.Deferred();
                    var result = {};
                    this.element.findFields().gfield("model", "collect", result); // naplnění dat z dialogu
                    def.resolve({ data: result, cancel: that.cancel });
                    return def.promise();
                }
            };
            GDetailObdobi = __decorate([
                gcontent
                /**
                 *  Detail zna. obdobi dph
                 */
            ], GDetailObdobi);
            WebClient.GDetailObdobi = GDetailObdobi;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbE9iZG9iaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEZXRhaWxPYmRvYmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQTBSZjtBQTFSRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EwUm5CO0lBMVJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EwUjdCO1FBMVJvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQU1uQyxJQUFhLGFBQWE7WUFIMUI7O2VBRUc7WUFDSCxNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQVk7Z0JBQS9DOztvQkF3Qkk7Ozs7dUJBSUc7b0JBQ0ksY0FBUyxHQUFZLEtBQUssQ0FBQztvQkFDMUIsV0FBTSxHQUFZLElBQUksQ0FBQztvQkFHeEIsWUFBTyxHQUFHLEtBQUssQ0FBQztnQkFpUDNCLENBQUM7Z0JBaFBHLGNBQWMsQ0FBQyxLQUE0TjtvQkFDdk8sMkJBQTJCO29CQUMzQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztvQkFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO29CQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7b0JBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztvQkFFdkMseUJBQXlCO29CQUN6QixzRkFBc0Y7b0JBQ3RGLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUMs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SUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUVuQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBMkIseUJBQXlCO29CQUNqSCxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRyxDQUFDLENBQUM7b0JBQ3hELE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN6QixDQUFDO2FBQ0EsQ0FBQTtZQWxSWSxhQUFhO2dCQUp6QixRQUFRO2dCQUNUOzttQkFFRztlQUNVLGFBQWEsQ0FrUnpCO1lBbFJZLHVCQUFhLGdCQWtSekIsQ0FBQTtRQUNMLENBQUMsRUExUm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTBSN0I7SUFBRCxDQUFDLEVBMVJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEwUm5CO0FBQUQsQ0FBQyxFQTFSUyxNQUFNLEtBQU4sTUFBTSxRQTBSZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuSW51LldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgLyoqXHJcbiAgICAgKiAgRGV0YWlsIHpuYS4gb2Jkb2JpIGRwaFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbE9iZG9iaSBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWpheCBwcm9wZXJ0eVxyXG4gICAgICAgICAqICBcclxuICAgICAgICAgKi9cclxuICAgICAgICAvL3B1YmxpYyBtb2RlbDogR29yZGljLkludS5JbnRlcmZhY2UuR0Vrb2hraGxEdG87XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2xvYmFsbmkgbmFzdGF2ZW5pXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgR2xvYmFsUGFyYW1zOiBHb3JkaWMuSW51LldlYkNsaWVudC5HSW51R2xvYmFsRHRvO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFR5cCBwcml6bmFuaVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIHR5cFByaXpuYW5pOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cFByaXpuYW5pRFBIOyAgICAgICAgXHJcbiAgICAgICAgLy8gcm9rXHJcbiAgICAgICAgcHVibGljIHJvazogbnVtYmVyO1xyXG4gICAgICAgIC8vIGljb1xyXG4gICAgICAgIHB1YmxpYyBpY286IHN0cmluZztcclxuICAgICAgICAvLyBhZ2VuZGFcclxuICAgICAgICBwdWJsaWMgYWdlbmRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRUludUFnZW5kYTtcclxuXHJcbiAgICAgICAgLy8gb3BlcmFjZVxyXG4gICAgICAgIHByaXZhdGUgb3BlcmFjZTogR29yZGljLkludS5JbnRlcmZhY2UuR0VPcGVyYWNlU09iZG9iaW1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JlY25lIHByb3BlcnR5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG15TG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHByaXZhdGUgY2FuY2VsOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHVibGljIHJlZnJlc2ggPSBmYWxzZTtcclxuICAgICAgICBwcmVwYXJlQ29udGVudCh2c3R1cDogeyBpY286IHN0cmluZywgcm9rOiBudW1iZXIsIGFnZW5kYTogR29yZGljLkludS5JbnRlcmZhY2UuR0VJbnVBZ2VuZGEsIGRhdGE6IEdvcmRpYy5JbnUuV2ViQ2xpZW50LkRUTy5HSW51T2Jkb2JpRHRvLCBvcGVyYWNlOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbSxnbG9iYWxQYXJhbXM6R29yZGljLkludS5XZWJDbGllbnQuR0ludUdsb2JhbER0byB9KSB7XHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuaSBhdHJpYnV0dSB0cmlkeVxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoYXQucm9rID0gdnN0dXAucm9rO1xyXG4gICAgICAgICAgICB0aGF0LmljbyA9IHZzdHVwLmljbztcclxuICAgICAgICAgICAgdGhhdC5hZ2VuZGEgPSB2c3R1cC5hZ2VuZGE7XHJcbiAgICAgICAgICAgIHRoYXQub3BlcmFjZSA9IHZzdHVwLm9wZXJhY2U7XHJcbiAgICAgICAgICAgIHRoYXQuR2xvYmFsUGFyYW1zID0gdnN0dXAuZ2xvYmFsUGFyYW1zO1xyXG5cclxuICAgICAgICAgICAgLy8gZG9wbG7Em27DrSBwcnZrxa8gZG8gdGFidVxyXG4gICAgICAgICAgICAvL3ZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtRGV0YWlsXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCIgfSlcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1EZXRhaWxPYmRvYmlcIixsYXlvdXREZXNjcmlwdG9yOlwiTDFNMVMxIE0tMy05LTAgTC0zLTktMCBicmVha3MtNDAwLTUwMFwifSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkdW1teWZpZWxkXCIsIFwidy1oXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJyYWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmFkZWtcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJSb2tcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LThcIixcclxuICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwicm9rXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTcSbc8OtY1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCJtZXNpY1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlVDU1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctOFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcInt1Y3N9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdnN0dXAub3BlcmFjZSAhPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VPcGVyYWNlU09iZG9iaW0uT3RldnJlbmlPYmRvYmksXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaWN0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZToge30sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwidWNzPXVjcztcIixcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJ1Y3NcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyBpY286IHZzdHVwLmljbywgYWt0aXZpdGE6IDEwMCwgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2eWNpc3RlbmkgcG9saWNrYSBsaWNcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmRGaWVsZHMoXCJsaWNcIikgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdWNzID0gY2hhbmdlT2JqLnZhbHVlID09IG51bGwgPyBcIlwiIDogY2hhbmdlT2JqLnZhbHVlIS51Y3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhOiBhbnkgPSB0aGF0LmZpbmRGaWVsZHMoXCJsaWNcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGF0YVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwibGljXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYWN0ZW5pIGRhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGRhdGEuZ2V0RGF0YSh7IHJvazogdGhhdC5yb2ssIGljbzogdGhhdC5pY28sIHVjczogdWNzIH0sIHVuZGVmaW5lZCwgdGhhdC5maW5kRmllbGRzKFwibGljXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW5pIGhvZG5vdHkgZGxlIDEuIHNsb3VwY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJsaWNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcmVzdWx0WzBdLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJ1ZGUgbW96bm8gem1lbml0LCBwb2t1ZCBidWRlIHZpY2UgbGljZW5jaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwibGljXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHJlc3VsdC5sZW5ndGg8Mik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBudXRubyBkb2Npc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm9wZXJhY2UgPT0gSW50ZXJmYWNlLkdFT3BlcmFjZVNPYmRvYmltLk90ZXZyZW5pT2Jkb2JpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhhdC5maW5kRmllbGRzKFwibGljXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvaGxlZGFuaSBtZXNpY2UsIGt0ZXJ5IHNlIG11emUgb3RldnJpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5saWMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLkludU9iZG9iaS5nZXRPYmRvZG9iaUtPdGV2cmVuaSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2VuZGE6IHRoYXQuYWdlbmRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGxva2FsaXRhOiB2YWx1ZS5saWNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdWNzOiB1Y3MhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcIm1lc2ljXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc3VjcygpKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkxva2FsaXRhXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy04XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la292dWNsKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie2xpY31cIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmlzaWJsZWQ6IHZzdHVwLm9wZXJhY2UgIT09IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFT3BlcmFjZVNPYmRvYmltLk90ZXZyZW5pT2Jkb2JpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB2c3R1cC5pY28sIHJvazogdnN0dXAucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLCAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcInVjc1wiLCAodmFsdWUpID0+IHsgaWYgKHZhbHVlICYmIHZhbHVlLnVjcykgcmV0dXJuIHZhbHVlLnVjczsgZWxzZSByZXR1cm4gXCJcIjsgfSwgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyB6bWVuYSBncmlkZm9ybWF0dVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yRm9ybWF0OiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImxpY1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNDBcIiB9KSAvL1JDIDMwMjUwMzQwIDogTG9rYWxpdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInVjc1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzMzhcIiB9KSAvL1JDIDMwMjUwMzM4IDogU3TFmS4gw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpY29cIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzM5XCIgfSksIC8vUkMgMzAyNTAzMzkgOiBJxIxPXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsaWNcIiwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmljdDogZmFsc2UsICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHt9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJsaWM9bGljO1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcImxpY1wiXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJVQ1NcIilcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctOFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgeyBuYW1lOiBcInVjc1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJTdGF2XCIsIG5hbWU6IFwibXlzdGF2XCIsIGN1c3RvbUNsYXNzOlwic2NfbXlzdGF2XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LThcIixcclxuICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwiYWt0aXZpdGFfdHh0XCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0YWJIZWFkID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgLy8gcHJvIHZhbGlkYXRvcnkgemUgc2VydmVydVxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtID0gdGhpcy5lbGVtZW50Oy8vdGFiSGVhZDtcclxuICAgICAgICAgICAgZm9ybS5hcHBlbmRUbyh0YWJIZWFkKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vZmllbGRjaGFuZ2VcclxuICAgICAgICAgICAgLy8gYWtjZSBzZXpuYW11XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGFjdFVsb3ppdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uT2soe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhhdC5vcGVyYWNlID09IEludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbS5PdGV2cmVuaU9iZG9iaSA/IFwianJlczozMDQ1MDAxNFwiIDogdGhhdC5vcGVyYWNlID09IEludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbS5VemF2cmVuaU9iZG9iaSA/IFwianJlczozMDQ1MDAxNVwiIDogXCJqcmVzOjMwNDUwMDE2XCIsIC8vUkMgMzA0NTAwMTYgOiBPS1xyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoYXQub3BlcmFjZSA9PSBJbnRlcmZhY2UuR0VPcGVyYWNlU09iZG9iaW0uT3RldnJlbmlPYmRvYmkgfHwgdGhhdC5vcGVyYWNlID09IEludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbS5VemF2cmVuaU9iZG9iaSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzX2RvdGF6ID0gXCJPcHJhdmR1IHVsb8W+aXQgcHJvdmVkZW7DqSB6bcSbbnkgKG5ldnJhdG7DvSBrcm9rKSA/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiRG90YXpcIiwgc19kb3RheiwgR0RsZy5tYmJZZXNObywgR0RsZy5tYmlRdWVzdGlvbikuY3JlYXRlRGlhbG9nUHJvbWlzZShcInllc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYW5jZWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5vcGVyYWNlID09IEludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbS5PdGV2cmVuaU9iZG9iaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5nZm9ybShcImlzVmFsaWRcIikpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhhdC5maW5kRmllbGRzKFwibGljXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUubGljID09IFwidW5kZWZpbmVkXCIgfHwgdmFsdWUubGljID09IG51bGwgfHwgKHZhbHVlLmxpYyBhcyBzdHJpbmcpLnRyaW0oKSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Mud2FybmluZyhcImpyZXM6MzAyNTAzNDNcIiwgLy9SQyAzMDI1MDM0MyA6IFVwb3pvcm7Em27DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMDI1MDM0NFwiKTsgLy9SQyAzMDI1MDM0NCA6IExva2FsaXRhIG11c8OtIGLDvXQgemFkw6FuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXNpYyA9IHRoYXQuZmluZEZpZWxkcyhcIm1lc2ljXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lc2ljID09IFwidW5kZWZpbmVkXCIgfHwgbWVzaWMgPT0gbnVsbCB8fCBtZXNpYyA8IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwianJlczozMDI1MDM0M1wiLCAvL1JDIDMwMjUwMzQzIDogVXBvem9ybsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMzQ4XCIpOyAvL1JDIDMwMjUwMzQ4IDogTmVuYWxlemVuIG3Em3PDrWMgayBvdGV2xZllbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF2cml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoYXQudHJ5Q2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIFRsYWNpdGtvIHphdnJpdFxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RVbG96aXQsIHByaW1hcnk6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0WmF2cml0IH0sXHJcblxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgaWYgKHRoYXQub3BlcmFjZSA9PSBJbnRlcmZhY2UuR0VPcGVyYWNlU09iZG9iaW0uT3RldnJlbmlPYmRvYmkpIHtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5maW5kRmllbGRzKFwiXCIpLlxyXG4gICAgICAgICAgICAgICAgLy9Hb3JkaWMuSW51LkludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbS5PdGV2cmVuaU9iZG9iaVxyXG4gICAgICAgICAgICAgICAgaWYgKHZzdHVwLmRhdGE9PW51bGx8fCB0eXBlb2YgdnN0dXAuZGF0YS51Y3MgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2c3R1cC5kYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoYXQuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uSUNPLCByb2s6IHRoYXQuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LLCBsaWM6IHRoYXQuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uTGljZW5jZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKVxyXG4gICAgICAgICAgICAgICAgLy8geyBpbml0aWFsVmFsdWVzOiB0cnVlfSAtIG5ldnl2b2xhIHNlIHVkYWxvc3QgY2hhbmdlIHBvIG5hcGxuZW5pIGRhdFxyXG4gICAgICAgICAgICAgICAgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZSAgLSBuZXZ5dm9sYSBzZSB2YWxpZGFjZSB6IGRhdGFiYXplLCB6ZGEgamUgaG9kbm90YSBva1xyXG5cclxuICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHZzdHVwLmRhdGEsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSwgc2V0RmxhZ3M6IHsgdHJpZ2dlckNoYW5nZTogZmFsc2UgfSB9KTsgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZG9obGVkYW5pIG9iZG9iaSBrIG90ZXZyZW5pXHJcbiAgICAgICAgICAgIGlmICh0aGF0Lm9wZXJhY2UgPT0gSW50ZXJmYWNlLkdFT3BlcmFjZVNPYmRvYmltLk90ZXZyZW5pT2Jkb2JpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZChcIi5zY19teXN0YXZcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiYWt0aXZpdGFfdHh0XCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGlmICh2c3R1cC5kYXRhID09IG51bGwgfHx0eXBlb2YgdnN0dXAuZGF0YS51Y3MgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ1Y3NcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBpY286IHRoYXQuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uSUNPLCB1Y3M6IHRoYXQuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uVUNTIH0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcIm1lc2ljXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdnN0dXAuZGF0YS5saWM7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9obGVkYW5pIG1lc2ljZSwga3Rlcnkgc2UgbXV6ZSBvdGV2cml0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5JbnVPYmRvYmkuZ2V0T2Jkb2RvYmlLT3RldnJlbmkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdlbmRhOiB0aGF0LmFnZW5kYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBsb2thbGl0YTogdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdWNzOiB2c3R1cC5kYXRhLnVjcyFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJtZXNpY1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBmb2N1cyBuYSBwcnZuaSBlZGl0b3ZhdGVsbm91IGJ1bmt1XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZCgnLmdmaWVsZDpub3QoLnVpLXN0YXRlLWRpc2FibGVkKScpLmZpcnN0KCkuZ2ZpZWxkKCdmb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgLy90aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcInZ5enZhX29kcFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IHZ5enZhX29kcDogdGhhdC5tb2RlbC52eXp2YV9vZHAgfSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHByaXN0dXBub3N0aSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIE5hc3RhdmVuaUFrY2koKSB7XHJcblxyXG4gICAgICAgICAgICAvL2lmICh0aGlzLnBvckNpc2xvIDwgMSkge1xyXG4gICAgICAgICAgICAvLyAgICAvLyBub3Z5IHphem5hbVxyXG4gICAgICAgICAgICAvLyAgICB0aGlzLmZpbmRGaWVsZHMoXCJkYXRfemppc3RfZG9kXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRoaXMudHlwUHJpem5hbmkgIT09IEludGVyZmFjZS5HRVR5cFByaXpuYW5pRFBILkRvZGF0ZWNuZSk7XHJcblxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVemF2aXJhbmkgb2tuYVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+ICB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgcmVzdWx0KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXBsbsSbbsOtIGRhdCB6IGRpYWxvZ3VcclxuICAgICAgICAgICAgZGVmLnJlc29sdmUoeyBkYXRhOiByZXN1bHQsIGNhbmNlbDogdGhhdC5jYW5jZWwgIH0pO1xyXG4gICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=
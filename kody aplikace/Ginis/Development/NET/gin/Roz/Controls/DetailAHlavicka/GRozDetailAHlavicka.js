"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Roz;
    (function (Roz) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GRozDetailAHlavicka = 
            /**
             *  Detail a-hlavicky
             */
            class GRozDetailAHlavicka extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /**
                     *  Atribut znovunacteni seznamu
                     */
                    this.reloadSeznam = false;
                    // preview mod
                    this.preview = false;
                }
                prepareContent(ixs_ahl) {
                    console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.prepareContent", this);
                    //this.init(ixs_ahl);
                }
                /**
                 * Iniciace kontentu
                 *
                 *
                 */
                init(ixs_ahl = "") {
                    console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.init", this);
                    // This se neustale meni dle objektu. Zde si tedy ulozim odkaz na cely Content
                    var that = this;
                    let def = $.Deferred();
                    if (ixs_ahl != "") {
                        that.preview = true;
                        that.ixs_ahl = ixs_ahl;
                        that.isl.RozDokladHlavickaA.read({ data: { Identikator: ixs_ahl } })
                            .getData()
                            .then((result) => {
                            that.model = result;
                            def.resolve().promise();
                            return;
                        });
                    }
                    else {
                        def.resolve().promise();
                    }
                    def.then(() => {
                        // Vytvoreni akci
                        if (!that.preview)
                            that.createActions();
                        // Vytvoreni formatu detailu
                        that.createForm();
                        // Predani dat z DTO do policek - metoda apply - https://xwiki.gordic.cz/NET/widgets/gfield#Hmodel-1
                        that.prefillDtoToFields();
                        // preformatovani formulare
                        if (that.preview)
                            that.defaultForm.gform("viewMode", "view");
                        // Prirazeni akci do menu
                        if (!that.preview)
                            that.assigningActions();
                        // vytvoreni statusbaru                
                        that.createStatusBar();
                        // aktualizace statusbaru
                        that.refresStatus();
                    });
                }
                onContentReady() {
                    console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.onContentReady", this);
                    this.init();
                }
                /**
                 * Vytvoreni status baru
                 *
                 */
                createStatusBar() {
                    this.myStatusBar = Gordic.Eko.Detail.StatusBar.createItem({ id: "statusStavHlavicky" });
                    // Vytvoreni Stavoveho radku
                    this.statusBar([
                        this.myStatusBar,
                    ]);
                }
                /**
                 *  Aktualizace stavu
                 *
                 */
                refresStatus() {
                    let customClass = "";
                    if (this.model.AHlavicka?.a_stav === 0) {
                        // porizena
                        customClass = Gordic.Global.Enums.ColorStateClass.success;
                    }
                    else if (this.model.AHlavicka?.a_stav < 20) {
                        //pouzita
                        customClass = Gordic.Global.Enums.ColorStateClass.active;
                    }
                    else if (this.model.AHlavicka?.a_stav > 19) {
                        //uzavrena
                        customClass = Gordic.Global.Enums.ColorStateClass.inactive;
                    }
                    //this.refresStatus()
                    this.myStatusBar.update({ caption: this.model.AHlavicka.a_stav_txt?.toUpperCase(), customClass: "g-state-text " + customClass });
                    //Gordic.Eko.Detail.StatusBar.updateItem(this.myStatusBar/*content.statusStavDokladu*/, this.model!.AHlavicka.a_stav_txt?.toUpperCase()!, customClass.trim());
                }
                /**
                 * Prirazeni akci do menubaru a commandBaru
                 *
                 */
                assigningActions() {
                    let that = this;
                    // Definovane akce pridam do menu (atribut favorite zobrazi polozku v hornim panelu)
                    that.menuBar([
                        { action: that.actions.actUzavrit, favorite: true },
                        { action: that.actions.actOtevritt, favorite: true },
                        { action: that.actions.actObcerstvit, favorite: true },
                        { action: that.actions.actSave, favorite: false },
                    ]);
                    // Pridani akci na commandBar
                    that.commandBar([
                        { action: that.actions.actSave, favorite: true, customClass: "g-button--primary" },
                        { action: that.actions.actClose, favorite: true }
                    ]);
                }
                /**
                 * Udalost uzavirani contentu
                 *
                 *
                 * @returns
                 */
                closing() {
                    let that = this;
                    let formChanged = that.findForms().gform("hasChanged");
                    if (true && formChanged) {
                        // dotaz na zavření bez uložení, protože se něco změnilo
                        return this.dialogs.confirm("jres:30250178" //RC 30250178 : Info
                        , "jres:30250177") //RC 30250177 : Opravdu chcete zavřít detail bez uložení?
                            .createDialogPromise("yes")
                            .then(() => { return that.model.AHlavicka?.ixs_ahl; });
                        //    ("yes", that.reloadSeznam);
                    }
                    else {
                        // pokud se needituje, je možné detail zavřít
                        return $.Deferred().resolve(that.reloadSeznam ? that.model.AHlavicka?.ixs_ahl : "").promise();
                    }
                }
                /**
                 * Znovunacteni
                 *
                 */
                reload() {
                    let that = this;
                    return this.load()
                        .then(() => {
                        that.prefillDtoToFields();
                        return;
                    });
                }
                /**
                 *  Vytvoreni formulare
                 *
                 */
                createForm() {
                    console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.createForm", this);
                    var that = this;
                    let customClass = this.preview ? "bold" : "";
                    var form = new Gordic.Forms.Form({ layoutDescriptor: "L3M2S1, L-3-9-0, M-4-8-0, S-12-12-0", })
                        //.addSection("jres:30250343") //RC 30250343 : Detail A-hlavičky
                        .addPrefab(Gordic.Eko.Detail.Field.fieldPID({ fieldOpt: { name: "ixs_ahl", disabled: true, customClass: customClass } }))
                        .addRow("jres:30250169") //RC 30250169 : Číslo A-hlavičky                
                    ;
                    if (that.preview)
                        form.addField("gstringbox", { name: "a_cislo", customClass: customClass, disabled: that.preview });
                    else
                        form.addField("gnumberbox", {
                            name: "a_cislo", returnType: "string", customClass: customClass, disabled: that.preview,
                            validators: [new Gordic.Validators.Required()], flag: Gordic.Prefabs.Field.Flags.required
                        });
                    form.addRow("jres:30250176") //RC 30250176 : Název
                        .addField("gstringbox", { name: "nazev", customClass: customClass, disabled: that.preview, validators: [new Gordic.Validators.Required()], flag: Gordic.Prefabs.Field.Flags.required })
                        .addRow("jres:30250132") //RC 30250132 : Druh
                        .addField("gselectbox", Gordic.Prefabs.Select.rozcadr(), //ziskani definice policka, viz: https://xwiki.gordic.cz/NET/javascript/Gordic.Prefabs.Select/
                    {
                        name: "a_druh",
                        dropdown: true,
                        disabled: that.preview, customClass: customClass,
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        model: "model.a_druh=value.a_druh", //oznaceni, ktere hodnoty z DTO/modelu se maji nacist do tohoto pole, viz: https://xwiki.gordic.cz/NET/widgets/gfield#HZE1kladnEDtextovE9definice
                        change: function (ev, changeObj) {
                            console.log("a_druh changed", changeObj.value);
                        }
                    })
                        .addSection()
                        .addRow("jres:30250171").addField("gnumberbox", //RC 30250171 : Příjem
                    Gordic.Prefabs.Number.currency(), { name: "c0", disabled: that.preview, customClass: customClass, })
                        .addRow("jres:30250172").addField("gnumberbox", //RC 30250172 : Výdej
                    Gordic.Prefabs.Number.currency(), { name: "c1", disabled: that.preview, customClass: customClass, })
                        .addRow("jres:30250346").addField("gnumberbox", //RC 30250346 : Schválené příjmy
                    Gordic.Prefabs.Number.currency(), { name: "c0_upl", disabled: true, customClass: customClass })
                        .addRow("jres:30250347").addField("gnumberbox", //RC 30250347 : Schválené výdaje
                    Gordic.Prefabs.Number.currency(), { name: "c1_upl", disabled: true, customClass: customClass })
                        .addSection("")
                        .addRow("jres:30250345") //RC 30250345 : Fiskální rok
                        .addField("gnumberbox", { name: "rok", disabled: that.preview, customClass: customClass, })
                        .addRow("jres:30250173").addField("gdatebox", //RC 30250173 : Evidováno
                    {
                        name: "dat_evid",
                        disabled: that.preview, customClass: customClass,
                    })
                        .addRow("jres:30250174").addField("gdatebox", //RC 30250174 : Zpracovat do
                    {
                        name: "dat_zpr",
                        disabled: that.preview, customClass: customClass
                    })
                        .addSection({ layoutDescriptor: Gordic.Eko.Detail.headerLayoutDescriptorPopis })
                        .addRow("jres:30150037") //RC 30150037 : Popis
                        .addField("gstringbox", { name: "popis" /*, rows: 3 */, disabled: that.preview, customClass: customClass, });
                    that.defaultForm = $.newDiv()
                        .appendTo(this.contentDiv)
                        .gform("createFrom", form);
                    ;
                    ;
                    //form.appendTo(that.defaultForm);
                    var tabRadky = $.newDiv()
                        .appendTo(this.element)
                        .gtab({
                        title: "jres:30250340", //RC 30250340 : Doklady
                        opened: true,
                        menuBar: that.preview ? undefined : [
                            { action: that.actions.actDetail, favorite: true },
                        ]
                    });
                    $.newDiv('js-rozgrid-doklady')
                        .css("height", "100%")
                        .appendTo(tabRadky)
                        .ggrid({
                        columnMode: "full",
                        multi: false,
                        marking: false,
                        columns: that.creteGridFormat(),
                        defaultAction: that.preview ? undefined : that.actions.actDetail, // vychozi akce gridu pro akcni vyber (dvojklik, enter atd)
                    }).gautofit();
                }
                /**
                 * Vytvoreni gridformatu
                 *
                 * @returns
                 */
                creteGridFormat() {
                    console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.creteGridFormat", this);
                    // Vsechny metody jsou v Gordic.Eko.WebClient/Eko/Seznam/grid.methods.ts
                    // Prazdne pole sloupcu pro grid
                    let columns = new Gordic.Data.GridFormat()
                        // Data z hlavicky dokladu 
                        .addPid() //, { fragment: Gordic.Uct.Interface.ixp });
                        .addAgendoveCislo()
                        .addEvidencniCislo()
                        .addDruhDokladu()
                        .addRok()
                        .addMesic()
                        .addDen()
                        .addCisloDokladu() //, { fragment: Gordic.Uct.Interface.ac_ixe });
                        .addTypDokladu() //, { fragment: Gordic.Uct.Interface.ixs_typ_txt });
                        .addStavDokladu() //, { fragment: Gordic.Uct.Interface.s_zau_txt });
                        .addCastka({ name: "c", field: "c", description: "jres:30250258" }) //, { fragment: Gordic.Uct.Interface.c }); //RC 30250258 : částka na dokladu
                        .addZpracovatel({ fragment: "*" /* Gordic.Uct.Interface.GRozSeznamDokladuDtoFragments.ixs_fun_akt_txt */ }) //, { fragment: Gordic.Uct.Interface.ixs_fun_akt_txt });
                        .addPopis();
                    return columns;
                }
                /**
                 * Vraci objekt gridu
                 * @returns
                 */
                getGrid(content) {
                    var data = content.element.find(".ggrid.js-rozgrid-doklady");
                    return (data.length == 0 ? null : data);
                }
                /**
                 * Naplneni hodnto formulare hodnotami ze servery
                 *
                 */
                prefillDtoToFields() {
                    console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.prefillDtoToFields", this);
                    let that = this;
                    // Predani dat z DTO do policek - metoda apply - https://xwiki.gordic.cz/NET/widgets/gfield#Hmodel-1
                    that.findFields()
                        .gfield("model", "apply", that.model.AHlavicka, { initialValues: true, setFlags: { triggerChange: false } }) // Predani modelu (z c#: ContentValues.AddObject("model", model);
                    ; // .gfield("model", "validators", that.validators); // Predani validatoru (z c#: ContentValues.AddObject("validators", model.GetValidators()); 
                    var gridDoklady = this.getGrid(this);
                    var seznam = [];
                    if (this.model.SeznamDokladu && this.model.SeznamDokladu.length > 0 && gridDoklady !== null)
                        seznam = this.model.SeznamDokladu;
                    if (gridDoklady !== null)
                        gridDoklady.ggrid("setData", new Gordic.Data.View(seznam, { key: "ixp" }), true);
                    that.nastaveniPovoleniAkci();
                }
                /**
                 * Nastaveni pristupnosti akci dle permissions
                 *
                 */
                nastaveniPovoleniAkci() {
                    let that = this;
                    that.actions.actUzavrit?.updatePermission(that.model.Permisions?.CanClose);
                    that.actions.actOtevritt?.updatePermission(that.model.Permisions?.CanOpen);
                    that.actions.actSave?.updatePermission(that.model.Permisions?.CanSave);
                }
                /**
                 * Definice akci na formulari
                 *
                 */
                createActions() {
                    console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.createActions", this);
                    var that = this;
                    var that = this;
                    that.actions.addRange({
                        actObcerstvit: Gordic.Eko.Action.actionObcerstvit({
                            enabled: true, run: function (ev, ctx) {
                                console.log("actObcerstvit", ctx);
                                that.reload();
                            }
                        }),
                        actSave: Gordic.Eko.Action.actionUlozit({
                            enabled: true,
                            run: function () {
                                // Zde volam pouze ulozeni v porizovaci, cela akce je volana v ramci metody ggridroweditor.save()
                                this.setPending(that.saveDetail());
                            }
                        }),
                        actUzavrit: {
                            name: "actUzavrit",
                            caption: "jres:30250180", //RC 30250180 : Uzavřít
                            tooltip: "jres:30250181", //RC 30250181 : Uzavření hlavičky
                            enabled: true,
                            //icon: Gordic.Gin.Icons.ActionEnum.uzavrit,
                            run: function (ev, ctx) {
                                console.log("uzavrit hlavicku");
                                let mythis = this;
                                Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250336".format(that.model.AHlavicka?.nazev, that.model.AHlavicka?.ixs_ahl)) //RC 30250336 : Opravdu chcete uzavřít hlavičku {0} ({1})?
                                    .then(function (result) {
                                    if (result === "YES") {
                                        mythis.setPending(that.uzavritHlavicku());
                                    }
                                });
                                //that.uzavritHlavicku();
                            }
                        },
                        actOtevritt: {
                            name: "actOtevritt",
                            caption: "jres:30250182", //RC 30250182 : Otevřít
                            tooltip: "jres:30250183", //RC 30250183 : Otevření hlavičky
                            enabled: true,
                            run: function (ev, ctx) {
                                console.log("otevrit hlavicku");
                                let mythis = this;
                                Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250335".format(that.model.AHlavicka?.nazev, that.model.AHlavicka?.ixs_ahl)) //RC 30250335 : Opravdu chcete otevřít hlavičku {0} ({1})?
                                    .then(function (result) {
                                    if (result === "YES") {
                                        mythis.setPending(that.otevritHlavicku());
                                    }
                                });
                            }
                        },
                        actDetail: Gordic.Eko.Action.actionDetail({
                            name: "actDetail",
                            enabled: true,
                            //icon: Gordic.Gin.Icons.ActionEnum.o,
                            run: function (ev, ctx) {
                                console.log("actDetail", ctx);
                                var currentRow;
                                // Dle podminek si zjisti aktivni radek
                                if (ctx.cellInfo != null) { // double click z gridu
                                    currentRow = ctx.cellInfo.data; // data, ze kterych byl vytvoren radek
                                }
                                else if (ctx.comparatorItem != null) { // pokud bylo spuštěno z porovnávače, bude předán comparatorItem
                                    currentRow = ctx.comparatorItem;
                                }
                                else { //jinak je potřeba načíst vysvícený řádek v gridu
                                    // Odkaz na grid mam v modularni promenne $grid
                                    currentRow = Gordic.Eko.Grid.currentRow(that.getGrid(that));
                                }
                                // Pro aktivni radek zobraz detail
                                if (currentRow != null) {
                                    // Otevreni detailu
                                    let $detailWindow = that.navigate([
                                        "Gordic.Roz.WebClient.GDetailDokladuTab", // nazev okna detailu (c# nebo ts ?)
                                        {
                                            uid: "DetailDokladu#",
                                            // Vzdy se vytvori nove GPC s konkretni knihou. Tj. i kdyz je pohled pres vsechny knihy, tak pri zobrazeni detailu stojim v knize.
                                            // Podani tedy probiha do knizy, ze ktere je zobrazeny detail
                                            gpc: Gordic.Eko.Utils.createBookGpc(that.gpc, currentRow.ixp_den), // GPC s knihou z aktuálního záznamu
                                            //gridRemoteControl: new Gordic.Components.GridRC(that.$grid)
                                        },
                                    ], {
                                        ixp: currentRow.ixp,
                                        datumZmeny: currentRow.dat_zmena,
                                        //action: action, // Nacteni existujiciho detailu (read) nebo podani noveho dokladu (podani)
                                    });
                                }
                                else
                                    that.dialogs.warning("jres:30250341", //RC 30250341 : Upozornění
                                    "jres:30250342"); //RC 30250342 : Není vybraný řádný řádek
                            }
                        }),
                        actClose: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: function (ev, ctx) {
                                that.tryClose();
                            }
                        })
                    });
                }
                /**
                 * Uzavreni hlavicky
                 * */
                uzavritHlavicku() {
                    var that = this;
                    var deferrer = $.Deferred(); //.promise().always(() => { content.endOperation() });
                    that.beginOperation("jres:30250164"); //RC 30250164 : Probíhá ukládání
                    return Gordic.Isl.RozDokladHlavickaA.uzavrit({ identifikator: that.model.AHlavicka?.ixs_ahl })
                        .get()
                        .then((result) => {
                        // preberu hodnoty
                        that.model = result.data;
                        // obcerstveni formulare
                        that.prefillDtoToFields();
                        that.reloadSeznam = true;
                        that.endOperation();
                        that.showFlash({ label: "jres:30250350", state: "success", id: "XXA" }); //RC 30250350 : Akce provedena
                        that.reload();
                        return deferrer.resolve();
                    }, (jqXHR, type, obj) => {
                        //debugger;
                        that.endOperation();
                    }).always(() => { that.endOperation(); });
                }
                /**
                 * Uzavreni hlavicky
                 * */
                otevritHlavicku() {
                    var that = this;
                    var deferrer = $.Deferred(); //.promise().always(() => { content.endOperation() });
                    that.beginOperation("jres:30250164"); //RC 30250164 : Probíhá ukládání
                    return Gordic.Isl.RozDokladHlavickaA.otevrit({ identifikator: that.model.AHlavicka?.ixs_ahl })
                        .get()
                        .then((result) => {
                        // preberu hodnoty
                        that.model = result.data;
                        // obcerstveni formulare
                        that.prefillDtoToFields();
                        that.reloadSeznam = true;
                        that.endOperation();
                        that.showFlash({ label: "jres:30250350", state: "success", id: "XXA" }) //RC 30250350 : Akce provedena
                        ;
                        that.reload();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, (jqXHR, type, obj) => {
                        //debugger;
                        that.endOperation();
                    }).always(() => { that.endOperation(); });
                }
                /**
                 * Ulozeni zaznamu
                 *
                 * @returns
                 */
                saveDetail() {
                    console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.saveDetail");
                    var that = this;
                    if (!that.element.findForms().gform("isValid"))
                        return $.Deferred().reject().promise();
                    // posbirani hodnot z formulare do dto
                    var dtoSaveData = {};
                    //that.findFields().gfield("model", "collect", dtoSaveData) // verificationNeeded: false             
                    that.findFields()
                        .gfield("model", "collect", dtoSaveData); // Predani modelu (z c#: ContentValues.AddObject("model", model);
                    let vstup = { AHlavicka: dtoSaveData };
                    var deferrer = $.Deferred(); //.promise().always(() => { content.endOperation() });
                    that.beginOperation("jres:30250164"); //RC 30250164 : Probíhá ukládání
                    return Gordic.Isl.RozDokladHlavickaA.upsert(vstup)
                        .get()
                        .then((result) => {
                        // preberu hodnoty
                        that.model = result.data;
                        that.reloadSeznam = true;
                        // obcerstveni formulare
                        that.prefillDtoToFields();
                        that.refresStatus();
                        that.endOperation();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, (jqXHR, type, obj) => {
                        //debugger;
                        that.endOperation();
                    }).always(() => { that.endOperation(); });
                }
            };
            GRozDetailAHlavicka = __decorate([
                gcontent
                /**
                 *  Detail a-hlavicky
                 */
            ], GRozDetailAHlavicka);
            WebClient.GRozDetailAHlavicka = GRozDetailAHlavicka;
        })(WebClient = Roz.WebClient || (Roz.WebClient = {}));
    })(Roz = Gordic.Roz || (Gordic.Roz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JvekRldGFpbEFIbGF2aWNrYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdSb3pEZXRhaWxBSGxhdmlja2EudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQWtuQmY7QUFsbkJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtuQm5CO0lBbG5CZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBa25CN0I7UUFsbkJvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQU1uQyxJQUFhLG1CQUFtQjtZQUhoQzs7ZUFFRztZQUNILE1BQWEsbUJBQW9CLFNBQVEsT0FBQSxZQUFZO2dCQUFyRDs7b0JBY0k7O3VCQUVHO29CQUVLLGlCQUFZLEdBQVksS0FBSyxDQUFDO29CQUN0QyxjQUFjO29CQUNOLFlBQU8sR0FBWSxLQUFLLENBQUM7Z0JBc2xCckMsQ0FBQztnQkE3a0JVLGNBQWMsQ0FBQyxPQUFjO29CQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlEQUF5RCxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUM3RSxxQkFBcUI7Z0JBQ3pCLENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0ksSUFBSSxDQUFDLFVBQWdCLEVBQUU7b0JBRTFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ25FLDhFQUE4RTtvQkFFOUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3ZCLElBQUksT0FBTyxJQUFJLEVBQUUsRUFBRSxDQUFDO3dCQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzt3QkFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7d0JBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxD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QUNKLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN2QztnQkFDakIsQ0FBQzthQUVKLENBQUE7WUExbUJZLG1CQUFtQjtnQkFKL0IsUUFBUTtnQkFDVDs7bUJBRUc7ZUFDVSxtQkFBbUIsQ0EwbUIvQjtZQTFtQlksNkJBQW1CLHNCQTBtQi9CLENBQUE7UUFDTCxDQUFDLEVBbG5Cb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBa25CN0I7SUFBRCxDQUFDLEVBbG5CZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBa25CbkI7QUFBRCxDQUFDLEVBbG5CUyxNQUFNLEtBQU4sTUFBTSxRQWtuQmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlJvei5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIC8qKlxyXG4gICAgICogIERldGFpbCBhLWhsYXZpY2t5XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHUm96RGV0YWlsQUhsYXZpY2thIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDb250ZW50LCBJR0NsaWVudENvbnRlbnQge1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBamF4IHByb3BlcnR5XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgSXhwOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIEl4c0Z1bjogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBpeHNfYWhsOiBzdHJpbmc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIHZhbGlkYXRvcnM6IGFueTtcclxuICAgICAgICBwdWJsaWMgbW9kZWw6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pBSGxhdmlja2FCYXNlUmVzcG9uc2VEdG9cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgQXRyaWJ1dCB6bm92dW5hY3Rlbmkgc2V6bmFtdVxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICBwcml2YXRlIHJlbG9hZFNlem5hbTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHByZXZpZXcgbW9kXHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2aWV3OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JlY25lIHByb3BlcnR5XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIC8vcHVibGljIFNvdXJjZVJlY29yZHM6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdVY3RSb3pQcmV2WmFwaXN5RHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSBteVN0YXR1c0JhcjogR09ic2VydmFibGVPYmplY3Q8TWVudVBhcmFtcz47XHJcblxyXG4gICAgICAgIHB1YmxpYyBwcmVwYXJlQ29udGVudChpeHNfYWhsOnN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdSb3pEZXRhaWxBSGxhdmlja2EucHJlcGFyZUNvbnRlbnRcIiwgdGhpcyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5pbml0KGl4c19haGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5pY2lhY2Uga29udGVudHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgaW5pdChpeHNfYWhsOiBzdHJpbmc9XCJcIik6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3JkaWMuUm96LldlYkNsaWVudC5HUm96RGV0YWlsQUhsYXZpY2thLmluaXRcIiwgdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgc2UgbmV1c3RhbGUgbWVuaSBkbGUgb2JqZWt0dS4gWmRlIHNpIHRlZHkgdWxvemltIG9ka2F6IG5hIGNlbHkgQ29udGVudFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBpZiAoaXhzX2FobCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5peHNfYWhsID0gaXhzX2FobDtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlJvekRva2xhZEhsYXZpY2thQS5yZWFkKHsgZGF0YTogeyBJZGVudGlrYXRvcjogaXhzX2FobCB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlZi50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFZ5dHZvcmVuaSBha2NpXHJcbiAgICAgICAgICAgICAgICBpZighdGhhdC5wcmV2aWV3KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlQWN0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFZ5dHZvcmVuaSBmb3JtYXR1IGRldGFpbHVcclxuICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFByZWRhbmkgZGF0IHogRFRPIGRvIHBvbGljZWsgLSBtZXRvZGEgYXBwbHkgLSBodHRwczovL3h3aWtpLmdvcmRpYy5jei9ORVQvd2lkZ2V0cy9nZmllbGQjSG1vZGVsLTFcclxuICAgICAgICAgICAgICAgIHRoYXQucHJlZmlsbER0b1RvRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBwcmVmb3JtYXRvdmFuaSBmb3JtdWxhcmVcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LnByZXZpZXcpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSEuZ2Zvcm0oXCJ2aWV3TW9kZVwiLCBcInZpZXdcIik7IFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFByaXJhemVuaSBha2NpIGRvIG1lbnVcclxuICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcmV2aWV3KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYXNzaWduaW5nQWN0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHZ5dHZvcmVuaSBzdGF0dXNiYXJ1ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVTdGF0dXNCYXIoKTtcclxuICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIHN0YXR1c2JhcnVcclxuICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzU3RhdHVzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdSb3pEZXRhaWxBSGxhdmlja2Eub25Db250ZW50UmVhZHlcIiwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIHN0YXR1cyBiYXJ1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVTdGF0dXNCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXlTdGF0dXNCYXIgPSBHb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIuY3JlYXRlSXRlbSh7IGlkOiBcInN0YXR1c1N0YXZIbGF2aWNreVwiIH0pO1xyXG4gICAgICAgICAgICAvLyBWeXR2b3JlbmkgU3Rhdm92ZWhvIHJhZGt1XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzQmFyKFtcclxuICAgICAgICAgICAgICAgIHRoaXMubXlTdGF0dXNCYXIsXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgQWt0dWFsaXphY2Ugc3RhdnVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlZnJlc1N0YXR1cygpIHtcclxuICAgICAgICAgICAgbGV0IGN1c3RvbUNsYXNzID0gXCJcIjtcclxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwhLkFIbGF2aWNrYT8uYV9zdGF2ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwb3JpemVuYVxyXG5cclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzID0gR29yZGljLkdsb2JhbC5FbnVtcy5Db2xvclN0YXRlQ2xhc3Muc3VjY2VzcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1vZGVsIS5BSGxhdmlja2E/LmFfc3RhdiEgPCAyMCkge1xyXG4gICAgICAgICAgICAgICAgLy9wb3V6aXRhXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzcyA9IEdvcmRpYy5HbG9iYWwuRW51bXMuQ29sb3JTdGF0ZUNsYXNzLmFjdGl2ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1vZGVsIS5BSGxhdmlja2E/LmFfc3RhdiEgPiAxOSkge1xyXG4gICAgICAgICAgICAgICAgLy91emF2cmVuYVxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3MgPSBHb3JkaWMuR2xvYmFsLkVudW1zLkNvbG9yU3RhdGVDbGFzcy5pbmFjdGl2ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy90aGlzLnJlZnJlc1N0YXR1cygpXHJcbiAgICAgICAgICAgIHRoaXMubXlTdGF0dXNCYXIudXBkYXRlKHsgY2FwdGlvbjogdGhpcy5tb2RlbCEuQUhsYXZpY2thIS5hX3N0YXZfdHh0Py50b1VwcGVyQ2FzZSgpISwgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS10ZXh0IFwiICsgY3VzdG9tQ2xhc3MgfSk7XHJcblxyXG4gICAgICAgICAgICAvL0dvcmRpYy5Fa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKHRoaXMubXlTdGF0dXNCYXIvKmNvbnRlbnQuc3RhdHVzU3RhdkRva2xhZHUqLywgdGhpcy5tb2RlbCEuQUhsYXZpY2thLmFfc3Rhdl90eHQ/LnRvVXBwZXJDYXNlKCkhLCBjdXN0b21DbGFzcy50cmltKCkpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJpcmF6ZW5pIGFrY2kgZG8gbWVudWJhcnUgYSBjb21tYW5kQmFydVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgYXNzaWduaW5nQWN0aW9ucygpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBEZWZpbm92YW5lIGFrY2UgcHJpZGFtIGRvIG1lbnUgKGF0cmlidXQgZmF2b3JpdGUgem9icmF6aSBwb2xvemt1IHYgaG9ybmltIHBhbmVsdSlcclxuICAgICAgICAgICAgdGhhdC5tZW51QmFyKFtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RVemF2cml0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RPdGV2cml0dCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0T2JjZXJzdHZpdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0U2F2ZSwgZmF2b3JpdGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICAvLyBQcmlkYW5pIGFrY2kgbmEgY29tbWFuZEJhclxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RTYXZlLCBmYXZvcml0ZTogdHJ1ZSwgY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RDbG9zZSwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVkYWxvc3QgdXphdmlyYW5pIGNvbnRlbnR1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBmb3JtQ2hhbmdlZCA9IHRoYXQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICBpZiAodHJ1ZSAmJiBmb3JtQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZG90YXogbmEgemF2xZllbsOtIGJleiB1bG/FvmVuw60sIHByb3Rvxb5lIHNlIG7Em2NvIHptxJtuaWxvXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLmNvbmZpcm0oXCJqcmVzOjMwMjUwMTc4XCIgLy9SQyAzMDI1MDE3OCA6IEluZm9cclxuICAgICAgICAgICAgICAgICAgICAsIFwianJlczozMDI1MDE3N1wiKSAvL1JDIDMwMjUwMTc3IDogT3ByYXZkdSBjaGNldGUgemF2xZnDrXQgZGV0YWlsIGJleiB1bG/FvmVuw60/XHJcbiAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoXCJ5ZXNcIilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiB0aGF0Lm1vZGVsLkFIbGF2aWNrYT8uaXhzX2FobCB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAoXCJ5ZXNcIiwgdGhhdC5yZWxvYWRTZXpuYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gcG9rdWQgc2UgbmVlZGl0dWplLCBqZSBtb8W+bsOpIGRldGFpbCB6YXbFmcOtdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHRoYXQucmVsb2FkU2V6bmFtID8gdGhhdC5tb2RlbC5BSGxhdmlja2E/Lml4c19haGwgOiBcIlwiKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSAgICAgICAgXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpub3Z1bmFjdGVuaSBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcmVsb2FkKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVmaWxsRHRvVG9GaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgVnl0dm9yZW5pIGZvcm11bGFyZVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3JkaWMuUm96LldlYkNsaWVudC5HUm96RGV0YWlsQUhsYXZpY2thLmNyZWF0ZUZvcm1cIiwgdGhpcyk7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGN1c3RvbUNsYXNzID0gdGhpcy5wcmV2aWV3ID8gXCJib2xkXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDNNMlMxLCBMLTMtOS0wLCBNLTQtOC0wLCBTLTEyLTEyLTBcIiwgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFNlY3Rpb24oXCJqcmVzOjMwMjUwMzQzXCIpIC8vUkMgMzAyNTAzNDMgOiBEZXRhaWwgQS1obGF2acSNa3lcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkVrby5EZXRhaWwuRmllbGQuZmllbGRQSUQoeyBmaWVsZE9wdDogeyBuYW1lOiBcIml4c19haGxcIiwgZGlzYWJsZWQ6IHRydWUsIGN1c3RvbUNsYXNzOiBjdXN0b21DbGFzcyB9IH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAxNjlcIikgLy9SQyAzMDI1MDE2OSA6IMSMw61zbG8gQS1obGF2acSNa3kgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LnByZXZpZXcpXHJcbiAgICAgICAgICAgICAgICBmb3JtLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiYV9jaXNsb1wiLCBjdXN0b21DbGFzczogY3VzdG9tQ2xhc3MsIGRpc2FibGVkOiB0aGF0LnByZXZpZXcgfSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGZvcm0uYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFfY2lzbG9cIiwgcmV0dXJuVHlwZTogXCJzdHJpbmdcIiwgY3VzdG9tQ2xhc3M6IGN1c3RvbUNsYXNzLCBkaXNhYmxlZDogdGhhdC5wcmV2aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZm9ybS5hZGRSb3coXCJqcmVzOjMwMjUwMTc2XCIpIC8vUkMgMzAyNTAxNzYgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcIm5hemV2XCIsIGN1c3RvbUNsYXNzOiBjdXN0b21DbGFzcywgZGlzYWJsZWQ6IHRoYXQucHJldmlldywgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQgfSkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDEzMlwiKSAvL1JDIDMwMjUwMTMyIDogRHJ1aFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Qucm96Y2FkcigpLCAgICAvL3ppc2thbmkgZGVmaW5pY2UgcG9saWNrYSwgdml6OiBodHRwczovL3h3aWtpLmdvcmRpYy5jei9ORVQvamF2YXNjcmlwdC9Hb3JkaWMuUHJlZmFicy5TZWxlY3QvXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFfZHJ1aFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoYXQucHJldmlldywgY3VzdG9tQ2xhc3M6IGN1c3RvbUNsYXNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuYV9kcnVoPXZhbHVlLmFfZHJ1aFwiLCAvL296bmFjZW5pLCBrdGVyZSBob2Rub3R5IHogRFRPL21vZGVsdSBzZSBtYWppIG5hY2lzdCBkbyB0b2hvdG8gcG9sZSwgdml6OiBodHRwczovL3h3aWtpLmdvcmRpYy5jei9ORVQvd2lkZ2V0cy9nZmllbGQjSFpFMWtsYWRuRUR0ZXh0b3ZFOWRlZmluaWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92aXo6IGh0dHBzOi8veHdpa2kuZ29yZGljLmN6L05FVC93aWRnZXRzL2dmaWVsZCNIY2hhbmdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFfZHJ1aCBjaGFuZ2VkXCIsIGNoYW5nZU9iai52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKSBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMTcxXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLC8vUkMgMzAyNTAxNzEgOiBQxZnDrWplbVxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IG5hbWU6IFwiYzBcIiwgZGlzYWJsZWQ6IHRoYXQucHJldmlldywgY3VzdG9tQ2xhc3M6IGN1c3RvbUNsYXNzLCB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAxNzJcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsLy9SQyAzMDI1MDE3MiA6IFbDvWRlalxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IG5hbWU6IFwiYzFcIiwgZGlzYWJsZWQ6IHRoYXQucHJldmlldywgY3VzdG9tQ2xhc3M6IGN1c3RvbUNsYXNzLCB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAzNDZcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsLy9SQyAzMDI1MDM0NiA6IFNjaHbDoWxlbsOpIHDFmcOtam15XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgbmFtZTogXCJjMF91cGxcIiwgZGlzYWJsZWQ6IHRydWUsIGN1c3RvbUNsYXNzOiBjdXN0b21DbGFzcyB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAzNDdcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsLy9SQyAzMDI1MDM0NyA6IFNjaHbDoWxlbsOpIHbDvWRhamVcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBuYW1lOiBcImMxX3VwbFwiLCBkaXNhYmxlZDogdHJ1ZSwgY3VzdG9tQ2xhc3M6IGN1c3RvbUNsYXNzIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJcIikgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDM0NVwiKSAvL1JDIDMwMjUwMzQ1IDogRmlza8OhbG7DrSByb2tcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgeyBuYW1lOiBcInJva1wiLCBkaXNhYmxlZDogdGhhdC5wcmV2aWV3LCBjdXN0b21DbGFzczogY3VzdG9tQ2xhc3MsIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDE3M1wiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsLy9SQyAzMDI1MDE3MyA6IEV2aWRvdsOhbm9cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X2V2aWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiB0aGF0LnByZXZpZXcsIGN1c3RvbUNsYXNzOiBjdXN0b21DbGFzcyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMTc0XCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwvL1JDIDMwMjUwMTc0IDogWnByYWNvdmF0IGRvXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96cHJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiB0aGF0LnByZXZpZXcsIGN1c3RvbUNsYXNzOiBjdXN0b21DbGFzc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oe2xheW91dERlc2NyaXB0b3I6IEdvcmRpYy5Fa28uRGV0YWlsLmhlYWRlckxheW91dERlc2NyaXB0b3JQb3Bpc30pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAxNTAwMzdcIikgLy9SQyAzMDE1MDAzNyA6IFBvcGlzXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJwb3Bpc1wiLyosIHJvd3M6IDMgKi8sIGRpc2FibGVkOiB0aGF0LnByZXZpZXcsIGN1c3RvbUNsYXNzOiBjdXN0b21DbGFzcywgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuY29udGVudERpdilcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgICAgIDtcclxuO1xyXG4gICAgICAgICAgICAvL2Zvcm0uYXBwZW5kVG8odGhhdC5kZWZhdWx0Rm9ybSk7XHJcbiBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0YWJSYWRreSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDM0MFwiLCAgLy9SQyAzMDI1MDM0MCA6IERva2xhZHlcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogdGhhdC5wcmV2aWV3ID8gdW5kZWZpbmVkIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbCwgZmF2b3JpdGU6IHRydWUgfSwgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJC5uZXdEaXYoJ2pzLXJvemdyaWQtZG9rbGFkeScpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYlJhZGt5KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2luZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5jcmV0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LnByZXZpZXcgPyB1bmRlZmluZWQ6IHRoYXQuYWN0aW9ucy5hY3REZXRhaWwsIC8vIHZ5Y2hvemkgYWtjZSBncmlkdSBwcm8gYWtjbmkgdnliZXIgKGR2b2prbGlrLCBlbnRlciBhdGQpXHJcblxyXG4gICAgICAgICAgICAgICAgfSkuZ2F1dG9maXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBncmlkZm9ybWF0dVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmV0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxVY3QuSW50ZXJmYWNlLkdSb3pTZXpuYW1Eb2tsYWR1RHRvPiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR29yZGljLlJvei5XZWJDbGllbnQuR1JvekRldGFpbEFIbGF2aWNrYS5jcmV0ZUdyaWRGb3JtYXRcIiwgdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIFZzZWNobnkgbWV0b2R5IGpzb3UgdiBHb3JkaWMuRWtvLldlYkNsaWVudC9Fa28vU2V6bmFtL2dyaWQubWV0aG9kcy50c1xyXG4gICAgICAgICAgICAvLyBQcmF6ZG5lIHBvbGUgc2xvdXBjdSBwcm8gZ3JpZFxyXG4gICAgICAgICAgICBsZXQgY29sdW1ucyA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PFVjdC5JbnRlcmZhY2UuR1JvelNlem5hbURva2xhZHVEdG8+KClcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEYXRhIHogaGxhdmlja3kgZG9rbGFkdSBcclxuICAgICAgICAgICAgICAgIC5hZGRQaWQoKSAvLywgeyBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuaXhwIH0pO1xyXG4gICAgICAgICAgICAgICAgLmFkZEFnZW5kb3ZlQ2lzbG8oKVxyXG4gICAgICAgICAgICAgICAgLmFkZEV2aWRlbmNuaUNpc2xvKClcclxuICAgICAgICAgICAgICAgIC5hZGREcnVoRG9rbGFkdSgpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm9rKClcclxuICAgICAgICAgICAgICAgIC5hZGRNZXNpYygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRGVuKClcclxuICAgICAgICAgICAgICAgIC5hZGRDaXNsb0Rva2xhZHUoKSAvLywgeyBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuYWNfaXhlIH0pO1xyXG4gICAgICAgICAgICAgICAgLmFkZFR5cERva2xhZHUoKSAvLywgeyBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuaXhzX3R5cF90eHQgfSk7XHJcbiAgICAgICAgICAgICAgICAuYWRkU3RhdkRva2xhZHUoKSAvLywgeyBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2Uuc196YXVfdHh0IH0pO1xyXG4gICAgICAgICAgICAgICAgLmFkZENhc3RrYSh7IG5hbWU6IFwiY1wiLCBmaWVsZDogXCJjXCIsIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAyNThcIiB9KSAvLywgeyBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuYyB9KTsgLy9SQyAzMDI1MDI1OCA6IMSNw6FzdGthIG5hIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIC5hZGRacHJhY292YXRlbCh7IGZyYWdtZW50OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96U2V6bmFtRG9rbGFkdUR0b0ZyYWdtZW50cy5peHNfZnVuX2FrdF90eHQgfSkgLy8sIHsgZnJhZ21lbnQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLml4c19mdW5fYWt0X3R4dCB9KTtcclxuICAgICAgICAgICAgICAgIC5hZGRQb3BpcygpXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW5zO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSBvYmpla3QgZ3JpZHVcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0R3JpZChjb250ZW50OiBHQ29udGVudCk6IEpRdWVyeTxIVE1MRWxlbWVudD4ge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGNvbnRlbnQuZWxlbWVudC5maW5kKFwiLmdncmlkLmpzLXJvemdyaWQtZG9rbGFkeVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIChkYXRhLmxlbmd0aCA9PSAwID8gbnVsbCBhcyBhbnkgOiBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hcGxuZW5pIGhvZG50byBmb3JtdWxhcmUgaG9kbm90YW1pIHplIHNlcnZlcnlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHByZWZpbGxEdG9Ub0ZpZWxkcygpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3JkaWMuUm96LldlYkNsaWVudC5HUm96RGV0YWlsQUhsYXZpY2thLnByZWZpbGxEdG9Ub0ZpZWxkc1wiLCB0aGlzKTtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gUHJlZGFuaSBkYXQgeiBEVE8gZG8gcG9saWNlayAtIG1ldG9kYSBhcHBseSAtIGh0dHBzOi8veHdpa2kuZ29yZGljLmN6L05FVC93aWRnZXRzL2dmaWVsZCNIbW9kZWwtMVxyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKVxyXG4gICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5tb2RlbC5BSGxhdmlja2EsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSwgc2V0RmxhZ3M6IHsgdHJpZ2dlckNoYW5nZTogZmFsc2UgfSB9KSAvLyBQcmVkYW5pIG1vZGVsdSAoeiBjIzogQ29udGVudFZhbHVlcy5BZGRPYmplY3QoXCJtb2RlbFwiLCBtb2RlbCk7XHJcbiAgICAgICAgICAgICAgICA7Ly8gLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGF0LnZhbGlkYXRvcnMpOyAvLyBQcmVkYW5pIHZhbGlkYXRvcnUgKHogYyM6IENvbnRlbnRWYWx1ZXMuQWRkT2JqZWN0KFwidmFsaWRhdG9yc1wiLCBtb2RlbC5HZXRWYWxpZGF0b3JzKCkpOyBcclxuXHJcbiAgICAgICAgICAgIHZhciBncmlkRG9rbGFkeSA9IHRoaXMuZ2V0R3JpZCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIHNlem5hbTogVWN0LkludGVyZmFjZS5HUm96U2V6bmFtRG9rbGFkdUR0b1tdID0gW107XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLlNlem5hbURva2xhZHUgJiYgdGhpcy5tb2RlbC5TZXpuYW1Eb2tsYWR1Lmxlbmd0aCA+IDAgJiYgZ3JpZERva2xhZHkgIT09IG51bGwpIFxyXG4gICAgICAgICAgICAgICAgc2V6bmFtID0gdGhpcy5tb2RlbC5TZXpuYW1Eb2tsYWR1OyAgICAgICBcclxuICAgICAgICAgICAgaWYgKGdyaWREb2tsYWR5ICE9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgZ3JpZERva2xhZHkuZ2dyaWQoXCJzZXREYXRhXCIsIG5ldyBHb3JkaWMuRGF0YS5WaWV3KHNlem5hbSwgeyBrZXk6IFwiaXhwXCIgfSksIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlQb3ZvbGVuaUFrY2koKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaSBkbGUgcGVybWlzc2lvbnNcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG5hc3RhdmVuaVBvdm9sZW5pQWtjaSgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VXphdnJpdD8udXBkYXRlUGVybWlzc2lvbih0aGF0Lm1vZGVsLlBlcm1pc2lvbnM/LkNhbkNsb3NlKVxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0T3RldnJpdHQ/LnVwZGF0ZVBlcm1pc3Npb24odGhhdC5tb2RlbC5QZXJtaXNpb25zPy5DYW5PcGVuKTtcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFNhdmU/LnVwZGF0ZVBlcm1pc3Npb24odGhhdC5tb2RlbC5QZXJtaXNpb25zPy5DYW5TYXZlKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBha2NpIG5hIGZvcm11bGFyaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3JkaWMuUm96LldlYkNsaWVudC5HUm96RGV0YWlsQUhsYXZpY2thLmNyZWF0ZUFjdGlvbnNcIiwgdGhpcyk7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE9iY2Vyc3R2aXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9iY2Vyc3R2aXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3RPYmNlcnN0dml0XCIsIGN0eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RTYXZlOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25VbG96aXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOmZ1bmN0aW9uICgpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFpkZSB2b2xhbSBwb3V6ZSB1bG96ZW5pIHYgcG9yaXpvdmFjaSwgY2VsYSBha2NlIGplIHZvbGFuYSB2IHJhbWNpIG1ldG9keSBnZ3JpZHJvd2VkaXRvci5zYXZlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuc2F2ZURldGFpbCgpKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RVemF2cml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RVemF2cml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTgwXCIsIC8vUkMgMzAyNTAxODAgOiBVemF2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTAxODFcIiwgLy9SQyAzMDI1MDE4MSA6IFV6YXbFmWVuw60gaGxhdmnEjWt5XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS51emF2cml0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1emF2cml0IGhsYXZpY2t1XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbXl0aGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkRvdGF6KHRoYXQsIFwianJlczozMDI1MDMzNlwiLmZvcm1hdCh0aGF0Lm1vZGVsLkFIbGF2aWNrYT8ubmF6ZXYhLCB0aGF0Lm1vZGVsLkFIbGF2aWNrYT8uaXhzX2FobCEpKSAvL1JDIDMwMjUwMzM2IDogT3ByYXZkdSBjaGNldGUgdXphdsWZw610IGhsYXZpxI1rdSB7MH0gKHsxfSk/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJZRVNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBteXRoaXMuc2V0UGVuZGluZyh0aGF0LnV6YXZyaXRIbGF2aWNrdSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnV6YXZyaXRIbGF2aWNrdSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RPdGV2cml0dDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T3RldnJpdHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxODJcIiwgLy9SQyAzMDI1MDE4MiA6IE90ZXbFmcOtdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDE4M1wiLCAvL1JDIDMwMjUwMTgzIDogT3RldsWZZW7DrSBobGF2acSNa3lcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm90ZXZyaXQgaGxhdmlja3VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBteXRoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uRG90YXoodGhhdCwgXCJqcmVzOjMwMjUwMzM1XCIuZm9ybWF0KHRoYXQubW9kZWwuQUhsYXZpY2thPy5uYXpldiEsIHRoYXQubW9kZWwuQUhsYXZpY2thPy5peHNfYWhsISkpIC8vUkMgMzAyNTAzMzUgOiBPcHJhdmR1IGNoY2V0ZSBvdGV2xZnDrXQgaGxhdmnEjWt1IHswfSAoezF9KT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBcIllFU1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15dGhpcy5zZXRQZW5kaW5nKHRoYXQub3RldnJpdEhsYXZpY2t1KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdERldGFpbDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGV0YWlsKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3REZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLm8sXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdERldGFpbFwiLCBjdHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudFJvdzogR29yZGljLkVrby5JbnRlcmZhY2UuR1JvenNwaWREdG8gfCBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGxlIHBvZG1pbmVrIHNpIHpqaXN0aSBha3Rpdm5pIHJhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHguY2VsbEluZm8gIT0gbnVsbCkgeyAvLyBkb3VibGUgY2xpY2sgeiBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFJvdyA9IGN0eC5jZWxsSW5mby5kYXRhOyAvLyBkYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN0eC5jb21wYXJhdG9ySXRlbSAhPSBudWxsKSB7IC8vIHBva3VkIGJ5bG8gc3B1xaF0xJtubyB6IHBvcm92bsOhdmHEjWUsIGJ1ZGUgcMWZZWTDoW4gY29tcGFyYXRvckl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRSb3cgPSBjdHguY29tcGFyYXRvckl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly9qaW5hayBqZSBwb3TFmWViYSBuYcSNw61zdCB2eXN2w61jZW7DvSDFmcOhZGVrIHYgZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9ka2F6IG5hIGdyaWQgbWFtIHYgbW9kdWxhcm5pIHByb21lbm5lICRncmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Um93ID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkVrby5JbnRlcmZhY2UuR1JvenNwaWREdG8+KHRoYXQuZ2V0R3JpZCh0aGF0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBybyBha3Rpdm5pIHJhZGVrIHpvYnJheiBkZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRSb3cgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RldnJlbmkgZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRkZXRhaWxXaW5kb3cgPSB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuUm96LldlYkNsaWVudC5HRGV0YWlsRG9rbGFkdVRhYlwiLCAvLyBuYXpldiBva25hIGRldGFpbHUgKGMjIG5lYm8gdHMgPylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlkOiBcIkRldGFpbERva2xhZHUjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWemR5IHNlIHZ5dHZvcmkgbm92ZSBHUEMgcyBrb25rcmV0bmkga25paG91LiBUai4gaSBrZHl6IGplIHBvaGxlZCBwcmVzIHZzZWNobnkga25paHksIHRhayBwcmkgem9icmF6ZW5pIGRldGFpbHUgc3RvamltIHYga25pemUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2RhbmkgdGVkeSBwcm9iaWhhIGRvIGtuaXp5LCB6ZSBrdGVyZSBqZSB6b2JyYXplbnkgZGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncGM6IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyh0aGF0LmdwYywgY3VycmVudFJvdy5peHBfZGVuISksIC8vIEdQQyBzIGtuaWhvdSB6IGFrdHXDoWxuw61obyB6w6F6bmFtdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncmlkUmVtb3RlQ29udHJvbDogbmV3IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQyh0aGF0LiRncmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IGN1cnJlbnRSb3cuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXR1bVptZW55OiBjdXJyZW50Um93LmRhdF96bWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hY3Rpb246IGFjdGlvbiwgLy8gTmFjdGVuaSBleGlzdHVqaWNpaG8gZGV0YWlsdSAocmVhZCkgbmVibyBwb2Rhbmkgbm92ZWhvIGRva2xhZHUgKHBvZGFuaSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Mud2FybmluZyhcImpyZXM6MzAyNTAzNDFcIiwgLy9SQyAzMDI1MDM0MSA6IFVwb3pvcm7Em27DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMDI1MDM0MlwiKTsgLy9SQyAzMDI1MDM0MiA6IE5lbsOtIHZ5YnJhbsO9IMWZw6FkbsO9IMWZw6FkZWtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLCBhY3RDbG9zZTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF2cml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVemF2cmVuaSBobGF2aWNreVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSB1emF2cml0SGxhdmlja3UoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTsvLy5wcm9taXNlKCkuYWx3YXlzKCgpID0+IHsgY29udGVudC5lbmRPcGVyYXRpb24oKSB9KTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAxNjRcIik7IC8vUkMgMzAyNTAxNjQgOiBQcm9iw61ow6EgdWtsw6Fkw6Fuw61cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLlJvekRva2xhZEhsYXZpY2thQS51emF2cml0KHsgaWRlbnRpZmlrYXRvcjogdGhhdC5tb2RlbC5BSGxhdmlja2E/Lml4c19haGwgYXMgYW55fSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmViZXJ1IGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbCA9IHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvYmNlcnN0dmVuaSBmb3JtdWxhcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVmaWxsRHRvVG9GaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWxvYWRTZXpuYW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goeyBsYWJlbDogXCJqcmVzOjMwMjUwMzUwXCIsIHN0YXRlOiBcInN1Y2Nlc3NcIiwgaWQ6IFwiWFhBXCIgfSkgLy9SQyAzMDI1MDM1MCA6IEFrY2UgcHJvdmVkZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIChqcVhIUiwgdHlwZSwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKS5hbHdheXMoKCkgPT4geyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXphdnJlbmkgaGxhdmlja3lcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgb3RldnJpdEhsYXZpY2t1KCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdmFyIGRlZmVycmVyID0gJC5EZWZlcnJlZCgpOy8vLnByb21pc2UoKS5hbHdheXMoKCkgPT4geyBjb250ZW50LmVuZE9wZXJhdGlvbigpIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDE2NFwiKTsgLy9SQyAzMDI1MDE2NCA6IFByb2LDrWjDoSB1a2zDoWTDoW7DrVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuUm96RG9rbGFkSGxhdmlja2FBLm90ZXZyaXQoeyBpZGVudGlmaWthdG9yOiB0aGF0Lm1vZGVsLkFIbGF2aWNrYT8uaXhzX2FobCBhcyBhbnkgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmViZXJ1IGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbCA9IHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvYmNlcnN0dmVuaSBmb3JtdWxhcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVmaWxsRHRvVG9GaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWxvYWRTZXpuYW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzAyNTAzNTBcIiwgc3RhdGU6IFwic3VjY2Vzc1wiLGlkOlwiWFhBXCJ9KSAvL1JDIDMwMjUwMzUwIDogQWtjZSBwcm92ZWRlbmFcclxuICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIChqcVhIUiwgdHlwZSwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKS5hbHdheXMoKCkgPT4geyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVsb3plbmkgemF6bmFtdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzYXZlRGV0YWlsKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR29yZGljLlJvei5XZWJDbGllbnQuR1JvekRldGFpbEFIbGF2aWNrYS5zYXZlRGV0YWlsXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5nZm9ybShcImlzVmFsaWRcIikpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAvLyBwb3NiaXJhbmkgaG9kbm90IHogZm9ybXVsYXJlIGRvIGR0b1xyXG5cclxuICAgICAgICAgICAgdmFyIGR0b1NhdmVEYXRhOiBVY3QuSW50ZXJmYWNlLkdSb3pzYWhsT3V0RHRvID0ge307XHJcbiAgICAgICAgICAgIC8vdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGR0b1NhdmVEYXRhKSAvLyB2ZXJpZmljYXRpb25OZWVkZWQ6IGZhbHNlICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKVxyXG4gICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG9TYXZlRGF0YSkgLy8gUHJlZGFuaSBtb2RlbHUgKHogYyM6IENvbnRlbnRWYWx1ZXMuQWRkT2JqZWN0KFwibW9kZWxcIiwgbW9kZWwpO1xyXG4gICAgICAgICAgICBsZXQgdnN0dXA6IFVjdC5JbnRlcmZhY2UuR1JvekFIbGF2aWNrYUNyZWF0ZVJlcXVlc3REdG8gPSB7IEFIbGF2aWNrYTogZHRvU2F2ZURhdGEgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTsvLy5wcm9taXNlKCkuYWx3YXlzKCgpID0+IHsgY29udGVudC5lbmRPcGVyYXRpb24oKSB9KTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAxNjRcIik7IC8vUkMgMzAyNTAxNjQgOiBQcm9iw61ow6EgdWtsw6Fkw6Fuw61cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLlJvekRva2xhZEhsYXZpY2thQS51cHNlcnQodnN0dXApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmViZXJ1IGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsID0gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWxvYWRTZXpuYW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9iY2Vyc3R2ZW5pIGZvcm11bGFyZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJlZmlsbER0b1RvRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNTdGF0dXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGpxWEhSLCB0eXBlLCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkuYWx3YXlzKCgpID0+IHsgdGhhdC5lbmRPcGVyYXRpb24oKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iXX0=
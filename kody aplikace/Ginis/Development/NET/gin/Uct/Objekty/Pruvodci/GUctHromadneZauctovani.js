"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Uct;
    (function (Uct) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            /**
             * Hromadne zauctovani přes průvodce
             *
             * @author Tomas Kares
             * @since 480.1.0.20
             */
            let GUctHromadneZauctovani = class GUctHromadneZauctovani extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "HromadneZauctovani#";
                    this.uzavreniVsechDokladu = false;
                    /** příznak úspěšného ukončení (true-success, false - fail) */
                    this.successClose = false;
                    /**
                     *   Instance Wizarda
                     *
                     * Pruvodce
                     * @type {Wizard}
                     */
                    this.Pruvodce = new Gordic.Wizard();
                    this.nastaveni = {};
                }
                ;
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    let that = this;
                    var zrusitButton = {
                        caption: "Zrušit",
                        action: new GAction({
                            name: "buttonZrusit",
                            run: () => {
                                that.tryClose();
                            }
                        })
                    };
                    var nastaveniButton = {
                        caption: "jres:30250485", //RC 30250485 : Nastavení
                        action: new GAction({
                            name: "buttonNastavit",
                            run: () => {
                                that.formularNastaveni(that, this.nastaveni)
                                    .done((result) => {
                                    if (result == null || typeof result === "undefined") {
                                    }
                                    else {
                                        //for (var item in result) {
                                        //    this.nastaveni.Nastaveni[item] = result[item];
                                        //}
                                        this.nastaveni.Nastaveni = result.Nastaveni;
                                        this.nastaveni.StavUhradyPrimDokladu = result.Nastaveni.StavUhradyPrimDokladu;
                                        this.nastaveni.StavZauctovaniPrimDokladu = result.Nastaveni.StavZauctovaniPrimDokladu;
                                    }
                                });
                            }
                        })
                    };
                    var tiskButton = {
                        caption: "jres:30250057", //RC 30250057 : Tisk
                        action: new GAction({
                            icon: "gi-print g-state-text",
                            name: "actTisk",
                            visible: false,
                            run: () => {
                                alert("Akce není implementována.");
                            }
                        })
                    };
                    //var doplnujiciTlacitka: MenuParams[] = [zrusitButton, zrusitButton];
                    this.Pruvodce.create({
                        content: that
                    }, {
                        // TODO: je možné nějak měnit titulek třeba podle vybraného typu účtování?
                        title: "jres:30250335", //RC 30250335 : Hromadné zaúčtování - průvodce
                        steps: [
                            {
                                caption: "jres:30250456", //RC 30250456 : Kontrola a potvrzení
                                commandBar: {
                                    next: {
                                        caption: "jres:30250498", //RC 30250498 : Proúčtovat vybrané doklady
                                        icon: ""
                                        //icon: "gi-arrow"
                                    }
                                },
                                buttons: [zrusitButton, /*nastaveniButton,*/ tiskButton],
                                create: function (cnt, contentDiv, change) {
                                    // uchování informací o průběhu průvodce
                                    if (that.form == null) { // form ještě neexistuje
                                        that.form = $.newDiv().appendTo(contentDiv) // přidej DIV na můj element
                                            .gcontent([Gordic.Uct.WebClient.GUctHromadneZauctovaniDlg]);
                                        that.myForm = $.content(that.form);
                                    }
                                    // inicializace 1. kroku pruvodce
                                    Gordic.Uct.WebClient.Pruvodce.inicializace(that, contentDiv, true, that.nacteniSeznamuZapisu);
                                    // seznam zápisů
                                    let $grid1ZapisyPohybu = $.newDiv().appendTo(contentDiv)
                                        .gtab({
                                        title: "Zápisy", opened: true, locked: true,
                                    });
                                    that.$zapisy = $.newDiv()
                                        .appendTo($grid1ZapisyPohybu)
                                        .ggrid({
                                        columnMode: "full",
                                        // TODO: upravit:
                                        //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                                        columns: that.GridFormat(),
                                        navigationMode: "row", // row, cell
                                        //marking: true
                                    })
                                        .gautofit();
                                    debugger;
                                    that.nacteniSeznamuZapisu(that);
                                },
                                change: function (cnt, contentDiv, change) {
                                    // deferred object
                                    let defClose = $.Deferred();
                                    if (Gordic.Eko.WebClient.Common.CelkovyPocetRadku(that.$grid) !== 0 && change.task.nextStep === 1) {
                                        cnt.dialogs.confirm("jres:30250369") //RC 30250369 : Toto je nevratná operace. Opravdu chcete provést proúčtování dokladů ?
                                            .on("close", (ev, obj) => {
                                            if (obj === "yes") {
                                                that.myForm.getFormData()
                                                    .done((result) => {
                                                    var nastaveniPrimDokl = result;
                                                    //debugger;
                                                    // precteni navratove hodnoty
                                                    that.nastaveni.StavUhradyPrimDokladu = nastaveniPrimDokl.StavUhradyPrimDokladu;
                                                    that.nastaveni.StavZauctovaniPrimDokladu = nastaveniPrimDokl.StavZauctovaniPrimDokladu;
                                                    that.checkedRows = Gordic.Eko.Grid.checkedRows(that.$grid, true);
                                                    //debugger;
                                                    defClose.resolve();
                                                })
                                                    .fail(() => { defClose.reject(false); });
                                            }
                                            else {
                                                defClose.reject(false);
                                            }
                                        });
                                    }
                                    else {
                                        return defClose.resolve().promise();
                                    }
                                    //defClose.resolve();
                                    return defClose.promise();
                                }
                            },
                            {
                                // fáze 2 - zobrazení výsledku storna
                                caption: "jres:30250437", //RC 30250437 : Výsledek
                                create: function (cnt, contentDiv, change) {
                                    // zpristupneni tlacitek
                                    that.Pruvodce.enableStep(cnt, [{ enabled: false, index: 0 }, { enabled: false, index: 1 }, { enabled: false, index: 2 }], { back: { enabled: false }, next: { enabled: false } });
                                    let html = $.newDiv().appendTo(contentDiv).gform("createFrom", new Gordic.Forms.Form("L1M1S1, L-2-10-0, M-12-12-0, S-12-12-0")
                                        .addSection("jres:30250436") //RC 30250436 : Výsledný seznam dokladů
                                    );
                                    //debugger;
                                    that.Run(html, contentDiv)
                                        .done(function () {
                                        cnt.showFlash({
                                            id: "completeMsg", label: "jres:30250364" //RC 30250364 : Proúčtování dokladů dokončeno
                                            //, icon: "gi-tick"
                                            ,
                                            customClass: "g-state-success",
                                            timer: 5000
                                        });
                                    });
                                },
                                change: function (cnt, contentDiv, change) {
                                }
                            }
                        ],
                        //// závěrečný krok
                        //complete: function (cnt, contentDiv, change) {
                        //    // ukončení průvodce
                        //    that.tryClose();
                        //},
                        custom: {
                            caption: "jres:30250435", //RC 30250435 : Zavřít průvodce
                            tooltip: "jres:30250434", //RC 30250434 : Ukončení průvodce
                            //                    customClass: "gwizard__back",
                            run: function (cnt) {
                                if (that !== null && typeof that.successClose !== "undefined")
                                    that.successClose = true;
                                // ukončení průvodce
                                cnt.tryClose();
                            }
                        }
                    });
                }
                /**
                 *  Formular nastaveni zauctovani
                 *
                 * */
                formularNastaveni(content, nastaveni) {
                    let that = this;
                    let x;
                    var def = $.Deferred();
                    EKOUtils.CallRemoteService(content, "PredvolbyZauctovani", {}, "Gordic.Uct.WebClient.GUctHromadneZauctovani")
                        .done(function (result) {
                        let form = new Gordic.Forms.Form("L1M1S1, L-2-10-0, M-12-12-0, S-12-12-0", {
                            title: "jres:30250486" //RC 30250486 : Nastavení účtování
                        })
                            .addSection("jres:30250487"); //RC 30250487 : Pokračovat ve zpracování, když nastane nesrovnalost:
                        var predvolby = false;
                        result.forEach((polozka, index) => {
                            if (polozka.TypHodnoty === 0 /* Gordic.Uct.Interface.GEUctTypPolicek.Check */) {
                                form.addRow("").addField("gcheck", {
                                    name: polozka.Name,
                                    label: polozka.Describe,
                                    model: polozka.Name + "=value",
                                    initialValue: typeof polozka.Value !== "undefined" && polozka.Value !== 0
                                });
                            }
                            else if (polozka.TypHodnoty === 1 /* Gordic.Uct.Interface.GEUctTypPolicek.List */) {
                                if (!predvolby)
                                    form.addSection("jres:30250488"); //RC 30250488 : Předvolby nastavení prim. dokladů:
                                predvolby = true;
                                // vyplneni pole stavu a dohledeni vybrane hodnoty
                                var idStav = 0;
                                var stavy = [];
                                polozka.Volby.forEach((item, index) => {
                                    //eval("stavy.push({text:'" + item.Name + "'," + polozka.Name + ":" + item.Id + "})");
                                    let s = { text: item.Name };
                                    s[polozka.Name] = item.Id;
                                    stavy.push(s);
                                    if (item.Id == polozka.Value) {
                                        idStav = index;
                                        return;
                                    }
                                });
                                //let initialValue = stavy.filter((s) => {                                
                                //    return s.id === polozka.Value; //idStav
                                //})             //tady si ji vyhledam v poli podle id
                                //    .map((ss) => { ss[ss.name] = ss.id; return ss; })[0]   //a tady si vytvorim tu propertu s hodnotou a vratim první výsledek (vic jich tam asi není, ne?)
                                // seznam
                                form.addRow(polozka.Describe).addField("gselectbox", {
                                    name: polozka.Name,
                                    dropdown: true, multi: false, list: false, itemWidth: "",
                                    itemTemplate: "{text}",
                                    initialValue: /*initialValue,*/ stavy[idStav],
                                    helperColumns: ["text"],
                                    model: "model." + polozka.Name + "=value." + polozka.Name,
                                    data: new Gordic.Data.View(stavy, { key: polozka.Name }),
                                });
                            }
                        });
                        var simpleForm = that.dialogs.simpleForm("jres:30250489", form, {}, $.extend({}, {
                            width: 600, height: 630,
                            commandBar: [
                                {
                                    customClass: "g-button--primary",
                                    action: new GAction({
                                        name: "actOk", caption: GDlg.mbbOk.text, icon: "gi-tick", run: function (ev) {
                                            //var dlg = simpleForm;
                                            //console.log("dlg: ", dlg);
                                            if (simpleForm.gform("isValid", true)) {
                                                var data = data || {};
                                                simpleForm.findFields().gfield("model", "collect", data);
                                                // priprava pole pro ulozeni
                                                let vybraneVolby = [];
                                                let result = {};
                                                result.Nastaveni = {};
                                                for (var vlastnost in data) {
                                                    var typHodnoty = 1 /* Gordic.Uct.Interface.GEUctTypPolicek.List */;
                                                    if (vlastnost.indexOf("Otazka") > -1)
                                                        typHodnoty = 0 /* Gordic.Uct.Interface.GEUctTypPolicek.Check */;
                                                    vybraneVolby.push({ Name: vlastnost, Value: data[vlastnost] /*Describe: "x", TypHodnoty: typHodnoty, ID: 0, Visible:true,Volby:[]*/ });
                                                    result.Nastaveni[vlastnost] = data[vlastnost];
                                                }
                                                EKOUtils.CallRemoteService(that, "UlozitPredvolby", { rq: vybraneVolby }, "Gordic.Uct.WebClient.GUctHromadneZauctovani")
                                                    .done(() => {
                                                    content.showFlash({ label: "jres:30250368", customClass: "g-state-success", timer: 5000 }); //RC 30250368 : Nastavení uloženo
                                                });
                                                result.Nastaveni.StavUhradyPrimDokladu = data.StavUhradyPrimDokladu;
                                                result.Nastaveni.StavZauctovaniPrimDokladu = data.StavZauctovaniPrimDokladu;
                                                //result.Nastaveni.OtazkaDatumUcetnihoPripadu = data.OtazkaDatumUcetnihoPripadu;
                                                //result.Nastaveni.OtazkaDPHDanoveUctyNedanovyDoklad = data.OtazkaDPHDanoveUctyNedanovyDoklad;
                                                simpleForm.gcontent().close(result);
                                            }
                                        }
                                    })
                                },
                                {
                                    action: new GAction({
                                        name: "actZrusit", caption: GDlg.mbbCancel.text, icon: "gi-window-close", run: function (ev) {
                                            //var dlg = simpleForm;
                                            simpleForm.gcontent().close();
                                        }
                                    })
                                }
                            ]
                        }))
                            .on({
                            /*ok: function () {
                                return def.resolve($.content(this).findFields("stavZauc").gfield("getValue"));
                            },*/
                            close: function (ev, data) {
                                if (data)
                                    return def.resolve(data);
                                else
                                    return def.resolve(null);
                            } //bude-li dialog zavren pred udalosti 'ok', dojde ke zruseni generovani
                        });
                    });
                    return def.promise();
                }
                /**
                 * spusteni zauctovani dokladu
                 *
                 * @param {JQuery} $grid grid
                 */
                Run($grid, controlDiv) {
                    let that = this;
                    let def = $.Deferred();
                    if (typeof that.checkedRows === "undefined" || that.checkedRows.length === 0) {
                        that.dialogs.alert("jres:30250490"); //RC 30250490 : Nebyly vybrány žádné doklady k proúčtování
                        return def.reject().promise();
                    }
                    that.beginOperation("jres:30250365"); //RC 30250365 : Probíhá proúčtování vybraných dokladů
                    let rq = { Seznam: that.checkedRows };
                    rq.Nastaveni = this.nastaveni.Nastaveni;
                    rq.StavUhradyPrimDokladu = this.nastaveni.StavUhradyPrimDokladu;
                    rq.StavZauctovaniPrimDokladu = this.nastaveni.StavZauctovaniPrimDokladu;
                    rq.UkoncitVPripadeChyby = this.nastaveni.UkoncitVPripadeChyby;
                    let posupne = false;
                    //debugger;
                    if (!posupne) {
                        // nastavim vsechny dotazy na Ano
                        for (var pol in rq.Nastaveni)
                            rq.Nastaveni[pol] = true;
                        // hromadne uctovani
                        this.Zauctovat(rq)
                            .done((returnData) => {
                            debugger;
                            that.resultRows = returnData;
                            that.$gridComplete = WebClient.Pruvodce.createGrid(that, controlDiv, true);
                            let view = new Gordic.Data.View(that.resultRows, { key: "ixp" });
                            // nastavení dat a překreslení gridu
                            that.$gridComplete.ggrid("setData", view);
                            that.$gridComplete.ggrid("refreshRows");
                            that.$grid = that.$gridComplete;
                        })
                            .always(function () {
                            that.endOperation();
                        });
                        return def.promise();
                    }
                    else {
                        let defer = $.Deferred().resolve().promise(); //vytvorim resolved promise (kazda pozdeji registrovana done() bude zavolana)
                        for (var i = 0; i < rq.Seznam.length; i++) {
                            (function (num) {
                                defer = defer.then(function () {
                                    let vstupDokladu = {};
                                    vstupDokladu.IdMessage = "";
                                    vstupDokladu.Nastaveni.StavUhradyPrimDokladu = rq.StavUhradyPrimDokladu;
                                    vstupDokladu.Nastaveni.StavZauctovaniPrimDokladu = rq.StavZauctovaniPrimDokladu;
                                    vstupDokladu.PidDokladu = rq.Seznam[i].ixp;
                                    vstupDokladu.DatumPosledniZmenyDokladu = rq.Seznam[i].dat_zmena;
                                    return that.ZauctovatPostupne(vstupDokladu);
                                })
                                    .then(function (result) {
                                    // TODO: oznacit radek za zpracovany
                                    let currentRow = rq.Seznam[i];
                                    Gordic.Eko.WebClient.Common.GetView($grid).updateData(currentRow, "update");
                                });
                            })(i);
                        }
                        defer.done(() => {
                            that.endOperation(); //schovani preloaderu
                            return def.resolve();
                        });
                        defer.always(() => {
                            that.endOperation(); //schovani preloaderu
                        });
                        return def.promise();
                    }
                }
                Zauctovat(vstup) {
                    let def = $.Deferred();
                    // @ts-ignore: docasne pro moznost prekladu 84
                    return this.isl.UctDoklad.hromadneZauctovat({ rq: vstup })
                        .get()
                        .done(function (returnData) {
                        debugger;
                        def.resolve(returnData);
                    });
                }
                ZauctovatPostupne(vstup) {
                    let def = $.Deferred();
                    return def.promise();
                }
                /**
                 * Test, jestli je možné okno zavřít
                 *
                 * @returns {JQueryPromise<any>} promise (resolve = je možné zavřít, reject = není možné zavřít)
                 */
                closing() {
                    // ukončení je možné v kterékoliv fázi
                    // TODO: pokud by nebyla obsluha potřeba, tak celou metodu smazat
                    let that = this;
                    // deferred object pro close
                    let defClose = $.Deferred();
                    /*
                    cnt.dialogs.confirm("Opravdu chcete zrušit průvodce?").on("close", (ev, obj: string) => {
                        if (obj === "yes") {
                            that.successClose = false;
        
                        }
                    });*/
                    if (that.successClose === false) {
                        that.dialogs.messageBox("dotaz", "jres:30250339", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 30250339 : Opravdu chcete ukočit průvodce?
                            .on("yes", function () { defClose.resolve(that); })
                            .on("close", defClose.reject);
                        return defClose.promise();
                    }
                    // může se zavřít vždy
                    return defClose.resolve(that).promise();
                }
                GridFormat() {
                    //var that = this;
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addNumberColumn({
                        name: "radek_z",
                        caption: "#",
                        width: 40,
                        fixedWidth: true,
                        sortable: false,
                        customClass: "ui-disabled",
                    })
                        .addTextColumn({
                        name: "nks",
                        //sysColumn: true,
                        caption: Gordic.Consts.DbShortcuts.nks,
                        sortable: false,
                        width: 70,
                    })
                        //Gordic.Consts.DbShortcuts.uus
                        .addSortedEkoCfuSet(this) //LK20170214_1, standardni pouziti cfu (eko sloupcu), this = instance gcontentu
                        .addCurrencyColumn({
                        name: "c0",
                        //structureLead:true,
                        caption: "jres:30250019", //RC 30250019 : MD
                        width: 110,
                        //customClass:"js-castka",
                        sortable: false,
                    })
                        .addCurrencyColumn({
                        name: "c1",
                        caption: "jres:30250131", //RC 30250131 : Dal
                        width: 110,
                        sortable: false,
                    })
                        .addTextColumn({
                        name: "popis",
                        caption: "jres:30250024", //RC 30250024 : Popis
                        width: 300,
                        sortable: false,
                        customClass: "js-popis",
                    });
                    ;
                    return gridFormat;
                }
                /***
                 * grid se seznamem dokladu
                 * */
                getGridDokladu(content) {
                    return content.element.find(".js-WizadrGrid");
                }
                /**
                 * Naplnění seznamu zápisů k pohybu nebo dokladu
                 */
                nacteniSeznamuZapisu(content) {
                    debugger;
                    let that = content;
                    // načtení dat do gridu zápisů
                    // TODO: nejsou špatně DTO ve volání metod?
                    if (typeof that.$zapisy === "undefined")
                        return;
                    var $grid = that.getGridDokladu(content);
                    if (typeof $grid === "undefined" || $grid === null)
                        return;
                    let aktHlavickaP = Gordic.Eko.Grid.currentRow($grid);
                    if (aktHlavickaP !== null) {
                        //that.beginOperation("jres:30250541"); //RC 30250541 : Načítám...
                        let myfiltr = { ixp: aktHlavickaP.ixp };
                        // @ts-ignore: docasne pro moznost prekladu 84
                        that.isl.UctDokladZapis.list({ filters: myfiltr }).getData()
                            .done(function (seznamZapisuDokladu) {
                            //debugger;
                            var view = new Gordic.Data.View(seznamZapisuDokladu, { key: "ixp,radek_z" });
                            that.$zapisy.ggrid("setData", view, true);
                        })
                            .always(() => {
                            //    that.endOperation()
                        });
                    }
                }
            };
            GUctHromadneZauctovani = __decorate([
                gcontent
            ], GUctHromadneZauctovani);
            WebClient.GUctHromadneZauctovani = GUctHromadneZauctovani;
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjdEhyb21hZG5lWmF1Y3RvdmFuaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdVY3RIcm9tYWRuZVphdWN0b3ZhbmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQTBvQmY7QUExb0JELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTBvQm5CO0lBMW9CZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMG9CN0I7UUExb0JvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUVuQzs7Ozs7ZUFLRztZQUVILElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEsT0FBQSxZQUFZO2dCQUF4RDs7b0JBRUksUUFBRyxHQUFHLHFCQUFxQixDQUFDO29CQVVwQix5QkFBb0IsR0FBWSxLQUFLLENBQUM7b0JBb0I5Qyw4REFBOEQ7b0JBQ3ZELGlCQUFZLEdBQVksS0FBSyxDQUFDO29CQUVyQzs7Ozs7dUJBS0c7b0JBQ0ksYUFBUSxHQUFXLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQWV2QyxjQUFTLEdBQStELEVBQUUsQ0FBQztnQkF1a0J0RixDQUFDO2dCQXRqQjZDLENBQUM7Z0JBRTNDOzttQkFFRztnQkFDSSxjQUFjO29CQUVqQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksWUFBWSxHQUFRO3dCQUNwQixPQUFPLEVBQUUsUUFBUTt3QkFDakIsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDOzRCQUNoQixJQUFJLEVBQUUsY0FBYzs0QkFDcEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQ3BCLENBQUM7eUJBQ0osQ0FBQztxQkFFTCxDQUFBO29CQUNELElBQUksZUFBZSxHQUFRO3dCQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLHlCQUF5Qjt3QkFDbkQsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDOzRCQUNoQixJQUFJLEVBQUUsZ0JBQWdCOzRCQUN0QixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztxQ0FDdkMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7b0NBQ2IsSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRSxDQUFDO29DQUV0RCxDQUFDO3lDQUNJLENBQUM7d0NBQ0YsNEJBQTRCO3dDQUM1QixvREFBb0Q7d0NBQ3BELEdBQUc7d0NBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQzt3Q0FDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsR0FBRyxNQUFNLENBQUMsU0FBVSxDQUFDLHFCQUFxQixDQUFDO3dDQUMvRSxJQUFJLENBQUMsU0FBUyxDQUFDLHlCQUF5QixHQUFHLE1BQU0sQ0FBQyxTQUFVLENBQUMseUJBQXlCLENBQUM7b0NBRTNGLENBQUM7Z0NBQ0wsQ0FBQyxDQUNBLENBQ0E7NEJBQ1QsQ0FBQzt5QkFDSixDQUFDO3FCQUVMLENBQUM7b0JBQ0YsSUFBSSxVQUFVLEdBQVE7d0JBQ2xCLE9BQU8sRUFBRSxlQUFlLEVBQUUsb0JBQW9CO3dCQUM5QyxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUM7NEJBQ2hCLElBQUksRUFBRSx1QkFBdUI7NEJBQzdCLElBQUksRUFBRSxTQUFTOzRCQUNmLE9BQU8sRUFBQyxLQUFLOzRCQUNiLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7NEJBQ3ZDLENBQUM7eUJBQ0osQ0FBQztxQkFFTCxDQUFDO29CQUNGLHNFQUFzRTtvQkFFdEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQ2hCO3dCQUNJLE9BQU8sRUFBRSxJQUFJO3FCQUNoQixFQUNEO3dCQUNJLDBFQUEwRTt3QkFDMUUsS0FBSyxFQUFFLGVBQWUsRUFBRSw4Q0FBOEM7d0JBQ3RFLEtBQUssRUFBRTs0QkFDSDtnQ0FDSSxPQUFPLEVBQUUsZUFBZSxFQUFFLG9DQUFvQztnQ0FDOUQsVUFBVSxFQUFFO29DQUNSLElBQUksRUFBRTt3Q0FDRixPQUFPLEVBQUUsZUFBZSxFQUFFLDBDQUEwQzt3Q0FDcEUsSUFBSSxFQUFFLEVBQUU7d0NBQ1Isa0JBQWtCO3FDQUNyQjtpQ0FDSjtnQ0FDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUMsVUFBVSxDQUFDO2dDQUN4RCxNQUFNLEVBQUUsVUFBVSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU07b0NBQ3JDLHdDQUF3QztvQ0FFeEMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLENBQW9ELHdCQUF3Qjt3Q0FDaEcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUE0Qiw0QkFBNEI7NkNBQzlGLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQzt3Q0FDaEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FFdkMsQ0FBQztvQ0FDRCxpQ0FBaUM7b0NBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQWlDLElBQUksRUFBRSxVQUFVLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO29DQUU3SCxnQkFBZ0I7b0NBQ2hCLElBQUksa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7eUNBQ25ELElBQUksQ0FBQzt3Q0FDRixLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUk7cUNBQzlDLENBQUMsQ0FBQztvQ0FFUCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7eUNBQ3BCLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQzt5Q0FDNUIsS0FBSyxDQUFDO3dDQUNILFVBQVUsRUFBRSxNQUFNO3dDQUNsQixpQkFBaUI7d0NBQ2pCLG1FQUFtRTt3Q0FDbkUsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7d0NBQzFCLGNBQWMsRUFBRSxLQUFLLEVBQUUsWUFBWTt3Q0FDbkMsZUFBZTtxQ0FFbEIsQ0FBQzt5Q0FDRCxRQUFRLEVBQUUsQ0FBQztvQ0FDaEIsUUFBUSxDQUFDO29DQUNULElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FHcEMsQ0FBQztnQ0FDRCxNQUFNLEVBQUUsVUFBVSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU07b0NBRXJDLGtCQUFrQjtvQ0FDbEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29DQUU1QixJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRSxDQUFDO3dDQUVoRyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxzRkFBc0Y7NkNBQ3RILEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBVyxFQUFFLEVBQUU7NENBQzdCLElBQUksR0FBRyxLQUFLLEtBQUssRUFBRSxDQUFDO2dEQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtxREFDcEIsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7b0RBQ2IsSUFBSSxpQkFBaUIsR0FBRyxNQUFvRSxDQUFDO29EQUM3RixXQUFXO29EQUNYLDZCQUE2QjtvREFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsR0FBRyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQztvREFDL0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsR0FBRyxpQkFBaUIsQ0FBQyx5QkFBeUIsQ0FBQztvREFDdkYsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQTRDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFRLENBQUM7b0RBQ25ILFdBQVc7b0RBQ1gsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dEQUN2QixDQUFDLENBQUM7cURBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FDdEM7NENBR2IsQ0FBQztpREFDSSxDQUFDO2dEQUNGLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7NENBQzNCLENBQUM7d0NBQ0wsQ0FBQyxDQUFDLENBQUM7b0NBQ1AsQ0FBQzt5Q0FDSSxDQUFDO3dDQUNGLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO29DQUN4QyxDQUFDO29DQUNELHFCQUFxQjtvQ0FDckIsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7Z0NBQzlCLENBQUM7NkJBQ0o7NEJBQ0Q7Z0NBQ0kscUNBQXFDO2dDQUNyQyxPQUFPLEVBQUUsZUFBZSxFQUFFLHdCQUF3QjtnQ0FFbEQsTUFBTSxFQUFFLFVBQVUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNO29DQUVyQyx3QkFBd0I7b0NBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztvQ0FDbEwsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsd0NBQXdDLENBQUM7eUNBQ3pILFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyx1Q0FBdUM7cUNBQ3ZFLENBQUM7b0NBRUYsV0FBVztvQ0FDWCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUM7eUNBQ3JCLElBQUksQ0FBQzt3Q0FDRixHQUFHLENBQUMsU0FBUyxDQUFDOzRDQUNWLEVBQUUsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyw2Q0FBNkM7NENBQ3ZGLG1CQUFtQjs7NENBQ2pCLFdBQVcsRUFBRSxpQkFBaUI7NENBQzlCLEtBQUssRUFBRSxJQUFJO3lDQUNoQixDQUFDLENBQUM7b0NBQ1AsQ0FBQyxDQUNBLENBQUM7Z0NBRVYsQ0FBQztnQ0FDRCxNQUFNLEVBQUUsVUFBVSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU07Z0NBQ3pDLENBQUM7NkJBQ0o7eUJBQ0o7d0JBQ0QsbUJBQW1CO3dCQUNuQixnREFBZ0Q7d0JBQ2hELDBCQUEwQjt3QkFDMUIsc0JBQXNCO3dCQUN0QixJQUFJO3dCQUdKLE1BQU0sRUFBRTs0QkFDSixPQUFPLEVBQUUsZUFBZSxFQUFFLCtCQUErQjs0QkFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxpQ0FBaUM7NEJBQzNELG1EQUFtRDs0QkFDbkQsR0FBRyxFQUFFLFVBQVUsR0FBRztnQ0FDZCxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLFdBQVc7b0NBQ3pELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dDQUM3QixvQkFBb0I7Z0NBQ3BCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDbkIsQ0FBQzt5QkFDSjtxQkFFSixDQUNKLENBQUM7Z0JBRU4sQ0FBQztnQkFHRDs7O3FCQUdLO2dCQUNHLGlCQUFpQixDQUFDLE9BQWlCLEVBQUUsU0FBNkQ7b0JBQ3RHLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUF1RCxDQUFDO29CQUM1RCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3ZCLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsRUFBRyxFQUFFLDZDQUE2QyxDQUFDO3lCQUV6RyxJQUFJLENBQUMsVUFBVSxNQUFnRDt3QkFHNUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsRUFBRTs0QkFDdkUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxrQ0FBa0M7eUJBQzVELENBQUM7NkJBQ0csVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsb0VBQW9FO3dCQUN0RyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7d0JBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7NEJBRTlCLElBQUksT0FBTyxDQUFDLFVBQVUsdURBQStDLEVBQUUsQ0FBQztnQ0FDcEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO29DQUMvQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQWM7b0NBQzVCLEtBQUssRUFBRSxPQUFPLENBQUMsUUFBa0I7b0NBQ2pDLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxHQUFHLFFBQVE7b0NBQzlCLFlBQVksRUFBRSxPQUFPLE9BQU8sQ0FBQyxLQUFLLEtBQUssV0FBVyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssQ0FBQztpQ0FDNUUsQ0FBQyxDQUFDOzRCQUNQLENBQUM7aUNBQ0ksSUFBSSxPQUFPLENBQUMsVUFBVSxzREFBOEMsRUFBRSxDQUFDO2dDQUN4RSxJQUFJLENBQUMsU0FBUztvQ0FDVixJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsa0RBQWtEO2dDQUN4RixTQUFTLEdBQUcsSUFBSSxDQUFDO2dDQUVqQixrREFBa0Q7Z0NBQ2xELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztnQ0FDZixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUE7Z0NBRWQsT0FBTyxDQUFDLEtBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0NBQ25DLHNGQUFzRjtvQ0FDdEYsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDO29DQUMzQixDQUFDLENBQUMsT0FBTyxDQUFDLElBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7b0NBQ3BDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBVSxDQUFDLENBQUM7b0NBQ3ZCLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7d0NBQzNCLE1BQU0sR0FBRyxLQUFLLENBQUM7d0NBQUMsT0FBTztvQ0FDM0IsQ0FBQztnQ0FDTCxDQUFDLENBQ0EsQ0FBQztnQ0FDRiwwRUFBMEU7Z0NBQzFFLDZDQUE2QztnQ0FDN0Msc0RBQXNEO2dDQUN0RCw2SkFBNko7Z0NBRTdKLFNBQVM7Z0NBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBa0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQ3pEO29DQUNJLElBQUksRUFBRSxPQUFPLENBQUMsSUFBYztvQ0FDNUIsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUU7b0NBQ3hELFlBQVksRUFBRSxRQUFRO29DQUN0QixZQUFZLEVBQUUsaUJBQWlCLENBQUEsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQ0FDNUMsYUFBYSxFQUFFLENBQUMsTUFBTSxDQUFDO29DQUN2QixLQUFLLEVBQUUsUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJO29DQUN6RCxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO2lDQUMzRCxDQUFDLENBQ0Q7NEJBQ1QsQ0FBQzt3QkFDTCxDQUFDLENBQUMsQ0FBQzt3QkFFSCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTs0QkFDN0UsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRzs0QkFDdkIsVUFBVSxFQUFFO2dDQUNSO29DQUNJLFdBQVcsRUFBRSxtQkFBbUI7b0NBQ2hDLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQzt3Q0FDaEIsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFOzRDQUN2RSx1QkFBdUI7NENBQ3ZCLDRCQUE0Qjs0Q0FDNUIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO2dEQUNwQyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2dEQUN0QixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0RBQ3pELDRCQUE0QjtnREFDNUIsSUFBSSxZQUFZLEdBQTZDLEVBQUUsQ0FBQztnREFDaEUsSUFBSSxNQUFNLEdBQXVELEVBQUUsQ0FBQztnREFDcEUsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7Z0RBQ3RCLEtBQUssSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFLENBQUM7b0RBQ3pCLElBQUksVUFBVSxvREFBa0YsQ0FBQztvREFDakcsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3REFDaEMsVUFBVSxxREFBNkMsQ0FBQztvREFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyx1RUFBdUUsRUFBRSxDQUFDLENBQUM7b0RBQ3ZJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dEQUNsRCxDQUFDO2dEQUNELFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUMsaUJBQWlCLEVBQUUsRUFBRSxFQUFFLEVBQUMsWUFBWSxFQUFFLEVBQUUsNkNBQTZDLENBQUM7cURBQ2pILElBQUksQ0FBQyxHQUFHLEVBQUU7b0RBQ1AsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQXFELGlDQUFpQztnREFDcEwsQ0FBQyxDQUFDLENBQUE7Z0RBR04sTUFBTSxDQUFDLFNBQVUsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7Z0RBQ3JFLE1BQU0sQ0FBQyxTQUFVLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDO2dEQUU3RSxnRkFBZ0Y7Z0RBQ2hGLDhGQUE4RjtnREFDOUYsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs0Q0FDeEMsQ0FBQzt3Q0FDTCxDQUFDO3FDQUNKLENBQUM7aUNBQ0w7Z0NBQ0Q7b0NBQ0ksTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDO3dDQUNoQixJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTs0Q0FDdkYsdUJBQXVCOzRDQUN2QixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7d0NBQ2xDLENBQUM7cUNBQ0osQ0FBQztpQ0FDTDs2QkFDSjt5QkFDSixDQUFDLENBQUM7NkJBQ0UsRUFBRSxDQUFDOzRCQUNBOztnQ0FFSTs0QkFDSixLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsSUFBSTtnQ0FDckIsSUFBSSxJQUFJO29DQUNKLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7b0NBRXpCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDakMsQ0FBQyxDQUFHLHVFQUF1RTt5QkFDOUUsQ0FBQyxDQUFDO29CQUVYLENBQUMsQ0FBQyxDQUFDO29CQUVQLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUV6QixDQUFDO2dCQUdEOzs7O21CQUlHO2dCQUNLLEdBQUcsQ0FBQyxLQUEwQixFQUFFLFVBQStCO29CQUVuRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO3dCQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLDBEQUEwRDt3QkFDL0YsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2xDLENBQUM7b0JBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLHFEQUFxRDtvQkFDM0YsSUFBSSxFQUFFLEdBQStELEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDbEcsRUFBRSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztvQkFFeEMsRUFBRSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUM7b0JBQ2hFLEVBQUUsQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDO29CQUN4RSxFQUFFLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDOUQsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO29CQUNwQixXQUFXO29CQUdYLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDWCxpQ0FBaUM7d0JBQ2pDLEtBQUssSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVM7NEJBQ3hCLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUM3QixvQkFBb0I7d0JBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDOzZCQUNiLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFOzRCQUNqQixRQUFRLENBQUM7NEJBQ1QsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7NEJBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBQSxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBRWhFLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDOzRCQUNqRSxvQ0FBb0M7NEJBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7NEJBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQzt3QkFDcEMsQ0FBQyxDQUFDOzZCQUNELE1BQU0sQ0FBQzs0QkFDSixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3hCLENBQUMsQ0FBQyxDQUVEO3dCQUVMLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUN6QixDQUFDO3lCQUNJLENBQUM7d0JBRUYsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsNkVBQTZFO3dCQUMzSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs0QkFDekMsQ0FBQyxVQUFVLEdBQUc7Z0NBQ1YsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7b0NBQ2YsSUFBSSxZQUFZLEdBQXVELEVBQUUsQ0FBQztvQ0FDMUUsWUFBWSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7b0NBQzVCLFlBQVksQ0FBQyxTQUFVLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDO29DQUN6RSxZQUFZLENBQUMsU0FBVSxDQUFDLHlCQUF5QixHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztvQ0FDakYsWUFBWSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztvQ0FDNUMsWUFBWSxDQUFDLHlCQUF5QixHQUFHLEVBQUUsQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO29DQUNqRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQ0FDaEQsQ0FBQyxDQUFDO3FDQUNELElBQUksQ0FBQyxVQUFVLE1BQU07b0NBQ2xCLG9DQUFvQztvQ0FDcEMsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLE1BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dDQUM1RSxDQUFDLENBQUMsQ0FBQzs0QkFDWCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDVixDQUFDO3dCQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFOzRCQUVaLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFtQixxQkFBcUI7NEJBQzVELE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFBO3dCQUN4QixDQUFDLENBQUMsQ0FBQzt3QkFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTs0QkFFZCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBbUIscUJBQXFCO3dCQUNoRSxDQUFDLENBQUMsQ0FDRzt3QkFDTCxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDekIsQ0FBQztnQkFFTCxDQUFDO2dCQUVPLFNBQVMsQ0FBQyxLQUFpRTtvQkFDL0UsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN2Qiw4Q0FBOEM7b0JBQzlDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUM7eUJBQ3BELEdBQUcsRUFBRTt5QkFDTCxJQUFJLENBQUMsVUFBVSxVQUFVO3dCQUN0QixRQUFRLENBQUM7d0JBQ1QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDNUIsQ0FBQyxDQUFDLENBQ0Q7Z0JBRVQsQ0FBQztnQkFDTyxpQkFBaUIsQ0FBQyxLQUF5RDtvQkFDL0UsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN2QixPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFFekIsQ0FBQztnQkFLRDs7OzttQkFJRztnQkFDSSxPQUFPO29CQUVWLHNDQUFzQztvQkFDdEMsaUVBQWlFO29CQUVqRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLDRCQUE0QjtvQkFDNUIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM1Qjs7Ozs7O3lCQU1LO29CQUNMLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxLQUFLLEVBQUUsQ0FBQzt3QkFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQywrQ0FBK0M7NkJBRTdILEVBQUUsQ0FBQyxLQUFLLEVBQUUsY0FBYyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDOzZCQUVqRCxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDbEMsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzlCLENBQUM7b0JBQ0Qsc0JBQXNCO29CQUN0QixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzVDLENBQUM7Z0JBQ08sVUFBVTtvQkFDZCxrQkFBa0I7b0JBRWxCLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7eUJBQ3hDLGVBQWUsQ0FBQzt3QkFDYixJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsR0FBRzt3QkFDWixLQUFLLEVBQUUsRUFBRTt3QkFDVCxVQUFVLEVBQUUsSUFBSTt3QkFDaEIsUUFBUSxFQUFFLEtBQUs7d0JBQ2YsV0FBVyxFQUFFLGFBQWE7cUJBRTdCLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxLQUFLO3dCQUNYLGtCQUFrQjt3QkFDbEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUc7d0JBQ3RDLFFBQVEsRUFBRSxLQUFLO3dCQUNmLEtBQUssRUFBRSxFQUFFO3FCQUVaLENBQUM7d0JBQ0YsK0JBQStCO3lCQUM5QixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBTywrRUFBK0U7eUJBQzlHLGlCQUFpQixDQUFDO3dCQUNmLElBQUksRUFBRSxJQUFJO3dCQUNWLHFCQUFxQjt3QkFDckIsT0FBTyxFQUFFLGVBQWUsRUFBRSxrQkFBa0I7d0JBQzVDLEtBQUssRUFBRSxHQUFHO3dCQUNWLDBCQUEwQjt3QkFDMUIsUUFBUSxFQUFFLEtBQUs7cUJBRWxCLENBQUM7eUJBQ0QsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSxFQUFFLElBQUk7d0JBQ1YsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQkFBbUI7d0JBQzdDLEtBQUssRUFBRSxHQUFHO3dCQUNWLFFBQVEsRUFBRSxLQUFLO3FCQUVsQixDQUFDO3lCQUNMLGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsT0FBTzt3QkFDYixPQUFPLEVBQUUsZUFBZSxFQUFFLHFCQUFxQjt3QkFDL0MsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsUUFBUSxFQUFFLEtBQUs7d0JBQ2YsV0FBVyxFQUFFLFVBQVU7cUJBQzFCLENBQUMsQ0FBQztvQkFDQyxDQUFDO29CQUVMLE9BQU8sVUFBVSxDQUFDO2dCQUN0QixDQUFDO2dCQUNEOztxQkFFSztnQkFDRyxjQUFjLENBQUMsT0FBK0I7b0JBRWxELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDbEQsQ0FBQztnQkFDRDs7bUJBRUc7Z0JBQ0ssb0JBQW9CLENBQUMsT0FBK0I7b0JBQ3hELFFBQVEsQ0FBQztvQkFDVCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUM7b0JBRW5CLDhCQUE4QjtvQkFDOUIsMkNBQTJDO29CQUMzQyxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxXQUFXO3dCQUFFLE9BQU87b0JBQ2hELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3pDLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxJQUFJLEtBQUssS0FBRyxJQUFJO3dCQUFFLE9BQU87b0JBQ3pELElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBbUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZGLElBQUksWUFBWSxLQUFLLElBQUksRUFBRSxDQUFDO3dCQUN4QixrRUFBa0U7d0JBQ2xFLElBQUksT0FBTyxHQUNQLEVBQUUsR0FBRyxFQUFFLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FDeEI7d0JBQ0wsOENBQThDO3dCQUM5QyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUU7NkJBQ3ZELElBQUksQ0FBQyxVQUFVLG1CQUFtQjs0QkFDL0IsV0FBVzs0QkFDWCxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7NEJBQzdFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzdDLENBQUMsQ0FBQzs2QkFDRCxNQUFNLENBQUMsR0FBRyxFQUFFOzRCQUNiLHlCQUF5Qjt3QkFDekIsQ0FBQyxDQUFDLENBQUM7b0JBRVgsQ0FBQztnQkFDTCxDQUFDO2FBRUosQ0FBQTtZQS9uQlksc0JBQXNCO2dCQURsQyxRQUFRO2VBQ0ksc0JBQXNCLENBK25CbEM7WUEvbkJZLGdDQUFzQix5QkErbkJsQyxDQUFBO1FBQ0wsQ0FBQyxFQTFvQm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTBvQjdCO0lBQUQsQ0FBQyxFQTFvQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTBvQm5CO0FBQUQsQ0FBQyxFQTFvQlMsTUFBTSxLQUFOLE1BQU0sUUEwb0JmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3QuV2ViQ2xpZW50IHtcclxuICAgIGxldCBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIcm9tYWRuZSB6YXVjdG92YW5pIHDFmWVzIHByxa92b2RjZVxyXG4gICAgICpcclxuICAgICAqIEBhdXRob3IgVG9tYXMgS2FyZXNcclxuICAgICAqIEBzaW5jZSA0ODAuMS4wLjIwXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdVY3RIcm9tYWRuZVphdWN0b3ZhbmkgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBHSHJvbWFkbmVPcGVyYWNlPEludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0bz57XHJcblxyXG4gICAgICAgIHVpZCA9IFwiSHJvbWFkbmVaYXVjdG92YW5pI1wiO1xyXG4gICAgICAgIC8vIHZsYXN0bm9zdGkgeiBDI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHZ5YnJhbmUgemFwaXN5XHJcbiAgICAgICAgICogQHR5cGUge0dVY3RTZXpuYW1Eb2tsYWR1RHRvfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyAgc2VsZWN0ZWRSb3dzOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0b1tdO1xyXG4gICAgICAgIC8vIEdsb2JhbmkgbmFzdGF2ZW5pXHJcbiAgICAgICAgcHVibGljIEdsb2JhbFNldHVwOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0R2xvYmFsRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIHV6YXZyZW5pVnNlY2hEb2tsYWR1OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBzZSBzZXpuYW1lbVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljICRncmlkOiBKUXVlcnk7XHJcbiAgICAgICAgcHVibGljICR6YXBpc3k6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIFZ5c2xlZG55IGdyaWRcclxuICAgICAgICAgKiAkZ3JpZFJldXNsdFxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFJldXNsdDogSlF1ZXJ5O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBHcmlkIHBvIHZ5a29uYW5pIHV6YXZyZW5pXHJcbiAgICAgICAgICogJGdyaWRSZXVzbHRcclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWRDb21wbGV0ZTogSlF1ZXJ5O1xyXG5cclxuICAgICAgICAvKiogcMWZw616bmFrIMO6c3DEm8WhbsOpaG8gdWtvbsSNZW7DrSAodHJ1ZS1zdWNjZXNzLCBmYWxzZSAtIGZhaWwpICovXHJcbiAgICAgICAgcHVibGljIHN1Y2Nlc3NDbG9zZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgIEluc3RhbmNlIFdpemFyZGEgICAgICAgXHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAqIFBydXZvZGNlXHJcbiAgICAgICAgICogQHR5cGUge1dpemFyZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgUHJ1dm9kY2U6IFdpemFyZCA9IG5ldyBHb3JkaWMuV2l6YXJkKCk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIFZ5YnJhbmUgcmFka3kgcHJvIHV6YXZyZW5pXHJcbiAgICAgICAgICogIGNoZWNrZWRSb3dzXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNoZWNrZWRSb3dzOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0b1tdO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgVnlzbGVkbnkgc2V6bmFtIHJhZGt1IHBvIHV6YXZyZW5pXHJcbiAgICAgICAgICogIGNoZWNrZWRSb3dzXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcmVzdWx0Um93czogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFZ5YnJhbnlEb2tsYWREdG9bXTtcclxuXHJcbiAgICAgICAgcHVibGljIG5hc3RhdmVuaTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERva2xhZFphdWN0b3ZhdEhyb21hZG5lUmVxdWVzdER0byA9IHt9O1xyXG4gICAgICAgIC8vIHN0YXR1cyBiYXJcclxuICAgICAgICBteVN0YXR1c0JhcjogSlF1ZXJ5O1xyXG4gICAgICAgIC8vIHZ5YnJhbmUgZG9rbGFkeSB2eWJyYW5lIGRsZSB2YWxpZGFjZVxyXG4gICAgICAgIHB1YmxpYyBiYWRnZUFsbDogR09ic2VydmFibGVPYmplY3Q8R0JhZGdlT3B0aW9ucz47XHJcbiAgICAgICAgcHVibGljIGJhZGdlU3VjY2VzczogR09ic2VydmFibGVPYmplY3Q8R0JhZGdlT3B0aW9ucz47XHJcbiAgICAgICAgcHVibGljIGJhZGdlV2FybmluZzogR09ic2VydmFibGVPYmplY3Q8R0JhZGdlT3B0aW9ucz47XHJcbiAgICAgICAgcHVibGljIGJhZGdlRXJyb3I6IEdPYnNlcnZhYmxlT2JqZWN0PEdCYWRnZU9wdGlvbnM+O1xyXG4gICAgICAgIC8vIEFrY2VcclxuICAgICAgICAvLyB2eWJlciB2c2VjaCBkb2tsYWR1XHJcbiAgICAgICAgYWN0QWxsOiBHQWN0aW9uO1xyXG4gICAgICAgIC8vIHZ5YmVyIHVzcGVzbmVcclxuICAgICAgICBhY3RTdWNjZXNzOiBHQWN0aW9uO1xyXG4gICAgICAgIC8vIHZ5YmVyIHMgdmFyb3ZhbmltXHJcbiAgICAgICAgYWN0V2FybmluZzogR0FjdGlvbjtcclxuICAgICAgICAvLyB2eWJlciBjaHlib3ZlXHJcbiAgICAgICAgYWN0RXJyb3I6IEdBY3Rpb247XHJcbiAgICAgICAgbXlGb3JtOiBHQ29udGVudCAmIEdIcm9tYWRuZU9wZXJhY2VEaWFsb2c7O1xyXG4gICAgICAgIGZvcm06IEpRdWVyeTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWRlZmlub3bDoW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHpydXNpdEJ1dHRvbjogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJacnXFoWl0XCIsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJ1dHRvblpydXNpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG5hc3RhdmVuaUJ1dHRvbjogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDg1XCIsIC8vUkMgMzAyNTA0ODUgOiBOYXN0YXZlbsOtXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJ1dHRvbk5hc3Rhdml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZm9ybXVsYXJOYXN0YXZlbmkodGhhdCwgdGhpcy5uYXN0YXZlbmkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2ZvciAodmFyIGl0ZW0gaW4gcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMubmFzdGF2ZW5pLk5hc3RhdmVuaVtpdGVtXSA9IHJlc3VsdFtpdGVtXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmFzdGF2ZW5pLk5hc3RhdmVuaSA9IHJlc3VsdC5OYXN0YXZlbmk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmFzdGF2ZW5pLlN0YXZVaHJhZHlQcmltRG9rbGFkdSA9IHJlc3VsdC5OYXN0YXZlbmkhLlN0YXZVaHJhZHlQcmltRG9rbGFkdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXN0YXZlbmkuU3RhdlphdWN0b3ZhbmlQcmltRG9rbGFkdSA9IHJlc3VsdC5OYXN0YXZlbmkhLlN0YXZaYXVjdG92YW5pUHJpbURva2xhZHU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIHRpc2tCdXR0b246IGFueSA9IHtcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA1N1wiLCAvL1JDIDMwMjUwMDU3IDogVGlza1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wcmludCBnLXN0YXRlLXRleHRcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIkFrY2UgbmVuw60gaW1wbGVtZW50b3bDoW5hLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy92YXIgZG9wbG51amljaVRsYWNpdGthOiBNZW51UGFyYW1zW10gPSBbenJ1c2l0QnV0dG9uLCB6cnVzaXRCdXR0b25dO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5QcnV2b2RjZS5jcmVhdGUoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogdGhhdFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBqZSBtb8W+bsOpIG7Em2phayBtxJtuaXQgdGl0dWxlayB0xZllYmEgcG9kbGUgdnlicmFuw6lobyB0eXB1IMO6xI10b3bDoW7DrT9cclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwMzM1XCIsIC8vUkMgMzAyNTAzMzUgOiBIcm9tYWRuw6kgemHDusSNdG92w6Fuw60gLSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgICAgICAgICBzdGVwczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NTZcIiwgLy9SQyAzMDI1MDQ1NiA6IEtvbnRyb2xhIGEgcG90dnJ6ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZEJhcjoge1x0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBwb3XFvml0w60gxaFpcGVrIHYgY29tbWFuZGJhcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ5OFwiLCAvL1JDIDMwMjUwNDk4IDogUHJvw7rEjXRvdmF0IHZ5YnJhbsOpIGRva2xhZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2ljb246IFwiZ2ktYXJyb3dcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbenJ1c2l0QnV0dG9uLCAvKm5hc3RhdmVuaUJ1dHRvbiwqLyB0aXNrQnV0dG9uXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKGNudCwgY29udGVudERpdiwgY2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdWNob3bDoW7DrSBpbmZvcm1hY8OtIG8gcHLFr2LEm2h1IHByxa92b2RjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmZvcm0gPT0gbnVsbCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3JtIGplxaF0xJsgbmVleGlzdHVqZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZvcm0gPSAkLm5ld0RpdigpLmFwcGVuZFRvKGNvbnRlbnREaXYpICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkZWogRElWIG5hIG3Fr2ogZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdjb250ZW50KFtHb3JkaWMuVWN0LldlYkNsaWVudC5HVWN0SHJvbWFkbmVaYXVjdG92YW5pRGxnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubXlGb3JtID0gJC5jb250ZW50KHRoYXQuZm9ybSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbmljaWFsaXphY2UgMS4ga3Jva3UgcHJ1dm9kY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuVWN0LldlYkNsaWVudC5QcnV2b2RjZS5pbmljaWFsaXphY2U8SW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvPih0aGF0LCBjb250ZW50RGl2LHRydWUsIHRoYXQubmFjdGVuaVNlem5hbXVaYXBpc3UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlem5hbSB6w6FwaXPFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkZ3JpZDFaYXBpc3lQb2h5YnUgPSAkLm5ld0RpdigpLmFwcGVuZFRvKGNvbnRlbnREaXYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlrDoXBpc3lcIiwgb3BlbmVkOiB0cnVlLCBsb2NrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiR6YXBpc3kgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkZ3JpZDFaYXBpc3lQb2h5YnUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHVwcmF2aXQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcImFjX2FnXCIsIFwiYWNcIiwgXCJpY29fZXN1XCIsIFwicmNfZXN1XCIsIFwibmF6ZXZfZXN1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5HcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIiwgLy8gcm93LCBjZWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL21hcmtpbmc6IHRydWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFjdGVuaVNlem5hbXVaYXBpc3UodGhhdCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWZlcnJlZCBvYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVmQ2xvc2UgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uQ2Vsa292eVBvY2V0UmFka3UodGhhdC4kZ3JpZCkgIT09IDAgJiYgY2hhbmdlLnRhc2submV4dFN0ZXAgPT09IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5kaWFsb2dzLmNvbmZpcm0oXCJqcmVzOjMwMjUwMzY5XCIpIC8vUkMgMzAyNTAzNjkgOiBUb3RvIGplIG5ldnJhdG7DoSBvcGVyYWNlLiBPcHJhdmR1IGNoY2V0ZSBwcm92w6lzdCBwcm/DusSNdG92w6Fuw60gZG9rbGFkxa8gP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCBvYmo6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmogPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5teUZvcm0uZ2V0Rm9ybURhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYXN0YXZlbmlQcmltRG9rbCA9IHJlc3VsdCBhcyBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkWmF1Y3RvdmF0SHJvbWFkbmVSZXF1ZXN0RHRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJlY3RlbmkgbmF2cmF0b3ZlIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaS5TdGF2VWhyYWR5UHJpbURva2xhZHUgPSBuYXN0YXZlbmlQcmltRG9rbC5TdGF2VWhyYWR5UHJpbURva2xhZHU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmkuU3RhdlphdWN0b3ZhbmlQcmltRG9rbGFkdSA9IG5hc3RhdmVuaVByaW1Eb2tsLlN0YXZaYXVjdG92YW5pUHJpbURva2xhZHU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jaGVja2VkUm93cyA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0bz4odGhhdC4kZ3JpZCwgdHJ1ZSkgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmQ2xvc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHsgZGVmQ2xvc2UucmVqZWN0KGZhbHNlKTt9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZkNsb3NlLnJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZkNsb3NlLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVmQ2xvc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZDbG9zZS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGbDoXplIDIgLSB6b2JyYXplbsOtIHbDvXNsZWRrdSBzdG9ybmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQzN1wiLCAvL1JDIDMwMjUwNDM3IDogVsO9c2xlZGVrXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoY250LCBjb250ZW50RGl2LCBjaGFuZ2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8genByaXN0dXBuZW5pIHRsYWNpdGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5QcnV2b2RjZS5lbmFibGVTdGVwKGNudCwgW3sgZW5hYmxlZDogZmFsc2UsIGluZGV4OiAwIH0sIHsgZW5hYmxlZDogZmFsc2UsIGluZGV4OiAxIH0sIHsgZW5hYmxlZDogZmFsc2UsIGluZGV4OiAyIH1dLCB7IGJhY2s6IHsgZW5hYmxlZDogZmFsc2UgfSwgbmV4dDogeyBlbmFibGVkOiBmYWxzZSB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBodG1sID0gJC5uZXdEaXYoKS5hcHBlbmRUbyhjb250ZW50RGl2KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFwiTDFNMVMxLCBMLTItMTAtMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMwMjUwNDM2XCIpIC8vUkMgMzAyNTA0MzYgOiBWw71zbGVkbsO9IHNlem5hbSBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlJ1bihodG1sLCBjb250ZW50RGl2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuc2hvd0ZsYXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJjb21wbGV0ZU1zZ1wiLCBsYWJlbDogXCJqcmVzOjMwMjUwMzY0XCIgLy9SQyAzMDI1MDM2NCA6IFByb8O6xI10b3bDoW7DrSBkb2tsYWTFryBkb2tvbsSNZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8sIGljb246IFwiZ2ktdGlja1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLXN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdGltZXI6IDUwMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGNudCwgY29udGVudERpdiwgY2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vLy8gesOhdsSbcmXEjW7DvSBrcm9rXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb21wbGV0ZTogZnVuY3Rpb24gKGNudCwgY29udGVudERpdiwgY2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gdWtvbsSNZW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99LFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQzNVwiLCAvL1JDIDMwMjUwNDM1IDogWmF2xZnDrXQgcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDQzNFwiLCAvL1JDIDMwMjUwNDM0IDogVWtvbsSNZW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImd3aXphcmRfX2JhY2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoY250KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdCAhPT0gbnVsbCAmJiB0eXBlb2YgdGhhdC5zdWNjZXNzQ2xvc2UgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdWNjZXNzQ2xvc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdWtvbsSNZW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIEZvcm11bGFyIG5hc3RhdmVuaSB6YXVjdG92YW5pXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGZvcm11bGFyTmFzdGF2ZW5pKGNvbnRlbnQ6IEdDb250ZW50LCBuYXN0YXZlbmk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3REb2tsYWRaYXVjdG92YXRSZXF1ZXN0RHRvKTogSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkWmF1Y3RvdmF0UmVxdWVzdER0bz4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCB4OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkWmF1Y3RvdmF0TmFzdGF2ZW5pRHRvO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBFS09VdGlscy5DYWxsUmVtb3RlU2VydmljZShjb250ZW50LCBcIlByZWR2b2xieVphdWN0b3ZhbmlcIiwgeyB9LCBcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3RIcm9tYWRuZVphdWN0b3ZhbmlcIilcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmVzdWx0OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RGVmUG9saWNrYUR0b1tdKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcIkwxTTFTMSwgTC0yLTEwLTAsIE0tMTItMTItMCwgUy0xMi0xMi0wXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDQ4NlwiIC8vUkMgMzAyNTA0ODYgOiBOYXN0YXZlbsOtIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMDI1MDQ4N1wiKTsgLy9SQyAzMDI1MDQ4NyA6IFBva3JhxI1vdmF0IHZlIHpwcmFjb3bDoW7DrSwga2R5xb4gbmFzdGFuZSBuZXNyb3ZuYWxvc3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZWR2b2xieSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChwb2xvemthLCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvbG96a2EuVHlwSG9kbm90eSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RUeXBQb2xpY2VrLkNoZWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZFJvdyhcIlwiKS5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcG9sb3prYS5OYW1lIGFzIHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogcG9sb3prYS5EZXNjcmliZSBhcyBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHBvbG96a2EuTmFtZSArIFwiPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0eXBlb2YgcG9sb3prYS5WYWx1ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwb2xvemthLlZhbHVlICE9PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwb2xvemthLlR5cEhvZG5vdHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0VHlwUG9saWNlay5MaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXByZWR2b2xieSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZFNlY3Rpb24oXCJqcmVzOjMwMjUwNDg4XCIpOyAvL1JDIDMwMjUwNDg4IDogUMWZZWR2b2xieSBuYXN0YXZlbsOtIHByaW0uIGRva2xhZMWvOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZHZvbGJ5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnlwbG5lbmkgcG9sZSBzdGF2dSBhIGRvaGxlZGVuaSB2eWJyYW5lIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZFN0YXYgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXZ5ID0gW11cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2xvemthLlZvbGJ5IS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZXZhbChcInN0YXZ5LnB1c2goe3RleHQ6J1wiICsgaXRlbS5OYW1lICsgXCInLFwiICsgcG9sb3prYS5OYW1lICsgXCI6XCIgKyBpdGVtLklkICsgXCJ9KVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcyA9IHsgdGV4dDogaXRlbS5OYW1lfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzW3BvbG96a2EuTmFtZSBhcyBzdHJpbmddID0gaXRlbS5JZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF2eS5wdXNoKHMgYXMgbmV2ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLklkID09IHBvbG96a2EuVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRTdGF2ID0gaW5kZXg7IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgaW5pdGlhbFZhbHVlID0gc3RhdnkuZmlsdGVyKChzKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiBzLmlkID09PSBwb2xvemthLlZhbHVlOyAvL2lkU3RhdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KSAgICAgICAgICAgICAvL3RhZHkgc2kgamkgdnlobGVkYW0gdiBwb2xpIHBvZGxlIGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAubWFwKChzcykgPT4geyBzc1tzcy5uYW1lXSA9IHNzLmlkOyByZXR1cm4gc3M7IH0pWzBdICAgLy9hIHRhZHkgc2kgdnl0dm9yaW0gdHUgcHJvcGVydHUgcyBob2Rub3RvdSBhIHZyYXRpbSBwcnZuw60gdsO9c2xlZGVrICh2aWMgamljaCB0YW0gYXNpIG5lbsOtLCBuZT8pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZFJvdyhwb2xvemthLkRlc2NyaWJlIGFzIHN0cmluZykuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBwb2xvemthLk5hbWUgYXMgc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSwgbXVsdGk6IGZhbHNlLCBsaXN0OiBmYWxzZSwgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3RleHR9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogLyppbml0aWFsVmFsdWUsKi9zdGF2eVtpZFN0YXZdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJ0ZXh0XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5cIiArIHBvbG96a2EuTmFtZSArIFwiPXZhbHVlLlwiICsgcG9sb3prYS5OYW1lICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoc3RhdnksIHsga2V5OiBwb2xvemthLk5hbWUgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNpbXBsZUZvcm0gPSB0aGF0LmRpYWxvZ3Muc2ltcGxlRm9ybShcImpyZXM6MzAyNTA0ODlcIiwgZm9ybSwge30sICQuZXh0ZW5kKHt9LCB7IC8vUkMgMzAyNTA0ODkgOiBOYXN0YXZlbsOtIMO6xI10b3ZhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MDAsIGhlaWdodDogNjMwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kQmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPa1wiLCBjYXB0aW9uOiBHRGxnLm1iYk9rLnRleHQsIGljb246IFwiZ2ktdGlja1wiLCBydW46IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgZGxnID0gc2ltcGxlRm9ybTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkbGc6IFwiLCBkbGcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpbXBsZUZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIsIHRydWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBkYXRhIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpbXBsZUZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmlwcmF2YSBwb2xlIHBybyB1bG96ZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZ5YnJhbmVWb2xieTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERlZlBvbGlja2FEdG9bXSA9IFtdOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkWmF1Y3RvdmF0UmVxdWVzdER0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5OYXN0YXZlbmkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB2bGFzdG5vc3QgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHlwSG9kbm90eTogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RUeXBQb2xpY2VrID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RUeXBQb2xpY2VrLkxpc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2bGFzdG5vc3QuaW5kZXhPZihcIk90YXprYVwiKSA+IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwSG9kbm90eSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0VHlwUG9saWNlay5DaGVjaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnlicmFuZVZvbGJ5LnB1c2goeyBOYW1lOiB2bGFzdG5vc3QsIFZhbHVlOiBkYXRhW3ZsYXN0bm9zdF0gLypEZXNjcmliZTogXCJ4XCIsIFR5cEhvZG5vdHk6IHR5cEhvZG5vdHksIElEOiAwLCBWaXNpYmxlOnRydWUsVm9sYnk6W10qLyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lk5hc3RhdmVuaVt2bGFzdG5vc3RdID0gZGF0YVt2bGFzdG5vc3RdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFS09VdGlscy5DYWxsUmVtb3RlU2VydmljZSh0aGF0LFwiVWxveml0UHJlZHZvbGJ5XCIsIHsgcnE6dnlicmFuZVZvbGJ5IH0sIFwiR29yZGljLlVjdC5XZWJDbGllbnQuR1VjdEhyb21hZG5lWmF1Y3RvdmFuaVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzAyNTAzNjhcIiwgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS1zdWNjZXNzXCIsIHRpbWVyOjUwMDAgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1JDIDMwMjUwMzY4IDogTmFzdGF2ZW7DrSB1bG/FvmVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuTmFzdGF2ZW5pIS5TdGF2VWhyYWR5UHJpbURva2xhZHUgPSBkYXRhLlN0YXZVaHJhZHlQcmltRG9rbGFkdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuTmFzdGF2ZW5pIS5TdGF2WmF1Y3RvdmFuaVByaW1Eb2tsYWR1ID0gZGF0YS5TdGF2WmF1Y3RvdmFuaVByaW1Eb2tsYWR1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzdWx0Lk5hc3RhdmVuaS5PdGF6a2FEYXR1bVVjZXRuaWhvUHJpcGFkdSA9IGRhdGEuT3RhemthRGF0dW1VY2V0bmlob1ByaXBhZHU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXN1bHQuTmFzdGF2ZW5pLk90YXprYURQSERhbm92ZVVjdHlOZWRhbm92eURva2xhZCA9IGRhdGEuT3RhemthRFBIRGFub3ZlVWN0eU5lZGFub3Z5RG9rbGFkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpbXBsZUZvcm0uZ2NvbnRlbnQoKS5jbG9zZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WnJ1c2l0XCIsIGNhcHRpb246IEdEbGcubWJiQ2FuY2VsLnRleHQsIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsIHJ1bjogZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBkbGcgPSBzaW1wbGVGb3JtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2ltcGxlRm9ybS5nY29udGVudCgpLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKm9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKCQuY29udGVudCh0aGlzKS5maW5kRmllbGRzKFwic3RhdlphdWNcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIChldiwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgLy9idWRlLWxpIGRpYWxvZyB6YXZyZW4gcHJlZCB1ZGFsb3N0aSAnb2snLCBkb2pkZSBrZSB6cnVzZW5pIGdlbmVyb3ZhbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogc3B1c3RlbmkgemF1Y3RvdmFuaSBkb2tsYWR1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtKUXVlcnl9ICRncmlkIGdyaWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFJ1bigkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgY29udHJvbERpdjogSlF1ZXJ5PEhUTUxFbGVtZW50Pik6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoYXQuY2hlY2tlZFJvd3MgPT09IFwidW5kZWZpbmVkXCIgfHwgdGhhdC5jaGVja2VkUm93cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5hbGVydChcImpyZXM6MzAyNTA0OTBcIik7IC8vUkMgMzAyNTA0OTAgOiBOZWJ5bHkgdnlicsOhbnkgxb7DoWRuw6kgZG9rbGFkeSBrIHByb8O6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAzNjVcIik7IC8vUkMgMzAyNTAzNjUgOiBQcm9iw61ow6EgcHJvw7rEjXRvdsOhbsOtIHZ5YnJhbsO9Y2ggZG9rbGFkxa9cclxuICAgICAgICAgICAgbGV0IHJxOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkWmF1Y3RvdmF0SHJvbWFkbmVSZXF1ZXN0RHRvID0geyBTZXpuYW06IHRoYXQuY2hlY2tlZFJvd3MgfTtcclxuICAgICAgICAgICAgcnEuTmFzdGF2ZW5pID0gdGhpcy5uYXN0YXZlbmkuTmFzdGF2ZW5pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcnEuU3RhdlVocmFkeVByaW1Eb2tsYWR1ID0gdGhpcy5uYXN0YXZlbmkuU3RhdlVocmFkeVByaW1Eb2tsYWR1O1xyXG4gICAgICAgICAgICBycS5TdGF2WmF1Y3RvdmFuaVByaW1Eb2tsYWR1ID0gdGhpcy5uYXN0YXZlbmkuU3RhdlphdWN0b3ZhbmlQcmltRG9rbGFkdTtcclxuICAgICAgICAgICAgcnEuVWtvbmNpdFZQcmlwYWRlQ2h5YnkgPSB0aGlzLm5hc3RhdmVuaS5Va29uY2l0VlByaXBhZGVDaHlieTtcclxuICAgICAgICAgICAgbGV0IHBvc3VwbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIXBvc3VwbmUpIHtcclxuICAgICAgICAgICAgICAgIC8vIG5hc3RhdmltIHZzZWNobnkgZG90YXp5IG5hIEFub1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcG9sIGluIHJxLk5hc3RhdmVuaSlcclxuICAgICAgICAgICAgICAgICAgICBycS5OYXN0YXZlbmlbcG9sXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBocm9tYWRuZSB1Y3RvdmFuaVxyXG4gICAgICAgICAgICAgICAgdGhpcy5aYXVjdG92YXQocnEpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJldHVybkRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVzdWx0Um93cyA9IHJldHVybkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRDb21wbGV0ZSA9IFBydXZvZGNlLmNyZWF0ZUdyaWQodGhhdCxjb250cm9sRGl2LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcodGhhdC5yZXN1bHRSb3dzLCB7IGtleTogXCJpeHBcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRDb21wbGV0ZS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRDb21wbGV0ZS5nZ3JpZChcInJlZnJlc2hSb3dzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkID0gdGhhdC4kZ3JpZENvbXBsZXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmZXIgPSAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTsgLy92eXR2b3JpbSByZXNvbHZlZCBwcm9taXNlIChrYXpkYSBwb3pkZWppIHJlZ2lzdHJvdmFuYSBkb25lKCkgYnVkZSB6YXZvbGFuYSlcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcnEuU2V6bmFtIS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAobnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyID0gZGVmZXIudGhlbihmdW5jdGlvbiAoKSB7ICAgICAgICAvL2N5a2xpY2t5IHNrbGFkYW0gKGthemR5IHRoZW4oKSB2cmFjaSBub3Z5IHByb21pc2Ugb2JqZWt0ISlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2c3R1cERva2xhZHU6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3REb2tsYWRaYXVjdG92YXRSZXF1ZXN0RHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2c3R1cERva2xhZHUuSWRNZXNzYWdlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwRG9rbGFkdS5OYXN0YXZlbmkhLlN0YXZVaHJhZHlQcmltRG9rbGFkdSA9IHJxLlN0YXZVaHJhZHlQcmltRG9rbGFkdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwRG9rbGFkdS5OYXN0YXZlbmkhLlN0YXZaYXVjdG92YW5pUHJpbURva2xhZHUgPSBycS5TdGF2WmF1Y3RvdmFuaVByaW1Eb2tsYWR1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnN0dXBEb2tsYWR1LlBpZERva2xhZHUgPSBycS5TZXpuYW0hW2ldLml4cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwRG9rbGFkdS5EYXR1bVBvc2xlZG5pWm1lbnlEb2tsYWR1ID0gcnEuU2V6bmFtIVtpXS5kYXRfem1lbmE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5aYXVjdG92YXRQb3N0dXBuZSh2c3R1cERva2xhZHUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBvem5hY2l0IHJhZGVrIHphIHpwcmFjb3ZhbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Um93ID0gcnEuU2V6bmFtIVtpXTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uR2V0VmlldygkZ3JpZCkudXBkYXRlRGF0YShjdXJyZW50Um93LCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyBcclxuICAgICAgICAgICAgICAgICAgICB9KShpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlZmVyLmRvbmUoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpOyAgICAgICAgICAgICAgICAgICAvL3NjaG92YW5pIHByZWxvYWRlcnVcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBkZWZlci5hbHdheXMoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpOyAgICAgICAgICAgICAgICAgICAvL3NjaG92YW5pIHByZWxvYWRlcnVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFphdWN0b3ZhdCh2c3R1cDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERva2xhZFphdWN0b3ZhdEhyb21hZG5lUmVxdWVzdER0byk6IEpRdWVyeVByb21pc2U8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFZ5YnJhbnlEb2tsYWREdG9bXT4ge1xyXG4gICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlOiBkb2Nhc25lIHBybyBtb3pub3N0IHByZWtsYWR1IDg0XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5VY3REb2tsYWQuaHJvbWFkbmVaYXVjdG92YXQoeyBycTp2c3R1cCB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJldHVybkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgWmF1Y3RvdmF0UG9zdHVwbmUodnN0dXA6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3REb2tsYWRaYXVjdG92YXRSZXF1ZXN0RHRvKTogSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0bz4ge1xyXG4gICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUZXN0LCBqZXN0bGkgamUgbW/Fvm7DqSBva25vIHphdsWZw610XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8YW55Pn0gcHJvbWlzZSAocmVzb2x2ZSA9IGplIG1vxb5uw6kgemF2xZnDrXQsIHJlamVjdCA9IG5lbsOtIG1vxb5uw6kgemF2xZnDrXQpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIHVrb27EjWVuw60gamUgbW/Fvm7DqSB2IGt0ZXLDqWtvbGl2IGbDoXppXHJcbiAgICAgICAgICAgIC8vIFRPRE86IHBva3VkIGJ5IG5lYnlsYSBvYnNsdWhhIHBvdMWZZWJhLCB0YWsgY2Vsb3UgbWV0b2R1IHNtYXphdFxyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmZXJyZWQgb2JqZWN0IHBybyBjbG9zZVxyXG4gICAgICAgICAgICBsZXQgZGVmQ2xvc2UgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIGNudC5kaWFsb2dzLmNvbmZpcm0oXCJPcHJhdmR1IGNoY2V0ZSB6cnXFoWl0IHByxa92b2RjZT9cIikub24oXCJjbG9zZVwiLCAoZXYsIG9iajogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zdWNjZXNzQ2xvc2UgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pOyovXHJcbiAgICAgICAgICAgIGlmICh0aGF0LnN1Y2Nlc3NDbG9zZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiZG90YXpcIiwgXCJqcmVzOjMwMjUwMzM5XCIsIEdEbGcubWJiWWVzTm8sIEdEbGcubWJpUXVlc3Rpb24pIC8vUkMgMzAyNTAzMzkgOiBPcHJhdmR1IGNoY2V0ZSB1a2/EjWl0IHByxa92b2RjZT9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHsgZGVmQ2xvc2UucmVzb2x2ZSh0aGF0KSB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBkZWZDbG9zZS5yZWplY3QpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZkNsb3NlLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBtxa/FvmUgc2UgemF2xZnDrXQgdsW+ZHlcclxuICAgICAgICAgICAgcmV0dXJuIGRlZkNsb3NlLnJlc29sdmUodGhhdCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIEdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0ZHBlcER0bz4ge1xyXG4gICAgICAgICAgICAvL3ZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX3pcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIiNcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidWktZGlzYWJsZWRcIixcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vbmFrbGFkb3ZlIHN0cmVkaXNrb1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zeXNDb2x1bW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy5ua3MsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MCxcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9Hb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLnV1c1xyXG4gICAgICAgICAgICAgICAgLmFkZFNvcnRlZEVrb0NmdVNldCh0aGlzKSAgICAgICAvL0xLMjAxNzAyMTRfMSwgc3RhbmRhcmRuaSBwb3V6aXRpIGNmdSAoZWtvIHNsb3VwY3UpLCB0aGlzID0gaW5zdGFuY2UgZ2NvbnRlbnR1XHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyAgICAgICAgICAgICAgIC8vTURcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zdHJ1Y3R1cmVMZWFkOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDE5XCIsIC8vUkMgMzAyNTAwMTkgOiBNRFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jdXN0b21DbGFzczpcImpzLWNhc3RrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgICAgICAgICAgICAgICAvLyBEQUxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTMxXCIsIC8vUkMgMzAyNTAxMzEgOiBEYWxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMjRcIiwgLy9SQyAzMDI1MDAyNCA6IFBvcGlzXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwianMtcG9waXNcIixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqKlxyXG4gICAgICAgICAqIGdyaWQgc2Ugc2V6bmFtZW0gZG9rbGFkdVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRHcmlkRG9rbGFkdShjb250ZW50OiBHVWN0SHJvbWFkbmVaYXVjdG92YW5pKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudC5lbGVtZW50LmZpbmQoXCIuanMtV2l6YWRyR3JpZFwiKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hcGxuxJtuw60gc2V6bmFtdSB6w6FwaXPFryBrIHBvaHlidSBuZWJvIGRva2xhZHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG5hY3RlbmlTZXpuYW11WmFwaXN1KGNvbnRlbnQ6IEdVY3RIcm9tYWRuZVphdWN0b3ZhbmkpOiB2b2lkIHtcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gY29udGVudDtcclxuXHJcbiAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBkYXQgZG8gZ3JpZHUgesOhcGlzxa9cclxuICAgICAgICAgICAgLy8gVE9ETzogbmVqc291IMWhcGF0bsSbIERUTyB2ZSB2b2zDoW7DrSBtZXRvZD9cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0LiR6YXBpc3kgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyICRncmlkID0gdGhhdC5nZXRHcmlkRG9rbGFkdShjb250ZW50KTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAkZ3JpZCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAkZ3JpZD09PW51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IGFrdEhsYXZpY2thUCA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RkcGVwRHRvPigkZ3JpZCk7XHJcbiAgICAgICAgICAgIGlmIChha3RIbGF2aWNrYVAgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTA1NDFcIik7IC8vUkMgMzAyNTA1NDEgOiBOYcSNw610w6FtLi4uXHJcbiAgICAgICAgICAgICAgICBsZXQgbXlmaWx0ciA9XHJcbiAgICAgICAgICAgICAgICAgICAgeyBpeHA6IGFrdEhsYXZpY2thUC5peHAgfVxyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmU6IGRvY2FzbmUgcHJvIG1vem5vc3QgcHJla2xhZHUgODRcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlVjdERva2xhZFphcGlzLmxpc3QoeyBmaWx0ZXJzOiBteWZpbHRyIH0pLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChzZXpuYW1aYXBpc3VEb2tsYWR1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoc2V6bmFtWmFwaXN1RG9rbGFkdSwgeyBrZXk6IFwiaXhwLHJhZGVrX3pcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kemFwaXN5LmdncmlkKFwic2V0RGF0YVwiLCB2aWV3LHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5lbmRPcGVyYXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIl19
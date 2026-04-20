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
             * Hlavní content UCT
             *
             * @author Tomas Kares
             * @since 484.1.0.15
             */
            let GMainApp = class GMainApp extends Gordic.GContentBase {
                //readonly ixsFun = this.prop("IxsFunAkt") as string;
                onContentReady() {
                    const content = this;
                    // asynchronní načtení cache pro datovou větu
                    this.loadingAwait.then(() => { Gordic.Eko.WebClient.DataSentenceAdapter.getCacheContent(this.IxsRoz, this.IxsSax); });
                    // Dashboard
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.BlogProvider()); //zapojení blogů
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.ArticleProvider()); //zapojení článků (uživatelsky editovatelný text)
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.IslProvider()); //zapojení jakékoli dostupné ISL metody vracející seznam dat (je možné nastavit i volání detailu při kliknutí na položku)
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.RssProvider()); //zapojení RSS zpráv (včetně stránkování, vyhledávání a filtrování podle kategorií)           
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.RestProvider()); //zapojení externích REST služeb
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.FileProvider()); //zapojení načítání dat ze souboru typu JSON, který je vložen do složky Data v adresáři aplikace
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.XrgServiceProvider()); //zapojení načítání dat ze XRG služby uvedené ve web.config spolu s nastavenými přístupovými údaji
                    //Gordic.Dashboard.Providers.register(new Gordic.Dashboard.DataReportProvider()); //zapojení sestav
                    Gordic.Dashboard.CustomProviders.register(createStatKnihy(content));
                    // Zaregistruji WFL resolver hledání pidu do obecného hledacího políčka.
                    Gordic.Wfl.Utils.registerSearchResolvers({
                        pidSearchResolverParams: {
                            openDetail: (ixsInfo) => {
                                // TODO: dodelat nacteni dle framgmentu v read, aby se nenacital jinou funkci
                                //content.isl.UctDoklad.read({ ixp: ixsInfo.Ixx1, fragments:["ixp_den"] })
                                // zobrazená detailů podle toho, o jaký typ jde
                                return content.isl.UctDoklad.getKnihaZDokladu({ ixp: ixsInfo.Ixx1 })
                                    .get()
                                    .then((ixpDen) => {
                                    if (typeof ixpDen === "undefined" || ixpDen.trim() == "")
                                        return $.Deferred().resolve(false).promise();
                                    let newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, ixpDen);
                                    content.navigate(["Gordic.Uct.WebClient.GUctDetail", { gpc: newGpc }], { EditaceHlavicky: false, id: 'uctDetailDokladu', Ixp: ixsInfo.Ixx1, IxpDen: ixpDen });
                                    //content.navigate('Gordic.Uct.WebClient.GUctDetail', { EditaceHlavicky: false, id: 'uctDetailDokladu', Ixp: ixsInfo.Ixx1 });
                                    return $.Deferred().resolve(true).promise();
                                });
                                //                        return $.Deferred<boolean>().resolve(true).promise();
                            }
                        }
                    });
                    // registrace uziv. nastaveni
                    Gordic.WebApp.globalSettingForms.register([
                        Gordic.Report.WebClient.GReportsUserSettings(),
                        Gordic.Wfl.AppSettings.AttachmentOpenSettingsForm(),
                        Gordic.Wfl.AppSettings.ColorPickerSettingsForm(),
                        Gordic.Eko.Utils.EkoUserSettingsPid(this.PovolitGenerovaniPiduDokladu ? "ano" : "ne" /* "Global.Uct.AppSettings*/),
                        Gordic.Eko.Utils.EkoUserSettingsEkoBook(),
                        this.UctUserSettingsVolby(),
                        Gordic.Eko.Utils.EkoUserSettingsEkoBook()
                        //, this.UctUserSettingsPreFilledValues()
                        //, Gordic.Eko.Utils.UserSettingsPid("Global.Uct.AppSettings", this.PovolitGenerovaniPiduDokladu?"1":"0")
                        ,
                        Gordic.Eko.Utils.EkoUserSettingsList( /*"Global.Uct.AppSettings"*/)
                    ]);
                    // Pro hromadnou FIK
                    //Gordic.Wfl.WebClient.GHFKAsyncUtils(this, Gordic.Uct.WebClient.Seznam.createdGridFormat(null as any));
                    Gordic.Wfl.WebClient.GHFKAsyncUtils(this, new Gordic.Data.GridFormat());
                }
                // ***************************************
                //   Delegát pro evidenci z redistribuce
                // ***************************************
                evidenceDelegate(obj) {
                    return Gordic.Eko.Components.DocsForReg.showEbooksChoice(this.element, obj.typAg).then((kniha) => {
                        //var that = this;
                        const noveGpc = Gordic.Eko.Utils.createBookGpc(this.gpc, kniha.ixp_den); // nové GPC dle knihy
                        //                let l_oCnt = this.createServiceContent(["Gordic.Uct.WebClient.GUctServiceContent", { gpc: noveGpc }]);                           // vytvoření servisního contentu
                        return this.evidovat(this.createServiceContent(["Gordic.Uct.WebClient.GUctServiceContent", { gpc: noveGpc }]), obj, kniha, noveGpc);
                        //return l_oCnt.isl.UctDoklad.create({
                        //    IdMessage: "", SejmutiPidu: true
                        //    , PidDokladu: obj.pids[0]
                        //    , ixpDen: kniha.ixp_den
                        //})
                        //    .get()
                        //    .then(function (data) {                                                                                   // promise
                        //        //return ZobrazDetailDleIXP(that, obj.pids[0], false,true);
                        //        return that.navigate(["Gordic.Uct.WebClient.GUctDetail", { gpc: noveGpc }], {                      // otevřít detail
                        //            //uid: "Detail_dokladu#",
                        //            ixp: obj.pids[0],
                        //            EditaceHlavicky: true,
                        //            id: "uctDetailDokladu",
                        //        });
                        //    }
                        //    ).always(() => { l_oCnt.close(); });                                                                       // zavření servisního kontentu
                    });
                }
                /**
                 * evidovat
                 *
                 * @param {GContent} content
                 * @param {{ pids: string[]} obj
                 * @param {Eko.Interface.GEkosdenDto} kniha
                 * @param {ObjectLiteral<any> & { ixp_den: string} noveGpc
                 * @param {Gordic.Uct.Interface.GUctDokladPodaniRequestDto} [vstup]
                 * @param {any | undefined | null} [def]
                 * @returns {JQueryPromise<any>}
                 */
                evidovat(content, obj, kniha, noveGpc, vstup, def) {
                    let that = this;
                    if (typeof vstup === "undefined") {
                        def = $.Deferred();
                        vstup = {
                            IdMessage: "", SejmutiPidu: true,
                            PidDokladu: obj.pids[0],
                            ixpDen: kniha.ixp_den
                        };
                        that.beginOperation("jres:30250347"); //RC 30250347 : Probíhá ukládání
                    }
                    return content.isl.UctDoklad.create(vstup)
                        .get()
                        .then((data) => {
                        that.endOperation();
                        that.navigate(["Gordic.Uct.WebClient.GUctDetail", { gpc: noveGpc }], {
                            //uid: "Detail_dokladu#",
                            ixp: obj.pids[0],
                            EditaceHlavicky: true,
                            id: "uctDetailDokladu",
                        });
                        return def.resolve();
                    })
                        .catch((error) => {
                        let returnMessage = Gordic.Eko.WebClient.Common.ResolveExeptionNew(content, error);
                        if (typeof returnMessage === "object") {
                            returnMessage
                                .then(function (returnValue) {
                                if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                    vstup.Nastaveni = returnValue.Nastaveni;
                                    vstup.IdMessage = returnValue.IdMessage;
                                    return that.evidovat(content, obj, kniha, noveGpc, vstup, def);
                                }
                                else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                    that.endOperation();
                                    //return;
                                    return def.reject();
                                }
                                else {
                                    that.endOperation();
                                    //return;
                                    return def.resolve();
                                }
                            });
                            return def.promise();
                        }
                        throw error;
                    })
                        .always(() => {
                        that.endOperation();
                        content.close();
                    });
                }
                /**
                 * Formular voleb
                 * @returns
                 */
                UctUserSettingsVolby() {
                    //let form = Gordic.Eko.Utils.EkoUserSettingsPid(this.PovolitGenerovaniPiduDokladu ? "ano" : "ne"/* "Global.Uct.AppSettings*/)
                    let form = new Gordic.Forms.Form({ name: "UctSettingsForm", tabOptions: { title: "jres:30250678" } }) //RC 30250678 : Detail dokladu
                        .addRow("jres:30250325").addField("gselectbox", {
                        name: "UCTZobrazeniStavu",
                        list: true,
                        itemTemplate: "{text}",
                        initialValue: { stavzobrazit: 3 /* Interface.GEZobrazeniStavu.StavDokladu */ },
                        data: new Gordic.Data.View([
                            { text: "jres:30250302", stavzobrazit: 0 /* Interface.GEZobrazeniStavu.PouzeStav */ }, //RC 30250302 : Pouze stav účtu
                            { text: "jres:30250303", stavzobrazit: 1 /* Interface.GEZobrazeniStavu.StavANezauctovaneVsechny */ }, //RC 30250303 : Stav účtu a všechny nezaúčtované položky
                            { text: "jres:30250304", stavzobrazit: 2 /* Interface.GEZobrazeniStavu.StavANezauctovaneDokladu */ }, //RC 30250304 : Stav účtu a nezaúčtované položky dokladu
                            { text: "jres:30250092", stavzobrazit: 3 /* Interface.GEZobrazeniStavu.StavDokladu */ }, //RC 30250092 : Stav dokladu
                        ], { key: "stavzobrazit" }),
                        model: "Global.Uct.AppSettings.UctSettingsForm.ZobrazeniStavu=value.stavzobrazit"
                    })
                        .addRow("jres:30250326").addField("gselectbox", {
                        name: "EvidenceAkce",
                        list: true,
                        itemTemplate: "{text}",
                        initialValue: { akce: "1" },
                        data: new Gordic.Data.View([
                            { text: "jres:30250327", akce: "0" }, //RC 30250327 : Nový řádek
                            { text: "jres:30250328", akce: "1" }, //RC 30250328 : Žádná
                            { text: "jres:30250329", akce: "2" }, //RC 30250329 : Spuštění předkontace
                        ], { key: "akce" }),
                        model: "Global.Uct.AppSettings.UctSettingsForm.EvidenceAkce=value.akce"
                    })
                        .addRow("jres:30250309").addField("gselectbox", {
                        name: "UCTDatumDokladu",
                        list: true,
                        tooltip: "jres:30250309", //RC 30250309 : Předplnění data účtování na dokladu
                        itemTemplate: "{text}",
                        emptyValue: null,
                        initialValue: { text: "jres:30250310", datumDokladu: 0 }, //RC 30250310 : Nepředplňovat
                        data: new Gordic.Data.View([
                            { text: "jres:30250310", datumDokladu: 0 }, //RC 30250310 : Nepředplňovat
                            { text: "jres:30250311", datumDokladu: 2 }, //RC 30250311 : Předplnit aktuální datum
                            { text: "jres:30250312", datumDokladu: 1 }, //RC 30250312 : Předplnit nejnižší otevřený měsíc
                            { text: "jres:30250313", datumDokladu: 3 }, //RC 30250313 : Předplnit nejvyšší otevřený měsíc
                        ], { key: "datumDokladu" }),
                        model: "Global.Uct.AppSettings.UctSettingsForm.DatumDokladu=value.datumDokladu"
                    })
                        .addRow("jres:30250637").addField("gselectbox", {
                        name: "UCTPolozkyZobrazeni",
                        list: true,
                        tooltip: "jres:30250640", //RC 30250640 : Umístění položek dokladu
                        itemTemplate: "{text}",
                        emptyValue: null,
                        initialValue: { text: "jres:30250639", polozkyView: 1 }, //RC 30250310 : Nepředplňovat
                        data: new Gordic.Data.View([
                            { text: "jres:30250638", polozkyView: 0 }, //RC 30250638 : V samostatné záložce
                            { text: "jres:30250639", polozkyView: 1 }, //RC 30250639 : Pod záložkou Základní údaje
                        ], { key: "polozkyView" }),
                        model: "Global.Uct.AppSettings.UctSettingsForm.PolozkyView=value.polozkyView"
                    })
                        .addRow("jres:30250848").addField("gcheck", {
                        name: "UCTPolozkyImportKontrola",
                        tooltip: "jres:30250849", //RC 30250849 : Při spuštění akce importu pomocí pomocníka budou automaticky kontrolována vstupní data.
                        emptyValue: false,
                        initialValue: false,
                        model: "Global.Uct.AppSettings.UctSettingsForm.PolozkyImportKontrola=value"
                    });
                    if (this.PovoleniNulVPredkontaci == 2 /* Gordic.Uct.Interface.GEPovoleniNulVPredkontace.DleUzivNastaveni */)
                        form.addRow("jres:30250858").addField("gcheck", {
                            name: "UCTPredkontaceNuly",
                            tooltip: "jres:30250859", //RC 30250859 : Povolint nulové hodnoty MD a DAL na účetních zápisch vytvářených pomocí předkontace.
                            emptyValue: false,
                            initialValue: false,
                            model: "Global.Uct.AppSettings.UctSettingsForm.PredkontaceNuly=value"
                        });
                    return form;
                }
                /**
                 * Formular pro predplnene hodnoty
                 * @returns
                 */
                UctUserSettingsPreFilledValues() {
                    let form = new Gordic.Forms
                        .Form({ name: "UctSettingsForm", tabOptions: { title: "jres:30250316", opened: false } }) //RC 30250316 : Převyplňované hodnoty
                        .addRow("jres:30250309").addField("gselectbox", {
                        name: "UCTDatumDokladu",
                        list: true,
                        tooltip: "jres:30250309", //RC 30250309 : Předplnění data účtování na dokladu
                        itemTemplate: "{text}",
                        emptyValue: null,
                        initialValue: { stavzobrazit: 0 },
                        data: new Gordic.Data.View([
                            { text: "jres:30250310", datumDokladu: 0 }, //RC 30250310 : Nepředplňovat
                            { text: "jres:30250311", datumDokladu: 2 }, //RC 30250311 : Předplnit aktuální datum
                            { text: "jres:30250312", datumDokladu: 1 }, //RC 30250312 : Předplnit nejnižší otevřený měsíc
                            { text: "jres:30250313", datumDokladu: 3 }, //RC 30250313 : Předplnit nejvyšší otevřený měsíc
                        ], { key: "datumDokladu" }),
                        model: "Global.Uct.AppSettings.UctSettingsForm.DatumDokladu=value.datumDokladu"
                    });
                    return form;
                }
                /**
                 * Otevření kartotéky externích subjektů
                 */
                kartotekaEsu() {
                    let that = this;
                    var options = {
                        // Ucel: 2,
                        Logovani: {
                            Ixp: '0000X000004J',
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.kartotekaVMenuAplikace,
                            AktZnacka: "",
                            DuvodHledaniTxt: "",
                            InitialValueDuvodHledaniTxt: "jres:30250698" //RC 30250698 : Nahlížení z modulu UCT
                        }
                    };
                    Gordic.Esu.Dialogs.KartotekaEsuDlgFromMain(that, options, Gordic.Global.Enums.ModOtevreni.navigate);
                }
                /**
                 * Otevreni uzaverky agendy
                 *
                 * */
                openUzaverkaAgenda(agenda) {
                    const options = {
                        close: (typAg) => this.isl.UctAgenda.uzavritAgendu().getData(),
                        agenda: agenda,
                        permissions: (agendy) => this.isl.UctAgenda.povoleniAkciAgendy().get().then((r) => r),
                        getData: () => {
                            return this.isl.UctAgenda.read().getData().then((r) => [r]);
                        },
                        checkClose: (agendy) => $.Deferred().resolve(agendy).promise()
                    };
                    this.navigateTask(Gordic.Eko.WebClient.GEkoAgenda, options);
                }
                /**
                 * Otevreni uzaveky knih
                 * */
                openUzaverkaKnihy() {
                    const options = {
                        getData: this.isl.UctKniha.knihyKUzaverkam(),
                        cancelClose: (knihy) => this.isl.UctKniha.otevritKnihy({ knihy: knihy }).getData(),
                        permissions: () => this.isl.UctKniha.getPermissions().get().then((result) => result),
                        close: (knihy) => this.isl.UctKniha.uzavritKnihy({ knihy: knihy }).getData(),
                        checkCancelClose: (knihy) => this.isl.UctKniha.kontrolaKnihOtevrit({ knihy: knihy }).getData(),
                        checkClose: (knihy) => this.isl.UctKniha.kontrolaKnihUzavrit({ knihy: knihy }).getData()
                        //, prepareClose: (knihy) => $.Deferred().resolve(knihy).promise()    
                        //, cancelPrepareClose: (knihy) => this.isl.UctKniha.otevritKnihy({ knihy: knihy }).getData()   
                        //, checkCancelPrepareClose: (knihy) => $.Deferred().resolve(knihy).promise()    
                        //, checkPrepareClose: (knihy) => $.Deferred().resolve(knihy).promise()
                    };
                    this.navigateTask(Gordic.Eko.WebClient.GEkoSeznamKnih, options);
                }
            };
            GMainApp = __decorate([
                gcontent
            ], GMainApp);
            WebClient.GMainApp = GMainApp;
            /**
             * Vytvoří provider pro počty pohybů k účtování
             *
             * @param {GContent} gcontent content
             * @returns {Gordic.Dashboard.CustomProvider} provider s počty
             */
            function createStatKnihy(gcontent) {
                return new Gordic.Dashboard.CustomProvider("Seznam knih", "knihy", () => {
                    let kpiKnihy = [];
                    let knihy = [];
                    // dostupné knihy
                    return gcontent.isl.EkoKniha.list({
                        filters: {
                            typ_ag: 40,
                            rok: gcontent.gpc.rok
                        }
                    })
                        .getData()
                        .then(function (data) {
                        let pidyKnih = data.map((item) => item.ixp_den);
                        return gcontent.isl.UctDoklad.poctyDokladuVKnihach({
                            SeznamKnih: pidyKnih,
                            filtry: [1 /* Interface.GEUctFiltrSeznamPevne.KeSchvaleni */, 0 /* Interface.GEUctFiltrSeznamPevne.KZauctovani */, 5 /* Interface.GEUctFiltrSeznamPevne.Neevidovane */, 4 /* Interface.GEUctFiltrSeznamPevne.Prouctovane */, 3 /* Interface.GEUctFiltrSeznamPevne.Uzavrene */, 20 /* Interface.GEUctFiltrSeznamPevne.Vsechny */],
                        }).getData()
                            .then(function (response) {
                            data.forEach((kniha) => {
                                let foundedBook = response.find((item) => item.ixp_den === kniha.ixp_den);
                                kpiKnihy.push(createKPIItems(kniha, foundedBook));
                                knihy.push(kniha);
                            });
                            let panelPocetDokumnetuVKnize = $.newDiv()
                                .gbasepanel(Gordic.Prefabs.Panels.kpiMultiRowsTemplate(), {
                                id: "statistika_knihy",
                                mode: "vertical",
                                itemTemplate: Gordic.Prefabs.Panels.kpiValueTwoRowsTextTemplate().itemTemplate,
                                defaultSelected: false,
                                data: new Gordic.Data.View(kpiKnihy)
                            });
                            return panelPocetDokumnetuVKnize;
                        });
                    });
                });
                /**
                 * Vytvoreni KPI s polozkami
                 *
                 * @param kniha
                 */
                function createKPIItems(kniha, pocty) {
                    return new GObservableObject({
                        title: kniha.nazev,
                        detailsDirection: "vertical",
                        name: kniha.ixp_den,
                        details: [
                            {
                                value: pocty ? pocty?.keschvaleni : "0",
                                description: "jres:30250552", //RC 30250552 : ke schválení
                                meaning: "info",
                                action: new GAction({
                                    name: kniha.ixp_den + "_" + 1 /* Interface.GEUctFiltrSeznamPevne.KeSchvaleni */, run: function () {
                                        vyberSeznamu(gcontent, kniha, 1 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.KeSchvaleni */);
                                    }
                                }),
                            },
                            {
                                value: pocty ? pocty.kzauctovani : "0",
                                description: "jres:30250553", //RC 30250553 : k zaúčtování
                                meaning: "info",
                                action: new GAction({ name: kniha.ixp_den + "_" + 0 /* Interface.GEUctFiltrSeznamPevne.KZauctovani */, run: function () { vyberSeznamu(gcontent, kniha, 0 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.KZauctovani */); } }),
                            },
                            {
                                value: pocty ? pocty.prouctovane : "0",
                                description: "jres:30250705", //RC 30250705 : zaúčtované
                                meaning: "info",
                                action: new GAction({ name: kniha.ixp_den + "_" + 4 /* Interface.GEUctFiltrSeznamPevne.Prouctovane */, run: function () { vyberSeznamu(gcontent, kniha, 4 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Prouctovane */); } }),
                            },
                            {
                                value: pocty ? pocty.uzavrene : "0",
                                description: "jres:30250555", //RC 30250555 : uzavřené
                                meaning: "info",
                                action: new GAction({ name: kniha.ixp_den + "_" + 3 /* Interface.GEUctFiltrSeznamPevne.Uzavrene */, run: function () { vyberSeznamu(gcontent, kniha, 3 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Uzavrene */); } }),
                            },
                            {
                                value: pocty ? pocty.neevidovane : "0",
                                description: "jres:30250556", //RC 30250556 : neevidované
                                meaning: "info",
                                action: new GAction({ name: kniha.ixp_den + "_" + 5 /* Interface.GEUctFiltrSeznamPevne.Neevidovane */, run: function () { vyberSeznamu(gcontent, kniha, 5 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Neevidovane */); } }),
                            },
                            {
                                value: pocty ? pocty.vsechny : "0",
                                description: "jres:30250842", //RC 30250842 : Celkem bez neevidovaných
                                meaning: "info",
                                action: new GAction({ name: kniha.ixp_den + "_" + 20 /* Interface.GEUctFiltrSeznamPevne.Vsechny */, run: function () { vyberSeznamu(gcontent, kniha, 20 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Vsechny */); } }),
                            }
                        ]
                    });
                }
                /**
                    * Vyber filtru seznamu
                    * @param idKniha
                    * @param typFiltru
                    */
                function vyberSeznamu(gcontent, kniha, typFiltru) {
                    //            var newGpc = Gordic.Eko.Utils.createBookGpc(this.gpc, idKniha);
                    let newGpc = (kniha != null ? Gordic.Eko.Utils.createBookGpc(gcontent.gpc, kniha.ixp_den) : gcontent.gpc);
                    gcontent.navigate(['Gordic.Uct.WebClient.GUctSeznamServiceContent', { gpc: newGpc }], {
                        //gcontent.navigate(['Gordic.Uct.WebClient.GUctSeznamServiceContent', { gpc: Gordic.Eko.Utils.createBookGpc(gcontent.gpc, idKniha) }], {
                        taskId: 'actSeznamdokladuID',
                        ID: 'UCTSeznamdokladu#',
                        //idKnihy: idKniha,
                        filtr: typFiltru,
                    });
                }
                /**
                    * Nastavení hodnoty prvku
                    *
                    * @param {GObservableObject<any | GKpiItemOptions>} kpi prvek
                    * @param {number | null} numDetail pořadové číslo (pro typ zobrazení seznam) nebo null (pro typ zobrazení velká KPI)
                    * @param {number | null} value hodnota
                    */
                function setValue(kpi, numDetail, value) {
                    if (value === null || typeof value === "undefined") {
                        // prázdná (počáteční) hodnota
                        //if (this.TypZobrazeni === true) {
                        //    kpi.value = null;
                        //}
                        //else
                        {
                            kpi.details[numDetail].value = "?";
                            kpi.details[numDetail].meaning = "info";
                        }
                    }
                    else {
                        // číselná hodnota
                        if (value > 0) {
                            kpi.details[numDetail].value = value;
                            kpi.details[numDetail].meaning = "info";
                        }
                        else {
                            kpi.details[numDetail].value = 0;
                            kpi.details[numDetail].meaning = "positive";
                        }
                    }
                    kpi.update();
                }
            }
            WebClient.createStatKnihy = createStatKnihy;
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR01haW5BcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHTWFpbkFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBb2hCZjtBQXBoQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBb2hCbkI7SUFwaEJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FvaEI3QjtRQXBoQm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DOzs7OztlQUtHO1lBRUgsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUyxTQUFRLE9BQUEsWUFBWTtnQkFPdEMscURBQXFEO2dCQUM5QyxjQUFjO29CQUNqQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBRXJCLDZDQUE2QztvQkFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXRILFlBQVk7b0JBQ1osTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCO29CQUMxRixNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyxpREFBaUQ7b0JBQzlILE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLHlIQUF5SDtvQkFDbE0s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R0FBRyxHQUFHLENBQUM7NEJBQ3BDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBVSxDQUFDLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzt3QkFDN0MsQ0FBQztvQkFDTCxDQUFDO3lCQUNJLENBQUM7d0JBQ0Ysa0JBQWtCO3dCQUNsQixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQzs0QkFDWixHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVUsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7NEJBQ3RDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBVSxDQUFDLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzt3QkFDN0MsQ0FBQzs2QkFDSSxDQUFDOzRCQUNGLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBVSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzs0QkFDbEMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFVLENBQUMsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO3dCQUNqRCxDQUFDO29CQUNMLENBQUM7b0JBQ0QsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNqQixDQUFDO1lBR0wsQ0FBQztZQXhKZSx5QkFBZSxrQkF3SjlCLENBQUE7UUFDTCxDQUFDLEVBcGhCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBb2hCN0I7SUFBRCxDQUFDLEVBcGhCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBb2hCbkI7QUFBRCxDQUFDLEVBcGhCUyxNQUFNLEtBQU4sTUFBTSxRQW9oQmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjdC5XZWJDbGllbnQge1xyXG4gICAgbGV0IGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhsYXZuw60gY29udGVudCBVQ1RcclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIFRvbWFzIEthcmVzXHJcbiAgICAgKiBAc2luY2UgNDg0LjEuMC4xNVxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHTWFpbkFwcCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgcHVibGljIFBvdm9saXRHZW5lcm92YW5pUGlkdURva2xhZHU6IGJvb2xlYW47XHJcbiAgICAgICAgcHVibGljIFBvdm9sZW5pTnVsVlByZWRrb250YWNpOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVBvdm9sZW5pTnVsVlByZWRrb250YWNlO1xyXG4gICAgICAgIHB1YmxpYyBJeHNSb3o6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgSXhzU2F4OiBzdHJpbmc7XHJcbiAgICAgICAgLy9wdWJsaWMgSXhwRGVuOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGl4c0Z1bjogc3RyaW5nO1xyXG4gICAgICAgIC8vcmVhZG9ubHkgaXhzRnVuID0gdGhpcy5wcm9wKFwiSXhzRnVuQWt0XCIpIGFzIHN0cmluZztcclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gYXN5bmNocm9ubsOtIG5hxI10ZW7DrSBjYWNoZSBwcm8gZGF0b3ZvdSB2xJt0dVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdBd2FpdC50aGVuKCgpID0+IHsgR29yZGljLkVrby5XZWJDbGllbnQuRGF0YVNlbnRlbmNlQWRhcHRlci5nZXRDYWNoZUNvbnRlbnQodGhpcy5JeHNSb3osIHRoaXMuSXhzU2F4KTsgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBEYXNoYm9hcmRcclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuQmxvZ1Byb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBibG9nxa9cclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuQXJ0aWNsZVByb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSDEjWzDoW5rxa8gKHXFvml2YXRlbHNreSBlZGl0b3ZhdGVsbsO9IHRleHQpXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLklzbFByb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBqYWvDqWtvbGkgZG9zdHVwbsOpIElTTCBtZXRvZHkgdnJhY2Vqw61jw60gc2V6bmFtIGRhdCAoamUgbW/Fvm7DqSBuYXN0YXZpdCBpIHZvbMOhbsOtIGRldGFpbHUgcMWZaSBrbGlrbnV0w60gbmEgcG9sb8W+a3UpXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLlJzc1Byb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBSU1MgenByw6F2ICh2xI1ldG7EmyBzdHLDoW5rb3bDoW7DrSwgdnlobGVkw6F2w6Fuw60gYSBmaWx0cm92w6Fuw60gcG9kbGUga2F0ZWdvcmnDrSkgICAgICAgICAgIFxyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5SZXN0UHJvdmlkZXIoKSk7IC8vemFwb2plbsOtIGV4dGVybsOtY2ggUkVTVCBzbHXFvmViXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLkZpbGVQcm92aWRlcigpKTsgLy96YXBvamVuw60gbmHEjcOtdMOhbsOtIGRhdCB6ZSBzb3Vib3J1IHR5cHUgSlNPTiwga3RlcsO9IGplIHZsb8W+ZW4gZG8gc2xvxb5reSBEYXRhIHYgYWRyZXPDocWZaSBhcGxpa2FjZVxyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5YcmdTZXJ2aWNlUHJvdmlkZXIoKSk7IC8vemFwb2plbsOtIG5hxI3DrXTDoW7DrSBkYXQgemUgWFJHIHNsdcW+YnkgdXZlZGVuw6kgdmUgd2ViLmNvbmZpZyBzcG9sdSBzIG5hc3RhdmVuw71taSBwxZnDrXN0dXBvdsO9bWkgw7pkYWppXHJcbiAgICAgICAgICAgIC8vR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuRGF0YVJlcG9ydFByb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBzZXN0YXZcclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5DdXN0b21Qcm92aWRlcnMucmVnaXN0ZXIoY3JlYXRlU3RhdEtuaWh5KGNvbnRlbnQpKTtcclxuICAgICAgICAgICAgLy8gWmFyZWdpc3RydWppIFdGTCByZXNvbHZlciBobGVkw6Fuw60gcGlkdSBkbyBvYmVjbsOpaG8gaGxlZGFjw61obyBwb2zDrcSNa2EuXHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuVXRpbHMucmVnaXN0ZXJTZWFyY2hSZXNvbHZlcnMoe1xyXG4gICAgICAgICAgICAgICAgcGlkU2VhcmNoUmVzb2x2ZXJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuRGV0YWlsOiAoaXhzSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb2RlbGF0IG5hY3RlbmkgZGxlIGZyYW1nbWVudHUgdiByZWFkLCBhYnkgc2UgbmVuYWNpdGFsIGppbm91IGZ1bmtjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnRlbnQuaXNsLlVjdERva2xhZC5yZWFkKHsgaXhwOiBpeHNJbmZvLkl4eDEsIGZyYWdtZW50czpbXCJpeHBfZGVuXCJdIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpvYnJhemVuw6EgZGV0YWlsxa8gcG9kbGUgdG9obywgbyBqYWvDvSB0eXAgamRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50LmlzbC5VY3REb2tsYWQuZ2V0S25paGFaRG9rbGFkdSh7IGl4cDogaXhzSW5mby5JeHgxIGFzIHN0cmluZyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoaXhwRGVuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpeHBEZW4gPT09IFwidW5kZWZpbmVkXCIgfHwgaXhwRGVuLnRyaW0oKSA9PSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUoZmFsc2UpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3R3BjID0gR29yZGljLkVrby5VdGlscy5jcmVhdGVCb29rR3BjKGNvbnRlbnQuZ3BjLCBpeHBEZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3REZXRhaWxcIiwgeyBncGM6IG5ld0dwYyB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBFZGl0YWNlSGxhdmlja3k6IGZhbHNlLCBpZDogJ3VjdERldGFpbERva2xhZHUnLCBJeHA6IGl4c0luZm8uSXh4MSwgSXhwRGVuOiBpeHBEZW4gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb250ZW50Lm5hdmlnYXRlKCdHb3JkaWMuVWN0LldlYkNsaWVudC5HVWN0RGV0YWlsJywgeyBFZGl0YWNlSGxhdmlja3k6IGZhbHNlLCBpZDogJ3VjdERldGFpbERva2xhZHUnLCBJeHA6IGl4c0luZm8uSXh4MSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUodHJ1ZSkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkPGJvb2xlYW4+KCkucmVzb2x2ZSh0cnVlKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHJlZ2lzdHJhY2UgdXppdi4gbmFzdGF2ZW5pXHJcbiAgICAgICAgICAgIEdvcmRpYy5XZWJBcHAuZ2xvYmFsU2V0dGluZ0Zvcm1zLnJlZ2lzdGVyKFtcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRzVXNlclNldHRpbmdzKCksXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuV2ZsLkFwcFNldHRpbmdzLkF0dGFjaG1lbnRPcGVuU2V0dGluZ3NGb3JtKCksXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuV2ZsLkFwcFNldHRpbmdzLkNvbG9yUGlja2VyU2V0dGluZ3NGb3JtKCksXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLlV0aWxzLkVrb1VzZXJTZXR0aW5nc1BpZCh0aGlzLlBvdm9saXRHZW5lcm92YW5pUGlkdURva2xhZHUgPyBcImFub1wiIDogXCJuZVwiLyogXCJHbG9iYWwuVWN0LkFwcFNldHRpbmdzKi8pLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkVrby5VdGlscy5Fa29Vc2VyU2V0dGluZ3NFa29Cb29rKCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLlVjdFVzZXJTZXR0aW5nc1ZvbGJ5KClcclxuICAgICAgICAgICAgICAgICwgR29yZGljLkVrby5VdGlscy5Fa29Vc2VyU2V0dGluZ3NFa29Cb29rKClcclxuICAgICAgICAgICAgICAgIC8vLCB0aGlzLlVjdFVzZXJTZXR0aW5nc1ByZUZpbGxlZFZhbHVlcygpXHJcbiAgICAgICAgICAgICAgICAvLywgR29yZGljLkVrby5VdGlscy5Vc2VyU2V0dGluZ3NQaWQoXCJHbG9iYWwuVWN0LkFwcFNldHRpbmdzXCIsIHRoaXMuUG92b2xpdEdlbmVyb3ZhbmlQaWR1RG9rbGFkdT9cIjFcIjpcIjBcIilcclxuICAgICAgICAgICAgICAgICwgR29yZGljLkVrby5VdGlscy5Fa29Vc2VyU2V0dGluZ3NMaXN0KC8qXCJHbG9iYWwuVWN0LkFwcFNldHRpbmdzXCIqLylcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIC8vIFBybyBocm9tYWRub3UgRklLXHJcbiAgICAgICAgICAgIC8vR29yZGljLldmbC5XZWJDbGllbnQuR0hGS0FzeW5jVXRpbHModGhpcywgR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLmNyZWF0ZWRHcmlkRm9ybWF0KG51bGwgYXMgYW55KSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuV2ViQ2xpZW50LkdIRktBc3luY1V0aWxzKHRoaXMsIG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgLy8gICBEZWxlZ8OhdCBwcm8gZXZpZGVuY2kgeiByZWRpc3RyaWJ1Y2VcclxuICAgICAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICBldmlkZW5jZURlbGVnYXRlKG9iajogeyBwaWRzOiBzdHJpbmdbXSwgdHlwQWc6IG51bWJlciB9KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuRG9jc0ZvclJlZy5zaG93RWJvb2tzQ2hvaWNlKHRoaXMuZWxlbWVudCwgb2JqLnR5cEFnKS50aGVuKChrbmloYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy92YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBub3ZlR3BjID0gRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGModGhpcy5ncGMsIGtuaWhhLml4cF9kZW4hKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBub3bDqSBHUEMgZGxlIGtuaWh5XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBsZXQgbF9vQ250ID0gdGhpcy5jcmVhdGVTZXJ2aWNlQ29udGVudChbXCJHb3JkaWMuVWN0LldlYkNsaWVudC5HVWN0U2VydmljZUNvbnRlbnRcIiwgeyBncGM6IG5vdmVHcGMgfV0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZ5dHZvxZllbsOtIHNlcnZpc27DrWhvIGNvbnRlbnR1XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ldmlkb3ZhdCh0aGlzLmNyZWF0ZVNlcnZpY2VDb250ZW50KFtcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3RTZXJ2aWNlQ29udGVudFwiLCB7IGdwYzogbm92ZUdwYyB9XSksXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLCBrbmloYSwgbm92ZUdwYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gbF9vQ250LmlzbC5VY3REb2tsYWQuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIElkTWVzc2FnZTogXCJcIiwgU2VqbXV0aVBpZHU6IHRydWVcclxuICAgICAgICAgICAgICAgIC8vICAgICwgUGlkRG9rbGFkdTogb2JqLnBpZHNbMF1cclxuICAgICAgICAgICAgICAgIC8vICAgICwgaXhwRGVuOiBrbmloYS5peHBfZGVuXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC8vICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcm9taXNlXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9yZXR1cm4gWm9icmF6RGV0YWlsRGxlSVhQKHRoYXQsIG9iai5waWRzWzBdLCBmYWxzZSx0cnVlKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gdGhhdC5uYXZpZ2F0ZShbXCJHb3JkaWMuVWN0LldlYkNsaWVudC5HVWN0RGV0YWlsXCIsIHsgZ3BjOiBub3ZlR3BjIH1dLCB7ICAgICAgICAgICAgICAgICAgICAgIC8vIG90ZXbFmcOtdCBkZXRhaWxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy91aWQ6IFwiRGV0YWlsX2Rva2xhZHUjXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGl4cDogb2JqLnBpZHNbMF0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIEVkaXRhY2VIbGF2aWNreTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgaWQ6IFwidWN0RGV0YWlsRG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgKS5hbHdheXMoKCkgPT4geyBsX29DbnQuY2xvc2UoKTsgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6YXbFmWVuw60gc2VydmlzbsOtaG8ga29udGVudHVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGV2aWRvdmF0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudFxyXG4gICAgICAgICAqIEBwYXJhbSB7eyBwaWRzOiBzdHJpbmdbXX0gb2JqXHJcbiAgICAgICAgICogQHBhcmFtIHtFa28uSW50ZXJmYWNlLkdFa29zZGVuRHRvfSBrbmloYVxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0TGl0ZXJhbDxhbnk+ICYgeyBpeHBfZGVuOiBzdHJpbmd9IG5vdmVHcGNcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3REb2tsYWRQb2RhbmlSZXF1ZXN0RHRvfSBbdnN0dXBdXHJcbiAgICAgICAgICogQHBhcmFtIHthbnkgfCB1bmRlZmluZWQgfCBudWxsfSBbZGVmXVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPGFueT59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBldmlkb3ZhdChjb250ZW50OiBHQ29udGVudCwgb2JqOiB7IHBpZHM6IHN0cmluZ1tdLCB0eXBBZzogbnVtYmVyIH0sIGtuaWhhOiBFa28uSW50ZXJmYWNlLkdFa29zZGVuRHRvLCBub3ZlR3BjOiBPYmplY3RMaXRlcmFsPGFueT4gJiB7XHJcbiAgICAgICAgICAgIGl4cF9kZW46IHN0cmluZztcclxuICAgICAgICB9LCB2c3R1cD86IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3REb2tsYWRQb2RhbmlSZXF1ZXN0RHRvLCBkZWY/OiBhbnkgfCB1bmRlZmluZWQgfCBudWxsKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2c3R1cCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgdnN0dXAgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgSWRNZXNzYWdlOiBcIlwiLCBTZWptdXRpUGlkdTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICwgUGlkRG9rbGFkdTogb2JqLnBpZHNbMF1cclxuICAgICAgICAgICAgICAgICAgICAsIGl4cERlbjoga25paGEuaXhwX2RlblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAzNDdcIikgLy9SQyAzMDI1MDM0NyA6IFByb2LDrWjDoSB1a2zDoWTDoW7DrVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50LmlzbC5VY3REb2tsYWQuY3JlYXRlKHZzdHVwKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFtcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3REZXRhaWxcIiwgeyBncGM6IG5vdmVHcGMgfV0sIHsgICAgICAgICAgICAgICAgICAgICAgLy8gb3RldsWZw610IGRldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91aWQ6IFwiRGV0YWlsX2Rva2xhZHUjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IG9iai5waWRzWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRWRpdGFjZUhsYXZpY2t5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidWN0RGV0YWlsRG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKFxyXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb25OZXcoY29udGVudCwgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnN0dXAhLk5hc3RhdmVuaSA9IHJldHVyblZhbHVlLk5hc3RhdmVuaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5ldmlkb3ZhdChjb250ZW50LCBvYmosIGtuaWhhLCBub3ZlR3BjLCB2c3R1cCwgZGVmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRm9ybXVsYXIgdm9sZWJcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgVWN0VXNlclNldHRpbmdzVm9sYnkoKTogRm9ybXMuRm9ybSB7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9sZXQgZm9ybSA9IEdvcmRpYy5Fa28uVXRpbHMuRWtvVXNlclNldHRpbmdzUGlkKHRoaXMuUG92b2xpdEdlbmVyb3ZhbmlQaWR1RG9rbGFkdSA/IFwiYW5vXCIgOiBcIm5lXCIvKiBcIkdsb2JhbC5VY3QuQXBwU2V0dGluZ3MqLylcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIlVjdFNldHRpbmdzRm9ybVwiLCB0YWJPcHRpb25zOiB7IHRpdGxlOiBcImpyZXM6MzAyNTA2NzhcIiB9IH0gYXMgYW55KSAvL1JDIDMwMjUwNjc4IDogRGV0YWlsIGRva2xhZHVcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDMyNVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyAvL1JDIDMwMjUwMzI1IDogWm9icmF6ZW7DrSBzdGF2xa9cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlVDVFpvYnJhemVuaVN0YXZ1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3RleHR9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IHN0YXZ6b2JyYXppdDogSW50ZXJmYWNlLkdFWm9icmF6ZW5pU3RhdnUuU3RhdkRva2xhZHUgfSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJqcmVzOjMwMjUwMzAyXCIsIHN0YXZ6b2JyYXppdDogSW50ZXJmYWNlLkdFWm9icmF6ZW5pU3RhdnUuUG91emVTdGF2IH0sIC8vUkMgMzAyNTAzMDIgOiBQb3V6ZSBzdGF2IMO6xI10dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwianJlczozMDI1MDMwM1wiLCBzdGF2em9icmF6aXQ6IEludGVyZmFjZS5HRVpvYnJhemVuaVN0YXZ1LlN0YXZBTmV6YXVjdG92YW5lVnNlY2hueSB9LCAvL1JDIDMwMjUwMzAzIDogU3RhdiDDusSNdHUgYSB2xaFlY2hueSBuZXphw7rEjXRvdmFuw6kgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcImpyZXM6MzAyNTAzMDRcIiwgc3RhdnpvYnJheml0OiBJbnRlcmZhY2UuR0Vab2JyYXplbmlTdGF2dS5TdGF2QU5lemF1Y3RvdmFuZURva2xhZHUgfSwgLy9SQyAzMDI1MDMwNCA6IFN0YXYgw7rEjXR1IGEgbmV6YcO6xI10b3ZhbsOpIHBvbG/Fvmt5IGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcImpyZXM6MzAyNTAwOTJcIiwgc3RhdnpvYnJheml0OiBJbnRlcmZhY2UuR0Vab2JyYXplbmlTdGF2dS5TdGF2RG9rbGFkdSB9LCAvL1JDIDMwMjUwMDkyIDogU3RhdiBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgXSwgeyBrZXk6IFwic3RhdnpvYnJheml0XCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLlVjdC5BcHBTZXR0aW5ncy5VY3RTZXR0aW5nc0Zvcm0uWm9icmF6ZW5pU3RhdnU9dmFsdWUuc3RhdnpvYnJheml0XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDMyNlwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyAvL1JDIDMwMjUwMzI2IDogQWtjZSBwbyBldmlkZW5jaVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiRXZpZGVuY2VBa2NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3RleHR9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGFrY2U6IFwiMVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwianJlczozMDI1MDMyN1wiLCBha2NlOiBcIjBcIiB9LCAvL1JDIDMwMjUwMzI3IDogTm92w70gxZnDoWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwianJlczozMDI1MDMyOFwiLCBha2NlOiBcIjFcIiB9LCAvL1JDIDMwMjUwMzI4IDogxb3DoWRuw6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcImpyZXM6MzAyNTAzMjlcIiwgYWtjZTogXCIyXCIgfSwgLy9SQyAzMDI1MDMyOSA6IFNwdcWhdMSbbsOtIHDFmWVka29udGFjZVxyXG4gICAgICAgICAgICAgICAgICAgIF0sIHsga2V5OiBcImFrY2VcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuVWN0LkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS5FdmlkZW5jZUFrY2U9dmFsdWUuYWtjZVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAzMDlcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgLy9SQyAzMDI1MDMwOSA6IFDFmWVkcGxuxJtuw60gZGF0YSDDusSNdG92w6Fuw60gbmEgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVUNURGF0dW1Eb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTAzMDlcIiwgLy9SQyAzMDI1MDMwOSA6IFDFmWVkcGxuxJtuw60gZGF0YSDDusSNdG92w6Fuw60gbmEgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7dGV4dH1cIixcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyB0ZXh0OiBcImpyZXM6MzAyNTAzMTBcIiwgZGF0dW1Eb2tsYWR1OiAwIH0sIC8vUkMgMzAyNTAzMTAgOiBOZXDFmWVkcGzFiG92YXRcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJqcmVzOjMwMjUwMzEwXCIsIGRhdHVtRG9rbGFkdTogMCB9LCAvL1JDIDMwMjUwMzEwIDogTmVwxZllZHBsxYhvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJqcmVzOjMwMjUwMzExXCIsIGRhdHVtRG9rbGFkdTogMiB9LCAvL1JDIDMwMjUwMzExIDogUMWZZWRwbG5pdCBha3R1w6FsbsOtIGRhdHVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJqcmVzOjMwMjUwMzEyXCIsIGRhdHVtRG9rbGFkdTogMSB9LCAvL1JDIDMwMjUwMzEyIDogUMWZZWRwbG5pdCBuZWpuacW+xaHDrSBvdGV2xZllbsO9IG3Em3PDrWNcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcImpyZXM6MzAyNTAzMTNcIiwgZGF0dW1Eb2tsYWR1OiAzIH0sIC8vUkMgMzAyNTAzMTMgOiBQxZllZHBsbml0IG5lanZ5xaHFocOtIG90ZXbFmWVuw70gbcSbc8OtY1xyXG4gICAgICAgICAgICAgICAgICAgIF0sIHsga2V5OiBcImRhdHVtRG9rbGFkdVwiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5VY3QuQXBwU2V0dGluZ3MuVWN0U2V0dGluZ3NGb3JtLkRhdHVtRG9rbGFkdT12YWx1ZS5kYXR1bURva2xhZHVcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwNjM3XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7IC8vUkMgMzAyNTA2MzcgOiBab2JyYXplbsOtIHBvbG/FvmVrXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJVQ1RQb2xvemt5Wm9icmF6ZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTA2NDBcIiwgLy9SQyAzMDI1MDY0MCA6IFVtw61zdMSbbsOtIHBvbG/FvmVrIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3RleHR9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgdGV4dDogXCJqcmVzOjMwMjUwNjM5XCIsIHBvbG96a3lWaWV3OiAxIH0sIC8vUkMgMzAyNTAzMTAgOiBOZXDFmWVkcGzFiG92YXRcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJqcmVzOjMwMjUwNjM4XCIsIHBvbG96a3lWaWV3OiAwIH0sIC8vUkMgMzAyNTA2MzggOiBWIHNhbW9zdGF0bsOpIHrDoWxvxb5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwianJlczozMDI1MDYzOVwiLCBwb2xvemt5VmlldzogMSB9LCAvL1JDIDMwMjUwNjM5IDogUG9kIHrDoWxvxb5rb3UgWsOha2xhZG7DrSDDumRhamVcclxuICAgICAgICAgICAgICAgICAgICBdLCB7IGtleTogXCJwb2xvemt5Vmlld1wiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5VY3QuQXBwU2V0dGluZ3MuVWN0U2V0dGluZ3NGb3JtLlBvbG96a3lWaWV3PXZhbHVlLnBvbG96a3lWaWV3XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDg0OFwiKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IC8vUkMgMzAyNTA4NDggOiBBdXRvbWF0aWNreSBrb250cm9sb3ZhdCB2c3R1cG7DrSBkYXRhIGltcG9ydHVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlVDVFBvbG96a3lJbXBvcnRLb250cm9sYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDg0OVwiLCAvL1JDIDMwMjUwODQ5IDogUMWZaSBzcHXFoXTEm27DrSBha2NlIGltcG9ydHUgcG9tb2PDrSBwb21vY27DrWthIGJ1ZG91IGF1dG9tYXRpY2t5IGtvbnRyb2xvdsOhbmEgdnN0dXBuw60gZGF0YS5cclxuICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5VY3QuQXBwU2V0dGluZ3MuVWN0U2V0dGluZ3NGb3JtLlBvbG96a3lJbXBvcnRLb250cm9sYT12YWx1ZVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Qb3ZvbGVuaU51bFZQcmVka29udGFjaSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVBvdm9sZW5pTnVsVlByZWRrb250YWNlLkRsZVV6aXZOYXN0YXZlbmkpXHJcbiAgICAgICAgICAgICAgICBmb3JtLmFkZFJvdyhcImpyZXM6MzAyNTA4NThcIikuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyAvL1JDIDMwMjUwODU4IDogUG92b2xpdCBudWxvdsOpIGhvZG5vdHkgdiBwxZllZGtvbnRhY2lcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlVDVFByZWRrb250YWNlTnVseVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDg1OVwiLCAvL1JDIDMwMjUwODU5IDogUG92b2xpbnQgbnVsb3bDqSBob2Rub3R5IE1EIGEgREFMIG5hIMO6xI1ldG7DrWNoIHrDoXBpc2NoIHZ5dHbDocWZZW7DvWNoIHBvbW9jw60gcMWZZWRrb250YWNlLlxyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLlVjdC5BcHBTZXR0aW5ncy5VY3RTZXR0aW5nc0Zvcm0uUHJlZGtvbnRhY2VOdWx5PXZhbHVlXCJcclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRm9ybXVsYXIgcHJvIHByZWRwbG5lbmUgaG9kbm90eVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBVY3RVc2VyU2V0dGluZ3NQcmVGaWxsZWRWYWx1ZXMoKTogRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtc1xyXG5cclxuICAgICAgICAgICAgICAgIC5Gb3JtKHsgbmFtZTogXCJVY3RTZXR0aW5nc0Zvcm1cIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJqcmVzOjMwMjUwMzE2XCIsIG9wZW5lZDogZmFsc2UgfSB9IGFzIGFueSkgLy9SQyAzMDI1MDMxNiA6IFDFmWV2eXBsxYhvdmFuw6kgaG9kbm90eVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMzA5XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7IC8vUkMgMzAyNTAzMDkgOiBQxZllZHBsbsSbbsOtIGRhdGEgw7rEjXRvdsOhbsOtIG5hIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlVDVERhdHVtRG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMjUwMzA5XCIsIC8vUkMgMzAyNTAzMDkgOiBQxZllZHBsbsSbbsOtIGRhdGEgw7rEjXRvdsOhbsOtIG5hIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3RleHR9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgc3RhdnpvYnJheml0OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwianJlczozMDI1MDMxMFwiLCBkYXR1bURva2xhZHU6IDAgfSwgLy9SQyAzMDI1MDMxMCA6IE5lcMWZZWRwbMWIb3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwianJlczozMDI1MDMxMVwiLCBkYXR1bURva2xhZHU6IDIgfSwgLy9SQyAzMDI1MDMxMSA6IFDFmWVkcGxuaXQgYWt0dcOhbG7DrSBkYXR1bVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwianJlczozMDI1MDMxMlwiLCBkYXR1bURva2xhZHU6IDEgfSwgLy9SQyAzMDI1MDMxMiA6IFDFmWVkcGxuaXQgbmVqbmnFvsWhw60gb3RldsWZZW7DvSBtxJtzw61jXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJqcmVzOjMwMjUwMzEzXCIsIGRhdHVtRG9rbGFkdTogMyB9LCAvL1JDIDMwMjUwMzEzIDogUMWZZWRwbG5pdCBuZWp2ecWhxaHDrSBvdGV2xZllbsO9IG3Em3PDrWNcclxuICAgICAgICAgICAgICAgICAgICBdLCB7IGtleTogXCJkYXR1bURva2xhZHVcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuVWN0LkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS5EYXR1bURva2xhZHU9dmFsdWUuZGF0dW1Eb2tsYWR1XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvKi5hZGRTZWN0aW9uKFwianJlczozMDI1MDMxOVwiKSAvL1JDIDMwMjUwMzE5IDogTmFzdGF2aXRlbG7DqSB0ZXh0eSBkb2tsYWTFryBwcm8gdGlza292w6kgdsO9c3R1cHlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe2xhYmVsOiBcImpyZXM6MzAyNTAzMjBcIn0pIC8vUkMgMzAyNTAzMjAgOiBOYXN0YXZlbsOtIG5hOiAgXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIixcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVUNOYUtuaWh1QUZ1bmtjaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5VY3QuQXBwU2V0dGluZ3MuVWN0U2V0dGluZ3NGb3JtLlVDTmFLbmlodUFGdW5rY2k9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pdGVtQ2xhc3M6IFwidy0zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6IFwianJlczozMDI1MDMxN1wifSwgLy9SQyAzMDI1MDMxNyA6IE5hIGtuaWh1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAxLCBsYWJlbDogXCJqcmVzOjMwMjUwMzE4XCIgfSwgLy9SQyAzMDI1MDMxOCA6IE5hIGtuaWh1IGEgZnVua2NpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVGV4dGsgMVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVUNUVGV4dDFcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuVWN0LkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS5VQ1RUZXh0MT12YWx1ZVwiIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUZXh0ayAyXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJVQ1RUZXh0MlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5VY3QuQXBwU2V0dGluZ3MuVWN0U2V0dGluZ3NGb3JtLlVDVFRleHQyPXZhbHVlXCIgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlRleHRrIDNcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlVDVFRleHQzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLlVjdC5BcHBTZXR0aW5ncy5VY3RTZXR0aW5nc0Zvcm0uVUNUVGV4dDM9dmFsdWVcIiBcclxuICAgICAgICAgICAgICAgIH0pKi9cclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE90ZXbFmWVuw60ga2FydG90w6lreSBleHRlcm7DrWNoIHN1Ympla3TFr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBrYXJ0b3Rla2FFc3UoKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIC8vIFVjZWw6IDIsXHJcbiAgICAgICAgICAgICAgICBMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgIEl4cDogJzAwMDBYMDAwMDA0SicsXHJcbiAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuRHV2b2RIbGVkYW5pRXN1LmthcnRvdGVrYVZNZW51QXBsaWthY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBJbml0aWFsVmFsdWVEdXZvZEhsZWRhbmlUeHQ6IFwianJlczozMDI1MDY5OFwiIC8vUkMgMzAyNTA2OTggOiBOYWhsw63FvmVuw60geiBtb2R1bHUgVUNUXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fc3UuRGlhbG9ncy5LYXJ0b3Rla2FFc3VEbGdGcm9tTWFpbih0aGF0LCBvcHRpb25zLCBHb3JkaWMuR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLm5hdmlnYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE90ZXZyZW5pIHV6YXZlcmt5IGFnZW5keVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIG9wZW5VemF2ZXJrYUFnZW5kYShhZ2VuZGEpIHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogR29yZGljLkVrby5XZWJDbGllbnQuSUdFa29BZ2VuZGFPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgY2xvc2U6ICh0eXBBZykgPT4gdGhpcy5pc2wuVWN0QWdlbmRhLnV6YXZyaXRBZ2VuZHUoKS5nZXREYXRhKCksXHJcbiAgICAgICAgICAgICAgICBhZ2VuZGE6IGFnZW5kYSxcclxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zOiAoYWdlbmR5KSA9PiB0aGlzLmlzbC5VY3RBZ2VuZGEucG92b2xlbmlBa2NpQWdlbmR5KCkuZ2V0KCkudGhlbigocikgPT4gciksXHJcbiAgICAgICAgICAgICAgICBnZXREYXRhOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLlVjdEFnZW5kYS5yZWFkKCkuZ2V0RGF0YSgpLnRoZW4oKHIpID0+IFtyXSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2hlY2tDbG9zZTogKGFnZW5keSkgPT4gJC5EZWZlcnJlZCgpLnJlc29sdmUoYWdlbmR5KS5wcm9taXNlKClcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICh0aGlzIGFzIGFueSkubmF2aWdhdGVUYXNrKEdvcmRpYy5Fa28uV2ViQ2xpZW50LkdFa29BZ2VuZGEsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPdGV2cmVuaSB1emF2ZWt5IGtuaWhcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBvcGVuVXphdmVya2FLbmloeSgpIHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogR29yZGljLkVrby5XZWJDbGllbnQuSUdFa29LbmloYU9wdGlvbnMgPSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YTogdGhpcy5pc2wuVWN0S25paGEua25paHlLVXphdmVya2FtKCksXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxDbG9zZTogKGtuaWh5KSA9PiB0aGlzLmlzbC5VY3RLbmloYS5vdGV2cml0S25paHkoeyBrbmloeToga25paHkgfSkuZ2V0RGF0YSgpLFxyXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbnM6ICgpID0+IHRoaXMuaXNsLlVjdEtuaWhhLmdldFBlcm1pc3Npb25zKCkuZ2V0KCkudGhlbigocmVzdWx0KSA9PiByZXN1bHQpXHJcbiAgICAgICAgICAgICAgICAsIGNsb3NlOiAoa25paHkpID0+IHRoaXMuaXNsLlVjdEtuaWhhLnV6YXZyaXRLbmloeSh7IGtuaWh5OiBrbmloeSB9KS5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICwgY2hlY2tDYW5jZWxDbG9zZTogKGtuaWh5KSA9PiB0aGlzLmlzbC5VY3RLbmloYS5rb250cm9sYUtuaWhPdGV2cml0KHsga25paHk6IGtuaWh5IH0pLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLCBjaGVja0Nsb3NlOiAoa25paHkpID0+IHRoaXMuaXNsLlVjdEtuaWhhLmtvbnRyb2xhS25paFV6YXZyaXQoeyBrbmloeToga25paHkgfSkuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAvLywgcHJlcGFyZUNsb3NlOiAoa25paHkpID0+ICQuRGVmZXJyZWQoKS5yZXNvbHZlKGtuaWh5KS5wcm9taXNlKCkgICAgXHJcbiAgICAgICAgICAgICAgICAvLywgY2FuY2VsUHJlcGFyZUNsb3NlOiAoa25paHkpID0+IHRoaXMuaXNsLlVjdEtuaWhhLm90ZXZyaXRLbmloeSh7IGtuaWh5OiBrbmloeSB9KS5nZXREYXRhKCkgICBcclxuICAgICAgICAgICAgICAgIC8vLCBjaGVja0NhbmNlbFByZXBhcmVDbG9zZTogKGtuaWh5KSA9PiAkLkRlZmVycmVkKCkucmVzb2x2ZShrbmloeSkucHJvbWlzZSgpICAgIFxyXG4gICAgICAgICAgICAgICAgLy8sIGNoZWNrUHJlcGFyZUNsb3NlOiAoa25paHkpID0+ICQuRGVmZXJyZWQoKS5yZXNvbHZlKGtuaWh5KS5wcm9taXNlKClcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAodGhpcyBhcyBhbnkpLm5hdmlnYXRlVGFzayhHb3JkaWMuRWtvLldlYkNsaWVudC5HRWtvU2V6bmFtS25paCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBWeXR2b8WZw60gcHJvdmlkZXIgcHJvIHBvxI10eSBwb2h5YsWvIGsgw7rEjXRvdsOhbsOtXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGdjb250ZW50IGNvbnRlbnRcclxuICAgICAqIEByZXR1cm5zIHtHb3JkaWMuRGFzaGJvYXJkLkN1c3RvbVByb3ZpZGVyfSBwcm92aWRlciBzIHBvxI10eVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RhdEtuaWh5KGdjb250ZW50OiBHQ29udGVudCk6IEdvcmRpYy5EYXNoYm9hcmQuQ3VzdG9tUHJvdmlkZXIge1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGFzaGJvYXJkLkN1c3RvbVByb3ZpZGVyKFwiU2V6bmFtIGtuaWhcIiwgXCJrbmloeVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBrcGlLbmloeTogR09ic2VydmFibGVPYmplY3Q8YW55PltdID0gW107XHJcbiAgICAgICAgICAgIGxldCBrbmloeTogRWtvLkludGVyZmFjZS5HRWtvc2RlbkR0b1tdID0gW107XHJcbiAgICAgICAgICAgIC8vIGRvc3R1cG7DqSBrbmloeVxyXG4gICAgICAgICAgICByZXR1cm4gZ2NvbnRlbnQuaXNsLkVrb0tuaWhhLmxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cF9hZzogNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgcm9rOiBnY29udGVudC5ncGMucm9rXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwaWR5S25paCA9IGRhdGEubWFwKChpdGVtKSA9PiBpdGVtLml4cF9kZW4hKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2NvbnRlbnQuaXNsLlVjdERva2xhZC5wb2N0eURva2xhZHVWS25paGFjaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNlem5hbUtuaWg6IHBpZHlLbmloLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0cnk6IFtJbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLktlU2NodmFsZW5pLCBJbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLktaYXVjdG92YW5pLCBJbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLk5lZXZpZG92YW5lLCBJbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLlByb3VjdG92YW5lLCBJbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLlV6YXZyZW5lLCBJbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLlZzZWNobnldLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoa25paGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm91bmRlZEJvb2sgPSByZXNwb25zZS5maW5kKChpdGVtKSA9PiBpdGVtLml4cF9kZW4gPT09IGtuaWhhLml4cF9kZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtwaUtuaWh5LnB1c2goY3JlYXRlS1BJSXRlbXMoa25paGEsIGZvdW5kZWRCb29rKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga25paHkucHVzaChrbmloYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFuZWxQb2NldERva3VtbmV0dVZLbml6ZSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2Jhc2VwYW5lbChHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpTXVsdGlSb3dzVGVtcGxhdGUoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzdGF0aXN0aWthX2tuaWh5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaVZhbHVlVHdvUm93c1RleHRUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGtwaUtuaWh5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhbmVsUG9jZXREb2t1bW5ldHVWS25pemU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgS1BJIHMgcG9sb3prYW1pXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGtuaWhhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlS1BJSXRlbXMoa25paGE6IEVrby5JbnRlcmZhY2UuR0Vrb3NkZW5EdG8sIHBvY3R5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0UG9jZXREb2tsYWR1RHRvIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR09ic2VydmFibGVPYmplY3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGtuaWhhLm5hemV2LFxyXG4gICAgICAgICAgICAgICAgZGV0YWlsc0RpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgbmFtZToga25paGEuaXhwX2RlbixcclxuICAgICAgICAgICAgICAgIGRldGFpbHM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwb2N0eSA/IHBvY3R5Py5rZXNjaHZhbGVuaSA6IFwiMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNTUyXCIsIC8vUkMgMzAyNTA1NTIgOiBrZSBzY2h2w6FsZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBrbmloYS5peHBfZGVuICsgXCJfXCIgKyBJbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLktlU2NodmFsZW5pIGFzIGFueSwgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnliZXJTZXpuYW11KGdjb250ZW50IGFzIGFueSwga25paGEsIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5LZVNjaHZhbGVuaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcG9jdHkgPyBwb2N0eS5remF1Y3RvdmFuaSA6IFwiMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNTUzXCIsIC8vUkMgMzAyNTA1NTMgOiBrIHphw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHsgbmFtZToga25paGEuaXhwX2RlbiArIFwiX1wiICsgSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5LWmF1Y3RvdmFuaSBhcyBhbnksIHJ1bjogZnVuY3Rpb24gKCkgeyB2eWJlclNlem5hbXUoZ2NvbnRlbnQgYXMgYW55LCBrbmloYSwgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLktaYXVjdG92YW5pKTsgfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHBvY3R5ID8gcG9jdHkucHJvdWN0b3ZhbmUgOiBcIjBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDcwNVwiLCAvL1JDIDMwMjUwNzA1IDogemHDusSNdG92YW7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7IG5hbWU6IGtuaWhhLml4cF9kZW4gKyBcIl9cIiArIEludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuUHJvdWN0b3ZhbmUgYXMgYW55LCBydW46IGZ1bmN0aW9uICgpIHsgdnliZXJTZXpuYW11KGdjb250ZW50IGFzIGFueSwga25paGEsIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5Qcm91Y3RvdmFuZSk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwb2N0eSA/IHBvY3R5LnV6YXZyZW5lIDogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA1NTVcIiwgLy9SQyAzMDI1MDU1NSA6IHV6YXbFmWVuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oeyBuYW1lOiBrbmloYS5peHBfZGVuICsgXCJfXCIgKyBJbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLlV6YXZyZW5lIGFzIGFueSwgcnVuOiBmdW5jdGlvbiAoKSB7IHZ5YmVyU2V6bmFtdShnY29udGVudCBhcyBhbnksIGtuaWhhLCBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuVXphdnJlbmUpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcG9jdHkgPyBwb2N0eS5uZWV2aWRvdmFuZSA6IFwiMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNTU2XCIsIC8vUkMgMzAyNTA1NTYgOiBuZWV2aWRvdmFuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oeyBuYW1lOiBrbmloYS5peHBfZGVuICsgXCJfXCIgKyBJbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLk5lZXZpZG92YW5lIGFzIGFueSwgcnVuOiBmdW5jdGlvbiAoKSB7IHZ5YmVyU2V6bmFtdShnY29udGVudCBhcyBhbnksIGtuaWhhLCBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuTmVldmlkb3ZhbmUpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcG9jdHkgPyBwb2N0eS52c2VjaG55IDogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA4NDJcIiwgLy9SQyAzMDI1MDg0MiA6IENlbGtlbSBiZXogbmVldmlkb3ZhbsO9Y2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oeyBuYW1lOiBrbmloYS5peHBfZGVuICsgXCJfXCIgKyBJbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLlZzZWNobnkgYXMgYW55LCBydW46IGZ1bmN0aW9uICgpIHsgdnliZXJTZXpuYW11KGdjb250ZW50IGFzIGFueSwga25paGEsIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5Wc2VjaG55KTsgfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBWeWJlciBmaWx0cnUgc2V6bmFtdVxyXG4gICAgICAgICAgICAqIEBwYXJhbSBpZEtuaWhhXHJcbiAgICAgICAgICAgICogQHBhcmFtIHR5cEZpbHRydVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHZ5YmVyU2V6bmFtdShnY29udGVudDogR0NvbnRlbnQsIGtuaWhhOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HRWtvc2RlbkR0bywgdHlwRmlsdHJ1OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgbmV3R3BjID0gR29yZGljLkVrby5VdGlscy5jcmVhdGVCb29rR3BjKHRoaXMuZ3BjLCBpZEtuaWhhKTtcclxuICAgICAgICAgICAgbGV0IG5ld0dwYyA9IChrbmloYSAhPSBudWxsID8gR29yZGljLkVrby5VdGlscy5jcmVhdGVCb29rR3BjKGdjb250ZW50LmdwYywga25paGEuaXhwX2RlbiEpIDogZ2NvbnRlbnQuZ3BjKTtcclxuICAgICAgICAgICAgZ2NvbnRlbnQubmF2aWdhdGUoWydHb3JkaWMuVWN0LldlYkNsaWVudC5HVWN0U2V6bmFtU2VydmljZUNvbnRlbnQnLCB7IGdwYzogbmV3R3BjIH1dLCB7XHJcbiAgICAgICAgICAgICAgICAvL2djb250ZW50Lm5hdmlnYXRlKFsnR29yZGljLlVjdC5XZWJDbGllbnQuR1VjdFNlem5hbVNlcnZpY2VDb250ZW50JywgeyBncGM6IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyhnY29udGVudC5ncGMsIGlkS25paGEpIH1dLCB7XHJcbiAgICAgICAgICAgICAgICB0YXNrSWQ6ICdhY3RTZXpuYW1kb2tsYWR1SUQnLFxyXG4gICAgICAgICAgICAgICAgSUQ6ICdVQ1RTZXpuYW1kb2tsYWR1IycsXHJcbiAgICAgICAgICAgICAgICAvL2lkS25paHk6IGlkS25paGEsXHJcbiAgICAgICAgICAgICAgICBmaWx0cjogdHlwRmlsdHJ1LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIE5hc3RhdmVuw60gaG9kbm90eSBwcnZrdVxyXG4gICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAqIEBwYXJhbSB7R09ic2VydmFibGVPYmplY3Q8YW55IHwgR0twaUl0ZW1PcHRpb25zPn0ga3BpIHBydmVrXHJcbiAgICAgICAgICAgICogQHBhcmFtIHtudW1iZXIgfCBudWxsfSBudW1EZXRhaWwgcG/FmWFkb3bDqSDEjcOtc2xvIChwcm8gdHlwIHpvYnJhemVuw60gc2V6bmFtKSBuZWJvIG51bGwgKHBybyB0eXAgem9icmF6ZW7DrSB2ZWxrw6EgS1BJKVxyXG4gICAgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbH0gdmFsdWUgaG9kbm90YVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHNldFZhbHVlKGtwaTogR09ic2VydmFibGVPYmplY3Q8YW55IHwgR0twaUl0ZW1PcHRpb25zPiwgbnVtRGV0YWlsOiBudW1iZXIgfCBudWxsLCB2YWx1ZTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHZvaWQge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIHByw6F6ZG7DoSAocG/EjcOhdGXEjW7DrSkgaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgLy9pZiAodGhpcy5UeXBab2JyYXplbmkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGtwaS52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgIC8vZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGtwaS5kZXRhaWxzW251bURldGFpbCFdLnZhbHVlID0gXCI/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAga3BpLmRldGFpbHNbbnVtRGV0YWlsIV0ubWVhbmluZyA9IFwiaW5mb1wiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gxI3DrXNlbG7DoSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAga3BpLmRldGFpbHNbbnVtRGV0YWlsIV0udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBrcGkuZGV0YWlsc1tudW1EZXRhaWwhXS5tZWFuaW5nID0gXCJpbmZvXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBrcGkuZGV0YWlsc1tudW1EZXRhaWwhXS52YWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAga3BpLmRldGFpbHNbbnVtRGV0YWlsIV0ubWVhbmluZyA9IFwicG9zaXRpdmVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBrcGkudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXX0=
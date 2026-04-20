"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ess;
    (function (Ess) {
        var Dialogs;
        (function (Dialogs) {
            /**
             * Otevřít dialog nového exportu
             *
             * @param {GContent} parentContent
             * @param {{ id?: string }} opt
             * @param {Gordic.Global.Enums.ModOtevreni} [ModOtevreni]
             * @returns {JQueryPromise<any>}
             */
            function GEssNewEssDlg(parentContent, opt, ModOtevreni) {
                const options = {
                    ID: "GEssNewEss#",
                    Rows: opt ? opt.rows : undefined
                };
                const deferred = $.Deferred();
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                let isValid = true;
                if (isValid) {
                    Gordic.Gui.Dialogs._openDialog(pContent, deferred, 'Gordic.Ess.WebControls.GEssExport', ModOtevreni, options);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Dialogs.GEssNewEssDlg = GEssNewEssDlg;
            /**
             * Spustit finalizaci importu
             */
            function GEssFinalizeImportDlg(parentContent, opt, ModOtevreni) {
                const options = {
                    ID: "GEssFinalizeImportID#",
                    Dto: opt ? opt.dto : undefined
                };
                const deferred = $.Deferred();
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                let isValid = true;
                if (isValid) {
                    Gordic.Gui.Dialogs._openDialog(pContent, deferred, 'Gordic.Ess.WebControls.GEssFinalizeImport', ModOtevreni, options);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Dialogs.GEssFinalizeImportDlg = GEssFinalizeImportDlg;
            function GEssSeznamDavkyDlg(parentContent, opt, ModOtevreni) {
                const options = {
                    ID: "GEssSeznamDavkyID#",
                    TypDavky: opt ? opt.typDavky : undefined
                };
                const deferred = $.Deferred();
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                let isValid = true;
                if (isValid) {
                    Gordic.Gui.Dialogs._openDialog(pContent, deferred, 'Gordic.Ess.WebControls.GEssSeznamDavky', ModOtevreni, options);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Dialogs.GEssSeznamDavkyDlg = GEssSeznamDavkyDlg;
            function GEssDetailDavkaDlg(parentContent, opt, ModOtevreni) {
                const options = {
                    ID: "GEssDetailDavkaID#",
                    IxsExt: opt ? opt.ixs_ext : undefined,
                    DavkaId: opt ? opt.davka_id : undefined
                };
                const deferred = $.Deferred();
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                let isValid = true;
                if (isValid) {
                    Gordic.Gui.Dialogs._openDialog(pContent, deferred, 'Gordic.Ess.WebControls.GEssDetailDavka', ModOtevreni, options);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Dialogs.GEssDetailDavkaDlg = GEssDetailDavkaDlg;
        })(Dialogs = Ess.Dialogs || (Ess.Dialogs = {}));
    })(Ess = Gordic.Ess || (Gordic.Ess = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ess;
    (function (Ess) {
        var WebControls;
        (function (WebControls) {
            let TypEntity;
            (function (TypEntity) {
                TypEntity["Soubor"] = "Soubor";
                TypEntity["Dokument"] = "Dokument";
                TypEntity["Spis"] = "Spis";
                TypEntity["TypovySpis"] = "TypovySpis";
            })(TypEntity = WebControls.TypEntity || (WebControls.TypEntity = {}));
            /**
             * GEssUtils
             *
             * @author thazmuka
             * @since 52510.1
             */
            class GEssUtils {
                waitForValues(form) {
                    var dfd = $.Deferred();
                    form.gform("waitForValues")
                        .then(() => {
                        return form.gform("isValid");
                    })
                        .then((isValid) => {
                        if (isValid === true) {
                            var obj = {};
                            form.findFields().gfield("model", "collect", obj);
                            dfd.resolve(isValid, obj);
                        }
                        else {
                            dfd.resolve(isValid);
                        }
                    })
                        .fail(() => {
                        dfd.reject(false);
                    });
                    return dfd.promise();
                }
                /**
                 * Validace sloupců pro hledání pro seznamy
                 */
                validateSearchColumns(searchColumns, inputColumns) {
                    for (var index = 0; index < inputColumns.length; index++) {
                        const columns = inputColumns[index];
                        if (columns.name != null) {
                            // pokud není sloupec obsažen ve výsledném poli, tak 
                            if (searchColumns.includes(columns.name) === false) {
                                searchColumns.push(columns.name);
                            }
                        }
                    }
                }
                downloadFile(guid, cnt) {
                    const dto = {
                        DownloaderType: "Gordic.Wfl.WebClient.WflGuidDownloader",
                        AutoDownload: true,
                        DisablePluginDownload: true,
                        CustomData: {
                            "Guid": guid
                        }
                    };
                    const doc = new GDocument(cnt);
                    cnt.log.trace("zobrazitSoubor guid:" + guid);
                    doc.downloadDocument(dto)
                        .then(() => {
                        cnt.log.trace("Proběhlo stažení souboru.");
                        cnt.notification("add", {
                            icon: "gi-info", content: "jres:32000045", state: "success" //RC 32000045 : Proběhl úspěšný export a stažení souboru.
                        });
                    })
                        .fail(() => {
                        cnt.log.trace("Stažení nedopadlo");
                        cnt.notification("add", {
                            icon: "gi-info", content: "jres:32000044", state: "error" //RC 32000044 : Nepodařilo se provést export.
                        });
                    })
                        .always(() => {
                        if (guid != "") {
                            new GFile().removeFile(guid);
                        }
                    });
                }
            }
            WebControls.GEssUtils = GEssUtils;
        })(WebControls = Ess.WebControls || (Ess.WebControls = {}));
    })(Ess = Gordic.Ess || (Gordic.Ess = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ess;
    (function (Ess) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Úvodní stránka ESS
             *
             * @author thazmuka
             * @since 52510.1
             */
            let GEssDashboard = class GEssDashboard extends Gordic.GContentBase {
                onContentReady() {
                    this.element.addHelpContext('StartPage');
                    this.logOptions = {
                        name: "Gordic.Ess.WebControls.GEssDashboard",
                        fileName: "GEssDashboard.ts",
                        authorCode: 487 //0487
                    };
                    this.init();
                }
                init() {
                    this.loadModuleInfo();
                }
                loadModuleInfo() {
                    var i = 0;
                    var secondaryText = this.NazevRef + " | " + this.NazevFun + " | " + "jres:32000007" + ": " + this.DatLoginTxt; //RC 32000007 : Poslední přihlášení
                    var data = [];
                    data.push(new GObservableObject({
                        name: "kpiLastUsed" + "_" + i,
                        image: Gordic.Utils.IconBuilder.defaultInst.createModuleIcon("GSAESS01"),
                        primaryText: "jres:32000004", //RC 32000004 : Export-Import operací s dokumenty dle NSESS
                        secondaryText: secondaryText,
                    }));
                    const dataView = new Gordic.Data.View(data, { key: "name" });
                    var moduleInfoItems = new Gordic.Data.View([{
                            id: "modulInfo",
                            title: "jres:32000006", //RC 32000006 : Modul
                            zone: 1,
                            mode: "vertical",
                            itemTemplate: Gordic.Prefabs.Panels.kpiImageTwoRowsTextTemplate().itemTemplate,
                            defaultSelected: false,
                            data: dataView,
                            menuParams: [
                                {
                                    icon: "fa-retweet",
                                    action: new GAction({
                                        name: "actModulRefresh",
                                        captionVisible: GAction.captionVisibility.never,
                                        caption: "jres:32000005", //RC 32000005 : Aktualizovat
                                        visible: true,
                                        run: (ev, ctx) => {
                                            this.load();
                                        }
                                    })
                                }
                            ]
                        }], { key: ["id"] });
                    var gdashboard = $("<div>")
                        .appendTo(this.element);
                    gdashboard
                        .gdashboardpanel({
                        id: "modulInfoPanel",
                        defaultSelected: false,
                        data: moduleInfoItems,
                        layout: "horizontal",
                        sortable: true,
                    });
                }
            };
            GEssDashboard = __decorate([
                gcontent
            ], GEssDashboard);
            WebControls.GEssDashboard = GEssDashboard;
        })(WebControls = Ess.WebControls || (Ess.WebControls = {}));
    })(Ess = Gordic.Ess || (Gordic.Ess = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ess;
    (function (Ess) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * ESS: Detail dávky
             *
             * @author thazmuka
             * @since 52510.1
             */
            let GEssDetailDavka = class GEssDetailDavka extends Gordic.GContentBase {
                onContentReady() {
                    // připraveno ke smazání
                    if (this.Data.stav_davky_rss != null && this.Data.stav_davky_rss === 210) {
                        this.showFlash({
                            state: "info",
                            id: "idPripSmazat",
                            content: "jres:32000206" //RC 32000206 : Přenos potvrzených entit byl ukončen, lze provést smazání přenesených entit
                        });
                    }
                    // pouze při importu
                    if (this.Data.typ_dav_rss_txt != null && this.Data.typ_dav_rss === 20) {
                        this.createMenubar();
                    }
                    this.createForm();
                    this.createGrid();
                    this.createCommandbar();
                }
                createForm() {
                    this.form = $("<div>").appendTo(this.element);
                    var Form = new Gordic.Forms.Form({ name: "FormExportDokSpis", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" });
                    Form
                        .addSection("")
                        .addRow("jres:32000201") //RC 32000201 : ID dávky
                        .addField("gnumberbox", {
                        name: "davka_id",
                        disabled: true,
                    })
                        .addRow("jres:32000193") //RC 32000193 : Datum poslední změny
                        .addField("gdatebox", {
                        name: "dat_zmena",
                        valueType: "datetime",
                        disabled: true,
                    })
                        .addRow("jres:32000196") //RC 32000196 : Typ dávky
                        .addField("gstringbox", {
                        name: "typ_dav_rss_txt",
                        disabled: true,
                    })
                        .addRow("jres:32000197") //RC 32000197 : Účel dávky
                        .addField("gstringbox", {
                        name: "ucel_davky",
                        disabled: true,
                    })
                        .addRow("jres:32000198") //RC 32000198 : Poznámka
                        .addField("gstringbox", {
                        name: "poznamka",
                        disabled: true,
                    });
                    Form
                        .addSection("")
                        .addRow("jres:32000194") //RC 32000194 : Zdroj
                        .addField("gstringbox", {
                        name: "zdroj",
                        disabled: true,
                    })
                        .addRow("jres:32000195") //RC 32000195 : Cíl
                        .addField("gstringbox", {
                        name: "cil",
                        disabled: true,
                    })
                        .addRow("jres:32000199") //RC 32000199 : Stav dávky
                        .addField("gstringbox", {
                        name: "stav_davky_rss_txt",
                        disabled: true,
                    })
                        .addRow("jres:32000200") //RC 32000200 : Změnu provedl
                        .addField("gstringbox", {
                        name: "zmenu_prov_txt",
                        disabled: true,
                    });
                    this.form.gform("createFrom", Form);
                    this.form.findFields().gfield("model", "apply", this.Data);
                    this.form.gform("viewMode", "view");
                }
                createMenubar() {
                    var params = [];
                    params.push({
                        primary: true,
                        favorite: true,
                        action: this.actions.add(new GAction({
                            name: "actGenerateAnswer",
                            caption: "jres:32000163", //RC 32000163 : Vygenerovat potvrzovací dávku
                            icon: "",
                            run: () => {
                                if (this.utilsCnt == null) {
                                    this.utilsCnt = new GContent("Gordic.Ess.WebControls.GEssUtils");
                                }
                                this.utilsCnt
                                    .call("GetEssOdpoved2024", {
                                    IxsExt: this.IxsExt,
                                    DavkaId: this.DavkaId
                                })
                                    .then((guid) => {
                                    // OK
                                    if (guid != null && guid != "") {
                                        new WebControls.GEssUtils().downloadFile(guid, this);
                                    }
                                });
                            }
                        }))
                    });
                    this.menuBar(params);
                }
                createCommandbar() {
                    var params = [];
                    params.push({
                        favorite: true,
                        action: this.actions.add(new GAction({
                            name: "actClose",
                            caption: "jres:32000018", //RC 32000018 : Zavřít
                            icon: "gi-window-close",
                            run: () => {
                                this.tryClose();
                            }
                        }))
                    });
                    this.commandBar(params);
                }
                getFilter() {
                    var obj = {};
                    obj["davka_id"] = this.DavkaId; // přidání ID dávky do filtru
                    return obj;
                }
                getStringNamesOfColumns(columns) {
                    // přidat názvy sloupců do řetězce
                    var columnList = "";
                    for (var index = 0; index < columns.length; index++) {
                        if (columns[index]["visible"] === false)
                            continue;
                        // přidání čárky před přidaný název, z výjimkou prvního názvu
                        columnList = index === 0 ? columnList : columnList + ",";
                        columnList += columns[index].name;
                    }
                    return columnList;
                }
                createGrid() {
                    var input = {
                        key: "poradi",
                        startEmpty: false
                    };
                    this.view = new Gordic.Isl.View(Gordic.Isl.Ess.listRssddav(rq => {
                        rq.filters = this.getFilter();
                        return rq;
                    }), input);
                    //#region -- format --
                    const format = new Gordic.Data.GridFormat();
                    format
                        //.addNumberColumn({
                        //    name: "poradi",
                        //    caption: "jres:32000117", //RC 32000117 : Pořadí
                        //    width: 70,
                        //})
                        .addTextColumn({
                        name: "vysledek_txt",
                        caption: "jres:32000145", //RC 32000145 : Výsledek
                        width: 550,
                    })
                        .addTextColumn({
                        name: "typ_entity_txt",
                        caption: "jres:32000128", //RC 32000128 : Typ entity
                        width: 180,
                    })
                        .addTextColumn({
                        name: "id_entity",
                        caption: "jres:32000227", //RC 32000227 : ID v exportním IS
                        width: 130,
                    })
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:32000228", //RC 32000228 : Název entity / věc
                        width: 200,
                    })
                        .addTextColumn({
                        name: "spis_znak",
                        caption: "jres:32000134", //RC 32000134 : Spisový znak
                        width: 100,
                    })
                        .addTextColumn({
                        name: "otisk",
                        caption: "jres:32000127", //RC 32000127 : Otisk
                        width: 500,
                    });
                    format
                        .addTextColumn({
                        name: "nazev_ext",
                        caption: "jres:32000161", //RC 32000161 : Název externího systému
                        width: 200,
                    })
                        .addNumberColumn({
                        name: "davka_id",
                        caption: "jres:32000216", //RC 32000216 : Interní číslo dávky
                        width: 100,
                    })
                        .addTextColumn({
                        name: "umisteni",
                        caption: "jres:32000217", //RC 32000217 : Adresář v ZIP
                        width: 100,
                    })
                        .addTextColumn({
                        name: "jmeno",
                        caption: "jres:32000218", //RC 32000218 : Jméno v ZIP
                        width: 150,
                    })
                        //.addNumberColumn({
                        //    name: "rss_por_cislo",
                        //    caption: "jres:32000130", //RC 32000130 : ID xml dávky v DB
                        //    width: 150,
                        //})
                        //.addTextColumn({
                        //    name: "vyber",
                        //    caption: "jres:32000131", //RC 32000131 : Výběr prvku
                        //    width: 200,
                        //})
                        .addTextColumn({
                        name: "akt_znacka",
                        caption: "jres:32000135", //RC 32000135 : Akt značka
                        width: 200,
                    })
                        .addTextColumn({
                        name: "barcode",
                        caption: "jres:32000133", //RC 32000133 : Barcode
                        width: 200,
                    })
                        .addTextColumn({
                        name: "zdrojid",
                        caption: "jres:32000136", //RC 32000136 : Zdroj ID
                        width: 80,
                    })
                        .addTextColumn({
                        name: "hodnotaid",
                        caption: "jres:32000137", //RC 32000137 : Hodnota ID
                        width: 140,
                    })
                        .addTextColumn({
                        name: "ixp",
                        caption: "jres:32000220", //RC 32000220 : PID GINIS
                        width: 130,
                    })
                        .addTextColumn({
                        name: "ixb",
                        caption: "jres:32000221", //RC 32000221 : IS souboru GINIS
                        width: 130,
                    })
                        .addTextColumn({
                        name: "ixp_spis",
                        caption: "jres:32000222", //RC 32000222 : PID spisu GINIS
                        width: 130,
                    })
                        .addTextColumn({
                        name: "ixp_soucast",
                        caption: "jres:32000223", //RC 32000223 : PID součásti GINIS
                        width: 130,
                    })
                        .addTextColumn({
                        name: "ixp_top",
                        caption: "jres:32000224", //RC 32000224 : PID typového spisu GINIS
                        width: 130,
                    })
                        .addTextColumn({
                        name: "ixs_vsk",
                        caption: "jres:32000141", //RC 32000141 : ID věcné skupiny GINIS
                        width: 130,
                    })
                        .addTextColumn({
                        name: "ixs_rkr",
                        caption: "jres:32000225", //RC 32000225 : ID skartačního režimu GINIS
                        width: 130,
                    })
                        .addNumberColumn({
                        name: "gor_err",
                        caption: "jres:32000143", //RC 32000143 : Kód zpracování (gor_err)
                        width: 100,
                        visible: false
                    })
                        .addNumberColumn({
                        name: "sql_err",
                        caption: "sql_err",
                        width: 100,
                        visible: false
                    })
                        .addNumberColumn({
                        name: "isam_err",
                        caption: "isam_err",
                        width: 100,
                        visible: false
                    })
                        .addTextColumn({
                        name: "err_txt",
                        caption: "err_txt",
                        width: 200,
                        visible: false
                    })
                        .addTextColumn({
                        name: "lock_err",
                        caption: "lock_err",
                        width: 200,
                        visible: false
                    })
                        .addNumberColumn({
                        name: "vysledek",
                        caption: "jres:32000144", //RC 32000144 : Výsledek importu
                        width: 100,
                    })
                        .addTextColumn({
                        name: "poznamka",
                        caption: "jres:32000146", //RC 32000146 : Poznámka
                        width: 200,
                    })
                        .addDateTimeColumn({
                        name: "dat_potvrz",
                        caption: "jres:32000147", //RC 32000147 : Datum potvrzení
                        width: 160,
                    })
                        .addNumberColumn({
                        name: "stav_potvrz",
                        caption: "jres:32000148", //RC 32000148 : Stav potvrzení přenosu
                        width: 100,
                    })
                        .addDateTimeColumn({
                        name: "dat_del",
                        caption: "jres:32000150", //RC 32000150 : Čas smazání prvku
                        width: 160,
                    })
                        .addNumberColumn({
                        name: "priz_del",
                        caption: "jres:32000162", //RC 32000162 : Příznak smazání
                        width: 100,
                    });
                    //#endregion
                    // sloupce na prohledávání 
                    var searchColumns = [];
                    new WebControls.GEssUtils().validateSearchColumns(searchColumns, format.columns);
                    var defaultProfile = {
                        name: "jres:32000226", //RC 32000226 : Výchozí profil
                        _locked: true,
                        columnList: this.getStringNamesOfColumns(format.columns),
                    };
                    this.grid = $("<div>").gautofit().appendTo(this.element);
                    this.grid.ggrid({
                        defaultProfile: defaultProfile,
                        filtering: true,
                        data: this.view,
                        name: "gridDetailDavka",
                        renderMode: "auto",
                        columnMode: "full",
                        navigationMode: "row",
                        columns: format,
                        sort: "poradi",
                        multi: false,
                        searchColumns: searchColumns
                    });
                }
            };
            GEssDetailDavka = __decorate([
                gcontent
            ], GEssDetailDavka);
            WebControls.GEssDetailDavka = GEssDetailDavka;
        })(WebControls = Ess.WebControls || (Ess.WebControls = {}));
    })(Ess = Gordic.Ess || (Gordic.Ess = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ess;
    (function (Ess) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * ESS: Seznam dávek
             *
             * @author thazmuka
             * @since 52510.1
             */
            let GEssSeznamDavky = class GEssSeznamDavky extends Gordic.GContentBase {
                onContentReady() {
                    this.createMenubar();
                    this.createFilterpanel();
                    this.createGrid();
                    this.createCommandbar();
                }
                createCommandbar() {
                    var params = [];
                    params.push({
                        favorite: true,
                        action: this.actions.add(new GAction({
                            name: "actClose",
                            caption: "jres:32000018", //RC 32000018 : Zavřít
                            icon: "gi-window-close",
                            run: () => {
                                this.tryClose();
                            }
                        }))
                    });
                    this.commandBar(params);
                }
                createMenubar() {
                    var params = [];
                    params.push({
                        favorite: true,
                        action: this.actions.add(new GAction({
                            enabled: false,
                            name: "actDetailDavka",
                            caption: "jres:32000122", //RC 32000122 : Detail dávky
                            icon: "",
                            run: () => {
                                if (this.grid == null)
                                    return;
                                var selection = this.grid.ggrid("getSelection");
                                if (selection == null || selection.length == 0) {
                                    console.error("Není vybrán žádný řádek.");
                                    return;
                                }
                                const row = selection[0];
                                if (row == null || row.davka_id == null) {
                                    console.error("Není k dispozici davka_id.");
                                    return;
                                }
                                if (row == null || row.ixs_ext == null) {
                                    console.error("Není k dispozici ixs_ext.");
                                    return;
                                }
                                Ess.Dialogs.GEssDetailDavkaDlg(this, { davka_id: row.davka_id, ixs_ext: row.ixs_ext });
                            }
                        }))
                    });
                    this.menuBar(params);
                }
                createFilterpanel() {
                    this.filter = $("<div>").appendTo(this.element);
                    this.filter.on("gfilterpanelapply", (event, obj) => {
                        if (obj != null && obj.filter != null) {
                            var filter = obj.filter;
                            this.filterData = filter;
                            this.view.requestData();
                        }
                    });
                    this.filter
                        .gfilterpanel({
                        favorites: "all",
                        userSettings: this.userSettings,
                        forms: [this.createFilterForm()],
                        autoLoadAfterCreatePanel: false
                    });
                }
                createFilterForm() {
                    const filterForm = new Gordic.Forms.Form({
                        name: "FormFilterGrid",
                        tabLabel: "Filtr",
                        layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000"
                    });
                    filterForm
                        .addSection();
                    filterForm
                        .addRow({ required: true, label: "jres:32000048" }) //RC 32000048 : Externí systém
                        .addField("gselectbox", Gordic.Prefabs.Select.intsext(), {
                        validators: [new Gordic.Validators.Required()],
                        name: "ixs_ext",
                        model: "model.ixs_ext=value.ixs_ext",
                        serverFilters: {
                            aktivita: [100],
                            priz_ess: 3,
                            verze_ess: "NS2024"
                        }
                    });
                    filterForm
                        .addRow({ required: true, label: "jres:32000113" }) //RC 32000113 : Typ dávky
                        .addField("gselectbox", {
                        validators: [new Gordic.Validators.Required()],
                        name: "typ_dav_rss",
                        dropdown: true,
                        customClass: " ",
                        data: [
                            0 /* Ess.Interface.GEssTypDavRssEnum.Prenos */,
                            10 /* Ess.Interface.GEssTypDavRssEnum.Export */,
                            20 /* Ess.Interface.GEssTypDavRssEnum.Import */,
                            //Ess.Interface.GEssTypDavRssEnum.Potvrzeni
                        ],
                        itemTemplate: (item) => {
                            if (item === 10 /* Ess.Interface.GEssTypDavRssEnum.Export */) {
                                return "jres:32000114"; //RC 32000114 : Export
                            }
                            else if (item === 20 /* Ess.Interface.GEssTypDavRssEnum.Import */) {
                                return "jres:32000115"; //RC 32000115 : Import
                            }
                            else if (item === 0 /* Ess.Interface.GEssTypDavRssEnum.Prenos */) {
                                return "jres:32000169"; //RC 32000169 : Přenos
                            }
                            else if (item === 30 /* Ess.Interface.GEssTypDavRssEnum.Potvrzeni */) {
                                return "jres:32000170"; //RC 32000170 : Potvrzení
                            }
                            else {
                                return "";
                            }
                        }
                    });
                    filterForm
                        .addRow({ required: false, label: "jres:32000208" }) //RC 32000208 : Stav dávky
                        .addField("gselectbox", {
                        name: "stav_davky_rss",
                        dropdown: true,
                        customClass: " ",
                        data: [
                            0 /* Ess.Interface.GEssStavDavkyRssEnum.Pripravovana */,
                            10 /* Ess.Interface.GEssStavDavkyRssEnum.Pripravena */,
                            20 /* Ess.Interface.GEssStavDavkyRssEnum.Odeslana */,
                            30 /* Ess.Interface.GEssStavDavkyRssEnum.PotvrzenaKladne */,
                            40 /* Ess.Interface.GEssStavDavkyRssEnum.PotvrzenaCastecne */,
                            50 /* Ess.Interface.GEssStavDavkyRssEnum.PotvrzenaZaporne */,
                            90 /* Ess.Interface.GEssStavDavkyRssEnum.Stornovana */
                        ],
                        itemTemplate: (item) => {
                            if (item === 0 /* Ess.Interface.GEssStavDavkyRssEnum.Pripravovana */) {
                                return "jres:32000209"; //RC 32000209 : Připravovaná
                            }
                            else if (item === 10 /* Ess.Interface.GEssStavDavkyRssEnum.Pripravena */) {
                                return "jres:32000210"; //RC 32000210 : Připravená
                            }
                            else if (item === 20 /* Ess.Interface.GEssStavDavkyRssEnum.Odeslana */) {
                                return "jres:32000211"; //RC 32000211 : Odeslaná
                            }
                            else if (item === 30 /* Ess.Interface.GEssStavDavkyRssEnum.PotvrzenaKladne */) {
                                return "jres:32000212"; //RC 32000212 : Potvrzena kladně
                            }
                            else if (item === 40 /* Ess.Interface.GEssStavDavkyRssEnum.PotvrzenaCastecne */) {
                                return "jres:32000213"; //RC 32000213 : Potvrzena částečně
                            }
                            else if (item === 50 /* Ess.Interface.GEssStavDavkyRssEnum.PotvrzenaZaporne */) {
                                return "jres:32000214"; //RC 32000214 : Potvrzena záporně (nenačteno)
                            }
                            else if (item === 90 /* Ess.Interface.GEssStavDavkyRssEnum.Stornovana */) {
                                return "jres:32000215"; //RC 32000215 : Stornovaná
                            }
                            else {
                                return "";
                            }
                        }
                    });
                    filterForm
                        .addRow({ required: false, label: "jres:32000112" }) //RC 32000112 : Datum změny
                        .addField("gdatecombobox", {
                        //validators: [new Gordic.Validators.Required()],
                        name: "dat_zmena",
                        model: "model.dat_zmena=value.date",
                        contextMenu: {
                            daysRange: 60
                        },
                        userSettings: this.userSettings,
                        defaultInitialValue: "all",
                        daysRangeMax: 10000
                    });
                    return filterForm;
                }
                getFilter() {
                    var obj = {};
                    if (this.filterData != null) {
                        obj = JSON.parse(JSON.stringify(this.filterData));
                        return obj;
                    }
                }
                createGrid() {
                    var input = {
                        key: "davka_id",
                        startEmpty: true
                    };
                    this.view = new Gordic.Isl.View(Gordic.Isl.Ess.listRsssdav(rq => {
                        rq.filters = this.getFilter();
                        return rq;
                    }), input);
                    const format = new Gordic.Data.GridFormat();
                    format
                        .addTextColumn({
                        name: "nazev_ext",
                        caption: "jres:32000151", //RC 32000151 : Externí systém
                        width: 200,
                    })
                        .addNumberColumn({
                        name: "davka_id",
                        caption: "jres:32000105", //RC 32000105 : ID dávky
                        width: 90,
                    })
                        .addTextColumn({
                        name: "zdroj",
                        caption: "jres:32000106", //RC 32000106 : Zdroj
                        width: 60,
                    })
                        .addTextColumn({
                        name: "cil",
                        caption: "jres:32000107", //RC 32000107 : Cíl
                        width: 60,
                    })
                        .addTextColumn({
                        name: "nazev_esu",
                        caption: "jres:32000152", //RC 32000152 : ID původce
                        width: 120,
                    })
                        .addTextColumn({
                        name: "typ_dav_rss_txt",
                        caption: "jres:32000153", //RC 32000153 : Typ dávky
                        width: 120,
                    })
                        .addTextColumn({
                        name: "ucel_davky",
                        caption: "jres:32000109", //RC 32000109 : Účel dávky
                        width: 120,
                    })
                        .addTextColumn({
                        name: "poznamka",
                        caption: "jres:32000108", //RC 32000108 : Poznámka
                        width: 200,
                    })
                        .addTextColumn({
                        name: "hash_algoritmus",
                        caption: "jres:32000154", //RC 32000154 : Hash algoritmus
                        width: 200,
                    })
                        .addTextColumn({
                        name: "stav_davky_rss_txt",
                        caption: "jres:32000155", //RC 32000155 : Stav dávky
                        width: 110,
                    })
                        .addNumberColumn({
                        name: "rss_por_cislo",
                        caption: "jres:32000156", //RC 32000156 : ID čísla XML dávky v DB
                        width: 75
                    })
                        .addDateTimeColumn({
                        name: "dat_exp",
                        caption: "jres:32000159", //RC 32000159 : Datum expirace
                        width: 160,
                    })
                        .addDateTimeColumn({
                        name: "dat_imp",
                        caption: "jres:32000158", //RC 32000158 : Datum importu
                        width: 160,
                    })
                        .addDateTimeColumn({
                        name: "dat_potvrz",
                        caption: "jres:32000157", //RC 32000157 : Datum potvrzení
                        width: 160,
                    })
                        .addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "jres:32000111", //RC 32000111 : Datum změny
                        width: 160,
                    })
                        .addTextColumn({
                        name: "zmenu_prov_txt",
                        caption: "jres:32000160", //RC 32000160 : Změnu provedl
                        width: 200,
                    });
                    // sloupce na prohledávání 
                    var searchColumns = [];
                    new WebControls.GEssUtils().validateSearchColumns(searchColumns, format.columns);
                    this.grid = $("<div>").gautofit().appendTo(this.element);
                    this.grid.ggrid({
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: (ev, ctx) => {
                                const row = ctx.cellInfo.data;
                                if (row == null || row.davka_id == null) {
                                    console.error("Není k dispozici davka_id.");
                                    return;
                                }
                                if (row == null || row.ixs_ext == null) {
                                    console.error("Není k dispozici ixs_ext.");
                                    return;
                                }
                                Ess.Dialogs.GEssDetailDavkaDlg(this, { davka_id: row.davka_id, ixs_ext: row.ixs_ext });
                            }
                        }),
                        filtering: true,
                        data: this.view,
                        name: "gridSeznamDavky",
                        renderMode: "auto",
                        columnMode: "full",
                        navigationMode: "row",
                        columns: format,
                        sort: "davka_id",
                        multi: false,
                        searchColumns: searchColumns,
                        selection: (ev, obj) => {
                            // ošetření při zavření contentu
                            if (this.closed === true) {
                                return;
                            }
                            var selection = this.grid.ggrid("getSelection");
                            if (selection == null || selection.length === 0)
                                return;
                            if (this.actions.actDetailDavka != null) {
                                this.actions.actDetailDavka.enabled(true);
                            }
                        }
                    });
                }
            };
            GEssSeznamDavky = __decorate([
                gcontent
            ], GEssSeznamDavky);
            WebControls.GEssSeznamDavky = GEssSeznamDavky;
        })(WebControls = Ess.WebControls || (Ess.WebControls = {}));
    })(Ess = Gordic.Ess || (Gordic.Ess = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ess;
    (function (Ess) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * ESS: Export
             *
             * @author thazmuka
             * @since 52510.1
             */
            let GEssExport = class GEssExport extends Gordic.GContentBase {
                onContentReady() {
                    if (this.utils == null) {
                        this.utils = new WebControls.GEssUtils();
                    }
                    this.createMenubar();
                    this.createForm();
                    this.createFilterpanel();
                    this.createGrid();
                    this.createCommandbar();
                }
                createCommandbar() {
                    var params = [];
                    params.push({
                        favorite: true,
                        action: this.actions.add(new GAction({
                            name: "actClose",
                            caption: "jres:32000018", //RC 32000018 : Zavřít
                            icon: "gi-window-close",
                            run: () => {
                                this.tryClose();
                            }
                        }))
                    });
                    this.commandBar(params);
                }
                createForm() {
                    this.form = $("<div>").appendTo(this.element);
                    var Form = new Gordic.Forms.Form({ name: "FormExportDokSpis", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" });
                    Form
                        .addSection("jres:32000054") //RC 32000054 : Vstupní nastavení
                        .addRow({ required: true, label: "jres:32000048" }) //RC 32000048 : Externí systém
                        .addField("gselectbox", Gordic.Prefabs.Select.intsext(), {
                        validators: [new Gordic.Validators.Required()],
                        name: "IxsExt",
                        model: "model.IxsExt=value.ixs_ext",
                        serverFilters: {
                            aktivita: [100],
                            priz_ess: 3,
                            verze_ess: "NS2024"
                        }
                    });
                    Form
                        .addRow({ required: true, label: "jres:32000049" }) //RC 32000049 : Důvod přenosu
                        .addField("gstringbox", Gordic.Prefabs.Field.charCounter(254), {
                        name: "DuvodPrenosu",
                        validators: [
                            new Gordic.Validators.Required(),
                            new Gordic.Validators.Length({ min: 0, max: 254, message: "jres:32000050" }) //RC 32000050 : Pole důvodu přenosu nesmí být prázdné a může obsahovat max. 254 znaků.
                        ],
                        rows: 2
                    });
                    Form
                        .addRow("jres:32000051") //RC 32000051 : Poznámka
                        .addField("gstringbox", Gordic.Prefabs.Field.charCounter(254), {
                        name: "Poznamka",
                        validators: [
                            //new Gordic.Validators.Required(),
                            new Gordic.Validators.Length({ min: 0, max: 254, message: "jres:32000052" }) //RC 32000052 : Pole poznámky nesmí být prázdné a může obsahovat max. 254 znaků.
                        ],
                        rows: 2
                    });
                    Form
                        .addSection("jres:32000078") //RC 32000078 : Další nastavení
                        .addRow("jres:32000079") //RC 32000079 : Výstupní název souboru
                        .addField("gstringbox", Gordic.Prefabs.Field.charCounter(254), {
                        name: "FileName", placeholder: "jres:32000077", //RC 32000077 : V případně nenaplnění bude vygenerován systémem.
                        validators: [
                            new Gordic.Validators.Length({ min: 0, max: 254, message: "jres:32000076" }) //RC 32000076 : Pole nesmí být prázdné a může obsahovat max. 254 znaků.
                        ],
                    });
                    this.form.gform("createFrom", Form);
                }
                createMenubar() {
                    var params = [];
                    var start = {
                        favorite: true,
                        //primary: true,
                        action: new GAction({
                            caption: "jres:32000034", //RC 32000034 : Spustit export
                            name: "actRunExport", //RC 32000034 : Spustit export
                            icon: "",
                            run: () => {
                                this.hideFlash("idFlashSelectionGrid");
                                this.utils.waitForValues(this.form)
                                    .then((isValid, data) => {
                                    // formulář není validně vyplněn
                                    if (isValid !== true)
                                        return;
                                    var selection = this.grid.ggrid("getSelection");
                                    if (selection == null || selection.length === 0) {
                                        this.showFlash({ content: "jres:32000053", state: "warning", id: "idFlashSelectionGrid" }); //RC 32000053 : V seznamu nebyla vybrána ani jedna písemnost.
                                        return;
                                    }
                                    data["IxpList"] = selection.map((item) => item.ixp);
                                    data["Type"] = 10; // export
                                    this.runAsyncAction(data);
                                });
                            }
                        })
                    };
                    var prenos = {
                        favorite: true,
                        primary: true,
                        action: new GAction({
                            caption: "jres:32000180", //RC 32000180 : Spustit přenos
                            name: "actPrenos",
                            icon: "",
                            run: () => {
                                this.hideFlash("idFlashSelectionGrid");
                                this.utils.waitForValues(this.form)
                                    .then((isValid, data) => {
                                    // formulář není validně vyplněn
                                    if (isValid !== true)
                                        return;
                                    var selection = this.grid.ggrid("getSelection");
                                    if (selection == null || selection.length === 0) {
                                        this.showFlash({ content: "jres:32000053", state: "warning", id: "idFlashSelectionGrid" }); //RC 32000053 : V seznamu nebyla vybrána ani jedna písemnost.
                                        return;
                                    }
                                    data["IxpList"] = selection.map((item) => item.ixp);
                                    data["Type"] = 0; // prenos
                                    this.runAsyncAction(data);
                                });
                            }
                        })
                    };
                    params.push(prenos);
                    var separator = {
                        type: "separator"
                    };
                    params.push(separator);
                    params.push(start);
                    this.menuBar(params);
                }
                runAsyncAction(data) {
                    var that = this;
                    const namespace = "essExport";
                    const myclass = "Gordic.Ess.Server.GEssExportAsyncTask";
                    Gordic.Async.GTaskManager.off("." + namespace);
                    this.hideFlash("idFlashErr");
                    Gordic.Async.GTaskManager
                        .getInitPromise()
                        .then(() => {
                        this.beginOperation({
                            id: "idExport",
                            text: data.Type === 0 ? "jres:32000204" : //RC 32000204 : Probíhá převod
                                "jres:32000203", //RC 32000203 : Probíhá export
                        });
                        Gordic.Async.GTaskManager.delayedStart(myclass, data, { clearOnFinish: false, autoClean: true })
                            .then((task) => {
                            Gordic.Async.GTaskManager.on("always." + namespace, myclass, function () {
                                console.info(this.result);
                                if (this.result != null) {
                                    var result = this.result;
                                    if (result.Success === true) {
                                        // OK
                                        if (result.Guid != null && result.Guid != "") {
                                            new WebControls.GEssUtils().downloadFile(result.Guid, that);
                                        }
                                    }
                                    else {
                                        // FAIL
                                        that.notification("add", {
                                            icon: "gi-info", content: result.ErrorMessage != null && result.ErrorMessage !== "" ? result.ErrorMessage : "jres:32000044", state: "error" //RC 32000044 : Nepodařilo se provést export/převod.
                                        });
                                    }
                                    that.endOperation("idExport");
                                    this.clean();
                                }
                            });
                        });
                    });
                }
                getFilter() {
                    var obj = {};
                    if (this.filterData != null) {
                        if (this.filterData["dat_pod"] != null) {
                            this.filterData["dat_pod"] = this.filterData["dat_pod"].date;
                        }
                        if (this.filterData["dat_zmena"] != null) {
                            this.filterData["dat_zmena"] = this.filterData["dat_zmena"].date;
                        }
                        obj = JSON.parse(JSON.stringify(this.filterData));
                        return obj;
                    }
                }
                createGrid() {
                    var input = {
                        key: "ixp",
                        startEmpty: true,
                    };
                    // vstupní záznamy
                    if (this.Rows != null && this.Rows.length > 0) {
                        input["startEmpty"] = false;
                        input["data"] = this.Rows;
                    }
                    this.view = new Gordic.Isl.View(Gordic.Isl.Ess.listIxp(rq => {
                        rq.filters = this.getFilter();
                        return rq;
                    }), input);
                    this.view.on("change", (opts) => {
                        // označení všech řádků
                        //var instance: any = this.grid.ggrid("instance");
                        //if (instance != null && instance.actions != null && instance.actions.actCheckAll != null) {
                        //    instance.actions.actCheckAll.run(); 
                        //}
                    });
                    const format = new Gordic.Data.GridFormat();
                    format
                        .addTextColumn({
                        name: "ixp",
                        caption: "jres:32000100", //RC 32000100 : Identifikátor
                        width: 125,
                    })
                        .addTextColumn({
                        name: "typ_spis",
                        caption: "jres:32000101", //RC 32000101 : Druh
                        width: 125,
                        cellTemplate: (cell, row) => {
                            if (row == null || row.data == null || row.data.typ_spis == null)
                                return "";
                            else {
                                switch (row.data.typ_spis) {
                                    case 0:
                                        return "jres:32000028"; //RC 32000028 : Dokument
                                    case 1:
                                        return "jres:32000029"; //RC 32000029 : Spis
                                    case 2:
                                        return "jres:32000030"; //RC 32000030 : Typový spis
                                    case 3:
                                        return "jres:32000031"; //RC 32000031 : Součást koncová
                                    case 4:
                                        return "jres:32000032"; //RC 32000032 : Díl
                                    case 5:
                                        return "jres:32000033"; //RC 32000033 : Součást
                                    default:
                                        return "";
                                }
                            }
                        }
                    })
                        .addDateTimeColumn({
                        name: "dat_pod",
                        caption: "jres:32000047", //RC 32000047 : Datum podání
                        width: 165,
                    })
                        .addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "jres:32000177", //RC 32000177 : Datum změny
                        width: 165,
                    })
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:32000071", //RC 32000071 : Název
                        width: 285,
                    })
                        .addTextColumn({
                        name: "nazev_rf",
                        caption: "jres:32000072", //RC 32000072 : Vlastník
                        width: 315,
                    })
                        .addTextColumn({
                        name: "vecskup_nazev",
                        caption: "jres:32000171", //RC 32000171 : Věcná skupina (název)
                        width: 335,
                    })
                        .addTextColumn({
                        name: "vecskup_spis_znak",
                        caption: "jres:32000172", //RC 32000172 : Věcná skupina (spisový znak)
                        width: 215,
                    });
                    /** sloupce na prohledávání */
                    var searchColumns = [];
                    new WebControls.GEssUtils().validateSearchColumns(searchColumns, format.columns);
                    this.grid = $("<div>").gautofit().appendTo(this.element);
                    this.grid.ggrid({
                        data: this.view,
                        name: "gridSeznam",
                        renderMode: "auto",
                        columnMode: "full",
                        navigationMode: "row",
                        columns: format,
                        multi: true,
                        searchColumns: searchColumns
                    });
                }
                createFilterpanel() {
                    this.filter = $("<div>").appendTo(this.element);
                    this.filter.on("gfilterpanelapply", (event, obj) => {
                        if (obj != null && obj.filter != null) {
                            var filter = obj.filter;
                            this.filterData = filter;
                            this.view.requestData();
                        }
                    });
                    this.filter
                        .gfilterpanel({
                        favorites: "all",
                        userSettings: this.userSettings,
                        forms: [this.createFilterForm()],
                        autoLoadAfterCreatePanel: false
                    });
                }
                createFilterForm() {
                    const filterForm = new Gordic.Forms.Form({
                        name: "FormFilterGrid",
                        tabLabel: "Filtr",
                        layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000"
                    });
                    filterForm
                        .addSection();
                    filterForm
                        .addRow({ label: "jres:32000025", required: true }) //RC 32000025 : Funkční místo
                        .addField("gselectbox", "w-12", Gordic.Gin.Fields.ginsfunSSU({
                        validators: [new Gordic.Validators.Required()],
                        name: "ixs_fun_akt",
                        model: "model.ixs_fun_akt=value.ixs_fun",
                        multi: false,
                    }, false));
                    filterForm
                        .addRow({ label: "jres:32000046", required: true }) //RC 32000046 : Datum podání
                        .addField("gdatecombobox", {
                        validators: [new Gordic.Validators.Required()],
                        name: "dat_pod",
                        model: "model.dat_pod=value.date",
                        contextMenu: {
                            daysRange: 60
                        },
                        userSettings: this.userSettings,
                        defaultInitialValue: "all",
                        daysRangeMax: 10000,
                    });
                    filterForm
                        .addRow({ label: "jres:32000176" }) //RC 32000176 : Datum změny
                        .addField("gdatecombobox", {
                        //validators: [new Gordic.Validators.Required()],
                        name: "dat_zmena",
                        //model: "model.dat_zmena=value.date",
                        contextMenu: {
                            daysRange: 60
                        },
                        userSettings: this.userSettings,
                        defaultInitialValue: "all",
                        daysRangeMax: 10000,
                    });
                    filterForm
                        .addRow("jres:32000073") //RC 32000073 : Název
                        .addField("gstringbox", {
                        name: "nazev"
                    });
                    filterForm
                        .addRow("jres:32000178") //RC 32000178 : Identifikátor entity
                        .addField("gstringbox", {
                        name: "ixp"
                    });
                    return filterForm;
                }
            };
            GEssExport = __decorate([
                gcontent
            ], GEssExport);
            WebControls.GEssExport = GEssExport;
        })(WebControls = Ess.WebControls || (Ess.WebControls = {}));
    })(Ess = Gordic.Ess || (Gordic.Ess = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ess;
    (function (Ess) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Výsledek importu
             *
             * @author thazmuka
             * @since 52520.11
             */
            let GEssFinalizeImport = class GEssFinalizeImport extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.asyncTask = null;
                    this.userRequestedCancel = false;
                }
                onContentReady() {
                    this.createGrid();
                    this.createMenubar();
                    this.createCommandbar();
                }
                createMenubar() {
                    var params = [];
                    params.push({
                        primary: true,
                        favorite: true,
                        action: this.actions.add(new GAction({
                            name: "actGenerateAnswer",
                            caption: "jres:32000163", //RC 32000163 : Vygenerovat potvrzovací dávku
                            icon: "",
                            run: () => {
                                if (this.utilsCnt == null) {
                                    this.utilsCnt = new GContent("Gordic.Ess.WebControls.GEssUtils");
                                }
                                this.utilsCnt
                                    .call("GetEssOdpoved2024", {
                                    IxsExt: this.Dto.IxsExt,
                                    DavkaId: this.Dto.DavkaId
                                })
                                    .then((guid) => {
                                    // OK
                                    if (guid != null && guid != "") {
                                        new WebControls.GEssUtils().downloadFile(guid, this);
                                    }
                                });
                            }
                        }))
                    });
                    params.push({
                        align: "opposite",
                        favorite: true,
                        action: this.actions.add(new GAction({
                            enabled: false,
                            name: "actDetailDavka",
                            caption: "jres:32000123", //RC 32000123 : Detail importované dávky
                            icon: "",
                            run: () => {
                                this.hideFlash("davkaFlashId");
                                if (this.Dto.DavkaId == null) {
                                    this.showFlash({ content: "jres:32000124", state: "warning", id: "davkaFlashId" }); //RC 32000124 : Detail dávky není k dispozici.
                                    return;
                                }
                                else {
                                    Ess.Dialogs.GEssDetailDavkaDlg(this, { davka_id: this.Dto.DavkaId, ixs_ext: this.Dto.IxsExt });
                                }
                            }
                        }))
                    });
                    this.menuBar(params);
                }
                runAsyncImportAction(opt) {
                    var that = this;
                    const namespace = "essFinalizeImport";
                    const myclass = "Gordic.Ess.Server.GEssImportAsyncTask";
                    Gordic.Async.GTaskManager.off("." + namespace);
                    this.hideFlash("idFlashErr");
                    Gordic.Async.GTaskManager
                        .getInitPromise()
                        .then(() => {
                        this.beginOperation({
                            id: "idImport",
                            text: "jres:32000058", //RC 32000058 : Probíhá import
                            cancelAction: this.actions.add(new GAction({
                                name: "actCancel",
                                caption: "jres:32000074", //RC 32000074 : Zrušit
                                run: () => {
                                    if (this.asyncTask != null) {
                                        Gordic.Async.GTaskManager.cancel(this.asyncTask);
                                        this.userRequestedCancel = true;
                                        this.progressOperation({
                                            id: "idImport",
                                            text: "jres:32000075", //RC 32000075 : Probíhá zrušení operace
                                        });
                                    }
                                }
                            })),
                            progress: 0,
                            total: opt.selection.length
                        });
                        Gordic.Async.GTaskManager.delayedStart(myclass, {
                            Entities: opt.selection,
                            DavkaId: opt.davka_id,
                            Guid: opt.guid,
                            IxsExt: opt.ixsExt
                        }, { clearOnFinish: false, autoClean: true })
                            .then((task) => {
                            this.asyncTask = task;
                            Gordic.Async.GTaskManager.on("change." + namespace, myclass, function (o) {
                                console.info(this.progress);
                                if (that.userRequestedCancel === true) {
                                    that.endOperation("idImport");
                                    this.clean();
                                    return;
                                }
                                if (this.progress != null && this.progress.current != null) {
                                    // OK
                                    if (this.progress.current === 0) {
                                        var object = JSON.parse(this.progress.text);
                                        if (object != null && object.Data != null) {
                                            var rows = object.Data;
                                            that.progressOperation({
                                                id: "idImport",
                                                progress: rows.length,
                                            });
                                            that.gridChange(rows);
                                        }
                                    }
                                    // FAIL
                                    else {
                                        if (this.progress != null && this.progress.text != null) {
                                            that.showFlash({
                                                id: "idFlashErr",
                                                content: this.progress.text,
                                                state: "error"
                                            });
                                            that.endOperation("idImport");
                                            if (that.actions.actDetailDavka != null) {
                                                that.actions.actDetailDavka.enabled(true);
                                            }
                                            this.clean();
                                        }
                                    }
                                }
                            });
                            Gordic.Async.GTaskManager.on("always." + namespace, myclass, function () {
                                console.info(this.progress);
                                if (that.userRequestedCancel === true) {
                                    that.endOperation("idImport");
                                    this.clean();
                                    return;
                                }
                                if (this.progress != null && this.progress.current != null) {
                                    // OK
                                    if (this.progress.current === 0) {
                                        var object = JSON.parse(this.progress.text);
                                        if (object != null && object.Data != null) {
                                            var rows = object.Data;
                                            that.progressOperation({
                                                id: "idImport",
                                                progress: rows.length,
                                            });
                                            that.gridChange(rows);
                                        }
                                    }
                                    // FAIL
                                    else {
                                        if (this.progress != null && this.progress.text != null) {
                                            that.showFlash({
                                                id: "idFlashErr",
                                                content: this.progress.text,
                                                state: "error"
                                            });
                                        }
                                    }
                                    if (that.actions.actDetailDavka != null) {
                                        that.actions.actDetailDavka.enabled(true);
                                    }
                                    that.endOperation("idImport");
                                    this.clean();
                                }
                            });
                        });
                        //Gordic.Async.GTaskManager.cancel(myclass)
                        //    .then((output) => {
                        //        debugger;
                        //    })
                    });
                }
                gridChange(rows) {
                    this.view.updateData(rows);
                }
                createGrid() {
                    this.grid = $("<div>").gautofit().appendTo(this.element);
                    //if (this.Dto == null || this.Dto.Selection == null) {
                    //    this.view = new Gordic.Data.View();
                    //}
                    //else {
                    //    this.view = new Gordic.Data.View(this.Dto.Selection);
                    //    this.view.getLoadingPromise()
                    //        .then(() => {
                    //            this.runAsyncImportAction({
                    //                selection: this.Dto.Selection!,
                    //                davka_id: this.Dto.DavkaId!,
                    //                guid: this.Dto.Guid!,
                    //                ixsExt: this.Dto.IxsExt!
                    //            });
                    //        });
                    //}
                    this.view = new Gordic.Data.View();
                    this.view.getLoadingPromise()
                        .then(() => {
                        this.runAsyncImportAction({
                            selection: this.Dto.Entities,
                            davka_id: this.Dto.DavkaId,
                            guid: this.Dto.Guid,
                            ixsExt: this.Dto.IxsExt
                        });
                    });
                    const columnsFormat = new Gordic.Data.GridFormat();
                    columnsFormat
                        .addIconColumn({
                        name: "State",
                        caption: "jres:32000059", //RC 32000059 : Stav importu
                        iconTemplate: (data) => {
                            var template = { icon: "", tooltip: "" };
                            if (data["State"] === 1) { // success
                                template.icon = "fa-check-circle g-state-text g-state-success";
                                template.tooltip = "jres:32000063"; //RC 32000063 : Import byl úspěšně proveden.
                            }
                            else if (data["State"] === 0) { // warning
                                template.icon = "fa-exclamation-triangle g-state-text g-state-info";
                                template.tooltip = "jres:32000064"; //RC 32000064 : Import nebyl proveden. Data jsou již obsažena v systému.
                            }
                            else if (data["State"] === 2) { // fail
                                template.icon = "fa-times-circle g-state-text g-state-warning";
                                template.tooltip = "jres:32000065"; //RC 32000065 : Import nebyl proveden. 
                            }
                            return template;
                        }
                    })
                        .addTextColumn({
                        name: "IdEntity",
                        width: 150,
                        caption: "jres:32000060", //RC 32000060 : Externí identifikátor
                    })
                        .addTextColumn({
                        name: "IdInt",
                        caption: "jres:32000061", //RC 32000061 : Interní identifikátor
                        width: 150,
                    })
                        .addTextColumn({
                        name: "IdIntVer",
                        caption: "jres:32000098", //RC 32000098 : Interní identifikátor (verze)
                        width: 200,
                    })
                        .addTextColumn({
                        name: "TypEntity",
                        caption: "jres:32000062", //RC 32000062 : Typ entity
                        width: 150,
                    })
                        .addTextColumn({
                        name: "Info",
                        caption: "jres:32000069", //RC 32000069 : Doplňující informace
                        width: 750,
                    })
                        .addTextColumn({
                        name: "Nazev",
                        caption: "jres:32000228", //RC 32000228 : Název entity / věc
                        width: 300,
                    });
                    const sort = "";
                    /** sloupce na prohledávání */
                    var searchColumns = [];
                    new WebControls.GEssUtils().validateSearchColumns(searchColumns, columnsFormat.columns);
                    this.grid.ggrid({
                        name: "gridSeznamImport",
                        data: this.view,
                        renderMode: "auto",
                        columnMode: "full",
                        navigationMode: "row",
                        columns: columnsFormat,
                        sort: sort,
                        searchColumns: searchColumns,
                    });
                }
                createCommandbar() {
                    var params = [];
                    params.push({
                        favorite: true,
                        action: this.actions.add(new GAction({
                            name: "actClose",
                            caption: "jres:32000018", //RC 32000018 : Zavřít
                            icon: "gi-window-close",
                            run: () => {
                                this.tryClose();
                            }
                        }))
                    });
                    this.commandBar(params);
                }
            };
            GEssFinalizeImport = __decorate([
                gcontent
            ], GEssFinalizeImport);
            WebControls.GEssFinalizeImport = GEssFinalizeImport;
        })(WebControls = Ess.WebControls || (Ess.WebControls = {}));
    })(Ess = Gordic.Ess || (Gordic.Ess = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ess;
    (function (Ess) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Seznam importovaných balíků
             *
             * @author thazmuka
             * @since 52510.1
             */
            let GEssPrepareImport = class GEssPrepareImport extends Gordic.GContentBase {
                onContentReady() {
                    if (this.utils == null) {
                        this.utils = new WebControls.GEssUtils();
                    }
                    if (this.utilsCnt == null) {
                        this.utilsCnt = new GContent("Gordic.Ess.WebControls.GEssUtils");
                    }
                    this.createMenubar();
                    this.createForm();
                    this.createGrid();
                    this.createCommandbar();
                }
                createGrid() {
                    var that = this;
                    var element = this.element;
                    this.view = new Gordic.Data.View(undefined, {
                        key: "IdEntity",
                        processors: {
                        //error: new Gordic.Data.ErrorProcessor((datarow, mmetarow) => {
                        //    // thazmuka (26.8.2020) - vyčištění předchozích chyb, jinak se nesmažou, pokud další chyba nenastane
                        //    mmetarow.errors = undefined;
                        //    var errors = that.setGridErrors(datarow);
                        //    return errors;
                        //})
                        //filter: new Gordic.Data.FilterProcessor((input) => {
                        //    if (input.data["TypEntity"] !== TypEntity.Soubor)
                        //        return true;
                        //    return false;
                        //}, {})
                        },
                    });
                    //#region --- GRID ---
                    const sort = "";
                    const columnsFormat = new Gordic.Data.GridFormat();
                    columnsFormat
                        .addTextColumn({
                        name: "IdEntity",
                        width: 150,
                        caption: "jres:32000060", //RC 32000060 : Externí identifikátor
                    })
                        //.addTextColumn({
                        //    name: "Jmeno",
                        //    width: 250,
                        //    caption: "jres:32000082", //RC 32000082 : Věc / Název
                        //})
                        .addTextColumn({
                        name: "TypEntity",
                        width: 110,
                        caption: "jres:32000083", //RC 32000083 : Typ
                        cellTemplate: (row) => {
                            if (row["TypEntity"] === WebControls.TypEntity.TypovySpis) {
                                return "jres:32000202"; //RC 32000202 : Typový spis
                            }
                            return row["TypEntity"];
                        }
                    })
                        .addTextColumn({
                        name: "StavTxt",
                        width: 100,
                        caption: "jres:32000205", //RC 32000205 : Stav
                    });
                    columnsFormat
                        .addTextColumn({
                        name: "HodnotaID",
                        width: 125,
                        caption: "jres:32000181", //RC 32000181 : Hodnota ID
                    })
                        .addTextColumn({
                        name: "ZdrojID",
                        width: 125,
                        caption: "jres:32000182", //RC 32000182 : Zdroj ID
                    })
                        .addTextColumn({
                        name: "Nazev", // Název prvku jak je uvedeno v popisných metadatech Dokumentu/Spisu/Typového spisu
                        width: 200,
                        caption: "jres:32000183", //RC 32000183 : Název
                    })
                        .addTextColumn({
                        name: "CisloJednaci",
                        width: 200,
                        caption: "jres:32000184", //RC 32000184 : Čj
                        tooltipTemplate: () => {
                            return "jres:32000185"; //RC 32000185 : Číslo jednací
                        }
                    })
                        .addTextColumn({
                        name: "SpisovaZnacka",
                        width: 200,
                        caption: "jres:32000186", //RC 32000186 : SpZn.
                        tooltipTemplate: () => {
                            return "jres:32000187"; //RC 32000187 : Spisová značka
                        }
                    })
                        .addTextColumn({
                        name: "DruhDokumentu",
                        width: 200,
                        caption: "jres:32000188", //RC 32000188 : Druh dokumentu
                    });
                    //#region -- VĚCNÁ SKUPINA --
                    columnsFormat
                        .addTextColumn({
                        name: "VecnaSkupina", // původní hodnota
                        caption: "jres:32000189", //RC 32000189 : Původní věcná skupina
                        width: 175,
                    });
                    columnsFormat
                        .addTextColumn({
                        name: "IxsVsk",
                        caption: "jres:32000190", //RC 32000190 : Zvolená věcná skupina
                        width: 175,
                        cellTemplate: (value) => {
                            if (value == null) {
                                return "";
                            }
                            if (value["TypEntity"] !== WebControls.TypEntity.Dokument && value["TypEntity"] !== WebControls.TypEntity.Spis && value["TypEntity"] !== WebControls.TypEntity.TypovySpis) {
                                return "";
                            }
                            if (value["VecnaSkupinaNazev"] == null || value["VecnaSkupinaSpisZnak"] === "") {
                                return "<div><i>Dle xml</i></div>";
                            }
                            return value["VecnaSkupinaNazev"] + " | " + value["VecnaSkupinaSpisZnak"];
                        },
                        editor: (ctx) => {
                            if (ctx.cellInfo == null || ctx.cellInfo.data == null) {
                                return null;
                            }
                            if (ctx.cellInfo.data["TypEntity"] !== WebControls.TypEntity.Dokument && ctx.cellInfo.data["TypEntity"] !== WebControls.TypEntity.Spis && ctx.cellInfo.data["TypEntity"] !== WebControls.TypEntity.TypovySpis) {
                                return null;
                            }
                            var prefabGinsvskOptions = Gordic.Prefabs.Select.ginsvsk();
                            //if (prefabGinsvskOptions.validators != null) {
                            //    prefabGinsvskOptions.validators.push(new Gordic.Validators.Required());
                            //}
                            var editor = {
                                widget: "gselectbox",
                                options: prefabGinsvskOptions
                            };
                            var urceni_spis_z = undefined;
                            if (ctx.cellInfo.data["TypEntity"] === WebControls.TypEntity.Dokument || ctx.cellInfo.data["TypEntity"] === WebControls.TypEntity.Spis) {
                                urceni_spis_z = [1, 2, 3];
                            }
                            else if (ctx.cellInfo.data["TypEntity"] === WebControls.TypEntity.TypovySpis) {
                                urceni_spis_z = 5;
                            }
                            prefabGinsvskOptions = $.extend(prefabGinsvskOptions, ({
                                serverFilters: {
                                    urceni_spis_z: urceni_spis_z,
                                    JenKoncove: true
                                }
                            }), {
                                serverFilters: {
                                    urceni_spis_z: urceni_spis_z,
                                    JenKoncove: true,
                                },
                                validators: [new Gordic.Validators.Required()],
                                itemTemplate: function (value) {
                                    if (value) {
                                        return value.nazev + " | " + value.spis_znak;
                                    }
                                },
                                model: "model.IxsVsk = value.ixs_vsk;model.VecnaSkupinaNazev = value.nazev; model.VecnaSkupinaSpisZnak=value.spis_znak;",
                                change: (ev, obj) => {
                                }
                            });
                            var editor = {
                                widget: "gselectbox",
                                options: prefabGinsvskOptions
                            };
                            return editor;
                        }
                    });
                    //#endregion
                    /** sloupce na prohledávání */
                    var searchColumns = [];
                    new WebControls.GEssUtils().validateSearchColumns(searchColumns, columnsFormat.columns);
                    this.grid = $("<div>").ggrid({
                        multi: true,
                        name: "gridPrepareImportData",
                        data: this.view,
                        renderMode: "auto",
                        columnMode: "full",
                        navigationMode: "row",
                        columns: columnsFormat,
                        sort: sort,
                        searchColumns: searchColumns,
                        rowsEnabled: (metarow) => {
                            if (metarow != null && metarow.data != null && metarow.data["UmoznitVyberUzivatele"] === true)
                                return true;
                            return false;
                        },
                        selection: (ev, obj) => {
                            // ošetření při zavření contentu
                            if (this.closed === true) {
                                return;
                            }
                            var selection = this.grid.ggrid("getSelection");
                            if (selection == null || selection.length === 0)
                                return;
                            if (that.actions.actNovyImport != null) {
                                that.actions.actNovyImport.enabled(true);
                            }
                        }
                    }).gautofit();
                    this.grid
                        .ggridroweditor({
                        commit: (a, b) => {
                            //that.validateGridErrors(this.view, false);
                        }
                    });
                    this.grid.appendTo(element);
                    //#endregion
                }
                createForm() {
                    var that = this;
                    this.form = $("<div>").appendTo(this.element);
                    var Form = new Gordic.Forms.Form({ name: "FormPrepareImportData", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" });
                    Form
                        .addSection("jres:32000054") //RC 32000054 : Vstupní nastavení
                        .addRow({ required: true, label: "jres:32000048" }) //RC 32000048 : Externí systém
                        .addField("gselectbox", Gordic.Prefabs.Select.intsext(), {
                        validators: [new Gordic.Validators.Required()],
                        name: "IxsExt",
                        model: "model.IxsExt=value.ixs_ext",
                        serverFilters: {
                            aktivita: [100],
                            priz_ess: 3,
                            verze_ess: "NS2024"
                        }
                    });
                    Form
                        .addRow("jres:32000056") //RC 32000056 : Soubor k importu
                        .addField("gfilefield", {
                        name: "file",
                        model: "model.Guid=value.guid",
                        validators: [new Gordic.Validators.Required({ stopping: true })],
                        flag: "required",
                        acceptExtension: ".zip",
                        fileRemoved: (ev, obj) => {
                            const guid = obj.fileInfo.guid;
                            if (guid != null) {
                                this.utilsCnt.call("DeleteFile", { Guid: guid })
                                    .then(() => {
                                    // odstraneni globalni hodnoty
                                    that.guid = null;
                                    // znepristupeni akci v menu
                                    if (that.actions.actPrepareImport != null) {
                                        that.actions.actPrepareImport.enabled(false);
                                    }
                                    if (that.actions.actNovyImport != null) {
                                        that.actions.actNovyImport.enabled(false);
                                    }
                                    // vycisteni view gridu
                                    this.view.updateData([]);
                                });
                            }
                        },
                        fileUploaded: (ev, obj) => {
                            const guid = obj.fileInfo.guid;
                            that.utilsCnt.call("TransferFile", { Guid: guid })
                                .then(() => {
                                that.guid = guid;
                                if (that.actions.actPrepareImport != null) {
                                    that.actions.actPrepareImport.enabled(true);
                                }
                            });
                        }
                    });
                    //#region -- PŘIŘADIT HROMADNĚ VĚCNÉ SKUPINY PRO DOK/SPIS --
                    var vecnaSkupinaDokSpisAction = [];
                    vecnaSkupinaDokSpisAction.push({
                        favorite: true,
                        action: new GAction({
                            name: "actAddVecnaSkupinaDokSpisMulti",
                            caption: "jres:32000092", //RC 32000092 : Přiřadit
                            run: (ev, obj) => {
                                if (obj != null && obj.field != null) {
                                    var value = $(obj.field).gfield("getValue");
                                    if (value == null)
                                        return;
                                    if (this.grid == null) {
                                        console.error("grid neni k dispozici");
                                        return;
                                    }
                                    const selection = this.grid.ggrid("getSelection");
                                    if (selection == null || selection.length === 0) {
                                        console.error("selection neni k dispozici nebo neni vybran zadny radek");
                                        return;
                                    }
                                    var rowsUpdated = selection.map((dataRow) => {
                                        if (dataRow["TypEntity"] != WebControls.TypEntity.Dokument &&
                                            dataRow["TypEntity"] != WebControls.TypEntity.Spis)
                                            return dataRow;
                                        dataRow["IxsVsk"] = value.ixs_vsk;
                                        dataRow["VecnaSkupinaNazev"] = value.nazev;
                                        dataRow["VecnaSkupinaSpisZnak"] = value.spis_znak;
                                        return dataRow;
                                    });
                                    this.view.updateData(rowsUpdated, "update");
                                }
                            }
                        })
                    });
                    //#endregion
                    //#region -- PŘIŘADIT HROMADNĚ VĚCNÉ SKUPINY PRO TYP. SPISY --
                    var vecnaSkupinaTypSpisAction = [];
                    vecnaSkupinaTypSpisAction.push({
                        favorite: true,
                        action: new GAction({
                            name: "actAddVecnaSkupinaTypSpisMulti",
                            caption: "jres:32000092", //RC 32000092 : Přiřadit
                            run: (ev, obj) => {
                                if (obj != null && obj.field != null) {
                                    var value = $(obj.field).gfield("getValue");
                                    if (value == null)
                                        return;
                                    if (this.grid == null) {
                                        console.error("grid neni k dispozici");
                                        return;
                                    }
                                    const selection = this.grid.ggrid("getSelection");
                                    if (selection == null || selection.length === 0) {
                                        console.error("selection neni k dispozici nebo neni vybran zadny radek");
                                        return;
                                    }
                                    var rowsUpdated = selection.map((dataRow) => {
                                        if (dataRow["TypEntity"] != WebControls.TypEntity.TypovySpis)
                                            return dataRow;
                                        dataRow["IxsVsk"] = value.ixs_vsk;
                                        dataRow["VecnaSkupinaNazev"] = value.nazev;
                                        dataRow["VecnaSkupinaSpisZnak"] = value.spis_znak;
                                        return dataRow;
                                    });
                                    this.view.updateData(rowsUpdated, "update");
                                }
                            }
                        })
                    });
                    //#endregion
                    var prefabGinsvskOptionsDokSpis = Gordic.Prefabs.Select.ginsvsk();
                    prefabGinsvskOptionsDokSpis = $.extend(prefabGinsvskOptionsDokSpis, ({
                        serverFilters: {
                            urceni_spis_z: [1, 2, 3], // dokumenty a spisy
                            JenKoncove: true
                        }
                    }), {
                        buttons: vecnaSkupinaDokSpisAction,
                        name: "VecnaSkupinaMultiDokSpis",
                        serverFilters: {
                            urceni_spis_z: [1, 2, 3], // dokumenty a spisy
                            JenKoncove: true,
                        },
                        itemTemplate: function (value) {
                            if (value) {
                                return value.nazev + " | " + value.spis_znak;
                            }
                        },
                    });
                    Form
                        .addSection("jres:32000173"); //RC 32000173 : Hromadná změna věcné skupiny
                    Form
                        .addRow("jres:32000091") //RC 32000091 : Pro spisy/dokumenty
                        .addField("gselectbox", prefabGinsvskOptionsDokSpis);
                    var prefabGinsvskOptionsTypSpis = Gordic.Prefabs.Select.ginsvsk();
                    prefabGinsvskOptionsTypSpis = $.extend(prefabGinsvskOptionsTypSpis, ({
                        serverFilters: {
                            urceni_spis_z: 5, // typové spisy
                            //JenKoncove: true
                        }
                    }), {
                        buttons: vecnaSkupinaTypSpisAction,
                        name: "VecnaSkupinaTypSpisMulti",
                        serverFilters: {
                            urceni_spis_z: 5, // typové spisy
                            //JenKoncove: true,
                        },
                        itemTemplate: function (value) {
                            if (value) {
                                return value.nazev + " | " + value.spis_znak;
                            }
                        },
                    });
                    Form
                        .addRow("jres:32000099") //RC 32000099 : Pro typové spisy
                        .addField("gselectbox", prefabGinsvskOptionsTypSpis);
                    this.form.gform("createFrom", Form);
                }
                createMenubar() {
                    var params = [];
                    params.push({
                        favorite: true,
                        action: this.actions.add(new GAction({
                            enabled: false,
                            name: "actPrepareImport",
                            caption: "jres:32000094", //RC 32000094 : Příprava importu
                            icon: "",
                            run: () => {
                                this.utils.waitForValues(this.form)
                                    .then((isValid, data) => {
                                    // formulář není validně vyplněn
                                    if (isValid !== true)
                                        return;
                                    this.call("ImportDocumentPrepare2024", { Guid: data.Guid[0], IxsExt: data.IxsExt })
                                        .then((output) => {
                                        this.davka_id = output.Item2;
                                        this.view.updateData(output.Item1);
                                        this.eleFilesToImport = output.Item3;
                                        // označení všech řádků
                                        const instance = this.grid.ggrid("instance");
                                        if (instance != null && instance.actions != null && instance.actions.actCheckAll != null) {
                                            instance.actions.actCheckAll.run();
                                        }
                                    });
                                });
                            }
                        }))
                    });
                    params.push({
                        primary: true,
                        favorite: true,
                        action: this.actions.add(new GAction({
                            enabled: false,
                            name: "actNovyImport",
                            caption: "jres:32000066", //RC 32000066 : Spustit import
                            icon: "",
                            run: () => {
                                this.hideFlash("idFlashSelection");
                                if (this.grid == null)
                                    return;
                                // odfiltrovani nepovolenych entit
                                var selection = this.grid.ggrid("getSelection").filter((row) => {
                                    return row["UmoznitVyberUzivatele"] === true ? true : false;
                                });
                                if (selection.length === 0) {
                                    this.showFlash({ id: "idFlashSelection", content: "jres:32000207", state: "warning" }); //RC 32000207 : Není vybrán žádný řádek v seznamu nebo řádek v seznamu není povolen pro výběr.
                                    return;
                                }
                                var metarows = this.view.getRows(true);
                                if (metarows == null || metarows.length === 0) {
                                    this.showFlash({ id: "idFlashSelection", content: "jres:32000207", state: "warning" }); //RC 32000207 : Není vybrán žádný řádek v seznamu nebo řádek v seznamu není povolen pro výběr.
                                    return;
                                }
                                this.utils.waitForValues(this.form)
                                    .then((isValid, data) => {
                                    // formulář není validně vyplněn
                                    if (isValid !== true)
                                        return;
                                    // data nebo guid není naplněn
                                    if (data == null || data.Guid == null)
                                        return;
                                    if (this.eleFilesToImport == null) {
                                        console.error("Nejsou k dispozici žádné ele soubory!");
                                    }
                                    // označení ele souborů uživatelem (pro jistotu)
                                    var elerows = this.eleFilesToImport.map((data) => {
                                        data["VyberUzivatele"] = true;
                                        return data;
                                    });
                                    var oneSelectRow = null;
                                    // vybrali jsme pouze jeden řádek a je šance, že jsme ho nezakliknuli, ale zároveň ho chceme použít
                                    // odflitrování, že řádek můžeme použít již proběhlo víše 
                                    if (selection.length === 1) {
                                        oneSelectRow = selection[0];
                                    }
                                    var rows = metarows.map((metadata) => {
                                        // jednořádkový výběr, kdy nemusí dojít k zaškrtnutí
                                        if (oneSelectRow != null && metadata.data["IdEntity"] === oneSelectRow["IdEntity"]) {
                                            metadata.data["VyberUzivatele"] = true;
                                        }
                                        else {
                                            metadata.data["VyberUzivatele"] = metadata.checked != null ? metadata.checked : false;
                                        }
                                        return metadata.data;
                                    });
                                    // spojení entit a el. souborů
                                    var resultEntities = rows.concat(elerows);
                                    Gordic.Ess.Dialogs.GEssFinalizeImportDlg(this, {
                                        dto: {
                                            Entities: resultEntities,
                                            DavkaId: this.davka_id,
                                            Guid: data.Guid[0],
                                            IxsExt: data.IxsExt
                                        }
                                    });
                                });
                                return;
                            }
                        }))
                    });
                    this.menuBar(params);
                }
                createCommandbar() {
                    var params = [];
                    params.push({
                        favorite: true,
                        action: this.actions.add(new GAction({
                            name: "actClose",
                            caption: "jres:32000018", //RC 32000018 : Zavřít
                            icon: "gi-window-close",
                            run: () => {
                                this.tryClose();
                            }
                        }))
                    });
                    this.commandBar(params);
                }
            };
            GEssPrepareImport = __decorate([
                gcontent
            ], GEssPrepareImport);
            WebControls.GEssPrepareImport = GEssPrepareImport;
        })(WebControls = Ess.WebControls || (Ess.WebControls = {}));
    })(Ess = Gordic.Ess || (Gordic.Ess = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ess;
    (function (Ess) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Potvrzení dávky
             *
             * @author thazmuka
             * @since 52520.11
             */
            let GEssPotvrzeni = class GEssPotvrzeni extends Gordic.GContentBase {
                onContentReady() {
                    if (this.utils == null) {
                        this.utils = new WebControls.GEssUtils();
                    }
                    if (this.utilsCnt == null) {
                        this.utilsCnt = new GContent("Gordic.Ess.WebControls.GEssUtils");
                    }
                    this.createMenubar();
                    this.createForm();
                    this.createCommandbar();
                }
                createCommandbar() {
                    var params = [];
                    params.push({
                        favorite: true,
                        action: this.actions.add(new GAction({
                            name: "actClose",
                            caption: "jres:32000018", //RC 32000018 : Zavřít
                            icon: "gi-window-close",
                            run: () => {
                                this.tryClose();
                            }
                        }))
                    });
                    this.commandBar(params);
                }
                createMenubar() {
                    var params = [];
                    params.push({
                        favorite: true,
                        action: this.actions.add(new GAction({
                            enabled: false,
                            name: "actPotvrditDavku",
                            caption: "jres:32000166", //RC 32000166 : Potvrdit dávku
                            icon: "",
                            run: () => {
                                this.hideFlash("GEssPotvrzeniError");
                                this.utils.waitForValues(this.form)
                                    .then((isValid, data) => {
                                    if (isValid !== true) {
                                        console.error("Formulář není validně naplněn.");
                                        return;
                                    }
                                    if (data == null) {
                                        console.error("Data po validaci formuláře před potvrzením dávky špatně naplněna.");
                                        return;
                                    }
                                    if (data.IxsExt == null || data.IxsExt === "") {
                                        console.error("Identifikátor externího systému není naplněn.");
                                        return;
                                    }
                                    this.call("ImportPotvrzeni2024", { Guid: data.Guid[0], IxsExt: data.IxsExt })
                                        .then((davka_id) => {
                                        if (davka_id == null) {
                                            this.showFlash({
                                                content: "jres:32000175", //RC 32000175 : Potvrzení dávky nevrátilo identifikátor dávky.
                                                state: "warning",
                                                id: "GEssPotvrzeniError"
                                            });
                                        }
                                        else {
                                            // uložení na globál
                                            this.IxsExt = data.IxsExt;
                                            this.DavkaId = davka_id;
                                            // povolení akce v menu
                                            if (this.actions.actDetailDavka != null) {
                                                this.actions.actDetailDavka.enabled(true);
                                            }
                                            Ess.Dialogs.GEssDetailDavkaDlg(this, { davka_id: davka_id, ixs_ext: data.IxsExt });
                                        }
                                    });
                                });
                            }
                        }))
                    });
                    params.push({
                        align: "opposite",
                        favorite: true,
                        action: this.actions.add(new GAction({
                            enabled: false,
                            name: "actDetailDavka",
                            caption: "jres:32000123", //RC 32000123 : Detail importované dávky
                            icon: "",
                            run: () => {
                                this.hideFlash("davkaFlashId");
                                if (this.DavkaId == null) {
                                    this.showFlash({ content: "jres:32000124", state: "warning", id: "davkaFlashId" }); //RC 32000124 : Detail dávky není k dispozici.
                                    return;
                                }
                                else {
                                    Ess.Dialogs.GEssDetailDavkaDlg(this, { davka_id: this.DavkaId, ixs_ext: this.IxsExt });
                                }
                            }
                        }))
                    });
                    this.menuBar(params);
                }
                createForm() {
                    var that = this;
                    this.form = $("<div>").appendTo(this.element);
                    var Form = new Gordic.Forms.Form({ name: "FormPrepareImportData", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" });
                    Form
                        .addSection("jres:32000054") //RC 32000054 : Vstupní nastavení
                        .addRow({ required: true, label: "jres:32000048" }) //RC 32000048 : Externí systém
                        .addField("gselectbox", Gordic.Prefabs.Select.intsext(), {
                        validators: [new Gordic.Validators.Required()],
                        name: "IxsExt",
                        model: "model.IxsExt=value.ixs_ext",
                        serverFilters: {
                            aktivita: [100],
                            priz_ess: 3,
                            verze_ess: "NS2024"
                        }
                    });
                    Form
                        .addRow("jres:32000165") //RC 32000165 : XML soubor pro potvrzení
                        .addField("gfilefield", {
                        name: "file",
                        model: "model.Guid=value.guid",
                        validators: [new Gordic.Validators.Required({ stopping: true })],
                        flag: "required",
                        acceptExtension: ".xml",
                        fileRemoved: (ev, obj) => {
                            const guid = obj.fileInfo.guid;
                            if (guid != null) {
                                this.utilsCnt.call("DeleteFile", { Guid: guid })
                                    .then(() => {
                                    // odstraneni globalni hodnoty
                                    that.guid = null;
                                    // znepristupeni akci v menu
                                    if (that.actions.actPotvrditDavku != null) {
                                        that.actions.actPotvrditDavku.enabled(false);
                                    }
                                });
                            }
                        },
                        fileUploaded: (ev, obj) => {
                            const guid = obj.fileInfo.guid;
                            that.utilsCnt.call("TransferFile", { Guid: guid })
                                .then(() => {
                                that.guid = guid;
                                // znepristupeni akci v menu
                                if (that.actions.actPotvrditDavku != null) {
                                    that.actions.actPotvrditDavku.enabled(true);
                                }
                            });
                        }
                    });
                    this.form.gform("createFrom", Form);
                }
            };
            GEssPotvrzeni = __decorate([
                gcontent
            ], GEssPotvrzeni);
            WebControls.GEssPotvrzeni = GEssPotvrzeni;
        })(WebControls = Ess.WebControls || (Ess.WebControls = {}));
    })(Ess = Gordic.Ess || (Gordic.Ess = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNzLndlYmNvbnRyb2xzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJHRXNzRGlhbG9ncy50cyIsIkdFc3NVdGlscy50cyIsIkRhc2hib2FyZC9HRXNzRGFzaGJvYXJkLnRzIiwiRGF2a3kvR0Vzc0RldGFpbERhdmthLnRzIiwiRGF2a3kvR0Vzc1Nlem5hbURhdmt5LnRzIiwiRXhwb3J0L0dFc3NFeHBvcnQudHMiLCJJbXBvcnQvR0Vzc0ZpbmFsaXplSW1wb3J0LnRzIiwiSW1wb3J0L0dFc3NQcmVwYXJlSW1wb3J0LnRzIiwiUG90dnJ6ZW5pL0dFc3NQb3R2cnplbmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQW9HZjtBQXBHRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FvR25CO0lBcEdnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE9BQU8sQ0FvRzNCO1FBcEdvQixXQUFBLE9BQU87WUFFM0I7Ozs7Ozs7ZUFPRztZQUNILFNBQWdCLGFBQWEsQ0FDNUIsYUFBdUIsRUFDdkIsR0FBNkQsRUFDN0QsV0FBNkM7Z0JBRTdDLE1BQU0sT0FBTyxHQUFHO29CQUNmLEVBQUUsRUFBRSxhQUFhO29CQUNqQixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTO2lCQUNoQyxDQUFDO2dCQUNGLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDOUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM3RSxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ2hGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDbkIsSUFBSSxPQUFPLEVBQUUsQ0FBQztvQkFDYixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxtQ0FBbUMsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQy9HLENBQUM7cUJBQU0sQ0FBQztvQkFDUCxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ25CLENBQUM7Z0JBQ0QsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0IsQ0FBQztZQW5CZSxxQkFBYSxnQkFtQjVCLENBQUE7WUFHRDs7ZUFFRztZQUNILFNBQWdCLHFCQUFxQixDQUNwQyxhQUF1QixFQUN2QixHQUE0RCxFQUM1RCxXQUE2QztnQkFFN0MsTUFBTSxPQUFPLEdBQUc7b0JBQ2YsRUFBRSxFQUFFLHVCQUF1QjtvQkFDM0IsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUztpQkFDOUIsQ0FBQztnQkFDRixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDN0UsV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUNoRixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksT0FBTyxFQUFFLENBQUM7b0JBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsMkNBQTJDLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN2SCxDQUFDO3FCQUFNLENBQUM7b0JBQ1AsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNuQixDQUFDO2dCQUNELE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNCLENBQUM7WUFuQmUsNkJBQXFCLHdCQW1CcEMsQ0FBQTtZQUVELFNBQWdCLGtCQUFrQixDQUNqQyxhQUF1QixFQUN2QixHQUFnRSxFQUNoRSxXQUE2QztnQkFFN0MsTUFBTSxPQUFPLEdBQUc7b0JBQ2YsRUFBRSxFQUFFLG9CQUFvQjtvQkFDeEIsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUztpQkFDeEMsQ0FBQztnQkFDRixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDN0UsV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUNoRixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksT0FBTyxFQUFFLENBQUM7b0JBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsd0NBQXdDLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNwSCxDQUFDO3FCQUFNLENBQUM7b0JBQ1AsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNuQixDQUFDO2dCQUNELE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNCLENBQUM7WUFuQmUsMEJBQWtCLHFCQW1CakMsQ0FBQTtZQUVELFNBQWdCLGtCQUFrQixDQUNqQyxhQUF1QixFQUN2QixHQUFpRCxFQUNqRCxXQUE2QztnQkFFN0MsTUFBTSxPQUFPLEdBQUc7b0JBQ2YsRUFBRSxFQUFFLG9CQUFvQjtvQkFDeEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUztvQkFDckMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUztpQkFDdkMsQ0FBQztnQkFDRixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDN0UsV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUNoRixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksT0FBTyxFQUFFLENBQUM7b0JBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsd0NBQXdDLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNwSCxDQUFDO3FCQUFNLENBQUM7b0JBQ1AsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNuQixDQUFDO2dCQUNELE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNCLENBQUM7WUFwQmUsMEJBQWtCLHFCQW9CakMsQ0FBQTtRQUdGLENBQUMsRUFwR29CLE9BQU8sR0FBUCxXQUFPLEtBQVAsV0FBTyxRQW9HM0I7SUFBRCxDQUFDLEVBcEdnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFvR25CO0FBQUQsQ0FBQyxFQXBHUyxNQUFNLEtBQU4sTUFBTSxRQW9HZjtBQ3BHRCxJQUFVLE1BQU0sQ0EwRmY7QUExRkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMEZuQjtJQTFGZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxXQUFXLENBMEYvQjtRQTFGb0IsV0FBQSxXQUFXO1lBRTVCLElBQVksU0FLWDtZQUxELFdBQVksU0FBUztnQkFDakIsOEJBQWlCLENBQUE7Z0JBQ2pCLGtDQUFxQixDQUFBO2dCQUNyQiwwQkFBYSxDQUFBO2dCQUNiLHNDQUF5QixDQUFBO1lBQzdCLENBQUMsRUFMVyxTQUFTLEdBQVQscUJBQVMsS0FBVCxxQkFBUyxRQUtwQjtZQUVEOzs7OztlQUtHO1lBQ0gsTUFBYSxTQUFTO2dCQUVYLGFBQWEsQ0FBQyxJQUF5QjtvQkFDMUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQzt5QkFDdEIsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2pDLENBQUMsQ0FBQzt5QkFDRCxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDZCxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQzs0QkFDbkIsSUFBSSxHQUFHLEdBQVEsRUFBRSxDQUFDOzRCQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQ2xELEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUM5QixDQUFDOzZCQUNJLENBQUM7NEJBQ0YsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDekIsQ0FBQztvQkFDTCxDQUFDLENBQUM7eUJBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFDUCxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN0QixDQUFDLENBQUMsQ0FBQTtvQkFDTixPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDekIsQ0FBQztnQkFFRDs7bUJBRUc7Z0JBQ0kscUJBQXFCLENBQUksYUFBdUIsRUFBRSxZQUE4QjtvQkFDbkYsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQzt3QkFDdkQsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNwQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7NEJBQ3ZCLHFEQUFxRDs0QkFDckQsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQztnQ0FDakQsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3JDLENBQUM7d0JBQ0wsQ0FBQztvQkFDTCxDQUFDO2dCQUNMLENBQUM7Z0JBRU0sWUFBWSxDQUFDLElBQVksRUFBRSxHQUFzQjtvQkFFcEQsTUFBTSxHQUFHLEdBQUc7d0JBQ1IsY0FBYyxFQUFFLHdDQUF3Qzt3QkFDeEQsWUFBWSxFQUFFLElBQUk7d0JBQ2xCLHFCQUFxQixFQUFFLElBQUk7d0JBQzNCLFVBQVUsRUFBRTs0QkFDUixNQUFNLEVBQUUsSUFBSTt5QkFDZjtxQkFDSixDQUFDO29CQUVGLE1BQU0sR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMvQixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFFN0MsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQzt5QkFDcEIsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFDUCxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO3dCQUMzQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTs0QkFDcEIsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMseURBQXlEO3lCQUN4SCxDQUFDLENBQUM7b0JBQ1AsQ0FBQyxDQUFDO3lCQUNELElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ1AsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQzt3QkFDbkMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUU7NEJBQ3BCLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLDZDQUE2Qzt5QkFDMUcsQ0FBQyxDQUFDO29CQUNQLENBQUMsQ0FBQzt5QkFDRCxNQUFNLENBQUMsR0FBRyxFQUFFO3dCQUNULElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDOzRCQUNiLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNqQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUVYLENBQUM7YUFFSjtZQTFFWSxxQkFBUyxZQTBFckIsQ0FBQTtRQUNMLENBQUMsRUExRm9CLFdBQVcsR0FBWCxlQUFXLEtBQVgsZUFBVyxRQTBGL0I7SUFBRCxDQUFDLEVBMUZnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEwRm5CO0FBQUQsQ0FBQyxFQTFGUyxNQUFNLEtBQU4sTUFBTSxRQTBGZjtBQzFGRCxJQUFVLE1BQU0sQ0FvRmY7QUFwRkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBb0ZuQjtJQXBGZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxXQUFXLENBb0YvQjtRQXBGb0IsV0FBQSxXQUFXO1lBRTVCLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFFaEM7Ozs7O2VBS0c7WUFFSCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFjLFNBQVEsT0FBQSxZQUFZO2dCQU1wQyxjQUFjO29CQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRzt3QkFDZCxJQUFJLEVBQUUsc0NBQXNDO3dCQUM1QyxRQUFRLEVBQUUsa0JBQWtCO3dCQUM1QixVQUFVLEVBQUUsR0FBRyxDQUFFLE1BQU07cUJBQzFCLENBQUM7b0JBQ0YsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNoQixDQUFDO2dCQUVPLElBQUk7b0JBQ1IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUMxQixDQUFDO2dCQUVPLGNBQWM7b0JBRWxCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDVixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssR0FBRyxlQUFlLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxtQ0FBbUM7b0JBRWxKLElBQUksSUFBSSxHQUFVLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDO3dCQUM1QixJQUFJLEVBQUUsYUFBYSxHQUFHLEdBQUcsR0FBRyxDQUFDO3dCQUM3QixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQzt3QkFDeEUsV0FBVyxFQUFFLGVBQWUsRUFBRSwyREFBMkQ7d0JBQ3pGLGFBQWEsRUFBRSxhQUFhO3FCQUMvQixDQUFDLENBQUMsQ0FBQztvQkFFSixNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUU3RCxJQUFJLGVBQWUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3hDLEVBQUUsRUFBRSxXQUFXOzRCQUNmLEtBQUssRUFBRSxlQUFlLEVBQUUscUJBQXFCOzRCQUM3QyxJQUFJLEVBQUUsQ0FBQzs0QkFDUCxJQUFJLEVBQUUsVUFBVTs0QkFDaEIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLDJCQUEyQixFQUFFLENBQUMsWUFBWTs0QkFDOUUsZUFBZSxFQUFFLEtBQUs7NEJBQ3RCLElBQUksRUFBRSxRQUFROzRCQUNkLFVBQVUsRUFBRTtnQ0FDUjtvQ0FDSSxJQUFJLEVBQUUsWUFBWTtvQ0FDbEIsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDO3dDQUNoQixJQUFJLEVBQUUsaUJBQWlCO3dDQUN2QixjQUFjLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUs7d0NBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsNEJBQTRCO3dDQUN0RCxPQUFPLEVBQUUsSUFBSTt3Q0FDYixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7NENBQ2IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO3dDQUNoQixDQUFDO3FDQUNKLENBQUM7aUNBQ0w7NkJBQ0o7eUJBQ0osQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUVyQixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO3lCQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUU1QixVQUFVO3lCQUNMLGVBQWUsQ0FBQzt3QkFDYixFQUFFLEVBQUUsZ0JBQWdCO3dCQUNwQixlQUFlLEVBQUUsS0FBSzt3QkFDdEIsSUFBSSxFQUFFLGVBQWU7d0JBQ3JCLE1BQU0sRUFBRSxZQUFZO3dCQUNwQixRQUFRLEVBQUUsSUFBSTtxQkFDakIsQ0FBQyxDQUFDO2dCQUNYLENBQUM7YUFFSixDQUFBO1lBeEVZLGFBQWE7Z0JBRHpCLFFBQVE7ZUFDSSxhQUFhLENBd0V6QjtZQXhFWSx5QkFBYSxnQkF3RXpCLENBQUE7UUFDTCxDQUFDLEVBcEZvQixXQUFXLEdBQVgsZUFBVyxLQUFYLGVBQVcsUUFvRi9CO0lBQUQsQ0FBQyxFQXBGZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBb0ZuQjtBQUFELENBQUMsRUFwRlMsTUFBTSxLQUFOLE1BQU0sUUFvRmY7QUNwRkQsSUFBVSxNQUFNLENBb1pmO0FBcFpELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW9abkI7SUFwWmdCLFdBQUEsR0FBRztRQUFDLElBQUEsV0FBVyxDQW9aL0I7UUFwWm9CLFdBQUEsV0FBVztZQUU1QixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBRWhDOzs7OztlQUtHO1lBRUgsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxPQUFBLFlBQVk7Z0JBV3RDLGNBQWM7b0JBRWpCLHdCQUF3QjtvQkFDeEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEtBQUssR0FBRyxFQUFFLENBQUM7d0JBQ3ZFLElBQUksQ0FBQyxTQUFTLENBQUM7NEJBQ1gsS0FBSyxFQUFFLE1BQU07NEJBQ2IsRUFBRSxFQUFFLGNBQWM7NEJBQ2xCLE9BQU8sRUFBRSxlQUFlLENBQUMsMkZBQTJGO3lCQUN2SCxDQUFDLENBQUM7b0JBQ1AsQ0FBQztvQkFFRCxvQkFBb0I7b0JBQ3BCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsRUFBRSxDQUFDO3dCQUNwRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3pCLENBQUM7b0JBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUM1QixDQUFDO2dCQUVPLFVBQVU7b0JBRWQsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSx3REFBd0QsRUFBRSxDQUFDLENBQUM7b0JBRTVJLElBQUk7eUJBQ0MsVUFBVSxDQUFDLEVBQUUsQ0FBQzt5QkFDZCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsd0JBQXdCO3lCQUNoRCxRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUNwQixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsUUFBUSxFQUFFLElBQUk7cUJBQ2pCLENBQUM7eUJBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLG9DQUFvQzt5QkFDNUQsUUFBUSxDQUFDLFVBQVUsRUFBRTt3QkFDbEIsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLFNBQVMsRUFBRSxVQUFVO3dCQUNyQixRQUFRLEVBQUUsSUFBSTtxQkFDakIsQ0FBQzt5QkFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMseUJBQXlCO3lCQUNqRCxRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUNwQixJQUFJLEVBQUUsaUJBQWlCO3dCQUN2QixRQUFRLEVBQUUsSUFBSTtxQkFDakIsQ0FBQzt5QkFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsMEJBQTBCO3lCQUNsRCxRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUNwQixJQUFJLEVBQUUsWUFBWTt3QkFDbEIsUUFBUSxFQUFFLElBQUk7cUJBQ2pCLENBQUM7eUJBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLHdCQUF3Qjt5QkFDaEQsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLFFBQVEsRUFBRSxJQUFJO3FCQUNqQixDQUFDLENBQUE7b0JBRU4sSUFBSTt5QkFDQyxVQUFVLENBQUMsRUFBRSxDQUFDO3lCQUNkLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxxQkFBcUI7eUJBQzdDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxPQUFPO3dCQUNiLFFBQVEsRUFBRSxJQUFJO3FCQUNqQixDQUFDO3lCQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxtQkFBbUI7eUJBQzNDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxLQUFLO3dCQUNYLFFBQVEsRUFBRSxJQUFJO3FCQUNqQixDQUFDO3lCQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQywwQkFBMEI7eUJBQ2xELFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxvQkFBb0I7d0JBQzFCLFFBQVEsRUFBRSxJQUFJO3FCQUNqQixDQUFDO3lCQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyw2QkFBNkI7eUJBQ3JELFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxnQkFBZ0I7d0JBQ3RCLFFBQVEsRUFBRSxJQUFJO3FCQUNqQixDQUFDLENBQUE7b0JBR04sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUV4QyxDQUFDO2dCQUVPLGFBQWE7b0JBQ2pCLElBQUksTUFBTSxHQUFpQixFQUFFLENBQUM7b0JBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ1IsT0FBTyxFQUFFLElBQUk7d0JBQ2IsUUFBUSxFQUFFLElBQUk7d0JBQ2QsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDOzRCQUNqQyxJQUFJLEVBQUUsbUJBQW1COzRCQUN6QixPQUFPLEVBQUUsZUFBZSxFQUFFLDZDQUE2Qzs0QkFDdkUsSUFBSSxFQUFFLEVBQUU7NEJBQ1IsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFLENBQUM7b0NBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsa0NBQWtDLENBQUMsQ0FBQztnQ0FDckUsQ0FBQztnQ0FDRCxJQUFJLENBQUMsUUFBUTtxQ0FDUixJQUFJLENBQUMsbUJBQW1CLEVBQUU7b0NBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQ0FDbkIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2lDQUN4QixDQUFDO3FDQUNELElBQUksQ0FBQyxDQUFDLElBQVksRUFBRSxFQUFFO29DQUNuQixLQUFLO29DQUNMLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFLENBQUM7d0NBQzdCLElBQUksWUFBQSxTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29DQUM3QyxDQUFDO2dDQUNMLENBQUMsQ0FBQyxDQUFBOzRCQUNWLENBQUM7eUJBQ0osQ0FBQyxDQUFDO3FCQUNOLENBQUMsQ0FBQTtvQkFDRixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN6QixDQUFDO2dCQUVPLGdCQUFnQjtvQkFDcEIsSUFBSSxNQUFNLEdBQWlCLEVBQUUsQ0FBQztvQkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQzt3QkFDUixRQUFRLEVBQUUsSUFBSTt3QkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUM7NEJBQ2pDLElBQUksRUFBRSxVQUFVOzRCQUNoQixPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjs0QkFDaEQsSUFBSSxFQUFFLGlCQUFpQjs0QkFDdkIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQ3BCLENBQUM7eUJBQ0osQ0FBQyxDQUFDO3FCQUNOLENBQUMsQ0FBQTtvQkFDRixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QixDQUFDO2dCQUVPLFNBQVM7b0JBQ2IsSUFBSSxHQUFHLEdBQVEsRUFBRSxDQUFDO29CQUNsQixHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLDZCQUE2QjtvQkFDN0QsT0FBTyxHQUFHLENBQUM7Z0JBQ2YsQ0FBQztnQkFFTyx1QkFBdUIsQ0FBQyxPQUEyQjtvQkFDdkQsa0NBQWtDO29CQUNsQyxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7b0JBQ3BCLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7d0JBQ2xELElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUs7NEJBQ25DLFNBQVM7d0JBQ2IsNkRBQTZEO3dCQUM3RCxVQUFVLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO3dCQUN6RCxVQUFVLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDdEMsQ0FBQztvQkFDRCxPQUFPLFVBQVUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFTyxVQUFVO29CQUVkLElBQUksS0FBSyxHQUFHO3dCQUNSLEdBQUcsRUFBRSxRQUFRO3dCQUNiLFVBQVUsRUFBRSxLQUFLO3FCQUNwQixDQUFBO29CQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQzVELEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUM5QixPQUFPLEVBQUUsQ0FBQztvQkFDZCxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFFWCxzQkFBc0I7b0JBRXRCLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQXVDLENBQUM7b0JBRWpGLE1BQU07d0JBQ0Ysb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLHNEQUFzRDt3QkFDdEQsZ0JBQWdCO3dCQUNoQixJQUFJO3lCQUNILGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsY0FBYzt3QkFDcEIsT0FBTyxFQUFFLGVBQWUsRUFBRSx3QkFBd0I7d0JBQ2xELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxnQkFBZ0I7d0JBQ3RCLE9BQU8sRUFBRSxlQUFlLEVBQUUsMEJBQTBCO3dCQUNwRCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsV0FBVzt3QkFDakIsT0FBTyxFQUFFLGVBQWUsRUFBRSxpQ0FBaUM7d0JBQzNELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxPQUFPO3dCQUNiLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0NBQWtDO3dCQUM1RCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsV0FBVzt3QkFDakIsT0FBTyxFQUFFLGVBQWUsRUFBRSw0QkFBNEI7d0JBQ3RELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxPQUFPO3dCQUNiLE9BQU8sRUFBRSxlQUFlLEVBQUUscUJBQXFCO3dCQUMvQyxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDLENBQUE7b0JBRU4sTUFBTTt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsdUNBQXVDO3dCQUNqRSxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGVBQWUsQ0FBQzt3QkFDYixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQ0FBbUM7d0JBQzdELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxVQUFVO3dCQUNoQixPQUFPLEVBQUUsZUFBZSxFQUFFLDZCQUE2Qjt3QkFDdkQsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLE9BQU87d0JBQ2IsT0FBTyxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7d0JBQ3JELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7d0JBQ0Ysb0JBQW9CO3dCQUNwQiw0QkFBNEI7d0JBQzVCLGlFQUFpRTt3QkFDakUsaUJBQWlCO3dCQUNqQixJQUFJO3dCQUNKLGtCQUFrQjt3QkFDbEIsb0JBQW9CO3dCQUNwQiwyREFBMkQ7d0JBQzNELGlCQUFpQjt3QkFDakIsSUFBSTt5QkFDSCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLE9BQU8sRUFBRSxlQUFlLEVBQUUsMEJBQTBCO3dCQUNwRCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsZUFBZSxFQUFFLHVCQUF1Qjt3QkFDakQsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSx3QkFBd0I7d0JBQ2xELEtBQUssRUFBRSxFQUFFO3FCQUNaLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxXQUFXO3dCQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFFLDBCQUEwQjt3QkFDcEQsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsT0FBTyxFQUFFLGVBQWUsRUFBRSx5QkFBeUI7d0JBQ25ELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxLQUFLO3dCQUNYLE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0NBQWdDO3dCQUMxRCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsT0FBTyxFQUFFLGVBQWUsRUFBRSwrQkFBK0I7d0JBQ3pELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxhQUFhO3dCQUNuQixPQUFPLEVBQUUsZUFBZSxFQUFFLGtDQUFrQzt3QkFDNUQsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSx3Q0FBd0M7d0JBQ2xFLEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0NBQXNDO3dCQUNoRSxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsZUFBZSxFQUFFLDJDQUEyQzt3QkFDckUsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxlQUFlLENBQUM7d0JBQ2IsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSx3Q0FBd0M7d0JBQ2xFLEtBQUssRUFBRSxHQUFHO3dCQUNWLE9BQU8sRUFBRSxLQUFLO3FCQUNqQixDQUFDO3lCQUNELGVBQWUsQ0FBQzt3QkFDYixJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsU0FBUzt3QkFDbEIsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsT0FBTyxFQUFFLEtBQUs7cUJBQ2pCLENBQUM7eUJBQ0QsZUFBZSxDQUFDO3dCQUNiLElBQUksRUFBRSxVQUFVO3dCQUNoQixPQUFPLEVBQUUsVUFBVTt3QkFDbkIsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsT0FBTyxFQUFFLEtBQUs7cUJBQ2pCLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxTQUFTO3dCQUNsQixLQUFLLEVBQUUsR0FBRzt3QkFDVixPQUFPLEVBQUUsS0FBSztxQkFDakIsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLE9BQU8sRUFBRSxVQUFVO3dCQUNuQixLQUFLLEVBQUUsR0FBRzt3QkFDVixPQUFPLEVBQUUsS0FBSztxQkFDakIsQ0FBQzt5QkFDRCxlQUFlLENBQUM7d0JBQ2IsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0NBQWdDO3dCQUMxRCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsT0FBTyxFQUFFLGVBQWUsRUFBRSx3QkFBd0I7d0JBQ2xELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLE9BQU8sRUFBRSxlQUFlLEVBQUUsK0JBQStCO3dCQUN6RCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGVBQWUsQ0FBQzt3QkFDYixJQUFJLEVBQUUsYUFBYTt3QkFDbkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxzQ0FBc0M7d0JBQ2hFLEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSxpQ0FBaUM7d0JBQzNELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsZUFBZSxDQUFDO3dCQUNiLElBQUksRUFBRSxVQUFVO3dCQUNoQixPQUFPLEVBQUUsZUFBZSxFQUFFLCtCQUErQjt3QkFDekQsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQyxDQUFDO29CQUVQLFlBQVk7b0JBRVosMkJBQTJCO29CQUMzQixJQUFJLGFBQWEsR0FBRyxFQUFjLENBQUM7b0JBQ25DLElBQUksWUFBQSxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUdyRSxJQUFJLGNBQWMsR0FBeUQ7d0JBQ3ZFLElBQUksRUFBRSxlQUFlLEVBQUUsOEJBQThCO3dCQUNyRCxPQUFPLEVBQUUsSUFBSTt3QkFDYixVQUFVLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7cUJBQzNELENBQUM7b0JBR0YsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQ1osY0FBYyxFQUFFLGNBQWM7d0JBQzlCLFNBQVMsRUFBRSxJQUFJO3dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTt3QkFDZixJQUFJLEVBQUUsaUJBQWlCO3dCQUN2QixVQUFVLEVBQUUsTUFBTTt3QkFDbEIsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLGNBQWMsRUFBRSxLQUFLO3dCQUNyQixPQUFPLEVBQUUsTUFBTTt3QkFDZixJQUFJLEVBQUUsUUFBUTt3QkFDZCxLQUFLLEVBQUUsS0FBSzt3QkFDWixhQUFhLEVBQUUsYUFBYTtxQkFDL0IsQ0FBQyxDQUFDO2dCQUVQLENBQUM7YUFFSixDQUFBO1lBdllZLGVBQWU7Z0JBRDNCLFFBQVE7ZUFDSSxlQUFlLENBdVkzQjtZQXZZWSwyQkFBZSxrQkF1WTNCLENBQUE7UUFFTCxDQUFDLEVBcFpvQixXQUFXLEdBQVgsZUFBVyxLQUFYLGVBQVcsUUFvWi9CO0lBQUQsQ0FBQyxFQXBaZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBb1puQjtBQUFELENBQUMsRUFwWlMsTUFBTSxLQUFOLE1BQU0sUUFvWmY7QUNwWkQsSUFBVSxNQUFNLENBa1hmO0FBbFhELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtYbkI7SUFsWGdCLFdBQUEsR0FBRztRQUFDLElBQUEsV0FBVyxDQWtYL0I7UUFsWG9CLFdBQUEsV0FBVztZQUU1QixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBRWhDOzs7OztlQUtHO1lBRUgsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxPQUFBLFlBQVk7Z0JBT3RDLGNBQWM7b0JBQ2pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQzVCLENBQUM7Z0JBRU8sZ0JBQWdCO29CQUNwQixJQUFJLE1BQU0sR0FBaUIsRUFBRSxDQUFDO29CQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNSLFFBQVEsRUFBRSxJQUFJO3dCQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQzs0QkFDakMsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCOzRCQUNoRCxJQUFJLEVBQUUsaUJBQWlCOzRCQUN2QixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDcEIsQ0FBQzt5QkFDSixDQUFDLENBQUM7cUJBQ04sQ0FBQyxDQUFBO29CQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVCLENBQUM7Z0JBRU8sYUFBYTtvQkFDakIsSUFBSSxNQUFNLEdBQWlCLEVBQUUsQ0FBQztvQkFFOUIsTUFBTSxDQUFDLElBQUksQ0FBQzt3QkFDUixRQUFRLEVBQUUsSUFBSTt3QkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUM7NEJBQ2pDLE9BQU8sRUFBRSxLQUFLOzRCQUNkLElBQUksRUFBRSxnQkFBZ0I7NEJBQ3RCLE9BQU8sRUFBRSxlQUFlLEVBQUUsNEJBQTRCOzRCQUN0RCxJQUFJLEVBQUUsRUFBRTs0QkFDUixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJO29DQUNqQixPQUFPO2dDQUNYLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dDQUNoRCxJQUFJLFNBQVMsSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztvQ0FDN0MsT0FBTyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO29DQUMxQyxPQUFPO2dDQUNYLENBQUM7Z0NBQ0QsTUFBTSxHQUFHLEdBQXdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDOUQsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFLENBQUM7b0NBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztvQ0FDNUMsT0FBTztnQ0FDWCxDQUFDO2dDQUNELElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO29DQUNyQyxPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7b0NBQzNDLE9BQU87Z0NBQ1gsQ0FBQztnQ0FFRCxHQUFHLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBUSxFQUFFLENBQUMsQ0FBQzs0QkFDN0YsQ0FBQzt5QkFDSixDQUFDLENBQUM7cUJBQ04sQ0FBQyxDQUFBO29CQUVGLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRU8saUJBQWlCO29CQUVyQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUVoRCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTt3QkFDL0MsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFLENBQUM7NEJBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7NEJBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDOzRCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUM1QixDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUVILElBQUksQ0FBQyxNQUFNO3lCQUNOLFlBQVksQ0FBQzt3QkFDVixTQUFTLEVBQUUsS0FBSzt3QkFDaEIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO3dCQUMvQixLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzt3QkFDaEMsd0JBQXdCLEVBQUUsS0FBSztxQkFDbEMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7Z0JBRU8sZ0JBQWdCO29CQUVwQixNQUFNLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO3dCQUNyQyxJQUFJLEVBQUUsZ0JBQWdCO3dCQUN0QixRQUFRLEVBQUUsT0FBTzt3QkFDakIsZ0JBQWdCLEVBQUUsd0RBQXdEO3FCQUM3RSxDQUFDLENBQUM7b0JBRUgsVUFBVTt5QkFDTCxVQUFVLEVBQUUsQ0FBQTtvQkFFakIsVUFBVTt5QkFDTCxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLDhCQUE4Qjt5QkFDakYsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDckQsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUM5QyxJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUUsNkJBQTZCO3dCQUNwQyxhQUFhLEVBQUU7NEJBQ1gsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDOzRCQUNmLFFBQVEsRUFBRSxDQUFDOzRCQUNYLFNBQVMsRUFBRSxRQUFRO3lCQUN0QjtxQkFDSixDQUFDLENBQUE7b0JBRU4sVUFBVTt5QkFDTCxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLHlCQUF5Qjt5QkFDNUUsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUU5QyxJQUFJLEVBQUUsYUFBYTt3QkFDbkIsUUFBUSxFQUFFLElBQUk7d0JBQ2QsV0FBVyxFQUFFLEdBQUc7d0JBQ2hCLElBQUksRUFBRTs7Ozs0QkFJRiwyQ0FBMkM7eUJBQzlDO3dCQUNELFlBQVksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFOzRCQUVuQixJQUFJLElBQUksb0RBQTJDLEVBQUUsQ0FBQztnQ0FDbEQsT0FBTyxlQUFlLENBQUMsQ0FBQyxzQkFBc0I7NEJBQ2xELENBQUM7aUNBQ0ksSUFBSSxJQUFJLG9EQUEyQyxFQUFFLENBQUM7Z0NBQ3ZELE9BQU8sZUFBZSxDQUFDLENBQUMsc0JBQXNCOzRCQUNsRCxDQUFDO2lDQUNJLElBQUksSUFBSSxtREFBMkMsRUFBRSxDQUFDO2dDQUN2RCxPQUFPLGVBQWUsQ0FBQyxDQUFDLHNCQUFzQjs0QkFDbEQsQ0FBQztpQ0FDSSxJQUFJLElBQUksdURBQThDLEVBQUUsQ0FBQztnQ0FDMUQsT0FBTyxlQUFlLENBQUMsQ0FBQyx5QkFBeUI7NEJBQ3JELENBQUM7aUNBQ0ksQ0FBQztnQ0FDRixPQUFPLEVBQUUsQ0FBQzs0QkFDZCxDQUFDO3dCQUNMLENBQUM7cUJBQ0osQ0FBQyxDQUFBO29CQUVOLFVBQVU7eUJBQ0wsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQywwQkFBMEI7eUJBQzlFLFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxnQkFBZ0I7d0JBQ3RCLFFBQVEsRUFBRSxJQUFJO3dCQUNkLFdBQVcsRUFBRSxHQUFHO3dCQUNoQixJQUFJLEVBQUU7Ozs7Ozs7O3lCQVFMO3dCQUNELFlBQVksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFOzRCQUVuQixJQUFJLElBQUksNERBQW9ELEVBQUUsQ0FBQztnQ0FDM0QsT0FBTyxlQUFlLENBQUMsQ0FBQyw0QkFBNEI7NEJBQ3hELENBQUM7aUNBQ0ksSUFBSSxJQUFJLDJEQUFrRCxFQUFFLENBQUM7Z0NBQzlELE9BQU8sZUFBZSxDQUFDLENBQUMsMEJBQTBCOzRCQUN0RCxDQUFDO2lDQUNJLElBQUksSUFBSSx5REFBZ0QsRUFBRSxDQUFDO2dDQUM1RCxPQUFPLGVBQWUsQ0FBQyxDQUFDLHdCQUF3Qjs0QkFDcEQsQ0FBQztpQ0FDSSxJQUFJLElBQUksZ0VBQXVELEVBQUUsQ0FBQztnQ0FDbkUsT0FBTyxlQUFlLENBQUMsQ0FBQyxnQ0FBZ0M7NEJBQzVELENBQUM7aUNBQ0ksSUFBSSxJQUFJLGtFQUF5RCxFQUFFLENBQUM7Z0NBQ3JFLE9BQU8sZUFBZSxDQUFDLENBQUMsa0NBQWtDOzRCQUM5RCxDQUFDO2lDQUNJLElBQUksSUFBSSxpRUFBd0QsRUFBRSxDQUFDO2dDQUNwRSxPQUFPLGVBQWUsQ0FBQyxDQUFDLDZDQUE2Qzs0QkFDekUsQ0FBQztpQ0FDSSxJQUFJLElBQUksMkRBQWtELEVBQUUsQ0FBQztnQ0FDOUQsT0FBTyxlQUFlLENBQUMsQ0FBQywwQkFBMEI7NEJBQ3RELENBQUM7aUNBQ0ksQ0FBQztnQ0FDRixPQUFPLEVBQUUsQ0FBQzs0QkFDZCxDQUFDO3dCQUNMLENBQUM7cUJBQ0osQ0FBQyxDQUFBO29CQUVOLFVBQVU7eUJBQ0wsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQywyQkFBMkI7eUJBQy9FLFFBQVEsQ0FBQyxlQUFlLEVBQUU7d0JBQ3ZCLGlEQUFpRDt3QkFDakQsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLEtBQUssRUFBRSw0QkFBNEI7d0JBQ25DLFdBQVcsRUFBRTs0QkFDVCxTQUFTLEVBQUUsRUFBRTt5QkFDaEI7d0JBQ0QsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO3dCQUMvQixtQkFBbUIsRUFBRSxLQUFLO3dCQUMxQixZQUFZLEVBQUUsS0FBSztxQkFDdEIsQ0FBQyxDQUFDO29CQUVQLE9BQU8sVUFBVSxDQUFDO2dCQUN0QixDQUFDO2dCQUVPLFNBQVM7b0JBQ2IsSUFBSSxHQUFHLEdBQVEsRUFBRSxDQUFDO29CQUNsQixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQzFCLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQ2xELE9BQU8sR0FBRyxDQUFDO29CQUNmLENBQUM7Z0JBQ0wsQ0FBQztnQkFFTyxVQUFVO29CQUVkLElBQUksS0FBSyxHQUFHO3dCQUNSLEdBQUcsRUFBRSxVQUFVO3dCQUNmLFVBQVUsRUFBRSxJQUFJO3FCQUNuQixDQUFBO29CQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQzVELEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUM5QixPQUFPLEVBQUUsQ0FBQztvQkFDZCxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFFWCxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUF1QyxDQUFDO29CQUVqRixNQUFNO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsV0FBVzt3QkFDakIsT0FBTyxFQUFFLGVBQWUsRUFBRSw4QkFBOEI7d0JBQ3hELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsZUFBZSxDQUFDO3dCQUNiLElBQUksRUFBRSxVQUFVO3dCQUNoQixPQUFPLEVBQUUsZUFBZSxFQUFFLHdCQUF3Qjt3QkFDbEQsS0FBSyxFQUFFLEVBQUU7cUJBQ1osQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLE9BQU87d0JBQ2IsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQkFBcUI7d0JBQy9DLEtBQUssRUFBRSxFQUFFO3FCQUNaLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxLQUFLO3dCQUNYLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CO3dCQUM3QyxLQUFLLEVBQUUsRUFBRTtxQkFDWixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsV0FBVzt3QkFDakIsT0FBTyxFQUFFLGVBQWUsRUFBRSwwQkFBMEI7d0JBQ3BELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxpQkFBaUI7d0JBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUseUJBQXlCO3dCQUNuRCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsWUFBWTt3QkFDbEIsT0FBTyxFQUFFLGVBQWUsRUFBRSwwQkFBMEI7d0JBQ3BELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxVQUFVO3dCQUNoQixPQUFPLEVBQUUsZUFBZSxFQUFFLHdCQUF3Qjt3QkFDbEQsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLGlCQUFpQjt3QkFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSwrQkFBK0I7d0JBQ3pELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxvQkFBb0I7d0JBQzFCLE9BQU8sRUFBRSxlQUFlLEVBQUUsMEJBQTBCO3dCQUNwRCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGVBQWUsQ0FBQzt3QkFDYixJQUFJLEVBQUUsZUFBZTt3QkFDckIsT0FBTyxFQUFFLGVBQWUsRUFBRSx1Q0FBdUM7d0JBQ2pFLEtBQUssRUFBRSxFQUFFO3FCQUNaLENBQUM7eUJBQ0QsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSw4QkFBOEI7d0JBQ3hELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSw2QkFBNkI7d0JBQ3ZELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLE9BQU8sRUFBRSxlQUFlLEVBQUUsK0JBQStCO3dCQUN6RCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGlCQUFpQixDQUFDO3dCQUNmLElBQUksRUFBRSxXQUFXO3dCQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFFLDJCQUEyQjt3QkFDckQsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLGdCQUFnQjt3QkFDdEIsT0FBTyxFQUFFLGVBQWUsRUFBRSw2QkFBNkI7d0JBQ3ZELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUMsQ0FBQTtvQkFFTiwyQkFBMkI7b0JBQzNCLElBQUksYUFBYSxHQUFHLEVBQWMsQ0FBQztvQkFDbkMsSUFBSSxZQUFBLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRXJFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUNaLGFBQWEsRUFBRSxJQUFJLE9BQU8sQ0FBQzs0QkFDdkIsSUFBSSxFQUFFLG9CQUFvQjs0QkFDMUIsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNiLE1BQU0sR0FBRyxHQUF3QyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQ0FDbkUsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFLENBQUM7b0NBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztvQ0FDNUMsT0FBTztnQ0FDWCxDQUFDO2dDQUNELElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO29DQUNyQyxPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7b0NBQzNDLE9BQU87Z0NBQ1gsQ0FBQztnQ0FDRCxHQUFHLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxFQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBUSxFQUFFLENBQUMsQ0FBQzs0QkFDNUYsQ0FBQzt5QkFDSixDQUFDO3dCQUNGLFNBQVMsRUFBRSxJQUFJO3dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTt3QkFDZixJQUFJLEVBQUUsaUJBQWlCO3dCQUN2QixVQUFVLEVBQUUsTUFBTTt3QkFDbEIsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLGNBQWMsRUFBRSxLQUFLO3dCQUNyQixPQUFPLEVBQUUsTUFBTTt3QkFDZixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsS0FBSyxFQUFFLEtBQUs7d0JBQ1osYUFBYSxFQUFFLGFBQWE7d0JBQzVCLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDbkIsZ0NBQWdDOzRCQUNoQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFLENBQUM7Z0NBQ3ZCLE9BQU87NEJBQ1gsQ0FBQzs0QkFDRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDaEQsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQztnQ0FDM0MsT0FBTzs0QkFDWCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxJQUFJLElBQUksRUFBRSxDQUFDO2dDQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzlDLENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFDLENBQUM7Z0JBRVAsQ0FBQzthQUVKLENBQUE7WUFyV1ksZUFBZTtnQkFEM0IsUUFBUTtlQUNJLGVBQWUsQ0FxVzNCO1lBcldZLDJCQUFlLGtCQXFXM0IsQ0FBQTtRQUVMLENBQUMsRUFsWG9CLFdBQVcsR0FBWCxlQUFXLEtBQVgsZUFBVyxRQWtYL0I7SUFBRCxDQUFDLEVBbFhnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFrWG5CO0FBQUQsQ0FBQyxFQWxYUyxNQUFNLEtBQU4sTUFBTSxRQWtYZjtBQ2xYRCxJQUFVLE1BQU0sQ0ErYWY7QUEvYUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBK2FuQjtJQS9hZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxXQUFXLENBK2EvQjtRQS9hb0IsV0FBQSxXQUFXO1lBRTVCLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFFaEM7Ozs7O2VBS0c7WUFFSCxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFXLFNBQVEsT0FBQSxZQUFZO2dCQVVqQyxjQUFjO29CQUNqQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxZQUFBLFNBQVMsRUFBRSxDQUFDO29CQUNqQyxDQUFDO29CQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFFTyxnQkFBZ0I7b0JBQ3BCLElBQUksTUFBTSxHQUFpQixFQUFFLENBQUM7b0JBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ1IsUUFBUSxFQUFFLElBQUk7d0JBQ2QsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDOzRCQUNqQyxJQUFJLEVBQUUsVUFBVTs0QkFDaEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7NEJBQ2hELElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUNwQixDQUFDO3lCQUNKLENBQUMsQ0FBQztxQkFDTixDQUFDLENBQUE7b0JBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDNUIsQ0FBQztnQkFFTyxVQUFVO29CQUVkLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlDLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsd0RBQXdELEVBQUUsQ0FBQyxDQUFDO29CQUU1SSxJQUFJO3lCQUNDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBRSxpQ0FBaUM7eUJBQzlELE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsOEJBQThCO3lCQUNqRixRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO3dCQUNyRCxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQzlDLElBQUksRUFBRSxRQUFRO3dCQUNkLEtBQUssRUFBRSw0QkFBNEI7d0JBQ25DLGFBQWEsRUFBRTs0QkFDWCxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUM7NEJBQ2YsUUFBUSxFQUFFLENBQUM7NEJBQ1gsU0FBUyxFQUFFLFFBQVE7eUJBQ3RCO3FCQUNKLENBQUMsQ0FBQTtvQkFFTixJQUFJO3lCQUNDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsNkJBQTZCO3lCQUNoRixRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDM0QsSUFBSSxFQUFFLGNBQWM7d0JBQ3BCLFVBQVUsRUFBRTs0QkFDUixJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFOzRCQUNoQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLHNGQUFzRjt5QkFDdEs7d0JBQ0QsSUFBSSxFQUFFLENBQUM7cUJBQ1YsQ0FBQyxDQUFBO29CQUVOLElBQUk7eUJBQ0MsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLHdCQUF3Qjt5QkFDaEQsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQzNELElBQUksRUFBRSxVQUFVO3dCQUNoQixVQUFVLEVBQUU7NEJBQ1IsbUNBQW1DOzRCQUNuQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLGdGQUFnRjt5QkFDaEs7d0JBQ0QsSUFBSSxFQUFDLENBQUM7cUJBQ1QsQ0FBQyxDQUFBO29CQUVOLElBQUk7eUJBQ0MsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLCtCQUErQjt5QkFDM0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLHNDQUFzQzt5QkFDOUQsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQzNELElBQUksRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxnRUFBZ0U7d0JBQ2hILFVBQVUsRUFBRTs0QkFDUixJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLHVFQUF1RTt5QkFDdko7cUJBQ0osQ0FBQyxDQUFBO29CQUVOLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFeEMsQ0FBQztnQkFFTyxhQUFhO29CQUVqQixJQUFJLE1BQU0sR0FBaUIsRUFBRSxDQUFDO29CQUU5QixJQUFJLEtBQUssR0FBZTt3QkFDcEIsUUFBUSxFQUFFLElBQUk7d0JBQ2QsZ0JBQWdCO3dCQUNoQixNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUM7NEJBQ2hCLE9BQU8sRUFBRSxlQUFlLEVBQUUsOEJBQThCOzRCQUN4RCxJQUFJLEVBQUUsY0FBYyxFQUFFLDhCQUE4Qjs0QkFDcEQsSUFBSSxFQUFFLEVBQUU7NEJBQ1IsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0NBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7cUNBQzlCLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFTLEVBQUUsRUFBRTtvQ0FDekIsZ0NBQWdDO29DQUNoQyxJQUFJLE9BQU8sS0FBSyxJQUFJO3dDQUNoQixPQUFPO29DQUNYLElBQUksU0FBUyxHQUE0QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztvQ0FDekYsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7d0NBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxDQUFDLDZEQUE2RDt3Q0FDekosT0FBTztvQ0FDWCxDQUFDO29DQUNELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0NBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBRSxTQUFTO29DQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUM5QixDQUFDLENBQUMsQ0FBQTs0QkFDVixDQUFDO3lCQUNKLENBQUM7cUJBQ0wsQ0FBQTtvQkFFRCxJQUFJLE1BQU0sR0FBZTt3QkFDckIsUUFBUSxFQUFFLElBQUk7d0JBQ2QsT0FBTyxFQUFFLElBQUk7d0JBQ2IsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDOzRCQUNoQixPQUFPLEVBQUUsZUFBZSxFQUFFLDhCQUE4Qjs0QkFDeEQsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLElBQUksRUFBRSxFQUFFOzRCQUNSLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dDQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3FDQUM5QixJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBUyxFQUFFLEVBQUU7b0NBQ3pCLGdDQUFnQztvQ0FDaEMsSUFBSSxPQUFPLEtBQUssSUFBSTt3Q0FDaEIsT0FBTztvQ0FDWCxJQUFJLFNBQVMsR0FBNEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7b0NBQ3pGLElBQUksU0FBUyxJQUFJLElBQUksSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO3dDQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxzQkFBc0IsRUFBRSxDQUFDLENBQUMsQ0FBQyw2REFBNkQ7d0NBQ3pKLE9BQU87b0NBQ1gsQ0FBQztvQ0FDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29DQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUUsU0FBUztvQ0FDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDOUIsQ0FBQyxDQUFDLENBQUE7NEJBQ1YsQ0FBQzt5QkFDSixDQUFDO3FCQUNMLENBQUE7b0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxTQUFTLEdBQWU7d0JBQ3hCLElBQUksRUFBRSxXQUFXO3FCQUNwQixDQUFDO29CQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRW5CLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pCLENBQUM7Z0JBR08sY0FBYyxDQUFDLElBQUk7b0JBRXZCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDO29CQUM5QixNQUFNLE9BQU8sR0FBRyx1Q0FBdUMsQ0FBQztvQkFFeEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFFN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZO3lCQUNwQixjQUFjLEVBQUU7eUJBQ2hCLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBRVAsSUFBSSxDQUFDLGNBQWMsQ0FBQzs0QkFDaEIsRUFBRSxFQUFFLFVBQVU7NEJBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtnQ0FDcEUsZUFBZSxFQUFFLDhCQUE4Qjt5QkFDdEQsQ0FBQyxDQUFDO3dCQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7NkJBQzNGLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOzRCQUNYLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxFQUFFLE9BQU8sRUFBRTtnQ0FDekQsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQzFCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUUsQ0FBQztvQ0FDdEIsSUFBSSxNQUFNLEdBQTZDLElBQUksQ0FBQyxNQUFNLENBQUM7b0NBQ25FLElBQUksTUFBTSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQzt3Q0FDMUIsS0FBSzt3Q0FDTCxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUM7NENBQzNDLElBQUksWUFBQSxTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzt3Q0FDcEQsQ0FBQztvQ0FDTCxDQUFDO3lDQUNJLENBQUM7d0NBQ0YsT0FBTzt3Q0FDUCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTs0Q0FDckIsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLFlBQVksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLG9EQUFvRDt5Q0FDbk0sQ0FBQyxDQUFDO29DQUNQLENBQUM7b0NBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQ0FDOUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dDQUNqQixDQUFDOzRCQUNMLENBQUMsQ0FBQyxDQUFDO3dCQUNQLENBQUMsQ0FBQyxDQUFBO29CQUVWLENBQUMsQ0FBQyxDQUFDO2dCQUVYLENBQUM7Z0JBR08sU0FBUztvQkFDYixJQUFJLEdBQUcsR0FBUSxFQUFFLENBQUM7b0JBQ2xCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDMUIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDOzRCQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUNqRSxDQUFDO3dCQUNELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQzs0QkFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDckUsQ0FBQzt3QkFDRCxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUNsRCxPQUFPLEdBQUcsQ0FBQztvQkFDZixDQUFDO2dCQUNMLENBQUM7Z0JBRU8sVUFBVTtvQkFFZCxJQUFJLEtBQUssR0FBRzt3QkFDUixHQUFHLEVBQUUsS0FBSzt3QkFDVixVQUFVLEVBQUUsSUFBSTtxQkFDbkIsQ0FBQztvQkFFRixrQkFBa0I7b0JBQ2xCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQzVDLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUM7d0JBQzVCLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUM5QixDQUFDO29CQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQ3hELEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUM5QixPQUFPLEVBQUUsQ0FBQztvQkFDZCxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFFWCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDNUIsdUJBQXVCO3dCQUN2QixrREFBa0Q7d0JBQ2xELDZGQUE2Rjt3QkFDN0YsMENBQTBDO3dCQUMxQyxHQUFHO29CQUNQLENBQUMsQ0FBQyxDQUFDO29CQUVILE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQTBDLENBQUM7b0JBRXBGLE1BQU07eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxLQUFLO3dCQUNYLE9BQU8sRUFBRSxlQUFlLEVBQUUsNkJBQTZCO3dCQUN2RCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxvQkFBb0I7d0JBQzlDLEtBQUssRUFBRSxHQUFHO3dCQUNWLFlBQVksRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDeEIsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUk7Z0NBQzVELE9BQU8sRUFBRSxDQUFDO2lDQUNULENBQUM7Z0NBQ0YsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQWtCLEVBQUUsQ0FBQztvQ0FDbEMsS0FBSyxDQUFDO3dDQUNGLE9BQU8sZUFBZSxDQUFDLENBQUMsd0JBQXdCO29DQUNwRCxLQUFLLENBQUM7d0NBQ0YsT0FBTyxlQUFlLENBQUMsQ0FBQyxvQkFBb0I7b0NBQ2hELEtBQUssQ0FBQzt3Q0FDRixPQUFPLGVBQWUsQ0FBQyxDQUFDLDJCQUEyQjtvQ0FDdkQsS0FBSyxDQUFDO3dDQUNGLE9BQU8sZUFBZSxDQUFDLENBQUMsK0JBQStCO29DQUMzRCxLQUFLLENBQUM7d0NBQ0YsT0FBTyxlQUFlLENBQUMsQ0FBQyxtQkFBbUI7b0NBQy9DLEtBQUssQ0FBQzt3Q0FDRixPQUFPLGVBQWUsQ0FBQyxDQUFDLHVCQUF1QjtvQ0FDbkQ7d0NBQ0ksT0FBTyxFQUFFLENBQUM7Z0NBQ2xCLENBQUM7NEJBQ0wsQ0FBQzt3QkFDTCxDQUFDO3FCQUNKLENBQUM7eUJBQ0QsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSw0QkFBNEI7d0JBQ3RELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsMkJBQTJCO3dCQUNyRCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsT0FBTzt3QkFDYixPQUFPLEVBQUUsZUFBZSxFQUFFLHFCQUFxQjt3QkFDL0MsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLE9BQU8sRUFBRSxlQUFlLEVBQUUsd0JBQXdCO3dCQUNsRCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsZUFBZTt3QkFDckIsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQ0FBcUM7d0JBQy9ELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxtQkFBbUI7d0JBQ3pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsNENBQTRDO3dCQUN0RSxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDLENBQUE7b0JBRU4sOEJBQThCO29CQUM5QixJQUFJLGFBQWEsR0FBRyxFQUFjLENBQUM7b0JBQ25DLElBQUksWUFBQSxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUVyRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzt3QkFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7d0JBQ2YsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixVQUFVLEVBQUUsTUFBTTt3QkFDbEIsY0FBYyxFQUFFLEtBQUs7d0JBQ3JCLE9BQU8sRUFBRSxNQUFNO3dCQUNmLEtBQUssRUFBRSxJQUFJO3dCQUNYLGFBQWEsRUFBRSxhQUFhO3FCQUMvQixDQUFDLENBQUM7Z0JBRVAsQ0FBQztnQkFFTyxpQkFBaUI7b0JBRXJCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRWhELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO3dCQUMvQyxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUUsQ0FBQzs0QkFDcEMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQzs0QkFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7NEJBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQzVCLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLE1BQU07eUJBQ04sWUFBWSxDQUFDO3dCQUNWLFNBQVMsRUFBRSxLQUFLO3dCQUNoQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7d0JBQy9CLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO3dCQUNoQyx3QkFBd0IsRUFBRSxLQUFLO3FCQUNsQyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQztnQkFFTyxnQkFBZ0I7b0JBRXBCLE1BQU0sVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7d0JBQ3JDLElBQUksRUFBRSxnQkFBZ0I7d0JBQ3RCLFFBQVEsRUFBRSxPQUFPO3dCQUNqQixnQkFBZ0IsRUFBRSx3REFBd0Q7cUJBQzdFLENBQUMsQ0FBQztvQkFFSCxVQUFVO3lCQUNMLFVBQVUsRUFBRSxDQUFBO29CQUVqQixVQUFVO3lCQUNMLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsNkJBQTZCO3lCQUNoRixRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRyxNQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7d0JBQ2xFLFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDOUMsSUFBSSxFQUFFLGFBQWE7d0JBQ25CLEtBQUssRUFBRSxpQ0FBaUM7d0JBQ3hDLEtBQUssRUFBRSxLQUFLO3FCQUNmLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtvQkFFZCxVQUFVO3lCQUNMLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsNEJBQTRCO3lCQUMvRSxRQUFRLENBQUMsZUFBZSxFQUFFO3dCQUN2QixVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQzlDLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSwwQkFBMEI7d0JBQ2pDLFdBQVcsRUFBRTs0QkFDVCxTQUFTLEVBQUUsRUFBRTt5QkFDaEI7d0JBQ0QsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO3dCQUMvQixtQkFBbUIsRUFBRSxLQUFLO3dCQUMxQixZQUFZLEVBQUUsS0FBSztxQkFDdEIsQ0FBQyxDQUFDO29CQUVQLFVBQVU7eUJBQ0wsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsMkJBQTJCO3lCQUM5RCxRQUFRLENBQUMsZUFBZSxFQUFFO3dCQUN2QixpREFBaUQ7d0JBQ2pELElBQUksRUFBRSxXQUFXO3dCQUNqQixzQ0FBc0M7d0JBQ3RDLFdBQVcsRUFBRTs0QkFDVCxTQUFTLEVBQUUsRUFBRTt5QkFDaEI7d0JBQ0QsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO3dCQUMvQixtQkFBbUIsRUFBRSxLQUFLO3dCQUMxQixZQUFZLEVBQUUsS0FBSztxQkFDdEIsQ0FBQyxDQUFDO29CQUVQLFVBQVU7eUJBQ0wsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLHFCQUFxQjt5QkFDN0MsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLE9BQU87cUJBQ2hCLENBQUMsQ0FBQTtvQkFFTixVQUFVO3lCQUNMLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxvQ0FBb0M7eUJBQzVELFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxLQUFLO3FCQUNkLENBQUMsQ0FBQTtvQkFFTixPQUFPLFVBQVUsQ0FBQztnQkFDdEIsQ0FBQzthQUVKLENBQUE7WUFsYVksVUFBVTtnQkFEdEIsUUFBUTtlQUNJLFVBQVUsQ0FrYXRCO1lBbGFZLHNCQUFVLGFBa2F0QixDQUFBO1FBRUwsQ0FBQyxFQS9hb0IsV0FBVyxHQUFYLGVBQVcsS0FBWCxlQUFXLFFBK2EvQjtJQUFELENBQUMsRUEvYWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQSthbkI7QUFBRCxDQUFDLEVBL2FTLE1BQU0sS0FBTixNQUFNLFFBK2FmO0FDL2FELElBQVUsTUFBTSxDQXNXZjtBQXRXRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FzV25CO0lBdFdnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFdBQVcsQ0FzVy9CO1FBdFdvQixXQUFBLFdBQVc7WUFFNUIsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUVoQzs7Ozs7ZUFLRztZQUVILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsT0FBQSxZQUFZO2dCQUFwRDs7b0JBRVksY0FBUyxHQUErQixJQUFJLENBQUM7b0JBQzdDLHdCQUFtQixHQUFZLEtBQUssQ0FBQztnQkFzVmpELENBQUM7Z0JBaFZVLGNBQWM7b0JBQ2pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFFTyxhQUFhO29CQUVqQixJQUFJLE1BQU0sR0FBaUIsRUFBRSxDQUFDO29CQUU5QixNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNSLE9BQU8sRUFBRSxJQUFJO3dCQUNiLFFBQVEsRUFBRSxJQUFJO3dCQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQzs0QkFDakMsSUFBSSxFQUFFLG1CQUFtQjs0QkFDekIsT0FBTyxFQUFFLGVBQWUsRUFBRSw2Q0FBNkM7NEJBQ3ZFLElBQUksRUFBRSxFQUFFOzRCQUNSLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRSxDQUFDO29DQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7Z0NBQ3JFLENBQUM7Z0NBQ0QsSUFBSSxDQUFDLFFBQVE7cUNBQ1IsSUFBSSxDQUFDLG1CQUFtQixFQUFFO29DQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFPO29DQUN4QixPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPO2lDQUM1QixDQUFDO3FDQUNELElBQUksQ0FBQyxDQUFDLElBQVksRUFBRSxFQUFFO29DQUNuQixLQUFLO29DQUNMLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFLENBQUM7d0NBQzdCLElBQUksWUFBQSxTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29DQUM3QyxDQUFDO2dDQUNMLENBQUMsQ0FBQyxDQUFBOzRCQUNWLENBQUM7eUJBQ0osQ0FBQyxDQUFDO3FCQUNOLENBQUMsQ0FBQTtvQkFFRixNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNSLEtBQUssRUFBRSxVQUFVO3dCQUNqQixRQUFRLEVBQUUsSUFBSTt3QkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUM7NEJBQ2pDLE9BQU8sRUFBRSxLQUFLOzRCQUNkLElBQUksRUFBRSxnQkFBZ0I7NEJBQ3RCLE9BQU8sRUFBRSxlQUFlLEVBQUUsd0NBQXdDOzRCQUNsRSxJQUFJLEVBQUUsRUFBRTs0QkFDUixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7Z0NBQy9CLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7b0NBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyw4Q0FBOEM7b0NBQ2xJLE9BQU87Z0NBQ1gsQ0FBQztxQ0FDSSxDQUFDO29DQUNGLEdBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU8sRUFBRSxDQUFDLENBQUM7Z0NBQ3BHLENBQUM7NEJBQ0wsQ0FBQzt5QkFDSixDQUFDLENBQUM7cUJBQ04sQ0FBQyxDQUFBO29CQUVGLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXpCLENBQUM7Z0JBRU8sb0JBQW9CLENBQUMsR0FTNUI7b0JBRUcsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixNQUFNLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQztvQkFDdEMsTUFBTSxPQUFPLEdBQUcsdUNBQXVDLENBQUM7b0JBRXhELE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUM7b0JBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBRTdCLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWTt5QkFDcEIsY0FBYyxFQUFFO3lCQUNoQixJQUFJLENBQUMsR0FBRyxFQUFFO3dCQUVQLElBQUksQ0FBQyxjQUFjLENBQUM7NEJBQ2hCLEVBQUUsRUFBRSxVQUFVOzRCQUNkLElBQUksRUFBRSxlQUFlLEVBQUUsOEJBQThCOzRCQUNyRCxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUM7Z0NBQ3ZDLElBQUksRUFBRSxXQUFXO2dDQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjtnQ0FDaEQsR0FBRyxFQUFFLEdBQUcsRUFBRTtvQ0FDTixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFLENBQUM7d0NBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0NBQ2pELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7d0NBQ2hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQzs0Q0FDbkIsRUFBRSxFQUFFLFVBQVU7NENBQ2QsSUFBSSxFQUFFLGVBQWUsRUFBRSx1Q0FBdUM7eUNBQ2pFLENBQUMsQ0FBQztvQ0FFUCxDQUFDO2dDQUNMLENBQUM7NkJBQ0osQ0FBQyxDQUFDOzRCQUNILFFBQVEsRUFBRSxDQUFDOzRCQUNYLEtBQUssRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU07eUJBQzlCLENBQUMsQ0FBQzt3QkFHSCxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFOzRCQUM1QyxRQUFRLEVBQUUsR0FBRyxDQUFDLFNBQVM7NEJBQ3ZCLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUTs0QkFDckIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJOzRCQUNkLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTt5QkFDckIsRUFBRSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDOzZCQUN4QyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFFWCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzs0QkFFdEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQztnQ0FFcEUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBRTVCLElBQUksSUFBSSxDQUFDLG1CQUFtQixLQUFLLElBQUksRUFBRSxDQUFDO29DQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29DQUM5QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0NBQ2IsT0FBTztnQ0FDWCxDQUFDO2dDQUVELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7b0NBQ3pELEtBQUs7b0NBQ0wsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQzt3Q0FDOUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUssQ0FBQyxDQUFDO3dDQUM3QyxJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQzs0Q0FDeEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQzs0Q0FDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2dEQUNuQixFQUFFLEVBQUUsVUFBVTtnREFDZCxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU07NkNBQ3hCLENBQUMsQ0FBQzs0Q0FDSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO3dDQUMxQixDQUFDO29DQUNMLENBQUM7b0NBQ0QsT0FBTzt5Q0FDRixDQUFDO3dDQUNGLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7NENBQ3RELElBQUksQ0FBQyxTQUFTLENBQUM7Z0RBQ1gsRUFBRSxFQUFFLFlBQVk7Z0RBQ2hCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUs7Z0RBQzVCLEtBQUssRUFBRSxPQUFPOzZDQUNqQixDQUFDLENBQUM7NENBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQzs0Q0FFOUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsSUFBSSxJQUFJLEVBQUUsQ0FBQztnREFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzRDQUM5QyxDQUFDOzRDQUVELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3Q0FDakIsQ0FBQztvQ0FDTCxDQUFDO2dDQUNMLENBQUM7NEJBQ0wsQ0FBQyxDQUFDLENBQUM7NEJBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxTQUFTLEVBQUUsT0FBTyxFQUFFO2dDQUV6RCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FFNUIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEtBQUssSUFBSSxFQUFFLENBQUM7b0NBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7b0NBQzlCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQ0FDYixPQUFPO2dDQUNYLENBQUM7Z0NBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztvQ0FDekQsS0FBSztvQ0FDTCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFDO3dDQUM5QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSyxDQUFDLENBQUM7d0NBQzdDLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDOzRDQUN4QyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDOzRDQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUM7Z0RBQ25CLEVBQUUsRUFBRSxVQUFVO2dEQUNkLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTTs2Q0FDeEIsQ0FBQyxDQUFDOzRDQUNILElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7d0NBQzFCLENBQUM7b0NBQ0wsQ0FBQztvQ0FDRCxPQUFPO3lDQUNGLENBQUM7d0NBQ0YsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQzs0Q0FDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQztnREFDWCxFQUFFLEVBQUUsWUFBWTtnREFDaEIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSztnREFDNUIsS0FBSyxFQUFFLE9BQU87NkNBQ2pCLENBQUMsQ0FBQzt3Q0FDUCxDQUFDO29DQUNMLENBQUM7b0NBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsSUFBSSxJQUFJLEVBQUUsQ0FBQzt3Q0FDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29DQUM5QyxDQUFDO29DQUVELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7b0NBQzlCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQ0FDakIsQ0FBQzs0QkFDTCxDQUFDLENBQUMsQ0FBQzt3QkFDUCxDQUFDLENBQUMsQ0FBQTt3QkFFTiwyQ0FBMkM7d0JBQzNDLHlCQUF5Qjt3QkFDekIsbUJBQW1CO3dCQUNuQixRQUFRO29CQUVaLENBQUMsQ0FBQyxDQUFDO2dCQUVYLENBQUM7Z0JBRU8sVUFBVSxDQUFDLElBQVc7b0JBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQixDQUFDO2dCQUVPLFVBQVU7b0JBRWQsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFekQsdURBQXVEO29CQUN2RCx5Q0FBeUM7b0JBQ3pDLEdBQUc7b0JBQ0gsUUFBUTtvQkFDUiwyREFBMkQ7b0JBQzNELG1DQUFtQztvQkFDbkMsdUJBQXVCO29CQUN2Qix5Q0FBeUM7b0JBQ3pDLGlEQUFpRDtvQkFDakQsOENBQThDO29CQUM5Qyx1Q0FBdUM7b0JBQ3ZDLDBDQUEwQztvQkFDMUMsaUJBQWlCO29CQUNqQixhQUFhO29CQUNiLEdBQUc7b0JBRUgsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7eUJBQ3hCLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ1AsSUFBSSxDQUFDLG9CQUFvQixDQUFDOzRCQUN0QixTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFTOzRCQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFROzRCQUMzQixJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFLOzRCQUNwQixNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFPO3lCQUMzQixDQUFDLENBQUM7b0JBQ1AsQ0FBQyxDQUFDLENBQUM7b0JBRVAsTUFBTSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBTyxDQUFDO29CQUV4RCxhQUFhO3lCQUNSLGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsT0FBTzt3QkFDYixPQUFPLEVBQUUsZUFBZSxFQUFFLDRCQUE0Qjt3QkFDdEQsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7NEJBQ25CLElBQUksUUFBUSxHQUFpQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDOzRCQUN2RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFHLFVBQVU7Z0NBQ25DLFFBQVEsQ0FBQyxJQUFJLEdBQUcsOENBQThDLENBQUM7Z0NBQy9ELFFBQVEsQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFBLENBQUMsNENBQTRDOzRCQUNuRixDQUFDO2lDQUNJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVTtnQ0FDdEMsUUFBUSxDQUFDLElBQUksR0FBRyxtREFBbUQsQ0FBQztnQ0FDcEUsUUFBUSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUEsQ0FBQyx3RUFBd0U7NEJBQy9HLENBQUM7aUNBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPO2dDQUNuQyxRQUFRLENBQUMsSUFBSSxHQUFHLDhDQUE4QyxDQUFDO2dDQUMvRCxRQUFRLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQSxDQUFDLHVDQUF1Qzs0QkFDOUUsQ0FBQzs0QkFDRCxPQUFPLFFBQVEsQ0FBQzt3QkFDcEIsQ0FBQztxQkFDSixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQ0FBcUM7cUJBQ2xFLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxPQUFPO3dCQUNiLE9BQU8sRUFBRSxlQUFlLEVBQUUscUNBQXFDO3dCQUMvRCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsT0FBTyxFQUFFLGVBQWUsRUFBRSw2Q0FBNkM7d0JBQ3ZFLEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxXQUFXO3dCQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFFLDBCQUEwQjt3QkFDcEQsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLE1BQU07d0JBQ1osT0FBTyxFQUFFLGVBQWUsRUFBRSxvQ0FBb0M7d0JBQzlELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxPQUFPO3dCQUNiLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0NBQWtDO3dCQUM1RCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDLENBQUE7b0JBRU4sTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUVoQiw4QkFBOEI7b0JBQzlCLElBQUksYUFBYSxHQUFHLEVBQWMsQ0FBQztvQkFDbkMsSUFBSSxZQUFBLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRTVFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUNaLElBQUksRUFBRSxrQkFBa0I7d0JBQ3hCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTt3QkFDZixVQUFVLEVBQUUsTUFBTTt3QkFDbEIsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLGNBQWMsRUFBRSxLQUFLO3dCQUNyQixPQUFPLEVBQUUsYUFBYTt3QkFDdEIsSUFBSSxFQUFFLElBQUk7d0JBQ1YsYUFBYSxFQUFFLGFBQWE7cUJBQy9CLENBQUMsQ0FBQTtnQkFFTixDQUFDO2dCQUVPLGdCQUFnQjtvQkFDcEIsSUFBSSxNQUFNLEdBQWlCLEVBQUUsQ0FBQztvQkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQzt3QkFDUixRQUFRLEVBQUUsSUFBSTt3QkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUM7NEJBQ2pDLElBQUksRUFBRSxVQUFVOzRCQUNoQixPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjs0QkFDaEQsSUFBSSxFQUFFLGlCQUFpQjs0QkFDdkIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQ3BCLENBQUM7eUJBQ0osQ0FBQyxDQUFDO3FCQUNOLENBQUMsQ0FBQTtvQkFDRixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QixDQUFDO2FBRUosQ0FBQTtZQXpWWSxrQkFBa0I7Z0JBRDlCLFFBQVE7ZUFDSSxrQkFBa0IsQ0F5VjlCO1lBelZZLDhCQUFrQixxQkF5VjlCLENBQUE7UUFFTCxDQUFDLEVBdFdvQixXQUFXLEdBQVgsZUFBVyxLQUFYLGVBQVcsUUFzVy9CO0lBQUQsQ0FBQyxFQXRXZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBc1duQjtBQUFELENBQUMsRUF0V1MsTUFBTSxLQUFOLE1BQU0sUUFzV2Y7QUN0V0QsSUFBVSxNQUFNLENBdW1CZjtBQXZtQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBdW1CbkI7SUF2bUJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFdBQVcsQ0F1bUIvQjtRQXZtQm9CLFdBQUEsV0FBVztZQUU1QixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBRWhDOzs7OztlQUtHO1lBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxPQUFBLFlBQVk7Z0JBVXhDLGNBQWM7b0JBQ2pCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFlBQUEsU0FBUyxFQUFFLENBQUM7b0JBQ2pDLENBQUM7b0JBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRSxDQUFDO3dCQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7b0JBQ3JFLENBQUM7b0JBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQzVCLENBQUM7Z0JBRU8sVUFBVTtvQkFFZCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBRTNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7d0JBQ3hDLEdBQUcsRUFBRSxVQUFVO3dCQUNmLFVBQVUsRUFBRTt3QkFDUixnRUFBZ0U7d0JBQ2hFLDBHQUEwRzt3QkFDMUcsa0NBQWtDO3dCQUNsQywrQ0FBK0M7d0JBQy9DLG9CQUFvQjt3QkFDcEIsSUFBSTt3QkFDSixzREFBc0Q7d0JBQ3RELHVEQUF1RDt3QkFDdkQsc0JBQXNCO3dCQUN0QixtQkFBbUI7d0JBQ25CLFFBQVE7eUJBQ1g7cUJBQ0osQ0FBQyxDQUFDO29CQUVILHNCQUFzQjtvQkFFdEIsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNoQixNQUFNLGFBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFPLENBQUM7b0JBRXhELGFBQWE7eUJBQ1IsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxVQUFVO3dCQUNoQixLQUFLLEVBQUUsR0FBRzt3QkFDVixPQUFPLEVBQUUsZUFBZSxFQUFFLHFDQUFxQztxQkFDbEUsQ0FBQzt3QkFDRixrQkFBa0I7d0JBQ2xCLG9CQUFvQjt3QkFDcEIsaUJBQWlCO3dCQUNqQiwyREFBMkQ7d0JBQzNELElBQUk7eUJBQ0gsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxXQUFXO3dCQUNqQixLQUFLLEVBQUUsR0FBRzt3QkFDVixPQUFPLEVBQUUsZUFBZSxFQUFFLG1CQUFtQjt3QkFDN0MsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7NEJBQ2xCLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLFlBQUEsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dDQUM1QyxPQUFPLGVBQWUsQ0FBQyxDQUFDLDJCQUEyQjs0QkFDdkQsQ0FBQzs0QkFDRCxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDNUIsQ0FBQztxQkFDSixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUUsR0FBRzt3QkFDVixPQUFPLEVBQUUsZUFBZSxFQUFFLG9CQUFvQjtxQkFDakQsQ0FBQyxDQUFBO29CQUVOLGFBQWE7eUJBQ1IsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxXQUFXO3dCQUNqQixLQUFLLEVBQUUsR0FBRzt3QkFDVixPQUFPLEVBQUUsZUFBZSxFQUFFLDBCQUEwQjtxQkFDdkQsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsT0FBTyxFQUFFLGVBQWUsRUFBRSx3QkFBd0I7cUJBQ3JELENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxPQUFPLEVBQWUsbUZBQW1GO3dCQUMvRyxLQUFLLEVBQUUsR0FBRzt3QkFDVixPQUFPLEVBQUUsZUFBZSxFQUFFLHFCQUFxQjtxQkFDbEQsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLGNBQWM7d0JBQ3BCLEtBQUssRUFBRSxHQUFHO3dCQUNWLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0JBQWtCO3dCQUM1QyxlQUFlLEVBQUUsR0FBRyxFQUFFOzRCQUNsQixPQUFPLGVBQWUsQ0FBQyxDQUFDLDZCQUE2Qjt3QkFDekQsQ0FBQztxQkFDSixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsZUFBZTt3QkFDckIsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQkFBcUI7d0JBQy9DLGVBQWUsRUFBRSxHQUFHLEVBQUU7NEJBQ2xCLE9BQU8sZUFBZSxDQUFDLENBQUMsOEJBQThCO3dCQUMxRCxDQUFDO3FCQUNKLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxlQUFlO3dCQUNyQixLQUFLLEVBQUUsR0FBRzt3QkFDVixPQUFPLEVBQUUsZUFBZSxFQUFFLDhCQUE4QjtxQkFDM0QsQ0FBQyxDQUFBO29CQUVOLDZCQUE2QjtvQkFHN0IsYUFBYTt5QkFDUixhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLGNBQWMsRUFBUSxrQkFBa0I7d0JBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUkscUNBQXFDO3dCQUNqRSxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDLENBQUE7b0JBRU4sYUFBYTt5QkFDUixhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQ0FBcUM7d0JBQy9ELEtBQUssRUFBRSxHQUFHO3dCQUNWLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFOzRCQUNwQixJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQztnQ0FDaEIsT0FBTyxFQUFFLENBQUM7NEJBQ2QsQ0FBQzs0QkFDRCxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxZQUFBLFNBQVMsQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLFlBQUEsU0FBUyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssWUFBQSxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7Z0NBQ3BJLE9BQU8sRUFBRSxDQUFDOzRCQUNkLENBQUM7NEJBQ0QsSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7Z0NBQzdFLE9BQU8sMkJBQTJCLENBQUM7NEJBQ3ZDLENBQUM7NEJBQ0QsT0FBTyxLQUFLLENBQUMsbUJBQW1CLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7d0JBQzlFLENBQUM7d0JBQ0QsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7NEJBRVosSUFBSSxHQUFHLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztnQ0FDcEQsT0FBTyxJQUFJLENBQUM7NEJBQ2hCLENBQUM7NEJBRUQsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxZQUFBLFNBQVMsQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssWUFBQSxTQUFTLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLFlBQUEsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dDQUN4SyxPQUFPLElBQUksQ0FBQzs0QkFDaEIsQ0FBQzs0QkFFRCxJQUFJLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUMzRCxnREFBZ0Q7NEJBQ2hELDZFQUE2RTs0QkFDN0UsR0FBRzs0QkFFSCxJQUFJLE1BQU0sR0FBaUM7Z0NBQ3ZDLE1BQU0sRUFBRSxZQUFZO2dDQUNwQixPQUFPLEVBQUUsb0JBQW9COzZCQUNoQyxDQUFDOzRCQUVGLElBQUksYUFBYSxHQUFrQyxTQUFTLENBQUM7NEJBRTdELElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssWUFBQSxTQUFTLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLFlBQUEsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO2dDQUM3RyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUM5QixDQUFDO2lDQUNJLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssWUFBQSxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7Z0NBQy9ELGFBQWEsR0FBRyxDQUFDLENBQUM7NEJBQ3RCLENBQUM7NEJBRUQsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2dDQUNuRCxhQUFhLEVBQUU7b0NBQ1gsYUFBYSxFQUFFLGFBQWE7b0NBQzVCLFVBQVUsRUFBRSxJQUFJO2lDQUNuQjs2QkFDSixDQUFDLEVBQUU7Z0NBQ0EsYUFBYSxFQUFFO29DQUNYLGFBQWEsRUFBRSxhQUFhO29DQUM1QixVQUFVLEVBQUUsSUFBSTtpQ0FDbkI7Z0NBQ0QsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUM5QyxZQUFZLEVBQUUsVUFBVSxLQUFLO29DQUN6QixJQUFJLEtBQUssRUFBRSxDQUFDO3dDQUNSLE9BQU8sS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztvQ0FDakQsQ0FBQztnQ0FDTCxDQUFDO2dDQUNELEtBQUssRUFBRSxpSEFBaUg7Z0NBQ3hILE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQ0FFcEIsQ0FBQzs2QkFDSixDQUFDLENBQUM7NEJBRUgsSUFBSSxNQUFNLEdBQWlDO2dDQUN2QyxNQUFNLEVBQUUsWUFBWTtnQ0FDcEIsT0FBTyxFQUFFLG9CQUFvQjs2QkFDaEMsQ0FBQzs0QkFDRixPQUFPLE1BQU0sQ0FBQzt3QkFDbEIsQ0FBQztxQkFDSixDQUFDLENBQUE7b0JBRU4sWUFBWTtvQkFFWiw4QkFBOEI7b0JBQzlCLElBQUksYUFBYSxHQUFHLEVBQWMsQ0FBQztvQkFDbkMsSUFBSSxZQUFBLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRTVFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDekIsS0FBSyxFQUFFLElBQUk7d0JBQ1gsSUFBSSxFQUFFLHVCQUF1Qjt3QkFDN0IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO3dCQUNmLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixVQUFVLEVBQUUsTUFBTTt3QkFDbEIsY0FBYyxFQUFFLEtBQUs7d0JBQ3JCLE9BQU8sRUFBRSxhQUFhO3dCQUN0QixJQUFJLEVBQUUsSUFBSTt3QkFDVixhQUFhLEVBQUUsYUFBYTt3QkFDNUIsV0FBVyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7NEJBQ3JCLElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssSUFBSTtnQ0FDekYsT0FBTyxJQUFJLENBQUM7NEJBQ2hCLE9BQU8sS0FBSyxDQUFDO3dCQUNqQixDQUFDO3dCQUNELFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDbkIsZ0NBQWdDOzRCQUNoQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFLENBQUM7Z0NBQ3ZCLE9BQU87NEJBQ1gsQ0FBQzs0QkFDRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDaEQsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQztnQ0FDM0MsT0FBTzs0QkFDWCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLElBQUksRUFBRSxDQUFDO2dDQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzdDLENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBRWQsSUFBSSxDQUFDLElBQUk7eUJBQ0osY0FBYyxDQUFDO3dCQUNaLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDYiw0Q0FBNEM7d0JBQ2hELENBQUM7cUJBQ0osQ0FBQyxDQUFBO29CQUVOLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUU1QixZQUFZO2dCQUloQixDQUFDO2dCQUVPLFVBQVU7b0JBRWQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5QyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLGdCQUFnQixFQUFFLHdEQUF3RCxFQUFFLENBQUMsQ0FBQztvQkFFaEosSUFBSTt5QkFDQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsaUNBQWlDO3lCQUM3RCxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLDhCQUE4Qjt5QkFDakYsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDckQsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUM5QyxJQUFJLEVBQUUsUUFBUTt3QkFDZCxLQUFLLEVBQUUsNEJBQTRCO3dCQUNuQyxhQUFhLEVBQUU7NEJBQ1gsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDOzRCQUNmLFFBQVEsRUFBRSxDQUFDOzRCQUNYLFNBQVMsRUFBRSxRQUFRO3lCQUN0QjtxQkFDSixDQUFDLENBQUE7b0JBRU4sSUFBSTt5QkFDQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsZ0NBQWdDO3lCQUN4RCxRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUNwQixJQUFJLEVBQUUsTUFBTTt3QkFDWixLQUFLLEVBQUUsdUJBQXVCO3dCQUM5QixVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQ2hFLElBQUksRUFBRSxVQUFVO3dCQUNoQixlQUFlLEVBQUUsTUFBTTt3QkFDdkIsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFOzRCQUNyQixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzs0QkFDL0IsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7Z0NBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO3FDQUMxQyxJQUFJLENBQUMsR0FBRyxFQUFFO29DQUNQLDhCQUE4QjtvQ0FDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0NBQ2pCLDRCQUE0QjtvQ0FDNUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixJQUFJLElBQUksRUFBRSxDQUFDO3dDQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FDakQsQ0FBQztvQ0FDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLElBQUksRUFBRSxDQUFDO3dDQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQzlDLENBQUM7b0NBQ0QsdUJBQXVCO29DQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQ0FDN0IsQ0FBQyxDQUFDLENBQUE7NEJBQ1YsQ0FBQzt3QkFDTCxDQUFDO3dCQUNELFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDdEIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7NEJBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztpQ0FDN0MsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQ0FDUCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQ0FDakIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixJQUFJLElBQUksRUFBRSxDQUFDO29DQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDaEQsQ0FBQzs0QkFDTCxDQUFDLENBQUMsQ0FBQTt3QkFDVixDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFFUCw0REFBNEQ7b0JBRTVELElBQUkseUJBQXlCLEdBQWlCLEVBQUUsQ0FBQztvQkFFakQseUJBQXlCLENBQUMsSUFBSSxDQUFDO3dCQUMzQixRQUFRLEVBQUUsSUFBSTt3QkFDZCxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUM7NEJBQ2hCLElBQUksRUFBRSxnQ0FBZ0M7NEJBQ3RDLE9BQU8sRUFBRSxlQUFlLEVBQUUsd0JBQXdCOzRCQUNsRCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFLENBQUM7b0NBQ25DLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29DQUM1QyxJQUFJLEtBQUssSUFBSSxJQUFJO3dDQUNiLE9BQU87b0NBRVgsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO3dDQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7d0NBQ3ZDLE9BQU87b0NBQ1gsQ0FBQztvQ0FFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztvQ0FFbEQsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7d0NBQzlDLE9BQU8sQ0FBQyxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQzt3Q0FDekUsT0FBTTtvQ0FDVixDQUFDO29DQUVELElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTt3Q0FDeEMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksWUFBQSxTQUFTLENBQUMsUUFBUTs0Q0FDMUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLFlBQUEsU0FBUyxDQUFDLElBQUk7NENBRXRDLE9BQU8sT0FBTyxDQUFDO3dDQUNuQixPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQzt3Q0FDbEMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQzt3Q0FDM0MsT0FBTyxDQUFDLHNCQUFzQixDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQzt3Q0FDbEQsT0FBTyxPQUFPLENBQUM7b0NBQ25CLENBQUMsQ0FBQyxDQUFDO29DQUNILElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztnQ0FDaEQsQ0FBQzs0QkFDTCxDQUFDO3lCQUNKLENBQUM7cUJBQ0wsQ0FBQyxDQUFBO29CQUVGLFlBQVk7b0JBRVosOERBQThEO29CQUU5RCxJQUFJLHlCQUF5QixHQUFpQixFQUFFLENBQUM7b0JBRWpELHlCQUF5QixDQUFDLElBQUksQ0FBQzt3QkFDM0IsUUFBUSxFQUFFLElBQUk7d0JBQ2QsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDOzRCQUNoQixJQUFJLEVBQUUsZ0NBQWdDOzRCQUN0QyxPQUFPLEVBQUUsZUFBZSxFQUFFLHdCQUF3Qjs0QkFDbEQsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNiLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO29DQUNuQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQ0FDNUMsSUFBSSxLQUFLLElBQUksSUFBSTt3Q0FDYixPQUFPO29DQUVYLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQzt3Q0FDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO3dDQUN2QyxPQUFPO29DQUNYLENBQUM7b0NBRUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7b0NBRWxELElBQUksU0FBUyxJQUFJLElBQUksSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO3dDQUM5QyxPQUFPLENBQUMsS0FBSyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7d0NBQ3pFLE9BQU07b0NBQ1YsQ0FBQztvQ0FFRCxJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7d0NBQ3hDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLFlBQUEsU0FBUyxDQUFDLFVBQVU7NENBQzVDLE9BQU8sT0FBTyxDQUFDO3dDQUNuQixPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQzt3Q0FDbEMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQzt3Q0FDM0MsT0FBTyxDQUFDLHNCQUFzQixDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQzt3Q0FDbEQsT0FBTyxPQUFPLENBQUM7b0NBQ25CLENBQUMsQ0FBQyxDQUFDO29DQUNILElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztnQ0FDaEQsQ0FBQzs0QkFDTCxDQUFDO3lCQUNKLENBQUM7cUJBQ0wsQ0FBQyxDQUFBO29CQUVGLFlBQVk7b0JBRVosSUFBSSwyQkFBMkIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDbEUsMkJBQTJCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsRUFBRSxDQUFDO3dCQUNqRSxhQUFhLEVBQUU7NEJBQ1gsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBUSxvQkFBb0I7NEJBQ3BELFVBQVUsRUFBRSxJQUFJO3lCQUNuQjtxQkFDSixDQUFDLEVBQUU7d0JBQ0EsT0FBTyxFQUFFLHlCQUF5Qjt3QkFDbEMsSUFBSSxFQUFFLDBCQUEwQjt3QkFDaEMsYUFBYSxFQUFFOzRCQUNYLGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQVEsb0JBQW9COzRCQUNwRCxVQUFVLEVBQUUsSUFBSTt5QkFDbkI7d0JBQ0QsWUFBWSxFQUFFLFVBQVUsS0FBSzs0QkFDekIsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQ0FDUixPQUFPLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7NEJBQ2pELENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBRUgsSUFBSTt5QkFDQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUEsQ0FBRSw0Q0FBNEM7b0JBRTlFLElBQUk7eUJBQ0MsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLG1DQUFtQzt5QkFDM0QsUUFBUSxDQUFDLFlBQVksRUFBRSwyQkFBMkIsQ0FBQyxDQUFBO29CQUV4RCxJQUFJLDJCQUEyQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNsRSwyQkFBMkIsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLDJCQUEyQixFQUFFLENBQUM7d0JBQ2pFLGFBQWEsRUFBRTs0QkFDWCxhQUFhLEVBQUUsQ0FBQyxFQUFRLGVBQWU7NEJBQ3ZDLGtCQUFrQjt5QkFDckI7cUJBQ0osQ0FBQyxFQUFFO3dCQUNBLE9BQU8sRUFBRSx5QkFBeUI7d0JBQ2xDLElBQUksRUFBRSwwQkFBMEI7d0JBQ2hDLGFBQWEsRUFBRTs0QkFDWCxhQUFhLEVBQUUsQ0FBQyxFQUFRLGVBQWU7NEJBQ3ZDLG1CQUFtQjt5QkFDdEI7d0JBQ0QsWUFBWSxFQUFFLFVBQVUsS0FBSzs0QkFDekIsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQ0FDUixPQUFPLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7NEJBQ2pELENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBRUgsSUFBSTt5QkFDQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsZ0NBQWdDO3lCQUN4RCxRQUFRLENBQUMsWUFBWSxFQUFFLDJCQUEyQixDQUFDLENBQUM7b0JBRXpELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztnQkFLTyxhQUFhO29CQUNqQixJQUFJLE1BQU0sR0FBaUIsRUFBRSxDQUFDO29CQUU5QixNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNSLFFBQVEsRUFBRSxJQUFJO3dCQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQzs0QkFDakMsT0FBTyxFQUFFLEtBQUs7NEJBQ2QsSUFBSSxFQUFFLGtCQUFrQjs0QkFDeEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQ0FBZ0M7NEJBQzFELElBQUksRUFBRSxFQUFFOzRCQUNSLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBRU4sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztxQ0FDOUIsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQVMsRUFBRSxFQUFFO29DQUN6QixnQ0FBZ0M7b0NBQ2hDLElBQUksT0FBTyxLQUFLLElBQUk7d0NBQ2hCLE9BQU87b0NBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7eUNBQzlFLElBQUksQ0FBQyxDQUFDLE1BT04sRUFBRSxFQUFFO3dDQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQzt3Q0FDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dDQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQzt3Q0FFckMsdUJBQXVCO3dDQUN2QixNQUFNLFFBQVEsR0FBUSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzt3Q0FDbEQsSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLElBQUksRUFBRSxDQUFDOzRDQUN2RixRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3Q0FDdkMsQ0FBQztvQ0FDTCxDQUFDLENBQUMsQ0FBQztnQ0FDWCxDQUFDLENBQUMsQ0FBQTs0QkFDVixDQUFDO3lCQUNKLENBQUMsQ0FBQztxQkFDTixDQUFDLENBQUE7b0JBRUYsTUFBTSxDQUFDLElBQUksQ0FBQzt3QkFDUixPQUFPLEVBQUUsSUFBSTt3QkFDYixRQUFRLEVBQUUsSUFBSTt3QkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUM7NEJBQ2pDLE9BQU8sRUFBRSxLQUFLOzRCQUNkLElBQUksRUFBRSxlQUFlOzRCQUNyQixPQUFPLEVBQUUsZUFBZSxFQUFFLDhCQUE4Qjs0QkFDeEQsSUFBSSxFQUFFLEVBQUU7NEJBQ1IsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FFTixJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0NBRW5DLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJO29DQUNqQixPQUFPO2dDQUVYLGtDQUFrQztnQ0FDbEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0NBQzNELE9BQU8sR0FBRyxDQUFDLHVCQUF1QixDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQ0FDaEUsQ0FBQyxDQUFDLENBQUE7Z0NBRUYsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO29DQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyw4RkFBOEY7b0NBQ3RMLE9BQU87Z0NBQ1gsQ0FBQztnQ0FFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDdkMsSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7b0NBQzVDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLDhGQUE4RjtvQ0FDdEwsT0FBTztnQ0FDWCxDQUFDO2dDQUVELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7cUNBQzlCLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFTLEVBQUUsRUFBRTtvQ0FDekIsZ0NBQWdDO29DQUNoQyxJQUFJLE9BQU8sS0FBSyxJQUFJO3dDQUNoQixPQUFPO29DQUNYLDhCQUE4QjtvQ0FDOUIsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSTt3Q0FDakMsT0FBTztvQ0FFWCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUUsQ0FBQzt3Q0FDaEMsT0FBTyxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO29DQUMzRCxDQUFDO29DQUVELGdEQUFnRDtvQ0FDaEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO3dDQUM3QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUM7d0NBQzlCLE9BQU8sSUFBSSxDQUFDO29DQUNoQixDQUFDLENBQUMsQ0FBQztvQ0FFSCxJQUFJLFlBQVksR0FBZSxJQUFJLENBQUM7b0NBQ3BDLG1HQUFtRztvQ0FDbkcsMERBQTBEO29DQUMxRCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7d0NBQ3pCLFlBQVksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ2hDLENBQUM7b0NBRUQsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO3dDQUNqQyxvREFBb0Q7d0NBQ3BELElBQUksWUFBWSxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDOzRDQUNqRixRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxDQUFDO3dDQUMzQyxDQUFDOzZDQUNJLENBQUM7NENBQ0YsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7d0NBQzFGLENBQUM7d0NBQ0QsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO29DQUN6QixDQUFDLENBQUMsQ0FBQztvQ0FFSCw4QkFBOEI7b0NBQzlCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0NBRTFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRTt3Q0FDM0MsR0FBRyxFQUFFOzRDQUNELFFBQVEsRUFBRSxjQUFjOzRDQUN4QixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7NENBQ3RCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs0Q0FDbEIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO3lDQUFDO3FDQUMzQixDQUFDLENBQUM7Z0NBQ1AsQ0FBQyxDQUFDLENBQUE7Z0NBQ04sT0FBTzs0QkFDWCxDQUFDO3lCQUNKLENBQUMsQ0FBQztxQkFDTixDQUFDLENBQUE7b0JBSUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekIsQ0FBQztnQkFFTyxnQkFBZ0I7b0JBQ3BCLElBQUksTUFBTSxHQUFpQixFQUFFLENBQUM7b0JBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ1IsUUFBUSxFQUFFLElBQUk7d0JBQ2QsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDOzRCQUNqQyxJQUFJLEVBQUUsVUFBVTs0QkFDaEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7NEJBQ2hELElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUNwQixDQUFDO3lCQUNKLENBQUMsQ0FBQztxQkFDTixDQUFDLENBQUE7b0JBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDNUIsQ0FBQzthQUNKLENBQUE7WUExbEJZLGlCQUFpQjtnQkFEN0IsUUFBUTtlQUNJLGlCQUFpQixDQTBsQjdCO1lBMWxCWSw2QkFBaUIsb0JBMGxCN0IsQ0FBQTtRQUVMLENBQUMsRUF2bUJvQixXQUFXLEdBQVgsZUFBVyxLQUFYLGVBQVcsUUF1bUIvQjtJQUFELENBQUMsRUF2bUJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF1bUJuQjtBQUFELENBQUMsRUF2bUJTLE1BQU0sS0FBTixNQUFNLFFBdW1CZjtBQ3ZtQkQsSUFBVSxNQUFNLENBK0xmO0FBL0xELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQStMbkI7SUEvTGdCLFdBQUEsR0FBRztRQUFDLElBQUEsV0FBVyxDQStML0I7UUEvTG9CLFdBQUEsV0FBVztZQUU1QixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBRWhDOzs7OztlQUtHO1lBRUgsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLE9BQUEsWUFBWTtnQkFZcEMsY0FBYztvQkFDakIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO3dCQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksWUFBQSxTQUFTLEVBQUUsQ0FBQztvQkFDakMsQ0FBQztvQkFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsa0NBQWtDLENBQUMsQ0FBQztvQkFDckUsQ0FBQztvQkFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQzVCLENBQUM7Z0JBRU8sZ0JBQWdCO29CQUNwQixJQUFJLE1BQU0sR0FBaUIsRUFBRSxDQUFDO29CQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNSLFFBQVEsRUFBRSxJQUFJO3dCQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQzs0QkFDakMsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCOzRCQUNoRCxJQUFJLEVBQUUsaUJBQWlCOzRCQUN2QixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDcEIsQ0FBQzt5QkFDSixDQUFDLENBQUM7cUJBQ04sQ0FBQyxDQUFBO29CQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVCLENBQUM7Z0JBRU8sYUFBYTtvQkFDakIsSUFBSSxNQUFNLEdBQWlCLEVBQUUsQ0FBQztvQkFFOUIsTUFBTSxDQUFDLElBQUksQ0FBQzt3QkFDUixRQUFRLEVBQUUsSUFBSTt3QkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUM7NEJBQ2pDLE9BQU8sRUFBRSxLQUFLOzRCQUNkLElBQUksRUFBRSxrQkFBa0I7NEJBQ3hCLE9BQU8sRUFBRSxlQUFlLEVBQUUsOEJBQThCOzRCQUN4RCxJQUFJLEVBQUUsRUFBRTs0QkFDUixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQ0FDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztxQ0FDOUIsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQVMsRUFBRSxFQUFFO29DQUV6QixJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQzt3Q0FDbkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO3dDQUNoRCxPQUFPO29DQUNYLENBQUM7b0NBQ0QsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7d0NBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDO3dDQUNuRixPQUFPO29DQUNYLENBQUM7b0NBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRSxDQUFDO3dDQUM1QyxPQUFPLENBQUMsS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7d0NBQy9ELE9BQU87b0NBQ1gsQ0FBQztvQ0FFRCxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzt5Q0FDeEUsSUFBSSxDQUFDLENBQUMsUUFBaUIsRUFBRSxFQUFFO3dDQUN4QixJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUUsQ0FBQzs0Q0FDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQztnREFDWCxPQUFPLEVBQUUsZUFBZSxFQUFFLDhEQUE4RDtnREFDeEYsS0FBSyxFQUFFLFNBQVM7Z0RBQ2hCLEVBQUUsRUFBRSxvQkFBb0I7NkNBQzNCLENBQUMsQ0FBQTt3Q0FDTixDQUFDOzZDQUNJLENBQUM7NENBQ0Ysb0JBQW9COzRDQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7NENBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDOzRDQUN4Qix1QkFBdUI7NENBQ3ZCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLElBQUksSUFBSSxFQUFFLENBQUM7Z0RBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs0Q0FDOUMsQ0FBQzs0Q0FDRCxHQUFHLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO3dDQUN2RixDQUFDO29DQUNMLENBQUMsQ0FBQyxDQUFDO2dDQUNYLENBQUMsQ0FBQyxDQUFBOzRCQUNWLENBQUM7eUJBQ0osQ0FBQyxDQUFDO3FCQUNOLENBQUMsQ0FBQztvQkFFSCxNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNSLEtBQUssRUFBRSxVQUFVO3dCQUNqQixRQUFRLEVBQUUsSUFBSTt3QkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUM7NEJBQ2pDLE9BQU8sRUFBRSxLQUFLOzRCQUNkLElBQUksRUFBRSxnQkFBZ0I7NEJBQ3RCLE9BQU8sRUFBRSxlQUFlLEVBQUUsd0NBQXdDOzRCQUNsRSxJQUFJLEVBQUUsRUFBRTs0QkFDUixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7Z0NBQy9CLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztvQ0FDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLDhDQUE4QztvQ0FDbEksT0FBTztnQ0FDWCxDQUFDO3FDQUNJLENBQUM7b0NBQ0YsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU8sRUFBRSxDQUFDLENBQUM7Z0NBQzVGLENBQUM7NEJBQ0wsQ0FBQzt5QkFDSixDQUFDLENBQUM7cUJBQ04sQ0FBQyxDQUFDO29CQUVILElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRU8sVUFBVTtvQkFFZCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlDLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUUsd0RBQXdELEVBQUUsQ0FBQyxDQUFDO29CQUVoSixJQUFJO3lCQUNDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxpQ0FBaUM7eUJBQzdELE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsOEJBQThCO3lCQUNqRixRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO3dCQUNyRCxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQzlDLElBQUksRUFBRSxRQUFRO3dCQUNkLEtBQUssRUFBRSw0QkFBNEI7d0JBQ25DLGFBQWEsRUFBRTs0QkFDWCxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUM7NEJBQ2YsUUFBUSxFQUFFLENBQUM7NEJBQ1gsU0FBUyxFQUFFLFFBQVE7eUJBQ3RCO3FCQUNKLENBQUMsQ0FBQTtvQkFFTixJQUFJO3lCQUNDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyx3Q0FBd0M7eUJBQ2hFLFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxNQUFNO3dCQUNaLEtBQUssRUFBRSx1QkFBdUI7d0JBQzlCLFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDaEUsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLGVBQWUsRUFBRSxNQUFNO3dCQUN2QixXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7NEJBQ3JCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDOzRCQUMvQixJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztnQ0FDZixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7cUNBQzNDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0NBQ1AsOEJBQThCO29DQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQ0FDakIsNEJBQTRCO29DQUM1QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLElBQUksSUFBSSxFQUFFLENBQUM7d0NBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29DQUNqRCxDQUFDO2dDQUNMLENBQUMsQ0FBQyxDQUFBOzRCQUNWLENBQUM7d0JBQ0wsQ0FBQzt3QkFDRCxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7NEJBQ3RCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDOzRCQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7aUNBQzdDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0NBQ1AsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0NBQ2pCLDRCQUE0QjtnQ0FDNUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixJQUFJLElBQUksRUFBRSxDQUFDO29DQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDaEQsQ0FBQzs0QkFDTCxDQUFDLENBQUMsQ0FBQTt3QkFDVixDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFFUCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRXhDLENBQUM7YUFFSixDQUFBO1lBakxZLGFBQWE7Z0JBRHpCLFFBQVE7ZUFDSSxhQUFhLENBaUx6QjtZQWpMWSx5QkFBYSxnQkFpTHpCLENBQUE7UUFHTCxDQUFDLEVBL0xvQixXQUFXLEdBQVgsZUFBVyxLQUFYLGVBQVcsUUErTC9CO0lBQUQsQ0FBQyxFQS9MZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBK0xuQjtBQUFELENBQUMsRUEvTFMsTUFBTSxLQUFOLE1BQU0sUUErTGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkVzcy5EaWFsb2dzIHtcclxuXHJcblx0LyoqXHJcblx0ICogT3RldsWZw610IGRpYWxvZyBub3bDqWhvIGV4cG9ydHVcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge0dDb250ZW50fSBwYXJlbnRDb250ZW50XHJcblx0ICogQHBhcmFtIHt7IGlkPzogc3RyaW5nIH19IG9wdFxyXG5cdCAqIEBwYXJhbSB7R29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaX0gW01vZE90ZXZyZW5pXVxyXG5cdCAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPGFueT59XHJcblx0ICovXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIEdFc3NOZXdFc3NEbGcoXHJcblx0XHRwYXJlbnRDb250ZW50OiBHQ29udGVudCxcclxuXHRcdG9wdDogeyByb3dzOiBHb3JkaWMuRXNzLkludGVyZmFjZS5HRXNzRXhwb3J0SXhwRHRvW10gfSB8IG51bGwsXHJcblx0XHRNb2RPdGV2cmVuaT86IEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmlcclxuXHQpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcclxuXHRcdFx0SUQ6IFwiR0Vzc05ld0VzcyNcIixcclxuXHRcdFx0Um93czogb3B0ID8gb3B0LnJvd3MgOiB1bmRlZmluZWRcclxuXHRcdH07XHJcblx0XHRjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuXHRcdGNvbnN0IHBDb250ZW50ID0gR29yZGljLkdpbi5HbG9iYWxzLkRpYWxvZ3MuWmtvbnRyb2x1akNvbnRlbnQocGFyZW50Q29udGVudCk7XHJcblx0XHRNb2RPdGV2cmVuaSA9IEdvcmRpYy5HaW4uR2xvYmFscy5EaWFsb2dzLlVwcmF2TW9kT3RldnJuaShwQ29udGVudCwgTW9kT3RldnJlbmkpO1xyXG5cdFx0bGV0IGlzVmFsaWQgPSB0cnVlO1xyXG5cdFx0aWYgKGlzVmFsaWQpIHtcclxuXHRcdFx0R29yZGljLkd1aS5EaWFsb2dzLl9vcGVuRGlhbG9nKHBDb250ZW50LCBkZWZlcnJlZCwgJ0dvcmRpYy5Fc3MuV2ViQ29udHJvbHMuR0Vzc0V4cG9ydCcsIE1vZE90ZXZyZW5pLCBvcHRpb25zKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRlZmVycmVkLnJlamVjdCgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBTcHVzdGl0IGZpbmFsaXphY2kgaW1wb3J0dVxyXG5cdCAqL1xyXG5cdGV4cG9ydCBmdW5jdGlvbiBHRXNzRmluYWxpemVJbXBvcnREbGcoXHJcblx0XHRwYXJlbnRDb250ZW50OiBHQ29udGVudCxcclxuXHRcdG9wdDogeyBkdG86IEdvcmRpYy5Fc3MuSW50ZXJmYWNlLkdFc3NJbXBvcnRJbnB1dER0byB9IHwgbnVsbCxcclxuXHRcdE1vZE90ZXZyZW5pPzogR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaVxyXG5cdCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBvcHRpb25zID0ge1xyXG5cdFx0XHRJRDogXCJHRXNzRmluYWxpemVJbXBvcnRJRCNcIixcclxuXHRcdFx0RHRvOiBvcHQgPyBvcHQuZHRvIDogdW5kZWZpbmVkXHJcblx0XHR9O1xyXG5cdFx0Y29uc3QgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcblx0XHRjb25zdCBwQ29udGVudCA9IEdvcmRpYy5HaW4uR2xvYmFscy5EaWFsb2dzLlprb250cm9sdWpDb250ZW50KHBhcmVudENvbnRlbnQpO1xyXG5cdFx0TW9kT3RldnJlbmkgPSBHb3JkaWMuR2luLkdsb2JhbHMuRGlhbG9ncy5VcHJhdk1vZE90ZXZybmkocENvbnRlbnQsIE1vZE90ZXZyZW5pKTtcclxuXHRcdGxldCBpc1ZhbGlkID0gdHJ1ZTtcclxuXHRcdGlmIChpc1ZhbGlkKSB7XHJcblx0XHRcdEdvcmRpYy5HdWkuRGlhbG9ncy5fb3BlbkRpYWxvZyhwQ29udGVudCwgZGVmZXJyZWQsICdHb3JkaWMuRXNzLldlYkNvbnRyb2xzLkdFc3NGaW5hbGl6ZUltcG9ydCcsIE1vZE90ZXZyZW5pLCBvcHRpb25zKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRlZmVycmVkLnJlamVjdCgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBHRXNzU2V6bmFtRGF2a3lEbGcoXHJcblx0XHRwYXJlbnRDb250ZW50OiBHQ29udGVudCxcclxuXHRcdG9wdDogeyB0eXBEYXZreTogR29yZGljLkVzcy5JbnRlcmZhY2UuR0Vzc1R5cERhdlJzc0VudW0gfSB8IG51bGwsXHJcblx0XHRNb2RPdGV2cmVuaT86IEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmlcclxuXHQpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcclxuXHRcdFx0SUQ6IFwiR0Vzc1Nlem5hbURhdmt5SUQjXCIsXHJcblx0XHRcdFR5cERhdmt5OiBvcHQgPyBvcHQudHlwRGF2a3kgOiB1bmRlZmluZWRcclxuXHRcdH07XHJcblx0XHRjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuXHRcdGNvbnN0IHBDb250ZW50ID0gR29yZGljLkdpbi5HbG9iYWxzLkRpYWxvZ3MuWmtvbnRyb2x1akNvbnRlbnQocGFyZW50Q29udGVudCk7XHJcblx0XHRNb2RPdGV2cmVuaSA9IEdvcmRpYy5HaW4uR2xvYmFscy5EaWFsb2dzLlVwcmF2TW9kT3RldnJuaShwQ29udGVudCwgTW9kT3RldnJlbmkpO1xyXG5cdFx0bGV0IGlzVmFsaWQgPSB0cnVlO1xyXG5cdFx0aWYgKGlzVmFsaWQpIHtcclxuXHRcdFx0R29yZGljLkd1aS5EaWFsb2dzLl9vcGVuRGlhbG9nKHBDb250ZW50LCBkZWZlcnJlZCwgJ0dvcmRpYy5Fc3MuV2ViQ29udHJvbHMuR0Vzc1Nlem5hbURhdmt5JywgTW9kT3RldnJlbmksIG9wdGlvbnMpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGVmZXJyZWQucmVqZWN0KCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIEdFc3NEZXRhaWxEYXZrYURsZyhcclxuXHRcdHBhcmVudENvbnRlbnQ6IEdDb250ZW50LFxyXG5cdFx0b3B0OiB7IGRhdmthX2lkOiBudW1iZXIsIGl4c19leHQ6IHN0cmluZyB9IHwgbnVsbCxcclxuXHRcdE1vZE90ZXZyZW5pPzogR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaVxyXG5cdCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBvcHRpb25zID0ge1xyXG5cdFx0XHRJRDogXCJHRXNzRGV0YWlsRGF2a2FJRCNcIixcclxuXHRcdFx0SXhzRXh0OiBvcHQgPyBvcHQuaXhzX2V4dCA6IHVuZGVmaW5lZCxcclxuXHRcdFx0RGF2a2FJZDogb3B0ID8gb3B0LmRhdmthX2lkIDogdW5kZWZpbmVkXHJcblx0XHR9O1xyXG5cdFx0Y29uc3QgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcblx0XHRjb25zdCBwQ29udGVudCA9IEdvcmRpYy5HaW4uR2xvYmFscy5EaWFsb2dzLlprb250cm9sdWpDb250ZW50KHBhcmVudENvbnRlbnQpO1xyXG5cdFx0TW9kT3RldnJlbmkgPSBHb3JkaWMuR2luLkdsb2JhbHMuRGlhbG9ncy5VcHJhdk1vZE90ZXZybmkocENvbnRlbnQsIE1vZE90ZXZyZW5pKTtcclxuXHRcdGxldCBpc1ZhbGlkID0gdHJ1ZTtcclxuXHRcdGlmIChpc1ZhbGlkKSB7XHJcblx0XHRcdEdvcmRpYy5HdWkuRGlhbG9ncy5fb3BlbkRpYWxvZyhwQ29udGVudCwgZGVmZXJyZWQsICdHb3JkaWMuRXNzLldlYkNvbnRyb2xzLkdFc3NEZXRhaWxEYXZrYScsIE1vZE90ZXZyZW5pLCBvcHRpb25zKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRlZmVycmVkLnJlamVjdCgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHR9XHJcblxyXG5cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuRXNzLldlYkNvbnRyb2xzXHJcbntcclxuICAgIGV4cG9ydCBlbnVtIFR5cEVudGl0eSB7XHJcbiAgICAgICAgU291Ym9yID0gXCJTb3Vib3JcIixcclxuICAgICAgICBEb2t1bWVudCA9IFwiRG9rdW1lbnRcIixcclxuICAgICAgICBTcGlzID0gXCJTcGlzXCIsXHJcbiAgICAgICAgVHlwb3Z5U3BpcyA9IFwiVHlwb3Z5U3Bpc1wiXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHRXNzVXRpbHNcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciB0aGF6bXVrYVxyXG4gICAgICogQHNpbmNlIDUyNTEwLjFcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEdFc3NVdGlscyB7XHJcblxyXG4gICAgICAgIHB1YmxpYyB3YWl0Rm9yVmFsdWVzKGZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD4pOiBKUXVlcnlQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICAgICAgdmFyIGRmZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgZm9ybS5nZm9ybShcIndhaXRGb3JWYWx1ZXNcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5nZm9ybShcImlzVmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGlzVmFsaWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlKGlzVmFsaWQsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZShpc1ZhbGlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRmZC5yZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIGRmZC5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWYWxpZGFjZSBzbG91cGPFryBwcm8gaGxlZMOhbsOtIHBybyBzZXpuYW15XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHZhbGlkYXRlU2VhcmNoQ29sdW1uczxUPihzZWFyY2hDb2x1bW5zOiBzdHJpbmdbXSwgaW5wdXRDb2x1bW5zOiBHR3JpZENvbHVtbjxUPltdKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBpbnB1dENvbHVtbnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5zID0gaW5wdXRDb2x1bW5zW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5zLm5hbWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIG5lbsOtIHNsb3VwZWMgb2JzYcW+ZW4gdmUgdsO9c2xlZG7DqW0gcG9saSwgdGFrIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWFyY2hDb2x1bW5zLmluY2x1ZGVzKGNvbHVtbnMubmFtZSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnMucHVzaChjb2x1bW5zLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRvd25sb2FkRmlsZShndWlkOiBzdHJpbmcsIGNudDogR0NvbnRlbnRUeXBlPGFueT4pIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGR0byA9IHtcclxuICAgICAgICAgICAgICAgIERvd25sb2FkZXJUeXBlOiBcIkdvcmRpYy5XZmwuV2ViQ2xpZW50LldmbEd1aWREb3dubG9hZGVyXCIsXHJcbiAgICAgICAgICAgICAgICBBdXRvRG93bmxvYWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBEaXNhYmxlUGx1Z2luRG93bmxvYWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBDdXN0b21EYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJHdWlkXCI6IGd1aWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRvYyA9IG5ldyBHRG9jdW1lbnQoY250KTtcclxuICAgICAgICAgICAgY250LmxvZy50cmFjZShcInpvYnJheml0U291Ym9yIGd1aWQ6XCIgKyBndWlkKTtcclxuXHJcbiAgICAgICAgICAgIGRvYy5kb3dubG9hZERvY3VtZW50KGR0bylcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjbnQubG9nLnRyYWNlKFwiUHJvYsSbaGxvIHN0YcW+ZW7DrSBzb3Vib3J1LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjbnQubm90aWZpY2F0aW9uKFwiYWRkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1pbmZvXCIsIGNvbnRlbnQ6IFwianJlczozMjAwMDA0NVwiLCBzdGF0ZTogXCJzdWNjZXNzXCIgLy9SQyAzMjAwMDA0NSA6IFByb2LEm2hsIMO6c3DEm8WhbsO9IGV4cG9ydCBhIHN0YcW+ZW7DrSBzb3Vib3J1LlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjbnQubG9nLnRyYWNlKFwiU3Rhxb5lbsOtIG5lZG9wYWRsb1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBjbnQubm90aWZpY2F0aW9uKFwiYWRkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1pbmZvXCIsIGNvbnRlbnQ6IFwianJlczozMjAwMDA0NFwiLCBzdGF0ZTogXCJlcnJvclwiIC8vUkMgMzIwMDAwNDQgOiBOZXBvZGHFmWlsbyBzZSBwcm92w6lzdCBleHBvcnQuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGd1aWQgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR0ZpbGUoKS5yZW1vdmVGaWxlKGd1aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsIm5hbWVzcGFjZSBHb3JkaWMuRXNzLldlYkNvbnRyb2xzIHtcclxuXHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogw5p2b2Ruw60gc3Ryw6Fua2EgRVNTXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgdGhhem11a2FcclxuICAgICAqIEBzaW5jZSA1MjUxMC4xXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdFc3NEYXNoYm9hcmQgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIE5hemV2UmVmOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBOYXpldkZ1bjogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgRGF0TG9naW5UeHQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkSGVscENvbnRleHQoJ1N0YXJ0UGFnZScpO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ09wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkdvcmRpYy5Fc3MuV2ViQ29udHJvbHMuR0Vzc0Rhc2hib2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IFwiR0Vzc0Rhc2hib2FyZC50c1wiLFxyXG4gICAgICAgICAgICAgICAgYXV0aG9yQ29kZTogNDg3XHRcdC8vMDQ4N1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTW9kdWxlSW5mbygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkTW9kdWxlSW5mbygpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICAgICAgdmFyIHNlY29uZGFyeVRleHQgPSB0aGlzLk5hemV2UmVmICsgXCIgfCBcIiArIHRoaXMuTmF6ZXZGdW4gKyBcIiB8IFwiICsgXCJqcmVzOjMyMDAwMDA3XCIgKyBcIjogXCIgKyB0aGlzLkRhdExvZ2luVHh0OyAvL1JDIDMyMDAwMDA3IDogUG9zbGVkbsOtIHDFmWlobMOhxaFlbsOtXHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YTogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgZGF0YS5wdXNoKG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImtwaUxhc3RVc2VkXCIgKyBcIl9cIiArIGksXHJcbiAgICAgICAgICAgICAgICBpbWFnZTogR29yZGljLlV0aWxzLkljb25CdWlsZGVyLmRlZmF1bHRJbnN0LmNyZWF0ZU1vZHVsZUljb24oXCJHU0FFU1MwMVwiKSxcclxuICAgICAgICAgICAgICAgIHByaW1hcnlUZXh0OiBcImpyZXM6MzIwMDAwMDRcIiwgLy9SQyAzMjAwMDAwNCA6IEV4cG9ydC1JbXBvcnQgb3BlcmFjw60gcyBkb2t1bWVudHkgZGxlIE5TRVNTXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRhcnlUZXh0OiBzZWNvbmRhcnlUZXh0LFxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkYXRhVmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEsIHsga2V5OiBcIm5hbWVcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtb2R1bGVJbmZvSXRlbXMgPSBuZXcgR29yZGljLkRhdGEuVmlldyhbe1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwibW9kdWxJbmZvXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMyMDAwMDA2XCIsIC8vUkMgMzIwMDAwMDYgOiBNb2R1bFxyXG4gICAgICAgICAgICAgICAgem9uZTogMSxcclxuICAgICAgICAgICAgICAgIG1vZGU6IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaUltYWdlVHdvUm93c1RleHRUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhVmlldyxcclxuICAgICAgICAgICAgICAgIG1lbnVQYXJhbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcmV0d2VldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0TW9kdWxSZWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uVmlzaWJsZTogR0FjdGlvbi5jYXB0aW9uVmlzaWJpbGl0eS5uZXZlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDAwNVwiLCAvL1JDIDMyMDAwMDA1IDogQWt0dWFsaXpvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfV0sIHsga2V5OiBbXCJpZFwiXSB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBnZGFzaGJvYXJkID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIGdkYXNoYm9hcmRcclxuICAgICAgICAgICAgICAgIC5nZGFzaGJvYXJkcGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm1vZHVsSW5mb1BhbmVsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBtb2R1bGVJbmZvSXRlbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0OiBcImhvcml6b250YWxcIixcclxuICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLkVzcy5XZWJDb250cm9scyB7XHJcblxyXG4gICAgY29uc3QgeyBnY29udGVudCB9ID0gRGVjb3JhdG9ycztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVTUzogRGV0YWlsIGTDoXZreVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIHRoYXptdWthXHJcbiAgICAgKiBAc2luY2UgNTI1MTAuMVxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRXNzRGV0YWlsRGF2a2EgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIERhdmthSWQ6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSBmb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgdmlldzogR29yZGljLklzbC5WaWV3PEdvcmRpYy5Fc3MuSW50ZXJmYWNlLkdFc3NSc3NkZGF2RHRvPjtcclxuICAgICAgICBwcml2YXRlIEl4c0V4dDogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgdXRpbHNDbnQ6IEdDb250ZW50O1xyXG4gICAgICAgIHByaXZhdGUgRGF0Wm1lbmE6IERhdGU7XHJcbiAgICAgICAgcHJpdmF0ZSBEYXRhOiBFc3MuSW50ZXJmYWNlLkdFc3NSc3NzZGF2RHRvO1xyXG5cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBwxZlpcHJhdmVubyBrZSBzbWF6w6Fuw61cclxuICAgICAgICAgICAgaWYgKHRoaXMuRGF0YS5zdGF2X2Rhdmt5X3JzcyAhPSBudWxsICYmIHRoaXMuRGF0YS5zdGF2X2Rhdmt5X3JzcyA9PT0gMjEwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImlkUHJpcFNtYXphdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwianJlczozMjAwMDIwNlwiIC8vUkMgMzIwMDAyMDYgOiBQxZllbm9zIHBvdHZyemVuw71jaCBlbnRpdCBieWwgdWtvbsSNZW4sIGx6ZSBwcm92w6lzdCBzbWF6w6Fuw60gcMWZZW5lc2Vuw71jaCBlbnRpdFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHBvdXplIHDFmWkgaW1wb3J0dVxyXG4gICAgICAgICAgICBpZiAodGhpcy5EYXRhLnR5cF9kYXZfcnNzX3R4dCAhPSBudWxsICYmIHRoaXMuRGF0YS50eXBfZGF2X3JzcyA9PT0gMjApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTWVudWJhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kYmFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgdmFyIEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkZvcm1FeHBvcnREb2tTcGlzXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMSwgYnJlYWtzLTcwMC0xMDAwXCIgfSk7XHJcblxyXG4gICAgICAgICAgICBGb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlwiKSAgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMjAwMDIwMVwiKSAvL1JDIDMyMDAwMjAxIDogSUQgZMOhdmt5XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdmthX2lkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzIwMDAxOTNcIikgLy9SQyAzMjAwMDE5MyA6IERhdHVtIHBvc2xlZG7DrSB6bcSbbnlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlVHlwZTogXCJkYXRldGltZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMyMDAwMTk2XCIpIC8vUkMgMzIwMDAxOTYgOiBUeXAgZMOhdmt5XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9kYXZfcnNzX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMyMDAwMTk3XCIpIC8vUkMgMzIwMDAxOTcgOiDDmsSNZWwgZMOhdmt5XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjZWxfZGF2a3lcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMjAwMDE5OFwiKSAvL1JDIDMyMDAwMTk4IDogUG96bsOhbWthXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJcIikgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzIwMDAxOTRcIikgLy9SQyAzMjAwMDE5NCA6IFpkcm9qXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpkcm9qXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzIwMDAxOTVcIikgLy9SQyAzMjAwMDE5NSA6IEPDrWxcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2lsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzIwMDAxOTlcIikgLy9SQyAzMjAwMDE5OSA6IFN0YXYgZMOhdmt5XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfZGF2a3lfcnNzX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMyMDAwMjAwXCIpIC8vUkMgMzIwMDAyMDAgOiBabcSbbnUgcHJvdmVkbFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6bWVudV9wcm92X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmZvcm0uZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIEZvcm0pO1xyXG4gICAgICAgICAgICB0aGlzLmZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5EYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5mb3JtLmdmb3JtKFwidmlld01vZGVcIiwgXCJ2aWV3XCIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudWJhcigpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtczogTWVudVBhcmFtc1tdID0gW107XHJcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHZW5lcmF0ZUFuc3dlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE2M1wiLCAvL1JDIDMyMDAwMTYzIDogVnlnZW5lcm92YXQgcG90dnJ6b3ZhY8OtIGTDoXZrdVxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnV0aWxzQ250ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXRpbHNDbnQgPSBuZXcgR0NvbnRlbnQoXCJHb3JkaWMuRXNzLldlYkNvbnRyb2xzLkdFc3NVdGlsc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnV0aWxzQ250XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChcIkdldEVzc09kcG92ZWQyMDI0XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHNFeHQ6IHRoaXMuSXhzRXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdmthSWQ6IHRoaXMuRGF2a2FJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChndWlkOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPS1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChndWlkICE9IG51bGwgJiYgZ3VpZCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHRXNzVXRpbHMoKS5kb3dubG9hZEZpbGUoZ3VpZCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRiYXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXM6IE1lbnVQYXJhbXNbXSA9IFtdO1xyXG4gICAgICAgICAgICBwYXJhbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDAxOFwiLCAvL1JDIDMyMDAwMDE4IDogWmF2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRGaWx0ZXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmo6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICBvYmpbXCJkYXZrYV9pZFwiXSA9IHRoaXMuRGF2a2FJZDsgLy8gcMWZaWTDoW7DrSBJRCBkw6F2a3kgZG8gZmlsdHJ1XHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldFN0cmluZ05hbWVzT2ZDb2x1bW5zKGNvbHVtbnM6IEdHcmlkQ29sdW1uPGFueT5bXSkge1xyXG4gICAgICAgICAgICAvLyBwxZlpZGF0IG7DoXp2eSBzbG91cGPFryBkbyDFmWV0xJt6Y2VcclxuICAgICAgICAgICAgdmFyIGNvbHVtbkxpc3QgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgY29sdW1ucy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5zW2luZGV4XVtcInZpc2libGVcIl0gPT09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSDEjcOhcmt5IHDFmWVkIHDFmWlkYW7DvSBuw6F6ZXYsIHogdsO9amlta291IHBydm7DrWhvIG7DoXp2dVxyXG4gICAgICAgICAgICAgICAgY29sdW1uTGlzdCA9IGluZGV4ID09PSAwID8gY29sdW1uTGlzdCA6IGNvbHVtbkxpc3QgKyBcIixcIjtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkxpc3QgKz0gY29sdW1uc1tpbmRleF0ubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY29sdW1uTGlzdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IHtcclxuICAgICAgICAgICAgICAgIGtleTogXCJwb3JhZGlcIixcclxuICAgICAgICAgICAgICAgIHN0YXJ0RW1wdHk6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudmlldyA9IG5ldyBHb3JkaWMuSXNsLlZpZXcoR29yZGljLklzbC5Fc3MubGlzdFJzc2RkYXYocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcnEuZmlsdGVycyA9IHRoaXMuZ2V0RmlsdGVyKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcnE7XHJcbiAgICAgICAgICAgIH0pLCBpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gLS0gZm9ybWF0IC0tXHJcblxyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuRXNzLkludGVyZmFjZS5HRXNzUnNzZGRhdkR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIGZvcm1hdFxyXG4gICAgICAgICAgICAgICAgLy8uYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwicG9yYWRpXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxMTdcIiwgLy9SQyAzMjAwMDExNyA6IFBvxZlhZMOtXHJcbiAgICAgICAgICAgICAgICAvLyAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2eXNsZWRla190eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxNDVcIiwgLy9SQyAzMjAwMDE0NSA6IFbDvXNsZWRla1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1NTAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX2VudGl0eV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxMjhcIiwgLy9SQyAzMjAwMDEyOCA6IFR5cCBlbnRpdHlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkX2VudGl0eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDIyN1wiLCAvL1JDIDMyMDAwMjI3IDogSUQgdiBleHBvcnRuw61tIElTXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDIyOFwiLCAvL1JDIDMyMDAwMjI4IDogTsOhemV2IGVudGl0eSAvIHbEm2NcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNwaXNfem5ha1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDEzNFwiLCAvL1JDIDMyMDAwMTM0IDogU3Bpc292w70gem5ha1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib3Rpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxMjdcIiwgLy9SQyAzMjAwMDEyNyA6IE90aXNrXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBmb3JtYXRcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X2V4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE2MVwiLCAvL1JDIDMyMDAwMTYxIDogTsOhemV2IGV4dGVybsOtaG8gc3lzdMOpbXVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF2a2FfaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAyMTZcIiwgLy9SQyAzMjAwMDIxNiA6IEludGVybsOtIMSNw61zbG8gZMOhdmt5XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1bWlzdGVuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDIxN1wiLCAvL1JDIDMyMDAwMjE3IDogQWRyZXPDocWZIHYgWklQXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJqbWVub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDIxOFwiLCAvL1JDIDMyMDAwMjE4IDogSm3DqW5vIHYgWklQXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJyc3NfcG9yX2Npc2xvXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxMzBcIiwgLy9SQyAzMjAwMDEzMCA6IElEIHhtbCBkw6F2a3kgdiBEQlxyXG4gICAgICAgICAgICAgICAgLy8gICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJ2eWJlclwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMTMxXCIsIC8vUkMgMzIwMDAxMzEgOiBWw71ixJtyIHBydmt1XHJcbiAgICAgICAgICAgICAgICAvLyAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0X3puYWNrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDEzNVwiLCAvL1JDIDMyMDAwMTM1IDogQWt0IHpuYcSNa2FcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJhcmNvZGVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxMzNcIiwgLy9SQyAzMjAwMDEzMyA6IEJhcmNvZGVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpkcm9qaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxMzZcIiwgLy9SQyAzMjAwMDEzNiA6IFpkcm9qIElEXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImhvZG5vdGFpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDEzN1wiLCAvL1JDIDMyMDAwMTM3IDogSG9kbm90YSBJRFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMjIwXCIsIC8vUkMgMzIwMDAyMjAgOiBQSUQgR0lOSVNcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4YlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDIyMVwiLCAvL1JDIDMyMDAwMjIxIDogSVMgc291Ym9ydSBHSU5JU1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX3NwaXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAyMjJcIiwgLy9SQyAzMjAwMDIyMiA6IFBJRCBzcGlzdSBHSU5JU1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX3NvdWNhc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAyMjNcIiwgLy9SQyAzMjAwMDIyMyA6IFBJRCBzb3XEjcOhc3RpIEdJTklTXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfdG9wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMjI0XCIsIC8vUkMgMzIwMDAyMjQgOiBQSUQgdHlwb3bDqWhvIHNwaXN1IEdJTklTXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfdnNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMTQxXCIsIC8vUkMgMzIwMDAxNDEgOiBJRCB2xJtjbsOpIHNrdXBpbnkgR0lOSVNcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19ya3JcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAyMjVcIiwgLy9SQyAzMjAwMDIyNSA6IElEIHNrYXJ0YcSNbsOtaG8gcmXFvmltdSBHSU5JU1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJnb3JfZXJyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMTQzXCIsIC8vUkMgMzIwMDAxNDMgOiBLw7NkIHpwcmFjb3bDoW7DrSAoZ29yX2VycilcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzcWxfZXJyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJzcWxfZXJyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNhbV9lcnJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImlzYW1fZXJyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVycl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImVycl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibG9ja19lcnJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImxvY2tfZXJyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnlzbGVkZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxNDRcIiwgLy9SQyAzMjAwMDE0NCA6IFbDvXNsZWRlayBpbXBvcnR1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE0NlwiLCAvL1JDIDMyMDAwMTQ2IDogUG96bsOhbWthXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3BvdHZyelwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE0N1wiLCAvL1JDIDMyMDAwMTQ3IDogRGF0dW0gcG90dnJ6ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNjAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3BvdHZyelwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE0OFwiLCAvL1JDIDMyMDAwMTQ4IDogU3RhdiBwb3R2cnplbsOtIHDFmWVub3N1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X2RlbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE1MFwiLCAvL1JDIDMyMDAwMTUwIDogxIxhcyBzbWF6w6Fuw60gcHJ2a3VcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTYwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpel9kZWxcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxNjJcIiwgLy9SQyAzMjAwMDE2MiA6IFDFmcOtem5hayBzbWF6w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIHNsb3VwY2UgbmEgcHJvaGxlZMOhdsOhbsOtIFxyXG4gICAgICAgICAgICB2YXIgc2VhcmNoQ29sdW1ucyA9IFtdIGFzIHN0cmluZ1tdO1xyXG4gICAgICAgICAgICBuZXcgR0Vzc1V0aWxzKCkudmFsaWRhdGVTZWFyY2hDb2x1bW5zKHNlYXJjaENvbHVtbnMsIGZvcm1hdC5jb2x1bW5zKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgZGVmYXVsdFByb2ZpbGU6IEdyaWRQcm9maWxlPEdvcmRpYy5XZmwuSW50ZXJmYWNlLkdQb2RwaXNvdmFLbmloYUR0bz4gPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImpyZXM6MzIwMDAyMjZcIiwgLy9SQyAzMjAwMDIyNiA6IFbDvWNob3rDrSBwcm9maWxcclxuICAgICAgICAgICAgICAgIF9sb2NrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiB0aGlzLmdldFN0cmluZ05hbWVzT2ZDb2x1bW5zKGZvcm1hdC5jb2x1bW5zKSxcclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdj5cIikuZ2F1dG9maXQoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IGRlZmF1bHRQcm9maWxlLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy52aWV3LFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJncmlkRGV0YWlsRGF2a2FcIixcclxuICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIixcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IGZvcm1hdCxcclxuICAgICAgICAgICAgICAgIHNvcnQ6IFwicG9yYWRpXCIsXHJcbiAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBzZWFyY2hDb2x1bW5zXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuRXNzLldlYkNvbnRyb2xzIHtcclxuXHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRVNTOiBTZXpuYW0gZMOhdmVrXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgdGhhem11a2FcclxuICAgICAqIEBzaW5jZSA1MjUxMC4xXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdFc3NTZXpuYW1EYXZreSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIHZpZXc6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuRXNzLkludGVyZmFjZS5HRXNzUnNzc2RhdkR0bz47XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXJEYXRhOiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXI6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51YmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlsdGVycGFuZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZGJhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kYmFyKCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zOiBNZW51UGFyYW1zW10gPSBbXTtcclxuICAgICAgICAgICAgcGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAwMThcIiwgLy9SQyAzMjAwMDAxOCA6IFphdsWZw610XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIocGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudWJhcigpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtczogTWVudVBhcmFtc1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBwYXJhbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3REZXRhaWxEYXZrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDEyMlwiLCAvL1JDIDMyMDAwMTIyIDogRGV0YWlsIGTDoXZreVxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyaWQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoaXMuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbiA9PSBudWxsIHx8IHNlbGVjdGlvbi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gxZnDoWRlay5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93OiBHb3JkaWMuRXNzLkludGVyZmFjZS5HRXNzUnNzc2RhdkR0byA9IHNlbGVjdGlvblswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsIHx8IHJvdy5kYXZrYV9pZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTmVuw60gayBkaXNwb3ppY2kgZGF2a2FfaWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbCB8fCByb3cuaXhzX2V4dCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTmVuw60gayBkaXNwb3ppY2kgaXhzX2V4dC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVzcy5EaWFsb2dzLkdFc3NEZXRhaWxEYXZrYURsZyh0aGlzLCB7IGRhdmthX2lkOiByb3cuZGF2a2FfaWQhLCBpeHNfZXh0OiByb3cuaXhzX2V4dCEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIocGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVycGFuZWwoKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlciA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXIub24oXCJnZmlsdGVycGFuZWxhcHBseVwiLCAoZXZlbnQsIG9iaikgPT4geyAgICAgICAgIC8vIGV2ZW50YSBrdGVyw6EgamUgdnl2b2zDoW5hIHDFmWkgdnlobGVkw6F2w6Fuw60uIG9iai5maWx0ZXIgLT4gaGxlZGFuw70gc2V6bmFtIHBvZG3DrW5la1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iaiAhPSBudWxsICYmIG9iai5maWx0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXIgPSBvYmouZmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YSA9IGZpbHRlcjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlclxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVzOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJTZXR0aW5nczogdGhpcy51c2VyU2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFt0aGlzLmNyZWF0ZUZpbHRlckZvcm0oKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvYWRBZnRlckNyZWF0ZVBhbmVsOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlckZvcm0oKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiRm9ybUZpbHRlckdyaWRcIixcclxuICAgICAgICAgICAgICAgIHRhYkxhYmVsOiBcIkZpbHRyXCIsXHJcbiAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTEsIGJyZWFrcy03MDAtMTAwMFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZmlsdGVyRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG5cclxuICAgICAgICAgICAgZmlsdGVyRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IHJlcXVpcmVkOiB0cnVlLCBsYWJlbDogXCJqcmVzOjMyMDAwMDQ4XCIgfSkgLy9SQyAzMjAwMDA0OCA6IEV4dGVybsOtIHN5c3TDqW1cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmludHNleHQoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX2V4dD12YWx1ZS5peHNfZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogWzEwMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaXpfZXNzOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJ6ZV9lc3M6IFwiTlMyMDI0XCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgZmlsdGVyRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IHJlcXVpcmVkOiB0cnVlLCBsYWJlbDogXCJqcmVzOjMyMDAwMTEzXCIgfSkgLy9SQyAzMjAwMDExMyA6IFR5cCBkw6F2a3lcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX2Rhdl9yc3NcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCIgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFc3MuSW50ZXJmYWNlLkdFc3NUeXBEYXZSc3NFbnVtLlByZW5vcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRXNzLkludGVyZmFjZS5HRXNzVHlwRGF2UnNzRW51bS5FeHBvcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVzcy5JbnRlcmZhY2UuR0Vzc1R5cERhdlJzc0VudW0uSW1wb3J0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0Vzcy5JbnRlcmZhY2UuR0Vzc1R5cERhdlJzc0VudW0uUG90dnJ6ZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IChpdGVtKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSA9PT0gRXNzLkludGVyZmFjZS5HRXNzVHlwRGF2UnNzRW51bS5FeHBvcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzIwMDAxMTRcIjsgLy9SQyAzMjAwMDExNCA6IEV4cG9ydFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW0gPT09IEVzcy5JbnRlcmZhY2UuR0Vzc1R5cERhdlJzc0VudW0uSW1wb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMyMDAwMTE1XCI7IC8vUkMgMzIwMDAxMTUgOiBJbXBvcnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpdGVtID09PSBFc3MuSW50ZXJmYWNlLkdFc3NUeXBEYXZSc3NFbnVtLlByZW5vcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMjAwMDE2OVwiOyAvL1JDIDMyMDAwMTY5IDogUMWZZW5vc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW0gPT09IEVzcy5JbnRlcmZhY2UuR0Vzc1R5cERhdlJzc0VudW0uUG90dnJ6ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMyMDAwMTcwXCI7IC8vUkMgMzIwMDAxNzAgOiBQb3R2cnplbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBmaWx0ZXJGb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgcmVxdWlyZWQ6IGZhbHNlLCBsYWJlbDogXCJqcmVzOjMyMDAwMjA4XCIgfSkgLy9SQyAzMjAwMDIwOCA6IFN0YXYgZMOhdmt5XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfZGF2a3lfcnNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRXNzLkludGVyZmFjZS5HRXNzU3RhdkRhdmt5UnNzRW51bS5QcmlwcmF2b3ZhbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVzcy5JbnRlcmZhY2UuR0Vzc1N0YXZEYXZreVJzc0VudW0uUHJpcHJhdmVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRXNzLkludGVyZmFjZS5HRXNzU3RhdkRhdmt5UnNzRW51bS5PZGVzbGFuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRXNzLkludGVyZmFjZS5HRXNzU3RhdkRhdmt5UnNzRW51bS5Qb3R2cnplbmFLbGFkbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVzcy5JbnRlcmZhY2UuR0Vzc1N0YXZEYXZreVJzc0VudW0uUG90dnJ6ZW5hQ2FzdGVjbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVzcy5JbnRlcmZhY2UuR0Vzc1N0YXZEYXZreVJzc0VudW0uUG90dnJ6ZW5hWmFwb3JuZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRXNzLkludGVyZmFjZS5HRXNzU3RhdkRhdmt5UnNzRW51bS5TdG9ybm92YW5hXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IChpdGVtKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSA9PT0gRXNzLkludGVyZmFjZS5HRXNzU3RhdkRhdmt5UnNzRW51bS5QcmlwcmF2b3ZhbmEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzIwMDAyMDlcIjsgLy9SQyAzMjAwMDIwOSA6IFDFmWlwcmF2b3ZhbsOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXRlbSA9PT0gRXNzLkludGVyZmFjZS5HRXNzU3RhdkRhdmt5UnNzRW51bS5QcmlwcmF2ZW5hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMyMDAwMjEwXCI7IC8vUkMgMzIwMDAyMTAgOiBQxZlpcHJhdmVuw6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpdGVtID09PSBFc3MuSW50ZXJmYWNlLkdFc3NTdGF2RGF2a3lSc3NFbnVtLk9kZXNsYW5hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMyMDAwMjExXCI7IC8vUkMgMzIwMDAyMTEgOiBPZGVzbGFuw6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpdGVtID09PSBFc3MuSW50ZXJmYWNlLkdFc3NTdGF2RGF2a3lSc3NFbnVtLlBvdHZyemVuYUtsYWRuZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMjAwMDIxMlwiOyAvL1JDIDMyMDAwMjEyIDogUG90dnJ6ZW5hIGtsYWRuxJtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpdGVtID09PSBFc3MuSW50ZXJmYWNlLkdFc3NTdGF2RGF2a3lSc3NFbnVtLlBvdHZyemVuYUNhc3RlY25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMyMDAwMjEzXCI7IC8vUkMgMzIwMDAyMTMgOiBQb3R2cnplbmEgxI3DoXN0ZcSNbsSbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXRlbSA9PT0gRXNzLkludGVyZmFjZS5HRXNzU3RhdkRhdmt5UnNzRW51bS5Qb3R2cnplbmFaYXBvcm5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMyMDAwMjE0XCI7IC8vUkMgMzIwMDAyMTQgOiBQb3R2cnplbmEgesOhcG9ybsSbIChuZW5hxI10ZW5vKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW0gPT09IEVzcy5JbnRlcmZhY2UuR0Vzc1N0YXZEYXZreVJzc0VudW0uU3Rvcm5vdmFuYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMjAwMDIxNVwiOyAvL1JDIDMyMDAwMjE1IDogU3Rvcm5vdmFuw6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGZpbHRlckZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyByZXF1aXJlZDogZmFsc2UsIGxhYmVsOiBcImpyZXM6MzIwMDAxMTJcIiB9KSAvL1JDIDMyMDAwMTEyIDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWNvbWJvYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5kYXRfem1lbmE9dmFsdWUuZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRNZW51OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheXNSYW5nZTogNjBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJTZXR0aW5nczogdGhpcy51c2VyU2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEluaXRpYWxWYWx1ZTogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXlzUmFuZ2VNYXg6IDEwMDAwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJGb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRGaWx0ZXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmo6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJEYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG9iaiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5maWx0ZXJEYXRhKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSB7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiZGF2a2FfaWRcIixcclxuICAgICAgICAgICAgICAgIHN0YXJ0RW1wdHk6IHRydWVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IEdvcmRpYy5Jc2wuVmlldyhHb3JkaWMuSXNsLkVzcy5saXN0UnNzc2RhdihycSA9PiB7XHJcbiAgICAgICAgICAgICAgICBycS5maWx0ZXJzID0gdGhpcy5nZXRGaWx0ZXIoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBycTtcclxuICAgICAgICAgICAgfSksIGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5Fc3MuSW50ZXJmYWNlLkdFc3NSc3NzZGF2RHRvPigpO1xyXG5cclxuICAgICAgICAgICAgZm9ybWF0XHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldl9leHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxNTFcIiwgLy9SQyAzMjAwMDE1MSA6IEV4dGVybsOtIHN5c3TDqW1cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF2a2FfaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxMDVcIiwgLy9SQyAzMjAwMDEwNSA6IElEIGTDoXZreVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA5MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6ZHJvalwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDEwNlwiLCAvL1JDIDMyMDAwMTA2IDogWmRyb2pcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2lsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMTA3XCIsIC8vUkMgMzIwMDAxMDcgOiBDw61sXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE1MlwiLCAvL1JDIDMyMDAwMTUyIDogSUQgcMWvdm9kY2VcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9kYXZfcnNzX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE1M1wiLCAvL1JDIDMyMDAwMTUzIDogVHlwIGTDoXZreVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNlbF9kYXZreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDEwOVwiLCAvL1JDIDMyMDAwMTA5IDogw5rEjWVsIGTDoXZreVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxMDhcIiwgLy9SQyAzMjAwMDEwOCA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaGFzaF9hbGdvcml0bXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMTU0XCIsIC8vUkMgMzIwMDAxNTQgOiBIYXNoIGFsZ29yaXRtdXNcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfZGF2a3lfcnNzX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE1NVwiLCAvL1JDIDMyMDAwMTU1IDogU3RhdiBkw6F2a3lcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicnNzX3Bvcl9jaXNsb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE1NlwiLCAvL1JDIDMyMDAwMTU2IDogSUQgxI3DrXNsYSBYTUwgZMOhdmt5IHYgREJcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X2V4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE1OVwiLCAvL1JDIDMyMDAwMTU5IDogRGF0dW0gZXhwaXJhY2VcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTYwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfaW1wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMTU4XCIsIC8vUkMgMzIwMDAxNTggOiBEYXR1bSBpbXBvcnR1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE2MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3BvdHZyelwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE1N1wiLCAvL1JDIDMyMDAwMTU3IDogRGF0dW0gcG90dnJ6ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNjAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDExMVwiLCAvL1JDIDMyMDAwMTExIDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE2MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6bWVudV9wcm92X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE2MFwiLCAvL1JDIDMyMDAwMTYwIDogWm3Em251IHByb3ZlZGxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vIHNsb3VwY2UgbmEgcHJvaGxlZMOhdsOhbsOtIFxyXG4gICAgICAgICAgICB2YXIgc2VhcmNoQ29sdW1ucyA9IFtdIGFzIHN0cmluZ1tdO1xyXG4gICAgICAgICAgICBuZXcgR0Vzc1V0aWxzKCkudmFsaWRhdGVTZWFyY2hDb2x1bW5zKHNlYXJjaENvbHVtbnMsIGZvcm1hdC5jb2x1bW5zKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2PlwiKS5nYXV0b2ZpdCgpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHRcdFx0XHRcdFx0XHQvL29ic2x1em5hIGFrY2UsIGt0ZXJhIHNlIHNwb3VzdGkgZGJsIGNsaWNrZW0gbmFkIHJhZGtlbVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb3c6IEdvcmRpYy5Fc3MuSW50ZXJmYWNlLkdFc3NSc3NzZGF2RHRvID0gY3R4LmNlbGxJbmZvLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbCB8fCByb3cuZGF2a2FfaWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk5lbsOtIGsgZGlzcG96aWNpIGRhdmthX2lkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwgfHwgcm93Lml4c19leHQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk5lbsOtIGsgZGlzcG96aWNpIGl4c19leHQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVzcy5EaWFsb2dzLkdFc3NEZXRhaWxEYXZrYURsZyh0aGlzLCB7ZGF2a2FfaWQ6IHJvdy5kYXZrYV9pZCEsIGl4c19leHQ6IHJvdy5peHNfZXh0ISB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGZpbHRlcmluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMudmlldyxcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFNlem5hbURhdmt5XCIsXHJcbiAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIixcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBmb3JtYXQsXHJcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdmthX2lkXCIsXHJcbiAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBzZWFyY2hDb2x1bW5zLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG/FoWV0xZllbsOtIHDFmWkgemF2xZllbsOtIGNvbnRlbnR1XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoaXMuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uID09IG51bGwgfHwgc2VsZWN0aW9uLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGlvbnMuYWN0RGV0YWlsRGF2a2EgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsRGF2a2EuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuRXNzLldlYkNvbnRyb2xzIHtcclxuXHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRVNTOiBFeHBvcnRcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciB0aGF6bXVrYVxyXG4gICAgICogQHNpbmNlIDUyNTEwLjFcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0Vzc0V4cG9ydCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGZpbHRlcjogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkVzcy5JbnRlcmZhY2UuR0Vzc0V4cG9ydEl4cER0bz47XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXJEYXRhOiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSB1dGlsczogR0Vzc1V0aWxzO1xyXG4gICAgICAgIHByaXZhdGUgUm93czogR29yZGljLkVzcy5JbnRlcmZhY2UuR0Vzc0V4cG9ydEl4cER0b1tdO1xyXG5cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnV0aWxzID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXRpbHMgPSBuZXcgR0Vzc1V0aWxzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51YmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZpbHRlcnBhbmVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRiYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZGJhcigpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtczogTWVudVBhcmFtc1tdID0gW107XHJcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDE4XCIsIC8vUkMgMzIwMDAwMTggOiBaYXbFmcOtdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgdmFyIEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkZvcm1FeHBvcnREb2tTcGlzXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMSwgYnJlYWtzLTcwMC0xMDAwXCIgfSk7XHJcblxyXG4gICAgICAgICAgICBGb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzIwMDAwNTRcIikgIC8vUkMgMzIwMDAwNTQgOiBWc3R1cG7DrSBuYXN0YXZlbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgcmVxdWlyZWQ6IHRydWUsIGxhYmVsOiBcImpyZXM6MzIwMDAwNDhcIiB9KSAvL1JDIDMyMDAwMDQ4IDogRXh0ZXJuw60gc3lzdMOpbVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuaW50c2V4dCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkl4c0V4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLkl4c0V4dD12YWx1ZS5peHNfZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogWzEwMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaXpfZXNzOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJ6ZV9lc3M6IFwiTlMyMDI0XCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IHJlcXVpcmVkOiB0cnVlLCBsYWJlbDogXCJqcmVzOjMyMDAwMDQ5XCIgfSkgLy9SQyAzMjAwMDA0OSA6IETFr3ZvZCBwxZllbm9zdVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcigyNTQpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJEdXZvZFByZW5vc3VcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWluOiAwLCBtYXg6IDI1NCwgbWVzc2FnZTogXCJqcmVzOjMyMDAwMDUwXCIgfSkgLy9SQyAzMjAwMDA1MCA6IFBvbGUgZMWvdm9kdSBwxZllbm9zdSBuZXNtw60gYsO9dCBwcsOhemRuw6kgYSBtxa/FvmUgb2JzYWhvdmF0IG1heC4gMjU0IHpuYWvFry5cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd3M6IDJcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBGb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMjAwMDA1MVwiKSAvL1JDIDMyMDAwMDUxIDogUG96bsOhbWthXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkZpZWxkLmNoYXJDb3VudGVyKDI1NCkgLHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlBvem5hbWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWluOiAwLCBtYXg6IDI1NCwgbWVzc2FnZTogXCJqcmVzOjMyMDAwMDUyXCIgfSkgLy9SQyAzMjAwMDA1MiA6IFBvbGUgcG96bsOhbWt5IG5lc23DrSBiw710IHByw6F6ZG7DqSBhIG3Fr8W+ZSBvYnNhaG92YXQgbWF4LiAyNTQgem5ha8WvLlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm93czoyXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMyMDAwMDc4XCIpIC8vUkMgMzIwMDAwNzggOiBEYWzFocOtIG5hc3RhdmVuw61cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMyMDAwMDc5XCIpIC8vUkMgMzIwMDAwNzkgOiBWw71zdHVwbsOtIG7DoXpldiBzb3Vib3J1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkZpZWxkLmNoYXJDb3VudGVyKDI1NCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkZpbGVOYW1lXCIsIHBsYWNlaG9sZGVyOiBcImpyZXM6MzIwMDAwNzdcIiwgLy9SQyAzMjAwMDA3NyA6IFYgcMWZw61wYWRuxJsgbmVuYXBsbsSbbsOtIGJ1ZGUgdnlnZW5lcm92w6FuIHN5c3TDqW1lbS5cclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtaW46IDAsIG1heDogMjU0LCBtZXNzYWdlOiBcImpyZXM6MzIwMDAwNzZcIiB9KSAvL1JDIDMyMDAwMDc2IDogUG9sZSBuZXNtw60gYsO9dCBwcsOhemRuw6kgYSBtxa/FvmUgb2JzYWhvdmF0IG1heC4gMjU0IHpuYWvFry5cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZm9ybS5nZm9ybShcImNyZWF0ZUZyb21cIiwgRm9ybSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51YmFyKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHBhcmFtczogTWVudVBhcmFtc1tdID0gW107XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhcnQ6IE1lbnVQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vcHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDAzNFwiLCAvL1JDIDMyMDAwMDM0IDogU3B1c3RpdCBleHBvcnRcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFJ1bkV4cG9ydFwiLCAvL1JDIDMyMDAwMDM0IDogU3B1c3RpdCBleHBvcnRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVGbGFzaChcImlkRmxhc2hTZWxlY3Rpb25HcmlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnV0aWxzLndhaXRGb3JWYWx1ZXModGhpcy5mb3JtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGlzVmFsaWQsIGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvcm11bMOhxZkgbmVuw60gdmFsaWRuxJsgdnlwbG7Em25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZCAhPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb246IEdvcmRpYy5Fc3MuSW50ZXJmYWNlLkdFc3NFeHBvcnRJeHBEdG9bXSA9IHRoaXMuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uID09IG51bGwgfHwgc2VsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaCh7IGNvbnRlbnQ6IFwianJlczozMjAwMDA1M1wiLCBzdGF0ZTogXCJ3YXJuaW5nXCIsIGlkOiBcImlkRmxhc2hTZWxlY3Rpb25HcmlkXCIgfSk7IC8vUkMgMzIwMDAwNTMgOiBWIHNlem5hbXUgbmVieWxhIHZ5YnLDoW5hIGFuaSBqZWRuYSBww61zZW1ub3N0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbXCJJeHBMaXN0XCJdID0gc2VsZWN0aW9uLm1hcCgoaXRlbSkgPT4gaXRlbS5peHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbXCJUeXBlXCJdID0gMTA7ICAvLyBleHBvcnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bkFzeW5jQWN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcHJlbm9zOiBNZW51UGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMTgwXCIsIC8vUkMgMzIwMDAxODAgOiBTcHVzdGl0IHDFmWVub3NcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFByZW5vc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVGbGFzaChcImlkRmxhc2hTZWxlY3Rpb25HcmlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnV0aWxzLndhaXRGb3JWYWx1ZXModGhpcy5mb3JtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGlzVmFsaWQsIGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvcm11bMOhxZkgbmVuw60gdmFsaWRuxJsgdnlwbG7Em25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZCAhPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb246IEdvcmRpYy5Fc3MuSW50ZXJmYWNlLkdFc3NFeHBvcnRJeHBEdG9bXSA9IHRoaXMuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uID09IG51bGwgfHwgc2VsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaCh7IGNvbnRlbnQ6IFwianJlczozMjAwMDA1M1wiLCBzdGF0ZTogXCJ3YXJuaW5nXCIsIGlkOiBcImlkRmxhc2hTZWxlY3Rpb25HcmlkXCIgfSk7IC8vUkMgMzIwMDAwNTMgOiBWIHNlem5hbXUgbmVieWxhIHZ5YnLDoW5hIGFuaSBqZWRuYSBww61zZW1ub3N0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbXCJJeHBMaXN0XCJdID0gc2VsZWN0aW9uLm1hcCgoaXRlbSkgPT4gaXRlbS5peHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbXCJUeXBlXCJdID0gMDsgIC8vIHByZW5vc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVuQXN5bmNBY3Rpb24oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKHByZW5vcyk7XHJcbiAgICAgICAgICAgIHZhciBzZXBhcmF0b3I6IE1lbnVQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInNlcGFyYXRvclwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKHNlcGFyYXRvcik7XHJcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKHN0YXJ0KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgcnVuQXN5bmNBY3Rpb24oZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbmFtZXNwYWNlID0gXCJlc3NFeHBvcnRcIjtcclxuICAgICAgICAgICAgY29uc3QgbXljbGFzcyA9IFwiR29yZGljLkVzcy5TZXJ2ZXIuR0Vzc0V4cG9ydEFzeW5jVGFza1wiO1xyXG5cclxuICAgICAgICAgICAgR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5vZmYoXCIuXCIgKyBuYW1lc3BhY2UpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVGbGFzaChcImlkRmxhc2hFcnJcIik7XHJcblxyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICAuZ2V0SW5pdFByb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaWRFeHBvcnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogZGF0YS5UeXBlID09PSAwID8gXCJqcmVzOjMyMDAwMjA0XCIgOiAvL1JDIDMyMDAwMjA0IDogUHJvYsOtaMOhIHDFmWV2b2RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMjAwMDIwM1wiLCAvL1JDIDMyMDAwMjAzIDogUHJvYsOtaMOhIGV4cG9ydFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLmRlbGF5ZWRTdGFydChteWNsYXNzLCBkYXRhLCB7IGNsZWFyT25GaW5pc2g6IGZhbHNlLCBhdXRvQ2xlYW46IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHRhc2spID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIub24oXCJhbHdheXMuXCIgKyBuYW1lc3BhY2UsIG15Y2xhc3MsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8odGhpcy5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlc3VsdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQ6IEdvcmRpYy5Fc3MuSW50ZXJmYWNlLkdFc3NFeHBvcnRSZXN1bHREdG8gPSB0aGlzLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5TdWNjZXNzID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPS1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5HdWlkICE9IG51bGwgJiYgcmVzdWx0Lkd1aWQgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHRXNzVXRpbHMoKS5kb3dubG9hZEZpbGUocmVzdWx0Lkd1aWQsIHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRkFJTFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ub3RpZmljYXRpb24oXCJhZGRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktaW5mb1wiLCBjb250ZW50OiByZXN1bHQuRXJyb3JNZXNzYWdlICE9IG51bGwgJiYgcmVzdWx0LkVycm9yTWVzc2FnZSAhPT0gXCJcIiA/IHJlc3VsdC5FcnJvck1lc3NhZ2UgOiBcImpyZXM6MzIwMDAwNDRcIiwgc3RhdGU6IFwiZXJyb3JcIiAvL1JDIDMyMDAwMDQ0IDogTmVwb2RhxZlpbG8gc2UgcHJvdsOpc3QgZXhwb3J0L3DFmWV2b2QuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbihcImlkRXhwb3J0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0RmlsdGVyKCkge1xyXG4gICAgICAgICAgICB2YXIgb2JqOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyRGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJEYXRhW1wiZGF0X3BvZFwiXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhW1wiZGF0X3BvZFwiXSA9IHRoaXMuZmlsdGVyRGF0YVtcImRhdF9wb2RcIl0uZGF0ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlckRhdGFbXCJkYXRfem1lbmFcIl0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YVtcImRhdF96bWVuYVwiXSA9IHRoaXMuZmlsdGVyRGF0YVtcImRhdF96bWVuYVwiXS5kYXRlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb2JqID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmZpbHRlckRhdGEpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IHtcclxuICAgICAgICAgICAgICAgIGtleTogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgIHN0YXJ0RW1wdHk6IHRydWUsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyB2c3R1cG7DrSB6w6F6bmFteVxyXG4gICAgICAgICAgICBpZiAodGhpcy5Sb3dzICE9IG51bGwgJiYgdGhpcy5Sb3dzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlucHV0W1wic3RhcnRFbXB0eVwiXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaW5wdXRbXCJkYXRhXCJdID0gdGhpcy5Sb3dzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgR29yZGljLklzbC5WaWV3KEdvcmRpYy5Jc2wuRXNzLmxpc3RJeHAocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcnEuZmlsdGVycyA9IHRoaXMuZ2V0RmlsdGVyKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcnE7XHJcbiAgICAgICAgICAgIH0pLCBpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZpZXcub24oXCJjaGFuZ2VcIiwgKG9wdHMpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIG96bmHEjWVuw60gdsWhZWNoIMWZw6Fka8WvXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBpbnN0YW5jZTogYW55ID0gdGhpcy5ncmlkLmdncmlkKFwiaW5zdGFuY2VcIik7XHJcbiAgICAgICAgICAgICAgICAvL2lmIChpbnN0YW5jZSAhPSBudWxsICYmIGluc3RhbmNlLmFjdGlvbnMgIT0gbnVsbCAmJiBpbnN0YW5jZS5hY3Rpb25zLmFjdENoZWNrQWxsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGluc3RhbmNlLmFjdGlvbnMuYWN0Q2hlY2tBbGwucnVuKCk7IFxyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQgPEdvcmRpYy5Fc3MuSW50ZXJmYWNlLkdFc3NFeHBvcnRJeHBEdG8+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3JtYXRcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDEwMFwiLCAvL1JDIDMyMDAwMTAwIDogSWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTI1LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9zcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMTAxXCIsIC8vUkMgMzIwMDAxMDEgOiBEcnVoXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyNSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChjZWxsLCByb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsIHx8IHJvdy5kYXRhID09IG51bGwgfHwgcm93LmRhdGEudHlwX3NwaXMgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocm93LmRhdGEudHlwX3NwaXMgYXMgbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMyMDAwMDI4XCI7IC8vUkMgMzIwMDAwMjggOiBEb2t1bWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMjAwMDAyOVwiOyAvL1JDIDMyMDAwMDI5IDogU3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMjAwMDAzMFwiOyAvL1JDIDMyMDAwMDMwIDogVHlwb3bDvSBzcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMyMDAwMDMxXCI7IC8vUkMgMzIwMDAwMzEgOiBTb3XEjcOhc3Qga29uY292w6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzIwMDAwMzJcIjsgLy9SQyAzMjAwMDAzMiA6IETDrWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzIwMDAwMzNcIjsgLy9SQyAzMjAwMDAzMyA6IFNvdcSNw6FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfcG9kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDQ3XCIsIC8vUkMgMzIwMDAwNDcgOiBEYXR1bSBwb2TDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNjUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE3N1wiLCAvL1JDIDMyMDAwMTc3IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE2NSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDA3MVwiLCAvL1JDIDMyMDAwMDcxIDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDI4NSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldl9yZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDA3MlwiLCAvL1JDIDMyMDAwMDcyIDogVmxhc3Ruw61rXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMxNSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2ZWNza3VwX25hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMTcxXCIsIC8vUkMgMzIwMDAxNzEgOiBWxJtjbsOhIHNrdXBpbmEgKG7DoXpldilcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzM1LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZlY3NrdXBfc3Bpc196bmFrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMTcyXCIsIC8vUkMgMzIwMDAxNzIgOiBWxJtjbsOhIHNrdXBpbmEgKHNwaXNvdsO9IHpuYWspXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIxNSxcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvKiogc2xvdXBjZSBuYSBwcm9obGVkw6F2w6Fuw60gKi9cclxuICAgICAgICAgICAgdmFyIHNlYXJjaENvbHVtbnMgPSBbXSBhcyBzdHJpbmdbXTtcclxuICAgICAgICAgICAgbmV3IEdFc3NVdGlscygpLnZhbGlkYXRlU2VhcmNoQ29sdW1ucyhzZWFyY2hDb2x1bW5zLCBmb3JtYXQuY29sdW1ucyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdj5cIikuZ2F1dG9maXQoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy52aWV3LFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJncmlkU2V6bmFtXCIsXHJcbiAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIixcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBmb3JtYXQsXHJcbiAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IHNlYXJjaENvbHVtbnNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlcnBhbmVsKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXIgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLm9uKFwiZ2ZpbHRlcnBhbmVsYXBwbHlcIiwgKGV2ZW50LCBvYmopID0+IHsgICAgICAgICAvLyBldmVudGEga3RlcsOhIGplIHZ5dm9sw6FuYSBwxZlpIHZ5aGxlZMOhdsOhbsOtLiBvYmouZmlsdGVyIC0+IGhsZWRhbsO9IHNlem5hbSBwb2Rtw61uZWtcclxuICAgICAgICAgICAgICAgIGlmIChvYmogIT0gbnVsbCAmJiBvYmouZmlsdGVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyID0gb2JqLmZpbHRlcjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEgPSBmaWx0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJcclxuICAgICAgICAgICAgICAgIC5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlczogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgICAgICB1c2VyU2V0dGluZ3M6IHRoaXMudXNlclNldHRpbmdzLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbdGhpcy5jcmVhdGVGaWx0ZXJGb3JtKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDcmVhdGVQYW5lbDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJGb3JtKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZmlsdGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkZvcm1GaWx0ZXJHcmlkXCIsXHJcbiAgICAgICAgICAgICAgICB0YWJMYWJlbDogXCJGaWx0clwiLFxyXG4gICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEsIEwtMy04LTEsIE0tMTItMTEtMSwgUy0xMi0xMS0xLCBicmVha3MtNzAwLTEwMDBcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZpbHRlckZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuXHJcbiAgICAgICAgICAgIGZpbHRlckZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMyMDAwMDI1XCIsIHJlcXVpcmVkOiB0cnVlIH0pIC8vUkMgMzIwMDAwMjUgOiBGdW5rxI1uw60gbcOtc3RvXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCAoR29yZGljIGFzIGFueSkuR2luLkZpZWxkcy5naW5zZnVuU1NVKHtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl9ha3RcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZnVuX2FrdD12YWx1ZS5peHNfZnVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpKVxyXG5cclxuICAgICAgICAgICAgZmlsdGVyRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MzIwMDAwNDZcIiwgcmVxdWlyZWQ6IHRydWUgfSkgLy9SQyAzMjAwMDA0NiA6IERhdHVtIHBvZMOhbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWNvbWJvYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3BvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmRhdF9wb2Q9dmFsdWUuZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRNZW51OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheXNSYW5nZTogNjBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJTZXR0aW5nczogdGhpcy51c2VyU2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEluaXRpYWxWYWx1ZTogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXlzUmFuZ2VNYXg6IDEwMDAwLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmaWx0ZXJGb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMjAwMDE3NlwiIH0pIC8vUkMgMzIwMDAxNzYgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlY29tYm9ib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbW9kZWw6IFwibW9kZWwuZGF0X3ptZW5hPXZhbHVlLmRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0TWVudToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlzUmFuZ2U6IDYwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VyU2V0dGluZ3M6IHRoaXMudXNlclNldHRpbmdzLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRJbml0aWFsVmFsdWU6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF5c1JhbmdlTWF4OiAxMDAwMCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZmlsdGVyRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzIwMDAwNzNcIikgLy9SQyAzMjAwMDA3MyA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgZmlsdGVyRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzIwMDAxNzhcIikgLy9SQyAzMjAwMDE3OCA6IElkZW50aWZpa8OhdG9yIGVudGl0eVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJGb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5Fc3MuV2ViQ29udHJvbHMge1xyXG5cclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWw71zbGVkZWsgaW1wb3J0dVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIHRoYXptdWthXHJcbiAgICAgKiBAc2luY2UgNTI1MjAuMTFcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0Vzc0ZpbmFsaXplSW1wb3J0IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhc3luY1Rhc2s6IEdvcmRpYy5Bc3luYy5JR1Rhc2sgfCBudWxsID0gbnVsbDtcclxuICAgICAgICBwcml2YXRlIHVzZXJSZXF1ZXN0ZWRDYW5jZWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIER0bzogR29yZGljLkVzcy5JbnRlcmZhY2UuR0Vzc0ltcG9ydElucHV0RHRvO1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIHZpZXc6IEdvcmRpYy5EYXRhLlZpZXc8YW55PjtcclxuICAgICAgICBwcml2YXRlIHV0aWxzQ250OiBHQ29udGVudDtcclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51YmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZGJhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51YmFyKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHBhcmFtczogTWVudVBhcmFtc1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBwYXJhbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R2VuZXJhdGVBbnN3ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxNjNcIiwgLy9SQyAzMjAwMDE2MyA6IFZ5Z2VuZXJvdmF0IHBvdHZyem92YWPDrSBkw6F2a3VcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51dGlsc0NudCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnV0aWxzQ250ID0gbmV3IEdDb250ZW50KFwiR29yZGljLkVzcy5XZWJDb250cm9scy5HRXNzVXRpbHNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51dGlsc0NudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoXCJHZXRFc3NPZHBvdmVkMjAyNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhzRXh0OiB0aGlzLkR0by5JeHNFeHQhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdmthSWQ6IHRoaXMuRHRvLkRhdmthSWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZ3VpZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT0tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3VpZCAhPSBudWxsICYmIGd1aWQgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgR0Vzc1V0aWxzKCkuZG93bmxvYWRGaWxlKGd1aWQsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBwYXJhbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhbGlnbjogXCJvcHBvc2l0ZVwiLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0RGV0YWlsRGF2a2FcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxMjNcIiwgLy9SQyAzMjAwMDEyMyA6IERldGFpbCBpbXBvcnRvdmFuw6kgZMOhdmt5XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlRmxhc2goXCJkYXZrYUZsYXNoSWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLkR0by5EYXZrYUlkID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKHsgY29udGVudDogXCJqcmVzOjMyMDAwMTI0XCIsIHN0YXRlOiBcIndhcm5pbmdcIiwgaWQ6IFwiZGF2a2FGbGFzaElkXCIgfSk7IC8vUkMgMzIwMDAxMjQgOiBEZXRhaWwgZMOhdmt5IG5lbsOtIGsgZGlzcG96aWNpLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRXNzLkRpYWxvZ3MuR0Vzc0RldGFpbERhdmthRGxnKHRoaXMsIHsgZGF2a2FfaWQ6IHRoaXMuRHRvLkRhdmthSWQsIGl4c19leHQ6IHRoaXMuRHRvLkl4c0V4dCEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihwYXJhbXMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcnVuQXN5bmNJbXBvcnRBY3Rpb24ob3B0OiB7XHJcbiAgICAgICAgICAgIC8qKiBmaW7DoWxuw60gdsO9YsSbciBkYXQgemUgc2V6bmFtdSovXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbjogYW55W11cclxuICAgICAgICAgICAgLyoqIMSNw61zbG8gZMOhdmt5ICovXHJcbiAgICAgICAgICAgIGRhdmthX2lkOiBudW1iZXIsXHJcbiAgICAgICAgICAgIC8qKiBndWlkIG9ka2F6dWrDrWPDrSBuYSBjZWzDvSB6aXAgdiB0ZW1wdSAqL1xyXG4gICAgICAgICAgICBndWlkOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIC8qKiBpZGVudGlmaWvDoXRvciBleHRlcm7DrWhvIHN5c3TDqW11ICovXHJcbiAgICAgICAgICAgIGl4c0V4dDogc3RyaW5nXHJcbiAgICAgICAgfSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbmFtZXNwYWNlID0gXCJlc3NGaW5hbGl6ZUltcG9ydFwiO1xyXG4gICAgICAgICAgICBjb25zdCBteWNsYXNzID0gXCJHb3JkaWMuRXNzLlNlcnZlci5HRXNzSW1wb3J0QXN5bmNUYXNrXCI7XHJcblxyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLm9mZihcIi5cIiArIG5hbWVzcGFjZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUZsYXNoKFwiaWRGbGFzaEVyclwiKTtcclxuXHJcbiAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXJcclxuICAgICAgICAgICAgICAgIC5nZXRJbml0UHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpZEltcG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImpyZXM6MzIwMDAwNThcIiwgLy9SQyAzMjAwMDA1OCA6IFByb2LDrWjDoSBpbXBvcnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsQWN0aW9uOiB0aGlzLmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2FuY2VsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAwNzRcIiwgLy9SQyAzMjAwMDA3NCA6IFpydcWhaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFzeW5jVGFzayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIuY2FuY2VsKHRoaXMuYXN5bmNUYXNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyUmVxdWVzdGVkQ2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc09wZXJhdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpZEltcG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJqcmVzOjMyMDAwMDc1XCIsIC8vUkMgMzIwMDAwNzUgOiBQcm9iw61ow6EgenJ1xaFlbsOtIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWw6IG9wdC5zZWxlY3Rpb24ubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLmRlbGF5ZWRTdGFydChteWNsYXNzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVudGl0aWVzOiBvcHQuc2VsZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBEYXZrYUlkOiBvcHQuZGF2a2FfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEd1aWQ6IG9wdC5ndWlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJeHNFeHQ6IG9wdC5peHNFeHRcclxuICAgICAgICAgICAgICAgICAgICB9LCB7IGNsZWFyT25GaW5pc2g6IGZhbHNlLCBhdXRvQ2xlYW46IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHRhc2spID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3luY1Rhc2sgPSB0YXNrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIub24oXCJjaGFuZ2UuXCIgKyBuYW1lc3BhY2UsIG15Y2xhc3MsIGZ1bmN0aW9uIChvKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyh0aGlzLnByb2dyZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQudXNlclJlcXVlc3RlZENhbmNlbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbihcImlkSW1wb3J0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb2dyZXNzICE9IG51bGwgJiYgdGhpcy5wcm9ncmVzcy5jdXJyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT0tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3MuY3VycmVudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iamVjdCA9IEpTT04ucGFyc2UodGhpcy5wcm9ncmVzcy50ZXh0ISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0ICE9IG51bGwgJiYgb2JqZWN0LkRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3dzID0gb2JqZWN0LkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcm9ncmVzc09wZXJhdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImlkSW1wb3J0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiByb3dzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRDaGFuZ2Uocm93cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRkFJTFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb2dyZXNzICE9IG51bGwgJiYgdGhpcy5wcm9ncmVzcy50ZXh0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImlkRmxhc2hFcnJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9ncmVzcy50ZXh0ISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwiZXJyb3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKFwiaWRJbXBvcnRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmFjdGlvbnMuYWN0RGV0YWlsRGF2a2EgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsRGF2a2EuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5vbihcImFsd2F5cy5cIiArIG5hbWVzcGFjZSwgbXljbGFzcywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8odGhpcy5wcm9ncmVzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnVzZXJSZXF1ZXN0ZWRDYW5jZWwgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oXCJpZEltcG9ydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzcyAhPSBudWxsICYmIHRoaXMucHJvZ3Jlc3MuY3VycmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9LXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb2dyZXNzLmN1cnJlbnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmplY3QgPSBKU09OLnBhcnNlKHRoaXMucHJvZ3Jlc3MudGV4dCEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdCAhPSBudWxsICYmIG9iamVjdC5EYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93cyA9IG9iamVjdC5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJvZ3Jlc3NPcGVyYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpZEltcG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogcm93cy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkQ2hhbmdlKHJvd3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZBSUxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzcyAhPSBudWxsICYmIHRoaXMucHJvZ3Jlc3MudGV4dCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpZEZsYXNoRXJyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvZ3Jlc3MudGV4dCEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBcImVycm9yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuYWN0aW9ucy5hY3REZXRhaWxEYXZrYSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsRGF2a2EuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oXCJpZEltcG9ydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5jYW5jZWwobXljbGFzcylcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAudGhlbigob3V0cHV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkQ2hhbmdlKHJvd3M6IGFueVtdKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlldy51cGRhdGVEYXRhKHJvd3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXY+XCIpLmdhdXRvZml0KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vaWYgKHRoaXMuRHRvID09IG51bGwgfHwgdGhpcy5EdG8uU2VsZWN0aW9uID09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gICAgdGhpcy52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoKTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXMudmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoaXMuRHRvLlNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXMudmlldy5nZXRMb2FkaW5nUHJvbWlzZSgpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhpcy5ydW5Bc3luY0ltcG9ydEFjdGlvbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogdGhpcy5EdG8uU2VsZWN0aW9uISxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgZGF2a2FfaWQ6IHRoaXMuRHRvLkRhdmthSWQhLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBndWlkOiB0aGlzLkR0by5HdWlkISxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaXhzRXh0OiB0aGlzLkR0by5JeHNFeHQhXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldygpO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcuZ2V0TG9hZGluZ1Byb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucnVuQXN5bmNJbXBvcnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IHRoaXMuRHRvLkVudGl0aWVzISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF2a2FfaWQ6IHRoaXMuRHRvLkRhdmthSWQhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBndWlkOiB0aGlzLkR0by5HdWlkISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhzRXh0OiB0aGlzLkR0by5JeHNFeHQhXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbnNGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxhbnk+KCk7XHJcblxyXG4gICAgICAgICAgICBjb2x1bW5zRm9ybWF0XHJcbiAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJTdGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDA1OVwiLCAvL1JDIDMyMDAwMDU5IDogU3RhdiBpbXBvcnR1XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGU6IEljb25UZW1wbGF0ZSA9IHsgaWNvbjogXCJcIiwgdG9vbHRpcDogXCJcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtcIlN0YXRlXCJdID09PSAxKSB7ICAgLy8gc3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUuaWNvbiA9IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlLnRvb2x0aXAgPSBcImpyZXM6MzIwMDAwNjNcIiAvL1JDIDMyMDAwMDYzIDogSW1wb3J0IGJ5bCDDunNwxJvFoW7EmyBwcm92ZWRlbi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhW1wiU3RhdGVcIl0gPT09IDApIHsgLy8gd2FybmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUuaWNvbiA9IFwiZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUudG9vbHRpcCA9IFwianJlczozMjAwMDA2NFwiIC8vUkMgMzIwMDAwNjQgOiBJbXBvcnQgbmVieWwgcHJvdmVkZW4uIERhdGEganNvdSBqacW+IG9ic2HFvmVuYSB2IHN5c3TDqW11LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGFbXCJTdGF0ZVwiXSA9PT0gMikgeyAvLyBmYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5pY29uID0gXCJmYS10aW1lcy1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtd2FybmluZ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUudG9vbHRpcCA9IFwianJlczozMjAwMDA2NVwiIC8vUkMgMzIwMDAwNjUgOiBJbXBvcnQgbmVieWwgcHJvdmVkZW4uIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiSWRFbnRpdHlcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDA2MFwiLCAvL1JDIDMyMDAwMDYwIDogRXh0ZXJuw60gaWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJJZEludFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDA2MVwiLCAvL1JDIDMyMDAwMDYxIDogSW50ZXJuw60gaWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIklkSW50VmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDk4XCIsIC8vUkMgMzIwMDAwOTggOiBJbnRlcm7DrSBpZGVudGlmaWvDoXRvciAodmVyemUpXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJUeXBFbnRpdHlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAwNjJcIiwgLy9SQyAzMjAwMDA2MiA6IFR5cCBlbnRpdHlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAwNjlcIiwgLy9SQyAzMjAwMDA2OSA6IERvcGzFiHVqw61jw60gaW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDc1MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJOYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDIyOFwiLCAvL1JDIDMyMDAwMjI4IDogTsOhemV2IGVudGl0eSAvIHbEm2NcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNvcnQgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgLyoqIHNsb3VwY2UgbmEgcHJvaGxlZMOhdsOhbsOtICovXHJcbiAgICAgICAgICAgIHZhciBzZWFyY2hDb2x1bW5zID0gW10gYXMgc3RyaW5nW107XHJcbiAgICAgICAgICAgIG5ldyBHRXNzVXRpbHMoKS52YWxpZGF0ZVNlYXJjaENvbHVtbnMoc2VhcmNoQ29sdW1ucywgY29sdW1uc0Zvcm1hdC5jb2x1bW5zKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRTZXpuYW1JbXBvcnRcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMudmlldyxcclxuICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIixcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IGNvbHVtbnNGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICBzb3J0OiBzb3J0LFxyXG4gICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogc2VhcmNoQ29sdW1ucyxcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRiYXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXM6IE1lbnVQYXJhbXNbXSA9IFtdO1xyXG4gICAgICAgICAgICBwYXJhbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDAxOFwiLCAvL1JDIDMyMDAwMDE4IDogWmF2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5Fc3MuV2ViQ29udHJvbHMge1xyXG5cclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXpuYW0gaW1wb3J0b3ZhbsO9Y2ggYmFsw61rxa9cclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciB0aGF6bXVrYVxyXG4gICAgICogQHNpbmNlIDUyNTEwLjFcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0Vzc1ByZXBhcmVJbXBvcnQgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIGRhdmthX2lkPzogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OiBHb3JkaWMuRGF0YS5WaWV3PGFueT47XHJcbiAgICAgICAgcHJpdmF0ZSB1dGlsc0NudDogR0NvbnRlbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSB1dGlsczogR0Vzc1V0aWxzO1xyXG4gICAgICAgIHByaXZhdGUgZ3VpZD86IHN0cmluZyB8IG51bGw7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudXRpbHMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51dGlscyA9IG5ldyBHRXNzVXRpbHMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy51dGlsc0NudCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnV0aWxzQ250ID0gbmV3IEdDb250ZW50KFwiR29yZGljLkVzcy5XZWJDb250cm9scy5HRXNzVXRpbHNcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51YmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kYmFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xyXG4gICAgIFxyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh1bmRlZmluZWQsIHtcclxuICAgICAgICAgICAgICAgIGtleTogXCJJZEVudGl0eVwiLFxyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc29yczoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZXJyb3I6IG5ldyBHb3JkaWMuRGF0YS5FcnJvclByb2Nlc3NvcigoZGF0YXJvdywgbW1ldGFyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyB0aGF6bXVrYSAoMjYuOC4yMDIwKSAtIHZ5xI1pxaF0xJtuw60gcMWZZWRjaG96w61jaCBjaHliLCBqaW5hayBzZSBuZXNtYcW+b3UsIHBva3VkIGRhbMWhw60gY2h5YmEgbmVuYXN0YW5lXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbW1ldGFyb3cuZXJyb3JzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHZhciBlcnJvcnMgPSB0aGF0LnNldEdyaWRFcnJvcnMoZGF0YXJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIGVycm9ycztcclxuICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maWx0ZXI6IG5ldyBHb3JkaWMuRGF0YS5GaWx0ZXJQcm9jZXNzb3IoKGlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKGlucHV0LmRhdGFbXCJUeXBFbnRpdHlcIl0gIT09IFR5cEVudGl0eS5Tb3Vib3IpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvL30sIHt9KVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gLS0tIEdSSUQgLS0tXHJcblxyXG4gICAgICAgICAgICBjb25zdCBzb3J0ID0gXCJcIjtcclxuICAgICAgICAgICAgY29uc3QgY29sdW1uc0Zvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PGFueT4oKTtcclxuXHJcbiAgICAgICAgICAgIGNvbHVtbnNGb3JtYXRcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIklkRW50aXR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAwNjBcIiwgLy9SQyAzMjAwMDA2MCA6IEV4dGVybsOtIGlkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcIkptZW5vXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB3aWR0aDogMjUwLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDgyXCIsIC8vUkMgMzIwMDAwODIgOiBWxJtjIC8gTsOhemV2XHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJUeXBFbnRpdHlcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDA4M1wiLCAvL1JDIDMyMDAwMDgzIDogVHlwXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAocm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dbXCJUeXBFbnRpdHlcIl0gPT09IFR5cEVudGl0eS5UeXBvdnlTcGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMyMDAwMjAyXCI7IC8vUkMgMzIwMDAyMDIgOiBUeXBvdsO9IHNwaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93W1wiVHlwRW50aXR5XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJTdGF2VHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAyMDVcIiwgLy9SQyAzMjAwMDIwNSA6IFN0YXZcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBjb2x1bW5zRm9ybWF0XHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJIb2Rub3RhSURcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTI1LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE4MVwiLCAvL1JDIDMyMDAwMTgxIDogSG9kbm90YSBJRFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlpkcm9qSURcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTI1LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE4MlwiLCAvL1JDIDMyMDAwMTgyIDogWmRyb2ogSURcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJOYXpldlwiLCAgICAgICAgICAgICAgLy8gTsOhemV2IHBydmt1IGphayBqZSB1dmVkZW5vIHYgcG9waXNuw71jaCBtZXRhZGF0ZWNoIERva3VtZW50dS9TcGlzdS9UeXBvdsOpaG8gc3Bpc3VcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE4M1wiLCAvL1JDIDMyMDAwMTgzIDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQ2lzbG9KZWRuYWNpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxODRcIiwgLy9SQyAzMjAwMDE4NCA6IMSMalxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMyMDAwMTg1XCI7IC8vUkMgMzIwMDAxODUgOiDEjMOtc2xvIGplZG5hY8OtXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlNwaXNvdmFabmFja2FcIiwgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMTg2XCIsIC8vUkMgMzIwMDAxODYgOiBTcFpuLlxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMyMDAwMTg3XCI7IC8vUkMgMzIwMDAxODcgOiBTcGlzb3bDoSB6bmHEjWthXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkRydWhEb2t1bWVudHVcIiwgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxODhcIiwgLy9SQyAzMjAwMDE4OCA6IERydWggZG9rdW1lbnR1XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIC0tIFbEmkNOw4EgU0tVUElOQSAtLVxyXG5cclxuXHJcbiAgICAgICAgICAgIGNvbHVtbnNGb3JtYXRcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlZlY25hU2t1cGluYVwiLCAgICAgICAvLyBwxa92b2Ruw60gaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE4OVwiLCAgIC8vUkMgMzIwMDAxODkgOiBQxa92b2Ruw60gdsSbY27DoSBza3VwaW5hXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE3NSxcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBjb2x1bW5zRm9ybWF0XHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJJeHNWc2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAxOTBcIiwgLy9SQyAzMjAwMDE5MCA6IFp2b2xlbsOhIHbEm2Nuw6Egc2t1cGluYVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNzUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVtcIlR5cEVudGl0eVwiXSAhPT0gVHlwRW50aXR5LkRva3VtZW50ICYmIHZhbHVlW1wiVHlwRW50aXR5XCJdICE9PSBUeXBFbnRpdHkuU3BpcyAmJiB2YWx1ZVtcIlR5cEVudGl0eVwiXSAhPT0gVHlwRW50aXR5LlR5cG92eVNwaXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVtcIlZlY25hU2t1cGluYU5hemV2XCJdID09IG51bGwgfHwgdmFsdWVbXCJWZWNuYVNrdXBpbmFTcGlzWm5ha1wiXSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiPGRpdj48aT5EbGUgeG1sPC9pPjwvZGl2PlwiOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVbXCJWZWNuYVNrdXBpbmFOYXpldlwiXSArIFwiIHwgXCIgKyB2YWx1ZVtcIlZlY25hU2t1cGluYVNwaXNabmFrXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiAoY3R4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvID09IG51bGwgfHwgY3R4LmNlbGxJbmZvLmRhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHguY2VsbEluZm8uZGF0YVtcIlR5cEVudGl0eVwiXSAhPT0gVHlwRW50aXR5LkRva3VtZW50ICYmIGN0eC5jZWxsSW5mby5kYXRhW1wiVHlwRW50aXR5XCJdICE9PSBUeXBFbnRpdHkuU3BpcyAmJiBjdHguY2VsbEluZm8uZGF0YVtcIlR5cEVudGl0eVwiXSAhPT0gVHlwRW50aXR5LlR5cG92eVNwaXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJlZmFiR2luc3Zza09wdGlvbnMgPSBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc3ZzaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChwcmVmYWJHaW5zdnNrT3B0aW9ucy52YWxpZGF0b3JzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcHJlZmFiR2luc3Zza09wdGlvbnMudmFsaWRhdG9ycy5wdXNoKG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWRpdG9yOiBHR3JpZENvbHVtbkVkaXRvck9wdGlvbjxhbnk+ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHByZWZhYkdpbnN2c2tPcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXJjZW5pX3NwaXNfejogbnVtYmVyIHwgbnVtYmVyW10gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvLmRhdGFbXCJUeXBFbnRpdHlcIl0gPT09IFR5cEVudGl0eS5Eb2t1bWVudCB8fCBjdHguY2VsbEluZm8uZGF0YVtcIlR5cEVudGl0eVwiXSA9PT0gVHlwRW50aXR5LlNwaXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVyY2VuaV9zcGlzX3ogPSBbMSwgMiwgM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY3R4LmNlbGxJbmZvLmRhdGFbXCJUeXBFbnRpdHlcIl0gPT09IFR5cEVudGl0eS5UeXBvdnlTcGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmNlbmlfc3Bpc196ID0gNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZmFiR2luc3Zza09wdGlvbnMgPSAkLmV4dGVuZChwcmVmYWJHaW5zdnNrT3B0aW9ucywgKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmNlbmlfc3Bpc196OiB1cmNlbmlfc3Bpc196LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEplbktvbmNvdmU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmNlbmlfc3Bpc196OiB1cmNlbmlfc3Bpc196LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEplbktvbmNvdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5uYXpldiArIFwiIHwgXCIgKyB2YWx1ZS5zcGlzX3puYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLkl4c1ZzayA9IHZhbHVlLml4c192c2s7bW9kZWwuVmVjbmFTa3VwaW5hTmF6ZXYgPSB2YWx1ZS5uYXpldjsgbW9kZWwuVmVjbmFTa3VwaW5hU3Bpc1puYWs9dmFsdWUuc3Bpc196bmFrO1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWRpdG9yOiBHR3JpZENvbHVtbkVkaXRvck9wdGlvbjxhbnk+ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHByZWZhYkdpbnN2c2tPcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlZGl0b3I7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLyoqIHNsb3VwY2UgbmEgcHJvaGxlZMOhdsOhbsOtICovXHJcbiAgICAgICAgICAgIHZhciBzZWFyY2hDb2x1bW5zID0gW10gYXMgc3RyaW5nW107XHJcbiAgICAgICAgICAgIG5ldyBHRXNzVXRpbHMoKS52YWxpZGF0ZVNlYXJjaENvbHVtbnMoc2VhcmNoQ29sdW1ucywgY29sdW1uc0Zvcm1hdC5jb2x1bW5zKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2PlwiKS5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFByZXBhcmVJbXBvcnREYXRhXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnZpZXcsXHJcbiAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIixcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBjb2x1bW5zRm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgc29ydDogc29ydCxcclxuICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IHNlYXJjaENvbHVtbnMsXHJcbiAgICAgICAgICAgICAgICByb3dzRW5hYmxlZDogKG1ldGFyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWV0YXJvdyAhPSBudWxsICYmIG1ldGFyb3cuZGF0YSAhPSBudWxsICYmIG1ldGFyb3cuZGF0YVtcIlVtb3puaXRWeWJlclV6aXZhdGVsZVwiXSA9PT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBvxaFldMWZZW7DrSBwxZlpIHphdsWZZW7DrSBjb250ZW50dVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGlzLmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbiA9PSBudWxsIHx8IHNlbGVjdGlvbi5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5hY3Rpb25zLmFjdE5vdnlJbXBvcnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0Tm92eUltcG9ydC5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuZ2F1dG9maXQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZFxyXG4gICAgICAgICAgICAgICAgLmdncmlkcm93ZWRpdG9yKHtcclxuICAgICAgICAgICAgICAgICAgICBjb21taXQ6IChhLCBiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC52YWxpZGF0ZUdyaWRFcnJvcnModGhpcy52aWV3LCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZC5hcHBlbmRUbyhlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5mb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHZhciBGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJGb3JtUHJlcGFyZUltcG9ydERhdGFcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEsIEwtMy04LTEsIE0tMTItMTEtMSwgUy0xMi0xMS0xLCBicmVha3MtNzAwLTEwMDBcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIEZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMjAwMDA1NFwiKSAvL1JDIDMyMDAwMDU0IDogVnN0dXBuw60gbmFzdGF2ZW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IHJlcXVpcmVkOiB0cnVlLCBsYWJlbDogXCJqcmVzOjMyMDAwMDQ4XCIgfSkgLy9SQyAzMjAwMDA0OCA6IEV4dGVybsOtIHN5c3TDqW1cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmludHNleHQoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJJeHNFeHRcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5JeHNFeHQ9dmFsdWUuaXhzX2V4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IFsxMDBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcml6X2VzczogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVyemVfZXNzOiBcIk5TMjAyNFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIEZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMyMDAwMDU2XCIpIC8vUkMgMzIwMDAwNTYgOiBTb3Vib3IgayBpbXBvcnR1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZmlsZWZpZWxkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZpbGVcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5HdWlkPXZhbHVlLmd1aWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHsgc3RvcHBpbmc6IHRydWUgfSldLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBhY2NlcHRFeHRlbnNpb246IFwiLnppcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVSZW1vdmVkOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBndWlkID0gb2JqLmZpbGVJbmZvLmd1aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChndWlkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXRpbHNDbnQuY2FsbChcIkRlbGV0ZUZpbGVcIiwge0d1aWQ6IGd1aWQgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9kc3RyYW5lbmkgZ2xvYmFsbmkgaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lmd1aWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6bmVwcmlzdHVwZW5pIGFrY2kgdiBtZW51XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmFjdGlvbnMuYWN0UHJlcGFyZUltcG9ydCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJlcGFyZUltcG9ydC5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5hY3Rpb25zLmFjdE5vdnlJbXBvcnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE5vdnlJbXBvcnQuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnljaXN0ZW5pIHZpZXcgZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3LnVwZGF0ZURhdGEoW10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVVcGxvYWRlZDogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3VpZCA9IG9iai5maWxlSW5mby5ndWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnV0aWxzQ250LmNhbGwoXCJUcmFuc2ZlckZpbGVcIiwgeyBHdWlkOiBndWlkIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ndWlkID0gZ3VpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5hY3Rpb25zLmFjdFByZXBhcmVJbXBvcnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJlcGFyZUltcG9ydC5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gLS0gUMWYScWYQURJVCBIUk9NQUROxJogVsSaQ07DiSBTS1VQSU5ZIFBSTyBET0svU1BJUyAtLVxyXG5cclxuICAgICAgICAgICAgdmFyIHZlY25hU2t1cGluYURva1NwaXNBY3Rpb246IE1lbnVQYXJhbXNbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmVjbmFTa3VwaW5hRG9rU3Bpc0FjdGlvbi5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RBZGRWZWNuYVNrdXBpbmFEb2tTcGlzTXVsdGlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAwOTJcIiwgLy9SQyAzMjAwMDA5MiA6IFDFmWnFmWFkaXRcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmogIT0gbnVsbCAmJiBvYmouZmllbGQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gJChvYmouZmllbGQpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyaWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJncmlkIG5lbmkgayBkaXNwb3ppY2lcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uID09IG51bGwgfHwgc2VsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzZWxlY3Rpb24gbmVuaSBrIGRpc3BvemljaSBuZWJvIG5lbmkgdnlicmFuIHphZG55IHJhZGVrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3dzVXBkYXRlZCA9IHNlbGVjdGlvbi5tYXAoKGRhdGFSb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVJvd1tcIlR5cEVudGl0eVwiXSAhPSBUeXBFbnRpdHkuRG9rdW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVJvd1tcIlR5cEVudGl0eVwiXSAhPSBUeXBFbnRpdHkuU3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhUm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFSb3dbXCJJeHNWc2tcIl0gPSB2YWx1ZS5peHNfdnNrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFSb3dbXCJWZWNuYVNrdXBpbmFOYXpldlwiXSA9IHZhbHVlLm5hemV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFSb3dbXCJWZWNuYVNrdXBpbmFTcGlzWm5ha1wiXSA9IHZhbHVlLnNwaXNfem5haztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVJvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3LnVwZGF0ZURhdGEocm93c1VwZGF0ZWQsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIC0tIFDFmEnFmEFESVQgSFJPTUFETsSaIFbEmkNOw4kgU0tVUElOWSBQUk8gVFlQLiBTUElTWSAtLVxyXG5cclxuICAgICAgICAgICAgdmFyIHZlY25hU2t1cGluYVR5cFNwaXNBY3Rpb246IE1lbnVQYXJhbXNbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmVjbmFTa3VwaW5hVHlwU3Bpc0FjdGlvbi5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RBZGRWZWNuYVNrdXBpbmFUeXBTcGlzTXVsdGlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAwOTJcIiwgLy9SQyAzMjAwMDA5MiA6IFDFmWnFmWFkaXRcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmogIT0gbnVsbCAmJiBvYmouZmllbGQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gJChvYmouZmllbGQpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyaWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJncmlkIG5lbmkgayBkaXNwb3ppY2lcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uID09IG51bGwgfHwgc2VsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzZWxlY3Rpb24gbmVuaSBrIGRpc3BvemljaSBuZWJvIG5lbmkgdnlicmFuIHphZG55IHJhZGVrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvd3NVcGRhdGVkID0gc2VsZWN0aW9uLm1hcCgoZGF0YVJvdykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhUm93W1wiVHlwRW50aXR5XCJdICE9IFR5cEVudGl0eS5UeXBvdnlTcGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVJvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUm93W1wiSXhzVnNrXCJdID0gdmFsdWUuaXhzX3ZzaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUm93W1wiVmVjbmFTa3VwaW5hTmF6ZXZcIl0gPSB2YWx1ZS5uYXpldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUm93W1wiVmVjbmFTa3VwaW5hU3Bpc1puYWtcIl0gPSB2YWx1ZS5zcGlzX3puYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFSb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlldy51cGRhdGVEYXRhKHJvd3NVcGRhdGVkLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIHZhciBwcmVmYWJHaW5zdnNrT3B0aW9uc0Rva1NwaXMgPSBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc3ZzaygpO1xyXG4gICAgICAgICAgICBwcmVmYWJHaW5zdnNrT3B0aW9uc0Rva1NwaXMgPSAkLmV4dGVuZChwcmVmYWJHaW5zdnNrT3B0aW9uc0Rva1NwaXMsICh7XHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJjZW5pX3NwaXNfejogWzEsIDIsIDNdLCAgICAgICAvLyBkb2t1bWVudHkgYSBzcGlzeVxyXG4gICAgICAgICAgICAgICAgICAgIEplbktvbmNvdmU6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IHZlY25hU2t1cGluYURva1NwaXNBY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlZlY25hU2t1cGluYU11bHRpRG9rU3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHVyY2VuaV9zcGlzX3o6IFsxLCAyLCAzXSwgICAgICAgLy8gZG9rdW1lbnR5IGEgc3Bpc3lcclxuICAgICAgICAgICAgICAgICAgICBKZW5Lb25jb3ZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5uYXpldiArIFwiIHwgXCIgKyB2YWx1ZS5zcGlzX3puYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBGb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzIwMDAxNzNcIikgIC8vUkMgMzIwMDAxNzMgOiBIcm9tYWRuw6Egem3Em25hIHbEm2Nuw6kgc2t1cGlueVxyXG5cclxuICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzIwMDAwOTFcIikgLy9SQyAzMjAwMDA5MSA6IFBybyBzcGlzeS9kb2t1bWVudHlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgcHJlZmFiR2luc3Zza09wdGlvbnNEb2tTcGlzKVxyXG5cclxuICAgICAgICAgICAgdmFyIHByZWZhYkdpbnN2c2tPcHRpb25zVHlwU3BpcyA9IEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zdnNrKCk7XHJcbiAgICAgICAgICAgIHByZWZhYkdpbnN2c2tPcHRpb25zVHlwU3BpcyA9ICQuZXh0ZW5kKHByZWZhYkdpbnN2c2tPcHRpb25zVHlwU3BpcywgKHtcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICB1cmNlbmlfc3Bpc196OiA1LCAgICAgICAvLyB0eXBvdsOpIHNwaXN5XHJcbiAgICAgICAgICAgICAgICAgICAgLy9KZW5Lb25jb3ZlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICBidXR0b25zOiB2ZWNuYVNrdXBpbmFUeXBTcGlzQWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJWZWNuYVNrdXBpbmFUeXBTcGlzTXVsdGlcIixcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICB1cmNlbmlfc3Bpc196OiA1LCAgICAgICAvLyB0eXBvdsOpIHNwaXN5XHJcbiAgICAgICAgICAgICAgICAgICAgLy9KZW5Lb25jb3ZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5uYXpldiArIFwiIHwgXCIgKyB2YWx1ZS5zcGlzX3puYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBGb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMjAwMDA5OVwiKSAvL1JDIDMyMDAwMDk5IDogUHJvIHR5cG92w6kgc3Bpc3lcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgcHJlZmFiR2luc3Zza09wdGlvbnNUeXBTcGlzKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZm9ybS5nZm9ybShcImNyZWF0ZUZyb21cIiwgRm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogZWwuIHNvdWJvcnkgcHJvIGltcG9ydCAqL1xyXG4gICAgICAgIHByaXZhdGUgZWxlRmlsZXNUb0ltcG9ydDogYW55W107XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudWJhcigpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtczogTWVudVBhcmFtc1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBwYXJhbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQcmVwYXJlSW1wb3J0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDk0XCIsIC8vUkMgMzIwMDAwOTQgOiBQxZnDrXByYXZhIGltcG9ydHVcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51dGlscy53YWl0Rm9yVmFsdWVzKHRoaXMuZm9ybSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChpc1ZhbGlkLCBkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3JtdWzDocWZIG5lbsOtIHZhbGlkbsSbIHZ5cGxuxJtuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzVmFsaWQgIT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGwoXCJJbXBvcnREb2N1bWVudFByZXBhcmUyMDI0XCIsIHsgR3VpZDogZGF0YS5HdWlkWzBdLCBJeHNFeHQ6IGRhdGEuSXhzRXh0IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChvdXRwdXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKiB2w71ixJtyIGVudGl0eSAoZG9rdW1lbnR5LCBzcGlzeSwuLi4pIGRvIGdyaWR1ICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJdGVtMTogYW55W10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiogaWQgZMOhdmt5ICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJdGVtMj86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKiB2w71ixJtyIHbFoWVjaCBzb3Vib3LFrywgbmV6b2JyYXpvdmF0LCBhbGUgYnLDoXQgdiBwb3RheiAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXRlbTM6IGFueVtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF2a2FfaWQgPSBvdXRwdXQuSXRlbTI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcudXBkYXRlRGF0YShvdXRwdXQuSXRlbTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVGaWxlc1RvSW1wb3J0ID0gb3V0cHV0Lkl0ZW0zO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG96bmHEjWVuw60gdsWhZWNoIMWZw6Fka8WvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0YW5jZTogYW55ID0gdGhpcy5ncmlkLmdncmlkKFwiaW5zdGFuY2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UgIT0gbnVsbCAmJiBpbnN0YW5jZS5hY3Rpb25zICE9IG51bGwgJiYgaW5zdGFuY2UuYWN0aW9ucy5hY3RDaGVja0FsbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuYWN0aW9ucy5hY3RDaGVja0FsbC5ydW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE5vdnlJbXBvcnRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAwNjZcIiwgLy9SQyAzMjAwMDA2NiA6IFNwdXN0aXQgaW1wb3J0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUZsYXNoKFwiaWRGbGFzaFNlbGVjdGlvblwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyaWQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9kZmlsdHJvdmFuaSBuZXBvdm9sZW55Y2ggZW50aXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoaXMuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKS5maWx0ZXIoKHJvdykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvd1tcIlVtb3puaXRWeWJlclV6aXZhdGVsZVwiXSA9PT0gdHJ1ZSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaCh7IGlkOiBcImlkRmxhc2hTZWxlY3Rpb25cIiwgY29udGVudDogXCJqcmVzOjMyMDAwMjA3XCIsIHN0YXRlOiBcIndhcm5pbmdcIiB9KTsgLy9SQyAzMjAwMDIwNyA6IE5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gxZnDoWRlayB2IHNlem5hbXUgbmVibyDFmcOhZGVrIHYgc2V6bmFtdSBuZW7DrSBwb3ZvbGVuIHBybyB2w71ixJtyLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWV0YXJvd3MgPSB0aGlzLnZpZXcuZ2V0Um93cyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGFyb3dzID09IG51bGwgfHwgbWV0YXJvd3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaCh7IGlkOiBcImlkRmxhc2hTZWxlY3Rpb25cIiwgY29udGVudDogXCJqcmVzOjMyMDAwMjA3XCIsIHN0YXRlOiBcIndhcm5pbmdcIiB9KTsgLy9SQyAzMjAwMDIwNyA6IE5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gxZnDoWRlayB2IHNlem5hbXUgbmVibyDFmcOhZGVrIHYgc2V6bmFtdSBuZW7DrSBwb3ZvbGVuIHBybyB2w71ixJtyLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnV0aWxzLndhaXRGb3JWYWx1ZXModGhpcy5mb3JtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGlzVmFsaWQsIGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvcm11bMOhxZkgbmVuw60gdmFsaWRuxJsgdnlwbG7Em25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZCAhPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRhdGEgbmVibyBndWlkIG5lbsOtIG5hcGxuxJtuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCB8fCBkYXRhLkd1aWQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbGVGaWxlc1RvSW1wb3J0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk5lanNvdSBrIGRpc3BvemljaSDFvsOhZG7DqSBlbGUgc291Ym9yeSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvem5hxI1lbsOtIGVsZSBzb3Vib3LFryB1xb5pdmF0ZWxlbSAocHJvIGppc3RvdHUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZXJvd3MgPSB0aGlzLmVsZUZpbGVzVG9JbXBvcnQubWFwKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbXCJWeWJlclV6aXZhdGVsZVwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb25lU2VsZWN0Um93OiBhbnkgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2eWJyYWxpIGpzbWUgcG91emUgamVkZW4gxZnDoWRlayBhIGplIMWhYW5jZSwgxb5lIGpzbWUgaG8gbmV6YWtsaWtudWxpLCBhbGUgesOhcm92ZcWIIGhvIGNoY2VtZSBwb3XFvsOtdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9kZmxpdHJvdsOhbsOtLCDFvmUgxZnDoWRlayBtxa/FvmVtZSBwb3XFvsOtdCBqacW+IHByb2LEm2hsbyB2w63FoWUgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25lU2VsZWN0Um93ID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvd3MgPSBtZXRhcm93cy5tYXAoKG1ldGFkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGplZG5vxZnDoWRrb3bDvSB2w71ixJtyLCBrZHkgbmVtdXPDrSBkb2rDrXQgayB6YcWha3J0bnV0w61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uZVNlbGVjdFJvdyAhPSBudWxsICYmIG1ldGFkYXRhLmRhdGFbXCJJZEVudGl0eVwiXSA9PT0gb25lU2VsZWN0Um93W1wiSWRFbnRpdHlcIl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhLmRhdGFbXCJWeWJlclV6aXZhdGVsZVwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YS5kYXRhW1wiVnliZXJVeml2YXRlbGVcIl0gPSBtZXRhZGF0YS5jaGVja2VkICE9IG51bGwgPyBtZXRhZGF0YS5jaGVja2VkIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1ldGFkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNwb2plbsOtIGVudGl0IGEgZWwuIHNvdWJvcsWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdEVudGl0aWVzID0gcm93cy5jb25jYXQoZWxlcm93cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fc3MuRGlhbG9ncy5HRXNzRmluYWxpemVJbXBvcnREbGcodGhpcywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVudGl0aWVzOiByZXN1bHRFbnRpdGllcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdmthSWQ6IHRoaXMuZGF2a2FfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHdWlkOiBkYXRhLkd1aWRbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHNFeHQ6IGRhdGEuSXhzRXh0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kYmFyKCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zOiBNZW51UGFyYW1zW10gPSBbXTtcclxuICAgICAgICAgICAgcGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAwMThcIiwgLy9SQyAzMjAwMDAxOCA6IFphdsWZw610XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIocGFyYW1zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5Fc3MuV2ViQ29udHJvbHMge1xyXG5cclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb3R2cnplbsOtIGTDoXZreVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIHRoYXptdWthXHJcbiAgICAgKiBAc2luY2UgNTI1MjAuMTFcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0Vzc1BvdHZyemVuaSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIHV0aWxzQ250OiBHQ29udGVudDtcclxuICAgICAgICBwcml2YXRlIHV0aWxzOiBHRXNzVXRpbHM7XHJcbiAgICAgICAgLyoqIGlkIGd1aWR1IHhtbCBzb3Vib3J1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBndWlkPzogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgICAvKiogaWRlbnRpZmlrw6F0byBleHRlcm7DrWhvIHN5c3TDqW11ICovXHJcbiAgICAgICAgcHJpdmF0ZSBJeHNFeHQ6IHN0cmluZztcclxuICAgICAgICAvKiogaWQgZMOhdmt5ICovXHJcbiAgICAgICAgcHJpdmF0ZSBEYXZrYUlkOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudXRpbHMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51dGlscyA9IG5ldyBHRXNzVXRpbHMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy51dGlsc0NudCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnV0aWxzQ250ID0gbmV3IEdDb250ZW50KFwiR29yZGljLkVzcy5XZWJDb250cm9scy5HRXNzVXRpbHNcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51YmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRiYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZGJhcigpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtczogTWVudVBhcmFtc1tdID0gW107XHJcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDE4XCIsIC8vUkMgMzIwMDAwMTggOiBaYXbFmcOtdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnViYXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXM6IE1lbnVQYXJhbXNbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgcGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UG90dnJkaXREYXZrdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDE2NlwiLCAvL1JDIDMyMDAwMTY2IDogUG90dnJkaXQgZMOhdmt1XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlRmxhc2goXCJHRXNzUG90dnJ6ZW5pRXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXRpbHMud2FpdEZvclZhbHVlcyh0aGlzLmZvcm0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoaXNWYWxpZCwgZGF0YTogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGb3JtdWzDocWZIG5lbsOtIHZhbGlkbsSbIG5hcGxuxJtuLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEYXRhIHBvIHZhbGlkYWNpIGZvcm11bMOhxZllIHDFmWVkIHBvdHZyemVuw61tIGTDoXZreSDFoXBhdG7EmyBuYXBsbsSbbmEuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5JeHNFeHQgPT0gbnVsbCB8fCBkYXRhLkl4c0V4dCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiSWRlbnRpZmlrw6F0b3IgZXh0ZXJuw61obyBzeXN0w6ltdSBuZW7DrSBuYXBsbsSbbi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGwoXCJJbXBvcnRQb3R2cnplbmkyMDI0XCIsIHsgR3VpZDogZGF0YS5HdWlkWzBdLCBJeHNFeHQ6IGRhdGEuSXhzRXh0IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXZrYV9pZD86IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdmthX2lkID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwianJlczozMjAwMDE3NVwiLCAvL1JDIDMyMDAwMTc1IDogUG90dnJ6ZW7DrSBkw6F2a3kgbmV2csOhdGlsbyBpZGVudGlmaWvDoXRvciBkw6F2a3kuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBcIndhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiR0Vzc1BvdHZyemVuaUVycm9yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdWxvxb5lbsOtIG5hIGdsb2LDoWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkl4c0V4dCA9IGRhdGEuSXhzRXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRGF2a2FJZCA9IGRhdmthX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvdm9sZW7DrSBha2NlIHYgbWVudVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGlvbnMuYWN0RGV0YWlsRGF2a2EgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsRGF2a2EuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXNzLkRpYWxvZ3MuR0Vzc0RldGFpbERhdmthRGxnKHRoaXMsIHsgZGF2a2FfaWQ6IGRhdmthX2lkLCBpeHNfZXh0OiBkYXRhLkl4c0V4dCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGFsaWduOiBcIm9wcG9zaXRlXCIsXHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3REZXRhaWxEYXZrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDEyM1wiLCAvL1JDIDMyMDAwMTIzIDogRGV0YWlsIGltcG9ydG92YW7DqSBkw6F2a3lcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVGbGFzaChcImRhdmthRmxhc2hJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuRGF2a2FJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaCh7IGNvbnRlbnQ6IFwianJlczozMjAwMDEyNFwiLCBzdGF0ZTogXCJ3YXJuaW5nXCIsIGlkOiBcImRhdmthRmxhc2hJZFwiIH0pOyAvL1JDIDMyMDAwMTI0IDogRGV0YWlsIGTDoXZreSBuZW7DrSBrIGRpc3BvemljaS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVzcy5EaWFsb2dzLkdFc3NEZXRhaWxEYXZrYURsZyh0aGlzLCB7IGRhdmthX2lkOiB0aGlzLkRhdmthSWQsIGl4c19leHQ6IHRoaXMuSXhzRXh0ISB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5mb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHZhciBGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJGb3JtUHJlcGFyZUltcG9ydERhdGFcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEsIEwtMy04LTEsIE0tMTItMTEtMSwgUy0xMi0xMS0xLCBicmVha3MtNzAwLTEwMDBcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIEZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMjAwMDA1NFwiKSAvL1JDIDMyMDAwMDU0IDogVnN0dXBuw60gbmFzdGF2ZW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IHJlcXVpcmVkOiB0cnVlLCBsYWJlbDogXCJqcmVzOjMyMDAwMDQ4XCIgfSkgLy9SQyAzMjAwMDA0OCA6IEV4dGVybsOtIHN5c3TDqW1cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmludHNleHQoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJJeHNFeHRcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5JeHNFeHQ9dmFsdWUuaXhzX2V4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IFsxMDBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcml6X2VzczogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVyemVfZXNzOiBcIk5TMjAyNFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIEZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMyMDAwMTY1XCIpIC8vUkMgMzIwMDAxNjUgOiBYTUwgc291Ym9yIHBybyBwb3R2cnplbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZmlsZWZpZWxkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZpbGVcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5HdWlkPXZhbHVlLmd1aWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHsgc3RvcHBpbmc6IHRydWUgfSldLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBhY2NlcHRFeHRlbnNpb246IFwiLnhtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVSZW1vdmVkOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBndWlkID0gb2JqLmZpbGVJbmZvLmd1aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChndWlkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXRpbHNDbnQuY2FsbChcIkRlbGV0ZUZpbGVcIiwgeyBHdWlkOiBndWlkIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvZHN0cmFuZW5pIGdsb2JhbG5pIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ndWlkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem5lcHJpc3R1cGVuaSBha2NpIHYgbWVudVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5hY3Rpb25zLmFjdFBvdHZyZGl0RGF2a3UgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFBvdHZyZGl0RGF2a3UuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmaWxlVXBsb2FkZWQ6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGd1aWQgPSBvYmouZmlsZUluZm8uZ3VpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51dGlsc0NudC5jYWxsKFwiVHJhbnNmZXJGaWxlXCIsIHsgR3VpZDogZ3VpZCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3VpZCA9IGd1aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem5lcHJpc3R1cGVuaSBha2NpIHYgbWVudVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmFjdGlvbnMuYWN0UG90dnJkaXREYXZrdSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQb3R2cmRpdERhdmt1LmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZm9ybS5nZm9ybShcImNyZWF0ZUZyb21cIiwgRm9ybSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==
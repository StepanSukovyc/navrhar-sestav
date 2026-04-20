"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var WebControls;
        (function (WebControls) {
            /**
            * Získá přihlášeného uživatele.
            * @param then Kontent, ze kterého je funkce volána.
            * @returns Přihlášený uživatel jako string.
            */
            async function getActualUser(then) {
                const server = then.createServiceContent("Gordic.Ron.WebControls.GRonUtils");
                const actualUser = await server.call("GetActualUser");
                return actualUser;
            }
            WebControls.getActualUser = getActualUser;
        })(WebControls = Ron.WebControls || (Ron.WebControls = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var WebControls;
        (function (WebControls) {
            /**
            * Generický abstraktní základ pro contenty v RON.
            *
            * TInput  - vstupní contract contentu (pokud je potřeba)
            * TOutput - výstupní contract contentu (pokud je potřeba)
            */
            class GRonDialogBase extends GContent {
                constructor() {
                    super(...arguments);
                    // Názvy akci, které content používá. Uloženo v objektu,
                    // aby nedocházelo k překlepům, při použití názvů akcí jen jako string
                    this.actionNames = {
                        // GRonMasky, GRonRozpisy
                        new: "new",
                        detail: "detail",
                        delete: "delete",
                        // GRonRozpisyDetail, GRonMaskyDetail
                        edit: "edit",
                        save: "save",
                        endEdit: "endEdit",
                        close: "close",
                        saveAndClose: "saveAndClose",
                        // GRonMaskyDetail, GRonRozpisyDetail
                        newData: "newData",
                        deleteData: "deleteData",
                        copyData: "copyData",
                        // tohle patří k právům
                        newBook: "newBook",
                        newFunction: "newFunction",
                        deleteRight: "deleteRight",
                    };
                }
                /**
                 * Volitelná metoda, která se zavolá před vytvořením obsahu contentu.
                 * @param input
                 */
                async beforeBuildContent(input) { }
                ;
                /**
                 * Volitelná metoda, která se zavolá po vytvoření obsahu contentu.
                 * @param input
                 */
                async afterBuildContent(input) { }
                ;
                /**
                 * @internal
                 * Tato metoda je určena jen pro framework.
                 * Nepoužívejte přímo.
                 */
                async prepareContent(input) {
                    this.prepareActions(input);
                    this.buildMenu();
                    await this.beforeBuildContent(input);
                    await this.buildContent(input);
                    await this.afterBuildContent(input);
                }
            }
            WebControls.GRonDialogBase = GRonDialogBase;
        })(WebControls = Ron.WebControls || (Ron.WebControls = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var Dialogs;
        (function (Dialogs) {
            function GRonGeneratoryDlg(input) {
                // kvli uživatelskému nastavení, ID contentu
                const options = $.extend({}, input.opt, {
                    ID: 'GRonGeneratory#'
                });
                return Gordic.Gui.Dialogs._openDialog2(input?.parentContent, Ron.WebControls.GRonGeneratory, input?.ModOtevreni, options);
            }
            Dialogs.GRonGeneratoryDlg = GRonGeneratoryDlg;
        })(Dialogs = Ron.Dialogs || (Ron.Dialogs = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Hlavní třída contentu.
             */
            let GRonGeneratory = class GRonGeneratory extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "jres:35100002"; //RC 35100002 : Generátory
                    this.taskId = "actGeneratory";
                }
                /**
                 *
                 * @param input
                 */
                prepareContent(input) {
                    alert("Generatory");
                }
            };
            GRonGeneratory = __decorate([
                gcontent
            ], GRonGeneratory);
            WebControls.GRonGeneratory = GRonGeneratory;
        })(WebControls = Ron.WebControls || (Ron.WebControls = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var Dialogs;
        (function (Dialogs) {
            function GRonKumulaceDlg(input) {
                // kvli uživatelskému nastavení, ID contentu
                const options = $.extend({}, input.opt, {
                    ID: 'GRonKumulace#'
                });
                console.log(input?.ModOtevreni);
                return Gordic.Gui.Dialogs._openDialog2(input?.parentContent, Ron.WebControls.GRonKumulace, input?.ModOtevreni, options);
            }
            Dialogs.GRonKumulaceDlg = GRonKumulaceDlg;
        })(Dialogs = Ron.Dialogs || (Ron.Dialogs = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Hlavní třída contentu.
             */
            let GRonKumulace = class GRonKumulace extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "jres:35100003"; //RC 35100003 : Kumulace
                    this.taskId = "actKumulace";
                }
                /**
                 *
                 * @param input
                 */
                prepareContent(input) {
                    alert("Kumulace");
                }
            };
            GRonKumulace = __decorate([
                gcontent
            ], GRonKumulace);
            WebControls.GRonKumulace = GRonKumulace;
        })(WebControls = Ron.WebControls || (Ron.WebControls = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var Dialogs;
        (function (Dialogs) {
            /**
             * Dialog pro výběr masek.
             * @param input Vstupní parametry dialogu.
             * @returns Promise s výstupními daty.
             */
            function GRonMaskyDlg(input) {
                // kvli uživatelskému nastavení, ID contentu
                const options = $.extend({}, input.opt, {
                    ID: 'GRonMasky#'
                });
                return Gordic.Gui.Dialogs._openDialog2(input?.parentContent, Ron.WebControls.GRonMasky, input?.ModOtevreni, options);
            }
            Dialogs.GRonMaskyDlg = GRonMaskyDlg;
            /**
             * Dialog pro detail masky.
             * @param input Vstupní parametry dialogu.
             * @returns Promise s výstupními daty.
             */
            function GRonMaskyDetailDlg(input) {
                // kvli uživatelskému nastavení, ID contentu
                const options = $.extend({}, input.opt, {
                    ID: 'GRonDetailMasky#'
                });
                return Gordic.Gui.Dialogs._openDialog2(input?.parentContent, Ron.WebControls.GRonMaskyDetail, input?.ModOtevreni, options);
            }
            Dialogs.GRonMaskyDetailDlg = GRonMaskyDetailDlg;
        })(Dialogs = Ron.Dialogs || (Ron.Dialogs = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var WebControls;
        (function (WebControls) {
            // #region Vstupní/výstupní rozhraní.
            // #endregion
            /**
             * Hlavní třída contentu.
             */
            class GRonMasky extends WebControls.GRonDialogBase {
                constructor() {
                    super(...arguments);
                    this.taskId = "actMasky";
                    this.title = "jres:35100004"; //RC 35100004 : Masky
                    // #endregion
                }
                /**
                * Spustí se před vytvořením obsahu contentu.
                * @param input Vstupní parametry contentu.
                */
                async beforeBuildContent(input) {
                    if (!input)
                        throw new Error("Vstupní parametry contentu nejsou definovány.");
                }
                /**
                 * Vytvoří obsah contentu.
                 * @param input Vstupní parametry contentu.
                 */
                async buildContent(input) {
                    // grid seznamu masek
                    this.$grid = $.newDiv("grid")
                        .appendTo(this.element)
                        .ggrid({
                        name: "maskGrid",
                        data: this.$islView = new Gordic.Isl.View(this.isl.MaskService.list(), {}),
                        multi: false,
                        columnMode: "full",
                        emptyMessage: "jres:35100013", //RC 35100013 : Nejsou nadefinované žádné masky
                        columns: this.createGridFormat(),
                        defaultAction: this.actions[this.actionNames.detail]
                    })
                        .gautofit();
                }
                /**
                 * Vytvoří menu pro tento content.
                 */
                buildMenu() {
                    // vytvoří parametry menu
                    const menuParams = this.actions.createBar([
                        { action: this.actions[this.actionNames.detail], favorite: true },
                        { action: this.actions[this.actionNames.new], favorite: true },
                        { action: this.actions[this.actionNames.delete], favorite: true }
                    ]);
                    // naplní menu parametry
                    this.menuBar(menuParams);
                }
                /**
                 * Připraví akce pro content.
                 * @param input Vstupní parametry contentu.
                 */
                prepareActions(input) {
                    // pokud není vstupní parametr, tak se nic neprovádí
                    if (!input)
                        return;
                    this.actions.addRange({
                        // akce pro vytvoření nové masky
                        [this.actionNames.new]: {
                            caption: "jres:35100014", //RC 35100014 : Nová maska
                            captionVisible: "normal",
                            icon: "fa-plus",
                            run: () => {
                                this.openDetail("jres:35100014", input.ico, input.rok); //RC 35100014 : Nová maska
                            }
                        },
                        // akce pro zobrazení detailu masky
                        [this.actionNames.detail]: {
                            name: this.actionNames.detail,
                            caption: "jres:35100015", //RC 35100015 : Detail
                            captionVisible: "normal",
                            icon: "gi-detail",
                            run: () => {
                                // získání aktivního řádku
                                const activeRowData = this.$grid.ggrid("activeRow");
                                this.openDetail("jres:35100012", input.ico, input.rok, activeRowData); //RC 35100012 : Detail masky
                            }
                        },
                        // akce pro smazání detailu masky
                        [this.actionNames.delete]: {
                            caption: "jres:35100016", //RC 35100016 : Odstranit
                            captionVisible: "normal",
                            icon: "fa-trash",
                            run: async () => {
                                const activeRowData = this.$grid.ggrid("activeRow");
                                if (activeRowData) {
                                    const deleteResult = await this.isl.MaskService.delete(activeRowData).get();
                                    if (deleteResult)
                                        this.$islView.updateData(activeRowData, "delete");
                                    else
                                        GDlg.alert("jres:35100046"); //RC 35100046 : Při mazání masky došlo k chybě. Více informací v logách.
                                }
                            }
                        }
                    });
                }
                // #region Private methods
                /**
                 * Příprava gridu pro zobrazení masek.
                 * @returns GridFormat pro masky.
                 */
                createGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "typ_masky_zkr",
                        caption: "jres:35100036" //RC 35100036 : Typ masky
                    })
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:35100037" //RC 35100037 : Název
                    })
                        .addTextColumn({
                        name: "ixs_fun_akt_rf",
                        caption: "jres:35100038" //RC 35100038 : Vlastník
                    })
                        .addTextColumn({
                        name: "poznamka",
                        caption: "jres:35100039" //RC 35100039 : Poznámka
                    })
                        .addTextColumn({
                        name: "prava_txt",
                        caption: "jres:35100040" //RC 35100040 : Práva
                    })
                        .addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "jres:35100041", //RC 35100041 : Datum změny
                    })
                        .addTextColumn({
                        name: "zmenu_prov_rf",
                        caption: "jres:35100042" //RC 35100042 : Změnu provedl
                    });
                }
                /**
                 * Otevře detail masky.
                 * @param title Název okna detailu.
                 * @param ico Ico přihlášeného uživatele.
                 * @param rok Účetní rok.
                 * @param selectedRow Vybraný řádek v gridu, pokud je k dispozici.
                 * @returns
                 */
                async openDetail(title, ico, rok, selectedRow) {
                    const result = await Gordic.Ron.Dialogs.GRonMaskyDetailDlg({
                        parentContent: this,
                        ModOtevreni: Gordic.Global.Enums.ModOtevreni.navigate,
                        opt: {
                            contentTitle: title,
                            maskaData: selectedRow,
                            ico: ico,
                            rok: rok
                        }
                    });
                    // pokud je výstup z detailu definován a je změněn, aktualizuje se grid
                    if (result?.isChanged)
                        this.$islView?.requestData();
                }
            }
            WebControls.GRonMasky = GRonMasky;
        })(WebControls = Ron.WebControls || (Ron.WebControls = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var WebControls;
        (function (WebControls) {
            // #region Vstupní/výstupní rozhraní.
            // #endregion
            /**
             * Hlavní třída contentu.
             */
            class GRonMaskyDetail extends WebControls.GRonDialogBase {
                constructor() {
                    super(...arguments);
                    this.taskId = "actMaskyDetail";
                    // #endregion
                }
                /**
                 * Zavoláno před samotnou stavbou contentu.
                 * @param input Vstupní parametry contentu.
                 */
                async beforeBuildContent(input) {
                    if (!input)
                        throw new Error("jres:35100017"); //RC 35100017 : Nebyly předány vstupní parametry.
                    // nastavení titulku okna
                    this.title = this.prepareContentTitle(input.contentTitle, input.maskaData?.nazev);
                }
                /**
                 * Vykreslí obsah contentu.
                 * Pochází z GRonDialogBase, kde je deklarován jako abstraktní.
                 * @param input Vstupní parametry contentu.
                 */
                async buildContent(input) {
                    this._dataGridPrava = new Gordic.Data.View();
                    this._default = Gordic.Utils.DeepClone(input);
                    this._isNew = !input.maskaData;
                    const initialOwnerFun = this._isNew ? await WebControls.getActualUser(this) : undefined;
                    const initialMaskType = this._isNew ? 20 : undefined;
                    this.createForm(initialOwnerFun, initialMaskType);
                    this.loadValidators();
                    this.createGridMaskDetail(input.ico, input.rok, input.maskaData?.typ_masky);
                    this.createGridPrava();
                    await this.loadData(input.maskaData?.ixs_msk);
                    this.changeEnabled(this._isNew);
                }
                /**
                 * Asynchroní načtení validátorů.
                 */
                async loadValidators() {
                    const server = this.createServiceContent("Gordic.Ron.WebControls.GRonUtils");
                    const validator = await server.call("GetValidatorsByType", { typeName: "Gordic.Ron.Interface.GMaskaDto" });
                    this.findFields().gfield("model", "validators", validator);
                }
                /**
                 * Volá se při zavírání contentu.
                 * @returns Promise, který vrací output z GRonMaskyDetail.
                 */
                async closing() {
                    const deferred = $.Deferred();
                    if (await this.isContentChanged()) {
                        // pokud došlo ke změně obsahu, tak se zeptá, zda chce uživatel uložit změny
                        GDlg.confirm("jres:35100047", "jres:35100048") //RC 35100047 : Neuložené změny //RC 35100048 : Ve formuři jsou neuložené změny, oprarvdu chdete ukončit editaci? 
                            .on("yes", () => {
                            deferred.resolve({ isChanged: false });
                        })
                            .on("no", () => {
                            deferred.reject();
                        })
                            .on("close", () => {
                            deferred.reject();
                        });
                    }
                    else {
                        deferred.resolve({ isChanged: true });
                    }
                    return deferred.promise();
                }
                // #region Private methods
                /**
                 * Vytvoření gridu pro zobrazení nastavení masky.
                 * @param ico
                 * @param rok
                 * @param typMasky
                 */
                createGridMaskDetail(ico, rok, typMasky) {
                    this.$gridMaskTab = $.newDiv()
                        .appendTo(this.element)
                        .gtab({
                        title: "jres:35100023", //RC 35100023 : Nastavení masky
                        opened: true,
                        locked: true,
                        menuBar: this.prepareTabMenu()
                    }).on("fieldchange", (ev) => {
                        // pokud se nejedná o nový záznam, tak se změny hned ukládají
                        // v případě nového záznamu se změny ukládají až při uložení formuláře
                        if (!this._isNew)
                            this.upsertMaskDetail();
                    });
                    // nastavení gridu
                    var selectorOptions = {
                        editable: false,
                        showTopPanel: false,
                        showBottomPanel: false,
                        gridFormat: this.createGridColumns_maska(ico, rok, typMasky),
                        gridRowHeight: 46
                    };
                    // vytvoření gridu jako contentu pro nastavení masek
                    this._gridMaskTabContent = $.content(this.$gridMaskTab.gcontent([Gordic.Eko.Prefabs.GEkoCfuGridSelector, selectorOptions]));
                }
                /**
                 * Vytvoření gridu pro nastavaní práv k masce.
                 */
                createGridPrava() {
                    const pravaTab = $.newDiv()
                        .appendTo(this.element)
                        .gtab({
                        title: "Práva",
                        opened: true,
                        locked: true,
                        menuBar: this.prepareRightsTabMenu()
                    });
                    this._viewPrava = this.createGridColumns_prava();
                    // grid pro zobrazení práv masek
                    this.$gridPravaTab = $.newDiv()
                        .appendTo(pravaTab)
                        .ggrid({
                        data: this._dataGridPrava,
                        columns: this._viewPrava,
                        navigationMode: "cell",
                        showTopPanel: false,
                        showBottomPanel: false,
                        columnMode: "full"
                    });
                }
                /**
                 * Vytvoří formát gridu pro zobrazení detailu masky.
                 * @returns Formát gridu pro zobrazení detailu masky.
                 */
                createGridColumns_maska(ico, rok, typ_masky) {
                    var result = new Gordic.Data.GridFormat()
                        .add({
                        name: "kniha",
                        caption: "Kniha",
                        editor: {
                            widget: "gstringbox"
                        }
                    })
                        .add({
                        name: "stav",
                        caption: "Stav",
                        editor: {
                            widget: "gstringbox"
                        }
                    })
                        .add({
                        name: "rozpis",
                        caption: "Rozpis",
                        editor: {
                            widget: "gstringbox",
                        }
                    })
                        .add({
                        name: "faze",
                        caption: "Fáze",
                        editor: {
                            widget: "gstringbox",
                        }
                    })
                        .add({
                        name: "ucs",
                        caption: "UCS",
                        cellTemplate: (data) => {
                            return Gordic.Eko.Prefabs.cellTemplate("ucs", data);
                        },
                        editor: Gordic.Eko.Filters.ucsInterval({
                            caption: "UCS",
                            model: "ucs",
                            ico: ico,
                            aktProhl: 100,
                            onlyActive: true
                        })
                    })
                        .add({
                        name: "uus",
                        caption: "UUS",
                        cellTemplate: (data) => {
                            return Gordic.Eko.Prefabs.cellTemplate("uus", data);
                        },
                        editor: (editorContext) => {
                            return Gordic.Eko.Filters.uusInterval({
                                caption: "UUS",
                                model: "uus",
                                ico: ico,
                                aktProhl: 100,
                                onlyActive: true,
                                ucs: editorContext.cellInfo.data.ucs?.start || null
                            });
                        }
                    })
                        .add({
                        name: "ns",
                        caption: "NS",
                        cellTemplate: (data) => {
                            return Gordic.Eko.Prefabs.cellTemplate("ns", data);
                        },
                        editor: Gordic.Eko.Filters.nksInterval({
                            caption: "NS",
                            model: "ns",
                            ico: ico,
                            aktProhl: 100,
                            onlyActive: true,
                        })
                    })
                        .add({
                        name: "h",
                        caption: "H",
                        editor: Gordic.Eko.Filters.drd({
                            caption: "H",
                            model: "h",
                            showOst: typ_masky == 10,
                            showUct: true,
                        })
                    })
                        .add({
                        name: "mesic",
                        caption: "M",
                        cellTemplate: (data) => { return Gordic.Eko.Prefabs.cellTemplate("mesic", data); },
                        editor: Gordic.Eko.Filters.integerInterval({
                            model: "mesic",
                            caption: "M",
                            firstField: {
                                minValue: 1,
                                maxValue: 12
                            }, secondField: {
                                minValue: 1,
                                maxValue: 12
                            }
                        })
                    })
                        .add({
                        name: "den",
                        caption: "D",
                        cellTemplate: (data) => { return Gordic.Eko.Prefabs.cellTemplate("den", data); },
                        editor: Gordic.Eko.Filters.integerInterval({
                            caption: "D",
                            model: "den",
                            firstField: {
                                minValue: 1,
                                maxValue: 31
                            }, secondField: {
                                minValue: 1,
                                maxValue: 31
                            }
                        })
                    })
                        .add({
                        name: "doklad",
                        caption: "Doklad",
                        cellTemplate: (data) => { return Gordic.Eko.Prefabs.cellTemplate("doklad", data); },
                        editor: Gordic.Eko.Filters.acInterval({
                            caption: "Doklad",
                            model: "doklad",
                            ico: ico,
                            acLength: 1,
                            aktivita: 100,
                            rok: rok,
                            subrada: 1,
                            typ: 0,
                            zkratka: "aa"
                        })
                    })
                        .addSortedEkoCfuSet(Gordic.Eko.CfuUtils.getCfuSetEditors(this))
                        .add({
                        name: "md",
                        caption: "MD",
                        cellTemplate: (data) => { return Gordic.Eko.Prefabs.cellTemplate("md", data); },
                        editor: Gordic.Eko.Filters.decimalInterval({
                            caption: "MD",
                            model: "md"
                        })
                    })
                        .add({
                        name: "dal",
                        caption: "Dal",
                        cellTemplate: (data) => { return Gordic.Eko.Prefabs.cellTemplate("dal", data); },
                        editor: Gordic.Eko.Filters.decimalInterval({
                            caption: "Dal",
                            model: "dal"
                        })
                    })
                        .add({
                        name: "popis",
                        caption: "Popis",
                        editor: {
                            widget: "gstringbox"
                        }
                    })
                        .add({
                        name: "rokDPH",
                        caption: "Rok DPH",
                        cellTemplate: (data) => { return Gordic.Eko.Prefabs.cellTemplate("rokDPH", data); },
                        editor: Gordic.Eko.Filters.integerInterval({
                            caption: "Rok DPH",
                            model: "rokDPH"
                        })
                    })
                        .add({
                        name: "medph",
                        caption: "Mě DPH",
                        cellTemplate: (data) => { return Gordic.Eko.Prefabs.cellTemplate("meDPH", data); },
                        editor: Gordic.Eko.Filters.integerInterval({
                            caption: "Mě DPH",
                            model: "meDPH"
                        })
                    })
                        .add({
                        name: "zd",
                        caption: "ZD",
                        cellTemplate: (data) => { return Gordic.Eko.Prefabs.cellTemplate("zd", data); },
                        editor: Gordic.Eko.Filters.zdInterval({
                            caption: "ZD",
                            model: "zd",
                            isProEkoFilter: true
                        })
                    })
                        .add({
                        name: "pid",
                        caption: "PID",
                        editor: {
                            widget: "gstringbox"
                        }
                    })
                        .add({
                        name: "datumZmeny",
                        caption: "Datum změny",
                        cellTemplate: (data) => { return Gordic.Eko.Prefabs.cellTemplate("datumZmeny", data); },
                        editor: Gordic.Eko.Filters.dateInterval({
                            caption: "Datum změny",
                            model: "datumZmeny                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      "
                        })
                    })
                        .add({
                        name: "agenda",
                        caption: "Agenda",
                        editor: {
                            options: {
                                disabled: true
                            },
                            widget: "gstringbox"
                        }
                    })
                        .add({
                        name: "puvod",
                        caption: "Původ",
                        visible: false,
                        editor: {
                            options: {
                                disabled: true
                            },
                            widget: "gstringbox",
                        }
                    });
                    return result;
                }
                /**
                 * Načte data do contentu.
                 * @param maskData Data o masce.
                 */
                async loadData(ixs_mask) {
                    this.beginOperation();
                    if (!this._isNew) {
                        const maskData = await this.isl.MaskService.read({ ixs_msk: ixs_mask }).getData();
                        this.$maskDetailForm
                            .findFields()
                            .gfield("model", "apply", maskData, { initialValues: true });
                        const masksDetail = await this.isl.MaskService.readDetail({ ixs_msk: ixs_mask }).getData();
                        if (masksDetail) {
                            this._default.maskaDataDetail = Gordic.Utils.DeepClone(masksDetail);
                            this._gridMaskTabContent?.setData(masksDetail);
                        }
                        const rightsDetail = await this.isl.PravaService.list({ filters: { ixs_obj: ixs_mask } }).getData();
                        if (rightsDetail) {
                            this._dataGridPrava.updateData(rightsDetail);
                        }
                    }
                    else {
                        await this._gridMaskTabContent?.readyAwait;
                        this._default.maskaDataDetail = [{ radek: 1 }];
                    }
                    this.endOperation();
                }
                /**
                 * Vytvoří formát gridu pro zobrazení práv masky.
                 * @returns Formát gridu pro zobrazení práv masky.
                 */
                createGridColumns_prava() {
                    return new Gordic.Data.GridFormat()
                        .add({
                        name: "vlastnikPrav",
                        caption: "Uživatel/Skupina",
                    })
                        .add({
                        name: "pristup",
                        caption: "Přístup"
                    });
                }
                /**
                 * Připraví název titulku okna.
                 * @param maskName Název masky.
                 * @returns Název titulku okna.
                 */
                prepareContentTitle(title, maskName) {
                    return (maskName)
                        ? title + " - " + maskName
                        : title;
                }
                /**
                 * Změní vlastnosti enabled u vybrazných prvků, podle toho, jestli je povolena editace, či nikoliv
                 * @param allowEditation Příznak, jestli je povolené editování.
                 */
                changeEnabled(allowEditation) {
                    // resetuji validátory (schovám případné neúspěchy)
                    this.findFields().gfield("resetValidations");
                    // úpvara menu enabled/disabled
                    this.actions[this.actionNames.edit]?.enabled(!allowEditation);
                    this.actions[this.actionNames.save]?.enabled(allowEditation);
                    this.actions[this.actionNames.endEdit]?.enabled(allowEditation);
                    // políčka formuláře enabled/disabled
                    this.setFieldEditable("nazev", allowEditation);
                    this.setFieldEditable("poznamka", allowEditation);
                    this.setFieldEditable("typ_masky_zkr", allowEditation);
                    this.setFieldEditable("ixs_fun_akt", allowEditation);
                }
                //#region Metody pro práci s formulářem
                /**
                 * Vytvoří formulář pro masku
                 * @param maskData Info o masce
                 */
                createForm(initialOwnerFun, initialMaskType) {
                    // vytvoření formuláře
                    this.$maskDetailForm = $.newDiv("maskDetailForm")
                        .appendTo(this.element)
                        .gform("createFrom", this.prepareForm(initialOwnerFun, initialMaskType));
                }
                /**
                 * Připraví formulář pro editaci|vytvoření masky.
                 * @param initialOwnerFun Počáteční hodnota pro vlastníka masky (při novém záznamu).
                 * @param initialMaskType Počáteční hodnota pro typ masky (při novém záznamu).
                 * @returns Formulář.
                 */
                prepareForm(initialOwnerFun, initialMaskType) {
                    return new Gordic.Forms.Form({ name: "maskaDetailForm", layoutDescriptor: "L2M2S1" })
                        .addSection("jres:35100027") //RC 35100027 : Informace o masce
                        .addRow("jres:35100028").addField(//RC 35100028 : Typ masky
                    "gselectbox", Gordic.Prefabs.Select.cntctym(), {
                        name: "typ_masky_zkr",
                        model: "model.typ_masky=value.typ_masky",
                        initialValue: this._isNew ? { typ_masky: initialMaskType } : undefined,
                        change: (ev, meta) => {
                            this._gridMaskTabContent?.readyAwait.then(() => {
                                var hColumn = this._gridMaskTabContent?.gridFormat?.get("h");
                                if (!hColumn)
                                    return;
                                hColumn.editor = Gordic.Eko.Filters.drd({
                                    caption: "H",
                                    model: "h",
                                    showOst: meta.value?.typ_masky == 10,
                                    showUct: true,
                                });
                                const gridFormat = this._gridMaskTabContent.gridFormat;
                                const grid = this._gridMaskTabContent.element.find(".ggrid");
                                grid.ggrid("option", { columns: gridFormat });
                                grid.ggrid("refresh");
                            });
                        }
                    })
                        .addRow("jres:35100029").addField("gstringbox", { name: "nazev" }) //RC 35100029 : Název
                        .addRow("jres:35100030").addField("gstringbox", { name: "poznamka" }) //RC 35100030 : Poznámka
                        .addSection("jres:35100031") //RC 35100031 : Změna
                        .addRow("jres:35100035") //RC 35100035 : Vlastník masky
                        .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                        name: "ixs_fun_akt",
                        model: "model.ixs_fun_akt=value.ixs_fun",
                        initialValue: initialOwnerFun ? { ixs_fun: initialOwnerFun } : undefined
                    })
                        .addRow("jres:35100032").addField("gdatebox", { name: "dat_zmena", disabled: true, valueType: "datetime" }) //RC 35100032 : Datum změny
                        .addRow("jres:35100033").addField("gstringbox", { name: "zmenu_prov_rf", disabled: true }); //RC 35100033 : Změnu provedl
                }
                /**
                 * Kontroluje, zda došlo ke změně obsahu.
                 * @returns Promis jestli došlo ke změně v contentu.
                 */
                async isContentChanged() {
                    await this.$maskDetailForm?.gform("waitForValues");
                    var result = this.$maskDetailForm?.gform("hasChanged");
                    return result;
                }
                /**
                 * Uloží změny do databáze.
                 * @param input Vstupní parametry.
                 */
                async saveChanges(input) {
                    try {
                        // tady se počká až doběhnou všechny validace na formluáři
                        await this.$maskDetailForm.gform("waitForValues");
                        // validace formuláře
                        if (!this.$maskDetailForm.gform("isValid"))
                            return false;
                        // prázdný objekt do kterého se uloží data z formuláře
                        if (this._isNew && input)
                            input.maskaData = {};
                        // zjistím, jestli došlo ke změnám ve formuláři
                        if (this._isNew || this.$maskDetailForm.gform("hasChanged")) {
                            // hodnoty z formuláře se uloží do input.maskaData
                            this.$maskDetailForm
                                .findFields()
                                .gfield("model", "collect", input?.maskaData);
                            var response = await this.isl.MaskService.upsert({ data: input?.maskaData ?? {} }).get();
                            if (response?.data) {
                                this.$maskDetailForm
                                    .findFields()
                                    .gfield("model", "apply", response.data, { initialValues: true });
                                this._default.maskaData = Gordic.Utils.DeepClone(response.data);
                            }
                            else {
                                GDlg.alert("jres:35100049"); //RC 35100049 : Nepodařilo se uložit data do databáze. Více informací v logu.
                                return false;
                            }
                        }
                        //await this.upsertMaskDetail();
                        return true;
                    }
                    catch (ex) {
                        console.log("Nepodařilo se uložit změny do databáze.", ex);
                        return false;
                    }
                }
                //#endregion
                // #region Vytvoření menu
                /**
                 * Vytvoří menu pro tento kontent.
                 */
                buildMenu() {
                    // vytvoří parametry pro main menu
                    const mainMenuParams = this.actions.createBar([
                        { action: this.actions[this.actionNames.edit], favorite: true },
                        { action: this.actions[this.actionNames.save], favorite: true },
                        { action: this.actions[this.actionNames.endEdit], favorite: true }
                    ]);
                    // vytvoří parametry pro command bar menu
                    const commandBarMenu = this.actions.createBar([
                        { action: this.actions[this.actionNames.saveAndClose], favorite: true },
                        { action: this.actions[this.actionNames.close], favorite: true }
                    ]);
                    // vytvoří menu
                    this.menuBar(mainMenuParams);
                    this.commandBar(commandBarMenu);
                }
                /**
                 * Připraví menu pro záložku masky.
                 * @returns Menu pro zuložku detailu masky.
                 */
                prepareTabMenu() {
                    return this.actions.createBar([
                        { action: this.actions[this.actionNames.newData], favorite: true },
                        { action: this.actions[this.actionNames.deleteData], favorite: true },
                        { action: this.actions[this.actionNames.copyData], favorite: true }
                    ]);
                }
                /**
                 * Připraví menu pro záložku práva.
                 * @returns Menu pro záložku detailu práv.
                 */
                prepareRightsTabMenu() {
                    return this.actions.createBar([
                        { action: this.actions[this.actionNames.newBook], favorite: true },
                        { action: this.actions[this.actionNames.newFunction], favorite: true },
                        { action: this.actions[this.actionNames.deleteRight], favorite: true }
                    ]);
                }
                //#endregion
                /**
                 * Získá pole z formuláře a nastaví možnost editace.
                 * @param fieldName Název pole.
                 * @param allowEditation Příznak, jestli je povolené editování.
                 */
                setFieldEditable(fieldName, allowEditation) {
                    const field = this.findFields(fieldName)?.first();
                    field?.gfield(allowEditation ? "enable" : "disable");
                }
                /**
                 * Uloží nastavení masky do databáze a to tak,
                 * že vezme řádek po řádku grid a každý řádek uloží.
                 * @param maskDetail
                 */
                async upsertMaskDetail() {
                    // získání dat z gridu
                    const dataGrid = await this._gridMaskTabContent?.getData();
                    if (!dataGrid || !this._default.maskaData)
                        return;
                    // uložení dat o nastavení masky
                    dataGrid.forEach(async (row, index) => {
                        // pokud není vyplněné id masky, tak se jedná o vytváření nové masky
                        // toto id se vezme z defaultních hodnot 
                        // maska musí být uložena před uložením detailu masky aby ixs_msk existovalo
                        if (!row.ixs_msk) {
                            row.ixs_msk = this._default.maskaData?.ixs_msk; // ixs_msk musí být vyplněno
                            row.radek = index++; // radek musí být vyplněn
                        }
                        return await this.isl.MaskService.upsertDetail({ data: row }).get();
                    });
                    // uložení nových hodnot do defaultních hodnot
                    this._default.maskaDataDetail = Gordic.Utils.DeepClone(dataGrid);
                }
                /**
                 * Znovu načte aktuální content s aktuálními daty.
                 */
                async reloadContent() {
                    await this.loadData(this._default.maskaData?.ixs_msk);
                }
                /**
                 * Získá aktuálně vybraný řádek z gridu nastavení masky.
                 * @returns Aktuálně vybraný řádek z gridu nastavení masky.
                 */
                getActiverowFromGridMasks() {
                    // pokud není grid vytvořen, tak se nic nevrací
                    if (this.$gridMaskTab == null)
                        return null;
                    // získání aktuálně vybraného záznamu
                    const tabMasks = this.$gridMaskTab.find('.ggrid');
                    const selectedRow = tabMasks.ggrid("activeRow");
                    return selectedRow ?? null;
                }
                /**
                 * Připraví akce pro content.
                 */
                prepareActions(input) {
                    this.actions.addRange({
                        // akce pro editování masky
                        [this.actionNames.edit]: {
                            caption: "jres:35100018", //RC 35100018 : Editace
                            captionVisible: "normal",
                            icon: "gi-pencil",
                            run: () => {
                                this.changeEnabled(true);
                            }
                        },
                        // akce pro uložení/editaci masky
                        [this.actionNames.save]: {
                            caption: "jres:35100019", //RC 35100019 : Uložit
                            captionVisible: "normal",
                            icon: "gi-save",
                            run: async () => {
                                if (await this.saveChanges(input)) {
                                    await this.reloadContent();
                                    this.changeEnabled(false);
                                }
                            }
                        },
                        // akce pro ukončení editace masky
                        [this.actionNames.endEdit]: {
                            caption: "jres:35100020", //RC 35100020 : Ukončit editaci
                            captionVisible: "normal",
                            icon: "gi-window-close",
                            run: async () => {
                                await this.reloadContent();
                                this.changeEnabled(false);
                            }
                        },
                        // akce pro vytvoření nového nastavení masky
                        [this.actionNames.newData]: {
                            caption: "jres:35100021", //RC 35100021 : Nové
                            captionVisible: "normal",
                            icon: "gi-plus",
                            run: () => {
                                let tempRows = Gordic.Utils.DeepClone(this._default.maskaDataDetail);
                                const newRow = {
                                    ixs_msk: this._default.maskaData?.ixs_msk,
                                    radek: this._default.maskaDataDetail.length + 1
                                };
                                tempRows?.push(newRow);
                                this._gridMaskTabContent?.setData(tempRows);
                                this.upsertMaskDetail();
                            }
                        },
                        // akce pro smazání nastavení masky
                        [this.actionNames.deleteData]: {
                            caption: "jres:35100016", //RC 35100016 : Odstranit
                            captionVisible: "normal",
                            icon: "fa-trash",
                            run: async () => {
                                const selectedData = this.getActiverowFromGridMasks();
                                if (selectedData) {
                                    await this.isl.MaskService.deleteDetail({ maskDetailRow: selectedData }).get();
                                    this._default.maskaDataDetail = this._default.maskaDataDetail?.filter(x => x.radek !== selectedData.radek);
                                    this._gridMaskTabContent?.setData(this._default.maskaDataDetail);
                                }
                            }
                        },
                        // akce pro kopírování nastavení masky
                        [this.actionNames.copyData]: {
                            caption: "jres:35100022", //RC 35100022 : Kopírovat
                            captionVisible: "normal",
                            icon: "gi-copy",
                            run: () => {
                                // získání aktuálně vybraného záznamu
                                const gridElement = this.$gridMaskTab.find('.ggrid');
                                const selectedData = gridElement.ggrid("activeRow");
                                // pokud se povedlo vybrat záznam, udělá se hluboká kopie a znovu se vloží
                                if (selectedData) {
                                    const deepCopyOfSelectedData = Gordic.Utils.DeepClone(selectedData);
                                    // nastaví se nový řádek, aby se neukládal na stejný řádek
                                    deepCopyOfSelectedData.radek = (this._default.maskaDataDetail ?? []).reduce((max, r) => Math.max(max, r?.radek ?? 0), 0) + 1;
                                    this._default.maskaDataDetail?.push(deepCopyOfSelectedData);
                                    this._gridMaskTabContent?.setData(this._default.maskaDataDetail);
                                    this.upsertMaskDetail();
                                }
                            }
                        },
                        // akce pro uložení a zavření kontentu
                        [this.actionNames.saveAndClose]: {
                            caption: "jres:35100024", //RC 35100024 : Uložit a zavřít
                            captionVisible: "normal",
                            icon: "gi-save",
                            customClass: "g-button--primary",
                            run: async () => {
                                // když se úspěšně uloží data, content se zavře
                                var result = await this.saveChanges(input);
                                if (result) {
                                    this.tryClose();
                                }
                            }
                        },
                        // akce pro zavření kontentu
                        [this.actionNames.close]: new GAction(Gordic.Prefabs.Actions.ZavritContent()),
                        //#region Akce pro práci s právy
                        // akce pro přidání nové knihy
                        [this.actionNames.newBook]: {
                            caption: "jres:35100045", //RC 35100045 : Nová kniha
                            captionVisible: "normal",
                            icon: "gi-plus",
                            run: () => {
                            }
                        },
                        // akce pro přidání nové funkce
                        [this.actionNames.newFunction]: {
                            caption: "jres:35100044", //RC 35100044 : Nová funkce
                            captionVisible: "normal",
                            icon: "gi-plus",
                            run: () => {
                            }
                        },
                        // akce pro odstranění práv
                        [this.actionNames.deleteRight]: {
                            caption: "jres:35100034", //RC 35100034 : Odstranit
                            captionVisible: "normal",
                            icon: "fa-trash",
                            run: () => {
                            }
                        }
                        //#endregion
                    });
                }
            }
            WebControls.GRonMaskyDetail = GRonMaskyDetail;
        })(WebControls = Ron.WebControls || (Ron.WebControls = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var Dialogs;
        (function (Dialogs) {
            function GRonNakladoveZaznamyRTNDlg(input) {
                // kvli uživatelskému nastavení, ID contentu
                const options = $.extend({}, input.opt, {
                    ID: 'GRonNakladoveZaznamyRTN#'
                });
                console.log(input?.ModOtevreni);
                return Gordic.Gui.Dialogs._openDialog2(input?.parentContent, Ron.WebControls.GRonNakladoveZaznamyRTN, input?.ModOtevreni, options);
            }
            Dialogs.GRonNakladoveZaznamyRTNDlg = GRonNakladoveZaznamyRTNDlg;
        })(Dialogs = Ron.Dialogs || (Ron.Dialogs = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Hlavní třída contentu.
             */
            let GRonNakladoveZaznamyRTN = class GRonNakladoveZaznamyRTN extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "jres:35100005"; //RC 35100005 : Nákladové záznamy RTN
                    this.taskId = "actNakladoveZaznamyRTN";
                }
                /**
                 *
                 * @param input
                 */
                prepareContent(input) {
                    alert("NakladoveZaznamyRTN");
                }
            };
            GRonNakladoveZaznamyRTN = __decorate([
                gcontent
            ], GRonNakladoveZaznamyRTN);
            WebControls.GRonNakladoveZaznamyRTN = GRonNakladoveZaznamyRTN;
        })(WebControls = Ron.WebControls || (Ron.WebControls = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var Dialogs;
        (function (Dialogs) {
            function GRonPredaniDlg(input) {
                // kvli uživatelskému nastavení, ID contentu
                const options = $.extend({}, input.opt, {
                    ID: 'GRonPredani#'
                });
                console.log(input?.ModOtevreni);
                return Gordic.Gui.Dialogs._openDialog2(input?.parentContent, Ron.WebControls.GRonPredani, input?.ModOtevreni, options);
            }
            Dialogs.GRonPredaniDlg = GRonPredaniDlg;
        })(Dialogs = Ron.Dialogs || (Ron.Dialogs = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Hlavní třída contentu.
             */
            let GRonPredani = class GRonPredani extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "jres:35100006"; //RC 35100006 : Předání
                    this.taskId = "actPredani";
                }
                /**
                 *
                 * @param input
                 */
                prepareContent(input) {
                    alert("Predani");
                }
            };
            GRonPredani = __decorate([
                gcontent
            ], GRonPredani);
            WebControls.GRonPredani = GRonPredani;
        })(WebControls = Ron.WebControls || (Ron.WebControls = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var Dialogs;
        (function (Dialogs) {
            function GRonPumpyDlg(input) {
                // kvli uživatelskému nastavení, ID contentu
                const options = $.extend({}, input.opt, {
                    ID: 'GRonPumpy#'
                });
                console.log(input?.ModOtevreni);
                return Gordic.Gui.Dialogs._openDialog2(input?.parentContent, Ron.WebControls.GRonPumpy, input?.ModOtevreni, options);
            }
            Dialogs.GRonPumpyDlg = GRonPumpyDlg;
        })(Dialogs = Ron.Dialogs || (Ron.Dialogs = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Hlavní třída contentu.
             */
            let GRonPumpy = class GRonPumpy extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "jres:35100007"; //RC 35100007 : Pumpy
                    this.taskId = "actPumpy";
                }
                /**
                 *
                 * @param input
                 */
                prepareContent(input) {
                    alert("Pumpy");
                }
            };
            GRonPumpy = __decorate([
                gcontent
            ], GRonPumpy);
            WebControls.GRonPumpy = GRonPumpy;
        })(WebControls = Ron.WebControls || (Ron.WebControls = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var Dialogs;
        (function (Dialogs) {
            /**
             * Dialog pro výběr rozpisů.
             * @param input Vstupní parametry dialogu.
             * @returns Promise s výstupními daty.
             */
            function GRonRozpisyDlg(input) {
                // kvli uživatelskému nastavení, ID contentu
                const options = $.extend({}, input.opt, {
                    ID: 'GRonRozpisy#'
                });
                return Gordic.Gui.Dialogs._openDialog2(input?.parentContent, Ron.WebControls.GRonRozpisy, input?.ModOtevreni, options);
            }
            Dialogs.GRonRozpisyDlg = GRonRozpisyDlg;
            /**
             * Dialog pro detail rozpisu.
             * @param input Vstupní parametry dialogu.
             * @returns Promise s výstupními daty.
             */
            function GRonRozpisyDetailDlg(input) {
                // kvli uživatelskému nastavení, ID contentu
                const options = $.extend({}, input.opt, {
                    ID: 'GRonRozpisyDetail#'
                });
                return Gordic.Gui.Dialogs._openDialog2(input?.parentContent, Ron.WebControls.GRonRozpisyDetail, input?.ModOtevreni, options);
            }
            Dialogs.GRonRozpisyDetailDlg = GRonRozpisyDetailDlg;
        })(Dialogs = Ron.Dialogs || (Ron.Dialogs = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var WebControls;
        (function (WebControls) {
            // #region Vstupní/výstupní rozhraní.
            // #endregion
            /**
             * Hlavní třída contentu.
             */
            class GRonRozpisy extends WebControls.GRonDialogBase {
                constructor() {
                    super(...arguments);
                    this.taskId = "actRozpisy";
                    this.title = "jres:35100008"; //RC 35100008 : Rozpisy
                    // #endregion
                }
                /**
                * Vytvoří obsah contentu.
                * @param input Vstupní parametry contentu.
                */
                async buildContent(input) {
                    this.$grid = $.newDiv("grid")
                        .appendTo(this.element)
                        .ggrid({
                        name: "rozpisGrid",
                        data: this.$islView = new Gordic.Isl.View(this.isl.RozpisService.list(), {}),
                        multi: false,
                        columnMode: "full",
                        emptyMessage: "jres:35100051", //RC 35100051 : Nejsou nadefinované žádné rozpisy
                        columns: this.createGridFormat(),
                        defaultAction: this.actions[this.actionNames.detail]
                    })
                        .gautofit();
                }
                /**
                 * Vytvoří menu pro tento content.
                 */
                buildMenu() {
                    // načtení položek hlavního menu
                    const mainMenu = this.actions.createBar([
                        { action: this.actions[this.actionNames.detail], favorite: true },
                        { action: this.actions[this.actionNames.new], favorite: true },
                        { action: this.actions[this.actionNames.delete], favorite: true }
                    ]);
                    // vytvoření hlavního menu
                    this.menuBar(mainMenu);
                }
                /**
                 * Připraví akce pro content.
                 * @param input Vstupní parametry contentu.
                 */
                prepareActions(input) {
                    this.actions.addRange({
                        // akce pro vytvoření nového rozpisu
                        [this.actionNames.new]: {
                            name: this.actionNames.new,
                            caption: "jres:35100050", //RC 35100050 : Nový rozpis
                            captionVisible: "normal",
                            icon: "fa-plus",
                            run: () => {
                                this.openDetailDialog("jres:35100053"); //RC 35100053 : Nový rozpis
                            }
                        },
                        // akce pro zobrazení detailu rozpisu
                        [this.actionNames.detail]: {
                            name: this.actionNames.detail,
                            caption: "jres:35100015", //RC 35100015 : Detail
                            captionVisible: "normal",
                            icon: "gi-detail",
                            run: () => {
                                const activeRow = this.$grid.ggrid("activeRow");
                                this.openDetailDialog("jres:35100052", activeRow); //RC 35100052 : Detail rozpisu
                            }
                        },
                        // akce pro smazání detailu rozpisu
                        [this.actionNames.delete]: {
                            name: this.actionNames.delete,
                            caption: "jres:35100016", //RC 35100016 : Odstranit
                            captionVisible: "normal",
                            icon: "fa-trash",
                            run: () => {
                            }
                        }
                    });
                }
                // #region Private metody
                /**
                 * Prvotní vytvoření formátu gridu.
                 * @returns Formát gridu.
                 */
                createGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:35100037" //RC 35100037 : Název
                    })
                        .addTextColumn({
                        name: "ixs_fun_akt_rf",
                        caption: "jres:35100038" //RC 35100038 : Vlastník
                    })
                        .addTextColumn({
                        name: "poznamka",
                        caption: "jres:35100039" //RC 35100039 : Poznámka
                    })
                        .addTextColumn({
                        name: "prava_txt",
                        caption: "jres:35100040" //RC 35100040 : Práva
                    })
                        .addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "jres:35100041" //RC 35100041 : Datum změny
                    })
                        .addTextColumn({
                        name: "zmenu_prov_rf",
                        caption: "jres:35100042" //RC 35100042 : Změnu provedl
                    });
                }
                /**
                 * Otevře detail rozpisu.
                 * @param title Název okna detailu.
                 * @param selectedRow Řádek rozpisu, který se má zobrazit v detailu (pokud je undefined, jedná se o nový rozpis).
                 */
                async openDetailDialog(title, selectedRow) {
                    const result = await Ron.Dialogs.GRonRozpisyDetailDlg({
                        parentContent: this,
                        ModOtevreni: Gordic.Global.Enums.ModOtevreni.navigate,
                        opt: {
                            contentTitle: title,
                            rozpisData: selectedRow
                        }
                    });
                    // pokud je výstup z detailu definován a je změněn, aktualizuje se grid
                    if (result?.isChanged)
                        this.$islView.refresh();
                }
            }
            WebControls.GRonRozpisy = GRonRozpisy;
        })(WebControls = Ron.WebControls || (Ron.WebControls = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var WebControls;
        (function (WebControls) {
            // #region Vstupní/výstupní rozhraní.
            // #endregion
            /**
             * Hlavní třída contentu.
             */
            class GRonRozpisyDetail extends WebControls.GRonDialogBase {
                constructor() {
                    super(...arguments);
                    this.taskId = "actRozpisyDetail";
                    // #endregion
                }
                // #region Implementace abstraktní třídy GBaseContent
                /**
                 * Zavoláno před samotnou stavbou contentu.
                 * @param input Vstupní parametry contentu.
                 */
                async beforeBuildContent(input) {
                    if (!input)
                        throw new Error("jres:35100017"); //RC 35100017 : Nebyly předány vstupní parametry.
                    // nastavení titulku okna
                    this.title = this.prepareContentTitle(input.contentTitle, input.rozpisData?.nazev);
                }
                /**
                 * Vykreslí obsah contentu.
                 * Pochází z GRonDialogBase, kde je deklarován jako abstraktní.
                 * @param input
                 * @returns
                 */
                async buildContent(input) {
                    this._default = Gordic.Utils.DeepClone(input);
                    this._isNew = !input.rozpisData;
                    const initialOwnerFun = (this._isNew) ? await WebControls.getActualUser(this) : undefined;
                    this.createForm(initialOwnerFun);
                    await this.loadData(input?.rozpisData?.ixs_rps);
                    await this.allowEditation(this._isNew);
                }
                /**
                 * Zavoláno po vytvoření contentu.
                 * @param input Vstupní parametry contentu.
                 */
                async afterBuildContent(input) {
                    this.loadValidators();
                }
                /**
                 *
                 * @param input
                 */
                prepareActions(input) {
                    this.actions.addRange({
                        // akce pro editování rozpisu
                        [this.actionNames.edit]: {
                            caption: "jres:35100018", //RC 35100018 : Editace
                            captionVisible: "normal",
                            icon: "gi-pencil",
                            run: () => {
                                this.allowEditation(true);
                            }
                        },
                        // akce pro uložení/editaci rozpisu
                        [this.actionNames.save]: {
                            caption: "jres:35100019", //RC 35100019 : Uložit
                            captionVisible: "normal",
                            icon: "gi-save",
                            run: async () => {
                                if (await this.saveChanges(input)) {
                                    await this.reloadContent();
                                    this.allowEditation(false);
                                }
                            }
                        },
                        // akce pro ukončení editace rozpisu
                        [this.actionNames.endEdit]: {
                            caption: "jres:35100020", //RC 35100020 : Ukončit editaci
                            captionVisible: "normal",
                            icon: "gi-window-close",
                            run: async () => {
                                await this.reloadContent();
                                this.allowEditation(false);
                            }
                        },
                        // akce pro zavření kontentu
                        [this.actionNames.close]: new GAction(Gordic.Prefabs.Actions.ZavritContent()),
                        // akce pro uložení a zavření kontentu
                        [this.actionNames.saveAndClose]: {
                            caption: "jres:35100024", //RC 35100024 : Uložit a zavřít
                            captionVisible: "normal",
                            icon: "gi-save",
                            customClass: "g-button--primary",
                            run: async () => {
                                //// když se úspěšně uloží data, content se zavře
                                //var result: boolean = await this.saveChanges(input);
                                //if (result) {
                                //    this.tryClose();
                                //}
                            }
                        },
                    });
                }
                /**
                 * Připraví menu v contentu.
                 */
                buildMenu() {
                    const mainMenuParams = this.actions.createBar([
                        { action: this.actions[this.actionNames.edit], favorite: true },
                        { action: this.actions[this.actionNames.save], favorite: true },
                        { action: this.actions[this.actionNames.endEdit], favorite: true }
                    ]);
                    const commandBarMenuParams = this.actions.createBar([
                        { action: this.actions[this.actionNames.saveAndClose], favorite: true },
                        { action: this.actions[this.actionNames.close], favorite: true }
                    ]);
                    this.menuBar(mainMenuParams);
                    this.commandBar(commandBarMenuParams);
                }
                // #endregion
                // #region Privátní metody
                /**
                 * Připraví název titulku okna.
                 * @param title Základní název.
                 * @param maskName Název rozpisu.
                 * @returns
                 */
                prepareContentTitle(title, rozpisName) {
                    return (rozpisName)
                        ? title + " - " + rozpisName
                        : title;
                }
                /**
                 * Vytvoří formulář pro editaci|vytvoření rozpisu.
                 * @param initialOwnerFun Počáteční hodnota pro vlastníka rozpisu (při novém záznamu).
                 */
                createForm(initialOwnerFun) {
                    this.$rozpisDetailForm = $.newDiv("rozpisDetailForm")
                        .appendTo(this.element)
                        .gform("createFrom", this.prepareForm(initialOwnerFun));
                }
                /**
                 * Připraví formulář pro editaci|vytvoření rozpisu.
                 * @param initialOwnerFun Počáteční hodnota pro vlastníka rozpisu (při novém záznamu).
                 * @returns
                 */
                prepareForm(initialOwnerFun) {
                    return new Gordic.Forms.Form({ name: "rozpisDetailForm", layoutDescriptor: "L2M2S1" })
                        .addSection("jres:35100054") //RC 35100054 : Informace o rozpisu
                        .addRow("jres:35100055").addField(//RC 35100055 : Fáze
                    "gselectbox")
                        .addRow("jres:35100029").addField("gstringbox", { name: "nazev" }) //RC 35100029 : Název
                        .addRow("jres:35100030").addField("gstringbox", { name: "poznamka" }) //RC 35100030 : Poznámka
                        .addSection("jres:35100031") //RC 35100031 : Změna
                        .addRow("jres:35100056").addField(//RC 35100056 : Vlastník rozpisu
                    "gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                        name: "ixs_fun_akt_rf",
                        model: "model.ixs_fun_akt=value.ixs_fun",
                        initialValue: initialOwnerFun ? { ixs_fun: initialOwnerFun } : undefined
                    })
                        .addRow("jres:35100032").addField("gdatebox", { name: "dat_zmena", disabled: true, valueType: "datetime" }) //RC 35100032 : Datum změny
                        .addRow("jres:35100033").addField("gstringbox", { name: "zmenu_prov_rf", disabled: true }); //RC 35100033 : Změnu provedl
                }
                /**
                 * Pokude se nejedná o nový záznam, načte data rozpisu a aplikuje je do formuláře.
                 * @param ixs_rps Identifikátor rozpisu.
                 */
                async loadData(ixs_rps) {
                    this.beginOperation();
                    if (!this._isNew) {
                        const rozpisData = await this.isl.RozpisService.read({ ixs_rps: ixs_rps }).getData();
                        this.$rozpisDetailForm
                            .findFields()
                            .gfield("model", "apply", rozpisData, { initialValues: true });
                    }
                    this.endOperation();
                }
                /**
                 * Asynchroní načtení validátorů.
                 */
                async loadValidators() {
                    const server = this.createServiceContent("Gordic.Ron.WebControls.GRonUtils");
                    const validator = await server.call("GetValidatorsByType", { typeName: "Gordic.Ron.Interface.GRozpisDto" });
                    this.findFields().gfield("model", "validators", validator);
                }
                /**
                 * Změní vlastnosti enabled u vybrazných prvků,
                 * podle toho, jestli je povolena editace, či nikoliv.
                 * @param allowEditation Příznak, jestli je povolené editování.
                 */
                async allowEditation(allowEditation) {
                    // resetuji validátory (schovám případné neúspěchy)
                    this.findFields().gfield("resetValidations");
                    // úpvara menu enabled/disabled
                    this.actions[this.actionNames.edit]?.enabled(!allowEditation);
                    this.actions[this.actionNames.save]?.enabled(allowEditation);
                    this.actions[this.actionNames.endEdit]?.enabled(allowEditation);
                    // políčka formuláře enabled/disabled
                    this.setFieldEditable("nazev", allowEditation);
                    this.setFieldEditable("poznamka", allowEditation);
                    this.setFieldEditable("faz", allowEditation);
                    this.setFieldEditable("ixs_fun_akt_rf", allowEditation);
                }
                /**
                 * Získá pole z formuláře a nastaví možnost editace.
                 * @param fieldName Název pole.
                 * @param allowEditation Příznak, jestli je povolené editování.
                 */
                setFieldEditable(fieldName, allowEditation) {
                    const field = this.findFields(fieldName)?.first();
                    field?.gfield(allowEditation ? "enable" : "disable");
                }
                /**
                 * Znovu načte data aktuálního rozpisu.
                 */
                async reloadContent() {
                    await this.loadData(this._default.rozpisData?.ixs_rps);
                }
                async saveChanges(input) {
                    try {
                        await this.findFields().gfield("waitingForValue");
                        if (!this.$rozpisDetailForm.gform("isValid"))
                            return false;
                        if (this._isNew)
                            input.rozpisData = {};
                        if (this._isNew || this.$rozpisDetailForm.gform("hasChanged")) {
                            this.$rozpisDetailForm
                                .findFields()
                                .gfield("model", "collect", input?.rozpisData);
                            var response = await this.isl.RozpisService.upsert({ data: input?.rozpisData ?? {} }).get();
                            if (response?.data) {
                                this.$rozpisDetailForm
                                    .findFields()
                                    .gfield("model", "apply", response.data, { initialValues: true });
                                this._default.rozpisData = Gordic.Utils.DeepClone(response.data);
                            }
                            else {
                                GDlg.alert("jres:35100049"); //RC 35100049 : Nepodařilo se uložit data do databáze. Více informací v logu.
                                return false;
                            }
                        }
                        return true;
                    }
                    catch (ex) {
                        console.log("Nepodařilo se uložit změny do databáze.", ex);
                        return false;
                    }
                }
            }
            WebControls.GRonRozpisyDetail = GRonRozpisyDetail;
        })(WebControls = Ron.WebControls || (Ron.WebControls = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var Dialogs;
        (function (Dialogs) {
            function GRonSeznamKnihDlg(input) {
                // kvli uživatelskému nastavení, ID contentu
                const options = $.extend({}, input.opt, {
                    ID: 'GRonSeznamKnih#'
                });
                return Gordic.Gui.Dialogs._openDialog2(input?.parentContent, Ron.WebControls.GRonSeznamKnih, input?.ModOtevreni, options);
            }
            Dialogs.GRonSeznamKnihDlg = GRonSeznamKnihDlg;
        })(Dialogs = Ron.Dialogs || (Ron.Dialogs = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Hlavní třída contentu.
             */
            let GRonSeznamKnih = class GRonSeznamKnih extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "jres:35100026"; //RC 35100026 : Seznam knih
                    this.taskId = "actSeznamKnih";
                }
                /**
                 *
                 * @param input
                 */
                prepareContent(input) {
                    alert("SeznamKnih");
                }
            };
            GRonSeznamKnih = __decorate([
                gcontent
            ], GRonSeznamKnih);
            WebControls.GRonSeznamKnih = GRonSeznamKnih;
        })(WebControls = Ron.WebControls || (Ron.WebControls = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var Dialogs;
        (function (Dialogs) {
            function GRonSeznamPlanuDlg(input) {
                // kvli uživatelskému nastavení, ID contentu
                const options = $.extend({}, input.opt, {
                    ID: 'GRonSeznamPlanu#'
                });
                return Gordic.Gui.Dialogs._openDialog2(input?.parentContent, Ron.WebControls.GRonSeznamPlanu, input?.ModOtevreni, options);
            }
            Dialogs.GRonSeznamPlanuDlg = GRonSeznamPlanuDlg;
        })(Dialogs = Ron.Dialogs || (Ron.Dialogs = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Hlavní třída contentu.
             */
            let GRonSeznamPlanu = class GRonSeznamPlanu extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "jres:35100009"; //RC 35100009 : Seznam plánů
                    this.taskId = "actSeznamPlanu";
                }
                /**
                 *
                 * @param input
                 */
                prepareContent(input) {
                    alert("SeznamPlanu");
                }
            };
            GRonSeznamPlanu = __decorate([
                gcontent
            ], GRonSeznamPlanu);
            WebControls.GRonSeznamPlanu = GRonSeznamPlanu;
        })(WebControls = Ron.WebControls || (Ron.WebControls = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var Dialogs;
        (function (Dialogs) {
            function GRonTransformaceDlg(input) {
                // kvli uživatelskému nastavení, ID contentu
                const options = $.extend({}, input.opt, {
                    ID: 'GRonTransformace#'
                });
                console.log(input?.ModOtevreni);
                return Gordic.Gui.Dialogs._openDialog2(input?.parentContent, Ron.WebControls.GRonTransformace, input?.ModOtevreni, options);
            }
            Dialogs.GRonTransformaceDlg = GRonTransformaceDlg;
        })(Dialogs = Ron.Dialogs || (Ron.Dialogs = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Hlavní třída contentu.
             */
            let GRonTransformace = class GRonTransformace extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "jres:35100010"; //RC 35100010 : Transformace
                    this.taskId = "actTransformace";
                }
                /**
                 *
                 * @param input
                 */
                prepareContent(input) {
                    alert("Transformace");
                }
            };
            GRonTransformace = __decorate([
                gcontent
            ], GRonTransformace);
            WebControls.GRonTransformace = GRonTransformace;
        })(WebControls = Ron.WebControls || (Ron.WebControls = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var Dialogs;
        (function (Dialogs) {
            function GRonVysledkyRozuctovaniDlg(input) {
                // kvli uživatelskému nastavení, ID contentu
                const options = $.extend({}, input.opt, {
                    ID: 'GRonVysledkyRozuctovani#'
                });
                console.log(input?.ModOtevreni);
                return Gordic.Gui.Dialogs._openDialog2(input?.parentContent, Ron.WebControls.GRonVysledkyRozuctovani, input?.ModOtevreni, options);
            }
            Dialogs.GRonVysledkyRozuctovaniDlg = GRonVysledkyRozuctovaniDlg;
        })(Dialogs = Ron.Dialogs || (Ron.Dialogs = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ron;
    (function (Ron) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Hlavní třída contentu.
             */
            let GRonVysledkyRozuctovani = class GRonVysledkyRozuctovani extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "jres:35100011"; //RC 35100011 : Výsledky rozúčtování
                    this.taskId = "actVysledkyRozuctovani";
                }
                /**
                 *
                 * @param input
                 */
                prepareContent(input) {
                    alert("VysledkyRozuctovani");
                }
            };
            GRonVysledkyRozuctovani = __decorate([
                gcontent
            ], GRonVysledkyRozuctovani);
            WebControls.GRonVysledkyRozuctovani = GRonVysledkyRozuctovani;
        })(WebControls = Ron.WebControls || (Ron.WebControls = {}));
    })(Ron = Gordic.Ron || (Gordic.Ron = {}));
})(Gordic || (Gordic = {}));
//namespace Gordic.Ron.WebControls {
//    /**
//     * Vstupní parametry.
//     */
//    export interface GGridMaskTemplateInput {
//        tabMenu: MenuParams[];
//        ico: string;
//        rok: number;
//        typ_masky: number | null | undefined;
//    }
//    /**
//     * Výstupní parametry.
//     */
//    export interface GGridMaskTemplateOutput {
//        grid: JQuery<HTMLElement>;
//        tab: JQuery<HTMLElement>;
//    }
//    /**
//     * 
//     * @returns
//     */
//    export function maskTabGrid(input: GGridMaskTemplateInput): GGridMaskTemplateOutput {
//        const container = $.newDiv('ronEkoGrid');
//        // tab obsahuje grid, potřebuji ho, kvůli menu - na gridu nelze
//        const gridTab: JQuery = $.newDiv('gridMaskTab')
//            .appendTo(container)
//            .gtab({
//                title: "jres:35100023", //RC 35100023 : Nastavení masky
//                opened: true,
//                locked: true,
//                menuBar: input.tabMenu
//            })
//        // vytvoření gridu
//        const grid: JQuery = $.newDiv('gridMask')
//            .appendTo(gridTab)
//            .ggrid({
//                data: [],
//                columns: getGridColumns(input.ico, input.rok, input.typ_masky),
//                navigationMode: "cell",
//                showTopPanel: false,
//                showBottomPanel: false,
//                columnMode: "full"
//            })
//        return { tab: gridTab, grid: grid };
//    }
//    /**
//     * Vytvoří menu pro tab.
//     * @returns MenuParams[] - pole menu akcí.
//     */
//    function getGtabMenu(): MenuParams[] {
//        return [{
//            enabled: true,
//            favorite: true
//        }];
//    }
//    /**
//     * 
//     * @param ico
//     * @param rok
//     * @param typ_masky
//     * @returns
//     */
//    function getGridColumns(ico: string, rok: number, typ_masky: number | null | undefined): Data.GridFormat<Interface.GMaskaDetailDto> {
//        return new Data.GridFormat<Interface.GMaskaDetailDto>()
//            .add({
//                name: "kniha",
//                caption: "Kniha",
//                editor: {
//                    widget: "gstringbox"
//                }
//            })
//            .add({
//                name: "stav",
//                caption: "Stav",
//                editor: {
//                    widget: "gstringbox"
//                }
//            })
//            .add({
//                name: "rozpis",
//                caption: "Rozpis",
//                editor: {
//                    widget: "gstringbox",
//                }
//            })
//            .add({
//                name: "faze",
//                caption: "Fáze",
//                editor: {
//                    widget: "gstringbox",
//                }
//            })
//            .add({
//                name: "ucs",
//                caption: "UCS",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("ucs", data); },
//                editor: Eko.Filters.ucsInterval({
//                    caption: "UCS",
//                    model: "ucs",
//                    ico: ico,
//                    aktProhl: 1,
//                    onlyActive: true
//                })
//            })
//            .add({
//                name: "uus",
//                caption: "UUS",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("uus", data); },
//                editor: Eko.Filters.uusInterval({
//                    caption: "UUS",
//                    model: "uus",
//                    ico: ico,
//                    aktProhl: 100,
//                    onlyActive: true,
//                    ucs: "ucs"
//                })
//            })
//            .add({
//                name: "ns",
//                caption: "NS",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("ns", data); },
//                editor: Eko.Filters.nksInterval({
//                    caption: "NS",
//                    model: "ns",
//                    ico: ico,
//                    aktProhl: 100,
//                    onlyActive: true,
//                })
//            })
//            .add({
//                name: "h",
//                caption: "H",
//                editor: Eko.Filters.drd({
//                    caption: "H",
//                    model: "h",
//                    showOst: typ_masky == 10,
//                    showUct: true,
//                })
//            })
//            .add({
//                name: "mesic",
//                caption: "M",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("mesic", data); },
//                editor: Eko.Filters.integerInterval({
//                    model: "mesic",
//                    caption: "M",
//                    firstField: {
//                        minValue: 1,
//                        maxValue: 12
//                    }, secondField: {
//                        minValue: 1,
//                        maxValue: 12
//                    }
//                })
//            })
//            .add({
//                name: "den",
//                caption: "D",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("den", data); },
//                editor: Eko.Filters.integerInterval({
//                    caption: "D",
//                    model: "den",
//                    firstField: {
//                        minValue: 1,
//                        maxValue: 31
//                    }, secondField: {
//                        minValue: 1,
//                        maxValue: 31
//                    }
//                })
//            })
//            .add({
//                name: "doklad",
//                caption: "Doklad",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("doklad", data); },
//                editor: Eko.Filters.acInterval({
//                    caption: "Doklad",
//                    model: "doklad",
//                    ico: ico,
//                    acLength: 1,
//                    aktivita: 100,
//                    rok: rok,
//                    subrada: 1,
//                    typ: 0,
//                    zkratka: "aa"
//                })
//            })
//            .add({
//                name: "su",
//                caption: "SU",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("su", data); },
//                editor: Eko.Filters.integerInterval({
//                    caption: "SU",
//                    model: "su"
//                })
//            })
//            .add({
//                name: "au",
//                caption: "AU",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("au", data); },
//                editor: Eko.Filters.integerInterval({
//                    caption: "au",
//                    model: "au"
//                })
//            })
//            .add({
//                name: "odpa",
//                caption: "ODPA",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("odpa", data); },
//                editor: Eko.Filters.integerInterval({
//                    caption: "ODPA",
//                    model: "odpa"
//                })
//            })
//            .add({
//                name: "pol",
//                caption: "POL",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("pol", data); },
//                editor: Eko.Filters.integerInterval({
//                    caption: "Pol",
//                    model: "pol"
//                })
//            })
//            .add({
//                name: "zj",
//                caption: "ZJ",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("zj", data); },
//                editor: Eko.Filters.integerInterval({
//                    caption: "ZJ",
//                    model: "zj"
//                })
//            })
//            .add({
//                name: "uz",
//                caption: "UZ",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("uz", data); },
//                editor: Eko.Filters.integerInterval({
//                    caption: "UZ",
//                    model: "uz"
//                })
//            })
//            .add({
//                name: "orj",
//                caption: "ORJ",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("orj", data); },
//                editor: Eko.Filters.integerInterval({
//                    caption: "ORJ",
//                    model: "orj"
//                })
//            })
//            .add({
//                name: "org",
//                caption: "ORG",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("org", data); },
//                editor: Eko.Filters.integerInterval({
//                    caption: "ORG",
//                    model: "org"
//                })
//            })
//            .add({
//                name: "md",
//                caption: "MD",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("md", data); },
//                editor: Eko.Filters.decimalInterval({
//                    caption: "MD",
//                    model: "md"
//                })
//            })
//            .add({
//                name: "dal",
//                caption: "Dal",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("dal", data); },
//                editor: Eko.Filters.decimalInterval({
//                    caption: "Dal",
//                    model: "dal"
//                })
//            })
//            .add({
//                name: "popis",
//                caption: "Popis",
//                editor: {
//                    widget: "gstringbox"
//                }
//            })
//            .add({
//                name: "rokDPH",
//                caption: "Rok DPH",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("rokDPH", data); },
//                editor: Eko.Filters.integerInterval({
//                    caption: "Rok DPH",
//                    model: "rokDPH"
//                })
//            })
//            .add({
//                name: "medph",
//                caption: "Mě DPH",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("meDPH", data); },
//                editor: Eko.Filters.integerInterval({
//                    caption: "Mě DPH",
//                    model: "meDPH"
//                })
//            })
//            .add({
//                name: "zd",
//                caption: "ZD",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("zd", data); },
//                editor: Eko.Filters.zdInterval({
//                    caption: "ZD",
//                    model: "zd",
//                    isProEkoFilter: true
//                })
//            })
//            .add({
//                name: "pid",
//                caption: "PID",
//                editor: {
//                    widget: "gstringbox"
//                }
//            })
//            .add({
//                name: "datumZmeny",
//                caption: "Datum změny",
//                cellTemplate: (data) => { return Eko.Prefabs.cellTemplate("datumZmeny", data); },
//                editor: Eko.Filters.dateInterval({
//                    caption: "Datum změny",
//                    model: "datumZmeny                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      "
//                })
//            })
//            .add({
//                name: "agenda",
//                caption: "Agenda",
//                editor: {
//                    options: {
//                        disabled: true
//                    },
//                    widget: "gstringbox"
//                }
//            })
//            .add({
//                name: "puvod",
//                caption: "Původ",
//                visible: false,
//                editor: {
//                    options: {
//                        disabled: true
//                    },
//                    widget: "gstringbox",
//                }
//            });
//    }
//}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9uLldlYkNvbnRyb2xzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJHUm9uVXRpbHMudHMiLCJEaWFsb2dzL0dSb25EaWFsb2dCYXNlLnRzIiwiRGlhbG9ncy9HUm9uR2VuZXJhdG9yeS9HUm9uR2VuZXJhdG9yeS5EaWFsb2dzLnRzIiwiRGlhbG9ncy9HUm9uR2VuZXJhdG9yeS9HUm9uR2VuZXJhdG9yeS50cyIsIkRpYWxvZ3MvR1Jvbkt1bXVsYWNlL0dSb25LdW11bGFjZS5EaWFsb2dzLnRzIiwiRGlhbG9ncy9HUm9uS3VtdWxhY2UvR1Jvbkt1bXVsYWNlLnRzIiwiRGlhbG9ncy9HUm9uTWFza3kvR1Jvbk1hc2t5LkRpYWxvZ3MudHMiLCJEaWFsb2dzL0dSb25NYXNreS9HUm9uTWFza3kudHMiLCJEaWFsb2dzL0dSb25NYXNreS9HUm9uTWFza3lEZXRhaWwgLnRzIiwiRGlhbG9ncy9HUm9uTmFrbGFkb3ZlWmF6bmFteVJUTi9HUm9uTmFrbGFkb3ZlWmF6bmFteVJUTi5EaWFsb2dzLnRzIiwiRGlhbG9ncy9HUm9uTmFrbGFkb3ZlWmF6bmFteVJUTi9HUm9uTmFrbGFkb3ZlWmF6bmFteVJUTi50cyIsIkRpYWxvZ3MvR1JvblByZWRhbmkvR1JvblByZWRhbmkuRGlhbG9ncy50cyIsIkRpYWxvZ3MvR1JvblByZWRhbmkvR1JvblByZWRhbmkudHMiLCJEaWFsb2dzL0dSb25QdW1weS9HUm9uUHVtcHkuRGlhbG9ncy50cyIsIkRpYWxvZ3MvR1JvblB1bXB5L0dSb25QdW1weS50cyIsIkRpYWxvZ3MvR1JvblJvenBpc3kvR1JvblJvenBpc3kuRGlhbG9ncy50cyIsIkRpYWxvZ3MvR1JvblJvenBpc3kvR1JvblJvenBpc3kudHMiLCJEaWFsb2dzL0dSb25Sb3pwaXN5L0dSb25Sb3pwaXN5RGV0YWlsLnRzIiwiRGlhbG9ncy9HUm9uU2V6bmFtS25paC9HUm9uU2V6bmFtS25paC5EaWFsb2dzLnRzIiwiRGlhbG9ncy9HUm9uU2V6bmFtS25paC9HUm9uU2V6bmFtS25paC50cyIsIkRpYWxvZ3MvR1JvblNlem5hbVBsYW51L0dSb25TZXpuYW1QbGFudS5EaWFsb2dzLnRzIiwiRGlhbG9ncy9HUm9uU2V6bmFtUGxhbnUvR1JvblNlem5hbVBsYW51LnRzIiwiRGlhbG9ncy9HUm9uVHJhbnNmb3JtYWNlL0dSb25UcmFuc2Zvcm1hY2UuRGlhbG9ncy50cyIsIkRpYWxvZ3MvR1JvblRyYW5zZm9ybWFjZS9HUm9uVHJhbnNmb3JtYWNlLnRzIiwiRGlhbG9ncy9HUm9uVnlzbGVka3lSb3p1Y3RvdmFuaS9HUm9uVnlzbGVka3lSb3p1Y3RvdmFuaS5EaWFsb2dzLnRzIiwiRGlhbG9ncy9HUm9uVnlzbGVka3lSb3p1Y3RvdmFuaS9HUm9uVnlzbGVka3lSb3p1Y3RvdmFuaS50cyIsIkRpYWxvZ3MvVEVTVF9Db250cm9sbGluZy9HVGVzdENvbnRyb2xsaW5nLkRpYWxvZ3MudHMiLCJUZW1wbGF0ZXMvR0dyaWRNYXNrVGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQWFmO0FBYkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBYW5CO0lBYmdCLFdBQUEsR0FBRztRQUFDLElBQUEsV0FBVyxDQWEvQjtRQWJvQixXQUFBLFdBQVc7WUFFNUI7Ozs7Y0FJRTtZQUNLLEtBQUssVUFBVSxhQUFhLENBQUMsSUFBYztnQkFDOUMsTUFBTSxNQUFNLEdBQWEsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGtDQUFrQyxDQUFDLENBQUM7Z0JBQ3ZGLE1BQU0sVUFBVSxHQUFXLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFFOUQsT0FBTyxVQUFVLENBQUM7WUFDdEIsQ0FBQztZQUxxQix5QkFBYSxnQkFLbEMsQ0FBQTtRQUNMLENBQUMsRUFib0IsV0FBVyxHQUFYLGVBQVcsS0FBWCxlQUFXLFFBYS9CO0lBQUQsQ0FBQyxFQWJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFhbkI7QUFBRCxDQUFDLEVB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MENBQTBDO0FBQzFDLG1CQUFtQjtBQUNuQixnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLGdDQUFnQztBQUNoQyxtQ0FBbUM7QUFDbkMsaUNBQWlDO0FBQ2pDLDJCQUEyQjtBQUMzQixnQ0FBZ0M7QUFDaEMsd0NBQXdDO0FBQ3hDLHdCQUF3QjtBQUN4QiwyQ0FBMkM7QUFDM0MsbUJBQW1CO0FBQ25CLGlCQUFpQjtBQUNqQixPQUFPO0FBQ1AsR0FBRyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuUm9uLldlYkNvbnRyb2xzIHtcclxuXHJcbiAgICAvKipcclxuICAgICogWsOtc2vDoSBwxZlpaGzDocWhZW7DqWhvIHXFvml2YXRlbGUuXHJcbiAgICAqIEBwYXJhbSB0aGVuIEtvbnRlbnQsIHplIGt0ZXLDqWhvIGplIGZ1bmtjZSB2b2zDoW5hLlxyXG4gICAgKiBAcmV0dXJucyBQxZlpaGzDocWhZW7DvSB1xb5pdmF0ZWwgamFrbyBzdHJpbmcuXHJcbiAgICAqL1xyXG4gICAgZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjdHVhbFVzZXIodGhlbjogR0NvbnRlbnQpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIGNvbnN0IHNlcnZlcjogR0NvbnRlbnQgPSB0aGVuLmNyZWF0ZVNlcnZpY2VDb250ZW50KFwiR29yZGljLlJvbi5XZWJDb250cm9scy5HUm9uVXRpbHNcIik7XHJcbiAgICAgICAgY29uc3QgYWN0dWFsVXNlcjogc3RyaW5nID0gYXdhaXQgc2VydmVyLmNhbGwoXCJHZXRBY3R1YWxVc2VyXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gYWN0dWFsVXNlcjtcclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuUm9uLldlYkNvbnRyb2xzIHtcclxuXHJcbiAgICAvKipcclxuICAgICogR2VuZXJpY2vDvSBhYnN0cmFrdG7DrSB6w6FrbGFkIHBybyBjb250ZW50eSB2IFJPTi5cclxuICAgICogXHJcbiAgICAqIFRJbnB1dCAgLSB2c3R1cG7DrSBjb250cmFjdCBjb250ZW50dSAocG9rdWQgamUgcG90xZllYmEpXHJcbiAgICAqIFRPdXRwdXQgLSB2w71zdHVwbsOtIGNvbnRyYWN0IGNvbnRlbnR1IChwb2t1ZCBqZSBwb3TFmWViYSlcclxuICAgICovXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgR1JvbkRpYWxvZ0Jhc2U8VElucHV0LCBUT3V0cHV0PlxyXG4gICAgICAgIGV4dGVuZHMgR0NvbnRlbnRcclxuICAgICAgICBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudFxyXG4gICAge1xyXG4gICAgICAgIC8vIE7DoXp2eSBha2NpLCBrdGVyw6kgY29udGVudCBwb3XFvsOtdsOhLiBVbG/FvmVubyB2IG9iamVrdHUsXHJcbiAgICAgICAgLy8gYWJ5IG5lZG9jaMOhemVsbyBrIHDFmWVrbGVwxa9tLCBwxZlpIHBvdcW+aXTDrSBuw6F6dsWvIGFrY8OtIGplbiBqYWtvIHN0cmluZ1xyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBhY3Rpb25OYW1lcyA9IHtcclxuICAgICAgICAgICAgLy8gR1Jvbk1hc2t5LCBHUm9uUm96cGlzeVxyXG4gICAgICAgICAgICBuZXc6IFwibmV3XCIsXHJcbiAgICAgICAgICAgIGRldGFpbDogXCJkZXRhaWxcIixcclxuICAgICAgICAgICAgZGVsZXRlOiBcImRlbGV0ZVwiLFxyXG5cclxuICAgICAgICAgICAgLy8gR1JvblJvenBpc3lEZXRhaWwsIEdSb25NYXNreURldGFpbFxyXG4gICAgICAgICAgICBlZGl0OiBcImVkaXRcIixcclxuICAgICAgICAgICAgc2F2ZTogXCJzYXZlXCIsXHJcbiAgICAgICAgICAgIGVuZEVkaXQ6IFwiZW5kRWRpdFwiLFxyXG4gICAgICAgICAgICBjbG9zZTogXCJjbG9zZVwiLFxyXG4gICAgICAgICAgICBzYXZlQW5kQ2xvc2U6IFwic2F2ZUFuZENsb3NlXCIsXHJcblxyXG4gICAgICAgICAgICAvLyBHUm9uTWFza3lEZXRhaWwsIEdSb25Sb3pwaXN5RGV0YWlsXHJcbiAgICAgICAgICAgIG5ld0RhdGE6IFwibmV3RGF0YVwiLFxyXG4gICAgICAgICAgICBkZWxldGVEYXRhOiBcImRlbGV0ZURhdGFcIixcclxuICAgICAgICAgICAgY29weURhdGE6IFwiY29weURhdGFcIixcclxuXHJcbiAgICAgICAgICAgIC8vIHRvaGxlIHBhdMWZw60gayBwcsOhdsWvbVxyXG4gICAgICAgICAgICBuZXdCb29rOiBcIm5ld0Jvb2tcIixcclxuICAgICAgICAgICAgbmV3RnVuY3Rpb246IFwibmV3RnVuY3Rpb25cIixcclxuICAgICAgICAgICAgZGVsZXRlUmlnaHQ6IFwiZGVsZXRlUmlnaHRcIixcclxuICAgICAgICB9IGFzIGNvbnN0IHNhdGlzZmllcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgX2lucHV0OiBUSW5wdXQ7XHJcbiAgICAgICAgcHJvdGVjdGVkIF9vdXRwdXQ6IFRPdXRwdXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhsYXZuw60gbWV0b2RhIHBybyB2eXR2b8WZZW7DrSBvYnNhaHUgY29udGVudHUuXHJcbiAgICAgICAgICogQHBhcmFtIGlucHV0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IGJ1aWxkQ29udGVudChpbnB1dDogVElucHV0KTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmcOtIHbFoWVjaG55IGFrY2UsIGt0ZXLDqSBjb250ZW50IHBvdcW+w612w6EuXHJcbiAgICAgICAgICogUHJvY2jDoXrDrSBwcm9txJtubm91IGFjdGlvbk5hbWVzIGEgcG9kbGUgbsOhenbFryBha2PDrSB2eXR2b8WZw60gYWtjZS5cclxuICAgICAgICAgKiBAcGFyYW0gaW5wdXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgcHJlcGFyZUFjdGlvbnMoaW5wdXQ6IFRJbnB1dCk6IHZvaWQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSBtZW51IHBybyBjb250ZW50LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBidWlsZE1lbnUoKTogdm9pZDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVm9saXRlbG7DoSBtZXRvZGEsIGt0ZXLDoSBzZSB6YXZvbMOhIHDFmWVkIHZ5dHZvxZllbsOtbSBvYnNhaHUgY29udGVudHUuXHJcbiAgICAgICAgICogQHBhcmFtIGlucHV0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGFzeW5jIGJlZm9yZUJ1aWxkQ29udGVudChpbnB1dDogVElucHV0KTogUHJvbWlzZTx2b2lkPiB7IH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZvbGl0ZWxuw6EgbWV0b2RhLCBrdGVyw6Egc2UgemF2b2zDoSBwbyB2eXR2b8WZZW7DrSBvYnNhaHUgY29udGVudHUuXHJcbiAgICAgICAgICogQHBhcmFtIGlucHV0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGFzeW5jIGFmdGVyQnVpbGRDb250ZW50KGlucHV0OiBUSW5wdXQpOiBQcm9taXNlPHZvaWQ+IHsgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGludGVybmFsXHJcbiAgICAgICAgICogVGF0byBtZXRvZGEgamUgdXLEjWVuYSBqZW4gcHJvIGZyYW1ld29yay5cclxuICAgICAgICAgKiBOZXBvdcW+w612ZWp0ZSBwxZnDrW1vLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBhc3luYyBwcmVwYXJlQ29udGVudChpbnB1dDogVElucHV0KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZUFjdGlvbnMoaW5wdXQpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkTWVudSgpO1xyXG5cclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5iZWZvcmVCdWlsZENvbnRlbnQoaW5wdXQpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmJ1aWxkQ29udGVudChpbnB1dCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYWZ0ZXJCdWlsZENvbnRlbnQoaW5wdXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuUm9uLkRpYWxvZ3Mge1xyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHUm9uR2VuZXJhdG9yeURsZyhcclxuICAgICAgICBpbnB1dDogR3VpLkRpYWxvZ3MuT3BlbkRpYWxvZ1BhcmFtczxXZWJDb250cm9scy5HUm9uR2VuZXJhdG9yeUlucHV0IHwgdW5kZWZpbmVkPlxyXG4gICAgKTogSlF1ZXJ5LlByb21pc2U8V2ViQ29udHJvbHMuR1JvbkdlbmVyYXRvcnlPdXRwdXQgfCB1bmRlZmluZWQ+IHtcclxuXHJcbiAgICAgICAgLy8ga3ZsaSB1xb5pdmF0ZWxza8OpbXUgbmFzdGF2ZW7DrSwgSUQgY29udGVudHVcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gJC5leHRlbmQoe30sIGlucHV0Lm9wdCwge1xyXG4gICAgICAgICAgICBJRDogJ0dSb25HZW5lcmF0b3J5IydcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEd1aS5EaWFsb2dzLl9vcGVuRGlhbG9nMihpbnB1dD8ucGFyZW50Q29udGVudCwgV2ViQ29udHJvbHMuR1JvbkdlbmVyYXRvcnksIGlucHV0Py5Nb2RPdGV2cmVuaSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLlJvbi5XZWJDb250cm9scyB7XHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVnNwdXRuw60gcGFyYW1ldHJ5IGNvbnRlbnR1LlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdSb25HZW5lcmF0b3J5SW5wdXQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFbDvXN0dXAgeiBjb250ZW50dS5cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHUm9uR2VuZXJhdG9yeU91dHB1dCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGxhdm7DrSB0xZnDrWRhIGNvbnRlbnR1LlxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUm9uR2VuZXJhdG9yeSBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcbiAgICAgICAgdGl0bGUgPSBcImpyZXM6MzUxMDAwMDJcIjsgLy9SQyAzNTEwMDAwMiA6IEdlbmVyw6F0b3J5XHJcbiAgICAgICAgdGFza0lkID0gXCJhY3RHZW5lcmF0b3J5XCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBpbnB1dFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBwcmVwYXJlQ29udGVudChpbnB1dD86IEdSb25HZW5lcmF0b3J5SW5wdXQpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJHZW5lcmF0b3J5XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuUm9uLkRpYWxvZ3Mge1xyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHUm9uS3VtdWxhY2VEbGcoaW5wdXQ6IEd1aS5EaWFsb2dzLk9wZW5EaWFsb2dQYXJhbXM8V2ViQ29udHJvbHMuR1Jvbkt1bXVsYWNlSW5wdXQgfCB1bmRlZmluZWQ+KVxyXG4gICAgICAgIDogSlF1ZXJ5LlByb21pc2U8V2ViQ29udHJvbHMuR1Jvbkt1bXVsYWNlT3V0cHV0IHwgdW5kZWZpbmVkPiB7XHJcblxyXG4gICAgICAgIC8vIGt2bGkgdcW+aXZhdGVsc2vDqW11IG5hc3RhdmVuw60sIElEIGNvbnRlbnR1XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBpbnB1dC5vcHQsIHtcclxuICAgICAgICAgICAgSUQ6ICdHUm9uS3VtdWxhY2UjJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhpbnB1dD8uTW9kT3RldnJlbmkpO1xyXG5cclxuICAgICAgICByZXR1cm4gR3VpLkRpYWxvZ3MuX29wZW5EaWFsb2cyKGlucHV0Py5wYXJlbnRDb250ZW50LCBXZWJDb250cm9scy5HUm9uS3VtdWxhY2UsIGlucHV0Py5Nb2RPdGV2cmVuaSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLlJvbi5XZWJDb250cm9scyB7XHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVnNwdXRuw60gcGFyYW1ldHJ5IGNvbnRlbnR1LlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdSb25LdW11bGFjZUlucHV0IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWw71zdHVwIHogY29udGVudHUuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1Jvbkt1bXVsYWNlT3V0cHV0IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIbGF2bsOtIHTFmcOtZGEgY29udGVudHUuXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdSb25LdW11bGFjZSBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcbiAgICAgICAgdGl0bGUgPSBcImpyZXM6MzUxMDAwMDNcIjsgLy9SQyAzNTEwMDAwMyA6IEt1bXVsYWNlXHJcbiAgICAgICAgdGFza0lkID0gXCJhY3RLdW11bGFjZVwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gaW5wdXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcHJlcGFyZUNvbnRlbnQoaW5wdXQ/OiBHUm9uS3VtdWxhY2VJbnB1dCkge1xyXG4gICAgICAgICAgICBhbGVydChcIkt1bXVsYWNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuUm9uLkRpYWxvZ3Mge1xyXG4gICAgLyoqXHJcbiAgICAgKiBEaWFsb2cgcHJvIHbDvWLEm3IgbWFzZWsuXHJcbiAgICAgKiBAcGFyYW0gaW5wdXQgVnN0dXBuw60gcGFyYW1ldHJ5IGRpYWxvZ3UuXHJcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlIHMgdsO9c3R1cG7DrW1pIGRhdHkuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHUm9uTWFza3lEbGcoaW5wdXQ6IEd1aS5EaWFsb2dzLk9wZW5EaWFsb2dQYXJhbXM8V2ViQ29udHJvbHMuR1Jvbk1hc2t5SW5wdXQgfCB1bmRlZmluZWQ+KVxyXG4gICAgICAgIDogSlF1ZXJ5LlByb21pc2U8V2ViQ29udHJvbHMuR1Jvbk1hc2t5T3V0cHV0IHwgdW5kZWZpbmVkPiB7XHJcblxyXG4gICAgICAgIC8vIGt2bGkgdcW+aXZhdGVsc2vDqW11IG5hc3RhdmVuw60sIElEIGNvbnRlbnR1XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBpbnB1dC5vcHQsIHtcclxuICAgICAgICAgICAgSUQ6ICdHUm9uTWFza3kjJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gR3VpLkRpYWxvZ3MuX29wZW5EaWFsb2cyKGlucHV0Py5wYXJlbnRDb250ZW50LCBXZWJDb250cm9scy5HUm9uTWFza3kgYXMgYW55LCBpbnB1dD8uTW9kT3RldnJlbmksIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlhbG9nIHBybyBkZXRhaWwgbWFza3kuXHJcbiAgICAgKiBAcGFyYW0gaW5wdXQgVnN0dXBuw60gcGFyYW1ldHJ5IGRpYWxvZ3UuXHJcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlIHMgdsO9c3R1cG7DrW1pIGRhdHkuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHUm9uTWFza3lEZXRhaWxEbGcoaW5wdXQ6IEd1aS5EaWFsb2dzLk9wZW5EaWFsb2dQYXJhbXM8V2ViQ29udHJvbHMuR1Jvbk1hc2t5RGV0YWlsSW5wdXQgfCB1bmRlZmluZWQ+KVxyXG4gICAgICAgIDogSlF1ZXJ5LlByb21pc2U8V2ViQ29udHJvbHMuR1Jvbk1hc2t5RGV0YWlsT3V0cHV0IHwgdW5kZWZpbmVkPiB7XHJcblxyXG4gICAgICAgIC8vIGt2bGkgdcW+aXZhdGVsc2vDqW11IG5hc3RhdmVuw60sIElEIGNvbnRlbnR1XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBpbnB1dC5vcHQsIHtcclxuICAgICAgICAgICAgSUQ6ICdHUm9uRGV0YWlsTWFza3kjJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gR3VpLkRpYWxvZ3MuX29wZW5EaWFsb2cyKGlucHV0Py5wYXJlbnRDb250ZW50LCBXZWJDb250cm9scy5HUm9uTWFza3lEZXRhaWwgYXMgYW55LCBpbnB1dD8uTW9kT3RldnJlbmksIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5Sb24uV2ViQ29udHJvbHMge1xyXG4gICAgLy8gI3JlZ2lvbiBWc3R1cG7DrS92w71zdHVwbsOtIHJvemhyYW7DrS5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZzcHV0bsOtIHBhcmFtZXRyeSBjb250ZW50dS5cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHUm9uTWFza3lJbnB1dCB7XHJcbiAgICAgICAgLy8gacSNbyBwxZlpaGzDocWhZW7DqWhvIHXFvml2YXRlbGVcclxuICAgICAgICBpY286IHN0cmluZztcclxuICAgICAgICAvLyDDusSNZXRuw60gcm9rXHJcbiAgICAgICAgcm9rOiBudW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWw71zdHVwIHogY29udGVudHUuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1Jvbk1hc2t5T3V0cHV0IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGxhdm7DrSB0xZnDrWRhIGNvbnRlbnR1LlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR1Jvbk1hc2t5IGV4dGVuZHMgR1JvbkRpYWxvZ0Jhc2U8R1Jvbk1hc2t5SW5wdXQsIEdSb25NYXNreU91dHB1dD4ge1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0TWFza3lcIjtcclxuICAgICAgICB0aXRsZSA9IFwianJlczozNTEwMDAwNFwiOyAvL1JDIDM1MTAwMDA0IDogTWFza3lcclxuXHJcbiAgICAgICAgLy8gZHLFvsOtIGluc3RhbmNpIGdyaWR1IHMgbWFza2FtaVxyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTtcclxuICAgICAgICAvLyB2aWV3IHBybyBncmlkIHMgbWFza2FtaVxyXG4gICAgICAgIHByaXZhdGUgJGlzbFZpZXc6IEdvcmRpYy5Jc2wuVmlldzxJbnRlcmZhY2UuR01hc2thRHRvPjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBTcHVzdMOtIHNlIHDFmWVkIHZ5dHZvxZllbsOtbSBvYnNhaHUgY29udGVudHUuXHJcbiAgICAgICAgKiBAcGFyYW0gaW5wdXQgVnN0dXBuw60gcGFyYW1ldHJ5IGNvbnRlbnR1LlxyXG4gICAgICAgICovXHJcbiAgICAgICAgYXN5bmMgYmVmb3JlQnVpbGRDb250ZW50KGlucHV0OiBHUm9uTWFza3lJbnB1dCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICBpZiAoIWlucHV0KVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVnN0dXBuw60gcGFyYW1ldHJ5IGNvbnRlbnR1IG5lanNvdSBkZWZpbm92w6FueS5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZw60gb2JzYWggY29udGVudHUuXHJcbiAgICAgICAgICogQHBhcmFtIGlucHV0IFZzdHVwbsOtIHBhcmFtZXRyeSBjb250ZW50dS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgYXN5bmMgYnVpbGRDb250ZW50KGlucHV0OiBHUm9uTWFza3lJbnB1dCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICAvLyBncmlkIHNlem5hbXUgbWFzZWtcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZCA9ICQubmV3RGl2KFwiZ3JpZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxJbnRlcmZhY2UuR01hc2thRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtYXNrR3JpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuJGlzbFZpZXcgPSBuZXcgR29yZGljLklzbC5WaWV3PEludGVyZmFjZS5HTWFza2FEdG8+KHRoaXMuaXNsLk1hc2tTZXJ2aWNlLmxpc3QoKSwge30pLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eU1lc3NhZ2U6IFwianJlczozNTEwMDAxM1wiLCAvL1JDIDM1MTAwMDEzIDogTmVqc291IG5hZGVmaW5vdmFuw6kgxb7DoWRuw6kgbWFza3lcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGlzLmFjdGlvbnNbdGhpcy5hY3Rpb25OYW1lcy5kZXRhaWxdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZw60gbWVudSBwcm8gdGVudG8gY29udGVudC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgYnVpbGRNZW51KCk6IHZvaWQge1xyXG4gICAgICAgICAgICAvLyB2eXR2b8WZw60gcGFyYW1ldHJ5IG1lbnVcclxuICAgICAgICAgICAgY29uc3QgbWVudVBhcmFtczogTWVudVBhcmFtc1tdID0gdGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zW3RoaXMuYWN0aW9uTmFtZXMuZGV0YWlsXSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnNbdGhpcy5hY3Rpb25OYW1lcy5uZXddLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9uc1t0aGlzLmFjdGlvbk5hbWVzLmRlbGV0ZV0sIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvLyBuYXBsbsOtIG1lbnUgcGFyYW1ldHJ5XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihtZW51UGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmWlwcmF2w60gYWtjZSBwcm8gY29udGVudC5cclxuICAgICAgICAgKiBAcGFyYW0gaW5wdXQgVnN0dXBuw60gcGFyYW1ldHJ5IGNvbnRlbnR1LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBwcmVwYXJlQWN0aW9ucyhpbnB1dDogR1Jvbk1hc2t5SW5wdXQpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vIHBva3VkIG5lbsOtIHZzdHVwbsOtIHBhcmFtZXRyLCB0YWsgc2UgbmljIG5lcHJvdsOhZMOtXHJcbiAgICAgICAgICAgIGlmICghaW5wdXQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgLy8gYWtjZSBwcm8gdnl0dm/FmWVuw60gbm92w6kgbWFza3lcclxuICAgICAgICAgICAgICAgIFt0aGlzLmFjdGlvbk5hbWVzLm5ld106IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzUxMDAwMTRcIiwgLy9SQyAzNTEwMDAxNCA6IE5vdsOhIG1hc2thXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IFwibm9ybWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRldGFpbChcImpyZXM6MzUxMDAwMTRcIiwgaW5wdXQuaWNvLCBpbnB1dC5yb2spIC8vUkMgMzUxMDAwMTQgOiBOb3bDoSBtYXNrYVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWtjZSBwcm8gem9icmF6ZW7DrSBkZXRhaWx1IG1hc2t5XHJcbiAgICAgICAgICAgICAgICBbdGhpcy5hY3Rpb25OYW1lcy5kZXRhaWxdOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5hY3Rpb25OYW1lcy5kZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDE1XCIsIC8vUkMgMzUxMDAwMTUgOiBEZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uVmlzaWJsZTogXCJub3JtYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6w61za8OhbsOtIGFrdGl2bsOtaG8gxZnDoWRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVSb3dEYXRhOiBJbnRlcmZhY2UuR01hc2thRHRvID0gdGhpcy4kZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRGV0YWlsKFwianJlczozNTEwMDAxMlwiLCBpbnB1dC5pY28sIGlucHV0LnJvaywgYWN0aXZlUm93RGF0YSkgLy9SQyAzNTEwMDAxMiA6IERldGFpbCBtYXNreVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWtjZSBwcm8gc21hesOhbsOtIGRldGFpbHUgbWFza3lcclxuICAgICAgICAgICAgICAgIFt0aGlzLmFjdGlvbk5hbWVzLmRlbGV0ZV06IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzUxMDAwMTZcIiwgLy9SQyAzNTEwMDAxNiA6IE9kc3RyYW5pdFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBcIm5vcm1hbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtdHJhc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlUm93RGF0YTogSW50ZXJmYWNlLkdNYXNrYUR0byA9IHRoaXMuJGdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlUm93RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlUmVzdWx0ID0gYXdhaXQgdGhpcy5pc2wuTWFza1NlcnZpY2UuZGVsZXRlKGFjdGl2ZVJvd0RhdGEpLmdldCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlbGV0ZVJlc3VsdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRpc2xWaWV3LnVwZGF0ZURhdGEoYWN0aXZlUm93RGF0YSwgXCJkZWxldGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR0RsZy5hbGVydChcImpyZXM6MzUxMDAwNDZcIik7IC8vUkMgMzUxMDAwNDYgOiBQxZlpIG1hesOhbsOtIG1hc2t5IGRvxaFsbyBrIGNoeWLEmy4gVsOtY2UgaW5mb3JtYWPDrSB2IGxvZ8OhY2guXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gI3JlZ2lvbiBQcml2YXRlIG1ldGhvZHNcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZw61wcmF2YSBncmlkdSBwcm8gem9icmF6ZW7DrSBtYXNlay5cclxuICAgICAgICAgKiBAcmV0dXJucyBHcmlkRm9ybWF0IHBybyBtYXNreS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR0dyaWRDb2x1bW48SW50ZXJmYWNlLkdNYXNrYUR0bz5bXSB8IERhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR01hc2thRHRvPiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR01hc2thRHRvPigpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfbWFza3lfemtyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDM2XCIgLy9SQyAzNTEwMDAzNiA6IFR5cCBtYXNreVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDM3XCIgLy9SQyAzNTEwMDAzNyA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5fYWt0X3JmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDM4XCIgLy9SQyAzNTEwMDAzOCA6IFZsYXN0bsOta1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDM5XCIgLy9SQyAzNTEwMDAzOSA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByYXZhX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTEwMDA0MFwiIC8vUkMgMzUxMDAwNDAgOiBQcsOhdmFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDQxXCIsIC8vUkMgMzUxMDAwNDEgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6bWVudV9wcm92X3JmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDQyXCIgLy9SQyAzNTEwMDA0MiA6IFptxJtudSBwcm92ZWRsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE90ZXbFmWUgZGV0YWlsIG1hc2t5LlxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZSBOw6F6ZXYgb2tuYSBkZXRhaWx1LlxyXG4gICAgICAgICAqIEBwYXJhbSBpY28gSWNvIHDFmWlobMOhxaFlbsOpaG8gdcW+aXZhdGVsZS5cclxuICAgICAgICAgKiBAcGFyYW0gcm9rIMOaxI1ldG7DrSByb2suXHJcbiAgICAgICAgICogQHBhcmFtIHNlbGVjdGVkUm93IFZ5YnJhbsO9IMWZw6FkZWsgdiBncmlkdSwgcG9rdWQgamUgayBkaXNwb3ppY2kuXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGFzeW5jIG9wZW5EZXRhaWwodGl0bGU6IHN0cmluZywgaWNvOiBzdHJpbmcsIHJvazogbnVtYmVyLCBzZWxlY3RlZFJvdz86IEludGVyZmFjZS5HTWFza2FEdG8pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgR29yZGljLlJvbi5EaWFsb2dzLkdSb25NYXNreURldGFpbERsZyh7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgTW9kT3RldnJlbmk6IEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5uYXZpZ2F0ZSxcclxuICAgICAgICAgICAgICAgIG9wdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUaXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFza2FEYXRhOiBzZWxlY3RlZFJvdyxcclxuICAgICAgICAgICAgICAgICAgICBpY286IGljbyxcclxuICAgICAgICAgICAgICAgICAgICByb2s6IHJva1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHBva3VkIGplIHbDvXN0dXAgeiBkZXRhaWx1IGRlZmlub3bDoW4gYSBqZSB6bcSbbsSbbiwgYWt0dWFsaXp1amUgc2UgZ3JpZFxyXG4gICAgICAgICAgICBpZiAocmVzdWx0Py5pc0NoYW5nZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpc2xWaWV3Py5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5Sb24uV2ViQ29udHJvbHMge1xyXG4gICAgLy8gI3JlZ2lvbiBWc3R1cG7DrS92w71zdHVwbsOtIHJvemhyYW7DrS5cclxuXHJcbiAgICAvKiogVnNwdXRuw60gcGFyYW1ldHJ5IGNvbnRlbnR1LiAqL1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHUm9uTWFza3lEZXRhaWxJbnB1dCB7XHJcbiAgICAgICAgLy8gdGl0dWxlayBrb250ZW50dVxyXG4gICAgICAgIGNvbnRlbnRUaXRsZTogc3RyaW5nO1xyXG4gICAgICAgIC8vIGRhdGEgbWFza3ksIHBva3VkIGpzb3UgbnVsbHx1bmRlZmluZWQsIHRhayBzZSBqZWRuw6EgbyBub3bDvSB6w6F6bmFtXHJcbiAgICAgICAgbWFza2FEYXRhPzogSW50ZXJmYWNlLkdNYXNrYUR0bztcclxuICAgICAgICAvLyBkZXRhaWwvbmFzdGF2ZW7DrSBtYXNreVxyXG4gICAgICAgIG1hc2thRGF0YURldGFpbD86IEludGVyZmFjZS5HTWFza2FEZXRhaWxEdG9bXTtcclxuICAgICAgICAvLyBpxI1vIHDFmWlobMOhxaFlbsOpaG8gdcW+aXZhdGVsZVxyXG4gICAgICAgIGljbzogc3RyaW5nO1xyXG4gICAgICAgIC8vIHJvayDDusSNZXRuw61obyBvYmRvYsOtXHJcbiAgICAgICAgcm9rOiBudW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFbDvXN0dXAgeiBjb250ZW50dS4gKi9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1Jvbk1hc2t5RGV0YWlsT3V0cHV0IHtcclxuICAgICAgICBpc0NoYW5nZWQ6IGJvb2xlYW47IC8vIGluZm9ybWFjZSwgemRhIGRvxaFsbyBrZSB6bcSbbsSbIGRhdFxyXG4gICAgfVxyXG5cclxuICAgIC8vICNlbmRyZWdpb25cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhsYXZuw60gdMWZw61kYSBjb250ZW50dS5cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEdSb25NYXNreURldGFpbCBleHRlbmRzIEdSb25EaWFsb2dCYXNlPEdSb25NYXNreURldGFpbElucHV0LCBHUm9uTWFza3lEZXRhaWxPdXRwdXQ+IHtcclxuICAgICAgICBwdWJsaWMgdGFza0lkID0gXCJhY3RNYXNreURldGFpbFwiO1xyXG5cclxuICAgICAgICAvLyBpbmZvcm1hY2UsIHpkYSBzZSBqZWRuw6EgbyBub3bDvSB6w6F6bmFtXHJcbiAgICAgICAgcHJpdmF0ZSBfaXNOZXc6IGJvb2xlYW47XHJcbiAgICAgICAgLy8gZHLFvsOtIHDFr3ZvZG7DrSBob2Rub3R5IHDFmWVkYW7DvWNoIHBhcmFtZXRyxa9cclxuICAgICAgICBwcml2YXRlIF9kZWZhdWx0OiBHUm9uTWFza3lEZXRhaWxJbnB1dDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSAkbWFza0RldGFpbEZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZE1hc2tUYWI6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFByYXZhVGFiOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBwcml2YXRlIF9ncmlkTWFza1RhYkNvbnRlbnQ6IEdvcmRpYy5Fa28uUHJlZmFicy5HRWtvQ2Z1R3JpZFNlbGVjdG9yPGFueT4gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgcHJpdmF0ZSBfZGF0YUdyaWRQcmF2YTogRGF0YS5WaWV3PEludGVyZmFjZS5HUHJhdmFEdG8+O1xyXG5cclxuICAgICAgICAvLyB2aWV3IHBybyBncmlkIHByw6F2XHJcbiAgICAgICAgcHJpdmF0ZSBfdmlld1ByYXZhOiBEYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdQcmF2YUR0bz47ICAgICAgIC8vIFRPRE86IG9kc3RyYW5pdCwgYcW+IHNlIHDFmWVqZGUgbmEgbm92w70gZ3JpZFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYXZvbMOhbm8gcMWZZWQgc2Ftb3Rub3Ugc3RhdmJvdSBjb250ZW50dS5cclxuICAgICAgICAgKiBAcGFyYW0gaW5wdXQgVnN0dXBuw60gcGFyYW1ldHJ5IGNvbnRlbnR1LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBhc3luYyBiZWZvcmVCdWlsZENvbnRlbnQoaW5wdXQ6IEdSb25NYXNreURldGFpbElucHV0KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgICAgIGlmICghaW5wdXQpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJqcmVzOjM1MTAwMDE3XCIpOyAvL1JDIDM1MTAwMDE3IDogTmVieWx5IHDFmWVkw6FueSB2c3R1cG7DrSBwYXJhbWV0cnkuXHJcblxyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbsOtIHRpdHVsa3Ugb2tuYVxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy5wcmVwYXJlQ29udGVudFRpdGxlKGlucHV0LmNvbnRlbnRUaXRsZSwgaW5wdXQubWFza2FEYXRhPy5uYXpldik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeWtyZXNsw60gb2JzYWggY29udGVudHUuXHJcbiAgICAgICAgICogUG9jaMOhesOtIHogR1JvbkRpYWxvZ0Jhc2UsIGtkZSBqZSBkZWtsYXJvdsOhbiBqYWtvIGFic3RyYWt0bsOtLlxyXG4gICAgICAgICAqIEBwYXJhbSBpbnB1dCBWc3R1cG7DrSBwYXJhbWV0cnkgY29udGVudHUuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGFzeW5jIGJ1aWxkQ29udGVudChpbnB1dDogR1Jvbk1hc2t5RGV0YWlsSW5wdXQpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YUdyaWRQcmF2YSA9IG5ldyBEYXRhLlZpZXc8SW50ZXJmYWNlLkdQcmF2YUR0bz4oKTtcclxuICAgICAgICAgICAgdGhpcy5fZGVmYXVsdCA9IFV0aWxzLkRlZXBDbG9uZShpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9pc05ldyA9ICFpbnB1dC5tYXNrYURhdGE7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpbml0aWFsT3duZXJGdW4gPSB0aGlzLl9pc05ldyA/IGF3YWl0IGdldEFjdHVhbFVzZXIodGhpcykgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxNYXNrVHlwZSA9IHRoaXMuX2lzTmV3ID8gMjAgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oaW5pdGlhbE93bmVyRnVuLCBpbml0aWFsTWFza1R5cGUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2FkVmFsaWRhdG9ycygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkTWFza0RldGFpbChpbnB1dC5pY28sIGlucHV0LnJvaywgaW5wdXQubWFza2FEYXRhPy50eXBfbWFza3kpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWRQcmF2YSgpO1xyXG5cclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGF0YShpbnB1dC5tYXNrYURhdGE/Lml4c19tc2spO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUVuYWJsZWQodGhpcy5faXNOZXcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQXN5bmNocm9uw60gbmHEjXRlbsOtIHZhbGlkw6F0b3LFry5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGFzeW5jIGxvYWRWYWxpZGF0b3JzKCkge1xyXG4gICAgICAgICAgICBjb25zdCBzZXJ2ZXIgPSB0aGlzLmNyZWF0ZVNlcnZpY2VDb250ZW50KFwiR29yZGljLlJvbi5XZWJDb250cm9scy5HUm9uVXRpbHNcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRvciA9IGF3YWl0IHNlcnZlci5jYWxsKFwiR2V0VmFsaWRhdG9yc0J5VHlwZVwiLCB7IHR5cGVOYW1lOiBcIkdvcmRpYy5Sb24uSW50ZXJmYWNlLkdNYXNrYUR0b1wiIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdmFsaWRhdG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZvbMOhIHNlIHDFmWkgemF2w61yw6Fuw60gY29udGVudHUuXHJcbiAgICAgICAgICogQHJldHVybnMgUHJvbWlzZSwga3RlcsO9IHZyYWPDrSBvdXRwdXQgeiBHUm9uTWFza3lEZXRhaWwuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGFzeW5jIGNsb3NpbmcoKTogUHJvbWlzZTxKUXVlcnlQcm9taXNlPEdSb25NYXNreURldGFpbE91dHB1dD4+IHtcclxuICAgICAgICAgICAgY29uc3QgZGVmZXJyZWQgPSAkLkRlZmVycmVkPEdSb25NYXNreURldGFpbE91dHB1dD4oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhd2FpdCB0aGlzLmlzQ29udGVudENoYW5nZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gcG9rdWQgZG/FoWxvIGtlIHptxJtuxJsgb2JzYWh1LCB0YWsgc2UgemVwdMOhLCB6ZGEgY2hjZSB1xb5pdmF0ZWwgdWxvxb5pdCB6bcSbbnlcclxuICAgICAgICAgICAgICAgIEdEbGcuY29uZmlybShcImpyZXM6MzUxMDAwNDdcIiwgXCJqcmVzOjM1MTAwMDQ4XCIpIC8vUkMgMzUxMDAwNDcgOiBOZXVsb8W+ZW7DqSB6bcSbbnkgLy9SQyAzNTEwMDA0OCA6IFZlIGZvcm11xZlpIGpzb3UgbmV1bG/FvmVuw6kgem3Em255LCBvcHJhcnZkdSBjaGRldGUgdWtvbsSNaXQgZWRpdGFjaT8gXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7IGlzQ2hhbmdlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJub1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoeyBpc0NoYW5nZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAjcmVnaW9uIFByaXZhdGUgbWV0aG9kc1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZZW7DrSBncmlkdSBwcm8gem9icmF6ZW7DrSBuYXN0YXZlbsOtIG1hc2t5LlxyXG4gICAgICAgICAqIEBwYXJhbSBpY29cclxuICAgICAgICAgKiBAcGFyYW0gcm9rXHJcbiAgICAgICAgICogQHBhcmFtIHR5cE1hc2t5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkTWFza0RldGFpbChpY286IHN0cmluZywgcm9rOiBudW1iZXIsIHR5cE1hc2t5OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWRNYXNrVGFiID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjM1MTAwMDIzXCIsIC8vUkMgMzUxMDAwMjMgOiBOYXN0YXZlbsOtIG1hc2t5XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiB0aGlzLnByZXBhcmVUYWJNZW51KClcclxuICAgICAgICAgICAgICAgIH0pLm9uKFwiZmllbGRjaGFuZ2VcIiwgKGV2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgc2UgbmVqZWRuw6EgbyBub3bDvSB6w6F6bmFtLCB0YWsgc2Ugem3Em255IGhuZWQgdWtsw6FkYWrDrVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHYgcMWZw61wYWTEmyBub3bDqWhvIHrDoXpuYW11IHNlIHptxJtueSB1a2zDoWRhasOtIGHFviBwxZlpIHVsb8W+ZW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNOZXcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBzZXJ0TWFza0RldGFpbCgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZ3JpZHVcclxuICAgICAgICAgICAgdmFyIHNlbGVjdG9yT3B0aW9uczogR29yZGljLkVrby5QcmVmYWJzLklHUGFyYW1zPGFueT4gPVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaG93VG9wUGFuZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0JvdHRvbVBhbmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IHRoaXMuY3JlYXRlR3JpZENvbHVtbnNfbWFza2EoaWNvLCByb2ssIHR5cE1hc2t5KSxcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dIZWlnaHQ6IDQ2XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyB2eXR2b8WZZW7DrSBncmlkdSBqYWtvIGNvbnRlbnR1IHBybyBuYXN0YXZlbsOtIG1hc2VrXHJcbiAgICAgICAgICAgIHRoaXMuX2dyaWRNYXNrVGFiQ29udGVudCA9ICQuY29udGVudCh0aGlzLiRncmlkTWFza1RhYi5nY29udGVudChbR29yZGljLkVrby5QcmVmYWJzLkdFa29DZnVHcmlkU2VsZWN0b3IsIHNlbGVjdG9yT3B0aW9uc10pKSBhcyBHb3JkaWMuRWtvLlByZWZhYnMuR0Vrb0NmdUdyaWRTZWxlY3Rvcjxhbnk+O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmWVuw60gZ3JpZHUgcHJvIG5hc3RhdmFuw60gcHLDoXYgayBtYXNjZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRQcmF2YSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgcHJhdmFUYWI6IEpRdWVyeSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUHLDoXZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiB0aGlzLnByZXBhcmVSaWdodHNUYWJNZW51KClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdmlld1ByYXZhID0gdGhpcy5jcmVhdGVHcmlkQ29sdW1uc19wcmF2YSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZ3JpZCBwcm8gem9icmF6ZW7DrSBwcsOhdiBtYXNla1xyXG4gICAgICAgICAgICB0aGlzLiRncmlkUHJhdmFUYWIgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8ocHJhdmFUYWIpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuX2RhdGFHcmlkUHJhdmEsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5fdmlld1ByYXZhLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcImNlbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBzaG93VG9wUGFuZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dCb3R0b21QYW5lbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmcOtIGZvcm3DoXQgZ3JpZHUgcHJvIHpvYnJhemVuw60gZGV0YWlsdSBtYXNreS5cclxuICAgICAgICAgKiBAcmV0dXJucyBGb3Jtw6F0IGdyaWR1IHBybyB6b2JyYXplbsOtIGRldGFpbHUgbWFza3kuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkQ29sdW1uc19tYXNrYShpY286IHN0cmluZywgcm9rOiBudW1iZXIsIHR5cF9tYXNreTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IERhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR01hc2thRGV0YWlsRHRvPntcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBEYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdNYXNrYURldGFpbER0bz4oKVxyXG4gICAgICAgICAgICAgICAgLmFkZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrbmloYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiS25paGFcIixcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0YXZcIixcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJvenBpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUm96cGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc3RyaW5nYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmF6ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRsOhemVcIixcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIixcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVDU1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGE6IEludGVyZmFjZS5HTWFza2FEZXRhaWxEdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInVjc1wiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogRWtvLkZpbHRlcnMudWNzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVDU1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiBpY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdFByb2hsOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ubHlBY3RpdmU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVVVNcIixcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhOiBJbnRlcmZhY2UuR01hc2thRGV0YWlsRHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBFa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJ1dXNcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IChlZGl0b3JDb250ZXh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBFa28uRmlsdGVycy51dXNJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVVU1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IGljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdFByb2hsOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmx5QWN0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiBlZGl0b3JDb250ZXh0LmNlbGxJbmZvLmRhdGEudWNzPy5zdGFydCB8fCBudWxsIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOU1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGE6IEludGVyZmFjZS5HTWFza2FEZXRhaWxEdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcIm5zXCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBFa28uRmlsdGVycy5ua3NJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTlNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibnNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiBpY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdFByb2hsOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ubHlBY3RpdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImhcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkhcIixcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEVrby5GaWx0ZXJzLmRyZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiSFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dPc3Q6IHR5cF9tYXNreSA9PSAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1VjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk1cIixcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhOiBJbnRlcmZhY2UuR01hc2thRGV0YWlsRHRvKSA9PiB7IHJldHVybiBFa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJtZXNpY1wiLCBkYXRhKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1lc2ljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFZhbHVlOiAxMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBzZWNvbmRGaWVsZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluVmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhWYWx1ZTogMTJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRcIixcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhOiBJbnRlcmZhY2UuR01hc2thRGV0YWlsRHRvKSA9PiB7IHJldHVybiBFa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJkZW5cIiwgZGF0YSk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBFa28uRmlsdGVycy5pbnRlZ2VySW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RmllbGQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pblZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4VmFsdWU6IDMxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHNlY29uZEZpZWxkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFZhbHVlOiAzMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRva2xhZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRG9rbGFkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZGF0YTogSW50ZXJmYWNlLkdNYXNrYURldGFpbER0bykgPT4geyByZXR1cm4gRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwiZG9rbGFkXCIsIGRhdGEpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogRWtvLkZpbHRlcnMuYWNJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRG9rbGFkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImRva2xhZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY286IGljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWNMZW5ndGg6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvazogcm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJyYWRhOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHprcmF0a2E6IFwiYWFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNvcnRlZEVrb0NmdVNldChHb3JkaWMuRWtvLkNmdVV0aWxzLmdldENmdVNldEVkaXRvcnModGhpcykpXHJcbiAgICAgICAgICAgICAgICAuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJNRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGE6IEludGVyZmFjZS5HTWFza2FEZXRhaWxEdG8pID0+IHsgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcIm1kXCIsIGRhdGEpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJNRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZGF0YTogSW50ZXJmYWNlLkdNYXNrYURldGFpbER0bykgPT4geyByZXR1cm4gRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwiZGFsXCIsIGRhdGEpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiZGFsXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc3RyaW5nYm94XCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlJvayBEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhKSA9PiB7IHJldHVybiBFa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJyb2tEUEhcIiwgZGF0YSk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBFa28uRmlsdGVycy5pbnRlZ2VySW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlJvayBEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwicm9rRFBIXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVkcGhcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk3EmyBEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhOiBJbnRlcmZhY2UuR01hc2thRGV0YWlsRHRvKSA9PiB7IHJldHVybiBFa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJtZURQSFwiLCBkYXRhKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTcSbIERQSFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtZURQSFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGE6IEludGVyZmFjZS5HTWFza2FEZXRhaWxEdG8pID0+IHsgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInpkXCIsIGRhdGEpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogRWtvLkZpbHRlcnMuemRJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWkRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiemRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNQcm9Fa29GaWx0ZXI6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQSURcIixcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdHVtWm1lbnlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIHptxJtueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGE6IEludGVyZmFjZS5HTWFza2FEZXRhaWxEdG8pID0+IHsgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcImRhdHVtWm1lbnlcIiwgZGF0YSk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBFa28uRmlsdGVycy5kYXRlSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIHptxJtueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkYXR1bVptZW55ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWdlbmRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJBZ2VuZGFcIixcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInB1dm9kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxa92b2RcIixcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIixcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYcSNdGUgZGF0YSBkbyBjb250ZW50dS5cclxuICAgICAgICAgKiBAcGFyYW0gbWFza0RhdGEgRGF0YSBvIG1hc2NlLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgYXN5bmMgbG9hZERhdGEoaXhzX21hc2spOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc05ldykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWFza0RhdGE6IEludGVyZmFjZS5HTWFza2FEdG8gPSBhd2FpdCB0aGlzLmlzbC5NYXNrU2VydmljZS5yZWFkKHsgaXhzX21zazogaXhzX21hc2sgfSkuZ2V0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kbWFza0RldGFpbEZvcm1cclxuICAgICAgICAgICAgICAgICAgICAuZmluZEZpZWxkcygpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbWFza0RhdGEsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXNrc0RldGFpbDogSW50ZXJmYWNlLkdNYXNrYURldGFpbER0b1tdID0gYXdhaXQgdGhpcy5pc2wuTWFza1NlcnZpY2UucmVhZERldGFpbCh7IGl4c19tc2s6IGl4c19tYXNrIH0pLmdldERhdGEoKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXNrc0RldGFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlZmF1bHQubWFza2FEYXRhRGV0YWlsID0gVXRpbHMuRGVlcENsb25lKG1hc2tzRGV0YWlsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ncmlkTWFza1RhYkNvbnRlbnQ/LnNldERhdGEobWFza3NEZXRhaWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0c0RldGFpbDogSW50ZXJmYWNlLkdQcmF2YUR0b1tdID0gYXdhaXQgdGhpcy5pc2wuUHJhdmFTZXJ2aWNlLmxpc3QoeyBmaWx0ZXJzOiB7IGl4c19vYmo6IGl4c19tYXNrIH0gfSkuZ2V0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0c0RldGFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFHcmlkUHJhdmEudXBkYXRlRGF0YShyaWdodHNEZXRhaWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fZ3JpZE1hc2tUYWJDb250ZW50Py5yZWFkeUF3YWl0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVmYXVsdC5tYXNrYURhdGFEZXRhaWwgPSBbeyByYWRlazogMSB9IGFzIEludGVyZmFjZS5HTWFza2FEZXRhaWxEdG9dO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmcOtIGZvcm3DoXQgZ3JpZHUgcHJvIHpvYnJhemVuw60gcHLDoXYgbWFza3kuIFxyXG4gICAgICAgICAqIEByZXR1cm5zIEZvcm3DoXQgZ3JpZHUgcHJvIHpvYnJhemVuw60gcHLDoXYgbWFza3kuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkQ29sdW1uc19wcmF2YSgpOiBEYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdQcmF2YUR0bz4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR1ByYXZhRHRvPigpXHJcbiAgICAgICAgICAgICAgICAuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZsYXN0bmlrUHJhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVcW+aXZhdGVsL1NrdXBpbmFcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaXN0dXBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmcOtc3R1cFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZaXByYXbDrSBuw6F6ZXYgdGl0dWxrdSBva25hLlxyXG4gICAgICAgICAqIEBwYXJhbSBtYXNrTmFtZSBOw6F6ZXYgbWFza3kuXHJcbiAgICAgICAgICogQHJldHVybnMgTsOhemV2IHRpdHVsa3Ugb2tuYS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHByZXBhcmVDb250ZW50VGl0bGUodGl0bGU6IHN0cmluZywgbWFza05hbWU/OiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIChtYXNrTmFtZSlcclxuICAgICAgICAgICAgICAgID8gdGl0bGUgKyBcIiAtIFwiICsgbWFza05hbWVcclxuICAgICAgICAgICAgICAgIDogdGl0bGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBabcSbbsOtIHZsYXN0bm9zdGkgZW5hYmxlZCB1IHZ5YnJhem7DvWNoIHBydmvFrywgcG9kbGUgdG9obywgamVzdGxpIGplIHBvdm9sZW5hIGVkaXRhY2UsIMSNaSBuaWtvbGl2XHJcbiAgICAgICAgICogQHBhcmFtIGFsbG93RWRpdGF0aW9uIFDFmcOtem5haywgamVzdGxpIGplIHBvdm9sZW7DqSBlZGl0b3bDoW7DrS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNoYW5nZUVuYWJsZWQoYWxsb3dFZGl0YXRpb246IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAgICAgLy8gcmVzZXR1amkgdmFsaWTDoXRvcnkgKHNjaG92w6FtIHDFmcOtcGFkbsOpIG5lw7pzcMSbY2h5KVxyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJyZXNldFZhbGlkYXRpb25zXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gw7pwdmFyYSBtZW51IGVuYWJsZWQvZGlzYWJsZWRcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW3RoaXMuYWN0aW9uTmFtZXMuZWRpdF0/LmVuYWJsZWQoIWFsbG93RWRpdGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW3RoaXMuYWN0aW9uTmFtZXMuc2F2ZV0/LmVuYWJsZWQoYWxsb3dFZGl0YXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbdGhpcy5hY3Rpb25OYW1lcy5lbmRFZGl0XT8uZW5hYmxlZChhbGxvd0VkaXRhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAvLyBwb2zDrcSNa2EgZm9ybXVsw6HFmWUgZW5hYmxlZC9kaXNhYmxlZFxyXG4gICAgICAgICAgICB0aGlzLnNldEZpZWxkRWRpdGFibGUoXCJuYXpldlwiLCBhbGxvd0VkaXRhdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RmllbGRFZGl0YWJsZShcInBvem5hbWthXCIsIGFsbG93RWRpdGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRGaWVsZEVkaXRhYmxlKFwidHlwX21hc2t5X3prclwiLCBhbGxvd0VkaXRhdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RmllbGRFZGl0YWJsZShcIml4c19mdW5fYWt0XCIsIGFsbG93RWRpdGF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBNZXRvZHkgcHJvIHByw6FjaSBzIGZvcm11bMOhxZllbVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZw60gZm9ybXVsw6HFmSBwcm8gbWFza3VcclxuICAgICAgICAgKiBAcGFyYW0gbWFza0RhdGEgSW5mbyBvIG1hc2NlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKGluaXRpYWxPd25lckZ1bj86IHN0cmluZywgaW5pdGlhbE1hc2tUeXBlPzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vIHZ5dHZvxZllbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgICAgIHRoaXMuJG1hc2tEZXRhaWxGb3JtID0gJC5uZXdEaXYoXCJtYXNrRGV0YWlsRm9ybVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGhpcy5wcmVwYXJlRm9ybShpbml0aWFsT3duZXJGdW4sIGluaXRpYWxNYXNrVHlwZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZaXByYXbDrSBmb3JtdWzDocWZIHBybyBlZGl0YWNpfHZ5dHZvxZllbsOtIG1hc2t5LlxyXG4gICAgICAgICAqIEBwYXJhbSBpbml0aWFsT3duZXJGdW4gUG/EjcOhdGXEjW7DrSBob2Rub3RhIHBybyB2bGFzdG7DrWthIG1hc2t5IChwxZlpIG5vdsOpbSB6w6F6bmFtdSkuXHJcbiAgICAgICAgICogQHBhcmFtIGluaXRpYWxNYXNrVHlwZSBQb8SNw6F0ZcSNbsOtIGhvZG5vdGEgcHJvIHR5cCBtYXNreSAocMWZaSBub3bDqW0gesOhem5hbXUpLlxyXG4gICAgICAgICAqIEByZXR1cm5zIEZvcm11bMOhxZkuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwcmVwYXJlRm9ybShpbml0aWFsT3duZXJGdW4/OiBzdHJpbmcsIGluaXRpYWxNYXNrVHlwZT86IG51bWJlcik6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwibWFza2FEZXRhaWxGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozNTEwMDAyN1wiKSAvL1JDIDM1MTAwMDI3IDogSW5mb3JtYWNlIG8gbWFzY2VcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1MTAwMDI4XCIpLmFkZEZpZWxkKCAvL1JDIDM1MTAwMDI4IDogVHlwIG1hc2t5XHJcbiAgICAgICAgICAgICAgICAgICAgXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgUHJlZmFicy5TZWxlY3QuY250Y3R5bSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfbWFza3lfemtyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9tYXNreT12YWx1ZS50eXBfbWFza3lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGlzLl9pc05ldyA/IHsgdHlwX21hc2t5OiBpbml0aWFsTWFza1R5cGUgfSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG1ldGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2dyaWRNYXNrVGFiQ29udGVudD8ucmVhZHlBd2FpdC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaENvbHVtbiA9IHRoaXMuX2dyaWRNYXNrVGFiQ29udGVudD8uZ3JpZEZvcm1hdD8uZ2V0KFwiaFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoQ29sdW1uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhDb2x1bW4uZWRpdG9yID0gRWtvLkZpbHRlcnMuZHJkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd09zdDogbWV0YS52YWx1ZT8udHlwX21hc2t5ID09IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93VWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyaWRGb3JtYXQgPSB0aGlzLl9ncmlkTWFza1RhYkNvbnRlbnQhLmdyaWRGb3JtYXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoaXMuX2dyaWRNYXNrVGFiQ29udGVudCEuZWxlbWVudC5maW5kKFwiLmdncmlkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwib3B0aW9uXCIsIHsgY29sdW1uczogZ3JpZEZvcm1hdCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwicmVmcmVzaFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTEwMDAyOVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcIm5hemV2XCIgfSkgLy9SQyAzNTEwMDAyOSA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzUxMDAwMzBcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJwb3puYW1rYVwiIH0pIC8vUkMgMzUxMDAwMzAgOiBQb3puw6Fta2FcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzUxMDAwMzFcIikgLy9SQyAzNTEwMDAzMSA6IFptxJtuYVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzUxMDAwMzVcIikgLy9SQyAzNTEwMDAzNSA6IFZsYXN0bsOtayBtYXNreVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFByZWZhYnMuU2VsZWN0LmdpbnNmdW4oKSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl9ha3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX2Z1bl9ha3Q9dmFsdWUuaXhzX2Z1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGluaXRpYWxPd25lckZ1biA/IHsgaXhzX2Z1bjogaW5pdGlhbE93bmVyRnVuIH0gOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1MTAwMDMyXCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF96bWVuYVwiLCBkaXNhYmxlZDogdHJ1ZSwgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIgfSkgLy9SQyAzNTEwMDAzMiA6IERhdHVtIHptxJtueVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzUxMDAwMzNcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJ6bWVudV9wcm92X3JmXCIsIGRpc2FibGVkOiB0cnVlIH0pIC8vUkMgMzUxMDAwMzMgOiBabcSbbnUgcHJvdmVkbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29udHJvbHVqZSwgemRhIGRvxaFsbyBrZSB6bcSbbsSbIG9ic2FodS5cclxuICAgICAgICAgKiBAcmV0dXJucyBQcm9taXMgamVzdGxpIGRvxaFsbyBrZSB6bcSbbsSbIHYgY29udGVudHUuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBhc3luYyBpc0NvbnRlbnRDaGFuZ2VkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLiRtYXNrRGV0YWlsRm9ybT8uZ2Zvcm0oXCJ3YWl0Rm9yVmFsdWVzXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuJG1hc2tEZXRhaWxGb3JtPy5nZm9ybShcImhhc0NoYW5nZWRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbG/FvsOtIHptxJtueSBkbyBkYXRhYsOhemUuXHJcbiAgICAgICAgICogQHBhcmFtIGlucHV0IFZzdHVwbsOtIHBhcmFtZXRyeS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGFzeW5jIHNhdmVDaGFuZ2VzKGlucHV0PzogR1Jvbk1hc2t5RGV0YWlsSW5wdXQpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIC8vIHRhZHkgc2UgcG/EjWvDoSBhxb4gZG9ixJtobm91IHbFoWVjaG55IHZhbGlkYWNlIG5hIGZvcm1sdcOhxZlpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLiRtYXNrRGV0YWlsRm9ybSEuZ2Zvcm0oXCJ3YWl0Rm9yVmFsdWVzXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHZhbGlkYWNlIGZvcm11bMOhxZllXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuJG1hc2tEZXRhaWxGb3JtLmdmb3JtKFwiaXNWYWxpZFwiKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcHLDoXpkbsO9IG9iamVrdCBkbyBrdGVyw6lobyBzZSB1bG/FvsOtIGRhdGEgeiBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzTmV3ICYmIGlucHV0KVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0Lm1hc2thRGF0YSA9IHt9IGFzIEludGVyZmFjZS5HTWFza2FEdG87XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gemppc3TDrW0sIGplc3RsaSBkb8WhbG8ga2Ugem3Em27DoW0gdmUgZm9ybXVsw6HFmWlcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc05ldyB8fCB0aGlzLiRtYXNrRGV0YWlsRm9ybSEuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaG9kbm90eSB6IGZvcm11bMOhxZllIHNlIHVsb8W+w60gZG8gaW5wdXQubWFza2FEYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kbWFza0RldGFpbEZvcm1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmRGaWVsZHMoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGlucHV0Py5tYXNrYURhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2U6IElzbC5HU2VydmljZVNhdmVSZXNwb25zZTxJbnRlcmZhY2UuR01hc2thRGV0YWlsRHRvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA9IGF3YWl0IHRoaXMuaXNsLk1hc2tTZXJ2aWNlLnVwc2VydCh7IGRhdGE6IGlucHV0Py5tYXNrYURhdGEgPz8ge30gfSkuZ2V0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZT8uZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRtYXNrRGV0YWlsRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmRGaWVsZHMoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgcmVzcG9uc2UuZGF0YSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVmYXVsdC5tYXNrYURhdGEgPSBVdGlscy5EZWVwQ2xvbmUocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHRGxnLmFsZXJ0KFwianJlczozNTEwMDA0OVwiKTsgLy9SQyAzNTEwMDA0OSA6IE5lcG9kYcWZaWxvIHNlIHVsb8W+aXQgZGF0YSBkbyBkYXRhYsOhemUuIFbDrWNlIGluZm9ybWFjw60gdiBsb2d1LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9hd2FpdCB0aGlzLnVwc2VydE1hc2tEZXRhaWwoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChleCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOZXBvZGHFmWlsbyBzZSB1bG/Fvml0IHptxJtueSBkbyBkYXRhYsOhemUuXCIsIGV4KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vICNyZWdpb24gVnl0dm/FmWVuw60gbWVudVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZw60gbWVudSBwcm8gdGVudG8ga29udGVudC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgYnVpbGRNZW51KCk6IHZvaWQge1xyXG4gICAgICAgICAgICAvLyB2eXR2b8WZw60gcGFyYW1ldHJ5IHBybyBtYWluIG1lbnVcclxuICAgICAgICAgICAgY29uc3QgbWFpbk1lbnVQYXJhbXM6IE1lbnVQYXJhbXNbXSA9IHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9uc1t0aGlzLmFjdGlvbk5hbWVzLmVkaXRdLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9uc1t0aGlzLmFjdGlvbk5hbWVzLnNhdmVdLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9uc1t0aGlzLmFjdGlvbk5hbWVzLmVuZEVkaXRdLCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgLy8gdnl0dm/FmcOtIHBhcmFtZXRyeSBwcm8gY29tbWFuZCBiYXIgbWVudVxyXG4gICAgICAgICAgICBjb25zdCBjb21tYW5kQmFyTWVudTogTWVudVBhcmFtc1tdID0gdGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zW3RoaXMuYWN0aW9uTmFtZXMuc2F2ZUFuZENsb3NlXSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnNbdGhpcy5hY3Rpb25OYW1lcy5jbG9zZV0sIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvLyB2eXR2b8WZw60gbWVudVxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIobWFpbk1lbnVQYXJhbXMpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIoY29tbWFuZEJhck1lbnUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZaXByYXbDrSBtZW51IHBybyB6w6Fsb8W+a3UgbWFza3kuXHJcbiAgICAgICAgICogQHJldHVybnMgTWVudSBwcm8genVsb8W+a3UgZGV0YWlsdSBtYXNreS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHByZXBhcmVUYWJNZW51KCk6IE1lbnVQYXJhbXNbXSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnNbdGhpcy5hY3Rpb25OYW1lcy5uZXdEYXRhXSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnNbdGhpcy5hY3Rpb25OYW1lcy5kZWxldGVEYXRhXSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnNbdGhpcy5hY3Rpb25OYW1lcy5jb3B5RGF0YV0sIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZlpcHJhdsOtIG1lbnUgcHJvIHrDoWxvxb5rdSBwcsOhdmEuXHJcbiAgICAgICAgICogQHJldHVybnMgTWVudSBwcm8gesOhbG/Fvmt1IGRldGFpbHUgcHLDoXYuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwcmVwYXJlUmlnaHRzVGFiTWVudSgpOiBNZW51UGFyYW1zW10ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zW3RoaXMuYWN0aW9uTmFtZXMubmV3Qm9va10sIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zW3RoaXMuYWN0aW9uTmFtZXMubmV3RnVuY3Rpb25dLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9uc1t0aGlzLmFjdGlvbk5hbWVzLmRlbGV0ZVJpZ2h0XSwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaw61za8OhIHBvbGUgeiBmb3JtdWzDocWZZSBhIG5hc3RhdsOtIG1vxb5ub3N0IGVkaXRhY2UuXHJcbiAgICAgICAgICogQHBhcmFtIGZpZWxkTmFtZSBOw6F6ZXYgcG9sZS5cclxuICAgICAgICAgKiBAcGFyYW0gYWxsb3dFZGl0YXRpb24gUMWZw616bmFrLCBqZXN0bGkgamUgcG92b2xlbsOpIGVkaXRvdsOhbsOtLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2V0RmllbGRFZGl0YWJsZShmaWVsZE5hbWU6IHN0cmluZywgYWxsb3dFZGl0YXRpb246IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgZmllbGQgPSB0aGlzLmZpbmRGaWVsZHMoZmllbGROYW1lKT8uZmlyc3QoKTtcclxuICAgICAgICAgICAgZmllbGQ/LmdmaWVsZChhbGxvd0VkaXRhdGlvbiA/IFwiZW5hYmxlXCIgOiBcImRpc2FibGVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbG/FvsOtIG5hc3RhdmVuw60gbWFza3kgZG8gZGF0YWLDoXplIGEgdG8gdGFrLFxyXG4gICAgICAgICAqIMW+ZSB2ZXptZSDFmcOhZGVrIHBvIMWZw6Fka3UgZ3JpZCBhIGthxb5kw70gxZnDoWRlayB1bG/FvsOtLlxyXG4gICAgICAgICAqIEBwYXJhbSBtYXNrRGV0YWlsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBhc3luYyB1cHNlcnRNYXNrRGV0YWlsKCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIC8vIHrDrXNrw6Fuw60gZGF0IHogZ3JpZHVcclxuICAgICAgICAgICAgY29uc3QgZGF0YUdyaWQ6IEludGVyZmFjZS5HTWFza2FEZXRhaWxEdG9bXSB8IHVuZGVmaW5lZCA9IGF3YWl0IHRoaXMuX2dyaWRNYXNrVGFiQ29udGVudD8uZ2V0RGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFkYXRhR3JpZCB8fCAhdGhpcy5fZGVmYXVsdC5tYXNrYURhdGEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvLyB1bG/FvmVuw60gZGF0IG8gbmFzdGF2ZW7DrSBtYXNreVxyXG4gICAgICAgICAgICBkYXRhR3JpZC5mb3JFYWNoKGFzeW5jIChyb3c6IEludGVyZmFjZS5HTWFza2FEZXRhaWxEdG8sIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHBva3VkIG5lbsOtIHZ5cGxuxJtuw6kgaWQgbWFza3ksIHRhayBzZSBqZWRuw6EgbyB2eXR2w6HFmWVuw60gbm92w6kgbWFza3lcclxuICAgICAgICAgICAgICAgIC8vIHRvdG8gaWQgc2UgdmV6bWUgeiBkZWZhdWx0bsOtY2ggaG9kbm90IFxyXG4gICAgICAgICAgICAgICAgLy8gbWFza2EgbXVzw60gYsO9dCB1bG/FvmVuYSBwxZllZCB1bG/FvmVuw61tIGRldGFpbHUgbWFza3kgYWJ5IGl4c19tc2sgZXhpc3RvdmFsb1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyb3cuaXhzX21zaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdy5peHNfbXNrID0gdGhpcy5fZGVmYXVsdC5tYXNrYURhdGE/Lml4c19tc2s7IC8vIGl4c19tc2sgbXVzw60gYsO9dCB2eXBsbsSbbm9cclxuICAgICAgICAgICAgICAgICAgICByb3cucmFkZWsgPSBpbmRleCsrOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByYWRlayBtdXPDrSBiw710IHZ5cGxuxJtuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaXNsLk1hc2tTZXJ2aWNlLnVwc2VydERldGFpbCh7IGRhdGE6IHJvdyB9KS5nZXQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyB1bG/FvmVuw60gbm92w71jaCBob2Rub3QgZG8gZGVmYXVsdG7DrWNoIGhvZG5vdFxyXG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0Lm1hc2thRGF0YURldGFpbCA9IFV0aWxzLkRlZXBDbG9uZShkYXRhR3JpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBabm92dSBuYcSNdGUgYWt0dcOhbG7DrSBjb250ZW50IHMgYWt0dcOhbG7DrW1pIGRhdHkuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBhc3luYyByZWxvYWRDb250ZW50KCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZERhdGEodGhpcy5fZGVmYXVsdC5tYXNrYURhdGE/Lml4c19tc2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWsOtc2vDoSBha3R1w6FsbsSbIHZ5YnJhbsO9IMWZw6FkZWsgeiBncmlkdSBuYXN0YXZlbsOtIG1hc2t5LlxyXG4gICAgICAgICAqIEByZXR1cm5zIEFrdHXDoWxuxJsgdnlicmFuw70gxZnDoWRlayB6IGdyaWR1IG5hc3RhdmVuw60gbWFza3kuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRBY3RpdmVyb3dGcm9tR3JpZE1hc2tzKCk6IEludGVyZmFjZS5HTWFza2FEZXRhaWxEdG8gfCBudWxsIHtcclxuICAgICAgICAgICAgLy8gcG9rdWQgbmVuw60gZ3JpZCB2eXR2b8WZZW4sIHRhayBzZSBuaWMgbmV2cmFjw61cclxuICAgICAgICAgICAgaWYgKHRoaXMuJGdyaWRNYXNrVGFiID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIC8vIHrDrXNrw6Fuw60gYWt0dcOhbG7EmyB2eWJyYW7DqWhvIHrDoXpuYW11XHJcbiAgICAgICAgICAgIGNvbnN0IHRhYk1hc2tzOiBKUXVlcnk8SFRNTEVsZW1lbnQ+ID0gdGhpcy4kZ3JpZE1hc2tUYWIuZmluZCgnLmdncmlkJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkUm93OiBJbnRlcmZhY2UuR01hc2thRGV0YWlsRHRvID0gdGFiTWFza3MuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRSb3cgPz8gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmWlwcmF2w60gYWtjZSBwcm8gY29udGVudC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgcHJlcGFyZUFjdGlvbnMoaW5wdXQ6IEdSb25NYXNreURldGFpbElucHV0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICAvLyBha2NlIHBybyBlZGl0b3bDoW7DrSBtYXNreVxyXG4gICAgICAgICAgICAgICAgW3RoaXMuYWN0aW9uTmFtZXMuZWRpdF06IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzUxMDAwMThcIiwgIC8vUkMgMzUxMDAwMTggOiBFZGl0YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IFwibm9ybWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wZW5jaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VFbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWtjZSBwcm8gdWxvxb5lbsOtL2VkaXRhY2kgbWFza3lcclxuICAgICAgICAgICAgICAgIFt0aGlzLmFjdGlvbk5hbWVzLnNhdmVdOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDE5XCIsIC8vUkMgMzUxMDAwMTkgOiBVbG/Fvml0XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IFwibm9ybWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhd2FpdCB0aGlzLnNhdmVDaGFuZ2VzKGlucHV0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5yZWxvYWRDb250ZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBha2NlIHBybyB1a29uxI1lbsOtIGVkaXRhY2UgbWFza3lcclxuICAgICAgICAgICAgICAgIFt0aGlzLmFjdGlvbk5hbWVzLmVuZEVkaXRdOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDIwXCIsIC8vUkMgMzUxMDAwMjAgOiBVa29uxI1pdCBlZGl0YWNpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IFwibm9ybWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5yZWxvYWRDb250ZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBha2NlIHBybyB2eXR2b8WZZW7DrSBub3bDqWhvIG5hc3RhdmVuw60gbWFza3lcclxuICAgICAgICAgICAgICAgIFt0aGlzLmFjdGlvbk5hbWVzLm5ld0RhdGFdOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDIxXCIsIC8vUkMgMzUxMDAwMjEgOiBOb3bDqVxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBcIm5vcm1hbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFJvd3M6IEludGVyZmFjZS5HTWFza2FEZXRhaWxEdG9bXSA9IFV0aWxzLkRlZXBDbG9uZSh0aGlzLl9kZWZhdWx0Lm1hc2thRGF0YURldGFpbCEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3Um93OiBJbnRlcmZhY2UuR01hc2thRGV0YWlsRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX21zazogdGhpcy5fZGVmYXVsdC5tYXNrYURhdGE/Lml4c19tc2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRlazogdGhpcy5fZGVmYXVsdC5tYXNrYURhdGFEZXRhaWwhLmxlbmd0aCArIDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTsgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wUm93cz8ucHVzaChuZXdSb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ncmlkTWFza1RhYkNvbnRlbnQ/LnNldERhdGEodGVtcFJvd3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cHNlcnRNYXNrRGV0YWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBha2NlIHBybyBzbWF6w6Fuw60gbmFzdGF2ZW7DrSBtYXNreVxyXG4gICAgICAgICAgICAgICAgW3RoaXMuYWN0aW9uTmFtZXMuZGVsZXRlRGF0YV06IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzUxMDAwMTZcIiwgLy9SQyAzNTEwMDAxNiA6IE9kc3RyYW5pdFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBcIm5vcm1hbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtdHJhc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWREYXRhOiBJbnRlcmZhY2UuR01hc2thRGV0YWlsRHRvIHwgbnVsbCA9IHRoaXMuZ2V0QWN0aXZlcm93RnJvbUdyaWRNYXNrcygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5pc2wuTWFza1NlcnZpY2UuZGVsZXRlRGV0YWlsKHsgbWFza0RldGFpbFJvdzogc2VsZWN0ZWREYXRhIH0pLmdldCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlZmF1bHQubWFza2FEYXRhRGV0YWlsID0gdGhpcy5fZGVmYXVsdC5tYXNrYURhdGFEZXRhaWw/LmZpbHRlcih4ID0+IHgucmFkZWsgIT09IHNlbGVjdGVkRGF0YS5yYWRlayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ncmlkTWFza1RhYkNvbnRlbnQ/LnNldERhdGEodGhpcy5fZGVmYXVsdC5tYXNrYURhdGFEZXRhaWwhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWtjZSBwcm8ga29ww61yb3bDoW7DrSBuYXN0YXZlbsOtIG1hc2t5XHJcbiAgICAgICAgICAgICAgICBbdGhpcy5hY3Rpb25OYW1lcy5jb3B5RGF0YV06IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzUxMDAwMjJcIiwgLy9SQyAzNTEwMDAyMiA6IEtvcMOtcm92YXRcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uVmlzaWJsZTogXCJub3JtYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWNvcHlcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gesOtc2vDoW7DrSBha3R1w6FsbsSbIHZ5YnJhbsOpaG8gesOhem5hbXVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JpZEVsZW1lbnQ6IEpRdWVyeTxIVE1MRWxlbWVudD4gPSB0aGlzLiRncmlkTWFza1RhYi5maW5kKCcuZ2dyaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWREYXRhOiBJbnRlcmZhY2UuR01hc2thRGV0YWlsRHRvID0gZ3JpZEVsZW1lbnQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBzZSBwb3ZlZGxvIHZ5YnJhdCB6w6F6bmFtLCB1ZMSbbMOhIHNlIGhsdWJva8OhIGtvcGllIGEgem5vdnUgc2Ugdmxvxb7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWVwQ29weU9mU2VsZWN0ZWREYXRhOiBJbnRlcmZhY2UuR01hc2thRGV0YWlsRHRvID0gVXRpbHMuRGVlcENsb25lKHNlbGVjdGVkRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2w60gc2Ugbm92w70gxZnDoWRlaywgYWJ5IHNlIG5ldWtsw6FkYWwgbmEgc3Rlam7DvSDFmcOhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWVwQ29weU9mU2VsZWN0ZWREYXRhLnJhZGVrID0gKHRoaXMuX2RlZmF1bHQubWFza2FEYXRhRGV0YWlsID8/IFtdKS5yZWR1Y2UoKG1heCwgcikgPT4gTWF0aC5tYXgobWF4LCByPy5yYWRlayA/PyAwKSwgMCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVmYXVsdC5tYXNrYURhdGFEZXRhaWw/LnB1c2goZGVlcENvcHlPZlNlbGVjdGVkRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ3JpZE1hc2tUYWJDb250ZW50Py5zZXREYXRhKHRoaXMuX2RlZmF1bHQubWFza2FEYXRhRGV0YWlsISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwc2VydE1hc2tEZXRhaWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWtjZSBwcm8gdWxvxb5lbsOtIGEgemF2xZllbsOtIGtvbnRlbnR1XHJcbiAgICAgICAgICAgICAgICBbdGhpcy5hY3Rpb25OYW1lcy5zYXZlQW5kQ2xvc2VdOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDI0XCIsIC8vUkMgMzUxMDAwMjQgOiBVbG/Fvml0IGEgemF2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uVmlzaWJsZTogXCJub3JtYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLWJ1dHRvbi0tcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBrZHnFviBzZSDDunNwxJvFoW7EmyB1bG/FvsOtIGRhdGEsIGNvbnRlbnQgc2UgemF2xZllXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQ6IGJvb2xlYW4gPSBhd2FpdCB0aGlzLnNhdmVDaGFuZ2VzKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWtjZSBwcm8gemF2xZllbsOtIGtvbnRlbnR1XHJcbiAgICAgICAgICAgICAgICBbdGhpcy5hY3Rpb25OYW1lcy5jbG9zZV06XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oUHJlZmFicy5BY3Rpb25zLlphdnJpdENvbnRlbnQoKSksXHJcblxyXG4gICAgICAgICAgICAgICAgLy8jcmVnaW9uIEFrY2UgcHJvIHByw6FjaSBzIHByw6F2eVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBha2NlIHBybyBwxZlpZMOhbsOtIG5vdsOpIGtuaWh5XHJcbiAgICAgICAgICAgICAgICBbdGhpcy5hY3Rpb25OYW1lcy5uZXdCb29rXToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTEwMDA0NVwiLCAvL1JDIDM1MTAwMDQ1IDogTm92w6Ega25paGFcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uVmlzaWJsZTogXCJub3JtYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBha2NlIHBybyBwxZlpZMOhbsOtIG5vdsOpIGZ1bmtjZVxyXG4gICAgICAgICAgICAgICAgW3RoaXMuYWN0aW9uTmFtZXMubmV3RnVuY3Rpb25dOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDQ0XCIsIC8vUkMgMzUxMDAwNDQgOiBOb3bDoSBmdW5rY2VcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uVmlzaWJsZTogXCJub3JtYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBha2NlIHBybyBvZHN0cmFuxJtuw60gcHLDoXZcclxuICAgICAgICAgICAgICAgIFt0aGlzLmFjdGlvbk5hbWVzLmRlbGV0ZVJpZ2h0XToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTEwMDAzNFwiLCAvL1JDIDM1MTAwMDM0IDogT2RzdHJhbml0XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IFwibm9ybWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS10cmFzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5Sb24uRGlhbG9ncyB7XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdSb25OYWtsYWRvdmVaYXpuYW15UlRORGxnKGlucHV0OiBHdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPFdlYkNvbnRyb2xzLkdSb25OYWtsYWRvdmVaYXpuYW15UlROSW5wdXQgfCB1bmRlZmluZWQ+KVxyXG4gICAgICAgIDogSlF1ZXJ5LlByb21pc2U8V2ViQ29udHJvbHMuR1Jvbk5ha2xhZG92ZVphem5hbXlSVE5PdXRwdXQgfCB1bmRlZmluZWQ+IHtcclxuXHJcbiAgICAgICAgLy8ga3ZsaSB1xb5pdmF0ZWxza8OpbXUgbmFzdGF2ZW7DrSwgSUQgY29udGVudHVcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gJC5leHRlbmQoe30sIGlucHV0Lm9wdCwge1xyXG4gICAgICAgICAgICBJRDogJ0dSb25OYWtsYWRvdmVaYXpuYW15UlROIydcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coaW5wdXQ/Lk1vZE90ZXZyZW5pKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEd1aS5EaWFsb2dzLl9vcGVuRGlhbG9nMihpbnB1dD8ucGFyZW50Q29udGVudCwgV2ViQ29udHJvbHMuR1Jvbk5ha2xhZG92ZVphem5hbXlSVE4sIGlucHV0Py5Nb2RPdGV2cmVuaSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLlJvbi5XZWJDb250cm9scyB7XHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVnNwdXRuw60gcGFyYW1ldHJ5IGNvbnRlbnR1LlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdSb25OYWtsYWRvdmVaYXpuYW15UlROSW5wdXQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFbDvXN0dXAgeiBjb250ZW50dS5cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHUm9uTmFrbGFkb3ZlWmF6bmFteVJUTk91dHB1dCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGxhdm7DrSB0xZnDrWRhIGNvbnRlbnR1LlxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUm9uTmFrbGFkb3ZlWmF6bmFteVJUTiBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcbiAgICAgICAgdGl0bGUgPSBcImpyZXM6MzUxMDAwMDVcIjsgLy9SQyAzNTEwMDAwNSA6IE7DoWtsYWRvdsOpIHrDoXpuYW15IFJUTlxyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0TmFrbGFkb3ZlWmF6bmFteVJUTlwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gaW5wdXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcHJlcGFyZUNvbnRlbnQoaW5wdXQ/OiBHUm9uTmFrbGFkb3ZlWmF6bmFteVJUTklucHV0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiTmFrbGFkb3ZlWmF6bmFteVJUTlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLlJvbi5EaWFsb2dzIHtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR1JvblByZWRhbmlEbGcoaW5wdXQ6IEd1aS5EaWFsb2dzLk9wZW5EaWFsb2dQYXJhbXM8V2ViQ29udHJvbHMuR1JvblByZWRhbmlJbnB1dCB8IHVuZGVmaW5lZD4pXHJcbiAgICAgICAgOiBKUXVlcnkuUHJvbWlzZTxXZWJDb250cm9scy5HUm9uUHJlZGFuaU91dHB1dCB8IHVuZGVmaW5lZD4ge1xyXG5cclxuICAgICAgICAvLyBrdmxpIHXFvml2YXRlbHNrw6ltdSBuYXN0YXZlbsOtLCBJRCBjb250ZW50dVxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgaW5wdXQub3B0LCB7XHJcbiAgICAgICAgICAgIElEOiAnR1JvblByZWRhbmkjJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhpbnB1dD8uTW9kT3RldnJlbmkpO1xyXG5cclxuICAgICAgICByZXR1cm4gR3VpLkRpYWxvZ3MuX29wZW5EaWFsb2cyKGlucHV0Py5wYXJlbnRDb250ZW50LCBXZWJDb250cm9scy5HUm9uUHJlZGFuaSwgaW5wdXQ/Lk1vZE90ZXZyZW5pLCBvcHRpb25zKTtcclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuUm9uLldlYkNvbnRyb2xzIHtcclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWc3B1dG7DrSBwYXJhbWV0cnkgY29udGVudHUuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1JvblByZWRhbmlJbnB1dCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVsO9c3R1cCB6IGNvbnRlbnR1LlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdSb25QcmVkYW5pT3V0cHV0IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIbGF2bsOtIHTFmcOtZGEgY29udGVudHUuXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdSb25QcmVkYW5pIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDbGllbnRDb250ZW50IHtcclxuICAgICAgICB0aXRsZSA9IFwianJlczozNTEwMDAwNlwiOyAvL1JDIDM1MTAwMDA2IDogUMWZZWTDoW7DrVxyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0UHJlZGFuaVwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gaW5wdXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcHJlcGFyZUNvbnRlbnQoaW5wdXQ/OiBHUm9uUHJlZGFuaUlucHV0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiUHJlZGFuaVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLlJvbi5EaWFsb2dzIHtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR1JvblB1bXB5RGxnKGlucHV0OiBHdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPFdlYkNvbnRyb2xzLkdSb25QdW1weUlucHV0IHwgdW5kZWZpbmVkPilcclxuICAgICAgICA6IEpRdWVyeS5Qcm9taXNlPFdlYkNvbnRyb2xzLkdSb25QdW1weU91dHB1dCB8IHVuZGVmaW5lZD4ge1xyXG5cclxuICAgICAgICAvLyBrdmxpIHXFvml2YXRlbHNrw6ltdSBuYXN0YXZlbsOtLCBJRCBjb250ZW50dVxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgaW5wdXQub3B0LCB7XHJcbiAgICAgICAgICAgIElEOiAnR1JvblB1bXB5IydcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coaW5wdXQ/Lk1vZE90ZXZyZW5pKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEd1aS5EaWFsb2dzLl9vcGVuRGlhbG9nMihpbnB1dD8ucGFyZW50Q29udGVudCwgV2ViQ29udHJvbHMuR1JvblB1bXB5LCBpbnB1dD8uTW9kT3RldnJlbmksIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5Sb24uV2ViQ29udHJvbHMge1xyXG4gICAgY29uc3QgeyBnY29udGVudCB9ID0gRGVjb3JhdG9ycztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZzcHV0bsOtIHBhcmFtZXRyeSBjb250ZW50dS5cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHUm9uUHVtcHlJbnB1dCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVsO9c3R1cCB6IGNvbnRlbnR1LlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdSb25QdW1weU91dHB1dCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGxhdm7DrSB0xZnDrWRhIGNvbnRlbnR1LlxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUm9uUHVtcHkgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG4gICAgICAgIHRpdGxlID0gXCJqcmVzOjM1MTAwMDA3XCI7IC8vUkMgMzUxMDAwMDcgOiBQdW1weVxyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0UHVtcHlcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGlucHV0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHByZXBhcmVDb250ZW50KGlucHV0PzogR1JvblB1bXB5SW5wdXQpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJQdW1weVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLlJvbi5EaWFsb2dzIHtcclxuICAgIC8qKlxyXG4gICAgICogRGlhbG9nIHBybyB2w71ixJtyIHJvenBpc8WvLlxyXG4gICAgICogQHBhcmFtIGlucHV0IFZzdHVwbsOtIHBhcmFtZXRyeSBkaWFsb2d1LlxyXG4gICAgICogQHJldHVybnMgUHJvbWlzZSBzIHbDvXN0dXBuw61taSBkYXR5LlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR1JvblJvenBpc3lEbGcoaW5wdXQ6IEd1aS5EaWFsb2dzLk9wZW5EaWFsb2dQYXJhbXM8V2ViQ29udHJvbHMuR1JvblJvenBpc3lJbnB1dCB8IHVuZGVmaW5lZD4pXHJcbiAgICAgICAgOiBKUXVlcnkuUHJvbWlzZTxXZWJDb250cm9scy5HUm9uUm96cGlzeU91dHB1dCB8IHVuZGVmaW5lZD4ge1xyXG5cclxuICAgICAgICAvLyBrdmxpIHXFvml2YXRlbHNrw6ltdSBuYXN0YXZlbsOtLCBJRCBjb250ZW50dVxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgaW5wdXQub3B0LCB7XHJcbiAgICAgICAgICAgIElEOiAnR1JvblJvenBpc3kjJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gR3VpLkRpYWxvZ3MuX29wZW5EaWFsb2cyKGlucHV0Py5wYXJlbnRDb250ZW50LCBXZWJDb250cm9scy5HUm9uUm96cGlzeSBhcyBhbnksIGlucHV0Py5Nb2RPdGV2cmVuaSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaWFsb2cgcHJvIGRldGFpbCByb3pwaXN1LlxyXG4gICAgICogQHBhcmFtIGlucHV0IFZzdHVwbsOtIHBhcmFtZXRyeSBkaWFsb2d1LlxyXG4gICAgICogQHJldHVybnMgUHJvbWlzZSBzIHbDvXN0dXBuw61taSBkYXR5LlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR1JvblJvenBpc3lEZXRhaWxEbGcoaW5wdXQ6IEd1aS5EaWFsb2dzLk9wZW5EaWFsb2dQYXJhbXM8V2ViQ29udHJvbHMuR1JvblJvenBpc3lEZXRhaWxJbnB1dCB8IHVuZGVmaW5lZD4pXHJcbiAgICAgICAgOiBKUXVlcnkuUHJvbWlzZTxXZWJDb250cm9scy5HUm9uUm96cGlzeURldGFpbE91dHB1dCB8IHVuZGVmaW5lZD4ge1xyXG5cclxuICAgICAgICAvLyBrdmxpIHXFvml2YXRlbHNrw6ltdSBuYXN0YXZlbsOtLCBJRCBjb250ZW50dVxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgaW5wdXQub3B0LCB7XHJcbiAgICAgICAgICAgIElEOiAnR1JvblJvenBpc3lEZXRhaWwjJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gR3VpLkRpYWxvZ3MuX29wZW5EaWFsb2cyKGlucHV0Py5wYXJlbnRDb250ZW50LCBXZWJDb250cm9scy5HUm9uUm96cGlzeURldGFpbCBhcyBhbnksIGlucHV0Py5Nb2RPdGV2cmVuaSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLlJvbi5XZWJDb250cm9scyB7XHJcbiAgICAvLyAjcmVnaW9uIFZzdHVwbsOtL3bDvXN0dXBuw60gcm96aHJhbsOtLlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVnNwdXRuw60gcGFyYW1ldHJ5IGNvbnRlbnR1LlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdSb25Sb3pwaXN5SW5wdXQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFbDvXN0dXAgeiBjb250ZW50dS5cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHUm9uUm96cGlzeU91dHB1dCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vICNlbmRyZWdpb25cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhsYXZuw60gdMWZw61kYSBjb250ZW50dS5cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEdSb25Sb3pwaXN5IGV4dGVuZHMgR1JvbkRpYWxvZ0Jhc2U8R1JvblJvenBpc3lJbnB1dCwgR1JvblJvenBpc3lPdXRwdXQ+IHtcclxuICAgICAgICB0YXNrSWQgPSBcImFjdFJvenBpc3lcIjtcclxuICAgICAgICB0aXRsZSA9IFwianJlczozNTEwMDAwOFwiOyAvL1JDIDM1MTAwMDA4IDogUm96cGlzeVxyXG5cclxuICAgICAgICAvLyBkcsW+w60gaW5zdGFuY2kgZ3JpZHUgcyByb3pwaXN5XHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIC8vIHZpZXcgcHJvIGdyaWQgcyByb3pwaXN5XHJcbiAgICAgICAgcHJpdmF0ZSAkaXNsVmlldzogR29yZGljLklzbC5WaWV3PEludGVyZmFjZS5HUm96cGlzRHRvPjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBWeXR2b8WZw60gb2JzYWggY29udGVudHUuXHJcbiAgICAgICAgKiBAcGFyYW0gaW5wdXQgVnN0dXBuw60gcGFyYW1ldHJ5IGNvbnRlbnR1LlxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGFzeW5jIGJ1aWxkQ29udGVudChpbnB1dDogR1JvblJvenBpc3lJbnB1dCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICB0aGlzLiRncmlkID0gJC5uZXdEaXYoXCJncmlkXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEludGVyZmFjZS5HUm96cGlzRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb3pwaXNHcmlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy4kaXNsVmlldyA9IG5ldyBHb3JkaWMuSXNsLlZpZXc8SW50ZXJmYWNlLkdSb3pwaXNEdG8+KHRoaXMuaXNsLlJvenBpc1NlcnZpY2UubGlzdCgpLCB7fSksXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5TWVzc2FnZTogXCJqcmVzOjM1MTAwMDUxXCIsIC8vUkMgMzUxMDAwNTEgOiBOZWpzb3UgbmFkZWZpbm92YW7DqSDFvsOhZG7DqSByb3pwaXN5XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhpcy5hY3Rpb25zW3RoaXMuYWN0aW9uTmFtZXMuZGV0YWlsXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmcOtIG1lbnUgcHJvIHRlbnRvIGNvbnRlbnQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGJ1aWxkTWVudSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy8gbmHEjXRlbsOtIHBvbG/FvmVrIGhsYXZuw61obyBtZW51XHJcbiAgICAgICAgICAgIGNvbnN0IG1haW5NZW51OiBNZW51UGFyYW1zW10gPSB0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnNbdGhpcy5hY3Rpb25OYW1lcy5kZXRhaWxdLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9uc1t0aGlzLmFjdGlvbk5hbWVzLm5ld10sIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zW3RoaXMuYWN0aW9uTmFtZXMuZGVsZXRlXSwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZ5dHZvxZllbsOtIGhsYXZuw61obyBtZW51XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihtYWluTWVudSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZlpcHJhdsOtIGFrY2UgcHJvIGNvbnRlbnQuXHJcbiAgICAgICAgICogQHBhcmFtIGlucHV0IFZzdHVwbsOtIHBhcmFtZXRyeSBjb250ZW50dS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgcHJlcGFyZUFjdGlvbnMoaW5wdXQ6IEdSb25Sb3pwaXN5SW5wdXQpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIC8vIGFrY2UgcHJvIHZ5dHZvxZllbsOtIG5vdsOpaG8gcm96cGlzdVxyXG4gICAgICAgICAgICAgICAgW3RoaXMuYWN0aW9uTmFtZXMubmV3XToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuYWN0aW9uTmFtZXMubmV3LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTEwMDA1MFwiLCAvL1JDIDM1MTAwMDUwIDogTm92w70gcm96cGlzXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IFwibm9ybWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRldGFpbERpYWxvZyhcImpyZXM6MzUxMDAwNTNcIik7IC8vUkMgMzUxMDAwNTMgOiBOb3bDvSByb3pwaXNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFrY2UgcHJvIHpvYnJhemVuw60gZGV0YWlsdSByb3pwaXN1XHJcbiAgICAgICAgICAgICAgICBbdGhpcy5hY3Rpb25OYW1lcy5kZXRhaWxdOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5hY3Rpb25OYW1lcy5kZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDE1XCIsIC8vUkMgMzUxMDAwMTUgOiBEZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uVmlzaWJsZTogXCJub3JtYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVSb3c6IEludGVyZmFjZS5HUm96cGlzRHRvID0gdGhpcy4kZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRGV0YWlsRGlhbG9nKFwianJlczozNTEwMDA1MlwiLCBhY3RpdmVSb3cpOyAvL1JDIDM1MTAwMDUyIDogRGV0YWlsIHJvenBpc3VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFrY2UgcHJvIHNtYXrDoW7DrSBkZXRhaWx1IHJvenBpc3VcclxuICAgICAgICAgICAgICAgIFt0aGlzLmFjdGlvbk5hbWVzLmRlbGV0ZV06IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmFjdGlvbk5hbWVzLmRlbGV0ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzUxMDAwMTZcIiwgLy9SQyAzNTEwMDAxNiA6IE9kc3RyYW5pdFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBcIm5vcm1hbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtdHJhc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICNyZWdpb24gUHJpdmF0ZSBtZXRvZHlcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJ2b3Ruw60gdnl0dm/FmWVuw60gZm9ybcOhdHUgZ3JpZHUuXHJcbiAgICAgICAgICogQHJldHVybnMgRm9ybcOhdCBncmlkdS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR0dyaWRDb2x1bW48SW50ZXJmYWNlLkdSb3pwaXNEdG8+W10gfCBEYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdSb3pwaXNEdG8+IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HUm96cGlzRHRvPigpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTEwMDAzN1wiIC8vUkMgMzUxMDAwMzcgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZnVuX2FrdF9yZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTEwMDAzOFwiIC8vUkMgMzUxMDAwMzggOiBWbGFzdG7DrWtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTEwMDAzOVwiIC8vUkMgMzUxMDAwMzkgOiBQb3puw6Fta2FcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcmF2YV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzUxMDAwNDBcIiAvL1JDIDM1MTAwMDQwIDogUHLDoXZhXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTEwMDA0MVwiIC8vUkMgMzUxMDAwNDEgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6bWVudV9wcm92X3JmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDQyXCIgLy9SQyAzNTEwMDA0MiA6IFptxJtudSBwcm92ZWRsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE90ZXbFmWUgZGV0YWlsIHJvenBpc3UuXHJcbiAgICAgICAgICogQHBhcmFtIHRpdGxlIE7DoXpldiBva25hIGRldGFpbHUuXHJcbiAgICAgICAgICogQHBhcmFtIHNlbGVjdGVkUm93IMWYw6FkZWsgcm96cGlzdSwga3RlcsO9IHNlIG3DoSB6b2JyYXppdCB2IGRldGFpbHUgKHBva3VkIGplIHVuZGVmaW5lZCwgamVkbsOhIHNlIG8gbm92w70gcm96cGlzKS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGFzeW5jIG9wZW5EZXRhaWxEaWFsb2codGl0bGU6IHN0cmluZywgc2VsZWN0ZWRSb3c/OiBJbnRlcmZhY2UuR1JvenBpc0R0byk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBEaWFsb2dzLkdSb25Sb3pwaXN5RGV0YWlsRGxnKHtcclxuICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBNb2RPdGV2cmVuaTogR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLm5hdmlnYXRlLFxyXG4gICAgICAgICAgICAgICAgb3B0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudFRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICByb3pwaXNEYXRhOiBzZWxlY3RlZFJvd1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHBva3VkIGplIHbDvXN0dXAgeiBkZXRhaWx1IGRlZmlub3bDoW4gYSBqZSB6bcSbbsSbbiwgYWt0dWFsaXp1amUgc2UgZ3JpZFxyXG4gICAgICAgICAgICBpZiAocmVzdWx0Py5pc0NoYW5nZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpc2xWaWV3LnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICNlbmRyZWdpb25cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuUm9uLldlYkNvbnRyb2xzIHtcclxuICAgIC8vICNyZWdpb24gVnN0dXBuw60vdsO9c3R1cG7DrSByb3pocmFuw60uXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWc3B1dG7DrSBwYXJhbWV0cnkgY29udGVudHUuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1JvblJvenBpc3lEZXRhaWxJbnB1dCB7XHJcbiAgICAgICAgLy8gdGl0dWxlayBjb250ZW50dVxyXG4gICAgICAgIGNvbnRlbnRUaXRsZTogc3RyaW5nO1xyXG4gICAgICAgIC8vIGRhdGEgcm96cGlzdSwgcG9rdWQgamUgbnVsbHx1bmRlZmluZWQsIGplZG7DoSBzZSBvIG5vdsO9IHrDoXpuYW1cclxuICAgICAgICByb3pwaXNEYXRhPzogSW50ZXJmYWNlLkdSb3pwaXNEdG8gfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVsO9c3R1cCB6IGNvbnRlbnR1LlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdSb25Sb3pwaXN5RGV0YWlsT3V0cHV0IHtcclxuICAgICAgICAvLyBpbmZvcm1hY2UsIHpkYSBkb8WhbG8ga2Ugem3Em27EmyBkYXQgdiByw6FtY2kgY29udGVudHVcclxuICAgICAgICBpc0NoYW5nZWQ6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGxhdm7DrSB0xZnDrWRhIGNvbnRlbnR1LlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR1JvblJvenBpc3lEZXRhaWwgZXh0ZW5kcyBHUm9uRGlhbG9nQmFzZTxHUm9uUm96cGlzeURldGFpbElucHV0LCBHUm9uUm96cGlzeURldGFpbE91dHB1dD4ge1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0Um96cGlzeURldGFpbFwiO1xyXG5cclxuICAgICAgICBwcml2YXRlICRyb3pwaXNEZXRhaWxGb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICAvLyBpbmZvcm1hY2UsIHpkYSBzZSBqZWRuw6EgbyBub3bDvSB6w6F6bmFtXHJcbiAgICAgICAgcHJpdmF0ZSBfaXNOZXc6IGJvb2xlYW47XHJcbiAgICAgICAgLy8gZHLFvsOtIHDFr3ZvZG7DrSBob2Rub3R5IHDFmWVkYW7DvWNoIHBhcmFtZXRyxa9cclxuICAgICAgICBwcml2YXRlIF9kZWZhdWx0OiBHUm9uUm96cGlzeURldGFpbElucHV0O1xyXG5cclxuICAgICAgICAvLyAjcmVnaW9uIEltcGxlbWVudGFjZSBhYnN0cmFrdG7DrSB0xZnDrWR5IEdCYXNlQ29udGVudFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYXZvbMOhbm8gcMWZZWQgc2Ftb3Rub3Ugc3RhdmJvdSBjb250ZW50dS5cclxuICAgICAgICAgKiBAcGFyYW0gaW5wdXQgVnN0dXBuw60gcGFyYW1ldHJ5IGNvbnRlbnR1LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBhc3luYyBiZWZvcmVCdWlsZENvbnRlbnQoaW5wdXQ6IEdSb25Sb3pwaXN5RGV0YWlsSW5wdXQpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgaWYgKCFpbnB1dClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImpyZXM6MzUxMDAwMTdcIik7IC8vUkMgMzUxMDAwMTcgOiBOZWJ5bHkgcMWZZWTDoW55IHZzdHVwbsOtIHBhcmFtZXRyeS5cclxuXHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gdGl0dWxrdSBva25hXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSB0aGlzLnByZXBhcmVDb250ZW50VGl0bGUoaW5wdXQuY29udGVudFRpdGxlLCBpbnB1dC5yb3pwaXNEYXRhPy5uYXpldik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeWtyZXNsw60gb2JzYWggY29udGVudHUuXHJcbiAgICAgICAgICogUG9jaMOhesOtIHogR1JvbkRpYWxvZ0Jhc2UsIGtkZSBqZSBkZWtsYXJvdsOhbiBqYWtvIGFic3RyYWt0bsOtLlxyXG4gICAgICAgICAqIEBwYXJhbSBpbnB1dFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGFzeW5jIGJ1aWxkQ29udGVudChpbnB1dDogR1JvblJvenBpc3lEZXRhaWxJbnB1dCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0ID0gVXRpbHMuRGVlcENsb25lKGlucHV0KTtcclxuICAgICAgICAgICAgdGhpcy5faXNOZXcgPSAhaW5wdXQucm96cGlzRGF0YTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxPd25lckZ1bjogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCA9ICh0aGlzLl9pc05ldykgPyBhd2FpdCBnZXRBY3R1YWxVc2VyKHRoaXMpIDogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKGluaXRpYWxPd25lckZ1bik7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWREYXRhKGlucHV0Py5yb3pwaXNEYXRhPy5peHNfcnBzKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5hbGxvd0VkaXRhdGlvbih0aGlzLl9pc05ldyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYXZvbMOhbm8gcG8gdnl0dm/FmWVuw60gY29udGVudHUuXHJcbiAgICAgICAgICogQHBhcmFtIGlucHV0IFZzdHVwbsOtIHBhcmFtZXRyeSBjb250ZW50dS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgYXN5bmMgYWZ0ZXJCdWlsZENvbnRlbnQoaW5wdXQ6IEdSb25Sb3pwaXN5RGV0YWlsSW5wdXQpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkVmFsaWRhdG9ycygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGlucHV0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHByZXBhcmVBY3Rpb25zKGlucHV0OiBHUm9uUm96cGlzeURldGFpbElucHV0KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICAvLyBha2NlIHBybyBlZGl0b3bDoW7DrSByb3pwaXN1XHJcbiAgICAgICAgICAgICAgICBbdGhpcy5hY3Rpb25OYW1lcy5lZGl0XToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTEwMDAxOFwiLCAgLy9SQyAzNTEwMDAxOCA6IEVkaXRhY2VcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uVmlzaWJsZTogXCJub3JtYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBlbmNpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbG93RWRpdGF0aW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWtjZSBwcm8gdWxvxb5lbsOtL2VkaXRhY2kgcm96cGlzdVxyXG4gICAgICAgICAgICAgICAgW3RoaXMuYWN0aW9uTmFtZXMuc2F2ZV06IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzUxMDAwMTlcIiwgLy9SQyAzNTEwMDAxOSA6IFVsb8W+aXRcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uVmlzaWJsZTogXCJub3JtYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF3YWl0IHRoaXMuc2F2ZUNoYW5nZXMoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnJlbG9hZENvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsb3dFZGl0YXRpb24oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBha2NlIHBybyB1a29uxI1lbsOtIGVkaXRhY2Ugcm96cGlzdVxyXG4gICAgICAgICAgICAgICAgW3RoaXMuYWN0aW9uTmFtZXMuZW5kRWRpdF06IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzUxMDAwMjBcIiwgLy9SQyAzNTEwMDAyMCA6IFVrb27EjWl0IGVkaXRhY2lcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uVmlzaWJsZTogXCJub3JtYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnJlbG9hZENvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxvd0VkaXRhdGlvbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBha2NlIHBybyB6YXbFmWVuw60ga29udGVudHVcclxuICAgICAgICAgICAgICAgIFt0aGlzLmFjdGlvbk5hbWVzLmNsb3NlXTpcclxuICAgICAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbihQcmVmYWJzLkFjdGlvbnMuWmF2cml0Q29udGVudCgpKSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBha2NlIHBybyB1bG/FvmVuw60gYSB6YXbFmWVuw60ga29udGVudHVcclxuICAgICAgICAgICAgICAgIFt0aGlzLmFjdGlvbk5hbWVzLnNhdmVBbmRDbG9zZV06IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzUxMDAwMjRcIiwgLy9SQyAzNTEwMDAyNCA6IFVsb8W+aXQgYSB6YXbFmcOtdFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBcIm5vcm1hbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctYnV0dG9uLS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8ga2R5xb4gc2Ugw7pzcMSbxaFuxJsgdWxvxb7DrSBkYXRhLCBjb250ZW50IHNlIHphdsWZZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciByZXN1bHQ6IGJvb2xlYW4gPSBhd2FpdCB0aGlzLnNhdmVDaGFuZ2VzKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGlzLnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZaXByYXbDrSBtZW51IHYgY29udGVudHUuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGJ1aWxkTWVudSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgbWFpbk1lbnVQYXJhbXM6IE1lbnVQYXJhbXNbXSA9IHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9uc1t0aGlzLmFjdGlvbk5hbWVzLmVkaXRdLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9uc1t0aGlzLmFjdGlvbk5hbWVzLnNhdmVdLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9uc1t0aGlzLmFjdGlvbk5hbWVzLmVuZEVkaXRdLCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY29tbWFuZEJhck1lbnVQYXJhbXM6IE1lbnVQYXJhbXNbXSA9IHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9uc1t0aGlzLmFjdGlvbk5hbWVzLnNhdmVBbmRDbG9zZV0sIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zW3RoaXMuYWN0aW9uTmFtZXMuY2xvc2VdLCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKG1haW5NZW51UGFyYW1zKTtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKGNvbW1hbmRCYXJNZW51UGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8gI3JlZ2lvbiBQcml2w6F0bsOtIG1ldG9keVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZlpcHJhdsOtIG7DoXpldiB0aXR1bGt1IG9rbmEuXHJcbiAgICAgICAgICogQHBhcmFtIHRpdGxlIFrDoWtsYWRuw60gbsOhemV2LlxyXG4gICAgICAgICAqIEBwYXJhbSBtYXNrTmFtZSBOw6F6ZXYgcm96cGlzdS5cclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcHJlcGFyZUNvbnRlbnRUaXRsZSh0aXRsZTogc3RyaW5nLCByb3pwaXNOYW1lPzogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiAocm96cGlzTmFtZSlcclxuICAgICAgICAgICAgICAgID8gdGl0bGUgKyBcIiAtIFwiICsgcm96cGlzTmFtZVxyXG4gICAgICAgICAgICAgICAgOiB0aXRsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSBmb3JtdWzDocWZIHBybyBlZGl0YWNpfHZ5dHZvxZllbsOtIHJvenBpc3UuXHJcbiAgICAgICAgICogQHBhcmFtIGluaXRpYWxPd25lckZ1biBQb8SNw6F0ZcSNbsOtIGhvZG5vdGEgcHJvIHZsYXN0bsOta2Egcm96cGlzdSAocMWZaSBub3bDqW0gesOhem5hbXUpLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybShpbml0aWFsT3duZXJGdW46IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy4kcm96cGlzRGV0YWlsRm9ybSA9ICQubmV3RGl2KFwicm96cGlzRGV0YWlsRm9ybVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGhpcy5wcmVwYXJlRm9ybShpbml0aWFsT3duZXJGdW4pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmWlwcmF2w60gZm9ybXVsw6HFmSBwcm8gZWRpdGFjaXx2eXR2b8WZZW7DrSByb3pwaXN1LlxyXG4gICAgICAgICAqIEBwYXJhbSBpbml0aWFsT3duZXJGdW4gUG/EjcOhdGXEjW7DrSBob2Rub3RhIHBybyB2bGFzdG7DrWthIHJvenBpc3UgKHDFmWkgbm92w6ltIHrDoXpuYW11KS5cclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcHJlcGFyZUZvcm0oaW5pdGlhbE93bmVyRnVuPzogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwicm96cGlzRGV0YWlsRm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzUxMDAwNTRcIikgLy9SQyAzNTEwMDA1NCA6IEluZm9ybWFjZSBvIHJvenBpc3VcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1MTAwMDU1XCIpLmFkZEZpZWxkKCAvL1JDIDM1MTAwMDU1IDogRsOhemVcclxuICAgICAgICAgICAgICAgICAgICBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAvL1ByZWZhYnMuU2VsZWN0LmNudHNmYXooKSxcclxuICAgICAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImZhelwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG1vZGVsOiBcIm1vZGVsLmZhej12YWx1ZS5mYXpcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpbml0aWFsVmFsdWU6IHRoaXMuX2lzTmV3ID8gXCJibGFjaG1cIiA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBjaGFuZ2U6IChldiwgbWV0YSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzUxMDAwMjlcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJuYXpldlwiIH0pIC8vUkMgMzUxMDAwMjkgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1MTAwMDMwXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG96bmFta2FcIiB9KSAvL1JDIDM1MTAwMDMwIDogUG96bsOhbWthXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjM1MTAwMDMxXCIpIC8vUkMgMzUxMDAwMzEgOiBabcSbbmFcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1MTAwMDU2XCIpLmFkZEZpZWxkKCAvL1JDIDM1MTAwMDU2IDogVmxhc3Ruw61rIHJvenBpc3VcclxuICAgICAgICAgICAgICAgICAgICBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBQcmVmYWJzLlNlbGVjdC5naW5zZnVuKCksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5fYWt0X3JmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19mdW5fYWt0PXZhbHVlLml4c19mdW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBpbml0aWFsT3duZXJGdW4gPyB7IGl4c19mdW46IGluaXRpYWxPd25lckZ1biB9IDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1MTAwMDMyXCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF96bWVuYVwiLCBkaXNhYmxlZDogdHJ1ZSwgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIgfSkgLy9SQyAzNTEwMDAzMiA6IERhdHVtIHptxJtueVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzUxMDAwMzNcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJ6bWVudV9wcm92X3JmXCIsIGRpc2FibGVkOiB0cnVlIH0pIC8vUkMgMzUxMDAwMzMgOiBabcSbbnUgcHJvdmVkbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG9rdWRlIHNlIG5lamVkbsOhIG8gbm92w70gesOhem5hbSwgbmHEjXRlIGRhdGEgcm96cGlzdSBhIGFwbGlrdWplIGplIGRvIGZvcm11bMOhxZllLlxyXG4gICAgICAgICAqIEBwYXJhbSBpeHNfcnBzIElkZW50aWZpa8OhdG9yIHJvenBpc3UuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBhc3luYyBsb2FkRGF0YShpeHNfcnBzPzogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lzTmV3KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByb3pwaXNEYXRhID0gYXdhaXQgdGhpcy5pc2wuUm96cGlzU2VydmljZS5yZWFkKHsgaXhzX3JwczogaXhzX3JwcyEgfSkuZ2V0RGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvenBpc0RldGFpbEZvcm1cclxuICAgICAgICAgICAgICAgICAgICAuZmluZEZpZWxkcygpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgcm96cGlzRGF0YSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBc3luY2hyb27DrSBuYcSNdGVuw60gdmFsaWTDoXRvcsWvLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgYXN5bmMgbG9hZFZhbGlkYXRvcnMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlcnZlciA9IHRoaXMuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuUm9uLldlYkNvbnRyb2xzLkdSb25VdGlsc1wiKTtcclxuICAgICAgICAgICAgY29uc3QgdmFsaWRhdG9yID0gYXdhaXQgc2VydmVyLmNhbGwoXCJHZXRWYWxpZGF0b3JzQnlUeXBlXCIsIHsgdHlwZU5hbWU6IFwiR29yZGljLlJvbi5JbnRlcmZhY2UuR1JvenBpc0R0b1wiIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdmFsaWRhdG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFptxJtuw60gdmxhc3Rub3N0aSBlbmFibGVkIHUgdnlicmF6bsO9Y2ggcHJ2a8WvLFxyXG4gICAgICAgICAqIHBvZGxlIHRvaG8sIGplc3RsaSBqZSBwb3ZvbGVuYSBlZGl0YWNlLCDEjWkgbmlrb2xpdi5cclxuICAgICAgICAgKiBAcGFyYW0gYWxsb3dFZGl0YXRpb24gUMWZw616bmFrLCBqZXN0bGkgamUgcG92b2xlbsOpIGVkaXRvdsOhbsOtLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgYXN5bmMgYWxsb3dFZGl0YXRpb24oYWxsb3dFZGl0YXRpb246IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgLy8gcmVzZXR1amkgdmFsaWTDoXRvcnkgKHNjaG92w6FtIHDFmcOtcGFkbsOpIG5lw7pzcMSbY2h5KVxyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJyZXNldFZhbGlkYXRpb25zXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gw7pwdmFyYSBtZW51IGVuYWJsZWQvZGlzYWJsZWRcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW3RoaXMuYWN0aW9uTmFtZXMuZWRpdF0/LmVuYWJsZWQoIWFsbG93RWRpdGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW3RoaXMuYWN0aW9uTmFtZXMuc2F2ZV0/LmVuYWJsZWQoYWxsb3dFZGl0YXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbdGhpcy5hY3Rpb25OYW1lcy5lbmRFZGl0XT8uZW5hYmxlZChhbGxvd0VkaXRhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAvLyBwb2zDrcSNa2EgZm9ybXVsw6HFmWUgZW5hYmxlZC9kaXNhYmxlZFxyXG4gICAgICAgICAgICB0aGlzLnNldEZpZWxkRWRpdGFibGUoXCJuYXpldlwiLCBhbGxvd0VkaXRhdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RmllbGRFZGl0YWJsZShcInBvem5hbWthXCIsIGFsbG93RWRpdGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRGaWVsZEVkaXRhYmxlKFwiZmF6XCIsIGFsbG93RWRpdGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRGaWVsZEVkaXRhYmxlKFwiaXhzX2Z1bl9ha3RfcmZcIiwgYWxsb3dFZGl0YXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWsOtc2vDoSBwb2xlIHogZm9ybXVsw6HFmWUgYSBuYXN0YXbDrSBtb8W+bm9zdCBlZGl0YWNlLlxyXG4gICAgICAgICAqIEBwYXJhbSBmaWVsZE5hbWUgTsOhemV2IHBvbGUuXHJcbiAgICAgICAgICogQHBhcmFtIGFsbG93RWRpdGF0aW9uIFDFmcOtem5haywgamVzdGxpIGplIHBvdm9sZW7DqSBlZGl0b3bDoW7DrS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNldEZpZWxkRWRpdGFibGUoZmllbGROYW1lOiBzdHJpbmcsIGFsbG93RWRpdGF0aW9uOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gdGhpcy5maW5kRmllbGRzKGZpZWxkTmFtZSk/LmZpcnN0KCk7XHJcbiAgICAgICAgICAgIGZpZWxkPy5nZmllbGQoYWxsb3dFZGl0YXRpb24gPyBcImVuYWJsZVwiIDogXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm5vdnUgbmHEjXRlIGRhdGEgYWt0dcOhbG7DrWhvIHJvenBpc3UuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBhc3luYyByZWxvYWRDb250ZW50KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWREYXRhKHRoaXMuX2RlZmF1bHQucm96cGlzRGF0YT8uaXhzX3Jwcyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhc3luYyBzYXZlQ2hhbmdlcyhpbnB1dDogR1JvblJvenBpc3lEZXRhaWxJbnB1dCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwid2FpdGluZ0ZvclZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy4kcm96cGlzRGV0YWlsRm9ybS5nZm9ybShcImlzVmFsaWRcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc05ldylcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5yb3pwaXNEYXRhID0ge30gYXMgSW50ZXJmYWNlLkdSb3pwaXNEdG87XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzTmV3IHx8IHRoaXMuJHJvenBpc0RldGFpbEZvcm0uZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm96cGlzRGV0YWlsRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZEZpZWxkcygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgaW5wdXQ/LnJvenBpc0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2U6IElzbC5HU2VydmljZVNhdmVSZXNwb25zZTxJbnRlcmZhY2UuR1JvenBpc0R0bz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPSBhd2FpdCB0aGlzLmlzbC5Sb3pwaXNTZXJ2aWNlLnVwc2VydCh7IGRhdGE6IGlucHV0Py5yb3pwaXNEYXRhID8/IHt9IH0pLmdldCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2U/LmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm96cGlzRGV0YWlsRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmRGaWVsZHMoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgcmVzcG9uc2UuZGF0YSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVmYXVsdC5yb3pwaXNEYXRhID0gVXRpbHMuRGVlcENsb25lKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR0RsZy5hbGVydChcImpyZXM6MzUxMDAwNDlcIik7IC8vUkMgMzUxMDAwNDkgOiBOZXBvZGHFmWlsbyBzZSB1bG/Fvml0IGRhdGEgZG8gZGF0YWLDoXplLiBWw61jZSBpbmZvcm1hY8OtIHYgbG9ndS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChleCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOZXBvZGHFmWlsbyBzZSB1bG/Fvml0IHptxJtueSBkbyBkYXRhYsOhemUuXCIsIGV4KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLlJvbi5EaWFsb2dzIHtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR1JvblNlem5hbUtuaWhEbGcoXHJcbiAgICAgICAgaW5wdXQ6IEd1aS5EaWFsb2dzLk9wZW5EaWFsb2dQYXJhbXM8V2ViQ29udHJvbHMuR1JvblNlem5hbUtuaWhJbnB1dCB8IHVuZGVmaW5lZD5cclxuICAgICk6IEpRdWVyeS5Qcm9taXNlPFdlYkNvbnRyb2xzLkdSb25TZXpuYW1LbmloT3V0cHV0IHwgdW5kZWZpbmVkPiB7XHJcblxyXG4gICAgICAgIC8vIGt2bGkgdcW+aXZhdGVsc2vDqW11IG5hc3RhdmVuw60sIElEIGNvbnRlbnR1XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBpbnB1dC5vcHQsIHtcclxuICAgICAgICAgICAgSUQ6ICdHUm9uU2V6bmFtS25paCMnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBHdWkuRGlhbG9ncy5fb3BlbkRpYWxvZzIoaW5wdXQ/LnBhcmVudENvbnRlbnQsIFdlYkNvbnRyb2xzLkdSb25TZXpuYW1LbmloLCBpbnB1dD8uTW9kT3RldnJlbmksIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5Sb24uV2ViQ29udHJvbHMge1xyXG4gICAgY29uc3QgeyBnY29udGVudCB9ID0gRGVjb3JhdG9ycztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZzcHV0bsOtIHBhcmFtZXRyeSBjb250ZW50dS5cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHUm9uU2V6bmFtS25paElucHV0IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWw71zdHVwIHogY29udGVudHUuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1JvblNlem5hbUtuaWhPdXRwdXQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhsYXZuw60gdMWZw61kYSBjb250ZW50dS5cclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1JvblNlem5hbUtuaWggZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG4gICAgICAgIHRpdGxlID0gXCJqcmVzOjM1MTAwMDI2XCI7IC8vUkMgMzUxMDAwMjYgOiBTZXpuYW0ga25paFxyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0U2V6bmFtS25paFwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gaW5wdXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcHJlcGFyZUNvbnRlbnQoaW5wdXQ/OiBHUm9uU2V6bmFtS25paElucHV0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiU2V6bmFtS25paFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLlJvbi5EaWFsb2dzIHtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR1JvblNlem5hbVBsYW51RGxnKFxyXG4gICAgICAgIGlucHV0OiBHdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPFdlYkNvbnRyb2xzLkdSb25TZXpuYW1QbGFudUlucHV0IHwgdW5kZWZpbmVkPlxyXG4gICAgKTogSlF1ZXJ5LlByb21pc2U8V2ViQ29udHJvbHMuR1JvblNlem5hbVBsYW51T3V0cHV0IHwgdW5kZWZpbmVkPiB7XHJcblxyXG4gICAgICAgIC8vIGt2bGkgdcW+aXZhdGVsc2vDqW11IG5hc3RhdmVuw60sIElEIGNvbnRlbnR1XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBpbnB1dC5vcHQsIHtcclxuICAgICAgICAgICAgSUQ6ICdHUm9uU2V6bmFtUGxhbnUjJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gR3VpLkRpYWxvZ3MuX29wZW5EaWFsb2cyKGlucHV0Py5wYXJlbnRDb250ZW50LCBXZWJDb250cm9scy5HUm9uU2V6bmFtUGxhbnUsIGlucHV0Py5Nb2RPdGV2cmVuaSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLlJvbi5XZWJDb250cm9scyB7XHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVnNwdXRuw60gcGFyYW1ldHJ5IGNvbnRlbnR1LlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdSb25TZXpuYW1QbGFudUlucHV0IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWw71zdHVwIHogY29udGVudHUuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1JvblNlem5hbVBsYW51T3V0cHV0IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIbGF2bsOtIHTFmcOtZGEgY29udGVudHUuXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdSb25TZXpuYW1QbGFudSBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcbiAgICAgICAgdGl0bGUgPSBcImpyZXM6MzUxMDAwMDlcIjsgLy9SQyAzNTEwMDAwOSA6IFNlem5hbSBwbMOhbsWvXHJcbiAgICAgICAgdGFza0lkID0gXCJhY3RTZXpuYW1QbGFudVwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gaW5wdXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcHJlcGFyZUNvbnRlbnQoaW5wdXQ/OiBHUm9uU2V6bmFtUGxhbnVJbnB1dCkge1xyXG4gICAgICAgICAgICBhbGVydChcIlNlem5hbVBsYW51XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuUm9uLkRpYWxvZ3Mge1xyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHUm9uVHJhbnNmb3JtYWNlRGxnKGlucHV0OiBHdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPFdlYkNvbnRyb2xzLkdSb25UcmFuc2Zvcm1hY2VJbnB1dCB8IHVuZGVmaW5lZD4pXHJcbiAgICAgICAgOiBKUXVlcnkuUHJvbWlzZTxXZWJDb250cm9scy5HUm9uVHJhbnNmb3JtYWNlT3V0cHV0IHwgdW5kZWZpbmVkPiB7XHJcblxyXG4gICAgICAgIC8vIGt2bGkgdcW+aXZhdGVsc2vDqW11IG5hc3RhdmVuw60sIElEIGNvbnRlbnR1XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBpbnB1dC5vcHQsIHtcclxuICAgICAgICAgICAgSUQ6ICdHUm9uVHJhbnNmb3JtYWNlIydcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coaW5wdXQ/Lk1vZE90ZXZyZW5pKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEd1aS5EaWFsb2dzLl9vcGVuRGlhbG9nMihpbnB1dD8ucGFyZW50Q29udGVudCwgV2ViQ29udHJvbHMuR1JvblRyYW5zZm9ybWFjZSwgaW5wdXQ/Lk1vZE90ZXZyZW5pLCBvcHRpb25zKTtcclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuUm9uLldlYkNvbnRyb2xzIHtcclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWc3B1dG7DrSBwYXJhbWV0cnkgY29udGVudHUuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1JvblRyYW5zZm9ybWFjZUlucHV0IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWw71zdHVwIHogY29udGVudHUuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1JvblRyYW5zZm9ybWFjZU91dHB1dCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGxhdm7DrSB0xZnDrWRhIGNvbnRlbnR1LlxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUm9uVHJhbnNmb3JtYWNlIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDbGllbnRDb250ZW50IHtcclxuICAgICAgICB0aXRsZSA9IFwianJlczozNTEwMDAxMFwiOyAvL1JDIDM1MTAwMDEwIDogVHJhbnNmb3JtYWNlXHJcbiAgICAgICAgdGFza0lkID0gXCJhY3RUcmFuc2Zvcm1hY2VcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGlucHV0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHByZXBhcmVDb250ZW50KGlucHV0PzogR1JvblRyYW5zZm9ybWFjZUlucHV0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiVHJhbnNmb3JtYWNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuUm9uLkRpYWxvZ3Mge1xyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHUm9uVnlzbGVka3lSb3p1Y3RvdmFuaURsZyhpbnB1dDogR3VpLkRpYWxvZ3MuT3BlbkRpYWxvZ1BhcmFtczxXZWJDb250cm9scy5HUm9uVnlzbGVka3lSb3p1Y3RvdmFuaUlucHV0IHwgdW5kZWZpbmVkPilcclxuICAgICAgICA6IEpRdWVyeS5Qcm9taXNlPFdlYkNvbnRyb2xzLkdSb25WeXNsZWRreVJvenVjdG92YW5pT3V0cHV0IHwgdW5kZWZpbmVkPiB7XHJcblxyXG4gICAgICAgIC8vIGt2bGkgdcW+aXZhdGVsc2vDqW11IG5hc3RhdmVuw60sIElEIGNvbnRlbnR1XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBpbnB1dC5vcHQsIHtcclxuICAgICAgICAgICAgSUQ6ICdHUm9uVnlzbGVka3lSb3p1Y3RvdmFuaSMnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGlucHV0Py5Nb2RPdGV2cmVuaSk7XHJcblxyXG4gICAgICAgIHJldHVybiBHdWkuRGlhbG9ncy5fb3BlbkRpYWxvZzIoaW5wdXQ/LnBhcmVudENvbnRlbnQsIFdlYkNvbnRyb2xzLkdSb25WeXNsZWRreVJvenVjdG92YW5pLCBpbnB1dD8uTW9kT3RldnJlbmksIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5Sb24uV2ViQ29udHJvbHMge1xyXG4gICAgY29uc3QgeyBnY29udGVudCB9ID0gRGVjb3JhdG9ycztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZzcHV0bsOtIHBhcmFtZXRyeSBjb250ZW50dS5cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHUm9uVnlzbGVka3lSb3p1Y3RvdmFuaUlucHV0IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWw71zdHVwIHogY29udGVudHUuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1JvblZ5c2xlZGt5Um96dWN0b3ZhbmlPdXRwdXQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhsYXZuw60gdMWZw61kYSBjb250ZW50dS5cclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1JvblZ5c2xlZGt5Um96dWN0b3ZhbmkgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG4gICAgICAgIHRpdGxlID0gXCJqcmVzOjM1MTAwMDExXCI7IC8vUkMgMzUxMDAwMTEgOiBWw71zbGVka3kgcm96w7rEjXRvdsOhbsOtXHJcbiAgICAgICAgdGFza0lkID0gXCJhY3RWeXNsZWRreVJvenVjdG92YW5pXCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBpbnB1dFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBwcmVwYXJlQ29udGVudChpbnB1dD86IEdSb25WeXNsZWRreVJvenVjdG92YW5pSW5wdXQpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJWeXNsZWRreVJvenVjdG92YW5pXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuUm9uLkRpYWxvZ3Mge1xyXG4gICAgLyoqXHJcbiAgICAgKiBEaWFsb2cgcHJvIHRlc3RvdsOhbsOtIENvbnRyb2xsaW5ndS5cclxuICAgICAqIEBwYXJhbSBpbnB1dCBWc3R1cG7DrSBwYXJhbWV0cnkgZGlhbG9ndS5cclxuICAgICAqIEByZXR1cm5zIFByb21pc2UgcyB2w71zdHVwbsOtbWkgZGF0eS5cclxuICAgICovXHJcbiAgICAvL2V4cG9ydCBmdW5jdGlvbiBHQ29udHJvbGxpbmdEbGcoaW5wdXQ6IEd1aS5EaWFsb2dzLk9wZW5EaWFsb2dQYXJhbXM8RWtvLkdDb250cm9sbGluZ0lucHV0IHwgdW5kZWZpbmVkPilcclxuICAgIC8vICAgIDogSlF1ZXJ5LlByb21pc2U8RWtvLkdDb250cm9sbGluZ091dHB1dCB8IHVuZGVmaW5lZD4ge1xyXG5cclxuICAgIC8vICAgIC8vIGt2bGkgdcW+aXZhdGVsc2vDqW11IG5hc3RhdmVuw60sIElEIGNvbnRlbnR1XHJcbiAgICAvLyAgICBjb25zdCBvcHRpb25zID0gJC5leHRlbmQoe30sIGlucHV0Lm9wdCwge1xyXG4gICAgLy8gICAgICAgIElEOiAnQ29udHJvbGxpbmcjJ1xyXG4gICAgLy8gICAgfSk7XHJcblxyXG4gICAgLy8gICAgcmV0dXJuIEd1aS5EaWFsb2dzLl9vcGVuRGlhbG9nMihpbnB1dD8ucGFyZW50Q29udGVudCwgRWtvLkdDb250cm9sbGluZyBhcyBhbnksIGlucHV0Py5Nb2RPdGV2cmVuaSwgb3B0aW9ucyk7XHJcbiAgICAvL31cclxufSIsIi8vbmFtZXNwYWNlIEdvcmRpYy5Sb24uV2ViQ29udHJvbHMge1xyXG5cclxuLy8gICAgLyoqXHJcbi8vICAgICAqIFZzdHVwbsOtIHBhcmFtZXRyeS5cclxuLy8gICAgICovXHJcbi8vICAgIGV4cG9ydCBpbnRlcmZhY2UgR0dyaWRNYXNrVGVtcGxhdGVJbnB1dCB7XHJcbi8vICAgICAgICB0YWJNZW51OiBNZW51UGFyYW1zW107XHJcbi8vICAgICAgICBpY286IHN0cmluZztcclxuLy8gICAgICAgIHJvazogbnVtYmVyO1xyXG4vLyAgICAgICAgdHlwX21hc2t5OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4vLyAgICB9XHJcblxyXG4vLyAgICAvKipcclxuLy8gICAgICogVsO9c3R1cG7DrSBwYXJhbWV0cnkuXHJcbi8vICAgICAqL1xyXG4vLyAgICBleHBvcnQgaW50ZXJmYWNlIEdHcmlkTWFza1RlbXBsYXRlT3V0cHV0IHtcclxuLy8gICAgICAgIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbi8vICAgICAgICB0YWI6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbi8vICAgIH1cclxuXHJcbi8vICAgIC8qKlxyXG4vLyAgICAgKiBcclxuLy8gICAgICogQHJldHVybnNcclxuLy8gICAgICovXHJcbi8vICAgIGV4cG9ydCBmdW5jdGlvbiBtYXNrVGFiR3JpZChpbnB1dDogR0dyaWRNYXNrVGVtcGxhdGVJbnB1dCk6IEdHcmlkTWFza1RlbXBsYXRlT3V0cHV0IHtcclxuLy8gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICQubmV3RGl2KCdyb25Fa29HcmlkJyk7XHJcblxyXG4vLyAgICAgICAgLy8gdGFiIG9ic2FodWplIGdyaWQsIHBvdMWZZWJ1amkgaG8sIGt2xa9saSBtZW51IC0gbmEgZ3JpZHUgbmVsemVcclxuLy8gICAgICAgIGNvbnN0IGdyaWRUYWI6IEpRdWVyeSA9ICQubmV3RGl2KCdncmlkTWFza1RhYicpXHJcbi8vICAgICAgICAgICAgLmFwcGVuZFRvKGNvbnRhaW5lcilcclxuLy8gICAgICAgICAgICAuZ3RhYih7XHJcbi8vICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzUxMDAwMjNcIiwgLy9SQyAzNTEwMDAyMyA6IE5hc3RhdmVuw60gbWFza3lcclxuLy8gICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4vLyAgICAgICAgICAgICAgICBsb2NrZWQ6IHRydWUsXHJcbi8vICAgICAgICAgICAgICAgIG1lbnVCYXI6IGlucHV0LnRhYk1lbnVcclxuLy8gICAgICAgICAgICB9KVxyXG5cclxuLy8gICAgICAgIC8vIHZ5dHZvxZllbsOtIGdyaWR1XHJcbi8vICAgICAgICBjb25zdCBncmlkOiBKUXVlcnkgPSAkLm5ld0RpdignZ3JpZE1hc2snKVxyXG4vLyAgICAgICAgICAgIC5hcHBlbmRUbyhncmlkVGFiKVxyXG4vLyAgICAgICAgICAgIC5nZ3JpZCh7XHJcbi8vICAgICAgICAgICAgICAgIGRhdGE6IFtdLFxyXG4vLyAgICAgICAgICAgICAgICBjb2x1bW5zOiBnZXRHcmlkQ29sdW1ucyhpbnB1dC5pY28sIGlucHV0LnJvaywgaW5wdXQudHlwX21hc2t5KSxcclxuLy8gICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwiY2VsbFwiLFxyXG4vLyAgICAgICAgICAgICAgICBzaG93VG9wUGFuZWw6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgICAgICBzaG93Qm90dG9tUGFuZWw6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIlxyXG4vLyAgICAgICAgICAgIH0pXHJcblxyXG4vLyAgICAgICAgcmV0dXJuIHsgdGFiOiBncmlkVGFiLCBncmlkOiBncmlkIH07XHJcbi8vICAgIH1cclxuXHJcbi8vICAgIC8qKlxyXG4vLyAgICAgKiBWeXR2b8WZw60gbWVudSBwcm8gdGFiLlxyXG4vLyAgICAgKiBAcmV0dXJucyBNZW51UGFyYW1zW10gLSBwb2xlIG1lbnUgYWtjw60uXHJcbi8vICAgICAqL1xyXG4vLyAgICBmdW5jdGlvbiBnZXRHdGFiTWVudSgpOiBNZW51UGFyYW1zW10ge1xyXG4vLyAgICAgICAgcmV0dXJuIFt7XHJcbi8vICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuLy8gICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4vLyAgICAgICAgfV07XHJcbi8vICAgIH1cclxuXHJcbi8vICAgIC8qKlxyXG4vLyAgICAgKiBcclxuLy8gICAgICogQHBhcmFtIGljb1xyXG4vLyAgICAgKiBAcGFyYW0gcm9rXHJcbi8vICAgICAqIEBwYXJhbSB0eXBfbWFza3lcclxuLy8gICAgICogQHJldHVybnNcclxuLy8gICAgICovXHJcbi8vICAgIGZ1bmN0aW9uIGdldEdyaWRDb2x1bW5zKGljbzogc3RyaW5nLCByb2s6IG51bWJlciwgdHlwX21hc2t5OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HTWFza2FEZXRhaWxEdG8+IHtcclxuLy8gICAgICAgIHJldHVybiBuZXcgRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HTWFza2FEZXRhaWxEdG8+KClcclxuLy8gICAgICAgICAgICAuYWRkKHtcclxuLy8gICAgICAgICAgICAgICAgbmFtZTogXCJrbmloYVwiLFxyXG4vLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktuaWhhXCIsXHJcbi8vICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIlxyXG4vLyAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICAgICAuYWRkKHtcclxuLy8gICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2XCIsXHJcbi8vICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3RhdlwiLFxyXG4vLyAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuLy8gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc3RyaW5nYm94XCJcclxuLy8gICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgLmFkZCh7XHJcbi8vICAgICAgICAgICAgICAgIG5hbWU6IFwicm96cGlzXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUm96cGlzXCIsXHJcbi8vICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIixcclxuLy8gICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgLmFkZCh7XHJcbi8vICAgICAgICAgICAgICAgIG5hbWU6IFwiZmF6ZVwiLFxyXG4vLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkbDoXplXCIsXHJcbi8vICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIixcclxuLy8gICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgLmFkZCh7XHJcbi8vICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVUNTXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInVjc1wiLCBkYXRhKTsgfSxcclxuLy8gICAgICAgICAgICAgICAgZWRpdG9yOiBFa28uRmlsdGVycy51Y3NJbnRlcnZhbCh7XHJcbi8vICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVDU1wiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwidWNzXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICBpY286IGljbyxcclxuLy8gICAgICAgICAgICAgICAgICAgIGFrdFByb2hsOiAxLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgb25seUFjdGl2ZTogdHJ1ZVxyXG4vLyAgICAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgLmFkZCh7XHJcbi8vICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVVVTXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInV1c1wiLCBkYXRhKTsgfSxcclxuLy8gICAgICAgICAgICAgICAgZWRpdG9yOiBFa28uRmlsdGVycy51dXNJbnRlcnZhbCh7XHJcbi8vICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVVU1wiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwidXVzXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICBpY286IGljbyxcclxuLy8gICAgICAgICAgICAgICAgICAgIGFrdFByb2hsOiAxMDAsXHJcbi8vICAgICAgICAgICAgICAgICAgICBvbmx5QWN0aXZlOiB0cnVlLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgdWNzOiBcInVjc1wiXHJcbi8vICAgICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICAgICAuYWRkKHtcclxuLy8gICAgICAgICAgICAgICAgbmFtZTogXCJuc1wiLFxyXG4vLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5TXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcIm5zXCIsIGRhdGEpOyB9LFxyXG4vLyAgICAgICAgICAgICAgICBlZGl0b3I6IEVrby5GaWx0ZXJzLm5rc0ludGVydmFsKHtcclxuLy8gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTlNcIixcclxuLy8gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm5zXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICBpY286IGljbyxcclxuLy8gICAgICAgICAgICAgICAgICAgIGFrdFByb2hsOiAxMDAsXHJcbi8vICAgICAgICAgICAgICAgICAgICBvbmx5QWN0aXZlOiB0cnVlLFxyXG4vLyAgICAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgLmFkZCh7XHJcbi8vICAgICAgICAgICAgICAgIG5hbWU6IFwiaFwiLFxyXG4vLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkhcIixcclxuLy8gICAgICAgICAgICAgICAgZWRpdG9yOiBFa28uRmlsdGVycy5kcmQoe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJIXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJoXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICBzaG93T3N0OiB0eXBfbWFza3kgPT0gMTAsXHJcbi8vICAgICAgICAgICAgICAgICAgICBzaG93VWN0OiB0cnVlLFxyXG4vLyAgICAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgLmFkZCh7XHJcbi8vICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNcIixcclxuLy8gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJNXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcIm1lc2ljXCIsIGRhdGEpOyB9LFxyXG4vLyAgICAgICAgICAgICAgICBlZGl0b3I6IEVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbi8vICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtZXNpY1wiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJNXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgbWluVmFsdWU6IDEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgbWF4VmFsdWU6IDEyXHJcbi8vICAgICAgICAgICAgICAgICAgICB9LCBzZWNvbmRGaWVsZDoge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIG1pblZhbHVlOiAxLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIG1heFZhbHVlOiAxMlxyXG4vLyAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgLmFkZCh7XHJcbi8vICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVuXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRFwiLFxyXG4vLyAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhKSA9PiB7IHJldHVybiBFa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJkZW5cIiwgZGF0YSk7IH0sXHJcbi8vICAgICAgICAgICAgICAgIGVkaXRvcjogRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHtcclxuLy8gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRFwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiZGVuXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgbWluVmFsdWU6IDEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgbWF4VmFsdWU6IDMxXHJcbi8vICAgICAgICAgICAgICAgICAgICB9LCBzZWNvbmRGaWVsZDoge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIG1pblZhbHVlOiAxLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIG1heFZhbHVlOiAzMVxyXG4vLyAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgLmFkZCh7XHJcbi8vICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGFkXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRG9rbGFkXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcImRva2xhZFwiLCBkYXRhKTsgfSxcclxuLy8gICAgICAgICAgICAgICAgZWRpdG9yOiBFa28uRmlsdGVycy5hY0ludGVydmFsKHtcclxuLy8gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRG9rbGFkXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkb2tsYWRcIixcclxuLy8gICAgICAgICAgICAgICAgICAgIGljbzogaWNvLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgYWNMZW5ndGg6IDEsXHJcbi8vICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgcm9rOiByb2ssXHJcbi8vICAgICAgICAgICAgICAgICAgICBzdWJyYWRhOiAxLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgdHlwOiAwLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgemtyYXRrYTogXCJhYVwiXHJcbi8vICAgICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICAgICAuYWRkKHtcclxuLy8gICAgICAgICAgICAgICAgbmFtZTogXCJzdVwiLFxyXG4vLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNVXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInN1XCIsIGRhdGEpOyB9LFxyXG4vLyAgICAgICAgICAgICAgICBlZGl0b3I6IEVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbi8vICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNVXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJzdVwiXHJcbi8vICAgICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICAgICAuYWRkKHtcclxuLy8gICAgICAgICAgICAgICAgbmFtZTogXCJhdVwiLFxyXG4vLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkFVXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcImF1XCIsIGRhdGEpOyB9LFxyXG4vLyAgICAgICAgICAgICAgICBlZGl0b3I6IEVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbi8vICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImF1XCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJhdVwiXHJcbi8vICAgICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICAgICAuYWRkKHtcclxuLy8gICAgICAgICAgICAgICAgbmFtZTogXCJvZHBhXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT0RQQVwiLFxyXG4vLyAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhKSA9PiB7IHJldHVybiBFa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJvZHBhXCIsIGRhdGEpOyB9LFxyXG4vLyAgICAgICAgICAgICAgICBlZGl0b3I6IEVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbi8vICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9EUEFcIixcclxuLy8gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm9kcGFcIlxyXG4vLyAgICAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgLmFkZCh7XHJcbi8vICAgICAgICAgICAgICAgIG5hbWU6IFwicG9sXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUE9MXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInBvbFwiLCBkYXRhKTsgfSxcclxuLy8gICAgICAgICAgICAgICAgZWRpdG9yOiBFa28uRmlsdGVycy5pbnRlZ2VySW50ZXJ2YWwoe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb2xcIixcclxuLy8gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInBvbFwiXHJcbi8vICAgICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICAgICAuYWRkKHtcclxuLy8gICAgICAgICAgICAgICAgbmFtZTogXCJ6alwiLFxyXG4vLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpKXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInpqXCIsIGRhdGEpOyB9LFxyXG4vLyAgICAgICAgICAgICAgICBlZGl0b3I6IEVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbi8vICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpKXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJ6alwiXHJcbi8vICAgICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICAgICAuYWRkKHtcclxuLy8gICAgICAgICAgICAgICAgbmFtZTogXCJ1elwiLFxyXG4vLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVaXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInV6XCIsIGRhdGEpOyB9LFxyXG4vLyAgICAgICAgICAgICAgICBlZGl0b3I6IEVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbi8vICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVaXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJ1elwiXHJcbi8vICAgICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICAgICAuYWRkKHtcclxuLy8gICAgICAgICAgICAgICAgbmFtZTogXCJvcmpcIixcclxuLy8gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPUkpcIixcclxuLy8gICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZGF0YSkgPT4geyByZXR1cm4gRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwib3JqXCIsIGRhdGEpOyB9LFxyXG4vLyAgICAgICAgICAgICAgICBlZGl0b3I6IEVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbi8vICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9SSlwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwib3JqXCJcclxuLy8gICAgICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgIC5hZGQoe1xyXG4vLyAgICAgICAgICAgICAgICBuYW1lOiBcIm9yZ1wiLFxyXG4vLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9SR1wiLFxyXG4vLyAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhKSA9PiB7IHJldHVybiBFa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJvcmdcIiwgZGF0YSk7IH0sXHJcbi8vICAgICAgICAgICAgICAgIGVkaXRvcjogRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHtcclxuLy8gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT1JHXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJvcmdcIlxyXG4vLyAgICAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgLmFkZCh7XHJcbi8vICAgICAgICAgICAgICAgIG5hbWU6IFwibWRcIixcclxuLy8gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJNRFwiLFxyXG4vLyAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhKSA9PiB7IHJldHVybiBFa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJtZFwiLCBkYXRhKTsgfSxcclxuLy8gICAgICAgICAgICAgICAgZWRpdG9yOiBFa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJNRFwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibWRcIlxyXG4vLyAgICAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgLmFkZCh7XHJcbi8vICAgICAgICAgICAgICAgIG5hbWU6IFwiZGFsXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGFsXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcImRhbFwiLCBkYXRhKTsgfSxcclxuLy8gICAgICAgICAgICAgICAgZWRpdG9yOiBFa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEYWxcIixcclxuLy8gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImRhbFwiXHJcbi8vICAgICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICAgICAuYWRkKHtcclxuLy8gICAgICAgICAgICAgICAgbmFtZTogXCJwb3Bpc1wiLFxyXG4vLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvcGlzXCIsXHJcbi8vICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIlxyXG4vLyAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICAgICAuYWRkKHtcclxuLy8gICAgICAgICAgICAgICAgbmFtZTogXCJyb2tEUEhcIixcclxuLy8gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSb2sgRFBIXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInJva0RQSFwiLCBkYXRhKTsgfSxcclxuLy8gICAgICAgICAgICAgICAgZWRpdG9yOiBFa28uRmlsdGVycy5pbnRlZ2VySW50ZXJ2YWwoe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSb2sgRFBIXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJyb2tEUEhcIlxyXG4vLyAgICAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgLmFkZCh7XHJcbi8vICAgICAgICAgICAgICAgIG5hbWU6IFwibWVkcGhcIixcclxuLy8gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJNxJsgRFBIXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIEVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcIm1lRFBIXCIsIGRhdGEpOyB9LFxyXG4vLyAgICAgICAgICAgICAgICBlZGl0b3I6IEVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbi8vICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk3EmyBEUEhcIixcclxuLy8gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1lRFBIXCJcclxuLy8gICAgICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgIC5hZGQoe1xyXG4vLyAgICAgICAgICAgICAgICBuYW1lOiBcInpkXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWkRcIixcclxuLy8gICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZGF0YSkgPT4geyByZXR1cm4gRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwiemRcIiwgZGF0YSk7IH0sXHJcbi8vICAgICAgICAgICAgICAgIGVkaXRvcjogRWtvLkZpbHRlcnMuemRJbnRlcnZhbCh7XHJcbi8vICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpEXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJ6ZFwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgaXNQcm9Fa29GaWx0ZXI6IHRydWVcclxuLy8gICAgICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgIC5hZGQoe1xyXG4vLyAgICAgICAgICAgICAgICBuYW1lOiBcInBpZFwiLFxyXG4vLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBJRFwiLFxyXG4vLyAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuLy8gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc3RyaW5nYm94XCJcclxuLy8gICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgLmFkZCh7XHJcbi8vICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0dW1abWVueVwiLFxyXG4vLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIHptxJtueVwiLFxyXG4vLyAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhKSA9PiB7IHJldHVybiBFa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJkYXR1bVptZW55XCIsIGRhdGEpOyB9LFxyXG4vLyAgICAgICAgICAgICAgICBlZGl0b3I6IEVrby5GaWx0ZXJzLmRhdGVJbnRlcnZhbCh7XHJcbi8vICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIHptxJtueVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiZGF0dW1abWVueSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXHJcbi8vICAgICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICAgICAuYWRkKHtcclxuLy8gICAgICAgICAgICAgICAgbmFtZTogXCJhZ2VuZGFcIixcclxuLy8gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJBZ2VuZGFcIixcclxuLy8gICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuLy8gICAgICAgICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3N0cmluZ2JveFwiXHJcbi8vICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgIC5hZGQoe1xyXG4vLyAgICAgICAgICAgICAgICBuYW1lOiBcInB1dm9kXCIsXHJcbi8vICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWvdm9kXCIsXHJcbi8vICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuLy8gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4vLyAgICAgICAgICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc3RyaW5nYm94XCIsXHJcbi8vICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICB9KTtcclxuLy8gICAgfVxyXG4vL30iXX0=
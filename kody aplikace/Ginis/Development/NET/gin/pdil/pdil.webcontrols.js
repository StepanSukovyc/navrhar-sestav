"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Pdil.WebControls.GAnonymizationCheck.ts                          </Name>
//    <Description> Content který zobrazí subtask, kde každá "záložka" drží jeden soubor.   </Description>
//    <Author>      truzicka                                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                                        </Copyright>
//    <Created>     2024-04-24                                                              </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Pdil;
    (function (Pdil) {
        var WebControls;
        (function (WebControls) {
            /**
             * Content který zobrazí subtask, kde každá "záložka" drží jeden soubor.
             */
            class GAnonymizationCheck extends GContent {
                constructor() {
                    super(...arguments);
                    this.uid = "GAnonymizationCheck_ts#";
                    this.title = "jres:35100004"; //RC 35100004 : Kontrola anonymizace
                }
                /**
                 * Vytvoření contentu.
                 */
                prepareContent() {
                    var that = this;
                    this.$isExported = false;
                    this.$wizard = new Gordic.Wizard();
                    this.$wizard.create({
                        content: this,
                    }, {
                        steps: [{
                                // ********** WIZARD IMPORT **********
                                caption: "jres:35100031", //RC 35100031 : Import
                                create(content, contentDiv, change) {
                                    that.$selectFileContent = content.createContent(WebControls.G_partialAnonymizationImport, { uid: "partialAnonymizatinImport" });
                                    that.$selectFileContent.element
                                        .empty()
                                        .appendTo(contentDiv);
                                },
                                change(content, contentDiv, change) {
                                    let isAnonymizationEnabled;
                                    try {
                                        const selectedFiles = that.$selectFileContent?.$grid?.ggrid("getSelection", void 0, true);
                                        isAnonymizationEnabled = (selectedFiles != null && selectedFiles.length > 0);
                                        var gridView = that.$selectFileContent?.$grid.ggrid("getView");
                                        that.$files = gridView.getDataRows();
                                    }
                                    catch {
                                        isAnonymizationEnabled = false;
                                    }
                                    change.stepsEnable = [true, isAnonymizationEnabled, false];
                                    // odstranění dočasného souboru
                                    if (that.$selectFileContent?.$importedFileInfo?.guid != null)
                                        new GFile().removeFile(that.$selectFileContent.$importedFileInfo.guid);
                                }
                            }, {
                                // ********** WIZARD ANONYMIZACE **********
                                caption: "jres:35100030", //RC 35100030 : Anonymizace
                                create(content, contentDiv, change) {
                                    that.$anonymizationContent = content.createContent(WebControls.G_partialAnonymizationFiles, { uid: "partialAnonymizationFiles", id: "partialAnonymizationFiles" });
                                    that.$anonymizationContent.element
                                        .empty()
                                        .appendTo(contentDiv);
                                },
                                change(content, contentDiv, change) {
                                    that.beginOperation();
                                    change.stepsEnable = [false, false, true];
                                    return that.$anonymizationContent.$fileProcessingAnonymizationContent.switchFile({ toLoad: null, toSave: that.$anonymizationContent.$activeFile });
                                }
                            }, {
                                // ********** WIZARD EXPORT/SUMARIZACE **********
                                caption: "jres:35100029", //RC 35100029 : Export
                                create(content, contentDiv, change) {
                                    if (that.$summaryContent == null)
                                        that.$summaryContent = content.createContent(WebControls.G_partialSummary, { uid: "partialSummary" });
                                    that.$summaryContent.element
                                        .empty()
                                        .appendTo(contentDiv);
                                    that.endOperation();
                                },
                                change(content, contentDiv, change) {
                                    change.stepsEnable = [false, false, false];
                                }
                            }],
                        // ********** UKONČENÍ WIZARDU - STISK TLAČÍTKA EXPORT **********
                        custom: {
                            caption: "jres:35100028", //RC 35100028 : Exportovat
                            icon: "gi-download",
                            tooltip: "jres:35100032", //RC 35100032 : Exportuje soubor(y) jako zip
                            customClass: "g-button--primary",
                            run: () => {
                                this.beginOperation();
                                let resultFileName = this.$selectFileContent.$importedFileInfo.filename?.replace(/\.[^/.]+$/, "");
                                resultFileName = resultFileName + "_anonymized" + ".zip";
                                this.isl.PdilAnonymousCheckService.filesToExport_Zipped({ files: that.$anonymizationContent.$filesToAnonymization })
                                    .get()
                                    .done((data) => {
                                    if (data == null || data == "")
                                        return;
                                    let fileType = "application/zip, application/octet-stream";
                                    // dekódování base64
                                    var zipContent = atob(data);
                                    var buffer = new ArrayBuffer(zipContent.length);
                                    var view = new Uint8Array(buffer);
                                    for (var n = 0; n < zipContent.length; n++) {
                                        view[n] = zipContent.charCodeAt(n);
                                    }
                                    // convert ArrayBuffer na Blob
                                    var blob = new Blob([buffer], { type: fileType });
                                    // a stažení zipu
                                    const element = document.createElement("a");
                                    element.setAttribute("href", window.URL.createObjectURL(blob));
                                    element.setAttribute("download", resultFileName ?? " anonymiziationResult.zip");
                                    element.click();
                                    this.$isExported = true;
                                    // odstranění vytvořeného elementu
                                    element.remove();
                                })
                                    .always(() => {
                                    this.endOperation();
                                    this.close();
                                });
                            }
                        },
                        cancel: () => {
                            alert("konec");
                        }
                    });
                }
                /**
                 * Řeší úklid dočasných souborů.
                 * @param deferred
                 * @returns
                 */
                cleaningUp(deferred) {
                    this.beginOperation();
                    if (this.$files == null) {
                        const gridView = this.$selectFileContent?.$grid?.ggrid("getView");
                        this.$files = gridView?.getDataRows();
                    }
                    if (this.$files == null) {
                        return;
                    }
                    this.isl.PdilAnonymousCheckService.cleanup({ files: this.$files })
                        .get()
                        .always(() => {
                        this.endOperation();
                    });
                }
                /**
                 * Při zavírání contentu je potřeba provést uklid a odstranit všechny dočasné soubory.
                 * Hláška, jestli chce uživatel opustit rozpracovanou práci.
                 * @returns Vrací promis, který nám říká, jestli už jsou všechny soubory odstraněny.
                 */
                closing() {
                    let deferred = $.Deferred();
                    var step = this.$wizard.getStep(this);
                    if (step == 1 || (step == 2 && !this.$isExported)) {
                        this.dialogs.messageBox("", "Opravdu chcete opustit tuto stránku?", GDlg.mbbYesNo, GDlg.mbiQuestion)
                            .on("yes", () => {
                            this.cleaningUp(deferred);
                            deferred.resolve();
                        })
                            .on("close", deferred.reject);
                    }
                    else {
                        this.cleaningUp(deferred);
                        deferred.resolve();
                    }
                    return deferred.promise();
                }
            }
            WebControls.GAnonymizationCheck = GAnonymizationCheck;
        })(WebControls = Pdil.WebControls || (Pdil.WebControls = {}));
    })(Pdil = Gordic.Pdil || (Gordic.Pdil = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Pdil.WebControls.G_partialAnonymizationFiles.ts              </Name>
//    <Description> Třída drží subtask a umožňuje přepínání mezi jednotlivými soubory.  </Description>
//    <Author>      truzicka                                                            </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                                    </Copyright>
//    <Created>     2024-03-27                                                          </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Pdil;
    (function (Pdil) {
        var WebControls;
        (function (WebControls) {
            /**
             * Enum, který drží jména akcí v tomto partial contentu.
             */
            let GActionNames;
            (function (GActionNames) {
                GActionNames["switchFile"] = "switchFile";
            })(GActionNames || (GActionNames = {}));
            /**
             * Třída drží subtask a umožňuje přepínání mezi jednotlivými soubory.
             */
            class G_partialAnonymizationFiles extends GContent {
                /**
                 * Konstruktor třídy.
                 */
                constructor(data) {
                    super("GAnonymizationCheck");
                    this.CreateActions();
                    const parent = data.parentContent;
                    this.$filesToAnonymization = parent.$files.filter(files => files.ToAnonymization === true);
                    this.$activeFile = this.$filesToAnonymization[0];
                }
                /**
                 * Příprava contentu.
                 */
                prepareContent() {
                    this.beginOperation();
                    if (this.$fileProcessingAnonymizationContent == null)
                        this.$fileProcessingAnonymizationContent = this.createContent(WebControls.G_partialProcessAnonymizationFile);
                    this.$gsubtask = $.newDiv()
                        .appendTo(this.contentDiv)
                        .gsubtasks({
                        params: this.PrepareSubtasks()
                    });
                    this.$gsubtask.gsubtasks("setActive", "0");
                    this.$fileProcessingAnonymizationContent.readyAwait.then(() => {
                        this.$fileProcessingAnonymizationContent.$subContent.readyAwait.then(() => {
                            this.$fileProcessingAnonymizationContent.switchFile({ toLoad: this.$activeFile, toSave: null });
                            this.endOperation();
                        });
                    });
                }
                /**
                 * Připraví taby pro gsubtask.
                 * @returns Jednotlivé taby MenuParams[]
                 */
                PrepareSubtasks() {
                    var result = [];
                    for (let i = 0; i < this.$filesToAnonymization?.length; i++) {
                        result.push({
                            id: i.toString(),
                            caption: this.$filesToAnonymization[i]?.FileName ?? "jres:35100024", //RC 35100024 : Neznámý soubor
                            icon: Gordic.Utils.File.getFileTypeIconClass(this.$filesToAnonymization[i]?.FileName ?? "fa-file"),
                            //action: this.actions[GActionNames.switchFile],
                            action: new GAction({
                                name: GActionNames.switchFile,
                                run: (ev, data) => {
                                    const fileToLoad = data.file;
                                    if (fileToLoad != null && fileToLoad.FileName === this.$activeFile.FileName)
                                        return;
                                    this.$fileProcessingAnonymizationContent.switchFile({ toLoad: fileToLoad, toSave: this.$activeFile });
                                    this.$activeFile = fileToLoad;
                                }
                            }),
                            actionContext: { file: this.$filesToAnonymization[i] }
                        });
                    }
                    return result;
                }
                /**
                 * Registruje všechny akce v tomto partial contentu.
                 */
                CreateActions() {
                    this.actions.addRange([
                        new GAction({
                            name: GActionNames.switchFile,
                            run: (ev, data) => {
                                const fileToLoad = data.file;
                                if (fileToLoad != null && fileToLoad.FileName === this.$activeFile.FileName)
                                    return;
                                this.$fileProcessingAnonymizationContent.switchFile({ toLoad: fileToLoad, toSave: this.$activeFile });
                                this.$activeFile = fileToLoad;
                            }
                        }),
                    ]);
                }
            }
            WebControls.G_partialAnonymizationFiles = G_partialAnonymizationFiles;
        })(WebControls = Pdil.WebControls || (Pdil.WebControls = {}));
    })(Pdil = Gordic.Pdil || (Gordic.Pdil = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Pdil.WebControls.G_partialAnonymizationImport.ts                     </Name>
//    <Description> Třída partial contentu pro výběr a identifikaci a předzpracování souboru.   </Description>
//    <Author>      truzicka                                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                                            </Copyright>
//    <Created>     2024-03-27                                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Pdil;
    (function (Pdil) {
        var WebControls;
        (function (WebControls) {
            /**
             * Enum, který drží jména akcí v tomto partial contentu.
             */
            let GActionNames;
            (function (GActionNames) {
                GActionNames["processFile"] = "processFile";
            })(GActionNames || (GActionNames = {}));
            /**
             * Třída partial contentu pro výběr a identifikaci a předzpracování souboru.
             */
            class G_partialAnonymizationImport extends GContent {
                /**
                 * Konstruktor třídy.
                 */
                constructor() {
                    super("GAnonymizationCheck");
                    this.createActions();
                    this.$parent = this.parentContent;
                }
                /**
                 * Vytvoření contentu.
                 */
                prepareContent() {
                    // vytvoření a naformátování formuláře pro souborové pole a grid
                    this.$form = new Gordic.Forms.Form({
                        name: "ImportFileForm",
                        layoutDescriptor: "L1M1S1, L-2-9-1, M-1-10-1, S-12-12-0"
                    });
                    // vytvoření formuláře s file políčkem
                    this.$form
                        .addRow("jres:35100017") //RC 35100017 : Výběr souboru
                        .addField("gfilefield", {
                        name: "dropFileField",
                        customClass: "dropdownField",
                        acceptExtension: ".json,.xml,.csv,.zip,.ganon",
                        maxFileCount: 1,
                        fileSelected: (ev, obj) => {
                            this.actions[GActionNames.processFile]?.run();
                        }
                    });
                    // přiřazení formuláře do DOMu
                    $.newDiv()
                        .appendTo(this.contentDiv)
                        .gform("createFrom", this.$form);
                    // vytvoří z políčka pro soubor dropzone
                    this.findFields("dropFileField")
                        .gfilefield("addDropzone")
                        .gfield("addButton", {
                        action: this.actions[GActionNames.processFile]
                    })
                        .on("fieldchange", (ev, changeObj) => {
                        var fieldContent = this.findFields("dropFileField").gfilefield("getValue");
                        var isEnabled = fieldContent.length > 0;
                        //TODO: po smazání křížkem se nenastaví enabled (jen vzhled, funkce ano), pokud se to maže programově, tak je vše v pořádku - BUG?
                        this.actions[GActionNames.processFile]?.enabled(isEnabled);
                    });
                }
                /**
                 * Registruje všechny akce v tomto partial contentu.
                 */
                createActions() {
                    this.actions.addRange([
                        // akce pro zpracování souboru
                        new GAction({
                            name: GActionNames.processFile,
                            icon: "fa-bolt",
                            enabled: false,
                            tooltip: "jres:35100003", //RC 35100003 : Zpracovat soubor
                            run: () => {
                                var field = this.findFields("dropFileField");
                                this.$importedFileInfo = field.gfilefield("getValue")[0];
                                if (this.$importedFileInfo == null) {
                                    this.dialogs.warning("jres:35100002", //RC 35100002 : Chybí soubor
                                    "jres:35100001" //RC 35100001 : Vyberte soubor, nebo jej přetáhněte do pole pro výběr souboru.
                                    );
                                    return;
                                }
                                // zpracování souboru na straně serveru
                                this.beginOperation();
                                this.isl.PdilAnonymousCheckService.getFiles({ fileInfo: this.$importedFileInfo })
                                    .get()
                                    .done((data) => {
                                    this.$gridView = new Gordic.Data.View([], { key: "uid" });
                                    this.$parent.actions["setAllFiles"]?.run({ data: data });
                                    // vytvoření divu, který bude obsahovat grid pro zobrazení všech souborů k anonymizaci
                                    this.$grid?.empty();
                                    this.$grid = $.newDiv()
                                        .appendTo(this.element)
                                        .ggrid({
                                        data: this.$gridView,
                                        multi: true,
                                        columns: this.createGridFormat(),
                                        rowsChecked: "ToAnonymization",
                                        columnMode: "fit",
                                        rowsEnabled: (dataRow) => {
                                            return (dataRow?.data?.ToAnonymization)
                                                ? true
                                                : false;
                                        }
                                    });
                                    // update obsahu gridu
                                    this.$gridView.updateData(data);
                                    // skrytý div, který využijeme pro získání obsahu souboru bez servisních tagů
                                    $.newDiv("js-tempHidden")
                                        .appendTo(this.contentDiv)
                                        .hide();
                                    // vytvoření čístého obsahu souboru (bez servisních značek)
                                    var tempContent = $(".js-tempHidden");
                                    for (let i = 0; i < data.length; i++) {
                                        const content = data[i].FileContent;
                                        if (content == null)
                                            return;
                                        // vložíme obsah souboro do skrytého divu jako html
                                        tempContent
                                            .empty()
                                            .html(content);
                                        // načteme obsah ze skrytého divu jako text (tím odstraníme servisní tagy)
                                        data[i].FileContentClear = tempContent.text();
                                    }
                                    if (this.$importedFileInfo?.guid == null)
                                        return;
                                })
                                    .always(() => {
                                    $(".js-tempHidden").empty(); // vyčištění skrytého divu
                                    this.endOperation(); // skrytí loadovacího kolečka
                                });
                            }
                        })
                    ]);
                }
                /**
                 * Vytvoří formát pro sloupce gridu.
                 * @returns Formátovaný grid.
                 */
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({
                        name: "FileName",
                        caption: "jres:35100018" //RC 35100018 : Název souboru
                    })
                        .addTextColumn({
                        name: "FileSize",
                        caption: "jres:35100019", //RC 35100019 : Velikost souboru
                    })
                        .addIconColumn({
                        name: "ToAnonymization",
                        caption: "jres:35100020", //RC 35100020 : Lze anonymizovat
                        iconTemplate: (data) => {
                            var template = {
                                icon: this.GetIconAndText(data).icon,
                                tooltip: this.GetIconAndText(data).text
                            };
                            return template;
                        }
                    })
                        .addTextColumn({
                        name: "ToAnonymizationText",
                        caption: "jres:35100023", //RC 35100023 : Odůvodnění
                        cellTemplate: (data) => {
                            return this.GetIconAndText(data).text;
                        }
                    });
                    return gridFormat;
                }
                /**
                * Vrací text odpovídající ikonu k danému souboru.
                * @param data
                * @param returnIco
                * @returns
                */
                GetIconAndText(data) {
                    if (data?.ToAnonymization)
                        return {
                            icon: "fa-check-circle g-state-text g-state-success",
                            text: "jres:35100021" //RC 35100021 : Soubor je možné anonymizovat
                        };
                    else {
                        return {
                            icon: "fa-times-circle g-state-text g-state-error",
                            text: "jres:35100022" //RC 35100022 : Soubor neobsahuje žádný text k anonymizaci
                        };
                    }
                }
            }
            WebControls.G_partialAnonymizationImport = G_partialAnonymizationImport;
        })(WebControls = Pdil.WebControls || (Pdil.WebControls = {}));
    })(Pdil = Gordic.Pdil || (Gordic.Pdil = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Pdil.WebControls.G_partialProcessAnonymizationFile.ts                            </Name>
//    <Description> Content pro zobrazení obsahu souboru a také drží subcontent se seznamem anonymizací.    </Description>
//    <Author>      truzicka                                                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                                                        </Copyright>
//    <Created>     2024-03-28                                                                              </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Pdil;
    (function (Pdil) {
        var WebControls;
        (function (WebControls) {
            /**
             * Enum, který drží jména akcí.
             */
            let GActionNames;
            (function (GActionNames) {
                GActionNames["anonymize"] = "anonymize";
                GActionNames["public"] = "public";
                GActionNames["btnCloseSubtask"] = "btnCloseSubtask";
                GActionNames["ggridSelectedAction"] = "ggridSelectedAction";
                GActionNames["anonymizeAll"] = "anonymizeAll";
                GActionNames["publicAll"] = "publicAll";
                GActionNames["actionClick"] = "actionClick";
                GActionNames["contextMenu"] = "contextMenu";
                GActionNames["onClick_contextMenu"] = "onClick_contextMenu";
                GActionNames["onAnonymize"] = "onAnonymize";
                GActionNames["onPublic"] = "onPublic";
            })(GActionNames = WebControls.GActionNames || (WebControls.GActionNames = {}));
            /**
             * Content pro zobrazení obsahu souboru a také drží subcontent se seznamem anonymizací.
             */
            class G_partialProcessAnonymizationFile extends GContent {
                /**
                 * Parametrický konstruktor třídy.
                 */
                constructor(data) {
                    super("GAnonymizationCheck");
                    this.uid = "processAnonymizationFile";
                    this.title = "jres:35100004"; //RC 35100004 : Kontrola anonymizace
                    this.$parent = data?.parentContent;
                    this.createActions();
                    this.element.on("rowSelectChange", this.onRowSelectChange);
                    this.element.on("anonymizationChanged", this.onAnonymizationChanged);
                }
                /**
                 * Vytvoření kontentu.
                 */
                prepareContent() {
                    // vytvoření kontextového menu
                    this.$contextMenu = $.newDiv("contexthelp-ignore")
                        .appendTo(this.$parent.element)
                        .gactionctmenu({
                        params: [
                            {
                                type: "action",
                                caption: "jres:35100005", //RC 35100005 : Anonymizovat
                                action: this.actions[GActionNames.onAnonymize]
                            },
                            {
                                type: "action",
                                caption: "jres:35100006", //RC 35100006 : Uveřejnit
                                action: this.actions[GActionNames.onPublic]
                            }
                        ]
                    });
                    // kontejner pro zobrazení obsahu souboru
                    if (this.$contentContainer == null) {
                        this.$contentContainer = $('<pre id="fileContent" class="blachm">')
                            .empty()
                            .appendTo(this.$parent.element)
                            .gautofit();
                    }
                    // vytvoření subcontentů
                    // subcontent pro grid, který zobrazí seznam elementů k anonymizaci
                    if (this.$subContent == null) {
                        this.$subContent = this.createContent(WebControls.G_partialProcessAnonymizationFileSubcontent, { uid: "anonymizationSubcontent" });
                        this.$subContent
                            .dockTo(this.$parent, {
                            icon: "gi-list",
                            title: "jres:35100007", //RC 35100007 : Seznam anonymizací
                            region: "left"
                        })
                            .activate();
                    }
                }
                /**
                 * Zajistí výměnu obsahu contentu souboru i seznamu anonymizací v gridu subcontentu.
                 * @param files Soubory k výměně (toLoad a toSave)
                 * @returns Vrací promise ve chvíli, kdy je výměna dokončena.
                 */
                switchFile(files) {
                    const { toLoad, toSave } = files;
                    if (toLoad != null)
                        this.$parent.beginOperation();
                    else
                        // pokud neexistuje soubor k načtení, jedná se o přechod na poslední
                        // krok ve wizardu a proto se subcontent undockne.
                        this.$subContent.undock();
                    return $.when()
                        .then(() => {
                        // pokud existuje nějaký soubor k uložení, tak mu aktualizuji data
                        if (toSave != null) {
                            // získám soubor v poli souborů k anonymizaci
                            const file = this.$parent?.$filesToAnonymization?.find((aFile) => { return aFile.FileName === toSave.FileName; });
                            if (file != null) {
                                toSave.FileContent = $("#fileContent")?.html();
                                toSave.FileContentClear = $("#fileContent")?.text();
                                toSave.ToAnonymizationList = this.$subContent?.$listOfAnonymizations;
                                // získám jeho index a uložím aktualizovaný seznam k anonymizaci
                                const fileIndex = this.$parent?.$filesToAnonymization?.indexOf(file);
                                this.$parent.$filesToAnonymization[fileIndex] = toSave;
                            }
                        }
                        if (toLoad != null) {
                            // získám soubor v poli souborů k anonymizaci
                            const file = this.$parent?.$filesToAnonymization?.find((aFile) => { return aFile.FileName === toLoad.FileName; });
                            if (file != null) {
                                this.$subContent?.element.trigger("fileLoaded", { list: file.ToAnonymizationList, parentContent: this });
                                this.refreshContent(file.FileContent);
                            }
                        }
                    })
                        .always(() => {
                        this.$parent.endOperation();
                    });
                }
                /**
                 * Obnoví content ze souboru.
                 * @param fileContent Obsah souboru k zobrazení.
                 */
                refreshContent(fileContent) {
                    if (fileContent == null)
                        return;
                    if (this.$contentContainer == null) {
                        this.$contentContainer = $('<pre id="fileContent" class="blachm">')
                            .empty()
                            .appendTo(this.$parent.element)
                            .gautofit();
                    }
                    this.$contentContainer
                        .empty()
                        .html(fileContent);
                    // registruje akci kliknutí a kontextového menu
                    this.actions[GActionNames.onClick_contextMenu]
                        ?.register(this.$contentContainer, ["click", "contextmenu"]);
                }
                /**
                 * Změní zvýraznění elementu v náhledu souboru.
                 * @param spanId ID spanu k zvýraznění
                 */
                chageSelection(spanId) {
                    $("span[id^=anItem_]").removeClass("selected");
                    $("#" + spanId).addClass("selected");
                }
                /**
                 * Pouze registruje všechny akce.
                 */
                createActions() {
                    this.actions.addRange([
                        new GAction({
                            name: GActionNames.actionClick,
                            captionVisible: GAction.captionVisibility.always,
                            run: (event, actionContext) => {
                                if (!event)
                                    return;
                                const s = $(event.target).closest(".js-anonym");
                                if (!s.length)
                                    return;
                                var targetId = s[0]?.id;
                                this.$subContent?.element.trigger("clickSelectChange", targetId);
                            }
                        }),
                        new GAction({
                            name: GActionNames.contextMenu,
                            captionVisible: GAction.captionVisibility.always,
                            run: (event, actionContext) => {
                                this.$contextMenu.gactionctmenu("open", event);
                            }
                        }),
                        new GAction({
                            name: GActionNames.onClick_contextMenu,
                            captionVisible: GAction.captionVisibility.always,
                            run: (event, actionContext) => {
                                if (!event)
                                    return;
                                const s = $(event.target).closest(".js-anonym");
                                if (!s.length)
                                    return;
                                var targetId = s[0].id;
                                this.chageSelection(targetId);
                                this.$subContent?.element.trigger("clickSelectChange", targetId);
                                if (event.type === "contextmenu") {
                                    this.$contextMenu.gactionctmenu("open", event);
                                }
                            }
                        }),
                        new GAction({
                            name: GActionNames.onAnonymize,
                            run: (event, actionContext) => {
                                let mySpan = $(".selected");
                                this.$subContent?.element.trigger("contextAnonymChanged", { id: mySpan.attr("id"), anonymize: true });
                            }
                        }),
                        new GAction({
                            name: GActionNames.onPublic,
                            run: (event, actionContext) => {
                                let mySpan = $(".selected");
                                this.$subContent?.element.trigger("contextAnonymChanged", { id: mySpan.attr("id"), anonymize: false });
                            }
                        }),
                    ]);
                }
                /**
                 * Událost na změnu vybraného řádku v Gridu
                 */
                onRowSelectChange(event, ctx) {
                    const content = this?.content;
                    if (content == null || content?.closed)
                        return;
                    let spandID = ctx;
                    let spanToMark = $("#" + spandID);
                    content.chageSelection(spandID);
                    let parent = $("#fileContent");
                    parent.scrollTo(spanToMark);
                }
                /**
                 * Událost, která změní text na **** a obráceně
                 */
                onAnonymizationChanged(event, ctx) {
                    const content = this?.content;
                    let spanToChange = null;
                    for (var i = 0; i < ctx.toChange.length; i++) {
                        let spanToChange_ID = "#" + ctx.toChange[i].id;
                        spanToChange = $(spanToChange_ID);
                        spanToChange?.text(ctx.toChange[i].text);
                    }
                }
            }
            WebControls.G_partialProcessAnonymizationFile = G_partialProcessAnonymizationFile;
        })(WebControls = Pdil.WebControls || (Pdil.WebControls = {}));
    })(Pdil = Gordic.Pdil || (Gordic.Pdil = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Pdil.WebControls.GAnonymizationSubcontent.ts         </Name>
//    <Description> Zobrazení subcontentu a provádí vlastní anonynimizaci.      </Description>
//    <Author>      truzicka                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-03-07                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Pdil;
    (function (Pdil) {
        var WebControls;
        (function (WebControls) {
            /**
             * Zobrazení subcontentu a provádí vlastní anonynimizaci.
             */
            class G_partialProcessAnonymizationFileSubcontent extends GContent {
                /**
                 * Bezparametrický konstrukt třídy.
                 */
                constructor(data) {
                    super("G_partialProcessAnonymizationFile");
                    // veřejné proměnné
                    this.$listOfAnonymizations = [];
                    // vytvoření akcí
                    this.createActions();
                    this.$myParentContent = data?.parentContent;
                    // odchycení událostí/trigerů
                    this.element.on("fileLoaded", this.onFileLoaded);
                    this.element.on("clickSelectChange", this.onClickSelectChange);
                    this.element.on("contextAnonymChanged", this.onContextAnonymChanged);
                }
                /**
                 * Volá se jednou při inicializaci (asynchronně), vytváří grid pro seznam itemů k anonymizaci.
                 */
                prepareContent() {
                    const content = this;
                    // příprava kontejneru pro grid
                    this.$grid = $.newDiv()
                        .appendTo(this.element)
                        .gautofit();
                    // horní menu v subcontentu
                    this.menuBar(this.actions.createBar([
                        { action: this.actions[WebControls.GActionNames.anonymizeAll], favorite: true },
                        { action: this.actions[WebControls.GActionNames.publicAll], favorite: true }
                    ]));
                    // vytvoření view pro grid
                    this.$view = new Gordic.Data.View([], { key: "Id" });
                    // samotné vytvoření gridu
                    this.$grid
                        .ggrid({
                        data: this.$view,
                        multi: true,
                        contextMenu: this.actions.createBar([WebControls.GActionNames.anonymize, WebControls.GActionNames.public]),
                        columns: this.createGridFormat(),
                        defaultAction: this.actions[WebControls.GActionNames.ggridSelectedAction],
                        selection: (ev, sel) => {
                            const selectedItem = content.$grid.ggrid("activeRow");
                            if (selectedItem?.HtmlElementId == null)
                                return;
                            this.$myParentContent?.element.trigger("rowSelectChange", selectedItem.HtmlElementId);
                        }
                    });
                    // spodní tlačítka subcontentu
                    this.commandBar(this.actions.createBar([
                        WebControls.GActionNames.btnCloseSubtask
                    ]));
                }
                /**
                 * Vytvoření formátu pro grid.
                 * @returns Vrací GridFormat
                 */
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addNumberColumn({
                        name: "Id",
                        caption: "jres:35100008", //RC 35100008 : Id
                        width: 35
                    })
                        .addTextColumn({
                        name: "TypeText",
                        caption: "jres:35100009" //RC 35100009 : Typ
                    })
                        .addTextColumn({
                        name: "AnonymText",
                        caption: "jres:35100010" //RC 35100010 : Text
                    })
                        .addIconColumn({
                        name: "IsAnnonym",
                        caption: "jres:35100011", //RC 35100011 : Anonymizováno
                        iconTemplate: (data) => {
                            return {
                                icon: (data.IsAnnonym) ? "fa-check-circle g-state-text g-state-success" : undefined
                            };
                        }
                    });
                    return gridFormat;
                }
                /**
                 * Metoda provede anonymizaci / uveřejnění zvoleného elementu.
                 * @param anonymItems Zvolený element.
                 * @param toAnonymize Pokyn jestli anonymizovat, nebo uveřejnit zvolený element.
                 */
                changeAnonymization(anonymItems, toAnonymize) {
                    if (anonymItems == null || toAnonymize == null)
                        return;
                    let textsToChange = [];
                    // anonymizuje / uveřejní všechny požadované elementy
                    for (var i = 0; i < anonymItems.length; i++) {
                        anonymItems[i].IsAnnonym = toAnonymize;
                        let textToChange = (anonymItems[i].IsAnnonym)
                            ? this.getAnonymizationString(anonymItems[i].AnonymText, anonymItems[i].Type)
                            : anonymItems[i].AnonymText;
                        if (textToChange === null || textToChange === undefined)
                            return;
                        textsToChange.push({ id: anonymItems[i].HtmlElementId, text: textToChange });
                    }
                    this.$view.updateData(anonymItems, "update"); // update změněných řádků
                    this.$myParentContent?.element.trigger("anonymizationChanged", { toChange: textsToChange });
                }
                /**
                 * Vrací anonymizovaný řetězec.
                 * @param textToAnonymization Text k anonymizaci.
                 * @param type Typ anonymizace.
                 * @returns Anonymizovaný text.
                 */
                getAnonymizationString(textToAnonymization, type) {
                    if (textToAnonymization === null || textToAnonymization === undefined)
                        return "";
                    var result = "";
                    switch (type) {
                        case -7 /* Interface.Enums.GPdilEnumLookupTypes.GPdilEnumLookupType.Email */:
                            result = this.anonymEmail(textToAnonymization);
                            break;
                        default:
                            let length = textToAnonymization.length;
                            result = Array(++length).join("*");
                    }
                    return result;
                }
                /**
                 * Anonymizuje email do formátu ******@*******.**
                 * @param textToAnonymization Email k anonymizaci.
                 * @returns Anonymizovaný email.
                 */
                anonymEmail(textToAnonymization) {
                    if (textToAnonymization === null || textToAnonymization === undefined)
                        return "";
                    let startLength = textToAnonymization.substring(0, textToAnonymization.lastIndexOf("@")).length;
                    let endLength = textToAnonymization.substring(textToAnonymization.lastIndexOf("@") + 1).length;
                    let dotIndex = textToAnonymization.lastIndexOf('.');
                    let result = Array(++startLength).join("*") + '@' + Array(++endLength).join("*");
                    return result.substring(0, dotIndex) + '.' + result.substring(dotIndex + 1);
                }
                /**
                 * Vytvoří seznam akcí.
                 */
                createActions() {
                    this.actions.addRange([
                        /**
                         *
                         */
                        new GAction({
                            name: WebControls.GActionNames.anonymize,
                            caption: "jres:35100012", //RC 35100012 : Anonymizovat vybrané
                            run: (event, ctx) => {
                                this.changeAnonymization(ctx.selection, true);
                            }
                        }),
                        /**
                         *
                         */
                        new GAction({
                            name: WebControls.GActionNames.public,
                            caption: "jres:35100013", //RC 35100013 : Uveřejnit vybrané
                            run: (event, ctx) => {
                                this.changeAnonymization(ctx.selection, false);
                            }
                        }),
                        /**
                         *
                         */
                        new GAction({
                            name: WebControls.GActionNames.anonymizeAll,
                            caption: "jres:35100014", //RC 35100014 : Anonymizovat vše
                            icon: "fa-eye-slash",
                            run: (event, ctx) => {
                                this.changeAnonymization(this.$listOfAnonymizations, true);
                            }
                        }),
                        /**
                         *
                         */
                        new GAction({
                            name: WebControls.GActionNames.publicAll,
                            caption: "jres:35100015", //RC 35100015 : Uveřejnit vše
                            icon: "fa-eye",
                            run: (event, ctx) => {
                                this.changeAnonymization(this.$listOfAnonymizations, false);
                            }
                        }),
                        /**
                         * Skryje/deaktivuje subcontent.
                         */
                        new GAction({
                            name: WebControls.GActionNames.btnCloseSubtask,
                            caption: GDlg.mbbClose.text,
                            run: () => {
                                this.deactivate();
                            }
                        }),
                        /**
                         *
                         */
                        new GAction({
                            name: WebControls.GActionNames.ggridSelectedAction,
                            run: (ev, ctx) => {
                                const anonymItem = this.$grid.ggrid("activeRow");
                                this.changeAnonymization([anonymItem], !anonymItem.IsAnnonym);
                            }
                        })
                    ]);
                }
                //#region Funkce které slouží jako obsluha událostí
                /**
                 * Obsluha události volána při načtení souboru v rodičovském contentu.
                 */
                onFileLoaded(event, ctx) {
                    const content = this?.content;
                    if (!content || content.closed)
                        return;
                    // nahraje seznam do gridu
                    content.$listOfAnonymizations = ctx.list;
                    content.$view?.updateData(content.$listOfAnonymizations);
                }
                /**
                 * Obsluha události na kliknutí na element v poli dokumentu, nikoliv v gridu.
                 */
                onClickSelectChange(event, ctx) {
                    const content = this?.content;
                    var elementId = ctx.replace("anItem_", "");
                    content?.$grid?.ggrid("activeRow", { Id: elementId });
                }
                /**
                 * Obsluha události na kliknutí v contextovém menu.
                 */
                onContextAnonymChanged(event, ctx) {
                    const content = this?.content;
                    if (content == null)
                        return;
                    let item = content.$listOfAnonymizations.find(i => i.HtmlElementId === ctx.id);
                    if (item != null)
                        content.changeAnonymization([item], ctx.anonymize);
                }
            }
            WebControls.G_partialProcessAnonymizationFileSubcontent = G_partialProcessAnonymizationFileSubcontent;
        })(WebControls = Pdil.WebControls || (Pdil.WebControls = {}));
    })(Pdil = Gordic.Pdil || (Gordic.Pdil = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Pdil.WebControls.G_partialSummary.ts                 </Name>
//    <Description> Poslední krok průvodce. Sumarizace výsledku anonymizace.    </Description>
//    <Author>      truzicka                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-04-24                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Pdil;
    (function (Pdil) {
        var WebControls;
        (function (WebControls) {
            /**
             * Třída posledního kroku průvodce. Sumarizace výsledku anonymizace.
             */
            class G_partialSummary extends GContent {
                /**
                 * Konstruktor třídy.
                 * @param data
                 */
                constructor(data) {
                    super("GAnonymizationCheck");
                    this.$parent = data.parentContent;
                }
                /**
                 * Připraví a vykreslí celý content.
                 * @param data
                 */
                prepareContent() {
                    this.$gridViewSummary = new Gordic.Data.View([], { key: "uid" });
                    $.newDiv()
                        .appendTo(this.contentDiv)
                        .ggrid({
                        data: this.$gridViewSummary,
                        columns: this.createGridFormat()
                    });
                    this.$gridViewSummary.updateData(this.$parent.$files);
                }
                /**
                 * Vytvoří formát pro sloupce gridu.
                 * @returns Formátovaný grid.
                 */
                createGridFormat() {
                    const gridFormat = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "FileName",
                        caption: "jres:35100018" //RC 35100018 : Název souboru
                    })
                        .addTextColumn({
                        name: "FileSize",
                        caption: "jres:35100019", //RC 35100019 : Velikost souboru
                    })
                        .addTextColumn({
                        name: "AnonymizationCount",
                        caption: "Počet anonzmizací",
                        cellTemplate: (data) => {
                            const totalCount = data.ToAnonymizationList?.length;
                            const anonymized = data.ToAnonymizationList?.filter((item) => item.IsAnnonym === true).length;
                            return anonymized + "/" + totalCount;
                        }
                    })
                        .addIconColumn({
                        name: "ToAnonymization",
                        caption: "jres:35100020", //RC 35100020 : Lze anonymizovat
                        iconTemplate: (data) => {
                            var template = {
                                icon: this.GetIconOrText(data).icon,
                                tooltip: this.GetIconOrText(data).text
                            };
                            return template;
                        }
                    })
                        .addTextColumn({
                        name: "ToAnonymizationText",
                        caption: "jres:35100023", //RC 35100023 : Odůvodnění
                        cellTemplate: (data) => {
                            return this.GetIconOrText(data).text;
                        }
                    });
                    return gridFormat;
                }
                /**
                 * Vrací text a odpovídající ikonu k danému souboru.
                 * @param data
                 * @param returnIco
                 * @returns
                 */
                GetIconOrText(data) {
                    if (data?.ToAnonymizationList == null)
                        return { icon: "", text: "" };
                    if (data.ToAnonymization)
                        return {
                            icon: "fa-check-circle g-state-text g-state-success",
                            text: "jres:35100025" //RC 35100025 : Soubor byl anonymizován
                        };
                    else if (data.ToAnonymizationList?.length > 0) {
                        return {
                            icon: "fa-check-circle g-state-text g-state-warning",
                            text: "jres:35100026" //RC 35100026 : Soubor nebyl zvolen k anonymizaci
                        };
                    }
                    else {
                        return {
                            icon: "fa-times-circle g-state-text g-state-error",
                            text: "jres:35100027" //RC 35100027 : Soubor neobsahoval žádný text k anonymizaci
                        };
                    }
                }
            }
            WebControls.G_partialSummary = G_partialSummary;
        })(WebControls = Pdil.WebControls || (Pdil.WebControls = {}));
    })(Pdil = Gordic.Pdil || (Gordic.Pdil = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Pdil;
    (function (Pdil) {
        var WebControls;
        (function (WebControls) {
            function foo() {
                const a = new GAction({
                    name: "fooAct",
                    run: $.noop
                });
            }
            WebControls.foo = foo;
        })(WebControls = Pdil.WebControls || (Pdil.WebControls = {}));
    })(Pdil = Gordic.Pdil || (Gordic.Pdil = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRpbC53ZWJjb250cm9scy5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiR0Fub255bWl6YXRpb25DaGVjay50cyIsIkdfcGFydGlhbEFub255bWl6YXRpb25GaWxlcy50cyIsIkdfcGFydGlhbEFub255bWl6YXRpb25JbXBvcnQudHMiLCJHX3BhcnRpYWxQcm9jZXNzQW5vbnltaXphdGlvbkZpbGUudHMiLCJHX3BhcnRpYWxQcm9jZXNzQW5vbnltaXphdGlvbkZpbGVTdWJjb250ZW50LnRzIiwiR19wYXJ0aWFsU3VtbWFyeS50cyIsIkhlbGxvV29ybGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSxtR0FBbUc7QUFDbkcsMEdBQTBHO0FBQzFHLHFHQUFxRztBQUNyRyx3R0FBd0c7QUFDeEcsc0dBQXNHO0FBQ3RHLGlCQUFpQjtBQUVqQixJQUFVLE1BQU0sQ0E0TWY7QUE1TUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxJQUFJLENBNE1wQjtJQTVNZ0IsV0FBQSxJQUFJO1FBQUMsSUFBQSxXQUFXLENBNE1oQztRQTVNcUIsV0FBQSxXQUFXO1lBRTdCOztlQUVHO1lBQ0gsTUFBYSxtQkFBb0IsU0FBUSxRQUFRO2dCQUFqRDs7b0JBQ0ksUUFBRyxHQUFHLHlCQUF5QixDQUFDO29CQUNoQyxVQUFLLEdBQUcsZUFBZSxDQUFDLENBQUMsb0NBQW9DO2dCQW9NakUsQ0FBQztnQkF6TEc7O21CQUVHO2dCQUNILGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztvQkFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7d0JBQ2hCLE9BQU8sRUFBRSxJQUFJO3FCQUNoQixFQUFFO3dCQUNDLEtBQUssRUFBRSxDQUFDO2dDQUNKLHNDQUFz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LE9BQU87NEJBQ0gsSUFBSSxFQUFFLDRDQUE0Qzs0QkFDbEQsSUFBSSxFQUFFLGVBQWUsQ0FBQywyREFBMkQ7eUJBQ3BGLENBQUE7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO2FBQ0o7WUF4R1ksNEJBQWdCLG1CQXdHNUIsQ0FBQTtRQUNMLENBQUMsRUE3R3FCLFdBQVcsR0FBWCxnQkFBVyxLQUFYLGdCQUFXLFFBNkdoQztJQUFELENBQUMsRUE3R2dCLElBQUksR0FBSixXQUFJLEtBQUosV0FBSSxRQTZHcEI7QUFBRCxDQUFDLEVBN0dTLE1BQU0sS0FBTixNQUFNLFFBNkdmO0FDckhELElBQVUsTUFBTSxDQU9mO0FBUEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxJQUFJLENBT3BCO0lBUGdCLFdBQUEsSUFBSTtRQUFDLElBQUEsV0FBVyxDQU9oQztRQVBxQixXQUFBLFdBQVc7WUFDN0IsU0FBZ0IsR0FBRztnQkFDZixNQUFNLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQztvQkFDbEIsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJO2lCQUNkLENBQUMsQ0FBQTtZQUNOLENBQUM7WUFMZSxlQUFHLE1BS2xCLENBQUE7UUFDTCxDQUFDLEVBUHFCLFdBQVcsR0FBWCxnQkFBVyxLQUFYLGdCQUFXLFFBT2hDO0lBQUQsQ0FBQyxFQVBnQixJQUFJLEdBQUosV0FBSSxLQUFKLFdBQUksUUFPcEI7QUFBRCxDQUFDLEVBUFMsTUFBTSxLQUFOLE1BQU0sUUFPZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuUGRpbC5XZWJDb250cm9scy5HQW5vbnltaXphdGlvbkNoZWNrLnRzICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gQ29udGVudCBrdGVyw70gem9icmF6w60gc3VidGFzaywga2RlIGthxb5kw6EgXCJ6w6Fsb8W+a2FcIiBkcsW+w60gamVkZW4gc291Ym9yLiAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdHJ1emlja2EgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMDQtMjQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuUGRpbC5XZWJDb250cm9scyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb250ZW50IGt0ZXLDvSB6b2JyYXrDrSBzdWJ0YXNrLCBrZGUga2HFvmTDoSBcInrDoWxvxb5rYVwiIGRyxb7DrSBqZWRlbiBzb3Vib3IuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHQW5vbnltaXphdGlvbkNoZWNrIGV4dGVuZHMgR0NvbnRlbnQgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG4gICAgICAgIHVpZCA9IFwiR0Fub255bWl6YXRpb25DaGVja190cyNcIjtcclxuICAgICAgICB0aXRsZSA9IFwianJlczozNTEwMDAwNFwiOyAvL1JDIDM1MTAwMDA0IDogS29udHJvbGEgYW5vbnltaXphY2VcclxuXHJcbiAgICAgICAgJGZpbGVzOiBHb3JkaWMuUGRpbC5JbnRlcmZhY2UuRHRvcy5HUGRpbEZpbGVJbmZvRHRvW107XHJcblxyXG4gICAgICAgIHByaXZhdGUgJHNlbGVjdEZpbGVDb250ZW50OiBHX3BhcnRpYWxBbm9ueW1pemF0aW9uSW1wb3J0O1xyXG4gICAgICAgIHByaXZhdGUgJGFub255bWl6YXRpb25Db250ZW50OiBHX3BhcnRpYWxBbm9ueW1pemF0aW9uRmlsZXM7XHJcbiAgICAgICAgcHJpdmF0ZSAkc3VtbWFyeUNvbnRlbnQ6IEdfcGFydGlhbFN1bW1hcnk7XHJcbiAgICAgICAgcHJpdmF0ZSAkb3JpZ2luYWxGaWxlTmFtZTogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgJHdpemFyZDogR29yZGljLldpemFyZDtcclxuICAgICAgICBwcml2YXRlICRpc0V4cG9ydGVkOiBib29sZWFuO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZZW7DrSBjb250ZW50dS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcmVwYXJlQ29udGVudCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kaXNFeHBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLiR3aXphcmQgPSBuZXcgR29yZGljLldpemFyZCgpO1xyXG4gICAgICAgICAgICB0aGlzLiR3aXphcmQuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHN0ZXBzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICoqKioqKioqKiogV0laQVJEIElNUE9SVCAqKioqKioqKioqXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDMxXCIsIC8vUkMgMzUxMDAwMzEgOiBJbXBvcnRcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGUoY29udGVudCwgY29udGVudERpdiwgY2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJHNlbGVjdEZpbGVDb250ZW50ID0gY29udGVudC5jcmVhdGVDb250ZW50KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR19wYXJ0aWFsQW5vbnltaXphdGlvbkltcG9ydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdWlkOiBcInBhcnRpYWxBbm9ueW1pemF0aW5JbXBvcnRcIiB9KSBhcyBHX3BhcnRpYWxBbm9ueW1pemF0aW9uSW1wb3J0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kc2VsZWN0RmlsZUNvbnRlbnQuZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmVtcHR5KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhjb250ZW50RGl2KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZShjb250ZW50LCBjb250ZW50RGl2LCBjaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzQW5vbnltaXphdGlvbkVuYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRGaWxlczogYW55W10gPSB0aGF0LiRzZWxlY3RGaWxlQ29udGVudD8uJGdyaWQ/LmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIsIHZvaWQgMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0Fub255bWl6YXRpb25FbmFibGVkID0gKHNlbGVjdGVkRmlsZXMgIT0gbnVsbCAmJiBzZWxlY3RlZEZpbGVzLmxlbmd0aCA+IDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncmlkVmlldzogRGF0YS5WaWV3PEdvcmRpYy5QZGlsLkludGVyZmFjZS5EdG9zLkdQZGlsRmlsZUluZm9EdG8+ID0gdGhhdC4kc2VsZWN0RmlsZUNvbnRlbnQ/LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGZpbGVzID0gZ3JpZFZpZXcuZ2V0RGF0YVJvd3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0Fub255bWl6YXRpb25FbmFibGVkID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlLnN0ZXBzRW5hYmxlID0gW3RydWUsIGlzQW5vbnltaXphdGlvbkVuYWJsZWQsIGZhbHNlXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9kc3RyYW7Em27DrSBkb8SNYXNuw6lobyBzb3Vib3J1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LiRzZWxlY3RGaWxlQ29udGVudD8uJGltcG9ydGVkRmlsZUluZm8/Lmd1aWQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHRmlsZSgpLnJlbW92ZUZpbGUodGhhdC4kc2VsZWN0RmlsZUNvbnRlbnQuJGltcG9ydGVkRmlsZUluZm8uZ3VpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICoqKioqKioqKiogV0laQVJEIEFOT05ZTUlaQUNFICoqKioqKioqKipcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzUxMDAwMzBcIiwgLy9SQyAzNTEwMDAzMCA6IEFub255bWl6YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlKGNvbnRlbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRhbm9ueW1pemF0aW9uQ29udGVudCA9IGNvbnRlbnQuY3JlYXRlQ29udGVudChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdfcGFydGlhbEFub255bWl6YXRpb25GaWxlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdWlkOiBcInBhcnRpYWxBbm9ueW1pemF0aW9uRmlsZXNcIiwgaWQ6IFwicGFydGlhbEFub255bWl6YXRpb25GaWxlc1wiIH0pIGFzIEdfcGFydGlhbEFub255bWl6YXRpb25GaWxlcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGFub255bWl6YXRpb25Db250ZW50LmVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lbXB0eSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oY29udGVudERpdik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2UoY29udGVudCwgY29udGVudERpdiwgY2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZS5zdGVwc0VuYWJsZSA9IFtmYWxzZSwgZmFsc2UsIHRydWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC4kYW5vbnltaXphdGlvbkNvbnRlbnQuJGZpbGVQcm9jZXNzaW5nQW5vbnltaXphdGlvbkNvbnRlbnQuc3dpdGNoRmlsZSh7IHRvTG9hZDogbnVsbCwgdG9TYXZlOiB0aGF0LiRhbm9ueW1pemF0aW9uQ29udGVudC4kYWN0aXZlRmlsZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICoqKioqKioqKiogV0laQVJEIEVYUE9SVC9TVU1BUklaQUNFICoqKioqKioqKipcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzUxMDAwMjlcIiwgLy9SQyAzNTEwMDAyOSA6IEV4cG9ydFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZShjb250ZW50LCBjb250ZW50RGl2LCBjaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuJHN1bW1hcnlDb250ZW50ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRzdW1tYXJ5Q29udGVudCA9IGNvbnRlbnQuY3JlYXRlQ29udGVudChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHX3BhcnRpYWxTdW1tYXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdWlkOiBcInBhcnRpYWxTdW1tYXJ5XCIgfSkgYXMgR19wYXJ0aWFsU3VtbWFyeTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJHN1bW1hcnlDb250ZW50LmVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lbXB0eSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oY29udGVudERpdik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlKGNvbnRlbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2Uuc3RlcHNFbmFibGUgPSBbZmFsc2UsIGZhbHNlLCBmYWxzZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICAgICAgLy8gKioqKioqKioqKiBVS09OxIxFTsONIFdJWkFSRFUgLSBTVElTSyBUTEHEjMONVEtBIEVYUE9SVCAqKioqKioqKioqXHJcbiAgICAgICAgICAgICAgICBjdXN0b206IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzUxMDAwMjhcIiwgLy9SQyAzNTEwMDAyOCA6IEV4cG9ydG92YXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRvd25sb2FkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjM1MTAwMDMyXCIsIC8vUkMgMzUxMDAwMzIgOiBFeHBvcnR1amUgc291Ym9yKHkpIGpha28gemlwXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHsgLy8gZXhwb3J0IHNvdWJvcsWvIGpha28gemlwZmlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0RmlsZU5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHRoaXMuJHNlbGVjdEZpbGVDb250ZW50LiRpbXBvcnRlZEZpbGVJbmZvLmZpbGVuYW1lPy5yZXBsYWNlKC9cXC5bXi8uXSskLywgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEZpbGVOYW1lID0gcmVzdWx0RmlsZU5hbWUgKyBcIl9hbm9ueW1pemVkXCIgKyBcIi56aXBcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNsLlBkaWxBbm9ueW1vdXNDaGVja1NlcnZpY2UuZmlsZXNUb0V4cG9ydF9aaXBwZWQoeyBmaWxlczogdGhhdC4kYW5vbnltaXphdGlvbkNvbnRlbnQuJGZpbGVzVG9Bbm9ueW1pemF0aW9uIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChkYXRhOiBzdHJpbmcpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCB8fCBkYXRhID09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVUeXBlOiBzdHJpbmcgPSBcImFwcGxpY2F0aW9uL3ppcCwgYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRla8OzZG92w6Fuw60gYmFzZTY0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHppcENvbnRlbnQ6IHN0cmluZyA9IGF0b2IoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlcjogQXJyYXlCdWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoemlwQ29udGVudC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3OiBVaW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbjogbnVtYmVyID0gMDsgbiA8IHppcENvbnRlbnQubGVuZ3RoOyBuKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld1tuXSA9IHppcENvbnRlbnQuY2hhckNvZGVBdChuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgQXJyYXlCdWZmZXIgbmEgQmxvYlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBibG9iOiBCbG9iID0gbmV3IEJsb2IoW2J1ZmZlcl0sIHsgdHlwZTogZmlsZVR5cGUgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGEgc3Rhxb5lbsOtIHppcHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImhyZWZcIiwgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZG93bmxvYWRcIiwgcmVzdWx0RmlsZU5hbWUgPz8gXCIgYW5vbnltaXppYXRpb25SZXN1bHQuemlwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xpY2soKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kaXNFeHBvcnRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9kc3RyYW7Em27DrSB2eXR2b8WZZW7DqWhvIGVsZW1lbnR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwia29uZWNcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogxZhlxaHDrSDDumtsaWQgZG/EjWFzbsO9Y2ggc291Ym9yxa8uXHJcbiAgICAgICAgICogQHBhcmFtIGRlZmVycmVkXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGVhbmluZ1VwKGRlZmVycmVkOiBKUXVlcnkuRGVmZXJyZWQ8YW55Pikge1xyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy4kZmlsZXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ3JpZFZpZXc6IERhdGEuVmlldzxJbnRlcmZhY2UuRHRvcy5HUGRpbEZpbGVJbmZvRHRvPiA9IHRoaXMuJHNlbGVjdEZpbGVDb250ZW50Py4kZ3JpZD8uZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZmlsZXMgPSBncmlkVmlldz8uZ2V0RGF0YVJvd3MoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuJGZpbGVzID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pc2wuUGRpbEFub255bW91c0NoZWNrU2VydmljZS5jbGVhbnVwKHsgZmlsZXM6IHRoaXMuJGZpbGVzIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZlpIHphdsOtcsOhbsOtIGNvbnRlbnR1IGplIHBvdMWZZWJhIHByb3bDqXN0IHVrbGlkIGEgb2RzdHJhbml0IHbFoWVjaG55IGRvxI1hc27DqSBzb3Vib3J5LlxyXG4gICAgICAgICAqIEhsw6HFoWthLCBqZXN0bGkgY2hjZSB1xb5pdmF0ZWwgb3B1c3RpdCByb3pwcmFjb3Zhbm91IHByw6FjaS4gXHJcbiAgICAgICAgICogQHJldHVybnMgVnJhY8OtIHByb21pcywga3RlcsO9IG7DoW0gxZnDrWvDoSwgamVzdGxpIHXFviBqc291IHbFoWVjaG55IHNvdWJvcnkgb2RzdHJhbsSbbnkuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgbGV0IGRlZmVycmVkOiBKUXVlcnkuRGVmZXJyZWQ8YW55PiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdmFyIHN0ZXA6IG51bWJlciA9IHRoaXMuJHdpemFyZC5nZXRTdGVwKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0ZXAgPT0gMSB8fCAoc3RlcCA9PSAyICYmICF0aGlzLiRpc0V4cG9ydGVkKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLm1lc3NhZ2VCb3goXCJcIiwgXCJPcHJhdmR1IGNoY2V0ZSBvcHVzdGl0IHR1dG8gc3Ryw6Fua3U/XCIsIEdEbGcubWJiWWVzTm8sIEdEbGcubWJpUXVlc3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhbmluZ1VwKGRlZmVycmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZGVmZXJyZWQucmVqZWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYW5pbmdVcChkZWZlcnJlZCk7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuUGRpbC5XZWJDb250cm9scy5HX3BhcnRpYWxBbm9ueW1pemF0aW9uRmlsZXMudHMgICAgICAgICAgICAgIDwvTmFtZT5cbi8vICAgIDxEZXNjcmlwdGlvbj4gVMWZw61kYSBkcsW+w60gc3VidGFzayBhIHVtb8W+xYh1amUgcMWZZXDDrW7DoW7DrSBtZXppIGplZG5vdGxpdsO9bWkgc291Ym9yeS4gIDwvRGVzY3JpcHRpb24+XG4vLyAgICA8QXV0aG9yPiAgICAgIHRydXppY2thICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI0LTAzLTI3ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cbi8vICA8L0ZpbGVIZWFkZXI+XG5cbm5hbWVzcGFjZSBHb3JkaWMuUGRpbC5XZWJDb250cm9scyB7XHJcbiAgICAvKipcclxuICAgICAqIEVudW0sIGt0ZXLDvSBkcsW+w60gam3DqW5hIGFrY8OtIHYgdG9tdG8gcGFydGlhbCBjb250ZW50dS5cclxuICAgICAqL1xyXG4gICAgZW51bSBHQWN0aW9uTmFtZXMge1xyXG4gICAgICAgIHN3aXRjaEZpbGUgPSBcInN3aXRjaEZpbGVcIlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVMWZw61kYSBkcsW+w60gc3VidGFzayBhIHVtb8W+xYh1amUgcMWZZXDDrW7DoW7DrSBtZXppIGplZG5vdGxpdsO9bWkgc291Ym9yeS5cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEdfcGFydGlhbEFub255bWl6YXRpb25GaWxlcyBleHRlbmRzIEdDb250ZW50IGltcGxlbWVudHMgSUdDbGllbnRDb250ZW50IHtcclxuICAgICAgICBwdWJsaWMgJGFjdGl2ZUZpbGU6IEdvcmRpYy5QZGlsLkludGVyZmFjZS5EdG9zLkdQZGlsRmlsZUluZm9EdG87XHJcbiAgICAgICAgcHVibGljICRmaWxlc1RvQW5vbnltaXphdGlvbjogR29yZGljLlBkaWwuSW50ZXJmYWNlLkR0b3MuR1BkaWxGaWxlSW5mb0R0b1tdO1xyXG5cclxuICAgICAgICBwcml2YXRlICRnc3VidGFzazogSlF1ZXJ5O1xyXG4gICAgICAgIHB1YmxpYyAkZmlsZVByb2Nlc3NpbmdBbm9ueW1pemF0aW9uQ29udGVudDogR19wYXJ0aWFsUHJvY2Vzc0Fub255bWl6YXRpb25GaWxlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLb25zdHJ1a3RvciB0xZnDrWR5LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgICAgICAgICAgc3VwZXIoXCJHQW5vbnltaXphdGlvbkNoZWNrXCIpO1xyXG4gICAgICAgICAgICB0aGlzLkNyZWF0ZUFjdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudDogR0Fub255bWl6YXRpb25DaGVjayA9IGRhdGEucGFyZW50Q29udGVudCBhcyBHQW5vbnltaXphdGlvbkNoZWNrO1xyXG4gICAgICAgICAgICB0aGlzLiRmaWxlc1RvQW5vbnltaXphdGlvbiA9IHBhcmVudC4kZmlsZXMuZmlsdGVyKGZpbGVzID0+IGZpbGVzLlRvQW5vbnltaXphdGlvbiA9PT0gdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGFjdGl2ZUZpbGUgPSB0aGlzLiRmaWxlc1RvQW5vbnltaXphdGlvblswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmcOtcHJhdmEgY29udGVudHUuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRmaWxlUHJvY2Vzc2luZ0Fub255bWl6YXRpb25Db250ZW50ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRmaWxlUHJvY2Vzc2luZ0Fub255bWl6YXRpb25Db250ZW50ID0gdGhpcy5jcmVhdGVDb250ZW50KEdfcGFydGlhbFByb2Nlc3NBbm9ueW1pemF0aW9uRmlsZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRnc3VidGFzayA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmNvbnRlbnREaXYpXHJcbiAgICAgICAgICAgICAgICAuZ3N1YnRhc2tzKHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHRoaXMuUHJlcGFyZVN1YnRhc2tzKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kZ3N1YnRhc2suZ3N1YnRhc2tzKFwic2V0QWN0aXZlXCIsIFwiMFwiKTtcclxuICAgICAgICAgICAgdGhpcy4kZmlsZVByb2Nlc3NpbmdBbm9ueW1pemF0aW9uQ29udGVudC5yZWFkeUF3YWl0LnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZmlsZVByb2Nlc3NpbmdBbm9ueW1pemF0aW9uQ29udGVudC4kc3ViQ29udGVudC5yZWFkeUF3YWl0LnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGZpbGVQcm9jZXNzaW5nQW5vbnltaXphdGlvbkNvbnRlbnQuc3dpdGNoRmlsZSh7IHRvTG9hZDogdGhpcy4kYWN0aXZlRmlsZSwgdG9TYXZlOiBudWxsIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZlpcHJhdsOtIHRhYnkgcHJvIGdzdWJ0YXNrLlxyXG4gICAgICAgICAqIEByZXR1cm5zIEplZG5vdGxpdsOpIHRhYnkgTWVudVBhcmFtc1tdXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBQcmVwYXJlU3VidGFza3MoKTogTWVudVBhcmFtc1tdIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdDogTWVudVBhcmFtc1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuJGZpbGVzVG9Bbm9ueW1pemF0aW9uPy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy4kZmlsZXNUb0Fub255bWl6YXRpb25baV0/LkZpbGVOYW1lID8/IFwianJlczozNTEwMDAyNFwiLCAvL1JDIDM1MTAwMDI0IDogTmV6bsOhbcO9IHNvdWJvclxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IEdvcmRpYy5VdGlscy5GaWxlLmdldEZpbGVUeXBlSWNvbkNsYXNzKHRoaXMuJGZpbGVzVG9Bbm9ueW1pemF0aW9uW2ldPy5GaWxlTmFtZSA/PyBcImZhLWZpbGVcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hY3Rpb246IHRoaXMuYWN0aW9uc1tHQWN0aW9uTmFtZXMuc3dpdGNoRmlsZV0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdBY3Rpb25OYW1lcy5zd2l0Y2hGaWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IChldiwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZVRvTG9hZDogSW50ZXJmYWNlLkR0b3MuR1BkaWxGaWxlSW5mb0R0byA9IGRhdGEuZmlsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZVRvTG9hZCAhPSBudWxsICYmIGZpbGVUb0xvYWQuRmlsZU5hbWUgPT09IHRoaXMuJGFjdGl2ZUZpbGUuRmlsZU5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZpbGVQcm9jZXNzaW5nQW5vbnltaXphdGlvbkNvbnRlbnQuc3dpdGNoRmlsZSh7IHRvTG9hZDogZmlsZVRvTG9hZCwgdG9TYXZlOiB0aGlzLiRhY3RpdmVGaWxlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYWN0aXZlRmlsZSA9IGZpbGVUb0xvYWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25Db250ZXh0OiB7IGZpbGU6IHRoaXMuJGZpbGVzVG9Bbm9ueW1pemF0aW9uW2ldIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0cnVqZSB2xaFlY2hueSBha2NlIHYgdG9tdG8gcGFydGlhbCBjb250ZW50dS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIENyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR0FjdGlvbk5hbWVzLnN3aXRjaEZpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZVRvTG9hZDogSW50ZXJmYWNlLkR0b3MuR1BkaWxGaWxlSW5mb0R0byA9IGRhdGEuZmlsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlVG9Mb2FkICE9IG51bGwgJiYgZmlsZVRvTG9hZC5GaWxlTmFtZSA9PT0gdGhpcy4kYWN0aXZlRmlsZS5GaWxlTmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZpbGVQcm9jZXNzaW5nQW5vbnltaXphdGlvbkNvbnRlbnQuc3dpdGNoRmlsZSh7IHRvTG9hZDogZmlsZVRvTG9hZCwgdG9TYXZlOiB0aGlzLiRhY3RpdmVGaWxlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhY3RpdmVGaWxlID0gZmlsZVRvTG9hZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuUGRpbC5XZWJDb250cm9scy5HX3BhcnRpYWxBbm9ueW1pemF0aW9uSW1wb3J0LnRzICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxuLy8gICAgPERlc2NyaXB0aW9uPiBUxZnDrWRhIHBhcnRpYWwgY29udGVudHUgcHJvIHbDvWLEm3IgYSBpZGVudGlmaWthY2kgYSBwxZllZHpwcmFjb3bDoW7DrSBzb3Vib3J1LiAgIDwvRGVzY3JpcHRpb24+XG4vLyAgICA8QXV0aG9yPiAgICAgIHRydXppY2thICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNC0wMy0yNyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cbi8vICA8L0ZpbGVIZWFkZXI+XG5cbm5hbWVzcGFjZSBHb3JkaWMuUGRpbC5XZWJDb250cm9scyB7XHJcbiAgICAvKipcclxuICAgICAqIEVudW0sIGt0ZXLDvSBkcsW+w60gam3DqW5hIGFrY8OtIHYgdG9tdG8gcGFydGlhbCBjb250ZW50dS5cclxuICAgICAqL1xyXG4gICAgZW51bSBHQWN0aW9uTmFtZXMge1xyXG4gICAgICAgIHByb2Nlc3NGaWxlID0gXCJwcm9jZXNzRmlsZVwiXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUxZnDrWRhIHBhcnRpYWwgY29udGVudHUgcHJvIHbDvWLEm3IgYSBpZGVudGlmaWthY2kgYSBwxZllZHpwcmFjb3bDoW7DrSBzb3Vib3J1LlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR19wYXJ0aWFsQW5vbnltaXphdGlvbkltcG9ydCBleHRlbmRzIEdDb250ZW50IGltcGxlbWVudHMgSUdDbGllbnRDb250ZW50IHtcclxuXHJcbiAgICAgICAgJGdyaWQ6IEpRdWVyeTtcclxuICAgICAgICAkaW1wb3J0ZWRGaWxlSW5mbzogR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HRmlsZUluZm9EdG87XHJcblxyXG4gICAgICAgIHByaXZhdGUgJGZvcm06IEZvcm1zLkZvcm07XHJcbiAgICAgICAgcHJpdmF0ZSAkcGFyZW50OiBHQW5vbnltaXphdGlvbkNoZWNrO1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWRWaWV3OiBEYXRhLlZpZXc8R29yZGljLlBkaWwuSW50ZXJmYWNlLkR0b3MuR1BkaWxGaWxlSW5mb0R0bz47XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtvbnN0cnVrdG9yIHTFmcOtZHkuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKFwiR0Fub255bWl6YXRpb25DaGVja1wiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQgPSB0aGlzLnBhcmVudENvbnRlbnQgYXMgR0Fub255bWl6YXRpb25DaGVjaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZllbsOtIGNvbnRlbnR1LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByZXBhcmVDb250ZW50KCk6IHZvaWQge1xyXG4gICAgICAgICAgICAvLyB2eXR2b8WZZW7DrSBhIG5hZm9ybcOhdG92w6Fuw60gZm9ybXVsw6HFmWUgcHJvIHNvdWJvcm92w6kgcG9sZSBhIGdyaWRcclxuICAgICAgICAgICAgdGhpcy4kZm9ybSA9IG5ldyBGb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiSW1wb3J0RmlsZUZvcm1cIixcclxuICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTItOS0xLCBNLTEtMTAtMSwgUy0xMi0xMi0wXCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyB2eXR2b8WZZW7DrSBmb3JtdWzDocWZZSBzIGZpbGUgcG9sw63EjWtlbVxyXG4gICAgICAgICAgICB0aGlzLiRmb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTEwMDAxN1wiKSAvL1JDIDM1MTAwMDE3IDogVsO9YsSbciBzb3Vib3J1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZmlsZWZpZWxkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRyb3BGaWxlRmllbGRcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkcm9wZG93bkZpZWxkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXB0RXh0ZW5zaW9uOiBcIi5qc29uLC54bWwsLmNzdiwuemlwLC5nYW5vblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heEZpbGVDb3VudDogMSxcclxuICAgICAgICAgICAgICAgICAgICBmaWxlU2VsZWN0ZWQ6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tHQWN0aW9uTmFtZXMucHJvY2Vzc0ZpbGVdPy5ydW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHDFmWnFmWF6ZW7DrSBmb3JtdWzDocWZZSBkbyBET011XHJcbiAgICAgICAgICAgICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmNvbnRlbnREaXYpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHRoaXMuJGZvcm0pO1xyXG5cclxuICAgICAgICAgICAgLy8gdnl0dm/FmcOtIHogcG9sw63EjWthIHBybyBzb3Vib3IgZHJvcHpvbmVcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKFwiZHJvcEZpbGVGaWVsZFwiKVxyXG4gICAgICAgICAgICAgICAgLmdmaWxlZmllbGQoXCJhZGREcm9wem9uZVwiKVxyXG4gICAgICAgICAgICAgICAgLmdmaWVsZChcImFkZEJ1dHRvblwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbR0FjdGlvbk5hbWVzLnByb2Nlc3NGaWxlXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImZpZWxkY2hhbmdlXCIsIChldiwgY2hhbmdlT2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkQ29udGVudCA9IHRoaXMuZmluZEZpZWxkcyhcImRyb3BGaWxlRmllbGRcIikuZ2ZpbGVmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0VuYWJsZWQgPSBmaWVsZENvbnRlbnQubGVuZ3RoID4gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiBwbyBzbWF6w6Fuw60ga8WZw63FvmtlbSBzZSBuZW5hc3RhdsOtIGVuYWJsZWQgKGplbiB2emhsZWQsIGZ1bmtjZSBhbm8pLCBwb2t1ZCBzZSB0byBtYcW+ZSBwcm9ncmFtb3bEmywgdGFrIGplIHbFoWUgdiBwb8WZw6Fka3UgLSBCVUc/XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0dBY3Rpb25OYW1lcy5wcm9jZXNzRmlsZV0/LmVuYWJsZWQoaXNFbmFibGVkKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0cnVqZSB2xaFlY2hueSBha2NlIHYgdG9tdG8gcGFydGlhbCBjb250ZW50dS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICAvLyBha2NlIHBybyB6cHJhY292w6Fuw60gc291Ym9ydVxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdBY3Rpb25OYW1lcy5wcm9jZXNzRmlsZSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWJvbHRcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzUxMDAwMDNcIiwgLy9SQyAzNTEwMDAwMyA6IFpwcmFjb3ZhdCBzb3Vib3JcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+ID0gdGhpcy5maW5kRmllbGRzKFwiZHJvcEZpbGVGaWVsZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kaW1wb3J0ZWRGaWxlSW5mbyA9IGZpZWxkLmdmaWxlZmllbGQoXCJnZXRWYWx1ZVwiKVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLiRpbXBvcnRlZEZpbGVJbmZvID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy53YXJuaW5nKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozNTEwMDAwMlwiLCAvL1JDIDM1MTAwMDAyIDogQ2h5YsOtIHNvdWJvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozNTEwMDAwMVwiIC8vUkMgMzUxMDAwMDEgOiBWeWJlcnRlIHNvdWJvciwgbmVibyBqZWogcMWZZXTDoWhuxJt0ZSBkbyBwb2xlIHBybyB2w71ixJtyIHNvdWJvcnUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8genByYWNvdsOhbsOtIHNvdWJvcnUgbmEgc3RyYW7EmyBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc2wuUGRpbEFub255bW91c0NoZWNrU2VydmljZS5nZXRGaWxlcyh7IGZpbGVJbmZvOiB0aGlzLiRpbXBvcnRlZEZpbGVJbmZvIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChkYXRhOiBHb3JkaWMuUGRpbC5JbnRlcmZhY2UuRHRvcy5HUGRpbEZpbGVJbmZvRHRvW10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkVmlldyA9IG5ldyBEYXRhLlZpZXc8SW50ZXJmYWNlLkR0b3MuR1BkaWxGaWxlSW5mb0R0bz4oW10sIHsga2V5OiBcInVpZFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5hY3Rpb25zW1wic2V0QWxsRmlsZXNcIl0/LnJ1bih7IGRhdGE6IGRhdGEgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZ5dHZvxZllbsOtIGRpdnUsIGt0ZXLDvSBidWRlIG9ic2Fob3ZhdCBncmlkIHBybyB6b2JyYXplbsOtIHbFoWVjaCBzb3Vib3LFryBrIGFub255bWl6YWNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZD8uZW1wdHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLlBkaWwuSW50ZXJmYWNlLkR0b3MuR1BkaWxGaWxlSW5mb0R0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy4kZ3JpZFZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93c0NoZWNrZWQ6IFwiVG9Bbm9ueW1pemF0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93c0VuYWJsZWQ6IChkYXRhUm93OiBNZXRhUm93PEludGVyZmFjZS5EdG9zLkdQZGlsRmlsZUluZm9EdG8+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkYXRhUm93Py5kYXRhPy5Ub0Fub255bWl6YXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIG9ic2FodSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGdyaWRWaWV3LnVwZGF0ZURhdGEoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNrcnl0w70gZGl2LCBrdGVyw70gdnl1xb5pamVtZSBwcm8gesOtc2vDoW7DrSBvYnNhaHUgc291Ym9ydSBiZXogc2VydmlzbsOtY2ggdGFnxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLm5ld0RpdihcImpzLXRlbXBIaWRkZW5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuY29udGVudERpdilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnl0dm/FmWVuw60gxI3DrXN0w6lobyBvYnNhaHUgc291Ym9ydSAoYmV6IHNlcnZpc27DrWNoIHpuYcSNZWspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXBDb250ZW50ID0gJChcIi5qcy10ZW1wSGlkZGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgPSBkYXRhW2ldLkZpbGVDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmxvxb7DrW1lIG9ic2FoIHNvdWJvcm8gZG8gc2tyeXTDqWhvIGRpdnUgamFrbyBodG1sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZW1wdHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVtZSBvYnNhaCB6ZSBza3J5dMOpaG8gZGl2dSBqYWtvIHRleHQgKHTDrW0gb2RzdHJhbsOtbWUgc2VydmlzbsOtIHRhZ3kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbaV0uRmlsZUNvbnRlbnRDbGVhciA9IHRlbXBDb250ZW50LnRleHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLiRpbXBvcnRlZEZpbGVJbmZvPy5ndWlkID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5qcy10ZW1wSGlkZGVuXCIpLmVtcHR5KCk7ICAgIC8vIHZ5xI1pxaF0xJtuw60gc2tyeXTDqWhvIGRpdnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpOyAgICAgICAgICAgIC8vIHNrcnl0w60gbG9hZG92YWPDrWhvIGtvbGXEjWthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSBmb3Jtw6F0IHBybyBzbG91cGNlIGdyaWR1LlxyXG4gICAgICAgICAqIEByZXR1cm5zIEZvcm3DoXRvdmFuw70gZ3JpZC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR0dyaWRDb2x1bW48SW50ZXJmYWNlLkR0b3MuR1BkaWxGaWxlSW5mb0R0bz5bXSB8IERhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuRHRvcy5HUGRpbEZpbGVJbmZvRHRvPiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0OiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5EdG9zLkdQZGlsRmlsZUluZm9EdG8+ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkR0b3MuR1BkaWxGaWxlSW5mb0R0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJGaWxlTmFtZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTEwMDAxOFwiIC8vUkMgMzUxMDAwMTggOiBOw6F6ZXYgc291Ym9ydVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkZpbGVTaXplXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDE5XCIsIC8vUkMgMzUxMDAwMTkgOiBWZWxpa29zdCBzb3Vib3J1XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVG9Bbm9ueW1pemF0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDIwXCIsIC8vUkMgMzUxMDAwMjAgOiBMemUgYW5vbnltaXpvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAoZGF0YTogSW50ZXJmYWNlLkR0b3MuR1BkaWxGaWxlSW5mb0R0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiB0aGlzLkdldEljb25BbmRUZXh0KGRhdGEpLmljb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiB0aGlzLkdldEljb25BbmRUZXh0KGRhdGEpLnRleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVG9Bbm9ueW1pemF0aW9uVGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTEwMDAyM1wiLCAvL1JDIDM1MTAwMDIzIDogT2TFr3ZvZG7Em27DrVxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGE6IEludGVyZmFjZS5EdG9zLkdQZGlsRmlsZUluZm9EdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuR2V0SWNvbkFuZFRleHQoZGF0YSkudGV4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBWcmFjw60gdGV4dCBvZHBvdsOtZGFqw61jw60gaWtvbnUgayBkYW7DqW11IHNvdWJvcnUuXHJcbiAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICogQHBhcmFtIHJldHVybkljb1xyXG4gICAgICAgICogQHJldHVybnNcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgR2V0SWNvbkFuZFRleHQoZGF0YTogSW50ZXJmYWNlLkR0b3MuR1BkaWxGaWxlSW5mb0R0byk6IHsgaWNvbjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgfSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhPy5Ub0Fub255bWl6YXRpb24pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImpyZXM6MzUxMDAwMjFcIiAvL1JDIDM1MTAwMDIxIDogU291Ym9yIGplIG1vxb5uw6kgYW5vbnltaXpvdmF0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXRpbWVzLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwianJlczozNTEwMDAyMlwiIC8vUkMgMzUxMDAwMjIgOiBTb3Vib3IgbmVvYnNhaHVqZSDFvsOhZG7DvSB0ZXh0IGsgYW5vbnltaXphY2lcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLlBkaWwuV2ViQ29udHJvbHMuR19wYXJ0aWFsUHJvY2Vzc0Fub255bWl6YXRpb25GaWxlLnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cbi8vICAgIDxEZXNjcmlwdGlvbj4gQ29udGVudCBwcm8gem9icmF6ZW7DrSBvYnNhaHUgc291Ym9ydSBhIHRha8OpIGRyxb7DrSBzdWJjb250ZW50IHNlIHNlem5hbWVtIGFub255bWl6YWPDrS4gICAgPC9EZXNjcmlwdGlvbj5cbi8vICAgIDxBdXRob3I+ICAgICAgdHJ1emlja2EgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI0LTAzLTI4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxuLy8gIDwvRmlsZUhlYWRlcj5cblxyXG5uYW1lc3BhY2UgR29yZGljLlBkaWwuV2ViQ29udHJvbHMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBFbnVtLCBrdGVyw70gZHLFvsOtIGptw6luYSBha2PDrS5cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGVudW0gR0FjdGlvbk5hbWVzIHtcclxuICAgICAgICBhbm9ueW1pemUgPSBcImFub255bWl6ZVwiLFxyXG4gICAgICAgIHB1YmxpYyA9IFwicHVibGljXCIsXHJcbiAgICAgICAgYnRuQ2xvc2VTdWJ0YXNrID0gXCJidG5DbG9zZVN1YnRhc2tcIixcclxuICAgICAgICBnZ3JpZFNlbGVjdGVkQWN0aW9uID0gXCJnZ3JpZFNlbGVjdGVkQWN0aW9uXCIsXHJcbiAgICAgICAgYW5vbnltaXplQWxsID0gXCJhbm9ueW1pemVBbGxcIixcclxuICAgICAgICBwdWJsaWNBbGwgPSBcInB1YmxpY0FsbFwiLFxyXG4gICAgICAgIGFjdGlvbkNsaWNrID0gXCJhY3Rpb25DbGlja1wiLFxyXG4gICAgICAgIGNvbnRleHRNZW51ID0gXCJjb250ZXh0TWVudVwiLFxyXG4gICAgICAgIG9uQ2xpY2tfY29udGV4dE1lbnUgPSBcIm9uQ2xpY2tfY29udGV4dE1lbnVcIixcclxuICAgICAgICBvbkFub255bWl6ZSA9IFwib25Bbm9ueW1pemVcIixcclxuICAgICAgICBvblB1YmxpYyA9IFwib25QdWJsaWNcIixcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnRlbnQgcHJvIHpvYnJhemVuw60gb2JzYWh1IHNvdWJvcnUgYSB0YWvDqSBkcsW+w60gc3ViY29udGVudCBzZSBzZXpuYW1lbSBhbm9ueW1pemFjw60uXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHX3BhcnRpYWxQcm9jZXNzQW5vbnltaXphdGlvbkZpbGUgZXh0ZW5kcyBHQ29udGVudCBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcbiAgICAgICAgdWlkID0gXCJwcm9jZXNzQW5vbnltaXphdGlvbkZpbGVcIjtcclxuICAgICAgICB0aXRsZSA9IFwianJlczozNTEwMDAwNFwiOyAvL1JDIDM1MTAwMDA0IDogS29udHJvbGEgYW5vbnltaXphY2VcclxuXHJcbiAgICAgICAgJHN1YkNvbnRlbnQ6IEdfcGFydGlhbFByb2Nlc3NBbm9ueW1pemF0aW9uRmlsZVN1YmNvbnRlbnQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgJHBhcmVudDogR19wYXJ0aWFsQW5vbnltaXphdGlvbkZpbGVzO1xyXG4gICAgICAgIHByaXZhdGUgJGNvbnRleHRNZW51OiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSAkY29udGVudENvbnRhaW5lcjogSlF1ZXJ5O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQYXJhbWV0cmlja8O9IGtvbnN0cnVrdG9yIHTFmcOtZHkuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgICAgICAgICBzdXBlcihcIkdBbm9ueW1pemF0aW9uQ2hlY2tcIik7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudCA9IGRhdGE/LnBhcmVudENvbnRlbnQgYXMgR19wYXJ0aWFsQW5vbnltaXphdGlvbkZpbGVzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbihcInJvd1NlbGVjdENoYW5nZVwiLCB0aGlzLm9uUm93U2VsZWN0Q2hhbmdlKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm9uKFwiYW5vbnltaXphdGlvbkNoYW5nZWRcIiwgdGhpcy5vbkFub255bWl6YXRpb25DaGFuZ2VkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZllbsOtIGtvbnRlbnR1LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByZXBhcmVDb250ZW50KCk6IHZvaWQge1xyXG4gICAgICAgICAgICAvLyB2eXR2b8WZZW7DrSBrb250ZXh0b3bDqWhvIG1lbnVcclxuICAgICAgICAgICAgdGhpcy4kY29udGV4dE1lbnUgPSAkLm5ld0RpdihcImNvbnRleHRoZWxwLWlnbm9yZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuJHBhcmVudC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhY3Rpb25jdG1lbnUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImFjdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDA1XCIsIC8vUkMgMzUxMDAwMDUgOiBBbm9ueW1pem92YXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW0dBY3Rpb25OYW1lcy5vbkFub255bWl6ZV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJhY3Rpb25cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTEwMDAwNlwiLCAvL1JDIDM1MTAwMDA2IDogVXZlxZllam5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbR0FjdGlvbk5hbWVzLm9uUHVibGljXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBrb250ZWpuZXIgcHJvIHpvYnJhemVuw60gb2JzYWh1IHNvdWJvcnVcclxuICAgICAgICAgICAgaWYgKHRoaXMuJGNvbnRlbnRDb250YWluZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kY29udGVudENvbnRhaW5lciA9ICQoJzxwcmUgaWQ9XCJmaWxlQ29udGVudFwiIGNsYXNzPVwiYmxhY2htXCI+JylcclxuICAgICAgICAgICAgICAgICAgICAuZW1wdHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLiRwYXJlbnQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gdnl0dm/FmWVuw60gc3ViY29udGVudMWvXHJcbiAgICAgICAgICAgIC8vIHN1YmNvbnRlbnQgcHJvIGdyaWQsIGt0ZXLDvSB6b2JyYXrDrSBzZXpuYW0gZWxlbWVudMWvIGsgYW5vbnltaXphY2lcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHN1YkNvbnRlbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc3ViQ29udGVudCA9IHRoaXMuY3JlYXRlQ29udGVudChcclxuICAgICAgICAgICAgICAgICAgICBHX3BhcnRpYWxQcm9jZXNzQW5vbnltaXphdGlvbkZpbGVTdWJjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgdWlkOiBcImFub255bWl6YXRpb25TdWJjb250ZW50XCIgfSkgYXMgR19wYXJ0aWFsUHJvY2Vzc0Fub255bWl6YXRpb25GaWxlU3ViY29udGVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHN1YkNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAuZG9ja1RvKHRoaXMuJHBhcmVudCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozNTEwMDAwN1wiLCAvL1JDIDM1MTAwMDA3IDogU2V6bmFtIGFub255bWl6YWPDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdpb246IFwibGVmdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmFqaXN0w60gdsO9bcSbbnUgb2JzYWh1IGNvbnRlbnR1IHNvdWJvcnUgaSBzZXpuYW11IGFub255bWl6YWPDrSB2IGdyaWR1IHN1YmNvbnRlbnR1LlxyXG4gICAgICAgICAqIEBwYXJhbSBmaWxlcyBTb3Vib3J5IGsgdsO9bcSbbsSbICh0b0xvYWQgYSB0b1NhdmUpXHJcbiAgICAgICAgICogQHJldHVybnMgVnJhY8OtIHByb21pc2UgdmUgY2h2w61saSwga2R5IGplIHbDvW3Em25hIGRva29uxI1lbmEuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3dpdGNoRmlsZShmaWxlczogeyB0b1NhdmU6IEludGVyZmFjZS5EdG9zLkdQZGlsRmlsZUluZm9EdG8gfCBudWxsIHwgdW5kZWZpbmVkLCB0b0xvYWQ6IEludGVyZmFjZS5EdG9zLkdQZGlsRmlsZUluZm9EdG8gfCBudWxsIHwgdW5kZWZpbmVkIH0pOiBKUXVlcnlQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgY29uc3QgeyB0b0xvYWQsIHRvU2F2ZSB9ID0gZmlsZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAodG9Mb2FkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgLy8gcG9rdWQgbmVleGlzdHVqZSBzb3Vib3IgayBuYcSNdGVuw60sIGplZG7DoSBzZSBvIHDFmWVjaG9kIG5hIHBvc2xlZG7DrVxyXG4gICAgICAgICAgICAgICAgLy8ga3JvayB2ZSB3aXphcmR1IGEgcHJvdG8gc2Ugc3ViY29udGVudCB1bmRvY2tuZS5cclxuICAgICAgICAgICAgICAgIHRoaXMuJHN1YkNvbnRlbnQudW5kb2NrKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJC53aGVuKClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSBuxJtqYWvDvSBzb3Vib3IgayB1bG/FvmVuw60sIHRhayBtdSBha3R1YWxpenVqaSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvU2F2ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHrDrXNrw6FtIHNvdWJvciB2IHBvbGkgc291Ym9yxa8gayBhbm9ueW1pemFjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gdGhpcy4kcGFyZW50Py4kZmlsZXNUb0Fub255bWl6YXRpb24/LmZpbmQoKGFGaWxlKSA9PiB7IHJldHVybiBhRmlsZS5GaWxlTmFtZSA9PT0gdG9TYXZlLkZpbGVOYW1lIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9TYXZlLkZpbGVDb250ZW50ID0gJChcIiNmaWxlQ29udGVudFwiKT8uaHRtbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9TYXZlLkZpbGVDb250ZW50Q2xlYXIgPSAkKFwiI2ZpbGVDb250ZW50XCIpPy50ZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1NhdmUuVG9Bbm9ueW1pemF0aW9uTGlzdCA9IHRoaXMuJHN1YkNvbnRlbnQ/LiRsaXN0T2ZBbm9ueW1pemF0aW9ucztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6w61za8OhbSBqZWhvIGluZGV4IGEgdWxvxb7DrW0gYWt0dWFsaXpvdmFuw70gc2V6bmFtIGsgYW5vbnltaXphY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVJbmRleCA9IHRoaXMuJHBhcmVudD8uJGZpbGVzVG9Bbm9ueW1pemF0aW9uPy5pbmRleE9mKGZpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LiRmaWxlc1RvQW5vbnltaXphdGlvbltmaWxlSW5kZXhdID0gdG9TYXZlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodG9Mb2FkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gesOtc2vDoW0gc291Ym9yIHYgcG9saSBzb3Vib3LFryBrIGFub255bWl6YWNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSB0aGlzLiRwYXJlbnQ/LiRmaWxlc1RvQW5vbnltaXphdGlvbj8uZmluZCgoYUZpbGUpID0+IHsgcmV0dXJuIGFGaWxlLkZpbGVOYW1lID09PSB0b0xvYWQuRmlsZU5hbWUgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdWJDb250ZW50Py5lbGVtZW50LnRyaWdnZXIoXCJmaWxlTG9hZGVkXCIsIHsgbGlzdDogZmlsZS5Ub0Fub255bWl6YXRpb25MaXN0LCBwYXJlbnRDb250ZW50OiB0aGlzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudChmaWxlLkZpbGVDb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9ibm92w60gY29udGVudCB6ZSBzb3Vib3J1LlxyXG4gICAgICAgICAqIEBwYXJhbSBmaWxlQ29udGVudCBPYnNhaCBzb3Vib3J1IGsgem9icmF6ZW7DrS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlZnJlc2hDb250ZW50KGZpbGVDb250ZW50OiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmIChmaWxlQ29udGVudCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuJGNvbnRlbnRDb250YWluZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kY29udGVudENvbnRhaW5lciA9ICQoJzxwcmUgaWQ9XCJmaWxlQ29udGVudFwiIGNsYXNzPVwiYmxhY2htXCI+JylcclxuICAgICAgICAgICAgICAgICAgICAuZW1wdHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLiRwYXJlbnQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kY29udGVudENvbnRhaW5lclxyXG4gICAgICAgICAgICAgICAgLmVtcHR5KClcclxuICAgICAgICAgICAgICAgIC5odG1sKGZpbGVDb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlZ2lzdHJ1amUgYWtjaSBrbGlrbnV0w60gYSBrb250ZXh0b3bDqWhvIG1lbnVcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0dBY3Rpb25OYW1lcy5vbkNsaWNrX2NvbnRleHRNZW51XVxyXG4gICAgICAgICAgICAgICAgPy5yZWdpc3Rlcih0aGlzLiRjb250ZW50Q29udGFpbmVyLCBbXCJjbGlja1wiLCBcImNvbnRleHRtZW51XCJdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFptxJtuw60genbDvXJhem7Em27DrSBlbGVtZW50dSB2IG7DoWhsZWR1IHNvdWJvcnUuXHJcbiAgICAgICAgICogQHBhcmFtIHNwYW5JZCBJRCBzcGFudSBrIHp2w71yYXpuxJtuw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNoYWdlU2VsZWN0aW9uKHNwYW5JZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgICAgICQoXCJzcGFuW2lkXj1hbkl0ZW1fXVwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiI1wiICsgc3BhbklkKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG91emUgcmVnaXN0cnVqZSB2xaFlY2hueSBha2NlLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHQWN0aW9uTmFtZXMuYWN0aW9uQ2xpY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IEdBY3Rpb24uY2FwdGlvblZpc2liaWxpdHkuYWx3YXlzLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2ZW50LCBhY3Rpb25Db250ZXh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZXZlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzID0gJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXCIuanMtYW5vbnltXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldElkOiBzdHJpbmcgPSBzWzBdPy5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3ViQ29udGVudD8uZWxlbWVudC50cmlnZ2VyKFwiY2xpY2tTZWxlY3RDaGFuZ2VcIiwgdGFyZ2V0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdBY3Rpb25OYW1lcy5jb250ZXh0TWVudSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uVmlzaWJsZTogR0FjdGlvbi5jYXB0aW9uVmlzaWJpbGl0eS5hbHdheXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXZlbnQsIGFjdGlvbkNvbnRleHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kY29udGV4dE1lbnUuZ2FjdGlvbmN0bWVudShcIm9wZW5cIiwgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdBY3Rpb25OYW1lcy5vbkNsaWNrX2NvbnRleHRNZW51LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBHQWN0aW9uLmNhcHRpb25WaXNpYmlsaXR5LmFsd2F5cyxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldmVudCwgYWN0aW9uQ29udGV4dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWV2ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcyA9ICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFwiLmpzLWFub255bVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0SWQ6IHN0cmluZyA9IHNbMF0uaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYWdlU2VsZWN0aW9uKHRhcmdldElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3ViQ29udGVudD8uZWxlbWVudC50cmlnZ2VyKFwiY2xpY2tTZWxlY3RDaGFuZ2VcIiwgdGFyZ2V0SWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwiY29udGV4dG1lbnVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kY29udGV4dE1lbnUuZ2FjdGlvbmN0bWVudShcIm9wZW5cIiwgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR0FjdGlvbk5hbWVzLm9uQW5vbnltaXplLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2ZW50LCBhY3Rpb25Db250ZXh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBteVNwYW46IEpRdWVyeTxIVE1MRWxlbWVudD4gPSAkKFwiLnNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdWJDb250ZW50Py5lbGVtZW50LnRyaWdnZXIoXCJjb250ZXh0QW5vbnltQ2hhbmdlZFwiLCB7IGlkOiBteVNwYW4uYXR0cihcImlkXCIpLCBhbm9ueW1pemU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR0FjdGlvbk5hbWVzLm9uUHVibGljLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2ZW50LCBhY3Rpb25Db250ZXh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBteVNwYW46IEpRdWVyeTxIVE1MRWxlbWVudD4gPSAkKFwiLnNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdWJDb250ZW50Py5lbGVtZW50LnRyaWdnZXIoXCJjb250ZXh0QW5vbnltQ2hhbmdlZFwiLCB7IGlkOiBteVNwYW4uYXR0cihcImlkXCIpLCBhbm9ueW1pemU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVkw6Fsb3N0IG5hIHptxJtudSB2eWJyYW7DqWhvIMWZw6Fka3UgdiBHcmlkdVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgb25Sb3dTZWxlY3RDaGFuZ2UoZXZlbnQ6IEpRdWVyeS5FdmVudCB8IG51bGwsIGN0eD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gKHRoaXMgYXMgYW55KT8uY29udGVudCBhcyBHX3BhcnRpYWxQcm9jZXNzQW5vbnltaXphdGlvbkZpbGUgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29udGVudCA9PSBudWxsIHx8IGNvbnRlbnQ/LmNsb3NlZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGxldCBzcGFuZElEOiBzdHJpbmcgPSBjdHg7XHJcbiAgICAgICAgICAgIGxldCBzcGFuVG9NYXJrOiBKUXVlcnk8SFRNTEVsZW1lbnQ+ID0gJChcIiNcIiArIHNwYW5kSUQpO1xyXG5cclxuICAgICAgICAgICAgY29udGVudC5jaGFnZVNlbGVjdGlvbihzcGFuZElEKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwYXJlbnQ6IEpRdWVyeTxIVE1MRWxlbWVudD4gPSAkKFwiI2ZpbGVDb250ZW50XCIpO1xyXG4gICAgICAgICAgICBwYXJlbnQuc2Nyb2xsVG8oc3BhblRvTWFyayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVZMOhbG9zdCwga3RlcsOhIHptxJtuw60gdGV4dCBuYSAqKioqIGEgb2Jyw6FjZW7Em1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgb25Bbm9ueW1pemF0aW9uQ2hhbmdlZChldmVudDogSlF1ZXJ5LkV2ZW50LCBjdHg/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9ICh0aGlzIGFzIGFueSk/LmNvbnRlbnQgYXMgR0Fub255bWl6YXRpb25DaGVjayB8IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgbGV0IHNwYW5Ub0NoYW5nZTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IGN0eC50b0NoYW5nZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwYW5Ub0NoYW5nZV9JRDogc3RyaW5nID0gXCIjXCIgKyBjdHgudG9DaGFuZ2VbaV0uaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgc3BhblRvQ2hhbmdlID0gJChzcGFuVG9DaGFuZ2VfSUQpO1xyXG4gICAgICAgICAgICAgICAgc3BhblRvQ2hhbmdlPy50ZXh0KGN0eC50b0NoYW5nZVtpXS50ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuUGRpbC5XZWJDb250cm9scy5HQW5vbnltaXphdGlvblN1YmNvbnRlbnQudHMgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gWm9icmF6ZW7DrSBzdWJjb250ZW50dSBhIHByb3bDoWTDrSB2bGFzdG7DrSBhbm9ueW5pbWl6YWNpLiAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdHJ1emlja2EgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMDMtMDcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuUGRpbC5XZWJDb250cm9scyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBab2JyYXplbsOtIHN1YmNvbnRlbnR1IGEgcHJvdsOhZMOtIHZsYXN0bsOtIGFub255bmltaXphY2kuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHX3BhcnRpYWxQcm9jZXNzQW5vbnltaXphdGlvbkZpbGVTdWJjb250ZW50IGV4dGVuZHMgR0NvbnRlbnQgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG4gICAgICAgIC8vIHZlxZllam7DqSBwcm9txJtubsOpXHJcbiAgICAgICAgcHVibGljICRsaXN0T2ZBbm9ueW1pemF0aW9uczogR29yZGljLlBkaWwuSW50ZXJmYWNlLkR0b3MuR1BkaWxBbm9ueW1pemVkRWxlbWVudER0b1tdID0gW107XHJcblxyXG4gICAgICAgIC8vIHByaXbDoXRuw60gcHJvbcSbbm7DqVxyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTtcclxuICAgICAgICBwcml2YXRlICR2aWV3OiBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5QZGlsLkludGVyZmFjZS5EdG9zLkdQZGlsQW5vbnltaXplZEVsZW1lbnREdG8+O1xyXG4gICAgICAgIHByaXZhdGUgJG15UGFyZW50Q29udGVudDogR19wYXJ0aWFsUHJvY2Vzc0Fub255bWl6YXRpb25GaWxlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCZXpwYXJhbWV0cmlja8O9IGtvbnN0cnVrdCB0xZnDrWR5LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgICAgICAgICAgc3VwZXIoXCJHX3BhcnRpYWxQcm9jZXNzQW5vbnltaXphdGlvbkZpbGVcIik7XHJcblxyXG4gICAgICAgICAgICAvLyB2eXR2b8WZZW7DrSBha2PDrVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy4kbXlQYXJlbnRDb250ZW50ID0gZGF0YT8ucGFyZW50Q29udGVudCBhcyBHX3BhcnRpYWxQcm9jZXNzQW5vbnltaXphdGlvbkZpbGU7XHJcblxyXG4gICAgICAgICAgICAvLyBvZGNoeWNlbsOtIHVkw6Fsb3N0w60vdHJpZ2Vyxa9cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm9uKFwiZmlsZUxvYWRlZFwiLCB0aGlzLm9uRmlsZUxvYWRlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbihcImNsaWNrU2VsZWN0Q2hhbmdlXCIsIHRoaXMub25DbGlja1NlbGVjdENoYW5nZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbihcImNvbnRleHRBbm9ueW1DaGFuZ2VkXCIsIHRoaXMub25Db250ZXh0QW5vbnltQ2hhbmdlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZvbMOhIHNlIGplZG5vdSBwxZlpIGluaWNpYWxpemFjaSAoYXN5bmNocm9ubsSbKSwgdnl0dsOhxZnDrSBncmlkIHBybyBzZXpuYW0gaXRlbcWvIGsgYW5vbnltaXphY2kuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ6IEdfcGFydGlhbFByb2Nlc3NBbm9ueW1pemF0aW9uRmlsZVN1YmNvbnRlbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gcMWZw61wcmF2YSBrb250ZWpuZXJ1IHBybyBncmlkXHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBob3Juw60gbWVudSB2IHN1YmNvbnRlbnR1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnNbR0FjdGlvbk5hbWVzLmFub255bWl6ZUFsbF0sIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9uc1tHQWN0aW9uTmFtZXMucHVibGljQWxsXSwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZ5dHZvxZllbsOtIHZpZXcgcHJvIGdyaWRcclxuICAgICAgICAgICAgdGhpcy4kdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5QZGlsLkludGVyZmFjZS5EdG9zLkdQZGlsQW5vbnltaXplZEVsZW1lbnREdG8+KFtdLCB7IGtleTogXCJJZFwiIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gc2Ftb3Ruw6kgdnl0dm/FmWVuw60gZ3JpZHVcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZFxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5QZGlsLkludGVyZmFjZS5EdG9zLkdQZGlsQW5vbnltaXplZEVsZW1lbnREdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLiR2aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRNZW51OiB0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtHQWN0aW9uTmFtZXMuYW5vbnltaXplLCBHQWN0aW9uTmFtZXMucHVibGljXSksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhpcy5hY3Rpb25zW0dBY3Rpb25OYW1lcy5nZ3JpZFNlbGVjdGVkQWN0aW9uXSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IChldiwgc2VsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbTogR29yZGljLlBkaWwuSW50ZXJmYWNlLkR0b3MuR1BkaWxBbm9ueW1pemVkRWxlbWVudER0b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBjb250ZW50LiRncmlkLmdncmlkPEdvcmRpYy5QZGlsLkludGVyZmFjZS5EdG9zLkdQZGlsQW5vbnltaXplZEVsZW1lbnREdG8+KFwiYWN0aXZlUm93XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbT8uSHRtbEVsZW1lbnRJZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kbXlQYXJlbnRDb250ZW50Py5lbGVtZW50LnRyaWdnZXIoXCJyb3dTZWxlY3RDaGFuZ2VcIiwgc2VsZWN0ZWRJdGVtLkh0bWxFbGVtZW50SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gc3BvZG7DrSB0bGHEjcOtdGthIHN1YmNvbnRlbnR1XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1xyXG4gICAgICAgICAgICAgICAgICAgIEdBY3Rpb25OYW1lcy5idG5DbG9zZVN1YnRhc2tcclxuICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZZW7DrSBmb3Jtw6F0dSBwcm8gZ3JpZC5cclxuICAgICAgICAgKiBAcmV0dXJucyBWcmFjw60gR3JpZEZvcm1hdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBHR3JpZENvbHVtbjxHb3JkaWMuUGRpbC5JbnRlcmZhY2UuRHRvcy5HUGRpbEFub255bWl6ZWRFbGVtZW50RHRvPltdIHwgRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5QZGlsLkludGVyZmFjZS5EdG9zLkdQZGlsQW5vbnltaXplZEVsZW1lbnREdG8+IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuUGRpbC5JbnRlcmZhY2UuRHRvcy5HUGRpbEFub255bWl6ZWRFbGVtZW50RHRvPigpXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIklkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDA4XCIsIC8vUkMgMzUxMDAwMDggOiBJZFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlR5cGVUZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDA5XCIgLy9SQyAzNTEwMDAwOSA6IFR5cFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkFub255bVRleHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzUxMDAwMTBcIiAvL1JDIDM1MTAwMDEwIDogVGV4dFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIklzQW5ub255bVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTEwMDAxMVwiLCAvL1JDIDM1MTAwMDExIDogQW5vbnltaXpvdsOhbm9cclxuICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAoZGF0YS5Jc0Fubm9ueW0pID8gXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHByb3ZlZGUgYW5vbnltaXphY2kgLyB1dmXFmWVqbsSbbsOtIHp2b2xlbsOpaG8gZWxlbWVudHUuXHJcbiAgICAgICAgICogQHBhcmFtIGFub255bUl0ZW1zIFp2b2xlbsO9IGVsZW1lbnQuXHJcbiAgICAgICAgICogQHBhcmFtIHRvQW5vbnltaXplIFBva3luIGplc3RsaSBhbm9ueW1pem92YXQsIG5lYm8gdXZlxZllam5pdCB6dm9sZW7DvSBlbGVtZW50LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY2hhbmdlQW5vbnltaXphdGlvbihhbm9ueW1JdGVtczogR29yZGljLlBkaWwuSW50ZXJmYWNlLkR0b3MuR1BkaWxBbm9ueW1pemVkRWxlbWVudER0b1tdLCB0b0Fub255bWl6ZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAoYW5vbnltSXRlbXMgPT0gbnVsbCB8fCB0b0Fub255bWl6ZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRleHRzVG9DaGFuZ2U6IHsgaWQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsIHRleHQ6IHN0cmluZyB9W10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFub255bWl6dWplIC8gdXZlxZllam7DrSB2xaFlY2hueSBwb8W+YWRvdmFuw6kgZWxlbWVudHlcclxuICAgICAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IGFub255bUl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhbm9ueW1JdGVtc1tpXS5Jc0Fubm9ueW0gPSB0b0Fub255bWl6ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFRvQ2hhbmdlOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkID0gKGFub255bUl0ZW1zW2ldLklzQW5ub255bSlcclxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZ2V0QW5vbnltaXphdGlvblN0cmluZyhhbm9ueW1JdGVtc1tpXS5Bbm9ueW1UZXh0LCBhbm9ueW1JdGVtc1tpXS5UeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIDogYW5vbnltSXRlbXNbaV0uQW5vbnltVGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dFRvQ2hhbmdlID09PSBudWxsIHx8IHRleHRUb0NoYW5nZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZXh0c1RvQ2hhbmdlLnB1c2goeyBpZDogYW5vbnltSXRlbXNbaV0uSHRtbEVsZW1lbnRJZCwgdGV4dDogdGV4dFRvQ2hhbmdlIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLiR2aWV3LnVwZGF0ZURhdGEoYW5vbnltSXRlbXMsIFwidXBkYXRlXCIpOyAvLyB1cGRhdGUgem3Em27Em27DvWNoIMWZw6Fka8WvXHJcbiAgICAgICAgICAgIHRoaXMuJG15UGFyZW50Q29udGVudD8uZWxlbWVudC50cmlnZ2VyKFwiYW5vbnltaXphdGlvbkNoYW5nZWRcIiwgeyB0b0NoYW5nZTogdGV4dHNUb0NoYW5nZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWPDrSBhbm9ueW1pem92YW7DvSDFmWV0xJt6ZWMuXHJcbiAgICAgICAgICogQHBhcmFtIHRleHRUb0Fub255bWl6YXRpb24gVGV4dCBrIGFub255bWl6YWNpLlxyXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIFR5cCBhbm9ueW1pemFjZS5cclxuICAgICAgICAgKiBAcmV0dXJucyBBbm9ueW1pem92YW7DvSB0ZXh0LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0QW5vbnltaXphdGlvblN0cmluZyh0ZXh0VG9Bbm9ueW1pemF0aW9uOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkLCB0eXBlOiBJbnRlcmZhY2UuRW51bXMuR1BkaWxFbnVtTG9va3VwVHlwZXMuR1BkaWxFbnVtTG9va3VwVHlwZSB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBpZiAodGV4dFRvQW5vbnltaXphdGlvbiA9PT0gbnVsbCB8fCB0ZXh0VG9Bbm9ueW1pemF0aW9uID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQ6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLkVudW1zLkdQZGlsRW51bUxvb2t1cFR5cGVzLkdQZGlsRW51bUxvb2t1cFR5cGUuRW1haWw6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5hbm9ueW1FbWFpbCh0ZXh0VG9Bbm9ueW1pemF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gdGV4dFRvQW5vbnltaXphdGlvbi5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gQXJyYXkoKytsZW5ndGgpLmpvaW4oXCIqXCIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbm9ueW1penVqZSBlbWFpbCBkbyBmb3Jtw6F0dSAqKioqKipAKioqKioqKi4qKlxyXG4gICAgICAgICAqIEBwYXJhbSB0ZXh0VG9Bbm9ueW1pemF0aW9uIEVtYWlsIGsgYW5vbnltaXphY2kuXHJcbiAgICAgICAgICogQHJldHVybnMgQW5vbnltaXpvdmFuw70gZW1haWwuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBhbm9ueW1FbWFpbCh0ZXh0VG9Bbm9ueW1pemF0aW9uOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0ZXh0VG9Bbm9ueW1pemF0aW9uID09PSBudWxsIHx8IHRleHRUb0Fub255bWl6YXRpb24gPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG5cclxuICAgICAgICAgICAgbGV0IHN0YXJ0TGVuZ3RoOiBudW1iZXIgPSB0ZXh0VG9Bbm9ueW1pemF0aW9uLnN1YnN0cmluZygwLCB0ZXh0VG9Bbm9ueW1pemF0aW9uLmxhc3RJbmRleE9mKFwiQFwiKSkubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgZW5kTGVuZ3RoOiBudW1iZXIgPSB0ZXh0VG9Bbm9ueW1pemF0aW9uLnN1YnN0cmluZyh0ZXh0VG9Bbm9ueW1pemF0aW9uLmxhc3RJbmRleE9mKFwiQFwiKSArIDEpLmxlbmd0aDtcclxuICAgICAgICAgICAgbGV0IGRvdEluZGV4ID0gdGV4dFRvQW5vbnltaXphdGlvbi5sYXN0SW5kZXhPZignLicpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEFycmF5KCsrc3RhcnRMZW5ndGgpLmpvaW4oXCIqXCIpICsgJ0AnICsgQXJyYXkoKytlbmRMZW5ndGgpLmpvaW4oXCIqXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnN1YnN0cmluZygwLCBkb3RJbmRleCkgKyAnLicgKyByZXN1bHQuc3Vic3RyaW5nKGRvdEluZGV4ICsgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZw60gc2V6bmFtIGFrY8OtLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHQWN0aW9uTmFtZXMuYW5vbnltaXplLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTEwMDAxMlwiLCAvL1JDIDM1MTAwMDEyIDogQW5vbnltaXpvdmF0IHZ5YnJhbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXZlbnQsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUFub255bWl6YXRpb24oY3R4LnNlbGVjdGlvbiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdBY3Rpb25OYW1lcy5wdWJsaWMsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDEzXCIsIC8vUkMgMzUxMDAwMTMgOiBVdmXFmWVqbml0IHZ5YnJhbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXZlbnQsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUFub255bWl6YXRpb24oY3R4LnNlbGVjdGlvbiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHQWN0aW9uTmFtZXMuYW5vbnltaXplQWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTEwMDAxNFwiLCAvL1JDIDM1MTAwMDE0IDogQW5vbnltaXpvdmF0IHbFoWVcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWV5ZS1zbGFzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2ZW50LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBbm9ueW1pemF0aW9uKHRoaXMuJGxpc3RPZkFub255bWl6YXRpb25zLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR0FjdGlvbk5hbWVzLnB1YmxpY0FsbCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzUxMDAwMTVcIiwgLy9SQyAzNTEwMDAxNSA6IFV2ZcWZZWpuaXQgdsWhZVxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZXllXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXZlbnQsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUFub255bWl6YXRpb24odGhpcy4kbGlzdE9mQW5vbnltaXphdGlvbnMsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIFNrcnlqZS9kZWFrdGl2dWplIHN1YmNvbnRlbnQuXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHQWN0aW9uTmFtZXMuYnRuQ2xvc2VTdWJ0YXNrLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdBY3Rpb25OYW1lcy5nZ3JpZFNlbGVjdGVkQWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5vbnltSXRlbSA9IHRoaXMuJGdyaWQuZ2dyaWQ8R29yZGljLlBkaWwuSW50ZXJmYWNlLkR0b3MuR1BkaWxBbm9ueW1pemVkRWxlbWVudER0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQW5vbnltaXphdGlvbihbYW5vbnltSXRlbV0sICFhbm9ueW1JdGVtLklzQW5ub255bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gRnVua2NlIGt0ZXLDqSBzbG91xb7DrSBqYWtvIG9ic2x1aGEgdWTDoWxvc3TDrVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPYnNsdWhhIHVkw6Fsb3N0aSB2b2zDoW5hIHDFmWkgbmHEjXRlbsOtIHNvdWJvcnUgdiByb2RpxI1vdnNrw6ltIGNvbnRlbnR1LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgb25GaWxlTG9hZGVkKGV2ZW50OiBKUXVlcnkuRXZlbnQsIGN0eD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gKHRoaXMgYXMgYW55KT8uY29udGVudCBhcyBHX3BhcnRpYWxQcm9jZXNzQW5vbnltaXphdGlvbkZpbGVTdWJjb250ZW50IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb250ZW50IHx8IGNvbnRlbnQuY2xvc2VkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgLy8gbmFocmFqZSBzZXpuYW0gZG8gZ3JpZHVcclxuICAgICAgICAgICAgY29udGVudC4kbGlzdE9mQW5vbnltaXphdGlvbnMgPSBjdHgubGlzdDtcclxuICAgICAgICAgICAgY29udGVudC4kdmlldz8udXBkYXRlRGF0YShjb250ZW50LiRsaXN0T2ZBbm9ueW1pemF0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPYnNsdWhhIHVkw6Fsb3N0aSBuYSBrbGlrbnV0w60gbmEgZWxlbWVudCB2IHBvbGkgZG9rdW1lbnR1LCBuaWtvbGl2IHYgZ3JpZHUuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBvbkNsaWNrU2VsZWN0Q2hhbmdlKGV2ZW50OiBKUXVlcnkuRXZlbnQsIGN0eD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gKHRoaXMgYXMgYW55KT8uY29udGVudCBhcyBHX3BhcnRpYWxQcm9jZXNzQW5vbnltaXphdGlvbkZpbGVTdWJjb250ZW50IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVsZW1lbnRJZCA9IGN0eC5yZXBsYWNlKFwiYW5JdGVtX1wiLCBcIlwiKTtcclxuICAgICAgICAgICAgY29udGVudD8uJGdyaWQ/LmdncmlkPEdvcmRpYy5QZGlsLkludGVyZmFjZS5EdG9zLkdQZGlsQW5vbnltaXplZEVsZW1lbnREdG8+KFwiYWN0aXZlUm93XCIsIHsgSWQ6IGVsZW1lbnRJZCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9ic2x1aGEgdWTDoWxvc3RpIG5hIGtsaWtudXTDrSB2IGNvbnRleHRvdsOpbSBtZW51LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgb25Db250ZXh0QW5vbnltQ2hhbmdlZChldmVudDogSlF1ZXJ5LkV2ZW50LCBjdHg/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9ICh0aGlzIGFzIGFueSk/LmNvbnRlbnQgYXMgR19wYXJ0aWFsUHJvY2Vzc0Fub255bWl6YXRpb25GaWxlU3ViY29udGVudCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZW50ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgaXRlbTogR29yZGljLlBkaWwuSW50ZXJmYWNlLkR0b3MuR1BkaWxBbm9ueW1pemVkRWxlbWVudER0byB8IHVuZGVmaW5lZCA9IGNvbnRlbnQuJGxpc3RPZkFub255bWl6YXRpb25zLmZpbmQoaSA9PiBpLkh0bWxFbGVtZW50SWQgPT09IGN0eC5pZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXRlbSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgY29udGVudC5jaGFuZ2VBbm9ueW1pemF0aW9uKFtpdGVtXSwgY3R4LmFub255bWl6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgIH1cclxufSIsIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLlBkaWwuV2ViQ29udHJvbHMuR19wYXJ0aWFsU3VtbWFyeS50cyAgICAgICAgICAgICAgICAgPC9OYW1lPlxuLy8gICAgPERlc2NyaXB0aW9uPiBQb3NsZWRuw60ga3JvayBwcsWvdm9kY2UuIFN1bWFyaXphY2UgdsO9c2xlZGt1IGFub255bWl6YWNlLiAgICA8L0Rlc2NyaXB0aW9uPlxuLy8gICAgPEF1dGhvcj4gICAgICB0cnV6aWNrYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI0LTA0LTI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XG4vLyAgPC9GaWxlSGVhZGVyPlxuXG5uYW1lc3BhY2UgR29yZGljLlBkaWwuV2ViQ29udHJvbHMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUxZnDrWRhIHBvc2xlZG7DrWhvIGtyb2t1IHByxa92b2RjZS4gU3VtYXJpemFjZSB2w71zbGVka3UgYW5vbnltaXphY2UuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHX3BhcnRpYWxTdW1tYXJ5IGV4dGVuZHMgR0NvbnRlbnQgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG4gICAgICAgIHByaXZhdGUgJHBhcmVudDogR0Fub255bWl6YXRpb25DaGVjaztcclxuICAgICAgICBwcml2YXRlICRncmlkVmlld1N1bW1hcnk6IERhdGEuVmlldzxHb3JkaWMuUGRpbC5JbnRlcmZhY2UuRHRvcy5HUGRpbEZpbGVJbmZvRHRvPjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29uc3RydWt0b3IgdMWZw61keS5cclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgICAgICAgICAgc3VwZXIoXCJHQW5vbnltaXphdGlvbkNoZWNrXCIpO1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQgPSBkYXRhLnBhcmVudENvbnRlbnQgYXMgR0Fub255bWl6YXRpb25DaGVjaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmWlwcmF2w60gYSB2eWtyZXNsw60gY2Vsw70gY29udGVudC5cclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByZXBhcmVDb250ZW50KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLiRncmlkVmlld1N1bW1hcnkgPSBuZXcgRGF0YS5WaWV3PEdvcmRpYy5QZGlsLkludGVyZmFjZS5EdG9zLkdQZGlsRmlsZUluZm9EdG8+KFtdLCB7IGtleTogXCJ1aWRcIiB9KTtcclxuICAgICAgICAgICAgJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuY29udGVudERpdilcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuUGRpbC5JbnRlcmZhY2UuRHRvcy5HUGRpbEZpbGVJbmZvRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy4kZ3JpZFZpZXdTdW1tYXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWRWaWV3U3VtbWFyeS51cGRhdGVEYXRhKHRoaXMuJHBhcmVudC4kZmlsZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmcOtIGZvcm3DoXQgcHJvIHNsb3VwY2UgZ3JpZHUuXHJcbiAgICAgICAgICogQHJldHVybnMgRm9ybcOhdG92YW7DvSBncmlkLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNyZWF0ZUdyaWRGb3JtYXQoKTogR0dyaWRDb2x1bW48SW50ZXJmYWNlLkR0b3MuR1BkaWxGaWxlSW5mb0R0bz5bXSB8IERhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuRHRvcy5HUGRpbEZpbGVJbmZvRHRvPiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuUGRpbC5JbnRlcmZhY2UuRHRvcy5HUGRpbEZpbGVJbmZvRHRvPigpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJGaWxlTmFtZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTEwMDAxOFwiIC8vUkMgMzUxMDAwMTggOiBOw6F6ZXYgc291Ym9ydVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkZpbGVTaXplXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDE5XCIsIC8vUkMgMzUxMDAwMTkgOiBWZWxpa29zdCBzb3Vib3J1XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQW5vbnltaXphdGlvbkNvdW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb8SNZXQgYW5vbnptaXphY8OtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZGF0YTogSW50ZXJmYWNlLkR0b3MuR1BkaWxGaWxlSW5mb0R0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3RhbENvdW50OiBudW1iZXIgfCB1bmRlZmluZWQgPSBkYXRhLlRvQW5vbnltaXphdGlvbkxpc3Q/Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5vbnltaXplZDogbnVtYmVyIHwgdW5kZWZpbmVkID0gZGF0YS5Ub0Fub255bWl6YXRpb25MaXN0Py5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uSXNBbm5vbnltID09PSB0cnVlKS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5vbnltaXplZCArIFwiL1wiICsgdG90YWxDb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVG9Bbm9ueW1pemF0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1MTAwMDIwXCIsIC8vUkMgMzUxMDAwMjAgOiBMemUgYW5vbnltaXpvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAoZGF0YTogSW50ZXJmYWNlLkR0b3MuR1BkaWxGaWxlSW5mb0R0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiB0aGlzLkdldEljb25PclRleHQoZGF0YSkuaWNvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IHRoaXMuR2V0SWNvbk9yVGV4dChkYXRhKS50ZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlRvQW5vbnltaXphdGlvblRleHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzUxMDAwMjNcIiwgLy9SQyAzNTEwMDAyMyA6IE9kxa92b2RuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhOiBJbnRlcmZhY2UuRHRvcy5HUGRpbEZpbGVJbmZvRHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLkdldEljb25PclRleHQoZGF0YSkudGV4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY8OtIHRleHQgYSBvZHBvdsOtZGFqw61jw60gaWtvbnUgayBkYW7DqW11IHNvdWJvcnUuXHJcbiAgICAgICAgICogQHBhcmFtIGRhdGFcclxuICAgICAgICAgKiBAcGFyYW0gcmV0dXJuSWNvXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEdldEljb25PclRleHQoZGF0YTogSW50ZXJmYWNlLkR0b3MuR1BkaWxGaWxlSW5mb0R0byk6IHsgaWNvbjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgfSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhPy5Ub0Fub255bWl6YXRpb25MaXN0ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcIlwiLCB0ZXh0OiBcIlwiIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5Ub0Fub255bWl6YXRpb24pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImpyZXM6MzUxMDAwMjVcIiAvL1JDIDM1MTAwMDI1IDogU291Ym9yIGJ5bCBhbm9ueW1pem92w6FuXHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLlRvQW5vbnltaXphdGlvbkxpc3Q/Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtd2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwianJlczozNTEwMDAyNlwiIC8vUkMgMzUxMDAwMjYgOiBTb3Vib3IgbmVieWwgenZvbGVuIGsgYW5vbnltaXphY2lcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS10aW1lcy1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImpyZXM6MzUxMDAwMjdcIiAvL1JDIDM1MTAwMDI3IDogU291Ym9yIG5lb2JzYWhvdmFsIMW+w6FkbsO9IHRleHQgayBhbm9ueW1pemFjaVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5QZGlsLldlYkNvbnRyb2xzIHtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBmb28oKSB7XHJcbiAgICAgICAgY29uc3QgYSA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgbmFtZTogXCJmb29BY3RcIixcclxuICAgICAgICAgICAgcnVuOiAkLm5vb3BcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59Il19
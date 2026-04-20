"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Dks;
    (function (Dks) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * DKS - online konverzní služba
             */
            let GDksConvertService = class GDksConvertService extends Gordic.GContentBase {
                onContentReady() {
                    this.init();
                }
                init() {
                    this.gfile = new GFile();
                    this.utils = new WebControls.GDksUtils();
                    this.createMenubar();
                    this.createForm();
                    this.createGrid();
                }
                createForm() {
                    this.utils.createFileForm(this.element, WebControls.GDksDialogTypeEnum.konverze, true);
                }
                createMenubar() {
                    var params = [];
                    params.push({
                        primary: true,
                        favorite: true,
                        action: new GAction({
                            name: "actConvert",
                            icon: "gi-convert",
                            caption: "jres:32000006", //RC 32000006 : Konvertovat
                            run: () => {
                                this.convert();
                            }
                        })
                    });
                    params.push({
                        favorite: true,
                        action: new GAction({
                            name: "actDownload",
                            icon: "gi-download",
                            caption: "jres:32000012", //RC 32000012 : Stáhnout
                            tooltip: "jres:32000013", //RC 32000013 : Stáhnout soubor po konverzi
                            run: () => {
                                this.downloadMulti();
                            }
                        })
                    });
                    this.menuBar(params);
                }
                closing() {
                    this.removeInputFileOnClosing();
                    this.removeResultFileOnClosing();
                    return true;
                }
                removeInputFileOnClosing() {
                    var values = this.findFields("file").gfield("getValue");
                    for (var i = 0; i < values.length; i++)
                        this.removeFiles(values[i].guid);
                }
                removeResultFileOnClosing() {
                    var values = this.view.getDataRows();
                    for (var i = 0; i < values.length; i++)
                        this.removeFiles(values[i].guid);
                }
                removeFiles(guid) {
                    this.gfile.removeFile(guid).then(function () {
                        console.log("smazano");
                    }, function () { console.log("nesmazano"); });
                }
                /**
                  * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
                  *
                  * @param {JQuery<HTMLElement>} form předaný element formuláře
                  * @returns {JQueryPromise<boolean>} výsledek stavu
                  */
                waitForValues(form) {
                    var dfd = $.Deferred();
                    form.gform("waitForValues")
                        .then(() => {
                        return form.gform("isValid");
                    })
                        .then((isValid) => {
                        dfd.resolve(isValid);
                    })
                        .fail(() => {
                        dfd.reject(false);
                    });
                    return dfd.promise();
                }
                convert() {
                    this.hideFlash("idConvert");
                    this.hideFlash("idConvert2");
                    var dto = {};
                    this.findFields().gfield("model", "collect", dto);
                    if (dto.file == null || dto.file.length === 0 || dto.target == null) {
                        this.showFlash({
                            id: "idConvert",
                            state: "warning",
                            content: "jres:32000014" //RC 32000014 : Nebyla zadána povinná hodnota.
                        });
                        return;
                    }
                    this.call("Convert", { Dto: dto })
                        .then((res) => {
                        this.showFlash({
                            id: "idConvert",
                            state: "success",
                            content: "jres:32000010" //RC 32000010 : Konverze byla úspěšně dokončena.
                        });
                        this.showFlash({ content: "jres:32000011", id: "idConvert2" }); //RC 32000011 : Pro stažení souboru dvojklikněte na řádek v seznamu nebo na příslušné tlačítko "Stáhnout" v menu.
                        this.view.updateData(res);
                    })
                        .always(() => {
                        // thazmuka (06.09.2021) - mažu vždy, ošetření v případě chyby
                        this.findFields("file").gfilefield("clear");
                    });
                }
                createGrid() {
                    this.view = new Gordic.Data.View();
                    var grid = $("<div>").appendTo(this.element);
                    var format = this.setFormatGrid();
                    var searchColumns = this.utils.getSearchColumns(format);
                    grid.ggrid({
                        multi: true,
                        name: "dksConvertGrid",
                        searchColumns: searchColumns,
                        data: this.view,
                        columns: format,
                        defaultAction: new GAction({
                            name: "dksConvertGridAct",
                            run: (ev, ctx) => {
                                var row = ctx.cellInfo.data;
                                this.gfile.download({ guid: row.guid }, "Gordic.Gui.WebControls.GIcsDownload");
                            }
                        }),
                    }).gautofit();
                }
                downloadMulti() {
                    var values = this.view.getDataRows();
                    if (values == null || values.length === 0) {
                        this.showFlash("jres:32000015"); //RC 32000015 : Nejsou k dispozici žádné soubory ke stažení.
                        return;
                    }
                    for (var i = 0; i < values.length; i++)
                        this.gfile.download({ guid: values[i].guid }, "Gordic.Gui.WebControls.GIcsDownload");
                }
                setFormatGrid() {
                    var format = new Gordic.Data.GridFormat();
                    format
                        .addTextColumn({ name: "name", caption: "jres:32000008", width: 50 }) //RC 32000008 : Název souboru
                        .addTextColumn({ name: "oldext", caption: "jres:32000009", width: 50 }); //RC 32000009 : Původní koncovka
                    return format;
                }
            };
            GDksConvertService = __decorate([
                gcontent
            ], GDksConvertService);
            WebControls.GDksConvertService = GDksConvertService;
        })(WebControls = Dks.WebControls || (Dks.WebControls = {}));
    })(Dks = Gordic.Dks || (Gordic.Dks = {}));
})(Gordic || (Gordic = {}));
// - zobrazit flash v případě nezadání povinných hodnot - validator se na tomto dialogu nehodí
var Gordic;
(function (Gordic) {
    var Dks;
    (function (Dks) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            let GDksSignatureVerification = class GDksSignatureVerification extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.asyncTaskName = "Gordic.Wfl.Server.GOveritPodpisAsyncTask";
                    //#endregion
                }
                onContentReady() {
                    this.init();
                }
                init() {
                    this.overitUtils = new Gordic.Wfl.WebClient.GOveritPodpisUtils(this, false);
                    this.utils = new WebControls.GDksUtils();
                    this.createMenubar();
                    this.createForm();
                    this.createGrid([]);
                }
                createForm() {
                    this.utils.createFileForm(this.element, WebControls.GDksDialogTypeEnum.overeniPodpisu, true);
                }
                loadSignatureVerification(fileList, progress) {
                    var total = fileList.length;
                    this.progressOperation({ id: "idOpVerifySignature", progress: progress, total: total });
                    // konec operace
                    if (total === progress) {
                        this.endOperation("idOpVerifySignature");
                        return;
                    }
                    var file = fileList[progress];
                    if (file == null) { // nemělo by nastávat, je to tu pro jistotu
                        console.error("Neočekávané ukončení operace, cyklus se pravděpodobně dostal mimo stanovený rozsah.");
                        this.endOperation("idOpVerifySignature");
                        return;
                    }
                    var cnt = $("<div>").appendTo(this.signatureResult);
                    if (cnt.hasClass("gcontent") == false)
                        cnt.gcontent("Gordic.Wfl.WebClient.GOveritPodpis");
                    cnt.gcontent("load", { ID: "WflGOveritPodpis#", taskId: "WflGOveritPodpisTaskId", Guid: file.guid, Filename: file.filename })
                        .then(() => {
                        this.loadSignatureVerification(fileList, ++progress);
                    });
                }
                createMenubar() {
                    var params = [];
                    params.push({
                        primary: true,
                        favorite: true,
                        action: new GAction({
                            name: "actVerifySignature",
                            icon: "gi-sign",
                            caption: "jres:32000016", //RC 32000016 : Ověřit podpis
                            run: () => {
                                this.run();
                            }
                        })
                    });
                    this.menuBar(params);
                }
                run() {
                    this.hideFlash("idFlashVerify");
                    var dto = {};
                    this.findFields().gfield("model", "collect", dto);
                    if (dto != null && dto.file != null && dto.file.length > 0) {
                        var progress = 0;
                        var result = [];
                        var total = dto.file.length;
                        this.beginOperation({
                            progress: progress,
                            total: total,
                            id: "idOpVerify",
                            text: "Probíhá ověření podpisu..."
                        });
                        this._run(dto.file, progress, result);
                    }
                    else {
                        this.showFlash({
                            id: "idFlashVerify",
                            state: "warning",
                            content: "Pro spuštění ověření souboru vyberte soubor."
                        });
                    }
                }
                _run(fileList, progress, result) {
                    var total = fileList.length;
                    this.progressOperation({ id: "idOpVerify", progress: progress, total: total });
                    // konec operace
                    if (total === progress) {
                        this.Dto = result; // thazmuka (26.10.2021) doplnění
                        var treeList = this.createMainTree(result);
                        this.view.updateData(treeList);
                        this.endOperation("idOpVerify");
                        return;
                    }
                    var item = fileList[progress];
                    if (item == null) { // nemělo by nastávat, je to tu pro jistotu
                        console.error("Neočekávané ukončení operace, cyklus se pravděpodobně dostal mimo stanovený rozsah.");
                        this.endOperation("idOpVerify");
                        return;
                    }
                    Gordic.Async.GTaskManager.start(this.asyncTaskName, { Filename: item.filename, Guid: item.guid }).getPromise()
                        .then((output) => {
                        if (output != null) {
                            var outputResult = output.result;
                            if (outputResult != null && outputResult.Result != null) {
                                outputResult.RootIndex = progress;
                                result.push(outputResult);
                            }
                        }
                        this._run(fileList, ++progress, result);
                    })
                        .fail(() => {
                        this.endOperation("idOpVerify");
                    });
                }
                createMainTree(list) {
                    var result = [];
                    for (var x = 0; x < list.length; x++) {
                        var item = list[x];
                        var optInput = {
                            Input: item.Input,
                            RootIndex: item.RootIndex
                        };
                        var dto = this.overitUtils.createTree(item.Result, optInput);
                        result = result.concat(dto);
                    }
                    return result;
                }
                createGrid(tree) {
                    //this.paramsLinearized je pole objektu, kde každý objekt ma property id a parentId (+ dalsi). Pokud objekt nemá parenta, staci setnout parentId na null
                    let treeProcessor = new Gordic.Data.Tree(Gordic.Data.Tree.parentIdOrganizer("parentId") /*, { defaultState: "open" }*/);
                    this.view = new Gordic.Data.View(tree, { key: "id", processors: { tree: treeProcessor } });
                    this.grid = $("<div>").gautofit().appendTo(this.element);
                    this.grid.ggrid({
                        rowsClass: (row) => {
                            if (row.data.flag === "idRoot")
                                return "ggrid-condf-bg-gray";
                            return "";
                        },
                        data: this.view,
                        name: "stromogrid",
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit (defaultne by melo byt toto), full
                        customClass: "js-grid-strom",
                        navigationMode: "row", // row, cell
                        columns: this.overitUtils.createGridFormat(),
                        defaultAction: new GAction({
                            name: "actDoubleClickOvereniPodepsani",
                            run: (ev, ctx) => {
                                if (ctx.cellInfo.data.flag === "idCertifikatVystavitelInfo" || ctx.cellInfo.data.flag === "idCertifikatPodrobnosti") {
                                    var cert = ctx.cellInfo.data.certificate;
                                    if (cert.RawData == null) {
                                        //RC 32000537 : Upozornění
                                        //RC 32000536 : Bližší informace o certifikátu nejsou dostupné.
                                        this.dialogs.alert("jres:32000039", "jres:32000040", 470, 150); //RC 32000040 : Bližší informace o certifikátu nejsou dostupné.
                                    }
                                    else {
                                        Gordic.Wfl.Dialogs.GDetailCertifikatuDlg(this, { cert: ctx.cellInfo.data.certificate }, Gordic.Global.Enums.ModOtevreni.showModalWindow);
                                    }
                                }
                            }
                        }),
                        contextMenu: this.createContextMenu()
                    });
                }
                //#region -- contextmenu --
                createContextMenu() {
                    const params = [];
                    params.push({
                        favorite: true,
                        action: this.addActionOveritPodpisDetail()
                    });
                    return params;
                }
                addActionOveritPodpisDetail() {
                    return this.actions.add(new GAction({
                        name: "actOveritPodpisDetail",
                        caption: "jres:32000038", //RC 32000038 : Doplňující informace
                        run: (ev, obj) => {
                            this.hideFlash("overitPodpisDetailActionFlashId");
                            if (this.grid == null || this.closed === true)
                                return;
                            var row = this.grid.ggrid("activeRow");
                            if (row != null && row.index != null) {
                                if (this.Dto != null) {
                                    if (row.rootIndex == null) {
                                        console.error("RootIndex není naplněn.");
                                        return;
                                    }
                                    var item = this.Dto[row.rootIndex];
                                    if (item != null && item.Result != null && item.Result.Items != null) {
                                        var selectItem = item.Result.Items[row.index];
                                        Gordic.Wfl.Dialogs.GOveritPodpisDetailDlg(this, { Dto: selectItem, Ixp: this.Ixp }, Gordic.Global.Enums.ModOtevreni.showModalWindow);
                                        return;
                                    }
                                }
                                console.error("Dialog ověření podpisu s doplňujícími informacemi o ověření nelze otevřít. Pravděpodobně nejsou naplněna vstupní data.");
                            }
                            else {
                                this.showFlash({
                                    content: "jres:32000037", //RC 32000037 : Vyberte aktivní řádek
                                    state: "info",
                                    id: "overitPodpisDetailActionFlashId"
                                });
                            }
                        }
                    }));
                }
            };
            GDksSignatureVerification = __decorate([
                gcontent
            ], GDksSignatureVerification);
            WebControls.GDksSignatureVerification = GDksSignatureVerification;
        })(WebControls = Dks.WebControls || (Dks.WebControls = {}));
    })(Dks = Gordic.Dks || (Gordic.Dks = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Dks;
    (function (Dks) {
        var WebControls;
        (function (WebControls) {
            /** typ dialogu DKS05 */
            let GDksDialogTypeEnum;
            (function (GDksDialogTypeEnum) {
                GDksDialogTypeEnum[GDksDialogTypeEnum["konverze"] = 1] = "konverze";
                GDksDialogTypeEnum[GDksDialogTypeEnum["validacePdfa"] = 2] = "validacePdfa";
                GDksDialogTypeEnum[GDksDialogTypeEnum["overeniPodpisu"] = 3] = "overeniPodpisu";
            })(GDksDialogTypeEnum = WebControls.GDksDialogTypeEnum || (WebControls.GDksDialogTypeEnum = {}));
            class GDksUtils {
                /** vrať sloupce na prohledávání */
                getSearchColumns(format) {
                    var searchColumns = [];
                    for (var index = 0; index < format.columns.length; index++) {
                        var columns = format.columns[index];
                        if (columns.name != null)
                            searchColumns.push(columns.name);
                    }
                    return searchColumns;
                }
                createFileForm(element, type, multi, fileRemoved, fileUploaded) {
                    var form = $("<div>").appendTo(element);
                    var Form = new Gordic.Forms.Form({ name: "GDksConvertServiceForm", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" });
                    Form
                        .addSection("");
                    Form
                        .addRow({
                        required: true,
                        label: "jres:32000002" //RC 32000002 : Vyberte soubor
                    })
                        .addField("gfilefield", {
                        maxFileCount: multi == false ? 1 : 100,
                        //validators: [new Gordic.Validators.Required()],
                        name: "file",
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply": // naplneni multivalue policka z DTO
                                    var val = [];
                                    //if (dto.dictLikeProperty)
                                    //	for (var k in dto.dictLikeProperty) val.push({ klic: k, hodnota: dto.dictLikeProperty[k] });
                                    $(this).gfield("setValue", val);
                                    return;
                                case "collect": // naplneni DTO hodnotou z multivalue policka (vraci vzdy pole)
                                    dto["file"] = [];
                                    $(this).gfield("getValue").forEach(function (it) {
                                        dto["file"].push({
                                            guid: it.guid,
                                            filename: it.filename
                                        });
                                    });
                                    return;
                            }
                            return "file"; // model="dictLikeProperty" pro pouziti vychoziho procesoru pro operace kterym nerozumime (validations, validators, ...)
                        },
                        fileRemoved: (ev, obj) => {
                            if (fileRemoved != null)
                                fileRemoved(ev, obj);
                        },
                        fileUploaded: (ev, obj) => {
                            if (fileUploaded != null)
                                fileUploaded(ev, obj);
                        },
                        fileDownloaded: function (ev, obj) {
                            // soubor byl stažen
                        },
                        itemWidth: "w-6"
                    });
                    if (type === GDksDialogTypeEnum.konverze) {
                        var typeFileData = [];
                        var pdfA1b = { value: 1, caption: "PDF/A-1b" };
                        var pdfA2b = { value: 2, caption: "PDF/A-2b" };
                        typeFileData.push(pdfA1b);
                        typeFileData.push(pdfA2b);
                        Form
                            .addRow({
                            required: true,
                            label: "jres:32000003" //RC 32000003 : Vyberte cílový typ souboru
                        })
                            .addField("gselectbox", {
                            //validators: [new Gordic.Validators.Required()],
                            name: "target",
                            model: "model.target=value.value",
                            initialValue: pdfA2b,
                            data: typeFileData,
                            dropdown: true,
                            itemTemplate: (data) => {
                                return data?.caption;
                            }
                        });
                        Form
                            .addRow()
                            .addField("gcheck", {
                            initialValue: false,
                            name: "ocr",
                            label: "jres:32000004" //RC 32000004 : Provést OCR
                        });
                        Form
                            .addRow()
                            .addField("gcheck", {
                            change: (ev, obj) => {
                                var element = form.findFields("convertAttachments");
                                var value = obj.value === true ? false : true;
                                element.gfield("option", { disabled: value });
                                if (value === true) // pokud je hodnota nezaškrtnuta - shodím hodnotu položky konvertovat
                                    element.gfield("setValue", false);
                            },
                            initialValue: false,
                            name: "insertAttachments",
                            tooltip: "jres:32000042", //RC 32000042 : Vložit vnořené soubory např. pdf, eml
                            label: "jres:32000041" //RC 32000041 : Vložit vnořené soubory
                        });
                        Form
                            .addRow()
                            .addField("gcheck", {
                            disabled: true,
                            initialValue: false,
                            name: "convertAttachments",
                            tooltip: "jres:32000044", //RC 32000044 : Konvertovat vnořené soubory např. pdf, eml
                            label: "jres:32000043" //RC 32000043 : Konvertovat vnořené soubory
                        });
                        Form
                            .addRow()
                            .addField("gformtext", {
                            html: "jres:32000005" //RC 32000005 : Tato operace může trvat v závislosti na velikosti vstupního souboru i několik minut.
                        });
                    }
                    form.gform("createFrom", Form);
                    form.findFields("file").gfilefield("addDropzone");
                }
            }
            WebControls.GDksUtils = GDksUtils;
        })(WebControls = Dks.WebControls || (Dks.WebControls = {}));
    })(Dks = Gordic.Dks || (Gordic.Dks = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Dks;
    (function (Dks) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            ;
            /**
             * DKS - validace PDF/A
             */
            let GDksValidatePdfa = class GDksValidatePdfa extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.fileInfo = null;
                }
                onContentReady() {
                    this.init();
                }
                init() {
                    this.utils = new WebControls.GDksUtils();
                    this.createForm();
                    this.createMenubar();
                    this.createGrid();
                }
                createForm() {
                    this.utils.createFileForm(this.element, WebControls.GDksDialogTypeEnum.validacePdfa, true);
                }
                createMenubar() {
                    var params = [];
                    params.push({
                        primary: true,
                        favorite: true,
                        action: new GAction({
                            name: "actValidatePdfa",
                            icon: "",
                            caption: "jres:32000018", //RC 32000018 : Ověření validace PDF/A
                            run: () => {
                                this.hideFlash("idFlashValidatePdfa");
                                var dto = {};
                                this.findFields().gfield("model", "collect", dto);
                                if (dto != null && dto.file != null && dto.file.length > 0) {
                                    var fileList = dto.file;
                                    var progressNumber = 0;
                                    this.beginOperation({
                                        progress: progressNumber,
                                        total: fileList.length,
                                        id: "idOpValidatePdfa",
                                        text: "jres:32000027" //RC 32000027 : Probíhá validace...
                                    });
                                    this.view.updateData([]); // clear
                                    this.runValidation(fileList, progressNumber);
                                }
                                else {
                                    this.showFlash({
                                        id: "idFlashValidatePdfa",
                                        state: "warning",
                                        content: "jres:32000019" //RC 32000019 : Pro spuštění validace PDF/A vyberte soubor.
                                    });
                                }
                            }
                        })
                    });
                    this.menuBar(params);
                }
                runValidation(fileList, progress) {
                    var total = fileList.length;
                    this.progressOperation({ id: "idOpValidatePdfa", progress: progress, total: total });
                    // konec operace
                    if (total === progress) {
                        this.endOperation("idOpValidatePdfa");
                        return;
                    }
                    var file = fileList[progress];
                    if (file == null) { // nemělo by nastávat, je to tu pro jistotu
                        console.error("Neočekávané ukončení operace, cyklus se pravděpodobně dostal mimo stanovený rozsah.");
                        this.endOperation("idOpValidatePdfa");
                        return;
                    }
                    Gordic.Isl.Dks.isValidPdfA({ Guid: file.guid }).getData()
                        .then((res) => {
                        var results = res.Results;
                        if (results != null && results.length > 0) {
                            results.map((item) => {
                                item["FileName"] = file.filename;
                            });
                            this.view.updateData(results, "add");
                        }
                    })
                        .done(() => {
                        this.runValidation(fileList, ++progress);
                    });
                }
                setGroupingProcessor(view) {
                    var groupList = [];
                    var fileName = {
                        defaultState: "open",
                        hash: (meta, rows) => {
                            return meta.data.FileName;
                        }
                    };
                    groupList.push(fileName);
                    view.process({
                        default: new Gordic.Data.Grouping(groupList)
                    });
                }
                createGrid() {
                    this.view = new Gordic.Data.View();
                    this.setGroupingProcessor(this.view);
                    var grid = $("<div>").appendTo(this.element);
                    var format = this.setFormatGrid();
                    var searchColumns = new WebControls.GDksUtils().getSearchColumns(format);
                    grid.ggrid({
                        name: "dksValidatePdfaGrid",
                        searchColumns: searchColumns,
                        data: this.view,
                        columns: format,
                    }).gautofit();
                }
                setFormatGrid() {
                    var format = new Gordic.Data.GridFormat();
                    format
                        .addIconColumn({
                        name: "Result",
                        description: "jres:32000028", //RC 32000028 : Stav výsledku validace
                        caption: "jres:32000028", //RC 32000028 : Stav výsledku validace
                        width: 30,
                        customClass: "center",
                        formatPreset: "icon",
                        iconTemplate: (data) => {
                            var template = { icon: "", tooltip: "", text: "" };
                            if (data.Result === true) {
                                template.icon = "fa-check-circle g-state-text g-state-success";
                                template.text = "jres:32000030"; //RC 32000030 : Validace dopadla úspěšně.
                                template.tooltip = template.text;
                            }
                            else {
                                template.icon = "fa-times-circle g-state-text g-state-error";
                                template.text = "jres:32000031"; //RC 32000031 : Validace se nezdařila.
                                template.tooltip = template.text;
                            }
                            return template;
                        }
                    })
                        .addTextColumn({ name: "FileName", caption: "jres:32000026", width: 50 }) //RC 32000026 : Název souboru
                        .addTextColumn({ name: "PluginName", caption: "jres:32000023", width: 50 }) //RC 32000023 : Název
                        .addTextColumn({ name: "StringResult", caption: "jres:32000025", width: 50 }); //RC 32000025 : Výsledek
                    return format;
                }
            };
            GDksValidatePdfa = __decorate([
                gcontent
            ], GDksValidatePdfa);
            WebControls.GDksValidatePdfa = GDksValidatePdfa;
        })(WebControls = Dks.WebControls || (Dks.WebControls = {}));
    })(Dks = Gordic.Dks || (Gordic.Dks = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGtzLndlYmNvbnRyb2xzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJHRGtzQ29udmVydFNlcnZpY2UudHMiLCJHRGtzU2lnbmF0dXJlVmVyaWZpY2F0aW9uLnRzIiwiR0Rrc1V0aWxzLnRzIiwiR0Rrc1ZhbGlkYXRlUGRmYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBMkxmO0FBM0xELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTJMbkI7SUEzTGdCLFdBQUEsR0FBRztRQUFDLElBQUEsV0FBVyxDQTJML0I7UUEzTG9CLFdBQUEsV0FBVztZQUUvQixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBRWhDOztlQUVHO1lBRUgsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxPQUFBLFlBQWlCO2dCQU1qRCxjQUFjO29CQUNwQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2IsQ0FBQztnQkFFTyxJQUFJO29CQUNYLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFlBQUEsU0FBUyxFQUFFLENBQUM7b0JBQzdCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ25CLENBQUM7Z0JBRU8sVUFBVTtvQkFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxZQUFBLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDdEUsQ0FBQztnQkFFQyxhQUFhO29CQUNwQixJQUFJLE1BQU0sR0FBaUIsRUFBRSxDQUFDO29CQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNYLE9BQU8sRUFBRSxJQUFJO3dC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QyxJQUFJLEdBQUcsNENBQTRDLENBQUM7Z0NBQzdELFFBQVEsQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDLENBQUMsc0NBQXNDO2dDQUN2RSxRQUFRLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7NEJBQ2xDLENBQUM7NEJBQ0QsT0FBTyxRQUFRLENBQUM7d0JBQ2pCLENBQUM7cUJBQ0QsQ0FBQzt5QkFFRCxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsNkJBQTZCO3lCQUN0RyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMscUJBQXFCO3lCQUNoRyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQyx3QkFBd0I7b0JBRXZHLE9BQU8sTUFBTSxDQUFDO2dCQUNULENBQUM7YUFFSixDQUFBO1lBcEtZLGdCQUFnQjtnQkFENUIsUUFBUTtlQUNJLGdCQUFnQixDQW9LNUI7WUFwS1ksNEJBQWdCLG1CQW9LNUIsQ0FBQTtRQUVMLENBQUMsRUF6TG9CLFdBQVcsR0FBWCxlQUFXLEtBQVgsZUFBVyxRQXlML0I7SUFBRCxDQUFDLEVBekxnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF5TG5CO0FBQUQsQ0FBQyxFQXpMUyxNQUFNLEtBQU4sTUFBTSxRQXlMZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuRGtzLldlYkNvbnRyb2xzIHtcclxuXHJcblx0Y29uc3QgeyBnY29udGVudCB9ID0gRGVjb3JhdG9ycztcclxuXHJcblx0LyoqXHJcblx0ICogREtTIC0gb25saW5lIGtvbnZlcnpuw60gc2x1xb5iYVxyXG5cdCAqL1xyXG5cdEBnY29udGVudFxyXG5cdGV4cG9ydCBjbGFzcyBHRGtzQ29udmVydFNlcnZpY2UgZXh0ZW5kcyBHQ29udGVudEJhc2U8YW55PiB7XHJcblxyXG5cdFx0cHJpdmF0ZSB1dGlsczpHRGtzVXRpbHM7XHJcblx0XHRwcml2YXRlIHZpZXc6IEdvcmRpYy5EYXRhLlZpZXc7XHJcblx0XHRwcml2YXRlIGdmaWxlOiBHRmlsZTtcclxuXHJcblx0XHRwdWJsaWMgb25Db250ZW50UmVhZHkoKSB7XHJcblx0XHRcdHRoaXMuaW5pdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgaW5pdCgpIHtcclxuXHRcdFx0dGhpcy5nZmlsZSA9IG5ldyBHRmlsZSgpO1xyXG5cdFx0XHR0aGlzLnV0aWxzID0gbmV3IEdEa3NVdGlscygpO1xyXG5cdFx0XHR0aGlzLmNyZWF0ZU1lbnViYXIoKTtcclxuXHRcdFx0dGhpcy5jcmVhdGVGb3JtKCk7XHJcblx0XHRcdHRoaXMuY3JlYXRlR3JpZCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuXHRcdFx0dGhpcy51dGlscy5jcmVhdGVGaWxlRm9ybSh0aGlzLmVsZW1lbnQsIEdEa3NEaWFsb2dUeXBlRW51bS5rb252ZXJ6ZSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdHByaXZhdGUgY3JlYXRlTWVudWJhcigpIHtcclxuXHRcdFx0dmFyIHBhcmFtczogTWVudVBhcmFtc1tdID0gW107XHJcblx0XHRcdHBhcmFtcy5wdXNoKHtcclxuXHRcdFx0XHRwcmltYXJ5OiB0cnVlLFxyXG5cdFx0XHRcdGZhdm9yaXRlOiB0cnVlLFxyXG5cdFx0XHRcdGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG5cdFx0XHRcdFx0bmFtZTogXCJhY3RDb252ZXJ0XCIsXHJcblx0XHRcdFx0XHRpY29uOiBcImdpLWNvbnZlcnRcIixcclxuXHRcdFx0XHRcdGNhcHRpb246IFwianJlczozMjAwMDAwNlwiLCAvL1JDIDMyMDAwMDA2IDogS29udmVydG92YXRcclxuXHRcdFx0XHRcdHJ1bjogKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmNvbnZlcnQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHBhcmFtcy5wdXNoKHtcclxuXHRcdFx0XHRmYXZvcml0ZTogdHJ1ZSxcclxuXHRcdFx0XHRhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiYWN0RG93bmxvYWRcIixcclxuXHRcdFx0XHRcdGljb246IFwiZ2ktZG93bmxvYWRcIixcclxuXHRcdFx0XHRcdGNhcHRpb246IFwianJlczozMjAwMDAxMlwiLCAvL1JDIDMyMDAwMDEyIDogU3TDoWhub3V0XHJcblx0XHRcdFx0XHR0b29sdGlwOiBcImpyZXM6MzIwMDAwMTNcIiwgLy9SQyAzMjAwMDAxMyA6IFN0w6Fobm91dCBzb3Vib3IgcG8ga29udmVyemlcclxuXHRcdFx0XHRcdHJ1bjogKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmRvd25sb2FkTXVsdGkoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5tZW51QmFyKHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdGNsb3NpbmcoKSB7XHJcblx0XHRcdHRoaXMucmVtb3ZlSW5wdXRGaWxlT25DbG9zaW5nKCk7XHJcblx0XHRcdHRoaXMucmVtb3ZlUmVzdWx0RmlsZU9uQ2xvc2luZygpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHJlbW92ZUlucHV0RmlsZU9uQ2xvc2luZygpIHtcclxuXHRcdFx0dmFyIHZhbHVlczogR29yZGljLkdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR0ZpbGVJbmZvRHRvW10gPSB0aGlzLmZpbmRGaWVsZHMoXCJmaWxlXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKylcclxuXHRcdFx0XHR0aGlzLnJlbW92ZUZpbGVzKHZhbHVlc1tpXS5ndWlkISk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSByZW1vdmVSZXN1bHRGaWxlT25DbG9zaW5nKCkge1xyXG5cdFx0XHR2YXIgdmFsdWVzOiBHb3JkaWMuRGtzLldlYkNvbnRyb2xzLkdEa3NDb252ZXJ0U2VydmljZU91dHB1dER0b1tdID0gdGhpcy52aWV3LmdldERhdGFSb3dzKCk7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRcdHRoaXMucmVtb3ZlRmlsZXModmFsdWVzW2ldLmd1aWQhKTtcclxuICAgICAgICB9XHJcblxyXG5cdFx0cHJpdmF0ZSByZW1vdmVGaWxlcyhndWlkOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy5nZmlsZS5yZW1vdmVGaWxlKGd1aWQpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwic21hemFub1wiKVxyXG5cdFx0XHR9LCBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKFwibmVzbWF6YW5vXCIpIH0pXHJcbiAgICAgICAgfVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICAqIG1ldG9kYSwga3RlcsOhIHp2YWxpZHVqZSBmb3JtdWzDocWZIGEgdnLDoXTDrSB2w71zbGVkZWsgdmFsaWRhY2UgYcW+IGplIGZvcm11bMOhxZkgcMWZaXByYXZlblxyXG5cdFx0ICAqIFxyXG5cdFx0ICAqIEBwYXJhbSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn0gZm9ybSBwxZllZGFuw70gZWxlbWVudCBmb3JtdWzDocWZZVxyXG5cdFx0ICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPGJvb2xlYW4+fSB2w71zbGVkZWsgc3RhdnVcclxuXHRcdCAgKi9cclxuXHRcdHByaXZhdGUgd2FpdEZvclZhbHVlcyhmb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+KTogSlF1ZXJ5UHJvbWlzZTxib29sZWFuPiB7XHJcblx0XHRcdHZhciBkZmQgPSAkLkRlZmVycmVkKCk7XHJcblx0XHRcdGZvcm0uZ2Zvcm0oXCJ3YWl0Rm9yVmFsdWVzXCIpXHJcblx0XHRcdFx0LnRoZW4oKCkgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LnRoZW4oKGlzVmFsaWQpID0+IHtcclxuXHRcdFx0XHRcdGRmZC5yZXNvbHZlKGlzVmFsaWQpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmZhaWwoKCkgPT4ge1xyXG5cdFx0XHRcdFx0ZGZkLnJlamVjdChmYWxzZSk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0cmV0dXJuIGRmZC5wcm9taXNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBjb252ZXJ0KCkge1xyXG5cclxuXHRcdFx0dGhpcy5oaWRlRmxhc2goXCJpZENvbnZlcnRcIik7XHJcblx0XHRcdHRoaXMuaGlkZUZsYXNoKFwiaWRDb252ZXJ0MlwiKTtcclxuXHRcdFx0dmFyIGR0bzogR29yZGljLkRrcy5XZWJDb250cm9scy5HRGtzQ29udmVydFNlcnZpY2VEdG8gPSB7fTtcclxuXHRcdFx0dGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGR0byk7XHJcblxyXG5cdFx0XHRpZiAoZHRvLmZpbGUgPT0gbnVsbCB8fCBkdG8uZmlsZS5sZW5ndGggPT09IDAgfHwgZHRvLnRhcmdldCA9PSBudWxsKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93Rmxhc2goe1xyXG5cdFx0XHRcdFx0aWQ6IFwiaWRDb252ZXJ0XCIsXHJcblx0XHRcdFx0XHRzdGF0ZTogXCJ3YXJuaW5nXCIsXHJcblx0XHRcdFx0XHRjb250ZW50OiBcImpyZXM6MzIwMDAwMTRcIiAvL1JDIDMyMDAwMDE0IDogTmVieWxhIHphZMOhbmEgcG92aW5uw6EgaG9kbm90YS5cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRyZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcblx0XHRcdHRoaXMuY2FsbChcIkNvbnZlcnRcIiwgeyBEdG86IGR0byB9KVxyXG5cdFx0XHRcdC50aGVuKChyZXM6IEdvcmRpYy5Ea3MuV2ViQ29udHJvbHMuR0Rrc0NvbnZlcnRTZXJ2aWNlT3V0cHV0RHRvW10pID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuc2hvd0ZsYXNoKHtcclxuXHRcdFx0XHRcdFx0aWQ6IFwiaWRDb252ZXJ0XCIsXHJcblx0XHRcdFx0XHRcdHN0YXRlOiBcInN1Y2Nlc3NcIixcclxuXHRcdFx0XHRcdFx0Y29udGVudDogXCJqcmVzOjMyMDAwMDEwXCIgLy9SQyAzMjAwMDAxMCA6IEtvbnZlcnplIGJ5bGEgw7pzcMSbxaFuxJsgZG9rb27EjWVuYS5cclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR0aGlzLnNob3dGbGFzaCh7IGNvbnRlbnQ6IFwianJlczozMjAwMDAxMVwiLCBpZDogXCJpZENvbnZlcnQyXCIgfSk7IC8vUkMgMzIwMDAwMTEgOiBQcm8gc3Rhxb5lbsOtIHNvdWJvcnUgZHZvamtsaWtuxJt0ZSBuYSDFmcOhZGVrIHYgc2V6bmFtdSBuZWJvIG5hIHDFmcOtc2x1xaFuw6kgdGxhxI3DrXRrbyBcIlN0w6Fobm91dFwiIHYgbWVudS5cclxuXHRcdFx0XHRcdHRoaXMudmlldy51cGRhdGVEYXRhKHJlcyk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuYWx3YXlzKCgpID0+IHtcclxuXHRcdFx0XHRcdC8vIHRoYXptdWthICgwNi4wOS4yMDIxKSAtIG1hxb51IHbFvmR5LCBvxaFldMWZZW7DrSB2IHDFmcOtcGFkxJsgY2h5YnlcclxuXHRcdFx0XHRcdHRoaXMuZmluZEZpZWxkcyhcImZpbGVcIikuZ2ZpbGVmaWVsZChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcblxyXG5cdFx0XHR0aGlzLnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldygpO1xyXG5cdFx0XHR2YXIgZ3JpZCA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG5cdFx0XHR2YXIgZm9ybWF0ID0gdGhpcy5zZXRGb3JtYXRHcmlkKCk7XHJcblx0XHRcdHZhciBzZWFyY2hDb2x1bW5zID0gdGhpcy51dGlscy5nZXRTZWFyY2hDb2x1bW5zKGZvcm1hdCk7XHJcblxyXG5cdFx0XHRncmlkLmdncmlkKHtcclxuXHRcdFx0XHRtdWx0aTogdHJ1ZSxcclxuXHRcdFx0XHRuYW1lOiBcImRrc0NvbnZlcnRHcmlkXCIsXHJcblx0XHRcdFx0c2VhcmNoQ29sdW1uczogc2VhcmNoQ29sdW1ucyxcclxuXHRcdFx0XHRkYXRhOiB0aGlzLnZpZXcsXHJcblx0XHRcdFx0Y29sdW1uczogZm9ybWF0LFxyXG5cdFx0XHRcdGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0bmFtZTogXCJka3NDb252ZXJ0R3JpZEFjdFwiLFxyXG5cdFx0XHRcdFx0cnVuOiAoZXYsIGN0eCkgPT4ge1xyXG5cdFx0XHRcdFx0XHR2YXIgcm93OiBHb3JkaWMuRGtzLldlYkNvbnRyb2xzLkdEa3NDb252ZXJ0U2VydmljZU91dHB1dER0byA9IGN0eC5jZWxsSW5mby5kYXRhO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmdmaWxlLmRvd25sb2FkKHsgZ3VpZDogcm93Lmd1aWQgfSwgXCJHb3JkaWMuR3VpLldlYkNvbnRyb2xzLkdJY3NEb3dubG9hZFwiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KSxcclxuXHRcdFx0XHRcclxuXHRcdFx0fSkuZ2F1dG9maXQoKVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIGRvd25sb2FkTXVsdGkoKSB7XHJcblx0XHRcdHZhciB2YWx1ZXM6IEdvcmRpYy5Ea3MuV2ViQ29udHJvbHMuR0Rrc0NvbnZlcnRTZXJ2aWNlT3V0cHV0RHRvW10gPSB0aGlzLnZpZXcuZ2V0RGF0YVJvd3MoKTtcclxuXHRcdFx0aWYgKHZhbHVlcyA9PSBudWxsIHx8IHZhbHVlcy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHR0aGlzLnNob3dGbGFzaChcImpyZXM6MzIwMDAwMTVcIik7IC8vUkMgMzIwMDAwMTUgOiBOZWpzb3UgayBkaXNwb3ppY2kgxb7DoWRuw6kgc291Ym9yeSBrZSBzdGHFvmVuw60uXHJcblx0XHRcdFx0cmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRcdHRoaXMuZ2ZpbGUuZG93bmxvYWQoeyBndWlkOiB2YWx1ZXNbaV0uZ3VpZCB9LCBcIkdvcmRpYy5HdWkuV2ViQ29udHJvbHMuR0ljc0Rvd25sb2FkXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgc2V0Rm9ybWF0R3JpZCgpIHtcclxuXHJcblx0XHRcdHZhciBmb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpO1xyXG5cclxuXHRcdFx0Zm9ybWF0XHJcblx0XHRcdFx0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm5hbWVcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDA4XCIsIHdpZHRoOiA1MCB9KSAvL1JDIDMyMDAwMDA4IDogTsOhemV2IHNvdWJvcnVcclxuXHRcdFx0XHQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwib2xkZXh0XCIsIGNhcHRpb246IFwianJlczozMjAwMDAwOVwiLCB3aWR0aDogNTAgfSkgLy9SQyAzMjAwMDAwOSA6IFDFr3ZvZG7DrSBrb25jb3ZrYVxyXG5cclxuXHRcdFx0cmV0dXJuIGZvcm1hdDtcclxuXHRcdH1cclxuXHJcblxyXG5cdH1cclxuXHJcblxyXG59XHJcblxyXG4vLyAtIHpvYnJheml0IGZsYXNoIHYgcMWZw61wYWTEmyBuZXphZMOhbsOtIHBvdmlubsO9Y2ggaG9kbm90IC0gdmFsaWRhdG9yIHNlIG5hIHRvbXRvIGRpYWxvZ3UgbmVob2TDrSIsIm5hbWVzcGFjZSBHb3JkaWMuRGtzLldlYkNvbnRyb2xzIHtcclxuXHJcblx0aW50ZXJmYWNlIElHRGtzU2lnbmF0dXJlVmVyaWZpY2F0aW9uIHtcclxuXHRcdFJvb3RJbmRleDogbnVtYmVyLFxyXG5cdFx0SW5wdXQ6IHtcclxuXHRcdFx0RmlsZW5hbWU6IHN0cmluZyxcclxuXHRcdFx0R3VpZDogc3RyaW5nXHJcblx0XHR9LFxyXG5cdFx0UmVzdWx0OiBXZmwuSW50ZXJmYWNlLkdPdmVyaXRQb2RwaXNEdG9cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzO1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEa3NTaWduYXR1cmVWZXJpZmljYXRpb24gZXh0ZW5kcyBHQ29udGVudEJhc2U8YW55PiB7XHJcblxyXG5cdFx0cHJpdmF0ZSB1dGlsczogR0Rrc1V0aWxzO1xyXG5cdFx0cHJpdmF0ZSBzaWduYXR1cmVSZXN1bHQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblx0XHRwcml2YXRlIHZpZXc6IEdvcmRpYy5EYXRhLlZpZXc8YW55PjtcclxuXHRcdHByaXZhdGUgYXN5bmNUYXNrTmFtZSA9IFwiR29yZGljLldmbC5TZXJ2ZXIuR092ZXJpdFBvZHBpc0FzeW5jVGFza1wiO1xyXG5cdFx0cHJpdmF0ZSBvdmVyaXRVdGlsczogR29yZGljLldmbC5XZWJDbGllbnQuR092ZXJpdFBvZHBpc1V0aWxzO1xyXG5cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHRwcml2YXRlIGluaXQoKSB7XHJcblx0XHRcdHRoaXMub3Zlcml0VXRpbHMgPSBuZXcgR29yZGljLldmbC5XZWJDbGllbnQuR092ZXJpdFBvZHBpc1V0aWxzKHRoaXMsIGZhbHNlKTtcclxuXHRcdFx0dGhpcy51dGlscyA9IG5ldyBHRGtzVXRpbHMoKTtcclxuXHRcdFx0dGhpcy5jcmVhdGVNZW51YmFyKCk7XHJcblx0XHRcdHRoaXMuY3JlYXRlRm9ybSgpO1xyXG5cdFx0XHR0aGlzLmNyZWF0ZUdyaWQoW10pO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHRwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcblx0XHRcdHRoaXMudXRpbHMuY3JlYXRlRmlsZUZvcm0odGhpcy5lbGVtZW50LCBHRGtzRGlhbG9nVHlwZUVudW0ub3ZlcmVuaVBvZHBpc3UsIHRydWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgbG9hZFNpZ25hdHVyZVZlcmlmaWNhdGlvbihmaWxlTGlzdDogR29yZGljLkdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR0ZpbGVJbmZvRHRvW10sIHByb2dyZXNzOiBudW1iZXIpIHtcclxuXHJcblx0XHRcdHZhciB0b3RhbCA9IGZpbGVMaXN0Lmxlbmd0aDtcclxuXHRcdFx0dGhpcy5wcm9ncmVzc09wZXJhdGlvbih7IGlkOiBcImlkT3BWZXJpZnlTaWduYXR1cmVcIiwgcHJvZ3Jlc3M6IHByb2dyZXNzLCB0b3RhbDogdG90YWwgfSk7XHJcblxyXG5cdFx0XHQvLyBrb25lYyBvcGVyYWNlXHJcblx0XHRcdGlmICh0b3RhbCA9PT0gcHJvZ3Jlc3MpIHtcclxuXHRcdFx0XHR0aGlzLmVuZE9wZXJhdGlvbihcImlkT3BWZXJpZnlTaWduYXR1cmVcIik7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgZmlsZSA9IGZpbGVMaXN0W3Byb2dyZXNzXTtcclxuXHRcdFx0aWYgKGZpbGUgPT0gbnVsbCkge1x0Ly8gbmVtxJtsbyBieSBuYXN0w6F2YXQsIGplIHRvIHR1IHBybyBqaXN0b3R1XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIk5lb8SNZWvDoXZhbsOpIHVrb27EjWVuw60gb3BlcmFjZSwgY3lrbHVzIHNlIHByYXZkxJtwb2RvYm7EmyBkb3N0YWwgbWltbyBzdGFub3ZlbsO9IHJvenNhaC5cIik7XHJcblx0XHRcdFx0dGhpcy5lbmRPcGVyYXRpb24oXCJpZE9wVmVyaWZ5U2lnbmF0dXJlXCIpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGNudCA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLnNpZ25hdHVyZVJlc3VsdCk7XHJcblx0XHRcdGlmIChjbnQuaGFzQ2xhc3MoXCJnY29udGVudFwiKSA9PSBmYWxzZSlcclxuXHRcdFx0XHRjbnQuZ2NvbnRlbnQoXCJHb3JkaWMuV2ZsLldlYkNsaWVudC5HT3Zlcml0UG9kcGlzXCIpO1xyXG5cclxuXHRcdFx0Y250Lmdjb250ZW50KFwibG9hZFwiLCB7IElEOiBcIldmbEdPdmVyaXRQb2RwaXMjXCIsIHRhc2tJZDogXCJXZmxHT3Zlcml0UG9kcGlzVGFza0lkXCIsIEd1aWQ6IGZpbGUuZ3VpZCwgRmlsZW5hbWU6IGZpbGUuZmlsZW5hbWUgfSlcclxuXHRcdFx0XHQudGhlbigoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLmxvYWRTaWduYXR1cmVWZXJpZmljYXRpb24oZmlsZUxpc3QsICsrcHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudWJhcigpIHtcclxuXHJcblx0XHRcdHZhciBwYXJhbXM6IE1lbnVQYXJhbXNbXSA9IFtdO1xyXG5cclxuXHRcdFx0cGFyYW1zLnB1c2goe1xyXG5cdFx0XHRcdHByaW1hcnk6IHRydWUsXHJcblx0XHRcdFx0ZmF2b3JpdGU6IHRydWUsXHJcblx0XHRcdFx0YWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcblx0XHRcdFx0XHRuYW1lOiBcImFjdFZlcmlmeVNpZ25hdHVyZVwiLFxyXG5cdFx0XHRcdFx0aWNvbjogXCJnaS1zaWduXCIsXHJcblx0XHRcdFx0XHRjYXB0aW9uOiBcImpyZXM6MzIwMDAwMTZcIiwgLy9SQyAzMjAwMDAxNiA6IE92xJvFmWl0IHBvZHBpc1xyXG5cdFx0XHRcdFx0cnVuOiAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMucnVuKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLm1lbnVCYXIocGFyYW1zKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBydW4oKSB7XHJcblx0XHRcdHRoaXMuaGlkZUZsYXNoKFwiaWRGbGFzaFZlcmlmeVwiKTtcclxuXHRcdFx0dmFyIGR0bzogeyBmaWxlPzogR29yZGljLkdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR0ZpbGVJbmZvRHRvW10gfSA9IHt9O1xyXG5cdFx0XHR0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuXHRcdFx0aWYgKGR0byAhPSBudWxsICYmIGR0by5maWxlICE9IG51bGwgJiYgZHRvLmZpbGUubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdHZhciBwcm9ncmVzcyA9IDA7XHJcblx0XHRcdFx0dmFyIHJlc3VsdDogYW55W10gPSBbXTtcclxuXHRcdFx0XHR2YXIgdG90YWwgPSBkdG8uZmlsZS5sZW5ndGg7XHJcblx0XHRcdFx0dGhpcy5iZWdpbk9wZXJhdGlvbih7XHJcblx0XHRcdFx0XHRwcm9ncmVzczogcHJvZ3Jlc3MsXHJcblx0XHRcdFx0XHR0b3RhbDogdG90YWwsXHJcblx0XHRcdFx0XHRpZDogXCJpZE9wVmVyaWZ5XCIsXHJcblx0XHRcdFx0XHR0ZXh0OiBcIlByb2LDrWjDoSBvdsSbxZllbsOtIHBvZHBpc3UuLi5cIiBcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLl9ydW4oZHRvLmZpbGUsIHByb2dyZXNzLCByZXN1bHQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2hvd0ZsYXNoKHtcclxuXHRcdFx0XHRcdGlkOiBcImlkRmxhc2hWZXJpZnlcIixcclxuXHRcdFx0XHRcdHN0YXRlOiBcIndhcm5pbmdcIixcclxuXHRcdFx0XHRcdGNvbnRlbnQ6IFwiUHJvIHNwdcWhdMSbbsOtIG92xJvFmWVuw60gc291Ym9ydSB2eWJlcnRlIHNvdWJvci5cIiBcclxuXHRcdFx0XHR9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblx0XHRwcml2YXRlIER0bzogSUdEa3NTaWduYXR1cmVWZXJpZmljYXRpb25bXTtcclxuXHJcblx0XHRwcml2YXRlIF9ydW4oZmlsZUxpc3Q6IGFueVtdLCBwcm9ncmVzczogbnVtYmVyLCByZXN1bHQ6IElHRGtzU2lnbmF0dXJlVmVyaWZpY2F0aW9uW10pIHtcclxuXHJcblx0XHRcdHZhciB0b3RhbCA9IGZpbGVMaXN0Lmxlbmd0aDtcclxuXHRcdFx0dGhpcy5wcm9ncmVzc09wZXJhdGlvbih7IGlkOiBcImlkT3BWZXJpZnlcIiwgcHJvZ3Jlc3M6IHByb2dyZXNzLCB0b3RhbDogdG90YWwgfSk7XHJcblxyXG5cdFx0XHQvLyBrb25lYyBvcGVyYWNlXHJcblx0XHRcdGlmICh0b3RhbCA9PT0gcHJvZ3Jlc3MpIHtcclxuXHRcdFx0XHR0aGlzLkR0byA9IHJlc3VsdDtcdC8vIHRoYXptdWthICgyNi4xMC4yMDIxKSBkb3BsbsSbbsOtXHJcblx0XHRcdFx0dmFyIHRyZWVMaXN0ID0gdGhpcy5jcmVhdGVNYWluVHJlZShyZXN1bHQpO1xyXG5cdFx0XHRcdHRoaXMudmlldy51cGRhdGVEYXRhKHRyZWVMaXN0KTtcclxuXHRcdFx0XHR0aGlzLmVuZE9wZXJhdGlvbihcImlkT3BWZXJpZnlcIik7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgaXRlbSA9IGZpbGVMaXN0W3Byb2dyZXNzXTtcclxuXHRcdFx0aWYgKGl0ZW0gPT0gbnVsbCkge1x0Ly8gbmVtxJtsbyBieSBuYXN0w6F2YXQsIGplIHRvIHR1IHBybyBqaXN0b3R1XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIk5lb8SNZWvDoXZhbsOpIHVrb27EjWVuw60gb3BlcmFjZSwgY3lrbHVzIHNlIHByYXZkxJtwb2RvYm7EmyBkb3N0YWwgbWltbyBzdGFub3ZlbsO9IHJvenNhaC5cIik7XHJcblx0XHRcdFx0dGhpcy5lbmRPcGVyYXRpb24oXCJpZE9wVmVyaWZ5XCIpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0R29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5zdGFydDxHb3JkaWMuQXN5bmMuSUdUYXNrUHJvZ3Jlc3MsIGFueT4odGhpcy5hc3luY1Rhc2tOYW1lLCB7IEZpbGVuYW1lOiBpdGVtLmZpbGVuYW1lLCBHdWlkOiBpdGVtLmd1aWQgfSkuZ2V0UHJvbWlzZSgpXHJcblx0XHRcdFx0LnRoZW4oKG91dHB1dCkgPT4ge1xyXG5cclxuXHRcdFx0XHRcdGlmIChvdXRwdXQgIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgb3V0cHV0UmVzdWx0OiBJR0Rrc1NpZ25hdHVyZVZlcmlmaWNhdGlvbiA9IG91dHB1dC5yZXN1bHQ7XHJcblx0XHRcdFx0XHRcdGlmIChvdXRwdXRSZXN1bHQgIT0gbnVsbCAmJiBvdXRwdXRSZXN1bHQuUmVzdWx0ICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRvdXRwdXRSZXN1bHQuUm9vdEluZGV4ID0gcHJvZ3Jlc3M7XHJcblx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2gob3V0cHV0UmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdHRoaXMuX3J1bihmaWxlTGlzdCwgKytwcm9ncmVzcywgcmVzdWx0KTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5mYWlsKCgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuZW5kT3BlcmF0aW9uKFwiaWRPcFZlcmlmeVwiKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxuXHJcblx0XHRwcml2YXRlIGNyZWF0ZU1haW5UcmVlKGxpc3Q6IElHRGtzU2lnbmF0dXJlVmVyaWZpY2F0aW9uW10pIHtcclxuXHRcdFx0dmFyIHJlc3VsdDogYW55W10gPSBbXTtcclxuXHRcdFx0Zm9yICh2YXIgeCA9IDA7IHggPCBsaXN0Lmxlbmd0aDsgeCsrKSB7XHJcblx0XHRcdFx0dmFyIGl0ZW0gPSBsaXN0W3hdO1xyXG5cclxuXHRcdFx0XHR2YXIgb3B0SW5wdXQ6IEdvcmRpYy5XZmwuV2ViQ2xpZW50LklHT3Zlcml0UG9kcGlzVXRpbHMgPSB7XHJcblx0XHRcdFx0XHRJbnB1dDogaXRlbS5JbnB1dCxcclxuXHRcdFx0XHRcdFJvb3RJbmRleDogaXRlbS5Sb290SW5kZXhcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgZHRvID0gdGhpcy5vdmVyaXRVdGlscy5jcmVhdGVUcmVlKGl0ZW0uUmVzdWx0LCBvcHRJbnB1dCk7XHJcblx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdChkdG8pO1xyXG4gICAgICAgICAgICB9XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdHByaXZhdGUgY3JlYXRlR3JpZCh0cmVlOiBhbnlbXSkge1xyXG5cclxuXHRcdFx0Ly90aGlzLnBhcmFtc0xpbmVhcml6ZWQgamUgcG9sZSBvYmpla3R1LCBrZGUga2HFvmTDvSBvYmpla3QgbWEgcHJvcGVydHkgaWQgYSBwYXJlbnRJZCAoKyBkYWxzaSkuIFBva3VkIG9iamVrdCBuZW3DoSBwYXJlbnRhLCBzdGFjaSBzZXRub3V0IHBhcmVudElkIG5hIG51bGxcclxuXHRcdFx0bGV0IHRyZWVQcm9jZXNzb3IgPSBuZXcgR29yZGljLkRhdGEuVHJlZShHb3JkaWMuRGF0YS5UcmVlLnBhcmVudElkT3JnYW5pemVyKFwicGFyZW50SWRcIikvKiwgeyBkZWZhdWx0U3RhdGU6IFwib3BlblwiIH0qLyk7XHJcblx0XHRcdHRoaXMudmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3PGFueT4odHJlZSwgeyBrZXk6IFwiaWRcIiwgcHJvY2Vzc29yczogeyB0cmVlOiB0cmVlUHJvY2Vzc29yIH0gfSk7XHJcblx0XHRcdHRoaXMuZ3JpZCA9ICQoXCI8ZGl2PlwiKS5nYXV0b2ZpdCgpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcblx0XHRcdHRoaXMuZ3JpZC5nZ3JpZCh7XHJcblx0XHRcdFx0cm93c0NsYXNzOiAocm93KSA9PiB7XHJcblx0XHRcdFx0XHRpZiAocm93LmRhdGEuZmxhZyA9PT0gXCJpZFJvb3RcIilcclxuXHRcdFx0XHRcdFx0cmV0dXJuIFwiZ2dyaWQtY29uZGYtYmctZ3JheVwiO1xyXG5cdFx0XHRcdFx0cmV0dXJuIFwiXCI7XHRcdFx0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cdFx0XHRcdGRhdGE6IHRoaXMudmlldyxcclxuXHRcdFx0XHRuYW1lOiBcInN0cm9tb2dyaWRcIixcclxuXHRcdFx0XHRyZW5kZXJNb2RlOiBcImF1dG9cIixcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG5cdFx0XHRcdGNvbHVtbk1vZGU6IFwiZml0XCIsXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG5cdFx0XHRcdGN1c3RvbUNsYXNzOiBcImpzLWdyaWQtc3Ryb21cIixcclxuXHRcdFx0XHRuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIixcdFx0XHRcdFx0XHRcdFx0XHQvLyByb3csIGNlbGxcclxuXHRcdFx0XHRjb2x1bW5zOiB0aGlzLm92ZXJpdFV0aWxzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuXHRcdFx0XHRkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHRcdFx0XHRcdFx0XHQvL29ic2x1em5hIGFrY2UsIGt0ZXJhIHNlIHNwb3VzdGkgZGJsIGNsaWNrZW0gbmFkIHJhZGtlbVxyXG5cdFx0XHRcdFx0bmFtZTogXCJhY3REb3VibGVDbGlja092ZXJlbmlQb2RlcHNhbmlcIixcclxuXHRcdFx0XHRcdHJ1bjogKGV2LCBjdHgpID0+IHtcclxuXHRcdFx0XHRcdFx0aWYgKGN0eC5jZWxsSW5mby5kYXRhLmZsYWcgPT09IFwiaWRDZXJ0aWZpa2F0VnlzdGF2aXRlbEluZm9cIiB8fCBjdHguY2VsbEluZm8uZGF0YS5mbGFnID09PSBcImlkQ2VydGlmaWthdFBvZHJvYm5vc3RpXCIpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgY2VydDogR29yZGljLlNlY3VyaXR5LlNlcnZpY2UuR0NlcnRpZmljYXRlSW5mb0RUTyA9IGN0eC5jZWxsSW5mby5kYXRhLmNlcnRpZmljYXRlO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChjZXJ0LlJhd0RhdGEgPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly9SQyAzMjAwMDUzNyA6IFVwb3pvcm7Em27DrVxyXG5cdFx0XHRcdFx0XHRcdFx0Ly9SQyAzMjAwMDUzNiA6IEJsacW+xaHDrSBpbmZvcm1hY2UgbyBjZXJ0aWZpa8OhdHUgbmVqc291IGRvc3R1cG7DqS5cclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZGlhbG9ncy5hbGVydChcImpyZXM6MzIwMDAwMzlcIiwgXCJqcmVzOjMyMDAwMDQwXCIsIDQ3MCwgMTUwKTsgLy9SQyAzMjAwMDA0MCA6IEJsacW+xaHDrSBpbmZvcm1hY2UgbyBjZXJ0aWZpa8OhdHUgbmVqc291IGRvc3R1cG7DqS5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRHb3JkaWMuV2ZsLkRpYWxvZ3MuR0RldGFpbENlcnRpZmlrYXR1RGxnKHRoaXMsIHsgY2VydDogY3R4LmNlbGxJbmZvLmRhdGEuY2VydGlmaWNhdGUgfSwgR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3cpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pLFxyXG5cdFx0XHRcdGNvbnRleHRNZW51OiB0aGlzLmNyZWF0ZUNvbnRleHRNZW51KClcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8jcmVnaW9uIC0tIGNvbnRleHRtZW51IC0tXHJcblxyXG5cdFx0cHVibGljIGNyZWF0ZUNvbnRleHRNZW51KCkge1xyXG5cdFx0XHRjb25zdCBwYXJhbXM6IE1lbnVQYXJhbXNbXSA9IFtdO1xyXG5cdFx0XHRwYXJhbXMucHVzaCh7XHJcblx0XHRcdFx0ZmF2b3JpdGU6IHRydWUsXHJcblx0XHRcdFx0YWN0aW9uOiB0aGlzLmFkZEFjdGlvbk92ZXJpdFBvZHBpc0RldGFpbCgpXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gcGFyYW1zO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgYWRkQWN0aW9uT3Zlcml0UG9kcGlzRGV0YWlsKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbih7XHJcblx0XHRcdFx0bmFtZTogXCJhY3RPdmVyaXRQb2RwaXNEZXRhaWxcIixcclxuXHRcdFx0XHRjYXB0aW9uOiBcImpyZXM6MzIwMDAwMzhcIiwgLy9SQyAzMjAwMDAzOCA6IERvcGzFiHVqw61jw60gaW5mb3JtYWNlXHJcblx0XHRcdFx0cnVuOiAoZXYsIG9iaikgPT4ge1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuaGlkZUZsYXNoKFwib3Zlcml0UG9kcGlzRGV0YWlsQWN0aW9uRmxhc2hJZFwiKTtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmdyaWQgPT0gbnVsbCB8fCB0aGlzLmNsb3NlZCA9PT0gdHJ1ZSlcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0dmFyIHJvdyA9IHRoaXMuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuXHRcdFx0XHRcdGlmIChyb3cgIT0gbnVsbCAmJiByb3cuaW5kZXggIT0gbnVsbCkge1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuRHRvICE9IG51bGwpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKHJvdy5yb290SW5kZXggPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIlJvb3RJbmRleCBuZW7DrSBuYXBsbsSbbi5cIik7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBpdGVtID0gdGhpcy5EdG9bKHJvdy5yb290SW5kZXggYXMgbnVtYmVyKV07XHJcblx0XHRcdFx0XHRcdFx0aWYgKGl0ZW0gIT0gbnVsbCAmJiBpdGVtLlJlc3VsdCAhPSBudWxsICYmIGl0ZW0uUmVzdWx0Lkl0ZW1zICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBzZWxlY3RJdGVtID0gaXRlbS5SZXN1bHQuSXRlbXMhW3Jvdy5pbmRleF07XHJcblx0XHRcdFx0XHRcdFx0XHRXZmwuRGlhbG9ncy5HT3Zlcml0UG9kcGlzRGV0YWlsRGxnKHRoaXMsIHsgRHRvOiBzZWxlY3RJdGVtLCBJeHA6IHRoaXMuSXhwIH0sIEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93KTtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiRGlhbG9nIG92xJvFmWVuw60gcG9kcGlzdSBzIGRvcGzFiHVqw61jw61taSBpbmZvcm1hY2VtaSBvIG92xJvFmWVuw60gbmVsemUgb3RldsWZw610LiBQcmF2ZMSbcG9kb2JuxJsgbmVqc291IG5hcGxuxJtuYSB2c3R1cG7DrSBkYXRhLlwiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNob3dGbGFzaCh7XHJcblx0XHRcdFx0XHRcdFx0Y29udGVudDogXCJqcmVzOjMyMDAwMDM3XCIsIC8vUkMgMzIwMDAwMzcgOiBWeWJlcnRlIGFrdGl2bsOtIMWZw6FkZWtcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZTogXCJpbmZvXCIsXHJcblx0XHRcdFx0XHRcdFx0aWQ6IFwib3Zlcml0UG9kcGlzRGV0YWlsQWN0aW9uRmxhc2hJZFwiXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkpO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyNlbmRyZWdpb25cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLkRrcy5XZWJDb250cm9scyB7XHJcblxyXG5cdC8qKiB0eXAgZGlhbG9ndSBES1MwNSAqL1xyXG5cdGV4cG9ydCBlbnVtIEdEa3NEaWFsb2dUeXBlRW51bSB7XHJcblx0XHRrb252ZXJ6ZSA9IDEsXHJcblx0XHR2YWxpZGFjZVBkZmEgPSAyLFxyXG5cdFx0b3ZlcmVuaVBvZHBpc3UgPSAzXHJcblx0fVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHRGtzVXRpbHMge1xyXG5cclxuXHRcdC8qKiB2cmHFpSBzbG91cGNlIG5hIHByb2hsZWTDoXbDoW7DrSAqL1xyXG5cdFx0Z2V0U2VhcmNoQ29sdW1ucyhmb3JtYXQ6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQpIHtcclxuXHRcdFx0dmFyIHNlYXJjaENvbHVtbnMgPSBbXSBhcyBzdHJpbmdbXTtcclxuXHRcdFx0Zm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGZvcm1hdC5jb2x1bW5zLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cdFx0XHRcdHZhciBjb2x1bW5zID0gZm9ybWF0LmNvbHVtbnNbaW5kZXhdO1xyXG5cdFx0XHRcdGlmIChjb2x1bW5zLm5hbWUgIT0gbnVsbClcclxuXHRcdFx0XHRcdHNlYXJjaENvbHVtbnMucHVzaChjb2x1bW5zLm5hbWUpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzZWFyY2hDb2x1bW5zO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHRjcmVhdGVGaWxlRm9ybShlbGVtZW50OiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCB0eXBlOiBHRGtzRGlhbG9nVHlwZUVudW0sIG11bHRpOiBib29sZWFuLCBmaWxlUmVtb3ZlZD86IChldiwgb2JqKSA9PiB2b2lkLCBmaWxlVXBsb2FkZWQ/OiAoZXYsIG9iaikgPT4gdm9pZCkge1xyXG5cclxuXHRcdFx0dmFyIGZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8oZWxlbWVudCk7XHJcblx0XHRcdHZhciBGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJHRGtzQ29udmVydFNlcnZpY2VGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMSwgYnJlYWtzLTcwMC0xMDAwXCIgfSk7XHJcblxyXG5cdFx0XHRGb3JtXHJcblx0XHRcdFx0LmFkZFNlY3Rpb24oXCJcIikgXHJcblxyXG5cdFx0XHRGb3JtXHJcblx0XHRcdFx0LmFkZFJvdyh7XHJcblx0XHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcclxuXHRcdFx0XHRcdGxhYmVsOiBcImpyZXM6MzIwMDAwMDJcIiAvL1JDIDMyMDAwMDAyIDogVnliZXJ0ZSBzb3Vib3JcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5hZGRGaWVsZChcImdmaWxlZmllbGRcIiwge1xyXG5cdFx0XHRcdFx0bWF4RmlsZUNvdW50OiBtdWx0aSA9PSBmYWxzZSA/IDEgOiAxMDAsXHJcblx0XHRcdFx0XHQvL3ZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcblx0XHRcdFx0XHRuYW1lOiBcImZpbGVcIixcclxuXHRcdFx0XHRcdG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG5cdFx0XHRcdFx0XHRzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG5cdFx0XHRcdFx0XHRcdGNhc2UgXCJhcHBseVwiOiAgLy8gbmFwbG5lbmkgbXVsdGl2YWx1ZSBwb2xpY2thIHogRFRPXHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgdmFsID0gW107XHJcblx0XHRcdFx0XHRcdFx0XHQvL2lmIChkdG8uZGljdExpa2VQcm9wZXJ0eSlcclxuXHRcdFx0XHRcdFx0XHRcdC8vXHRmb3IgKHZhciBrIGluIGR0by5kaWN0TGlrZVByb3BlcnR5KSB2YWwucHVzaCh7IGtsaWM6IGssIGhvZG5vdGE6IGR0by5kaWN0TGlrZVByb3BlcnR5W2tdIH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0JCh0aGlzKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB2YWwpO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdGNhc2UgXCJjb2xsZWN0XCI6IC8vIG5hcGxuZW5pIERUTyBob2Rub3RvdSB6IG11bHRpdmFsdWUgcG9saWNrYSAodnJhY2kgdnpkeSBwb2xlKVxyXG5cdFx0XHRcdFx0XHRcdFx0ZHRvW1wiZmlsZVwiXSA9IFtdO1xyXG5cdFx0XHRcdFx0XHRcdFx0JCh0aGlzKS5nZmllbGQoXCJnZXRWYWx1ZVwiKS5mb3JFYWNoKGZ1bmN0aW9uIChpdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRkdG9bXCJmaWxlXCJdLnB1c2goe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGd1aWQ6IGl0Lmd1aWQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZmlsZW5hbWU6IGl0LmZpbGVuYW1lXHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIFwiZmlsZVwiOyAvLyBtb2RlbD1cImRpY3RMaWtlUHJvcGVydHlcIiBwcm8gcG91eml0aSB2eWNob3ppaG8gcHJvY2Vzb3J1IHBybyBvcGVyYWNlIGt0ZXJ5bSBuZXJvenVtaW1lICh2YWxpZGF0aW9ucywgdmFsaWRhdG9ycywgLi4uKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZpbGVSZW1vdmVkOiAoZXYsIG9iaikgPT4ge1xyXG5cdFx0XHRcdFx0XHRpZiAoZmlsZVJlbW92ZWQgIT0gbnVsbClcclxuXHRcdFx0XHRcdFx0XHRmaWxlUmVtb3ZlZChldiwgb2JqKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmaWxlVXBsb2FkZWQ6IChldiwgb2JqKSA9PiB7XHJcblx0XHRcdFx0XHRcdGlmIChmaWxlVXBsb2FkZWQgIT0gbnVsbClcclxuXHRcdFx0XHRcdFx0XHRmaWxlVXBsb2FkZWQoZXYsIG9iaik7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmlsZURvd25sb2FkZWQ6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcblx0XHRcdFx0XHRcdC8vIHNvdWJvciBieWwgc3Rhxb5lblxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGl0ZW1XaWR0aDogXCJ3LTZcIlxyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0XHRpZiAodHlwZSA9PT0gR0Rrc0RpYWxvZ1R5cGVFbnVtLmtvbnZlcnplKSB7XHJcblxyXG5cdFx0XHRcdHZhciB0eXBlRmlsZURhdGE6IHsgdmFsdWU6IG51bWJlciwgY2FwdGlvbjogc3RyaW5nIH1bXSA9IFtdO1xyXG5cdFx0XHRcdHZhciBwZGZBMWIgPSB7IHZhbHVlOiAxLCBjYXB0aW9uOiBcIlBERi9BLTFiXCIgfTtcclxuXHRcdFx0XHR2YXIgcGRmQTJiID0geyB2YWx1ZTogMiwgY2FwdGlvbjogXCJQREYvQS0yYlwiIH07XHJcblx0XHRcdFx0dHlwZUZpbGVEYXRhLnB1c2gocGRmQTFiKTtcclxuXHRcdFx0XHR0eXBlRmlsZURhdGEucHVzaChwZGZBMmIpO1xyXG5cclxuXHRcdFx0XHRGb3JtXHJcblx0XHRcdFx0XHQuYWRkUm93KHtcclxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXHJcblx0XHRcdFx0XHRcdGxhYmVsOiBcImpyZXM6MzIwMDAwMDNcIiAvL1JDIDMyMDAwMDAzIDogVnliZXJ0ZSBjw61sb3bDvSB0eXAgc291Ym9ydVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG5cdFx0XHRcdFx0XHQvL3ZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcblx0XHRcdFx0XHRcdG5hbWU6IFwidGFyZ2V0XCIsXHJcblx0XHRcdFx0XHRcdG1vZGVsOiBcIm1vZGVsLnRhcmdldD12YWx1ZS52YWx1ZVwiLFxyXG5cdFx0XHRcdFx0XHRpbml0aWFsVmFsdWU6IHBkZkEyYixcclxuXHRcdFx0XHRcdFx0ZGF0YTogdHlwZUZpbGVEYXRhLFxyXG5cdFx0XHRcdFx0XHRkcm9wZG93bjogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0aXRlbVRlbXBsYXRlOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBkYXRhPy5jYXB0aW9uO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0XHRGb3JtXHJcblx0XHRcdFx0XHQuYWRkUm93KClcclxuXHRcdFx0XHRcdC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcblx0XHRcdFx0XHRcdGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcblx0XHRcdFx0XHRcdG5hbWU6IFwib2NyXCIsXHJcblx0XHRcdFx0XHRcdGxhYmVsOiBcImpyZXM6MzIwMDAwMDRcIiAvL1JDIDMyMDAwMDA0IDogUHJvdsOpc3QgT0NSXHJcblx0XHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0XHRGb3JtXHJcblx0XHRcdFx0XHQuYWRkUm93KClcclxuXHRcdFx0XHRcdC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcblx0XHRcdFx0XHRcdGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgZWxlbWVudCA9IGZvcm0uZmluZEZpZWxkcyhcImNvbnZlcnRBdHRhY2htZW50c1wiKTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgdmFsdWUgPSBvYmoudmFsdWUgPT09IHRydWUgPyBmYWxzZSA6IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0ZWxlbWVudC5nZmllbGQoXCJvcHRpb25cIiwgeyBkaXNhYmxlZDogdmFsdWUgfSk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHZhbHVlID09PSB0cnVlKVx0Ly8gcG9rdWQgamUgaG9kbm90YSBuZXphxaFrcnRudXRhIC0gc2hvZMOtbSBob2Rub3R1IHBvbG/Fvmt5IGtvbnZlcnRvdmF0XHJcblx0XHRcdFx0XHRcdFx0XHRlbGVtZW50LmdmaWVsZChcInNldFZhbHVlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHRcdFx0XHRcdFx0aW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0bmFtZTogXCJpbnNlcnRBdHRhY2htZW50c1wiLFxyXG5cdFx0XHRcdFx0XHR0b29sdGlwOiBcImpyZXM6MzIwMDAwNDJcIiwgLy9SQyAzMjAwMDA0MiA6IFZsb8W+aXQgdm5vxZllbsOpIHNvdWJvcnkgbmFwxZkuIHBkZiwgZW1sXHJcblx0XHRcdFx0XHRcdGxhYmVsOiBcImpyZXM6MzIwMDAwNDFcIiAvL1JDIDMyMDAwMDQxIDogVmxvxb5pdCB2bm/FmWVuw6kgc291Ym9yeVxyXG5cdFx0XHRcdFx0fSlcclxuXHJcblx0XHRcdFx0Rm9ybVxyXG5cdFx0XHRcdFx0LmFkZFJvdygpXHJcblx0XHRcdFx0XHQuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG5cdFx0XHRcdFx0XHRkaXNhYmxlZDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0aW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0bmFtZTogXCJjb252ZXJ0QXR0YWNobWVudHNcIixcclxuXHRcdFx0XHRcdFx0dG9vbHRpcDogXCJqcmVzOjMyMDAwMDQ0XCIsIC8vUkMgMzIwMDAwNDQgOiBLb252ZXJ0b3ZhdCB2bm/FmWVuw6kgc291Ym9yeSBuYXDFmS4gcGRmLCBlbWxcclxuXHRcdFx0XHRcdFx0bGFiZWw6IFwianJlczozMjAwMDA0M1wiIC8vUkMgMzIwMDAwNDMgOiBLb252ZXJ0b3ZhdCB2bm/FmWVuw6kgc291Ym9yeVxyXG5cdFx0XHRcdFx0fSlcclxuXHJcblx0XHRcdFx0Rm9ybVxyXG5cdFx0XHRcdFx0LmFkZFJvdygpXHJcblx0XHRcdFx0XHQuYWRkRmllbGQoXCJnZm9ybXRleHRcIiwge1xyXG5cdFx0XHRcdFx0XHRodG1sOiBcImpyZXM6MzIwMDAwMDVcIiAvL1JDIDMyMDAwMDA1IDogVGF0byBvcGVyYWNlIG3Fr8W+ZSB0cnZhdCB2IHrDoXZpc2xvc3RpIG5hIHZlbGlrb3N0aSB2c3R1cG7DrWhvIHNvdWJvcnUgaSBuxJtrb2xpayBtaW51dC5cclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cdFxyXG5cdFx0XHRmb3JtLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBGb3JtKTtcclxuXHRcdFx0Zm9ybS5maW5kRmllbGRzKFwiZmlsZVwiKS5nZmlsZWZpZWxkKFwiYWRkRHJvcHpvbmVcIik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxufSIsIlxyXG5uYW1lc3BhY2UgR29yZGljLkRrcy5XZWJDb250cm9scyB7XHJcblxyXG4gICAgY29uc3QgeyBnY29udGVudCB9ID0gRGVjb3JhdG9ycztcclxuXHJcblx0aW50ZXJmYWNlIFBkZlZhbGlkYXRpb25SZXN1bHQge1xyXG5cdFx0UGx1Z2luOiBudW1iZXIsXHJcblx0XHRQbHVnaW5OYW1lOiBzdHJpbmcsXHJcblx0XHRQbHVnaW5WZXJzaW9uOiBzdHJpbmcsXHJcblx0XHRSZXN1bHQ6IGJvb2xlYW4sXHJcblx0XHRTdHJpbmdSZXN1bHQ6IHN0cmluZyxcclxuXHRcdFZhbGlkYXRpb25FeGVjdXRlZDogYm9vbGVhbixcclxuXHRcdC8qKiBuw6F6ZXYgc291Ym9ydSAoZXh0ZW5kKSAqL1xyXG5cdFx0RmlsZU5hbWU6IHN0cmluZ1xyXG5cdH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBES1MgLSB2YWxpZGFjZSBQREYvQVxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGtzVmFsaWRhdGVQZGZhIGV4dGVuZHMgR0NvbnRlbnRCYXNlPGFueT4ge1xyXG5cclxuXHRcdHByaXZhdGUgZmlsZUluZm86IEdvcmRpYy5HZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdGaWxlSW5mb0R0byB8IG51bGwgPSBudWxsO1xyXG5cdFx0cHJpdmF0ZSB1dGlsczogR0Rrc1V0aWxzO1xyXG5cdFx0cHJpdmF0ZSB2aWV3OiBHb3JkaWMuRGF0YS5WaWV3O1xyXG5cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHRwcml2YXRlIGluaXQoKSB7XHJcblx0XHRcdHRoaXMudXRpbHMgPSBuZXcgR0Rrc1V0aWxzKCk7XHJcblx0XHRcdHRoaXMuY3JlYXRlRm9ybSgpO1xyXG5cdFx0XHR0aGlzLmNyZWF0ZU1lbnViYXIoKTtcclxuXHRcdFx0dGhpcy5jcmVhdGVHcmlkKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG5cdFx0XHR0aGlzLnV0aWxzLmNyZWF0ZUZpbGVGb3JtKHRoaXMuZWxlbWVudCwgR0Rrc0RpYWxvZ1R5cGVFbnVtLnZhbGlkYWNlUGRmYSwgdHJ1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBjcmVhdGVNZW51YmFyKCkge1xyXG5cdFx0XHR2YXIgcGFyYW1zOiBNZW51UGFyYW1zW10gPSBbXTtcclxuXHRcdFx0cGFyYW1zLnB1c2goe1xyXG5cdFx0XHRcdHByaW1hcnk6IHRydWUsXHJcblx0XHRcdFx0ZmF2b3JpdGU6IHRydWUsXHJcblx0XHRcdFx0YWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcblx0XHRcdFx0XHRuYW1lOiBcImFjdFZhbGlkYXRlUGRmYVwiLFxyXG5cdFx0XHRcdFx0aWNvbjogXCJcIixcclxuXHRcdFx0XHRcdGNhcHRpb246IFwianJlczozMjAwMDAxOFwiLCAvL1JDIDMyMDAwMDE4IDogT3bEm8WZZW7DrSB2YWxpZGFjZSBQREYvQVxyXG5cdFx0XHRcdFx0cnVuOiAoKSA9PiB7XHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLmhpZGVGbGFzaChcImlkRmxhc2hWYWxpZGF0ZVBkZmFcIik7XHJcblx0XHRcdFx0XHRcdHZhciBkdG86IHsgZmlsZT86IEdvcmRpYy5HZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdGaWxlSW5mb0R0b1tdIH0gPSB7fTtcclxuXHRcdFx0XHRcdFx0dGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGR0byk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoZHRvICE9IG51bGwgJiYgZHRvLmZpbGUgIT0gbnVsbCAmJiBkdG8uZmlsZS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGZpbGVMaXN0ID0gZHRvLmZpbGU7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHByb2dyZXNzTnVtYmVyID0gMDtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmJlZ2luT3BlcmF0aW9uKHtcclxuXHRcdFx0XHRcdFx0XHRcdHByb2dyZXNzOiBwcm9ncmVzc051bWJlcixcclxuXHRcdFx0XHRcdFx0XHRcdHRvdGFsOiBmaWxlTGlzdC5sZW5ndGgsXHJcblx0XHRcdFx0XHRcdFx0XHRpZDogXCJpZE9wVmFsaWRhdGVQZGZhXCIsXHJcblx0XHRcdFx0XHRcdFx0XHR0ZXh0OiBcImpyZXM6MzIwMDAwMjdcIiAvL1JDIDMyMDAwMDI3IDogUHJvYsOtaMOhIHZhbGlkYWNlLi4uXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy52aWV3LnVwZGF0ZURhdGEoW10pO1x0Ly8gY2xlYXJcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnJ1blZhbGlkYXRpb24oZmlsZUxpc3QsIHByb2dyZXNzTnVtYmVyKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnNob3dGbGFzaCh7XHJcblx0XHRcdFx0XHRcdFx0XHRpZDogXCJpZEZsYXNoVmFsaWRhdGVQZGZhXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRzdGF0ZTogXCJ3YXJuaW5nXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZW50OiBcImpyZXM6MzIwMDAwMTlcIiAvL1JDIDMyMDAwMDE5IDogUHJvIHNwdcWhdMSbbsOtIHZhbGlkYWNlIFBERi9BIHZ5YmVydGUgc291Ym9yLlxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSk7XHJcblx0XHRcdHRoaXMubWVudUJhcihwYXJhbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgcnVuVmFsaWRhdGlvbihmaWxlTGlzdDogR29yZGljLkdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR0ZpbGVJbmZvRHRvW10sIHByb2dyZXNzOiBudW1iZXIpIHtcclxuXHJcblx0XHRcdHZhciB0b3RhbCA9IGZpbGVMaXN0Lmxlbmd0aDtcclxuXHRcdFx0dGhpcy5wcm9ncmVzc09wZXJhdGlvbih7IGlkOiBcImlkT3BWYWxpZGF0ZVBkZmFcIiwgcHJvZ3Jlc3M6IHByb2dyZXNzLCB0b3RhbDogdG90YWwgfSk7XHJcblxyXG5cdFx0XHQvLyBrb25lYyBvcGVyYWNlXHJcblx0XHRcdGlmICh0b3RhbCA9PT0gcHJvZ3Jlc3MpIHtcclxuXHRcdFx0XHR0aGlzLmVuZE9wZXJhdGlvbihcImlkT3BWYWxpZGF0ZVBkZmFcIik7XHJcblx0XHRcdFx0cmV0dXJuO1x0XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBmaWxlID0gZmlsZUxpc3RbcHJvZ3Jlc3NdO1xyXG5cclxuXHRcdFx0aWYgKGZpbGUgPT0gbnVsbCkge1x0Ly8gbmVtxJtsbyBieSBuYXN0w6F2YXQsIGplIHRvIHR1IHBybyBqaXN0b3R1XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIk5lb8SNZWvDoXZhbsOpIHVrb27EjWVuw60gb3BlcmFjZSwgY3lrbHVzIHNlIHByYXZkxJtwb2RvYm7EmyBkb3N0YWwgbWltbyBzdGFub3ZlbsO9IHJvenNhaC5cIik7XHJcblx0XHRcdFx0dGhpcy5lbmRPcGVyYXRpb24oXCJpZE9wVmFsaWRhdGVQZGZhXCIpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHRcdFx0R29yZGljLklzbC5Ea3MuaXNWYWxpZFBkZkEoeyBHdWlkOiBmaWxlLmd1aWQgfSkuZ2V0RGF0YSgpXHJcblx0XHRcdFx0LnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdFx0dmFyIHJlc3VsdHMgPSByZXMuUmVzdWx0cyBhcyBQZGZWYWxpZGF0aW9uUmVzdWx0W107XHJcblx0XHRcdFx0XHRpZiAocmVzdWx0cyAhPSBudWxsICYmIHJlc3VsdHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHRyZXN1bHRzLm1hcCgoaXRlbSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGl0ZW1bXCJGaWxlTmFtZVwiXSA9IGZpbGUuZmlsZW5hbWUhO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0dGhpcy52aWV3LnVwZGF0ZURhdGEocmVzdWx0cywgXCJhZGRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmRvbmUoKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5ydW5WYWxpZGF0aW9uKGZpbGVMaXN0LCArK3Byb2dyZXNzKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgc2V0R3JvdXBpbmdQcm9jZXNzb3IodmlldzogR29yZGljLkRhdGEuVmlldzxQZGZWYWxpZGF0aW9uUmVzdWx0Pikge1xyXG5cclxuXHRcdFx0dmFyIGdyb3VwTGlzdDogR29yZGljLkRhdGEuR3JvdXBpbmdEZWZpbml0aW9uPFBkZlZhbGlkYXRpb25SZXN1bHQ+W10gPSBbXTtcclxuXHJcblx0XHRcdHZhciBmaWxlTmFtZTogR29yZGljLkRhdGEuR3JvdXBpbmdEZWZpbml0aW9uPFBkZlZhbGlkYXRpb25SZXN1bHQ+ID0ge1xyXG5cdFx0XHRcdGRlZmF1bHRTdGF0ZTogXCJvcGVuXCIsXHJcblx0XHRcdFx0aGFzaDogKG1ldGEsIHJvd3MpID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBtZXRhLmRhdGEuRmlsZU5hbWUhO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdFx0Z3JvdXBMaXN0LnB1c2goZmlsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmlldy5wcm9jZXNzKHtcclxuXHRcdFx0XHRkZWZhdWx0OiBuZXcgR29yZGljLkRhdGEuR3JvdXBpbmcoZ3JvdXBMaXN0KVxyXG5cdFx0XHR9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHRcdHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuXHJcblx0XHRcdHRoaXMudmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KCk7XHJcblx0XHRcdHRoaXMuc2V0R3JvdXBpbmdQcm9jZXNzb3IodGhpcy52aWV3KTtcclxuXHJcblx0XHRcdHZhciBncmlkID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcblx0XHRcdHZhciBmb3JtYXQgPSB0aGlzLnNldEZvcm1hdEdyaWQoKTtcclxuXHRcdFx0dmFyIHNlYXJjaENvbHVtbnMgPSBuZXcgR0Rrc1V0aWxzKCkuZ2V0U2VhcmNoQ29sdW1ucyhmb3JtYXQpO1xyXG5cdFx0XHRncmlkLmdncmlkKHtcclxuXHRcdFx0XHRuYW1lOiBcImRrc1ZhbGlkYXRlUGRmYUdyaWRcIixcclxuXHRcdFx0XHRzZWFyY2hDb2x1bW5zOiBzZWFyY2hDb2x1bW5zLFxyXG5cdFx0XHRcdGRhdGE6IHRoaXMudmlldyxcclxuXHRcdFx0XHRjb2x1bW5zOiBmb3JtYXQsXHJcblx0XHRcdH0pLmdhdXRvZml0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBzZXRGb3JtYXRHcmlkKCkge1xyXG5cdFx0XHR2YXIgZm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKTtcclxuXHJcblx0XHRcdGZvcm1hdFxyXG5cdFx0XHRcdC5hZGRJY29uQ29sdW1uKHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiUmVzdWx0XCIsXHJcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogXCJqcmVzOjMyMDAwMDI4XCIsIC8vUkMgMzIwMDAwMjggOiBTdGF2IHbDvXNsZWRrdSB2YWxpZGFjZVxyXG5cdFx0XHRcdFx0Y2FwdGlvbjogXCJqcmVzOjMyMDAwMDI4XCIsIC8vUkMgMzIwMDAwMjggOiBTdGF2IHbDvXNsZWRrdSB2YWxpZGFjZVxyXG5cdFx0XHRcdFx0d2lkdGg6IDMwLFxyXG5cdFx0XHRcdFx0Y3VzdG9tQ2xhc3M6IFwiY2VudGVyXCIsXHJcblx0XHRcdFx0XHRmb3JtYXRQcmVzZXQ6IFwiaWNvblwiLFxyXG5cdFx0XHRcdFx0aWNvblRlbXBsYXRlOiAoZGF0YTogUGRmVmFsaWRhdGlvblJlc3VsdCkgPT4ge1xyXG5cdFx0XHRcdFx0XHR2YXIgdGVtcGxhdGU6IEljb25UZW1wbGF0ZSA9IHsgaWNvbjogXCJcIiwgdG9vbHRpcDogXCJcIiwgdGV4dDogXCJcIiB9O1xyXG5cdFx0XHRcdFx0XHRpZiAoZGF0YS5SZXN1bHQgPT09IHRydWUpIHtcclxuXHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZS5pY29uID0gXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiO1xyXG5cdFx0XHRcdFx0XHRcdHRlbXBsYXRlLnRleHQgPSBcImpyZXM6MzIwMDAwMzBcIjsgLy9SQyAzMjAwMDAzMCA6IFZhbGlkYWNlIGRvcGFkbGEgw7pzcMSbxaFuxJsuXHJcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGUudG9vbHRpcCA9IHRlbXBsYXRlLnRleHQ7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGUuaWNvbiA9IFwiZmEtdGltZXMtY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLWVycm9yXCI7XHJcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGUudGV4dCA9IFwianJlczozMjAwMDAzMVwiOyAvL1JDIDMyMDAwMDMxIDogVmFsaWRhY2Ugc2UgbmV6ZGHFmWlsYS5cclxuXHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZS50b29sdGlwID0gdGVtcGxhdGUudGV4dDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGVtcGxhdGU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHJcblx0XHRcdFx0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIkZpbGVOYW1lXCIsIGNhcHRpb246IFwianJlczozMjAwMDAyNlwiLCB3aWR0aDogNTAgfSkgLy9SQyAzMjAwMDAyNiA6IE7DoXpldiBzb3Vib3J1XHJcblx0XHRcdFx0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIlBsdWdpbk5hbWVcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDIzXCIsIHdpZHRoOiA1MCB9KSAvL1JDIDMyMDAwMDIzIDogTsOhemV2XHJcblx0XHRcdFx0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIlN0cmluZ1Jlc3VsdFwiLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwMjVcIiwgd2lkdGg6IDUwIH0pIC8vUkMgMzIwMDAwMjUgOiBWw71zbGVkZWtcclxuXHJcblx0XHRcdHJldHVybiBmb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==
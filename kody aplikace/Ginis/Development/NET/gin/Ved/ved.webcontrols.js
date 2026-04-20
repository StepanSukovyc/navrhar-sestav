"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ved;
    (function (Ved) {
        var Dialogs;
        (function (Dialogs) {
            /**
             * Seznam pro sestavy
             * - pro otevření dialogů
             *
             * @author  thazmuka
             * @date    17.06.2022
             *
             * @param   parentContent					The content.
             * @param   ModOtevreni						mod otevreni dialogu.
             * @return  .
             */
            function GVedGridDialog(parentContent, opt, ModOtevreni) {
                const options = {
                    ID: "GVedGrid#",
                    Ixps: opt ? opt.Ixps : undefined,
                    Oblast: opt ? opt.Oblast : undefined
                };
                const deferred = $.Deferred();
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                const windowParams = undefined;
                let isValid = true;
                if (isValid) {
                    Gordic.Gui.Dialogs._openDialog(pContent, deferred, 'Gordic.Ved.WebControls.GVedGrid', ModOtevreni, options, windowParams);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Dialogs.GVedGridDialog = GVedGridDialog;
        })(Dialogs = Ved.Dialogs || (Ved.Dialogs = {}));
    })(Ved = Gordic.Ved || (Gordic.Ved = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ved;
    (function (Ved) {
        var WebControls;
        (function (WebControls) {
            class GVedUtils {
                constructor() {
                }
                /**
                 * je hodnota null, nedefinovaná nebo prázdná ("")?
                 * @param value
                 */
                isNullUndefinedOrEmpty(value) {
                    if (value == null || value === "")
                        return true;
                    else
                        return false;
                }
            }
            WebControls.GVedUtils = GVedUtils;
        })(WebControls = Ved.WebControls || (Ved.WebControls = {}));
    })(Ved = Gordic.Ved || (Gordic.Ved = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ved.WebControls.GVedDashboard.ts						</Name>
//    <Description> Statistiky pro VED							                </Description>
//    <Author>      Tomáš Hažmuka												</Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2020							</Copyright>
//    <Created>     2020-07-16													</Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ved;
    (function (Ved) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Statistiky pro VED (modul Vedoucí)
             */
            let GVedDashboard = class GVedDashboard extends Gordic.GContentBase {
                onContentReady() {
                    this.init();
                }
                init() {
                    this.loadModuleInfo();
                }
                /** načíst informace o modulu */
                loadModuleInfo() {
                    var i = 0;
                    var result = [];
                    var secondaryText = this.NazevRef + " | " + this.NazevFun + " | " + "jres:32000003" + ": " + this.DatLoginTxt; //RC 32000003 : Poslední přihlášení
                    result.push(new GObservableObject({
                        name: "kpiLastUsed" + "_" + i,
                        image: Gordic.Utils.IconBuilder.defaultInst.createModuleIcon("GWAVED05"),
                        primaryText: "jres:32000002", //RC 32000002 : Vedoucí
                        secondaryText: secondaryText,
                    }));
                    this.moduleInfoItems = new Gordic.Data.View([{
                            id: "moduleInfo",
                            title: "",
                            zone: 1,
                            mode: "vertical",
                            itemTemplate: Gordic.Prefabs.Panels.kpiImageTwoRowsTextTemplate().itemTemplate,
                            defaultSelected: false,
                            data: new Gordic.Data.View(result)
                        }], { key: ["id"] });
                    $("<div>").appendTo(this.element).gdashboardpanel({
                        defaultSelected: false,
                        data: this.moduleInfoItems,
                        layout: "horizontal",
                        title: "",
                        sortable: true
                    });
                }
            };
            GVedDashboard = __decorate([
                gcontent
            ], GVedDashboard);
            WebControls.GVedDashboard = GVedDashboard;
        })(WebControls = Ved.WebControls || (Ved.WebControls = {}));
    })(Ved = Gordic.Ved || (Gordic.Ved = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ved;
    (function (Ved) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            let GVedGrid = class GVedGrid extends Gordic.GContentBase {
                onContentReady() {
                    this.createGrid();
                }
                createGrid() {
                    var view = new Gordic.Data.View(this.List);
                    var format = new Gordic.Data.GridFormat();
                    this.grid = $("<div>").gautofit().appendTo(this.element);
                    this.setFormat(format);
                    this.grid.ggrid({
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: (ev, ctx) => {
                                if (this.grid != null) {
                                    var activeRow = this.grid.ggrid("activeRow");
                                    if (activeRow != null && activeRow.Ixp != null)
                                        Gordic.Ssl.Dialogs.Detail(this, { DetailDto: { ixp: activeRow.Ixp }, EditMode: false });
                                }
                            }
                        }),
                        data: view,
                        name: "vedGridName",
                        renderMode: "auto",
                        columnMode: "full",
                        customClass: "ved-maingrid",
                        navigationMode: "row",
                        columns: format,
                        searchColumns: this.setSearchColumns(format),
                    });
                }
                setFormat(format) {
                    format
                        .addTextColumn({ name: "ixp", caption: "jres:32000052", width: 150 }) //RC 32000052 : Identifikátor
                        //.addTextColumn({ name: "Cj", caption: "jres:32000053", width: 150 }) //RC 32000053 : Spis. značka
                        .addTextColumn({ name: "nazev", caption: "jres:32000054", width: 250 }) //RC 32000054 : Název
                        .addTextColumn({ name: "zp_vyriz", caption: "jres:32000055", width: 150 }) //RC 32000055 : Způsob vyřízení
                        .addTextColumn({ name: "spis_znak", caption: "jres:32000056", width: 150 }); //RC 32000056 : Spisový znak
                }
                setSearchColumns(format) {
                    var searchColumns = [];
                    for (var index = 0; index < format.columns.length; index++) {
                        var columns = format.columns[index];
                        if (columns.name != null)
                            searchColumns.push(columns.name);
                    }
                    return searchColumns;
                }
            };
            GVedGrid = __decorate([
                gcontent
            ], GVedGrid);
            WebControls.GVedGrid = GVedGrid;
        })(WebControls = Ved.WebControls || (Ved.WebControls = {}));
    })(Ved = Gordic.Ved || (Gordic.Ved = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ved.WebControls.GVedReport.ts		                </Name>
//    <Description> Motor sestav modulu Vedoucí (WK)							</Description>
//    <Author>      Tomáš Hažmuka												</Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021							</Copyright>
//    <Created>     2020-07-17													</Created>
//    <Updated>     2021-07-19													</Updated>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ved;
    (function (Ved) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /** Motor sestav modulu Vedoucí (WK) */
            let GVedReport = class GVedReport extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /** téma sestavy */
                    this.tema = null;
                }
                onContentReady() {
                    this.init();
                }
                init() {
                    this.contentPath = "GVedReport" + this.task_type?.toString() + this.report_type?.toString();
                    this.createPrintAction();
                    this.createMenuBar();
                    this.createCommandBar();
                    this.createForm();
                }
                createPrintAction() {
                    this.tema = null;
                    switch (this.report_type) {
                        case 5 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Special */:
                        case 10 /* Gordic.Ved.WebControls.GVedReportTypeEnum.VytvoreneDokumentyDleZpracovateluBezNZ */:
                        case 9 /* Gordic.Ved.WebControls.GVedReportTypeEnum.SpisyDleOblastiNeclenene */:
                        case 8 /* Gordic.Ved.WebControls.GVedReportTypeEnum.VytizenostZpracovatelu */:
                        case 7 /* Gordic.Ved.WebControls.GVedReportTypeEnum.ZpusobyVyrizeniDleZpracovatelu */:
                        case 11 /* Gordic.Ved.WebControls.GVedReportTypeEnum.SpisyDleOblasti */:
                        case 12 /* Gordic.Ved.WebControls.GVedReportTypeEnum.SpisyDleOblastiDIS */:
                            this.tema = "ssl_ptm_vedkvd"; // obecnější special téma
                            break;
                        case 6 /* Gordic.Ved.WebControls.GVedReportTypeEnum.SpisyNevyrizBezUkon */:
                            this.tema = "ssl_ptm_vedsnbu";
                            break;
                        case 0 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Document */:
                            this.tema = "ssl_ptm_veddok";
                            break;
                        case 1 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Folder */:
                            this.tema = "ssl_ptm_vedspi";
                            break;
                        case 2 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Epk */:
                            this.tema = "ssl_ptm_vedepk";
                            break;
                        case 3 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Others */:
                            this.tema = "ssl_ptm_vedost";
                            break;
                        case 4 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Grr */:
                            this.tema = "ssl_ptm_veddat";
                            break;
                        case 13 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Atestace2024 */:
                            this.tema = "ssl_ptm_vedats";
                            break;
                    }
                    if (this.tema != null) {
                        this.printAction = this.actions.add(GAction.createPrintAction({
                            name: "vystupAct",
                            tema: this.tema, // ssl_ptm_veddok // usu_ptm_sdetspi
                            caption: "jres:32000023", //RC 32000023 : Výstup
                            title: "jres:32000024", //RC 32000024 : Vyberte sestavu
                            dialogOpening: () => {
                                var dfd = $.Deferred();
                                this.waitForValues(this.element)
                                    .then((isValid) => { isValid === true ? dfd.resolve() : dfd.reject(); })
                                    .fail(() => { dfd.reject(); });
                                return dfd.promise();
                            },
                            serverParameterMethod: "Gordic.Ved.WebControls.GVedReportParamConverter:ServerParameterMethod",
                            reportStarting: (rep) => {
                                this.reportStartingInitParams(rep);
                            },
                            parentContent: this.parentContent == null ? undefined : this.parentContent,
                            fullScreen: true,
                            gfrmOptions: {
                                serverClass: "Gordic.Ved.WebControls.GVedReportControl" // kvůli onClick operacím
                            },
                            reportFinished: (rep) => {
                                this.hideFlash("printFlashId");
                                this.showFlash({ content: "jres:32000061", state: "info", id: "printFlashId" }); //RC 32000061 : Tisková sestava byla vygenerována.
                            },
                        }));
                    }
                }
                reportStartingInitParams(rep) {
                    var model = {};
                    this.findFields().gfield("model", "collect", model);
                    //#region -- parametry pro datumové intervaly --
                    if (model["datumOd"] != null) {
                        var datumOd = model["datumOd"].toUTCString();
                        rep.params["X0002"] = rep.params["datumOd"] = datumOd;
                    }
                    if (model["datumDo"] != null) {
                        var datumDo = model["datumDo"].toUTCString();
                        rep.params["X0003"] = rep.params["datumDo"] = datumDo;
                    }
                    //#endregion
                    // Sestava dokumentů, spisů a dílů typových spisů za stanovené období, kterým uplynula skartační lhůta
                    if (rep["reportId"] === "0000STR00XV2/0000ALV086OW/0000ALF05DYO/0") {
                        delete rep.params["datumOd"];
                        delete rep.params["datumDo"];
                        return;
                    }
                    if (model.ixsSu == null) {
                        model.ixsSu = "";
                    }
                    if (model.ixsTyp == null) {
                        model.ixsTyp = "";
                    }
                    if (this.report_type === 4 /* GVedReportTypeEnum.Grr */) {
                        rep.params["X0000"] = model.ixsSu;
                        rep.params["X0001"] = model.ixsTyp;
                    }
                    for (var item in model)
                        model[item] = model[item] == null ? "" : model[item];
                    $.extend(true, rep.params, model);
                    rep.params["sslden1"] = model["sslden1"] == null ? null : model["sslden1"];
                    rep.params["sslden2"] = model["sslden2"] == null ? null : model["sslden2"];
                    rep.params["sslden3"] = model["sslden3"] == null ? null : model["sslden3"];
                    rep.params["sslden4"] = model["sslden4"] == null ? null : model["sslden4"];
                    var arr = model["keywords"];
                    rep.params["keywords"] = arr && arr.length ? arr.map(x => x.kl_slovo).join(',') : "";
                    if (model["fc"] != null)
                        rep.params["fc"] = model["fc"];
                    if (this.SpisPl != null)
                        rep.params["spisPl"] = this.SpisPl;
                    if (model["chckDateCreate"] != null)
                        rep.params["chckDateCreate"] = model["chckDateCreate"].value === 1 ? true : false;
                    if (this.ixs_su == null) {
                        this.ixs_su = "";
                    }
                    // thazmuka (11.11.2021) -  nevyřízení spisy bez úkonu
                    if (this.report_type === 6 /* Gordic.Ved.WebControls.GVedReportTypeEnum.SpisyNevyrizBezUkon */) {
                        rep.params["X0000"] = model["pocet"] == null ? 0 : model["pocet"];
                    }
                    if (this.report_type === 0 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Document */) {
                        if (rep.params["puvod"] == null)
                            rep.params["puvod"] = "";
                        if (rep.params["ixsTyp"] == null)
                            rep.params["ixsTyp"] = "";
                        if (rep.params["forma"] == null)
                            rep.params["forma"] = "";
                        // thazmuka: updated (7.3.2024)
                        rep.params["ixsSu"] = (this.task_type === 0 /* GVedTaskTypeEnum.Node */ && this.ixs_su != null && this.ixs_su !== "") ? this.ixs_su : "";
                    }
                    if (this.report_type === 1 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Folder */) {
                        if (rep.params["sslden1"] == null)
                            rep.params["sslden1"] = "";
                        if (rep.params["ixsTyp"] == null)
                            rep.params["ixsTyp"] = "";
                        // thazmuka: updated (7.3.2024)
                        rep.params["ixsSu"] = (this.task_type === 0 /* GVedTaskTypeEnum.Node */ && this.ixs_su != null && this.ixs_su !== "") ? this.ixs_su : "";
                    }
                    if (this.report_type === 3 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Others */) {
                        if (rep.params["ixsTyp"] == null)
                            rep.params["ixsTyp"] = "";
                        // thazmuka: updated (7.3.2024)
                        rep.params["ixsSu"] = (this.task_type === 0 /* GVedTaskTypeEnum.Node */ && this.ixs_su != null && this.ixs_su !== "") ? this.ixs_su : "";
                    }
                    if (this.report_type === 2 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Epk */) {
                        if (rep.params["typPozadavku"] == null)
                            rep.params["typPozadavku"] = "";
                        // thazmuka: updated (7.3.2024)
                        rep.params["ixsSu"] = (this.ixs_su != null && this.ixs_su !== "") ? this.ixs_su : "";
                    }
                }
                createForm() {
                    switch (this.report_type) {
                        case 0 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Document */:
                            this.createFormReportDok();
                            break;
                        case 1 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Folder */:
                            this.createFormReportSpis();
                            break;
                        case 2 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Epk */:
                            this.createFormReportEpk();
                            break;
                        case 3 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Others */:
                            this.createFormReportOstatni();
                            break;
                        case 4 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Grr */:
                            this.createFormReportGrr();
                            break;
                        case 6 /* Gordic.Ved.WebControls.GVedReportTypeEnum.SpisyNevyrizBezUkon */:
                            this.createFormReportSpisyNevyrizBezUkonu();
                            break;
                        case 13 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Atestace2024 */:
                            this.createFormReportAtestace2024();
                            break;
                        case 5 /* Gordic.Ved.WebControls.GVedReportTypeEnum.Special */:
                        case 7 /* Gordic.Ved.WebControls.GVedReportTypeEnum.ZpusobyVyrizeniDleZpracovatelu */:
                        case 8 /* Gordic.Ved.WebControls.GVedReportTypeEnum.VytizenostZpracovatelu */:
                        case 9 /* Gordic.Ved.WebControls.GVedReportTypeEnum.SpisyDleOblastiNeclenene */:
                        case 10 /* Gordic.Ved.WebControls.GVedReportTypeEnum.VytvoreneDokumentyDleZpracovateluBezNZ */:
                        case 11 /* Gordic.Ved.WebControls.GVedReportTypeEnum.SpisyDleOblasti */:
                        case 12 /* Gordic.Ved.WebControls.GVedReportTypeEnum.SpisyDleOblastiDIS */:
                            this.createFormSpecial();
                            break;
                    }
                }
                createFormSpecial() {
                    // 1. vytvořené dokumenty dle zpracovatelů bez NZ
                    // 2. spisy dle oblasti nečleněné
                    // 3. vytížitelnost zpracovatelů
                    // 4. způsoby vyřízení dle zpracovatelů
                    var form = $("<div>").appendTo(this.element);
                    var Form = new Gordic.Forms.Form({ name: "FormVedReport", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" });
                    this.createDateTimeFields({ Form: Form, labelFrom: "jres:32000038", labelTo: "jres:32000039" }); //RC 32000038 : Od //RC 32000039 : Do
                    this.setSsldenFields(Form, 4);
                    var neDatumVytvorene = { value: 0, caption: "jres:32000046" }; //RC 32000046 : Ne
                    var anoDatumVytvorene = { value: 1, caption: "jres:32000047" }; //RC 32000047 : Ano
                    var dataDatumVytvorene = [neDatumVytvorene, anoDatumVytvorene];
                    // 2. spisy dle oblasti nečleněné
                    Form
                        .addRow("jres:32000045") //RC 32000045 : Filtrovat dle data vytvoření spisu
                        .addField("gselectbox", {
                        states: [
                            { icon: 'fa-star', customClass: "g-state-info", align: "opposite", tooltip: "jres:32000048" } //RC 32000048 : Tento filtr platí pouze pro sestavu Spisy dle oblasti nečleněné
                        ],
                        name: "chckDateCreate",
                        tooltip: "jres:32000044", //RC 32000044 : Stornované spisy se načítají pouze v případě použití filtru dle datumu vytvoření spisu.
                        list: true,
                        itemWidth: "w-6",
                        data: dataDatumVytvorene,
                        itemTemplate: (data) => {
                            return data?.caption;
                        }
                    });
                    // 4. způsoby vyřízení dle zpracovatelů
                    Form
                        .addRow("jres:32000040") //RC 32000040 : Kód funkce
                        .addField("gstringbox", {
                        states: [
                            { icon: 'fa-star', customClass: "g-state-info", align: "opposite", tooltip: "jres:32000050" } //RC 32000050 : Tento filtr platí pouze pro sestavu Způsoby vyřízení dle zpracovatelů
                        ],
                        name: "fc"
                    });
                    Form
                        .addRow("jres:32000059") //RC 32000059 : Klíčová slova
                        .addField("gkeywordsbar", {
                        initialValue: null,
                        name: "keywords",
                        tooltip: "jres:32000059" //RC 32000059 : Klíčová slova
                    });
                    form.gform("createFrom", Form);
                }
                createFormReportSpisyNevyrizBezUkonu() {
                    var Form = new Gordic.Forms.Form({
                        name: "FormVedReport",
                        layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000"
                    });
                    var form = $("<div>").appendTo(this.element);
                    Form
                        .addSection()
                        .addRow("jres:32000035") //RC 32000035 : Bez úkonu dnů
                        .addField("gnumberbox", {
                        name: "pocet",
                        minValue: 0
                    });
                    this.setSsldenFields(Form, 4);
                    form.gform("createFrom", Form);
                }
                createFormReportAtestace2024() {
                    var Form = new Gordic.Forms.Form({
                        name: "FormVedAtest",
                        layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000"
                    });
                    var form = $("<div>").appendTo(this.element);
                    this.createDateTimeFields({
                        Form: Form,
                        labelFrom: "jres:32000013", //RC 32000013 : Datum podání od
                        labelTo: "jres:32000014" //RC 32000014 : Datum podání do
                    });
                    form.gform("createFrom", Form);
                }
                createFormReportDok() {
                    var Form = new Gordic.Forms.Form({
                        name: "FormVedReport",
                        layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000"
                    });
                    var form = $("<div>").appendTo(this.element);
                    this.createDateTimeFields({
                        Form: Form,
                        labelFrom: "jres:32000013", //RC 32000013 : Datum podání od
                        labelTo: "jres:32000014" //RC 32000014 : Datum podání do
                    });
                    Form
                        .addRow("jres:32000015") //RC 32000015 : Původ
                        .addField("gselectbox", Gordic.Prefabs.Select.wflcpuv(), {
                        initialValue: this.getValueFromUserSettings("puvod"),
                        name: "puvod",
                        model: "model.puvod=value.puvod",
                        dropdown: true,
                        change: (ev, obj) => {
                            this.setValueFromUserSettings("puvod", obj.value);
                        }
                    });
                    Form
                        .addSection()
                        .addRow("jres:32000016") //RC 32000016 : Typ dokumentu
                        .addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), {
                        initialValue: this.getValueFromUserSettings("ixsTyp"),
                        name: "ixsTyp",
                        model: "model.ixsTyp=value.ixs_typ",
                        change: (ev, obj) => {
                            this.setValueFromUserSettings("ixsTyp", obj.value);
                        }
                    });
                    var initialValuesFormDoc = [];
                    initialValuesFormDoc.push({ value: 0 /* GVedFormDocEnum.FyzOrig */, caption: "jres:32000022" }); //RC 32000022 : Fyzický originál
                    initialValuesFormDoc.push({ value: 1 /* GVedFormDocEnum.ElOrig */, caption: "jres:32000021" }); //RC 32000021 : Elektronický originál/záznam
                    Form
                        .addRow("jres:32000017") //RC 32000017 : Forma
                        .addField("gselectbox", {
                        initialValue: this.getValueFromUserSettings("forma"),
                        data: initialValuesFormDoc,
                        name: "forma",
                        model: "model.forma=value.value",
                        dropdown: true,
                        itemTemplate: (value) => {
                            if (value == null || value.caption == null)
                                return "";
                            return value?.caption;
                        },
                        change: (ev, obj) => {
                            this.setValueFromUserSettings("forma", obj.value);
                        }
                    });
                    var initialValue = null;
                    if (this.ixs_su != null && this.ixs_su !== "") {
                        let valueFromSetting = this.getValueFromUserSettings("ixsSu");
                        if (valueFromSetting != null && valueFromSetting !== "")
                            this.ixs_su = valueFromSetting.ixs_su;
                        initialValue = { ixs_su: this.ixs_su };
                    }
                    if (this.task_type !== 1 /* GVedTaskTypeEnum.Organization */) {
                        Form
                            .addRow("jres:32000018") //RC 32000018 : Spisový uzel
                            .addField("gselectbox", Gordic.Gin.Fields.ginspodSSU({
                            initialValue: initialValue,
                            name: "ixsSu",
                            model: "model.ixsSu=value.ixs_su",
                            disabled: !(this.ved_prehl_org !== 0),
                            change: (ev, obj) => {
                                this.setValueFromUserSettings("ixsSu", obj.value);
                                this.ixs_su = obj.value != null ? obj.value.ixs_su : "";
                            }
                        }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO));
                    }
                    form.gform("createFrom", Form);
                }
                createFormReportOstatni() {
                    var Form = new Gordic.Forms.Form({
                        name: "FormVedReport",
                        layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000"
                    });
                    var form = $("<div>").appendTo(this.element);
                    this.createDateTimeFields({
                        Form: Form,
                        labelFrom: "jres:32000029", //RC 32000029 : Datum od
                        labelTo: "jres:32000030" //RC 32000030 : Datum do
                    });
                    var initialValue = null;
                    if (this.ixs_su != null && this.ixs_su !== "") {
                        let valueFromSetting = this.getValueFromUserSettings("ixsSu");
                        if (valueFromSetting != null && valueFromSetting !== "")
                            this.ixs_su = valueFromSetting.ixs_su;
                        initialValue = { ixs_su: this.ixs_su };
                    }
                    if (this.task_type !== 1 /* GVedTaskTypeEnum.Organization */) {
                        Form
                            .addRow("jres:32000018") //RC 32000018 : Spisový uzel
                            .addField("gselectbox", Gordic.Gin.Fields.ginspodSSU({
                            initialValue: initialValue,
                            name: "ixsSu",
                            model: "model.ixsSu=value.ixs_su",
                            disabled: !(this.ved_prehl_org !== 0),
                            change: (ev, obj) => {
                                this.setValueFromUserSettings("ixsSu", obj.value);
                                this.ixs_su = obj.value != null ? obj.value.ixs_su : "";
                            }
                        }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO));
                    }
                    form.gform("createFrom", Form);
                }
                createFormReportGrr() {
                    var Form = new Gordic.Forms.Form({
                        name: "FormVedReport",
                        layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000"
                    });
                    var form = $("<div>").appendTo(this.element);
                    this.createDateTimeFields({
                        Form: Form,
                        labelFrom: "jres:32000031", //RC 32000031 : Vytvořeny od
                        labelTo: "jres:32000032" //RC 32000032 : Vytvořeny do
                    });
                    Form
                        .addRow("jres:32000016") //RC 32000016 : Typ dokumentu
                        .addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), {
                        initialValue: this.getValueFromUserSettings("ixsTyp"),
                        name: "ixsTyp",
                        model: "model.ixsTyp=value.ixs_typ",
                        change: (ev, obj) => {
                            this.setValueFromUserSettings("ixsTyp", obj.value);
                        }
                    });
                    this.setSsldenFields(Form, 1);
                    var initialValue = null;
                    if (this.ixs_su != null && this.ixs_su !== "") {
                        let valueFromSetting = this.getValueFromUserSettings("ixsSu");
                        if (valueFromSetting != null && valueFromSetting !== "")
                            this.ixs_su = valueFromSetting.ixs_su;
                        initialValue = { ixs_su: this.ixs_su };
                    }
                    Form
                        .addRow("jres:32000018") //RC 32000018 : Spisový uzel
                        .addField("gselectbox", Gordic.Gin.Fields.ginspodSSU({
                        initialValue: initialValue,
                        name: "ixsSu",
                        model: "model.ixsSu=value.ixs_su",
                        disabled: !(this.ved_prehl_org !== 0),
                        change: (ev, obj) => {
                            this.setValueFromUserSettings("ixsSu", obj.value);
                            this.ixs_su = obj.value != null ? obj.value.ixs_su : "";
                        }
                    }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO));
                    form.gform("createFrom", Form);
                }
                createFormReportSpis() {
                    var Form = new Gordic.Forms.Form({
                        name: "FormVedReport",
                        layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000"
                    });
                    var form = $("<div>").appendTo(this.element);
                    this.createDateTimeFields({
                        Form: Form,
                        labelFrom: "jres:32000031", //RC 32000031 : Vytvořeny od
                        labelTo: "jres:32000032" //RC 32000032 : Vytvořeny do
                    });
                    this.setSsldenFields(Form, 1);
                    if (this.task_type !== 1 /* GVedTaskTypeEnum.Organization */) {
                        var initialValue = null;
                        if (this.ixs_su != null && this.ixs_su !== "") {
                            let valueFromSetting = this.getValueFromUserSettings("ixsSu");
                            if (valueFromSetting != null && valueFromSetting !== "")
                                this.ixs_su = valueFromSetting.ixs_su;
                            initialValue = { ixs_su: this.ixs_su };
                        }
                        Form
                            .addRow("jres:32000018") //RC 32000018 : Spisový uzel
                            .addField("gselectbox", Gordic.Gin.Fields.ginspodSSU({
                            initialValue: initialValue,
                            name: "ixsSu",
                            model: "model.ixsSu=value.ixs_su",
                            disabled: !(this.ved_prehl_org !== 0),
                            change: (ev, obj) => {
                                this.setValueFromUserSettings("ixsSu", obj.value);
                                this.ixs_su = obj.value != null ? obj.value.ixs_su : "";
                            }
                        }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO));
                    }
                    form.gform("createFrom", Form);
                }
                createFormReportEpk() {
                    var Form = new Gordic.Forms.Form({
                        name: "FormVedReport",
                        layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000"
                    });
                    var form = $("<div>").appendTo(this.element);
                    this.createDateTimeFields({
                        Form: Form,
                        labelFrom: "jres:32000031", //RC 32000031 : Vytvořeny od
                        labelTo: "jres:32000032" //RC 32000032 : Vytvořeny do
                    });
                    Form
                        .addSection()
                        .addRow("jres:32000028") //RC 32000028 : Typ požadavku
                        .addField("gselectbox", Gordic.Prefabs.Select.wflctpp(), {
                        initialValue: this.getValueFromUserSettings("typPozadavku"),
                        name: "typPozadavku",
                        model: "model.typPozadavku=value.typ_pozad_pod",
                        dropdown: true,
                        change: (ev, obj) => {
                            this.setValueFromUserSettings("typPozadavku", obj.value);
                        }
                    });
                    Form
                        .addField("gdummyfield", {
                        name: "ixsSu",
                        initialValue: this.ixs_su,
                    });
                    form.gform("createFrom", Form);
                }
                createDateTimeFields(opt) {
                    opt.Form
                        .addSection()
                        .addRow({
                        required: true,
                        label: opt.labelFrom
                    })
                        .addField("gdatebox", {
                        states: [
                            { icon: 'gi-question_bold', customClass: "g-state-info", tooltip: "jres:32000062" }, //RC 32000062 : Pro sestavu dokumentů, spisů a dílů typových spisů za stanovené období, kterým uplynula skartační lhůta se předává pouze rok. (Ne celé datum)
                        ],
                        validators: [new Gordic.Validators.Required()],
                        name: "datumOd",
                        valueType: "date",
                        initialValue: Gordic.Utils.DateTime.getStartOfYear(new Date())
                    })
                        .addRow({
                        required: true,
                        label: opt.labelTo
                    })
                        .addField("gdatebox", {
                        validators: [new Gordic.Validators.Required()],
                        name: "datumDo",
                        valueType: "date",
                        initialValue: Gordic.Utils.DateTime.getEndOfDay(new Date())
                    });
                }
                createMenuBar() {
                    const menuParams = [];
                    if (this.printAction != null) {
                        menuParams.push({
                            favorite: true,
                            caption: "jres:32000019", //RC 32000019 : Generovat
                            action: this.printAction
                        });
                    }
                    this.menuBar(menuParams);
                }
                /**
                 * metoda, která provede validaci a vrátí výsledek validace až je formulář připraven
                 **/
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
                createCommandBar() {
                    const commandParams = [];
                    commandParams.push({
                        caption: "jres:32000020", //RC 32000020 : Zavřít
                        action: this.actions.add(new GAction({
                            name: "actClose",
                            icon: "gi-window-close",
                            run: () => {
                                // todo: zeptat se Vlasty jak do dostat po zavření na hlavní stránku
                                this.tryClose();
                            }
                        }))
                    });
                    this.commandBar(commandParams);
                }
                getValueFromUserSettings(name) {
                    let returnValue;
                    if (this.userSettings != null) {
                        let valueUserSettings = this.userSettings.get(this.contentPath + "." + name);
                        if (valueUserSettings != null) {
                            returnValue = valueUserSettings;
                        }
                    }
                    return returnValue;
                }
                setValueFromUserSettings(name, value) {
                    if (this.userSettings != null)
                        this.userSettings.set(this.contentPath + "." + name, value);
                }
                setSsldenFields(Form, PocetPoli) {
                    if (PocetPoli >= 1) {
                        Form
                            .addSection()
                            .addRow("jres:32000027"); //RC 32000027 : Deníky
                        Form
                            .addField("gselectbox", Gordic.Prefabs.Select.sslsden(), {
                            states: [
                                {
                                    icon: 'fa-star',
                                    customClass: "g-state-info",
                                    align: "opposite",
                                    tooltip: "jres:32000051" //RC 32000051 : Některé sestavy mají deníky pevně dané.
                                }
                            ],
                            initialValue: this.getValueFromUserSettings("sslden1"),
                            name: "sslden1",
                            model: "model.sslden1=value.sslden",
                            customClass: PocetPoli === 1 ? "w-12" : PocetPoli === 2 ? "w-6" : PocetPoli === 3 ? "w-4" : "w-3",
                            dropdown: true,
                            change: (ev, obj) => {
                                this.setValueFromUserSettings("sslden1", obj.value);
                            }
                        });
                    }
                    if (PocetPoli >= 2) {
                        Form
                            .addField("gselectbox", Gordic.Prefabs.Select.sslsden(), {
                            initialValue: this.getValueFromUserSettings("sslden2"),
                            name: "sslden2",
                            model: "model.sslden2=value.sslden",
                            dropdown: true,
                            customClass: PocetPoli === 2 ? "w-6" : PocetPoli === 3 ? "w-4" : "w-3",
                            change: (ev, obj) => {
                                this.setValueFromUserSettings("sslden2", obj.value);
                            }
                        });
                    }
                    if (PocetPoli >= 3) {
                        Form
                            .addField("gselectbox", Gordic.Prefabs.Select.sslsden(), {
                            initialValue: this.getValueFromUserSettings("sslden3"),
                            name: "sslden3",
                            model: "model.sslden3=value.sslden",
                            dropdown: true,
                            customClass: PocetPoli === 3 ? "w-4" : "w-3",
                            change: (ev, obj) => {
                                this.setValueFromUserSettings("sslden3", obj.value);
                            }
                        });
                    }
                    if (PocetPoli >= 4) {
                        Form
                            .addField("gselectbox", Gordic.Prefabs.Select.sslsden(), {
                            initialValue: this.getValueFromUserSettings("sslden4"),
                            name: "sslden4",
                            model: "model.sslden4=value.sslden",
                            customClass: "w-3",
                            dropdown: true,
                            change: (ev, obj) => {
                                this.setValueFromUserSettings("sslden4", obj.value);
                            }
                        });
                    }
                }
            };
            GVedReport = __decorate([
                gcontent
            ], GVedReport);
            WebControls.GVedReport = GVedReport;
        })(WebControls = Ved.WebControls || (Ved.WebControls = {}));
    })(Ved = Gordic.Ved || (Gordic.Ved = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVkLndlYmNvbnRyb2xzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJHVmVkRGlhbG9ncy50cyIsIlNldHRpbmdzL0dWZWRVdGlscy50cyIsIlRhc2tzL0dWZWREYXNoYm9hcmQudHMiLCJUYXNrcy9HVmVkR3JpZC50cyIsIlRhc2tzL0dWZWRSZXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQTRDZjtBQTVDRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0Q25CO0lBNUNnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE9BQU8sQ0E0QzNCO1FBNUNvQixXQUFBLE9BQU87WUFFM0I7Ozs7Ozs7Ozs7ZUFVRztZQUNILFNBQWdCLGNBQWMsQ0FDN0IsYUFBdUIsRUFDdkIsR0FHQyxFQUNELFdBQTZDO2dCQUc3QyxNQUFNLE9BQU8sR0FBRztvQkFDZixFQUFFLEVBQUUsV0FBVztvQkFDZixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTO29CQUNoQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTO2lCQUNwQyxDQUFDO2dCQUVGLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDOUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM3RSxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBRWhGLE1BQU0sWUFBWSxHQUErQixTQUFTLENBQUM7Z0JBRTNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDbkIsSUFBSSxPQUFP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QVgsZUFBVyxLQUFYLGVBQVcsUUF1dUIvQjtJQUFELENBQUMsRUF2dUJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF1dUJuQjtBQUFELENBQUMsRUF2dUJTLE1BQU0sS0FBTixNQUFNLFFBdXVCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVmVkLkRpYWxvZ3Mge1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXpuYW0gcHJvIHNlc3RhdnkgXHJcblx0ICogLSBwcm8gb3RldsWZZW7DrSBkaWFsb2fFr1xyXG5cdCAqXHJcblx0ICogQGF1dGhvciAgdGhhem11a2FcclxuXHQgKiBAZGF0ZSAgICAxNy4wNi4yMDIyXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gICBwYXJlbnRDb250ZW50XHRcdFx0XHRcdFRoZSBjb250ZW50LlxyXG5cdCAqIEBwYXJhbSAgIE1vZE90ZXZyZW5pXHRcdFx0XHRcdFx0bW9kIG90ZXZyZW5pIGRpYWxvZ3UuXHJcblx0ICogQHJldHVybiAgLlxyXG5cdCAqL1xyXG5cdGV4cG9ydCBmdW5jdGlvbiBHVmVkR3JpZERpYWxvZyhcclxuXHRcdHBhcmVudENvbnRlbnQ6IEdDb250ZW50LFxyXG5cdFx0b3B0OiB7XHJcblx0XHRcdEl4cHM6IHN0cmluZyxcclxuXHRcdFx0T2JsYXN0OiBzdHJpbmdcclxuXHRcdH0sXHJcblx0XHRNb2RPdGV2cmVuaT86IEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmlcclxuXHQpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cclxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XHJcblx0XHRcdElEOiBcIkdWZWRHcmlkI1wiLFxyXG5cdFx0XHRJeHBzOiBvcHQgPyBvcHQuSXhwcyA6IHVuZGVmaW5lZCxcclxuXHRcdFx0T2JsYXN0OiBvcHQgPyBvcHQuT2JsYXN0IDogdW5kZWZpbmVkXHJcblx0XHR9O1xyXG5cclxuXHRcdGNvbnN0IGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG5cdFx0Y29uc3QgcENvbnRlbnQgPSBHb3JkaWMuR2luLkdsb2JhbHMuRGlhbG9ncy5aa29udHJvbHVqQ29udGVudChwYXJlbnRDb250ZW50KTtcclxuXHRcdE1vZE90ZXZyZW5pID0gR29yZGljLkdpbi5HbG9iYWxzLkRpYWxvZ3MuVXByYXZNb2RPdGV2cm5pKHBDb250ZW50LCBNb2RPdGV2cmVuaSk7XHJcblxyXG5cdFx0Y29uc3Qgd2luZG93UGFyYW1zOiBHRGlhbG9nT3B0aW9ucyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcblx0XHRsZXQgaXNWYWxpZCA9IHRydWU7XHJcblx0XHRpZiAoaXNWYWxpZCkge1xyXG5cdFx0XHRHb3JkaWMuR3VpLkRpYWxvZ3MuX29wZW5EaWFsb2cocENvbnRlbnQsIGRlZmVycmVkLCAnR29yZGljLlZlZC5XZWJDb250cm9scy5HVmVkR3JpZCcsIE1vZE90ZXZyZW5pLCBvcHRpb25zLCB3aW5kb3dQYXJhbXMpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGVmZXJyZWQucmVqZWN0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHR9XHJcblxyXG59IiwiXHJcbm5hbWVzcGFjZSBHb3JkaWMuVmVkLldlYkNvbnRyb2xzIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR1ZlZFV0aWxzIHtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogamUgaG9kbm90YSBudWxsLCBuZWRlZmlub3ZhbsOhIG5lYm8gcHLDoXpkbsOhIChcIlwiKT9cclxuICAgICAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgaXNOdWxsVW5kZWZpbmVkT3JFbXB0eSh2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PT0gXCJcIilcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuVmVkLldlYkNvbnRyb2xzLkdWZWREYXNoYm9hcmQudHNcdFx0XHRcdFx0XHQ8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gU3RhdGlzdGlreSBwcm8gVkVEXHRcdFx0XHRcdFx0XHQgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBUb23DocWhIEhhxb5tdWthXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIwXHRcdFx0XHRcdFx0XHQ8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIwLTA3LTE2XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLlZlZC5XZWJDb250cm9scyB7XHJcblxyXG4gICAgY29uc3QgeyBnY29udGVudCB9ID0gRGVjb3JhdG9ycztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXRpc3Rpa3kgcHJvIFZFRCAobW9kdWwgVmVkb3Vjw60pXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdWZWREYXNoYm9hcmQgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIG1vZHVsZUluZm9JdGVtczogYW55O1xyXG4gICAgICAgIHByaXZhdGUgTmF6ZXZSZWY6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIE5hemV2RnVuOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBOYXpldlN1OiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBEYXRMb2dpblR4dDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRNb2R1bGVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogbmHEjcOtc3QgaW5mb3JtYWNlIG8gbW9kdWx1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkTW9kdWxlSW5mbygpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdDogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWNvbmRhcnlUZXh0ID0gdGhpcy5OYXpldlJlZiArIFwiIHwgXCIgKyB0aGlzLk5hemV2RnVuICsgXCIgfCBcIiArIFwianJlczozMjAwMDAwM1wiICsgXCI6IFwiICsgdGhpcy5EYXRMb2dpblR4dDsgLy9SQyAzMjAwMDAwMyA6IFBvc2xlZG7DrSBwxZlpaGzDocWhZW7DrVxyXG5cclxuICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IEdPYnNlcnZhYmxlT2JqZWN0KHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwia3BpTGFzdFVzZWRcIiArIFwiX1wiICsgaSxcclxuICAgICAgICAgICAgICAgIGltYWdlOiBHb3JkaWMuVXRpbHMuSWNvbkJ1aWxkZXIuZGVmYXVsdEluc3QuY3JlYXRlTW9kdWxlSWNvbihcIkdXQVZFRDA1XCIpLFxyXG4gICAgICAgICAgICAgICAgcHJpbWFyeVRleHQ6IFwianJlczozMjAwMDAwMlwiLCAvL1JDIDMyMDAwMDAyIDogVmVkb3Vjw61cclxuICAgICAgICAgICAgICAgIHNlY29uZGFyeVRleHQ6IHNlY29uZGFyeVRleHQsXHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubW9kdWxlSW5mb0l0ZW1zID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoW3tcclxuICAgICAgICAgICAgICAgIGlkOiBcIm1vZHVsZUluZm9cIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgem9uZTogMSxcclxuICAgICAgICAgICAgICAgIG1vZGU6IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaUltYWdlVHdvUm93c1RleHRUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhyZXN1bHQpXHJcbiAgICAgICAgICAgIH1dLCB7IGtleTogW1wiaWRcIl0gfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZGFzaGJvYXJkcGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMubW9kdWxlSW5mb0l0ZW1zLFxyXG4gICAgICAgICAgICAgICAgbGF5b3V0OiBcImhvcml6b250YWxcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgc29ydGFibGU6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLlZlZC5XZWJDb250cm9scyB7XHJcblxyXG4gICAgY29uc3QgeyBnY29udGVudCB9ID0gRGVjb3JhdG9ycztcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHVmVkR3JpZCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBMaXN0OiBHb3JkaWMuV2ZsLkludGVyZmFjZS5HRG9rU3Bpc1NpbXBsZUR0b1tdO1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IERhdGEuVmlldyh0aGlzLkxpc3QpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2PlwiKS5nYXV0b2ZpdCgpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldEZvcm1hdChmb3JtYXQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkLmdncmlkKHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JpZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlUm93ID0gdGhpcy5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZVJvdyAhPSBudWxsICYmIGFjdGl2ZVJvdy5JeHAgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuU3NsLkRpYWxvZ3MuRGV0YWlsKHRoaXMsIHsgRGV0YWlsRHRvOiB7IGl4cDogYWN0aXZlUm93Lkl4cCB9LCBFZGl0TW9kZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInZlZEdyaWROYW1lXCIsXHJcbiAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIixcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidmVkLW1haW5ncmlkXCIsXHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIixcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IGZvcm1hdCxcclxuICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IHRoaXMuc2V0U2VhcmNoQ29sdW1ucyhmb3JtYXQpLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRGb3JtYXQoZm9ybWF0OiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KSB7XHJcbiAgICAgICAgICAgIGZvcm1hdFxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4cFwiLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwNTJcIiwgd2lkdGg6IDE1MCB9KSAvL1JDIDMyMDAwMDUyIDogSWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgIC8vLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIkNqXCIsIGNhcHRpb246IFwianJlczozMjAwMDA1M1wiLCB3aWR0aDogMTUwIH0pIC8vUkMgMzIwMDAwNTMgOiBTcGlzLiB6bmHEjWthXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwibmF6ZXZcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDU0XCIsIHdpZHRoOiAyNTAgfSkgLy9SQyAzMjAwMDA1NCA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInpwX3Z5cml6XCIsIGNhcHRpb246IFwianJlczozMjAwMDA1NVwiLCB3aWR0aDogMTUwIH0pIC8vUkMgMzIwMDAwNTUgOiBacMWvc29iIHZ5xZnDrXplbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwic3Bpc196bmFrXCIsIGNhcHRpb246IFwianJlczozMjAwMDA1NlwiLCB3aWR0aDogMTUwIH0pIC8vUkMgMzIwMDAwNTYgOiBTcGlzb3bDvSB6bmFrXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldFNlYXJjaENvbHVtbnMoZm9ybWF0OiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KSB7XHJcbiAgICAgICAgICAgIHZhciBzZWFyY2hDb2x1bW5zID0gW10gYXMgc3RyaW5nW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBmb3JtYXQuY29sdW1ucy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb2x1bW5zID0gZm9ybWF0LmNvbHVtbnNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbnMubmFtZSAhPSBudWxsKSBcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zLnB1c2goY29sdW1ucy5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2VhcmNoQ29sdW1ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5WZWQuV2ViQ29udHJvbHMuR1ZlZFJlcG9ydC50c1x0XHQgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE1vdG9yIHNlc3RhdiBtb2R1bHUgVmVkb3Vjw60gKFdLKVx0XHRcdFx0XHRcdFx0PC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBUb23DocWhIEhhxb5tdWthXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIxXHRcdFx0XHRcdFx0XHQ8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIwLTA3LTE3XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L0NyZWF0ZWQ+XHJcbi8vICAgIDxVcGRhdGVkPiAgICAgMjAyMS0wNy0xOVx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9VcGRhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5WZWQuV2ViQ29udHJvbHMge1xyXG5cclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnM7XHJcbiAgICAvKiogTW90b3Igc2VzdGF2IG1vZHVsdSBWZWRvdWPDrSAoV0spICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHVmVkUmVwb3J0IGV4dGVuZHMgR0NvbnRlbnRCYXNlPEdvcmRpYy5WZWQuV2ViQ29udHJvbHMuR1ZlZFRhc2tzUGFyYW1zQ29udGVudD4ge1xyXG5cclxuICAgICAgICAvKiogdMOpbWEgc2VzdGF2eSAqL1xyXG4gICAgICAgIHByaXZhdGUgdGVtYTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgLyoqIGFrY2UgcHJvIHRpc2sgc2VzdGF2eSAqL1xyXG4gICAgICAgIHByaXZhdGUgcHJpbnRBY3Rpb246IEdQcmludEFjdGlvblR5cGU8YW55PjtcclxuICAgICAgICAvKiogY2VzdGEgY29udGVudHUgKi9cclxuICAgICAgICBwcml2YXRlIGNvbnRlbnRQYXRoOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFBhdGggPSBcIkdWZWRSZXBvcnRcIiArIHRoaXMudGFza190eXBlPy50b1N0cmluZygpICsgdGhpcy5yZXBvcnRfdHlwZT8udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVQcmludEFjdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1lbnVCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVQcmludEFjdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy50ZW1hID0gbnVsbDtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnJlcG9ydF90eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5WZWQuV2ViQ29udHJvbHMuR1ZlZFJlcG9ydFR5cGVFbnVtLlNwZWNpYWw6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5WZWQuV2ViQ29udHJvbHMuR1ZlZFJlcG9ydFR5cGVFbnVtLlZ5dHZvcmVuZURva3VtZW50eURsZVpwcmFjb3ZhdGVsdUJlek5aOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVmVkLldlYkNvbnRyb2xzLkdWZWRSZXBvcnRUeXBlRW51bS5TcGlzeURsZU9ibGFzdGlOZWNsZW5lbmU6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5WZWQuV2ViQ29udHJvbHMuR1ZlZFJlcG9ydFR5cGVFbnVtLlZ5dGl6ZW5vc3RacHJhY292YXRlbHU6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5WZWQuV2ViQ29udHJvbHMuR1ZlZFJlcG9ydFR5cGVFbnVtLlpwdXNvYnlWeXJpemVuaURsZVpwcmFjb3ZhdGVsdTpcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlZlZC5XZWJDb250cm9scy5HVmVkUmVwb3J0VHlwZUVudW0uU3Bpc3lEbGVPYmxhc3RpOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVmVkLldlYkNvbnRyb2xzLkdWZWRSZXBvcnRUeXBlRW51bS5TcGlzeURsZU9ibGFzdGlESVM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1hID0gXCJzc2xfcHRtX3ZlZGt2ZFwiOyAgIC8vIG9iZWNuxJtqxaHDrSBzcGVjaWFsIHTDqW1hXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5WZWQuV2ViQ29udHJvbHMuR1ZlZFJlcG9ydFR5cGVFbnVtLlNwaXN5TmV2eXJpekJlelVrb246XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1hID0gXCJzc2xfcHRtX3ZlZHNuYnVcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlZlZC5XZWJDb250cm9scy5HVmVkUmVwb3J0VHlwZUVudW0uRG9jdW1lbnQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1hID0gXCJzc2xfcHRtX3ZlZGRva1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVmVkLldlYkNvbnRyb2xzLkdWZWRSZXBvcnRUeXBlRW51bS5Gb2xkZXI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1hID0gXCJzc2xfcHRtX3ZlZHNwaVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVmVkLldlYkNvbnRyb2xzLkdWZWRSZXBvcnRUeXBlRW51bS5FcGs6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1hID0gXCJzc2xfcHRtX3ZlZGVwa1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVmVkLldlYkNvbnRyb2xzLkdWZWRSZXBvcnRUeXBlRW51bS5PdGhlcnM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1hID0gXCJzc2xfcHRtX3ZlZG9zdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVmVkLldlYkNvbnRyb2xzLkdWZWRSZXBvcnRUeXBlRW51bS5HcnI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1hID0gXCJzc2xfcHRtX3ZlZGRhdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVmVkLldlYkNvbnRyb2xzLkdWZWRSZXBvcnRUeXBlRW51bS5BdGVzdGFjZTIwMjQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1hID0gXCJzc2xfcHRtX3ZlZGF0c1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy50ZW1hICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJpbnRBY3Rpb24gPSB0aGlzLmFjdGlvbnMuYWRkKEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnlzdHVwQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogdGhpcy50ZW1hLCAgICAgICAgICAgICAgICAgLy8gc3NsX3B0bV92ZWRkb2sgLy8gdXN1X3B0bV9zZGV0c3BpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDIzXCIsICAgLy9SQyAzMjAwMDAyMyA6IFbDvXN0dXBcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMyMDAwMDI0XCIsICAgICAvL1JDIDMyMDAwMDI0IDogVnliZXJ0ZSBzZXN0YXZ1XHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nT3BlbmluZzogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGZkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRGb3JWYWx1ZXModGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGlzVmFsaWQpID0+IHsgaXNWYWxpZCA9PT0gdHJ1ZSA/IGRmZC5yZXNvbHZlKCkgOiBkZmQucmVqZWN0KCk7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7IGRmZC5yZWplY3QoKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRmZC5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlZlZC5XZWJDb250cm9scy5HVmVkUmVwb3J0UGFyYW1Db252ZXJ0ZXI6U2VydmVyUGFyYW1ldGVyTWV0aG9kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IChyZXApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRTdGFydGluZ0luaXRQYXJhbXMocmVwKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoaXMucGFyZW50Q29udGVudCA9PSBudWxsID8gdW5kZWZpbmVkIDogdGhpcy5wYXJlbnRDb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxTY3JlZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2ZybU9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyQ2xhc3M6IFwiR29yZGljLlZlZC5XZWJDb250cm9scy5HVmVkUmVwb3J0Q29udHJvbFwiICAgICAvLyBrdsWvbGkgb25DbGljayBvcGVyYWPDrW1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydEZpbmlzaGVkOiAocmVwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUZsYXNoKFwicHJpbnRGbGFzaElkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaCh7Y29udGVudDogXCJqcmVzOjMyMDAwMDYxXCIsIHN0YXRlOiBcImluZm9cIiwgaWQ6IFwicHJpbnRGbGFzaElkXCIgfSkgLy9SQyAzMjAwMDA2MSA6IFRpc2tvdsOhIHNlc3RhdmEgYnlsYSB2eWdlbmVyb3bDoW5hLlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KSkgYXMgR1ByaW50QWN0aW9uVHlwZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgU3Bpc1BsOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVwb3J0U3RhcnRpbmdJbml0UGFyYW1zKHJlcDogSUdQcmludEFjdGlvblJlcG9ydFN0YXJ0aW5nPGFueT4pIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogYW55ID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBtb2RlbCk7XHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gLS0gcGFyYW1ldHJ5IHBybyBkYXR1bW92w6kgaW50ZXJ2YWx5IC0tXHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZWxbXCJkYXR1bU9kXCJdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXR1bU9kOiBzdHJpbmcgPSBtb2RlbFtcImRhdHVtT2RcIl0udG9VVENTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHJlcC5wYXJhbXNbXCJYMDAwMlwiXSA9IHJlcC5wYXJhbXNbXCJkYXR1bU9kXCJdID0gZGF0dW1PZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobW9kZWxbXCJkYXR1bURvXCJdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXR1bURvOiBzdHJpbmcgPSBtb2RlbFtcImRhdHVtRG9cIl0udG9VVENTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHJlcC5wYXJhbXNbXCJYMDAwM1wiXSA9IHJlcC5wYXJhbXNbXCJkYXR1bURvXCJdID0gZGF0dW1EbztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyBTZXN0YXZhIGRva3VtZW50xa8sIHNwaXPFryBhIGTDrWzFryB0eXBvdsO9Y2ggc3Bpc8WvIHphIHN0YW5vdmVuw6kgb2Jkb2LDrSwga3RlcsO9bSB1cGx5bnVsYSBza2FydGHEjW7DrSBsaMWvdGFcclxuICAgICAgICAgICAgaWYgKHJlcFtcInJlcG9ydElkXCJdID09PSBcIjAwMDBTVFIwMFhWMi8wMDAwQUxWMDg2T1cvMDAwMEFMRjA1RFlPLzBcIikge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHJlcC5wYXJhbXNbXCJkYXR1bU9kXCJdO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHJlcC5wYXJhbXNbXCJkYXR1bURvXCJdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZWwuaXhzU3UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbW9kZWwuaXhzU3UgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtb2RlbC5peHNUeXAgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbW9kZWwuaXhzVHlwID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucmVwb3J0X3R5cGUgPT09IEdWZWRSZXBvcnRUeXBlRW51bS5HcnIpIHtcclxuICAgICAgICAgICAgICAgIHJlcC5wYXJhbXNbXCJYMDAwMFwiXSA9IG1vZGVsLml4c1N1O1xyXG4gICAgICAgICAgICAgICAgcmVwLnBhcmFtc1tcIlgwMDAxXCJdID0gbW9kZWwuaXhzVHlwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpdGVtIGluIG1vZGVsKVxyXG4gICAgICAgICAgICAgICAgbW9kZWxbaXRlbV0gPSBtb2RlbFtpdGVtXSA9PSBudWxsID8gXCJcIiA6IG1vZGVsW2l0ZW1dO1xyXG4gICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCByZXAucGFyYW1zLCBtb2RlbCk7XHJcblxyXG4gICAgICAgICAgICByZXAucGFyYW1zW1wic3NsZGVuMVwiXSA9IG1vZGVsW1wic3NsZGVuMVwiXSA9PSBudWxsID8gbnVsbCA6IG1vZGVsW1wic3NsZGVuMVwiXTtcclxuICAgICAgICAgICAgcmVwLnBhcmFtc1tcInNzbGRlbjJcIl0gPSBtb2RlbFtcInNzbGRlbjJcIl0gPT0gbnVsbCA/IG51bGwgOiBtb2RlbFtcInNzbGRlbjJcIl07XHJcbiAgICAgICAgICAgIHJlcC5wYXJhbXNbXCJzc2xkZW4zXCJdID0gbW9kZWxbXCJzc2xkZW4zXCJdID09IG51bGwgPyBudWxsIDogbW9kZWxbXCJzc2xkZW4zXCJdO1xyXG4gICAgICAgICAgICByZXAucGFyYW1zW1wic3NsZGVuNFwiXSA9IG1vZGVsW1wic3NsZGVuNFwiXSA9PSBudWxsID8gbnVsbCA6IG1vZGVsW1wic3NsZGVuNFwiXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhcnI6IGFueVtdID0gbW9kZWxbXCJrZXl3b3Jkc1wiXTtcclxuICAgICAgICAgICAgcmVwLnBhcmFtc1tcImtleXdvcmRzXCJdID0gYXJyICYmIGFyci5sZW5ndGggPyBhcnIubWFwKHggPT4geC5rbF9zbG92bykuam9pbignLCcpIDogXCJcIjtcclxuXHJcbiAgICAgICAgICAgIGlmIChtb2RlbFtcImZjXCJdICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXAucGFyYW1zW1wiZmNcIl0gPSBtb2RlbFtcImZjXCJdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuU3Bpc1BsICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXAucGFyYW1zW1wic3Bpc1BsXCJdID0gdGhpcy5TcGlzUGw7XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZWxbXCJjaGNrRGF0ZUNyZWF0ZVwiXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmVwLnBhcmFtc1tcImNoY2tEYXRlQ3JlYXRlXCJdID0gbW9kZWxbXCJjaGNrRGF0ZUNyZWF0ZVwiXS52YWx1ZSA9PT0gMSA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLml4c19zdSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml4c19zdSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHRoYXptdWthICgxMS4xMS4yMDIxKSAtICBuZXZ5xZnDrXplbsOtIHNwaXN5IGJleiDDumtvbnVcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVwb3J0X3R5cGUgPT09IEdvcmRpYy5WZWQuV2ViQ29udHJvbHMuR1ZlZFJlcG9ydFR5cGVFbnVtLlNwaXN5TmV2eXJpekJlelVrb24pIHtcclxuICAgICAgICAgICAgICAgIHJlcC5wYXJhbXNbXCJYMDAwMFwiXSA9IG1vZGVsW1wicG9jZXRcIl0gPT0gbnVsbCA/IDAgOiBtb2RlbFtcInBvY2V0XCJdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5yZXBvcnRfdHlwZSA9PT0gR29yZGljLlZlZC5XZWJDb250cm9scy5HVmVkUmVwb3J0VHlwZUVudW0uRG9jdW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXAucGFyYW1zW1wicHV2b2RcIl0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zW1wicHV2b2RcIl0gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcC5wYXJhbXNbXCJpeHNUeXBcIl0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zW1wiaXhzVHlwXCJdID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmIChyZXAucGFyYW1zW1wiZm9ybWFcIl0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zW1wiZm9ybWFcIl0gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhhem11a2E6IHVwZGF0ZWQgKDcuMy4yMDI0KVxyXG4gICAgICAgICAgICAgICAgcmVwLnBhcmFtc1tcIml4c1N1XCJdID0gKHRoaXMudGFza190eXBlID09PSBHVmVkVGFza1R5cGVFbnVtLk5vZGUgJiYgdGhpcy5peHNfc3UgIT0gbnVsbCAmJiB0aGlzLml4c19zdSAhPT0gXCJcIikgPyB0aGlzLml4c19zdSA6IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlcG9ydF90eXBlID09PSBHb3JkaWMuVmVkLldlYkNvbnRyb2xzLkdWZWRSZXBvcnRUeXBlRW51bS5Gb2xkZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXAucGFyYW1zW1wic3NsZGVuMVwiXSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXNbXCJzc2xkZW4xXCJdID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmIChyZXAucGFyYW1zW1wiaXhzVHlwXCJdID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtc1tcIml4c1R5cFwiXSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGF6bXVrYTogdXBkYXRlZCAoNy4zLjIwMjQpXHJcbiAgICAgICAgICAgICAgICByZXAucGFyYW1zW1wiaXhzU3VcIl0gPSAodGhpcy50YXNrX3R5cGUgPT09IEdWZWRUYXNrVHlwZUVudW0uTm9kZSAmJiB0aGlzLml4c19zdSAhPSBudWxsICYmIHRoaXMuaXhzX3N1ICE9PSBcIlwiKSA/IHRoaXMuaXhzX3N1IDogXCJcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucmVwb3J0X3R5cGUgPT09IEdvcmRpYy5WZWQuV2ViQ29udHJvbHMuR1ZlZFJlcG9ydFR5cGVFbnVtLk90aGVycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcC5wYXJhbXNbXCJpeHNUeXBcIl0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zW1wiaXhzVHlwXCJdID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vIHRoYXptdWthOiB1cGRhdGVkICg3LjMuMjAyNClcclxuICAgICAgICAgICAgICAgIHJlcC5wYXJhbXNbXCJpeHNTdVwiXSA9ICh0aGlzLnRhc2tfdHlwZSA9PT0gR1ZlZFRhc2tUeXBlRW51bS5Ob2RlICYmIHRoaXMuaXhzX3N1ICE9IG51bGwgJiYgdGhpcy5peHNfc3UgIT09IFwiXCIpID8gdGhpcy5peHNfc3UgOiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5yZXBvcnRfdHlwZSA9PT0gR29yZGljLlZlZC5XZWJDb250cm9scy5HVmVkUmVwb3J0VHlwZUVudW0uRXBrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVwLnBhcmFtc1tcInR5cFBvemFkYXZrdVwiXSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXNbXCJ0eXBQb3phZGF2a3VcIl0gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhhem11a2E6IHVwZGF0ZWQgKDcuMy4yMDI0KVxyXG4gICAgICAgICAgICAgICAgcmVwLnBhcmFtc1tcIml4c1N1XCJdID0gKHRoaXMuaXhzX3N1ICE9IG51bGwgJiYgdGhpcy5peHNfc3UgIT09IFwiXCIpID8gdGhpcy5peHNfc3UgOiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5yZXBvcnRfdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVmVkLldlYkNvbnRyb2xzLkdWZWRSZXBvcnRUeXBlRW51bS5Eb2N1bWVudDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm1SZXBvcnREb2soKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlZlZC5XZWJDb250cm9scy5HVmVkUmVwb3J0VHlwZUVudW0uRm9sZGVyOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybVJlcG9ydFNwaXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlZlZC5XZWJDb250cm9scy5HVmVkUmVwb3J0VHlwZUVudW0uRXBrOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybVJlcG9ydEVwaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVmVkLldlYkNvbnRyb2xzLkdWZWRSZXBvcnRUeXBlRW51bS5PdGhlcnM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtUmVwb3J0T3N0YXRuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVmVkLldlYkNvbnRyb2xzLkdWZWRSZXBvcnRUeXBlRW51bS5HcnI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtUmVwb3J0R3JyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5WZWQuV2ViQ29udHJvbHMuR1ZlZFJlcG9ydFR5cGVFbnVtLlNwaXN5TmV2eXJpekJlelVrb246XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtUmVwb3J0U3Bpc3lOZXZ5cml6QmV6VWtvbnUoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlZlZC5XZWJDb250cm9scy5HVmVkUmVwb3J0VHlwZUVudW0uQXRlc3RhY2UyMDI0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybVJlcG9ydEF0ZXN0YWNlMjAyNCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVmVkLldlYkNvbnRyb2xzLkdWZWRSZXBvcnRUeXBlRW51bS5TcGVjaWFsOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVmVkLldlYkNvbnRyb2xzLkdWZWRSZXBvcnRUeXBlRW51bS5acHVzb2J5VnlyaXplbmlEbGVacHJhY292YXRlbHU6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5WZWQuV2ViQ29udHJvbHMuR1ZlZFJlcG9ydFR5cGVFbnVtLlZ5dGl6ZW5vc3RacHJhY292YXRlbHU6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5WZWQuV2ViQ29udHJvbHMuR1ZlZFJlcG9ydFR5cGVFbnVtLlNwaXN5RGxlT2JsYXN0aU5lY2xlbmVuZTpcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlZlZC5XZWJDb250cm9scy5HVmVkUmVwb3J0VHlwZUVudW0uVnl0dm9yZW5lRG9rdW1lbnR5RGxlWnByYWNvdmF0ZWx1QmV6Tlo6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5WZWQuV2ViQ29udHJvbHMuR1ZlZFJlcG9ydFR5cGVFbnVtLlNwaXN5RGxlT2JsYXN0aTpcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlZlZC5XZWJDb250cm9scy5HVmVkUmVwb3J0VHlwZUVudW0uU3Bpc3lEbGVPYmxhc3RpRElTOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybVNwZWNpYWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtU3BlY2lhbCgpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIDEuIHZ5dHZvxZllbsOpIGRva3VtZW50eSBkbGUgenByYWNvdmF0ZWzFryBiZXogTlpcclxuICAgICAgICAgICAgLy8gMi4gc3Bpc3kgZGxlIG9ibGFzdGkgbmXEjWxlbsSbbsOpXHJcbiAgICAgICAgICAgIC8vIDMuIHZ5dMOtxb5pdGVsbm9zdCB6cHJhY292YXRlbMWvXHJcbiAgICAgICAgICAgIC8vIDQuIHpwxa9zb2J5IHZ5xZnDrXplbsOtIGRsZSB6cHJhY292YXRlbMWvXHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgdmFyIEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkZvcm1WZWRSZXBvcnRcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEsIEwtMy04LTEsIE0tMTItMTEtMSwgUy0xMi0xMS0xLCBicmVha3MtNzAwLTEwMDBcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRGF0ZVRpbWVGaWVsZHMoeyBGb3JtOiBGb3JtLCBsYWJlbEZyb206IFwianJlczozMjAwMDAzOFwiLCBsYWJlbFRvOiBcImpyZXM6MzIwMDAwMzlcIiB9KTsgLy9SQyAzMjAwMDAzOCA6IE9kIC8vUkMgMzIwMDAwMzkgOiBEb1xyXG4gICAgICAgICAgICB0aGlzLnNldFNzbGRlbkZpZWxkcyhGb3JtLCA0KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBuZURhdHVtVnl0dm9yZW5lID0geyB2YWx1ZTogMCwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDQ2XCIgfTsgLy9SQyAzMjAwMDA0NiA6IE5lXHJcbiAgICAgICAgICAgIHZhciBhbm9EYXR1bVZ5dHZvcmVuZSA9IHsgdmFsdWU6IDEsIGNhcHRpb246IFwianJlczozMjAwMDA0N1wiIH07IC8vUkMgMzIwMDAwNDcgOiBBbm9cclxuICAgICAgICAgICAgdmFyIGRhdGFEYXR1bVZ5dHZvcmVuZSA9IFtuZURhdHVtVnl0dm9yZW5lLCBhbm9EYXR1bVZ5dHZvcmVuZV07XHJcblxyXG4gICAgICAgICAgICAvLyAyLiBzcGlzeSBkbGUgb2JsYXN0aSBuZcSNbGVuxJtuw6lcclxuICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzIwMDAwNDVcIikgLy9SQyAzMjAwMDA0NSA6IEZpbHRyb3ZhdCBkbGUgZGF0YSB2eXR2b8WZZW7DrSBzcGlzdVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWNvbjogJ2ZhLXN0YXInLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLWluZm9cIiwgYWxpZ246IFwib3Bwb3NpdGVcIiwgdG9vbHRpcDogXCJqcmVzOjMyMDAwMDQ4XCIgfSAvL1JDIDMyMDAwMDQ4IDogVGVudG8gZmlsdHIgcGxhdMOtIHBvdXplIHBybyBzZXN0YXZ1IFNwaXN5IGRsZSBvYmxhc3RpIG5lxI1sZW7Em27DqVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaGNrRGF0ZUNyZWF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMjAwMDA0NFwiLCAvL1JDIDMyMDAwMDQ0IDogU3Rvcm5vdmFuw6kgc3Bpc3kgc2UgbmHEjcOtdGFqw60gcG91emUgdiBwxZnDrXBhZMSbIHBvdcW+aXTDrSBmaWx0cnUgZGxlIGRhdHVtdSB2eXR2b8WZZW7DrSBzcGlzdS5cclxuICAgICAgICAgICAgICAgICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJ3LTZcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhRGF0dW1WeXR2b3JlbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YT8uY2FwdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8gNC4genDFr3NvYnkgdnnFmcOtemVuw60gZGxlIHpwcmFjb3ZhdGVsxa9cclxuICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzIwMDAwNDBcIikgLy9SQyAzMjAwMDA0MCA6IEvDs2QgZnVua2NlXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpY29uOiAnZmEtc3RhcicsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtaW5mb1wiLCBhbGlnbjogXCJvcHBvc2l0ZVwiLCB0b29sdGlwOiBcImpyZXM6MzIwMDAwNTBcIiB9IC8vUkMgMzIwMDAwNTAgOiBUZW50byBmaWx0ciBwbGF0w60gcG91emUgcHJvIHNlc3RhdnUgWnDFr3NvYnkgdnnFmcOtemVuw60gZGxlIHpwcmFjb3ZhdGVsxa9cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmNcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIEZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMyMDAwMDU5XCIpIC8vUkMgMzIwMDAwNTkgOiBLbMOtxI1vdsOhIHNsb3ZhXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJna2V5d29yZHNiYXJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtleXdvcmRzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMyMDAwMDU5XCIgLy9SQyAzMjAwMDA1OSA6IEtsw63EjW92w6Egc2xvdmFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZm9ybS5nZm9ybShcImNyZWF0ZUZyb21cIiwgRm9ybSk7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybVJlcG9ydFNwaXN5TmV2eXJpekJlelVrb251KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJGb3JtVmVkUmVwb3J0XCIsXHJcbiAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTEsIGJyZWFrcy03MDAtMTAwMFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzIwMDAwMzVcIikgLy9SQyAzMjAwMDAzNSA6IEJleiDDumtvbnUgZG7Fr1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb2NldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pblZhbHVlOiAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRTc2xkZW5GaWVsZHMoRm9ybSwgNCk7XHJcblxyXG4gICAgICAgICAgICBmb3JtLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBGb3JtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybVJlcG9ydEF0ZXN0YWNlMjAyNCgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiRm9ybVZlZEF0ZXN0XCIsXHJcbiAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTEsIGJyZWFrcy03MDAtMTAwMFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVEYXRlVGltZUZpZWxkcyh7XHJcbiAgICAgICAgICAgICAgICBGb3JtOiBGb3JtLFxyXG4gICAgICAgICAgICAgICAgbGFiZWxGcm9tOiBcImpyZXM6MzIwMDAwMTNcIiwgLy9SQyAzMjAwMDAxMyA6IERhdHVtIHBvZMOhbsOtIG9kXHJcbiAgICAgICAgICAgICAgICBsYWJlbFRvOiBcImpyZXM6MzIwMDAwMTRcIiAvL1JDIDMyMDAwMDE0IDogRGF0dW0gcG9kw6Fuw60gZG9cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmb3JtLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBGb3JtKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm1SZXBvcnREb2soKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkZvcm1WZWRSZXBvcnRcIixcclxuICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMSwgYnJlYWtzLTcwMC0xMDAwXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZURhdGVUaW1lRmllbGRzKHtcclxuICAgICAgICAgICAgICAgIEZvcm06IEZvcm0sXHJcbiAgICAgICAgICAgICAgICBsYWJlbEZyb206IFwianJlczozMjAwMDAxM1wiLCAvL1JDIDMyMDAwMDEzIDogRGF0dW0gcG9kw6Fuw60gb2RcclxuICAgICAgICAgICAgICAgIGxhYmVsVG86IFwianJlczozMjAwMDAxNFwiIC8vUkMgMzIwMDAwMTQgOiBEYXR1bSBwb2TDoW7DrSBkb1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzIwMDAwMTVcIikgLy9SQyAzMjAwMDAxNSA6IFDFr3ZvZFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Qud2ZsY3B1digpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGlzLmdldFZhbHVlRnJvbVVzZXJTZXR0aW5ncyhcInB1dm9kXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHV2b2RcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5wdXZvZD12YWx1ZS5wdXZvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUZyb21Vc2VyU2V0dGluZ3MoXCJwdXZvZFwiLCBvYmoudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICBGb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMjAwMDAxNlwiKSAvL1JDIDMyMDAwMDE2IDogVHlwIGRva3VtZW50dVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3Nsc3R5cCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGlzLmdldFZhbHVlRnJvbVVzZXJTZXR0aW5ncyhcIml4c1R5cFwiKSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c1R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c1R5cD12YWx1ZS5peHNfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlRnJvbVVzZXJTZXR0aW5ncyhcIml4c1R5cFwiLCBvYmoudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICB2YXIgaW5pdGlhbFZhbHVlc0Zvcm1Eb2M6IEdWZWRGb3JtRG9jW10gPSBbXTtcclxuICAgICAgICAgICAgaW5pdGlhbFZhbHVlc0Zvcm1Eb2MucHVzaCh7IHZhbHVlOiBHVmVkRm9ybURvY0VudW0uRnl6T3JpZywgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDIyXCIgfSk7IC8vUkMgMzIwMDAwMjIgOiBGeXppY2vDvSBvcmlnaW7DoWxcclxuICAgICAgICAgICAgaW5pdGlhbFZhbHVlc0Zvcm1Eb2MucHVzaCh7IHZhbHVlOiBHVmVkRm9ybURvY0VudW0uRWxPcmlnLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwMjFcIiB9KTsgLy9SQyAzMjAwMDAyMSA6IEVsZWt0cm9uaWNrw70gb3JpZ2luw6FsL3rDoXpuYW1cclxuICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzIwMDAwMTdcIikgLy9SQyAzMjAwMDAxNyA6IEZvcm1hXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoaXMuZ2V0VmFsdWVGcm9tVXNlclNldHRpbmdzKFwiZm9ybWFcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogaW5pdGlhbFZhbHVlc0Zvcm1Eb2MsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmb3JtYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOlwibW9kZWwuZm9ybWE9dmFsdWUudmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZS5jYXB0aW9uID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlPy5jYXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlRnJvbVVzZXJTZXR0aW5ncyhcImZvcm1hXCIsIG9iai52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgXHJcblxyXG4gICAgICAgICAgICB2YXIgaW5pdGlhbFZhbHVlOiBudWxsIHwgeyBpeHNfc3U6IHN0cmluZyB9ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXhzX3N1ICE9IG51bGwgJiYgdGhpcy5peHNfc3UgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZUZyb21TZXR0aW5nID0gdGhpcy5nZXRWYWx1ZUZyb21Vc2VyU2V0dGluZ3MoXCJpeHNTdVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZUZyb21TZXR0aW5nICE9IG51bGwgJiYgdmFsdWVGcm9tU2V0dGluZyAhPT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml4c19zdSA9IHZhbHVlRnJvbVNldHRpbmcuaXhzX3N1O1xyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlID0geyBpeHNfc3U6IHRoaXMuaXhzX3N1ISB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy50YXNrX3R5cGUgIT09IEdWZWRUYXNrVHlwZUVudW0uT3JnYW5pemF0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMyMDAwMDE4XCIpIC8vUkMgMzIwMDAwMTggOiBTcGlzb3bDvSB1emVsXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuR2luLkZpZWxkcy5naW5zcG9kU1NVKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBpbml0aWFsVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzU3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzU3U9dmFsdWUuaXhzX3N1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhKHRoaXMudmVkX3ByZWhsX29yZyAhPT0gMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVGcm9tVXNlclNldHRpbmdzKFwiaXhzU3VcIiwgb2JqLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXhzX3N1ID0gb2JqLnZhbHVlICE9IG51bGwgPyBvYmoudmFsdWUuaXhzX3N1IDogXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5DaG92YW5pU3RyZWRpc2thRGxlVWNlbHUuTkVVUkNFTk8pKVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcm0uZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIEZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtUmVwb3J0T3N0YXRuaSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiRm9ybVZlZFJlcG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEsIEwtMy04LTEsIE0tMTItMTEtMSwgUy0xMi0xMS0xLCBicmVha3MtNzAwLTEwMDBcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRGF0ZVRpbWVGaWVsZHMoe1xyXG4gICAgICAgICAgICAgICAgRm9ybTogRm9ybSxcclxuICAgICAgICAgICAgICAgIGxhYmVsRnJvbTogXCJqcmVzOjMyMDAwMDI5XCIsIC8vUkMgMzIwMDAwMjkgOiBEYXR1bSBvZFxyXG4gICAgICAgICAgICAgICAgbGFiZWxUbzogXCJqcmVzOjMyMDAwMDMwXCIgLy9SQyAzMjAwMDAzMCA6IERhdHVtIGRvXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGluaXRpYWxWYWx1ZTogbnVsbCB8IHsgaXhzX3N1OiBzdHJpbmcgfSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLml4c19zdSAhPSBudWxsICYmIHRoaXMuaXhzX3N1ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVGcm9tU2V0dGluZyA9IHRoaXMuZ2V0VmFsdWVGcm9tVXNlclNldHRpbmdzKFwiaXhzU3VcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVGcm9tU2V0dGluZyAhPSBudWxsICYmIHZhbHVlRnJvbVNldHRpbmcgIT09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5peHNfc3UgPSB2YWx1ZUZyb21TZXR0aW5nLml4c19zdTtcclxuICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZSA9IHsgaXhzX3N1OiB0aGlzLml4c19zdSEgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudGFza190eXBlICE9PSBHVmVkVGFza1R5cGVFbnVtLk9yZ2FuaXphdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIEZvcm1cclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMjAwMDAxOFwiKSAvL1JDIDMyMDAwMDE4IDogU3Bpc292w70gdXplbFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLkdpbi5GaWVsZHMuZ2luc3BvZFNTVSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogaW5pdGlhbFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c1N1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c1N1PXZhbHVlLml4c19zdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogISh0aGlzLnZlZF9wcmVobF9vcmcgIT09IDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlRnJvbVVzZXJTZXR0aW5ncyhcIml4c1N1XCIsIG9iai52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml4c19zdSA9IG9iai52YWx1ZSAhPSBudWxsID8gb2JqLnZhbHVlLml4c19zdSA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuQ2hvdmFuaVN0cmVkaXNrYURsZVVjZWx1Lk5FVVJDRU5PKSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9ybS5nZm9ybShcImNyZWF0ZUZyb21cIiwgRm9ybSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtUmVwb3J0R3JyKCkge1xyXG4gICAgICAgICAgICB2YXIgRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkZvcm1WZWRSZXBvcnRcIixcclxuICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMSwgYnJlYWtzLTcwMC0xMDAwXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRGF0ZVRpbWVGaWVsZHMoe1xyXG4gICAgICAgICAgICAgICAgRm9ybTogRm9ybSxcclxuICAgICAgICAgICAgICAgIGxhYmVsRnJvbTogXCJqcmVzOjMyMDAwMDMxXCIsIC8vUkMgMzIwMDAwMzEgOiBWeXR2b8WZZW55IG9kXHJcbiAgICAgICAgICAgICAgICBsYWJlbFRvOiBcImpyZXM6MzIwMDAwMzJcIiAvL1JDIDMyMDAwMDMyIDogVnl0dm/FmWVueSBkb1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzIwMDAwMTZcIikgLy9SQyAzMjAwMDAxNiA6IFR5cCBkb2t1bWVudHVcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNzbHN0eXAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhpcy5nZXRWYWx1ZUZyb21Vc2VyU2V0dGluZ3MoXCJpeHNUeXBcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNUeXBcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNUeXA9dmFsdWUuaXhzX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUZyb21Vc2VyU2V0dGluZ3MoXCJpeHNUeXBcIiwgb2JqLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3NsZGVuRmllbGRzKEZvcm0sIDEpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGluaXRpYWxWYWx1ZTogbnVsbCB8IHsgaXhzX3N1OiBzdHJpbmcgfSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLml4c19zdSAhPSBudWxsICYmIHRoaXMuaXhzX3N1ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVGcm9tU2V0dGluZyA9IHRoaXMuZ2V0VmFsdWVGcm9tVXNlclNldHRpbmdzKFwiaXhzU3VcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVGcm9tU2V0dGluZyAhPSBudWxsICYmIHZhbHVlRnJvbVNldHRpbmcgIT09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5peHNfc3UgPSB2YWx1ZUZyb21TZXR0aW5nLml4c19zdTtcclxuICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZSA9IHsgaXhzX3N1OiB0aGlzLml4c19zdSEgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzIwMDAwMThcIikgLy9SQyAzMjAwMDAxOCA6IFNwaXNvdsO9IHV6ZWxcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLkdpbi5GaWVsZHMuZ2luc3BvZFNTVSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBpbml0aWFsVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNTdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c1N1PXZhbHVlLml4c19zdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhKHRoaXMudmVkX3ByZWhsX29yZyAhPT0gMCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlRnJvbVVzZXJTZXR0aW5ncyhcIml4c1N1XCIsIG9iai52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXhzX3N1ID0gb2JqLnZhbHVlICE9IG51bGwgPyBvYmoudmFsdWUuaXhzX3N1IDogXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuQ2hvdmFuaVN0cmVkaXNrYURsZVVjZWx1Lk5FVVJDRU5PKSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcm0uZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIEZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtUmVwb3J0U3BpcygpIHtcclxuICAgICAgICAgICAgdmFyIEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJGb3JtVmVkUmVwb3J0XCIsXHJcbiAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTEsIGJyZWFrcy03MDAtMTAwMFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZURhdGVUaW1lRmllbGRzKHtcclxuICAgICAgICAgICAgICAgIEZvcm06IEZvcm0sXHJcbiAgICAgICAgICAgICAgICBsYWJlbEZyb206IFwianJlczozMjAwMDAzMVwiLCAvL1JDIDMyMDAwMDMxIDogVnl0dm/FmWVueSBvZFxyXG4gICAgICAgICAgICAgICAgbGFiZWxUbzogXCJqcmVzOjMyMDAwMDMyXCIgLy9SQyAzMjAwMDAzMiA6IFZ5dHZvxZllbnkgZG9cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFNzbGRlbkZpZWxkcyhGb3JtLCAxKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRhc2tfdHlwZSAhPT0gR1ZlZFRhc2tUeXBlRW51bS5Pcmdhbml6YXRpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbFZhbHVlOiBudWxsIHwgeyBpeHNfc3U6IHN0cmluZyB9ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLml4c19zdSAhPSBudWxsICYmIHRoaXMuaXhzX3N1ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlRnJvbVNldHRpbmcgPSB0aGlzLmdldFZhbHVlRnJvbVVzZXJTZXR0aW5ncyhcIml4c1N1XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZUZyb21TZXR0aW5nICE9IG51bGwgJiYgdmFsdWVGcm9tU2V0dGluZyAhPT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5peHNfc3UgPSB2YWx1ZUZyb21TZXR0aW5nLml4c19zdTtcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWUgPSB7IGl4c19zdTogdGhpcy5peHNfc3UhIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMyMDAwMDE4XCIpIC8vUkMgMzIwMDAwMTggOiBTcGlzb3bDvSB1emVsXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuR2luLkZpZWxkcy5naW5zcG9kU1NVKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBpbml0aWFsVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzU3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzU3U9dmFsdWUuaXhzX3N1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhKHRoaXMudmVkX3ByZWhsX29yZyAhPT0gMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVGcm9tVXNlclNldHRpbmdzKFwiaXhzU3VcIiwgb2JqLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXhzX3N1ID0gb2JqLnZhbHVlICE9IG51bGwgPyBvYmoudmFsdWUuaXhzX3N1IDogXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5DaG92YW5pU3RyZWRpc2thRGxlVWNlbHUuTkVVUkNFTk8pKVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9ybS5nZm9ybShcImNyZWF0ZUZyb21cIiwgRm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm1SZXBvcnRFcGsoKSB7XHJcbiAgICAgICAgICAgIHZhciBGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiRm9ybVZlZFJlcG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEsIEwtMy04LTEsIE0tMTItMTEtMSwgUy0xMi0xMS0xLCBicmVha3MtNzAwLTEwMDBcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVEYXRlVGltZUZpZWxkcyh7XHJcbiAgICAgICAgICAgICAgICBGb3JtOiBGb3JtLFxyXG4gICAgICAgICAgICAgICAgbGFiZWxGcm9tOiBcImpyZXM6MzIwMDAwMzFcIiwgLy9SQyAzMjAwMDAzMSA6IFZ5dHZvxZllbnkgb2RcclxuICAgICAgICAgICAgICAgIGxhYmVsVG86IFwianJlczozMjAwMDAzMlwiIC8vUkMgMzIwMDAwMzIgOiBWeXR2b8WZZW55IGRvXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBGb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMjAwMDAyOFwiKSAvL1JDIDMyMDAwMDI4IDogVHlwIHBvxb5hZGF2a3VcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LndmbGN0cHAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhpcy5nZXRWYWx1ZUZyb21Vc2VyU2V0dGluZ3MoXCJ0eXBQb3phZGF2a3VcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBQb3phZGF2a3VcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC50eXBQb3phZGF2a3U9dmFsdWUudHlwX3BvemFkX3BvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUZyb21Vc2VyU2V0dGluZ3MoXCJ0eXBQb3phZGF2a3VcIiwgb2JqLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBGb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZHVtbXlmaWVsZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNTdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhpcy5peHNfc3UsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBmb3JtLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBGb3JtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRGF0ZVRpbWVGaWVsZHMob3B0OiB7IEZvcm06IEdvcmRpYy5Gb3Jtcy5Gb3JtLCBsYWJlbEZyb206IHN0cmluZywgbGFiZWxUbzogc3RyaW5nIH0pIHtcclxuXHJcbiAgICAgICAgICAgIG9wdC5Gb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogb3B0LmxhYmVsRnJvbVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpY29uOiAnZ2ktcXVlc3Rpb25fYm9sZCcsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtaW5mb1wiLCB0b29sdGlwOiBcImpyZXM6MzIwMDAwNjJcIiB9LCAvL1JDIDMyMDAwMDYyIDogUHJvIHNlc3RhdnUgZG9rdW1lbnTFrywgc3Bpc8WvIGEgZMOtbMWvIHR5cG92w71jaCBzcGlzxa8gemEgc3Rhbm92ZW7DqSBvYmRvYsOtLCBrdGVyw71tIHVwbHludWxhIHNrYXJ0YcSNbsOtIGxoxa90YSBzZSBwxZllZMOhdsOhIHBvdXplIHJvay4gKE5lIGNlbMOpIGRhdHVtKVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdHVtT2RcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVR5cGU6IFwiZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogR29yZGljLlV0aWxzLkRhdGVUaW1lLmdldFN0YXJ0T2ZZZWFyKG5ldyBEYXRlKCkpXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBvcHQubGFiZWxUb1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0dW1Eb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlVHlwZTogXCJkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBHb3JkaWMuVXRpbHMuRGF0ZVRpbWUuZ2V0RW5kT2ZEYXkobmV3IERhdGUoKSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnVCYXIoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lbnVQYXJhbXM6IE1lbnVQYXJhbXNbXSA9IFtdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcmludEFjdGlvbiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBtZW51UGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDAxOVwiLCAvL1JDIDMyMDAwMDE5IDogR2VuZXJvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLnByaW50QWN0aW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIobWVudVBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBtZXRvZGEsIGt0ZXLDoSBwcm92ZWRlIHZhbGlkYWNpIGEgdnLDoXTDrSB2w71zbGVkZWsgdmFsaWRhY2UgYcW+IGplIGZvcm11bMOhxZkgcMWZaXByYXZlblxyXG4gICAgICAgICAqKi9cclxuICAgICAgICBwcml2YXRlIHdhaXRGb3JWYWx1ZXMoZm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50Pik6IEpRdWVyeVByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgICAgICB2YXIgZGZkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBmb3JtLmdmb3JtKFwid2FpdEZvclZhbHVlc1wiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLmdmb3JtKFwiaXNWYWxpZFwiKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoaXNWYWxpZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlKGlzVmFsaWQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkZmQucmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGZkLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgY29uc3QgY29tbWFuZFBhcmFtczogTWVudVBhcmFtc1tdID0gW107XHJcbiAgICAgICAgICAgIGNvbW1hbmRQYXJhbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAwMjBcIiwgLy9SQyAzMjAwMDAyMCA6IFphdsWZw610XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0b2RvOiB6ZXB0YXQgc2UgVmxhc3R5IGphayBkbyBkb3N0YXQgcG8gemF2xZllbsOtIG5hIGhsYXZuw60gc3Ryw6Fua3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKGNvbW1hbmRQYXJhbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRWYWx1ZUZyb21Vc2VyU2V0dGluZ3MobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudXNlclNldHRpbmdzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZVVzZXJTZXR0aW5ncyA9IHRoaXMudXNlclNldHRpbmdzLmdldCh0aGlzLmNvbnRlbnRQYXRoICsgXCIuXCIgKyBuYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVVzZXJTZXR0aW5ncyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSB2YWx1ZVVzZXJTZXR0aW5ncztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldFZhbHVlRnJvbVVzZXJTZXR0aW5ncyhuYW1lOiBzdHJpbmcsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJTZXR0aW5ncyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyU2V0dGluZ3Muc2V0KHRoaXMuY29udGVudFBhdGggKyBcIi5cIiArIG5hbWUsIHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0U3NsZGVuRmllbGRzKEZvcm06IEZvcm1zLkZvcm0sIFBvY2V0UG9saTogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoUG9jZXRQb2xpID49IDEpIHtcclxuICAgICAgICAgICAgICAgIEZvcm1cclxuICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzIwMDAwMjdcIikgLy9SQyAzMjAwMDAyNyA6IERlbsOta3lcclxuXHJcbiAgICAgICAgICAgICAgICBGb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3Nsc2RlbigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdmYS1zdGFyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLXN0YXRlLWluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbjogXCJvcHBvc2l0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMjAwMDA1MVwiIC8vUkMgMzIwMDAwNTEgOiBOxJtrdGVyw6kgc2VzdGF2eSBtYWrDrSBkZW7DrWt5IHBldm7EmyBkYW7DqS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhpcy5nZXRWYWx1ZUZyb21Vc2VyU2V0dGluZ3MoXCJzc2xkZW4xXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNzbGRlbjFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc3NsZGVuMT12YWx1ZS5zc2xkZW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFBvY2V0UG9saSA9PT0gMSA/IFwidy0xMlwiIDogUG9jZXRQb2xpID09PSAyID8gXCJ3LTZcIiA6IFBvY2V0UG9saSA9PT0gMyA/IFwidy00XCIgOiBcInctM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUZyb21Vc2VyU2V0dGluZ3MoXCJzc2xkZW4xXCIsIG9iai52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoUG9jZXRQb2xpID49IDIpIHtcclxuICAgICAgICAgICAgICAgIEZvcm1cclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zc2xzZGVuKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGlzLmdldFZhbHVlRnJvbVVzZXJTZXR0aW5ncyhcInNzbGRlbjJcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3NsZGVuMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5zc2xkZW4yPXZhbHVlLnNzbGRlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFBvY2V0UG9saSA9PT0gMiA/IFwidy02XCIgOiBQb2NldFBvbGkgPT09IDMgPyBcInctNFwiIDogXCJ3LTNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUZyb21Vc2VyU2V0dGluZ3MoXCJzc2xkZW4yXCIsIG9iai52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoUG9jZXRQb2xpID49IDMpIHtcclxuICAgICAgICAgICAgICAgIEZvcm1cclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zc2xzZGVuKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGlzLmdldFZhbHVlRnJvbVVzZXJTZXR0aW5ncyhcInNzbGRlbjNcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3NsZGVuM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5zc2xkZW4zPXZhbHVlLnNzbGRlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFBvY2V0UG9saSA9PT0gMyA/IFwidy00XCIgOiBcInctM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlRnJvbVVzZXJTZXR0aW5ncyhcInNzbGRlbjNcIiwgb2JqLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChQb2NldFBvbGkgPj0gNCkge1xyXG4gICAgICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNzbHNkZW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoaXMuZ2V0VmFsdWVGcm9tVXNlclNldHRpbmdzKFwic3NsZGVuNFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzc2xkZW40XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnNzbGRlbjQ9dmFsdWUuc3NsZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInctM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUZyb21Vc2VyU2V0dGluZ3MoXCJzc2xkZW40XCIsIG9iai52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59Il19
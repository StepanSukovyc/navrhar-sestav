"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ppo;
    (function (Ppo) {
        var Dialogs;
        (function (Dialogs) {
            /**
            * Dialog generování ZUD
            *
            * @author  Tomáš Hažmuka
            * @date    19.08.2020
            *
            * @param   parentContent                        The content.
            * @param   ModOtevreni                    mod otevreni dialogu.
            * @return  .
            */
            function GPpoGenerateZudDlg(parentContent, ModOtevreni) {
                const options = {
                    ID: "PpoGenerateZudId#",
                };
                const deferred = $.Deferred();
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                let isValid = true;
                if (isValid) {
                    Gordic.Gui.Dialogs._openDialog(pContent, deferred, 'Gordic.Ppo.WebControls.GPpoGenerateZud', ModOtevreni, options);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Dialogs.GPpoGenerateZudDlg = GPpoGenerateZudDlg;
        })(Dialogs = Ppo.Dialogs || (Ppo.Dialogs = {}));
    })(Ppo = Gordic.Ppo || (Gordic.Ppo = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ppo;
    (function (Ppo) {
        var WebControls;
        (function (WebControls) {
            class GPpoUtils {
                constructor() {
                }
                /**
                 * je hodnota null, nedefinovaná nebo prázdná ("")?
                 * @param value
                 */
                static isNullUndefinedOrEmpty(value) {
                    if (value == null || value === "")
                        return true;
                    else
                        return false;
                }
                /**
                 * vytvořit pole pro hledání v seznamu
                 */
                static getStringNamesOfColumns(format) {
                    /** sloupce na prohledávání */
                    var searchColumns = [];
                    for (var index = 0; index < format.columns.length; index++) {
                        var columns = format.columns[index];
                        if (columns.name != null) {
                            searchColumns.push(columns.name);
                        }
                    }
                    return searchColumns;
                }
            }
            WebControls.GPpoUtils = GPpoUtils;
        })(WebControls = Ppo.WebControls || (Ppo.WebControls = {}));
    })(Ppo = Gordic.Ppo || (Gordic.Ppo = {}));
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
    var Ppo;
    (function (Ppo) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Statistiky pro VED (modul Vedoucí)
             */
            let GPpoDashboard = class GPpoDashboard extends Gordic.GContentBase {
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
                    var secondaryText = this.NazevRef + " | " + this.NazevFun + " | " + "jres:32000002" + ": " + this.DatLoginTxt; //RC 32000002 : Poslední přihlášení
                    result.push(new GObservableObject({
                        name: "kpiLastUsed" + "_" + i,
                        image: Gordic.Utils.IconBuilder.defaultInst.createModuleIcon("GWAPPO05"),
                        primaryText: "jres:32000003", //RC 32000003 : Transakční protokol
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
            GPpoDashboard = __decorate([
                gcontent
            ], GPpoDashboard);
            WebControls.GPpoDashboard = GPpoDashboard;
        })(WebControls = Ppo.WebControls || (Ppo.WebControls = {}));
    })(Ppo = Gordic.Ppo || (Gordic.Ppo = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ppo.WebControls.GPpoGeneratePpo.ts		            </Name>
//    <Description> Generování PPO							                    </Description>
//    <Author>      Tomáš Hažmuka												</Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2020							</Copyright>
//    <Created>     2020-08-05													</Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ppo;
    (function (Ppo) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Generování PPO
             */
            let GPpoGeneratePpo = class GPpoGeneratePpo extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.tempIxp = null;
                    this.type = 0 /* GPpoGeneratePpoTypeEnum.receive */;
                }
                onContentReady() {
                    this.init();
                }
                init() {
                    this.createMenubar();
                    this.createSubtasks();
                    this.createFilter();
                    this.createGridReceive();
                    this.createGridSend();
                    this.createGridChange();
                }
                openDetail() {
                    this.hideFlash("idEmptyGrid");
                    let grid = this.getGrid();
                    if (grid != null && this.type !== 2 /* GPpoGeneratePpoTypeEnum.change */) {
                        var row = grid.ggrid("activeRow");
                        if (row == null) {
                            this.showFlash("jres:32000034", "warning", "idEmptyGrid"); //RC 32000034 : Seznam je prázdný.
                            return;
                        }
                        Gordic.Wfl.Dialogs.DetailDokumentuSpisu(this, { DetailDto: { ixp: row.ixp }, grid: grid }, Gordic.Global.Enums.ModOtevreni.navigate);
                    }
                }
                getGrid() {
                    let grid = null;
                    if (this.type === 0 /* GPpoGeneratePpoTypeEnum.receive */) {
                        grid = this.gridReceive;
                    }
                    else if (this.type === 1 /* GPpoGeneratePpoTypeEnum.send */) {
                        grid = this.gridSend;
                    }
                    else if (this.type === 2 /* GPpoGeneratePpoTypeEnum.change */) {
                        grid = this.gridChange;
                    }
                    return grid;
                }
                openAttachment() {
                    this.hideFlash("idEmptyGrid");
                    let grid = this.getGrid();
                    if (grid != null) {
                        var row = grid.ggrid("activeRow");
                        if (row == null) {
                            this.showFlash("jres:32000034", "warning", "idEmptyGrid"); //RC 32000034 : Seznam je prázdný.
                            return;
                        }
                        Gordic.Wfl.Dialogs.GPrilohyDlg(this, { Ixp: row.ixp }, Gordic.Global.Enums.ModOtevreni.navigate);
                    }
                }
                createPrintActionPpo() {
                    return this.actions.add(GAction.createPrintAction({
                        name: "vystupAct",
                        tema: "ppo_ptm_tisk",
                        caption: "jres:32000035", //RC 32000035 : Výstup
                        title: "jres:32000036", //RC 32000036 : Vyberte sestavu
                        dialogOpening: () => {
                            var dfd = $.Deferred();
                            this.waitForValues(this.element)
                                .then((isValid) => {
                                if (isValid === true) {
                                    let grid = this.getGrid();
                                    if (grid != null) {
                                        var row = grid.ggrid("activeRow");
                                        if (row != null && row.ixp != null) {
                                            this.tempIxp = row.ixp;
                                            return dfd.resolve(row.ixp);
                                        }
                                    }
                                }
                                return dfd.reject();
                            })
                                .fail(() => {
                                dfd.reject();
                            })
                                .always(() => {
                                // done
                            });
                            return dfd.promise();
                        },
                        reportStarting: (rep) => {
                            var model = {};
                            this.findFields().gfield("model", "collect", model);
                            if (model["Interval"] != null) {
                                //todo původně zde byl takovýto tvar: format("DD.MM.YYYY hh:mm:ss"), ale generátor reportu padal
                                rep.params["X0000"] = Gordic.Templates.Formatters.date(model["Interval"].start).format("yyyy-MM-dd");
                                rep.params["X0001"] = Gordic.Templates.Formatters.date(model["Interval"].end).format("yyyy-MM-dd");
                            }
                            rep.params["X0006"] = this.SessionPrizD?.toString();
                            rep.params["X0007"] = this.SessionLogPorCislo?.toString();
                            rep.params["X0008"] = this.SessionIxsFun;
                            //rep.params["X0009"] = Gordic.Report.Client.GReportX0009.GetDefault(UserProcess); // doplní se samo
                            if (this.tempIxp != null) {
                                rep.params["PID"] = this.tempIxp;
                                this.tempIxp = null;
                            }
                        },
                        parentContent: this.parentContent == null ? undefined : this.parentContent,
                        fullScreen: true
                    }));
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
                createMenubar() {
                    var params = [];
                    params.push({
                        favorite: true,
                        action: new GAction({
                            name: "actDetail",
                            icon: "gi-detail",
                            caption: "jres:32000032", //RC 32000032 : Detail
                            run: () => {
                                this.openDetail();
                            }
                        })
                    });
                    params.push({
                        favorite: true,
                        caption: "jres:32000030", //RC 32000030 : Generovat PPO
                        action: this.createPrintActionPpo()
                    });
                    params.push({
                        favorite: true,
                        action: new GAction({
                            name: "actGenerateZud",
                            caption: "jres:32000031", //RC 32000031 : Generovat ZUD
                            run: () => {
                            }
                        })
                    });
                    params.push({
                        align: "opposite",
                        favorite: true,
                        action: this.actions.add(new GAction({
                            name: "actAttachment",
                            caption: "jres:32000033", //RC 32000033 : Přílohy
                            run: () => {
                                this.openAttachment();
                            }
                        }))
                    });
                    this.menuBar(params);
                }
                setStateAttachmentState() {
                    if (this.actions.actAttachment != null) {
                        this.actions.actAttachment.enabled(this.type !== 2 /* GPpoGeneratePpoTypeEnum.change */);
                    }
                }
                createFilterForm() {
                    var Form = new Gordic.Forms.Form({
                        name: "FormPpoFilter",
                        layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000"
                    });
                    Form
                        .addSection()
                        .addRow({
                        required: true,
                        label: "jres:32000006" //RC 32000006 : Od-do
                    });
                    var intervalValidators = [];
                    intervalValidators.push(new Gordic.Validators.Required());
                    var minValue = Gordic.Utils.DateTime.getStartOfDay(this.MinimalValue);
                    var maxValue = Gordic.Utils.DateTime.getEndOfDay(this.MaxAllowedValue);
                    Form
                        .addField("gintervalbox", {
                        name: "Interval",
                        initialValue: {
                            start: this.LastDate,
                            end: maxValue
                        },
                        validators: intervalValidators,
                        minValue: this.MinimalValue,
                        maxValue: this.MaxAllowedValue
                    });
                    //#region -- generovat pro časové období --
                    var dataGenerateForDatePeriod = [];
                    var WholeSeasonValue = { value: 0 /* GPpoGenerateForDatePeriodEnum.WholeSeason */, caption: "jres:32000067" }; //RC 32000067 : Celé období
                    dataGenerateForDatePeriod.push(WholeSeasonValue);
                    dataGenerateForDatePeriod.push({ value: 1 /* GPpoGenerateForDatePeriodEnum.IndividualDays */, caption: "jres:32000068" }); //RC 32000068 : Jednotlivé dny
                    dataGenerateForDatePeriod.push({ value: 2 /* GPpoGenerateForDatePeriodEnum.IndividualMonths */, caption: "jres:32000069" }); //RC 32000069 : Jednotlivé měsíce
                    Form
                        .addRow({
                        label: "jres:32000007" //RC 32000007 : Generovat pro
                    })
                        .addField("gselectbox", {
                        name: "GenerateForDatePeriod",
                        model: "model.GenerateForDatePeriod=value.value",
                        list: true,
                        data: dataGenerateForDatePeriod,
                        emptyValue: WholeSeasonValue,
                        initialValue: WholeSeasonValue,
                        itemTemplate: (data) => {
                            return data?.caption;
                        },
                        itemWidth: ""
                    });
                    //#endregion
                    //#region -- generovat typ protokolu --
                    var dataGPpoGenerateProtocol = [];
                    var CompleteTransactionProtocolValue = { value: 0 /* GPpoGenerateProtocolEnum.CompleteTransactionProtocol */, caption: "jres:32000070" }; //RC 32000070 : Kompletní transakční protokol
                    dataGPpoGenerateProtocol.push(CompleteTransactionProtocolValue);
                    dataGPpoGenerateProtocol.push({ value: 1 /* GPpoGenerateProtocolEnum.ProtocolSendAndReceive */, caption: "jres:32000072" }); //RC 32000072 : Protokol příjmu a odeslání
                    dataGPpoGenerateProtocol.push({ value: 2 /* GPpoGenerateProtocolEnum.TransactionProtocolOfChanges */, caption: "jres:32000071" }); //RC 32000071 : Transakční protokol změn
                    Form
                        .addRow({
                        label: "jres:32000008" //RC 32000008 : Generovat protokoly
                    })
                        .addField("gselectbox", {
                        name: "GenerateProtocol",
                        model: "model.GenerateProtocol=value.value",
                        list: true,
                        multi: true,
                        emptyValue: CompleteTransactionProtocolValue,
                        initialValue: CompleteTransactionProtocolValue,
                        itemWidth: "",
                        data: dataGPpoGenerateProtocol,
                        itemTemplate: (data) => {
                            return data?.caption;
                        },
                    });
                    //#endregion
                    return Form;
                }
                createFilter() {
                    this.filter = $("<div>").appendTo(this.element)
                        .gfilterpanel({
                        apply: (ev, obj) => {
                            var Interval = obj.filter.Interval;
                            if (this.type === 0 /* GPpoGeneratePpoTypeEnum.receive */) {
                                this.call("LoadDataReceive", { Interval: Interval })
                                    .then((output) => {
                                    if (this.viewReceive != null) {
                                        this.viewReceive.updateData(output);
                                    }
                                });
                            }
                            else if (this.type === 1 /* GPpoGeneratePpoTypeEnum.send */) {
                                this.call("LoadDataSend", { Interval: Interval })
                                    .then((output) => {
                                    if (this.viewSend != null) {
                                        this.viewSend.updateData(output);
                                    }
                                });
                            }
                            else if (this.type === 2 /* GPpoGeneratePpoTypeEnum.change */) {
                                this.call("LoadDataChange", { Interval: Interval })
                                    .then((output) => {
                                    if (this.viewChange != null) {
                                        this.viewChange.updateData(output);
                                    }
                                });
                            }
                        },
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        filterViewMode: FilterViewMode.Simple,
                        //simpleMode: true,
                        favoriteLayoutDescriptor: "L3M2S1",
                        forms: [this.createFilterForm()]
                    });
                }
                createSubtasks() {
                    this.subtask = {
                        badge: {
                            // přijaté
                            receive: new GObservableObject({ value: 0 }),
                            // odeslané
                            send: new GObservableObject({ value: 0 }),
                            // změny
                            change: new GObservableObject({ value: 0 }),
                        }
                    };
                    var params = [];
                    var receive = {
                        action: new GAction({
                            id: 0,
                            name: "actReceiveGrid",
                            caption: "jres:32000010", //RC 32000010 : Dokumenty přijaté
                            run: () => {
                                this.type = 0 /* GPpoGeneratePpoTypeEnum.receive */;
                                this.setStateAttachmentState();
                                this.gridSend.hide();
                                this.gridChange.hide();
                                this.gridReceive.show();
                            }
                        }),
                        badge: this.subtask.badge.receive
                    };
                    params.push(receive);
                    var send = {
                        action: new GAction({
                            id: 1,
                            name: "actSendGrid",
                            caption: "jres:32000011", //RC 32000011 : Dokumenty odeslané
                            run: () => {
                                this.type = 1 /* GPpoGeneratePpoTypeEnum.send */;
                                this.setStateAttachmentState();
                                this.gridReceive.hide();
                                this.gridChange.hide();
                                this.gridSend.show();
                            }
                        }),
                        badge: this.subtask.badge.send
                    };
                    params.push(send);
                    var change = {
                        action: new GAction({
                            id: 2,
                            name: "actChangeGrid",
                            caption: "jres:32000012", //RC 32000012 : Změny
                            run: () => {
                                this.type = 2 /* GPpoGeneratePpoTypeEnum.change */;
                                this.setStateAttachmentState();
                                this.gridReceive.hide();
                                this.gridSend.hide();
                                this.gridChange.show();
                            }
                        }),
                        badge: this.subtask.badge.change
                    };
                    params.push(change);
                    $("<div class='ppo_grid_subtasks'>").appendTo(this.element)
                        .gsubtasks({
                        params: params
                    });
                }
                /** vytvořit seznam pro přijaté dokumenty */
                createGridReceive() {
                    this.viewReceive = new Gordic.Data.View();
                    var formatOutput = this.createFormatReceive();
                    this.gridReceive = $("<div class='ppo_receive_grid'>").gautofit().appendTo(this.element);
                    this.gridReceive.ggrid({
                        defaultAction: new GAction({
                            name: "gridRowSelectedActReceive",
                            run: (ev, ctx) => {
                                this.openDetail();
                            }
                        }),
                        multi: false,
                        data: this.viewReceive,
                        name: "gridReceive",
                        renderMode: "auto",
                        columnMode: "full",
                        customClass: "ts-ppo-grid-receive-class",
                        navigationMode: "row",
                        columns: formatOutput.format,
                        sort: "!dat_mpd0"
                        //searchColumns: formatOutput.searchColumns,
                    });
                }
                /** vytvořit seznam pro odeslané dokumenty */
                createGridSend() {
                    this.viewSend = new Gordic.Data.View();
                    var formatOutput = this.createFormatSend();
                    this.gridSend = $("<div class='ppo_send_grid'>").gautofit().appendTo(this.element);
                    this.gridSend.hide();
                    this.gridSend.ggrid({
                        defaultAction: new GAction({
                            name: "gridRowSelectedActSend",
                            run: (ev, ctx) => {
                                this.openDetail();
                            }
                        }),
                        multi: false,
                        data: this.viewSend,
                        name: "gridSend",
                        renderMode: "auto",
                        columnMode: "full",
                        customClass: "ts-ppo-grid-send-class",
                        navigationMode: "row",
                        columns: formatOutput.format,
                        sort: "!dat_odes"
                        //searchColumns: formatOutput.searchColumns,
                    });
                }
                /** vytvořit seznam pro změny */
                createGridChange() {
                    this.viewChange = new Gordic.Data.View();
                    var formatOutput = this.createFormatChange();
                    this.gridChange = $("<div class='ppochange_grid'>").gautofit().appendTo(this.element);
                    this.gridChange.hide();
                    this.gridChange.ggrid({
                        defaultAction: new GAction({
                            name: "gridRowSelectedActChange",
                            run: (ev, ctx) => {
                                this.openDetail();
                            }
                        }),
                        multi: false,
                        data: this.viewChange,
                        name: "gridChange",
                        renderMode: "auto",
                        columnMode: "full",
                        customClass: "ts-ppo-grid-change-class",
                        navigationMode: "row",
                        columns: formatOutput.format,
                        sort: "!dat_zmena",
                        //searchColumns: formatOutput.searchColumns,
                    });
                }
                createFormatSend() {
                    var format = new Gordic.Data.GridFormat();
                    // + icon sloupec
                    format
                        .addTextColumn({ name: "ixp", caption: "jres:32000013", width: 200 }) //RC 32000013 : PID
                        .addTextColumn({ name: "nazev", caption: "jres:32000014", width: 200 }) //RC 32000014 : Věc
                        .addTextColumn({ name: "akt_znacka", caption: "jres:32000015", width: 200 }) //RC 32000015 : Zn.
                        .addDateTimeColumn({ name: "dat_zmena", caption: "jres:32000016", width: 200 }) //RC 32000016 : Datum změny
                        .addTextColumn({ name: "zmenu_prov_pid_txt", caption: "jres:32000017", width: 200 }) //RC 32000017 : Změnu provedl
                        .addDateTimeColumn({ name: "dat_odes", caption: "jres:32000020", width: 200 }) //RC 32000020 : Datum odeslání
                        .addTextColumn({ name: "esu_txt", caption: "jres:32000021", width: 200 }) //RC 32000021 : Adresát
                        .addTextColumn({ name: "odes_pril", caption: "jres:32000022", width: 200 }) //RC 32000022 : Odeslané přílohy
                        .addTextColumn({ name: "start_fun_txt", caption: "jres:32000023", width: 200 }) //RC 32000023 : Zpracovatel dokumentu či spisu
                        .addTextColumn({ name: "akt_fun_txt", caption: "jres:32000024", width: 200 }); //RC 32000024 : Aktuální vlastník zásilky
                    return { format: format, searchColumns: WebControls.GPpoUtils.getStringNamesOfColumns(format) };
                }
                createFormatReceive() {
                    var format = new Gordic.Data.GridFormat();
                    // + icon sloupec
                    format
                        .addTextColumn({ name: "ixp", caption: "jres:32000013", width: 200 }) //RC 32000013 : PID
                        .addTextColumn({ name: "nazev", caption: "jres:32000014", width: 200 }) //RC 32000014 : Věc
                        .addTextColumn({ name: "akt_znacka", caption: "jres:32000015", width: 200 }) //RC 32000015 : Zn.
                        .addDateTimeColumn({ name: "dat_zmena", caption: "jres:32000016", width: 200 }) //RC 32000016 : Datum změny
                        .addTextColumn({ name: "zmenu_prov_txt", caption: "jres:32000017", width: 200 }) //RC 32000017 : Změnu provedl
                        .addDateTimeColumn({ name: "dat_mpd0", caption: "jres:32000018", width: 200 }) //RC 32000018 : Datum podání
                        .addTextColumn({ name: "esu_txt", caption: "jres:32000019", width: 200 }); //RC 32000019 : Odesílatel
                    return { format: format, searchColumns: WebControls.GPpoUtils.getStringNamesOfColumns(format) };
                }
                createFormatChange() {
                    var format = new Gordic.Data.GridFormat();
                    // + icon sloupec
                    format
                        .addDateTimeColumn({ name: "dat_zmena", caption: "jres:32000016", width: 200 }) //RC 32000016 : Datum změny
                        .addTextColumn({ name: "ixp", caption: "jres:32000013", width: 200 }) //RC 32000013 : PID
                        .addTextColumn({ name: "nazev", caption: "jres:32000014", width: 200 }) //RC 32000014 : Věc
                        .addTextColumn({ name: "akt_znacka", caption: "jres:32000015", width: 200 }) //RC 32000015 : Zn.
                        .addTextColumn({ name: "zmena_txt", caption: "jres:32000025", width: 200 }) //RC 32000025 : Provedená operace
                        .addTextColumn({ name: "poznamka", caption: "jres:32000026", width: 200 }) //RC 32000026 : Poznámka
                        .addTextColumn({ name: "zmenu_prov_txt", caption: "jres:32000017", width: 200 }); //RC 32000017 : Změnu provedl
                    return { format: format, searchColumns: WebControls.GPpoUtils.getStringNamesOfColumns(format) };
                }
                /**
                * metoda vrati seznam transakcnich protokolu, ktere se maji vygenerovat
                */
                getListGenerateTransProtocol() {
                    //#region -- doplnění spis_pl a spis_znaku z db parametru --
                    var spPlan = "";
                    var spZnak = "";
                    (this.ppo_sppl == null ? "" : this.ppo_sppl).trim().split(",").map((item, index) => {
                        if (item != null) {
                            if (index === 0)
                                spPlan = item;
                            else if (index === 1)
                                spZnak = item;
                        }
                    });
                    //#endregion
                    var model = {};
                    this.findFields().gfield("model", "collect", model);
                    if (model != null && model.GenerateForDatePeriod != null) {
                        //!? vytvori jeden protokol pro cele obdobi
                        if (model.GenerateForDatePeriod == 0 /* GPpoGenerateForDatePeriodEnum.WholeSeason */) {
                        }
                        //!? vytvori protokol pro kazdy den v obdobi
                        else if (model.GenerateForDatePeriod == 1 /* GPpoGenerateForDatePeriodEnum.IndividualDays */) {
                        }
                        //!? vytvori protokol pro kazdy mesic v obdobi
                        else if (model.GenerateForDatePeriod == 2 /* GPpoGenerateForDatePeriodEnum.IndividualMonths */) {
                        }
                    }
                }
            };
            GPpoGeneratePpo = __decorate([
                gcontent
            ], GPpoGeneratePpo);
            WebControls.GPpoGeneratePpo = GPpoGeneratePpo;
        })(WebControls = Ppo.WebControls || (Ppo.WebControls = {}));
    })(Ppo = Gordic.Ppo || (Gordic.Ppo = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ppo;
    (function (Ppo) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Generování PPO
             */
            let GPpoGenerateZud = class GPpoGenerateZud extends Gordic.GContentBase {
                onContentReady() {
                    this.createForm();
                    this.createContextMenu();
                }
                createContextMenu() {
                    var params = [];
                    params.push({
                        favorite: true,
                        action: new GAction({
                            name: "generateZud",
                            caption: "jres:32000105", //RC 32000105 : Generovat
                            run: () => {
                                Gordic.Utils.waitForValues(this.form)
                                    .then((isValid) => {
                                    if (isValid === true) {
                                        var dto = {};
                                        this.findFields("selection").gfield("model", "collect", dto);
                                        if (dto != null && dto.selection != null) {
                                            var value = dto.selection.value;
                                            this.beginOperation({
                                                id: "idFlashZud",
                                                text: "jres:32000107" //RC 32000107 : Probíhá operace, v některých případech může trvat poměrně dlouho
                                            });
                                            this.generateZud(value)
                                                .then(() => {
                                                this.tryClose(true);
                                            })
                                                .fail(() => {
                                                this.tryClose(false);
                                            })
                                                .always(() => {
                                                this.endOperation("idFlashZud");
                                            });
                                        }
                                    }
                                });
                            }
                        })
                    });
                    this.commandBar(params);
                }
                generateZud(value) {
                    return this.call("GenerateZUD", { Value: value }, {}, { progressState: false });
                }
                createForm() {
                    var data = [];
                    /** denní kompletní transakční protokol */
                    var completeProtocol = { value: 10 /* Wfl.Interface.GPpoTpTypeEnum.DenniKompletniTransakcniProtokolZmenZud */, caption: "jres:32000103" }; //RC 32000103 :  Denní kompletní transakční protokol
                    /** denní transakční protokol změn */
                    var changeProtocol = { value: 12 /* Wfl.Interface.GPpoTpTypeEnum.DenniTransakcniProtokolZmenZud */, caption: "jres:32000104" }; //RC 32000104 : Denní transakční protokol změn
                    data.push(completeProtocol);
                    data.push(changeProtocol);
                    var Form = new Gordic.Forms.Form({
                        name: "FormPpoGenerateZud",
                        layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000"
                    });
                    Form
                        .addSection()
                        .addRow("jres:32000106") //RC 32000106 : Výběr
                        .addField("gselectbox", {
                        validators: [new Gordic.Validators.Required()],
                        name: "selection",
                        initialValue: completeProtocol,
                        data: data,
                        list: true,
                        itemWidth: "",
                        itemTemplate: (data) => {
                            return data?.caption;
                        }
                    });
                    this.form = $("<div>").appendTo(this.element);
                    this.form.gform("createFrom", Form);
                }
            };
            GPpoGenerateZud = __decorate([
                gcontent
            ], GPpoGenerateZud);
            WebControls.GPpoGenerateZud = GPpoGenerateZud;
        })(WebControls = Ppo.WebControls || (Ppo.WebControls = {}));
    })(Ppo = Gordic.Ppo || (Gordic.Ppo = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ppo.WebControls.GPpoHistoryDocSpis.ts		        </Name>
//    <Description> Historie dokumentu/spisu						            </Description>
//    <Author>      Tomáš Hažmuka												</Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2020							</Copyright>
//    <Created>     2020-08-07													</Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ppo;
    (function (Ppo) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Generování PPO
             */
            let GPpoHistoryDocSpis = class GPpoHistoryDocSpis extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.TEMP_TAB_INDEX = "99999";
                }
                onContentReady() {
                    this.search();
                }
                /** spuštění dialogu hledání */
                search() {
                    this.element.empty();
                    Gordic.Wfl.Dialogs.GHledatIdentDokSpisDlg(this, {})
                        .then((output) => {
                        this.init(output == null || output.ixp == null ? null : output.ixp);
                    });
                }
                createMenubar() {
                    var params = [];
                    params.push({
                        favorite: true,
                        action: this.actions.add(new GAction({
                            caption: "jres:32000087", //RC 32000087 : Hledat
                            name: "actSearch",
                            icon: "gi-magglass",
                            tooltip: "jres:32000088", //RC 32000088 : Otevřít dialog hledání dle identifikátoru
                            run: () => {
                                this.search();
                            }
                        }))
                    });
                    if (this.printAction != null) {
                        params.push({
                            caption: "jres:32000097", //RC 32000097 : Generovat
                            tooltip: "jres:32000098", //RC 32000098 : Vygeneruje sestavu historie dokumentu
                            favorite: true,
                            action: this.printAction
                        });
                    }
                    this.menuBar(params);
                }
                setEnabledToPrintAction(enabled) {
                    if (this.printAction != null) {
                        this.printAction.update({ enabled: enabled });
                    }
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
                createPrintAction() {
                    this.printAction = this.actions.add(GAction.createPrintAction({
                        enabled: false,
                        name: "vystupAct",
                        tema: "ppo_hdk_tisk",
                        caption: "jres:32000099", //RC 32000099 : Výstup
                        title: "jres:32000100", //RC 32000100 : Vyberte sestavu
                        dialogOpening: () => {
                            var dfd = $.Deferred();
                            this.waitForValues(this.element)
                                .then((isValid) => { isValid === true ? dfd.resolve() : dfd.reject(); })
                                .fail(() => { dfd.reject(); });
                            return dfd.promise();
                        },
                        reportStarting: (rep) => {
                            var model = {};
                            this.findFields().gfield("model", "collect", model);
                            rep.params["X0000"] = model.Ixp;
                            rep.params["X0002"] = this.TEMP_TAB_INDEX;
                            rep.params["X0007"] = this.SessionLogPorCislo?.toString();
                            rep.params["X0008"] = this.SessionIxsFun;
                        },
                        parentContent: this.parentContent == null ? undefined : this.parentContent,
                        fullScreen: true
                    }));
                }
                createIxpList(data) {
                    var list = [];
                    if (data == null || data.length === 0)
                        return list;
                    for (var index = 0; index < data.length; index++) {
                        var value = data[index];
                        if (value != null && value.Ixp != null) {
                            list.push({
                                ixp: value.Ixp,
                                isSpis: value.DocInfo?.IsSpis
                            });
                        }
                    }
                    return list;
                }
                init(ixp) {
                    this.createPrintAction();
                    this.createMenubar();
                    this.call("CreateHistory", { Ixp: ixp })
                        .then((output) => {
                        if (output != null) {
                            this.setEnabledToPrintAction(true);
                        }
                        this.data = output;
                        this.createForm(this.createIxpList(output), output);
                        this.grids = $("<div class='grids'>").appendTo(this.element);
                        // pokud existují data, setnu je do formuláře
                        if (output != null && output.length > 0) {
                            this.applyContent(output[0]);
                        }
                    });
                }
                applyContent(data) {
                    //! model apply
                    if (this.form != null && data != null) {
                        if (data.DocInfo != null) {
                            this.form.findFields().gfield("model", "apply", data.DocInfo, { initialValues: true });
                        }
                        else {
                            this.form.findFields().gfield("clear");
                        }
                        if (this.grids != null) {
                            this.grids.empty();
                        } // vyčistění předchozího contentu
                        this.createGrid("Historie", "jres:32000084", "!dat_zmena", this.createFormat(0 /* GPpoTypeGridHistoryDocSpisEnum.Hist */), data.HistorieZmenDto); //RC 32000084 : Historie
                        this.createGrid("ElSoubory", "jres:32000085", "!dat_zmena", this.createFormat(1 /* GPpoTypeGridHistoryDocSpisEnum.ElDocs */), data.SeznamPodpisuElSouboruDto); //RC 32000085 : El. soubory
                        if (data.DocInfo?.IsSpis === true) {
                            this.createGrid("SbernyArch", "jres:32000086", "por_cislo", this.createFormat(2 /* GPpoTypeGridHistoryDocSpisEnum.Arch */), data.SeznamSbernyArchSpisuDto); //RC 32000086 : Sběrný arch spisu
                        }
                    }
                }
                /**
                 * vytvořit formulář
                 * @param ixpList seznam identifikátorů pro výběr
                 * @param data data do seznamu a formuláře
                 */
                createForm(ixpList, data) {
                    var Form = new Gordic.Forms.Form({
                        name: "FormPpoHistoryDokSpis",
                        layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000"
                    });
                    //#region -- počet identifikátorů --
                    /** badge počtu identifikátorů */
                    var countBadge = "";
                    ixpList.length.toString().split("").map((value, index) => {
                        countBadge += "&#" + value.charCodeAt(index).toString() + ";";
                    });
                    //#endregion
                    Form
                        .addSection()
                        .addRow({
                        required: true,
                        label: "jres:32000065" //RC 32000065 : Výběr
                    })
                        // políčko pro výběr indetifikátoru dokumentu
                        .addField("gselectbox", {
                        validators: [new Gordic.Validators.Required()],
                        graphicInput: "oninput",
                        name: "Ixp",
                        model: "model.Ixp=value.ixp; model.IsSpis=value.isSpis",
                        data: ixpList,
                        states: [
                            { icon: countBadge, customClass: "g-state-info", tooltip: "jres:32000092" }, //RC 32000092 : Počet identifikátorů
                            { icon: 'fa-info-circle', customClass: "g-state-info", tooltip: "jres:32000090" } //RC 32000090 : Při výběru identifikátoru dojde k překreslení dialogu.
                        ],
                        helperItemTemplate: (value) => {
                            //RC 32000095 : Spis //RC 32000096 : Dokument
                            var type = value.isSpis === true ? "jres:32000095" : "jres:32000096";
                            var ixp = value.ixp;
                            return "<b>" + ixp + "</b> " + "<i>" + type + "</i>";
                        },
                        itemTemplate: (value) => {
                            var element = $("<div>");
                            if (value != null) {
                                $("<div class='gi gi-pid minifoto'>").appendTo(element);
                                //RC 32000095 : Spis
                                //RC 32000096 : Dokument
                                $("<i>").text(value.isSpis === true ? "jres:32000095" : "jres:32000096").appendTo(element);
                                $("<br>").appendTo(element);
                                $("<b>").text(value.ixp).appendTo(element);
                                return element;
                            }
                            return element;
                        },
                        change: (ev, obj) => {
                            var value = obj.value;
                            if (value != null && value.ixp != null) {
                                for (var x = 0; x < this.data.length; x++) {
                                    var item = this.data[x];
                                    if (item.Ixp === value.ixp) {
                                        this.applyContent(item);
                                    }
                                }
                            }
                            else {
                                this.applyContent(null);
                            }
                        },
                        //customClass: "w-6"
                    });
                    Form
                        .addSection();
                    Form
                        .addRow("jres:32000075, jres:32000076"); //RC 32000075 : PID //RC 32000076 : Zn.
                    Form
                        .addField("gstringbox", {
                        name: "Ixp",
                        customClass: "w-6",
                        disabled: true,
                    });
                    Form
                        .addField("gstringbox", {
                        name: "AktZnacka",
                        customClass: "w-6",
                        disabled: true
                    });
                    Form
                        .addRow("jres:32000077") //RC 32000077 : Věc
                        .addField("gstringbox", {
                        name: "Nazev",
                        disabled: true
                    });
                    Form
                        .addRow("jres:32000078") //RC 32000078 : Spis.znak
                        .addField("gselectbox", Gordic.Prefabs.Select.sslsspl(), {
                        name: "SpisPl",
                        model: "model.SpisPl=value.spis_pl",
                        customClass: "w-3",
                        disabled: true
                    })
                        .addField("gselectbox", Gordic.Prefabs.Select.sslsspz(), {
                        name: "SpisZnak",
                        customClass: "w-9",
                        graphicInput: "oninput",
                        itemTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTemplate(),
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    $(this).gfield("setValue", { spis_pl: dto.SpisPl, spis_znak: dto.SpisZnak }, { valid: false });
                                    return;
                                case "collect":
                                    dto.SpisZnak = ($(this).gfield("getValue") ? $(this).gfield("getValue").spis_znak : null);
                                    return;
                                default: return "SpisZnak ";
                            }
                        },
                        serverFilters: {
                            spis_pl: new Gordic.Forms.Dependency("SpisPl", "spis_pl", true)
                        }
                    });
                    this.form = $("<div>").appendTo(this.element);
                    this.form.gform("createFrom", Form);
                }
                /** vytvořit seznam */
                createGrid(name, title, sort, format, data) {
                    if (this.grids != null) {
                        //#region -- Section --
                        var Form = new Gordic.Forms.Form({
                            name: "FormGridPpo" + name,
                            layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000"
                        });
                        Form.addSection(title);
                        var form = $("<div>").appendTo(this.grids);
                        form.gform("createFrom", Form);
                        //#endregion
                        //#region -- Data --
                        var myData = [];
                        if (data != null && data.length > 0) {
                            myData = data;
                        }
                        //#endregion
                        var grid = $("<div>").gautofit().appendTo(this.grids);
                        grid.ggrid({
                            multi: false,
                            data: myData,
                            name: "grid" + name,
                            renderMode: "auto",
                            columnMode: "full",
                            navigationMode: "row",
                            columns: format.format,
                            sort: sort,
                            searchColumns: format.searchColumns,
                        });
                    }
                }
                /**
                 * vytvořit formát pro seznam
                 * @param type typ formátu
                 */
                createFormat(type) {
                    var format = new Gordic.Data.GridFormat();
                    if (type === 0 /* GPpoTypeGridHistoryDocSpisEnum.Hist */) {
                        format
                            .addDateTimeColumn({ name: "dat_zmena", caption: "jres:32000039", width: 200 }) //RC 32000039 : Datum změny
                            .addTextColumn({ name: "zmena_txt", caption: "jres:32000040", width: 200 }) //RC 32000040 : Změna
                            .addTextColumn({ name: "poznamka", caption: "jres:32000041", width: 200 }) //RC 32000041 : Poznámka
                            .addTextColumn({ name: "nazev_rf", caption: "jres:32000042", width: 200 }); //RC 32000042 : Změnu provedl
                        return { format: format, searchColumns: WebControls.GPpoUtils.getStringNamesOfColumns(format) };
                    }
                    else if (type === 1 /* GPpoTypeGridHistoryDocSpisEnum.ElDocs */) {
                        format
                            .addIconColumn(Gordic.Wfl.Globals.ListSupport.TechnickeVlastnostiColumnDlg())
                            .addIconColumn(Gordic.Wfl.Globals.ListSupport.EleColumn());
                        format
                            .addTextColumn({ name: "ixb", caption: "jres:32000043", width: 200 }) //RC 32000043 : ID
                            .addTextColumn({ name: "soubor", caption: "jres:32000044", width: 200 }) //RC 32000044 : Soubor
                            .addNumberColumn({ name: "ser_cislo", caption: "jres:32000045", width: 200 }) //RC 32000045 : Verze
                            .addNumberColumn({ name: "velikost", caption: "jres:32000046", width: 200 }) //RC 32000046 : Velikost
                            .addTextColumn({ name: "soubor_h", caption: "jres:32000047", width: 200 }) //RC 32000047 : Sha1
                            .addTextColumn({ name: "soubor_h2", caption: "jres:32000048", width: 200 }) //RC 32000048 : Sha256
                            .addDateTimeColumn({ name: "dat_zmena", caption: "jres:32000039", width: 200 }) //RC 32000039 : Datum změny
                            .addTextColumn({ name: "zmenu_prov", caption: "jres:32000049", width: 200 }); //RC 32000049 : Změnu provedl
                        return { format: format, searchColumns: WebControls.GPpoUtils.getStringNamesOfColumns(format) };
                    }
                    else if (type === 2 /* GPpoTypeGridHistoryDocSpisEnum.Arch */) {
                        format
                            .addNumberColumn({ name: "por_cislo", caption: "jres:32000050", width: 200 }) //RC 32000050 : Poř.
                            .addTextColumn({ name: "akt_znacka", caption: "jres:32000051", width: 200 }) //RC 32000051 : Zn.
                            .addTextColumn({ name: "ixp", caption: "jres:32000052", width: 200 }) //RC 32000052 : Identifikátor
                            .addDateTimeColumn({ name: "dat_od", caption: "jres:32000053", width: 200 }) //RC 32000053 : Vloženo
                            .addTextColumn({ name: "nazev", caption: "jres:32000054", width: 200 }) //RC 32000054 : Věc
                            .addTextColumn({ name: "poznamka", caption: "jres:32000041", width: 200 }) //RC 32000041 : Poznámka
                            .addDateColumn({ name: "dat_pod", caption: "jres:32000055", width: 200 }) //RC 32000055 : Datum podání
                            .addDateTimeColumn({ name: "dat_zmena", caption: "jres:32000039", width: 200 }) //RC 32000039 : Datum změny
                            .addTextColumn({ name: "zmenu_prov_txt", caption: "jres:32000056", width: 200 }) //RC 32000056 : Změnu provedl
                            .addTextColumn({ name: "ixs_typ_txt", caption: "jres:32000057", width: 200 }) //RC 32000057 : Typ
                            .addTextColumn({ name: "misto_vzniku", caption: "jres:32000058", width: 200 }); //RC 32000058 : Odesílatel
                        return { format: format, searchColumns: WebControls.GPpoUtils.getStringNamesOfColumns(format) };
                    }
                    else {
                        return { format: format, searchColumns: WebControls.GPpoUtils.getStringNamesOfColumns(format) };
                    }
                }
            };
            GPpoHistoryDocSpis = __decorate([
                gcontent
            ], GPpoHistoryDocSpis);
            WebControls.GPpoHistoryDocSpis = GPpoHistoryDocSpis;
        })(WebControls = Ppo.WebControls || (Ppo.WebControls = {}));
    })(Ppo = Gordic.Ppo || (Gordic.Ppo = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHBvLndlYmNvbnRyb2xzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJTZXR0aW5ncy9HUHBvRGlhbG9ncy50cyIsIlNldHRpbmdzL0dQcG9VdGlscy50cyIsIlRhc2tzL0dQcG9EYXNoYm9hcmQudHMiLCJUYXNrcy9HUHBvR2VuZXJhdGVQcG8udHMiLCJUYXNrcy9HUHBvR2VuZXJhdGVadWQudHMiLCJUYXNrcy9HUHBvSGlzdG9yeURvY1NwaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQXFDZjtBQXJDRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FxQ25CO0lBckNnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE9BQU8sQ0FxQzNCO1FBckNvQixXQUFBLE9BQU87WUFFM0I7Ozs7Ozs7OztjQVNFO1lBQ0YsU0FBZ0Isa0JBQWtCLENBQ2pDLGFBQXVCLEVBQ3ZCLFdBQWtEO2dCQUdsRCxNQUFNLE9BQU8sR0FBRztvQkFDZixFQUFFLEVBQUUsbUJBQW1CO2lCQUN2QixDQUFDO2dCQUVGLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDOUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM3RSxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBR2hGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztnQkFFbkIsSUFBSSxPQUFPLEVBQUUsQ0FBQztvQkFDYixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSx3Q0FBd0MsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3BILENBQUM7cUJBQU0s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RSxDQUFDLENBQUMsNkJBQTZCOzZCQUM3RyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsbUJBQW1COzZCQUNoRyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUEsQ0FBQywwQkFBMEI7d0JBQzdHLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFBLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO29CQUN4RixDQUFDO3lCQUNJLENBQUM7d0JBQ0YsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFlBQUEsU0FBUyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7b0JBQ3hGLENBQUM7Z0JBQ0wsQ0FBQzthQUVKLENBQUE7WUFwWVksa0JBQWtCO2dCQUQ5QixRQUFRO2VBQ0ksa0JBQWtCLENBb1k5QjtZQXBZWSw4QkFBa0IscUJBb1k5QixDQUFBO1FBRUwsQ0FBQyxFQW5ab0IsV0FBVyxHQUFYLGVBQVcsS0FBWCxlQUFXLFFBbVovQjtJQUFELENBQUMsRUFuWmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW1abkI7QUFBRCxDQUFDLEVBblpTLE1BQU0sS0FBTixNQUFNLFFBbVpmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5QcG8uRGlhbG9ncyB7XHJcblxyXG5cdC8qKlxyXG5cdCogRGlhbG9nIGdlbmVyb3bDoW7DrSBaVURcclxuXHQqXHJcblx0KiBAYXV0aG9yICBUb23DocWhIEhhxb5tdWthXHJcblx0KiBAZGF0ZSAgICAxOS4wOC4yMDIwXHJcblx0KlxyXG5cdCogQHBhcmFtICAgcGFyZW50Q29udGVudCAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBjb250ZW50LlxyXG5cdCogQHBhcmFtICAgTW9kT3RldnJlbmkgICAgICAgICAgICAgICAgICAgIG1vZCBvdGV2cmVuaSBkaWFsb2d1LlxyXG5cdCogQHJldHVybiAgLlxyXG5cdCovXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIEdQcG9HZW5lcmF0ZVp1ZERsZyhcclxuXHRcdHBhcmVudENvbnRlbnQ6IEdDb250ZW50LFxyXG5cdFx0TW9kT3RldnJlbmk/OiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuTW9kT3RldnJlbmlcclxuXHQpOiBKUXVlcnlQcm9taXNlPGJvb2xlYW4+IHtcclxuXHJcblx0XHRjb25zdCBvcHRpb25zID0ge1xyXG5cdFx0XHRJRDogXCJQcG9HZW5lcmF0ZVp1ZElkI1wiLFxyXG5cdFx0fTtcclxuXHJcblx0XHRjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuXHRcdGNvbnN0IHBDb250ZW50ID0gR29yZGljLkdpbi5HbG9iYWxzLkRpYWxvZ3MuWmtvbnRyb2x1akNvbnRlbnQocGFyZW50Q29udGVudCk7XHJcblx0XHRNb2RPdGV2cmVuaSA9IEdvcmRpYy5HaW4uR2xvYmFscy5EaWFsb2dzLlVwcmF2TW9kT3RldnJuaShwQ29udGVudCwgTW9kT3RldnJlbmkpO1xyXG5cclxuXHJcblx0XHRsZXQgaXNWYWxpZCA9IHRydWU7XHJcblxyXG5cdFx0aWYgKGlzVmFsaWQpIHtcclxuXHRcdFx0R29yZGljLkd1aS5EaWFsb2dzLl9vcGVuRGlhbG9nKHBDb250ZW50LCBkZWZlcnJlZCwgJ0dvcmRpYy5QcG8uV2ViQ29udHJvbHMuR1Bwb0dlbmVyYXRlWnVkJywgTW9kT3RldnJlbmksIG9wdGlvbnMpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGVmZXJyZWQucmVqZWN0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHR9XHJcblxyXG59IiwiXHJcbm5hbWVzcGFjZSBHb3JkaWMuUHBvLldlYkNvbnRyb2xzIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR1Bwb1V0aWxzIHtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogamUgaG9kbm90YSBudWxsLCBuZWRlZmlub3ZhbsOhIG5lYm8gcHLDoXpkbsOhIChcIlwiKT9cclxuICAgICAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGlzTnVsbFVuZGVmaW5lZE9yRW1wdHkodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHZ5dHZvxZlpdCBwb2xlIHBybyBobGVkw6Fuw60gdiBzZXpuYW11XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRTdHJpbmdOYW1lc09mQ29sdW1ucyhmb3JtYXQ6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQpIHtcclxuICAgICAgICAgICAgLyoqIHNsb3VwY2UgbmEgcHJvaGxlZMOhdsOhbsOtICovXHJcbiAgICAgICAgICAgIHZhciBzZWFyY2hDb2x1bW5zID0gW10gYXMgc3RyaW5nW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBmb3JtYXQuY29sdW1ucy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb2x1bW5zID0gZm9ybWF0LmNvbHVtbnNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbnMubmFtZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1ucy5wdXNoKGNvbHVtbnMubmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaENvbHVtbnM7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLlZlZC5XZWJDb250cm9scy5HVmVkRGFzaGJvYXJkLnRzXHRcdFx0XHRcdFx0PC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFN0YXRpc3Rpa3kgcHJvIFZFRFx0XHRcdFx0XHRcdFx0ICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgVG9tw6HFoSBIYcW+bXVrYVx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMFx0XHRcdFx0XHRcdFx0PC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMC0wNy0xNlx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5QcG8uV2ViQ29udHJvbHMge1xyXG5cclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGF0aXN0aWt5IHBybyBWRUQgKG1vZHVsIFZlZG91Y8OtKVxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUHBvRGFzaGJvYXJkIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2R1bGVJbmZvSXRlbXM6IGFueTtcclxuICAgICAgICBwcml2YXRlIE5hemV2UmVmOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBOYXpldkZ1bjogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgRGF0TG9naW5UeHQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTW9kdWxlSW5mbygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIG5hxI3DrXN0IGluZm9ybWFjZSBvIG1vZHVsdSAqL1xyXG4gICAgICAgIHByaXZhdGUgbG9hZE1vZHVsZUluZm8oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQ6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgICAgICB2YXIgc2Vjb25kYXJ5VGV4dCA9IHRoaXMuTmF6ZXZSZWYgKyBcIiB8IFwiICsgdGhpcy5OYXpldkZ1biArIFwiIHwgXCIgKyBcImpyZXM6MzIwMDAwMDJcIiArIFwiOiBcIiArIHRoaXMuRGF0TG9naW5UeHQ7IC8vUkMgMzIwMDAwMDIgOiBQb3NsZWRuw60gcMWZaWhsw6HFoWVuw61cclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImtwaUxhc3RVc2VkXCIgKyBcIl9cIiArIGksXHJcbiAgICAgICAgICAgICAgICBpbWFnZTogR29yZGljLlV0aWxzLkljb25CdWlsZGVyLmRlZmF1bHRJbnN0LmNyZWF0ZU1vZHVsZUljb24oXCJHV0FQUE8wNVwiKSxcclxuICAgICAgICAgICAgICAgIHByaW1hcnlUZXh0OiBcImpyZXM6MzIwMDAwMDNcIiwgLy9SQyAzMjAwMDAwMyA6IFRyYW5zYWvEjW7DrSBwcm90b2tvbFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dDogc2Vjb25kYXJ5VGV4dCxcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb2R1bGVJbmZvSXRlbXMgPSBuZXcgR29yZGljLkRhdGEuVmlldyhbe1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwibW9kdWxlSW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB6b25lOiAxLFxyXG4gICAgICAgICAgICAgICAgbW9kZTogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpSW1hZ2VUd29Sb3dzVGV4dFRlbXBsYXRlKCkuaXRlbVRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJlc3VsdClcclxuICAgICAgICAgICAgfV0sIHsga2V5OiBbXCJpZFwiXSB9KTtcclxuXHJcbiAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdkYXNoYm9hcmRwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0U2VsZWN0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5tb2R1bGVJbmZvSXRlbXMsXHJcbiAgICAgICAgICAgICAgICBsYXlvdXQ6IFwiaG9yaXpvbnRhbFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBzb3J0YWJsZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSIsIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuUHBvLldlYkNvbnRyb2xzLkdQcG9HZW5lcmF0ZVBwby50c1x0XHQgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR2VuZXJvdsOhbsOtIFBQT1x0XHRcdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIFRvbcOhxaEgSGHFvm11a2FcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjBcdFx0XHRcdFx0XHRcdDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjAtMDgtMDVcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuUHBvLldlYkNvbnRyb2xzIHtcclxuXHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzO1xyXG5cclxuICAgIC8vdG9kbzogdnnFmWXFoWl0IHMgbWFydGluZW0gaGFsaWtlbSB6cHVzb2IgamFrIGdlbmVyb3ZhdCBwcG8gc2VzdGF2eSBcInByYXZkxJtwb2RvYm7Em1wiXHJcblxyXG4gICAgaW50ZXJmYWNlIElHUFBvR2VuZXJhdGVNb2RlbCB7XHJcbiAgICAgICAgSW50ZXJ2YWw/OiB7IHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUgfSxcclxuICAgICAgICBHZW5lcmF0ZUZvckRhdGVQZXJpb2Q/OiBHUHBvR2VuZXJhdGVGb3JEYXRlUGVyaW9kRW51bSxcclxuICAgICAgICBHZW5lcmF0ZVByb3RvY29sPzogR1Bwb0dlbmVyYXRlUHJvdG9jb2xFbnVtXHJcbiAgICB9XHJcblxyXG4gICAgaW50ZXJmYWNlIElHUHBvR2VuZXJhdGVGb3JEYXRlUGVyaW9kIHtcclxuICAgICAgICAvKiogaG9kbm90YSAqL1xyXG4gICAgICAgIHZhbHVlOiBHUHBvR2VuZXJhdGVGb3JEYXRlUGVyaW9kRW51bSxcclxuICAgICAgICAvKiogcG9waXNlayAqL1xyXG4gICAgICAgIGNhcHRpb246IHN0cmluZ1xyXG4gICAgfVxyXG4gICAgaW50ZXJmYWNlIElHUHBvR2VuZXJhdGVQcm90b2NvbCB7XHJcbiAgICAgICAgLyoqIGhvZG5vdGEgKi9cclxuICAgICAgICB2YWx1ZTogR1Bwb0dlbmVyYXRlUHJvdG9jb2xFbnVtLFxyXG4gICAgICAgIC8qKiBwb3Bpc2VrICovXHJcbiAgICAgICAgY2FwdGlvbjogc3RyaW5nXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcm92w6Fuw60gUFBPXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQcG9HZW5lcmF0ZVBwbyBleHRlbmRzIEdDb250ZW50QmFzZTxHb3JkaWMuUHBvLldlYkNvbnRyb2xzLkdQcG9CYXNlPiB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3VidGFzazogYW55O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgZm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIHRlbXBJeHA6IHN0cmluZyB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgIHByaXZhdGUgdHlwZTogR1Bwb0dlbmVyYXRlUHBvVHlwZUVudW0gPSBHUHBvR2VuZXJhdGVQcG9UeXBlRW51bS5yZWNlaXZlO1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZFJlY2VpdmU6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkU2VuZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGdyaWRDaGFuZ2U6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3UmVjZWl2ZTogRGF0YS5WaWV3O1xyXG4gICAgICAgIHByaXZhdGUgdmlld1NlbmQ6IERhdGEuVmlldztcclxuICAgICAgICBwcml2YXRlIHZpZXdDaGFuZ2U6IERhdGEuVmlldztcclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51YmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU3VidGFza3MoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGaWx0ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkUmVjZWl2ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWRTZW5kKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZENoYW5nZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvcGVuRGV0YWlsKCkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVGbGFzaChcImlkRW1wdHlHcmlkXCIpO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCAhPSBudWxsICYmIHRoaXMudHlwZSAhPT0gR1Bwb0dlbmVyYXRlUHBvVHlwZUVudW0uY2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKFwianJlczozMjAwMDAzNFwiLCBcIndhcm5pbmdcIiwgXCJpZEVtcHR5R3JpZFwiKTsgLy9SQyAzMjAwMDAzNCA6IFNlem5hbSBqZSBwcsOhemRuw70uXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgR29yZGljLldmbC5EaWFsb2dzLkRldGFpbERva3VtZW50dVNwaXN1KHRoaXMsIHsgRGV0YWlsRHRvOiB7IGl4cDogcm93Lml4cCB9LCBncmlkOiBncmlkIH0sIEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5uYXZpZ2F0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0R3JpZCgpIHtcclxuICAgICAgICAgICAgbGV0IGdyaWQ6IGFueSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09IEdQcG9HZW5lcmF0ZVBwb1R5cGVFbnVtLnJlY2VpdmUpIHtcclxuICAgICAgICAgICAgICAgIGdyaWQgPSB0aGlzLmdyaWRSZWNlaXZlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gR1Bwb0dlbmVyYXRlUHBvVHlwZUVudW0uc2VuZCkge1xyXG4gICAgICAgICAgICAgICAgZ3JpZCA9IHRoaXMuZ3JpZFNlbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09PSBHUHBvR2VuZXJhdGVQcG9UeXBlRW51bS5jaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIGdyaWQgPSB0aGlzLmdyaWRDaGFuZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGdyaWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9wZW5BdHRhY2htZW50KCkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVGbGFzaChcImlkRW1wdHlHcmlkXCIpO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKFwianJlczozMjAwMDAzNFwiLCBcIndhcm5pbmdcIiwgXCJpZEVtcHR5R3JpZFwiKTsgLy9SQyAzMjAwMDAzNCA6IFNlem5hbSBqZSBwcsOhemRuw70uXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgR29yZGljLldmbC5EaWFsb2dzLkdQcmlsb2h5RGxnKHRoaXMsIHsgSXhwOiByb3cuaXhwIH0sIEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5uYXZpZ2F0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlUHJpbnRBY3Rpb25QcG8oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGlvbnMuYWRkKEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ2eXN0dXBBY3RcIixcclxuICAgICAgICAgICAgICAgIHRlbWE6IFwicHBvX3B0bV90aXNrXCIsICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDAzNVwiLCAgIC8vUkMgMzIwMDAwMzUgOiBWw71zdHVwXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMyMDAwMDM2XCIsICAgICAvL1JDIDMyMDAwMDM2IDogVnliZXJ0ZSBzZXN0YXZ1XHJcbiAgICAgICAgICAgICAgICBkaWFsb2dPcGVuaW5nOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRmZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRGb3JWYWx1ZXModGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoaXNWYWxpZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzVmFsaWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IGdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gbnVsbCAmJiByb3cuaXhwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcEl4cCA9IHJvdy5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGZkLnJlc29sdmUocm93Lml4cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGZkLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZmQucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9uZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZmQucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiAocmVwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgbW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlbFtcIkludGVydmFsXCJdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90b2RvIHDFr3ZvZG7EmyB6ZGUgYnlsIHRha292w710byB0dmFyOiBmb3JtYXQoXCJERC5NTS5ZWVlZIGhoOm1tOnNzXCIpLCBhbGUgZ2VuZXLDoXRvciByZXBvcnR1IHBhZGFsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zW1wiWDAwMDBcIl0gPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZShtb2RlbFtcIkludGVydmFsXCJdLnN0YXJ0KS5mb3JtYXQoXCJ5eXl5LU1NLWRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zW1wiWDAwMDFcIl0gPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZShtb2RlbFtcIkludGVydmFsXCJdLmVuZCkuZm9ybWF0KFwieXl5eS1NTS1kZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtc1tcIlgwMDA2XCJdID0gdGhpcy5TZXNzaW9uUHJpekQ/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtc1tcIlgwMDA3XCJdID0gdGhpcy5TZXNzaW9uTG9nUG9yQ2lzbG8/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtc1tcIlgwMDA4XCJdID0gdGhpcy5TZXNzaW9uSXhzRnVuITtcclxuICAgICAgICAgICAgICAgICAgICAvL3JlcC5wYXJhbXNbXCJYMDAwOVwiXSA9IEdvcmRpYy5SZXBvcnQuQ2xpZW50LkdSZXBvcnRYMDAwOS5HZXREZWZhdWx0KFVzZXJQcm9jZXNzKTsgLy8gZG9wbG7DrSBzZSBzYW1vXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGVtcEl4cCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXNbXCJQSURcIl0gPSB0aGlzLnRlbXBJeHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcEl4cCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoaXMucGFyZW50Q29udGVudCA9PSBudWxsID8gdW5kZWZpbmVkIDogdGhpcy5wYXJlbnRDb250ZW50LFxyXG4gICAgICAgICAgICAgICAgZnVsbFNjcmVlbjogdHJ1ZVxyXG4gICAgICAgICAgICB9KSkgYXMgR1ByaW50QWN0aW9uVHlwZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogbWV0b2RhLCBrdGVyw6EgcHJvdmVkZSB2YWxpZGFjaSBhIHZyw6F0w60gdsO9c2xlZGVrIHZhbGlkYWNlIGHFviBqZSBmb3JtdWzDocWZIHDFmWlwcmF2ZW5cclxuICAgICAgICAqKi9cclxuICAgICAgICBwcml2YXRlIHdhaXRGb3JWYWx1ZXMoZm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50Pik6IEpRdWVyeVByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgICAgICB2YXIgZGZkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBmb3JtLmdmb3JtKFwid2FpdEZvclZhbHVlc1wiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLmdmb3JtKFwiaXNWYWxpZFwiKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoaXNWYWxpZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlKGlzVmFsaWQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkZmQucmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBkZmQucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51YmFyKCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zOiBNZW51UGFyYW1zW10gPSBbXTtcclxuICAgICAgICAgICAgcGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDMyXCIsIC8vUkMgMzIwMDAwMzIgOiBEZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRGV0YWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAwMzBcIiwgLy9SQyAzMjAwMDAzMCA6IEdlbmVyb3ZhdCBQUE9cclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5jcmVhdGVQcmludEFjdGlvblBwbygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHZW5lcmF0ZVp1ZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDAzMVwiLCAvL1JDIDMyMDAwMDMxIDogR2VuZXJvdmF0IFpVRFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBwYXJhbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhbGlnbjogXCJvcHBvc2l0ZVwiLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0QXR0YWNobWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDAzM1wiLCAvL1JDIDMyMDAwMDMzIDogUMWZw61sb2h5XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkF0dGFjaG1lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldFN0YXRlQXR0YWNobWVudFN0YXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hY3Rpb25zLmFjdEF0dGFjaG1lbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdEF0dGFjaG1lbnQuZW5hYmxlZCh0aGlzLnR5cGUgIT09IEdQcG9HZW5lcmF0ZVBwb1R5cGVFbnVtLmNoYW5nZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJGb3JtUHBvRmlsdGVyXCIsXHJcbiAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTEsIGJyZWFrcy03MDAtMTAwMFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBGb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMyMDAwMDA2XCIgIC8vUkMgMzIwMDAwMDYgOiBPZC1kb1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHZhciBpbnRlcnZhbFZhbGlkYXRvcnM6IEdvcmRpYy5WYWxpZGF0b3JzLlZhbGlkYXRvcjxHb3JkaWMuVmFsaWRhdG9ycy5WYWxpZGF0b3JPcHRpb25zPltdID0gW107XHJcbiAgICAgICAgICAgIGludGVydmFsVmFsaWRhdG9ycy5wdXNoKG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtaW5WYWx1ZSA9IEdvcmRpYy5VdGlscy5EYXRlVGltZS5nZXRTdGFydE9mRGF5KHRoaXMuTWluaW1hbFZhbHVlIGFzIGFueSk7XHJcbiAgICAgICAgICAgIHZhciBtYXhWYWx1ZSA9IEdvcmRpYy5VdGlscy5EYXRlVGltZS5nZXRFbmRPZkRheSh0aGlzLk1heEFsbG93ZWRWYWx1ZSBhcyBhbnkpO1xyXG5cclxuICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2ludGVydmFsYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkludGVydmFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB0aGlzLkxhc3REYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IG1heFZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBpbnRlcnZhbFZhbGlkYXRvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluVmFsdWU6IHRoaXMuTWluaW1hbFZhbHVlISBhcyBhbnksXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4VmFsdWU6IHRoaXMuTWF4QWxsb3dlZFZhbHVlISBhcyBhbnlcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gLS0gZ2VuZXJvdmF0IHBybyDEjWFzb3bDqSBvYmRvYsOtIC0tXHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YUdlbmVyYXRlRm9yRGF0ZVBlcmlvZDogSUdQcG9HZW5lcmF0ZUZvckRhdGVQZXJpb2RbXSA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgV2hvbGVTZWFzb25WYWx1ZSA9IHsgdmFsdWU6IEdQcG9HZW5lcmF0ZUZvckRhdGVQZXJpb2RFbnVtLldob2xlU2Vhc29uLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwNjdcIiB9OyAgIC8vUkMgMzIwMDAwNjcgOiBDZWzDqSBvYmRvYsOtXHJcbiAgICAgICAgICAgIGRhdGFHZW5lcmF0ZUZvckRhdGVQZXJpb2QucHVzaChXaG9sZVNlYXNvblZhbHVlKTsgXHJcbiAgICAgICAgICAgIGRhdGFHZW5lcmF0ZUZvckRhdGVQZXJpb2QucHVzaCh7IHZhbHVlOiBHUHBvR2VuZXJhdGVGb3JEYXRlUGVyaW9kRW51bS5JbmRpdmlkdWFsRGF5cywgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDY4XCIgfSk7IC8vUkMgMzIwMDAwNjggOiBKZWRub3RsaXbDqSBkbnlcclxuICAgICAgICAgICAgZGF0YUdlbmVyYXRlRm9yRGF0ZVBlcmlvZC5wdXNoKHsgdmFsdWU6IEdQcG9HZW5lcmF0ZUZvckRhdGVQZXJpb2RFbnVtLkluZGl2aWR1YWxNb250aHMsIGNhcHRpb246IFwianJlczozMjAwMDA2OVwiIH0pOyAvL1JDIDMyMDAwMDY5IDogSmVkbm90bGl2w6kgbcSbc8OtY2VcclxuXHJcbiAgICAgICAgICAgIEZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzIwMDAwMDdcIiAgLy9SQyAzMjAwMDAwNyA6IEdlbmVyb3ZhdCBwcm9cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkdlbmVyYXRlRm9yRGF0ZVBlcmlvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLkdlbmVyYXRlRm9yRGF0ZVBlcmlvZD12YWx1ZS52YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YUdlbmVyYXRlRm9yRGF0ZVBlcmlvZCxcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBXaG9sZVNlYXNvblZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogV2hvbGVTZWFzb25WYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhPy5jYXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gLS0gZ2VuZXJvdmF0IHR5cCBwcm90b2tvbHUgLS1cclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhR1Bwb0dlbmVyYXRlUHJvdG9jb2w6IElHUHBvR2VuZXJhdGVQcm90b2NvbFtdID0gW107XHJcbiAgICAgICAgICAgIHZhciBDb21wbGV0ZVRyYW5zYWN0aW9uUHJvdG9jb2xWYWx1ZSA9IHsgdmFsdWU6IEdQcG9HZW5lcmF0ZVByb3RvY29sRW51bS5Db21wbGV0ZVRyYW5zYWN0aW9uUHJvdG9jb2wsIGNhcHRpb246IFwianJlczozMjAwMDA3MFwiIH07ICAgIC8vUkMgMzIwMDAwNzAgOiBLb21wbGV0bsOtIHRyYW5zYWvEjW7DrSBwcm90b2tvbFxyXG4gICAgICAgICAgICBkYXRhR1Bwb0dlbmVyYXRlUHJvdG9jb2wucHVzaChDb21wbGV0ZVRyYW5zYWN0aW9uUHJvdG9jb2xWYWx1ZSk7IFxyXG4gICAgICAgICAgICBkYXRhR1Bwb0dlbmVyYXRlUHJvdG9jb2wucHVzaCh7IHZhbHVlOiBHUHBvR2VuZXJhdGVQcm90b2NvbEVudW0uUHJvdG9jb2xTZW5kQW5kUmVjZWl2ZSwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDcyXCIgfSk7IC8vUkMgMzIwMDAwNzIgOiBQcm90b2tvbCBwxZnDrWptdSBhIG9kZXNsw6Fuw61cclxuICAgICAgICAgICAgZGF0YUdQcG9HZW5lcmF0ZVByb3RvY29sLnB1c2goeyB2YWx1ZTogR1Bwb0dlbmVyYXRlUHJvdG9jb2xFbnVtLlRyYW5zYWN0aW9uUHJvdG9jb2xPZkNoYW5nZXMsIGNhcHRpb246IFwianJlczozMjAwMDA3MVwiIH0pOyAvL1JDIDMyMDAwMDcxIDogVHJhbnNha8SNbsOtIHByb3Rva29sIHptxJtuXHJcblxyXG4gICAgICAgICAgICBGb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMyMDAwMDA4XCIgIC8vUkMgMzIwMDAwMDggOiBHZW5lcm92YXQgcHJvdG9rb2x5XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJHZW5lcmF0ZVByb3RvY29sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuR2VuZXJhdGVQcm90b2NvbD12YWx1ZS52YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogQ29tcGxldGVUcmFuc2FjdGlvblByb3RvY29sVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBDb21wbGV0ZVRyYW5zYWN0aW9uUHJvdG9jb2xWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YUdQcG9HZW5lcmF0ZVByb3RvY29sLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE/LmNhcHRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBGb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgSW50ZXJ2YWwgPSBvYmouZmlsdGVyLkludGVydmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBHUHBvR2VuZXJhdGVQcG9UeXBlRW51bS5yZWNlaXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGwoXCJMb2FkRGF0YVJlY2VpdmVcIiwgeyBJbnRlcnZhbDogSW50ZXJ2YWwgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigob3V0cHV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpZXdSZWNlaXZlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlld1JlY2VpdmUudXBkYXRlRGF0YShvdXRwdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT09IEdQcG9HZW5lcmF0ZVBwb1R5cGVFbnVtLnNlbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbChcIkxvYWREYXRhU2VuZFwiLCB7IEludGVydmFsOiBJbnRlcnZhbCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChvdXRwdXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlld1NlbmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3U2VuZC51cGRhdGVEYXRhKG91dHB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gR1Bwb0dlbmVyYXRlUHBvVHlwZUVudW0uY2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGwoXCJMb2FkRGF0YUNoYW5nZVwiLCB7IEludGVydmFsOiBJbnRlcnZhbCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChvdXRwdXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlld0NoYW5nZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDaGFuZ2UudXBkYXRlRGF0YShvdXRwdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMDEuMDMuMjAyMSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTmFocmF6ZW7DrSBvYnNvbGV0ZSBwYXJhbWV0csWvLlxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zaW1wbGVNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMM00yUzFcIixcclxuICAgICAgICAgICAgICAgICAgICBmb3JtczogW3RoaXMuY3JlYXRlRmlsdGVyRm9ybSgpXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVN1YnRhc2tzKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdWJ0YXNrID0ge1xyXG4gICAgICAgICAgICAgICAgYmFkZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwxZlpamF0w6lcclxuICAgICAgICAgICAgICAgICAgICByZWNlaXZlOiBuZXcgR09ic2VydmFibGVPYmplY3QoeyB2YWx1ZTogMCB9KSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBvZGVzbGFuw6lcclxuICAgICAgICAgICAgICAgICAgICBzZW5kOiBuZXcgR09ic2VydmFibGVPYmplY3QoeyB2YWx1ZTogMCB9KSxcclxuICAgICAgICAgICAgICAgICAgICAvLyB6bcSbbnlcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7IHZhbHVlOiAwIH0pLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFyYW1zOiBhbnkgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZWNlaXZlID0ge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RSZWNlaXZlR3JpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDAxMFwiLFx0XHRcdFx0Ly9SQyAzMjAwMDAxMCA6IERva3VtZW50eSBwxZlpamF0w6lcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IEdQcG9HZW5lcmF0ZVBwb1R5cGVFbnVtLnJlY2VpdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGVBdHRhY2htZW50U3RhdGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFNlbmQuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRDaGFuZ2UuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRSZWNlaXZlLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGJhZGdlOiB0aGlzLnN1YnRhc2suYmFkZ2UucmVjZWl2ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBwYXJhbXMucHVzaChyZWNlaXZlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZW5kID0ge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTZW5kR3JpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDAxMVwiLFx0XHRcdFx0Ly9SQyAzMjAwMDAxMSA6IERva3VtZW50eSBvZGVzbGFuw6lcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IEdQcG9HZW5lcmF0ZVBwb1R5cGVFbnVtLnNlbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGVBdHRhY2htZW50U3RhdGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFJlY2VpdmUuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRDaGFuZ2UuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRTZW5kLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGJhZGdlOiB0aGlzLnN1YnRhc2suYmFkZ2Uuc2VuZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBwYXJhbXMucHVzaChzZW5kKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogMixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENoYW5nZUdyaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzIwMDAwMTJcIixcdFx0XHRcdC8vUkMgMzIwMDAwMTIgOiBabcSbbnlcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IEdQcG9HZW5lcmF0ZVBwb1R5cGVFbnVtLmNoYW5nZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZUF0dGFjaG1lbnRTdGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkUmVjZWl2ZS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFNlbmQuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRDaGFuZ2Uuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYmFkZ2U6IHRoaXMuc3VidGFzay5iYWRnZS5jaGFuZ2VcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcGFyYW1zLnB1c2goY2hhbmdlKTtcclxuXHJcbiAgICAgICAgICAgICQoXCI8ZGl2IGNsYXNzPSdwcG9fZ3JpZF9zdWJ0YXNrcyc+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nc3VidGFza3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogdnl0dm/FmWl0IHNlem5hbSBwcm8gcMWZaWphdMOpIGRva3VtZW50eSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZFJlY2VpdmUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld1JlY2VpdmUgPSBuZXcgRGF0YS5WaWV3KCk7XHJcbiAgICAgICAgICAgIHZhciBmb3JtYXRPdXRwdXQgPSB0aGlzLmNyZWF0ZUZvcm1hdFJlY2VpdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5ncmlkUmVjZWl2ZSA9ICQoXCI8ZGl2IGNsYXNzPSdwcG9fcmVjZWl2ZV9ncmlkJz5cIikuZ2F1dG9maXQoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRSZWNlaXZlLmdncmlkKHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcdFx0XHRcdFx0XHRcdFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0UmVjZWl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRGV0YWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnZpZXdSZWNlaXZlLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUmVjZWl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInRzLXBwby1ncmlkLXJlY2VpdmUtY2xhc3NcIixcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogZm9ybWF0T3V0cHV0LmZvcm1hdCxcclxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiIWRhdF9tcGQwXCJcclxuICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogZm9ybWF0T3V0cHV0LnNlYXJjaENvbHVtbnMsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIHZ5dHZvxZlpdCBzZXpuYW0gcHJvIG9kZXNsYW7DqSBkb2t1bWVudHkgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRTZW5kKCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdTZW5kID0gbmV3IERhdGEuVmlldygpO1xyXG4gICAgICAgICAgICB2YXIgZm9ybWF0T3V0cHV0ID0gdGhpcy5jcmVhdGVGb3JtYXRTZW5kKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZFNlbmQgPSAkKFwiPGRpdiBjbGFzcz0ncHBvX3NlbmRfZ3JpZCc+XCIpLmdhdXRvZml0KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5ncmlkU2VuZC5oaWRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZFNlbmQuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0U2VuZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRGV0YWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnZpZXdTZW5kLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJncmlkU2VuZFwiLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInRzLXBwby1ncmlkLXNlbmQtY2xhc3NcIixcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogZm9ybWF0T3V0cHV0LmZvcm1hdCxcclxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiIWRhdF9vZGVzXCJcclxuICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogZm9ybWF0T3V0cHV0LnNlYXJjaENvbHVtbnMsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIHZ5dHZvxZlpdCBzZXpuYW0gcHJvIHptxJtueSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZENoYW5nZSgpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3Q2hhbmdlID0gbmV3IERhdGEuVmlldygpO1xyXG4gICAgICAgICAgICB2YXIgZm9ybWF0T3V0cHV0ID0gdGhpcy5jcmVhdGVGb3JtYXRDaGFuZ2UoKTtcclxuICAgICAgICAgICAgdGhpcy5ncmlkQ2hhbmdlID0gJChcIjxkaXYgY2xhc3M9J3Bwb2NoYW5nZV9ncmlkJz5cIikuZ2F1dG9maXQoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRDaGFuZ2UuaGlkZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRDaGFuZ2UuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0Q2hhbmdlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5EZXRhaWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMudmlld0NoYW5nZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZENoYW5nZVwiLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInRzLXBwby1ncmlkLWNoYW5nZS1jbGFzc1wiLFxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBmb3JtYXRPdXRwdXQuZm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgc29ydDogXCIhZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IGZvcm1hdE91dHB1dC5zZWFyY2hDb2x1bW5zLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybWF0U2VuZCgpIHtcclxuICAgICAgICAgICAgdmFyIGZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIC8vICsgaWNvbiBzbG91cGVjXHJcbiAgICAgICAgICAgIGZvcm1hdFxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4cFwiLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwMTNcIiwgd2lkdGg6IDIwMCB9KSAvL1JDIDMyMDAwMDEzIDogUElEXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwibmF6ZXZcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDE0XCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDAxNCA6IFbEm2NcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJha3Rfem5hY2thXCIsIGNhcHRpb246IFwianJlczozMjAwMDAxNVwiLCB3aWR0aDogMjAwIH0pIC8vUkMgMzIwMDAwMTUgOiBabi5cclxuICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7IG5hbWU6IFwiZGF0X3ptZW5hXCIsIGNhcHRpb246IFwianJlczozMjAwMDAxNlwiLCB3aWR0aDogMjAwIH0pIC8vUkMgMzIwMDAwMTYgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ6bWVudV9wcm92X3BpZF90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDE3XCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDAxNyA6IFptxJtudSBwcm92ZWRsXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oeyBuYW1lOiBcImRhdF9vZGVzXCIsIGNhcHRpb246IFwianJlczozMjAwMDAyMFwiLCB3aWR0aDogMjAwIH0pIC8vUkMgMzIwMDAwMjAgOiBEYXR1bSBvZGVzbMOhbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiZXN1X3R4dFwiLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwMjFcIiwgd2lkdGg6IDIwMCB9KSAvL1JDIDMyMDAwMDIxIDogQWRyZXPDoXRcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJvZGVzX3ByaWxcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDIyXCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDAyMiA6IE9kZXNsYW7DqSBwxZnDrWxvaHlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJzdGFydF9mdW5fdHh0XCIsIGNhcHRpb246IFwianJlczozMjAwMDAyM1wiLCB3aWR0aDogMjAwIH0pIC8vUkMgMzIwMDAwMjMgOiBacHJhY292YXRlbCBkb2t1bWVudHUgxI1pIHNwaXN1XHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiYWt0X2Z1bl90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDI0XCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDAyNCA6IEFrdHXDoWxuw60gdmxhc3Ruw61rIHrDoXNpbGt5XHJcbiAgICAgICAgICAgIHJldHVybiB7IGZvcm1hdDogZm9ybWF0LCBzZWFyY2hDb2x1bW5zOiBHUHBvVXRpbHMuZ2V0U3RyaW5nTmFtZXNPZkNvbHVtbnMoZm9ybWF0KSB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm1hdFJlY2VpdmUoKSB7XHJcbiAgICAgICAgICAgIHZhciBmb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICAvLyArIGljb24gc2xvdXBlY1xyXG4gICAgICAgICAgICBmb3JtYXRcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpeHBcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDEzXCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDAxMyA6IFBJRFxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm5hemV2XCIsIGNhcHRpb246IFwianJlczozMjAwMDAxNFwiLCB3aWR0aDogMjAwIH0pIC8vUkMgMzIwMDAwMTQgOiBWxJtjXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiYWt0X3puYWNrYVwiLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwMTVcIiwgd2lkdGg6IDIwMCB9KSAvL1JDIDMyMDAwMDE1IDogWm4uXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oeyBuYW1lOiBcImRhdF96bWVuYVwiLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwMTZcIiwgd2lkdGg6IDIwMCB9KSAvL1JDIDMyMDAwMDE2IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiem1lbnVfcHJvdl90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDE3XCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDAxNyA6IFptxJtudSBwcm92ZWRsXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oeyBuYW1lOiBcImRhdF9tcGQwXCIsIGNhcHRpb246IFwianJlczozMjAwMDAxOFwiLCB3aWR0aDogMjAwIH0pIC8vUkMgMzIwMDAwMTggOiBEYXR1bSBwb2TDoW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImVzdV90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDE5XCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDAxOSA6IE9kZXPDrWxhdGVsXHJcbiAgICAgICAgICAgIHJldHVybiB7IGZvcm1hdDogZm9ybWF0LCBzZWFyY2hDb2x1bW5zOiBHUHBvVXRpbHMuZ2V0U3RyaW5nTmFtZXNPZkNvbHVtbnMoZm9ybWF0KSB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm1hdENoYW5nZSgpIHtcclxuICAgICAgICAgICAgdmFyIGZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIC8vICsgaWNvbiBzbG91cGVjXHJcbiAgICAgICAgICAgIGZvcm1hdFxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHsgbmFtZTogXCJkYXRfem1lbmFcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDE2XCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDAxNiA6IERhdHVtIHptxJtueVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4cFwiLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwMTNcIiwgd2lkdGg6IDIwMCB9KSAvL1JDIDMyMDAwMDEzIDogUElEXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwibmF6ZXZcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDE0XCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDAxNCA6IFbEm2NcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJha3Rfem5hY2thXCIsIGNhcHRpb246IFwianJlczozMjAwMDAxNVwiLCB3aWR0aDogMjAwIH0pIC8vUkMgMzIwMDAwMTUgOiBabi5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ6bWVuYV90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDI1XCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDAyNSA6IFByb3ZlZGVuw6Egb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInBvem5hbWthXCIsIGNhcHRpb246IFwianJlczozMjAwMDAyNlwiLCB3aWR0aDogMjAwIH0pIC8vUkMgMzIwMDAwMjYgOiBQb3puw6Fta2FcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ6bWVudV9wcm92X3R4dFwiLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwMTdcIiwgd2lkdGg6IDIwMCB9KSAvL1JDIDMyMDAwMDE3IDogWm3Em251IHByb3ZlZGxcclxuICAgICAgICAgICAgcmV0dXJuIHsgZm9ybWF0OiBmb3JtYXQsIHNlYXJjaENvbHVtbnM6IEdQcG9VdGlscy5nZXRTdHJpbmdOYW1lc09mQ29sdW1ucyhmb3JtYXQpIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIG1ldG9kYSB2cmF0aSBzZXpuYW0gdHJhbnNha2NuaWNoIHByb3Rva29sdSwga3RlcmUgc2UgbWFqaSB2eWdlbmVyb3ZhdFxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRMaXN0R2VuZXJhdGVUcmFuc1Byb3RvY29sKCkge1xyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIC0tIGRvcGxuxJtuw60gc3Bpc19wbCBhIHNwaXNfem5ha3UgeiBkYiBwYXJhbWV0cnUgLS1cclxuXHJcbiAgICAgICAgICAgIHZhciBzcFBsYW4gPSBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgc3BabmFrID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICh0aGlzLnBwb19zcHBsID09IG51bGwgPyBcIlwiIDogdGhpcy5wcG9fc3BwbCkudHJpbSgpLnNwbGl0KFwiLFwiKS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcFBsYW4gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcFpuYWsgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBJR1BQb0dlbmVyYXRlTW9kZWwgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIG1vZGVsKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtb2RlbCAhPSBudWxsICYmIG1vZGVsLkdlbmVyYXRlRm9yRGF0ZVBlcmlvZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyE/IHZ5dHZvcmkgamVkZW4gcHJvdG9rb2wgcHJvIGNlbGUgb2Jkb2JpXHJcbiAgICAgICAgICAgICAgICBpZiAobW9kZWwuR2VuZXJhdGVGb3JEYXRlUGVyaW9kID09IEdQcG9HZW5lcmF0ZUZvckRhdGVQZXJpb2RFbnVtLldob2xlU2Vhc29uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8hPyB2eXR2b3JpIHByb3Rva29sIHBybyBrYXpkeSBkZW4gdiBvYmRvYmlcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1vZGVsLkdlbmVyYXRlRm9yRGF0ZVBlcmlvZCA9PSBHUHBvR2VuZXJhdGVGb3JEYXRlUGVyaW9kRW51bS5JbmRpdmlkdWFsRGF5cykge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIT8gdnl0dm9yaSBwcm90b2tvbCBwcm8ga2F6ZHkgbWVzaWMgdiBvYmRvYmlcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1vZGVsLkdlbmVyYXRlRm9yRGF0ZVBlcmlvZCA9PSBHUHBvR2VuZXJhdGVGb3JEYXRlUGVyaW9kRW51bS5JbmRpdmlkdWFsTW9udGhzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuUHBvLldlYkNvbnRyb2xzIHtcclxuXHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJvdsOhbsOtIFBQT1xyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUHBvR2VuZXJhdGVadWQgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvKiogZWxlbWVudCBmb3JtdWzDocWZZSAqL1xyXG4gICAgICAgIHByaXZhdGUgZm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb250ZXh0TWVudSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb250ZXh0TWVudSgpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtczogTWVudVBhcmFtc1tdID0gW107XHJcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJnZW5lcmF0ZVp1ZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDEwNVwiLCAvL1JDIDMyMDAwMTA1IDogR2VuZXJvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5VdGlscy53YWl0Rm9yVmFsdWVzKHRoaXMuZm9ybSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChpc1ZhbGlkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzVmFsaWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR0bzogYW55ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhcInNlbGVjdGlvblwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR0byAhPSBudWxsICYmIGR0by5zZWxlY3Rpb24gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZHRvLnNlbGVjdGlvbi52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImlkRmxhc2hadWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImpyZXM6MzIwMDAxMDdcIiAvL1JDIDMyMDAwMTA3IDogUHJvYsOtaMOhIG9wZXJhY2UsIHYgbsSba3RlcsO9Y2ggcMWZw61wYWRlY2ggbcWvxb5lIHRydmF0IHBvbcSbcm7EmyBkbG91aG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlWnVkKHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oXCJpZEZsYXNoWnVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdlbmVyYXRlWnVkKHZhbHVlOiBXZmwuSW50ZXJmYWNlLkdQcG9UcFR5cGVFbnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbGwoXCJHZW5lcmF0ZVpVRFwiLCB7IFZhbHVlOiB2YWx1ZSB9LCB7fSwgeyBwcm9ncmVzc1N0YXRlOiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhOiBHb3JkaWMuV2ZsLldlYkNsaWVudC5JR2VuZXJhdGVadWRUeXBlW10gPSBbXTtcclxuICAgICAgICAgICAgLyoqIGRlbm7DrSBrb21wbGV0bsOtIHRyYW5zYWvEjW7DrSBwcm90b2tvbCAqL1xyXG4gICAgICAgICAgICB2YXIgY29tcGxldGVQcm90b2NvbDogR29yZGljLldmbC5XZWJDbGllbnQuSUdlbmVyYXRlWnVkVHlwZSA9IHsgdmFsdWU6IFdmbC5JbnRlcmZhY2UuR1Bwb1RwVHlwZUVudW0uRGVubmlLb21wbGV0bmlUcmFuc2FrY25pUHJvdG9rb2xabWVuWnVkLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAxMDNcIiB9OyAvL1JDIDMyMDAwMTAzIDogIERlbm7DrSBrb21wbGV0bsOtIHRyYW5zYWvEjW7DrSBwcm90b2tvbFxyXG4gICAgICAgICAgICAvKiogZGVubsOtIHRyYW5zYWvEjW7DrSBwcm90b2tvbCB6bcSbbiAqL1xyXG4gICAgICAgICAgICB2YXIgY2hhbmdlUHJvdG9jb2w6IEdvcmRpYy5XZmwuV2ViQ2xpZW50LklHZW5lcmF0ZVp1ZFR5cGUgPSB7IHZhbHVlOiBXZmwuSW50ZXJmYWNlLkdQcG9UcFR5cGVFbnVtLkRlbm5pVHJhbnNha2NuaVByb3Rva29sWm1lblp1ZCwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMTA0XCIgfTsgLy9SQyAzMjAwMDEwNCA6IERlbm7DrSB0cmFuc2FrxI1uw60gcHJvdG9rb2wgem3Em25cclxuICAgICAgICAgICAgZGF0YS5wdXNoKGNvbXBsZXRlUHJvdG9jb2wpO1xyXG4gICAgICAgICAgICBkYXRhLnB1c2goY2hhbmdlUHJvdG9jb2wpO1xyXG5cclxuICAgICAgICAgICAgdmFyIEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJGb3JtUHBvR2VuZXJhdGVadWRcIixcclxuICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMSwgYnJlYWtzLTcwMC0xMDAwXCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBGb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMjAwMDEwNlwiKSAvL1JDIDMyMDAwMTA2IDogVsO9YsSbclxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNlbGVjdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogY29tcGxldGVQcm90b2NvbCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE/LmNhcHRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmZvcm0uZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIEZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxufSIsIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuUHBvLldlYkNvbnRyb2xzLkdQcG9IaXN0b3J5RG9jU3Bpcy50c1x0XHQgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBIaXN0b3JpZSBkb2t1bWVudHUvc3Bpc3VcdFx0XHRcdFx0XHQgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIFRvbcOhxaEgSGHFvm11a2FcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjBcdFx0XHRcdFx0XHRcdDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjAtMDgtMDdcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuUHBvLldlYkNvbnRyb2xzIHtcclxuXHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzO1xyXG5cclxuICAgIGludGVyZmFjZSBJR1Bwb0hpc3RvcnlEb2NTcGlzRm9ybWF0R3JpZCB7XHJcbiAgICAgICAgZm9ybWF0OiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0LFxyXG4gICAgICAgIHNlYXJjaENvbHVtbnM6IHN0cmluZ1tdXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcm92w6Fuw60gUFBPXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQcG9IaXN0b3J5RG9jU3BpcyBleHRlbmRzIEdDb250ZW50QmFzZTxHb3JkaWMuUHBvLldlYkNvbnRyb2xzLkdQcG9CYXNlPiB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgVEVNUF9UQUJfSU5ERVggPSBcIjk5OTk5XCI7XHJcbiAgICAgICAgLyoqIGFrY2UgcHJvIHRpc2sgc2VzdGF2eSAqL1xyXG4gICAgICAgIHByaXZhdGUgcHJpbnRBY3Rpb246IEdBY3Rpb247XHJcbiAgICAgICAgLyoqIGVsZW1lbnQgZm9ybXVsw6HFmWUgKi9cclxuICAgICAgICBwcml2YXRlIGZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIGVsZW1lbnQgZ3JpZMWvICovXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkczogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICAvKiogZGF0YSBkaWFsb2d1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhOiBHUHBvSGlzdG9yeURvY1NwaXNEdG9bXTtcclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIHNwdcWhdMSbbsOtIGRpYWxvZ3UgaGxlZMOhbsOtICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZWFyY2goKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5lbXB0eSgpO1xyXG4gICAgICAgICAgICBXZmwuRGlhbG9ncy5HSGxlZGF0SWRlbnREb2tTcGlzRGxnKHRoaXMsIHt9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKG91dHB1dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdChvdXRwdXQgPT0gbnVsbCB8fCBvdXRwdXQuaXhwID09IG51bGwgPyBudWxsIDogb3V0cHV0Lml4cCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51YmFyKCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zOiBNZW51UGFyYW1zW10gPSBbXTtcclxuICAgICAgICAgICAgcGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDA4N1wiLCAvL1JDIDMyMDAwMDg3IDogSGxlZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTZWFyY2hcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLW1hZ2dsYXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMyMDAwMDg4XCIsIC8vUkMgMzIwMDAwODggOiBPdGV2xZnDrXQgZGlhbG9nIGhsZWTDoW7DrSBkbGUgaWRlbnRpZmlrw6F0b3J1XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJpbnRBY3Rpb24gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDA5N1wiLCAvL1JDIDMyMDAwMDk3IDogR2VuZXJvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMyMDAwMDk4XCIsIC8vUkMgMzIwMDAwOTggOiBWeWdlbmVydWplIHNlc3RhdnUgaGlzdG9yaWUgZG9rdW1lbnR1XHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLnByaW50QWN0aW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldEVuYWJsZWRUb1ByaW50QWN0aW9uKGVuYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJpbnRBY3Rpb24gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmludEFjdGlvbi51cGRhdGUoeyBlbmFibGVkOiBlbmFibGVkIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIG1ldG9kYSwga3RlcsOhIHByb3ZlZGUgdmFsaWRhY2kgYSB2csOhdMOtIHbDvXNsZWRlayB2YWxpZGFjZSBhxb4gamUgZm9ybXVsw6HFmSBwxZlpcHJhdmVuXHJcbiAgICAgICAgKiovXHJcbiAgICAgICAgcHJpdmF0ZSB3YWl0Rm9yVmFsdWVzKGZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD4pOiBKUXVlcnlQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICAgICAgdmFyIGRmZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgZm9ybS5nZm9ybShcIndhaXRGb3JWYWx1ZXNcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5nZm9ybShcImlzVmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGlzVmFsaWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZShpc1ZhbGlkKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGZkLnJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZGZkLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlUHJpbnRBY3Rpb24oKSB7XHJcbiAgXHJcbiAgICAgICAgICAgIHRoaXMucHJpbnRBY3Rpb24gPSB0aGlzLmFjdGlvbnMuYWRkKEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnlzdHVwQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJwcG9faGRrX3Rpc2tcIiwgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMjAwMDA5OVwiLCAgIC8vUkMgMzIwMDAwOTkgOiBWw71zdHVwXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMjAwMDEwMFwiLCAgICAgLy9SQyAzMjAwMDEwMCA6IFZ5YmVydGUgc2VzdGF2dVxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ09wZW5pbmc6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRmZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0Rm9yVmFsdWVzKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChpc1ZhbGlkKSA9PiB7IGlzVmFsaWQgPT09IHRydWUgPyBkZmQucmVzb2x2ZSgpIDogZGZkLnJlamVjdCgpOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4geyBkZmQucmVqZWN0KCk7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZmQucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IChyZXApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIG1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtc1tcIlgwMDAwXCJdID0gbW9kZWwuSXhwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zW1wiWDAwMDJcIl0gPSB0aGlzLlRFTVBfVEFCX0lOREVYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zW1wiWDAwMDdcIl0gPSB0aGlzLlNlc3Npb25Mb2dQb3JDaXNsbz8udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtc1tcIlgwMDA4XCJdID0gdGhpcy5TZXNzaW9uSXhzRnVuITtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoaXMucGFyZW50Q29udGVudCA9PSBudWxsID8gdW5kZWZpbmVkIDogdGhpcy5wYXJlbnRDb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxTY3JlZW46IHRydWVcclxuICAgICAgICAgICAgICAgIH0pKSBhcyBHUHJpbnRBY3Rpb25UeXBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVJeHBMaXN0KGRhdGE6IEdQcG9IaXN0b3J5RG9jU3Bpc0R0b1tdKSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0OiB7IGl4cDogc3RyaW5nLCBpc1NwaXM6IGJvb2xlYW4gfVtdID0gW107XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YSA9PSBudWxsIHx8IGRhdGEubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgZGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGRhdGFbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUuSXhwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHZhbHVlLkl4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTcGlzOiB2YWx1ZS5Eb2NJbmZvPy5Jc1NwaXMhXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXQoaXhwOiBzdHJpbmcgfCBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVByaW50QWN0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWVudWJhcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWxsKFwiQ3JlYXRlSGlzdG9yeVwiLCB7IEl4cDogaXhwIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigob3V0cHV0OiBHUHBvSGlzdG9yeURvY1NwaXNEdG9bXSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3V0cHV0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRFbmFibGVkVG9QcmludEFjdGlvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IG91dHB1dDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm0odGhpcy5jcmVhdGVJeHBMaXN0KG91dHB1dCksIG91dHB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkcyA9ICQoXCI8ZGl2IGNsYXNzPSdncmlkcyc+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIGV4aXN0dWrDrSBkYXRhLCBzZXRudSBqZSBkbyBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvdXRwdXQgIT0gbnVsbCAmJiBvdXRwdXQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Q29udGVudChvdXRwdXRbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhcHBseUNvbnRlbnQoZGF0YT86IEdQcG9IaXN0b3J5RG9jU3Bpc0R0byB8IG51bGwpIHtcclxuICAgICAgICAgICAgLy8hIG1vZGVsIGFwcGx5XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm0gIT0gbnVsbCAmJiBkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLkRvY0luZm8gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBkYXRhLkRvY0luZm8sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ncmlkcyAhPSBudWxsKSB7IHRoaXMuZ3JpZHMuZW1wdHkoKTsgfSAgICAgICAgICAgICAgICAvLyB2ecSNaXN0xJtuw60gcMWZZWRjaG96w61obyBjb250ZW50dVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZChcIkhpc3RvcmllXCIsIFwianJlczozMjAwMDA4NFwiLCBcIiFkYXRfem1lbmFcIiwgdGhpcy5jcmVhdGVGb3JtYXQoR1Bwb1R5cGVHcmlkSGlzdG9yeURvY1NwaXNFbnVtLkhpc3QpLCBkYXRhLkhpc3RvcmllWm1lbkR0byk7IC8vUkMgMzIwMDAwODQgOiBIaXN0b3JpZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkKFwiRWxTb3Vib3J5XCIsIFwianJlczozMjAwMDA4NVwiLCBcIiFkYXRfem1lbmFcIiwgdGhpcy5jcmVhdGVGb3JtYXQoR1Bwb1R5cGVHcmlkSGlzdG9yeURvY1NwaXNFbnVtLkVsRG9jcyksIGRhdGEuU2V6bmFtUG9kcGlzdUVsU291Ym9ydUR0byk7IC8vUkMgMzIwMDAwODUgOiBFbC4gc291Ym9yeVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLkRvY0luZm8/LklzU3BpcyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZChcIlNiZXJueUFyY2hcIiwgXCJqcmVzOjMyMDAwMDg2XCIsIFwicG9yX2Npc2xvXCIsIHRoaXMuY3JlYXRlRm9ybWF0KEdQcG9UeXBlR3JpZEhpc3RvcnlEb2NTcGlzRW51bS5BcmNoKSwgZGF0YS5TZXpuYW1TYmVybnlBcmNoU3Bpc3VEdG8pOyAvL1JDIDMyMDAwMDg2IDogU2LEm3Juw70gYXJjaCBzcGlzdVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB2eXR2b8WZaXQgZm9ybXVsw6HFmVxyXG4gICAgICAgICAqIEBwYXJhbSBpeHBMaXN0IHNlem5hbSBpZGVudGlmaWvDoXRvcsWvIHBybyB2w71ixJtyXHJcbiAgICAgICAgICogQHBhcmFtIGRhdGEgZGF0YSBkbyBzZXpuYW11IGEgZm9ybXVsw6HFmWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oaXhwTGlzdDoge2l4cDogc3RyaW5nLCBpc1NwaXM6IGJvb2xlYW59W10sIGRhdGE6IEdQcG9IaXN0b3J5RG9jU3Bpc0R0b1tdKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkZvcm1QcG9IaXN0b3J5RG9rU3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEsIEwtMy04LTEsIE0tMTItMTEtMSwgUy0xMi0xMS0xLCBicmVha3MtNzAwLTEwMDBcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiAtLSBwb8SNZXQgaWRlbnRpZmlrw6F0b3LFryAtLVxyXG5cclxuICAgICAgICAgICAgLyoqIGJhZGdlIHBvxI10dSBpZGVudGlmaWvDoXRvcsWvICovXHJcbiAgICAgICAgICAgIHZhciBjb3VudEJhZGdlID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIGl4cExpc3QubGVuZ3RoLnRvU3RyaW5nKCkuc3BsaXQoXCJcIikubWFwKCh2YWx1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvdW50QmFkZ2UgKz0gXCImI1wiICsgdmFsdWUuY2hhckNvZGVBdChpbmRleCkudG9TdHJpbmcoKSArIFwiO1wiO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICBGb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMyMDAwMDY1XCIgICAgICAgICAgICAgICAgICAvL1JDIDMyMDAwMDY1IDogVsO9YsSbclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIHBvbMOtxI1rbyBwcm8gdsO9YsSbciBpbmRldGlmaWvDoXRvcnUgZG9rdW1lbnR1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyYXBoaWNJbnB1dDogXCJvbmlucHV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJJeHBcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5JeHA9dmFsdWUuaXhwOyBtb2RlbC5Jc1NwaXM9dmFsdWUuaXNTcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogaXhwTGlzdCxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpY29uOiBjb3VudEJhZGdlLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLWluZm9cIiwgdG9vbHRpcDogXCJqcmVzOjMyMDAwMDkyXCIgfSwgICAgICAgIC8vUkMgMzIwMDAwOTIgOiBQb8SNZXQgaWRlbnRpZmlrw6F0b3LFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGljb246ICdmYS1pbmZvLWNpcmNsZScsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtaW5mb1wiLCB0b29sdGlwOiBcImpyZXM6MzIwMDAwOTBcIiB9ICAgLy9SQyAzMjAwMDA5MCA6IFDFmWkgdsO9YsSbcnUgaWRlbnRpZmlrw6F0b3J1IGRvamRlIGsgcMWZZWtyZXNsZW7DrSBkaWFsb2d1LlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVySXRlbVRlbXBsYXRlOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9SQyAzMjAwMDA5NSA6IFNwaXMgLy9SQyAzMjAwMDA5NiA6IERva3VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gdmFsdWUuaXNTcGlzID09PSB0cnVlID8gXCJqcmVzOjMyMDAwMDk1XCIgOiBcImpyZXM6MzIwMDAwOTZcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4cCA9IHZhbHVlLml4cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiPGI+XCIgKyBpeHAgKyBcIjwvYj4gXCIgKyBcIjxpPlwiICsgdHlwZSArIFwiPC9pPlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSAkKFwiPGRpdj5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiPGRpdiBjbGFzcz0nZ2kgZ2ktcGlkIG1pbmlmb3RvJz5cIikuYXBwZW5kVG8oZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1JDIDMyMDAwMDk1IDogU3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9SQyAzMjAwMDA5NiA6IERva3VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiPGk+XCIpLnRleHQodmFsdWUuaXNTcGlzID09PSB0cnVlID8gXCJqcmVzOjMyMDAwMDk1XCIgOiBcImpyZXM6MzIwMDAwOTZcIikuYXBwZW5kVG8oZWxlbWVudCk7ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCI8YnI+XCIpLmFwcGVuZFRvKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIjxiPlwiKS50ZXh0KHZhbHVlLml4cCkuYXBwZW5kVG8oZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gb2JqLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZS5peHAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB0aGlzLmRhdGEubGVuZ3RoOyB4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMuZGF0YVt4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5JeHAgPT09IHZhbHVlLml4cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Q29udGVudChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Q29udGVudChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jdXN0b21DbGFzczogXCJ3LTZcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIEZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKCkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMyMDAwMDc1LCBqcmVzOjMyMDAwMDc2XCIpICAgICAvL1JDIDMyMDAwMDc1IDogUElEIC8vUkMgMzIwMDAwNzYgOiBabi5cclxuICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJJeHBcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ3LTZcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIEZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQWt0Wm5hY2thXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidy02XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBGb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMjAwMDA3N1wiKSAgICAvL1JDIDMyMDAwMDc3IDogVsSbY1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJOYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzIwMDAwNzhcIikgICAgLy9SQyAzMjAwMDA3OCA6IFNwaXMuem5ha1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3Nsc3NwbCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJTcGlzUGxcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5TcGlzUGw9dmFsdWUuc3Bpc19wbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInctM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3Nsc3NweigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJTcGlzWm5ha1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInctOVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyYXBoaWNJbnB1dDogXCJvbmlucHV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAoR29yZGljIGFzIGFueSkuV2ZsLkdXZmxDb21tb25EbGcuc3Nsc3Nwekl0ZW1UZW1wbGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6ICQodGhpcykuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBzcGlzX3BsOiBkdG8uU3Bpc1BsLCBzcGlzX3puYWs6IGR0by5TcGlzWm5hayB9LCB7IHZhbGlkOiBmYWxzZSB9KTsgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogZHRvLlNwaXNabmFrID0gKCQodGhpcykuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPyAkKHRoaXMpLmdmaWVsZChcImdldFZhbHVlXCIpLnNwaXNfem5hayA6IG51bGwpOyByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJTcGlzWm5hayBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGlzX3BsOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJTcGlzUGxcIiwgXCJzcGlzX3BsXCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmZvcm0uZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIEZvcm0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiB2eXR2b8WZaXQgc2V6bmFtICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKG5hbWU6IHN0cmluZywgdGl0bGU6IHN0cmluZywgc29ydDogc3RyaW5nLCBmb3JtYXQ6IElHUHBvSGlzdG9yeURvY1NwaXNGb3JtYXRHcmlkLCBkYXRhPzogYW55W10gfCBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdyaWRzICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyNyZWdpb24gLS0gU2VjdGlvbiAtLVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkZvcm1HcmlkUHBvXCIgKyBuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMSwgYnJlYWtzLTcwMC0xMDAwXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIEZvcm0uYWRkU2VjdGlvbih0aXRsZSlcclxuICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZ3JpZHMpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5nZm9ybShcImNyZWF0ZUZyb21cIiwgRm9ybSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAgICAgLy8jcmVnaW9uIC0tIERhdGEgLS1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbXlEYXRhOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCAmJiBkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBteURhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBncmlkID0gJChcIjxkaXY+XCIpLmdhdXRvZml0KCkuYXBwZW5kVG8odGhpcy5ncmlkcyk7XHJcbiAgICAgICAgICAgICAgICBncmlkLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbXlEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFwiICsgbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBmb3JtYXQuZm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IHNvcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogZm9ybWF0LnNlYXJjaENvbHVtbnMsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdnl0dm/FmWl0IGZvcm3DoXQgcHJvIHNlem5hbVxyXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIHR5cCBmb3Jtw6F0dVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybWF0KHR5cGU6IEdQcG9UeXBlR3JpZEhpc3RvcnlEb2NTcGlzRW51bSkge1xyXG4gICAgICAgICAgICB2YXIgZm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IEdQcG9UeXBlR3JpZEhpc3RvcnlEb2NTcGlzRW51bS5IaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oeyBuYW1lOiBcImRhdF96bWVuYVwiLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwMzlcIiwgd2lkdGg6IDIwMCB9KSAvL1JDIDMyMDAwMDM5IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInptZW5hX3R4dFwiLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwNDBcIiwgd2lkdGg6IDIwMCB9KSAvL1JDIDMyMDAwMDQwIDogWm3Em25hXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInBvem5hbWthXCIsIGNhcHRpb246IFwianJlczozMjAwMDA0MVwiLCB3aWR0aDogMjAwIH0pIC8vUkMgMzIwMDAwNDEgOiBQb3puw6Fta2FcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwibmF6ZXZfcmZcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDQyXCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDA0MiA6IFptxJtudSBwcm92ZWRsXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBmb3JtYXQ6IGZvcm1hdCwgc2VhcmNoQ29sdW1uczogR1Bwb1V0aWxzLmdldFN0cmluZ05hbWVzT2ZDb2x1bW5zKGZvcm1hdCkgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IEdQcG9UeXBlR3JpZEhpc3RvcnlEb2NTcGlzRW51bS5FbERvY3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbihHb3JkaWMuV2ZsLkdsb2JhbHMuTGlzdFN1cHBvcnQuVGVjaG5pY2tlVmxhc3Rub3N0aUNvbHVtbkRsZygpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKEdvcmRpYy5XZmwuR2xvYmFscy5MaXN0U3VwcG9ydC5FbGVDb2x1bW4oKSlcclxuXHJcbiAgICAgICAgICAgICAgICBmb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhiXCIsIGNhcHRpb246IFwianJlczozMjAwMDA0M1wiLCB3aWR0aDogMjAwIH0pIC8vUkMgMzIwMDAwNDMgOiBJRFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJzb3Vib3JcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDQ0XCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDA0NCA6IFNvdWJvclxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInNlcl9jaXNsb1wiLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwNDVcIiwgd2lkdGg6IDIwMCB9KSAvL1JDIDMyMDAwMDQ1IDogVmVyemVcclxuICAgICAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHsgbmFtZTogXCJ2ZWxpa29zdFwiLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwNDZcIiwgd2lkdGg6IDIwMCB9KSAvL1JDIDMyMDAwMDQ2IDogVmVsaWtvc3RcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwic291Ym9yX2hcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDQ3XCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDA0NyA6IFNoYTFcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwic291Ym9yX2gyXCIsIGNhcHRpb246IFwianJlczozMjAwMDA0OFwiLCB3aWR0aDogMjAwIH0pIC8vUkMgMzIwMDAwNDggOiBTaGEyNTZcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oeyBuYW1lOiBcImRhdF96bWVuYVwiLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwMzlcIiwgd2lkdGg6IDIwMCB9KSAvL1JDIDMyMDAwMDM5IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInptZW51X3Byb3ZcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDQ5XCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDA0OSA6IFptxJtudSBwcm92ZWRsXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBmb3JtYXQ6IGZvcm1hdCwgc2VhcmNoQ29sdW1uczogR1Bwb1V0aWxzLmdldFN0cmluZ05hbWVzT2ZDb2x1bW5zKGZvcm1hdCkgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSBHUHBvVHlwZUdyaWRIaXN0b3J5RG9jU3Bpc0VudW0uQXJjaCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwicG9yX2Npc2xvXCIsIGNhcHRpb246IFwianJlczozMjAwMDA1MFwiLCB3aWR0aDogMjAwIH0pIC8vUkMgMzIwMDAwNTAgOiBQb8WZLlxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJha3Rfem5hY2thXCIsIGNhcHRpb246IFwianJlczozMjAwMDA1MVwiLCB3aWR0aDogMjAwIH0pIC8vUkMgMzIwMDAwNTEgOiBabi5cclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhwXCIsIGNhcHRpb246IFwianJlczozMjAwMDA1MlwiLCB3aWR0aDogMjAwIH0pIC8vUkMgMzIwMDAwNTIgOiBJZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7IG5hbWU6IFwiZGF0X29kXCIsIGNhcHRpb246IFwianJlczozMjAwMDA1M1wiLCB3aWR0aDogMjAwIH0pIC8vUkMgMzIwMDAwNTMgOiBWbG/FvmVub1xyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJuYXpldlwiLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwNTRcIiwgd2lkdGg6IDIwMCB9KSAvL1JDIDMyMDAwMDU0IDogVsSbY1xyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJwb3puYW1rYVwiLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwNDFcIiwgd2lkdGg6IDIwMCB9KSAvL1JDIDMyMDAwMDQxIDogUG96bsOhbWthXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oeyBuYW1lOiBcImRhdF9wb2RcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDU1XCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDA1NSA6IERhdHVtIHBvZMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHsgbmFtZTogXCJkYXRfem1lbmFcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDM5XCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDAzOSA6IERhdHVtIHptxJtueVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ6bWVudV9wcm92X3R4dFwiLCBjYXB0aW9uOiBcImpyZXM6MzIwMDAwNTZcIiwgd2lkdGg6IDIwMCB9KSAvL1JDIDMyMDAwMDU2IDogWm3Em251IHByb3ZlZGxcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhzX3R5cF90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDU3XCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDA1NyA6IFR5cFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJtaXN0b192em5pa3VcIiwgY2FwdGlvbjogXCJqcmVzOjMyMDAwMDU4XCIsIHdpZHRoOiAyMDAgfSkgLy9SQyAzMjAwMDA1OCA6IE9kZXPDrWxhdGVsXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBmb3JtYXQ6IGZvcm1hdCwgc2VhcmNoQ29sdW1uczogR1Bwb1V0aWxzLmdldFN0cmluZ05hbWVzT2ZDb2x1bW5zKGZvcm1hdCkgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IGZvcm1hdDogZm9ybWF0LCBzZWFyY2hDb2x1bW5zOiBHUHBvVXRpbHMuZ2V0U3RyaW5nTmFtZXNPZkNvbHVtbnMoZm9ybWF0KSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0iXX0=
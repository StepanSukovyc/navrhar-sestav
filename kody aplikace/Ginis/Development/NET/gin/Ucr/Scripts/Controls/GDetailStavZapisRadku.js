"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            let GDetailStavZapisRadku = class GDetailStavZapisRadku extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GDetailStavZapisRadku#";
                    //private $gridDoklad: JQuery;
                    /**
                     * trida gridu
                     */
                    this.classGrid = "js-grid-base";
                    /**
                     * trida gridu pro detail
                     */
                    this.classDetailGrid = "js-grid-detail";
                    // atribut editacniho rezimu
                    this.editMode = "Zadny";
                    // atribut zmeny hodnoty (pro ulozeni zmen na gridu)
                    this.valueChanged = false;
                    this.reloadZapisRadku = false;
                }
                prepareContent(options) {
                    if (!options)
                        return;
                    this.init(options);
                }
                /**
                 *
                 * @param options
                 */
                init(options) {
                    this.options = options;
                    let srvMethodName = "";
                    let that = this;
                    let initMethod;
                    let setDataMethod;
                    this.tabSettings = this.options.tabSettings || this.userSettings.get("tabSettings") || { detailOpened: true, popisOpened: false, dokladOpened: true, souvisejiciOpened: false };
                    if (this.options.viewMode === "full")
                        this.commandBar([{
                                action: new GAction({
                                    name: "closeAct",
                                    caption: "jres:31100168", //RC 31100168 : Zavřít
                                    run: (ev, ctx) => { this.close(); }
                                })
                            }]);
                    switch (options.typUlohy) {
                        case 2 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviStav */:
                            this.title = "jres:31100111"; //RC 31100111 : Detail řádku účetního stavu
                            srvMethodName = "GetStavRadku";
                            initMethod = this.initStavRadku;
                            setDataMethod = this.setStavRadku;
                            break;
                        case 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */:
                            this.title = "jres:31100112"; //RC 31100112 : Detail řádku účetního zápisu
                            srvMethodName = "GetZapisRadku";
                            initMethod = this.initZapisRadku;
                            setDataMethod = this.setZapisRadku;
                            break;
                        case 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */:
                            this.title = "jres:30250343"; //RC 30250343 : RISRE - Nezařazené zápisy - Detail řádku účetního zápisu
                            srvMethodName = "GetZapisRadku";
                            initMethod = this.initZapisRadku;
                            setDataMethod = this.setZapisRadku;
                            break;
                        case 0 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetStav */:
                            this.title = "jres:31100109"; //RC 31100109 : Detail řádku rozpočtového stavu
                            srvMethodName = "GetStavRadku";
                            initMethod = this.initStavRadku;
                            setDataMethod = this.setStavRadku;
                            break;
                        case 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */:
                            this.title = "jres:30250102"; //RC 30250102 : Detail řádku evidence DPH
                            srvMethodName = "GetZapisRadku";
                            initMethod = this.initZapisRadku;
                            setDataMethod = this.setZapisRadku;
                            break;
                        case 9 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.ViceleteFinancovaniZapis */:
                        case 4 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis */:
                            this.title = "jres:30250101"; //RC 30250101 : Detail řádku financování
                            srvMethodName = "GetZapisRadku";
                            initMethod = this.initZapisRadku;
                            setDataMethod = this.setZapisRadku;
                            break;
                        case 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */:
                            this.title = "jres:31100110"; //RC 31100110 : Detail řádku rozpočtového zápisu
                            srvMethodName = "GetZapisRadku";
                            initMethod = this.initZapisRadku;
                            setDataMethod = this.setZapisRadku;
                            break;
                        case 13 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapisyVse */:
                        case 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */:
                            let val1 = "";
                            if (options?.globals?.SaldokontoParam1.trim() != "") {
                                val1 = options?.globals?.SaldokontoParam1.trim() + ": " + options.row.value0;
                            }
                            if (options?.globals?.SaldokontoParam2.trim() != "") {
                                if (val1 == "")
                                    val1 = options?.globals?.SaldokontoParam2.trim() + ": " + options.row.value1;
                                else
                                    val1 += ", " + options?.globals?.SaldokontoParam2.trim() + ": " + options.row.value1;
                            }
                            this.title = "jres:30250291".format(val1); //RC 30250291 : Zápisy saldokonta ({0})
                            srvMethodName = "GetZapisRadku";
                            initMethod = this.initZapisRadku;
                            setDataMethod = this.setZapisRadku;
                            break;
                        default:
                            throw new GError("Current type is not supported");
                    }
                    if (options.typUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */ || options.typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */) {
                        if (this.options.viewMode === "full") {
                            if (this.options.globals?.PovoleniEditacePopisuUCTDokladu && options.typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                                || this.options.globals?.PovoleniEditacePopisuROZDokladu && options.typUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */) // TODO: Docasne zaremovano nez bude otestovano v jinych modulech na insert a update aktivity 500
                                //if (this.options.viewMode === "full" && this.options.globals?.PovoleniEditaceZapisuDokladu) {
                                this.actions.addRange({
                                    actUlozit: Gordic.Eko.Action.actionUlozit({ enabled: false, run: function () { this.setPending(that.saveRecord()); } }),
                                    actOpravit: Gordic.Eko.Action.actionOpravit({ enabled: true, run: function () { that.startEditMode("Popis"); } }),
                                    actZrusit: Gordic.Eko.Action.actionZrusit({ enabled: false, run: function () { that.cancelEditMode(); } }),
                                    actUlozitSP: Gordic.Eko.Action.actionUlozit({ enabled: false, run: function () { this.setPending(that.saveRecordSP()); } }),
                                    actOpravitSP: Gordic.Eko.Action.actionOpravit({
                                        enabled: true, run: function () {
                                            that.startEditMode("SruktPopis");
                                        }
                                    }),
                                    actZrusitSP: Gordic.Eko.Action.actionZrusit({ enabled: false, run: function () { that.cancelEditMode(); } }),
                                });
                        }
                    }
                    if (options.viewMode === "preview")
                        this.element.css("padding-top", "0.25rem");
                    initMethod.apply(this);
                    this.initGrid();
                    if (options.typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                        || options.typUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */
                        || options.typUlohy === 9 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.ViceleteFinancovaniZapis */
                        || options.typUlohy === 4 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis */
                        || options.typUlohy === 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */
                        || options.typUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */)
                        this.initPopis();
                    if (this.options.viewMode === "full"
                        && (this.options.typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                            || this.options.typUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */
                            || options.typUlohy === 9 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.ViceleteFinancovaniZapis */
                            || options.typUlohy === 4 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis */
                            || options.typUlohy === 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */
                            || options.typUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */))
                        this.initGridDoklad();
                    //if (this.options.typUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis) {
                    //    this.loadData(this.options.typUlohy);
                    //    return;
                    //}
                    this.beginOperation();
                    const srv = this.srv();
                    srv.call(srvMethodName, { sz: options.row, type: options.typUlohy, skipSumLimit: false })
                        .then((r) => {
                        setDataMethod.call(this, r);
                        if (srvMethodName === "GetZapisRadku") {
                            // ulozim si nactene zapisy radku, abych je mohl pouzit v gridu
                            this.zapisyRadu = r;
                        }
                        if (options.typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                            || options.typUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */
                            || options.typUlohy === 9 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.ViceleteFinancovaniZapis */
                            || options.typUlohy === 4 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis */
                            || options.typUlohy === 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */
                            || options.typUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */)
                            this.createPopis(r.popis);
                        return;
                    })
                        .always(() => {
                        srv.close();
                        this.endOperation();
                    });
                }
                //private loadData(typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType) {
                //    let that = this;
                //    switch (typUlohy) {
                //        case Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis:
                //            that.beginOperation();
                //            Gordic.Isl.UctZapis.list()
                //                .getData()
                //                .done(result => {
                //                }
                //                )
                //                .always(() => { that.endOperation(); });
                //            break;
                //    }
                //}
                srv() {
                    return this.createServiceContent(["Gordic.Ucr.WebClient.GSeznamEkoZaznamu", { serverParams: { TypUlohy: this.options.typUlohy } }]);
                }
                getFormOptions(mode) {
                    if (mode === "full")
                        return { layoutDescriptor: "L3M3S2, L-3-9-0, M-12-12-0, S-12-12-0, breaks-800-1190", name: "headForm" };
                    else if (mode === "preview")
                        return { layoutDescriptor: "L1M1S1, L-3-9-0, M-3-9-0, S-12-12-0, breaks-300-500", name: "headForm" };
                    else
                        throw new GError("NotSupported");
                }
                initStavRadku() {
                    let customClass = this.options.viewMode === "preview" ? "bold" : "";
                    let wrp$ = $("<div style='display: none'>").appendTo(this.element);
                    let form$ = $("<div class='detail-header'>")
                        .appendTo(this.element)
                        .gform("setup", this.getFormOptions(this.options.viewMode))
                        //NOTE: Zde se nepouziva ixp, protoze zadne nemaji!
                        .gformsection("create", "")
                        .gformrow("addFieldsRow", "jres:31100098") //RC 31100098 : Druh dokladu
                        .gselectbox(Gordic.Prefabs.Select.ekocdrd(), {
                        name: "drd",
                        model: "model.drd=value.drd",
                        disabled: true,
                        customClass: customClass
                    })
                        .gformrow("addFieldsRow", "jres:30250606" //RC 30250606 : Období
                    ).gstringbox({ name: "denMesicRok", disabled: true, customClass: customClass })
                        .gform("complete");
                    //#region Pro nasledujici policka nejsou data
                    //    .gformrow("addFieldsRow", "Agendove cislo").gstringbox()
                    //    .gformrow("addFieldsRow", "Evidencni cislo").gstringbox()
                    //.gformsection("create", "")
                    //    .gformrow("addFieldsRow", "Datum evidence").gstringbox()
                    //    .gformrow("addFieldsRow", "Zpracovatel").gstringbox()
                    //    .gformrow("addFieldsRow", "Vlastnik").gstringbox();
                    //#endregion
                    if (this.options.viewMode === "preview") {
                        $(form$).gform("viewMode", "view");
                        wrp$.gtab({
                            title: "jres:31100054", //RC 31100054 : Doklad
                            opened: this.tabSettings.detailOpened,
                            open: () => { this.tabSettings.detailOpened = true; this.updateSettings(); },
                            close: () => { this.tabSettings.detailOpened = false; this.updateSettings(); }
                        });
                        form$.detach().appendTo(wrp$);
                    }
                }
                initZapisRadku() {
                    let wrp$ = $("<div style='display: none'>").appendTo(this.element);
                    let denMesicRokLabel = "";
                    if (this.options.typUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */)
                        denMesicRokLabel = "jres:31100175"; //RC 31100175 : Datum realizace
                    else if (this.options.typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */ || this.options.typUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */)
                        denMesicRokLabel = "jres:31100176"; //RC 31100176 : Datum UÚP
                    else if (this.options.typUlohy === 4 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis */ || this.options.typUlohy === 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */)
                        denMesicRokLabel = "jres:31100175"; //RC 31100175 : Datum realizace
                    else if (this.options.typUlohy === 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */ || this.options.typUlohy === 13 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapisyVse */)
                        denMesicRokLabel = "jres:30250290"; //RC 30250290 : Zápisy saldokonts
                    else
                        throw new GError("Unsupported type");
                    let customClass = this.options.viewMode === "preview" ? "bold" : "";
                    let pidRowOptions = Gordic.Eko.Detail.Field.fieldPID({ fieldOpt: { name: "ixp", disabled: true } })[0];
                    let pidRowLabel = pidRowOptions.label;
                    let pidFieldOptions = pidRowOptions.fields[0].options;
                    let form$ = $("<div class='detail-header'>")
                        .appendTo(this.element)
                        .gform("setup", this.getFormOptions(this.options.viewMode))
                        .gformsection("create", "")
                        .gformrow("addFieldsRow", pidRowLabel).gstringbox(pidFieldOptions)
                        .gformsection("create", "")
                        .gformrow("addFieldsRow", "jres:31100102") //RC 31100102 : Druh dokladu (DRD)
                        .gselectbox(Gordic.Prefabs.Select.ekocdrd(), {
                        name: "drd",
                        model: "model.drd=value.drd",
                        disabled: true,
                        customClass: customClass
                    })
                        .gformrow("addFieldsRow", "jres:31100100").gstringbox({ name: "ac", disabled: true, customClass: customClass }) //RC 31100100 : Číslo dokladu
                        .gformrow("addFieldsRow", denMesicRokLabel).gstringbox({ name: "denMesicRok", disabled: true, customClass: customClass })
                        .gformsection("create", "")
                        .gformrow("addFieldsRow", "jres:31100079").gstringbox({ name: "zkrAg", disabled: true, customClass: customClass }) //RC 31100079 : Agenda
                        .gformrow("addFieldsRow", "jres:30250604") //RC 30250604 : Typ dokladu
                        .gselectbox(Gordic.Prefabs.Select.sslstyp(), {
                        name: "ixs_typ",
                        model: "model.ixs_typ=value.ixs_typ",
                        disabled: true,
                        customClass: customClass
                    })
                        .gformrow("addFieldsRow", "jres:30250603").gstringbox({ name: "akt_znacka", disabled: true, customClass: customClass }) //RC 30250603 : Agendové číslo
                        .gform("complete");
                    if (this.options.viewMode === "preview") {
                        $(form$).gform("viewMode", "view");
                        form$.detach().appendTo(wrp$);
                        wrp$.gtab({
                            title: "jres:31100054", //RC 31100054 : Doklad
                            opened: this.tabSettings.dokladOpened,
                            open: () => { this.tabSettings.dokladOpened = true; this.updateSettings(); },
                            close: () => { this.tabSettings.dokladOpened = false; this.updateSettings(); }
                        });
                    }
                    let ixs_esu = this.options.row.ixs_esu;
                    if ((this.options.typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */ || this.options.typUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */)
                        && ixs_esu && ixs_esu !== "0000SE00000M") { //NOTE: V TK je TODO na pridani na ESU nulak
                        this.menuBar([
                            {
                                action: new GAction({
                                    name: "esuDetailAct",
                                    icon: "gi-detail",
                                    caption: "jres:31100238", //RC 31100238 : Detail ESU
                                    run: (ev, ctx) => {
                                        Gordic.Esu.Dialogs.DetailEsuDlg(this, {
                                            IxsEsu: ixs_esu,
                                            Ucel: 1,
                                            Logovani: {
                                                Ixp: this.options.row.ixp,
                                                AktZnacka: "",
                                                DuvodHledani: 20,
                                                DuvodHledaniTxt: ""
                                            }
                                        });
                                    }
                                }),
                                favorite: true
                            }
                        ]);
                    }
                }
                /**
                 *  Nastaveni akci
                 */
                nastaveniAkci() {
                    this.actions.actOpravit?.update({ enabled: this.editMode === "Zadny" });
                    this.actions.actUlozit?.update({ enabled: this.editMode == "Popis" && this.valueChanged });
                    this.actions.actZrusit?.update({ enabled: this.editMode === "Popis" });
                    this.actions.actOpravitSP?.update({ enabled: this.editMode === "Zadny" });
                    this.actions.actUlozitSP?.update({ enabled: this.editMode === "SruktPopis" && this.valueChanged });
                    this.actions.actZrusitSP?.update({ enabled: this.editMode === "SruktPopis" });
                    this.element.findForms("popisDokladu").findFields("popis").gfield("option", "disabled", this.editMode !== "SruktPopis");
                    const grid = this.getDetailGrid();
                    if (grid == null)
                        return;
                    var condFormat = undefined;
                    if (this.editMode === "Popis") {
                        // podminene formatovani
                        condFormat = [
                            {
                                description: "jres:30250669", //RC 30250669 : Editovatelná hodnota
                                /*applyTo: "name",*/ formula: "NOT(@canEdit)", bg: Gordic.Components.Grid.CondFormats.CondFormatBg.gray
                            },
                            {
                                description: "jres:30250669", //RC 30250669 : Editovatelná hodnota
                                applyTo: "name,val2", formula: "1", bg: Gordic.Components.Grid.CondFormats.CondFormatBg.gray
                            }
                        ];
                    }
                    grid.ggrid("useProfile", {
                        condFormats: condFormat
                    });
                }
                /***
                 * Rezim oprav
                 *
                 */
                startEditMode(typEditace) {
                    // pokud je v editaci, nezacineju znovu    
                    if (this.editMode != "Zadny")
                        return;
                    this.editMode = typEditace;
                    this.valueChanged = false;
                    //if (typEditace == "SruktPopis") {
                    //    this.element.findForms("popisDokladu").findFields("popis").gfield("option", "disabled", false);                
                    //}
                    //const grid = this.getDetailGrid();
                    //if (grid == null) return;
                    //grid.ggridcelleditor("start",);
                    this.nastaveniAkci();
                }
                /***
                 * Zruseni rezimu oprav
                 *
                 */
                cancelEditMode() {
                    this.editMode = "Zadny";
                    // nefunguje
                    //this.setZapisRadku(this.zapisyRadu);
                    //this.load(this.options);
                    if (this.valueChanged) {
                        this.element.empty();
                        this.valueChanged = false;
                        this.prepareContent(this.options);
                    }
                    this.nastaveniAkci();
                }
                /**
                 * Ulozeni zmen na zapisu
                 * @returns
                 */
                saveRecord() {
                    let that = this;
                    let dtoPuvodniData = this.options.row;
                    let grid = this.getDetailGrid();
                    let dtoSaveData = $.extend(true, {}, dtoPuvodniData); // kopie, aby se neprepsal original
                    if (grid === null)
                        return $.Deferred().resolve().promise();
                    let dtoSaveDateRow = Gordic.Eko.WebClient.Common.GetAllRows(grid);
                    if (dtoSaveDateRow && dtoSaveDateRow.length > 0) {
                        for (let i = 0; i < dtoSaveDateRow.length; i++) {
                            let row = dtoSaveDateRow[i];
                            if (row.canEdit) {
                                // pokud je radek editovatelny, ulozim hodnoty
                                if (row.colDBName)
                                    dtoSaveData[row.colDBName] = row.val1;
                            }
                        }
                    }
                    if (this.options.typUlohy == 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */) {
                        return this.isl.UcrUcetniZapis.update({ puvodniZapis: dtoPuvodniData, upravenyZapis: dtoSaveData })
                            .get()
                            .then((result) => {
                            that.actioAfterSave(result.result.data, dtoSaveDateRow);
                            return;
                        });
                    }
                    else {
                        return this.isl.UcrRozpoctovyZapis.update({ puvodniZapis: dtoPuvodniData, upravenyZapis: dtoSaveData })
                            .get()
                            .then((result) => {
                            that.actioAfterSave(result.result.data, dtoSaveDateRow);
                            return;
                        });
                    }
                }
                /**
                 * Ulozeni zmen
                 * @returns
                 */
                saveRecordSP() {
                    let that = this;
                    debugger;
                    let dtoPuvodniData = this.options.row;
                    let grid = this.getDetailGrid();
                    if (grid === null)
                        return $.Deferred().resolve().promise();
                    return this.isl.UcrUcetniZapis.ulozPopisDokladu({
                        rq: {
                            ac: dtoPuvodniData.ac,
                            ico: dtoPuvodniData.ico,
                            lic: dtoPuvodniData.lic,
                            mesic: dtoPuvodniData.mesic,
                            rok: dtoPuvodniData.rok,
                            ucs: dtoPuvodniData.ucs,
                            zkrAgendy: this.options.typUlohy == 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */ ? "UCT" : "ROZ",
                            novyPopis: this.element.findForms("popisDokladu").findFields("popis").gfield("getValue")
                        }
                    })
                        .get()
                        .then(() => {
                        that.actioAfterSave(dtoPuvodniData, null);
                        return;
                    });
                }
                /**
                 * Akce po ulozeni zapisu
                 * @param savedRow
                 * @param saveDateRowDto
                 */
                actioAfterSave(savedRow, saveDateRowDto) {
                    // preplneni puvodnich hodnot
                    this.options.row.radek_z = savedRow.radek_z;
                    this.editMode = "Zadny";
                    this.nastaveniAkci();
                    this.valueChanged = false;
                    if (saveDateRowDto != null && saveDateRowDto && saveDateRowDto.length > 0) {
                        // vsechny editovatelne hodnoty preplnim do vstupniho radku, ktery se vraci na seznam zapisu
                        for (let i = 0; i < saveDateRowDto.length; i++) {
                            let row = saveDateRowDto[i];
                            if (row.canEdit) {
                                // pokud je radek editovatelny, ulozim hodnoty
                                if (row.colDBName)
                                    this.options.row[row.colDBName] = savedRow[row.colDBName]; // pokud neni v savedRow, pouziji hodnotu z radku
                            }
                        }
                    }
                    if (saveDateRowDto != null)
                        this.zapisyRadu.stavy = saveDateRowDto;
                    this.element.empty();
                    this.reloadZapisRadku = true;
                    this.prepareContent(this.options);
                }
                /**
                 * Zjistini moznosti editace bunky
                 * @returns
                 */
                isCanEdit(obj) {
                    return this?.editMode && obj.cellInfo.data?.canEdit;
                }
                initGrid() {
                    let that = this;
                    let grid = $("<div style='display: none' class='" + this.classDetailGrid + "'>")
                        .appendTo(this.element)
                        .gtab({
                        title: "jres:31100156", //RC 31100156 : Detail
                        opened: this.tabSettings.detailOpened,
                        open: () => { this.tabSettings.detailOpened = true; this.updateSettings(); },
                        close: () => { this.tabSettings.detailOpened = false; this.updateSettings(); },
                        menuBar: (this.options.typUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */ || this.options.typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */)
                            && this.options.viewMode === "full" &&
                            //this.options.globals?.PovoleniEditaceZapisuDokladu ?                        
                            (this.options.globals?.PovoleniEditacePopisuUCTDokladu && this.options.typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                                || this.options.globals?.PovoleniEditacePopisuROZDokladu && this.options.typUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */) ?
                            this.actions.createBar(["actOpravit*", "actUlozit*", "actZrusit*"])
                            : undefined
                    });
                    if (this.options.viewMode === "full") {
                        let gridFormat = new WebClient.GUcrStavRadkuGridFormat();
                        gridFormat.addTextColumn({ name: "name", width: 80 })
                            .addStavRadkuCol({
                            name: "val1", width: 100,
                            editor: (ed) => {
                                let nameDBCol = ed.cellInfo.data.colDBName;
                                if (ed.cellInfo.data.ekoField) {
                                    let cfuItem = that.options.cfuSetSorted.columns.find((col) => col.name == nameDBCol);
                                    if (cfuItem == null)
                                        return {};
                                    let prefab = Gordic.Eko.Prefabs.cfu({ isRoz: false, isUct: true, cfu: cfuItem });
                                    prefab = $.extend(prefab, {
                                        create: function (ev) {
                                            //Omezeni delky na urcity pocet znaku
                                            Gordic.Eko.Filters.Utils.inputToUpperCaseFunc.apply(this, [ev]);
                                            $(this).find(".gfield-input").attr("maxlength", cfuItem?.maxLength);
                                        },
                                        change: function (ev, o) {
                                            if ($(this).gfield("option", "disabled"))
                                                return;
                                            var value = ($.isPlainObject(o.value) ? o.value.code : o.value);
                                            if (!value)
                                                return;
                                            value = Gordic.Eko.Filters.Utils.paddValue(value, cfuItem?.maxLength);
                                            value = value.toUpperCase();
                                            $(this).gfield("setValue", value);
                                        },
                                        model: "model.val1=value",
                                        strict: false,
                                        tabbable: false,
                                    }, true);
                                    return {
                                        widget: "gselectbox",
                                        options: prefab,
                                    };
                                }
                                else {
                                    return {
                                        widget: "gstringbox",
                                        options: {
                                            name: "val1",
                                            buttons: null,
                                            //itemTemplate: function (obj) { return obj["val1"]; },
                                            length: 150,
                                            //cellTemplate: function (obj) { obj[sloupec.name] },
                                            disabled: false,
                                            //strict:false,
                                            //model: "model.val1 = value.val1",
                                            //verify: function (a) {
                                            //    if (typeof a === "string") {
                                            //        var hodnota = {};
                                            //        hodnota["val1"] = a;
                                            //        return hodnota;
                                            //    }
                                            //    return a;
                                            //},
                                        }
                                    };
                                }
                            }
                            //tooltipTemplate: (dto) => {
                            //    if (!dto.cfu)
                            //        return "";
                            //    debugger;
                            //    return "";
                            //    //return Gordic.Eko.Filters.Utils.formatIntervalTooltip(dto.cfu[cfuDto.name]);
                            //},
                            //editor: {
                            //widget: "gselectbox",
                            //options: Gordic.Eko.Prefabs.cfu({ isRoz: false, isUct: true, cfu: undefined }
                            //),
                            //options: {
                            //    create: function (this: HTMLElement, ev: JQueryEventObject) {
                            //        //Omezeni delky na urcity pocet znaku
                            //        Gordic.Eko.Filters.Utils.inputToUpperCaseFunc.apply(this, [ev]);
                            //        $(this).find(".gfield-input").attr("maxlength", 10/*item.maxLength*/);
                            //    },
                            //    change: function (ev: JQueryEventObject, o) {
                            //        if ($(this).gfield("option", "disabled"))
                            //            return;
                            //        var value = ($.isPlainObject(o.value) ? o.value.code : o.value) as string;
                            //        if (!value)
                            //            return;
                            //        value = Gordic.Eko.Filters.Utils.paddValue(value, 10/*item.maxLength*/);
                            //        value = value.toUpperCase();
                            //        $(this).gfield("setValue", value);
                            //    },
                            //    name: "val1",
                            //    itemTemplate: function (obj) { return obj["val1"]; },                                
                            //    length: 50,                                
                            //    //cellTemplate: function (obj) { obj[sloupec.name] },
                            //    disabled: false,
                            //    //strict:false,
                            //    //model: "model." + sloupec.name + "=value.code",
                            //    model: "model.val1 = value.val1",
                            //    verify: function (a) {
                            //        if (typeof a === "string") {
                            //            var hodnota = {};
                            //            hodnota["val1"] = a;
                            //            return hodnota;
                            //        }
                            //        return a;
                            //    },
                            //    helperCustomizer: function (data) {
                            //        return data;
                            //    },
                            //}
                            //}
                        }, "val1", "val1Type")
                            .addStavRadkuCol({ name: "val2", width: 200 }, "val2", "val2Type")
                            .addBooleanColumn({ name: "canEdit", width: 50, hidden: true });
                        grid.ggrid({
                            data: [],
                            columnMode: "fit",
                            showTopPanel: false,
                            showHeaderRow: false,
                            showBottomPanel: false,
                            defaultProfile: { columnList: gridFormat.columns.map((c) => c.name).join(",") },
                            columns: gridFormat
                        }).ggridcelleditor({
                            //allowCopy: true,
                            beforeStart: function (ev, obj) {
                                // znepristupeni gridu, pokud se nema editovat
                                return that.isCanEdit(obj);
                            },
                            change: function (ev, obj) {
                                that.valueChanged = true;
                                that.nastaveniAkci();
                            },
                        });
                    }
                    else if (this.options.viewMode === "preview") {
                    }
                    else
                        throw new GError("NotSupported");
                }
                initGridDoklad() {
                    var that = this;
                    this.$zapisyTab = $.newDiv();
                    this.$zapisyTab
                        .appendTo(this.element)
                        .gtab({
                        title: (that.options.typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */ ? "jres:30250276" : //RC 30250276 : Řádky účetního dokladu
                            "jres:30250277"), //TODO: JRES (jeste bude upresneno) //RC 30250277 : Řádky rozpočtového dokladu
                        opened: this.tabSettings.souvisejiciOpened,
                        open: function () {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            if (grid.ggrid("getView").getDataRows(false).length === 0)
                                that.loadGridDoklad();
                            that.tabSettings.souvisejiciOpened = true;
                            that.updateSettings();
                        },
                        close: () => { this.tabSettings.souvisejiciOpened = false; this.updateSettings(); }
                    });
                    if (this.tabSettings.souvisejiciOpened)
                        this.loadGridDoklad();
                    //Sloupec s hvezdickou, aby bylo poznat, na kterem radku jsem
                    let gridFormat = new Gordic.Data.GridFormat().add(this.options.gridFormat);
                    let rowStr = JSON.stringify(this.options.row);
                    gridFormat.columns.unshift({
                        name: "fav",
                        caption: "",
                        width: 22,
                        cellTemplate: function (data, meta) {
                            if (JSON.stringify(data) === rowStr)
                                return Gordic.Utils.IconBuilder.defaultInst.createIcon("fa-star");
                            return "";
                        }
                    });
                    $.newDiv(this.classGrid)
                        .appendTo(this.$zapisyTab)
                        .css("height", "100%")
                        .gautofit()
                        .ggrid({
                        columnMode: "full", // fit (defaultne by melo byt toto), full
                        data: [],
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: (ev, ctx) => {
                                //that.showDetail(ctx.cellInfo.data);
                                let options = $.extend({}, this.options);
                                options.row = ctx.cellInfo.data;
                                this.navigate(Gordic.Ucr.WebClient.GDetailStavZapisRadku, options);
                            }
                        }),
                        //searchColumns: ["popis", "ac"], //sloupce, podle kterych se vyhledava v searchboxu                    
                        columns: gridFormat,
                        //cellActivate: function () { console.log("cellActivate", arguments);} //NOTE: Nedostanu se k puvodni udalosti, abych zjistil, zda se drzi ctrl
                    });
                }
                /**
                 * Vraci objekt gridu
                 * @returns
                */
                getGrid() {
                    var data = this.element.find(".ggrid." + this.classGrid);
                    return (data.length == 0 ? null : data);
                }
                /**
                 * Vraci objekt gridu pro detail
                 */
                getDetailGrid() {
                    let data = this.element.find(".ggrid." + this.classDetailGrid);
                    return (data.length == 0 ? null : data);
                }
                initPopis() {
                    this.$popisTab = $.newDiv()
                        .appendTo(this.element)
                        .gtab({
                        title: "jres:31100214", //RC 31100214 : Popis
                        opened: this.tabSettings.popisOpened,
                        customLoad: function (ev) { return false; },
                        open: () => { this.tabSettings.popisOpened = true; this.updateSettings(); },
                        close: () => {
                            if (!this.$popisTab.hasClass("js-is-contentclosing"))
                                this.tabSettings.popisOpened = false;
                            this.updateSettings();
                        },
                        menuBar: (this.options.typUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */ || this.options.typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */)
                            && this.options.viewMode === "full" &&
                            //this.options.globals?.PovoleniEditaceZapisuDokladu ?                        
                            (this.options.globals?.PovoleniEditacePopisuUCTDokladu && this.options.typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                                || this.options.globals?.PovoleniEditacePopisuROZDokladu && this.options.typUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */) ?
                            //this.actions.createBar(["actOpravit*", "actUlozit*", "actZrusit*"])
                            //: undefined
                            //(this.options.typUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis || this.options.typUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis)
                            //&& this.options.viewMode === "full" && this.options.globals?.PovoleniEditaceZapisuDokladu ?
                            this.actions.createBar(["actOpravitSP*", "actUlozitSP*", "actZrusitSP*"])
                            : undefined
                    });
                    this.$popisTab.on("contentclose", (ev) => { this.$popisTab.addClass("js-is-contentclosing"); });
                    //NOTE (BM): U gtabu nelze jednoznace poznat, jestli jej zavrel uzivatel kliknutim na zahlavi nebo se zacal zavirat
                    //           v souvislosti s odsraneni s DOM. Proto byla pridana vypomoc pres classu 'js-is-contentclosing'.
                }
                createPopis(popis) {
                    this.$popisTab.empty().gcontent(Gordic.Ucr.WebClient.GPopisRadkuControl);
                    $.content(this.$popisTab).init({ popis: popis });
                    if (this.$popisTab.hasClass("gtab"))
                        this.$popisTab.gtab("loadComplete");
                }
                setStavRadku(dto) {
                    this.findFields().gfield("model", "apply", dto);
                    if (this.options.viewMode === "full") {
                        let view = new Gordic.Data.View(dto.stavy || []);
                        let grid = this.getDetailGrid();
                        if (grid == null)
                            return;
                        grid.ggrid("setData", view);
                    }
                    else if (this.options.viewMode === "preview") {
                        let grid = this.getDetailGrid();
                        if (grid == null)
                            return;
                        grid.gform("createFrom", this.createPreviewForm(dto.stavy || []));
                    }
                    else
                        throw new GError("NotSupported");
                }
                setZapisRadku(dto) {
                    this.findFields().gfield("model", "apply", dto);
                    if (this.options.viewMode === "full") {
                        let view = new Gordic.Data.View(dto.stavy || [], { key: "name" });
                        let grid = this.getDetailGrid();
                        if (grid == null)
                            return;
                        grid.ggrid("setData", view);
                        grid.ggrid("refresh");
                    }
                    else if (this.options.viewMode === "preview") {
                        let grid = this.getDetailGrid();
                        if (grid == null)
                            return;
                        grid.gform("createFrom", this.createPreviewForm(dto.stavy || []));
                    }
                }
                createPreviewForm(stavy) {
                    let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-3-9-0, M-3-9-0, S-12-12-0, breaks-300-500" });
                    stavy = stavy || [];
                    for (var i = 0; i < stavy.length; i++) {
                        let s = stavy[i];
                        if (!s.val1)
                            continue;
                        let formattedVal = `${s.val1}`;
                        if (s.val2)
                            formattedVal += `-${s.val2}`;
                        form.addRow(s.name).addText(formattedVal, "bold");
                    }
                    return form;
                }
                updateSettings() {
                    if (this.options.tabSettings) //V pripade setnuti settings z venku by se nemelo nastaveni ukladat - pouzivam v preview na GSeznamEkoZaznamu pro otevreni kl. zkratkou '/'
                        return;
                    this.userSettings.set("tabSettings", this.tabSettings);
                }
                loadGridDoklad() {
                    let that = this;
                    if (this.options.typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                        || this.options.typUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                        || this.options.typUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */) {
                        this.beginOperation();
                        const srv = this.srv();
                        //debugger;
                        //let nactiPopis = typeof this.options.gridFormat.columns.find((item) => item.name == "pdok" && !item.hidden) !== "undefined";
                        srv.call("GetData", {
                            f: {
                                filter: this.options.filter, elementy: null, filterStrPopis: null, skipSumLimit: false
                                //, popisDokladu: nactiPopis
                            }
                        })
                            .then((d) => {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            grid.ggrid("setData", new Gordic.Data.View(d.SeznamZapisu), true);
                            return;
                        })
                            .catch((myError) => {
                            if (myError instanceof GServerError && myError.data && myError.data.sumLimit) {
                                myError.handled = true;
                                that.dialogs.alert("Info", "Velké množství zápisů {0}. Nebudou nahrány.".format(myError.data.sumLimit));
                            }
                            debugger;
                        })
                            .always(() => {
                            srv.close();
                            this.endOperation();
                        });
                    }
                }
                closing() {
                    if (this.reloadZapisRadku) {
                        // pokud jsem zmenil zapis radku, tak je potreba ho znovu nactit
                        return $.Deferred().resolve({ result: this.options.row }).promise();
                    }
                    return $.Deferred().resolve().promise();
                }
            };
            GDetailStavZapisRadku = __decorate([
                Decorators.gcontent
            ], GDetailStavZapisRadku);
            WebClient.GDetailStavZapisRadku = GDetailStavZapisRadku;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFN0YXZaYXBpc1JhZGt1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbFN0YXZaYXBpc1JhZGt1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0EwNkJmO0FBMTZCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EwNkJuQjtJQTE2QmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTA2QjdCO1FBMTZCb0IsV0FBQSxTQUFTO1lBeUIxQixJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLE9BQUEsWUFBWTtnQkFBdkQ7O29CQUNJLFFBQUcsR0FBRyx3QkFBd0IsQ0FBQztvQkFJL0IsOEJBQThCO29CQUM5Qjs7dUJBRUc7b0JBQ08sY0FBUyxHQUFXLGNBQWMsQ0FBQztvQkFDN0M7O3VCQUVHO29CQUNPLG9CQUFlLEdBQVcsZ0JBQWdCLENBQUM7b0JBVXJELDRCQUE0QjtvQkFFcEIsYUFBUSxHQUFhLE9BQU8sQ0FBQztvQkFDckMsb0RBQW9EO29CQUM3QyxpQkFBWSxHQUFHLEtBQUssQ0FBQztvQkFFcEIscUJBQWdCLEdBQVksS0FBSyxDQUFDO2dCQW0zQjlDLENBQUM7Z0JBbDNCRyxjQUFjLENBQUMsT0FBc0M7b0JBQ2pELElBQUksQ0FBQyxPQUFPO3dCQUNSLE9BQU87b0JBRVgsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztnQkFDRDs7O21CQUdHO2dCQUNILElBQUksQ0FBQyxPQUFzQztvQkFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBQ3ZCLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLFVBQXNCLENBQUM7b0JBQzNCLElBQUksYUFBNEIsQ0FBQztvQkFFakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxDQUFDO29CQUVoTCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE1BQU07d0JBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQ0FDYixNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUM7b0NBQ2hCLElBQUksRUFBRSxVQUFVO29DQUNoQixPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjtvQ0FDaEQsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztpQ0FDdEMsQ0FBQzs2QkFDTCxDQUFDLENBQUMsQ0FBQztvQkFFSixRQUFRLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDdkI7NEJBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsQ0FBQywyQ0FBMkM7NEJBQ3pFLGFBQWEsR0FBRyxjQUFjLENBQUM7NEJBQy9CLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDOzRCQUNoQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs0QkFDbEMsTUFBTTt3QkFDVjs0QkFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxDQUFDLDRDQUE0Qzs0QkFDMUUsYUFBYSxHQUFHLGVBQWUsQ0FBQzs0QkFDaEMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7NEJBQ2pDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDOzRCQUNuQyxNQUFNO3dCQUNWOzRCQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDLENBQUMsd0VBQXdFOzRCQUN0RyxhQUFhLEdBQUcsZUFBZSxDQUFDOzRCQUNoQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQzs0QkFDakMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7NEJBQ25DLE1BQU07d0JBQ1Y7NEJBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsQ0FBQywrQ0FBK0M7NEJBQzdFLGFBQWEsR0FBRyxjQUFjLENBQUM7NEJBQy9CLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDOzRCQUNoQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs0QkFDbEMsTUFBTTt3QkFDVjs0QkFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxDQUFDLHlDQUF5Qzs0QkFDdkUsYUFBYSxHQUFHLGVBQWUsQ0FBQzs0QkFDaEMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7NEJBQ2pDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDOzRCQUNuQyxNQUFLO3dCQUNULGtGQUEwRTt3QkFDMUU7NEJBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsQ0FBQyx3Q0FBd0M7NEJBQ3RFLGFBQWEsR0FBRyxlQUFlLENBQUM7NEJBQ2hDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDOzRCQUNqQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQzs0QkFDbkMsTUFBTTt3QkFDVjs0QkFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxDQUFDLGdEQUFnRDs0QkFDOUUsYUFBYSxHQUFHLGVBQWUsQ0FBQzs0QkFDaEMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7NEJBQ2pDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDOzRCQUNuQyxNQUFNO3dCQUNWLDhFQUFxRTt3QkFDckU7NEJBQ0ksSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDOzRCQUNkLElBQUksT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQ0FDbkQsSUFBSSxHQUFHLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWlCLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDOzRCQUNsRixDQUFDOzRCQUNELElBQUksT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQ0FDbkQsSUFBSSxJQUFJLElBQUUsRUFBRTtvQ0FDUixJQUFJLEdBQUcsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBaUIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7O29DQUU5RSxJQUFJLElBQUksSUFBSSxHQUFHLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWlCLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDOzRCQUM5RixDQUFDOzRCQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHVDQUF1Qzs0QkFDbEYsYUFBYSxHQUFHLGVBQWUsQ0FBQzs0QkFDaEMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7NEJBQ2pDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDOzRCQUNuQyxNQUFNO3dCQUNWOzRCQUNJLE1BQU0sSUFBSSxNQUFNLENBQUMsK0JBQStCLENBQUMsQ0FBQztvQkFDMUQsQ0FBQztvQkFHRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLHNFQUE4RCxJQUFJLE9BQU8sQ0FBQyxRQUFRLHdFQUFnRSxFQUFFLENBQUM7d0JBQ3JLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFLENBQUM7NEJBQ25DLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsK0JBQStCLElBQUksT0FBTyxDQUFDLFFBQVEsd0VBQWdFO21DQUN0SSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSwrQkFBK0IsSUFBSSxPQUFPLENBQUMsUUFBUSxzRUFBOEQsRUFDN0ksaUdBQWlHO2dDQUM5RiwrRkFBK0Y7Z0NBQy9GLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO29DQUNsQixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUM7b0NBQ3RILFVBQVUsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQ0FDakgsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7b0NBQzFHLFdBQVcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQ0FDMUgsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQzt3Q0FDMUMsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7NENBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7d0NBQ3JDLENBQUM7cUNBQ0osQ0FBQztvQ0FDRixXQUFXLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztpQ0FFL0csQ0FDQSxDQUFDO3dCQUVWLENBQUM7b0JBQ0wsQ0FBQztvQkFDRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssU0FBUzt3QkFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUUvQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUV2QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBRWhCLElBQUksT0FBTyxDQUFDLFFBQVEsd0VBQWdFOzJCQUM3RSxPQUFPLENBQUMsUUFBUSxzRUFBOEQ7MkJBQzlFLE9BQU8sQ0FBQyxRQUFRLGlGQUF5RTsyQkFDekYsT0FBTyxDQUFDLFFBQVEseUVBQWlFOzJCQUNqRixPQUFPLENBQUMsUUFBUSw0RUFBb0U7MkJBQ3BGLE9BQU8sQ0FBQyxRQUFRLGlGQUF3RTt3QkFHM0YsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUVyQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE1BQU07MkJBQzdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLHdFQUFnRTsrQkFDdEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLHNFQUE4RDsrQkFDL0UsT0FBTyxDQUFDLFFBQVEsaUZBQXlFOytCQUM3RixPQUFPLENBQUMsUUFBUSx5RUFBaUU7K0JBQ2pGLE9BQU8sQ0FBQyxRQUFRLDRFQUFvRTsrQkFDcEYsT0FBTyxDQUFDLFFBQVEsaUZBQXdFLENBRTFGO3dCQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFFMUIsOEZBQThGO29CQUM5RiwyQ0FBMkM7b0JBQzNDLGFBQWE7b0JBQ2IsR0FBRztvQkFDSCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3RCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDdkIsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLENBQUM7eUJBQ3BGLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUNSLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixJQUFJLGFBQWEsS0FBSyxlQUFlLEVBQUUsQ0FBQzs0QkFDcEMsK0RBQStEOzRCQUMvRCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzt3QkFDeEIsQ0FBQzt3QkFDRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLHdFQUFnRTsrQkFDN0UsT0FBTyxDQUFDLFFBQVEsc0VBQThEOytCQUM5RSxPQUFPLENBQUMsUUFBUSxpRkFBeUU7K0JBQ3pGLE9BQU8sQ0FBQyxRQUFRLHlFQUFpRTsrQkFDakYsT0FBTyxDQUFDLFFBQVEsNEVBQW9FOytCQUNwRixPQUFPLENBQUMsUUFBUSxpRkFBd0U7NEJBSTNGLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUM5QixPQUFPO29CQUNYLENBQUMsQ0FBQzt5QkFDRCxNQUFNLENBQUMsR0FBRyxFQUFFO3dCQUNULEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3JDLENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7Z0JBRUQsMkVBQTJFO2dCQUMzRSxzQkFBc0I7Z0JBQ3RCLHlCQUF5QjtnQkFDekIsMkVBQTJFO2dCQUMzRSxvQ0FBb0M7Z0JBQ3BDLHdDQUF3QztnQkFDeEMsNEJBQTRCO2dCQUM1QixtQ0FBbUM7Z0JBRW5DLG1CQUFtQjtnQkFDbkIsbUJBQW1CO2dCQUNuQiwwREFBMEQ7Z0JBQzFELG9CQUFvQjtnQkFDcEIsT0FBTztnQkFDUCxHQUFHO2dCQUNLLEdBQUc7b0JBQ1AsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyx3Q0FBd0MsRUFBRSxFQUFFLFlBQVksRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN4SSxDQUFDO2dCQUVPLGNBQWMsQ0FBQyxJQUFrQztvQkFDckQsSUFBSSxJQUFJLEtBQUssTUFBTTt3QkFDZixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsd0RBQXdELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDO3lCQUN2RyxJQUFJLElBQUksS0FBSyxTQUFTO3dCQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUcscURBQXFELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDOzt3QkFFdEcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDekMsQ0FBQztnQkFFTyxhQUFhO29CQUNqQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNwRSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNuRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsNkJBQTZCLENBQUM7eUJBQ3ZDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN0QixLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDM0QsbURBQW1EO3lCQUNsRCxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQzt5QkFDMUIsUUFBUSxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FBQyw0QkFBNEI7eUJBQ3RFLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFDdkM7d0JBQ0ksSUFBSSxFQUFFLEtBQUs7d0JBQ1gsS0FBSyxFQUFFLHFCQUFxQjt3QkFDNUIsUUFBUSxFQUFFLElBQUk7d0JBQ2QsV0FBVyxFQUFFLFdBQVc7cUJBQzNCLENBQUM7eUJBQ0wsUUFBUSxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUMsc0JBQXNCO3FCQUMvRCxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLENBQUM7eUJBQzlFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDbkIsNkNBQTZDO29CQUN6Qyw4REFBOEQ7b0JBQzlELCtEQUErRDtvQkFDL0QsNkJBQTZCO29CQUM3Qiw4REFBOEQ7b0JBQzlELDJEQUEyRDtvQkFDM0QseURBQXlEO29CQUM3RCxZQUFZO29CQUVoQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRSxDQUFDO3dCQUN0QyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDRixLQUFLLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjs0QkFDOUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWTs0QkFDckMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQzVFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNqRixDQUFDLENBQUM7d0JBRVAsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEMsQ0FBQztnQkFDTCxDQUFDO2dCQUVPLGNBQWM7b0JBQ2xCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ25FLElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO29CQUMxQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxzRUFBOEQ7d0JBQ25GLGdCQUFnQixHQUFHLGVBQWUsQ0FBQyxDQUFDLCtCQUErQjt5QkFDbEUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsd0VBQWdFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLGlGQUF3RTt3QkFDM0wsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLENBQUMseUJBQXlCO3lCQUM1RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSx5RUFBaUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsNEVBQW9FO3dCQUN4TCxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsQ0FBQywrQkFBK0I7eUJBQ2xFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLHlFQUFnRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSw2RUFBb0U7d0JBQ3ZMLGdCQUFnQixHQUFHLGVBQWUsQ0FBQyxDQUFDLGlDQUFpQzs7d0JBR3JFLE1BQU0sSUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztvQkFFekMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDcEUsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkcsSUFBSSxXQUFXLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztvQkFDdEMsSUFBSSxlQUFlLEdBQUcsYUFBYyxDQUFDLE1BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUE0QixDQUFDO29CQUM3RSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsNkJBQTZCLENBQUM7eUJBQ3ZDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN0QixLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzt5QkFDMUQsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7eUJBQzFCLFFBQVEsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQzt5QkFDakUsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7eUJBQzFCLFFBQVEsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUMsa0NBQWtDO3lCQUM1RSxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQ3ZDO3dCQUNJLElBQUksRUFBRSxLQUFLO3dCQUNYLEtBQUssRUFBRSxxQkFBcUI7d0JBQzVCLFFBQVEsRUFBRSxJQUFJO3dCQUNkLFdBQVcsRUFBRSxXQUFXO3FCQUMzQixDQUFDO3lCQUNMLFFBQVEsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLDZCQUE2Qjt5QkFDNUksUUFBUSxDQUFDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLENBQUM7eUJBQ3hILFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO3lCQUMxQixRQUFRLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxzQkFBc0I7eUJBQ3hJLFFBQVEsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUMsMkJBQTJCO3lCQUNyRSxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQ3ZDO3dCQUNJLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSw2QkFBNkI7d0JBQ3BDLFFBQVEsRUFBRSxJQUFJO3dCQUNkLFdBQVcsRUFBRSxXQUFXO3FCQUMzQixDQUFDO3lCQUNMLFFBQVEsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLDhCQUE4Qjt5QkFDckosS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUV2QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRSxDQUFDO3dCQUV0QyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDbkMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDRixLQUFLLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjs0QkFDOUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWTs0QkFDckMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQzVFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNqRixDQUFDLENBQUM7b0JBQ1gsQ0FBQztvQkFFRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsd0VBQWdFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLGlGQUF3RSxDQUFDOzJCQUNqTCxPQUFPLElBQUksT0FBTyxLQUFLLGNBQWMsRUFBRSxDQUFDLENBQUMsNENBQTRDO3dCQUM1RixJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUNUO2dDQUNJLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQztvQ0FDaEIsSUFBSSxFQUFFLGNBQWM7b0NBQ3BCLElBQUksRUFBRSxXQUFXO29DQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFFLDBCQUEwQjtvQ0FDcEQsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO3dDQUNiLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUU7NENBQ2xDLE1BQU0sRUFBRSxPQUFROzRDQUNoQixJQUFJLEVBQUUsQ0FBQzs0Q0FDUCxRQUFRLEVBQUU7Z0RBQ04sR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUk7Z0RBQzFCLFNBQVMsRUFBRSxFQUFFO2dEQUNiLFlBQVksRUFBRSxFQUFFO2dEQUNoQixlQUFlLEVBQUUsRUFBRTs2Q0FDdEI7eUNBQ0osQ0FBQyxDQUFDO29DQUNQLENBQUM7aUNBQ0osQ0FBQztnQ0FDRixRQUFRLEVBQUUsSUFBSTs2QkFDakI7eUJBQ0osQ0FBQyxDQUFDO29CQUNQLENBQUM7Z0JBQ0wsQ0FBQztnQkFDRDs7bUJBRUc7Z0JBQ0ksYUFBYTtvQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO29CQUMzRixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUN2RSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsS0FBSyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7b0JBQ25HLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRSxDQUFDLENBQUM7b0JBQzlFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxLQUFLLFlBQVksQ0FBQyxDQUFDO29CQUN4SCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ2xDLElBQUksSUFBSSxJQUFJLElBQUk7d0JBQUUsT0FBTztvQkFDekIsSUFBSSxVQUFVLEdBQWdFLFNBQVMsQ0FBQztvQkFDeEYsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRSxDQUFDO3dCQUM1Qix3QkFBd0I7d0JBQ3hCLFVBQVUsR0FBRzs0QkFDVDtnQ0FDSSxXQUFXLEVBQUUsZUFBZSxFQUFFLG9DQUFvQztnQ0FDbEUsb0JBQW9CLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJOzZCQUMxRzs0QkFDRDtnQ0FDSSxXQUFXLEVBQUUsZUFBZSxFQUFFLG9DQUFvQztnQ0FDbEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUk7NkJBQy9GO3lCQUVKLENBQUM7b0JBQ04sQ0FBQztvQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFtQixZQUFZLEVBQ3JDO3dCQUNJLFdBQVcsRUFBRSxVQUFVO3FCQUMxQixDQUFDLENBQUM7Z0JBRVgsQ0FBQztnQkFDRDs7O21CQUdHO2dCQUNLLGFBQWEsQ0FBQyxVQUFvQjtvQkFDdEMsMkNBQTJDO29CQUMzQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksT0FBTzt3QkFBRSxPQUFPO29CQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7b0JBQzFCLG1DQUFtQztvQkFDbkMscUhBQXFIO29CQUNySCxHQUFHO29CQUNILG9DQUFvQztvQkFDcEMsMkJBQTJCO29CQUMzQixpQ0FBaUM7b0JBQ2pDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDekIsQ0FBQztnQkFDRDs7O21CQUdHO2dCQUNLLGNBQWM7b0JBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO29CQUN4QixZQUFZO29CQUNaLHNDQUFzQztvQkFDdEMsMEJBQTBCO29CQUMxQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7d0JBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN0QyxDQUFDO29CQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFekIsQ0FBQztnQkFDRDs7O21CQUdHO2dCQUNLLFVBQVU7b0JBQ2QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztvQkFDdEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNoQyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxtQ0FBbUM7b0JBQ3ZGLElBQUksSUFBSSxLQUFLLElBQUk7d0JBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzNELElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQW9CLElBQUksQ0FBQyxDQUFDO29CQUNyRixJQUFJLGNBQWMsSUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUM5QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzRCQUM3QyxJQUFJLEdBQUcsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzVCLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dDQUNkLDhDQUE4QztnQ0FDOUMsSUFBSSxHQUFHLENBQUMsU0FBUztvQ0FDYixXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7NEJBQzlDLENBQUM7d0JBQ0wsQ0FBQztvQkFFTCxDQUFDO29CQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLHVFQUErRCxFQUFFLENBQUM7d0JBQ3ZGLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLENBQUM7NkJBQzlGLEdBQUcsRUFBRTs2QkFDTCxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTs0QkFDYixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDOzRCQUN4RCxPQUFPO3dCQUNYLENBQUMsQ0FBQyxDQUNEO29CQUNULENBQUM7eUJBQU0sQ0FBQzt3QkFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLENBQUM7NkJBQ2xHLEdBQUcsRUFBRTs2QkFDTCxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTs0QkFDYixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDOzRCQUN4RCxPQUFPO3dCQUNYLENBQUMsQ0FBQyxDQUNEO29CQUVULENBQUM7Z0JBRUwsQ0FBQztnQkFDRDs7O21CQUdHO2dCQUNLLFlBQVk7b0JBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsUUFBUSxDQUFDO29CQUNULElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO29CQUN0QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ2hDLElBQUksSUFBSSxLQUFLLElBQUk7d0JBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzNELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUM7d0JBQzVDLEVBQUUsRUFBRTs0QkFDQSxFQUFFLEVBQUUsY0FBYyxDQUFDLEVBQUU7NEJBQ25CLEdBQUcsRUFBRSxjQUFjLENBQUMsR0FBRzs0QkFDdkIsR0FBRyxFQUFFLGNBQWMsQ0FBQyxHQUFHOzRCQUN2QixLQUFLLEVBQUUsY0FBYyxDQUFDLEtBQUs7NEJBQzNCLEdBQUcsRUFBRSxjQUFjLENBQUMsR0FBRzs0QkFDdkIsR0FBRyxFQUFFLGNBQWMsQ0FBQyxHQUFHOzRCQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLHVFQUErRCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUs7NEJBQ2pILFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzt5QkFDM0Y7cUJBQ0osQ0FBQzt5QkFDRyxHQUFHLEVBQUU7eUJBQ0wsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFDUCxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDMUMsT0FBTztvQkFDWCxDQUFDLENBQUMsQ0FDRDtnQkFFVCxDQUFDO2dCQUNEOzs7O21CQUlHO2dCQUNLLGNBQWMsQ0FBQyxRQUF1RCxFQUFFLGNBQXVDO29CQUNuSCw2QkFBNkI7b0JBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO29CQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztvQkFDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztvQkFDMUIsSUFBSSxjQUFjLElBQUUsSUFBSSxJQUFJLGNBQWMsSUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUN0RSw0RkFBNEY7d0JBQzVGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7NEJBQzdDLElBQUksR0FBRyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDNUIsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Z0NBQ2QsOENBQThDO2dDQUM5QyxJQUFJLEdBQUcsQ0FBQyxTQUFTO29DQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsaURBQWlEOzRCQUNwSCxDQUFDO3dCQUNMLENBQUM7b0JBRUwsQ0FBQztvQkFDRCxJQUFJLGNBQWMsSUFBRSxJQUFJO3dCQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7b0JBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7b0JBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0ssU0FBUyxDQUFDLEdBQTBDO29CQUN4RCxPQUFPLElBQUksRUFBRSxRQUFTLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBUSxDQUFDO2dCQUMxRCxDQUFDO2dCQUNPLFFBQVE7b0JBQ1osSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsb0NBQW9DLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRSxJQUFJLENBQUM7eUJBQzFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN0QixJQUFJLENBQUM7d0JBQ0YsS0FBSyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7d0JBQzlDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVk7d0JBQ3JDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUM1RSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDOUUsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLHNFQUE4RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSx3RUFBZ0UsQ0FBQzsrQkFDaEwsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssTUFBTTs0QkFDdkMsOEVBQThFOzRCQUMxRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLCtCQUErQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSx3RUFBZ0U7bUNBQzVJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLCtCQUErQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxzRUFBOEQsQ0FBQyxDQUFBLENBQUM7NEJBQ2pKLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQzs0QkFDbkUsQ0FBQyxDQUFDLFNBQVM7cUJBQ2xCLENBQUMsQ0FBQztvQkFFUCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRSxDQUFDO3dCQUVuQyxJQUFJLFVBQVUsR0FBRyxJQUFJLFVBQUEsdUJBQXVCLEVBQUUsQ0FBQzt3QkFFL0MsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDOzZCQUNoRCxlQUFlLENBQUM7NEJBQ2IsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRzs0QkFDeEIsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7Z0NBQ1gsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dDQUMzQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29DQUM1QixJQUFJLE9BQU8sR0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDO29DQUNwRixJQUFJLE9BQU8sSUFBSSxJQUFJO3dDQUFFLE9BQU8sRUFBRSxDQUFDO29DQUMvQixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7b0NBQ2pGLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTt3Q0FDdEIsTUFBTSxFQUFFLFVBQTZCLEVBQXFCOzRDQUN0RCxxQ0FBcUM7NENBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs0Q0FDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFVLENBQUMsQ0FBQzt3Q0FDekUsQ0FBQzt3Q0FDRCxNQUFNLEVBQUUsVUFBVSxFQUFxQixFQUFFLENBQUM7NENBQ3RDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDO2dEQUNwQyxPQUFPOzRDQUNYLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFXLENBQUM7NENBQzFFLElBQUksQ0FBQyxLQUFLO2dEQUNOLE9BQU87NENBRVgsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFVLENBQUMsQ0FBQzs0Q0FDdkUsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQzs0Q0FDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7d0NBQ3RDLENBQUM7d0NBQ0QsS0FBSyxFQUFFLGtCQUFrQjt3Q0FDekIsTUFBTSxFQUFFLEtBQUs7d0NBQ2IsUUFBUSxFQUFFLEtBQUs7cUNBRWxCLEVBQUUsSUFBSSxDQUFDLENBQUM7b0NBQ1QsT0FBTzt3Q0FDSCxNQUFNLEVBQUUsWUFBWTt3Q0FDcEIsT0FBTyxFQUFFLE1BQU07cUNBRWxCLENBQUM7Z0NBQ04sQ0FBQztxQ0FBTSxDQUFDO29DQUNKLE9BQU87d0NBQ0gsTUFBTSxFQUFFLFlBQVk7d0NBQ3BCLE9BQU8sRUFBRTs0Q0FDTCxJQUFJLEVBQUUsTUFBTTs0Q0FDWixPQUFPLEVBQUUsSUFBSTs0Q0FDVCx1REFBdUQ7NENBQ3ZELE1BQU0sRUFBRSxHQUFHOzRDQUNYLHFEQUFxRDs0Q0FDckQsUUFBUSxFQUFFLEtBQUs7NENBQ2YsZUFBZTs0Q0FDZixtQ0FBbUM7NENBQ25DLHdCQUF3Qjs0Q0FDeEIsa0NBQWtDOzRDQUNsQywyQkFBMkI7NENBQzNCLDhCQUE4Qjs0Q0FDOUIseUJBQXlCOzRDQUN6QixPQUFPOzRDQUNQLGVBQWU7NENBQ2YsSUFBSTt5Q0FFWDtxQ0FDSixDQUFBO2dDQUNMLENBQUM7NEJBQ0wsQ0FBQzs0QkFDRCw2QkFBNkI7NEJBQzdCLG1CQUFtQjs0QkFDbkIsb0JBQW9COzRCQUNwQixlQUFlOzRCQUNmLGdCQUFnQjs0QkFDaEIsb0ZBQW9GOzRCQUNwRixJQUFJOzRCQUVKLFdBQVc7NEJBQ1AsdUJBQXVCOzRCQUN2QiwrRUFBK0U7NEJBQy9FLElBQUk7NEJBQ0osWUFBWTs0QkFDWixtRUFBbUU7NEJBQ25FLCtDQUErQzs0QkFDL0MsMEVBQTBFOzRCQUMxRSxnRkFBZ0Y7NEJBQ2hGLFFBQVE7NEJBQ1IsbURBQW1EOzRCQUNuRCxtREFBbUQ7NEJBQ25ELHFCQUFxQjs0QkFDckIsb0ZBQW9GOzRCQUNwRixxQkFBcUI7NEJBQ3JCLHFCQUFxQjs0QkFFckIsa0ZBQWtGOzRCQUNsRixzQ0FBc0M7NEJBQ3RDLDRDQUE0Qzs0QkFDNUMsUUFBUTs0QkFDUixtQkFBbUI7NEJBQ25CLDJGQUEyRjs0QkFDM0YsaURBQWlEOzRCQUNqRCwyREFBMkQ7NEJBQzNELHNCQUFzQjs0QkFDdEIscUJBQXFCOzRCQUNyQix1REFBdUQ7NEJBQ3ZELHVDQUF1Qzs0QkFDdkMsNEJBQTRCOzRCQUM1QixzQ0FBc0M7NEJBQ3RDLCtCQUErQjs0QkFDL0Isa0NBQWtDOzRCQUNsQyw2QkFBNkI7NEJBQzdCLFdBQVc7NEJBQ1gsbUJBQW1COzRCQUNuQixRQUFROzRCQUNSLHlDQUF5Qzs0QkFDekMsc0JBQXNCOzRCQUN0QixRQUFROzRCQUNSLEdBQUc7NEJBQ1AsR0FBRzt5QkFDTixFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUM7NkJBQ3JCLGVBQWUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUM7NkJBQ2pFLGdCQUFnQixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFtQjs0QkFDckIsSUFBSSxFQUFFLEVBQUU7NEJBQ1IsVUFBVSxFQUFFLEtBQUs7NEJBQ2pCLFlBQVksRUFBRSxLQUFLOzRCQUNuQixhQUFhLEVBQUUsS0FBSzs0QkFDeEIsZUFBZSxFQUFFLEtBQUs7NEJBQ3RCLGNBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTs0QkFDM0UsT0FBTyxFQUFFLFVBQVU7eUJBQzFCLENBQUMsQ0FBQyxlQUFlLENBQUM7NEJBQ2Ysa0JBQWtCOzRCQUNsQixXQUFXLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDMUIsOENBQThDO2dDQUM5QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQy9CLENBQUM7NEJBQ0QsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dDQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBQ3pCLENBQUM7eUJBQ0osQ0FBQyxDQUNHO29CQUNULENBQUM7eUJBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUUsQ0FBQztvQkFFL0MsQ0FBQzs7d0JBRUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDekMsQ0FBQztnQkFFTyxjQUFjO29CQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUM3QixJQUFJLENBQUMsVUFBVTt5QkFDVixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDdEIsSUFBSSxDQUFDO3dCQUNGLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSx3RUFBZ0UsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxzQ0FBc0M7NEJBQ3BKLGVBQWUsQ0FBQyxFQUFFLDhFQUE4RTt3QkFDcEcsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCO3dCQUMxQyxJQUFJLEVBQUU7NEJBQ0YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUMxQixJQUFJLElBQUksSUFBSSxJQUFJO2dDQUFFLE9BQU87NEJBQ3pCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7Z0NBQ3JELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs0QkFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7NEJBQzFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDMUIsQ0FBQzt3QkFDRCxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUN0RixDQUFDLENBQUM7b0JBRVAsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQjt3QkFDbEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUMxQiw2REFBNkQ7b0JBQzdELElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDM0UsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUU5QyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzt3QkFDdkIsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsT0FBTyxFQUFFLEVBQUU7d0JBQ1gsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsWUFBWSxFQUFFLFVBQVUsSUFBSSxFQUFFLElBQUk7NEJBQzlCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxNQUFNO2dDQUMvQixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ3RFLE9BQU8sRUFBRSxDQUFDO3dCQUNkLENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUVILENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzt5QkFDbkIsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7eUJBQ3pCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO3lCQUNyQixRQUFRLEVBQUU7eUJBQ1YsS0FBSyxDQUFDO3dCQUNILFVBQVUsRUFBRSxNQUFNLEVBQU0seUNBQXlDO3dCQUNqRSxJQUFJLEVBQUUsRUFBRTt3QkFDUixhQUFhLEVBQUUsSUFBSSxPQUFPLENBQUM7NEJBQ3ZCLElBQUksRUFBRSxvQkFBb0I7NEJBQzFCLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQ0FDYixxQ0FBcUM7Z0NBQ3JDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQ0FDekMsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQ0FDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUMsQ0FBQzs0QkFDdkUsQ0FBQzt5QkFDSixDQUFDO3dCQUNGLHdHQUF3Rzt3QkFDeEcsT0FBTyxFQUFFLFVBQVU7d0JBQ25CLCtJQUErSTtxQkFDbEosQ0FBQyxDQUFDO2dCQUNYLENBQUM7Z0JBRUQ7OztrQkFHRTtnQkFDUSxPQUFPO29CQUNiLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3pELE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUMsQ0FBQztnQkFDRDs7bUJBRUc7Z0JBQ08sYUFBYTtvQkFDbkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDL0QsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QyxDQUFDO2dCQUNPLFNBQVM7b0JBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFO3lCQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDdEIsSUFBSSxDQUFDO3dCQUNGLEtBQUssRUFBRSxlQUFlLEVBQUUscUJBQXFCO3dCQUM3QyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXO3dCQUNwQyxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUMzQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDM0UsS0FBSyxFQUFFLEdBQUcsRUFBRTs0QkFDUixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUM7Z0NBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzs0QkFBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQ3JFLENBQUM7d0JBQ0QsT0FBTyxFQUNILENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLHNFQUE4RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSx3RUFBZ0UsQ0FBQzsrQkFDL0ssSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssTUFBTTs0QkFDbkMsOEVBQThFOzRCQUM5RSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLCtCQUErQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSx3RUFBZ0U7bUNBQ3hJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLCtCQUErQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxzRUFBOEQsQ0FBQyxDQUFDLENBQUM7NEJBQ3RKLHFFQUFxRTs0QkFDckUsYUFBYTs0QkFDVCxnTEFBZ0w7NEJBQ2hMLDZGQUE2Rjs0QkFDN0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxlQUFlLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDOzRCQUN6RSxDQUFDLENBQUMsU0FBUztxQkFDbEIsQ0FBQyxDQUFDO29CQUVQLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVoRyxtSEFBbUg7b0JBQ25ILDRHQUE0RztnQkFDaEgsQ0FBQztnQkFFTyxXQUFXLENBQUMsS0FBdUI7b0JBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7b0JBQ3pFLENBQUMsQ0FBQyxPQUFPLENBQTBDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDMUYsSUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7d0JBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzVFLENBQUM7Z0JBRU8sWUFBWSxDQUFDLEdBQWtCO29CQUNuQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBRWhELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFLENBQUM7d0JBQ25DLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDakQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUNoQyxJQUFJLElBQUksSUFBSSxJQUFJOzRCQUFFLE9BQU87d0JBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNoQyxDQUFDO3lCQUNJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFLENBQUM7d0JBQzNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDaEMsSUFBSSxJQUFJLElBQUksSUFBSTs0QkFBRSxPQUFPO3dCQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN0RSxDQUFDOzt3QkFFRyxNQUFNLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDO2dCQUVPLGFBQWEsQ0FBQyxHQUFtQjtvQkFDckMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUVoRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRSxDQUFDO3dCQUNuQyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7d0JBQ2xFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDaEMsSUFBSSxJQUFJLElBQUksSUFBSTs0QkFBRSxPQUFPO3dCQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDMUIsQ0FBQzt5QkFDSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRSxDQUFDO3dCQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ2hDLElBQUksSUFBSSxJQUFJLElBQUk7NEJBQUUsT0FBTzt3QkFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdEUsQ0FBQztnQkFDTCxDQUFDO2dCQUVPLGlCQUFpQixDQUFDLEtBQXlCO29CQUMvQyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsZ0JBQWdCLEVBQUUscURBQXFELEVBQUMsQ0FBQyxDQUFDO29CQUM1RyxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztvQkFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDcEMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7NEJBQ1AsU0FBUzt3QkFDYixJQUFJLFlBQVksR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDL0IsSUFBSSxDQUFDLENBQUMsSUFBSTs0QkFDTixZQUFZLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ3ZELENBQUM7b0JBQ0QsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRU8sY0FBYztvQkFDbEIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSwySUFBMkk7d0JBQ3JLLE9BQU87b0JBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDM0QsQ0FBQztnQkFFTyxjQUFjO29CQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLHdFQUFnRTsyQkFDbEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLGlGQUF3RTsyQkFDN0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLHNFQUE4RCxFQUFFLENBQUM7d0JBQ3pGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUN2QixXQUFXO3dCQUNYLDhIQUE4SDt3QkFDOUgsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7NEJBQ2hCLENBQUMsRUFBRTtnQ0FDQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLO2dDQUN0Riw0QkFBNEI7NkJBRS9CO3lCQUNKLENBQUM7NkJBQ0csSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7NEJBQ1IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUMxQixJQUFJLElBQUksSUFBSSxJQUFJO2dDQUFFLE9BQU87NEJBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUFDLE9BQU87d0JBQzlFLENBQUMsQ0FDSjs2QkFDSSxLQUFLLENBQUMsQ0FBQyxPQUFjLEVBQUUsRUFBRTs0QkFDdEIsSUFBSSxPQUFPLFlBQVksWUFBWSxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FDM0UsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0NBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSw2Q0FBNkMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzRCQUM1RyxDQUFDOzRCQUNELFFBQVEsQ0FBQzt3QkFDYixDQUFDLENBQUM7NkJBQ0QsTUFBTSxDQUFDLEdBQUcsRUFBRTs0QkFDVCxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUNyQyxDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDO2dCQUNMLENBQUM7Z0JBQ08sT0FBTztvQkFFWCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO3dCQUN4QixnRUFBZ0U7d0JBQ2hFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3ZFLENBQUM7b0JBQ0QsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzVDLENBQUM7YUFDSixDQUFBO1lBaDVCWSxxQkFBcUI7Z0JBRGpDLFVBQVUsQ0FBQyxRQUFRO2VBQ1AscUJBQXFCLENBZzVCakM7WUFoNUJZLCtCQUFxQix3QkFnNUJqQyxDQUFBO1FBQ0wsQ0FBQyxFQTE2Qm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTA2QjdCO0lBQUQsQ0FBQyxFQTE2QmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTA2Qm5CO0FBQUQsQ0FBQyxFQTE2QlMsTUFBTSxLQUFOLE1BQU0sUUEwNkJmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHRGV0YWlsU3RhdlphcGlzUmFka3VPcHRpb25zIHtcclxuICAgICAgICB0eXBVbG9oeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZTtcclxuICAgICAgICBncmlkRm9ybWF0OiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPjtcclxuICAgICAgICBnbG9iYWxzPzogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclBhcmFtc0R0b1xyXG4gICAgICAgIGZpbHRlcjogR0Vrb0ZpbHRlckR0bztcclxuICAgICAgICByb3c6IFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvO1xyXG4gICAgICAgIHZpZXdNb2RlOiBJR0RldGFpbFN0YXZaYXBpc0Rpc3BsYXlNb2RlO1xyXG4gICAgICAgIC8qKiBEb2Nhc25lIG5hc3RhdmVuaSB0YWJ1LCBuZXVrbGFkYSBzZSBkbyBVc2VyU2V0dGluZ3MgKi9cclxuICAgICAgICB0YWJTZXR0aW5ncz86IElHRGV0YWlsU3RhdlphcGlzUmFka3VUYWJTZXR0aW5ncztcclxuICAgICAgICBjZnVTZXRTb3J0ZWQ6IEd1aS5XZWJBcHAuR0dyaWRGb3JtYXREdG9cclxuICAgICAgICAvL3N0cnVrdFBvcGlzOiBib29sZWFuLFxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCB0eXBlIElHRGV0YWlsU3RhdlphcGlzRGlzcGxheU1vZGUgPSBcImZ1bGxcIiB8IFwicHJldmlld1wiO1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdEZXRhaWxTdGF2WmFwaXNSYWRrdVRhYlNldHRpbmdzIHtcclxuICAgICAgICBkb2tsYWRPcGVuZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgZGV0YWlsT3BlbmVkOiBib29sZWFuO1xyXG4gICAgICAgIHBvcGlzT3BlbmVkOiBib29sZWFuO1xyXG4gICAgICAgIHNvdXZpc2VqaWNpT3BlbmVkOiBib29sZWFuO1xyXG4gICAgfVxyXG4gICAgdHlwZSBlZGl0VHlwZSA9IFwiWmFkbnlcIiB8IFwiUG9waXNcIiB8IFwiU3J1a3RQb3Bpc1wiO1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsU3RhdlphcGlzUmFka3UgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG4gICAgICAgIHVpZCA9IFwiR0RldGFpbFN0YXZaYXBpc1JhZGt1I1wiO1xyXG4gICAgICAgIHByaXZhdGUgb3B0aW9uczogSUdEZXRhaWxTdGF2WmFwaXNSYWRrdU9wdGlvbnM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSAkemFwaXN5VGFiOiBKUXVlcnk7XHJcbiAgICAgICAgLy9wcml2YXRlICRncmlkRG9rbGFkOiBKUXVlcnk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdHJpZGEgZ3JpZHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY2xhc3NHcmlkOiBzdHJpbmcgPSBcImpzLWdyaWQtYmFzZVwiO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHRyaWRhIGdyaWR1IHBybyBkZXRhaWxcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY2xhc3NEZXRhaWxHcmlkOiBzdHJpbmcgPSBcImpzLWdyaWQtZGV0YWlsXCI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogbmFjdGVuZSB6YXBpc3kgcmFka3VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHphcGlzeVJhZHU6IEdaYXBpc1JhZGt1RHRvO1xyXG4gICAgICAgIC8vcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgJHBvcGlzVGFiOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdGFiU2V0dGluZ3M6IElHRGV0YWlsU3RhdlphcGlzUmFka3VUYWJTZXR0aW5ncztcclxuICAgICAgICB1c2VyU2V0dGluZ3M6IEdvcmRpYy5EYXRhLklHU3RvcmFnZTtcclxuICAgICAgICAvLyBhdHJpYnV0IGVkaXRhY25paG8gcmV6aW11XHJcblxyXG4gICAgICAgIHByaXZhdGUgZWRpdE1vZGU6IGVkaXRUeXBlID0gXCJaYWRueVwiO1xyXG4gICAgICAgIC8vIGF0cmlidXQgem1lbnkgaG9kbm90eSAocHJvIHVsb3plbmkgem1lbiBuYSBncmlkdSlcclxuICAgICAgICBwdWJsaWMgdmFsdWVDaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVsb2FkWmFwaXNSYWRrdTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHByZXBhcmVDb250ZW50KG9wdGlvbnM6IElHRGV0YWlsU3RhdlphcGlzUmFka3VPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmluaXQob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaW5pdChvcHRpb25zOiBJR0RldGFpbFN0YXZaYXBpc1JhZGt1T3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgICAgICBsZXQgc3J2TWV0aG9kTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpczsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGluaXRNZXRob2Q6ICgpID0+IHZvaWQ7XHJcbiAgICAgICAgICAgIGxldCBzZXREYXRhTWV0aG9kOiAoZHRvKSA9PiB2b2lkO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50YWJTZXR0aW5ncyA9IHRoaXMub3B0aW9ucy50YWJTZXR0aW5ncyB8fCB0aGlzLnVzZXJTZXR0aW5ncy5nZXQoXCJ0YWJTZXR0aW5nc1wiKSB8fCB7IGRldGFpbE9wZW5lZDogdHJ1ZSwgcG9waXNPcGVuZWQ6IGZhbHNlLCBkb2tsYWRPcGVuZWQ6IHRydWUsIHNvdXZpc2VqaWNpT3BlbmVkOiBmYWxzZSB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy52aWV3TW9kZSA9PT0gXCJmdWxsXCIpXHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihbe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjbG9zZUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE2OFwiLCAvL1JDIDMxMTAwMTY4IDogWmF2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuY2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3dpdGNoIChvcHRpb25zLnR5cFVsb2h5KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVN0YXY6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwianJlczozMTEwMDExMVwiOyAvL1JDIDMxMTAwMTExIDogRGV0YWlsIMWZw6Fka3Ugw7rEjWV0bsOtaG8gc3RhdnVcclxuICAgICAgICAgICAgICAgICAgICBzcnZNZXRob2ROYW1lID0gXCJHZXRTdGF2UmFka3VcIjtcclxuICAgICAgICAgICAgICAgICAgICBpbml0TWV0aG9kID0gdGhpcy5pbml0U3RhdlJhZGt1O1xyXG4gICAgICAgICAgICAgICAgICAgIHNldERhdGFNZXRob2QgPSB0aGlzLnNldFN0YXZSYWRrdTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwianJlczozMTEwMDExMlwiOyAvL1JDIDMxMTAwMTEyIDogRGV0YWlsIMWZw6Fka3Ugw7rEjWV0bsOtaG8gesOhcGlzdVxyXG4gICAgICAgICAgICAgICAgICAgIHNydk1ldGhvZE5hbWUgPSBcIkdldFphcGlzUmFka3VcIjtcclxuICAgICAgICAgICAgICAgICAgICBpbml0TWV0aG9kID0gdGhpcy5pbml0WmFwaXNSYWRrdTtcclxuICAgICAgICAgICAgICAgICAgICBzZXREYXRhTWV0aG9kID0gdGhpcy5zZXRaYXBpc1JhZGt1O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX05lemFyYXplbmVfemFwaXN5OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcImpyZXM6MzAyNTAzNDNcIjsgLy9SQyAzMDI1MDM0MyA6IFJJU1JFIC0gTmV6YcWZYXplbsOpIHrDoXBpc3kgLSBEZXRhaWwgxZnDoWRrdSDDusSNZXRuw61obyB6w6FwaXN1XHJcbiAgICAgICAgICAgICAgICAgICAgc3J2TWV0aG9kTmFtZSA9IFwiR2V0WmFwaXNSYWRrdVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRNZXRob2QgPSB0aGlzLmluaXRaYXBpc1JhZGt1O1xyXG4gICAgICAgICAgICAgICAgICAgIHNldERhdGFNZXRob2QgPSB0aGlzLnNldFphcGlzUmFka3U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRTdGF2OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcImpyZXM6MzExMDAxMDlcIjsgLy9SQyAzMTEwMDEwOSA6IERldGFpbCDFmcOhZGt1IHJvenBvxI10b3bDqWhvIHN0YXZ1XHJcbiAgICAgICAgICAgICAgICAgICAgc3J2TWV0aG9kTmFtZSA9IFwiR2V0U3RhdlJhZGt1XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdE1ldGhvZCA9IHRoaXMuaW5pdFN0YXZSYWRrdTtcclxuICAgICAgICAgICAgICAgICAgICBzZXREYXRhTWV0aG9kID0gdGhpcy5zZXRTdGF2UmFka3U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRGFub3ZhRXZpZGVuY2VaYXBpczpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJqcmVzOjMwMjUwMTAyXCI7IC8vUkMgMzAyNTAxMDIgOiBEZXRhaWwgxZnDoWRrdSBldmlkZW5jZSBEUEhcclxuICAgICAgICAgICAgICAgICAgICBzcnZNZXRob2ROYW1lID0gXCJHZXRaYXBpc1JhZGt1XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdE1ldGhvZCA9IHRoaXMuaW5pdFphcGlzUmFka3U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RGF0YU1ldGhvZCA9IHRoaXMuc2V0WmFwaXNSYWRrdTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlZpY2VsZXRlRmluYW5jb3ZhbmlaYXBpczpcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5GaW5hbmNvdmFuaVphcGlzOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcImpyZXM6MzAyNTAxMDFcIjsgLy9SQyAzMDI1MDEwMSA6IERldGFpbCDFmcOhZGt1IGZpbmFuY292w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICBzcnZNZXRob2ROYW1lID0gXCJHZXRaYXBpc1JhZGt1XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdE1ldGhvZCA9IHRoaXMuaW5pdFphcGlzUmFka3U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RGF0YU1ldGhvZCA9IHRoaXMuc2V0WmFwaXNSYWRrdTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFphcGlzOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcImpyZXM6MzExMDAxMTBcIjsgLy9SQyAzMTEwMDExMCA6IERldGFpbCDFmcOhZGt1IHJvenBvxI10b3bDqWhvIHrDoXBpc3VcclxuICAgICAgICAgICAgICAgICAgICBzcnZNZXRob2ROYW1lID0gXCJHZXRaYXBpc1JhZGt1XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdE1ldGhvZCA9IHRoaXMuaW5pdFphcGlzUmFka3U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RGF0YU1ldGhvZCA9IHRoaXMuc2V0WmFwaXNSYWRrdTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXN5VnNlOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpczpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsMSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnM/Lmdsb2JhbHM/LlNhbGRva29udG9QYXJhbTEhLnRyaW0oKSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbDEgPSBvcHRpb25zPy5nbG9iYWxzPy5TYWxkb2tvbnRvUGFyYW0xIS50cmltKCkgKyBcIjogXCIgKyBvcHRpb25zLnJvdy52YWx1ZTA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zPy5nbG9iYWxzPy5TYWxkb2tvbnRvUGFyYW0yIS50cmltKCkgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsMT09XCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbDEgPSBvcHRpb25zPy5nbG9iYWxzPy5TYWxkb2tvbnRvUGFyYW0yIS50cmltKCkgKyBcIjogXCIgKyBvcHRpb25zLnJvdy52YWx1ZTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbDEgKz0gXCIsIFwiICsgb3B0aW9ucz8uZ2xvYmFscz8uU2FsZG9rb250b1BhcmFtMiEudHJpbSgpICsgXCI6IFwiICsgb3B0aW9ucy5yb3cudmFsdWUxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJqcmVzOjMwMjUwMjkxXCIuZm9ybWF0KHZhbDEpOyAvL1JDIDMwMjUwMjkxIDogWsOhcGlzeSBzYWxkb2tvbnRhICh7MH0pXHJcbiAgICAgICAgICAgICAgICAgICAgc3J2TWV0aG9kTmFtZSA9IFwiR2V0WmFwaXNSYWRrdVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRNZXRob2QgPSB0aGlzLmluaXRaYXBpc1JhZGt1O1xyXG4gICAgICAgICAgICAgICAgICAgIHNldERhdGFNZXRob2QgPSB0aGlzLnNldFphcGlzUmFka3U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBHRXJyb3IoXCJDdXJyZW50IHR5cGUgaXMgbm90IHN1cHBvcnRlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0WmFwaXMgfHwgb3B0aW9ucy50eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMudmlld01vZGUgPT09IFwiZnVsbFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5nbG9iYWxzPy5Qb3ZvbGVuaUVkaXRhY2VQb3Bpc3VVQ1REb2tsYWR1ICYmIG9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IHRoaXMub3B0aW9ucy5nbG9iYWxzPy5Qb3ZvbGVuaUVkaXRhY2VQb3Bpc3VST1pEb2tsYWR1ICYmIG9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpc1xyXG4gICAgICAgICAgICAgICAgICAgICkvLyBUT0RPOiBEb2Nhc25lIHphcmVtb3Zhbm8gbmV6IGJ1ZGUgb3Rlc3RvdmFubyB2IGppbnljaCBtb2R1bGVjaCBuYSBpbnNlcnQgYSB1cGRhdGUgYWt0aXZpdHkgNTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHRoaXMub3B0aW9ucy52aWV3TW9kZSA9PT0gXCJmdWxsXCIgJiYgdGhpcy5vcHRpb25zLmdsb2JhbHM/LlBvdm9sZW5pRWRpdGFjZVphcGlzdURva2xhZHUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdFVsb3ppdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVWxveml0KHsgZW5hYmxlZDogZmFsc2UsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5zYXZlUmVjb3JkKCkpIH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RPcHJhdml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PcHJhdml0KHsgZW5hYmxlZDogdHJ1ZSwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuc3RhcnRFZGl0TW9kZShcIlBvcGlzXCIpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0WnJ1c2l0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25acnVzaXQoeyBlbmFibGVkOiBmYWxzZSwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuY2FuY2VsRWRpdE1vZGUoKTsgfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdFVsb3ppdFNQOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25VbG96aXQoeyBlbmFibGVkOiBmYWxzZSwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0LnNhdmVSZWNvcmRTUCgpKSB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0T3ByYXZpdFNQOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PcHJhdml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLCBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdGFydEVkaXRNb2RlKFwiU3J1a3RQb3Bpc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdFpydXNpdFNQOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25acnVzaXQoeyBlbmFibGVkOiBmYWxzZSwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuY2FuY2VsRWRpdE1vZGUoKTsgfSB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnZpZXdNb2RlID09PSBcInByZXZpZXdcIilcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jc3MoXCJwYWRkaW5nLXRvcFwiLCBcIjAuMjVyZW1cIik7XHJcblxyXG4gICAgICAgICAgICBpbml0TWV0aG9kLmFwcGx5KHRoaXMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5pbml0R3JpZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCBvcHRpb25zLnR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0WmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IG9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVmljZWxldGVGaW5hbmNvdmFuaVphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCBvcHRpb25zLnR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkZpbmFuY292YW5pWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IG9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRGFub3ZhRXZpZGVuY2VaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgb3B0aW9ucy50eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9OZXphcmF6ZW5lX3phcGlzeVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBvcGlzKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnZpZXdNb2RlID09PSBcImZ1bGxcIlxyXG4gICAgICAgICAgICAgICAgJiYgKHRoaXMub3B0aW9ucy50eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHRoaXMub3B0aW9ucy50eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFphcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgb3B0aW9ucy50eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5WaWNlbGV0ZUZpbmFuY292YW5pWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IG9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRmluYW5jb3ZhbmlaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgb3B0aW9ucy50eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5EYW5vdmFFdmlkZW5jZVphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCBvcHRpb25zLnR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX05lemFyYXplbmVfemFwaXN5XHJcblxyXG4gICAgICAgICAgICAgICAgKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdEdyaWREb2tsYWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vaWYgKHRoaXMub3B0aW9ucy50eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXMpIHtcclxuICAgICAgICAgICAgLy8gICAgdGhpcy5sb2FkRGF0YSh0aGlzLm9wdGlvbnMudHlwVWxvaHkpO1xyXG4gICAgICAgICAgICAvLyAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNydiA9IHRoaXMuc3J2KCk7XHJcbiAgICAgICAgICAgIHNydi5jYWxsKHNydk1ldGhvZE5hbWUsIHsgc3o6IG9wdGlvbnMucm93LCB0eXBlOiBvcHRpb25zLnR5cFVsb2h5LCBza2lwU3VtTGltaXQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldERhdGFNZXRob2QuY2FsbCh0aGlzLCByKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3J2TWV0aG9kTmFtZSA9PT0gXCJHZXRaYXBpc1JhZGt1XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdWxvemltIHNpIG5hY3RlbmUgemFwaXN5IHJhZGt1LCBhYnljaCBqZSBtb2hsIHBvdXppdCB2IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuemFwaXN5UmFkdSA9IHI7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBvcHRpb25zLnR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0WmFwaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgb3B0aW9ucy50eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5WaWNlbGV0ZUZpbmFuY292YW5pWmFwaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgb3B0aW9ucy50eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5GaW5hbmNvdmFuaVphcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IG9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRGFub3ZhRXZpZGVuY2VaYXBpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBvcHRpb25zLnR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX05lemFyYXplbmVfemFwaXN5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUG9waXMoci5wb3Bpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNydi5jbG9zZSgpOyB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgbG9hZERhdGEodHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUpIHtcclxuICAgICAgICAvLyAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgLy8gICAgc3dpdGNoICh0eXBVbG9oeSkge1xyXG4gICAgICAgIC8vICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250b1phcGlzOlxyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgR29yZGljLklzbC5VY3RaYXBpcy5saXN0KClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLmRvbmUocmVzdWx0ID0+IHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhhdC5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgcHJpdmF0ZSBzcnYoKTogR0NvbnRlbnQge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVTZXJ2aWNlQ29udGVudChbXCJHb3JkaWMuVWNyLldlYkNsaWVudC5HU2V6bmFtRWtvWmF6bmFtdVwiLCB7IHNlcnZlclBhcmFtczogeyBUeXBVbG9oeTogdGhpcy5vcHRpb25zLnR5cFVsb2h5IH0gfV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRGb3JtT3B0aW9ucyhtb2RlOiBJR0RldGFpbFN0YXZaYXBpc0Rpc3BsYXlNb2RlKTogR0Zvcm1PcHRpb25zIHtcclxuICAgICAgICAgICAgaWYgKG1vZGUgPT09IFwiZnVsbFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMM00zUzIsIEwtMy05LTAsIE0tMTItMTItMCwgUy0xMi0xMi0wLCBicmVha3MtODAwLTExOTBcIiwgbmFtZTogXCJoZWFkRm9ybVwiIH07XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1vZGUgPT09IFwicHJldmlld1wiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbGF5b3V0RGVzY3JpcHRvcjogIFwiTDFNMVMxLCBMLTMtOS0wLCBNLTMtOS0wLCBTLTEyLTEyLTAsIGJyZWFrcy0zMDAtNTAwXCIsIG5hbWU6IFwiaGVhZEZvcm1cIiB9O1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwiTm90U3VwcG9ydGVkXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0U3RhdlJhZGt1KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgY3VzdG9tQ2xhc3MgPSB0aGlzLm9wdGlvbnMudmlld01vZGUgPT09IFwicHJldmlld1wiID8gXCJib2xkXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgd3JwJCA9ICQoXCI8ZGl2IHN0eWxlPSdkaXNwbGF5OiBub25lJz5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgbGV0IGZvcm0kID0gJChcIjxkaXYgY2xhc3M9J2RldGFpbC1oZWFkZXInPlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcInNldHVwXCIsIHRoaXMuZ2V0Rm9ybU9wdGlvbnModGhpcy5vcHRpb25zLnZpZXdNb2RlKSlcclxuICAgICAgICAgICAgICAgIC8vTk9URTogWmRlIHNlIG5lcG91eml2YSBpeHAsIHByb3RvemUgemFkbmUgbmVtYWppIVxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwianJlczozMTEwMDA5OFwiKSAvL1JDIDMxMTAwMDk4IDogRHJ1aCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAuZ3NlbGVjdGJveChHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvY2RyZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkcmRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuZHJkPXZhbHVlLmRyZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IGN1c3RvbUNsYXNzXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcImpyZXM6MzAyNTA2MDZcIiAvL1JDIDMwMjUwNjA2IDogT2Jkb2LDrVxyXG4gICAgICAgICAgICAgICAgKS5nc3RyaW5nYm94KHsgbmFtZTogXCJkZW5NZXNpY1Jva1wiLCBkaXNhYmxlZDogdHJ1ZSwgY3VzdG9tQ2xhc3M6IGN1c3RvbUNsYXNzIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjb21wbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgIC8vI3JlZ2lvbiBQcm8gbmFzbGVkdWppY2kgcG9saWNrYSBuZWpzb3UgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIkFnZW5kb3ZlIGNpc2xvXCIpLmdzdHJpbmdib3goKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIkV2aWRlbmNuaSBjaXNsb1wiKS5nc3RyaW5nYm94KClcclxuICAgICAgICAgICAgICAgICAgICAvLy5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIiwgXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJEYXR1bSBldmlkZW5jZVwiKS5nc3RyaW5nYm94KClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJacHJhY292YXRlbFwiKS5nc3RyaW5nYm94KClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJWbGFzdG5pa1wiKS5nc3RyaW5nYm94KCk7XHJcbiAgICAgICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMudmlld01vZGUgPT09IFwicHJldmlld1wiKSB7XHJcbiAgICAgICAgICAgICAgICAkKGZvcm0kKS5nZm9ybShcInZpZXdNb2RlXCIsIFwidmlld1wiKTtcclxuICAgICAgICAgICAgICAgIHdycCQuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzExMDAwNTRcIiwgLy9SQyAzMTEwMDA1NCA6IERva2xhZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRoaXMudGFiU2V0dGluZ3MuZGV0YWlsT3BlbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuOiAoKSA9PiB7IHRoaXMudGFiU2V0dGluZ3MuZGV0YWlsT3BlbmVkID0gdHJ1ZTsgdGhpcy51cGRhdGVTZXR0aW5ncygpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZTogKCkgPT4geyB0aGlzLnRhYlNldHRpbmdzLmRldGFpbE9wZW5lZCA9IGZhbHNlOyB0aGlzLnVwZGF0ZVNldHRpbmdzKCk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3JtJC5kZXRhY2goKS5hcHBlbmRUbyh3cnAkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0WmFwaXNSYWRrdSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHdycCQgPSAkKFwiPGRpdiBzdHlsZT0nZGlzcGxheTogbm9uZSc+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGxldCBkZW5NZXNpY1Jva0xhYmVsID0gXCJcIjtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFphcGlzKVxyXG4gICAgICAgICAgICAgICAgZGVuTWVzaWNSb2tMYWJlbCA9IFwianJlczozMTEwMDE3NVwiOyAvL1JDIDMxMTAwMTc1IDogRGF0dW0gcmVhbGl6YWNlXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3B0aW9ucy50eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXMgfHwgdGhpcy5vcHRpb25zLnR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX05lemFyYXplbmVfemFwaXN5KVxyXG4gICAgICAgICAgICAgICAgZGVuTWVzaWNSb2tMYWJlbCA9IFwianJlczozMTEwMDE3NlwiOyAvL1JDIDMxMTAwMTc2IDogRGF0dW0gVcOaUFxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLm9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRmluYW5jb3ZhbmlaYXBpcyB8fCB0aGlzLm9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRGFub3ZhRXZpZGVuY2VaYXBpcylcclxuICAgICAgICAgICAgICAgIGRlbk1lc2ljUm9rTGFiZWwgPSBcImpyZXM6MzExMDAxNzVcIjsgLy9SQyAzMTEwMDE3NSA6IERhdHVtIHJlYWxpemFjZVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLm9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250b1phcGlzIHx8IHRoaXMub3B0aW9ucy50eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXN5VnNlKVxyXG4gICAgICAgICAgICAgICAgZGVuTWVzaWNSb2tMYWJlbCA9IFwianJlczozMDI1MDI5MFwiOyAvL1JDIDMwMjUwMjkwIDogWsOhcGlzeSBzYWxkb2tvbnRzXHJcblxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwiVW5zdXBwb3J0ZWQgdHlwZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdXN0b21DbGFzcyA9IHRoaXMub3B0aW9ucy52aWV3TW9kZSA9PT0gXCJwcmV2aWV3XCIgPyBcImJvbGRcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBwaWRSb3dPcHRpb25zID0gR29yZGljLkVrby5EZXRhaWwuRmllbGQuZmllbGRQSUQoeyBmaWVsZE9wdDogeyBuYW1lOiBcIml4cFwiLCBkaXNhYmxlZDogdHJ1ZSB9IH0pWzBdO1xyXG4gICAgICAgICAgICBsZXQgcGlkUm93TGFiZWwgPSBwaWRSb3dPcHRpb25zLmxhYmVsO1xyXG4gICAgICAgICAgICBsZXQgcGlkRmllbGRPcHRpb25zID0gcGlkUm93T3B0aW9ucyEuZmllbGRzIVswXS5vcHRpb25zIGFzIEdTdHJpbmdCb3hPcHRpb25zO1xyXG4gICAgICAgICAgICBsZXQgZm9ybSQgPSAkKFwiPGRpdiBjbGFzcz0nZGV0YWlsLWhlYWRlcic+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwic2V0dXBcIiwgdGhpcy5nZXRGb3JtT3B0aW9ucyh0aGlzLm9wdGlvbnMudmlld01vZGUpKVxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIHBpZFJvd0xhYmVsKS5nc3RyaW5nYm94KHBpZEZpZWxkT3B0aW9ucylcclxuICAgICAgICAgICAgICAgIC5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIiwgXCJcIilcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcImpyZXM6MzExMDAxMDJcIikgLy9SQyAzMTEwMDEwMiA6IERydWggZG9rbGFkdSAoRFJEKVxyXG4gICAgICAgICAgICAgICAgLmdzZWxlY3Rib3goR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb2NkcmQoKSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZHJkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmRyZD12YWx1ZS5kcmRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBjdXN0b21DbGFzc1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJqcmVzOjMxMTAwMTAwXCIpLmdzdHJpbmdib3goeyBuYW1lOiBcImFjXCIsIGRpc2FibGVkOiB0cnVlLCBjdXN0b21DbGFzczogY3VzdG9tQ2xhc3MgfSkgLy9SQyAzMTEwMDEwMCA6IMSMw61zbG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIGRlbk1lc2ljUm9rTGFiZWwpLmdzdHJpbmdib3goeyBuYW1lOiBcImRlbk1lc2ljUm9rXCIsIGRpc2FibGVkOiB0cnVlLCBjdXN0b21DbGFzczogY3VzdG9tQ2xhc3MgfSlcclxuICAgICAgICAgICAgICAgIC5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIiwgXCJcIilcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcImpyZXM6MzExMDAwNzlcIikuZ3N0cmluZ2JveCh7IG5hbWU6IFwiemtyQWdcIiwgZGlzYWJsZWQ6IHRydWUsIGN1c3RvbUNsYXNzOiBjdXN0b21DbGFzcyB9KSAvL1JDIDMxMTAwMDc5IDogQWdlbmRhXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJqcmVzOjMwMjUwNjA0XCIpIC8vUkMgMzAyNTA2MDQgOiBUeXAgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgLmdzZWxlY3Rib3goR29yZGljLlByZWZhYnMuU2VsZWN0LnNzbHN0eXAoKSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfdHlwPXZhbHVlLml4c190eXBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBjdXN0b21DbGFzc1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJqcmVzOjMwMjUwNjAzXCIpLmdzdHJpbmdib3goeyBuYW1lOiBcImFrdF96bmFja2FcIiwgZGlzYWJsZWQ6IHRydWUsIGN1c3RvbUNsYXNzOiBjdXN0b21DbGFzcyB9KSAvL1JDIDMwMjUwNjAzIDogQWdlbmRvdsOpIMSNw61zbG9cclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNvbXBsZXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy52aWV3TW9kZSA9PT0gXCJwcmV2aWV3XCIpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJChmb3JtJCkuZ2Zvcm0oXCJ2aWV3TW9kZVwiLCBcInZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JtJC5kZXRhY2goKS5hcHBlbmRUbyh3cnAkKTtcclxuICAgICAgICAgICAgICAgIHdycCQuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzExMDAwNTRcIiwgLy9SQyAzMTEwMDA1NCA6IERva2xhZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRoaXMudGFiU2V0dGluZ3MuZG9rbGFkT3BlbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuOiAoKSA9PiB7IHRoaXMudGFiU2V0dGluZ3MuZG9rbGFkT3BlbmVkID0gdHJ1ZTsgdGhpcy51cGRhdGVTZXR0aW5ncygpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZTogKCkgPT4geyB0aGlzLnRhYlNldHRpbmdzLmRva2xhZE9wZW5lZCA9IGZhbHNlOyB0aGlzLnVwZGF0ZVNldHRpbmdzKCk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGl4c19lc3UgPSB0aGlzLm9wdGlvbnMucm93Lml4c19lc3U7XHJcbiAgICAgICAgICAgIGlmICgodGhpcy5vcHRpb25zLnR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpcyB8fCB0aGlzLm9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfTmV6YXJhemVuZV96YXBpc3kpXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgaXhzX2VzdSAmJiBpeHNfZXN1ICE9PSBcIjAwMDBTRTAwMDAwTVwiKSB7IC8vTk9URTogViBUSyBqZSBUT0RPIG5hIHByaWRhbmkgbmEgRVNVIG51bGFrXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVzdURldGFpbEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIzOFwiLCAvL1JDIDMxMTAwMjM4IDogRGV0YWlsIEVTVVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fc3UuRGlhbG9ncy5EZXRhaWxFc3VEbGcodGhpcywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHNFc3U6IGl4c19lc3UhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVY2VsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiB0aGlzLm9wdGlvbnMucm93Lml4cCEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBa3RabmFja2E6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IDIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pVHh0OiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIE5hc3RhdmVuaSBha2NpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG5hc3RhdmVuaUFrY2koKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RPcHJhdml0Py51cGRhdGUoeyBlbmFibGVkOiB0aGlzLmVkaXRNb2RlID09PSBcIlphZG55XCIgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RVbG96aXQ/LnVwZGF0ZSh7IGVuYWJsZWQ6IHRoaXMuZWRpdE1vZGUgPT0gXCJQb3Bpc1wiICYmIHRoaXMudmFsdWVDaGFuZ2VkIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0WnJ1c2l0Py51cGRhdGUoeyBlbmFibGVkOiB0aGlzLmVkaXRNb2RlID09PSBcIlBvcGlzXCIgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RPcHJhdml0U1A/LnVwZGF0ZSh7IGVuYWJsZWQ6IHRoaXMuZWRpdE1vZGUgPT09IFwiWmFkbnlcIiB9KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFVsb3ppdFNQPy51cGRhdGUoeyBlbmFibGVkOiB0aGlzLmVkaXRNb2RlID09PSBcIlNydWt0UG9waXNcIiAmJiB0aGlzLnZhbHVlQ2hhbmdlZCB9KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFpydXNpdFNQPy51cGRhdGUoeyBlbmFibGVkOiB0aGlzLmVkaXRNb2RlID09PSBcIlNydWt0UG9waXNcIiB9KTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcInBvcGlzRG9rbGFkdVwiKS5maW5kRmllbGRzKFwicG9waXNcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdGhpcy5lZGl0TW9kZSAhPT0gXCJTcnVrdFBvcGlzXCIpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoaXMuZ2V0RGV0YWlsR3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBjb25kRm9ybWF0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRbXSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGUgPT09IFwiUG9waXNcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gcG9kbWluZW5lIGZvcm1hdG92YW5pXHJcbiAgICAgICAgICAgICAgICBjb25kRm9ybWF0ID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDY2OVwiLCAvL1JDIDMwMjUwNjY5IDogRWRpdG92YXRlbG7DoSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qYXBwbHlUbzogXCJuYW1lXCIsKi8gZm9ybXVsYTogXCJOT1QoQGNhbkVkaXQpXCIsIGJnOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRCZy5ncmF5XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA2NjlcIiwgLy9SQyAzMDI1MDY2OSA6IEVkaXRvdmF0ZWxuw6EgaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBseVRvOiBcIm5hbWUsdmFsMlwiLCBmb3JtdWxhOiBcIjFcIiwgYmc6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdEJnLmdyYXlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBncmlkLmdncmlkPEdTdGF2UmFka3VWYWxEdG8+KFwidXNlUHJvZmlsZVwiLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBjb25kRm9ybWF0XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKipcclxuICAgICAgICAgKiBSZXppbSBvcHJhdlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc3RhcnRFZGl0TW9kZSh0eXBFZGl0YWNlOiBlZGl0VHlwZSk6IHZvaWQge1xyXG4gICAgICAgICAgICAvLyBwb2t1ZCBqZSB2IGVkaXRhY2ksIG5lemFjaW5lanUgem5vdnUgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVkaXRNb2RlICE9IFwiWmFkbnlcIikgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmVkaXRNb2RlID0gdHlwRWRpdGFjZTtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy9pZiAodHlwRWRpdGFjZSA9PSBcIlNydWt0UG9waXNcIikge1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwicG9waXNEb2tsYWR1XCIpLmZpbmRGaWVsZHMoXCJwb3Bpc1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy9jb25zdCBncmlkID0gdGhpcy5nZXREZXRhaWxHcmlkKCk7XHJcbiAgICAgICAgICAgIC8vaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAvL2dyaWQuZ2dyaWRjZWxsZWRpdG9yKFwic3RhcnRcIiwpO1xyXG4gICAgICAgICAgICB0aGlzLm5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqKlxyXG4gICAgICAgICAqIFpydXNlbmkgcmV6aW11IG9wcmF2XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjYW5jZWxFZGl0TW9kZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5lZGl0TW9kZSA9IFwiWmFkbnlcIjsgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gbmVmdW5ndWplXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZXRaYXBpc1JhZGt1KHRoaXMuemFwaXN5UmFkdSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkKHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlQ29udGVudCh0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMubmFzdGF2ZW5pQWtjaSgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVWxvemVuaSB6bWVuIG5hIHphcGlzdVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzYXZlUmVjb3JkKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBkdG9QdXZvZG5pRGF0YSA9IHRoaXMub3B0aW9ucy5yb3c7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXREZXRhaWxHcmlkKCk7XHJcbiAgICAgICAgICAgIGxldCBkdG9TYXZlRGF0YSA9ICQuZXh0ZW5kKHRydWUse30sZHRvUHV2b2RuaURhdGEpOyAvLyBrb3BpZSwgYWJ5IHNlIG5lcHJlcHNhbCBvcmlnaW5hbFxyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PT0gbnVsbCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICBsZXQgZHRvU2F2ZURhdGVSb3cgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uR2V0QWxsUm93cyA8R1N0YXZSYWRrdVZhbER0bz4oZ3JpZCk7XHJcbiAgICAgICAgICAgIGlmIChkdG9TYXZlRGF0ZVJvdyAmJiBkdG9TYXZlRGF0ZVJvdy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGR0b1NhdmVEYXRlUm93Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IGR0b1NhdmVEYXRlUm93W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuY2FuRWRpdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBqZSByYWRlayBlZGl0b3ZhdGVsbnksIHVsb3ppbSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cuY29sREJOYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvU2F2ZURhdGFbcm93LmNvbERCTmFtZV0gPSByb3cudmFsMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuVWNyVWNldG5pWmFwaXMudXBkYXRlKHsgcHV2b2RuaVphcGlzOiBkdG9QdXZvZG5pRGF0YSwgdXByYXZlbnlaYXBpczogZHRvU2F2ZURhdGEgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9BZnRlclNhdmUocmVzdWx0LnJlc3VsdC5kYXRhLCBkdG9TYXZlRGF0ZVJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5VY3JSb3pwb2N0b3Z5WmFwaXMudXBkYXRlKHsgcHV2b2RuaVphcGlzOiBkdG9QdXZvZG5pRGF0YSwgdXByYXZlbnlaYXBpczogZHRvU2F2ZURhdGEgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9BZnRlclNhdmUocmVzdWx0LnJlc3VsdC5kYXRhLCBkdG9TYXZlRGF0ZVJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVsb3plbmkgem1lbiBcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2F2ZVJlY29yZFNQKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGxldCBkdG9QdXZvZG5pRGF0YSA9IHRoaXMub3B0aW9ucy5yb3c7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXREZXRhaWxHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09PSBudWxsKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5VY3JVY2V0bmlaYXBpcy51bG96UG9waXNEb2tsYWR1KHtcclxuICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWM6IGR0b1B1dm9kbmlEYXRhLmFjXHJcbiAgICAgICAgICAgICAgICAgICAgLCBpY286IGR0b1B1dm9kbmlEYXRhLmljb1xyXG4gICAgICAgICAgICAgICAgICAgICwgbGljOiBkdG9QdXZvZG5pRGF0YS5saWNcclxuICAgICAgICAgICAgICAgICAgICAsIG1lc2ljOiBkdG9QdXZvZG5pRGF0YS5tZXNpY1xyXG4gICAgICAgICAgICAgICAgICAgICwgcm9rOiBkdG9QdXZvZG5pRGF0YS5yb2tcclxuICAgICAgICAgICAgICAgICAgICAsIHVjczogZHRvUHV2b2RuaURhdGEudWNzXHJcbiAgICAgICAgICAgICAgICAgICAgLCB6a3JBZ2VuZHk6IHRoaXMub3B0aW9ucy50eXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpcyA/IFwiVUNUXCIgOiBcIlJPWlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdnlQb3BpczogdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcInBvcGlzRG9rbGFkdVwiKS5maW5kRmllbGRzKFwicG9waXNcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9BZnRlclNhdmUoZHRvUHV2b2RuaURhdGEsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa2NlIHBvIHVsb3plbmkgemFwaXN1XHJcbiAgICAgICAgICogQHBhcmFtIHNhdmVkUm93XHJcbiAgICAgICAgICogQHBhcmFtIHNhdmVEYXRlUm93RHRvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBhY3Rpb0FmdGVyU2F2ZShzYXZlZFJvdzogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvLCBzYXZlRGF0ZVJvd0R0bzogR1N0YXZSYWRrdVZhbER0b1tdfG51bGwpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy8gcHJlcGxuZW5pIHB1dm9kbmljaCBob2Rub3RcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnJvdy5yYWRla196ID0gc2F2ZWRSb3cucmFkZWtfejtcclxuICAgICAgICAgICAgdGhpcy5lZGl0TW9kZSA9IFwiWmFkbnlcIjtcclxuICAgICAgICAgICAgdGhpcy5uYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChzYXZlRGF0ZVJvd0R0byE9bnVsbCYmICBzYXZlRGF0ZVJvd0R0byAmJiBzYXZlRGF0ZVJvd0R0by5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB2c2VjaG55IGVkaXRvdmF0ZWxuZSBob2Rub3R5IHByZXBsbmltIGRvIHZzdHVwbmlobyByYWRrdSwga3Rlcnkgc2UgdnJhY2kgbmEgc2V6bmFtIHphcGlzdVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzYXZlRGF0ZVJvd0R0by5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSBzYXZlRGF0ZVJvd0R0b1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93LmNhbkVkaXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgamUgcmFkZWsgZWRpdG92YXRlbG55LCB1bG96aW0gaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93LmNvbERCTmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5yb3dbcm93LmNvbERCTmFtZV0gPSBzYXZlZFJvd1tyb3cuY29sREJOYW1lXTsgLy8gcG9rdWQgbmVuaSB2IHNhdmVkUm93LCBwb3V6aWppIGhvZG5vdHUgeiByYWRrdVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgICAgIGlmIChzYXZlRGF0ZVJvd0R0byE9bnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuemFwaXN5UmFkdS5zdGF2eSA9IHNhdmVEYXRlUm93RHRvO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZW1wdHkoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWxvYWRaYXBpc1JhZGt1ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wcmVwYXJlQ29udGVudCh0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaamlzdGluaSBtb3pub3N0aSBlZGl0YWNlIGJ1bmt5XHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGlzQ2FuRWRpdChvYmo6IEdHcmlkRWRpdG9ySW5mb1R5cGU8R1N0YXZSYWRrdVZhbER0bz4pOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM/LmVkaXRNb2RlISAmJiBvYmouY2VsbEluZm8uZGF0YT8uY2FuRWRpdCE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgaW5pdEdyaWQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSAkKFwiPGRpdiBzdHlsZT0nZGlzcGxheTogbm9uZScgY2xhc3M9J1wiICsgdGhpcy5jbGFzc0RldGFpbEdyaWQgK1wiJz5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMTEwMDE1NlwiLCAvL1JDIDMxMTAwMTU2IDogRGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0aGlzLnRhYlNldHRpbmdzLmRldGFpbE9wZW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBvcGVuOiAoKSA9PiB7IHRoaXMudGFiU2V0dGluZ3MuZGV0YWlsT3BlbmVkID0gdHJ1ZTsgdGhpcy51cGRhdGVTZXR0aW5ncygpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlOiAoKSA9PiB7IHRoaXMudGFiU2V0dGluZ3MuZGV0YWlsT3BlbmVkID0gZmFsc2U7IHRoaXMudXBkYXRlU2V0dGluZ3MoKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiAodGhpcy5vcHRpb25zLnR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0WmFwaXMgfHwgdGhpcy5vcHRpb25zLnR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5vcHRpb25zLnZpZXdNb2RlID09PSBcImZ1bGxcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5vcHRpb25zLmdsb2JhbHM/LlBvdm9sZW5pRWRpdGFjZVphcGlzdURva2xhZHUgPyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5vcHRpb25zLmdsb2JhbHM/LlBvdm9sZW5pRWRpdGFjZVBvcGlzdVVDVERva2xhZHUgJiYgdGhpcy5vcHRpb25zLnR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLm9wdGlvbnMuZ2xvYmFscz8uUG92b2xlbmlFZGl0YWNlUG9waXN1Uk9aRG9rbGFkdSAmJiB0aGlzLm9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpcyk/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0T3ByYXZpdCpcIiwgXCJhY3RVbG96aXQqXCIsIFwiYWN0WnJ1c2l0KlwiXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy52aWV3TW9kZSA9PT0gXCJmdWxsXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZ3JpZEZvcm1hdCA9IG5ldyBHVWNyU3RhdlJhZGt1R3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm5hbWVcIiwgd2lkdGg6IDgwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFN0YXZSYWRrdUNvbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsMVwiLCB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IChlZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWVEQkNvbCA9IGVkLmNlbGxJbmZvLmRhdGEuY29sREJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVkLmNlbGxJbmZvLmRhdGEuZWtvRmllbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2Z1SXRlbT0gdGhhdC5vcHRpb25zLmNmdVNldFNvcnRlZC5jb2x1bW5zLmZpbmQoKGNvbCkgPT4gY29sLm5hbWUgPT0gbmFtZURCQ29sKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZnVJdGVtID09IG51bGwpIHJldHVybiB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJlZmFiID0gR29yZGljLkVrby5QcmVmYWJzLmNmdSh7IGlzUm96OiBmYWxzZSwgaXNVY3Q6IHRydWUsIGNmdTogY2Z1SXRlbSB9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZWZhYiA9ICQuZXh0ZW5kKHByZWZhYiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICh0aGlzOiBIVE1MRWxlbWVudCwgZXY6IEpRdWVyeUV2ZW50T2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL09tZXplbmkgZGVsa3kgbmEgdXJjaXR5IHBvY2V0IHpuYWt1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuaW5wdXRUb1VwcGVyQ2FzZUZ1bmMuYXBwbHkodGhpcywgW2V2XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoXCIuZ2ZpZWxkLWlucHV0XCIpLmF0dHIoXCJtYXhsZW5ndGhcIiwgY2Z1SXRlbT8ubWF4TGVuZ3RoISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2OiBKUXVlcnlFdmVudE9iamVjdCwgbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gKCQuaXNQbGFpbk9iamVjdChvLnZhbHVlKSA/IG8udmFsdWUuY29kZSA6IG8udmFsdWUpIGFzIHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLnBhZGRWYWx1ZSh2YWx1ZSwgY2Z1SXRlbT8ubWF4TGVuZ3RoISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldFZhbHVlXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudmFsMT12YWx1ZVwiLCAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmljdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmJhYmxlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogcHJlZmFiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3N0cmluZ2JveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbDFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pdGVtVGVtcGxhdGU6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9ialtcInZhbDFcIl07IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jZWxsVGVtcGxhdGU6IGZ1bmN0aW9uIChvYmopIHsgb2JqW3Nsb3VwZWMubmFtZV0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zdHJpY3Q6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9tb2RlbDogXCJtb2RlbC52YWwxID0gdmFsdWUudmFsMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmVyaWZ5OiBmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh0eXBlb2YgYSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB2YXIgaG9kbm90YSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBob2Rub3RhW1widmFsMVwiXSA9IGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiBob2Rub3RhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9vbHRpcFRlbXBsYXRlOiAoZHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICghZHRvLmNmdSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vcmV0dXJuIEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5mb3JtYXRJbnRlcnZhbFRvb2x0aXAoZHRvLmNmdVtjZnVEdG8ubmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL30sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2VkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy93aWRnZXQ6IFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9vcHRpb25zOiBHb3JkaWMuRWtvLlByZWZhYnMuY2Z1KHsgaXNSb3o6IGZhbHNlLCBpc1VjdDogdHJ1ZSwgY2Z1OiB1bmRlZmluZWQgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9vcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjcmVhdGU6IGZ1bmN0aW9uICh0aGlzOiBIVE1MRWxlbWVudCwgZXY6IEpRdWVyeUV2ZW50T2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9PbWV6ZW5pIGRlbGt5IG5hIHVyY2l0eSBwb2NldCB6bmFrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5pbnB1dFRvVXBwZXJDYXNlRnVuYy5hcHBseSh0aGlzLCBbZXZdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAkKHRoaXMpLmZpbmQoXCIuZ2ZpZWxkLWlucHV0XCIpLmF0dHIoXCJtYXhsZW5ndGhcIiwgMTAvKml0ZW0ubWF4TGVuZ3RoKi8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2OiBKUXVlcnlFdmVudE9iamVjdCwgbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmICgkKHRoaXMpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdmFyIHZhbHVlID0gKCQuaXNQbGFpbk9iamVjdChvLnZhbHVlKSA/IG8udmFsdWUuY29kZSA6IG8udmFsdWUpIGFzIHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoIXZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZhbHVlID0gR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLnBhZGRWYWx1ZSh2YWx1ZSwgMTAvKml0ZW0ubWF4TGVuZ3RoKi8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZhbHVlID0gdmFsdWUudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldFZhbHVlXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcInZhbDFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqW1widmFsMVwiXTsgfSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbGVuZ3RoOiA1MCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9jZWxsVGVtcGxhdGU6IGZ1bmN0aW9uIChvYmopIHsgb2JqW3Nsb3VwZWMubmFtZV0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vc3RyaWN0OmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9tb2RlbDogXCJtb2RlbC5cIiArIHNsb3VwZWMubmFtZSArIFwiPXZhbHVlLmNvZGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG1vZGVsOiBcIm1vZGVsLnZhbDEgPSB2YWx1ZS52YWwxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB2ZXJpZnk6IGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKHR5cGVvZiBhID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHZhciBob2Rub3RhID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGhvZG5vdGFbXCJ2YWwxXCJdID0gYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIGhvZG5vdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGhlbHBlckN1c3RvbWl6ZXI6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIFwidmFsMVwiLCBcInZhbDFUeXBlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFN0YXZSYWRrdUNvbCh7IG5hbWU6IFwidmFsMlwiLCB3aWR0aDogMjAwIH0sIFwidmFsMlwiLCBcInZhbDJUeXBlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEJvb2xlYW5Db2x1bW4oeyBuYW1lOiBcImNhbkVkaXRcIiwgd2lkdGg6IDUwLCBoaWRkZW46IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICBncmlkLmdncmlkPEdTdGF2UmFka3VWYWxEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dUb3BQYW5lbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dIZWFkZXJSb3c6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dCb3R0b21QYW5lbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHsgY29sdW1uTGlzdDogZ3JpZEZvcm1hdC5jb2x1bW5zLm1hcCgoYykgPT4gYy5uYW1lKS5qb2luKFwiLFwiKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBncmlkRm9ybWF0XHJcbiAgICAgICAgICAgICAgICB9KS5nZ3JpZGNlbGxlZGl0b3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYWxsb3dDb3B5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZVN0YXJ0OiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6bmVwcmlzdHVwZW5pIGdyaWR1LCBwb2t1ZCBzZSBuZW1hIGVkaXRvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzQ2FuRWRpdChvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZhbHVlQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLm9wdGlvbnMudmlld01vZGUgPT09IFwicHJldmlld1wiKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwiTm90U3VwcG9ydGVkXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0R3JpZERva2xhZCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLiR6YXBpc3lUYWIgPSAkLm5ld0RpdigpO1xyXG4gICAgICAgICAgICB0aGlzLiR6YXBpc3lUYWJcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICh0aGF0Lm9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzID8gXCJqcmVzOjMwMjUwMjc2XCIgOiAvL1JDIDMwMjUwMjc2IDogxZjDoWRreSDDusSNZXRuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMDI1MDI3N1wiKSwgLy9UT0RPOiBKUkVTIChqZXN0ZSBidWRlIHVwcmVzbmVubykgLy9SQyAzMDI1MDI3NyA6IMWYw6Fka3kgcm96cG/EjXRvdsOpaG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdGhpcy50YWJTZXR0aW5ncy5zb3V2aXNlamljaU9wZW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKGZhbHNlKS5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRHcmlkRG9rbGFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGFiU2V0dGluZ3Muc291dmlzZWppY2lPcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZTogKCkgPT4geyB0aGlzLnRhYlNldHRpbmdzLnNvdXZpc2VqaWNpT3BlbmVkID0gZmFsc2U7IHRoaXMudXBkYXRlU2V0dGluZ3MoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy50YWJTZXR0aW5ncy5zb3V2aXNlamljaU9wZW5lZClcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEdyaWREb2tsYWQoKTtcclxuICAgICAgICAgICAgLy9TbG91cGVjIHMgaHZlemRpY2tvdSwgYWJ5IGJ5bG8gcG96bmF0LCBuYSBrdGVyZW0gcmFka3UganNlbVxyXG4gICAgICAgICAgICBsZXQgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCkuYWRkKHRoaXMub3B0aW9ucy5ncmlkRm9ybWF0KTtcclxuICAgICAgICAgICAgbGV0IHJvd1N0ciA9IEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucy5yb3cpO1xyXG5cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5jb2x1bW5zLnVuc2hpZnQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJmYXZcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMjIsXHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhLCBtZXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KGRhdGEpID09PSByb3dTdHIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuVXRpbHMuSWNvbkJ1aWxkZXIuZGVmYXVsdEluc3QuY3JlYXRlSWNvbihcImZhLXN0YXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJC5uZXdEaXYodGhpcy5jbGFzc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy4kemFwaXN5VGFiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLCAgICAgLy8gZml0IChkZWZhdWx0bmUgYnkgbWVsbyBieXQgdG90byksIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7ICAgICAvL29ic2x1em5hIGFrY2UsIGt0ZXJhIHNlIHNwb3VzdGkgZGJsIGNsaWNrZW0gbmFkIHJhZGtlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuc2hvd0RldGFpbChjdHguY2VsbEluZm8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5yb3cgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoR29yZGljLlVjci5XZWJDbGllbnQuR0RldGFpbFN0YXZaYXBpc1JhZGt1LCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1wicG9waXNcIiwgXCJhY1wiXSwgLy9zbG91cGNlLCBwb2RsZSBrdGVyeWNoIHNlIHZ5aGxlZGF2YSB2IHNlYXJjaGJveHUgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGdyaWRGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jZWxsQWN0aXZhdGU6IGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coXCJjZWxsQWN0aXZhdGVcIiwgYXJndW1lbnRzKTt9IC8vTk9URTogTmVkb3N0YW51IHNlIGsgcHV2b2RuaSB1ZGFsb3N0aSwgYWJ5Y2ggemppc3RpbCwgemRhIHNlIGRyemkgY3RybFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSBvYmpla3QgZ3JpZHVcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldEdyaWQoKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IG51bGwge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZWxlbWVudC5maW5kKFwiLmdncmlkLlwiICsgdGhpcy5jbGFzc0dyaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGRhdGEubGVuZ3RoID09IDAgPyBudWxsIDogZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWNpIG9iamVrdCBncmlkdSBwcm8gZGV0YWlsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldERldGFpbEdyaWQoKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IG51bGwge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZWxlbWVudC5maW5kKFwiLmdncmlkLlwiICsgdGhpcy5jbGFzc0RldGFpbEdyaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGRhdGEubGVuZ3RoID09IDAgPyBudWxsIDogZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgaW5pdFBvcGlzKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLiRwb3Bpc1RhYiA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMTEwMDIxNFwiLCAvL1JDIDMxMTAwMjE0IDogUG9waXNcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRoaXMudGFiU2V0dGluZ3MucG9waXNPcGVuZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9hZDogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBmYWxzZTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBvcGVuOiAoKSA9PiB7IHRoaXMudGFiU2V0dGluZ3MucG9waXNPcGVuZWQgPSB0cnVlOyB0aGlzLnVwZGF0ZVNldHRpbmdzKCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLiRwb3Bpc1RhYi5oYXNDbGFzcyhcImpzLWlzLWNvbnRlbnRjbG9zaW5nXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFiU2V0dGluZ3MucG9waXNPcGVuZWQgPSBmYWxzZTsgdGhpcy51cGRhdGVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMub3B0aW9ucy50eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFphcGlzIHx8IHRoaXMub3B0aW9ucy50eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5vcHRpb25zLnZpZXdNb2RlID09PSBcImZ1bGxcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5vcHRpb25zLmdsb2JhbHM/LlBvdm9sZW5pRWRpdGFjZVphcGlzdURva2xhZHUgPyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLm9wdGlvbnMuZ2xvYmFscz8uUG92b2xlbmlFZGl0YWNlUG9waXN1VUNURG9rbGFkdSAmJiB0aGlzLm9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IHRoaXMub3B0aW9ucy5nbG9iYWxzPy5Qb3ZvbGVuaUVkaXRhY2VQb3Bpc3VST1pEb2tsYWR1ICYmIHRoaXMub3B0aW9ucy50eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFphcGlzKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE9wcmF2aXQqXCIsIFwiYWN0VWxveml0KlwiLCBcImFjdFpydXNpdCpcIl0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy86IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyh0aGlzLm9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpcyB8fCB0aGlzLm9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyYmIHRoaXMub3B0aW9ucy52aWV3TW9kZSA9PT0gXCJmdWxsXCIgJiYgdGhpcy5vcHRpb25zLmdsb2JhbHM/LlBvdm9sZW5pRWRpdGFjZVphcGlzdURva2xhZHUgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE9wcmF2aXRTUCpcIiwgXCJhY3RVbG96aXRTUCpcIiwgXCJhY3RacnVzaXRTUCpcIl0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJHBvcGlzVGFiLm9uKFwiY29udGVudGNsb3NlXCIsIChldikgPT4geyB0aGlzLiRwb3Bpc1RhYi5hZGRDbGFzcyhcImpzLWlzLWNvbnRlbnRjbG9zaW5nXCIpOyB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vTk9URSAoQk0pOiBVIGd0YWJ1IG5lbHplIGplZG5vem5hY2UgcG96bmF0LCBqZXN0bGkgamVqIHphdnJlbCB1eml2YXRlbCBrbGlrbnV0aW0gbmEgemFobGF2aSBuZWJvIHNlIHphY2FsIHphdmlyYXRcclxuICAgICAgICAgICAgLy8gICAgICAgICAgIHYgc291dmlzbG9zdGkgcyBvZHNyYW5lbmkgcyBET00uIFByb3RvIGJ5bGEgcHJpZGFuYSB2eXBvbW9jIHByZXMgY2xhc3N1ICdqcy1pcy1jb250ZW50Y2xvc2luZycuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVBvcGlzKHBvcGlzOiBHUG9waXNEb2tsYWR1RHRvKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBvcGlzVGFiLmVtcHR5KCkuZ2NvbnRlbnQoR29yZGljLlVjci5XZWJDbGllbnQuR1BvcGlzUmFka3VDb250cm9sKTtcclxuICAgICAgICAgICAgJC5jb250ZW50PEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdQb3Bpc1JhZGt1Q29udHJvbD4odGhpcy4kcG9waXNUYWIpLmluaXQoeyBwb3BpczogcG9waXMgfSk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuJHBvcGlzVGFiLmhhc0NsYXNzKFwiZ3RhYlwiKSkgdGhpcy4kcG9waXNUYWIuZ3RhYihcImxvYWRDb21wbGV0ZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0U3RhdlJhZGt1KGR0bzogR1N0YXZSYWRrdUR0byk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGR0byk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnZpZXdNb2RlID09PSBcImZ1bGxcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkdG8uc3RhdnkgfHwgW10pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldERldGFpbEdyaWQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3B0aW9ucy52aWV3TW9kZSA9PT0gXCJwcmV2aWV3XCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXREZXRhaWxHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBncmlkLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCB0aGlzLmNyZWF0ZVByZXZpZXdGb3JtKGR0by5zdGF2eSB8fCBbXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHRXJyb3IoXCJOb3RTdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldFphcGlzUmFka3UoZHRvOiBHWmFwaXNSYWRrdUR0byk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGR0byk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnZpZXdNb2RlID09PSBcImZ1bGxcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkdG8uc3RhdnkgfHwgW10sIHsga2V5OiBcIm5hbWVcIiB9KTtcclxuICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXREZXRhaWxHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJyZWZyZXNoXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3B0aW9ucy52aWV3TW9kZSA9PT0gXCJwcmV2aWV3XCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXREZXRhaWxHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBncmlkLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCB0aGlzLmNyZWF0ZVByZXZpZXdGb3JtKGR0by5zdGF2eSB8fCBbXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVByZXZpZXdGb3JtKHN0YXZ5OiBHU3RhdlJhZGt1VmFsRHRvW10pOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0zLTktMCwgTS0zLTktMCwgUy0xMi0xMi0wLCBicmVha3MtMzAwLTUwMFwifSk7XHJcbiAgICAgICAgICAgIHN0YXZ5ID0gc3RhdnkgfHwgW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhdnkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzID0gc3RhdnlbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIXMudmFsMSlcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGxldCBmb3JtYXR0ZWRWYWwgPSBgJHtzLnZhbDF9YDtcclxuICAgICAgICAgICAgICAgIGlmIChzLnZhbDIpXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsICs9IGAtJHtzLnZhbDJ9YDtcclxuICAgICAgICAgICAgICAgIGZvcm0uYWRkUm93KHMubmFtZSEpLmFkZFRleHQoZm9ybWF0dGVkVmFsLCBcImJvbGRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZVNldHRpbmdzKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRhYlNldHRpbmdzKSAvL1YgcHJpcGFkZSBzZXRudXRpIHNldHRpbmdzIHogdmVua3UgYnkgc2UgbmVtZWxvIG5hc3RhdmVuaSB1a2xhZGF0IC0gcG91eml2YW0gdiBwcmV2aWV3IG5hIEdTZXpuYW1Fa29aYXpuYW11IHBybyBvdGV2cmVuaSBrbC4gemtyYXRrb3UgJy8nXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMudXNlclNldHRpbmdzLnNldChcInRhYlNldHRpbmdzXCIsIHRoaXMudGFiU2V0dGluZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkR3JpZERva2xhZCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5vcHRpb25zLnR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX05lemFyYXplbmVfemFwaXN5XHJcbiAgICAgICAgICAgICAgICB8fCB0aGlzLm9wdGlvbnMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3J2ID0gdGhpcy5zcnYoKTtcclxuICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBuYWN0aVBvcGlzID0gdHlwZW9mIHRoaXMub3B0aW9ucy5ncmlkRm9ybWF0LmNvbHVtbnMuZmluZCgoaXRlbSkgPT4gaXRlbS5uYW1lID09IFwicGRva1wiICYmICFpdGVtLmhpZGRlbikgIT09IFwidW5kZWZpbmVkXCI7XHJcbiAgICAgICAgICAgICAgICBzcnYuY2FsbChcIkdldERhdGFcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGY6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiB0aGlzLm9wdGlvbnMuZmlsdGVyLCBlbGVtZW50eTogbnVsbCwgZmlsdGVyU3RyUG9waXM6IG51bGwsIHNraXBTdW1MaW1pdDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8sIHBvcGlzRG9rbGFkdTogbmFjdGlQb3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwic2V0RGF0YVwiLCBuZXcgR29yZGljLkRhdGEuVmlldyhkLlNlem5hbVphcGlzdSksIHRydWUpOyByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgobXlFcnJvcjogRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG15RXJyb3IgaW5zdGFuY2VvZiBHU2VydmVyRXJyb3IgJiYgbXlFcnJvci5kYXRhICYmIG15RXJyb3IuZGF0YS5zdW1MaW1pdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlFcnJvci5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5hbGVydChcIkluZm9cIiwgXCJWZWxrw6kgbW5vxb5zdHbDrSB6w6FwaXPFryB7MH0uIE5lYnVkb3UgbmFocsOhbnkuXCIuZm9ybWF0KG15RXJyb3IuZGF0YS5zdW1MaW1pdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNydi5jbG9zZSgpOyB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVsb2FkWmFwaXNSYWRrdSkge1xyXG4gICAgICAgICAgICAgICAgLy8gcG9rdWQganNlbSB6bWVuaWwgemFwaXMgcmFka3UsIHRhayBqZSBwb3RyZWJhIGhvIHpub3Z1IG5hY3RpdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHsgcmVzdWx0OiB0aGlzLm9wdGlvbnMucm93fSkucHJvbWlzZSgpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
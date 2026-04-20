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
            let GDetailPozadavkuControl = class GDetailPozadavkuControl extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.taskId = "detailPozAct";
                    this.title = "jres:31100159"; //RC 31100159 : Detail požadavku
                    this.logOptions = { name: "GDetailPozadavkuControl", fileName: "GDetailPozadavkuControl.ts", authorCode: 311 };
                }
                onContentReady() {
                    var pozadavek = this.pozadavek;
                    this.options = this.options || {};
                    this.readOnly = !!this.options.readOnly;
                    this.isOdlozeny = !!this.options.porCisKud;
                    this.isObdobiChanging = false;
                    this.generatorOptions = {
                        reportGeneratorType: "Gordic.Ucr.WebClient.GUcrPozadavekGenerator",
                        waitToAsync: 1,
                        parentContent: this
                    };
                    //#region Menu/CommandBary
                    this.vystupAct = this.actions.add(GAction.createPrintAction({
                        name: "vystupAct",
                        tema: "ucr_ptm_ucrbase",
                        caption: "jres:31100048", //RC 31100048 : Výstup
                        title: "jres:31100213", //RC 31100213 : Vyberte sestavu
                        selectReportOnly: true,
                        reportId: this.pozadavek.Wrid || "",
                        dialogClosed: (ev, repInfo) => { if (repInfo)
                            this.setOutput(repInfo); },
                        schedulingDisabled: true,
                        parentContent: this
                    }));
                    this.vystupSelectorAct = this.actions.add({
                        name: "vystupSelectorAct",
                        icon: this.vystupAct.icon,
                        caption: "jres:31100048", //RC 31100048 : Výstup
                        title: "jres:31100213", //RC 31100213 : Vyberte sestavu
                        run: (ev, ctx) => { this.findFields("Wrid").gselectbox("getButton", "selector").click(); }
                    });
                    let that = this;
                    this.omezeniAct = this.actions.add({
                        name: "omezeniAct",
                        caption: "jres:30250576", //RC 30250576 : Pevné omezení
                        enabled: true,
                        run: (ev, ctx) => {
                            that.dialogs.showModalWindow("Gordic.Ucr.WebClient.GSeznamOmezeni", {}, "jres:30250575", 600, 400, true) //RC 30250575 : Pevné omezení
                                .on("close", function (ev, ctx) {
                            });
                        }
                    });
                    this.odlozAct = this.actions.add(new GAction({
                        name: "odlozAct",
                        icon: "gi-time",
                        caption: "jres:31100173", //RC 31100173 : Odložit
                        enabled: false,
                        visible: this.globals.Rad_ODLEnabled,
                        run: (ev, ctx) => {
                            this.collectValues().then((poz) => { this.scheduleReport(poz); });
                        }
                    }));
                    this.generovatAct = this.actions.add({
                        name: "generovatAct",
                        icon: "gi-print",
                        caption: "jres:31100162", //RC 31100162 : Generovat
                        enabled: false,
                        run: (ev, ctx) => {
                            this.collectValues().then((poz) => { this.generateReport(poz, this); });
                        }
                    });
                    this.generovatAsyncAct = this.actions.add({
                        name: "generovatAsyncAct",
                        icon: "gi-doruc|gi-doruc gi-rot180",
                        caption: "jres:31100284", //RC 31100284 : Generovat asynchronně
                        enabled: false,
                        visible: !!this.prop("DebugOrDevelopVersion"),
                        run: (ev, ctx) => {
                            this.collectValues().then((poz) => { this.generateReportAsync(poz, this); });
                        }
                    });
                    //this.saveAct = this.actions.add({
                    //    name: "saveAct",
                    //    icon: "gi-save",
                    //    caption: "jres:31100160",   //RC 31100160 : Uložit
                    //    enabled: false,
                    //    run: (ev, ctx) => {
                    //        this.collectValues().then((poz) => { this.save(poz); });
                    //    }
                    //});
                    this.saveAct = this.actions.add({
                        name: "saveAct",
                        icon: "gi-save",
                        caption: "jres:31100160", //RC 31100160 : Uložit
                        enabled: false,
                        run: (ev, ctx) => {
                            this.collectValues().then((poz) => { this.saveNew(poz); });
                        }
                    });
                    //this.actions.add({
                    //    name: "saveAct2",
                    //    icon: "gi-save",
                    //    caption: "Nove ulozeni",   //RC 31100160 : Uložit
                    //    enabled: true,
                    //    run: (ev, ctx) => {
                    //        this.collectValues().then((poz) => { this.saveNew(poz); });
                    //    }
                    //});
                    this.saveNewAct = this.actions.add({
                        name: "saveNewAct",
                        icon: "gi-save|gi-plus gi-stack-fw gi-bgw",
                        caption: "jres:31100276", //RC 31100276 : Uložit nový
                        enabled: false,
                        run: (ev, ctx) => {
                            this.collectValues()
                                .then((poz) => {
                                poz.IxsSes = null;
                                this.save(poz);
                            });
                        }
                    });
                    this.selectOnlyAct = this.actions.add({
                        name: "selectOnlyAct",
                        caption: GDlg.mbbOk.text,
                        enabled: this.isOdlozeny,
                        run: (ev, ctx) => {
                            this.collectValues().then((poz) => { this.close({ pozadavek: poz }); });
                        }
                    });
                    this.maskaDetailsAct = this.actions.add({
                        name: "maskaDetailsAct",
                        icon: "gi-detail",
                        caption: "jres:31100156", //RC 31100156 : Detail
                        run: (ev, ctx) => { this.showMaskaDetail(); }
                    });
                    this.newMaskaAct = this.actions.add({
                        name: "newMaskaAct",
                        icon: "gi-save",
                        caption: "jres:31100208", //RC 31100208 : Uložit elementy jako nový filtr
                        run: (ev, ctx) => { this.createNewMaska(); }
                    });
                    this.clearElementsAct = this.actions.add({
                        name: "clearElmAct",
                        icon: "gi-window-close",
                        run: (ev, ctx) => { $(ev.target).closest(".gfield").gfield("clear"); }
                    });
                    this.actions.addRange([
                        {
                            name: "closeDlgAct",
                            caption: "jres:31100168", //RC 31100168 : Zavřít
                            run: (ev, ctx) => { this.close(); }
                        }
                    ]);
                    this.menuBar([
                        //{ action: this.vystupAct, favorite: true },
                        { action: this.vystupSelectorAct, favorite: true },
                        { action: this.odlozAct, favorite: true },
                        { action: this.newMaskaAct, favorite: true },
                        { action: this.omezeniAct, favorite: true },
                        { action: this.generovatAsyncAct }
                    ]);
                    this.commandBar([
                        { action: this.selectOnlyAct, primary: this.isOdlozeny, visible: this.isOdlozeny },
                        { action: this.generovatAct, primary: !this.isOdlozeny },
                        { action: this.saveAct, visible: !this.isOdlozeny, children: [{ action: this.saveNewAct, visible: !this.isOdlozeny }] },
                        //{ action: this.actions.saveAct2, visible: !this.isOdlozeny, children: [{ action: this.saveNewAct, visible: !this.isOdlozeny }] },
                        { action: this.actions.closeDlgAct }
                    ]);
                    //#endregion
                    this.actions.vystupAct.parentContent = this; //kvuli zavreni dialogu
                    var $header = this.$header = $.newDiv()
                        .addClass("detail-header")
                        .addClass(this.isOdlozeny ? "hidden" : "")
                        .appendTo(this.element);
                    $header
                        .gform("setup", { layoutDescriptor: "L1M1S1" })
                        .addClass("js-header-poz-form")
                        .gformsection("create", "")
                        .gformrow("addFieldsRow", "jres:31100019").gstringbox({ name: "Nazev", disabled: this.readOnly }) //RC 31100019 : Název
                        .gformrow("addFieldsRow", "jres:31100014").gstringbox({ name: "Poznamka", disabled: this.readOnly }) //RC 31100014 : Poznámka
                        .gformrow("addFieldsRow", "jres:31100166").gradio({
                        name: "TypPozadavku",
                        initialValue: pozadavek.TypPozadavku,
                        disabled: this.readOnly,
                        radios: [{
                                value: 10 /* Gordic.Uct.Interface.GUcrTypMasky.Osobni */,
                                label: "jres:31100003" //RC 31100003 : Osobní
                            }, {
                                value: 0 /* Gordic.Uct.Interface.GUcrTypMasky.Verejna */,
                                label: "jres:31100020" //RC 31100020 : Veřejný
                            }]
                    });
                    var topoFactors = [
                        { icon: "&#61;", factor: TopoFactors.Eq, caption: "jres:31100277" }, //RC 31100277 : Je rovno
                        { icon: "&#8800;", factor: TopoFactors.NonEq, caption: "jres:31100278" } //RC 31100278 : Nerovná se
                    ];
                    var topoFactorOpts = { iconsOnly: true };
                    var topoFactorChanged = (fieldName, factorType) => {
                        this.findFields(fieldName).gcheck("setValue", factorType === TopoFactors.NonEq ? true : false);
                    };
                    var $pozTab = this.$pozTab = $.newDiv().appendTo(this.element);
                    var $pozParTab = this.$pozParTab = $.newDiv().appendTo(this.element);
                    var $pozFiltrTab = this.$pozFiltrTab = $.newDiv().appendTo(this.element);
                    const userSettingPoz = "pozTab";
                    const userSettingPar = "pozPar";
                    const userSettingfiltr = "pozFiltr";
                    const filterTypOseKsNotIn = new Array();
                    const filterTypOseKs = { o: "NOT IN", v: filterTypOseKsNotIn };
                    switch (this.globals.RezimProvozu) {
                        case 30 /* Gordic.Uct.Interface.GUcrRezimProvozu.ICO */:
                            filterTypOseKsNotIn.push("ico", "rar");
                            break;
                        case 20 /* Gordic.Uct.Interface.GUcrRezimProvozu.UCS */:
                            filterTypOseKsNotIn.push("ico", "rar", "ucs");
                            break;
                        case 10 /* Gordic.Uct.Interface.GUcrRezimProvozu.NKS */:
                            filterTypOseKsNotIn.push("ico", "rar", "ucs", "uus", "nks");
                            break;
                        case 40 /* Gordic.Uct.Interface.GUcrRezimProvozu.SOR */:
                            if (this.globals.TypSumarizace === 1 /* Gordic.Uct.Interface.GUcrTypSumarizace.Externi */)
                                filterTypOseKsNotIn.push("ico", "ucs", "uus", "nks");
                            else
                                filterTypOseKsNotIn.push("rar");
                            break;
                        default: throw new GError("notSupported"); //Pro sichr 
                    }
                    //var openPoz = this.userSettings!.get("pozTab", true);
                    //var openPar = this.userSettings!.get("pozPar", true);
                    //var openzFiltr = this.userSettings!.get("$pozFiltrTab", true);
                    $pozTab
                        .gform("setup", { layoutDescriptor: "L1M1S1" })
                        .addClass("js-poz-form")
                        .gtab({
                        title: "jres:31100022", opened: this.userSettings?.getDef(userSettingPoz, true) ?? false,
                        open: () => this.userSettings?.set(userSettingPoz, true),
                        close: () => this.userSettings?.set(userSettingPoz, false)
                    }) //RC 31100022 : Požadavek
                        .gformsection("create", "" /* "???Název této sekce???" */)
                        .gformrow("addFieldsRow", "jres:31100167", ["w-6", "w-6"]) //RC 31100167 : Účetní období (rok, měsíc)
                        .gselectbox(Gordic.Prefabs.Select.ucrRok(), {
                        name: "Rok", model: "model.Rok=value.rok", disabled: !this.options.allowChangeObd,
                        flag: this.options.allowChangeObd ? Gordic.Prefabs.Field.Flags.required : undefined,
                        change: (ev, ctx) => { this.onObdobiChanged(); }
                    })
                        .next()
                        .gselectbox(Gordic.Prefabs.Select.ucrMesic(), {
                        name: "Mesic",
                        model: "model.Mesic=value.mesic",
                        emptyValue: { mesic: null, mesic_txt: " " },
                        serverFilters: { rok: new Gordic.Forms.Dependency("Rok", "rok", true) },
                        dropdown: true,
                        change: (ev, ctx) => { this.onObdobiChanged(true); },
                        flag: Gordic.Prefabs.Field.Flags.required
                    })
                        .gformrow("addFieldsRow", "jres:31100048") //RC 31100048 : Výstup
                        .gselectbox(Gordic.Prefabs.Select.reports({
                        reportsOptions: () => {
                            const params = this.vystupAct.getReportTreeControlParams();
                            //V UCR preselected asi nedava smyl - pokud by uzivatel chtel porad dokola generovat
                            //stejnou sestavu ve stejnem formatu, tak by si asi ulozil pozadavek.
                            params.PreselectVisible = false;
                            return params;
                        },
                    }), {
                        name: "Wrid",
                        disabled: true,
                        model: "model.Wrid=value.reportId,model.ReportInfo.reportInfo.nazev=>value.name,model.ReportInfo.reportInfo.idSes=>value.idSes",
                        strict: true,
                        modelOptions: { verificationNeeded: false },
                        flag: Gordic.Prefabs.Field.Flags.required,
                        change: (ev, v) => {
                            if (v.value) {
                                this.findFields("OutputStyleName,elements,ixs_msk_uzi").gfield("enable").gselectbox("clearClientCache");
                                this.setOutput(v.value.meta ? v.value.meta : Gordic.Report.WebClient.GReportTreeControlTS.ToIGPrintActionReportInfo(v.value));
                            }
                            else {
                                //this.pozadavek.Wrid = null;
                                //this.pozadavek.OutputStyle = null;
                                //this.pozadavek.OutputStyleName = null;
                                delete this.pozadavek.ReportInfo;
                                delete this.pozadavek.OutputStyle;
                                delete this.pozadavek.elements;
                                this.findFields("OutputStyleName,elements,ixs_msk_uzi").gfield("clear").gfield("disable");
                            }
                            this.updateActionsState();
                        }
                    })
                        .gformrow("addFieldsRow", "jres:31100225") //RC 31100225 : Typ výstupu
                        .gselectbox(Gordic.Prefabs.Select.reportFormats({ related: this.element }), {
                        name: "OutputStyleName",
                        model: "model.Wrid=>value.reportId,model.OutputStyleName=value.description,model.OutputStyle=value.extension",
                        disabled: true,
                        serverFilters: {
                            reportId: new Gordic.Forms.Dependency("Wrid", "reportId", true),
                            reportInfo: () => { return this.actualReportInfo; },
                            platnost: () => {
                                if (!this.pozadavek.platnost)
                                    return this.updateVystupActEkoDate().then((p) => { return p.Platnost.platnost; });
                                return this.pozadavek.platnost;
                            },
                            meta: new Gordic.Forms.Dependency("Wrid", "meta", true)
                        }
                    })
                        .gformrow("addFieldsRow", "jres:31100034", ["w-6", "w-6"]) //RC 31100034 : Zobrazení
                        .gcheck({ name: "VyberovaMaska", label: "jres:31100035", initialValue: !!pozadavek.VyberovaMaska }) //RC 31100035 : Výběrová maska
                        .next()
                        .gcheck({ name: "VlastniZahlavi", label: "jres:31100036", initialValue: !!pozadavek.VlastniZahlavi, customClass: (this.globals.VlastniZahlavi ? "visible" : "hidden") }) //RC 31100036 : Vlastní záhlaví
                    ;
                    $pozParTab
                        .gform("setup", { layoutDescriptor: "L1M1S1" })
                        .addClass("js-poz-form")
                        .gtab({
                        title: "jres:30250535", opened: this.userSettings?.getDef(userSettingPar, true) ?? false,
                        open: () => this.userSettings?.set(userSettingPar, true),
                        close: () => this.userSettings?.set(userSettingPar, false)
                    }) //RC 30250535 : Parametry sestavy
                        .gformsection("create", "" /* "jres:31100024" */)
                        .gformrow("addFieldsRow", "", ["w-11", "w-1", "w-1"])
                        .gformtext("")
                        .next()
                        //.gformtext("<span class='hidden'>N</span>")
                        //.next()
                        .gformtext("<span style='margin-left: 5px;'>Σ</span>")
                        .gformrow("addFieldsRow", "jres:31100046", ["w-11", "w-1", "w-1"]) //RC 31100046 : SES
                        .gselectbox(Gordic.Eko.Prefabs.obecneSeskupeni({
                        rokMesicFunc: (elm) => { return $.Deferred().resolve(this.pozadavek.platnost).promise(); },
                        typOseKs: filterTypOseKs
                    }), {
                        name: "ses",
                        disabled: true,
                        model: "model.ses=value.ixs_ose",
                        factors: topoFactors,
                        factorOptions: topoFactorOpts,
                        factorChange: function (ev, factor) { topoFactorChanged("ses_n", factor.factor); }
                    })
                        .next()
                        .gcheck({ name: "ses_n", customClass: "hidden" })
                        .gformrow("addFieldsRow", Gordic.Consts.DbShortcuts.ico, ["w-11", "w-11", "w-1", "w-1"])
                        .gselectbox(Gordic.Prefabs.Select.ekosico(), {
                        name: "ico",
                        model: "model.ico=value.ico",
                        disabled: this.readOnly,
                        factors: topoFactors,
                        factorOptions: topoFactorOpts,
                        factorChange: function (ev, factor) { topoFactorChanged("ico_n", factor.factor); }
                    }).toggle(!this.externiSumarizace)
                        .next()
                        .gselectbox(Gordic.Prefabs.Select.ekosrar(), {
                        name: "icoExt",
                        model: "model.IcoExt=value.ico",
                        disabled: this.readOnly,
                        factors: topoFactors,
                        factorOptions: topoFactorOpts,
                        serverFilters: {
                            //akt_prohl: () => { return 100; }, //NOTE: (BM): padalo na vyjimku pri otevreni selectoru
                            aktivita: () => { return null; }
                        }
                    }).toggle(this.externiSumarizace)
                        .next()
                        .gcheck({ name: "ico_n", customClass: "hidden" })
                        .next()
                        .gcheck({ name: "ico_s", disabled: true })
                        .gformrow("addFieldsRow", Gordic.Consts.DbShortcuts.ucs, ["w-11", "w-1", "w-1"])
                        .gselectbox(Gordic.Prefabs.Select.ekosucs(), {
                        name: "ucs",
                        model: "model.ico=>value.ico; model.ucs=value.ucs",
                        itemTemplate: "{ucs:trim:encode}",
                        helperColumns: ["ucs", "nazev"],
                        disabled: this.readOnly,
                        factors: topoFactors,
                        factorOptions: topoFactorOpts,
                        factorChange: function (ev, factor) { topoFactorChanged("ucs_n", factor.factor); },
                        change: function (ev, o) {
                            let $uus = $(this).closest(".gform").findFields("uus");
                            if (!o.value) {
                                $uus.gfield("clear");
                                return;
                            }
                            $uus.gfield("getValueAsync")
                                .then((uusVal) => {
                                if (!uusVal)
                                    return;
                                if (uusVal.ucs !== o.value?.ucs)
                                    $uus.gfield("clear", { triggerChange: false });
                            });
                        }
                        //NOTE: Toto nelze pouzit, protoze zavislost pak maze nastavene hodnoty
                        //serverFilters: { ico: new Gordic.Forms.Dependency(!this.externiSumarizace ? "ico" : "icoExt", "ico", false) } 
                    })
                        .next()
                        .gcheck({ name: "ucs_n", customClass: "hidden" })
                        .next()
                        .gcheck({ name: "ucs_s", disabled: true })
                        .gformrow("addFieldsRow", Gordic.Consts.DbShortcuts.uus, ["w-11", "w-1", "w-1"])
                        .gselectbox(Gordic.Prefabs.Select.ekosuus(), {
                        name: "uus",
                        model: "model.ico=>value.ico; model.ucs=>value.ucs; model.uus=value.uus",
                        itemTemplate: "{uus:trim:encode}",
                        disabled: this.readOnly,
                        factors: topoFactors,
                        factorOptions: topoFactorOpts,
                        factorChange: function (ev, factor) { topoFactorChanged("uus_n", factor.factor); },
                        change: (ev, o) => {
                            if (this.globals.RezimProvozu === 20 /* Gordic.Uct.Interface.GUcrRezimProvozu.UCS */)
                                return;
                            let $ucs = this.findFields("ucs");
                            if (!o.value) {
                                $ucs.gfield("clear");
                                return;
                            }
                            if (o.flags.valid)
                                $ucs.gfield("model", "apply", { ico: o.value.ico, ucs: o.value.ucs }, { setFlags: { triggerChange: false } });
                        }
                        //NOTE: Toto nelze pouzit, protoze zavislost pak maze nastavene hodnoty
                        //serverFilters: {
                        //    ico: new Gordic.Forms.Dependency(!this.externiSumarizace ? "ico" : "icoExt", "ico", false),
                        //    ucs: new Gordic.Forms.Dependency("ucs", "ucs", false)
                        //}
                    })
                        .next()
                        .gcheck({ name: "uus_n", customClass: "hidden" })
                        .next()
                        .gcheck({ name: "uus_s", disabled: true })
                        .gformrow("addFieldsRow", Gordic.Consts.DbShortcuts.nks, ["w-11", "w-1", "w-1"])
                        .gselectbox(Gordic.Prefabs.Select.ekosnks(), {
                        name: "nks",
                        model: "model.ico=>value.ico; model.nks=value.nks",
                        itemTemplate: "{nks:trim:encode}",
                        disabled: this.readOnly,
                        factors: topoFactors,
                        factorOptions: topoFactorOpts,
                        factorChange: function (ev, factor) { topoFactorChanged("nks_n", factor.factor); },
                        //NOTE: Toto nelze pouzit, protoze zavislost pak maze nastavene hodnoty
                        //serverFilters: { ico: new Gordic.Forms.Dependency(!this.externiSumarizace ? "ico" : "icoExt", "ico", false) }
                    })
                        .next()
                        .gcheck({ name: "nks_n", customClass: "hidden" })
                        .next()
                        .gcheck({ name: "nks_s", disabled: true })
                        .gformrow("addFieldsRow", "jres:31100029") //RC 31100029 : Přístup ke členům seskupení
                        .gradio({
                        name: "flagSouhrne",
                        disabled: true,
                        radios: [{ value: "True", label: "jres:31100030" }, //RC 31100030 : Souhrnný
                            { value: "False", label: "jres:31100031" }] //RC 31100031 : Jednotlivý
                    });
                    $pozFiltrTab
                        .gform("setup", { layoutDescriptor: "L1M1S1" })
                        //.addClass("js-poz-form")
                        .gtab({
                        title: "jres:30250536", opened: this.userSettings?.getDef(userSettingfiltr, true) ?? false,
                        open: () => this.userSettings?.set(userSettingfiltr, true),
                        close: () => this.userSettings?.set(userSettingfiltr, false)
                    }) //RC 30250536 : Filtry
                        .gformsection("create", "") //Maska
                        .gformrow("addFieldsRow", "jres:31100203") //Maska uzivatelska //RC 31100203 : Uložený filtr
                        .gselectbox({
                        name: "ixs_msk_uzi",
                        disabled: true,
                        itemTemplate: "{gfilterpanel_name}",
                        model: "model.ixs_msk_uzi=value.ixs_mas,model.msk_uzi_nazev=value.gfilterpanel_name,model.elements=>value.elementy.filters",
                        buttons: [{ action: this.maskaDetailsAct, captionVisible: "never" }],
                        selector: () => { return this.showSeznamMasek(); },
                        strict: true,
                        data: () => {
                            let options = this.getServiceOptions();
                            if (!options.typSestavy)
                                return $.Deferred().reject().promise();
                            //let dataPromise = new GUcrMaskaService(this.getServiceOptions()).getFilters({ aktivita: 100 });
                            let dataPromise = that.isl.UcrFiltr.read({ ixs_msk: that.pozadavek.ixs_msk_uzi })
                                .getData().then((result) => {
                                debugger;
                                return [result];
                            });
                            return new Gordic.Data.View(dataPromise, { key: "ixs_mas" });
                        },
                        helperColumns: ["gfilterpanel_name", "zkratka"],
                        change: (ev, d) => {
                            let filters = d?.value?.elementy?.filters;
                            this.pozadavek.elements = filters;
                            if (filters) {
                                this.updateElements(this.pozadavek); /*this.findFields("elements").gfield("model", "apply", filters);*/
                            } //NOTE: Je nutne to delat pres updateElements() - na zacatku nevim gridformat
                            else
                                this.findFields("elements").gfield("clear");
                        }
                    })
                        //tady chybi jeste pevna maska "Pevna k ..."
                        .gformrow("addFieldsRow", "jres:31100023" /*, ["w-11"]*/) //RC 31100023 : Elementy
                        .gselectbox({ name: "elements", disabled: true, model: "model.nesmyslnaHodnotaModelu=value" }) //NOTE: Model je jen fikce, aby se nezobrazovalo '[]'
                        .gformrow("addFieldsRow", `jres:31100234 ${this.globals.PlatnostPM}`) //RC 31100234 : Pevný k 
                        .gstringbox({ initialValue: this.globals.PevnaMaska.Name, disabled: true })
                        .gformrow("addFieldsRow", "jres:31100275") //RC 31100275 : Bez PAP
                        .gcheck({ name: "flagPap" });
                    this.findFields().gfield("model", "apply", pozadavek);
                    this.updateActionsState();
                    this.updateFieldsState();
                    //Novy pozadavek by mel mit oznaceny rok nebo mesic
                    if (!this.pozadavek.IxsSes) {
                        let $rok = this.findFields("Rok");
                        if ($rok.gfield("option", "disabled") === false)
                            $rok.gfield("focus");
                        else
                            this.findFields("Mesic").gfield("focus");
                    }
                    //this.findFields("VlastniZahlavi").addClass('hidden');
                }
                collectValues() {
                    let promises = new Array();
                    this.element.findForms().each((i, e) => {
                        let p = $(e).gform("waitForValues")
                            .then(() => {
                            if ($(e).gform("isValid"))
                                return $.Deferred().resolve().promise();
                            return $.Deferred().reject().promise();
                        });
                        promises.push(p);
                    });
                    return $.when(...promises)
                        .then(() => {
                        let poz = this.pozadavek;
                        let $fields = this.findFields();
                        $fields.gfield("model", "collect", poz);
                        this.log.trace("collectValues()", poz);
                        return poz;
                    });
                }
                generateReport(poz, gfrmNavContent) {
                    var genParams = {
                        reportId: poz.Wrid,
                        outputStyle: poz.OutputStyle,
                        platnost: poz.platnost,
                        generatorParams: poz,
                        props: { Platnost: poz.platnost },
                        reportGeneratorType: this.generatorOptions.reportGeneratorType
                    };
                    this._generateReport(genParams);
                }
                _generateReport(genParams) {
                    const cancellationToken = new GObservableObject({
                        cancelled: false,
                        uniqueClass: ""
                    });
                    const cancelAct = new GAction({
                        name: "repGenCancelAct",
                        caption: "jres:31100286", //RC 31100286 : Storno
                        run: function (ev) {
                            cancellationToken.update({ cancelled: true });
                            this.update({
                                caption: "jres:31100287", //RC 31100287 : Stornuji
                                enabled: false
                            });
                        }
                    });
                    const genCnt = this.createServiceContent([Gordic.Report.WebClient.GReportAsyncGenerator]);
                    genCnt.on("progress", (progress) => {
                        this.progressOperation({
                            text: Gordic.Report.WebClient.GReportTreeControlTS.formatProgressMessage(progress.text),
                            progress: progress.current,
                            total: progress.total,
                            cancelAction: cancelAct
                        });
                    });
                    this.beginOperation();
                    return genCnt.readyAwait
                        .then(() => { return genCnt.generate(genParams, cancellationToken); })
                        .then((res) => {
                        this.endOperation();
                        const ext = ((res.fileInfo?.filename ?? "").split(".")[1] ?? "").toLowerCase();
                        const document = new Gordic.Report.WebClient.GReportDocument(this);
                        const showBatchesIfAvailable = () => {
                            const r = res;
                            const rBatches = r?.fileInfo;
                            if (r && rBatches.files && rBatches.files.length) {
                                const res = {
                                    id: r.id,
                                    batchFiles: rBatches,
                                    dmsInfo: r.dmsInfo
                                };
                                return Gordic.Report.WebClient.GReportTreeControlTS.waitBatchFilesDialog(res, document, this); //Uklid je uvnitr
                            }
                            return $.when();
                        };
                        if (ext === "gfrm")
                            return $.when(showBatchesIfAvailable(), this.showGfrm(res, genParams, this.generatorOptions));
                        return document.downloadDocument(Gordic.Report.WebClient.GReportTreeControlTS.getDownloaderParams(res))
                            .then((rr) => {
                            if (rr?.CustomData?.dir) {
                                const rBatches = res?.fileInfo;
                                rBatches.directory = rr.CustomData.dir;
                            }
                            return { result: res, customData: rr.CustomData, showBatchesIfAvailable: showBatchesIfAvailable };
                        });
                    })
                        .then((ctx) => {
                        if (!ctx)
                            return;
                        return ctx.showBatchesIfAvailable().then(() => ctx);
                    })
                        .then(() => { })
                        .catch((r, s, ei) => {
                        if (r && Gordic.TypeGuards.isOfType(r, "genState")) {
                            r.handled = true;
                            if (r.genState === "cancel")
                                this.showFlash({
                                    customClass: "g-state-warning",
                                    label: "jres:31100171", //RC 31100171 : Generování sestavy bylo zrušeno uživatelem
                                });
                            else if (r.exception)
                                this.dialogs.showException(r.exception);
                        }
                        //NOTE: Ostatni pripady asi nechame klasicky spadnout.
                        throw r;
                    })
                        .always(() => { this.endOperation(); genCnt.close(); });
                }
                generateReportAsync(poz, gfrmNavContent) {
                    const genParams = {
                        reportId: poz.Wrid,
                        name: poz.Nazev ?? poz.ses ?? undefined,
                        outputStyle: poz.OutputStyle,
                        platnost: poz.platnost,
                        generatorParams: poz,
                        props: { Platnost: poz.platnost },
                        reportGeneratorType: this.generatorOptions.reportGeneratorType
                    };
                    const genOptions = {
                        persistent: true
                    };
                    const genCnt = this.createServiceContent([Gordic.Report.WebClient.GReportAsyncGenerator, { autoLoadParams: genOptions }]);
                    this.beginOperation();
                    genCnt.readyAwait
                        .then(() => { return genCnt.startGenerate(genParams); })
                        .always(() => { this.endOperation(); genCnt.close(); });
                }
                scheduleReport(poz) {
                    var r = {
                        reportId: poz.Wrid,
                        outputStyle: poz.OutputStyle,
                        platnost: poz.platnost,
                        generatorParams: poz,
                        props: { Platnost: poz.platnost }
                    };
                    var start = new Date();
                    start.setMinutes(start.getMinutes() + 15);
                    let odlozTaskName = poz?.ReportInfo?.reportInfo?.nazev ?? "";
                    if (odlozTaskName)
                        odlozTaskName += ` - ${poz?.ReportInfo?.reportInfo?.idSes ?? ""}`;
                    const mailSubject = "jres:31100282".format(odlozTaskName); //RC 31100282 : Generování sestavy: {0}
                    const schedulerOptions = {
                        report: Gordic.Report.WebClient.GReportUtils.convertParamsToGCreateReportDto(r),
                        reportSchedulerClassName: "Gordic.Ucr.WebClient.Reports.GUcrReportScheduler",
                        name: odlozTaskName,
                        mailSubject: mailSubject,
                        mailContent: "jres:31100283".format(mailSubject) //RC 31100283 : V příloze je uložena sestava generovaná v režimu odloženého zpracování modulu UCR05 GINIS - {0}
                    };
                    const cntInitOptions = {
                        init: (cnt) => { return new Gordic.Report.WebClient.GReportScheduler(cnt, schedulerOptions); }
                    };
                    this.navigate(Gordic.GClientContentInitializer, cntInitOptions) //Varianta s dedicnosti
                        .on("close", (ev, ret) => {
                        if (ret && ret.schedule) {
                            var schedule = ret.schedule;
                            this.showFlash(String.Format("jres:31100170", schedule.PorCisUlohy, schedule.IxsPoz)); //RC 31100170 : Požadavek na odložené zpracování byl uložen. Číslo úlohy {0}, ID {1}.
                        }
                    });
                }
                setOutput(ret) {
                    if (!ret)
                        return;
                    //this.log.trace("setOutput", ret);
                    this.collectValues()
                        .then((p) => { return this.call("GetUcrReportInfo", { dto: p }); })
                        .then((r) => {
                        let defaultFormat = r.reportInfo && r.reportInfo.outputInfo && r.reportInfo.outputInfo.selectedOutputTypeOrDefault || "";
                        this.pozadavek.OutputStyle = defaultFormat;
                        this.pozadavek.ReportInfo = r;
                        this.findFields("OutputStyleName")
                            .gfield("model", "apply", this.pozadavek, { verificationNeeded: true });
                        this.updateElements(this.pozadavek);
                        this.updateSumaceHro(r);
                        this.updateActionsState();
                        return;
                    });
                }
                onObdobiChanged(mesic = false) {
                    if (this.isObdobiChanging)
                        return;
                    this.isObdobiChanging = true;
                    this.updateVystupActEkoDate()
                        .then(() => {
                        return this.collectValues();
                    })
                        .then((poz) => { return this.validateReportPlatnost(poz); })
                        .always(() => { this.isObdobiChanging = false; });
                }
                updateVystupActEkoDate() {
                    this.beginOperation();
                    let rok$ = this.findFields("Rok");
                    let mesic$ = this.findFields("Mesic");
                    return rok$.add(mesic$).gform("waitForValues")
                        .then(() => {
                        let rokDto = rok$.gfield("getValue");
                        let mesicDto = mesic$.gfield("getValue");
                        if (!mesicDto || !mesicDto.mesic || mesicDto.mesic === null) {
                            this.clearVystup();
                            delete this.vystupAct.platnost;
                            this.pozadavek.platnost = null;
                            this.updateActionsState();
                            this.vystupAct.enabled(false);
                            this.vystupSelectorAct.enabled(false);
                            //this.$pozTab.findFields("ses").gfield("clear").gfield("disable");
                            this.$pozParTab.findFields("ses").gfield("clear").gfield("disable");
                            this.$pozTab.findFields("Wrid").gfield("disable");
                            return $.Deferred().reject().promise();
                        }
                        //return this.call<GUcrPlatnostDto>("GetPlatnost", { rok: rokDto.rok, mesic: mesicDto.mesic });
                        this.isl.UcrInfos.getInfo({ rok: rokDto.rok, mesic: mesicDto.mesic }).get()
                            .then((result) => {
                            this.log.trace("result", result);
                            this.vystupAct.platnost = result.Platnost?.platnost; //Pozor!: Cte se pri zobrazeni stromu sestav pres sestavove policko "Gordic.Prefabs.Select.reports()"
                            this.pozadavek.platnost = result.Platnost?.platnost;
                            //this.$pozTab.findFields("ses").gfield("enable");
                            this.$pozParTab.findFields("ses").gfield("enable");
                            this.updateActionsState();
                            this.vystupAct.enabled(true);
                            this.vystupSelectorAct.enabled(true);
                            this.$pozTab.findFields("Wrid").gfield("enable");
                            // zmena tooltipu
                            this.$pozTab.findFields("Mesic").gfield("option", "tooltip", result.MesicPopis);
                            return result;
                        });
                    })
                        //.then((p) => {
                        //    this.log.trace("platnost", p.platnost);
                        //    this.vystupAct.platnost = p.platnost; //Pozor!: Cte se pri zobrazeni stromu sestav pres sestavove policko "Gordic.Prefabs.Select.reports()"
                        //    this.pozadavek.platnost = p.platnost;
                        //    //this.$pozTab.findFields("ses").gfield("enable");
                        //    this.$pozParTab.findFields("ses").gfield("enable");
                        //    this.updateActionsState();
                        //    this.vystupAct.enabled(true);
                        //    this.vystupSelectorAct.enabled(true);
                        //    this.$pozTab.findFields("Wrid").gfield("enable");
                        //    return p;
                        //})
                        .always(() => { this.endOperation(); });
                }
                /** Update GUI na sumace + hro */
                updateSumaceHro(reportInfo) {
                    let sumatorySelector = "ico_s,ucs_s,uus_s,nks_s";
                    let hroSelector = "flagSouhrne";
                    if (!this.readOnly && reportInfo && reportInfo.umiSumace)
                        this.findFields(sumatorySelector).gfield("enable");
                    else
                        this.findFields(sumatorySelector).gfield("disable");
                    if (!this.readOnly && reportInfo && reportInfo.umiHro)
                        this.findFields(hroSelector).gfield("enable");
                    else
                        this.findFields(hroSelector).gfield("disable");
                }
                showGfrm(genRes, params, generatorOptions) {
                    let def = $.Deferred();
                    let gfrmOptions = {
                        Form: genRes.fileInfo.guid,
                        server: "Gordic.Report.WebClient.GFrmControl",
                        genRes: genRes,
                        generatorOptions: generatorOptions,
                        params: params
                    };
                    this.navigate(Gordic.Report.WebClient.GFrmControl, gfrmOptions, { width: 900, height: 600 })
                        .on("close", (ev, ctx) => { def.resolve(); });
                    return def.promise();
                }
                /** Uprava vykonnych akci podle stavu dto */
                updateActionsState() {
                    let platnost = this.vystupAct.platnost;
                    let enabled = this.findFields("Wrid").gfield("hasValue"); //!!this.pozadavek.Wrid;
                    this.generovatAct.enabled(enabled);
                    this.generovatAsyncAct.enabled(enabled);
                    this.saveAct.enabled(enabled && !this.isOdlozeny);
                    this.saveNewAct.enabled(enabled && !this.isOdlozeny && !!this.pozadavek.IxsSes);
                    this.selectOnlyAct.enabled(this.isOdlozeny);
                    this.odlozAct.enabled(enabled && !this.isOdlozeny && ((this.pozadavek?.ReportInfo?.reportInfo?.isOdlozitelne ?? false)));
                    this.newMaskaAct.enabled(enabled);
                    this.maskaDetailsAct.enabled(enabled);
                }
                updateFieldsState() {
                    //NOTE: Cele vychazi z TK, metody Gordic.ucr.WinClient.GGenerovaniSestavyControl.UpdateControlsState()
                    this.updateSumaceHro(this.pozadavek.ReportInfo);
                    //#region Inicializace
                    let initiallyEnabledSelector = "ico,icoExt,ucs,uus,nks";
                    let initiallyDisabledSelector = "ses";
                    if (this.readOnly) {
                        this.findFields(initiallyEnabledSelector).gfield("disable");
                        this.findFields(initiallyDisabledSelector).gfield("disable");
                        return;
                    }
                    this.findFields(initiallyEnabledSelector).gfield("enable");
                    this.findFields(initiallyDisabledSelector).gfield("disable");
                    //#endregion
                    let typOseKs;
                    switch (this.globals.RezimProvozu) {
                        case 40 /* Gordic.Uct.Interface.GUcrRezimProvozu.SOR */:
                            if (this.globals.TypSumarizace === 1 /* Gordic.Uct.Interface.GUcrTypSumarizace.Externi */) {
                                this.findFields("ucs,uus,nks").gfield("disable");
                                this.findFields("ico_s,ucs_s,uus_s,nks_s").gfield("disable").gcheck("setValue", false);
                                typOseKs = { o: "NOT IN", v: ["ico", "ucs", "uus", "nks"] };
                                break;
                            }
                            typOseKs = { o: "NOT IN", v: "rar" };
                            break;
                        case 30 /* Gordic.Uct.Interface.GUcrRezimProvozu.ICO */:
                            if (this.ekoParams.Ico) {
                                this.findFields("ico,icoExt").gfield("setValue", { ico: this.ekoParams.Ico }, { valid: false }).gfield("disable");
                                this.findFields("ico_s").gfield("disable").gcheck("setValue", false);
                                let $ucs = this.findFields("ucs");
                                let $uus = this.findFields("uus");
                                let $nks = this.findFields("nks");
                                let srvFilters = {
                                    ico: () => { return this.findFields(!this.externiSumarizace ? "ico" : "icoExt").gfield("getValue").ico; },
                                    akt_prohl: () => { return 100; },
                                    aktivita: () => { return null; }
                                };
                                //NOTE: Dle Skalice nelze pouzit Gordic.Forms.Dependency po vybudovani policek. Je to tam pry jen pro vytvoreni z definice
                                //      jeste pred tim, nez jsou vlozeny do DOM. Doporuceny je delegatovy zpusob
                                $ucs.gselectbox("option", "serverFilters", $.extend({}, srvFilters));
                                $uus.gselectbox("option", "serverFilters", $.extend({
                                    ucs: function () { return $ucs.gfield("getValueAsync").then((v) => { return v?.ucs ?? undefined; }); }
                                }, srvFilters));
                                $nks.gselectbox("option", "serverFilters", $.extend({}, srvFilters));
                            }
                            typOseKs = { o: "NOT IN", v: ["ico", "rar"] };
                            break;
                        case 20 /* Gordic.Uct.Interface.GUcrRezimProvozu.UCS */:
                            let $ucs = this.findFields("ucs");
                            let $uus = this.findFields("uus");
                            let $nks = this.findFields("nks");
                            let srvFilters = {
                                ico: () => { return this.findFields(!this.externiSumarizace ? "ico" : "icoExt").gfield("getValue").ico; },
                                akt_prohl: () => { return 100; },
                                aktivita: () => { return null; }
                            };
                            $uus.gselectbox("option", "serverFilters", $.extend({
                                ucs: function () { return $ucs.gfield("getValueAsync").then((v) => { return v?.ucs ?? undefined; }); }
                            }, srvFilters));
                            if (this.ekoParams.Ico) {
                                this.findFields("ico,icoExt").gfield("setValue", { ico: this.ekoParams.Ico }, { valid: false }).gfield("disable");
                                this.findFields("ico_s").gfield("disable").gcheck("setValue", false);
                                $nks.gselectbox("option", "serverFilters", $.extend({}, srvFilters));
                            }
                            if (this.ekoParams.Ico && this.ekoParams.Ucs) {
                                this.findFields("ucs").gfield("setValue", { ico: this.ekoParams.Ico, ucs: this.ekoParams.Ucs }, { valid: false }).gfield("disable");
                                this.findFields("ucs_s").gfield("disable").gcheck("setValue", false);
                            }
                            typOseKs = { o: "NOT IN", v: ["ico", "rar", "ucs"] };
                            break;
                        case 10 /* Gordic.Uct.Interface.GUcrRezimProvozu.NKS */:
                            if (this.ekoParams.Ico) {
                                this.findFields("ico,icoExt").gfield("setValue", { ico: this.ekoParams.Ico }, { valid: false }).gfield("disable");
                                this.findFields("ico_s").gfield("disable").gcheck("setValue", false);
                            }
                            if (this.ekoParams.Ico && this.ekoParams.Ucs) {
                                this.findFields("ucs").gfield("setValue", { ico: this.ekoParams.Ico, ucs: this.ekoParams.Ucs }, { valid: false }).gfield("disable");
                                this.findFields("ucs_s,uus_s,ucs_s").gfield("disable").gcheck("setValue", false);
                                this.findFields("uus").gfield("disable");
                            }
                            if (this.ekoParams.Ico && this.ekoParams.Nks) {
                                this.findFields("nks").gfield("setValue", { ico: this.ekoParams.Ico, nks: this.ekoParams.Nks }, { valid: false }).gfield("disable");
                                this.findFields("nks_s").gfield("disable").gcheck("setValue", false);
                            }
                            typOseKs = { o: "NOT IN", v: ["ico", "rar", "ucs", "uus", "nks"] };
                            break;
                        default:
                            throw new GError("NotImplemented...");
                    }
                    //(this.$pozTab.findFields("ses") as any).gfield("option", "typOseKs", typOseKs);
                    this.$pozParTab.findFields("ses").gfield("option", "typOseKs", typOseKs);
                }
                updateElements(poz) {
                    let gf = this.getElementFormat(poz);
                    if (!gf)
                        return;
                    let __this = this;
                    this.findFields("elements")
                        .gselectbox("destroy")
                        .gselectbox(Gordic.Eko.Prefabs.cfuElements({
                        name: "elements",
                        change: function () { __this.log.trace("elements change(): ", $(this).gfield("getValue")); },
                        gridFormat: gf,
                        checkUete: this.ekoParams.CheckUete,
                        canAddNewRecords: true,
                        canRemoveRecords: true,
                        //formatElementValue: Gordic.Eko.Prefabs.formatElementValuesMultiline,
                        createNewRecord: WebClient.GElementUtils.createNewElementFunc(this.globals.RezimProvozu, this.ekoParams),
                        clearRecord: WebClient.GElementUtils.createClearElementFunc(this.globals.RezimProvozu),
                        formatElementValueOptions: { skip: WebClient.GElementUtils.getElementValueSkipColumns(this.globals.RezimProvozu) },
                        buttons: [
                            { action: this.clearElementsAct, captionVisible: "never" },
                            { action: this.newMaskaAct, captionVisible: "never" }
                        ]
                    }))
                        .gselectbox("model", "apply", poz);
                }
                getElementFormat(poz) {
                    let typSestavy = poz.ReportInfo && poz.ReportInfo.typSestavy ? poz.ReportInfo.typSestavy : null;
                    if (!typSestavy)
                        return null;
                    var cfuSet = Gordic.Eko.CfuUtils.getCfuSetServerFilters(this, {
                        isRoz: true, //Tak to je v konstruktoru Gordic.Ucr.WinClient.GGenerovaniSestavyControl
                        isUct: true, //Tak to je v konstruktoru Gordic.Ucr.WinClient.GGenerovaniSestavyControl
                        ixsRoz: this.ekoParams.IxsRoz || undefined,
                        checkUete: this.ekoParams.CheckUete,
                        wildcard: this.Globals.Others?.Wildcard,
                    });
                    var gf = WebClient.GElementUtils.createElementsGridFormat({
                        typSestavy: typSestavy,
                        filterOptions: this.filterOptions,
                        filterParams: this.filterParams,
                        globals: this.globals,
                        cfuSet: cfuSet,
                        ekoParams: this.ekoParams
                    });
                    return gf;
                }
                save(poz) {
                    this.log.debug("save()", poz);
                    this.call("Save", { dto: poz })
                        .then((p) => {
                        this.pozadavek = p;
                        this.findFields().gfield("model", "apply", this.pozadavek);
                        this.showFlash("jres:31100222"); //RC 31100222 : Požadavek byl uložen.
                        return;
                    });
                }
                saveNew(poz) {
                    this.log.debug("save()", poz);
                    this.isl.UcrPozadavek.save({ data: poz })
                        .get()
                        .then((p) => {
                        //this.pozadavek = p;
                        this.findFields().gfield("model", "apply", this.pozadavek);
                        this.showFlash("jres:31100222"); //RC 31100222 : Požadavek byl uložen.
                        return;
                    });
                }
                getServiceOptions() {
                    let poz = this.pozadavek;
                    let typSestavy = poz.ReportInfo && poz.ReportInfo.typSestavy ? poz.ReportInfo.typSestavy : undefined;
                    return { typSestavy: typSestavy, parentContent: this, fragments: "*" };
                }
                showSeznamMasek() {
                    let d = $.Deferred();
                    let poz = this.pozadavek;
                    let gf = this.getElementFormat(this.pozadavek);
                    let ixs_msk_uzi = this.findFields("ixs_msk_uzi").gfield("getValue")?.ixs_mas;
                    if (!gf)
                        return d.reject().promise();
                    let options = {
                        serviceOptions: this.getServiceOptions(),
                        elementFormat: gf,
                        ixs_mas: ixs_msk_uzi,
                        checkUete: this.ekoParams.CheckUete
                    };
                    let dlg = this.dialogs.showModalWindow(Gordic.Ucr.WebClient.GSeznamMasekControl, options, {
                        width: 600,
                        height: 400,
                        title: "jres:31100202" //RC 31100202 : Seznam uložených filtrů
                    });
                    dlg.on("close", function (ev, m) {
                        if (m?.ixs_mas)
                            d.resolve(m);
                        else
                            d.reject();
                    });
                    return d.promise();
                }
                showMaskaDetail() {
                    let gf = this.getElementFormat(this.pozadavek);
                    let ixs_mas = this.findFields("ixs_msk_uzi").gfield("getValue")?.ixs_mas;
                    if (!gf)
                        return;
                    if (!ixs_mas) {
                        this.dialogs.warning(undefined, "jres:31100157");
                        return;
                    } //RC 31100157 : Není vybrána žádná maska
                    let options = {
                        maska: { ixs_mas: ixs_mas },
                        elementFormat: gf,
                        checkUete: this.ekoParams.CheckUete,
                        serviceOptions: this.getServiceOptions()
                    };
                    this.showMaskaDetailDlg(options);
                }
                createNewMaska() {
                    let gf = this.getElementFormat(this.pozadavek);
                    if (!gf)
                        return;
                    this.findFields().gfield("model", "collect", this.pozadavek);
                    let options = {
                        serviceOptions: this.getServiceOptions(),
                        elementFormat: gf,
                        checkUete: this.ekoParams.CheckUete,
                        maska: { elementy: { filters: this.pozadavek.elements } },
                    };
                    this.showMaskaDetailDlg(options);
                }
                showMaskaDetailDlg(options) {
                    let dlg = this.dialogs.showModalWindow(Gordic.Ucr.WebClient.GUcrMaskaDetail, options, { width: 600, height: 400, title: "jres:31100206" }); //RC 31100206 : Detail filtru
                    dlg.on("close", (ev, m) => {
                        if (!m)
                            return;
                        this.findFields("ixs_msk_uzi").gfield("setValue", m);
                    });
                    return dlg;
                }
                clearVystup() {
                    //this.element.find(".js-poz-vystup").gfield("clear");
                    this.findFields("Wrid").gfield("clearClientCache").gfield("clear");
                    this.actualReportInfo = null;
                }
                validateReportPlatnost(poz) {
                    if (!poz.Wrid)
                        return $.Deferred().resolve().promise();
                    if (!poz.platnost) {
                        this.clearVystup();
                        this.updateActionsState();
                        return $.Deferred().resolve().promise();
                    }
                    this.pozadavek = poz;
                    this.beginOperation();
                    return Gordic.Report.WebClient.GReportTreeControlTS.getReportInfo(poz.Wrid, poz.platnost)
                        .then((ri) => {
                        this.actualReportInfo = ri;
                        if (!ri.isAktivni) {
                            this.clearVystup();
                            this.updateActionsState();
                        }
                    })
                        .always(() => { this.endOperation(); });
                }
            };
            GDetailPozadavkuControl = __decorate([
                Decorators.gcontent
            ], GDetailPozadavkuControl);
            WebClient.GDetailPozadavkuControl = GDetailPozadavkuControl;
            let TopoFactors;
            (function (TopoFactors) {
                TopoFactors["Eq"] = "=";
                TopoFactors["NonEq"] = "!=";
            })(TopoFactors || (TopoFactors = {}));
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFBvemFkYXZrdUNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGV0YWlsUG96YWRhdmt1Q29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBb3BDZjtBQXBwQ0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBb3BDbkI7SUFwcENnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FvcEM3QjtRQXBwQ29CLFdBQUEsU0FBUztZQUUxQixJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF3QixTQUFRLE9BQUEsWUFBWTtnQkFBekQ7O29CQUVJLFdBQU0sR0FBRyxjQUFjLENBQUM7b0JBQ3hCLFVBQUssR0FBRyxlQUFlLENBQUMsQ0FBQyxnQ0FBZ0M7b0JBRXpELGVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsNEJBQTRCLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQXVvQzlHLENBQUM7Z0JBcm1DVSxjQUFjO29CQUNqQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO29CQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7b0JBQzNDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7b0JBQzlCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRzt3QkFDcEIsbUJBQW1CLEVBQUUsNkNBQTZDO3dCQUNsRSxXQUFXLEVBQUUsQ0FBQzt3QkFDZCxhQUFhLEVBQUUsSUFBSTtxQkFDdEIsQ0FBQztvQkFFRiwwQkFBMEI7b0JBRTFC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QyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7NEJBQ3pFLENBQUM7NEJBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dDQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0NBQ3BJLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztnQ0FDakYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQzdDLENBQUM7NEJBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dDQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0NBQ3BJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7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QUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7d0JBQ1QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQzt3QkFDM0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs0QkFBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7NEJBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7d0JBQUMsQ0FBQztvQkFDekUsQ0FBQyxDQUFDO3lCQUNELE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDL0MsQ0FBQzthQUNKLENBQUE7WUE1b0NZLHVCQUF1QjtnQkFEbkMsVUFBVSxDQUFDLFFBQVE7ZUFDUCx1QkFBdUIsQ0E0b0NuQztZQTVvQ1ksaUNBQXVCLDBCQTRvQ25DLENBQUE7WUFFRCxJQUFLLFdBR0o7WUFIRCxXQUFLLFdBQVc7Z0JBQ1osdUJBQVEsQ0FBQTtnQkFDUiwyQkFBVyxDQUFBO1lBQ2YsQ0FBQyxFQUhJLFdBQVcsS0FBWCxXQUFXLFFBR2Y7UUFDTCxDQUFDLEVBcHBDb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBb3BDN0I7SUFBRCxDQUFDLEVBcHBDZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBb3BDbkI7QUFBRCxDQUFDLEVBcHBDUyxNQUFNLEtBQU4sTUFBTSxRQW9wQ2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsUG96YWRhdmt1Q29udHJvbCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHRhc2tJZCA9IFwiZGV0YWlsUG96QWN0XCI7XHJcbiAgICAgICAgdGl0bGUgPSBcImpyZXM6MzExMDAxNTlcIjsgLy9SQyAzMTEwMDE1OSA6IERldGFpbCBwb8W+YWRhdmt1XHJcblxyXG4gICAgICAgIGxvZ09wdGlvbnMgPSB7IG5hbWU6IFwiR0RldGFpbFBvemFkYXZrdUNvbnRyb2xcIiwgZmlsZU5hbWU6IFwiR0RldGFpbFBvemFkYXZrdUNvbnRyb2wudHNcIiwgYXV0aG9yQ29kZTogMzExIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgb3B0aW9uczogR0RldGFpbFBvemFkYXZrdU9wdGlvbnNEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBwb3phZGF2ZWs6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQb3phZGF2ZWtEZXRhaWxEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXJQYXJhbXM6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdGaWx0ZXJQYXJhbXNEdG87XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBnbG9iYWxzOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUGFyYW1zRHRvO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgR2xvYmFsczogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Vjckdsb2JhbER0bztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGVrb1BhcmFtczogR29yZGljLlVjci5XZWJDbGllbnQuR0Vrb1BhcmFtc0R0bztcclxuICAgICAgICAvKipFayB6IFRLIEFkZFRvcG9GaWx0ZXJzICh1Y3MsIHV1cywgbmtzLCBkcmRfbXNrIGEgYWMgYXRkLikgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGZpbHRlck9wdGlvbnM6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkR0by5HRmlsdGVyT3B0aW9uc0R0bztcclxuICAgICAgICBwcml2YXRlIHJlYWRPbmx5OiBib29sZWFuO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZXh0ZXJuaVN1bWFyaXphY2U6IGJvb2xlYW47XHJcbiAgICAgICAgcHJpdmF0ZSBpc09kbG96ZW55OiBib29sZWFuO1xyXG4gICAgICAgIHByaXZhdGUgJGhlYWRlcjogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgJHBvelRhYjogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgJHBvelBhclRhYjogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgJHBvekZpbHRyVGFiOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBnZW5lcmF0b3JPcHRpb25zOiBSZXBvcnQuV2ViQ2xpZW50LklHUmVwb3J0R2VuZXJhdG9yT3B0aW9ucztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZW5lcm92YXRBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBnZW5lcm92YXRBc3luY0FjdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIHNhdmVBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBzYXZlTmV3QWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgc2VsZWN0T25seUFjdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIG9kbG96QWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgdnlzdHVwQWN0OiBHUHJpbnRBY3Rpb25UeXBlO1xyXG4gICAgICAgIHByaXZhdGUgdnlzdHVwU2VsZWN0b3JBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBtYXNrYURldGFpbHNBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBuZXdNYXNrYUFjdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIGNsZWFyRWxlbWVudHNBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBvbWV6ZW5pQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgaXNPYmRvYmlDaGFuZ2luZzogYm9vbGVhbjtcclxuICAgICAgICBwcml2YXRlIGFjdHVhbFJlcG9ydEluZm86IEdvcmRpYy5SZXBvcnQuSW50ZXJmYWNlLkdSZXBvcnRJbmZvRHRvIHwgbnVsbDtcclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgcG96YWRhdmVrID0gdGhpcy5wb3phZGF2ZWs7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucyB8fCB7fTtcclxuICAgICAgICAgICAgdGhpcy5yZWFkT25seSA9ICEhdGhpcy5vcHRpb25zLnJlYWRPbmx5O1xyXG4gICAgICAgICAgICB0aGlzLmlzT2Rsb3plbnkgPSAhIXRoaXMub3B0aW9ucy5wb3JDaXNLdWQ7XHJcbiAgICAgICAgICAgIHRoaXMuaXNPYmRvYmlDaGFuZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRvck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICByZXBvcnRHZW5lcmF0b3JUeXBlOiBcIkdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JQb3phZGF2ZWtHZW5lcmF0b3JcIixcclxuICAgICAgICAgICAgICAgIHdhaXRUb0FzeW5jOiAxLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhpc1xyXG4gICAgICAgICAgICB9OyBcclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBNZW51L0NvbW1hbmRCYXJ5XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZ5c3R1cEFjdCA9IHRoaXMuYWN0aW9ucy5hZGQoR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInZ5c3R1cEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgdGVtYTogXCJ1Y3JfcHRtX3VjcmJhc2VcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA0OFwiLCAgIC8vUkMgMzExMDAwNDggOiBWw71zdHVwXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMxMTAwMjEzXCIsIC8vUkMgMzExMDAyMTMgOiBWeWJlcnRlIHNlc3RhdnVcclxuICAgICAgICAgICAgICAgIHNlbGVjdFJlcG9ydE9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICByZXBvcnRJZDogdGhpcy5wb3phZGF2ZWsuV3JpZCB8fCBcIlwiLFxyXG4gICAgICAgICAgICAgICAgZGlhbG9nQ2xvc2VkOiAoZXYsIHJlcEluZm8pID0+IHsgaWYgKHJlcEluZm8pIHRoaXMuc2V0T3V0cHV0KHJlcEluZm8pOyB9LFxyXG4gICAgICAgICAgICAgICAgc2NoZWR1bGluZ0Rpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhpc1xyXG4gICAgICAgICAgICB9KSkgYXMgR1ByaW50QWN0aW9uVHlwZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudnlzdHVwU2VsZWN0b3JBY3QgPSB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidnlzdHVwU2VsZWN0b3JBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IHRoaXMudnlzdHVwQWN0Lmljb24sXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNDhcIiwgICAvL1JDIDMxMTAwMDQ4IDogVsO9c3R1cFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMTEwMDIxM1wiLCAvL1JDIDMxMTAwMjEzIDogVnliZXJ0ZSBzZXN0YXZ1XHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuZmluZEZpZWxkcyhcIldyaWRcIikuZ3NlbGVjdGJveChcImdldEJ1dHRvblwiLCBcInNlbGVjdG9yXCIpLmNsaWNrKCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5vbWV6ZW5pQWN0ID0gdGhpcy5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm9tZXplbmlBY3RcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDU3NlwiLCAgIC8vUkMgMzAyNTA1NzYgOiBQZXZuw6kgb21lemVuw61cclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5VY3IuV2ViQ2xpZW50LkdTZXpuYW1PbWV6ZW5pXCIsIHt9LCBcImpyZXM6MzAyNTA1NzVcIiwgNjAwLCA0MDAsIHRydWUpIC8vUkMgMzAyNTA1NzUgOiBQZXZuw6kgb21lemVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5vZGxvekFjdCA9IHRoaXMuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJvZGxvekFjdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS10aW1lXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxNzNcIiwgICAgLy9SQyAzMTEwMDE3MyA6IE9kbG/Fvml0XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZpc2libGU6IHRoaXMuZ2xvYmFscy5SYWRfT0RMRW5hYmxlZCEsXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0VmFsdWVzKCkudGhlbigocG96KSA9PiB7IHRoaXMuc2NoZWR1bGVSZXBvcnQocG96KTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJvdmF0QWN0ID0gdGhpcy5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImdlbmVyb3ZhdEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wcmludFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTYyXCIsICAgLy9SQyAzMTEwMDE2MiA6IEdlbmVyb3ZhdFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0VmFsdWVzKCkudGhlbigocG96KSA9PiB7IHRoaXMuZ2VuZXJhdGVSZXBvcnQocG96LCB0aGlzKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5nZW5lcm92YXRBc3luY0FjdCA9IHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJnZW5lcm92YXRBc3luY0FjdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kb3J1Y3xnaS1kb3J1YyBnaS1yb3QxODBcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDI4NFwiLCAvL1JDIDMxMTAwMjg0IDogR2VuZXJvdmF0IGFzeW5jaHJvbm7Em1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiAhISh0aGlzLnByb3AoXCJEZWJ1Z09yRGV2ZWxvcFZlcnNpb25cIikgYXMgYm9vbGVhbiksXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0VmFsdWVzKCkudGhlbigocG96KSA9PiB7IHRoaXMuZ2VuZXJhdGVSZXBvcnRBc3luYyhwb3osIHRoaXMpOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuc2F2ZUFjdCA9IHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAvLyAgICBuYW1lOiBcInNhdmVBY3RcIixcclxuICAgICAgICAgICAgLy8gICAgaWNvbjogXCJnaS1zYXZlXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwianJlczozMTEwMDE2MFwiLCAgIC8vUkMgMzExMDAxNjAgOiBVbG/Fvml0XHJcbiAgICAgICAgICAgIC8vICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmNvbGxlY3RWYWx1ZXMoKS50aGVuKChwb3opID0+IHsgdGhpcy5zYXZlKHBveik7IH0pO1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUFjdCA9IHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzYXZlQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLXNhdmVcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE2MFwiLCAgIC8vUkMgMzExMDAxNjAgOiBVbG/Fvml0XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3RWYWx1ZXMoKS50aGVuKChwb3opID0+IHsgdGhpcy5zYXZlTmV3KHBveik7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJzYXZlQWN0MlwiLFxyXG4gICAgICAgICAgICAvLyAgICBpY29uOiBcImdpLXNhdmVcIixcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJOb3ZlIHVsb3plbmlcIiwgICAvL1JDIDMxMTAwMTYwIDogVWxvxb5pdFxyXG4gICAgICAgICAgICAvLyAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmNvbGxlY3RWYWx1ZXMoKS50aGVuKChwb3opID0+IHsgdGhpcy5zYXZlTmV3KHBveik7IH0pO1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNhdmVOZXdBY3QgPSB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2F2ZU5ld0FjdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zYXZlfGdpLXBsdXMgZ2ktc3RhY2stZncgZ2ktYmd3XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyNzZcIiwgLy9SQyAzMTEwMDI3NiA6IFVsb8W+aXQgbm92w71cclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdFZhbHVlcygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChwb3opID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvei5JeHNTZXMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlKHBveik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0T25seUFjdCA9IHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzZWxlY3RPbmx5QWN0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBHRGxnLm1iYk9rLnRleHQsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLmlzT2Rsb3plbnksXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0VmFsdWVzKCkudGhlbigocG96KSA9PiB7IHRoaXMuY2xvc2UoeyBwb3phZGF2ZWs6IHBveiB9KTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tYXNrYURldGFpbHNBY3QgPSB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibWFza2FEZXRhaWxzQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTU2XCIsIC8vUkMgMzExMDAxNTYgOiBEZXRhaWxcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93TWFza2FEZXRhaWwoKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubmV3TWFza2FBY3QgPSB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibmV3TWFza2FBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjA4XCIsIC8vUkMgMzExMDAyMDggOiBVbG/Fvml0IGVsZW1lbnR5IGpha28gbm92w70gZmlsdHJcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5jcmVhdGVOZXdNYXNrYSgpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jbGVhckVsZW1lbnRzQWN0ID0gdGhpcy5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNsZWFyRWxtQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyAkKGV2LnRhcmdldCkuY2xvc2VzdChcIi5nZmllbGRcIikuZ2ZpZWxkKFwiY2xlYXJcIik7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2xvc2VEbGdBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxNjhcIiwgICAvL1JDIDMxMTAwMTY4IDogWmF2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuY2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbXHJcbiAgICAgICAgICAgICAgICAvL3sgYWN0aW9uOiB0aGlzLnZ5c3R1cEFjdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLnZ5c3R1cFNlbGVjdG9yQWN0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMub2Rsb3pBY3QsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5uZXdNYXNrYUFjdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLm9tZXplbmlBY3QsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5nZW5lcm92YXRBc3luY0FjdCB9XHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLnNlbGVjdE9ubHlBY3QsIHByaW1hcnk6IHRoaXMuaXNPZGxvemVueSwgdmlzaWJsZTogdGhpcy5pc09kbG96ZW55IH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5nZW5lcm92YXRBY3QsIHByaW1hcnk6ICF0aGlzLmlzT2Rsb3plbnkgfSwgXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5zYXZlQWN0LCB2aXNpYmxlOiAhdGhpcy5pc09kbG96ZW55LCBjaGlsZHJlbjogW3sgYWN0aW9uOiB0aGlzLnNhdmVOZXdBY3QsIHZpc2libGU6ICF0aGlzLmlzT2Rsb3plbnkgfV0gfSxcclxuICAgICAgICAgICAgICAgIC8veyBhY3Rpb246IHRoaXMuYWN0aW9ucy5zYXZlQWN0MiwgdmlzaWJsZTogIXRoaXMuaXNPZGxvemVueSwgY2hpbGRyZW46IFt7IGFjdGlvbjogdGhpcy5zYXZlTmV3QWN0LCB2aXNpYmxlOiAhdGhpcy5pc09kbG96ZW55IH1dIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmNsb3NlRGxnQWN0ISB9XHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMudnlzdHVwQWN0IS5wYXJlbnRDb250ZW50ID0gdGhpczsgLy9rdnVsaSB6YXZyZW5pIGRpYWxvZ3VcclxuXHJcbiAgICAgICAgICAgIHZhciAkaGVhZGVyID0gdGhpcy4kaGVhZGVyID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiZGV0YWlsLWhlYWRlclwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKHRoaXMuaXNPZGxvemVueSA/IFwiaGlkZGVuXCIgOiBcIlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICRoZWFkZXJcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcInNldHVwXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwianMtaGVhZGVyLXBvei1mb3JtXCIpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIsIFwiXCIpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJqcmVzOjMxMTAwMDE5XCIpLmdzdHJpbmdib3goeyBuYW1lOiBcIk5hemV2XCIsIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5IH0pIC8vUkMgMzExMDAwMTkgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcImpyZXM6MzExMDAwMTRcIikuZ3N0cmluZ2JveCh7IG5hbWU6IFwiUG96bmFta2FcIiwgZGlzYWJsZWQ6IHRoaXMucmVhZE9ubHkgfSkgLy9SQyAzMTEwMDAxNCA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwianJlczozMTEwMDE2NlwiKS5ncmFkaW8oeyAvL1JDIDMxMTAwMTY2IDogVHlwIHBvxb5hZGF2a3VcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlR5cFBvemFkYXZrdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogcG96YWRhdmVrLlR5cFBvemFkYXZrdSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5yZWFkT25seSxcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwTWFza3kuT3NvYm5pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMxMTAwMDAzXCIgIC8vUkMgMzExMDAwMDMgOiBPc29ibsOtXHJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cE1hc2t5LlZlcmVqbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzExMDAwMjBcIiAgLy9SQyAzMTEwMDAyMCA6IFZlxZllam7DvVxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0b3BvRmFjdG9ycyA9IFtcclxuICAgICAgICAgICAgICAgIHsgaWNvbjogXCImIzYxO1wiLCBmYWN0b3I6IFRvcG9GYWN0b3JzLkVxLCBjYXB0aW9uOiBcImpyZXM6MzExMDAyNzdcIiB9LCAvL1JDIDMxMTAwMjc3IDogSmUgcm92bm9cclxuICAgICAgICAgICAgICAgIHsgaWNvbjogXCImIzg4MDA7XCIsIGZhY3RvcjogVG9wb0ZhY3RvcnMuTm9uRXEsIGNhcHRpb246IFwianJlczozMTEwMDI3OFwiIH0gLy9SQyAzMTEwMDI3OCA6IE5lcm92bsOhIHNlXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHZhciB0b3BvRmFjdG9yT3B0cyA9IHsgaWNvbnNPbmx5OiB0cnVlIH07XHJcbiAgICAgICAgICAgIHZhciB0b3BvRmFjdG9yQ2hhbmdlZCA9IChmaWVsZE5hbWU6IHN0cmluZywgZmFjdG9yVHlwZTogVG9wb0ZhY3RvcnMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhmaWVsZE5hbWUpLmdjaGVjayhcInNldFZhbHVlXCIsIGZhY3RvclR5cGUgPT09IFRvcG9GYWN0b3JzLk5vbkVxID8gdHJ1ZSA6IGZhbHNlKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkcG96VGFiID0gdGhpcy4kcG96VGFiID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB2YXIgJHBvelBhclRhYiA9IHRoaXMuJHBvelBhclRhYiA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgdmFyICRwb3pGaWx0clRhYiA9IHRoaXMuJHBvekZpbHRyVGFiID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyU2V0dGluZ1BveiA9IFwicG96VGFiXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJTZXR0aW5nUGFyID0gXCJwb3pQYXJcIjtcclxuICAgICAgICAgICAgY29uc3QgdXNlclNldHRpbmdmaWx0ciA9IFwicG96RmlsdHJcIjtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVyVHlwT3NlS3NOb3RJbiA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlclR5cE9zZUtzOiBHQmFzZUZpbHRlcjxzdHJpbmc+ID0geyBvOiBcIk5PVCBJTlwiLCB2OiBmaWx0ZXJUeXBPc2VLc05vdEluIH07XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2xvYmFscy5SZXppbVByb3ZvenUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5JQ086XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVHlwT3NlS3NOb3RJbi5wdXNoKFwiaWNvXCIsIFwicmFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LlVDUzpcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJUeXBPc2VLc05vdEluLnB1c2goXCJpY29cIiwgXCJyYXJcIiwgXCJ1Y3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuTktTOlxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclR5cE9zZUtzTm90SW4ucHVzaChcImljb1wiLCBcInJhclwiLCBcInVjc1wiLCBcInV1c1wiLCBcIm5rc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5TT1I6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5UeXBTdW1hcml6YWNlID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU3VtYXJpemFjZS5FeHRlcm5pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJUeXBPc2VLc05vdEluLnB1c2goXCJpY29cIiwgXCJ1Y3NcIiwgXCJ1dXNcIiwgXCJua3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJUeXBPc2VLc05vdEluLnB1c2goXCJyYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgR0Vycm9yKFwibm90U3VwcG9ydGVkXCIpOyAvL1BybyBzaWNociBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy92YXIgb3BlblBveiA9IHRoaXMudXNlclNldHRpbmdzIS5nZXQoXCJwb3pUYWJcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vdmFyIG9wZW5QYXIgPSB0aGlzLnVzZXJTZXR0aW5ncyEuZ2V0KFwicG96UGFyXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAvL3ZhciBvcGVuekZpbHRyID0gdGhpcy51c2VyU2V0dGluZ3MhLmdldChcIiRwb3pGaWx0clRhYlwiLCB0cnVlKTtcclxuICAgICAgICAgICAgJHBvelRhYlxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwic2V0dXBcIiwgeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJqcy1wb3otZm9ybVwiKVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzExMDAwMjJcIiwgb3BlbmVkOiB0aGlzLnVzZXJTZXR0aW5ncz8uZ2V0RGVmKHVzZXJTZXR0aW5nUG96LCB0cnVlKSA/PyBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBvcGVuOiAoKSA9PiB0aGlzLnVzZXJTZXR0aW5ncz8uc2V0KHVzZXJTZXR0aW5nUG96LCB0cnVlKSxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZTogKCkgPT4gdGhpcy51c2VyU2V0dGluZ3M/LnNldCh1c2VyU2V0dGluZ1BveiwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB9KSAvL1JDIDMxMTAwMDIyIDogUG/FvmFkYXZla1xyXG4gICAgICAgICAgICAgICAgLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiLCBcIlwiIC8qIFwiPz8/TsOhemV2IHTDqXRvIHNla2NlPz8/XCIgKi8pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJqcmVzOjMxMTAwMTY3XCIsIFtcInctNlwiLCBcInctNlwiXSkgLy9SQyAzMTEwMDE2NyA6IMOaxI1ldG7DrSBvYmRvYsOtIChyb2ssIG3Em3PDrWMpXHJcbiAgICAgICAgICAgICAgICAuZ3NlbGVjdGJveChHb3JkaWMuUHJlZmFicy5TZWxlY3QudWNyUm9rKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlJva1wiLCBtb2RlbDogXCJtb2RlbC5Sb2s9dmFsdWUucm9rXCIsIGRpc2FibGVkOiAhdGhpcy5vcHRpb25zLmFsbG93Q2hhbmdlT2JkLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IHRoaXMub3B0aW9ucy5hbGxvd0NoYW5nZU9iZCA/IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHsgdGhpcy5vbk9iZG9iaUNoYW5nZWQoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5uZXh0KClcclxuICAgICAgICAgICAgICAgIC5nc2VsZWN0Ym94KEdvcmRpYy5QcmVmYWJzLlNlbGVjdC51Y3JNZXNpYygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJNZXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLk1lc2ljPXZhbHVlLm1lc2ljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogeyBtZXNpYzogbnVsbCwgbWVzaWNfdHh0OiBcIiBcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgcm9rOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJSb2tcIiwgXCJyb2tcIiwgdHJ1ZSkgfSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7IHRoaXMub25PYmRvYmlDaGFuZ2VkKHRydWUpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwianJlczozMTEwMDA0OFwiKS8vUkMgMzExMDAwNDggOiBWw71zdHVwXHJcbiAgICAgICAgICAgICAgICAuZ3NlbGVjdGJveChHb3JkaWMuUHJlZmFicy5TZWxlY3QucmVwb3J0cyh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0c09wdGlvbnM6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy52eXN0dXBBY3QuZ2V0UmVwb3J0VHJlZUNvbnRyb2xQYXJhbXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9WIFVDUiBwcmVzZWxlY3RlZCBhc2kgbmVkYXZhIHNteWwgLSBwb2t1ZCBieSB1eml2YXRlbCBjaHRlbCBwb3JhZCBkb2tvbGEgZ2VuZXJvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc3Rlam5vdSBzZXN0YXZ1IHZlIHN0ZWpuZW0gZm9ybWF0dSwgdGFrIGJ5IHNpIGFzaSB1bG96aWwgcG96YWRhdmVrLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMuUHJlc2VsZWN0VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiV3JpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLldyaWQ9dmFsdWUucmVwb3J0SWQsbW9kZWwuUmVwb3J0SW5mby5yZXBvcnRJbmZvLm5hemV2PT52YWx1ZS5uYW1lLG1vZGVsLlJlcG9ydEluZm8ucmVwb3J0SW5mby5pZFNlcz0+dmFsdWUuaWRTZXNcIixcclxuICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxPcHRpb25zOiB7IHZlcmlmaWNhdGlvbk5lZWRlZDogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgdikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodi52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKFwiT3V0cHV0U3R5bGVOYW1lLGVsZW1lbnRzLGl4c19tc2tfdXppXCIpLmdmaWVsZChcImVuYWJsZVwiKS5nc2VsZWN0Ym94KFwiY2xlYXJDbGllbnRDYWNoZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0T3V0cHV0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYudmFsdWUubWV0YSA/IHYudmFsdWUubWV0YSA6IEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRUcmVlQ29udHJvbFRTLlRvSUdQcmludEFjdGlvblJlcG9ydEluZm8odi52YWx1ZSkhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnBvemFkYXZlay5XcmlkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5wb3phZGF2ZWsuT3V0cHV0U3R5bGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnBvemFkYXZlay5PdXRwdXRTdHlsZU5hbWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMucG96YWRhdmVrLlJlcG9ydEluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5wb3phZGF2ZWsuT3V0cHV0U3R5bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5wb3phZGF2ZWsuZWxlbWVudHM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKFwiT3V0cHV0U3R5bGVOYW1lLGVsZW1lbnRzLGl4c19tc2tfdXppXCIpLmdmaWVsZChcImNsZWFyXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVBY3Rpb25zU3RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwianJlczozMTEwMDIyNVwiKSAvL1JDIDMxMTAwMjI1IDogVHlwIHbDvXN0dXB1XHJcbiAgICAgICAgICAgICAgICAuZ3NlbGVjdGJveChHb3JkaWMuUHJlZmFicy5TZWxlY3QucmVwb3J0Rm9ybWF0cyh7IHJlbGF0ZWQ6IHRoaXMuZWxlbWVudCB9KSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiT3V0cHV0U3R5bGVOYW1lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLldyaWQ9PnZhbHVlLnJlcG9ydElkLG1vZGVsLk91dHB1dFN0eWxlTmFtZT12YWx1ZS5kZXNjcmlwdGlvbixtb2RlbC5PdXRwdXRTdHlsZT12YWx1ZS5leHRlbnNpb25cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydElkOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJXcmlkXCIsIFwicmVwb3J0SWRcIiwgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRJbmZvOiAoKSA9PiB7IHJldHVybiB0aGlzLmFjdHVhbFJlcG9ydEluZm8gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRub3N0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBvemFkYXZlay5wbGF0bm9zdCkgcmV0dXJuIHRoaXMudXBkYXRlVnlzdHVwQWN0RWtvRGF0ZSgpLnRoZW4oKHApID0+IHsgcmV0dXJuIHAuUGxhdG5vc3QhLnBsYXRub3N0IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvemFkYXZlay5wbGF0bm9zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJXcmlkXCIsIFwibWV0YVwiLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcImpyZXM6MzExMDAwMzRcIiwgW1widy02XCIsIFwidy02XCJdKSAvL1JDIDMxMTAwMDM0IDogWm9icmF6ZW7DrVxyXG4gICAgICAgICAgICAgICAgLmdjaGVjayh7IG5hbWU6IFwiVnliZXJvdmFNYXNrYVwiLCBsYWJlbDogXCJqcmVzOjMxMTAwMDM1XCIsIGluaXRpYWxWYWx1ZTogISFwb3phZGF2ZWsuVnliZXJvdmFNYXNrYSB9KSAvL1JDIDMxMTAwMDM1IDogVsO9YsSbcm92w6EgbWFza2FcclxuICAgICAgICAgICAgICAgIC5uZXh0KClcclxuICAgICAgICAgICAgICAgIC5nY2hlY2soeyBuYW1lOiBcIlZsYXN0bmlaYWhsYXZpXCIsIGxhYmVsOiBcImpyZXM6MzExMDAwMzZcIiwgaW5pdGlhbFZhbHVlOiAhIXBvemFkYXZlay5WbGFzdG5pWmFobGF2aSwgY3VzdG9tQ2xhc3M6ICh0aGlzLmdsb2JhbHMuVmxhc3RuaVphaGxhdmk/XCJ2aXNpYmxlXCI6XCJoaWRkZW5cIikgfSkgLy9SQyAzMTEwMDAzNiA6IFZsYXN0bsOtIHrDoWhsYXbDrVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHBvelBhclRhYlxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwic2V0dXBcIiwgeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJqcy1wb3otZm9ybVwiKVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzAyNTA1MzVcIiwgb3BlbmVkOiB0aGlzLnVzZXJTZXR0aW5ncz8uZ2V0RGVmKHVzZXJTZXR0aW5nUGFyLCB0cnVlKSA/PyBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBvcGVuOiAoKSA9PiB0aGlzLnVzZXJTZXR0aW5ncz8uc2V0KHVzZXJTZXR0aW5nUGFyLCB0cnVlKSxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZTogKCkgPT4gdGhpcy51c2VyU2V0dGluZ3M/LnNldCh1c2VyU2V0dGluZ1BhciwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB9KSAvL1JDIDMwMjUwNTM1IDogUGFyYW1ldHJ5IHNlc3RhdnlcclxuICAgICAgICAgICAgICAgIC5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIiwgXCJcIiAvKiBcImpyZXM6MzExMDAwMjRcIiAqLykgXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJcIiwgW1widy0xMVwiLCBcInctMVwiLCBcInctMVwiXSlcclxuICAgICAgICAgICAgICAgIC5nZm9ybXRleHQoXCJcIilcclxuICAgICAgICAgICAgICAgIC5uZXh0KClcclxuICAgICAgICAgICAgICAgIC8vLmdmb3JtdGV4dChcIjxzcGFuIGNsYXNzPSdoaWRkZW4nPk48L3NwYW4+XCIpXHJcbiAgICAgICAgICAgICAgICAvLy5uZXh0KClcclxuICAgICAgICAgICAgICAgIC5nZm9ybXRleHQoXCI8c3BhbiBzdHlsZT0nbWFyZ2luLWxlZnQ6IDVweDsnPs6jPC9zcGFuPlwiKVxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwianJlczozMTEwMDA0NlwiLCBbXCJ3LTExXCIsIFwidy0xXCIsIFwidy0xXCJdKSAvL1JDIDMxMTAwMDQ2IDogU0VTXHJcbiAgICAgICAgICAgICAgICAuZ3NlbGVjdGJveChHb3JkaWMuRWtvLlByZWZhYnMub2JlY25lU2Vza3VwZW5pKHtcclxuICAgICAgICAgICAgICAgICAgICByb2tNZXNpY0Z1bmM6IChlbG0pID0+IHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHRoaXMucG96YWRhdmVrLnBsYXRub3N0KS5wcm9taXNlKCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwT3NlS3M6IGZpbHRlclR5cE9zZUtzXHJcbiAgICAgICAgICAgICAgICB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2VzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc2VzPXZhbHVlLml4c19vc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBmYWN0b3JzOiB0b3BvRmFjdG9ycyxcclxuICAgICAgICAgICAgICAgICAgICBmYWN0b3JPcHRpb25zOiB0b3BvRmFjdG9yT3B0cyxcclxuICAgICAgICAgICAgICAgICAgICBmYWN0b3JDaGFuZ2U6IGZ1bmN0aW9uIChldiwgZmFjdG9yKSB7IHRvcG9GYWN0b3JDaGFuZ2VkKFwic2VzX25cIiwgZmFjdG9yLmZhY3RvciBhcyBhbnkgYXMgVG9wb0ZhY3RvcnMpOyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm5leHQoKVxyXG4gICAgICAgICAgICAgICAgLmdjaGVjayh7IG5hbWU6IFwic2VzX25cIiwgY3VzdG9tQ2xhc3M6IFwiaGlkZGVuXCIgfSlcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLmljbywgW1widy0xMVwiLCBcInctMTFcIiwgXCJ3LTFcIiwgXCJ3LTFcIl0pXHJcbiAgICAgICAgICAgICAgICAuZ3NlbGVjdGJveChHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc2ljbygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpY29cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pY289dmFsdWUuaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICAgICAgZmFjdG9yczogdG9wb0ZhY3RvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgZmFjdG9yT3B0aW9uczogdG9wb0ZhY3Rvck9wdHMsXHJcbiAgICAgICAgICAgICAgICAgICAgZmFjdG9yQ2hhbmdlOiBmdW5jdGlvbiAoZXYsIGZhY3RvcikgeyB0b3BvRmFjdG9yQ2hhbmdlZChcImljb19uXCIsIGZhY3Rvci5mYWN0b3IgYXMgYW55IGFzIFRvcG9GYWN0b3JzKTsgfVxyXG4gICAgICAgICAgICAgICAgfSkudG9nZ2xlKCF0aGlzLmV4dGVybmlTdW1hcml6YWNlKVxyXG4gICAgICAgICAgICAgICAgLm5leHQoKVxyXG4gICAgICAgICAgICAgICAgLmdzZWxlY3Rib3goR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3NyYXIoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWNvRXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuSWNvRXh0PXZhbHVlLmljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhY3RvcnM6IHRvcG9GYWN0b3JzLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhY3Rvck9wdGlvbnM6IHRvcG9GYWN0b3JPcHRzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9ha3RfcHJvaGw6ICgpID0+IHsgcmV0dXJuIDEwMDsgfSwgLy9OT1RFOiAoQk0pOiBwYWRhbG8gbmEgdnlqaW1rdSBwcmkgb3RldnJlbmkgc2VsZWN0b3J1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAoKSA9PiB7IHJldHVybiBudWxsOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkudG9nZ2xlKHRoaXMuZXh0ZXJuaVN1bWFyaXphY2UpXHJcbiAgICAgICAgICAgICAgICAubmV4dCgpXHJcbiAgICAgICAgICAgICAgICAuZ2NoZWNrKHsgbmFtZTogXCJpY29fblwiLCBjdXN0b21DbGFzczogXCJoaWRkZW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgLm5leHQoKVxyXG4gICAgICAgICAgICAgICAgLmdjaGVjayh7IG5hbWU6IFwiaWNvX3NcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLnVjcywgW1widy0xMVwiLCBcInctMVwiLCBcInctMVwiXSlcclxuICAgICAgICAgICAgICAgIC5nc2VsZWN0Ym94KEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdWNzKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmljbz0+dmFsdWUuaWNvOyBtb2RlbC51Y3M9dmFsdWUudWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcInt1Y3M6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyQ29sdW1uczogW1widWNzXCIsIFwibmF6ZXZcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICAgICAgZmFjdG9yczogdG9wb0ZhY3RvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgZmFjdG9yT3B0aW9uczogdG9wb0ZhY3Rvck9wdHMsXHJcbiAgICAgICAgICAgICAgICAgICAgZmFjdG9yQ2hhbmdlOiBmdW5jdGlvbiAoZXYsIGZhY3RvcikgeyB0b3BvRmFjdG9yQ2hhbmdlZChcInVjc19uXCIsIGZhY3Rvci5mYWN0b3IgYXMgYW55IGFzIFRvcG9GYWN0b3JzKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHV1cyA9ICQodGhpcykuY2xvc2VzdChcIi5nZm9ybVwiKS5maW5kRmllbGRzKFwidXVzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW8udmFsdWUpIHsgJHV1cy5nZmllbGQoXCJjbGVhclwiKTsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdXVzLmdmaWVsZDxHb3JkaWMuRGF0YS5SZWFkZXJzLkVrb3N1dXNEdG8+KFwiZ2V0VmFsdWVBc3luY1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHV1c1ZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXVzVmFsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV1c1ZhbC51Y3MgIT09IG8udmFsdWU/LnVjcykgJHV1cy5nZmllbGQoXCJjbGVhclwiLCB7IHRyaWdnZXJDaGFuZ2U6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vTk9URTogVG90byBuZWx6ZSBwb3V6aXQsIHByb3RvemUgemF2aXNsb3N0IHBhayBtYXplIG5hc3RhdmVuZSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXJzOiB7IGljbzogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KCF0aGlzLmV4dGVybmlTdW1hcml6YWNlID8gXCJpY29cIiA6IFwiaWNvRXh0XCIsIFwiaWNvXCIsIGZhbHNlKSB9IFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5uZXh0KClcclxuICAgICAgICAgICAgICAgIC5nY2hlY2soeyBuYW1lOiBcInVjc19uXCIsIGN1c3RvbUNsYXNzOiBcImhpZGRlblwiIH0pXHJcbiAgICAgICAgICAgICAgICAubmV4dCgpXHJcbiAgICAgICAgICAgICAgICAuZ2NoZWNrKHsgbmFtZTogXCJ1Y3Nfc1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMudXVzLCBbXCJ3LTExXCIsIFwidy0xXCIsIFwidy0xXCJdKVxyXG4gICAgICAgICAgICAgICAgLmdzZWxlY3Rib3goR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1dXMoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaWNvPT52YWx1ZS5pY287IG1vZGVsLnVjcz0+dmFsdWUudWNzOyBtb2RlbC51dXM9dmFsdWUudXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcInt1dXM6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICAgICAgZmFjdG9yczogdG9wb0ZhY3RvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgZmFjdG9yT3B0aW9uczogdG9wb0ZhY3Rvck9wdHMsXHJcbiAgICAgICAgICAgICAgICAgICAgZmFjdG9yQ2hhbmdlOiBmdW5jdGlvbiAoZXYsIGZhY3RvcikgeyB0b3BvRmFjdG9yQ2hhbmdlZChcInV1c19uXCIsIGZhY3Rvci5mYWN0b3IgYXMgYW55IGFzIFRvcG9GYWN0b3JzKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlJlemltUHJvdm96dSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5VQ1MpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkdWNzID0gdGhpcy5maW5kRmllbGRzKFwidWNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW8udmFsdWUpIHsgJHVjcy5nZmllbGQoXCJjbGVhclwiKTsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLmZsYWdzLnZhbGlkKSAkdWNzLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBpY286IG8udmFsdWUuaWNvLCB1Y3M6IG8udmFsdWUudWNzIH0sIHsgc2V0RmxhZ3M6IHsgdHJpZ2dlckNoYW5nZTogZmFsc2UgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9OT1RFOiBUb3RvIG5lbHplIHBvdXppdCwgcHJvdG96ZSB6YXZpc2xvc3QgcGFrIG1hemUgbmFzdGF2ZW5lIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpY286IG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeSghdGhpcy5leHRlcm5pU3VtYXJpemFjZSA/IFwiaWNvXCIgOiBcImljb0V4dFwiLCBcImljb1wiLCBmYWxzZSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdWNzOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJ1Y3NcIiwgXCJ1Y3NcIiwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm5leHQoKVxyXG4gICAgICAgICAgICAgICAgLmdjaGVjayh7IG5hbWU6IFwidXVzX25cIiwgY3VzdG9tQ2xhc3M6IFwiaGlkZGVuXCIgfSlcclxuICAgICAgICAgICAgICAgIC5uZXh0KClcclxuICAgICAgICAgICAgICAgIC5nY2hlY2soeyBuYW1lOiBcInV1c19zXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy5ua3MsIFtcInctMTFcIiwgXCJ3LTFcIiwgXCJ3LTFcIl0pXHJcbiAgICAgICAgICAgICAgICAuZ3NlbGVjdGJveChHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc25rcygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pY289PnZhbHVlLmljbzsgbW9kZWwubmtzPXZhbHVlLm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7bmtzOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhY3RvcnM6IHRvcG9GYWN0b3JzLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhY3Rvck9wdGlvbnM6IHRvcG9GYWN0b3JPcHRzLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhY3RvckNoYW5nZTogZnVuY3Rpb24gKGV2LCBmYWN0b3IpIHsgdG9wb0ZhY3RvckNoYW5nZWQoXCJua3NfblwiLCBmYWN0b3IuZmFjdG9yIGFzIGFueSBhcyBUb3BvRmFjdG9ycyk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9OT1RFOiBUb3RvIG5lbHplIHBvdXppdCwgcHJvdG96ZSB6YXZpc2xvc3QgcGFrIG1hemUgbmFzdGF2ZW5lIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcnM6IHsgaWNvOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koIXRoaXMuZXh0ZXJuaVN1bWFyaXphY2UgPyBcImljb1wiIDogXCJpY29FeHRcIiwgXCJpY29cIiwgZmFsc2UpIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAubmV4dCgpXHJcbiAgICAgICAgICAgICAgICAuZ2NoZWNrKHsgbmFtZTogXCJua3NfblwiLCBjdXN0b21DbGFzczogXCJoaWRkZW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgLm5leHQoKVxyXG4gICAgICAgICAgICAgICAgLmdjaGVjayh7IG5hbWU6IFwibmtzX3NcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcImpyZXM6MzExMDAwMjlcIikgIC8vUkMgMzExMDAwMjkgOiBQxZnDrXN0dXAga2UgxI1sZW7Fr20gc2Vza3VwZW7DrVxyXG4gICAgICAgICAgICAgICAgLmdyYWRpbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmbGFnU291aHJuZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW3sgdmFsdWU6IFwiVHJ1ZVwiLCBsYWJlbDogXCJqcmVzOjMxMTAwMDMwXCIgfSwgLy9SQyAzMTEwMDAzMCA6IFNvdWhybm7DvVxyXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IFwiRmFsc2VcIiwgbGFiZWw6IFwianJlczozMTEwMDAzMVwiIH1dLy9SQyAzMTEwMDAzMSA6IEplZG5vdGxpdsO9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRwb3pGaWx0clRhYlxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwic2V0dXBcIiwgeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRDbGFzcyhcImpzLXBvei1mb3JtXCIpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDUzNlwiLCBvcGVuZWQ6IHRoaXMudXNlclNldHRpbmdzPy5nZXREZWYodXNlclNldHRpbmdmaWx0ciwgdHJ1ZSkgPz8gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbjogKCkgPT4gdGhpcy51c2VyU2V0dGluZ3M/LnNldCh1c2VyU2V0dGluZ2ZpbHRyLCB0cnVlKSxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZTogKCkgPT4gdGhpcy51c2VyU2V0dGluZ3M/LnNldCh1c2VyU2V0dGluZ2ZpbHRyLCBmYWxzZSl9KSAvL1JDIDMwMjUwNTM2IDogRmlsdHJ5XHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIsIFwiXCIpIC8vTWFza2FcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcImpyZXM6MzExMDAyMDNcIikgLy9NYXNrYSB1eml2YXRlbHNrYSAvL1JDIDMxMTAwMjAzIDogVWxvxb5lbsO9IGZpbHRyXHJcbiAgICAgICAgICAgICAgICAuZ3NlbGVjdGJveCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfbXNrX3V6aVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7Z2ZpbHRlcnBhbmVsX25hbWV9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX21za191emk9dmFsdWUuaXhzX21hcyxtb2RlbC5tc2tfdXppX25hemV2PXZhbHVlLmdmaWx0ZXJwYW5lbF9uYW1lLG1vZGVsLmVsZW1lbnRzPT52YWx1ZS5lbGVtZW50eS5maWx0ZXJzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW3sgYWN0aW9uOiB0aGlzLm1hc2thRGV0YWlsc0FjdCwgY2FwdGlvblZpc2libGU6IFwibmV2ZXJcIiB9XSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjogKCkgPT4geyByZXR1cm4gdGhpcy5zaG93U2V6bmFtTWFzZWsoKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuZ2V0U2VydmljZU9wdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy50eXBTZXN0YXZ5KSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IGRhdGFQcm9taXNlID0gbmV3IEdVY3JNYXNrYVNlcnZpY2UodGhpcy5nZXRTZXJ2aWNlT3B0aW9ucygpKS5nZXRGaWx0ZXJzKHsgYWt0aXZpdGE6IDEwMCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFQcm9taXNlID0gdGhhdC5pc2wuVWNyRmlsdHIucmVhZCh7IGl4c19tc2s6IHRoYXQucG96YWRhdmVrLml4c19tc2tfdXppISB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3Jlc3VsdF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGFQcm9taXNlLCB7IGtleTogXCJpeHNfbWFzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJnZmlsdGVycGFuZWxfbmFtZVwiLFwiemtyYXRrYVwiXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVycyA9IGQ/LnZhbHVlPy5lbGVtZW50eT8uZmlsdGVycztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3phZGF2ZWsuZWxlbWVudHMgPSBmaWx0ZXJzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcnMpIHsgdGhpcy51cGRhdGVFbGVtZW50cyh0aGlzLnBvemFkYXZlayk7IC8qdGhpcy5maW5kRmllbGRzKFwiZWxlbWVudHNcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBmaWx0ZXJzKTsqLyB9IC8vTk9URTogSmUgbnV0bmUgdG8gZGVsYXQgcHJlcyB1cGRhdGVFbGVtZW50cygpIC0gbmEgemFjYXRrdSBuZXZpbSBncmlkZm9ybWF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5maW5kRmllbGRzKFwiZWxlbWVudHNcIikuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vdGFkeSBjaHliaSBqZXN0ZSBwZXZuYSBtYXNrYSBcIlBldm5hIGsgLi4uXCJcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcImpyZXM6MzExMDAwMjNcIi8qLCBbXCJ3LTExXCJdKi8pIC8vUkMgMzExMDAwMjMgOiBFbGVtZW50eVxyXG4gICAgICAgICAgICAgICAgLmdzZWxlY3Rib3goeyBuYW1lOiBcImVsZW1lbnRzXCIsIGRpc2FibGVkOiB0cnVlLCBtb2RlbDogXCJtb2RlbC5uZXNteXNsbmFIb2Rub3RhTW9kZWx1PXZhbHVlXCIgfSkgLy9OT1RFOiBNb2RlbCBqZSBqZW4gZmlrY2UsIGFieSBzZSBuZXpvYnJhem92YWxvICdbXSdcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBganJlczozMTEwMDIzNCAke3RoaXMuZ2xvYmFscy5QbGF0bm9zdFBNfWApIC8vUkMgMzExMDAyMzQgOiBQZXZuw70gayBcclxuICAgICAgICAgICAgICAgIC5nc3RyaW5nYm94KHsgaW5pdGlhbFZhbHVlOiB0aGlzLmdsb2JhbHMuUGV2bmFNYXNrYSEuTmFtZSwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcImpyZXM6MzExMDAyNzVcIikgLy9SQyAzMTEwMDI3NSA6IEJleiBQQVBcclxuICAgICAgICAgICAgICAgIC5nY2hlY2soeyBuYW1lOiBcImZsYWdQYXBcIiB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgcG96YWRhdmVrKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVBY3Rpb25zU3RhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGaWVsZHNTdGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9Ob3Z5IHBvemFkYXZlayBieSBtZWwgbWl0IG96bmFjZW55IHJvayBuZWJvIG1lc2ljXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wb3phZGF2ZWsuSXhzU2VzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHJvayA9IHRoaXMuZmluZEZpZWxkcyhcIlJva1wiKTtcclxuICAgICAgICAgICAgICAgIGlmICgkcm9rLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIpID09PSBmYWxzZSkgJHJvay5nZmllbGQoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5maW5kRmllbGRzKFwiTWVzaWNcIikuZ2ZpZWxkKFwiZm9jdXNcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy90aGlzLmZpbmRGaWVsZHMoXCJWbGFzdG5pWmFobGF2aVwiKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNvbGxlY3RWYWx1ZXMoKTogSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUG96YWRhdmVrRGV0YWlsRHRvPiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9taXNlcyA9IG5ldyBBcnJheTxKUXVlcnlQcm9taXNlPGFueT4+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kRm9ybXMoKS5lYWNoKChpLCBlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcCA9ICQoZSkuZ2Zvcm0oXCJ3YWl0Rm9yVmFsdWVzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChlKS5nZm9ybShcImlzVmFsaWRcIikpIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuICQud2hlbiguLi5wcm9taXNlcylcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG96ID0gdGhpcy5wb3phZGF2ZWs7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRmaWVsZHMgPSB0aGlzLmZpbmRGaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAkZmllbGRzLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBwb3opO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nLnRyYWNlKFwiY29sbGVjdFZhbHVlcygpXCIsIHBveik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvejtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZW5lcmF0ZVJlcG9ydChwb3o6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQb3phZGF2ZWtEZXRhaWxEdG8sIGdmcm1OYXZDb250ZW50OiBHQ29udGVudCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgZ2VuUGFyYW1zOiBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5JR0V4dGVuZGVkR2VuZXJhdGVQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICByZXBvcnRJZDogcG96LldyaWQhLFxyXG4gICAgICAgICAgICAgICAgb3V0cHV0U3R5bGU6IHBvei5PdXRwdXRTdHlsZSEsXHJcbiAgICAgICAgICAgICAgICBwbGF0bm9zdDogcG96LnBsYXRub3N0ISxcclxuICAgICAgICAgICAgICAgIGdlbmVyYXRvclBhcmFtczogcG96LFxyXG4gICAgICAgICAgICAgICAgcHJvcHM6IHsgUGxhdG5vc3Q6IHBvei5wbGF0bm9zdCEgfSxcclxuICAgICAgICAgICAgICAgIHJlcG9ydEdlbmVyYXRvclR5cGU6IHRoaXMuZ2VuZXJhdG9yT3B0aW9ucy5yZXBvcnRHZW5lcmF0b3JUeXBlIVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGVSZXBvcnQoZ2VuUGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2dlbmVyYXRlUmVwb3J0KGdlblBhcmFtczogR29yZGljLlJlcG9ydC5XZWJDbGllbnQuSUdFeHRlbmRlZEdlbmVyYXRlUGFyYW1zKTogSlF1ZXJ5UHJvbWlzZTx2b2lkPiB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjYW5jZWxsYXRpb25Ub2tlbiA9IG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdW5pcXVlQ2xhc3M6IFwiXCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjYW5jZWxBY3QgPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInJlcEdlbkNhbmNlbEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjg2XCIsIC8vUkMgMzExMDAyODYgOiBTdG9ybm9cclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4udXBkYXRlKHsgY2FuY2VsbGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjg3XCIsIC8vUkMgMzExMDAyODcgOiBTdG9ybnVqaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdlbkNudCA9IHRoaXMuY3JlYXRlU2VydmljZUNvbnRlbnQoW0dvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRBc3luY0dlbmVyYXRvcl0pIGFzIHVua25vd24gYXMgR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydEFzeW5jR2VuZXJhdG9yO1xyXG5cclxuICAgICAgICAgICAgZ2VuQ250Lm9uKFwicHJvZ3Jlc3NcIiwgKHByb2dyZXNzOiBHb3JkaWMuQXN5bmMuSUdUYXNrUHJvZ3Jlc3MpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NPcGVyYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRUcmVlQ29udHJvbFRTLmZvcm1hdFByb2dyZXNzTWVzc2FnZShwcm9ncmVzcy50ZXh0KSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogcHJvZ3Jlc3MuY3VycmVudCEsXHJcbiAgICAgICAgICAgICAgICAgICAgdG90YWw6IHByb2dyZXNzLnRvdGFsISxcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxBY3Rpb246IGNhbmNlbEFjdFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2VuQ250LnJlYWR5QXdhaXRcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIGdlbkNudC5nZW5lcmF0ZShnZW5QYXJhbXMsIGNhbmNlbGxhdGlvblRva2VuKSB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4dCA9ICgocmVzLmZpbGVJbmZvPy5maWxlbmFtZSA/PyBcIlwiKS5zcGxpdChcIi5cIilbMV0gPz8gXCJcIikudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkb2N1bWVudCA9IG5ldyBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0RG9jdW1lbnQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNob3dCYXRjaGVzSWZBdmFpbGFibGUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHIgPSByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJCYXRjaGVzID0gKHI/LmZpbGVJbmZvIGFzIEdvcmRpYy5SZXBvcnQuSW50ZXJmYWNlLkdCYXRjaGVzSW5mb0R0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyICYmIHJCYXRjaGVzLmZpbGVzICYmIHJCYXRjaGVzLmZpbGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzOiBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5JR1JlcG9ydEdlbmVyYXRlUmVzdWx0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByIS5pZCEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0Y2hGaWxlczogckJhdGNoZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG1zSW5mbzogci5kbXNJbmZvIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydFRyZWVDb250cm9sVFMud2FpdEJhdGNoRmlsZXNEaWFsb2cocmVzLCBkb2N1bWVudCwgdGhpcyk7IC8vVWtsaWQgamUgdXZuaXRyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQud2hlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleHQgPT09IFwiZ2ZybVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC53aGVuKHNob3dCYXRjaGVzSWZBdmFpbGFibGUoKSwgdGhpcy5zaG93R2ZybShyZXMsIGdlblBhcmFtcywgdGhpcy5nZW5lcmF0b3JPcHRpb25zKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmRvd25sb2FkRG9jdW1lbnQoR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydFRyZWVDb250cm9sVFMuZ2V0RG93bmxvYWRlclBhcmFtcyhyZXMpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChycj8uQ3VzdG9tRGF0YT8uZGlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgckJhdGNoZXMgPSAocmVzPy5maWxlSW5mbyBhcyBHb3JkaWMuUmVwb3J0LkludGVyZmFjZS5HQmF0Y2hlc0luZm9EdG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJCYXRjaGVzLmRpcmVjdG9yeSA9IHJyLkN1c3RvbURhdGEuZGlyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHJlc3VsdDogcmVzLCBjdXN0b21EYXRhOiByci5DdXN0b21EYXRhLCBzaG93QmF0Y2hlc0lmQXZhaWxhYmxlOiBzaG93QmF0Y2hlc0lmQXZhaWxhYmxlIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChjdHgpID0+IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjdHgpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN0eC5zaG93QmF0Y2hlc0lmQXZhaWxhYmxlKCkudGhlbigoKSA9PiBjdHgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHsgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgocj86IEdFcnJvciB8IEpRdWVyeVhIUiB8IEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRHZW5lcmF0ZUFzeW5jUmVqZWN0aW9uLCBzPzogc3RyaW5nLCBlaT86IElHRXhjZXB0aW9uSW5mb01pbmltYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAociAmJiBUeXBlR3VhcmRzLmlzT2ZUeXBlPEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRHZW5lcmF0ZUFzeW5jUmVqZWN0aW9uPihyLCBcImdlblN0YXRlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIuaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyLmdlblN0YXRlID09PSBcImNhbmNlbFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Rmxhc2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtd2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzExMDAxNzFcIiwgLy9SQyAzMTEwMDE3MSA6IEdlbmVyb3bDoW7DrSBzZXN0YXZ5IGJ5bG8genJ1xaFlbm8gdcW+aXZhdGVsZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyLmV4Y2VwdGlvbikgdGhpcy5kaWFsb2dzLnNob3dFeGNlcHRpb24oci5leGNlcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL05PVEU6IE9zdGF0bmkgcHJpcGFkeSBhc2kgbmVjaGFtZSBrbGFzaWNreSBzcGFkbm91dC5cclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyByO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpOyBnZW5DbnQuY2xvc2UoKTsgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdlbmVyYXRlUmVwb3J0QXN5bmMocG96OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUG96YWRhdmVrRGV0YWlsRHRvLCBnZnJtTmF2Q29udGVudDogR0NvbnRlbnQpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgZ2VuUGFyYW1zOiBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5JR0V4dGVuZGVkR2VuZXJhdGVQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICByZXBvcnRJZDogcG96LldyaWQhLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogcG96Lk5hemV2ID8/IHBvei5zZXMgPz8gdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgb3V0cHV0U3R5bGU6IHBvei5PdXRwdXRTdHlsZSEsXHJcbiAgICAgICAgICAgICAgICBwbGF0bm9zdDogcG96LnBsYXRub3N0ISxcclxuICAgICAgICAgICAgICAgIGdlbmVyYXRvclBhcmFtczogcG96LFxyXG4gICAgICAgICAgICAgICAgcHJvcHM6IHsgUGxhdG5vc3Q6IHBvei5wbGF0bm9zdCEgfSxcclxuICAgICAgICAgICAgICAgIHJlcG9ydEdlbmVyYXRvclR5cGU6IHRoaXMuZ2VuZXJhdG9yT3B0aW9ucy5yZXBvcnRHZW5lcmF0b3JUeXBlIVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZ2VuT3B0aW9uczogR29yZGljLlJlcG9ydC5XZWJDbGllbnQuSUdSZXBvcnRBc3luY0dlbmVyYXRvck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBwZXJzaXN0ZW50OiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdlbkNudCA9IHRoaXMuY3JlYXRlU2VydmljZUNvbnRlbnQoW0dvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRBc3luY0dlbmVyYXRvciwgeyBhdXRvTG9hZFBhcmFtczogZ2VuT3B0aW9ucyB9XSkgYXMgdW5rbm93biBhcyBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0QXN5bmNHZW5lcmF0b3I7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIGdlbkNudC5yZWFkeUF3YWl0XHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiBnZW5DbnQuc3RhcnRHZW5lcmF0ZShnZW5QYXJhbXMpOyB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCk7IGdlbkNudC5jbG9zZSgpOyB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZVJlcG9ydChwb3o6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQb3phZGF2ZWtEZXRhaWxEdG8pOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHIgPSB7XHJcbiAgICAgICAgICAgICAgICByZXBvcnRJZDogcG96LldyaWQhLFxyXG4gICAgICAgICAgICAgICAgb3V0cHV0U3R5bGU6IHBvei5PdXRwdXRTdHlsZSEsXHJcbiAgICAgICAgICAgICAgICBwbGF0bm9zdDogcG96LnBsYXRub3N0ISxcclxuICAgICAgICAgICAgICAgIGdlbmVyYXRvclBhcmFtczogcG96LFxyXG4gICAgICAgICAgICAgICAgcHJvcHM6IHsgUGxhdG5vc3Q6IHBvei5wbGF0bm9zdCEgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBzdGFydC5zZXRNaW51dGVzKHN0YXJ0LmdldE1pbnV0ZXMoKSArIDE1KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBvZGxvelRhc2tOYW1lID0gcG96Py5SZXBvcnRJbmZvPy5yZXBvcnRJbmZvPy5uYXpldiA/PyBcIlwiO1xyXG4gICAgICAgICAgICBpZiAob2Rsb3pUYXNrTmFtZSkgb2Rsb3pUYXNrTmFtZSArPSBgIC0gJHtwb3o/LlJlcG9ydEluZm8/LnJlcG9ydEluZm8/LmlkU2VzID8/IFwiXCJ9YDtcclxuICAgICAgICAgICAgY29uc3QgbWFpbFN1YmplY3QgPSBcImpyZXM6MzExMDAyODJcIi5mb3JtYXQob2Rsb3pUYXNrTmFtZSk7IC8vUkMgMzExMDAyODIgOiBHZW5lcm92w6Fuw60gc2VzdGF2eTogezB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzY2hlZHVsZXJPcHRpb25zOiBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5JR1JlcG9ydFNjaGVkdWxlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICByZXBvcnQ6IEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRVdGlscy5jb252ZXJ0UGFyYW1zVG9HQ3JlYXRlUmVwb3J0RHRvKHIpLFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0U2NoZWR1bGVyQ2xhc3NOYW1lOiBcIkdvcmRpYy5VY3IuV2ViQ2xpZW50LlJlcG9ydHMuR1VjclJlcG9ydFNjaGVkdWxlclwiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogb2Rsb3pUYXNrTmFtZSxcclxuICAgICAgICAgICAgICAgIG1haWxTdWJqZWN0OiBtYWlsU3ViamVjdCxcclxuICAgICAgICAgICAgICAgIG1haWxDb250ZW50OiBcImpyZXM6MzExMDAyODNcIi5mb3JtYXQobWFpbFN1YmplY3QpIC8vUkMgMzExMDAyODMgOiBWIHDFmcOtbG96ZSBqZSB1bG/FvmVuYSBzZXN0YXZhIGdlbmVyb3ZhbsOhIHYgcmXFvmltdSBvZGxvxb5lbsOpaG8genByYWNvdsOhbsOtIG1vZHVsdSBVQ1IwNSBHSU5JUyAtIHswfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCBjbnRJbml0T3B0aW9uczogSUdDbGllbnRDb250ZW50SW5pdGlhbGl6ZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgaW5pdDogKGNudCkgPT4geyByZXR1cm4gbmV3IEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRTY2hlZHVsZXIoY250LCBzY2hlZHVsZXJPcHRpb25zKTsgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgR0NsaWVudENvbnRlbnRJbml0aWFsaXplciwgY250SW5pdE9wdGlvbnMpLy9WYXJpYW50YSBzIGRlZGljbm9zdGlcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldCAmJiByZXQuc2NoZWR1bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjaGVkdWxlID0gcmV0LnNjaGVkdWxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaChTdHJpbmcuRm9ybWF0KFwianJlczozMTEwMDE3MFwiLCBzY2hlZHVsZS5Qb3JDaXNVbG9oeSwgc2NoZWR1bGUuSXhzUG96KSk7IC8vUkMgMzExMDAxNzAgOiBQb8W+YWRhdmVrIG5hIG9kbG/FvmVuw6kgenByYWNvdsOhbsOtIGJ5bCB1bG/FvmVuLiDEjMOtc2xvIMO6bG9oeSB7MH0sIElEIHsxfS5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0T3V0cHV0KHJldDogSUdQcmludEFjdGlvblJlcG9ydEluZm8pOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKCFyZXQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3RoaXMubG9nLnRyYWNlKFwic2V0T3V0cHV0XCIsIHJldCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdFZhbHVlcygpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocCkgPT4geyByZXR1cm4gdGhpcy5jYWxsIDwgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlcG9ydEluZm9EdG8gPiAoXCJHZXRVY3JSZXBvcnRJbmZvXCIsIHsgZHRvOiBwIH0pIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWZhdWx0Rm9ybWF0ID0gci5yZXBvcnRJbmZvICYmIHIucmVwb3J0SW5mby5vdXRwdXRJbmZvICYmIHIucmVwb3J0SW5mby5vdXRwdXRJbmZvLnNlbGVjdGVkT3V0cHV0VHlwZU9yRGVmYXVsdCB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG96YWRhdmVrLk91dHB1dFN0eWxlID0gZGVmYXVsdEZvcm1hdDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvemFkYXZlay5SZXBvcnRJbmZvID0gcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKFwiT3V0cHV0U3R5bGVOYW1lXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMucG96YWRhdmVrLCB7IHZlcmlmaWNhdGlvbk5lZWRlZDogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50cyh0aGlzLnBvemFkYXZlayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdW1hY2VIcm8ocik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVBY3Rpb25zU3RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25PYmRvYmlDaGFuZ2VkKG1lc2ljOiBib29sZWFuPWZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzT2Jkb2JpQ2hhbmdpbmcpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5pc09iZG9iaUNoYW5naW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVWeXN0dXBBY3RFa29EYXRlKClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb2xsZWN0VmFsdWVzKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigocG96KSA9PiB7IHJldHVybiB0aGlzLnZhbGlkYXRlUmVwb3J0UGxhdG5vc3QocG96KSB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7IHRoaXMuaXNPYmRvYmlDaGFuZ2luZyA9IGZhbHNlOyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlVnlzdHVwQWN0RWtvRGF0ZSgpOiBKUXVlcnlQcm9taXNlPFVjdC5JbnRlcmZhY2UuR1VjckluZm9EdG8+IHtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICBsZXQgcm9rJCA9IHRoaXMuZmluZEZpZWxkcyhcIlJva1wiKTtcclxuICAgICAgICAgICAgbGV0IG1lc2ljJCA9IHRoaXMuZmluZEZpZWxkcyhcIk1lc2ljXCIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJvayQuYWRkKG1lc2ljJCkuZ2Zvcm0oXCJ3YWl0Rm9yVmFsdWVzXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJva0R0byA9IHJvayQuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgYXMgR29yZGljLkRhdGEuUmVhZGVycy5VY3JSb2tEdG87XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lc2ljRHRvID0gbWVzaWMkLmdmaWVsZChcImdldFZhbHVlXCIpIGFzIEdvcmRpYy5EYXRhLlJlYWRlcnMuVWNyTWVzaWNEdG87XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbWVzaWNEdG8gfHwgIW1lc2ljRHRvLm1lc2ljIHx8IG1lc2ljRHRvLm1lc2ljID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJWeXN0dXAoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMudnlzdHVwQWN0LnBsYXRub3N0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvemFkYXZlay5wbGF0bm9zdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQWN0aW9uc1N0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudnlzdHVwQWN0LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZ5c3R1cFNlbGVjdG9yQWN0LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLiRwb3pUYWIuZmluZEZpZWxkcyhcInNlc1wiKS5nZmllbGQoXCJjbGVhclwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRwb3pQYXJUYWIuZmluZEZpZWxkcyhcInNlc1wiKS5nZmllbGQoXCJjbGVhclwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRwb3pUYWIuZmluZEZpZWxkcyhcIldyaWRcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLmNhbGw8R1VjclBsYXRub3N0RHRvPihcIkdldFBsYXRub3N0XCIsIHsgcm9rOiByb2tEdG8ucm9rLCBtZXNpYzogbWVzaWNEdG8ubWVzaWMgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc2wuVWNySW5mb3MuZ2V0SW5mbyh7IHJvazogcm9rRHRvLnJvayEsIG1lc2ljOiBtZXNpY0R0by5tZXNpYyB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0OiBVY3QuSW50ZXJmYWNlLkdVY3JJbmZvRHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZy50cmFjZShcInJlc3VsdFwiLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52eXN0dXBBY3QucGxhdG5vc3QgPSByZXN1bHQuUGxhdG5vc3Q/LnBsYXRub3N0ITsgLy9Qb3pvciE6IEN0ZSBzZSBwcmkgem9icmF6ZW5pIHN0cm9tdSBzZXN0YXYgcHJlcyBzZXN0YXZvdmUgcG9saWNrbyBcIkdvcmRpYy5QcmVmYWJzLlNlbGVjdC5yZXBvcnRzKClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3phZGF2ZWsucGxhdG5vc3QgPSByZXN1bHQuUGxhdG5vc3Q/LnBsYXRub3N0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLiRwb3pUYWIuZmluZEZpZWxkcyhcInNlc1wiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRwb3pQYXJUYWIuZmluZEZpZWxkcyhcInNlc1wiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUFjdGlvbnNTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52eXN0dXBBY3QuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudnlzdHVwU2VsZWN0b3JBY3QuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBvelRhYi5maW5kRmllbGRzKFwiV3JpZFwiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6bWVuYSB0b29sdGlwdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcG96VGFiLmZpbmRGaWVsZHMoXCJNZXNpY1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJ0b29sdGlwXCIsIHJlc3VsdC5NZXNpY1BvcGlzISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy50aGVuKChwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB0aGlzLmxvZy50cmFjZShcInBsYXRub3N0XCIsIHAucGxhdG5vc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgIHRoaXMudnlzdHVwQWN0LnBsYXRub3N0ID0gcC5wbGF0bm9zdDsgLy9Qb3pvciE6IEN0ZSBzZSBwcmkgem9icmF6ZW5pIHN0cm9tdSBzZXN0YXYgcHJlcyBzZXN0YXZvdmUgcG9saWNrbyBcIkdvcmRpYy5QcmVmYWJzLlNlbGVjdC5yZXBvcnRzKClcIlxyXG4gICAgICAgICAgICAgICAgLy8gICAgdGhpcy5wb3phZGF2ZWsucGxhdG5vc3QgPSBwLnBsYXRub3N0O1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy90aGlzLiRwb3pUYWIuZmluZEZpZWxkcyhcInNlc1wiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB0aGlzLiRwb3pQYXJUYWIuZmluZEZpZWxkcyhcInNlc1wiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB0aGlzLnVwZGF0ZUFjdGlvbnNTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdGhpcy52eXN0dXBBY3QuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIHRoaXMudnlzdHVwU2VsZWN0b3JBY3QuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuJHBvelRhYi5maW5kRmllbGRzKFwiV3JpZFwiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gcDtcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBVcGRhdGUgR1VJIG5hIHN1bWFjZSArIGhybyAqL1xyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlU3VtYWNlSHJvKHJlcG9ydEluZm8/OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmVwb3J0SW5mb0R0b3xudWxsKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBzdW1hdG9yeVNlbGVjdG9yID0gXCJpY29fcyx1Y3Nfcyx1dXNfcyxua3Nfc1wiO1xyXG4gICAgICAgICAgICBsZXQgaHJvU2VsZWN0b3IgPSBcImZsYWdTb3Vocm5lXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMucmVhZE9ubHkgJiYgcmVwb3J0SW5mbyAmJiByZXBvcnRJbmZvLnVtaVN1bWFjZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhzdW1hdG9yeVNlbGVjdG9yKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhzdW1hdG9yeVNlbGVjdG9yKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnJlYWRPbmx5ICYmIHJlcG9ydEluZm8gJiYgcmVwb3J0SW5mby51bWlIcm8pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoaHJvU2VsZWN0b3IpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKGhyb1NlbGVjdG9yKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaG93R2ZybShnZW5SZXM6IEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LklHUmVwb3J0R2VuZXJhdGVSZXN1bHQgfCBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0R2VuZXJhdGVSZXN1bHRBc3luY0R0bywgcGFyYW1zOiBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5JR1JlcG9ydEdlbmVyYXRlUGFyYW1zLCBnZW5lcmF0b3JPcHRpb25zOiBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5JR1JlcG9ydEdlbmVyYXRvck9wdGlvbnMpOiBKUXVlcnlQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQ8dm9pZD4oKTtcclxuICAgICAgICAgICAgbGV0IGdmcm1PcHRpb25zOiBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5JR0ZybUNvbnRyb2xPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgRm9ybTogZ2VuUmVzLmZpbGVJbmZvIS5ndWlkISxcclxuICAgICAgICAgICAgICAgIHNlcnZlcjogXCJHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HRnJtQ29udHJvbFwiLFxyXG4gICAgICAgICAgICAgICAgZ2VuUmVzOiBnZW5SZXMsXHJcbiAgICAgICAgICAgICAgICBnZW5lcmF0b3JPcHRpb25zOiBnZW5lcmF0b3JPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HRnJtQ29udHJvbCwgZ2ZybU9wdGlvbnMsIHsgd2lkdGg6IDkwMCwgaGVpZ2h0OiA2MDAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgY3R4KSA9PiB7IGRlZi5yZXNvbHZlKCk7IH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVXByYXZhIHZ5a29ubnljaCBha2NpIHBvZGxlIHN0YXZ1IGR0byAqL1xyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlQWN0aW9uc1N0YXRlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgcGxhdG5vc3QgPSB0aGlzLnZ5c3R1cEFjdC5wbGF0bm9zdDtcclxuICAgICAgICAgICAgbGV0IGVuYWJsZWQgPSB0aGlzLmZpbmRGaWVsZHMoXCJXcmlkXCIpLmdmaWVsZChcImhhc1ZhbHVlXCIpOyAvLyEhdGhpcy5wb3phZGF2ZWsuV3JpZDtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcm92YXRBY3QuZW5hYmxlZChlbmFibGVkKTtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcm92YXRBc3luY0FjdC5lbmFibGVkKGVuYWJsZWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVBY3QuZW5hYmxlZChlbmFibGVkICYmICF0aGlzLmlzT2Rsb3plbnkpO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVOZXdBY3QuZW5hYmxlZChlbmFibGVkICYmICF0aGlzLmlzT2Rsb3plbnkgJiYgISF0aGlzLnBvemFkYXZlay5JeHNTZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE9ubHlBY3QuZW5hYmxlZCh0aGlzLmlzT2Rsb3plbnkpO1xyXG4gICAgICAgICAgICB0aGlzLm9kbG96QWN0LmVuYWJsZWQoZW5hYmxlZCAmJiAhdGhpcy5pc09kbG96ZW55ICYmICgodGhpcy5wb3phZGF2ZWs/LlJlcG9ydEluZm8/LnJlcG9ydEluZm8/LmlzT2Rsb3ppdGVsbmUgPz8gZmFsc2UpKSk7XHJcbiAgICAgICAgICAgIHRoaXMubmV3TWFza2FBY3QuZW5hYmxlZChlbmFibGVkKTtcclxuICAgICAgICAgICAgdGhpcy5tYXNrYURldGFpbHNBY3QuZW5hYmxlZChlbmFibGVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlRmllbGRzU3RhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vTk9URTogQ2VsZSB2eWNoYXppIHogVEssIG1ldG9keSBHb3JkaWMudWNyLldpbkNsaWVudC5HR2VuZXJvdmFuaVNlc3RhdnlDb250cm9sLlVwZGF0ZUNvbnRyb2xzU3RhdGUoKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTdW1hY2VIcm8odGhpcy5wb3phZGF2ZWsuUmVwb3J0SW5mbyk7XHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gSW5pY2lhbGl6YWNlXHJcblxyXG4gICAgICAgICAgICBsZXQgaW5pdGlhbGx5RW5hYmxlZFNlbGVjdG9yID0gXCJpY28saWNvRXh0LHVjcyx1dXMsbmtzXCI7XHJcbiAgICAgICAgICAgIGxldCBpbml0aWFsbHlEaXNhYmxlZFNlbGVjdG9yID0gXCJzZXNcIjtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhpbml0aWFsbHlFbmFibGVkU2VsZWN0b3IpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoaW5pdGlhbGx5RGlzYWJsZWRTZWxlY3RvcikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKGluaXRpYWxseUVuYWJsZWRTZWxlY3RvcikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoaW5pdGlhbGx5RGlzYWJsZWRTZWxlY3RvcikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgbGV0IHR5cE9zZUtzOiBHQmFzZUZpbHRlcjxzdHJpbmc+O1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdsb2JhbHMuUmV6aW1Qcm92b3p1KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuU09SOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbHMuVHlwU3VtYXJpemFjZSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFN1bWFyaXphY2UuRXh0ZXJuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCJ1Y3MsdXVzLG5rc1wiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCJpY29fcyx1Y3Nfcyx1dXNfcyxua3Nfc1wiKS5nZmllbGQoXCJkaXNhYmxlXCIpLmdjaGVjayhcInNldFZhbHVlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwT3NlS3MgPSB7IG86IFwiTk9UIElOXCIsIHY6IFtcImljb1wiLCBcInVjc1wiLCBcInV1c1wiLCBcIm5rc1wiXSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHR5cE9zZUtzID0geyBvOiBcIk5PVCBJTlwiLCB2OiBcInJhclwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuSUNPOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVrb1BhcmFtcy5JY28pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKFwiaWNvLGljb0V4dFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGljbzogdGhpcy5la29QYXJhbXMuSWNvIH0sIHsgdmFsaWQ6IGZhbHNlIH0pLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhcImljb19zXCIpLmdmaWVsZChcImRpc2FibGVcIikuZ2NoZWNrKFwic2V0VmFsdWVcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICR1Y3MgPSB0aGlzLmZpbmRGaWVsZHMoXCJ1Y3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkdXVzID0gdGhpcy5maW5kRmllbGRzKFwidXVzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJG5rcyA9IHRoaXMuZmluZEZpZWxkcyhcIm5rc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNydkZpbHRlcnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286ICgpID0+IHsgcmV0dXJuIHRoaXMuZmluZEZpZWxkcyghdGhpcy5leHRlcm5pU3VtYXJpemFjZSA/IFwiaWNvXCIgOiBcImljb0V4dFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKS5pY287IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBha3RfcHJvaGw6ICgpID0+IHsgcmV0dXJuIDEwMDsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAoKSA9PiB7IHJldHVybiBudWxsOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL05PVEU6IERsZSBTa2FsaWNlIG5lbHplIHBvdXppdCBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeSBwbyB2eWJ1ZG92YW5pIHBvbGljZWsuIEplIHRvIHRhbSBwcnkgamVuIHBybyB2eXR2b3JlbmkgeiBkZWZpbmljZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgIGplc3RlIHByZWQgdGltLCBuZXoganNvdSB2bG96ZW55IGRvIERPTS4gRG9wb3J1Y2VueSBqZSBkZWxlZ2F0b3Z5IHpwdXNvYlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdWNzLmdzZWxlY3Rib3goXCJvcHRpb25cIiwgXCJzZXJ2ZXJGaWx0ZXJzXCIsICQuZXh0ZW5kKHt9LCBzcnZGaWx0ZXJzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR1dXMuZ3NlbGVjdGJveChcIm9wdGlvblwiLCBcInNlcnZlckZpbHRlcnNcIiwgJC5leHRlbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiBmdW5jdGlvbiAodGhpczogSFRNTEVsZW1lbnQpIHsgcmV0dXJuICR1Y3MuZ2ZpZWxkKFwiZ2V0VmFsdWVBc3luY1wiKS50aGVuKCh2KSA9PiB7IHJldHVybiB2Py51Y3MgPz8gdW5kZWZpbmVkOyB9KTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBzcnZGaWx0ZXJzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRua3MuZ3NlbGVjdGJveChcIm9wdGlvblwiLCBcInNlcnZlckZpbHRlcnNcIiwgJC5leHRlbmQoe30sIHNydkZpbHRlcnMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHR5cE9zZUtzID0geyBvOiBcIk5PVCBJTlwiLCB2OiBbXCJpY29cIiwgXCJyYXJcIl0gfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5VQ1M6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICR1Y3MgPSB0aGlzLmZpbmRGaWVsZHMoXCJ1Y3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICR1dXMgPSB0aGlzLmZpbmRGaWVsZHMoXCJ1dXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRua3MgPSB0aGlzLmZpbmRGaWVsZHMoXCJua3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNydkZpbHRlcnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljbzogKCkgPT4geyByZXR1cm4gdGhpcy5maW5kRmllbGRzKCF0aGlzLmV4dGVybmlTdW1hcml6YWNlID8gXCJpY29cIiA6IFwiaWNvRXh0XCIpLmdmaWVsZChcImdldFZhbHVlXCIpLmljbzsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0X3Byb2hsOiAoKSA9PiB7IHJldHVybiAxMDA7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAoKSA9PiB7IHJldHVybiBudWxsOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHV1cy5nc2VsZWN0Ym94KFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiLCAkLmV4dGVuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVjczogZnVuY3Rpb24gKHRoaXM6IEhUTUxFbGVtZW50KSB7IHJldHVybiAkdWNzLmdmaWVsZChcImdldFZhbHVlQXN5bmNcIikudGhlbigodikgPT4geyByZXR1cm4gdj8udWNzID8/IHVuZGVmaW5lZDsgfSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9LCBzcnZGaWx0ZXJzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVrb1BhcmFtcy5JY28pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKFwiaWNvLGljb0V4dFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGljbzogdGhpcy5la29QYXJhbXMuSWNvIH0sIHsgdmFsaWQ6IGZhbHNlIH0pLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhcImljb19zXCIpLmdmaWVsZChcImRpc2FibGVcIikuZ2NoZWNrKFwic2V0VmFsdWVcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG5rcy5nc2VsZWN0Ym94KFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiLCAkLmV4dGVuZCh7fSwgc3J2RmlsdGVycykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZWtvUGFyYW1zLkljbyAmJiB0aGlzLmVrb1BhcmFtcy5VY3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKFwidWNzXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgaWNvOiB0aGlzLmVrb1BhcmFtcy5JY28sIHVjczogdGhpcy5la29QYXJhbXMuVWNzIH0sIHsgdmFsaWQ6IGZhbHNlIH0pLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhcInVjc19zXCIpLmdmaWVsZChcImRpc2FibGVcIikuZ2NoZWNrKFwic2V0VmFsdWVcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwT3NlS3MgPSB7IG86IFwiTk9UIElOXCIsIHY6IFtcImljb1wiLCBcInJhclwiLCBcInVjc1wiXSB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1Lk5LUzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5la29QYXJhbXMuSWNvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhcImljbyxpY29FeHRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBpY286IHRoaXMuZWtvUGFyYW1zLkljbyB9LCB7IHZhbGlkOiBmYWxzZSB9KS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCJpY29fc1wiKS5nZmllbGQoXCJkaXNhYmxlXCIpLmdjaGVjayhcInNldFZhbHVlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVrb1BhcmFtcy5JY28gJiYgdGhpcy5la29QYXJhbXMuVWNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhcInVjc1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGljbzogdGhpcy5la29QYXJhbXMuSWNvLCB1Y3M6IHRoaXMuZWtvUGFyYW1zLlVjcyB9LCB7IHZhbGlkOiBmYWxzZSB9KS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCJ1Y3Nfcyx1dXNfcyx1Y3Nfc1wiKS5nZmllbGQoXCJkaXNhYmxlXCIpLmdjaGVjayhcInNldFZhbHVlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKFwidXVzXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5la29QYXJhbXMuSWNvICYmIHRoaXMuZWtvUGFyYW1zLk5rcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCJua3NcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBpY286IHRoaXMuZWtvUGFyYW1zLkljbywgbmtzOiB0aGlzLmVrb1BhcmFtcy5Oa3MgfSwgeyB2YWxpZDogZmFsc2UgfSkuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKFwibmtzX3NcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKS5nY2hlY2soXCJzZXRWYWx1ZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0eXBPc2VLcyA9IHsgbzogXCJOT1QgSU5cIiwgdjogW1wiaWNvXCIsIFwicmFyXCIsIFwidWNzXCIsIFwidXVzXCIsIFwibmtzXCJdIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBHRXJyb3IoXCJOb3RJbXBsZW1lbnRlZC4uLlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8odGhpcy4kcG96VGFiLmZpbmRGaWVsZHMoXCJzZXNcIikgYXMgYW55KS5nZmllbGQoXCJvcHRpb25cIiwgXCJ0eXBPc2VLc1wiLCB0eXBPc2VLcyk7XHJcbiAgICAgICAgICAgICh0aGlzLiRwb3pQYXJUYWIuZmluZEZpZWxkcyhcInNlc1wiKSBhcyBhbnkpLmdmaWVsZChcIm9wdGlvblwiLCBcInR5cE9zZUtzXCIsIHR5cE9zZUtzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZUVsZW1lbnRzKHBvejogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclBvemFkYXZla0RldGFpbER0byk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgZ2YgPSB0aGlzLmdldEVsZW1lbnRGb3JtYXQocG96KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICghZ2YpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBfX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCJlbGVtZW50c1wiKVxyXG4gICAgICAgICAgICAgICAgLmdzZWxlY3Rib3goXCJkZXN0cm95XCIpXHJcbiAgICAgICAgICAgICAgICAuZ3NlbGVjdGJveChcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLlByZWZhYnMuY2Z1RWxlbWVudHMoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVsZW1lbnRzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKCkgeyBfX3RoaXMubG9nLnRyYWNlKFwiZWxlbWVudHMgY2hhbmdlKCk6IFwiLCAkKHRoaXMpLmdmaWVsZChcImdldFZhbHVlXCIpKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogZ2YsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVWV0ZTogdGhpcy5la29QYXJhbXMuQ2hlY2tVZXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5BZGROZXdSZWNvcmRzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5SZW1vdmVSZWNvcmRzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1hdEVsZW1lbnRWYWx1ZTogR29yZGljLkVrby5QcmVmYWJzLmZvcm1hdEVsZW1lbnRWYWx1ZXNNdWx0aWxpbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZU5ld1JlY29yZDogR0VsZW1lbnRVdGlscy5jcmVhdGVOZXdFbGVtZW50RnVuYyh0aGlzLmdsb2JhbHMuUmV6aW1Qcm92b3p1ISwgdGhpcy5la29QYXJhbXMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclJlY29yZDogR0VsZW1lbnRVdGlscy5jcmVhdGVDbGVhckVsZW1lbnRGdW5jKHRoaXMuZ2xvYmFscy5SZXppbVByb3ZvenUhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0RWxlbWVudFZhbHVlT3B0aW9uczogeyBza2lwOiBHRWxlbWVudFV0aWxzLmdldEVsZW1lbnRWYWx1ZVNraXBDb2x1bW5zKHRoaXMuZ2xvYmFscy5SZXppbVByb3ZvenUhKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5jbGVhckVsZW1lbnRzQWN0LCBjYXB0aW9uVmlzaWJsZTogXCJuZXZlclwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5uZXdNYXNrYUFjdCwgY2FwdGlvblZpc2libGU6IFwibmV2ZXJcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5nc2VsZWN0Ym94KFwibW9kZWxcIiwgXCJhcHBseVwiLCBwb3opO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRFbGVtZW50Rm9ybWF0KHBvejogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclBvemFkYXZla0RldGFpbER0byk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R0Vrb0ZpbHRlckR0bz4gfCBudWxsIHtcclxuICAgICAgICAgICAgbGV0IHR5cFNlc3RhdnkgPSBwb3ouUmVwb3J0SW5mbyAmJiBwb3ouUmVwb3J0SW5mby50eXBTZXN0YXZ5ID8gcG96LlJlcG9ydEluZm8udHlwU2VzdGF2eSA6IG51bGw7XHJcbiAgICAgICAgICAgIGlmICghdHlwU2VzdGF2eSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgY2Z1U2V0ID0gR29yZGljLkVrby5DZnVVdGlscy5nZXRDZnVTZXRTZXJ2ZXJGaWx0ZXJzKHRoaXMsIHtcclxuICAgICAgICAgICAgICAgIGlzUm96OiB0cnVlLCAvL1RhayB0byBqZSB2IGtvbnN0cnVrdG9ydSBHb3JkaWMuVWNyLldpbkNsaWVudC5HR2VuZXJvdmFuaVNlc3RhdnlDb250cm9sXHJcbiAgICAgICAgICAgICAgICBpc1VjdDogdHJ1ZSwgLy9UYWsgdG8gamUgdiBrb25zdHJ1a3RvcnUgR29yZGljLlVjci5XaW5DbGllbnQuR0dlbmVyb3ZhbmlTZXN0YXZ5Q29udHJvbFxyXG4gICAgICAgICAgICAgICAgaXhzUm96OiB0aGlzLmVrb1BhcmFtcy5JeHNSb3ogfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tVZXRlOiB0aGlzLmVrb1BhcmFtcy5DaGVja1VldGUsXHJcbiAgICAgICAgICAgICAgICB3aWxkY2FyZDogdGhpcy5HbG9iYWxzLk90aGVycz8uV2lsZGNhcmQsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdmID0gR0VsZW1lbnRVdGlscy5jcmVhdGVFbGVtZW50c0dyaWRGb3JtYXQoe1xyXG4gICAgICAgICAgICAgICAgdHlwU2VzdGF2eTogdHlwU2VzdGF2eSxcclxuICAgICAgICAgICAgICAgIGZpbHRlck9wdGlvbnM6IHRoaXMuZmlsdGVyT3B0aW9ucyxcclxuICAgICAgICAgICAgICAgIGZpbHRlclBhcmFtczogdGhpcy5maWx0ZXJQYXJhbXMsXHJcbiAgICAgICAgICAgICAgICBnbG9iYWxzOiB0aGlzLmdsb2JhbHMsXHJcbiAgICAgICAgICAgICAgICBjZnVTZXQ6IGNmdVNldCxcclxuICAgICAgICAgICAgICAgIGVrb1BhcmFtczogdGhpcy5la29QYXJhbXNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBnZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2F2ZShwb3o6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQb3phZGF2ZWtEZXRhaWxEdG8pOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5sb2cuZGVidWcoXCJzYXZlKClcIiwgcG96KTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQb3phZGF2ZWtEZXRhaWxEdG8+KFwiU2F2ZVwiLCB7IGR0bzogcG96IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigocCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG96YWRhdmVrID0gcDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMucG96YWRhdmVrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaChcImpyZXM6MzExMDAyMjJcIik7IC8vUkMgMzExMDAyMjIgOiBQb8W+YWRhdmVrIGJ5bCB1bG/FvmVuLlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIHNhdmVOZXcocG96OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUG96YWRhdmVrRGV0YWlsRHRvKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nLmRlYnVnKFwic2F2ZSgpXCIsIHBveik7XHJcbiAgICAgICAgICAgIHRoaXMuaXNsLlVjclBvemFkYXZlay5zYXZlKHtkYXRhOnBven0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC50aGVuKChwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnBvemFkYXZlayA9IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLnBvemFkYXZlayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Rmxhc2goXCJqcmVzOjMxMTAwMjIyXCIpOyAvL1JDIDMxMTAwMjIyIDogUG/FvmFkYXZlayBieWwgdWxvxb5lbi5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBnZXRTZXJ2aWNlT3B0aW9ucygpOiBHVWNyTWFza2FTZXJ2aWNlT3B0aW9ucyB7XHJcbiAgICAgICAgICAgIGxldCBwb3ogPSB0aGlzLnBvemFkYXZlaztcclxuICAgICAgICAgICAgbGV0IHR5cFNlc3RhdnkgPSBwb3ouUmVwb3J0SW5mbyAmJiBwb3ouUmVwb3J0SW5mby50eXBTZXN0YXZ5ID8gcG96LlJlcG9ydEluZm8udHlwU2VzdGF2eSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwU2VzdGF2eTogdHlwU2VzdGF2eSwgcGFyZW50Q29udGVudDogdGhpcywgZnJhZ21lbnRzOlwiKlwiIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNob3dTZXpuYW1NYXNlaygpOiBKUXVlcnlQcm9taXNlPEdVY3JNYXNrYUR0bz4ge1xyXG4gICAgICAgICAgICBsZXQgZCA9ICQuRGVmZXJyZWQ8R1Vjck1hc2thRHRvPigpO1xyXG4gICAgICAgICAgICBsZXQgcG96ID0gdGhpcy5wb3phZGF2ZWs7XHJcbiAgICAgICAgICAgIGxldCBnZiA9IHRoaXMuZ2V0RWxlbWVudEZvcm1hdCh0aGlzLnBvemFkYXZlayk7XHJcbiAgICAgICAgICAgIGxldCBpeHNfbXNrX3V6aSA9IHRoaXMuZmluZEZpZWxkcyhcIml4c19tc2tfdXppXCIpLmdmaWVsZDxHVWNyTWFza2FEdG8+KFwiZ2V0VmFsdWVcIik/Lml4c19tYXM7XHJcbiAgICAgICAgICAgIGlmICghZ2YpIHJldHVybiBkLnJlamVjdCgpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zOiBJR1Nlem5hbU1hc2VrQ29udHJvbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlT3B0aW9uczogdGhpcy5nZXRTZXJ2aWNlT3B0aW9ucygpLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudEZvcm1hdDogZ2YsXHJcbiAgICAgICAgICAgICAgICBpeHNfbWFzOiBpeHNfbXNrX3V6aSxcclxuICAgICAgICAgICAgICAgIGNoZWNrVWV0ZTogdGhpcy5la29QYXJhbXMuQ2hlY2tVZXRlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgZGxnID0gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdTZXpuYW1NYXNla0NvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMTEwMDIwMlwiIC8vUkMgMzExMDAyMDIgOiBTZXpuYW0gdWxvxb5lbsO9Y2ggZmlsdHLFr1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBkbGcub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIG0/OiBHVWNyTWFza2FEdG8pIHtcclxuICAgICAgICAgICAgICAgIGlmIChtPy5peHNfbWFzKSBkLnJlc29sdmUobSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGQucmVqZWN0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZC5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNob3dNYXNrYURldGFpbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IGdmID0gdGhpcy5nZXRFbGVtZW50Rm9ybWF0KHRoaXMucG96YWRhdmVrKTtcclxuICAgICAgICAgICAgbGV0IGl4c19tYXMgPSB0aGlzLmZpbmRGaWVsZHMoXCJpeHNfbXNrX3V6aVwiKS5nZmllbGQ8R1Vjck1hc2thRHRvPihcImdldFZhbHVlXCIpPy5peHNfbWFzO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFnZikgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoIWl4c19tYXMpIHsgdGhpcy5kaWFsb2dzLndhcm5pbmcodW5kZWZpbmVkLCBcImpyZXM6MzExMDAxNTdcIik7IHJldHVybjsgfSAvL1JDIDMxMTAwMTU3IDogTmVuw60gdnlicsOhbmEgxb7DoWRuw6EgbWFza2FcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zOiBJR1Vjck1hc2thRGV0YWlsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIG1hc2thOiB7aXhzX21hczogaXhzX21hc30sXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50Rm9ybWF0OiBnZixcclxuICAgICAgICAgICAgICAgIGNoZWNrVWV0ZTogdGhpcy5la29QYXJhbXMuQ2hlY2tVZXRlLFxyXG4gICAgICAgICAgICAgICAgc2VydmljZU9wdGlvbnM6IHRoaXMuZ2V0U2VydmljZU9wdGlvbnMoKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93TWFza2FEZXRhaWxEbGcob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU5ld01hc2thKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgZ2YgPSB0aGlzLmdldEVsZW1lbnRGb3JtYXQodGhpcy5wb3phZGF2ZWspO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFnZilcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGlzLnBvemFkYXZlayk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgb3B0aW9uczogSUdVY3JNYXNrYURldGFpbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlT3B0aW9uczogdGhpcy5nZXRTZXJ2aWNlT3B0aW9ucygpLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudEZvcm1hdDogZ2YsXHJcbiAgICAgICAgICAgICAgICBjaGVja1VldGU6IHRoaXMuZWtvUGFyYW1zLkNoZWNrVWV0ZSxcclxuICAgICAgICAgICAgICAgIG1hc2thOiB7IGVsZW1lbnR5OiB7IGZpbHRlcnM6IHRoaXMucG96YWRhdmVrLmVsZW1lbnRzIH0gfSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01hc2thRGV0YWlsRGxnKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaG93TWFza2FEZXRhaWxEbGcob3B0aW9uczogSUdVY3JNYXNrYURldGFpbE9wdGlvbnMpOiBKUXVlcnkge1xyXG4gICAgICAgICAgICBsZXQgZGxnID0gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhHb3JkaWMuVWNyLldlYkNsaWVudC5HVWNyTWFza2FEZXRhaWwsIG9wdGlvbnMsIHsgd2lkdGg6IDYwMCwgaGVpZ2h0OiA0MDAsIHRpdGxlOiBcImpyZXM6MzExMDAyMDZcIiB9KTsgLy9SQyAzMTEwMDIwNiA6IERldGFpbCBmaWx0cnVcclxuICAgICAgICAgICAgZGxnLm9uKFwiY2xvc2VcIiwgKGV2LCBtPzogR1Vjck1hc2thRHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW0pIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhcIml4c19tc2tfdXppXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRsZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2xlYXJWeXN0dXAoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5lbGVtZW50LmZpbmQoXCIuanMtcG96LXZ5c3R1cFwiKS5nZmllbGQoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKFwiV3JpZFwiKS5nZmllbGQoXCJjbGVhckNsaWVudENhY2hlXCIpLmdmaWVsZChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdHVhbFJlcG9ydEluZm8gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2YWxpZGF0ZVJlcG9ydFBsYXRub3N0KHBvejogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclBvemFkYXZla0RldGFpbER0byk6IEpRdWVyeVByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICBpZiAoIXBvei5XcmlkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQ8dm9pZD4oKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFwb3oucGxhdG5vc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJWeXN0dXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQWN0aW9uc1N0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZDx2b2lkPigpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucG96YWRhdmVrID0gcG96O1xyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0VHJlZUNvbnRyb2xUUy5nZXRSZXBvcnRJbmZvKHBvei5XcmlkLCBwb3oucGxhdG5vc3QpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdHVhbFJlcG9ydEluZm8gPSByaTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJpLmlzQWt0aXZuaSkgeyB0aGlzLmNsZWFyVnlzdHVwKCk7IHRoaXMudXBkYXRlQWN0aW9uc1N0YXRlKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZW51bSBUb3BvRmFjdG9ycyB7XHJcbiAgICAgICAgRXEgPSBcIj1cIixcclxuICAgICAgICBOb25FcT0gXCIhPVwiXHJcbiAgICB9XHJcbn0iXX0=
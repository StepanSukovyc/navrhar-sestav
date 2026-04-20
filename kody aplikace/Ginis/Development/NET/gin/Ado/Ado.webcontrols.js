"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ado.WebControls.GDetailMetodicky.ts                  </Name>
//    <Description>                                                             </Description>
//    <Author>      ssula                                                       </Author>
//    <Copyright>   � GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-11-03                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ado;
    (function (Ado) {
        var WebControls;
        (function (WebControls) {
            let GDetailMetodicky = class GDetailMetodicky extends Gordic.GContentBase {
                onDetailBuilderInit(builder) {
                    this.detailObj = Gordic.Utils.extendWithProtoMethods(this, new GDetailMetodickyObj());
                    this.detailObj.createBase({
                        contentName: "detailAdoMetodicky",
                        contentCaption: "jres:35800125", //RC 35800125 : Metodi�ky
                        newRecord: this.newRecord,
                        data: this.data,
                        dataListDescription: this.dataListDescription,
                        addPlatnost: false,
                        currentFilter: this.currentFilter,
                        gridRc: this.gridRc,
                        createPreviousAndNextAction: this.createPreviousAndNextAction,
                    });
                    var tabs = [];
                    if (this.newRecord == false) {
                        tabs.push(this.detailObj.getAuditPristupuTab());
                    }
                    var groups = [];
                    if (this.newRecord == false) {
                        groups.push(this.detailObj.getAuditPristupuGroup());
                    }
                    builder.withComponent("DetailAdoMetodicky", {
                        statusBar: this.detailObj.createStatusBar(),
                        menuBar: this.detailObj.createMenuBar(),
                        headerForm: this.detailObj.createFormComplet(),
                        commandBar: this.detailObj.createCommandBar(),
                        sidePanels: [this.detailObj.getPoznamky()],
                        tabs: tabs,
                        tabGroups: groups,
                    });
                }
                onContentReady() {
                    this.detailObj.finishBuilder();
                }
                closing() {
                    return this.detailObj.closeAction();
                }
            };
            GDetailMetodicky = __decorate([
                Decorators.gcontent
            ], GDetailMetodicky);
            WebControls.GDetailMetodicky = GDetailMetodicky;
            class GDetailMetodickyObj extends Gordic.Adx.WebControls.GAdxDetailBase {
                create() {
                }
                textPopis() {
                    return `${this.data.ixs_ref_txt}`;
                }
                setSxsDetail() {
                    return `${this.data.ixs_rar}`;
                }
                CheckDates(date1, date2) {
                    return (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDay() == date2.getDay());
                }
                saveData(data, close) {
                    if (this.data.dat_zmena && !this.options.newRecord) {
                        var aktualniDatum = new Date();
                        var datumPosledniZmeny = new Date(this.data.dat_zmena);
                        if (this.CheckDates(aktualniDatum, datumPosledniZmeny)) {
                            this.cnt.dialogs.warning("jres:35800146", "jres:35800169"); //RC 35800169 : Nelze m�nit aktivitu u metodi�ky v�ce jak jednou za den.
                            return;
                        }
                    }
                    return this.cnt.isl.AdoMetodicky.upsert({ data: data }).get().then((output) => {
                        this.pendingAction("actSave", true);
                        this.data = output.data;
                        this.updateGridBase().done(() => {
                            this.showSuccessSave(close);
                            if (close == true) {
                                this.closeAction(true).done(() => { this.cnt.close(); });
                            }
                            else
                                this.reloadDataBase();
                        });
                    }).catch((err) => {
                        this.pendingAction("actSave", false);
                        throw err;
                    });
                }
                reloadData(filterObj, dataObj) {
                    this.openDetailOrModalWindow("Gordic.Ado.WebControls.GDetailMetodicky", filterObj, dataObj);
                }
                updateGrid(filter, grid) {
                    return this.cnt.isl.AdoMetodicky.list({
                        filters: filter
                    }).getView().promise();
                }
                createTitle() {
                    if (this.options.newRecord == true)
                        return "jres:35800012"; //RC 35800012 : Nov� z�znam
                    return `${this.options.contentCaption} - ${this.textPopis()}`;
                }
                createMenuBar() {
                    if (this.data.aktivita == 500 || this.data.aktivita == 900) {
                        return [
                            this.createShareActions(),
                            { action: this.cnt.actions.actPrevious, favorite: true, align: "opposite" },
                            { action: this.cnt.actions.actNext, favorite: true, align: "opposite" }
                        ];
                    }
                    else {
                        return [
                            "actEdit*",
                            { action: this.cnt.actions.actSave, favorite: true, actionContext: { close: false } },
                            "actCancelEdit*",
                            this.createShareActions(),
                            { action: this.cnt.actions.actPrevious, favorite: true, align: "opposite" },
                            { action: this.cnt.actions.actNext, favorite: true, align: "opposite" }
                        ];
                    }
                }
                createCommandBar() {
                    return [
                        { caption: "jres:35800010", action: this.cnt.actions.actSave, customClass: "g-button--primary", favorite: true, actionContext: { close: true } }, //RC 35800010 : Ulo�it a zav��t
                        "actClose*"
                    ];
                }
                createActions() {
                    return null;
                }
                setEditMode(editMode) {
                    if (this.data.aktivita == 500 || this.data.aktivita == 900) {
                        return;
                    }
                    this.cnt.actions.actOpenSslDenik?.update({ enabled: editMode == false });
                    var fields = [];
                    fields.push( //V�DYCKY EDITOVATELN�
                    );
                    if (this.options.newRecord) { // EDITOVATELN� POUZE POKUD == NEW Z�ZNAM
                        if (!this.data.ixs_rar) {
                            fields.push("ixs_rar" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.ixs_rar */);
                        }
                        fields.push("ixs_ref" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.ixs_ref */);
                    }
                    else { // EDITOVATELN� POUZE POKUD != NEW Z�ZNAM
                        fields.push("aktivita");
                    }
                    this.cnt.findFields(fields.join(",")).gfield("enable");
                }
                createForm() {
                    this.form.form.layoutDescriptor = "L2M2S1";
                    this.form.addSection("")
                        .addRow("jres:35800129").addField("gselectbox", Gordic.Prefabs.Select.ginsref(), {
                        name: "ixs_ref" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.ixs_ref */,
                        model: "model.ixs_ref=value.ixs_ref",
                        dropdown: true,
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true })],
                    })
                        .addRow("jres:35800132").addField("gselectbox", Gordic.Prefabs.Select.ekosrar(), {
                        name: "ixs_rar" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.ixs_rar */,
                        model: "model.ixs_rar=value.ixs_rar",
                        itemTemplate: "<b>{ico}</b> - {nazev}",
                        dropdown: true,
                        graphicInput: "oninput",
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true })],
                    })
                        .addRow("jres:35800130").addField("gdatebox", {
                        name: "dat_od" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.dat_od */,
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true })]
                    })
                        .addRow("jres:35800131").addField("gdatebox", {
                        name: "dat_do" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.dat_do */,
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true })]
                    })
                        .addRow("jres:35800144").addField("gselectbox", Gordic.Prefabs.Select.gincakt(), {
                        name: "aktivita" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.aktivita */,
                        model: "model.aktivita=value.aktivita",
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true })],
                        initialValue: { aktivita: 100 },
                        dropdown: true
                    });
                }
            }
            WebControls.GDetailMetodickyObj = GDetailMetodickyObj;
        })(WebControls = Ado.WebControls || (Ado.WebControls = {}));
    })(Ado = Gordic.Ado || (Gordic.Ado = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ado.WebControls.GDetailMetodicky.ts                  </Name>
//    <Description>                                                             </Description>
//    <Author>      ssula                                                       </Author>
//    <Copyright>   � GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-11-03                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ado;
    (function (Ado) {
        var WebControls;
        (function (WebControls) {
            let GDetailOkec = class GDetailOkec extends Gordic.GContentBase {
                onDetailBuilderInit(builder) {
                    this.detailObj = Gordic.Utils.extendWithProtoMethods(this, new GDetailOkecObj());
                    this.detailObj.createBase({
                        contentName: "detailAdoOkec",
                        contentCaption: "jres:35800199",
                        newRecord: this.newRecord,
                        data: this.data,
                        dataListDescription: this.dataListDescription,
                        addPlatnost: false,
                        addAktivita: false,
                        currentFilter: this.currentFilter,
                        gridRc: this.gridRc,
                        createPreviousAndNextAction: this.createPreviousAndNextAction,
                    });
                    var tabs = [];
                    if (this.newRecord == false) {
                        tabs.push(this.detailObj.getAuditPristupuTab());
                    }
                    var groups = [];
                    if (this.newRecord == false) {
                        groups.push(this.detailObj.getAuditPristupuGroup());
                    }
                    builder.withComponent("DetailAdoOkec", {
                        statusBar: this.detailObj.createStatusBar(),
                        menuBar: this.detailObj.createMenuBar(),
                        headerForm: this.detailObj.createFormComplet(),
                        commandBar: this.detailObj.createCommandBar(),
                        sidePanels: [this.detailObj.getPoznamky()],
                        tabs: tabs,
                        tabGroups: groups,
                    });
                }
                onContentReady() {
                    this.detailObj.finishBuilder();
                }
                closing() {
                    return this.detailObj.closeAction();
                }
            };
            GDetailOkec = __decorate([
                Decorators.gcontent
            ], GDetailOkec);
            WebControls.GDetailOkec = GDetailOkec;
            class GDetailOkecObj extends Gordic.Adx.WebControls.GAdxDetailBase {
                create() {
                }
                textPopis() {
                    return `${this.data.nazev}`;
                }
                setSxsDetail() {
                    return `${this.data.okec}`;
                }
                saveData(data, close) {
                    return this.cnt.isl.AdoOkecService.upsert({ data: data }).get().then((output) => {
                        this.pendingAction("actSave", true);
                        this.data = output.data;
                        this.updateGridBase().done(() => {
                            this.showSuccessSave(close);
                            Gordic.Data.readerCache.clearCache("Gordic.Ado.Client.GReaderAdoEkosoke");
                            if (close == true) {
                                this.closeAction(true).done(() => { this.cnt.close(); });
                            }
                            else
                                this.reloadDataBase();
                        });
                    }).catch((err) => {
                        this.pendingAction("actSave", false);
                        throw err;
                    });
                }
                reloadData(filterObj, dataObj) {
                    this.openDetailOrModalWindow("Gordic.Ado.WebControls.GDetailOkec", filterObj, dataObj);
                }
                updateGrid(filter, grid) {
                    return this.cnt.isl.AdoOkecService.list({
                        filters: filter
                    }).getView().promise();
                }
                createTitle() {
                    if (this.options.newRecord == true)
                        return "jres:35800012"; //RC 35800012 : Nov� z�znam
                    return `${this.options.contentCaption} - ${this.textPopis()}`;
                }
                createMenuBar() {
                    return [
                        "actEdit*",
                        { action: this.cnt.actions.actSave, favorite: true, actionContext: { close: false } },
                        "actCancelEdit*",
                        this.createShareActions(),
                        { action: this.cnt.actions.actPrevious, favorite: true, align: "opposite" },
                        { action: this.cnt.actions.actNext, favorite: true, align: "opposite" }
                    ];
                }
                createCommandBar() {
                    return [
                        { caption: "jres:35800010", action: this.cnt.actions.actSave, customClass: "g-button--primary", favorite: true, actionContext: { close: true } }, //RC 35800010 : Ulo�it a zav��t
                        "actClose*"
                    ];
                }
                createActions() {
                    return null;
                }
                setEditMode(editMode) {
                    this.cnt.actions.actOpenSslDenik?.update({ enabled: editMode == false });
                    var fields = [];
                    fields.push(//V�DYCKY EDITOVATELN�
                    "nazev" /* Gordic.Ado.Interface.GOkecDtoNames.nazev */);
                    if (this.options.newRecord) { // EDITOVATELN� POUZE POKUD == NEW Z�ZNAM
                        fields.push("okec" /* Gordic.Ado.Interface.GOkecDtoNames.okec */);
                    }
                    else { // EDITOVATELN� POUZE POKUD != NEW Z�ZNAM
                        fields.push();
                    }
                    this.cnt.findFields(fields.join(",")).gfield("enable");
                }
                createForm() {
                    this.form.form.layoutDescriptor = "L2M2S1";
                    this.form.addSection("")
                        .addRow("jres:35800200").addField("gstringbox", Gordic.Prefabs.Field.charCounter(6 /* Gordic.Ado.Interface.GOkecDtoTypeLengths.okec */), {
                        name: "okec" /* Gordic.Ado.Interface.GOkecDtoNames.okec */,
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true }), new Gordic.Validators.Length({ max: 6 /* Gordic.Ado.Interface.GOkecDtoTypeLengths.okec */, stopping: true })],
                    })
                        .addRow("jres:35800201").addField("gstringbox", Gordic.Prefabs.Field.charCounter(100 /* Gordic.Ado.Interface.GOkecDtoTypeLengths.nazev */), {
                        name: "nazev" /* Gordic.Ado.Interface.GOkecDtoNames.nazev */,
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true }), new Gordic.Validators.Length({ max: 100 /* Gordic.Ado.Interface.GOkecDtoTypeLengths.nazev */, stopping: true })],
                    });
                }
            }
            WebControls.GDetailOkecObj = GDetailOkecObj;
        })(WebControls = Ado.WebControls || (Ado.WebControls = {}));
    })(Ado = Gordic.Ado || (Gordic.Ado = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ado;
    (function (Ado) {
        var WebControls;
        (function (WebControls) {
            let GDetailRegistrOrganizaci = class GDetailRegistrOrganizaci extends Gordic.GContentBase {
                onDetailBuilderInit(builder) {
                    this.detailObj = Gordic.Utils.extendWithProtoMethods(this, new GDetailRegistrOrganizaciObj());
                    this.detailObj.createBase({
                        contentName: "detailAdoRegistrOrganizaci",
                        contentCaption: "jres:35800011", //RC 35800011 : Detail organizace
                        newRecord: this.newRecord,
                        data: this.data,
                        dataListDescription: this.dataListDescription,
                        addPlatnost: false,
                        currentFilter: this.currentFilter,
                        gridRc: this.gridRc,
                        createPreviousAndNextAction: this.createPreviousAndNextAction,
                    });
                    var tabs = [];
                    tabs.push(this.detailObj.createRozsirenyProfilTab());
                    tabs.push(this.detailObj.createRozsirenyProfilAris());
                    if (this.newRecord == false) {
                        tabs.push(this.detailObj.getAuditPristupuTab());
                        //tabs.push(this.detailObj.createSeznamMailCertOrganizaceTab());
                        tabs.push(this.detailObj.createSeznamMetodickyTab());
                        tabs.push(this.detailObj.createSeznamMetodickyHistoryTab());
                    }
                    var groups = [];
                    groups.push(this.detailObj.createRozsirenyProfilGroup());
                    groups.push(this.detailObj.createRozsirenyProfilArisGroup());
                    if (this.newRecord == false) {
                        groups.push(this.detailObj.getAuditPristupuGroup());
                        //groups.push(this.detailObj.createSeznamMailCertOrganizaceGroup());
                        groups.push(this.detailObj.createSeznamMetodickyGroup());
                        groups.push(this.detailObj.createSeznamMetodickyHistoryGroup());
                    }
                    builder.withComponent("DetailAdoRegistrOrganizaci", {
                        statusBar: this.detailObj.createStatusBar(),
                        menuBar: this.detailObj.createMenuBar(),
                        headerForm: this.detailObj.createFormComplet(),
                        commandBar: this.detailObj.createCommandBar(),
                        sidePanels: [this.detailObj.getPoznamky()],
                        tabs: tabs,
                        tabGroups: groups,
                    });
                }
                onContentReady() {
                    this.detailObj.finishBuilder();
                }
                closing() {
                    return this.detailObj.closeAction();
                }
            };
            GDetailRegistrOrganizaci = __decorate([
                Decorators.gcontent
            ], GDetailRegistrOrganizaci);
            WebControls.GDetailRegistrOrganizaci = GDetailRegistrOrganizaci;
            class GDetailRegistrOrganizaciObj extends Gordic.Adx.WebControls.GAdxDetailBase {
                create() {
                }
                textPopis() {
                    return `${this.data.nazev}`;
                }
                setSxsDetail() {
                    return `${this.data.ixs_rar}`;
                }
                saveData(data, close) {
                    if (this.RozsirenyProfilForm.gform("isValid") && this.RozsirenyProfilArisForm.gform("isValid")) {
                        if (this.options.newRecord == true) {
                            data.dzm = 1; // Vznik
                            return this.saveDataInternal(data, close);
                        }
                        else {
                            this.cnt.dialogs.simpleForm("jres:35800079", this.createDuvodForm(), null, {
                                width: 400,
                                height: 250,
                            }).on("ok", (ev, ctx) => {
                                data.dzm = ctx.dzm;
                                return this.saveDataInternal(data, close);
                            });
                        }
                    }
                }
                createDuvodForm() {
                    var dzmData;
                    dzmData = new Gordic.Data.View([{ dzm: 2, dzm_txt: "jres:35800182" }, { dzm: 3, dzm_txt: "jres:35800183" }, { dzm: 4, dzm_txt: "jres:35800184" }], { key: "dzm" }); //RC 35800184 : Z�nik
                    var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                        .addRow("jres:35800024").addField("gselectbox", {
                        name: "dzm" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.dzm */,
                        flag: "required",
                        data: dzmData,
                        itemTemplate: "{dzm_txt}",
                        model: "model.dzm=value.dzm",
                        dropdown: true,
                        helperColumns: ["dzm_txt"],
                        graphicInput: "oninput",
                        validators: [new Gordic.Validators.Required({ stopping: true })]
                    });
                    return form;
                }
                saveDataInternal(data, close) {
                    this.RozsirenyProfilForm.findFields().gfield("model", "collect", data);
                    this.RozsirenyProfilArisForm.findFields().gfield("model", "collect", data);
                    return this.cnt.isl.AdoRegistrOrganizaci.upsert({ data: data }).get().then((output) => {
                        this.pendingAction("actSave", true);
                        this.data = output.data;
                        this.updateGridBase().done(() => {
                            this.showSuccessSave(close);
                            if (close == true) {
                                this.closeAction(true).done(() => { this.cnt.close(); });
                            }
                            else
                                this.reloadDataBase();
                        });
                    }).catch((err) => {
                        this.pendingAction("actSave", false);
                        throw err;
                    });
                }
                reloadData(filterObj, dataObj) {
                    this.openDetailOrModalWindow("Gordic.Ado.WebControls.GDetailRegistrOrganizaci", filterObj, dataObj);
                }
                updateGrid(filter, grid) {
                    return this.cnt.isl.AdoRegistrOrganizaci.list({
                        filters: filter
                    }).getView().promise();
                }
                createTitle() {
                    if (this.options.newRecord == true)
                        return "jres:35800012"; //RC 35800012 : Nov� z�znam
                    return `${this.options.contentCaption} - ${this.textPopis()}`;
                }
                createMenuBar() {
                    return [
                        "actEdit*",
                        { action: this.cnt.actions.actSave, favorite: true, actionContext: { close: false } },
                        "actCancelEdit*",
                        this.createShareActions(),
                        { action: this.cnt.actions.actPrevious, favorite: true, align: "opposite" },
                        { action: this.cnt.actions.actNext, favorite: true, align: "opposite" },
                    ];
                }
                createCommandBar() {
                    return [
                        { caption: "jres:35800010", action: this.cnt.actions.actSave, customClass: "g-button--primary", favorite: true, actionContext: { close: true } }, //RC 35800010 : Ulo�it a zav��t
                        "actClose*"
                    ];
                }
                createActions() {
                    return null;
                }
                setEditMode(editMode) {
                    this.cnt.actions.actOpenSslDenik?.update({ enabled: editMode == false });
                    var fields = [];
                    if (this.isPovolZmenaOrgnum) { // Pokud je parametr povolen pro zm�nu ORGNUM, p�idat do editovateln�ch pol�
                        fields.push("orgnum" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.orgnum */);
                    }
                    fields.push(//V�DYCKY EDITOVATELN�
                    "nazev" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.nazev */, "aktivita" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.aktivita */, "ob_jmeno" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ob_jmeno */, "ulice" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ulice */, "sidlo" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.sidlo */, "psc" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.psc */, "okec" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.okec */, "riz1" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.riz1 */, "okec" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.okec */, "aktivita_skut" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.aktivita_skut */, "dor" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.dor */, "dor2" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.dor2 */, "zue" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zue */, "tuj" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.tuj */, "typ_org" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.typ_org */, "ixs_esu" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ixs_esu */, "stredisko" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.stredisko */, "ico_stredisko" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ico_stredisko */, "ixs_esu_mistop" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ixs_esu_mistop */, "orj" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.orj */, "org" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.org */, "kap" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.kap */, "priz_kap" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.priz_kap */, "tel" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.tel */, "fax" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.fax */, "prac" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.prac */, "label" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.label */, "pp_hlavni_cin" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.pp_hlavni_cin */, "pp_vedlejsi_cin" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.pp_vedlejsi_cin */, "ixs_esu_uct" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ixs_esu_uct */, "ixs_esu_roz" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ixs_esu_roz */, "ixs_esu_vyk" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ixs_esu_vyk */, "cfs_orgnum" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.cfs_orgnum */, "abf_orgnum" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.abf_orgnum */, "ico_ginis" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ico_ginis */, "nks_ginis" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.nks_ginis */, "ucs_ginis" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ucs_ginis */, "zrizovatel" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zrizovatel */, "prav_forma" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.prav_forma */, "stat_zastupce" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.stat_zastupce */, "org_www" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.org_www */, "naop" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.naop */, "kop" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.kop */, "zko" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zko */, "dur" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.dur */, "dri" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.dri */, "zod" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zod */, "zue" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zue */, "naz1" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.naz1 */, "naz2" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.naz2 */, "naz3" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.naz3 */, "riz2" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.riz2 */, "riz3" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.riz3 */, "kapitola" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.kapitola */, "hoc" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.hoc */, "sts" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.sts */, "cfu" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.cfu */, "zfo" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zfo */, "tsr" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.tsr */, "nuts" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.nuts */, "kl_slova" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.kl_slova */);
                    if (this.options.newRecord) { // EDITOVATELN� POUZE POKUD == NEW Z�ZNAM
                        if (!this.isPovolZmenaOrgnum) { // Pokud nen� povolena zm�na ORGNUM, p�idat do editovateln�ch pol� za p�edpokladu, �e se jedn� o nov� z�znam
                            fields.push("orgnum" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.orgnum */);
                        }
                        fields.push("ico" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ico */, "zao" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zao */);
                    }
                    else { // EDITOVATELN� POUZE POKUD != NEW Z�ZNAM
                        fields.push();
                    }
                    this.cnt.findFields(fields.join(",")).gfield("enable");
                }
                createForm() {
                    this.form.form.layoutDescriptor = "L2M2S1";
                    this.form.addSection("");
                    if (this.options.newRecord == false) {
                        this.form.addRow("jres:35800009").addField("gstringbox", {
                            name: "ixs_rar" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ixs_rar */,
                            flag: this.createFlagNemenne(),
                            validators: [new Gordic.Validators.Required({ stopping: true })]
                        });
                    }
                    this.form.addRow("jres:35800007").addField("gstringbox", Gordic.Prefabs.Field.charCounter(10 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.ico */), {
                        name: "ico" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ico */,
                        flag: this.createFlagNemenne(),
                        validators: [new Gordic.Validators.Required({ stopping: true }), new Gordic.Validators.Length({ max: 10 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.ico */, stopping: true })],
                    })
                        .addRow("jres:35800005").addField("gnumberbox", {
                        name: "orgnum" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.orgnum */,
                        flag: this.createFlagNemenne(),
                        defaultValue: null
                    })
                        .addRow("jres:35800025").addField("gselectbox", {
                        name: "dor" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.dor */,
                        data: new Gordic.Data.View([{ dor: "2", dor_txt: "jres:35800160" }, { dor: "3", dor_txt: "jres:35800161" }, { dor: "4", dor_txt: "jres:35800162" }, { dor: "9", dor_txt: "jres:35800163" }], { key: "dor" }), //RC 35800163 : ostatn�
                        itemTemplate: "{dor_txt}",
                        model: "model.dor=value.dor",
                        helperColumns: ["dor_txt", "dor"],
                        dropdown: true,
                        graphicInput: "oninput",
                    })
                        .addRow("jres:35800026").addField("gselectbox", {
                        name: "dor2" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.dor2 */,
                        data: new Gordic.Data.View([{ dor: "2", dor_txt: "jres:35800160" }, { dor: "3", dor_txt: "jres:35800161" }, { dor: "4", dor_txt: "jres:35800162" }, { dor: "9", dor_txt: "jres:35800163" }], { key: "dor" }),
                        itemTemplate: "{dor_txt}",
                        model: "model.dor2=value.dor",
                        helperColumns: ["dor_txt", "dor"],
                        dropdown: true,
                        graphicInput: "oninput",
                    })
                        .addRow("jres:35800001").addField("gstringbox", Gordic.Prefabs.Field.charCounter(120 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.nazev */), {
                        name: "nazev" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.nazev */,
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true }), new Gordic.Validators.Length({ max: 120 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.nazev */, stopping: true })]
                    })
                        .addRow("jres:35800027").addField("gstringbox", Gordic.Prefabs.Field.charCounter(2000 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.ob_jmeno */), {
                        name: "ob_jmeno" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ob_jmeno */,
                        flag: "required",
                        rows: 3,
                        autoSize: true,
                        validators: [new Gordic.Validators.Required({ stopping: true }), new Gordic.Validators.Length({ max: 2000 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.ob_jmeno */, stopping: true })]
                    })
                        .addRow("jres:35800016").addField("gstringbox", Gordic.Prefabs.Field.charCounter(50 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.ulice */), {
                        name: "ulice" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ulice */,
                        validators: [new Gordic.Validators.Length({ max: 50 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.ulice */, stopping: true })]
                    })
                        .addRow("jres:35800020").addField("gstringbox", Gordic.Prefabs.Field.charCounter(50 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.sidlo */), {
                        name: "sidlo" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.sidlo */,
                        validators: [new Gordic.Validators.Length({ max: 50 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.sidlo */, stopping: true })]
                    })
                        .addRow("jres:35800021").addField("gstringbox", Gordic.Prefabs.Field.charCounter(12 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.psc */), {
                        name: "psc" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.psc */,
                        validators: [new Gordic.Validators.Length({ max: 12 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.psc */, stopping: true })]
                    });
                    this.form.addSection("")
                        .addRow("jres:35800028").addField("gdatebox", {
                        name: "pao" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.pao */,
                    })
                        .addRow("jres:35800029").addField("gdatebox", {
                        name: "zao" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zao */,
                    })
                        .addRow("jres:35800030").addField("gdatebox", {
                        name: "kao" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.kao */,
                    })
                        .addRow("jres:35800031").addField("gselectbox", Gordic.Prefabs.Select.gincakt(), {
                        name: "aktivita_skut" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.aktivita_skut */,
                        dropdown: true,
                        model: "model.aktivita_skut=value.aktivita",
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true })]
                    })
                        .addRow("jres:35800032").addField("gselectbox", Gordic.Prefabs.Select.adoEkosoke(), {
                        name: "okec" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.okec */,
                        flag: "required",
                        model: "model.okec=value.okec",
                        validators: [new Gordic.Validators.Required({ stopping: true })]
                    })
                        .addRow("jres:35800037").addField("gselectbox", Gordic.Prefabs.Select.adoEkoszuj(), {
                        name: "zue" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zue */,
                        model: "model.zuje=value.zuje",
                    })
                        .addRow("jres:35800033").addField("gstringbox", Gordic.Prefabs.Field.charCounter(10 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.riz1 */), {
                        name: "riz1" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.riz1 */,
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true }), new Gordic.Validators.Length({ max: 10 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.riz1 */, stopping: true })]
                    })
                        .addRow("jres:35800039").addField("gselectbox", Gordic.Prefabs.Select.adoEkoctuj(), {
                        name: "tuj" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.tuj */,
                        flag: "required",
                        model: "model.tuj=value.tuj",
                        validators: [new Gordic.Validators.Required({ stopping: true })]
                    });
                    var frm = new Gordic.Forms.Form({
                        layoutDescriptor: "L1M1S1, L-2-10-0, M-3-9-0, S-12-12-0",
                    }).addRow("jres:35800121").addField("gstringbox", {
                        name: "kli_slovo",
                        validators: [
                            new Gordic.Validators.Required({
                                stopping: true
                            })
                        ],
                        flag: "required"
                    });
                    this.form.addRow("jres:35800120").addField("gformbox", {
                        name: "kl_slova" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.kl_slova */,
                        itemTemplate: "{kli_slovo}",
                        itemWidth: "",
                        form: frm,
                        itemDeletable: true,
                        multi: true,
                        model: function (op, dto, modelOptions) {
                            switch (op) {
                                case "apply":
                                    if (dto["kl_slova"]) {
                                        if (dto["kl_slova"].length != 0)
                                            $(this).gfield("setValue", dto["kl_slova"].split(",").map(item => item.trim()).filter(item => item.length > 0).map(item => ({ kli_slovo: item })), { valid: false });
                                    }
                                    return;
                                case "collect":
                                    var output = $(this).gfield("getValue");
                                    const final = output
                                        .map(o => o?.kli_slovo)
                                        .map(item => item.trim())
                                        .join(",");
                                    dto["kl_slova"] = final;
                                    return;
                            }
                        },
                        dialogOptions: {
                            height: 200,
                            width: 400
                        }
                    });
                    this.createFieldsAktivita(this.options.newRecord, false);
                }
                createRozsirenyProfilTab() {
                    return {
                        tabParams: {
                            id: "tab-rozsireny-profil",
                            title: "jres:35800035", //RC 35800035 : Roz���en� profil
                            opened: true,
                            locked: true,
                            group: { id: "_tab-rozsireny-profil" }
                        },
                        init: (tab) => {
                            var formRozsirenyProfil = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1" });
                            formRozsirenyProfil.addSection("")
                                .addRow("jres:35800040").addField("gselectbox", Gordic.Prefabs.Select.adoEkocado(), {
                                name: "typ_org" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.typ_org */,
                                flag: "required",
                                model: "model.typ_org=value.typ_org",
                                initialValue: { typ_org: 0 },
                                validators: [new Gordic.Validators.Required({ stopping: true })]
                            })
                                .addRow("jres:35800041").addField("gstringbox", Gordic.Prefabs.Field.charCounter(10 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.ico_stredisko */), {
                                name: "ico_stredisko" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ico_stredisko */,
                                validators: [new Gordic.Validators.Length({ max: 10 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.ico_stredisko */, stopping: true })]
                            })
                                .addRow("jres:35800042").addField("gstringbox", Gordic.Prefabs.Field.charCounter(12 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.stredisko */), {
                                name: "stredisko" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.stredisko */,
                                validators: [new Gordic.Validators.Length({ max: 12 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.stredisko */, stopping: true })]
                            })
                                .addRow("jres:35800043").addField("gselectbox", Gordic.Esu.Prefabs.vyberEsu({
                                typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,
                                ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow,
                                Logovani: {
                                    Ixp: this.setSxsDetail(),
                                    DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.neurcen,
                                    DuvodHledaniTxt: "jres:35800044", //RC 35800044 : Zad�n� u�ivatele do ADO
                                    AktZnacka: ""
                                },
                                FieldsToFilterpanel: [
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Nazev,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.ObchodniJmeno,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Ico,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Dic,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.BuSK,
                                ]
                            }), {
                                model: "model.ixs_esu=value.ixs_esu",
                                name: "ixs_esu" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ixs_esu */,
                                validators: this.isEsuPovin ? [new Gordic.Validators.Required({ stopping: true })] : [],
                                dropdown: false
                            })
                                .addRow("jres:35800066").addField("gselectbox", Gordic.Esu.Prefabs.vyberEsu({
                                typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,
                                ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow,
                                Logovani: {
                                    Ixp: this.setSxsDetail(),
                                    DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.neurcen,
                                    DuvodHledaniTxt: "jres:35800044", //RC 35800044 : Zad�n� u�ivatele do ADO
                                    AktZnacka: ""
                                },
                                FieldsToFilterpanel: [
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Nazev,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.ObchodniJmeno,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Ico,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Dic,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.BuSK,
                                ]
                            }), {
                                model: "model.ixs_esu_mistop=value.ixs_esu",
                                name: "ixs_esu_mistop" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ixs_esu_mistop */,
                                dropdown: false
                            })
                                .addRow("jres:35800059").addField("gstringbox", "w-6", Gordic.Prefabs.Field.charCounter(20 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.orj */), {
                                name: "orj" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.orj */,
                                validators: [new Gordic.Validators.Length({ max: 20 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.orj */, stopping: true })]
                            })
                                .addField("gstringbox", "w-6", Gordic.Prefabs.Field.charCounter(16 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.org */), {
                                name: "org" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.org */,
                                validators: [new Gordic.Validators.Length({ max: 16 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.org */, stopping: true })]
                            })
                                .addRow("jres:35800061").addField("gstringbox", "w-6", Gordic.Prefabs.Field.charCounter(3 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.kap */), {
                                name: "kap" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.kap */,
                                validators: [new Gordic.Validators.Length({ max: 3 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.kap */, stopping: true })]
                            })
                                .addField("gstringbox", "w-6", Gordic.Prefabs.Field.charCounter(1 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.priz_kap */), {
                                name: "priz_kap" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.priz_kap */,
                                validators: [new Gordic.Validators.Length({ max: 1 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.priz_kap */, stopping: true })]
                            })
                                .addRow("jres:35800062").addField("gstringbox", "w-6", Gordic.Prefabs.Field.charCounter(33 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.tel */), {
                                name: "tel" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.tel */,
                                validators: [new Gordic.Validators.Length({ max: 33 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.tel */, stopping: true })]
                            })
                                .addField("gstringbox", "w-6", Gordic.Prefabs.Field.charCounter(33 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.fax */), {
                                name: "fax" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.fax */,
                                validators: [new Gordic.Validators.Length({ max: 33 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.fax */, stopping: true })]
                            })
                                .addRow("jres:35800063").addField("gstringbox", "w-6", Gordic.Prefabs.Field.charCounter(20 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.prac */), {
                                name: "prac" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.prac */,
                                validators: [new Gordic.Validators.Length({ max: 20 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.prac */, stopping: true })]
                            })
                                .addField("gstringbox", "w-6", Gordic.Prefabs.Field.charCounter(30 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.label */), {
                                name: "label" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.label */,
                                validators: [new Gordic.Validators.Length({ max: 30 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.label */, stopping: true })]
                            })
                                .addRow("jres:35800064").addField("gstringbox", "w-6", Gordic.Prefabs.Field.charCounter(254 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.pp_hlavni_cin */), {
                                name: "pp_hlavni_cin" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.pp_hlavni_cin */,
                                validators: [new Gordic.Validators.Length({ max: 254 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.pp_hlavni_cin */, stopping: true })]
                            })
                                .addField("gstringbox", "w-6", Gordic.Prefabs.Field.charCounter(254 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.pp_vedlejsi_cin */), {
                                name: "pp_vedlejsi_cin" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.pp_vedlejsi_cin */,
                                validators: [new Gordic.Validators.Length({ max: 254 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.pp_vedlejsi_cin */, stopping: true })]
                            })
                                .addRow("jres:35800068").addField("gselectbox", Gordic.Esu.Prefabs.vyberEsu({
                                typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,
                                ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow,
                                Logovani: {
                                    Ixp: this.setSxsDetail(),
                                    DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.neurcen,
                                    DuvodHledaniTxt: "jres:35800044", //RC 35800044 : Zad�n� u�ivatele do ADO
                                    AktZnacka: ""
                                },
                                FieldsToFilterpanel: [
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Nazev,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.ObchodniJmeno,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Ico,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Dic,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.BuSK,
                                ]
                            }), {
                                model: "model.ixs_esu_uct=value.ixs_esu",
                                name: "ixs_esu_uct" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ixs_esu_uct */,
                                dropdown: false
                            })
                                .addRow("jres:35800069").addField("gselectbox", Gordic.Esu.Prefabs.vyberEsu({
                                typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,
                                ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow,
                                Logovani: {
                                    Ixp: this.setSxsDetail(),
                                    DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.neurcen,
                                    DuvodHledaniTxt: "jres:35800044", //RC 35800044 : Zad�n� u�ivatele do ADO
                                    AktZnacka: ""
                                },
                                FieldsToFilterpanel: [
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Nazev,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.ObchodniJmeno,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Ico,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Dic,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.BuSK,
                                ]
                            }), {
                                model: "model.ixs_esu_roz=value.ixs_esu",
                                name: "ixs_esu_roz" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ixs_esu_roz */,
                                dropdown: false
                            })
                                .addRow("jres:35800070").addField("gselectbox", Gordic.Esu.Prefabs.vyberEsu({
                                typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,
                                ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow,
                                Logovani: {
                                    Ixp: this.setSxsDetail(),
                                    DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.neurcen,
                                    DuvodHledaniTxt: "jres:35800044", //RC 35800044 : Zad�n� u�ivatele do ADO
                                    AktZnacka: ""
                                },
                                FieldsToFilterpanel: [
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Nazev,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.ObchodniJmeno,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Ico,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Dic,
                                    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.BuSK,
                                ]
                            }), {
                                model: "model.ixs_esu_vyk=value.ixs_esu",
                                name: "ixs_esu_vyk" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ixs_esu_vyk */,
                                dropdown: false
                            })
                                .addRow("jres:35800071").addField("gnumberbox", "w-6", {
                                name: "cfs_orgnum" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.cfs_orgnum */,
                                defaultValue: null,
                            })
                                .addField("gnumberbox", "w-6", {
                                name: "abf_orgnum" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.abf_orgnum */,
                                defaultValue: null,
                            })
                                .addSection("jres:35800067") //RC 35800067 : Parametry pro soubor *.ORG
                                .addRow("jres:35800072").addField("gstringbox", Gordic.Prefabs.Field.charCounter(10 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.ico_ginis */), {
                                name: "ico_ginis" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ico_ginis */,
                                validators: [new Gordic.Validators.Length({ max: 10 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.ico_ginis */, stopping: true })]
                            })
                                .addRow("jres:35800074").addField("gstringbox", Gordic.Prefabs.Field.charCounter(12 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.nks_ginis */), {
                                name: "nks_ginis" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.nks_ginis */,
                                validators: [new Gordic.Validators.Length({ max: 12 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.nks_ginis */, stopping: true })]
                            })
                                .addRow("jres:35800073").addField("gstringbox", Gordic.Prefabs.Field.charCounter(10 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.ucs_ginis */), {
                                name: "ucs_ginis" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ucs_ginis */,
                                validators: [new Gordic.Validators.Length({ max: 10 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.ucs_ginis */, stopping: true })]
                            })
                                .addRow("jres:35800075").addField("gstringbox", Gordic.Prefabs.Field.charCounter(254 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.zrizovatel */), {
                                name: "zrizovatel" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zrizovatel */,
                                validators: [new Gordic.Validators.Length({ max: 254 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.zrizovatel */, stopping: true })]
                            })
                                .addRow("jres:35800076").addField("gstringbox", Gordic.Prefabs.Field.charCounter(254 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.prav_forma */), {
                                name: "prav_forma" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.prav_forma */,
                                validators: [new Gordic.Validators.Length({ max: 254 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.prav_forma */, stopping: true })]
                            })
                                .addRow("jres:35800077").addField("gstringbox", Gordic.Prefabs.Field.charCounter(254 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.stat_zastupce */), {
                                name: "stat_zastupce" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.stat_zastupce */,
                                validators: [new Gordic.Validators.Length({ max: 254 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.stat_zastupce */, stopping: true })]
                            })
                                .addRow("jres:35800078").addField("gstringbox", Gordic.Prefabs.Field.charCounter(254 /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoTypeLengths.org_www */), {
                                name: "org_www" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.org_www */,
                                validators: [new Gordic.Validators.Length({ max: 254 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.org_www */, stopping: true })]
                            });
                            this.RozsirenyProfilForm = $.newDiv().appendTo(tab).gform("createFrom", formRozsirenyProfil);
                        }
                    };
                }
                createRozsirenyProfilAris() {
                    return {
                        tabParams: {
                            id: "tab-rozsireny-profil-aris",
                            title: "jres:35800080", //RC 35800080 : Roz���en� profil - ARIS
                            opened: true,
                            locked: true,
                            group: { id: "_tab-rozsireny-profil-aris" }
                        },
                        init: (tab) => {
                            var formRozsirenyAris = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1" });
                            formRozsirenyAris.addSection("")
                                .addRow("jres:35800081").addField("gstringbox", Gordic.Prefabs.Field.charCounter(50 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.naop */), {
                                name: "naop" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.naop */,
                                flag: "required",
                                validators: [new Gordic.Validators.Length({ max: 50 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.naop */, stopping: true }), new Gordic.Validators.Required({ stopping: true })]
                            })
                                .addRow("jres:35800082").addField("gstringbox", Gordic.Prefabs.Field.charCounter(7 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.kop */), {
                                name: "kop" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.kop */,
                                validators: [new Gordic.Validators.Length({ max: 7 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.kop */, stopping: true })]
                            })
                                .addRow("jres:35800083").addField("gstringbox", Gordic.Prefabs.Field.charCounter(4 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.zko */), {
                                name: "zko" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zko */,
                                validators: [new Gordic.Validators.Length({ max: 4 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.zko */, stopping: true })]
                            })
                                .addRow("jres:35800084").addField("gselectbox", Gordic.Prefabs.Select.adoGincdur(), {
                                name: "dur" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.dur */,
                                flag: "required",
                                validators: [new Gordic.Validators.Required({ stopping: true })],
                                model: "model.dur=value.dur"
                            })
                                .addRow("jres:35800085").addField("gstringbox", Gordic.Prefabs.Field.charCounter(1 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.zod */), {
                                name: "zod" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zod */,
                                validators: [new Gordic.Validators.Length({ max: 1 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.zod */, stopping: true })]
                            })
                                .addRow("jres:35800086").addField("gselectbox", {
                                name: "dri" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.dri */,
                                data: new Gordic.Data.View([{ dri: "1", dri_txt: "jres:35800087" }, { dri: "2", dri_txt: "jres:35800088" }], { key: "dri" }), //RC 35800088 : Region�ln�
                                itemTemplate: "<b>{dri}</b> - {dri_txt}",
                                model: "model.dri=value.dri",
                                helperColumns: ["dri_txt", "dri"],
                                dropdown: true,
                                graphicInput: "oninput",
                                emptyValue: { dri: " ", dri_txt: "" }
                            })
                                .addRow("jres:35800089").addField("gselectbox", {
                                name: "zue" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zue */,
                                data: new Gordic.Data.View([{ zue: "1", zue_txt: "jres:35800090" }, { zue: "2", zue_txt: "jres:35800091" }], { key: "zue" }), //RC 35800091 : Podvojn�
                                itemTemplate: "<b>{zue}</b> - {zue_txt}",
                                model: "model.zue=value.zue",
                                helperColumns: ["zue_txt", "zue"],
                                dropdown: true,
                                graphicInput: "oninput",
                                emptyValue: { zue: " ", zue_txt: "" }
                            })
                                .addRow("jres:35800092").addField("gstringbox", Gordic.Prefabs.Field.charCounter(50 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.naz1 */), {
                                name: "naz1" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.naz1 */,
                                validators: [new Gordic.Validators.Length({ max: 50 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.naz1 */, stopping: true })]
                            })
                                .addRow("jres:35800093").addField("gstringbox", Gordic.Prefabs.Field.charCounter(50 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.naz2 */), {
                                name: "naz2" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.naz2 */,
                                validators: [new Gordic.Validators.Length({ max: 50 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.naz2 */, stopping: true })]
                            })
                                .addRow("jres:35800094").addField("gstringbox", Gordic.Prefabs.Field.charCounter(50 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.naz3 */), {
                                name: "naz3" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.naz3 */,
                                validators: [new Gordic.Validators.Length({ max: 50 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.naz3 */, stopping: true })]
                            })
                                .addSection("")
                                .addRow("jres:35800095").addField("gstringbox", Gordic.Prefabs.Field.charCounter(10 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.riz2 */), {
                                name: "riz2" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.riz2 */,
                                validators: [new Gordic.Validators.Length({ max: 10 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.riz2 */, stopping: true })]
                            })
                                .addRow("jres:35800096").addField("gstringbox", Gordic.Prefabs.Field.charCounter(10 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.riz3 */), {
                                name: "riz3" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.riz3 */,
                                validators: [new Gordic.Validators.Length({ max: 10 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.riz3 */, stopping: true })]
                            })
                                .addRow("jres:35800097").addField("gstringbox", Gordic.Prefabs.Field.charCounter(3 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.kapitola */), {
                                name: "kapitola" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.kapitola */,
                                validators: [new Gordic.Validators.Length({ max: 3 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.kapitola */, stopping: true })]
                            })
                                .addRow("jres:35800098").addField("gselectbox", {
                                name: "hoc" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.hoc */,
                                data: new Gordic.Data.View([{ hoc: "1", hoc_txt: "jres:35800211" }, { hoc: "2", hoc_txt: "jres:35800212" }], { key: "hoc" }), //RC 35800212 : m� HOC
                                itemTemplate: "<b>{hoc}</b> - {hoc_txt}",
                                model: "model.hoc=value.hoc",
                                helperColumns: ["hoc_txt", "hoc"],
                                dropdown: true,
                                graphicInput: "oninput",
                                emptyValue: { hoc: " ", hoc_txt: "" }
                            })
                                .addRow("jres:35800110").addField("gselectbox", Gordic.Prefabs.Select.gNutsReader(), {
                                model: "model.nuts=value.nuts",
                                name: "nuts" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.nuts */,
                                emptyValue: { nuts: " ", nuts_txt: "" }
                            })
                                .addRow("jres:35800101").addField("gstringbox", Gordic.Prefabs.Field.charCounter(2 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.sts */), {
                                name: "sts" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.sts */,
                                validators: [new Gordic.Validators.Length({ max: 2 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.sts */, stopping: true })]
                            })
                                .addRow("jres:35800104").addField("gstringbox", "w-6", Gordic.Prefabs.Field.charCounter(3 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.cfu */), {
                                name: "cfu" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.cfu */,
                                validators: [new Gordic.Validators.Length({ max: 3 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.cfu */, stopping: true })]
                            })
                                .addField("gstringbox", "w-6", Gordic.Prefabs.Field.charCounter(1 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.zfo */), {
                                name: "zfo" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zfo */,
                                validators: [new Gordic.Validators.Length({ max: 1 /* Gordic.Ado.Interface.GEkosrarDtoTypeLengths.zfo */, stopping: true })]
                            })
                                .addRow("jres:35800105").addField("gselectbox", {
                                name: "tsr" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.tsr */,
                                data: new Gordic.Data.View([{ tsr: "1", tsr_txt: "jres:35800213" }, { tsr: "2", tsr_txt: "jres:35800214" }, { tsr: "3", tsr_txt: "jres:35800215" }, { tsr: "4", tsr_txt: "jres:35800216" }], { key: "tsr" }), //RC 35800216 : krajsk� ��ad
                                itemTemplate: "<b>{tsr}</b> - {tsr_txt}",
                                model: "model.tsr=value.tsr",
                                helperColumns: ["tsr_txt", "tsr"],
                                dropdown: true,
                                graphicInput: "oninput",
                                emptyValue: { tsr: " ", tsr_txt: "" }
                            });
                            this.RozsirenyProfilArisForm = $.newDiv().appendTo(tab).gform("createFrom", formRozsirenyAris);
                        }
                    };
                }
                //createSeznamMailCertOrganizaceTab(): Gordic.Gin.DetailBuilder.TabParamsId {
                //    return {
                //        tabParams: {
                //            id: "tab-SeznamMailCertOrganizace",
                //            title: "jres:35800118",
                //            opened: true,
                //            locked: true,
                //            group: { id: "_tab-SeznamMailCertOrganizace" }
                //        },
                //        contentParams: {
                //            className: "Gordic.Ado.WebControls.GSeznamMailCertOrganizace",
                //            serverParams: {
                //                ID: "SeznamAdoMailCertOrganizace",
                //                ixs: this.data.ixs_rar,
                //                tabOpen: true,
                //            }
                //        }
                //    }
                //}
                createSeznamMetodickyTab() {
                    return {
                        tabParams: {
                            id: "tab-SeznamMetodicky",
                            title: "jres:35800123", //RC 35800123 : Metodi�ky
                            opened: true,
                            locked: true,
                            group: { id: "_tab-SeznamAdoMetodicky" }
                        },
                        contentParams: {
                            className: "Gordic.Ado.WebControls.GSeznamMetodicky",
                            serverParams: {
                                ID: "SeznamAdoMetodicky",
                                ixs_rar: this.data.ixs_rar,
                                tabOpen: true,
                            }
                        }
                    };
                }
                createSeznamMetodickyHistoryTab() {
                    return {
                        tabParams: {
                            id: "tab-SeznamMetodickyHistory",
                            title: "jres:35800180", //RC 35800123 : Metodi�ky
                            opened: true,
                            locked: true,
                            group: { id: "_tab-SeznamAdoMetodickyHistory" }
                        },
                        contentParams: {
                            className: "Gordic.Ado.WebControls.GSeznamMetodickyHistory",
                            serverParams: {
                                ID: "SeznamAdoMetodickyHistory",
                                ixs_rar: this.data.ixs_rar,
                                tabOpen: true,
                            }
                        }
                    };
                }
                createRozsirenyProfilGroup() {
                    return {
                        id: "_tab-rozsireny-profil", caption: "jres:35800036" //RC 35800036 : Roz���en� profil
                    };
                }
                createRozsirenyProfilArisGroup() {
                    return {
                        id: "_tab-rozsireny-profil-aris", caption: "jres:35800080" //RC 35800080 : Roz���en� profil - ARIS
                    };
                }
                createSeznamMailCertOrganizaceGroup() {
                    return {
                        id: "_tab-SeznamMailCertOrganizace", caption: "jres:35800118"
                    };
                }
                createSeznamMetodickyGroup() {
                    return {
                        id: "_tab-SeznamAdoMetodicky", caption: "jres:35800124" //RC 35800124 : Metodi�ky
                    };
                }
                createSeznamMetodickyHistoryGroup() {
                    return {
                        id: "_tab-SeznamAdoMetodickyHistory", caption: "jres:35800180" //RC 35800180 : Metodi�ky - historie
                    };
                }
            }
            WebControls.GDetailRegistrOrganizaciObj = GDetailRegistrOrganizaciObj;
        })(WebControls = Ado.WebControls || (Ado.WebControls = {}));
    })(Ado = Gordic.Ado || (Gordic.Ado = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ado.WebControls.GDetailMetodicky.ts                  </Name>
//    <Description>                                                             </Description>
//    <Author>      ssula                                                       </Author>
//    <Copyright>   � GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-11-03                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ado;
    (function (Ado) {
        var WebControls;
        (function (WebControls) {
            let GDetailZuje = class GDetailZuje extends Gordic.GContentBase {
                onDetailBuilderInit(builder) {
                    this.detailObj = Gordic.Utils.extendWithProtoMethods(this, new GDetailZujeObj());
                    this.detailObj.createBase({
                        contentName: "detailAdoZuje",
                        contentCaption: "jres:35800209",
                        newRecord: this.newRecord,
                        data: this.data,
                        dataListDescription: this.dataListDescription,
                        addPlatnost: false,
                        addAktivita: false,
                        currentFilter: this.currentFilter,
                        gridRc: this.gridRc,
                        createPreviousAndNextAction: this.createPreviousAndNextAction,
                    });
                    var tabs = [];
                    if (this.newRecord == false) {
                        tabs.push(this.detailObj.getAuditPristupuTab());
                    }
                    var groups = [];
                    if (this.newRecord == false) {
                        groups.push(this.detailObj.getAuditPristupuGroup());
                    }
                    builder.withComponent("DetailAdoZuje", {
                        statusBar: this.detailObj.createStatusBar(),
                        menuBar: this.detailObj.createMenuBar(),
                        headerForm: this.detailObj.createFormComplet(),
                        commandBar: this.detailObj.createCommandBar(),
                        sidePanels: [this.detailObj.getPoznamky()],
                        tabs: tabs,
                        tabGroups: groups,
                    });
                }
                onContentReady() {
                    this.detailObj.finishBuilder();
                }
                closing() {
                    return this.detailObj.closeAction();
                }
            };
            GDetailZuje = __decorate([
                Decorators.gcontent
            ], GDetailZuje);
            WebControls.GDetailZuje = GDetailZuje;
            class GDetailZujeObj extends Gordic.Adx.WebControls.GAdxDetailBase {
                create() {
                }
                textPopis() {
                    return `${this.data.nazev}`;
                }
                setSxsDetail() {
                    return `${this.data.zuje}`;
                }
                saveData(data, close) {
                    return this.cnt.isl.AdoZujeService.upsert({ data: data }).get().then((output) => {
                        this.pendingAction("actSave", true);
                        this.data = output.data;
                        this.updateGridBase().done(() => {
                            Gordic.Data.readerCache.clearCache("Gordic.Ado.Client.GReaderAdoEkoszuj");
                            this.showSuccessSave(close);
                            if (close == true) {
                                this.closeAction(true).done(() => { this.cnt.close(); });
                            }
                            else
                                this.reloadDataBase();
                        });
                    }).catch((err) => {
                        this.pendingAction("actSave", false);
                        throw err;
                    });
                }
                reloadData(filterObj, dataObj) {
                    this.openDetailOrModalWindow("Gordic.Ado.WebControls.GDetailZuje", filterObj, dataObj);
                }
                updateGrid(filter, grid) {
                    return this.cnt.isl.AdoZujeService.list({
                        filters: filter
                    }).getView().promise();
                }
                createTitle() {
                    if (this.options.newRecord == true)
                        return "jres:35800012"; //RC 35800012 : Nov� z�znam
                    return `${this.options.contentCaption} - ${this.textPopis()}`;
                }
                createMenuBar() {
                    return [
                        "actEdit*",
                        { action: this.cnt.actions.actSave, favorite: true, actionContext: { close: false } },
                        "actCancelEdit*",
                        this.createShareActions(),
                        { action: this.cnt.actions.actPrevious, favorite: true, align: "opposite" },
                        { action: this.cnt.actions.actNext, favorite: true, align: "opposite" }
                    ];
                }
                createCommandBar() {
                    return [
                        { caption: "jres:35800010", action: this.cnt.actions.actSave, customClass: "g-button--primary", favorite: true, actionContext: { close: true } }, //RC 35800010 : Ulo�it a zav��t
                        "actClose*"
                    ];
                }
                createActions() {
                    return null;
                }
                setEditMode(editMode) {
                    this.cnt.actions.actOpenSslDenik?.update({ enabled: editMode == false });
                    var fields = [];
                    fields.push(//V�DYCKY EDITOVATELN�
                    "nazev" /* Gordic.Ado.Interface.GZujeDtoNames.nazev */);
                    if (this.options.newRecord) { // EDITOVATELN� POUZE POKUD == NEW Z�ZNAM
                        fields.push("zuje" /* Gordic.Ado.Interface.GZujeDtoNames.zuje */);
                    }
                    else { // EDITOVATELN� POUZE POKUD != NEW Z�ZNAM
                        fields.push();
                    }
                    this.cnt.findFields(fields.join(",")).gfield("enable");
                }
                createForm() {
                    this.form.form.layoutDescriptor = "L2M2S1";
                    this.form.addSection("")
                        .addRow("jres:35800210").addField("gstringbox", Gordic.Prefabs.Field.charCounter(6 /* Gordic.Ado.Interface.GZujeDtoTypeLengths.zuje */), {
                        name: "zuje" /* Gordic.Ado.Interface.GZujeDtoNames.zuje */,
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true }), new Gordic.Validators.Length({ max: 6 /* Gordic.Ado.Interface.GZujeDtoTypeLengths.zuje */, stopping: true })],
                    })
                        .addRow("jres:35800201").addField("gstringbox", Gordic.Prefabs.Field.charCounter(50 /* Gordic.Ado.Interface.GZujeDtoTypeLengths.nazev */), {
                        name: "nazev" /* Gordic.Ado.Interface.GZujeDtoNames.nazev */,
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true }), new Gordic.Validators.Length({ max: 50 /* Gordic.Ado.Interface.GZujeDtoTypeLengths.nazev */, stopping: true })],
                    });
                }
            }
            WebControls.GDetailZujeObj = GDetailZujeObj;
        })(WebControls = Ado.WebControls || (Ado.WebControls = {}));
    })(Ado = Gordic.Ado || (Gordic.Ado = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ado;
    (function (Ado) {
        var WebControls;
        (function (WebControls) {
            class GSeznamMailCertOrganizaceObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
                selectionGridAct(obj) {
                }
                create() {
                }
                openDetail(data, isNew) {
                    throw new GError("Method not implemented.");
                }
                createActions() {
                    return {};
                }
                createBaseMenuBarActions() {
                    this.cnt.menuBar(this.cnt.actions.createBar([]));
                }
                createContextMenu() {
                    return this.cnt.actions.createBar([
                        "actOpenDetail*",
                        "actOpenDetailOnNewTab",
                        "actOpenDialogVyberovaSkupina*",
                    ]);
                }
                createFilterForm() {
                    this.filterForm.addRow("jres:35800119").addField("gselectbox", Gordic.Prefabs.Select.adoEkosrar(), {
                        name: "ixs",
                        model: "model.ixs_rar=value.ixs_rar",
                        disabled: this.ixs ? true : false
                    });
                }
                userhardDefaultFilter(hardFilter) {
                    if (this.ixs)
                        hardFilter["ixs_rar"] = this.ixs;
                    return hardFilter;
                }
                collectData(data) {
                    if (this.ixs) {
                        data["ixs_rar"] = this.ixs;
                    }
                }
                //getDataCount(): JQueryPromise<Gordic.Adx.Interface.GAdxCountData> | null {
                //    return this.cnt.isl.AdoRegistrOrganizaci.getDataCount({ filters: this.filterData }).getData()
                //}
                applydata(filterData) {
                    this.cnt.beginOperation();
                    this.cnt.isl.AdoMailCertOrganizace.list({
                        filters: filterData
                    }).getView().done((data) => {
                        this.view = data;
                        this.setPlatnostColumn(this.view);
                        this.grid.ggrid('setData', this.view);
                    }).always(() => { this.cnt.endOperation(); });
                }
                //selectionGridAct(objArr: IGGridSelection<any>) {
                //    this.cnt.actions.actOpenSslDenik?.update({ enabled: objArr.count > 0 })
                //}
                getNazev(data) {
                    return `${data["ixs_rar"]}`;
                }
                getGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addIconColumn({
                        name: "aktivita" /* Gordic.Ado.Interface.GAdoMailCertOrganizaceDtoNames.aktivita */,
                        caption: "jres:35800004", //RC 35800004 : Aktivita
                        iconTemplate: (row) => {
                            return Gordic.Adx.WebControls.GAdxGridFunctions.createAktivitaCaptionIcon(row["aktivita"]);
                        }
                    }).addNumberColumn({
                        name: "por_cislo" /* Gordic.Ado.Interface.GAdoMailCertOrganizaceDtoNames.por_cislo */,
                        caption: "jres:35800112" //RC 35800112 : Po�ad�
                    }).addNumberColumn({
                        name: "id_org" /* Gordic.Ado.Interface.GAdoMailCertOrganizaceDtoNames.id_org */,
                        caption: "jres:35800113" //RC 35800113 : Id. Organizace
                    }).addNumberColumn({
                        name: "typ_id_org" /* Gordic.Ado.Interface.GAdoMailCertOrganizaceDtoNames.typ_id_org */,
                        caption: "jres:35800114", //RC 35800114 : Typ
                        width: 140
                    }).addDateColumn({
                        name: "dat_zmena" /* Gordic.Ado.Interface.GAdoMailCertOrganizaceDtoNames.dat_zmena */,
                        caption: "jres:35800115" //RC 35800115 : Datum zm�ny
                    })
                        .addTextColumn({
                        name: "zmenu_prov_txt" /* Gordic.Ado.Interface.GAdoMailCertOrganizaceDtoNames.zmenu_prov_txt */,
                        caption: "jres:35800116" //RC 35800116 : Zm�nu provedl
                    });
                    this.addGridFormatColumns(gridFormat, false);
                    return gridFormat;
                }
            }
            WebControls.GSeznamMailCertOrganizaceObj = GSeznamMailCertOrganizaceObj;
            let GSeznamMailCertOrganizace = class GSeznamMailCertOrganizace extends Gordic.GContentBase {
                onContentReady() {
                    this.seznamObj = Gordic.Utils.extendWithProtoMethods(this, new GSeznamMailCertOrganizaceObj());
                    this.seznamObj.createBase({
                        content: this,
                        contentName: "SeznamMailCertOrganizaceNew",
                        contentCaption: "jres:35800117", //RC 35800117 : Povolen� mailov� adresy a certifik�ty
                        dataListDescriptor: this.dataListDescription,
                        filterSettings: {
                            emptyList: true
                        },
                        comparatorSettings: {
                            addComparator: false,
                            itemTemplate: "{ixs_rar}"
                        },
                        gridSettings: {
                            gridFormat: this.seznamObj.getGridFormat(),
                        }
                    });
                    this.seznamObj.createBaseMenuBarActions();
                    this.seznamObj.createFilter();
                    this.seznamObj.createGrid();
                }
            };
            GSeznamMailCertOrganizace = __decorate([
                Decorators.gcontent
            ], GSeznamMailCertOrganizace);
            WebControls.GSeznamMailCertOrganizace = GSeznamMailCertOrganizace;
        })(WebControls = Ado.WebControls || (Ado.WebControls = {}));
    })(Ado = Gordic.Ado || (Gordic.Ado = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ado;
    (function (Ado) {
        var WebControls;
        (function (WebControls) {
            class GSeznamMetodickyObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
                selectionGridAct(obj) {
                }
                create() {
                }
                openDetail(data, isNew) {
                    const cntInitializer = ["Gordic.Ado.WebControls.GDetailMetodicky", {
                            currentFilter: this.filterData,
                            gridRc: new Gordic.Components.GridRC(this.grid),
                            openDialog: this.tabOpen
                        }];
                    const inputParams = {
                        ID: "DetailAdoMetodicky",
                        newRecord: isNew,
                        ixs_rar: isNew ? this.ixs_rar : data.ixs_rar,
                        ixs_ref: isNew ? null : data.ixs_ref,
                    };
                    this.openDialogOrModalWindow(cntInitializer, inputParams);
                }
                createActions() {
                    return {};
                }
                createBaseMenuBarActions() {
                    this.cnt.menuBar(this.cnt.actions.createBar([
                        "actOpenDetail*",
                        "actNewDetail*",
                    ]));
                }
                createContextMenu() {
                    return this.cnt.actions.createBar([
                        "actOpenDetail*",
                        "actOpenDetailOnNewTab",
                        "actOpenDialogVyberovaSkupina*",
                    ]);
                }
                createFilterForm() {
                    this.filterForm.addRow("jres:35800119").addField("gselectbox", Gordic.Prefabs.Select.ekosrar(), {
                        name: "ixs_rar",
                        model: "model.ixs_rar=value.ixs_rar",
                        disabled: this.ixs_rar ? true : false,
                        itemTemplate: "<b>{ico}</b> - {nazev}",
                        graphicInput: "oninput"
                    });
                }
                userhardDefaultFilter(hardFilter) {
                    if (this.ixs_rar)
                        hardFilter["ixs_rar"] = this.ixs_rar;
                    return hardFilter;
                }
                collectData(data) {
                    if (this.ixs_rar) {
                        data["ixs_rar"] = this.ixs_rar;
                    }
                }
                //getDataCount(): JQueryPromise<Gordic.Adx.Interface.GAdxCountData> | null {
                //    return this.cnt.isl.AdoRegistrOrganizaci.getDataCount({ filters: this.filterData }).getData()
                //}
                applydata(filterData) {
                    this.cnt.beginOperation();
                    this.cnt.isl.AdoMetodicky.list({
                        filters: filterData
                    }).getView().done((data) => {
                        this.view = data;
                        this.setPlatnostColumn(this.view);
                        this.grid.ggrid('setData', this.view);
                    }).always(() => { this.cnt.endOperation(); });
                }
                //selectionGridAct(objArr: IGGridSelection<any>) {
                //    this.cnt.actions.actOpenSslDenik?.update({ enabled: objArr.count > 0 })
                //}
                getNazev(data) {
                    return `${data["ixs_ref_txt" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.ixs_ref_txt */]}`;
                }
                getGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addIconColumn({
                        name: "aktivita" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.aktivita */,
                        caption: "jres:35800004", //RC 35800004 : Aktivita
                        iconTemplate: (row) => {
                            return Gordic.Adx.WebControls.GAdxGridFunctions.createAktivitaCaptionIcon(row["aktivita"]);
                        }
                    }).addTextColumn({
                        name: "ixs_ref_txt" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.ixs_ref_txt */,
                        caption: "jres:35800134" //RC 35800134 : Metodi�ka
                    }).addNumberColumn({
                        name: "orgnum" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.orgnum */,
                        caption: "jres:35800135" //RC 35800135 : ORGNUM
                    }).addTextColumn({
                        name: "ico" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.ico */,
                        caption: "jres:35800142" //RC 35800142 : I�O organizace
                    }).addTextColumn({
                        name: "naop" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.naop */,
                        caption: "jres:35800136" //RC 35800136 : N�zev ARIS
                    }).addTextColumn({
                        name: "nazev" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.nazev */,
                        caption: "jres:35800137" //RC 35800137 : N�zev GINIS
                    }).addDateColumn({
                        name: "dat_od" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.dat_od */,
                        caption: "jres:35800138" //RC 35800138 : Datum za��tku aktivity
                    }).addDateColumn({
                        name: "dat_do" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.dat_do */,
                        caption: "jres:35800139" //RC 35800139 : Datum konce aktivity
                    }).addTextColumn({
                        name: "okec" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.okec */,
                        caption: "jres:35800140" //RC 35800140 : OKE�
                    }).addTextColumn({
                        name: "riz1" /* Gordic.Ado.Interface.GAdoMetodickyDtoNames.riz1 */,
                        caption: "jres:35800141" //RC 35800141 : I�O nad��zen� organizace
                    });
                    this.addGridFormatColumns(gridFormat, false);
                    return gridFormat;
                }
            }
            WebControls.GSeznamMetodickyObj = GSeznamMetodickyObj;
            let GSeznamMetodicky = class GSeznamMetodicky extends Gordic.GContentBase {
                onContentReady() {
                    this.seznamObj = Gordic.Utils.extendWithProtoMethods(this, new GSeznamMetodickyObj());
                    this.seznamObj.createBase({
                        content: this,
                        contentName: "SeznamMetodickyObjNew",
                        contentCaption: "jres:35800126", //RC 35800126 : Metodi�ky
                        dataListDescriptor: this.dataListDescription,
                        filterSettings: {
                            emptyList: true
                        },
                        comparatorSettings: {
                            addComparator: false,
                            itemTemplate: "{ixs_rar}"
                        },
                        gridSettings: {
                            gridFormat: this.seznamObj.getGridFormat(),
                        }
                    });
                    this.seznamObj.createBaseMenuBarActions();
                    this.seznamObj.createFilter();
                    this.seznamObj.createGrid();
                }
            };
            GSeznamMetodicky = __decorate([
                Decorators.gcontent
            ], GSeznamMetodicky);
            WebControls.GSeznamMetodicky = GSeznamMetodicky;
        })(WebControls = Ado.WebControls || (Ado.WebControls = {}));
    })(Ado = Gordic.Ado || (Gordic.Ado = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ado;
    (function (Ado) {
        var WebControls;
        (function (WebControls) {
            class GSeznamMetodickyHistoryObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
                selectionGridAct(obj) {
                }
                create() {
                }
                openDetail(data, isNew) {
                }
                createActions() {
                    return {};
                }
                createBaseMenuBarActions() {
                }
                createContextMenu() {
                    return this.cnt.actions.createBar([
                        "actOpenDialogVyberovaSkupina*",
                    ]);
                }
                createFilterForm() {
                    this.filterForm.addRow("jres:35800119").addField("gselectbox", Gordic.Prefabs.Select.ekosrar(), {
                        name: "ixs_rar",
                        model: "model.ixs_rar=value.ixs_rar",
                        disabled: this.ixs_rar ? true : false,
                        itemTemplate: "<b>{ico}</b> - {nazev}",
                        graphicInput: "oninput"
                    });
                }
                userhardDefaultFilter(hardFilter) {
                    if (this.ixs_rar)
                        hardFilter["ixs_rar"] = this.ixs_rar;
                    return hardFilter;
                }
                collectData(data) {
                    if (this.ixs_rar) {
                        data["ixs_rar"] = this.ixs_rar;
                    }
                }
                //getDataCount(): JQueryPromise<Gordic.Adx.Interface.GAdxCountData> | null {
                //    return this.cnt.isl.AdoRegistrOrganizaci.getDataCount({ filters: this.filterData }).getData()
                //}
                applydata(filterData) {
                    this.cnt.beginOperation();
                    this.cnt.isl.AdoMetodicky.listHistory({
                        filters: filterData
                    }).getView().done((data) => {
                        this.view = data;
                        this.setPlatnostColumn(this.view);
                        this.grid.ggrid('setData', this.view);
                    }).always(() => { this.cnt.endOperation(); });
                }
                //selectionGridAct(objArr: IGGridSelection<any>) {
                //    this.cnt.actions.actOpenSslDenik?.update({ enabled: objArr.count > 0 })
                //}
                getNazev(data) {
                    return `${data["ixs_ref_txt" /* Gordic.Ado.Interface.GAdoMetodickyHistoryDtoNames.ixs_ref_txt */]}`;
                }
                getGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "ixs_ref_txt" /* Gordic.Ado.Interface.GAdoMetodickyHistoryDtoNames.ixs_ref_txt */,
                        caption: "jres:35800134" //RC 35800134 : Metodi�ka
                    }).addDateColumn({
                        name: "dat_od" /* Gordic.Ado.Interface.GAdoMetodickyHistoryDtoNames.dat_od */,
                        caption: "jres:35800138", //RC 35800138 : Datum za��tku aktivity
                        width: 200
                    }).addDateColumn({
                        name: "dat_do" /* Gordic.Ado.Interface.GAdoMetodickyHistoryDtoNames.dat_do */,
                        caption: "jres:35800139", //RC 35800139 : Datum konce aktivity
                        width: 200
                    })
                        .addNumberColumn({
                        name: "orgnum" /* Gordic.Ado.Interface.GAdoMetodickyHistoryDtoNames.orgnum */,
                        caption: "jres:35800135" //RC 35800135 : ORGNUM
                    }).addTextColumn({
                        name: "ico" /* Gordic.Ado.Interface.GAdoMetodickyHistoryDtoNames.ico */,
                        caption: "jres:35800142" //RC 35800142 : I�O organizace
                    }).addTextColumn({
                        name: "naop" /* Gordic.Ado.Interface.GAdoMetodickyHistoryDtoNames.naop */,
                        caption: "jres:35800136" //RC 35800136 : N�zev ARIS
                    }).addTextColumn({
                        name: "nazev" /* Gordic.Ado.Interface.GAdoMetodickyHistoryDtoNames.nazev */,
                        caption: "jres:35800137" //RC 35800137 : N�zev GINIS
                    }).addDateColumn({
                        name: "dat_od" /* Gordic.Ado.Interface.GAdoMetodickyHistoryDtoNames.dat_od */,
                        caption: "jres:35800138" //RC 35800138 : Datum za��tku aktivity
                    }).addDateColumn({
                        name: "dat_do" /* Gordic.Ado.Interface.GAdoMetodickyHistoryDtoNames.dat_do */,
                        caption: "jres:35800139" //RC 35800139 : Datum konce aktivity
                    }).addNumberColumn({
                        name: "okec" /* Gordic.Ado.Interface.GAdoMetodickyHistoryDtoNames.okec */,
                        caption: "jres:35800140" //RC 35800140 : OKE�
                    }).addTextColumn({
                        name: "riz1" /* Gordic.Ado.Interface.GAdoMetodickyHistoryDtoNames.riz1 */,
                        caption: "jres:35800141" //RC 35800141 : I�O nad��zen� organizace
                    });
                    this.addGridFormatColumns(gridFormat, false);
                    return gridFormat;
                }
            }
            WebControls.GSeznamMetodickyHistoryObj = GSeznamMetodickyHistoryObj;
            let GSeznamMetodickyHistory = class GSeznamMetodickyHistory extends Gordic.GContentBase {
                onContentReady() {
                    this.seznamObj = Gordic.Utils.extendWithProtoMethods(this, new GSeznamMetodickyHistoryObj());
                    this.seznamObj.createBase({
                        content: this,
                        contentName: "SeznamMetodickyHistoryObjNew",
                        contentCaption: "jres:35800126", //RC 35800126 : Metodi�ky
                        dataListDescriptor: this.dataListDescription,
                        filterSettings: {
                            emptyList: true,
                            addDefaultaktivita: false
                        },
                        comparatorSettings: {
                            addComparator: false,
                            itemTemplate: "{ixs_rar}"
                        },
                        gridSettings: {
                            gridFormat: this.seznamObj.getGridFormat(),
                        }
                    });
                    this.seznamObj.createBaseMenuBarActions();
                    this.seznamObj.createFilter();
                    this.seznamObj.createGrid();
                }
            };
            GSeznamMetodickyHistory = __decorate([
                Decorators.gcontent
            ], GSeznamMetodickyHistory);
            WebControls.GSeznamMetodickyHistory = GSeznamMetodickyHistory;
        })(WebControls = Ado.WebControls || (Ado.WebControls = {}));
    })(Ado = Gordic.Ado || (Gordic.Ado = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ado;
    (function (Ado) {
        var WebControls;
        (function (WebControls) {
            class GSeznamOkecObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
                selectionGridAct(obj) {
                }
                create() {
                }
                openDetail(data, isNew) {
                    const cntInitializer = ["Gordic.Ado.WebControls.GDetailOkec", {
                            currentFilter: this.filterData,
                            gridRc: new Gordic.Components.GridRC(this.grid),
                            openDialog: this.tabOpen
                        }];
                    const inputParams = {
                        ID: "DetailAdoOkec",
                        newRecord: isNew,
                        okec: isNew == true ? null : data.okec
                    };
                    this.openDialogOrModalWindow(cntInitializer, inputParams);
                }
                createActions() {
                    return {};
                }
                createBaseMenuBarActions() {
                    this.cnt.menuBar(this.cnt.actions.createBar([
                        "actOpenDetail*",
                        "actNewDetail*",
                    ]));
                }
                createContextMenu() {
                    return this.cnt.actions.createBar([
                        "actOpenDetail*",
                        "actOpenDetailOnNewTab",
                        "actOpenDialogVyberovaSkupina*",
                    ]);
                }
                createFilterForm() {
                    this.filterForm.addRow("jres:35800195").addField("gstringbox", {
                        name: "okec" /* Gordic.Ado.Interface.GOkecDtoNames.okec */,
                    })
                        .addRow("jres:35800196").addField("gstringbox", {
                        name: "nazev" /* Gordic.Ado.Interface.GOkecDtoNames.nazev */,
                    }); //RC 35800196 : N�zev
                }
                userhardDefaultFilter(hardFilter) {
                    return hardFilter;
                }
                collectData(data) {
                }
                //getDataCount(): JQueryPromise<Gordic.Adx.Interface.GAdxCountData> | null {
                //    return this.cnt.isl.AdoRegistrOrganizaci.getDataCount({ filters: this.filterData }).getData()
                //}
                applydata(filterData) {
                    this.cnt.beginOperation();
                    this.cnt.isl.AdoOkecService.list({
                        filters: filterData
                    }).getView().done((data) => {
                        this.view = data;
                        this.grid.ggrid('setData', this.view);
                    }).always(() => { this.cnt.endOperation(); });
                }
                //selectionGridAct(objArr: IGGridSelection<any>) {
                //    this.cnt.actions.actOpenSslDenik?.update({ enabled: objArr.count > 0 })
                //}
                getNazev(data) {
                    return `${data["nazev" /* Gordic.Ado.Interface.GOkecDtoNames.nazev */]}`;
                }
                getGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "okec" /* Gordic.Ado.Interface.GOkecDtoNames.okec */,
                        caption: "jres:35800197" //RC 35800197 : OKE�
                    })
                        .addTextColumn({
                        name: "nazev" /* Gordic.Ado.Interface.GOkecDtoNames.nazev */,
                        caption: "jres:35800198" //RC 35800198 : N�zev
                    });
                    this.addGridFormatColumns(gridFormat, false);
                    return gridFormat;
                }
            }
            WebControls.GSeznamOkecObj = GSeznamOkecObj;
            let GSeznamOkec = class GSeznamOkec extends Gordic.GContentBase {
                onContentReady() {
                    this.seznamObj = Gordic.Utils.extendWithProtoMethods(this, new GSeznamOkecObj());
                    this.seznamObj.createBase({
                        content: this,
                        contentName: "SeznamOkecObjNew",
                        contentCaption: "jres:35800194", //RC 35800194 : Odv�tvov� klasifikace ekonomick�ch �innost�
                        dataListDescriptor: this.dataListDescription,
                        filterSettings: {
                            emptyList: true,
                            addDefaultaktivita: false
                        },
                        comparatorSettings: {
                            addComparator: false,
                        },
                        gridSettings: {
                            gridFormat: this.seznamObj.getGridFormat(),
                        }
                    });
                    this.seznamObj.createBaseMenuBarActions();
                    this.seznamObj.createFilter();
                    this.seznamObj.createGrid();
                }
            };
            GSeznamOkec = __decorate([
                Decorators.gcontent
            ], GSeznamOkec);
            WebControls.GSeznamOkec = GSeznamOkec;
        })(WebControls = Ado.WebControls || (Ado.WebControls = {}));
    })(Ado = Gordic.Ado || (Gordic.Ado = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ado;
    (function (Ado) {
        var WebControls;
        (function (WebControls) {
            class GSeznamRegistrOrganizaciObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
                selectionGridAct(obj) {
                }
                create() {
                }
                getServiceCnt() {
                    if (this.serviceCnt == undefined || this.serviceCnt == null)
                        this.serviceCnt = this.cnt.createServiceContent("Gordic.Ado.WebControls.GSeznamRegistrOrganizaci");
                    return this.serviceCnt;
                }
                openDetail(data, isNew) {
                    const cntInitializer = ["Gordic.Ado.WebControls.GDetailRegistrOrganizaci", {
                            currentFilter: this.filterData,
                            gridRc: new Gordic.Components.GridRC(this.grid),
                            openDialog: this.tabOpen
                        }];
                    const inputParams = {
                        ID: "DetailAdoRegistrOrganizaci",
                        newRecord: isNew,
                        ixs_rar: isNew == true ? null : data.ixs_rar
                    };
                    this.openDialogOrModalWindow(cntInitializer, inputParams);
                }
                createActions() {
                    return {
                        actGenerateFile: {
                            caption: "jres:35800181", //RC 35800181 : Generovat soubor ORG/KU0
                            icon: "gi-download",
                            run: () => this.GenerateFile()
                        }
                    };
                }
                createBaseMenuBarActions() {
                    this.cnt.menuBar(this.cnt.actions.createBar([
                        "actOpenDetail*",
                        "actNewDetail*",
                        "actGenerateFile*"
                    ]));
                }
                createContextMenu() {
                    return this.cnt.actions.createBar([
                        "actOpenDetail*",
                        "actOpenDetailOnNewTab",
                        "actOpenDialogVyberovaSkupina*",
                    ]);
                }
                createFileForm() {
                    var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                        .addRow("jres:35800187").addField("gstringbox", "w-8", {
                        name: "jmeno_souboru",
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true })]
                    })
                        .addField("gselectbox", "w-4", {
                        name: "typ_souboru",
                        flag: "required",
                        data: new Gordic.Data.View([{ typ: 0, text: "jres:35800185" }, { typ: 1, text: "jres:35800186" }], { key: "typ" }), //RC 35800186 : .KU0
                        itemTemplate: "<b>{text}</b>",
                        model: "model.typ_souboru=value.typ",
                        dropdown: true,
                        helperColumns: ["text"],
                        graphicInput: "oninput",
                        defaultValue: { typ: 0, text: "jres:35800185" },
                        validators: [new Gordic.Validators.Required({ stopping: true })]
                    });
                    return form;
                }
                GenerateFile() {
                    var dtos = this.grid.ggrid("getView").getDataRows(false, "data");
                    if (!dtos || dtos.length == 0) {
                        this.cnt.dialogs.warning("jres:35800193"); //RC 35800193 : V na�ten�m seznamu se nenach�z� dost dat pro vytvo�en� souboru, zkontrolujte filtry a akci opakujte.
                        return;
                    }
                    var jmeno_souboru = "";
                    var typ_souboru = 0;
                    this.cnt.dialogs.simpleForm("jres:35800188", this.createFileForm(), null, {
                        width: 400,
                        height: 250,
                    }).on("ok", (ev, ctx) => {
                        jmeno_souboru = ctx.jmeno_souboru;
                        typ_souboru = ctx.typ_souboru;
                        this.cnt.beginOperation();
                        this.getServiceCnt().call("GenerateFile", { dtos: dtos, fileName: jmeno_souboru, type: typ_souboru }).done((fileInfo) => {
                            new GFile().download(fileInfo).done(() => {
                                this.getServiceCnt().fire("RemoveFile", { guid: fileInfo.guid });
                            });
                        }).always(() => {
                            this.cnt.endOperation();
                        });
                    });
                }
                createFilterForm() {
                    var frm = new Gordic.Forms.Form({
                        layoutDescriptor: "L1M1S1, L-2-10-0, M-3-9-0, S-12-12-0",
                    }).addRow("jres:35800173").addField("gnumberbox", {
                        name: "hled_orgnum",
                        validators: [
                            new Gordic.Validators.Required({
                                stopping: true
                            })
                        ],
                        flag: "required"
                    });
                    this.filterForm.addRow("jres:35800179").addField("gselectbox", Gordic.Prefabs.Select.gincakt(), {
                        name: "aktivita_skut" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.aktivita_skut */,
                        graphicInput: "oninput",
                        initialValue: { aktivita: 100 },
                        dropdown: true,
                        model: "model.aktivita_skut=value.aktivita"
                    });
                    this.filterForm.addRow("jres:35800174").addField("gnumberbox", "w-6", {
                        name: "orgnum_od",
                        defaultValue: null
                    })
                        .addField("gnumberbox", "w-6", {
                        name: "orgnum_do",
                        defaultValue: null
                    });
                    this.filterForm.addRow("jres:35800172").addField("gformbox", {
                        name: "orgnum" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.orgnum */,
                        itemTemplate: "{hled_orgnum}",
                        itemWidth: "",
                        form: frm,
                        itemDeletable: true,
                        multi: true,
                        model: function (op, dto, modelOptions) {
                            switch (op) {
                                case "apply":
                                    if (dto["orgnum"]) {
                                        if (dto["orgnum"].length != 0) {
                                            $(this).gfield("setValue", dto["orgnum"].split(",").map(item => item.trim()).filter(item => item.length > 0).map(item => ({ hled_orgnum: item })), { valid: false });
                                        }
                                    }
                                    return;
                                case "collect":
                                    var output = $(this).gfield("getValue");
                                    if (output.length == 0) {
                                        return;
                                    }
                                    const final = output
                                        .map(o => o?.hled_orgnum)
                                        .join(",");
                                    dto["orgnum"] = final;
                                    return;
                            }
                        },
                        dialogOptions: {
                            height: 200,
                            width: 400
                        }
                    })
                        .addRow("jres:35800175").addField("gselectbox", {
                        name: "dor" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.dor */,
                        data: new Gordic.Data.View([{ dor: "2", dor_txt: "jres:35800160" }, { dor: "3", dor_txt: "jres:35800161" }, { dor: "4", dor_txt: "jres:35800162" }, { dor: "9", dor_txt: "jres:35800163" }], { key: "dor" }), //RC 35800163 : ostatn�
                        itemTemplate: "{dor_txt}",
                        model: "model.dor=value.dor",
                        helperColumns: ["dor_txt", "dor"],
                        dropdown: true,
                        graphicInput: "oninput",
                    })
                        .addRow("jres:35800178").addField("gstringbox", {
                        name: "riz1" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.riz1 */,
                    })
                        .addRow("jres:35800177").addField("gdatebox", Gordic.Prefabs.Date.withOperators(), {
                        name: "zao" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zao */,
                    })
                        .addRow("jres:35800176").addField("gdatebox", Gordic.Prefabs.Date.withOperators(), {
                        name: "kao" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.kao */,
                    });
                }
                userhardDefaultFilter(hardFilter) {
                    return hardFilter;
                }
                collectData(data) {
                }
                //getDataCount(): JQueryPromise<Gordic.Adx.Interface.GAdxCountData> | null {
                //    return this.cnt.isl.AdoRegistrOrganizaci.getDataCount({ filters: this.filterData }).getData()
                //}
                applydata(filterData) {
                    this.cnt.beginOperation();
                    this.cnt.isl.AdoRegistrOrganizaci.list({
                        filters: filterData
                    }).getView().done((data) => {
                        this.view = data;
                        this.setPlatnostColumn(this.view);
                        this.grid.ggrid('setData', this.view);
                    }).always(() => { this.cnt.endOperation(); });
                }
                //selectionGridAct(objArr: IGGridSelection<any>) {
                //    this.cnt.actions.actOpenSslDenik?.update({ enabled: objArr.count > 0 })
                //}
                getNazev(data) {
                    return `${data["nazev"]}`;
                }
                getGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addIconColumn({
                        name: "aktivita" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.aktivita */,
                        caption: "jres:35800004", //RC 35800004 : Aktivita
                        iconTemplate: (row) => {
                            return Gordic.Adx.WebControls.GAdxGridFunctions.createAktivitaCaptionIcon(row["aktivita"] ?? 100);
                        }
                    }).addNumberColumn({
                        name: "orgnum" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.orgnum */,
                        caption: "jres:35800005" //RC 35800005 : ORGNUM
                    }).addNumberColumn({
                        name: "orgnum_t" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.orgnum_t */,
                        caption: "jres:35800013" //RC 35800013 : ORGNUMT
                    }).addTextColumn({
                        name: "ico" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ico */,
                        caption: "jres:35800007", //RC 35800007 : I�O
                        width: 140
                    }).addTextColumn({
                        name: "dor" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.dor */,
                        caption: "jres:35800133", //RC 35800133 : Druh organizace
                        cellTemplate: (row) => {
                            if (!row.dor || row.dor == " ") {
                                return "";
                            }
                            else {
                                return `<b>${row.dor}</b> - ${row.dor_txt}`;
                            }
                        }
                    })
                        .addTextColumn({
                        name: "dor2" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.dor2 */,
                        caption: "jres:35800159", //RC 35800159 : Druh organizace 2
                        cellTemplate: (row) => {
                            if (!row.dor2 || row.dor2 == " ") {
                                return "";
                            }
                            else {
                                return `<b>${row.dor2}</b> - ${row.dor_txt2}`;
                            }
                        }
                    }).addTextColumn({
                        name: "tuj" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.tuj */,
                        caption: "jres:35800015" //RC 35800015 : TUJ ORG
                    }).addTextColumn({
                        name: "dur" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.dur */,
                        caption: "jres:35800022", //RC 35800022 : Druh ��adu
                        cellTemplate: (row) => {
                            if (!row.dur || row.dur == " ") {
                                return ``;
                            }
                            else {
                                return `<b>${row.dur}</b> - ${row.dur_txt}`;
                            }
                        }
                    }).addTextColumn({
                        name: "nazev" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.nazev */,
                        caption: "jres:35800001", //RC 35800001 : N�zev
                        width: 140
                    }).addTextColumn({
                        name: "naop" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.naop */,
                        caption: "jres:35800143", //RC 35800143 : N�zev ARIS
                        width: 140
                    }).addTextColumn({
                        name: "ulice" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ulice */,
                        caption: "jres:35800016" //RC 35800016 : Ulice
                    }).addTextColumn({
                        name: "sidlo" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.sidlo */,
                        caption: "jres:35800017" //RC 35800017 : S�dlo
                    }).addTextColumn({
                        name: "okec" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.okec */,
                        caption: "jres:35800018" //RC 35800018 : OKE�
                    }).addTextColumn({
                        name: "riz1" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.riz1 */,
                        caption: "jres:35800147" //RC 35800147 : I�O nad�. Org.
                    }).addTextColumn({
                        name: "label" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.label */,
                        caption: "jres:35800148" //RC 35800148 : N�zev pro ob�lky
                    }).addTextColumn({
                        name: "zue" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zue */,
                        caption: "jres:35800149" //RC 35800149 : ZUE
                    }).addDateColumn({
                        name: "zao" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.zao */,
                        caption: "jres:35800150", //RC 35800150 : Za��tek aktivity organizace
                        width: 200
                    }).addDateColumn({
                        name: "kao" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.kao */,
                        caption: "jres:35800151", //RC 35800151 : Konec aktivity organizace
                        width: 200
                    })
                        .addTextColumn({
                        name: "dzm" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.dzm */,
                        caption: "jres:35800153", //RC 35800153 : Druh zm�ny
                        cellTemplate: (row) => {
                            switch (row.dzm) {
                                case 0:
                                    return `<b>${row.dzm}</b> - ��dn�`;
                                case 1:
                                    return `<b>${row.dzm}</b> - Vznik`;
                                case 2:
                                    return `<b>${row.dzm}</b> - Zm�na`;
                                case 3:
                                    return `<b>${row.dzm}</b> - Oprava`;
                                case 4:
                                    return `<b>${row.dzm}</b> - Z�nik`;
                                default:
                                    return `<b>0</b> - ��dn�`;
                            }
                        }
                    })
                        .addTextColumn({
                        name: "orj" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.orj */,
                        caption: "jres:35800154" //RC 35800154 : Odbor
                    }).addTextColumn({
                        name: "org" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.org */,
                        caption: "jres:35800155" //RC 35800155 : �ORG
                    }).addTextColumn({
                        name: "ico_stredisko" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ico_stredisko */,
                        caption: "jres:35800156" //RC 35800156 : I�O inv. m�sta
                    }).addTextColumn({
                        name: "stredisko" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.stredisko */,
                        caption: "jres:35800157" //RC 35800157 : Inv. m�sto
                    }).addTextColumn({
                        name: "nuts" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.nuts */,
                        caption: "jres:35800158" //RC 35800158 : NUTS
                    })
                        .addTextColumn({
                        name: "ob_jmeno" /* Gordic.Ado.Interface.GAdoRegirstOrganizaciDtoNames.ob_jmeno */,
                        caption: "jres:35800023" //RC 35800023 : N�zev dle z�izovac� listiny
                    });
                    this.addGridFormatColumns(gridFormat, false);
                    return gridFormat;
                }
            }
            WebControls.GSeznamRegistrOrganizaciObj = GSeznamRegistrOrganizaciObj;
            let GSeznamRegistrOrganizaci = class GSeznamRegistrOrganizaci extends Gordic.GContentBase {
                onContentReady() {
                    this.seznamObj = Gordic.Utils.extendWithProtoMethods(this, new GSeznamRegistrOrganizaciObj());
                    this.seznamObj.createBase({
                        content: this,
                        contentName: "seznamAdoRegistrOrganizaciNew",
                        contentCaption: "jres:35800002", //RC 35800002 : Registr organizac�
                        dataListDescriptor: this.dataListDescription,
                        filterSettings: {
                            emptyList: true,
                            addDefaultaktivita: true,
                            tema: this.isPovolDbFilter ? "ado_fil_org" : null
                        },
                        comparatorSettings: {
                            addComparator: false,
                            itemTemplate: "{ixs_rar}"
                        },
                        gridSettings: {
                            gridFormat: this.seznamObj.getGridFormat(),
                        }
                    });
                    this.seznamObj.createBaseMenuBarActions();
                    this.seznamObj.createFilter();
                    this.seznamObj.createGrid();
                }
            };
            GSeznamRegistrOrganizaci = __decorate([
                Decorators.gcontent
            ], GSeznamRegistrOrganizaci);
            WebControls.GSeznamRegistrOrganizaci = GSeznamRegistrOrganizaci;
        })(WebControls = Ado.WebControls || (Ado.WebControls = {}));
    })(Ado = Gordic.Ado || (Gordic.Ado = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ado;
    (function (Ado) {
        var WebControls;
        (function (WebControls) {
            class GSeznamZujeObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
                selectionGridAct(obj) {
                }
                create() {
                }
                openDetail(data, isNew) {
                    const cntInitializer = ["Gordic.Ado.WebControls.GDetailZuje", {
                            currentFilter: this.filterData,
                            gridRc: new Gordic.Components.GridRC(this.grid),
                            openDialog: this.tabOpen
                        }];
                    const inputParams = {
                        ID: "DetailAdoZuje",
                        newRecord: isNew,
                        zuje: isNew == true ? null : data.zuje
                    };
                    this.openDialogOrModalWindow(cntInitializer, inputParams);
                }
                createActions() {
                    return {};
                }
                createBaseMenuBarActions() {
                    this.cnt.menuBar(this.cnt.actions.createBar([
                        "actOpenDetail*",
                        "actNewDetail*",
                    ]));
                }
                createContextMenu() {
                    return this.cnt.actions.createBar([
                        "actOpenDetail*",
                        "actOpenDetailOnNewTab",
                        "actOpenDialogVyberovaSkupina*",
                    ]);
                }
                createFilterForm() {
                    this.filterForm.addRow("jres:35800208").addField("gstringbox", {
                        name: "zuje" /* Gordic.Ado.Interface.GZujeDtoNames.zuje */,
                    })
                        .addRow("jres:35800196").addField("gstringbox", {
                        name: "nazev" /* Gordic.Ado.Interface.GZujeDtoNames.nazev */,
                    }); //RC 35800196 : N�zev
                }
                userhardDefaultFilter(hardFilter) {
                    return hardFilter;
                }
                collectData(data) {
                }
                //getDataCount(): JQueryPromise<Gordic.Adx.Interface.GAdxCountData> | null {
                //    return this.cnt.isl.AdoRegistrOrganizaci.getDataCount({ filters: this.filterData }).getData()
                //}
                applydata(filterData) {
                    this.cnt.beginOperation();
                    this.cnt.isl.AdoZujeService.list({
                        filters: filterData
                    }).getView().done((data) => {
                        this.view = data;
                        this.grid.ggrid('setData', this.view);
                    }).always(() => { this.cnt.endOperation(); });
                }
                //selectionGridAct(objArr: IGGridSelection<any>) {
                //    this.cnt.actions.actOpenSslDenik?.update({ enabled: objArr.count > 0 })
                //}
                getNazev(data) {
                    return `${data["nazev" /* Gordic.Ado.Interface.GZujeDtoNames.nazev */]}`;
                }
                getGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "zuje" /* Gordic.Ado.Interface.GZujeDtoNames.zuje */,
                        caption: "jres:35800208" //RC 35800208 : ZUJ
                    })
                        .addTextColumn({
                        name: "nazev" /* Gordic.Ado.Interface.GZujeDtoNames.nazev */,
                        caption: "jres:35800198" //RC 35800198 : N�zev
                    });
                    this.addGridFormatColumns(gridFormat, false);
                    return gridFormat;
                }
            }
            WebControls.GSeznamZujeObj = GSeznamZujeObj;
            let GSeznamZuje = class GSeznamZuje extends Gordic.GContentBase {
                onContentReady() {
                    this.seznamObj = Gordic.Utils.extendWithProtoMethods(this, new GSeznamZujeObj());
                    this.seznamObj.createBase({
                        content: this,
                        contentName: "SeznamZujeObjNew",
                        contentCaption: "jres:35800202", //RC 35800202 : Z�kladn� �zemn� jednotky
                        dataListDescriptor: this.dataListDescription,
                        filterSettings: {
                            emptyList: true,
                            addDefaultaktivita: false
                        },
                        comparatorSettings: {
                            addComparator: false,
                        },
                        gridSettings: {
                            gridFormat: this.seznamObj.getGridFormat(),
                        }
                    });
                    this.seznamObj.createBaseMenuBarActions();
                    this.seznamObj.createFilter();
                    this.seznamObj.createGrid();
                }
            };
            GSeznamZuje = __decorate([
                Decorators.gcontent
            ], GSeznamZuje);
            WebControls.GSeznamZuje = GSeznamZuje;
        })(WebControls = Ado.WebControls || (Ado.WebControls = {}));
    })(Ado = Gordic.Ado || (Gordic.Ado = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRvLndlYmNvbnRyb2xzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJHRGV0YWlsTWV0b2RpY2t5LnRzIiwiR0RldGFpbE9rZWMudHMiLCJHRGV0YWlsUmVnaXN0ck9yZ2FuaXphY2kudHMiLCJHRGV0YWlsWnVqZS50cyIsIkdTZXpuYW1NYWlsQ2VydE9yZ2FuaXphY2UudHMiLCJHU2V6bmFtTWV0b2RpY2t5LnRzIiwiR1Nlem5hbU1ldG9kaWNreUhpc3RvcnkudHMiLCJHU2V6bmFtT2tlYy50cyIsIkdTZXpuYW1SZWdpc3RyT3JnYW5pemFjaS50cyIsIkdTZXpuYW1adWplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7QUFFakIsSUFBVSxNQUFNLENBd09mO0FBeE9ELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXdPbkI7SUF4T2dCLFdBQUEsR0FBRztRQUFDLElBQUEsV0FBVyxDQXdPL0I7UUF4T29CLFdBQUEsV0FBVztZQUU1QixJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTtnQkFXOUMsbUJBQW1CLENBQUMsT0FBZ0Q7b0JBQ2hFLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxtQkFBbUIsRUFBRSxDQUFDLENBQUM7b0JBQ3RGLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO3dCQUN0QixXQUFXLEVBQUUsb0JBQW9CO3dCQUNqQyxjQUFjLEVBQUUsZUFBZSxFQUFFLHlCQUF5Qjt3QkFDMUQsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO3dCQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7d0JBQ2YsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1C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QUk7d0JBQ2IsV0FBVyxFQUFFLGtCQUFrQjt3QkFDL0IsY0FBYyxFQUFFLGVBQWUsRUFBRSx3Q0FBd0M7d0JBQ3pFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7d0JBQzVDLGNBQWMsRUFBRTs0QkFDWixTQUFTLEVBQUUsSUFBSTs0QkFDZixrQkFBa0IsRUFBRSxLQUFLO3lCQUM1Qjt3QkFDRCxrQkFBa0IsRUFBRTs0QkFDaEIsYUFBYSxFQUFFLEtBQUs7eUJBQ3ZCO3dCQUNELFlBQVksRUFBRTs0QkFDVixVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUU7eUJBQzdDO3FCQUNKLENBQUMsQ0FBQTtvQkFDRixJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixFQUFFLENBQUM7b0JBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2hDLENBQUM7YUFDSixDQUFBO1lBekJZLFdBQVc7Z0JBRHZCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsV0FBVyxDQXlCdkI7WUF6QlksdUJBQVcsY0F5QnZCLENBQUE7UUFHTCxDQUFDLEVBdElvQixXQUFXLEdBQVgsZUFBVyxLQUFYLGVBQVcsUUFzSS9CO0lBQUQsQ0FBQyxFQXRJZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBc0luQjtBQUFELENBQUMsRUF0SVMsTUFBTSxLQUFOLE1BQU0sUUFzSWYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkby5XZWJDb250cm9scy5HRGV0YWlsTWV0b2RpY2t5LnRzICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgc3N1bGEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAg77+9IEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTExLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkFkby5XZWJDb250cm9scyB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxNZXRvZGlja3kgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIHByaXZhdGUgZGF0YUxpc3REZXNjcmlwdGlvbjogR29yZGljLkdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR0RhdGFMaXN0RGVzY3JpcHRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvTWV0b2RpY2t5RHRvO1xyXG4gICAgICAgIHByaXZhdGUgbmV3UmVjb3JkOiBib29sZWFuO1xyXG4gICAgICAgIHByaXZhdGUgZGV0YWlsT2JqOiBHRGV0YWlsTWV0b2RpY2t5T2JqICYgR0NvbnRlbnQ7XHJcblxyXG4gICAgICAgIC8vIGhvZG5vdGEgcGFyYW1ldHJ1IGFkeF9jaGVja2ljb25hZCBcclxuICAgICAgICBwcml2YXRlIGN1cnJlbnRGaWx0ZXI6IGFueTtcclxuICAgICAgICBwcml2YXRlIGdyaWRSYzogR29yZGljLkNvbXBvbmVudHMuR3JpZFJDPGFueT47XHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVQcmV2aW91c0FuZE5leHRBY3Rpb246IGJvb2xlYW47XHJcblxyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsT2JqID0gR29yZGljLlV0aWxzLmV4dGVuZFdpdGhQcm90b01ldGhvZHModGhpcywgbmV3IEdEZXRhaWxNZXRvZGlja3lPYmooKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsT2JqLmNyZWF0ZUJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgY29udGVudE5hbWU6IFwiZGV0YWlsQWRvTWV0b2RpY2t5XCIsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50Q2FwdGlvbjogXCJqcmVzOjM1ODAwMTI1XCIsIC8vUkMgMzU4MDAxMjUgOiBNZXRvZGnvv71reVxyXG4gICAgICAgICAgICAgICAgbmV3UmVjb3JkOiB0aGlzLm5ld1JlY29yZCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcclxuICAgICAgICAgICAgICAgIGRhdGFMaXN0RGVzY3JpcHRpb246IHRoaXMuZGF0YUxpc3REZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIGFkZFBsYXRub3N0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRGaWx0ZXI6IHRoaXMuY3VycmVudEZpbHRlcixcclxuICAgICAgICAgICAgICAgIGdyaWRSYzogdGhpcy5ncmlkUmMsXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQcmV2aW91c0FuZE5leHRBY3Rpb246IHRoaXMuY3JlYXRlUHJldmlvdXNBbmROZXh0QWN0aW9uLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHRhYnM6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5UYWJQYXJhbXNJZFtdIHwgT2JqZWN0TGl0ZXJhbDxHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuVGFiUGFyYW1zPiB8IG51bGwgPSBbXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubmV3UmVjb3JkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0YWJzLnB1c2godGhpcy5kZXRhaWxPYmouZ2V0QXVkaXRQcmlzdHVwdVRhYigpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZ3JvdXBzOiBJR1RhYkdyb3VwT3B0aW9uc1tdID0gW107XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5ld1JlY29yZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgZ3JvdXBzLnB1c2godGhpcy5kZXRhaWxPYmouZ2V0QXVkaXRQcmlzdHVwdUdyb3VwKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1aWxkZXIud2l0aENvbXBvbmVudDx0aGlzPihcIkRldGFpbEFkb01ldG9kaWNreVwiLCB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXNCYXI6IHRoaXMuZGV0YWlsT2JqLmNyZWF0ZVN0YXR1c0JhcigpLFxyXG4gICAgICAgICAgICAgICAgbWVudUJhcjogdGhpcy5kZXRhaWxPYmouY3JlYXRlTWVudUJhcigpLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyRm9ybTogdGhpcy5kZXRhaWxPYmouY3JlYXRlRm9ybUNvbXBsZXQoKSxcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRCYXI6IHRoaXMuZGV0YWlsT2JqLmNyZWF0ZUNvbW1hbmRCYXIoKSxcclxuICAgICAgICAgICAgICAgIHNpZGVQYW5lbHM6IFt0aGlzLmRldGFpbE9iai5nZXRQb3puYW1reSgpXSxcclxuICAgICAgICAgICAgICAgIHRhYnM6IHRhYnMsXHJcbiAgICAgICAgICAgICAgICB0YWJHcm91cHM6IGdyb3VwcyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmRldGFpbE9iai5maW5pc2hCdWlsZGVyKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsb3NpbmcoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldGFpbE9iai5jbG9zZUFjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxNZXRvZGlja3lPYmogZXh0ZW5kcyBHb3JkaWMuQWR4LldlYkNvbnRyb2xzLkdBZHhEZXRhaWxCYXNlPEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9NZXRvZGlja3lEdG8+IHtcclxuICAgICAgICBwcml2YXRlIGFkeENoZWNrSWNvTmFkOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBhZG1ScEVkaWV4dGlkOiBib29sZWFuO1xyXG4gICAgICAgIGNyZWF0ZSgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXh0UG9waXMoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbCB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5kYXRhLml4c19yZWZfdHh0fWBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN4c0RldGFpbCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5kYXRhLml4c19yYXJ9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBDaGVja0RhdGVzKGRhdGUxIDogRGF0ZSwgZGF0ZTIgOiBEYXRlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0ZTEuZ2V0RnVsbFllYXIoKSA9PSBkYXRlMi5nZXRGdWxsWWVhcigpICYmIGRhdGUxLmdldE1vbnRoKCkgPT0gZGF0ZTIuZ2V0TW9udGgoKSAmJiBkYXRlMS5nZXREYXkoKSA9PSBkYXRlMi5nZXREYXkoKSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBzYXZlRGF0YShkYXRhOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvTWV0b2RpY2t5RHRvLCBjbG9zZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmRhdF96bWVuYSAmJiAhdGhpcy5vcHRpb25zLm5ld1JlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFrdHVhbG5pRGF0dW0gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdHVtUG9zbGVkbmlabWVueSA9IG5ldyBEYXRlKHRoaXMuZGF0YS5kYXRfem1lbmEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQ2hlY2tEYXRlcyhha3R1YWxuaURhdHVtLCBkYXR1bVBvc2xlZG5pWm1lbnkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbnQuZGlhbG9ncy53YXJuaW5nKFwianJlczozNTgwMDE0NlwiLCBcImpyZXM6MzU4MDAxNjlcIikgLy9SQyAzNTgwMDE2OSA6IE5lbHplIG3vv71uaXQgYWt0aXZpdHUgdSBtZXRvZGnvv71reSB277+9Y2UgamFrIGplZG5vdSB6YSBkZW4uXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNudC5pc2wuQWRvTWV0b2RpY2t5LnVwc2VydCh7IGRhdGE6IGRhdGEgfSkuZ2V0KCkudGhlbigob3V0cHV0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZ0FjdGlvbihcImFjdFNhdmVcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IG91dHB1dC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHcmlkQmFzZSgpLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1N1Y2Nlc3NTYXZlKGNsb3NlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2UgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlQWN0aW9uKHRydWUpLmRvbmUoKCkgPT4geyB0aGlzLmNudC5jbG9zZSgpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZERhdGFCYXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nQWN0aW9uKFwiYWN0U2F2ZVwiLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcclxuICAgICAgICAgICAgfSlcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJlbG9hZERhdGEoZmlsdGVyT2JqOiBhbnksIGRhdGFPYmo6IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5EZXRhaWxPck1vZGFsV2luZG93KFwiR29yZGljLkFkby5XZWJDb250cm9scy5HRGV0YWlsTWV0b2RpY2t5XCIsIGZpbHRlck9iaiwgZGF0YU9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVHcmlkKGZpbHRlcjogYW55LCBncmlkOiBhbnkpOiBhbnkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbnQuaXNsLkFkb01ldG9kaWNreS5saXN0KHtcclxuICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICB9KS5nZXRWaWV3KCkucHJvbWlzZSgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVUaXRsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLm5ld1JlY29yZCA9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozNTgwMDAxMlwiOyAvL1JDIDM1ODAwMDEyIDogTm9277+9IHrvv716bmFtXHJcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLm9wdGlvbnMuY29udGVudENhcHRpb259IC0gJHt0aGlzLnRleHRQb3BpcygpfWBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZU1lbnVCYXIoKTogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyTWVudUl0ZW1EZWYge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmFrdGl2aXRhID09IDUwMCB8fCB0aGlzLmRhdGEuYWt0aXZpdGEgPT0gOTAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2hhcmVBY3Rpb25zKCksXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuY250LmFjdGlvbnMuYWN0UHJldmlvdXMsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuY250LmFjdGlvbnMuYWN0TmV4dCwgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm9wcG9zaXRlXCIgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICBcImFjdEVkaXQqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuY250LmFjdGlvbnMuYWN0U2F2ZSwgZmF2b3JpdGU6IHRydWUsIGFjdGlvbkNvbnRleHQ6IHsgY2xvc2U6IGZhbHNlIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICBcImFjdENhbmNlbEVkaXQqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTaGFyZUFjdGlvbnMoKSxcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5jbnQuYWN0aW9ucy5hY3RQcmV2aW91cywgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm9wcG9zaXRlXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5jbnQuYWN0aW9ucy5hY3ROZXh0LCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVDb21tYW5kQmFyKCk6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlck1lbnVJdGVtRGVmIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIHsgY2FwdGlvbjogXCJqcmVzOjM1ODAwMDEwXCIsIGFjdGlvbjogdGhpcy5jbnQuYWN0aW9ucy5hY3RTYXZlLCBjdXN0b21DbGFzczogXCJnLWJ1dHRvbi0tcHJpbWFyeVwiLCBmYXZvcml0ZTogdHJ1ZSwgYWN0aW9uQ29udGV4dDogeyBjbG9zZTogdHJ1ZSB9IH0sIC8vUkMgMzU4MDAwMTAgOiBVbG/vv71pdCBhIHphdu+/ve+/vXRcclxuICAgICAgICAgICAgICAgIFwiYWN0Q2xvc2UqXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQWN0aW9ucygpOiB7IFtha2NlTmFtZTogc3RyaW5nXTogR0FjdGlvbiB8IEdBY3Rpb25QYXJhbXNEZWZPYmogfSB8IG51bGwge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0RWRpdE1vZGUoZWRpdE1vZGU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5ha3Rpdml0YSA9PSA1MDAgfHwgdGhpcy5kYXRhLmFrdGl2aXRhID09IDkwMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY250LmFjdGlvbnMuYWN0T3BlblNzbERlbmlrPy51cGRhdGUoeyBlbmFibGVkOiBlZGl0TW9kZSA9PSBmYWxzZSB9KVxyXG4gICAgICAgICAgICB2YXIgZmllbGRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgICAgICBmaWVsZHMucHVzaCggLy9W77+9RFlDS1kgRURJVE9WQVRFTE7vv71cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLm5ld1JlY29yZCkgeyAgLy8gRURJVE9WQVRFTE7vv70gUE9VWkUgUE9LVUQgPT0gTkVXIFrvv71aTkFNXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZGF0YS5peHNfcmFyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9NZXRvZGlja3lEdG9OYW1lcy5peHNfcmFyXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmllbGRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb01ldG9kaWNreUR0b05hbWVzLml4c19yZWZcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHsgLy8gRURJVE9WQVRFTE7vv70gUE9VWkUgUE9LVUQgIT0gTkVXIFrvv71aTkFNXHJcbiAgICAgICAgICAgICAgICBmaWVsZHMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICBcImFrdGl2aXRhXCJcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNudC5maW5kRmllbGRzKGZpZWxkcy5qb2luKFwiLFwiKSkuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybS5mb3JtLmxheW91dERlc2NyaXB0b3IgPSBcIkwyTTJTMVwiXHJcbiAgICAgICAgICAgIHRoaXMuZm9ybS5hZGRTZWN0aW9uKFwiXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDEyOVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbnNyZWYoKSwgeyAvL1JDIDM1ODAwMTI5IDogTWV0b2Rp77+9a2FcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvTWV0b2RpY2t5RHRvTmFtZXMuaXhzX3JlZixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfcmVmPXZhbHVlLml4c19yZWZcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7IHN0b3BwaW5nOiB0cnVlIH0pXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDEzMlwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3NyYXIoKSwgeyAgLy9SQyAzNTgwMDEzMiA6IEnvv71PIGEgbu+/vXpldiBvcmdhbml6YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb01ldG9kaWNreUR0b05hbWVzLml4c19yYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX3Jhcj12YWx1ZS5peHNfcmFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIjxiPntpY299PC9iPiAtIHtuYXpldn1cIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBncmFwaGljSW5wdXQ6IFwib25pbnB1dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHsgc3RvcHBpbmc6IHRydWUgfSldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMTMwXCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyAvL1JDIDM1ODAwMTMwIDogRGF0dW0gemHvv73vv710a3UgYWt0aXZpdHlcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvTWV0b2RpY2t5RHRvTmFtZXMuZGF0X29kLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHsgc3RvcHBpbmc6IHRydWUgfSldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAxMzFcIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IC8vUkMgMzU4MDAxMzEgOiBEYXR1bSBrb25jZSBha3Rpdml0eVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9NZXRvZGlja3lEdG9OYW1lcy5kYXRfZG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoeyBzdG9wcGluZzogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDE0NFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmNha3QoKSwgeyAvL1JDIDM1ODAwMTQ0IDogQWt0aXZpdGFcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvTWV0b2RpY2t5RHRvTmFtZXMuYWt0aXZpdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuYWt0aXZpdGE9dmFsdWUuYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7IHN0b3BwaW5nOiB0cnVlIH0pXSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgYWt0aXZpdGE6IDEwMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICBcclxuXHJcblxyXG4gICAgfVxyXG4gICAgICAgIFxyXG59IiwiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5BZG8uV2ViQ29udHJvbHMuR0RldGFpbE1ldG9kaWNreS50cyAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHNzdWxhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIO+/vSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0xMS0wMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5BZG8uV2ViQ29udHJvbHMge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsT2tlYyBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhTGlzdERlc2NyaXB0aW9uOiBHb3JkaWMuR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HRGF0YUxpc3REZXNjcmlwdGlvbjtcclxuICAgICAgICBwcml2YXRlIGRhdGE6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdPa2VjRHRvO1xyXG4gICAgICAgIHByaXZhdGUgbmV3UmVjb3JkOiBib29sZWFuO1xyXG4gICAgICAgIHByaXZhdGUgZGV0YWlsT2JqOiBHRGV0YWlsT2tlY09iaiAmIEdDb250ZW50O1xyXG5cclxuICAgICAgICBwcml2YXRlIGN1cnJlbnRGaWx0ZXI6IGFueTtcclxuICAgICAgICBwcml2YXRlIGdyaWRSYzogR29yZGljLkNvbXBvbmVudHMuR3JpZFJDPGFueT47XHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVQcmV2aW91c0FuZE5leHRBY3Rpb246IGJvb2xlYW47XHJcblxyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsT2JqID0gR29yZGljLlV0aWxzLmV4dGVuZFdpdGhQcm90b01ldGhvZHModGhpcywgbmV3IEdEZXRhaWxPa2VjT2JqKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmRldGFpbE9iai5jcmVhdGVCYXNlKHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnROYW1lOiBcImRldGFpbEFkb09rZWNcIixcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRDYXB0aW9uOiBcImpyZXM6MzU4MDAxOTlcIiwgXHJcbiAgICAgICAgICAgICAgICBuZXdSZWNvcmQ6IHRoaXMubmV3UmVjb3JkLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICAgICAgICAgICAgZGF0YUxpc3REZXNjcmlwdGlvbjogdGhpcy5kYXRhTGlzdERlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgYWRkUGxhdG5vc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYWRkQWt0aXZpdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudEZpbHRlcjogdGhpcy5jdXJyZW50RmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgZ3JpZFJjOiB0aGlzLmdyaWRSYyxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVByZXZpb3VzQW5kTmV4dEFjdGlvbjogdGhpcy5jcmVhdGVQcmV2aW91c0FuZE5leHRBY3Rpb24sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgdGFiczogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLlRhYlBhcmFtc0lkW10gfCBPYmplY3RMaXRlcmFsPEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5UYWJQYXJhbXM+IHwgbnVsbCA9IFtdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5uZXdSZWNvcmQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRhYnMucHVzaCh0aGlzLmRldGFpbE9iai5nZXRBdWRpdFByaXN0dXB1VGFiKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBncm91cHM6IElHVGFiR3JvdXBPcHRpb25zW10gPSBbXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubmV3UmVjb3JkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBncm91cHMucHVzaCh0aGlzLmRldGFpbE9iai5nZXRBdWRpdFByaXN0dXB1R3JvdXAoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVpbGRlci53aXRoQ29tcG9uZW50PHRoaXM+KFwiRGV0YWlsQWRvT2tlY1wiLCB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXNCYXI6IHRoaXMuZGV0YWlsT2JqLmNyZWF0ZVN0YXR1c0JhcigpLFxyXG4gICAgICAgICAgICAgICAgbWVudUJhcjogdGhpcy5kZXRhaWxPYmouY3JlYXRlTWVudUJhcigpLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyRm9ybTogdGhpcy5kZXRhaWxPYmouY3JlYXRlRm9ybUNvbXBsZXQoKSxcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRCYXI6IHRoaXMuZGV0YWlsT2JqLmNyZWF0ZUNvbW1hbmRCYXIoKSxcclxuICAgICAgICAgICAgICAgIHNpZGVQYW5lbHM6IFt0aGlzLmRldGFpbE9iai5nZXRQb3puYW1reSgpXSxcclxuICAgICAgICAgICAgICAgIHRhYnM6IHRhYnMsXHJcbiAgICAgICAgICAgICAgICB0YWJHcm91cHM6IGdyb3VwcyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmRldGFpbE9iai5maW5pc2hCdWlsZGVyKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsb3NpbmcoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldGFpbE9iai5jbG9zZUFjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxPa2VjT2JqIGV4dGVuZHMgR29yZGljLkFkeC5XZWJDb250cm9scy5HQWR4RGV0YWlsQmFzZTxHb3JkaWMuQWRvLkludGVyZmFjZS5HT2tlY0R0bz4ge1xyXG4gICAgICAgIGNyZWF0ZSgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXh0UG9waXMoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbCB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5kYXRhLm5hemV2fWBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN4c0RldGFpbCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5kYXRhLm9rZWN9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2F2ZURhdGEoZGF0YTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb01ldG9kaWNreUR0bywgY2xvc2U6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY250LmlzbC5BZG9Pa2VjU2VydmljZS51cHNlcnQoeyBkYXRhOiBkYXRhIH0pLmdldCgpLnRoZW4oKG91dHB1dDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdBY3Rpb24oXCJhY3RTYXZlXCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSBvdXRwdXQuZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR3JpZEJhc2UoKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTdWNjZXNzU2F2ZShjbG9zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkRhdGEucmVhZGVyQ2FjaGUuY2xlYXJDYWNoZShcIkdvcmRpYy5BZG8uQ2xpZW50LkdSZWFkZXJBZG9Fa29zb2tlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VBY3Rpb24odHJ1ZSkuZG9uZSgoKSA9PiB7IHRoaXMuY250LmNsb3NlKCkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkRGF0YUJhc2UoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdBY3Rpb24oXCJhY3RTYXZlXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbG9hZERhdGEoZmlsdGVyT2JqOiBhbnksIGRhdGFPYmo6IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5EZXRhaWxPck1vZGFsV2luZG93KFwiR29yZGljLkFkby5XZWJDb250cm9scy5HRGV0YWlsT2tlY1wiLCBmaWx0ZXJPYmosIGRhdGFPYmopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlR3JpZChmaWx0ZXI6IGFueSwgZ3JpZDogYW55KTogYW55IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY250LmlzbC5BZG9Pa2VjU2VydmljZS5saXN0KHtcclxuICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICB9KS5nZXRWaWV3KCkucHJvbWlzZSgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVUaXRsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLm5ld1JlY29yZCA9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozNTgwMDAxMlwiOyAvL1JDIDM1ODAwMDEyIDogTm9277+9IHrvv716bmFtXHJcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLm9wdGlvbnMuY29udGVudENhcHRpb259IC0gJHt0aGlzLnRleHRQb3BpcygpfWBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZU1lbnVCYXIoKTogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyTWVudUl0ZW1EZWYge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICBcImFjdEVkaXQqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuY250LmFjdGlvbnMuYWN0U2F2ZSwgZmF2b3JpdGU6IHRydWUsIGFjdGlvbkNvbnRleHQ6IHsgY2xvc2U6IGZhbHNlIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICBcImFjdENhbmNlbEVkaXQqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTaGFyZUFjdGlvbnMoKSxcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5jbnQuYWN0aW9ucy5hY3RQcmV2aW91cywgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm9wcG9zaXRlXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5jbnQuYWN0aW9ucy5hY3ROZXh0LCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9XHJcbiAgICAgICAgICAgICAgICBdXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQ29tbWFuZEJhcigpOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJNZW51SXRlbURlZiB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICB7IGNhcHRpb246IFwianJlczozNTgwMDAxMFwiLCBhY3Rpb246IHRoaXMuY250LmFjdGlvbnMuYWN0U2F2ZSwgY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIiwgZmF2b3JpdGU6IHRydWUsIGFjdGlvbkNvbnRleHQ6IHsgY2xvc2U6IHRydWUgfSB9LCAvL1JDIDM1ODAwMDEwIDogVWxv77+9aXQgYSB6YXbvv73vv710XHJcbiAgICAgICAgICAgICAgICBcImFjdENsb3NlKlwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUFjdGlvbnMoKTogeyBbYWtjZU5hbWU6IHN0cmluZ106IEdBY3Rpb24gfCBHQWN0aW9uUGFyYW1zRGVmT2JqIH0gfCBudWxsIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEVkaXRNb2RlKGVkaXRNb2RlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250LmFjdGlvbnMuYWN0T3BlblNzbERlbmlrPy51cGRhdGUoeyBlbmFibGVkOiBlZGl0TW9kZSA9PSBmYWxzZSB9KVxyXG4gICAgICAgICAgICB2YXIgZmllbGRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgICAgICBmaWVsZHMucHVzaCggLy9W77+9RFlDS1kgRURJVE9WQVRFTE7vv71cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdPa2VjRHRvTmFtZXMubmF6ZXZcclxuXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubmV3UmVjb3JkKSB7ICAvLyBFRElUT1ZBVEVMTu+/vSBQT1VaRSBQT0tVRCA9PSBORVcgWu+/vVpOQU1cclxuICAgICAgICAgICAgICAgIGZpZWxkcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdPa2VjRHRvTmFtZXMub2tlY1xyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgeyAvLyBFRElUT1ZBVEVMTu+/vSBQT1VaRSBQT0tVRCAhPSBORVcgWu+/vVpOQU1cclxuICAgICAgICAgICAgICAgIGZpZWxkcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY250LmZpbmRGaWVsZHMoZmllbGRzLmpvaW4oXCIsXCIpKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtLmZvcm0ubGF5b3V0RGVzY3JpcHRvciA9IFwiTDJNMlMxXCJcclxuICAgICAgICAgICAgdGhpcy5mb3JtLmFkZFNlY3Rpb24oXCJcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMjAwXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcihHb3JkaWMuQWRvLkludGVyZmFjZS5HT2tlY0R0b1R5cGVMZW5ndGhzLm9rZWMpLCB7IC8vUkMgMzU4MDAyMDAgOiBPS0Xvv71cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HT2tlY0R0b05hbWVzLm9rZWMsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoeyBzdG9wcGluZzogdHJ1ZSB9KSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR09rZWNEdG9UeXBlTGVuZ3Rocy5va2VjLCBzdG9wcGluZzogdHJ1ZSB9KV0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAyMDFcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkZpZWxkLmNoYXJDb3VudGVyKEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdPa2VjRHRvVHlwZUxlbmd0aHMubmF6ZXYpLCB7IC8vUkMgMzU4MDAyMDEgOiBO77+9emV2XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR09rZWNEdG9OYW1lcy5uYXpldixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7IHN0b3BwaW5nOiB0cnVlIH0pLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiBHb3JkaWMuQWRvLkludGVyZmFjZS5HT2tlY0R0b1R5cGVMZW5ndGhzLm5hemV2LCBzdG9wcGluZzogdHJ1ZSB9KV0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLkFkby5XZWJDb250cm9scyB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxSZWdpc3RyT3JnYW5pemFjaSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhTGlzdERlc2NyaXB0aW9uOiBHb3JkaWMuR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HRGF0YUxpc3REZXNjcmlwdGlvbjtcclxuICAgICAgICBwcml2YXRlIGRhdGE6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0bztcclxuICAgICAgICBwcml2YXRlIG5ld1JlY29yZDogYm9vbGVhbjtcclxuICAgICAgICBwcml2YXRlIGRldGFpbE9iajogR0RldGFpbFJlZ2lzdHJPcmdhbml6YWNpT2JqICYgR0NvbnRlbnQ7XHJcblxyXG4gICAgICAgIC8vIGhvZG5vdGEgcGFyYW1ldHJ1IGFkeF9jaGVja2ljb25hZCBcclxuICAgICAgICBwcml2YXRlIGN1cnJlbnRGaWx0ZXI6IGFueTtcclxuICAgICAgICBwcml2YXRlIGdyaWRSYzogR29yZGljLkNvbXBvbmVudHMuR3JpZFJDPGFueT47XHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVQcmV2aW91c0FuZE5leHRBY3Rpb246IGJvb2xlYW47XHJcblxyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsT2JqID0gR29yZGljLlV0aWxzLmV4dGVuZFdpdGhQcm90b01ldGhvZHModGhpcywgbmV3IEdEZXRhaWxSZWdpc3RyT3JnYW5pemFjaU9iaigpKTtcclxuICAgICAgICAgICAgdGhpcy5kZXRhaWxPYmouY3JlYXRlQmFzZSh7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50TmFtZTogXCJkZXRhaWxBZG9SZWdpc3RyT3JnYW5pemFjaVwiLFxyXG4gICAgICAgICAgICAgICAgY29udGVudENhcHRpb246IFwianJlczozNTgwMDAxMVwiLCAvL1JDIDM1ODAwMDExIDogRGV0YWlsIG9yZ2FuaXphY2VcclxuICAgICAgICAgICAgICAgIG5ld1JlY29yZDogdGhpcy5uZXdSZWNvcmQsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXHJcbiAgICAgICAgICAgICAgICBkYXRhTGlzdERlc2NyaXB0aW9uOiB0aGlzLmRhdGFMaXN0RGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBhZGRQbGF0bm9zdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50RmlsdGVyOiB0aGlzLmN1cnJlbnRGaWx0ZXIsXHJcbiAgICAgICAgICAgICAgICBncmlkUmM6IHRoaXMuZ3JpZFJjLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlUHJldmlvdXNBbmROZXh0QWN0aW9uOiB0aGlzLmNyZWF0ZVByZXZpb3VzQW5kTmV4dEFjdGlvbixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciB0YWJzOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuVGFiUGFyYW1zSWRbXSB8IE9iamVjdExpdGVyYWw8R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLlRhYlBhcmFtcz4gfCBudWxsID0gW107XHJcbiAgICAgICAgICAgIHRhYnMucHVzaCh0aGlzLmRldGFpbE9iai5jcmVhdGVSb3pzaXJlbnlQcm9maWxUYWIoKSk7XHJcbiAgICAgICAgICAgIHRhYnMucHVzaCh0aGlzLmRldGFpbE9iai5jcmVhdGVSb3pzaXJlbnlQcm9maWxBcmlzKCkpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5ld1JlY29yZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGFicy5wdXNoKHRoaXMuZGV0YWlsT2JqLmdldEF1ZGl0UHJpc3R1cHVUYWIoKSk7XHJcbiAgICAgICAgICAgICAgICAvL3RhYnMucHVzaCh0aGlzLmRldGFpbE9iai5jcmVhdGVTZXpuYW1NYWlsQ2VydE9yZ2FuaXphY2VUYWIoKSk7XHJcbiAgICAgICAgICAgICAgICB0YWJzLnB1c2godGhpcy5kZXRhaWxPYmouY3JlYXRlU2V6bmFtTWV0b2RpY2t5VGFiKCkpO1xyXG4gICAgICAgICAgICAgICAgdGFicy5wdXNoKHRoaXMuZGV0YWlsT2JqLmNyZWF0ZVNlem5hbU1ldG9kaWNreUhpc3RvcnlUYWIoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGdyb3VwczogSUdUYWJHcm91cE9wdGlvbnNbXSA9IFtdO1xyXG4gICAgICAgICAgICBncm91cHMucHVzaCh0aGlzLmRldGFpbE9iai5jcmVhdGVSb3pzaXJlbnlQcm9maWxHcm91cCgpKTtcclxuICAgICAgICAgICAgZ3JvdXBzLnB1c2godGhpcy5kZXRhaWxPYmouY3JlYXRlUm96c2lyZW55UHJvZmlsQXJpc0dyb3VwKCkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5uZXdSZWNvcmQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGdyb3Vwcy5wdXNoKHRoaXMuZGV0YWlsT2JqLmdldEF1ZGl0UHJpc3R1cHVHcm91cCgpKTtcclxuICAgICAgICAgICAgICAgIC8vZ3JvdXBzLnB1c2godGhpcy5kZXRhaWxPYmouY3JlYXRlU2V6bmFtTWFpbENlcnRPcmdhbml6YWNlR3JvdXAoKSk7XHJcbiAgICAgICAgICAgICAgICBncm91cHMucHVzaCh0aGlzLmRldGFpbE9iai5jcmVhdGVTZXpuYW1NZXRvZGlja3lHcm91cCgpKTtcclxuICAgICAgICAgICAgICAgIGdyb3Vwcy5wdXNoKHRoaXMuZGV0YWlsT2JqLmNyZWF0ZVNlem5hbU1ldG9kaWNreUhpc3RvcnlHcm91cCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidWlsZGVyLndpdGhDb21wb25lbnQ8dGhpcz4oXCJEZXRhaWxBZG9SZWdpc3RyT3JnYW5pemFjaVwiLCB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXNCYXI6IHRoaXMuZGV0YWlsT2JqLmNyZWF0ZVN0YXR1c0JhcigpLFxyXG4gICAgICAgICAgICAgICAgbWVudUJhcjogdGhpcy5kZXRhaWxPYmouY3JlYXRlTWVudUJhcigpLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyRm9ybTogdGhpcy5kZXRhaWxPYmouY3JlYXRlRm9ybUNvbXBsZXQoKSxcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRCYXI6IHRoaXMuZGV0YWlsT2JqLmNyZWF0ZUNvbW1hbmRCYXIoKSxcclxuICAgICAgICAgICAgICAgIHNpZGVQYW5lbHM6IFt0aGlzLmRldGFpbE9iai5nZXRQb3puYW1reSgpXSxcclxuICAgICAgICAgICAgICAgIHRhYnM6IHRhYnMsXHJcbiAgICAgICAgICAgICAgICB0YWJHcm91cHM6IGdyb3VwcyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmRldGFpbE9iai5maW5pc2hCdWlsZGVyKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsb3NpbmcoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldGFpbE9iai5jbG9zZUFjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxSZWdpc3RyT3JnYW5pemFjaU9iaiBleHRlbmRzIEdvcmRpYy5BZHguV2ViQ29udHJvbHMuR0FkeERldGFpbEJhc2U8R29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvPiB7XHJcbiAgICAgICAgcHJpdmF0ZSBhZHhDaGVja0ljb05hZDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgYWRtUnBFZGlleHRpZDogYm9vbGVhbjtcclxuICAgICAgICBwcml2YXRlIFJvenNpcmVueVByb2ZpbEZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSBSb3pzaXJlbnlQcm9maWxBcmlzRm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGlzRXN1UG92aW46IGJvb2xlYW47XHJcbiAgICAgICAgcHJpdmF0ZSBpc1Bvdm9sWm1lbmFPcmdudW06IGJvb2xlYW47XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGNyZWF0ZSgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXh0UG9waXMoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbCB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLmRhdGEubmF6ZXZ9YFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U3hzRGV0YWlsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLmRhdGEuaXhzX3Jhcn1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2F2ZURhdGEoZGF0YTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvLCBjbG9zZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Sb3pzaXJlbnlQcm9maWxGb3JtLmdmb3JtKFwiaXNWYWxpZFwiKSAmJiB0aGlzLlJvenNpcmVueVByb2ZpbEFyaXNGb3JtLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5uZXdSZWNvcmQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZHptID0gMTsgLy8gVnpuaWtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zYXZlRGF0YUludGVybmFsKGRhdGEsIGNsb3NlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNudC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJqcmVzOjM1ODAwMDc5XCIsIHRoaXMuY3JlYXRlRHV2b2RGb3JtKCksIG51bGwsIHsgLy9SQyAzNTgwMDA3OSA6IFphZGVqdGUgZO+/vXZvZCBlZGl0YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjUwLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLm9uKFwib2tcIiwgKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5kem0gPSBjdHguZHptO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zYXZlRGF0YUludGVybmFsKGRhdGEsIGNsb3NlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBjcmVhdGVEdXZvZEZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICB2YXIgZHptRGF0YTogR29yZGljLkRhdGEuVmlldztcclxuICAgICAgICAgICAgZHptRGF0YSA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFt7IGR6bTogMiwgZHptX3R4dDogXCJqcmVzOjM1ODAwMTgyXCIgfSwgeyBkem06IDMsIGR6bV90eHQ6IFwianJlczozNTgwMDE4M1wiIH0sIHsgZHptOiA0LCBkem1fdHh0OiBcImpyZXM6MzU4MDAxODRcIiB9XSwgeyBrZXk6IFwiZHptXCIgfSkgLy9SQyAzNTgwMDE4NCA6IFrvv71uaWtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDAyNFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyAvL1JDIDM1ODAwMDI0IDogRHJ1aCB6be+/vW55XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuZHptLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkem1EYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7ZHptX3R4dH1cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5kem09dmFsdWUuZHptXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyQ29sdW1uczogW1wiZHptX3R4dFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBncmFwaGljSW5wdXQ6IFwib25pbnB1dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoeyBzdG9wcGluZzogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzYXZlRGF0YUludGVybmFsKGRhdGE6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0bywgY2xvc2U6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuUm96c2lyZW55UHJvZmlsRm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLlJvenNpcmVueVByb2ZpbEFyaXNGb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNudC5pc2wuQWRvUmVnaXN0ck9yZ2FuaXphY2kudXBzZXJ0KHsgZGF0YTogZGF0YSB9KS5nZXQoKS50aGVuKChvdXRwdXQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nQWN0aW9uKFwiYWN0U2F2ZVwiLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gb3V0cHV0LmRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdyaWRCYXNlKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U3VjY2Vzc1NhdmUoY2xvc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VBY3Rpb24odHJ1ZSkuZG9uZSgoKSA9PiB7IHRoaXMuY250LmNsb3NlKCkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkRGF0YUJhc2UoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdBY3Rpb24oXCJhY3RTYXZlXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcmVsb2FkRGF0YShmaWx0ZXJPYmo6IGFueSwgZGF0YU9iajogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkRldGFpbE9yTW9kYWxXaW5kb3coXCJHb3JkaWMuQWRvLldlYkNvbnRyb2xzLkdEZXRhaWxSZWdpc3RyT3JnYW5pemFjaVwiLCBmaWx0ZXJPYmosIGRhdGFPYmopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlR3JpZChmaWx0ZXI6IGFueSwgZ3JpZDogYW55KTogYW55IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY250LmlzbC5BZG9SZWdpc3RyT3JnYW5pemFjaS5saXN0KHtcclxuICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICB9KS5nZXRWaWV3KCkucHJvbWlzZSgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVUaXRsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLm5ld1JlY29yZCA9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozNTgwMDAxMlwiOyAvL1JDIDM1ODAwMDEyIDogTm9277+9IHrvv716bmFtXHJcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLm9wdGlvbnMuY29udGVudENhcHRpb259IC0gJHt0aGlzLnRleHRQb3BpcygpfWBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZU1lbnVCYXIoKTogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyTWVudUl0ZW1EZWYge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgXCJhY3RFZGl0KlwiLFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuY250LmFjdGlvbnMuYWN0U2F2ZSwgZmF2b3JpdGU6IHRydWUsIGFjdGlvbkNvbnRleHQ6IHsgY2xvc2U6IGZhbHNlIH0gfSxcclxuICAgICAgICAgICAgICAgIFwiYWN0Q2FuY2VsRWRpdCpcIixcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2hhcmVBY3Rpb25zKCksXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5jbnQuYWN0aW9ucy5hY3RQcmV2aW91cywgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm9wcG9zaXRlXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmNudC5hY3Rpb25zLmFjdE5leHQsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0sXHJcblxyXG5cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQ29tbWFuZEJhcigpOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJNZW51SXRlbURlZiB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICB7IGNhcHRpb246IFwianJlczozNTgwMDAxMFwiLCBhY3Rpb246IHRoaXMuY250LmFjdGlvbnMuYWN0U2F2ZSwgY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIiwgZmF2b3JpdGU6IHRydWUsIGFjdGlvbkNvbnRleHQ6IHsgY2xvc2U6IHRydWUgfSB9LCAvL1JDIDM1ODAwMDEwIDogVWxv77+9aXQgYSB6YXbvv73vv710XHJcbiAgICAgICAgICAgICAgICBcImFjdENsb3NlKlwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUFjdGlvbnMoKTogeyBbYWtjZU5hbWU6IHN0cmluZ106IEdBY3Rpb24gfCBHQWN0aW9uUGFyYW1zRGVmT2JqIH0gfCBudWxsIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBzZXRFZGl0TW9kZShlZGl0TW9kZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLmNudC5hY3Rpb25zLmFjdE9wZW5Tc2xEZW5paz8udXBkYXRlKHsgZW5hYmxlZDogZWRpdE1vZGUgPT0gZmFsc2UgfSlcclxuICAgICAgICAgICAgdmFyIGZpZWxkczogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNQb3ZvbFptZW5hT3JnbnVtKSB7IC8vIFBva3VkIGplIHBhcmFtZXRyIHBvdm9sZW4gcHJvIHpt77+9bnUgT1JHTlVNLCBw77+9aWRhdCBkbyBlZGl0b3ZhdGVsbu+/vWNoIHBvbO+/vVxyXG4gICAgICAgICAgICAgICAgZmllbGRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMub3JnbnVtXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZpZWxkcy5wdXNoKCAvL1bvv71EWUNLWSBFRElUT1ZBVEVMTu+/vVxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5ha3Rpdml0YSxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLm9iX2ptZW5vLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMudWxpY2UsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5zaWRsbyxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnBzYyxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLm9rZWMsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5yaXoxLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMub2tlYyxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLmFrdGl2aXRhX3NrdXQsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5kb3IsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5kb3IyLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuenVlLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMudHVqLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMudHlwX29yZyxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLml4c19lc3UsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5zdHJlZGlza28sXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5pY29fc3RyZWRpc2tvLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuaXhzX2VzdV9taXN0b3AsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5vcmosXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5vcmcsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5rYXAsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5wcml6X2thcCxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnRlbCxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLmZheCxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnByYWMsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5sYWJlbCxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnBwX2hsYXZuaV9jaW4sXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5wcF92ZWRsZWpzaV9jaW4sXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5peHNfZXN1X3VjdCxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLml4c19lc3Vfcm96LFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuaXhzX2VzdV92eWssXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5jZnNfb3JnbnVtLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuYWJmX29yZ251bSxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLmljb19naW5pcyxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLm5rc19naW5pcyxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnVjc19naW5pcyxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnpyaXpvdmF0ZWwsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5wcmF2X2Zvcm1hLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuc3RhdF96YXN0dXBjZSxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLm9yZ193d3csXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5uYW9wLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMua29wLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuemtvLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuZHVyLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuZHJpLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuem9kLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuenVlLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMubmF6MSxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLm5hejIsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5uYXozLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMucml6MixcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnJpejMsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5rYXBpdG9sYSxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLmhvYyxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnN0cyxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLmNmdSxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnpmbyxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnRzcixcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLm51dHMsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5rbF9zbG92YVxyXG5cclxuXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubmV3UmVjb3JkKSB7ICAvLyBFRElUT1ZBVEVMTu+/vSBQT1VaRSBQT0tVRCA9PSBORVcgWu+/vVpOQU1cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1Bvdm9sWm1lbmFPcmdudW0pIHsgLy8gUG9rdWQgbmVu77+9IHBvdm9sZW5hIHpt77+9bmEgT1JHTlVNLCBw77+9aWRhdCBkbyBlZGl0b3ZhdGVsbu+/vWNoIHBvbO+/vSB6YSBw77+9ZWRwb2tsYWR1LCDvv71lIHNlIGplZG7vv70gbyBub3bvv70geu+/vXpuYW1cclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMub3JnbnVtXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmllbGRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnphb1xyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgeyAvLyBFRElUT1ZBVEVMTu+/vSBQT1VaRSBQT0tVRCAhPSBORVcgWu+/vVpOQU1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZmllbGRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNudC5maW5kRmllbGRzKGZpZWxkcy5qb2luKFwiLFwiKSkuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGNyZWF0ZUZvcm0oKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZm9ybS5mb3JtLmxheW91dERlc2NyaXB0b3IgPSBcIkwyTTJTMVwiXHJcbiAgICAgICAgICAgIHRoaXMuZm9ybS5hZGRTZWN0aW9uKFwiXCIpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubmV3UmVjb3JkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm0uYWRkUm93KFwianJlczozNTgwMDAwOVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyAvL1JDIDM1ODAwMDA5IDogSWRlbnRpZmlr77+9dG9yXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuaXhzX3JhcixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiB0aGlzLmNyZWF0ZUZsYWdOZW1lbm5lKCksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7IHN0b3BwaW5nOiB0cnVlIH0pXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5mb3JtLmFkZFJvdyhcImpyZXM6MzU4MDAwMDdcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkZpZWxkLmNoYXJDb3VudGVyKEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b1R5cGVMZW5ndGhzLmljbyksIHsgLy8gUkMgMzU4MDAwMDcgOiBJ77+9T1xyXG4gICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuaWNvLFxyXG4gICAgICAgICAgICAgICAgZmxhZzogdGhpcy5jcmVhdGVGbGFnTmVtZW5uZSgpLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7IHN0b3BwaW5nOiB0cnVlIH0pLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9UeXBlTGVuZ3Rocy5pY28sIHN0b3BwaW5nOiB0cnVlIH0pXSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDA1XCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IC8vUkMgMzU4MDAwMDcgOiBPUkdOVU1cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5vcmdudW0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogdGhpcy5jcmVhdGVGbGFnTmVtZW5uZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDI1XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7IC8vUkMgMzU4MDAwMjUgOiBEcnVoIG9yZ2FuaXphY2VcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5kb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW3sgZG9yOiBcIjJcIiwgZG9yX3R4dDogXCJqcmVzOjM1ODAwMTYwXCIgfSwgeyBkb3I6IFwiM1wiLCBkb3JfdHh0OiBcImpyZXM6MzU4MDAxNjFcIiB9LCB7IGRvcjogXCI0XCIsIGRvcl90eHQ6IFwianJlczozNTgwMDE2MlwiIH0sIHsgZG9yOiBcIjlcIiwgZG9yX3R4dDogXCJqcmVzOjM1ODAwMTYzXCIgfV0sIHsga2V5OiBcImRvclwiIH0pLCAvL1JDIDM1ODAwMTYzIDogb3N0YXRu77+9XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntkb3JfdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmRvcj12YWx1ZS5kb3JcIixcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJkb3JfdHh0XCIsIFwiZG9yXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyYXBoaWNJbnB1dDogXCJvbmlucHV0XCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwMjZcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgLy9SQyAzNTgwMDAyNiA6IERydWggb3JnYW5pemFjZSAyXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuZG9yMixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbeyBkb3I6IFwiMlwiLCBkb3JfdHh0OiBcImpyZXM6MzU4MDAxNjBcIiB9LCB7IGRvcjogXCIzXCIsIGRvcl90eHQ6IFwianJlczozNTgwMDE2MVwiIH0sIHsgZG9yOiBcIjRcIiwgZG9yX3R4dDogXCJqcmVzOjM1ODAwMTYyXCIgfSwgeyBkb3I6IFwiOVwiLCBkb3JfdHh0OiBcImpyZXM6MzU4MDAxNjNcIiB9XSwgeyBrZXk6IFwiZG9yXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntkb3JfdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmRvcjI9dmFsdWUuZG9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyQ29sdW1uczogW1wiZG9yX3R4dFwiLCBcImRvclwiXSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBncmFwaGljSW5wdXQ6IFwib25pbnB1dFwiLFxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDAwMVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuRmllbGQuY2hhckNvdW50ZXIoR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvVHlwZUxlbmd0aHMubmF6ZXYpLCB7IC8vUkMgMzU4MDAwMDEgOiBO77+9emV2XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoeyBzdG9wcGluZzogdHJ1ZSB9KSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvVHlwZUxlbmd0aHMubmF6ZXYsIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDI3XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcihHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9UeXBlTGVuZ3Rocy5vYl9qbWVubyksIHsgLy9SQyAzNTgwMDAyNyA6IE7vv716ZXYgZGxlIHrvv71pem92YWPvv70gbGlzdGlueVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLm9iX2ptZW5vLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICByb3dzOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9TaXplOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoeyBzdG9wcGluZzogdHJ1ZSB9KSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvVHlwZUxlbmd0aHMub2Jfam1lbm8sIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDE2XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcihHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9UeXBlTGVuZ3Rocy51bGljZSksIHsgLy9SQyAzNTgwMDAxNiA6IFVsaWNlXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMudWxpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b1R5cGVMZW5ndGhzLnVsaWNlLCBzdG9wcGluZzogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDAyMFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuRmllbGQuY2hhckNvdW50ZXIoR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvVHlwZUxlbmd0aHMuc2lkbG8pICwgeyAvL1JDIDM1ODAwMDIwIDogU++/vWRsb1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnNpZGxvLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9UeXBlTGVuZ3Rocy5zaWRsbywgc3RvcHBpbmc6IHRydWUgfSldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwMjFcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkZpZWxkLmNoYXJDb3VudGVyKEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b1R5cGVMZW5ndGhzLnBzYykgLHsgLy9SQyAzNTgwMDAyMSA6IFBT77+9XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMucHNjLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9UeXBlTGVuZ3Rocy5wc2MsIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5mb3JtLmFkZFNlY3Rpb24oXCJcIilcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwMjhcIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IC8vUkMgMzU4MDAwMjggOiBQb3NsZWRu77+9IGFrdHVhbGl6YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMucGFvLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDI5XCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyAvL1JDIDM1ODAwMDI5IDogWmHvv73vv710ZWsgYWt0aXZpdHkgb3JnYW5pemFjZVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnphbyxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDAzMFwiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgLy9SQyAzNTgwMDAzMCA6IEtvbmVjIGFrdGl2aXR5IG9yZ2FuaXphY2VcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5rYW8sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwMzFcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jYWt0KCksIHsgLy9SQyAzNTgwMDAzMSA6IEFrdGl2aXRhIHNrdXRl77+9bu+/vVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLmFrdGl2aXRhX3NrdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuYWt0aXZpdGFfc2t1dD12YWx1ZS5ha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHsgc3RvcHBpbmc6IHRydWUgfSldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwMzJcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5hZG9Fa29zb2tlKCksIHsgLy9SQyAzNTgwMDAzMiA6IE9LRe+/vVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLm9rZWMsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLm9rZWM9dmFsdWUub2tlY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoeyBzdG9wcGluZzogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDAzN1wiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmFkb0Vrb3N6dWooKSwgeyAgLy9SQyAzNTgwMDAzNyA6IFrvv71rbGFkbu+/vSDvv716ZW1u77+9IGplZG5vdGthXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuenVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnp1amU9dmFsdWUuenVqZVwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDMzXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcihHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9UeXBlTGVuZ3Rocy5yaXoxKSAsIHsgLy9SQyAzNTgwMDAzMyA6IEnvv71PIGxpbmlvdu+/vSBuYWTvv73vv716ZW7vv70gb3JnYW5pemFjZVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnJpejEsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoeyBzdG9wcGluZzogdHJ1ZSB9KSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvVHlwZUxlbmd0aHMucml6MSwgc3RvcHBpbmc6IHRydWUgfSldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwMzlcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5hZG9Fa29jdHVqKCksIHsgICAvL1JDIDM1ODAwMDM5IDogVHlwIO+/ve+/vWV0bu+/vSBqZWRub3RreVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnR1aixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHVqPXZhbHVlLnR1alwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoeyBzdG9wcGluZzogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB2YXIgZnJtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTItMTAtMCwgTS0zLTktMCwgUy0xMi0xMi0wXCIsXHJcbiAgICAgICAgICAgIH0pLmFkZFJvdyhcImpyZXM6MzU4MDAxMjFcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgLy9SQyAzNTgwMDEyMSA6IEts77+977+9b3bvv70gc2xvdm9cclxuICAgICAgICAgICAgICAgIG5hbWU6IFwia2xpX3Nsb3ZvXCIsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcHBpbmc6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KV0sXHJcbiAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmFkZFJvdyhcImpyZXM6MzU4MDAxMjBcIikuYWRkRmllbGQoXCJnZm9ybWJveFwiLCB7IC8vUkMgMzU4MDAxMjAgOiBLbO+/ve+/vW9277+9IHNsb3ZhXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMua2xfc2xvdmEsXHJcbiAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7a2xpX3Nsb3ZvfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgZm9ybTogZnJtLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1EZWxldGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3AsIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkdG9bXCJrbF9zbG92YVwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR0b1tcImtsX3Nsb3ZhXCJdLmxlbmd0aCAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZHRvW1wia2xfc2xvdmFcIl0uc3BsaXQoXCIsXCIpLm1hcChpdGVtID0+IGl0ZW0udHJpbSgpKS5maWx0ZXIoaXRlbSA9PiBpdGVtLmxlbmd0aCA+IDApLm1hcChpdGVtID0+ICh7a2xpX3Nsb3ZvOiBpdGVtfSkpLCB7IHZhbGlkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3V0cHV0ID0gJCh0aGlzKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmluYWwgPSBvdXRwdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAobyA9PiBvPy5rbGlfc2xvdm8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGl0ZW0gPT4gaXRlbS50cmltKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuam9pbihcIixcIik7ICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0b1tcImtsX3Nsb3ZhXCJdID0gZmluYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2dPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGaWVsZHNBa3Rpdml0YSh0aGlzLm9wdGlvbnMubmV3UmVjb3JkLGZhbHNlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlUm96c2lyZW55UHJvZmlsVGFiKCk6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5UYWJQYXJhbXNJZCB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJ0YWItcm96c2lyZW55LXByb2ZpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzU4MDAwMzVcIiwgLy9SQyAzNTgwMDAzNSA6IFJveu+/ve+/ve+/vWVu77+9IHByb2ZpbFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiX3RhYi1yb3pzaXJlbnktcHJvZmlsXCIgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGluaXQ6ICh0YWI6IEpRdWVyeTxIVE1MRWxlbWVudD4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybVJvenNpcmVueVByb2ZpbCA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybVJvenNpcmVueVByb2ZpbC5hZGRTZWN0aW9uKFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDQwXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuYWRvRWtvY2FkbygpLCB7ICAvL1JDIDM1ODAwMDQwIDogVHlwIG9yZ2FuaXphY2UgcHJvIEdJTklTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy50eXBfb3JnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX29yZz12YWx1ZS50eXBfb3JnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgdHlwX29yZzogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7IHN0b3BwaW5nOiB0cnVlIH0pXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDA0MVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuRmllbGQuY2hhckNvdW50ZXIoR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvVHlwZUxlbmd0aHMuaWNvX3N0cmVkaXNrbykgLCB7IC8vUkMgMzU4MDAwNDEgOiBJ77+9TyBpbnZlbnTvv71ybu+/vWhvIG3vv71zdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLmljb19zdHJlZGlza28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvVHlwZUxlbmd0aHMuaWNvX3N0cmVkaXNrbywgc3RvcHBpbmc6IHRydWUgfSldXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDA0MlwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuRmllbGQuY2hhckNvdW50ZXIoR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvVHlwZUxlbmd0aHMuc3RyZWRpc2tvKSAsIHsgLy9SQyAzNTgwMDA0MiA6IEludmVudO+/vXJu77+9IG3vv71zdG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnN0cmVkaXNrbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9UeXBlTGVuZ3Rocy5zdHJlZGlza28sIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDA0M1wiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLkVzdS5QcmVmYWJzLnZ5YmVyRXN1KHsgLy9SQyAzNTgwMDA0MyA6IEVTVSBvcmdhbml6YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXA6IEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmlLYXJvdGVrYS5TZWxlY3RFc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RPdGV2cmVuaTogR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogdGhpcy5zZXRTeHNEZXRhaWwoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UubmV1cmNlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmlUeHQ6IFwianJlczozNTgwMDA0NFwiLCAvL1JDIDM1ODAwMDQ0IDogWmFk77+9bu+/vSB177+9aXZhdGVsZSBkbyBBRE9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBa3RabmFja2E6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGaWVsZHNUb0ZpbHRlcnBhbmVsOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLkVTVUthcnRvdGVrYUZpZWxkVG9GaWx0ZXIuTmF6ZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLkVTVUthcnRvdGVrYUZpZWxkVG9GaWx0ZXIuT2JjaG9kbmlKbWVubyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRXN1Lkdsb2JhbHMuRW51bXMuRVNVS2FydG90ZWthRmllbGRUb0ZpbHRlci5JY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLkVTVUthcnRvdGVrYUZpZWxkVG9GaWx0ZXIuRGljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5FU1VLYXJ0b3Rla2FGaWVsZFRvRmlsdGVyLkJ1U0ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZXN1PXZhbHVlLml4c19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLml4c19lc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiB0aGlzLmlzRXN1UG92aW4gPyBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHsgc3RvcHBpbmc6IHRydWUgfSldIDogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwNjZcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5Fc3UuUHJlZmFicy52eWJlckVzdSh7IC8vUkMgMzU4MDAwNjYgOiBFU1Ugbe+/vXN0YSBwb2RuaWvvv71u77+9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXA6IEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmlLYXJvdGVrYS5TZWxlY3RFc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RPdGV2cmVuaTogR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogdGhpcy5zZXRTeHNEZXRhaWwoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UubmV1cmNlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmlUeHQ6IFwianJlczozNTgwMDA0NFwiLCAvL1JDIDM1ODAwMDQ0IDogWmFk77+9bu+/vSB177+9aXZhdGVsZSBkbyBBRE9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBa3RabmFja2E6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGaWVsZHNUb0ZpbHRlcnBhbmVsOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLkVTVUthcnRvdGVrYUZpZWxkVG9GaWx0ZXIuTmF6ZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLkVTVUthcnRvdGVrYUZpZWxkVG9GaWx0ZXIuT2JjaG9kbmlKbWVubyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRXN1Lkdsb2JhbHMuRW51bXMuRVNVS2FydG90ZWthRmllbGRUb0ZpbHRlci5JY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLkVTVUthcnRvdGVrYUZpZWxkVG9GaWx0ZXIuRGljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5FU1VLYXJ0b3Rla2FGaWVsZFRvRmlsdGVyLkJ1U0ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZXN1X21pc3RvcD12YWx1ZS5peHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5peHNfZXN1X21pc3RvcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDA1OVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgR29yZGljLlByZWZhYnMuRmllbGQuY2hhckNvdW50ZXIoR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvVHlwZUxlbmd0aHMub3JqKSwgeyAvL1JDIDM1ODAwMDU5IDogT2Rib3IgLyBPUkdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLm9yaixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9UeXBlTGVuZ3Rocy5vcmosIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgR29yZGljLlByZWZhYnMuRmllbGQuY2hhckNvdW50ZXIoR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvVHlwZUxlbmd0aHMub3JnKSx7IC8vUkMgMzU4MDAwNDYgOiBPUkdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLm9yZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9UeXBlTGVuZ3Rocy5vcmcsIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwNjFcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIEdvcmRpYy5QcmVmYWJzLkZpZWxkLmNoYXJDb3VudGVyKEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b1R5cGVMZW5ndGhzLmthcCkgLCB7IC8vUkMgMzU4MDAwNjEgOiBLYXBpdG9sYSAvIHDvv73vv716bmFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5rYXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvVHlwZUxlbmd0aHMua2FwLCBzdG9wcGluZzogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcihHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9UeXBlTGVuZ3Rocy5wcml6X2thcCkgLHsgLy9SQyAzNTgwMDA0OSA6IFDvv73vv716bmFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5wcml6X2thcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9UeXBlTGVuZ3Rocy5wcml6X2thcCwgc3RvcHBpbmc6IHRydWUgfSldXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDA2MlwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgR29yZGljLlByZWZhYnMuRmllbGQuY2hhckNvdW50ZXIoR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvVHlwZUxlbmd0aHMudGVsKSwgeyAvL1JDIDM1ODAwMDYyIDogVGVsZWZvbiAvIGZheFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMudGVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b1R5cGVMZW5ndGhzLnRlbCwgc3RvcHBpbmc6IHRydWUgfSldXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIEdvcmRpYy5QcmVmYWJzLkZpZWxkLmNoYXJDb3VudGVyKEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b1R5cGVMZW5ndGhzLmZheCksIHsgLy9SQyAzNTgwMDA1MSA6IEZheFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuZmF4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b1R5cGVMZW5ndGhzLmZheCwgc3RvcHBpbmc6IHRydWUgfSldXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDA2M1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgR29yZGljLlByZWZhYnMuRmllbGQuY2hhckNvdW50ZXIoR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvVHlwZUxlbmd0aHMucHJhYykgLHsgLy9SQyAzNTgwMDA2MyA6IE9kcC4gcHJhYy4gLyBvYu+/vWxrYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMucHJhYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9UeXBlTGVuZ3Rocy5wcmFjLCBzdG9wcGluZzogdHJ1ZSB9KV1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgR29yZGljLlByZWZhYnMuRmllbGQuY2hhckNvdW50ZXIoR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvVHlwZUxlbmd0aHMubGFiZWwpICwgeyAvL1JDIDM1ODAwMDUzIDogT2Lvv71sa2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLmxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b1R5cGVMZW5ndGhzLmxhYmVsLCBzdG9wcGluZzogdHJ1ZSB9KV1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDY0XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcihHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9UeXBlTGVuZ3Rocy5wcF9obGF2bmlfY2luKSwgeyAvL1JDIDM1ODAwMDY0IDogUO+/vWVkbe+/vXQgcC4gSO+/vS9W77+9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5wcF9obGF2bmlfY2luLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b1R5cGVMZW5ndGhzLnBwX2hsYXZuaV9jaW4sIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcihHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9UeXBlTGVuZ3Rocy5wcF92ZWRsZWpzaV9jaW4pICx7IC8vUkMgMzU4MDAwNTUgOiBQ77+9ZWRt77+9dCBwLiBW77+9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5wcF92ZWRsZWpzaV9jaW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvVHlwZUxlbmd0aHMucHBfdmVkbGVqc2lfY2luLCBzdG9wcGluZzogdHJ1ZSB9KV1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDY4XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuRXN1LlByZWZhYnMudnliZXJFc3UoeyAvL1JDIDM1ODAwMDY4IDogS28gVWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXA6IEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmlLYXJvdGVrYS5TZWxlY3RFc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RPdGV2cmVuaTogR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogdGhpcy5zZXRTeHNEZXRhaWwoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UubmV1cmNlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmlUeHQ6IFwianJlczozNTgwMDA0NFwiLCAvL1JDIDM1ODAwMDQ0IDogWmFk77+9bu+/vSB177+9aXZhdGVsZSBkbyBBRE9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBa3RabmFja2E6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGaWVsZHNUb0ZpbHRlcnBhbmVsOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLkVTVUthcnRvdGVrYUZpZWxkVG9GaWx0ZXIuTmF6ZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLkVTVUthcnRvdGVrYUZpZWxkVG9GaWx0ZXIuT2JjaG9kbmlKbWVubyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRXN1Lkdsb2JhbHMuRW51bXMuRVNVS2FydG90ZWthRmllbGRUb0ZpbHRlci5JY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLkVTVUthcnRvdGVrYUZpZWxkVG9GaWx0ZXIuRGljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5FU1VLYXJ0b3Rla2FGaWVsZFRvRmlsdGVyLkJ1U0ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZXN1X3VjdD12YWx1ZS5peHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5peHNfZXN1X3VjdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwNjlcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5Fc3UuUHJlZmFicy52eWJlckVzdSh7IC8vUkMgMzU4MDAwNjkgOiBLbyBSb3pcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cDogR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLlR5cFpvYnJhemVuaUthcm90ZWthLlNlbGVjdEVzdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vZE90ZXZyZW5pOiBHb3JkaWMuR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ292YW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiB0aGlzLnNldFN4c0RldGFpbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS5uZXVyY2VuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogXCJqcmVzOjM1ODAwMDQ0XCIsIC8vUkMgMzU4MDAwNDQgOiBaYWTvv71u77+9IHXvv71pdmF0ZWxlIGRvIEFET1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZpZWxkc1RvRmlsdGVycGFuZWw6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRXN1Lkdsb2JhbHMuRW51bXMuRVNVS2FydG90ZWthRmllbGRUb0ZpbHRlci5OYXpldixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRXN1Lkdsb2JhbHMuRW51bXMuRVNVS2FydG90ZWthRmllbGRUb0ZpbHRlci5PYmNob2RuaUptZW5vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5FU1VLYXJ0b3Rla2FGaWVsZFRvRmlsdGVyLkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRXN1Lkdsb2JhbHMuRW51bXMuRVNVS2FydG90ZWthRmllbGRUb0ZpbHRlci5EaWMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLkVTVUthcnRvdGVrYUZpZWxkVG9GaWx0ZXIuQnVTSyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19lc3Vfcm96PXZhbHVlLml4c19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLml4c19lc3Vfcm96LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwNzBcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5Fc3UuUHJlZmFicy52eWJlckVzdSh7IC8vUkMgMzU4MDAwNzAgOiBLbyBWeWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cDogR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLlR5cFpvYnJhemVuaUthcm90ZWthLlNlbGVjdEVzdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vZE90ZXZyZW5pOiBHb3JkaWMuR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ292YW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiB0aGlzLnNldFN4c0RldGFpbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS5uZXVyY2VuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogXCJqcmVzOjM1ODAwMDQ0XCIsIC8vUkMgMzU4MDAwNDQgOiBaYWTvv71u77+9IHXvv71pdmF0ZWxlIGRvIEFET1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZpZWxkc1RvRmlsdGVycGFuZWw6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRXN1Lkdsb2JhbHMuRW51bXMuRVNVS2FydG90ZWthRmllbGRUb0ZpbHRlci5OYXpldixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRXN1Lkdsb2JhbHMuRW51bXMuRVNVS2FydG90ZWthRmllbGRUb0ZpbHRlci5PYmNob2RuaUptZW5vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5FU1VLYXJ0b3Rla2FGaWVsZFRvRmlsdGVyLkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRXN1Lkdsb2JhbHMuRW51bXMuRVNVS2FydG90ZWthRmllbGRUb0ZpbHRlci5EaWMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLkVTVUthcnRvdGVrYUZpZWxkVG9GaWx0ZXIuQnVTSyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19lc3VfdnlrPXZhbHVlLml4c19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLml4c19lc3VfdnlrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwNzFcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIHsgLy9SQyAzNTgwMDA3MSA6IEtvbmYuIENGUy9BQkZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLmNmc19vcmdudW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIixcInctNlwiICx7IC8vUkMgMzU4MDAwNTggOiBLb25mLiBBQkZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLmFiZl9vcmdudW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozNTgwMDA2N1wiKSAvL1JDIDM1ODAwMDY3IDogUGFyYW1ldHJ5IHBybyBzb3Vib3IgKi5PUkdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDcyXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcihHb3JkaWMuQWRvLkludGVyZmFjZS5HRWtvc3JhckR0b1R5cGVMZW5ndGhzLmljb19naW5pcyksIHsgLy9SQyAzNTgwMDA3MiA6IEnvv71PIC0gQEdJXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5pY29fZ2luaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR0Vrb3NyYXJEdG9UeXBlTGVuZ3Rocy5pY29fZ2luaXMsIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDA3NFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuRmllbGQuY2hhckNvdW50ZXIoR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvVHlwZUxlbmd0aHMubmtzX2dpbmlzKSAseyAvL1JDIDM1ODAwMDc0IDogTktTIC0gQEdOXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5ua3NfZ2luaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR0Vrb3NyYXJEdG9UeXBlTGVuZ3Rocy5ua3NfZ2luaXMsIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwNzNcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkZpZWxkLmNoYXJDb3VudGVyKEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b1R5cGVMZW5ndGhzLnVjc19naW5pcykgLHsgLy9SQyAzNTgwMDA3MyA6IFXvv71TIC0gQEdVXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy51Y3NfZ2luaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR0Vrb3NyYXJEdG9UeXBlTGVuZ3Rocy51Y3NfZ2luaXMsIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwNzVcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkZpZWxkLmNoYXJDb3VudGVyKEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b1R5cGVMZW5ndGhzLnpyaXpvdmF0ZWwpICwgeyAvL1JDIDM1ODAwMDc1IDogWu+/vWl6b3ZhdGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy56cml6b3ZhdGVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdFa29zcmFyRHRvVHlwZUxlbmd0aHMuenJpem92YXRlbCwgc3RvcHBpbmc6IHRydWUgfSldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDc2XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcihHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9UeXBlTGVuZ3Rocy5wcmF2X2Zvcm1hKSwgeyAvL1JDIDM1ODAwMDc2IDogUHLvv712bu+/vSBmb3JtYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMucHJhdl9mb3JtYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiBHb3JkaWMuQWRvLkludGVyZmFjZS5HRWtvc3JhckR0b1R5cGVMZW5ndGhzLnByYXZfZm9ybWEsIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwNzdcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkZpZWxkLmNoYXJDb3VudGVyKEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b1R5cGVMZW5ndGhzLnN0YXRfemFzdHVwY2UpLCB7IC8vUkMgMzU4MDAwNzcgOiBTdO+/vXRu77+9IHrvv71zdHVwY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnN0YXRfemFzdHVwY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR0Vrb3NyYXJEdG9UeXBlTGVuZ3Rocy5zdGF0X3phc3R1cGNlLCBzdG9wcGluZzogdHJ1ZSB9KV1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDc4XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcihHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9UeXBlTGVuZ3Rocy5vcmdfd3d3KSAsIHsgLy9SQyAzNTgwMDA3OCA6IFdXVyBvcmcuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5vcmdfd3d3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdFa29zcmFyRHRvVHlwZUxlbmd0aHMub3JnX3d3dywgc3RvcHBpbmc6IHRydWUgfSldXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUm96c2lyZW55UHJvZmlsRm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGFiKS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybVJvenNpcmVueVByb2ZpbCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBjcmVhdGVSb3pzaXJlbnlQcm9maWxBcmlzKCk6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5UYWJQYXJhbXNJZCB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJ0YWItcm96c2lyZW55LXByb2ZpbC1hcmlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozNTgwMDA4MFwiLCAvL1JDIDM1ODAwMDgwIDogUm9677+977+977+9ZW7vv70gcHJvZmlsIC0gQVJJU1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiX3RhYi1yb3pzaXJlbnktcHJvZmlsLWFyaXNcIiB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaW5pdDogKHRhYjogSlF1ZXJ5PEhUTUxFbGVtZW50PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb3JtUm96c2lyZW55QXJpcyA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybVJvenNpcmVueUFyaXMuYWRkU2VjdGlvbihcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDA4MVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuRmllbGQuY2hhckNvdW50ZXIoR29yZGljLkFkby5JbnRlcmZhY2UuR0Vrb3NyYXJEdG9UeXBlTGVuZ3Rocy5uYW9wKSAseyAgLy9SQyAzNTgwMDA4MSA6IE7vv716ZXYgQVJJU1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMubmFvcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiBHb3JkaWMuQWRvLkludGVyZmFjZS5HRWtvc3JhckR0b1R5cGVMZW5ndGhzLm5hb3AsIHN0b3BwaW5nOiB0cnVlIH0pLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoe3N0b3BwaW5nOiB0cnVlfSldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDA4MlwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuRmllbGQuY2hhckNvdW50ZXIoR29yZGljLkFkby5JbnRlcmZhY2UuR0Vrb3NyYXJEdG9UeXBlTGVuZ3Rocy5rb3ApLCB7ICAvL1JDIDM1ODAwMDgyIDogUm96cG/vv710b3bvv70gc2tsYWRiYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMua29wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdFa29zcmFyRHRvVHlwZUxlbmd0aHMua29wLCBzdG9wcGluZzogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDgzXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcihHb3JkaWMuQWRvLkludGVyZmFjZS5HRWtvc3JhckR0b1R5cGVMZW5ndGhzLnprbyksIHsgIC8vUkMgMzU4MDAwODMgOiDvv73vv71zbG8gb2tyZXN1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy56a28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR0Vrb3NyYXJEdG9UeXBlTGVuZ3Rocy56a28sIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwODRcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5hZG9HaW5jZHVyKCksIHsgIC8vUkMgMzU4MDAwODQgOiBEcnVoIO+/ve+/vWFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuZHVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7IHN0b3BwaW5nOiB0cnVlIH0pXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmR1cj12YWx1ZS5kdXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwODVcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkZpZWxkLmNoYXJDb3VudGVyKEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdFa29zcmFyRHRvVHlwZUxlbmd0aHMuem9kKSwgeyAgLy9SQyAzNTgwMDA4NSA6IFpw77+9c29iIG9kbe+/ve+/vW9277+9bu+/vVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuem9kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdFa29zcmFyRHRvVHlwZUxlbmd0aHMuem9kLCBzdG9wcGluZzogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDg2XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7ICAvL1JDIDM1ODAwMDg2IDogRHJ1aCDvv73vv716ZW7vv71cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLmRyaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFt7IGRyaTogXCIxXCIsIGRyaV90eHQ6IFwianJlczozNTgwMDA4N1wiIH0sIHsgZHJpOiBcIjJcIiwgZHJpX3R4dDogXCJqcmVzOjM1ODAwMDg4XCIgfV0sIHsga2V5OiBcImRyaVwiIH0pLCAvL1JDIDM1ODAwMDg4IDogUmVnaW9u77+9bG7vv71cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCI8Yj57ZHJpfTwvYj4gLSB7ZHJpX3R4dH1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmRyaT12YWx1ZS5kcmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcImRyaV90eHRcIiwgXCJkcmlcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNJbnB1dDogXCJvbmlucHV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiB7IGRyaTogXCIgXCIsIGRyaV90eHQ6IFwiXCIgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDg5XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7ICAvL1JDIDM1ODAwMDg5IDogWnDvv71zb2Ig77+977+9ZXRu77+9IGV2aWRlbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy56dWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbeyB6dWU6IFwiMVwiLCB6dWVfdHh0OiBcImpyZXM6MzU4MDAwOTBcIiB9LCB7IHp1ZTogXCIyXCIsIHp1ZV90eHQ6IFwianJlczozNTgwMDA5MVwiIH1dLCB7IGtleTogXCJ6dWVcIiB9KSwgLy9SQyAzNTgwMDA5MSA6IFBvZHZvam7vv71cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCI8Yj57enVlfTwvYj4gLSB7enVlX3R4dH1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnp1ZT12YWx1ZS56dWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcInp1ZV90eHRcIiwgXCJ6dWVcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNJbnB1dDogXCJvbmlucHV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiB7IHp1ZTogXCIgXCIsIHp1ZV90eHQ6IFwiXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwOTJcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkZpZWxkLmNoYXJDb3VudGVyKEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdFa29zcmFyRHRvVHlwZUxlbmd0aHMubmF6MSksIHsgIC8vUkMgMzU4MDAwOTIgOiAxLiDvv73vv71kZWsgbu+/vXp2dSBwcm8gY2VudHLvv71sbu+/vSByZWdpc3RyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5uYXoxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdFa29zcmFyRHRvVHlwZUxlbmd0aHMubmF6MSwgc3RvcHBpbmc6IHRydWUgfSldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDA5M1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuRmllbGQuY2hhckNvdW50ZXIoR29yZGljLkFkby5JbnRlcmZhY2UuR0Vrb3NyYXJEdG9UeXBlTGVuZ3Rocy5uYXoyKSwgeyAgLy9SQyAzNTgwMDA5MyA6IDIuIO+/ve+/vWRlayBu77+9enZ1IHBybyBjZW50cu+/vWxu77+9IHJlZ2lzdHJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLm5hejIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR0Vrb3NyYXJEdG9UeXBlTGVuZ3Rocy5uYXoyLCBzdG9wcGluZzogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDk0XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcihHb3JkaWMuQWRvLkludGVyZmFjZS5HRWtvc3JhckR0b1R5cGVMZW5ndGhzLm5hejMpLCB7ICAvL1JDIDM1ODAwMDk0IDogMy4g77+977+9ZGVrIG7vv716dnUgcHJvIGNlbnRy77+9bG7vv70gcmVnaXN0clxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMubmF6MyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiBHb3JkaWMuQWRvLkludGVyZmFjZS5HRWtvc3JhckR0b1R5cGVMZW5ndGhzLm5hejMsIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAwOTVcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkZpZWxkLmNoYXJDb3VudGVyKEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdFa29zcmFyRHRvVHlwZUxlbmd0aHMucml6MiksIHsgIC8vUkMgMzU4MDAwOTUgOiBJ77+9TyBsaW5pb3bvv70gbmFk77+977+9emVu77+9IG9yZ2FuaXphY2UgMi4gc3R1cGXvv71cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnJpejIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR0Vrb3NyYXJEdG9UeXBlTGVuZ3Rocy5yaXoyLCBzdG9wcGluZzogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMDk2XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcihHb3JkaWMuQWRvLkludGVyZmFjZS5HRWtvc3JhckR0b1R5cGVMZW5ndGhzLnJpejMpLCB7ICAvL1JDIDM1ODAwMDk2IDogSe+/vU8gbGluaW9277+9IG5hZO+/ve+/vXplbu+/vSBvcmdhbml6YWNlIDMuIHN0dXBl77+9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5yaXozLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdFa29zcmFyRHRvVHlwZUxlbmd0aHMucml6Mywgc3RvcHBpbmc6IHRydWUgfSldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDA5N1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuRmllbGQuY2hhckNvdW50ZXIoR29yZGljLkFkby5JbnRlcmZhY2UuR0Vrb3NyYXJEdG9UeXBlTGVuZ3Rocy5rYXBpdG9sYSksIHsgIC8vUkMgMzU4MDAwOTcgOiBLYXBpdG9sYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMua2FwaXRvbGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR0Vrb3NyYXJEdG9UeXBlTGVuZ3Rocy5rYXBpdG9sYSwgc3RvcHBpbmc6IHRydWUgfSldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDA5OFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyAgLy9SQyAzNTgwMDA5OCA6IEhvc3BvZO+/ve+/vXNr77+9IO+/vWlubm9zdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuaG9jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW3sgaG9jOiBcIjFcIiwgaG9jX3R4dDogXCJqcmVzOjM1ODAwMjExXCIgfSwgeyBob2M6IFwiMlwiLCBob2NfdHh0OiBcImpyZXM6MzU4MDAyMTJcIiB9XSwgeyBrZXk6IFwiaG9jXCIgfSksIC8vUkMgMzU4MDAyMTIgOiBt77+9IEhPQ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIjxiPntob2N9PC9iPiAtIHtob2NfdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaG9jPXZhbHVlLmhvY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyQ29sdW1uczogW1wiaG9jX3R4dFwiLCBcImhvY1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY0lucHV0OiBcIm9uaW5wdXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IHsgaG9jOiBcIiBcIiwgaG9jX3R4dDogXCJcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAxMTBcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5nTnV0c1JlYWRlcigpLCB7ICAvL1JDIDM1ODAwMTEwIDogTlVUU1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwubnV0cz12YWx1ZS5udXRzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5udXRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogeyBudXRzOiBcIiBcIiwgbnV0c190eHQ6IFwiXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAxMDFcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkZpZWxkLmNoYXJDb3VudGVyKEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdFa29zcmFyRHRvVHlwZUxlbmd0aHMuc3RzKSwgeyAgLy9SQyAzNTgwMDEwMSA6IFNUU1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuc3RzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdFa29zcmFyRHRvVHlwZUxlbmd0aHMuc3RzLCBzdG9wcGluZzogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMTA0XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLFwidy02XCIgLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcihHb3JkaWMuQWRvLkludGVyZmFjZS5HRWtvc3JhckR0b1R5cGVMZW5ndGhzLmNmdSksIHsgIC8vUkMgMzU4MDAxMDQgOiDvv73vv71zbG8gRu+/vSAvIHpkcm9qIGYuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5jZnUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR0Vrb3NyYXJEdG9UeXBlTGVuZ3Rocy5jZnUsIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiICwgR29yZGljLlByZWZhYnMuRmllbGQuY2hhckNvdW50ZXIoR29yZGljLkFkby5JbnRlcmZhY2UuR0Vrb3NyYXJEdG9UeXBlTGVuZ3Rocy56Zm8pLCB7ICAvL1JDIDM1ODAwMTAzIDogWmRyb2ogRi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnpmbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiBHb3JkaWMuQWRvLkludGVyZmFjZS5HRWtvc3JhckR0b1R5cGVMZW5ndGhzLnpmbywgc3RvcHBpbmc6IHRydWUgfSldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDEwNVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyAgLy9SQyAzNTgwMDEwNSA6IFR5cCBzcHIuIEFSSVNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnRzcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFt7IHRzcjogXCIxXCIsIHRzcl90eHQ6IFwianJlczozNTgwMDIxM1wiIH0sIHsgdHNyOiBcIjJcIiwgdHNyX3R4dDogXCJqcmVzOjM1ODAwMjE0XCIgfSwgeyB0c3I6IFwiM1wiLCB0c3JfdHh0OiBcImpyZXM6MzU4MDAyMTVcIiB9LCB7IHRzcjogXCI0XCIsIHRzcl90eHQ6IFwianJlczozNTgwMDIxNlwiIH1dLCB7a2V5OiBcInRzclwifSksIC8vUkMgMzU4MDAyMTYgOiBrcmFqc2vvv70g77+977+9YWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCI8Yj57dHNyfTwvYj4gLSB7dHNyX3R4dH1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnRzcj12YWx1ZS50c3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcInRzcl90eHRcIiwgXCJ0c3JcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNJbnB1dDogXCJvbmlucHV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiB7IHRzcjogXCIgXCIsIHRzcl90eHQ6IFwiXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJvenNpcmVueVByb2ZpbEFyaXNGb3JtID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0YWIpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtUm96c2lyZW55QXJpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NyZWF0ZVNlem5hbU1haWxDZXJ0T3JnYW5pemFjZVRhYigpOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuVGFiUGFyYW1zSWQge1xyXG4gICAgICAgIC8vICAgIHJldHVybiB7XHJcbiAgICAgICAgLy8gICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgaWQ6IFwidGFiLVNlem5hbU1haWxDZXJ0T3JnYW5pemFjZVwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgdGl0bGU6IFwianJlczozNTgwMDExOFwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgbG9ja2VkOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiX3RhYi1TZXpuYW1NYWlsQ2VydE9yZ2FuaXphY2VcIiB9XHJcbiAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgLy8gICAgICAgIGNvbnRlbnRQYXJhbXM6IHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGNsYXNzTmFtZTogXCJHb3JkaWMuQWRvLldlYkNvbnRyb2xzLkdTZXpuYW1NYWlsQ2VydE9yZ2FuaXphY2VcIixcclxuICAgICAgICAvLyAgICAgICAgICAgIHNlcnZlclBhcmFtczoge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIElEOiBcIlNlem5hbUFkb01haWxDZXJ0T3JnYW5pemFjZVwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGl4czogdGhpcy5kYXRhLml4c19yYXIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGFiT3BlbjogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgY3JlYXRlU2V6bmFtTWV0b2RpY2t5VGFiKCk6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5UYWJQYXJhbXNJZCB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJ0YWItU2V6bmFtTWV0b2RpY2t5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozNTgwMDEyM1wiLCAvL1JDIDM1ODAwMTIzIDogTWV0b2Rp77+9a3lcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcIl90YWItU2V6bmFtQWRvTWV0b2RpY2t5XCIgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiR29yZGljLkFkby5XZWJDb250cm9scy5HU2V6bmFtTWV0b2RpY2t5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIlNlem5hbUFkb01ldG9kaWNreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfcmFyOiB0aGlzLmRhdGEuaXhzX3JhcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiT3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY3JlYXRlU2V6bmFtTWV0b2RpY2t5SGlzdG9yeVRhYigpOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuVGFiUGFyYW1zSWQge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGFiLVNlem5hbU1ldG9kaWNreUhpc3RvcnlcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjM1ODAwMTgwXCIsIC8vUkMgMzU4MDAxMjMgOiBNZXRvZGnvv71reVxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiX3RhYi1TZXpuYW1BZG9NZXRvZGlja3lIaXN0b3J5XCIgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiR29yZGljLkFkby5XZWJDb250cm9scy5HU2V6bmFtTWV0b2RpY2t5SGlzdG9yeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRDogXCJTZXpuYW1BZG9NZXRvZGlja3lIaXN0b3J5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4c19yYXI6IHRoaXMuZGF0YS5peHNfcmFyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJPcGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjcmVhdGVSb3pzaXJlbnlQcm9maWxHcm91cCgpOiBJR1RhYkdyb3VwT3B0aW9ucyB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJfdGFiLXJvenNpcmVueS1wcm9maWxcIiwgY2FwdGlvbjogXCJqcmVzOjM1ODAwMDM2XCIgLy9SQyAzNTgwMDAzNiA6IFJveu+/ve+/ve+/vWVu77+9IHByb2ZpbFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICBjcmVhdGVSb3pzaXJlbnlQcm9maWxBcmlzR3JvdXAoKTogSUdUYWJHcm91cE9wdGlvbnMge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiX3RhYi1yb3pzaXJlbnktcHJvZmlsLWFyaXNcIiwgY2FwdGlvbjogXCJqcmVzOjM1ODAwMDgwXCIgLy9SQyAzNTgwMDA4MCA6IFJveu+/ve+/ve+/vWVu77+9IHByb2ZpbCAtIEFSSVNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjcmVhdGVTZXpuYW1NYWlsQ2VydE9yZ2FuaXphY2VHcm91cCgpOiBJR1RhYkdyb3VwT3B0aW9ucyB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJfdGFiLVNlem5hbU1haWxDZXJ0T3JnYW5pemFjZVwiLCBjYXB0aW9uOiBcImpyZXM6MzU4MDAxMThcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNyZWF0ZVNlem5hbU1ldG9kaWNreUdyb3VwKCk6IElHVGFiR3JvdXBPcHRpb25zIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcIl90YWItU2V6bmFtQWRvTWV0b2RpY2t5XCIsIGNhcHRpb246IFwianJlczozNTgwMDEyNFwiIC8vUkMgMzU4MDAxMjQgOiBNZXRvZGnvv71reVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNyZWF0ZVNlem5hbU1ldG9kaWNreUhpc3RvcnlHcm91cCgpOiBJR1RhYkdyb3VwT3B0aW9ucyB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJfdGFiLVNlem5hbUFkb01ldG9kaWNreUhpc3RvcnlcIiwgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTgwXCIgLy9SQyAzNTgwMDE4MCA6IE1ldG9kae+/vWt5IC0gaGlzdG9yaWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBvcGVuU2V6bmFtTWFpbENlcnRPcmdhbml6YWNlKCkge1xyXG4gICAgICAgIC8vICAgIHRoaXMuY250Lm5hdmlnYXRlKFxyXG4gICAgICAgIC8vICAgICAgICBcIkdvcmRpYy5BZG8uV2ViQ29udHJvbHMuR1Nlem5hbU1haWxDZXJ0T3JnYW5pemFjZVwiLFxyXG4gICAgICAgIC8vICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpeHM6IHRoaXMuZGF0YS5peHNfcmFyLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgSUQ6IFwiU2V6bmFtQWRvTWFpbENlcnRPcmdhbml6YWNlXCIsXHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy99XHJcbiAgICB9XHJcbn0iLCIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkby5XZWJDb250cm9scy5HRGV0YWlsTWV0b2RpY2t5LnRzICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgc3N1bGEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAg77+9IEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTExLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkFkby5XZWJDb250cm9scyB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxadWplIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBwcml2YXRlIGRhdGFMaXN0RGVzY3JpcHRpb246IEdvcmRpYy5HZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdEYXRhTGlzdERlc2NyaXB0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgZGF0YTogR29yZGljLkFkby5JbnRlcmZhY2UuR1p1amVEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBuZXdSZWNvcmQ6IGJvb2xlYW47XHJcbiAgICAgICAgcHJpdmF0ZSBkZXRhaWxPYmo6IEdEZXRhaWxadWplT2JqICYgR0NvbnRlbnQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3VycmVudEZpbHRlcjogYW55O1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZFJjOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkM8YW55PjtcclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVByZXZpb3VzQW5kTmV4dEFjdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVySW5pdChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kZXRhaWxPYmogPSBHb3JkaWMuVXRpbHMuZXh0ZW5kV2l0aFByb3RvTWV0aG9kcyh0aGlzLCBuZXcgR0RldGFpbFp1amVPYmooKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsT2JqLmNyZWF0ZUJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgY29udGVudE5hbWU6IFwiZGV0YWlsQWRvWnVqZVwiLFxyXG4gICAgICAgICAgICAgICAgY29udGVudENhcHRpb246IFwianJlczozNTgwMDIwOVwiLFxyXG4gICAgICAgICAgICAgICAgbmV3UmVjb3JkOiB0aGlzLm5ld1JlY29yZCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcclxuICAgICAgICAgICAgICAgIGRhdGFMaXN0RGVzY3JpcHRpb246IHRoaXMuZGF0YUxpc3REZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIGFkZFBsYXRub3N0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGFkZEFrdGl2aXRhOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRGaWx0ZXI6IHRoaXMuY3VycmVudEZpbHRlcixcclxuICAgICAgICAgICAgICAgIGdyaWRSYzogdGhpcy5ncmlkUmMsXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQcmV2aW91c0FuZE5leHRBY3Rpb246IHRoaXMuY3JlYXRlUHJldmlvdXNBbmROZXh0QWN0aW9uLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHRhYnM6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5UYWJQYXJhbXNJZFtdIHwgT2JqZWN0TGl0ZXJhbDxHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuVGFiUGFyYW1zPiB8IG51bGwgPSBbXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubmV3UmVjb3JkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0YWJzLnB1c2godGhpcy5kZXRhaWxPYmouZ2V0QXVkaXRQcmlzdHVwdVRhYigpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZ3JvdXBzOiBJR1RhYkdyb3VwT3B0aW9uc1tdID0gW107XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5ld1JlY29yZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgZ3JvdXBzLnB1c2godGhpcy5kZXRhaWxPYmouZ2V0QXVkaXRQcmlzdHVwdUdyb3VwKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1aWxkZXIud2l0aENvbXBvbmVudDx0aGlzPihcIkRldGFpbEFkb1p1amVcIiwge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzQmFyOiB0aGlzLmRldGFpbE9iai5jcmVhdGVTdGF0dXNCYXIoKSxcclxuICAgICAgICAgICAgICAgIG1lbnVCYXI6IHRoaXMuZGV0YWlsT2JqLmNyZWF0ZU1lbnVCYXIoKSxcclxuICAgICAgICAgICAgICAgIGhlYWRlckZvcm06IHRoaXMuZGV0YWlsT2JqLmNyZWF0ZUZvcm1Db21wbGV0KCksXHJcbiAgICAgICAgICAgICAgICBjb21tYW5kQmFyOiB0aGlzLmRldGFpbE9iai5jcmVhdGVDb21tYW5kQmFyKCksXHJcbiAgICAgICAgICAgICAgICBzaWRlUGFuZWxzOiBbdGhpcy5kZXRhaWxPYmouZ2V0UG96bmFta3koKV0sXHJcbiAgICAgICAgICAgICAgICB0YWJzOiB0YWJzLFxyXG4gICAgICAgICAgICAgICAgdGFiR3JvdXBzOiBncm91cHMsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5kZXRhaWxPYmouZmluaXNoQnVpbGRlcigpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbG9zaW5nKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXRhaWxPYmouY2xvc2VBY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsWnVqZU9iaiBleHRlbmRzIEdvcmRpYy5BZHguV2ViQ29udHJvbHMuR0FkeERldGFpbEJhc2U8R29yZGljLkFkby5JbnRlcmZhY2UuR1p1amVEdG8+IHtcclxuICAgICAgICBjcmVhdGUoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGV4dFBvcGlzKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuZGF0YS5uYXpldn1gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTeHNEZXRhaWwoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuZGF0YS56dWplfWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzYXZlRGF0YShkYXRhOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvTWV0b2RpY2t5RHRvLCBjbG9zZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbnQuaXNsLkFkb1p1amVTZXJ2aWNlLnVwc2VydCh7IGRhdGE6IGRhdGEgfSkuZ2V0KCkudGhlbigob3V0cHV0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZ0FjdGlvbihcImFjdFNhdmVcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IG91dHB1dC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHcmlkQmFzZSgpLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5EYXRhLnJlYWRlckNhY2hlLmNsZWFyQ2FjaGUoXCJHb3JkaWMuQWRvLkNsaWVudC5HUmVhZGVyQWRvRWtvc3p1alwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTdWNjZXNzU2F2ZShjbG9zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3NlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUFjdGlvbih0cnVlKS5kb25lKCgpID0+IHsgdGhpcy5jbnQuY2xvc2UoKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWREYXRhQmFzZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZ0FjdGlvbihcImFjdFNhdmVcIiwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVsb2FkRGF0YShmaWx0ZXJPYmo6IGFueSwgZGF0YU9iajogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkRldGFpbE9yTW9kYWxXaW5kb3coXCJHb3JkaWMuQWRvLldlYkNvbnRyb2xzLkdEZXRhaWxadWplXCIsIGZpbHRlck9iaiwgZGF0YU9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVHcmlkKGZpbHRlcjogYW55LCBncmlkOiBhbnkpOiBhbnkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbnQuaXNsLkFkb1p1amVTZXJ2aWNlLmxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyczogZmlsdGVyXHJcbiAgICAgICAgICAgIH0pLmdldFZpZXcoKS5wcm9taXNlKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZVRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubmV3UmVjb3JkID09IHRydWUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjM1ODAwMDEyXCI7IC8vUkMgMzU4MDAwMTIgOiBOb3bvv70geu+/vXpuYW1cclxuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMub3B0aW9ucy5jb250ZW50Q2FwdGlvbn0gLSAke3RoaXMudGV4dFBvcGlzKCl9YFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlTWVudUJhcigpOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJNZW51SXRlbURlZiB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBcImFjdEVkaXQqXCIsXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5jbnQuYWN0aW9ucy5hY3RTYXZlLCBmYXZvcml0ZTogdHJ1ZSwgYWN0aW9uQ29udGV4dDogeyBjbG9zZTogZmFsc2UgfSB9LFxyXG4gICAgICAgICAgICAgICAgXCJhY3RDYW5jZWxFZGl0KlwiLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTaGFyZUFjdGlvbnMoKSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmNudC5hY3Rpb25zLmFjdFByZXZpb3VzLCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuY250LmFjdGlvbnMuYWN0TmV4dCwgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm9wcG9zaXRlXCIgfVxyXG4gICAgICAgICAgICBdXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQ29tbWFuZEJhcigpOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJNZW51SXRlbURlZiB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICB7IGNhcHRpb246IFwianJlczozNTgwMDAxMFwiLCBhY3Rpb246IHRoaXMuY250LmFjdGlvbnMuYWN0U2F2ZSwgY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIiwgZmF2b3JpdGU6IHRydWUsIGFjdGlvbkNvbnRleHQ6IHsgY2xvc2U6IHRydWUgfSB9LCAvL1JDIDM1ODAwMDEwIDogVWxv77+9aXQgYSB6YXbvv73vv710XHJcbiAgICAgICAgICAgICAgICBcImFjdENsb3NlKlwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUFjdGlvbnMoKTogeyBbYWtjZU5hbWU6IHN0cmluZ106IEdBY3Rpb24gfCBHQWN0aW9uUGFyYW1zRGVmT2JqIH0gfCBudWxsIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEVkaXRNb2RlKGVkaXRNb2RlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250LmFjdGlvbnMuYWN0T3BlblNzbERlbmlrPy51cGRhdGUoeyBlbmFibGVkOiBlZGl0TW9kZSA9PSBmYWxzZSB9KVxyXG4gICAgICAgICAgICB2YXIgZmllbGRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgICAgICBmaWVsZHMucHVzaCggLy9W77+9RFlDS1kgRURJVE9WQVRFTE7vv71cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdadWplRHRvTmFtZXMubmF6ZXZcclxuXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubmV3UmVjb3JkKSB7ICAvLyBFRElUT1ZBVEVMTu+/vSBQT1VaRSBQT0tVRCA9PSBORVcgWu+/vVpOQU1cclxuICAgICAgICAgICAgICAgIGZpZWxkcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdadWplRHRvTmFtZXMuenVqZVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgeyAvLyBFRElUT1ZBVEVMTu+/vSBQT1VaRSBQT0tVRCAhPSBORVcgWu+/vVpOQU1cclxuICAgICAgICAgICAgICAgIGZpZWxkcy5wdXNoKFxyXG5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNudC5maW5kRmllbGRzKGZpZWxkcy5qb2luKFwiLFwiKSkuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybS5mb3JtLmxheW91dERlc2NyaXB0b3IgPSBcIkwyTTJTMVwiXHJcbiAgICAgICAgICAgIHRoaXMuZm9ybS5hZGRTZWN0aW9uKFwiXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDIxMFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuRmllbGQuY2hhckNvdW50ZXIoR29yZGljLkFkby5JbnRlcmZhY2UuR1p1amVEdG9UeXBlTGVuZ3Rocy56dWplKSwgeyAvL1JDIDM1ODAwMjEwIDogWlVKXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR1p1amVEdG9OYW1lcy56dWplLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHsgc3RvcHBpbmc6IHRydWUgfSksIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdadWplRHRvVHlwZUxlbmd0aHMuenVqZSwgc3RvcHBpbmc6IHRydWUgfSldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMjAxXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcihHb3JkaWMuQWRvLkludGVyZmFjZS5HWnVqZUR0b1R5cGVMZW5ndGhzLm5hemV2KSwgeyAvL1JDIDM1ODAwMjAxIDogTu+/vXpldlxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdadWplRHRvTmFtZXMubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoeyBzdG9wcGluZzogdHJ1ZSB9KSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogR29yZGljLkFkby5JbnRlcmZhY2UuR1p1amVEdG9UeXBlTGVuZ3Rocy5uYXpldiwgc3RvcHBpbmc6IHRydWUgfSldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5BZG8uV2ViQ29udHJvbHMge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1NYWlsQ2VydE9yZ2FuaXphY2VPYmogZXh0ZW5kcyBHb3JkaWMuQWR4LldlYkNvbnRyb2xzLkdBZHhTZXpuYW1CYXNlIHtcclxuICAgICAgICBpeHM6IHN0cmluZztcclxuICAgICAgICBzZWxlY3Rpb25HcmlkQWN0KG9iajogSUdHcmlkU2VsZWN0aW9uPGFueT4pOiB2b2lkIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZSgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcGVuRGV0YWlsKGRhdGE6IGFueSwgaXNOZXc6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEdFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQWN0aW9ucygpOiB7IFtha2NlTmFtZTogc3RyaW5nXTogR0FjdGlvbiB8IEdBY3Rpb25QYXJhbXNEZWZPYmogfSB8IG51bGwge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQmFzZU1lbnVCYXJBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNudC5tZW51QmFyKHRoaXMuY250LmFjdGlvbnMuY3JlYXRlQmFyKFtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBdKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbnRleHRNZW51KCk6IE1lbnVQYXJhbXNbXSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNudC5hY3Rpb25zLmNyZWF0ZUJhcihbXHJcbiAgICAgICAgICAgICAgICBcImFjdE9wZW5EZXRhaWwqXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdE9wZW5EZXRhaWxPbk5ld1RhYlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3RPcGVuRGlhbG9nVnliZXJvdmFTa3VwaW5hKlwiLFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlRmlsdGVyRm9ybSgpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJGb3JtLmFkZFJvdyhcImpyZXM6MzU4MDAxMTlcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5hZG9Fa29zcmFyKCksIHsgLy9SQyAzNTgwMDExOSA6IE9yZ2FuaXphY2VcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfcmFyPXZhbHVlLml4c19yYXJcIixcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLml4cyA/IHRydWUgOiBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHVzZXJoYXJkRGVmYXVsdEZpbHRlcihoYXJkRmlsdGVyOiBhbnkpOiBhbnkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5peHMpXHJcbiAgICAgICAgICAgICAgICBoYXJkRmlsdGVyW1wiaXhzX3JhclwiXSA9IHRoaXMuaXhzO1xyXG4gICAgICAgICAgICByZXR1cm4gaGFyZEZpbHRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbGxlY3REYXRhKGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5peHMpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbXCJpeHNfcmFyXCJdID0gdGhpcy5peHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZ2V0RGF0YUNvdW50KCk6IEpRdWVyeVByb21pc2U8R29yZGljLkFkeC5JbnRlcmZhY2UuR0FkeENvdW50RGF0YT4gfCBudWxsIHtcclxuICAgICAgICAvLyAgICByZXR1cm4gdGhpcy5jbnQuaXNsLkFkb1JlZ2lzdHJPcmdhbml6YWNpLmdldERhdGFDb3VudCh7IGZpbHRlcnM6IHRoaXMuZmlsdGVyRGF0YSB9KS5nZXREYXRhKClcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgYXBwbHlkYXRhKGZpbHRlckRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLmNudC5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNudC5pc2wuQWRvTWFpbENlcnRPcmdhbml6YWNlLmxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyczogZmlsdGVyRGF0YVxyXG4gICAgICAgICAgICB9KS5nZXRWaWV3KCkuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGxhdG5vc3RDb2x1bW4odGhpcy52aWV3KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZC5nZ3JpZCgnc2V0RGF0YScsIHRoaXMudmlldyk7XHJcbiAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IHRoaXMuY250LmVuZE9wZXJhdGlvbigpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9zZWxlY3Rpb25HcmlkQWN0KG9iakFycjogSUdHcmlkU2VsZWN0aW9uPGFueT4pIHtcclxuICAgICAgICAvLyAgICB0aGlzLmNudC5hY3Rpb25zLmFjdE9wZW5Tc2xEZW5paz8udXBkYXRlKHsgZW5hYmxlZDogb2JqQXJyLmNvdW50ID4gMCB9KVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBnZXROYXpldihkYXRhKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke2RhdGFbXCJpeHNfcmFyXCJdfWBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldEdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9NYWlsQ2VydE9yZ2FuaXphY2VEdG9OYW1lcy5ha3Rpdml0YSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAwMDRcIiwgLy9SQyAzNTgwMDAwNCA6IEFrdGl2aXRhXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAocm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuQWR4LldlYkNvbnRyb2xzLkdBZHhHcmlkRnVuY3Rpb25zLmNyZWF0ZUFrdGl2aXRhQ2FwdGlvbkljb24ocm93W1wiYWt0aXZpdGFcIl0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvTWFpbENlcnRPcmdhbml6YWNlRHRvTmFtZXMucG9yX2Npc2xvLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDExMlwiIC8vUkMgMzU4MDAxMTIgOiBQb++/vWFk77+9XHJcbiAgICAgICAgICAgICAgICB9KS5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9NYWlsQ2VydE9yZ2FuaXphY2VEdG9OYW1lcy5pZF9vcmcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTEzXCIgLy9SQyAzNTgwMDExMyA6IElkLiBPcmdhbml6YWNlXHJcbiAgICAgICAgICAgICAgICB9KS5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9NYWlsQ2VydE9yZ2FuaXphY2VEdG9OYW1lcy50eXBfaWRfb3JnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDExNFwiLCAvL1JDIDM1ODAwMTE0IDogVHlwXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MFxyXG4gICAgICAgICAgICAgICAgfSkuYWRkRGF0ZUNvbHVtbih7ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9NYWlsQ2VydE9yZ2FuaXphY2VEdG9OYW1lcy5kYXRfem1lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTE1XCIgLy9SQyAzNTgwMDExNSA6IERhdHVtIHpt77+9bnlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9NYWlsQ2VydE9yZ2FuaXphY2VEdG9OYW1lcy56bWVudV9wcm92X3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAxMTZcIiAvL1JDIDM1ODAwMTE2IDogWm3vv71udSBwcm92ZWRsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZEdyaWRGb3JtYXRDb2x1bW5zKGdyaWRGb3JtYXQsIGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1NYWlsQ2VydE9yZ2FuaXphY2UgZXh0ZW5kcyBHQ29udGVudEJhc2U8R1Nlem5hbU1haWxDZXJ0T3JnYW5pemFjZU9iaj4ge1xyXG4gICAgICAgIHByaXZhdGUgc2V6bmFtT2JqOiBHU2V6bmFtTWFpbENlcnRPcmdhbml6YWNlT2JqICYgR0NvbnRlbnQ7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlem5hbU9iaiA9IEdvcmRpYy5VdGlscy5leHRlbmRXaXRoUHJvdG9NZXRob2RzKHRoaXMgYXMgR0NvbnRlbnQsIG5ldyBHU2V6bmFtTWFpbENlcnRPcmdhbml6YWNlT2JqKCkpO1xyXG4gICAgICAgICAgICB0aGlzLnNlem5hbU9iai5jcmVhdGVCYXNlKHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50TmFtZTogXCJTZXpuYW1NYWlsQ2VydE9yZ2FuaXphY2VOZXdcIixcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRDYXB0aW9uOiBcImpyZXM6MzU4MDAxMTdcIiwgLy9SQyAzNTgwMDExNyA6IFBvdm9sZW7vv70gbWFpbG9277+9IGFkcmVzeSBhIGNlcnRpZmlr77+9dHlcclxuICAgICAgICAgICAgICAgIGRhdGFMaXN0RGVzY3JpcHRvcjogdGhpcy5kYXRhTGlzdERlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eUxpc3Q6IHRydWVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wYXJhdG9yU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRDb21wYXJhdG9yOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie2l4c19yYXJ9XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBncmlkU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiB0aGlzLnNlem5hbU9iai5nZXRHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuc2V6bmFtT2JqLmNyZWF0ZUJhc2VNZW51QmFyQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnNlem5hbU9iai5jcmVhdGVGaWx0ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXpuYW1PYmouY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5BZG8uV2ViQ29udHJvbHMge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1NZXRvZGlja3lPYmogZXh0ZW5kcyBHb3JkaWMuQWR4LldlYkNvbnRyb2xzLkdBZHhTZXpuYW1CYXNlIHtcclxuICAgICAgICBpeHNfcmFyOiBzdHJpbmc7XHJcbiAgICAgICAgc2VsZWN0aW9uR3JpZEFjdChvYmo6IElHR3JpZFNlbGVjdGlvbjxhbnk+KTogdm9pZCB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGUoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3BlbkRldGFpbChkYXRhOiBhbnksIGlzTmV3OiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNudEluaXRpYWxpemVyID0gW1wiR29yZGljLkFkby5XZWJDb250cm9scy5HRGV0YWlsTWV0b2RpY2t5XCIsIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRGaWx0ZXI6IHRoaXMuZmlsdGVyRGF0YSxcclxuICAgICAgICAgICAgICAgIGdyaWRSYzogbmV3IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQyh0aGlzLmdyaWQpLFxyXG4gICAgICAgICAgICAgICAgb3BlbkRpYWxvZzogdGhpcy50YWJPcGVuXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0UGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgSUQ6IFwiRGV0YWlsQWRvTWV0b2RpY2t5XCIsXHJcbiAgICAgICAgICAgICAgICBuZXdSZWNvcmQ6IGlzTmV3LFxyXG4gICAgICAgICAgICAgICAgaXhzX3JhcjogaXNOZXcgPyB0aGlzLml4c19yYXIgOiBkYXRhLml4c19yYXIsXHJcbiAgICAgICAgICAgICAgICBpeHNfcmVmOiBpc05ldyA/IG51bGwgOiBkYXRhLml4c19yZWYsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vcGVuRGlhbG9nT3JNb2RhbFdpbmRvdyhjbnRJbml0aWFsaXplciwgaW5wdXRQYXJhbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQWN0aW9ucygpOiB7IFtha2NlTmFtZTogc3RyaW5nXTogR0FjdGlvbiB8IEdBY3Rpb25QYXJhbXNEZWZPYmogfSB8IG51bGwge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQmFzZU1lbnVCYXJBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNudC5tZW51QmFyKHRoaXMuY250LmFjdGlvbnMuY3JlYXRlQmFyKFtcclxuICAgICAgICAgICAgICAgIFwiYWN0T3BlbkRldGFpbCpcIixcclxuICAgICAgICAgICAgICAgIFwiYWN0TmV3RGV0YWlsKlwiLFxyXG4gICAgICAgICAgICBdKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbnRleHRNZW51KCk6IE1lbnVQYXJhbXNbXSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNudC5hY3Rpb25zLmNyZWF0ZUJhcihbXHJcbiAgICAgICAgICAgICAgICBcImFjdE9wZW5EZXRhaWwqXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdE9wZW5EZXRhaWxPbk5ld1RhYlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3RPcGVuRGlhbG9nVnliZXJvdmFTa3VwaW5hKlwiLFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlRmlsdGVyRm9ybSgpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJGb3JtLmFkZFJvdyhcImpyZXM6MzU4MDAxMTlcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zcmFyKCksIHsgLy9SQyAzNTgwMDExOSA6IE9yZ2FuaXphY2VcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3JhclwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX3Jhcj12YWx1ZS5peHNfcmFyXCIsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5peHNfcmFyID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIjxiPntpY299PC9iPiAtIHtuYXpldn1cIixcclxuICAgICAgICAgICAgICAgIGdyYXBoaWNJbnB1dDogXCJvbmlucHV0XCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB1c2VyaGFyZERlZmF1bHRGaWx0ZXIoaGFyZEZpbHRlcjogYW55KTogYW55IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXhzX3JhcilcclxuICAgICAgICAgICAgICAgIGhhcmRGaWx0ZXJbXCJpeHNfcmFyXCJdID0gdGhpcy5peHNfcmFyO1xyXG4gICAgICAgICAgICByZXR1cm4gaGFyZEZpbHRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbGxlY3REYXRhKGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5peHNfcmFyKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW1wiaXhzX3JhclwiXSA9IHRoaXMuaXhzX3JhcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9nZXREYXRhQ291bnQoKTogSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuQWR4LkludGVyZmFjZS5HQWR4Q291bnREYXRhPiB8IG51bGwge1xyXG4gICAgICAgIC8vICAgIHJldHVybiB0aGlzLmNudC5pc2wuQWRvUmVnaXN0ck9yZ2FuaXphY2kuZ2V0RGF0YUNvdW50KHsgZmlsdGVyczogdGhpcy5maWx0ZXJEYXRhIH0pLmdldERhdGEoKVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBhcHBseWRhdGEoZmlsdGVyRGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250LmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY250LmlzbC5BZG9NZXRvZGlja3kubGlzdCh7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJEYXRhXHJcbiAgICAgICAgICAgIH0pLmdldFZpZXcoKS5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQbGF0bm9zdENvbHVtbih0aGlzLnZpZXcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkLmdncmlkKCdzZXREYXRhJywgdGhpcy52aWV3KTtcclxuICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHsgdGhpcy5jbnQuZW5kT3BlcmF0aW9uKCkgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3NlbGVjdGlvbkdyaWRBY3Qob2JqQXJyOiBJR0dyaWRTZWxlY3Rpb248YW55Pikge1xyXG4gICAgICAgIC8vICAgIHRoaXMuY250LmFjdGlvbnMuYWN0T3BlblNzbERlbmlrPy51cGRhdGUoeyBlbmFibGVkOiBvYmpBcnIuY291bnQgPiAwIH0pXHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIGdldE5hemV2KGRhdGEpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7ZGF0YVtHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvTWV0b2RpY2t5RHRvTmFtZXMuaXhzX3JlZl90eHRdfWBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldEdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9NZXRvZGlja3lEdG9OYW1lcy5ha3Rpdml0YSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAwMDRcIiwgLy9SQyAzNTgwMDAwNCA6IEFrdGl2aXRhXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAocm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuQWR4LldlYkNvbnRyb2xzLkdBZHhHcmlkRnVuY3Rpb25zLmNyZWF0ZUFrdGl2aXRhQ2FwdGlvbkljb24ocm93W1wiYWt0aXZpdGFcIl0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb01ldG9kaWNreUR0b05hbWVzLml4c19yZWZfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDEzNFwiIC8vUkMgMzU4MDAxMzQgOiBNZXRvZGnvv71rYVxyXG4gICAgICAgICAgICAgICAgfSkuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvTWV0b2RpY2t5RHRvTmFtZXMub3JnbnVtLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDEzNVwiIC8vUkMgMzU4MDAxMzUgOiBPUkdOVU1cclxuICAgICAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9NZXRvZGlja3lEdG9OYW1lcy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTQyXCIgLy9SQyAzNTgwMDE0MiA6IEnvv71PIG9yZ2FuaXphY2VcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9NZXRvZGlja3lEdG9OYW1lcy5uYW9wLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDEzNlwiIC8vUkMgMzU4MDAxMzYgOiBO77+9emV2IEFSSVNcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9NZXRvZGlja3lEdG9OYW1lcy5uYXpldixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAxMzdcIiAvL1JDIDM1ODAwMTM3IDogTu+/vXpldiBHSU5JU1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb01ldG9kaWNreUR0b05hbWVzLmRhdF9vZCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAxMzhcIiAvL1JDIDM1ODAwMTM4IDogRGF0dW0gemHvv73vv710a3UgYWt0aXZpdHlcclxuICAgICAgICAgICAgICAgIH0pLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9NZXRvZGlja3lEdG9OYW1lcy5kYXRfZG8sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTM5XCIgLy9SQyAzNTgwMDEzOSA6IERhdHVtIGtvbmNlIGFrdGl2aXR5XHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvTWV0b2RpY2t5RHRvTmFtZXMub2tlYyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAxNDBcIiAvL1JDIDM1ODAwMTQwIDogT0tF77+9XHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvTWV0b2RpY2t5RHRvTmFtZXMucml6MSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAxNDFcIiAvL1JDIDM1ODAwMTQxIDogSe+/vU8gbmFk77+977+9emVu77+9IG9yZ2FuaXphY2VcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZEdyaWRGb3JtYXRDb2x1bW5zKGdyaWRGb3JtYXQsIGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtTWV0b2RpY2t5IGV4dGVuZHMgR0NvbnRlbnRCYXNlPEdTZXpuYW1NZXRvZGlja3lPYmo+IHtcclxuICAgICAgICBwcml2YXRlIHNlem5hbU9iajogR1Nlem5hbU1ldG9kaWNreU9iaiAmIEdDb250ZW50O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXpuYW1PYmogPSBHb3JkaWMuVXRpbHMuZXh0ZW5kV2l0aFByb3RvTWV0aG9kcyh0aGlzIGFzIEdDb250ZW50LCBuZXcgR1Nlem5hbU1ldG9kaWNreU9iaigpKTtcclxuICAgICAgICAgICAgdGhpcy5zZXpuYW1PYmouY3JlYXRlQmFzZSh7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgY29udGVudE5hbWU6IFwiU2V6bmFtTWV0b2RpY2t5T2JqTmV3XCIsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50Q2FwdGlvbjogXCJqcmVzOjM1ODAwMTI2XCIsIC8vUkMgMzU4MDAxMjYgOiBNZXRvZGnvv71reVxyXG4gICAgICAgICAgICAgICAgZGF0YUxpc3REZXNjcmlwdG9yOiB0aGlzLmRhdGFMaXN0RGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5TGlzdDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBhcmF0b3JTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENvbXBhcmF0b3I6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7aXhzX3Jhcn1cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGdyaWRTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IHRoaXMuc2V6bmFtT2JqLmdldEdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5zZXpuYW1PYmouY3JlYXRlQmFzZU1lbnVCYXJBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V6bmFtT2JqLmNyZWF0ZUZpbHRlcigpO1xyXG4gICAgICAgICAgICB0aGlzLnNlem5hbU9iai5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLkFkby5XZWJDb250cm9scyB7XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbU1ldG9kaWNreUhpc3RvcnlPYmogZXh0ZW5kcyBHb3JkaWMuQWR4LldlYkNvbnRyb2xzLkdBZHhTZXpuYW1CYXNlIHtcclxuICAgICAgICBpeHNfcmFyOiBzdHJpbmc7XHJcbiAgICAgICAgc2VsZWN0aW9uR3JpZEFjdChvYmo6IElHR3JpZFNlbGVjdGlvbjxhbnk+KTogdm9pZCB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGUoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3BlbkRldGFpbChkYXRhOiBhbnksIGlzTmV3OiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQWN0aW9ucygpOiB7IFtha2NlTmFtZTogc3RyaW5nXTogR0FjdGlvbiB8IEdBY3Rpb25QYXJhbXNEZWZPYmogfSB8IG51bGwge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQmFzZU1lbnVCYXJBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbnRleHRNZW51KCk6IE1lbnVQYXJhbXNbXSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNudC5hY3Rpb25zLmNyZWF0ZUJhcihbXHJcbiAgICAgICAgICAgICAgICBcImFjdE9wZW5EaWFsb2dWeWJlcm92YVNrdXBpbmEqXCIsXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVGaWx0ZXJGb3JtKCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0uYWRkUm93KFwianJlczozNTgwMDExOVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3NyYXIoKSwgeyAvL1JDIDM1ODAwMTE5IDogT3JnYW5pemFjZVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfcmFyXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfcmFyPXZhbHVlLml4c19yYXJcIixcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLml4c19yYXIgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwiPGI+e2ljb308L2I+IC0ge25hemV2fVwiLFxyXG4gICAgICAgICAgICAgICAgZ3JhcGhpY0lucHV0OiBcIm9uaW5wdXRcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHVzZXJoYXJkRGVmYXVsdEZpbHRlcihoYXJkRmlsdGVyOiBhbnkpOiBhbnkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5peHNfcmFyKVxyXG4gICAgICAgICAgICAgICAgaGFyZEZpbHRlcltcIml4c19yYXJcIl0gPSB0aGlzLml4c19yYXI7XHJcbiAgICAgICAgICAgIHJldHVybiBoYXJkRmlsdGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29sbGVjdERhdGEoZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLml4c19yYXIpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbXCJpeHNfcmFyXCJdID0gdGhpcy5peHNfcmFyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2dldERhdGFDb3VudCgpOiBKUXVlcnlQcm9taXNlPEdvcmRpYy5BZHguSW50ZXJmYWNlLkdBZHhDb3VudERhdGE+IHwgbnVsbCB7XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIHRoaXMuY250LmlzbC5BZG9SZWdpc3RyT3JnYW5pemFjaS5nZXREYXRhQ291bnQoeyBmaWx0ZXJzOiB0aGlzLmZpbHRlckRhdGEgfSkuZ2V0RGF0YSgpXHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIGFwcGx5ZGF0YShmaWx0ZXJEYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy5jbnQuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5jbnQuaXNsLkFkb01ldG9kaWNreS5saXN0SGlzdG9yeSh7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJEYXRhXHJcbiAgICAgICAgICAgIH0pLmdldFZpZXcoKS5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQbGF0bm9zdENvbHVtbih0aGlzLnZpZXcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkLmdncmlkKCdzZXREYXRhJywgdGhpcy52aWV3KTtcclxuICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHsgdGhpcy5jbnQuZW5kT3BlcmF0aW9uKCkgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3NlbGVjdGlvbkdyaWRBY3Qob2JqQXJyOiBJR0dyaWRTZWxlY3Rpb248YW55Pikge1xyXG4gICAgICAgIC8vICAgIHRoaXMuY250LmFjdGlvbnMuYWN0T3BlblNzbERlbmlrPy51cGRhdGUoeyBlbmFibGVkOiBvYmpBcnIuY291bnQgPiAwIH0pXHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIGdldE5hemV2KGRhdGEpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7ZGF0YVtHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvTWV0b2RpY2t5SGlzdG9yeUR0b05hbWVzLml4c19yZWZfdHh0XX1gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvTWV0b2RpY2t5SGlzdG9yeUR0b05hbWVzLml4c19yZWZfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDEzNFwiIC8vUkMgMzU4MDAxMzQgOiBNZXRvZGnvv71rYVxyXG4gICAgICAgICAgICAgICAgfSkuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb01ldG9kaWNreUhpc3RvcnlEdG9OYW1lcy5kYXRfb2QsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTM4XCIsIC8vUkMgMzU4MDAxMzggOiBEYXR1bSB6Ye+/ve+/vXRrdSBha3Rpdml0eVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcclxuICAgICAgICAgICAgICAgIH0pLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9NZXRvZGlja3lIaXN0b3J5RHRvTmFtZXMuZGF0X2RvLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDEzOVwiLCAvL1JDIDM1ODAwMTM5IDogRGF0dW0ga29uY2UgYWt0aXZpdHlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb01ldG9kaWNreUhpc3RvcnlEdG9OYW1lcy5vcmdudW0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTM1XCIgLy9SQyAzNTgwMDEzNSA6IE9SR05VTVxyXG4gICAgICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb01ldG9kaWNreUhpc3RvcnlEdG9OYW1lcy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTQyXCIgLy9SQyAzNTgwMDE0MiA6IEnvv71PIG9yZ2FuaXphY2VcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9NZXRvZGlja3lIaXN0b3J5RHRvTmFtZXMubmFvcCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAxMzZcIiAvL1JDIDM1ODAwMTM2IDogTu+/vXpldiBBUklTXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvTWV0b2RpY2t5SGlzdG9yeUR0b05hbWVzLm5hemV2LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDEzN1wiIC8vUkMgMzU4MDAxMzcgOiBO77+9emV2IEdJTklTXHJcbiAgICAgICAgICAgICAgICB9KS5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvTWV0b2RpY2t5SGlzdG9yeUR0b05hbWVzLmRhdF9vZCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAxMzhcIiAvL1JDIDM1ODAwMTM4IDogRGF0dW0gemHvv73vv710a3UgYWt0aXZpdHlcclxuICAgICAgICAgICAgICAgIH0pLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9NZXRvZGlja3lIaXN0b3J5RHRvTmFtZXMuZGF0X2RvLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDEzOVwiIC8vUkMgMzU4MDAxMzkgOiBEYXR1bSBrb25jZSBha3Rpdml0eVxyXG4gICAgICAgICAgICAgICAgfSkuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvTWV0b2RpY2t5SGlzdG9yeUR0b05hbWVzLm9rZWMsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTQwXCIgLy9SQyAzNTgwMDE0MCA6IE9LRe+/vVxyXG4gICAgICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb01ldG9kaWNreUhpc3RvcnlEdG9OYW1lcy5yaXoxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDE0MVwiIC8vUkMgMzU4MDAxNDEgOiBJ77+9TyBuYWTvv73vv716ZW7vv70gb3JnYW5pemFjZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGRHcmlkRm9ybWF0Q29sdW1ucyhncmlkRm9ybWF0LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbU1ldG9kaWNreUhpc3RvcnkgZXh0ZW5kcyBHQ29udGVudEJhc2U8R1Nlem5hbU1ldG9kaWNreUhpc3RvcnlPYmo+IHtcclxuICAgICAgICBwcml2YXRlIHNlem5hbU9iajogR1Nlem5hbU1ldG9kaWNreUhpc3RvcnlPYmogJiBHQ29udGVudDtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V6bmFtT2JqID0gR29yZGljLlV0aWxzLmV4dGVuZFdpdGhQcm90b01ldGhvZHModGhpcyBhcyBHQ29udGVudCwgbmV3IEdTZXpuYW1NZXRvZGlja3lIaXN0b3J5T2JqKCkpO1xyXG4gICAgICAgICAgICB0aGlzLnNlem5hbU9iai5jcmVhdGVCYXNlKHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50TmFtZTogXCJTZXpuYW1NZXRvZGlja3lIaXN0b3J5T2JqTmV3XCIsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50Q2FwdGlvbjogXCJqcmVzOjM1ODAwMTI2XCIsIC8vUkMgMzU4MDAxMjYgOiBNZXRvZGnvv71reVxyXG4gICAgICAgICAgICAgICAgZGF0YUxpc3REZXNjcmlwdG9yOiB0aGlzLmRhdGFMaXN0RGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5TGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhZGREZWZhdWx0YWt0aXZpdGE6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29tcGFyYXRvclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ29tcGFyYXRvcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntpeHNfcmFyfVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZ3JpZFNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogdGhpcy5zZXpuYW1PYmouZ2V0R3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLnNlem5hbU9iai5jcmVhdGVCYXNlTWVudUJhckFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXpuYW1PYmouY3JlYXRlRmlsdGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V6bmFtT2JqLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuQWRvLldlYkNvbnRyb2xzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtT2tlY09iaiBleHRlbmRzIEdvcmRpYy5BZHguV2ViQ29udHJvbHMuR0FkeFNlem5hbUJhc2Uge1xyXG4gICAgICAgIHNlbGVjdGlvbkdyaWRBY3Qob2JqOiBJR0dyaWRTZWxlY3Rpb248YW55Pik6IHZvaWQge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9wZW5EZXRhaWwoZGF0YTogYW55LCBpc05ldzogYm9vbGVhbikge1xyXG4gICAgICAgICAgICBjb25zdCBjbnRJbml0aWFsaXplciA9IFtcIkdvcmRpYy5BZG8uV2ViQ29udHJvbHMuR0RldGFpbE9rZWNcIiwge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEZpbHRlcjogdGhpcy5maWx0ZXJEYXRhLFxyXG4gICAgICAgICAgICAgICAgZ3JpZFJjOiBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoaXMuZ3JpZCksXHJcbiAgICAgICAgICAgICAgICBvcGVuRGlhbG9nOiB0aGlzLnRhYk9wZW5cclxuICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgY29uc3QgaW5wdXRQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICBJRDogXCJEZXRhaWxBZG9Pa2VjXCIsXHJcbiAgICAgICAgICAgICAgICBuZXdSZWNvcmQ6IGlzTmV3LFxyXG4gICAgICAgICAgICAgICAgb2tlYzogaXNOZXcgPT0gdHJ1ZSA/IG51bGwgOiBkYXRhLm9rZWNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm9wZW5EaWFsb2dPck1vZGFsV2luZG93KGNudEluaXRpYWxpemVyLCBpbnB1dFBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVBY3Rpb25zKCk6IHsgW2FrY2VOYW1lOiBzdHJpbmddOiBHQWN0aW9uIHwgR0FjdGlvblBhcmFtc0RlZk9iaiB9IHwgbnVsbCB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVCYXNlTWVudUJhckFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250Lm1lbnVCYXIodGhpcy5jbnQuYWN0aW9ucy5jcmVhdGVCYXIoW1xyXG4gICAgICAgICAgICAgICAgXCJhY3RPcGVuRGV0YWlsKlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3ROZXdEZXRhaWwqXCIsXHJcbiAgICAgICAgICAgIF0pKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQ29udGV4dE1lbnUoKTogTWVudVBhcmFtc1tdIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY250LmFjdGlvbnMuY3JlYXRlQmFyKFtcclxuICAgICAgICAgICAgICAgIFwiYWN0T3BlbkRldGFpbCpcIixcclxuICAgICAgICAgICAgICAgIFwiYWN0T3BlbkRldGFpbE9uTmV3VGFiXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdE9wZW5EaWFsb2dWeWJlcm92YVNrdXBpbmEqXCIsXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVGaWx0ZXJGb3JtKCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0uYWRkUm93KFwianJlczozNTgwMDE5NVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyAvL1JDIDM1ODAwMTk1IDogT0tF77+9XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HT2tlY0R0b05hbWVzLm9rZWMsXHJcbiAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAxOTZcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HT2tlY0R0b05hbWVzLm5hemV2LFxyXG4gICAgICAgICAgICAgICAgfSkgLy9SQyAzNTgwMDE5NiA6IE7vv716ZXZcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHVzZXJoYXJkRGVmYXVsdEZpbHRlcihoYXJkRmlsdGVyOiBhbnkpOiBhbnkge1xyXG4gICAgICAgICAgICByZXR1cm4gaGFyZEZpbHRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbGxlY3REYXRhKGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZ2V0RGF0YUNvdW50KCk6IEpRdWVyeVByb21pc2U8R29yZGljLkFkeC5JbnRlcmZhY2UuR0FkeENvdW50RGF0YT4gfCBudWxsIHtcclxuICAgICAgICAvLyAgICByZXR1cm4gdGhpcy5jbnQuaXNsLkFkb1JlZ2lzdHJPcmdhbml6YWNpLmdldERhdGFDb3VudCh7IGZpbHRlcnM6IHRoaXMuZmlsdGVyRGF0YSB9KS5nZXREYXRhKClcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgYXBwbHlkYXRhKGZpbHRlckRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLmNudC5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNudC5pc2wuQWRvT2tlY1NlcnZpY2UubGlzdCh7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJEYXRhXHJcbiAgICAgICAgICAgIH0pLmdldFZpZXcoKS5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkLmdncmlkKCdzZXREYXRhJywgdGhpcy52aWV3KTtcclxuICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHsgdGhpcy5jbnQuZW5kT3BlcmF0aW9uKCkgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3NlbGVjdGlvbkdyaWRBY3Qob2JqQXJyOiBJR0dyaWRTZWxlY3Rpb248YW55Pikge1xyXG4gICAgICAgIC8vICAgIHRoaXMuY250LmFjdGlvbnMuYWN0T3BlblNzbERlbmlrPy51cGRhdGUoeyBlbmFibGVkOiBvYmpBcnIuY291bnQgPiAwIH0pXHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIGdldE5hemV2KGRhdGEpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7ZGF0YVtHb3JkaWMuQWRvLkludGVyZmFjZS5HT2tlY0R0b05hbWVzLm5hemV2XX1gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HT2tlY0R0b05hbWVzLm9rZWMsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTk3XCIgLy9SQyAzNTgwMDE5NyA6IE9LRe+/vVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HT2tlY0R0b05hbWVzLm5hemV2LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDE5OFwiIC8vUkMgMzU4MDAxOTggOiBO77+9emV2XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZEdyaWRGb3JtYXRDb2x1bW5zKGdyaWRGb3JtYXQsIGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtT2tlYyBleHRlbmRzIEdDb250ZW50QmFzZTxHU2V6bmFtT2tlY09iaj4ge1xyXG4gICAgICAgIHByaXZhdGUgc2V6bmFtT2JqOiBHU2V6bmFtT2tlY09iaiAmIEdDb250ZW50O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXpuYW1PYmogPSBHb3JkaWMuVXRpbHMuZXh0ZW5kV2l0aFByb3RvTWV0aG9kcyh0aGlzIGFzIEdDb250ZW50LCBuZXcgR1Nlem5hbU9rZWNPYmooKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V6bmFtT2JqLmNyZWF0ZUJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnROYW1lOiBcIlNlem5hbU9rZWNPYmpOZXdcIixcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRDYXB0aW9uOiBcImpyZXM6MzU4MDAxOTRcIiwgLy9SQyAzNTgwMDE5NCA6IE9kdu+/vXR2b3bvv70ga2xhc2lmaWthY2UgZWtvbm9taWNr77+9Y2gg77+9aW5ub3N077+9XHJcbiAgICAgICAgICAgICAgICBkYXRhTGlzdERlc2NyaXB0b3I6IHRoaXMuZGF0YUxpc3REZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIGZpbHRlclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlMaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZERlZmF1bHRha3Rpdml0YTogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wYXJhdG9yU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRDb21wYXJhdG9yOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBncmlkU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiB0aGlzLnNlem5hbU9iai5nZXRHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuc2V6bmFtT2JqLmNyZWF0ZUJhc2VNZW51QmFyQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnNlem5hbU9iai5jcmVhdGVGaWx0ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXpuYW1PYmouY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5BZG8uV2ViQ29udHJvbHMge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1SZWdpc3RyT3JnYW5pemFjaU9iaiBleHRlbmRzIEdvcmRpYy5BZHguV2ViQ29udHJvbHMuR0FkeFNlem5hbUJhc2VcclxuICAgIHtcclxuICAgICAgICBzZWxlY3Rpb25HcmlkQWN0KG9iajogSUdHcmlkU2VsZWN0aW9uPGFueT4pOiB2b2lkIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZSgpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgZ2V0U2VydmljZUNudCgpOiBHQ29udGVudCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlcnZpY2VDbnQgPT0gdW5kZWZpbmVkIHx8IHRoaXMuc2VydmljZUNudCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlQ250ID0gdGhpcy5jbnQuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuQWRvLldlYkNvbnRyb2xzLkdTZXpuYW1SZWdpc3RyT3JnYW5pemFjaVwiKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlQ250O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3BlbkRldGFpbChkYXRhOiBhbnksIGlzTmV3OiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNudEluaXRpYWxpemVyID0gW1wiR29yZGljLkFkby5XZWJDb250cm9scy5HRGV0YWlsUmVnaXN0ck9yZ2FuaXphY2lcIiwge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEZpbHRlcjogdGhpcy5maWx0ZXJEYXRhLFxyXG4gICAgICAgICAgICAgICAgZ3JpZFJjOiBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoaXMuZ3JpZCksXHJcbiAgICAgICAgICAgICAgICBvcGVuRGlhbG9nOiB0aGlzLnRhYk9wZW5cclxuICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgY29uc3QgaW5wdXRQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICBJRDogXCJEZXRhaWxBZG9SZWdpc3RyT3JnYW5pemFjaVwiLFxyXG4gICAgICAgICAgICAgICAgbmV3UmVjb3JkOiBpc05ldyxcclxuICAgICAgICAgICAgICAgIGl4c19yYXI6IGlzTmV3ID09IHRydWUgPyBudWxsIDogZGF0YS5peHNfcmFyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vcGVuRGlhbG9nT3JNb2RhbFdpbmRvdyhjbnRJbml0aWFsaXplciwgaW5wdXRQYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjcmVhdGVBY3Rpb25zKCk6IHsgW2FrY2VOYW1lOiBzdHJpbmddOiBHQWN0aW9uIHwgR0FjdGlvblBhcmFtc0RlZk9iaiB9IHwgbnVsbCB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBhY3RHZW5lcmF0ZUZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAxODFcIiwgLy9SQyAzNTgwMDE4MSA6IEdlbmVyb3ZhdCBzb3Vib3IgT1JHL0tVMFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZG93bmxvYWRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHRoaXMuR2VuZXJhdGVGaWxlKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY3JlYXRlQmFzZU1lbnVCYXJBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNudC5tZW51QmFyKHRoaXMuY250LmFjdGlvbnMuY3JlYXRlQmFyKFtcclxuICAgICAgICAgICAgICAgIFwiYWN0T3BlbkRldGFpbCpcIixcclxuICAgICAgICAgICAgICAgIFwiYWN0TmV3RGV0YWlsKlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3RHZW5lcmF0ZUZpbGUqXCJcclxuICAgICAgICAgICAgXSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVDb250ZXh0TWVudSgpOiBNZW51UGFyYW1zW10ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbnQuYWN0aW9ucy5jcmVhdGVCYXIoW1xyXG4gICAgICAgICAgICAgICAgXCJhY3RPcGVuRGV0YWlsKlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3RPcGVuRGV0YWlsT25OZXdUYWJcIixcclxuICAgICAgICAgICAgICAgIFwiYWN0T3BlbkRpYWxvZ1Z5YmVyb3ZhU2t1cGluYSpcIixcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY3JlYXRlRmlsZUZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMTg3XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctOFwiICx7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJqbWVub19zb3Vib3J1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoeyBzdG9wcGluZzogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy00XCIgLHsgLy9SQyAzNTgwMDE4NyA6IEpt77+9bm8gc291Ym9ydVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3NvdWJvcnVcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW3sgdHlwOiAwLCB0ZXh0OiBcImpyZXM6MzU4MDAxODVcIiB9LCB7IHR5cDogMSwgdGV4dDogXCJqcmVzOjM1ODAwMTg2XCIgfV0sIHtrZXk6IFwidHlwXCJ9KSwgLy9SQyAzNTgwMDE4NiA6IC5LVTBcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwiPGI+e3RleHR9PC9iPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9zb3Vib3J1PXZhbHVlLnR5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcInRleHRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY0lucHV0OiBcIm9uaW5wdXRcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHsgdHlwOiAwLCB0ZXh0OiBcImpyZXM6MzU4MDAxODVcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7IHN0b3BwaW5nOiB0cnVlIH0pXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdlbmVyYXRlRmlsZSgpIHtcclxuICAgICAgICAgICAgdmFyIGR0b3MgPSB0aGlzLmdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKGZhbHNlLCBcImRhdGFcIilcclxuICAgICAgICAgICAgaWYgKCFkdG9zIHx8IGR0b3MubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY250LmRpYWxvZ3Mud2FybmluZyhcImpyZXM6MzU4MDAxOTNcIik7IC8vUkMgMzU4MDAxOTMgOiBWIG5h77+9dGVu77+9bSBzZXpuYW11IHNlIG5lbmFjaO+/vXrvv70gZG9zdCBkYXQgcHJvIHZ5dHZv77+9ZW7vv70gc291Ym9ydSwgemtvbnRyb2x1anRlIGZpbHRyeSBhIGFrY2kgb3Bha3VqdGUuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGptZW5vX3NvdWJvcnUgPSBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgdHlwX3NvdWJvcnUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmNudC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJqcmVzOjM1ODAwMTg4XCIsIHRoaXMuY3JlYXRlRmlsZUZvcm0oKSwgbnVsbCwgeyAvL1JDIDM1ODAwMTg4IDogWmFkZWp0ZSBqbe+/vW5vIGEgdHlwIHNvdWJvcnVcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA0MDAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDI1MCxcclxuICAgICAgICAgICAgfSkub24oXCJva1wiLCAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgam1lbm9fc291Ym9ydSA9IGN0eC5qbWVub19zb3Vib3J1O1xyXG4gICAgICAgICAgICAgICAgdHlwX3NvdWJvcnUgPSBjdHgudHlwX3NvdWJvcnU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbnQuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFNlcnZpY2VDbnQoKS5jYWxsKFwiR2VuZXJhdGVGaWxlXCIsIHsgZHRvczogZHRvcywgZmlsZU5hbWU6IGptZW5vX3NvdWJvcnUsIHR5cGU6IHR5cF9zb3Vib3J1IH0pLmRvbmUoKGZpbGVJbmZvOiBHb3JkaWMuR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HRmlsZUluZm9EdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdGaWxlKCkuZG93bmxvYWQoZmlsZUluZm8pLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTZXJ2aWNlQ250KCkuZmlyZShcIlJlbW92ZUZpbGVcIiwgeyBndWlkOiBmaWxlSW5mby5ndWlkIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlRmlsdGVyRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIGZybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0yLTEwLTAsIE0tMy05LTAsIFMtMTItMTItMFwiLFxyXG4gICAgICAgICAgICB9KS5hZGRSb3coXCJqcmVzOjM1ODAwMTczXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IC8vUkMgMzU4MDAxNzMgOiBIbGVkYW7vv70gT1JHTlVNXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImhsZWRfb3JnbnVtXCIsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcHBpbmc6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KV0sXHJcbiAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRm9ybS5hZGRSb3coXCJqcmVzOjM1ODAwMTc5XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY2FrdCgpLCB7IC8vUkMgMzU4MDAxNzkgOiBBa3Rpdml0YSBza3V0Ze+/vW7vv71cclxuICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLmFrdGl2aXRhX3NrdXQsXHJcbiAgICAgICAgICAgICAgICBncmFwaGljSW5wdXQ6IFwib25pbnB1dFwiLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGFrdGl2aXRhOiAxMDAgfSxcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuYWt0aXZpdGFfc2t1dD12YWx1ZS5ha3Rpdml0YVwiXHJcbiAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0uYWRkUm93KFwianJlczozNTgwMDE3NFwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwgeyAvL1JDIDM1ODAwMTc0IDogT1JHTlVNIG9kIC0gZG9cclxuICAgICAgICAgICAgICAgIG5hbWU6IFwib3JnbnVtX29kXCIsXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IG51bGxcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJvcmdudW1fZG9cIixcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogbnVsbFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0uYWRkUm93KFwianJlczozNTgwMDE3MlwiKS5hZGRGaWVsZChcImdmb3JtYm94XCIsIHsgLy9SQyAzNTgwMDE3MiA6IE9SR05VTVxyXG4gICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMub3JnbnVtLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntobGVkX29yZ251bX1cIixcclxuICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgICAgIGZvcm06IGZybSxcclxuICAgICAgICAgICAgICAgIGl0ZW1EZWxldGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3AsIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkdG9bXCJvcmdudW1cIl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHRvW1wib3JnbnVtXCJdLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZHRvW1wib3JnbnVtXCJdLnNwbGl0KFwiLFwiKS5tYXAoaXRlbSA9PiBpdGVtLnRyaW0oKSkuZmlsdGVyKGl0ZW0gPT4gaXRlbS5sZW5ndGggPiAwKS5tYXAoaXRlbSA9PiAoeyBobGVkX29yZ251bTogaXRlbSB9KSksIHsgdmFsaWQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG91dHB1dCA9ICQodGhpcykuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3V0cHV0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmluYWwgPSBvdXRwdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKG8gPT4gbz8uaGxlZF9vcmdudW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmpvaW4oXCIsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvW1wib3JnbnVtXCJdID0gZmluYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRpYWxvZ09wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAxNzVcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgLy9SQyAzNTgwMDE3NSA6IERydWggT3JnYW5pemFjZVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLmRvcixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbeyBkb3I6IFwiMlwiLCBkb3JfdHh0OiBcImpyZXM6MzU4MDAxNjBcIiB9LCB7IGRvcjogXCIzXCIsIGRvcl90eHQ6IFwianJlczozNTgwMDE2MVwiIH0sIHsgZG9yOiBcIjRcIiwgZG9yX3R4dDogXCJqcmVzOjM1ODAwMTYyXCIgfSwgeyBkb3I6IFwiOVwiLCBkb3JfdHh0OiBcImpyZXM6MzU4MDAxNjNcIiB9XSwgeyBrZXk6IFwiZG9yXCIgfSksIC8vUkMgMzU4MDAxNjMgOiBvc3RhdG7vv71cclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie2Rvcl90eHR9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuZG9yPXZhbHVlLmRvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcImRvcl90eHRcIiwgXCJkb3JcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY0lucHV0OiBcIm9uaW5wdXRcIixcclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzU4MDAxNzhcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgLy9SQyAzNTgwMDE3OCA6IEnvv71PIG5hZO+/vWF6ZW7vv70gb3JnYW5pemFjZSAxLiBzdHVwbu+/vVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnJpejEsXHJcbiAgICAgICAgICAgICAgICB9ICkgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMTc3XCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgR29yZGljLlByZWZhYnMuRGF0ZS53aXRoT3BlcmF0b3JzKCksIHsgLy9SQyAzNTgwMDE3NyA6IFph77+977+9dGVrIGFrdGl2aXR5IG9yZ2FuaXphY2VcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy56YW8sXHJcbiAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjM1ODAwMTc2XCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgR29yZGljLlByZWZhYnMuRGF0ZS53aXRoT3BlcmF0b3JzKCksIHsgLy9SQyAzNTgwMDE3NiA6IEtvbmVjIGFrdGl2aXR5IG9yZ2FuaXphY2VcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5rYW8sXHJcblxyXG4gICAgICAgICAgICAgICAgfSkgICBcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXNlcmhhcmREZWZhdWx0RmlsdGVyKGhhcmRGaWx0ZXI6IGFueSk6IGFueSB7XHJcbiAgICAgICAgICAgIHJldHVybiBoYXJkRmlsdGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29sbGVjdERhdGEoZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9nZXREYXRhQ291bnQoKTogSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuQWR4LkludGVyZmFjZS5HQWR4Q291bnREYXRhPiB8IG51bGwge1xyXG4gICAgICAgIC8vICAgIHJldHVybiB0aGlzLmNudC5pc2wuQWRvUmVnaXN0ck9yZ2FuaXphY2kuZ2V0RGF0YUNvdW50KHsgZmlsdGVyczogdGhpcy5maWx0ZXJEYXRhIH0pLmdldERhdGEoKVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBhcHBseWRhdGEoZmlsdGVyRGF0YTogYW55KSB7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5jbnQuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5jbnQuaXNsLkFkb1JlZ2lzdHJPcmdhbml6YWNpLmxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyczogZmlsdGVyRGF0YVxyXG4gICAgICAgICAgICB9KS5nZXRWaWV3KCkuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGxhdG5vc3RDb2x1bW4odGhpcy52aWV3KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZC5nZ3JpZCgnc2V0RGF0YScsIHRoaXMudmlldyk7XHJcbiAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IHRoaXMuY250LmVuZE9wZXJhdGlvbigpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9zZWxlY3Rpb25HcmlkQWN0KG9iakFycjogSUdHcmlkU2VsZWN0aW9uPGFueT4pIHtcclxuICAgICAgICAvLyAgICB0aGlzLmNudC5hY3Rpb25zLmFjdE9wZW5Tc2xEZW5paz8udXBkYXRlKHsgZW5hYmxlZDogb2JqQXJyLmNvdW50ID4gMCB9KVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBnZXROYXpldihkYXRhKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke2RhdGFbXCJuYXpldlwiXX1gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5ha3Rpdml0YSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAwMDRcIiwgLy9SQyAzNTgwMDAwNCA6IEFrdGl2aXRhXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAocm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuQWR4LldlYkNvbnRyb2xzLkdBZHhHcmlkRnVuY3Rpb25zLmNyZWF0ZUFrdGl2aXRhQ2FwdGlvbkljb24ocm93W1wiYWt0aXZpdGFcIl0/PyAxMDApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5vcmdudW0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMDA1XCIgLy9SQyAzNTgwMDAwNSA6IE9SR05VTVxyXG4gICAgICAgICAgICAgICAgfSkuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5vcmdudW1fdCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAwMTNcIiAvL1JDIDM1ODAwMDEzIDogT1JHTlVNVFxyXG4gICAgICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDAwN1wiLCAvL1JDIDM1ODAwMDA3IDogSe+/vU9cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5kb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTMzXCIsIC8vUkMgMzU4MDAxMzMgOiBEcnVoIG9yZ2FuaXphY2VcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyb3cuZG9yIHx8IHJvdy5kb3IgPT0gXCIgXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8Yj4ke3Jvdy5kb3J9PC9iPiAtICR7cm93LmRvcl90eHR9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgIC8vVE9ETzogUO+/vWlkYXQgZHJ1aHkgb3JnYW5pemFj77+9XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuZG9yMixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAxNTlcIiwgLy9SQyAzNTgwMDE1OSA6IERydWggb3JnYW5pemFjZSAyXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAocm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcm93LmRvcjIgfHwgcm93LmRvcjIgPT0gXCIgXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8Yj4ke3Jvdy5kb3IyfTwvYj4gLSAke3Jvdy5kb3JfdHh0Mn1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnR1aixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAwMTVcIiAvL1JDIDM1ODAwMDE1IDogVFVKIE9SR1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuZHVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDAyMlwiLCAvL1JDIDM1ODAwMDIyIDogRHJ1aCDvv73vv71hZHVcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyb3cuZHVyIHx8IHJvdy5kdXIgPT0gXCIgXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxiPiR7cm93LmR1cn08L2I+IC0gJHtyb3cuZHVyX3R4dH1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHsgICBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5uYXpldixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAwMDFcIiwgLy9SQyAzNTgwMDAwMSA6IE7vv716ZXZcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5uYW9wLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDE0M1wiLCAvL1JDIDM1ODAwMTQzIDogTu+/vXpldiBBUklTXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MFxyXG4gICAgICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMudWxpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMDE2XCIgLy9SQyAzNTgwMDAxNiA6IFVsaWNlXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5zaWRsbyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAwMTdcIiAvL1JDIDM1ODAwMDE3IDogU++/vWRsb1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMub2tlYyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAwMThcIiAvL1JDIDM1ODAwMDE4IDogT0tF77+9XHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5yaXoxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDE0N1wiIC8vUkMgMzU4MDAxNDcgOiBJ77+9TyBuYWTvv70uIE9yZy5cclxuICAgICAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLmxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDE0OFwiIC8vUkMgMzU4MDAxNDggOiBO77+9emV2IHBybyBvYu+/vWxreVxyXG4gICAgICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuenVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozNTgwMDE0OVwiIC8vUkMgMzU4MDAxNDkgOiBaVUVcclxuICAgICAgICAgICAgICAgIH0pLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdBZG9SZWdpcnN0T3JnYW5pemFjaUR0b05hbWVzLnphbyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAxNTBcIiwgLy9SQyAzNTgwMDE1MCA6IFph77+977+9dGVrIGFrdGl2aXR5IG9yZ2FuaXphY2VcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXHJcbiAgICAgICAgICAgICAgICB9KS5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5rYW8sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTUxXCIsIC8vUkMgMzU4MDAxNTEgOiBLb25lYyBha3Rpdml0eSBvcmdhbml6YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5kem0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTUzXCIsIC8vUkMgMzU4MDAxNTMgOiBEcnVoIHpt77+9bnlcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyb3cuZHptKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8Yj4ke3Jvdy5kem19PC9iPiAtIO+/ve+/vWRu77+9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGI+JHtyb3cuZHptfTwvYj4gLSBWem5pa2BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxiPiR7cm93LmR6bX08L2I+IC0gWm3vv71uYWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxiPiR7cm93LmR6bX08L2I+IC0gT3ByYXZhYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGI+JHtyb3cuZHptfTwvYj4gLSBa77+9bmlrYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxiPjA8L2I+IC0g77+977+9ZG7vv71gXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5vcmosXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTU0XCIgLy9SQyAzNTgwMDE1NCA6IE9kYm9yXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5vcmcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTU1XCIgLy9SQyAzNTgwMDE1NSA6IO+/vU9SR1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMuaWNvX3N0cmVkaXNrbyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAxNTZcIiAvL1JDIDM1ODAwMTU2IDogSe+/vU8gaW52LiBt77+9c3RhXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5zdHJlZGlza28sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTU3XCIgLy9SQyAzNTgwMDE1NyA6IEludi4gbe+/vXN0b1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogR29yZGljLkFkby5JbnRlcmZhY2UuR0Fkb1JlZ2lyc3RPcmdhbml6YWNpRHRvTmFtZXMubnV0cyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAxNThcIiAvL1JDIDM1ODAwMTU4IDogTlVUU1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HQWRvUmVnaXJzdE9yZ2FuaXphY2lEdG9OYW1lcy5vYl9qbWVubyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAwMjNcIiAvL1JDIDM1ODAwMDIzIDogTu+/vXpldiBkbGUgeu+/vWl6b3ZhY++/vSBsaXN0aW55XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGRHcmlkRm9ybWF0Q29sdW1ucyhncmlkRm9ybWF0LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1SZWdpc3RyT3JnYW5pemFjaSBleHRlbmRzIEdDb250ZW50QmFzZTxHU2V6bmFtUmVnaXN0ck9yZ2FuaXphY2lPYmo+IHtcclxuICAgICAgICBwcml2YXRlIHNlem5hbU9iajogR1Nlem5hbVJlZ2lzdHJPcmdhbml6YWNpT2JqICYgR0NvbnRlbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBpc1Bvdm9sRGJGaWx0ZXI6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlem5hbU9iaiA9IEdvcmRpYy5VdGlscy5leHRlbmRXaXRoUHJvdG9NZXRob2RzKHRoaXMgYXMgR0NvbnRlbnQsIG5ldyBHU2V6bmFtUmVnaXN0ck9yZ2FuaXphY2lPYmooKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V6bmFtT2JqLmNyZWF0ZUJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnROYW1lOiBcInNlem5hbUFkb1JlZ2lzdHJPcmdhbml6YWNpTmV3XCIsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50Q2FwdGlvbjogXCJqcmVzOjM1ODAwMDAyXCIsIC8vUkMgMzU4MDAwMDIgOiBSZWdpc3RyIG9yZ2FuaXphY++/vVxyXG4gICAgICAgICAgICAgICAgZGF0YUxpc3REZXNjcmlwdG9yOiB0aGlzLmRhdGFMaXN0RGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5TGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhZGREZWZhdWx0YWt0aXZpdGE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogdGhpcy5pc1Bvdm9sRGJGaWx0ZXIgPyBcImFkb19maWxfb3JnXCIgOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29tcGFyYXRvclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ29tcGFyYXRvcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntpeHNfcmFyfVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZ3JpZFNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogdGhpcy5zZXpuYW1PYmouZ2V0R3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLnNlem5hbU9iai5jcmVhdGVCYXNlTWVudUJhckFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXpuYW1PYmouY3JlYXRlRmlsdGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V6bmFtT2JqLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIFxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5BZG8uV2ViQ29udHJvbHMge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1adWplT2JqIGV4dGVuZHMgR29yZGljLkFkeC5XZWJDb250cm9scy5HQWR4U2V6bmFtQmFzZSB7XHJcbiAgICAgICAgc2VsZWN0aW9uR3JpZEFjdChvYmo6IElHR3JpZFNlbGVjdGlvbjxhbnk+KTogdm9pZCB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGUoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3BlbkRldGFpbChkYXRhOiBhbnksIGlzTmV3OiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNudEluaXRpYWxpemVyID0gW1wiR29yZGljLkFkby5XZWJDb250cm9scy5HRGV0YWlsWnVqZVwiLCB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50RmlsdGVyOiB0aGlzLmZpbHRlckRhdGEsXHJcbiAgICAgICAgICAgICAgICBncmlkUmM6IG5ldyBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkModGhpcy5ncmlkKSxcclxuICAgICAgICAgICAgICAgIG9wZW5EaWFsb2c6IHRoaXMudGFiT3BlblxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICBjb25zdCBpbnB1dFBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIElEOiBcIkRldGFpbEFkb1p1amVcIixcclxuICAgICAgICAgICAgICAgIG5ld1JlY29yZDogaXNOZXcsXHJcbiAgICAgICAgICAgICAgICB6dWplOiBpc05ldyA9PSB0cnVlID8gbnVsbCA6IGRhdGEuenVqZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkRpYWxvZ09yTW9kYWxXaW5kb3coY250SW5pdGlhbGl6ZXIsIGlucHV0UGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUFjdGlvbnMoKTogeyBbYWtjZU5hbWU6IHN0cmluZ106IEdBY3Rpb24gfCBHQWN0aW9uUGFyYW1zRGVmT2JqIH0gfCBudWxsIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUJhc2VNZW51QmFyQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdGhpcy5jbnQubWVudUJhcih0aGlzLmNudC5hY3Rpb25zLmNyZWF0ZUJhcihbXHJcbiAgICAgICAgICAgICAgICBcImFjdE9wZW5EZXRhaWwqXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdE5ld0RldGFpbCpcIixcclxuICAgICAgICAgICAgXSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVDb250ZXh0TWVudSgpOiBNZW51UGFyYW1zW10ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbnQuYWN0aW9ucy5jcmVhdGVCYXIoW1xyXG4gICAgICAgICAgICAgICAgXCJhY3RPcGVuRGV0YWlsKlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3RPcGVuRGV0YWlsT25OZXdUYWJcIixcclxuICAgICAgICAgICAgICAgIFwiYWN0T3BlbkRpYWxvZ1Z5YmVyb3ZhU2t1cGluYSpcIixcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUZpbHRlckZvcm0oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRm9ybS5hZGRSb3coXCJqcmVzOjM1ODAwMjA4XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IC8vWlVKXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuQWRvLkludGVyZmFjZS5HWnVqZUR0b05hbWVzLnp1amUsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTgwMDE5NlwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdadWplRHRvTmFtZXMubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICB9KSAvL1JDIDM1ODAwMTk2IDogTu+/vXpldlxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdXNlcmhhcmREZWZhdWx0RmlsdGVyKGhhcmRGaWx0ZXI6IGFueSk6IGFueSB7XHJcbiAgICAgICAgICAgIHJldHVybiBoYXJkRmlsdGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29sbGVjdERhdGEoZGF0YTogYW55KSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9nZXREYXRhQ291bnQoKTogSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuQWR4LkludGVyZmFjZS5HQWR4Q291bnREYXRhPiB8IG51bGwge1xyXG4gICAgICAgIC8vICAgIHJldHVybiB0aGlzLmNudC5pc2wuQWRvUmVnaXN0ck9yZ2FuaXphY2kuZ2V0RGF0YUNvdW50KHsgZmlsdGVyczogdGhpcy5maWx0ZXJEYXRhIH0pLmdldERhdGEoKVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBhcHBseWRhdGEoZmlsdGVyRGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250LmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY250LmlzbC5BZG9adWplU2VydmljZS5saXN0KHtcclxuICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlckRhdGFcclxuICAgICAgICAgICAgfSkuZ2V0VmlldygpLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWQuZ2dyaWQoJ3NldERhdGEnLCB0aGlzLnZpZXcpO1xyXG4gICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4geyB0aGlzLmNudC5lbmRPcGVyYXRpb24oKSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vc2VsZWN0aW9uR3JpZEFjdChvYmpBcnI6IElHR3JpZFNlbGVjdGlvbjxhbnk+KSB7XHJcbiAgICAgICAgLy8gICAgdGhpcy5jbnQuYWN0aW9ucy5hY3RPcGVuU3NsRGVuaWs/LnVwZGF0ZSh7IGVuYWJsZWQ6IG9iakFyci5jb3VudCA+IDAgfSlcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgZ2V0TmF6ZXYoZGF0YSk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHtkYXRhW0dvcmRpYy5BZG8uSW50ZXJmYWNlLkdadWplRHRvTmFtZXMubmF6ZXZdfWBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldEdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdadWplRHRvTmFtZXMuenVqZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzU4MDAyMDhcIiAvL1JDIDM1ODAwMjA4IDogWlVKXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5BZG8uSW50ZXJmYWNlLkdadWplRHRvTmFtZXMubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjM1ODAwMTk4XCIgLy9SQyAzNTgwMDE5OCA6IE7vv716ZXZcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkR3JpZEZvcm1hdENvbHVtbnMoZ3JpZEZvcm1hdCwgZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbVp1amUgZXh0ZW5kcyBHQ29udGVudEJhc2U8R1Nlem5hbVp1amVPYmo+IHtcclxuICAgICAgICBwcml2YXRlIHNlem5hbU9iajogR1Nlem5hbVp1amVPYmogJiBHQ29udGVudDtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V6bmFtT2JqID0gR29yZGljLlV0aWxzLmV4dGVuZFdpdGhQcm90b01ldGhvZHModGhpcyBhcyBHQ29udGVudCwgbmV3IEdTZXpuYW1adWplT2JqKCkpO1xyXG4gICAgICAgICAgICB0aGlzLnNlem5hbU9iai5jcmVhdGVCYXNlKHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50TmFtZTogXCJTZXpuYW1adWplT2JqTmV3XCIsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50Q2FwdGlvbjogXCJqcmVzOjM1ODAwMjAyXCIsIC8vUkMgMzU4MDAyMDIgOiBa77+9a2xhZG7vv70g77+9emVtbu+/vSBqZWRub3RreVxyXG4gICAgICAgICAgICAgICAgZGF0YUxpc3REZXNjcmlwdG9yOiB0aGlzLmRhdGFMaXN0RGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5TGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhZGREZWZhdWx0YWt0aXZpdGE6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29tcGFyYXRvclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ29tcGFyYXRvcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZ3JpZFNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogdGhpcy5zZXpuYW1PYmouZ2V0R3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLnNlem5hbU9iai5jcmVhdGVCYXNlTWVudUJhckFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXpuYW1PYmouY3JlYXRlRmlsdGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V6bmFtT2JqLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==
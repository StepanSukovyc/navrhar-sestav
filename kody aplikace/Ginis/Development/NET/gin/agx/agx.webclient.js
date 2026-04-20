"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Agx;
    (function (Agx) {
        var WebClient;
        (function (WebClient) {
            let GDataBoxDetail = class GDataBoxDetail extends Gordic.GContentBase {
                onContentReady() {
                    this.init();
                }
                saveAndCloseDatabox(closeAct) {
                    var form = this.findForms("databox-form");
                    if (form.gform("isValid")) {
                        form.findFields().gfield("model", "collect", this.model);
                        this.beginOperation();
                        Gordic.Isl.GexDatoveSchranky.upsert({ data: this.model }).getData().done((ret) => {
                            if (ret.ixs_own != null && ret.ixs_own != undefined) {
                                this.currentOwner = this.souvisejiciOsoby.find(item => item.ixs_ref == ret.ixs_own);
                            }
                            form.findFields().gfield("model", "apply", ret);
                            this.notification("showToast", {
                                title: "jres:33000049",
                                content: "jres:33000027",
                                state: "success",
                                icon: "gi-gex"
                            });
                            this.enabledFields(false);
                            this.model = ret;
                            this.updateMainGrid();
                            if (this.opraveneOsoby != null && this.opraveneOsoby != undefined) {
                                var owner = this.opraveneOsoby.find(item => item.ixs_ref == this.model.ixs_own);
                                if (owner == null)
                                    this.addOwnerToOpravnenaOsoba(closeAct);
                                else
                                    this.loadOpravneneOsoby();
                            }
                            else
                                this.addOwnerToOpravnenaOsoba(closeAct);
                            if (closeAct == true)
                                this.close();
                            else if (this.isNew == true && closeAct == false) {
                                this.close();
                                $.content().navigate(["Gordic.Agx.WebClient.GDataBoxDetail", { /*gridRc: this.gridRc,*/ uid: "GDataBoxDetail" }], { dbid: this.model.dbid });
                            }
                            else if (this.isNew == true) {
                                this.isNew = false;
                                this.setBreadcrumbs([{
                                        action: this.actions.actGotoBack
                                    }]);
                            }
                        }).fail((err1, err2, err3) => {
                            if (err2 === "exception")
                                err3.handled = true;
                            this.notification("add", {
                                title: "jres:33000049",
                                content: (err1.responseJSON?.exception?.baseMessage) ? err1.responseJSON?.exception?.baseMessage : "jres:33000028", //RC 33000028 : Uložení neproběhlo správně
                                state: "error",
                                icon: "gi-gex"
                            });
                        }).always(() => {
                            this.endOperation();
                        });
                    }
                }
                addOwnerToOpravnenaOsoba(close) {
                    this.opravnenaosobaTmp.osoba = this.currentOwner;
                    this.opravnenaosobaTmp.dbid = this.model.dbid;
                    this.opravnenaosobaTmp.privil_owner_adm = false;
                    this.opravnenaosobaTmp.privil_read_non_personal = false;
                    this.opravnenaosobaTmp.privil_read_all = false;
                    this.opravnenaosobaTmp.privil_create_dm = false;
                    this.opravnenaosobaTmp.privil_view_info = false;
                    this.opravnenaosobaTmp.privil_search_db = false;
                    Gordic.Isl.GexOpravneneOsoby.upsert({ data: this.opravnenaosobaTmp }).getData().done((ret) => {
                        if (close == false)
                            this.loadOpravneneOsoby();
                    });
                }
                closeDataboxDetail() {
                    this.closing().done(() => {
                        this.close();
                    });
                }
                init() {
                    this.opraveneOsoby = [];
                    if (this.isNew == false) {
                        this.isEditmode = false;
                        this.enabledFields(false);
                        this.findFields().gfield("model", "apply", this.model);
                    }
                    else
                        this.isEditmode = true;
                    this.setBreadcrumbs([{
                            action: this.actions.actGotoBack
                        }]);
                }
                closing() {
                    var that = this;
                    return $.Deferred(function () {
                        var def = this;
                        if (that.isEditmode == true) {
                            GDlg.confirm("jres:33000042").on("yes", () => {
                                def.resolve();
                            }).on("no", () => {
                                def.reject();
                            });
                        }
                        else
                            def.resolve();
                    });
                }
                cancelEdit() {
                    this.closing().done(() => {
                        if (this.isNew == false) {
                            this.close();
                            $.content().navigate(["Gordic.Agx.WebClient.GDataBoxDetail", { gridRc: this.gridRc, uid: "GDataBoxDetail" }], { dbid: this.model.dbid });
                        }
                        else
                            this.close();
                    });
                }
                onDetailBuilderInit(builder) {
                    builder.withComponent("GDataBoxDetail", {
                        actions: this.createActions(),
                        menuBar: this.createMenuBar(),
                        headerForm: this.createForm(),
                        tabGroups: this.createTabGroups(),
                        tabs: this.createTabs(),
                    }, true);
                }
                onDetailBuilderBuild(builder) { }
                createActions() {
                    return {
                        actGotoBack: {
                            caption: (this.isNew == false) ? "jres:33000055" : "jres:33000048", //RC 33000055 : Detail datové schránky
                            run: (ev, ctx) => {
                                this.tryCloseAllChildContents();
                            }
                        },
                        actEdit: {
                            caption: "jres:33000043", //RC 33000043 : Upravit
                            icon: "gi-pencil",
                            visible: !this.isNew,
                            run: (ev, ctx) => {
                                this.enabledFields(true);
                            }
                        },
                        actSave: {
                            caption: "jres:33000045", //RC 33000045 : Uložit
                            icon: "gi-save",
                            visible: this.isNew,
                            run: (ev, ctx) => {
                                this.saveAndCloseDatabox(false);
                            }
                        },
                        actCancelEdit: {
                            caption: "jres:33000044",
                            icon: "gi-window-close",
                            visible: this.isNew,
                            run: (ev, ctx) => {
                                this.cancelEdit();
                            }
                        },
                        actPrevious: {
                            caption: "jres:33000056", //RC 33000056 : Předchozí
                            icon: "gi-arrow-down gi-rot180",
                            visible: (this.gridRc) ? true : false,
                            enabled: (this.gridRc) ? this.gridRc.current()?.prevRow != null : false,
                            captionVisible: "never",
                            run: (ev, ctx) => {
                                this.previousAndNextAction(false);
                            }
                        },
                        actNext: {
                            caption: "jres:33000057", //RC 33000057 : Další
                            icon: "gi-arrow-down",
                            visible: (this.gridRc) ? true : false,
                            enabled: (this.gridRc) ? this.gridRc.current()?.nextRow != null : false,
                            captionVisible: "never",
                            run: (ev, ctx) => {
                                this.previousAndNextAction(true);
                            }
                        },
                        actAddOpravneneOsoby: {
                            caption: "jres:33000058", //RC 33000058 : Přidat
                            icon: "gi-plus",
                            run: (ev, ctx) => {
                                this.addOpravneneOsoby();
                            }
                        },
                        actRemoveOpravnenaOsoba: {
                            caption: "jres:33000080", //RC 33000080 : Odebrat
                            icon: "gi-minus",
                            enabled: false,
                            run: (ev, ctx) => {
                                this.removeOpravnenaOsoba();
                            }
                        },
                        actOpenDetailOpravneneOsoby: {
                            caption: "jres:33000038",
                            icon: "gi-detail",
                            enabled: false,
                            run: (ev, ctx) => {
                                this.openDetailOpravnenaOsoba(ctx);
                            }
                        },
                        actAddPovolenyAdresat: {
                            caption: "jres:33000058", //RC 33000058 : Přidat
                            icon: "gi-plus",
                            run: (ev, ctx) => {
                                this.addPovolenyAdresat();
                            }
                        },
                        actRemovePovolenyAdresat: {
                            caption: "jres:33000080",
                            icon: "gi-minus",
                            enabled: false,
                            run: (ev, ctx) => {
                                this.removePovolenyAdresat();
                            }
                        }
                    };
                }
                createMenuBar() {
                    return [
                        { action: "actEdit", favorite: true },
                        { action: "actSave", favorite: true },
                        { action: "actCancelEdit", favorite: true },
                        { action: "actPrevious", favorite: true, align: "opposite" },
                        { action: "actNext", favorite: true, align: "opposite" }
                    ];
                }
                createForm() {
                    var _this = this;
                    var form = new Gordic.Forms.Form({ name: "databox-form", customClass: "databox-user" })
                        .addSection("jres:33000049") //RC 33000049 : Datová schránka
                        .addRow("jres:33000023").addField("gstringbox", {
                        name: "dbid",
                        disabled: true
                    })
                        .addRow("jres:33000005").addField("gstringbox", Gordic.Prefabs.Field.charCounter(254), {
                        flag: "required",
                        name: "firmname",
                        validators: [new Gordic.Validators.Length({ min: 1, max: 254, stopping: true })]
                    })
                        .addRow("jres:33000006").addField("gstringbox", Gordic.Prefabs.Field.charCounter(254), {
                        flag: "required",
                        name: "ic",
                        validators: [new Gordic.Validators.Length({ min: 1, max: 254, stopping: true })]
                    })
                        .addRow("jres:33000007").addField("gstringbox", Gordic.Prefabs.Field.charCounter(254), {
                        flag: "required",
                        name: "nationality",
                        validators: [new Gordic.Validators.Length({ min: 1, max: 254, stopping: true })]
                    })
                        .addRow("jres:33000003").addField("gselectbox", Gordic.Prefabs.Select.gexcdbt(), {
                        flag: "required",
                        name: "dbtype",
                        model: "model.dbtype=value.dbtype",
                        validators: [new Gordic.Validators.Required({ stopping: true })]
                    })
                        .addRow("jres:33000004").addField("gselectbox", Gordic.Prefabs.Select.gexcdbs(), {
                        flag: "required",
                        name: "dbstate",
                        model: "model.dbstate=value.dbstate",
                        validators: [new Gordic.Validators.Required({ stopping: true })]
                    })
                        .addRow("jres:33000090").addField("gselectbox", {
                        name: "ixs_own",
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true })],
                        data: Gordic.Isl.GexSouvisejiciOsoby.list().getData(),
                        graphicInput: "oninput",
                        dropdown: true,
                        itemTemplate: "<div class='fa fa-user minifoto'></div><b>{jmeno} {prijmeni}</b><br /><i>{mail}</i>",
                        model: function (op, dto, modelOpt) {
                            switch (op) {
                                case "apply":
                                    var osoba = _this.souvisejiciOsoby.find(item => item.ixs_ref == dto.ixs_own);
                                    $(this).gfield("setValue", (osoba != null && osoba != undefined) ? osoba : null);
                                    return;
                                case "collect":
                                    var value = $(this).gfield("getValue");
                                    if (value != null && value != undefined)
                                        dto.ixs_own = value.ixs_ref;
                                    return;
                            }
                            return "ixs_owm";
                        }
                    })
                        .addRow("jres:33000052").addField("gcheck", {
                        label: "jres:33000089", //RC 33000089 : Bez omezení
                        name: "priz_vdbr",
                        model: function (op, dto, modelOpt) {
                            switch (op) {
                                case "apply":
                                    $(this).gfield("setValue", dto.priz_vdbr == 0 ? true : false);
                                    return;
                                case "collect":
                                    dto.priz_vdbr = ($(this).gfield("getValue") == true) ? 0 : 1;
                                    return;
                            }
                            return "prizVdbr";
                        }
                    });
                    return form;
                }
                enabledFields(enabled) {
                    var fields = ["ic", "firmname", "nationality", "dbtype", "dbstate", "priz_vdbr", "ixs_own"];
                    fields.forEach((item) => {
                        this.findFields(item).gfield("option", "disabled", !enabled);
                    });
                    this.isEditmode = enabled;
                    this.actions.actSave?.update({ visible: enabled });
                    this.actions.actCancelEdit?.update({ visible: enabled });
                    this.actions.actSaveAndClose?.update({ enabled: enabled });
                    this.actions.actEdit?.update({ visible: !enabled });
                }
                updateMainGrid() {
                    if (this.gridRc != undefined) {
                        var gridEl = this.gridRc;
                        var grid = gridEl.gridInstance.element;
                        if (grid.length > 0) {
                            Gordic.Isl.GexDatoveSchranky.list({ filters: { dbid: this.model.dbid } }).getData().done((o) => {
                                if (o.length > 0) {
                                    var view = grid.ggrid("getView");
                                    var data = o[0];
                                    if (this.isNew == false)
                                        view.updateData(data, "update");
                                    else
                                        view.updateData(data, "add");
                                    grid.ggrid("setData", view);
                                }
                            });
                        }
                    }
                }
                previousAndNextAction(next) {
                    var obj;
                    if (next == true)
                        obj = this.gridRc.current().nextRow.data;
                    else
                        obj = this.gridRc.current().prevRow.data;
                    this.gridRc.move(next);
                    var gridEl = this.gridRc;
                    this.closing().done(() => {
                        this.close();
                        $.content().navigate(["Gordic.Agx.WebClient.GDataBoxDetail", { gridRc: this.gridRc, uid: "GDataBoxDetail" }], { dbid: obj.dbid, isNew: false });
                    });
                }
                createTabGroups() {
                    var tabGroups = [];
                    if (this.isNew == false) {
                        tabGroups.push({ id: "_tab-opravnene-osoby", caption: "jres:33000050" });
                        tabGroups.push({ id: "_tab-povoleni-adresati", caption: "jres:33000052" });
                    }
                    return tabGroups;
                }
                createTabs() {
                    var tabs = [];
                    if (this.isNew == false) {
                        tabs.push({
                            tabParams: {
                                id: "tab-opravnene-osoby",
                                title: "jres:33000050",
                                opened: true,
                                locked: true,
                                menuBar: ["actOpenDetailOpravneneOsoby*", "actAddOpravneneOsoby*", "actRemoveOpravnenaOsoba*"],
                                group: { id: "_tab-opravnene-osoby" }
                            },
                            init: (tab) => { this.createGridOpravneneOsoby(tab); }
                        });
                        tabs.push({
                            tabParams: {
                                id: "tab-povoleni-adresati",
                                title: "jres:33000052",
                                opened: true,
                                locked: true,
                                menuBar: ["actAddPovolenyAdresat*", "actRemovePovolenyAdresat*"],
                                group: { id: "_tab-povoleni-adresati" }
                            },
                            init: (tab) => { this.createGridPovoleniAdresati(tab); }
                        });
                    }
                    return tabs;
                }
                // OPRAVNENE OSOBY 
                createGridOpravneneOsoby(tab) {
                    this.gridOpravneneOsoby = $("<div>").appendTo(tab).ggrid({
                        columnMode: "fit",
                        defaultAction: this.actions.actOpenDetailOpravneneOsoby,
                        columns: this.createGridFormatOpravneneOsoby(),
                        cellActivate: (ev, ctx) => {
                            var cellInfo = (ctx != null && ctx.cellInfo != null && ctx.cellInfo.data != null);
                            this.actions.actOpenDetailOpravneneOsoby?.update({ enabled: cellInfo });
                            this.actions.actRemoveOpravnenaOsoba?.update({ enabled: cellInfo });
                        }
                    });
                    this.gridOpravneneOsoby.gautofit({ resizersOnTab: false });
                    this.loadOpravneneOsoby();
                }
                createGridFormatOpravneneOsoby() {
                    return new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "osoba.ixs_ref",
                        width: 75,
                        caption: "jres:33000023"
                    })
                        .addTextColumn({
                        name: "osoba.jmeno",
                        width: 75,
                        caption: "jres:33000005"
                    })
                        .addTextColumn({
                        name: "osoba.prijmeni",
                        width: 75,
                        caption: "jres:33000036"
                    })
                        .addBooleanColumn({
                        name: "privil_owner",
                        caption: "jres:33000066"
                    })
                        .addBooleanColumn({
                        name: "privil_owner_adm",
                        caption: "jres:33000074" //RC 33000074 : Spravovat DS
                    })
                        .addBooleanColumn({
                        name: "privil_read_non_personal",
                        caption: "jres:33000075" //RC 33000075 : Stahovat a číst DZ určené do vl. rukou
                    })
                        .addBooleanColumn({
                        name: "privil_read_all",
                        caption: "jres:33000076" //RC 33000076 : Stahovat a číst DZ
                    })
                        .addBooleanColumn({
                        name: "privil_create_dm",
                        caption: "jres:33000077" //RC 33000077 : Vytvářet a odesílat DZ, stahovat odeslané DZ
                    })
                        .addBooleanColumn({
                        name: "privil_view_info",
                        caption: "jres:33000078" //RC 33000078 : Načítat seznamy DZ, dodejky a doručenky
                    })
                        .addBooleanColumn({
                        name: "privil_search_db",
                        caption: "jres:33000079" //RC 33000079 : Vyhledávat DS
                    });
                }
                loadOpravneneOsoby() {
                    Gordic.Isl.GexOpravneneOsoby.list({ filters: { dbid: this.model.dbid } }).getView().done((out) => {
                        this.opraveneOsoby = out.getDataRows(false, "data");
                        if (this.gridOpravneneOsoby)
                            this.gridOpravneneOsoby.ggrid("setData", out);
                    });
                }
                addOpravneneOsoby() {
                    var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1", customClass: "add-opravnene-osoby" })
                        .addRow("jres:33000059") //RC 33000059 : Vyberte osobu
                        .addField("gselectbox", {
                        name: "selected-osoba",
                        graphicInput: "oninput",
                        validators: [
                            new Gordic.Validators.Required({ stopping: true }),
                            this.createSpecialValidator()
                        ],
                        data: Gordic.Isl.GexSouvisejiciOsoby.list().getData(),
                        dropdown: true,
                        itemTemplate: "<div class='fa fa-user minifoto'></div><b>{jmeno} {prijmeni}</b><br /><i>{mail}</i>"
                    });
                    this.dialogs.simpleForm("jres:33000060", form, null, { width: 500, height: 250 }).on("ok", (ev) => {
                        var cnt = $(ev.target);
                        var selectedOsoba = cnt.findFields("selected-osoba").gfield("getValue");
                        var gridRc = new Gordic.Components.GridRC(this.gridOpravneneOsoby);
                        $.content().navigate(["Gordic.Agx.WebClient.GOpravnenaOsobaDetail", { databox: this.model, gridRc: gridRc }], { opravnenaOsoba: { osoba: selectedOsoba }, isNew: true });
                    });
                }
                removeOpravnenaOsoba() {
                    var data = this.gridOpravneneOsoby.ggrid("activeRow");
                    if (data != null && data != undefined) {
                        if (data.privil_owner == true) {
                            this.dialogs.warning("jres:33000081", "jres:33000091"); //RC 33000091 : Nelze odebrat oprávněnou osobu, protože je majitelem datové schránky. Změťe nejdřív majitele datové schránky a opět proveďte odstranění.
                        }
                        else {
                            this.dialogs.confirm("jres:33000081", "jres:33000082".format(data.osoba.jmeno + " " + data.osoba.prijmeni, data.osoba.ixs_ref)).on("yes", () => {
                                data.aktivita = 900;
                                Gordic.Isl.GexOpravneneOsoby.upsert({ data: data }).getData().done((ret) => {
                                    this.loadOpravneneOsoby();
                                    this.notification("add", {
                                        title: "jres:33000050",
                                        content: "jres:33000083", //RC 33000083 : Oprávněná osoba byla úspěšně odebrána.
                                        state: "success",
                                        icon: "gi-gex"
                                    });
                                }).fail((err1, err2, err3) => {
                                    if (err2 === "exception")
                                        err3.handled = true;
                                    this.notification("add", {
                                        title: "jres:33000050",
                                        content: (err1.responseJSON?.exception?.baseMessage) ? err1.responseJSON?.exception?.baseMessage : "jres:33000028",
                                        state: "error",
                                        icon: "gi-gex"
                                    });
                                });
                            });
                        }
                    }
                }
                createSpecialValidator() {
                    var validator = new Gordic.Validators.Base({ message: "jres:33000061" }); //RC 33000061 : Tato osoba je již nastavená jako oprávněná osoba.
                    validator.validate = (value, source) => {
                        var res = this.opraveneOsoby.find(os => os.osoba?.ixs_ref == value.ixs_ref);
                        if (res == undefined || res == null)
                            return true;
                        return false;
                    };
                    return validator;
                }
                openDetailOpravnenaOsoba(ctx) {
                    var data;
                    if (ctx.cellInfo != undefined)
                        data = ctx.cellInfo.data;
                    else {
                        var row = this.gridOpravneneOsoby.ggrid("activeRow");
                        data = (row == null) ? undefined : row;
                    }
                    if (data != null && data != undefined) {
                        var gridRc = new Gordic.Components.GridRC(this.gridOpravneneOsoby);
                        $.content().navigate(['Gordic.Agx.WebClient.GOpravnenaOsobaDetail', { databox: this.model, gridRc: gridRc }], { opravnenaOsoba: data, isNew: false });
                    }
                }
                // END OPRAVNENE OSOBY 
                // POVOLENI ADRESATI
                createGridPovoleniAdresati(tab) {
                    this.gridPovoleniAdresati = $("<div>").appendTo(tab).ggrid({
                        columnMode: "fit",
                        columns: this.createGridFormatPovoleniAdresati(),
                        cellActivate: (ev, ctx) => {
                            var cellInfo = (ctx != null && ctx.cellInfo != null && ctx.cellInfo.data != null);
                            this.actions.actRemovePovolenyAdresat?.update({ enabled: cellInfo });
                        }
                    }).gautofit({ resizersOnTab: false });
                    this.loadPovoleniAdresati();
                }
                createGridFormatPovoleniAdresati() {
                    return new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "dbid",
                        caption: "jres:33000002"
                    })
                        .addTextColumn({
                        name: "firmname",
                        caption: "jres:33000005"
                    })
                        .addTextColumn({
                        name: "ic",
                        caption: "jres:33000006"
                    });
                }
                loadPovoleniAdresati() {
                    Gordic.Isl.GexPovoleniAdresati.list({ filters: { dbids: this.model.dbid } }).getView().done((out) => {
                        this.povoleniAdresati = out.getDataRows(false, "data");
                        this.gridPovoleniAdresati.ggrid("setData", out);
                    });
                }
                addPovolenyAdresat() {
                    Gordic.Isl.GexDatoveSchranky.list().getData().done((datoveSchranky) => {
                        var index = datoveSchranky.findIndex(o => o.dbid == this.model.dbid);
                        datoveSchranky.splice(index, 1);
                        this.povoleniAdresati.forEach((item) => {
                            datoveSchranky.findIndex(o => o.dbid == item.dbid);
                            datoveSchranky.splice(index, 1);
                        });
                        this.createDataboxSelectForm(datoveSchranky);
                    });
                }
                createDataboxSelectForm(datoveSchranky) {
                    var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                        .addRow("jres:33000049")
                        .addField("gselectbox", {
                        name: "gexdataboxselect",
                        data: datoveSchranky,
                        dropdown: true,
                        itemTemplate: "<div class='gi gi-gex minifoto'></div><b>{firmname}</b><br /><i>{dbid}</i>",
                        graphicInput: "oninput",
                        validators: [new Gordic.Validators.Required({ stopping: true })]
                    });
                    this.dialogs.simpleForm("jres:33000084", form, null, {
                        width: 500,
                        height: 250
                    }).on("ok", (ev, ctx) => {
                        var cnt = $(ev.target);
                        var databox = cnt.findFields("gexdataboxselect").gfield("getValue");
                        if (databox != null) {
                            var povolenyAdresat = {};
                            povolenyAdresat.dbidr = databox.dbid;
                            povolenyAdresat.dbids = this.model.dbid;
                            povolenyAdresat.aktivita = 100;
                            povolenyAdresat.poznamka = null;
                            Gordic.Isl.GexPovoleniAdresati.addPovolenyAdresat({ data: povolenyAdresat }).getData().done((ret) => {
                                this.notification("showToast", {
                                    title: "jres:33000052",
                                    content: "jres:33000085", //RC 33000085 : Nový povolený adresát byl úspěšně uložen.
                                    state: "success",
                                    icon: "gi-gex"
                                });
                                this.loadPovoleniAdresati();
                            }).fail((err1, err2, err) => {
                                this.notification("add", {
                                    title: "jres:33000052",
                                    content: (err1.responseJSON?.exception?.baseMessage) ? err1.responseJSON?.exception?.baseMessage : "jres:33000086", //RC 33000086 : Povolený adresát nebyl přidán.
                                    state: "error",
                                    icon: "gi-gex"
                                });
                            });
                        }
                    });
                }
                removePovolenyAdresat() {
                    var adresat = this.gridPovoleniAdresati.ggrid("activeRow");
                    if (adresat != null && adresat != undefined) {
                        var povolenyAdresat = {
                            aktivita: 900,
                            dbidr: adresat.dbid,
                            dbids: this.model.dbid,
                            poznamka: null
                        };
                        Gordic.Isl.GexPovoleniAdresati.removePovolenyAdresat({ data: povolenyAdresat }).getData().done(() => {
                            this.notification("showToast", {
                                title: "jres:33000052",
                                content: "jres:33000087", //RC 33000087 : Odebrání povoleného adresáta proběhlo úspěšně.
                                state: "success",
                                icon: "gi-gex"
                            });
                            this.loadPovoleniAdresati();
                        }).fail((err1, err2, err) => {
                            this.notification("add", {
                                title: "jres:33000052",
                                content: (err1.responseJSON?.exception?.baseMessage) ? err1.responseJSON?.exception?.baseMessage : "jres:33000088", //RC 33000088 : Odebrání povoleného adresáta neproběhlo úspěšně.
                                state: "error",
                                icon: "gi-gex"
                            });
                        });
                    }
                }
            };
            GDataBoxDetail = __decorate([
                Decorators.gcontent
            ], GDataBoxDetail);
            WebClient.GDataBoxDetail = GDataBoxDetail;
        })(WebClient = Agx.WebClient || (Agx.WebClient = {}));
    })(Agx = Gordic.Agx || (Gordic.Agx = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Agx;
    (function (Agx) {
        var WebClient;
        (function (WebClient) {
            let GDataBoxUserDetail = class GDataBoxUserDetail extends Gordic.GContentBase {
                closeDataboxUser() {
                    this.closing().done(() => {
                        this.close();
                    });
                }
                saveDataboxUser(closeAct) {
                    var form = this.findForms("databox-user-form");
                    if (form.gform("isValid")) {
                        form.findFields().gfield("model", "collect", this.model);
                        this.checkExistUser().done(() => {
                            this.beginOperation();
                            Gordic.Isl.GexSouvisejiciOsoby.upsert({ data: this.model }).getData().done((out) => {
                                form.findFields().gfield("model", "apply", out);
                                this.notification("showToast", {
                                    title: "jres:33000026", //RC 33000026 : Osoba související s datovými schránkami
                                    content: "jres:33000027", //RC 33000027 : Uložení proběhlo úspěšně
                                    state: "success",
                                    icon: "gi-gex"
                                });
                                this.enabledFields(false);
                                this.model = out;
                                this.updateMainGrid();
                                if (this.isNew == true) {
                                    this.isNew = false;
                                    this.setBreadcrumbs([{
                                            caption: "jres:33000041" //RC 33000041 : Detail uživatele
                                        }]);
                                }
                                if (closeAct == true)
                                    this.close();
                            }).fail((err1, err2, err3) => {
                                if (err2 === "exception")
                                    err3.handled = true;
                                this.notification("add", {
                                    title: "jres:33000026",
                                    content: (err1.responseJSON?.exception?.baseMessage) ? err1.responseJSON?.exception?.baseMessage : "jres:33000028", //RC 33000028 : Uložení neproběhlo správně
                                    state: "error",
                                    icon: "gi-gex"
                                });
                            })
                                .always(() => { this.endOperation(); });
                        });
                    }
                }
                onDetailBuilderInit(builder) {
                    builder.withComponent("GDataBoxUserDetail", {
                        actions: this.createActions(),
                        menuBar: this.createMenuBar(),
                        headerForm: this.createHeaderForm()
                    }, true);
                }
                onDetailBuilderBuild(builder) { }
                onContentReady() {
                    this.init();
                }
                init() {
                    if (this.isNew == false) {
                        this.isEditmode = false;
                        this.enabledFields(false);
                        this.findFields().gfield("model", "apply", this.model);
                    }
                    else {
                        this.isEditmode = true;
                    }
                    this.setBreadcrumbs([{
                            caption: (this.isNew == false) ? "jres:33000041" : "jres:33000009" //RC 33000041 : Detail uživatele
                        }]);
                }
                closing() {
                    var that = this;
                    return $.Deferred(function () {
                        var def = this;
                        if (that.isEditmode == true) {
                            GDlg.confirm("jres:33000042").on("yes", () => {
                                def.resolve();
                            }).on("no", () => {
                                def.reject();
                            });
                        }
                        else {
                            def.resolve();
                        }
                    });
                }
                cancelEdit() {
                    this.closing().done(() => {
                        if (this.isNew == false) {
                            this.close();
                            $.content().navigate(["Gordic.Agx.WebClient.GDataBoxUserDetail", { gridRc: this.gridRc, uid: "GDataBoxUserDetail" }], { ixs_ref: this.model.ixs_ref });
                        }
                        else {
                            this.close();
                        }
                    });
                }
                enabledFields(enabled) {
                    if (enabled == false) {
                        this.findFields().gfield("option", { disabled: true });
                    }
                    else {
                        this.findFormSections("ad").findFields().gfield("option", { disabled: false });
                        this.findFormSections("bi").findFields().gfield("option", { disabled: false });
                    }
                    this.isEditmode = enabled;
                    this.actions.actSaveAndClose?.update({ enabled: enabled });
                    this.actions.actEdit?.update({ visible: !enabled });
                    this.actions.actCancelEdit?.update({ visible: enabled });
                    this.actions.actSave?.update({ visible: enabled });
                }
                createActions() {
                    return {
                        actEdit: {
                            caption: "jres:33000043", //RC 33000043 : Upravit
                            icon: "gi-pencil",
                            visible: !this.isNew,
                            run: (ev, ctx) => {
                                this.enabledFields(true);
                            }
                        },
                        actCancelEdit: {
                            caption: "jres:33000044", //RC 33000044 : Ukončit editaci
                            icon: "gi-window-close",
                            visible: this.isNew,
                            run: (ev, ctx) => {
                                this.cancelEdit();
                            }
                        },
                        actSave: {
                            caption: "jres:33000045", //RC 33000045 : Uložit
                            icon: "gi-save",
                            visible: this.isNew,
                            run: (ev, ctx) => {
                                this.saveDataboxUser(false);
                            }
                        },
                        actPrevious: {
                            caption: "jres:33000056", //RC 33000056 : Předchozí
                            icon: "gi-arrow-down gi-rot180",
                            visible: (this.gridRc) ? true : false,
                            enabled: (this.gridRc) ? this.gridRc.current()?.prevRow != null : false,
                            captionVisible: "never",
                            run: (ev, ctx) => {
                                this.previousAndNextAction(false);
                            }
                        },
                        actNext: {
                            caption: "jres:33000057", //RC 33000057 : Další
                            icon: "gi-arrow-down",
                            visible: (this.gridRc) ? true : false,
                            enabled: (this.gridRc) ? this.gridRc.current()?.nextRow != null : false,
                            captionVisible: "never",
                            run: (ev, ctx) => {
                                this.previousAndNextAction(true);
                            }
                        }
                    };
                }
                createMenuBar() {
                    return [
                        { action: "actEdit", favorite: true },
                        { action: "actCancelEdit", favorite: true },
                        { action: "actSave", favorite: true },
                        { action: "actPrevious", favorite: true, align: "opposite" },
                        { action: "actNext", favorite: true, align: "opposite" },
                    ];
                }
                createHeaderForm() {
                    var form = new Gordic.Forms.Form({ name: "databox-user-form", customClass: "databox-user-form", layoutDescriptor: "L2M2S1" })
                        .addSection({ layoutDescriptor: "L-2-10-0, M-2-10-0, S-12-12-0", customClass: "w-L-12 w-M-12 w-S-12" })
                        .addRow("jres:33000010").addField("gselectbox", Gordic.Prefabs.Select.ginsref(), {
                        flag: "required",
                        name: "ixs_ref",
                        model: "model.ixs_ref=value.ixs_ref",
                        change: (ev, ctx) => {
                            if (ctx.value?.ixs_ref) {
                                Gordic.Isl.Referent.read({ ixs_ref: ctx.value?.ixs_ref }).getData().done((o) => {
                                    var form = this.findForms("databox-user-form");
                                    form.findFields("ixs_ref_id").gfield("setValue", o.ixs_ref);
                                    form.findFields("ixs_ref_email").gfield("setValue", o.mail);
                                    form.findFields("ixs_ref_poznamka").gfield("setValue", o.poznamka);
                                });
                            }
                        }
                    })
                        .addSection()
                        .addRow("jres:33000023").addField("gstringbox", {
                        disabled: true,
                        name: "ixs_ref_id"
                    })
                        .addRow("jres:33000024").addField("gstringbox", {
                        disabled: true,
                        name: "ixs_ref_email"
                    })
                        .addSection()
                        .addRow("jres:33000025").addField("gstringbox", {
                        disabled: true,
                        name: "ixs_ref_poznamka"
                    })
                        .addSection({ label: "jres:33000011", layoutDescriptor: "L2M2S1", name: "ad", customClass: "ad" }) //RC 33000011 : Adresa
                        .addRow("jres:33000012").addField("gstringbox", { name: "adstreet" }) //RC 33000012 : Ulice
                        .addRow("jres:33000013").addField("gstringbox", { name: "adnumberinstreet" }) //RC 33000013 : Č.O.
                        .addRow("jres:33000014").addField("gstringbox", { name: "adnuminmunicipalit" }) //RC 33000014 : Č.P.
                        .addRow("jres:33000015").addField("gstringbox", { name: "adcity" }) //RC 33000015 : Město
                        .addRow("jres:33000016").addField("gstringbox", { name: "adzipcode" }) //RC 33000016 : PSČ
                        .addRow("jres:33000017").addField("gstringbox", { name: "adstate" }) //RC 33000017 : Stát
                        .addSection({ label: "jres:33000018", layoutDescriptor: "L2M2S1", name: "bi", customClass: "bi" }) //RC 33000018 : Narození
                        .addRow("jres:33000019").addField("gdatebox", { name: "bidate" }) //RC 33000019 : Datum
                        .addRow("jres:33000020").addField("gstringbox", { name: "bicity" }) //RC 33000020 : Město
                        .addRow("jres:33000021").addField("gstringbox", { name: "bistate" }) //RC 33000021 : Stát
                        .addRow("jres:33000022").addField("gstringbox", { name: "bicounty" }); //RC 33000022 : Země
                    return form;
                }
                updateMainGrid() {
                    if (this.gridRc != undefined) {
                        var gridEl = this.gridRc;
                        var grid = gridEl.gridInstance.element;
                        if (grid.length > 0) {
                            Gordic.Isl.GexSouvisejiciOsoby.list({ filters: { ixs_ref: this.model.ixs_ref } }).getData().done((out) => {
                                if (out.length > 0) {
                                    var view = grid.ggrid("getView");
                                    var data = out[0];
                                    if (this.isNew == false)
                                        view.updateData(data, "update");
                                    else
                                        view.updateData(data, "add");
                                    grid.ggrid("setData", view);
                                }
                            });
                        }
                    }
                }
                checkExistUser() {
                    var that = this;
                    return $.Deferred(function () {
                        var def = this;
                        if (that.isNew == true) {
                            if (that.model.ixs_ref) {
                                Gordic.Isl.GexSouvisejiciOsoby.checkExistUser({ ixs_ref: that.model.ixs_ref }).get().then((out) => {
                                    if (out == true) {
                                        GDlg.confirm("jres:33000046".format((that.model.ixs_ref) ? that.model.ixs_ref : "")).on("yes", () => {
                                            def.resolve();
                                        }).on("no", () => {
                                            def.reject();
                                        });
                                    }
                                    else
                                        def.resolve();
                                });
                            }
                        }
                        else {
                            def.resolve();
                        }
                    });
                }
                previousAndNextAction(next) {
                    var obj;
                    if (next == true)
                        obj = this.gridRc.current().nextRow.data;
                    else
                        obj = this.gridRc.current().prevRow.data;
                    this.gridRc.move(next);
                    var gridEl = this.gridRc;
                    this.closing().done(() => {
                        this.close();
                        $.content().navigate(["Gordic.Agx.WebClient.GDataBoxUserDetail", { gridRc: gridEl, uid: "GDataBoxUserDetail" }], { ixs_ref: obj.ixs_ref });
                    });
                }
            };
            GDataBoxUserDetail = __decorate([
                Decorators.gcontent
            ], GDataBoxUserDetail);
            WebClient.GDataBoxUserDetail = GDataBoxUserDetail;
        })(WebClient = Agx.WebClient || (Agx.WebClient = {}));
    })(Agx = Gordic.Agx || (Gordic.Agx = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Agx;
    (function (Agx) {
        var WebClient;
        (function (WebClient) {
            let GOpravnenaOsobaDetail = class GOpravnenaOsobaDetail extends Gordic.GContentBase {
                saveAndClosePrivil(close) {
                    var form = this.findForms("opravnena-osoba-form");
                    form.findFormSections("privils").findFields().gfield("model", "collect", this.model);
                    //var newIxsRef = this.model.osoba?.ixs_ref;
                    this.model.dbid = this.databox.dbid;
                    if (this.databox.ixs_own == this.model.osoba?.ixs_ref || this.databox.ixs_own == null || this.model.privil_owner == false) {
                        this.model.aktivita = 100;
                        Gordic.Isl.GexOpravneneOsoby.upsert({ data: this.model }).getData().done((ret) => {
                            this.model = ret;
                            form.findFields().gfield("model", "apply", ret);
                            this.updateMainGrid();
                            this.enableFields(false);
                            //if (newIxsRef != null && newIxsRef != undefined) {
                            //    if (this.databox.ixs_own != newIxsRef) {
                            //        this.databox.ixs_own = newIxsRef;
                            //        Gordic.Isl.GexDatoveSchranky.upsert({ data: this.databox }).getData().done((dret) => {
                            //            this.databox = dret;
                            //            this.notificationSuccess();
                            //            if (close == true)
                            //                this.close()
                            //        })
                            //    } else {
                            //        this.notificationSuccess();
                            //        if (close == true)
                            //            this.close()
                            //    }
                            //} else {
                            this.notificationSuccess();
                            if (close == true)
                                this.close();
                            // }
                        });
                    }
                    else {
                        this.notification("add", {
                            title: "jres:33000050",
                            content: "jres:33000073", //RC 33000073 : Datová schránka nemůže mít dva majitele!
                            state: "error",
                            icon: "gi-gex"
                        });
                    }
                }
                closePrivilDetail() {
                    this.closing().done(() => {
                        this.close();
                    });
                }
                onContentReady() {
                    this.init();
                }
                onDetailBuilderInit(builder) {
                    builder.withComponent("GOpravnenaOsobaDetail", {
                        actions: this.createActions(),
                        headerForm: this.createHeaderForm(),
                        menuBar: this.createMenubar(),
                        statusBar: this.createStatusBar(),
                    }, true);
                }
                closing() {
                    var that = this;
                    return $.Deferred(function () {
                        var def = this;
                        if (that.isEditMode == true) {
                            GDlg.confirm("jres:33000042").on("yes", () => {
                                def.resolve();
                            }).on("no", () => {
                                def.reject();
                            });
                        }
                        else
                            def.resolve();
                    });
                }
                init() {
                    if (this.isNew == true) {
                        this.isEditMode = true;
                    }
                    else {
                        this.isEditMode = false;
                    }
                    this.setBreadcrumbs([{
                            caption: (this.isNew == true) ? "jres:33000063".format(this.databox.firmname, this.databox.ic) : "jres:33000064".format(this.databox.firmname, this.databox.ic) //RC 33000064 : Detail oprávněné osoby pro schránku: {0} ({1})
                        }]);
                    var form = this.findForms("opravnena-osoba-form");
                    new Gordic.Data.Readers.Ginsref().getData({ ixs_ref: this.model.osoba?.ixs_ref }).done((ref) => {
                        if (ref.length > 0)
                            form.findFields("osoba").gfield("setValue", ref[0]);
                    });
                    this.findFormSections("privils").findFields().gfield("model", "apply", this.model);
                    this.enableFields(this.isEditMode);
                }
                updateMainGrid() {
                    if (this.gridRc != undefined) {
                        var gridEl = this.gridRc;
                        var grid = gridEl.gridInstance.element;
                        if (grid.length > 0) {
                            var view = grid.ggrid("getView");
                            if (this.isNew == false)
                                view.updateData(this.model, "update");
                            else
                                view.updateData(this.model, "add");
                            grid.ggrid("setData", view);
                        }
                    }
                }
                enableFields(enabled) {
                    this.findForms("opravnena-osoba-form").findFormSections("privils").findFields().gfield("option", "disabled", !enabled);
                    this.actions.actSaveAndClose?.update({ enabled: enabled });
                    this.actions.actEdit?.update({ visible: !enabled });
                    this.actions.actCancelEdit?.update({ visible: enabled });
                    this.actions.actSave?.update({ visible: enabled });
                }
                createActions() {
                    return {
                        actEdit: {
                            caption: "jres:33000043",
                            icon: "gi-pencil",
                            run: (ev, ctx) => {
                                this.enableFields(true);
                            }
                        },
                        actSave: {
                            caption: "jres:33000045",
                            icon: "gi-save",
                            run: (ev, ctx) => {
                                this.saveAndClosePrivil(false);
                            }
                        },
                        actCancelEdit: {
                            caption: "jres:33000044",
                            icon: "gi-window-close",
                            visible: this.isNew,
                            run: (ev, ctx) => {
                                this.cancelEdit();
                            }
                        },
                        actPrevious: {
                            caption: "jres:33000056", //RC 33000056 : Předchozí
                            icon: "gi-arrow-down gi-rot180",
                            visible: (this.isNew == false) ? ((this.gridRc) ? true : false) : false,
                            enabled: (this.gridRc) ? this.gridRc.current()?.prevRow != null : false,
                            captionVisible: "never",
                            run: (ev, ctx) => {
                                this.previousAndNextAction(false);
                            }
                        },
                        actNext: {
                            caption: "jres:33000057", //RC 33000057 : Další
                            icon: "gi-arrow-down",
                            visible: (this.isNew == false) ? ((this.gridRc) ? true : false) : false,
                            enabled: (this.gridRc) ? this.gridRc.current()?.nextRow != null : false,
                            captionVisible: "never",
                            run: (ev, ctx) => {
                                this.previousAndNextAction(true);
                            }
                        }
                    };
                }
                createMenubar() {
                    return [
                        { action: "actEdit", favorite: true },
                        { action: "actSave", favorite: true },
                        { action: "actCancelEdit", favorite: true },
                        { action: "actPrevious", favorite: true, align: "opposite" },
                        { action: "actNext", favorite: true, align: "opposite" },
                    ];
                }
                createStatusBar() {
                    return [{
                            type: "static",
                            caption: this.model.privil_owner == true ? "jres:33000092" : "jres:33000093", //RC 33000093 : Osoba NENÍ majitelem datové schránky
                            customClass: this.model.privil_owner == true ? "g-state-text g-state-info" : "g-state-text g-state-warning"
                        }];
                }
                createHeaderForm() {
                    var form = new Gordic.Forms.Form({ customClass: "opravnena-osoba-form", name: "opravnena-osoba-form", layoutDescriptor: "L-2-8-2, M-2-8-2, S-12-12-0" })
                        .addSection({ customClass: "w-L-12 w-M-12 w-S-12", label: "jres:33000062" }) //RC 33000062 : Související osoba
                        .addRow("jres:33000010").addField("gselectbox", Gordic.Prefabs.Select.ginsref(), {
                        name: "osoba",
                        dropdown: true,
                        disabled: true,
                    })
                        .addSection({ name: "privils", customClass: "privils", label: "jres:33000065" }) //RC 33000065 : Oprávnění
                        //.addRow().addField("gcheck", { 
                        //    name: "privil_owner",
                        //    label: "jres:33000066" //RC 33000066 : Majitel DS
                        //})
                        .addRow().addField("gcheck", {
                        name: "privil_owner_adm",
                        label: "jres:33000067" //RC 33000067 : Právo spravovat DS
                    })
                        .addRow().addField("gcheck", {
                        name: "privil_read_non_personal",
                        label: "jres:33000068" //RC 33000068 : Právo stahovat a číst DZ určené do vlastních rukou
                    })
                        .addRow().addField("gcheck", {
                        name: "privil_read_all",
                        label: "jres:33000069" //RC 33000069 : Právo stahovat a číst došlé DZ
                    })
                        .addRow().addField("gcheck", {
                        name: "privil_create_dm",
                        label: "jres:33000070" //RC 33000070 : Právo vytvářet a odesílat DZ, stahovat odeslané DZ
                    })
                        .addRow().addField("gcheck", {
                        name: "privil_view_info",
                        label: "jres:33000071", //RC 33000071 : Právo načítat seznamy DZ, Dodejky a Doručenky
                    })
                        .addRow().addField("gcheck", {
                        name: "privil_search_db",
                        label: "jres:33000072" //RC 33000072 : Právo vyhledávat DS
                    });
                    return form;
                }
                notificationSuccess() {
                    if (this.isNew == true) {
                        this.isNew = false;
                        this.setBreadcrumbs([{
                                caption: "jres:33000064".format(this.databox.firmname, this.databox.ic)
                            }]);
                    }
                    this.notification("showToast", {
                        title: "jres:33000050",
                        content: "jres:33000027",
                        state: "success",
                        icon: "gi-gex"
                    });
                }
                cancelEdit() {
                    this.closing().done(() => {
                        if (this.isNew == false) {
                            this.close();
                            $.content().navigate(["Gordic.Agx.WebClient.GOpravnenaOsobaDetail", { databox: this.databox, gridRc: this.gridRc }], { opravnenaOsoba: this.model, isNew: false });
                        }
                        else
                            this.close();
                    });
                }
                previousAndNextAction(next) {
                    var obj;
                    if (next == true)
                        obj = this.gridRc.current().nextRow.data;
                    else
                        obj = this.gridRc.current().prevRow.data;
                    this.gridRc.move(next);
                    var gridEl = this.gridRc;
                    this.closing().done(() => {
                        this.close();
                        $.content().navigate(["Gordic.Agx.WebClient.GOpravnenaOsobaDetail", { databox: this.databox, gridRc: gridEl }], { opravnenaOsoba: obj, isNew: false });
                    });
                }
            };
            GOpravnenaOsobaDetail = __decorate([
                Decorators.gcontent
            ], GOpravnenaOsobaDetail);
            WebClient.GOpravnenaOsobaDetail = GOpravnenaOsobaDetail;
        })(WebClient = Agx.WebClient || (Agx.WebClient = {}));
    })(Agx = Gordic.Agx || (Gordic.Agx = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Agx;
    (function (Agx) {
        var WebClient;
        (function (WebClient) {
            let GDataBoxList = class GDataBoxList extends Gordic.GContentBase {
                onContentReady() {
                    this.init();
                }
                init() {
                    this.createActions();
                    this.createMenuBar();
                    this.initContent();
                    //this.createFilterpanel();
                    this.createGrid();
                    this.loadData();
                }
                initContent() {
                    this.setBreadcrumbs({ action: this.actions.actGotoBack });
                }
                createActions() {
                    this.actions.addRange({
                        actGotoBack: {
                            caption: "jres:33000001", //RC 33000001 : Seznam datových schránek
                            run: (ev, ctx) => {
                                this.tryCloseAllChildContents();
                            }
                        },
                        actDataboxUsers: {
                            caption: "jres:33000037", //RC 33000037 : Uživatelé datových schránek
                            icon: "gi-users",
                            run: (ev, ctx) => {
                                this.navigate("Gordic.Agx.WebClient.GDataBoxUserList");
                            }
                        },
                        actNewDatabox: {
                            caption: "jres:33000048", //RC 33000048 : Nová datová schránka
                            icon: "gi-plus",
                            run: (ev, ctx) => {
                                this.navigate(["Gordic.Agx.WebClient.GDataBoxDetail", { gridRc: new Gordic.Components.GridRC(this.grid), uid: "GDataBoxDetail" }], { dbid: null });
                            }
                        },
                        actOpenDetail: {
                            caption: "jres:33000038",
                            icon: "gi-detail",
                            run: (ev, ctx) => {
                                this.openDetail(ctx);
                            }
                        },
                        actRefrash: {
                            caption: "jres:33000047",
                            icon: "gi-refresh",
                            run: (ev, ctx) => {
                                this.loadData();
                            }
                        }
                    });
                }
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actRefrash*", "actNewDatabox*", "actOpenDetail*", "actDataboxUsers*"]));
                }
                //private createFilterpanel() {
                //    this.filter = $("<div>").appendTo(this.element).gfilterpanel({
                //        filterViewMode: FilterViewMode.Normal,
                //        forms: [this.createFilterForm()],
                //        favorites: "all",
                //        hardDefaultFilter: {
                //        },
                //        apply: (ev, data: any) => {
                //            this.loadData();
                //        }
                //    })
                //}
                createFilterForm() {
                    var form = new Gordic.Forms.Form({ name: "filter-datove-schranky", customClass: "filter-datove-schranky" });
                    return form;
                }
                createGrid() {
                    this.grid = $("<div>").appendTo(this.element).gautofit().ggrid({
                        columnMode: "fit",
                        defaultAction: this.actions.actOpenDetail,
                        columns: this.createGridFormat(),
                    });
                }
                createGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "dbid",
                        caption: "jres:33000002" //RC 33000002 : ID datové schránky
                    })
                        .addTextColumn({
                        name: "dbtype",
                        caption: "jres:33000003", //RC 33000003 : Typ datové schránky
                        cellTemplate: (row, meta) => {
                            if (row.dbtype) {
                                var txt = this.dbTypes.find(el => el.dbtype == row.dbtype)?.dbtype_txt;
                                if (txt != null && txt != undefined)
                                    return txt;
                                else
                                    return "";
                            }
                            else {
                                return "";
                            }
                        }
                    })
                        .addTextColumn({
                        name: "dbstate",
                        caption: "jres:33000004", //RC 33000004 : Status
                        cellTemplate: (row, meta) => {
                            if (row.dbstate) {
                                var txt = this.dbStates.find(el => el.dbstate == row.dbstate)?.dbstate_txt;
                                if (txt != null && txt != undefined)
                                    return txt;
                                else
                                    return "";
                            }
                            else {
                                return "";
                            }
                        }
                    })
                        .addTextColumn({
                        name: "firmname",
                        caption: "jres:33000005" //RC 33000005 : Jméno
                    })
                        .addTextColumn({
                        name: "ic",
                        caption: "jres:33000006", //RC 33000006 : IČO
                    })
                        .addTextColumn({
                        name: "nationality",
                        caption: "jres:33000007" //RC 33000007 : Národnost
                    });
                    //.addNumberColumn({
                    //    name: "priz_vdbr",
                    //    caption: "jres:33000008" //RC 33000008 : Povolené dat. schránky
                    //})
                }
                loadData() {
                    this.beginOperation();
                    Gordic.Isl.GexDatoveSchranky.list({ filters: this.currentFilter }).getView().done((o) => {
                        this.grid.ggrid("setData", o);
                    }).always(() => { this.endOperation(); });
                }
                openDetail(ctx) {
                    var data;
                    if (ctx.cellInfo != undefined)
                        data = ctx.cellInfo.data;
                    else {
                        var row = this.grid.ggrid("activeRow");
                        data = (row == null) ? undefined : row;
                    }
                    if (data != null && data != undefined) {
                        var gridRc = new Gordic.Components.GridRC(this.grid);
                        $.content().navigate(["Gordic.Agx.WebClient.GDataBoxDetail", { gridRc: gridRc, uid: "GDataBoxDetail" }], { dbid: data.dbid });
                    }
                }
            };
            GDataBoxList = __decorate([
                Decorators.gcontent
            ], GDataBoxList);
            WebClient.GDataBoxList = GDataBoxList;
        })(WebClient = Agx.WebClient || (Agx.WebClient = {}));
    })(Agx = Gordic.Agx || (Gordic.Agx = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Agx;
    (function (Agx) {
        var WebClient;
        (function (WebClient) {
            let GDataBoxUserList = class GDataBoxUserList extends Gordic.GContentBase {
                onContentReady() {
                    this.init();
                }
                init() {
                    this.createActions();
                    this.createMenubar();
                    this.initContent();
                    this.createGrid();
                    this.createSidebar();
                }
                createGrid() {
                    this.grid = $("<div>").appendTo(this.element).gautofit().ggrid({
                        columnMode: "full",
                        defaultAction: this.actions.actOpenDetail,
                        defaultProfile: {
                            sort: "prijmeni"
                        },
                        cellActivate: (ev, ctx) => {
                            if (ctx != null && ctx.cellInfo != null && ctx.cellInfo.data != null) {
                                this.previewController.enable(true);
                                this.previewController.show(ctx.cellInfo.data);
                            }
                            else {
                                this.previewController.enable(false);
                            }
                        },
                        columns: this.createGridFormat()
                    });
                    this.setDataToGrid();
                }
                createSidebar() {
                    var previewPanels = {
                        tabs: [
                            Gordic.Previews.getDefaultPreviewTab({
                                viewId: "agx:agx-user",
                            })
                        ],
                        useSubtask: false
                    };
                    this.previewController = new Gordic.Previews.GPreviewController(this.element, previewPanels);
                    this.previewController.registerPanel();
                }
                setDataToGrid() {
                    this.beginOperation();
                    Gordic.Isl.GexSouvisejiciOsoby.list().getView().done((view) => {
                        this.grid.ggrid("setData", view);
                    }).always(() => { this.endOperation(); });
                }
                createGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "ixs_ref",
                        caption: "jres:33000029" //RC 33000029 : ID osoby
                    })
                        .addTextColumn({
                        name: "jmeno",
                        caption: "jres:33000005" //RC 33000030 : Název
                    })
                        .addTextColumn({
                        name: "prijmeni",
                        caption: "jres:33000036" //RC 33000036 : Příjmení
                    })
                        .addTextColumn({
                        name: "adstreet",
                        caption: "jres:33000012"
                    })
                        .addTextColumn({
                        name: "adnumberinstreet",
                        caption: "jres:33000013"
                    })
                        .addTextColumn({
                        name: "adnuminmunicipalit",
                        caption: "jres:33000014"
                    })
                        .addTextColumn({
                        name: "adcity",
                        caption: "jres:33000015"
                    })
                        .addTextColumn({
                        name: "adzipcode",
                        caption: "jres:33000016"
                    })
                        .addTextColumn({
                        name: "adstate",
                        caption: "jres:33000017"
                    })
                        .addTextColumn({
                        name: "bidate",
                        caption: "jres:33000032" //RC 33000032 : Datum narození
                    })
                        .addTextColumn({
                        name: "bicity",
                        caption: "jres:33000033" //RC 33000033 : Místo narození
                    })
                        .addTextColumn({
                        name: "bistate",
                        caption: "jres:33000034" //RC 33000034 : Stát narození
                    })
                        .addTextColumn({
                        name: "bicounty",
                        caption: "jres:33000035" //RC 33000035 : Země narození
                    });
                }
                createActions() {
                    this.actions.addRange({
                        actGotoBack: {
                            caption: "jres:33000037", //RC 33000001 : Seznam datových schránek
                            run: (ev, ctx) => {
                                this.tryCloseAllChildContents();
                            }
                        },
                        actNewDataboxUser: {
                            caption: "jres:33000009",
                            icon: "gi-plus",
                            run: (ev, ctx) => {
                                var gridRc = new Gordic.Components.GridRC(this.grid);
                                this.navigate(["Gordic.Agx.WebClient.GDataBoxUserDetail", { gridRc: gridRc, uid: "GDataBoxUserDetail" }]);
                            }
                        },
                        actOpenDetail: {
                            caption: "jres:33000038", //RC 33000038 : Otevřít
                            icon: "gi-detail",
                            run: (ev, ctx) => {
                                this.openDetail(ctx);
                            }
                        },
                        actRefresh: {
                            caption: "jres:33000047", //RC 33000047 : Obnovit
                            icon: "gi-refresh",
                            run: (ev, ctx) => {
                                this.setDataToGrid();
                            }
                        }
                    });
                }
                createMenubar() {
                    this.menuBar(this.actions.createBar(["actRefresh*", "actOpenDetail*", "actNewDataboxUser*"]));
                }
                initContent() {
                    this.setBreadcrumbs({ action: this.actions.actGotoBack });
                }
                openDetail(ctx) {
                    var data;
                    if (ctx.cellInfo != undefined)
                        data = ctx.cellInfo.data;
                    else {
                        var row = this.grid.ggrid("activeRow");
                        data = (row == null) ? undefined : row;
                    }
                    if (data != null && data != undefined) {
                        var gridRc = new Gordic.Components.GridRC(this.grid);
                        $.content().navigate(["Gordic.Agx.WebClient.GDataBoxUserDetail", { gridRc: gridRc, uid: "GDataBoxUserDetail" }], { ixs_ref: data.ixs_ref });
                    }
                }
            };
            GDataBoxUserList = __decorate([
                Decorators.gcontent
            ], GDataBoxUserList);
            WebClient.GDataBoxUserList = GDataBoxUserList;
        })(WebClient = Agx.WebClient || (Agx.WebClient = {}));
    })(Agx = Gordic.Agx || (Gordic.Agx = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Agx;
    (function (Agx) {
        var WebClient;
        (function (WebClient) {
            var Forms;
            (function (Forms) {
                function CreateAgxUserPreviewForm() {
                    return new Gordic.Forms.Form({ name: "agx-previews-form" })
                        .addRow("jres:33000029").addField("gstaticfield", { name: "ixs_ref" })
                        .addRow("jres:33000005").addField("gstaticfield", { name: "jmeno" })
                        .addRow("jres:33000036").addField("gstaticfield", { name: "prijmeni" })
                        .addRow("jres:33000012").addField("gstaticfield", { name: "adstreet" })
                        .addRow("jres:33000013").addField("gstaticfield", { name: "adnumberinstreet" })
                        .addRow("jres:33000014").addField("gstaticfield", { name: "adnuminmunicipalit" })
                        .addRow("jres:33000015").addField("gstaticfield", { name: "adcity" })
                        .addRow("jres:33000016").addField("gstaticfield", { name: "adzipcode" })
                        .addRow("jres:33000017").addField("gstaticfield", { name: "adstate" })
                        .addRow("jres:33000032").addField("gstaticfield", { name: "bidate" })
                        .addRow("jres:33000033").addField("gstaticfield", { name: "bicity" })
                        .addRow("jres:33000034").addField("gstaticfield", { name: "bistate" })
                        .addRow("jres:33000035").addField("gstaticfield", { name: "bicounty" });
                }
                Forms.CreateAgxUserPreviewForm = CreateAgxUserPreviewForm;
            })(Forms = WebClient.Forms || (WebClient.Forms = {}));
        })(WebClient = Agx.WebClient || (Agx.WebClient = {}));
    })(Agx = Gordic.Agx || (Gordic.Agx = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWd4LndlYmNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIuL0Vrby8iLCJzb3VyY2VzIjpbIkRldGFpbC9HRGF0YUJveERldGFpbC50cyIsIkRldGFpbC9HRGF0YUJveFVzZXJEZXRhaWwudHMiLCJEZXRhaWwvR09wcmF2bmVuYU9zb2JhRGV0YWlsLnRzIiwiTGlzdC9HRGF0YUJveExpc3QudHMiLCJMaXN0L0dEYXRhQm94VXNlckxpc3QudHMiLCJQcmV2aWV3L2FneC5wcmV2aWV3LWZvcm1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0EycUJmO0FBM3FCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EycUJuQjtJQTNxQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTJxQjdCO1FBM3FCb0IsV0FBQSxTQUFTO1lBRTFCLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxPQUFBLFlBQVk7Z0JBYzVDLGNBQWM7b0JBQ1YsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELG1CQUFtQixDQUFDLFFBQWlCO29CQUNqQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUMxQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDekQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO3dCQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs0QkFDN0UsSUFB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XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEYXRhQm94RGV0YWlsIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBwcml2YXRlIG1vZGVsOiBHb3JkaWMuR2V4LkludGVyZmFjZS5HR2V4c2Rib0R0bztcclxuICAgICAgICBwcml2YXRlIGlzTmV3OiBib29sZWFuO1xyXG4gICAgICAgIHByaXZhdGUgaXNFZGl0bW9kZTogYm9vbGVhbjtcclxuICAgICAgICBwcml2YXRlIGdyaWRSYzogR29yZGljLkNvbXBvbmVudHMuR3JpZFJDPGFueT47XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkT3ByYXZuZW5lT3NvYnk6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkUG92b2xlbmlBZHJlc2F0aTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIG9wcmF2ZW5lT3NvYnk6IEdleC5JbnRlcmZhY2UuR09wcmF2bmVuYU9zb2JhRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSBwb3ZvbGVuaUFkcmVzYXRpOiBHZXguSW50ZXJmYWNlLkdHZXhzZGJvRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50T3duZXI6IEdleC5JbnRlcmZhY2UuR0dleHNkYnJHaW5zcmVmRHRvIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIHByaXZhdGUgb3ByYXZuZW5hb3NvYmFUbXA6IEdleC5JbnRlcmZhY2UuR09wcmF2bmVuYU9zb2JhRHRvO1xyXG4gICAgICAgIHByaXZhdGUgc291dmlzZWppY2lPc29ieTogR2V4LkludGVyZmFjZS5HR2V4c2RickdpbnNyZWZEdG9bXTtcclxuICAgICAgICBwcml2YXRlIHByZXZpZXdDb250cm9sbGVyOiBhbnk7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNhdmVBbmRDbG9zZURhdGFib3goY2xvc2VBY3Q6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGlzLmZpbmRGb3JtcyhcImRhdGFib3gtZm9ybVwiKTtcclxuICAgICAgICAgICAgaWYgKGZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgdGhpcy5tb2RlbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuSXNsLkdleERhdG92ZVNjaHJhbmt5LnVwc2VydCh7IGRhdGE6IHRoaXMubW9kZWwgfSkuZ2V0RGF0YSgpLmRvbmUoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXQuaXhzX293biAhPSBudWxsICYmIHJldC5peHNfb3duICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRPd25lciA9IHRoaXMuc291dmlzZWppY2lPc29ieS5maW5kKGl0ZW0gPT4gaXRlbS5peHNfcmVmID09IHJldC5peHNfb3duKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24oXCJzaG93VG9hc3RcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzMDAwMDQ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwianJlczozMzAwMDAyN1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZ2V4XCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlZEZpZWxkcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbCA9IHJldDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1haW5HcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3ByYXZlbmVPc29ieSAhPSBudWxsICYmIHRoaXMub3ByYXZlbmVPc29ieSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG93bmVyID0gdGhpcy5vcHJhdmVuZU9zb2J5LmZpbmQoaXRlbSA9PiBpdGVtLml4c19yZWYgPT0gdGhpcy5tb2RlbC5peHNfb3duKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG93bmVyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZE93bmVyVG9PcHJhdm5lbmFPc29iYShjbG9zZUFjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZE9wcmF2bmVuZU9zb2J5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkT3duZXJUb09wcmF2bmVuYU9zb2JhKGNsb3NlQWN0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VBY3QgPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNOZXcgPT0gdHJ1ZSAmJiBjbG9zZUFjdCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudCgpLm5hdmlnYXRlKFtcIkdvcmRpYy5BZ3guV2ViQ2xpZW50LkdEYXRhQm94RGV0YWlsXCIsIHsgLypncmlkUmM6IHRoaXMuZ3JpZFJjLCovIHVpZDogXCJHRGF0YUJveERldGFpbFwiIH1dLCB7IGRiaWQ6IHRoaXMubW9kZWwuZGJpZCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc05ldyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNOZXcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0R290b0JhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuZmFpbCgoZXJyMSwgZXJyMiwgZXJyMykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIyID09PSBcImV4Y2VwdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIzLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uKFwiYWRkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzAwMDA0OVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAoZXJyMS5yZXNwb25zZUpTT04/LmV4Y2VwdGlvbj8uYmFzZU1lc3NhZ2UpID8gZXJyMS5yZXNwb25zZUpTT04/LmV4Y2VwdGlvbj8uYmFzZU1lc3NhZ2UgOiBcImpyZXM6MzMwMDAwMjhcIiwgLy9SQyAzMzAwMDAyOCA6IFVsb8W+ZW7DrSBuZXByb2LEm2hsbyBzcHLDoXZuxJtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1nZXhcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGFkZE93bmVyVG9PcHJhdm5lbmFPc29iYShjbG9zZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLm9wcmF2bmVuYW9zb2JhVG1wLm9zb2JhID0gdGhpcy5jdXJyZW50T3duZXI7XHJcbiAgICAgICAgICAgIHRoaXMub3ByYXZuZW5hb3NvYmFUbXAuZGJpZCA9IHRoaXMubW9kZWwuZGJpZDtcclxuICAgICAgICAgICAgdGhpcy5vcHJhdm5lbmFvc29iYVRtcC5wcml2aWxfb3duZXJfYWRtID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMub3ByYXZuZW5hb3NvYmFUbXAucHJpdmlsX3JlYWRfbm9uX3BlcnNvbmFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMub3ByYXZuZW5hb3NvYmFUbXAucHJpdmlsX3JlYWRfYWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMub3ByYXZuZW5hb3NvYmFUbXAucHJpdmlsX2NyZWF0ZV9kbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm9wcmF2bmVuYW9zb2JhVG1wLnByaXZpbF92aWV3X2luZm8gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5vcHJhdm5lbmFvc29iYVRtcC5wcml2aWxfc2VhcmNoX2RiID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Jc2wuR2V4T3ByYXZuZW5lT3NvYnkudXBzZXJ0KHsgZGF0YTogdGhpcy5vcHJhdm5lbmFvc29iYVRtcCB9KS5nZXREYXRhKCkuZG9uZSgocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xvc2UgPT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkT3ByYXZuZW5lT3NvYnkoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsb3NlRGF0YWJveERldGFpbCgpIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zaW5nKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ByYXZlbmVPc29ieSA9IFtdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc05ldyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0VkaXRtb2RlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZWRGaWVsZHMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLm1vZGVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRWRpdG1vZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RHb3RvQmFja1xyXG4gICAgICAgICAgICB9XSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbG9zaW5nKCk6IEpRdWVyeS5EZWZlcnJlZDxhbnksIGFueSwgYW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5pc0VkaXRtb2RlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBHRGxnLmNvbmZpcm0oXCJqcmVzOjMzMDAwMDQyXCIpLm9uKFwieWVzXCIsICgpID0+IHsgLy9SQyAzMzAwMDA0MiA6IE9wcmF2ZHUgY2hjZXRlIG9wdXN0aXQgZGV0YWlsIGJleiB1bG/FvmVuw60/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkub24oXCJub1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2FuY2VsRWRpdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zaW5nKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc05ldyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5uYXZpZ2F0ZShbXCJHb3JkaWMuQWd4LldlYkNsaWVudC5HRGF0YUJveERldGFpbFwiLCB7IGdyaWRSYzogdGhpcy5ncmlkUmMsIHVpZDogXCJHRGF0YUJveERldGFpbFwiIH1dLCB7IGRiaWQ6IHRoaXMubW9kZWwuZGJpZCB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVySW5pdChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpIHtcclxuICAgICAgICAgICAgYnVpbGRlci53aXRoQ29tcG9uZW50PHRoaXM+KFwiR0RhdGFCb3hEZXRhaWxcIiwge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uczogdGhpcy5jcmVhdGVBY3Rpb25zKCksXHJcbiAgICAgICAgICAgICAgICBtZW51QmFyOiB0aGlzLmNyZWF0ZU1lbnVCYXIoKSxcclxuICAgICAgICAgICAgICAgIGhlYWRlckZvcm06IHRoaXMuY3JlYXRlRm9ybSgpLFxyXG4gICAgICAgICAgICAgICAgdGFiR3JvdXBzOiB0aGlzLmNyZWF0ZVRhYkdyb3VwcygpLFxyXG4gICAgICAgICAgICAgICAgdGFiczogdGhpcy5jcmVhdGVUYWJzKCksXHJcbiAgICAgICAgICAgIH0sIHRydWUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJCdWlsZChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpIHsgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogT2JqZWN0TGl0ZXJhbDxHQWN0aW9uUGFyYW1zRGVmT2JqPiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBhY3RHb3RvQmFjazoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246ICh0aGlzLmlzTmV3ID09IGZhbHNlKSA/IFwianJlczozMzAwMDA1NVwiIDogXCJqcmVzOjMzMDAwMDQ4XCIsIC8vUkMgMzMwMDAwNTUgOiBEZXRhaWwgZGF0b3bDqSBzY2hyw6Fua3lcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2VBbGxDaGlsZENvbnRlbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdEVkaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNDNcIiwgLy9SQyAzMzAwMDA0MyA6IFVwcmF2aXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBlbmNpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6ICF0aGlzLmlzTmV3LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmFibGVkRmllbGRzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RTYXZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDQ1XCIsIC8vUkMgMzMwMDAwNDUgOiBVbG/Fvml0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhpcy5pc05ldyxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZUFuZENsb3NlRGF0YWJveChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdENhbmNlbEVkaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNDRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoaXMuaXNOZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbEVkaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UHJldmlvdXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNTZcIiwgLy9SQyAzMzAwMDA1NiA6IFDFmWVkY2hvesOtXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1hcnJvdy1kb3duIGdpLXJvdDE4MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6ICh0aGlzLmdyaWRSYykgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogKHRoaXMuZ3JpZFJjKSA/IHRoaXMuZ3JpZFJjLmN1cnJlbnQoKT8ucHJldlJvdyAhPSBudWxsIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IFwibmV2ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNBbmROZXh0QWN0aW9uKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0TmV4dDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA1N1wiLCAvL1JDIDMzMDAwMDU3IDogRGFsxaHDrVxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktYXJyb3ctZG93blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6ICh0aGlzLmdyaWRSYykgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogKHRoaXMuZ3JpZFJjKSA/IHRoaXMuZ3JpZFJjLmN1cnJlbnQoKT8ubmV4dFJvdyAhPSBudWxsIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IFwibmV2ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNBbmROZXh0QWN0aW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RBZGRPcHJhdm5lbmVPc29ieToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA1OFwiLCAvL1JDIDMzMDAwMDU4IDogUMWZaWRhdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRPcHJhdm5lbmVPc29ieSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RSZW1vdmVPcHJhdm5lbmFPc29iYToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA4MFwiLCAvL1JDIDMzMDAwMDgwIDogT2RlYnJhdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktbWludXNcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlT3ByYXZuZW5hT3NvYmEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0T3BlbkRldGFpbE9wcmF2bmVuZU9zb2J5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDM4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRldGFpbE9wcmF2bmVuYU9zb2JhKGN0eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdEFkZFBvdm9sZW55QWRyZXNhdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA1OFwiLCAvL1JDIDMzMDAwMDU4IDogUMWZaWRhdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQb3ZvbGVueUFkcmVzYXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UmVtb3ZlUG92b2xlbnlBZHJlc2F0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDgwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1taW51c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVQb3ZvbGVueUFkcmVzYXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudUJhcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBcImFjdEVkaXRcIiwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBcImFjdFNhdmVcIiwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBcImFjdENhbmNlbEVkaXRcIiwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBcImFjdFByZXZpb3VzXCIsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogXCJhY3ROZXh0XCIsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImRhdGFib3gtZm9ybVwiLCBjdXN0b21DbGFzczogXCJkYXRhYm94LXVzZXJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMzMDAwMDQ5XCIpIC8vUkMgMzMwMDAwNDkgOiBEYXRvdsOhIHNjaHLDoW5rYVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwMjNcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRiaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDA1XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcigyNTQpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlybW5hbWVcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogMSwgbWF4OiAyNTQsIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDA2XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcigyNTQpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWNcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogMSwgbWF4OiAyNTQsIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDA3XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcigyNTQpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF0aW9uYWxpdHlcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogMSwgbWF4OiAyNTQsIHN0b3BwaW5nOiB0cnVlIH0pXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDAzXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2V4Y2RidCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGJ0eXBlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuZGJ0eXBlPXZhbHVlLmRidHlwZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoeyBzdG9wcGluZzogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAwNFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdleGNkYnMoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRic3RhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5kYnN0YXRlPXZhbHVlLmRic3RhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHsgc3RvcHBpbmc6IHRydWUgfSldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwOTBcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgLy9SQyAzMzAwMDA5MCA6IE1haml0ZWwgZGF0b3bDqSBzY2hyw6Fua3lcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19vd25cIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7IHN0b3BwaW5nOiB0cnVlIH0pXSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBHb3JkaWMuSXNsLkdleFNvdXZpc2VqaWNpT3NvYnkubGlzdCgpLmdldERhdGEoKSxcclxuICAgICAgICAgICAgICAgICAgICBncmFwaGljSW5wdXQ6IFwib25pbnB1dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPSdmYSBmYS11c2VyIG1pbmlmb3RvJz48L2Rpdj48Yj57am1lbm99IHtwcmlqbWVuaX08L2I+PGJyIC8+PGk+e21haWx9PC9pPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3AsIGR0bywgbW9kZWxPcHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9zb2JhID0gX3RoaXMuc291dmlzZWppY2lPc29ieS5maW5kKGl0ZW0gPT4gaXRlbS5peHNfcmVmID09IGR0by5peHNfb3duKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldFZhbHVlXCIsIChvc29iYSAhPSBudWxsICYmIG9zb2JhICE9IHVuZGVmaW5lZCkgPyBvc29iYSA6IG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gJCh0aGlzKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uaXhzX293biA9IHZhbHVlLml4c19yZWZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiaXhzX293bVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwNTJcIikuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzMwMDAwODlcIiwgLy9SQyAzMzAwMDA4OSA6IEJleiBvbWV6ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpel92ZGJyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcCwgZHRvLCBtb2RlbE9wdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldFZhbHVlXCIsIGR0by5wcml6X3ZkYnIgPT0gMCA/IHRydWUgOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8ucHJpel92ZGJyID0gKCQodGhpcykuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPT0gdHJ1ZSkgPyAwIDogMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwicHJpelZkYnJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGVkRmllbGRzKGVuYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdmFyIGZpZWxkcyA9IFtcImljXCIsIFwiZmlybW5hbWVcIiwgXCJuYXRpb25hbGl0eVwiLCBcImRidHlwZVwiLCBcImRic3RhdGVcIiwgXCJwcml6X3ZkYnJcIiwgXCJpeHNfb3duXCJdO1xyXG4gICAgICAgICAgICBmaWVsZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKGl0ZW0pLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICFlbmFibGVkKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5pc0VkaXRtb2RlID0gZW5hYmxlZDtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFNhdmU/LnVwZGF0ZSh7IHZpc2libGU6IGVuYWJsZWQgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RDYW5jZWxFZGl0Py51cGRhdGUoeyB2aXNpYmxlOiBlbmFibGVkIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0U2F2ZUFuZENsb3NlPy51cGRhdGUoeyBlbmFibGVkOiBlbmFibGVkIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RWRpdD8udXBkYXRlKHsgdmlzaWJsZTogIWVuYWJsZWQgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlTWFpbkdyaWQoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdyaWRSYyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBncmlkRWwgPSB0aGlzLmdyaWRSYyBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ3JpZCA9IGdyaWRFbC5ncmlkSW5zdGFuY2UuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIGlmIChncmlkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuSXNsLkdleERhdG92ZVNjaHJhbmt5Lmxpc3QoeyBmaWx0ZXJzOiB7IGRiaWQ6IHRoaXMubW9kZWwuZGJpZCB9IH0pLmdldERhdGEoKS5kb25lKChvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3OiBHb3JkaWMuRGF0YS5WaWV3ID0gZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG9bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc05ldyA9PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZURhdGEoZGF0YSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy51cGRhdGVEYXRhKGRhdGEsIFwiYWRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHByZXZpb3VzQW5kTmV4dEFjdGlvbihuZXh0OiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmo6IGFueTtcclxuICAgICAgICAgICAgaWYgKG5leHQgPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIG9iaiA9IHRoaXMuZ3JpZFJjLmN1cnJlbnQoKS5uZXh0Um93LmRhdGE7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG9iaiA9IHRoaXMuZ3JpZFJjLmN1cnJlbnQoKS5wcmV2Um93LmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZFJjLm1vdmUobmV4dCk7XHJcbiAgICAgICAgICAgIHZhciBncmlkRWwgPSB0aGlzLmdyaWRSYyBhcyBhbnk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2luZygpLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgJC5jb250ZW50KCkubmF2aWdhdGUoW1wiR29yZGljLkFneC5XZWJDbGllbnQuR0RhdGFCb3hEZXRhaWxcIiwgeyBncmlkUmM6IHRoaXMuZ3JpZFJjLCB1aWQ6IFwiR0RhdGFCb3hEZXRhaWxcIiB9XSwgeyBkYmlkOiBvYmouZGJpZCwgaXNOZXc6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVUYWJHcm91cHMoKTogSUdUYWJHcm91cE9wdGlvbnNbXSB7XHJcbiAgICAgICAgICAgIHZhciB0YWJHcm91cHM6IElHVGFiR3JvdXBPcHRpb25zW10gPSBbXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNOZXcgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRhYkdyb3Vwcy5wdXNoKHsgaWQ6IFwiX3RhYi1vcHJhdm5lbmUtb3NvYnlcIiwgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDUwXCIgfSlcclxuICAgICAgICAgICAgICAgIHRhYkdyb3Vwcy5wdXNoKHsgaWQ6IFwiX3RhYi1wb3ZvbGVuaS1hZHJlc2F0aVwiLCBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNTJcIiB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0YWJHcm91cHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVRhYnMoKTogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLlRhYlBhcmFtc0lkW10ge1xyXG4gICAgICAgICAgICB2YXIgdGFiczogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLlRhYlBhcmFtc0lkW10gPSBbXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNOZXcgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRhYnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRhYi1vcHJhdm5lbmUtb3NvYnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzAwMDA1MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogW1wiYWN0T3BlbkRldGFpbE9wcmF2bmVuZU9zb2J5KlwiLCBcImFjdEFkZE9wcmF2bmVuZU9zb2J5KlwiLCBcImFjdFJlbW92ZU9wcmF2bmVuYU9zb2JhKlwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiX3RhYi1vcHJhdm5lbmUtb3NvYnlcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0OiAodGFiKSA9PiB7IHRoaXMuY3JlYXRlR3JpZE9wcmF2bmVuZU9zb2J5KHRhYikgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRhYnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRhYi1wb3ZvbGVuaS1hZHJlc2F0aVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzMDAwMDUyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbXCJhY3RBZGRQb3ZvbGVueUFkcmVzYXQqXCIsIFwiYWN0UmVtb3ZlUG92b2xlbnlBZHJlc2F0KlwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiX3RhYi1wb3ZvbGVuaS1hZHJlc2F0aVwiIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXQ6ICh0YWIpID0+IHsgdGhpcy5jcmVhdGVHcmlkUG92b2xlbmlBZHJlc2F0aSh0YWIpIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRhYnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPUFJBVk5FTkUgT1NPQlkgXHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZE9wcmF2bmVuZU9zb2J5KHRhYikge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRPcHJhdm5lbmVPc29ieSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0YWIpLmdncmlkKHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0T3BlbkRldGFpbE9wcmF2bmVuZU9zb2J5LFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0T3ByYXZuZW5lT3NvYnkoKSxcclxuICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2VsbEluZm8gPSAoY3R4ICE9IG51bGwgJiYgY3R4LmNlbGxJbmZvICE9IG51bGwgJiYgY3R4LmNlbGxJbmZvLmRhdGEgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0T3BlbkRldGFpbE9wcmF2bmVuZU9zb2J5Py51cGRhdGUoeyBlbmFibGVkOiBjZWxsSW5mbyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RSZW1vdmVPcHJhdm5lbmFPc29iYT8udXBkYXRlKHsgZW5hYmxlZDogY2VsbEluZm8gfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5ncmlkT3ByYXZuZW5lT3NvYnkuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRPcHJhdm5lbmVPc29ieSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0T3ByYXZuZW5lT3NvYnkoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJvc29iYS5peHNfcmVmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDc1LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAyM1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib3NvYmEuam1lbm9cIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDA1XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJvc29iYS5wcmlqbWVuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3NSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMzZcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRCb29sZWFuQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaXZpbF9vd25lclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA2NlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEJvb2xlYW5Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpdmlsX293bmVyX2FkbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA3NFwiIC8vUkMgMzMwMDAwNzQgOiBTcHJhdm92YXQgRFNcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQm9vbGVhbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml2aWxfcmVhZF9ub25fcGVyc29uYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNzVcIiAvL1JDIDMzMDAwMDc1IDogU3RhaG92YXQgYSDEjcOtc3QgRFogdXLEjWVuw6kgZG8gdmwuIHJ1a291XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEJvb2xlYW5Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpdmlsX3JlYWRfYWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDc2XCIgLy9SQyAzMzAwMDA3NiA6IFN0YWhvdmF0IGEgxI3DrXN0IERaXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEJvb2xlYW5Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpdmlsX2NyZWF0ZV9kbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA3N1wiIC8vUkMgMzMwMDAwNzcgOiBWeXR2w6HFmWV0IGEgb2Rlc8OtbGF0IERaLCBzdGFob3ZhdCBvZGVzbGFuw6kgRFpcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQm9vbGVhbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml2aWxfdmlld19pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDc4XCIgLy9SQyAzMzAwMDA3OCA6IE5hxI3DrXRhdCBzZXpuYW15IERaLCBkb2Rlamt5IGEgZG9ydcSNZW5reVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRCb29sZWFuQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaXZpbF9zZWFyY2hfZGJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNzlcIiAvL1JDIDMzMDAwMDc5IDogVnlobGVkw6F2YXQgRFNcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGxvYWRPcHJhdm5lbmVPc29ieSgpIHtcclxuICAgICAgICAgICAgR29yZGljLklzbC5HZXhPcHJhdm5lbmVPc29ieS5saXN0KHsgZmlsdGVyczogeyBkYmlkOiB0aGlzLm1vZGVsLmRiaWQgfSB9KS5nZXRWaWV3KCkuZG9uZSgob3V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wcmF2ZW5lT3NvYnkgPSBvdXQuZ2V0RGF0YVJvd3MoZmFsc2UsIFwiZGF0YVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyaWRPcHJhdm5lbmVPc29ieSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRPcHJhdm5lbmVPc29ieS5nZ3JpZChcInNldERhdGFcIiwgb3V0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGFkZE9wcmF2bmVuZU9zb2J5KCkge1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIsIGN1c3RvbUNsYXNzOiBcImFkZC1vcHJhdm5lbmUtb3NvYnlcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwNTlcIikgLy9SQyAzMzAwMDA1OSA6IFZ5YmVydGUgb3NvYnVcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2VsZWN0ZWQtb3NvYmFcIixcclxuICAgICAgICAgICAgICAgICAgICBncmFwaGljSW5wdXQ6IFwib25pbnB1dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHsgc3RvcHBpbmc6IHRydWUgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU3BlY2lhbFZhbGlkYXRvcigpXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBHb3JkaWMuSXNsLkdleFNvdXZpc2VqaWNpT3NvYnkubGlzdCgpLmdldERhdGEoKSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0nZmEgZmEtdXNlciBtaW5pZm90byc+PC9kaXY+PGI+e2ptZW5vfSB7cHJpam1lbml9PC9iPjxiciAvPjxpPnttYWlsfTwvaT5cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNpbXBsZUZvcm0oXCJqcmVzOjMzMDAwMDYwXCIsIGZvcm0sIG51bGwsIHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiAyNTAgfSkub24oXCJva1wiLCAoZXYpID0+IHsgLy9SQyAzMzAwMDA2MCA6IFZ5YmVydGUgbm92b3Ugb3Byw6F2bsSbbm91IG9zb2J1XHJcbiAgICAgICAgICAgICAgICB2YXIgY250ID0gJChldi50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkT3NvYmE6IEdleC5JbnRlcmZhY2UuR0dleHNkYnJHaW5zcmVmRHRvID0gY250LmZpbmRGaWVsZHMoXCJzZWxlY3RlZC1vc29iYVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBncmlkUmMgPSBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoaXMuZ3JpZE9wcmF2bmVuZU9zb2J5KTtcclxuICAgICAgICAgICAgICAgICQuY29udGVudCgpLm5hdmlnYXRlKFtcIkdvcmRpYy5BZ3guV2ViQ2xpZW50LkdPcHJhdm5lbmFPc29iYURldGFpbFwiLCB7IGRhdGFib3g6IHRoaXMubW9kZWwsIGdyaWRSYzogZ3JpZFJjIH1dLCB7IG9wcmF2bmVuYU9zb2JhOiB7IG9zb2JhOiBzZWxlY3RlZE9zb2JhIH0sIGlzTmV3OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZW1vdmVPcHJhdm5lbmFPc29iYSgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmdyaWRPcHJhdm5lbmVPc29ieS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCAmJiBkYXRhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucHJpdmlsX293bmVyID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3Mud2FybmluZyhcImpyZXM6MzMwMDAwODFcIiwgXCJqcmVzOjMzMDAwMDkxXCIpIC8vUkMgMzMwMDAwOTEgOiBOZWx6ZSBvZGVicmF0IG9wcsOhdm7Em25vdSBvc29idSwgcHJvdG/FvmUgamUgbWFqaXRlbGVtIGRhdG92w6kgc2NocsOhbmt5LiBabcSbxaVlIG5lamTFmcOtdiBtYWppdGVsZSBkYXRvdsOpIHNjaHLDoW5reSBhIG9wxJt0IHByb3ZlxI90ZSBvZHN0cmFuxJtuw60uXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwianJlczozMzAwMDA4MVwiLCBcImpyZXM6MzMwMDAwODJcIi5mb3JtYXQoZGF0YS5vc29iYS5qbWVubyArIFwiIFwiICsgZGF0YS5vc29iYS5wcmlqbWVuaSwgZGF0YS5vc29iYS5peHNfcmVmKSkub24oXCJ5ZXNcIiwgKCkgPT4geyAvL1JDIDMzMDAwMDgyIDogT3ByYXZkdSBzaSBwxZllamV0ZSBvZGVicmF0IG9wcsOhdm7Em25vdSBvc29idSA8Yj57MH0gKHsxfSk8L2I+P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmFrdGl2aXRhID0gOTAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuSXNsLkdleE9wcmF2bmVuZU9zb2J5LnVwc2VydCh7IGRhdGE6IGRhdGEgfSkuZ2V0RGF0YSgpLmRvbmUoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkT3ByYXZuZW5lT3NvYnkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uKFwiYWRkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzMDAwMDUwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJqcmVzOjMzMDAwMDgzXCIsIC8vUkMgMzMwMDAwODMgOiBPcHLDoXZuxJtuw6Egb3NvYmEgYnlsYSDDunNwxJvFoW7EmyBvZGVicsOhbmEuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZ2V4XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoKGVycjEsIGVycjIsIGVycjMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIyID09PSBcImV4Y2VwdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycjMuaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbihcImFkZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzAwMDA1MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IChlcnIxLnJlc3BvbnNlSlNPTj8uZXhjZXB0aW9uPy5iYXNlTWVzc2FnZSkgPyBlcnIxLnJlc3BvbnNlSlNPTj8uZXhjZXB0aW9uPy5iYXNlTWVzc2FnZSA6IFwianJlczozMzAwMDAyOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBcImVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1nZXhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVNwZWNpYWxWYWxpZGF0b3IoKTogR29yZGljLlZhbGlkYXRvcnMuVmFsaWRhdG9yPEdvcmRpYy5WYWxpZGF0b3JzLlZhbGlkYXRvck9wdGlvbnM+IHtcclxuICAgICAgICAgICAgdmFyIHZhbGlkYXRvciA9IG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHsgbWVzc2FnZTogXCJqcmVzOjMzMDAwMDYxXCIgfSkgLy9SQyAzMzAwMDA2MSA6IFRhdG8gb3NvYmEgamUgamnFviBuYXN0YXZlbsOhIGpha28gb3Byw6F2bsSbbsOhIG9zb2JhLlxyXG4gICAgICAgICAgICB2YWxpZGF0b3IudmFsaWRhdGUgPSAodmFsdWUsIHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlcyA9IHRoaXMub3ByYXZlbmVPc29ieS5maW5kKG9zID0+IG9zLm9zb2JhPy5peHNfcmVmID09IHZhbHVlLml4c19yZWYpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyA9PSB1bmRlZmluZWQgfHwgcmVzID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb3BlbkRldGFpbE9wcmF2bmVuYU9zb2JhKGN0eCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YTogR29yZGljLkdleC5JbnRlcmZhY2UuR09wcmF2bmVuYU9zb2JhRHRvO1xyXG4gICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvICE9IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gdGhpcy5ncmlkT3ByYXZuZW5lT3NvYnkuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gKHJvdyA9PSBudWxsKSA/IHVuZGVmaW5lZCA6IHJvdztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsICYmIGRhdGEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ3JpZFJjID0gbmV3IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQyh0aGlzLmdyaWRPcHJhdm5lbmVPc29ieSk7XHJcbiAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5uYXZpZ2F0ZShbJ0dvcmRpYy5BZ3guV2ViQ2xpZW50LkdPcHJhdm5lbmFPc29iYURldGFpbCcsIHsgZGF0YWJveDogdGhpcy5tb2RlbCwgZ3JpZFJjOiBncmlkUmMgfV0sIHsgb3ByYXZuZW5hT3NvYmE6IGRhdGEsIGlzTmV3OiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRU5EIE9QUkFWTkVORSBPU09CWSBcclxuXHJcbiAgICAgICAgLy8gUE9WT0xFTkkgQURSRVNBVElcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkUG92b2xlbmlBZHJlc2F0aSh0YWIpIHtcclxuICAgICAgICAgICAgdGhpcy5ncmlkUG92b2xlbmlBZHJlc2F0aSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0YWIpLmdncmlkKHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXRQb3ZvbGVuaUFkcmVzYXRpKCksXHJcbiAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGU6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNlbGxJbmZvID0gKGN0eCAhPSBudWxsICYmIGN0eC5jZWxsSW5mbyAhPSBudWxsICYmIGN0eC5jZWxsSW5mby5kYXRhICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFJlbW92ZVBvdm9sZW55QWRyZXNhdD8udXBkYXRlKHsgZW5hYmxlZDogY2VsbEluZm8gfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRQb3ZvbGVuaUFkcmVzYXRpKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXRQb3ZvbGVuaUFkcmVzYXRpKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGJpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAwMlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlybW5hbWVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMDVcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDA2XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGxvYWRQb3ZvbGVuaUFkcmVzYXRpKCkge1xyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLkdleFBvdm9sZW5pQWRyZXNhdGkubGlzdCh7IGZpbHRlcnM6IHsgZGJpZHM6IHRoaXMubW9kZWwuZGJpZCB9IH0pLmdldFZpZXcoKS5kb25lKChvdXQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG92b2xlbmlBZHJlc2F0aSA9IG91dC5nZXREYXRhUm93cyhmYWxzZSwgXCJkYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkUG92b2xlbmlBZHJlc2F0aS5nZ3JpZChcInNldERhdGFcIiwgb3V0KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYWRkUG92b2xlbnlBZHJlc2F0KCkge1xyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLkdleERhdG92ZVNjaHJhbmt5Lmxpc3QoKS5nZXREYXRhKCkuZG9uZSgoZGF0b3ZlU2NocmFua3kpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGRhdG92ZVNjaHJhbmt5LmZpbmRJbmRleChvID0+IG8uZGJpZCA9PSB0aGlzLm1vZGVsLmRiaWQpO1xyXG4gICAgICAgICAgICAgICAgZGF0b3ZlU2NocmFua3kuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG92b2xlbmlBZHJlc2F0aS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0b3ZlU2NocmFua3kuZmluZEluZGV4KG8gPT4gby5kYmlkID09IGl0ZW0uZGJpZClcclxuICAgICAgICAgICAgICAgICAgICBkYXRvdmVTY2hyYW5reS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRGF0YWJveFNlbGVjdEZvcm0oZGF0b3ZlU2NocmFua3kpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVEYXRhYm94U2VsZWN0Rm9ybShkYXRvdmVTY2hyYW5reTogR2V4LkludGVyZmFjZS5HR2V4c2Rib0R0b1tdKSB7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwNDlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ2V4ZGF0YWJveHNlbGVjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdG92ZVNjaHJhbmt5LFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPSdnaSBnaS1nZXggbWluaWZvdG8nPjwvZGl2PjxiPntmaXJtbmFtZX08L2I+PGJyIC8+PGk+e2RiaWR9PC9pPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyYXBoaWNJbnB1dDogXCJvbmlucHV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7IHN0b3BwaW5nOiB0cnVlIH0pXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaW1wbGVGb3JtKFwianJlczozMzAwMDA4NFwiLCBmb3JtLCBudWxsLCB7IC8vUkMgMzMwMDAwODQgOiBWeWJlcnRlIGRhdG92b3Ugc2NocsOhbmt1XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNTAwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyNTBcclxuICAgICAgICAgICAgfSkub24oXCJva1wiLCAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNudCA9ICQoZXYudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhYm94ID0gY250LmZpbmRGaWVsZHMoXCJnZXhkYXRhYm94c2VsZWN0XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFib3ggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3ZvbGVueUFkcmVzYXQ6IEdleC5JbnRlcmZhY2UuR1Bvdm9sZW55QWRyZXNhdER0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHBvdm9sZW55QWRyZXNhdC5kYmlkciA9IGRhdGFib3guZGJpZDtcclxuICAgICAgICAgICAgICAgICAgICBwb3ZvbGVueUFkcmVzYXQuZGJpZHMgPSB0aGlzLm1vZGVsLmRiaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcG92b2xlbnlBZHJlc2F0LmFrdGl2aXRhID0gMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvdm9sZW55QWRyZXNhdC5wb3puYW1rYSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLklzbC5HZXhQb3ZvbGVuaUFkcmVzYXRpLmFkZFBvdm9sZW55QWRyZXNhdCh7IGRhdGE6IHBvdm9sZW55QWRyZXNhdCB9KS5nZXREYXRhKCkuZG9uZSgocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uKFwic2hvd1RvYXN0XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzMwMDAwNTJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwianJlczozMzAwMDA4NVwiLCAvL1JDIDMzMDAwMDg1IDogTm92w70gcG92b2xlbsO9IGFkcmVzw6F0IGJ5bCDDunNwxJvFoW7EmyB1bG/FvmVuLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1nZXhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRQb3ZvbGVuaUFkcmVzYXRpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZmFpbCgoZXJyMSwgZXJyMiwgZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uKFwiYWRkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzMwMDAwNTJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IChlcnIxLnJlc3BvbnNlSlNPTj8uZXhjZXB0aW9uPy5iYXNlTWVzc2FnZSkgPyBlcnIxLnJlc3BvbnNlSlNPTj8uZXhjZXB0aW9uPy5iYXNlTWVzc2FnZSA6IFwianJlczozMzAwMDA4NlwiLCAvL1JDIDMzMDAwMDg2IDogUG92b2xlbsO9IGFkcmVzw6F0IG5lYnlsIHDFmWlkw6FuLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZ2V4XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZW1vdmVQb3ZvbGVueUFkcmVzYXQoKSB7XHJcbiAgICAgICAgICAgIHZhciBhZHJlc2F0ID0gdGhpcy5ncmlkUG92b2xlbmlBZHJlc2F0aS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgaWYgKGFkcmVzYXQgIT0gbnVsbCAmJiBhZHJlc2F0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvdm9sZW55QWRyZXNhdDogR2V4LkludGVyZmFjZS5HUG92b2xlbnlBZHJlc2F0RHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiA5MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGJpZHI6IGFkcmVzYXQuZGJpZCxcclxuICAgICAgICAgICAgICAgICAgICBkYmlkczogdGhpcy5tb2RlbC5kYmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvem5hbWthOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgR29yZGljLklzbC5HZXhQb3ZvbGVuaUFkcmVzYXRpLnJlbW92ZVBvdm9sZW55QWRyZXNhdCh7IGRhdGE6IHBvdm9sZW55QWRyZXNhdCB9KS5nZXREYXRhKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24oXCJzaG93VG9hc3RcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzMDAwMDUyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwianJlczozMzAwMDA4N1wiLCAvL1JDIDMzMDAwMDg3IDogT2RlYnLDoW7DrSBwb3ZvbGVuw6lobyBhZHJlc8OhdGEgcHJvYsSbaGxvIMO6c3DEm8WhbsSbLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZ2V4XCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZFBvdm9sZW5pQWRyZXNhdGkoKTtcclxuICAgICAgICAgICAgICAgIH0pLmZhaWwoKGVycjEsIGVycjIsIGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uKFwiYWRkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzAwMDA1MlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAoZXJyMS5yZXNwb25zZUpTT04/LmV4Y2VwdGlvbj8uYmFzZU1lc3NhZ2UpID8gZXJyMS5yZXNwb25zZUpTT04/LmV4Y2VwdGlvbj8uYmFzZU1lc3NhZ2UgOiBcImpyZXM6MzMwMDAwODhcIiwgLy9SQyAzMzAwMDA4OCA6IE9kZWJyw6Fuw60gcG92b2xlbsOpaG8gYWRyZXPDoXRhIG5lcHJvYsSbaGxvIMO6c3DEm8WhbsSbLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogXCJlcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWdleFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEVORCBQT1ZPTEVOSSBBRFJFU0FUSVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5BZ3guV2ViQ2xpZW50IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RhdGFCb3hVc2VyRGV0YWlsIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBwcml2YXRlIG1vZGVsOiBHb3JkaWMuR2V4LkludGVyZmFjZS5HR2V4c2RickdpbnNyZWZEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBpc05ldzogYm9vbGVhbjtcclxuICAgICAgICBwcml2YXRlIGlzRWRpdG1vZGU6IGJvb2xlYW47XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkUmM6IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQzxhbnk+O1xyXG5cclxuXHJcbiAgICAgICAgY2xvc2VEYXRhYm94VXNlcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zaW5nKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzYXZlRGF0YWJveFVzZXIoY2xvc2VBY3Q6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGlzLmZpbmRGb3JtcyhcImRhdGFib3gtdXNlci1mb3JtXCIpO1xyXG4gICAgICAgICAgICBpZiAoZm9ybS5nZm9ybShcImlzVmFsaWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGlzLm1vZGVsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tFeGlzdFVzZXIoKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLklzbC5HZXhTb3V2aXNlamljaU9zb2J5LnVwc2VydCh7IGRhdGE6IHRoaXMubW9kZWwgfSkuZ2V0RGF0YSgpLmRvbmUoKG91dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG91dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uKFwic2hvd1RvYXN0XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzMwMDAwMjZcIiwgLy9SQyAzMzAwMDAyNiA6IE9zb2JhIHNvdXZpc2Vqw61jw60gcyBkYXRvdsO9bWkgc2NocsOhbmthbWlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwianJlczozMzAwMDAyN1wiLCAvL1JDIDMzMDAwMDI3IDogVWxvxb5lbsOtIHByb2LEm2hsbyDDunNwxJvFoW7Em1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1nZXhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZWRGaWVsZHMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsID0gb3V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1haW5HcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTmV3ID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNOZXcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNDFcIiAvL1JDIDMzMDAwMDQxIDogRGV0YWlsIHXFvml2YXRlbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZUFjdCA9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoKGVycjEsIGVycjIsIGVycjMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycjIgPT09IFwiZXhjZXB0aW9uXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIzLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbihcImFkZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzMDAwMDI2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAoZXJyMS5yZXNwb25zZUpTT04/LmV4Y2VwdGlvbj8uYmFzZU1lc3NhZ2UpID8gZXJyMS5yZXNwb25zZUpTT04/LmV4Y2VwdGlvbj8uYmFzZU1lc3NhZ2UgOiBcImpyZXM6MzMwMDAwMjhcIiwgLy9SQyAzMzAwMDAyOCA6IFVsb8W+ZW7DrSBuZXByb2LEm2hsbyBzcHLDoXZuxJtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBcImVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWdleFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKSB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVySW5pdChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpIHtcclxuICAgICAgICAgICAgYnVpbGRlci53aXRoQ29tcG9uZW50PHRoaXM+KFwiR0RhdGFCb3hVc2VyRGV0YWlsXCIsIHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbnM6IHRoaXMuY3JlYXRlQWN0aW9ucygpLFxyXG4gICAgICAgICAgICAgICAgbWVudUJhcjogdGhpcy5jcmVhdGVNZW51QmFyKCksXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJGb3JtOiB0aGlzLmNyZWF0ZUhlYWRlckZvcm0oKVxyXG4gICAgICAgICAgICB9LCB0cnVlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVyQnVpbGQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKSB7IH1cclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc05ldyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0VkaXRtb2RlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZWRGaWVsZHMoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0VkaXRtb2RlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiAodGhpcy5pc05ldyA9PSBmYWxzZSkgPyBcImpyZXM6MzMwMDAwNDFcIiA6IFwianJlczozMzAwMDAwOVwiIC8vUkMgMzMwMDAwNDEgOiBEZXRhaWwgdcW+aXZhdGVsZVxyXG4gICAgICAgICAgICB9XSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbG9zaW5nKCk6IEpRdWVyeS5EZWZlcnJlZDxhbnksIGFueSwgYW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5pc0VkaXRtb2RlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBHRGxnLmNvbmZpcm0oXCJqcmVzOjMzMDAwMDQyXCIpLm9uKFwieWVzXCIsICgpID0+IHsgLy9SQyAzMzAwMDA0MiA6IE9wcmF2ZHUgY2hjZXRlIG9wdXN0aXQgZGV0YWlsIGJleiB1bG/FvmVuw60/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkub24oXCJub1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjYW5jZWxFZGl0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NpbmcoKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTmV3ID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQuY29udGVudCgpLm5hdmlnYXRlKFtcIkdvcmRpYy5BZ3guV2ViQ2xpZW50LkdEYXRhQm94VXNlckRldGFpbFwiLCB7IGdyaWRSYzogdGhpcy5ncmlkUmMsIHVpZDogXCJHRGF0YUJveFVzZXJEZXRhaWxcIiB9XSwgeyBpeHNfcmVmOiB0aGlzLm1vZGVsLml4c19yZWYgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGVkRmllbGRzKGVuYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgaWYgKGVuYWJsZWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcygpLmdmaWVsZChcIm9wdGlvblwiLCB7IGRpc2FibGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kRm9ybVNlY3Rpb25zKFwiYWRcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm9wdGlvblwiLCB7IGRpc2FibGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZvcm1TZWN0aW9ucyhcImJpXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJvcHRpb25cIiwgeyBkaXNhYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc0VkaXRtb2RlID0gZW5hYmxlZDtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFNhdmVBbmRDbG9zZT8udXBkYXRlKHsgZW5hYmxlZDogZW5hYmxlZCB9KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdEVkaXQ/LnVwZGF0ZSh7IHZpc2libGU6ICFlbmFibGVkIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Q2FuY2VsRWRpdD8udXBkYXRlKHsgdmlzaWJsZTogZW5hYmxlZCB9KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFNhdmU/LnVwZGF0ZSh7IHZpc2libGU6IGVuYWJsZWQgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiBPYmplY3RMaXRlcmFsPEdBY3Rpb25QYXJhbXNEZWZPYmo+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGFjdEVkaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNDNcIiwgLy9SQyAzMzAwMDA0MyA6IFVwcmF2aXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBlbmNpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6ICF0aGlzLmlzTmV3LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmFibGVkRmllbGRzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RDYW5jZWxFZGl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDQ0XCIsIC8vUkMgMzMwMDAwNDQgOiBVa29uxI1pdCBlZGl0YWNpXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGlzLmlzTmV3LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxFZGl0KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0U2F2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA0NVwiLCAvL1JDIDMzMDAwMDQ1IDogVWxvxb5pdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoaXMuaXNOZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVEYXRhYm94VXNlcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFByZXZpb3VzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDU2XCIsIC8vUkMgMzMwMDAwNTYgOiBQxZllZGNob3rDrVxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktYXJyb3ctZG93biBnaS1yb3QxODBcIixcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiAodGhpcy5ncmlkUmMpID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICh0aGlzLmdyaWRSYykgPyB0aGlzLmdyaWRSYy5jdXJyZW50KCk/LnByZXZSb3cgIT0gbnVsbCA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBcIm5ldmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzQW5kTmV4dEFjdGlvbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE5leHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNTdcIiwgLy9SQyAzMzAwMDA1NyA6IERhbMWhw61cclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWFycm93LWRvd25cIixcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiAodGhpcy5ncmlkUmMpID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICh0aGlzLmdyaWRSYykgPyB0aGlzLmdyaWRSYy5jdXJyZW50KCk/Lm5leHRSb3cgIT0gbnVsbCA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBcIm5ldmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzQW5kTmV4dEFjdGlvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudUJhcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBcImFjdEVkaXRcIiwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBcImFjdENhbmNlbEVkaXRcIiwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBcImFjdFNhdmVcIiwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBcImFjdFByZXZpb3VzXCIsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogXCJhY3ROZXh0XCIsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0sXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlSGVhZGVyRm9ybSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJkYXRhYm94LXVzZXItZm9ybVwiLCBjdXN0b21DbGFzczogXCJkYXRhYm94LXVzZXItZm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGxheW91dERlc2NyaXB0b3I6IFwiTC0yLTEwLTAsIE0tMi0xMC0wLCBTLTEyLTEyLTBcIiwgY3VzdG9tQ2xhc3M6IFwidy1MLTEyIHctTS0xMiB3LVMtMTJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwMTBcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zcmVmKCksIHsgLy9SQyAzMzAwMDAxMCA6IE9zb2JhXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3JlZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19yZWY9dmFsdWUuaXhzX3JlZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC52YWx1ZT8uaXhzX3JlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLklzbC5SZWZlcmVudC5yZWFkKHsgaXhzX3JlZjogY3R4LnZhbHVlPy5peHNfcmVmIH0pLmdldERhdGEoKS5kb25lKChvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGlzLmZpbmRGb3JtcyhcImRhdGFib3gtdXNlci1mb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcIml4c19yZWZfaWRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgby5peHNfcmVmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfcmVmX2VtYWlsXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG8ubWFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiaXhzX3JlZl9wb3puYW1rYVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBvLnBvem5hbWthKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwMjNcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgLy9SQyAzMzAwMDAyMyA6IElkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfcmVmX2lkXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAyNFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyAvL1JDIDMzMDAwMDI0IDogRS1tYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfcmVmX2VtYWlsXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAyNVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyAgLy9SQyAzMzAwMDAyNSA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3JlZl9wb3puYW1rYVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYWJlbDogXCJqcmVzOjMzMDAwMDExXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCIsIG5hbWU6IFwiYWRcIiwgY3VzdG9tQ2xhc3M6IFwiYWRcIiB9KSAvL1JDIDMzMDAwMDExIDogQWRyZXNhXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAxMlwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImFkc3RyZWV0XCIgfSkgLy9SQyAzMzAwMDAxMiA6IFVsaWNlXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAxM1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImFkbnVtYmVyaW5zdHJlZXRcIiB9KSAvL1JDIDMzMDAwMDEzIDogxIwuTy5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDE0XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiYWRudW1pbm11bmljaXBhbGl0XCIgfSkgLy9SQyAzMzAwMDAxNCA6IMSMLlAuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAxNVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImFkY2l0eVwiIH0pIC8vUkMgMzMwMDAwMTUgOiBNxJtzdG9cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDE2XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiYWR6aXBjb2RlXCIgfSkgLy9SQyAzMzAwMDAxNiA6IFBTxIxcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDE3XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiYWRzdGF0ZVwiIH0pIC8vUkMgMzMwMDAwMTcgOiBTdMOhdFxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYWJlbDogXCJqcmVzOjMzMDAwMDE4XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCIsIG5hbWU6IFwiYmlcIiwgY3VzdG9tQ2xhc3M6IFwiYmlcIiB9KSAvL1JDIDMzMDAwMDE4IDogTmFyb3plbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAxOVwiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJiaWRhdGVcIiB9KSAvL1JDIDMzMDAwMDE5IDogRGF0dW1cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDIwXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiYmljaXR5XCIgfSkgLy9SQyAzMzAwMDAyMCA6IE3Em3N0b1xyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwMjFcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJiaXN0YXRlXCIgfSkgLy9SQyAzMzAwMDAyMSA6IFN0w6F0XHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAyMlwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImJpY291bnR5XCIgfSkgLy9SQyAzMzAwMDAyMiA6IFplbcSbXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZU1haW5HcmlkKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ncmlkUmMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ3JpZEVsID0gdGhpcy5ncmlkUmMgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgdmFyIGdyaWQgPSBncmlkRWwuZ3JpZEluc3RhbmNlLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JpZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLklzbC5HZXhTb3V2aXNlamljaU9zb2J5Lmxpc3QoeyBmaWx0ZXJzOiB7IGl4c19yZWY6IHRoaXMubW9kZWwuaXhzX3JlZiB9IH0pLmdldERhdGEoKS5kb25lKChvdXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG91dC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlldzogR29yZGljLkRhdGEuVmlldyA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBvdXRbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc05ldyA9PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZURhdGEoZGF0YSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy51cGRhdGVEYXRhKGRhdGEsIFwiYWRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNoZWNrRXhpc3RVc2VyKCk6IEpRdWVyeS5EZWZlcnJlZDxhbnksIGFueSwgYW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5pc05ldyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWwuaXhzX3JlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuSXNsLkdleFNvdXZpc2VqaWNpT3NvYnkuY2hlY2tFeGlzdFVzZXIoeyBpeHNfcmVmOiB0aGF0Lm1vZGVsLml4c19yZWYgfSkuZ2V0KCkudGhlbigob3V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3V0ID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHRGxnLmNvbmZpcm0oXCJqcmVzOjMzMDAwMDQ2XCIuZm9ybWF0KCh0aGF0Lm1vZGVsLml4c19yZWYpID8gdGhhdC5tb2RlbC5peHNfcmVmIDogXCJcIikpLm9uKFwieWVzXCIsICgpID0+IHsgLy9SQyAzMzAwMDA0NiA6IFXFvml2YXRlbCBzIHTDrW10byBpeHNfcmVmICg8Yj57MH08L2I+KSBqacW+IGV4aXN0dWplLiBQxZllamV0ZSBzaSB1xb5pdmF0ZWxlIHDFmWVwc2F0P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLm9uKFwibm9cIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2aW91c0FuZE5leHRBY3Rpb24obmV4dDogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB2YXIgb2JqOiBhbnk7XHJcbiAgICAgICAgICAgIGlmIChuZXh0ID09IHRydWUpXHJcbiAgICAgICAgICAgICAgICBvYmogPSB0aGlzLmdyaWRSYy5jdXJyZW50KCkubmV4dFJvdy5kYXRhO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBvYmogPSB0aGlzLmdyaWRSYy5jdXJyZW50KCkucHJldlJvdy5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRSYy5tb3ZlKG5leHQpO1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEVsID0gdGhpcy5ncmlkUmMgYXMgYW55O1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NpbmcoKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICQuY29udGVudCgpLm5hdmlnYXRlKFtcIkdvcmRpYy5BZ3guV2ViQ2xpZW50LkdEYXRhQm94VXNlckRldGFpbFwiLCB7IGdyaWRSYzogZ3JpZEVsLCB1aWQ6IFwiR0RhdGFCb3hVc2VyRGV0YWlsXCIgfV0sIHsgaXhzX3JlZjogb2JqLml4c19yZWYgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLkFneC5XZWJDbGllbnQge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHT3ByYXZuZW5hT3NvYmFEZXRhaWwgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIHByaXZhdGUgZGF0YWJveDogR29yZGljLkdleC5JbnRlcmZhY2UuR0dleHNkYm9EdG87XHJcbiAgICAgICAgcHJpdmF0ZSBtb2RlbDogR29yZGljLkdleC5JbnRlcmZhY2UuR09wcmF2bmVuYU9zb2JhRHRvO1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZFJjOiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBpc05ldzogYm9vbGVhbjtcclxuICAgICAgICBwcml2YXRlIGlzRWRpdE1vZGU6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHNhdmVBbmRDbG9zZVByaXZpbChjbG9zZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IHRoaXMuZmluZEZvcm1zKFwib3ByYXZuZW5hLW9zb2JhLWZvcm1cIik7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZvcm1TZWN0aW9ucyhcInByaXZpbHNcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGlzLm1vZGVsKTtcclxuICAgICAgICAgICAgLy92YXIgbmV3SXhzUmVmID0gdGhpcy5tb2RlbC5vc29iYT8uaXhzX3JlZjtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5kYmlkID0gdGhpcy5kYXRhYm94LmRiaWQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFib3guaXhzX293biA9PSB0aGlzLm1vZGVsLm9zb2JhPy5peHNfcmVmIHx8IHRoaXMuZGF0YWJveC5peHNfb3duID09IG51bGwgfHwgdGhpcy5tb2RlbC5wcml2aWxfb3duZXIgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuYWt0aXZpdGEgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuSXNsLkdleE9wcmF2bmVuZU9zb2J5LnVwc2VydCh7IGRhdGE6IHRoaXMubW9kZWwgfSkuZ2V0RGF0YSgpLmRvbmUoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwgPSByZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCByZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTWFpbkdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZUZpZWxkcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAobmV3SXhzUmVmICE9IG51bGwgJiYgbmV3SXhzUmVmICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh0aGlzLmRhdGFib3guaXhzX293biAhPSBuZXdJeHNSZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhpcy5kYXRhYm94Lml4c19vd24gPSBuZXdJeHNSZWY7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIEdvcmRpYy5Jc2wuR2V4RGF0b3ZlU2NocmFua3kudXBzZXJ0KHsgZGF0YTogdGhpcy5kYXRhYm94IH0pLmdldERhdGEoKS5kb25lKChkcmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGlzLmRhdGFib3ggPSBkcmV0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TdWNjZXNzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoY2xvc2UgPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGNsb3NlID09IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGlzLmNsb3NlKClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3NlID09IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKClcclxuICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbihcImFkZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzAwMDA1MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwianJlczozMzAwMDA3M1wiLCAvL1JDIDMzMDAwMDczIDogRGF0b3bDoSBzY2hyw6Fua2EgbmVtxa/FvmUgbcOtdCBkdmEgbWFqaXRlbGUhXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWdleFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbG9zZVByaXZpbERldGFpbCgpIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zaW5nKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJJbml0KGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcikge1xyXG4gICAgICAgICAgICBidWlsZGVyLndpdGhDb21wb25lbnQ8dGhpcz4oXCJHT3ByYXZuZW5hT3NvYmFEZXRhaWxcIiwge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uczogdGhpcy5jcmVhdGVBY3Rpb25zKCksXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJGb3JtOiB0aGlzLmNyZWF0ZUhlYWRlckZvcm0oKSxcclxuICAgICAgICAgICAgICAgIG1lbnVCYXI6IHRoaXMuY3JlYXRlTWVudWJhcigpLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzQmFyOiB0aGlzLmNyZWF0ZVN0YXR1c0JhcigpLFxyXG4gICAgICAgICAgICB9LCB0cnVlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5LkRlZmVycmVkPGFueSwgYW55LCBhbnk+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LmlzRWRpdE1vZGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdEbGcuY29uZmlybShcImpyZXM6MzMwMDAwNDJcIikub24oXCJ5ZXNcIiwgKCkgPT4geyAvL1JDIDMzMDAwMDQyIDogT3ByYXZkdSBjaGNldGUgb3B1c3RpdCBkZXRhaWwgYmV6IHVsb8W+ZW7DrT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5vbihcIm5vXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc05ldyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRWRpdE1vZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0VkaXRNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogKHRoaXMuaXNOZXcgPT0gdHJ1ZSkgPyBcImpyZXM6MzMwMDAwNjNcIi5mb3JtYXQodGhpcy5kYXRhYm94LmZpcm1uYW1lIGFzIHN0cmluZywgdGhpcy5kYXRhYm94LmljIGFzIHN0cmluZykgOiBcImpyZXM6MzMwMDAwNjRcIi5mb3JtYXQodGhpcy5kYXRhYm94LmZpcm1uYW1lIGFzIHN0cmluZywgdGhpcy5kYXRhYm94LmljIGFzIHN0cmluZykgLy9SQyAzMzAwMDA2NCA6IERldGFpbCBvcHLDoXZuxJtuw6kgb3NvYnkgcHJvIHNjaHLDoW5rdTogezB9ICh7MX0pXHJcbiAgICAgICAgICAgIH1dKVxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IHRoaXMuZmluZEZvcm1zKFwib3ByYXZuZW5hLW9zb2JhLWZvcm1cIik7XHJcbiAgICAgICAgICAgIG5ldyBHb3JkaWMuRGF0YS5SZWFkZXJzLkdpbnNyZWYoKS5nZXREYXRhKHsgaXhzX3JlZjogdGhpcy5tb2RlbC5vc29iYT8uaXhzX3JlZiB9KS5kb25lKChyZWYpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWYubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJvc29iYVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCByZWZbMF0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmZpbmRGb3JtU2VjdGlvbnMoXCJwcml2aWxzXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWwpO1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZUZpZWxkcyh0aGlzLmlzRWRpdE1vZGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZU1haW5HcmlkKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ncmlkUmMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ3JpZEVsID0gdGhpcy5ncmlkUmMgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgdmFyIGdyaWQgPSBncmlkRWwuZ3JpZEluc3RhbmNlLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JpZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXc6IEdvcmRpYy5EYXRhLlZpZXcgPSBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc05ldyA9PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy51cGRhdGVEYXRhKHRoaXMubW9kZWwsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy51cGRhdGVEYXRhKHRoaXMubW9kZWwsIFwiYWRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGVuYWJsZUZpZWxkcyhlbmFibGVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZvcm1zKFwib3ByYXZuZW5hLW9zb2JhLWZvcm1cIikuZmluZEZvcm1TZWN0aW9ucyhcInByaXZpbHNcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICFlbmFibGVkKVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0U2F2ZUFuZENsb3NlPy51cGRhdGUoeyBlbmFibGVkOiBlbmFibGVkIH0pXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RFZGl0Py51cGRhdGUoeyB2aXNpYmxlOiAhZW5hYmxlZCB9KVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Q2FuY2VsRWRpdD8udXBkYXRlKHsgdmlzaWJsZTogZW5hYmxlZCB9KVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0U2F2ZT8udXBkYXRlKHsgdmlzaWJsZTogZW5hYmxlZCB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IE9iamVjdExpdGVyYWw8R0FjdGlvblBhcmFtc0RlZk9iaj4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgYWN0RWRpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA0M1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcGVuY2lsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZUZpZWxkcyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0U2F2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA0NVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlQW5kQ2xvc2VQcml2aWwoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdENhbmNlbEVkaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNDRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoaXMuaXNOZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbEVkaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UHJldmlvdXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNTZcIiwgLy9SQyAzMzAwMDA1NiA6IFDFmWVkY2hvesOtXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1hcnJvdy1kb3duIGdpLXJvdDE4MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6ICh0aGlzLmlzTmV3ID09IGZhbHNlKSA/ICgodGhpcy5ncmlkUmMpID8gdHJ1ZSA6IGZhbHNlKSA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICh0aGlzLmdyaWRSYykgPyB0aGlzLmdyaWRSYy5jdXJyZW50KCk/LnByZXZSb3cgIT0gbnVsbCA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBcIm5ldmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzQW5kTmV4dEFjdGlvbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE5leHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNTdcIiwgLy9SQyAzMzAwMDA1NyA6IERhbMWhw61cclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWFycm93LWRvd25cIixcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiAodGhpcy5pc05ldyA9PSBmYWxzZSkgPyAoKHRoaXMuZ3JpZFJjKSA/IHRydWUgOiBmYWxzZSkgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiAodGhpcy5ncmlkUmMpID8gdGhpcy5ncmlkUmMuY3VycmVudCgpPy5uZXh0Um93ICE9IG51bGwgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uVmlzaWJsZTogXCJuZXZlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0FuZE5leHRBY3Rpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnViYXIoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogXCJhY3RFZGl0XCIsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogXCJhY3RTYXZlXCIsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogXCJhY3RDYW5jZWxFZGl0XCIsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogXCJhY3RQcmV2aW91c1wiLCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IFwiYWN0TmV4dFwiLCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9LFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVN0YXR1c0JhcigpOiBHaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlck1lbnVJdGVtRGVmIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN0YXRpY1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5tb2RlbC5wcml2aWxfb3duZXIgPT0gdHJ1ZSA/IFwianJlczozMzAwMDA5MlwiIDogXCJqcmVzOjMzMDAwMDkzXCIsIC8vUkMgMzMwMDAwOTMgOiBPc29iYSBORU7DjSBtYWppdGVsZW0gZGF0b3bDqSBzY2hyw6Fua3lcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiB0aGlzLm1vZGVsLnByaXZpbF9vd25lciA9PSB0cnVlID8gXCJnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvXCIgOiBcImctc3RhdGUtdGV4dCBnLXN0YXRlLXdhcm5pbmdcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVIZWFkZXJGb3JtKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBjdXN0b21DbGFzczogXCJvcHJhdm5lbmEtb3NvYmEtZm9ybVwiLCBuYW1lOiBcIm9wcmF2bmVuYS1vc29iYS1mb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTC0yLTgtMiwgTS0yLTgtMiwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHtjdXN0b21DbGFzczogXCJ3LUwtMTIgdy1NLTEyIHctUy0xMlwiLCBsYWJlbDogXCJqcmVzOjMzMDAwMDYyXCIgfSkgLy9SQyAzMzAwMDA2MiA6IFNvdXZpc2Vqw61jw60gb3NvYmFcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDEwXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc3JlZigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJvc29iYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbmFtZTogXCJwcml2aWxzXCIsIGN1c3RvbUNsYXNzOiBcInByaXZpbHNcIiwgbGFiZWw6IFwianJlczozMzAwMDA2NVwiIH0pIC8vUkMgMzMwMDAwNjUgOiBPcHLDoXZuxJtuw61cclxuICAgICAgICAgICAgICAgIC8vLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgXHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcInByaXZpbF9vd25lclwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgbGFiZWw6IFwianJlczozMzAwMDA2NlwiIC8vUkMgMzMwMDAwNjYgOiBNYWppdGVsIERTXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpdmlsX293bmVyX2FkbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzMwMDAwNjdcIiAvL1JDIDMzMDAwMDY3IDogUHLDoXZvIHNwcmF2b3ZhdCBEU1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml2aWxfcmVhZF9ub25fcGVyc29uYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMzMDAwMDY4XCIgLy9SQyAzMzAwMDA2OCA6IFByw6F2byBzdGFob3ZhdCBhIMSNw61zdCBEWiB1csSNZW7DqSBkbyB2bGFzdG7DrWNoIHJ1a291XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaXZpbF9yZWFkX2FsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzMwMDAwNjlcIiAvL1JDIDMzMDAwMDY5IDogUHLDoXZvIHN0YWhvdmF0IGEgxI3DrXN0IGRvxaFsw6kgRFpcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpdmlsX2NyZWF0ZV9kbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzMwMDAwNzBcIiAvL1JDIDMzMDAwMDcwIDogUHLDoXZvIHZ5dHbDocWZZXQgYSBvZGVzw61sYXQgRFosIHN0YWhvdmF0IG9kZXNsYW7DqSBEWlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml2aWxfdmlld19pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMzAwMDA3MVwiLCAvL1JDIDMzMDAwMDcxIDogUHLDoXZvIG5hxI3DrXRhdCBzZXpuYW15IERaLCBEb2Rlamt5IGEgRG9ydcSNZW5reVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml2aWxfc2VhcmNoX2RiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMzAwMDA3MlwiIC8vUkMgMzMwMDAwNzIgOiBQcsOhdm8gdnlobGVkw6F2YXQgRFNcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TdWNjZXNzKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc05ldyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTmV3ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDY0XCIuZm9ybWF0KHRoaXMuZGF0YWJveC5maXJtbmFtZSBhcyBzdHJpbmcsIHRoaXMuZGF0YWJveC5pYyBhcyBzdHJpbmcpXHJcbiAgICAgICAgICAgICAgICB9XSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbihcInNob3dUb2FzdFwiLCB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzMDAwMDUwXCIsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcImpyZXM6MzMwMDAwMjdcIixcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZ2V4XCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2FuY2VsRWRpdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zaW5nKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc05ldyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5uYXZpZ2F0ZShbXCJHb3JkaWMuQWd4LldlYkNsaWVudC5HT3ByYXZuZW5hT3NvYmFEZXRhaWxcIiwgeyBkYXRhYm94OiB0aGlzLmRhdGFib3gsIGdyaWRSYzogdGhpcy5ncmlkUmMgfV0sIHsgb3ByYXZuZW5hT3NvYmE6IHRoaXMubW9kZWwsIGlzTmV3OiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2aW91c0FuZE5leHRBY3Rpb24obmV4dDogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB2YXIgb2JqOiBhbnk7XHJcbiAgICAgICAgICAgIGlmIChuZXh0ID09IHRydWUpXHJcbiAgICAgICAgICAgICAgICBvYmogPSB0aGlzLmdyaWRSYy5jdXJyZW50KCkubmV4dFJvdy5kYXRhO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBvYmogPSB0aGlzLmdyaWRSYy5jdXJyZW50KCkucHJldlJvdy5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRSYy5tb3ZlKG5leHQpO1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEVsID0gdGhpcy5ncmlkUmMgYXMgYW55O1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NpbmcoKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICQuY29udGVudCgpLm5hdmlnYXRlKFtcIkdvcmRpYy5BZ3guV2ViQ2xpZW50LkdPcHJhdm5lbmFPc29iYURldGFpbFwiLCB7IGRhdGFib3g6IHRoaXMuZGF0YWJveCwgZ3JpZFJjOiBncmlkRWwgfV0sIHsgb3ByYXZuZW5hT3NvYmE6IG9iaiwgaXNOZXc6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5BZ3guV2ViQ2xpZW50IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RhdGFCb3hMaXN0IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICAvL3ByaXZhdGUgZmlsdGVyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGN1cnJlbnRGaWx0ZXI6IGFueTtcclxuICAgICAgICBwcml2YXRlIGRiVHlwZXM6IEdvcmRpYy5HZXguSW50ZXJmYWNlLkdHZXhjZGJ0RHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSBkYlN0YXRlczogR29yZGljLkdleC5JbnRlcmZhY2UuR0dleGNkYnNEdG9bXTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51QmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdENvbnRlbnQoKTtcclxuICAgICAgICAgICAgLy90aGlzLmNyZWF0ZUZpbHRlcnBhbmVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXRDb250ZW50KCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0R290b0JhY2sgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdEdvdG9CYWNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDAxXCIsIC8vUkMgMzMwMDAwMDEgOiBTZXpuYW0gZGF0b3bDvWNoIHNjaHLDoW5la1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZUFsbENoaWxkQ29udGVudHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RGF0YWJveFVzZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDM3XCIsIC8vUkMgMzMwMDAwMzcgOiBVxb5pdmF0ZWzDqSBkYXRvdsO9Y2ggc2NocsOhbmVrXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS11c2Vyc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5BZ3guV2ViQ2xpZW50LkdEYXRhQm94VXNlckxpc3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE5ld0RhdGFib3g6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNDhcIiwgLy9SQyAzMzAwMDA0OCA6IE5vdsOhIGRhdG92w6Egc2NocsOhbmthXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKFtcIkdvcmRpYy5BZ3guV2ViQ2xpZW50LkdEYXRhQm94RGV0YWlsXCIsIHsgZ3JpZFJjOiBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoaXMuZ3JpZCksIHVpZDogXCJHRGF0YUJveERldGFpbFwiIH1dLCB7IGRiaWQ6IG51bGwgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0T3BlbkRldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAzOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5EZXRhaWwoY3R4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UmVmcmFzaDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA0N1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcmVmcmVzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudUJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0UmVmcmFzaCpcIiwgXCJhY3ROZXdEYXRhYm94KlwiLCBcImFjdE9wZW5EZXRhaWwqXCIsIFwiYWN0RGF0YWJveFVzZXJzKlwiXSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgY3JlYXRlRmlsdGVycGFuZWwoKSB7XHJcbiAgICAgICAgLy8gICAgdGhpcy5maWx0ZXIgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgIC8vICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuTm9ybWFsLFxyXG4gICAgICAgIC8vICAgICAgICBmb3JtczogW3RoaXMuY3JlYXRlRmlsdGVyRm9ybSgpXSxcclxuICAgICAgICAvLyAgICAgICAgZmF2b3JpdGVzOiBcImFsbFwiLFxyXG4gICAgICAgIC8vICAgICAgICBoYXJkRGVmYXVsdEZpbHRlcjoge1xyXG5cclxuICAgICAgICAvLyAgICAgICAgfSxcclxuICAgICAgICAvLyAgICAgICAgYXBwbHk6IChldiwgZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlckZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZmlsdGVyLWRhdG92ZS1zY2hyYW5reVwiLCBjdXN0b21DbGFzczogXCJmaWx0ZXItZGF0b3ZlLXNjaHJhbmt5XCIgfSlcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdhdXRvZml0KCkuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIixcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RPcGVuRGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYmlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDAyXCIgLy9SQyAzMzAwMDAwMiA6IElEIGRhdG92w6kgc2NocsOhbmt5XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGJ0eXBlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDAzXCIsIC8vUkMgMzMwMDAwMDMgOiBUeXAgZGF0b3bDqSBzY2hyw6Fua3lcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChyb3csIG1ldGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5kYnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eHQgPSB0aGlzLmRiVHlwZXMuZmluZChlbCA9PiBlbC5kYnR5cGUgPT0gcm93LmRidHlwZSk/LmRidHlwZV90eHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHh0ICE9IG51bGwgJiYgdHh0ICE9IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRic3RhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMDRcIiwgLy9SQyAzMzAwMDAwNCA6IFN0YXR1c1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKHJvdywgbWV0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93LmRic3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eHQgPSB0aGlzLmRiU3RhdGVzLmZpbmQoZWwgPT4gZWwuZGJzdGF0ZSA9PSByb3cuZGJzdGF0ZSk/LmRic3RhdGVfdHh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR4dCAhPSBudWxsICYmIHR4dCAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmaXJtbmFtZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAwNVwiIC8vUkMgMzMwMDAwMDUgOiBKbcOpbm9cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAwNlwiLCAvL1JDIDMzMDAwMDA2IDogScSMT1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hdGlvbmFsaXR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDA3XCIgLy9SQyAzMzAwMDAwNyA6IE7DoXJvZG5vc3RcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJwcml6X3ZkYnJcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwianJlczozMzAwMDAwOFwiIC8vUkMgMzMwMDAwMDggOiBQb3ZvbGVuw6kgZGF0LiBzY2hyw6Fua3lcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbG9hZERhdGEoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKVxyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLkdleERhdG92ZVNjaHJhbmt5Lmxpc3QoeyBmaWx0ZXJzOiB0aGlzLmN1cnJlbnRGaWx0ZXIgfSkuZ2V0VmlldygpLmRvbmUoKG8pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgbyk7XHJcbiAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCkgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb3BlbkRldGFpbChjdHgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGE6IEdvcmRpYy5HZXguSW50ZXJmYWNlLkdHZXhzZGJvRHRvO1xyXG4gICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvICE9IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gdGhpcy5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IChyb3cgPT0gbnVsbCkgPyB1bmRlZmluZWQgOiByb3c7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCAmJiBkYXRhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGdyaWRSYyA9IG5ldyBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkModGhpcy5ncmlkKTtcclxuICAgICAgICAgICAgICAgICQuY29udGVudCgpLm5hdmlnYXRlKFtcIkdvcmRpYy5BZ3guV2ViQ2xpZW50LkdEYXRhQm94RGV0YWlsXCIsIHsgZ3JpZFJjOiBncmlkUmMsIHVpZDogXCJHRGF0YUJveERldGFpbFwiIH1dLCB7IGRiaWQ6IGRhdGEuZGJpZCB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5BZ3guV2ViQ2xpZW50IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RhdGFCb3hVc2VyTGlzdCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgcHJldmlld0NvbnRyb2xsZXI6IGFueTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51YmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdENvbnRlbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU2lkZWJhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nYXV0b2ZpdCgpLmdncmlkKHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdE9wZW5EZXRhaWwsXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwicHJpam1lbmlcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3R4ICE9IG51bGwgJiYgY3R4LmNlbGxJbmZvICE9IG51bGwgJiYgY3R4LmNlbGxJbmZvLmRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyLmVuYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlci5zaG93KGN0eC5jZWxsSW5mby5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyLmVuYWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVTaWRlYmFyKCkge1xyXG4gICAgICAgICAgICB2YXIgcHJldmlld1BhbmVscyA9IHtcclxuICAgICAgICAgICAgICAgIHRhYnM6IFtcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJldmlld3MuZ2V0RGVmYXVsdFByZXZpZXdUYWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3SWQ6IFwiYWd4OmFneC11c2VyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB1c2VTdWJ0YXNrOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXIgPSBuZXcgR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcih0aGlzLmVsZW1lbnQsIHByZXZpZXdQYW5lbHMpO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyLnJlZ2lzdGVyUGFuZWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0RGF0YVRvR3JpZCgpIHtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLkdleFNvdXZpc2VqaWNpT3NvYnkubGlzdCgpLmdldFZpZXcoKS5kb25lKCh2aWV3KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpXHJcbiAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCk7IH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfcmVmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDI5XCIgLy9SQyAzMzAwMDAyOSA6IElEIG9zb2J5XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiam1lbm9cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMDVcIiAvL1JDIDMzMDAwMDMwIDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpam1lbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMzZcIiAvL1JDIDMzMDAwMDM2IDogUMWZw61qbWVuw61cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhZHN0cmVldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAxMlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWRudW1iZXJpbnN0cmVldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAxM1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWRudW1pbm11bmljaXBhbGl0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDE0XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhZGNpdHlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMTVcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFkemlwY29kZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAxNlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWRzdGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAxN1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYmlkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDMyXCIgLy9SQyAzMzAwMDAzMiA6IERhdHVtIG5hcm96ZW7DrVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJpY2l0eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAzM1wiIC8vUkMgMzMwMDAwMzMgOiBNw61zdG8gbmFyb3plbsOtXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYmlzdGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAzNFwiIC8vUkMgMzMwMDAwMzQgOiBTdMOhdCBuYXJvemVuw61cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJiaWNvdW50eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAzNVwiIC8vUkMgMzMwMDAwMzUgOiBaZW3EmyBuYXJvemVuw61cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RHb3RvQmFjazoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAzN1wiLCAvL1JDIDMzMDAwMDAxIDogU2V6bmFtIGRhdG92w71jaCBzY2hyw6FuZWtcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2VBbGxDaGlsZENvbnRlbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE5ld0RhdGFib3hVc2VyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDA5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JpZFJjID0gbmV3IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQyh0aGlzLmdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKFtcIkdvcmRpYy5BZ3guV2ViQ2xpZW50LkdEYXRhQm94VXNlckRldGFpbFwiLCB7IGdyaWRSYzogZ3JpZFJjLCB1aWQ6IFwiR0RhdGFCb3hVc2VyRGV0YWlsXCIgfV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RPcGVuRGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDM4XCIsIC8vUkMgMzMwMDAwMzggOiBPdGV2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRGV0YWlsKGN0eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFJlZnJlc2g6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNDdcIiwgLy9SQyAzMzAwMDA0NyA6IE9ibm92aXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXJlZnJlc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudWJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0UmVmcmVzaCpcIiwgXCJhY3RPcGVuRGV0YWlsKlwiLFwiYWN0TmV3RGF0YWJveFVzZXIqXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXRDb250ZW50KCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0R290b0JhY2sgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb3BlbkRldGFpbChjdHgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGE6IEdvcmRpYy5HZXguSW50ZXJmYWNlLkdHZXhzZGJyR2luc3JlZkR0bztcclxuICAgICAgICAgICAgaWYgKGN0eC5jZWxsSW5mbyAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gY3R4LmNlbGxJbmZvLmRhdGE7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRoaXMuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSAocm93ID09IG51bGwpID8gdW5kZWZpbmVkIDogcm93O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwgJiYgZGF0YSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBncmlkUmMgPSBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoaXMuZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5uYXZpZ2F0ZShbXCJHb3JkaWMuQWd4LldlYkNsaWVudC5HRGF0YUJveFVzZXJEZXRhaWxcIiwgeyBncmlkUmM6IGdyaWRSYywgdWlkOiBcIkdEYXRhQm94VXNlckRldGFpbFwiIH1dLCB7IGl4c19yZWY6IGRhdGEuaXhzX3JlZiB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5BZ3guV2ViQ2xpZW50LkZvcm1zIHtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBDcmVhdGVBZ3hVc2VyUHJldmlld0Zvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImFneC1wcmV2aWV3cy1mb3JtXCIgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwMjlcIikuYWRkRmllbGQoXCJnc3RhdGljZmllbGRcIiwgeyBuYW1lOiBcIml4c19yZWZcIiB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAwNVwiKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IG5hbWU6IFwiam1lbm9cIiB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAzNlwiKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IG5hbWU6IFwicHJpam1lbmlcIiB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAxMlwiKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IG5hbWU6IFwiYWRzdHJlZXRcIiB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAxM1wiKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IG5hbWU6IFwiYWRudW1iZXJpbnN0cmVldFwiIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDE0XCIpLmFkZEZpZWxkKFwiZ3N0YXRpY2ZpZWxkXCIsIHsgbmFtZTogXCJhZG51bWlubXVuaWNpcGFsaXRcIiB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAxNVwiKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IG5hbWU6IFwiYWRjaXR5XCIgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwMTZcIikuYWRkRmllbGQoXCJnc3RhdGljZmllbGRcIiwgeyBuYW1lOiBcImFkemlwY29kZVwiIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDE3XCIpLmFkZEZpZWxkKFwiZ3N0YXRpY2ZpZWxkXCIsIHsgbmFtZTogXCJhZHN0YXRlXCIgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwMzJcIikuYWRkRmllbGQoXCJnc3RhdGljZmllbGRcIiwgeyBuYW1lOiBcImJpZGF0ZVwiIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDMzXCIpLmFkZEZpZWxkKFwiZ3N0YXRpY2ZpZWxkXCIsIHsgbmFtZTogXCJiaWNpdHlcIiB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAzNFwiKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IG5hbWU6IFwiYmlzdGF0ZVwiIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDM1XCIpLmFkZEZpZWxkKFwiZ3N0YXRpY2ZpZWxkXCIsIHsgbmFtZTogXCJiaWNvdW50eVwiIH0pXHJcbiAgICB9XHJcbn0iXX0=
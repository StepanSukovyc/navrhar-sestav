"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GSkupinaVymahani.ts                    </Name>
//    <Description> Skupina vymáhání                                            </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-02-18                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var Vymahani;
                (function (Vymahani) {
                    let GSkupinaVymahani = class GSkupinaVymahani extends Gordic.GContentBase {
                        constructor() {
                            super(...arguments);
                            this.navazaneTypyPohledavek = [];
                            this.changedTypyPohledavek = false;
                            this.lastKnihaTypyPohledavek = undefined;
                            this.nullIxs = "000000000000";
                        }
                        onContentReady() {
                            if (this.nazev) {
                                this.title = this.nazev;
                            }
                            else if (this.ixs_skv)
                                this.title = `Skupina vymáhání ${this.ixs_skv}`;
                            else {
                                this.ixs_skv = this.nullIxs;
                                this.title = `Nová skupina vymáhání`;
                            }
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGSkupinaVymahaniZavritPotomky"]
                                }]);
                            this.createForm();
                            if (this.ixs_skv !== this.nullIxs) {
                                this.beginOperation();
                                let detailPromise = Gordic.Isl.SkupinaVymahani.read({ ixs_skv: this.ixs_skv })
                                    .get()
                                    .done((data) => {
                                    if (!this.closed) {
                                        this.data = data.data;
                                        this.formSkupinaVymahani.findFields().gfield("model", "apply", data.data, { initialValues: true });
                                        this.tabVycetFunkci.gtab("option", "visible", data.data.priz_vymahac === 1);
                                        if (data.data.priz_vymahac === 1) {
                                            this.createViewVycetFunkci();
                                        }
                                        this.formSkupinaVymahani.findFields().gfield("model", "validators", this.validators);
                                        this.formSkupinaVymahani.gform("waitForValues")
                                            .always(() => {
                                            this.endOperation();
                                        });
                                    }
                                });
                            }
                            else {
                                this.formSkupinaVymahani.findFields().gfield("model", "apply", { ixs_skv: this.ixs_skv }, { initialValues: true });
                                this.formSkupinaVymahani.findFields().gfield("model", "validators", this.validators);
                            }
                        }
                        createForm() {
                            this.createTabSkupinaVymahani();
                            this.createTabTypyPohledavek();
                            this.createTabKrokyVymahani();
                            this.createTabVycetFunkci();
                        }
                        createTabSkupinaVymahani() {
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                                .addRow("Identifikátor")
                                .addField("gstringbox", {
                                name: "ixs_skv",
                                disabled: true
                            })
                                .addRow("Název", true)
                                .addField("gstringbox", {
                                name: "nazev",
                                disabled: this.readOnly
                            })
                                .addRow("Poznámka")
                                .addField("gstringbox", {
                                name: "poznamka",
                                disabled: this.readOnly
                            })
                                .addRow("Způsob", true)
                                .addField("gselectbox", Gordic.Prefabs.Select.ddpcatv(), {
                                name: "alg_typ",
                                model: "model.alg_typ=value.alg_typ",
                                disabled: this.readOnly,
                                dropdown: true
                            })
                                .addRow("Typ Dokumentu", true)
                                .addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), {
                                name: "alg_typ",
                                model: "model.ixs_typ=value.ixs_typ",
                                disabled: this.readOnly,
                                dropdown: true
                            })
                                .addRow("ČJ hrom. předp. seznam")
                                .addField("gstringbox", {
                                name: "cj_predp_sez",
                                disabled: this.readOnly
                            })
                                .addRow("Barva")
                                .addField("gselectbox", {
                                name: "barva",
                                disabled: this.readOnly,
                                graphicInput: "hidden",
                                data: WebClient.Common.Base.GetColors(),
                                selector: (sel) => {
                                    var def = $.Deferred();
                                    let barva = this.formSkupinaVymahani.findFields("barva").gfield("getValue");
                                    this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Vymahani.GVyberBarvy", {
                                        ID: "DDPGVyberBarvy#", Barva: barva
                                    }, "Barva skupiny vymáhání", 400, 450)
                                        .on("close", (ev, retVal) => {
                                        if (retVal != null) {
                                            def.resolve(retVal);
                                        }
                                        else
                                            def.reject();
                                    });
                                    return def.promise();
                                },
                                itemTemplate: (val) => {
                                    if (val != null)
                                        return `<div style="background-color: ${WebClient.Common.Base.GetHexColor(val)}; height: 20px; border: 1px solid gray;"></div>`;
                                    else
                                        return "";
                                }
                            })
                                .addRow({ required: true })
                                .addField("gcheck", {
                                name: "priz_vymahac",
                                label: "Skupina s funkcemi dle výčtu",
                                disabled: this.readOnly,
                                emptyValue: null,
                                modelValueTransform: {
                                    apply: function (modelValue) { return modelValue === 1; },
                                    collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                                },
                                change: (ev, val) => {
                                    let def = $.Deferred();
                                    if (!this.readOnly && this.editMode && val.value == false) {
                                        let pocet = this.viewVycetFunkci.getDataRows(true, "data").filter(x => x.data.aktivita === 100).length;
                                        if (pocet > 0) {
                                            this.dialogs.confirm("Odstranit?", "Skupina má přiřazené funkce, tímto krokem je při uložení odstraníte.<br>Chcete pokračovat?")
                                                .on("close", (ev, retVal) => {
                                                if (retVal === "yes") {
                                                    def.resolve(false);
                                                }
                                                else {
                                                    def.resolve(true);
                                                    this.formSkupinaVymahani.findFields("priz_vymahac").gfield("setValue", true);
                                                }
                                            });
                                        }
                                        else
                                            def.resolve(false);
                                    }
                                    else
                                        def.resolve(val.value === true);
                                    if (val.value === true && this.viewVycetFunkci == null) {
                                        this.createViewVycetFunkci();
                                    }
                                    def.done((visibility) => {
                                        this.tabVycetFunkci.gtab("option", "visible", visibility === true);
                                    });
                                }
                            });
                            this.formSkupinaVymahani = $("<div>")
                                .appendTo(this.element)
                                .gtab({
                                title: "Skupina vymáhání",
                                opened: true
                            })
                                .gform("createFrom", form);
                        }
                        createViewVycetFunkci() {
                            this.viewVycetFunkci = new Gordic.Isl.View(Gordic.Isl.Vymahaci.list(rq => {
                                return {
                                    filters: {
                                        ixs_skv: this.ixs_skv
                                    }
                                };
                            }), {
                                processors: {
                                    permissionFragments: new Gordic.Data.FragmentManager(["Permissions"])
                                }
                            });
                            this.gridVycetFunkci.ggrid("setData", this.viewVycetFunkci);
                        }
                        createTabTypyPohledavek() {
                            this.taskTypyPohledavek = Gordic.Isl.SkupinaVymahani.navazaneTypyPohledavek(rq => {
                                return {
                                    ixs_skv: this.ixs_skv,
                                    ixp_den: this.ixp_den
                                };
                            });
                            var promiseTypyPohledavek = this.taskTypyPohledavek.get();
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                                .addRow("Kniha")
                                .addField("gselectbox", Gordic.Prefabs.Select.kniha(), {
                                name: "ixp_den",
                                model: "model.ixp_den=value.ixp_den",
                                change: (ev, obj) => {
                                    if (this.changedTypyPohledavek) {
                                        if (this.lastKnihaTypyPohledavek != null)
                                            this.dialogs.confirm("Uložit", "Chcete uložit změny navázaných typů pohledávek?").on("close", (ev2, retVal) => {
                                                if (retVal === "yes") {
                                                    this.saveNavazaneTypyPohledavek();
                                                }
                                                this.changeKniha(obj);
                                            });
                                        this.changedTypyPohledavek = false;
                                    }
                                    else
                                        this.changeKniha(obj);
                                }
                            })
                                .addRow()
                                .addField("gcheck", {
                                name: "vybrane",
                                label: "Vybrané",
                                change: (ev, obj) => {
                                    if (obj != null && obj.value != null) {
                                        this.setDataTypyPohledavek(obj.value);
                                    }
                                    else
                                        this.setDataTypyPohledavek(false);
                                }
                            });
                            this.tabTypyPohledavek = $("<div>")
                                .appendTo(this.element)
                                .gtab({
                                title: "Navázané typy pohledávek",
                                opened: false
                            });
                            $("<div>").appendTo(this.tabTypyPohledavek)
                                .gform("createFrom", form);
                            this.gridTypyPohledavek = $("<div>")
                                .appendTo(this.tabTypyPohledavek)
                                .gautofit()
                                .ggrid({
                                columns: WebClient.Common.GridFormats.NavazaneTypyPohledavek(this.readOnly, (ev, val) => {
                                    if (!this.readOnly) {
                                        this.changedTypyPohledavek = true;
                                    }
                                })
                            });
                            if (!this.closed) {
                                this.gridTypyPohledavek.gprogressoverlay({});
                                this.gridTypyPohledavek.gprogressoverlay("setPending", true);
                            }
                            this.tabTypyPohledavek.findFields("ixp_den").gfield("model", "apply", { ixp_den: this.ixp_den });
                            this.refreshDataTypyPohledavek(promiseTypyPohledavek);
                        }
                        createTabKrokyVymahani() {
                            this.viewKrokyVymahani = new Gordic.Isl.View(Gordic.Isl.KrokyVymahani.list(rq => {
                                return {
                                    filters: {
                                        ixs_skv: this.ixs_skv,
                                        aktivita: 100
                                    },
                                    fragments: ["*", "Permissions"]
                                };
                            }));
                            this.tabKrokyVymahani = $("<div>")
                                .appendTo(this.element)
                                .gtab({
                                menuBar: [{
                                        action: this.actions["actGSkupinaVymahaniKrokyVymahaniPridat"],
                                        favorite: true
                                    },
                                    {
                                        action: this.actions["actGSkupinaVymahaniKrokyVymahaniDetail"],
                                        favorite: true
                                    },
                                    {
                                        action: this.actions["actGSkupinaVymahaniKrokyVymahaniOdebrat"],
                                        favorite: true
                                    },
                                    {
                                        action: this.actions["actGSkupinaVymahaniKrokyVymahaniAdresati"],
                                        favorite: true
                                    }],
                                title: "Kroky vymáhání",
                                opened: false
                            });
                            this.gridKrokyVymahani = $("<div>")
                                .appendTo(this.tabKrokyVymahani)
                                .gautofit()
                                .ggrid({
                                data: this.viewKrokyVymahani,
                                columns: WebClient.Common.GridFormats.KrokyVymahani(),
                                defaultProfile: {
                                    columnList: "stav_vym_prev, stav_vym, format_cj, ixs_fun_pod, pocdvy, pocpnb, priz_skup, priz_pocatek"
                                }
                            });
                        }
                        createTabVycetFunkci() {
                            this.tabVycetFunkci = $("<div>")
                                .appendTo(this.element)
                                .gtab({
                                visible: false,
                                menuBar: [{
                                        action: this.actions["actGSkupinaVymahaniVycetFunkciPridat"],
                                        favorite: true
                                    },
                                    {
                                        action: this.actions["actGSkupinaVymahaniVycetFunkciOdebrat"],
                                        favorite: true
                                    },
                                    {
                                        action: this.actions["actGSkupinaVymahaniVycetFunkciObnovit"],
                                        favorite: true
                                    },
                                    {
                                        action: this.actions["actGSkupinaVymahaniVycetFunkciAvizace"],
                                        favorite: true
                                    }],
                                title: "Výčet funkcí",
                                opened: false
                            });
                            this.gridVycetFunkci = $("<div>")
                                .appendTo(this.tabVycetFunkci)
                                .gautofit()
                                .ggrid({
                                columns: WebClient.Common.GridFormats.Vymahaci(),
                                defaultProfile: {
                                    columnList: "ixs_fun, priz_avi, aktivita"
                                },
                                cellActivate: (ev, obj) => {
                                    this.enableActionsVyberFunkci(obj.cellInfo.row >= 0 ? obj.cellInfo.data.Permissions : undefined);
                                }
                            });
                        }
                        refreshVycetFunkci() {
                            if (this.viewVycetFunkci != null) {
                                let aca = this.gridVycetFunkci.ggrid("activeCellAddress");
                                this.viewVycetFunkci.requestData();
                                if (aca != null && aca.row >= 0) {
                                    this.gridVycetFunkci.ggrid("getView")
                                        .getLoadingPromise()
                                        .always(() => {
                                        this.gridVycetFunkci.ggrid("activeCellAddress", aca.row, aca.col);
                                        this.viewVycetFunkci.getLoadingPromise().done(() => {
                                            let newRow = this.gridVycetFunkci.ggrid("activeCellAddress");
                                            this.enableActionsVyberFunkci(newRow.row >= 0 ? newRow.data.Permissions : undefined);
                                        });
                                    });
                                }
                            }
                        }
                        enableActionsVyberFunkci(perm) {
                            if (perm && !this.readOnly) {
                                this.actions["actGSkupinaVymahaniVycetFunkciPridat"].updatePermission(perm, "CanCreate");
                                this.actions["actGSkupinaVymahaniVycetFunkciOdebrat"].updatePermission(perm, "CanDelete");
                                this.actions["actGSkupinaVymahaniVycetFunkciObnovit"].updatePermission(perm, "CanRestore");
                                this.actions["actGSkupinaVymahaniVycetFunkciAvizace"].updatePermission(perm, "CanChangeAvization");
                            }
                            else if (this.readOnly) {
                                this.actions["actGSkupinaVymahaniVycetFunkciPridat"].updatePermission({ value: false });
                                this.actions["actGSkupinaVymahaniVycetFunkciOdebrat"].updatePermission({ value: false });
                                this.actions["actGSkupinaVymahaniVycetFunkciObnovit"].updatePermission({ value: false });
                                this.actions["actGSkupinaVymahaniVycetFunkciAvizace"].updatePermission({ value: false });
                            }
                            else {
                                this.actions["actGSkupinaVymahaniVycetFunkciPridat"].updatePermission({ value: !this.readOnly });
                                this.actions["actGSkupinaVymahaniVycetFunkciOdebrat"].updatePermission({ value: false });
                                this.actions["actGSkupinaVymahaniVycetFunkciObnovit"].updatePermission({ value: false });
                                this.actions["actGSkupinaVymahaniVycetFunkciAvizace"].updatePermission({ value: false });
                            }
                            this.actions["actGSkupinaVymahaniVycetFunkciPridat"].visible(this.actions["actGSkupinaVymahaniVycetFunkciPridat"].enabled());
                            this.actions["actGSkupinaVymahaniVycetFunkciOdebrat"].visible(this.actions["actGSkupinaVymahaniVycetFunkciOdebrat"].enabled());
                            this.actions["actGSkupinaVymahaniVycetFunkciObnovit"].visible(this.actions["actGSkupinaVymahaniVycetFunkciObnovit"].enabled());
                            this.actions["actGSkupinaVymahaniVycetFunkciAvizace"].visible(this.actions["actGSkupinaVymahaniVycetFunkciAvizace"].enabled());
                        }
                        setDataTypyPohledavek(vybrane) {
                            let newData;
                            if (vybrane) {
                                newData = this.navazaneTypyPohledavek.filter((row) => { return row.vazba === true; });
                            }
                            else {
                                newData = this.navazaneTypyPohledavek;
                            }
                            if (!this.closed) {
                                this.gridTypyPohledavek.ggrid("setData", new Gordic.Data.View(newData, { key: "typ_phl" }));
                            }
                        }
                        refreshDataTypyPohledavek(promise) {
                            promise.done((data) => {
                                this.navazaneTypyPohledavek = data;
                                if (!this.closed) {
                                    let vybrane = this.tabTypyPohledavek.findFields("vybrane").gfield("getValue");
                                    this.setDataTypyPohledavek(vybrane);
                                    this.gridTypyPohledavek.gprogressoverlay("setPending", false);
                                }
                            });
                        }
                        changeKniha(obj) {
                            if (obj != null && obj.value != null) {
                                if (this.ixp_den != obj.value.ixp_den) {
                                    this.ixp_den = obj.value.ixp_den;
                                    this.gridTypyPohledavek.gprogressoverlay("setPending", true);
                                    this.refreshDataTypyPohledavek(this.taskTypyPohledavek.get());
                                }
                            }
                            let kniha = this.tabTypyPohledavek.findFields("ixp_den").gfield("getValue");
                            if (kniha != null && kniha.ixp_den != null)
                                this.lastKnihaTypyPohledavek = kniha.ixp_den;
                            else
                                this.lastKnihaTypyPohledavek = undefined;
                        }
                        saveNavazaneTypyPohledavek() {
                            let items = this.gridTypyPohledavek
                                .ggrid("getView")
                                .getRows()
                                .filter(x => x.vazba)
                                .map(x => { return x.typ_phl; });
                            let promise = Gordic.Isl.SkupinaVymahani.nastavitNavazaneTypyPohledavek({
                                ixp_den: this.lastKnihaTypyPohledavek,
                                ixs_skv: this.ixs_skv,
                                typ_phl: items
                            }).get();
                            WebClient.Common.Base.ProcessResponse(promise, this, false);
                            return promise;
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGSkupinaVymahaniZavritPotomky",
                                    run: () => {
                                        this.tryCloseAllSignificants();
                                    }
                                },
                                {
                                    name: "actGSkupinaVymahaniKrokyVymahaniPridat",
                                    caption: "Nový",
                                    icon: "fa-plus",
                                    enabled: !this.readOnly,
                                    visible: !this.readOnly,
                                    run: () => {
                                        var def = $.Deferred();
                                        if (!this.editMode) {
                                            this.dialogs.confirm("Uložit?", "Nejprve je potřeba uložit skupinu vymáhní.<br>Chcete uložit změny?")
                                                .on("close", (ev, retVal) => {
                                                if (retVal === "yes") {
                                                    this.doSave(def);
                                                }
                                                else
                                                    def.reject();
                                            });
                                        }
                                        else
                                            def.resolve();
                                        def.done(() => {
                                            let pouziteKroky = this.gridKrokyVymahani.ggrid("getView")
                                                .getDataRows(true, "data")
                                                .map(x => x.data.stav_vym)
                                                .filter((val, index, self) => self.indexOf(val) === index);
                                            this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Vymahani.GStavVymahani", {
                                                ID: "DDPGStavVymahani#", data: { ixs_skv: this.ixs_skv }, pouziteKroky: pouziteKroky, editMode: false, readOnly: this.readOnly,
                                            }, "Nový krok vymáhání", 600, 400)
                                                .on("close", (ev, retVal) => {
                                                if (retVal)
                                                    this.viewKrokyVymahani.requestData();
                                            });
                                        });
                                    }
                                },
                                {
                                    name: "actGSkupinaVymahaniKrokyVymahaniDetail",
                                    caption: "Detail",
                                    icon: "fa-pencil",
                                    run: () => {
                                        let row = this.gridKrokyVymahani.ggrid("activeRow");
                                        if (row == null)
                                            return;
                                        this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Vymahani.GStavVymahani", { data: row, editMode: true, readOnly: this.readOnly, ID: "DDPGStavVymahani#" }, `Krok vymáhání ${row.stav_vym}`, 600, 400)
                                            .on("close", (ev, retVal) => {
                                            if (retVal)
                                                this.viewKrokyVymahani.requestData();
                                        });
                                    }
                                },
                                {
                                    name: "actGSkupinaVymahaniKrokyVymahaniOdebrat",
                                    caption: "Smazat",
                                    icon: "fa-trash",
                                    enabled: !this.readOnly,
                                    visible: !this.readOnly,
                                    run: () => {
                                        let row = this.gridKrokyVymahani.ggrid("activeRow");
                                        if (row == null)
                                            return;
                                        this.dialogs.confirm("Smazat?", "Opravdu chcete smazat krok vymáhání?")
                                            .on("close", (ev, retVal) => {
                                            if (retVal === "yes") {
                                                WebClient.Common.Base.ProcessResponse(Gordic.Isl.KrokyVymahani.delete({ rq: { Data: row } }).get(), this, false)
                                                    .done(() => {
                                                    this.viewKrokyVymahani.requestData();
                                                });
                                            }
                                        });
                                    }
                                },
                                {
                                    name: "actGSkupinaVymahaniKrokyVymahaniAdresati",
                                    caption: "Adresáti",
                                    icon: "fa-user",
                                    run: () => {
                                        let row = this.gridKrokyVymahani.ggrid("activeRow");
                                        if (row == null)
                                            return;
                                        this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Vymahani.GAdresati", {
                                            ixs_skv: row.ixs_skv, stav_vym: row.stav_vym, readOnly: this.readOnly, editMode: this.editMode, ID: "DDPGAdresati#"
                                        }, "Navázaní adresáti", 800, 600);
                                    }
                                },
                                {
                                    name: "actGSkupinaVymahaniVycetFunkciPridat",
                                    caption: "Nový",
                                    icon: "fa-plus",
                                    enabled: !this.readOnly,
                                    visible: !this.readOnly,
                                    run: () => {
                                        var def = $.Deferred();
                                        if (!this.editMode) {
                                            this.dialogs.confirm("Uložit?", "Nejprve je potřeba uložit skupinu vymáhní.<br>Chcete uložit změny?")
                                                .on("close", (ev, retVal) => {
                                                if (retVal === "yes") {
                                                    this.doSave(def);
                                                }
                                                else
                                                    def.reject();
                                            });
                                        }
                                        else
                                            def.resolve();
                                        def.done(() => {
                                            this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Vymahani.GVyberFunkci", {
                                                ixs_skv: this.ixs_skv, readOnly: this.readOnly, editMode: this.editMode, ID: "DDPGVyberFunkci#"
                                            }, "Výběr funkce", 800, 600)
                                                .on("close", (ev, retVal) => {
                                                if (retVal) {
                                                    this.refreshVycetFunkci();
                                                }
                                            });
                                        });
                                    }
                                },
                                {
                                    name: "actGSkupinaVymahaniVycetFunkciOdebrat",
                                    caption: "Smazat",
                                    icon: "fa-trash",
                                    enabled: !this.readOnly,
                                    visible: !this.readOnly,
                                    run: () => {
                                        let row = this.gridVycetFunkci.ggrid("activeRow");
                                        if (row == null)
                                            return;
                                        let data = $.extend({}, row);
                                        data.aktivita = 900;
                                        WebClient.Common.Base.ProcessResponse(Gordic.Isl.Vymahaci.delete(rq => {
                                            return {
                                                rq: {
                                                    Data: data
                                                }
                                            };
                                        }).get(), this, false)
                                            .always(() => {
                                            this.refreshVycetFunkci();
                                        });
                                    }
                                },
                                {
                                    name: "actGSkupinaVymahaniVycetFunkciObnovit",
                                    caption: "Obnovit",
                                    icon: "fa-refresh",
                                    enabled: !this.readOnly,
                                    visible: !this.readOnly,
                                    run: () => {
                                        let row = this.gridVycetFunkci.ggrid("activeRow");
                                        if (row == null)
                                            return;
                                        let data = $.extend({}, row);
                                        data.aktivita = 100;
                                        WebClient.Common.Base.ProcessResponse(Gordic.Isl.Vymahaci.update(rq => {
                                            return {
                                                rq: {
                                                    Data: data
                                                }
                                            };
                                        }).get(), this, false)
                                            .always(() => {
                                            this.refreshVycetFunkci();
                                        });
                                    }
                                },
                                {
                                    name: "actGSkupinaVymahaniVycetFunkciAvizace",
                                    caption: "Změna avizace",
                                    icon: "fa-commenting-o",
                                    enabled: !this.readOnly,
                                    visible: !this.readOnly,
                                    run: () => {
                                        let row = this.gridVycetFunkci.ggrid("activeRow");
                                        if (row == null)
                                            return;
                                        let data = $.extend({}, row);
                                        data.priz_avi = data.priz_avi == 1 ? 0 : 1;
                                        WebClient.Common.Base.ProcessResponse(Gordic.Isl.Vymahaci.update(rq => {
                                            return {
                                                rq: {
                                                    Data: data
                                                }
                                            };
                                        }).get(), this, false)
                                            .always(() => {
                                            this.refreshVycetFunkci();
                                        });
                                    }
                                }]);
                        }
                        doSave(def) {
                            debugger;
                            let zmenyForm = this.formSkupinaVymahani.gform("hasChanged");
                            let defSkupinaVymahani = $.Deferred();
                            if (zmenyForm) {
                                if (!this.formSkupinaVymahani.gform("isValid")) {
                                    defSkupinaVymahani.reject();
                                    def.reject();
                                    return;
                                }
                                let dto = $.extend({}, this.data);
                                this.formSkupinaVymahani.findFields().gfield("model", "collect", dto);
                                let req = rq => {
                                    return {
                                        rq: { Data: dto }
                                    };
                                };
                                let task = this.editMode ? Gordic.Isl.SkupinaVymahani.update(req) : Gordic.Isl.SkupinaVymahani.create(req);
                                Ddp.WebClient.Common.Base.ProcessResponse(task.get(), this, false)
                                    .done((resp) => {
                                    debugger;
                                    if (resp.Messages == null || resp.Messages.length === 0) {
                                        this.editMode = true;
                                        this.data = resp.Dto;
                                        this.ixs_skv = resp.Dto.ixs_skv;
                                        this.formSkupinaVymahani.findFields().gfield("model", "apply", resp.Dto, { initialValues: true });
                                        defSkupinaVymahani.resolve();
                                    }
                                    else {
                                        defSkupinaVymahani.reject();
                                    }
                                })
                                    .fail(() => {
                                    defSkupinaVymahani.reject();
                                });
                            }
                            else
                                defSkupinaVymahani.resolve();
                            defSkupinaVymahani.then(() => {
                                let defTypyPohledavek = $.Deferred();
                                if (this.changedTypyPohledavek)
                                    this.saveNavazaneTypyPohledavek()
                                        .done(() => {
                                        defTypyPohledavek.resolve();
                                    })
                                        .fail(() => {
                                        defTypyPohledavek.reject();
                                    });
                                else
                                    defTypyPohledavek.resolve();
                                defTypyPohledavek.then(() => {
                                    def.resolve();
                                }, () => {
                                    this.dialogs.error("Chyba", "Chyba při ukládání navázaných typů pohledávek.");
                                    def.reject();
                                });
                            }, () => {
                                def.reject();
                            });
                        }
                        save(ask = false) {
                            let def = $.Deferred();
                            let zmenyForm = this.formSkupinaVymahani.gform("hasChanged");
                            let zmeny = this.changedTypyPohledavek || zmenyForm;
                            if (zmeny && ask) {
                                this.dialogs.confirm("Uložit", "Chcete uložit změny?")
                                    .on("close", (ev, retVal) => {
                                    if (retVal === "yes") {
                                        this.doSave(def);
                                    }
                                    else
                                        def.resolve();
                                });
                            }
                            else if (zmeny)
                                this.doSave(def);
                            else
                                def.resolve();
                            return def.promise();
                        }
                        closing() {
                            if (this.readOnly)
                                return;
                            else
                                return this.save(true);
                        }
                        cancel() {
                            this.close();
                        }
                        ok() {
                            if (!this.readOnly && !this.editMode) {
                                let f = this.formSkupinaVymahani.findFields("ixs_skv");
                                f.gfield("setInitial", null);
                                f.gfield("model", "apply", { ixs_skv: this.ixs_skv }, { initialValues: false });
                            }
                            this.save()
                                .done(() => {
                                this.close();
                            });
                        }
                    };
                    GSkupinaVymahani = __decorate([
                        Decorators.gcontent
                    ], GSkupinaVymahani);
                    Vymahani.GSkupinaVymahani = GSkupinaVymahani;
                })(Vymahani = Controls.Vymahani || (Controls.Vymahani = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NrdXBpbmFWeW1haGFuaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTa3VwaW5hVnltYWhhbmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUNqQixJQUFVLE1BQU0sQ0F1eUJmO0FBdnlCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F1eUJuQjtJQXZ5QmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXV5QjdCO1FBdnlCb0IsV0FBQSxTQUFTO1lBQUMsSUFBQSxRQUFRLENBdXlCdEM7WUF2eUI4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxRQUFRLENBdXlCL0M7Z0JBdnlCdUMsV0FBQSxRQUFRO29CQUU1QyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTt3QkFBbEQ7OzRCQVdJLDJCQUFzQixHQUE2RCxFQUFFLENBQUM7NEJBTzlFLDBCQUFxQixHQUFZLEtBQUssQ0FBQzs0QkFDdkMsNEJBQXVCLEdBQXVCLFNBQVMsQ0FBQzs0QkFXeEQsWUFBTyxHQUFHLGNBQWMsQ0FBQzt3QkFzd0JyQyxDQUFDO3dCQXB3QkcsY0FBYzs0QkFDVixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQ0FDYixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7NEJBQzVCLENBQUM7aUNBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTztnQ0FDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2lDQUMvQyxDQUFDO2dDQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyx1QkFBdUIsQ0FBQzs0QkFD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S0FBSyxFQUFFLENBQUM7NEJBQ2pCLENBQUMsQ0FBQyxDQUFDO3dCQUNYLENBQUM7cUJBQ0osQ0FBQTtvQkFweUJZLGdCQUFnQjt3QkFENUIsVUFBVSxDQUFDLFFBQVE7dUJBQ1AsZ0JBQWdCLENBb3lCNUI7b0JBcHlCWSx5QkFBZ0IsbUJBb3lCNUIsQ0FBQTtnQkFDTCxDQUFDLEVBdnlCdUMsUUFBUSxHQUFSLGlCQUFRLEtBQVIsaUJBQVEsUUF1eUIvQztZQUFELENBQUMsRUF2eUI4QixRQUFRLEdBQVIsa0JBQVEsS0FBUixrQkFBUSxRQXV5QnRDO1FBQUQsQ0FBQyxFQXZ5Qm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXV5QjdCO0lBQUQsQ0FBQyxFQXZ5QmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXV5Qm5CO0FBQUQsQ0FBQyxFQXZ5QlMsTUFBTSxLQUFOLE1BQU0sUUF1eUJmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdTa3VwaW5hVnltYWhhbmkudHMgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBTa3VwaW5hIHZ5bcOhaMOhbsOtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE5LTAyLTE4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5WeW1haGFuaSB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTa3VwaW5hVnltYWhhbmkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBpeHNfZnVuOiBzdHJpbmc7XHJcbiAgICAgICAgaXhzX3Nrdjogc3RyaW5nO1xyXG4gICAgICAgIGl4cF9kZW46IHN0cmluZztcclxuICAgICAgICBuYXpldjogc3RyaW5nO1xyXG5cclxuICAgICAgICB2YWxpZGF0b3JzOiBhbnk7XHJcbiAgICAgICAgcmVhZE9ubHk6IGJvb2xlYW47XHJcbiAgICAgICAgZWRpdE1vZGU6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIG5hdmF6YW5lVHlweVBvaGxlZGF2ZWs6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HTmF2YXphbmVUeXB5UG9obGVkYXZla0R0b1tdID0gW107XHJcbiAgICAgICAgZGF0YTogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdTa3VwaW5hVnltYWhhbmlEdG87XHJcblxyXG4gICAgICAgIHByaXZhdGUgZm9ybVNrdXBpbmFWeW1haGFuaTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0YWJUeXB5UG9obGVkYXZlazogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGdyaWRUeXB5UG9obGVkYXZlazogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGNoYW5nZWRUeXB5UG9obGVkYXZlazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHByaXZhdGUgbGFzdEtuaWhhVHlweVBvaGxlZGF2ZWs6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBwcml2YXRlIHRhc2tUeXB5UG9obGVkYXZlazogSXNsLl9UYXNrPGFueSwgYW55PjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0YWJLcm9reVZ5bWFoYW5pOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZEtyb2t5VnltYWhhbmk6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3S3Jva3lWeW1haGFuaTogSXNsLlZpZXc8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdLcm9reVZ5bWFoYW5pRHRvPjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0YWJWeWNldEZ1bmtjaTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGdyaWRWeWNldEZ1bmtjaTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIHZpZXdWeWNldEZ1bmtjaTogSXNsLlZpZXc8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFjaUR0bz47XHJcblxyXG4gICAgICAgIHByaXZhdGUgbnVsbEl4cyA9IFwiMDAwMDAwMDAwMDAwXCI7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5uYXpldikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMubmF6ZXY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5peHNfc2t2KVxyXG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IGBTa3VwaW5hIHZ5bcOhaMOhbsOtICR7dGhpcy5peHNfc2t2fWA7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5peHNfc2t2ID0gdGhpcy5udWxsSXhzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IGBOb3bDoSBza3VwaW5hIHZ5bcOhaMOhbsOtYDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3tcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMudGl0bGUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdTa3VwaW5hVnltYWhhbmlaYXZyaXRQb3RvbWt5XCJdXHJcbiAgICAgICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5peHNfc2t2ICE9PSB0aGlzLm51bGxJeHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGxldCBkZXRhaWxQcm9taXNlID0gSXNsLlNrdXBpbmFWeW1haGFuaS5yZWFkKHsgaXhzX3NrdjogdGhpcy5peHNfc2t2IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtU2t1cGluYVZ5bWFoYW5pLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGRhdGEuZGF0YSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJWeWNldEZ1bmtjaS5ndGFiKFwib3B0aW9uXCIsIFwidmlzaWJsZVwiLCBkYXRhLmRhdGEucHJpel92eW1haGFjID09PSAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5kYXRhLnByaXpfdnltYWhhYyA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlld1Z5Y2V0RnVua2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtU2t1cGluYVZ5bWFoYW5pLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy52YWxpZGF0b3JzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybVNrdXBpbmFWeW1haGFuaS5nZm9ybShcIndhaXRGb3JWYWx1ZXNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtU2t1cGluYVZ5bWFoYW5pLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgaXhzX3NrdjogdGhpcy5peHNfc2t2IH0sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybVNrdXBpbmFWeW1haGFuaS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoaXMudmFsaWRhdG9ycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVUYWJTa3VwaW5hVnltYWhhbmkoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVUYWJUeXB5UG9obGVkYXZlaygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVRhYktyb2t5VnltYWhhbmkoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVUYWJWeWNldEZ1bmtjaSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVUYWJTa3VwaW5hVnltYWhhbmkoKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIklkZW50aWZpa8OhdG9yXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19za3ZcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJOw6F6ZXZcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5yZWFkT25seVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3puw6Fta2FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5yZWFkT25seVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJacMWvc29iXCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmRkcGNhdHYoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWxnX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmFsZ190eXA9dmFsdWUuYWxnX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5LFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCBEb2t1bWVudHVcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3Quc3Nsc3R5cCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhbGdfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX3R5cD12YWx1ZS5peHNfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwixIxKIGhyb20uIHDFmWVkcC4gc2V6bmFtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNqX3ByZWRwX3NlelwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkJhcnZhXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJhcnZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY0lucHV0OiBcImhpZGRlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IENvbW1vbi5CYXNlLkdldENvbG9ycygpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAoc2VsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFydmE6IG51bWJlciA9IHRoaXMuZm9ybVNrdXBpbmFWeW1haGFuaS5maW5kRmllbGRzKFwiYmFydmFcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5WeW1haGFuaS5HVnliZXJCYXJ2eVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogXCJERFBHVnliZXJCYXJ2eSNcIiwgQmFydmE6IGJhcnZhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFwiQmFydmEgc2t1cGlueSB2eW3DoWjDoW7DrVwiLCA0MDAsIDQ1MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXRWYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKSBhcyBKUXVlcnlQcm9taXNlPG51bWJlcj47XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtDb21tb24uQmFzZS5HZXRIZXhDb2xvcih2YWwpfTsgaGVpZ2h0OiAyMHB4OyBib3JkZXI6IDFweCBzb2xpZCBncmF5O1wiPjwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X3Z5bWFoYWNcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTa3VwaW5hIHMgZnVua2NlbWkgZGxlIHbDvcSNdHVcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5yZWFkT25seSxcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsVmFsdWVUcmFuc2Zvcm06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChtb2RlbFZhbHVlKSB7IHJldHVybiBtb2RlbFZhbHVlID09PSAxOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0OiBmdW5jdGlvbiAoZmllbGRWYWx1ZSkgeyByZXR1cm4gZmllbGRWYWx1ZSA9PT0gdHJ1ZSA/IDEgOiAwOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgdmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZWFkT25seSAmJiB0aGlzLmVkaXRNb2RlICYmIHZhbC52YWx1ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvY2V0ID0gdGhpcy52aWV3VnljZXRGdW5rY2kuZ2V0RGF0YVJvd3ModHJ1ZSwgXCJkYXRhXCIpLmZpbHRlcih4ID0+IHguZGF0YS5ha3Rpdml0YSA9PT0gMTAwKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9jZXQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmNvbmZpcm0oXCJPZHN0cmFuaXQ/XCIsIFwiU2t1cGluYSBtw6EgcMWZacWZYXplbsOpIGZ1bmtjZSwgdMOtbXRvIGtyb2tlbSBqZSBwxZlpIHVsb8W+ZW7DrSBvZHN0cmFuw610ZS48YnI+Q2hjZXRlIHBva3JhxI1vdmF0P1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybVNrdXBpbmFWeW1haGFuaSEuZmluZEZpZWxkcyhcInByaXpfdnltYWhhY1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHZhbC52YWx1ZSA9PT0gdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsLnZhbHVlID09PSB0cnVlICYmIHRoaXMudmlld1Z5Y2V0RnVua2NpID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlld1Z5Y2V0RnVua2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5kb25lKCh2aXNpYmlsaXR5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYlZ5Y2V0RnVua2NpLmd0YWIoXCJvcHRpb25cIiwgXCJ2aXNpYmxlXCIsIHZpc2liaWxpdHkgPT09IHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5mb3JtU2t1cGluYVZ5bWFoYW5pID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlNrdXBpbmEgdnltw6Fow6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVWaWV3VnljZXRGdW5rY2koKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld1Z5Y2V0RnVua2NpID0gbmV3IElzbC5WaWV3KElzbC5WeW1haGFjaS5saXN0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfc2t2OiB0aGlzLml4c19za3ZcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbkZyYWdtZW50czogbmV3IEdvcmRpYy5EYXRhLkZyYWdtZW50TWFuYWdlcihbXCJQZXJtaXNzaW9uc1wiXSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZFZ5Y2V0RnVua2NpLmdncmlkKFwic2V0RGF0YVwiLCB0aGlzLnZpZXdWeWNldEZ1bmtjaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVRhYlR5cHlQb2hsZWRhdmVrKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy50YXNrVHlweVBvaGxlZGF2ZWsgPSBJc2wuU2t1cGluYVZ5bWFoYW5pLm5hdmF6YW5lVHlweVBvaGxlZGF2ZWsocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBpeHNfc2t2OiB0aGlzLml4c19za3YsXHJcbiAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogdGhpcy5peHBfZGVuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHByb21pc2VUeXB5UG9obGVkYXZlayA9IHRoaXMudGFza1R5cHlQb2hsZWRhdmVrLmdldCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiS25paGFcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3Qua25paGEoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4cF9kZW49dmFsdWUuaXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhbmdlZFR5cHlQb2hsZWRhdmVrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXN0S25paGFUeXB5UG9obGVkYXZlayAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwiVWxvxb5pdFwiLCBcIkNoY2V0ZSB1bG/Fvml0IHptxJtueSBuYXbDoXphbsO9Y2ggdHlwxa8gcG9obGVkw6F2ZWs/XCIpLm9uKFwiY2xvc2VcIiwgKGV2MiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZU5hdmF6YW5lVHlweVBvaGxlZGF2ZWsoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUtuaWhhKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWRUeXB5UG9obGVkYXZlayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlS25paGEob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnlicmFuZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZ5YnJhbsOpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqICE9IG51bGwgJiYgb2JqLnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YVR5cHlQb2hsZWRhdmVrKG9iai52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhVHlweVBvaGxlZGF2ZWsoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50YWJUeXB5UG9obGVkYXZlayA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOYXbDoXphbsOpIHR5cHkgcG9obGVkw6F2ZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLnRhYlR5cHlQb2hsZWRhdmVrKVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZFR5cHlQb2hsZWRhdmVrID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy50YWJUeXB5UG9obGVkYXZlaylcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdOYXZhemFuZVR5cHlQb2hsZWRhdmVrRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLk5hdmF6YW5lVHlweVBvaGxlZGF2ZWsodGhpcy5yZWFkT25seSwgKGV2LCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJlYWRPbmx5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWRUeXB5UG9obGVkYXZlayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRUeXB5UG9obGVkYXZlay5ncHJvZ3Jlc3NvdmVybGF5KHt9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFR5cHlQb2hsZWRhdmVrLmdwcm9ncmVzc292ZXJsYXkoXCJzZXRQZW5kaW5nXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRhYlR5cHlQb2hsZWRhdmVrLmZpbmRGaWVsZHMoXCJpeHBfZGVuXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBpeHBfZGVuOiB0aGlzLml4cF9kZW4gfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hEYXRhVHlweVBvaGxlZGF2ZWsocHJvbWlzZVR5cHlQb2hsZWRhdmVrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlVGFiS3Jva3lWeW1haGFuaSgpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3S3Jva3lWeW1haGFuaSA9IG5ldyBJc2wuVmlldyhJc2wuS3Jva3lWeW1haGFuaS5saXN0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfc2t2OiB0aGlzLml4c19za3YsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogW1wiKlwiLCBcIlBlcm1pc3Npb25zXCJdXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRhYktyb2t5VnltYWhhbmkgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHU2t1cGluYVZ5bWFoYW5pS3Jva3lWeW1haGFuaVByaWRhdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHU2t1cGluYVZ5bWFoYW5pS3Jva3lWeW1haGFuaURldGFpbFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHU2t1cGluYVZ5bWFoYW5pS3Jva3lWeW1haGFuaU9kZWJyYXRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1NrdXBpbmFWeW1haGFuaUtyb2t5VnltYWhhbmlBZHJlc2F0aVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJLcm9reSB2eW3DoWjDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkS3Jva3lWeW1haGFuaSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMudGFiS3Jva3lWeW1haGFuaSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMudmlld0tyb2t5VnltYWhhbmksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLktyb2t5VnltYWhhbmkoKSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcInN0YXZfdnltX3ByZXYsIHN0YXZfdnltLCBmb3JtYXRfY2osIGl4c19mdW5fcG9kLCBwb2NkdnksIHBvY3BuYiwgcHJpel9za3VwLCBwcml6X3BvY2F0ZWtcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVUYWJWeWNldEZ1bmtjaSgpIHtcclxuICAgICAgICAgICAgdGhpcy50YWJWeWNldEZ1bmtjaSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdTa3VwaW5hVnltYWhhbmlWeWNldEZ1bmtjaVByaWRhdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHU2t1cGluYVZ5bWFoYW5pVnljZXRGdW5rY2lPZGVicmF0XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdTa3VwaW5hVnltYWhhbmlWeWNldEZ1bmtjaU9ibm92aXRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1NrdXBpbmFWeW1haGFuaVZ5Y2V0RnVua2NpQXZpemFjZVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJWw73EjWV0IGZ1bmtjw61cIixcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZFZ5Y2V0RnVua2NpID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy50YWJWeWNldEZ1bmtjaSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5WeW1haGFjaSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwiaXhzX2Z1biwgcHJpel9hdmksIGFrdGl2aXRhXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmFibGVBY3Rpb25zVnliZXJGdW5rY2kob2JqLmNlbGxJbmZvLnJvdyA+PSAwID8gb2JqLmNlbGxJbmZvLmRhdGEuUGVybWlzc2lvbnMgOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWZyZXNoVnljZXRGdW5rY2koKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdWeWNldEZ1bmtjaSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWNhID0gdGhpcy5ncmlkVnljZXRGdW5rY2kuZ2dyaWQoXCJhY3RpdmVDZWxsQWRkcmVzc1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlld1Z5Y2V0RnVua2NpLnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWNhICE9IG51bGwgJiYgYWNhLnJvdyA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkVnljZXRGdW5rY2kuZ2dyaWQoXCJnZXRWaWV3XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRMb2FkaW5nUHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkVnljZXRGdW5rY2kuZ2dyaWQoXCJhY3RpdmVDZWxsQWRkcmVzc1wiLCBhY2Eucm93LCBhY2EuY29sKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlld1Z5Y2V0RnVua2NpLmdldExvYWRpbmdQcm9taXNlKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1JvdyA9IHRoaXMuZ3JpZFZ5Y2V0RnVua2NpLmdncmlkPERkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFjaUR0bz4oXCJhY3RpdmVDZWxsQWRkcmVzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZUFjdGlvbnNWeWJlckZ1bmtjaShuZXdSb3cucm93ID49IDAgPyBuZXdSb3cuZGF0YS5QZXJtaXNzaW9ucyA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlQWN0aW9uc1Z5YmVyRnVua2NpKHBlcm06IGFueSkge1xyXG4gICAgICAgICAgICBpZiAocGVybSAmJiAhdGhpcy5yZWFkT25seSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R1NrdXBpbmFWeW1haGFuaVZ5Y2V0RnVua2NpUHJpZGF0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuQ3JlYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R1NrdXBpbmFWeW1haGFuaVZ5Y2V0RnVua2NpT2RlYnJhdFwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhbkRlbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdTa3VwaW5hVnltYWhhbmlWeWNldEZ1bmtjaU9ibm92aXRcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybSwgXCJDYW5SZXN0b3JlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R1NrdXBpbmFWeW1haGFuaVZ5Y2V0RnVua2NpQXZpemFjZVwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhbkNoYW5nZUF2aXphdGlvblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnJlYWRPbmx5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHU2t1cGluYVZ5bWFoYW5pVnljZXRGdW5rY2lQcmlkYXRcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHU2t1cGluYVZ5bWFoYW5pVnljZXRGdW5rY2lPZGVicmF0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R1NrdXBpbmFWeW1haGFuaVZ5Y2V0RnVua2NpT2Jub3ZpdFwiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdTa3VwaW5hVnltYWhhbmlWeWNldEZ1bmtjaUF2aXphY2VcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHU2t1cGluYVZ5bWFoYW5pVnljZXRGdW5rY2lQcmlkYXRcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogIXRoaXMucmVhZE9ubHkgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHU2t1cGluYVZ5bWFoYW5pVnljZXRGdW5rY2lPZGVicmF0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R1NrdXBpbmFWeW1haGFuaVZ5Y2V0RnVua2NpT2Jub3ZpdFwiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdTa3VwaW5hVnltYWhhbmlWeWNldEZ1bmtjaUF2aXphY2VcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdTa3VwaW5hVnltYWhhbmlWeWNldEZ1bmtjaVByaWRhdFwiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHU2t1cGluYVZ5bWFoYW5pVnljZXRGdW5rY2lQcmlkYXRcIl0hLmVuYWJsZWQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdTa3VwaW5hVnltYWhhbmlWeWNldEZ1bmtjaU9kZWJyYXRcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R1NrdXBpbmFWeW1haGFuaVZ5Y2V0RnVua2NpT2RlYnJhdFwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R1NrdXBpbmFWeW1haGFuaVZ5Y2V0RnVua2NpT2Jub3ZpdFwiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHU2t1cGluYVZ5bWFoYW5pVnljZXRGdW5rY2lPYm5vdml0XCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHU2t1cGluYVZ5bWFoYW5pVnljZXRGdW5rY2lBdml6YWNlXCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdTa3VwaW5hVnltYWhhbmlWeWNldEZ1bmtjaUF2aXphY2VcIl0hLmVuYWJsZWQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldERhdGFUeXB5UG9obGVkYXZlayh2eWJyYW5lOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdEYXRhO1xyXG4gICAgICAgICAgICBpZiAodnlicmFuZSkge1xyXG4gICAgICAgICAgICAgICAgbmV3RGF0YSA9IHRoaXMubmF2YXphbmVUeXB5UG9obGVkYXZlay5maWx0ZXIoKHJvdykgPT4geyByZXR1cm4gcm93LnZhemJhID09PSB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3RGF0YSA9IHRoaXMubmF2YXphbmVUeXB5UG9obGVkYXZlaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkVHlweVBvaGxlZGF2ZWsuZ2dyaWQoXCJzZXREYXRhXCIsIG5ldyBEYXRhLlZpZXcobmV3RGF0YSwgeyBrZXk6IFwidHlwX3BobFwiIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWZyZXNoRGF0YVR5cHlQb2hsZWRhdmVrKHByb21pc2U6IEpRdWVyeVByb21pc2U8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdOYXZhemFuZVR5cHlQb2hsZWRhdmVrRHRvW10+ICkge1xyXG4gICAgICAgICAgICBwcm9taXNlLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2YXphbmVUeXB5UG9obGVkYXZlayA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZ5YnJhbmU6IGJvb2xlYW4gPSB0aGlzLnRhYlR5cHlQb2hsZWRhdmVrLmZpbmRGaWVsZHMoXCJ2eWJyYW5lXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YVR5cHlQb2hsZWRhdmVrKHZ5YnJhbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFR5cHlQb2hsZWRhdmVrLmdwcm9ncmVzc292ZXJsYXkoXCJzZXRQZW5kaW5nXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2hhbmdlS25paGEob2JqOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKG9iaiAhPSBudWxsICYmIG9iai52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5peHBfZGVuICE9IG9iai52YWx1ZS5peHBfZGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5peHBfZGVuID0gb2JqLnZhbHVlLml4cF9kZW4hO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFR5cHlQb2hsZWRhdmVrLmdwcm9ncmVzc292ZXJsYXkoXCJzZXRQZW5kaW5nXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaERhdGFUeXB5UG9obGVkYXZlayh0aGlzLnRhc2tUeXB5UG9obGVkYXZlay5nZXQoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBrbmloYTogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdLbmloYUR0byA9IHRoaXMudGFiVHlweVBvaGxlZGF2ZWsuZmluZEZpZWxkcyhcIml4cF9kZW5cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGlmIChrbmloYSAhPSBudWxsICYmIGtuaWhhLml4cF9kZW4gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMubGFzdEtuaWhhVHlweVBvaGxlZGF2ZWsgPSBrbmloYS5peHBfZGVuO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RLbmloYVR5cHlQb2hsZWRhdmVrID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzYXZlTmF2YXphbmVUeXB5UG9obGVkYXZlaygpIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5ncmlkVHlweVBvaGxlZGF2ZWtcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR05hdmF6YW5lVHlweVBvaGxlZGF2ZWtEdG8+KFwiZ2V0Vmlld1wiKVxyXG4gICAgICAgICAgICAgICAgLmdldFJvd3MoKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcih4ID0+IHgudmF6YmEpXHJcbiAgICAgICAgICAgICAgICAubWFwKHggPT4geyByZXR1cm4geC50eXBfcGhsITsgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHJvbWlzZSA9IElzbC5Ta3VwaW5hVnltYWhhbmkubmFzdGF2aXROYXZhemFuZVR5cHlQb2hsZWRhdmVrKHtcclxuICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoaXMubGFzdEtuaWhhVHlweVBvaGxlZGF2ZWshLFxyXG4gICAgICAgICAgICAgICAgaXhzX3NrdjogdGhpcy5peHNfc2t2LFxyXG4gICAgICAgICAgICAgICAgdHlwX3BobDogaXRlbXNcclxuICAgICAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgICAgIENvbW1vbi5CYXNlLlByb2Nlc3NSZXNwb25zZShwcm9taXNlLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFt7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdTa3VwaW5hVnltYWhhbmlaYXZyaXRQb3RvbWt5XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1NrdXBpbmFWeW1haGFuaUtyb2t5VnltYWhhbmlQcmlkYXRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w71cIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogIXRoaXMucmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiAhdGhpcy5yZWFkT25seSxcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmVkaXRNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwiVWxvxb5pdD9cIiwgXCJOZWpwcnZlIGplIHBvdMWZZWJhIHVsb8W+aXQgc2t1cGludSB2eW3DoWhuw60uPGJyPkNoY2V0ZSB1bG/Fvml0IHptxJtueT9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvU2F2ZShkZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvdXppdGVLcm9reSA9IHRoaXMuZ3JpZEtyb2t5VnltYWhhbmkuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdLcm9reVZ5bWFoYW5pRHRvPihcImdldFZpZXdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhUm93cyh0cnVlLCBcImRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoeCA9PiB4LmRhdGEuc3Rhdl92eW0hKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigodmFsLCBpbmRleCwgc2VsZikgPT4gc2VsZi5pbmRleE9mKHZhbCkgPT09IGluZGV4KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5WeW1haGFuaS5HU3RhdlZ5bWFoYW5pXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkREUEdTdGF2VnltYWhhbmkjXCIsIGRhdGE6IHsgaXhzX3NrdjogdGhpcy5peHNfc2t2IH0sIHBvdXppdGVLcm9reTogcG91eml0ZUtyb2t5LCBlZGl0TW9kZTogZmFsc2UsIHJlYWRPbmx5OiB0aGlzLnJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgXCJOb3bDvSBrcm9rIHZ5bcOhaMOhbsOtXCIsIDYwMCwgNDAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdLcm9reVZ5bWFoYW5pLnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHU2t1cGluYVZ5bWFoYW5pS3Jva3lWeW1haGFuaURldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtcGVuY2lsXCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkS3Jva3lWeW1haGFuaS5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0tyb2t5VnltYWhhbmlEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuVnltYWhhbmkuR1N0YXZWeW1haGFuaVwiLCB7IGRhdGE6IHJvdywgZWRpdE1vZGU6IHRydWUsIHJlYWRPbmx5OiB0aGlzLnJlYWRPbmx5LCBJRDpcIkREUEdTdGF2VnltYWhhbmkjXCIgfSwgYEtyb2sgdnltw6Fow6Fuw60gJHtyb3cuc3Rhdl92eW19YCwgNjAwLCA0MDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0tyb2t5VnltYWhhbmkucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1NrdXBpbmFWeW1haGFuaUtyb2t5VnltYWhhbmlPZGVicmF0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNtYXphdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJmYS10cmFzaFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogIXRoaXMucmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiAhdGhpcy5yZWFkT25seSxcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWRLcm9reVZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HS3Jva3lWeW1haGFuaUR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwiU21hemF0P1wiLCBcIk9wcmF2ZHUgY2hjZXRlIHNtYXphdCBrcm9rIHZ5bcOhaMOhbsOtP1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLlByb2Nlc3NSZXNwb25zZShJc2wuS3Jva3lWeW1haGFuaS5kZWxldGUoeyBycTogeyBEYXRhOiByb3cgfSB9KS5nZXQoKSwgdGhpcywgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0tyb2t5VnltYWhhbmkucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdTa3VwaW5hVnltYWhhbmlLcm9reVZ5bWFoYW5pQWRyZXNhdGlcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiQWRyZXPDoXRpXCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLXVzZXJcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWRLcm9reVZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HS3Jva3lWeW1haGFuaUR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5WeW1haGFuaS5HQWRyZXNhdGlcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfc2t2OiByb3cuaXhzX3Nrdiwgc3Rhdl92eW06IHJvdy5zdGF2X3Z5bSwgcmVhZE9ubHk6IHRoaXMucmVhZE9ubHksIGVkaXRNb2RlOiB0aGlzLmVkaXRNb2RlLCBJRDogXCJERFBHQWRyZXNhdGkjXCJcclxuICAgICAgICAgICAgICAgICAgICB9LCBcIk5hdsOhemFuw60gYWRyZXPDoXRpXCIsIDgwMCwgNjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHU2t1cGluYVZ5bWFoYW5pVnljZXRGdW5rY2lQcmlkYXRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w71cIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogIXRoaXMucmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiAhdGhpcy5yZWFkT25seSxcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmVkaXRNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwiVWxvxb5pdD9cIiwgXCJOZWpwcnZlIGplIHBvdMWZZWJhIHVsb8W+aXQgc2t1cGludSB2eW3DoWhuw60uPGJyPkNoY2V0ZSB1bG/Fvml0IHptxJtueT9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvU2F2ZShkZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlZ5bWFoYW5pLkdWeWJlckZ1bmtjaVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfc2t2OiB0aGlzLml4c19za3YsIHJlYWRPbmx5OiB0aGlzLnJlYWRPbmx5LCBlZGl0TW9kZTogdGhpcy5lZGl0TW9kZSwgSUQ6IFwiRERQR1Z5YmVyRnVua2NpI1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFwiVsO9YsSbciBmdW5rY2VcIiwgODAwLCA2MDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoVnljZXRGdW5rY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHU2t1cGluYVZ5bWFoYW5pVnljZXRGdW5rY2lPZGVicmF0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNtYXphdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJmYS10cmFzaFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogIXRoaXMucmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiAhdGhpcy5yZWFkT25seSxcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWRWeWNldEZ1bmtjaS5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYWNpRHRvPihcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSAkLmV4dGVuZCh7fSwgcm93KTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmFrdGl2aXRhID0gOTAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBDb21tb24uQmFzZS5Qcm9jZXNzUmVzcG9uc2UoSXNsLlZ5bWFoYWNpLmRlbGV0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKSwgdGhpcywgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoVnljZXRGdW5rY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1NrdXBpbmFWeW1haGFuaVZ5Y2V0RnVua2NpT2Jub3ZpdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPYm5vdml0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLXJlZnJlc2hcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICF0aGlzLnJlYWRPbmx5LFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogIXRoaXMucmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkVnljZXRGdW5rY2kuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFjaUR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gJC5leHRlbmQoe30sIHJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ha3Rpdml0YSA9IDEwMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKElzbC5WeW1haGFjaS51cGRhdGUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZ2V0KCksIHRoaXMsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFZ5Y2V0RnVua2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdTa3VwaW5hVnltYWhhbmlWeWNldEZ1bmtjaUF2aXphY2VcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWm3Em25hIGF2aXphY2VcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtY29tbWVudGluZy1vXCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiAhdGhpcy5yZWFkT25seSxcclxuICAgICAgICAgICAgICAgIHZpc2libGU6ICF0aGlzLnJlYWRPbmx5LFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZFZ5Y2V0RnVua2NpLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhY2lEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9ICQuZXh0ZW5kKHt9LCByb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEucHJpel9hdmkgPSBkYXRhLnByaXpfYXZpID09IDEgPyAwIDogMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKElzbC5WeW1haGFjaS51cGRhdGUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZ2V0KCksIHRoaXMsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFZ5Y2V0RnVua2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRvU2F2ZShkZWY6IEpRdWVyeS5EZWZlcnJlZDxhbnksIGFueSwgYW55Pikge1xyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgbGV0IHptZW55Rm9ybSA9IHRoaXMuZm9ybVNrdXBpbmFWeW1haGFuaS5nZm9ybShcImhhc0NoYW5nZWRcIik7XHJcbiAgICAgICAgICAgIGxldCBkZWZTa3VwaW5hVnltYWhhbmkgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoem1lbnlGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZm9ybVNrdXBpbmFWeW1haGFuaS5nZm9ybShcImlzVmFsaWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZTa3VwaW5hVnltYWhhbmkucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0gICBcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0Npc2VsbmlrQ3R2cnRpRHRvID0gJC5leHRlbmQoe30sIHRoaXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1Ta3VwaW5hVnltYWhhbmkuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXEgPSBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHsgRGF0YTogZHRvIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGxldCB0YXNrID0gdGhpcy5lZGl0TW9kZSA/IElzbC5Ta3VwaW5hVnltYWhhbmkudXBkYXRlKHJlcSkgOiBJc2wuU2t1cGluYVZ5bWFoYW5pLmNyZWF0ZShyZXEpO1xyXG4gICAgICAgICAgICAgICAgRGRwLldlYkNsaWVudC5Db21tb24uQmFzZS5Qcm9jZXNzUmVzcG9uc2UodGFzay5nZXQoKSwgdGhpcywgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJlc3A6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3AuTWVzc2FnZXMgPT0gbnVsbCB8fCByZXNwLk1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXNwLkR0bztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXhzX3NrdiA9IHJlc3AuRHRvLml4c19za3Y7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1Ta3VwaW5hVnltYWhhbmkuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgcmVzcC5EdG8sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZlNrdXBpbmFWeW1haGFuaS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZTa3VwaW5hVnltYWhhbmkucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmU2t1cGluYVZ5bWFoYW5pLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGRlZlNrdXBpbmFWeW1haGFuaS5yZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICBkZWZTa3VwaW5hVnltYWhhbmkudGhlbihcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGVmVHlweVBvaGxlZGF2ZWsgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhbmdlZFR5cHlQb2hsZWRhdmVrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVOYXZhemFuZVR5cHlQb2hsZWRhdmVrKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZUeXB5UG9obGVkYXZlay5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZlR5cHlQb2hsZWRhdmVrLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZUeXB5UG9obGVkYXZlay5yZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZlR5cHlQb2hsZWRhdmVrLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiQ2h5YmEgcMWZaSB1a2zDoWTDoW7DrSBuYXbDoXphbsO9Y2ggdHlwxa8gcG9obGVkw6F2ZWsuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNhdmUoYXNrOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB6bWVueUZvcm0gPSB0aGlzLmZvcm1Ta3VwaW5hVnltYWhhbmkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICBsZXQgem1lbnkgPSB0aGlzLmNoYW5nZWRUeXB5UG9obGVkYXZlayB8fCB6bWVueUZvcm07XHJcblxyXG4gICAgICAgICAgICBpZiAoem1lbnkgJiYgYXNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuY29uZmlybShcIlVsb8W+aXRcIiwgXCJDaGNldGUgdWxvxb5pdCB6bcSbbnk/XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb1NhdmUoZGVmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHptZW55KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kb1NhdmUoZGVmKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xvc2luZygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVhZE9ubHkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNhdmUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYW5jZWwoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucmVhZE9ubHkgJiYgIXRoaXMuZWRpdE1vZGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmID0gdGhpcy5mb3JtU2t1cGluYVZ5bWFoYW5pLmZpbmRGaWVsZHMoXCJpeHNfc2t2XCIpO1xyXG4gICAgICAgICAgICAgICAgZi5nZmllbGQoXCJzZXRJbml0aWFsXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgZi5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgaXhzX3NrdjogdGhpcy5peHNfc2t2IH0sIHsgaW5pdGlhbFZhbHVlczogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZSgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
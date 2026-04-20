"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Smz;
    (function (Smz) {
        var WebApp;
        (function (WebApp) {
            let SmzAdminPrehledMobilnichZarizeni = class SmzAdminPrehledMobilnichZarizeni extends Gordic.GContentBase {
                onContentReady() {
                    this.init();
                }
                init() {
                    this.taskId = "smzAdminPrehledMobilnichZarizeni";
                    this.createActions();
                    this.createBreadcrumbs();
                    this.createGrid();
                    this.setDataToGrid();
                    this.createSidebar();
                    this.createMenubar();
                }
                createActions() {
                    this.actions.addRange({
                        actBaseAction: {
                            caption: "jres:33000050",
                            run: (ev, ctx) => {
                                this.tryCloseAllChildContents();
                            }
                        },
                        actPovolit: {
                            caption: "jres:33000016", //RC 33000016 : Povolit
                            icon: "fa-check-square-o",
                            run: (ev, ctx) => {
                                this.povolitZarizeni(ctx);
                            }
                        },
                        actZakazat: {
                            caption: "jres:33000017", //RC 33000017 : Zakázat
                            icon: "fa-ban",
                            run: (ev, ctx) => {
                                this.zakazatZarizeni(ctx);
                            }
                        },
                        actSmazat: {
                            caption: "jres:33000056", //RC 33000056 : Odstranit
                            icon: "gi-bin",
                            run: (ev, ctx) => {
                                this.smazatZarizeni(ctx);
                            }
                        },
                        actReload: {
                            caption: "jres:33000063", //RC 33000063 : Obnovit
                            icon: "gi-refresh",
                            run: (ev, ctx) => {
                                this.setDataToGrid();
                            }
                        }
                    });
                }
                createBreadcrumbs() {
                    this.setBreadcrumbs({
                        action: this.actions.actBaseAction
                    });
                }
                createMenubar() {
                    this.menuBar(this.actions.createBar(["actReload*", "actPovolit*", "actZakazat*", "actSmazat*"]));
                }
                createContextMenu() {
                    return this.actions.createBar(["actPovolit*", "actZakazat*", "actSmazat*"]);
                }
                createGrid() {
                    this.grid = $("<div>").appendTo(this.element).gautofit({ resizersOnTab: false }).ggrid({
                        columns: this.createGridFormat(),
                        columnMode: "full",
                        contextMenu: this.createContextMenu(),
                        selection: (ev, ctx) => {
                            this.actions.actPovolit?.update({ enabled: false });
                            this.actions.actZakazat?.update({ enabled: false });
                            this.actions.actSmazat?.update({ enabled: false });
                            var data = this.grid.ggrid("activeRow");
                            if (ctx.count == 1) {
                                if (data.stav_za == 0)
                                    this.actions.actZakazat?.update({ enabled: true });
                                else
                                    this.actions.actPovolit?.update({ enabled: true });
                                this.actions.actSmazat?.update({ enabled: true });
                            }
                            if (data != null && data != undefined)
                                this.getAplikaceUzivatele(data.ixs_moz);
                            else
                                this.sidebarCntGrid.gtable("setData", []);
                        }
                    });
                }
                createGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addIconColumn({
                        name: "aktivita",
                        caption: "jres:33000009", //RC 33000009 : Stav zařízení
                        iconTemplate: (row) => {
                            var text = "";
                            var icon = "";
                            switch (row.stav_za) {
                                case 0:
                                    text = "jres:33000003"; //RC 33000003 : Aktivní
                                    icon = "fa-check-circle g-state-text g-state-success";
                                    break;
                                default:
                                    text = "jres:33000008"; //RC 33000008 : Zakázané
                                    icon = "fa-times-circle g-state-text g-state-error";
                                    break;
                            }
                            return { icon: icon, text: text, tooltip: text };
                        }
                    })
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:33000010", //RC 33000010 : Název
                        width: 300,
                    })
                        .addTextColumn({
                        name: "ixs_moz",
                        caption: "jres:33000011", //RC 33000011 : ID zařízení
                        width: 120
                    })
                        .addIconColumn({
                        name: "platforma",
                        caption: "jres:33000012", //RC 33000012 : Platforma
                        formatPreset: "full",
                        iconTemplate: (row) => {
                            var icon = "";
                            var text = row.platforma_nazev;
                            switch (row.platforma_id) {
                                case 10:
                                    icon = "fa-android";
                                    break;
                                case 20:
                                    icon = "fa-apple";
                                    break;
                                case 30:
                                    icon = "fa-windows";
                                    break;
                            }
                            return { icon: icon, text: text };
                        }
                    })
                        .addTextColumn({
                        name: "unique_id",
                        caption: "jres:33000013", //RC 33000013 : IMEI
                        width: 260
                    })
                        .addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "jres:33000014", //RC 33000014 : Datum změny
                        width: 170
                    });
                }
                setDataToGrid() {
                    this.beginOperation();
                    this.isl.SmzZarizeni.listZarizeni().getData().done((data) => {
                        this.grid.ggrid("setData", data);
                    }).always(() => { this.endOperation(); });
                }
                createSidebar() {
                    this.sidebarCntGrid = $("<div>").gtable({
                        columns: this.createAplikaceUzivateleColumns()
                    });
                    this.element.gsidebar("addPanel", "right", {
                        icon: "gi-users",
                        id: "previewUsers",
                        name: "previewUsers",
                        minWidth: 300,
                        caption: "jres:33000052", //RC 33000052 : Uživatelé
                        leaf: "jres:3300005", //RC 33000052 : Uživatelé
                        customDiv: this.sidebarCntGrid
                    });
                }
                createAplikaceUzivateleColumns() {
                    return new Gordic.Data.GridFormat()
                        .addTextColumn({
                        caption: "jres:33000054", //RC 33000054 : Fáze
                        name: "sfa"
                    })
                        .addTextColumn({
                        caption: "jres:33000055", //RC 33000055 : Název fáze
                        name: "sfa_txt"
                    })
                        .addDateTimeColumn({
                        caption: "jres:33000014",
                        name: "dat_zmena"
                    });
                }
                getAplikaceUzivatele(ixs_moz) {
                    if (ixs_moz) {
                        this.isl.SmzAplikaceUzivatele.list({ filters: { ixs_zar: ixs_moz } }).getView().done((view) => {
                            view.process({
                                ac: new Gordic.Data.Grouping([{
                                        defaultState: "open",
                                        hash: (meta, rows) => {
                                            return `${meta.data["ixs_ref_txt"]}`;
                                        }
                                    }])
                            });
                            this.sidebarCntGrid.gtable("setData", view);
                        });
                    }
                    else {
                        this.sidebarCntGrid.gtable("setData", []);
                    }
                }
                povolitZarizeni(ctx) {
                    var data;
                    if (ctx.cellInfo != undefined)
                        data = ctx.cellInfo.data;
                    else {
                        var row = this.grid.ggrid("activeRow");
                        data = (row == null) ? undefined : row;
                    }
                    if (data != null && data != undefined)
                        this.isl.SmzZarizeni.povolit(data).getData().done((out) => {
                            this.setDataToGrid();
                        });
                }
                zakazatZarizeni(ctx) {
                    var data;
                    if (ctx.cellInfo != undefined)
                        data = ctx.cellInfo.data;
                    else {
                        var row = this.grid.ggrid("activeRow");
                        data = (row == null) ? undefined : row;
                    }
                    if (data != null && data != undefined)
                        this.isl.SmzZarizeni.zakazat(data).getData().done((out) => {
                            this.setDataToGrid();
                        });
                }
                smazatZarizeni(ctx) {
                    var data;
                    if (ctx.cellInfo != undefined)
                        data = ctx.cellInfo.data;
                    else {
                        var row = this.grid.ggrid("activeRow");
                        data = (row == null) ? undefined : row;
                    }
                    if (data != null && data != undefined) {
                        this.dialogs.confirm("jres:33000057", "jres:33000058".format(data.nazev.toString())).on("yes", () => {
                            this.isl.SmzZarizeni.remove(data).getData().done((out) => {
                                this.setDataToGrid();
                            });
                        });
                    }
                }
            };
            SmzAdminPrehledMobilnichZarizeni = __decorate([
                Decorators.gcontent
            ], SmzAdminPrehledMobilnichZarizeni);
            WebApp.SmzAdminPrehledMobilnichZarizeni = SmzAdminPrehledMobilnichZarizeni;
        })(WebApp = Smz.WebApp || (Smz.WebApp = {}));
    })(Smz = Gordic.Smz || (Gordic.Smz = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Smz;
    (function (Smz) {
        var WebApp;
        (function (WebApp) {
            let SmzChangePasswordExt = class SmzChangePasswordExt extends Gordic.GContentBase {
                getSrv() {
                    if (this.srv == null || this.srv == undefined)
                        this.srv = this.createServiceContent("Gordic.Smz.WebApp.SmzChangePasswordExt");
                    return this.srv;
                }
                onContentReady() {
                    this.init();
                }
                init() {
                    this.createActions();
                    this.createCommandBar();
                    this.createForm();
                }
                createForm() {
                    var form = new Gordic.Forms.Form({ name: "form-change-passwd" })
                        .addRow("jres:33000036").addField("gstringbox", {
                        name: "ext_system",
                        initialValue: this.ext_system,
                        disabled: true
                    })
                        .addRow("jres:33000037").addField("gstringbox", {
                        name: "login",
                        initialValue: this.login,
                        disabled: true
                    })
                        .addRow("jres:33000038").addField("gstringbox", Gordic.Prefabs.GStringBox.password({
                        obslouzilJsemSbiraniHodnotZPolicekTakAbyNemohlNastatProblemSNeaktualnimSifrovacimKlicem: true
                    }), {
                        name: "old_password",
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true })],
                    })
                        .addRow("jres:33000039").addField("gstringbox", Gordic.Prefabs.GStringBox.password({
                        obslouzilJsemSbiraniHodnotZPolicekTakAbyNemohlNastatProblemSNeaktualnimSifrovacimKlicem: true
                    }), {
                        name: "new_password_1",
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true })]
                    })
                        .addRow("jres:33000040").addField("gstringbox", Gordic.Prefabs.GStringBox.password({
                        obslouzilJsemSbiraniHodnotZPolicekTakAbyNemohlNastatProblemSNeaktualnimSifrovacimKlicem: true
                    }), {
                        name: "new_password_2",
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true })]
                    });
                    $("<div>").appendTo(this.element).gform("createFrom", form);
                }
                createActions() {
                    this.actions.addRange({
                        actSave: {
                            caption: "jres:33000029",
                            icon: "gi-save",
                            customClass: "g-button--primary",
                            run: (ev, ctx) => {
                                this.saveNewPassword();
                            }
                        },
                        actClose: {
                            caption: "jres:33000041", //RC 33000041 : Zavřít
                            icon: "gi-window-close",
                            run: (ev, ctx) => {
                                this.close();
                            }
                        }
                    });
                }
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actClose*", "actSave*"]));
                }
                saveNewPassword() {
                    var form = this.element.findForms("form-change-passwd");
                    form.gform("waitForValues").then(() => {
                        if (form.gform("isValid")) {
                            return Gordic.Prefabs.GStringBox.updateChiperPublicKeys(form).then(() => {
                                var formData = {};
                                form.findFields().gfield("model", "collect", formData);
                                this.getSrv().call("ChangePassword", {
                                    oldPassword: formData["old_password"],
                                    newPassword1: formData["new_password_1"],
                                    newPassword2: formData["new_password_2"],
                                }).done((output) => {
                                    this.notification("showToast", {
                                        title: "jres:33000049", //RC 33000049 : Změna hesla pro ext. uživatele
                                        content: "jres:33000048", //RC 33000048 : Heslo pro externího uživatele bylo úspěšně změněno.
                                        state: "success",
                                    });
                                    this.close();
                                });
                            });
                        }
                    });
                }
            };
            SmzChangePasswordExt = __decorate([
                Decorators.gcontent
            ], SmzChangePasswordExt);
            WebApp.SmzChangePasswordExt = SmzChangePasswordExt;
        })(WebApp = Smz.WebApp || (Smz.WebApp = {}));
    })(Smz = Gordic.Smz || (Gordic.Smz = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Smz;
    (function (Smz) {
        var WebApp;
        (function (WebApp) {
            let SmzPrehledMobilnichZarizeni = class SmzPrehledMobilnichZarizeni extends Gordic.GContentBase {
                onContentReady() {
                    this.init();
                }
                init() {
                    this.taskId = "smzPrehledMobilnichZarizeni";
                    this.createActions();
                    this.createMenubar();
                    this.createBreadcrumbs();
                    this.createGrid();
                    //this.createSidebar();
                    this.setDataToGrid();
                    //this.createSidebar();
                    //this.createQrCode();
                }
                createActions() {
                    this.actions.addRange({
                        actBaseAction: {
                            caption: "jres:33000001", //RC 33000001 : Moje zařízení
                            run: (ev, ctx) => {
                                this.tryCloseAllChildContents();
                            }
                        },
                        actPovolit: {
                            caption: "jres:33000016", //RC 33000016 : Povolit
                            icon: "fa-check-square-o",
                            run: (ev, ctx) => {
                                this.povolitZarizeni(ctx);
                            }
                        },
                        actZakazat: {
                            caption: "jres:33000017", //RC 33000017 : Zakázat
                            icon: "fa-ban",
                            run: (ev, ctx) => {
                                this.zakazatZarizeni(ctx);
                            }
                        },
                        actUploadCertificate: {
                            caption: "jres:33000018", //RC 33000018 : Nahrát certifikát
                            icon: "gi-certif",
                            tooltip: "jres:33000064", //RC 33000064 : Pokud aplikace potřebuje pro svou práci certifikát, je možné ho do zařízení přenést přes tuto funkci
                            run: (ev, ctx) => {
                                this.uploadCerifikatDialog();
                            }
                        },
                        actChangePasswordExtUser: {
                            caption: "jres:33000035", //RC 33000035 : Změna hesla pro ext. uživatele
                            icon: "gi-lock",
                            enabled: this.changePasswordEnable,
                            run: (ev, ctx) => {
                                this.openChangePasswordExtUser();
                            }
                        },
                        actAdminMobileDevices: {
                            caption: "jres:33000050", //RC 33000050 : Všechna zařízení
                            icon: "gi-settings",
                            visible: this.allowAdminDevices,
                            run: (ev, ctx) => {
                                this.openAdminMobileDevices();
                            }
                        },
                        actQrCodeDialog: {
                            caption: "jres:33000060", //RC 33000060 : Zobrazit QR kód
                            tooltip: "jres:33000061", //RC 33000061 : Po instalaci klientské aplikace spárujte zařízení přes QR kód
                            icon: "gi-qr |gi-plus gi-bgw gi-stack-pos—rb",
                            run: (ev, ctx) => {
                                this.openDialogQrCode();
                            }
                        },
                        actReload: {
                            caption: "jres:33000063", //RC 33000063 : Obnovit
                            icon: "gi-refresh",
                            run: (ev, ctx) => {
                                this.setDataToGrid();
                            }
                        }
                    });
                    console.log(this.actions);
                }
                createBreadcrumbs() {
                    this.setBreadcrumbs({
                        action: this.actions.actBaseAction
                    });
                }
                createMenubar() {
                    this.menuBar(this.actions.createBar(["actReload*", "actPovolit*", "actZakazat*", "actUploadCertificate*", "actQrCodeDialog*", "actChangePasswordExtUser*", "actAdminMobileDevices*"]));
                }
                createContextBar() {
                    return this.actions.createBar(["actPovolit*", "actZakazat*", "actUploadCertificate*"]);
                }
                setDataToGrid() {
                    this.beginOperation();
                    this.isl.SmzZarizeni.listZarizeniAktualniUzivatel().getData().then((output) => {
                        this.grid.ggrid("setData", output);
                    }).always(() => { this.endOperation(); });
                }
                createGrid() {
                    this.grid = $("<div>").appendTo(this.element).gautofit({ resizersOnTab: false }).ggrid({
                        columns: this.createGridFormat(),
                        columnMode: "full",
                        contextMenu: this.createContextBar(),
                        selection: (ev, ctx) => {
                            this.actions.actPovolit?.update({ enabled: false });
                            this.actions.actZakazat?.update({ enabled: false });
                            this.actions.actUploadCertificate?.update({ enabled: false });
                            if (ctx.count == 1) {
                                var data = this.grid.ggrid("getSelection");
                                if (data[0].stav_za == 0)
                                    this.actions.actZakazat?.update({ enabled: true });
                                else
                                    this.actions.actPovolit?.update({ enabled: true });
                                this.actions.actUploadCertificate?.update({ enabled: true });
                            }
                        },
                        cellActivate: (ev, ctx) => {
                            if (this.previewController) {
                                if (ctx != null && ctx.cellInfo != null && ctx.cellInfo.data != null) {
                                    this.previewController.enable(true);
                                    this.previewController.show({
                                        data: ctx.cellInfo.data
                                    });
                                }
                                else {
                                    this.previewController.enable(false);
                                }
                            }
                        }
                    });
                }
                createGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addIconColumn({
                        name: "aktivita",
                        caption: "jres:33000009", //RC 33000009 : Stav zařízení
                        iconTemplate: (row) => {
                            var text = "";
                            var icon = "";
                            switch (row.stav_za) {
                                case 0:
                                    text = "jres:33000003"; //RC 33000003 : Aktivní
                                    icon = "fa-check-circle g-state-text g-state-success";
                                    break;
                                default:
                                    text = "jres:33000008"; //RC 33000008 : Zakázané
                                    icon = "fa-times-circle g-state-text g-state-error";
                                    break;
                            }
                            return { icon: icon, text: text, tooltip: text };
                        }
                    })
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:33000010", //RC 33000010 : Název
                        width: 300,
                    })
                        .addTextColumn({
                        name: "ixs_moz",
                        caption: "jres:33000011", //RC 33000011 : ID zařízení
                        width: 120
                    })
                        .addIconColumn({
                        name: "platforma",
                        caption: "jres:33000012", //RC 33000012 : Platforma
                        formatPreset: "full",
                        iconTemplate: (row) => {
                            var icon = "";
                            var text = row.platforma_nazev;
                            switch (row.platforma_id) {
                                case 10:
                                    icon = "fa-android";
                                    break;
                                case 20:
                                    icon = "fa-apple";
                                    break;
                                case 30:
                                    icon = "fa-windows";
                                    break;
                            }
                            return { icon: icon, text: text };
                        }
                    })
                        .addTextColumn({
                        name: "unique_id",
                        caption: "jres:33000013", //RC 33000013 : IMEI
                        width: 260
                    })
                        .addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "jres:33000014", //RC 33000014 : Datum změny
                        width: 170
                    });
                    //    .addTextColumn({
                    //        name: "aktivita",
                    //        caption: "jres:33000002", //RC 33000002 : Aktivita
                    //        iconTemplate: (row) => {
                    //            var text = "";
                    //            var icon = "";
                    //            switch (row.aktivita) {
                    //                case 100:
                    //                    text = "jres:33000003"; //RC 33000003 : Aktivní
                    //                    icon = "fa-check-circle g-state-text g-state-success"
                    //                    break;
                    //                case 300:
                    //                    text = "jres:33000004"; //RC 33000004 : Připraven
                    //                    icon = "fa-exclamation-triangle g-state-text g-state-info";
                    //                    break;
                    //                case 500:
                    //                    text = "jres:33000005"; //RC 33000005 : Neaktivní
                    //                    icon = "fa-exclamation-triangle g-state-text g-state-warning";
                    //                    break;
                    //                case 600:
                    //                    text = "jres:33000006" //RC 33000006 : Návrh
                    //                    icon = "fa-exclamation-triangle g-state-text g-state-info";
                    //                    break;
                    //                default:
                    //                    text = "jres:33000007" //RC 33000007 : Zrušeno
                    //                    icon = "fa-times-circle g-state-text g-state-error"
                    //                    break;
                    //            }
                    //            return { icon: icon, text: text, tooltip: text };
                    //        }
                    //})
                }
                //private createSidebar() {
                //    var previewPanels = {
                //        tabs: [
                //            Gordic.Previews.getDefaultPreviewTab({
                //                viewId: "smz:detailZarizeni",
                //                caption: "jres:33000015", //RC 33000015 : Náhled
                //            })
                //        ],
                //        useSubtask: false,
                //    }
                //    this.previewController = new Gordic.Previews.GPreviewController(this.element, previewPanels);
                //    this.previewController.registerPanel();
                //}
                povolitZarizeni(ctx) {
                    var data;
                    if (ctx.cellInfo != undefined)
                        data = ctx.cellInfo.data;
                    else {
                        var row = this.grid.ggrid("activeRow");
                        data = (row == null) ? undefined : row;
                    }
                    if (data != null && data != undefined)
                        this.isl.SmzZarizeni.povolit(data).getData().done((out) => {
                            this.setDataToGrid();
                        });
                }
                zakazatZarizeni(ctx) {
                    var data;
                    if (ctx.cellInfo != undefined)
                        data = ctx.cellInfo.data;
                    else {
                        var row = this.grid.ggrid("activeRow");
                        data = (row == null) ? undefined : row;
                    }
                    if (data != null && data != undefined)
                        this.isl.SmzZarizeni.zakazat(data).getData().done((out) => {
                            this.setDataToGrid();
                        });
                }
                uploadCerifikatDialog() {
                    var data = this.grid.ggrid("activeRow");
                    if (data != null && data != undefined) {
                        this.dialogs.showModalWindow("Gordic.Smz.WebApp.SmzUploadCertifikat", {
                            ixs_moz: data["ixs_moz"],
                            unique_id: data["unique_id"]
                        }, {
                            height: 500,
                            width: 500
                        });
                    }
                }
                openDialogQrCode() {
                    this.dialogs.showModalWindow(Gordic.Smz.WebApp.SmzQrCodeDialog, null, {
                        title: "jres:33000060",
                        height: 400,
                        width: 400
                    }).on("close", () => {
                        this.setDataToGrid();
                    });
                }
                //private createSidebarQrCode() {
                //    this.element.gsidebar("addPanel", "right", {
                //        id: "previewQrCode",
                //        name: "previewQrCode",
                //        minWidth: 300,
                //        caption: "jres:33000032", //RC 33000032 : QR kód
                //        leaf: "jres:33000032", //RC 33000032 : QR kód
                //        customDiv: this.qrCodeElement
                //    })
                //}
                //private createQrCode() {
                //    this.isl.SmzQrCodeSetting.readQrCode().getData().done((qrcode) => {
                //        this.qrCodeElement = $("<div>");
                //        if (qrcode.qr_code == null || qrcode.qr_code == undefined || qrcode.qr_code == "") {
                //            this.qrCodeElement.attr("style", "padding-left: 20px; padding-right: 20px;")
                //            $("<span>").appendTo(this.qrCodeElement).html("<h4>jres:33000033</h4>jres:33000034") //RC 33000034 : Nejsou vyplněny parametry smz_ws_url nebo smz_ws_extsys.
                //        } else {
                //            this.qrCodeElement.attr("style", "text-align: center; padding-top: 50px;")
                //            $("<img>").appendTo(this.qrCodeElement).attr("style", "width: 230px; image-rendering: pixelated;").attr("src", "data:image/jpg;base64,{0}".format(qrcode.qr_code?.toString()))
                //        }
                //        this.createSidebarQrCode();
                //    })
                //}
                openChangePasswordExtUser() {
                    this.dialogs.showModalWindow("Gordic.Smz.WebApp.SmzChangePasswordExt", null, {
                        height: 500,
                        width: 500
                    });
                }
                openAdminMobileDevices() {
                    this.navigate(["Gordic.Smz.WebApp.SmzAdminPrehledMobilnichZarizeni"], { ID: "smzAdminPrehledMobilnichZarizeni", taskId: "smzAdminPrehledMobilnichZarizeni" });
                }
            };
            SmzPrehledMobilnichZarizeni = __decorate([
                Decorators.gcontent
            ], SmzPrehledMobilnichZarizeni);
            WebApp.SmzPrehledMobilnichZarizeni = SmzPrehledMobilnichZarizeni;
        })(WebApp = Smz.WebApp || (Smz.WebApp = {}));
    })(Smz = Gordic.Smz || (Gordic.Smz = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Smz;
    (function (Smz) {
        var WebApp;
        (function (WebApp) {
            let SmzQrCodeDialog = class SmzQrCodeDialog extends Gordic.GContentBase {
                prepareContent() {
                    this.init();
                }
                init() {
                    this.createActions();
                    this.createCommandBar();
                    this.createQrCode();
                }
                createActions() {
                    this.actions.addRange({
                        actClose: {
                            caption: "jres:33000041", //RC 33000041 : Zavřít
                            icon: "gi-window-close",
                            run: (ev, ctx) => {
                                this.close();
                            }
                        }
                    });
                }
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actClose*"]));
                }
                createQrCode() {
                    this.showFlash({
                        content: "jres:33000062", //RC 33000062 : Po instalaci klientské aplikace, spárujte Vaše mobilní zařízení pomocí tohoto QR kódu.
                        state: "info"
                    });
                    this.isl.SmzQrCodeSetting.readQrCode().getData().done((qrcode) => {
                        this.qrCodeElement = $("<div>").appendTo(this.element);
                        if (qrcode.qr_code == null || qrcode.qr_code == undefined || qrcode.qr_code == "") {
                            this.qrCodeElement.attr("style", "padding-left: 20px; padding-right: 20px;");
                            $("<span>").appendTo(this.qrCodeElement).html("<h4>jres:33000033</h4>jres:33000034"); //RC 33000034 : Nejsou vyplněny parametry smz_ws_url nebo smz_ws_extsys.
                        }
                        else {
                            this.qrCodeElement.attr("style", "text-align: center; padding-top: 20px;");
                            $("<img>").appendTo(this.qrCodeElement).attr("style", "width: 230px; image-rendering: pixelated;").attr("src", "data:image/jpg;base64,{0}".format(qrcode.qr_code?.toString()));
                        }
                    });
                }
            };
            SmzQrCodeDialog = __decorate([
                Decorators.gcontent
            ], SmzQrCodeDialog);
            WebApp.SmzQrCodeDialog = SmzQrCodeDialog;
        })(WebApp = Smz.WebApp || (Smz.WebApp = {}));
    })(Smz = Gordic.Smz || (Gordic.Smz = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Smz;
    (function (Smz) {
        var WebApp;
        (function (WebApp) {
            let SmzUploadCertifikat = class SmzUploadCertifikat extends Gordic.GContentBase {
                getSrv() {
                    if (this.srv == undefined || this.srv == null)
                        this.srv = this.createServiceContent("Gordic.Smz.WebApp.SmzUploadCertifikat");
                    return this.srv;
                }
                onContentReady() {
                    this.init();
                }
                onClose() {
                    this.deleteTmpFiles();
                }
                init() {
                    this.fileGuids = [];
                    this.createActions();
                    this.createCommandBar();
                    this.showFlashInfo();
                    //this.createWizard();
                    this.createForm();
                }
                createActions() {
                    this.actions.addRange({
                        saveData: {
                            caption: "jres:33000029", //RC 33000029 : Uložit
                            icon: "gi-save",
                            customClass: "g-button--primary",
                            run: (ev, ctx) => {
                                this.getDataFromForm();
                            }
                        },
                        actClose: {
                            caption: "jres:33000041", //RC 33000041 : Zavřít
                            icon: "gi-window-close",
                            run: (ev, ctx) => {
                                this.close();
                            }
                        }
                    });
                }
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actClose*", "saveData*"]));
                }
                showFlashInfo() {
                    this.showFlash({
                        content: "jres:33000020", //RC 33000020 : Pro nahrání certifikátu je nutné mít u sebe také mobilní zařízení!
                        state: "info"
                    });
                }
                /*
                private createWizard() {
                    new Gordic.Wizard().create({
                        content: this
                    }, {
                        complete: (cnt, contentDiv, change) => {
                           this.close();
                        },
                        steps: [
                            {
                                caption: "jres:33000025", //RC 33000025 : Nahrání certifikátu
                                create: (cnt, contentDiv, change) => {
                                    this.createForm(contentDiv);
                                },
                                change: (cnt, contentDiv, change) => {
                                    this.getDataFromForm(cnt);
                                }
                            },
                            {
                                caption: "Nastavení na mobilním zařízení",
                                create: (cnt, contentDiv, change) => {
        
                                },
                                change: (cnt, contentDiv, change) => {
        
                                }
                            }
                        ]
                    })
                }
                */
                createForm() {
                    var form = new Gordic.Forms.Form({
                        layoutDescriptor: "L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0",
                        name: "formCertificate"
                    })
                        .addRow().addField("gstaticfield", { initialValue: "jres:33000022" }) //RC 33000022 : Ve formuláři vyberete certifikát (soubor .pfx)
                        .addRow().addField("gstaticfield", { initialValue: "jres:33000023" }) //RC 33000023 : Zadáte heslo přenosu (nejedná se o heslo k pfx souboru.
                        .addRow().addField("gstaticfield", { initialValue: "jres:33000024" }) //RC 33000023 : Zadáte heslo přenosu (nejedná se o heslo k pfx souboru.
                        .addRow().addField("gstaticfield", { initialValue: "jres:33000030" }) //RC 33000030 : Na mobilním zařízení zadáte kontrolní heslo přenosu a poté zadáte i heslo k nahranému certifikátu.
                        .addSection({
                        label: "jres:33000026",
                        name: "formCert"
                    })
                        .addRow("jres:33000027").addField("gfilefield", {
                        name: "certificate",
                        validators: [new Gordic.Validators.Required({ stopping: true })],
                        flag: "required",
                        acceptExtension: ".pfx",
                        fileUploaded: (ev, ctx) => {
                            if (ctx.fileInfo.guid)
                                this.fileGuids.push(ctx.fileInfo.guid);
                        }
                    })
                        .addRow("jres:33000028").addField("gstringbox", Gordic.Prefabs.GStringBox.password({
                        obslouzilJsemSbiraniHodnotZPolicekTakAbyNemohlNastatProblemSNeaktualnimSifrovacimKlicem: true
                    }), {
                        name: "password",
                        flag: "required"
                    });
                    this.formElement = $("<div>").gform("createFrom", form).appendTo(this.element);
                }
                getDataFromForm() {
                    var form = this.element.findForms("formCertificate");
                    return form.gform("waitForValues").then(() => {
                        if (form.gform("isValid")) {
                            return Gordic.Prefabs.GStringBox.updateChiperPublicKeys(form).then(() => {
                                var formData = {};
                                form.findFields().gfield("model", "collect", formData);
                                this.getSrv().call("SaveCertificate", {
                                    certificateguid: formData["certificate"][0]["guid"],
                                    password: formData["password"],
                                    ixs_moz: this.ixs_moz,
                                    unique_id: this.unique_id
                                }).done((out) => {
                                    form.findFormSections("formCert").hide();
                                    this.showFlash({ content: "jres:33000031", state: "success" }); //RC 33000031 : Uložení proběhlo úspěšně, můžete dokončit nastavení na mobilním zařízení.
                                });
                            });
                        }
                    });
                }
                deleteTmpFiles() {
                    if (this.fileGuids.length > 0)
                        this.getSrv().fire("DeleteTmpFiles", { guids: this.fileGuids });
                }
            };
            SmzUploadCertifikat = __decorate([
                Decorators.gcontent
            ], SmzUploadCertifikat);
            WebApp.SmzUploadCertifikat = SmzUploadCertifikat;
        })(WebApp = Smz.WebApp || (Smz.WebApp = {}));
    })(Smz = Gordic.Smz || (Gordic.Smz = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Smz;
    (function (Smz) {
        var WebApp;
        (function (WebApp) {
            var DetailForms;
            (function (DetailForms) {
                function FormSmzZarizeni() {
                    return new Gordic.Forms.Form()
                        .addRow("jres:33000002").addField("gstaticfield", {
                        name: "aktivita",
                        modelValueTransform: {
                            apply: (value) => {
                                if (value) {
                                    if (value == 0)
                                        return "jres:33000003";
                                    else
                                        return "jres:33000008";
                                }
                                return "";
                            }
                        }
                    })
                        .addRow("jres:33000010").addField("gstaticfield", { name: "nazev" })
                        .addRow("jres:33000011").addField("gstaticfield", { name: "ixs_moz" })
                        .addRow("jres:33000012").addField("gstaticfield", { name: "platforma" })
                        .addRow("jres:33000013").addField("gstaticfield", { name: "unique_id" })
                        .addRow("jres:33000014").addField("gstaticfield", { name: "dat_zmena", modelValueTransform: { apply: (value) => { return Gordic.Templates.Formatters.datetime(value); } } });
                }
                DetailForms.FormSmzZarizeni = FormSmzZarizeni;
            })(DetailForms = WebApp.DetailForms || (WebApp.DetailForms = {}));
        })(WebApp = Smz.WebApp || (Smz.WebApp = {}));
    })(Smz = Gordic.Smz || (Gordic.Smz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic216LndlYmFwcC5qcyIsInNvdXJjZVJvb3QiOiIuL0Vrby8iLCJzb3VyY2VzIjpbIlNtekFkbWluUHJlaGxlZE1vYmlsbmljaFphcml6ZW5pLnRzIiwiU216Q2hhbmdlUGFzc3dvcmRFeHQudHMiLCJTbXpQcmVobGVkTW9iaWxuaWNoWmFyaXplbmkudHMiLCJTbXpRckNvZGVEaWFsb2cudHMiLCJTbXpVcGxvYWRDZXJ0aWZpa2F0LnRzIiwic216LmRldGFpbGZvcm1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0F3UWY7QUF4UUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBd1FuQjtJQXhRZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxNQUFNLENBd1ExQjtRQXhRb0IsV0FBQSxNQUFNO1lBRXZCLElBQWEsZ0NBQWdDLEdBQTdDLE1BQWEsZ0NBQWlDLFNBQVEsT0FBQSxZQUFZO2dCQUk5RCxjQUFjO29CQUNWLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztnQkFFTyxJQUFJO29CQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsa0NBQWtDLENBQUM7b0JBQ2pELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDekIsQ0FBQztnQkFFTyxhQUFhO29CQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsYUFBYSxFQUFFOzRCQUNYLE9BQU8sRUFBRSxlQUFlOzRCQUN4QixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxDQUFDLHdCQUF3QixFQUFF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UUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt5QkFDckUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUM7eUJBQ3ZFLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDO3lCQUN2RSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO2dCQUNuTCxDQUFDO2dCQXJCZSwyQkFBZSxrQkFxQjlCLENBQUE7WUFHTCxDQUFDLEVBekIyQixXQUFXLEdBQVgsa0JBQVcsS0FBWCxrQkFBVyxRQXlCdEM7UUFBRCxDQUFDLEVBekJvQixNQUFNLEdBQU4sVUFBTSxLQUFOLFVBQU0sUUF5QjFCO0lBQUQsQ0FBQyxFQXpCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBeUJuQjtBQUFELENBQUMsRUF6QlMsTUFBTSxLQUFOLE1BQU0sUUF5QmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlNtei5XZWJBcHAge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBTbXpBZG1pblByZWhsZWRNb2JpbG5pY2haYXJpemVuaSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgc2lkZWJhckNudEdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICAgICAgdGhpcy50YXNrSWQgPSBcInNtekFkbWluUHJlaGxlZE1vYmlsbmljaFphcml6ZW5pXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJyZWFkY3J1bWJzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTaWRlYmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWVudWJhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0QmFzZUFjdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA1MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZUFsbENoaWxkQ29udGVudHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UG92b2xpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAxNlwiLCAvL1JDIDMzMDAwMDE2IDogUG92b2xpdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtY2hlY2stc3F1YXJlLW9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG92b2xpdFphcml6ZW5pKGN0eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFpha2F6YXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMTdcIiwgLy9SQyAzMzAwMDAxNyA6IFpha8OhemF0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1iYW5cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuemFrYXphdFphcml6ZW5pKGN0eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFNtYXphdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA1NlwiLCAvL1JDIDMzMDAwMDU2IDogT2RzdHJhbml0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1iaW5cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc21hemF0WmFyaXplbmkoY3R4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UmVsb2FkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDYzXCIsIC8vUkMgMzMwMDAwNjMgOiBPYm5vdml0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1yZWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUJyZWFkY3J1bWJzKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdEJhc2VBY3Rpb25cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudWJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0UmVsb2FkKlwiLCBcImFjdFBvdm9saXQqXCIsIFwiYWN0WmFrYXphdCpcIiwgXCJhY3RTbWF6YXQqXCJdKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29udGV4dE1lbnUoKTogTWVudVBhcmFtc1tdIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0UG92b2xpdCpcIiwgXCJhY3RaYWthemF0KlwiLCBcImFjdFNtYXphdCpcIl0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSkuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgIGNvbnRleHRNZW51OiB0aGlzLmNyZWF0ZUNvbnRleHRNZW51KCksXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb246IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFBvdm9saXQ/LnVwZGF0ZSh7IGVuYWJsZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RaYWthemF0Py51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0U21hemF0Py51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmNvdW50ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc3Rhdl96YSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFpha2F6YXQ/LnVwZGF0ZSh7IGVuYWJsZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQb3ZvbGl0Py51cGRhdGUoeyBlbmFibGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0U21hemF0Py51cGRhdGUoeyBlbmFibGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsICYmIGRhdGEgIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEFwbGlrYWNlVXppdmF0ZWxlKGRhdGEuaXhzX21veik7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaWRlYmFyQ250R3JpZC5ndGFibGUoXCJzZXREYXRhXCIsIFtdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDA5XCIsIC8vUkMgMzMwMDAwMDkgOiBTdGF2IHphxZnDrXplbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAocm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGljb24gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJvdy5zdGF2X3phKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IFwianJlczozMzAwMDAwM1wiOyAvL1JDIDMzMDAwMDAzIDogQWt0aXZuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uID0gXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBcImpyZXM6MzMwMDAwMDhcIjsgLy9SQyAzMzAwMDAwOCA6IFpha8OhemFuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uID0gXCJmYS10aW1lcy1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGljb246IGljb24sIHRleHQ6IHRleHQsIHRvb2x0aXA6IHRleHQgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMTBcIiwgLy9SQyAzMzAwMDAxMCA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX21velwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAxMVwiLCAvL1JDIDMzMDAwMDExIDogSUQgemHFmcOtemVuw61cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGxhdGZvcm1hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDEyXCIsIC8vUkMgMzMwMDAwMTIgOiBQbGF0Zm9ybWFcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRQcmVzZXQ6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogKHJvdykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWNvbiA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gcm93LnBsYXRmb3JtYV9uYXpldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyb3cucGxhdGZvcm1hX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb24gPSBcImZhLWFuZHJvaWRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbiA9IFwiZmEtYXBwbGVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbiA9IFwiZmEtd2luZG93c1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGljb246IGljb24sIHRleHQ6IHRleHQgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1bmlxdWVfaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMTNcIiwgLy9SQyAzMzAwMDAxMyA6IElNRUlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjYwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAxNFwiLCAvL1JDIDMzMDAwMDE0IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE3MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0RGF0YVRvR3JpZCgpIHtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmlzbC5TbXpaYXJpemVuaS5saXN0WmFyaXplbmkoKS5nZXREYXRhKCkuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCBkYXRhKTtcclxuICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKSB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVTaWRlYmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNpZGViYXJDbnRHcmlkID0gJChcIjxkaXY+XCIpLmd0YWJsZSh7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUFwbGlrYWNlVXppdmF0ZWxlQ29sdW1ucygpXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZ3NpZGViYXIoXCJhZGRQYW5lbFwiLCBcInJpZ2h0XCIsIHtcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktdXNlcnNcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcInByZXZpZXdVc2Vyc1wiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwcmV2aWV3VXNlcnNcIixcclxuICAgICAgICAgICAgICAgIG1pbldpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNTJcIiwgLy9SQyAzMzAwMDA1MiA6IFXFvml2YXRlbMOpXHJcbiAgICAgICAgICAgICAgICBsZWFmOiBcImpyZXM6MzMwMDAwNVwiLCAvL1JDIDMzMDAwMDUyIDogVcW+aXZhdGVsw6lcclxuICAgICAgICAgICAgICAgIGN1c3RvbURpdjogdGhpcy5zaWRlYmFyQ250R3JpZFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBcGxpa2FjZVV6aXZhdGVsZUNvbHVtbnMoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDU0XCIsIC8vUkMgMzMwMDAwNTQgOiBGw6F6ZVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2ZhXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDU1XCIsIC8vUkMgMzMwMDAwNTUgOiBOw6F6ZXYgZsOhemVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNmYV90eHRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDE0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0QXBsaWthY2VVeml2YXRlbGUoaXhzX21vejogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChpeHNfbW96KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzbC5TbXpBcGxpa2FjZVV6aXZhdGVsZS5saXN0KHsgZmlsdGVyczogeyBpeHNfemFyOiBpeHNfbW96IH0gfSkuZ2V0VmlldygpLmRvbmUoKHZpZXcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3LnByb2Nlc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhYzogbmV3IEdvcmRpYy5EYXRhLkdyb3VwaW5nKFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0U3RhdGU6IFwib3BlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzaDogKG1ldGEsIHJvd3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7bWV0YS5kYXRhW1wiaXhzX3JlZl90eHRcIl19YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2lkZWJhckNudEdyaWQuZ3RhYmxlKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpZGViYXJDbnRHcmlkLmd0YWJsZShcInNldERhdGFcIiwgW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHBvdm9saXRaYXJpemVuaShjdHgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGE7XHJcbiAgICAgICAgICAgIGlmIChjdHguY2VsbEluZm8gIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgZGF0YSA9IGN0eC5jZWxsSW5mby5kYXRhO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciByb3cgPSB0aGlzLmdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gKHJvdyA9PSBudWxsKSA/IHVuZGVmaW5lZCA6IHJvdztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsICYmIGRhdGEgIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc2wuU216WmFyaXplbmkucG92b2xpdChkYXRhKS5nZXREYXRhKCkuZG9uZSgob3V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB6YWthemF0WmFyaXplbmkoY3R4KSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhO1xyXG4gICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvICE9IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gdGhpcy5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IChyb3cgPT0gbnVsbCkgPyB1bmRlZmluZWQgOiByb3c7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCAmJiBkYXRhICE9IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNsLlNtelphcml6ZW5pLnpha2F6YXQoZGF0YSkuZ2V0RGF0YSgpLmRvbmUoKG91dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc21hemF0WmFyaXplbmkoY3R4KSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhO1xyXG4gICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvICE9IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gdGhpcy5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IChyb3cgPT0gbnVsbCkgPyB1bmRlZmluZWQgOiByb3c7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCAmJiBkYXRhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmNvbmZpcm0oXCJqcmVzOjMzMDAwMDU3XCIsIFwianJlczozMzAwMDA1OFwiLmZvcm1hdChkYXRhLm5hemV2LnRvU3RyaW5nKCkpKS5vbihcInllc1wiLCAoKSA9PiB7IC8vUkMgMzMwMDAwNTggOiBPcHJhdmR1IHNpIHDFmWVqZXRlIHNtYXphdCB0b3RvIG1vYmlsbsOtIHphxZnDrXplbsOtICh7MH0pP1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNsLlNtelphcml6ZW5pLnJlbW92ZShkYXRhKS5nZXREYXRhKCkuZG9uZSgob3V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuU216LldlYkFwcCB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIFNtekNoYW5nZVBhc3N3b3JkRXh0IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBwcml2YXRlIGxvZ2luOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBleHRfc3lzdGVtOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBzcnY6IEdDb250ZW50O1xyXG5cclxuICAgICAgICBnZXRTcnYoKTogR0NvbnRlbnQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zcnYgPT0gbnVsbCB8fCB0aGlzLnNydiA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNydiA9IHRoaXMuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuU216LldlYkFwcC5TbXpDaGFuZ2VQYXNzd29yZEV4dFwiKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zcnY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtLWNoYW5nZS1wYXNzd2RcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwMzZcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImV4dF9zeXN0ZW1cIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoaXMuZXh0X3N5c3RlbSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDM3XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IC8vUkMgMzMwMDAwMzcgOiBFeHRlcm7DrSBsb2dpblxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibG9naW5cIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoaXMubG9naW4sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAzOFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuR1N0cmluZ0JveC5wYXNzd29yZCh7IC8vUkMgMzMwMDAwMzggOiBTdGFyw6kgaGVzbG9cclxuICAgICAgICAgICAgICAgICAgICBvYnNsb3V6aWxKc2VtU2JpcmFuaUhvZG5vdFpQb2xpY2VrVGFrQWJ5TmVtb2hsTmFzdGF0UHJvYmxlbVNOZWFrdHVhbG5pbVNpZnJvdmFjaW1LbGljZW06IHRydWVcclxuICAgICAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJvbGRfcGFzc3dvcmRcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7IHN0b3BwaW5nOiB0cnVlIH0pXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAzOVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuR1N0cmluZ0JveC5wYXNzd29yZCh7IC8vUkMgMzMwMDAwMzkgOiBOb3bDqSBoZXNsb1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic2xvdXppbEpzZW1TYmlyYW5pSG9kbm90WlBvbGljZWtUYWtBYnlOZW1vaGxOYXN0YXRQcm9ibGVtU05lYWt0dWFsbmltU2lmcm92YWNpbUtsaWNlbTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5ld19wYXNzd29yZF8xXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoeyBzdG9wcGluZzogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwNDBcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkdTdHJpbmdCb3gucGFzc3dvcmQoeyAvL1JDIDMzMDAwMDQwIDogTm92w6kgaGVzbG8gem5vdnVcclxuICAgICAgICAgICAgICAgICAgICBvYnNsb3V6aWxKc2VtU2JpcmFuaUhvZG5vdFpQb2xpY2VrVGFrQWJ5TmVtb2hsTmFzdGF0UHJvYmxlbVNOZWFrdHVhbG5pbVNpZnJvdmFjaW1LbGljZW06IHRydWVcclxuICAgICAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuZXdfcGFzc3dvcmRfMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHsgc3RvcHBpbmc6IHRydWUgfSldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RTYXZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDI5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZU5ld1Bhc3N3b3JkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdENsb3NlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDQxXCIsIC8vUkMgMzMwMDAwNDEgOiBaYXbFmcOtdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RDbG9zZSpcIiwgXCJhY3RTYXZlKlwiXSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNhdmVOZXdQYXNzd29yZCgpIHtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwiZm9ybS1jaGFuZ2UtcGFzc3dkXCIpO1xyXG4gICAgICAgICAgICBmb3JtLmdmb3JtKFwid2FpdEZvclZhbHVlc1wiKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChmb3JtLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcmVmYWJzLkdTdHJpbmdCb3gudXBkYXRlQ2hpcGVyUHVibGljS2V5cyhmb3JtKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm1EYXRhOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGZvcm1EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTcnYoKS5jYWxsKFwiQ2hhbmdlUGFzc3dvcmRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkUGFzc3dvcmQ6IGZvcm1EYXRhW1wib2xkX3Bhc3N3b3JkXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGFzc3dvcmQxOiBmb3JtRGF0YVtcIm5ld19wYXNzd29yZF8xXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGFzc3dvcmQyOiBmb3JtRGF0YVtcIm5ld19wYXNzd29yZF8yXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5kb25lKChvdXRwdXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uKFwic2hvd1RvYXN0XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzMDAwMDQ5XCIsIC8vUkMgMzMwMDAwNDkgOiBabcSbbmEgaGVzbGEgcHJvIGV4dC4gdcW+aXZhdGVsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwianJlczozMzAwMDA0OFwiLCAvL1JDIDMzMDAwMDQ4IDogSGVzbG8gcHJvIGV4dGVybsOtaG8gdcW+aXZhdGVsZSBieWxvIMO6c3DEm8WhbsSbIHptxJtuxJtuby5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJuYW1lc3BhY2UgR29yZGljLlNtei5XZWJBcHAge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBTbXpQcmVobGVkTW9iaWxuaWNoWmFyaXplbmkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIHByaXZhdGUgcHJldmlld0NvbnRyb2xsZXI6IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgcXJDb2RlRWxlbWVudDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGNoYW5nZVBhc3N3b3JkRW5hYmxlOiBib29sZWFuO1xyXG4gICAgICAgIHByaXZhdGUgYWxsb3dBZG1pbkRldmljZXM6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICAgICAgdGhpcy50YXNrSWQgPSBcInNtelByZWhsZWRNb2JpbG5pY2haYXJpemVuaVwiO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51YmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQnJlYWRjcnVtYnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5jcmVhdGVTaWRlYmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZCgpO1xyXG4gICAgICAgICAgICAvL3RoaXMuY3JlYXRlU2lkZWJhcigpO1xyXG4gICAgICAgICAgICAvL3RoaXMuY3JlYXRlUXJDb2RlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RCYXNlQWN0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDAxXCIsIC8vUkMgMzMwMDAwMDEgOiBNb2plIHphxZnDrXplbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlQWxsQ2hpbGRDb250ZW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RQb3ZvbGl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDE2XCIsIC8vUkMgMzMwMDAwMTYgOiBQb3ZvbGl0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jaGVjay1zcXVhcmUtb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3ZvbGl0WmFyaXplbmkoY3R4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0WmFrYXphdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAxN1wiLCAvL1JDIDMzMDAwMDE3IDogWmFrw6F6YXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWJhblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56YWthemF0WmFyaXplbmkoY3R4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VXBsb2FkQ2VydGlmaWNhdGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMThcIiwgLy9SQyAzMzAwMDAxOCA6IE5haHLDoXQgY2VydGlmaWvDoXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWNlcnRpZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzAwMDA2NFwiLCAvL1JDIDMzMDAwMDY0IDogUG9rdWQgYXBsaWthY2UgcG90xZllYnVqZSBwcm8gc3ZvdSBwcsOhY2kgY2VydGlmaWvDoXQsIGplIG1vxb5uw6kgaG8gZG8gemHFmcOtemVuw60gcMWZZW7DqXN0IHDFmWVzIHR1dG8gZnVua2NpXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZENlcmlmaWthdERpYWxvZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RDaGFuZ2VQYXNzd29yZEV4dFVzZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMzVcIiwgLy9SQyAzMzAwMDAzNSA6IFptxJtuYSBoZXNsYSBwcm8gZXh0LiB1xb5pdmF0ZWxlXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1sb2NrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5jaGFuZ2VQYXNzd29yZEVuYWJsZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkNoYW5nZVBhc3N3b3JkRXh0VXNlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RBZG1pbk1vYmlsZURldmljZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNTBcIiwgLy9SQyAzMzAwMDA1MCA6IFbFoWVjaG5hIHphxZnDrXplbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zZXR0aW5nc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoaXMuYWxsb3dBZG1pbkRldmljZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5BZG1pbk1vYmlsZURldmljZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UXJDb2RlRGlhbG9nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDYwXCIsIC8vUkMgMzMwMDAwNjAgOiBab2JyYXppdCBRUiBrw7NkXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMzMDAwMDYxXCIsIC8vUkMgMzMwMDAwNjEgOiBQbyBpbnN0YWxhY2kga2xpZW50c2vDqSBhcGxpa2FjZSBzcMOhcnVqdGUgemHFmcOtemVuw60gcMWZZXMgUVIga8OzZFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcXIgfGdpLXBsdXMgZ2ktYmd3IGdpLXN0YWNrLXBvc+KAlHJiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5EaWFsb2dRckNvZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UmVsb2FkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDYzXCIsIC8vUkMgMzMwMDAwNjMgOiBPYm5vdml0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1yZWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYWN0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUJyZWFkY3J1bWJzKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdEJhc2VBY3Rpb25cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudWJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0UmVsb2FkKlwiLCBcImFjdFBvdm9saXQqXCIsIFwiYWN0WmFrYXphdCpcIiwgXCJhY3RVcGxvYWRDZXJ0aWZpY2F0ZSpcIiwgXCJhY3RRckNvZGVEaWFsb2cqXCIsIFwiYWN0Q2hhbmdlUGFzc3dvcmRFeHRVc2VyKlwiLCBcImFjdEFkbWluTW9iaWxlRGV2aWNlcypcIl0pKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb250ZXh0QmFyKCk6IE1lbnVQYXJhbXNbXSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFBvdm9saXQqXCIsIFwiYWN0WmFrYXphdCpcIiwgXCJhY3RVcGxvYWRDZXJ0aWZpY2F0ZSpcIl0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldERhdGFUb0dyaWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5pc2wuU216WmFyaXplbmkubGlzdFphcml6ZW5pQWt0dWFsbmlVeml2YXRlbCgpLmdldERhdGEoKS50aGVuKChvdXRwdXQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgb3V0cHV0KTtcclxuICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KS5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgY29udGV4dE1lbnU6IHRoaXMuY3JlYXRlQ29udGV4dEJhcigpLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQb3ZvbGl0Py51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0WmFrYXphdD8udXBkYXRlKHsgZW5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFVwbG9hZENlcnRpZmljYXRlPy51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmNvdW50ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhWzBdLnN0YXZfemEgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RaYWthemF0Py51cGRhdGUoeyBlbmFibGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0UG92b2xpdD8udXBkYXRlKHsgZW5hYmxlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFVwbG9hZENlcnRpZmljYXRlPy51cGRhdGUoeyBlbmFibGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGU6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJldmlld0NvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eCAhPSBudWxsICYmIGN0eC5jZWxsSW5mbyAhPSBudWxsICYmIGN0eC5jZWxsSW5mby5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlci5zaG93KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBjdHguY2VsbEluZm8uZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyLmVuYWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAwOVwiLCAvL1JDIDMzMDAwMDA5IDogU3RhdiB6YcWZw616ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogKHJvdykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpY29uID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyb3cuc3Rhdl96YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBcImpyZXM6MzMwMDAwMDNcIjsgLy9SQyAzMzAwMDAwMyA6IEFrdGl2bsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbiA9IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IFwianJlczozMzAwMDAwOFwiOyAvL1JDIDMzMDAwMDA4IDogWmFrw6F6YW7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb24gPSBcImZhLXRpbWVzLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogaWNvbiwgdGV4dDogdGV4dCwgdG9vbHRpcDogdGV4dCB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAxMFwiLCAvL1JDIDMzMDAwMDEwIDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfbW96XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDExXCIsIC8vUkMgMzMwMDAwMTEgOiBJRCB6YcWZw616ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwbGF0Zm9ybWFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMTJcIiwgLy9SQyAzMzAwMDAxMiA6IFBsYXRmb3JtYVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdFByZXNldDogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAocm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpY29uID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSByb3cucGxhdGZvcm1hX25hemV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJvdy5wbGF0Zm9ybWFfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbiA9IFwiZmEtYW5kcm9pZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uID0gXCJmYS1hcHBsZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uID0gXCJmYS13aW5kb3dzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogaWNvbiwgdGV4dDogdGV4dCB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVuaXF1ZV9pZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAxM1wiLCAvL1JDIDMzMDAwMDEzIDogSU1FSVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyNjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDE0XCIsIC8vUkMgMzMwMDAwMTQgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTcwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcImFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMDJcIiwgLy9SQyAzMzAwMDAwMiA6IEFrdGl2aXRhXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpY29uVGVtcGxhdGU6IChyb3cpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgdGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdmFyIGljb24gPSBcIlwiO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHN3aXRjaCAocm93LmFrdGl2aXRhKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGNhc2UgMTAwOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdGV4dCA9IFwianJlczozMzAwMDAwM1wiOyAvL1JDIDMzMDAwMDAzIDogQWt0aXZuw61cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGljb24gPSBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1zdWNjZXNzXCJcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjYXNlIDMwMDpcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRleHQgPSBcImpyZXM6MzMwMDAwMDRcIjsgLy9SQyAzMzAwMDAwNCA6IFDFmWlwcmF2ZW5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGljb24gPSBcImZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm9cIjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjYXNlIDUwMDpcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRleHQgPSBcImpyZXM6MzMwMDAwMDVcIjsgLy9SQyAzMzAwMDAwNSA6IE5lYWt0aXZuw61cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGljb24gPSBcImZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXdhcm5pbmdcIjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjYXNlIDYwMDpcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRleHQgPSBcImpyZXM6MzMwMDAwMDZcIiAvL1JDIDMzMDAwMDA2IDogTsOhdnJoXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpY29uID0gXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRleHQgPSBcImpyZXM6MzMwMDAwMDdcIiAvL1JDIDMzMDAwMDA3IDogWnJ1xaFlbm9cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGljb24gPSBcImZhLXRpbWVzLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogaWNvbiwgdGV4dDogdGV4dCwgdG9vbHRpcDogdGV4dCB9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgY3JlYXRlU2lkZWJhcigpIHtcclxuICAgICAgICAvLyAgICB2YXIgcHJldmlld1BhbmVscyA9IHtcclxuICAgICAgICAvLyAgICAgICAgdGFiczogW1xyXG4gICAgICAgIC8vICAgICAgICAgICAgR29yZGljLlByZXZpZXdzLmdldERlZmF1bHRQcmV2aWV3VGFiKHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB2aWV3SWQ6IFwic216OmRldGFpbFphcml6ZW5pXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDE1XCIsIC8vUkMgMzMwMDAwMTUgOiBOw6FobGVkXHJcbiAgICAgICAgLy8gICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICBdLFxyXG4gICAgICAgIC8vICAgICAgICB1c2VTdWJ0YXNrOiBmYWxzZSxcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlciA9IG5ldyBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyKHRoaXMuZWxlbWVudCwgcHJldmlld1BhbmVscyk7XHJcbiAgICAgICAgLy8gICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlci5yZWdpc3RlclBhbmVsKCk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHByaXZhdGUgcG92b2xpdFphcml6ZW5pKGN0eCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YTtcclxuICAgICAgICAgICAgaWYgKGN0eC5jZWxsSW5mbyAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gY3R4LmNlbGxJbmZvLmRhdGE7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRoaXMuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSAocm93ID09IG51bGwpID8gdW5kZWZpbmVkIDogcm93O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwgJiYgZGF0YSAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzbC5TbXpaYXJpemVuaS5wb3ZvbGl0KGRhdGEpLmdldERhdGEoKS5kb25lKChvdXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHpha2F6YXRaYXJpemVuaShjdHgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGE7XHJcbiAgICAgICAgICAgIGlmIChjdHguY2VsbEluZm8gIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgZGF0YSA9IGN0eC5jZWxsSW5mby5kYXRhO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciByb3cgPSB0aGlzLmdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gKHJvdyA9PSBudWxsKSA/IHVuZGVmaW5lZCA6IHJvdztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsICYmIGRhdGEgIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc2wuU216WmFyaXplbmkuemFrYXphdChkYXRhKS5nZXREYXRhKCkuZG9uZSgob3V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1cGxvYWRDZXJpZmlrYXREaWFsb2coKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsICYmIGRhdGEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLlNtei5XZWJBcHAuU216VXBsb2FkQ2VydGlmaWthdFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhzX21vejogZGF0YVtcIml4c19tb3pcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgdW5pcXVlX2lkOiBkYXRhW1widW5pcXVlX2lkXCJdXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvcGVuRGlhbG9nUXJDb2RlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KEdvcmRpYy5TbXouV2ViQXBwLlNtelFyQ29kZURpYWxvZywgbnVsbCwge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzAwMDA2MFwiLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA0MDAsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNDAwXHJcbiAgICAgICAgICAgIH0pLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIGNyZWF0ZVNpZGViYXJRckNvZGUoKSB7XHJcbiAgICAgICAgLy8gICAgdGhpcy5lbGVtZW50LmdzaWRlYmFyKFwiYWRkUGFuZWxcIiwgXCJyaWdodFwiLCB7XHJcbiAgICAgICAgLy8gICAgICAgIGlkOiBcInByZXZpZXdRckNvZGVcIixcclxuICAgICAgICAvLyAgICAgICAgbmFtZTogXCJwcmV2aWV3UXJDb2RlXCIsXHJcbiAgICAgICAgLy8gICAgICAgIG1pbldpZHRoOiAzMDAsXHJcbiAgICAgICAgLy8gICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAzMlwiLCAvL1JDIDMzMDAwMDMyIDogUVIga8OzZFxyXG4gICAgICAgIC8vICAgICAgICBsZWFmOiBcImpyZXM6MzMwMDAwMzJcIiwgLy9SQyAzMzAwMDAzMiA6IFFSIGvDs2RcclxuICAgICAgICAvLyAgICAgICAgY3VzdG9tRGl2OiB0aGlzLnFyQ29kZUVsZW1lbnRcclxuICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgY3JlYXRlUXJDb2RlKCkge1xyXG4gICAgICAgIC8vICAgIHRoaXMuaXNsLlNtelFyQ29kZVNldHRpbmcucmVhZFFyQ29kZSgpLmdldERhdGEoKS5kb25lKChxcmNvZGUpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgdGhpcy5xckNvZGVFbGVtZW50ID0gJChcIjxkaXY+XCIpO1xyXG4gICAgICAgIC8vICAgICAgICBpZiAocXJjb2RlLnFyX2NvZGUgPT0gbnVsbCB8fCBxcmNvZGUucXJfY29kZSA9PSB1bmRlZmluZWQgfHwgcXJjb2RlLnFyX2NvZGUgPT0gXCJcIikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhpcy5xckNvZGVFbGVtZW50LmF0dHIoXCJzdHlsZVwiLCBcInBhZGRpbmctbGVmdDogMjBweDsgcGFkZGluZy1yaWdodDogMjBweDtcIilcclxuICAgICAgICAvLyAgICAgICAgICAgICQoXCI8c3Bhbj5cIikuYXBwZW5kVG8odGhpcy5xckNvZGVFbGVtZW50KS5odG1sKFwiPGg0PmpyZXM6MzMwMDAwMzM8L2g0PmpyZXM6MzMwMDAwMzRcIikgLy9SQyAzMzAwMDAzNCA6IE5lanNvdSB2eXBsbsSbbnkgcGFyYW1ldHJ5IHNtel93c191cmwgbmVibyBzbXpfd3NfZXh0c3lzLlxyXG4gICAgICAgIC8vICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhpcy5xckNvZGVFbGVtZW50LmF0dHIoXCJzdHlsZVwiLCBcInRleHQtYWxpZ246IGNlbnRlcjsgcGFkZGluZy10b3A6IDUwcHg7XCIpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAkKFwiPGltZz5cIikuYXBwZW5kVG8odGhpcy5xckNvZGVFbGVtZW50KS5hdHRyKFwic3R5bGVcIiwgXCJ3aWR0aDogMjMwcHg7IGltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkO1wiKS5hdHRyKFwic3JjXCIsIFwiZGF0YTppbWFnZS9qcGc7YmFzZTY0LHswfVwiLmZvcm1hdChxcmNvZGUucXJfY29kZT8udG9TdHJpbmcoKSkpXHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgdGhpcy5jcmVhdGVTaWRlYmFyUXJDb2RlKCk7XHJcbiAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvcGVuQ2hhbmdlUGFzc3dvcmRFeHRVc2VyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLlNtei5XZWJBcHAuU216Q2hhbmdlUGFzc3dvcmRFeHRcIiwgbnVsbCwge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MDAsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNTAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9wZW5BZG1pbk1vYmlsZURldmljZXMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoW1wiR29yZGljLlNtei5XZWJBcHAuU216QWRtaW5QcmVobGVkTW9iaWxuaWNoWmFyaXplbmlcIl0sIHsgSUQ6IFwic216QWRtaW5QcmVobGVkTW9iaWxuaWNoWmFyaXplbmlcIiwgdGFza0lkOiBcInNtekFkbWluUHJlaGxlZE1vYmlsbmljaFphcml6ZW5pXCIgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLlNtei5XZWJBcHAge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBTbXpRckNvZGVEaWFsb2cgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIHByaXZhdGUgcXJDb2RlRWxlbWVudDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUXJDb2RlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RDbG9zZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA0MVwiLCAvL1JDIDMzMDAwMDQxIDogWmF2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0Q2xvc2UqXCJdKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlUXJDb2RlKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dGbGFzaCh7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcImpyZXM6MzMwMDAwNjJcIiwgLy9SQyAzMzAwMDA2MiA6IFBvIGluc3RhbGFjaSBrbGllbnRza8OpIGFwbGlrYWNlLCBzcMOhcnVqdGUgVmHFoWUgbW9iaWxuw60gemHFmcOtemVuw60gcG9tb2PDrSB0b2hvdG8gUVIga8OzZHUuXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogXCJpbmZvXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNsLlNtelFyQ29kZVNldHRpbmcucmVhZFFyQ29kZSgpLmdldERhdGEoKS5kb25lKChxcmNvZGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucXJDb2RlRWxlbWVudCA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHFyY29kZS5xcl9jb2RlID09IG51bGwgfHwgcXJjb2RlLnFyX2NvZGUgPT0gdW5kZWZpbmVkIHx8IHFyY29kZS5xcl9jb2RlID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnFyQ29kZUVsZW1lbnQuYXR0cihcInN0eWxlXCIsIFwicGFkZGluZy1sZWZ0OiAyMHB4OyBwYWRkaW5nLXJpZ2h0OiAyMHB4O1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICQoXCI8c3Bhbj5cIikuYXBwZW5kVG8odGhpcy5xckNvZGVFbGVtZW50KS5odG1sKFwiPGg0PmpyZXM6MzMwMDAwMzM8L2g0PmpyZXM6MzMwMDAwMzRcIikgLy9SQyAzMzAwMDAzNCA6IE5lanNvdSB2eXBsbsSbbnkgcGFyYW1ldHJ5IHNtel93c191cmwgbmVibyBzbXpfd3NfZXh0c3lzLlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnFyQ29kZUVsZW1lbnQuYXR0cihcInN0eWxlXCIsIFwidGV4dC1hbGlnbjogY2VudGVyOyBwYWRkaW5nLXRvcDogMjBweDtcIilcclxuICAgICAgICAgICAgICAgICAgICAkKFwiPGltZz5cIikuYXBwZW5kVG8odGhpcy5xckNvZGVFbGVtZW50KS5hdHRyKFwic3R5bGVcIiwgXCJ3aWR0aDogMjMwcHg7IGltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkO1wiKS5hdHRyKFwic3JjXCIsIFwiZGF0YTppbWFnZS9qcGc7YmFzZTY0LHswfVwiLmZvcm1hdChxcmNvZGUucXJfY29kZT8udG9TdHJpbmcoKSkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5TbXouV2ViQXBwIHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgU216VXBsb2FkQ2VydGlmaWthdCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBmb3JtRWxlbWVudDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIHNydjogR0NvbnRlbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBpeHNfbW96OiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSB1bmlxdWVfaWQ6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGZpbGVHdWlkczogc3RyaW5nW107XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0U3J2KCk6IEdDb250ZW50IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3J2ID09IHVuZGVmaW5lZCB8fCB0aGlzLnNydiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zcnYgPSB0aGlzLmNyZWF0ZVNlcnZpY2VDb250ZW50KFwiR29yZGljLlNtei5XZWJBcHAuU216VXBsb2FkQ2VydGlmaWthdFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3J2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25DbG9zZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVUbXBGaWxlcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbGVHdWlkcyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoSW5mbygpO1xyXG4gICAgICAgICAgICAvL3RoaXMuY3JlYXRlV2l6YXJkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgc2F2ZURhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMjlcIiwgLy9SQyAzMzAwMDAyOSA6IFVsb8W+aXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLWJ1dHRvbi0tcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXREYXRhRnJvbUZvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0Q2xvc2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNDFcIiwgLy9SQyAzMzAwMDA0MSA6IFphdsWZw610XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdENsb3NlKlwiLCBcInNhdmVEYXRhKlwiXSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNob3dGbGFzaEluZm8oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwianJlczozMzAwMDAyMFwiLCAvL1JDIDMzMDAwMDIwIDogUHJvIG5haHLDoW7DrSBjZXJ0aWZpa8OhdHUgamUgbnV0bsOpIG3DrXQgdSBzZWJlIHRha8OpIG1vYmlsbsOtIHphxZnDrXplbsOtIVxyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFwiaW5mb1wiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVXaXphcmQoKSB7XHJcbiAgICAgICAgICAgIG5ldyBHb3JkaWMuV2l6YXJkKCkuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXNcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN0ZXBzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMjVcIiwgLy9SQyAzMzAwMDAyNSA6IE5haHLDoW7DrSBjZXJ0aWZpa8OhdHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlOiAoY250LCBjb250ZW50RGl2LCBjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybShjb250ZW50RGl2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoY250LCBjb250ZW50RGl2LCBjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGF0YUZyb21Gb3JtKGNudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCBcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTmFzdGF2ZW7DrSBuYSBtb2JpbG7DrW0gemHFmcOtemVuw61cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlOiAoY250LCBjb250ZW50RGl2LCBjaGFuZ2UpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGNudCwgY29udGVudERpdiwgY2hhbmdlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMTItMTItMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcIixcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZm9ybUNlcnRpZmljYXRlXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IGluaXRpYWxWYWx1ZTogXCJqcmVzOjMzMDAwMDIyXCIgfSkgLy9SQyAzMzAwMDAyMiA6IFZlIGZvcm11bMOhxZlpIHZ5YmVyZXRlIGNlcnRpZmlrw6F0IChzb3Vib3IgLnBmeClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IGluaXRpYWxWYWx1ZTogXCJqcmVzOjMzMDAwMDIzXCIgfSkgLy9SQyAzMzAwMDAyMyA6IFphZMOhdGUgaGVzbG8gcMWZZW5vc3UgKG5lamVkbsOhIHNlIG8gaGVzbG8gayBwZnggc291Ym9ydS5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IGluaXRpYWxWYWx1ZTogXCJqcmVzOjMzMDAwMDI0XCIgfSkgLy9SQyAzMzAwMDAyMyA6IFphZMOhdGUgaGVzbG8gcMWZZW5vc3UgKG5lamVkbsOhIHNlIG8gaGVzbG8gayBwZnggc291Ym9ydS5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IGluaXRpYWxWYWx1ZTogXCJqcmVzOjMzMDAwMDMwXCIgfSkgLy9SQyAzMzAwMDAzMCA6IE5hIG1vYmlsbsOtbSB6YcWZw616ZW7DrSB6YWTDoXRlIGtvbnRyb2xuw60gaGVzbG8gcMWZZW5vc3UgYSBwb3TDqSB6YWTDoXRlIGkgaGVzbG8gayBuYWhyYW7DqW11IGNlcnRpZmlrw6F0dS5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgLy9SQyAzMzAwMDAyNiA6IEZvcm11bMOhxZkgcHJvIHZ5c3RhdmVuw60gY2VydGlmaWvDoXR1XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMzAwMDAyNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZm9ybUNlcnRcIlxyXG4gICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAyN1wiKS5hZGRGaWVsZChcImdmaWxlZmllbGRcIiwgeyAvL1JDIDMzMDAwMDI3IDogU291Ym9yIHMgY2VydGlmaWvDoXRlbVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2VydGlmaWNhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHsgc3RvcHBpbmc6IHRydWUgfSldLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBhY2NlcHRFeHRlbnNpb246IFwiLnBmeFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVVcGxvYWRlZDogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC5maWxlSW5mby5ndWlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGVHdWlkcy5wdXNoKGN0eC5maWxlSW5mby5ndWlkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAyOFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuR1N0cmluZ0JveC5wYXNzd29yZCh7IC8vUkMgMzMwMDAwMjggOiBIZXNsb1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic2xvdXppbEpzZW1TYmlyYW5pSG9kbm90WlBvbGljZWtUYWtBYnlOZW1vaGxOYXN0YXRQcm9ibGVtU05lYWt0dWFsbmltU2lmcm92YWNpbUtsaWNlbTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSksIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwYXNzd29yZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIlxyXG4gICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUVsZW1lbnQgPSAkKFwiPGRpdj5cIikuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldERhdGFGcm9tRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwiZm9ybUNlcnRpZmljYXRlXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtLmdmb3JtKFwid2FpdEZvclZhbHVlc1wiKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChmb3JtLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcmVmYWJzLkdTdHJpbmdCb3gudXBkYXRlQ2hpcGVyUHVibGljS2V5cyhmb3JtKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm1EYXRhOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGZvcm1EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTcnYoKS5jYWxsKFwiU2F2ZUNlcnRpZmljYXRlXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlcnRpZmljYXRlZ3VpZDogZm9ybURhdGFbXCJjZXJ0aWZpY2F0ZVwiXVswXVtcImd1aWRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogZm9ybURhdGFbXCJwYXNzd29yZFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19tb3o6IHRoaXMuaXhzX21veixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXF1ZV9pZDogdGhpcy51bmlxdWVfaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZG9uZSgob3V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGb3JtU2VjdGlvbnMoXCJmb3JtQ2VydFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaCh7IGNvbnRlbnQ6IFwianJlczozMzAwMDAzMVwiLCBzdGF0ZTogXCJzdWNjZXNzXCIgfSkgLy9SQyAzMzAwMDAzMSA6IFVsb8W+ZW7DrSBwcm9ixJtobG8gw7pzcMSbxaFuxJssIG3Fr8W+ZXRlIGRva29uxI1pdCBuYXN0YXZlbsOtIG5hIG1vYmlsbsOtbSB6YcWZw616ZW7DrS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkZWxldGVUbXBGaWxlcygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsZUd1aWRzLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFNydigpLmZpcmUoXCJEZWxldGVUbXBGaWxlc1wiLCB7IGd1aWRzOiB0aGlzLmZpbGVHdWlkcyB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuU216LldlYkFwcC5EZXRhaWxGb3JtcyB7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gRm9ybVNtelphcml6ZW5pKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKClcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwMDJcIikuYWRkRmllbGQoXCJnc3RhdGljZmllbGRcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWxWYWx1ZVRyYW5zZm9ybToge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gMCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMzAwMDAwM1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzMwMDAwMDhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwMTBcIikuYWRkRmllbGQoXCJnc3RhdGljZmllbGRcIiwgeyBuYW1lOiBcIm5hemV2XCIgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwMTFcIikuYWRkRmllbGQoXCJnc3RhdGljZmllbGRcIiwgeyBuYW1lOiBcIml4c19tb3pcIiB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAxMlwiKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IG5hbWU6IFwicGxhdGZvcm1hXCIgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwMTNcIikuYWRkRmllbGQoXCJnc3RhdGljZmllbGRcIiwgeyBuYW1lOiBcInVuaXF1ZV9pZFwiIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDE0XCIpLmFkZEZpZWxkKFwiZ3N0YXRpY2ZpZWxkXCIsIHsgbmFtZTogXCJkYXRfem1lbmFcIiwgbW9kZWxWYWx1ZVRyYW5zZm9ybTogeyBhcHBseTogKHZhbHVlKSA9PiB7IHJldHVybiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUodmFsdWUpIH0gfSB9KVxyXG4gICAgfVxyXG5cclxuXHJcbn0iXX0=
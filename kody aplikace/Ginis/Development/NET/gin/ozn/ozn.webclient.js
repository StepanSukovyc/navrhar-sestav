"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ozn;
    (function (Ozn) {
        var WebClient;
        (function (WebClient) {
            var Base;
            (function (Base) {
                function CreateGridReaded() {
                    return $("<div>").ggrid({
                        columnMode: "fit",
                        defaultProfile: {
                            sort: "dat_zmena",
                        },
                        emptyMessage: "<i>jres:33000053</i>", //RC 33000053 : Zatím nikdo nepotvrdil přečtení oznámení.
                        columns: new Gordic.Data.GridFormat()
                            .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "jres:33000059" //RC 33000059 : Potvrzeno
                        })
                            .addTextColumn({
                            name: "tit_pred",
                            caption: "jres:33000054", //RC 33000054 : Titul před jménem
                            width: 80
                        })
                            .addTextColumn({
                            name: "jmeno",
                            caption: "jres:33000055", //RC 33000055 : Jméno
                            width: 200
                        })
                            .addTextColumn({
                            name: "prijmeni",
                            caption: "jres:33000056", //RC 33000056 : Příjmení
                            width: 200
                        })
                            .addTextColumn({
                            name: "tit_za",
                            caption: "jres:33000057", //RC 33000057 : Titul za jménem
                            width: 80
                        })
                            .addTextColumn({
                            name: "nazev",
                            caption: "jres:33000058", //RC 33000058 : Název
                            width: 200
                        })
                    });
                }
                Base.CreateGridReaded = CreateGridReaded;
            })(Base = WebClient.Base || (WebClient.Base = {}));
        })(WebClient = Ozn.WebClient || (Ozn.WebClient = {}));
    })(Ozn = Gordic.Ozn || (Gordic.Ozn = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ozn;
    (function (Ozn) {
        var WebClient;
        (function (WebClient) {
            var Utils;
            (function (Utils) {
                function InitAsyncTask() {
                    var registerClass = "Gordic.Ozn.Server.MessagesAsync";
                    var currentAutLogout = [];
                    Gordic.Async.GTaskManager.off(".ozn");
                    Gordic.Async.GTaskManager.on("change.ozn", registerClass, function (o) {
                        if (o.progress) {
                            var activeNot = $(".gnotificationlist").gnotificationlist("get");
                            var activeIds = new Array();
                            if (activeNot != undefined) {
                                activeNot.forEach((n) => {
                                    if (n.group == "not-avz")
                                        activeIds.push(n.id);
                                });
                            }
                            if (o.progress["data"]) {
                                o.progress["data"].forEach((item) => {
                                    if ((item.uroven_msg == 50) || (item.uroven_msg == 30)) {
                                        var cnt = $.content($("#main"));
                                        if ($("body").findForms("msg-form-id-avz-{0}".format(parseInt(item.id_avz).toString())).length == 0) {
                                            Gordic.Isl.Messages.read({ id_avz: parseInt(item.id_avz) }).getData().then((out) => {
                                                cnt.dialogs.showModalWindow("Gordic.Ozn.WebClient.GMessageDetail", {
                                                    message: out,
                                                    ID: out.guid ? "GMessageDetailPriloha" : "GMessageDetailBezPrilohy",
                                                    taskId: "actGMessageDetail"
                                                }, {
                                                    width: out.guid ? 800 : 500,
                                                    height: out.guid ? 800 : 400
                                                });
                                            }).then(() => {
                                                // test upozorneni pred odhlasenim
                                                if (item.uroven_msg == 50) {
                                                    if (currentAutLogout.includes(item.id_avz) == false) {
                                                        currentAutLogout.push(item.id_avz);
                                                        createAlertBeforeLogout(item);
                                                    }
                                                }
                                                // end test
                                            });
                                        }
                                    }
                                    else {
                                        if (activeIds.includes("not-avz-{0}".format(item.id_avz.toString())) == false)
                                            createNotification(item);
                                    }
                                });
                            }
                        }
                    });
                    Gordic.Async.GTaskManager.on("disposed.ozn", registerClass, function (o) {
                        //##DISPOSED##:
                        //Uloha byla jakkoliv ukoncena. Pockam nahodny cas (mezi 0 - 100s) a zkusim inicializovat znovu.
                        //Nahodny cas je pro pripad, ze by aplikace bezela ve vice zalozkach zaraz. Proste, ktery
                        //tab prvni nastartuje, tak ostatni pak sdili jeho ulohu.
                        setTimeout(() => { StartAsyncTask(); }, Math.floor((Math.random() * 100) + 1));
                    });
                }
                Utils.InitAsyncTask = InitAsyncTask;
                function StartAsyncTask() {
                    //NOTE: Provadi se v jednotlivych krocich:
                    //1) Zjistim, jestli jsou async. ulohy inicializovane.
                    //2) Provedu synchronizaci ze serveru.
                    //3) Zjistim, jestli nahodou nebezi vice techto async. uloh (uzivatel muze mit otevreno vice zalozek).
                    //4) Je-li jich vice, tak ostatni zrusim a ponecham jen jednu spolecnou. Pokud neni, nastartuji jednu.
                    //5) V udalostech posloucham na 'disposed' (dale viz comment tam ##DISPOSED##)
                    if (Gordic.Async.GTaskManager.isInitialized()) {
                        Gordic.Async.GTaskManager.syncStates()
                            .then(() => {
                            if (!isAnyTaskRunning())
                                Gordic.Async.GTaskManager.delayedStart("Gordic.Ozn.Server.MessagesAsync", null, { clearOnFinish: true, autoClean: true });
                        });
                    }
                    else {
                        setTimeout(() => { StartAsyncTask(); }, 10 * 1000);
                    } //zkusime znovu za 10 sekund
                }
                Utils.StartAsyncTask = StartAsyncTask;
                function CheckReaded() {
                    // NOTE: Provadi se pouze při startu modulu 
                    // 1) Kontroluje zda neni nejaká zprava typu 50 přečtená ale, nevypršela její platnost - to znamená nezobrazí se velké modální okno pro potvrzení
                    Gordic.Isl.Messages.listReaded().getData().done((data) => {
                        data.forEach((item) => {
                            if (item.uroven_msg == 50)
                                createAlertBeforeLogout(item);
                        });
                    });
                }
                Utils.CheckReaded = CheckReaded;
                /** Zobrazení Trvalých zpráv pouze 1x při startu modulu */
                function ShowStartingMessages() {
                    Gordic.Isl.Messages.list({ filters: { uroven_msg: { o: "=", v: "20" } } }).getData().then((data) => {
                        var cnt = $.content($("#main"));
                        for (let item of data) {
                            if (item.id_avz) {
                                Gordic.Isl.Messages.read({ id_avz: item.id_avz }).getData().done((out) => {
                                    cnt.dialogs.showModalWindow("Gordic.Ozn.WebClient.GMessageDetail", {
                                        message: out,
                                        ID: out.guid ? "GMessageDetailPriloha" : "GMessageDetailBezPrilohy",
                                        taskId: "actGMessageDetail"
                                    }, {
                                        width: out.guid ? 800 : 500,
                                        height: out.guid ? 800 : 400
                                    });
                                });
                            }
                        }
                    });
                }
                Utils.ShowStartingMessages = ShowStartingMessages;
                /** Bezi alespon jedna async. uloha s oznamenimi adminum? (POZOR! uvnitr se vypinaji redundantni ulohy) */
                function isAnyTaskRunning() {
                    const tasks = getMessagesAsyncTaskRunning();
                    return cancelRedundantTasks(tasks) !== null;
                }
                /** Zrusi vsechny duplicitne bezici ulohy a vrati pouze tu jednu, ktera ma bezet. */
                function cancelRedundantTasks(tasks) {
                    let singleRunning = null;
                    for (let i = 0; i < tasks.length; i++) {
                        const task = tasks[i];
                        if (!singleRunning && task.state === 1 /* Gordic.Async.GTaskState.running */) {
                            singleRunning = task;
                            continue;
                        }
                        task.cancel(true);
                    }
                    return singleRunning;
                }
                /** Vrati seznam bezicich async. uloh typu 'Gordic.Ozn.Server.MessagesAsync'. */
                function getMessagesAsyncTaskRunning() {
                    return Gordic.Async.GTaskManager.findByClass("Gordic.Ozn.Server.MessagesAsync")
                        .filter(t => t.state === 1 /* Gordic.Async.GTaskState.running */);
                }
                function createNotification(message) {
                    var cnt = $.content($("#main"));
                    var notifOpts = {
                        group: "not-avz",
                        id: "not-avz-{0}".format(message.id_avz?.toString()),
                        content: message,
                        dateTime: new Date(Date.now()),
                        icon: (message.uroven_msg == 50 || message.uroven_msg == 30) ? "fa-exclamation-triangle" : "fa-info-circle",
                        state: createNotificationLevel(message.uroven_msg),
                        shortTemplate: "<b>{popis}</b><br /><span>{text}</span><br /><i class='fa fa-external-link' aria-hidden='true'></i>&nbsp;<b>jres:33000051</b>", //RC 33000051 : Klikněte pro detail zprávy.
                        defaultAction: new GAction({
                            name: "openNotMessage",
                            customClass: "id-avz_{0}".format(message.id_avz?.toString()),
                            run: function (ev, ctx) {
                                if (this.customClass) {
                                    var id_avz = this.customClass.split("_")[1];
                                    if (!notifObs.isVisited) {
                                        notifObs.update({ isVisited: true });
                                    }
                                    Gordic.Isl.Messages.read({ id_avz: parseInt(id_avz) }).getData().done((out) => {
                                        cnt.dialogs.showModalWindow("Gordic.Ozn.WebClient.GMessageDetail", {
                                            message: out,
                                            ID: out.guid ? "GMessageDetailPriloha" : "GMessageDetailBezPrilohy",
                                            taskId: "actGMessageDetail"
                                        }, {
                                            width: out.guid ? 800 : 500,
                                            height: out.guid ? 800 : 400
                                        });
                                    });
                                }
                            }
                        })
                    };
                    var notifObs = new GObservableObject(notifOpts);
                    cnt.notification("add", notifObs, { delay: message.avz_delay });
                }
                Utils.createNotification = createNotification;
                function createDialogForMostImportantMessage(message) {
                    var actionConfirm = new GAction({
                        name: "msg-confirm",
                        caption: "OK",
                        customClass: "g-button--primary",
                        enabled: false,
                        run: (ev, ctx) => {
                            var cnt = $.content(ev.target);
                            if (ctx.id_avz != null && ctx.id_avz != undefined) {
                                Gordic.Isl.Messages.confirmRead({ id_avz: ctx.id_avz }).getData().done((res) => {
                                    cnt.close();
                                });
                            }
                        }
                    });
                    setTimeout(() => actionConfirm.enabled(true), 2000);
                    GDlg.messageBox({
                        commandBar: [{
                                actionContext: { id_avz: message.id_avz },
                                action: actionConfirm
                            }],
                        title: message.uroven_msg_txt,
                        width: 600,
                        height: 300,
                        icon: "fa-exclamation-triangle g-state-text g-state-{0}".format((message.uroven_msg == 50) ? "error" : "important"),
                        html: "<div class='admin-msg-{2}'><b>{0}</b><br /><br /><span>{1}</span>".format(message.popis, message.text, message.id_avz),
                    });
                }
                function createNotificationLevel(level) {
                    switch (level) {
                        case 0:
                            return "info";
                        case 30:
                            return "important";
                        case 50:
                            return "error";
                        default:
                            return undefined;
                    }
                }
                function createAlertBeforeLogout(message) {
                    var datDo = new Date(message.datum_do);
                    console.log("Automatic logout - start");
                    var shown1 = false;
                    var shown5 = false;
                    var intervalMain = setInterval(() => {
                        var currentDate = new Date();
                        var diff = Math.floor(datDo.getTime() - currentDate.getTime()) / (1000 * 60);
                        var diffSec = Math.floor(datDo.getTime() - currentDate.getTime()) / 1000;
                        if (diffSec < 0) {
                            $.content("main")?.logout(true, { backMask: 4, reason: "jres:33000063" }); //RC 33000063 : Byli jste automaticky odhlášeni.
                        }
                        else if (diff < 1 && !shown1) {
                            createAlertDialogNew(datDo).on("ok", () => {
                                shown1 = true;
                            });
                        }
                        else if (diff < 5 && !shown5) {
                            createAlertDialogNew(datDo).on("ok", () => {
                                shown5 = true;
                            });
                        }
                    }, 15 * 1000);
                    $("body").on("applicationend", (ev) => {
                        console.log("Automatic logout - stop");
                        clearInterval(intervalMain);
                    });
                }
                function createAlertDialogNew(datDo) {
                    $(".alert-automatic-logout").closest(".ui-dialog-content").dialog("close");
                    var currentDate = new Date();
                    var diffSec = (datDo.getTime() - currentDate.getTime()) / 1000;
                    return GDlg.alert("jres:33000064", "<div class='alert-automatic-logout'>jres:33000065".format(Gordic.Templates.Formatters.datetime(datDo, "datetime"), Math.floor(diffSec / 60), Math.floor(diffSec % 60))); //RC 33000065 : K automatickému odhlášení dojde v <b> {0} </b> (Zbývá: <b>{1}</b >)
                }
            })(Utils = WebClient.Utils || (WebClient.Utils = {}));
        })(WebClient = Ozn.WebClient || (Ozn.WebClient = {}));
    })(Ozn = Gordic.Ozn || (Gordic.Ozn = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ozn;
    (function (Ozn) {
        var WebClient;
        (function (WebClient) {
            let GMessageDetail = class GMessageDetail extends Gordic.GContentBase {
                srv() { return this.createServiceContent("Gordic.Ozn.WebClient.GMessageDetail"); } // nastával error, protože MessageDetail třída neexistuje
                confirmAct() {
                    if (this.message.id_avz != undefined && this.message.id_avz != null) {
                        var cnt = $.content($("#main"));
                        Gordic.Isl.Messages.confirmRead({ id_avz: this.message.id_avz }).getData().done((res) => {
                            var notification = $(".gnotificationlist").gnotificationlist("findById", "not-avz-{0}".format(this.message.id_avz?.toString()));
                            if (notification != null)
                                cnt.notification("remove", notification);
                            this.close();
                        });
                    }
                }
                onContentReady() {
                    this.init();
                }
                onClose() {
                    if (this.file != null)
                        this.srv().fire("ClearFile", { guid: this.message.guid });
                }
                init() {
                    this.element.addHelpContext(this.getMessageType());
                    this.createHeader();
                    this.createFormElement();
                    this.createPreview();
                }
                createHeader() {
                    var header = $("<div class='user-not-header'>").appendTo(this.element);
                    $("<span class='icon {0}'>".format(this.createLogo())).appendTo(header);
                    if (this.message.uroven_msg == 20 && this.message.text) { //pro trvalé zprávy
                        var span = $("<span>");
                        $("<span class='header' style='white-space: pre-line'>").text(this.message.text).appendTo(span);
                        span.appendTo(header);
                    }
                    else if (this.message.uroven_msg_txt) {
                        $("<span>").html("<span class='header'>{0}</span>".format(this.message.uroven_msg_txt)).appendTo(header);
                    }
                }
                createForm() {
                    var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0", name: "msg-form-id-avz-{0}".format(this.message.id_avz?.toString()) });
                    if (this.message.uroven_msg != 20) {
                        form.addRow().addField("gstaticfield", {
                            name: "nazev",
                            initialValue: this.message.popis
                        });
                        //if (this.file != null)
                        //    form.addRow().addField("gfilefield", {
                        //        initialValue: this.file,
                        //        itemDeletable: false,
                        //        canUpload: false,
                        //    })
                        form.addRow().addField("gstaticfield", {
                            initialValue: this.message.text,
                            name: "text"
                        });
                    }
                    return form;
                }
                createFormElement() {
                    $("<div>").appendTo(this.element).gform("createFrom", this.createForm());
                }
                createPreview() {
                    if (this.message.guid != null && this.message.guid != undefined) {
                        $("<h4 style='margin-left: 1rem'>").appendTo(this.element).html("jres:33050001"); //RC 33050001 : Přiložený soubor:
                        let filePreview = $("<div>").appendTo(this.element).gfilepreview({
                            displayFileName: false,
                            engineOptions: {
                                pdfEngine: {
                                    zoomMode: 1,
                                }
                            }
                        });
                        filePreview.gfilepreview("displayFile", this.fileBase64, this.message.nazev_souboru ? `${this.message.nazev_souboru}.pdf` : "");
                    }
                }
                createLogo() {
                    switch (this.message.uroven_msg) {
                        case 50:
                            return "fa fa-exclamation-triangle g-state-text g-state-error";
                        case 30:
                        case 20:
                            return "fa fa-exclamation-triangle g-state-text g-state-important";
                        default:
                            return "fa fa-info-circle g-state-text g-state-info";
                    }
                }
                getMessageType() {
                    if (this.message.uroven_msg != null && this.message.uroven_msg != undefined) {
                        switch (this.message.uroven_msg) {
                            case 10:
                                return "messageType:doporuceni";
                            case 20:
                                return "messageType:trvalaZprava";
                            case 30:
                                return "messageType:duleziteUpozorneni";
                            case 50:
                                return "messageType:okamzitaVyzva";
                            default:
                                return "messageType:informace";
                        }
                    }
                    else {
                        return "messageType:message";
                    }
                }
            };
            GMessageDetail = __decorate([
                Decorators.gcontent
            ], GMessageDetail);
            WebClient.GMessageDetail = GMessageDetail;
        })(WebClient = Ozn.WebClient || (Ozn.WebClient = {}));
    })(Ozn = Gordic.Ozn || (Gordic.Ozn = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ozn;
    (function (Ozn) {
        var WebClient;
        (function (WebClient) {
            let GMessageDetailAdm = class GMessageDetailAdm extends Gordic.GContentBase {
                srv() {
                    return this.createServiceContent("Gordic.Ozn.WebClient.GMessageDetailAdm");
                }
                ulozitZaznamMain() {
                    this.saveData(false);
                }
                closing() {
                    var that = this;
                    return $.Deferred(function () {
                        var def = this;
                        if (that.edit == true) {
                            GDlg.confirm("jres:33000084").on("yes", () => {
                                if (that.file != null)
                                    that.srv().fire("RemoveFile", { guid: that.file.guid });
                                def.resolve().promise();
                            }).on("no", () => {
                                def.reject().promise();
                            });
                        }
                        else {
                            if (that.file != null)
                                that.srv().fire("RemoveFile", { guid: that.file.guid });
                            def.resolve().promise();
                        }
                    });
                }
                onContentReady() {
                    this.init();
                }
                onDetailBuilderInit(builder) {
                    this.actions.addRange({
                        actEditMessage: {
                            icon: "fa-pencil",
                            caption: "jres:33000023", //RC 33000023 : Editovat
                            enabled: this.povolEditNew,
                            run: (ev, ctx) => {
                                this.actActiveFileds(true);
                            }
                        },
                        actReload: {
                            run: (ev, ctx) => {
                                this.tryCloseAllSignificants();
                                this.reloadData();
                            }
                        },
                        actSaveMessage: {
                            icon: "fa-save",
                            caption: "jres:33000024", //RC 33000024 : Uložit
                            enabled: this.povolEditNew,
                            run: (ev, ctx) => {
                                this.saveData();
                            }
                        },
                        //actCancelEdit: {
                        //    icon: "gi-window-close",
                        //    caption: "jres:33000025", //RC 33000025 : Zrušit
                        //    run: (ev, ctx) => {
                        //        this.reloadData();
                        //    }
                        //},
                        actPrevious: {
                            caption: "jres:33000034", //RC 33000034 : Předchozí
                            captionVisible: "never",
                            visible: !this.newMessage,
                            icon: "gi-arrow-down gi-rot180",
                            run: (ev, ctx) => {
                                this.nextAndPreviousAction(false);
                            }
                        },
                        actNext: {
                            caption: "jres:33000035", //RC 33000035 : Další
                            captionVisible: "never",
                            visible: !this.newMessage,
                            icon: "gi-arrow-down",
                            run: (ev, ctx) => {
                                this.nextAndPreviousAction(true);
                            }
                        },
                        actRealodReadesRef: {
                            icon: "gi-refresh",
                            caption: "jres:33000038",
                            run: (ev, ctx) => {
                                this.setDataToGridReaded();
                            }
                        },
                        actRemove: {
                            icon: "gi-window-close",
                            caption: "jres:33000066",
                            enabled: this.povolEditNew,
                            visible: this.message.aktivita == 100 && this.isNew == false,
                            run: (ev, ctx) => {
                                this.removeMessage();
                            }
                        },
                        actEndMessage: {
                            caption: "jres:33000075", //RC 33000075 : Ukončit platnost
                            icon: "fa-clock-o",
                            enabled: this.povolEditNew,
                            visible: this.testDatumDo() && this.isNew == false,
                            run: (ev, ctx) => {
                                this.endValidity();
                            }
                        },
                        actCopy: {
                            caption: "jres:33000082", //RC 33000082 : Kopírovat
                            icon: "gi-copy",
                            enabled: this.povolEditNew,
                            visible: this.isNew == false,
                            run: (ev, ctx) => {
                                this.copyFromThis();
                            }
                        },
                        actArchiv: {
                            caption: "jres:33000095",
                            icon: "fa-archive",
                            enabled: this.povolEditNew,
                            visible: this.isNew == false,
                            run: (ev, ctx) => {
                                this.archivMessage();
                            }
                        }
                    });
                    var tabGroups = [];
                    if (this.isNew == false)
                        tabGroups.push({ id: "_messagesReaded", caption: "jres:33000052" });
                    var tabs = {};
                    if (this.isNew == false)
                        tabs = {
                            tabMessagesReaded: {
                                tabParams: {
                                    menuBar: [{
                                            action: this.actions.actRealodReadesRef,
                                            favorite: true,
                                        }],
                                    title: "jres:33000052",
                                    opened: true,
                                    locked: true,
                                    group: { id: "_messagesReaded" }
                                },
                                init: (tab) => { this.createReadedTab(tab); this.setDataToGridReaded(); }
                            }
                        };
                    builder.withComponent("GMessageDetailAdm", {
                        headerForm: this.createForm(),
                        tabGroups: tabGroups,
                        tabs: tabs,
                        kpis: this.createKpis()
                    }, true);
                }
                onDetailBuilderBuild(builder) { }
                testDatumDo() {
                    var date = new Date().toJSON();
                    if (this.message.datum_do && this.message.datum_od) {
                        var dateDo = new Date(this.message.datum_do.toString()).toJSON();
                        var dateOd = new Date(this.message.datum_od.toString()).toJSON();
                        if (dateDo <= date)
                            return false;
                        else if (dateOd >= date)
                            return false;
                        else
                            return true;
                    }
                    else
                        return false;
                }
                nextAndPreviousAction(next) {
                    var obj;
                    if (next == true)
                        obj = this.gridRC.current().nextRow.data;
                    else
                        obj = this.gridRC.current().prevRow.data;
                    this.gridRC.move(next);
                    var gridRc = this.gridRC;
                    this.closing().done(() => {
                        this.close();
                        $.content().navigate(["Gordic.Ozn.WebClient.GMessageDetailAdm", { gridRC: gridRc, currentFilter: this.currentFilter, Id: "GMessagesDetailAdm", taskId: "actGMessagesDetailAdm" }], { id_avz: obj.id_avz });
                    });
                }
                init() {
                    this.loadData(true);
                    this.actActiveFileds((this.isNew == true) ? true : false);
                    this.setBreadcrumbs({
                        caption: "jres:33000022" //RC 33000022 : Detail vzkazu
                    });
                    this.menuBar(this.actions.createBar([
                        "actEditMessage*", "actSaveMessage*", "actRemove*", "actEndMessage*", "actCopy*", "actArchiv*",
                        { action: this.actions.actPrevious, favorite: true, align: "opposite" },
                        { action: this.actions.actNext, favorite: true, align: "opposite" }
                    ]));
                    if (this.gridRC != undefined) {
                        if (this.gridRC?.current() != undefined) {
                            this.actions.actPrevious?.enabled(this.gridRC.current().prevRow != null);
                            this.actions.actNext?.enabled(this.gridRC.current().nextRow != null);
                        }
                    }
                    this.createStatusBar();
                }
                createKpis() {
                    this.kpis = {};
                    if (this.isNew == false) {
                        this.kpis.confirmationCount = new GObservableObject({
                            name: "confirmationCount",
                            itemTemplate: Gordic.Prefabs.Panels.kpiValueTwoRowsTextTemplate().itemTemplate,
                            value: 0,
                            meaning: "success",
                            primaryText: "jres:33000096", //RC 33000096 : Počet potvrzení
                            settings: { value: "" }
                        });
                    }
                    return this.kpis;
                }
                createStatusBar() {
                    if (this.isNew == true) {
                        this.statusBar([{
                                type: "static",
                                caption: "jres:33000097", //RC 33000097 : NOVÁ ZPRÁVA PRO UŽIVATELE
                                icon: "gi-plus",
                                customClass: "g-state-text g-state-info"
                            }]);
                    }
                    else {
                        if (this.message.aktivita != 100) {
                            var text = "jres:33000085"; //RC 33000085 : ZRUŠENÝ ZÁZNAM
                            this.statusBar([{
                                    type: "static",
                                    caption: text,
                                    icon: "gi-window-close",
                                    customClass: "g-state-text g-state-error"
                                }]);
                        }
                        else {
                            if (this.message.datum_od && this.message.datum_do) {
                                var datumOd = new Date(this.message.datum_od.toString());
                                var datumDo = new Date(this.message.datum_do.toString());
                                var currentDate = new Date();
                                var text = "";
                                var customClass = "";
                                if (datumOd > currentDate) {
                                    customClass = "g-state-info";
                                    text = "jres:33000039".format(Gordic.Templates.Formatters.datetime(datumOd, "datetime")); //RC 33000039 : Zpráva pro uživatele vyjde v platnost {0} {1}
                                }
                                else if (datumDo < currentDate) {
                                    text = "jres:33000040".format(Gordic.Templates.Formatters.datetime(datumDo, "datetime")); //RC 33000040 : Zprávě pro uživatele skončila platnost {0} {1}
                                }
                                else {
                                    customClass = "g-state-success";
                                    text = "jres:33000041"; //RC 33000041 : Aktuálně platná zpráva pro uživatele
                                }
                                this.statusBar([{
                                        type: "static",
                                        caption: text,
                                        icon: "fa-clock-o",
                                        customClass: "{0} g-state-text".format(customClass),
                                    }]);
                            }
                        }
                    }
                }
                actActiveFileds(activeFields) {
                    this.edit = activeFields;
                    var form = this.findForms("messageDetailAdmForm");
                    form.findFields().gfield((activeFields == true) ? "enable" : "disable");
                    if (this.message.fazeAllChecked) {
                        form.findFields("faze").gfield("disable");
                    }
                    this.actions.actEditMessage?.visible(!activeFields);
                    this.actions.actSaveMessage?.visible(activeFields);
                    //this.actions.actCancelEdit?.visible(activeFields);
                    this.actions.actRemove?.visible(!activeFields);
                    this.actions.actEndMessage?.visible(!activeFields);
                    this.actions.actCopy?.visible(!activeFields);
                    this.actions.actSaveMain?.enabled(activeFields);
                    this.actions.actArchiv?.visible(!activeFields);
                }
                loadData(open) {
                    if (open == true) {
                        if (this.message) {
                            if (this.message.guid) {
                                this.srv().call("GetFileInfo", { guid: this.message.guid }).done((result) => {
                                    this.file = result;
                                    this.findFields("file").gfield("setValue", this.file);
                                });
                            }
                        }
                    }
                    else {
                        this.findFields("file").gfield("setValue", this.file);
                    }
                    if (this.message != undefined)
                        this.findForms("messageDetailAdmForm").findFields().gfield("model", "apply", this.message);
                }
                reloadData() {
                    this.navigateCnt();
                }
                saveData(reload = true) {
                    if (this.findForms("messageDetailAdmForm").gform("isValid")) {
                        this.beginOperation();
                        this.findForms("messageDetailAdmForm").findFields().gfield("model", "collect", this.message);
                        var file = this.findFields("file").gfield("getValue");
                        if (file.length != 0) {
                            this.message.guid = file[0].guid;
                            this.message.nazev_souboru = file[0].filename.split('.').slice(0, -1).join('.');
                            this.message.pripona_souboru = ".{0}".format(file[0].filename.split('.').pop());
                        }
                        else {
                            this.message.guid = null;
                            this.message.nazev_souboru = null;
                            this.message.pripona_souboru = null;
                        }
                        this.upsertMessage(reload);
                    }
                }
                upsertMessage(reload = true) {
                    Gordic.Isl.Messages.upsert({ data: this.message }).getData().done((message) => {
                        this.message = message;
                        var gridRc = this.gridRC;
                        this.edit = false;
                        this.testUpdate();
                        this.closing().done(() => { this.close(); });
                        if (reload == true) {
                            $.content().navigate(["Gordic.Ozn.WebClient.GMessageDetailAdm", { gridRC: this.gridRC, currentFilter: this.currentFilter, Id: "GMessagesDetailAdm", taskId: "actGMessagesDetailAdm" }], { id_avz: message.id_avz });
                        }
                    }).always(() => { this.endOperation(); });
                }
                updateMaingrid(data, del) {
                    var grid = this.gridRC.gridInstance.element;
                    if (grid.length > 0) {
                        var view = grid.ggrid("getView");
                        if (del) {
                            view.updateData(data, "delete");
                        }
                        else if (this.newMessage == false) {
                            view.updateData(data, "extend");
                        }
                        else {
                            view.updateData(data, "add");
                        }
                        grid.ggrid("setData", view);
                        this.gridRC = new Gordic.Components.GridRC(grid);
                    }
                }
                testUpdate(del = false) {
                    if (this.currentFilter != null && this.currentFilter != undefined) {
                        Gordic.Isl.Messages.listAll({ ...this.currentFilter, ...{ filters: { id_avz: this.message.id_avz } } }).getData().done((data) => {
                            if (data.length > 0)
                                this.updateMaingrid(data[0], del);
                            if (data.length == 0 && del) {
                                this.updateMaingrid({ id_avz: this.message.id_avz }, del);
                            }
                        });
                    }
                }
                createForm() {
                    var that = this;
                    var levels = [
                        { caption: "jres:33000017", value: 0 }, //RC 33000017 : Informace
                        { caption: "jres:33000018", value: 10 }, //RC 33000018 : Doporučení
                        { caption: "jres:33600001", value: 20 }, //RC 33600001 : Trvalá zpráva
                        { caption: "jres:33000019", value: 30 }, //RC 33000019 : Důležité upozornění
                        { caption: "jres:33000020", value: 50 }, //RC 33000020 : Výzva k okamžitému ukončení práce v modulech
                    ];
                    var messageTypes = [
                        { caption: "jres:33000015", value: 0 }, //RC 33000015 : Globální pro celou databázi
                        { caption: "jres:33000016", value: 10 }, //RC 33000016 : Pro střediska spisových uzlů
                    ];
                    return new Gordic.Forms.Form({ name: "messageDetailAdmForm", layoutDescriptor: "L2M1S1" })
                        .addSection("jres:33000033") //RC 33000033 : Zpráva pro uživatele
                        .addRow("jres:33000026").addField("gselectbox", Gordic.Prefabs.Select.gincfaz(), {
                        name: "faze",
                        multi: true,
                        strict: true,
                        itemWidth: "",
                        disabled: (this.message.fazeAllChecked) ? true : false,
                        initialValue: (this.faze) ? [{ faze: this.faze }] : null,
                        change: function (ev, arr) {
                            var result = arr.value?.reduce((unique, o) => {
                                if (!unique.some(obj => obj.faze === o.faze))
                                    unique.push(o);
                                return unique;
                            }, []);
                            $(this).gfield("setValue", result);
                        }
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "fazeAllChecked",
                        label: "jres:33600002", //RC 33600002 : Všechny fáze
                        change: function (ev, ctx) {
                            var fieldFaze = $(this).gform().findFields("faze");
                            if (ctx.value) {
                                that.prevFaze = fieldFaze.gfield("getValue");
                                fieldFaze.gfield("setValue", [{ faze: "GINISALL" }]);
                                fieldFaze.gfield("disable");
                            }
                            else {
                                fieldFaze.gfield("setValue", that.prevFaze);
                                fieldFaze.gfield("enable");
                            }
                        }
                    })
                        .addRow("jres:33000029").addField("gselectbox", Gordic.Prefabs.Select.ginstre(), {
                        name: "strediska",
                        multi: true,
                        strict: true,
                        itemWidth: "",
                        change: function (ev, arr) {
                            var result = arr.value?.reduce((unique, o) => {
                                if (!unique.some(obj => obj.ixs_tre === o.ixs_tre))
                                    unique.push(o);
                                return unique;
                            }, []);
                            $(this).gfield("setValue", result);
                        }
                    })
                        .addRow("jres:33000008") //RC 33000008 : Název
                        .addField("gstringbox", {
                        name: "popis",
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true })]
                    })
                        .addRow("jres:33000012") //RC 33000012 : Soubor
                        .addField("gfilefield", {
                        name: "file",
                        maxFileCount: 1,
                        acceptExtension: ".pdf",
                        downloadOnDisabledField: true,
                        itemDeletable: true,
                        fileRemoved: (ev, file) => {
                            this.srv().call("RemoveFile", { guid: file.fileInfo.guid });
                            this.file = null;
                            this.message.guid = null;
                        },
                        fileUploaded: (ev, file) => {
                            this.file = file.fileInfo;
                            this.message.guid = file.fileInfo.guid;
                        }
                    })
                        .addRow("jres:33000013") //RC 33000013 : Text zprávy
                        .addField("gstringbox", {
                        name: "text",
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true })],
                        rows: 8
                    })
                        .addSection("jres:33000032") //RC 33000032 : Nastavení zprávy
                        .addRow("jres:33000011") //RC 33000011 : Úroveň závažnosti
                        .addField("gselectbox", {
                        flag: "required",
                        name: "uroven_msg",
                        dropdown: true,
                        strict: true,
                        initialValue: levels[0],
                        itemTemplate: "{caption}",
                        data: levels,
                        validators: [new Gordic.Validators.Required({ stopping: true })],
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    if (dto)
                                        if (dto.uroven_msg)
                                            $(this).gfield("setValue", levels.find(item => item.value == dto.uroven_msg));
                                    return;
                                case "collect":
                                    dto.uroven_msg = $(this).gfield("getValue").value;
                                    return;
                            }
                        }
                    })
                        .addRow("jres:33000007") //RC 33000007 : Platnost od - do
                        .addField("gdatebox", "w-6", {
                        name: "datum_od",
                        valueType: "datetime",
                        flag: "required",
                        validators: [new Gordic.Validators.Required({ stopping: true }), this.createSpecialValidator()]
                    })
                        .addField("gdatebox", "w-6", {
                        name: "datum_do",
                        flag: "required",
                        valueType: "datetime",
                        validators: [new Gordic.Validators.Required({ stopping: true })]
                    })
                        .addRow("jres:33000009") //RC 33000009 : Cílová skupina
                        .addField("gselectbox", {
                        name: "typ_msg",
                        flag: "required",
                        itemTemplate: "{caption}",
                        data: messageTypes,
                        validators: [new Gordic.Validators.Required({ stopping: true })],
                        dropdown: true,
                        strict: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    if (dto)
                                        if (dto.typ_msg)
                                            $(this).gfield("setValue", messageTypes.find(item => item.value == parseInt(dto.typ_msg)));
                                    return;
                                case "collect":
                                    dto.typ_msg = $(this).gfield("getValue").value.toString();
                                    return;
                            }
                        }
                    })
                        .addRow()
                        .addField("gcheck", "w-4", {
                        name: "archiv",
                        label: "jres:33000010", //RC 33000010 : Archív
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    if (dto)
                                        if (dto.archiv)
                                            $(this).gfield("setValue", (dto.archiv == 0) ? false : true);
                                    return;
                                case "collect":
                                    dto.archiv = ($(this).gfield("getValue") == true) ? 1 : 0;
                                    return;
                            }
                        }
                    })
                        .addRow("jres:33000031") //RC 33000031 : Priorita
                        .addField("gnumberbox", {
                        name: "priorita",
                        minValue: 0,
                        maxValue: 9
                    });
                }
                createSpecialValidator() {
                    var val = new Gordic.Validators.Base({ message: "jres:33000030" }); //RC 33000030 : Datum v políčku do musí následovat po datu v políčku od.
                    val.validate = (value, source) => {
                        var from = this.findForms("messageDetailAdmForm").findFields("datum_od").gfield("getValue");
                        var to = this.findForms("messageDetailAdmForm").findFields("datum_do").gfield("getValue");
                        if (from == null || to == null)
                            return true;
                        else if (from > to)
                            return false;
                        else
                            return true;
                    };
                    val.stopping = true;
                    return val;
                }
                // Funkce pro obsluhu přečtených vzkazů
                createReadedTab(tab) {
                    this.gridReaded = Gordic.Ozn.WebClient.Base.CreateGridReaded().gautofit({ resizersOnTab: false }).appendTo(tab);
                    return this.gridReaded;
                }
                setDataToGridReaded() {
                    this.beginOperation();
                    Gordic.Isl.MessagesReaded.list({ filters: { id_avz: this.message.id_avz } }).getData().done((data) => {
                        this.kpis.confirmationCount.value = data.length;
                        this.kpis.confirmationCount.secondaryText = "Aktualizace: {0}".format(Gordic.Templates.Formatters.datetime(new Date(), "datetime"));
                        this.kpis.confirmationCount.update();
                        this.gridReaded.ggrid("setData", data);
                    }).always(() => { this.endOperation(); });
                }
                removeMessage() {
                    this.beginOperation();
                    Gordic.Isl.Messages.zneaktivnitHromadne({ data: [this.message] }).get().done((o) => {
                        if (o[0].result == 1 /* Interface.GResultHromadneOperaceEnum.Error */) {
                            this.notification("add", {
                                icon: "fa-comment",
                                state: "error",
                                title: (o[0].popis) ? o[0].popis : "jres:33000006",
                                content: (o[0].result_txt) ? o[0].result_txt : "jres:33000071" //RC 33000071 : Zneplatnění neproběhlo úspěšně.
                            });
                        }
                        else {
                            this.notification("showToast", {
                                icon: "fa-comment",
                                state: "success",
                                title: (o[0].popis) ? o[0].popis : "jres:33000006",
                                content: (o[0].result_txt) ? o[0].result_txt : "jres:33000070" //RC 33000070 : Zneplatnění proběhlo úspěšně.
                            });
                            this.testUpdate(true);
                        }
                        this.navigateCnt();
                    }).always(() => { this.endOperation(); });
                }
                endValidity() {
                    this.beginOperation();
                    Gordic.Isl.Messages.ukoncitPlatnostHromadne({ data: [this.message] }).get().done((o) => {
                        if (o[0].result == 1 /* Interface.GResultHromadneOperaceEnum.Error */) {
                            this.notification("add", {
                                icon: "fa-comment",
                                state: "error",
                                title: "jres:33000022",
                                content: {
                                    popis: (o[0].popis) ? o[0].popis : "jres:33000006",
                                    result: (o[0].result_txt) ? o[0].result_txt : "jres:33000078"
                                },
                                shortTemplate: "<span>{result}</span>",
                                fullTempate: "<span><b>jres:33000008:</b>&nbsp;{popis}<br /><span>{result}</span></span>",
                            });
                        }
                        else {
                            this.notification("showToast", {
                                icon: "fa-comment",
                                state: "success",
                                title: (o[0].popis) ? o[0].popis : "jres:33000006",
                                content: (o[0].result_txt) ? o[0].result_txt : "jres:33000079" //RC 33000079 : Platnost oznámení se nezdařilo ukončit.
                            });
                            this.testUpdate();
                        }
                        this.navigateCnt();
                    }).always(() => { this.endOperation(); });
                }
                archivMessage() {
                    this.beginOperation();
                    Gordic.Isl.Messages.archivovatHromadne({ data: [this.message] }).get().done((o) => {
                        if (o[0].result == 1 /* Interface.GResultHromadneOperaceEnum.Error */) {
                            this.notification("add", {
                                icon: "fa-comment",
                                state: "error",
                                //title: "jres:33000022",
                                title: (o[0].popis) ? o[0].popis : "jres:33000006",
                                content: (o[0].result_txt) ? o[0].result_txt : "jres:33000092" //RC 33000092 : Archivace proběhla úspěšně.
                            });
                        }
                        else {
                            this.notification("showToast", {
                                icon: "fa-comment",
                                state: "success",
                                title: (o[0].popis) ? o[0].popis : "jres:33000006",
                                content: (o[0].result_txt) ? o[0].result_txt : "jres:33000093" //RC 33000093 : Zprávu se nepodařilo archivovat.
                            });
                            this.testUpdate();
                        }
                        this.navigateCnt();
                    }).always(() => { this.endOperation(); });
                }
                copyFromThis() {
                    this.closing().done(() => {
                        this.close();
                        $.content().navigate(["Gordic.Ozn.WebClient.GMessageDetailAdm", { gridRC: this.gridRC, currentFilter: this.currentFilter }], { id_avz: this.message.id_avz, copyFromExist: true });
                    });
                }
                navigateCnt(id_avz = this.message.id_avz) {
                    var navigate = [];
                    navigate.push("Gordic.Ozn.WebClient.GMessageDetailAdm");
                    this.close();
                    $.content().navigate(["Gordic.Ozn.WebClient.GMessageDetailAdm", { gridRC: this.gridRC, currentFilter: this.currentFilter, Id: "GMessagesDetailAdm", taskId: "actGMessagesDetailAdm" }], { id_avz: this.message.id_avz });
                }
            };
            GMessageDetailAdm = __decorate([
                Decorators.gcontent
            ], GMessageDetailAdm);
            WebClient.GMessageDetailAdm = GMessageDetailAdm;
        })(WebClient = Ozn.WebClient || (Ozn.WebClient = {}));
    })(Ozn = Gordic.Ozn || (Gordic.Ozn = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ozn;
    (function (Ozn) {
        var WebClient;
        (function (WebClient) {
            let GMessageList = class GMessageList extends Gordic.GContentBase {
                onContentReady() {
                    this.init();
                }
                init() {
                    this.beginOperation();
                    this.createMenubar();
                    this.initCnt();
                    this.createFilterpanel();
                    this.createGrid();
                }
                initCnt() {
                    this.uid = "userMessagesList";
                    this.setBreadcrumbs({ caption: "jres:33000021" });
                }
                createActions() {
                    this.actions.addRange({
                        actNewMessage: {
                            caption: "jres:33000036", //RC 33000036 : Nový
                            icon: "gi-plus",
                            enabled: this.povolEditNew,
                            run: (ev, ctx) => {
                                this.createNew();
                            }
                        },
                        actOpenDetail: {
                            caption: "jres:33000037", //RC 33000037 : Otevřít
                            icon: "gi-detail",
                            run: (ev, ctx) => {
                                this.openDetail(ctx);
                            }
                        },
                        actRefresh: {
                            caption: "jres:33000038", //RC 33000038 : Občerstvit
                            icon: "gi-refresh",
                            run: (ev, ctx) => {
                                this.setDataToGrid();
                            }
                        },
                        actRemove: {
                            caption: "jres:33000066", //RC 33000066 : Zneplatnit oznámení
                            icon: "gi-window-close",
                            enabled: this.povolEditNew,
                            run: (ev, ctx) => {
                                this.removeMessages();
                            }
                        },
                        actEndMessage: {
                            caption: "jres:33000075", //RC 33000075 : Ukončit platnost
                            icon: "fa-clock-o",
                            enabled: this.povolEditNew,
                            run: (ev, ctx) => {
                                this.endValidity();
                            }
                        },
                        actArchiv: {
                            caption: "jres:33000095", //RC 33000095 : Archivovat
                            icon: "fa-archive",
                            enabled: this.povolEditNew,
                            run: (ev, ctx) => {
                                this.archiveMessages();
                            }
                        },
                        actCopyMessage: {
                            caption: "jres:33000081", //RC 33000081 : Kopírovat z vybrané
                            icon: "gi-copy",
                            enabled: this.povolEditNew,
                            run: (ev, ctx) => {
                                this.copyToNew(ctx);
                            }
                        }
                    });
                }
                createMenubar() {
                    this.createActions();
                    this.menuBar(this.actions.createBar([
                        "actOpenDetail*", "actRefresh*", "actNewMessage*", "actRemove*", "actEndMessage*", "actCopyMessage*", "actArchiv*",
                    ]));
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
                        $.content().navigate(["Gordic.Ozn.WebClient.GMessageDetailAdm", { gridRC: gridRc, currentFilter: this.currentFilter }], { id_avz: data.id_avz, Id: "GMessagesDetailAdm", taskId: "actGMessagesDetailAdm" });
                    }
                }
                createNew() {
                    var gridRc = new Gordic.Components.GridRC(this.grid);
                    $.content().navigate(["Gordic.Ozn.WebClient.GMessageDetailAdm", { gridRC: gridRc, currentFilter: this.currentFilter, Id: "GMessagesDetailAdm", taskId: "actGMessagesDetailAdm", faze: this.faze }], { id_avz: -1 });
                }
                setDataToGrid(loadNew = false) {
                    this.beginOperation();
                    Gordic.Isl.Messages.listAll(this.currentFilter).getView().done((out) => {
                        this.actions.actReaded?.enabled(out.getCount("data") != 0);
                        this.grid.ggrid("setData", out);
                    }).always(() => { this.endOperation(); });
                }
                createGrid() {
                    this.grid = $("<div>").appendTo(this.element).ggrid({
                        multi: true,
                        cellActivate: (ev, ctx) => {
                            if (ctx != null && ctx.cellInfo != null && ctx.cellInfo.data != null) {
                                this.actions.actOpenDetail?.update({ enabled: true });
                                this.actions.actRemove?.update({ enabled: this.povolEditNew });
                                this.actions.actEndMessage?.update({ enabled: this.povolEditNew });
                                this.actions.actCopyMessage?.update({ enabled: this.povolEditNew });
                            }
                            else {
                                this.actions.actOpenDetail?.update({ enabled: false });
                                this.actions.actRemove?.update({ enabled: false });
                                this.actions.actEndMessage?.update({ enabled: false });
                                this.actions.actCopyMessage?.update({ enabled: false });
                            }
                        },
                        defaultProfile: {
                            sort: "!datum_od",
                            condFormats: [
                                {
                                    bg: Gordic.Components.Grid.CondFormats.CondFormatBg.lightblue,
                                    formula: "DATEDIFF(@datum_od, NOW()) > 0"
                                },
                                {
                                    bg: Gordic.Components.Grid.CondFormats.CondFormatBg.lightgreen,
                                    bold: true,
                                    formula: "DATEDIFF(@datum_od, NOW()) < 0 and DATEDIFF(@datum_do, NOW()) > 0"
                                }
                            ]
                        },
                        columns: this.createColumns(),
                        columnMode: "fit",
                        defaultAction: this.actions.actOpenDetail
                    }).gautofit();
                    this.endOperation();
                }
                createColumns() {
                    return new Gordic.Data.GridFormat()
                        .addIconColumn({
                        name: "state",
                        caption: "jres:33000061", //RC 33000061 : Stav
                        iconTemplate: (row) => {
                            if (row.datum_od && row.datum_do) {
                                var dateTimeFrom = new Date(row.datum_od);
                                var dateTimeTo = new Date(row.datum_do);
                                var currentDate = new Date();
                                if (Gordic.Utils.DateTime.compare(dateTimeFrom, currentDate) > 0)
                                    return { icon: "fa-clock-o g-state-text g-state-info", text: "jres:33000046" };
                                else if (Gordic.Utils.DateTime.compare(dateTimeTo, currentDate) < 0)
                                    return { icon: "gi-window-close", text: "jres:33000045" };
                                else
                                    return { icon: "gi-bell g-state-text g-state-success", text: "jres:33000049" };
                            }
                            return null;
                        }
                    })
                        .addIconColumn({
                        name: "archiv",
                        caption: "jres:33000010",
                        iconTemplate: (row) => {
                            if (row.archiv) {
                                if (row.archiv == 1)
                                    return { icon: "fa-check-circle g-state-text g-state-success", text: "jres:33000062" }; //RC 33000062 : Ano
                            }
                            return null;
                        }
                    })
                        .addTextColumn({
                        name: "uroven_msg_txt",
                        caption: "jres:33000011",
                        width: 150,
                    })
                        .addTextColumn({
                        name: "uroven_msg",
                        caption: "jres:33000011",
                        width: 150,
                        hidden: true,
                    })
                        .addDateTimeColumn({
                        name: "datum_od",
                        caption: "jres:33000042", //RC 33000042 : Datum platnosti od
                        width: 150,
                    })
                        .addDateTimeColumn({
                        name: "datum_do",
                        caption: "jres:33000043", //RC 33000043 : Datum platnosti do
                        width: 150,
                    })
                        .addTextColumn({
                        name: "popis",
                        caption: "jres:33000008", //RC 33000044 : Zpráva
                        width: 300,
                    });
                }
                createDefaultData() {
                    var defaultFilter = {
                        aktivita: {
                            aktivita: 100,
                            aktiviat_txt: "jres:33000098" //RC 33000098 : Aktivní
                        },
                        data_select: {
                            value: "all",
                            label: "jres:33000048",
                        },
                        archiv: {
                            value: 0,
                            label: "jres:33000088"
                        }
                    };
                    if (this.faze)
                        defaultFilter["faze"] = this.faze;
                    return defaultFilter;
                }
                createFilterpanel() {
                    this.filterPanel = $("<div>").gfilterpanel({
                        forms: [this.createFilterForm()],
                        filterViewMode: FilterViewMode.Normal,
                        favorites: "all",
                        hardDefaultFilter: this.createDefaultData(),
                        apply: (ev, data) => {
                            var filter = {};
                            var filterDatafromPanel = data.filter;
                            if (this.faze)
                                filter.faze = this.faze;
                            if (filterDatafromPanel.aktivita != undefined && filterDatafromPanel.aktivita != null)
                                filter.aktivita = filterDatafromPanel.aktivita.aktivita;
                            if (filterDatafromPanel.uroven_msg != undefined && filterDatafromPanel.uroven_msg != null)
                                filter.uroven_msg = filterDatafromPanel.uroven_msg.uroven_msg;
                            if (filterDatafromPanel.popis != undefined && filterDatafromPanel.popis != null)
                                filter.popis = "%{0}%".format(filterDatafromPanel.popis);
                            if (filterDatafromPanel.archiv != undefined && filterDatafromPanel.archiv != null)
                                filter.archiv = filterDatafromPanel.archiv.value;
                            var fragment = "all";
                            if (filterDatafromPanel["data_select"])
                                fragment = filterDatafromPanel["data_select"]["value"];
                            this.currentFilter = { fragments: [fragment], filters: filter };
                            this.setDataToGrid();
                        }
                    }).appendTo(this.element);
                }
                createFilterForm() {
                    var data = [
                        { label: "jres:33000048", value: "all" }, //RC 33000048 : Všechny
                        { label: "jres:33000047", value: "current_valid" }, //RC 33000047 : Platné
                        { label: "jres:33000046", value: "before_valid" },
                        { label: "jres:33000045", value: "after_valid" }
                    ];
                    var archivData = [
                        { label: "jres:33000087", value: 1 }, //RC 33000087 : Jen archivované
                        { label: "jres:33000088", value: 0 }, //RC 33000088 : Nearchivované
                    ];
                    var form = new Gordic.Forms.Form(); //RC 33000050 : Hledat
                    if (this.faze) {
                        form.addRow("jres:33000026").addField("gselectbox", Gordic.Prefabs.Select.gincfaz(), {
                            name: "faze",
                            model: "model.faze=value.faze",
                            dropdown: true,
                            disabled: this.faze ? true : false
                        });
                    }
                    form.addRow("jres:33000050").addField("gselectbox", {
                        data: data,
                        name: "data_select",
                        itemTemplate: "{label}",
                        dropdown: true,
                        initialValue: data[0],
                    })
                        .addRow("jres:33000011").addField("gselectbox", Gordic.Prefabs.Select.gincums(), {
                        name: "uroven_msg"
                    })
                        .addRow("jres:33000058").addField("gstringbox", {
                        name: "popis"
                    })
                        .addRow("jres:33000086").addField("gselectbox", Gordic.Prefabs.Select.gincakt(), {
                        dropdown: true,
                        initialValue: { aktivita: 100 },
                        name: "aktivita",
                    })
                        .addRow("jres:33000089").addField("gselectbox", {
                        dropdown: true,
                        data: archivData,
                        initialValue: archivData[1],
                        itemTemplate: "{label}",
                        name: "archiv"
                    });
                    return form;
                }
                removeMessages() {
                    var selectedData = this.grid.ggrid("getSelection");
                    if (selectedData.length == 0)
                        this.dialogs.warning("jres:33000067", "jres:33000068"); //RC 33000068 : Není vybrán žádný záznam. Akći nelze provést.
                    else if (selectedData.length == 1) {
                        this.dialogs.confirm("jres:33000067", "jres:33000069<br /><b>{0}</b>".format((selectedData[0].popis) ? selectedData[0].popis : "")).on("yes", () => {
                            Gordic.Isl.Messages.zneaktivnitHromadne({ data: selectedData }).get().done((o) => {
                                if (o[0].result == 1 /* Interface.GResultHromadneOperaceEnum.Error */) {
                                    this.notification("add", {
                                        icon: "fa-comment",
                                        state: "error",
                                        title: (o[0].popis) ? o[0].popis : "jres:33000006",
                                        content: (o[0].result_txt) ? o[0].result_txt : "jres:33000071" //RC 33000071 : Zneplatnění neproběhlo úspěšně.
                                    });
                                }
                                else {
                                    this.notification("showToast", {
                                        icon: "fa-comment",
                                        state: "success",
                                        title: (o[0].popis) ? o[0].popis : "jres:33000006",
                                        content: (o[0].result_txt) ? o[0].result_txt : "jres:33000070" //RC 33000070 : Zneplatnění proběhlo úspěšně.
                                    });
                                }
                                this.setDataToGrid();
                            });
                        });
                    }
                    else {
                        this.dialogs.confirm("jres:33000067", "jres:33000072".format(selectedData.length)).on("yes", () => {
                            Gordic.Isl.Messages.zneaktivnitHromadne({ data: selectedData }).get().done((o) => {
                                this.dialogs.showModalWindow(["Gordic.Ozn.WebClient.GMessageResultHromadnaOperace", { data: o }], null, { width: 1000, height: 500, title: "jres:33000067" });
                                this.setDataToGrid();
                            });
                        });
                    }
                }
                endValidity() {
                    var selectedData = this.grid.ggrid("getSelection");
                    if (selectedData.length == 0)
                        this.dialogs.warning("jres:33000076", "jres:33000068"); //RC 33000076 : Ukončení platnosti
                    else if (selectedData.length == 1) {
                        this.dialogs.confirm("jres:33000076", "jres:33000077<br /><b>{0}</b>".format((selectedData[0].popis) ? selectedData[0].popis : "")).on("yes", () => {
                            Gordic.Isl.Messages.ukoncitPlatnostHromadne({ data: selectedData }).get().done((o) => {
                                if (o[0].result == 1 /* Interface.GResultHromadneOperaceEnum.Error */) {
                                    this.notification("add", {
                                        icon: "fa-comment",
                                        state: "error",
                                        title: (o[0].popis) ? o[0].popis : "jres:33000006",
                                        content: (o[0].result_txt) ? o[0].result_txt : "jres:33000078" //RC 33000078 : Platnost oznámení byla ukončena.
                                    });
                                }
                                else {
                                    this.notification("showToast", {
                                        icon: "fa-comment",
                                        state: "success",
                                        title: (o[0].popis) ? o[0].popis : "jres:33000006",
                                        content: (o[0].result_txt) ? o[0].result_txt : "jres:33000079" //RC 33000079 : Platnost oznámení se nezdařilo ukončit.
                                    });
                                }
                                this.setDataToGrid();
                            });
                        });
                    }
                    else {
                        this.dialogs.confirm("jres:33000076", "jres:33000080".format(selectedData.length)).on("yes", () => {
                            Gordic.Isl.Messages.ukoncitPlatnostHromadne({ data: selectedData }).get().done((o) => {
                                this.dialogs.showModalWindow(["Gordic.Ozn.WebClient.GMessageResultHromadnaOperace", { data: o }], null, { width: 1000, height: 500, title: "jres:33000076" });
                                this.setDataToGrid();
                            });
                        });
                    }
                }
                archiveMessages() {
                    var selectedData = this.grid.ggrid("getSelection");
                    if (selectedData.length == 0)
                        this.dialogs.warning("jres:33000090", "jres:33000068"); //RC 33000090 : Archivace zpráv
                    else if (selectedData.length == 1) {
                        this.dialogs.confirm("jres:33000090", "jres:33000091<br /><b>{0}</b>".format((selectedData[0].popis) ? selectedData[0].popis : "")).on("yes", () => {
                            Gordic.Isl.Messages.archivovatHromadne({ data: selectedData }).get().done((o) => {
                                if (o[0].result == 1 /* Interface.GResultHromadneOperaceEnum.Error */) {
                                    this.notification("add", {
                                        icon: "fa-comment",
                                        state: "error",
                                        title: (o[0].popis) ? o[0].popis : "jres:33000006",
                                        content: (o[0].result_txt) ? o[0].result_txt : "jres:33000092" //RC 33000092 : Archivace proběhla úspěšně.
                                    });
                                }
                                else {
                                    this.notification("showToast", {
                                        icon: "fa-comment",
                                        state: "success",
                                        title: (o[0].popis) ? o[0].popis : "jres:33000006",
                                        content: (o[0].result_txt) ? o[0].result_txt : "jres:33000093" //RC 33000093 : Zprávu se nepodařilo archivovat.
                                    });
                                }
                                this.setDataToGrid();
                            });
                        });
                    }
                    else {
                        this.dialogs.confirm("jres:33000090", "jres:33000094".format(selectedData.length)).on("yes", () => {
                            Gordic.Isl.Messages.archivovatHromadne({ data: selectedData }).get().done((o) => {
                                this.dialogs.showModalWindow(["Gordic.Ozn.WebClient.GMessageResultHromadnaOperace", { data: o }], null, { width: 1000, height: 500, title: "jres:33000090" });
                                this.setDataToGrid();
                            });
                        });
                    }
                }
                copyToNew(ctx) {
                    var data;
                    if (ctx.cellInfo != undefined)
                        data = ctx.cellInfo.data;
                    else {
                        var row = this.grid.ggrid("activeRow");
                        data = (row == null) ? undefined : row;
                    }
                    if (data != null && data != undefined) {
                        var gridRc = new Gordic.Components.GridRC(this.grid);
                        $.content().navigate(["Gordic.Ozn.WebClient.GMessageDetailAdm", { gridRC: gridRc, currentFilter: this.currentFilter, Id: "GMessagesDetailAdm", taskId: "actGMessagesDetailAdm" }], { id_avz: data.id_avz, copyFromExist: true });
                    }
                }
            };
            GMessageList = __decorate([
                Decorators.gcontent
            ], GMessageList);
            WebClient.GMessageList = GMessageList;
        })(WebClient = Ozn.WebClient || (Ozn.WebClient = {}));
    })(Ozn = Gordic.Ozn || (Gordic.Ozn = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Ozn;
    (function (Ozn) {
        var WebClient;
        (function (WebClient) {
            let GMessageResultHromadnaOperace = class GMessageResultHromadnaOperace extends Gordic.GContentBase {
                onContentReady() {
                    this.init();
                }
                init() {
                    this.uid = "resultHromadnaOperaceMessage";
                    this.updateData();
                    this.createGrid();
                }
                updateData() {
                    this.data.forEach((item) => {
                        item.result_header = (item.result == 0 /* Gordic.Ozn.Interface.GResultHromadneOperaceEnum.OK */) ? "OK" : "jres:33000073";
                    });
                }
                createGrid() {
                    var grid = $("<div>").appendTo(this.element).ggrid({
                        columns: this.createGridFormat(),
                    });
                    var view = new Gordic.Data.View(this.data);
                    view.process({
                        ac: new Gordic.Data.Grouping([{
                                defaultState: "open",
                                hash: (meta, rows) => {
                                    return `${meta.data["result_header"]}`;
                                }
                            }])
                    });
                    grid.ggrid("setData", view);
                }
                createGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addIconColumn({
                        name: "result",
                        caption: "",
                        iconTemplate: (row, meta) => {
                            if (row.result == 0 /* Gordic.Ozn.Interface.GResultHromadneOperaceEnum.OK */)
                                return { icon: "fa-check-circle g-state-text g-state-success", text: "OK" };
                            else
                                return { icon: "fa-times-circle g-state-text g-state-error", text: "jres:33000073" }; //RC 33000073 : Chyba
                        }
                    })
                        .addTextColumn({
                        name: "popis",
                        caption: "jres:33000008",
                    })
                        .addTextColumn({
                        name: "result_txt",
                        caption: "jres:33000074", //RC 33000074 : Výsledek
                    });
                }
            };
            GMessageResultHromadnaOperace = __decorate([
                Decorators.gcontent
            ], GMessageResultHromadnaOperace);
            WebClient.GMessageResultHromadnaOperace = GMessageResultHromadnaOperace;
        })(WebClient = Ozn.WebClient || (Ozn.WebClient = {}));
    })(Ozn = Gordic.Ozn || (Gordic.Ozn = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3puLndlYmNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIuL0Vrby8iLCJzb3VyY2VzIjpbIm96bi5iYXNlLnRzIiwib3puLnV0aWxzLnRzIiwiTWVzc2FnZS9HTWVzc2FnZURldGFpbC50cyIsIk1lc3NhZ2UvR01lc3NhZ2VEZXRhaWxBZG0udHMiLCJNZXNzYWdlL0dNZXNzYWdlTGlzdC50cyIsIk1lc3NhZ2UvR01lc3NhZ2VSZXN1bHRIcm9tYWRuYU9wZXJhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQXdDZjtBQXhDRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F3Q25CO0lBeENnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F3QzdCO1FBeENvQixXQUFBLFNBQVM7WUFBQyxJQUFBLElBQUksQ0F3Q2xDO1lBeEM4QixXQUFBLElBQUk7Z0JBQy9CLFNBQWdCLGdCQUFnQjtvQkFDNUIsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO3dCQUNwQixVQUFVLEVBQUUsS0FBSzt3QkFDakIsY0FBYyxFQUFFOzRCQUNaLElBQUksRUFBRSxXQUFXO3lCQUNwQjt3QkFDRCxZQUFZLEVBQUUsc0JBQXNCLEVBQUUseURBQXlEO3dCQUMvRixPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTs2QkFDaEMsaUJBQWlCLENBQUM7NEJBQ2YsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLE9BQU8sRUFBRSxlQUFlLENBQUMseUJBQXlCO3lCQUNyRCxDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsVUFBVTs0QkFDaEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxpQ0FBaUM7NEJBQzNELEtBQUssRUFBRSxFQUFFO3lCQUNaLENBQUM7NkJBQ0QsYUFBYSxDQUFDOzRCQUNYLElBQUksRUFBRSxPQUFPOzRCQUNiLE9BQU8sRUFBRSxlQUFlLEVBQUUscUJBQXFCOzRCQUMv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S0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztnQkFFTyxnQkFBZ0I7b0JBQ3BCLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTt5QkFDOUIsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxRQUFRO3dCQUNkLE9BQU8sRUFBRSxFQUFFO3dCQUNYLFlBQVksRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTs0QkFDeEIsSUFBSSxHQUFHLENBQUMsTUFBTSw4REFBc0Q7Z0NBQ2hFLE9BQU8sRUFBRSxJQUFJLEVBQUUsOENBQThDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFBOztnQ0FFM0UsT0FBTyxFQUFFLElBQUksRUFBRSw0Q0FBNEMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFDLENBQUEsQ0FBQyxxQkFBcUI7d0JBQ2pILENBQUM7cUJBQ0osQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLE9BQU87d0JBQ2IsT0FBTyxFQUFFLGVBQWU7cUJBQzNCLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxZQUFZO3dCQUNsQixPQUFPLEVBQUUsZUFBZSxFQUFFLHdCQUF3QjtxQkFDckQsQ0FBQyxDQUFBO2dCQUNWLENBQUM7YUFDSixDQUFBO1lBeERZLDZCQUE2QjtnQkFEekMsVUFBVSxDQUFDLFFBQVE7ZUFDUCw2QkFBNkIsQ0F3RHpDO1lBeERZLHVDQUE2QixnQ0F3RHpDLENBQUE7UUFDTCxDQUFDLEVBM0RvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEyRDdCO0lBQUQsQ0FBQyxFQTNEZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMkRuQjtBQUFELENBQUMsRUEzRFMsTUFBTSxLQUFOLE1BQU0sUUEyRGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLk96bi5XZWJDbGllbnQuQmFzZSB7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ3JlYXRlR3JpZFJlYWRlZCgpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHtcclxuICAgICAgICByZXR1cm4gJChcIjxkaXY+XCIpLmdncmlkKHtcclxuICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIixcclxuICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVtcHR5TWVzc2FnZTogXCI8aT5qcmVzOjMzMDAwMDUzPC9pPlwiLCAvL1JDIDMzMDAwMDUzIDogWmF0w61tIG5pa2RvIG5lcG90dnJkaWwgcMWZZcSNdGVuw60gb3puw6FtZW7DrS5cclxuICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA1OVwiIC8vUkMgMzMwMDAwNTkgOiBQb3R2cnplbm9cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aXRfcHJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA1NFwiLCAvL1JDIDMzMDAwMDU0IDogVGl0dWwgcMWZZWQgam3DqW5lbVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImptZW5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDU1XCIsIC8vUkMgMzMwMDAwNTUgOiBKbcOpbm9cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpam1lbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNTZcIiwgLy9SQyAzMzAwMDA1NiA6IFDFmcOtam1lbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpdF96YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA1N1wiLCAvL1JDIDMzMDAwMDU3IDogVGl0dWwgemEgam3DqW5lbVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDU4XCIsIC8vUkMgMzMwMDAwNTggOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLk96bi5XZWJDbGllbnQuVXRpbHMge1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEluaXRBc3luY1Rhc2soKTogYW55IHtcclxuICAgICAgICB2YXIgcmVnaXN0ZXJDbGFzcyA9IFwiR29yZGljLk96bi5TZXJ2ZXIuTWVzc2FnZXNBc3luY1wiO1xyXG4gICAgICAgIHZhciBjdXJyZW50QXV0TG9nb3V0OiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLm9mZihcIi5vem5cIik7XHJcbiAgICAgICAgR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5vbihcImNoYW5nZS5vem5cIiwgcmVnaXN0ZXJDbGFzcywgZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICAgICAgaWYgKG8ucHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhY3RpdmVOb3QgPSAkKFwiLmdub3RpZmljYXRpb25saXN0XCIpLmdub3RpZmljYXRpb25saXN0KFwiZ2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZUlkcyA9IG5ldyBBcnJheSgpXHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlTm90ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZU5vdC5mb3JFYWNoKChuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLmdyb3VwID09IFwibm90LWF2elwiKSBhY3RpdmVJZHMucHVzaChuLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChvLnByb2dyZXNzW1wiZGF0YVwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG8ucHJvZ3Jlc3NbXCJkYXRhXCJdLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChpdGVtLnVyb3Zlbl9tc2cgPT0gNTApIHx8IChpdGVtLnVyb3Zlbl9tc2cgPT0gMzApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY250ID0gJC5jb250ZW50KCQoXCIjbWFpblwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChcImJvZHlcIikuZmluZEZvcm1zKFwibXNnLWZvcm0taWQtYXZ6LXswfVwiLmZvcm1hdChwYXJzZUludChpdGVtLmlkX2F2eikudG9TdHJpbmcoKSkpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLklzbC5NZXNzYWdlcy5yZWFkKHsgaWRfYXZ6OiBwYXJzZUludChpdGVtLmlkX2F2eikgfSkuZ2V0RGF0YSgpLnRoZW4oKG91dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuT3puLldlYkNsaWVudC5HTWVzc2FnZURldGFpbFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBvdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogb3V0Lmd1aWQgPyBcIkdNZXNzYWdlRGV0YWlsUHJpbG9oYVwiIDogXCJHTWVzc2FnZURldGFpbEJlelByaWxvaHlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJZDogXCJhY3RHTWVzc2FnZURldGFpbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBvdXQuZ3VpZCA/IDgwMCA6IDUwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogb3V0Lmd1aWQgPyA4MDAgOiA0MDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCB1cG96b3JuZW5pIHByZWQgb2RobGFzZW5pbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS51cm92ZW5fbXNnID09IDUwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEF1dExvZ291dC5pbmNsdWRlcyhpdGVtLmlkX2F2eikgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50QXV0TG9nb3V0LnB1c2goaXRlbS5pZF9hdnopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUFsZXJ0QmVmb3JlTG9nb3V0KGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZCB0ZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJZHMuaW5jbHVkZXMoXCJub3QtYXZ6LXswfVwiLmZvcm1hdChpdGVtLmlkX2F2ei50b1N0cmluZygpKSkgPT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlTm90aWZpY2F0aW9uKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5vbihcImRpc3Bvc2VkLm96blwiLCByZWdpc3RlckNsYXNzLCBmdW5jdGlvbiAobykge1xyXG4gICAgICAgICAgICAvLyMjRElTUE9TRUQjIzpcclxuICAgICAgICAgICAgLy9VbG9oYSBieWxhIGpha2tvbGl2IHVrb25jZW5hLiBQb2NrYW0gbmFob2RueSBjYXMgKG1lemkgMCAtIDEwMHMpIGEgemt1c2ltIGluaWNpYWxpem92YXQgem5vdnUuXHJcbiAgICAgICAgICAgIC8vTmFob2RueSBjYXMgamUgcHJvIHByaXBhZCwgemUgYnkgYXBsaWthY2UgYmV6ZWxhIHZlIHZpY2UgemFsb3prYWNoIHphcmF6LiBQcm9zdGUsIGt0ZXJ5XHJcbiAgICAgICAgICAgIC8vdGFiIHBydm5pIG5hc3RhcnR1amUsIHRhayBvc3RhdG5pIHBhayBzZGlsaSBqZWhvIHVsb2h1LlxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgU3RhcnRBc3luY1Rhc2soKTsgfSwgTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDEwMCkgKyAxKSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFN0YXJ0QXN5bmNUYXNrKCkge1xyXG4gICAgICAgIC8vTk9URTogUHJvdmFkaSBzZSB2IGplZG5vdGxpdnljaCBrcm9jaWNoOlxyXG4gICAgICAgIC8vMSkgWmppc3RpbSwgamVzdGxpIGpzb3UgYXN5bmMuIHVsb2h5IGluaWNpYWxpem92YW5lLlxyXG4gICAgICAgIC8vMikgUHJvdmVkdSBzeW5jaHJvbml6YWNpIHplIHNlcnZlcnUuXHJcbiAgICAgICAgLy8zKSBaamlzdGltLCBqZXN0bGkgbmFob2RvdSBuZWJlemkgdmljZSB0ZWNodG8gYXN5bmMuIHVsb2ggKHV6aXZhdGVsIG11emUgbWl0IG90ZXZyZW5vIHZpY2UgemFsb3playkuXHJcbiAgICAgICAgLy80KSBKZS1saSBqaWNoIHZpY2UsIHRhayBvc3RhdG5pIHpydXNpbSBhIHBvbmVjaGFtIGplbiBqZWRudSBzcG9sZWNub3UuIFBva3VkIG5lbmksIG5hc3RhcnR1amkgamVkbnUuXHJcbiAgICAgICAgLy81KSBWIHVkYWxvc3RlY2ggcG9zbG91Y2hhbSBuYSAnZGlzcG9zZWQnIChkYWxlIHZpeiBjb21tZW50IHRhbSAjI0RJU1BPU0VEIyMpXHJcblxyXG4gICAgICAgIGlmIChHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLmlzSW5pdGlhbGl6ZWQoKSkge1xyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLnN5bmNTdGF0ZXMoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNBbnlUYXNrUnVubmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLmRlbGF5ZWRTdGFydChcIkdvcmRpYy5Pem4uU2VydmVyLk1lc3NhZ2VzQXN5bmNcIiwgbnVsbCwgeyBjbGVhck9uRmluaXNoOiB0cnVlLCBhdXRvQ2xlYW46IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7IHNldFRpbWVvdXQoKCkgPT4geyBTdGFydEFzeW5jVGFzaygpOyB9LCAxMCAqIDEwMDApOyB9IC8vemt1c2ltZSB6bm92dSB6YSAxMCBzZWt1bmRcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ2hlY2tSZWFkZWQoKSB7XHJcbiAgICAgICAgLy8gTk9URTogUHJvdmFkaSBzZSBwb3V6ZSBwxZlpIHN0YXJ0dSBtb2R1bHUgXHJcbiAgICAgICAgLy8gMSkgS29udHJvbHVqZSB6ZGEgbmVuaSBuZWpha8OhIHpwcmF2YSB0eXB1IDUwIHDFmWXEjXRlbsOhIGFsZSwgbmV2eXByxaFlbGEgamVqw60gcGxhdG5vc3QgLSB0byB6bmFtZW7DoSBuZXpvYnJhesOtIHNlIHZlbGvDqSBtb2TDoWxuw60gb2tubyBwcm8gcG90dnJ6ZW7DrVxyXG4gICAgICAgIEdvcmRpYy5Jc2wuTWVzc2FnZXMubGlzdFJlYWRlZCgpLmdldERhdGEoKS5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0udXJvdmVuX21zZyA9PSA1MClcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVBbGVydEJlZm9yZUxvZ291dChpdGVtKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFpvYnJhemVuw60gVHJ2YWzDvWNoIHpwcsOhdiBwb3V6ZSAxeCBwxZlpIHN0YXJ0dSBtb2R1bHUgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBTaG93U3RhcnRpbmdNZXNzYWdlcygpIHtcclxuICAgICAgICBHb3JkaWMuSXNsLk1lc3NhZ2VzLmxpc3QoeyBmaWx0ZXJzOiB7IHVyb3Zlbl9tc2c6IHsgbzogXCI9XCIsIHY6IFwiMjBcIiB9IH0gfSkuZ2V0RGF0YSgpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgdmFyIGNudCA9ICQuY29udGVudCgkKFwiI21haW5cIikpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkX2F2eikge1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuTWVzc2FnZXMucmVhZCh7IGlkX2F2ejogaXRlbS5pZF9hdnogfSkuZ2V0RGF0YSgpLmRvbmUoKG91dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbnQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuT3puLldlYkNsaWVudC5HTWVzc2FnZURldGFpbFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBvdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogb3V0Lmd1aWQgPyBcIkdNZXNzYWdlRGV0YWlsUHJpbG9oYVwiIDogXCJHTWVzc2FnZURldGFpbEJlelByaWxvaHlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJZDogXCJhY3RHTWVzc2FnZURldGFpbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBvdXQuZ3VpZCA/IDgwMCA6IDUwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogb3V0Lmd1aWQgPyA4MDAgOiA0MDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEJlemkgYWxlc3BvbiBqZWRuYSBhc3luYy4gdWxvaGEgcyBvem5hbWVuaW1pIGFkbWludW0/IChQT1pPUiEgdXZuaXRyIHNlIHZ5cGluYWppIHJlZHVuZGFudG5pIHVsb2h5KSAqL1xyXG4gICAgZnVuY3Rpb24gaXNBbnlUYXNrUnVubmluZygpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCB0YXNrcyA9IGdldE1lc3NhZ2VzQXN5bmNUYXNrUnVubmluZygpO1xyXG4gICAgICAgIHJldHVybiBjYW5jZWxSZWR1bmRhbnRUYXNrcyh0YXNrcykgIT09IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFpydXNpIHZzZWNobnkgZHVwbGljaXRuZSBiZXppY2kgdWxvaHkgYSB2cmF0aSBwb3V6ZSB0dSBqZWRudSwga3RlcmEgbWEgYmV6ZXQuICovXHJcbiAgICBmdW5jdGlvbiBjYW5jZWxSZWR1bmRhbnRUYXNrcyh0YXNrczogR29yZGljLkFzeW5jLklHVGFza1tdKTogR29yZGljLkFzeW5jLklHVGFzayB8IG51bGwge1xyXG4gICAgICAgIGxldCBzaW5nbGVSdW5uaW5nOiBHb3JkaWMuQXN5bmMuSUdUYXNrIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrID0gdGFza3NbaV07XHJcbiAgICAgICAgICAgIGlmICghc2luZ2xlUnVubmluZyAmJiB0YXNrLnN0YXRlID09PSBHb3JkaWMuQXN5bmMuR1Rhc2tTdGF0ZS5ydW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBzaW5nbGVSdW5uaW5nID0gdGFzaztcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRhc2suY2FuY2VsKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2luZ2xlUnVubmluZztcclxuICAgIH1cclxuXHJcbiAgICAvKiogVnJhdGkgc2V6bmFtIGJlemljaWNoIGFzeW5jLiB1bG9oIHR5cHUgJ0dvcmRpYy5Pem4uU2VydmVyLk1lc3NhZ2VzQXN5bmMnLiAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0TWVzc2FnZXNBc3luY1Rhc2tSdW5uaW5nKCk6IEdvcmRpYy5Bc3luYy5JR1Rhc2tbXSB7XHJcbiAgICAgICAgcmV0dXJuIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIuZmluZEJ5Q2xhc3MoXCJHb3JkaWMuT3puLlNlcnZlci5NZXNzYWdlc0FzeW5jXCIpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKHQgPT4gdC5zdGF0ZSA9PT0gR29yZGljLkFzeW5jLkdUYXNrU3RhdGUucnVubmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vdGlmaWNhdGlvbihtZXNzYWdlKSB7XHJcbiAgICAgICAgdmFyIGNudCA9ICQuY29udGVudCgkKFwiI21haW5cIikpO1xyXG4gICAgICAgIHZhciBub3RpZk9wdHM6IElHTm90aWZpY2F0aW9uT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgZ3JvdXA6IFwibm90LWF2elwiLFxyXG4gICAgICAgICAgICBpZDogXCJub3QtYXZ6LXswfVwiLmZvcm1hdChtZXNzYWdlLmlkX2F2ej8udG9TdHJpbmcoKSksXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IG1lc3NhZ2UsXHJcbiAgICAgICAgICAgIGRhdGVUaW1lOiBuZXcgRGF0ZShEYXRlLm5vdygpKSxcclxuICAgICAgICAgICAgaWNvbjogKG1lc3NhZ2UudXJvdmVuX21zZyA9PSA1MCB8fCBtZXNzYWdlLnVyb3Zlbl9tc2cgPT0gMzApID8gXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZVwiIDogXCJmYS1pbmZvLWNpcmNsZVwiLFxyXG4gICAgICAgICAgICBzdGF0ZTogY3JlYXRlTm90aWZpY2F0aW9uTGV2ZWwobWVzc2FnZS51cm92ZW5fbXNnKSxcclxuICAgICAgICAgICAgc2hvcnRUZW1wbGF0ZTogXCI8Yj57cG9waXN9PC9iPjxiciAvPjxzcGFuPnt0ZXh0fTwvc3Bhbj48YnIgLz48aSBjbGFzcz0nZmEgZmEtZXh0ZXJuYWwtbGluaycgYXJpYS1oaWRkZW49J3RydWUnPjwvaT4mbmJzcDs8Yj5qcmVzOjMzMDAwMDUxPC9iPlwiLCAvL1JDIDMzMDAwMDUxIDogS2xpa27Em3RlIHBybyBkZXRhaWwgenByw6F2eS5cclxuICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJvcGVuTm90TWVzc2FnZVwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiaWQtYXZ6X3swfVwiLmZvcm1hdChtZXNzYWdlLmlkX2F2ej8udG9TdHJpbmcoKSksXHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tQ2xhc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkX2F2eiA9IHRoaXMuY3VzdG9tQ2xhc3Muc3BsaXQoXCJfXCIpWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5vdGlmT2JzLmlzVmlzaXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZPYnMudXBkYXRlKHsgaXNWaXNpdGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuTWVzc2FnZXMucmVhZCh7IGlkX2F2ejogcGFyc2VJbnQoaWRfYXZ6KSB9KS5nZXREYXRhKCkuZG9uZSgob3V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuT3puLldlYkNsaWVudC5HTWVzc2FnZURldGFpbFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogb3V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBvdXQuZ3VpZCA/IFwiR01lc3NhZ2VEZXRhaWxQcmlsb2hhXCIgOiBcIkdNZXNzYWdlRGV0YWlsQmV6UHJpbG9oeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJZDogXCJhY3RHTWVzc2FnZURldGFpbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG91dC5ndWlkID8gODAwIDogNTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogb3V0Lmd1aWQgPyA4MDAgOiA0MDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbm90aWZPYnMgPSBuZXcgR09ic2VydmFibGVPYmplY3Qobm90aWZPcHRzKTtcclxuICAgICAgICBjbnQubm90aWZpY2F0aW9uKFwiYWRkXCIsIG5vdGlmT2JzLCB7IGRlbGF5OiBtZXNzYWdlLmF2el9kZWxheSB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZURpYWxvZ0Zvck1vc3RJbXBvcnRhbnRNZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgICAgICB2YXIgYWN0aW9uQ29uZmlybSA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgbmFtZTogXCJtc2ctY29uZmlybVwiLFxyXG4gICAgICAgICAgICBjYXB0aW9uOiBcIk9LXCIsXHJcbiAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctYnV0dG9uLS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY250ID0gJC5jb250ZW50KGV2LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3R4LmlkX2F2eiAhPSBudWxsICYmIGN0eC5pZF9hdnogIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLklzbC5NZXNzYWdlcy5jb25maXJtUmVhZCh7IGlkX2F2ejogY3R4LmlkX2F2eiB9KS5nZXREYXRhKCkuZG9uZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNudC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGFjdGlvbkNvbmZpcm0uZW5hYmxlZCh0cnVlKSwgMjAwMClcclxuXHJcbiAgICAgICAgR0RsZy5tZXNzYWdlQm94KHtcclxuICAgICAgICAgICAgY29tbWFuZEJhcjogW3tcclxuICAgICAgICAgICAgICAgIGFjdGlvbkNvbnRleHQ6IHsgaWRfYXZ6OiBtZXNzYWdlLmlkX2F2eiB9LFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb25Db25maXJtXHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICB0aXRsZTogbWVzc2FnZS51cm92ZW5fbXNnX3R4dCxcclxuICAgICAgICAgICAgd2lkdGg6IDYwMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAzMDAsXHJcbiAgICAgICAgICAgIGljb246IFwiZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtezB9XCIuZm9ybWF0KChtZXNzYWdlLnVyb3Zlbl9tc2cgPT0gNTApID8gXCJlcnJvclwiIDogXCJpbXBvcnRhbnRcIiksXHJcbiAgICAgICAgICAgIGh0bWw6IFwiPGRpdiBjbGFzcz0nYWRtaW4tbXNnLXsyfSc+PGI+ezB9PC9iPjxiciAvPjxiciAvPjxzcGFuPnsxfTwvc3Bhbj5cIi5mb3JtYXQobWVzc2FnZS5wb3BpcywgbWVzc2FnZS50ZXh0LCBtZXNzYWdlLmlkX2F2eiksXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVOb3RpZmljYXRpb25MZXZlbChsZXZlbCk6IFwiaW5mb1wiIHwgXCJpbXBvcnRhbnRcIiB8IFwiZXJyb3JcIiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgc3dpdGNoIChsZXZlbCkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJpbmZvXCI7XHJcbiAgICAgICAgICAgIGNhc2UgMzA6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJpbXBvcnRhbnRcIjtcclxuICAgICAgICAgICAgY2FzZSA1MDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImVycm9yXCJcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQWxlcnRCZWZvcmVMb2dvdXQobWVzc2FnZTogYW55KSB7XHJcbiAgICAgICAgdmFyIGRhdERvID0gbmV3IERhdGUobWVzc2FnZS5kYXR1bV9kbyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBdXRvbWF0aWMgbG9nb3V0IC0gc3RhcnRcIilcclxuICAgICAgICB2YXIgc2hvd24xID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHNob3duNSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBpbnRlcnZhbE1haW4gPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBkaWZmID0gTWF0aC5mbG9vcihkYXREby5nZXRUaW1lKCkgLSBjdXJyZW50RGF0ZS5nZXRUaW1lKCkpIC8gKDEwMDAgKiA2MClcclxuICAgICAgICAgICAgdmFyIGRpZmZTZWMgPSBNYXRoLmZsb29yKGRhdERvLmdldFRpbWUoKSAtIGN1cnJlbnREYXRlLmdldFRpbWUoKSkgLyAxMDAwXHJcbiAgICAgICAgICAgIGlmIChkaWZmU2VjIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgKCQuY29udGVudChcIm1haW5cIikgYXMgYW55KT8ubG9nb3V0KHRydWUsIHsgYmFja01hc2s6IDQsIHJlYXNvbjogXCJqcmVzOjMzMDAwMDYzXCIgfSk7IC8vUkMgMzMwMDAwNjMgOiBCeWxpIGpzdGUgYXV0b21hdGlja3kgb2RobMOhxaFlbmkuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlmZiA8IDEgJiYgIXNob3duMSkge1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlQWxlcnREaWFsb2dOZXcoZGF0RG8pLm9uKFwib2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3duMSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpZmYgPCA1ICYmICFzaG93bjUpIHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUFsZXJ0RGlhbG9nTmV3KGRhdERvKS5vbihcIm9rXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93bjUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDE1ICogMTAwMClcclxuXHJcbiAgICAgICAgJChcImJvZHlcIikub24oXCJhcHBsaWNhdGlvbmVuZFwiLCAoZXYpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBdXRvbWF0aWMgbG9nb3V0IC0gc3RvcFwiKTtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbE1haW4pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQWxlcnREaWFsb2dOZXcoZGF0RG86IERhdGUpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHtcclxuICAgICAgICAkKFwiLmFsZXJ0LWF1dG9tYXRpYy1sb2dvdXRcIikuY2xvc2VzdChcIi51aS1kaWFsb2ctY29udGVudFwiKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICB2YXIgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHZhciBkaWZmU2VjID0gKGRhdERvLmdldFRpbWUoKSAtIGN1cnJlbnREYXRlLmdldFRpbWUoKSkgLyAxMDAwXHJcbiAgICAgICAgcmV0dXJuIEdEbGcuYWxlcnQoXCJqcmVzOjMzMDAwMDY0XCIsIFwiPGRpdiBjbGFzcz0nYWxlcnQtYXV0b21hdGljLWxvZ291dCc+anJlczozMzAwMDA2NVwiLmZvcm1hdChHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUoZGF0RG8sIFwiZGF0ZXRpbWVcIiksIE1hdGguZmxvb3IoZGlmZlNlYyAvIDYwKSwgTWF0aC5mbG9vcihkaWZmU2VjICUgNjApKSkgLy9SQyAzMzAwMDA2NSA6IEsgYXV0b21hdGlja8OpbXUgb2RobMOhxaFlbsOtIGRvamRlIHYgPGI+IHswfSA8L2I+IChaYsO9dsOhOiA8Yj57MX08L2IgPilcclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgR29yZGljLk96bi5XZWJDbGllbnQge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHTWVzc2FnZURldGFpbCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBtZXNzYWdlOiBHb3JkaWMuT3puLkludGVyZmFjZS5HTWVzc2FnZUR0bztcclxuICAgICAgICBwcml2YXRlIGZpbGU6IEdvcmRpYy5HZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdGaWxlSW5mb0R0bztcclxuICAgICAgICBwcml2YXRlIGZpbGVCYXNlNjQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzcnYoKSB7IHJldHVybiB0aGlzLmNyZWF0ZVNlcnZpY2VDb250ZW50KFwiR29yZGljLk96bi5XZWJDbGllbnQuR01lc3NhZ2VEZXRhaWxcIik7IH0gLy8gbmFzdMOhdmFsIGVycm9yLCBwcm90b8W+ZSBNZXNzYWdlRGV0YWlsIHTFmcOtZGEgbmVleGlzdHVqZVxyXG5cclxuICAgICAgICBjb25maXJtQWN0KCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMubWVzc2FnZS5pZF9hdnogIT0gdW5kZWZpbmVkICYmIHRoaXMubWVzc2FnZS5pZF9hdnogIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNudCA9ICQuY29udGVudCgkKFwiI21haW5cIikpO1xyXG4gICAgICAgICAgICAgICAgR29yZGljLklzbC5NZXNzYWdlcy5jb25maXJtUmVhZCh7IGlkX2F2ejogdGhpcy5tZXNzYWdlLmlkX2F2eiB9KS5nZXREYXRhKCkuZG9uZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9ICQoXCIuZ25vdGlmaWNhdGlvbmxpc3RcIikuZ25vdGlmaWNhdGlvbmxpc3QoXCJmaW5kQnlJZFwiLCBcIm5vdC1hdnotezB9XCIuZm9ybWF0KHRoaXMubWVzc2FnZS5pZF9hdno/LnRvU3RyaW5nKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJyZW1vdmVcIiwgbm90aWZpY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkNsb3NlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5maWxlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNydigpLmZpcmUoXCJDbGVhckZpbGVcIiwgeyBndWlkOiB0aGlzLm1lc3NhZ2UuZ3VpZCB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkSGVscENvbnRleHQodGhpcy5nZXRNZXNzYWdlVHlwZSgpKVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUhlYWRlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm1FbGVtZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUHJldmlldygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVIZWFkZXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXIgPSAkKFwiPGRpdiBjbGFzcz0ndXNlci1ub3QtaGVhZGVyJz5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgJChcIjxzcGFuIGNsYXNzPSdpY29uIHswfSc+XCIuZm9ybWF0KHRoaXMuY3JlYXRlTG9nbygpKSkuYXBwZW5kVG8oaGVhZGVyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWVzc2FnZS51cm92ZW5fbXNnID09IDIwICYmIHRoaXMubWVzc2FnZS50ZXh0KSB7IC8vcHJvIHRydmFsw6kgenByw6F2eVxyXG4gICAgICAgICAgICAgICAgdmFyIHNwYW4gPSAkKFwiPHNwYW4+XCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIjxzcGFuIGNsYXNzPSdoZWFkZXInIHN0eWxlPSd3aGl0ZS1zcGFjZTogcHJlLWxpbmUnPlwiKS50ZXh0KHRoaXMubWVzc2FnZS50ZXh0KS5hcHBlbmRUbyhzcGFuKTtcclxuICAgICAgICAgICAgICAgIHNwYW4uYXBwZW5kVG8oaGVhZGVyKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1lc3NhZ2UudXJvdmVuX21zZ190eHQpIHtcclxuICAgICAgICAgICAgICAgICQoXCI8c3Bhbj5cIikuaHRtbChcIjxzcGFuIGNsYXNzPSdoZWFkZXInPnswfTwvc3Bhbj5cIi5mb3JtYXQodGhpcy5tZXNzYWdlLnVyb3Zlbl9tc2dfdHh0KSkuYXBwZW5kVG8oaGVhZGVyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0wLTEyLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwiLCBuYW1lOiBcIm1zZy1mb3JtLWlkLWF2ei17MH1cIi5mb3JtYXQodGhpcy5tZXNzYWdlLmlkX2F2ej8udG9TdHJpbmcoKSkgfSlcclxuICAgICAgICAgICAgaWYgKHRoaXMubWVzc2FnZS51cm92ZW5fbXNnICE9IDIwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmFkZFJvdygpLmFkZEZpZWxkKFwiZ3N0YXRpY2ZpZWxkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGlzLm1lc3NhZ2UucG9waXNcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLy9pZiAodGhpcy5maWxlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAvLyAgICBmb3JtLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2ZpbGVmaWVsZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGlzLmZpbGUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaXRlbURlbGV0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgY2FuVXBsb2FkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRSb3coKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGlzLm1lc3NhZ2UudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRleHRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybUVsZW1lbnQoKSB7XHJcbiAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCB0aGlzLmNyZWF0ZUZvcm0oKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVByZXZpZXcoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1lc3NhZ2UuZ3VpZCAhPSBudWxsICYmIHRoaXMubWVzc2FnZS5ndWlkICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgJChcIjxoNCBzdHlsZT0nbWFyZ2luLWxlZnQ6IDFyZW0nPlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmh0bWwoXCJqcmVzOjMzMDUwMDAxXCIpIC8vUkMgMzMwNTAwMDEgOiBQxZlpbG/FvmVuw70gc291Ym9yOlxyXG4gICAgICAgICAgICAgICAgbGV0IGZpbGVQcmV2aWV3ID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2ZpbGVwcmV2aWV3KHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RmlsZU5hbWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZ2luZU9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGRmRW5naW5lOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6b29tTW9kZTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBmaWxlUHJldmlldy5nZmlsZXByZXZpZXcoXCJkaXNwbGF5RmlsZVwiLCB0aGlzLmZpbGVCYXNlNjQsIHRoaXMubWVzc2FnZS5uYXpldl9zb3Vib3J1ID8gYCR7dGhpcy5tZXNzYWdlLm5hemV2X3NvdWJvcnV9LnBkZmAgOiBcIlwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUxvZ28oKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5tZXNzYWdlLnVyb3Zlbl9tc2cpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZmEgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIjtcclxuICAgICAgICAgICAgICAgIGNhc2UgMzA6IGNhc2UgMjA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZmEgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW1wb3J0YW50XCI7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImZhIGZhLWluZm8tY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm9cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRNZXNzYWdlVHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tZXNzYWdlLnVyb3Zlbl9tc2cgIT0gbnVsbCAmJiB0aGlzLm1lc3NhZ2UudXJvdmVuX21zZyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5tZXNzYWdlLnVyb3Zlbl9tc2cpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJtZXNzYWdlVHlwZTpkb3BvcnVjZW5pXCJcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDIwOiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwibWVzc2FnZVR5cGU6dHJ2YWxhWnByYXZhXCJcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDMwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJtZXNzYWdlVHlwZTpkdWxleml0ZVVwb3pvcm5lbmlcIlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIm1lc3NhZ2VUeXBlOm9rYW16aXRhVnl6dmFcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJtZXNzYWdlVHlwZTppbmZvcm1hY2VcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibWVzc2FnZVR5cGU6bWVzc2FnZVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5Pem4uV2ViQ2xpZW50IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR01lc3NhZ2VEZXRhaWxBZG0gZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIHByaXZhdGUgbWVzc2FnZTogR29yZGljLk96bi5JbnRlcmZhY2UuR01lc3NhZ2VEdG87XHJcbiAgICAgICAgLy8gZmlsdGVyIHZjZXRuZSBmcmFnbWVudHMgeyBmcmFnbWVudHM6IFtmcmFnbWVudF0sIGZpbHRlcnM6IGZpbHRlciB9XHJcbiAgICAgICAgcHJpdmF0ZSBrcGlzOiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50RmlsdGVyOiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBlZGl0OiBib29sZWFuO1xyXG4gICAgICAgIHByaXZhdGUgaXNOZXc6IGJvb2xlYW47XHJcbiAgICAgICAgcHJpdmF0ZSBmaWxlOiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBuZXdNZXNzYWdlOiBib29sZWFuO1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZFJDOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkM8YW55PjtcclxuICAgICAgICBwcml2YXRlIGdyaWRSZWFkZWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSBwb3ZvbEVkaXROZXc6IGJvb2xlYW47XHJcbiAgICAgICAgcHJpdmF0ZSBmYXplOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8qKiBQxZllZGNob3rDrSBmw6F6ZSwgcHJvIG1vxb5ub3N0IHZyw6FjZW7DrSBwxa92b2Ruw60gZsOhemUgcMWZZWQgemHFoWtydG51dMOtbSBWxaFlY2hueSBmw6F6ZSAqL1xyXG4gICAgICAgIHByaXZhdGUgcHJldkZhemU7XHJcbiAgIFxyXG4gICAgICAgIHByaXZhdGUgc3J2KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVTZXJ2aWNlQ29udGVudChcIkdvcmRpYy5Pem4uV2ViQ2xpZW50LkdNZXNzYWdlRGV0YWlsQWRtXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdWxveml0WmF6bmFtTWFpbigpIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlRGF0YShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbG9zaW5nKCk6IEpRdWVyeS5EZWZlcnJlZDxhbnksIGFueSwgYW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5lZGl0ID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBHRGxnLmNvbmZpcm0oXCJqcmVzOjMzMDAwMDg0XCIpLm9uKFwieWVzXCIsICgpID0+IHsgLy9SQyAzMzAwMDA4NCA6IE9wcmF2ZHUgY2hjZXRlIG9vcHVzdGl0IG96bsOhbWVuw60gYmV6IHVsb8W+ZW7DrT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZmlsZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zcnYoKS5maXJlKFwiUmVtb3ZlRmlsZVwiLCB7IGd1aWQ6IHRoYXQuZmlsZS5ndWlkIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLm9uKFwibm9cIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmZpbGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zcnYoKS5maXJlKFwiUmVtb3ZlRmlsZVwiLCB7IGd1aWQ6IHRoYXQuZmlsZS5ndWlkIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJJbml0KGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcikge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0RWRpdE1lc3NhZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXBlbmNpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAyM1wiLCAvL1JDIDMzMDAwMDIzIDogRWRpdG92YXRcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLnBvdm9sRWRpdE5ldyxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0QWN0aXZlRmlsZWRzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RSZWxvYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFNhdmVNZXNzYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1zYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDI0XCIsIC8vUkMgMzMwMDAwMjQgOiBVbG/Fvml0XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5wb3ZvbEVkaXROZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vYWN0Q2FuY2VsRWRpdDoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwianJlczozMzAwMDAyNVwiLCAvL1JDIDMzMDAwMDI1IDogWnJ1xaFpdFxyXG4gICAgICAgICAgICAgICAgLy8gICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMucmVsb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgYWN0UHJldmlvdXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMzRcIiwgLy9SQyAzMzAwMDAzNCA6IFDFmWVkY2hvesOtXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IFwibmV2ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiAhdGhpcy5uZXdNZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktYXJyb3ctZG93biBnaS1yb3QxODBcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEFuZFByZXZpb3VzQWN0aW9uKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0TmV4dDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAzNVwiLCAvL1JDIDMzMDAwMDM1IDogRGFsxaHDrVxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBcIm5ldmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogIXRoaXMubmV3TWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWFycm93LWRvd25cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEFuZFByZXZpb3VzQWN0aW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RSZWFsb2RSZWFkZXNSZWY6IHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXJlZnJlc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMzhcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZFJlYWRlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RSZW1vdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA2NlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMucG92b2xFZGl0TmV3LFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoaXMubWVzc2FnZS5ha3Rpdml0YSA9PSAxMDAgJiYgdGhpcy5pc05ldyA9PSBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTWVzc2FnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RFbmRNZXNzYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDc1XCIsIC8vUkMgMzMwMDAwNzUgOiBVa29uxI1pdCBwbGF0bm9zdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtY2xvY2stb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMucG92b2xFZGl0TmV3LFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoaXMudGVzdERhdHVtRG8oKSAmJiB0aGlzLmlzTmV3ID09IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRWYWxpZGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RDb3B5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDgyXCIsIC8vUkMgMzMwMDAwODIgOiBLb3DDrXJvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1jb3B5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5wb3ZvbEVkaXROZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhpcy5pc05ldyA9PSBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29weUZyb21UaGlzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdEFyY2hpdjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA5NVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtYXJjaGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMucG92b2xFZGl0TmV3LFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoaXMuaXNOZXcgPT0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFyY2hpdk1lc3NhZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB2YXIgdGFiR3JvdXBzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc05ldyA9PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRhYkdyb3Vwcy5wdXNoKHsgaWQ6IFwiX21lc3NhZ2VzUmVhZGVkXCIsIGNhcHRpb246IFwianJlczozMzAwMDA1MlwiIH0pXHJcblxyXG4gICAgICAgICAgICB2YXIgdGFiczogYW55ID0ge307XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTmV3ID09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgdGFicyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0YWJNZXNzYWdlc1JlYWRlZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0UmVhbG9kUmVhZGVzUmVmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzMDAwMDUyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogeyBpZDogXCJfbWVzc2FnZXNSZWFkZWRcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6ICh0YWIpID0+IHsgdGhpcy5jcmVhdGVSZWFkZWRUYWIodGFiKTsgdGhpcy5zZXREYXRhVG9HcmlkUmVhZGVkKCkgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBidWlsZGVyLndpdGhDb21wb25lbnQ8dGhpcz4oXCJHTWVzc2FnZURldGFpbEFkbVwiLCB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJGb3JtOiB0aGlzLmNyZWF0ZUZvcm0oKSxcclxuICAgICAgICAgICAgICAgIHRhYkdyb3VwczogdGFiR3JvdXBzLFxyXG4gICAgICAgICAgICAgICAgdGFiczogdGFicyxcclxuICAgICAgICAgICAgICAgIGtwaXM6IHRoaXMuY3JlYXRlS3BpcygpXHJcbiAgICAgICAgICAgIH0sIHRydWUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJCdWlsZChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpIHsgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHRlc3REYXR1bURvKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCkudG9KU09OKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1lc3NhZ2UuZGF0dW1fZG8gJiYgdGhpcy5tZXNzYWdlLmRhdHVtX29kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZURvID0gbmV3IERhdGUodGhpcy5tZXNzYWdlLmRhdHVtX2RvLnRvU3RyaW5nKCkpLnRvSlNPTigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGVPZCA9IG5ldyBEYXRlKHRoaXMubWVzc2FnZS5kYXR1bV9vZC50b1N0cmluZygpKS50b0pTT04oKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRlRG8gPD0gZGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRlT2QgPj0gZGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBcclxuICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG5leHRBbmRQcmV2aW91c0FjdGlvbihuZXh0OiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmo6IGFueTtcclxuICAgICAgICAgICAgaWYgKG5leHQgPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIG9iaiA9IHRoaXMuZ3JpZFJDLmN1cnJlbnQoKS5uZXh0Um93LmRhdGE7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG9iaiA9IHRoaXMuZ3JpZFJDLmN1cnJlbnQoKS5wcmV2Um93LmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZFJDLm1vdmUobmV4dCk7XHJcbiAgICAgICAgICAgIHZhciBncmlkUmMgPSB0aGlzLmdyaWRSQztcclxuICAgICAgICAgICAgdGhpcy5jbG9zaW5nKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5uYXZpZ2F0ZShbXCJHb3JkaWMuT3puLldlYkNsaWVudC5HTWVzc2FnZURldGFpbEFkbVwiLCB7IGdyaWRSQzogZ3JpZFJjLCBjdXJyZW50RmlsdGVyOiB0aGlzLmN1cnJlbnRGaWx0ZXIsIElkOiBcIkdNZXNzYWdlc0RldGFpbEFkbVwiLCB0YXNrSWQ6IFwiYWN0R01lc3NhZ2VzRGV0YWlsQWRtXCIgfV0sIHsgaWRfYXZ6OiBvYmouaWRfYXZ6IH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5hY3RBY3RpdmVGaWxlZHMoKHRoaXMuaXNOZXcgPT0gdHJ1ZSkgPyB0cnVlIDogZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKHtcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAyMlwiIC8vUkMgMzMwMDAwMjIgOiBEZXRhaWwgdnprYXp1XHJcbiAgICAgICAgICAgIH0pOyBcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1xyXG4gICAgICAgICAgICAgICAgXCJhY3RFZGl0TWVzc2FnZSpcIiwgXCJhY3RTYXZlTWVzc2FnZSpcIiwgXCJhY3RSZW1vdmUqXCIsIFwiYWN0RW5kTWVzc2FnZSpcIiwgXCJhY3RDb3B5KlwiLCBcImFjdEFyY2hpdipcIixcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0UHJldmlvdXMsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdE5leHQsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH1cclxuICAgICAgICAgICAgXSkpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdyaWRSQyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyaWRSQz8uY3VycmVudCgpICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQcmV2aW91cz8uZW5hYmxlZCh0aGlzLmdyaWRSQy5jdXJyZW50KCkucHJldlJvdyAhPSBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0TmV4dD8uZW5hYmxlZCh0aGlzLmdyaWRSQy5jdXJyZW50KCkubmV4dFJvdyAhPSBudWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN0YXR1c0JhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVLcGlzKCk6IGFueSB7XHJcbiAgICAgICAgICAgIHRoaXMua3BpcyA9IHt9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc05ldyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rcGlzLmNvbmZpcm1hdGlvbkNvdW50ID0gbmV3IEdPYnNlcnZhYmxlT2JqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbmZpcm1hdGlvbkNvdW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpVmFsdWVUd29Sb3dzVGV4dFRlbXBsYXRlKCkuaXRlbVRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlUZXh0OiBcImpyZXM6MzMwMDAwOTZcIiwgLy9SQyAzMzAwMDA5NiA6IFBvxI1ldCBwb3R2cnplbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHsgdmFsdWU6IFwiXCIgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5rcGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVTdGF0dXNCYXIoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTmV3ID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzQmFyKFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdGF0aWNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwOTdcIiwgLy9SQyAzMzAwMDA5NyA6IE5PVsOBIFpQUsOBVkEgUFJPIFXFvUlWQVRFTEVcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvXCJcclxuICAgICAgICAgICAgICAgIH1dKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWVzc2FnZS5ha3Rpdml0YSAhPSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IFwianJlczozMzAwMDA4NVwiOyAvL1JDIDMzMDAwMDg1IDogWlJVxaBFTsOdIFrDgVpOQU1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c0Jhcihbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0YXRpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiXHJcbiAgICAgICAgICAgICAgICAgICAgfV0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lc3NhZ2UuZGF0dW1fb2QgJiYgdGhpcy5tZXNzYWdlLmRhdHVtX2RvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXR1bU9kID0gbmV3IERhdGUodGhpcy5tZXNzYWdlLmRhdHVtX29kLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0dW1EbyA9IG5ldyBEYXRlKHRoaXMubWVzc2FnZS5kYXR1bV9kby50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VzdG9tQ2xhc3MgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0dW1PZCA+IGN1cnJlbnREYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzcyA9IFwiZy1zdGF0ZS1pbmZvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBcImpyZXM6MzMwMDAwMzlcIi5mb3JtYXQoR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKGRhdHVtT2QsIFwiZGF0ZXRpbWVcIikpOyAvL1JDIDMzMDAwMDM5IDogWnByw6F2YSBwcm8gdcW+aXZhdGVsZSB2eWpkZSB2IHBsYXRub3N0IHswfSB7MX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXR1bURvIDwgY3VycmVudERhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBcImpyZXM6MzMwMDAwNDBcIi5mb3JtYXQoR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKGRhdHVtRG8sIFwiZGF0ZXRpbWVcIikpOyAvL1JDIDMzMDAwMDQwIDogWnByw6F2xJsgcHJvIHXFvml2YXRlbGUgc2tvbsSNaWxhIHBsYXRub3N0IHswfSB7MX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzID0gXCJnLXN0YXRlLXN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IFwianJlczozMzAwMDA0MVwiOyAvL1JDIDMzMDAwMDQxIDogQWt0dcOhbG7EmyBwbGF0bsOhIHpwcsOhdmEgcHJvIHXFvml2YXRlbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c0Jhcihbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdGF0aWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWNsb2NrLW9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInswfSBnLXN0YXRlLXRleHRcIi5mb3JtYXQoY3VzdG9tQ2xhc3MpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYWN0QWN0aXZlRmlsZWRzKGFjdGl2ZUZpZWxkczogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLmVkaXQgPSBhY3RpdmVGaWVsZHM7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gdGhpcy5maW5kRm9ybXMoXCJtZXNzYWdlRGV0YWlsQWRtRm9ybVwiKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKChhY3RpdmVGaWVsZHMgPT0gdHJ1ZSkgPyBcImVuYWJsZVwiIDogXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tZXNzYWdlLmZhemVBbGxDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJmYXplXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdEVkaXRNZXNzYWdlPy52aXNpYmxlKCFhY3RpdmVGaWVsZHMpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0U2F2ZU1lc3NhZ2U/LnZpc2libGUoYWN0aXZlRmllbGRzKTtcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0Q2FuY2VsRWRpdD8udmlzaWJsZShhY3RpdmVGaWVsZHMpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0UmVtb3ZlPy52aXNpYmxlKCFhY3RpdmVGaWVsZHMpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RW5kTWVzc2FnZT8udmlzaWJsZSghYWN0aXZlRmllbGRzKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdENvcHk/LnZpc2libGUoIWFjdGl2ZUZpZWxkcyk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RTYXZlTWFpbj8uZW5hYmxlZChhY3RpdmVGaWVsZHMpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0QXJjaGl2Py52aXNpYmxlKCFhY3RpdmVGaWVsZHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkRGF0YShvcGVuOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIGlmIChvcGVuID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tZXNzYWdlLmd1aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcnYoKS5jYWxsKFwiR2V0RmlsZUluZm9cIiwgeyBndWlkOiB0aGlzLm1lc3NhZ2UuZ3VpZCB9KS5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhcImZpbGVcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhpcy5maWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCJmaWxlXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoaXMuZmlsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMubWVzc2FnZSAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGb3JtcyhcIm1lc3NhZ2VEZXRhaWxBZG1Gb3JtXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlbG9hZERhdGEoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGVDbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2F2ZURhdGEocmVsb2FkOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5maW5kRm9ybXMoXCJtZXNzYWdlRGV0YWlsQWRtRm9ybVwiKS5nZm9ybShcImlzVmFsaWRcIikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZvcm1zKFwibWVzc2FnZURldGFpbEFkbUZvcm1cIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGlzLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbGUgPSB0aGlzLmZpbmRGaWVsZHMoXCJmaWxlXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbGUubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UuZ3VpZCA9IGZpbGVbMF0uZ3VpZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UubmF6ZXZfc291Ym9ydSA9IGZpbGVbMF0uZmlsZW5hbWUuc3BsaXQoJy4nKS5zbGljZSgwLCAtMSkuam9pbignLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZS5wcmlwb25hX3NvdWJvcnUgPSBcIi57MH1cIi5mb3JtYXQoZmlsZVswXS5maWxlbmFtZS5zcGxpdCgnLicpLnBvcCgpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlLmd1aWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZS5uYXpldl9zb3Vib3J1ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UucHJpcG9uYV9zb3Vib3J1ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMudXBzZXJ0TWVzc2FnZShyZWxvYWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVwc2VydE1lc3NhZ2UocmVsb2FkOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLk1lc3NhZ2VzLnVwc2VydCh7IGRhdGE6IHRoaXMubWVzc2FnZSB9KS5nZXREYXRhKCkuZG9uZSgobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIHZhciBncmlkUmMgPSB0aGlzLmdyaWRSQztcclxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0VXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NpbmcoKS5kb25lKCgpID0+IHsgdGhpcy5jbG9zZSgpIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlbG9hZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KCkubmF2aWdhdGUoW1wiR29yZGljLk96bi5XZWJDbGllbnQuR01lc3NhZ2VEZXRhaWxBZG1cIiwgeyBncmlkUkM6IHRoaXMuZ3JpZFJDLCBjdXJyZW50RmlsdGVyOiB0aGlzLmN1cnJlbnRGaWx0ZXIsIElkOiBcIkdNZXNzYWdlc0RldGFpbEFkbVwiLCB0YXNrSWQ6IFwiYWN0R01lc3NhZ2VzRGV0YWlsQWRtXCIgfV0sIHsgaWRfYXZ6OiBtZXNzYWdlLmlkX2F2eiB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKSB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGVNYWluZ3JpZChkYXRhOiBJbnRlcmZhY2UuR01lc3NhZ2VEdG8sIGRlbDogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZCA9ICh0aGlzLmdyaWRSQyBhcyBhbnkpLmdyaWRJbnN0YW5jZS5lbGVtZW50O1xyXG4gICAgICAgICAgICBpZiAoZ3JpZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlldzogR29yZGljLkRhdGEuVmlldyA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcudXBkYXRlRGF0YShkYXRhLCBcImRlbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXdNZXNzYWdlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlldy51cGRhdGVEYXRhKGRhdGEsIFwiZXh0ZW5kXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZURhdGEoZGF0YSwgXCJhZGRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFJDID0gbmV3IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQyhncmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0ZXN0VXBkYXRlKGRlbDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRGaWx0ZXIgIT0gbnVsbCAmJiB0aGlzLmN1cnJlbnRGaWx0ZXIgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuSXNsLk1lc3NhZ2VzLmxpc3RBbGwoeyAuLi50aGlzLmN1cnJlbnRGaWx0ZXIsIC4uLnsgZmlsdGVyczoge2lkX2F2ejogdGhpcy5tZXNzYWdlLmlkX2F2en19fSkuZ2V0RGF0YSgpLmRvbmUoKGRhdGEpID0+IHsgLy9QU01FSktBTCAtIGTFmcOtdmUgZG9jaMOhemVsbyBrIHDFmWlkw6Fuw60gZmlsdGVydSBkbyBmaWx0cnUgR01lc3NhZ2VMaXN0IChudXRubyBkZWVwQ29weSBuZWJvIHRha3RvKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTWFpbmdyaWQoZGF0YVswXSwgZGVsKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PSAwICYmIGRlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1haW5ncmlkKHsgaWRfYXZ6OiB0aGlzLm1lc3NhZ2UuaWRfYXZ6IH0sIGRlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbGV2ZWxzID0gW1xyXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMTdcIiwgdmFsdWU6IDAgfSwgLy9SQyAzMzAwMDAxNyA6IEluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMThcIiwgdmFsdWU6IDEwIH0sIC8vUkMgMzMwMDAwMTggOiBEb3BvcnXEjWVuw61cclxuICAgICAgICAgICAgICAgIHsgY2FwdGlvbjogXCJqcmVzOjMzNjAwMDAxXCIsIHZhbHVlOiAyMCB9LCAvL1JDIDMzNjAwMDAxIDogVHJ2YWzDoSB6cHLDoXZhXHJcbiAgICAgICAgICAgICAgICB7IGNhcHRpb246IFwianJlczozMzAwMDAxOVwiLCB2YWx1ZTogMzAgfSwgLy9SQyAzMzAwMDAxOSA6IETFr2xlxb5pdMOpIHVwb3pvcm7Em27DrVxyXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMjBcIiwgdmFsdWU6IDUwIH0sIC8vUkMgMzMwMDAwMjAgOiBWw716dmEgayBva2Ftxb5pdMOpbXUgdWtvbsSNZW7DrSBwcsOhY2UgdiBtb2R1bGVjaFxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VUeXBlcyA9IFtcclxuICAgICAgICAgICAgICAgIHsgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDE1XCIsIHZhbHVlOiAwIH0sIC8vUkMgMzMwMDAwMTUgOiBHbG9iw6FsbsOtIHBybyBjZWxvdSBkYXRhYsOhemlcclxuICAgICAgICAgICAgICAgIHsgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDE2XCIsIHZhbHVlOiAxMCB9LCAvL1JDIDMzMDAwMDE2IDogUHJvIHN0xZllZGlza2Egc3Bpc292w71jaCB1emzFr1xyXG4gICAgICAgICAgICBdO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIm1lc3NhZ2VEZXRhaWxBZG1Gb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMzAwMDAzM1wiKSAvL1JDIDMzMDAwMDMzIDogWnByw6F2YSBwcm8gdcW+aXZhdGVsZVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwMjZcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jZmF6KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZhemVcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAodGhpcy5tZXNzYWdlLmZhemVBbGxDaGVja2VkKSA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6ICh0aGlzLmZhemUpID8gW3sgZmF6ZTogdGhpcy5mYXplIH1dIDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgYXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBhcnIudmFsdWU/LnJlZHVjZSgodW5pcXVlOiBEYXRhLlJlYWRlcnMuR2luY2ZhekR0b1tdLCBvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVuaXF1ZS5zb21lKG9iaiA9PiBvYmouZmF6ZSA9PT0gby5mYXplKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmlxdWUucHVzaChvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmlxdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFtdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmYXplQWxsQ2hlY2tlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM2MDAwMDJcIiwgLy9SQyAzMzYwMDAwMiA6IFbFoWVjaG55IGbDoXplXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGRGYXplID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJmYXplXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZGYXplID0gZmllbGRGYXplLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRGYXplLmdmaWVsZChcInNldFZhbHVlXCIsIFt7IGZhemU6IFwiR0lOSVNBTExcIiB9XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEZhemUuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRmF6ZS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0aGF0LnByZXZGYXplKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRmF6ZS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwMjlcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zdHJlKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0cmVkaXNrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmljdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGFycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXJyLnZhbHVlPy5yZWR1Y2UoKHVuaXF1ZTogT3puLkludGVyZmFjZS5HR2luc3RyZUR0b1tdLCBvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVuaXF1ZS5zb21lKG9iaiA9PiBvYmouaXhzX3RyZSA9PT0gby5peHNfdHJlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmlxdWUucHVzaChvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmlxdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFtdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAwOFwiKSAvL1JDIDMzMDAwMDA4IDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoeyBzdG9wcGluZzogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAxMlwiKSAvL1JDIDMzMDAwMDEyIDogU291Ym9yXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZmlsZWZpZWxkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZpbGVcIixcclxuICAgICAgICAgICAgICAgICAgICBtYXhGaWxlQ291bnQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXB0RXh0ZW5zaW9uOiBcIi5wZGZcIixcclxuICAgICAgICAgICAgICAgICAgICBkb3dubG9hZE9uRGlzYWJsZWRGaWVsZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtRGVsZXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVSZW1vdmVkOiAoZXYsIGZpbGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcnYoKS5jYWxsKFwiUmVtb3ZlRmlsZVwiLCB7IGd1aWQ6IGZpbGUuZmlsZUluZm8uZ3VpZCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UuZ3VpZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmaWxlVXBsb2FkZWQ6IChldiwgZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGUgPSBmaWxlLmZpbGVJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UuZ3VpZCA9IGZpbGUuZmlsZUluZm8uZ3VpZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMwMDAwMTNcIikgLy9SQyAzMzAwMDAxMyA6IFRleHQgenByw6F2eVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0ZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoeyBzdG9wcGluZzogdHJ1ZSB9KV0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm93czogOFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMzAwMDAzMlwiKSAvL1JDIDMzMDAwMDMyIDogTmFzdGF2ZW7DrSB6cHLDoXZ5XHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAxMVwiKSAvL1JDIDMzMDAwMDExIDogw5pyb3ZlxYggesOhdmHFvm5vc3RpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1cm92ZW5fbXNnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogbGV2ZWxzWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7Y2FwdGlvbn1cIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBsZXZlbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7IHN0b3BwaW5nOiB0cnVlIH0pXSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkdG8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkdG8udXJvdmVuX21zZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbGV2ZWxzLmZpbmQoaXRlbSA9PiBpdGVtLnZhbHVlID09IGR0by51cm92ZW5fbXNnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8udXJvdmVuX21zZyA9ICQodGhpcykuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDA3XCIpIC8vUkMgMzMwMDAwMDcgOiBQbGF0bm9zdCBvZCAtIGRvXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXR1bV9vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlVHlwZTogXCJkYXRldGltZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHsgc3RvcHBpbmc6IHRydWUgfSksIHRoaXMuY3JlYXRlU3BlY2lhbFZhbGlkYXRvcigpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdHVtX2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlVHlwZTogXCJkYXRldGltZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoeyBzdG9wcGluZzogdHJ1ZSB9KV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAwOVwiKSAvL1JDIDMzMDAwMDA5IDogQ8OtbG92w6Egc2t1cGluYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfbXNnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7Y2FwdGlvbn1cIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBtZXNzYWdlVHlwZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7IHN0b3BwaW5nOiB0cnVlIH0pXSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHRvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHRvLnR5cF9tc2cpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldFZhbHVlXCIsIG1lc3NhZ2VUeXBlcy5maW5kKGl0ZW0gPT4gaXRlbS52YWx1ZSA9PSBwYXJzZUludChkdG8udHlwX21zZykpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by50eXBfbXNnID0gJCh0aGlzKS5nZmllbGQoXCJnZXRWYWx1ZVwiKS52YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhcmNoaXZcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMzMDAwMDEwXCIsIC8vUkMgMzMwMDAwMTAgOiBBcmNow612XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHRvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkdG8uYXJjaGl2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldFZhbHVlXCIsIChkdG8uYXJjaGl2ID09IDApID8gZmFsc2UgOiB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5hcmNoaXYgPSAoJCh0aGlzKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSA9PSB0cnVlKSA/IDEgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDAzMVwiKSAvL1JDIDMzMDAwMDMxIDogUHJpb3JpdGFcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpb3JpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhWYWx1ZTogOVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVNwZWNpYWxWYWxpZGF0b3IoKTogR29yZGljLlZhbGlkYXRvcnMuVmFsaWRhdG9yPEdvcmRpYy5WYWxpZGF0b3JzLlZhbGlkYXRvck9wdGlvbnM+IHtcclxuICAgICAgICAgICAgdmFyIHZhbCA9IG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHsgbWVzc2FnZTogXCJqcmVzOjMzMDAwMDMwXCIgfSk7IC8vUkMgMzMwMDAwMzAgOiBEYXR1bSB2IHBvbMOtxI1rdSBkbyBtdXPDrSBuw6FzbGVkb3ZhdCBwbyBkYXR1IHYgcG9sw63EjWt1IG9kLlxyXG4gICAgICAgICAgICB2YWwudmFsaWRhdGUgPSAodmFsdWUsIHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZyb20gPSB0aGlzLmZpbmRGb3JtcyhcIm1lc3NhZ2VEZXRhaWxBZG1Gb3JtXCIpLmZpbmRGaWVsZHMoXCJkYXR1bV9vZFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIHZhciB0byA9IHRoaXMuZmluZEZvcm1zKFwibWVzc2FnZURldGFpbEFkbUZvcm1cIikuZmluZEZpZWxkcyhcImRhdHVtX2RvXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZyb20gPT0gbnVsbCB8fCB0byA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZnJvbSA+IHRvKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YWwuc3RvcHBpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsOyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZ1bmtjZSBwcm8gb2JzbHVodSBwxZllxI10ZW7DvWNoIHZ6a2F6xa9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVJlYWRlZFRhYih0YWI6IEpRdWVyeTxIVE1MRWxlbWVudD4pOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHtcclxuICAgICAgICAgICAgdGhpcy5ncmlkUmVhZGVkID0gR29yZGljLk96bi5XZWJDbGllbnQuQmFzZS5DcmVhdGVHcmlkUmVhZGVkKCkuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KS5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdyaWRSZWFkZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldERhdGFUb0dyaWRSZWFkZWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgR29yZGljLklzbC5NZXNzYWdlc1JlYWRlZC5saXN0KHsgZmlsdGVyczogeyBpZF9hdno6IHRoaXMubWVzc2FnZS5pZF9hdnogfSB9KS5nZXREYXRhKCkuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rcGlzLmNvbmZpcm1hdGlvbkNvdW50LnZhbHVlID0gZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtwaXMuY29uZmlybWF0aW9uQ291bnQuc2Vjb25kYXJ5VGV4dCA9IFwiQWt0dWFsaXphY2U6IHswfVwiLmZvcm1hdChHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUobmV3IERhdGUoKSwgXCJkYXRldGltZVwiKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtwaXMuY29uZmlybWF0aW9uQ291bnQudXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRSZWFkZWQuZ2dyaWQoXCJzZXREYXRhXCIsIGRhdGEpO1xyXG4gICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlbW92ZU1lc3NhZ2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgR29yZGljLklzbC5NZXNzYWdlcy56bmVha3Rpdm5pdEhyb21hZG5lKHsgZGF0YTogW3RoaXMubWVzc2FnZV0gfSkuZ2V0KCkuZG9uZSgobykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9bMF0ucmVzdWx0ID09IEludGVyZmFjZS5HUmVzdWx0SHJvbWFkbmVPcGVyYWNlRW51bS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uKFwiYWRkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jb21tZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBcImVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAob1swXS5wb3BpcykgPyBvWzBdLnBvcGlzIDogXCJqcmVzOjMzMDAwMDA2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IChvWzBdLnJlc3VsdF90eHQpID8gb1swXS5yZXN1bHRfdHh0IDogXCJqcmVzOjMzMDAwMDcxXCIgLy9SQyAzMzAwMDA3MSA6IFpuZXBsYXRuxJtuw60gbmVwcm9ixJtobG8gw7pzcMSbxaFuxJsuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24oXCJzaG93VG9hc3RcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWNvbW1lbnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogKG9bMF0ucG9waXMpID8gb1swXS5wb3BpcyA6IFwianJlczozMzAwMDAwNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAob1swXS5yZXN1bHRfdHh0KSA/IG9bMF0ucmVzdWx0X3R4dCA6IFwianJlczozMzAwMDA3MFwiIC8vUkMgMzMwMDAwNzAgOiBabmVwbGF0bsSbbsOtIHByb2LEm2hsbyDDunNwxJvFoW7Emy5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVzdFVwZGF0ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVDbnQoKTtcclxuICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKSB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBlbmRWYWxpZGl0eSgpIHtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLk1lc3NhZ2VzLnVrb25jaXRQbGF0bm9zdEhyb21hZG5lKHsgZGF0YTogW3RoaXMubWVzc2FnZV0gfSkuZ2V0KCkuZG9uZSgobykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9bMF0ucmVzdWx0ID09IEludGVyZmFjZS5HUmVzdWx0SHJvbWFkbmVPcGVyYWNlRW51bS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uKFwiYWRkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jb21tZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBcImVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzMwMDAwMjJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9waXM6IChvWzBdLnBvcGlzKSA/IG9bMF0ucG9waXMgOiBcImpyZXM6MzMwMDAwMDZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogKG9bMF0ucmVzdWx0X3R4dCkgPyBvWzBdLnJlc3VsdF90eHQgOiBcImpyZXM6MzMwMDAwNzhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG9ydFRlbXBsYXRlOiBcIjxzcGFuPntyZXN1bHR9PC9zcGFuPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsVGVtcGF0ZTogXCI8c3Bhbj48Yj5qcmVzOjMzMDAwMDA4OjwvYj4mbmJzcDt7cG9waXN9PGJyIC8+PHNwYW4+e3Jlc3VsdH08L3NwYW4+PC9zcGFuPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uKFwic2hvd1RvYXN0XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jb21tZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IChvWzBdLnBvcGlzKSA/IG9bMF0ucG9waXMgOiBcImpyZXM6MzMwMDAwMDZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogKG9bMF0ucmVzdWx0X3R4dCkgPyBvWzBdLnJlc3VsdF90eHQgOiBcImpyZXM6MzMwMDAwNzlcIiAvL1JDIDMzMDAwMDc5IDogUGxhdG5vc3Qgb3puw6FtZW7DrSBzZSBuZXpkYcWZaWxvIHVrb27EjWl0LlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0VXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlQ250KCk7XHJcbiAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCkgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYXJjaGl2TWVzc2FnZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLk1lc3NhZ2VzLmFyY2hpdm92YXRIcm9tYWRuZSh7IGRhdGE6IFt0aGlzLm1lc3NhZ2VdIH0pLmdldCgpLmRvbmUoKG8pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChvWzBdLnJlc3VsdCA9PSBJbnRlcmZhY2UuR1Jlc3VsdEhyb21hZG5lT3BlcmFjZUVudW0uRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbihcImFkZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtY29tbWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogXCJlcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RpdGxlOiBcImpyZXM6MzMwMDAwMjJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IChvWzBdLnBvcGlzKSA/IG9bMF0ucG9waXMgOiBcImpyZXM6MzMwMDAwMDZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogKG9bMF0ucmVzdWx0X3R4dCkgPyBvWzBdLnJlc3VsdF90eHQgOiBcImpyZXM6MzMwMDAwOTJcIiAvL1JDIDMzMDAwMDkyIDogQXJjaGl2YWNlIHByb2LEm2hsYSDDunNwxJvFoW7Emy5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbihcInNob3dUb2FzdFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtY29tbWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAob1swXS5wb3BpcykgPyBvWzBdLnBvcGlzIDogXCJqcmVzOjMzMDAwMDA2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IChvWzBdLnJlc3VsdF90eHQpID8gb1swXS5yZXN1bHRfdHh0IDogXCJqcmVzOjMzMDAwMDkzXCIgLy9SQyAzMzAwMDA5MyA6IFpwcsOhdnUgc2UgbmVwb2RhxZlpbG8gYXJjaGl2b3ZhdC5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVzdFVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZUNudCgpO1xyXG4gICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNvcHlGcm9tVGhpcygpIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zaW5nKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5uYXZpZ2F0ZShbXCJHb3JkaWMuT3puLldlYkNsaWVudC5HTWVzc2FnZURldGFpbEFkbVwiLCB7IGdyaWRSQzogdGhpcy5ncmlkUkMsIGN1cnJlbnRGaWx0ZXI6IHRoaXMuY3VycmVudEZpbHRlciB9XSwgeyBpZF9hdno6IHRoaXMubWVzc2FnZS5pZF9hdnosIGNvcHlGcm9tRXhpc3Q6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0ZUNudChpZF9hdnogPSB0aGlzLm1lc3NhZ2UuaWRfYXZ6KSB7XHJcbiAgICAgICAgICAgIHZhciBuYXZpZ2F0ZTogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgbmF2aWdhdGUucHVzaChcIkdvcmRpYy5Pem4uV2ViQ2xpZW50LkdNZXNzYWdlRGV0YWlsQWRtXCIpXHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgJC5jb250ZW50KCkubmF2aWdhdGUoW1wiR29yZGljLk96bi5XZWJDbGllbnQuR01lc3NhZ2VEZXRhaWxBZG1cIiwgeyBncmlkUkM6IHRoaXMuZ3JpZFJDLCBjdXJyZW50RmlsdGVyOiB0aGlzLmN1cnJlbnRGaWx0ZXIsIElkOiBcIkdNZXNzYWdlc0RldGFpbEFkbVwiLCB0YXNrSWQ6IFwiYWN0R01lc3NhZ2VzRGV0YWlsQWRtXCIgfV0sIHsgaWRfYXZ6OiB0aGlzLm1lc3NhZ2UuaWRfYXZ6IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuT3puLldlYkNsaWVudCB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdNZXNzYWdlTGlzdCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyUGFuZWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50RmlsdGVyOiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBwb3ZvbEVkaXROZXc6IGJvb2xlYW47XHJcbiAgICAgICAgcHJpdmF0ZSBmYXplOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1lbnViYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0Q250KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlsdGVycGFuZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXRDbnQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudWlkID0gXCJ1c2VyTWVzc2FnZXNMaXN0XCI7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoeyBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMjFcIiB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0TmV3TWVzc2FnZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAzNlwiLCAvL1JDIDMzMDAwMDM2IDogTm92w71cclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLnBvdm9sRWRpdE5ldyxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTmV3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE9wZW5EZXRhaWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMzdcIiwgLy9SQyAzMzAwMDAzNyA6IE90ZXbFmcOtdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5EZXRhaWwoY3R4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UmVmcmVzaDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAzOFwiLCAvL1JDIDMzMDAwMDM4IDogT2LEjWVyc3R2aXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXJlZnJlc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RSZW1vdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNjZcIiwgLy9SQyAzMzAwMDA2NiA6IFpuZXBsYXRuaXQgb3puw6FtZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5wb3ZvbEVkaXROZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZU1lc3NhZ2VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdEVuZE1lc3NhZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNzVcIiwgLy9SQyAzMzAwMDA3NSA6IFVrb27EjWl0IHBsYXRub3N0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jbG9jay1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5wb3ZvbEVkaXROZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFZhbGlkaXR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdEFyY2hpdjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA5NVwiLCAvL1JDIDMzMDAwMDk1IDogQXJjaGl2b3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtYXJjaGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMucG92b2xFZGl0TmV3LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcmNoaXZlTWVzc2FnZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0Q29weU1lc3NhZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwODFcIiwgLy9SQyAzMzAwMDA4MSA6IEtvcMOtcm92YXQgeiB2eWJyYW7DqVxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktY29weVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMucG92b2xFZGl0TmV3LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3B5VG9OZXcoY3R4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnViYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXHJcbiAgICAgICAgICAgICAgICBcImFjdE9wZW5EZXRhaWwqXCIsIFwiYWN0UmVmcmVzaCpcIiwgXCJhY3ROZXdNZXNzYWdlKlwiLCBcImFjdFJlbW92ZSpcIiwgXCJhY3RFbmRNZXNzYWdlKlwiLCBcImFjdENvcHlNZXNzYWdlKlwiLCBcImFjdEFyY2hpdipcIixcclxuICAgICAgICAgICAgXSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9wZW5EZXRhaWwoY3R4KSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhOiBHb3JkaWMuT3puLkludGVyZmFjZS5HTWVzc2FnZUR0bztcclxuICAgICAgICAgICAgaWYgKGN0eC5jZWxsSW5mbyAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gY3R4LmNlbGxJbmZvLmRhdGE7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRoaXMuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSAocm93ID09IG51bGwpID8gdW5kZWZpbmVkIDogcm93O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwgJiYgZGF0YSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBncmlkUmMgPSBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoaXMuZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5uYXZpZ2F0ZShbXCJHb3JkaWMuT3puLldlYkNsaWVudC5HTWVzc2FnZURldGFpbEFkbVwiLCB7IGdyaWRSQzogZ3JpZFJjLCBjdXJyZW50RmlsdGVyOiB0aGlzLmN1cnJlbnRGaWx0ZXIgfV0sIHsgaWRfYXZ6OiBkYXRhLmlkX2F2eiwgSWQ6IFwiR01lc3NhZ2VzRGV0YWlsQWRtXCIsIHRhc2tJZDogXCJhY3RHTWVzc2FnZXNEZXRhaWxBZG1cIiB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVOZXcoKSB7XHJcbiAgICAgICAgICAgIHZhciBncmlkUmMgPSBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoaXMuZ3JpZCk7XHJcbiAgICAgICAgICAgICQuY29udGVudCgpLm5hdmlnYXRlKFtcIkdvcmRpYy5Pem4uV2ViQ2xpZW50LkdNZXNzYWdlRGV0YWlsQWRtXCIsIHsgZ3JpZFJDOiBncmlkUmMsIGN1cnJlbnRGaWx0ZXI6IHRoaXMuY3VycmVudEZpbHRlciwgSWQ6IFwiR01lc3NhZ2VzRGV0YWlsQWRtXCIsIHRhc2tJZDogXCJhY3RHTWVzc2FnZXNEZXRhaWxBZG1cIiwgZmF6ZTogdGhpcy5mYXplIH1dLCB7IGlkX2F2ejogLTEgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldERhdGFUb0dyaWQobG9hZE5ldzogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgR29yZGljLklzbC5NZXNzYWdlcy5saXN0QWxsKHRoaXMuY3VycmVudEZpbHRlcikuZ2V0VmlldygpLmRvbmUoKG91dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFJlYWRlZD8uZW5hYmxlZChvdXQuZ2V0Q291bnQoXCJkYXRhXCIpICE9IDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCBvdXQpO1xyXG4gICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdncmlkKHtcclxuICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHggIT0gbnVsbCAmJiBjdHguY2VsbEluZm8gIT0gbnVsbCAmJiBjdHguY2VsbEluZm8uZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RPcGVuRGV0YWlsPy51cGRhdGUoeyBlbmFibGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0UmVtb3ZlPy51cGRhdGUoeyBlbmFibGVkOiB0aGlzLnBvdm9sRWRpdE5ldyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdEVuZE1lc3NhZ2U/LnVwZGF0ZSh7IGVuYWJsZWQ6IHRoaXMucG92b2xFZGl0TmV3IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Q29weU1lc3NhZ2U/LnVwZGF0ZSh7IGVuYWJsZWQ6IHRoaXMucG92b2xFZGl0TmV3IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RPcGVuRGV0YWlsPy51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFJlbW92ZT8udXBkYXRlKHsgZW5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RFbmRNZXNzYWdlPy51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdENvcHlNZXNzYWdlPy51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcIiFkYXR1bV9vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRCZy5saWdodGJsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkRBVEVESUZGKEBkYXR1bV9vZCwgTk9XKCkpID4gMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRCZy5saWdodGdyZWVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiREFURURJRkYoQGRhdHVtX29kLCBOT1coKSkgPCAwIGFuZCBEQVRFRElGRihAZGF0dW1fZG8sIE5PVygpKSA+IDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlQ29sdW1ucygpLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIixcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RPcGVuRGV0YWlsXHJcbiAgICAgICAgICAgIH0pLmdhdXRvZml0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbHVtbnMoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA2MVwiLCAvL1JDIDMzMDAwMDYxIDogU3RhdlxyXG4gICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogKHJvdykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93LmRhdHVtX29kICYmIHJvdy5kYXR1bV9kbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGVUaW1lRnJvbSA9IG5ldyBEYXRlKHJvdy5kYXR1bV9vZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZVRpbWVUbyA9IG5ldyBEYXRlKHJvdy5kYXR1bV9kbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEdvcmRpYy5VdGlscy5EYXRlVGltZS5jb21wYXJlKGRhdGVUaW1lRnJvbSwgY3VycmVudERhdGUpID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLWNsb2NrLW8gZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiLCB0ZXh0OiBcImpyZXM6MzMwMDAwNDZcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChHb3JkaWMuVXRpbHMuRGF0ZVRpbWUuY29tcGFyZShkYXRlVGltZVRvLCBjdXJyZW50RGF0ZSkgPCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsIHRleHQ6IFwianJlczozMzAwMDA0NVwiIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImdpLWJlbGwgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiLCB0ZXh0OiBcImpyZXM6MzMwMDAwNDlcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFyY2hpdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAxMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogKHJvdykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93LmFyY2hpdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5hcmNoaXYgPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1zdWNjZXNzXCIsIHRleHQ6IFwianJlczozMzAwMDA2MlwiIH0gLy9SQyAzMzAwMDA2MiA6IEFub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1cm92ZW5fbXNnX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAxMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXJvdmVuX21zZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAxMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXR1bV9vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA0MlwiLCAvL1JDIDMzMDAwMDQyIDogRGF0dW0gcGxhdG5vc3RpIG9kXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0dW1fZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwNDNcIiwgLy9SQyAzMzAwMDA0MyA6IERhdHVtIHBsYXRub3N0aSBkb1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMDhcIiwgLy9SQyAzMzAwMDA0NCA6IFpwcsOhdmFcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRGVmYXVsdERhdGEoKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWZhdWx0RmlsdGVyID0ge1xyXG4gICAgICAgICAgICAgICAgYWt0aXZpdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGFrdGl2aWF0X3R4dDogXCJqcmVzOjMzMDAwMDk4XCIgLy9SQyAzMzAwMDA5OCA6IEFrdGl2bsOtXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YV9zZWxlY3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMzMDAwMDQ4XCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYXJjaGl2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMzAwMDA4OFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZmF6ZSlcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRGaWx0ZXJbXCJmYXplXCJdID0gdGhpcy5mYXplO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdEZpbHRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVycGFuZWwoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyUGFuZWwgPSAkKFwiPGRpdj5cIikuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgIGZvcm1zOiBbdGhpcy5jcmVhdGVGaWx0ZXJGb3JtKCldLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLk5vcm1hbCxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlczogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgIGhhcmREZWZhdWx0RmlsdGVyOiB0aGlzLmNyZWF0ZURlZmF1bHREYXRhKCksXHJcbiAgICAgICAgICAgICAgICBhcHBseTogKGV2LCBkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyRGF0YWZyb21QYW5lbCA9IGRhdGEuZmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhemUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5mYXplID0gdGhpcy5mYXplO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJEYXRhZnJvbVBhbmVsLmFrdGl2aXRhICE9IHVuZGVmaW5lZCAmJiBmaWx0ZXJEYXRhZnJvbVBhbmVsLmFrdGl2aXRhICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5ha3Rpdml0YSA9IGZpbHRlckRhdGFmcm9tUGFuZWwuYWt0aXZpdGEuYWt0aXZpdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlckRhdGFmcm9tUGFuZWwudXJvdmVuX21zZyAhPSB1bmRlZmluZWQgJiYgZmlsdGVyRGF0YWZyb21QYW5lbC51cm92ZW5fbXNnICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci51cm92ZW5fbXNnID0gZmlsdGVyRGF0YWZyb21QYW5lbC51cm92ZW5fbXNnLnVyb3Zlbl9tc2c7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlckRhdGFmcm9tUGFuZWwucG9waXMgIT0gdW5kZWZpbmVkICYmIGZpbHRlckRhdGFmcm9tUGFuZWwucG9waXMgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnBvcGlzID0gXCIlezB9JVwiLmZvcm1hdChmaWx0ZXJEYXRhZnJvbVBhbmVsLnBvcGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJEYXRhZnJvbVBhbmVsLmFyY2hpdiAhPSB1bmRlZmluZWQgJiYgZmlsdGVyRGF0YWZyb21QYW5lbC5hcmNoaXYgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmFyY2hpdiA9IGZpbHRlckRhdGFmcm9tUGFuZWwuYXJjaGl2LnZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZyYWdtZW50ID0gXCJhbGxcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyRGF0YWZyb21QYW5lbFtcImRhdGFfc2VsZWN0XCJdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudCA9IGZpbHRlckRhdGFmcm9tUGFuZWxbXCJkYXRhX3NlbGVjdFwiXVtcInZhbHVlXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RmlsdGVyID0geyBmcmFnbWVudHM6IFtmcmFnbWVudF0sIGZpbHRlcnM6IGZpbHRlciB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gW1xyXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogXCJqcmVzOjMzMDAwMDQ4XCIsIHZhbHVlOiBcImFsbFwiIH0sIC8vUkMgMzMwMDAwNDggOiBWxaFlY2hueVxyXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogXCJqcmVzOjMzMDAwMDQ3XCIsIHZhbHVlOiBcImN1cnJlbnRfdmFsaWRcIiB9LCAvL1JDIDMzMDAwMDQ3IDogUGxhdG7DqVxyXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogXCJqcmVzOjMzMDAwMDQ2XCIsIHZhbHVlOiBcImJlZm9yZV92YWxpZFwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiBcImpyZXM6MzMwMDAwNDVcIiwgdmFsdWU6IFwiYWZ0ZXJfdmFsaWRcIiB9XHJcbiAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgIHZhciBhcmNoaXZEYXRhID0gW1xyXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogXCJqcmVzOjMzMDAwMDg3XCIsIHZhbHVlOiAxIH0sIC8vUkMgMzMwMDAwODcgOiBKZW4gYXJjaGl2b3ZhbsOpXHJcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiBcImpyZXM6MzMwMDAwODhcIiwgdmFsdWU6IDB9LCAvL1JDIDMzMDAwMDg4IDogTmVhcmNoaXZvdmFuw6lcclxuICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oKSAvL1JDIDMzMDAwMDUwIDogSGxlZGF0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZhemUpIHsgXHJcbiAgICAgICAgICAgICAgICBmb3JtLmFkZFJvdyhcImpyZXM6MzMwMDAwMjZcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jZmF6KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZhemVcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5mYXplPXZhbHVlLmZhemVcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5mYXplID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcm0uYWRkUm93KFwianJlczozMzAwMDA1MFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRhX3NlbGVjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7bGFiZWx9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBkYXRhWzBdLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDExXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY3VtcygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1cm92ZW5fbXNnXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDA1OFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMDAwMDg2XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY2FrdCgpLCB7IC8vUkMgMzMwMDAwODYgOiBBa3Rpdml0YVxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZToge2FrdGl2aXRhOiAxMDB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzAwMDA4OVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyAvL1JDIDMzMDAwMDg5IDogQXJjaGl2XHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogYXJjaGl2RGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGFyY2hpdkRhdGFbMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntsYWJlbH1cIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFyY2hpdlwiXHJcbiAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlbW92ZU1lc3NhZ2VzKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWREYXRhOiBHb3JkaWMuT3puLkludGVyZmFjZS5HTWVzc2FnZUR0b1tdID0gdGhpcy5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWREYXRhLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLndhcm5pbmcoXCJqcmVzOjMzMDAwMDY3XCIsIFwianJlczozMzAwMDA2OFwiKSAvL1JDIDMzMDAwMDY4IDogTmVuw60gdnlicsOhbiDFvsOhZG7DvSB6w6F6bmFtLiBBa8SHaSBuZWx6ZSBwcm92w6lzdC5cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2VsZWN0ZWREYXRhLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuY29uZmlybShcImpyZXM6MzMwMDAwNjdcIiwgXCJqcmVzOjMzMDAwMDY5PGJyIC8+PGI+ezB9PC9iPlwiLmZvcm1hdCgoc2VsZWN0ZWREYXRhWzBdLnBvcGlzKSA/IHNlbGVjdGVkRGF0YVswXS5wb3BpcyA6IFwiXCIpKS5vbihcInllc1wiLCAoKSA9PiB7IC8vUkMgMzMwMDAwNjkgOiBPcHJhdmR1IHNpIHDFmWVqZXRlIHpuZXBsYXRuaXQgdGVudG8gesOhem5hbT9cclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuSXNsLk1lc3NhZ2VzLnpuZWFrdGl2bml0SHJvbWFkbmUoeyBkYXRhOiBzZWxlY3RlZERhdGEgfSkuZ2V0KCkuZG9uZSgobykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob1swXS5yZXN1bHQgPT0gSW50ZXJmYWNlLkdSZXN1bHRIcm9tYWRuZU9wZXJhY2VFbnVtLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbihcImFkZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jb21tZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogKG9bMF0ucG9waXMpID8gb1swXS5wb3BpcyA6IFwianJlczozMzAwMDAwNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IChvWzBdLnJlc3VsdF90eHQpID8gb1swXS5yZXN1bHRfdHh0IDogXCJqcmVzOjMzMDAwMDcxXCIgLy9SQyAzMzAwMDA3MSA6IFpuZXBsYXRuxJtuw60gbmVwcm9ixJtobG8gw7pzcMSbxaFuxJsuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24oXCJzaG93VG9hc3RcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtY29tbWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogKG9bMF0ucG9waXMpID8gb1swXS5wb3BpcyA6IFwianJlczozMzAwMDAwNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IChvWzBdLnJlc3VsdF90eHQpID8gb1swXS5yZXN1bHRfdHh0IDogXCJqcmVzOjMzMDAwMDcwXCIgLy9SQyAzMzAwMDA3MCA6IFpuZXBsYXRuxJtuw60gcHJvYsSbaGxvIMO6c3DEm8WhbsSbLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwianJlczozMzAwMDA2N1wiLCBcImpyZXM6MzMwMDAwNzJcIi5mb3JtYXQoc2VsZWN0ZWREYXRhLmxlbmd0aCkpLm9uKFwieWVzXCIsICgpID0+IHsgLy9SQyAzMzAwMDA3MiA6IE9wcmF2ZHUgc2kgcMWZZWpldGUgdnlicmFuw6kgesOhem5hbXkgKHswfSkgem5lYWt0aXZpbml0P1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuTWVzc2FnZXMuem5lYWt0aXZuaXRIcm9tYWRuZSh7IGRhdGE6IHNlbGVjdGVkRGF0YSB9KS5nZXQoKS5kb25lKChvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coW1wiR29yZGljLk96bi5XZWJDbGllbnQuR01lc3NhZ2VSZXN1bHRIcm9tYWRuYU9wZXJhY2VcIiwgeyBkYXRhOiBvIH1dLCBudWxsLCB7IHdpZHRoOiAxMDAwLCBoZWlnaHQ6IDUwMCwgdGl0bGU6IFwianJlczozMzAwMDA2N1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZW5kVmFsaWRpdHkoKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZERhdGE6IEdvcmRpYy5Pem4uSW50ZXJmYWNlLkdNZXNzYWdlRHRvW10gPSB0aGlzLmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZERhdGEubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3Mud2FybmluZyhcImpyZXM6MzMwMDAwNzZcIiwgXCJqcmVzOjMzMDAwMDY4XCIpIC8vUkMgMzMwMDAwNzYgOiBVa29uxI1lbsOtIHBsYXRub3N0aVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzZWxlY3RlZERhdGEubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwianJlczozMzAwMDA3NlwiLCBcImpyZXM6MzMwMDAwNzc8YnIgLz48Yj57MH08L2I+XCIuZm9ybWF0KChzZWxlY3RlZERhdGFbMF0ucG9waXMpID8gc2VsZWN0ZWREYXRhWzBdLnBvcGlzIDogXCJcIikpLm9uKFwieWVzXCIsICgpID0+IHsgLy9SQyAzMzAwMDA3NyA6IE9wcmF2ZHUgc2kgcMWZZWpldGUgdWtvbsSNaXQgcGxhdG5vc3QgdG9ob3RvIHrDoXpuYW11P1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuTWVzc2FnZXMudWtvbmNpdFBsYXRub3N0SHJvbWFkbmUoeyBkYXRhOiBzZWxlY3RlZERhdGEgfSkuZ2V0KCkuZG9uZSgobykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob1swXS5yZXN1bHQgPT0gSW50ZXJmYWNlLkdSZXN1bHRIcm9tYWRuZU9wZXJhY2VFbnVtLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbihcImFkZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jb21tZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogKG9bMF0ucG9waXMpID8gb1swXS5wb3BpcyA6IFwianJlczozMzAwMDAwNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IChvWzBdLnJlc3VsdF90eHQpID8gb1swXS5yZXN1bHRfdHh0IDogXCJqcmVzOjMzMDAwMDc4XCIgLy9SQyAzMzAwMDA3OCA6IFBsYXRub3N0IG96bsOhbWVuw60gYnlsYSB1a29uxI1lbmEuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24oXCJzaG93VG9hc3RcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtY29tbWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogKG9bMF0ucG9waXMpID8gb1swXS5wb3BpcyA6IFwianJlczozMzAwMDAwNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IChvWzBdLnJlc3VsdF90eHQpID8gb1swXS5yZXN1bHRfdHh0IDogXCJqcmVzOjMzMDAwMDc5XCIgLy9SQyAzMzAwMDA3OSA6IFBsYXRub3N0IG96bsOhbWVuw60gc2UgbmV6ZGHFmWlsbyB1a29uxI1pdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuY29uZmlybShcImpyZXM6MzMwMDAwNzZcIiwgXCJqcmVzOjMzMDAwMDgwXCIuZm9ybWF0KHNlbGVjdGVkRGF0YS5sZW5ndGgpKS5vbihcInllc1wiLCAoKSA9PiB7IC8vUkMgMzMwMDAwODAgOiBPcHJhdmR1IHNpIHDFmWVqZXRlIHZ5YnJhbsO9bSB6w6F6bmFtxa9tICh7MH0pIHVrb27EjWl0IHBsYXRub3N0P1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuTWVzc2FnZXMudWtvbmNpdFBsYXRub3N0SHJvbWFkbmUoeyBkYXRhOiBzZWxlY3RlZERhdGEgfSkuZ2V0KCkuZG9uZSgobykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFtcIkdvcmRpYy5Pem4uV2ViQ2xpZW50LkdNZXNzYWdlUmVzdWx0SHJvbWFkbmFPcGVyYWNlXCIsIHsgZGF0YTogbyB9XSwgbnVsbCwgeyB3aWR0aDogMTAwMCwgaGVpZ2h0OiA1MDAsIHRpdGxlOiBcImpyZXM6MzMwMDAwNzZcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGFyY2hpdmVNZXNzYWdlcygpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkRGF0YTogR29yZGljLk96bi5JbnRlcmZhY2UuR01lc3NhZ2VEdG9bXSA9IHRoaXMuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkRGF0YS5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy53YXJuaW5nKFwianJlczozMzAwMDA5MFwiLCBcImpyZXM6MzMwMDAwNjhcIikgLy9SQyAzMzAwMDA5MCA6IEFyY2hpdmFjZSB6cHLDoXZcclxuICAgICAgICAgICAgZWxzZSBpZiAoc2VsZWN0ZWREYXRhLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuY29uZmlybShcImpyZXM6MzMwMDAwOTBcIiwgXCJqcmVzOjMzMDAwMDkxPGJyIC8+PGI+ezB9PC9iPlwiLmZvcm1hdCgoc2VsZWN0ZWREYXRhWzBdLnBvcGlzKSA/IHNlbGVjdGVkRGF0YVswXS5wb3BpcyA6IFwiXCIpKS5vbihcInllc1wiLCAoKSA9PiB7IC8vUkMgMzMwMDAwOTEgOiBPcHJhdmR1IHNpIHDFmWVqZXRlIGFyY2hpdm92YXQgdG90byBvem7DoW1lbsOtP1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuTWVzc2FnZXMuYXJjaGl2b3ZhdEhyb21hZG5lKHsgZGF0YTogc2VsZWN0ZWREYXRhIH0pLmdldCgpLmRvbmUoKG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9bMF0ucmVzdWx0ID09IEludGVyZmFjZS5HUmVzdWx0SHJvbWFkbmVPcGVyYWNlRW51bS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24oXCJhZGRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtY29tbWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBcImVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IChvWzBdLnBvcGlzKSA/IG9bMF0ucG9waXMgOiBcImpyZXM6MzMwMDAwMDZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAob1swXS5yZXN1bHRfdHh0KSA/IG9bMF0ucmVzdWx0X3R4dCA6IFwianJlczozMzAwMDA5MlwiIC8vUkMgMzMwMDAwOTIgOiBBcmNoaXZhY2UgcHJvYsSbaGxhIMO6c3DEm8WhbsSbLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uKFwic2hvd1RvYXN0XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWNvbW1lbnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IChvWzBdLnBvcGlzKSA/IG9bMF0ucG9waXMgOiBcImpyZXM6MzMwMDAwMDZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAob1swXS5yZXN1bHRfdHh0KSA/IG9bMF0ucmVzdWx0X3R4dCA6IFwianJlczozMzAwMDA5M1wiIC8vUkMgMzMwMDAwOTMgOiBacHLDoXZ1IHNlIG5lcG9kYcWZaWxvIGFyY2hpdm92YXQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmNvbmZpcm0oXCJqcmVzOjMzMDAwMDkwXCIsIFwianJlczozMzAwMDA5NFwiLmZvcm1hdChzZWxlY3RlZERhdGEubGVuZ3RoKSkub24oXCJ5ZXNcIiwgKCkgPT4geyAvL1JDIDMzMDAwMDk0IDogT3ByYXZkdSBzaSBwxZllamV0ZSB2eWJyYW7DqSB6w6F6bmFteSAoezB9KSBhcmNoaXZvdmF0P1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuTWVzc2FnZXMuYXJjaGl2b3ZhdEhyb21hZG5lKHsgZGF0YTogc2VsZWN0ZWREYXRhIH0pLmdldCgpLmRvbmUoKG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhbXCJHb3JkaWMuT3puLldlYkNsaWVudC5HTWVzc2FnZVJlc3VsdEhyb21hZG5hT3BlcmFjZVwiLCB7IGRhdGE6IG8gfV0sIG51bGwsIHsgd2lkdGg6IDEwMDAsIGhlaWdodDogNTAwLCB0aXRsZTogXCJqcmVzOjMzMDAwMDkwXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjb3B5VG9OZXcoY3R4KSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhOiBHb3JkaWMuT3puLkludGVyZmFjZS5HTWVzc2FnZUR0bztcclxuICAgICAgICAgICAgaWYgKGN0eC5jZWxsSW5mbyAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gY3R4LmNlbGxJbmZvLmRhdGE7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRoaXMuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSAocm93ID09IG51bGwpID8gdW5kZWZpbmVkIDogcm93O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwgJiYgZGF0YSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBncmlkUmMgPSBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoaXMuZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5uYXZpZ2F0ZShbXCJHb3JkaWMuT3puLldlYkNsaWVudC5HTWVzc2FnZURldGFpbEFkbVwiLCB7IGdyaWRSQzogZ3JpZFJjLCBjdXJyZW50RmlsdGVyOiB0aGlzLmN1cnJlbnRGaWx0ZXIsIElkOiBcIkdNZXNzYWdlc0RldGFpbEFkbVwiLCB0YXNrSWQ6IFwiYWN0R01lc3NhZ2VzRGV0YWlsQWRtXCIgfV0sIHsgaWRfYXZ6OiBkYXRhLmlkX2F2eiwgY29weUZyb21FeGlzdDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuT3puLldlYkNsaWVudCB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdNZXNzYWdlUmVzdWx0SHJvbWFkbmFPcGVyYWNlIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBwcml2YXRlIGRhdGE6IGFueVtdO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudWlkID0gXCJyZXN1bHRIcm9tYWRuYU9wZXJhY2VNZXNzYWdlXCI7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlRGF0YSgpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ucmVzdWx0X2hlYWRlciA9IChpdGVtLnJlc3VsdCA9PSBHb3JkaWMuT3puLkludGVyZmFjZS5HUmVzdWx0SHJvbWFkbmVPcGVyYWNlRW51bS5PSykgPyBcIk9LXCIgOiBcImpyZXM6MzMwMDAwNzNcIjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgdmFyIGdyaWQgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICB2aWV3LnByb2Nlc3Moe1xyXG4gICAgICAgICAgICAgICAgYWM6IG5ldyBHb3JkaWMuRGF0YS5Hcm91cGluZyhbe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTdGF0ZTogXCJvcGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaGFzaDogKG1ldGEsIHJvd3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke21ldGEuZGF0YVtcInJlc3VsdF9oZWFkZXJcIl19YFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1dKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBncmlkLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJlc3VsdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAocm93LCBtZXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cucmVzdWx0ID09IEdvcmRpYy5Pem4uSW50ZXJmYWNlLkdSZXN1bHRIcm9tYWRuZU9wZXJhY2VFbnVtLk9LKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiLCB0ZXh0OiBcIk9LXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLXRpbWVzLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCB0ZXh0OiBcImpyZXM6MzMwMDAwNzNcIn0gLy9SQyAzMzAwMDA3MyA6IENoeWJhXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDA4XCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmVzdWx0X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDA3NFwiLCAvL1JDIDMzMDAwMDc0IDogVsO9c2xlZGVrXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
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
            let GOdesilac = class GOdesilac extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GOdesilac#";
                    // vstupni hodnoty
                    this.refresh = false;
                    this.filesLoaded = false;
                    this.filesToSendLoaded = false;
                    ///**
                    // * Spusteni vlastniho odeslani Inbox
                    // * 
                    // */
                    //private monitor_zo(): JQueryPromise<any> {
                    //    let that = this;
                    //    return that.validation_Send_Inbox()
                    //        .then((result) => {
                    //            if (!result) throw GError;
                    //            if (that.closed) return;
                    //            let dtoSeneder: Gordic.Uct.Interface.GUcrSenderDto = {};
                    //            that.findForms("formDetail,formHeader").findFields().gfield("model", "collect", dtoSeneder) // verificationNeeded: false
                    //            return that.isl.UcrObalkovac.monitorSeznamZORequest({ rq: { Sender: dtoSeneder } }).
                    //                get()
                    //                .then((result) => {
                    //                    if (that.closed) return;
                    //                    this.call("OdesliMonitorZO", { zprava: result })
                    //                        .then((data) => {
                    //                            var seznam_vysledku: Gordic.Eko.Interface.GCSUISZpravaStavDto[] = [];
                    //                            var def = $.Deferred();
                    //                            data.forEach((r) => {
                    //                            });
                    //                            def.resolve();
                    //                            that.showFlash("jres:30450008", "success", "xx") //RC 30450008 : Žádost o aktualizaci Inboxu odeslána
                    //                            return def.promise();
                    //                        });
                    //                })
                    //        });
                    //}
                }
                prepareContent() {
                    this.init();
                }
                onContentReady() {
                    this.init();
                }
                /*
                 * Inicializace formulare
                 *
                 * */
                init() {
                    this.filesLoaded = false;
                    this.filesToSendLoaded = false;
                    //if (!options) return;
                    let that = this;
                    that.refresh = false;
                    that.createActions();
                    // prikazova lista
                    that.commandBar([
                        { action: that.actions.actObalkovat, primary: true },
                        { action: that.actions.actOdeslat, primary: false },
                        { action: that.actions.actOdeslatInbox, primary: false },
                        { action: that.actions.actOdeslatMonitorZO, primary: false },
                        { action: that.actions.actZavrit, primary: false },
                    ]);
                    this.createForm();
                    // definice menu
                    that.menuBar([]);
                }
                /**
                 * Definice akci
                 * @param that
                 */
                createActions() {
                    let that = this;
                    that.actions.addRange({
                        actZavrit: Gordic.Eko.Action.actionZavrit({ enabled: true, run: function () { that.tryClose(); } }),
                        actObalkovat: {
                            enabled: false, visible: true,
                            caption: "jres:30250656", //RC 30250656 : Zaobálkovat
                            run: function () {
                                this.setPending(that.obalkuj());
                            }
                        },
                        actOdeslat: {
                            enabled: false, visible: true,
                            caption: "jres:30450003", //RC 30450003 : Odeslat na CSUIS
                            run: function () {
                                this.setPending(that.odesli());
                            }
                        },
                        actOdeslatInbox: {
                            enabled: true, visible: true,
                            caption: "jres:30450007", //RC 30450007 : Načíst Inbox
                            run: function () {
                                this.setPending(that.odesli_inbox());
                            }
                        },
                        actDetailZpravy: {
                            enabled: true, visible: true,
                            caption: "Detail zprávy",
                            run: function () {
                                that.detail_zpravy();
                            }
                        },
                        actOdeslatMonitorZO: {
                            enabled: true, visible: true,
                            caption: "Monitor ZO",
                            run: function () {
                                return; // that.monitor_zo();
                            }
                        },
                    });
                }
                /**
                 * Vytvoreni formulare
                 */
                createForm() {
                    let that = this;
                    that.view_data = new Gordic.Data.View([], {});
                    var gridFormatSeznam;
                    gridFormatSeznam = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "ZpravaId",
                        caption: "ID zprávy",
                        width: 130
                    })
                        .addTextColumn({
                        name: "ZpravaNazev",
                        caption: "Název zprávy",
                        width: 230
                    })
                        .addTextColumn({
                        name: "IC",
                        caption: "IC",
                        width: 230
                    })
                        .addTextColumn({
                        name: "StavId",
                        caption: "StavId",
                        width: 130
                    })
                        .addTextColumn({
                        name: "StavTyp",
                        caption: "StavTyp",
                        width: 130
                    })
                        .addTextColumn({
                        name: "StavNazev",
                        caption: "StavNazev",
                        width: 130
                    })
                        .addTextColumn({
                        name: "StavPopis",
                        caption: "StavPopis",
                        width: 130
                    })
                        .addDateTimeColumn({
                        //.addTextColumn({
                        name: "ZpravaDatumVytvoreni",
                        caption: "ZpravaDatumVytvoreni",
                        width: 230
                    })
                        .addDateTimeColumn({
                        //.addTextColumn({
                        name: "ZpravaDatumPublikace",
                        caption: "ZpravaDatumPublikace",
                        width: 230
                    })
                        .addTextColumn({
                        name: "ZpravaStatus",
                        caption: "ZpravaStatus",
                        width: 230
                    })
                        .addTextColumn({
                        name: "TypDatoveZpravy",
                        caption: "TypDatoveZpravy",
                        width: 230
                    });
                    var my_CondFormat;
                    var my_CondFormats;
                    my_CondFormats = [];
                    my_CondFormat = { description: "CHYBA", formula: "EQUALS(@StavTyp, \"CHYBA\")", text: Gordic.Components.Grid.CondFormats.CondFormatText.red };
                    my_CondFormats.push(my_CondFormat);
                    var grid = $.newDiv("class='SeznamZprav'")
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: that.view_data,
                        defaultAction: that.actions.actDetailZpravy,
                        columns: gridFormatSeznam,
                        sort: "ZpravaDatumVytvoreni",
                        selection(ev, ctx) {
                            debugger;
                            that.row = grid.ggrid("activeRow");
                            if (that.row !== null) {
                            }
                        },
                        defaultProfile: { columnList: this.zjisti_sloupce(gridFormatSeznam, false), condFormats: my_CondFormats }
                    });
                    //                });
                    var form = new Gordic.Forms.Form({
                        name: "formDetail", layoutDescriptor: "L1M1S1, L-3-6-3, M-3-6-3, S-3-6-3"
                    })
                        // ZO28844888
                        .addRow({ label: "jres:30250651", required: true }).addField("gstringbox", //RC 30250651 : Registrační číslo ZO
                    Gordic.Eko.Detail.Field.getCounterOptions(15, true, true, {
                        disabled: false, name: "PersonalID",
                        //initialValue: "ZO28844888",
                        initialValue: "2000010877",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        tooltip: "jres:30250652", //RC 30250652 : Registrační číslo ZO v systému CSÚIS
                        validators: [
                            new Gordic.Validators.Required()
                        ],
                        change: function (ev, changeObj) { that.NastaveniAkci(); },
                    }))
                        .addRow("jres:30250650").addField("gstringbox", //RC 30250650 : Telefon
                    { name: "PhoneNumber" })
                        .addSection()
                        .addRow("jres:30250648").addField("gstringbox", //RC 30250648 : Jméno a přijmení
                    {
                        name: "PersonName",
                        tooltip: "jres:30250653" //RC 30250653 : Jméno a příjmení ZO/NZO
                    })
                        .addSection()
                        .addRow("jres:30250649").addField("gstringbox", //RC 30250649 : E-mail
                    { name: "Email" })
                        .addRow("jres:30250654").addField("gfilefield", //RC 30250654 : Výběr souboru
                    {
                        name: "uploadTMPFile",
                        //customClass: "downloadField",
                        acceptExtension: ".xml",
                        itemWidth: "w-L-4 w-S-12 w-M-6", flag: Gordic.Prefabs.Field.Flags.required,
                        mode: "replace",
                        //fieldDownloaderClass: "Gordic.Documents.WebClient.GFtpClient",
                        fileUploaded: function (ev, obj) {
                            that.showFlash("jres:30250655".format(obj.fileInfo.filename), "success", "xx"); //RC 30250655 : Soubor {0} nahrán.
                            that.filesLoaded = true;
                            that.NastaveniAkci();
                        }
                    })
                        .addRow("jres:30450004").addField("gfilefield", //RC 30450004 : Výběr souboru pro odeslání
                    {
                        name: "uploadTMPSendFile",
                        //customClass: "downloadField",
                        acceptExtension: ".xml",
                        itemWidth: "w-L-4 w-S-12 w-M-6", flag: Gordic.Prefabs.Field.Flags.required,
                        mode: "replace",
                        prepareFilesOnServer: true,
                        //fieldDownloaderClass: "Gordic.Documents.WebClient.GFtpClient",
                        fileUploaded: function (ev, obj) {
                            that.showFlash("jres:30450005".format(obj.fileInfo.filename), "success", "xx"); //RC 30450005 : Soubor { 0} pro odeslání nahrán.
                            that.filesToSendLoaded = true;
                            that.NastaveniAkci();
                        }
                    });
                    var tabHead = $.newDiv()
                        .appendTo(this.element);
                    grid.appendTo(this.element);
                    // pro validatory ze serveru
                    this.defaultForm = this.element; //tabHead;
                    form.appendTo(tabHead);
                }
                /**
                 * Spusteni vlastniho obalkovani
                 *
                 */
                obalkuj() {
                    let that = this;
                    return that.validation()
                        .then((result) => {
                        if (!result)
                            throw GError;
                        if (that.closed)
                            return;
                        let dtoSeneder = {};
                        that.findForms("formDetail,formHeader").findFields().gfield("model", "collect", dtoSeneder); // verificationNeeded: false
                        return that.isl.UcrObalkovac.pridejObalku({ rq: { FileInfo: that.infoFile, Sender: dtoSeneder } }).
                            get()
                            .then((result) => {
                            debugger;
                            if (that.closed)
                                return;
                            new GFile().download(result);
                        });
                        //.catch(() => {
                        //})                                                    
                    });
                }
                /**
                 * Validace pred odeslanim
                 *
                 */
                validation() {
                    let that = this;
                    let defClose = $.Deferred();
                    // validace formulare
                    if (!that.findForms().gform("isValid"))
                        return defClose.reject(false).promise();
                    that.findFields("uploadTMPFile").gfilefield("getValueAsync").then(function (data) {
                        console.log(data);
                        debugger;
                        if (typeof data === "undefined" || data.length == 0) {
                            that.dialogs.warning("jres:30250673"); //RC 30250673 : Není vybrán žádný soubor!
                            return defClose.reject(false);
                        }
                        that.infoFile = data[0];
                        return defClose.resolve(true).promise();
                    }).catch(() => {
                        defClose.reject(false).promise();
                    });
                    return defClose;
                }
                validation_Send() {
                    let that = this;
                    let defClose = $.Deferred();
                    // validace formulare
                    if (!that.findForms().gform("isValid"))
                        return defClose.reject(false).promise();
                    that.findFields("uploadTMPSendFile").gfilefield("getValueAsync").then(function (data) {
                        console.log(data);
                        debugger;
                        if (typeof data === "undefined" || data.length == 0) {
                            that.dialogs.warning("jres:30250674"); //RC 30250674 : Není vybrán žádný soubor!
                            return defClose.reject(false);
                        }
                        that.infoFileSend = data[0];
                        return defClose.resolve(true).promise();
                    }).catch(() => {
                        defClose.reject(false).promise();
                    });
                    return defClose;
                }
                validation_Send_Inbox() {
                    let that = this;
                    let defClose = $.Deferred();
                    return defClose.resolve(true).promise();
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                NastaveniAkci() {
                    let personalID = this.findFields("PersonalID").gfield("getValue");
                    this.actions.actObalkovat?.update({ enabled: this.filesLoaded && personalID !== null && typeof personalID != "undefined" && personalID.trim() != "" });
                    this.actions.actOdeslat?.update({ enabled: this.filesToSendLoaded && personalID !== null && typeof personalID != "undefined" && personalID.trim() != "" });
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    var that = this;
                    var def = $.Deferred();
                    return def.resolve({ refresh: typeof that.refresh !== "undefined" && that.refresh === true }).promise();
                }
                /**
                 * Spusteni vlastniho odeslani
                 *
                 */
                odesli() {
                    let that = this;
                    return that.validation_Send()
                        .then((result) => {
                        if (!result)
                            throw GError;
                        if (that.closed)
                            return;
                        this.call("OdesliVykaz", { soubor: that.infoFileSend })
                            .then((data) => {
                            that.showFlash("jres:30450006".format(that.infoFileSend.filename), "success", "xx"); //RC 30450006 : Soubor {0} odeslán na CSUIS.
                        });
                    });
                }
                /**
                 * Spusteni vlastniho odeslani Inbox
                 *
                 */
                odesli_inbox() {
                    let that = this;
                    return that.validation_Send_Inbox()
                        .then((result) => {
                        if (!result)
                            throw GError;
                        if (that.closed)
                            return;
                        let dtoSeneder = {};
                        that.findForms("formDetail,formHeader").findFields().gfield("model", "collect", dtoSeneder); // verificationNeeded: false
                        return that.isl.UcrObalkovac.inboxSeznamZpravRequest({ rq: { Sender: dtoSeneder } }).
                            get()
                            .then((result) => {
                            if (that.closed)
                                return;
                            this.call("OdesliInbox", { zprava: result })
                                .then((data) => {
                                var seznam_zprav = [];
                                var seznam_vysledku = [];
                                var def = $.Deferred();
                                data.forEach((r) => {
                                    seznam_zprav.push(r);
                                    var detail_vysledku = {};
                                    detail_vysledku.ZpravaId = r.ZpravaId;
                                    detail_vysledku.IC = r.IC;
                                    detail_vysledku.ZpravaDatumVytvoreni = r.ZpravaDatumVytvoreni;
                                    detail_vysledku.ZpravaDatumPublikace = r.ZpravaDatumPublikace;
                                    detail_vysledku.ZpravaStatus = r.ZpravaStatus;
                                    detail_vysledku.TypDatoveZpravy = r.TypDatoveZpravy;
                                    detail_vysledku.ZpravaNazev = r.ZpravaNazev;
                                    return that.isl.UcrObalkovac.inboxDetailZpravyRequest({ rq: { Sender: dtoSeneder, Idzpravy: r.ZpravaId } }).
                                        get()
                                        .then((result_detail) => {
                                        this.call("OdesliInboxDetail", { zprava: result_detail })
                                            .then((data2) => {
                                            detail_vysledku.RefIdPrenosu = data2.RefIdPrenosu;
                                            detail_vysledku.StavId = data2.StavId;
                                            detail_vysledku.StavTyp = data2.StavTyp;
                                            detail_vysledku.StavNazev = data2.StavNazev;
                                            detail_vysledku.StavPopis = data2.StavPopis;
                                            detail_vysledku.detaily = data2.detaily;
                                            seznam_vysledku.push(detail_vysledku);
                                            that.view_data.updateData(seznam_vysledku);
                                        });
                                    })
                                        .fail(function (state) {
                                        def.reject();
                                    });
                                });
                                def.resolve();
                                //that.view_data.updateData(seznam_vysledku);
                                //that.view_data.updateData(data);
                                that.showFlash("jres:30450008", "success", "xx"); //RC 30450008 : Žádost o aktualizaci Inboxu odeslána
                                return def.promise();
                            });
                        });
                    });
                }
                zjisti_sloupce(gf, vlastnosti) {
                    var ss = "";
                    if (vlastnosti == true)
                        ss = gf.columns.filter(e => e.hidden != true).filter(f => f.name.includes('ControlsSystemAggregated') != true).map(e => e.name).join(',');
                    else
                        ss = gf.columns.filter(e => e.hidden != true).filter(f => f.name.includes('ControlsSystemAggregated') != true).filter(f => f.name.includes('Vlastnost') != true).map(e => e.name).join(',');
                    return ss;
                }
                detail_zpravy() {
                    let that = this;
                    var text = "";
                    var detaily = that.row.detaily;
                    if (detaily) {
                        detaily.forEach((r) => {
                            text = text + r.ZaznamText + "\n\n  ";
                        });
                    }
                    text = that.row.StavPopis;
                    that.dialogs.messageBox("OK", text, [GDlg.mbbCancel], GDlg.mbiInfo);
                }
            };
            GOdesilac = __decorate([
                Decorators.gcontent
            ], GOdesilac);
            WebClient.GOdesilac = GOdesilac;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR09kZXNpbGFjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR09kZXNpbGFjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E2aEJmO0FBN2hCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E2aEJuQjtJQTdoQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTZoQjdCO1FBN2hCb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVUsU0FBUSxPQUFBLFlBQVk7Z0JBQTNDOztvQkFDSSxRQUFHLEdBQUcsWUFBWSxDQUFDO29CQUNuQixrQkFBa0I7b0JBQ1YsWUFBTyxHQUFZLEtBQUssQ0FBQztvQkFDekIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7b0JBQzdCLHNCQUFpQixHQUFZLEtBQUssQ0FBQztvQkE0ZTNDLEtBQUs7b0JBQ0wsc0NBQXNDO29CQUN0QyxLQUFLO29CQUNMLEtBQUs7b0JBQ0wsNENBQTRDO29CQUM1QyxzQkFBc0I7b0JBQ3RCLHlDQUF5QztvQkFDekMsNkJBQTZCO29CQUM3Qix3Q0FBd0M7b0JBQ3hDLHNDQUFzQztvQkFFdEMsc0VBQXNFO29CQUN0RSxzSUFBc0k7b0JBRXRJLGtHQUFrRztvQkFDbEcsdUJBQXVCO29CQUN2QixxQ0FBcUM7b0JBQ3JDLDhDQUE4QztvQkFFOUMsc0VBQXNFO29CQUN0RSwyQ0FBMkM7b0JBQzNDLG1HQUFtRztvQkFFbkcscURBQXFEO29CQUVyRCxtREFBbUQ7b0JBQ25ELGlDQUFpQztvQkFFakMsNENBQTRDO29CQUU1QyxtSUFBbUk7b0JBRW5JLG1EQUFtRDtvQkFDbkQsNkJBQTZCO29CQUU3QixvQkFBb0I7b0JBQ3BCLGFBQWE7b0JBQ2IsR0FBRztnQkFFUCxDQUFDO2dCQTFnQlUsY0FBYztvQkFFakIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNoQixDQUFDO2dCQUVNLGNBQWM7b0JBQ2pCLElBQUksQ0FBQyxJQUFJ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QUM7YUEwQ0osQ0FBQTtZQXhoQlksU0FBUztnQkFEckIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxTQUFTLENBd2hCckI7WUF4aEJZLG1CQUFTLFlBd2hCckIsQ0FBQTtRQUVMLENBQUMsRUE3aEJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE2aEI3QjtJQUFELENBQUMsRUE3aEJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE2aEJuQjtBQUFELENBQUMsRUE3aEJTLE1BQU0sS0FBTixNQUFNLFFBNmhCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHT2Rlc2lsYWMgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG4gICAgICAgIHVpZCA9IFwiR09kZXNpbGFjI1wiO1xyXG4gICAgICAgIC8vIHZzdHVwbmkgaG9kbm90eVxyXG4gICAgICAgIHByaXZhdGUgcmVmcmVzaDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHByaXZhdGUgZmlsZXNMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIGZpbGVzVG9TZW5kTG9hZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIGluZm9yYW1jZSBvIHByZW5lc2VuZW0gc291Ym9ydVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgaW5mb0ZpbGU6IEdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR0ZpbGVJbmZvRHRvO1xyXG4gICAgICAgIHByaXZhdGUgaW5mb0ZpbGVTZW5kOiBHZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdGaWxlSW5mb0R0bztcclxuICAgICAgICBwcml2YXRlIHZpZXdfZGF0YTogR29yZGljLkRhdGEuVmlldzxHb3JkaWMuRWtvLkludGVyZmFjZS5HQ1NVSVNacHJhdmFTdGF2RHRvPjtcclxuICAgICAgICBwcml2YXRlIHJvdzogR29yZGljLkVrby5JbnRlcmZhY2UuR0NTVUlTWnByYXZhU3RhdkR0bztcclxuXHJcbiAgICAgICAgcHVibGljIHByZXBhcmVDb250ZW50KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIEluaWNpYWxpemFjZSBmb3JtdWxhcmVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmZpbGVzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsZXNUb1NlbmRMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vaWYgKCFvcHRpb25zKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5yZWZyZXNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAvLyBwcmlrYXpvdmEgbGlzdGFcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0T2JhbGtvdmF0LCBwcmltYXJ5OiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9kZXNsYXQsIHByaW1hcnk6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9kZXNsYXRJbmJveCwgcHJpbWFyeTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0T2Rlc2xhdE1vbml0b3JaTywgcHJpbWFyeTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0WmF2cml0LCBwcmltYXJ5OiBmYWxzZSB9LFxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIG1lbnVcclxuICAgICAgICAgICAgdGhhdC5tZW51QmFyKFtcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBha2NpXHJcbiAgICAgICAgICogQHBhcmFtIHRoYXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF2cml0KHsgZW5hYmxlZDogdHJ1ZSwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQudHJ5Q2xvc2UoKTsgfSB9KSxcclxuICAgICAgICAgICAgICAgIGFjdE9iYWxrb3ZhdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLCB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDY1NlwiLCAvL1JDIDMwMjUwNjU2IDogWmFvYsOhbGtvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0Lm9iYWxrdWooKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE9kZXNsYXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSwgdmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzA0NTAwMDNcIiwgLy9SQyAzMDQ1MDAwMyA6IE9kZXNsYXQgbmEgQ1NVSVNcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQub2Rlc2xpKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0T2Rlc2xhdEluYm94OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgdmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzA0NTAwMDdcIiwgLy9SQyAzMDQ1MDAwNyA6IE5hxI3DrXN0IEluYm94XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0Lm9kZXNsaV9pbmJveCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBcclxuICAgICAgICAgICAgICAgIGFjdERldGFpbFpwcmF2eToge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWwgenByw6F2eVwiLCBcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZXRhaWxfenByYXZ5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgXHJcbiAgICAgICAgICAgICAgICBhY3RPZGVzbGF0TW9uaXRvclpPOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgdmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk1vbml0b3IgWk9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvLyB0aGF0Lm1vbml0b3Jfem8oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBmb3JtdWxhcmVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld19kYXRhID0gbmV3IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLkVrby5JbnRlcmZhY2UuR0NTVUlTWnByYXZhRHRvPihbXSwge30pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXRTZXpuYW06IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkVrby5JbnRlcmZhY2UuR0NTVUlTWnByYXZhU3RhdkR0bz47XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0U2V6bmFtID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiWnByYXZhSWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIklEIHpwcsOhdnlcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiWnByYXZhTmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk7DoXpldiB6cHLDoXZ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIzMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIklDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJJQ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJTdGF2SWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0YXZJZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJTdGF2VHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdGF2VHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlN0YXZOYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3Rhdk5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlN0YXZQb3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3RhdlBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8uYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJacHJhdmFEYXR1bVZ5dHZvcmVuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnByYXZhRGF0dW1WeXR2b3JlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjMwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAvLy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlpwcmF2YURhdHVtUHVibGlrYWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJacHJhdmFEYXR1bVB1Ymxpa2FjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJacHJhdmFTdGF0dXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpwcmF2YVN0YXR1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJUeXBEYXRvdmVacHJhdnlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlR5cERhdG92ZVpwcmF2eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMzBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBteV9Db25kRm9ybWF0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXQ7XHJcbiAgICAgICAgICAgIHZhciBteV9Db25kRm9ybWF0czogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0W107XHJcbiAgICAgICAgICAgIG15X0NvbmRGb3JtYXRzID0gW107XHJcblxyXG4gICAgICAgICAgICBteV9Db25kRm9ybWF0ID0geyBkZXNjcmlwdGlvbjogXCJDSFlCQVwiLCBmb3JtdWxhOiBcIkVRVUFMUyhAU3RhdlR5cCwgXFxcIkNIWUJBXFxcIilcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5yZWQgfTtcclxuICAgICAgICAgICAgbXlfQ29uZEZvcm1hdHMucHVzaChteV9Db25kRm9ybWF0KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBncmlkID0gJC5uZXdEaXYoXCJjbGFzcz0nU2V6bmFtWnByYXYnXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhhdC52aWV3X2RhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbFpwcmF2eSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBncmlkRm9ybWF0U2V6bmFtLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiWnByYXZhRGF0dW1WeXR2b3JlbmlcIixcdFx0XHRcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24oZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cgPSBncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5yb3cgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtjb2x1bW5MaXN0OiB0aGlzLnpqaXN0aV9zbG91cGNlKGdyaWRGb3JtYXRTZXpuYW0sIGZhbHNlKSwgY29uZEZvcm1hdHM6IG15X0NvbmRGb3JtYXRzfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4vLyAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZm9ybURldGFpbFwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0zLTYtMywgTS0zLTYtMywgUy0zLTYtM1wiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIFpPMjg4NDQ4ODhcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwNjUxXCIsIHJlcXVpcmVkOiB0cnVlIH0pLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCAvL1JDIDMwMjUwNjUxIDogUmVnaXN0cmHEjW7DrSDEjcOtc2xvIFpPXHJcbiAgICAgICAgICAgICAgICAgICAgRWtvLkRldGFpbC5GaWVsZC5nZXRDb3VudGVyT3B0aW9ucygxNSwgdHJ1ZSwgdHJ1ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsIG5hbWU6IFwiUGVyc29uYWxJRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogXCJaTzI4ODQ0ODg4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogXCIyMDAwMDEwODc3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTA2NTJcIiwgLy9SQyAzMDI1MDY1MiA6IFJlZ2lzdHJhxI1uw60gxI3DrXNsbyBaTyB2IHN5c3TDqW11IENTw5pJU1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikgeyB0aGF0Lk5hc3RhdmVuaUFrY2koKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwNjUwXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCAvL1JDIDMwMjUwNjUwIDogVGVsZWZvblxyXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCJQaG9uZU51bWJlclwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDY0OFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgLy9SQyAzMDI1MDY0OCA6IEptw6lubyBhIHDFmWlqbWVuw61cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiUGVyc29uTmFtZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTA2NTNcIiAvL1JDIDMwMjUwNjUzIDogSm3DqW5vIGEgcMWZw61qbWVuw60gWk8vTlpPXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDY0OVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgLy9SQyAzMDI1MDY0OSA6IEUtbWFpbFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCJFbWFpbFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDY1NFwiKS5hZGRGaWVsZChcImdmaWxlZmllbGRcIiwgLy9SQyAzMDI1MDY1NCA6IFbDvWLEm3Igc291Ym9ydVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXBsb2FkVE1QRmlsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2N1c3RvbUNsYXNzOiBcImRvd25sb2FkRmllbGRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXB0RXh0ZW5zaW9uOiBcIi54bWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcInctTC00IHctUy0xMiB3LU0tNlwiLCBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJyZXBsYWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZmllbGREb3dubG9hZGVyQ2xhc3M6IFwiR29yZGljLkRvY3VtZW50cy5XZWJDbGllbnQuR0Z0cENsaWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlVXBsb2FkZWQ6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcImpyZXM6MzAyNTA2NTVcIi5mb3JtYXQob2JqLmZpbGVJbmZvLmZpbGVuYW1lIGFzIGFueSksIFwic3VjY2Vzc1wiLCBcInh4XCIpIC8vUkMgMzAyNTA2NTUgOiBTb3Vib3IgezB9IG5haHLDoW4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbGVzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDQ1MDAwNFwiKS5hZGRGaWVsZChcImdmaWxlZmllbGRcIiwgLy9SQyAzMDQ1MDAwNCA6IFbDvWLEm3Igc291Ym9ydSBwcm8gb2Rlc2zDoW7DrVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXBsb2FkVE1QU2VuZEZpbGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jdXN0b21DbGFzczogXCJkb3dubG9hZEZpZWxkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2VwdEV4dGVuc2lvbjogXCIueG1sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJ3LUwtNCB3LVMtMTIgdy1NLTZcIiwgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IFwicmVwbGFjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVwYXJlRmlsZXNPblNlcnZlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9maWVsZERvd25sb2FkZXJDbGFzczogXCJHb3JkaWMuRG9jdW1lbnRzLldlYkNsaWVudC5HRnRwQ2xpZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVVcGxvYWRlZDogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwianJlczozMDQ1MDAwNVwiLmZvcm1hdChvYmouZmlsZUluZm8uZmlsZW5hbWUgYXMgYW55KSwgXCJzdWNjZXNzXCIsIFwieHhcIikgLy9SQyAzMDQ1MDAwNSA6IFNvdWJvciB7IDB9IHBybyBvZGVzbMOhbsOtIG5haHLDoW4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbGVzVG9TZW5kTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHZhciB0YWJIZWFkID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICBncmlkLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAvLyBwcm8gdmFsaWRhdG9yeSB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSB0aGlzLmVsZW1lbnQ7IC8vdGFiSGVhZDtcclxuICAgICAgICAgICAgZm9ybS5hcHBlbmRUbyh0YWJIZWFkKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU3B1c3Rlbmkgdmxhc3RuaWhvIG9iYWxrb3ZhbmlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG9iYWxrdWooKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC52YWxpZGF0aW9uKClcclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHRocm93IEdFcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuY2xvc2VkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkdG9TZW5lZGVyOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyU2VuZGVyRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwiZm9ybURldGFpbCxmb3JtSGVhZGVyXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvU2VuZWRlcikgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuVWNyT2JhbGtvdmFjLnByaWRlak9iYWxrdSh7IHJxOiB7IEZpbGVJbmZvOiB0aGF0LmluZm9GaWxlLCBTZW5kZXI6IGR0b1NlbmVkZXIgfSB9KS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuY2xvc2VkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdGaWxlKCkuZG93bmxvYWQocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZhbGlkYWNlIHByZWQgb2Rlc2xhbmltXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB2YWxpZGF0aW9uKCk6IEpRdWVyeVByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBkZWZDbG9zZSA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZhbGlkYWNlIGZvcm11bGFyZVxyXG4gICAgICAgICAgICBpZiAoIXRoYXQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJpc1ZhbGlkXCIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZkNsb3NlLnJlamVjdChmYWxzZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ1cGxvYWRUTVBGaWxlXCIpLmdmaWxlZmllbGQoXCJnZXRWYWx1ZUFzeW5jXCIpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwidW5kZWZpbmVkXCIgfHwgZGF0YS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwianJlczozMDI1MDY3M1wiKSAvL1JDIDMwMjUwNjczIDogTmVuw60gdnlicsOhbiDFvsOhZG7DvSBzb3Vib3IhXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZkNsb3NlLnJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LmluZm9GaWxlID0gZGF0YVswXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZDbG9zZS5yZXNvbHZlKHRydWUpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVmQ2xvc2UucmVqZWN0KGZhbHNlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZDbG9zZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmFsaWRhdGlvbl9TZW5kKCk6IEpRdWVyeVByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBkZWZDbG9zZSA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZhbGlkYWNlIGZvcm11bGFyZVxyXG4gICAgICAgICAgICBpZiAoIXRoYXQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJpc1ZhbGlkXCIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZkNsb3NlLnJlamVjdChmYWxzZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ1cGxvYWRUTVBTZW5kRmlsZVwiKS5nZmlsZWZpZWxkKFwiZ2V0VmFsdWVBc3luY1wiKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSBcInVuZGVmaW5lZFwiIHx8IGRhdGEubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Mud2FybmluZyhcImpyZXM6MzAyNTA2NzRcIikgLy9SQyAzMDI1MDY3NCA6IE5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gc291Ym9yIVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZDbG9zZS5yZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhhdC5pbmZvRmlsZVNlbmQgPSBkYXRhWzBdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZkNsb3NlLnJlc29sdmUodHJ1ZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWZDbG9zZS5yZWplY3QoZmFsc2UpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIGRlZkNsb3NlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2YWxpZGF0aW9uX1NlbmRfSW5ib3goKTogSlF1ZXJ5UHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRlZkNsb3NlID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZkNsb3NlLnJlc29sdmUodHJ1ZSkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBOYXN0YXZlbmlBa2NpKCkge1xyXG4gICAgICAgICAgICBsZXQgcGVyc29uYWxJRCA9IHRoaXMuZmluZEZpZWxkcyhcIlBlcnNvbmFsSURcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RPYmFsa292YXQ/LnVwZGF0ZSh7IGVuYWJsZWQ6IHRoaXMuZmlsZXNMb2FkZWQgJiYgcGVyc29uYWxJRCAhPT0gbnVsbCAmJiB0eXBlb2YgcGVyc29uYWxJRCAhPSBcInVuZGVmaW5lZFwiICYmIChwZXJzb25hbElEIGFzIHN0cmluZykudHJpbSgpICE9IFwiXCIgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RPZGVzbGF0Py51cGRhdGUoeyBlbmFibGVkOiB0aGlzLmZpbGVzVG9TZW5kTG9hZGVkICYmIHBlcnNvbmFsSUQgIT09IG51bGwgJiYgdHlwZW9mIHBlcnNvbmFsSUQgIT0gXCJ1bmRlZmluZWRcIiAmJiAocGVyc29uYWxJRCBhcyBzdHJpbmcpLnRyaW0oKSAhPSBcIlwiIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXphdmlyYW5pIG9rbmFcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjbG9zaW5nKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoeyByZWZyZXNoOiB0eXBlb2YgdGhhdC5yZWZyZXNoICE9PSBcInVuZGVmaW5lZFwiICYmIHRoYXQucmVmcmVzaCA9PT0gdHJ1ZSB9KS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTcHVzdGVuaSB2bGFzdG5paG8gb2Rlc2xhbmlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG9kZXNsaSgpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LnZhbGlkYXRpb25fU2VuZCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHRocm93IEdFcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5jbG9zZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsKFwiT2Rlc2xpVnlrYXpcIiwgeyBzb3Vib3I6IHRoYXQuaW5mb0ZpbGVTZW5kIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcImpyZXM6MzA0NTAwMDZcIi5mb3JtYXQodGhhdC5pbmZvRmlsZVNlbmQuZmlsZW5hbWUgYXMgYW55KSwgXCJzdWNjZXNzXCIsIFwieHhcIikgLy9SQyAzMDQ1MDAwNiA6IFNvdWJvciB7MH0gb2Rlc2zDoW4gbmEgQ1NVSVMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU3B1c3Rlbmkgdmxhc3RuaWhvIG9kZXNsYW5pIEluYm94XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBvZGVzbGlfaW5ib3goKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC52YWxpZGF0aW9uX1NlbmRfSW5ib3goKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KSB0aHJvdyBHRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuY2xvc2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkdG9TZW5lZGVyOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyU2VuZGVyRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJmb3JtRGV0YWlsLGZvcm1IZWFkZXJcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG9TZW5lZGVyKSAvLyB2ZXJpZmljYXRpb25OZWVkZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5VY3JPYmFsa292YWMuaW5ib3hTZXpuYW1acHJhdlJlcXVlc3QoeyBycTogeyBTZW5kZXI6IGR0b1NlbmVkZXIgfSB9KS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuY2xvc2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsKFwiT2Rlc2xpSW5ib3hcIiwgeyB6cHJhdmE6IHJlc3VsdCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXpuYW1fenByYXY6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdDU1VJU1pwcmF2YUR0b1tdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXpuYW1fdnlzbGVka3U6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdDU1VJU1pwcmF2YVN0YXZEdG9bXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V6bmFtX3pwcmF2LnB1c2gocik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRldGFpbF92eXNsZWRrdTogR29yZGljLkVrby5JbnRlcmZhY2UuR0NTVUlTWnByYXZhU3RhdkR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsX3Z5c2xlZGt1LlpwcmF2YUlkID0gci5acHJhdmFJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbF92eXNsZWRrdS5JQyA9IHIuSUM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxfdnlzbGVka3UuWnByYXZhRGF0dW1WeXR2b3JlbmkgPSByLlpwcmF2YURhdHVtVnl0dm9yZW5pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsX3Z5c2xlZGt1LlpwcmF2YURhdHVtUHVibGlrYWNlID0gci5acHJhdmFEYXR1bVB1Ymxpa2FjZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbF92eXNsZWRrdS5acHJhdmFTdGF0dXMgPSByLlpwcmF2YVN0YXR1cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbF92eXNsZWRrdS5UeXBEYXRvdmVacHJhdnkgPSByLlR5cERhdG92ZVpwcmF2eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbF92eXNsZWRrdS5acHJhdmFOYXpldiA9IHIuWnByYXZhTmF6ZXY7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlVjck9iYWxrb3ZhYy5pbmJveERldGFpbFpwcmF2eVJlcXVlc3QoeyBycTogeyBTZW5kZXI6IGR0b1NlbmVkZXIsIElkenByYXZ5OiByLlpwcmF2YUlkIH0gfSkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0X2RldGFpbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGwoXCJPZGVzbGlJbmJveERldGFpbFwiLCB7IHpwcmF2YTogcmVzdWx0X2RldGFpbCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsX3Z5c2xlZGt1LlJlZklkUHJlbm9zdSA9IGRhdGEyLlJlZklkUHJlbm9zdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxfdnlzbGVka3UuU3RhdklkID0gZGF0YTIuU3RhdklkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbF92eXNsZWRrdS5TdGF2VHlwID0gZGF0YTIuU3RhdlR5cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxfdnlzbGVka3UuU3Rhdk5hemV2ID0gZGF0YTIuU3Rhdk5hemV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbF92eXNsZWRrdS5TdGF2UG9waXMgPSBkYXRhMi5TdGF2UG9waXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsX3Z5c2xlZGt1LmRldGFpbHkgPSBkYXRhMi5kZXRhaWx5O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXpuYW1fdnlzbGVka3UucHVzaChkZXRhaWxfdnlzbGVka3UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfZGF0YS51cGRhdGVEYXRhKHNlem5hbV92eXNsZWRrdSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnZpZXdfZGF0YS51cGRhdGVEYXRhKHNlem5hbV92eXNsZWRrdSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQudmlld19kYXRhLnVwZGF0ZURhdGEoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcImpyZXM6MzA0NTAwMDhcIiwgXCJzdWNjZXNzXCIsIFwieHhcIikgLy9SQyAzMDQ1MDAwOCA6IMW9w6Fkb3N0IG8gYWt0dWFsaXphY2kgSW5ib3h1IG9kZXNsw6FuYVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB6amlzdGlfc2xvdXBjZShnZiwgdmxhc3Rub3N0aSkge1xyXG4gICAgICAgICAgICB2YXIgc3MgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZsYXN0bm9zdGkgPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHNzID0gZ2YuY29sdW1ucy5maWx0ZXIoZSA9PiBlLmhpZGRlbiAhPSB0cnVlKS5maWx0ZXIoZiA9PiBmLm5hbWUuaW5jbHVkZXMoJ0NvbnRyb2xzU3lzdGVtQWdncmVnYXRlZCcpICE9IHRydWUpLm1hcChlID0+IGUubmFtZSkuam9pbignLCcpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBzcyA9IGdmLmNvbHVtbnMuZmlsdGVyKGUgPT4gZS5oaWRkZW4gIT0gdHJ1ZSkuZmlsdGVyKGYgPT4gZi5uYW1lLmluY2x1ZGVzKCdDb250cm9sc1N5c3RlbUFnZ3JlZ2F0ZWQnKSAhPSB0cnVlKS5maWx0ZXIoZiA9PiBmLm5hbWUuaW5jbHVkZXMoJ1ZsYXN0bm9zdCcpICE9IHRydWUpLm1hcChlID0+IGUubmFtZSkuam9pbignLCcpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNzOyBcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZXRhaWxfenByYXZ5KCApIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRleHQgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRldGFpbHkgPSB0aGF0LnJvdy5kZXRhaWx5O1xyXG4gICAgICAgICAgICBpZiAoZGV0YWlseSkge1xyXG4gICAgICAgICAgICAgICAgZGV0YWlseS5mb3JFYWNoKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRleHQgKyByLlphem5hbVRleHQgKyBcIlxcblxcbiAgXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0ZXh0ID0gdGhhdC5yb3cuU3RhdlBvcGlzITtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiT0tcIiwgdGV4dCwgW0dEbGcubWJiQ2FuY2VsXSwgR0RsZy5tYmlJbmZvKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogU3B1c3Rlbmkgdmxhc3RuaWhvIG9kZXNsYW5pIEluYm94XHJcbiAgICAgICAgLy8gKiBcclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBtb25pdG9yX3pvKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgLy8gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIC8vICAgIHJldHVybiB0aGF0LnZhbGlkYXRpb25fU2VuZF9JbmJveCgpXHJcbiAgICAgICAgLy8gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGlmICghcmVzdWx0KSB0aHJvdyBHRXJyb3I7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAodGhhdC5jbG9zZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICBsZXQgZHRvU2VuZWRlcjogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclNlbmRlckR0byA9IHt9O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJmb3JtRGV0YWlsLGZvcm1IZWFkZXJcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG9TZW5lZGVyKSAvLyB2ZXJpZmljYXRpb25OZWVkZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlVjck9iYWxrb3ZhYy5tb25pdG9yU2V6bmFtWk9SZXF1ZXN0KHsgcnE6IHsgU2VuZGVyOiBkdG9TZW5lZGVyIH0gfSkuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZ2V0KClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmNsb3NlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsKFwiT2Rlc2xpTW9uaXRvclpPXCIsIHsgenByYXZhOiByZXN1bHQgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlem5hbV92eXNsZWRrdTogR29yZGljLkVrby5JbnRlcmZhY2UuR0NTVUlTWnByYXZhU3RhdkR0b1tdID0gW107XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgocikgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcImpyZXM6MzA0NTAwMDhcIiwgXCJzdWNjZXNzXCIsIFwieHhcIikgLy9SQyAzMDQ1MDAwOCA6IMW9w6Fkb3N0IG8gYWt0dWFsaXphY2kgSW5ib3h1IG9kZXNsw6FuYVxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=
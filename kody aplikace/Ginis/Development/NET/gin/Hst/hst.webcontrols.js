"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Hst.WebControls.SeznamPrehledZmen.ts                 </Name>
//    <Description> Veřejný přehled změn GORDIC                                 </Description>
//    <Author>      vblabla                                                     </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-01-31                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Hst;
    (function (Hst) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * Content pro zobrazení změn v modulech, sestavách a aplikacích .NET.
             */
            let SeznamPrehledZmen = class SeznamPrehledZmen extends Gordic.GContentBase {
                constructor() {
                    //#region vlastnosti
                    super(...arguments);
                    this.uuid = 0;
                    this.uuidVersion = 0;
                    //Konec vlastností pro vykreslení changelogů
                    /**
                     * Pole s objekty programových fází
                     */
                    this.fazeData = [{}];
                    /**
                     * Pole s názvy programových fází
                     */
                    this.fazeTxtData = [];
                    this.tooltipTagy = "";
                    this.origHeigth = "";
                    this.origWidth = "";
                    this.dataFormat = "HTML";
                    this.dataExport = "Aktuílní data";
                    this.legZmenySearch = false;
                    this.pocetZaznamu = new GObservableObject({ pocet: 0 });
                    this.typView = 1; //0= výchozí / 1=dle typu popisu / 2=dle typu revize
                    this.tagySearch = [];
                    this.tagySearchAtestace = [];
                    this.priz_ses = "";
                    this.fazeSearch = [];
                    this.searchValue = "";
                    this.resSearch = false;
                }
                ;
                /**
                 * Data view k vzhledávání popisů změn
                 */
                //private viewSearchZmeny: Gordic.Data.View<Gordic.Adt.Interface.GPopisyZmenDto>;
                /**
                 * Data view k popisům změn
                 */
                //private viewZmeny: Gordic.Data.View<Gordic.Adt.Interface.GPopisyZmenDto>;
                //#endregion
                /**
                 * onContentReady
                 */
                onContentReady() {
                    this.init();
                }
                /**
                 * init content
                 */
                init() {
                    const that = this;
                    this.setTitle();
                    //Získání programových fází
                    this.call("NactiFaze", { VstupniData: {} })
                        .done(function (data) {
                        var fazeArr = [];
                        for (var i = 0; i < data.length; i++) {
                            if (data[i] != null && data[i] != undefined && data[i].faze != undefined && data[i].faze != null) {
                                that.fazeTxtData.push(data[i].faze);
                                that.fazeData.push(data[i]);
                            }
                        }
                        that.element.findForms().findFields("faze").gfield("option", "data", that.fazeTxtData);
                        if (that.faze != undefined) {
                            var fazeField = [];
                            fazeField.push(that.faze);
                            //Informace o programových fázích
                            //for (var i = 0; i < data.length; i++) {
                            //	if (data[i] != null && data[i] != undefined && data[i].faze != undefined && data[i].faze != null) {
                            //		fazeField.push(data[i].faze)
                            //		that.fazeData.push(data[i])
                            //	}
                            //}
                            //
                            that.element.findForms().findFields("faze").gfield("setValue", fazeField);
                            //Defaultní načtení seznamu změn při filtru na programovou fázi
                            if (that.mainLogsPanel != undefined) {
                                that.mainLogsPanel.gcover({ text: "Načítání popisů změn" });
                            }
                            if (that.revize == undefined) {
                                that._createChangeLog();
                            }
                        }
                        if (that.revize != undefined) {
                            var tagyField = [];
                            tagyField.push(that.revize);
                            that.element.findForms().findFields("tagyVyber").gfield("setValue", tagyField);
                            //Defaultní načtení seznamu změn při filtru na programovou fázi
                            if (that.mainLogsPanel != undefined) {
                                that.mainLogsPanel.gcover({ text: "Načítání popisů změn" });
                            }
                            that._createChangeLog();
                        }
                    });
                    //Registrace akcí
                    that.actions.addRange({
                        actExport: {
                            icon: "gi-generate",
                            tooltip: "Generovat data",
                            run: function (ev, ctx) {
                                var def = $.Deferred();
                                that.actions.actExport?.setPending(def.promise());
                                var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-4-8-0, M-4-8-0, S-4-8-0" })
                                    .addSection("Nastavení exportu dat")
                                    .addRow("Oblast dat")
                                    .addField("gselectbox", /*"w-6",*/ {
                                    name: "fieldTypPopis",
                                    data: ["Aktuální data", "verze 524", "verze 525"],
                                    initialValue: "Aktuální data",
                                    itemWidth: "",
                                    dropdown: true,
                                    customClass: "text-align: eft",
                                    graphicInput: "hidden",
                                    list: true,
                                    change: function (ev, ctx) {
                                        if (ctx.value) {
                                            that.dataExport = ctx.value;
                                        }
                                    }
                                })
                                    .addRow("Datový formát")
                                    .addField("gselectbox", /*"w-6",*/ {
                                    name: "fieldTypPopis",
                                    data: ["HTML", "DOCX", "TEXT"],
                                    initialValue: "HTML",
                                    itemWidth: "",
                                    dropdown: true,
                                    customClass: "text-align: left",
                                    graphicInput: "exclusive",
                                    list: true,
                                    itemTemplate: function (val) {
                                        if (val == "HTML") {
                                            val = Gordic.Prefabs.Utils.getSingleLineInfo({ icon: "fa-file-code-o", info: val });
                                        }
                                        if (val == "DOCX") {
                                            val = Gordic.Prefabs.Utils.getSingleLineInfo({ icon: "fa-file-word-o", info: val });
                                        }
                                        if (val == "TEXT") {
                                            val = Gordic.Prefabs.Utils.getSingleLineInfo({ icon: "fa-file-text-o", info: val });
                                        }
                                        return val;
                                    },
                                    change: function (ev, ctx) {
                                        if (ctx.value) {
                                            that.dataFormat = ctx.value;
                                        }
                                    }
                                });
                                that.dataExport = "Aktuální data";
                                that.dataFormat = "HTML";
                                var simpleExportForm = that.dialogs.simpleForm("Export popisů změn", form, {}, $.extend({}, {
                                    commandBar: [
                                        {
                                            favorite: true,
                                            primary: true,
                                            //align: "opposite",
                                            action: new GAction({
                                                name: "actSave",
                                                icon: "gi-generate",
                                                caption: "Exportovat",
                                                run: (ev, target) => {
                                                    if (that.dataFormat == "HTML") {
                                                        that.downloadInnerHtml('changelog.html', 'main-logs', 'text/html', that.dataExport, that.dataFormat);
                                                    }
                                                    else if (that.dataFormat == "DOCX") {
                                                        that.downloadInnerHtml('changelog.doc', 'main-logs', 'application/msword', that.dataExport, that.dataFormat);
                                                    }
                                                    else if (that.dataFormat == "TEXT") {
                                                        that.downloadInnerHtml('changelog.txt', 'main-logs', 'text/plain', that.dataExport, that.dataFormat);
                                                    }
                                                    //that.downloadInnerHtml('changelog.html', 'main-logs', 'text/html', that.dataExport, that.dataFormat);
                                                    if (that.dataExport == "Aktuální data") {
                                                        that.notification("add", { icon: "fa-check-circle g-state-text g-state-success", id: "DownloadChangelogFile", state: "success", title: "Export dat", content: "Přehled změn byl úspěšně vygenerován" });
                                                    }
                                                    //def.resolve();
                                                    simpleExportForm.gcontent().close({ generated: true });
                                                },
                                            }),
                                        },
                                        {
                                            favorite: true,
                                            //align: "opposite",
                                            action: new GAction({
                                                name: "actCancel",
                                                caption: "Zrušit",
                                                icon: "gi-window-close",
                                                run: function (ev) {
                                                    //def.reject();
                                                    simpleExportForm.gcontent().close({ generated: false });
                                                },
                                            }),
                                            //primary: true
                                        }
                                    ], width: 500, height: 250
                                })).on({
                                    close: function (ev, data) {
                                        //def.reject()
                                        simpleExportForm.gcontent().close({ generated: false });
                                    }
                                });
                                simpleExportForm.on({
                                    close: function (ev, data) {
                                        if (data != undefined && data.generated != undefined && data.generated == true) {
                                            def.resolve();
                                        }
                                        else {
                                            def.reject();
                                            simpleExportForm.gcontent().close();
                                        }
                                    }
                                });
                                return def.promise();
                            },
                        }
                    });
                    that.createFilterPanel();
                    //that.element.findFormRows("tagyRow").prepend($("<icon>").gstatic({ icon: "fa-lock", tooltip: "Jedná se o nevřejný popis změn", /*caption: "Tagy: "*/ }))
                    that.getMdProcessor();
                    //Zobrazení změn
                    that.createMainTagsPanel();
                }
                /**
                 * setTitle - Titulek úlohy
                 */
                setTitle() {
                    this.title = "jres:33177001"; //RC 33177001 : Přehled změn
                }
                /**
                 * downloadInnerHtml - Generování reportu změn
                 *
                 * @param {any} filename
                 * @param {any} elId
                 * @param {any} mimeType
                 * @param {any} dataRange
                 * @param {any} dataFormat
                 */
                downloadInnerHtml(filename, elId, mimeType, dataRange, dataFormat) {
                    const that = this;
                    var exportHtml;
                    var exportHtmlTest;
                    var styleHtml;
                    var html;
                    if (dataRange == "Aktuální data") {
                        if (dataFormat == "HTML") {
                            exportHtml = that.mainLogsPanel[0]; //exportHtmlTest   //.outerHTML //.innerHTML
                            exportHtml = that.getOuterHTMLWithInlineStyle(that.mainLogsPanel[0]);
                            html = "<!DOCTYPE html><html><head><title>Changelog HTML generated report</title><meta charset='UTF-8'><style>"
                                + "." + that.mainLogsPanel[0].children[0].className
                                + "{" + exportHtml + "}"
                                + "</style></head><body>"
                                + exportHtml + "<script>" + "\n var revision = window.location.hash.substring(1) \n  if (revision){ \n let scrollToElm = document.getElementById(revision) \n if (!scrollToElm){ \n let module = revision.substring(2,7)  \n  if (revision.substring(0,2) == '20'){ revision = 'GMS' + module} \n if (revision.substring(0,2) == '32'){ revision = 'GIN' + module}  \n if (revision.substring(0,2) == '40'){ revision = 'GSA' + module} \n if (revision.substring(0,2) == '41'){ revision = 'GWA' + module} \n if (revision.substring(0,2) == '42'){ revision = 'GWS' + module} \n if (revision.substring(0,2) == '43'){ revision = 'GSS' + module} \n  scrollToElm = document.getElementById(revision)} \n if (scrollToElm){ \n scrollToElm.scrollIntoView() \n } \n }" + "</script></body></html>";
                        }
                        else if (dataFormat == "DOCX") {
                            html = that.mainLogsPanel[0].innerText;
                        }
                        else if (dataFormat == "TEXT") {
                            html = that.mainLogsPanel[0].innerText;
                        }
                    }
                    else {
                        that.createMainLogsPanelVersion();
                        return;
                    }
                    var link = document.createElement('a');
                    var test = HTMLBodyElement;
                    mimeType = mimeType || 'text/plain';
                    link.setAttribute('download', filename);
                    if (html) {
                        link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + /*encodeURIComponent(exportHtml)*/ encodeURIComponent(/*exportHtml*/ html));
                    }
                    link.click();
                    that.mainLogsPanel[0].style.width = that.origWidth;
                    that.mainLogsPanel[0].style.height = that.origHeigth;
                }
                getOuterHTMLWithInlineStyle(el) {
                    const that = this;
                    that.cloneEl = el;
                    let s = getComputedStyle(that.cloneEl);
                    var i = [];
                    for (let key in s) {
                        if (!(+key)) {
                            let prop = key.replace(/\-([a-z])/g, v => v[1].toUpperCase());
                            i.push(`${key}: ${s[key]}`);
                        }
                    }
                    that.cloneEl.setAttribute('style', i.join("; "));
                    that.origHeigth = that.cloneEl.style.height;
                    that.origWidth = that.cloneEl.style.width;
                    that.cloneEl.style.height = "auto";
                    that.cloneEl.style.width = "auto";
                    return that.cloneEl.outerHTML;
                }
                /**
                 * downloadInnerHtmlVersion	- Generování souhrnného reportu
                 *
                 * @param {any} filename
                 * @param {any} elId
                 * @param {any} mimeType
                 * @param {any} dataRange
                 * @param {any} dataFormat
                 */
                downloadInnerHtmlVersion(filename, elId, mimeType, dataRange, dataFormat) {
                    const that = this;
                    var exportHtml524;
                    var styleHtml524;
                    var html524;
                    if (dataFormat == "HTML") {
                        exportHtml524 = that.mainLogsPanelVersion[0].innerHTML;
                        html524 = "<!DOCTYPE html><html><head><title>Changelog HTML generated report</title><meta charset='UTF-8'><style>"
                            + "." + that.mainLogsPanelVersion[0]?.children[0]?.className
                            + "{" + exportHtml524 + "}"
                            + "</style></head><body>"
                            + exportHtml524 + "</body></html>";
                    }
                    else if (dataFormat == "DOCX") {
                        html524 = that.mainLogsPanelVersion[0].innerText;
                    }
                    else if (dataFormat == "TEXT") {
                        html524 = that.mainLogsPanelVersion[0].innerText;
                    }
                    var link524 = document.createElement('a');
                    mimeType = mimeType || 'text/plain';
                    link524.setAttribute('download', filename);
                    if (html524) {
                        link524.setAttribute('href', 'data:' + 'text/html' + ';charset=utf-8,' + encodeURIComponent(html524));
                    }
                    link524.click();
                }
                /**
                 * vytvoři filtrPanel
                 */
                createFilterPanel() {
                    var that = this;
                    this.filter = $("<div>").appendTo(this.element).on("gfilterpanelformbuilded", function (event, obj) {
                        //Událost po vytvoření filterpanelu
                    })
                        .gfilterpanel({
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        filterViewMode: FilterViewMode.Simple,
                        //simpleMode: true,
                        favoriteLayoutDescriptor: "L5M3S1",
                        forms: [that.createFilterForm()],
                        apply: function (event, obj) {
                            if (that.mainLogsPanel != undefined) {
                                that.mainLogsPanel.gcover({ text: "Načítání popisů změn" });
                            }
                            that._createChangeLog();
                        }
                    }).on("gfilterpanelapply", function (event, obj) {
                        that.call("NactiFaze", { VstupniData: {} })
                            .done(function (data) {
                            that.fazeTxtData = [];
                            for (var i = 0; i < data.length; i++) {
                                if (data[i] != null && data[i] != undefined && data[i].faze != undefined && data[i].faze != null) {
                                    that.fazeTxtData.push(data[i].faze);
                                    that.fazeData.push(data[i]);
                                }
                            }
                            that.element.findForms().findFields("faze").gfield("option", "data", that.fazeTxtData);
                        });
                    });
                }
                createFilterForm() {
                    var that = this;
                    let filterForm = new Gordic.Forms.Form({
                        name: "FormFiltrSeznamPrehledZmen",
                        //tabLabel: "jres:32000041", //RC 32000041 : Kompletní filtr
                        layoutDescriptor: "L6M3S1, L-0-12-0, M-0-12-0, S-0-12-0"
                    });
                    filterForm
                        .addSection();
                    filterForm
                        .addRow({ label: "<i class='gi gi-2x gi-zverejnit'></i>Zveřejněno od-do" }) //RC 33112069 : Zveřejněno od-do
                        .addField("gdatecombobox", {
                        name: "dat_zmena",
                        model: "model.dat_zmena.start=value.date.start;model.dat_zmena.end=value.date.end",
                        daysRangeMax: 365,
                        change: function (ev, ctx) {
                            //that.element.findForms().findFields("dat_zmena").gfield("setValue", { start: new Date(), end: new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate()) })
                            if (ctx.value) {
                                that.dat_od = ctx.value.date.start;
                                that.dat_do = ctx.value.date.end;
                            }
                            else {
                                //that.element.findFields("dat_zmena").gfield("setValue", { date: { start: new Date(new Date().getFullYear(), new Date().getMonth() - 4, new Date().getDate()), end: new Date(new Date().getFullYear(), 11, 31) } })
                            }
                        },
                        initialValue: { date: { start: new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate()), end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() /*new Date().getFullYear(), 11, 31*/) } } //"thismonth"
                    })
                        .addRow({ name: "fazeRow", label: "<i class='gi gi-2x gi-list'></i>Programová fáze" /*, hint: "Fáze (včetně souvisejících fází)"*/ }) //RC 33110067 : Fáze
                        .addField("gselectbox", /*Gordic.Prefabs.Select.gincfaz(),*/ /*(Gordic.Prefabs.Select as any).gAdtReaderFaze()*/ /*Gordic.Prefabs.Select.gincfaz()*/ {
                        name: "faze",
                        multi: true,
                        itemWidth: "",
                        change: function (ev, ctx) {
                            //                     if (ctx.value != null && ctx.value.length != 0) {
                            //	//that.element.findForms("FormFiltrSeznamPrehledZmen").findFields("dat_zmena").gdatecombobox({/*daysRangeMax: 365*/})
                            //}
                            //                     else {
                            //	//that.element.findForms("FormFiltrSeznamPrehledZmen").findFields("dat_zmena").gdatecombobox({/*daysRangeMax: 60 */})
                            //                     }
                            that.fazeSearch = [];
                            if (ctx.value) {
                                for (var i = 0; i < ctx.value.length; i++) {
                                    that.fazeSearch.push(ctx.value[i]);
                                }
                            }
                            else {
                                that.fazeSearch = [];
                            }
                        },
                    })
                        .addRow({ name: "tagyRow", label: "<i class='gi gi-2x gi-label gi-rot180'></i>Tagy", hint: "<i class='gi gi-label gi-rot180'></i><b>Související tagy</b> k hledaným záznamům. \n \n  Například číslo revize / verze databáze hledané fáze" })
                        .addField("gselectbox", /*Gordic.Prefabs.String.withOperators(),*/ {
                        name: "tagyVyber",
                        showSelectButton: false,
                        multi: true,
                        strict: false,
                        itemWidth: "",
                        change: function (ev, ctx) {
                            that.tagySearch = [];
                            var atestace = false;
                            if (ctx.value) {
                                for (var i = 0; i < ctx.value.length; i++) {
                                    if (ctx.value[i] == "atestace_essl") {
                                        atestace = true;
                                    }
                                    that.tagySearch.push(ctx.value[i]);
                                }
                            }
                            else {
                                that.tagySearch = [];
                            }
                            (!atestace ? that.element.findForms().findFields("atestace").gfield("setValue", false) : that.element.findForms().findFields("atestace").gfield("setValue", true));
                        },
                        customClass: "w-12",
                    })
                        .addRow({ label: "Verze" })
                        .addField("gselectbox", Gordic.Prefabs.Number.withOperators({ defaultOperator: "=", operators: ["="] }), {
                        name: "verze",
                        dropdown: true,
                        strict: false,
                        //initialValue: 524, //(that.userSettings?.get("verze") != null ? (that.userSettings?.get("verze")) : that.verze[that.verze.length - 1]), //that.verze[that.verze.length - 1], //zajisti aktualni verzi,	  //that.userSettings?.get("verze"),
                        data: [524, 525, 526],
                        customClass: "w-10",
                    })
                        .addRow({ label: "jres:33177007", customClass: "w-6" }) //RC 33177007 : Včetně sestav
                        .addField("gcheck", {
                        name: "sestavy",
                        customClass: "w-2 gcheck-switch",
                        initialValue: false,
                        tooltip: "jres:33177006", //RC 33177006 : Včetně programových fází sestav
                        change: function (ev, changeObj) {
                            if (changeObj.value == true) {
                                that.priz_ses = "priz_ses";
                            }
                            else {
                                that.priz_ses = "";
                            }
                        },
                    })
                        .addRow({ label: "jres:33177004", customClass: "w-6" }) //RC 33177004 : atestace NSESSS
                        .addField("gcheck", {
                        name: "atestace",
                        customClass: "w-2 gcheck-switch",
                        initialValue: false,
                        tooltip: "jres:33177005", //RC 33177005 : popisy změn oproti atestované verzi
                        change: function (ev, changeObj) {
                            that.tagySearchAtestace = [];
                            if (changeObj.value == true) {
                                if (that.tagySearch.length != 0) {
                                    for (var i = 0; i < that.tagySearch.length; i++) {
                                        that.tagySearchAtestace.push(that.tagySearch[i]);
                                    }
                                }
                                const index = that.tagySearchAtestace.indexOf("atestace_essl");
                                if (index > -1) { // only splice array when item is found
                                    that.tagySearchAtestace.splice(index, 1); // 2nd parameter means remove one item only
                                }
                                that.tagySearchAtestace.push("atestace_essl");
                                that.element.findForms().findFields("tagyVyber").gfield("setValue", that.tagySearchAtestace);
                            }
                            else {
                                if (that.tagySearch.length != 0) {
                                    for (var i = 0; i < that.tagySearch.length; i++) {
                                        that.tagySearchAtestace.push(that.tagySearch[i]);
                                    }
                                }
                                if (that.tagySearchAtestace.length != 0) {
                                    const index = that.tagySearchAtestace.indexOf("atestace_essl");
                                    if (index > -1) { // only splice array when item is found
                                        that.tagySearchAtestace.splice(index, 1); // 2nd parameter means remove one item only
                                    }
                                }
                                that.element.findForms().findFields("tagyVyber").gfield("setValue", that.tagySearchAtestace);
                            }
                        },
                    });
                    return filterForm;
                }
                getMdProcessor() {
                    var that = this;
                    return Gordic.Markdown.getMDProcessor()
                        .then(function (ret) {
                        that.MDProcessor = ret;
                    });
                }
                /**
                 * createMainTagPanel	- Zobrazení hlavních tagů do panelu
                 */
                createMainTagsPanel() {
                    const that = this;
                    //Profilové akce
                    var profileActions = new GActionList({
                        actConfiguration: {
                            caption: "Nastavení pohledu", //Nastavení pohledu
                            icon: "fa-cog",
                            captionVisible: "never",
                            run: function (ev, ctx) {
                                that.configProfile(ctx.profile);
                            }
                        },
                    });
                    var mainWrapperPanel = $.newDiv("main-wrapper").appendTo(that.element).css({ /*"display": "inline-block",/* "border-bottom": "1px solid grey",*/ /* "margin": "1px",*/ /*"margin-bottom": "5px",*/ "margin-top": "5px", "margin-left": "7px", "margin-right": "5px", /*"border-top": "solid gray 1px", "border-left": "solid gray 1px", "border-right": "solid gray 1px",*/ "height": "35px", "color": "black", "vertical-align": "middle" }).addClass("g-state-lightbackground g-state-inactive"); // novy panel, kam presuneme/vytvorime aktualni queue
                    var mainPanel = $.newDiv("main-panel");
                    mainWrapperPanel.append(mainPanel);
                    //search field
                    mainWrapperPanel.append($.newSpan().css({ "height": "1rem", "margin-left": "5px" }).gstringbox({
                        name: "searchField",
                        placeholder: "Hledat v přehledu...",
                        states: [{ icon: "fa-search g-state-inactive", align: "opposite" }],
                        customClass: "w-2",
                        change: function (ev) { ev.stopPropagation(); },
                        initialValue: that.searchValue // (that.searchValue != "" ? that.searchValue : null)
                    }).on({
                        "input": (ev, target) => {
                            that.filterData($(ev.currentTarget).gfield("getValue"));
                            return;
                        },
                    }).css({ "border-left": "1px solid $base-color-tool", "border-right": "1px solid $base-color-tool", "height": "1rem", "position": "relative", "float": "inline-start", "vertical-align": "left", /*"height": "20px",*/ /*"margin": "8px", */ "margin-top": "5px", /*"text-align": "center"*/ }));
                    //Akce pro Export
                    mainWrapperPanel.append($.newSpan().css({ "height": "1rem", "margin-right": "1px" }).gbutton({
                        params: { action: that.actions.actExport }
                    }).css({ "border-left": "1px solid $base-color-tool", "border-right": "1px solid $base-color-tool", "height": "1rem", "position": "relative", "float": "inline-end", "vertical-align": "right", /*"height": "20px",*/ /*"margin": "8px", */ "margin-top": "3px", "text-align": "center" }).prop("actions", profileActions));
                    //Výber pohledu
                    mainWrapperPanel.append($.newSpan().css({ "height": "1rem", "margin-right": "2px" }).gselectbox({
                        name: "viewZmeny",
                        dropdown: true,
                        data: ["Výchozí pohled", "Programové fáze"],
                        initialValue: "Výchozí pohled",
                        graphicInput: "hidden",
                        smartNavigation: false,
                        itemTemplate: function (data) {
                            var text = Gordic.Templates.Formatters.encode(data);
                            if (data)
                                text = "<i>" + text + "</i>";
                            else if (data)
                                text = "<b>" + text + "</b>";
                            return "<i>" + text + "</i>";
                        },
                        customClass: "w-2",
                        change: function (ev, ctx) {
                            if (ctx.value == "Výchozí pohled") {
                                that.typView = 1;
                                that._createChangeLog();
                            }
                            if (ctx.value == "Programové fáze") {
                                that.typView = 2;
                                if (that.viewZmeny != undefined && that.viewZmeny.getDataRows().length != 0) {
                                    that._createChangeLog();
                                }
                            }
                        },
                    }).css({ "border-left": "1px solid $base-color-tool", "border-right": "1px solid $base-color-tool", "height": "1rem", "position": "relative", "float": "inline-end", "vertical-align": "right", /*"height": "20px",*/ /*"margin": "8px", */ "margin-top": "5px", "text-align": "center" }).prop("actions", profileActions));
                    that.createMainLogsPanel();
                }
                configProfile(profile) {
                    var dlg = this.dialogs.showModalWindow("", {}, { width: 980, height: 650, /*related: this.element[0]*/ })
                        .on("closed", function (ev, retVal) { });
                    return dlg;
                }
                /**
                * nastavit data
                */
                _createChangeLog() {
                    const that = this;
                    ////that.beginOperation("Načítání popisů změn");
                    that.mainLogsPanel.children().remove();
                    //VLASTNI GTABLA
                    that.viewZmeny;
                    if (that.resSearch == true) {
                        that.gridFormat = this.createGridFormat();
                        that._create();
                    }
                    else {
                        that.dat_od = that.element.findFields("dat_zmena").gfield("getValue").date.start;
                        that.dat_do = that.element.findFields("dat_zmena").gfield("getValue").date.end;
                        that.DataFilter = {};
                        that.DataFilter.aktivita = 100;
                        that.DataFilter.dat_od = that.dat_od;
                        that.DataFilter.dat_do = that.dat_do;
                        that.DataFilter.popis = that.priz_ses;
                        that.DataFilter.fazeField = that.element.findForms().findFields("faze").gfield("getValue"); //that.fazeSearch
                        that.DataFilter.dat_od.setDate(that.dat_od.getDate() + 1);
                        that.DataFilter.dat_do.setDate(that.dat_do.getDate() + 1);
                        //Doplněn filtr na verzi
                        var verze = that.element.findForms().findFields("verze").gfield("getValue");
                        if (verze != null && verze.toString().length != 0) {
                            verze = verze.toString();
                            if (!that.DataFilter.fazeField?.includes(verze)) {
                                that.DataFilter.fazeField?.push(verze);
                            }
                        }
                        //Konec filtru na verzi
                        this.call("NactiData", { VstupniData: that.DataFilter, tagyData: that.tagySearch }) //promise serveru //u call v TS se zadava typ navratove hodnoty <GPopisyZmenDto[]>
                            .done(function (data) {
                            //that.isl.Zmena.listPopisyZmen({ filters: { dat_od: that.dat_od, dat_do: that.dat_do, faze: that.fazeSearch, verze: that.verzeSearch, tag: that.tagySearch, legZmena: that.legZmenySearch } }).getData().done((data) => {
                            //Groupování
                            //Odebrat řádky, které nemají v tagu revizi příslušné fáze (je-li zadán filtr na fázi/fáze)
                            //Změna třídění dat - sestavy až na konec seznamu 
                            for (var i = 0; i < data.length; i++) {
                                if (data[i] != null && data[i] != undefined && data[i].kotva != null && data[i].kotva != undefined) {
                                    var test = data[i].kotva?.toString().substring(0, 2);
                                    if (data[i].kotva?.toString().substring(0, 2) == "20" /*&& data[i].tagy?.toString().length >= 12*/) {
                                        data[i].kotva = "90" + data[i].kotva?.toString().substring(2, data[i].kotva?.toString().length);
                                    }
                                }
                            }
                            var dataFiltered = [];
                            if (that.DataFilter?.fazeField != undefined) {
                                for (var j = 0; j < that.DataFilter?.fazeField.length; j++) {
                                    for (var i = 0; i < data.length; i++) {
                                        var tagyRadku = data[i].tagy?.split(";");
                                        if (tagyRadku) {
                                            var counter = 0;
                                            var ixsKmp;
                                            for (var k = 0; k < tagyRadku.length; k++) {
                                                if (that.DataFilter?.fazeField[j]?.length > 4) {
                                                    var test1 = that.DataFilter?.fazeField[j]?.toString().substring(3, 8);
                                                }
                                                //var test1 = that.DataFilter?.fazeField[j]?.substring(3, 8);
                                                var test2 = tagyRadku[k].substring(2, 7);
                                                if (tagyRadku[k].length >= 12 && that.DataFilter?.fazeField[j]?.length > 4 && that.DataFilter?.fazeField[j].substring(3, 8) == tagyRadku[k].substring(2, 7)) {
                                                    counter++;
                                                    ixsKmp = data[i].ixs_kmp;
                                                }
                                            }
                                            //Odebrání řádku
                                            if (counter != 0) {
                                                dataFiltered.push(data[i]);
                                            }
                                        }
                                    }
                                }
                            }
                            if (dataFiltered.length != 0) {
                                data = dataFiltered;
                            }
                            //Konec odebrání nechtěnných řádků
                            that.viewZmeny = new Gordic.Data.View(data, { key: "ixs_kmp" });
                            that.viewZmenyOrig = new Gordic.Data.View(data, { key: "ixs_kmp" });
                            that.viewSearchZmeny = new Gordic.Data.View(data, { key: "ixs_kmp" });
                            if (that.typView == 0) {
                                that.viewZmeny = new Gordic.Data.View(data, { key: "ixs_kmp" });
                            }
                            else if (that.typView == 1) {
                                var groupList = [];
                                var dleTypuZmeny = {
                                    defaultState: "open",
                                    hash: (meta, rows) => {
                                        return `${meta.data["typ_zmeny_kmp_txt"]}`;
                                    },
                                    aggregate: Gordic.Data.Aggregates.max("kotva"),
                                    sort: "kotva,!poznamky",
                                };
                                var dleTypuZmenyPlusRevize = {
                                    defaultState: "open",
                                    hash: (meta, rows) => {
                                        var revize = meta.data.tagy?.split(';')[0];
                                        var tagyPole = meta.data.tagy?.split(";");
                                        var revizeSearch = "";
                                        var revizeSearchField = [];
                                        if (tagyPole != undefined) {
                                            var counter = 0;
                                            if (that.DataFilter?.fazeField != undefined && that.DataFilter?.fazeField.length != 0) {
                                                for (var j = 0; j < that.DataFilter?.fazeField.length; j++) {
                                                    for (var i = 0; i < tagyPole.length; i++) {
                                                        //var test1 = that.DataFilter?.fazeField[j]?.substring(3, 8);
                                                        var test2 = tagyPole[i].substring(2, 7);
                                                        if (tagyPole[i].length >= 12 && that.DataFilter?.fazeField[j]?.toString().substring(3, 8) == tagyPole[i].substring(2, 7)) {
                                                            revizeSearch = tagyPole[i];
                                                            revizeSearchField.push(tagyPole[i]);
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                for (var i = 0; i < tagyPole.length; i++) {
                                                    if (tagyPole[i].length >= 12) {
                                                        revizeSearch = tagyPole[i];
                                                        revizeSearchField.push(tagyPole[i]);
                                                    }
                                                }
                                            }
                                        }
                                        if (!(revizeSearch.length >= 12) && tagyPole != undefined) {
                                            revizeSearch = tagyPole[0];
                                        }
                                        if (revizeSearch.substring(0, 2) == "90") {
                                            revizeSearch = "20" + revizeSearch.substring(2, revizeSearch.length);
                                        }
                                        return `${revizeSearch}`;
                                        //}
                                    },
                                    aggregate: Gordic.Data.Aggregates.max("kotva"),
                                    sort: "kotva,!poznamky",
                                };
                                groupList.push(dleTypuZmenyPlusRevize);
                                groupList.push(dleTypuZmeny);
                                that.viewZmeny.process({
                                    default: new Gordic.Data.Grouping(groupList),
                                });
                                that.viewZmenyOrig.process({
                                    default: new Gordic.Data.Grouping(groupList),
                                });
                            }
                            else if (that.typView == 2) {
                                var groupList = [];
                                var dleFaze = {
                                    defaultState: "open",
                                    hash: (meta, rows) => {
                                        var tagyPole = meta.data.tagy?.split(";");
                                        var fazeSearch = "";
                                        //var revizeSearch = "";
                                        var revizeSearchField = [];
                                        if (tagyPole != undefined) {
                                            if (that.DataFilter?.fazeField != undefined && that.DataFilter?.fazeField.length != 0) {
                                                for (var j = 0; j < that.DataFilter?.fazeField.length; j++) {
                                                    for (var i = 0; i < tagyPole.length; i++) {
                                                        if (tagyPole[i].length >= 12 && that.DataFilter?.fazeField[j]?.toString().substring(3, 8) == tagyPole[i].substring(2, 7)) {
                                                            ////revizeSearch = tagyPole[i];
                                                            fazeSearch = tagyPole[i].substring(0, 7);
                                                            revizeSearchField.push(tagyPole[i]);
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                for (var i = 0; i < tagyPole.length; i++) {
                                                    if (tagyPole[i].length >= 12) {
                                                        ////revizeSearch = tagyPole[i];
                                                        fazeSearch = tagyPole[i].substring(0, 7);
                                                        revizeSearchField.push(tagyPole[i]);
                                                    }
                                                }
                                            }
                                        }
                                        if (!(fazeSearch.length >= 12) && tagyPole != undefined) {
                                            //revizeSearch = tagyPole[0];
                                            fazeSearch = tagyPole[0].substring(0, 7);
                                        }
                                        if (fazeSearch.substring(0, 2) == "41") {
                                            fazeSearch = fazeSearch.replace("41", "GWA");
                                        }
                                        else if (fazeSearch.substring(0, 2) == "40") {
                                            fazeSearch = fazeSearch.replace("40", "GSA");
                                        }
                                        else if (fazeSearch.substring(0, 2) == "42") {
                                            fazeSearch = fazeSearch.replace("42", "GWS");
                                        }
                                        else if (fazeSearch.substring(0, 2) == "43") {
                                            fazeSearch = fazeSearch.replace("43", "GSS");
                                        }
                                        else if (fazeSearch.substring(0, 2) == "32") {
                                            fazeSearch = fazeSearch.replace("32", "GIN");
                                        }
                                        else if (fazeSearch.substring(0, 2) == "90") {
                                            fazeSearch = fazeSearch.replace("90", "GMS");
                                        }
                                        else if (fazeSearch.substring(0, 2) == "20") {
                                            fazeSearch = fazeSearch.replace("20", "GMS");
                                        }
                                        //Získání názvu programové fáze
                                        let objFaze = that.fazeData.find(o => o.faze === fazeSearch);
                                        return `${fazeSearch + ' - ' + objFaze?.faze_txt}`;
                                        // Puvodni hash xxx
                                        //var firstTag = meta.data.tagy?.substr(0, 12)
                                        //var revize = meta.data.tagy?.split(';')[0];
                                        //var revize = meta.data.tagy?.split(';')[0];
                                        //var hashTypZmeny = `${meta.data["typ_zmeny_kmp_txt"]}`
                                        ////return `${hashTypZmeny[meta.data[""]]}`
                                        //return `${meta.data["typ_zmeny_kmp_txt"]}`
                                    },
                                    aggregate: Gordic.Data.Aggregates.max("kotva"),
                                    sort: "kotva,!poznamky",
                                };
                                var dleTypuZmeny = {
                                    defaultState: "open",
                                    hash: (meta, rows) => {
                                        return `${meta.data["typ_zmeny_kmp_txt"]}`;
                                    },
                                    aggregate: Gordic.Data.Aggregates.max("kotva"),
                                    sort: "kotva,!poznamky",
                                };
                                var dleRevize = {
                                    defaultState: "open",
                                    hash: (meta, rows) => {
                                        var tagyPole = meta.data.tagy?.split(";");
                                        var revizeSearch = "";
                                        var revizeSearchField = [];
                                        if (tagyPole != undefined) {
                                            if (that.DataFilter?.fazeField != undefined && that.DataFilter?.fazeField.length != 0) {
                                                for (var j = 0; j < that.DataFilter?.fazeField.length; j++) {
                                                    for (var i = 0; i < tagyPole.length; i++) {
                                                        if (tagyPole[i].length >= 12 && that.DataFilter?.fazeField[j]?.toString().substring(3, 8) == tagyPole[i].substring(2, 7)) {
                                                            revizeSearch = tagyPole[i];
                                                            revizeSearchField.push(tagyPole[i]);
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                for (var i = 0; i < tagyPole.length; i++) {
                                                    if (tagyPole[i].length >= 12) {
                                                        revizeSearch = tagyPole[i];
                                                        revizeSearchField.push(tagyPole[i]);
                                                    }
                                                }
                                            }
                                        }
                                        if (!(revizeSearch.length >= 12) && tagyPole != undefined) {
                                            revizeSearch = tagyPole[0];
                                        }
                                        if (revizeSearch.substring(0, 2) == "90") {
                                            revizeSearch = "20" + revizeSearch.substring(2, revizeSearch.length);
                                        }
                                        return `${revizeSearch}`;
                                    },
                                    aggregate: Gordic.Data.Aggregates.max("kotva"),
                                    sort: "kotva,!poznamky",
                                };
                                groupList.push(dleFaze);
                                groupList.push(dleRevize);
                                groupList.push(dleTypuZmeny);
                                //groupList.push(dleTypuZmenyPlusRevize);
                                that.viewZmeny.process({
                                    default: new Gordic.Data.Grouping(groupList),
                                });
                                that.viewZmenyOrig.process({
                                    default: new Gordic.Data.Grouping(groupList),
                                });
                            }
                            //Konec Groupováví
                            that.gridFormat = that.createGridFormat();
                            that._create();
                            if (that.typView == 0) {
                                that.element.find("td.cell.c0").css({ "border-bottom": "0.5px solid #C6CDE0" });
                            }
                        });
                    }
                    //KONEC VLASTNI GTABLY
                }
                /**
                 * createMainLogsPanel	- Zobrazení popisů do panelu
                 */
                createMainLogsPanel() {
                    const that = this;
                    that.mainLogsPanel = $.newDiv("main-logs").appendTo(that.element).css({ /*"display": "inline-block",*/ "border": "5px solid #e5e8f0", "margin-left": "7px", "margin-right": "5px", /*"border-right": "solid gray 1px", "border-left": "solid gray 1px", "border-bottom": "solid gray 1px",*/ "color": "black", "vertical-align": "middle" }); /*.addClass("g-state-lightbackground g-state-inactive")*/ // novy panel, kam presuneme/vytvorime aktualni queue
                    var mainPanel = $.newDiv("main-logs-panel");
                    that.mainLogsPanel.gautofit().append(mainPanel);
                    var mainDiv = $.newDiv("mainDiv").appendTo(that.mainLogsPanel); //.gbutton({ params: { action: that.actions.actEditHist } })
                    //Počítadlo záznamů
                    that.element.append($.newSpan("counter").text("Počet: " + that.pocetZaznamu.pocet).css({
                        "color": "gray", "display": "inline-block", "position": "relative", "width": "200px", "letter-spacing": "normal", "margin-left": "40px", "margin-right": "8px", "text-align": "right", "vertical-align": "right", "float": "inline-end"
                    }));
                    //To do - proklik do ADT07?
                    //that.element.append($.newSpan("linkADT07").html("<a href='https://robot.gordic.cz/gordic/ginis/app/adt07/#' style='color: #1D3E8F;' target='_blank' rel='noopener noreferrer'>ADT07</a>").css({
                    //	"text-align": "left", "margin-left": "10px", "width": "50px"
                    //}))
                    that.createEmptyContent();
                }
                /** setnout data */
                createEmptyContent() {
                    const that = this;
                    var emptyForm = new Gordic.Forms.Form({
                        layoutDescriptor: "L2M2S1, L-3-7-2, M-3-7-2, S-12-12-0",
                        name: "prazdnyFormular",
                    });
                    emptyForm /*.addSection({customClass:"g-state-text g-state-info", label: " "})*/.addRow()
                        .addRow()
                        .addField("gstatic", {
                        name: "staticField",
                        customClass: "w-2",
                    })
                        .addField("gstatic", {
                        name: "staticField",
                        customClass: "w-2",
                    })
                        .addField("gstatic", {
                        name: "static",
                        icon: "fa-th-list g-state-text minifoto", //fa-exclamation-triangle g-state-text g-state-warning minifoto
                        customClass: "w-3 g-state-text g-state-inactive",
                    })
                        .addRow()
                        .addField("gstatic", {
                        name: "gstaticEmptyField",
                        customClass: "w-3",
                    })
                        .addField("gstaticfield", {
                        name: "staticStringField",
                        initialValue: "<i> Žádné popisy k zobrazení ",
                        //customClass: "g-state-text g-state-inactive"
                        customClass: "w-3 g-state-text g-state-inactive"
                    })
                        .addRow()
                        .addField("gstatic", {
                        name: "gstaticEmptyRowField",
                        customClass: "w-3",
                    })
                        .addField("gstaticfield", {
                        name: "staticStringField",
                        initialValue: "<i>...prosím načtěte data!",
                        //customClass: "g-state-text g-state-inactive"
                        customClass: "w-3 g-state-text g-state-inactive"
                    })
                        .addRow();
                    that.emptyForm = $.newDiv().appendTo(that.mainLogsPanel).gform("createFrom", emptyForm);
                }
                createGridFormat() {
                    const that = this;
                    var columnsDefinition = new Gordic.Data.GridFormat();
                    columnsDefinition
                        .addHtmlColumn({
                        name: "popis",
                        caption: "Popis změny", //RC 33111330 : Licence databáze
                        cellTemplate: (data) => {
                            //TODO: - Předělat defaultní zobrazení popisů pro typView = 1
                            var newEl = document.createElement("menuRowWrapper");
                            newEl.style.position = "relative";
                            newEl.style.display = "list-item";
                            newEl.style.marginLeft = "30px";
                            //newEl.before()
                            if (data.priz_verejny == 0) {
                                newEl.classList.add("changelog-item-style");
                            }
                            else {
                                newEl.classList.add("changelog-item-style-public");
                            }
                            //Konec akcí
                            var toAdd = document.createElement("wrapper");
                            var month = data.dat_zmena.substring(5, 7);
                            var day = data.dat_zmena.substring(8, 10);
                            var year = data.dat_zmena.substring(0, 4);
                            toAdd.title = "Zveřejněno: " + day + "." + month + "." + year; // + "\n" + "Autor popisu: " + data.zmenil;
                            //Určení revize
                            var tagyPole = data.tagy?.split(";");
                            var revizeSearch = "";
                            var revizeSearchField = [];
                            if (tagyPole != undefined) {
                                for (var i = 0; i < tagyPole.length; i++) {
                                    if (tagyPole[i].length >= 12) {
                                        revizeSearch = tagyPole[i];
                                        revizeSearchField.push(tagyPole[i]);
                                    }
                                }
                            }
                            if (!(revizeSearch.length >= 12) && tagyPole != undefined) {
                                revizeSearch = tagyPole[0];
                            }
                            //Konec určení revize
                            ////toAdd.id = revizeSearch;	 
                            var typPopDiv = document.createElement("typ-popis");
                            var intPozDiv = document.createElement("interni-poznamka");
                            var ixsKmpDiv = document.createElement("ixsKmp");
                            //Tagy - uložení do pole tagů
                            var poleTagyPopis = [];
                            if (data.tagy != null) {
                                poleTagyPopis = data.tagy.split(";");
                            }
                            //Konec uložení do pole
                            var newDiv = document.createElement("panel-popis"); //.createElement("panel-popis-" + Dto[i].ixs_kmp + "")
                            typPopDiv.innerHTML = data.typ_zmeny_kmp_txt + " ";
                            intPozDiv.innerHTML = (data.poznamky != undefined ? that.MDProcessor.render(data.poznamky) : data.poznamky);
                            //ixsKmpDiv.innerHTML = (data.ixs_kmp != undefined ? data.ixs_kmp : "");
                            //typPopDiv.className = (data.typ_zmeny_kmp_txt == "Oprava" ? "g-state-background g-state-info g-badge" : data.typ_zmeny_kmp_txt == "Novinka" ? "g-state-background g-state-success g-badge" : data.typ_zmeny_kmp_txt == "Známá chyba" ? "g-state-background g-state-warning g-badge" : data.typ_zmeny_kmp_txt == "Poznámka" ? "g-badge" : data.typ_zmeny_kmp_txt == "Legislativní změna" ? "g-state-background g-state-important g-badge" : "g-state-background g-state-inactive g-badge")
                            //if (data.typ_zmeny_kmp_txt == "Poznámka") {
                            //	typPopDiv.classList.add("changelog-typPoznamka");
                            //}
                            typPopDiv.classList.add("changelog-typ");
                            intPozDiv.classList.add("changelog-intPoz");
                            ixsKmpDiv.classList.add("changelog-id");
                            newDiv.classList.add("changelog-body"); //15.4.2024
                            //newDiv.innerHTML = that.MDProcessor.render(Dto[i].popis);
                            newDiv.innerHTML = (data.popis != undefined ? that.MDProcessor.render(data?.popis?.replace(/<\/?[^>]+(>|$)/g, "")) : data?.popis?.replace(/<\/?[^>]+(>|$)/g, ""));
                            if (that.typView == 0) {
                                toAdd.appendChild(typPopDiv);
                            }
                            var tagyDiv = document.createElement("tagy");
                            var popisDiv = document.createElement("popis");
                            popisDiv.innerHTML = (data.popis != undefined ? that.MDProcessor.render(that._unEscape(data.popis)) : that._unEscape(data.popis));
                            popisDiv.classList.add("changelog-text");
                            var plainText = (data.popis != undefined ? that.MDProcessor.render(data.popis) : "");
                            plainText = plainText.replace("<p>", "");
                            plainText = plainText.replace("</p>", "");
                            plainText = plainText.replace("/n", "");
                            //plainText = unescape(plainText) //plainText.replace(/&lt;.*&gt;/g, "");
                            popisDiv.innerHTML = plainText;
                            //Konec 17.4.2024
                            //Private / Public icona
                            //var visibleDiv = document.createElement("visible");
                            //var visibleIconDiv = document.createElement("visibleIcon");
                            //var verejnyPopis = data.priz_verejny;
                            //var icon = $.newDiv("visible-icon").appendTo(visibleIconDiv)
                            //if (verejnyPopis == 0) {
                            //	icon.append($("<icon>").gstatic({ icon: "gi-circle |gi-lock gi-stack-pos--rb gi-bgw", tooltip: "Jedná se o nevřejný popis změn", /*caption: "Tagy: "*/ })).css({ "color": "black", "position": "relative", "float": "center", "vertical-align": "-webkit-baseline-middle", "height": "20px", "margin-left": "7px", "display": "inline" });
                            //	//tagyDiv.appendChild(visibleIconDiv);
                            //	//newPanelOpravy.append($.newSpan().css({ "margin-top": "8px", "margin-left": "5px" }).gstatic({ icon: "fa-lock", tooltip: "Jedná se o nevřejný popis změn", /*caption: "Tagy: "*/ }).css({ "color": "black", "position": "relative", "float": "center", "vertical-align": "bottom", "height": "20px", "margin-left": "7px" }))
                            //}
                            //else {
                            //	icon.append($("<icon>").gstatic({ icon: "gi-circle |gi-users gi-stack-pos--rb gi-bgw", tooltip: "Jedná se o veřejný popis změn", /*caption: "Tagy: "*/ })).css({ "color": "black", "position": "relative", "float": "center", "vertical-align": "-webkit-baseline-middle", "height": "20px", "margin-left": "7px", "display": "inline" });
                            //	//tagyDiv.appendChild(visibleIconDiv);
                            //}
                            //visibleDiv.appendChild(visibleIconDiv);
                            //tagyDiv.appendChild(visibleIconDiv);
                            /////tagyDiv.innerHTML = (data.popis != undefined ? that.MDProcessor.render(data.popis) : data.popis)  //17.4.2024
                            tagyDiv.appendChild(popisDiv);
                            toAdd.appendChild(tagyDiv);
                            //toAdd.appendChild(intPozDiv);
                            toAdd.appendChild(ixsKmpDiv);
                            //var script = document.createElement("script")
                            //script.onload = function () {
                            //	var faze = "GWAHST05"
                            //};
                            ////script.setAttribute('type', 'text/javascript');
                            ////script.appendChild(document.createTextNode('const revision = 1'));
                            ////script.text = "Pokus"
                            //toAdd.appendChild(script)
                            newEl.appendChild(toAdd);
                            $(newEl).on("mouseover", function (ev) {
                                var stringTooltip = "<b>Souvisejcí tagy: </b>";
                                for (var i = 0; i < poleTagyPopis.length; i++) {
                                    stringTooltip = stringTooltip + "/n" + poleTagyPopis[i];
                                }
                                that.tooltipTagy = stringTooltip;
                                //that.actions.getActions().filter(obj => {
                                //	return obj.name === "actTagy"
                                //})[0].tooltip = "";
                                //$(ev.target).closest('div').css({ "background-color": "#F8F8F8", "border-left": "5px solid", "border-right": "1px solid", "border-top": "1px solid", "border-bottom": "1px solid", "border-color": "#FFFFFF" })   //#FCDDBF - light warning
                                if ($(ev.target).find("i.gi.gi-label")[0] != undefined) {
                                    //$(ev.target).find("i.gi.gi-label").on("mouseover", function (ev) { $(ev.target).find("i.gi.gi-label")[0].className = 'gi gi-label bold gi-rot180 fa-2x g-state-text g-state-active js-gbutton-primary-icon g-button__icon' })
                                    $(ev.target).find("i.gi.gi-label")[0].className = 'gi gi-label bold gi-rot180 fa-2x g-state-text g-state-active js-gbutton-primary-icon g-button__icon';
                                }
                            });
                            $(newEl).on("mouseout", function (ev) {
                                //$(ev.target).closest('div').css({ "background-color": "#F8F8F8", "border-left": "5px solid", "border-right": "1px solid", "border-top": "1px solid", "border-bottom": "1px solid", "border-color": "#FFFFFF" })   //#FCDDBF - light warning
                                if ($(ev.target).find("i.gi.gi-label")[0] != undefined) {
                                    $(ev.target).find("i.gi.gi-label")[0].className = 'gi gi-label gi-rot180 fa-2x g-state-text g-state-inactive js-gbutton-primary-icon g-button__icon';
                                }
                            });
                            return newEl;
                        }
                    });
                    return columnsDefinition;
                }
                //#region Create - Changelogs
                /**
                 * _create
                 * this.options.data je nahrazeno za this.viewZmeny
                 */
                _create() {
                    this.emptyForm.remove();
                    this._countItem = 0;
                    this._resizeWidthElement = {};
                    this._resizeWidthElement.class = "";
                    this._resizeWidthElement.width = 0;
                    this.groupingHeaderColumns = {
                        _default: {
                            structureLead: true,
                            name: "_defaultGroupHeader",
                            cellTemplate: Gordic.Templates.ensureTemplate("<b>{@structure.hash}</b> <span class='group-header-count'>({@structure.rows.length})</span>"),
                        }
                    };
                    this._styleElement = document.createElement("style");
                    this._styleElement.type = "text/css";
                    this._styleElement.innerHTML = "";
                    this.cssUid = "gtable_" + (this.uuid++);
                    this._columnsSetting();
                    this.element.addClass("gtable").addClass(this.cssUid);
                    this._content = document.createElement("table");
                    this._content.className = "g-table-main";
                    this.element.append(this._content);
                    this.mainLogsPanel.append(this._content);
                    if (this.viewZmeny != undefined)
                        this.setData(this.viewZmeny);
                    var head = document.head || document.getElementsByTagName('head')[0];
                    head.appendChild(this._styleElement);
                    //this._initResizeManager();
                }
                _unEscape(htmlStr) {
                    htmlStr = htmlStr?.replace(/&lt;/g, "<");
                    htmlStr = htmlStr?.replace(/&gt;/g, ">");
                    htmlStr = htmlStr?.replace(/&quot;/g, "\"");
                    htmlStr = htmlStr?.replace(/&#39;/g, "\'");
                    htmlStr = htmlStr?.replace(/&amp;/g, "&");
                    htmlStr = htmlStr?.replace(/(<([^>]+)>)/ig, '');
                    htmlStr = htmlStr?.replace(/<\/[^>]+(>|$)/g, "");
                    htmlStr = htmlStr?.replace(/end\bend/g, "");
                    return htmlStr;
                }
                /**
                 * _columnsSetting
                 * this.options.columns je nahrazeno za this.gridFormat
                 */
                _columnsSetting() {
                    const that = this;
                    var cols = (this.gridFormat instanceof Gordic.Data.GridFormat) ? this.gridFormat.columns.slice() : (this.gridFormat != undefined) ? this.gridFormat : [];
                    this._columns = [];
                    this._headers = [];
                    var j = 0;
                    for (var i = 0; i < cols.length; i++) {
                        if (cols[i].hidden && cols[i].hidden == true)
                            continue;
                        var column = cols[i];
                        if (column.minWidth && (this._resizeWidthElement.width < column.minWidth)) {
                            this._resizeWidthElement.width = column.minWidth;
                            this._resizeWidthElement.class = ".c" + j;
                        }
                        if (column.width)
                            this._styleElement.innerHTML += ".{0} .c{1} {{width: {2} rem\n}}".format(this.cssUid, j, column.width / 16);
                        column.hidden = (cols[i].hidden) ? cols[i].hidden : false;
                        column.align = (cols[i].align) ? cols[i].align : "left";
                        var format = column.formatPreset && column.formats && column.formats[column.formatPreset] ? column.formats[column.formatPreset].format : column.format;
                        column.cellTemplate = Gordic.Templates.ensureTemplate(column.cellTemplate != null ? column.cellTemplate : "{" + (column.field != undefined ? column.field : column.name) + (format ? ":" + format : "") + "}");
                        column.headerTemplate = (cols[i].headerTemplate) ? Gordic.Templates.ensureTemplate(column.headerTemplate) : null;
                        var name = document.createElement("span");
                        name.classList.add("g-table-responsive-header");
                        var caption = column.caption != null ? column.caption : cols[i].name != null ? "<i>{0}</i>".format(column.name) : "";
                        if (column.headerTemplate != undefined && column.headerTemplate != null) {
                            var cellContent = column.headerTemplate.render(column, { cell: name, column: column, columnIndex: i });
                            if (cellContent == null)
                                caption = "";
                            else if (typeof cellContent === "string" || typeof cellContent === "number")
                                caption = cellContent.toString();
                            else {
                                caption = "";
                                $(name).append(cellContent);
                            }
                        }
                        name.innerHTML = /*"<b>" + */ caption /* + "</b>"*/;
                        this._headers.push(name);
                        this._columns.push(column);
                        j++;
                    }
                }
                /**
                 * setData
                 *
                 * @param {any} data
                 */
                setData(data) {
                    var _this = this;
                    var dataView;
                    if (!data)
                        dataView = new Gordic.Data.View();
                    else if (data instanceof Gordic.Data.View)
                        dataView = data;
                    else if (Array.isArray(data))
                        dataView = new Gordic.Data.View(data);
                    else {
                        console.log("gtable.setData - neznamy typ vstupnich dat");
                        dataView = new Gordic.Data.View();
                    }
                    if (this._data) {
                        this._data.off(this.element[0].className);
                    }
                    this._data = dataView;
                    this._data.on("change.{0}".format(this.cssUid), (opts) => {
                        this._reloadData();
                    });
                    this._data.refresh();
                    this._reloadData();
                    this.endOperation();
                }
                _reloadData() {
                    const that = this;
                    this._content.innerHTML = ""; //xxx
                    var rows = this._createRows(this._data);
                    var thead = document.createElement("thead");
                    thead.appendChild(rows[0]);
                    this._content.appendChild(thead);
                    var tbody = document.createElement("tbody");
                    for (var i = 1; i < rows.length; i++)
                        tbody.appendChild(rows[i]);
                    this._content.appendChild(tbody);
                    //this._addMobileHeaders()
                    var el = this.element.find("[data-row-index='{0}']".format(this.numberRow))[0];
                    if (el != undefined && el != null) {
                        this.element.animate({ scrollTop: this.element.find("[data-row-index='{0}']".format(this.numberRow)).offset()?.top }, 1000);
                    }
                    if (Gordic.Utils.WidgetExists("gform", that.emptyForm)) {
                        that.emptyForm.remove();
                    }
                    //Počet záznamů
                    $(that.element.find("span.counter"))[0].innerText = "Počet: " + that.viewZmeny.getCount();
                }
                /**
                 * _createRows
                 *
                 * @param {Gordic.Data.View} data
                 * @returns {HTMLTableRowElement[]}
                 */
                _createRows(data) {
                    var _this = this;
                    var renderRows = new Array();
                    var itemCount = data.getCount("view");
                    var rows = this._analyzeData(data.getRows(true));
                    var isLastIsVirtual = false;
                    var rowCount = 0;
                    var level = 0;
                    var headerRowId = 0;
                    if (itemCount == 0) {
                        ////var trHeader = this._renderHeaderRow(level, headerRowId, "");
                        headerRowId++;
                        ////renderRows.push(trHeader);
                        var emptyRow = document.createElement("tr");
                        var emptyValue = document.createElement("td");
                        emptyValue.className = "gtable-empty";
                        ////emptyValue.colSpan = trHeader.children.length;
                        emptyValue.innerHTML = "<i><b>Žádné popisy změn k zobrazení!</b></i>"; //RC 33000005 : Žádná data k zobrazení.
                        emptyRow.appendChild(emptyValue);
                        renderRows.push(emptyRow);
                    }
                    //var trHeader = this._renderHeaderRow(level);
                    //renderRows.push(trHeader);
                    for (var i = 0; i < itemCount; i++) {
                        var cells = new Array();
                        var trueColumns = new Array();
                        var isGroupRow = rows[i]._isVirtual === true && !!rows[i].structure;
                        if (isGroupRow == true) {
                            level = rows[i].structure.level;
                            if (i == 0) {
                                ////var trHeader = this._renderHeaderRow(level, headerRowId, "");
                                headerRowId++;
                                ////trHeader.classList.add("virtual-header");
                                ////renderRows.push(trHeader);
                            }
                        }
                        else {
                            if (isLastIsVirtual == true || i == 0) {
                                var pomVirtual = i - 1;
                                var headers = "";
                                if (pomVirtual != -1) {
                                    while (rows[pomVirtual]._isVirtual) {
                                        headers += rows[pomVirtual].groupId + " ";
                                        pomVirtual--;
                                        if (pomVirtual < 0)
                                            break;
                                    }
                                }
                                ////var trHeader = this._renderHeaderRow(level, headerRowId, headers);
                                ////renderRows.push(trHeader);
                                headerRowId++;
                            }
                        }
                        for (var j = 0; j < this._columns.length; j++) {
                            if (isGroupRow == true) {
                                var gid = rows[i].structure.groupingProc + "#" + rows[i].structure.groupingTier;
                                var gd = this.groupingHeaderColumns[gid] || this.groupingHeaderColumns[rows[i].structure.groupingProc] || this.groupingHeaderColumns._default;
                                trueColumns.push(gd);
                                isLastIsVirtual = true;
                                var cell = document.createElement("td");
                                cells.push(cell);
                                break;
                            }
                            else
                                isLastIsVirtual = false;
                        }
                        var row = this._renderDataRowValues((isGroupRow == true) ? trueColumns : this._columns, rows[i], i, level, headerRowId - 1); // header row -1, kvůle předchozí inkrementaci
                        row.setAttribute("data-row-index", rowCount.toString());
                        if (isGroupRow == true) {
                            row.classList.add("gtable-header"); //xxx
                            if (row.innerText.substr(0, 3) == "Nov") {
                                //row.classList.add("gtable-headerNewFeature");
                                row.classList.add("gtable-headerRevision");
                            }
                            else if (row.innerText.substr(0, 3) == "Leg") {
                                //row.classList.add("gtable-headerImportant");
                                row.classList.add("gtable-headerRevision");
                            }
                            else if (row.innerText.substr(0, 3) == "Opr") {
                                //row.classList.add("gtable-headerPatch");
                                row.classList.add("gtable-headerRevision");
                            }
                            else if (row.innerText.substr(0, 3) == "Zná") {
                                //row.classList.add("gtable-headerWarning");
                                row.classList.add("gtable-headerRevision");
                            }
                            else if (row.innerText.substr(0, 3) == "Poz") {
                                //row.classList.add("gtable-headerGray");
                                row.classList.add("gtable-headerRevision");
                            }
                            else if ((row.innerText.substr(0, 3) == "GWA") || (row.innerText.substr(0, 3) == "GSA") || (row.innerText.substr(0, 3) == "GWS") || (row.innerText.substr(0, 3) == "GSS") || (row.innerText.substr(0, 3) == "GIN") || (row.innerText.substr(0, 3) == "GMS")) {
                                row.classList.add("gtable-headerFaze");
                            }
                            else {
                                row.classList.add("gtable-headerRevision");
                            }
                            row.classList.add("gtable-headerColor");
                            //var script = document.createElement("script")
                            //script.setAttribute('type', 'text/javascript');
                            //script.appendChild(document.createTextNode('alert(1)'));
                            //row.appendChild(script)
                            if (rows[i].structure.level == 0)
                                //xxx
                                row.classList.add("gtable-header-" + rows[i].structure.level);
                        }
                        else {
                            //row.classList.add("gtable-row");
                            //row.id = this.cssUid + "_" + i;
                            //var rowClass = typeof this.options.rowsClass == "string" ? " " + this.options.rowsClass : $.isFunction(this.options.rowsClass) ? " " + this.options.rowsClass.call(this.element[0], rows[i], trueColumns, i) : "";
                            //row.className += " " + rowClass.trim();
                        }
                        if (isGroupRow == true) {
                            //this.element.on("click", String.Format("*[data-row-index='{0}']", rowCount), function (ev) { _this._actionClick(this); })
                        }
                        rowCount++;
                        renderRows.push(row);
                    }
                    return renderRows;
                }
                /**
                 * _actionClick
                 *
                 * @param {any} element
                 */
                _actionClick(element) {
                    if (element.rowIndex != -1) {
                        this.numberRow = parseInt(element.attributes["data-row-index"].nodeValue);
                        var meta = this._data.getRows(true, this.numberRow, 1)[0];
                        if ($.isFunction(meta.structure && meta.structure.interaction))
                            meta.structure.interaction();
                    }
                }
                /**
                 * _analyzeData
                 *
                 * @param {any[]} rows
                 * @returns {any[]}
                 */
                _analyzeData(rows) {
                    var groupsId = new Array();
                    var currentLevel = 0;
                    groupsId.push(0, 0);
                    var groupNameArray = new Array();
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i].structure) {
                            if (rows[i].structure.level != null && rows[i].structure.level != undefined) {
                                if (rows[i]._isVirtual == true && currentLevel == rows[i].structure.level)
                                    groupNameArray.pop();
                                if (currentLevel > rows[i].structure.level) {
                                    for (var m = 0; m <= (currentLevel - rows[i].structure.level) + 1; m++)
                                        groupNameArray.pop();
                                    for (var j = rows[i].structure.level + 1; j < groupsId.length; j++)
                                        groupsId[j] = 0;
                                }
                                currentLevel = rows[i].structure.level;
                                groupsId[rows[i].structure.level]++;
                                var groupName = "{0}_group".format(this.cssUid);
                                for (var k = 0; k < groupsId.length; k++) {
                                    if (groupsId[k] != 0)
                                        groupName += "_{0}".format(groupsId[k]);
                                }
                                rows[i].groupId = groupName;
                                groupNameArray.push(groupName);
                            }
                        }
                        else {
                            rows[i].headers = groupNameArray.join(' ');
                        }
                    }
                    return rows;
                }
                /**
                 * _renderHeaderRow
                 *
                 * @param {any} level
                 * @param {any} headerRowId
                 * @param {string} group
                 * @returns {HTMLTableRowElement}
                 */
                _renderHeaderRow(level, headerRowId, group) {
                    var hrow = document.createElement('tr');
                    var hcellEmpty = document.createElement("td");
                    hcellEmpty.className = "left empty";
                    hrow.classList.add("gtable-hrow");
                    for (var i = 0; i < this._columns.length; i++) {
                        var hcell = document.createElement('th');
                        hcell.scope = "col";
                        if (hrow.children.length == 0) {
                            hcell.setAttribute("style", "padding-left:{0}px".format(((level * 12) + 0)));
                            hcellEmpty.setAttribute("style", "padding-left:{0}px".format(((level * 12) + 0)));
                        }
                        var tc = this._columns[i];
                        var caption = tc.caption != null ? tc.caption : tc.name != null ? "<i>" + tc.name + "</i>" : "";
                        if (tc.headerTemplate) {
                            var cellContent = tc.headerTemplate.render(tc, { cell: hcell, column: tc, columnIndex: i });
                            if (cellContent == null)
                                caption = null;
                            else if (typeof cellContent === "string" || typeof cellContent === "number")
                                caption = cellContent;
                            else {
                                caption = null;
                                $(hcell).append(cellContent);
                            }
                        }
                        if (tc.align)
                            hcell.classList.add(tc.align);
                        else
                            hcell.classList.add("left");
                        if (caption)
                            $("<span class='caption'>").html(caption).gtooltip({ caption: tc.displayCaption || tc.caption, tooltip: tc.description, showCaption: function () { return true; } }).appendTo(hcell);
                        if (hcell.innerHTML == "")
                            hcell = hcellEmpty;
                        hcell.id = "{0}_col_{1}_{2}".format(this.cssUid, headerRowId, i);
                        if (group != "")
                            hcell.headers = group;
                        hrow.appendChild(hcell);
                    }
                    return hrow;
                }
                /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
                _renderDataRowValues(trueColumns, meta, rowIndex, level, headerRowId) {
                    var row = document.createElement("tr");
                    for (var i = 0; i < trueColumns.length; i++) {
                        var tc = trueColumns[i];
                        var cell;
                        if (trueColumns[0].structureLead) {
                            cell = document.createElement("th");
                            cell.id = "{0}_col_{1}".format(this.cssUid, i);
                            cell.scope = "colgroup";
                        }
                        else {
                            cell = document.createElement("td");
                            cell.headers = meta.headers + " {0}_col_{1}_{2}".format(this.cssUid, headerRowId, i);
                        }
                        if (i == 0)
                            cell.setAttribute("style", "padding-left:" + "5px"); //cell.setAttribute("style", "padding-left:" + ((level * 12) + 15) + "px")
                        if (meta._isVirtual) {
                            cell.id = meta.groupId;
                        }
                        if (tc.hidden == false || tc.structureLead == true) {
                            cell.className = "cell c" + i;
                            var cc = trueColumns[i].customClass;
                            if ($.isFunction(cc))
                                cc = cc.call(this.element[0], meta, trueColumns[i], rowIndex); // TS: skoro kazda itemova customClass muze obsahovat delegata
                            if (cc)
                                cell.classList.add(...cc.split(" ").filter(item => !!item));
                            if (tc.align == "right")
                                cell.classList.add("right");
                            cell.setAttribute("data-column-index", i.toString());
                            var cellContent = tc.cellTemplate.render(meta.data, meta, { widget: this.element, cell: cell, column: tc, rowIndex: rowIndex, init: true });
                            if (cellContent != null) {
                                if (typeof cellContent === "string" || typeof cellContent === "number")
                                    cell.innerHTML = "<div>" + cellContent.toString() + "</div>";
                                else if (cellContent instanceof HTMLElement || cellContent instanceof jQuery)
                                    $(cell).html(cellContent);
                                else
                                    cell.innerHTML = JSON.stringify(cellContent);
                            }
                            if (meta.structure)
                                cell.innerText = cell.innerText;
                        }
                        if (tc.structureLead && tc.structureLead == true) {
                            cell.colSpan = this._columns.length;
                            var icon = "";
                            switch (meta.structure && meta.structure.state) {
                                case "closed":
                                    icon = "fa fa-chevron-right";
                                    break;
                                case "open":
                                    icon = "fa fa-chevron-down";
                                    break;
                            }
                            var badge = "";
                            //if (cell.innerText.substr(0, 3) == "Nov") {
                            //	badge = "<typ-popis class='g-state-background g-state-success g-badge changelog-typ'>Novinky</typ-popis>"
                            //}
                            //else if (cell.innerText.substr(0, 3) == "Leg") {
                            //	badge = "<typ-popis class='g-state-background g-state-important g-badge changelog-typ'>Legislativní změny</typ-popis>"
                            //}
                            //else if (cell.innerText.substr(0, 3) == "Opr") {
                            //	badge = "<typ-popis class='g-state-background g-state-info g-badge changelog-typ'>Opravy</typ-popis>"
                            //}
                            //else if (cell.innerText.substr(0, 3) == "Zná") {
                            //	badge = "<typ-popis class='g-state-background g-state-warning g-badge changelog-typ'>Známé chyby</typ-popis>"
                            //}
                            //else if (cell.innerText.substr(0, 3) == "Poz") {
                            //	badge = "<typ-popis class='g-badge changelog-typPoznamkaHeader'>Poznámky</typ-popis>"
                            //}
                            if (cell.innerText.substr(0, 3) == "Nov") {
                                badge = "<typ-popis>Novinky</typ-popis>";
                                cell.style.cursor = "auto";
                                //cell.setAttribute("style", "cursor:auto")
                            }
                            else if (cell.innerText.substr(0, 3) == "Leg") {
                                badge = "<typ-popis>Legislativní změny</typ-popis>";
                                cell.style.cursor = "auto";
                                //cell.setAttribute("style", "cursor:auto")
                            }
                            else if (cell.innerText.substr(0, 3) == "Opr") {
                                badge = "<typ-popis>Opravy</typ-popis>";
                                cell.style.cursor = "auto";
                                //cell.setAttribute("style", "cursor:auto")
                            }
                            else if (cell.innerText.substr(0, 3) == "Zná") {
                                badge = "<typ-popis>Známé chyby</typ-popis>";
                                cell.style.cursor = "auto";
                                //cell.setAttribute("style", "cursor:auto")
                            }
                            else if (cell.innerText.substr(0, 3) == "Poz") {
                                badge = "<typ-popis>Poznámky</typ-popis>";
                                cell.style.cursor = "auto";
                                //cell.setAttribute("style", "cursor:auto")
                            }
                            else if ((cell.innerText.substr(0, 3) == "GWA") || (cell.innerText.substr(0, 3) == "GSA") || (cell.innerText.substr(0, 3) == "GWS") || (cell.innerText.substr(0, 3) == "GSS") || (cell.innerText.substr(0, 3) == "GIN") || (cell.innerText.substr(0, 3) == "GMS")) {
                                cell.setAttribute("style", "background-color:#C6CDE0");
                                cell.setAttribute("style", "font-size:larger");
                                cell.setAttribute("style", "cursor:auto");
                                cell.setAttribute("style", "color:darkblue");
                                //cell.setAttribute("style", "padding-top:6px")
                                //cell.setAttribute("style", "padding-bottom:6px")
                                var begin = cell.innerText.substring(0, 4);
                                cell.innerText = cell.innerText.substring(cell.innerText.toString().length - 4, 4);
                                cell.innerText = begin + cell.innerText;
                                if (cell.innerText.substr(cell.innerText.length - 1, 1) == "(") {
                                    cell.innerText = cell.innerText.substring(0, cell.innerText.toString().length - 1);
                                }
                                cell.style.color = "#1D3E8F";
                                cell.style.fontSize = "larger";
                                cell.style.paddingLeft = "5px";
                                cell.style.paddingTop = "5px";
                                cell.style.paddingBottom = "6px";
                                cell.style.textAlign = "start";
                                cell.style.backgroundColor = "#C6CDE0";
                                cell.style.cursor = "auto";
                                cell.id = cell.innerText.substring(0, 8);
                            }
                            else {
                                cell.setAttribute("style", "font-size:larger");
                                cell.setAttribute("style", "text-align:start");
                                cell.setAttribute("style", "cursor:auto");
                                cell.setAttribute("style", "color:darkblue");
                                cell.setAttribute("style", "padding-top:15px");
                                cell.innerText = cell.innerText.slice(0, -4);
                                cell.style.color = "#1D3E8F";
                                cell.style.fontSize = "larger";
                                cell.style.paddingLeft = "5px";
                                cell.style.textAlign = "start";
                                cell.style.cursor = "auto";
                                cell.id = cell.innerText;
                                var script = document.createElement("script");
                                script.text = "var revision = window.location.hash.substring(1) \n  if(!revision){}else{let scrollToElm = document.getElementById('43AUT0152431X06') \n scrollToElm.scrollIntoView() }"; //document.getElementById(revision)	 
                                //script.importScript()
                                //.onload = function () {
                                //	var faze = "GWAHST05"
                                //	let scroll = document.getElementById("43AUT0152431X06")
                                //	scroll?.scrollIntoView()
                                //};
                                ////cell.append(script)
                            }
                            if (badge != "") {
                                var count = cell.innerText.substr(cell.innerText.indexOf("("), cell.innerText.length);
                                var counter = "<count class='changelog-counter'>" + count + "</count>";
                                cell.innerText = "";
                                cell.style.marginTop = "5px";
                                cell.style.textAlign = "start";
                                $(badge).prependTo(cell);
                                //$(counter).appendTo(cell);
                            }
                            else {
                                //$("<i><i class='{0}' /></i>".format(icon)).prependTo(cell);
                            }
                        }
                        row.appendChild(cell);
                    }
                    return row;
                }
                //#endregion
                /**
                 * createMainLogsPanel	- Vykreslení popisů změn dané verze do main panelu
                 */
                createMainLogsPanelVersion() {
                    if (this.mainLogsPanelVersion != undefined) {
                        this.mainLogsPanelVersion.remove();
                    }
                    const that = this;
                    that.beginOperation("Generování dat");
                    that.mainLogsPanelVersion = $.newDiv("main-logsVersion").appendTo(that.mainLogsPanel).css({ /*"display": "inline-block",*/ "border": "5px solid #e5e8f0", "margin": "5px", /*"margin-bottom": "5px", "margin-top": "5px", "height": "35px",*/ "color": "black", "vertical-align": "middle", "display": "none" }); /*.addClass("g-state-lightbackground g-state-inactive")*/ // novy panel, kam presuneme/vytvorime aktualni queue
                    var mainPanelVersion = $.newDiv("main-logs-panelVersion");
                    that.mainLogsPanelVersion.gautofit().append(mainPanelVersion);
                    var verze = that.dataExport.substring(that.dataExport.length - 3, that.dataExport.length);
                    if (that.dataExport.substring(that.dataExport.length - 3, that.dataExport.length) == "524") {
                        that._createChangeLogVersion("524");
                    }
                    else {
                        that._createChangeLogVersion("525");
                    }
                    setTimeout(function () {
                        that.mainLogsPanelVersion.hide("fast");
                        that.endOperation();
                        that.notification("add", { icon: "fa-check-circle g-state-text g-state-success", id: "DownloadChangelogFile", state: "success", title: "Export dat", content: "Přehled změn byl úspěšně vygenerován" });
                        if (that.dataFormat == "HTML") {
                            var exportHtml;
                            var html;
                            exportHtml = that.mainLogsPanelVersion[0]; //exportHtmlTest   //.outerHTML //.innerHTML
                            exportHtml = that.getOuterHTMLWithInlineStyle(that.mainLogsPanelVersion[0]);
                            //styleHtml = getComputedStyle(that.mainLogsPanel[0]).cssText	  //getComputedStyle(that.mainLogsPanel[0]).cssText
                            html = "<!DOCTYPE html><html><head><title>Changelog HTML generated report</title><meta charset='UTF-8'><style>"
                                + "." + that.mainLogsPanelVersion[0]?.children[0]?.className
                                + "{" + exportHtml + "}"
                                + "</style></head><body>"
                                + exportHtml + "</body></html>";
                            that.downloadInnerHtmlVersion('changelog' + verze + '.html', 'main-logsVersion', 'text/html', that.dataExport, that.dataFormat);
                        }
                        else if (that.dataFormat == "DOCX") {
                            that.downloadInnerHtmlVersion('changelog' + verze + '.doc', 'main-logsVersion', 'application/msword', that.dataExport, that.dataFormat);
                        }
                        else if (that.dataFormat == "TEXT") {
                            that.downloadInnerHtmlVersion('changelog' + verze + '.txt', 'main-logsVersion', 'text/plain', that.dataExport, that.dataFormat);
                        }
                        //Download dat za verzi
                        //var link = document.createElement('a');
                        ////link.append(test)
                        ////mimeType = mimeType || 'text/plain';
                        //link.setAttribute('download', 'changelog524.html');
                        //if (html) {
                        //	link.setAttribute('href', 'data:' + 'main-logsVersion' + ';charset=utf-8,' + /*encodeURIComponent(exportHtml)*/ encodeURIComponent(/*exportHtml*/html));
                        //}
                        //link.click();
                    }, 5000);
                }
                /**
                * nastavit data
                */
                _createChangeLogVersion(version) {
                    const that = this;
                    that.mainLogsPanelVersion.children().remove();
                    that.dat_od = that.element.findFields("dat_zmena").gfield("getValue").date.start;
                    that.dat_do = that.element.findFields("dat_zmena").gfield("getValue").date.end;
                    that.DataFilterVersion = {};
                    that.DataFilterVersion.aktivita = 100;
                    that.DataFilterVersion.dat_od = that.dat_od;
                    that.DataFilterVersion.dat_do = that.dat_do;
                    that.DataFilterVersion.popis = that.priz_ses;
                    that.DataFilterVersion.dat_od.setDate(that.dat_od.getDate() + 1);
                    that.DataFilterVersion.dat_do.setDate(that.dat_do.getDate() + 1);
                    //Filtr na verzi popisu zmň
                    //Konec filtru na verzi
                    //VLASTNI GTABLA
                    this.call("NactiData", { VstupniData: that.DataFilterVersion, tagyData: [] })
                        .done((data) => {
                        //Groupování
                        that.viewZmenyVersion = new Gordic.Data.View(data, { key: "ixs_kmp" });
                        if (that.typView == 0) {
                            that.viewZmenyVersion = new Gordic.Data.View(data, { key: "ixs_kmp" });
                        }
                        else if (that.typView == 1) {
                            //xxx
                            //for (var i = 0; i < data.length; i++) {
                            //	var tagyRadku = data[i].tagy?.split(";");
                            //	if (tagyRadku) {
                            //		for (var j = 0; j < tagyRadku.length; j++) {
                            //			if (tagyRadku[j].substring(0, 2) == "20" && tagyRadku[j].length >= 12) {
                            //				tagyRadku[j] = "90" + tagyRadku[j].substring(2, tagyRadku[j].length)
                            //			}
                            //		}
                            //		var editTagy = "";
                            //		for (var k = 0; k < tagyRadku.length; k++) {
                            //			if (k == 0) {
                            //				editTagy = tagyRadku[k]
                            //			}
                            //			else {
                            //				editTagy = editTagy + ";" + editTagy[k]
                            //			}
                            //		}
                            //		data[i].tagy = editTagy
                            //	}
                            //}
                            //xxx
                            var groupList = [];
                            var dleTypuZmeny = {
                                defaultState: "open",
                                hash: (meta, rows) => {
                                    var firstTag = meta.data.tagy?.substr(0, 12);
                                    var revize = meta.data.tagy?.split(';')[0];
                                    var revize = meta.data.tagy?.split(';')[0];
                                    var hashTypZmeny = `${meta.data["typ_zmeny_kmp_txt"]}`;
                                    //return `${hashTypZmeny[meta.data[""]]}`
                                    return `${meta.data["typ_zmeny_kmp_txt"]}`;
                                },
                                aggregate: Gordic.Data.Aggregates.max("tagy"),
                                sort: "tagy",
                            };
                            var dleTypuZmenyPlusRevize = {
                                defaultState: "open",
                                hash: (meta, rows) => {
                                    var revize = meta.data.tagy?.split(';')[0];
                                    var tagyPole = meta.data.tagy?.split(";");
                                    var revizeSearch = "";
                                    var revizeSearchField = [];
                                    if (tagyPole != undefined) {
                                        var counter = 0;
                                        if (that.DataFilterVersion?.fazeField != undefined && that.DataFilterVersion?.fazeField.length != 0) {
                                            for (var j = 0; j < that.DataFilterVersion?.fazeField.length; j++) {
                                                for (var i = 0; i < tagyPole.length; i++) {
                                                    var test1 = that.DataFilterVersion?.fazeField[j].substring(3, 8);
                                                    var test2 = tagyPole[i].substring(2, 7);
                                                    if (tagyPole[i].length >= 12 && that.DataFilterVersion?.fazeField[j].substring(3, 8) == tagyPole[i].substring(2, 7)) {
                                                        revizeSearch = tagyPole[i];
                                                        revizeSearchField.push(tagyPole[i]);
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            for (var i = 0; i < tagyPole.length; i++) {
                                                if (tagyPole[i].length >= 12) {
                                                    revizeSearch = tagyPole[i];
                                                    revizeSearchField.push(tagyPole[i]);
                                                }
                                            }
                                        }
                                    }
                                    if (!(revizeSearch.length >= 12) && tagyPole != undefined) {
                                        revizeSearch = tagyPole[0];
                                    }
                                    //var revize = meta.data.tagy?.split(';');
                                    //var searchRev = "";
                                    //                        if (revize) {
                                    //	for (var i = 0; i < revize.length; i++) {
                                    //		if (revize[i].substring(0,2) == 'rev') {
                                    //			searchRev = revize[i]
                                    //		}
                                    //	}
                                    //                        }
                                    //                        if (revizeSearchField.length > 1) {
                                    //	return `${revizeSearchField}`
                                    //}
                                    //                        else {
                                    return `${revizeSearch}`;
                                    //}
                                },
                                aggregate: Gordic.Data.Aggregates.max("tagy"),
                                sort: "tagy",
                            };
                            groupList.push(dleTypuZmenyPlusRevize);
                            groupList.push(dleTypuZmeny);
                            that.viewZmenyVersion.process({
                                default: new Gordic.Data.Grouping(groupList),
                            });
                        }
                        else if (that.typView == 2) {
                            var groupList = [];
                            var dleTypuZmeny = {
                                defaultState: "open",
                                hash: (meta, rows) => {
                                    return `${meta.data["typ_zmeny_kmp_txt"]}`;
                                },
                                aggregate: Gordic.Data.Aggregates.max("tagy"),
                                sort: "tagy",
                            };
                            var dleTypuZmenyPlusRevize = {
                                defaultState: "open",
                                hash: (meta, rows) => {
                                    var revize = meta.data.tagy?.split(';')[0];
                                    return `${revize}`;
                                },
                                aggregate: Gordic.Data.Aggregates.max("tagy"),
                                sort: "tagy",
                            };
                            groupList.push(dleTypuZmeny);
                            that.viewZmenyVersion.process({
                                default: new Gordic.Data.Grouping(groupList),
                            });
                        }
                        that.gridFormatVersion = this.createGridFormatVersion();
                        that._createVersion();
                        if (that.typView == 0) {
                            that.element.find("td.cell.c0").css({ "border-bottom": "0.5px solid #C6CDE0" });
                        }
                    });
                    //KONEC VLASTNI GTABLY
                    //that.downloadInnerHtmlVersion('changelog.html', 'main-logs', 'text/html', that.dataExport, that.dataFormat);
                }
                createGridFormatVersion() {
                    const that = this;
                    var columnsDefinition = new Gordic.Data.GridFormat();
                    columnsDefinition
                        .addHtmlColumn({
                        name: "popis",
                        caption: "Popis změny",
                        cellTemplate: (data) => {
                            //Předělat defaultní zobrazení popisů pro typView = 1
                            //var poleTagyPopis: string[] = [];
                            //if (data.tagy != null) {
                            //	poleTagyPopis = data.tagy.split(";")
                            //}
                            //var stringTooltip = ""
                            //for (var i = 0; i < poleTagyPopis.length; i++) {
                            //	stringTooltip = stringTooltip + "<i class ='gi gi-label gi-rot180' aria-hidden='true'></i><b>" + poleTagyPopis[i] + "</b> <br>"
                            //}
                            //var newEl = document.createElement("menuRowWrapper")
                            //var controls = $.newDiv("queue-controls statusbar").appendTo(newEl)
                            //	.append($("<buttontagy>").gtooltip({
                            //		tooltip: "Související tagy:  <br> " + stringTooltip + "",
                            //	}).glink({
                            //		name: "tagyRow",
                            //		params: {
                            //			action: new GAction({
                            //				name: "actTagy",
                            //				run: function (event) {
                            //					//that.createMainContent(that.fieldTagy, that.cntName)
                            //				},
                            //				tooltip: "TestTooltip"
                            //			}),
                            //			icon: "gi-label gi-rot180 g-state-text g-state-inactive", //fa-label fa-rot180 |gi-question bold gi-bgw gi-stack-pos--rb  g-state-text g-state-info
                            //			visible: true,
                            //			tooltip: "Test"
                            //		},
                            //	}))
                            //	.css({ "color": "black", "position": "relative", "float": "inline-end", "vertical-align": "bottom", "height": "20px", "margin-left": "7px", "display": "inline" })
                            ////newEl.style.marginLeft = "10px"
                            //newEl.style.position = "relative"
                            //newEl.style.display = "list-item"
                            //newEl.style.marginLeft = "30px"
                            ////newEl.before()
                            //if (data.priz_verejny == 0) {
                            //	newEl.classList.add("changelog-item-style")
                            //}
                            //else {
                            //	newEl.classList.add("changelog-item-style-public")
                            //}
                            ////newEl.title = (data.priz_verejny == 0 ? "Jedná se o neveřejný popis změny" : "Jedná se o veřejný popis změny")
                            ////pokus
                            ////var iconList = $.newDiv("visible-icon").appendTo(newEl)
                            ////iconList.append($("<icon>").gstatic({ icon: "gi-circle |gi-lock gi-stack-pos--rb gi-bgw", tooltip: "Jedná se o nevřejný popis změn", /*caption: "Tagy: "*/ })).css({ "color": "black", "position": "relative", "float": "center", "vertical-align": "-webkit-baseline-middle", "height": "20px", "margin-left": "7px", "display": "inline" });
                            ////konec pokusu
                            ////newEl.children[0].style.marginTop = "7px"
                            ////Konec akcí
                            //var toAdd = document.createElement("wrapper");
                            //var month = data.dat_zmena.substring(5, 7)
                            //var day = data.dat_zmena.substring(8, 10)
                            //var year = data.dat_zmena.substring(0, 4)
                            //toAdd.title = "Zveřejněno: " + day + "." + month + "." + year; // + "\n" + "Autor popisu: " + data.zmenil;
                            ////Určení revize
                            //var tagyPole = data.tagy?.split(";");
                            //var revizeSearch = "";
                            //var revizeSearchField: string[] = [];
                            //if (tagyPole != undefined) {
                            //	for (var i = 0; i < tagyPole.length; i++) {
                            //		if (tagyPole[i].length >= 12) {
                            //			revizeSearch = tagyPole[i];
                            //			revizeSearchField.push(tagyPole[i])
                            //		}
                            //	}
                            //}
                            //if (!(revizeSearch.length >= 12) && tagyPole != undefined) {
                            //	revizeSearch = tagyPole[0];
                            //}
                            ////Konec určení revize
                            //////toAdd.id = revizeSearch;
                            //var typPopDiv = document.createElement("typ-popis");
                            //var intPozDiv = document.createElement("interni-poznamka");
                            //var ixsKmpDiv = document.createElement("ixsKmp");
                            ////Tagy - uložení do pole tagů
                            //var poleTagyPopis: string[] = [];
                            //if (data.tagy != null) {
                            //	poleTagyPopis = data.tagy.split(";")
                            //}
                            ////Konec uložení do pole
                            //var newDiv = document.createElement("panel-popis");	//.createElement("panel-popis-" + Dto[i].ixs_kmp + "")
                            //typPopDiv.innerHTML = data.typ_zmeny_kmp_txt + " ";
                            //intPozDiv.innerHTML = (data.poznamky != undefined ? that.MDProcessor.render(data.poznamky) : data.poznamky);
                            ////ixsKmpDiv.innerHTML = (data.ixs_kmp != undefined ? data.ixs_kmp : "");
                            ////typPopDiv.className = (data.typ_zmeny_kmp_txt == "Oprava" ? "g-state-background g-state-info g-badge" : data.typ_zmeny_kmp_txt == "Novinka" ? "g-state-background g-state-success g-badge" : data.typ_zmeny_kmp_txt == "Známá chyba" ? "g-state-background g-state-warning g-badge" : data.typ_zmeny_kmp_txt == "Poznámka" ? "g-badge" : data.typ_zmeny_kmp_txt == "Legislativní změna" ? "g-state-background g-state-important g-badge" : "g-state-background g-state-inactive g-badge")
                            ////if (data.typ_zmeny_kmp_txt == "Poznámka") {
                            ////	typPopDiv.classList.add("changelog-typPoznamka");
                            ////}
                            //typPopDiv.classList.add("changelog-typ");
                            //intPozDiv.classList.add("changelog-intPoz");
                            //ixsKmpDiv.classList.add("changelog-id");
                            //newDiv.classList.add("changelog-body"); //15.4.2024
                            ////newDiv.innerHTML = that.MDProcessor.render(Dto[i].popis);
                            //newDiv.innerHTML = (data.popis != undefined ? that.MDProcessor.render(data.popis.replace(/<\/?[^>]+(>|$)/g, "")) : data.popis.replace(/<\/?[^>]+(>|$)/g, ""));
                            //if (that.typView == 0) {
                            //	toAdd.appendChild(typPopDiv);
                            //}
                            //var tagyDiv = document.createElement("tagy");
                            ////                  if (this.typView == 1) {		//Seskupený typ pohledu na data
                            ////	//Tagy z pole do badgu
                            ////	var tagyDiv = document.createElement("tagy");
                            ////	for (var j = 1; j < poleTagyPopis.length; j++) {
                            ////		var tagDiv = document.createElement("tag-" + j);
                            ////		tagDiv.innerHTML = poleTagyPopis[j] + " ";
                            ////		tagDiv.className = "g-badge" //g-state-background g-state-inactive
                            ////		tagDiv.classList.add("changelog-tag");
                            ////		tagyDiv.appendChild(tagDiv);
                            ////	}
                            ////}
                            ////                  else {
                            ////	//Tagy z pole do badgu
                            ////	var tagyDiv = document.createElement("tagy");
                            ////	for (var j = 0; j < poleTagyPopis.length; j++) {
                            ////		var tagDiv = document.createElement("tag-" + j);
                            ////		tagDiv.innerHTML =  poleTagyPopis[j] + " ";
                            ////		tagDiv.className = "g-badge" //g-state-background g-state-inactive
                            ////		tagDiv.classList.add("changelog-tag");
                            ////		tagyDiv.appendChild(tagDiv);
                            ////	}
                            ////                  }
                            //var popisDiv = document.createElement("popis");
                            //popisDiv.innerHTML = (data.popis != undefined ? that.MDProcessor.render(that._unEscape(data.popis)) : that._unEscape(data.popis))
                            //popisDiv.classList.add("changelog-text");
                            //var plainText = that.MDProcessor.render(data.popis)
                            //plainText = plainText.replace("<p>", "")
                            //plainText = plainText.replace("</p>", "")
                            //plainText = plainText.replace("/n", "")
                            ////plainText = unescape(plainText) //plainText.replace(/&lt;.*&gt;/g, "");
                            //popisDiv.innerHTML = plainText
                            ////Konec 17.4.2024
                            ////Private / Public icona
                            ////var visibleDiv = document.createElement("visible");
                            ////var visibleIconDiv = document.createElement("visibleIcon");
                            ////var verejnyPopis = data.priz_verejny;
                            ////var icon = $.newDiv("visible-icon").appendTo(visibleIconDiv)
                            ////if (verejnyPopis == 0) {
                            ////	icon.append($("<icon>").gstatic({ icon: "gi-circle |gi-lock gi-stack-pos--rb gi-bgw", tooltip: "Jedná se o nevřejný popis změn", /*caption: "Tagy: "*/ })).css({ "color": "black", "position": "relative", "float": "center", "vertical-align": "-webkit-baseline-middle", "height": "20px", "margin-left": "7px", "display": "inline" });
                            ////	//tagyDiv.appendChild(visibleIconDiv);
                            ////	//newPanelOpravy.append($.newSpan().css({ "margin-top": "8px", "margin-left": "5px" }).gstatic({ icon: "fa-lock", tooltip: "Jedná se o nevřejný popis změn", /*caption: "Tagy: "*/ }).css({ "color": "black", "position": "relative", "float": "center", "vertical-align": "bottom", "height": "20px", "margin-left": "7px" }))
                            ////}
                            ////else {
                            ////	icon.append($("<icon>").gstatic({ icon: "gi-circle |gi-users gi-stack-pos--rb gi-bgw", tooltip: "Jedná se o veřejný popis změn", /*caption: "Tagy: "*/ })).css({ "color": "black", "position": "relative", "float": "center", "vertical-align": "-webkit-baseline-middle", "height": "20px", "margin-left": "7px", "display": "inline" });
                            ////	//tagyDiv.appendChild(visibleIconDiv);
                            ////}
                            ////visibleDiv.appendChild(visibleIconDiv);
                            ////tagyDiv.appendChild(visibleIconDiv);
                            ///////tagyDiv.innerHTML = (data.popis != undefined ? that.MDProcessor.render(data.popis) : data.popis)  //17.4.2024
                            //tagyDiv.appendChild(popisDiv);
                            //toAdd.appendChild(tagyDiv);
                            ////toAdd.appendChild(intPozDiv);
                            //toAdd.appendChild(ixsKmpDiv);
                            //newEl.appendChild(toAdd)
                            //$(newEl).on("mouseover", function (ev) {
                            //	var stringTooltip = "<b>Souvisejcí tagy: </b>"
                            //	for (var i = 0; i < poleTagyPopis.length; i++) {
                            //		stringTooltip = stringTooltip + "/n" + poleTagyPopis[i]
                            //	}
                            //	that.tooltipTagy = stringTooltip;
                            //	//that.actions.getActions().filter(obj => {
                            //	//	return obj.name === "actTagy"
                            //	//})[0].tooltip = "";
                            //	//$(ev.target).closest('div').css({ "background-color": "#F8F8F8", "border-left": "5px solid", "border-right": "1px solid", "border-top": "1px solid", "border-bottom": "1px solid", "border-color": "#FFFFFF" })   //#FCDDBF - light warning
                            //	if ($(ev.target).find("i.gi.gi-label")[0] != undefined) {
                            //		//$(ev.target).find("i.gi.gi-label").on("mouseover", function (ev) { $(ev.target).find("i.gi.gi-label")[0].className = 'gi gi-label bold gi-rot180 fa-2x g-state-text g-state-active js-gbutton-primary-icon g-button__icon' })
                            //		$(ev.target).find("i.gi.gi-label")[0].className = 'gi gi-label bold gi-rot180 fa-2x g-state-text g-state-active js-gbutton-primary-icon g-button__icon'
                            //	}
                            //})
                            //$(newEl).on("mouseout", function (ev) {
                            //	//$(ev.target).closest('div').css({ "background-color": "#F8F8F8", "border-left": "5px solid", "border-right": "1px solid", "border-top": "1px solid", "border-bottom": "1px solid", "border-color": "#FFFFFF" })   //#FCDDBF - light warning
                            //	if ($(ev.target).find("i.gi.gi-label")[0] != undefined) {
                            //		$(ev.target).find("i.gi.gi-label")[0].className = 'gi gi-label gi-rot180 fa-2x g-state-text g-state-inactive js-gbutton-primary-icon g-button__icon'
                            //	}
                            //})
                            //return newEl;
                            //Předělat defaultní zobrazení popisů pro typView = 1
                            var poleTagyPopis = [];
                            if (data.tagy != null) {
                                poleTagyPopis = data.tagy.split(";");
                            }
                            var stringTooltip = "";
                            for (var i = 0; i < poleTagyPopis.length; i++) {
                                stringTooltip = stringTooltip + "<i class ='gi gi-label gi-rot180' aria-hidden='true'></i><b>" + poleTagyPopis[i] + "</b> <br>";
                            }
                            var newEl = document.createElement("menuRowWrapper");
                            var controls = $.newDiv("queue-controls statusbar").appendTo(newEl)
                                .append($("<buttontagy>").gtooltip({
                                tooltip: "Související tagy:  <br> " + stringTooltip + "",
                            }).glink({
                                name: "tagyRow",
                                params: {
                                    action: new GAction({
                                        name: "actTagy",
                                        run: function (event) {
                                            //that.createMainContent(that.fieldTagy, that.cntName)
                                        },
                                        tooltip: "TestTooltip"
                                    }),
                                    icon: "gi-label gi-rot180 g-state-text g-state-inactive", //fa-label fa-rot180 |gi-question bold gi-bgw gi-stack-pos--rb  g-state-text g-state-info
                                    visible: true,
                                    tooltip: "Test"
                                },
                            }))
                                .css({ "color": "black", "position": "relative", "float": "inline-end", "vertical-align": "bottom", "height": "20px", "margin-left": "7px", "display": "inline" });
                            //newEl.style.marginLeft = "10px"
                            newEl.style.position = "relative";
                            newEl.style.display = "list-item";
                            newEl.style.marginLeft = "30px";
                            //newEl.before()
                            if (data.priz_verejny == 0) {
                                newEl.classList.add("changelog-item-style");
                            }
                            else {
                                newEl.classList.add("changelog-item-style-public");
                            }
                            //newEl.title = (data.priz_verejny == 0 ? "Jedná se o neveřejný popis změny" : "Jedná se o veřejný popis změny")
                            //pokus
                            //var iconList = $.newDiv("visible-icon").appendTo(newEl)
                            //iconList.append($("<icon>").gstatic({ icon: "gi-circle |gi-lock gi-stack-pos--rb gi-bgw", tooltip: "Jedná se o nevřejný popis změn", /*caption: "Tagy: "*/ })).css({ "color": "black", "position": "relative", "float": "center", "vertical-align": "-webkit-baseline-middle", "height": "20px", "margin-left": "7px", "display": "inline" });
                            //konec pokusu
                            //newEl.children[0].style.marginTop = "7px"
                            //Konec akcí
                            var toAdd = document.createElement("wrapper");
                            var month = data.dat_zmena.substring(5, 7);
                            var day = data.dat_zmena.substring(8, 10);
                            var year = data.dat_zmena.substring(0, 4);
                            toAdd.title = "Zveřejněno: " + day + "." + month + "." + year; // + "\n" + "Autor popisu: " + data.zmenil;
                            //Určení revize
                            var tagyPole = data.tagy?.split(";");
                            var revizeSearch = "";
                            var revizeSearchField = [];
                            if (tagyPole != undefined) {
                                for (var i = 0; i < tagyPole.length; i++) {
                                    if (tagyPole[i].length >= 12) {
                                        revizeSearch = tagyPole[i];
                                        revizeSearchField.push(tagyPole[i]);
                                    }
                                }
                            }
                            if (!(revizeSearch.length >= 12) && tagyPole != undefined) {
                                revizeSearch = tagyPole[0];
                            }
                            //Konec určení revize
                            toAdd.id = revizeSearch;
                            var script = document.createElement("script");
                            var typPopDiv = document.createElement("typ-popis");
                            var intPozDiv = document.createElement("interni-poznamka");
                            var ixsKmpDiv = document.createElement("ixsKmp");
                            //Tagy - uložení do pole tagů
                            var poleTagyPopis = [];
                            if (data.tagy != null) {
                                poleTagyPopis = data.tagy.split(";");
                            }
                            //Konec uložení do pole
                            var newDiv = document.createElement("panel-popis"); //.createElement("panel-popis-" + Dto[i].ixs_kmp + "")
                            typPopDiv.innerHTML = data.typ_zmeny_kmp_txt + " ";
                            intPozDiv.innerHTML = (data.poznamky != undefined ? that.MDProcessor.render(data.poznamky) : data.poznamky);
                            //ixsKmpDiv.innerHTML = (data.ixs_kmp != undefined ? data.ixs_kmp : "");
                            //typPopDiv.className = (data.typ_zmeny_kmp_txt == "Oprava" ? "g-state-background g-state-info g-badge" : data.typ_zmeny_kmp_txt == "Novinka" ? "g-state-background g-state-success g-badge" : data.typ_zmeny_kmp_txt == "Známá chyba" ? "g-state-background g-state-warning g-badge" : data.typ_zmeny_kmp_txt == "Poznámka" ? "g-badge" : data.typ_zmeny_kmp_txt == "Legislativní změna" ? "g-state-background g-state-important g-badge" : "g-state-background g-state-inactive g-badge")
                            //if (data.typ_zmeny_kmp_txt == "Poznámka") {
                            //	typPopDiv.classList.add("changelog-typPoznamka");
                            //}
                            typPopDiv.classList.add("changelog-typ");
                            intPozDiv.classList.add("changelog-intPoz");
                            ixsKmpDiv.classList.add("changelog-id");
                            newDiv.classList.add("changelog-body"); //15.4.2024
                            //newDiv.innerHTML = that.MDProcessor.render(Dto[i].popis);
                            newDiv.innerHTML = (data.popis != undefined ? that.MDProcessor.render(data.popis.replace(/<\/?[^>]+(>|$)/g, "")) : data.popis.replace(/<\/?[^>]+(>|$)/g, ""));
                            if (that.typView == 0) {
                                toAdd.appendChild(typPopDiv);
                            }
                            var tagyDiv = document.createElement("tagy");
                            //                  if (this.typView == 1) {		//Seskupený typ pohledu na data
                            //	//Tagy z pole do badgu
                            //	var tagyDiv = document.createElement("tagy"); 
                            //	for (var j = 1; j < poleTagyPopis.length; j++) {
                            //		var tagDiv = document.createElement("tag-" + j);
                            //		tagDiv.innerHTML = poleTagyPopis[j] + " ";
                            //		tagDiv.className = "g-badge" //g-state-background g-state-inactive 
                            //		tagDiv.classList.add("changelog-tag");
                            //		tagyDiv.appendChild(tagDiv);
                            //	}
                            //}
                            //                  else {
                            //	//Tagy z pole do badgu
                            //	var tagyDiv = document.createElement("tagy"); 
                            //	for (var j = 0; j < poleTagyPopis.length; j++) {
                            //		var tagDiv = document.createElement("tag-" + j);
                            //		tagDiv.innerHTML =  poleTagyPopis[j] + " ";
                            //		tagDiv.className = "g-badge" //g-state-background g-state-inactive 
                            //		tagDiv.classList.add("changelog-tag");
                            //		tagyDiv.appendChild(tagDiv);
                            //	}
                            //                  }
                            var popisDiv = document.createElement("popis");
                            popisDiv.innerHTML = (data.popis != undefined ? that.MDProcessor.render(that._unEscape(data.popis)) : that._unEscape(data.popis));
                            popisDiv.classList.add("changelog-text");
                            var plainText = that.MDProcessor.render(data.popis);
                            plainText = plainText.replace("<p>", "");
                            plainText = plainText.replace("</p>", "");
                            plainText = plainText.replace("/n", "");
                            //plainText = unescape(plainText) //plainText.replace(/&lt;.*&gt;/g, "");
                            popisDiv.innerHTML = plainText;
                            //Konec 17.4.2024
                            //Private / Public icona
                            //var visibleDiv = document.createElement("visible");
                            //var visibleIconDiv = document.createElement("visibleIcon");
                            //var verejnyPopis = data.priz_verejny;
                            //var icon = $.newDiv("visible-icon").appendTo(visibleIconDiv)
                            //if (verejnyPopis == 0) {
                            //	icon.append($("<icon>").gstatic({ icon: "gi-circle |gi-lock gi-stack-pos--rb gi-bgw", tooltip: "Jedná se o nevřejný popis změn", /*caption: "Tagy: "*/ })).css({ "color": "black", "position": "relative", "float": "center", "vertical-align": "-webkit-baseline-middle", "height": "20px", "margin-left": "7px", "display": "inline" });
                            //	//tagyDiv.appendChild(visibleIconDiv);
                            //	//newPanelOpravy.append($.newSpan().css({ "margin-top": "8px", "margin-left": "5px" }).gstatic({ icon: "fa-lock", tooltip: "Jedná se o nevřejný popis změn", /*caption: "Tagy: "*/ }).css({ "color": "black", "position": "relative", "float": "center", "vertical-align": "bottom", "height": "20px", "margin-left": "7px" }))
                            //}
                            //else {
                            //	icon.append($("<icon>").gstatic({ icon: "gi-circle |gi-users gi-stack-pos--rb gi-bgw", tooltip: "Jedná se o veřejný popis změn", /*caption: "Tagy: "*/ })).css({ "color": "black", "position": "relative", "float": "center", "vertical-align": "-webkit-baseline-middle", "height": "20px", "margin-left": "7px", "display": "inline" });
                            //	//tagyDiv.appendChild(visibleIconDiv);
                            //}
                            //visibleDiv.appendChild(visibleIconDiv);
                            //tagyDiv.appendChild(visibleIconDiv);
                            /////tagyDiv.innerHTML = (data.popis != undefined ? that.MDProcessor.render(data.popis) : data.popis)  //17.4.2024
                            tagyDiv.appendChild(popisDiv);
                            toAdd.appendChild(tagyDiv);
                            //toAdd.appendChild(intPozDiv);
                            toAdd.appendChild(ixsKmpDiv);
                            newEl.appendChild(toAdd);
                            $(newEl).on("mouseover", function (ev) {
                                var stringTooltip = "<b>Souvisejcí tagy: </b>";
                                for (var i = 0; i < poleTagyPopis.length; i++) {
                                    stringTooltip = stringTooltip + "/n" + poleTagyPopis[i];
                                }
                                that.tooltipTagy = stringTooltip;
                                //that.actions.getActions().filter(obj => {
                                //	return obj.name === "actTagy"
                                //})[0].tooltip = "";
                                //$(ev.target).closest('div').css({ "background-color": "#F8F8F8", "border-left": "5px solid", "border-right": "1px solid", "border-top": "1px solid", "border-bottom": "1px solid", "border-color": "#FFFFFF" })   //#FCDDBF - light warning
                                if ($(ev.target).find("i.gi.gi-label")[0] != undefined) {
                                    //$(ev.target).find("i.gi.gi-label").on("mouseover", function (ev) { $(ev.target).find("i.gi.gi-label")[0].className = 'gi gi-label bold gi-rot180 fa-2x g-state-text g-state-active js-gbutton-primary-icon g-button__icon' })
                                    $(ev.target).find("i.gi.gi-label")[0].className = 'gi gi-label bold gi-rot180 fa-2x g-state-text g-state-active js-gbutton-primary-icon g-button__icon';
                                }
                            });
                            $(newEl).on("mouseout", function (ev) {
                                //$(ev.target).closest('div').css({ "background-color": "#F8F8F8", "border-left": "5px solid", "border-right": "1px solid", "border-top": "1px solid", "border-bottom": "1px solid", "border-color": "#FFFFFF" })   //#FCDDBF - light warning
                                if ($(ev.target).find("i.gi.gi-label")[0] != undefined) {
                                    $(ev.target).find("i.gi.gi-label")[0].className = 'gi gi-label gi-rot180 fa-2x g-state-text g-state-inactive js-gbutton-primary-icon g-button__icon';
                                }
                            });
                            var script = document.createElement("script");
                            script.setAttribute('type', 'text/javascript');
                            script.appendChild(document.createTextNode('alert(1)'));
                            newEl.appendChild(script);
                            return newEl;
                        }
                    });
                    return columnsDefinition;
                }
                /**
                 * _create
                 * this.options.data je nahrazeno za this.viewZmeny
                 */
                _createVersion() {
                    this._countItemVersion = 0;
                    this._resizeWidthElementVersion = {};
                    this._resizeWidthElementVersion.class = "";
                    this._resizeWidthElementVersion.width = 0;
                    this.groupingHeaderColumnsVersion = {
                        _default: {
                            structureLead: true,
                            name: "_defaultGroupHeader",
                            cellTemplate: Gordic.Templates.ensureTemplate("<b>{@structure.hash}</b> <span class='group-header-count'>({@structure.rows.length})</span>"),
                        }
                    };
                    this._styleElementVersion = document.createElement("style");
                    this._styleElementVersion.type = "text/css";
                    this._styleElementVersion.innerHTML = "";
                    this.cssUidVersion = "gtable_" + (this.uuidVersion++);
                    this._columnsSettingVersion();
                    this.element.addClass("gtable").addClass(this.cssUidVersion);
                    this._contentVersion = document.createElement("table");
                    this._contentVersion.className = "g-table-mainVersion";
                    this.element.append(this._contentVersion);
                    this.mainLogsPanelVersion.append(this._contentVersion);
                    if (this.viewZmenyVersion != undefined)
                        this.setDataVersion(this.viewZmenyVersion);
                    var headVersion = document.head || document.getElementsByTagName('head')[0];
                    headVersion.appendChild(this._styleElementVersion);
                    //this._initResizeManager();
                }
                /**
                 * _columnsSetting
                 * this.options.columns je nahrazeno za this.gridFormat
                 */
                _columnsSettingVersion() {
                    const that = this;
                    var colsVersion = (this.gridFormatVersion instanceof Gordic.Data.GridFormat) ? this.gridFormatVersion.columns.slice() : (this.gridFormatVersion != undefined) ? this.gridFormatVersion : [];
                    this._columnsVersion = [];
                    this._headersVersion = [];
                    var j = 0;
                    for (var i = 0; i < colsVersion.length; i++) {
                        if (colsVersion[i].hidden && colsVersion[i].hidden == true)
                            continue;
                        var column = colsVersion[i];
                        if (column.minWidth && (this._resizeWidthElementVersion.width < column.minWidth)) {
                            this._resizeWidthElementVersion.width = column.minWidth;
                            this._resizeWidthElementVersion.class = ".c" + j;
                        }
                        if (column.width)
                            this._styleElementVersion.innerHTML += ".{0} .c{1} {{width: {2} rem\n}}".format(this.cssUidVersion, j, column.width / 16);
                        column.hidden = (colsVersion[i].hidden) ? colsVersion[i].hidden : false;
                        column.align = (colsVersion[i].align) ? colsVersion[i].align : "left";
                        var format = column.formatPreset && column.formats && column.formats[column.formatPreset] ? column.formats[column.formatPreset].format : column.format;
                        column.cellTemplate = Gordic.Templates.ensureTemplate(column.cellTemplate != null ? column.cellTemplate : "{" + (column.field != undefined ? column.field : column.name) + (format ? ":" + format : "") + "}");
                        column.headerTemplate = (colsVersion[i].headerTemplate) ? Gordic.Templates.ensureTemplate(column.headerTemplate) : null;
                        var name = document.createElement("spanVersion");
                        name.classList.add("g-table-responsive-headerVersion");
                        var caption = column.caption != null ? column.caption : colsVersion[i].name != null ? "<i>{0}</i>".format(column.name) : "";
                        if (column.headerTemplate != undefined && column.headerTemplate != null) {
                            var cellContent = column.headerTemplate.render(column, { cell: name, column: column, columnIndex: i });
                            if (cellContent == null)
                                caption = "";
                            else if (typeof cellContent === "string" || typeof cellContent === "number")
                                caption = cellContent.toString();
                            else {
                                caption = "";
                                $(name).append(cellContent);
                            }
                        }
                        name.innerHTML = /*"<b>" + */ caption /* + "</b>"*/;
                        this._headersVersion.push(name);
                        this._columnsVersion.push(column);
                        j++;
                    }
                }
                /**
                 * setData
                 *
                 * @param {any} data
                 */
                setDataVersion(data) {
                    var _this = this;
                    var dataView;
                    if (!data)
                        dataView = new Gordic.Data.View();
                    else if (data instanceof Gordic.Data.View)
                        dataView = data;
                    else if (Array.isArray(data))
                        dataView = new Gordic.Data.View(data);
                    else {
                        console.log("gtable.setData - neznamy typ vstupnich dat");
                        dataView = new Gordic.Data.View();
                    }
                    if (this._dataVersion) {
                        this._dataVersion.off(this.element[0].className);
                    }
                    this._dataVersion = dataView;
                    this._dataVersion.on("change.{0}".format(this.cssUidVersion), (opts) => {
                        this._reloadDataVersion();
                    });
                    //this._dataVersion.refresh();
                    this._reloadDataVersion();
                    this.endOperation();
                }
                _reloadDataVersion() {
                    const that = this;
                    this._contentVersion.innerHTML = ""; //xxx
                    var rows = this._createRowsVersion(this._dataVersion);
                    var thead = document.createElement("thead");
                    thead.appendChild(rows[0]);
                    this._contentVersion.appendChild(thead);
                    var tbody = document.createElement("tbody");
                    for (var i = 1; i < rows.length; i++) {
                        //if (rows[i].childNodes[0].nodeName != 'TD') {
                        tbody.appendChild(rows[i]);
                        //}
                        //this._contentVersion.appendChild(rows[i]);
                    }
                    this._contentVersion.appendChild(tbody);
                    //this._addMobileHeaders()
                    var el = this.element.find("[data-row-index='{0}']".format(this.numberRowVersion))[0];
                    if (el != undefined && el != null) {
                        this.element.animate({ scrollTop: this.element.find("[data-row-index='{0}']".format(this.numberRowVersion)).offset()?.top }, 1000);
                    }
                    //if (Gordic.Utils.WidgetExists("gform", that.emptyForm)) {
                    //	that.emptyForm.remove()
                    //}
                }
                /**
                 * _createRows
                 *
                 * @param {Gordic.Data.View} data
                 * @returns {HTMLTableRowElement[]}
                 */
                _createRowsVersion(data) {
                    var _this = this;
                    var renderRows = new Array();
                    var itemCount = data.getCount("view");
                    var rows = this._analyzeDataVersion(data.getRows(true));
                    var isLastIsVirtual = false;
                    var rowCount = 0;
                    var level = 0;
                    var headerRowId = 0;
                    if (itemCount == 0) {
                        ////var trHeader = this._renderHeaderRow(level, headerRowId, "");
                        headerRowId++;
                        ////renderRows.push(trHeader);
                        var emptyRow = document.createElement("tr");
                        var emptyValue = document.createElement("td");
                        emptyValue.className = "gtable-empty";
                        ////emptyValue.colSpan = trHeader.children.length;
                        emptyValue.innerHTML = "<i><b>Žádné popisy změn k zobrazení!</b></i>"; //RC 33000005 : Žádná data k zobrazení.
                        emptyRow.appendChild(emptyValue);
                        renderRows.push(emptyRow);
                    }
                    //var trHeader = this._renderHeaderRow(level);
                    //renderRows.push(trHeader);
                    for (var i = 0; i < itemCount; i++) {
                        var cells = new Array();
                        var trueColumns = new Array();
                        var isGroupRow = rows[i]._isVirtual === true && !!rows[i].structure;
                        if (isGroupRow == true) {
                            level = rows[i].structure.level;
                            if (i == 0) {
                                ////var trHeader = this._renderHeaderRow(level, headerRowId, "");
                                headerRowId++;
                                ////trHeader.classList.add("virtual-header");
                                ////renderRows.push(trHeader);
                            }
                        }
                        else {
                            if (isLastIsVirtual == true || i == 0) {
                                var pomVirtual = i - 1;
                                var headers = "";
                                if (pomVirtual != -1) {
                                    while (rows[pomVirtual]._isVirtual) {
                                        headers += rows[pomVirtual].groupId + " ";
                                        pomVirtual--;
                                        if (pomVirtual < 0)
                                            break;
                                    }
                                }
                                ////var trHeader = this._renderHeaderRow(level, headerRowId, headers);
                                ////renderRows.push(trHeader);
                                headerRowId++;
                            }
                        }
                        for (var j = 0; j < this._columnsVersion.length; j++) {
                            if (isGroupRow == true) {
                                var gid = rows[i].structure.groupingProc + "#" + rows[i].structure.groupingTier;
                                var gd = this.groupingHeaderColumnsVersion[gid] || this.groupingHeaderColumnsVersion[rows[i].structure.groupingProc] || this.groupingHeaderColumnsVersion._default;
                                trueColumns.push(gd);
                                isLastIsVirtual = true;
                                var cell = document.createElement("td");
                                cells.push(cell);
                                break;
                            }
                            else
                                isLastIsVirtual = false;
                        }
                        var row = this._renderDataRowValuesVersion((isGroupRow == true) ? trueColumns : this._columnsVersion, rows[i], i, level, headerRowId - 1); // header row -1, kvůle předchozí inkrementaci
                        row.setAttribute("data-row-index", rowCount.toString());
                        if (isGroupRow == true) {
                            //var my_awesome_script = document.createElement('script');
                            //my_awesome_script.onload = function () {
                            //	let faze = "GWAUCR05" 
                            //}
                            //row.appendChild(my_awesome_script)
                            $("script");
                            row.classList.add("gtable-header"); //xxx
                            if (row.innerText.substr(0, 3) == "Nov") {
                                //row.classList.add("gtable-headerNewFeature");
                                row.classList.add("gtable-headerRevision");
                            }
                            else if (row.innerText.substr(0, 3) == "Leg") {
                                //row.classList.add("gtable-headerImportant");
                                row.classList.add("gtable-headerRevision");
                            }
                            else if (row.innerText.substr(0, 3) == "Opr") {
                                //row.classList.add("gtable-headerPatch");
                                row.classList.add("gtable-headerRevision");
                            }
                            else if (row.innerText.substr(0, 3) == "Zná") {
                                //row.classList.add("gtable-headerWarning");
                                row.classList.add("gtable-headerRevision");
                            }
                            else if (row.innerText.substr(0, 3) == "Poz") {
                                //row.classList.add("gtable-headerGray");
                                row.classList.add("gtable-headerRevision");
                            }
                            else {
                                row.classList.add("gtable-headerRevision");
                            }
                            //row.classList.add("gtable-headerColor");
                            //var script = document.createElement("script")
                            //script.setAttribute('type', 'text/javascript');
                            //script.appendChild(document.createTextNode('alert(1)'));
                            //row.appendChild(script)
                            //row.classList.add("g-badge");	
                            if (rows[i].structure.level == 0)
                                row.classList.add("gtable-header-" + rows[i].structure.level);
                        }
                        else {
                            row.classList.add("gtable-row");
                            row.id = this.cssUid + "_" + i;
                            //var rowClass = typeof this.options.rowsClass == "string" ? " " + this.options.rowsClass : $.isFunction(this.options.rowsClass) ? " " + this.options.rowsClass.call(this.element[0], rows[i], trueColumns, i) : "";
                            //row.className += " " + rowClass.trim();
                        }
                        if (isGroupRow == true) {
                            //this.element.on("click", String.Format("*[data-row-index='{0}']", rowCount), function (ev) { _this._actionClick(this); })
                        }
                        rowCount++;
                        renderRows.push(row);
                    }
                    return renderRows;
                }
                /**
                 * _actionClick
                 *
                 * @param {any} element
                 */
                _actionClickVersion(element) {
                    if (element.rowIndex != -1) {
                        this.numberRowVersion = parseInt(element.attributes["data-row-index"].nodeValue);
                        var meta = this._dataVersion.getRows(true, this.numberRowVersion, 1)[0];
                        if ($.isFunction(meta.structure && meta.structure.interaction))
                            meta.structure.interaction();
                    }
                }
                /**
                 * _analyzeData
                 *
                 * @param {any[]} rows
                 * @returns {any[]}
                 */
                _analyzeDataVersion(rows) {
                    var groupsId = new Array();
                    var currentLevel = 0;
                    groupsId.push(0, 0);
                    var groupNameArray = new Array();
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i].structure) {
                            if (rows[i].structure.level != null && rows[i].structure.level != undefined) {
                                if (rows[i]._isVirtual == true && currentLevel == rows[i].structure.level)
                                    groupNameArray.pop();
                                if (currentLevel > rows[i].structure.level) {
                                    for (var m = 0; m <= (currentLevel - rows[i].structure.level) + 1; m++)
                                        groupNameArray.pop();
                                    for (var j = rows[i].structure.level + 1; j < groupsId.length; j++)
                                        groupsId[j] = 0;
                                }
                                currentLevel = rows[i].structure.level;
                                groupsId[rows[i].structure.level]++;
                                var groupName = "{0}_group".format(this.cssUidVersion);
                                for (var k = 0; k < groupsId.length; k++) {
                                    if (groupsId[k] != 0)
                                        groupName += "_{0}".format(groupsId[k]);
                                }
                                rows[i].groupId = groupName;
                                groupNameArray.push(groupName);
                            }
                        }
                        else {
                            rows[i].headers = groupNameArray.join(' ');
                        }
                    }
                    return rows;
                }
                /**
                 * _renderDataRowValues
                 *
                 * @param {any} trueColumns
                 * @param {any} meta
                 * @param {any} rowIndex
                 * @param {any} level
                 * @param {any} headerRowId
                 * @returns {HTMLTableRowElement}
                 */
                _renderDataRowValuesVersion(trueColumns, meta, rowIndex, level, headerRowId) {
                    var row = document.createElement("tr");
                    for (var i = 0; i < trueColumns.length; i++) {
                        var tc = trueColumns[i];
                        var cell;
                        if (trueColumns[0].structureLead) {
                            cell = document.createElement("th");
                            cell.id = "{0}_col_{1}".format(this.cssUidVersion, i);
                            cell.scope = "colgroup";
                        }
                        else {
                            cell = document.createElement("td");
                            cell.headers = meta.headers + " {0}_col_{1}_{2}".format(this.cssUidVersion, headerRowId, i);
                        }
                        if (i == 0)
                            cell.setAttribute("style", "padding-left:" + ((level * 12) + 20) + "px");
                        if (meta._isVirtual) {
                            cell.id = meta.groupId;
                        }
                        if (tc.hidden == false || tc.structureLead == true) {
                            cell.className = "cell c" + i;
                            var cc = trueColumns[i].customClass;
                            if ($.isFunction(cc))
                                cc = cc.call(this.element[0], meta, trueColumns[i], rowIndex);
                            if (cc)
                                cell.classList.add(...cc.split(" ").filter(item => !!item));
                            if (tc.align == "right")
                                cell.classList.add("right");
                            cell.setAttribute("data-column-index", i.toString());
                            var cellContent = tc.cellTemplate.render(meta.data, meta, { widget: this.element, cell: cell, column: tc, rowIndex: rowIndex, init: true });
                            if (cellContent != null) {
                                if (typeof cellContent === "string" || typeof cellContent === "number")
                                    cell.innerHTML = "<div>" + cellContent.toString() + "</div>";
                                else if (cellContent instanceof HTMLElement || cellContent instanceof jQuery)
                                    $(cell).html(cellContent);
                                else
                                    cell.innerHTML = JSON.stringify(cellContent);
                            }
                            if (meta.structure)
                                cell.innerText = cell.innerText;
                        }
                        if (tc.structureLead && tc.structureLead == true) {
                            cell.colSpan = this._columnsVersion.length;
                            var icon = "";
                            switch (meta.structure && meta.structure.state) {
                                case "closed":
                                    icon = "fa fa-chevron-right";
                                    break;
                                case "open":
                                    icon = "fa fa-chevron-down";
                                    break;
                            }
                            var badge = "";
                            if (cell.innerText.substr(0, 3) == "Nov") {
                                badge = "<typ-popis class='g-state-background g-state-success g-badge changelog-typ'>Novinky</typ-popis>";
                                cell.style.cursor = "auto";
                                //cell.setAttribute("style", "cursor:auto")
                            }
                            else if (cell.innerText.substr(0, 3) == "Leg") {
                                badge = "<typ-popis class='g-state-background g-state-important g-badge changelog-typ'>Legislativní změny</typ-popis>";
                                cell.style.cursor = "auto";
                                //cell.setAttribute("style", "cursor:auto")
                            }
                            else if (cell.innerText.substr(0, 3) == "Opr") {
                                badge = "<typ-popis class='g-state-background g-state-info g-badge changelog-typ'>Opravy</typ-popis>";
                                cell.style.cursor = "auto";
                                //cell.setAttribute("style", "cursor:auto")
                            }
                            else if (cell.innerText.substr(0, 3) == "Zná") {
                                badge = "<typ-popis class='g-state-background g-state-warning g-badge changelog-typ'>Známé chyby</typ-popis>";
                                cell.style.cursor = "auto";
                                //cell.setAttribute("style", "cursor:auto")
                            }
                            else if (cell.innerText.substr(0, 3) == "Poz") {
                                badge = "<typ-popis class='g-badge changelog-typPoznamkaHeader'>Poznámky</typ-popis>";
                                cell.style.cursor = "auto";
                                //cell.setAttribute("style", "cursor:auto")
                            }
                            else {
                                cell.setAttribute("style", "font-size:larger");
                                cell.setAttribute("style", "text-align:start");
                                cell.setAttribute("style", "cursor:auto");
                                cell.setAttribute("style", "color:darkblue");
                                cell.setAttribute("style", "padding-top:15px");
                                cell.innerText = cell.innerText.slice(0, -4);
                                cell.style.color = "#1D3E8F";
                                cell.style.fontSize = "larger";
                                cell.style.paddingLeft = "5px";
                                cell.style.textAlign = "start";
                                cell.style.cursor = "auto";
                                cell.id = cell.innerText;
                            }
                            //if (badge != "") {
                            //var count = cell.innerText.substr(cell.innerText.length - 4, cell.innerText.length)
                            //var counter = "<count class='changelog-counter'>" + count + "</count>"
                            //cell.innerText = "";
                            //cell.style.marginTop = "5px"
                            //$(badge).prependTo(cell);
                            //$(counter).appendTo(cell);
                            if (badge != "") {
                                var count = cell.innerText.substr(cell.innerText.indexOf("("), cell.innerText.length);
                                var counter = "<count class='changelog-counter'>" + count + "</count>";
                                cell.innerText = "";
                                cell.style.marginTop = "5px";
                                cell.style.textAlign = "start";
                                $(badge).prependTo(cell);
                                //$(counter).appendTo(cell);
                            }
                            //}
                            else {
                                //$("<i><i class='{0}' /></i>".format(icon)).prependTo(cell);
                            }
                        }
                        row.appendChild(cell);
                    }
                    return row;
                }
                /**
                 * filterData
                 *
                 * @param {any} value
                 */
                filterData(value) {
                    const that = this;
                    if (value == null) {
                        that.viewZmeny?.updateData(that.viewZmenyOrig.getDataRows());
                        that.resSearch = false;
                    }
                    else {
                        var condition = new RegExp(value, 'i'); // ref T41779 Doplněn parametr 'i' pro case insensitive flag 
                        var conditionTag = new RegExp(value);
                        var resultSearch = that.viewSearchZmeny?.getRows().filter(function (el) {
                            return condition.test(el.popis);
                        });
                        var resultSearchTag = that.viewSearchZmeny?.getRows().filter(function (el) {
                            return conditionTag.test(el.tagy);
                        });
                        var uniqueItems = [];
                        //Spojení výsledků hledání (v popisech + tagách)
                        if (resultSearchTag != undefined && resultSearchTag.length != 0 /*&& resultSearch != undefined && resultSearch?.length != 0*/) {
                            resultSearch = resultSearch.concat(resultSearchTag); // =	resultSearchTag + resultSearch
                            //Odebrání duplicit
                            var uniqueItems = [];
                            $.each(resultSearch, function (i, el) {
                                if ($.inArray(el, uniqueItems) === -1)
                                    uniqueItems.push(el);
                            });
                        }
                        if (uniqueItems.length != 0) {
                            resultSearch = uniqueItems;
                        }
                        if (resultSearch != undefined && resultSearch.length != 0) {
                            that.viewZmeny?.updateData(resultSearch);
                            that.resSearch = true;
                        }
                        else {
                            that.viewZmeny?.updateData(resultSearch);
                            that.resSearch = true;
                            if (that.viewZmeny != undefined) {
                                that._createChangeLog();
                            }
                        }
                    }
                }
            };
            SeznamPrehledZmen.widgetNameVersion = "gtableVersion";
            SeznamPrehledZmen = __decorate([
                gcontent
            ], SeznamPrehledZmen);
            WebControls.SeznamPrehledZmen = SeznamPrehledZmen;
        })(WebControls = Hst.WebControls || (Hst.WebControls = {}));
    })(Hst = Gordic.Hst || (Gordic.Hst = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHN0LndlYmNvbnRyb2xzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJTZXpuYW1QcmVobGVkWm1lbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBR2pCLElBQVUsTUFBTSxDQW00RmY7QUFuNEZELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW00Rm5CO0lBbjRGZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxXQUFXLENBbTRGL0I7UUFuNEZvQixXQUFBLFdBQVc7WUFFL0IsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUVoQzs7ZUFFRztZQUVILElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsT0FBQSxZQUFZO2dCQUFuRDtvQkFFQyxvQkFBb0I7O29CQVlaLFNBQUksR0FBRyxDQUFDLENBQUM7b0JBZVQsZ0JBQVcsR0FBRyxDQUFDLENBQUM7b0JBSXhCLDRDQUE0QztvQkFFNUM7O3VCQUVHO29CQUNLLGFBQVEsR0FBdUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFFNUQ7O3VCQUVHO29CQUNLLGdCQUFXLEdBQVEsRUFBRSxDQUFDO29CQUV0QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztvQkFFekIsZUFBVSxHQUFXLEVBQUUsQ0FBQztvQkFDeEIsY0FBUyxHQUFXLEVBQUUsQ0FBQztvQkFPdkIsZUFBVSxHQUFXLE1BQU0sQ0FBQztvQkFNNUIsZUFBVSxHQUFXLGVBQWUsQ0FBQztvQkFJckMsbUJBQWMsR0FBWSxLQUFLLENBQUM7b0JBRWhDLGlCQUFZLEdBQTJCLElBQUksaUJBQWlCLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtvQkFtQjFFLFlBQU8sR0FBVyxDQUFDLENBQUEsQ0FBQyxvREFBb0Q7b0JBMkJ4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QUFpQixHQUFhLEVBQUUsQ0FBQzt3Q0FDckMsSUFBSSxRQUFRLElBQUksU0FBUyxFQUFFLENBQUM7NENBQzNCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQTs0Q0FDZixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsU0FBUyxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7Z0RBQ3ZGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvREFDNUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3REFDMUMsNkRBQTZEO3dEQUM3RCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3REFDeEMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7NERBQzFILFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7NERBQzNCLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTt3REFDcEMsQ0FBQztvREFDRixDQUFDO2dEQUNGLENBQUM7NENBQ0YsQ0FBQztpREFDSSxDQUFDO2dEQUNMLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMs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QUksSUFBSSxFQUFFLENBQUM7NENBQ3hDLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTt3Q0FDN0MsQ0FBQzs2Q0FDSSxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDOzRDQUM3QyxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7d0NBQzdDLENBQUM7NkNBQ0ksSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQzs0Q0FDN0MsVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO3dDQUM3QyxDQUFDOzZDQUNJLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7NENBQzdDLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTt3Q0FDN0MsQ0FBQzs2Q0FDSSxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDOzRDQUM3QyxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7d0NBQzdDLENBQUM7NkNBQ0ksSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQzs0Q0FDN0MsVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO3dDQUM3QyxDQUFDOzZDQUNJLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7NENBQzdDLFVBQVUs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QUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7Z0NBQzFCLDJDQUEyQzs0QkFDNUMsQ0FBQztpQ0FDSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQ0FDL0MsS0FBSyxHQUFHLG9DQUFvQyxDQUFBO2dDQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7Z0NBQzFCLDJDQUEyQzs0QkFDNUMsQ0FBQztpQ0FDSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQ0FDL0MsS0FBSyxHQUFHLGlDQUFpQyxDQUFBO2dDQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7Z0NBQzFCLDJDQUEyQzs0QkFFNUMsQ0FBQztpQ0FDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0NB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Q0FBQyxTQUFTLElBQUksU0FBUyxFQUFFLENBQUM7Z0NBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDOzRCQUN6QixDQUFDO3dCQUNGLENBQUM7b0JBQ0YsQ0FBQztnQkFDRixDQUFDOztZQXgxRk0sbUNBQWlCLEdBQUcsZUFBZSxBQUFsQixDQUFtQjtZQWhDL0IsaUJBQWlCO2dCQUQ3QixRQUFRO2VBQ0ksaUJBQWlCLENBMDNGN0I7WUExM0ZZLDZCQUFpQixvQkEwM0Y3QixDQUFBO1FBQ0YsQ0FBQyxFQW40Rm9CLFdBQVcsR0FBWCxlQUFXLEtBQVgsZUFBVyxRQW00Ri9CO0lBQUQsQ0FBQyxFQW40RmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW00Rm5CO0FBQUQsQ0FBQyxFQW40RlMsTUFBTSxLQUFOLE1BQU0sUUFtNEZmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuSHN0LldlYkNvbnRyb2xzLlNlem5hbVByZWhsZWRabWVuLnRzICAgICAgICAgICAgICAgICA8L05hbWU+XG4vLyAgICA8RGVzY3JpcHRpb24+IFZlxZllam7DvSBwxZllaGxlZCB6bcSbbiBHT1JESUMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxuLy8gICAgPEF1dGhvcj4gICAgICB2YmxhYmxhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTAxLTMxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XG4vLyAgPC9GaWxlSGVhZGVyPlxuXG5cclxubmFtZXNwYWNlIEdvcmRpYy5Ic3QuV2ViQ29udHJvbHMge1xyXG5cclxuXHRjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzO1xyXG5cclxuXHQvKipcclxuXHQgKiBDb250ZW50IHBybyB6b2JyYXplbsOtIHptxJtuIHYgbW9kdWxlY2gsIHNlc3RhdsOhY2ggYSBhcGxpa2Fjw61jaCAuTkVULlxyXG5cdCAqL1xyXG5cdEBnY29udGVudFxyXG5cdGV4cG9ydCBjbGFzcyBTZXpuYW1QcmVobGVkWm1lbiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG5cdFx0Ly8jcmVnaW9uIHZsYXN0bm9zdGlcclxuXHJcblx0XHQvL1ZsYXN0bm9zdGkgcHJvIHZ5a3Jlc2xlbsOtIGNoYW5nZWxvZ8WvXHJcblx0XHRwcml2YXRlIF9yZXNpemVXaWR0aDogbnVtYmVyO1xyXG5cdFx0cHJpdmF0ZSBfaGVhZGVyczogSFRNTFNwYW5FbGVtZW50W107XHJcblx0XHRwcml2YXRlIF9yZXNpemVXaWR0aEVsZW1lbnQ6IGFueTtcclxuXHRcdHByaXZhdGUgX2RhdGE6IEdvcmRpYy5EYXRhLlZpZXc7XHJcblx0XHRwcml2YXRlIGdyb3VwaW5nSGVhZGVyQ29sdW1uczogYW55O1xyXG5cdFx0cHJpdmF0ZSBfc3R5bGVFbGVtZW50OiBhbnk7XHJcblx0XHRwcml2YXRlIGNzc1VpZDogYW55O1xyXG5cdFx0cHJpdmF0ZSBfY29sdW1uczogYW55W107XHJcblx0XHRwcml2YXRlIF9jb3VudEl0ZW06IG51bWJlcjtcclxuXHRcdHByaXZhdGUgdXVpZCA9IDA7XHJcblx0XHRwcml2YXRlIF9jb250ZW50OiBIVE1MVGFibGVFbGVtZW50O1xyXG5cdFx0cHJpdmF0ZSBudW1iZXJSb3c6IG51bWJlcjtcclxuXHRcdC8vS29uZWMgdmxhc3Rub3N0w60gcHJvIHZ5a3Jlc2xlbsOtIGNoYW5nZWxvZ8WvXHJcblxyXG5cdFx0Ly9WbGFzdG5vc3RpIHBybyB2eWtyZXNsZW7DrSBjaGFuZ2Vsb2fFryBkYW7DqSB2ZXJ6ZVxyXG5cdFx0cHJpdmF0ZSBfcmVzaXplV2lkdGhWZXJzaW9uOiBudW1iZXI7XHJcblx0XHRwcml2YXRlIF9oZWFkZXJzVmVyc2lvbjogSFRNTFNwYW5FbGVtZW50W107XHJcblx0XHRwcml2YXRlIF9yZXNpemVXaWR0aEVsZW1lbnRWZXJzaW9uOiBhbnk7XHJcblx0XHRwcml2YXRlIF9kYXRhVmVyc2lvbjogR29yZGljLkRhdGEuVmlldztcclxuXHRcdHByaXZhdGUgZ3JvdXBpbmdIZWFkZXJDb2x1bW5zVmVyc2lvbjogYW55O1xyXG5cdFx0cHJpdmF0ZSBfc3R5bGVFbGVtZW50VmVyc2lvbjogYW55O1xyXG5cdFx0cHJpdmF0ZSBjc3NVaWRWZXJzaW9uOiBhbnk7XHJcblx0XHRwcml2YXRlIF9jb2x1bW5zVmVyc2lvbjogYW55W107XHJcblx0XHRwcml2YXRlIF9jb3VudEl0ZW1WZXJzaW9uOiBudW1iZXI7XHJcblx0XHRwcml2YXRlIHV1aWRWZXJzaW9uID0gMDtcclxuXHRcdHByaXZhdGUgX2NvbnRlbnRWZXJzaW9uOiBIVE1MVGFibGVFbGVtZW50O1xyXG5cdFx0cHJpdmF0ZSBudW1iZXJSb3dWZXJzaW9uOiBudW1iZXI7XHJcblx0XHRzdGF0aWMgd2lkZ2V0TmFtZVZlcnNpb24gPSBcImd0YWJsZVZlcnNpb25cIjtcclxuXHRcdC8vS29uZWMgdmxhc3Rub3N0w60gcHJvIHZ5a3Jlc2xlbsOtIGNoYW5nZWxvZ8WvXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBQb2xlIHMgb2JqZWt0eSBwcm9ncmFtb3bDvWNoIGbDoXrDrVxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIGZhemVEYXRhOiBHb3JkaWMuQWR0LkludGVyZmFjZS5HR2RlY2ZhekR0b1tdID0gW3t9XTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFBvbGUgcyBuw6F6dnkgcHJvZ3JhbW92w71jaCBmw6F6w61cclxuXHRcdCAqL1xyXG5cdFx0cHJpdmF0ZSBmYXplVHh0RGF0YTogYW55ID0gW107XHJcblxyXG5cdFx0cHJpdmF0ZSB0b29sdGlwVGFneTogc3RyaW5nID0gXCJcIjtcclxuXHJcblx0XHRwcml2YXRlIG9yaWdIZWlndGg6IHN0cmluZyA9IFwiXCI7XHJcblx0XHRwcml2YXRlIG9yaWdXaWR0aDogc3RyaW5nID0gXCJcIjtcclxuXHRcdHByaXZhdGUgY2xvbmVFbDogYW55IC8vIEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG5cdFx0cHJpdmF0ZSBEYXRhRmlsdGVyPzogR29yZGljLkFkdC5JbnRlcmZhY2UuR1BvcGlzWm1lbnlEdG87XHJcblxyXG5cdFx0cHJpdmF0ZSBEYXRhRmlsdGVyVmVyc2lvbj86IEdvcmRpYy5BZHQuSW50ZXJmYWNlLkdQb3Bpc1ptZW55RHRvO1xyXG5cclxuXHRcdHByaXZhdGUgZGF0YUZvcm1hdDogc3RyaW5nID0gXCJIVE1MXCI7XHJcblxyXG5cdFx0cHJpdmF0ZSBmYXplOiBzdHJpbmc7XHJcblxyXG5cdFx0cHJpdmF0ZSByZXZpemU6IHN0cmluZztcclxuXHJcblx0XHRwcml2YXRlIGRhdGFFeHBvcnQ6IHN0cmluZyA9IFwiQWt0dcOtbG7DrSBkYXRhXCI7XHJcbjtcclxuXHRcdHByaXZhdGUgem1lbnlGaWx0ZXI/OiBHb3JkaWMuQWR0LkludGVyZmFjZS5HS29tcG9uZW50YUZpbHRlckVudW07XHJcblxyXG5cdFx0cHJpdmF0ZSBsZWdabWVueVNlYXJjaDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRcdHByaXZhdGUgcG9jZXRaYXpuYW11OiBHT2JzZXJ2YWJsZU9iamVjdDxhbnk+ID0gbmV3IEdPYnNlcnZhYmxlT2JqZWN0KHsgcG9jZXQ6IDAgfSlcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIGVtcHR5Rm9ybSAtIGVsZW1lbnQgcHLDoXpkbsOpaG8gZm9ybXVsw6HFmWUgcG9waXPFryB6bcSbblxyXG5cdFx0ICogQHR5cGUge0pRdWVyeTxIVE1MRWxlbWVudD59XHJcblx0XHQgKi9cclxuXHRcdHByaXZhdGUgZW1wdHlGb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogZm9ybcOhdCBzbG91cGPFryBncmlkdVxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIGdyaWRGb3JtYXQ6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ7XHJcblxyXG5cdFx0cHJpdmF0ZSBncmlkRm9ybWF0VmVyc2lvbjogR29yZGljLkRhdGEuR3JpZEZvcm1hdDtcclxuXHJcblx0XHRwcml2YXRlIG1haW5Mb2dzUGFuZWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG5cdFx0cHJpdmF0ZSBtYWluTG9nc1BhbmVsVmVyc2lvbjogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcblx0XHRwcml2YXRlIHR5cFZpZXc6IG51bWJlciA9IDEgLy8wPSB2w71jaG96w60gLyAxPWRsZSB0eXB1IHBvcGlzdSAvIDI9ZGxlIHR5cHUgcmV2aXplXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBEYXRhIHZpZXcgayB2emhsZWTDoXbDoW7DrSBwb3Bpc8WvIHptxJtuXHJcblx0XHQgKi9cclxuXHRcdHByaXZhdGUgdmlld1NlYXJjaFptZW55OiBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5BZHQuSW50ZXJmYWNlLkdQb3Bpc1ptZW55RHRvPjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIERhdGEgdmlldyBrIHBvcGlzxa9tIHptxJtuXHJcblx0XHQgKi9cclxuXHRcdHByaXZhdGUgdmlld1ptZW55OiBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5BZHQuSW50ZXJmYWNlLkdQb3Bpc1ptZW55RHRvPjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIERhdGEgdmlldyBrIHBvcGlzxa9tIHptxJtuXHJcblx0XHQgKi9cclxuXHRcdHByaXZhdGUgdmlld1ptZW55T3JpZzogR29yZGljLkRhdGEuVmlldzxHb3JkaWMuQWR0LkludGVyZmFjZS5HUG9waXNabWVueUR0bz47XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBEYXRhIHZpZXcgayBwb3Bpc8WvbSB6bcSbblx0ZGFuw6kgdmVyemVcclxuXHRcdCAqL1xyXG5cdFx0cHJpdmF0ZSB2aWV3Wm1lbnlWZXJzaW9uOiBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5BZHQuSW50ZXJmYWNlLkdQb3Bpc1ptZW55RHRvPjtcclxuXHJcblx0XHQvKipcclxuXHRcdCogZWxlbWVudCBmaWx0ZXJwYW5lbHUgXHJcblx0XHQqICovXHJcblx0XHRwcml2YXRlIGZpbHRlcjogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcblx0XHRwcml2YXRlIHRhZ3lTZWFyY2g6IHN0cmluZ1tdID0gW107XHJcblxyXG5cdFx0cHJpdmF0ZSB0YWd5U2VhcmNoQXRlc3RhY2U6IHN0cmluZ1tdID0gW107XHJcblxyXG5cdFx0cHJpdmF0ZSBwcml6X3Nlczogc3RyaW5nID0gXCJcIjtcclxuXHJcblx0XHRwcml2YXRlIGZhemVTZWFyY2g6IHN0cmluZ1tdID0gW107XHJcblxyXG5cclxuXHRcdHByaXZhdGUgdmVyemVTZWFyY2g6IHN0cmluZztcclxuXHJcblx0XHRwcml2YXRlIGRhdF9vZDogRGF0ZVxyXG5cclxuXHRcdHByaXZhdGUgZGF0X2RvOiBEYXRlXHJcblxyXG5cdFx0cHJpdmF0ZSBNRFByb2Nlc3NvcjogYW55XHJcblxyXG5cdFx0cHJpdmF0ZSBzZWFyY2hWYWx1ZTogc3RyaW5nID0gXCJcIjtcclxuXHJcblx0XHRwcml2YXRlIHJlc1NlYXJjaDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRGF0YSB2aWV3IGsgdnpobGVkw6F2w6Fuw60gcG9waXPFryB6bcSbblxyXG5cdFx0ICovXHJcblx0XHQvL3ByaXZhdGUgdmlld1NlYXJjaFptZW55OiBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5BZHQuSW50ZXJmYWNlLkdQb3Bpc3labWVuRHRvPjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIERhdGEgdmlldyBrIHBvcGlzxa9tIHptxJtuXHJcblx0XHQgKi9cclxuXHRcdC8vcHJpdmF0ZSB2aWV3Wm1lbnk6IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLkFkdC5JbnRlcmZhY2UuR1BvcGlzeVptZW5EdG8+O1xyXG5cclxuXHRcdC8vI2VuZHJlZ2lvblxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogb25Db250ZW50UmVhZHlcclxuXHRcdCAqL1xyXG5cdFx0cHVibGljIG9uQ29udGVudFJlYWR5KCkge1xyXG5cdFx0XHR0aGlzLmluaXQoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIGluaXQgY29udGVudFxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIGluaXQoKSB7XHJcblx0XHRcdGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cdFx0XHR0aGlzLnNldFRpdGxlKCk7XHJcblx0XHRcdC8vWsOtc2vDoW7DrSBwcm9ncmFtb3bDvWNoIGbDoXrDrVxyXG5cdFx0XHR0aGlzLmNhbGw8R29yZGljLkFkdC5JbnRlcmZhY2UuR0dkZWNmYXpEdG9bXT4oXCJOYWN0aUZhemVcIiwgeyBWc3R1cG5pRGF0YToge30gfSlcclxuXHRcdFx0XHQuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0XHRcdFx0dmFyIGZhemVBcnI6IHN0cmluZ1tdID0gW107XHJcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0aWYgKGRhdGFbaV0gIT0gbnVsbCAmJiBkYXRhW2ldICE9IHVuZGVmaW5lZCAmJiBkYXRhW2ldLmZhemUgIT0gdW5kZWZpbmVkICYmIGRhdGFbaV0uZmF6ZSAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhhdC5mYXplVHh0RGF0YS5wdXNoKGRhdGFbaV0uZmF6ZSlcclxuXHRcdFx0XHRcdFx0XHR0aGF0LmZhemVEYXRhLnB1c2goZGF0YVtpXSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJmYXplXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRhdGFcIiwgdGhhdC5mYXplVHh0RGF0YSlcclxuXHRcdFx0XHRcdGlmICh0aGF0LmZhemUgIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdHZhciBmYXplRmllbGQ6IHN0cmluZ1tdID0gW107XHJcblx0XHRcdFx0XHRcdGZhemVGaWVsZC5wdXNoKHRoYXQuZmF6ZSlcclxuXHRcdFx0XHRcdFx0Ly9JbmZvcm1hY2UgbyBwcm9ncmFtb3bDvWNoIGbDoXrDrWNoXHJcblx0XHRcdFx0XHRcdC8vZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdC8vXHRpZiAoZGF0YVtpXSAhPSBudWxsICYmIGRhdGFbaV0gIT0gdW5kZWZpbmVkICYmIGRhdGFbaV0uZmF6ZSAhPSB1bmRlZmluZWQgJiYgZGF0YVtpXS5mYXplICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0Ly9cdFx0ZmF6ZUZpZWxkLnB1c2goZGF0YVtpXS5mYXplKVxyXG5cdFx0XHRcdFx0XHQvL1x0XHR0aGF0LmZhemVEYXRhLnB1c2goZGF0YVtpXSlcclxuXHRcdFx0XHRcdFx0Ly9cdH1cclxuXHRcdFx0XHRcdFx0Ly99XHJcblx0XHRcdFx0XHRcdC8vXHJcblx0XHRcdFx0XHRcdHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiZmF6ZVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYXplRmllbGQpXHJcblx0XHRcdFx0XHRcdC8vRGVmYXVsdG7DrSBuYcSNdGVuw60gc2V6bmFtdSB6bcSbbiBwxZlpIGZpbHRydSBuYSBwcm9ncmFtb3ZvdSBmw6F6aVxyXG5cdFx0XHRcdFx0XHRpZiAodGhhdC5tYWluTG9nc1BhbmVsICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdHRoYXQubWFpbkxvZ3NQYW5lbC5nY292ZXIoeyB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBwb3Bpc8WvIHptxJtuXCIgfSlcclxuXHRcdFx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5yZXZpemUgPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhhdC5fY3JlYXRlQ2hhbmdlTG9nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAodGhhdC5yZXZpemUgIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdHZhciB0YWd5RmllbGQ6IHN0cmluZ1tdID0gW107XHJcblx0XHRcdFx0XHRcdHRhZ3lGaWVsZC5wdXNoKHRoYXQucmV2aXplKVxyXG5cdFx0XHRcdFx0XHR0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInRhZ3lWeWJlclwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0YWd5RmllbGQpXHJcblx0XHRcdFx0XHRcdC8vRGVmYXVsdG7DrSBuYcSNdGVuw60gc2V6bmFtdSB6bcSbbiBwxZlpIGZpbHRydSBuYSBwcm9ncmFtb3ZvdSBmw6F6aVxyXG5cdFx0XHRcdFx0XHRpZiAodGhhdC5tYWluTG9nc1BhbmVsICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdHRoYXQubWFpbkxvZ3NQYW5lbC5nY292ZXIoeyB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBwb3Bpc8WvIHptxJtuXCIgfSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR0aGF0Ll9jcmVhdGVDaGFuZ2VMb2coKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSlcclxuXHJcblx0XHRcdC8vUmVnaXN0cmFjZSBha2PDrVxyXG5cdFx0XHR0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG5cdFx0XHRcdGFjdEV4cG9ydDoge1xyXG5cdFx0XHRcdFx0aWNvbjogXCJnaS1nZW5lcmF0ZVwiLFxyXG5cdFx0XHRcdFx0dG9vbHRpcDogXCJHZW5lcm92YXQgZGF0YVwiLFxyXG5cdFx0XHRcdFx0cnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cdFx0XHRcdFx0XHR0aGF0LmFjdGlvbnMuYWN0RXhwb3J0Py5zZXRQZW5kaW5nKGRlZi5wcm9taXNlKCkpO1xyXG5cdFx0XHRcdFx0XHR2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTQtOC0wLCBNLTQtOC0wLCBTLTQtOC0wXCIgfSlcclxuXHRcdFx0XHRcdFx0XHQuYWRkU2VjdGlvbihcIk5hc3RhdmVuw60gZXhwb3J0dSBkYXRcIilcclxuXHRcdFx0XHRcdFx0XHQuYWRkUm93KFwiT2JsYXN0IGRhdFwiKVxyXG5cdFx0XHRcdFx0XHRcdC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgLypcInctNlwiLCovIHtcclxuXHRcdFx0XHRcdFx0XHRcdG5hbWU6IFwiZmllbGRUeXBQb3Bpc1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YTogW1wiQWt0dcOhbG7DrSBkYXRhXCIsIFwidmVyemUgNTI0XCIsIFwidmVyemUgNTI1XCJdLFxyXG5cdFx0XHRcdFx0XHRcdFx0aW5pdGlhbFZhbHVlOiBcIkFrdHXDoWxuw60gZGF0YVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0aXRlbVdpZHRoOiBcIlwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZHJvcGRvd246IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRjdXN0b21DbGFzczogXCJ0ZXh0LWFsaWduOiBlZnRcIixcclxuXHRcdFx0XHRcdFx0XHRcdGdyYXBoaWNJbnB1dDogXCJoaWRkZW5cIixcclxuXHRcdFx0XHRcdFx0XHRcdGxpc3Q6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChjdHgudmFsdWUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGF0LmRhdGFFeHBvcnQgPSBjdHgudmFsdWVcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0LmFkZFJvdyhcIkRhdG92w70gZm9ybcOhdFwiKVxyXG5cdFx0XHRcdFx0XHRcdC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgLypcInctNlwiLCovIHtcclxuXHRcdFx0XHRcdFx0XHRcdG5hbWU6IFwiZmllbGRUeXBQb3Bpc1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YTogW1wiSFRNTFwiLCBcIkRPQ1hcIiwgXCJURVhUXCJdLFxyXG5cdFx0XHRcdFx0XHRcdFx0aW5pdGlhbFZhbHVlOiBcIkhUTUxcIixcclxuXHRcdFx0XHRcdFx0XHRcdGl0ZW1XaWR0aDogXCJcIixcclxuXHRcdFx0XHRcdFx0XHRcdGRyb3Bkb3duOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y3VzdG9tQ2xhc3M6IFwidGV4dC1hbGlnbjogbGVmdFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0Z3JhcGhpY0lucHV0OiBcImV4Y2x1c2l2ZVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0bGlzdDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdGl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gKHZhbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodmFsID09IFwiSFRNTFwiKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsID0gR29yZGljLlByZWZhYnMuVXRpbHMuZ2V0U2luZ2xlTGluZUluZm8oeyBpY29uOiBcImZhLWZpbGUtY29kZS1vXCIsIGluZm86IHZhbCB9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh2YWwgPT0gXCJET0NYXCIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YWwgPSBHb3JkaWMuUHJlZmFicy5VdGlscy5nZXRTaW5nbGVMaW5lSW5mbyh7IGljb246IFwiZmEtZmlsZS13b3JkLW9cIiwgaW5mbzogdmFsIH0pXHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHZhbCA9PSBcIlRFWFRcIikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhbCA9IEdvcmRpYy5QcmVmYWJzLlV0aWxzLmdldFNpbmdsZUxpbmVJbmZvKHsgaWNvbjogXCJmYS1maWxlLXRleHQtb1wiLCBpbmZvOiB2YWwgfSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdmFsO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGN0eC52YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoYXQuZGF0YUZvcm1hdCA9IGN0eC52YWx1ZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblxyXG5cdFx0XHRcdFx0XHR0aGF0LmRhdGFFeHBvcnQgPSBcIkFrdHXDoWxuw60gZGF0YVwiXHJcblx0XHRcdFx0XHRcdHRoYXQuZGF0YUZvcm1hdCA9IFwiSFRNTFwiXHJcblx0XHRcdFx0XHRcdHZhciBzaW1wbGVFeHBvcnRGb3JtID0gdGhhdC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJFeHBvcnQgcG9waXPFryB6bcSbblwiLCBmb3JtLCB7fSwgJC5leHRlbmQoe30sIHtcclxuXHRcdFx0XHRcdFx0XHRjb21tYW5kQmFyOiBbXHJcblx0XHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGZhdm9yaXRlOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRwcmltYXJ5OiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvL2FsaWduOiBcIm9wcG9zaXRlXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGljb246IFwiZ2ktZ2VuZXJhdGVcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXB0aW9uOiBcIkV4cG9ydG92YXRcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRydW46IChldiwgdGFyZ2V0KSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodGhhdC5kYXRhRm9ybWF0ID09IFwiSFRNTFwiKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoYXQuZG93bmxvYWRJbm5lckh0bWwoJ2NoYW5nZWxvZy5odG1sJywgJ21haW4tbG9ncycsICd0ZXh0L2h0bWwnLCB0aGF0LmRhdGFFeHBvcnQsIHRoYXQuZGF0YUZvcm1hdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmICh0aGF0LmRhdGFGb3JtYXQgPT0gXCJET0NYXCIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhhdC5kb3dubG9hZElubmVySHRtbCgnY2hhbmdlbG9nLmRvYycsICdtYWluLWxvZ3MnLCAnYXBwbGljYXRpb24vbXN3b3JkJywgdGhhdC5kYXRhRXhwb3J0LCB0aGF0LmRhdGFGb3JtYXQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAodGhhdC5kYXRhRm9ybWF0ID09IFwiVEVYVFwiKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoYXQuZG93bmxvYWRJbm5lckh0bWwoJ2NoYW5nZWxvZy50eHQnLCAnbWFpbi1sb2dzJywgJ3RleHQvcGxhaW4nLCB0aGF0LmRhdGFFeHBvcnQsIHRoYXQuZGF0YUZvcm1hdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3RoYXQuZG93bmxvYWRJbm5lckh0bWwoJ2NoYW5nZWxvZy5odG1sJywgJ21haW4tbG9ncycsICd0ZXh0L2h0bWwnLCB0aGF0LmRhdGFFeHBvcnQsIHRoYXQuZGF0YUZvcm1hdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodGhhdC5kYXRhRXhwb3J0ID09IFwiQWt0dcOhbG7DrSBkYXRhXCIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhhdC5ub3RpZmljYXRpb24oXCJhZGRcIiwgeyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1zdWNjZXNzXCIsIGlkOiBcIkRvd25sb2FkQ2hhbmdlbG9nRmlsZVwiLCBzdGF0ZTogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIkV4cG9ydCBkYXRcIiwgY29udGVudDogXCJQxZllaGxlZCB6bcSbbiBieWwgw7pzcMSbxaFuxJsgdnlnZW5lcm92w6FuXCIgfSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vZGVmLnJlc29sdmUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNpbXBsZUV4cG9ydEZvcm0uZ2NvbnRlbnQoKS5jbG9zZSh7IGdlbmVyYXRlZDogdHJ1ZSB9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pLFxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZmF2b3JpdGU6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vYWxpZ246IFwib3Bwb3NpdGVcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0YWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bmFtZTogXCJhY3RDYW5jZWxcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXB0aW9uOiBcIlpydcWhaXRcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJ1bjogZnVuY3Rpb24gKGV2KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2RlZi5yZWplY3QoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNpbXBsZUV4cG9ydEZvcm0uZ2NvbnRlbnQoKS5jbG9zZSh7IGdlbmVyYXRlZDogZmFsc2UgfSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly9wcmltYXJ5OiB0cnVlXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XSwgd2lkdGg6IDUwMCwgaGVpZ2h0OiAyNTBcclxuXHRcdFx0XHRcdFx0fSkgYXMgR1NpbXBsZUZvcm1EaWFsb2dPcHRpb25zKS5vbih7XHJcblx0XHRcdFx0XHRcdFx0Y2xvc2U6IGZ1bmN0aW9uIChldiwgZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly9kZWYucmVqZWN0KClcclxuXHRcdFx0XHRcdFx0XHRcdHNpbXBsZUV4cG9ydEZvcm0uZ2NvbnRlbnQoKS5jbG9zZSh7IGdlbmVyYXRlZDogZmFsc2UgfSlcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0c2ltcGxlRXhwb3J0Rm9ybS5vbih7XHJcblx0XHRcdFx0XHRcdFx0Y2xvc2U6IGZ1bmN0aW9uIChldiwgZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGRhdGEgIT0gdW5kZWZpbmVkICYmIGRhdGEuZ2VuZXJhdGVkICE9IHVuZGVmaW5lZCAmJiBkYXRhLmdlbmVyYXRlZCA9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGRlZi5yZXNvbHZlKClcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRkZWYucmVqZWN0KClcclxuXHRcdFx0XHRcdFx0XHRcdFx0c2ltcGxlRXhwb3J0Rm9ybS5nY29udGVudCgpLmNsb3NlKClcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoYXQuY3JlYXRlRmlsdGVyUGFuZWwoKTtcclxuXHRcdFx0Ly90aGF0LmVsZW1lbnQuZmluZEZvcm1Sb3dzKFwidGFneVJvd1wiKS5wcmVwZW5kKCQoXCI8aWNvbj5cIikuZ3N0YXRpYyh7IGljb246IFwiZmEtbG9ja1wiLCB0b29sdGlwOiBcIkplZG7DoSBzZSBvIG5ldsWZZWpuw70gcG9waXMgem3Em25cIiwgLypjYXB0aW9uOiBcIlRhZ3k6IFwiKi8gfSkpXHJcblx0XHRcdHRoYXQuZ2V0TWRQcm9jZXNzb3IoKVxyXG5cdFx0XHQvL1pvYnJhemVuw60gem3Em25cclxuXHRcdFx0dGhhdC5jcmVhdGVNYWluVGFnc1BhbmVsKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogc2V0VGl0bGUgLSBUaXR1bGVrIMO6bG9oeVxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIHNldFRpdGxlKCkge1xyXG5cdFx0XHR0aGlzLnRpdGxlID0gXCJqcmVzOjMzMTc3MDAxXCJcdCAvL1JDIDMzMTc3MDAxIDogUMWZZWhsZWQgem3Em25cclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIGRvd25sb2FkSW5uZXJIdG1sIC0gR2VuZXJvdsOhbsOtIHJlcG9ydHUgem3Em25cclxuXHRcdCAqIFxyXG5cdFx0ICogQHBhcmFtIHthbnl9IGZpbGVuYW1lXHJcblx0XHQgKiBAcGFyYW0ge2FueX0gZWxJZFxyXG5cdFx0ICogQHBhcmFtIHthbnl9IG1pbWVUeXBlXHJcblx0XHQgKiBAcGFyYW0ge2FueX0gZGF0YVJhbmdlXHJcblx0XHQgKiBAcGFyYW0ge2FueX0gZGF0YUZvcm1hdFxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIGRvd25sb2FkSW5uZXJIdG1sKGZpbGVuYW1lLCBlbElkLCBtaW1lVHlwZSwgZGF0YVJhbmdlLCBkYXRhRm9ybWF0KSB7XHRcclxuXHRcdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblx0XHRcdHZhciBleHBvcnRIdG1sXHJcblx0XHRcdHZhciBleHBvcnRIdG1sVGVzdCBcclxuXHRcdFx0dmFyIHN0eWxlSHRtbFxyXG5cdFx0XHR2YXIgaHRtbFxyXG5cdFx0XHRpZiAoZGF0YVJhbmdlID09IFwiQWt0dcOhbG7DrSBkYXRhXCIpIHtcclxuXHRcdFx0XHRpZiAoZGF0YUZvcm1hdCA9PSBcIkhUTUxcIikge1xyXG5cdFx0XHRcdFx0ZXhwb3J0SHRtbCA9IHRoYXQubWFpbkxvZ3NQYW5lbFswXSAgLy9leHBvcnRIdG1sVGVzdCAgIC8vLm91dGVySFRNTCAvLy5pbm5lckhUTUxcclxuXHRcdFx0XHRcdGV4cG9ydEh0bWwgPSB0aGF0LmdldE91dGVySFRNTFdpdGhJbmxpbmVTdHlsZSh0aGF0Lm1haW5Mb2dzUGFuZWxbMF0pXHJcblx0XHRcdFx0XHRodG1sID0gXCI8IURPQ1RZUEUgaHRtbD48aHRtbD48aGVhZD48dGl0bGU+Q2hhbmdlbG9nIEhUTUwgZ2VuZXJhdGVkIHJlcG9ydDwvdGl0bGU+PG1ldGEgY2hhcnNldD0nVVRGLTgnPjxzdHlsZT5cIlxyXG5cdFx0XHRcdFx0XHRcdCsgXCIuXCIgKyB0aGF0Lm1haW5Mb2dzUGFuZWxbMF0uY2hpbGRyZW5bMF0uY2xhc3NOYW1lXHJcblx0XHRcdFx0XHRcdFx0KyBcIntcIiArIGV4cG9ydEh0bWwgKyBcIn1cIlxyXG5cdFx0XHRcdFx0XHRcdCsgXCI8L3N0eWxlPjwvaGVhZD48Ym9keT5cIlxyXG5cdFx0XHRcdFx0XHQrIGV4cG9ydEh0bWwgKyBcIjxzY3JpcHQ+XCIgK1wiXFxuIHZhciByZXZpc2lvbiA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKSBcXG4gIGlmIChyZXZpc2lvbil7IFxcbiBsZXQgc2Nyb2xsVG9FbG0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChyZXZpc2lvbikgXFxuIGlmICghc2Nyb2xsVG9FbG0peyBcXG4gbGV0IG1vZHVsZSA9IHJldmlzaW9uLnN1YnN0cmluZygyLDcpICBcXG4gIGlmIChyZXZpc2lvbi5zdWJzdHJpbmcoMCwyKSA9PSAnMjAnKXsgcmV2aXNpb24gPSAnR01TJyArIG1vZHVsZX0gXFxuIGlmIChyZXZpc2lvbi5zdWJzdHJpbmcoMCwyKSA9PSAnMzInKXsgcmV2aXNpb24gPSAnR0lOJyArIG1vZHVsZX0gIFxcbiBpZiAocmV2aXNpb24uc3Vic3RyaW5nKDAsMikgPT0gJzQwJyl7IHJldmlzaW9uID0gJ0dTQScgKyBtb2R1bGV9IFxcbiBpZiAocmV2aXNpb24uc3Vic3RyaW5nKDAsMikgPT0gJzQxJyl7IHJldmlzaW9uID0gJ0dXQScgKyBtb2R1bGV9IFxcbiBpZiAocmV2aXNpb24uc3Vic3RyaW5nKDAsMikgPT0gJzQyJyl7IHJldmlzaW9uID0gJ0dXUycgKyBtb2R1bGV9IFxcbiBpZiAocmV2aXNpb24uc3Vic3RyaW5nKDAsMikgPT0gJzQzJyl7IHJldmlzaW9uID0gJ0dTUycgKyBtb2R1bGV9IFxcbiAgc2Nyb2xsVG9FbG0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChyZXZpc2lvbil9IFxcbiBpZiAoc2Nyb2xsVG9FbG0peyBcXG4gc2Nyb2xsVG9FbG0uc2Nyb2xsSW50b1ZpZXcoKSBcXG4gfSBcXG4gfVwiK1wiPC9zY3JpcHQ+PC9ib2R5PjwvaHRtbD5cIjtcdCAgIFxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYgKGRhdGFGb3JtYXQgPT0gXCJET0NYXCIpIHtcclxuXHRcdFx0XHRcdGh0bWwgPSB0aGF0Lm1haW5Mb2dzUGFuZWxbMF0uaW5uZXJUZXh0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYgKGRhdGFGb3JtYXQgPT0gXCJURVhUXCIpIHtcclxuXHRcdFx0XHRcdGh0bWwgPSB0aGF0Lm1haW5Mb2dzUGFuZWxbMF0uaW5uZXJUZXh0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHRoYXQuY3JlYXRlTWFpbkxvZ3NQYW5lbFZlcnNpb24oKTtcdCAgXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0dmFyIHRlc3QgPSBIVE1MQm9keUVsZW1lbnRcclxuXHRcdFx0bWltZVR5cGUgPSBtaW1lVHlwZSB8fCAndGV4dC9wbGFpbic7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGZpbGVuYW1lKTtcclxuXHRcdFx0aWYgKGh0bWwpIHtcclxuXHRcdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICdkYXRhOicgKyBtaW1lVHlwZSArICc7Y2hhcnNldD11dGYtOCwnICsgLyplbmNvZGVVUklDb21wb25lbnQoZXhwb3J0SHRtbCkqLyBlbmNvZGVVUklDb21wb25lbnQoLypleHBvcnRIdG1sKi9odG1sKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0bGluay5jbGljaygpO1xyXG5cdFx0XHR0aGF0Lm1haW5Mb2dzUGFuZWxbMF0uc3R5bGUud2lkdGggPSB0aGF0Lm9yaWdXaWR0aFxyXG5cdFx0XHR0aGF0Lm1haW5Mb2dzUGFuZWxbMF0uc3R5bGUuaGVpZ2h0ID0gdGhhdC5vcmlnSGVpZ3RoXHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBnZXRPdXRlckhUTUxXaXRoSW5saW5lU3R5bGUoZWwpIHtcclxuXHRcdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblx0XHRcdHRoYXQuY2xvbmVFbCA9ICBlbDtcclxuXHRcdFx0bGV0IHMgPSBnZXRDb21wdXRlZFN0eWxlKHRoYXQuY2xvbmVFbCk7XHJcbiAgICAgICAgICAgIHZhciBpOiBzdHJpbmdbXSA9IFtdXHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISgra2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wID0ga2V5LnJlcGxhY2UoL1xcLShbYS16XSkvZywgdiA9PiB2WzFdLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGkucHVzaChgJHtrZXl9OiAke3Nba2V5XX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cdFx0XHR0aGF0LmNsb25lRWwuc2V0QXR0cmlidXRlKCdzdHlsZScsIGkuam9pbihcIjsgXCIpKTtcclxuXHRcdFx0dGhhdC5vcmlnSGVpZ3RoID0gdGhhdC5jbG9uZUVsLnN0eWxlLmhlaWdodDtcclxuXHRcdFx0dGhhdC5vcmlnV2lkdGggPSB0aGF0LmNsb25lRWwuc3R5bGUud2lkdGg7XHJcblx0XHRcdHRoYXQuY2xvbmVFbC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIlxyXG5cdFx0XHR0aGF0LmNsb25lRWwuc3R5bGUud2lkdGggPSBcImF1dG9cIlxyXG5cdFx0XHRyZXR1cm4gdGhhdC5jbG9uZUVsLm91dGVySFRNTDtcclxuICAgICAgICB9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBkb3dubG9hZElubmVySHRtbFZlcnNpb25cdC0gR2VuZXJvdsOhbsOtIHNvdWhybm7DqWhvIHJlcG9ydHVcclxuXHRcdCAqIFxyXG5cdFx0ICogQHBhcmFtIHthbnl9IGZpbGVuYW1lXHJcblx0XHQgKiBAcGFyYW0ge2FueX0gZWxJZFxyXG5cdFx0ICogQHBhcmFtIHthbnl9IG1pbWVUeXBlXHJcblx0XHQgKiBAcGFyYW0ge2FueX0gZGF0YVJhbmdlXHJcblx0XHQgKiBAcGFyYW0ge2FueX0gZGF0YUZvcm1hdFxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIGRvd25sb2FkSW5uZXJIdG1sVmVyc2lvbihmaWxlbmFtZSwgZWxJZCwgbWltZVR5cGUsIGRhdGFSYW5nZSwgZGF0YUZvcm1hdCkge1xyXG5cdFx0XHRjb25zdCB0aGF0ID0gdGhpcztcclxuXHRcdFx0dmFyIGV4cG9ydEh0bWw1MjRcclxuXHRcdFx0dmFyIHN0eWxlSHRtbDUyNFxyXG5cdFx0XHR2YXIgaHRtbDUyNFxyXG5cdFx0XHRpZiAoZGF0YUZvcm1hdCA9PSBcIkhUTUxcIikge1xyXG5cdFx0XHRcdGV4cG9ydEh0bWw1MjQgPSB0aGF0Lm1haW5Mb2dzUGFuZWxWZXJzaW9uWzBdLmlubmVySFRNTFx0XHJcblx0XHRcdFx0aHRtbDUyNCA9IFwiPCFET0NUWVBFIGh0bWw+PGh0bWw+PGhlYWQ+PHRpdGxlPkNoYW5nZWxvZyBIVE1MIGdlbmVyYXRlZCByZXBvcnQ8L3RpdGxlPjxtZXRhIGNoYXJzZXQ9J1VURi04Jz48c3R5bGU+XCJcclxuXHRcdFx0XHRcdCsgXCIuXCIgKyB0aGF0Lm1haW5Mb2dzUGFuZWxWZXJzaW9uWzBdPy5jaGlsZHJlblswXT8uY2xhc3NOYW1lXHJcblx0XHRcdFx0XHQrIFwie1wiICsgZXhwb3J0SHRtbDUyNCArIFwifVwiXHJcblx0XHRcdFx0XHQrIFwiPC9zdHlsZT48L2hlYWQ+PGJvZHk+XCJcclxuXHRcdFx0XHRcdCsgZXhwb3J0SHRtbDUyNCArIFwiPC9ib2R5PjwvaHRtbD5cIjtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChkYXRhRm9ybWF0ID09IFwiRE9DWFwiKSB7XHJcblx0XHRcdFx0aHRtbDUyNCA9IHRoYXQubWFpbkxvZ3NQYW5lbFZlcnNpb25bMF0uaW5uZXJUZXh0XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoZGF0YUZvcm1hdCA9PSBcIlRFWFRcIikge1xyXG5cdFx0XHRcdGh0bWw1MjQgPSB0aGF0Lm1haW5Mb2dzUGFuZWxWZXJzaW9uWzBdLmlubmVyVGV4dFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgbGluazUyNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0bWltZVR5cGUgPSAgbWltZVR5cGUgfHwgJ3RleHQvcGxhaW4nO1xyXG5cdFx0XHRsaW5rNTI0LnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlbmFtZSk7XHJcblx0XHRcdGlmIChodG1sNTI0KSB7XHJcblx0XHRcdFx0bGluazUyNC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnZGF0YTonICsgJ3RleHQvaHRtbCcgKyAnO2NoYXJzZXQ9dXRmLTgsJyArIGVuY29kZVVSSUNvbXBvbmVudChodG1sNTI0KSk7XHJcblx0XHRcdH1cclxuXHRcdFx0bGluazUyNC5jbGljaygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogdnl0dm/FmWkgZmlsdHJQYW5lbFxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIGNyZWF0ZUZpbHRlclBhbmVsKCkge1xyXG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHRcdHRoaXMuZmlsdGVyID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkub24oXCJnZmlsdGVycGFuZWxmb3JtYnVpbGRlZFwiLCBmdW5jdGlvbiAoZXZlbnQsIG9iaikge1xyXG5cdFx0XHRcdC8vVWTDoWxvc3QgcG8gdnl0dm/FmWVuw60gZmlsdGVycGFuZWx1XHJcblx0XHRcdH0pXHJcblx0XHRcdFx0LmdmaWx0ZXJwYW5lbCh7XHJcblx0XHRcdFx0XHQvLyAwMS4wMy4yMDIxIC0gVEZlaWtcclxuXHRcdFx0XHRcdC8vIE5haHJhemVuw60gb2Jzb2xldGUgcGFyYW1ldHLFry5cclxuXHRcdFx0XHRcdGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcblx0XHRcdFx0XHQvL3NpbXBsZU1vZGU6IHRydWUsXHJcblx0XHRcdFx0XHRmYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IFwiTDVNM1MxXCIsXHJcblx0XHRcdFx0XHRmb3JtczogW3RoYXQuY3JlYXRlRmlsdGVyRm9ybSgpXSxcclxuXHRcdFx0XHRcdGFwcGx5OiBmdW5jdGlvbiAoZXZlbnQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tYWluTG9nc1BhbmVsICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdHRoYXQubWFpbkxvZ3NQYW5lbC5nY292ZXIoeyB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBwb3Bpc8WvIHptxJtuXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdFx0XHR0aGF0Ll9jcmVhdGVDaGFuZ2VMb2coKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KS5vbihcImdmaWx0ZXJwYW5lbGFwcGx5XCIsIGZ1bmN0aW9uIChldmVudCwgb2JqKSB7XHJcblx0XHRcdFx0XHR0aGF0LmNhbGw8R29yZGljLkFkdC5JbnRlcmZhY2UuR0dkZWNmYXpEdG9bXT4oXCJOYWN0aUZhemVcIiwgeyBWc3R1cG5pRGF0YToge30gfSlcclxuXHRcdFx0XHRcdFx0LmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGF0LmZhemVUeHREYXRhID0gW107XHJcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoZGF0YVtpXSAhPSBudWxsICYmIGRhdGFbaV0gIT0gdW5kZWZpbmVkICYmIGRhdGFbaV0uZmF6ZSAhPSB1bmRlZmluZWQgJiYgZGF0YVtpXS5mYXplICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhhdC5mYXplVHh0RGF0YS5wdXNoKGRhdGFbaV0uZmF6ZSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhhdC5mYXplRGF0YS5wdXNoKGRhdGFbaV0pXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiZmF6ZVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkYXRhXCIsIHRoYXQuZmF6ZVR4dERhdGEpXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIGNyZWF0ZUZpbHRlckZvcm0oKSB7XHJcblx0XHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHRcdFx0bGV0IGZpbHRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG5cdFx0XHRcdG5hbWU6IFwiRm9ybUZpbHRyU2V6bmFtUHJlaGxlZFptZW5cIixcclxuXHRcdFx0XHQvL3RhYkxhYmVsOiBcImpyZXM6MzIwMDAwNDFcIiwgLy9SQyAzMjAwMDA0MSA6IEtvbXBsZXRuw60gZmlsdHJcclxuXHRcdFx0XHRsYXlvdXREZXNjcmlwdG9yOiBcIkw2TTNTMSwgTC0wLTEyLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwiXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRmaWx0ZXJGb3JtXHJcblx0XHRcdFx0LmFkZFNlY3Rpb24oKVxyXG5cdFx0XHRmaWx0ZXJGb3JtXHJcblx0XHRcdFx0LmFkZFJvdyh7IGxhYmVsOiBcIjxpIGNsYXNzPSdnaSBnaS0yeCBnaS16dmVyZWpuaXQnPjwvaT5admXFmWVqbsSbbm8gb2QtZG9cIiB9KSAvL1JDIDMzMTEyMDY5IDogWnZlxZllam7Em25vIG9kLWRvXHJcblx0XHRcdFx0LmFkZEZpZWxkKFwiZ2RhdGVjb21ib2JveFwiLCAge1xyXG5cdFx0XHRcdFx0bmFtZTogXCJkYXRfem1lbmFcIixcclxuXHRcdFx0XHRcdG1vZGVsOiBcIm1vZGVsLmRhdF96bWVuYS5zdGFydD12YWx1ZS5kYXRlLnN0YXJ0O21vZGVsLmRhdF96bWVuYS5lbmQ9dmFsdWUuZGF0ZS5lbmRcIixcclxuXHRcdFx0XHRcdGRheXNSYW5nZU1heDogMzY1LFxyXG5cdFx0XHRcdFx0Y2hhbmdlOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cdFx0XHRcdFx0XHQvL3RoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiZGF0X3ptZW5hXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgc3RhcnQ6IG5ldyBEYXRlKCksIGVuZDogbmV3IERhdGUobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLCBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAzLCBuZXcgRGF0ZSgpLmdldERhdGUoKSkgfSlcclxuXHRcdFx0XHRcdFx0aWYgKGN0eC52YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdHRoYXQuZGF0X29kID0gY3R4LnZhbHVlLmRhdGUuc3RhcnRcclxuXHRcdFx0XHRcdFx0XHR0aGF0LmRhdF9kbyA9IGN0eC52YWx1ZS5kYXRlLmVuZFxyXG5cdFx0XHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdC8vdGhhdC5lbGVtZW50LmZpbmRGaWVsZHMoXCJkYXRfem1lbmFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBkYXRlOiB7IHN0YXJ0OiBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCksIG5ldyBEYXRlKCkuZ2V0TW9udGgoKSAtIDQsIG5ldyBEYXRlKCkuZ2V0RGF0ZSgpKSwgZW5kOiBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCksIDExLCAzMSkgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0XHR9LFx0XHJcblx0XHRcdFx0XHRpbml0aWFsVmFsdWU6IHsgZGF0ZTogeyBzdGFydDogbmV3IERhdGUobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLCBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgLSA2LCBuZXcgRGF0ZSgpLmdldERhdGUoKSksIGVuZDogbmV3IERhdGUobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLCBuZXcgRGF0ZSgpLmdldE1vbnRoKCksIG5ldyBEYXRlKCkuZ2V0RGF0ZSgpLypuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCksIDExLCAzMSovKSB9IH0gLy9cInRoaXNtb250aFwiXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuYWRkUm93KHsgbmFtZTogXCJmYXplUm93XCIsIGxhYmVsOiBcIjxpIGNsYXNzPSdnaSBnaS0yeCBnaS1saXN0Jz48L2k+UHJvZ3JhbW92w6EgZsOhemVcIi8qLCBoaW50OiBcIkbDoXplICh2xI1ldG7EmyBzb3V2aXNlasOtY8OtY2ggZsOhesOtKVwiKi8gfSkgLy9SQyAzMzExMDA2NyA6IEbDoXplXHJcblx0XHRcdFx0LmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCAvKkdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jZmF6KCksKi8gLyooR29yZGljLlByZWZhYnMuU2VsZWN0IGFzIGFueSkuZ0FkdFJlYWRlckZhemUoKSovIC8qR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmNmYXooKSovXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdG5hbWU6IFwiZmF6ZVwiLFxyXG5cdFx0XHRcdFx0XHRtdWx0aTogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0aXRlbVdpZHRoOiBcIlwiLFxyXG5cdFx0XHRcdFx0XHRjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmIChjdHgudmFsdWUgIT0gbnVsbCAmJiBjdHgudmFsdWUubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0XHRcdFx0XHQvL1x0Ly90aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiRm9ybUZpbHRyU2V6bmFtUHJlaGxlZFptZW5cIikuZmluZEZpZWxkcyhcImRhdF96bWVuYVwiKS5nZGF0ZWNvbWJvYm94KHsvKmRheXNSYW5nZU1heDogMzY1Ki99KVxyXG5cdFx0XHRcdFx0XHRcdC8vfVxyXG4gICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHQvL1x0Ly90aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiRm9ybUZpbHRyU2V6bmFtUHJlaGxlZFptZW5cIikuZmluZEZpZWxkcyhcImRhdF96bWVuYVwiKS5nZGF0ZWNvbWJvYm94KHsvKmRheXNSYW5nZU1heDogNjAgKi99KVxyXG4gICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0XHRcdFx0dGhhdC5mYXplU2VhcmNoID0gW107XHJcblx0XHRcdFx0XHRcdFx0aWYgKGN0eC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3R4LnZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQgICB0aGF0LmZhemVTZWFyY2gucHVzaChjdHgudmFsdWVbaV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRoYXQuZmF6ZVNlYXJjaCA9IFtdO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0LmFkZFJvdyh7IG5hbWU6IFwidGFneVJvd1wiLCBsYWJlbDogXCI8aSBjbGFzcz0nZ2kgZ2ktMnggZ2ktbGFiZWwgZ2ktcm90MTgwJz48L2k+VGFneVwiLCBoaW50OiBcIjxpIGNsYXNzPSdnaSBnaS1sYWJlbCBnaS1yb3QxODAnPjwvaT48Yj5Tb3V2aXNlasOtY8OtIHRhZ3k8L2I+IGsgaGxlZGFuw71tIHrDoXpuYW3Fr20uIFxcbiBcXG4gIE5hcMWZw61rbGFkIMSNw61zbG8gcmV2aXplIC8gdmVyemUgZGF0YWLDoXplIGhsZWRhbsOpIGbDoXplXCIgfSlcclxuXHRcdFx0XHQuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIC8qR29yZGljLlByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoKSwqL1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRuYW1lOiBcInRhZ3lWeWJlclwiLFxyXG5cdFx0XHRcdFx0XHRzaG93U2VsZWN0QnV0dG9uOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0bXVsdGk6IHRydWUsXHJcblx0XHRcdFx0XHRcdHN0cmljdDogZmFsc2UsXHJcblx0XHRcdFx0XHRcdGl0ZW1XaWR0aDogXCJcIixcclxuXHRcdFx0XHRcdFx0Y2hhbmdlOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cdFx0XHRcdFx0XHRcdHRoYXQudGFneVNlYXJjaCA9IFtdO1xyXG5cdFx0XHRcdFx0XHRcdHZhciBhdGVzdGFjZSA9IGZhbHNlXHJcblx0XHRcdFx0XHRcdFx0aWYgKGN0eC52YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGN0eC52YWx1ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LnZhbHVlW2ldID09IFwiYXRlc3RhY2VfZXNzbFwiKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICBhdGVzdGFjZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGF0LnRhZ3lTZWFyY2gucHVzaChjdHgudmFsdWVbaV0pXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhhdC50YWd5U2VhcmNoID0gW107XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdCghYXRlc3RhY2UgPyB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImF0ZXN0YWNlXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGZhbHNlKSA6IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiYXRlc3RhY2VcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdHJ1ZSkpIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRjdXN0b21DbGFzczogXCJ3LTEyXCIsIFxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHQuYWRkUm93KHsgbGFiZWw6IFwiVmVyemVcIiB9KSBcclxuXHRcdFx0XHQuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci53aXRoT3BlcmF0b3JzKHtkZWZhdWx0T3BlcmF0b3I6IFwiPVwiLCBvcGVyYXRvcnM6IFtcIj1cIl0gfSApLFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRuYW1lOiBcInZlcnplXCIsXHJcblx0XHRcdFx0XHRcdGRyb3Bkb3duOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRzdHJpY3Q6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHQvL2luaXRpYWxWYWx1ZTogNTI0LCAvLyh0aGF0LnVzZXJTZXR0aW5ncz8uZ2V0KFwidmVyemVcIikgIT0gbnVsbCA/ICh0aGF0LnVzZXJTZXR0aW5ncz8uZ2V0KFwidmVyemVcIikpIDogdGhhdC52ZXJ6ZVt0aGF0LnZlcnplLmxlbmd0aCAtIDFdKSwgLy90aGF0LnZlcnplW3RoYXQudmVyemUubGVuZ3RoIC0gMV0sIC8vemFqaXN0aSBha3R1YWxuaSB2ZXJ6aSxcdCAgLy90aGF0LnVzZXJTZXR0aW5ncz8uZ2V0KFwidmVyemVcIiksXHJcblx0XHRcdFx0XHRcdGRhdGE6IFs1MjQsNTI1LCA1MjZdLFxyXG5cdFx0XHRcdFx0XHRjdXN0b21DbGFzczogXCJ3LTEwXCIsXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMzMTc3MDA3XCIsIGN1c3RvbUNsYXNzOiBcInctNlwiIH0pIC8vUkMgMzMxNzcwMDcgOiBWxI1ldG7EmyBzZXN0YXZcclxuXHRcdFx0XHQuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG5cdFx0XHRcdFx0bmFtZTogXCJzZXN0YXZ5XCIsXHJcblx0XHRcdFx0XHRjdXN0b21DbGFzczogXCJ3LTIgZ2NoZWNrLXN3aXRjaFwiLFxyXG5cdFx0XHRcdFx0aW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuXHRcdFx0XHRcdHRvb2x0aXA6IFwianJlczozMzE3NzAwNlwiLCAvL1JDIDMzMTc3MDA2IDogVsSNZXRuxJsgcHJvZ3JhbW92w71jaCBmw6F6w60gc2VzdGF2XHJcblx0XHRcdFx0XHRjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcblx0XHRcdFx0XHRcdGlmIChjaGFuZ2VPYmoudmFsdWUgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdHRoYXQucHJpel9zZXMgPSBcInByaXpfc2VzXCJcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGF0LnByaXpfc2VzID0gXCJcIlxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MzMxNzcwMDRcIiwgY3VzdG9tQ2xhc3M6IFwidy02XCIgfSkgLy9SQyAzMzE3NzAwNCA6IGF0ZXN0YWNlIE5TRVNTU1xyXG5cdFx0XHRcdC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcblx0XHRcdFx0XHRuYW1lOiBcImF0ZXN0YWNlXCIsXHJcblx0XHRcdFx0XHRjdXN0b21DbGFzczogXCJ3LTIgZ2NoZWNrLXN3aXRjaFwiLFxyXG5cdFx0XHRcdFx0aW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuXHRcdFx0XHRcdHRvb2x0aXA6IFwianJlczozMzE3NzAwNVwiLCAvL1JDIDMzMTc3MDA1IDogcG9waXN5IHptxJtuIG9wcm90aSBhdGVzdG92YW7DqSB2ZXJ6aVxyXG5cdFx0XHRcdFx0Y2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG5cdFx0XHRcdFx0XHR0aGF0LnRhZ3lTZWFyY2hBdGVzdGFjZSA9IFtdXHJcblx0XHRcdFx0XHRcdGlmIChjaGFuZ2VPYmoudmFsdWUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQudGFneVNlYXJjaC5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdC50YWd5U2VhcmNoLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoYXQudGFneVNlYXJjaEF0ZXN0YWNlLnB1c2godGhhdC50YWd5U2VhcmNoW2ldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdFx0XHRjb25zdCBpbmRleCA9IHRoYXQudGFneVNlYXJjaEF0ZXN0YWNlLmluZGV4T2YoXCJhdGVzdGFjZV9lc3NsXCIpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChpbmRleCA+IC0xKSB7IC8vIG9ubHkgc3BsaWNlIGFycmF5IHdoZW4gaXRlbSBpcyBmb3VuZFxyXG5cdFx0XHRcdFx0XHRcdFx0dGhhdC50YWd5U2VhcmNoQXRlc3RhY2Uuc3BsaWNlKGluZGV4LCAxKTsgLy8gMm5kIHBhcmFtZXRlciBtZWFucyByZW1vdmUgb25lIGl0ZW0gb25seVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR0aGF0LnRhZ3lTZWFyY2hBdGVzdGFjZS5wdXNoKFwiYXRlc3RhY2VfZXNzbFwiKVxyXG5cdFx0XHRcdFx0XHRcdHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwidGFneVZ5YmVyXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoYXQudGFneVNlYXJjaEF0ZXN0YWNlKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdGlmICh0aGF0LnRhZ3lTZWFyY2gubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdC50YWd5U2VhcmNoLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoYXQudGFneVNlYXJjaEF0ZXN0YWNlLnB1c2godGhhdC50YWd5U2VhcmNoW2ldKVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRpZiAodGhhdC50YWd5U2VhcmNoQXRlc3RhY2UubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGluZGV4ID0gdGhhdC50YWd5U2VhcmNoQXRlc3RhY2UuaW5kZXhPZihcImF0ZXN0YWNlX2Vzc2xcIik7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoaW5kZXggPiAtMSkgeyAvLyBvbmx5IHNwbGljZSBhcnJheSB3aGVuIGl0ZW0gaXMgZm91bmRcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhhdC50YWd5U2VhcmNoQXRlc3RhY2Uuc3BsaWNlKGluZGV4LCAxKTsgLy8gMm5kIHBhcmFtZXRlciBtZWFucyByZW1vdmUgb25lIGl0ZW0gb25seVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInRhZ3lWeWJlclwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0aGF0LnRhZ3lTZWFyY2hBdGVzdGFjZSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRyZXR1cm4gZmlsdGVyRm9ybTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIGdldE1kUHJvY2Vzc29yKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cdFx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHRcdHJldHVybiBHb3JkaWMuTWFya2Rvd24uZ2V0TURQcm9jZXNzb3IoKVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uIChyZXQpIHtcclxuXHRcdFx0XHRcdHRoYXQuTURQcm9jZXNzb3IgPSByZXQ7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBjcmVhdGVNYWluVGFnUGFuZWxcdC0gWm9icmF6ZW7DrSBobGF2bsOtY2ggdGFnxa8gZG8gcGFuZWx1XHJcblx0XHQgKi9cclxuXHRcdHByaXZhdGUgY3JlYXRlTWFpblRhZ3NQYW5lbCgpIHtcclxuXHRcdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblx0XHRcdC8vUHJvZmlsb3bDqSBha2NlXHJcblx0XHRcdHZhciBwcm9maWxlQWN0aW9ucyA9IG5ldyBHQWN0aW9uTGlzdCh7XHJcblx0XHRcdFx0YWN0Q29uZmlndXJhdGlvbjoge1xyXG5cdFx0XHRcdFx0Y2FwdGlvbjogXCJOYXN0YXZlbsOtIHBvaGxlZHVcIiwgLy9OYXN0YXZlbsOtIHBvaGxlZHVcclxuXHRcdFx0XHRcdGljb246IFwiZmEtY29nXCIsXHJcblx0XHRcdFx0XHRjYXB0aW9uVmlzaWJsZTogXCJuZXZlclwiLFxyXG5cdFx0XHRcdFx0cnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cdFx0XHRcdFx0XHR0aGF0LmNvbmZpZ1Byb2ZpbGUoY3R4LnByb2ZpbGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0pO1xyXG5cdFx0XHR2YXIgbWFpbldyYXBwZXJQYW5lbCA9ICQubmV3RGl2KFwibWFpbi13cmFwcGVyXCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuY3NzKHsgLypcImRpc3BsYXlcIjogXCJpbmxpbmUtYmxvY2tcIiwvKiBcImJvcmRlci1ib3R0b21cIjogXCIxcHggc29saWQgZ3JleVwiLCovLyogXCJtYXJnaW5cIjogXCIxcHhcIiwqLyAvKlwibWFyZ2luLWJvdHRvbVwiOiBcIjVweFwiLCovIFwibWFyZ2luLXRvcFwiOiBcIjVweFwiLCBcIm1hcmdpbi1sZWZ0XCI6IFwiN3B4XCIsIFwibWFyZ2luLXJpZ2h0XCI6IFwiNXB4XCIsIC8qXCJib3JkZXItdG9wXCI6IFwic29saWQgZ3JheSAxcHhcIiwgXCJib3JkZXItbGVmdFwiOiBcInNvbGlkIGdyYXkgMXB4XCIsIFwiYm9yZGVyLXJpZ2h0XCI6IFwic29saWQgZ3JheSAxcHhcIiwqLyBcImhlaWdodFwiOiBcIjM1cHhcIiwgXCJjb2xvclwiOiBcImJsYWNrXCIsIFwidmVydGljYWwtYWxpZ25cIjogXCJtaWRkbGVcIiB9KS5hZGRDbGFzcyhcImctc3RhdGUtbGlnaHRiYWNrZ3JvdW5kIGctc3RhdGUtaW5hY3RpdmVcIikvLyBub3Z5IHBhbmVsLCBrYW0gcHJlc3VuZW1lL3Z5dHZvcmltZSBha3R1YWxuaSBxdWV1ZVxyXG5cdFx0XHR2YXIgbWFpblBhbmVsID0gJC5uZXdEaXYoXCJtYWluLXBhbmVsXCIpO1xyXG5cdFx0XHRtYWluV3JhcHBlclBhbmVsLmFwcGVuZChtYWluUGFuZWwpO1xyXG5cclxuXHRcdFx0Ly9zZWFyY2ggZmllbGRcclxuXHRcdFx0bWFpbldyYXBwZXJQYW5lbC5hcHBlbmQoJC5uZXdTcGFuKCkuY3NzKHsgXCJoZWlnaHRcIjogXCIxcmVtXCIsIFwibWFyZ2luLWxlZnRcIjogXCI1cHhcIiB9KS5nc3RyaW5nYm94KHtcclxuXHRcdFx0XHRuYW1lOiBcInNlYXJjaEZpZWxkXCIsXHJcblx0XHRcdFx0cGxhY2Vob2xkZXI6IFwiSGxlZGF0IHYgcMWZZWhsZWR1Li4uXCIsXHJcblx0XHRcdFx0c3RhdGVzOiBbeyBpY29uOiBcImZhLXNlYXJjaCBnLXN0YXRlLWluYWN0aXZlXCIsIGFsaWduOiBcIm9wcG9zaXRlXCIgfV0sXHJcblx0XHRcdFx0Y3VzdG9tQ2xhc3M6IFwidy0yXCIsXHJcblx0XHRcdFx0Y2hhbmdlOiBmdW5jdGlvbiAoZXYpIHsgZXYuc3RvcFByb3BhZ2F0aW9uKCk7IH0sXHJcblx0XHRcdFx0aW5pdGlhbFZhbHVlOiB0aGF0LnNlYXJjaFZhbHVlLy8gKHRoYXQuc2VhcmNoVmFsdWUgIT0gXCJcIiA/IHRoYXQuc2VhcmNoVmFsdWUgOiBudWxsKVxyXG5cdFx0XHR9KS5vbih7XHJcblx0XHRcdFx0XCJpbnB1dFwiOiAoZXYsIHRhcmdldCkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGF0LmZpbHRlckRhdGEoJChldi5jdXJyZW50VGFyZ2V0KS5nZmllbGQoXCJnZXRWYWx1ZVwiKSlcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0XHJcblx0XHRcdH0pLmNzcyh7IFwiYm9yZGVyLWxlZnRcIjogXCIxcHggc29saWQgJGJhc2UtY29sb3ItdG9vbFwiLCBcImJvcmRlci1yaWdodFwiOiBcIjFweCBzb2xpZCAkYmFzZS1jb2xvci10b29sXCIsIFwiaGVpZ2h0XCI6IFwiMXJlbVwiLCBcInBvc2l0aW9uXCI6IFwicmVsYXRpdmVcIiwgXCJmbG9hdFwiOiBcImlubGluZS1zdGFydFwiLCBcInZlcnRpY2FsLWFsaWduXCI6IFwibGVmdFwiLCAvKlwiaGVpZ2h0XCI6IFwiMjBweFwiLCovIC8qXCJtYXJnaW5cIjogXCI4cHhcIiwgKi8gXCJtYXJnaW4tdG9wXCI6IFwiNXB4XCIsIC8qXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIqLyB9KSlcclxuXHRcdFx0Ly9Ba2NlIHBybyBFeHBvcnRcclxuXHRcdFx0bWFpbldyYXBwZXJQYW5lbC5hcHBlbmQoJC5uZXdTcGFuKCkuY3NzKHsgXCJoZWlnaHRcIjogXCIxcmVtXCIsIFwibWFyZ2luLXJpZ2h0XCI6IFwiMXB4XCIgfSkuZ2J1dHRvbih7XHJcblx0XHRcdFx0cGFyYW1zOiB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEV4cG9ydCB9XHJcblx0XHRcdH0pLmNzcyh7IFwiYm9yZGVyLWxlZnRcIjogXCIxcHggc29saWQgJGJhc2UtY29sb3ItdG9vbFwiLCBcImJvcmRlci1yaWdodFwiOiBcIjFweCBzb2xpZCAkYmFzZS1jb2xvci10b29sXCIsIFwiaGVpZ2h0XCI6IFwiMXJlbVwiLCBcInBvc2l0aW9uXCI6IFwicmVsYXRpdmVcIiwgXCJmbG9hdFwiOiBcImlubGluZS1lbmRcIiwgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcInJpZ2h0XCIsIC8qXCJoZWlnaHRcIjogXCIyMHB4XCIsKi8gLypcIm1hcmdpblwiOiBcIjhweFwiLCAqLyBcIm1hcmdpbi10b3BcIjogXCIzcHhcIiwgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIgfSkucHJvcChcImFjdGlvbnNcIiwgcHJvZmlsZUFjdGlvbnMpKVxyXG5cclxuXHRcdFx0Ly9Ww71iZXIgcG9obGVkdVxyXG5cdFx0XHRtYWluV3JhcHBlclBhbmVsLmFwcGVuZCgkLm5ld1NwYW4oKS5jc3MoeyBcImhlaWdodFwiOiBcIjFyZW1cIiwgXCJtYXJnaW4tcmlnaHRcIjogXCIycHhcIiB9KS5nc2VsZWN0Ym94KHtcclxuXHRcdFx0XHRuYW1lOiBcInZpZXdabWVueVwiLFxyXG5cdFx0XHRcdGRyb3Bkb3duOiB0cnVlLFxyXG5cdFx0XHRcdGRhdGE6IFtcIlbDvWNob3rDrSBwb2hsZWRcIiwgXCJQcm9ncmFtb3bDqSBmw6F6ZVwiXSxcclxuXHRcdFx0XHRpbml0aWFsVmFsdWU6IFwiVsO9Y2hvesOtIHBvaGxlZFwiLFxyXG5cdFx0XHRcdGdyYXBoaWNJbnB1dDogXCJoaWRkZW5cIixcclxuXHRcdFx0XHRzbWFydE5hdmlnYXRpb246IGZhbHNlLFxyXG5cdFx0XHRcdGl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdFx0XHRcdHZhciB0ZXh0ID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmVuY29kZShkYXRhKTtcclxuXHRcdFx0XHRcdGlmIChkYXRhKSB0ZXh0ID0gXCI8aT5cIiArIHRleHQgKyBcIjwvaT5cIjtcclxuXHRcdFx0XHRcdGVsc2UgaWYgKGRhdGEpIHRleHQgPSBcIjxiPlwiICsgdGV4dCArIFwiPC9iPlwiO1xyXG5cdFx0XHRcdFx0cmV0dXJuIFwiPGk+XCIgKyB0ZXh0ICsgXCI8L2k+XCI7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjdXN0b21DbGFzczogXCJ3LTJcIixcclxuXHRcdFx0XHRjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcblx0XHRcdFx0XHRpZiAoY3R4LnZhbHVlID09IFwiVsO9Y2hvesOtIHBvaGxlZFwiKSB7XHJcblx0XHRcdFx0XHRcdHRoYXQudHlwVmlldyA9IDE7XHJcblx0XHRcdFx0XHRcdHRoYXQuX2NyZWF0ZUNoYW5nZUxvZygpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoY3R4LnZhbHVlID09IFwiUHJvZ3JhbW92w6kgZsOhemVcIikge1xyXG5cdFx0XHRcdFx0XHR0aGF0LnR5cFZpZXcgPSAyO1xyXG5cdFx0XHRcdFx0XHRpZiAodGhhdC52aWV3Wm1lbnkgIT0gdW5kZWZpbmVkICYmIHRoYXQudmlld1ptZW55LmdldERhdGFSb3dzKCkubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0XHRcdFx0XHR0aGF0Ll9jcmVhdGVDaGFuZ2VMb2coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0pLmNzcyh7IFwiYm9yZGVyLWxlZnRcIjogXCIxcHggc29saWQgJGJhc2UtY29sb3ItdG9vbFwiLCBcImJvcmRlci1yaWdodFwiOiBcIjFweCBzb2xpZCAkYmFzZS1jb2xvci10b29sXCIsIFwiaGVpZ2h0XCI6IFwiMXJlbVwiLCBcInBvc2l0aW9uXCI6IFwicmVsYXRpdmVcIiwgXCJmbG9hdFwiOiBcImlubGluZS1lbmRcIiwgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcInJpZ2h0XCIsIC8qXCJoZWlnaHRcIjogXCIyMHB4XCIsKi8gLypcIm1hcmdpblwiOiBcIjhweFwiLCAqLyBcIm1hcmdpbi10b3BcIjogXCI1cHhcIiwgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIgfSkucHJvcChcImFjdGlvbnNcIiwgcHJvZmlsZUFjdGlvbnMpKVxyXG5cdFx0XHR0aGF0LmNyZWF0ZU1haW5Mb2dzUGFuZWwoKVxyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgY29uZmlnUHJvZmlsZShwcm9maWxlKSB7XHJcblx0XHRcdHZhciBkbGcgPSB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiXCIsIHsgXHJcblx0XHRcdH0sIHsgd2lkdGg6IDk4MCwgaGVpZ2h0OiA2NTAsIC8qcmVsYXRlZDogdGhpcy5lbGVtZW50WzBdKi8gfSkgXHJcblx0XHRcdFx0Lm9uKFwiY2xvc2VkXCIsIGZ1bmN0aW9uIChldiwgcmV0VmFsKSB7fSk7XHJcblx0XHRcdHJldHVybiBkbGc7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQqIG5hc3Rhdml0IGRhdGFcclxuXHRcdCovXHJcblx0XHRwcml2YXRlIF9jcmVhdGVDaGFuZ2VMb2coKSB7XHJcblx0XHRcdGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cdFx0XHQvLy8vdGhhdC5iZWdpbk9wZXJhdGlvbihcIk5hxI3DrXTDoW7DrSBwb3Bpc8WvIHptxJtuXCIpO1xyXG5cdFx0XHR0aGF0Lm1haW5Mb2dzUGFuZWwuY2hpbGRyZW4oKS5yZW1vdmUoKTtcclxuXHRcdFx0Ly9WTEFTVE5JIEdUQUJMQVxyXG5cdFx0XHR0aGF0LnZpZXdabWVueVxyXG5cdFx0XHRpZiAodGhhdC5yZXNTZWFyY2ggPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHRoYXQuZ3JpZEZvcm1hdCA9IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpO1xyXG5cdFx0XHRcdHRoYXQuX2NyZWF0ZSgpXHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0dGhhdC5kYXRfb2QgPSB0aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcImRhdF96bWVuYVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKS5kYXRlLnN0YXJ0O1xyXG5cdFx0XHRcdHRoYXQuZGF0X2RvID0gdGhhdC5lbGVtZW50LmZpbmRGaWVsZHMoXCJkYXRfem1lbmFcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikuZGF0ZS5lbmQ7XHJcblx0XHRcdFx0XHJcbiAgICAgICAgICAgICAgICB0aGF0LkRhdGFGaWx0ZXIgPSB7fVxyXG5cdFx0XHRcdHRoYXQuRGF0YUZpbHRlci5ha3Rpdml0YSA9IDEwMFxyXG5cdFx0XHRcdHRoYXQuRGF0YUZpbHRlci5kYXRfb2QgPSB0aGF0LmRhdF9vZFxyXG5cdFx0XHRcdHRoYXQuRGF0YUZpbHRlci5kYXRfZG8gPSB0aGF0LmRhdF9kb1xyXG5cdFx0XHRcdHRoYXQuRGF0YUZpbHRlci5wb3BpcyA9IHRoYXQucHJpel9zZXNcclxuXHRcdFx0XHR0aGF0LkRhdGFGaWx0ZXIuZmF6ZUZpZWxkID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJmYXplXCIpLmdmaWVsZChcImdldFZhbHVlXCIpOyAvL3RoYXQuZmF6ZVNlYXJjaFxyXG5cdFx0XHRcdHRoYXQuRGF0YUZpbHRlci5kYXRfb2Quc2V0RGF0ZSh0aGF0LmRhdF9vZC5nZXREYXRlKCkgKyAxKVxyXG5cdFx0XHRcdHRoYXQuRGF0YUZpbHRlci5kYXRfZG8uc2V0RGF0ZSh0aGF0LmRhdF9kby5nZXREYXRlKCkgKyAxKVxyXG5cdFx0XHRcdC8vRG9wbG7Em24gZmlsdHIgbmEgdmVyemlcclxuXHRcdFx0XHR2YXIgdmVyemUgPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInZlcnplXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cdFx0XHRcdGlmICh2ZXJ6ZSAhPSBudWxsICYmIHZlcnplLnRvU3RyaW5nKCkubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0XHRcdHZlcnplID0gdmVyemUudG9TdHJpbmcoKVxyXG5cdFx0XHRcdFx0aWYgKCF0aGF0LkRhdGFGaWx0ZXIuZmF6ZUZpZWxkPy5pbmNsdWRlcyh2ZXJ6ZSkpIHtcclxuXHRcdFx0XHRcdFx0dGhhdC5EYXRhRmlsdGVyLmZhemVGaWVsZD8ucHVzaCh2ZXJ6ZSlcclxuXHRcdFx0XHRcdH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHQvL0tvbmVjIGZpbHRydSBuYSB2ZXJ6aVxyXG5cdFx0XHRcdHRoaXMuY2FsbDxHb3JkaWMuQWR0LkludGVyZmFjZS5HUG9waXNabWVueUR0b1tdPihcIk5hY3RpRGF0YVwiLCB7IFZzdHVwbmlEYXRhOiB0aGF0LkRhdGFGaWx0ZXIsIHRhZ3lEYXRhOiB0aGF0LnRhZ3lTZWFyY2ggfVxyXG5cclxuXHRcdFx0XHQpIC8vcHJvbWlzZSBzZXJ2ZXJ1IC8vdSBjYWxsIHYgVFMgc2UgemFkYXZhIHR5cCBuYXZyYXRvdmUgaG9kbm90eSA8R1BvcGlzeVptZW5EdG9bXT5cclxuXHRcdFx0XHRcdC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdFx0XHRcdC8vdGhhdC5pc2wuWm1lbmEubGlzdFBvcGlzeVptZW4oeyBmaWx0ZXJzOiB7IGRhdF9vZDogdGhhdC5kYXRfb2QsIGRhdF9kbzogdGhhdC5kYXRfZG8sIGZhemU6IHRoYXQuZmF6ZVNlYXJjaCwgdmVyemU6IHRoYXQudmVyemVTZWFyY2gsIHRhZzogdGhhdC50YWd5U2VhcmNoLCBsZWdabWVuYTogdGhhdC5sZWdabWVueVNlYXJjaCB9IH0pLmdldERhdGEoKS5kb25lKChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHRcdC8vR3JvdXBvdsOhbsOtXHJcblxyXG5cdFx0XHRcdFx0XHQvL09kZWJyYXQgxZnDoWRreSwga3RlcsOpIG5lbWFqw60gdiB0YWd1IHJldml6aSBwxZnDrXNsdcWhbsOpIGbDoXplIChqZS1saSB6YWTDoW4gZmlsdHIgbmEgZsOhemkvZsOhemUpXHJcblx0XHRcdFx0XHRcdC8vWm3Em25hIHTFmcOtZMSbbsOtIGRhdCAtIHNlc3RhdnkgYcW+IG5hIGtvbmVjIHNlem5hbXUgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChkYXRhW2ldICE9IG51bGwgJiYgZGF0YVtpXSAhPSB1bmRlZmluZWQgJiYgZGF0YVtpXS5rb3R2YSAhPSBudWxsICYmIGRhdGFbaV0ua290dmEgIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgdGVzdCA9IGRhdGFbaV0ua290dmE/LnRvU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldLmtvdHZhPy50b1N0cmluZygpLnN1YnN0cmluZygwLCAyKSA9PSBcIjIwXCIgLyomJiBkYXRhW2ldLnRhZ3k/LnRvU3RyaW5nKCkubGVuZ3RoID49IDEyKi8pIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGF0YVtpXS5rb3R2YSA9IFwiOTBcIiArIGRhdGFbaV0ua290dmE/LnRvU3RyaW5nKCkuc3Vic3RyaW5nKDIsIGRhdGFbaV0ua290dmE/LnRvU3RyaW5nKCkubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGRhdGFGaWx0ZXJlZDogYW55ID0gW107XHJcblx0XHRcdFx0XHRcdGlmICh0aGF0LkRhdGFGaWx0ZXI/LmZhemVGaWVsZCAhPSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCB0aGF0LkRhdGFGaWx0ZXI/LmZhemVGaWVsZC5sZW5ndGg7IGorKykge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHRhZ3lSYWRrdSA9IGRhdGFbaV0udGFneT8uc3BsaXQoXCI7XCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodGFneVJhZGt1KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIGNvdW50ZXIgPSAwO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBpeHNLbXA7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCB0YWd5UmFka3UubGVuZ3RoOyBrKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh0aGF0LkRhdGFGaWx0ZXI/LmZhemVGaWVsZFtqXT8ubGVuZ3RoID4gNCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgdGVzdDEgPSB0aGF0LkRhdGFGaWx0ZXI/LmZhemVGaWVsZFtqXT8udG9TdHJpbmcoKS5zdWJzdHJpbmcoMywgOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly92YXIgdGVzdDEgPSB0aGF0LkRhdGFGaWx0ZXI/LmZhemVGaWVsZFtqXT8uc3Vic3RyaW5nKDMsIDgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIHRlc3QyID0gdGFneVJhZGt1W2tdLnN1YnN0cmluZygyLCA3KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh0YWd5UmFka3Vba10ubGVuZ3RoID49IDEyICYmIHRoYXQuRGF0YUZpbHRlcj8uZmF6ZUZpZWxkW2pdPy5sZW5ndGggPiA0ICYmIHRoYXQuRGF0YUZpbHRlcj8uZmF6ZUZpZWxkW2pdLnN1YnN0cmluZygzLCA4KSA9PSB0YWd5UmFka3Vba10uc3Vic3RyaW5nKDIsIDcpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvdW50ZXIrK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpeHNLbXAgPSBkYXRhW2ldLml4c19rbXA7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vT2RlYnLDoW7DrSDFmcOhZGt1XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGNvdW50ZXIgIT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGF0YUZpbHRlcmVkLnB1c2goZGF0YVtpXSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0aWYgKGRhdGFGaWx0ZXJlZC5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdGRhdGEgPSBkYXRhRmlsdGVyZWQ7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdC8vS29uZWMgb2RlYnLDoW7DrSBuZWNodMSbbm7DvWNoIMWZw6Fka8WvXHJcblx0XHRcdFx0XHRcdHRoYXQudmlld1ptZW55ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhzX2ttcFwiIH0pO1xyXG5cdFx0XHRcdFx0XHR0aGF0LnZpZXdabWVueU9yaWcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLCB7IGtleTogXCJpeHNfa21wXCIgfSk7XHJcblx0XHRcdFx0XHRcdHRoYXQudmlld1NlYXJjaFptZW55ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhzX2ttcFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC50eXBWaWV3ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld1ptZW55ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhzX2ttcFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0XHRcdGVsc2UgaWYgKHRoYXQudHlwVmlldyA9PSAxKSB7ICBcclxuXHRcdFx0XHRcdFx0XHR2YXIgZ3JvdXBMaXN0OiBHb3JkaWMuRGF0YS5Hcm91cGluZ0RlZmluaXRpb248R29yZGljLkFkdC5JbnRlcmZhY2UuR1BvcGlzWm1lbnlEdG8+W10gPSBbXTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgZGxlVHlwdVptZW55OiBHb3JkaWMuRGF0YS5Hcm91cGluZ0RlZmluaXRpb248R29yZGljLkFkdC5JbnRlcmZhY2UuR1BvcGlzWm1lbnlEdG8+ID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdFN0YXRlOiBcIm9wZW5cIixcclxuXHRcdFx0XHRcdFx0XHRcdGhhc2g6IChtZXRhLCByb3dzKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBgJHttZXRhLmRhdGFbXCJ0eXBfem1lbnlfa21wX3R4dFwiXX1gXHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0YWdncmVnYXRlOiBEYXRhLkFnZ3JlZ2F0ZXMubWF4KFwia290dmFcIiksXHJcblx0XHRcdFx0XHRcdFx0XHRzb3J0OiBcImtvdHZhLCFwb3puYW1reVwiLFxyXG5cdFx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBkbGVUeXB1Wm1lbnlQbHVzUmV2aXplOiBHb3JkaWMuRGF0YS5Hcm91cGluZ0RlZmluaXRpb248R29yZGljLkFkdC5JbnRlcmZhY2UuR1BvcGlzWm1lbnlEdG8+ID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdFN0YXRlOiBcIm9wZW5cIixcclxuXHRcdFx0XHRcdFx0XHRcdGhhc2g6IChtZXRhLCByb3dzKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciByZXZpemUgPSBtZXRhLmRhdGEudGFneT8uc3BsaXQoJzsnKVswXTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHRhZ3lQb2xlID0gbWV0YS5kYXRhLnRhZ3k/LnNwbGl0KFwiO1wiKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHJldml6ZVNlYXJjaCA9IFwiXCI7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciByZXZpemVTZWFyY2hGaWVsZDogc3RyaW5nW10gPSBbXTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRhZ3lQb2xlICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBjb3VudGVyID0gMFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh0aGF0LkRhdGFGaWx0ZXI/LmZhemVGaWVsZCAhPSB1bmRlZmluZWQgJiYgdGhhdC5EYXRhRmlsdGVyPy5mYXplRmllbGQubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgdGhhdC5EYXRhRmlsdGVyPy5mYXplRmllbGQubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0YWd5UG9sZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdmFyIHRlc3QxID0gdGhhdC5EYXRhRmlsdGVyPy5mYXplRmllbGRbal0/LnN1YnN0cmluZygzLCA4KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgdGVzdDIgPSB0YWd5UG9sZVtpXS5zdWJzdHJpbmcoMiwgNyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRhZ3lQb2xlW2ldLmxlbmd0aCA+PSAxMiAmJiB0aGF0LkRhdGFGaWx0ZXI/LmZhemVGaWVsZFtqXT8udG9TdHJpbmcoKS5zdWJzdHJpbmcoMywgOCkgPT0gdGFneVBvbGVbaV0uc3Vic3RyaW5nKDIsIDcpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXZpemVTZWFyY2ggPSB0YWd5UG9sZVtpXTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldml6ZVNlYXJjaEZpZWxkLnB1c2godGFneVBvbGVbaV0pXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0YWd5UG9sZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodGFneVBvbGVbaV0ubGVuZ3RoID49IDEyKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV2aXplU2VhcmNoID0gdGFneVBvbGVbaV07XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV2aXplU2VhcmNoRmllbGQucHVzaCh0YWd5UG9sZVtpXSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICghKHJldml6ZVNlYXJjaC5sZW5ndGggPj0gMTIpICYmIHRhZ3lQb2xlICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldml6ZVNlYXJjaCA9IHRhZ3lQb2xlWzBdO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAocmV2aXplU2VhcmNoLnN1YnN0cmluZygwLCAyKSA9PSBcIjkwXCIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXZpemVTZWFyY2ggPSBcIjIwXCIgKyByZXZpemVTZWFyY2guc3Vic3RyaW5nKDIsIHJldml6ZVNlYXJjaC5sZW5ndGgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBgJHtyZXZpemVTZWFyY2h9YFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvL31cclxuXHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0YWdncmVnYXRlOiBEYXRhLkFnZ3JlZ2F0ZXMubWF4KFwia290dmFcIiksXHJcblx0XHRcdFx0XHRcdFx0XHRzb3J0OiBcImtvdHZhLCFwb3puYW1reVwiLFxyXG5cclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRncm91cExpc3QucHVzaChkbGVUeXB1Wm1lbnlQbHVzUmV2aXplKTtcclxuXHRcdFx0XHRcdFx0XHRncm91cExpc3QucHVzaChkbGVUeXB1Wm1lbnkpO1xyXG5cdFx0XHRcdFx0XHRcdHRoYXQudmlld1ptZW55LnByb2Nlc3Moe1xyXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDogbmV3IEdvcmRpYy5EYXRhLkdyb3VwaW5nKGdyb3VwTGlzdCksXHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHR0aGF0LnZpZXdabWVueU9yaWcucHJvY2Vzcyh7XHJcblx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OiBuZXcgR29yZGljLkRhdGEuR3JvdXBpbmcoZ3JvdXBMaXN0KSxcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGVsc2UgaWYgKHRoYXQudHlwVmlldyA9PSAyKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGdyb3VwTGlzdDogR29yZGljLkRhdGEuR3JvdXBpbmdEZWZpbml0aW9uPEdvcmRpYy5BZHQuSW50ZXJmYWNlLkdQb3Bpc1ptZW55RHRvPltdID0gW107XHJcblx0XHRcdFx0XHRcdFx0dmFyIGRsZUZhemU6IEdvcmRpYy5EYXRhLkdyb3VwaW5nRGVmaW5pdGlvbjxHb3JkaWMuQWR0LkludGVyZmFjZS5HUG9waXNabWVueUR0bz4gPSB7XHJcblx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0U3RhdGU6IFwib3BlblwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0aGFzaDogKG1ldGEsIHJvd3MpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHRhZ3lQb2xlID0gbWV0YS5kYXRhLnRhZ3k/LnNwbGl0KFwiO1wiKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGZhemVTZWFyY2ggPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQvL3ZhciByZXZpemVTZWFyY2ggPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgcmV2aXplU2VhcmNoRmllbGQ6IHN0cmluZ1tdID0gW107XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0YWd5UG9sZSAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodGhhdC5EYXRhRmlsdGVyPy5mYXplRmllbGQgIT0gdW5kZWZpbmVkICYmIHRoYXQuRGF0YUZpbHRlcj8uZmF6ZUZpZWxkLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHRoYXQuRGF0YUZpbHRlcj8uZmF6ZUZpZWxkLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGFneVBvbGUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodGFneVBvbGVbaV0ubGVuZ3RoID49IDEyICYmIHRoYXQuRGF0YUZpbHRlcj8uZmF6ZUZpZWxkW2pdPy50b1N0cmluZygpLnN1YnN0cmluZygzLCA4KSA9PSB0YWd5UG9sZVtpXS5zdWJzdHJpbmcoMiwgNykpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vLy9yZXZpemVTZWFyY2ggPSB0YWd5UG9sZVtpXTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZhemVTZWFyY2ggPSB0YWd5UG9sZVtpXS5zdWJzdHJpbmcoMCwgNylcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldml6ZVNlYXJjaEZpZWxkLnB1c2godGFneVBvbGVbaV0pXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGFneVBvbGUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRhZ3lQb2xlW2ldLmxlbmd0aCA+PSAxMikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vLy9yZXZpemVTZWFyY2ggPSB0YWd5UG9sZVtpXTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmYXplU2VhcmNoID0gdGFneVBvbGVbaV0uc3Vic3RyaW5nKDAsIDcpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV2aXplU2VhcmNoRmllbGQucHVzaCh0YWd5UG9sZVtpXSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEoZmF6ZVNlYXJjaC5sZW5ndGggPj0gMTIpICYmIHRhZ3lQb2xlICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vcmV2aXplU2VhcmNoID0gdGFneVBvbGVbMF07XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZmF6ZVNlYXJjaCA9IHRhZ3lQb2xlWzBdLnN1YnN0cmluZygwLCA3KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGZhemVTZWFyY2guc3Vic3RyaW5nKDAsIDIpID09IFwiNDFcIikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZhemVTZWFyY2ggPSBmYXplU2VhcmNoLnJlcGxhY2UoXCI0MVwiLCBcIkdXQVwiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgKGZhemVTZWFyY2guc3Vic3RyaW5nKDAsIDIpID09IFwiNDBcIikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZhemVTZWFyY2ggPSBmYXplU2VhcmNoLnJlcGxhY2UoXCI0MFwiLCBcIkdTQVwiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgKGZhemVTZWFyY2guc3Vic3RyaW5nKDAsIDIpID09IFwiNDJcIikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZhemVTZWFyY2ggPSBmYXplU2VhcmNoLnJlcGxhY2UoXCI0MlwiLCBcIkdXU1wiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgKGZhemVTZWFyY2guc3Vic3RyaW5nKDAsIDIpID09IFwiNDNcIikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZhemVTZWFyY2ggPSBmYXplU2VhcmNoLnJlcGxhY2UoXCI0M1wiLCBcIkdTU1wiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgKGZhemVTZWFyY2guc3Vic3RyaW5nKDAsIDIpID09IFwiMzJcIikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZhemVTZWFyY2ggPSBmYXplU2VhcmNoLnJlcGxhY2UoXCIzMlwiLCBcIkdJTlwiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgKGZhemVTZWFyY2guc3Vic3RyaW5nKDAsIDIpID09IFwiOTBcIikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZhemVTZWFyY2ggPSBmYXplU2VhcmNoLnJlcGxhY2UoXCI5MFwiLCBcIkdNU1wiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgKGZhemVTZWFyY2guc3Vic3RyaW5nKDAsIDIpID09IFwiMjBcIikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZhemVTZWFyY2ggPSBmYXplU2VhcmNoLnJlcGxhY2UoXCIyMFwiLCBcIkdNU1wiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvL1rDrXNrw6Fuw60gbsOhenZ1IHByb2dyYW1vdsOpIGbDoXplXHJcblx0XHRcdFx0XHRcdFx0XHRcdGxldCBvYmpGYXplID0gdGhhdC5mYXplRGF0YS5maW5kKG8gPT4gby5mYXplID09PSBmYXplU2VhcmNoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBgJHtmYXplU2VhcmNoICsgJyAtICcgKyBvYmpGYXplPy5mYXplX3R4dH1gXHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBQdXZvZG5pIGhhc2ggeHh4XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vdmFyIGZpcnN0VGFnID0gbWV0YS5kYXRhLnRhZ3k/LnN1YnN0cigwLCAxMilcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly92YXIgcmV2aXplID0gbWV0YS5kYXRhLnRhZ3k/LnNwbGl0KCc7JylbMF07XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vdmFyIHJldml6ZSA9IG1ldGEuZGF0YS50YWd5Py5zcGxpdCgnOycpWzBdO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQvL3ZhciBoYXNoVHlwWm1lbnkgPSBgJHttZXRhLmRhdGFbXCJ0eXBfem1lbnlfa21wX3R4dFwiXX1gXHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vLy9yZXR1cm4gYCR7aGFzaFR5cFptZW55W21ldGEuZGF0YVtcIlwiXV19YFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvL3JldHVybiBgJHttZXRhLmRhdGFbXCJ0eXBfem1lbnlfa21wX3R4dFwiXX1gXHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0YWdncmVnYXRlOiBEYXRhLkFnZ3JlZ2F0ZXMubWF4KFwia290dmFcIiksXHJcblx0XHRcdFx0XHRcdFx0XHRzb3J0OiBcImtvdHZhLCFwb3puYW1reVwiLFxyXG5cclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHRcdHZhciBkbGVUeXB1Wm1lbnk6IEdvcmRpYy5EYXRhLkdyb3VwaW5nRGVmaW5pdGlvbjxHb3JkaWMuQWR0LkludGVyZmFjZS5HUG9waXNabWVueUR0bz4gPSB7XHJcblx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0U3RhdGU6IFwib3BlblwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0aGFzaDogKG1ldGEsIHJvd3MpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGAke21ldGEuZGF0YVtcInR5cF96bWVueV9rbXBfdHh0XCJdfWBcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRhZ2dyZWdhdGU6IERhdGEuQWdncmVnYXRlcy5tYXgoXCJrb3R2YVwiKSxcclxuXHRcdFx0XHRcdFx0XHRcdHNvcnQ6IFwia290dmEsIXBvem5hbWt5XCIsXHJcblxyXG5cdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdFx0dmFyIGRsZVJldml6ZTogR29yZGljLkRhdGEuR3JvdXBpbmdEZWZpbml0aW9uPEdvcmRpYy5BZHQuSW50ZXJmYWNlLkdQb3Bpc1ptZW55RHRvPiA9IHtcclxuXHRcdFx0XHRcdFx0XHRcdGRlZmF1bHRTdGF0ZTogXCJvcGVuXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRoYXNoOiAobWV0YSwgcm93cykgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgdGFneVBvbGUgPSBtZXRhLmRhdGEudGFneT8uc3BsaXQoXCI7XCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgcmV2aXplU2VhcmNoID0gXCJcIjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHJldml6ZVNlYXJjaEZpZWxkOiBzdHJpbmdbXSA9IFtdO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodGFneVBvbGUgIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRoYXQuRGF0YUZpbHRlcj8uZmF6ZUZpZWxkICE9IHVuZGVmaW5lZCAmJiB0aGF0LkRhdGFGaWx0ZXI/LmZhemVGaWVsZC5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCB0aGF0LkRhdGFGaWx0ZXI/LmZhemVGaWVsZC5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRhZ3lQb2xlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRhZ3lQb2xlW2ldLmxlbmd0aCA+PSAxMiAmJiB0aGF0LkRhdGFGaWx0ZXI/LmZhemVGaWVsZFtqXT8udG9TdHJpbmcoKS5zdWJzdHJpbmcoMywgOCkgPT0gdGFneVBvbGVbaV0uc3Vic3RyaW5nKDIsIDcpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXZpemVTZWFyY2ggPSB0YWd5UG9sZVtpXTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldml6ZVNlYXJjaEZpZWxkLnB1c2godGFneVBvbGVbaV0pXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0YWd5UG9sZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodGFneVBvbGVbaV0ubGVuZ3RoID49IDEyKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV2aXplU2VhcmNoID0gdGFneVBvbGVbaV07XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV2aXplU2VhcmNoRmllbGQucHVzaCh0YWd5UG9sZVtpXSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIShyZXZpemVTZWFyY2gubGVuZ3RoID49IDEyKSAmJiB0YWd5UG9sZSAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXZpemVTZWFyY2ggPSB0YWd5UG9sZVswXTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAocmV2aXplU2VhcmNoLnN1YnN0cmluZygwLCAyKSA9PSBcIjkwXCIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXZpemVTZWFyY2ggPSBcIjIwXCIgKyByZXZpemVTZWFyY2guc3Vic3RyaW5nKDIsIHJldml6ZVNlYXJjaC5sZW5ndGgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGAke3Jldml6ZVNlYXJjaH1gXHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0YWdncmVnYXRlOiBEYXRhLkFnZ3JlZ2F0ZXMubWF4KFwia290dmFcIiksXHJcblx0XHRcdFx0XHRcdFx0XHRzb3J0OiBcImtvdHZhLCFwb3puYW1reVwiLFxyXG5cdFx0XHRcdFx0XHRcdH07XHJcblxyXG5cclxuXHRcdFx0XHRcdFx0XHRncm91cExpc3QucHVzaChkbGVGYXplKTtcclxuXHRcdFx0XHRcdFx0XHRncm91cExpc3QucHVzaChkbGVSZXZpemUpO1xyXG5cdFx0XHRcdFx0XHRcdGdyb3VwTGlzdC5wdXNoKGRsZVR5cHVabWVueSk7XHJcblx0XHRcdFx0XHRcdFx0Ly9ncm91cExpc3QucHVzaChkbGVUeXB1Wm1lbnlQbHVzUmV2aXplKTtcclxuXHRcdFx0XHRcdFx0XHR0aGF0LnZpZXdabWVueS5wcm9jZXNzKHtcclxuXHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6IG5ldyBHb3JkaWMuRGF0YS5Hcm91cGluZyhncm91cExpc3QpLFxyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0dGhhdC52aWV3Wm1lbnlPcmlnLnByb2Nlc3Moe1xyXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDogbmV3IEdvcmRpYy5EYXRhLkdyb3VwaW5nKGdyb3VwTGlzdCksXHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Lb25lYyBHcm91cG92w6F2w61cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkRm9ybWF0ID0gdGhhdC5jcmVhdGVHcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2NyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC50eXBWaWV3ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kKFwidGQuY2VsbC5jMFwiKS5jc3MoeyBcImJvcmRlci1ib3R0b21cIjogXCIwLjVweCBzb2xpZCAjQzZDREUwXCIgfSk7XHJcblx0XHRcdFx0XHRcdH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblx0XHRcdC8vS09ORUMgVkxBU1ROSSBHVEFCTFlcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIGNyZWF0ZU1haW5Mb2dzUGFuZWxcdC0gWm9icmF6ZW7DrSBwb3Bpc8WvIGRvIHBhbmVsdVxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIGNyZWF0ZU1haW5Mb2dzUGFuZWwoKSB7XHJcblx0XHRcdGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdFx0dGhhdC5tYWluTG9nc1BhbmVsID0gJC5uZXdEaXYoXCJtYWluLWxvZ3NcIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5jc3MoeyAvKlwiZGlzcGxheVwiOiBcImlubGluZS1ibG9ja1wiLCovXCJib3JkZXJcIjogXCI1cHggc29saWQgI2U1ZThmMFwiLCBcIm1hcmdpbi1sZWZ0XCI6IFwiN3B4XCIsIFwibWFyZ2luLXJpZ2h0XCI6IFwiNXB4XCIsIC8qXCJib3JkZXItcmlnaHRcIjogXCJzb2xpZCBncmF5IDFweFwiLCBcImJvcmRlci1sZWZ0XCI6IFwic29saWQgZ3JheSAxcHhcIiwgXCJib3JkZXItYm90dG9tXCI6IFwic29saWQgZ3JheSAxcHhcIiwqLyBcImNvbG9yXCI6IFwiYmxhY2tcIiwgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcIm1pZGRsZVwiIH0pIC8qLmFkZENsYXNzKFwiZy1zdGF0ZS1saWdodGJhY2tncm91bmQgZy1zdGF0ZS1pbmFjdGl2ZVwiKSovLy8gbm92eSBwYW5lbCwga2FtIHByZXN1bmVtZS92eXR2b3JpbWUgYWt0dWFsbmkgcXVldWVcclxuXHRcdFx0dmFyIG1haW5QYW5lbCA9ICQubmV3RGl2KFwibWFpbi1sb2dzLXBhbmVsXCIpO1xyXG5cdFx0XHR0aGF0Lm1haW5Mb2dzUGFuZWwuZ2F1dG9maXQoKS5hcHBlbmQobWFpblBhbmVsKTtcclxuXHJcblx0XHRcdHZhciBtYWluRGl2ID0gJC5uZXdEaXYoXCJtYWluRGl2XCIpLmFwcGVuZFRvKHRoYXQubWFpbkxvZ3NQYW5lbCkvLy5nYnV0dG9uKHsgcGFyYW1zOiB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEVkaXRIaXN0IH0gfSlcclxuXHJcblxyXG5cdFx0XHQvL1BvxI3DrXRhZGxvIHrDoXpuYW3Fr1xyXG5cdFx0XHR0aGF0LmVsZW1lbnQuYXBwZW5kKCQubmV3U3BhbihcImNvdW50ZXJcIikudGV4dChcIlBvxI1ldDogXCIgKyB0aGF0LnBvY2V0WmF6bmFtdS5wb2NldCkuY3NzKHtcclxuXHRcdFx0XHRcImNvbG9yXCI6IFwiZ3JheVwiLCBcImRpc3BsYXlcIjogXCJpbmxpbmUtYmxvY2tcIiwgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCIsIFwid2lkdGhcIjogXCIyMDBweFwiLCBcImxldHRlci1zcGFjaW5nXCI6IFwibm9ybWFsXCIsIFwibWFyZ2luLWxlZnRcIjogXCI0MHB4XCIsIFwibWFyZ2luLXJpZ2h0XCI6IFwiOHB4XCIsIFwidGV4dC1hbGlnblwiOiBcInJpZ2h0XCIsIFwidmVydGljYWwtYWxpZ25cIjogXCJyaWdodFwiLCBcImZsb2F0XCI6IFwiaW5saW5lLWVuZFwiXHJcblx0XHRcdH0pKVxyXG5cclxuXHRcdFx0Ly9UbyBkbyAtIHByb2tsaWsgZG8gQURUMDc/XHJcblx0XHRcdC8vdGhhdC5lbGVtZW50LmFwcGVuZCgkLm5ld1NwYW4oXCJsaW5rQURUMDdcIikuaHRtbChcIjxhIGhyZWY9J2h0dHBzOi8vcm9ib3QuZ29yZGljLmN6L2dvcmRpYy9naW5pcy9hcHAvYWR0MDcvIycgc3R5bGU9J2NvbG9yOiAjMUQzRThGOycgdGFyZ2V0PSdfYmxhbmsnIHJlbD0nbm9vcGVuZXIgbm9yZWZlcnJlcic+QURUMDc8L2E+XCIpLmNzcyh7XHJcblx0XHRcdC8vXHRcInRleHQtYWxpZ25cIjogXCJsZWZ0XCIsIFwibWFyZ2luLWxlZnRcIjogXCIxMHB4XCIsIFwid2lkdGhcIjogXCI1MHB4XCJcclxuXHRcdFx0Ly99KSlcclxuXHRcdFx0XHRcclxuXHRcdFx0dGhhdC5jcmVhdGVFbXB0eUNvbnRlbnQoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKiogc2V0bm91dCBkYXRhICovXHJcblx0XHRwcml2YXRlIGNyZWF0ZUVtcHR5Q29udGVudCgpIHtcclxuXHRcdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblx0XHRcdHZhciBlbXB0eUZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG5cdFx0XHRcdGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTMtNy0yLCBNLTMtNy0yLCBTLTEyLTEyLTBcIixcclxuXHRcdFx0XHRuYW1lOiBcInByYXpkbnlGb3JtdWxhclwiLFxyXG5cdFx0XHR9KVxyXG5cdFx0XHRlbXB0eUZvcm0vKi5hZGRTZWN0aW9uKHtjdXN0b21DbGFzczpcImctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm9cIiwgbGFiZWw6IFwiIFwifSkqLy5hZGRSb3coKVxyXG5cdFx0XHRcdC5hZGRSb3coKVxyXG5cdFx0XHRcdC5hZGRGaWVsZChcImdzdGF0aWNcIiwge1xyXG5cdFx0XHRcdFx0bmFtZTogXCJzdGF0aWNGaWVsZFwiLFxyXG5cdFx0XHRcdFx0Y3VzdG9tQ2xhc3M6IFwidy0yXCIsXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuYWRkRmllbGQoXCJnc3RhdGljXCIsIHtcclxuXHRcdFx0XHRcdG5hbWU6IFwic3RhdGljRmllbGRcIixcclxuXHRcdFx0XHRcdGN1c3RvbUNsYXNzOiBcInctMlwiLFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmFkZEZpZWxkKFwiZ3N0YXRpY1wiLCB7XHJcblx0XHRcdFx0XHRuYW1lOiBcInN0YXRpY1wiLFxyXG5cdFx0XHRcdFx0aWNvbjogXCJmYS10aC1saXN0IGctc3RhdGUtdGV4dCBtaW5pZm90b1wiLFx0ICAvL2ZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXdhcm5pbmcgbWluaWZvdG9cclxuXHRcdFx0XHRcdGN1c3RvbUNsYXNzOiBcInctMyBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmFjdGl2ZVwiLFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmFkZFJvdygpXHJcblx0XHRcdFx0LmFkZEZpZWxkKFwiZ3N0YXRpY1wiLCB7XHJcblx0XHRcdFx0XHRuYW1lOiBcImdzdGF0aWNFbXB0eUZpZWxkXCIsXHJcblx0XHRcdFx0XHRjdXN0b21DbGFzczogXCJ3LTNcIixcclxuXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuYWRkRmllbGQoXCJnc3RhdGljZmllbGRcIiwge1xyXG5cdFx0XHRcdFx0bmFtZTogXCJzdGF0aWNTdHJpbmdGaWVsZFwiLFxyXG5cdFx0XHRcdFx0aW5pdGlhbFZhbHVlOiBcIjxpPiDFvcOhZG7DqSBwb3Bpc3kgayB6b2JyYXplbsOtIFwiLFxyXG5cdFx0XHRcdFx0Ly9jdXN0b21DbGFzczogXCJnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmFjdGl2ZVwiXHJcblx0XHRcdFx0XHRjdXN0b21DbGFzczogXCJ3LTMgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5hY3RpdmVcIlxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmFkZFJvdygpXHJcblx0XHRcdFx0LmFkZEZpZWxkKFwiZ3N0YXRpY1wiLCB7XHJcblx0XHRcdFx0XHRuYW1lOiBcImdzdGF0aWNFbXB0eVJvd0ZpZWxkXCIsXHJcblx0XHRcdFx0XHRjdXN0b21DbGFzczogXCJ3LTNcIixcclxuXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuYWRkRmllbGQoXCJnc3RhdGljZmllbGRcIiwge1xyXG5cdFx0XHRcdFx0bmFtZTogXCJzdGF0aWNTdHJpbmdGaWVsZFwiLFxyXG5cdFx0XHRcdFx0aW5pdGlhbFZhbHVlOiBcIjxpPi4uLnByb3PDrW0gbmHEjXTEm3RlIGRhdGEhXCIsXHJcblx0XHRcdFx0XHQvL2N1c3RvbUNsYXNzOiBcImctc3RhdGUtdGV4dCBnLXN0YXRlLWluYWN0aXZlXCJcclxuXHRcdFx0XHRcdGN1c3RvbUNsYXNzOiBcInctMyBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmFjdGl2ZVwiXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuYWRkUm93KClcclxuXHRcdFx0dGhhdC5lbXB0eUZvcm0gPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoYXQubWFpbkxvZ3NQYW5lbCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGVtcHR5Rm9ybSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCkge1xyXG5cdFx0XHRjb25zdCB0aGF0ID0gdGhpcztcclxuXHRcdFx0dmFyIGNvbHVtbnNEZWZpbml0aW9uID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKTtcclxuXHJcblx0XHRcdGNvbHVtbnNEZWZpbml0aW9uXHJcblx0XHRcdFx0LmFkZEh0bWxDb2x1bW4oe1xyXG5cdFx0XHRcdFx0bmFtZTogXCJwb3Bpc1wiLFxyXG5cdFx0XHRcdFx0Y2FwdGlvbjogXCJQb3BpcyB6bcSbbnlcIiwgIC8vUkMgMzMxMTEzMzAgOiBMaWNlbmNlIGRhdGFiw6F6ZVxyXG5cdFx0XHRcdFx0Y2VsbFRlbXBsYXRlOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0XHQvL1RPRE86IC0gUMWZZWTEm2xhdCBkZWZhdWx0bsOtIHpvYnJhemVuw60gcG9waXPFryBwcm8gdHlwVmlldyA9IDFcclxuXHRcdFx0XHRcdFx0dmFyIG5ld0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1lbnVSb3dXcmFwcGVyXCIpXHJcblx0XHRcdFx0XHRcdG5ld0VsLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiXHJcblx0XHRcdFx0XHRcdG5ld0VsLnN0eWxlLmRpc3BsYXkgPSBcImxpc3QtaXRlbVwiXHJcblx0XHRcdFx0XHRcdG5ld0VsLnN0eWxlLm1hcmdpbkxlZnQgPSBcIjMwcHhcIlxyXG5cdFx0XHRcdFx0XHQvL25ld0VsLmJlZm9yZSgpXHJcblx0XHRcdFx0XHRcdGlmIChkYXRhLnByaXpfdmVyZWpueSA9PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0bmV3RWwuY2xhc3NMaXN0LmFkZChcImNoYW5nZWxvZy1pdGVtLXN0eWxlXCIpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0bmV3RWwuY2xhc3NMaXN0LmFkZChcImNoYW5nZWxvZy1pdGVtLXN0eWxlLXB1YmxpY1wiKVxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHQvL0tvbmVjIGFrY8OtXHJcblx0XHRcdFx0XHRcdHZhciB0b0FkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ3cmFwcGVyXCIpO1xyXG5cdFx0XHRcdFx0XHR2YXIgbW9udGggPSBkYXRhLmRhdF96bWVuYS5zdWJzdHJpbmcoNSwgNylcclxuXHRcdFx0XHRcdFx0dmFyIGRheSA9IGRhdGEuZGF0X3ptZW5hLnN1YnN0cmluZyg4LCAxMClcclxuXHRcdFx0XHRcdFx0dmFyIHllYXIgPSBkYXRhLmRhdF96bWVuYS5zdWJzdHJpbmcoMCwgNClcclxuXHRcdFx0XHRcdFx0dG9BZGQudGl0bGUgPSBcIlp2ZcWZZWpuxJtubzogXCIgKyBkYXkgKyBcIi5cIiArIG1vbnRoICsgXCIuXCIgKyB5ZWFyOyAvLyArIFwiXFxuXCIgKyBcIkF1dG9yIHBvcGlzdTogXCIgKyBkYXRhLnptZW5pbDtcclxuXHJcblx0XHRcdFx0XHRcdC8vVXLEjWVuw60gcmV2aXplXHJcblx0XHRcdFx0XHRcdHZhciB0YWd5UG9sZSA9IGRhdGEudGFneT8uc3BsaXQoXCI7XCIpO1xyXG5cdFx0XHRcdFx0XHR2YXIgcmV2aXplU2VhcmNoID0gXCJcIjtcclxuXHRcdFx0XHRcdFx0dmFyIHJldml6ZVNlYXJjaEZpZWxkOiBzdHJpbmdbXSA9IFtdO1xyXG5cdFx0XHRcdFx0XHRpZiAodGFneVBvbGUgIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0YWd5UG9sZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHRhZ3lQb2xlW2ldLmxlbmd0aCA+PSAxMikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXZpemVTZWFyY2ggPSB0YWd5UG9sZVtpXTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV2aXplU2VhcmNoRmllbGQucHVzaCh0YWd5UG9sZVtpXSlcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGlmICghKHJldml6ZVNlYXJjaC5sZW5ndGggPj0gMTIpICYmIHRhZ3lQb2xlICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdHJldml6ZVNlYXJjaCA9IHRhZ3lQb2xlWzBdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdC8vS29uZWMgdXLEjWVuw60gcmV2aXplXHJcblxyXG5cdFx0XHRcdFx0XHQvLy8vdG9BZGQuaWQgPSByZXZpemVTZWFyY2g7XHQgXHJcblx0XHRcdFx0XHRcdHZhciB0eXBQb3BEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHlwLXBvcGlzXCIpO1xyXG5cdFx0XHRcdFx0XHR2YXIgaW50UG96RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImludGVybmktcG96bmFta2FcIik7XHJcblx0XHRcdFx0XHRcdHZhciBpeHNLbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaXhzS21wXCIpO1xyXG5cdFx0XHRcdFx0XHQvL1RhZ3kgLSB1bG/FvmVuw60gZG8gcG9sZSB0YWfFr1xyXG5cdFx0XHRcdFx0XHR2YXIgcG9sZVRhZ3lQb3Bpczogc3RyaW5nW10gPSBbXTtcclxuXHRcdFx0XHRcdFx0aWYgKGRhdGEudGFneSAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0cG9sZVRhZ3lQb3BpcyA9IGRhdGEudGFneS5zcGxpdChcIjtcIilcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHJcblxyXG5cdFx0XHRcdFx0XHQvL0tvbmVjIHVsb8W+ZW7DrSBkbyBwb2xlXHJcblx0XHRcdFx0XHRcdHZhciBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicGFuZWwtcG9waXNcIik7XHQvLy5jcmVhdGVFbGVtZW50KFwicGFuZWwtcG9waXMtXCIgKyBEdG9baV0uaXhzX2ttcCArIFwiXCIpXHJcblx0XHRcdFx0XHRcdHR5cFBvcERpdi5pbm5lckhUTUwgPSBkYXRhLnR5cF96bWVueV9rbXBfdHh0ICsgXCIgXCI7XHJcblx0XHRcdFx0XHRcdGludFBvekRpdi5pbm5lckhUTUwgPSAoZGF0YS5wb3puYW1reSAhPSB1bmRlZmluZWQgPyB0aGF0Lk1EUHJvY2Vzc29yLnJlbmRlcihkYXRhLnBvem5hbWt5KSA6IGRhdGEucG96bmFta3kpO1xyXG5cdFx0XHRcdFx0XHQvL2l4c0ttcERpdi5pbm5lckhUTUwgPSAoZGF0YS5peHNfa21wICE9IHVuZGVmaW5lZCA/IGRhdGEuaXhzX2ttcCA6IFwiXCIpO1xyXG5cdFx0XHRcdFx0XHQvL3R5cFBvcERpdi5jbGFzc05hbWUgPSAoZGF0YS50eXBfem1lbnlfa21wX3R4dCA9PSBcIk9wcmF2YVwiID8gXCJnLXN0YXRlLWJhY2tncm91bmQgZy1zdGF0ZS1pbmZvIGctYmFkZ2VcIiA6IGRhdGEudHlwX3ptZW55X2ttcF90eHQgPT0gXCJOb3ZpbmthXCIgPyBcImctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLXN1Y2Nlc3MgZy1iYWRnZVwiIDogZGF0YS50eXBfem1lbnlfa21wX3R4dCA9PSBcIlpuw6Ftw6EgY2h5YmFcIiA/IFwiZy1zdGF0ZS1iYWNrZ3JvdW5kIGctc3RhdGUtd2FybmluZyBnLWJhZGdlXCIgOiBkYXRhLnR5cF96bWVueV9rbXBfdHh0ID09IFwiUG96bsOhbWthXCIgPyBcImctYmFkZ2VcIiA6IGRhdGEudHlwX3ptZW55X2ttcF90eHQgPT0gXCJMZWdpc2xhdGl2bsOtIHptxJtuYVwiID8gXCJnLXN0YXRlLWJhY2tncm91bmQgZy1zdGF0ZS1pbXBvcnRhbnQgZy1iYWRnZVwiIDogXCJnLXN0YXRlLWJhY2tncm91bmQgZy1zdGF0ZS1pbmFjdGl2ZSBnLWJhZGdlXCIpXHJcblx0XHRcdFx0XHRcdC8vaWYgKGRhdGEudHlwX3ptZW55X2ttcF90eHQgPT0gXCJQb3puw6Fta2FcIikge1xyXG5cdFx0XHRcdFx0XHQvL1x0dHlwUG9wRGl2LmNsYXNzTGlzdC5hZGQoXCJjaGFuZ2Vsb2ctdHlwUG96bmFta2FcIik7XHJcblx0XHRcdFx0XHRcdC8vfVxyXG5cdFx0XHRcdFx0XHR0eXBQb3BEaXYuY2xhc3NMaXN0LmFkZChcImNoYW5nZWxvZy10eXBcIik7XHJcblx0XHRcdFx0XHRcdGludFBvekRpdi5jbGFzc0xpc3QuYWRkKFwiY2hhbmdlbG9nLWludFBvelwiKTtcclxuXHRcdFx0XHRcdFx0aXhzS21wRGl2LmNsYXNzTGlzdC5hZGQoXCJjaGFuZ2Vsb2ctaWRcIik7XHJcblxyXG5cdFx0XHRcdFx0XHRuZXdEaXYuY2xhc3NMaXN0LmFkZChcImNoYW5nZWxvZy1ib2R5XCIpOyAvLzE1LjQuMjAyNFxyXG5cdFx0XHRcdFx0XHQvL25ld0Rpdi5pbm5lckhUTUwgPSB0aGF0Lk1EUHJvY2Vzc29yLnJlbmRlcihEdG9baV0ucG9waXMpO1xyXG5cdFx0XHRcdFx0XHRuZXdEaXYuaW5uZXJIVE1MID0gKGRhdGEucG9waXMgIT0gdW5kZWZpbmVkID8gdGhhdC5NRFByb2Nlc3Nvci5yZW5kZXIoZGF0YT8ucG9waXM/LnJlcGxhY2UoLzxcXC8/W14+XSsoPnwkKS9nLCBcIlwiKSkgOiBkYXRhPy5wb3Bpcz8ucmVwbGFjZSgvPFxcLz9bXj5dKyg+fCQpL2csIFwiXCIpKTtcclxuXHRcdFx0XHRcdFx0aWYgKHRoYXQudHlwVmlldyA9PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0dG9BZGQuYXBwZW5kQ2hpbGQodHlwUG9wRGl2KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR2YXIgdGFneURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWd5XCIpO1xyXG5cclxuXHJcblx0XHRcdFx0XHRcdHZhciBwb3Bpc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwb3Bpc1wiKTtcclxuXHRcdFx0XHRcdFx0cG9waXNEaXYuaW5uZXJIVE1MID0gKGRhdGEucG9waXMgIT0gdW5kZWZpbmVkID8gdGhhdC5NRFByb2Nlc3Nvci5yZW5kZXIodGhhdC5fdW5Fc2NhcGUoZGF0YS5wb3BpcykpIDogdGhhdC5fdW5Fc2NhcGUoZGF0YS5wb3BpcykpXHJcblx0XHRcdFx0XHRcdHBvcGlzRGl2LmNsYXNzTGlzdC5hZGQoXCJjaGFuZ2Vsb2ctdGV4dFwiKTtcclxuXHRcdFx0XHRcdFx0dmFyIHBsYWluVGV4dCA9IChkYXRhLnBvcGlzICE9IHVuZGVmaW5lZCA/IHRoYXQuTURQcm9jZXNzb3IucmVuZGVyKGRhdGEucG9waXMpIDogXCJcIilcclxuXHRcdFx0XHRcdFx0cGxhaW5UZXh0ID0gcGxhaW5UZXh0LnJlcGxhY2UoXCI8cD5cIiwgXCJcIilcclxuXHRcdFx0XHRcdFx0cGxhaW5UZXh0ID0gcGxhaW5UZXh0LnJlcGxhY2UoXCI8L3A+XCIsIFwiXCIpXHJcblx0XHRcdFx0XHRcdHBsYWluVGV4dCA9IHBsYWluVGV4dC5yZXBsYWNlKFwiL25cIiwgXCJcIilcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0Ly9wbGFpblRleHQgPSB1bmVzY2FwZShwbGFpblRleHQpIC8vcGxhaW5UZXh0LnJlcGxhY2UoLyZsdDsuKiZndDsvZywgXCJcIik7XHJcblx0XHRcdFx0XHRcdHBvcGlzRGl2LmlubmVySFRNTCA9IHBsYWluVGV4dFxyXG5cclxuXHRcdFx0XHRcdFx0Ly9Lb25lYyAxNy40LjIwMjRcclxuXHJcblx0XHRcdFx0XHRcdC8vUHJpdmF0ZSAvIFB1YmxpYyBpY29uYVxyXG5cdFx0XHRcdFx0XHQvL3ZhciB2aXNpYmxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpc2libGVcIik7XHJcblx0XHRcdFx0XHRcdC8vdmFyIHZpc2libGVJY29uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpc2libGVJY29uXCIpO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly92YXIgdmVyZWpueVBvcGlzID0gZGF0YS5wcml6X3ZlcmVqbnk7XHJcblx0XHRcdFx0XHRcdC8vdmFyIGljb24gPSAkLm5ld0RpdihcInZpc2libGUtaWNvblwiKS5hcHBlbmRUbyh2aXNpYmxlSWNvbkRpdilcclxuXHRcdFx0XHRcdFx0Ly9pZiAodmVyZWpueVBvcGlzID09IDApIHtcclxuXHRcdFx0XHRcdFx0Ly9cdGljb24uYXBwZW5kKCQoXCI8aWNvbj5cIikuZ3N0YXRpYyh7IGljb246IFwiZ2ktY2lyY2xlIHxnaS1sb2NrIGdpLXN0YWNrLXBvcy0tcmIgZ2ktYmd3XCIsIHRvb2x0aXA6IFwiSmVkbsOhIHNlIG8gbmV2xZllam7DvSBwb3BpcyB6bcSbblwiLCAvKmNhcHRpb246IFwiVGFneTogXCIqLyB9KSkuY3NzKHsgXCJjb2xvclwiOiBcImJsYWNrXCIsIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwiLCBcImZsb2F0XCI6IFwiY2VudGVyXCIsIFwidmVydGljYWwtYWxpZ25cIjogXCItd2Via2l0LWJhc2VsaW5lLW1pZGRsZVwiLCBcImhlaWdodFwiOiBcIjIwcHhcIiwgXCJtYXJnaW4tbGVmdFwiOiBcIjdweFwiLCBcImRpc3BsYXlcIjogXCJpbmxpbmVcIiB9KTtcclxuXHRcdFx0XHRcdFx0Ly9cdC8vdGFneURpdi5hcHBlbmRDaGlsZCh2aXNpYmxlSWNvbkRpdik7XHJcblx0XHRcdFx0XHRcdC8vXHQvL25ld1BhbmVsT3ByYXZ5LmFwcGVuZCgkLm5ld1NwYW4oKS5jc3MoeyBcIm1hcmdpbi10b3BcIjogXCI4cHhcIiwgXCJtYXJnaW4tbGVmdFwiOiBcIjVweFwiIH0pLmdzdGF0aWMoeyBpY29uOiBcImZhLWxvY2tcIiwgdG9vbHRpcDogXCJKZWRuw6Egc2UgbyBuZXbFmWVqbsO9IHBvcGlzIHptxJtuXCIsIC8qY2FwdGlvbjogXCJUYWd5OiBcIiovIH0pLmNzcyh7IFwiY29sb3JcIjogXCJibGFja1wiLCBcInBvc2l0aW9uXCI6IFwicmVsYXRpdmVcIiwgXCJmbG9hdFwiOiBcImNlbnRlclwiLCBcInZlcnRpY2FsLWFsaWduXCI6IFwiYm90dG9tXCIsIFwiaGVpZ2h0XCI6IFwiMjBweFwiLCBcIm1hcmdpbi1sZWZ0XCI6IFwiN3B4XCIgfSkpXHJcblx0XHRcdFx0XHRcdC8vfVxyXG5cdFx0XHRcdFx0XHQvL2Vsc2Uge1xyXG5cdFx0XHRcdFx0XHQvL1x0aWNvbi5hcHBlbmQoJChcIjxpY29uPlwiKS5nc3RhdGljKHsgaWNvbjogXCJnaS1jaXJjbGUgfGdpLXVzZXJzIGdpLXN0YWNrLXBvcy0tcmIgZ2ktYmd3XCIsIHRvb2x0aXA6IFwiSmVkbsOhIHNlIG8gdmXFmWVqbsO9IHBvcGlzIHptxJtuXCIsIC8qY2FwdGlvbjogXCJUYWd5OiBcIiovIH0pKS5jc3MoeyBcImNvbG9yXCI6IFwiYmxhY2tcIiwgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCIsIFwiZmxvYXRcIjogXCJjZW50ZXJcIiwgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcIi13ZWJraXQtYmFzZWxpbmUtbWlkZGxlXCIsIFwiaGVpZ2h0XCI6IFwiMjBweFwiLCBcIm1hcmdpbi1sZWZ0XCI6IFwiN3B4XCIsIFwiZGlzcGxheVwiOiBcImlubGluZVwiIH0pO1xyXG5cdFx0XHRcdFx0XHQvL1x0Ly90YWd5RGl2LmFwcGVuZENoaWxkKHZpc2libGVJY29uRGl2KTtcclxuXHRcdFx0XHRcdFx0Ly99XHJcblx0XHRcdFx0XHRcdC8vdmlzaWJsZURpdi5hcHBlbmRDaGlsZCh2aXNpYmxlSWNvbkRpdik7XHJcblx0XHRcdFx0XHRcdC8vdGFneURpdi5hcHBlbmRDaGlsZCh2aXNpYmxlSWNvbkRpdik7XHJcblxyXG5cdFx0XHRcdFx0XHQvLy8vL3RhZ3lEaXYuaW5uZXJIVE1MID0gKGRhdGEucG9waXMgIT0gdW5kZWZpbmVkID8gdGhhdC5NRFByb2Nlc3Nvci5yZW5kZXIoZGF0YS5wb3BpcykgOiBkYXRhLnBvcGlzKSAgLy8xNy40LjIwMjRcclxuXHRcdFx0XHRcdFx0dGFneURpdi5hcHBlbmRDaGlsZChwb3Bpc0Rpdik7XHJcblxyXG5cclxuXHRcdFx0XHRcdFx0dG9BZGQuYXBwZW5kQ2hpbGQodGFneURpdik7XHJcblxyXG5cdFx0XHRcdFx0XHQvL3RvQWRkLmFwcGVuZENoaWxkKGludFBvekRpdik7XHJcblx0XHRcdFx0XHRcdHRvQWRkLmFwcGVuZENoaWxkKGl4c0ttcERpdik7XHQgIFxyXG5cdFx0XHRcdFx0XHQvL3ZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpXHJcblx0XHRcdFx0XHRcdC8vc2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0Ly9cdHZhciBmYXplID0gXCJHV0FIU1QwNVwiXHJcblx0XHRcdFx0XHRcdC8vfTtcclxuXHRcdFx0XHRcdFx0Ly8vL3NjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9qYXZhc2NyaXB0Jyk7XHJcblx0XHRcdFx0XHRcdC8vLy9zY3JpcHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ2NvbnN0IHJldmlzaW9uID0gMScpKTtcclxuXHRcdFx0XHRcdFx0Ly8vL3NjcmlwdC50ZXh0ID0gXCJQb2t1c1wiXHJcblx0XHRcdFx0XHRcdC8vdG9BZGQuYXBwZW5kQ2hpbGQoc2NyaXB0KVxyXG5cdFx0XHRcdFx0XHRuZXdFbC5hcHBlbmRDaGlsZCh0b0FkZClcclxuXHJcblxyXG5cdFx0XHRcdFx0XHQkKG5ld0VsKS5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZXYpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgc3RyaW5nVG9vbHRpcCA9IFwiPGI+U291dmlzZWpjw60gdGFneTogPC9iPlwiXHJcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwb2xlVGFneVBvcGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzdHJpbmdUb29sdGlwID0gc3RyaW5nVG9vbHRpcCArIFwiL25cIiArIHBvbGVUYWd5UG9waXNbaV1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0dGhhdC50b29sdGlwVGFneSA9IHN0cmluZ1Rvb2x0aXA7XHJcblx0XHRcdFx0XHRcdFx0Ly90aGF0LmFjdGlvbnMuZ2V0QWN0aW9ucygpLmZpbHRlcihvYmogPT4ge1xyXG5cdFx0XHRcdFx0XHRcdC8vXHRyZXR1cm4gb2JqLm5hbWUgPT09IFwiYWN0VGFneVwiXHJcblx0XHRcdFx0XHRcdFx0Ly99KVswXS50b29sdGlwID0gXCJcIjtcclxuXHRcdFx0XHRcdFx0XHQvLyQoZXYudGFyZ2V0KS5jbG9zZXN0KCdkaXYnKS5jc3MoeyBcImJhY2tncm91bmQtY29sb3JcIjogXCIjRjhGOEY4XCIsIFwiYm9yZGVyLWxlZnRcIjogXCI1cHggc29saWRcIiwgXCJib3JkZXItcmlnaHRcIjogXCIxcHggc29saWRcIiwgXCJib3JkZXItdG9wXCI6IFwiMXB4IHNvbGlkXCIsIFwiYm9yZGVyLWJvdHRvbVwiOiBcIjFweCBzb2xpZFwiLCBcImJvcmRlci1jb2xvclwiOiBcIiNGRkZGRkZcIiB9KSAgIC8vI0ZDRERCRiAtIGxpZ2h0IHdhcm5pbmdcclxuXHRcdFx0XHRcdFx0XHRpZiAoJChldi50YXJnZXQpLmZpbmQoXCJpLmdpLmdpLWxhYmVsXCIpWzBdICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8kKGV2LnRhcmdldCkuZmluZChcImkuZ2kuZ2ktbGFiZWxcIikub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGV2KSB7ICQoZXYudGFyZ2V0KS5maW5kKFwiaS5naS5naS1sYWJlbFwiKVswXS5jbGFzc05hbWUgPSAnZ2kgZ2ktbGFiZWwgYm9sZCBnaS1yb3QxODAgZmEtMnggZy1zdGF0ZS10ZXh0IGctc3RhdGUtYWN0aXZlIGpzLWdidXR0b24tcHJpbWFyeS1pY29uIGctYnV0dG9uX19pY29uJyB9KVxyXG5cdFx0XHRcdFx0XHRcdFx0JChldi50YXJnZXQpLmZpbmQoXCJpLmdpLmdpLWxhYmVsXCIpWzBdLmNsYXNzTmFtZSA9ICdnaSBnaS1sYWJlbCBib2xkIGdpLXJvdDE4MCBmYS0yeCBnLXN0YXRlLXRleHQgZy1zdGF0ZS1hY3RpdmUganMtZ2J1dHRvbi1wcmltYXJ5LWljb24gZy1idXR0b25fX2ljb24nXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQkKG5ld0VsKS5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChldikge1xyXG5cdFx0XHRcdFx0XHRcdC8vJChldi50YXJnZXQpLmNsb3Nlc3QoJ2RpdicpLmNzcyh7IFwiYmFja2dyb3VuZC1jb2xvclwiOiBcIiNGOEY4RjhcIiwgXCJib3JkZXItbGVmdFwiOiBcIjVweCBzb2xpZFwiLCBcImJvcmRlci1yaWdodFwiOiBcIjFweCBzb2xpZFwiLCBcImJvcmRlci10b3BcIjogXCIxcHggc29saWRcIiwgXCJib3JkZXItYm90dG9tXCI6IFwiMXB4IHNvbGlkXCIsIFwiYm9yZGVyLWNvbG9yXCI6IFwiI0ZGRkZGRlwiIH0pICAgLy8jRkNEREJGIC0gbGlnaHQgd2FybmluZ1xyXG5cdFx0XHRcdFx0XHRcdGlmICgkKGV2LnRhcmdldCkuZmluZChcImkuZ2kuZ2ktbGFiZWxcIilbMF0gIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQkKGV2LnRhcmdldCkuZmluZChcImkuZ2kuZ2ktbGFiZWxcIilbMF0uY2xhc3NOYW1lID0gJ2dpIGdpLWxhYmVsIGdpLXJvdDE4MCBmYS0yeCBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmFjdGl2ZSBqcy1nYnV0dG9uLXByaW1hcnktaWNvbiBnLWJ1dHRvbl9faWNvbidcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbmV3RWw7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHJcblx0XHRcdHJldHVybiBjb2x1bW5zRGVmaW5pdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyNyZWdpb24gQ3JlYXRlIC0gQ2hhbmdlbG9nc1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogX2NyZWF0ZVxyXG5cdFx0ICogdGhpcy5vcHRpb25zLmRhdGEgamUgbmFocmF6ZW5vIHphIHRoaXMudmlld1ptZW55XHJcblx0XHQgKi9cclxuXHRcdF9jcmVhdGUoKTogdm9pZCB7XHJcblx0XHRcdHRoaXMuZW1wdHlGb3JtLnJlbW92ZSgpXHJcblx0XHRcdHRoaXMuX2NvdW50SXRlbSA9IDA7XHJcblx0XHRcdHRoaXMuX3Jlc2l6ZVdpZHRoRWxlbWVudCA9IHt9O1xyXG5cdFx0XHR0aGlzLl9yZXNpemVXaWR0aEVsZW1lbnQuY2xhc3MgPSBcIlwiO1xyXG5cdFx0XHR0aGlzLl9yZXNpemVXaWR0aEVsZW1lbnQud2lkdGggPSAwO1xyXG5cdFx0XHR0aGlzLmdyb3VwaW5nSGVhZGVyQ29sdW1ucyA9IHtcclxuXHRcdFx0XHRfZGVmYXVsdDoge1xyXG5cdFx0XHRcdFx0c3RydWN0dXJlTGVhZDogdHJ1ZSxcclxuXHRcdFx0XHRcdG5hbWU6IFwiX2RlZmF1bHRHcm91cEhlYWRlclwiLFxyXG5cdFx0XHRcdFx0Y2VsbFRlbXBsYXRlOiBHb3JkaWMuVGVtcGxhdGVzLmVuc3VyZVRlbXBsYXRlKFwiPGI+e0BzdHJ1Y3R1cmUuaGFzaH08L2I+IDxzcGFuIGNsYXNzPSdncm91cC1oZWFkZXItY291bnQnPih7QHN0cnVjdHVyZS5yb3dzLmxlbmd0aH0pPC9zcGFuPlwiKSxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuX3N0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRcdFx0dGhpcy5fc3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0XHRcdHRoaXMuX3N0eWxlRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cdFx0XHR0aGlzLmNzc1VpZCA9IFwiZ3RhYmxlX1wiICsgKHRoaXMudXVpZCsrKTtcclxuXHRcdFx0dGhpcy5fY29sdW1uc1NldHRpbmcoKTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKFwiZ3RhYmxlXCIpLmFkZENsYXNzKHRoaXMuY3NzVWlkKTtcclxuXHRcdFx0dGhpcy5fY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuXHRcdFx0dGhpcy5fY29udGVudC5jbGFzc05hbWUgPSBcImctdGFibGUtbWFpblwiO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kKHRoaXMuX2NvbnRlbnQpO1xyXG5cdFx0XHR0aGlzLm1haW5Mb2dzUGFuZWwuYXBwZW5kKHRoaXMuX2NvbnRlbnQpXHJcblx0XHRcdGlmICh0aGlzLnZpZXdabWVueSAhPSB1bmRlZmluZWQpXHJcblx0XHRcdFx0dGhpcy5zZXREYXRhKHRoaXMudmlld1ptZW55KTtcclxuXHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQodGhpcy5fc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0Ly90aGlzLl9pbml0UmVzaXplTWFuYWdlcigpO1xyXG5cdFx0fVxyXG5cclxuXHJcbiAgICAgICAgX3VuRXNjYXBlKGh0bWxTdHI6IHN0cmluZykge1xyXG4gICAgICAgICAgICBodG1sU3RyID0gaHRtbFN0cj8ucmVwbGFjZSgvJmx0Oy9nLCBcIjxcIik7XHJcbiAgICAgICAgICAgIGh0bWxTdHIgPSBodG1sU3RyPy5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKTtcclxuICAgICAgICAgICAgaHRtbFN0ciA9IGh0bWxTdHI/LnJlcGxhY2UoLyZxdW90Oy9nLCBcIlxcXCJcIik7XHJcbiAgICAgICAgICAgIGh0bWxTdHIgPSBodG1sU3RyPy5yZXBsYWNlKC8mIzM5Oy9nLCBcIlxcJ1wiKTtcclxuXHRcdFx0aHRtbFN0ciA9IGh0bWxTdHI/LnJlcGxhY2UoLyZhbXA7L2csIFwiJlwiKTtcclxuXHRcdFx0aHRtbFN0ciA9IGh0bWxTdHI/LnJlcGxhY2UoLyg8KFtePl0rKT4pL2lnLCAnJyk7XHJcblx0XHRcdGh0bWxTdHIgPSBodG1sU3RyPy5yZXBsYWNlKC88XFwvW14+XSsoPnwkKS9nLCBcIlwiKVxyXG5cdFx0XHRodG1sU3RyID0gaHRtbFN0cj8ucmVwbGFjZSgvZW5kXFxiZW5kL2csIFwiXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBodG1sU3RyO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBfY29sdW1uc1NldHRpbmdcclxuXHRcdCAqIHRoaXMub3B0aW9ucy5jb2x1bW5zIGplIG5haHJhemVubyB6YSB0aGlzLmdyaWRGb3JtYXRcclxuXHRcdCAqL1xyXG5cdFx0X2NvbHVtbnNTZXR0aW5nKCk6IHZvaWQge1xyXG5cdFx0XHRjb25zdCB0aGF0ID0gdGhpcztcclxuXHRcdFx0dmFyIGNvbHMgPSAodGhpcy5ncmlkRm9ybWF0IGluc3RhbmNlb2YgR29yZGljLkRhdGEuR3JpZEZvcm1hdCkgPyB0aGlzLmdyaWRGb3JtYXQuY29sdW1ucy5zbGljZSgpIDogKHRoaXMuZ3JpZEZvcm1hdCAhPSB1bmRlZmluZWQpID8gdGhpcy5ncmlkRm9ybWF0IDogW107XHJcblx0XHRcdHRoaXMuX2NvbHVtbnMgPSBbXTtcclxuXHRcdFx0dGhpcy5faGVhZGVycyA9IFtdO1xyXG5cdFx0XHR2YXIgaiA9IDBcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb2xzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKGNvbHNbaV0uaGlkZGVuICYmIGNvbHNbaV0uaGlkZGVuID09IHRydWUpXHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR2YXIgY29sdW1uID0gY29sc1tpXSBhcyBhbnk7XHJcblx0XHRcdFx0aWYgKGNvbHVtbi5taW5XaWR0aCAmJiAodGhpcy5fcmVzaXplV2lkdGhFbGVtZW50LndpZHRoIDwgY29sdW1uLm1pbldpZHRoKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5fcmVzaXplV2lkdGhFbGVtZW50LndpZHRoID0gY29sdW1uLm1pbldpZHRoO1xyXG5cdFx0XHRcdFx0dGhpcy5fcmVzaXplV2lkdGhFbGVtZW50LmNsYXNzID0gXCIuY1wiICsgajtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGNvbHVtbi53aWR0aClcclxuXHRcdFx0XHRcdHRoaXMuX3N0eWxlRWxlbWVudC5pbm5lckhUTUwgKz0gXCIuezB9IC5jezF9IHt7d2lkdGg6IHsyfSByZW1cXG59fVwiLmZvcm1hdCh0aGlzLmNzc1VpZCwgaiwgY29sdW1uLndpZHRoIC8gMTYpXHJcblx0XHRcdFx0Y29sdW1uLmhpZGRlbiA9IChjb2xzW2ldLmhpZGRlbikgPyBjb2xzW2ldLmhpZGRlbiA6IGZhbHNlO1xyXG5cdFx0XHRcdGNvbHVtbi5hbGlnbiA9IChjb2xzW2ldLmFsaWduKSA/IGNvbHNbaV0uYWxpZ24gOiBcImxlZnRcIjtcclxuXHRcdFx0XHR2YXIgZm9ybWF0ID0gY29sdW1uLmZvcm1hdFByZXNldCAmJiBjb2x1bW4uZm9ybWF0cyAmJiBjb2x1bW4uZm9ybWF0c1tjb2x1bW4uZm9ybWF0UHJlc2V0XSA/IGNvbHVtbi5mb3JtYXRzW2NvbHVtbi5mb3JtYXRQcmVzZXRdLmZvcm1hdCA6IGNvbHVtbi5mb3JtYXQ7XHJcblx0XHRcdFx0Y29sdW1uLmNlbGxUZW1wbGF0ZSA9IEdvcmRpYy5UZW1wbGF0ZXMuZW5zdXJlVGVtcGxhdGUoY29sdW1uLmNlbGxUZW1wbGF0ZSAhPSBudWxsID8gY29sdW1uLmNlbGxUZW1wbGF0ZSA6IFwie1wiICsgKGNvbHVtbi5maWVsZCAhPSB1bmRlZmluZWQgPyBjb2x1bW4uZmllbGQgOiBjb2x1bW4ubmFtZSkgKyAoZm9ybWF0ID8gXCI6XCIgKyBmb3JtYXQgOiBcIlwiKSArIFwifVwiKTtcclxuXHRcdFx0XHRjb2x1bW4uaGVhZGVyVGVtcGxhdGUgPSAoY29sc1tpXS5oZWFkZXJUZW1wbGF0ZSkgPyBHb3JkaWMuVGVtcGxhdGVzLmVuc3VyZVRlbXBsYXRlKGNvbHVtbi5oZWFkZXJUZW1wbGF0ZSkgOiBudWxsO1xyXG5cdFx0XHRcdHZhciBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcblx0XHRcdFx0bmFtZS5jbGFzc0xpc3QuYWRkKFwiZy10YWJsZS1yZXNwb25zaXZlLWhlYWRlclwiKTtcclxuXHRcdFx0XHR2YXIgY2FwdGlvbiA9IGNvbHVtbi5jYXB0aW9uICE9IG51bGwgPyBjb2x1bW4uY2FwdGlvbiA6IGNvbHNbaV0ubmFtZSAhPSBudWxsID8gXCI8aT57MH08L2k+XCIuZm9ybWF0KGNvbHVtbi5uYW1lKSA6IFwiXCI7XHJcblx0XHRcdFx0aWYgKGNvbHVtbi5oZWFkZXJUZW1wbGF0ZSAhPSB1bmRlZmluZWQgJiYgY29sdW1uLmhlYWRlclRlbXBsYXRlICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdHZhciBjZWxsQ29udGVudCA9IGNvbHVtbi5oZWFkZXJUZW1wbGF0ZS5yZW5kZXIoY29sdW1uLCB7IGNlbGw6IG5hbWUsIGNvbHVtbjogY29sdW1uLCBjb2x1bW5JbmRleDogaSB9KTtcclxuXHRcdFx0XHRcdGlmIChjZWxsQ29udGVudCA9PSBudWxsKSBjYXB0aW9uID0gXCJcIjtcclxuXHRcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBjZWxsQ29udGVudCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgY2VsbENvbnRlbnQgPT09IFwibnVtYmVyXCIpIGNhcHRpb24gPSBjZWxsQ29udGVudC50b1N0cmluZygpO1xyXG5cdFx0XHRcdFx0ZWxzZSB7IGNhcHRpb24gPSBcIlwiOyAkKG5hbWUpLmFwcGVuZChjZWxsQ29udGVudCk7IH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bmFtZS5pbm5lckhUTUwgPSAvKlwiPGI+XCIgKyAqL2NhcHRpb24vKiArIFwiPC9iPlwiKi87XHJcblx0XHRcdFx0dGhpcy5faGVhZGVycy5wdXNoKG5hbWUpO1xyXG5cdFx0XHRcdHRoaXMuX2NvbHVtbnMucHVzaChjb2x1bW4pO1xyXG5cdFx0XHRcdGorKztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogc2V0RGF0YVxyXG5cdFx0ICogXHJcblx0XHQgKiBAcGFyYW0ge2FueX0gZGF0YVxyXG5cdFx0ICovXHJcblx0XHRzZXREYXRhKGRhdGEpOiB2b2lkIHtcclxuXHJcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHRcdHZhciBkYXRhVmlldzogR29yZGljLkRhdGEuVmlldztcclxuXHRcdFx0aWYgKCFkYXRhKSBkYXRhVmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KCk7XHJcblx0XHRcdGVsc2UgaWYgKGRhdGEgaW5zdGFuY2VvZiBHb3JkaWMuRGF0YS5WaWV3KSBkYXRhVmlldyA9IGRhdGE7XHJcblx0XHRcdGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIGRhdGFWaWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSk7XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiZ3RhYmxlLnNldERhdGEgLSBuZXpuYW15IHR5cCB2c3R1cG5pY2ggZGF0XCIpO1xyXG5cdFx0XHRcdGRhdGFWaWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5fZGF0YSkge1xyXG5cdFx0XHRcdHRoaXMuX2RhdGEub2ZmKHRoaXMuZWxlbWVudFswXS5jbGFzc05hbWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9kYXRhID0gZGF0YVZpZXc7XHJcblx0XHRcdHRoaXMuX2RhdGEub24oXCJjaGFuZ2UuezB9XCIuZm9ybWF0KHRoaXMuY3NzVWlkKSwgKG9wdHMpID0+IHtcclxuXHRcdFx0XHR0aGlzLl9yZWxvYWREYXRhKClcclxuXHRcdFx0fSlcclxuXHRcdFx0dGhpcy5fZGF0YS5yZWZyZXNoKCk7XHJcblx0XHRcdHRoaXMuX3JlbG9hZERhdGEoKTtcclxuXHRcdFx0dGhpcy5lbmRPcGVyYXRpb24oKTtcclxuXHRcdH1cclxuXHJcblx0XHRfcmVsb2FkRGF0YSgpIHtcclxuXHRcdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG5cdFx0XHR0aGlzLl9jb250ZW50LmlubmVySFRNTCA9IFwiXCI7IC8veHh4XHJcblx0XHRcdHZhciByb3dzID0gdGhpcy5fY3JlYXRlUm93cyh0aGlzLl9kYXRhKTtcclxuXHRcdFx0dmFyIHRoZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoZWFkXCIpO1xyXG5cdFx0XHR0aGVhZC5hcHBlbmRDaGlsZChyb3dzWzBdKTtcclxuXHRcdFx0dGhpcy5fY29udGVudC5hcHBlbmRDaGlsZCh0aGVhZCk7XHJcblx0XHRcdHZhciB0Ym9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiKTtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDE7IGkgPCByb3dzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRcdHRib2R5LmFwcGVuZENoaWxkKHJvd3NbaV0pO1xyXG5cdFx0XHR0aGlzLl9jb250ZW50LmFwcGVuZENoaWxkKHRib2R5KTtcclxuXHRcdFx0Ly90aGlzLl9hZGRNb2JpbGVIZWFkZXJzKClcclxuXHRcdFx0dmFyIGVsID0gdGhpcy5lbGVtZW50LmZpbmQoXCJbZGF0YS1yb3ctaW5kZXg9J3swfSddXCIuZm9ybWF0KHRoaXMubnVtYmVyUm93KSlbMF07XHJcblx0XHRcdGlmIChlbCAhPSB1bmRlZmluZWQgJiYgZWwgIT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5hbmltYXRlKHsgc2Nyb2xsVG9wOiB0aGlzLmVsZW1lbnQuZmluZChcIltkYXRhLXJvdy1pbmRleD0nezB9J11cIi5mb3JtYXQodGhpcy5udW1iZXJSb3cpKS5vZmZzZXQoKT8udG9wIH0sIDEwMDApXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKEdvcmRpYy5VdGlscy5XaWRnZXRFeGlzdHMoXCJnZm9ybVwiLCB0aGF0LmVtcHR5Rm9ybSkpIHtcclxuXHRcdFx0XHR0aGF0LmVtcHR5Rm9ybS5yZW1vdmUoKVxyXG5cdFx0XHR9XHJcblx0XHRcdC8vUG/EjWV0IHrDoXpuYW3Fr1xyXG5cclxuXHRcdFx0JCh0aGF0LmVsZW1lbnQuZmluZChcInNwYW4uY291bnRlclwiKSlbMF0uaW5uZXJUZXh0ID0gXCJQb8SNZXQ6IFwiICsgdGhhdC52aWV3Wm1lbnkuZ2V0Q291bnQoKVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogX2NyZWF0ZVJvd3NcclxuXHRcdCAqIFxyXG5cdFx0ICogQHBhcmFtIHtHb3JkaWMuRGF0YS5WaWV3fSBkYXRhXHJcblx0XHQgKiBAcmV0dXJucyB7SFRNTFRhYmxlUm93RWxlbWVudFtdfVxyXG5cdFx0ICovXHJcblx0XHRfY3JlYXRlUm93cyhkYXRhOiBHb3JkaWMuRGF0YS5WaWV3KTogSFRNTFRhYmxlUm93RWxlbWVudFtdIHsgICAgICAgICAvLyB4eHhcclxuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdFx0dmFyIHJlbmRlclJvd3MgPSBuZXcgQXJyYXkoKTtcclxuXHRcdFx0dmFyIGl0ZW1Db3VudCA9IGRhdGEuZ2V0Q291bnQoXCJ2aWV3XCIpO1xyXG5cdFx0XHR2YXIgcm93cyA9IHRoaXMuX2FuYWx5emVEYXRhKGRhdGEuZ2V0Um93cyh0cnVlKSk7XHJcblx0XHRcdHZhciBpc0xhc3RJc1ZpcnR1YWwgPSBmYWxzZTtcclxuXHRcdFx0dmFyIHJvd0NvdW50ID0gMDtcclxuXHRcdFx0dmFyIGxldmVsID0gMDtcclxuXHRcdFx0dmFyIGhlYWRlclJvd0lkID0gMDtcclxuXHRcdFx0aWYgKGl0ZW1Db3VudCA9PSAwKSB7XHJcblx0XHRcdFx0Ly8vL3ZhciB0ckhlYWRlciA9IHRoaXMuX3JlbmRlckhlYWRlclJvdyhsZXZlbCwgaGVhZGVyUm93SWQsIFwiXCIpO1xyXG5cdFx0XHRcdGhlYWRlclJvd0lkKys7XHJcblx0XHRcdFx0Ly8vL3JlbmRlclJvd3MucHVzaCh0ckhlYWRlcik7XHJcblx0XHRcdFx0dmFyIGVtcHR5Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cdFx0XHRcdHZhciBlbXB0eVZhbHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG5cdFx0XHRcdGVtcHR5VmFsdWUuY2xhc3NOYW1lID0gXCJndGFibGUtZW1wdHlcIjtcclxuXHRcdFx0XHQvLy8vZW1wdHlWYWx1ZS5jb2xTcGFuID0gdHJIZWFkZXIuY2hpbGRyZW4ubGVuZ3RoO1xyXG5cdFx0XHRcdGVtcHR5VmFsdWUuaW5uZXJIVE1MID0gXCI8aT48Yj7FvcOhZG7DqSBwb3Bpc3kgem3Em24gayB6b2JyYXplbsOtITwvYj48L2k+XCI7IC8vUkMgMzMwMDAwMDUgOiDFvcOhZG7DoSBkYXRhIGsgem9icmF6ZW7DrS5cclxuXHRcdFx0XHRlbXB0eVJvdy5hcHBlbmRDaGlsZChlbXB0eVZhbHVlKTtcclxuXHRcdFx0XHRyZW5kZXJSb3dzLnB1c2goZW1wdHlSb3cpO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vdmFyIHRySGVhZGVyID0gdGhpcy5fcmVuZGVySGVhZGVyUm93KGxldmVsKTtcclxuXHRcdFx0Ly9yZW5kZXJSb3dzLnB1c2godHJIZWFkZXIpO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1Db3VudDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIGNlbGxzID0gbmV3IEFycmF5KCk7XHJcblx0XHRcdFx0dmFyIHRydWVDb2x1bW5zID0gbmV3IEFycmF5KCk7XHJcblx0XHRcdFx0dmFyIGlzR3JvdXBSb3cgPSByb3dzW2ldLl9pc1ZpcnR1YWwgPT09IHRydWUgJiYgISFyb3dzW2ldLnN0cnVjdHVyZTtcclxuXHRcdFx0XHRpZiAoaXNHcm91cFJvdyA9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHRsZXZlbCA9IHJvd3NbaV0uc3RydWN0dXJlLmxldmVsO1xyXG5cdFx0XHRcdFx0aWYgKGkgPT0gMCkge1xyXG5cdFx0XHRcdFx0XHQvLy8vdmFyIHRySGVhZGVyID0gdGhpcy5fcmVuZGVySGVhZGVyUm93KGxldmVsLCBoZWFkZXJSb3dJZCwgXCJcIik7XHJcblx0XHRcdFx0XHRcdGhlYWRlclJvd0lkKys7XHJcblx0XHRcdFx0XHRcdC8vLy90ckhlYWRlci5jbGFzc0xpc3QuYWRkKFwidmlydHVhbC1oZWFkZXJcIik7XHJcblx0XHRcdFx0XHRcdC8vLy9yZW5kZXJSb3dzLnB1c2godHJIZWFkZXIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAoaXNMYXN0SXNWaXJ0dWFsID09IHRydWUgfHwgaSA9PSAwKSB7XHJcblx0XHRcdFx0XHRcdHZhciBwb21WaXJ0dWFsID0gaSAtIDE7XHJcblx0XHRcdFx0XHRcdHZhciBoZWFkZXJzID0gXCJcIjtcclxuXHRcdFx0XHRcdFx0aWYgKHBvbVZpcnR1YWwgIT0gLTEpIHtcclxuXHRcdFx0XHRcdFx0XHR3aGlsZSAocm93c1twb21WaXJ0dWFsXS5faXNWaXJ0dWFsKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRoZWFkZXJzICs9IHJvd3NbcG9tVmlydHVhbF0uZ3JvdXBJZCArIFwiIFwiO1xyXG5cdFx0XHRcdFx0XHRcdFx0cG9tVmlydHVhbC0tXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAocG9tVmlydHVhbCA8IDApXHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQvLy8vdmFyIHRySGVhZGVyID0gdGhpcy5fcmVuZGVySGVhZGVyUm93KGxldmVsLCBoZWFkZXJSb3dJZCwgaGVhZGVycyk7XHJcblx0XHRcdFx0XHRcdC8vLy9yZW5kZXJSb3dzLnB1c2godHJIZWFkZXIpO1xyXG5cdFx0XHRcdFx0XHRoZWFkZXJSb3dJZCsrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX2NvbHVtbnMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdGlmIChpc0dyb3VwUm93ID09IHRydWUpIHtcclxuXHRcdFx0XHRcdFx0dmFyIGdpZCA9IHJvd3NbaV0uc3RydWN0dXJlLmdyb3VwaW5nUHJvYyArIFwiI1wiICsgcm93c1tpXS5zdHJ1Y3R1cmUuZ3JvdXBpbmdUaWVyO1xyXG5cdFx0XHRcdFx0XHR2YXIgZ2QgPSB0aGlzLmdyb3VwaW5nSGVhZGVyQ29sdW1uc1tnaWRdIHx8IHRoaXMuZ3JvdXBpbmdIZWFkZXJDb2x1bW5zW3Jvd3NbaV0uc3RydWN0dXJlLmdyb3VwaW5nUHJvY10gfHwgdGhpcy5ncm91cGluZ0hlYWRlckNvbHVtbnMuX2RlZmF1bHQ7XHJcblx0XHRcdFx0XHRcdHRydWVDb2x1bW5zLnB1c2goZ2QpO1xyXG5cdFx0XHRcdFx0XHRpc0xhc3RJc1ZpcnR1YWwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHR2YXIgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuXHRcdFx0XHRcdFx0Y2VsbHMucHVzaChjZWxsKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9IGVsc2VcclxuXHRcdFx0XHRcdFx0aXNMYXN0SXNWaXJ0dWFsID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciByb3cgPSB0aGlzLl9yZW5kZXJEYXRhUm93VmFsdWVzKChpc0dyb3VwUm93ID09IHRydWUpID8gdHJ1ZUNvbHVtbnMgOiB0aGlzLl9jb2x1bW5zLCByb3dzW2ldLCBpLCBsZXZlbCwgaGVhZGVyUm93SWQgLSAxKTsgLy8gaGVhZGVyIHJvdyAtMSwga3bFr2xlIHDFmWVkY2hvesOtIGlua3JlbWVudGFjaVxyXG5cdFx0XHRcdHJvdy5zZXRBdHRyaWJ1dGUoXCJkYXRhLXJvdy1pbmRleFwiLCByb3dDb3VudC50b1N0cmluZygpKTtcclxuXHRcdFx0XHRpZiAoaXNHcm91cFJvdyA9PSB0cnVlKSB7XHJcblxyXG5cdFx0XHRcdFx0cm93LmNsYXNzTGlzdC5hZGQoXCJndGFibGUtaGVhZGVyXCIpOyAvL3h4eFxyXG5cdFx0XHRcdFx0aWYgKHJvdy5pbm5lclRleHQuc3Vic3RyKDAsIDMpID09IFwiTm92XCIpIHtcclxuXHRcdFx0XHRcdFx0Ly9yb3cuY2xhc3NMaXN0LmFkZChcImd0YWJsZS1oZWFkZXJOZXdGZWF0dXJlXCIpO1xyXG5cdFx0XHRcdFx0XHRyb3cuY2xhc3NMaXN0LmFkZChcImd0YWJsZS1oZWFkZXJSZXZpc2lvblwiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKHJvdy5pbm5lclRleHQuc3Vic3RyKDAsIDMpID09IFwiTGVnXCIpIHtcclxuXHRcdFx0XHRcdFx0Ly9yb3cuY2xhc3NMaXN0LmFkZChcImd0YWJsZS1oZWFkZXJJbXBvcnRhbnRcIik7XHJcblx0XHRcdFx0XHRcdHJvdy5jbGFzc0xpc3QuYWRkKFwiZ3RhYmxlLWhlYWRlclJldmlzaW9uXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAocm93LmlubmVyVGV4dC5zdWJzdHIoMCwgMykgPT0gXCJPcHJcIikge1xyXG5cdFx0XHRcdFx0XHQvL3Jvdy5jbGFzc0xpc3QuYWRkKFwiZ3RhYmxlLWhlYWRlclBhdGNoXCIpO1xyXG5cdFx0XHRcdFx0XHRyb3cuY2xhc3NMaXN0LmFkZChcImd0YWJsZS1oZWFkZXJSZXZpc2lvblwiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKHJvdy5pbm5lclRleHQuc3Vic3RyKDAsIDMpID09IFwiWm7DoVwiKSB7XHJcblx0XHRcdFx0XHRcdC8vcm93LmNsYXNzTGlzdC5hZGQoXCJndGFibGUtaGVhZGVyV2FybmluZ1wiKTtcclxuXHRcdFx0XHRcdFx0cm93LmNsYXNzTGlzdC5hZGQoXCJndGFibGUtaGVhZGVyUmV2aXNpb25cIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChyb3cuaW5uZXJUZXh0LnN1YnN0cigwLCAzKSA9PSBcIlBvelwiKSB7XHJcblx0XHRcdFx0XHRcdC8vcm93LmNsYXNzTGlzdC5hZGQoXCJndGFibGUtaGVhZGVyR3JheVwiKTtcclxuXHRcdFx0XHRcdFx0cm93LmNsYXNzTGlzdC5hZGQoXCJndGFibGUtaGVhZGVyUmV2aXNpb25cIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmICgocm93LmlubmVyVGV4dC5zdWJzdHIoMCwgMykgPT0gXCJHV0FcIikgfHwgKHJvdy5pbm5lclRleHQuc3Vic3RyKDAsIDMpID09IFwiR1NBXCIpIHx8IChyb3cuaW5uZXJUZXh0LnN1YnN0cigwLCAzKSA9PSBcIkdXU1wiKSB8fCAocm93LmlubmVyVGV4dC5zdWJzdHIoMCwgMykgPT0gXCJHU1NcIikgfHwgKHJvdy5pbm5lclRleHQuc3Vic3RyKDAsIDMpID09IFwiR0lOXCIpIHx8IChyb3cuaW5uZXJUZXh0LnN1YnN0cigwLCAzKSA9PSBcIkdNU1wiKSkge1xyXG5cdFx0XHRcdFx0XHRyb3cuY2xhc3NMaXN0LmFkZChcImd0YWJsZS1oZWFkZXJGYXplXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJvdy5jbGFzc0xpc3QuYWRkKFwiZ3RhYmxlLWhlYWRlclJldmlzaW9uXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cm93LmNsYXNzTGlzdC5hZGQoXCJndGFibGUtaGVhZGVyQ29sb3JcIik7XHJcblx0XHRcdFx0XHQvL3ZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpXHJcblx0XHRcdFx0XHQvL3NjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9qYXZhc2NyaXB0Jyk7XHJcblx0XHRcdFx0XHQvL3NjcmlwdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnYWxlcnQoMSknKSk7XHJcblx0XHRcdFx0XHQvL3Jvdy5hcHBlbmRDaGlsZChzY3JpcHQpXHJcblx0XHRcdFx0XHRpZiAocm93c1tpXS5zdHJ1Y3R1cmUubGV2ZWwgPT0gMClcclxuXHRcdFx0XHRcdFx0Ly94eHhcclxuXHRcdFx0XHRcdFx0cm93LmNsYXNzTGlzdC5hZGQoXCJndGFibGUtaGVhZGVyLVwiICsgcm93c1tpXS5zdHJ1Y3R1cmUubGV2ZWwpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvL3Jvdy5jbGFzc0xpc3QuYWRkKFwiZ3RhYmxlLXJvd1wiKTtcclxuXHRcdFx0XHRcdC8vcm93LmlkID0gdGhpcy5jc3NVaWQgKyBcIl9cIiArIGk7XHJcblx0XHRcdFx0XHQvL3ZhciByb3dDbGFzcyA9IHR5cGVvZiB0aGlzLm9wdGlvbnMucm93c0NsYXNzID09IFwic3RyaW5nXCIgPyBcIiBcIiArIHRoaXMub3B0aW9ucy5yb3dzQ2xhc3MgOiAkLmlzRnVuY3Rpb24odGhpcy5vcHRpb25zLnJvd3NDbGFzcykgPyBcIiBcIiArIHRoaXMub3B0aW9ucy5yb3dzQ2xhc3MuY2FsbCh0aGlzLmVsZW1lbnRbMF0sIHJvd3NbaV0sIHRydWVDb2x1bW5zLCBpKSA6IFwiXCI7XHJcblx0XHRcdFx0XHQvL3Jvdy5jbGFzc05hbWUgKz0gXCIgXCIgKyByb3dDbGFzcy50cmltKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChpc0dyb3VwUm93ID09IHRydWUpIHtcclxuXHRcdFx0XHRcdC8vdGhpcy5lbGVtZW50Lm9uKFwiY2xpY2tcIiwgU3RyaW5nLkZvcm1hdChcIipbZGF0YS1yb3ctaW5kZXg9J3swfSddXCIsIHJvd0NvdW50KSwgZnVuY3Rpb24gKGV2KSB7IF90aGlzLl9hY3Rpb25DbGljayh0aGlzKTsgfSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cm93Q291bnQrKztcclxuXHRcdFx0XHRyZW5kZXJSb3dzLnB1c2gocm93KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcmVuZGVyUm93cztcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIF9hY3Rpb25DbGlja1xyXG5cdFx0ICogXHJcblx0XHQgKiBAcGFyYW0ge2FueX0gZWxlbWVudFxyXG5cdFx0ICovXHJcblx0XHRfYWN0aW9uQ2xpY2soZWxlbWVudCkge1xyXG5cdFx0XHRpZiAoZWxlbWVudC5yb3dJbmRleCAhPSAtMSkge1xyXG5cdFx0XHRcdHRoaXMubnVtYmVyUm93ID0gcGFyc2VJbnQoZWxlbWVudC5hdHRyaWJ1dGVzW1wiZGF0YS1yb3ctaW5kZXhcIl0ubm9kZVZhbHVlKTtcclxuXHRcdFx0XHR2YXIgbWV0YSA9IHRoaXMuX2RhdGEuZ2V0Um93cyh0cnVlLCB0aGlzLm51bWJlclJvdywgMSlbMF07XHJcblx0XHRcdFx0aWYgKCQuaXNGdW5jdGlvbihtZXRhLnN0cnVjdHVyZSAmJiBtZXRhLnN0cnVjdHVyZS5pbnRlcmFjdGlvbikpXHJcblx0XHRcdFx0XHRtZXRhLnN0cnVjdHVyZS5pbnRlcmFjdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBfYW5hbHl6ZURhdGFcclxuXHRcdCAqIFxyXG5cdFx0ICogQHBhcmFtIHthbnlbXX0gcm93c1xyXG5cdFx0ICogQHJldHVybnMge2FueVtdfVxyXG5cdFx0ICovXHJcblx0XHRfYW5hbHl6ZURhdGEocm93czogYW55W10pOiBhbnlbXSB7XHJcblx0XHRcdHZhciBncm91cHNJZDogbnVtYmVyW10gPSBuZXcgQXJyYXkoKTtcclxuXHRcdFx0dmFyIGN1cnJlbnRMZXZlbCA9IDBcclxuXHRcdFx0Z3JvdXBzSWQucHVzaCgwLCAwKTtcclxuXHRcdFx0dmFyIGdyb3VwTmFtZUFycmF5OiBzdHJpbmdbXSA9IG5ldyBBcnJheSgpO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAocm93c1tpXS5zdHJ1Y3R1cmUpIHtcclxuXHRcdFx0XHRcdGlmIChyb3dzW2ldLnN0cnVjdHVyZS5sZXZlbCAhPSBudWxsICYmIHJvd3NbaV0uc3RydWN0dXJlLmxldmVsICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRpZiAocm93c1tpXS5faXNWaXJ0dWFsID09IHRydWUgJiYgY3VycmVudExldmVsID09IHJvd3NbaV0uc3RydWN0dXJlLmxldmVsKVxyXG5cdFx0XHRcdFx0XHRcdGdyb3VwTmFtZUFycmF5LnBvcCgpO1xyXG5cdFx0XHRcdFx0XHRpZiAoY3VycmVudExldmVsID4gcm93c1tpXS5zdHJ1Y3R1cmUubGV2ZWwpIHtcclxuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBtID0gMDsgbSA8PSAoY3VycmVudExldmVsIC0gcm93c1tpXS5zdHJ1Y3R1cmUubGV2ZWwpICsgMTsgbSsrKVxyXG5cdFx0XHRcdFx0XHRcdFx0Z3JvdXBOYW1lQXJyYXkucG9wKCk7XHJcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaiA9IHJvd3NbaV0uc3RydWN0dXJlLmxldmVsICsgMTsgaiA8IGdyb3Vwc0lkLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0XHRcdFx0Z3JvdXBzSWRbal0gPSAwO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGN1cnJlbnRMZXZlbCA9IHJvd3NbaV0uc3RydWN0dXJlLmxldmVsO1xyXG5cdFx0XHRcdFx0XHRncm91cHNJZFtyb3dzW2ldLnN0cnVjdHVyZS5sZXZlbF0rKztcclxuXHRcdFx0XHRcdFx0dmFyIGdyb3VwTmFtZSA9IFwiezB9X2dyb3VwXCIuZm9ybWF0KHRoaXMuY3NzVWlkKTtcclxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCBncm91cHNJZC5sZW5ndGg7IGsrKykge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChncm91cHNJZFtrXSAhPSAwKVxyXG5cdFx0XHRcdFx0XHRcdFx0Z3JvdXBOYW1lICs9IFwiX3swfVwiLmZvcm1hdChncm91cHNJZFtrXSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cm93c1tpXS5ncm91cElkID0gZ3JvdXBOYW1lO1xyXG5cdFx0XHRcdFx0XHRncm91cE5hbWVBcnJheS5wdXNoKGdyb3VwTmFtZSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cm93c1tpXS5oZWFkZXJzID0gZ3JvdXBOYW1lQXJyYXkuam9pbignICcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcm93cztcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIF9yZW5kZXJIZWFkZXJSb3dcclxuXHRcdCAqIFxyXG5cdFx0ICogQHBhcmFtIHthbnl9IGxldmVsXHJcblx0XHQgKiBAcGFyYW0ge2FueX0gaGVhZGVyUm93SWRcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBncm91cFxyXG5cdFx0ICogQHJldHVybnMge0hUTUxUYWJsZVJvd0VsZW1lbnR9XHJcblx0XHQgKi9cclxuXHRcdF9yZW5kZXJIZWFkZXJSb3cobGV2ZWwsIGhlYWRlclJvd0lkLCBncm91cDogc3RyaW5nKTogSFRNTFRhYmxlUm93RWxlbWVudCB7XHJcblxyXG5cdFx0XHR2YXIgaHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XHJcblx0XHRcdHZhciBoY2VsbEVtcHR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG5cdFx0XHRoY2VsbEVtcHR5LmNsYXNzTmFtZSA9IFwibGVmdCBlbXB0eVwiO1xyXG5cdFx0XHRocm93LmNsYXNzTGlzdC5hZGQoXCJndGFibGUtaHJvd1wiKTtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIGhjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKTtcclxuXHRcdFx0XHRoY2VsbC5zY29wZSA9IFwiY29sXCI7XHJcblx0XHRcdFx0aWYgKGhyb3cuY2hpbGRyZW4ubGVuZ3RoID09IDApIHtcclxuXHRcdFx0XHRcdGhjZWxsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwicGFkZGluZy1sZWZ0OnswfXB4XCIuZm9ybWF0KCgobGV2ZWwgKiAxMikgKyAwKSkpXHJcblx0XHRcdFx0XHRoY2VsbEVtcHR5LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwicGFkZGluZy1sZWZ0OnswfXB4XCIuZm9ybWF0KCgobGV2ZWwgKiAxMikgKyAwKSkpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciB0YyA9IHRoaXMuX2NvbHVtbnNbaV07XHJcblx0XHRcdFx0dmFyIGNhcHRpb24gPSB0Yy5jYXB0aW9uICE9IG51bGwgPyB0Yy5jYXB0aW9uIDogdGMubmFtZSAhPSBudWxsID8gXCI8aT5cIiArIHRjLm5hbWUgKyBcIjwvaT5cIiA6IFwiXCI7XHJcblx0XHRcdFx0aWYgKHRjLmhlYWRlclRlbXBsYXRlKSB7XHJcblx0XHRcdFx0XHR2YXIgY2VsbENvbnRlbnQgPSB0Yy5oZWFkZXJUZW1wbGF0ZS5yZW5kZXIodGMsIHsgY2VsbDogaGNlbGwsIGNvbHVtbjogdGMsIGNvbHVtbkluZGV4OiBpIH0pO1xyXG5cdFx0XHRcdFx0aWYgKGNlbGxDb250ZW50ID09IG51bGwpIGNhcHRpb24gPSBudWxsO1xyXG5cdFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGNlbGxDb250ZW50ID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBjZWxsQ29udGVudCA9PT0gXCJudW1iZXJcIikgY2FwdGlvbiA9IGNlbGxDb250ZW50O1xyXG5cdFx0XHRcdFx0ZWxzZSB7IGNhcHRpb24gPSBudWxsOyAkKGhjZWxsKS5hcHBlbmQoY2VsbENvbnRlbnQpOyB9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0Yy5hbGlnbilcclxuXHRcdFx0XHRcdGhjZWxsLmNsYXNzTGlzdC5hZGQodGMuYWxpZ24pO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdGhjZWxsLmNsYXNzTGlzdC5hZGQoXCJsZWZ0XCIpO1xyXG5cdFx0XHRcdGlmIChjYXB0aW9uKVxyXG5cdFx0XHRcdFx0JChcIjxzcGFuIGNsYXNzPSdjYXB0aW9uJz5cIikuaHRtbChjYXB0aW9uKS5ndG9vbHRpcCh7IGNhcHRpb246IHRjLmRpc3BsYXlDYXB0aW9uIHx8IHRjLmNhcHRpb24sIHRvb2x0aXA6IHRjLmRlc2NyaXB0aW9uLCBzaG93Q2FwdGlvbjogZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfSB9KS5hcHBlbmRUbyhoY2VsbCk7XHJcblx0XHRcdFx0aWYgKGhjZWxsLmlubmVySFRNTCA9PSBcIlwiKVxyXG5cdFx0XHRcdFx0aGNlbGwgPSBoY2VsbEVtcHR5O1xyXG5cdFx0XHRcdGhjZWxsLmlkID0gXCJ7MH1fY29sX3sxfV97Mn1cIi5mb3JtYXQodGhpcy5jc3NVaWQsIGhlYWRlclJvd0lkLCBpKVxyXG5cdFx0XHRcdGlmIChncm91cCAhPSBcIlwiKVxyXG5cdFx0XHRcdFx0aGNlbGwuaGVhZGVycyA9IGdyb3VwO1xyXG5cdFx0XHRcdGhyb3cuYXBwZW5kQ2hpbGQoaGNlbGwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBocm93O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG4gKiBfcmVuZGVyRGF0YVJvd1ZhbHVlc1xyXG4gKiBcclxuICogQHBhcmFtIHthbnl9IHRydWVDb2x1bW5zXHJcbiAqIEBwYXJhbSB7YW55fSBtZXRhXHJcbiAqIEBwYXJhbSB7YW55fSByb3dJbmRleFxyXG4gKiBAcGFyYW0ge2FueX0gbGV2ZWxcclxuICogQHBhcmFtIHthbnl9IGhlYWRlclJvd0lkXHJcbiAqIEByZXR1cm5zIHtIVE1MVGFibGVSb3dFbGVtZW50fVxyXG4gKi9cclxuXHRcdF9yZW5kZXJEYXRhUm93VmFsdWVzKHRydWVDb2x1bW5zLCBtZXRhLCByb3dJbmRleCwgbGV2ZWwsIGhlYWRlclJvd0lkKTogSFRNTFRhYmxlUm93RWxlbWVudCB7XHJcblxyXG5cdFx0XHR2YXIgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRydWVDb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIHRjID0gdHJ1ZUNvbHVtbnNbaV07XHJcblx0XHRcdFx0dmFyIGNlbGw6IEhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50IHwgSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50O1xyXG5cdFx0XHRcdGlmICh0cnVlQ29sdW1uc1swXS5zdHJ1Y3R1cmVMZWFkKSB7XHJcblx0XHRcdFx0XHRjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpXHJcblx0XHRcdFx0XHRjZWxsLmlkID0gXCJ7MH1fY29sX3sxfVwiLmZvcm1hdCh0aGlzLmNzc1VpZCwgaSk7XHJcblx0XHRcdFx0XHRjZWxsLnNjb3BlID0gXCJjb2xncm91cFwiO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG5cdFx0XHRcdFx0Y2VsbC5oZWFkZXJzID0gbWV0YS5oZWFkZXJzICsgXCIgezB9X2NvbF97MX1fezJ9XCIuZm9ybWF0KHRoaXMuY3NzVWlkLCBoZWFkZXJSb3dJZCwgaSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChpID09IDApXHJcblx0XHRcdFx0XHRjZWxsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwicGFkZGluZy1sZWZ0OlwiICsgXCI1cHhcIilcdCAvL2NlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJwYWRkaW5nLWxlZnQ6XCIgKyAoKGxldmVsICogMTIpICsgMTUpICsgXCJweFwiKVxyXG5cdFx0XHRcdGlmIChtZXRhLl9pc1ZpcnR1YWwpIHtcclxuXHRcdFx0XHRcdGNlbGwuaWQgPSBtZXRhLmdyb3VwSWQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0Yy5oaWRkZW4gPT0gZmFsc2UgfHwgdGMuc3RydWN0dXJlTGVhZCA9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHRjZWxsLmNsYXNzTmFtZSA9IFwiY2VsbCBjXCIgKyBpO1xyXG5cdFx0XHRcdFx0dmFyIGNjID0gdHJ1ZUNvbHVtbnNbaV0uY3VzdG9tQ2xhc3M7XHJcblx0XHRcdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKGNjKSkgY2MgPSBjYy5jYWxsKHRoaXMuZWxlbWVudFswXSwgbWV0YSwgdHJ1ZUNvbHVtbnNbaV0sIHJvd0luZGV4KTsgLy8gVFM6IHNrb3JvIGthemRhIGl0ZW1vdmEgY3VzdG9tQ2xhc3MgbXV6ZSBvYnNhaG92YXQgZGVsZWdhdGFcclxuXHRcdFx0XHRcdGlmIChjYylcclxuXHRcdFx0XHRcdFx0Y2VsbC5jbGFzc0xpc3QuYWRkKC4uLmNjLnNwbGl0KFwiIFwiKS5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0pKTtcclxuXHJcblx0XHRcdFx0XHRpZiAodGMuYWxpZ24gPT0gXCJyaWdodFwiKSBjZWxsLmNsYXNzTGlzdC5hZGQoXCJyaWdodFwiKTtcclxuXHRcdFx0XHRcdGNlbGwuc2V0QXR0cmlidXRlKFwiZGF0YS1jb2x1bW4taW5kZXhcIiwgaS50b1N0cmluZygpKTtcclxuXHRcdFx0XHRcdHZhciBjZWxsQ29udGVudCA9IHRjLmNlbGxUZW1wbGF0ZS5yZW5kZXIobWV0YS5kYXRhLCBtZXRhLCB7IHdpZGdldDogdGhpcy5lbGVtZW50LCBjZWxsOiBjZWxsLCBjb2x1bW46IHRjLCByb3dJbmRleDogcm93SW5kZXgsIGluaXQ6IHRydWUgfSlcclxuXHRcdFx0XHRcdGlmIChjZWxsQ29udGVudCAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgY2VsbENvbnRlbnQgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGNlbGxDb250ZW50ID09PSBcIm51bWJlclwiKSBjZWxsLmlubmVySFRNTCA9IFwiPGRpdj5cIiArIGNlbGxDb250ZW50LnRvU3RyaW5nKCkgKyBcIjwvZGl2PlwiO1xyXG5cdFx0XHRcdFx0XHRlbHNlIGlmIChjZWxsQ29udGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IGNlbGxDb250ZW50IGluc3RhbmNlb2YgalF1ZXJ5KSAkKGNlbGwpLmh0bWwoY2VsbENvbnRlbnQgYXMgYW55KTtcclxuXHRcdFx0XHRcdFx0ZWxzZSBjZWxsLmlubmVySFRNTCA9IEpTT04uc3RyaW5naWZ5KGNlbGxDb250ZW50KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKG1ldGEuc3RydWN0dXJlKVxyXG5cdFx0XHRcdFx0XHRjZWxsLmlubmVyVGV4dCA9IGNlbGwuaW5uZXJUZXh0O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHRjLnN0cnVjdHVyZUxlYWQgJiYgdGMuc3RydWN0dXJlTGVhZCA9PSB0cnVlKSB7XHJcblxyXG5cclxuXHRcdFx0XHRcdGNlbGwuY29sU3BhbiA9IHRoaXMuX2NvbHVtbnMubGVuZ3RoO1xyXG5cdFx0XHRcdFx0dmFyIGljb24gPSBcIlwiO1xyXG5cdFx0XHRcdFx0c3dpdGNoIChtZXRhLnN0cnVjdHVyZSAmJiBtZXRhLnN0cnVjdHVyZS5zdGF0ZSkge1xyXG5cdFx0XHRcdFx0XHRjYXNlIFwiY2xvc2VkXCI6IGljb24gPSBcImZhIGZhLWNoZXZyb24tcmlnaHRcIjsgYnJlYWs7XHJcblx0XHRcdFx0XHRcdGNhc2UgXCJvcGVuXCI6IGljb24gPSBcImZhIGZhLWNoZXZyb24tZG93blwiOyBicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHZhciBiYWRnZSA9IFwiXCJcclxuXHRcdFx0XHRcdC8vaWYgKGNlbGwuaW5uZXJUZXh0LnN1YnN0cigwLCAzKSA9PSBcIk5vdlwiKSB7XHJcblx0XHRcdFx0XHQvL1x0YmFkZ2UgPSBcIjx0eXAtcG9waXMgY2xhc3M9J2ctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLXN1Y2Nlc3MgZy1iYWRnZSBjaGFuZ2Vsb2ctdHlwJz5Ob3Zpbmt5PC90eXAtcG9waXM+XCJcclxuXHRcdFx0XHRcdC8vfVxyXG5cdFx0XHRcdFx0Ly9lbHNlIGlmIChjZWxsLmlubmVyVGV4dC5zdWJzdHIoMCwgMykgPT0gXCJMZWdcIikge1xyXG5cdFx0XHRcdFx0Ly9cdGJhZGdlID0gXCI8dHlwLXBvcGlzIGNsYXNzPSdnLXN0YXRlLWJhY2tncm91bmQgZy1zdGF0ZS1pbXBvcnRhbnQgZy1iYWRnZSBjaGFuZ2Vsb2ctdHlwJz5MZWdpc2xhdGl2bsOtIHptxJtueTwvdHlwLXBvcGlzPlwiXHJcblx0XHRcdFx0XHQvL31cclxuXHRcdFx0XHRcdC8vZWxzZSBpZiAoY2VsbC5pbm5lclRleHQuc3Vic3RyKDAsIDMpID09IFwiT3ByXCIpIHtcclxuXHRcdFx0XHRcdC8vXHRiYWRnZSA9IFwiPHR5cC1wb3BpcyBjbGFzcz0nZy1zdGF0ZS1iYWNrZ3JvdW5kIGctc3RhdGUtaW5mbyBnLWJhZGdlIGNoYW5nZWxvZy10eXAnPk9wcmF2eTwvdHlwLXBvcGlzPlwiXHJcblx0XHRcdFx0XHQvL31cclxuXHRcdFx0XHRcdC8vZWxzZSBpZiAoY2VsbC5pbm5lclRleHQuc3Vic3RyKDAsIDMpID09IFwiWm7DoVwiKSB7XHJcblx0XHRcdFx0XHQvL1x0YmFkZ2UgPSBcIjx0eXAtcG9waXMgY2xhc3M9J2ctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLXdhcm5pbmcgZy1iYWRnZSBjaGFuZ2Vsb2ctdHlwJz5absOhbcOpIGNoeWJ5PC90eXAtcG9waXM+XCJcclxuXHRcdFx0XHRcdC8vfVxyXG5cdFx0XHRcdFx0Ly9lbHNlIGlmIChjZWxsLmlubmVyVGV4dC5zdWJzdHIoMCwgMykgPT0gXCJQb3pcIikge1xyXG5cdFx0XHRcdFx0Ly9cdGJhZGdlID0gXCI8dHlwLXBvcGlzIGNsYXNzPSdnLWJhZGdlIGNoYW5nZWxvZy10eXBQb3puYW1rYUhlYWRlcic+UG96bsOhbWt5PC90eXAtcG9waXM+XCJcclxuXHJcblx0XHRcdFx0XHQvL31cclxuXHRcdFx0XHRcdGlmIChjZWxsLmlubmVyVGV4dC5zdWJzdHIoMCwgMykgPT0gXCJOb3ZcIikge1xyXG5cdFx0XHRcdFx0XHRiYWRnZSA9IFwiPHR5cC1wb3Bpcz5Ob3Zpbmt5PC90eXAtcG9waXM+XCJcclxuXHRcdFx0XHRcdFx0Y2VsbC5zdHlsZS5jdXJzb3IgPSBcImF1dG9cIlxyXG5cdFx0XHRcdFx0XHQvL2NlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJjdXJzb3I6YXV0b1wiKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoY2VsbC5pbm5lclRleHQuc3Vic3RyKDAsIDMpID09IFwiTGVnXCIpIHtcclxuXHRcdFx0XHRcdFx0YmFkZ2UgPSBcIjx0eXAtcG9waXM+TGVnaXNsYXRpdm7DrSB6bcSbbnk8L3R5cC1wb3Bpcz5cIlxyXG5cdFx0XHRcdFx0XHRjZWxsLnN0eWxlLmN1cnNvciA9IFwiYXV0b1wiXHJcblx0XHRcdFx0XHRcdC8vY2VsbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImN1cnNvcjphdXRvXCIpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChjZWxsLmlubmVyVGV4dC5zdWJzdHIoMCwgMykgPT0gXCJPcHJcIikge1xyXG5cdFx0XHRcdFx0XHRiYWRnZSA9IFwiPHR5cC1wb3Bpcz5PcHJhdnk8L3R5cC1wb3Bpcz5cIlxyXG5cdFx0XHRcdFx0XHRjZWxsLnN0eWxlLmN1cnNvciA9IFwiYXV0b1wiXHJcblx0XHRcdFx0XHRcdC8vY2VsbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImN1cnNvcjphdXRvXCIpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChjZWxsLmlubmVyVGV4dC5zdWJzdHIoMCwgMykgPT0gXCJabsOhXCIpIHtcclxuXHRcdFx0XHRcdFx0YmFkZ2UgPSBcIjx0eXAtcG9waXM+Wm7DoW3DqSBjaHlieTwvdHlwLXBvcGlzPlwiXHJcblx0XHRcdFx0XHRcdGNlbGwuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcclxuXHRcdFx0XHRcdFx0Ly9jZWxsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiY3Vyc29yOmF1dG9cIilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKGNlbGwuaW5uZXJUZXh0LnN1YnN0cigwLCAzKSA9PSBcIlBvelwiKSB7XHJcblx0XHRcdFx0XHRcdGJhZGdlID0gXCI8dHlwLXBvcGlzPlBvem7DoW1reTwvdHlwLXBvcGlzPlwiXHJcblx0XHRcdFx0XHRcdGNlbGwuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcclxuXHRcdFx0XHRcdFx0Ly9jZWxsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiY3Vyc29yOmF1dG9cIilcclxuXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmICgoY2VsbC5pbm5lclRleHQuc3Vic3RyKDAsIDMpID09IFwiR1dBXCIpIHx8IChjZWxsLmlubmVyVGV4dC5zdWJzdHIoMCwgMykgPT0gXCJHU0FcIikgfHwgKGNlbGwuaW5uZXJUZXh0LnN1YnN0cigwLCAzKSA9PSBcIkdXU1wiKSB8fCAoY2VsbC5pbm5lclRleHQuc3Vic3RyKDAsIDMpID09IFwiR1NTXCIpIHx8IChjZWxsLmlubmVyVGV4dC5zdWJzdHIoMCwgMykgPT0gXCJHSU5cIikgfHwgKGNlbGwuaW5uZXJUZXh0LnN1YnN0cigwLCAzKSA9PSBcIkdNU1wiKSkge1xyXG5cdFx0XHRcdFx0XHRjZWxsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiYmFja2dyb3VuZC1jb2xvcjojQzZDREUwXCIpXHJcblx0XHRcdFx0XHRcdGNlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJmb250LXNpemU6bGFyZ2VyXCIpXHJcblx0XHRcdFx0XHRcdGNlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJjdXJzb3I6YXV0b1wiKVxyXG5cdFx0XHRcdFx0XHRjZWxsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiY29sb3I6ZGFya2JsdWVcIilcclxuXHRcdFx0XHRcdFx0Ly9jZWxsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwicGFkZGluZy10b3A6NnB4XCIpXHJcblx0XHRcdFx0XHRcdC8vY2VsbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcInBhZGRpbmctYm90dG9tOjZweFwiKVxyXG5cdFx0XHRcdFx0XHR2YXIgYmVnaW4gPSBjZWxsLmlubmVyVGV4dC5zdWJzdHJpbmcoMCwgNClcclxuXHRcdFx0XHRcdFx0Y2VsbC5pbm5lclRleHQgPSBjZWxsLmlubmVyVGV4dC5zdWJzdHJpbmcoY2VsbC5pbm5lclRleHQudG9TdHJpbmcoKS5sZW5ndGggLSA0LCA0KVxyXG5cdFx0XHRcdFx0XHRjZWxsLmlubmVyVGV4dCA9IGJlZ2luICsgY2VsbC5pbm5lclRleHQ7XHJcblx0XHRcdFx0XHRcdGlmIChjZWxsLmlubmVyVGV4dC5zdWJzdHIoY2VsbC5pbm5lclRleHQubGVuZ3RoLTEsMSk9PSBcIihcIikge1xyXG5cdFx0XHRcdFx0XHRcdGNlbGwuaW5uZXJUZXh0ID0gY2VsbC5pbm5lclRleHQuc3Vic3RyaW5nKDAsIGNlbGwuaW5uZXJUZXh0LnRvU3RyaW5nKCkubGVuZ3RoLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdFx0Y2VsbC5zdHlsZS5jb2xvciA9IFwiIzFEM0U4RlwiXHJcblx0XHRcdFx0XHRcdGNlbGwuc3R5bGUuZm9udFNpemUgPSBcImxhcmdlclwiXHJcblx0XHRcdFx0XHRcdGNlbGwuc3R5bGUucGFkZGluZ0xlZnQgPSBcIjVweFwiXHJcblx0XHRcdFx0XHRcdGNlbGwuc3R5bGUucGFkZGluZ1RvcCA9IFwiNXB4XCJcclxuXHRcdFx0XHRcdFx0Y2VsbC5zdHlsZS5wYWRkaW5nQm90dG9tID0gXCI2cHhcIlxyXG5cdFx0XHRcdFx0XHRjZWxsLnN0eWxlLnRleHRBbGlnbiA9IFwic3RhcnRcIlxyXG5cdFx0XHRcdFx0XHRjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI0M2Q0RFMFwiXHJcblx0XHRcdFx0XHRcdGNlbGwuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcclxuXHRcdFx0XHRcdFx0Y2VsbC5pZCA9IGNlbGwuaW5uZXJUZXh0LnN1YnN0cmluZygwLDgpXHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJmb250LXNpemU6bGFyZ2VyXCIpXHJcblx0XHRcdFx0XHRcdGNlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJ0ZXh0LWFsaWduOnN0YXJ0XCIpXHJcblx0XHRcdFx0XHRcdGNlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJjdXJzb3I6YXV0b1wiKVxyXG5cdFx0XHRcdFx0XHRjZWxsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiY29sb3I6ZGFya2JsdWVcIilcclxuXHRcdFx0XHRcdFx0Y2VsbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcInBhZGRpbmctdG9wOjE1cHhcIilcclxuXHRcdFx0XHRcdFx0Y2VsbC5pbm5lclRleHQgPSBjZWxsLmlubmVyVGV4dC5zbGljZSgwLCAtNClcclxuXHRcdFx0XHRcdFx0Y2VsbC5zdHlsZS5jb2xvciA9IFwiIzFEM0U4RlwiXHJcblx0XHRcdFx0XHRcdGNlbGwuc3R5bGUuZm9udFNpemUgPSBcImxhcmdlclwiXHJcblx0XHRcdFx0XHRcdGNlbGwuc3R5bGUucGFkZGluZ0xlZnQgPSBcIjVweFwiXHJcblx0XHRcdFx0XHRcdGNlbGwuc3R5bGUudGV4dEFsaWduID0gXCJzdGFydFwiXHJcblx0XHRcdFx0XHRcdGNlbGwuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcclxuXHRcdFx0XHRcdFx0Y2VsbC5pZCA9IGNlbGwuaW5uZXJUZXh0XHQgICBcclxuXHRcdFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIilcclxuXHRcdFx0XHRcdFx0c2NyaXB0LnRleHQgPSBcInZhciByZXZpc2lvbiA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKSBcXG4gIGlmKCFyZXZpc2lvbil7fWVsc2V7bGV0IHNjcm9sbFRvRWxtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJzQzQVVUMDE1MjQzMVgwNicpIFxcbiBzY3JvbGxUb0VsbS5zY3JvbGxJbnRvVmlldygpIH1cIlx0XHQvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJldmlzaW9uKVx0IFxyXG5cdFx0XHRcdFx0XHQvL3NjcmlwdC5pbXBvcnRTY3JpcHQoKVxyXG5cdFx0XHRcdFx0XHQvLy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdC8vXHR2YXIgZmF6ZSA9IFwiR1dBSFNUMDVcIlxyXG5cdFx0XHRcdFx0XHQvL1x0bGV0IHNjcm9sbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiNDNBVVQwMTUyNDMxWDA2XCIpXHJcblx0XHRcdFx0XHRcdC8vXHRzY3JvbGw/LnNjcm9sbEludG9WaWV3KClcclxuXHRcdFx0XHRcdFx0Ly99O1xyXG5cdFx0XHRcdFx0XHQvLy8vY2VsbC5hcHBlbmQoc2NyaXB0KVxyXG5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChiYWRnZSAhPSBcIlwiKSB7XHJcblx0XHRcdFx0XHRcdHZhciBjb3VudCA9IGNlbGwuaW5uZXJUZXh0LnN1YnN0cihjZWxsLmlubmVyVGV4dC5pbmRleE9mKFwiKFwiKSwgY2VsbC5pbm5lclRleHQubGVuZ3RoKVxyXG5cdFx0XHRcdFx0XHR2YXIgY291bnRlciA9IFwiPGNvdW50IGNsYXNzPSdjaGFuZ2Vsb2ctY291bnRlcic+XCIgKyBjb3VudCArIFwiPC9jb3VudD5cIlxyXG5cdFx0XHRcdFx0XHRjZWxsLmlubmVyVGV4dCA9IFwiXCI7XHJcblx0XHRcdFx0XHRcdGNlbGwuc3R5bGUubWFyZ2luVG9wID0gXCI1cHhcIlxyXG5cdFx0XHRcdFx0XHRjZWxsLnN0eWxlLnRleHRBbGlnbiA9IFwic3RhcnRcIlxyXG5cdFx0XHRcdFx0XHQkKGJhZGdlKS5wcmVwZW5kVG8oY2VsbCk7XHJcblx0XHRcdFx0XHRcdC8vJChjb3VudGVyKS5hcHBlbmRUbyhjZWxsKTtcclxuXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0Ly8kKFwiPGk+PGkgY2xhc3M9J3swfScgLz48L2k+XCIuZm9ybWF0KGljb24pKS5wcmVwZW5kVG8oY2VsbCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHJvdztcclxuXHRcdH1cclxuXHJcblx0XHQvLyNlbmRyZWdpb25cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIGNyZWF0ZU1haW5Mb2dzUGFuZWxcdC0gVnlrcmVzbGVuw60gcG9waXPFryB6bcSbbiBkYW7DqSB2ZXJ6ZSBkbyBtYWluIHBhbmVsdVxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIGNyZWF0ZU1haW5Mb2dzUGFuZWxWZXJzaW9uKCkge1xyXG5cdFx0XHRpZiAodGhpcy5tYWluTG9nc1BhbmVsVmVyc2lvbiAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHR0aGlzLm1haW5Mb2dzUGFuZWxWZXJzaW9uLnJlbW92ZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zdCB0aGF0ID0gdGhpcztcclxuXHRcdFx0dGhhdC5iZWdpbk9wZXJhdGlvbihcIkdlbmVyb3bDoW7DrSBkYXRcIik7XHJcblx0XHRcdHRoYXQubWFpbkxvZ3NQYW5lbFZlcnNpb24gPSAkLm5ld0RpdihcIm1haW4tbG9nc1ZlcnNpb25cIikuYXBwZW5kVG8odGhhdC5tYWluTG9nc1BhbmVsKS5jc3MoeyAvKlwiZGlzcGxheVwiOiBcImlubGluZS1ibG9ja1wiLCovXCJib3JkZXJcIjogXCI1cHggc29saWQgI2U1ZThmMFwiLCBcIm1hcmdpblwiOiBcIjVweFwiLCAvKlwibWFyZ2luLWJvdHRvbVwiOiBcIjVweFwiLCBcIm1hcmdpbi10b3BcIjogXCI1cHhcIiwgXCJoZWlnaHRcIjogXCIzNXB4XCIsKi8gXCJjb2xvclwiOiBcImJsYWNrXCIsIFwidmVydGljYWwtYWxpZ25cIjogXCJtaWRkbGVcIiwgXCJkaXNwbGF5XCI6IFwibm9uZVwiIH0pIC8qLmFkZENsYXNzKFwiZy1zdGF0ZS1saWdodGJhY2tncm91bmQgZy1zdGF0ZS1pbmFjdGl2ZVwiKSovLy8gbm92eSBwYW5lbCwga2FtIHByZXN1bmVtZS92eXR2b3JpbWUgYWt0dWFsbmkgcXVldWVcclxuXHRcdFx0dmFyIG1haW5QYW5lbFZlcnNpb24gPSAkLm5ld0RpdihcIm1haW4tbG9ncy1wYW5lbFZlcnNpb25cIik7XHJcblx0XHRcdHRoYXQubWFpbkxvZ3NQYW5lbFZlcnNpb24uZ2F1dG9maXQoKS5hcHBlbmQobWFpblBhbmVsVmVyc2lvbik7XHJcblx0XHRcdHZhciB2ZXJ6ZSA9IHRoYXQuZGF0YUV4cG9ydC5zdWJzdHJpbmcodGhhdC5kYXRhRXhwb3J0Lmxlbmd0aCAtIDMsIHRoYXQuZGF0YUV4cG9ydC5sZW5ndGgpXHJcblx0XHRcdGlmICh0aGF0LmRhdGFFeHBvcnQuc3Vic3RyaW5nKHRoYXQuZGF0YUV4cG9ydC5sZW5ndGggLSAzLCB0aGF0LmRhdGFFeHBvcnQubGVuZ3RoKSA9PSBcIjUyNFwiKSB7XHJcblx0XHRcdFx0dGhhdC5fY3JlYXRlQ2hhbmdlTG9nVmVyc2lvbihcIjUyNFwiKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHR0aGF0Ll9jcmVhdGVDaGFuZ2VMb2dWZXJzaW9uKFwiNTI1XCIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHRoYXQubWFpbkxvZ3NQYW5lbFZlcnNpb24uaGlkZShcImZhc3RcIilcclxuXHRcdFx0XHR0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG5cdFx0XHRcdHRoYXQubm90aWZpY2F0aW9uKFwiYWRkXCIsIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiLCBpZDogXCJEb3dubG9hZENoYW5nZWxvZ0ZpbGVcIiwgc3RhdGU6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCJFeHBvcnQgZGF0XCIsIGNvbnRlbnQ6IFwiUMWZZWhsZWQgem3Em24gYnlsIMO6c3DEm8WhbsSbIHZ5Z2VuZXJvdsOhblwiIH0pO1xyXG5cdFx0XHRcdGlmICh0aGF0LmRhdGFGb3JtYXQgPT0gXCJIVE1MXCIpIHtcclxuXHRcdFx0XHRcdHZhciBleHBvcnRIdG1sXHJcblx0XHRcdFx0XHR2YXIgaHRtbFxyXG5cdFx0XHRcdFx0ZXhwb3J0SHRtbCA9IHRoYXQubWFpbkxvZ3NQYW5lbFZlcnNpb25bMF0gIC8vZXhwb3J0SHRtbFRlc3QgICAvLy5vdXRlckhUTUwgLy8uaW5uZXJIVE1MXHJcblx0XHRcdFx0XHRleHBvcnRIdG1sID0gdGhhdC5nZXRPdXRlckhUTUxXaXRoSW5saW5lU3R5bGUodGhhdC5tYWluTG9nc1BhbmVsVmVyc2lvblswXSlcclxuXHJcblx0XHRcdFx0XHQvL3N0eWxlSHRtbCA9IGdldENvbXB1dGVkU3R5bGUodGhhdC5tYWluTG9nc1BhbmVsWzBdKS5jc3NUZXh0XHQgIC8vZ2V0Q29tcHV0ZWRTdHlsZSh0aGF0Lm1haW5Mb2dzUGFuZWxbMF0pLmNzc1RleHRcclxuXHRcdFx0XHRcdGh0bWwgPSBcIjwhRE9DVFlQRSBodG1sPjxodG1sPjxoZWFkPjx0aXRsZT5DaGFuZ2Vsb2cgSFRNTCBnZW5lcmF0ZWQgcmVwb3J0PC90aXRsZT48bWV0YSBjaGFyc2V0PSdVVEYtOCc+PHN0eWxlPlwiXHJcblx0XHRcdFx0XHRcdCsgXCIuXCIgKyB0aGF0Lm1haW5Mb2dzUGFuZWxWZXJzaW9uWzBdPy5jaGlsZHJlblswXT8uY2xhc3NOYW1lXHJcblx0XHRcdFx0XHRcdCsgXCJ7XCIgKyBleHBvcnRIdG1sICsgXCJ9XCJcclxuXHRcdFx0XHRcdFx0KyBcIjwvc3R5bGU+PC9oZWFkPjxib2R5PlwiXHJcblx0XHRcdFx0XHRcdCsgZXhwb3J0SHRtbCArIFwiPC9ib2R5PjwvaHRtbD5cIjtcclxuXHRcdFx0XHRcdHRoYXQuZG93bmxvYWRJbm5lckh0bWxWZXJzaW9uKCdjaGFuZ2Vsb2cnICsgdmVyemUgKyAnLmh0bWwnLCAnbWFpbi1sb2dzVmVyc2lvbicsICd0ZXh0L2h0bWwnLCB0aGF0LmRhdGFFeHBvcnQsIHRoYXQuZGF0YUZvcm1hdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYgKHRoYXQuZGF0YUZvcm1hdCA9PSBcIkRPQ1hcIikge1xyXG5cdFx0XHRcdFx0dGhhdC5kb3dubG9hZElubmVySHRtbFZlcnNpb24oJ2NoYW5nZWxvZycgKyB2ZXJ6ZSArICcuZG9jJywgJ21haW4tbG9nc1ZlcnNpb24nLCAnYXBwbGljYXRpb24vbXN3b3JkJywgdGhhdC5kYXRhRXhwb3J0LCB0aGF0LmRhdGFGb3JtYXQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmICh0aGF0LmRhdGFGb3JtYXQgPT0gXCJURVhUXCIpIHtcclxuXHRcdFx0XHRcdHRoYXQuZG93bmxvYWRJbm5lckh0bWxWZXJzaW9uKCdjaGFuZ2Vsb2cnICsgdmVyemUgKyAnLnR4dCcsICdtYWluLWxvZ3NWZXJzaW9uJywgJ3RleHQvcGxhaW4nLCB0aGF0LmRhdGFFeHBvcnQsIHRoYXQuZGF0YUZvcm1hdCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvL0Rvd25sb2FkIGRhdCB6YSB2ZXJ6aVxyXG5cdFx0XHRcdC8vdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblxyXG5cdFx0XHRcdC8vLy9saW5rLmFwcGVuZCh0ZXN0KVxyXG5cclxuXHRcdFx0XHQvLy8vbWltZVR5cGUgPSBtaW1lVHlwZSB8fCAndGV4dC9wbGFpbic7XHJcblx0XHRcdFx0Ly9saW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCAnY2hhbmdlbG9nNTI0Lmh0bWwnKTtcclxuXHRcdFx0XHQvL2lmIChodG1sKSB7XHJcblxyXG5cdFx0XHRcdC8vXHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICdkYXRhOicgKyAnbWFpbi1sb2dzVmVyc2lvbicgKyAnO2NoYXJzZXQ9dXRmLTgsJyArIC8qZW5jb2RlVVJJQ29tcG9uZW50KGV4cG9ydEh0bWwpKi8gZW5jb2RlVVJJQ29tcG9uZW50KC8qZXhwb3J0SHRtbCovaHRtbCkpO1xyXG5cdFx0XHRcdC8vfVxyXG5cdFx0XHRcdC8vbGluay5jbGljaygpO1xyXG5cclxuXHRcdFx0fSwgNTAwMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQqIG5hc3Rhdml0IGRhdGFcclxuXHRcdCovXHJcblx0XHRwcml2YXRlIF9jcmVhdGVDaGFuZ2VMb2dWZXJzaW9uKHZlcnNpb24pIHtcclxuXHRcdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblx0XHRcdHRoYXQubWFpbkxvZ3NQYW5lbFZlcnNpb24uY2hpbGRyZW4oKS5yZW1vdmUoKTtcclxuXHRcdFx0dGhhdC5kYXRfb2QgPSB0aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcImRhdF96bWVuYVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKS5kYXRlLnN0YXJ0O1xyXG5cdFx0XHR0aGF0LmRhdF9kbyA9IHRoYXQuZWxlbWVudC5maW5kRmllbGRzKFwiZGF0X3ptZW5hXCIpLmdmaWVsZChcImdldFZhbHVlXCIpLmRhdGUuZW5kO1xyXG5cdFx0XHR0aGF0LkRhdGFGaWx0ZXJWZXJzaW9uID0ge31cclxuXHRcdFx0dGhhdC5EYXRhRmlsdGVyVmVyc2lvbi5ha3Rpdml0YSA9IDEwMFxyXG5cdFx0XHR0aGF0LkRhdGFGaWx0ZXJWZXJzaW9uLmRhdF9vZCA9IHRoYXQuZGF0X29kXHJcblx0XHRcdHRoYXQuRGF0YUZpbHRlclZlcnNpb24uZGF0X2RvID0gdGhhdC5kYXRfZG9cclxuXHRcdFx0dGhhdC5EYXRhRmlsdGVyVmVyc2lvbi5wb3BpcyA9IHRoYXQucHJpel9zZXNcclxuXHRcdFx0dGhhdC5EYXRhRmlsdGVyVmVyc2lvbi5kYXRfb2Quc2V0RGF0ZSh0aGF0LmRhdF9vZC5nZXREYXRlKCkgKyAxKVxyXG5cdFx0XHR0aGF0LkRhdGFGaWx0ZXJWZXJzaW9uLmRhdF9kby5zZXREYXRlKHRoYXQuZGF0X2RvLmdldERhdGUoKSArIDEpXHJcblx0XHRcdC8vRmlsdHIgbmEgdmVyemkgcG9waXN1IHptxYhcclxuXHRcdFx0Ly9Lb25lYyBmaWx0cnUgbmEgdmVyemlcclxuXHRcdFx0Ly9WTEFTVE5JIEdUQUJMQVxyXG5cdFx0XHR0aGlzLmNhbGw8R29yZGljLkFkdC5JbnRlcmZhY2UuR1BvcGlzWm1lbnlEdG9bXT4oXCJOYWN0aURhdGFcIiwgeyBWc3R1cG5pRGF0YTogdGhhdC5EYXRhRmlsdGVyVmVyc2lvbiwgdGFneURhdGE6IFtdIH1cclxuXHJcblx0XHRcdClcclxuXHRcdFx0XHQuZG9uZSgoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdC8vR3JvdXBvdsOhbsOtXHJcblx0XHRcdFx0dGhhdC52aWV3Wm1lbnlWZXJzaW9uID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhzX2ttcFwiIH0pO1xyXG5cdFx0XHRcdGlmICh0aGF0LnR5cFZpZXcgPT0gMCkge1xyXG5cdFx0XHRcdFx0dGhhdC52aWV3Wm1lbnlWZXJzaW9uID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhzX2ttcFwiIH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmICh0aGF0LnR5cFZpZXcgPT0gMSkge1xyXG5cclxuXHRcdFx0XHRcdC8veHh4XHJcblx0XHRcdFx0XHQvL2ZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0Ly9cdHZhciB0YWd5UmFka3UgPSBkYXRhW2ldLnRhZ3k/LnNwbGl0KFwiO1wiKTtcclxuXHRcdFx0XHRcdC8vXHRpZiAodGFneVJhZGt1KSB7XHJcblx0XHRcdFx0XHQvL1x0XHRmb3IgKHZhciBqID0gMDsgaiA8IHRhZ3lSYWRrdS5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdFx0Ly9cdFx0XHRpZiAodGFneVJhZGt1W2pdLnN1YnN0cmluZygwLCAyKSA9PSBcIjIwXCIgJiYgdGFneVJhZGt1W2pdLmxlbmd0aCA+PSAxMikge1xyXG5cdFx0XHRcdFx0Ly9cdFx0XHRcdHRhZ3lSYWRrdVtqXSA9IFwiOTBcIiArIHRhZ3lSYWRrdVtqXS5zdWJzdHJpbmcoMiwgdGFneVJhZGt1W2pdLmxlbmd0aClcclxuXHRcdFx0XHRcdC8vXHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly9cdFx0fVxyXG5cdFx0XHRcdFx0Ly9cdFx0dmFyIGVkaXRUYWd5ID0gXCJcIjtcclxuXHRcdFx0XHRcdC8vXHRcdGZvciAodmFyIGsgPSAwOyBrIDwgdGFneVJhZGt1Lmxlbmd0aDsgaysrKSB7XHJcblx0XHRcdFx0XHQvL1x0XHRcdGlmIChrID09IDApIHtcclxuXHRcdFx0XHRcdC8vXHRcdFx0XHRlZGl0VGFneSA9IHRhZ3lSYWRrdVtrXVxyXG5cdFx0XHRcdFx0Ly9cdFx0XHR9XHJcblx0XHRcdFx0XHQvL1x0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly9cdFx0XHRcdGVkaXRUYWd5ID0gZWRpdFRhZ3kgKyBcIjtcIiArIGVkaXRUYWd5W2tdXHJcblx0XHRcdFx0XHQvL1x0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvL1x0XHR9XHJcblx0XHRcdFx0XHQvL1x0XHRkYXRhW2ldLnRhZ3kgPSBlZGl0VGFneVxyXG5cdFx0XHRcdFx0Ly9cdH1cclxuXHJcblx0XHRcdFx0XHQvL31cclxuXHRcdFx0XHRcdC8veHh4XHJcblxyXG5cdFx0XHRcdFx0dmFyIGdyb3VwTGlzdDogR29yZGljLkRhdGEuR3JvdXBpbmdEZWZpbml0aW9uPEdvcmRpYy5BZHQuSW50ZXJmYWNlLkdQb3Bpc1ptZW55RHRvPltdID0gW107XHJcblx0XHRcdFx0XHR2YXIgZGxlVHlwdVptZW55OiBHb3JkaWMuRGF0YS5Hcm91cGluZ0RlZmluaXRpb248R29yZGljLkFkdC5JbnRlcmZhY2UuR1BvcGlzWm1lbnlEdG8+ID0ge1xyXG5cdFx0XHRcdFx0XHRkZWZhdWx0U3RhdGU6IFwib3BlblwiLFxyXG5cdFx0XHRcdFx0XHRoYXNoOiAobWV0YSwgcm93cykgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBmaXJzdFRhZyA9IG1ldGEuZGF0YS50YWd5Py5zdWJzdHIoMCwgMTIpXHJcblx0XHRcdFx0XHRcdFx0dmFyIHJldml6ZSA9IG1ldGEuZGF0YS50YWd5Py5zcGxpdCgnOycpWzBdO1xyXG5cdFx0XHRcdFx0XHRcdHZhciByZXZpemUgPSBtZXRhLmRhdGEudGFneT8uc3BsaXQoJzsnKVswXTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgaGFzaFR5cFptZW55ID0gYCR7bWV0YS5kYXRhW1widHlwX3ptZW55X2ttcF90eHRcIl19YFxyXG5cdFx0XHRcdFx0XHRcdC8vcmV0dXJuIGAke2hhc2hUeXBabWVueVttZXRhLmRhdGFbXCJcIl1dfWBcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gYCR7bWV0YS5kYXRhW1widHlwX3ptZW55X2ttcF90eHRcIl19YFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRhZ2dyZWdhdGU6IERhdGEuQWdncmVnYXRlcy5tYXgoXCJ0YWd5XCIpLFxyXG5cdFx0XHRcdFx0XHRzb3J0OiBcInRhZ3lcIixcclxuXHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdHZhciBkbGVUeXB1Wm1lbnlQbHVzUmV2aXplOiBHb3JkaWMuRGF0YS5Hcm91cGluZ0RlZmluaXRpb248R29yZGljLkFkdC5JbnRlcmZhY2UuR1BvcGlzWm1lbnlEdG8+ID0ge1xyXG5cdFx0XHRcdFx0XHRkZWZhdWx0U3RhdGU6IFwib3BlblwiLFxyXG5cdFx0XHRcdFx0XHRoYXNoOiAobWV0YSwgcm93cykgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHZhciByZXZpemUgPSBtZXRhLmRhdGEudGFneT8uc3BsaXQoJzsnKVswXTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgdGFneVBvbGUgPSBtZXRhLmRhdGEudGFneT8uc3BsaXQoXCI7XCIpO1xyXG5cdFx0XHRcdFx0XHRcdHZhciByZXZpemVTZWFyY2ggPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdHZhciByZXZpemVTZWFyY2hGaWVsZDogc3RyaW5nW10gPSBbXTtcclxuXHRcdFx0XHRcdFx0XHRpZiAodGFneVBvbGUgIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgY291bnRlciA9IDBcclxuXHRcdFx0XHRcdFx0XHRcdGlmICh0aGF0LkRhdGFGaWx0ZXJWZXJzaW9uPy5mYXplRmllbGQgIT0gdW5kZWZpbmVkICYmIHRoYXQuRGF0YUZpbHRlclZlcnNpb24/LmZhemVGaWVsZC5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHRoYXQuRGF0YUZpbHRlclZlcnNpb24/LmZhemVGaWVsZC5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGFneVBvbGUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciB0ZXN0MSA9IHRoYXQuRGF0YUZpbHRlclZlcnNpb24/LmZhemVGaWVsZFtqXS5zdWJzdHJpbmcoMywgOCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgdGVzdDIgPSB0YWd5UG9sZVtpXS5zdWJzdHJpbmcoMiwgNyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodGFneVBvbGVbaV0ubGVuZ3RoID49IDEyICYmIHRoYXQuRGF0YUZpbHRlclZlcnNpb24/LmZhemVGaWVsZFtqXS5zdWJzdHJpbmcoMywgOCkgPT0gdGFneVBvbGVbaV0uc3Vic3RyaW5nKDIsIDcpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldml6ZVNlYXJjaCA9IHRhZ3lQb2xlW2ldO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXZpemVTZWFyY2hGaWVsZC5wdXNoKHRhZ3lQb2xlW2ldKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRhZ3lQb2xlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRhZ3lQb2xlW2ldLmxlbmd0aCA+PSAxMikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV2aXplU2VhcmNoID0gdGFneVBvbGVbaV07XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXZpemVTZWFyY2hGaWVsZC5wdXNoKHRhZ3lQb2xlW2ldKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmICghKHJldml6ZVNlYXJjaC5sZW5ndGggPj0gMTIpICYmIHRhZ3lQb2xlICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV2aXplU2VhcmNoID0gdGFneVBvbGVbMF07XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHQvL3ZhciByZXZpemUgPSBtZXRhLmRhdGEudGFneT8uc3BsaXQoJzsnKTtcclxuXHRcdFx0XHRcdFx0XHQvL3ZhciBzZWFyY2hSZXYgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdC8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldml6ZSkge1xyXG5cdFx0XHRcdFx0XHRcdC8vXHRmb3IgKHZhciBpID0gMDsgaSA8IHJldml6ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdC8vXHRcdGlmIChyZXZpemVbaV0uc3Vic3RyaW5nKDAsMikgPT0gJ3JldicpIHtcclxuXHRcdFx0XHRcdFx0XHQvL1x0XHRcdHNlYXJjaFJldiA9IHJldml6ZVtpXVxyXG5cdFx0XHRcdFx0XHRcdC8vXHRcdH1cclxuXHRcdFx0XHRcdFx0XHQvL1x0fVxyXG5cdFx0XHRcdFx0XHRcdC8vICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdFx0XHRcdC8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldml6ZVNlYXJjaEZpZWxkLmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0XHRcdFx0XHQvL1x0cmV0dXJuIGAke3Jldml6ZVNlYXJjaEZpZWxkfWBcclxuXHRcdFx0XHRcdFx0XHQvL31cclxuXHRcdFx0XHRcdFx0XHQvLyAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBgJHtyZXZpemVTZWFyY2h9YFxyXG5cdFx0XHRcdFx0XHRcdC8vfVxyXG5cclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0YWdncmVnYXRlOiBEYXRhLkFnZ3JlZ2F0ZXMubWF4KFwidGFneVwiKSxcclxuXHRcdFx0XHRcdFx0c29ydDogXCJ0YWd5XCIsXHJcblxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRncm91cExpc3QucHVzaChkbGVUeXB1Wm1lbnlQbHVzUmV2aXplKTtcclxuXHRcdFx0XHRcdGdyb3VwTGlzdC5wdXNoKGRsZVR5cHVabWVueSk7XHJcblx0XHRcdFx0XHR0aGF0LnZpZXdabWVueVZlcnNpb24ucHJvY2Vzcyh7XHJcblx0XHRcdFx0XHRcdGRlZmF1bHQ6IG5ldyBHb3JkaWMuRGF0YS5Hcm91cGluZyhncm91cExpc3QpLFxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZiAodGhhdC50eXBWaWV3ID09IDIpIHtcclxuXHRcdFx0XHRcdHZhciBncm91cExpc3Q6IEdvcmRpYy5EYXRhLkdyb3VwaW5nRGVmaW5pdGlvbjxHb3JkaWMuQWR0LkludGVyZmFjZS5HUG9waXNabWVueUR0bz5bXSA9IFtdO1xyXG5cdFx0XHRcdFx0dmFyIGRsZVR5cHVabWVueTogR29yZGljLkRhdGEuR3JvdXBpbmdEZWZpbml0aW9uPEdvcmRpYy5BZHQuSW50ZXJmYWNlLkdQb3Bpc1ptZW55RHRvPiA9IHtcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdFN0YXRlOiBcIm9wZW5cIixcclxuXHRcdFx0XHRcdFx0aGFzaDogKG1ldGEsIHJvd3MpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gYCR7bWV0YS5kYXRhW1widHlwX3ptZW55X2ttcF90eHRcIl19YFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRhZ2dyZWdhdGU6IERhdGEuQWdncmVnYXRlcy5tYXgoXCJ0YWd5XCIpLFxyXG5cdFx0XHRcdFx0XHRzb3J0OiBcInRhZ3lcIixcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHR2YXIgZGxlVHlwdVptZW55UGx1c1Jldml6ZTogR29yZGljLkRhdGEuR3JvdXBpbmdEZWZpbml0aW9uPEdvcmRpYy5BZHQuSW50ZXJmYWNlLkdQb3Bpc1ptZW55RHRvPiA9IHtcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdFN0YXRlOiBcIm9wZW5cIixcclxuXHRcdFx0XHRcdFx0aGFzaDogKG1ldGEsIHJvd3MpID0+IHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgcmV2aXplID0gbWV0YS5kYXRhLnRhZ3k/LnNwbGl0KCc7JylbMF07XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGAke3Jldml6ZX1gXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdGFnZ3JlZ2F0ZTogRGF0YS5BZ2dyZWdhdGVzLm1heChcInRhZ3lcIiksXHJcblx0XHRcdFx0XHRcdHNvcnQ6IFwidGFneVwiLFxyXG5cclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRncm91cExpc3QucHVzaChkbGVUeXB1Wm1lbnkpO1xyXG5cdFx0XHRcdFx0dGhhdC52aWV3Wm1lbnlWZXJzaW9uLnByb2Nlc3Moe1xyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiBuZXcgR29yZGljLkRhdGEuR3JvdXBpbmcoZ3JvdXBMaXN0KSxcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGF0LmdyaWRGb3JtYXRWZXJzaW9uID0gdGhpcy5jcmVhdGVHcmlkRm9ybWF0VmVyc2lvbigpO1xyXG5cdFx0XHRcdHRoYXQuX2NyZWF0ZVZlcnNpb24oKTtcdCAgIFxyXG5cclxuXHRcdFx0XHRpZiAodGhhdC50eXBWaWV3ID09IDApIHtcclxuXHRcdFx0XHRcdHRoYXQuZWxlbWVudC5maW5kKFwidGQuY2VsbC5jMFwiKS5jc3MoeyBcImJvcmRlci1ib3R0b21cIjogXCIwLjVweCBzb2xpZCAjQzZDREUwXCIgfSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQvL0tPTkVDIFZMQVNUTkkgR1RBQkxZXHJcblx0XHRcdC8vdGhhdC5kb3dubG9hZElubmVySHRtbFZlcnNpb24oJ2NoYW5nZWxvZy5odG1sJywgJ21haW4tbG9ncycsICd0ZXh0L2h0bWwnLCB0aGF0LmRhdGFFeHBvcnQsIHRoYXQuZGF0YUZvcm1hdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0VmVyc2lvbigpIHtcclxuXHRcdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblx0XHRcdHZhciBjb2x1bW5zRGVmaW5pdGlvbiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7XHJcblxyXG5cdFx0XHRjb2x1bW5zRGVmaW5pdGlvblxyXG5cdFx0XHRcdC5hZGRIdG1sQ29sdW1uKHtcclxuXHRcdFx0XHRcdG5hbWU6IFwicG9waXNcIixcclxuXHRcdFx0XHRcdGNhcHRpb246IFwiUG9waXMgem3Em255XCIsXHJcblx0XHRcdFx0XHRjZWxsVGVtcGxhdGU6IChkYXRhKSA9PiB7XHJcblxyXG5cdFx0XHRcdFx0XHQvL1DFmWVkxJtsYXQgZGVmYXVsdG7DrSB6b2JyYXplbsOtIHBvcGlzxa8gcHJvIHR5cFZpZXcgPSAxXHJcblxyXG5cdFx0XHRcdFx0XHQvL3ZhciBwb2xlVGFneVBvcGlzOiBzdHJpbmdbXSA9IFtdO1xyXG5cdFx0XHRcdFx0XHQvL2lmIChkYXRhLnRhZ3kgIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHQvL1x0cG9sZVRhZ3lQb3BpcyA9IGRhdGEudGFneS5zcGxpdChcIjtcIilcclxuXHRcdFx0XHRcdFx0Ly99XHJcblx0XHRcdFx0XHRcdC8vdmFyIHN0cmluZ1Rvb2x0aXAgPSBcIlwiXHJcblx0XHRcdFx0XHRcdC8vZm9yICh2YXIgaSA9IDA7IGkgPCBwb2xlVGFneVBvcGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdC8vXHRzdHJpbmdUb29sdGlwID0gc3RyaW5nVG9vbHRpcCArIFwiPGkgY2xhc3MgPSdnaSBnaS1sYWJlbCBnaS1yb3QxODAnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+PGI+XCIgKyBwb2xlVGFneVBvcGlzW2ldICsgXCI8L2I+IDxicj5cIlxyXG5cdFx0XHRcdFx0XHQvL31cclxuXHJcblx0XHRcdFx0XHRcdC8vdmFyIG5ld0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1lbnVSb3dXcmFwcGVyXCIpXHJcblx0XHRcdFx0XHRcdC8vdmFyIGNvbnRyb2xzID0gJC5uZXdEaXYoXCJxdWV1ZS1jb250cm9scyBzdGF0dXNiYXJcIikuYXBwZW5kVG8obmV3RWwpXHJcblx0XHRcdFx0XHRcdC8vXHQuYXBwZW5kKCQoXCI8YnV0dG9udGFneT5cIikuZ3Rvb2x0aXAoe1xyXG5cdFx0XHRcdFx0XHQvL1x0XHR0b29sdGlwOiBcIlNvdXZpc2Vqw61jw60gdGFneTogIDxicj4gXCIgKyBzdHJpbmdUb29sdGlwICsgXCJcIixcclxuXHRcdFx0XHRcdFx0Ly9cdH0pLmdsaW5rKHtcclxuXHRcdFx0XHRcdFx0Ly9cdFx0bmFtZTogXCJ0YWd5Um93XCIsXHJcblx0XHRcdFx0XHRcdC8vXHRcdHBhcmFtczoge1xyXG5cdFx0XHRcdFx0XHQvL1x0XHRcdGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG5cdFx0XHRcdFx0XHQvL1x0XHRcdFx0bmFtZTogXCJhY3RUYWd5XCIsXHJcblx0XHRcdFx0XHRcdC8vXHRcdFx0XHRydW46IGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRcdFx0XHQvL1x0XHRcdFx0XHQvL3RoYXQuY3JlYXRlTWFpbkNvbnRlbnQodGhhdC5maWVsZFRhZ3ksIHRoYXQuY250TmFtZSlcclxuXHRcdFx0XHRcdFx0Ly9cdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdC8vXHRcdFx0XHR0b29sdGlwOiBcIlRlc3RUb29sdGlwXCJcclxuXHRcdFx0XHRcdFx0Ly9cdFx0XHR9KSxcclxuXHRcdFx0XHRcdFx0Ly9cdFx0XHRpY29uOiBcImdpLWxhYmVsIGdpLXJvdDE4MCBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmFjdGl2ZVwiLCAvL2ZhLWxhYmVsIGZhLXJvdDE4MCB8Z2ktcXVlc3Rpb24gYm9sZCBnaS1iZ3cgZ2ktc3RhY2stcG9zLS1yYiAgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1xyXG5cdFx0XHRcdFx0XHQvL1x0XHRcdHZpc2libGU6IHRydWUsXHJcblx0XHRcdFx0XHRcdC8vXHRcdFx0dG9vbHRpcDogXCJUZXN0XCJcclxuXHRcdFx0XHRcdFx0Ly9cdFx0fSxcclxuXHJcblx0XHRcdFx0XHRcdC8vXHR9KSlcclxuXHRcdFx0XHRcdFx0Ly9cdC5jc3MoeyBcImNvbG9yXCI6IFwiYmxhY2tcIiwgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCIsIFwiZmxvYXRcIjogXCJpbmxpbmUtZW5kXCIsIFwidmVydGljYWwtYWxpZ25cIjogXCJib3R0b21cIiwgXCJoZWlnaHRcIjogXCIyMHB4XCIsIFwibWFyZ2luLWxlZnRcIjogXCI3cHhcIiwgXCJkaXNwbGF5XCI6IFwiaW5saW5lXCIgfSlcclxuXHRcdFx0XHRcdFx0Ly8vL25ld0VsLnN0eWxlLm1hcmdpbkxlZnQgPSBcIjEwcHhcIlxyXG5cdFx0XHRcdFx0XHQvL25ld0VsLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiXHJcblx0XHRcdFx0XHRcdC8vbmV3RWwuc3R5bGUuZGlzcGxheSA9IFwibGlzdC1pdGVtXCJcclxuXHRcdFx0XHRcdFx0Ly9uZXdFbC5zdHlsZS5tYXJnaW5MZWZ0ID0gXCIzMHB4XCJcclxuXHRcdFx0XHRcdFx0Ly8vL25ld0VsLmJlZm9yZSgpXHJcblx0XHRcdFx0XHRcdC8vaWYgKGRhdGEucHJpel92ZXJlam55ID09IDApIHtcclxuXHRcdFx0XHRcdFx0Ly9cdG5ld0VsLmNsYXNzTGlzdC5hZGQoXCJjaGFuZ2Vsb2ctaXRlbS1zdHlsZVwiKVxyXG5cdFx0XHRcdFx0XHQvL31cclxuXHRcdFx0XHRcdFx0Ly9lbHNlIHtcclxuXHRcdFx0XHRcdFx0Ly9cdG5ld0VsLmNsYXNzTGlzdC5hZGQoXCJjaGFuZ2Vsb2ctaXRlbS1zdHlsZS1wdWJsaWNcIilcclxuXHRcdFx0XHRcdFx0Ly99XHJcblx0XHRcdFx0XHRcdC8vLy9uZXdFbC50aXRsZSA9IChkYXRhLnByaXpfdmVyZWpueSA9PSAwID8gXCJKZWRuw6Egc2UgbyBuZXZlxZllam7DvSBwb3BpcyB6bcSbbnlcIiA6IFwiSmVkbsOhIHNlIG8gdmXFmWVqbsO9IHBvcGlzIHptxJtueVwiKVxyXG5cdFx0XHRcdFx0XHQvLy8vcG9rdXNcclxuXHRcdFx0XHRcdFx0Ly8vL3ZhciBpY29uTGlzdCA9ICQubmV3RGl2KFwidmlzaWJsZS1pY29uXCIpLmFwcGVuZFRvKG5ld0VsKVxyXG5cdFx0XHRcdFx0XHQvLy8vaWNvbkxpc3QuYXBwZW5kKCQoXCI8aWNvbj5cIikuZ3N0YXRpYyh7IGljb246IFwiZ2ktY2lyY2xlIHxnaS1sb2NrIGdpLXN0YWNrLXBvcy0tcmIgZ2ktYmd3XCIsIHRvb2x0aXA6IFwiSmVkbsOhIHNlIG8gbmV2xZllam7DvSBwb3BpcyB6bcSbblwiLCAvKmNhcHRpb246IFwiVGFneTogXCIqLyB9KSkuY3NzKHsgXCJjb2xvclwiOiBcImJsYWNrXCIsIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwiLCBcImZsb2F0XCI6IFwiY2VudGVyXCIsIFwidmVydGljYWwtYWxpZ25cIjogXCItd2Via2l0LWJhc2VsaW5lLW1pZGRsZVwiLCBcImhlaWdodFwiOiBcIjIwcHhcIiwgXCJtYXJnaW4tbGVmdFwiOiBcIjdweFwiLCBcImRpc3BsYXlcIjogXCJpbmxpbmVcIiB9KTtcclxuXHRcdFx0XHRcdFx0Ly8vL2tvbmVjIHBva3VzdVxyXG5cclxuXHJcblx0XHRcdFx0XHRcdC8vLy9uZXdFbC5jaGlsZHJlblswXS5zdHlsZS5tYXJnaW5Ub3AgPSBcIjdweFwiXHJcblx0XHRcdFx0XHRcdC8vLy9Lb25lYyBha2PDrVxyXG5cdFx0XHRcdFx0XHQvL3ZhciB0b0FkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ3cmFwcGVyXCIpO1xyXG5cdFx0XHRcdFx0XHQvL3ZhciBtb250aCA9IGRhdGEuZGF0X3ptZW5hLnN1YnN0cmluZyg1LCA3KVxyXG5cdFx0XHRcdFx0XHQvL3ZhciBkYXkgPSBkYXRhLmRhdF96bWVuYS5zdWJzdHJpbmcoOCwgMTApXHJcblx0XHRcdFx0XHRcdC8vdmFyIHllYXIgPSBkYXRhLmRhdF96bWVuYS5zdWJzdHJpbmcoMCwgNClcclxuXHRcdFx0XHRcdFx0Ly90b0FkZC50aXRsZSA9IFwiWnZlxZllam7Em25vOiBcIiArIGRheSArIFwiLlwiICsgbW9udGggKyBcIi5cIiArIHllYXI7IC8vICsgXCJcXG5cIiArIFwiQXV0b3IgcG9waXN1OiBcIiArIGRhdGEuem1lbmlsO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8vL1VyxI1lbsOtIHJldml6ZVxyXG5cdFx0XHRcdFx0XHQvL3ZhciB0YWd5UG9sZSA9IGRhdGEudGFneT8uc3BsaXQoXCI7XCIpO1xyXG5cdFx0XHRcdFx0XHQvL3ZhciByZXZpemVTZWFyY2ggPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHQvL3ZhciByZXZpemVTZWFyY2hGaWVsZDogc3RyaW5nW10gPSBbXTtcclxuXHRcdFx0XHRcdFx0Ly9pZiAodGFneVBvbGUgIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdC8vXHRmb3IgKHZhciBpID0gMDsgaSA8IHRhZ3lQb2xlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdC8vXHRcdGlmICh0YWd5UG9sZVtpXS5sZW5ndGggPj0gMTIpIHtcclxuXHRcdFx0XHRcdFx0Ly9cdFx0XHRyZXZpemVTZWFyY2ggPSB0YWd5UG9sZVtpXTtcclxuXHRcdFx0XHRcdFx0Ly9cdFx0XHRyZXZpemVTZWFyY2hGaWVsZC5wdXNoKHRhZ3lQb2xlW2ldKVxyXG5cdFx0XHRcdFx0XHQvL1x0XHR9XHJcblx0XHRcdFx0XHRcdC8vXHR9XHJcblx0XHRcdFx0XHRcdC8vfVxyXG5cclxuXHRcdFx0XHRcdFx0Ly9pZiAoIShyZXZpemVTZWFyY2gubGVuZ3RoID49IDEyKSAmJiB0YWd5UG9sZSAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0Ly9cdHJldml6ZVNlYXJjaCA9IHRhZ3lQb2xlWzBdO1xyXG5cdFx0XHRcdFx0XHQvL31cclxuXHRcdFx0XHRcdFx0Ly8vL0tvbmVjIHVyxI1lbsOtIHJldml6ZVxyXG5cclxuXHRcdFx0XHRcdFx0Ly8vLy8vdG9BZGQuaWQgPSByZXZpemVTZWFyY2g7XHJcblx0XHRcdFx0XHRcdC8vdmFyIHR5cFBvcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0eXAtcG9waXNcIik7XHJcblx0XHRcdFx0XHRcdC8vdmFyIGludFBvekRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnRlcm5pLXBvem5hbWthXCIpO1xyXG5cdFx0XHRcdFx0XHQvL3ZhciBpeHNLbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaXhzS21wXCIpO1xyXG5cdFx0XHRcdFx0XHQvLy8vVGFneSAtIHVsb8W+ZW7DrSBkbyBwb2xlIHRhZ8WvXHJcblx0XHRcdFx0XHRcdC8vdmFyIHBvbGVUYWd5UG9waXM6IHN0cmluZ1tdID0gW107XHJcblx0XHRcdFx0XHRcdC8vaWYgKGRhdGEudGFneSAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdC8vXHRwb2xlVGFneVBvcGlzID0gZGF0YS50YWd5LnNwbGl0KFwiO1wiKVxyXG5cdFx0XHRcdFx0XHQvL31cclxuXHJcblxyXG5cclxuXHRcdFx0XHRcdFx0Ly8vL0tvbmVjIHVsb8W+ZW7DrSBkbyBwb2xlXHJcblx0XHRcdFx0XHRcdC8vdmFyIG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwYW5lbC1wb3Bpc1wiKTtcdC8vLmNyZWF0ZUVsZW1lbnQoXCJwYW5lbC1wb3Bpcy1cIiArIER0b1tpXS5peHNfa21wICsgXCJcIilcclxuXHRcdFx0XHRcdFx0Ly90eXBQb3BEaXYuaW5uZXJIVE1MID0gZGF0YS50eXBfem1lbnlfa21wX3R4dCArIFwiIFwiO1xyXG5cdFx0XHRcdFx0XHQvL2ludFBvekRpdi5pbm5lckhUTUwgPSAoZGF0YS5wb3puYW1reSAhPSB1bmRlZmluZWQgPyB0aGF0Lk1EUHJvY2Vzc29yLnJlbmRlcihkYXRhLnBvem5hbWt5KSA6IGRhdGEucG96bmFta3kpO1xyXG5cdFx0XHRcdFx0XHQvLy8vaXhzS21wRGl2LmlubmVySFRNTCA9IChkYXRhLml4c19rbXAgIT0gdW5kZWZpbmVkID8gZGF0YS5peHNfa21wIDogXCJcIik7XHJcblx0XHRcdFx0XHRcdC8vLy90eXBQb3BEaXYuY2xhc3NOYW1lID0gKGRhdGEudHlwX3ptZW55X2ttcF90eHQgPT0gXCJPcHJhdmFcIiA/IFwiZy1zdGF0ZS1iYWNrZ3JvdW5kIGctc3RhdGUtaW5mbyBnLWJhZGdlXCIgOiBkYXRhLnR5cF96bWVueV9rbXBfdHh0ID09IFwiTm92aW5rYVwiID8gXCJnLXN0YXRlLWJhY2tncm91bmQgZy1zdGF0ZS1zdWNjZXNzIGctYmFkZ2VcIiA6IGRhdGEudHlwX3ptZW55X2ttcF90eHQgPT0gXCJabsOhbcOhIGNoeWJhXCIgPyBcImctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLXdhcm5pbmcgZy1iYWRnZVwiIDogZGF0YS50eXBfem1lbnlfa21wX3R4dCA9PSBcIlBvem7DoW1rYVwiID8gXCJnLWJhZGdlXCIgOiBkYXRhLnR5cF96bWVueV9rbXBfdHh0ID09IFwiTGVnaXNsYXRpdm7DrSB6bcSbbmFcIiA/IFwiZy1zdGF0ZS1iYWNrZ3JvdW5kIGctc3RhdGUtaW1wb3J0YW50IGctYmFkZ2VcIiA6IFwiZy1zdGF0ZS1iYWNrZ3JvdW5kIGctc3RhdGUtaW5hY3RpdmUgZy1iYWRnZVwiKVxyXG5cdFx0XHRcdFx0XHQvLy8vaWYgKGRhdGEudHlwX3ptZW55X2ttcF90eHQgPT0gXCJQb3puw6Fta2FcIikge1xyXG5cdFx0XHRcdFx0XHQvLy8vXHR0eXBQb3BEaXYuY2xhc3NMaXN0LmFkZChcImNoYW5nZWxvZy10eXBQb3puYW1rYVwiKTtcclxuXHRcdFx0XHRcdFx0Ly8vL31cclxuXHRcdFx0XHRcdFx0Ly90eXBQb3BEaXYuY2xhc3NMaXN0LmFkZChcImNoYW5nZWxvZy10eXBcIik7XHJcblx0XHRcdFx0XHRcdC8vaW50UG96RGl2LmNsYXNzTGlzdC5hZGQoXCJjaGFuZ2Vsb2ctaW50UG96XCIpO1xyXG5cdFx0XHRcdFx0XHQvL2l4c0ttcERpdi5jbGFzc0xpc3QuYWRkKFwiY2hhbmdlbG9nLWlkXCIpO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly9uZXdEaXYuY2xhc3NMaXN0LmFkZChcImNoYW5nZWxvZy1ib2R5XCIpOyAvLzE1LjQuMjAyNFxyXG5cdFx0XHRcdFx0XHQvLy8vbmV3RGl2LmlubmVySFRNTCA9IHRoYXQuTURQcm9jZXNzb3IucmVuZGVyKER0b1tpXS5wb3Bpcyk7XHJcblx0XHRcdFx0XHRcdC8vbmV3RGl2LmlubmVySFRNTCA9IChkYXRhLnBvcGlzICE9IHVuZGVmaW5lZCA/IHRoYXQuTURQcm9jZXNzb3IucmVuZGVyKGRhdGEucG9waXMucmVwbGFjZSgvPFxcLz9bXj5dKyg+fCQpL2csIFwiXCIpKSA6IGRhdGEucG9waXMucmVwbGFjZSgvPFxcLz9bXj5dKyg+fCQpL2csIFwiXCIpKTtcclxuXHRcdFx0XHRcdFx0Ly9pZiAodGhhdC50eXBWaWV3ID09IDApIHtcclxuXHRcdFx0XHRcdFx0Ly9cdHRvQWRkLmFwcGVuZENoaWxkKHR5cFBvcERpdik7XHJcblx0XHRcdFx0XHRcdC8vfVxyXG5cdFx0XHRcdFx0XHQvL3ZhciB0YWd5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhZ3lcIik7XHJcblx0XHRcdFx0XHRcdC8vLy8gICAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBWaWV3ID09IDEpIHtcdFx0Ly9TZXNrdXBlbsO9IHR5cCBwb2hsZWR1IG5hIGRhdGFcclxuXHRcdFx0XHRcdFx0Ly8vL1x0Ly9UYWd5IHogcG9sZSBkbyBiYWRndVxyXG5cdFx0XHRcdFx0XHQvLy8vXHR2YXIgdGFneURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWd5XCIpO1xyXG5cdFx0XHRcdFx0XHQvLy8vXHRmb3IgKHZhciBqID0gMTsgaiA8IHBvbGVUYWd5UG9waXMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdFx0Ly8vL1x0XHR2YXIgdGFnRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhZy1cIiArIGopO1xyXG5cdFx0XHRcdFx0XHQvLy8vXHRcdHRhZ0Rpdi5pbm5lckhUTUwgPSBwb2xlVGFneVBvcGlzW2pdICsgXCIgXCI7XHJcblx0XHRcdFx0XHRcdC8vLy9cdFx0dGFnRGl2LmNsYXNzTmFtZSA9IFwiZy1iYWRnZVwiIC8vZy1zdGF0ZS1iYWNrZ3JvdW5kIGctc3RhdGUtaW5hY3RpdmVcclxuXHRcdFx0XHRcdFx0Ly8vL1x0XHR0YWdEaXYuY2xhc3NMaXN0LmFkZChcImNoYW5nZWxvZy10YWdcIik7XHJcblx0XHRcdFx0XHRcdC8vLy9cdFx0dGFneURpdi5hcHBlbmRDaGlsZCh0YWdEaXYpO1xyXG5cdFx0XHRcdFx0XHQvLy8vXHR9XHJcblx0XHRcdFx0XHRcdC8vLy99XHJcblx0XHRcdFx0XHRcdC8vLy8gICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Ly8vL1x0Ly9UYWd5IHogcG9sZSBkbyBiYWRndVxyXG5cdFx0XHRcdFx0XHQvLy8vXHR2YXIgdGFneURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWd5XCIpO1xyXG5cdFx0XHRcdFx0XHQvLy8vXHRmb3IgKHZhciBqID0gMDsgaiA8IHBvbGVUYWd5UG9waXMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdFx0Ly8vL1x0XHR2YXIgdGFnRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhZy1cIiArIGopO1xyXG5cdFx0XHRcdFx0XHQvLy8vXHRcdHRhZ0Rpdi5pbm5lckhUTUwgPSAgcG9sZVRhZ3lQb3Bpc1tqXSArIFwiIFwiO1xyXG5cdFx0XHRcdFx0XHQvLy8vXHRcdHRhZ0Rpdi5jbGFzc05hbWUgPSBcImctYmFkZ2VcIiAvL2ctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLWluYWN0aXZlXHJcblx0XHRcdFx0XHRcdC8vLy9cdFx0dGFnRGl2LmNsYXNzTGlzdC5hZGQoXCJjaGFuZ2Vsb2ctdGFnXCIpO1xyXG5cdFx0XHRcdFx0XHQvLy8vXHRcdHRhZ3lEaXYuYXBwZW5kQ2hpbGQodGFnRGl2KTtcclxuXHRcdFx0XHRcdFx0Ly8vL1x0fVxyXG5cdFx0XHRcdFx0XHQvLy8vICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblx0XHRcdFx0XHRcdC8vdmFyIHBvcGlzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBvcGlzXCIpO1xyXG5cdFx0XHRcdFx0XHQvL3BvcGlzRGl2LmlubmVySFRNTCA9IChkYXRhLnBvcGlzICE9IHVuZGVmaW5lZCA/IHRoYXQuTURQcm9jZXNzb3IucmVuZGVyKHRoYXQuX3VuRXNjYXBlKGRhdGEucG9waXMpKSA6IHRoYXQuX3VuRXNjYXBlKGRhdGEucG9waXMpKVxyXG5cdFx0XHRcdFx0XHQvL3BvcGlzRGl2LmNsYXNzTGlzdC5hZGQoXCJjaGFuZ2Vsb2ctdGV4dFwiKTtcclxuXHRcdFx0XHRcdFx0Ly92YXIgcGxhaW5UZXh0ID0gdGhhdC5NRFByb2Nlc3Nvci5yZW5kZXIoZGF0YS5wb3BpcylcclxuXHRcdFx0XHRcdFx0Ly9wbGFpblRleHQgPSBwbGFpblRleHQucmVwbGFjZShcIjxwPlwiLCBcIlwiKVxyXG5cdFx0XHRcdFx0XHQvL3BsYWluVGV4dCA9IHBsYWluVGV4dC5yZXBsYWNlKFwiPC9wPlwiLCBcIlwiKVxyXG5cdFx0XHRcdFx0XHQvL3BsYWluVGV4dCA9IHBsYWluVGV4dC5yZXBsYWNlKFwiL25cIiwgXCJcIilcclxuXHJcblx0XHRcdFx0XHRcdC8vLy9wbGFpblRleHQgPSB1bmVzY2FwZShwbGFpblRleHQpIC8vcGxhaW5UZXh0LnJlcGxhY2UoLyZsdDsuKiZndDsvZywgXCJcIik7XHJcblx0XHRcdFx0XHRcdC8vcG9waXNEaXYuaW5uZXJIVE1MID0gcGxhaW5UZXh0XHJcblxyXG5cdFx0XHRcdFx0XHQvLy8vS29uZWMgMTcuNC4yMDI0XHJcblxyXG5cdFx0XHRcdFx0XHQvLy8vUHJpdmF0ZSAvIFB1YmxpYyBpY29uYVxyXG5cdFx0XHRcdFx0XHQvLy8vdmFyIHZpc2libGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidmlzaWJsZVwiKTtcclxuXHRcdFx0XHRcdFx0Ly8vL3ZhciB2aXNpYmxlSWNvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ2aXNpYmxlSWNvblwiKTtcclxuXHJcblx0XHRcdFx0XHRcdC8vLy92YXIgdmVyZWpueVBvcGlzID0gZGF0YS5wcml6X3ZlcmVqbnk7XHJcblx0XHRcdFx0XHRcdC8vLy92YXIgaWNvbiA9ICQubmV3RGl2KFwidmlzaWJsZS1pY29uXCIpLmFwcGVuZFRvKHZpc2libGVJY29uRGl2KVxyXG5cdFx0XHRcdFx0XHQvLy8vaWYgKHZlcmVqbnlQb3BpcyA9PSAwKSB7XHJcblx0XHRcdFx0XHRcdC8vLy9cdGljb24uYXBwZW5kKCQoXCI8aWNvbj5cIikuZ3N0YXRpYyh7IGljb246IFwiZ2ktY2lyY2xlIHxnaS1sb2NrIGdpLXN0YWNrLXBvcy0tcmIgZ2ktYmd3XCIsIHRvb2x0aXA6IFwiSmVkbsOhIHNlIG8gbmV2xZllam7DvSBwb3BpcyB6bcSbblwiLCAvKmNhcHRpb246IFwiVGFneTogXCIqLyB9KSkuY3NzKHsgXCJjb2xvclwiOiBcImJsYWNrXCIsIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwiLCBcImZsb2F0XCI6IFwiY2VudGVyXCIsIFwidmVydGljYWwtYWxpZ25cIjogXCItd2Via2l0LWJhc2VsaW5lLW1pZGRsZVwiLCBcImhlaWdodFwiOiBcIjIwcHhcIiwgXCJtYXJnaW4tbGVmdFwiOiBcIjdweFwiLCBcImRpc3BsYXlcIjogXCJpbmxpbmVcIiB9KTtcclxuXHRcdFx0XHRcdFx0Ly8vL1x0Ly90YWd5RGl2LmFwcGVuZENoaWxkKHZpc2libGVJY29uRGl2KTtcclxuXHRcdFx0XHRcdFx0Ly8vL1x0Ly9uZXdQYW5lbE9wcmF2eS5hcHBlbmQoJC5uZXdTcGFuKCkuY3NzKHsgXCJtYXJnaW4tdG9wXCI6IFwiOHB4XCIsIFwibWFyZ2luLWxlZnRcIjogXCI1cHhcIiB9KS5nc3RhdGljKHsgaWNvbjogXCJmYS1sb2NrXCIsIHRvb2x0aXA6IFwiSmVkbsOhIHNlIG8gbmV2xZllam7DvSBwb3BpcyB6bcSbblwiLCAvKmNhcHRpb246IFwiVGFneTogXCIqLyB9KS5jc3MoeyBcImNvbG9yXCI6IFwiYmxhY2tcIiwgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCIsIFwiZmxvYXRcIjogXCJjZW50ZXJcIiwgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcImJvdHRvbVwiLCBcImhlaWdodFwiOiBcIjIwcHhcIiwgXCJtYXJnaW4tbGVmdFwiOiBcIjdweFwiIH0pKVxyXG5cdFx0XHRcdFx0XHQvLy8vfVxyXG5cdFx0XHRcdFx0XHQvLy8vZWxzZSB7XHJcblx0XHRcdFx0XHRcdC8vLy9cdGljb24uYXBwZW5kKCQoXCI8aWNvbj5cIikuZ3N0YXRpYyh7IGljb246IFwiZ2ktY2lyY2xlIHxnaS11c2VycyBnaS1zdGFjay1wb3MtLXJiIGdpLWJnd1wiLCB0b29sdGlwOiBcIkplZG7DoSBzZSBvIHZlxZllam7DvSBwb3BpcyB6bcSbblwiLCAvKmNhcHRpb246IFwiVGFneTogXCIqLyB9KSkuY3NzKHsgXCJjb2xvclwiOiBcImJsYWNrXCIsIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwiLCBcImZsb2F0XCI6IFwiY2VudGVyXCIsIFwidmVydGljYWwtYWxpZ25cIjogXCItd2Via2l0LWJhc2VsaW5lLW1pZGRsZVwiLCBcImhlaWdodFwiOiBcIjIwcHhcIiwgXCJtYXJnaW4tbGVmdFwiOiBcIjdweFwiLCBcImRpc3BsYXlcIjogXCJpbmxpbmVcIiB9KTtcclxuXHRcdFx0XHRcdFx0Ly8vL1x0Ly90YWd5RGl2LmFwcGVuZENoaWxkKHZpc2libGVJY29uRGl2KTtcclxuXHRcdFx0XHRcdFx0Ly8vL31cclxuXHRcdFx0XHRcdFx0Ly8vL3Zpc2libGVEaXYuYXBwZW5kQ2hpbGQodmlzaWJsZUljb25EaXYpO1xyXG5cdFx0XHRcdFx0XHQvLy8vdGFneURpdi5hcHBlbmRDaGlsZCh2aXNpYmxlSWNvbkRpdik7XHJcblxyXG5cdFx0XHRcdFx0XHQvLy8vLy8vdGFneURpdi5pbm5lckhUTUwgPSAoZGF0YS5wb3BpcyAhPSB1bmRlZmluZWQgPyB0aGF0Lk1EUHJvY2Vzc29yLnJlbmRlcihkYXRhLnBvcGlzKSA6IGRhdGEucG9waXMpICAvLzE3LjQuMjAyNFxyXG5cdFx0XHRcdFx0XHQvL3RhZ3lEaXYuYXBwZW5kQ2hpbGQocG9waXNEaXYpO1xyXG5cclxuXHJcblx0XHRcdFx0XHRcdC8vdG9BZGQuYXBwZW5kQ2hpbGQodGFneURpdik7XHJcblxyXG5cdFx0XHRcdFx0XHQvLy8vdG9BZGQuYXBwZW5kQ2hpbGQoaW50UG96RGl2KTtcclxuXHRcdFx0XHRcdFx0Ly90b0FkZC5hcHBlbmRDaGlsZChpeHNLbXBEaXYpO1xyXG5cdFx0XHRcdFx0XHQvL25ld0VsLmFwcGVuZENoaWxkKHRvQWRkKVxyXG5cclxuXHJcblx0XHRcdFx0XHRcdC8vJChuZXdFbCkub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGV2KSB7XHJcblx0XHRcdFx0XHRcdC8vXHR2YXIgc3RyaW5nVG9vbHRpcCA9IFwiPGI+U291dmlzZWpjw60gdGFneTogPC9iPlwiXHJcblx0XHRcdFx0XHRcdC8vXHRmb3IgKHZhciBpID0gMDsgaSA8IHBvbGVUYWd5UG9waXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0Ly9cdFx0c3RyaW5nVG9vbHRpcCA9IHN0cmluZ1Rvb2x0aXAgKyBcIi9uXCIgKyBwb2xlVGFneVBvcGlzW2ldXHJcblx0XHRcdFx0XHRcdC8vXHR9XHJcblx0XHRcdFx0XHRcdC8vXHR0aGF0LnRvb2x0aXBUYWd5ID0gc3RyaW5nVG9vbHRpcDtcclxuXHRcdFx0XHRcdFx0Ly9cdC8vdGhhdC5hY3Rpb25zLmdldEFjdGlvbnMoKS5maWx0ZXIob2JqID0+IHtcclxuXHRcdFx0XHRcdFx0Ly9cdC8vXHRyZXR1cm4gb2JqLm5hbWUgPT09IFwiYWN0VGFneVwiXHJcblx0XHRcdFx0XHRcdC8vXHQvL30pWzBdLnRvb2x0aXAgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHQvL1x0Ly8kKGV2LnRhcmdldCkuY2xvc2VzdCgnZGl2JykuY3NzKHsgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IFwiI0Y4RjhGOFwiLCBcImJvcmRlci1sZWZ0XCI6IFwiNXB4IHNvbGlkXCIsIFwiYm9yZGVyLXJpZ2h0XCI6IFwiMXB4IHNvbGlkXCIsIFwiYm9yZGVyLXRvcFwiOiBcIjFweCBzb2xpZFwiLCBcImJvcmRlci1ib3R0b21cIjogXCIxcHggc29saWRcIiwgXCJib3JkZXItY29sb3JcIjogXCIjRkZGRkZGXCIgfSkgICAvLyNGQ0REQkYgLSBsaWdodCB3YXJuaW5nXHJcblx0XHRcdFx0XHRcdC8vXHRpZiAoJChldi50YXJnZXQpLmZpbmQoXCJpLmdpLmdpLWxhYmVsXCIpWzBdICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHQvL1x0XHQvLyQoZXYudGFyZ2V0KS5maW5kKFwiaS5naS5naS1sYWJlbFwiKS5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZXYpIHsgJChldi50YXJnZXQpLmZpbmQoXCJpLmdpLmdpLWxhYmVsXCIpWzBdLmNsYXNzTmFtZSA9ICdnaSBnaS1sYWJlbCBib2xkIGdpLXJvdDE4MCBmYS0yeCBnLXN0YXRlLXRleHQgZy1zdGF0ZS1hY3RpdmUganMtZ2J1dHRvbi1wcmltYXJ5LWljb24gZy1idXR0b25fX2ljb24nIH0pXHJcblx0XHRcdFx0XHRcdC8vXHRcdCQoZXYudGFyZ2V0KS5maW5kKFwiaS5naS5naS1sYWJlbFwiKVswXS5jbGFzc05hbWUgPSAnZ2kgZ2ktbGFiZWwgYm9sZCBnaS1yb3QxODAgZmEtMnggZy1zdGF0ZS10ZXh0IGctc3RhdGUtYWN0aXZlIGpzLWdidXR0b24tcHJpbWFyeS1pY29uIGctYnV0dG9uX19pY29uJ1xyXG5cdFx0XHRcdFx0XHQvL1x0fVxyXG5cdFx0XHRcdFx0XHQvL30pXHJcblx0XHRcdFx0XHRcdC8vJChuZXdFbCkub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZXYpIHtcclxuXHRcdFx0XHRcdFx0Ly9cdC8vJChldi50YXJnZXQpLmNsb3Nlc3QoJ2RpdicpLmNzcyh7IFwiYmFja2dyb3VuZC1jb2xvclwiOiBcIiNGOEY4RjhcIiwgXCJib3JkZXItbGVmdFwiOiBcIjVweCBzb2xpZFwiLCBcImJvcmRlci1yaWdodFwiOiBcIjFweCBzb2xpZFwiLCBcImJvcmRlci10b3BcIjogXCIxcHggc29saWRcIiwgXCJib3JkZXItYm90dG9tXCI6IFwiMXB4IHNvbGlkXCIsIFwiYm9yZGVyLWNvbG9yXCI6IFwiI0ZGRkZGRlwiIH0pICAgLy8jRkNEREJGIC0gbGlnaHQgd2FybmluZ1xyXG5cdFx0XHRcdFx0XHQvL1x0aWYgKCQoZXYudGFyZ2V0KS5maW5kKFwiaS5naS5naS1sYWJlbFwiKVswXSAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0Ly9cdFx0JChldi50YXJnZXQpLmZpbmQoXCJpLmdpLmdpLWxhYmVsXCIpWzBdLmNsYXNzTmFtZSA9ICdnaSBnaS1sYWJlbCBnaS1yb3QxODAgZmEtMnggZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5hY3RpdmUganMtZ2J1dHRvbi1wcmltYXJ5LWljb24gZy1idXR0b25fX2ljb24nXHJcblx0XHRcdFx0XHRcdC8vXHR9XHJcblx0XHRcdFx0XHRcdC8vfSlcclxuXHJcblx0XHRcdFx0XHRcdC8vcmV0dXJuIG5ld0VsO1xyXG5cclxuXHJcblx0XHRcdFx0XHRcdC8vUMWZZWTEm2xhdCBkZWZhdWx0bsOtIHpvYnJhemVuw60gcG9waXPFryBwcm8gdHlwVmlldyA9IDFcclxuXHJcblx0XHRcdFx0XHRcdHZhciBwb2xlVGFneVBvcGlzOiBzdHJpbmdbXSA9IFtdO1xyXG5cdFx0XHRcdFx0XHRpZiAoZGF0YS50YWd5ICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRwb2xlVGFneVBvcGlzID0gZGF0YS50YWd5LnNwbGl0KFwiO1wiKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHZhciBzdHJpbmdUb29sdGlwID0gXCJcIlxyXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHBvbGVUYWd5UG9waXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHRzdHJpbmdUb29sdGlwID0gc3RyaW5nVG9vbHRpcCArIFwiPGkgY2xhc3MgPSdnaSBnaS1sYWJlbCBnaS1yb3QxODAnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+PGI+XCIgKyBwb2xlVGFneVBvcGlzW2ldICsgXCI8L2I+IDxicj5cIlxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgbmV3RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWVudVJvd1dyYXBwZXJcIilcclxuXHRcdFx0XHRcdFx0dmFyIGNvbnRyb2xzID0gJC5uZXdEaXYoXCJxdWV1ZS1jb250cm9scyBzdGF0dXNiYXJcIikuYXBwZW5kVG8obmV3RWwpXHJcblx0XHRcdFx0XHRcdFx0LmFwcGVuZCgkKFwiPGJ1dHRvbnRhZ3k+XCIpLmd0b29sdGlwKHtcclxuXHRcdFx0XHRcdFx0XHRcdHRvb2x0aXA6IFwiU291dmlzZWrDrWPDrSB0YWd5OiAgPGJyPiBcIiArIHN0cmluZ1Rvb2x0aXAgKyBcIlwiLFxyXG5cdFx0XHRcdFx0XHRcdH0pLmdsaW5rKHtcclxuXHRcdFx0XHRcdFx0XHRcdG5hbWU6IFwidGFneVJvd1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0cGFyYW1zOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5hbWU6IFwiYWN0VGFneVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJ1bjogZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3RoYXQuY3JlYXRlTWFpbkNvbnRlbnQodGhhdC5maWVsZFRhZ3ksIHRoYXQuY250TmFtZSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRvb2x0aXA6IFwiVGVzdFRvb2x0aXBcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWNvbjogXCJnaS1sYWJlbCBnaS1yb3QxODAgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5hY3RpdmVcIiwgLy9mYS1sYWJlbCBmYS1yb3QxODAgfGdpLXF1ZXN0aW9uIGJvbGQgZ2ktYmd3IGdpLXN0YWNrLXBvcy0tcmIgIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm9cclxuXHRcdFx0XHRcdFx0XHRcdFx0dmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0dG9vbHRpcDogXCJUZXN0XCJcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0XHRcdH0pKVxyXG5cdFx0XHRcdFx0XHRcdC5jc3MoeyBcImNvbG9yXCI6IFwiYmxhY2tcIiwgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCIsIFwiZmxvYXRcIjogXCJpbmxpbmUtZW5kXCIsIFwidmVydGljYWwtYWxpZ25cIjogXCJib3R0b21cIiwgXCJoZWlnaHRcIjogXCIyMHB4XCIsIFwibWFyZ2luLWxlZnRcIjogXCI3cHhcIiwgXCJkaXNwbGF5XCI6IFwiaW5saW5lXCIgfSlcclxuXHRcdFx0XHRcdFx0Ly9uZXdFbC5zdHlsZS5tYXJnaW5MZWZ0ID0gXCIxMHB4XCJcclxuXHRcdFx0XHRcdFx0bmV3RWwuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCJcclxuXHRcdFx0XHRcdFx0bmV3RWwuc3R5bGUuZGlzcGxheSA9IFwibGlzdC1pdGVtXCJcclxuXHRcdFx0XHRcdFx0bmV3RWwuc3R5bGUubWFyZ2luTGVmdCA9IFwiMzBweFwiXHJcblx0XHRcdFx0XHRcdC8vbmV3RWwuYmVmb3JlKClcclxuXHRcdFx0XHRcdFx0aWYgKGRhdGEucHJpel92ZXJlam55ID09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRuZXdFbC5jbGFzc0xpc3QuYWRkKFwiY2hhbmdlbG9nLWl0ZW0tc3R5bGVcIilcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRuZXdFbC5jbGFzc0xpc3QuYWRkKFwiY2hhbmdlbG9nLWl0ZW0tc3R5bGUtcHVibGljXCIpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0Ly9uZXdFbC50aXRsZSA9IChkYXRhLnByaXpfdmVyZWpueSA9PSAwID8gXCJKZWRuw6Egc2UgbyBuZXZlxZllam7DvSBwb3BpcyB6bcSbbnlcIiA6IFwiSmVkbsOhIHNlIG8gdmXFmWVqbsO9IHBvcGlzIHptxJtueVwiKVxyXG5cdFx0XHRcdFx0XHQvL3Bva3VzXHJcblx0XHRcdFx0XHRcdC8vdmFyIGljb25MaXN0ID0gJC5uZXdEaXYoXCJ2aXNpYmxlLWljb25cIikuYXBwZW5kVG8obmV3RWwpXHJcblx0XHRcdFx0XHRcdC8vaWNvbkxpc3QuYXBwZW5kKCQoXCI8aWNvbj5cIikuZ3N0YXRpYyh7IGljb246IFwiZ2ktY2lyY2xlIHxnaS1sb2NrIGdpLXN0YWNrLXBvcy0tcmIgZ2ktYmd3XCIsIHRvb2x0aXA6IFwiSmVkbsOhIHNlIG8gbmV2xZllam7DvSBwb3BpcyB6bcSbblwiLCAvKmNhcHRpb246IFwiVGFneTogXCIqLyB9KSkuY3NzKHsgXCJjb2xvclwiOiBcImJsYWNrXCIsIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwiLCBcImZsb2F0XCI6IFwiY2VudGVyXCIsIFwidmVydGljYWwtYWxpZ25cIjogXCItd2Via2l0LWJhc2VsaW5lLW1pZGRsZVwiLCBcImhlaWdodFwiOiBcIjIwcHhcIiwgXCJtYXJnaW4tbGVmdFwiOiBcIjdweFwiLCBcImRpc3BsYXlcIjogXCJpbmxpbmVcIiB9KTtcclxuXHRcdFx0XHRcdFx0Ly9rb25lYyBwb2t1c3VcclxuXHJcblxyXG5cdFx0XHRcdFx0XHQvL25ld0VsLmNoaWxkcmVuWzBdLnN0eWxlLm1hcmdpblRvcCA9IFwiN3B4XCJcclxuXHRcdFx0XHRcdFx0Ly9Lb25lYyBha2PDrVxyXG5cdFx0XHRcdFx0XHR2YXIgdG9BZGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwid3JhcHBlclwiKTtcclxuXHRcdFx0XHRcdFx0dmFyIG1vbnRoID0gZGF0YS5kYXRfem1lbmEuc3Vic3RyaW5nKDUsIDcpXHJcblx0XHRcdFx0XHRcdHZhciBkYXkgPSBkYXRhLmRhdF96bWVuYS5zdWJzdHJpbmcoOCwgMTApXHJcblx0XHRcdFx0XHRcdHZhciB5ZWFyID0gZGF0YS5kYXRfem1lbmEuc3Vic3RyaW5nKDAsIDQpXHJcblx0XHRcdFx0XHRcdHRvQWRkLnRpdGxlID0gXCJadmXFmWVqbsSbbm86IFwiICsgZGF5ICsgXCIuXCIgKyBtb250aCArIFwiLlwiICsgeWVhcjsgLy8gKyBcIlxcblwiICsgXCJBdXRvciBwb3Bpc3U6IFwiICsgZGF0YS56bWVuaWw7XHJcblxyXG5cdFx0XHRcdFx0XHQvL1VyxI1lbsOtIHJldml6ZVxyXG5cdFx0XHRcdFx0XHR2YXIgdGFneVBvbGUgPSBkYXRhLnRhZ3k/LnNwbGl0KFwiO1wiKTtcclxuXHRcdFx0XHRcdFx0dmFyIHJldml6ZVNlYXJjaCA9IFwiXCI7XHJcblx0XHRcdFx0XHRcdHZhciByZXZpemVTZWFyY2hGaWVsZDogc3RyaW5nW10gPSBbXTtcclxuXHRcdFx0XHRcdFx0aWYgKHRhZ3lQb2xlICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGFneVBvbGUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICh0YWd5UG9sZVtpXS5sZW5ndGggPj0gMTIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV2aXplU2VhcmNoID0gdGFneVBvbGVbaV07XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldml6ZVNlYXJjaEZpZWxkLnB1c2godGFneVBvbGVbaV0pXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoIShyZXZpemVTZWFyY2gubGVuZ3RoID49IDEyKSAmJiB0YWd5UG9sZSAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXZpemVTZWFyY2ggPSB0YWd5UG9sZVswXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQvL0tvbmVjIHVyxI1lbsOtIHJldml6ZVxyXG5cclxuXHRcdFx0XHRcdFx0dG9BZGQuaWQgPSByZXZpemVTZWFyY2g7XHJcblx0XHRcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpXHJcblx0XHRcdFx0XHRcdHZhciB0eXBQb3BEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHlwLXBvcGlzXCIpO1xyXG5cdFx0XHRcdFx0XHR2YXIgaW50UG96RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImludGVybmktcG96bmFta2FcIik7XHJcblx0XHRcdFx0XHRcdHZhciBpeHNLbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaXhzS21wXCIpO1xyXG5cdFx0XHRcdFx0XHQvL1RhZ3kgLSB1bG/FvmVuw60gZG8gcG9sZSB0YWfFr1xyXG5cdFx0XHRcdFx0XHR2YXIgcG9sZVRhZ3lQb3Bpczogc3RyaW5nW10gPSBbXTtcclxuXHRcdFx0XHRcdFx0aWYgKGRhdGEudGFneSAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0cG9sZVRhZ3lQb3BpcyA9IGRhdGEudGFneS5zcGxpdChcIjtcIilcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdFx0XHRcdC8vS29uZWMgdWxvxb5lbsOtIGRvIHBvbGVcclxuXHRcdFx0XHRcdFx0dmFyIG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwYW5lbC1wb3Bpc1wiKTtcdC8vLmNyZWF0ZUVsZW1lbnQoXCJwYW5lbC1wb3Bpcy1cIiArIER0b1tpXS5peHNfa21wICsgXCJcIilcclxuXHRcdFx0XHRcdFx0dHlwUG9wRGl2LmlubmVySFRNTCA9IGRhdGEudHlwX3ptZW55X2ttcF90eHQgKyBcIiBcIjtcclxuXHRcdFx0XHRcdFx0aW50UG96RGl2LmlubmVySFRNTCA9IChkYXRhLnBvem5hbWt5ICE9IHVuZGVmaW5lZCA/IHRoYXQuTURQcm9jZXNzb3IucmVuZGVyKGRhdGEucG96bmFta3kpIDogZGF0YS5wb3puYW1reSk7XHJcblx0XHRcdFx0XHRcdC8vaXhzS21wRGl2LmlubmVySFRNTCA9IChkYXRhLml4c19rbXAgIT0gdW5kZWZpbmVkID8gZGF0YS5peHNfa21wIDogXCJcIik7XHJcblx0XHRcdFx0XHRcdC8vdHlwUG9wRGl2LmNsYXNzTmFtZSA9IChkYXRhLnR5cF96bWVueV9rbXBfdHh0ID09IFwiT3ByYXZhXCIgPyBcImctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLWluZm8gZy1iYWRnZVwiIDogZGF0YS50eXBfem1lbnlfa21wX3R4dCA9PSBcIk5vdmlua2FcIiA/IFwiZy1zdGF0ZS1iYWNrZ3JvdW5kIGctc3RhdGUtc3VjY2VzcyBnLWJhZGdlXCIgOiBkYXRhLnR5cF96bWVueV9rbXBfdHh0ID09IFwiWm7DoW3DoSBjaHliYVwiID8gXCJnLXN0YXRlLWJhY2tncm91bmQgZy1zdGF0ZS13YXJuaW5nIGctYmFkZ2VcIiA6IGRhdGEudHlwX3ptZW55X2ttcF90eHQgPT0gXCJQb3puw6Fta2FcIiA/IFwiZy1iYWRnZVwiIDogZGF0YS50eXBfem1lbnlfa21wX3R4dCA9PSBcIkxlZ2lzbGF0aXZuw60gem3Em25hXCIgPyBcImctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLWltcG9ydGFudCBnLWJhZGdlXCIgOiBcImctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLWluYWN0aXZlIGctYmFkZ2VcIilcclxuXHRcdFx0XHRcdFx0Ly9pZiAoZGF0YS50eXBfem1lbnlfa21wX3R4dCA9PSBcIlBvem7DoW1rYVwiKSB7XHJcblx0XHRcdFx0XHRcdC8vXHR0eXBQb3BEaXYuY2xhc3NMaXN0LmFkZChcImNoYW5nZWxvZy10eXBQb3puYW1rYVwiKTtcclxuXHRcdFx0XHRcdFx0Ly99XHJcblx0XHRcdFx0XHRcdHR5cFBvcERpdi5jbGFzc0xpc3QuYWRkKFwiY2hhbmdlbG9nLXR5cFwiKTtcclxuXHRcdFx0XHRcdFx0aW50UG96RGl2LmNsYXNzTGlzdC5hZGQoXCJjaGFuZ2Vsb2ctaW50UG96XCIpO1xyXG5cdFx0XHRcdFx0XHRpeHNLbXBEaXYuY2xhc3NMaXN0LmFkZChcImNoYW5nZWxvZy1pZFwiKTtcclxuXHJcblx0XHRcdFx0XHRcdG5ld0Rpdi5jbGFzc0xpc3QuYWRkKFwiY2hhbmdlbG9nLWJvZHlcIik7IC8vMTUuNC4yMDI0XHJcblx0XHRcdFx0XHRcdC8vbmV3RGl2LmlubmVySFRNTCA9IHRoYXQuTURQcm9jZXNzb3IucmVuZGVyKER0b1tpXS5wb3Bpcyk7XHJcblx0XHRcdFx0XHRcdG5ld0Rpdi5pbm5lckhUTUwgPSAoZGF0YS5wb3BpcyAhPSB1bmRlZmluZWQgPyB0aGF0Lk1EUHJvY2Vzc29yLnJlbmRlcihkYXRhLnBvcGlzLnJlcGxhY2UoLzxcXC8/W14+XSsoPnwkKS9nLCBcIlwiKSkgOiBkYXRhLnBvcGlzLnJlcGxhY2UoLzxcXC8/W14+XSsoPnwkKS9nLCBcIlwiKSk7XHJcblx0XHRcdFx0XHRcdGlmICh0aGF0LnR5cFZpZXcgPT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdHRvQWRkLmFwcGVuZENoaWxkKHR5cFBvcERpdik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0dmFyIHRhZ3lEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFneVwiKTtcclxuXHRcdFx0XHRcdFx0Ly8gICAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBWaWV3ID09IDEpIHtcdFx0Ly9TZXNrdXBlbsO9IHR5cCBwb2hsZWR1IG5hIGRhdGFcclxuXHRcdFx0XHRcdFx0Ly9cdC8vVGFneSB6IHBvbGUgZG8gYmFkZ3VcclxuXHRcdFx0XHRcdFx0Ly9cdHZhciB0YWd5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhZ3lcIik7IFxyXG5cdFx0XHRcdFx0XHQvL1x0Zm9yICh2YXIgaiA9IDE7IGogPCBwb2xlVGFneVBvcGlzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0XHRcdC8vXHRcdHZhciB0YWdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFnLVwiICsgaik7XHJcblx0XHRcdFx0XHRcdC8vXHRcdHRhZ0Rpdi5pbm5lckhUTUwgPSBwb2xlVGFneVBvcGlzW2pdICsgXCIgXCI7XHJcblx0XHRcdFx0XHRcdC8vXHRcdHRhZ0Rpdi5jbGFzc05hbWUgPSBcImctYmFkZ2VcIiAvL2ctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLWluYWN0aXZlIFxyXG5cdFx0XHRcdFx0XHQvL1x0XHR0YWdEaXYuY2xhc3NMaXN0LmFkZChcImNoYW5nZWxvZy10YWdcIik7XHJcblx0XHRcdFx0XHRcdC8vXHRcdHRhZ3lEaXYuYXBwZW5kQ2hpbGQodGFnRGl2KTtcclxuXHRcdFx0XHRcdFx0Ly9cdH1cclxuXHRcdFx0XHRcdFx0Ly99XHJcblx0XHRcdFx0XHRcdC8vICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcblx0XHRcdFx0XHRcdC8vXHQvL1RhZ3kgeiBwb2xlIGRvIGJhZGd1XHJcblx0XHRcdFx0XHRcdC8vXHR2YXIgdGFneURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWd5XCIpOyBcclxuXHRcdFx0XHRcdFx0Ly9cdGZvciAodmFyIGogPSAwOyBqIDwgcG9sZVRhZ3lQb3Bpcy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdFx0XHQvL1x0XHR2YXIgdGFnRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhZy1cIiArIGopO1xyXG5cdFx0XHRcdFx0XHQvL1x0XHR0YWdEaXYuaW5uZXJIVE1MID0gIHBvbGVUYWd5UG9waXNbal0gKyBcIiBcIjtcclxuXHRcdFx0XHRcdFx0Ly9cdFx0dGFnRGl2LmNsYXNzTmFtZSA9IFwiZy1iYWRnZVwiIC8vZy1zdGF0ZS1iYWNrZ3JvdW5kIGctc3RhdGUtaW5hY3RpdmUgXHJcblx0XHRcdFx0XHRcdC8vXHRcdHRhZ0Rpdi5jbGFzc0xpc3QuYWRkKFwiY2hhbmdlbG9nLXRhZ1wiKTtcclxuXHRcdFx0XHRcdFx0Ly9cdFx0dGFneURpdi5hcHBlbmRDaGlsZCh0YWdEaXYpO1xyXG5cdFx0XHRcdFx0XHQvL1x0fVxyXG5cdFx0XHRcdFx0XHQvLyAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgcG9waXNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicG9waXNcIik7XHJcblx0XHRcdFx0XHRcdHBvcGlzRGl2LmlubmVySFRNTCA9IChkYXRhLnBvcGlzICE9IHVuZGVmaW5lZCA/IHRoYXQuTURQcm9jZXNzb3IucmVuZGVyKHRoYXQuX3VuRXNjYXBlKGRhdGEucG9waXMpKSA6IHRoYXQuX3VuRXNjYXBlKGRhdGEucG9waXMpKVxyXG5cdFx0XHRcdFx0XHRwb3Bpc0Rpdi5jbGFzc0xpc3QuYWRkKFwiY2hhbmdlbG9nLXRleHRcIik7XHJcblx0XHRcdFx0XHRcdHZhciBwbGFpblRleHQgPSB0aGF0Lk1EUHJvY2Vzc29yLnJlbmRlcihkYXRhLnBvcGlzKVxyXG5cdFx0XHRcdFx0XHRwbGFpblRleHQgPSBwbGFpblRleHQucmVwbGFjZShcIjxwPlwiLCBcIlwiKVxyXG5cdFx0XHRcdFx0XHRwbGFpblRleHQgPSBwbGFpblRleHQucmVwbGFjZShcIjwvcD5cIiwgXCJcIilcclxuXHRcdFx0XHRcdFx0cGxhaW5UZXh0ID0gcGxhaW5UZXh0LnJlcGxhY2UoXCIvblwiLCBcIlwiKVxyXG5cclxuXHRcdFx0XHRcdFx0Ly9wbGFpblRleHQgPSB1bmVzY2FwZShwbGFpblRleHQpIC8vcGxhaW5UZXh0LnJlcGxhY2UoLyZsdDsuKiZndDsvZywgXCJcIik7XHJcblx0XHRcdFx0XHRcdHBvcGlzRGl2LmlubmVySFRNTCA9IHBsYWluVGV4dFxyXG5cclxuXHRcdFx0XHRcdFx0Ly9Lb25lYyAxNy40LjIwMjRcclxuXHJcblx0XHRcdFx0XHRcdC8vUHJpdmF0ZSAvIFB1YmxpYyBpY29uYVxyXG5cdFx0XHRcdFx0XHQvL3ZhciB2aXNpYmxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpc2libGVcIik7XHJcblx0XHRcdFx0XHRcdC8vdmFyIHZpc2libGVJY29uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpc2libGVJY29uXCIpO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly92YXIgdmVyZWpueVBvcGlzID0gZGF0YS5wcml6X3ZlcmVqbnk7XHJcblx0XHRcdFx0XHRcdC8vdmFyIGljb24gPSAkLm5ld0RpdihcInZpc2libGUtaWNvblwiKS5hcHBlbmRUbyh2aXNpYmxlSWNvbkRpdilcclxuXHRcdFx0XHRcdFx0Ly9pZiAodmVyZWpueVBvcGlzID09IDApIHtcclxuXHRcdFx0XHRcdFx0Ly9cdGljb24uYXBwZW5kKCQoXCI8aWNvbj5cIikuZ3N0YXRpYyh7IGljb246IFwiZ2ktY2lyY2xlIHxnaS1sb2NrIGdpLXN0YWNrLXBvcy0tcmIgZ2ktYmd3XCIsIHRvb2x0aXA6IFwiSmVkbsOhIHNlIG8gbmV2xZllam7DvSBwb3BpcyB6bcSbblwiLCAvKmNhcHRpb246IFwiVGFneTogXCIqLyB9KSkuY3NzKHsgXCJjb2xvclwiOiBcImJsYWNrXCIsIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwiLCBcImZsb2F0XCI6IFwiY2VudGVyXCIsIFwidmVydGljYWwtYWxpZ25cIjogXCItd2Via2l0LWJhc2VsaW5lLW1pZGRsZVwiLCBcImhlaWdodFwiOiBcIjIwcHhcIiwgXCJtYXJnaW4tbGVmdFwiOiBcIjdweFwiLCBcImRpc3BsYXlcIjogXCJpbmxpbmVcIiB9KTtcclxuXHRcdFx0XHRcdFx0Ly9cdC8vdGFneURpdi5hcHBlbmRDaGlsZCh2aXNpYmxlSWNvbkRpdik7XHJcblx0XHRcdFx0XHRcdC8vXHQvL25ld1BhbmVsT3ByYXZ5LmFwcGVuZCgkLm5ld1NwYW4oKS5jc3MoeyBcIm1hcmdpbi10b3BcIjogXCI4cHhcIiwgXCJtYXJnaW4tbGVmdFwiOiBcIjVweFwiIH0pLmdzdGF0aWMoeyBpY29uOiBcImZhLWxvY2tcIiwgdG9vbHRpcDogXCJKZWRuw6Egc2UgbyBuZXbFmWVqbsO9IHBvcGlzIHptxJtuXCIsIC8qY2FwdGlvbjogXCJUYWd5OiBcIiovIH0pLmNzcyh7IFwiY29sb3JcIjogXCJibGFja1wiLCBcInBvc2l0aW9uXCI6IFwicmVsYXRpdmVcIiwgXCJmbG9hdFwiOiBcImNlbnRlclwiLCBcInZlcnRpY2FsLWFsaWduXCI6IFwiYm90dG9tXCIsIFwiaGVpZ2h0XCI6IFwiMjBweFwiLCBcIm1hcmdpbi1sZWZ0XCI6IFwiN3B4XCIgfSkpXHJcblx0XHRcdFx0XHRcdC8vfVxyXG5cdFx0XHRcdFx0XHQvL2Vsc2Uge1xyXG5cdFx0XHRcdFx0XHQvL1x0aWNvbi5hcHBlbmQoJChcIjxpY29uPlwiKS5nc3RhdGljKHsgaWNvbjogXCJnaS1jaXJjbGUgfGdpLXVzZXJzIGdpLXN0YWNrLXBvcy0tcmIgZ2ktYmd3XCIsIHRvb2x0aXA6IFwiSmVkbsOhIHNlIG8gdmXFmWVqbsO9IHBvcGlzIHptxJtuXCIsIC8qY2FwdGlvbjogXCJUYWd5OiBcIiovIH0pKS5jc3MoeyBcImNvbG9yXCI6IFwiYmxhY2tcIiwgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCIsIFwiZmxvYXRcIjogXCJjZW50ZXJcIiwgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcIi13ZWJraXQtYmFzZWxpbmUtbWlkZGxlXCIsIFwiaGVpZ2h0XCI6IFwiMjBweFwiLCBcIm1hcmdpbi1sZWZ0XCI6IFwiN3B4XCIsIFwiZGlzcGxheVwiOiBcImlubGluZVwiIH0pO1xyXG5cdFx0XHRcdFx0XHQvL1x0Ly90YWd5RGl2LmFwcGVuZENoaWxkKHZpc2libGVJY29uRGl2KTtcclxuXHRcdFx0XHRcdFx0Ly99XHJcblx0XHRcdFx0XHRcdC8vdmlzaWJsZURpdi5hcHBlbmRDaGlsZCh2aXNpYmxlSWNvbkRpdik7XHJcblx0XHRcdFx0XHRcdC8vdGFneURpdi5hcHBlbmRDaGlsZCh2aXNpYmxlSWNvbkRpdik7XHJcblxyXG5cdFx0XHRcdFx0XHQvLy8vL3RhZ3lEaXYuaW5uZXJIVE1MID0gKGRhdGEucG9waXMgIT0gdW5kZWZpbmVkID8gdGhhdC5NRFByb2Nlc3Nvci5yZW5kZXIoZGF0YS5wb3BpcykgOiBkYXRhLnBvcGlzKSAgLy8xNy40LjIwMjRcclxuXHRcdFx0XHRcdFx0dGFneURpdi5hcHBlbmRDaGlsZChwb3Bpc0Rpdik7XHJcblxyXG5cclxuXHRcdFx0XHRcdFx0dG9BZGQuYXBwZW5kQ2hpbGQodGFneURpdik7XHJcblxyXG5cdFx0XHRcdFx0XHQvL3RvQWRkLmFwcGVuZENoaWxkKGludFBvekRpdik7XHJcblx0XHRcdFx0XHRcdHRvQWRkLmFwcGVuZENoaWxkKGl4c0ttcERpdik7XHJcblx0XHRcdFx0XHRcdG5ld0VsLmFwcGVuZENoaWxkKHRvQWRkKVxyXG5cclxuXHJcblx0XHRcdFx0XHRcdCQobmV3RWwpLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChldikge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBzdHJpbmdUb29sdGlwID0gXCI8Yj5Tb3V2aXNlamPDrSB0YWd5OiA8L2I+XCJcclxuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHBvbGVUYWd5UG9waXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdHN0cmluZ1Rvb2x0aXAgPSBzdHJpbmdUb29sdGlwICsgXCIvblwiICsgcG9sZVRhZ3lQb3Bpc1tpXVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR0aGF0LnRvb2x0aXBUYWd5ID0gc3RyaW5nVG9vbHRpcDtcclxuXHRcdFx0XHRcdFx0XHQvL3RoYXQuYWN0aW9ucy5nZXRBY3Rpb25zKCkuZmlsdGVyKG9iaiA9PiB7XHJcblx0XHRcdFx0XHRcdFx0Ly9cdHJldHVybiBvYmoubmFtZSA9PT0gXCJhY3RUYWd5XCJcclxuXHRcdFx0XHRcdFx0XHQvL30pWzBdLnRvb2x0aXAgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdC8vJChldi50YXJnZXQpLmNsb3Nlc3QoJ2RpdicpLmNzcyh7IFwiYmFja2dyb3VuZC1jb2xvclwiOiBcIiNGOEY4RjhcIiwgXCJib3JkZXItbGVmdFwiOiBcIjVweCBzb2xpZFwiLCBcImJvcmRlci1yaWdodFwiOiBcIjFweCBzb2xpZFwiLCBcImJvcmRlci10b3BcIjogXCIxcHggc29saWRcIiwgXCJib3JkZXItYm90dG9tXCI6IFwiMXB4IHNvbGlkXCIsIFwiYm9yZGVyLWNvbG9yXCI6IFwiI0ZGRkZGRlwiIH0pICAgLy8jRkNEREJGIC0gbGlnaHQgd2FybmluZ1xyXG5cdFx0XHRcdFx0XHRcdGlmICgkKGV2LnRhcmdldCkuZmluZChcImkuZ2kuZ2ktbGFiZWxcIilbMF0gIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyQoZXYudGFyZ2V0KS5maW5kKFwiaS5naS5naS1sYWJlbFwiKS5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZXYpIHsgJChldi50YXJnZXQpLmZpbmQoXCJpLmdpLmdpLWxhYmVsXCIpWzBdLmNsYXNzTmFtZSA9ICdnaSBnaS1sYWJlbCBib2xkIGdpLXJvdDE4MCBmYS0yeCBnLXN0YXRlLXRleHQgZy1zdGF0ZS1hY3RpdmUganMtZ2J1dHRvbi1wcmltYXJ5LWljb24gZy1idXR0b25fX2ljb24nIH0pXHJcblx0XHRcdFx0XHRcdFx0XHQkKGV2LnRhcmdldCkuZmluZChcImkuZ2kuZ2ktbGFiZWxcIilbMF0uY2xhc3NOYW1lID0gJ2dpIGdpLWxhYmVsIGJvbGQgZ2ktcm90MTgwIGZhLTJ4IGctc3RhdGUtdGV4dCBnLXN0YXRlLWFjdGl2ZSBqcy1nYnV0dG9uLXByaW1hcnktaWNvbiBnLWJ1dHRvbl9faWNvbidcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdCQobmV3RWwpLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGV2KSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8kKGV2LnRhcmdldCkuY2xvc2VzdCgnZGl2JykuY3NzKHsgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IFwiI0Y4RjhGOFwiLCBcImJvcmRlci1sZWZ0XCI6IFwiNXB4IHNvbGlkXCIsIFwiYm9yZGVyLXJpZ2h0XCI6IFwiMXB4IHNvbGlkXCIsIFwiYm9yZGVyLXRvcFwiOiBcIjFweCBzb2xpZFwiLCBcImJvcmRlci1ib3R0b21cIjogXCIxcHggc29saWRcIiwgXCJib3JkZXItY29sb3JcIjogXCIjRkZGRkZGXCIgfSkgICAvLyNGQ0REQkYgLSBsaWdodCB3YXJuaW5nXHJcblx0XHRcdFx0XHRcdFx0aWYgKCQoZXYudGFyZ2V0KS5maW5kKFwiaS5naS5naS1sYWJlbFwiKVswXSAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdCQoZXYudGFyZ2V0KS5maW5kKFwiaS5naS5naS1sYWJlbFwiKVswXS5jbGFzc05hbWUgPSAnZ2kgZ2ktbGFiZWwgZ2ktcm90MTgwIGZhLTJ4IGctc3RhdGUtdGV4dCBnLXN0YXRlLWluYWN0aXZlIGpzLWdidXR0b24tcHJpbWFyeS1pY29uIGctYnV0dG9uX19pY29uJ1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpXHJcblx0XHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9qYXZhc2NyaXB0Jyk7XHJcblx0XHRcdFx0XHRcdHNjcmlwdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnYWxlcnQoMSknKSk7XHJcblx0XHRcdFx0XHRcdG5ld0VsLmFwcGVuZENoaWxkKHNjcmlwdClcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG5ld0VsO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0cmV0dXJuIGNvbHVtbnNEZWZpbml0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogX2NyZWF0ZVxyXG5cdFx0ICogdGhpcy5vcHRpb25zLmRhdGEgamUgbmFocmF6ZW5vIHphIHRoaXMudmlld1ptZW55XHJcblx0XHQgKi9cclxuXHRcdF9jcmVhdGVWZXJzaW9uKCk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLl9jb3VudEl0ZW1WZXJzaW9uID0gMDtcclxuXHRcdFx0dGhpcy5fcmVzaXplV2lkdGhFbGVtZW50VmVyc2lvbiA9IHt9O1xyXG5cdFx0XHR0aGlzLl9yZXNpemVXaWR0aEVsZW1lbnRWZXJzaW9uLmNsYXNzID0gXCJcIjtcclxuXHRcdFx0dGhpcy5fcmVzaXplV2lkdGhFbGVtZW50VmVyc2lvbi53aWR0aCA9IDA7XHJcblx0XHRcdHRoaXMuZ3JvdXBpbmdIZWFkZXJDb2x1bW5zVmVyc2lvbiA9IHtcclxuXHRcdFx0XHRfZGVmYXVsdDoge1xyXG5cdFx0XHRcdFx0c3RydWN0dXJlTGVhZDogdHJ1ZSxcclxuXHRcdFx0XHRcdG5hbWU6IFwiX2RlZmF1bHRHcm91cEhlYWRlclwiLFxyXG5cdFx0XHRcdFx0Y2VsbFRlbXBsYXRlOiBHb3JkaWMuVGVtcGxhdGVzLmVuc3VyZVRlbXBsYXRlKFwiPGI+e0BzdHJ1Y3R1cmUuaGFzaH08L2I+IDxzcGFuIGNsYXNzPSdncm91cC1oZWFkZXItY291bnQnPih7QHN0cnVjdHVyZS5yb3dzLmxlbmd0aH0pPC9zcGFuPlwiKSxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuX3N0eWxlRWxlbWVudFZlcnNpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0XHRcdHRoaXMuX3N0eWxlRWxlbWVudFZlcnNpb24udHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRcdFx0dGhpcy5fc3R5bGVFbGVtZW50VmVyc2lvbi5pbm5lckhUTUwgPSBcIlwiO1xyXG5cdFx0XHR0aGlzLmNzc1VpZFZlcnNpb24gPSBcImd0YWJsZV9cIiArICh0aGlzLnV1aWRWZXJzaW9uKyspO1xyXG5cdFx0XHR0aGlzLl9jb2x1bW5zU2V0dGluZ1ZlcnNpb24oKTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKFwiZ3RhYmxlXCIpLmFkZENsYXNzKHRoaXMuY3NzVWlkVmVyc2lvbik7XHJcblx0XHRcdHRoaXMuX2NvbnRlbnRWZXJzaW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xyXG5cdFx0XHR0aGlzLl9jb250ZW50VmVyc2lvbi5jbGFzc05hbWUgPSBcImctdGFibGUtbWFpblZlcnNpb25cIjtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZCh0aGlzLl9jb250ZW50VmVyc2lvbik7XHJcblx0XHRcdHRoaXMubWFpbkxvZ3NQYW5lbFZlcnNpb24uYXBwZW5kKHRoaXMuX2NvbnRlbnRWZXJzaW9uKVxyXG5cdFx0XHRpZiAodGhpcy52aWV3Wm1lbnlWZXJzaW9uICE9IHVuZGVmaW5lZClcclxuXHRcdFx0XHR0aGlzLnNldERhdGFWZXJzaW9uKHRoaXMudmlld1ptZW55VmVyc2lvbik7XHJcblx0XHRcdHZhciBoZWFkVmVyc2lvbiA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdFx0aGVhZFZlcnNpb24uYXBwZW5kQ2hpbGQodGhpcy5fc3R5bGVFbGVtZW50VmVyc2lvbik7XHJcblx0XHRcdC8vdGhpcy5faW5pdFJlc2l6ZU1hbmFnZXIoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIF9jb2x1bW5zU2V0dGluZ1xyXG5cdFx0ICogdGhpcy5vcHRpb25zLmNvbHVtbnMgamUgbmFocmF6ZW5vIHphIHRoaXMuZ3JpZEZvcm1hdFxyXG5cdFx0ICovXHJcblx0XHRfY29sdW1uc1NldHRpbmdWZXJzaW9uKCk6IHZvaWQge1xyXG5cdFx0XHRjb25zdCB0aGF0ID0gdGhpcztcclxuXHRcdFx0dmFyIGNvbHNWZXJzaW9uID0gKHRoaXMuZ3JpZEZvcm1hdFZlcnNpb24gaW5zdGFuY2VvZiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KSA/IHRoaXMuZ3JpZEZvcm1hdFZlcnNpb24uY29sdW1ucy5zbGljZSgpIDogKHRoaXMuZ3JpZEZvcm1hdFZlcnNpb24gIT0gdW5kZWZpbmVkKSA/IHRoaXMuZ3JpZEZvcm1hdFZlcnNpb24gOiBbXTtcclxuXHRcdFx0dGhpcy5fY29sdW1uc1ZlcnNpb24gPSBbXTtcclxuXHRcdFx0dGhpcy5faGVhZGVyc1ZlcnNpb24gPSBbXTtcclxuXHRcdFx0dmFyIGogPSAwXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY29sc1ZlcnNpb24ubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAoY29sc1ZlcnNpb25baV0uaGlkZGVuICYmIGNvbHNWZXJzaW9uW2ldLmhpZGRlbiA9PSB0cnVlKVxyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0dmFyIGNvbHVtbiA9IGNvbHNWZXJzaW9uW2ldIGFzIGFueTtcclxuXHRcdFx0XHRpZiAoY29sdW1uLm1pbldpZHRoICYmICh0aGlzLl9yZXNpemVXaWR0aEVsZW1lbnRWZXJzaW9uLndpZHRoIDwgY29sdW1uLm1pbldpZHRoKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5fcmVzaXplV2lkdGhFbGVtZW50VmVyc2lvbi53aWR0aCA9IGNvbHVtbi5taW5XaWR0aDtcclxuXHRcdFx0XHRcdHRoaXMuX3Jlc2l6ZVdpZHRoRWxlbWVudFZlcnNpb24uY2xhc3MgPSBcIi5jXCIgKyBqO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoY29sdW1uLndpZHRoKVxyXG5cdFx0XHRcdFx0dGhpcy5fc3R5bGVFbGVtZW50VmVyc2lvbi5pbm5lckhUTUwgKz0gXCIuezB9IC5jezF9IHt7d2lkdGg6IHsyfSByZW1cXG59fVwiLmZvcm1hdCh0aGlzLmNzc1VpZFZlcnNpb24sIGosIGNvbHVtbi53aWR0aCAvIDE2KVxyXG5cdFx0XHRcdGNvbHVtbi5oaWRkZW4gPSAoY29sc1ZlcnNpb25baV0uaGlkZGVuKSA/IGNvbHNWZXJzaW9uW2ldLmhpZGRlbiA6IGZhbHNlO1xyXG5cdFx0XHRcdGNvbHVtbi5hbGlnbiA9IChjb2xzVmVyc2lvbltpXS5hbGlnbikgPyBjb2xzVmVyc2lvbltpXS5hbGlnbiA6IFwibGVmdFwiO1xyXG5cdFx0XHRcdHZhciBmb3JtYXQgPSBjb2x1bW4uZm9ybWF0UHJlc2V0ICYmIGNvbHVtbi5mb3JtYXRzICYmIGNvbHVtbi5mb3JtYXRzW2NvbHVtbi5mb3JtYXRQcmVzZXRdID8gY29sdW1uLmZvcm1hdHNbY29sdW1uLmZvcm1hdFByZXNldF0uZm9ybWF0IDogY29sdW1uLmZvcm1hdDtcclxuXHRcdFx0XHRjb2x1bW4uY2VsbFRlbXBsYXRlID0gR29yZGljLlRlbXBsYXRlcy5lbnN1cmVUZW1wbGF0ZShjb2x1bW4uY2VsbFRlbXBsYXRlICE9IG51bGwgPyBjb2x1bW4uY2VsbFRlbXBsYXRlIDogXCJ7XCIgKyAoY29sdW1uLmZpZWxkICE9IHVuZGVmaW5lZCA/IGNvbHVtbi5maWVsZCA6IGNvbHVtbi5uYW1lKSArIChmb3JtYXQgPyBcIjpcIiArIGZvcm1hdCA6IFwiXCIpICsgXCJ9XCIpO1xyXG5cdFx0XHRcdGNvbHVtbi5oZWFkZXJUZW1wbGF0ZSA9IChjb2xzVmVyc2lvbltpXS5oZWFkZXJUZW1wbGF0ZSkgPyBHb3JkaWMuVGVtcGxhdGVzLmVuc3VyZVRlbXBsYXRlKGNvbHVtbi5oZWFkZXJUZW1wbGF0ZSkgOiBudWxsO1xyXG5cdFx0XHRcdHZhciBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5WZXJzaW9uXCIpO1xyXG5cdFx0XHRcdG5hbWUuY2xhc3NMaXN0LmFkZChcImctdGFibGUtcmVzcG9uc2l2ZS1oZWFkZXJWZXJzaW9uXCIpO1xyXG5cdFx0XHRcdHZhciBjYXB0aW9uID0gY29sdW1uLmNhcHRpb24gIT0gbnVsbCA/IGNvbHVtbi5jYXB0aW9uIDogY29sc1ZlcnNpb25baV0ubmFtZSAhPSBudWxsID8gXCI8aT57MH08L2k+XCIuZm9ybWF0KGNvbHVtbi5uYW1lKSA6IFwiXCI7XHJcblx0XHRcdFx0aWYgKGNvbHVtbi5oZWFkZXJUZW1wbGF0ZSAhPSB1bmRlZmluZWQgJiYgY29sdW1uLmhlYWRlclRlbXBsYXRlICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdHZhciBjZWxsQ29udGVudCA9IGNvbHVtbi5oZWFkZXJUZW1wbGF0ZS5yZW5kZXIoY29sdW1uLCB7IGNlbGw6IG5hbWUsIGNvbHVtbjogY29sdW1uLCBjb2x1bW5JbmRleDogaSB9KTtcclxuXHRcdFx0XHRcdGlmIChjZWxsQ29udGVudCA9PSBudWxsKSBjYXB0aW9uID0gXCJcIjtcclxuXHRcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBjZWxsQ29udGVudCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgY2VsbENvbnRlbnQgPT09IFwibnVtYmVyXCIpIGNhcHRpb24gPSBjZWxsQ29udGVudC50b1N0cmluZygpO1xyXG5cdFx0XHRcdFx0ZWxzZSB7IGNhcHRpb24gPSBcIlwiOyAkKG5hbWUpLmFwcGVuZChjZWxsQ29udGVudCk7IH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bmFtZS5pbm5lckhUTUwgPSAvKlwiPGI+XCIgKyAqL2NhcHRpb24vKiArIFwiPC9iPlwiKi87XHJcblx0XHRcdFx0dGhpcy5faGVhZGVyc1ZlcnNpb24ucHVzaChuYW1lKTtcclxuXHRcdFx0XHR0aGlzLl9jb2x1bW5zVmVyc2lvbi5wdXNoKGNvbHVtbik7XHJcblx0XHRcdFx0aisrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBzZXREYXRhXHJcblx0XHQgKiBcclxuXHRcdCAqIEBwYXJhbSB7YW55fSBkYXRhXHJcblx0XHQgKi9cclxuXHRcdHNldERhdGFWZXJzaW9uKGRhdGEpOiB2b2lkIHtcclxuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdFx0dmFyIGRhdGFWaWV3OiBHb3JkaWMuRGF0YS5WaWV3O1xyXG5cdFx0XHRpZiAoIWRhdGEpIGRhdGFWaWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoKTtcclxuXHRcdFx0ZWxzZSBpZiAoZGF0YSBpbnN0YW5jZW9mIEdvcmRpYy5EYXRhLlZpZXcpIGRhdGFWaWV3ID0gZGF0YTtcclxuXHRcdFx0ZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkgZGF0YVZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhKTtcclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJndGFibGUuc2V0RGF0YSAtIG5lem5hbXkgdHlwIHZzdHVwbmljaCBkYXRcIik7XHJcblx0XHRcdFx0ZGF0YVZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldygpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLl9kYXRhVmVyc2lvbikge1xyXG5cdFx0XHRcdHRoaXMuX2RhdGFWZXJzaW9uLm9mZih0aGlzLmVsZW1lbnRbMF0uY2xhc3NOYW1lKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLl9kYXRhVmVyc2lvbiA9IGRhdGFWaWV3O1xyXG5cdFx0XHR0aGlzLl9kYXRhVmVyc2lvbi5vbihcImNoYW5nZS57MH1cIi5mb3JtYXQodGhpcy5jc3NVaWRWZXJzaW9uKSwgKG9wdHMpID0+IHtcclxuXHRcdFx0XHR0aGlzLl9yZWxvYWREYXRhVmVyc2lvbigpXHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHQvL3RoaXMuX2RhdGFWZXJzaW9uLnJlZnJlc2goKTtcclxuXHRcdFx0dGhpcy5fcmVsb2FkRGF0YVZlcnNpb24oKTtcclxuXHRcdFx0dGhpcy5lbmRPcGVyYXRpb24oKTtcclxuXHRcdH1cclxuXHJcblx0XHRfcmVsb2FkRGF0YVZlcnNpb24oKSB7XHJcblx0XHRcdGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cdFx0XHR0aGlzLl9jb250ZW50VmVyc2lvbi5pbm5lckhUTUwgPSBcIlwiOyAvL3h4eFxyXG5cdFx0XHR2YXIgcm93cyA9IHRoaXMuX2NyZWF0ZVJvd3NWZXJzaW9uKHRoaXMuX2RhdGFWZXJzaW9uKTtcclxuXHRcdFx0dmFyIHRoZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoZWFkXCIpO1xyXG5cdFx0XHR0aGVhZC5hcHBlbmRDaGlsZChyb3dzWzBdKTtcclxuXHRcdFx0dGhpcy5fY29udGVudFZlcnNpb24uYXBwZW5kQ2hpbGQodGhlYWQpO1xyXG5cdFx0XHR2YXIgdGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIik7XHJcblx0XHRcdGZvciAodmFyIGkgPSAxOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdC8vaWYgKHJvd3NbaV0uY2hpbGROb2Rlc1swXS5ub2RlTmFtZSAhPSAnVEQnKSB7XHJcblx0XHRcdFx0XHR0Ym9keS5hcHBlbmRDaGlsZChyb3dzW2ldKTtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG5cdFx0XHRcdC8vdGhpcy5fY29udGVudFZlcnNpb24uYXBwZW5kQ2hpbGQocm93c1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHRcdFx0dGhpcy5fY29udGVudFZlcnNpb24uYXBwZW5kQ2hpbGQodGJvZHkpO1xyXG5cdFx0XHQvL3RoaXMuX2FkZE1vYmlsZUhlYWRlcnMoKVxyXG5cdFx0XHR2YXIgZWwgPSB0aGlzLmVsZW1lbnQuZmluZChcIltkYXRhLXJvdy1pbmRleD0nezB9J11cIi5mb3JtYXQodGhpcy5udW1iZXJSb3dWZXJzaW9uKSlbMF07XHJcblx0XHRcdGlmIChlbCAhPSB1bmRlZmluZWQgJiYgZWwgIT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5hbmltYXRlKHsgc2Nyb2xsVG9wOiB0aGlzLmVsZW1lbnQuZmluZChcIltkYXRhLXJvdy1pbmRleD0nezB9J11cIi5mb3JtYXQodGhpcy5udW1iZXJSb3dWZXJzaW9uKSkub2Zmc2V0KCk/LnRvcCB9LCAxMDAwKVxyXG5cdFx0XHR9XHJcblx0XHRcdC8vaWYgKEdvcmRpYy5VdGlscy5XaWRnZXRFeGlzdHMoXCJnZm9ybVwiLCB0aGF0LmVtcHR5Rm9ybSkpIHtcclxuXHRcdFx0Ly9cdHRoYXQuZW1wdHlGb3JtLnJlbW92ZSgpXHJcblx0XHRcdC8vfVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogX2NyZWF0ZVJvd3NcclxuXHRcdCAqIFxyXG5cdFx0ICogQHBhcmFtIHtHb3JkaWMuRGF0YS5WaWV3fSBkYXRhXHJcblx0XHQgKiBAcmV0dXJucyB7SFRNTFRhYmxlUm93RWxlbWVudFtdfVxyXG5cdFx0ICovXHJcblx0XHRfY3JlYXRlUm93c1ZlcnNpb24oZGF0YTogR29yZGljLkRhdGEuVmlldyk6IEhUTUxUYWJsZVJvd0VsZW1lbnRbXSB7ICAgICAgICAgLy8geHh4XHJcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHRcdHZhciByZW5kZXJSb3dzID0gbmV3IEFycmF5KCk7XHJcblx0XHRcdHZhciBpdGVtQ291bnQgPSBkYXRhLmdldENvdW50KFwidmlld1wiKTtcclxuXHRcdFx0dmFyIHJvd3MgPSB0aGlzLl9hbmFseXplRGF0YVZlcnNpb24oZGF0YS5nZXRSb3dzKHRydWUpKTtcclxuXHRcdFx0dmFyIGlzTGFzdElzVmlydHVhbCA9IGZhbHNlO1xyXG5cdFx0XHR2YXIgcm93Q291bnQgPSAwO1xyXG5cdFx0XHR2YXIgbGV2ZWwgPSAwO1xyXG5cdFx0XHR2YXIgaGVhZGVyUm93SWQgPSAwO1xyXG5cdFx0XHRpZiAoaXRlbUNvdW50ID09IDApIHtcclxuXHRcdFx0XHQvLy8vdmFyIHRySGVhZGVyID0gdGhpcy5fcmVuZGVySGVhZGVyUm93KGxldmVsLCBoZWFkZXJSb3dJZCwgXCJcIik7XHJcblx0XHRcdFx0aGVhZGVyUm93SWQrKztcclxuXHRcdFx0XHQvLy8vcmVuZGVyUm93cy5wdXNoKHRySGVhZGVyKTtcclxuXHRcdFx0XHR2YXIgZW1wdHlSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcblx0XHRcdFx0dmFyIGVtcHR5VmFsdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcblx0XHRcdFx0ZW1wdHlWYWx1ZS5jbGFzc05hbWUgPSBcImd0YWJsZS1lbXB0eVwiO1xyXG5cdFx0XHRcdC8vLy9lbXB0eVZhbHVlLmNvbFNwYW4gPSB0ckhlYWRlci5jaGlsZHJlbi5sZW5ndGg7XHJcblx0XHRcdFx0ZW1wdHlWYWx1ZS5pbm5lckhUTUwgPSBcIjxpPjxiPsW9w6FkbsOpIHBvcGlzeSB6bcSbbiBrIHpvYnJhemVuw60hPC9iPjwvaT5cIjsgLy9SQyAzMzAwMDAwNSA6IMW9w6FkbsOhIGRhdGEgayB6b2JyYXplbsOtLlxyXG5cdFx0XHRcdGVtcHR5Um93LmFwcGVuZENoaWxkKGVtcHR5VmFsdWUpO1xyXG5cdFx0XHRcdHJlbmRlclJvd3MucHVzaChlbXB0eVJvdyk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly92YXIgdHJIZWFkZXIgPSB0aGlzLl9yZW5kZXJIZWFkZXJSb3cobGV2ZWwpO1xyXG5cdFx0XHQvL3JlbmRlclJvd3MucHVzaCh0ckhlYWRlcik7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbUNvdW50OyBpKyspIHtcclxuXHRcdFx0XHR2YXIgY2VsbHMgPSBuZXcgQXJyYXkoKTtcclxuXHRcdFx0XHR2YXIgdHJ1ZUNvbHVtbnMgPSBuZXcgQXJyYXkoKTtcclxuXHRcdFx0XHR2YXIgaXNHcm91cFJvdyA9IHJvd3NbaV0uX2lzVmlydHVhbCA9PT0gdHJ1ZSAmJiAhIXJvd3NbaV0uc3RydWN0dXJlO1xyXG5cdFx0XHRcdGlmIChpc0dyb3VwUm93ID09IHRydWUpIHtcclxuXHRcdFx0XHRcdGxldmVsID0gcm93c1tpXS5zdHJ1Y3R1cmUubGV2ZWw7XHJcblx0XHRcdFx0XHRpZiAoaSA9PSAwKSB7XHJcblx0XHRcdFx0XHRcdC8vLy92YXIgdHJIZWFkZXIgPSB0aGlzLl9yZW5kZXJIZWFkZXJSb3cobGV2ZWwsIGhlYWRlclJvd0lkLCBcIlwiKTtcclxuXHRcdFx0XHRcdFx0aGVhZGVyUm93SWQrKztcclxuXHRcdFx0XHRcdFx0Ly8vL3RySGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJ2aXJ0dWFsLWhlYWRlclwiKTtcclxuXHRcdFx0XHRcdFx0Ly8vL3JlbmRlclJvd3MucHVzaCh0ckhlYWRlcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmIChpc0xhc3RJc1ZpcnR1YWwgPT0gdHJ1ZSB8fCBpID09IDApIHtcclxuXHRcdFx0XHRcdFx0dmFyIHBvbVZpcnR1YWwgPSBpIC0gMTtcclxuXHRcdFx0XHRcdFx0dmFyIGhlYWRlcnMgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRpZiAocG9tVmlydHVhbCAhPSAtMSkge1xyXG5cdFx0XHRcdFx0XHRcdHdoaWxlIChyb3dzW3BvbVZpcnR1YWxdLl9pc1ZpcnR1YWwpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGhlYWRlcnMgKz0gcm93c1twb21WaXJ0dWFsXS5ncm91cElkICsgXCIgXCI7XHJcblx0XHRcdFx0XHRcdFx0XHRwb21WaXJ0dWFsLS1cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChwb21WaXJ0dWFsIDwgMClcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdC8vLy92YXIgdHJIZWFkZXIgPSB0aGlzLl9yZW5kZXJIZWFkZXJSb3cobGV2ZWwsIGhlYWRlclJvd0lkLCBoZWFkZXJzKTtcclxuXHRcdFx0XHRcdFx0Ly8vL3JlbmRlclJvd3MucHVzaCh0ckhlYWRlcik7XHJcblx0XHRcdFx0XHRcdGhlYWRlclJvd0lkKys7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5fY29sdW1uc1ZlcnNpb24ubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdGlmIChpc0dyb3VwUm93ID09IHRydWUpIHtcclxuXHRcdFx0XHRcdFx0dmFyIGdpZCA9IHJvd3NbaV0uc3RydWN0dXJlLmdyb3VwaW5nUHJvYyArIFwiI1wiICsgcm93c1tpXS5zdHJ1Y3R1cmUuZ3JvdXBpbmdUaWVyO1xyXG5cdFx0XHRcdFx0XHR2YXIgZ2QgPSB0aGlzLmdyb3VwaW5nSGVhZGVyQ29sdW1uc1ZlcnNpb25bZ2lkXSB8fCB0aGlzLmdyb3VwaW5nSGVhZGVyQ29sdW1uc1ZlcnNpb25bcm93c1tpXS5zdHJ1Y3R1cmUuZ3JvdXBpbmdQcm9jXSB8fCB0aGlzLmdyb3VwaW5nSGVhZGVyQ29sdW1uc1ZlcnNpb24uX2RlZmF1bHQ7XHJcblx0XHRcdFx0XHRcdHRydWVDb2x1bW5zLnB1c2goZ2QpO1xyXG5cdFx0XHRcdFx0XHRpc0xhc3RJc1ZpcnR1YWwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHR2YXIgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuXHRcdFx0XHRcdFx0Y2VsbHMucHVzaChjZWxsKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9IGVsc2VcclxuXHRcdFx0XHRcdFx0aXNMYXN0SXNWaXJ0dWFsID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciByb3cgPSB0aGlzLl9yZW5kZXJEYXRhUm93VmFsdWVzVmVyc2lvbigoaXNHcm91cFJvdyA9PSB0cnVlKSA/IHRydWVDb2x1bW5zIDogdGhpcy5fY29sdW1uc1ZlcnNpb24sIHJvd3NbaV0sIGksIGxldmVsLCBoZWFkZXJSb3dJZCAtIDEpOyAvLyBoZWFkZXIgcm93IC0xLCBrdsWvbGUgcMWZZWRjaG96w60gaW5rcmVtZW50YWNpXHJcblx0XHRcdFx0cm93LnNldEF0dHJpYnV0ZShcImRhdGEtcm93LWluZGV4XCIsIHJvd0NvdW50LnRvU3RyaW5nKCkpO1xyXG5cdFx0XHRcdGlmIChpc0dyb3VwUm93ID09IHRydWUpIHtcclxuXHRcdFx0XHRcdC8vdmFyIG15X2F3ZXNvbWVfc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcblx0XHRcdFx0XHQvL215X2F3ZXNvbWVfc2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdC8vXHRsZXQgZmF6ZSA9IFwiR1dBVUNSMDVcIiBcclxuXHRcdFx0XHRcdC8vfVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQvL3Jvdy5hcHBlbmRDaGlsZChteV9hd2Vzb21lX3NjcmlwdClcclxuXHRcdFx0XHRcdCQoXCJzY3JpcHRcIilcclxuXHRcdFx0XHRcdHJvdy5jbGFzc0xpc3QuYWRkKFwiZ3RhYmxlLWhlYWRlclwiKTsgLy94eHhcclxuXHRcdFx0XHRcdGlmIChyb3cuaW5uZXJUZXh0LnN1YnN0cigwLCAzKSA9PSBcIk5vdlwiKSB7XHJcblx0XHRcdFx0XHRcdC8vcm93LmNsYXNzTGlzdC5hZGQoXCJndGFibGUtaGVhZGVyTmV3RmVhdHVyZVwiKTtcclxuXHRcdFx0XHRcdFx0cm93LmNsYXNzTGlzdC5hZGQoXCJndGFibGUtaGVhZGVyUmV2aXNpb25cIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChyb3cuaW5uZXJUZXh0LnN1YnN0cigwLCAzKSA9PSBcIkxlZ1wiKSB7XHJcblx0XHRcdFx0XHRcdC8vcm93LmNsYXNzTGlzdC5hZGQoXCJndGFibGUtaGVhZGVySW1wb3J0YW50XCIpO1xyXG5cdFx0XHRcdFx0XHRyb3cuY2xhc3NMaXN0LmFkZChcImd0YWJsZS1oZWFkZXJSZXZpc2lvblwiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKHJvdy5pbm5lclRleHQuc3Vic3RyKDAsIDMpID09IFwiT3ByXCIpIHtcclxuXHRcdFx0XHRcdFx0Ly9yb3cuY2xhc3NMaXN0LmFkZChcImd0YWJsZS1oZWFkZXJQYXRjaFwiKTtcclxuXHRcdFx0XHRcdFx0cm93LmNsYXNzTGlzdC5hZGQoXCJndGFibGUtaGVhZGVyUmV2aXNpb25cIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChyb3cuaW5uZXJUZXh0LnN1YnN0cigwLCAzKSA9PSBcIlpuw6FcIikge1xyXG5cdFx0XHRcdFx0XHQvL3Jvdy5jbGFzc0xpc3QuYWRkKFwiZ3RhYmxlLWhlYWRlcldhcm5pbmdcIik7XHJcblx0XHRcdFx0XHRcdHJvdy5jbGFzc0xpc3QuYWRkKFwiZ3RhYmxlLWhlYWRlclJldmlzaW9uXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAocm93LmlubmVyVGV4dC5zdWJzdHIoMCwgMykgPT0gXCJQb3pcIikge1xyXG5cdFx0XHRcdFx0XHQvL3Jvdy5jbGFzc0xpc3QuYWRkKFwiZ3RhYmxlLWhlYWRlckdyYXlcIik7XHJcblx0XHRcdFx0XHRcdHJvdy5jbGFzc0xpc3QuYWRkKFwiZ3RhYmxlLWhlYWRlclJldmlzaW9uXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJvdy5jbGFzc0xpc3QuYWRkKFwiZ3RhYmxlLWhlYWRlclJldmlzaW9uXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly9yb3cuY2xhc3NMaXN0LmFkZChcImd0YWJsZS1oZWFkZXJDb2xvclwiKTtcclxuXHRcdFx0XHRcdC8vdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIilcclxuXHRcdFx0XHRcdC8vc2NyaXB0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2phdmFzY3JpcHQnKTtcclxuXHRcdFx0XHRcdC8vc2NyaXB0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdhbGVydCgxKScpKTtcclxuXHRcdFx0XHRcdC8vcm93LmFwcGVuZENoaWxkKHNjcmlwdClcclxuXHRcdFx0XHRcdC8vcm93LmNsYXNzTGlzdC5hZGQoXCJnLWJhZGdlXCIpO1x0XHJcblx0XHRcdFx0XHRpZiAocm93c1tpXS5zdHJ1Y3R1cmUubGV2ZWwgPT0gMClcclxuXHRcdFx0XHRcdFx0cm93LmNsYXNzTGlzdC5hZGQoXCJndGFibGUtaGVhZGVyLVwiICsgcm93c1tpXS5zdHJ1Y3R1cmUubGV2ZWwpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyb3cuY2xhc3NMaXN0LmFkZChcImd0YWJsZS1yb3dcIik7XHJcblx0XHRcdFx0XHRyb3cuaWQgPSB0aGlzLmNzc1VpZCArIFwiX1wiICsgaTtcclxuXHRcdFx0XHRcdC8vdmFyIHJvd0NsYXNzID0gdHlwZW9mIHRoaXMub3B0aW9ucy5yb3dzQ2xhc3MgPT0gXCJzdHJpbmdcIiA/IFwiIFwiICsgdGhpcy5vcHRpb25zLnJvd3NDbGFzcyA6ICQuaXNGdW5jdGlvbih0aGlzLm9wdGlvbnMucm93c0NsYXNzKSA/IFwiIFwiICsgdGhpcy5vcHRpb25zLnJvd3NDbGFzcy5jYWxsKHRoaXMuZWxlbWVudFswXSwgcm93c1tpXSwgdHJ1ZUNvbHVtbnMsIGkpIDogXCJcIjtcclxuXHRcdFx0XHRcdC8vcm93LmNsYXNzTmFtZSArPSBcIiBcIiArIHJvd0NsYXNzLnRyaW0oKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGlzR3JvdXBSb3cgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0Ly90aGlzLmVsZW1lbnQub24oXCJjbGlja1wiLCBTdHJpbmcuRm9ybWF0KFwiKltkYXRhLXJvdy1pbmRleD0nezB9J11cIiwgcm93Q291bnQpLCBmdW5jdGlvbiAoZXYpIHsgX3RoaXMuX2FjdGlvbkNsaWNrKHRoaXMpOyB9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyb3dDb3VudCsrO1xyXG5cdFx0XHRcdHJlbmRlclJvd3MucHVzaChyb3cpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiByZW5kZXJSb3dzO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogX2FjdGlvbkNsaWNrXHJcblx0XHQgKiBcclxuXHRcdCAqIEBwYXJhbSB7YW55fSBlbGVtZW50XHJcblx0XHQgKi9cclxuXHRcdF9hY3Rpb25DbGlja1ZlcnNpb24oZWxlbWVudCkge1xyXG5cdFx0XHRpZiAoZWxlbWVudC5yb3dJbmRleCAhPSAtMSkge1xyXG5cdFx0XHRcdHRoaXMubnVtYmVyUm93VmVyc2lvbiA9IHBhcnNlSW50KGVsZW1lbnQuYXR0cmlidXRlc1tcImRhdGEtcm93LWluZGV4XCJdLm5vZGVWYWx1ZSk7XHJcblx0XHRcdFx0dmFyIG1ldGEgPSB0aGlzLl9kYXRhVmVyc2lvbi5nZXRSb3dzKHRydWUsIHRoaXMubnVtYmVyUm93VmVyc2lvbiwgMSlbMF07XHJcblx0XHRcdFx0aWYgKCQuaXNGdW5jdGlvbihtZXRhLnN0cnVjdHVyZSAmJiBtZXRhLnN0cnVjdHVyZS5pbnRlcmFjdGlvbikpXHJcblx0XHRcdFx0XHRtZXRhLnN0cnVjdHVyZS5pbnRlcmFjdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBfYW5hbHl6ZURhdGFcclxuXHRcdCAqIFxyXG5cdFx0ICogQHBhcmFtIHthbnlbXX0gcm93c1xyXG5cdFx0ICogQHJldHVybnMge2FueVtdfVxyXG5cdFx0ICovXHJcblx0XHRfYW5hbHl6ZURhdGFWZXJzaW9uKHJvd3M6IGFueVtdKTogYW55W10ge1xyXG5cdFx0XHR2YXIgZ3JvdXBzSWQ6IG51bWJlcltdID0gbmV3IEFycmF5KCk7XHJcblx0XHRcdHZhciBjdXJyZW50TGV2ZWwgPSAwXHJcblx0XHRcdGdyb3Vwc0lkLnB1c2goMCwgMCk7XHJcblx0XHRcdHZhciBncm91cE5hbWVBcnJheTogc3RyaW5nW10gPSBuZXcgQXJyYXkoKTtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKHJvd3NbaV0uc3RydWN0dXJlKSB7XHJcblx0XHRcdFx0XHRpZiAocm93c1tpXS5zdHJ1Y3R1cmUubGV2ZWwgIT0gbnVsbCAmJiByb3dzW2ldLnN0cnVjdHVyZS5sZXZlbCAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHJvd3NbaV0uX2lzVmlydHVhbCA9PSB0cnVlICYmIGN1cnJlbnRMZXZlbCA9PSByb3dzW2ldLnN0cnVjdHVyZS5sZXZlbClcclxuXHRcdFx0XHRcdFx0XHRncm91cE5hbWVBcnJheS5wb3AoKTtcclxuXHRcdFx0XHRcdFx0aWYgKGN1cnJlbnRMZXZlbCA+IHJvd3NbaV0uc3RydWN0dXJlLmxldmVsKSB7XHJcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgbSA9IDA7IG0gPD0gKGN1cnJlbnRMZXZlbCAtIHJvd3NbaV0uc3RydWN0dXJlLmxldmVsKSArIDE7IG0rKylcclxuXHRcdFx0XHRcdFx0XHRcdGdyb3VwTmFtZUFycmF5LnBvcCgpO1xyXG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIGogPSByb3dzW2ldLnN0cnVjdHVyZS5sZXZlbCArIDE7IGogPCBncm91cHNJZC5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdFx0XHRcdGdyb3Vwc0lkW2pdID0gMDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50TGV2ZWwgPSByb3dzW2ldLnN0cnVjdHVyZS5sZXZlbDtcclxuXHRcdFx0XHRcdFx0Z3JvdXBzSWRbcm93c1tpXS5zdHJ1Y3R1cmUubGV2ZWxdKys7XHJcblx0XHRcdFx0XHRcdHZhciBncm91cE5hbWUgPSBcInswfV9ncm91cFwiLmZvcm1hdCh0aGlzLmNzc1VpZFZlcnNpb24pO1xyXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IGdyb3Vwc0lkLmxlbmd0aDsgaysrKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGdyb3Vwc0lkW2tdICE9IDApXHJcblx0XHRcdFx0XHRcdFx0XHRncm91cE5hbWUgKz0gXCJfezB9XCIuZm9ybWF0KGdyb3Vwc0lkW2tdKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyb3dzW2ldLmdyb3VwSWQgPSBncm91cE5hbWU7XHJcblx0XHRcdFx0XHRcdGdyb3VwTmFtZUFycmF5LnB1c2goZ3JvdXBOYW1lKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyb3dzW2ldLmhlYWRlcnMgPSBncm91cE5hbWVBcnJheS5qb2luKCcgJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiByb3dzO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogX3JlbmRlckRhdGFSb3dWYWx1ZXNcclxuXHRcdCAqIFxyXG5cdFx0ICogQHBhcmFtIHthbnl9IHRydWVDb2x1bW5zXHJcblx0XHQgKiBAcGFyYW0ge2FueX0gbWV0YVxyXG5cdFx0ICogQHBhcmFtIHthbnl9IHJvd0luZGV4XHJcblx0XHQgKiBAcGFyYW0ge2FueX0gbGV2ZWxcclxuXHRcdCAqIEBwYXJhbSB7YW55fSBoZWFkZXJSb3dJZFxyXG5cdFx0ICogQHJldHVybnMge0hUTUxUYWJsZVJvd0VsZW1lbnR9XHJcblx0XHQgKi9cclxuXHRcdF9yZW5kZXJEYXRhUm93VmFsdWVzVmVyc2lvbih0cnVlQ29sdW1ucywgbWV0YSwgcm93SW5kZXgsIGxldmVsLCBoZWFkZXJSb3dJZCk6IEhUTUxUYWJsZVJvd0VsZW1lbnQge1xyXG5cdFx0XHR2YXIgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRydWVDb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIHRjID0gdHJ1ZUNvbHVtbnNbaV07XHJcblx0XHRcdFx0dmFyIGNlbGw6IEhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50IHwgSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50O1xyXG5cdFx0XHRcdGlmICh0cnVlQ29sdW1uc1swXS5zdHJ1Y3R1cmVMZWFkKSB7XHJcblx0XHRcdFx0XHRjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpXHJcblx0XHRcdFx0XHRjZWxsLmlkID0gXCJ7MH1fY29sX3sxfVwiLmZvcm1hdCh0aGlzLmNzc1VpZFZlcnNpb24sIGkpO1xyXG5cdFx0XHRcdFx0Y2VsbC5zY29wZSA9IFwiY29sZ3JvdXBcIjtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuXHRcdFx0XHRcdGNlbGwuaGVhZGVycyA9IG1ldGEuaGVhZGVycyArIFwiIHswfV9jb2xfezF9X3syfVwiLmZvcm1hdCh0aGlzLmNzc1VpZFZlcnNpb24sIGhlYWRlclJvd0lkLCBpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGkgPT0gMClcclxuXHRcdFx0XHRcdGNlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJwYWRkaW5nLWxlZnQ6XCIgKyAoKGxldmVsICogMTIpICsgMjApICsgXCJweFwiKVxyXG5cdFx0XHRcdGlmIChtZXRhLl9pc1ZpcnR1YWwpIHtcclxuXHRcdFx0XHRcdGNlbGwuaWQgPSBtZXRhLmdyb3VwSWQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0Yy5oaWRkZW4gPT0gZmFsc2UgfHwgdGMuc3RydWN0dXJlTGVhZCA9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHRjZWxsLmNsYXNzTmFtZSA9IFwiY2VsbCBjXCIgKyBpO1xyXG5cdFx0XHRcdFx0dmFyIGNjID0gdHJ1ZUNvbHVtbnNbaV0uY3VzdG9tQ2xhc3M7XHJcblx0XHRcdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKGNjKSkgY2MgPSBjYy5jYWxsKHRoaXMuZWxlbWVudFswXSwgbWV0YSwgdHJ1ZUNvbHVtbnNbaV0sIHJvd0luZGV4KTtcclxuXHRcdFx0XHRcdGlmIChjYylcclxuXHRcdFx0XHRcdFx0Y2VsbC5jbGFzc0xpc3QuYWRkKC4uLmNjLnNwbGl0KFwiIFwiKS5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0pKTtcclxuXHJcblx0XHRcdFx0XHRpZiAodGMuYWxpZ24gPT0gXCJyaWdodFwiKSBjZWxsLmNsYXNzTGlzdC5hZGQoXCJyaWdodFwiKTtcclxuXHRcdFx0XHRcdGNlbGwuc2V0QXR0cmlidXRlKFwiZGF0YS1jb2x1bW4taW5kZXhcIiwgaS50b1N0cmluZygpKTtcclxuXHRcdFx0XHRcdHZhciBjZWxsQ29udGVudCA9IHRjLmNlbGxUZW1wbGF0ZS5yZW5kZXIobWV0YS5kYXRhLCBtZXRhLCB7IHdpZGdldDogdGhpcy5lbGVtZW50LCBjZWxsOiBjZWxsLCBjb2x1bW46IHRjLCByb3dJbmRleDogcm93SW5kZXgsIGluaXQ6IHRydWUgfSlcclxuXHRcdFx0XHRcdGlmIChjZWxsQ29udGVudCAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgY2VsbENvbnRlbnQgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGNlbGxDb250ZW50ID09PSBcIm51bWJlclwiKSBjZWxsLmlubmVySFRNTCA9IFwiPGRpdj5cIiArIGNlbGxDb250ZW50LnRvU3RyaW5nKCkgKyBcIjwvZGl2PlwiO1xyXG5cdFx0XHRcdFx0XHRlbHNlIGlmIChjZWxsQ29udGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IGNlbGxDb250ZW50IGluc3RhbmNlb2YgalF1ZXJ5KSAkKGNlbGwpLmh0bWwoY2VsbENvbnRlbnQgYXMgYW55KTtcclxuXHRcdFx0XHRcdFx0ZWxzZSBjZWxsLmlubmVySFRNTCA9IEpTT04uc3RyaW5naWZ5KGNlbGxDb250ZW50KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKG1ldGEuc3RydWN0dXJlKVxyXG5cdFx0XHRcdFx0XHRjZWxsLmlubmVyVGV4dCA9IGNlbGwuaW5uZXJUZXh0O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHRjLnN0cnVjdHVyZUxlYWQgJiYgdGMuc3RydWN0dXJlTGVhZCA9PSB0cnVlKSB7XHJcblxyXG5cclxuXHRcdFx0XHRcdGNlbGwuY29sU3BhbiA9IHRoaXMuX2NvbHVtbnNWZXJzaW9uLmxlbmd0aDtcclxuXHRcdFx0XHRcdHZhciBpY29uID0gXCJcIjtcclxuXHRcdFx0XHRcdHN3aXRjaCAobWV0YS5zdHJ1Y3R1cmUgJiYgbWV0YS5zdHJ1Y3R1cmUuc3RhdGUpIHtcclxuXHRcdFx0XHRcdFx0Y2FzZSBcImNsb3NlZFwiOiBpY29uID0gXCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI7IGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlIFwib3BlblwiOiBpY29uID0gXCJmYSBmYS1jaGV2cm9uLWRvd25cIjsgYnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR2YXIgYmFkZ2UgPSBcIlwiXHJcblx0XHRcdFx0XHRpZiAoY2VsbC5pbm5lclRleHQuc3Vic3RyKDAsIDMpID09IFwiTm92XCIpIHtcclxuXHRcdFx0XHRcdFx0YmFkZ2UgPSBcIjx0eXAtcG9waXMgY2xhc3M9J2ctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLXN1Y2Nlc3MgZy1iYWRnZSBjaGFuZ2Vsb2ctdHlwJz5Ob3Zpbmt5PC90eXAtcG9waXM+XCJcclxuXHRcdFx0XHRcdFx0Y2VsbC5zdHlsZS5jdXJzb3IgPSBcImF1dG9cIlxyXG5cdFx0XHRcdFx0XHQvL2NlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJjdXJzb3I6YXV0b1wiKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoY2VsbC5pbm5lclRleHQuc3Vic3RyKDAsIDMpID09IFwiTGVnXCIpIHtcclxuXHRcdFx0XHRcdFx0YmFkZ2UgPSBcIjx0eXAtcG9waXMgY2xhc3M9J2ctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLWltcG9ydGFudCBnLWJhZGdlIGNoYW5nZWxvZy10eXAnPkxlZ2lzbGF0aXZuw60gem3Em255PC90eXAtcG9waXM+XCJcclxuXHRcdFx0XHRcdFx0Y2VsbC5zdHlsZS5jdXJzb3IgPSBcImF1dG9cIlxyXG5cdFx0XHRcdFx0XHQvL2NlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJjdXJzb3I6YXV0b1wiKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoY2VsbC5pbm5lclRleHQuc3Vic3RyKDAsIDMpID09IFwiT3ByXCIpIHtcclxuXHRcdFx0XHRcdFx0YmFkZ2UgPSBcIjx0eXAtcG9waXMgY2xhc3M9J2ctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLWluZm8gZy1iYWRnZSBjaGFuZ2Vsb2ctdHlwJz5PcHJhdnk8L3R5cC1wb3Bpcz5cIlxyXG5cdFx0XHRcdFx0XHRjZWxsLnN0eWxlLmN1cnNvciA9IFwiYXV0b1wiXHJcblx0XHRcdFx0XHRcdC8vY2VsbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImN1cnNvcjphdXRvXCIpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChjZWxsLmlubmVyVGV4dC5zdWJzdHIoMCwgMykgPT0gXCJabsOhXCIpIHtcclxuXHRcdFx0XHRcdFx0YmFkZ2UgPSBcIjx0eXAtcG9waXMgY2xhc3M9J2ctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLXdhcm5pbmcgZy1iYWRnZSBjaGFuZ2Vsb2ctdHlwJz5absOhbcOpIGNoeWJ5PC90eXAtcG9waXM+XCJcclxuXHRcdFx0XHRcdFx0Y2VsbC5zdHlsZS5jdXJzb3IgPSBcImF1dG9cIlxyXG5cdFx0XHRcdFx0XHQvL2NlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJjdXJzb3I6YXV0b1wiKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoY2VsbC5pbm5lclRleHQuc3Vic3RyKDAsIDMpID09IFwiUG96XCIpIHtcclxuXHRcdFx0XHRcdFx0YmFkZ2UgPSBcIjx0eXAtcG9waXMgY2xhc3M9J2ctYmFkZ2UgY2hhbmdlbG9nLXR5cFBvem5hbWthSGVhZGVyJz5Qb3puw6Fta3k8L3R5cC1wb3Bpcz5cIlxyXG5cdFx0XHRcdFx0XHRjZWxsLnN0eWxlLmN1cnNvciA9IFwiYXV0b1wiXHJcblx0XHRcdFx0XHRcdC8vY2VsbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImN1cnNvcjphdXRvXCIpXHJcblx0XHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJmb250LXNpemU6bGFyZ2VyXCIpXHJcblx0XHRcdFx0XHRcdGNlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJ0ZXh0LWFsaWduOnN0YXJ0XCIpXHJcblx0XHRcdFx0XHRcdGNlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJjdXJzb3I6YXV0b1wiKVxyXG5cclxuXHRcdFx0XHRcdFx0Y2VsbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImNvbG9yOmRhcmtibHVlXCIpXHJcblx0XHRcdFx0XHRcdGNlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJwYWRkaW5nLXRvcDoxNXB4XCIpXHJcblx0XHRcdFx0XHRcdGNlbGwuaW5uZXJUZXh0ID0gY2VsbC5pbm5lclRleHQuc2xpY2UoMCwgLTQpXHJcblx0XHRcdFx0XHRcdGNlbGwuc3R5bGUuY29sb3IgPSBcIiMxRDNFOEZcIlxyXG5cdFx0XHRcdFx0XHRjZWxsLnN0eWxlLmZvbnRTaXplID0gXCJsYXJnZXJcIlxyXG5cdFx0XHRcdFx0XHRjZWxsLnN0eWxlLnBhZGRpbmdMZWZ0ID0gXCI1cHhcIlxyXG5cdFx0XHRcdFx0XHRjZWxsLnN0eWxlLnRleHRBbGlnbiA9IFwic3RhcnRcIlxyXG5cdFx0XHRcdFx0XHRjZWxsLnN0eWxlLmN1cnNvciA9IFwiYXV0b1wiXHJcblx0XHRcdFx0XHRcdGNlbGwuaWQgPSBjZWxsLmlubmVyVGV4dFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdC8vaWYgKGJhZGdlICE9IFwiXCIpIHtcclxuXHRcdFx0XHRcdFx0Ly92YXIgY291bnQgPSBjZWxsLmlubmVyVGV4dC5zdWJzdHIoY2VsbC5pbm5lclRleHQubGVuZ3RoIC0gNCwgY2VsbC5pbm5lclRleHQubGVuZ3RoKVxyXG5cdFx0XHRcdFx0XHQvL3ZhciBjb3VudGVyID0gXCI8Y291bnQgY2xhc3M9J2NoYW5nZWxvZy1jb3VudGVyJz5cIiArIGNvdW50ICsgXCI8L2NvdW50PlwiXHJcblx0XHRcdFx0XHRcdC8vY2VsbC5pbm5lclRleHQgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHQvL2NlbGwuc3R5bGUubWFyZ2luVG9wID0gXCI1cHhcIlxyXG5cdFx0XHRcdFx0XHQvLyQoYmFkZ2UpLnByZXBlbmRUbyhjZWxsKTtcclxuXHRcdFx0XHRcdFx0Ly8kKGNvdW50ZXIpLmFwcGVuZFRvKGNlbGwpO1xyXG5cdFx0XHRcdFx0XHRpZiAoYmFkZ2UgIT0gXCJcIikge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBjb3VudCA9IGNlbGwuaW5uZXJUZXh0LnN1YnN0cihjZWxsLmlubmVyVGV4dC5pbmRleE9mKFwiKFwiKSwgY2VsbC5pbm5lclRleHQubGVuZ3RoKVxyXG5cdFx0XHRcdFx0XHRcdHZhciBjb3VudGVyID0gXCI8Y291bnQgY2xhc3M9J2NoYW5nZWxvZy1jb3VudGVyJz5cIiArIGNvdW50ICsgXCI8L2NvdW50PlwiXHJcblx0XHRcdFx0XHRcdFx0Y2VsbC5pbm5lclRleHQgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdGNlbGwuc3R5bGUubWFyZ2luVG9wID0gXCI1cHhcIlxyXG5cdFx0XHRcdFx0XHRcdGNlbGwuc3R5bGUudGV4dEFsaWduID0gXCJzdGFydFwiXHJcblx0XHRcdFx0XHRcdFx0JChiYWRnZSkucHJlcGVuZFRvKGNlbGwpO1xyXG5cdFx0XHRcdFx0XHRcdC8vJChjb3VudGVyKS5hcHBlbmRUbyhjZWxsKTtcclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvL31cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQvLyQoXCI8aT48aSBjbGFzcz0nezB9JyAvPjwvaT5cIi5mb3JtYXQoaWNvbikpLnByZXBlbmRUbyhjZWxsKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcm93O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogZmlsdGVyRGF0YVxyXG5cdFx0ICogXHJcblx0XHQgKiBAcGFyYW0ge2FueX0gdmFsdWVcclxuXHRcdCAqL1xyXG5cdFx0cHJpdmF0ZSBmaWx0ZXJEYXRhKHZhbHVlKSB7XHJcblx0XHRcdGNvbnN0IHRoYXQgPSB0aGlzXHJcblx0XHRcdGlmICh2YWx1ZSA9PSBudWxsKSB7XHJcblx0XHRcdFx0XHR0aGF0LnZpZXdabWVueT8udXBkYXRlRGF0YSh0aGF0LnZpZXdabWVueU9yaWcuZ2V0RGF0YVJvd3MoKSlcclxuXHRcdFx0XHRcdHRoYXQucmVzU2VhcmNoID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0dmFyIGNvbmRpdGlvbiA9IG5ldyBSZWdFeHAodmFsdWUsICdpJyk7XHQgLy8gcmVmIFQ0MTc3OSBEb3BsbsSbbiBwYXJhbWV0ciAnaScgcHJvIGNhc2UgaW5zZW5zaXRpdmUgZmxhZyBcclxuXHRcdFx0XHR2YXIgY29uZGl0aW9uVGFnID0gbmV3IFJlZ0V4cCh2YWx1ZSk7XHJcblx0XHRcdFx0dmFyIHJlc3VsdFNlYXJjaCA9IHRoYXQudmlld1NlYXJjaFptZW55Py5nZXRSb3dzKCkuZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyAgIC8vdGhhdC52aWV3Wm1lbnlcclxuXHRcdFx0XHRcdHJldHVybiBjb25kaXRpb24udGVzdChlbC5wb3BpcyEpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR2YXIgcmVzdWx0U2VhcmNoVGFnID0gdGhhdC52aWV3U2VhcmNoWm1lbnk/LmdldFJvd3MoKS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gY29uZGl0aW9uVGFnLnRlc3QoZWwudGFneSEpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHZhciB1bmlxdWVJdGVtczoge31bXSA9IFtdO1xyXG5cdFx0XHRcdC8vU3BvamVuw60gdsO9c2xlZGvFryBobGVkw6Fuw60gKHYgcG9waXNlY2ggKyB0YWfDoWNoKVxyXG5cdFx0XHRcdGlmIChyZXN1bHRTZWFyY2hUYWcgIT0gdW5kZWZpbmVkICYmIHJlc3VsdFNlYXJjaFRhZy5sZW5ndGggIT0gMCAvKiYmIHJlc3VsdFNlYXJjaCAhPSB1bmRlZmluZWQgJiYgcmVzdWx0U2VhcmNoPy5sZW5ndGggIT0gMCovKSB7XHJcblx0XHRcdFx0XHRyZXN1bHRTZWFyY2ggPSByZXN1bHRTZWFyY2guY29uY2F0KHJlc3VsdFNlYXJjaFRhZykgLy8gPVx0cmVzdWx0U2VhcmNoVGFnICsgcmVzdWx0U2VhcmNoXHJcblx0XHRcdFx0XHQvL09kZWJyw6Fuw60gZHVwbGljaXRcclxuXHRcdFx0XHRcdHZhciB1bmlxdWVJdGVtczoge31bXSA9IFtdO1xyXG5cdFx0XHRcdFx0JC5lYWNoKHJlc3VsdFNlYXJjaCwgZnVuY3Rpb24gKGksIGVsKSB7XHJcblx0XHRcdFx0XHRcdGlmICgkLmluQXJyYXkoZWwsIHVuaXF1ZUl0ZW1zKSA9PT0gLTEpIHVuaXF1ZUl0ZW1zLnB1c2goZWwpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh1bmlxdWVJdGVtcy5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRcdFx0cmVzdWx0U2VhcmNoID0gdW5pcXVlSXRlbXM7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAocmVzdWx0U2VhcmNoICE9IHVuZGVmaW5lZCAmJiByZXN1bHRTZWFyY2gubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0XHRcdHRoYXQudmlld1ptZW55Py51cGRhdGVEYXRhKHJlc3VsdFNlYXJjaClcclxuXHRcdFx0XHRcdHRoYXQucmVzU2VhcmNoID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHR0aGF0LnZpZXdabWVueT8udXBkYXRlRGF0YShyZXN1bHRTZWFyY2gpXHJcblx0XHRcdFx0XHR0aGF0LnJlc1NlYXJjaCA9IHRydWU7XHJcblx0XHRcdFx0XHRpZiAodGhhdC52aWV3Wm1lbnkgIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdHRoYXQuX2NyZWF0ZUNoYW5nZUxvZygpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9XHJcbn0iXX0=
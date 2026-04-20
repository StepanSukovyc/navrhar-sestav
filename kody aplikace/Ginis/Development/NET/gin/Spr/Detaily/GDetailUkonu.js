"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            var gcontent = Decorators.gcontent;
            /**
             * GDetail
             *
             * @author Petr Dytrich
             */
            let GDetailUkonu = 
            //export class GDetailUkonu extends GDetailBuilderContent<UsedComponentsNew> implements IGContent {
            class GDetailUkonu extends Gordic.GDetailBuilderContent {
                constructor() {
                    super(...arguments);
                    this.gridHasRows = false;
                }
                onContentReady() {
                    var that = this;
                    this.Rezim = this.RezimDetailu;
                    if (this.Rezim == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */)
                        this.originalModel = {
                            ixp_spis: this.IxpSpis, ixp_ukon: this.IxpUkon
                        };
                    //this.loadData(this).done(function () { 
                    //    that.setRezim(that.Rezim, that);
                    //});
                    this.onContentReadyBase(that);
                    let dat_vyp = that.model.dat_vypraveni ? this.formatDatum(that.model.dat_vypraveni?.split('T')[0]) : "???";
                    let dat_dor = that.model.dat_doruceni ? this.formatDatum(that.model.dat_doruceni?.split('T')[0]) : "???";
                    let meaningV = that.model.s_vypraveno ? "positive" : "negative";
                    let meaningD = that.model.s_doruceno ? "positive" : "negative";
                    let primaryTextV = that.model.s_vypraveno ? "Vypraveno" : "Vypravení";
                    let primaryTextD = that.model.s_doruceno ? "Doručeno" : "Doručení";
                    let action = new GAction({
                        name: "kpiAction", run: function () {
                            console.log("kpiAction - doruceni/odeslani");
                            if (that.gridHasRows) {
                                that.call("ObcerstvitDoruceniOdeslani", { ixpUkon: that.model.ixp_ukon }).done(function (data) {
                                    // očekávám návrat celého Dto
                                    that.model = data;
                                    // aktualizace detailu
                                    that._reloadData();
                                });
                            }
                            else {
                                that.dialogs.alert("jres:35600003"); //RC 35600003 : Nelze občerstvit doručení/odeslání, protože úkon nemá žádné dotčené subjekty.
                            }
                        }
                    });
                    this.kpi1 = $("<div>").gbasepanel(Gordic.Prefabs.Panels.kpiValueTwoRowsTextTemplate(), {
                        data: new Gordic.Data.View([
                            {
                                name: "vypravit",
                                icon: "gi-send",
                                value: dat_vyp,
                                primaryText: primaryTextV,
                                meaning: meaningV,
                                visible: true
                            },
                            {
                                name: "dorucit",
                                icon: "gi-send",
                                value: dat_dor,
                                primaryText: primaryTextD,
                                meaning: meaningD,
                                visible: true
                            }
                        ], { key: ["name"] }),
                        disabledItems: that.model.Permissions.CanKeSchvaleni.value || that.model.Permissions.CanSchvalit.value ? ["vypravit", "dorucit"] : [""],
                        defaultAction: action,
                    });
                    that.kpi1.appendTo(this.kpi);
                    Gordic.ResizeManager.forceRefresh(this.element.get(0));
                }
                ;
                /**
                 * onDetailBuilderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderInit(builder) {
                    var that = this;
                    builder.withComponent("ukonDetail", {
                        tabGroups: {
                            tabGroupZakladni: {
                                caption: "Profil úkonu"
                            },
                        },
                        tabs: {
                            tabZakladni: {
                                tabParams: {
                                    opened: true, locked: true, group: { id: "tabGroupZakladni" }, title: "Profil",
                                },
                                init: function (tab) {
                                    that.defaultForm = tab.gform("createFrom", that.createForm());
                                    //that.findFields("adresa_ruian").gfield("getButton", "selector").gbutton("option", "params").action!.enabled(false);
                                }
                            },
                            tabkpi: {
                                tabParams: {
                                    opened: true, locked: true, group: { id: "tabGroupZakladni" }, title: "jres:25500313" //RC 25500313 : Vypravení, doručení
                                },
                                init: function (tab) {
                                    that.kpi = tab;
                                }
                            },
                            tabDotcSubjUkonu: {
                                tabParams: {
                                    opened: true, locked: false, group: { id: "tabGroupZakladni" }, title: "jres:25200123", //RC 25200123 : Dotčené subjekty
                                },
                                contentParams: GContent.createInitializer(Gordic.Spr.WebApp.GDotcSubjUkonuControl(that)),
                                init: function (tab) {
                                    that.dotcSubjUkonuTab = tab;
                                }
                            },
                        },
                        actions: {
                            //actVlozitElObraz:
                            //{
                            //    caption: "jres:25200259", //RC 25200259 : El. obraz
                            //    tooltip: "jres:25200262", //RC 25200262 : Vložit elektronický obraz
                            //    run: function (this: GAction, ev, ctx) {
                            //        console.log("VlozitElObraz");
                            //        return Gordic.Wfl.Dialogs.GPrilohyDlg(that, { Ixp: that.model.ixp_ukon }, Gin.Globals.Enums.ModOtevreni.showModalWindow);
                            //    }
                            //},
                            //actKonvertovatSchvalit:
                            //{
                            //    caption: "jres:25200260", //RC 25200260 : Konverze
                            //    icon: "fa-file-pdf-o",
                            //    tooltip: "jres:25200261", //RC 25200261 : Konvertovat hromadně do PDF / podepsat elektronickým podpisem / schválit.
                            //    run: function (this: GAction, ev, ctx) {
                            //        that.KonvertovatSchvalit();
                            //    }
                            //},
                            actVlozitDoSpisu: {
                                caption: "jres:25300023", //RC 25300023 : Vložit do spisu
                                run: function (ev, ctx) {
                                    that.VlozitDoSpisu();
                                }
                            },
                            actKeSchvaleni: {
                                caption: "jres:25300021", //RC 25300021 : Ke schválení
                                run: function (ev, ctx) {
                                    that.KeSchvaleni();
                                }
                            },
                            actSchvalit: {
                                caption: "jres:25200239", //RC 25200239 : Schválit
                                run: function (ev, ctx) {
                                    that.Schvalit();
                                }
                            },
                            actStornovat: {
                                caption: "jres:25200249", //RC 25200249 : Stornovat
                                run: function (ev, ctx) {
                                    that.Stornovat();
                                }
                            },
                            actNastavitLhutu: {
                                caption: "jres:25200251", //RC 25200251 : Lhůta
                                run: function (ev, ctx) {
                                    that.NastavitLhutu();
                                }
                            },
                            actNabytPravniMoc: {
                                caption: "jres:25200250", //RC 25200250 : Právní moc
                                run: function (ev, ctx) {
                                    that.NabytPravniMoc();
                                }
                            },
                            actDetailDokumentu: {
                                caption: "jres:25200255", //RC 25200255 : Dokument
                                run: function (ev, ctx) {
                                    that.DetailDokumentu();
                                }
                            },
                            actPokyny: {
                                caption: "jres:25200254", //RC 25200254 : Pokyny
                                visible: false, // bylo zakazano ve starem LK
                                run: function (ev, ctx) {
                                    that.Pokyny();
                                }
                            },
                            actVzor: {
                                caption: "jres:25200252", //RC 25200252 : Vzor
                                visible: false, // Jarda: zatim nedelat
                                run: function (ev, ctx) {
                                    that.Vzor();
                                }
                            },
                            actPoznamka: {
                                caption: "jres:25200253", //RC 25200253 : Poznámka
                                visible: false, // Jarda: zatim nedelat
                                run: function (ev, ctx) {
                                    that.Poznamka();
                                }
                            },
                            actWflCinnostiZadostOPodpis: {
                                icon: ["gi-epk", "fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                                caption: "jres:25500315", //RC 25500315 : Vložit do podpisové knihy
                                run: function () {
                                    that.ZadostOPodpis();
                                },
                            },
                            actWflCinnostiSchvalovaciProces: {
                                icon: "gi-schvyr",
                                caption: "jres:25300005", //RC 25300005 : Schvalovací proces
                                run: function () {
                                    that.SchvalovaciProces();
                                },
                            },
                            //actOtevreniElektronickehoObrazu:
                            //{
                            //    caption: "OtevreniElektronickehoObrazu",
                            //    run: function (this: GAction, ev, ctx) {
                            //        that.OtevreniElektronickehoObrazu();
                            //    }
                            //},
                            actTiskSablony: GAction.createPrintAction({
                                name: "actTiskSablony",
                                caption: "Generovat/Tisk", //RC 25200256 : Tisk
                                tema: "spr_ptm_ukn",
                                customDto: function () {
                                    return that.GetCustomDtoProTisk();
                                },
                                serverRestrictionAlfMethod: "Gordic.Spr.WebApp.GDetailUkonu:GetRestrictionAlf",
                                serverParameterMethod: "Gordic.Spr.WebApp.GDetailUkonu:ServerParameterMethod",
                                reportFinished: function () {
                                    if (that.model.ElektronickyObrazTitle == null || that.model.ElektronickyObrazTitle == "")
                                        that._reloadData();
                                },
                                dialogOpening: function (action) {
                                    var def = $.Deferred();
                                    if (that.model.ElektronickyObrazTitle != null && that.model.ElektronickyObrazTitle != "") {
                                        that.dialogs.messageBox("jres:25200174", "jres:25200273", GDlg.mbbYesNoCancel, GDlg.mbiQuestion) //RC 25200273 : Chcete otevřít dříve uložený dokument z úložiště?
                                            .on("yes", function () {
                                            if (that.Param_SprRadRegen == 1) {
                                                that.dialogs.messageBox("jres:25200174", "jres:25200274", GDlg.mbbYesNoCancel, GDlg.mbiQuestion) //RC 25200274 : Chcete znovu vygenerovat datové položky do formuláře?
                                                    .on("yes", function () {
                                                    // TOTO JE POTREBA, ALE SSL TO ZATIM NEUMI
                                                    //that.call("PregenerovatElektronickyObraz", {})
                                                    //    .done(function (errMes) {
                                                    //        if (errMes == "") {
                                                    //            console.log("el obraz pregenerovan");
                                                    //            def.reject();
                                                    //        }
                                                    //        else
                                                    //            that.dialogs.alert(errMes).on("close", function () {
                                                    //                def.reject();
                                                    //            });
                                                    //    });
                                                    // TOTO TU JE DOCASNE, NEZ BUDE HOTOVE PREGENEROVANI
                                                    that.OtevreniElektronickehoObrazu();
                                                    def.reject();
                                                })
                                                    .on("no", function () {
                                                    that.OtevreniElektronickehoObrazu();
                                                    def.reject();
                                                });
                                            }
                                            else {
                                                that.OtevreniElektronickehoObrazu();
                                                def.reject();
                                            }
                                        })
                                            .on("no", function () {
                                            that.dialogs.messageBox("jres:25200174", "jres:25200275", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25200275 : Původní dokument bude po uložení nově vygenerovaného dokumentu přepsán.;;Chcete opravdu pokračovat?
                                                .on("yes", function () {
                                                def.resolve();
                                            })
                                                .on("no", function () {
                                                def.reject();
                                            });
                                        })
                                            .on("cancel", function () {
                                            def.reject();
                                        });
                                    }
                                    else {
                                        def.resolve();
                                    }
                                    return def.promise();
                                }
                            }),
                            actOdeslat: {
                                caption: "jres:25200258", //RC 25200258 : Odeslání
                                run: function (ev, ctx) {
                                    that.Odeslat();
                                }
                            },
                            actPrilohy: {
                                caption: "jres:25200383", //RC 25200383 : Přílohy
                                tooltip: "jres:25200384", //RC 25200384 : Přílohy
                                run: function (ev, ctx) {
                                    console.log("Prilohy");
                                    return Gordic.Wfl.Dialogs.GPrilohyDlg(that, { Ixp: that.model.ixp_ukon }, Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow);
                                }
                            },
                            actKonverzePdf: {
                                caption: "jres:25200441", //RC 25200441 : Konvertovat/podepsat
                                tooltip: "jres:25200442", //RC 25200442 : Konvertovat hromadně do PDF / podepsat elektronickým podpisem
                                icon: "fa-file-pdf-o",
                                run: function (ev, ctx) {
                                    that.KonverzePdf();
                                }
                            },
                        },
                        menuBar: [
                            {
                                id: "menuUkon", caption: "jres:25200382", type: "static", after: "akce", children: [
                                    //{ id: "menuVlozitElObraz", action: "actVlozitElObraz", favorite: true },
                                    //{ id: "menuKonvertovatSchvalit", action: "actKonvertovatSchvalit", favorite: true },
                                    { id: "menuVlozitDoSpisu", action: "actVlozitDoSpisu", favorite: false },
                                    { id: "menuKeSchvaleni", action: "actKeSchvaleni", favorite: false },
                                    { id: "menuSchvalit", action: "actSchvalit", favorite: false },
                                    { id: "menuOdeslat", action: "actOdeslat", favorite: false },
                                    { id: "menuStornovat", action: "actStornovat", favorite: false },
                                    { id: "menuNastavitLhutu", action: "actNastavitLhutu", favorite: false },
                                    { id: "menuNabytPravniMoc", action: "actNabytPravniMoc", favorite: false },
                                    { id: "menuPokyny", action: "actPokyny", favorite: false },
                                    { id: "menuVzor", action: "actVzor", favorite: false },
                                    { id: "menuPoznamka", action: "actPoznamka", favorite: false },
                                    { id: "menuTiskSablony", action: "actTiskSablony", favorite: false },
                                    { id: "menuDetailDokumentu", action: "actDetailDokumentu", favorite: false },
                                    { id: "menuPrilohy", action: "actPrilohy", favorite: false },
                                    { id: "menuKonverzePdf", action: "actKonverzePdf", favorite: true },
                                    { id: "menuWflCinnostiSchvalovaciProces", action: "actWflCinnostiSchvalovaciProces", favorite: true },
                                    { id: "menuWflCinnosti", action: "actWflCinnostiZadostOPodpis", favorite: true },
                                    //{ id: "menuOtevreniElektronickehoObrazu", action: "actOtevreniElektronickehoObrazu", favorite: true },
                                ]
                            }
                        ],
                        //kpis: [
                        //    { //observable object bude přidán do this.kpis.kpiOne 
                        //        name: "kpiOne",
                        //        chartType: "liquid",
                        //        data: 0,
                        //        value: 0,
                        //        unit: "%",
                        //        title: "KPI 1",
                        //        text: "Text pro první kpi.",
                        //        meaning: "neutral",
                        //        showTextIcon: false,
                        //    },
                        // ]
                        //headerForm: this.createForm()
                    }, true);
                }
                ;
                /**
                 * Funkce detailbuilderu, spuštěná po merge komponent
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderBuild(builder) {
                    var that = this;
                    this.showRestore = false;
                    var _afterDelete = function (content) {
                        content.tryClose();
                    };
                    if (that.RezimDetailu == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */) {
                        that.listControls_setup({
                            rowToDto: function (gridState) {
                                var gTabManager = that.find(".gtabmanager");
                                var active;
                                if (gTabManager != null && gTabManager != undefined)
                                    active = gTabManager.gtabmanager("getActive");
                                return { Rezim: 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */, IxpUkon: gridState.currentRow.data.ixp_ukon, selectedTabGroup: active };
                            },
                            nextItemTemplate: "jres:25200386", //RC 25200386 : Následující záznam<br>PID: {ixp_ukon}
                            prevItemTemplate: "jres:25200387" //RC 25200387 : Předchozí záznam<br>PID: {ixp_ukon}
                        });
                    }
                    // pro akci EPK // componentDto.LzeSchvalovaciProces
                    // actWflCinnostiZadostOPodpis enabled: l_bActionEnabled && componentDto.LzePridatZadostOPodpis, visible: isNotTS_S_D
                    // actWflCinnostiSchvalovaciProces enabled: l_bActionEnabled && componentDto.LzeSchvalovaciProces
                    var l_bActionEnabled = (that.RezimDetailu === 3 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace */) ? false : true;
                    this.afterDelete = _afterDelete;
                    this.enableActions = function (enable) {
                        //that.actions.actVlozitElObraz!.enabled(!enable && that.model.Permissions.CanUpdate.value);
                        //that.actions.actKonvertovatSchvalit!.enabled(!enable);
                        that.actions.actVlozitDoSpisu.enabled(!enable && that.model.Permissions.CanVlozitDoSpisu.value);
                        that.actions.actKeSchvaleni.enabled(!enable && that.model.Permissions.CanKeSchvaleni.value);
                        that.actions.actSchvalit.enabled(!enable && that.model.Permissions.CanSchvalit.value);
                        that.actions.actStornovat.enabled(!enable && that.model.Permissions.CanStornovat.value);
                        that.actions.actNastavitLhutu.enabled(!enable && that.model.Permissions.CanNastavitLhutu.value);
                        that.actions.actNabytPravniMoc.enabled(!enable && that.model.Permissions.CanNabytPravniMoc.value);
                        that.actions.actDetailDokumentu.enabled(!enable && that.model.Permissions.CanDetailDokumentu.value);
                        that.actions.actDetailDokumentu.visible(that.model.Permissions.CanDetailDokumentu.value);
                        //that.actions.actDetailDokumentu!.visible(!enable && that.model.Permissions.CanDetailDokumentu.value);
                        that.actions.actPokyny.enabled(!enable && that.model.Permissions.CanPokyny.value);
                        that.actions.actVzor.enabled(!enable && that.model.Permissions.CanVzor.value);
                        that.actions.actPoznamka.enabled(!enable && that.model.Permissions.CanPoznamka.value);
                        that.actions.actTiskSablony.enabled(!enable && that.model.Permissions.CanTiskSablony.value);
                        that.actions.actOdeslat.enabled(!enable && that.model.Permissions.CanOdeslat.value);
                        that.actions.actPrilohy.enabled(!enable);
                        that.actions.actWflCinnostiZadostOPodpis.enabled(!enable && l_bActionEnabled && that.model.Permissions.LzePridatZadostOPodpis.value);
                        that.actions.actWflCinnostiSchvalovaciProces.enabled(!enable && l_bActionEnabled && that.model.Permissions.LzeZaraditDoSchvalovacihoProcesu.value);
                        that.changeAktivitaComponentEnableActions(enable);
                        $.content(that.dotcSubjUkonuTab).enableActions();
                    };
                    this.afterLoadData = function (content) {
                        var prom = $.Deferred();
                        var that = this;
                        var readOnly = that.RezimDetailu == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */;
                        var gTabManager = that.find(".gtabmanager");
                        if (!readOnly)
                            gTabManager.gtabmanager("setActive", "tabGroupZakladni");
                        gTabManager.gtabmanager("visibleGroup", "tabGroupDotcSubjUkonu", readOnly);
                        this.afterLoadDataForTab(this.dotcSubjUkonuTab);
                        return prom;
                    };
                }
                afterLoadDataForTab(tabControl) {
                    if (tabControl) {
                        const tabCnt = $.content(tabControl);
                        if (tabCnt != null && typeof (tabCnt.reloadData) === "function") {
                            tabCnt.reloadData().done(() => {
                                var gridCount = $.content(this.dotcSubjUkonuTab).grid.ggrid("getView").getCount();
                                if (gridCount > 0)
                                    this.gridHasRows = true;
                            });
                        }
                    }
                }
                createForm() {
                    var that = this;
                    console.log("createForm(): ");
                    var readOnly = that.RezimDetailu == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */;
                    var neniNovy = this.Rezim != 2 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.New */;
                    var form = new Gordic.Forms.Form({ tabLabel: "jres:25200401", opened: true }) //RC 25200401 : Detail úkonu
                        .addSection({ customClass: "w-12", layoutDescriptor: "L-2-10-0, M-4-8-0, S-12-12-0" })
                        .addRow("jres:25200025") //RC 25200025 : Ident.
                        .addField("gstringbox", "w-4", { name: "ixp_ukon", disabled: true })
                        .addField("gstringbox", "w-8", {
                        name: "ElektronickyObrazTitle", disabled: true,
                        buttons: [{
                                requireEdit: false,
                                action: new GAction({
                                    name: "actOtevritHlavniPrilohu",
                                    icon: "gi-detail",
                                    captionVisible: GAction.captionVisibility.never,
                                    tooltip: "jres:25200448", //RC 25200448 : Otevřít hlavní přílohu
                                    enabled: readOnly && that.model.ElektronickyObrazTitle,
                                    run: function (ev, obj) {
                                        that.OtevreniElektronickehoObrazu();
                                    }
                                })
                            }]
                    })
                        .addRow("Stav úkonu") //RC 25200213 : Druh úkonu
                        .addField("gselectbox", Gordic.Prefabs.Select.sprcstuDto(), {
                        name: "stav_ukn",
                        disabled: true,
                        dropdown: true,
                        model: "model.stav_ukn=value.stav_ukn",
                        initialValue: { stav_ukn: 0 },
                        defaultValue: { stav_ukn: 0 },
                    })
                        //.addField("gselectbox", { name: "stav_ukn", model: "model.stav_ukn=value", disabled: readOnly, flag: "required", validators: [new Gordic.Validators.Required()] })
                        .addRow("jres:25200213") //RC 25200213 : Druh úkonu
                        .addField("gselectbox", Gordic.Prefabs.Select.sprsdukDto({
                        filterPanelOpts: {
                            forms: [new Gordic.Forms.Form({ tabLabel: "Kompletni filtr" })
                                    .addRow("jres:35600006") //RC 35600006 : Druh úkonu
                                    .addField("gradio", {
                                    name: "typ_vyberu_druhu_ukonu",
                                    model: "model.typ_vyberu_druhu_ukonu = value", // radiobutton neni gselectbox => jeho hodnota je cislo neni to objekt, proto tam neni value.typ_vyberu_druhu_ukonu
                                    radios: [
                                        { label: "jres:25200228", value: 1 }, //RC 25200228 : Úkon navázaný na druh řízení
                                        { label: "jres:25200229", value: 2 }, //RC 25200229 : Úkon obecné metodiky
                                        { label: "jres:25200230", value: 3 }, //RC 25200230 : Oblíbený úkon
                                        { label: "jres:25200231", value: 4 } //RC 25200231 : Úkon nenavázaný na druh řízení
                                    ],
                                    emptyValue: 1,
                                    initialValue: 1 // oznaceny radiobutton
                                })
                            ],
                            customClass: "vyber_typu_filterPanel",
                            //simpleMode: true, // zakomentováno pro opravu BS ! zjistit, zda je potřeba
                            filterStorageService: null,
                            favoriteLayoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-12-12-0",
                            textItemTemplate: "{description}",
                            autoLoadAfter: ["CreatePanel", "ChoseFilter", "ClearFilter"],
                        },
                        serverFilters: {
                            typ_vyberu_druhu_ukonu: 1,
                            ixs_dsr: that.IxsDsr
                        },
                        related: this.element,
                        serverFiltersHandler: (filters) => {
                            return { typ_vyberu_druhu_ukonu: filters["typ_vyberu_druhu_ukonu"] };
                        }
                    }), {
                        name: "ixs_duk", model: "model.ixs_duk=value.ixs_duk, model.topic_pokyn = value.topic_pokyn, model.topic_vzor = value.topic_vzor, model.topic_pozn = value.topic_pozn",
                        validators: [new Gordic.Validators.Required()],
                        flag: "required",
                        disabled: readOnly,
                        strict: true,
                        serverFilters: { ixs_dsr: [that.IxsDsr] },
                        filterMinLength: 100, // v podstate zneaktivni autocomplete, ktery je chybny
                        change: function (ev, changeObj) {
                            var fldVec = that.findFields("VecSSL");
                            var valVec = fldVec.gfield("getValue");
                            if (valVec == null || valVec == "")
                                fldVec.gfield("setValue", changeObj.value?.nazev);
                            var fldDelkaLH = that.findFields("delka_lh");
                            fldDelkaLH.gfield("setValue", changeObj.value?.lhuta);
                        }
                    })
                        .addRow("jres:25200027") //RC 25200027 : Věc
                        .addField("gstringbox", {
                        name: "VecSSL", model: "model.VecSSL=value", disabled: readOnly, flag: "required", maxLength: 100, validators: [new Gordic.Validators.Length({ max: 100 })]
                    })
                        .addRow("jres:25200214") //RC 25200214 : Označení dok.
                        .addField("gstringbox", { name: "cj_dok", model: "model.cj_dok=value", disabled: neniNovy })
                        .addRow("jres:25200014") //RC 25200014 : Datum podání
                        .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_pod", model: "model.dat_pod=value", valueType: "date", disabled: neniNovy })
                        .addRow("jres:25200215") //RC 25200215 : Datum vzniku
                        .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_vzniku", model: "model.dat_vzniku=value", valueType: "date", disabled: readOnly, flag: "required", validators: [new Gordic.Validators.Required()] })
                        .addRow("Datum vypravení")
                        .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_vypraveni", model: "dat_vypraveni", valueType: "date", disabled: neniNovy })
                        .addText("", "w-1")
                        .addField("gcheck", "w-L-3 w-M-3 w-S-3", {
                        name: "s_vypraveno", model: "model.s_vypraveno", disabled: neniNovy, modelValueTransform: {
                            apply: function (modelValue) { return modelValue === 1; },
                            collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                        },
                        label: "Vypraveno"
                    })
                        .addRow("Datum doručení")
                        .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_doruceni", model: "dat_doruceni", valueType: "date", disabled: neniNovy })
                        .addText("", "w-1")
                        .addField("gcheck", "w-L-3 w-M-3 w-S-3", {
                        name: "s_doruceno", model: "model.s_doruceno", disabled: neniNovy, modelValueTransform: {
                            apply: function (modelValue) { return modelValue === 1; },
                            collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                        },
                        label: "Doručeno"
                    })
                        .addRow("jres:25200216") //RC 25200216 : Lhůta (ve dnech)
                        .addField("gnumberbox", "w-L-1 w-M-2 w-S-6", { name: "delka_lh", model: "model.delka_lh=value", disabled: readOnly })
                        .addRow("jres:25200217") //RC 25200217 : Lhůta od, do
                        .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_od", model: "model.dat_od=value", valueType: "date", disabled: neniNovy })
                        .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_lhuta", model: "model.dat_lhuta=value", valueType: "date", disabled: neniNovy })
                        .addRow("jres:25200120") //RC 25200120 : Právní moc
                        .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "DatPrMoc", model: "model.DatPrMoc=value", valueType: "date", disabled: neniNovy })
                        .addRow("jres:25200058") //RC 25200058 : Poznámka
                        .addField("gstringbox", { name: "poznamka", disabled: readOnly, rows: 4 })
                        .addRow("jres:25200218") //RC 25200218 : Doba trvání úkonu [hod], [min]
                        .addField("gnumberbox", "w-L-1 w-M-2 w-S-6", {
                        name: "doba_trvani_hod", disabled: readOnly,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    $(this).gfield("setValue", dto.doba_trvani / 60);
                                    return;
                                case "collect":
                                    dto.doba_trvani = dto.doba_trvani - (dto.doba_trvani / 60 * 60); // odstranit stare hodiny
                                    dto.doba_trvani = dto.doba_trvani + (parseInt($(this).gfield("getValue")) * 60); // pridat nove hodiny
                                    return;
                            }
                            return "doba_trvani";
                        },
                        validators: [new Gordic.Validators.Range({ min: 0, max: 99 })],
                        //step: 1 // vubec nic nedela
                    })
                        .addField("gnumberbox", "w-L-1 w-M-2 w-S-6", {
                        name: "doba_trvani_min", disabled: readOnly,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    $(this).gfield("setValue", dto.doba_trvani % 60);
                                    return;
                                case "collect":
                                    dto.doba_trvani = dto.doba_trvani - (dto.doba_trvani % 60); // odstranit stare minuty
                                    dto.doba_trvani = dto.doba_trvani + (parseInt($(this).gfield("getValue"))); // pridat nove minuty
                                    return;
                            }
                            return "doba_trvani";
                        },
                        validators: [new Gordic.Validators.Range({ min: 0, max: 59 })]
                    });
                    return form;
                }
                GetCustomDtoProTisk() {
                    var that = this;
                    return {
                        ixp_ukon: that.model.ixp_ukon, // that.findFields("ixp_ukon").gfield("getValue").ixp_ukon,
                        ixs_duk: that.model.ixs_duk, // that.findFields("ixs_duk").gfield("getValue").ixs_duk,
                        ixs_dsr: that.IxsDsr
                    };
                }
                KonvertovatSchvalit() {
                    var that = this;
                    console.log("KonvertovatSchvalit");
                }
                ParovatPriSchvaleni() {
                    var that = this;
                    var def = $.Deferred();
                    console.log("ParovatPriSchvaleni");
                    if (that.model.s_vyriz == 1) {
                        if (that.Param_SprRadParcj == 2) {
                            that.dialogs.messageBox("jres:25200174", "jres:25200241", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25200241 : Chcete párovat tento vyřizující dokument s iniciačním dokumentem?
                                .on("yes", function () { def.resolve(true); })
                                .on("no", function () { def.resolve(false); })
                                .on("close", function () { def.reject(); });
                        }
                        else if (that.Param_SprRadParcj == 1) {
                            def.resolve(true);
                        }
                        else
                            def.resolve(false);
                    }
                    else
                        def.resolve(false);
                    return def.promise();
                }
                VyberDeniku() {
                    var that = this;
                    var def = $.Deferred();
                    that.call("VyberDenikuNeeded", {}).done((needed) => {
                        if (needed) {
                            console.log("before VyberDenikuDlg");
                            Gordic.Ssl.Dialogs.VyberDenikuDlg(that, null)?.on("close", function (ev, selectedDenik) {
                                console.log("selectedDenik");
                                console.log(selectedDenik);
                                if (selectedDenik) {
                                    def.resolve((selectedDenik.denik ?? "") + "|" + (selectedDenik.poradi ?? "") + "|" + (selectedDenik.rok ?? ""));
                                }
                                else
                                    def.reject();
                            });
                        }
                        else
                            def.resolve("");
                    }).fail(function () {
                        def.reject();
                    });
                    return def.promise();
                }
                VyberDokumentuInitCj(parovat) {
                    var that = this;
                    var def = $.Deferred();
                    if (that.model.s_vyriz == 1) {
                        if (that.Param_SprRadParcj != 0 && parovat) {
                            if ((that.model.wfl_ixp_init_vyriz ?? "") != "" && that.Param_SprRadVparcj != 0) {
                                that.dialogs.showWindow(["Gordic.Spr.WebApp.GVyberDokumentuProVazbuCJ", {}], { IxpSpis: that.IxpSpis }, { width: 850, modal: true })
                                    .on("close", (ev, retValue) => {
                                    if (retValue != undefined && retValue.Ixp != undefined) {
                                        console.log(retValue.Ixp);
                                        def.resolve(retValue.Ixp);
                                    }
                                    else
                                        def.reject();
                                });
                            }
                            else
                                def.resolve(that.model.wfl_ixp_init_init);
                        }
                        else
                            def.resolve(null);
                    }
                    else
                        def.resolve(null);
                    return def.promise();
                }
                VlozitDoSpisu() {
                    var that = this;
                    console.log("VlozitDoSpisu");
                    that.dialogs.confirm("jres:25300024") //RC 25300024 : Chcete dokument úkonu vložit do spisu?
                        .on('close', (ev, retValue) => {
                        if (retValue === "yes") {
                            that.call("VlozitDoSpisu", {
                                ixpUkon: that.model.ixp_ukon,
                                datZmena: that.model.dat_zmena
                            }).done(() => {
                                console.log("ukon vlozen do spisu");
                                that.zmena = true;
                                that._reloadData();
                            });
                        }
                    });
                }
                KeSchvaleni() {
                    var that = this;
                    console.log("KeSchvaleni");
                    that.dialogs.confirm("jres:25300022") //RC 25300022 : Chcete ukončit práci na konceptu dokumentu?
                        .on('close', (ev, retValue) => {
                        if (retValue === "yes") {
                            that.call("KeSchvaleni", {
                                ixpUkon: that.model.ixp_ukon,
                                datZmena: that.model.dat_zmena
                            }).done(() => {
                                console.log("ukon ke schvaleni");
                                that.zmena = true;
                                that._reloadData();
                            });
                        }
                    });
                }
                Schvalit() {
                    var that = this;
                    console.log("SchvalitUkon");
                    that.dialogs.confirm("jres:25200240") //RC 25200240 : Chcete opravdu schválit úkon?
                        .on('close', (ev, retValue) => {
                        if (retValue === "yes") {
                            this.ParovatPriSchvaleni().then(function (parovat) {
                                console.log("parovat ...");
                                console.log(parovat);
                                that.VyberDeniku().then(function (selectedDenik) {
                                    console.log("selectedDenik2");
                                    console.log(selectedDenik);
                                    that.VyberDokumentuInitCj(parovat).then(function (Ixp) {
                                        console.log("Ixp z VyberDokumentuInitCj");
                                        console.log(Ixp);
                                        that.call("SchvalitUkon", {
                                            ixpUkon: that.model.ixp_ukon,
                                            datZmena: that.model.dat_zmena,
                                            parovat: parovat,
                                            selectedDenik: selectedDenik,
                                            ixpInitCj: Ixp
                                        }).done(() => {
                                            console.log("ukon schvalen");
                                            that.zmena = true;
                                            that._reloadData();
                                        });
                                    });
                                });
                            });
                        }
                    });
                }
                Stornovat() {
                    var that = this;
                    console.log("Stornovat");
                    that.dialogs.confirm("jres:25200272") //RC 25200272 : Chcete opravdu stornovat úkon?
                        .on('close', (ev, retValue) => {
                        if (retValue === "yes") {
                            var l_sLabel = "jres:25200264"; //RC 25200264 : Důvod stornování dokumentu
                            this.dialogs.prompt("jres:25200263", l_sLabel).on("ok", function (ev, duvod) {
                                if (duvod && (duvod.trim() != "")) {
                                    that.call("StornovatUkon", { ixpUkon: that.model.ixp_ukon, datZmena: that.model.dat_zmena, duvodStorna: duvod })
                                        .done(function (val) {
                                        console.log("ukon stornovan");
                                        that.zmena = true;
                                        that.tryClose({ Zmena: true });
                                    })
                                        .fail(function (val) {
                                    });
                                }
                                else {
                                    that.dialogs.alert("jres:25200265"); //RC 25200265 : Je nutné uvést důvod stornování dokumentu
                                }
                            });
                        }
                    });
                }
                NastavitLhutu() {
                    var that = this;
                    console.log("NastavitLhutu");
                    Gordic.Spr.Dialogs.VypocetLhutyDlg(that, {
                        DatumZahajeni: new Date(), //  that.model.dat_od,
                        PocetDnu: that.model.delka_lh,
                        ShowOkButton: true
                    }, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                        .done(function (ret) {
                        if (ret != undefined && ret.VypocetLhuty != undefined) {
                            that.call("NastavitLhutuUkonu", {
                                ixpUkon: that.model.ixp_ukon,
                                ixpSpis: that.model.ixp_spis,
                                datOd: ret.VypocetLhuty.dat_zahajeni,
                                datLhuta: ret.VypocetLhuty.dat_lhuta,
                                datZmena: that.model.dat_zmena,
                            })
                                .done(function (val) {
                                console.log("nastavena lhuta");
                                that.zmena = true;
                                that._reloadData();
                            });
                        }
                    });
                }
                NabytPravniMoc() {
                    var that = this;
                    console.log("NabytPravniMoc");
                    var formDef = new Gordic.Forms.Form()
                        .addRow("jres:25200270", true).addField("gdatebox", { validators: [new Gordic.Validators.Required()], name: "DatPrMoc", model: "DatPrMoc", valueType: "date" }); //RC 25200270 : Datum nabytí právní moci
                    var dlg = this.dialogs.simpleForm("jres:25200271", formDef, { DatPrMoc: that.model.DatPrMoc }, { height: 200, modal: true, noClose: false }); //RC 25200271 : Nabytí právní moci
                    dlg.on("close", function (ev, retVal) {
                        if (retVal) {
                            console.log("DatPrMoc");
                            console.log(retVal.DatPrMoc);
                            that.call("NabytPravniMoc", { ixpUkon: that.model.ixp_ukon, datPrMoc: retVal.DatPrMoc })
                                .done(function (errMes) {
                                if (errMes == "") {
                                    console.log("nabyta pravni moc");
                                    that.zmena = true;
                                    that._reloadData();
                                }
                                else
                                    that.dialogs.alert(errMes);
                            });
                        }
                    });
                }
                DetailDokumentu() {
                    var that = this;
                    console.log("DetailDokumentu");
                    var options = {
                        DetailDto: { ixp: that.model.ixp_ukon }
                    };
                    Gordic.Wfl.Dialogs.DetailDokumentuSpisu(that, options, Gordic.Global.Enums.ModOtevreni.showModalWindow);
                }
                Pokyny() {
                    var that = this;
                    console.log("Pokyny");
                }
                Vzor() {
                    var that = this;
                    console.log("Vzor");
                }
                Poznamka() {
                    var that = this;
                    console.log("Poznamka");
                }
                TiskSablony() {
                    var that = this;
                    console.log("TiskSablony");
                }
                OtevreniElektronickehoObrazu() {
                    var that = this;
                    console.log("OtevreniElektronickehoObrazu - start");
                    (Gordic.Wfl).AttachmentUtils.GetFavorite(this, that.model.ixp_ukon).then((attDto) => {
                        Gordic.Wfl.AttachmentUtils.OpenAttachment(that, attDto, true, false, false)
                            .done(function (args) {
                            console.log("OtevreniElektronickehoObrazu - done");
                            // console.log("doc.downloadCompleted", this, args);
                        })
                            .fail(function (xhr, type, obj) {
                            console.log("OtevreniElektronickehoObrazu - fail");
                            console.log(obj);
                        });
                    });
                }
                Odeslat() {
                    var that = this;
                    console.log("Odeslat");
                    that.call("PripravitOdeslani", {
                        ixpUkon: that.model.ixp_ukon
                    }).done((pocetPripravenych) => {
                        console.log("Subjekty pripravene k odeslani");
                        //if (pocetPripravenych > 0) {
                        //    Gordic.Wfl.Dialogs.GOdeslaniDlg(
                        //        that,
                        //        {
                        //            Hromadne: true,
                        //            GenerovatSeznamOdeslanych: true
                        //        },
                        //        Gordic.Global.Enums.ModOtevreni.showModalWindow
                        //    ).always(() => {
                        //        that.call("OdstranitSubjektyKOdeslani", {
                        //            ixpUkon: that.model.ixp_ukon
                        //        }).done(() => {
                        //            Gordic.Wfl.Dialogs.GOdeslaniDlg(that, { Ixp: that.model.ixp_ukon }, Gordic.Global.Enums.ModOtevreni.showModalWindow);
                        //            //that.zmena = true;
                        //            //that._reloadData();
                        //        });
                        //    });
                        //}
                        //else {
                        Gordic.Wfl.Dialogs.GOdeslaniDlg(that, { Ixp: that.model.ixp_ukon }, Gordic.Global.Enums.ModOtevreni.showModalWindow);
                        //}
                        //that.zmena = true;
                        //that._reloadData();
                    });
                }
                KonverzePdf() {
                    var that = this;
                    console.log("KonverzePdf");
                    Gordic.Wfl.Dialogs.GKonverzePdfDlg(that, { Ixp: that.model.ixp_ukon }, Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow)
                        .done(function (args) {
                        console.log("KonverzePdf - done", args);
                    })
                        .fail(function (xhr, type, obj) {
                        console.log("KonverzePdf - fail");
                        console.log(obj);
                    });
                }
                _reloadData() {
                    var gTabManager = this.find(".gtabmanager");
                    var active;
                    if (gTabManager != null && gTabManager != undefined)
                        active = gTabManager.gtabmanager("getActive");
                    this.zmena = true;
                    this.load({ RezimDetailu: 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */, internal: true, selectedTabGroup: active });
                }
                ZadostOPodpis() {
                    var that = this;
                    var ops = Gordic.Wfl.WebClient.WflOps.WflOpsEnum;
                    var eventName = Gordic.Wfl.WebClient.WflOps.eventName;
                    var options = {
                        ListIxp: that.model.ixp_ukon,
                        HromadnaAkce: false
                    };
                    Gordic.Wfl.Dialogs.ZadostOPodpis(that, options).done(function (retVal) {
                        if (retVal) {
                            that.dialogs.alert("jres:25300008"); //RC 25300008 : Úspěšně vloženo do podpisové knihy
                            //that.element.trigger(eventName, Gordic.Wfl.WebClient.WflOps.prepareOpts(ops.zadostOPodpis, "jres:25500316", "g-state-success")); //RC 25500316 : Úspěšně vloženo do podpisové knihy
                        }
                    });
                }
                SchvalovaciProces() {
                    var that = this;
                    var ops = Gordic.Wfl.WebClient.WflOps.WflOpsEnum;
                    var eventName = Gordic.Wfl.WebClient.WflOps.eventName;
                    var modOtevreni = Gordic.Gin.Globals.Enums.ModOtevreni;
                    var opt = {
                        Ixp: that.model.ixp_ukon //ixp_spis
                    };
                    Gordic.Wfl.Dialogs.GSchvalovaciProcesPozadavekDlg(this, opt, modOtevreni.navigate)
                        .done(function (retval) {
                        if (retval) { // && retval.stav) {\
                            that._reloadData();
                            //that.dialogs.alert("jres:25300009"); //RC 25300009 : Úspěšně vloženo do schvalovacího procesu
                            //that.element.trigger(eventName, Gordic.Wfl.WebClient.WflOps.prepareOpts(ops.schvalovaciProces));
                        }
                    });
                }
                formatDatum(date) {
                    if (!date)
                        return "";
                    let parts = date.split('-');
                    return parts[2] + '.' + parts[1] + '.' + parts[0];
                }
            };
            GDetailUkonu = __decorate([
                gcontent
                //export class GDetailUkonu extends GDetailBuilderContent<UsedComponentsNew> implements IGContent {
            ], GDetailUkonu);
            WebApp.GDetailUkonu = GDetailUkonu;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFVrb251LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbFVrb251LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0F1Z0NmO0FBdmdDRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F1Z0NuQjtJQXZnQ2dCLFdBQUEsR0FBRztRQUFDLElBQUEsTUFBTSxDQXVnQzFCO1FBdmdDb0IsV0FBQSxNQUFNO1lBQ3ZCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkM7Ozs7ZUFJRztZQUdILElBQWEsWUFBWTtZQUR6QixtR0FBbUc7WUFDbkcsTUFBYSxZQUFhLFNBQVEsT0FBQSxxQkFTakM7Z0JBVEQ7O29CQXFCWSxnQkFBVyxHQUFZLEtBQUssQ0FBQztnQkF1K0J6QyxDQUFDO2dCQXIrQkcsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDL0IsSUFBSSxJQUFJLENBQUMsS0FBSywyREFBbUQ7d0JBQUUsSUFBSSxDQUFDLGFBQWEsR0FBRzs0QkFDcEYsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPO3lCQUNqRCxDQUFDO29CQUNGLHlDQUF5QztvQkFDekMsc0NBQXNDO29CQUN0QyxLQUFLO29CQUNMLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFJOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDM0csSUFBSSxPQUFP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RyxHQUFHO3dCQUNOLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBSSxVQUFVO3FCQUN6QyxDQUFDO29CQUVGLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQzt5QkFDN0UsSUFBSSxDQUFDLFVBQVUsTUFBTTt3QkFDbEIsSUFBSSxNQUFNLEVBQUUsQ0FBQyxDQUFHLHFCQUFxQjs0QkFDakMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOzRCQUNuQiwrRkFBK0Y7NEJBQy9GLGtHQUFrRzt3QkFDdEcsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO2dCQUVPLFdBQVcsQ0FBQyxJQUFZO29CQUM1QixJQUFJLENBQUMsSUFBSTt3QkFBRSxPQUFPLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDNUIsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxDQUFDO2FBRUosQ0FBQTtZQTUvQlksWUFBWTtnQkFGeEIsUUFBUTtnQkFDVCxtR0FBbUc7ZUFDdEYsWUFBWSxDQTQvQnhCO1lBNS9CWSxtQkFBWSxlQTQvQnhCLENBQUE7UUFDTCxDQUFDLEVBdmdDb0IsTUFBTSxHQUFOLFVBQU0sS0FBTixVQUFNLFFBdWdDMUI7SUFBRCxDQUFDLEVBdmdDZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBdWdDbkI7QUFBRCxDQUFDLEVBdmdDUyxNQUFNLEtBQU4sTUFBTSxRQXVnQ2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlNwci5XZWJBcHAge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdEZXRhaWxcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciBQZXRyIER5dHJpY2hcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICAvL2V4cG9ydCBjbGFzcyBHRGV0YWlsVWtvbnUgZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQ8VXNlZENvbXBvbmVudHNOZXc+IGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsVWtvbnUgZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQ8XHJcbiAgICAgICAgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdCYXNlRGV0YWlsUmVsb2FkQ29tcG9uZW50RXh0ZW5zaW9ucyAmXHJcbiAgICAgICAgVGhpc1R5cGU8R0NvbnRlbnQ8R29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdCYXNlRGV0YWlsUmVsb2FkQ29tcG9uZW50RXh0ZW5zaW9ucz4+ICZcclxuICAgICAgICBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0NoYW5nZUFrdGl2aXRhUmVsb2FkQ29tcG9uZW50RXh0ZW5zaW9ucyAmXHJcbiAgICAgICAgVGhpc1R5cGU8R0NvbnRlbnQ8R29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdDaGFuZ2VBa3Rpdml0YVJlbG9hZENvbXBvbmVudEV4dGVuc2lvbnM+PiAmXHJcbiAgICAgICAgLypHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXJDb21wb25lbnRzLkdMaXN0Q29udHJvbHNFeHRlbnNpb25zPEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdEZXRhaWxVa29udUR0bz4gJiovXHJcbiAgICAgICAgR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5HTGlzdENvbnRyb2xzRXh0ZW5zaW9uczxHb3JkaWMuU3ByLkludGVyZmFjZS5HU3ByVWtvbkR0bz4gJlxyXG4gICAgICAgIC8qVGhpc1R5cGU8R0NvbnRlbnQ8R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5HTGlzdENvbnRyb2xzRXh0ZW5zaW9uczxHb3JkaWMuU3ByLkludGVyZmFjZS5HRGV0YWlsVWtvbnVEdG8+Pj4qL1xyXG4gICAgICAgIFRoaXNUeXBlPEdDb250ZW50PEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlckNvbXBvbmVudHMuR0xpc3RDb250cm9sc0V4dGVuc2lvbnM8R29yZGljLlNwci5JbnRlcmZhY2UuR1NwclVrb25EdG8+Pj5cclxuICAgID4gaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG4gICAgICAgIEl4cFNwaXM6IHN0cmluZztcclxuICAgICAgICBJeHBVa29uOiBzdHJpbmc7XHJcbiAgICAgICAgSXhzRHNyOiBzdHJpbmc7XHJcbiAgICAgICAgR3JpZFJjOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkM8YW55PiB8IHVuZGVmaW5lZDtcclxuICAgICAgICBSZXppbURldGFpbHU6IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dTtcclxuICAgICAgICBwcml2YXRlIGRvdGNTdWJqVWtvbnVUYWI6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSBQYXJhbV9TcHJSYWRQYXJjajogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgUGFyYW1fU3ByUmFkVnBhcmNqOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBQYXJhbV9TcHJSYWRSZWdlbjogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUga3BpMTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGtwaTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGdyaWRIYXNSb3dzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuUmV6aW0gPSB0aGlzLlJlemltRGV0YWlsdTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUmV6aW0gPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcpIHRoaXMub3JpZ2luYWxNb2RlbCA9IHtcclxuICAgICAgICAgICAgICAgIGl4cF9zcGlzOiB0aGlzLkl4cFNwaXMsIGl4cF91a29uOiB0aGlzLkl4cFVrb25cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy90aGlzLmxvYWREYXRhKHRoaXMpLmRvbmUoZnVuY3Rpb24gKCkgeyBcclxuICAgICAgICAgICAgLy8gICAgdGhhdC5zZXRSZXppbSh0aGF0LlJlemltLCB0aGF0KTtcclxuICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgdGhpcy5vbkNvbnRlbnRSZWFkeUJhc2UodGhhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGRhdF92eXAgPSB0aGF0Lm1vZGVsLmRhdF92eXByYXZlbmkgPyB0aGlzLmZvcm1hdERhdHVtKHRoYXQubW9kZWwuZGF0X3Z5cHJhdmVuaT8uc3BsaXQoJ1QnKVswXSkgOiBcIj8/P1wiO1xyXG4gICAgICAgICAgICBsZXQgZGF0X2RvciA9IHRoYXQubW9kZWwuZGF0X2RvcnVjZW5pID8gdGhpcy5mb3JtYXREYXR1bSh0aGF0Lm1vZGVsLmRhdF9kb3J1Y2VuaT8uc3BsaXQoJ1QnKVswXSkgOiBcIj8/P1wiO1xyXG4gICAgICAgICAgICBsZXQgbWVhbmluZ1YgPSB0aGF0Lm1vZGVsLnNfdnlwcmF2ZW5vID8gXCJwb3NpdGl2ZVwiIDogXCJuZWdhdGl2ZVwiO1xyXG4gICAgICAgICAgICBsZXQgbWVhbmluZ0QgPSB0aGF0Lm1vZGVsLnNfZG9ydWNlbm8gPyBcInBvc2l0aXZlXCIgOiBcIm5lZ2F0aXZlXCI7XHJcbiAgICAgICAgICAgIGxldCBwcmltYXJ5VGV4dFYgPSB0aGF0Lm1vZGVsLnNfdnlwcmF2ZW5vID8gXCJWeXByYXZlbm9cIiA6IFwiVnlwcmF2ZW7DrVwiO1xyXG4gICAgICAgICAgICBsZXQgcHJpbWFyeVRleHREID0gdGhhdC5tb2RlbC5zX2RvcnVjZW5vID8gXCJEb3J1xI1lbm9cIiA6IFwiRG9ydcSNZW7DrVwiO1xyXG5cclxuICAgICAgICAgICAgbGV0IGFjdGlvbiA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwia3BpQWN0aW9uXCIsIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwia3BpQWN0aW9uIC0gZG9ydWNlbmkvb2Rlc2xhbmlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ3JpZEhhc1Jvd3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYWxsKFwiT2JjZXJzdHZpdERvcnVjZW5pT2Rlc2xhbmlcIiwgeyBpeHBVa29uOiB0aGF0Lm1vZGVsLml4cF91a29uIH0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG/EjWVrw6F2w6FtIG7DoXZyYXQgY2Vsw6lobyBEdG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fcmVsb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KFwianJlczozNTYwMDAwM1wiKTsgLy9SQyAzNTYwMDAwMyA6IE5lbHplIG9ixI1lcnN0dml0IGRvcnXEjWVuw60vb2Rlc2zDoW7DrSwgcHJvdG/FvmUgw7prb24gbmVtw6Egxb7DoWRuw6kgZG90xI1lbsOpIHN1Ympla3R5LlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmtwaTEgPSAkKFwiPGRpdj5cIikuZ2Jhc2VwYW5lbChHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpVmFsdWVUd29Sb3dzVGV4dFRlbXBsYXRlKCksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnlwcmF2aXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2VuZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdF92eXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5VGV4dDogcHJpbWFyeVRleHRWLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogbWVhbmluZ1YsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRvcnVjaXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2VuZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdF9kb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5VGV4dDogcHJpbWFyeVRleHRELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogbWVhbmluZ0QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdLCB7IGtleTogW1wibmFtZVwiXSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZEl0ZW1zOiB0aGF0Lm1vZGVsLlBlcm1pc3Npb25zLkNhbktlU2NodmFsZW5pLnZhbHVlIHx8IHRoYXQubW9kZWwuUGVybWlzc2lvbnMuQ2FuU2NodmFsaXQudmFsdWUgPyBbXCJ2eXByYXZpdFwiLCBcImRvcnVjaXRcIl0gOiBbXCJcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogYWN0aW9uLCBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTsgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoYXQua3BpMS5hcHBlbmRUbyh0aGlzLmtwaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBSZXNpemVNYW5hZ2VyLmZvcmNlUmVmcmVzaCh0aGlzLmVsZW1lbnQuZ2V0KDApISk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogb25EZXRhaWxCdWlsZGVySW5pdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVySW5pdChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYnVpbGRlci53aXRoQ29tcG9uZW50PHRoaXM+KFwidWtvbkRldGFpbFwiLCB7XHJcbiAgICAgICAgICAgICAgICB0YWJHcm91cHM6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiR3JvdXBaYWtsYWRuaTpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUHJvZmlsIMO6a29udVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0YWJzOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYlpha2xhZG5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsIGxvY2tlZDogdHJ1ZSwgZ3JvdXA6IHsgaWQ6IFwidGFiR3JvdXBaYWtsYWRuaVwiIH0sIHRpdGxlOiBcIlByb2ZpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtID0gdGFiLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCB0aGF0LmNyZWF0ZUZvcm0oKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5maW5kRmllbGRzKFwiYWRyZXNhX3J1aWFuXCIpLmdmaWVsZChcImdldEJ1dHRvblwiLCBcInNlbGVjdG9yXCIpLmdidXR0b24oXCJvcHRpb25cIiwgXCJwYXJhbXNcIikuYWN0aW9uIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGFia3BpOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLCBsb2NrZWQ6IHRydWUsIGdyb3VwOiB7IGlkOiBcInRhYkdyb3VwWmFrbGFkbmlcIiB9LCB0aXRsZTogXCJqcmVzOjI1NTAwMzEzXCIgLy9SQyAyNTUwMDMxMyA6IFZ5cHJhdmVuw60sIGRvcnXEjWVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5rcGkgPSB0YWI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYkRvdGNTdWJqVWtvbnU6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSwgbG9ja2VkOiBmYWxzZSwgZ3JvdXA6IHsgaWQ6IFwidGFiR3JvdXBaYWtsYWRuaVwiIH0sIHRpdGxlOiBcImpyZXM6MjUyMDAxMjNcIiwgIC8vUkMgMjUyMDAxMjMgOiBEb3TEjWVuw6kgc3ViamVrdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudFBhcmFtczogR0NvbnRlbnQuY3JlYXRlSW5pdGlhbGl6ZXIoR29yZGljLlNwci5XZWJBcHAuR0RvdGNTdWJqVWtvbnVDb250cm9sKHRoYXQpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kb3RjU3VialVrb251VGFiID0gdGFiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYWN0Vmxveml0RWxPYnJhejpcclxuICAgICAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAyNTlcIiwgLy9SQyAyNTIwMDI1OSA6IEVsLiBvYnJhelxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHRvb2x0aXA6IFwianJlczoyNTIwMDI2MlwiLCAvL1JDIDI1MjAwMjYyIDogVmxvxb5pdCBlbGVrdHJvbmlja8O9IG9icmF6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcnVuOiBmdW5jdGlvbiAodGhpczogR0FjdGlvbiwgZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhcIlZsb3ppdEVsT2JyYXpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiBHb3JkaWMuV2ZsLkRpYWxvZ3MuR1ByaWxvaHlEbGcodGhhdCwgeyBJeHA6IHRoYXQubW9kZWwuaXhwX3Vrb24gfSwgR2luLkdsb2JhbHMuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vYWN0S29udmVydG92YXRTY2h2YWxpdDpcclxuICAgICAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAyNjBcIiwgLy9SQyAyNTIwMDI2MCA6IEtvbnZlcnplXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWNvbjogXCJmYS1maWxlLXBkZi1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdG9vbHRpcDogXCJqcmVzOjI1MjAwMjYxXCIsIC8vUkMgMjUyMDAyNjEgOiBLb252ZXJ0b3ZhdCBocm9tYWRuxJsgZG8gUERGIC8gcG9kZXBzYXQgZWxla3Ryb25pY2vDvW0gcG9kcGlzZW0gLyBzY2h2w6FsaXQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcnVuOiBmdW5jdGlvbiAodGhpczogR0FjdGlvbiwgZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LktvbnZlcnRvdmF0U2NodmFsaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFZsb3ppdERvU3Bpc3U6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUzMDAwMjNcIiwgLy9SQyAyNTMwMDAyMyA6IFZsb8W+aXQgZG8gc3Bpc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAodGhpczogR0FjdGlvbiwgZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5WbG96aXREb1NwaXN1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdEtlU2NodmFsZW5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MzAwMDIxXCIsIC8vUkMgMjUzMDAwMjEgOiBLZSBzY2h2w6FsZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICh0aGlzOiBHQWN0aW9uLCBldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LktlU2NodmFsZW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFNjaHZhbGl0OlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMjM5XCIsIC8vUkMgMjUyMDAyMzkgOiBTY2h2w6FsaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAodGhpczogR0FjdGlvbiwgZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5TY2h2YWxpdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RTdG9ybm92YXQ6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAyNDlcIiwgLy9SQyAyNTIwMDI0OSA6IFN0b3Jub3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICh0aGlzOiBHQWN0aW9uLCBldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlN0b3Jub3ZhdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3ROYXN0YXZpdExodXR1OlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMjUxXCIsIC8vUkMgMjUyMDAyNTEgOiBMaMWvdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAodGhpczogR0FjdGlvbiwgZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZpdExodXR1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE5hYnl0UHJhdm5pTW9jOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMjUwXCIsIC8vUkMgMjUyMDAyNTAgOiBQcsOhdm7DrSBtb2NcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAodGhpczogR0FjdGlvbiwgZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYWJ5dFByYXZuaU1vYygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3REZXRhaWxEb2t1bWVudHU6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAyNTVcIiwgLy9SQyAyNTIwMDI1NSA6IERva3VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKHRoaXM6IEdBY3Rpb24sIGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuRGV0YWlsRG9rdW1lbnR1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFBva3lueTpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDI1NFwiLCAvL1JDIDI1MjAwMjU0IDogUG9reW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLCAvLyBieWxvIHpha2F6YW5vIHZlIHN0YXJlbSBMS1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICh0aGlzOiBHQWN0aW9uLCBldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlBva3lueSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RWem9yOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMjUyXCIsIC8vUkMgMjUyMDAyNTIgOiBWem9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLCAvLyBKYXJkYTogemF0aW0gbmVkZWxhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICh0aGlzOiBHQWN0aW9uLCBldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlZ6b3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UG96bmFta2E6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAyNTNcIiwgLy9SQyAyNTIwMDI1MyA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSwgLy8gSmFyZGE6IHphdGltIG5lZGVsYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAodGhpczogR0FjdGlvbiwgZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Qb3puYW1rYSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RXZmxDaW5ub3N0aVphZG9zdE9Qb2RwaXM6IHsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogW1wiZ2ktZXBrXCIsIFwiZmEtcGx1cyBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvIGdpLXN0YWNrLWZ3IGdpLXN0YWNrLXBvcy0tcmIgZ2ktYmd3XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjU1MDAzMTVcIiwgLy9SQyAyNTUwMDMxNSA6IFZsb8W+aXQgZG8gcG9kcGlzb3bDqSBrbmloeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuWmFkb3N0T1BvZHBpcygpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFdmbENpbm5vc3RpU2NodmFsb3ZhY2lQcm9jZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zY2h2eXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MzAwMDA1XCIsIC8vUkMgMjUzMDAwMDUgOiBTY2h2YWxvdmFjw60gcHJvY2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5TY2h2YWxvdmFjaVByb2NlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hY3RPdGV2cmVuaUVsZWt0cm9uaWNrZWhvT2JyYXp1OlxyXG4gICAgICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiT3RldnJlbmlFbGVrdHJvbmlja2Vob09icmF6dVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJ1bjogZnVuY3Rpb24gKHRoaXM6IEdBY3Rpb24sIGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5PdGV2cmVuaUVsZWt0cm9uaWNrZWhvT2JyYXp1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RUaXNrU2FibG9ueTogR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1NhYmxvbnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJHZW5lcm92YXQvVGlza1wiLCAgIC8vUkMgMjUyMDAyNTYgOiBUaXNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbWE6IFwic3ByX3B0bV91a25cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tRHRvOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5HZXRDdXN0b21EdG9Qcm9UaXNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlclJlc3RyaWN0aW9uQWxmTWV0aG9kOiBcIkdvcmRpYy5TcHIuV2ViQXBwLkdEZXRhaWxVa29udTpHZXRSZXN0cmljdGlvbkFsZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlNwci5XZWJBcHAuR0RldGFpbFVrb251OlNlcnZlclBhcmFtZXRlck1ldGhvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRGaW5pc2hlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWwuRWxla3Ryb25pY2t5T2JyYXpUaXRsZSA9PSBudWxsIHx8IHRoYXQubW9kZWwuRWxla3Ryb25pY2t5T2JyYXpUaXRsZSA9PSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3JlbG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9nT3BlbmluZzogZnVuY3Rpb24gKGFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsLkVsZWt0cm9uaWNreU9icmF6VGl0bGUgIT0gbnVsbCAmJiB0aGF0Lm1vZGVsLkVsZWt0cm9uaWNreU9icmF6VGl0bGUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczoyNTIwMDE3NFwiLCBcImpyZXM6MjUyMDAyNzNcIiwgR0RsZy5tYmJZZXNOb0NhbmNlbCwgR0RsZy5tYmlRdWVzdGlvbikgLy9SQyAyNTIwMDI3MyA6IENoY2V0ZSBvdGV2xZnDrXQgZMWZw612ZSB1bG/FvmVuw70gZG9rdW1lbnQgeiDDumxvxb5pxaF0xJs/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcInllc1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5QYXJhbV9TcHJSYWRSZWdlbiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjI1MjAwMTc0XCIsIFwianJlczoyNTIwMDI3NFwiLCBHRGxnLm1iYlllc05vQ2FuY2VsLCBHRGxnLm1iaVF1ZXN0aW9uKSAvL1JDIDI1MjAwMjc0IDogQ2hjZXRlIHpub3Z1IHZ5Z2VuZXJvdmF0IGRhdG92w6kgcG9sb8W+a3kgZG8gZm9ybXVsw6HFmWU/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcInllc1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT1RPIEpFIFBPVFJFQkEsIEFMRSBTU0wgVE8gWkFUSU0gTkVVTUlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5jYWxsKFwiUHJlZ2VuZXJvdmF0RWxla3Ryb25pY2t5T2JyYXpcIiwge30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAuZG9uZShmdW5jdGlvbiAoZXJyTWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGVyck1lcyA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZWwgb2JyYXogcHJlZ2VuZXJvdmFuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KGVyck1lcykub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9UTyBUVSBKRSBET0NBU05FLCBORVogQlVERSBIT1RPVkUgUFJFR0VORVJPVkFOSVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5PdGV2cmVuaUVsZWt0cm9uaWNrZWhvT2JyYXp1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcIm5vXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuT3RldnJlbmlFbGVrdHJvbmlja2Vob09icmF6dSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuT3RldnJlbmlFbGVrdHJvbmlja2Vob09icmF6dSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwibm9cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjI1MjAwMTc0XCIsIFwianJlczoyNTIwMDI3NVwiLCBHRGxnLm1iYlllc05vLCBHRGxnLm1iaVF1ZXN0aW9uKSAvL1JDIDI1MjAwMjc1IDogUMWvdm9kbsOtIGRva3VtZW50IGJ1ZGUgcG8gdWxvxb5lbsOtIG5vdsSbIHZ5Z2VuZXJvdmFuw6lobyBkb2t1bWVudHUgcMWZZXBzw6FuLjs7Q2hjZXRlIG9wcmF2ZHUgcG9rcmHEjW92YXQ/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcIm5vXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjYW5jZWxcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RPZGVzbGF0OlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMjU4XCIsIC8vUkMgMjUyMDAyNTggOiBPZGVzbMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKHRoaXM6IEdBY3Rpb24sIGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuT2Rlc2xhdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RQcmlsb2h5OlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMzgzXCIsIC8vUkMgMjUyMDAzODMgOiBQxZnDrWxvaHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjI1MjAwMzg0XCIsIC8vUkMgMjUyMDAzODQgOiBQxZnDrWxvaHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAodGhpczogR0FjdGlvbiwgZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcmlsb2h5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5XZmwuRGlhbG9ncy5HUHJpbG9oeURsZyh0aGF0LCB7IEl4cDogdGhhdC5tb2RlbC5peHBfdWtvbiB9LCBHaW4uR2xvYmFscy5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RLb252ZXJ6ZVBkZjpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDQ0MVwiLCAvL1JDIDI1MjAwNDQxIDogS29udmVydG92YXQvcG9kZXBzYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjI1MjAwNDQyXCIsIC8vUkMgMjUyMDA0NDIgOiBLb252ZXJ0b3ZhdCBocm9tYWRuxJsgZG8gUERGIC8gcG9kZXBzYXQgZWxla3Ryb25pY2vDvW0gcG9kcGlzZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1maWxlLXBkZi1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKHRoaXM6IEdBY3Rpb24sIGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuS29udmVyemVQZGYoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibWVudVVrb25cIiwgY2FwdGlvbjogXCJqcmVzOjI1MjAwMzgyXCIsIHR5cGU6IFwic3RhdGljXCIsIGFmdGVyOiBcImFrY2VcIiwgY2hpbGRyZW46IFsgLy9SQyAyNTIwMDM4MiA6IMOaa29uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3sgaWQ6IFwibWVudVZsb3ppdEVsT2JyYXpcIiwgYWN0aW9uOiBcImFjdFZsb3ppdEVsT2JyYXpcIiwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8veyBpZDogXCJtZW51S29udmVydG92YXRTY2h2YWxpdFwiLCBhY3Rpb246IFwiYWN0S29udmVydG92YXRTY2h2YWxpdFwiLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJtZW51Vmxveml0RG9TcGlzdVwiLCBhY3Rpb246IFwiYWN0Vmxveml0RG9TcGlzdVwiLCBmYXZvcml0ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudUtlU2NodmFsZW5pXCIsIGFjdGlvbjogXCJhY3RLZVNjaHZhbGVuaVwiLCBmYXZvcml0ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudVNjaHZhbGl0XCIsIGFjdGlvbjogXCJhY3RTY2h2YWxpdFwiLCBmYXZvcml0ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudU9kZXNsYXRcIiwgYWN0aW9uOiBcImFjdE9kZXNsYXRcIiwgZmF2b3JpdGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiBcIm1lbnVTdG9ybm92YXRcIiwgYWN0aW9uOiBcImFjdFN0b3Jub3ZhdFwiLCBmYXZvcml0ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudU5hc3Rhdml0TGh1dHVcIiwgYWN0aW9uOiBcImFjdE5hc3Rhdml0TGh1dHVcIiwgZmF2b3JpdGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiBcIm1lbnVOYWJ5dFByYXZuaU1vY1wiLCBhY3Rpb246IFwiYWN0TmFieXRQcmF2bmlNb2NcIiwgZmF2b3JpdGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiBcIm1lbnVQb2t5bnlcIiwgYWN0aW9uOiBcImFjdFBva3lueVwiLCBmYXZvcml0ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudVZ6b3JcIiwgYWN0aW9uOiBcImFjdFZ6b3JcIiwgZmF2b3JpdGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiBcIm1lbnVQb3puYW1rYVwiLCBhY3Rpb246IFwiYWN0UG96bmFta2FcIiwgZmF2b3JpdGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiBcIm1lbnVUaXNrU2FibG9ueVwiLCBhY3Rpb246IFwiYWN0VGlza1NhYmxvbnlcIiwgZmF2b3JpdGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiBcIm1lbnVEZXRhaWxEb2t1bWVudHVcIiwgYWN0aW9uOiBcImFjdERldGFpbERva3VtZW50dVwiLCBmYXZvcml0ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudVByaWxvaHlcIiwgYWN0aW9uOiBcImFjdFByaWxvaHlcIiwgZmF2b3JpdGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiBcIm1lbnVLb252ZXJ6ZVBkZlwiLCBhY3Rpb246IFwiYWN0S29udmVyemVQZGZcIiwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudVdmbENpbm5vc3RpU2NodmFsb3ZhY2lQcm9jZXNcIiwgYWN0aW9uOiBcImFjdFdmbENpbm5vc3RpU2NodmFsb3ZhY2lQcm9jZXNcIiwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudVdmbENpbm5vc3RpXCIsIGFjdGlvbjogXCJhY3RXZmxDaW5ub3N0aVphZG9zdE9Qb2RwaXNcIiwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8veyBpZDogXCJtZW51T3RldnJlbmlFbGVrdHJvbmlja2Vob09icmF6dVwiLCBhY3Rpb246IFwiYWN0T3RldnJlbmlFbGVrdHJvbmlja2Vob09icmF6dVwiLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIC8va3BpczogW1xyXG4gICAgICAgICAgICAgICAgLy8gICAgeyAvL29ic2VydmFibGUgb2JqZWN0IGJ1ZGUgcMWZaWTDoW4gZG8gdGhpcy5rcGlzLmtwaU9uZSBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcImtwaU9uZVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGNoYXJ0VHlwZTogXCJsaXF1aWRcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBkYXRhOiAwLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHVuaXQ6IFwiJVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRpdGxlOiBcIktQSSAxXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGV4dDogXCJUZXh0IHBybyBwcnZuw60ga3BpLlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIG1lYW5pbmc6IFwibmV1dHJhbFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHNob3dUZXh0SWNvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIF1cclxuICAgICAgICAgICAgICAgIC8vaGVhZGVyRm9ybTogdGhpcy5jcmVhdGVGb3JtKClcclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVua2NlIGRldGFpbGJ1aWxkZXJ1LCBzcHXFoXTEm27DoSBwbyBtZXJnZSBrb21wb25lbnRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckJ1aWxkKGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dSZXN0b3JlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB2YXIgX2FmdGVyRGVsZXRlID0gZnVuY3Rpb24gKGNvbnRlbnQ6IEdDb250ZW50ICYgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdCYXNlRGV0YWlsUmVsb2FkQ29tcG9uZW50RXh0ZW5zaW9ucyAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQ2hhbmdlQWt0aXZpdGFSZWxvYWRDb21wb25lbnRFeHRlbnNpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5SZXppbURldGFpbHUgPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubGlzdENvbnRyb2xzX3NldHVwKHtcclxuICAgICAgICAgICAgICAgICAgICByb3dUb0R0bzogZnVuY3Rpb24gKGdyaWRTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ1RhYk1hbmFnZXIgPSB0aGF0LmZpbmQoXCIuZ3RhYm1hbmFnZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnVGFiTWFuYWdlciAhPSBudWxsICYmIGdUYWJNYW5hZ2VyICE9IHVuZGVmaW5lZCkgYWN0aXZlID0gZ1RhYk1hbmFnZXIuZ3RhYm1hbmFnZXIoXCJnZXRBY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IFJlemltOiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuVmlldywgSXhwVWtvbjogZ3JpZFN0YXRlLmN1cnJlbnRSb3cuZGF0YS5peHBfdWtvbiwgc2VsZWN0ZWRUYWJHcm91cDogYWN0aXZlIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0SXRlbVRlbXBsYXRlOiBcImpyZXM6MjUyMDAzODZcIiwgLy9SQyAyNTIwMDM4NiA6IE7DoXNsZWR1asOtY8OtIHrDoXpuYW08YnI+UElEOiB7aXhwX3Vrb259XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkl0ZW1UZW1wbGF0ZTogXCJqcmVzOjI1MjAwMzg3XCIgLy9SQyAyNTIwMDM4NyA6IFDFmWVkY2hvesOtIHrDoXpuYW08YnI+UElEOiB7aXhwX3Vrb259XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gcHJvIGFrY2kgRVBLIC8vIGNvbXBvbmVudER0by5MemVTY2h2YWxvdmFjaVByb2Nlc1xyXG4gICAgICAgICAgICAvLyBhY3RXZmxDaW5ub3N0aVphZG9zdE9Qb2RwaXMgZW5hYmxlZDogbF9iQWN0aW9uRW5hYmxlZCAmJiBjb21wb25lbnREdG8uTHplUHJpZGF0WmFkb3N0T1BvZHBpcywgdmlzaWJsZTogaXNOb3RUU19TX0RcclxuICAgICAgICAgICAgLy8gYWN0V2ZsQ2lubm9zdGlTY2h2YWxvdmFjaVByb2NlcyBlbmFibGVkOiBsX2JBY3Rpb25FbmFibGVkICYmIGNvbXBvbmVudER0by5MemVTY2h2YWxvdmFjaVByb2Nlc1xyXG4gICAgICAgICAgICB2YXIgbF9iQWN0aW9uRW5hYmxlZCA9ICh0aGF0LlJlemltRGV0YWlsdSA9PT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LkVkaXRhY2UpID8gZmFsc2UgOiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hZnRlckRlbGV0ZSA9IF9hZnRlckRlbGV0ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlQWN0aW9ucyA9IGZ1bmN0aW9uIChlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5hY3Rpb25zLmFjdFZsb3ppdEVsT2JyYXohLmVuYWJsZWQoIWVuYWJsZSAmJiB0aGF0Lm1vZGVsLlBlcm1pc3Npb25zLkNhblVwZGF0ZS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQuYWN0aW9ucy5hY3RLb252ZXJ0b3ZhdFNjaHZhbGl0IS5lbmFibGVkKCFlbmFibGUpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFZsb3ppdERvU3Bpc3UhLmVuYWJsZWQoIWVuYWJsZSAmJiB0aGF0Lm1vZGVsLlBlcm1pc3Npb25zLkNhblZsb3ppdERvU3Bpc3UudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdEtlU2NodmFsZW5pIS5lbmFibGVkKCFlbmFibGUgJiYgdGhhdC5tb2RlbC5QZXJtaXNzaW9ucy5DYW5LZVNjaHZhbGVuaS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U2NodmFsaXQhLmVuYWJsZWQoIWVuYWJsZSAmJiB0aGF0Lm1vZGVsLlBlcm1pc3Npb25zLkNhblNjaHZhbGl0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTdG9ybm92YXQhLmVuYWJsZWQoIWVuYWJsZSAmJiB0aGF0Lm1vZGVsLlBlcm1pc3Npb25zLkNhblN0b3Jub3ZhdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0TmFzdGF2aXRMaHV0dSEuZW5hYmxlZCghZW5hYmxlICYmIHRoYXQubW9kZWwuUGVybWlzc2lvbnMuQ2FuTmFzdGF2aXRMaHV0dS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0TmFieXRQcmF2bmlNb2MhLmVuYWJsZWQoIWVuYWJsZSAmJiB0aGF0Lm1vZGVsLlBlcm1pc3Npb25zLkNhbk5hYnl0UHJhdm5pTW9jLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3REZXRhaWxEb2t1bWVudHUhLmVuYWJsZWQoIWVuYWJsZSAmJiB0aGF0Lm1vZGVsLlBlcm1pc3Npb25zLkNhbkRldGFpbERva3VtZW50dS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsRG9rdW1lbnR1IS52aXNpYmxlKHRoYXQubW9kZWwuUGVybWlzc2lvbnMuQ2FuRGV0YWlsRG9rdW1lbnR1LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5hY3Rpb25zLmFjdERldGFpbERva3VtZW50dSEudmlzaWJsZSghZW5hYmxlICYmIHRoYXQubW9kZWwuUGVybWlzc2lvbnMuQ2FuRGV0YWlsRG9rdW1lbnR1LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQb2t5bnkhLmVuYWJsZWQoIWVuYWJsZSAmJiB0aGF0Lm1vZGVsLlBlcm1pc3Npb25zLkNhblBva3lueS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VnpvciEuZW5hYmxlZCghZW5hYmxlICYmIHRoYXQubW9kZWwuUGVybWlzc2lvbnMuQ2FuVnpvci52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UG96bmFta2EhLmVuYWJsZWQoIWVuYWJsZSAmJiB0aGF0Lm1vZGVsLlBlcm1pc3Npb25zLkNhblBvem5hbWthLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUaXNrU2FibG9ueSEuZW5hYmxlZCghZW5hYmxlICYmIHRoYXQubW9kZWwuUGVybWlzc2lvbnMuQ2FuVGlza1NhYmxvbnkudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE9kZXNsYXQhLmVuYWJsZWQoIWVuYWJsZSAmJiB0aGF0Lm1vZGVsLlBlcm1pc3Npb25zLkNhbk9kZXNsYXQudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcmlsb2h5IS5lbmFibGVkKCFlbmFibGUpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFdmbENpbm5vc3RpWmFkb3N0T1BvZHBpcyEuZW5hYmxlZCghZW5hYmxlICYmIGxfYkFjdGlvbkVuYWJsZWQgJiYgdGhhdC5tb2RlbC5QZXJtaXNzaW9ucy5MemVQcmlkYXRaYWRvc3RPUG9kcGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RXZmxDaW5ub3N0aVNjaHZhbG92YWNpUHJvY2VzIS5lbmFibGVkKCFlbmFibGUgJiYgbF9iQWN0aW9uRW5hYmxlZCAmJiB0aGF0Lm1vZGVsLlBlcm1pc3Npb25zLkx6ZVphcmFkaXREb1NjaHZhbG92YWNpaG9Qcm9jZXN1LnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmNoYW5nZUFrdGl2aXRhQ29tcG9uZW50RW5hYmxlQWN0aW9ucyhlbmFibGUpO1xyXG4gICAgICAgICAgICAgICAgJC5jb250ZW50PEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HU3ViTGlzdENvbnRyb2w+KHRoYXQuZG90Y1N1YmpVa29udVRhYikuZW5hYmxlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFmdGVyTG9hZERhdGEgPSBmdW5jdGlvbiAoY29udGVudDogR0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxSZWxvYWRDb21wb25lbnRFeHRlbnNpb25zKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9tID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlYWRPbmx5ID0gdGhhdC5SZXppbURldGFpbHUgPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXc7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ1RhYk1hbmFnZXIgPSB0aGF0LmZpbmQoXCIuZ3RhYm1hbmFnZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlYWRPbmx5KSBnVGFiTWFuYWdlci5ndGFibWFuYWdlcihcInNldEFjdGl2ZVwiLCBcInRhYkdyb3VwWmFrbGFkbmlcIik7XHJcbiAgICAgICAgICAgICAgICBnVGFiTWFuYWdlci5ndGFibWFuYWdlcihcInZpc2libGVHcm91cFwiLCBcInRhYkdyb3VwRG90Y1N1YmpVa29udVwiLCByZWFkT25seSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFmdGVyTG9hZERhdGFGb3JUYWIodGhpcy5kb3RjU3VialVrb251VGFiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9tO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWZ0ZXJMb2FkRGF0YUZvclRhYih0YWJDb250cm9sOiBKUXVlcnk8SFRNTEVsZW1lbnQ+KSB7XHJcbiAgICAgICAgICAgIGlmICh0YWJDb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDbnQgPSAkLmNvbnRlbnQ8R29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbD4odGFiQ29udHJvbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFiQ250ICE9IG51bGwgJiYgdHlwZW9mICh0YWJDbnQucmVsb2FkRGF0YSkgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYkNudC5yZWxvYWREYXRhKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncmlkQ291bnQgPSAkLmNvbnRlbnQ8R29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbD4odGhpcy5kb3RjU3VialVrb251VGFiKS5ncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5nZXRDb3VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZENvdW50ID4gMCkgdGhpcy5ncmlkSGFzUm93cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlRm9ybSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVGb3JtKCk6IFwiKTtcclxuICAgICAgICAgICAgdmFyIHJlYWRPbmx5ID0gdGhhdC5SZXppbURldGFpbHUgPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXc7XHJcbiAgICAgICAgICAgIHZhciBuZW5pTm92eSA9IHRoaXMuUmV6aW0gIT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1Lk5ldztcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJqcmVzOjI1MjAwNDAxXCIsIG9wZW5lZDogdHJ1ZSB9KSAvL1JDIDI1MjAwNDAxIDogRGV0YWlsIMO6a29udVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBjdXN0b21DbGFzczogXCJ3LTEyXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTC0yLTEwLTAsIE0tNC04LTAsIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDAyNVwiKSAvL1JDIDI1MjAwMDI1IDogSWRlbnQuXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy00XCIsIHsgbmFtZTogXCJpeHBfdWtvblwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctOFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJFbGVrdHJvbmlja3lPYnJhelRpdGxlXCIsIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVFZGl0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE90ZXZyaXRIbGF2bmlQcmlsb2h1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IEdBY3Rpb24uY2FwdGlvblZpc2liaWxpdHkubmV2ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjUyMDA0NDhcIiwgLy9SQyAyNTIwMDQ0OCA6IE90ZXbFmcOtdCBobGF2bsOtIHDFmcOtbG9odVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogcmVhZE9ubHkgJiYgdGhhdC5tb2RlbC5FbGVrdHJvbmlja3lPYnJhelRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuT3RldnJlbmlFbGVrdHJvbmlja2Vob09icmF6dSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgw7prb251XCIpIC8vUkMgMjUyMDAyMTMgOiBEcnVoIMO6a29udVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3ByY3N0dUR0bygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3VrblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnN0YXZfdWtuPXZhbHVlLnN0YXZfdWtuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IHN0YXZfdWtuOiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB7IHN0YXZfdWtuOiAwIH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7IG5hbWU6IFwic3Rhdl91a25cIiwgbW9kZWw6IFwibW9kZWwuc3Rhdl91a249dmFsdWVcIiwgZGlzYWJsZWQ6IHJlYWRPbmx5LCBmbGFnOiBcInJlcXVpcmVkXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDIxM1wiKSAvL1JDIDI1MjAwMjEzIDogRHJ1aCDDumtvbnVcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNwcnNkdWtEdG8oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQYW5lbE9wdHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwiS29tcGxldG5pIGZpbHRyXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozNTYwMDAwNlwiKSAvL1JDIDM1NjAwMDA2IDogRHJ1aCDDumtvbnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF92eWJlcnVfZHJ1aHVfdWtvbnVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3Z5YmVydV9kcnVodV91a29udSA9IHZhbHVlXCIsIC8vIHJhZGlvYnV0dG9uIG5lbmkgZ3NlbGVjdGJveCA9PiBqZWhvIGhvZG5vdGEgamUgY2lzbG8gbmVuaSB0byBvYmpla3QsIHByb3RvIHRhbSBuZW5pIHZhbHVlLnR5cF92eWJlcnVfZHJ1aHVfdWtvbnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGxhYmVsOiBcImpyZXM6MjUyMDAyMjhcIiwgdmFsdWU6IDEgfSwgLy9SQyAyNTIwMDIyOCA6IMOaa29uIG5hdsOhemFuw70gbmEgZHJ1aCDFmcOtemVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbGFiZWw6IFwianJlczoyNTIwMDIyOVwiLCB2YWx1ZTogMiB9LCAvL1JDIDI1MjAwMjI5IDogw5prb24gb2JlY27DqSBtZXRvZGlreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBsYWJlbDogXCJqcmVzOjI1MjAwMjMwXCIsIHZhbHVlOiAzIH0sIC8vUkMgMjUyMDAyMzAgOiBPYmzDrWJlbsO9IMO6a29uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGxhYmVsOiBcImpyZXM6MjUyMDAyMzFcIiwgdmFsdWU6IDQgfSAvL1JDIDI1MjAwMjMxIDogw5prb24gbmVuYXbDoXphbsO9IG5hIGRydWggxZnDrXplbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogMSAvLyBvem5hY2VueSByYWRpb2J1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidnliZXJfdHlwdV9maWx0ZXJQYW5lbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zaW1wbGVNb2RlOiB0cnVlLCAvLyB6YWtvbWVudG92w6FubyBwcm8gb3ByYXZ1IEJTICEgemppc3RpdCwgemRhIGplIHBvdMWZZWJhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdG9yYWdlU2VydmljZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0xMi0xMi0wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0SXRlbVRlbXBsYXRlOiBcIntkZXNjcmlwdGlvbn1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXI6IFtcIkNyZWF0ZVBhbmVsXCIsIFwiQ2hvc2VGaWx0ZXJcIiwgXCJDbGVhckZpbHRlclwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyAvL3BvY2F0ZWNuaSBuYXN0YXZlbmkgZmlsdHJ1LCBkYSBzZSBqZXN0ZSBzZWxla3RvcnUgcmljdCwgemUgbmVtYSBwcmkgb3RldnJlbmkgaGxlZGF0LCB2IHRvbSBwcmlwYWRlIGJ5IHNlIG11c2VsYSBzbWF6YXQgaSBwb2NhdGVjbmkgaG9kbm90YSB1IHJhZGlvYnV0dG9udVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3Z5YmVydV9kcnVodV91a29udTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19kc3I6IHRoYXQuSXhzRHNyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0ZWQ6IHRoaXMuZWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyc0hhbmRsZXI6IChmaWx0ZXJzKSA9PiB7ICAgIC8vVnl0dm9yaXQgbm92eSghKSBvYmpla3QsIGtkZSBidWRlIGplbiB0bywgY28gbHplIG1lbml0IChuZW5pIGZpeG5pKS4gTmVzYWhhdCBuYSBmaWx0ZXJzLCBqZSB0dSBqZW4gcHJvIHppc2thbmkgYWt0dWFsbmkgaG9kbm90eS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHR5cF92eWJlcnVfZHJ1aHVfdWtvbnU6IGZpbHRlcnNbXCJ0eXBfdnliZXJ1X2RydWh1X3Vrb251XCJdIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZHVrXCIsIG1vZGVsOiBcIm1vZGVsLml4c19kdWs9dmFsdWUuaXhzX2R1aywgbW9kZWwudG9waWNfcG9reW4gPSB2YWx1ZS50b3BpY19wb2t5biwgbW9kZWwudG9waWNfdnpvciA9IHZhbHVlLnRvcGljX3Z6b3IsIG1vZGVsLnRvcGljX3Bvem4gPSB2YWx1ZS50b3BpY19wb3puXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHJlYWRPbmx5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgaXhzX2RzcjogW3RoYXQuSXhzRHNyXSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJNaW5MZW5ndGg6IDEwMCwgICAvLyB2IHBvZHN0YXRlIHpuZWFrdGl2bmkgYXV0b2NvbXBsZXRlLCBrdGVyeSBqZSBjaHlibnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZsZFZlYyA9IHRoYXQuZmluZEZpZWxkcyhcIlZlY1NTTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWxWZWMgPSBmbGRWZWMuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsVmVjID09IG51bGwgfHwgdmFsVmVjID09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxkVmVjLmdmaWVsZChcInNldFZhbHVlXCIsIGNoYW5nZU9iai52YWx1ZT8ubmF6ZXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZsZERlbGthTEggPSB0aGF0LmZpbmRGaWVsZHMoXCJkZWxrYV9saFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZERlbGthTEguZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY2hhbmdlT2JqLnZhbHVlPy5saHV0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAwMjdcIikgLy9SQyAyNTIwMDAyNyA6IFbEm2NcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVmVjU1NMXCIsIG1vZGVsOiBcIm1vZGVsLlZlY1NTTD12YWx1ZVwiLCBkaXNhYmxlZDogcmVhZE9ubHksIGZsYWc6IFwicmVxdWlyZWRcIiwgbWF4TGVuZ3RoOiAxMDAsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiAxMDAgfSldIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDIxNFwiKSAvL1JDIDI1MjAwMjE0IDogT3puYcSNZW7DrSBkb2suXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJjal9kb2tcIiwgbW9kZWw6IFwibW9kZWwuY2pfZG9rPXZhbHVlXCIsIGRpc2FibGVkOiBuZW5pTm92eSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAwMTRcIikgLy9SQyAyNTIwMDAxNCA6IERhdHVtIHBvZMOhbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctTC0zIHctTS02IHctUy0xMlwiLCB7IG5hbWU6IFwiZGF0X3BvZFwiLCBtb2RlbDogXCJtb2RlbC5kYXRfcG9kPXZhbHVlXCIsIHZhbHVlVHlwZTogXCJkYXRlXCIsIGRpc2FibGVkOiBuZW5pTm92eSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAyMTVcIikgLy9SQyAyNTIwMDIxNSA6IERhdHVtIHZ6bmlrdVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LUwtMyB3LU0tNiB3LVMtMTJcIiwgeyBuYW1lOiBcImRhdF92em5pa3VcIiwgbW9kZWw6IFwibW9kZWwuZGF0X3Z6bmlrdT12YWx1ZVwiLCB2YWx1ZVR5cGU6IFwiZGF0ZVwiLCBkaXNhYmxlZDogcmVhZE9ubHksIGZsYWc6IFwicmVxdWlyZWRcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIHZ5cHJhdmVuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy1MLTMgdy1NLTYgdy1TLTEyXCIsIHsgbmFtZTogXCJkYXRfdnlwcmF2ZW5pXCIsIG1vZGVsOiBcImRhdF92eXByYXZlbmlcIiwgdmFsdWVUeXBlOiBcImRhdGVcIiwgZGlzYWJsZWQ6IG5lbmlOb3Z5IH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlwiLCBcInctMVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy1MLTMgdy1NLTMgdy1TLTNcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic192eXByYXZlbm9cIiwgbW9kZWw6IFwibW9kZWwuc192eXByYXZlbm9cIiwgZGlzYWJsZWQ6IG5lbmlOb3Z5LCBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAobW9kZWxWYWx1ZSkgeyByZXR1cm4gbW9kZWxWYWx1ZSA9PT0gMTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdDogZnVuY3Rpb24gKGZpZWxkVmFsdWUpIHsgcmV0dXJuIGZpZWxkVmFsdWUgPT09IHRydWUgPyAxIDogMDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVnlwcmF2ZW5vXCJcclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gZG9ydcSNZW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LUwtMyB3LU0tNiB3LVMtMTJcIiwgeyBuYW1lOiBcImRhdF9kb3J1Y2VuaVwiLCBtb2RlbDogXCJkYXRfZG9ydWNlbmlcIiwgdmFsdWVUeXBlOiBcImRhdGVcIiwgZGlzYWJsZWQ6IG5lbmlOb3Z5IH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlwiLCBcInctMVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy1MLTMgdy1NLTMgdy1TLTNcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic19kb3J1Y2Vub1wiLCBtb2RlbDogXCJtb2RlbC5zX2RvcnVjZW5vXCIsIGRpc2FibGVkOiBuZW5pTm92eSwgbW9kZWxWYWx1ZVRyYW5zZm9ybToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKG1vZGVsVmFsdWUpIHsgcmV0dXJuIG1vZGVsVmFsdWUgPT09IDE7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Q6IGZ1bmN0aW9uIChmaWVsZFZhbHVlKSB7IHJldHVybiBmaWVsZFZhbHVlID09PSB0cnVlID8gMSA6IDA7IH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRvcnXEjWVub1wiXHJcbiAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwMjE2XCIpIC8vUkMgMjUyMDAyMTYgOiBMaMWvdGEgKHZlIGRuZWNoKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctTC0xIHctTS0yIHctUy02XCIsIHsgbmFtZTogXCJkZWxrYV9saFwiLCBtb2RlbDogXCJtb2RlbC5kZWxrYV9saD12YWx1ZVwiLCBkaXNhYmxlZDogcmVhZE9ubHkgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwMjE3XCIpIC8vUkMgMjUyMDAyMTcgOiBMaMWvdGEgb2QsIGRvXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctTC0zIHctTS02IHctUy0xMlwiLCB7IG5hbWU6IFwiZGF0X29kXCIsIG1vZGVsOiBcIm1vZGVsLmRhdF9vZD12YWx1ZVwiLCB2YWx1ZVR5cGU6IFwiZGF0ZVwiLCBkaXNhYmxlZDogbmVuaU5vdnkgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy1MLTMgdy1NLTYgdy1TLTEyXCIsIHsgbmFtZTogXCJkYXRfbGh1dGFcIiwgbW9kZWw6IFwibW9kZWwuZGF0X2xodXRhPXZhbHVlXCIsIHZhbHVlVHlwZTogXCJkYXRlXCIsIGRpc2FibGVkOiBuZW5pTm92eSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAxMjBcIikgLy9SQyAyNTIwMDEyMCA6IFByw6F2bsOtIG1vY1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LUwtMyB3LU0tNiB3LVMtMTJcIiwgeyBuYW1lOiBcIkRhdFByTW9jXCIsIG1vZGVsOiBcIm1vZGVsLkRhdFByTW9jPXZhbHVlXCIsIHZhbHVlVHlwZTogXCJkYXRlXCIsIGRpc2FibGVkOiBuZW5pTm92eSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAwNThcIikgLy9SQyAyNTIwMDA1OCA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG96bmFta2FcIiwgZGlzYWJsZWQ6IHJlYWRPbmx5LCByb3dzOiA0IH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDIxOFwiKSAvL1JDIDI1MjAwMjE4IDogRG9iYSB0cnbDoW7DrSDDumtvbnUgW2hvZF0sIFttaW5dXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy1MLTEgdy1NLTIgdy1TLTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9iYV90cnZhbmlfaG9kXCIsIGRpc2FibGVkOiByZWFkT25seSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZHRvLmRvYmFfdHJ2YW5pIC8gNjApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLmRvYmFfdHJ2YW5pID0gZHRvLmRvYmFfdHJ2YW5pIC0gKGR0by5kb2JhX3RydmFuaSAvIDYwICogNjApOyAvLyBvZHN0cmFuaXQgc3RhcmUgaG9kaW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLmRvYmFfdHJ2YW5pID0gZHRvLmRvYmFfdHJ2YW5pICsgKHBhcnNlSW50KCQodGhpcykuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikpICogNjApOyAvLyBwcmlkYXQgbm92ZSBob2RpbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZG9iYV90cnZhbmlcIjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDAsIG1heDogOTkgfSldLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc3RlcDogMSAvLyB2dWJlYyBuaWMgbmVkZWxhXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctTC0xIHctTS0yIHctUy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRvYmFfdHJ2YW5pX21pblwiLCBkaXNhYmxlZDogcmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldFZhbHVlXCIsIGR0by5kb2JhX3RydmFuaSAlIDYwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5kb2JhX3RydmFuaSA9IGR0by5kb2JhX3RydmFuaSAtIChkdG8uZG9iYV90cnZhbmkgJSA2MCk7IC8vIG9kc3RyYW5pdCBzdGFyZSBtaW51dHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uZG9iYV90cnZhbmkgPSBkdG8uZG9iYV90cnZhbmkgKyAocGFyc2VJbnQoJCh0aGlzKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSkpOyAvLyBwcmlkYXQgbm92ZSBtaW51dHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZG9iYV90cnZhbmlcIjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDAsIG1heDogNTkgfSldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgR2V0Q3VzdG9tRHRvUHJvVGlzaygpOiBHb3JkaWMuU3ByLkludGVyZmFjZS5HVGlza1BhcmFtc1Vrb25EdG8ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpeHBfdWtvbjogdGhhdC5tb2RlbC5peHBfdWtvbiwgIC8vIHRoYXQuZmluZEZpZWxkcyhcIml4cF91a29uXCIpLmdmaWVsZChcImdldFZhbHVlXCIpLml4cF91a29uLFxyXG4gICAgICAgICAgICAgICAgaXhzX2R1azogdGhhdC5tb2RlbC5peHNfZHVrLCAgICAvLyB0aGF0LmZpbmRGaWVsZHMoXCJpeHNfZHVrXCIpLmdmaWVsZChcImdldFZhbHVlXCIpLml4c19kdWssXHJcbiAgICAgICAgICAgICAgICBpeHNfZHNyOiB0aGF0Lkl4c0RzclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIEtvbnZlcnRvdmF0U2NodmFsaXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLb252ZXJ0b3ZhdFNjaHZhbGl0XCIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgUGFyb3ZhdFByaVNjaHZhbGVuaSgpOiBKUXVlcnlQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBhcm92YXRQcmlTY2h2YWxlbmlcIik7XHJcbiAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsLnNfdnlyaXogPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuUGFyYW1fU3ByUmFkUGFyY2ogPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczoyNTIwMDE3NFwiLCBcImpyZXM6MjUyMDAyNDFcIiwgR0RsZy5tYmJZZXNObywgR0RsZy5tYmlRdWVzdGlvbikgLy9SQyAyNTIwMDI0MSA6IENoY2V0ZSBww6Fyb3ZhdCB0ZW50byB2ecWZaXp1asOtY8OtIGRva3VtZW50IHMgaW5pY2lhxI1uw61tIGRva3VtZW50ZW0/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcInllc1wiLCBmdW5jdGlvbiAoKSB7IGRlZi5yZXNvbHZlKHRydWUpOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJub1wiLCBmdW5jdGlvbiAoKSB7IGRlZi5yZXNvbHZlKGZhbHNlKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKCkgeyBkZWYucmVqZWN0KCk7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhhdC5QYXJhbV9TcHJSYWRQYXJjaiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVnliZXJEZW5pa3UoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmNhbGwoXCJWeWJlckRlbmlrdU5lZWRlZFwiLCB7fSkuZG9uZSgobmVlZGVkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmVlZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJiZWZvcmUgVnliZXJEZW5pa3VEbGdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlNzbC5EaWFsb2dzLlZ5YmVyRGVuaWt1RGxnKHRoYXQsIG51bGwpPy5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChldiwgc2VsZWN0ZWREZW5paykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbGVjdGVkRGVuaWtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkRGVuaWspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWREZW5paykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKHNlbGVjdGVkRGVuaWsuZGVuaWsgPz8gXCJcIikgKyBcInxcIiArIChzZWxlY3RlZERlbmlrLnBvcmFkaSA/PyBcIlwiKSArIFwifFwiICsgKHNlbGVjdGVkRGVuaWsucm9rID8/IFwiXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShcIlwiKTtcclxuXHJcbiAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFZ5YmVyRG9rdW1lbnR1SW5pdENqKHBhcm92YXQ6IGJvb2xlYW4pOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5tb2RlbC5zX3Z5cml6ID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LlBhcmFtX1NwclJhZFBhcmNqICE9IDAgJiYgcGFyb3ZhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgodGhhdC5tb2RlbC53ZmxfaXhwX2luaXRfdnlyaXogPz8gXCJcIikgIT0gXCJcIiAmJiB0aGF0LlBhcmFtX1NwclJhZFZwYXJjaiAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93V2luZG93KFtcIkdvcmRpYy5TcHIuV2ViQXBwLkdWeWJlckRva3VtZW50dVByb1ZhemJ1Q0pcIiwge31dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJeHBTcGlzOiB0aGF0Lkl4cFNwaXMgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgd2lkdGg6IDg1MCwgbW9kYWw6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsdWUgIT0gdW5kZWZpbmVkICYmIHJldFZhbHVlLkl4cCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmV0VmFsdWUuSXhwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUocmV0VmFsdWUuSXhwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh0aGF0Lm1vZGVsLndmbF9peHBfaW5pdF9pbml0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVmxveml0RG9TcGlzdSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZsb3ppdERvU3Bpc3VcIik7XHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwianJlczoyNTMwMDAyNFwiKSAvL1JDIDI1MzAwMDI0IDogQ2hjZXRlIGRva3VtZW50IMO6a29udSB2bG/Fvml0IGRvIHNwaXN1P1xyXG4gICAgICAgICAgICAgICAgLm9uKCdjbG9zZScsIChldiwgcmV0VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsdWUgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYWxsKFwiVmxveml0RG9TcGlzdVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBVa29uOiB0aGF0Lm1vZGVsLml4cF91a29uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0Wm1lbmE6IHRoYXQubW9kZWwuZGF0X3ptZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1a29uIHZsb3plbiBkbyBzcGlzdVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem1lbmEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fcmVsb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgS2VTY2h2YWxlbmkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLZVNjaHZhbGVuaVwiKTtcclxuICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJqcmVzOjI1MzAwMDIyXCIpIC8vUkMgMjUzMDAwMjIgOiBDaGNldGUgdWtvbsSNaXQgcHLDoWNpIG5hIGtvbmNlcHR1IGRva3VtZW50dT9cclxuICAgICAgICAgICAgICAgIC5vbignY2xvc2UnLCAoZXYsIHJldFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbHVlID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2FsbChcIktlU2NodmFsZW5pXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cFVrb246IHRoYXQubW9kZWwuaXhwX3Vrb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRabWVuYTogdGhhdC5tb2RlbC5kYXRfem1lbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVrb24ga2Ugc2NodmFsZW5pXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56bWVuYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9yZWxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBTY2h2YWxpdCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNjaHZhbGl0VWtvblwiKTtcclxuICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJqcmVzOjI1MjAwMjQwXCIpIC8vUkMgMjUyMDAyNDAgOiBDaGNldGUgb3ByYXZkdSBzY2h2w6FsaXQgw7prb24/XHJcbiAgICAgICAgICAgICAgICAub24oJ2Nsb3NlJywgKGV2LCByZXRWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWx1ZSA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBhcm92YXRQcmlTY2h2YWxlbmkoKS50aGVuKGZ1bmN0aW9uIChwYXJvdmF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhcm92YXQgLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGFyb3ZhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlZ5YmVyRGVuaWt1KCkudGhlbihmdW5jdGlvbiAoc2VsZWN0ZWREZW5paykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VsZWN0ZWREZW5pazJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWREZW5payk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5WeWJlckRva3VtZW50dUluaXRDaihwYXJvdmF0KS50aGVuKGZ1bmN0aW9uIChJeHApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJeHAgeiBWeWJlckRva3VtZW50dUluaXRDalwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSXhwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYWxsKFwiU2NodmFsaXRVa29uXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cFVrb246IHRoYXQubW9kZWwuaXhwX3Vrb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRabWVuYTogdGhhdC5tb2RlbC5kYXRfem1lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJvdmF0OiBwYXJvdmF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREZW5pazogc2VsZWN0ZWREZW5payxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cEluaXRDajogSXhwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1a29uIHNjaHZhbGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56bWVuYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9yZWxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgU3Rvcm5vdmF0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3Rvcm5vdmF0XCIpO1xyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcImpyZXM6MjUyMDAyNzJcIikgLy9SQyAyNTIwMDI3MiA6IENoY2V0ZSBvcHJhdmR1IHN0b3Jub3ZhdCDDumtvbj9cclxuICAgICAgICAgICAgICAgIC5vbignY2xvc2UnLCAoZXYsIHJldFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbHVlID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX3NMYWJlbCA9IFwianJlczoyNTIwMDI2NFwiOyAvL1JDIDI1MjAwMjY0IDogRMWvdm9kIHN0b3Jub3bDoW7DrSBkb2t1bWVudHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnByb21wdChcImpyZXM6MjUyMDAyNjNcIiwgbF9zTGFiZWwpLm9uKFwib2tcIiwgZnVuY3Rpb24gKGV2LCBkdXZvZCkgeyAvL1JDIDI1MjAwMjYzIDogRMWvdm9kIHN0b3Jub3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR1dm9kICYmIChkdXZvZC50cmltKCkgIT0gXCJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJTdG9ybm92YXRVa29uXCIsIHsgaXhwVWtvbjogdGhhdC5tb2RlbC5peHBfdWtvbiwgZGF0Wm1lbmE6IHRoYXQubW9kZWwuZGF0X3ptZW5hLCBkdXZvZFN0b3JuYTogZHV2b2QgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1a29uIHN0b3Jub3ZhblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem1lbmEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSh7IFptZW5hOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjI1MjAwMjY1XCIpOyAvL1JDIDI1MjAwMjY1IDogSmUgbnV0bsOpIHV2w6lzdCBkxa92b2Qgc3Rvcm5vdsOhbsOtIGRva3VtZW50dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTmFzdGF2aXRMaHV0dSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5hc3Rhdml0TGh1dHVcIik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5TcHIuRGlhbG9ncy5WeXBvY2V0TGh1dHlEbGcoXHJcbiAgICAgICAgICAgICAgICB0aGF0LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIERhdHVtWmFoYWplbmk6IG5ldyBEYXRlKCksIC8vICB0aGF0Lm1vZGVsLmRhdF9vZCxcclxuICAgICAgICAgICAgICAgICAgICBQb2NldERudTogdGhhdC5tb2RlbC5kZWxrYV9saCxcclxuICAgICAgICAgICAgICAgICAgICBTaG93T2tCdXR0b246IHRydWVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvd1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldCAhPSB1bmRlZmluZWQgJiYgcmV0LlZ5cG9jZXRMaHV0eSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYWxsKFwiTmFzdGF2aXRMaHV0dVVrb251XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cFVrb246IHRoYXQubW9kZWwuaXhwX3Vrb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBTcGlzOiB0aGF0Lm1vZGVsLml4cF9zcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0T2Q6IHJldC5WeXBvY2V0TGh1dHkuZGF0X3phaGFqZW5pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0TGh1dGE6IHJldC5WeXBvY2V0TGh1dHkuZGF0X2xodXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0Wm1lbmE6IHRoYXQubW9kZWwuZGF0X3ptZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmFzdGF2ZW5hIGxodXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem1lbmEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3JlbG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBOYWJ5dFByYXZuaU1vYygpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5hYnl0UHJhdm5pTW9jXCIpO1xyXG4gICAgICAgICAgICB2YXIgZm9ybURlZiA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDI3MFwiLCB0cnVlKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgbmFtZTogXCJEYXRQck1vY1wiLCBtb2RlbDogXCJEYXRQck1vY1wiLCB2YWx1ZVR5cGU6IFwiZGF0ZVwiIH0pOyAgLy9SQyAyNTIwMDI3MCA6IERhdHVtIG5hYnl0w60gcHLDoXZuw60gbW9jaVxyXG4gICAgICAgICAgICB2YXIgZGxnID0gdGhpcy5kaWFsb2dzLnNpbXBsZUZvcm0oXCJqcmVzOjI1MjAwMjcxXCIsIGZvcm1EZWYsIHsgRGF0UHJNb2M6IHRoYXQubW9kZWwuRGF0UHJNb2MgfSwgeyBoZWlnaHQ6IDIwMCwgbW9kYWw6IHRydWUsIG5vQ2xvc2U6IGZhbHNlIH0pOyAgLy9SQyAyNTIwMDI3MSA6IE5hYnl0w60gcHLDoXZuw60gbW9jaVxyXG4gICAgICAgICAgICBkbGcub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0UHJNb2NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmV0VmFsLkRhdFByTW9jKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJOYWJ5dFByYXZuaU1vY1wiLCB7IGl4cFVrb246IHRoYXQubW9kZWwuaXhwX3Vrb24sIGRhdFByTW9jOiByZXRWYWwuRGF0UHJNb2MgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGVyck1lcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyck1lcyA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJuYWJ5dGEgcHJhdm5pIG1vY1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnptZW5hID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9yZWxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KGVyck1lcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgRGV0YWlsRG9rdW1lbnR1KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGV0YWlsRG9rdW1lbnR1XCIpO1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIERldGFpbER0bzogeyBpeHA6IHRoYXQubW9kZWwuaXhwX3Vrb24gfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBHb3JkaWMuV2ZsLkRpYWxvZ3MuRGV0YWlsRG9rdW1lbnR1U3Bpc3UodGhhdCwgb3B0aW9ucywgR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBQb2t5bnkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQb2t5bnlcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFZ6b3IoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJWem9yXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBQb3puYW1rYSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBvem5hbWthXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBUaXNrU2FibG9ueSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRpc2tTYWJsb255XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBPdGV2cmVuaUVsZWt0cm9uaWNrZWhvT2JyYXp1KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3RldnJlbmlFbGVrdHJvbmlja2Vob09icmF6dSAtIHN0YXJ0XCIpO1xyXG4gICAgICAgICAgICAoKEdvcmRpYy5XZmwpIGFzIGFueSkuQXR0YWNobWVudFV0aWxzLkdldEZhdm9yaXRlKHRoaXMsIHRoYXQubW9kZWwuaXhwX3Vrb24pLnRoZW4oKGF0dER0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgR29yZGljLldmbC5BdHRhY2htZW50VXRpbHMuT3BlbkF0dGFjaG1lbnQodGhhdCwgYXR0RHRvLCB0cnVlLCBmYWxzZSwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGFyZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPdGV2cmVuaUVsZWt0cm9uaWNrZWhvT2JyYXp1IC0gZG9uZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJkb2MuZG93bmxvYWRDb21wbGV0ZWRcIiwgdGhpcywgYXJncyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoeGhyLCB0eXBlLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPdGV2cmVuaUVsZWt0cm9uaWNrZWhvT2JyYXp1IC0gZmFpbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIE9kZXNsYXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPZGVzbGF0XCIpO1xyXG4gICAgICAgICAgICB0aGF0LmNhbGwoXCJQcmlwcmF2aXRPZGVzbGFuaVwiLCB7XHJcbiAgICAgICAgICAgICAgICBpeHBVa29uOiB0aGF0Lm1vZGVsLml4cF91a29uXHJcbiAgICAgICAgICAgIH0pLmRvbmUoKHBvY2V0UHJpcHJhdmVueWNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Ympla3R5IHByaXByYXZlbmUgayBvZGVzbGFuaVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2lmIChwb2NldFByaXByYXZlbnljaCA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIEdvcmRpYy5XZmwuRGlhbG9ncy5HT2Rlc2xhbmlEbGcoXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdCxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIEhyb21hZG5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBHZW5lcm92YXRTZXpuYW1PZGVzbGFueWNoOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBHb3JkaWMuR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvd1xyXG4gICAgICAgICAgICAgICAgLy8gICAgKS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuY2FsbChcIk9kc3RyYW5pdFN1Ympla3R5S09kZXNsYW5pXCIsIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgaXhwVWtvbjogdGhhdC5tb2RlbC5peHBfdWtvblxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH0pLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBHb3JkaWMuV2ZsLkRpYWxvZ3MuR09kZXNsYW5pRGxnKHRoYXQsIHsgSXhwOiB0aGF0Lm1vZGVsLml4cF91a29uIH0sIEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy90aGF0LnptZW5hID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy90aGF0Ll9yZWxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgLy9lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuV2ZsLkRpYWxvZ3MuR09kZXNsYW5pRGxnKHRoYXQsIHsgSXhwOiB0aGF0Lm1vZGVsLml4cF91a29uIH0sIEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93KTtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQuX3JlbG9hZERhdGEoKTtcclxuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgS29udmVyemVQZGYoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLb252ZXJ6ZVBkZlwiKTtcclxuICAgICAgICAgICAgR29yZGljLldmbC5EaWFsb2dzLkdLb252ZXJ6ZVBkZkRsZyh0aGF0LCB7IEl4cDogdGhhdC5tb2RlbC5peHBfdWtvbiB9LCBHaW4uR2xvYmFscy5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3cpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoYXJncykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiS29udmVyemVQZGYgLSBkb25lXCIsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiS29udmVyemVQZGYgLSBmYWlsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iaik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBfcmVsb2FkRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIGdUYWJNYW5hZ2VyID0gdGhpcy5maW5kKFwiLmd0YWJtYW5hZ2VyXCIpO1xyXG4gICAgICAgICAgICB2YXIgYWN0aXZlO1xyXG4gICAgICAgICAgICBpZiAoZ1RhYk1hbmFnZXIgIT0gbnVsbCAmJiBnVGFiTWFuYWdlciAhPSB1bmRlZmluZWQpIGFjdGl2ZSA9IGdUYWJNYW5hZ2VyLmd0YWJtYW5hZ2VyKFwiZ2V0QWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnptZW5hID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkKHsgUmV6aW1EZXRhaWx1OiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuVmlldywgaW50ZXJuYWw6IHRydWUsIHNlbGVjdGVkVGFiR3JvdXA6IGFjdGl2ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgWmFkb3N0T1BvZHBpcygpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgb3BzID0gR29yZGljLldmbC5XZWJDbGllbnQuV2ZsT3BzLldmbE9wc0VudW07XHJcbiAgICAgICAgICAgIHZhciBldmVudE5hbWUgPSBHb3JkaWMuV2ZsLldlYkNsaWVudC5XZmxPcHMuZXZlbnROYW1lO1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIExpc3RJeHA6IHRoYXQubW9kZWwuaXhwX3Vrb24sXHJcbiAgICAgICAgICAgICAgICBIcm9tYWRuYUFrY2U6IGZhbHNlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuRGlhbG9ncy5aYWRvc3RPUG9kcGlzKHRoYXQsIG9wdGlvbnMpLmRvbmUoZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5hbGVydChcImpyZXM6MjUzMDAwMDhcIik7IC8vUkMgMjUzMDAwMDggOiDDmnNwxJvFoW7EmyB2bG/FvmVubyBkbyBwb2RwaXNvdsOpIGtuaWh5XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmVsZW1lbnQudHJpZ2dlcihldmVudE5hbWUsIEdvcmRpYy5XZmwuV2ViQ2xpZW50LldmbE9wcy5wcmVwYXJlT3B0cyhvcHMuemFkb3N0T1BvZHBpcywgXCJqcmVzOjI1NTAwMzE2XCIsIFwiZy1zdGF0ZS1zdWNjZXNzXCIpKTsgLy9SQyAyNTUwMDMxNiA6IMOac3DEm8WhbsSbIHZsb8W+ZW5vIGRvIHBvZHBpc292w6kga25paHlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFNjaHZhbG92YWNpUHJvY2VzKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBvcHMgPSBHb3JkaWMuV2ZsLldlYkNsaWVudC5XZmxPcHMuV2ZsT3BzRW51bTtcclxuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9IEdvcmRpYy5XZmwuV2ViQ2xpZW50LldmbE9wcy5ldmVudE5hbWU7XHJcbiAgICAgICAgICAgIHZhciBtb2RPdGV2cmVuaSA9IEdpbi5HbG9iYWxzLkVudW1zLk1vZE90ZXZyZW5pO1xyXG4gICAgICAgICAgICB2YXIgb3B0ID0ge1xyXG4gICAgICAgICAgICAgICAgSXhwOiB0aGF0Lm1vZGVsLml4cF91a29uICAgIC8vaXhwX3NwaXNcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuRGlhbG9ncy5HU2NodmFsb3ZhY2lQcm9jZXNQb3phZGF2ZWtEbGcodGhpcywgb3B0LCBtb2RPdGV2cmVuaS5uYXZpZ2F0ZSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0dmFsKSB7ICAgLy8gJiYgcmV0dmFsLnN0YXYpIHtcXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9yZWxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5kaWFsb2dzLmFsZXJ0KFwianJlczoyNTMwMDAwOVwiKTsgLy9SQyAyNTMwMDAwOSA6IMOac3DEm8WhbsSbIHZsb8W+ZW5vIGRvIHNjaHZhbG92YWPDrWhvIHByb2Nlc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmVsZW1lbnQudHJpZ2dlcihldmVudE5hbWUsIEdvcmRpYy5XZmwuV2ViQ2xpZW50LldmbE9wcy5wcmVwYXJlT3B0cyhvcHMuc2NodmFsb3ZhY2lQcm9jZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9ICAgICAgIFxyXG5cclxuICAgICAgICBwcml2YXRlIGZvcm1hdERhdHVtKGRhdGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGlmICghZGF0ZSkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBwYXJ0cyA9IGRhdGUuc3BsaXQoJy0nKTtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnRzWzJdICsgJy4nICsgcGFydHNbMV0gKyAnLicgKyBwYXJ0c1swXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=
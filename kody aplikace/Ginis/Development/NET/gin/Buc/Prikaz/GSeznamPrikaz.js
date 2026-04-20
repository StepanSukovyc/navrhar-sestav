"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            /**
             * fieldNames - enum pro nazvy policek
             *
             * @author vblabla
             * @since 490.1.0.37
             */
            let filterFieldNames;
            (function (filterFieldNames) {
                filterFieldNames["banka"] = "nazev_sbu";
                filterFieldNames["ucetVl"] = "ucetVlastni";
                filterFieldNames["splatnost"] = "dat_spl";
                filterFieldNames["castka"] = "c";
                filterFieldNames["castkaVMene"] = "c_mena";
                filterFieldNames["mena"] = "mena";
                filterFieldNames["typPrikazu"] = "typPrikazu";
                filterFieldNames["typAgendy"] = "typ_ag";
                filterFieldNames["ucetPrijemce"] = "bu_ci";
                filterFieldNames["variabilniSymbol"] = "vs";
                filterFieldNames["konstantniSymbol"] = "ks";
                filterFieldNames["specifickySymbol"] = "ss";
                filterFieldNames["zpusobUhrady"] = "zp";
                filterFieldNames["identifikator"] = "ixp";
                filterFieldNames["uus"] = "uus";
            })(filterFieldNames || (filterFieldNames = {}));
            /**
             * GSeznamPrikaz
             *
             * @author vblabla
             * @since 490.1.0.39
             */
            let GSeznamPrikaz = class GSeznamPrikaz extends Gordic.GContentBase {
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    let that = this;
                    that.call("VlozitVsechnyPrikazyDoPracSeznamu", { filters: [] }).then((dataIkc) => {
                        that.ikc = dataIkc;
                        // akce seznamu
                        this.actions.addRange({
                            actDetail: Gordic.Eko.Action.actionDetail({ enabled: true, run: function () { that.detail(); } }),
                            actDavka: { caption: "jres:33140015", icon: "gi-generate |gi-list gi-bgw  gi-stack-pos--rb", enabled: (that.Permissions?.LzeGenerovat.value ? true : false), run: function () { that.zaplatitDavkou(); }, tooltip: (that.Permissions?.LzeGenerovat.message != undefined ? that.Permissions.LzeGenerovat.message : "jres:33140016") }, //RC 33140016 : Zaplatit dávkou
                            actPozastavit: { caption: "jres:33140017", icon: "gi-window-close", enabled: (that.Permissions?.LzePozastavit.value ? true : false), run: function () { that.pozastavitPrikazy(); }, tooltip: (that.Permissions?.LzePozastavit.message != undefined ? that.Permissions.LzePozastavit.message : "jres:33140017") }, //RC 33140017 : Pozastavit
                            actTisk: { caption: "jres:33140018", icon: "gi-print", enabled: (that.Permissions?.LzeTisknout.value ? true : false), run: function () { }, tooltip: (that.Permissions?.LzeTisknout.message != undefined ? that.Permissions?.LzeTisknout.message : "jres:33140019") }, //RC 33140019 : Zaplatit tiskem
                            //actPridatDoPorovnani: Gordic.Eko.Action.actionPridatDoPorovnani({ run: function () { BucGrid.Comparator.add(that); }, enabled: true, visible: true }),
                        });
                        // menubar
                        this.menuBar(this.actions.createBar([{ action: this.actions.actDetail, primary: true, favorite: true }, { action: this.actions.actDavka, favorite: true }, { action: this.actions.actPozastavit, favorite: true }, { action: this.actions.actTisk, favorite: true }, /*{ action: this.actions.actPridatDoPorovnani, favorite: true }*/]));
                        // breadcrumbs - vyřešeno pomocí title v C# (název úlohy musí být zapsán v knize)
                        //this.setBreadcrumbs([{ caption: "jres:33140020", defaultAction: true }]); //RC 33140020 : Příkazy
                        // filtry
                        let filterFormDef = new Gordic.Forms.Form({ name: "filterForm", tabLabel: "jres:33140021" }) //RC 33140021 : Filtr příkazů
                            .addSection("")
                            .addRow("jres:33140022") //RC 33140022 : Banka
                            .addField("gselectbox", Gordic.Prefabs.Select.bucspba(), {
                            name: filterFieldNames.banka, //name: "nazev_sbu",
                            model: "model.sk_vl=value.sk_vl;model.sbu=value.sbu",
                            disabled: false,
                            change: function (ev, changeObj) {
                                that.ixs_esu = that.sk_vl = that.nazev_sbu = that.naz_ban = that.mis_pob = that.sbu = undefined;
                                if (changeObj.value != undefined && that.element.gfilterpanel != undefined) {
                                    $(ev.target).closest(".gform").findFields(filterFieldNames.ucetVl).gfield("option", "serverFilters", { pristupKBU: 1, urovenPristupuKBU: 1, rezimVyberuDleKnihy: 0, sk_vl: changeObj.value.sk_vl });
                                }
                                else {
                                    $(ev.target).closest(".gform").findFields(filterFieldNames.ucetVl).gfield("option", "serverFilters", { pristupKBU: 1, urovenPristupuKBU: 1, rezimVyberuDleKnihy: 0, /*rok: that.Rok*/ /*sk_vl: "0100"*/ });
                                    that.bankaDto = {};
                                }
                                if (changeObj != undefined && changeObj.value != undefined && changeObj.value.sk_vl != undefined
                                    && changeObj.value.ixs_esu != undefined && changeObj.value.nazev_sbu != undefined
                                    && changeObj.value.naz_ban != undefined && changeObj.value.mis_pob != undefined && changeObj.value.sbu != undefined) {
                                    that.ixs_esu = changeObj.value.ixs_esu;
                                    that.sk_vl = changeObj.value.sk_vl;
                                    that.nazev_sbu = changeObj.value.nazev_sbu;
                                    that.naz_ban = changeObj.value.naz_ban;
                                    that.mis_pob = changeObj.value.mis_pob;
                                    that.sbu = changeObj.value.sbu;
                                    that.bankaDto = changeObj.value;
                                }
                            }
                        })
                            .addRow("jres:33140023") //RC 33140023 : Účet vlastní
                            .addField("gselectbox", Gordic.Prefabs.Select.ekosuvl(), {
                            name: filterFieldNames.ucetVl,
                            model: "bu_vl=bu_vl",
                            serverFilters: { pristupKBU: 1, urovenPristupuKBU: 1, rezimVyberuDleKnihy: 0 },
                        })
                            .addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "date",
                            label: "jres:33140024", //RC 33140024 : Splatnost od-do
                            name: filterFieldNames.splatnost
                        }))
                            .addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "number",
                            label: "jres:33140025", //RC 33140025 : Částka  od-do
                            name: filterFieldNames.castka,
                            customOptFieldEnd: { model: "model.c.start=value" },
                            customOptFieldStart: { model: "model.c.end=value" },
                            customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null, modelValueTransform: { apply: function (modelValue) { return (modelValue < 0) ? modelValue * (-1) : modelValue; }, collect: function (fieldValue) { return (fieldValue != null) ? fieldValue.d[0] * (-1) : fieldValue; } } })
                        }))
                            .addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "number",
                            label: "jres:33140026", //RC 33140026 : Částka v měně od-do
                            name: filterFieldNames.castkaVMene,
                            customOptFieldEnd: { model: "model.c_mena.start=value" },
                            customOptFieldStart: { model: "model.c_mena.end=value" },
                            customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null, modelValueTransform: { apply: function (modelValue) { return (modelValue < 0) ? modelValue * (-1) : modelValue; }, collect: function (fieldValue) { return (fieldValue != null) ? fieldValue.d[0] * (-1) : fieldValue; } } })
                        }))
                            .addRow("jres:33140027").addField("gselectbox", Gordic.Prefabs.Select.ekocmen(), {
                            name: filterFieldNames.mena,
                            model: "mena=mena"
                        })
                            .addRow("jres:33140028").addField("gselectbox", {
                            name: filterFieldNames.typPrikazu, model: "upl",
                            data: [0, 20, 40], multi: true, list: true, itemWidth: "", itemTemplate: function (value) { return (value == 0) ? "Domácí" : (value == 20) ? "Zahraniční" : (value == 40) ? "SEPA" : " "; }
                        })
                            .addRow("jres:33140029").addField("gselectbox", Gordic.Prefabs.Select.ginctag(), {
                            name: filterFieldNames.typAgendy,
                            model: "typ_ag=typ_ag",
                            multi: true,
                            list: true,
                            itemWidth: "",
                            itemTooltipTemplate: "{typ_ag_txt}",
                            serverFilters: { typ_ag: Gordic.Buc.Globals.Enums.TypAgBuc.TypAgPovoleneBuc },
                        })
                            .addRow("jres:33140030") //RC 33140030 : Účet příjemce
                            .addField("gselectbox", Gordic.Prefabs.Select.ekosuciBezEsu(), {
                            name: filterFieldNames.ucetPrijemce,
                            model: "bu_ci=bu_ci;sk_ci=sk_ci", /*helperColumns: ["bu_ci", "sk_ci", "nazev_sbu", "mena", "bic"] */
                        })
                            //.addRow("Účet příjemce").addField("gselectbox", Gordic.Prefabs.Select.ekosuci(), { name: "bu_ci", model: "bu_ci=bu_ci;sk_ci=sk_ci",/*helperColumns: ["bu_ci", "sk_ci", "nazev_sbu", "mena", "bic"] */ })
                            .addRow({ hint: "jres:33140031", label: "VS" }) //RC 33140032 : Variabilní symbol
                            .addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                            name: filterFieldNames.variabilniSymbol,
                            tooltip: "jres:33140032"
                        })
                            .addRow({ hint: "jres:33140033", label: "KS" }) //RC 33140033 : Konstantní symbol
                            .addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                            name: filterFieldNames.konstantniSymbol
                        })
                            .addRow({ hint: "jres:33140034", label: "SS" }) //RC 33140034 : Specifický symbol
                            .addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                            name: filterFieldNames.specifickySymbol
                        })
                            .addRow("jres:33140035") //RC 33140035 : Způsob úhrady
                            .addField("gselectbox", Gordic.Prefabs.Select.ekocizp(), {
                            name: filterFieldNames.zpusobUhrady,
                            model: "zp=zp",
                            serverFilters: { zp: Gordic.Buc.Globals.Enums.ZpBuc.ZpPovoleneBuc },
                        })
                            .addRow("jres:33140036") //RC 33140036 : Identifikátor
                            .addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                            name: filterFieldNames.identifikator
                        });
                        if (that.uusFilter == "1") {
                            filterFormDef.addRow("jres:33140037") //RC 33140037 : UUS
                                .addField("gstringbox", {
                                name: filterFieldNames.uus
                            });
                        }
                        let filterParams = Gordic.Eko.Filters.getFilterParams([filterFormDef], ["nazev_sbu"], "buc_ptm_opiprig", null, function (event, obj) {
                            // načtení dat podle filtrů
                            //that.nacteniSeznamu(obj.filter);
                            that.element.find(".SeznamBuc.ggrid").gcover({ text: "jres:33140038" }); //RC 33140038 : Načítání platebních příkazů
                            $.when().done(function (result) {
                            }).always(function () {
                                that.endOperation();
                            });
                        });
                        filterParams.filterViewMode = FilterViewMode.Normal;
                        filterParams.poVyhledaniZobrazit = "OblibenePodminky";
                        filterParams.collectData = (ev, ctx) => {
                        };
                        that.$filterForm = $.newDiv().appendTo(that.element)
                            .gfilterpanel(filterParams);
                        //that.viewPrikazy = new Gordic.Isl.View(that.isl.Prikaz.list(rq => { return { filters: { s_uhrp: 10, ikc: that.ikc} } }), { filterPanel: this.filterPanel, startEmpty: true });
                        that.viewPrikazy = new Gordic.Isl.View(that.isl.Prikaz.list(rq => rq), {
                            filterPanel: that.$filterForm,
                            key: that.PrimaryKey,
                            startEmpty: true
                        });
                        // grid
                        $.newDiv("SeznamBuc")
                            .css("height", "100%")
                            .appendTo(that.element)
                            .ggrid(WebClient.BucGrid.Prikaz.getGridOptions(that, undefined, //gridFormat,
                        that.actions.actDetail, function (ev, obj) {
                            // aktualizace stavu okna a náhledu podle aktuálně vybrané položky
                            //if (that.previewController) {
                            //    if (obj != null && obj.cellInfo != null && obj.cellInfo.data != null) {
                            //        // TODO: pokud by bylo potřeba řešit nastavení okna po přesunu po gridu, tak to odkomentovat, ale práva záznamová práva se aktuálně neřeší
                            //        //that.enable();
                            //        that.previewController.enable(true);
                            //        that.previewController.show(obj.cellInfo.data);
                            //    }
                            //    else {
                            //        // TODO: může tohle vůbec nastat?
                            //        that.previewController.enable(false);
                            //    }
                            //}
                        }, (cellContext) => WebClient.BucGrid.getContextMenuParams(cellContext, (cellContext) => that.actions.createBar(that.getMenuActions(true, cellContext))), 
                        // TODO: přidat data do metod getGridOptions? asi ano, protože view budu předávat všude
                        {
                            data: that.viewPrikazy,
                            defaultProfile: {
                                name: "jres:33140104", //rc 33140104 : výchozí
                                columnList: [
                                    "upl_zkr" /* Interface.GPrikazDtoNames.upl_zkr */,
                                    "s_uhrp_zkr" /* Interface.GPrikazDtoNames.s_uhrp_zkr */,
                                    "bu_vl" /* Interface.GPrikazDtoNames.bu_vl */,
                                    "sk_vl" /* Interface.GPrikazDtoNames.sk_vl */,
                                    "bu_ci" /* Interface.GPrikazDtoNames.bu_ci */,
                                    "sk_ci" /* Interface.GPrikazDtoNames.sk_ci */,
                                    "c" /* Interface.GPrikazDtoNames.c */,
                                    "mena_txt" /* Interface.GPrikazDtoNames.mena_txt */,
                                    "c_mena" /* Interface.GPrikazDtoNames.c_mena */,
                                    "dat_spl" /* Interface.GPrikazDtoNames.dat_spl */,
                                    "dat_spl_ag" /* Interface.GPrikazDtoNames.dat_spl_ag */,
                                    "vs" /* Interface.GPrikazDtoNames.vs */,
                                    "ks" /* Interface.GPrikazDtoNames.ks */,
                                    "ss" /* Interface.GPrikazDtoNames.ss */,
                                    "zp_zkr" /* Interface.GPrikazDtoNames.zp_zkr */,
                                    "zkr_ag" /* Interface.GPrikazDtoNames.zkr_ag */,
                                    "ac" /* Interface.GPrikazDtoNames.ac */,
                                    "nazev" /* Interface.GPrikazDtoNames.nazev */,
                                    "ico" /* Interface.GPrikazDtoNames.ico */,
                                    "ixp" /* Interface.GPrikazDtoNames.ixp */,
                                    "popis" /* Interface.GPrikazDtoNames.popis */,
                                    "dic" /* Interface.GPrikazDtoNames.dic */,
                                    "uus" /* Interface.GPrikazDtoNames.uus */,
                                ].toString()
                            },
                            profiles: [
                                {
                                    //dalsi profil pohledu
                                    //name: "jni7", //rc 33140105 : zjednodušený
                                    name: "jres:33140105", //rc 33140105 : zjednodušený
                                    columnList: [
                                        "upl_zkr" /* Interface.GPrikazDtoNames.upl_zkr */,
                                        "s_uhrp_zkr" /* Interface.GPrikazDtoNames.s_uhrp_zkr */,
                                        "bu_vl" /* Interface.GPrikazDtoNames.bu_vl */,
                                        "sk_vl" /* Interface.GPrikazDtoNames.sk_vl */,
                                        "c" /* Interface.GPrikazDtoNames.c */,
                                        "mena_txt" /* Interface.GPrikazDtoNames.mena_txt */,
                                        "c_mena" /* Interface.GPrikazDtoNames.c_mena */,
                                        "dat_spl" /* Interface.GPrikazDtoNames.dat_spl */,
                                        "vs" /* Interface.GPrikazDtoNames.vs */,
                                        "zp_zkr" /* Interface.GPrikazDtoNames.zp_zkr */,
                                        "zkr_ag" /* Interface.GPrikazDtoNames.zkr_ag */,
                                        "ac" /* Interface.GPrikazDtoNames.ac */,
                                        "nazev" /* Interface.GPrikazDtoNames.nazev */,
                                        "ico" /* Interface.GPrikazDtoNames.ico */,
                                        "ixp" /* Interface.GPrikazDtoNames.ixp */,
                                        "popis" /* Interface.GPrikazDtoNames.popis */,
                                        "dic" /* Interface.GPrikazDtoNames.dic */,
                                        "uus" /* Interface.GPrikazDtoNames.uus */,
                                    ].toString()
                                },
                            ],
                            selection: function (ev, obj) {
                                // aktualizace stavu okna a náhledu podle aktuálně vybrané položky
                                if (that.previewController) {
                                    if (obj != null && obj.getSelection()[0] != null && obj.getSelection()[0] != null) {
                                        // TODO: pokud by bylo potřeba řešit nastavení okna po přesunu po gridu, tak to odkomentovat, ale práva záznamová práva se aktuálně neřeší
                                        //that.enable();
                                        that.previewController.enable(true);
                                        that.previewController.show(obj.getSelection()[0]);
                                    }
                                    else {
                                        // TODO: může tohle vůbec nastat?
                                        that.previewController.enable(false);
                                    }
                                }
                            }
                        }))
                            //{
                            //columnMode: "full",
                            ////test přiřadit view do vlastnosti data: daného gridu
                            ////data: that.viewBanky,
                            //data: that.viewPrikazy,
                            //multi: true,
                            //rowNumbers: true,
                            //// obslužná akce pro doubleclick pro zobrazení detailu platby
                            //defaultAction: that.actions.actDetail,
                            ////rowsCheckVisible: (row) => Eko.Grid.getRowsCheckVisible(row), //Příprava na součtový řádek - zatím nerealizováno
                            ////rowsClass: (row) => Eko.Grid.getRowsClass(row), //Příprava na součtový řádek - zatím nerealizováno
                            //// TODO: nebo použít selection místo cellActivate?
                            //cellActivate: function (ev, obj) {
                            //    // aktualizace stavu okna a náhledu podle aktuálně vybrané položky
                            //    if (obj != null && obj.cellInfo != null && obj.cellInfo.data != null) {
                            //        that.enable();
                            //        that.previewController.enable(true);
                            //        that.previewController.show(obj.cellInfo.data);
                            //    } else {
                            //        // TODO: může tohle vůbec nastat?
                            //        that.previewController.enable(false);
                            //    }
                            //},
                            //// TODO: upravit:
                            ////searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                            //columns: BucGrid.Prikaz.createGridFormat(that),
                            //defaultProfile: BucGrid.Prikaz.getGridProfilesPrikaz(false)[0],
                            //    profiles: BucGrid.Prikaz.getGridProfilesPrikaz(false),
                            //})
                            //.ggrid<Gordic.Buc.Interface.GPrikazDto>(
                            //    BucGrid.Prikaz.getGridOptions(
                            //        that,
                            //        undefined,//gridFormat,
                            //        that.actions.actDetail,
                            //        function (ev, obj) {
                            //            // aktualizace stavu okna a náhledu podle aktuálně vybrané položky
                            //            if (that.previewController) {
                            //                if (obj != null && obj.cellInfo != null && obj.cellInfo.data != null) {
                            //                    // TODO: pokud by bylo potřeba řešit nastavení okna po přesunu po gridu, tak to odkomentovat, ale práva záznamová práva se aktuálně neřeší
                            //                    //that.enable();
                            //                    that.previewController.enable(true);
                            //                    that.previewController.show(obj.cellInfo.data);
                            //                }
                            //                else {
                            //                    // TODO: může tohle vůbec nastat?
                            //                    that.previewController.enable(false);
                            //                }
                            //            }
                            //        },
                            //        (cellContext) => BucGrid.getContextMenuParams(cellContext, (cellContext) => that.actions.createBar(that.getMenuActions(true, cellContext))),
                            //        // TODO: přidat data do metod getGridOptions? asi ano, protože view budu předávat všude
                            //        { data: that.viewPrikazy }
                            //    )
                            //)
                            .ggrideko({
                            // součtový řádek
                            summaryRowAllowed: true,
                            summaryRowColumns: ["c", "c_mena"],
                            //To do: Doplnit omezení velikosti zobrazených dat
                            //longListAllowed: true,
                            //longListModel: "Global.Buc.AppSettings",
                            //longListCountMethod: (rq) => that.isl.Prikaz.listCount(rq).get(),
                            //longListModifyRqMethod: (rq) => BucGrid.modifyListRequest(that, rq)
                        })
                            .gautofit();
                        // obsluha změny v gridu
                        that.viewPrikazy.on("change", function (ev, ctx) {
                            that.enable();
                        });
                        let focusFunc = function () {
                            that.element.find(".SeznamBuc.ggrid").ggrid("focus");
                            that.viewPrikazy.off("change.focus", focusFunc);
                        };
                        that.viewPrikazy.on("change.focus", focusFunc);
                        // náhled v pravém bočním panelu
                        this.element.gsidebar("option", { right: { width: 200, visible: false, leafsAutoHide: false, pinned: true } });
                        let previewPanelsDefinition = {
                            tabs: [
                                Gordic.Previews.getDefaultPreviewTab({
                                    //linkProvider: function (loadParams) { return Gordic.WebApp.Utility.createCommandUrl(null, "OpenDetail", { ixp: loadParams.pla_ixp }, { ticketType: Gordic.Enums.TicketType.WithLoginAndContext }) },
                                    viewId: "buc:Prikaz"
                                }),
                                //Boční panel pro porovnání příkazů
                                //Gordic.Previews.getFilePreviewTab({
                                //    ixpProvider: function (loadParams) { return loadParams.ixp; }
                                //})
                            ]
                        };
                        this.previewController = new Gordic.Previews.GPreviewController(this.element, previewPanelsDefinition);
                        this.previewController.registerPanel();
                        // porovnání
                        //BucGrid.Comparator.create(that);
                        // oprávnění
                        ///*Gordic.Isl*/this.isl.Prikaz.getServicePermissions()
                        //    .get()
                        //    .done(function (perm) {
                        //        // oprávnění (bez naplnění seznamu)
                        //        that.permissions = perm;
                        //        // nastavení okna
                        //        that.enable();
                        //    });
                        // nastavení okna
                        //this.enable();
                    });
                }
                /**
                 * Naplnění seznamu plateb případů
                 *
                 * @param {any} [filterModel] aktuální filtry
                 */
                //private nacteniSeznamu(filterModel?: any): void {
                //    let that = this;
                //    // načtení dat do gridu
                //    if (filterModel === undefined || filterModel === null) {
                //        this.$filterForm.gfilterpanel("applyFilter");
                //        // nastavení okna
                //        that.enable();
                //    }
                //    else {
                //        // načtení dat do seznamu
                //        filterModel = filterModel || {};
                //        // zapamatování aktuálního filtru kvůli tiskům
                //        this.currentFilter = filterModel;
                //        // načtení seznamu
                //        // objekt pro předávání hodnot
                //        interface returnObjType {
                //            data: Gordic.Buc.Interface.GPrikazDto[] | null
                //        };
                //        let returnObj: returnObjType = {
                //            data: null
                //        };
                //        // deferred objekt pro zřetězení otázek
                //        let def = $.Deferred().resolve(returnObj).promise();
                //        // obsluha jednotlivých fází
                //        this.beginOperation("Načítám data");
                //        def.then(function (returnObj: returnObjType) {
                //            let def = $.Deferred();
                //            // načtení dat
                //            /*Gordic.Isl*/
                //            that.isl.Prikaz.list(rq => { return { filters: that.currentFilter! }; })
                //                .get()
                //                .done(function (response) {
                //                    returnObj.data = response.data;
                //                    that.permissions = <Gordic.Buc.Interface.GPrikazServicePermission>response.servicePermissions;
                //                    def.resolve(returnObj);
                //                })
                //                .fail(function () {
                //                    // operace nedopadla
                //                    def.reject();
                //                });
                //            return def.promise();
                //        })
                //            .then(function (returnObj: returnObjType) {
                //                let def = $.Deferred();
                //                // úprava dat
                //                BucGrid.Prikaz.modifyDto(returnObj.data)
                //                    .done(function (data) {
                //                        returnObj.data = data;
                //                        def.resolve(returnObj);
                //                    });
                //                return def.promise();
                //            })
                //            .done(function (returnObj: returnObjType) {
                //                // pohled
                //                let view = new Gordic.Data.View(returnObj.data!, { key: "ixp,radek_uhr" });
                //                // nastavení dat a překreslení gridu
                //                that.element.find(".SeznamBuc.ggrid").ggrid("setData", view);
                //                // nastavení okna
                //                that.enable();
                //            })
                //            .always(function () {
                //                that.endOperation();
                //            });
                //    }
                //}
                /**
                 * Naplnění jednoho řádku do seznamu plateb
                 *
                 * @param {any} filterPK filtr pro aktualizaci dat
                 * @param {any} $grid (default = undefined) grid, který má být aktualizován (vždy je navíc aktualizován základní seznamový grid)
                 */
                //private nacteniRadku(filterPK: any, $grid: any = undefined): void {
                //    let that = this;
                //    // volání obecné metody pro načtení řádku
                //    BucGrid.reloadRow(
                //        that,
                //        (rq) => { return that.isl.Prikaz.list(rq); },
                //        BucGrid.Prikaz.modifyDto,
                //        () => that.enable(),
                //        filterPK,
                //        $grid
                //    );
                //}
                /**
                 * Zobrazení detailu prikazu
                 */
                detail() {
                    let that = this;
                    // aktuální vybraná položka
                    const $grid = this.element.find(".SeznamBuc.ggrid");
                    const aktRadek = $grid.ggrid("activeRow");
                    if (aktRadek && !(aktRadek instanceof jQuery)) {
                        // otevření detailu
                        let $detailWindow = this.navigate(["Gordic.Buc.WebClient.GDetailPrikaz", { gridRemoteControl: new Gordic.Components.GridRC($grid), ikc: that.ikc }], {
                            ID: 'DetailPrikaz#',
                            ixp: aktRadek?.ixp,
                            radek_uhr: aktRadek?.radek_uhr,
                            ikc: that.ikc
                        });
                        // obsluha aktivní operace na detailu
                        //$.content($detailWindow).on(BucDetail.triggerChange, (retVal: any) => {
                        //    // záznam byl změně, musí se načíst znovu
                        //    if (retVal != null && retVal.data && retVal.data.ixs_esu && retVal.data.sbu && retVal.data.ixs_esu != null && retVal.data.sbu != null) {
                        //        that.nacteniRadku({ ixs_esu: retVal.data.ixs_esu, sbu: retVal.data.sbu });
                        //    }
                        //});
                    }
                }
                /**
                 * pozastavitPrikazy
                 *
                 * @param {JQuery} $grid
                 */
                pozastavitPrikazy() {
                    let that = this;
                    const $grid = this.element.find(".SeznamBuc.ggrid");
                    var gridRows = $grid.ggrid("getSelection");
                    that.dialogs.confirm("jres:33140039", "jres:33140040" + gridRows.length + "jres:33140041") //RC 33140041 : ]?
                        .on("yes", function () {
                        var def = $.Deferred();
                        that.actions.getActions().filter(obj => {
                            return obj.name === "actPozastavit";
                        })[0].setPending(def.promise());
                        that.isl.Prikaz.pozastav({ ikc: that.ikc, rows: gridRows, data: { ikc: that.ikc, rows: gridRows } })
                            .get().done(function (data) {
                            def.resolve();
                            that.viewPrikazy.requestData();
                            that.notification("showToast", { icon: "fa-check-circle g-state-text g-state-success", id: "pozastavPrikaz", state: "success", title: "jres:33140106", content: "jres:33140107" }); //RC 33140107 : Vybrané příkazy byby úspěšně pozastaveny
                        }).fail(function (data) {
                            def.reject();
                        });
                    })
                        .on("close", function () {
                        return;
                    });
                }
                /**
                 * Zobrazení akce pro zaplaceni prikazu pomoci pruvodce generovani davkou
                 */
                zaplatitDavkou() {
                    const that = this;
                    //Vybrane radky
                    const vybraneRadky = this.element.find(".SeznamBuc.ggrid").ggrid("getSelection");
                    //if (that.bankaDto.sk_vl != undefined) {
                    //    that.navigate("Gordic.Buc.WebClient.GPlatbaDavkou", { vybraneRadky: vybraneRadky, bankaDto: that.bankaDto, ikc: that.ikc })
                    //        .on("close", function () {
                    //            that.viewPrikazy.requestData();
                    //        });
                    //}
                    //else {
                    new Gordic.Data.Readers.Bucspba().getData({}).then(function (result) {
                        for (var i = 0; i < result.length; i++) {
                            if (vybraneRadky[0].sk_vl == result[i].sk_vl) {
                                that.bankaDto = result[i];
                            }
                        }
                        that.navigate("Gordic.Buc.WebClient.GPlatbaDavkou", { vybraneRadky: vybraneRadky, bankaDto: that.bankaDto, ikc: that.ikc })
                            .on("close", function () {
                            that.viewPrikazy.requestData();
                        });
                    });
                    //}
                    //})
                }
                /**
                 * Nastavení prvků ve formuláři
                 */
                enable() {
                    // aktuální platba
                    const aktZaznam = this.element.find(".SeznamBuc.ggrid").ggrid("activeRow");
                    // akce seznamu
                    this.actions.actDetail.updatePermission(aktZaznam === null ? { value: false } : this.permissions?.LzeZobrazit);
                }
                /**
                 * Seznam akcí pro menu (hamburger nebo kontextové menu gridu)
                 *
                 * @param {boolean} contextMenu formát pro kontextové menu gridu (true (default) = ano, false = ne)
                 * @param {IGGridCellContext<Gordic.Buc.Interface.GPrikazDto>} [cellContext] kontext z gridu (pouze pro contextMenu = true) (default = undefined)
                 * @returns {any} seznam akcí
                 */
                getMenuActions(contextMenu = false, cellContext) {
                    return contextMenu
                        ? [
                            "actDetail",
                            "actDavka",
                            "actPozastavit",
                            "actTisk"
                            //"actPridatDoPorovnani"
                        ]
                        : [
                            { action: this.actions.actDetail, primary: true, favorite: true },
                            "actDavka",
                            "actObsah",
                            "actPozastavit",
                            "actTisk"
                            //"actPridatDoPorovnani"
                        ];
                }
            };
            GSeznamPrikaz = __decorate([
                gcontent
            ], GSeznamPrikaz);
            WebClient.GSeznamPrikaz = GSeznamPrikaz;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVByaWthei5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1QcmlrYXoudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQWtwQmY7QUFscEJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtwQm5CO0lBbHBCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBa3BCN0I7UUFscEJvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUVuQzs7Ozs7ZUFLRztZQUNILElBQUssZ0JBZ0JKO1lBaEJELFdBQUssZ0JBQWdCO2dCQUNqQix1Q0FBbUIsQ0FBQTtnQkFDbkIsMENBQXNCLENBQUE7Z0JBQ3RCLHlDQUFxQixDQUFBO2dCQUNyQixnQ0FBWSxDQUFBO2dCQUNaLDBDQUFzQixDQUFBO2dCQUN0QixpQ0FBYSxDQUFBO2dCQUNiLDZDQUF5QixDQUFBO2dCQUN6Qix3Q0FBb0IsQ0FBQTtnQkFDcEIsMENBQXNCLENBQUE7Z0JBQ3RCLDJDQUF1QixDQUFBO2dCQUN2QiwyQ0FBdUIsQ0FBQTtnQkFDdkIsMkNBQXVCLENBQUE7Z0JBQ3ZCLHVDQUFtQixDQUFBO2dCQUNuQix5Q0FBcUIsQ0FBQTtnQkFDckIsK0JBQVcsQ0FBQTtZQUNmLENBQUMsRUFoQkksZ0JBQWdCLEtBQWhCLGdCQUFnQixRQWdCcEI7WUFFRDs7Ozs7ZUFLRztZQUVILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQXdJO2dCQVF2Szs7bUJBRUc7Z0JBQ0ksY0FBYztvQkFFakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsSUFBSSxDQUFzQixtQ0FBbUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO3dCQUNsRyxJQUFJLENBQUMsR0FBRyxHQUFH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QUFELENBQUMsRUFscEJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFrcEJuQjtBQUFELENBQUMsRUFscEJTLE1BQU0sS0FBTixNQUFNLFFBa3BCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICBsZXQgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogZmllbGROYW1lcyAtIGVudW0gcHJvIG5henZ5IHBvbGljZWtcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciB2YmxhYmxhXHJcbiAgICAgKiBAc2luY2UgNDkwLjEuMC4zN1xyXG4gICAgICovXHJcbiAgICBlbnVtIGZpbHRlckZpZWxkTmFtZXMge1xyXG4gICAgICAgIGJhbmthID0gXCJuYXpldl9zYnVcIixcclxuICAgICAgICB1Y2V0VmwgPSBcInVjZXRWbGFzdG5pXCIsXHJcbiAgICAgICAgc3BsYXRub3N0ID0gXCJkYXRfc3BsXCIsXHJcbiAgICAgICAgY2FzdGthID0gXCJjXCIsXHJcbiAgICAgICAgY2FzdGthVk1lbmUgPSBcImNfbWVuYVwiLFxyXG4gICAgICAgIG1lbmEgPSBcIm1lbmFcIixcclxuICAgICAgICB0eXBQcmlrYXp1ID0gXCJ0eXBQcmlrYXp1XCIsXHJcbiAgICAgICAgdHlwQWdlbmR5ID0gXCJ0eXBfYWdcIixcclxuICAgICAgICB1Y2V0UHJpamVtY2UgPSBcImJ1X2NpXCIsXHJcbiAgICAgICAgdmFyaWFiaWxuaVN5bWJvbCA9IFwidnNcIixcclxuICAgICAgICBrb25zdGFudG5pU3ltYm9sID0gXCJrc1wiLFxyXG4gICAgICAgIHNwZWNpZmlja3lTeW1ib2wgPSBcInNzXCIsXHJcbiAgICAgICAgenB1c29iVWhyYWR5ID0gXCJ6cFwiLFxyXG4gICAgICAgIGlkZW50aWZpa2F0b3IgPSBcIml4cFwiLFxyXG4gICAgICAgIHV1cyA9IFwidXVzXCIsXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHU2V6bmFtUHJpa2F6XHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgdmJsYWJsYVxyXG4gICAgICogQHNpbmNlIDQ5MC4xLjAuMzlcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbVByaWtheiBleHRlbmRzIEdDb250ZW50QmFzZTxCdWNHcmlkLklHU3RhbmRhcmRCdWNHcmlkPEJ1Yy5JbnRlcmZhY2UuR1ByaWthekR0bywgQnVjLkludGVyZmFjZS5HUHJpa2F6UGVybWlzc2lvbj4gJiBHb3JkaWMuRWtvLlV0aWxzLklHRWtvQm9va0V4dGVuc2lvbj4ge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIElLQ1xyXG4gICAgICAgICAqIEB0eXBlIHtHb3JkaWMuR2VuZXJhbC5HSWtjfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgaWtjOiBHb3JkaWMuR2VuZXJhbC5HSWtjO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWRlZmlub3bDoW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY2FsbDxHb3JkaWMuR2VuZXJhbC5HSWtjPihcIlZsb3ppdFZzZWNobnlQcmlrYXp5RG9QcmFjU2V6bmFtdVwiLCB7IGZpbHRlcnM6IFtdIH0pLnRoZW4oKGRhdGFJa2MpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuaWtjID0gZGF0YUlrY1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gYWtjZSBzZXpuYW11XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7IGVuYWJsZWQ6IHRydWUsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmRldGFpbCgpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0RGF2a2E6IHsgY2FwdGlvbjogXCJqcmVzOjMzMTQwMDE1XCIsIGljb246IFwiZ2ktZ2VuZXJhdGUgfGdpLWxpc3QgZ2ktYmd3ICBnaS1zdGFjay1wb3MtLXJiXCIsIGVuYWJsZWQ6ICh0aGF0LlBlcm1pc3Npb25zPy5MemVHZW5lcm92YXQudmFsdWUgPyB0cnVlIDogZmFsc2UpLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC56YXBsYXRpdERhdmtvdSgpIH0sIHRvb2x0aXA6ICh0aGF0LlBlcm1pc3Npb25zPy5MemVHZW5lcm92YXQubWVzc2FnZSAhPSB1bmRlZmluZWQgPyB0aGF0LlBlcm1pc3Npb25zLkx6ZUdlbmVyb3ZhdC5tZXNzYWdlIDogXCJqcmVzOjMzMTQwMDE2XCIpIH0sICAvL1JDIDMzMTQwMDE2IDogWmFwbGF0aXQgZMOhdmtvdVxyXG4gICAgICAgICAgICAgICAgYWN0UG96YXN0YXZpdDogeyBjYXB0aW9uOiBcImpyZXM6MzMxNDAwMTdcIiwgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIiwgZW5hYmxlZDogKHRoYXQuUGVybWlzc2lvbnM/Lkx6ZVBvemFzdGF2aXQudmFsdWUgPyB0cnVlIDogZmFsc2UpLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5wb3phc3Rhdml0UHJpa2F6eSgpIH0sIHRvb2x0aXA6ICh0aGF0LlBlcm1pc3Npb25zPy5MemVQb3phc3Rhdml0Lm1lc3NhZ2UgIT0gdW5kZWZpbmVkID8gdGhhdC5QZXJtaXNzaW9ucy5MemVQb3phc3Rhdml0Lm1lc3NhZ2UgOiBcImpyZXM6MzMxNDAwMTdcIikgfSwgLy9SQyAzMzE0MDAxNyA6IFBvemFzdGF2aXRcclxuICAgICAgICAgICAgICAgIGFjdFRpc2s6IHsgY2FwdGlvbjogXCJqcmVzOjMzMTQwMDE4XCIsIGljb246IFwiZ2ktcHJpbnRcIiwgZW5hYmxlZDogKHRoYXQuUGVybWlzc2lvbnM/Lkx6ZVRpc2tub3V0LnZhbHVlID8gdHJ1ZSA6IGZhbHNlKSwgcnVuOiBmdW5jdGlvbiAoKSB7IH0sIHRvb2x0aXA6ICh0aGF0LlBlcm1pc3Npb25zPy5MemVUaXNrbm91dC5tZXNzYWdlICE9IHVuZGVmaW5lZCA/IHRoYXQuUGVybWlzc2lvbnM/Lkx6ZVRpc2tub3V0Lm1lc3NhZ2UgOiBcImpyZXM6MzMxNDAwMTlcIikgfSwgLy9SQyAzMzE0MDAxOSA6IFphcGxhdGl0IHRpc2tlbVxyXG4gICAgICAgICAgICAgICAgLy9hY3RQcmlkYXREb1Bvcm92bmFuaTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uUHJpZGF0RG9Qb3Jvdm5hbmkoeyBydW46IGZ1bmN0aW9uICgpIHsgQnVjR3JpZC5Db21wYXJhdG9yLmFkZCh0aGF0KTsgfSwgZW5hYmxlZDogdHJ1ZSwgdmlzaWJsZTogdHJ1ZSB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBtZW51YmFyXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3REZXRhaWwsIHByaW1hcnk6IHRydWUsIGZhdm9yaXRlOiB0cnVlIH0sIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0RGF2a2EsIGZhdm9yaXRlOiB0cnVlIH0sIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0UG96YXN0YXZpdCwgZmF2b3JpdGU6IHRydWUgfSwgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RUaXNrLCBmYXZvcml0ZTogdHJ1ZSB9LCAvKnsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0UHJpZGF0RG9Qb3Jvdm5hbmksIGZhdm9yaXRlOiB0cnVlIH0qL10pKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gYnJlYWRjcnVtYnMgLSB2ecWZZcWhZW5vIHBvbW9jw60gdGl0bGUgdiBDIyAobsOhemV2IMO6bG9oeSBtdXPDrSBiw710IHphcHPDoW4gdiBrbml6ZSlcclxuICAgICAgICAgICAgLy90aGlzLnNldEJyZWFkY3J1bWJzKFt7IGNhcHRpb246IFwianJlczozMzE0MDAyMFwiLCBkZWZhdWx0QWN0aW9uOiB0cnVlIH1dKTsgLy9SQyAzMzE0MDAyMCA6IFDFmcOta2F6eVxyXG4gICAgICAgICAgICAvLyBmaWx0cnlcclxuICAgICAgICAgICAgbGV0IGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZpbHRlckZvcm1cIiwgdGFiTGFiZWw6IFwianJlczozMzE0MDAyMVwiIH0pIC8vUkMgMzMxNDAwMjEgOiBGaWx0ciBwxZnDrWthesWvXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMxNDAwMjJcIikgLy9SQyAzMzE0MDAyMiA6IEJhbmthXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5idWNzcGJhKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBmaWx0ZXJGaWVsZE5hbWVzLmJhbmthLCAgLy9uYW1lOiBcIm5hemV2X3NidVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnNrX3ZsPXZhbHVlLnNrX3ZsO21vZGVsLnNidT12YWx1ZS5zYnVcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lml4c19lc3UgPSB0aGF0LnNrX3ZsID0gdGhhdC5uYXpldl9zYnUgPSB0aGF0Lm5hel9iYW4gPSB0aGF0Lm1pc19wb2IgPSB0aGF0LnNidSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZU9iai52YWx1ZSAhPSB1bmRlZmluZWQgJiYgdGhhdC5lbGVtZW50LmdmaWx0ZXJwYW5lbCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYudGFyZ2V0KS5jbG9zZXN0KFwiLmdmb3JtXCIpLmZpbmRGaWVsZHMoZmlsdGVyRmllbGROYW1lcy51Y2V0VmwpLmdmaWVsZChcIm9wdGlvblwiLCBcInNlcnZlckZpbHRlcnNcIiwgeyBwcmlzdHVwS0JVOiAxLCB1cm92ZW5QcmlzdHVwdUtCVTogMSwgcmV6aW1WeWJlcnVEbGVLbmloeTogMCwgc2tfdmw6IGNoYW5nZU9iai52YWx1ZS5za192bCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldi50YXJnZXQpLmNsb3Nlc3QoXCIuZ2Zvcm1cIikuZmluZEZpZWxkcyhmaWx0ZXJGaWVsZE5hbWVzLnVjZXRWbCkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiLCB7IHByaXN0dXBLQlU6IDEsIHVyb3ZlblByaXN0dXB1S0JVOiAxLCByZXppbVZ5YmVydURsZUtuaWh5OiAwLCAvKnJvazogdGhhdC5Sb2sqLyAvKnNrX3ZsOiBcIjAxMDBcIiovIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJhbmthRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZU9iaiAhPSB1bmRlZmluZWQgJiYgY2hhbmdlT2JqLnZhbHVlICE9IHVuZGVmaW5lZCAmJiBjaGFuZ2VPYmoudmFsdWUuc2tfdmwgIT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBjaGFuZ2VPYmoudmFsdWUuaXhzX2VzdSAhPSB1bmRlZmluZWQgJiYgY2hhbmdlT2JqLnZhbHVlLm5hemV2X3NidSAhPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGNoYW5nZU9iai52YWx1ZS5uYXpfYmFuICE9IHVuZGVmaW5lZCAmJiBjaGFuZ2VPYmoudmFsdWUubWlzX3BvYiAhPSB1bmRlZmluZWQgJiYgY2hhbmdlT2JqLnZhbHVlLnNidSAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXhzX2VzdSA9IGNoYW5nZU9iai52YWx1ZS5peHNfZXN1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5za192bCA9IGNoYW5nZU9iai52YWx1ZS5za192bDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF6ZXZfc2J1ID0gY2hhbmdlT2JqLnZhbHVlLm5hemV2X3NidTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF6X2JhbiA9IGNoYW5nZU9iai52YWx1ZS5uYXpfYmFuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5taXNfcG9iID0gY2hhbmdlT2JqLnZhbHVlLm1pc19wb2I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNidSA9IGNoYW5nZU9iai52YWx1ZS5zYnU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJhbmthRHRvID0gY2hhbmdlT2JqLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMTQwMDIzXCIpICAgICAgIC8vUkMgMzMxNDAwMjMgOiDDmsSNZXQgdmxhc3Ruw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1dmwoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGZpbHRlckZpZWxkTmFtZXMudWNldFZsLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImJ1X3ZsPWJ1X3ZsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyBwcmlzdHVwS0JVOiAxLCB1cm92ZW5QcmlzdHVwdUtCVTogMSwgcmV6aW1WeWJlcnVEbGVLbmloeTogMCB9LFxyXG4gICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMzE0MDAyNFwiLCAgIC8vUkMgMzMxNDAwMjQgOiBTcGxhdG5vc3Qgb2QtZG9cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBmaWx0ZXJGaWVsZE5hbWVzLnNwbGF0bm9zdFxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMzMTQwMDI1XCIsICAgICAgLy9SQyAzMzE0MDAyNSA6IMSMw6FzdGthICBvZC1kb1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGZpbHRlckZpZWxkTmFtZXMuY2FzdGthLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdEZpZWxkRW5kOiB7IG1vZGVsOiBcIm1vZGVsLmMuc3RhcnQ9dmFsdWVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdEZpZWxkU3RhcnQ6IHsgbW9kZWw6IFwibW9kZWwuYy5lbmQ9dmFsdWVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdEFsbDogJC5leHRlbmQoR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgZGVmYXVsdFZhbHVlOiBudWxsLCBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7IGFwcGx5OiBmdW5jdGlvbiAobW9kZWxWYWx1ZSkgeyByZXR1cm4gKG1vZGVsVmFsdWUgPCAwKSA/IG1vZGVsVmFsdWUgKiAoLTEpIDogbW9kZWxWYWx1ZSB9LCBjb2xsZWN0OiBmdW5jdGlvbiAoZmllbGRWYWx1ZSkgeyByZXR1cm4gKGZpZWxkVmFsdWUgIT0gbnVsbCkgPyBmaWVsZFZhbHVlLmRbMF0gKiAoLTEpIDogZmllbGRWYWx1ZSB9IH0gfSlcclxuICAgICAgICAgICAgICAgIH0pKSBcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzMxNDAwMjZcIiwgIC8vUkMgMzMxNDAwMjYgOiDEjMOhc3RrYSB2IG3Em27EmyBvZC1kb1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGZpbHRlckZpZWxkTmFtZXMuY2FzdGthVk1lbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0RmllbGRFbmQ6IHsgbW9kZWw6IFwibW9kZWwuY19tZW5hLnN0YXJ0PXZhbHVlXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRGaWVsZFN0YXJ0OiB7IG1vZGVsOiBcIm1vZGVsLmNfbWVuYS5lbmQ9dmFsdWVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdEFsbDogJC5leHRlbmQoR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgZGVmYXVsdFZhbHVlOiBudWxsLCBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7IGFwcGx5OiBmdW5jdGlvbiAobW9kZWxWYWx1ZSkgeyByZXR1cm4gKG1vZGVsVmFsdWUgPCAwKSA/IG1vZGVsVmFsdWUgKiAoLTEpIDogbW9kZWxWYWx1ZSB9LCBjb2xsZWN0OiBmdW5jdGlvbiAoZmllbGRWYWx1ZSkgeyByZXR1cm4gKGZpZWxkVmFsdWUgIT0gbnVsbCkgPyBmaWVsZFZhbHVlLmRbMF0gKiAoLTEpIDogZmllbGRWYWx1ZSB9IH0gfSlcclxuICAgICAgICAgICAgICAgIH0pKSBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMTQwMDI3XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvY21lbigpLCB7ICAgLy9SQyAzMzE0MDAyNyA6IE3Em25hXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZmlsdGVyRmllbGROYW1lcy5tZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1lbmE9bWVuYVwiXHJcbiAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMTQwMDI4XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7ICAgICAvL1JDIDMzMTQwMDI4IDogVHlwIHDFmcOta2F6dVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGZpbHRlckZpZWxkTmFtZXMudHlwUHJpa2F6dSwgbW9kZWw6IFwidXBsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogWzAsIDIwLCA0MF0sIG11bHRpOiB0cnVlLCBsaXN0OiB0cnVlLCBpdGVtV2lkdGg6IFwiXCIsIGl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiAodmFsdWUgPT0gMCkgPyBcIkRvbcOhY8OtXCIgOiAodmFsdWUgPT0gMjApID8gXCJaYWhyYW5pxI1uw61cIiA6ICh2YWx1ZSA9PSA0MCkgPyBcIlNFUEFcIiA6IFwiIFwiIH1cclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMxNDAwMjlcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jdGFnKCksIHsgIC8vUkMgMzMxNDAwMjkgOiBUeXAgYWdlbmR5XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZmlsdGVyRmllbGROYW1lcy50eXBBZ2VuZHksXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwidHlwX2FnPXR5cF9hZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1Ub29sdGlwVGVtcGxhdGU6IFwie3R5cF9hZ190eHR9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyB0eXBfYWc6IEdvcmRpYy5CdWMuR2xvYmFscy5FbnVtcy5UeXBBZ0J1Yy5UeXBBZ1Bvdm9sZW5lQnVjIH0sXHJcbiAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMTQwMDMwXCIpICAvL1JDIDMzMTQwMDMwIDogw5rEjWV0IHDFmcOtamVtY2VcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1Y2lCZXpFc3UoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGZpbHRlckZpZWxkTmFtZXMudWNldFByaWplbWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImJ1X2NpPWJ1X2NpO3NrX2NpPXNrX2NpXCIsLypoZWxwZXJDb2x1bW5zOiBbXCJidV9jaVwiLCBcInNrX2NpXCIsIFwibmF6ZXZfc2J1XCIsIFwibWVuYVwiLCBcImJpY1wiXSAqL1xyXG4gICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCLDmsSNZXQgcMWZw61qZW1jZVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1Y2koKSwgeyBuYW1lOiBcImJ1X2NpXCIsIG1vZGVsOiBcImJ1X2NpPWJ1X2NpO3NrX2NpPXNrX2NpXCIsLypoZWxwZXJDb2x1bW5zOiBbXCJidV9jaVwiLCBcInNrX2NpXCIsIFwibmF6ZXZfc2J1XCIsIFwibWVuYVwiLCBcImJpY1wiXSAqLyB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGhpbnQ6IFwianJlczozMzE0MDAzMVwiLCBsYWJlbDogXCJWU1wiIH0pICAvL1JDIDMzMTQwMDMyIDogVmFyaWFiaWxuw60gc3ltYm9sXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKEVrby5GaWx0ZXJzLmdldFN0cmluZ09wZXJhdG9ycygpKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGZpbHRlckZpZWxkTmFtZXMudmFyaWFiaWxuaVN5bWJvbCxcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzMxNDAwMzJcIlxyXG4gICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgaGludDogXCJqcmVzOjMzMTQwMDMzXCIsIGxhYmVsOiBcIktTXCIgfSkgICAvL1JDIDMzMTQwMDMzIDogS29uc3RhbnRuw60gc3ltYm9sXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKEVrby5GaWx0ZXJzLmdldFN0cmluZ09wZXJhdG9ycygpKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGZpbHRlckZpZWxkTmFtZXMua29uc3RhbnRuaVN5bWJvbFxyXG4gICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgaGludDogXCJqcmVzOjMzMTQwMDM0XCIsIGxhYmVsOiBcIlNTXCIgfSkgICAvL1JDIDMzMTQwMDM0IDogU3BlY2lmaWNrw70gc3ltYm9sXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKEVrby5GaWx0ZXJzLmdldFN0cmluZ09wZXJhdG9ycygpKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGZpbHRlckZpZWxkTmFtZXMuc3BlY2lmaWNreVN5bWJvbFxyXG4gICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzE0MDAzNVwiKSAgLy9SQyAzMzE0MDAzNSA6IFpwxa9zb2Igw7pocmFkeVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvY2l6cCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZmlsdGVyRmllbGROYW1lcy56cHVzb2JVaHJhZHksXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwienA9enBcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IHpwOiBHb3JkaWMuQnVjLkdsb2JhbHMuRW51bXMuWnBCdWMuWnBQb3ZvbGVuZUJ1YyB9LFxyXG4gICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzE0MDAzNlwiKSAgIC8vUkMgMzMxNDAwMzYgOiBJZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoRWtvLkZpbHRlcnMuZ2V0U3RyaW5nT3BlcmF0b3JzKCkpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGZpbHRlckZpZWxkTmFtZXMuaWRlbnRpZmlrYXRvclxyXG4gICAgICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQudXVzRmlsdGVyID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyRm9ybURlZi5hZGRSb3coXCJqcmVzOjMzMTQwMDM3XCIpICAgIC8vUkMgMzMxNDAwMzcgOiBVVVNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBmaWx0ZXJGaWVsZE5hbWVzLnV1c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlclBhcmFtcyA9IEdvcmRpYy5Fa28uRmlsdGVycy5nZXRGaWx0ZXJQYXJhbXM8SW50ZXJmYWNlLkdQcmlrYXpGaWx0ZXI+KFxyXG4gICAgICAgICAgICAgICAgICAgIFtmaWx0ZXJGb3JtRGVmXSxcclxuICAgICAgICAgICAgICAgICAgICBbXCJuYXpldl9zYnVcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJidWNfcHRtX29waXByaWdcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXZlbnQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0IHBvZGxlIGZpbHRyxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm5hY3RlbmlTZXpuYW11KG9iai5maWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZChcIi5TZXpuYW1CdWMuZ2dyaWRcIikuZ2NvdmVyKHsgdGV4dDogXCJqcmVzOjMzMTQwMDM4XCIgfSk7IC8vUkMgMzMxNDAwMzggOiBOYcSNw610w6Fuw60gcGxhdGVibsOtY2ggcMWZw61rYXrFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLndoZW4oKS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJQYXJhbXMuZmlsdGVyVmlld01vZGUgPSBGaWx0ZXJWaWV3TW9kZS5Ob3JtYWw7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJQYXJhbXMucG9WeWhsZWRhbmlab2JyYXppdCA9IFwiT2JsaWJlbmVQb2RtaW5reVwiO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyUGFyYW1zLmNvbGxlY3REYXRhID0gKGV2LCBjdHgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0LiRmaWx0ZXJGb3JtID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKGZpbHRlclBhcmFtcyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3RoYXQudmlld1ByaWthenkgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoYXQuaXNsLlByaWthei5saXN0KHJxID0+IHsgcmV0dXJuIHsgZmlsdGVyczogeyBzX3VocnA6IDEwLCBpa2M6IHRoYXQuaWtjfSB9IH0pLCB7IGZpbHRlclBhbmVsOiB0aGlzLmZpbHRlclBhbmVsLCBzdGFydEVtcHR5OiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudmlld1ByaWthenkgPSBuZXcgR29yZGljLklzbC5WaWV3PEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdQcmlrYXpEdG8+KFxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlByaWthei5saXN0KHJxID0+IHJxKSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclBhbmVsOiB0aGF0LiRmaWx0ZXJGb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHRoYXQuUHJpbWFyeUtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRFbXB0eTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gZ3JpZFxyXG4gICAgICAgICAgICAkLm5ld0RpdihcIlNlem5hbUJ1Y1wiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR1ByaWthekR0bz4oXHJcbiAgICAgICAgICAgICAgICAgICAgQnVjR3JpZC5QcmlrYXouZ2V0R3JpZE9wdGlvbnMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCwvL2dyaWRGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3REZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBzdGF2dSBva25hIGEgbsOhaGxlZHUgcG9kbGUgYWt0dcOhbG7EmyB2eWJyYW7DqSBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhhdC5wcmV2aWV3Q29udHJvbGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKG9iaiAhPSBudWxsICYmIG9iai5jZWxsSW5mbyAhPSBudWxsICYmIG9iai5jZWxsSW5mby5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBUT0RPOiBwb2t1ZCBieSBieWxvIHBvdMWZZWJhIMWZZcWhaXQgbmFzdGF2ZW7DrSBva25hIHBvIHDFmWVzdW51IHBvIGdyaWR1LCB0YWsgdG8gb2Rrb21lbnRvdmF0LCBhbGUgcHLDoXZhIHrDoXpuYW1vdsOhIHByw6F2YSBzZSBha3R1w6FsbsSbIG5lxZllxaHDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLnNob3cob2JqLmNlbGxJbmZvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gVE9ETzogbcWvxb5lIHRvaGxlIHbFr2JlYyBuYXN0YXQ/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjZWxsQ29udGV4dCkgPT4gQnVjR3JpZC5nZXRDb250ZXh0TWVudVBhcmFtcyhjZWxsQ29udGV4dCwgKGNlbGxDb250ZXh0KSA9PiB0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKHRoYXQuZ2V0TWVudUFjdGlvbnModHJ1ZSwgY2VsbENvbnRleHQpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHDFmWlkYXQgZGF0YSBkbyBtZXRvZCBnZXRHcmlkT3B0aW9ucz8gYXNpIGFubywgcHJvdG/FvmUgdmlldyBidWR1IHDFmWVkw6F2YXQgdsWhdWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudmlld1ByaWthenksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwianJlczozMzE0MDEwNFwiLCAvL3JjIDMzMTQwMTA0IDogdsO9Y2hvesOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1ByaWthekR0b05hbWVzLnVwbF96a3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEludGVyZmFjZS5HUHJpa2F6RHRvTmFtZXMuc191aHJwX3prcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdQcmlrYXpEdG9OYW1lcy5idV92bCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdQcmlrYXpEdG9OYW1lcy5za192bCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdQcmlrYXpEdG9OYW1lcy5idV9jaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdQcmlrYXpEdG9OYW1lcy5za19jaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdQcmlrYXpEdG9OYW1lcy5jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1ByaWthekR0b05hbWVzLm1lbmFfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1ByaWthekR0b05hbWVzLmNfbWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdQcmlrYXpEdG9OYW1lcy5kYXRfc3BsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1ByaWthekR0b05hbWVzLmRhdF9zcGxfYWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEludGVyZmFjZS5HUHJpa2F6RHRvTmFtZXMudnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEludGVyZmFjZS5HUHJpa2F6RHRvTmFtZXMua3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEludGVyZmFjZS5HUHJpa2F6RHRvTmFtZXMuc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEludGVyZmFjZS5HUHJpa2F6RHRvTmFtZXMuenBfemtyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1ByaWthekR0b05hbWVzLnprcl9hZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdQcmlrYXpEdG9OYW1lcy5hYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdQcmlrYXpEdG9OYW1lcy5uYXpldixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdQcmlrYXpEdG9OYW1lcy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEludGVyZmFjZS5HUHJpa2F6RHRvTmFtZXMuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1ByaWthekR0b05hbWVzLnBvcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1ByaWthekR0b05hbWVzLmRpYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdQcmlrYXpEdG9OYW1lcy51dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXS50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGFsc2kgcHJvZmlsIHBvaGxlZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9uYW1lOiBcImpuaTdcIiwgLy9yYyAzMzE0MDEwNSA6IHpqZWRub2R1xaFlbsO9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwianJlczozMzE0MDEwNVwiLCAvL3JjIDMzMTQwMTA1IDogemplZG5vZHXFoWVuw71cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdQcmlrYXpEdG9OYW1lcy51cGxfemtyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdQcmlrYXpEdG9OYW1lcy5zX3VocnBfemtyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdQcmlrYXpEdG9OYW1lcy5idV92bCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEludGVyZmFjZS5HUHJpa2F6RHRvTmFtZXMuc2tfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1ByaWthekR0b05hbWVzLmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1ByaWthekR0b05hbWVzLm1lbmFfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdQcmlrYXpEdG9OYW1lcy5jX21lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1ByaWthekR0b05hbWVzLmRhdF9zcGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1ByaWthekR0b05hbWVzLnZzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdQcmlrYXpEdG9OYW1lcy56cF96a3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1ByaWthekR0b05hbWVzLnprcl9hZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEludGVyZmFjZS5HUHJpa2F6RHRvTmFtZXMuYWMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1ByaWthekR0b05hbWVzLm5hemV2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdQcmlrYXpEdG9OYW1lcy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1ByaWthekR0b05hbWVzLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEludGVyZmFjZS5HUHJpa2F6RHRvTmFtZXMucG9waXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1ByaWthekR0b05hbWVzLmRpYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEludGVyZmFjZS5HUHJpa2F6RHRvTmFtZXMudXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBzdGF2dSBva25hIGEgbsOhaGxlZHUgcG9kbGUgYWt0dcOhbG7EmyB2eWJyYW7DqSBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnByZXZpZXdDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmogIT0gbnVsbCAmJiBvYmouZ2V0U2VsZWN0aW9uKClbMF0gIT0gbnVsbCAmJiBvYmouZ2V0U2VsZWN0aW9uKClbMF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcG9rdWQgYnkgYnlsbyBwb3TFmWViYSDFmWXFoWl0IG5hc3RhdmVuw60gb2tuYSBwbyBwxZllc3VudSBwbyBncmlkdSwgdGFrIHRvIG9ka29tZW50b3ZhdCwgYWxlIHByw6F2YSB6w6F6bmFtb3bDoSBwcsOhdmEgc2UgYWt0dcOhbG7EmyBuZcWZZcWhw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5zaG93KG9iai5nZXRTZWxlY3Rpb24oKVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBtxa/FvmUgdG9obGUgdsWvYmVjIG5hc3RhdD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8vL3Rlc3QgcMWZacWZYWRpdCB2aWV3IGRvIHZsYXN0bm9zdGkgZGF0YTogZGFuw6lobyBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIC8vLy9kYXRhOiB0aGF0LnZpZXdCYW5reSxcclxuICAgICAgICAgICAgICAgICAgICAvL2RhdGE6IHRoYXQudmlld1ByaWthenksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3Jvd051bWJlcnM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBvYnNsdcW+bsOhIGFrY2UgcHJvIGRvdWJsZWNsaWNrIHBybyB6b2JyYXplbsOtIGRldGFpbHUgcGxhdGJ5XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vLy9yb3dzQ2hlY2tWaXNpYmxlOiAocm93KSA9PiBFa28uR3JpZC5nZXRSb3dzQ2hlY2tWaXNpYmxlKHJvdyksIC8vUMWZw61wcmF2YSBuYSBzb3XEjXRvdsO9IMWZw6FkZWsgLSB6YXTDrW0gbmVyZWFsaXpvdsOhbm9cclxuICAgICAgICAgICAgICAgICAgICAvLy8vcm93c0NsYXNzOiAocm93KSA9PiBFa28uR3JpZC5nZXRSb3dzQ2xhc3Mocm93KSwgLy9QxZnDrXByYXZhIG5hIHNvdcSNdG92w70gxZnDoWRlayAtIHphdMOtbSBuZXJlYWxpem92w6Fub1xyXG4gICAgICAgICAgICAgICAgICAgIC8vLy8gVE9ETzogbmVibyBwb3XFvsOtdCBzZWxlY3Rpb24gbcOtc3RvIGNlbGxBY3RpdmF0ZT9cclxuICAgICAgICAgICAgICAgICAgICAvL2NlbGxBY3RpdmF0ZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyBha3R1YWxpemFjZSBzdGF2dSBva25hIGEgbsOhaGxlZHUgcG9kbGUgYWt0dcOhbG7EmyB2eWJyYW7DqSBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChvYmogIT0gbnVsbCAmJiBvYmouY2VsbEluZm8gIT0gbnVsbCAmJiBvYmouY2VsbEluZm8uZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLnNob3cob2JqLmNlbGxJbmZvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIFRPRE86IG3Fr8W+ZSB0b2hsZSB2xa9iZWMgbmFzdGF0P1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgICAgICAvLy8vIFRPRE86IHVwcmF2aXQ6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8vL3NlYXJjaENvbHVtbnM6IFtcImFjX2FnXCIsIFwiYWNcIiwgXCJpY29fZXN1XCIsIFwicmNfZXN1XCIsIFwibmF6ZXZfZXN1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY29sdW1uczogQnVjR3JpZC5QcmlrYXouY3JlYXRlR3JpZEZvcm1hdCh0aGF0KSxcclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRQcm9maWxlOiBCdWNHcmlkLlByaWthei5nZXRHcmlkUHJvZmlsZXNQcmlrYXooZmFsc2UpWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHByb2ZpbGVzOiBCdWNHcmlkLlByaWthei5nZXRHcmlkUHJvZmlsZXNQcmlrYXooZmFsc2UpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL30pXHJcblxyXG4gICAgICAgICAgICAgICAgLy8uZ2dyaWQ8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR1ByaWthekR0bz4oXHJcbiAgICAgICAgICAgICAgICAvLyAgICBCdWNHcmlkLlByaWthei5nZXRHcmlkT3B0aW9ucyhcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHVuZGVmaW5lZCwvL2dyaWRGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5hY3Rpb25zLmFjdERldGFpbCxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBha3R1YWxpemFjZSBzdGF2dSBva25hIGEgbsOhaGxlZHUgcG9kbGUgYWt0dcOhbG7EmyB2eWJyYW7DqSBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAodGhhdC5wcmV2aWV3Q29udHJvbGxlcikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKG9iaiAhPSBudWxsICYmIG9iai5jZWxsSW5mbyAhPSBudWxsICYmIG9iai5jZWxsSW5mby5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBwb2t1ZCBieSBieWxvIHBvdMWZZWJhIMWZZcWhaXQgbmFzdGF2ZW7DrSBva25hIHBvIHDFmWVzdW51IHBvIGdyaWR1LCB0YWsgdG8gb2Rrb21lbnRvdmF0LCBhbGUgcHLDoXZhIHrDoXpuYW1vdsOhIHByw6F2YSBzZSBha3R1w6FsbsSbIG5lxZllxaHDrVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLnNob3cob2JqLmNlbGxJbmZvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbcWvxb5lIHRvaGxlIHbFr2JlYyBuYXN0YXQ/XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAoY2VsbENvbnRleHQpID0+IEJ1Y0dyaWQuZ2V0Q29udGV4dE1lbnVQYXJhbXMoY2VsbENvbnRleHQsIChjZWxsQ29udGV4dCkgPT4gdGhhdC5hY3Rpb25zLmNyZWF0ZUJhcih0aGF0LmdldE1lbnVBY3Rpb25zKHRydWUsIGNlbGxDb250ZXh0KSkpLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIFRPRE86IHDFmWlkYXQgZGF0YSBkbyBtZXRvZCBnZXRHcmlkT3B0aW9ucz8gYXNpIGFubywgcHJvdG/FvmUgdmlldyBidWR1IHDFmWVkw6F2YXQgdsWhdWRlXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgeyBkYXRhOiB0aGF0LnZpZXdQcmlrYXp5IH1cclxuICAgICAgICAgICAgICAgIC8vICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICAvLylcclxuICAgICAgICAgICAgICAgIC5nZ3JpZGVrbyhcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc291xI10b3bDvSDFmcOhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5Um93QWxsb3dlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dDb2x1bW5zOiBbXCJjXCIsIFwiY19tZW5hXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RvIGRvOiBEb3Bsbml0IG9tZXplbsOtIHZlbGlrb3N0aSB6b2JyYXplbsO9Y2ggZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xvbmdMaXN0QWxsb3dlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbG9uZ0xpc3RNb2RlbDogXCJHbG9iYWwuQnVjLkFwcFNldHRpbmdzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xvbmdMaXN0Q291bnRNZXRob2Q6IChycSkgPT4gdGhhdC5pc2wuUHJpa2F6Lmxpc3RDb3VudChycSkuZ2V0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xvbmdMaXN0TW9kaWZ5UnFNZXRob2Q6IChycSkgPT4gQnVjR3JpZC5tb2RpZnlMaXN0UmVxdWVzdCh0aGF0LCBycSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gb2JzbHVoYSB6bcSbbnkgdiBncmlkdVxyXG4gICAgICAgICAgICB0aGF0LnZpZXdQcmlrYXp5Lm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgZm9jdXNGdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmQoXCIuU2V6bmFtQnVjLmdncmlkXCIpLmdncmlkKFwiZm9jdXNcIik7XHJcbiAgICAgICAgICAgICAgICAodGhhdC52aWV3UHJpa2F6eSBhcyBhbnkpLm9mZihcImNoYW5nZS5mb2N1c1wiLCBmb2N1c0Z1bmMpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGF0LnZpZXdQcmlrYXp5Lm9uKFwiY2hhbmdlLmZvY3VzXCIsIGZvY3VzRnVuYyk7XHJcblxyXG4gICAgICAgICAgICAvLyBuw6FobGVkIHYgcHJhdsOpbSBib8SNbsOtbSBwYW5lbHVcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmdzaWRlYmFyKFwib3B0aW9uXCIsIHsgcmlnaHQ6IHsgd2lkdGg6IDIwMCwgdmlzaWJsZTogZmFsc2UsIGxlYWZzQXV0b0hpZGU6IGZhbHNlLCBwaW5uZWQ6IHRydWUgfSB9KTtcclxuICAgICAgICAgICAgbGV0IHByZXZpZXdQYW5lbHNEZWZpbml0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgdGFiczogW1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmV2aWV3cy5nZXREZWZhdWx0UHJldmlld1RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGlua1Byb3ZpZGVyOiBmdW5jdGlvbiAobG9hZFBhcmFtcykgeyByZXR1cm4gR29yZGljLldlYkFwcC5VdGlsaXR5LmNyZWF0ZUNvbW1hbmRVcmwobnVsbCwgXCJPcGVuRGV0YWlsXCIsIHsgaXhwOiBsb2FkUGFyYW1zLnBsYV9peHAgfSwgeyB0aWNrZXRUeXBlOiBHb3JkaWMuRW51bXMuVGlja2V0VHlwZS5XaXRoTG9naW5BbmRDb250ZXh0IH0pIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdJZDogXCJidWM6UHJpa2F6XCJcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAvL0JvxI1uw60gcGFuZWwgcHJvIHBvcm92bsOhbsOtIHDFmcOta2F6xa9cclxuICAgICAgICAgICAgICAgICAgICAvL0dvcmRpYy5QcmV2aWV3cy5nZXRGaWxlUHJldmlld1RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaXhwUHJvdmlkZXI6IGZ1bmN0aW9uIChsb2FkUGFyYW1zKSB7IHJldHVybiBsb2FkUGFyYW1zLml4cDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyID0gbmV3IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXIodGhpcy5lbGVtZW50LCBwcmV2aWV3UGFuZWxzRGVmaW5pdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXIucmVnaXN0ZXJQYW5lbCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gcG9yb3Zuw6Fuw61cclxuICAgICAgICAgICAgLy9CdWNHcmlkLkNvbXBhcmF0b3IuY3JlYXRlKHRoYXQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIG9wcsOhdm7Em27DrVxyXG4gICAgICAgICAgICAvLy8qR29yZGljLklzbCovdGhpcy5pc2wuUHJpa2F6LmdldFNlcnZpY2VQZXJtaXNzaW9ucygpXHJcbiAgICAgICAgICAgIC8vICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAvLyAgICAuZG9uZShmdW5jdGlvbiAocGVybSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gb3Byw6F2bsSbbsOtIChiZXogbmFwbG7Em27DrSBzZXpuYW11KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgdGhhdC5wZXJtaXNzaW9ucyA9IHBlcm07XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBuYXN0YXZlbsOtIG9rbmFcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBva25hXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXBsbsSbbsOtIHNlem5hbXUgcGxhdGViIHDFmcOtcGFkxa9cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gW2ZpbHRlck1vZGVsXSBha3R1w6FsbsOtIGZpbHRyeVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBuYWN0ZW5pU2V6bmFtdShmaWx0ZXJNb2RlbD86IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICAvLyAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vICAgIC8vIG5hxI10ZW7DrSBkYXQgZG8gZ3JpZHVcclxuICAgICAgICAvLyAgICBpZiAoZmlsdGVyTW9kZWwgPT09IHVuZGVmaW5lZCB8fCBmaWx0ZXJNb2RlbCA9PT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICAgICB0aGlzLiRmaWx0ZXJGb3JtLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAvLyBuYXN0YXZlbsOtIG9rbmFcclxuICAgICAgICAvLyAgICAgICAgdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgIC8vIG5hxI10ZW7DrSBkYXQgZG8gc2V6bmFtdVxyXG4gICAgICAgIC8vICAgICAgICBmaWx0ZXJNb2RlbCA9IGZpbHRlck1vZGVsIHx8IHt9O1xyXG4gICAgICAgIC8vICAgICAgICAvLyB6YXBhbWF0b3bDoW7DrSBha3R1w6FsbsOtaG8gZmlsdHJ1IGt2xa9saSB0aXNrxa9tXHJcbiAgICAgICAgLy8gICAgICAgIHRoaXMuY3VycmVudEZpbHRlciA9IGZpbHRlck1vZGVsO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgLy8gbmHEjXRlbsOtIHNlem5hbXVcclxuICAgICAgICAvLyAgICAgICAgLy8gb2JqZWt0IHBybyBwxZllZMOhdsOhbsOtIGhvZG5vdFxyXG4gICAgICAgIC8vICAgICAgICBpbnRlcmZhY2UgcmV0dXJuT2JqVHlwZSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBkYXRhOiBHb3JkaWMuQnVjLkludGVyZmFjZS5HUHJpa2F6RHRvW10gfCBudWxsXHJcbiAgICAgICAgLy8gICAgICAgIH07XHJcbiAgICAgICAgLy8gICAgICAgIGxldCByZXR1cm5PYmo6IHJldHVybk9ialR5cGUgPSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBkYXRhOiBudWxsXHJcbiAgICAgICAgLy8gICAgICAgIH07XHJcbiAgICAgICAgLy8gICAgICAgIC8vIGRlZmVycmVkIG9iamVrdCBwcm8gesWZZXTEm3plbsOtIG90w6F6ZWtcclxuICAgICAgICAvLyAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKS5yZXNvbHZlKHJldHVybk9iaikucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAvLyBvYnNsdWhhIGplZG5vdGxpdsO9Y2ggZsOhesOtXHJcbiAgICAgICAgLy8gICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oXCJOYcSNw610w6FtIGRhdGFcIik7XHJcbiAgICAgICAgLy8gICAgICAgIGRlZi50aGVuKGZ1bmN0aW9uIChyZXR1cm5PYmo6IHJldHVybk9ialR5cGUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvKkdvcmRpYy5Jc2wqL1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhhdC5pc2wuUHJpa2F6Lmxpc3QocnEgPT4geyByZXR1cm4geyBmaWx0ZXJzOiB0aGF0LmN1cnJlbnRGaWx0ZXIhIH07IH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHJldHVybk9iai5kYXRhID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdGhhdC5wZXJtaXNzaW9ucyA9IDxHb3JkaWMuQnVjLkludGVyZmFjZS5HUHJpa2F6U2VydmljZVBlcm1pc3Npb24+cmVzcG9uc2Uuc2VydmljZVBlcm1pc3Npb25zO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXR1cm5PYmopO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyBvcGVyYWNlIG5lZG9wYWRsYVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5PYmo6IHJldHVybk9ialR5cGUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIMO6cHJhdmEgZGF0XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgQnVjR3JpZC5QcmlrYXoubW9kaWZ5RHRvKHJldHVybk9iai5kYXRhKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuT2JqLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUocmV0dXJuT2JqKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIHBvaGxlZFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcocmV0dXJuT2JqLmRhdGEhLCB7IGtleTogXCJpeHAscmFkZWtfdWhyXCIgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmQoXCIuU2V6bmFtQnVjLmdncmlkXCIpLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIG9rbmFcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXBsbsSbbsOtIGplZG5vaG8gxZnDoWRrdSBkbyBzZXpuYW11IHBsYXRlYlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBmaWx0ZXJQSyBmaWx0ciBwcm8gYWt0dWFsaXphY2kgZGF0XHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9ICRncmlkIChkZWZhdWx0ID0gdW5kZWZpbmVkKSBncmlkLCBrdGVyw70gbcOhIGLDvXQgYWt0dWFsaXpvdsOhbiAodsW+ZHkgamUgbmF2w61jIGFrdHVhbGl6b3bDoW4gesOha2xhZG7DrSBzZXpuYW1vdsO9IGdyaWQpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgLy9wcml2YXRlIG5hY3RlbmlSYWRrdShmaWx0ZXJQSzogYW55LCAkZ3JpZDogYW55ID0gdW5kZWZpbmVkKTogdm9pZCB7XHJcblxyXG4gICAgICAgIC8vICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8gICAgLy8gdm9sw6Fuw60gb2JlY27DqSBtZXRvZHkgcHJvIG5hxI10ZW7DrSDFmcOhZGt1XHJcbiAgICAgICAgLy8gICAgQnVjR3JpZC5yZWxvYWRSb3coXHJcbiAgICAgICAgLy8gICAgICAgIHRoYXQsXHJcbiAgICAgICAgLy8gICAgICAgIChycSkgPT4geyByZXR1cm4gdGhhdC5pc2wuUHJpa2F6Lmxpc3QocnEpOyB9LFxyXG4gICAgICAgIC8vICAgICAgICBCdWNHcmlkLlByaWthei5tb2RpZnlEdG8sXHJcbiAgICAgICAgLy8gICAgICAgICgpID0+IHRoYXQuZW5hYmxlKCksXHJcbiAgICAgICAgLy8gICAgICAgIGZpbHRlclBLLFxyXG4gICAgICAgIC8vICAgICAgICAkZ3JpZFxyXG4gICAgICAgIC8vICAgICk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuw60gZGV0YWlsdSBwcmlrYXp1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkZXRhaWwoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gdnlicmFuw6EgcG9sb8W+a2FcclxuICAgICAgICAgICAgY29uc3QgJGdyaWQgPSB0aGlzLmVsZW1lbnQuZmluZChcIi5TZXpuYW1CdWMuZ2dyaWRcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFrdFJhZGVrID0gJGdyaWQuZ2dyaWQ8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR1ByaWthekR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgIGlmIChha3RSYWRlayAmJiAhKGFrdFJhZGVrIGluc3RhbmNlb2YgalF1ZXJ5KSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgbGV0ICRkZXRhaWxXaW5kb3cgPSB0aGlzLm5hdmlnYXRlKFtcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdEZXRhaWxQcmlrYXpcIiwgeyBncmlkUmVtb3RlQ29udHJvbDogbmV3IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQygkZ3JpZCksIGlrYzogdGhhdC5pa2MgfV0sIHtcclxuICAgICAgICAgICAgICAgICAgICBJRDogJ0RldGFpbFByaWtheiMnLFxyXG4gICAgICAgICAgICAgICAgICAgIGl4cDogYWt0UmFkZWs/Lml4cCxcclxuICAgICAgICAgICAgICAgICAgICByYWRla191aHI6IGFrdFJhZGVrPy5yYWRla191aHIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWtjOiB0aGF0LmlrY1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gb2JzbHVoYSBha3Rpdm7DrSBvcGVyYWNlIG5hIGRldGFpbHVcclxuICAgICAgICAgICAgICAgIC8vJC5jb250ZW50KCRkZXRhaWxXaW5kb3cpLm9uKEJ1Y0RldGFpbC50cmlnZ2VyQ2hhbmdlLCAocmV0VmFsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vIHrDoXpuYW0gYnlsIHptxJtuxJssIG11c8OtIHNlIG5hxI3DrXN0IHpub3Z1XHJcbiAgICAgICAgICAgICAgICAvLyAgICBpZiAocmV0VmFsICE9IG51bGwgJiYgcmV0VmFsLmRhdGEgJiYgcmV0VmFsLmRhdGEuaXhzX2VzdSAmJiByZXRWYWwuZGF0YS5zYnUgJiYgcmV0VmFsLmRhdGEuaXhzX2VzdSAhPSBudWxsICYmIHJldFZhbC5kYXRhLnNidSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5uYWN0ZW5pUmFka3UoeyBpeHNfZXN1OiByZXRWYWwuZGF0YS5peHNfZXN1LCBzYnU6IHJldFZhbC5kYXRhLnNidSB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBwb3phc3Rhdml0UHJpa2F6eVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5fSAkZ3JpZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcG96YXN0YXZpdFByaWthenkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgJGdyaWQgPSB0aGlzLmVsZW1lbnQuZmluZChcIi5TZXpuYW1CdWMuZ2dyaWRcIik7XHJcbiAgICAgICAgICAgIHZhciBncmlkUm93cyA9ICRncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJqcmVzOjMzMTQwMDM5XCIsIFwianJlczozMzE0MDA0MFwiICsgZ3JpZFJvd3MubGVuZ3RoICsgXCJqcmVzOjMzMTQwMDQxXCIpIC8vUkMgMzMxNDAwNDEgOiBdP1xyXG4gICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5nZXRBY3Rpb25zKCkuZmlsdGVyKG9iaiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmoubmFtZSA9PT0gXCJhY3RQb3phc3Rhdml0XCJcclxuICAgICAgICAgICAgICAgICAgICB9KVswXS5zZXRQZW5kaW5nKGRlZi5wcm9taXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlByaWthei5wb3phc3Rhdih7IGlrYzogdGhhdC5pa2MsIHJvd3M6IGdyaWRSb3dzLCBkYXRhOiB7aWtjOiB0aGF0LmlrYywgcm93czogZ3JpZFJvd3N9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdQcmlrYXp5LnJlcXVlc3REYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubm90aWZpY2F0aW9uKFwic2hvd1RvYXN0XCIsIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiLCBpZDogXCJwb3phc3RhdlByaWthelwiLCBzdGF0ZTogXCJzdWNjZXNzXCIsIHRpdGxlOiBcImpyZXM6MzMxNDAxMDZcIiwgY29udGVudDogXCJqcmVzOjMzMTQwMTA3XCIgfSk7IC8vUkMgMzMxNDAxMDcgOiBWeWJyYW7DqSBwxZnDrWthenkgYnlieSDDunNwxJvFoW7EmyBwb3phc3RhdmVueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW7DrSBha2NlIHBybyB6YXBsYWNlbmkgcHJpa2F6dSBwb21vY2kgcHJ1dm9kY2UgZ2VuZXJvdmFuaSBkYXZrb3VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHphcGxhdGl0RGF2a291KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy9WeWJyYW5lIHJhZGt5XHJcbiAgICAgICAgICAgIGNvbnN0IHZ5YnJhbmVSYWRreSA9IHRoaXMuZWxlbWVudC5maW5kKFwiLlNlem5hbUJ1Yy5nZ3JpZFwiKS5nZ3JpZDxHb3JkaWMuQnVjLkludGVyZmFjZS5HUHJpa2F6RHRvPihcImdldFNlbGVjdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgLy9pZiAodGhhdC5iYW5rYUR0by5za192bCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuQnVjLldlYkNsaWVudC5HUGxhdGJhRGF2a291XCIsIHsgdnlicmFuZVJhZGt5OiB2eWJyYW5lUmFka3ksIGJhbmthRHRvOiB0aGF0LmJhbmthRHRvLCBpa2M6IHRoYXQuaWtjIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LnZpZXdQcmlrYXp5LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgIC8vZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5EYXRhLlJlYWRlcnMuQnVjc3BiYSgpLmdldERhdGEoe30pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZ5YnJhbmVSYWRreVswXS5za192bCA9PSByZXN1bHRbaV0uc2tfdmwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJhbmthRHRvID0gcmVzdWx0W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuQnVjLldlYkNsaWVudC5HUGxhdGJhRGF2a291XCIsIHsgdnlicmFuZVJhZGt5OiB2eWJyYW5lUmFka3ksIGJhbmthRHRvOiB0aGF0LmJhbmthRHRvLCBpa2M6IHRoYXQuaWtjIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3UHJpa2F6eS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHBydmvFryB2ZSBmb3JtdWzDocWZaVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gYWt0dcOhbG7DrSBwbGF0YmFcclxuICAgICAgICAgICAgY29uc3QgYWt0WmF6bmFtID0gdGhpcy5lbGVtZW50LmZpbmQoXCIuU2V6bmFtQnVjLmdncmlkXCIpLmdncmlkPEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdQcmlrYXpEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGFrY2Ugc2V6bmFtdVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsIS51cGRhdGVQZXJtaXNzaW9uKGFrdFphem5hbSA9PT0gbnVsbCA/IHsgdmFsdWU6IGZhbHNlIH0gOiB0aGlzLnBlcm1pc3Npb25zPy5MemVab2JyYXppdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXpuYW0gYWtjw60gcHJvIG1lbnUgKGhhbWJ1cmdlciBuZWJvIGtvbnRleHRvdsOpIG1lbnUgZ3JpZHUpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBjb250ZXh0TWVudSBmb3Jtw6F0IHBybyBrb250ZXh0b3bDqSBtZW51IGdyaWR1ICh0cnVlIChkZWZhdWx0KSA9IGFubywgZmFsc2UgPSBuZSlcclxuICAgICAgICAgKiBAcGFyYW0ge0lHR3JpZENlbGxDb250ZXh0PEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdQcmlrYXpEdG8+fSBbY2VsbENvbnRleHRdIGtvbnRleHQgeiBncmlkdSAocG91emUgcHJvIGNvbnRleHRNZW51ID0gdHJ1ZSkgKGRlZmF1bHQgPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICogQHJldHVybnMge2FueX0gc2V6bmFtIGFrY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRNZW51QWN0aW9ucyhjb250ZXh0TWVudTogYm9vbGVhbiA9IGZhbHNlLCBjZWxsQ29udGV4dD86IElHR3JpZENlbGxDb250ZXh0PEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdQcmlrYXpEdG8+KTogYW55IHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0TWVudVxyXG4gICAgICAgICAgICAgICAgPyBbXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3REZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdERhdmthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RQb3phc3Rhdml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RUaXNrXCJcclxuICAgICAgICAgICAgICAgICAgICAvL1wiYWN0UHJpZGF0RG9Qb3Jvdm5hbmlcIlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3REZXRhaWwsIHByaW1hcnk6IHRydWUsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3REYXZrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0T2JzYWhcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFBvemFzdGF2aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFRpc2tcIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vXCJhY3RQcmlkYXREb1Bvcm92bmFuaVwiXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIl19
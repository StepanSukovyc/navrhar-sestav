"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GSeznamSchvalovaniIP.js                                                        </Name>
//    <Description> GSeznamSchvalovaniIP                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ada;
    (function (Ada) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GSeznamSchvalovaniIP = class GSeznamSchvalovaniIP extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.mohu_editovat = false;
                    this.title = "Schvalování IP";
                    this.taskId = "actSeznamSchvalovaniIP"; // označení položky v taskListu
                    //        public zmena_stav_az_akce_hrom_AZ(gcontent: GContent, pohled: Gordic.Isl.View, globaly: any, vybraneRadky: Ada.Interface.GAkceDto[], akt_role: number, akt_stav: number): JQueryPromise<Ada.Interface.GAkceDto[]> {
                    //            var l_cislo = "";
                    //            var l_ixs_cia = "";
                    //            var l_ico = "";
                    //            var l_rok = 0;
                    //            var that = gcontent;
                    //            let defClose = $.Deferred();
                    //            var confirmQuestion = ""; // promenna na prenos mezi kroky
                    //            var modelDataFirst = { new_stav_az: 0 }; // použitá proměnná pro přenos mezi kroky
                    //            var pole_serverFiltr = new Array();
                    //            var init_value = 0;
                    //;
                    //            //{ nazev: "Zpracovatel", id: 0 },
                    //            //{ nazev: "Kompetent", id: 1 },
                    //            //{ nazev: "Finanční kompetent AZ", id: 2 }
                    //            if (akt_role == 0) {
                    //                if (akt_stav == 0) {
                    //                    pole_serverFiltr = [2];
                    //                    init_value = 2;
                    //                }
                    //                if (akt_stav == 2) {
                    //                    pole_serverFiltr = [0, 3];
                    //                    init_value = 3;
                    //                }
                    //                if (akt_stav == 3) {
                    //                    pole_serverFiltr = [2, 1];
                    //                    init_value = 1;
                    //                }
                    //                if (akt_stav == 1) {
                    //                    pole_serverFiltr = [3];
                    //                    init_value = 3;
                    //                }
                    //            }
                    //            if (akt_role == 1) {
                    //                if (akt_stav == 2) {
                    //                    pole_serverFiltr = [3];
                    //                    init_value = 3;
                    //                }
                    //                if (akt_stav == 3) {
                    //                    pole_serverFiltr = [2, 1];
                    //                    init_value = 1;
                    //                }
                    //                if (akt_stav == 1) {
                    //                    pole_serverFiltr = [3];
                    //                    init_value = 3;
                    //                }
                    //            }
                    //            if (akt_role == 2) {
                    //                if (akt_stav ==  0) {
                    //                    pole_serverFiltr = [2];
                    //                    init_value = 2;
                    //                }
                    //                if (akt_stav == 2) {
                    //                    pole_serverFiltr = [0];
                    //                    init_value = 0;
                    //                }
                    //            }
                    //            modelDataFirst.new_stav_az = init_value;
                    //// , initialValue: { stav_az: init_value }
                    //            var l_oForm = new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L1M1S1, L-2-8-2, M-2-8-2, S-12-12-0" })
                    //                .addRow("Nový stav AZ").addField("gselectbox", Gordic.Prefabs.Select.srvcsaz(), {
                    //                    name: "stav_az", model: "model.new_stav_az=value.stav_az", multi: false, list: true, itemWidth: "", disabled: false, serverFilters: { stav_az: pole_serverFiltr }, validators: [new Gordic.Validators.Required()],
                    //                })
                    //                .addRow({ label: "" })
                    //            var confirmQuestion = ""; // promenna na prenos mezi kroky
                    //            that.navigate<Gordic.Eko.Components.ThreeStepsOptions<Gordic.Ada.Interface.GAkceDto>>(Gordic.Eko.Components.ThreeStepsContent, {
                    //                ID: "wiz_preevidence_akce",
                    //                keys: pohled.keys, // klic
                    //                gridFormat: this.gridFormatSeznam, // new Gordic.Data.GridFormat().add(that.find(".js-SeznamSchvalovaniIP").ggrid<Gordic.Ada.Interface.GAkceDto, "columns">("option", "columns") || []), //gridformat
                    //                title: "Změna stavu AZ", // titulek
                    //                indicatorType: "KPI",
                    //                firstStep: { //prvni krok
                    //                    form: l_oForm, // prefab formu
                    //                    gridTabTitle: "Záznamy ke zpracování", // popisek tabu
                    //                    showIndicator: true, //priznak, zda zobrazit kpi panel
                    //                    title: "Vstupní parametry",
                    //                    fieldChangeDelegate: function (this: Gordic.Eko.Components.FirstStep<Gordic.Ada.Interface.GAkceDto>, ev, obj) {
                    //                        //Gordic.Eko.Components.runCheckAction(ev.target, this, obj.wizardModel);
                    //                    },
                    //                    //description: "Kopie akcí", // popisek
                    //                    modelData: modelDataFirst,
                    //                    nextActionName: "Změnit stav AZ",
                    //                    nextAction: (model, input) => { // akce pro prechod mezi kroky
                    //                        modelDataFirst = model;
                    //                        var serviceContent = gcontent.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab");          // serverový objekt
                    //                        return serviceContent
                    //                            .call("LzeSetStavAZAkce",
                    //                                {
                    //                                    doklady: input, //input.map(function (d) { return { rok: d.rok, ico: d.ico, cislo: d.cislo } }),
                    //                                    data: { new_stav_az: modelDataFirst.new_stav_az }
                    //                                }).then((result: { result: { data: Ada.Interface.GAkceDto, errors: { message: string }[], kind: Gordic.Isl.GOperationResultKind }[] }) => {
                    //                                    return Gordic.Eko.Components.Wizard.Utils.getData<Ada.Interface.GAkceDto>(result);
                    //                                })
                    //                    },
                    //                    //menuGridBar: // dalsi akce v gridu - podle metodiky lze zde mit detail dokladu atd. atd.
                    //                    //    [
                    //                    //        {
                    //                    //            favorite: true,
                    //                    //            action: new GAction({
                    //                    //                // detail
                    //                    //                name: "actDetail",
                    //                    //                caption: "Detail",
                    //                    //                icon: "gi-detail",
                    //                    //                run: function (ev, ctx) {
                    //                    //                    var cnt1 = this;
                    //                    //                    let grid = $(ctx.grid);
                    //                    //                    var vybranyRadek_hro: Gordic.Ada.Interface.GAkceDto = grid.ggrid("activeRow");  // načtení přes vyhledání gridu (přes class)
                    //                    //                    if (vybranyRadek_hro.cislo != "") {                                                                  // existuje vybraný řádek
                    //                    //                        var detailwindow = $.content(ev.target).navigate(
                    //                    //                            ["Gordic.Ada.WebClient.GDetailAkce", { gridRemoteControl: new Gordic.Components.GridRC(grid) }],
                    //                    //                            {
                    //                    //                                id: 'DetailDokladu2#',
                    //                    //                                cislo: vybranyRadek_hro.cislo,
                    //                    //                                ixs_cia: vybranyRadek_hro.ixs_cia,
                    //                    //                                RezimProvozu: that.globals.RezimProvozu,
                    //                    //                                Editable: that.globals.Param_Akce_Editace_TP,
                    //                    //                                NovaAkce: false
                    //                    //                            });
                    //                    //                        var windowContent = $.content(detailwindow);
                    //                    //                        windowContent.on("close", function (ctx) {
                    //                    //                        });
                    //                    //                        windowContent.on("ada_saveakce", function (ctx) {
                    //                    //                            var filterDto: Gordic.Ada.Interface.GSeznamAdaFilterDto = {};
                    //                    //                            //filterDto.cislo = { start: vybranyRadek_hro.cislo!.toString(), end: vybranyRadek_hro.cislo!.toString() };
                    //                    //                            filterDto.cislo = { start: ctx.data.cislo!.toString(), end: ctx.data.cislo!.toString() };
                    //                    //                            // aktualizace gridů
                    //                    //                            // nejprve hlavni seznam aplikace
                    //                    //                            that.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                    //                    //                            // a pak seznam z průvodce
                    //                    //                            that.isl.Akce.list({ filters: filterDto, fragments: ["Permissions", "*"] })
                    //                    //                                .getData()
                    //                    //                                .done(function (data) {
                    //                    //                                    cnt1.view_data = grid.ggrid("getView");
                    //                    //                                    $.extend(true, data[0], { wiz_check: true });
                    //                    //                                    cnt1.view_data.updateData(data, "update");
                    //                    //                                });
                    //                    //                        });
                    //                    //                    }
                    //                    //                }
                    //                    //            })
                    //                    //        },
                    //                    //    ],
                    //                },
                    //                secondStep: { //prvni krok
                    //                    form: l_oForm, // prefab formu
                    //                    gridTabTitle: "Záznamy ke zpracování", // popisek tabu
                    //                    showIndicator: true, //priznak, zda zobrazit kpi panel
                    //                    title: "Změna stavu AZ",
                    //                    fieldChangeDelegate: function (this: Gordic.Eko.Components.FirstStep<Gordic.Ada.Interface.GAkceDto>, ev, obj) {
                    //                        //Gordic.Eko.Components.runCheckAction(ev.target, this, obj.wizardModel);
                    //                    },
                    //                    //description: "Kopie akcí", // popisek
                    //                    //modelData: modelDataFirst,
                    //                    modelData: () => {
                    //                       return {
                    //                           new_stav_az: modelDataFirst.new_stav_az
                    //                        }
                    //                    },
                    //                    nextActionName: "Změnit stav AZ",
                    //                    checkAction: (model, input) => { // akce pro kontrolu dat
                    //                        model = modelDataFirst;
                    //                        var serviceContent = that.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab");          // serverový objekt
                    //                        return serviceContent
                    //                            .call("LzeSetStavAZAkce",
                    //                                {
                    //                                    doklady: input, //input.map(function (d) { return { rok: d.rok, ico: d.ico, cislo: d.cislo } }),
                    //                                    data: { new_stav_az: modelDataFirst.new_stav_az }
                    //                                }).then((result: { result: { data: Ada.Interface.GAkceDto, errors: { message: string }[], kind: Gordic.Isl.GOperationResultKind }[] }) => {
                    //                                    return Gordic.Eko.Components.Wizard.Utils.getData<Ada.Interface.GAkceDto>(result);
                    //                                })
                    //                    },
                    //                    nextAction: (model, input) => { // akce pro prechod mezi kroky
                    //                        modelDataFirst = model;
                    //                        var serviceContent = that.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab");          // serverový objekt
                    //                        return serviceContent
                    //                            .call("SetStavAZAkce",
                    //                                {
                    //                                    doklady: input, //input.map(function (d) { return { rok: d.rok, ico: d.ico, cislo: d.cislo } }),
                    //                                    data: { new_stav_az: modelDataFirst.new_stav_az }
                    //                                }).then((result: { result: { data: Ada.Interface.GAkceDto, errors: { message: string }[], kind: Gordic.Isl.GOperationResultKind }[] }) => {
                    //                                    return Gordic.Eko.Components.Wizard.Utils.getData<Ada.Interface.GAkceDto>(result);
                    //                                })
                    //                    },
                    //                    menuGridBar: // dalsi akce v gridu - podle metodiky lze zde mit detail dokladu atd. atd.
                    //                        [
                    //                    //        {
                    //                    //            favorite: true,
                    //                    //            action: new GAction({
                    //                    //                // detail
                    //                    //                name: "actDetail",
                    //                    //                caption: "Detail",
                    //                    //                icon: "gi-detail",
                    //                    //                run: function (ev, ctx) {
                    //                    //                    var cnt1 = this;
                    //                    //                    let grid = $(ctx.grid);
                    //                    //                    var vybranyRadek_hro: Gordic.Ada.Interface.GAkceDto = grid.ggrid("activeRow");  // načtení přes vyhledání gridu (přes class)
                    //                    //                    if (vybranyRadek_hro.cislo != "") {                                                                  // existuje vybraný řádek
                    //                    //                        //var detailwindow = that.navigate(
                    //                    //                        var detailwindow = $.content(ev.target).navigate(
                    //                    //                            ["Gordic.Ada.WebClient.GDetailAkce", { gridRemoteControl: new Gordic.Components.GridRC(grid) }],
                    //                    //                            {
                    //                    //                                id: 'DetailDokladu2#',
                    //                    //                                cislo: vybranyRadek_hro.cislo,
                    //                    //                                ixs_cia: vybranyRadek_hro.ixs_cia,
                    //                    //                                RezimProvozu: that.globals.RezimProvozu,
                    //                    //                                Editable: that.globals.Param_Akce_Editace_TP,
                    //                    //                                NovaAkce: false
                    //                    //                            });
                    //                    //                        var windowContent = $.content(detailwindow);
                    //                    //                        windowContent.on("close", function (ctx) {
                    //                    //                        });
                    //                    //                        windowContent.on("ada_saveakce", function (ctx) {
                    //                    //                            var filterDto: Gordic.Ada.Interface.GSeznamAdaFilterDto = {};
                    //                    //                            //filterDto.cislo = { start: vybranyRadek_hro.cislo!.toString(), end: vybranyRadek_hro.cislo!.toString() };
                    //                    //                            filterDto.cislo = { start: ctx.data.cislo!.toString(), end: ctx.data.cislo!.toString() };
                    //                    //                            // aktualizace gridů
                    //                    //                            // nejprve hlavni seznam aplikace
                    //                    //                            that.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                    //                    //                            // a pak seznam z průvodce
                    //                    //                            //that.isl.Akce.list(
                    //                    //                            //    rq => {
                    //                    //                            //        return { filters: filterDto, fragments: ["Permissions", "*"] };
                    //                    //                            //    })
                    //                    //                            that.isl.Akce.list({ filters: filterDto, fragments: ["Permissions", "*"] })
                    //                    //                                .getData()
                    //                    //                                .done(function (data) {
                    //                    //                                    cnt1.view_data = grid.ggrid("getView");
                    //                    //                                    cnt1.view_data.updateData(data, "update");
                    //                    //                                });
                    //                    //                        });
                    //                    //                    }
                    //                    //                }
                    //                    //            })
                    //                    //        },
                    //                                //{
                    //                                //    favorite: true,
                    //                                //    action: new GAction({
                    //                                //        // detail
                    //                                //        name: "actTisk",
                    //                                //        caption: "Tisk",
                    //                                //        run: function (ev, ctx) {
                    //                                //        }
                    //                                //    })
                    //                                //}
                    //                            ],
                    //                },
                    //                lastStep: // posledni krok
                    //                {
                    //                    // fáze 2 - zobrazení výsledku storna
                    //                    title: "Výsledek",
                    //                    gridTabTitle: "Zpracované záznamy",
                    //                    form: l_oForm,
                    //                    modelData: () => {
                    //                        return {
                    //                            new_stav_az: modelDataFirst.new_stav_az
                    //                        }
                    //                    },
                    //                },
                    //                data: vybraneRadky, // data
                    //                completeDelegate: (view) => { // delegat, ktery se vola po ukonceni pruvodce
                    //                    //debugger;
                    //                    //that.view_ISL.requestData({}, { updateMode: "update" });
                    //                    var that = this;
                    //                    var filterDto: Gordic.Ada.Interface.GSeznamAdaFilterDto = {};
                    //                    filterDto.aktivita = { o: "IN", v: [100, 300] };
                    //                    if (that.model_filtr.role == 0) {
                    //                        filterDto.ixs_fun_akt = { o: "=", v: ($.content("main") as any).IxsFunAkt };
                    //                        filterDto.ixs_fun_az = null;
                    //                        filterDto.komp = null;
                    //                    };
                    //                    if (that.model_filtr.role == 1) {
                    //                        filterDto.ixs_fun_akt = null;
                    //                        filterDto.ixs_fun_az = null;
                    //                        filterDto.komp = { o: "=", v: ($.content("main") as any).IxsFunAkt };
                    //                    };
                    //                    if (that.model_filtr.role == 2) {
                    //                        filterDto.ixs_fun_akt = null;
                    //                        filterDto.ixs_fun_az = { o: "=", v: ($.content("main") as any).IxsFunAkt };
                    //                        filterDto.komp = null;
                    //                    };
                    //                    if (that.model_filtr && that.model_filtr.stav_az != null) {
                    //                        filterDto.stav_az = { o: "=", v: that.model_filtr.stav_az };
                    //                    }
                    //                    pohled.requestData({ filters: filterDto });
                    //                }
                    //            },
                    //            { title: "Změna stavu AZ" })
                    //            defClose.resolve(pohled.getDataRows());
                    //            return defClose.promise();
                    //        }            
                }
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    $tab.empty();
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.mohu_editovat = true; //  (that.globals.Param_Editace_ISP == Gordic.Ada.Interface.PristupKEditaciISPEnum.Ano);
                    that.akce_predlozit = new GAction({
                        name: "predlozitAct",
                        // icon: "fa-check-circle g-state-text g-state-success", // "gi-schvyr",
                        caption: "Předložit",
                        enabled: that.mohu_editovat,
                        tooltip: "Předložit",
                        run: function (ev, ctx) {
                            var form = $(ev.target).gform();
                            var v_akt = form.findFields("aktivita").gfield("getValue");
                            form.findFields("aktivita_new").gfield("setValue", { aktivita: 600, aktivita_txt: "ke schválení" });
                            this.enabled(false);
                            //    if (v_akt.aktivita == 100) {
                            //        form.findFields("aktivita").gfield("setValue", { aktivita: 300, aktivita_txt: "návrh" });
                            //    }
                            //    else {
                            //        form.findFields("aktivita").gfield("setValue", { aktivita: 100, aktivita_txt: "aktivní" });
                            //    }
                        }
                    });
                    that.akce_schvalit = new GAction({
                        name: "schvalitAct",
                        // icon: "fa-check-circle g-state-text g-state-success", // "gi-schvyr",
                        caption: "Schválit",
                        enabled: that.mohu_editovat,
                        tooltip: "Schválit",
                        run: function (ev, ctx) {
                            var form = $(ev.target).gform();
                            var v_akt = form.findFields("aktivita").gfield("getValue");
                            form.findFields("aktivita_new").gfield("setValue", { aktivita: 100, aktivita_txt: "aktivní" });
                            this.enabled(false);
                            //    if (v_akt.aktivita == 100) {
                            //        form.findFields("aktivita").gfield("setValue", { aktivita: 300, aktivita_txt: "návrh" });
                            //    }
                            //    else {
                            //        form.findFields("aktivita").gfield("setValue", { aktivita: 100, aktivita_txt: "aktivní" });
                            //    }
                        }
                    });
                    that.akce_zamitnout = new GAction({
                        name: "zamitnoutAct",
                        // icon: "fa-times-circle g-state-text g-state-error", // "gi-schvyr",
                        caption: "Zamítnout",
                        enabled: that.mohu_editovat,
                        tooltip: "Zamítnout", //cnt.modelisp.aktivita ? "Schválit" : "Odschválit",
                        run: function (ev, ctx) {
                            var form = $(ev.target).gform();
                            var v_akt = form.findFields("aktivita").gfield("getValue");
                            form.findFields("aktivita_new").gfield("setValue", { aktivita: 500, aktivita_txt: "neaktivní" });
                            this.enabled(false);
                            //    if (v_akt.aktivita == 100) {
                            //        form.findFields("aktivita").gfield("setValue", { aktivita: 300, aktivita_txt: "návrh" });
                            //    }
                            //    else {
                            //        form.findFields("aktivita").gfield("setValue", { aktivita: 100, aktivita_txt: "aktivní" });
                            //    }
                        }
                    });
                    that.akce_vratit = new GAction({
                        name: "vratitAct",
                        // icon: "fa-times-circle g-state-text g-state-error", // "gi-schvyr",
                        caption: "Vrátit",
                        enabled: that.mohu_editovat,
                        tooltip: "Vrátit k přepracování", //cnt.modelisp.aktivita ? "Schválit" : "Odschválit",
                        run: function (ev, ctx) {
                            var form = $(ev.target).gform();
                            var v_akt = form.findFields("aktivita").gfield("getValue");
                            form.findFields("aktivita_new").gfield("setValue", { aktivita: 300, aktivita_txt: "návrh" });
                            this.enabled(false);
                            //    if (v_akt.aktivita == 100) {
                            //        form.findFields("aktivita").gfield("setValue", { aktivita: 300, aktivita_txt: "návrh" });
                            //    }
                            //    else {
                            //        form.findFields("aktivita").gfield("setValue", { aktivita: 100, aktivita_txt: "aktivní" });
                            //    }
                        }
                    });
                    this.actions.addRange({
                        actGridDoubleClick: {
                            caption: "Detail",
                            run: function (ev, ctx) {
                                // return that.detail_radku(that.globals.Param_Akce_Editace_TP, false);
                                return that.detail_radku(false, false);
                            }
                        }
                    });
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actGridDoubleClick*"]));
                    //            var filterFormDef = new Gordic.Forms.Form({ tabLabel: "Kompletní filtr", layoutDescriptor: "w-L-9 w-M-9 w-S-12" })
                    //                .addSection();
                    //            filterFormDef
                    //                .addField("gselectbox", {
                    //                    name: "role",
                    //                    model: "model.role=value.id",
                    //                    multi: false,
                    //                    list: true,
                    //                    initialValue: { id: 0 },
                    //                    itemWidth: "",
                    //                    itemTemplate: "{nazev}",
                    //                    change: function (ev, obj) {
                    //                        //if (obj.flags.isKontrolniDiv || obj.flags.noChange) return;
                    //                        if (obj.flags.noChange) return;
                    ////                        if (obj.value != null) return;
                    //                        var akt_role_i = 0
                    //                        var init_value_i = 0;
                    //                        akt_role_i = obj.value?.id ?? 0;
                    //                        var pole_serverFiltr_i = new Array();
                    //                        if (akt_role_i == 0) {
                    //                            pole_serverFiltr_i = [0, 2, 3, 1];
                    //                            init_value_i = 0;
                    //                        }
                    //                        if (akt_role_i == 1) {
                    //                            pole_serverFiltr_i = [2, 3, 1];
                    //                            init_value_i = 2;
                    //                        }
                    //                        if (akt_role_i == 2) {
                    //                            pole_serverFiltr_i = [0,2];
                    //                            init_value_i = 2;
                    //                        }
                    //                        $(this).gform().findFields("stav_az_f").gfield("option", "serverFilters", { stav_az: pole_serverFiltr_i });
                    //                        $(this).gform().findFields("stav_az_f").gfield("setValue", { stav_az: init_value_i }, {valid : false});
                    //                        //// automatické načtení po změně hodnoty
                    //                        //let dto = {};
                    //                        //that.filterForm!.findFields().gfield("model", "collect", dto);
                    //                        //that.filterForm!.gfilterpanel("applyFilter", dto);
                    //                    },
                    //                    data:
                    //                        new Gordic.Data.View([
                    //                            { nazev: "Zpracovatel", id: 0 },
                    //                            { nazev: "Kompetent", id: 1 },
                    //                            { nazev: "Finanční kompetent AZ", id: 2 }
                    //                        ], { key: "id" })
                    //                });
                    //            filterFormDef
                    //                .addField("gselectbox", Gordic.Prefabs.Select.srvcsaz(), {
                    //                    name: "stav_az_f", model: "model.stav_az=value.stav_az", multi: false, list: true, itemWidth: "", disabled: false, initialValue: { stav_az: 0 }, 
                    //                    change: function (ev, obj) {
                    //                        // automatické načtení po změně hodnoty
                    //                        if (obj.flags.isKontrolniDiv || obj.flags.noChange) return;
                    //                        let dto = {};
                    //                        that.filterForm!.findFields().gfield("model", "collect", dto);
                    //                        that.filterForm!.gfilterpanel("applyFilter", dto);
                    //                    },
                    //                });
                    //            //filterFormDef
                    //            //    .addRow("Stav AZ").addField("gselectbox", Gordic.Prefabs.Select.srvcsaz(), {
                    //            //        name: "stav_az", model: "model.stav_az=value.stav_az", multi: true, list: true, itemWidth: ""
                    //            //    });
                    //            that.filterForm = $("<div>").appendTo(mainForm)
                    //                .gfilterpanel({
                    //                    // default pro EKO
                    //                    filterViewModeUserSettings: [FilterViewMode.Simple],
                    //                    filterViewMode: FilterViewMode.Simple,
                    //                    //poOtevreniOtevritPanelPodminek: false,     // default pro uživatelské nastavení
                    //                    poVyhledaniZobrazit: "VyhledanePodminkyVBadge",
                    //                    autoLoadAfterChoseFilter: false,        // Automatické vyhledání po změně uloženého
                    //                    clearFilterButtonVisible: "NeverVisible",
                    //                    detailActionAsCheckbox: false,
                    //                    //idSimpleMode:"idSimpleMode",
                    //                    forms: [filterFormDef],
                    //                    // TODO: bude nějaké lepší ukládací okno nebo budu muset udělat svoje a nastavit ho do saveOptionsForm?
                    //                    favorites: ["role", "stav_az"],
                    //                    favoriteLayoutDescriptor: "L4M3S1",
                    //                    // TODO: zůstane tohle téma nebo bude pro LK jiné než pro TK?
                    //                    tema: "ada_ptm_adabas2",
                    //                    filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                    //                    saveOptionsForm: "eko",
                    //                    // strictStopAutoLoad: true,               // Striktně zakáže automatické načtení hned po otevření seznamu, oblíbený filtr se pouze předplní.
                    //                    // textItemTemplate: "{description}",
                    //                    apply: function (event, obj) {
                    //                        // načtení dat podle filtrů
                    //                        that.model_filtr = obj.filter;
                    //                        if (that.model_filtr && that.model_filtr.role != null )
                    //                        {
                    //                            var filterDto: Gordic.Ada.Interface.GSeznamAdaFilterDto = {};
                    //                            filterDto.aktivita = { o: "IN", v: [100, 300] };
                    //                            if (that.model_filtr.role == 0) {
                    //                                filterDto.ixs_fun_akt = { o: "=", v: ($.content("main") as any).IxsFunAkt };
                    //                                filterDto.ixs_fun_az = null;
                    //                                filterDto.komp = null;
                    //                            };
                    //                            if (that.model_filtr.role == 1) {
                    //                                filterDto.ixs_fun_akt = null;
                    //                                filterDto.ixs_fun_az = null;
                    //                                filterDto.komp = { o: "=", v: ($.content("main") as any).IxsFunAkt };
                    //                            };
                    //                            if (that.model_filtr.role == 2) {
                    //                                filterDto.ixs_fun_akt = null;
                    //                                filterDto.ixs_fun_az = { o: "=", v: ($.content("main") as any).IxsFunAkt };
                    //                                filterDto.komp = null;
                    //                            };
                    //                            if (that.model_filtr && that.model_filtr.stav_az != null) {
                    //                                filterDto.stav_az = { o: "=", v: that.model_filtr.stav_az };
                    //                            }
                    //                            console.log("role", that.model_filtr.role);
                    //                            console.log("filterDto", filterDto);
                    //                            that.view_ISL.requestData({ filters: filterDto });
                    //                        }
                    //                    }
                    //                });
                    cnt.gridFormatSeznam = new Gordic.Data.GridFormat();
                    //            Gordic.Eko.Grid.Column.addVlastnictvi(cnt.gridFormatSeznam);
                    cnt.gridFormatSeznam.addIconColumn({
                        name: "aktivita",
                        field: "aktivita",
                        caption: "Stav",
                        //hidden: this.globals.Param_Akce_AutSchv == Interface.TypAutomatSchvaleniNovaAkceEnum.NeSprocesem,
                        // width: 25,
                        formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                        iconTemplate: function (data) {
                            switch (data.aktivita) {
                                case 600: return { icon: "fa-check-circle-o g-state-info g-state-text", text: "Ke schválení", caption: "Ke schválení", tooltip: "Ke schválení" };
                                case 300: return { icon: "fa-check-circle g-state-warning g-state-text", text: "Návrh", caption: "Návrh", tooltip: "Návrh" };
                                default: return null;
                            }
                        }
                    })
                        //cnt.gridFormatSeznam
                        //    .addNumberColumn({               //sloupce pridane pred cfu
                        //        name: "rok",
                        //        caption: "Rok",
                        //        customClass: "dt-left",
                        //        width: 80
                        //    })
                        //    .addTextColumn({               //sloupce pridane pred cfu
                        //        name: "ico",
                        //        caption: "IČO",
                        //        customClass: "dt-left",
                        //        width: 140
                        //    })
                        .addTextColumn({
                        name: "cislo",
                        caption: cnt.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */ ? "Číslo pol. plánu" : "Číslo akce",
                        customClass: "dt-left",
                        width: 140
                    })
                        //.addNumberColumn({               //sloupce pridane pred cfu
                        //    name: "radek",
                        //    caption: "#",
                        //    customClass: "dt-left",
                        //    width: 60
                        //})
                        .addTextColumn({
                        name: "srvstip_nazev",
                        caption: "Název IP",
                        customClass: "dt-left",
                        width: 300,
                    })
                        .addTextColumn({
                        name: "nazev_fun_schv",
                        caption: "Schvalovatel",
                        customClass: "dt-left",
                        width: 300,
                    })
                        .addTextColumn({
                        name: "nazev_fun_akt",
                        caption: "Zpracovatel",
                        customClass: "dt-left",
                        width: 300,
                    })
                        .addDateColumn({
                        name: "dat_poz_schv",
                        caption: "Termín pro schválení",
                        customClass: "dt-left",
                        width: 200,
                    });
                    //// akce na klik na ikonku
                    //const linkAct = new GAction({
                    //    name: "klikpriloha",
                    //    run: (ev, data) => {
                    //        var that = this;
                    //        var l_cislo: String = "";
                    //        var vybraneRadky: Gordic.Ada.Interface.GISPAkceDto;
                    //        if ((data.datarow.ixb) && (data.datarow.ixb !== "")) {                                                            // pokud existuje vybraný záznam
                    //            var gc = new GContent("Gordic.Ada.WebClient.GAkceISPSeznam"); //dotažení řádku ze serveru
                    //            gc.call<Gordic.Gin.Interface.GFileInStringDto>("GetFileZUloziste", { Ixb: data.datarow.ixb })
                    //                .done(function (r) {
                    //                    if (r) {
                    //                        GBrowserExtras.documentSaveOpenLocal(r.Name!, r.Bytes!)
                    //                            .done(function (retVal) { })
                    //                            .fail(function (err) { Gordic.Gui.WebApp.Utils.showReasonFlash(gc, err); })
                    //                            .always(function () {
                    //                                gc.endOperation();
                    //                            });
                    //                    }
                    //                })
                    //        };
                    //    }
                    //});
                    //cnt.gridFormatSeznam.addLinksColumn({
                    //    name: "obraz",
                    //    caption: "P ",
                    //    customClass: "dt-center",
                    //    width: 40,
                    //    links: (d) => {
                    //        var ikona = "";
                    //        switch (d!.ixb) {
                    //            case "": {
                    //                ikona = "";
                    //                break;
                    //            }
                    //            case null: {
                    //                ikona = "";
                    //                break;
                    //            }
                    //            default: {
                    //                ikona = "gi-attachment";
                    //                break;
                    //            }
                    //        }
                    //        return [{
                    //            action: linkAct,
                    //            icon: ikona
                    //        }];
                    //    }
                    //});
                    cnt.gridFormatSeznam
                        .addIconColumn({
                        name: "ixb",
                        field: "ixb",
                        caption: "P ",
                        tooltipTemplate: "Příloha",
                        customClass: "center cursor_help",
                        width: 30,
                        formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                        iconTemplate: function (data) {
                            switch (data.ixb) {
                                case "": return;
                                case null: return;
                                default: return { icon: "gi-attachment", text: data.soubor, caption: data.soubor, tooltip: data.soubor };
                            }
                        }
                    });
                    cnt.gridFormatSeznam
                        .addTextColumn({
                        name: "soubor",
                        caption: "Soubor",
                        customClass: "dt-left",
                        width: 200,
                    });
                    cnt.mainTable = $("<div class='js-SeznamSchvalovaniIP'>")
                        //.css("height", "100%")
                        .appendTo(mainForm)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        multi: true,
                        cellActivate(ev, ctx) {
                            that.row = cnt.mainTable.ggrid("activeRow");
                            if (that.row !== null) {
                                that.element.trigger("adasubgridrowselected", { agenda: 40, data: that.row });
                            }
                        },
                        defaultAction: cnt.actions.actGridDoubleClick,
                        //defaultAction: new GAction({
                        //    name: "gridRowSelectedAct",
                        //    run(ev, ctx) {
                        //        that.row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                        //     }
                        //}),
                        searchColumns: Gordic.Ada.WebClient.AdaFunction.zjisti_sloupce_search(cnt.gridFormatSeznam),
                        columns: cnt.gridFormatSeznam,
                        defaultProfile: {
                            columnList: cnt.zjisti_sloupce(cnt.gridFormatSeznam)
                        },
                        profiles: [
                            //{ name: "Zjednodušený", columnList: "zpracovatel, aktivita, cislo, nazev, c_2_3_7_8_23_25, c_6_18, c_0, c_zbyva_cerpat, cerpano_proc", _locked: true },
                            { name: "Úplný", columnList: this.zjisti_sloupce(cnt.gridFormatSeznam), _locked: true } //gridFormatSeznam.columns.filter((c) => c.name != "kniha").join() },
                        ],
                    });
                    //var filterDto: Gordic.Ada.Interface.GSeznamAdaFilterDto = {};
                    //filterDto.stav_az = { o: "=", v: that.model_filtr.stav_az };
                    //filterDto.ixs_fun_akt = { o: "=", v: ($.content("main") as any).IxsFunAkt };
                    //filterDto.aktivita = { o: "IN", v: [100, 300] };
                    that.view_ISL = new Gordic.Isl.View(this.isl.AkceISP.list_Ke_Schvaleni({ filters: {}, fragments: ["Permissions", "*"] }));
                    cnt.mainTable.ggrid("setData", that.view_ISL);
                }
                zjisti_sloupce(gf) {
                    return gf.columns.filter(e => e.hidden != true).map(e => e.name).join(',');
                }
                detail_radku(editable, novaakce) {
                    var cnt = this;
                    var l_cislo = "";
                    var l_radek = 0;
                    var l_ixs_pla = "";
                    var l_ixs_prr = "";
                    var vybraneRadky;
                    var mam_detail;
                    var vybraneRadky_meta;
                    vybraneRadky_meta = cnt.find(".js-SeznamSchvalovaniIP").ggrid("activeRow", true); // načtení přes vyhledání gridu (přes class)
                    vybraneRadky = vybraneRadky_meta.data;
                    mam_detail = (vybraneRadky_meta && !vybraneRadky_meta._isVirtual && vybraneRadky && (vybraneRadky.cislo !== undefined) && (vybraneRadky.cislo !== ""));
                    if (mam_detail) {
                        l_cislo = vybraneRadky.cislo;
                        l_radek = vybraneRadky.radek;
                        l_ixs_pla = vybraneRadky.ixs_pla;
                        l_ixs_prr = vybraneRadky.ixs_prr;
                        // editable = editable && vybraneRadky.aktivita == Interface.AktivitaAkceEnum.Aktivni;
                        editable = editable;
                        var gridRC = new Gordic.Components.GridRC(cnt.mainTable); //pohyb po gridu
                        cnt.filter = {};
                        cnt.filter.cislo = l_cislo;
                        cnt.filter.radek = l_radek;
                        cnt.filter.ixs_pla = l_ixs_pla;
                        cnt.filter.ixs_prr = l_ixs_prr;
                        var radekISP; // = { };
                        this.isl.AkceISP.read({ data: cnt.filter, fragments: ["Permissions", "*"] }).getData().done(function (data) {
                            radekISP = data;
                            cnt.ISPForm = new Gordic.Forms.Form({
                                name: "ISPFormular",
                                layoutDescriptor: "L1M1S1 M-3-9-0 L-3-9-0 breaks-400-500",
                                dialogOptions: {
                                    id: "ISPFormular#"
                                }
                                //    ,
                                //    complete: function (a) {
                                //        debugger;
                                //        console.log("xxx");
                                //    }
                            })
                                .addField("gdummyfield", "w-h", {
                                model: "radek",
                                name: "radek",
                                change: function (ev, selected) {
                                    cnt.akt_radek = selected.value;
                                    var form = $(this).closest(".gform");
                                }
                            })
                                .addField("gdummyfield", "w-h", {
                                model: "srvstip_nazev",
                                name: "srvstip_nazev"
                            })
                                .addField("gstringbox", "w-h", {
                                model: "ixs_pla",
                                name: "ixs_pla"
                            })
                                .addField("gstringbox", "w-h", {
                                model: "ixs_prr",
                                name: "ixs_prr"
                            })
                                //.addRow("Aktivita")
                                //    .addField("gselectbox", "w-12", {
                                .addField("gselectbox", "w-h", {
                                itemTemplate: "{aktivita_txt}",
                                name: "aktivita",
                                dropdown: true,
                                disabled: true,
                                strict: true,
                                initialValue: {},
                                serverFilters: { aktivita: [100, 300, 500, 600] },
                                model: "model.aktivita=value.aktivita",
                                helperColumns: ["aktivita_txt"],
                                change(ev, selected) {
                                    var form = $(this).closest(".gform");
                                    var v_radek = 0;
                                    v_radek = form.findFields("radek").gfield("getValue");
                                    var v_akt = form.findFields("aktivita").gfield("getValue").aktivita;
                                    var v_stav_text = (v_akt == 600 ? "Ke schválení" : (v_akt == 300 ? "Návrh" : (v_akt == 100 ? "Schváleno" : "Zamítnuto")));
                                    form.findFields("stav_text").gfield("setValue", v_stav_text);
                                    var moje_ixs_fun = $.content("main").IxsFunAkt;
                                    var v_schvalovatel = form.findFields("ixs_fun_schv").gfield("getValue");
                                    cnt.akce_predlozit.visible(true);
                                    cnt.akce_schvalit.visible(true);
                                    cnt.akce_zamitnout.visible(true);
                                    cnt.akce_vratit.visible(true);
                                    if (v_radek == 0) { // nový IP
                                        if (v_schvalovatel) { // je vyplněn schvalovatel
                                            if (v_schvalovatel.ixs_fun == moje_ixs_fun) { // jsem schvalovatel
                                                cnt.akce_predlozit.enabled(false);
                                                cnt.akce_schvalit.enabled(cnt.mohu_editovat && ((v_akt == 300) || (v_akt == 600)));
                                                cnt.akce_zamitnout.enabled(cnt.mohu_editovat && ((v_akt == 300) || (v_akt == 600)));
                                                //cnt.akce_schvalit.enabled(cnt.mohu_editovat && ((v_akt == 300) || (v_akt == 600)));
                                                //cnt.akce_zamitnout.enabled(cnt.mohu_editovat && ((v_akt == 300) || (v_akt == 600)));
                                                cnt.akce_vratit.enabled(false);
                                            }
                                            else {
                                                cnt.akce_predlozit.enabled(cnt.mohu_editovat && (v_akt == 300));
                                                cnt.akce_schvalit.enabled(false);
                                                cnt.akce_zamitnout.enabled(false);
                                                cnt.akce_vratit.enabled(false);
                                            }
                                        }
                                        else {
                                            cnt.akce_predlozit.enabled(false);
                                            cnt.akce_schvalit.enabled(cnt.mohu_editovat && ((v_akt == 300) || (v_akt == 600)));
                                            cnt.akce_zamitnout.enabled(cnt.mohu_editovat && ((v_akt == 300) || (v_akt == 600)));
                                            cnt.akce_vratit.enabled(false);
                                        }
                                    }
                                    else {
                                        if (v_schvalovatel) {
                                            if (v_schvalovatel.ixs_fun == moje_ixs_fun) {
                                                cnt.akce_predlozit.enabled(false);
                                                cnt.akce_schvalit.enabled(cnt.mohu_editovat && ((v_akt == 300) || (v_akt == 600)));
                                                cnt.akce_zamitnout.enabled(cnt.mohu_editovat && ((v_akt == 300) || (v_akt == 600)));
                                                cnt.akce_vratit.enabled(cnt.mohu_editovat && ((v_akt == 500) || (v_akt == 100) || (v_akt == 600)));
                                                //    cnt.akce_schvalit.enabled(((v_akt == 300) || (v_akt == 600)));
                                                //    cnt.akce_zamitnout.enabled(((v_akt == 300) || (v_akt == 600)));
                                                //    cnt.akce_vratit.enabled(((v_akt == 500) || (v_akt == 100) || (v_akt == 600)));
                                            }
                                            else {
                                                cnt.akce_predlozit.enabled(cnt.mohu_editovat && (v_akt == 300));
                                                cnt.akce_schvalit.enabled(false);
                                                cnt.akce_zamitnout.enabled(false);
                                                cnt.akce_vratit.enabled(false);
                                            }
                                        }
                                        else {
                                            cnt.akce_predlozit.enabled(false);
                                            cnt.akce_schvalit.enabled(cnt.mohu_editovat && ((v_akt == 300) || (v_akt == 600)));
                                            cnt.akce_zamitnout.enabled(cnt.mohu_editovat && ((v_akt == 300) || (v_akt == 600)));
                                            cnt.akce_vratit.enabled(cnt.mohu_editovat && ((v_akt == 500) || (v_akt == 100) || (v_akt == 600)));
                                        }
                                    }
                                },
                                //buttons: [
                                //    { requireEdit: false, action: that.akce_zamitnout },
                                //    { requireEdit: false, action: that.akce_schvalit }
                                //]
                            }, Gordic.Prefabs.Select.gincaktADA())
                                .addField("gselectbox", "w-h", {
                                //itemTemplate: "{aktivita_txt}",
                                name: "aktivita_new",
                                dropdown: true,
                                disabled: true,
                                strict: true,
                                initialValue: {},
                                serverFilters: { aktivita: [100, 300, 500, 600] },
                                model: "model.aktivita_new=value.aktivita",
                                helperColumns: ["aktivita_txt"],
                                change(ev, selected) {
                                    if ((selected) && (selected.value)) {
                                        var form = $(this).closest(".gform");
                                        var v_radek = 0;
                                        v_radek = form.findFields("radek").gfield("getValue");
                                        var v_akt = form.findFields("aktivita_new").gfield("getValue").aktivita;
                                        var v_stav_text = (v_akt == 600 ? "Návrh" : (v_akt == 300 ? "Ke schválení" : (v_akt == 100 ? "Schváleno" : "Zamítnuto")));
                                        form.findFields("stav_text_new").gfield("setValue", v_stav_text);
                                    }
                                },
                            }, Gordic.Prefabs.Select.gincaktADA())
                                //              .addRow("Předkladatel")
                                //                .addField("gstringbox", "w-12", {
                                .addField("gstringbox", "w-h", {
                                model: "ixs_sro_predklad",
                                name: "ixs_sro_predklad",
                                change: function (ev, selected) {
                                    var form = $(this).closest(".gform");
                                    var ixs_sro_predklad = "";
                                    var v_SeSchvalovaciRoli = [];
                                    ixs_sro_predklad = form.findFields("ixs_sro_predklad").gfield("getValue");
                                    if (ixs_sro_predklad) {
                                        v_SeSchvalovaciRoli.push(ixs_sro_predklad);
                                    }
                                    var my_serverFilter = {
                                        SeSchvalovaciRoli: v_SeSchvalovaciRoli,
                                        UnionSchvalovaciRoleBezSablony: v_SeSchvalovaciRoli
                                        //SDatumOdSchvalovaciRole:
                                        //SDatumDoSchvalovaciRole
                                    };
                                    //form.findFields("ixs_fun_pred").gfield("enable");
                                    form.findFields("ixs_fun_pred").gfield("option", "serverFilters", my_serverFilter);
                                }
                            })
                                //              .addRow("Schvalovatel")
                                //                .addField("gstringbox", "w-12", {
                                .addField("gstringbox", "w-h", {
                                model: "ixs_sro_schvalov",
                                name: "ixs_sro_schvalov",
                                change: function (ev, selected) {
                                    var form = $(this).closest(".gform");
                                    var ixs_sro_schvalov = "";
                                    var v_SeSchvalovaciRoli = [];
                                    ixs_sro_schvalov = form.findFields("ixs_sro_schvalov").gfield("getValue");
                                    if (ixs_sro_schvalov) {
                                        v_SeSchvalovaciRoli.push(ixs_sro_schvalov);
                                    }
                                    var my_serverFilter = {
                                        SeSchvalovaciRoli: v_SeSchvalovaciRoli,
                                        UnionSchvalovaciRoleBezSablony: v_SeSchvalovaciRoli
                                        //SDatumOdSchvalovaciRole: 
                                        //SDatumDoSchvalovaciRole
                                    };
                                    //                                form.findFields("ixs_fun_schv").gfield("enable");
                                    //                                form.findFields("dat_poz_schv").gfield("enable");
                                    form.findFields("ixs_fun_schv").gfield("option", "serverFilters", my_serverFilter);
                                }
                            });
                            cnt.ISPForm.addRow("Číslo PP")
                                .addField("gstringbox", "w-12", {
                                model: "cislo",
                                name: "cislo",
                                disabled: true
                            });
                            cnt.ISPForm.addRow("Předpoklad")
                                .addField("gselectbox", "w-12", {
                                itemTemplate: "{srvstip_nazev}",
                                name: "ixs_tip",
                                dropdown: true,
                                strict: true,
                                disabled: true,
                                validators: [new Gordic.Validators.Required()],
                                //validators: [new Gordic.Validators.Required({
                                //    validate: (v) => {
                                //        if (v == null || v.ixs_tip == "")
                                //            return false;
                                //        else
                                //            return true;
                                //    }
                                //})],
                                model: "model.ixs_tip=value.ixs_tip; model.ixs_pla=>value.ixs_pla",
                                helperColumns: ["srvstip_nazev"],
                                invalidTransform: function (s) {
                                    if (s == null)
                                        return null;
                                    else
                                        return { ixs_tip: "", nazev: s };
                                },
                                change: function (ev, selected) {
                                    var form = $(this).closest(".gform");
                                    var v_radek = 0;
                                    v_radek = form.findFields("radek").gfield("getValue");
                                    if (v_radek > 0) {
                                        form.findFields("ixs_tip").gfield("disable");
                                    }
                                    if (selected.value.priz_pov_ixb == 1) {
                                        form.findFormRows("priloha").gformrow("setLabel", "Příloha (*)", "Je požadováno vložení přílohy");
                                    }
                                    else {
                                        form.findFormRows("priloha").gformrow("setLabel", "Příloha");
                                    }
                                    if ((selected.value.ixs_sro_schvalov != null) && (selected.value.ixs_sro_schvalov != "")) {
                                        form.findFields("ixs_sro_schvalov").gfield("setValue", selected.value.ixs_sro_schvalov);
                                    }
                                    if ((selected.value.ixs_sro_predklad != null) && (selected.value.ixs_sro_predklad != "")) {
                                        form.findFields("ixs_sro_predklad").gfield("setValue", selected.value.ixs_sro_predklad);
                                    }
                                    if ((selected.value.nazev != null) && (selected.value.nazev != "")) {
                                        form.findFields("srvstip_nazev").gfield("setValue", selected.value.nazev);
                                    }
                                }
                            }, Gordic.Prefabs.Select.srvstipADAAll());
                            cnt.ISPForm.addRow("Stav splnění")
                                .addField("gselectbox", "w-12", Gordic.Prefabs.Select.evzcspeADA(), {
                                name: "schv_spec",
                                dropdown: true,
                                disabled: true,
                                strict: true,
                                //                            validators: [cnt.validators["s_inp"]],
                                model: "s_inp=schv_spec",
                                change(ev, selected) {
                                    //    var form = $(this).closest(".gform");
                                    //    form.findFields("ixs_tip").gfield("getValue");
                                    //    var that = $.content(this);
                                    //    if (that != null) {
                                    //        if (selected.value != null) {
                                    //            var typ: number = selected.value!.schv_spec!;
                                    //            if ((typ == 1) && cnt.mohu_editovat) {
                                    //                that.findFields("dat_inp").gfield("enable");
                                    //                var datum_pole = that.findFields("dat_inp").gfield("getValue");
                                    //                if (datum_pole == null) {
                                    //                    that.findFields("dat_inp").gfield("setValue", new Date(Date.now()));
                                    //                }
                                    //            }
                                    //            else {
                                    //                that.findFields("dat_inp").gfield("setValue", null);
                                    //                that.findFields("dat_inp").gfield("disable");
                                    //            }
                                    //        }
                                    //    }
                                }
                            })
                                .addRow("Datum splnění")
                                .addField("gdatebox", "w-12", {
                                name: "dat_inp",
                                disabled: true
                            })
                                .addRow({ label: "Předkladatel", hint: "Předkladatel" }).addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                                disabled: true, // vždy přístupné
                                dropdown: false, // políčko jako tři tečky
                                name: "ixs_fun_pred", // název položky
                                model: "model.ixs_fun_pred=value.ixs_fun", // návratová hodnota pouze ixs_fun
                                tooltip: "Předkladatel", // RC 23352028 : Nový zpracovatel
                            })
                                .addRow({ label: "Schvalovatel", hint: "Schvalovatel" }).addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                                disabled: true,
                                dropdown: false, // políčko jako tři tečky
                                name: "ixs_fun_schv", // název položky
                                model: "model.ixs_fun_schv=value.ixs_fun", // návratová hodnota pouze ixs_fun
                                tooltip: "Schvalovatel", // RC 23352028 : Nový zpracovatel
                                //                    validators: [new Gordic.Validators.Required()],                                                                 // validátor - pole musí být vyplněné
                                //                    flag: "required",
                                change(ev, selected) {
                                    var form = $(this).closest(".gform");
                                    var moje_ixs_fun = $.content("main").IxsFunAkt;
                                    var v_akt_pole = form.findFields("aktivita").gfield("getValueAsync").then(function (value) {
                                        var v_akt = value.aktivita;
                                        if (selected && selected.value && selected.value.ixs_fun != moje_ixs_fun) {
                                            //    v_akt = 300;
                                            //    form.findFields("aktivita").gfield("setValue", { aktivita: 300, aktivita_txt: "návrh" });
                                        }
                                        else {
                                            if (v_akt == 300) {
                                                v_akt = 600;
                                                form.findFields("aktivita").gfield("setValue", { aktivita: 600, aktivita_txt: "ke schválení" });
                                            }
                                        }
                                        if (selected && selected.value) { // je vyplněn schvalovatel
                                            if (selected.value.ixs_fun == moje_ixs_fun) { // jsem schvalovatel
                                                cnt.akce_predlozit.enabled(false);
                                                cnt.akce_schvalit.enabled(cnt.mohu_editovat && ((v_akt == 300) || (v_akt == 600)));
                                                cnt.akce_zamitnout.enabled(cnt.mohu_editovat && ((v_akt == 300) || (v_akt == 600)));
                                                cnt.akce_vratit.enabled(cnt.mohu_editovat && ((v_akt == 500) || (v_akt == 100) || (v_akt == 600)));
                                                //    cnt.akce_schvalit.enabled(((v_akt == 300) || (v_akt == 600)));
                                                //    cnt.akce_zamitnout.enabled(((v_akt == 300) || (v_akt == 600)));
                                                //    cnt.akce_vratit.enabled(((v_akt == 500) || (v_akt == 100) || (v_akt == 600)));
                                            }
                                            else {
                                                cnt.akce_predlozit.enabled(cnt.mohu_editovat && (v_akt == 300));
                                                cnt.akce_schvalit.enabled(false);
                                                cnt.akce_zamitnout.enabled(false);
                                                cnt.akce_vratit.enabled(false);
                                                form.findFields("aktivita_new").gfield("reset");
                                                form.findFields("stav_text_new").gfield("reset");
                                            }
                                        }
                                        else {
                                            cnt.akce_predlozit.enabled(false);
                                            cnt.akce_schvalit.enabled(cnt.mohu_editovat && ((v_akt == 300) || (v_akt == 600)));
                                            cnt.akce_zamitnout.enabled(cnt.mohu_editovat && ((v_akt == 300) || (v_akt == 600)));
                                            cnt.akce_vratit.enabled(cnt.mohu_editovat && ((v_akt == 500) || (v_akt == 100) || (v_akt == 600)));
                                        }
                                    });
                                }
                            })
                                .addRow("Termín pro schválení")
                                .addField("gdatebox", "w-12", {
                                disabled: true,
                                name: "dat_poz_schv"
                            })
                                .addRow({ label: "Příloha", required: false, name: "priloha", hint: "Příloha" })
                                .addField("gselectbox", "w-12", {
                                itemTemplate: "{popis:trim:encode}",
                                name: "ixb",
                                disabled: true,
                                dropdown: true,
                                strict: false,
                                //                            validators: [cnt.validators["ixb"]],
                                model: "model.ixb=value.ixb",
                                //                    model: "model.ixb=value.ixb,model.ixs=>value.ixs",
                                helperColumns: ["popis"],
                                invalidTransform: function (s) { return { popis: '' }; },
                                //                    serverFilters: { ixs: that.akt_ixs },
                                buttons: [{
                                        requireEdit: false,
                                        enabled: ((radekISP.ixb) && (radekISP.ixb !== "")) ? true : false,
                                        action: new GAction({
                                            name: "prilohaZobrazAct",
                                            icon: "gi-download", //"gi-eattachment",
                                            run: function (ev, ctx) {
                                                if ((radekISP.ixb) && (radekISP.ixb !== "")) { // pokud existuje vybraný záznam
                                                    var gc = new GContent("Gordic.Ada.WebClient.GAkceISPSeznam"); //dotažení řádku ze serveru
                                                    gc.call("GetFileZUloziste", { Ixb: radekISP.ixb })
                                                        .done(function (r) {
                                                        if (r) {
                                                            GBrowserExtras.documentSaveOpenLocal(r.Name, r.Bytes)
                                                                .done(function (retVal) { })
                                                                .fail(function (err) { Gordic.Gui.WebApp.Utils.showReasonFlash(gc, err); })
                                                                .always(function () {
                                                                gc.endOperation();
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        })
                                    }]
                                //change: function (ev, selected) {
                                //    var form = $(this).closest(".gform");
                                //    var v_radek: number = 0;
                                //    v_radek = form.findFields("radek").gfield("getValue");
                                //    if (v_radek > 0) {
                                //        form.findFields("ixs_tip").gfield("disable");
                                //    }
                                //}
                            }, Gordic.Prefabs.Select.iSPPriloha());
                            cnt.ISPForm
                                .addSection("")
                                .addRow("")
                                .addRow("Aktuální stav")
                                .addField("gstringbox", "w-12", {
                                name: "stav_text",
                                disabled: true
                            });
                            cnt.ISPForm
                                .addSection("Proces schválení")
                                .addRow("")
                                .addField("gbutton", "", { params: { action: cnt.akce_predlozit } })
                                .addField("gbutton", "", { params: { action: cnt.akce_schvalit } })
                                .addField("gbutton", "", { params: { action: cnt.akce_zamitnout } })
                                .addField("gbutton", "", { params: { action: cnt.akce_vratit } });
                            cnt.ISPForm
                                .addRow("Nový stav", { name: "radek_novy_stav" })
                                .addField("gstringbox", "w-12", {
                                name: "stav_text_new",
                                disabled: true
                            });
                            ;
                            cnt.mohu_editovat = ((radekISP.Permissions.LzeEditovat.value) && (cnt.globals.Param_Uloha_Schvalovani_IP === 2 /* Interface.PristupKUlozeEnum.Ano_Editace */));
                            const commandBar = (cnt.mohu_editovat == true) ? ["ok!", "cancel"] : ["cancel!"];
                            let prom_vysledek = cnt.dialogs.simpleForm("Detail IP", cnt.ISPForm, radekISP, { width: 500, height: 600, commandBar: commandBar });
                            let prom_vysledek_pro = prom_vysledek.createDialogPromise( /*"close"*/ /*"yes"*/ /*"ok"*/ /*, { duvod: string }*/)
                                .then(function (data) {
                                if (data) {
                                    console.log("radekISP", radekISP);
                                    if (data.aktivita != data.aktivita_new) {
                                        data.aktivita = data.aktivita_new;
                                        cnt.isl.AkceISP.update({ data: data })
                                            .getData().done(function (data) {
                                            console.log("radekISP ulozeno", radekISP);
                                            cnt.view_ISL.requestData({ filters: {} });
                                            console.log("Ulozeno");
                                        });
                                    }
                                }
                            });
                        });
                        //    var detailwindow = cnt.navigate(
                        //        ["Gordic.Ada.WebClient.GDetailAkce", { gridRemoteControl: novaakce == false ? gridRC : null, gpc: Gordic.Eko.Utils.createBookGpc(cnt.gpc, vybraneRadky.ixs_pla!) }],
                        //        {
                        //            id: 'DetailDokladu#',
                        //            cislo: l_cislo,
                        //            ixs_cia: l_ixs_cia,
                        //            RezimProvozu: this.globals.RezimProvozu,
                        //            Editable: editable,
                        //            NovaAkce: novaakce
                        //        });
                        //    var windowContent = $.content(detailwindow);
                        //    windowContent.on("ada_saveakce_set_stav_az", function (retVal) {
                        //        var filterDto: Gordic.Ada.Interface.GSeznamAdaFilterDto = {};
                        //        filterDto.cislo = { start: retVal.data[0].cislo, end: retVal.data[0].cislo };
                        //        cnt.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                        //    });
                        //    windowContent.element.on('contentclosed', (ev, ctx) => {
                        //        cnt.mainTable.ggrid('focus');
                        //    }); // při zavření detailu se nastaví focus na grid
                    }
                }
                nastav_stav_ip() {
                    var that = this;
                    var vybraneRadky = that.find(".js-SeznamSchvalovaniIP").ggrid("getSelection"); // načtení přes vyhledání gridu (přes class)
                    if (vybraneRadky.length > 0) { // existuje vybraný řádek
                        //that.zmena_stav_az_akce_hrom_AZ(that, that.view_ISL, that.globals, vybraneRadky, akt_role, akt_stav);
                    }
                }
            };
            GSeznamSchvalovaniIP = __decorate([
                gcontent
            ], GSeznamSchvalovaniIP);
            WebClient.GSeznamSchvalovaniIP = GSeznamSchvalovaniIP;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVNjaHZhbG92YW5pSVAuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbIlNjcmlwdHMvR1Nlem5hbVNjaHZhbG92YW5pSVAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0FvM0NmO0FBcDNDRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FvM0NuQjtJQXAzQ2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW8zQzdCO1FBcDNDb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxPQUFBLFlBQVk7Z0JBQXREOztvQkFpQlksa0JBQWEsR0FBWSxLQUFLLENBQUM7b0JBTXZDLFVBQUssR0FBRyxnQkFBZ0IsQ0FBQztvQkFDekIsV0FBTSxHQUFHLHdCQUF3QixDQUFDLENBQUMsK0JBQStCO29CQWsvQjFFLDZOQUE2TjtvQkFDN04sK0JBQStCO29CQUMvQixpQ0FBaUM7b0JBQ2pDLDZCQUE2QjtvQkFDN0IsNEJBQTRCO29CQUU1QixrQ0FBa0M7b0JBRWxDLDBDQUEwQztvQkFFMUMsd0VBQXdFO29CQUV4RSxnR0FBZ0c7b0JBQ2hHLGlEQUFpRDtvQkFDakQsaUNBQWlDO29CQUNqQyxHQUFHO29CQUNILGdEQUFnRDtvQkFDaEQsOENBQThDO29CQUM5Qyx5REFBeUQ7b0JBRXpELGtDQUFrQztvQkFDbEMsc0NBQXNDO29CQUN0Qyw2Q0FBNkM7b0JBQzdDLHFDQUFxQztvQkFDckMsbUJBQW1CO29CQUNuQixzQ0FBc0M7b0JBQ3RDLGdEQUFnRDtvQkFDaEQscUNBQXFDO29CQUNyQyxtQkFBbUI7b0JBQ25CLHNDQUFzQztvQkFDdEMsZ0RBQWdEO29CQUNoRCxxQ0FBcUM7b0JBQ3JDLG1CQUFtQjtvQkFDbkIsc0NBQXNDO29CQUN0Qyw2Q0FBNkM7b0JBQzdD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QUFDO2dDQUVMLENBQUM7NEJBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBQ1gsQ0FBQyxDQUFDLENBQUM7d0JBRVAsc0NBQXNDO3dCQUN0Qyw4S0FBOEs7d0JBQzlLLFdBQVc7d0JBQ1gsbUNBQW1DO3dCQUNuQyw2QkFBNkI7d0JBQzdCLGlDQUFpQzt3QkFDakMsc0RBQXNEO3dCQUN0RCxpQ0FBaUM7d0JBQ2pDLGdDQUFnQzt3QkFDaEMsYUFBYTt3QkFFYixrREFBa0Q7d0JBRWxELHNFQUFzRTt3QkFFdEUsdUVBQXVFO3dCQUN2RSx1RkFBdUY7d0JBRXZGLHFGQUFxRjt3QkFFckYsU0FBUzt3QkFJVCw4REFBOEQ7d0JBQzlELHVDQUF1Qzt3QkFDdkMseURBQXlEO29CQUN6RCxDQUFDO2dCQUNMLENBQUM7Z0JBRU0sY0FBYztvQkFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLFlBQVksR0FBdUMsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFFLDRDQUE0QztvQkFDaEssSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQWtFLHlCQUF5Qjt3QkFDckgsdUdBQXVHO29CQUMzRyxDQUFDO2dCQUVMLENBQUM7YUF1V0osQ0FBQTtZQS8yQ1ksb0JBQW9CO2dCQURoQyxRQUFRO2VBQ0ksb0JBQW9CLENBKzJDaEM7WUEvMkNZLDhCQUFvQix1QkErMkNoQyxDQUFBO1FBQ0wsQ0FBQyxFQXAzQ29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQW8zQzdCO0lBQUQsQ0FBQyxFQXAzQ2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW8zQ25CO0FBQUQsQ0FBQyxFQXAzQ1MsTUFBTSxLQUFOLE1BQU0sUUFvM0NmIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5BZGEuV2ViQ2xpZW50LkdTZXpuYW1TY2h2YWxvdmFuaUlQLmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR1Nlem5hbVNjaHZhbG92YW5pSVAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQWRhLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1TY2h2YWxvdmFuaUlQIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdJU1BBa2NlRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkFkYS5JbnRlcmZhY2UuR0lTUEFrY2VEdG8+O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HSVNQQWtjZUR0bztcclxuICAgICAgICBwcml2YXRlIGdyaWRGb3JtYXRTZXpuYW06IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkFkYS5JbnRlcmZhY2UuR0lTUEFrY2VEdG8+O1xyXG5cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGdsb2JhbHM6IEdvcmRpYy5BZGEuV2ViQ2xpZW50LkRUTy5HQWRhR2xvYmFsc0R0bztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBJU1BGb3JtOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuICAgICAgICBwcml2YXRlIGFrdF9yYWRlazogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgdmFsaWRhdG9yczogT2JqZWN0TGl0ZXJhbDxHb3JkaWMuVmFsaWRhdG9ycy5WYWxpZGF0b3JPcHRpb25zPjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXJGb3JtOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBtYWluVGFibGU6IEpRdWVyeTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2h1X2VkaXRvdmF0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgcHJpdmF0ZSBha2NlX3ByZWRsb3ppdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIGFrY2Vfc2NodmFsaXQ6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBha2NlX3phbWl0bm91dDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIGFrY2VfdnJhdGl0OiBHQWN0aW9uO1xyXG5cclxuICAgICAgICB0aXRsZSA9IFwiU2NodmFsb3bDoW7DrSBJUFwiO1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0U2V6bmFtU2NodmFsb3ZhbmlJUFwiOyAvLyBvem5hxI1lbsOtIHBvbG/Fvmt5IHYgdGFza0xpc3R1XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vaHVfZWRpdG92YXQgPSB0cnVlOyAvLyAgKHRoYXQuZ2xvYmFscy5QYXJhbV9FZGl0YWNlX0lTUCA9PSBHb3JkaWMuQWRhLkludGVyZmFjZS5QcmlzdHVwS0VkaXRhY2lJU1BFbnVtLkFubyk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFrY2VfcHJlZGxveml0ID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwcmVkbG96aXRBY3RcIixcclxuICAgICAgICAgICAgICAgIC8vIGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIiwgLy8gXCJnaS1zY2h2eXJcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZZWRsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQubW9odV9lZGl0b3ZhdCxcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiUMWZZWRsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQoZXYudGFyZ2V0KS5nZm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2X2FrdCA9IGZvcm0uZmluZEZpZWxkcyhcImFrdGl2aXRhXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YV9uZXdcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBha3Rpdml0YTogNjAwLCBha3Rpdml0YV90eHQ6IFwia2Ugc2NodsOhbGVuw61cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZWQoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAodl9ha3QuYWt0aXZpdGEgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImFrdGl2aXRhXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYWt0aXZpdGE6IDMwMCwgYWt0aXZpdGFfdHh0OiBcIm7DoXZyaFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiYWt0aXZpdGFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBha3Rpdml0YTogMTAwLCBha3Rpdml0YV90eHQ6IFwiYWt0aXZuw61cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5ha2NlX3NjaHZhbGl0ID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzY2h2YWxpdEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiLCAvLyBcImdpLXNjaHZ5clwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTY2h2w6FsaXRcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQubW9odV9lZGl0b3ZhdCxcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiU2NodsOhbGl0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkKGV2LnRhcmdldCkuZ2Zvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdl9ha3QgPSBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiYWt0aXZpdGFfbmV3XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYWt0aXZpdGE6IDEwMCwgYWt0aXZpdGFfdHh0OiBcImFrdGl2bsOtXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmFibGVkKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKHZfYWt0LmFrdGl2aXRhID09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGFrdGl2aXRhOiAzMDAsIGFrdGl2aXRhX3R4dDogXCJuw6F2cmhcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImFrdGl2aXRhXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYWt0aXZpdGE6IDEwMCwgYWt0aXZpdGFfdHh0OiBcImFrdGl2bsOtXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWtjZV96YW1pdG5vdXQgPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInphbWl0bm91dEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gaWNvbjogXCJmYS10aW1lcy1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIiwgLy8gXCJnaS1zY2h2eXJcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmFtw610bm91dFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5tb2h1X2VkaXRvdmF0LFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJaYW3DrXRub3V0XCIsIC8vY250Lm1vZGVsaXNwLmFrdGl2aXRhID8gXCJTY2h2w6FsaXRcIiA6IFwiT2RzY2h2w6FsaXRcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQoZXYudGFyZ2V0KS5nZm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2X2FrdCA9IGZvcm0uZmluZEZpZWxkcyhcImFrdGl2aXRhXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YV9uZXdcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBha3Rpdml0YTogNTAwLCBha3Rpdml0YV90eHQ6IFwibmVha3Rpdm7DrVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlZChmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh2X2FrdC5ha3Rpdml0YSA9PSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiYWt0aXZpdGFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBha3Rpdml0YTogMzAwLCBha3Rpdml0YV90eHQ6IFwibsOhdnJoXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGFrdGl2aXRhOiAxMDAsIGFrdGl2aXRhX3R4dDogXCJha3Rpdm7DrVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFrY2VfdnJhdGl0ID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ2cmF0aXRBY3RcIixcclxuICAgICAgICAgICAgICAgIC8vIGljb246IFwiZmEtdGltZXMtY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLWVycm9yXCIsIC8vIFwiZ2ktc2NodnlyXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZyw6F0aXRcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQubW9odV9lZGl0b3ZhdCxcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiVnLDoXRpdCBrIHDFmWVwcmFjb3bDoW7DrVwiLCAvL2NudC5tb2RlbGlzcC5ha3Rpdml0YSA/IFwiU2NodsOhbGl0XCIgOiBcIk9kc2NodsOhbGl0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkKGV2LnRhcmdldCkuZ2Zvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdl9ha3QgPSBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiYWt0aXZpdGFfbmV3XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYWt0aXZpdGE6IDMwMCwgYWt0aXZpdGFfdHh0OiBcIm7DoXZyaFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlZChmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh2X2FrdC5ha3Rpdml0YSA9PSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiYWt0aXZpdGFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBha3Rpdml0YTogMzAwLCBha3Rpdml0YV90eHQ6IFwibsOhdnJoXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGFrdGl2aXRhOiAxMDAsIGFrdGl2aXRhX3R4dDogXCJha3Rpdm7DrVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdEdyaWREb3VibGVDbGljazoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGF0LmRldGFpbF9yYWRrdSh0aGF0Lmdsb2JhbHMuUGFyYW1fQWtjZV9FZGl0YWNlX1RQLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kZXRhaWxfcmFka3UoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdEdyaWREb3VibGVDbGljaypcIl0pKTtcclxuXHJcbi8vICAgICAgICAgICAgdmFyIGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJLb21wbGV0bsOtIGZpbHRyXCIsIGxheW91dERlc2NyaXB0b3I6IFwidy1MLTkgdy1NLTkgdy1TLTEyXCIgfSlcclxuLy8gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKTtcclxuXHJcbi8vICAgICAgICAgICAgZmlsdGVyRm9ybURlZlxyXG4vLyAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuLy8gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9sZVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwucm9sZT12YWx1ZS5pZFwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuLy8gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyBpZDogMCB9LFxyXG4vLyAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntuYXpldn1cIixcclxuLy8gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChvYmouZmxhZ3MuaXNLb250cm9sbmlEaXYgfHwgb2JqLmZsYWdzLm5vQ2hhbmdlKSByZXR1cm47XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5mbGFncy5ub0NoYW5nZSkgcmV0dXJuO1xyXG4vLy8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai52YWx1ZSAhPSBudWxsKSByZXR1cm47XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHZhciBha3Rfcm9sZV9pID0gMFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbml0X3ZhbHVlX2kgPSAwO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGFrdF9yb2xlX2kgPSBvYmoudmFsdWU/LmlkID8/IDA7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvbGVfc2VydmVyRmlsdHJfaSA9IG5ldyBBcnJheSgpO1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWt0X3JvbGVfaSA9PSAwKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvbGVfc2VydmVyRmlsdHJfaSA9IFswLCAyLCAzLCAxXTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdF92YWx1ZV9pID0gMDtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGlmIChha3Rfcm9sZV9pID09IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0cl9pID0gWzIsIDMsIDFdO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0X3ZhbHVlX2kgPSAyO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFrdF9yb2xlX2kgPT0gMikge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2xlX3NlcnZlckZpbHRyX2kgPSBbMCwyXTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdF92YWx1ZV9pID0gMjtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwic3Rhdl9hel9mXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcInNlcnZlckZpbHRlcnNcIiwgeyBzdGF2X2F6OiBwb2xlX3NlcnZlckZpbHRyX2kgfSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJzdGF2X2F6X2ZcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBzdGF2X2F6OiBpbml0X3ZhbHVlX2kgfSwge3ZhbGlkIDogZmFsc2V9KTtcclxuXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8gYXV0b21hdGlja8OpIG5hxI10ZW7DrSBwbyB6bcSbbsSbIGhvZG5vdHlcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBkdG8gPSB7fTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZmlsdGVyRm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5maWx0ZXJGb3JtIS5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiLCBkdG8pO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgICAgICAgIGRhdGE6XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcIlpwcmFjb3ZhdGVsXCIsIGlkOiAwIH0sXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwiS29tcGV0ZW50XCIsIGlkOiAxIH0sXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwiRmluYW7EjW7DrSBrb21wZXRlbnQgQVpcIiwgaWQ6IDIgfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIF0sIHsga2V5OiBcImlkXCIgfSlcclxuLy8gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgICAgICAgIGZpbHRlckZvcm1EZWZcclxuLy8gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3J2Y3NheigpLCB7XHJcbi8vICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfYXpfZlwiLCBtb2RlbDogXCJtb2RlbC5zdGF2X2F6PXZhbHVlLnN0YXZfYXpcIiwgbXVsdGk6IGZhbHNlLCBsaXN0OiB0cnVlLCBpdGVtV2lkdGg6IFwiXCIsIGRpc2FibGVkOiBmYWxzZSwgaW5pdGlhbFZhbHVlOiB7IHN0YXZfYXo6IDAgfSwgXHJcbi8vICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXV0b21hdGlja8OpIG5hxI10ZW7DrSBwbyB6bcSbbsSbIGhvZG5vdHlcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmZsYWdzLmlzS29udHJvbG5pRGl2IHx8IG9iai5mbGFncy5ub0NoYW5nZSkgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkdG8gPSB7fTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlckZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlckZvcm0hLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIsIGR0byk7XHJcbi8vICAgICAgICAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgICAgICB9KTtcclxuXHJcbi8vICAgICAgICAgICAgLy9maWx0ZXJGb3JtRGVmXHJcbi8vICAgICAgICAgICAgLy8gICAgLmFkZFJvdyhcIlN0YXYgQVpcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zcnZjc2F6KCksIHtcclxuLy8gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJzdGF2X2F6XCIsIG1vZGVsOiBcIm1vZGVsLnN0YXZfYXo9dmFsdWUuc3Rhdl9helwiLCBtdWx0aTogdHJ1ZSwgbGlzdDogdHJ1ZSwgaXRlbVdpZHRoOiBcIlwiXHJcbi8vICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG5cclxuLy8gICAgICAgICAgICB0aGF0LmZpbHRlckZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8obWFpbkZvcm0pXHJcbi8vICAgICAgICAgICAgICAgIC5nZmlsdGVycGFuZWwoe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBwcm8gRUtPXHJcbi8vICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZVVzZXJTZXR0aW5nczogW0ZpbHRlclZpZXdNb2RlLlNpbXBsZV0sXHJcbi8vICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy9wb090ZXZyZW5pT3RldnJpdFBhbmVsUG9kbWluZWs6IGZhbHNlLCAgICAgLy8gZGVmYXVsdCBwcm8gdcW+aXZhdGVsc2vDqSBuYXN0YXZlbsOtXHJcbi8vICAgICAgICAgICAgICAgICAgICBwb1Z5aGxlZGFuaVpvYnJheml0OiBcIlZ5aGxlZGFuZVBvZG1pbmt5VkJhZGdlXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICBhdXRvTG9hZEFmdGVyQ2hvc2VGaWx0ZXI6IGZhbHNlLCAgICAgICAgLy8gQXV0b21hdGlja8OpIHZ5aGxlZMOhbsOtIHBvIHptxJtuxJsgdWxvxb5lbsOpaG9cclxuLy8gICAgICAgICAgICAgICAgICAgIGNsZWFyRmlsdGVyQnV0dG9uVmlzaWJsZTogXCJOZXZlclZpc2libGVcIixcclxuLy8gICAgICAgICAgICAgICAgICAgIGRldGFpbEFjdGlvbkFzQ2hlY2tib3g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy9pZFNpbXBsZU1vZGU6XCJpZFNpbXBsZU1vZGVcIixcclxuLy8gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbZmlsdGVyRm9ybURlZl0sXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBidWRlIG7Em2pha8OpIGxlcMWhw60gdWtsw6FkYWPDrSBva25vIG5lYm8gYnVkdSBtdXNldCB1ZMSbbGF0IHN2b2plIGEgbmFzdGF2aXQgaG8gZG8gc2F2ZU9wdGlvbnNGb3JtP1xyXG4vLyAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVzOiBbXCJyb2xlXCIsIFwic3Rhdl9helwiXSxcclxuLy8gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzFcIixcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHrFr3N0YW5lIHRvaGxlIHTDqW1hIG5lYm8gYnVkZSBwcm8gTEsgamluw6kgbmXFviBwcm8gVEs/XHJcbi8vICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcImFkYV9wdG1fYWRhYmFzMlwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHb3JkaWMuR2luLkZpbHRlclN0b3JhZ2VTZXJ2aWNlLlN0b3JlKCksXHJcbi8vICAgICAgICAgICAgICAgICAgICBzYXZlT3B0aW9uc0Zvcm06IFwiZWtvXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyBzdHJpY3RTdG9wQXV0b0xvYWQ6IHRydWUsICAgICAgICAgICAgICAgLy8gU3RyaWt0bsSbIHpha8Ohxb5lIGF1dG9tYXRpY2vDqSBuYcSNdGVuw60gaG5lZCBwbyBvdGV2xZllbsOtIHNlem5hbXUsIG9ibMOtYmVuw70gZmlsdHIgc2UgcG91emUgcMWZZWRwbG7DrS5cclxuLy8gICAgICAgICAgICAgICAgICAgIC8vIHRleHRJdGVtVGVtcGxhdGU6IFwie2Rlc2NyaXB0aW9ufVwiLFxyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAoZXZlbnQsIG9iaikge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBkYXQgcG9kbGUgZmlsdHLFr1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxfZmlsdHIgPSBvYmouZmlsdGVyO1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tb2RlbF9maWx0ciAmJiB0aGF0Lm1vZGVsX2ZpbHRyLnJvbGUgIT0gbnVsbCApXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyRHRvOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU2V6bmFtQWRhRmlsdGVyRHRvID0ge307XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5ha3Rpdml0YSA9IHsgbzogXCJJTlwiLCB2OiBbMTAwLCAzMDBdIH07XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tb2RlbF9maWx0ci5yb2xlID09IDApIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5peHNfZnVuX2FrdCA9IHsgbzogXCI9XCIsIHY6ICgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkuSXhzRnVuQWt0IH07XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2Z1bl9heiA9IG51bGw7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8ua29tcCA9IG51bGw7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tb2RlbF9maWx0ci5yb2xlID09IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5peHNfZnVuX2FrdCA9IG51bGw7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2Z1bl9heiA9IG51bGw7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8ua29tcCA9IHsgbzogXCI9XCIsIHY6ICgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkuSXhzRnVuQWt0IH07XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tb2RlbF9maWx0ci5yb2xlID09IDIpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5peHNfZnVuX2FrdCA9IG51bGw7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2Z1bl9heiA9IHsgbzogXCI9XCIsIHY6ICgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkuSXhzRnVuQWt0IH07XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8ua29tcCA9IG51bGw7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tb2RlbF9maWx0ciAmJiB0aGF0Lm1vZGVsX2ZpbHRyLnN0YXZfYXogIT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLnN0YXZfYXogPSB7IG86IFwiPVwiLCB2OiB0aGF0Lm1vZGVsX2ZpbHRyLnN0YXZfYXogfTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyb2xlXCIsIHRoYXQubW9kZWxfZmlsdHIucm9sZSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlsdGVyRHRvXCIsIGZpbHRlckR0byk7XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogZmlsdGVyRHRvIH0pO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbSA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdJU1BBa2NlRHRvPigpO1xyXG5cclxuLy8gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFZsYXN0bmljdHZpKGNudC5ncmlkRm9ybWF0U2V6bmFtKTtcclxuXHJcbiAgICAgICAgICAgIGNudC5ncmlkRm9ybWF0U2V6bmFtLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgZmllbGQ6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgLy9oaWRkZW46IHRoaXMuZ2xvYmFscy5QYXJhbV9Ba2NlX0F1dFNjaHYgPT0gSW50ZXJmYWNlLlR5cEF1dG9tYXRTY2h2YWxlbmlOb3ZhQWtjZUVudW0uTmVTcHJvY2VzZW0sXHJcbiAgICAgICAgICAgICAgICAvLyB3aWR0aDogMjUsXHJcbiAgICAgICAgICAgICAgICBmb3JtYXRQcmVzZXQ6IEdvcmRpYy5HbG9iYWwuRW51bXMuR3JpZENvbHVtbkZvcm1hdEljb24uaWNvbixcclxuICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuYWt0aXZpdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA2MDA6IHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlLW8gZy1zdGF0ZS1pbmZvIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIktlIHNjaHbDoWxlbsOtXCIsIGNhcHRpb246IFwiS2Ugc2NodsOhbGVuw61cIiwgdG9vbHRpcDogXCJLZSBzY2h2w6FsZW7DrVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzAwOiByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXdhcm5pbmcgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiTsOhdnJoXCIsIGNhcHRpb246IFwiTsOhdnJoXCIsIHRvb2x0aXA6IFwiTsOhdnJoXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy9jbnQuZ3JpZEZvcm1hdFNlem5hbVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkTnVtYmVyQ29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJyb2tcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGNhcHRpb246IFwiUm9rXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICB3aWR0aDogODBcclxuICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgLy8gICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcImljb1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2FwdGlvbjogXCJJxIxPXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICB3aWR0aDogMTQwXHJcbiAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpc2xvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogY250Lmdsb2JhbHMuQkFSX1R5cF9JbnN0ID09IEludGVyZmFjZS5TcnZUeXBJbnRhbGFjZUVudW0uTU8gPyBcIsSMw61zbG8gcG9sLiBwbMOhbnVcIiA6IFwixIzDrXNsbyBha2NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGROdW1iZXJDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcInJhZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIiNcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHdpZHRoOiA2MFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzcnZzdGlwX25hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOw6F6ZXYgSVBcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X2Z1bl9zY2h2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTY2h2YWxvdmF0ZWxcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X2Z1bl9ha3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpwcmFjb3ZhdGVsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfcG96X3NjaHZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlRlcm3DrW4gcHJvIHNjaHbDoWxlbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8vLyBha2NlIG5hIGtsaWsgbmEgaWtvbmt1XHJcbiAgICAgICAgICAgIC8vY29uc3QgbGlua0FjdCA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJrbGlrcHJpbG9oYVwiLFxyXG4gICAgICAgICAgICAvLyAgICBydW46IChldiwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdmFyIGxfY2lzbG86IFN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB2YXIgdnlicmFuZVJhZGt5OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HSVNQQWtjZUR0bztcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAoKGRhdGEuZGF0YXJvdy5peGIpICYmIChkYXRhLmRhdGFyb3cuaXhiICE9PSBcIlwiKSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIGV4aXN0dWplIHZ5YnJhbsO9IHrDoXpuYW1cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdmFyIGdjID0gbmV3IEdDb250ZW50KFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VJU1BTZXpuYW1cIik7IC8vZG90YcW+ZW7DrSDFmcOhZGt1IHplIHNlcnZlcnVcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBnYy5jYWxsPEdvcmRpYy5HaW4uSW50ZXJmYWNlLkdGaWxlSW5TdHJpbmdEdG8+KFwiR2V0RmlsZVpVbG96aXN0ZVwiLCB7IEl4YjogZGF0YS5kYXRhcm93Lml4YiB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKHIpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBHQnJvd3NlckV4dHJhcy5kb2N1bWVudFNhdmVPcGVuTG9jYWwoci5OYW1lISwgci5CeXRlcyEpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXRWYWwpIHsgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikgeyBHb3JkaWMuR3VpLldlYkFwcC5VdGlscy5zaG93UmVhc29uRmxhc2goZ2MsIGVycik7IH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2MuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgLy9jbnQuZ3JpZEZvcm1hdFNlem5hbS5hZGRMaW5rc0NvbHVtbih7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwib2JyYXpcIixcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJQIFwiLFxyXG4gICAgICAgICAgICAvLyAgICBjdXN0b21DbGFzczogXCJkdC1jZW50ZXJcIixcclxuICAgICAgICAgICAgLy8gICAgd2lkdGg6IDQwLFxyXG4gICAgICAgICAgICAvLyAgICBsaW5rczogKGQpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICB2YXIgaWtvbmEgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIHN3aXRjaCAoZCEuaXhiKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY2FzZSBcIlwiOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGlrb25hID0gXCJcIjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNhc2UgbnVsbDoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpa29uYSA9IFwiXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGlrb25hID0gXCJnaS1hdHRhY2htZW50XCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gW3tcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBhY3Rpb246IGxpbmtBY3QsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWNvbjogaWtvbmFcclxuICAgICAgICAgICAgLy8gICAgICAgIH1dO1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbVxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwiaXhiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogXCJQxZnDrWxvaGFcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJjZW50ZXIgY3Vyc29yX2hlbHBcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0UHJlc2V0OiBHb3JkaWMuR2xvYmFsLkVudW1zLkdyaWRDb2x1bW5Gb3JtYXRJY29uLmljb24sXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEhLml4Yikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlwiOiByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG51bGw6IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiB7IGljb246IFwiZ2ktYXR0YWNobWVudFwiLCB0ZXh0OiBkYXRhLnNvdWJvciEsIGNhcHRpb246IGRhdGEuc291Ym9yISwgdG9vbHRpcDogZGF0YS5zb3Vib3IhIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW1cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic291Ym9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTb3Vib3JcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNudC5tYWluVGFibGUgPSAkKFwiPGRpdiBjbGFzcz0nanMtU2V6bmFtU2NodmFsb3ZhbmlJUCc+XCIpXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGUoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJvdyA9IGNudC5tYWluVGFibGUuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnJvdyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LnRyaWdnZXIoXCJhZGFzdWJncmlkcm93c2VsZWN0ZWRcIiwgeyBhZ2VuZGE6IDQwLCBkYXRhOiB0aGF0LnJvdyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IGNudC5hY3Rpb25zLmFjdEdyaWREb3VibGVDbGljayxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJncmlkUm93U2VsZWN0ZWRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBydW4oZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnJvdyA9IGN0eC5jZWxsSW5mby5kYXRhOyAgICAvL2RhdGEsIHplIGt0ZXJ5Y2ggYnlsIHZ5dHZvcmVuIHJhZGVrXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogR29yZGljLkFkYS5XZWJDbGllbnQuQWRhRnVuY3Rpb24uemppc3RpX3Nsb3VwY2Vfc2VhcmNoKGNudC5ncmlkRm9ybWF0U2V6bmFtKSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBjbnQuZ3JpZEZvcm1hdFNlem5hbSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogY250LnpqaXN0aV9zbG91cGNlKGNudC5ncmlkRm9ybWF0U2V6bmFtKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8veyBuYW1lOiBcIlpqZWRub2R1xaFlbsO9XCIsIGNvbHVtbkxpc3Q6IFwienByYWNvdmF0ZWwsIGFrdGl2aXRhLCBjaXNsbywgbmF6ZXYsIGNfMl8zXzdfOF8yM18yNSwgY182XzE4LCBjXzAsIGNfemJ5dmFfY2VycGF0LCBjZXJwYW5vX3Byb2NcIiwgX2xvY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwiw5pwbG7DvVwiLCBjb2x1bW5MaXN0OiB0aGlzLnpqaXN0aV9zbG91cGNlKGNudC5ncmlkRm9ybWF0U2V6bmFtKSwgX2xvY2tlZDogdHJ1ZSB9IC8vZ3JpZEZvcm1hdFNlem5hbS5jb2x1bW5zLmZpbHRlcigoYykgPT4gYy5uYW1lICE9IFwia25paGFcIikuam9pbigpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGZpbHRlckR0bzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1Nlem5hbUFkYUZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgICAgICAvL2ZpbHRlckR0by5zdGF2X2F6ID0geyBvOiBcIj1cIiwgdjogdGhhdC5tb2RlbF9maWx0ci5zdGF2X2F6IH07XHJcbiAgICAgICAgICAgIC8vZmlsdGVyRHRvLml4c19mdW5fYWt0ID0geyBvOiBcIj1cIiwgdjogKCQuY29udGVudChcIm1haW5cIikgYXMgYW55KS5JeHNGdW5Ba3QgfTtcclxuICAgICAgICAgICAgLy9maWx0ZXJEdG8uYWt0aXZpdGEgPSB7IG86IFwiSU5cIiwgdjogWzEwMCwgMzAwXSB9O1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuQWtjZUlTUC5saXN0X0tlX1NjaHZhbGVuaSh7IGZpbHRlcnM6IHt9LCBmcmFnbWVudHM6IFtcIlBlcm1pc3Npb25zXCIsIFwiKlwiXSB9KSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjbnQubWFpblRhYmxlLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdfSVNMKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB6amlzdGlfc2xvdXBjZShnZikge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2YuY29sdW1ucy5maWx0ZXIoZSA9PiBlLmhpZGRlbiAhPSB0cnVlKS5tYXAoZSA9PiBlLm5hbWUpLmpvaW4oJywnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRldGFpbF9yYWRrdShlZGl0YWJsZSwgbm92YWFrY2UpIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBsX2Npc2xvOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgbF9yYWRlazogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgdmFyIGxfaXhzX3BsYTogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIGxfaXhzX3Bycjogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHZhciB2eWJyYW5lUmFka3k6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdJU1BBa2NlRHRvO1xyXG4gICAgICAgICAgICB2YXIgbWFtX2RldGFpbDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgICAgIHZhciB2eWJyYW5lUmFka3lfbWV0YTtcclxuXHJcbiAgICAgICAgICAgIHZ5YnJhbmVSYWRreV9tZXRhID0gY250LmZpbmQoXCIuanMtU2V6bmFtU2NodmFsb3ZhbmlJUFwiKS5nZ3JpZChcImFjdGl2ZVJvd1wiLCB0cnVlKTsgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gcMWZZXMgdnlobGVkw6Fuw60gZ3JpZHUgKHDFmWVzIGNsYXNzKVxyXG4gICAgICAgICAgICB2eWJyYW5lUmFka3kgPSB2eWJyYW5lUmFka3lfbWV0YS5kYXRhO1xyXG4gICAgICAgICAgICBtYW1fZGV0YWlsID0gKHZ5YnJhbmVSYWRreV9tZXRhICYmICF2eWJyYW5lUmFka3lfbWV0YS5faXNWaXJ0dWFsICYmIHZ5YnJhbmVSYWRreSAmJiAodnlicmFuZVJhZGt5LmNpc2xvICE9PSB1bmRlZmluZWQpICYmICh2eWJyYW5lUmFka3kuY2lzbG8gIT09IFwiXCIpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYW1fZGV0YWlsKSB7XHJcbiAgICAgICAgICAgICAgICBsX2Npc2xvID0gdnlicmFuZVJhZGt5LmNpc2xvITtcclxuICAgICAgICAgICAgICAgIGxfcmFkZWsgPSB2eWJyYW5lUmFka3kucmFkZWshO1xyXG4gICAgICAgICAgICAgICAgbF9peHNfcGxhID0gdnlicmFuZVJhZGt5Lml4c19wbGEhO1xyXG4gICAgICAgICAgICAgICAgbF9peHNfcHJyID0gdnlicmFuZVJhZGt5Lml4c19wcnIhO1xyXG4gICAgICAgICAgICAgICAgLy8gZWRpdGFibGUgPSBlZGl0YWJsZSAmJiB2eWJyYW5lUmFka3kuYWt0aXZpdGEgPT0gSW50ZXJmYWNlLkFrdGl2aXRhQWtjZUVudW0uQWt0aXZuaTtcclxuICAgICAgICAgICAgICAgIGVkaXRhYmxlID0gZWRpdGFibGU7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGdyaWRSQyA9IG5ldyBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkMoY250Lm1haW5UYWJsZSk7IC8vcG9oeWIgcG8gZ3JpZHVcclxuXHJcbiAgICAgICAgICAgICAgICBjbnQuZmlsdGVyID0ge307XHJcbiAgICAgICAgICAgICAgICBjbnQuZmlsdGVyLmNpc2xvID0gbF9jaXNsbztcclxuICAgICAgICAgICAgICAgIGNudC5maWx0ZXIucmFkZWsgPSBsX3JhZGVrO1xyXG4gICAgICAgICAgICAgICAgY250LmZpbHRlci5peHNfcGxhID0gbF9peHNfcGxhO1xyXG4gICAgICAgICAgICAgICAgY250LmZpbHRlci5peHNfcHJyID0gbF9peHNfcHJyO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciByYWRla0lTUDogR29yZGljLkFkYS5JbnRlcmZhY2UuR0lTUEFrY2VEdG87IC8vID0geyB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuaXNsLkFrY2VJU1AucmVhZCh7IGRhdGE6IGNudC5maWx0ZXIsIGZyYWdtZW50czogW1wiUGVybWlzc2lvbnNcIiwgXCIqXCJdIH0pLmdldERhdGEoKS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWtJU1AgPSBkYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbnQuSVNQRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJJU1BGb3JtdWxhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTS0zLTktMCBMLTMtOS0wIGJyZWFrcy00MDAtNTAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiSVNQRm9ybXVsYXIjXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgYW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgY29tcGxldGU6IGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKFwieHh4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZHVtbXlmaWVsZFwiLCBcInctaFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJyYWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrdF9yYWRlayA9IHNlbGVjdGVkLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJCh0aGlzKS5jbG9zZXN0KFwiLmdmb3JtXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkdW1teWZpZWxkXCIsIFwidy1oXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNydnN0aXBfbmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3J2c3RpcF9uYXpldlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LWhcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX3BsYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfcGxhXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctaFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfcHJyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19wcnJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8uYWRkUm93KFwiQWt0aXZpdGFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy1oXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7YWt0aXZpdGFfdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmljdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZToge30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IGFrdGl2aXRhOiBbMTAwLCAzMDAsIDUwMCwgNjAwXSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuYWt0aXZpdGE9dmFsdWUuYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcImFrdGl2aXRhX3R4dFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZShldiwgc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQodGhpcykuY2xvc2VzdChcIi5nZm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdl9yYWRlazogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2X3JhZGVrID0gZm9ybS5maW5kRmllbGRzKFwicmFkZWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZfYWt0ID0gZm9ybS5maW5kRmllbGRzKFwiYWt0aXZpdGFcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikuYWt0aXZpdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2X3N0YXZfdGV4dCA9ICh2X2FrdCA9PSA2MDAgPyBcIktlIHNjaHbDoWxlbsOtXCIgOiAodl9ha3QgPT0gMzAwID8gXCJOw6F2cmhcIiA6ICh2X2FrdCA9PSAxMDAgPyBcIlNjaHbDoWxlbm9cIiA6IFwiWmFtw610bnV0b1wiKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInN0YXZfdGV4dFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB2X3N0YXZfdGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2plX2l4c19mdW4gPSAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdl9zY2h2YWxvdmF0ZWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfZnVuX3NjaHZcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3ByZWRsb3ppdC52aXNpYmxlKHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2Vfc2NodmFsaXQudmlzaWJsZSh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3phbWl0bm91dC52aXNpYmxlKHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2VfdnJhdGl0LnZpc2libGUodHJ1ZSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZfcmFkZWsgPT0gMCkgeyAvLyBub3bDvSBJUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodl9zY2h2YWxvdmF0ZWwpIHsgLy8gamUgdnlwbG7Em24gc2NodmFsb3ZhdGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodl9zY2h2YWxvdmF0ZWwuaXhzX2Z1biA9PSBtb2plX2l4c19mdW4pIHsgLy8ganNlbSBzY2h2YWxvdmF0ZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV9wcmVkbG96aXQuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2Vfc2NodmFsaXQuZW5hYmxlZChjbnQubW9odV9lZGl0b3ZhdCAmJiAoKHZfYWt0ID09IDMwMCkgfHwgKHZfYWt0ID09IDYwMCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV96YW1pdG5vdXQuZW5hYmxlZChjbnQubW9odV9lZGl0b3ZhdCAmJiAoKHZfYWt0ID09IDMwMCkgfHwgKHZfYWt0ID09IDYwMCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NudC5ha2NlX3NjaHZhbGl0LmVuYWJsZWQoY250Lm1vaHVfZWRpdG92YXQgJiYgKCh2X2FrdCA9PSAzMDApIHx8ICh2X2FrdCA9PSA2MDApKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jbnQuYWtjZV96YW1pdG5vdXQuZW5hYmxlZChjbnQubW9odV9lZGl0b3ZhdCAmJiAoKHZfYWt0ID09IDMwMCkgfHwgKHZfYWt0ID09IDYwMCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV92cmF0aXQuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV9wcmVkbG96aXQuZW5hYmxlZChjbnQubW9odV9lZGl0b3ZhdCAmJiAodl9ha3QgPT0gMzAwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2Vfc2NodmFsaXQuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2VfemFtaXRub3V0LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3ZyYXRpdC5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3ByZWRsb3ppdC5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3NjaHZhbGl0LmVuYWJsZWQoY250Lm1vaHVfZWRpdG92YXQgJiYgKCh2X2FrdCA9PSAzMDApIHx8ICh2X2FrdCA9PSA2MDApKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV96YW1pdG5vdXQuZW5hYmxlZChjbnQubW9odV9lZGl0b3ZhdCAmJiAoKHZfYWt0ID09IDMwMCkgfHwgKHZfYWt0ID09IDYwMCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3ZyYXRpdC5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZfc2NodmFsb3ZhdGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodl9zY2h2YWxvdmF0ZWwuaXhzX2Z1biA9PSBtb2plX2l4c19mdW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV9wcmVkbG96aXQuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2Vfc2NodmFsaXQuZW5hYmxlZChjbnQubW9odV9lZGl0b3ZhdCAmJiAoKHZfYWt0ID09IDMwMCkgfHwgKHZfYWt0ID09IDYwMCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV96YW1pdG5vdXQuZW5hYmxlZChjbnQubW9odV9lZGl0b3ZhdCAmJiAoKHZfYWt0ID09IDMwMCkgfHwgKHZfYWt0ID09IDYwMCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV92cmF0aXQuZW5hYmxlZChjbnQubW9odV9lZGl0b3ZhdCAmJiAoKHZfYWt0ID09IDUwMCkgfHwgKHZfYWt0ID09IDEwMCkgfHwgKHZfYWt0ID09IDYwMCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNudC5ha2NlX3NjaHZhbGl0LmVuYWJsZWQoKCh2X2FrdCA9PSAzMDApIHx8ICh2X2FrdCA9PSA2MDApKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjbnQuYWtjZV96YW1pdG5vdXQuZW5hYmxlZCgoKHZfYWt0ID09IDMwMCkgfHwgKHZfYWt0ID09IDYwMCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNudC5ha2NlX3ZyYXRpdC5lbmFibGVkKCgodl9ha3QgPT0gNTAwKSB8fCAodl9ha3QgPT0gMTAwKSB8fCAodl9ha3QgPT0gNjAwKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2VfcHJlZGxveml0LmVuYWJsZWQoY250Lm1vaHVfZWRpdG92YXQgJiYgKHZfYWt0ID09IDMwMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3NjaHZhbGl0LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3phbWl0bm91dC5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV92cmF0aXQuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV9wcmVkbG96aXQuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV9zY2h2YWxpdC5lbmFibGVkKGNudC5tb2h1X2VkaXRvdmF0ICYmICgodl9ha3QgPT0gMzAwKSB8fCAodl9ha3QgPT0gNjAwKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2VfemFtaXRub3V0LmVuYWJsZWQoY250Lm1vaHVfZWRpdG92YXQgJiYgKCh2X2FrdCA9PSAzMDApIHx8ICh2X2FrdCA9PSA2MDApKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV92cmF0aXQuZW5hYmxlZChjbnQubW9odV9lZGl0b3ZhdCAmJiAoKHZfYWt0ID09IDUwMCkgfHwgKHZfYWt0ID09IDEwMCkgfHwgKHZfYWt0ID09IDYwMCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2J1dHRvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHsgcmVxdWlyZUVkaXQ6IGZhbHNlLCBhY3Rpb246IHRoYXQuYWtjZV96YW1pdG5vdXQgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHsgcmVxdWlyZUVkaXQ6IGZhbHNlLCBhY3Rpb246IHRoYXQuYWtjZV9zY2h2YWxpdCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmNha3RBREEoKSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LWhcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pdGVtVGVtcGxhdGU6IFwie2FrdGl2aXRhX3R4dH1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0aXZpdGFfbmV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgYWt0aXZpdGE6IFsxMDAsIDMwMCwgNTAwLCA2MDBdIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5ha3Rpdml0YV9uZXc9dmFsdWUuYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcImFrdGl2aXRhX3R4dFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZShldiwgc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHNlbGVjdGVkKSAmJiAoc2VsZWN0ZWQudmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJCh0aGlzKS5jbG9zZXN0KFwiLmdmb3JtXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZfcmFkZWs6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZfcmFkZWsgPSBmb3JtLmZpbmRGaWVsZHMoXCJyYWRla1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZfYWt0ID0gZm9ybS5maW5kRmllbGRzKFwiYWt0aXZpdGFfbmV3XCIpLmdmaWVsZChcImdldFZhbHVlXCIpLmFrdGl2aXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZfc3Rhdl90ZXh0ID0gKHZfYWt0ID09IDYwMCA/IFwiTsOhdnJoXCIgOiAodl9ha3QgPT0gMzAwID8gXCJLZSBzY2h2w6FsZW7DrVwiIDogKHZfYWt0ID09IDEwMCA/IFwiU2NodsOhbGVub1wiIDogXCJaYW3DrXRudXRvXCIpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInN0YXZfdGV4dF9uZXdcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdl9zdGF2X3RleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY2FrdEFEQSgpKVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAuYWRkUm93KFwiUMWZZWRrbGFkYXRlbFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LWhcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX3Nyb19wcmVka2xhZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfc3JvX3ByZWRrbGFkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQodGhpcykuY2xvc2VzdChcIi5nZm9ybVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4c19zcm9fcHJlZGtsYWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZfU2VTY2h2YWxvdmFjaVJvbGk6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19zcm9fcHJlZGtsYWQgPSBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfc3JvX3ByZWRrbGFkXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpeHNfc3JvX3ByZWRrbGFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZfU2VTY2h2YWxvdmFjaVJvbGkucHVzaChpeHNfc3JvX3ByZWRrbGFkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBteV9zZXJ2ZXJGaWx0ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlU2NodmFsb3ZhY2lSb2xpOiB2X1NlU2NodmFsb3ZhY2lSb2xpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVbmlvblNjaHZhbG92YWNpUm9sZUJlelNhYmxvbnk6IHZfU2VTY2h2YWxvdmFjaVJvbGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TRGF0dW1PZFNjaHZhbG92YWNpUm9sZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TRGF0dW1Eb1NjaHZhbG92YWNpUm9sZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtLmZpbmRGaWVsZHMoXCJpeHNfZnVuX3ByZWRcIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcIml4c19mdW5fcHJlZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJzZXJ2ZXJGaWx0ZXJzXCIsIG15X3NlcnZlckZpbHRlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgIC5hZGRSb3coXCJTY2h2YWxvdmF0ZWxcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy1oXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c19zcm9fc2NodmFsb3ZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3Nyb19zY2h2YWxvdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLmNsb3Nlc3QoXCIuZ2Zvcm1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpeHNfc3JvX3NjaHZhbG92OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2X1NlU2NodmFsb3ZhY2lSb2xpOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfc3JvX3NjaHZhbG92ID0gZm9ybS5maW5kRmllbGRzKFwiaXhzX3Nyb19zY2h2YWxvdlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXhzX3Nyb19zY2h2YWxvdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2X1NlU2NodmFsb3ZhY2lSb2xpLnB1c2goaXhzX3Nyb19zY2h2YWxvdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXlfc2VydmVyRmlsdGVyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZVNjaHZhbG92YWNpUm9saTogdl9TZVNjaHZhbG92YWNpUm9saSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVW5pb25TY2h2YWxvdmFjaVJvbGVCZXpTYWJsb255OiB2X1NlU2NodmFsb3ZhY2lSb2xpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU0RhdHVtT2RTY2h2YWxvdmFjaVJvbGU6IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1NEYXR1bURvU2NodmFsb3ZhY2lSb2xlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcIml4c19mdW5fc2NodlwiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfcG96X3NjaHZcIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcIml4c19mdW5fc2NodlwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJzZXJ2ZXJGaWx0ZXJzXCIsIG15X3NlcnZlckZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbnQuSVNQRm9ybS5hZGRSb3coXCLEjMOtc2xvIFBQXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImNpc2xvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpc2xvXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNudC5JU1BGb3JtLmFkZFJvdyhcIlDFmWVkcG9rbGFkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7c3J2c3RpcF9uYXpldn1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3RpcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHZhbGlkYXRlOiAodikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmICh2ID09IG51bGwgfHwgdi5peHNfdGlwID09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfdGlwPXZhbHVlLml4c190aXA7IG1vZGVsLml4c19wbGE9PnZhbHVlLml4c19wbGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcInNydnN0aXBfbmF6ZXZcIl0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZFRyYW5zZm9ybTogZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocyA9PSBudWxsKSByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHsgaXhzX3RpcDogXCJcIiwgbmF6ZXY6IHMgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQodGhpcykuY2xvc2VzdChcIi5nZm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdl9yYWRlazogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2X3JhZGVrID0gZm9ybS5maW5kRmllbGRzKFwicmFkZWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZfcmFkZWsgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcIml4c190aXBcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkLnZhbHVlIS5wcml6X3Bvdl9peGIgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGb3JtUm93cyhcInByaWxvaGFcIikuZ2Zvcm1yb3coXCJzZXRMYWJlbFwiLCBcIlDFmcOtbG9oYSAoKilcIiwgXCJKZSBwb8W+YWRvdsOhbm8gdmxvxb5lbsOtIHDFmcOtbG9oeVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGb3JtUm93cyhcInByaWxvaGFcIikuZ2Zvcm1yb3coXCJzZXRMYWJlbFwiLCBcIlDFmcOtbG9oYVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoc2VsZWN0ZWQudmFsdWUhLml4c19zcm9fc2NodmFsb3YgIT0gbnVsbCkgJiYgKHNlbGVjdGVkLnZhbHVlIS5peHNfc3JvX3NjaHZhbG92ICE9IFwiXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcIml4c19zcm9fc2NodmFsb3ZcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgc2VsZWN0ZWQudmFsdWUhLml4c19zcm9fc2NodmFsb3YpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHNlbGVjdGVkLnZhbHVlIS5peHNfc3JvX3ByZWRrbGFkICE9IG51bGwpICYmIChzZWxlY3RlZC52YWx1ZSEuaXhzX3Nyb19wcmVka2xhZCAhPSBcIlwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfc3JvX3ByZWRrbGFkXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHNlbGVjdGVkLnZhbHVlIS5peHNfc3JvX3ByZWRrbGFkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoc2VsZWN0ZWQudmFsdWUhLm5hemV2ICE9IG51bGwpICYmIChzZWxlY3RlZC52YWx1ZSEubmF6ZXYgIT0gXCJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwic3J2c3RpcF9uYXpldlwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBzZWxlY3RlZC52YWx1ZSEubmF6ZXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zcnZzdGlwQURBQWxsKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbnQuSVNQRm9ybS5hZGRSb3coXCJTdGF2IHNwbG7Em27DrVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZXZ6Y3NwZUFEQSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNjaHZfc3BlY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmljdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtjbnQudmFsaWRhdG9yc1tcInNfaW5wXCJdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNfaW5wPXNjaHZfc3BlY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlKGV2LCBzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIGZvcm0gPSAkKHRoaXMpLmNsb3Nlc3QoXCIuZ2Zvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfdGlwXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHZhciB0aGF0ID0gJC5jb250ZW50KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKHRoYXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChzZWxlY3RlZC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHZhciB0eXA6IG51bWJlciA9IHNlbGVjdGVkLnZhbHVlIS5zY2h2X3NwZWMhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoKHR5cCA9PSAxKSAmJiBjbnQubW9odV9lZGl0b3ZhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiZGF0X2lucFwiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB2YXIgZGF0dW1fcG9sZSA9IHRoYXQuZmluZEZpZWxkcyhcImRhdF9pbnBcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAoZGF0dW1fcG9sZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiZGF0X2lucFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBuZXcgRGF0ZShEYXRlLm5vdygpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfaW5wXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiZGF0X2lucFwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIHNwbG7Em27DrVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfaW5wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlDFmWVka2xhZGF0ZWxcIiwgaGludDogXCJQxZllZGtsYWRhdGVsXCIgfSkuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zZnVuKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbFvmR5IHDFmcOtc3R1cG7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvbMOtxI1rbyBqYWtvIHTFmWkgdGXEjWt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5fcHJlZFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbsOhemV2IHBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZnVuX3ByZWQ9dmFsdWUuaXhzX2Z1blwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbsOhdnJhdG92w6EgaG9kbm90YSBwb3V6ZSBpeHNfZnVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlDFmWVka2xhZGF0ZWxcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJDIDIzMzUyMDI4IDogTm92w70genByYWNvdmF0ZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJTY2h2YWxvdmF0ZWxcIiwgaGludDogXCJTY2h2YWxvdmF0ZWxcIiB9KS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbnNmdW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9sw63EjWtvIGpha28gdMWZaSB0ZcSNa3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl9zY2h2XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuw6F6ZXYgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19mdW5fc2Nodj12YWx1ZS5peHNfZnVuXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuw6F2cmF0b3bDoSBob2Rub3RhIHBvdXplIGl4c19mdW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiU2NodmFsb3ZhdGVsXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSQyAyMzM1MjAyOCA6IE5vdsO9IHpwcmFjb3ZhdGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhbGlkw6F0b3IgLSBwb2xlIG11c8OtIGLDvXQgdnlwbG7Em27DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2UoZXYsIHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLmNsb3Nlc3QoXCIuZ2Zvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vamVfaXhzX2Z1biA9ICgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkuSXhzRnVuQWt0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2X2FrdF9wb2xlID0gZm9ybS5maW5kRmllbGRzKFwiYWt0aXZpdGFcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVBc3luY1wiKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdl9ha3QgPSB2YWx1ZS5ha3Rpdml0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkICYmIHNlbGVjdGVkLnZhbHVlICYmIHNlbGVjdGVkLnZhbHVlLml4c19mdW4gIT0gbW9qZV9peHNfZnVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB2X2FrdCA9IDMwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGZvcm0uZmluZEZpZWxkcyhcImFrdGl2aXRhXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYWt0aXZpdGE6IDMwMCwgYWt0aXZpdGFfdHh0OiBcIm7DoXZyaFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZfYWt0ID09IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZfYWt0ID0gNjAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImFrdGl2aXRhXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYWt0aXZpdGE6IDYwMCwgYWt0aXZpdGFfdHh0OiBcImtlIHNjaHbDoWxlbsOtXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCAmJiBzZWxlY3RlZC52YWx1ZSkgeyAvLyBqZSB2eXBsbsSbbiBzY2h2YWxvdmF0ZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZC52YWx1ZS5peHNfZnVuID09IG1vamVfaXhzX2Z1bikgeyAvLyBqc2VtIHNjaHZhbG92YXRlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3ByZWRsb3ppdC5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV9zY2h2YWxpdC5lbmFibGVkKGNudC5tb2h1X2VkaXRvdmF0ICYmICgodl9ha3QgPT0gMzAwKSB8fCAodl9ha3QgPT0gNjAwKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3phbWl0bm91dC5lbmFibGVkKGNudC5tb2h1X2VkaXRvdmF0ICYmICgodl9ha3QgPT0gMzAwKSB8fCAodl9ha3QgPT0gNjAwKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3ZyYXRpdC5lbmFibGVkKGNudC5tb2h1X2VkaXRvdmF0ICYmICgodl9ha3QgPT0gNTAwKSB8fCAodl9ha3QgPT0gMTAwKSB8fCAodl9ha3QgPT0gNjAwKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgY250LmFrY2Vfc2NodmFsaXQuZW5hYmxlZCgoKHZfYWt0ID09IDMwMCkgfHwgKHZfYWt0ID09IDYwMCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNudC5ha2NlX3phbWl0bm91dC5lbmFibGVkKCgodl9ha3QgPT0gMzAwKSB8fCAodl9ha3QgPT0gNjAwKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgY250LmFrY2VfdnJhdGl0LmVuYWJsZWQoKCh2X2FrdCA9PSA1MDApIHx8ICh2X2FrdCA9PSAxMDApIHx8ICh2X2FrdCA9PSA2MDApKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV9wcmVkbG96aXQuZW5hYmxlZChjbnQubW9odV9lZGl0b3ZhdCAmJiAodl9ha3QgPT0gMzAwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2Vfc2NodmFsaXQuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2VfemFtaXRub3V0LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3ZyYXRpdC5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YV9uZXdcIikuZ2ZpZWxkKFwicmVzZXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwic3Rhdl90ZXh0X25ld1wiKS5nZmllbGQoXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3ByZWRsb3ppdC5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3NjaHZhbGl0LmVuYWJsZWQoY250Lm1vaHVfZWRpdG92YXQgJiYgKCh2X2FrdCA9PSAzMDApIHx8ICh2X2FrdCA9PSA2MDApKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV96YW1pdG5vdXQuZW5hYmxlZChjbnQubW9odV9lZGl0b3ZhdCAmJiAoKHZfYWt0ID09IDMwMCkgfHwgKHZfYWt0ID09IDYwMCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3ZyYXRpdC5lbmFibGVkKGNudC5tb2h1X2VkaXRvdmF0ICYmICgodl9ha3QgPT0gNTAwKSB8fCAodl9ha3QgPT0gMTAwKSB8fCAodl9ha3QgPT0gNjAwKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlRlcm3DrW4gcHJvIHNjaHbDoWxlbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Bvel9zY2h2XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJQxZnDrWxvaGFcIiwgcmVxdWlyZWQ6IGZhbHNlLCBuYW1lOiBcInByaWxvaGFcIiwgaGludDogXCJQxZnDrWxvaGFcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3BvcGlzOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeGJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW2NudC52YWxpZGF0b3JzW1wiaXhiXCJdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4Yj12YWx1ZS5peGJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peGI9dmFsdWUuaXhiLG1vZGVsLml4cz0+dmFsdWUuaXhzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJwb3Bpc1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRUcmFuc2Zvcm06IGZ1bmN0aW9uIChzKSB7IHJldHVybiB7IHBvcGlzOiAnJyB9OyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgaXhzOiB0aGF0LmFrdF9peHMgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZUVkaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICgocmFkZWtJU1AuaXhiKSAmJiAocmFkZWtJU1AuaXhiICE9PSBcIlwiKSkgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpbG9oYVpvYnJhekFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRvd25sb2FkXCIsIC8vXCJnaS1lYXR0YWNobWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChyYWRla0lTUC5peGIpICYmIChyYWRla0lTUC5peGIgIT09IFwiXCIpKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgZXhpc3R1amUgdnlicmFuw70gesOhem5hbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnYyA9IG5ldyBHQ29udGVudChcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBa2NlSVNQU2V6bmFtXCIpOyAvL2RvdGHFvmVuw60gxZnDoWRrdSB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2MuY2FsbDxHb3JkaWMuR2luLkludGVyZmFjZS5HRmlsZUluU3RyaW5nRHRvPihcIkdldEZpbGVaVWxvemlzdGVcIiwgeyBJeGI6IHJhZGVrSVNQLml4YiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHQnJvd3NlckV4dHJhcy5kb2N1bWVudFNhdmVPcGVuTG9jYWwoci5OYW1lISwgci5CeXRlcyEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXRWYWwpIHsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikgeyBHb3JkaWMuR3VpLldlYkFwcC5VdGlscy5zaG93UmVhc29uRmxhc2goZ2MsIGVycik7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2MuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2U6IGZ1bmN0aW9uIChldiwgc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHZhciBmb3JtID0gJCh0aGlzKS5jbG9zZXN0KFwiLmdmb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIHZfcmFkZWs6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB2X3JhZGVrID0gZm9ybS5maW5kRmllbGRzKFwicmFkZWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAodl9yYWRlayA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfdGlwXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgR29yZGljLlByZWZhYnMuU2VsZWN0LmlTUFByaWxvaGEoKSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNudC5JU1BGb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkFrdHXDoWxuw60gc3RhdlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfdGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNudC5JU1BGb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUHJvY2VzIHNjaHbDoWxlbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2J1dHRvblwiLCBcIlwiLCB7IHBhcmFtczogeyBhY3Rpb246IGNudC5ha2NlX3ByZWRsb3ppdCB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdidXR0b25cIiwgXCJcIiwgeyBwYXJhbXM6IHsgYWN0aW9uOiBjbnQuYWtjZV9zY2h2YWxpdCB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdidXR0b25cIiwgXCJcIiwgeyBwYXJhbXM6IHsgYWN0aW9uOiBjbnQuYWtjZV96YW1pdG5vdXQgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnYnV0dG9uXCIsIFwiXCIsIHsgcGFyYW1zOiB7IGFjdGlvbjogY250LmFrY2VfdnJhdGl0IH0gfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNudC5JU1BGb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJOb3bDvSBzdGF2XCIsIHsgbmFtZTogXCJyYWRla19ub3Z5X3N0YXZcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfdGV4dF9uZXdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY250Lm1vaHVfZWRpdG92YXQgPSAoKHJhZGVrSVNQLlBlcm1pc3Npb25zIS5MemVFZGl0b3ZhdC52YWx1ZSEpICYmIChjbnQuZ2xvYmFscy5QYXJhbV9VbG9oYV9TY2h2YWxvdmFuaV9JUCA9PT0gSW50ZXJmYWNlLlByaXN0dXBLVWxvemVFbnVtLkFub19FZGl0YWNlKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRCYXI6IChNZW51UGFyYW1zIHwgR1NpbXBsZURpYWxvZ0NvbW1hbmQpW10gPSAoY250Lm1vaHVfZWRpdG92YXQgPT0gdHJ1ZSkgPyBbXCJvayFcIiwgXCJjYW5jZWxcIl0gOiBbXCJjYW5jZWwhXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9tX3Z5c2xlZGVrID0gY250LmRpYWxvZ3Muc2ltcGxlRm9ybShcIkRldGFpbCBJUFwiLCBjbnQuSVNQRm9ybSwgcmFkZWtJU1AsIHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA2MDAsIGNvbW1hbmRCYXI6IGNvbW1hbmRCYXJ9ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb21fdnlzbGVkZWtfcHJvID0gcHJvbV92eXNsZWRlay5jcmVhdGVEaWFsb2dQcm9taXNlKCAvKlwiY2xvc2VcIiovLypcInllc1wiKi8vKlwib2tcIiovLyosIHsgZHV2b2Q6IHN0cmluZyB9Ki8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmFkZWtJU1BcIiwgcmFkZWtJU1ApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ha3Rpdml0YSAhPSBkYXRhLmFrdGl2aXRhX25ldykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmFrdGl2aXRhID0gZGF0YS5ha3Rpdml0YV9uZXc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuaXNsLkFrY2VJU1AudXBkYXRlKHsgZGF0YTogZGF0YSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyYWRla0lTUCB1bG96ZW5vXCIsIHJhZGVrSVNQKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczoge30gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbG96ZW5vXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgIHZhciBkZXRhaWx3aW5kb3cgPSBjbnQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgIC8vICAgICAgICBbXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HRGV0YWlsQWtjZVwiLCB7IGdyaWRSZW1vdGVDb250cm9sOiBub3ZhYWtjZSA9PSBmYWxzZSA/IGdyaWRSQyA6IG51bGwsIGdwYzogR29yZGljLkVrby5VdGlscy5jcmVhdGVCb29rR3BjKGNudC5ncGMsIHZ5YnJhbmVSYWRreS5peHNfcGxhISkgfV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWQ6ICdEZXRhaWxEb2tsYWR1IycsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY2lzbG86IGxfY2lzbG8sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaXhzX2NpYTogbF9peHNfY2lhLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIFJlemltUHJvdm96dTogdGhpcy5nbG9iYWxzLlJlemltUHJvdm96dSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBFZGl0YWJsZTogZWRpdGFibGUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgTm92YUFrY2U6IG5vdmFha2NlXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgIHZhciB3aW5kb3dDb250ZW50ID0gJC5jb250ZW50KGRldGFpbHdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICB3aW5kb3dDb250ZW50Lm9uKFwiYWRhX3NhdmVha2NlX3NldF9zdGF2X2F6XCIsIGZ1bmN0aW9uIChyZXRWYWwpIHtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICB2YXIgZmlsdGVyRHRvOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU2V6bmFtQWRhRmlsdGVyRHRvID0ge307XHJcbiAgICAgICAgICAgIC8vICAgICAgICBmaWx0ZXJEdG8uY2lzbG8gPSB7IHN0YXJ0OiByZXRWYWwuZGF0YVswXS5jaXNsbywgZW5kOiByZXRWYWwuZGF0YVswXS5jaXNsbyB9O1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIGNudC52aWV3X0lTTC5yZXF1ZXN0RGF0YSh7IGZpbHRlcnM6IGZpbHRlckR0byB9LCB7IHVwZGF0ZU1vZGU6IFwidXBkYXRlXCIgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gICAgd2luZG93Q29udGVudC5lbGVtZW50Lm9uKCdjb250ZW50Y2xvc2VkJywgKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGNudC5tYWluVGFibGUuZ2dyaWQoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgIC8vICAgIH0pOyAvLyBwxZlpIHphdsWZZW7DrSBkZXRhaWx1IHNlIG5hc3RhdsOtIGZvY3VzIG5hIGdyaWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG5hc3Rhdl9zdGF2X2lwKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciB2eWJyYW5lUmFka3k6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdJU1BBa2NlRHRvW10gPSB0aGF0LmZpbmQoXCIuanMtU2V6bmFtU2NodmFsb3ZhbmlJUFwiKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTsgIC8vIG5hxI10ZW7DrSBwxZllcyB2eWhsZWTDoW7DrSBncmlkdSAocMWZZXMgY2xhc3MpXHJcbiAgICAgICAgICAgIGlmICh2eWJyYW5lUmFka3kubGVuZ3RoID4gMCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0dWplIHZ5YnJhbsO9IMWZw6FkZWtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYV9zdGF2X2F6X2FrY2VfaHJvbV9BWih0aGF0LCB0aGF0LnZpZXdfSVNMLCB0aGF0Lmdsb2JhbHMsIHZ5YnJhbmVSYWRreSwgYWt0X3JvbGUsIGFrdF9zdGF2KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgcHVibGljIHptZW5hX3N0YXZfYXpfYWtjZV9ocm9tX0FaKGdjb250ZW50OiBHQ29udGVudCwgcG9obGVkOiBHb3JkaWMuSXNsLlZpZXcsIGdsb2JhbHk6IGFueSwgdnlicmFuZVJhZGt5OiBBZGEuSW50ZXJmYWNlLkdBa2NlRHRvW10sIGFrdF9yb2xlOiBudW1iZXIsIGFrdF9zdGF2OiBudW1iZXIpOiBKUXVlcnlQcm9taXNlPEFkYS5JbnRlcmZhY2UuR0FrY2VEdG9bXT4ge1xyXG4vLyAgICAgICAgICAgIHZhciBsX2Npc2xvID0gXCJcIjtcclxuLy8gICAgICAgICAgICB2YXIgbF9peHNfY2lhID0gXCJcIjtcclxuLy8gICAgICAgICAgICB2YXIgbF9pY28gPSBcIlwiO1xyXG4vLyAgICAgICAgICAgIHZhciBsX3JvayA9IDA7XHJcblxyXG4vLyAgICAgICAgICAgIHZhciB0aGF0ID0gZ2NvbnRlbnQ7XHJcblxyXG4vLyAgICAgICAgICAgIGxldCBkZWZDbG9zZSA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbi8vICAgICAgICAgICAgdmFyIGNvbmZpcm1RdWVzdGlvbiA9IFwiXCI7IC8vIHByb21lbm5hIG5hIHByZW5vcyBtZXppIGtyb2t5XHJcblxyXG4vLyAgICAgICAgICAgIHZhciBtb2RlbERhdGFGaXJzdCA9IHsgbmV3X3N0YXZfYXo6IDAgfTsgLy8gcG91xb5pdMOhIHByb23Em25uw6EgcHJvIHDFmWVub3MgbWV6aSBrcm9reVxyXG4vLyAgICAgICAgICAgIHZhciBwb2xlX3NlcnZlckZpbHRyID0gbmV3IEFycmF5KCk7XHJcbi8vICAgICAgICAgICAgdmFyIGluaXRfdmFsdWUgPSAwO1xyXG4vLztcclxuLy8gICAgICAgICAgICAvL3sgbmF6ZXY6IFwiWnByYWNvdmF0ZWxcIiwgaWQ6IDAgfSxcclxuLy8gICAgICAgICAgICAvL3sgbmF6ZXY6IFwiS29tcGV0ZW50XCIsIGlkOiAxIH0sXHJcbi8vICAgICAgICAgICAgLy97IG5hemV2OiBcIkZpbmFuxI1uw60ga29tcGV0ZW50IEFaXCIsIGlkOiAyIH1cclxuXHJcbi8vICAgICAgICAgICAgaWYgKGFrdF9yb2xlID09IDApIHtcclxuLy8gICAgICAgICAgICAgICAgaWYgKGFrdF9zdGF2ID09IDApIHtcclxuLy8gICAgICAgICAgICAgICAgICAgIHBvbGVfc2VydmVyRmlsdHIgPSBbMl07XHJcbi8vICAgICAgICAgICAgICAgICAgICBpbml0X3ZhbHVlID0gMjtcclxuLy8gICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICBpZiAoYWt0X3N0YXYgPT0gMikge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0ciA9IFswLCAzXTtcclxuLy8gICAgICAgICAgICAgICAgICAgIGluaXRfdmFsdWUgPSAzO1xyXG4vLyAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgIGlmIChha3Rfc3RhdiA9PSAzKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICBwb2xlX3NlcnZlckZpbHRyID0gWzIsIDFdO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgaW5pdF92YWx1ZSA9IDE7XHJcbi8vICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgaWYgKGFrdF9zdGF2ID09IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgIHBvbGVfc2VydmVyRmlsdHIgPSBbM107XHJcbi8vICAgICAgICAgICAgICAgICAgICBpbml0X3ZhbHVlID0gMztcclxuLy8gICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgaWYgKGFrdF9yb2xlID09IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgaWYgKGFrdF9zdGF2ID09IDIpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgIHBvbGVfc2VydmVyRmlsdHIgPSBbM107XHJcbi8vICAgICAgICAgICAgICAgICAgICBpbml0X3ZhbHVlID0gMztcclxuLy8gICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICBpZiAoYWt0X3N0YXYgPT0gMykge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0ciA9IFsyLCAxXTtcclxuLy8gICAgICAgICAgICAgICAgICAgIGluaXRfdmFsdWUgPSAxO1xyXG4vLyAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgIGlmIChha3Rfc3RhdiA9PSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICBwb2xlX3NlcnZlckZpbHRyID0gWzNdO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgaW5pdF92YWx1ZSA9IDM7XHJcbi8vICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgIGlmIChha3Rfcm9sZSA9PSAyKSB7XHJcbi8vICAgICAgICAgICAgICAgIGlmIChha3Rfc3RhdiA9PSAgMCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0ciA9IFsyXTtcclxuLy8gICAgICAgICAgICAgICAgICAgIGluaXRfdmFsdWUgPSAyO1xyXG4vLyAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgIGlmIChha3Rfc3RhdiA9PSAyKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICBwb2xlX3NlcnZlckZpbHRyID0gWzBdO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgaW5pdF92YWx1ZSA9IDA7XHJcbi8vICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgbW9kZWxEYXRhRmlyc3QubmV3X3N0YXZfYXogPSBpbml0X3ZhbHVlO1xyXG5cclxuLy8vLyAsIGluaXRpYWxWYWx1ZTogeyBzdGF2X2F6OiBpbml0X3ZhbHVlIH1cclxuXHJcbi8vICAgICAgICAgICAgdmFyIGxfb0Zvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIndpelBhcmFtc1wiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0yLTgtMiwgTS0yLTgtMiwgUy0xMi0xMi0wXCIgfSlcclxuLy8gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk5vdsO9IHN0YXYgQVpcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zcnZjc2F6KCksIHtcclxuLy8gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl9helwiLCBtb2RlbDogXCJtb2RlbC5uZXdfc3Rhdl9hej12YWx1ZS5zdGF2X2F6XCIsIG11bHRpOiBmYWxzZSwgbGlzdDogdHJ1ZSwgaXRlbVdpZHRoOiBcIlwiLCBkaXNhYmxlZDogZmFsc2UsIHNlcnZlckZpbHRlcnM6IHsgc3Rhdl9hejogcG9sZV9zZXJ2ZXJGaWx0ciB9LCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4vLyAgICAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiXCIgfSlcclxuXHJcbi8vICAgICAgICAgICAgdmFyIGNvbmZpcm1RdWVzdGlvbiA9IFwiXCI7IC8vIHByb21lbm5hIG5hIHByZW5vcyBtZXppIGtyb2t5XHJcblxyXG4vLyAgICAgICAgICAgIHRoYXQubmF2aWdhdGU8R29yZGljLkVrby5Db21wb25lbnRzLlRocmVlU3RlcHNPcHRpb25zPEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvPj4oR29yZGljLkVrby5Db21wb25lbnRzLlRocmVlU3RlcHNDb250ZW50LCB7XHJcbi8vICAgICAgICAgICAgICAgIElEOiBcIndpel9wcmVldmlkZW5jZV9ha2NlXCIsXHJcbi8vICAgICAgICAgICAgICAgIGtleXM6IHBvaGxlZC5rZXlzLCAvLyBrbGljXHJcblxyXG4vLyAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiB0aGlzLmdyaWRGb3JtYXRTZXpuYW0sIC8vIG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCkuYWRkKHRoYXQuZmluZChcIi5qcy1TZXpuYW1TY2h2YWxvdmFuaUlQXCIpLmdncmlkPEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvLCBcImNvbHVtbnNcIj4oXCJvcHRpb25cIiwgXCJjb2x1bW5zXCIpIHx8IFtdKSwgLy9ncmlkZm9ybWF0XHJcbi8vICAgICAgICAgICAgICAgIHRpdGxlOiBcIlptxJtuYSBzdGF2dSBBWlwiLCAvLyB0aXR1bGVrXHJcbi8vICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcblxyXG4vLyAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHsgLy9wcnZuaSBrcm9rXHJcbi8vICAgICAgICAgICAgICAgICAgICBmb3JtOiBsX29Gb3JtLCAvLyBwcmVmYWIgZm9ybXVcclxuLy8gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJaw6F6bmFteSBrZSB6cHJhY292w6Fuw61cIiwgLy8gcG9waXNlayB0YWJ1XHJcbi8vICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLCAvL3ByaXpuYWssIHpkYSB6b2JyYXppdCBrcGkgcGFuZWxcclxuLy8gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlZzdHVwbsOtIHBhcmFtZXRyeVwiLFxyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgIGZpZWxkQ2hhbmdlRGVsZWdhdGU6IGZ1bmN0aW9uICh0aGlzOiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuRmlyc3RTdGVwPEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvPiwgZXYsIG9iaikge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIC8vR29yZGljLkVrby5Db21wb25lbnRzLnJ1bkNoZWNrQWN0aW9uKGV2LnRhcmdldCwgdGhpcywgb2JqLndpemFyZE1vZGVsKTtcclxuLy8gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy9kZXNjcmlwdGlvbjogXCJLb3BpZSBha2PDrVwiLCAvLyBwb3Bpc2VrXHJcbi8vICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGE6IG1vZGVsRGF0YUZpcnN0LFxyXG4vLyAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbk5hbWU6IFwiWm3Em25pdCBzdGF2IEFaXCIsXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbjogKG1vZGVsLCBpbnB1dCkgPT4geyAvLyBha2NlIHBybyBwcmVjaG9kIG1lemkga3Jva3lcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGFGaXJzdCA9IG1vZGVsO1xyXG5cclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcnZpY2VDb250ZW50ID0gZ2NvbnRlbnQuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZUhyb21hZG5lT3BlcmFjZVRhYlwiKTsgICAgICAgICAgLy8gc2VydmVyb3bDvSBvYmpla3RcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZUNvbnRlbnRcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoXCJMemVTZXRTdGF2QVpBa2NlXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rbGFkeTogaW5wdXQsIC8vaW5wdXQubWFwKGZ1bmN0aW9uIChkKSB7IHJldHVybiB7IHJvazogZC5yb2ssIGljbzogZC5pY28sIGNpc2xvOiBkLmNpc2xvIH0gfSksXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBuZXdfc3Rhdl9hejogbW9kZWxEYXRhRmlyc3QubmV3X3N0YXZfYXogfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzdWx0OiB7IHJlc3VsdDogeyBkYXRhOiBBZGEuSW50ZXJmYWNlLkdBa2NlRHRvLCBlcnJvcnM6IHsgbWVzc2FnZTogc3RyaW5nIH1bXSwga2luZDogR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZCB9W10gfSkgPT4ge1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPEFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+KHJlc3VsdCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAvL21lbnVHcmlkQmFyOiAvLyBkYWxzaSBha2NlIHYgZ3JpZHUgLSBwb2RsZSBtZXRvZGlreSBsemUgemRlIG1pdCBkZXRhaWwgZG9rbGFkdSBhdGQuIGF0ZC5cclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgIFtcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIGRldGFpbFxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgbmFtZTogXCJhY3REZXRhaWxcIixcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHZhciBjbnQxID0gdGhpcztcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSAkKGN0eC5ncmlkKTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdmFyIHZ5YnJhbnlSYWRla19ocm86IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvID0gZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTsgIC8vIG5hxI10ZW7DrSBwxZllcyB2eWhsZWTDoW7DrSBncmlkdSAocMWZZXMgY2xhc3MpXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKHZ5YnJhbnlSYWRla19ocm8uY2lzbG8gIT0gXCJcIikgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0dWplIHZ5YnJhbsO9IMWZw6FkZWtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXRhaWx3aW5kb3cgPSAkLmNvbnRlbnQoZXYudGFyZ2V0KS5uYXZpZ2F0ZShcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdEZXRhaWxBa2NlXCIsIHsgZ3JpZFJlbW90ZUNvbnRyb2w6IG5ldyBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkMoZ3JpZCkgfV0sXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdEZXRhaWxEb2tsYWR1MiMnLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpc2xvOiB2eWJyYW55UmFkZWtfaHJvLmNpc2xvLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19jaWE6IHZ5YnJhbnlSYWRla19ocm8uaXhzX2NpYSxcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXppbVByb3ZvenU6IHRoYXQuZ2xvYmFscy5SZXppbVByb3ZvenUsXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRWRpdGFibGU6IHRoYXQuZ2xvYmFscy5QYXJhbV9Ba2NlX0VkaXRhY2VfVFAsXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTm92YUFrY2U6IGZhbHNlXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aW5kb3dDb250ZW50ID0gJC5jb250ZW50KGRldGFpbHdpbmRvdyk7XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dDb250ZW50Lm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGN0eCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd0NvbnRlbnQub24oXCJhZGFfc2F2ZWFrY2VcIiwgZnVuY3Rpb24gKGN0eCkge1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJEdG86IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTZXpuYW1BZGFGaWx0ZXJEdG8gPSB7fTtcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZmlsdGVyRHRvLmNpc2xvID0geyBzdGFydDogdnlicmFueVJhZGVrX2hyby5jaXNsbyEudG9TdHJpbmcoKSwgZW5kOiB2eWJyYW55UmFkZWtfaHJvLmNpc2xvIS50b1N0cmluZygpIH07XHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uY2lzbG8gPSB7IHN0YXJ0OiBjdHguZGF0YS5jaXNsbyEudG9TdHJpbmcoKSwgZW5kOiBjdHguZGF0YS5jaXNsbyEudG9TdHJpbmcoKSB9O1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGdyaWTFr1xyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmVqcHJ2ZSBobGF2bmkgc2V6bmFtIGFwbGlrYWNlXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogZmlsdGVyRHRvIH0sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhIHBhayBzZXpuYW0geiBwcsWvdm9kY2VcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Ba2NlLmxpc3QoeyBmaWx0ZXJzOiBmaWx0ZXJEdG8sIGZyYWdtZW50czogW1wiUGVybWlzc2lvbnNcIiwgXCIqXCJdIH0pXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudDEudmlld19kYXRhID0gZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIGRhdGFbMF0sIHsgd2l6X2NoZWNrOiB0cnVlIH0pO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQxLnZpZXdfZGF0YS51cGRhdGVEYXRhKGRhdGEsIFwidXBkYXRlXCIpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICBdLFxyXG5cclxuLy8gICAgICAgICAgICAgICAgfSxcclxuXHJcbi8vICAgICAgICAgICAgICAgIHNlY29uZFN0ZXA6IHsgLy9wcnZuaSBrcm9rXHJcbi8vICAgICAgICAgICAgICAgICAgICBmb3JtOiBsX29Gb3JtLCAvLyBwcmVmYWIgZm9ybXVcclxuLy8gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJaw6F6bmFteSBrZSB6cHJhY292w6Fuw61cIiwgLy8gcG9waXNlayB0YWJ1XHJcbi8vICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLCAvL3ByaXpuYWssIHpkYSB6b2JyYXppdCBrcGkgcGFuZWxcclxuLy8gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlptxJtuYSBzdGF2dSBBWlwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgZmllbGRDaGFuZ2VEZWxlZ2F0ZTogZnVuY3Rpb24gKHRoaXM6IEdvcmRpYy5Fa28uQ29tcG9uZW50cy5GaXJzdFN0ZXA8R29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+LCBldiwgb2JqKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgLy9Hb3JkaWMuRWtvLkNvbXBvbmVudHMucnVuQ2hlY2tBY3Rpb24oZXYudGFyZ2V0LCB0aGlzLCBvYmoud2l6YXJkTW9kZWwpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAvL2Rlc2NyaXB0aW9uOiBcIktvcGllIGFrY8OtXCIsIC8vIHBvcGlzZWtcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vbW9kZWxEYXRhOiBtb2RlbERhdGFGaXJzdCxcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGE6ICgpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3X3N0YXZfYXo6IG1vZGVsRGF0YUZpcnN0Lm5ld19zdGF2X2F6XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uTmFtZTogXCJabcSbbml0IHN0YXYgQVpcIixcclxuLy8gICAgICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAobW9kZWwsIGlucHV0KSA9PiB7IC8vIGFrY2UgcHJvIGtvbnRyb2x1IGRhdFxyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IG1vZGVsRGF0YUZpcnN0O1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VydmljZUNvbnRlbnQgPSB0aGF0LmNyZWF0ZVNlcnZpY2VDb250ZW50KFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VIcm9tYWRuZU9wZXJhY2VUYWJcIik7ICAgICAgICAgIC8vIHNlcnZlcm92w70gb2JqZWt0XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlQ29udGVudFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChcIkx6ZVNldFN0YXZBWkFrY2VcIixcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tsYWR5OiBpbnB1dCwgLy9pbnB1dC5tYXAoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHsgcm9rOiBkLnJvaywgaWNvOiBkLmljbywgY2lzbG86IGQuY2lzbG8gfSB9KSxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IG5ld19zdGF2X2F6OiBtb2RlbERhdGFGaXJzdC5uZXdfc3Rhdl9heiB9XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXN1bHQ6IHsgcmVzdWx0OiB7IGRhdGE6IEFkYS5JbnRlcmZhY2UuR0FrY2VEdG8sIGVycm9yczogeyBtZXNzYWdlOiBzdHJpbmcgfVtdLCBraW5kOiBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kIH1bXSB9KSA9PiB7XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8QWRhLkludGVyZmFjZS5HQWtjZUR0bz4ocmVzdWx0KTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgaW5wdXQpID0+IHsgLy8gYWtjZSBwcm8gcHJlY2hvZCBtZXppIGtyb2t5XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhRmlyc3QgPSBtb2RlbDtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcnZpY2VDb250ZW50ID0gdGhhdC5jcmVhdGVTZXJ2aWNlQ29udGVudChcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBa2NlSHJvbWFkbmVPcGVyYWNlVGFiXCIpOyAgICAgICAgICAvLyBzZXJ2ZXJvdsO9IG9iamVrdFxyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZUNvbnRlbnRcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoXCJTZXRTdGF2QVpBa2NlXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rbGFkeTogaW5wdXQsIC8vaW5wdXQubWFwKGZ1bmN0aW9uIChkKSB7IHJldHVybiB7IHJvazogZC5yb2ssIGljbzogZC5pY28sIGNpc2xvOiBkLmNpc2xvIH0gfSksXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBuZXdfc3Rhdl9hejogbW9kZWxEYXRhRmlyc3QubmV3X3N0YXZfYXogfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzdWx0OiB7IHJlc3VsdDogeyBkYXRhOiBBZGEuSW50ZXJmYWNlLkdBa2NlRHRvLCBlcnJvcnM6IHsgbWVzc2FnZTogc3RyaW5nIH1bXSwga2luZDogR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZCB9W10gfSkgPT4ge1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPEFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+KHJlc3VsdCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICBtZW51R3JpZEJhcjogLy8gZGFsc2kgYWtjZSB2IGdyaWR1IC0gcG9kbGUgbWV0b2Rpa3kgbHplIHpkZSBtaXQgZGV0YWlsIGRva2xhZHUgYXRkLiBhdGQuXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgW1xyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHtcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gZGV0YWlsXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBuYW1lOiBcImFjdERldGFpbFwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIixcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdmFyIGNudDEgPSB0aGlzO1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9ICQoY3R4LmdyaWQpO1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB2YXIgdnlicmFueVJhZGVrX2hybzogR29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG8gPSBncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpOyAgLy8gbmHEjXRlbsOtIHDFmWVzIHZ5aGxlZMOhbsOtIGdyaWR1IChwxZllcyBjbGFzcylcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAodnlicmFueVJhZGVrX2hyby5jaXNsbyAhPSBcIlwiKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3R1amUgdnlicmFuw70gxZnDoWRla1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgZGV0YWlsd2luZG93ID0gdGhhdC5uYXZpZ2F0ZShcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRldGFpbHdpbmRvdyA9ICQuY29udGVudChldi50YXJnZXQpLm5hdmlnYXRlKFxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiR29yZGljLkFkYS5XZWJDbGllbnQuR0RldGFpbEFrY2VcIiwgeyBncmlkUmVtb3RlQ29udHJvbDogbmV3IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQyhncmlkKSB9XSxcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0RldGFpbERva2xhZHUyIycsXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lzbG86IHZ5YnJhbnlSYWRla19ocm8uY2lzbG8sXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2NpYTogdnlicmFueVJhZGVrX2hyby5peHNfY2lhLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlemltUHJvdm96dTogdGhhdC5nbG9iYWxzLlJlemltUHJvdm96dSxcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZGl0YWJsZTogdGhhdC5nbG9iYWxzLlBhcmFtX0FrY2VfRWRpdGFjZV9UUCxcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOb3ZhQWtjZTogZmFsc2VcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpbmRvd0NvbnRlbnQgPSAkLmNvbnRlbnQoZGV0YWlsd2luZG93KTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd0NvbnRlbnQub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoY3R4KSB7XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd0NvbnRlbnQub24oXCJhZGFfc2F2ZWFrY2VcIiwgZnVuY3Rpb24gKGN0eCkge1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJEdG86IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTZXpuYW1BZGFGaWx0ZXJEdG8gPSB7fTtcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZmlsdGVyRHRvLmNpc2xvID0geyBzdGFydDogdnlicmFueVJhZGVrX2hyby5jaXNsbyEudG9TdHJpbmcoKSwgZW5kOiB2eWJyYW55UmFkZWtfaHJvLmNpc2xvIS50b1N0cmluZygpIH07XHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uY2lzbG8gPSB7IHN0YXJ0OiBjdHguZGF0YS5jaXNsbyEudG9TdHJpbmcoKSwgZW5kOiBjdHguZGF0YS5jaXNsbyEudG9TdHJpbmcoKSB9O1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGdyaWTFr1xyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmVqcHJ2ZSBobGF2bmkgc2V6bmFtIGFwbGlrYWNlXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogZmlsdGVyRHRvIH0sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhIHBhayBzZXpuYW0geiBwcsWvdm9kY2VcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5pc2wuQWtjZS5saXN0KFxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcnEgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiB7IGZpbHRlcnM6IGZpbHRlckR0bywgZnJhZ21lbnRzOiBbXCJQZXJtaXNzaW9uc1wiLCBcIipcIl0gfTtcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0pXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuQWtjZS5saXN0KHsgZmlsdGVyczogZmlsdGVyRHRvLCBmcmFnbWVudHM6IFtcIlBlcm1pc3Npb25zXCIsIFwiKlwiXSB9KVxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQxLnZpZXdfZGF0YSA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQxLnZpZXdfZGF0YS51cGRhdGVEYXRhKGRhdGEsIFwidXBkYXRlXCIpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3tcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gZGV0YWlsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJhY3RUaXNrXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY2FwdGlvbjogXCJUaXNrXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0pXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuXHJcbi8vICAgICAgICAgICAgICAgIH0sXHJcblxyXG4vLyAgICAgICAgICAgICAgICBsYXN0U3RlcDogLy8gcG9zbGVkbmkga3Jva1xyXG4vLyAgICAgICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAvLyBmw6F6ZSAyIC0gem9icmF6ZW7DrSB2w71zbGVka3Ugc3Rvcm5hXHJcbi8vICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJWw71zbGVkZWtcIixcclxuLy8gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJacHJhY292YW7DqSB6w6F6bmFteVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgZm9ybTogbF9vRm9ybSxcclxuLy8gICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YTogKCkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld19zdGF2X2F6OiBtb2RlbERhdGFGaXJzdC5uZXdfc3Rhdl9helxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgICAgIGRhdGE6IHZ5YnJhbmVSYWRreSwgLy8gZGF0YVxyXG4vLyAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAodmlldykgPT4geyAvLyBkZWxlZ2F0LCBrdGVyeSBzZSB2b2xhIHBvIHVrb25jZW5pIHBydXZvZGNlXHJcbi8vICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgLy90aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHt9LCB7IHVwZGF0ZU1vZGU6IFwidXBkYXRlXCIgfSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlckR0bzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1Nlem5hbUFkYUZpbHRlckR0byA9IHt9O1xyXG4vLyAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLmFrdGl2aXRhID0geyBvOiBcIklOXCIsIHY6IFsxMDAsIDMwMF0gfTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tb2RlbF9maWx0ci5yb2xlID09IDApIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2Z1bl9ha3QgPSB7IG86IFwiPVwiLCB2OiAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCB9O1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5peHNfZnVuX2F6ID0gbnVsbDtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8ua29tcCA9IG51bGw7XHJcbi8vICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsX2ZpbHRyLnJvbGUgPT0gMSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5peHNfZnVuX2FrdCA9IG51bGw7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLml4c19mdW5fYXogPSBudWxsO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5rb21wID0geyBvOiBcIj1cIiwgdjogKCQuY29udGVudChcIm1haW5cIikgYXMgYW55KS5JeHNGdW5Ba3QgfTtcclxuLy8gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxfZmlsdHIucm9sZSA9PSAyKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLml4c19mdW5fYWt0ID0gbnVsbDtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2Z1bl9heiA9IHsgbzogXCI9XCIsIHY6ICgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkuSXhzRnVuQWt0IH07XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLmtvbXAgPSBudWxsO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tb2RlbF9maWx0ciAmJiB0aGF0Lm1vZGVsX2ZpbHRyLnN0YXZfYXogIT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5zdGF2X2F6ID0geyBvOiBcIj1cIiwgdjogdGhhdC5tb2RlbF9maWx0ci5zdGF2X2F6IH07XHJcbi8vICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICAgICBwb2hsZWQucmVxdWVzdERhdGEoeyBmaWx0ZXJzOiBmaWx0ZXJEdG8gfSk7XHJcbi8vICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICB7IHRpdGxlOiBcIlptxJtuYSBzdGF2dSBBWlwiIH0pXHJcblxyXG4vLyAgICAgICAgICAgIGRlZkNsb3NlLnJlc29sdmUocG9obGVkLmdldERhdGFSb3dzKCkpO1xyXG5cclxuLy8gICAgICAgICAgICByZXR1cm4gZGVmQ2xvc2UucHJvbWlzZSgpO1xyXG4vLyAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==
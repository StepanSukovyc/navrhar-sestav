"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GSeznamPripravaIP.js                                                        </Name>
//    <Description> GSeznamPripravaIP                                                                                  </Description>
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
            let GSeznamPripravaIP = class GSeznamPripravaIP extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.mohu_editovat = false;
                    this.title = "Příprava IP";
                    this.taskId = "actSeznamPripravaIP"; // označení položky v taskListu
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
                                case 500: return { icon: "fa-check-circle-o g-state-error g-state-text", text: "Zamítnuto", caption: "Zamítnuto", tooltip: "Zamítnuto" };
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
                        name: "nazev_fun_pred",
                        caption: "Předkladatel",
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
                    //var gc = new GContent("Gordic.Ada.WebClient.GAkceISPSeznam"); //dotažení řádku ze serveru
                    //gc.call<Gordic.Gin.Interface.GFileInStringDto>("GetFileZUloziste", { Ixb: ctx.item.data.ixb })
                    //    .done(function (r) {
                    //        if (r) {
                    //            GBrowserExtras.documentSaveOpenLocal(r.Name!, r.Bytes!)
                    //                .done(function (retVal) { })
                    //                .fail(function (err) { Gordic.Gui.WebApp.Utils.showReasonFlash(gc, err); })
                    //                .always(function () {
                    //                    gc.endOperation();
                    //                });
                    //        }
                    //    })
                    //.addTextColumn({               //sloupce pridane pred cfu
                    //    name: "ixb",
                    //    caption: "Příloha",
                    //    customClass: "dt-left",
                    //    hidden: true,
                    //    width: 0
                    //});
                    cnt.mainTable = $("<div class='js-SeznamPripravaIP'>")
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
                        selection: function (ev, selectionInfo) {
                            var sel = cnt.mainTable.ggrid("activeRow");
                            if (sel != null) {
                                that.EnablePreview(true);
                                that.ShowPreview(sel);
                            }
                            else {
                                that.EnablePreview(false);
                            }
                        },
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
                    that.view_ISL = new Gordic.Isl.View(this.isl.AkceISP.list_K_Priprave({ filters: {}, fragments: ["Permissions", "*"] }));
                    cnt.mainTable.ggrid("setData", that.view_ISL);
                    //// Preview přílohy
                    //this.previewDiv = cnt.CreatePreviewPanel();
                    //this.rowToPreview = null;
                    //this.element.gsidebar("addPanel", "right", {
                    //    leaf: { caption: "Náhled přílohy IP" },
                    //    id: "panelPreview",
                    //    icon: "gi-nahled",
                    //    customDiv: this.previewDiv,
                    //    open: function (ev, ctx) {
                    //        if (that.rowToPreview != null) {
                    //            that.LoadPreview(that.rowToPreview);
                    //            that.rowToPreview = null;
                    //        }
                    //    },
                    //});
                    //this.EnablePreview(false);
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
                    vybraneRadky_meta = cnt.find(".js-SeznamPripravaIP").ggrid("activeRow", true); // načtení přes vyhledání gridu (přes class)
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
                                    var v_predkladatel = form.findFields("ixs_fun_pred").gfield("getValue");
                                    cnt.akce_predlozit.visible(true);
                                    cnt.akce_schvalit.visible(true);
                                    cnt.akce_zamitnout.visible(true);
                                    cnt.akce_vratit.visible(true);
                                    if (v_predkladatel) { // je vyplněn predkladatel
                                        if (v_predkladatel.ixs_fun == moje_ixs_fun) { // jsem predkladatel
                                            cnt.akce_predlozit.enabled(cnt.mohu_editovat && (v_akt == 300));
                                            cnt.akce_schvalit.enabled(false);
                                            cnt.akce_zamitnout.enabled(false);
                                            cnt.akce_vratit.enabled(cnt.mohu_editovat && (v_akt == 500));
                                        }
                                        else {
                                            cnt.akce_predlozit.enabled(false);
                                            cnt.akce_schvalit.enabled(false);
                                            cnt.akce_zamitnout.enabled(false);
                                            cnt.akce_vratit.enabled(false);
                                        }
                                    }
                                    else {
                                        cnt.akce_predlozit.enabled(cnt.mohu_editovat && (v_akt == 300));
                                        cnt.akce_schvalit.enabled(false);
                                        cnt.akce_zamitnout.enabled(false);
                                        cnt.akce_vratit.enabled(cnt.mohu_editovat && (v_akt == 500));
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
                                        var v_stav_text = (v_akt == 600 ? "Ke schválení" : (v_akt == 300 ? "Návrh" : (v_akt == 100 ? "Schváleno" : "Zamítnuto")));
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
                                //              .addRow("predkladatel")
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
                                            //    if (v_akt == 300) {
                                            //        v_akt = 600;
                                            //        form.findFields("aktivita").gfield("setValue", { aktivita: 600, aktivita_txt: "ke schválení" });
                                            //    }
                                        }
                                        if (selected && selected.value) { // je vyplněn predkladatel
                                            if (selected.value.ixs_fun == moje_ixs_fun) { // jsem predkladatel
                                                cnt.akce_predlozit.enabled(cnt.mohu_editovat && (v_akt == 300));
                                                cnt.akce_schvalit.enabled(false);
                                                cnt.akce_zamitnout.enabled(false);
                                                cnt.akce_vratit.enabled(cnt.mohu_editovat && (v_akt == 500));
                                                //    cnt.akce_schvalit.enabled(((v_akt == 300) || (v_akt == 600)));
                                                //    cnt.akce_zamitnout.enabled(((v_akt == 300) || (v_akt == 600)));
                                                //    cnt.akce_vratit.enabled(((v_akt == 500) || (v_akt == 100) || (v_akt == 600)));
                                            }
                                            else {
                                                cnt.akce_predlozit.enabled(false);
                                                cnt.akce_schvalit.enabled(false);
                                                cnt.akce_zamitnout.enabled(false);
                                                cnt.akce_vratit.enabled(false);
                                                form.findFields("aktivita_new").gfield("reset");
                                                form.findFields("stav_text_new").gfield("reset");
                                            }
                                        }
                                        else {
                                            cnt.akce_predlozit.enabled(cnt.mohu_editovat && (v_akt == 300));
                                            cnt.akce_schvalit.enabled(false);
                                            cnt.akce_zamitnout.enabled(false);
                                            cnt.akce_vratit.enabled(cnt.mohu_editovat && (v_akt == 500));
                                        }
                                    });
                                }
                            })
                                .addRow({ label: "Schvalovatel", hint: "Schvalovatel" }).addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                                disabled: true,
                                dropdown: false, // políčko jako tři tečky
                                name: "ixs_fun_schv", // název položky
                                model: "model.ixs_fun_schv=value.ixs_fun", // návratová hodnota pouze ixs_fun
                                tooltip: "Schvalovatel", // RC 23352028 : Nový zpracovatel
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
                            cnt.mohu_editovat = ((radekISP.Permissions.LzeEditovat.value) && (cnt.globals.Param_Uloha_Priprava_IP === 2 /* Interface.PristupKUlozeEnum.Ano_Editace */));
                            const commandBar = (cnt.mohu_editovat == true) ? ["ok!", "cancel"] : ["cancel!"];
                            let prom_vysledek = cnt.dialogs.simpleForm("Detail IP", cnt.ISPForm, radekISP, { width: 500, height: 600, commandBar: commandBar });
                            let prom_vysledek_pro = prom_vysledek.createDialogPromise( /*"close"*/ /*"yes"*/ /*"ok"*/ /*, { duvod: string }*/)
                                .then(function (data) {
                                if (data) {
                                    console.log("radekISP", radekISP);
                                    if (!data.aktivita_new) {
                                        data.aktivita_new = data.aktivita;
                                    }
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
                SelectionForPreviewController(opt) {
                    var that = this;
                    if (this.previewController) {
                        var data = opt.ggrid.ggrid('activeRow');
                        if (data != null) {
                            if (data.s_ele) {
                                this.previewController.enable(true);
                                this.previewController.show(data);
                            }
                            else {
                                this.previewController.showInfo({
                                    icon: "gi-visible-non",
                                    title: "Nemá přílohu"
                                    // message: "Nemá elektronický obraz" //RC 31926429 : Pro spis není náhled povolen
                                });
                            }
                        }
                        else {
                            this.previewController.enable(false);
                        }
                    }
                }
                CreatePreviewPanel() {
                    return $("<div>").gfilepreview({ displayFileName: false });
                }
                LoadPreview(row) {
                    if (!this.previewDiv || !this.previewDiv.hasClass("gfilepreview"))
                        return;
                    if (row) { // test na row ... ggrid("getSelection") nekdy vrati null i kdyz je naplnene selectionInfo (pri pomalejsich odezvach)
                        let ixp = row.ixp;
                        let serCislo = undefined;
                        this.previewDiv.gfilepreview("displayFromServer", Gordic.Wfl.FilePreview.displayElDoc(ixp, serCislo, { forceNew: true }));
                    }
                }
                EnablePreview(enabled) {
                    if (this.previewDiv && this.previewDiv.hasClass("gfilepreview"))
                        this.previewDiv.gfilepreview("option", { disabled: !enabled });
                    //   this.previewDiv.gfilepreview('option', 'userSettings', this.userSettings);
                }
                ShowPreview(row) {
                    if (this.element.gsidebar("getPanel", "panelPreview").gsbpanel("option", "visible")) {
                        this.LoadPreview(row);
                    }
                    else {
                        this.rowToPreview = row;
                    }
                }
                aktualizujNahled(row) {
                    this.rowToPreview = row;
                    this.EnablePreview(true);
                    this.LoadPreview(this.rowToPreview);
                    this.rowToPreview = null;
                }
            };
            GSeznamPripravaIP = __decorate([
                gcontent
            ], GSeznamPripravaIP);
            WebClient.GSeznamPripravaIP = GSeznamPripravaIP;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVByaXByYXZhSVAuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbIlNjcmlwdHMvR1Nlem5hbVByaXByYXZhSVAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0FxbUNmO0FBcm1DRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FxbUNuQjtJQXJtQ2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXFtQzdCO1FBcm1Db0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxPQUFBLFlBQVk7Z0JBQW5EOztvQkFpQlksa0JBQWEsR0FBWSxLQUFLLENBQUM7b0JBVXZDLFVBQUssR0FBRyxhQUFhLENBQUM7b0JBQ3RCLFdBQU0sR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLCtCQUErQjtnQkFva0NuRSxDQUFDO2dCQWxrQ0csY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRTlCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFYixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBRWYsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWxJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUMsd0ZBQXdGO29CQUVuSCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksT0FBTyxDQUFD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b3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5BZGEuV2ViQ2xpZW50LkdTZXpuYW1QcmlwcmF2YUlQLmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR1Nlem5hbVByaXByYXZhSVAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQWRhLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1QcmlwcmF2YUlQIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdJU1BBa2NlRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkFkYS5JbnRlcmZhY2UuR0lTUEFrY2VEdG8+O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HSVNQQWtjZUR0bztcclxuICAgICAgICBwcml2YXRlIGdyaWRGb3JtYXRTZXpuYW06IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkFkYS5JbnRlcmZhY2UuR0lTUEFrY2VEdG8+O1xyXG5cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGdsb2JhbHM6IEdvcmRpYy5BZGEuV2ViQ2xpZW50LkRUTy5HQWRhR2xvYmFsc0R0bztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBJU1BGb3JtOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuICAgICAgICBwcml2YXRlIGFrdF9yYWRlazogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgdmFsaWRhdG9yczogT2JqZWN0TGl0ZXJhbDxHb3JkaWMuVmFsaWRhdG9ycy5WYWxpZGF0b3JPcHRpb25zPjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXJGb3JtOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBtYWluVGFibGU6IEpRdWVyeTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2h1X2VkaXRvdmF0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgcHJpdmF0ZSBha2NlX3ByZWRsb3ppdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIGFrY2Vfc2NodmFsaXQ6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBha2NlX3phbWl0bm91dDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIGFrY2VfdnJhdGl0OiBHQWN0aW9uO1xyXG5cclxuICAgICAgICBwcmV2aWV3Q29udHJvbGxlcjogR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcjtcclxuICAgICAgICBwcmV2aWV3RGl2OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHJvd1RvUHJldmlldzogYW55O1xyXG5cclxuICAgICAgICB0aXRsZSA9IFwiUMWZw61wcmF2YSBJUFwiO1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0U2V6bmFtUHJpcHJhdmFJUFwiOyAvLyBvem5hxI1lbsOtIHBvbG/Fvmt5IHYgdGFza0xpc3R1XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vaHVfZWRpdG92YXQgPSB0cnVlOyAvLyAgKHRoYXQuZ2xvYmFscy5QYXJhbV9FZGl0YWNlX0lTUCA9PSBHb3JkaWMuQWRhLkludGVyZmFjZS5QcmlzdHVwS0VkaXRhY2lJU1BFbnVtLkFubyk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFrY2VfcHJlZGxveml0ID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwcmVkbG96aXRBY3RcIixcclxuICAgICAgICAgICAgICAgIC8vIGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIiwgLy8gXCJnaS1zY2h2eXJcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZZWRsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQubW9odV9lZGl0b3ZhdCxcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiUMWZZWRsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQoZXYudGFyZ2V0KS5nZm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2X2FrdCA9IGZvcm0uZmluZEZpZWxkcyhcImFrdGl2aXRhXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YV9uZXdcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBha3Rpdml0YTogNjAwLCBha3Rpdml0YV90eHQ6IFwia2Ugc2NodsOhbGVuw61cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZWQoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAodl9ha3QuYWt0aXZpdGEgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImFrdGl2aXRhXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYWt0aXZpdGE6IDMwMCwgYWt0aXZpdGFfdHh0OiBcIm7DoXZyaFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiYWt0aXZpdGFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBha3Rpdml0YTogMTAwLCBha3Rpdml0YV90eHQ6IFwiYWt0aXZuw61cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5ha2NlX3NjaHZhbGl0ID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzY2h2YWxpdEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiLCAvLyBcImdpLXNjaHZ5clwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTY2h2w6FsaXRcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQubW9odV9lZGl0b3ZhdCxcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiU2NodsOhbGl0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkKGV2LnRhcmdldCkuZ2Zvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdl9ha3QgPSBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiYWt0aXZpdGFfbmV3XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYWt0aXZpdGE6IDEwMCwgYWt0aXZpdGFfdHh0OiBcImFrdGl2bsOtXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmFibGVkKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKHZfYWt0LmFrdGl2aXRhID09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGFrdGl2aXRhOiAzMDAsIGFrdGl2aXRhX3R4dDogXCJuw6F2cmhcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImFrdGl2aXRhXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYWt0aXZpdGE6IDEwMCwgYWt0aXZpdGFfdHh0OiBcImFrdGl2bsOtXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWtjZV96YW1pdG5vdXQgPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInphbWl0bm91dEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gaWNvbjogXCJmYS10aW1lcy1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIiwgLy8gXCJnaS1zY2h2eXJcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmFtw610bm91dFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5tb2h1X2VkaXRvdmF0LFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJaYW3DrXRub3V0XCIsIC8vY250Lm1vZGVsaXNwLmFrdGl2aXRhID8gXCJTY2h2w6FsaXRcIiA6IFwiT2RzY2h2w6FsaXRcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQoZXYudGFyZ2V0KS5nZm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2X2FrdCA9IGZvcm0uZmluZEZpZWxkcyhcImFrdGl2aXRhXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YV9uZXdcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBha3Rpdml0YTogNTAwLCBha3Rpdml0YV90eHQ6IFwibmVha3Rpdm7DrVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlZChmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh2X2FrdC5ha3Rpdml0YSA9PSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiYWt0aXZpdGFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBha3Rpdml0YTogMzAwLCBha3Rpdml0YV90eHQ6IFwibsOhdnJoXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGFrdGl2aXRhOiAxMDAsIGFrdGl2aXRhX3R4dDogXCJha3Rpdm7DrVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFrY2VfdnJhdGl0ID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ2cmF0aXRBY3RcIixcclxuICAgICAgICAgICAgICAgIC8vIGljb246IFwiZmEtdGltZXMtY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLWVycm9yXCIsIC8vIFwiZ2ktc2NodnlyXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZyw6F0aXRcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQubW9odV9lZGl0b3ZhdCxcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiVnLDoXRpdCBrIHDFmWVwcmFjb3bDoW7DrVwiLCAvL2NudC5tb2RlbGlzcC5ha3Rpdml0YSA/IFwiU2NodsOhbGl0XCIgOiBcIk9kc2NodsOhbGl0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkKGV2LnRhcmdldCkuZ2Zvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdl9ha3QgPSBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiYWt0aXZpdGFfbmV3XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYWt0aXZpdGE6IDMwMCwgYWt0aXZpdGFfdHh0OiBcIm7DoXZyaFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlZChmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh2X2FrdC5ha3Rpdml0YSA9PSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiYWt0aXZpdGFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBha3Rpdml0YTogMzAwLCBha3Rpdml0YV90eHQ6IFwibsOhdnJoXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGFrdGl2aXRhOiAxMDAsIGFrdGl2aXRhX3R4dDogXCJha3Rpdm7DrVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdEdyaWREb3VibGVDbGljazoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhhdC5kZXRhaWxfcmFka3UodGhhdC5nbG9iYWxzLlBhcmFtX0FrY2VfRWRpdGFjZV9UUCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kZXRhaWxfcmFka3UoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdEdyaWREb3VibGVDbGljaypcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdmFyIGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJLb21wbGV0bsOtIGZpbHRyXCIsIGxheW91dERlc2NyaXB0b3I6IFwidy1MLTkgdy1NLTkgdy1TLTEyXCIgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZmlsdGVyRm9ybURlZlxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9sZVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwucm9sZT12YWx1ZS5pZFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyBpZDogMCB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntuYXpldn1cIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChvYmouZmxhZ3MuaXNLb250cm9sbmlEaXYgfHwgb2JqLmZsYWdzLm5vQ2hhbmdlKSByZXR1cm47XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5mbGFncy5ub0NoYW5nZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLy8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai52YWx1ZSAhPSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHZhciBha3Rfcm9sZV9pID0gMFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbml0X3ZhbHVlX2kgPSAwO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGFrdF9yb2xlX2kgPSBvYmoudmFsdWU/LmlkID8/IDA7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvbGVfc2VydmVyRmlsdHJfaSA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWt0X3JvbGVfaSA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvbGVfc2VydmVyRmlsdHJfaSA9IFswLCAyLCAzLCAxXTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdF92YWx1ZV9pID0gMDtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGlmIChha3Rfcm9sZV9pID09IDEpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0cl9pID0gWzIsIDMsIDFdO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0X3ZhbHVlX2kgPSAyO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFrdF9yb2xlX2kgPT0gMikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2xlX3NlcnZlckZpbHRyX2kgPSBbMCwyXTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdF92YWx1ZV9pID0gMjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwic3Rhdl9hel9mXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcInNlcnZlckZpbHRlcnNcIiwgeyBzdGF2X2F6OiBwb2xlX3NlcnZlckZpbHRyX2kgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJzdGF2X2F6X2ZcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBzdGF2X2F6OiBpbml0X3ZhbHVlX2kgfSwge3ZhbGlkIDogZmFsc2V9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8gYXV0b21hdGlja8OpIG5hxI10ZW7DrSBwbyB6bcSbbsSbIGhvZG5vdHlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBkdG8gPSB7fTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZmlsdGVyRm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5maWx0ZXJGb3JtIS5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiLCBkdG8pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGRhdGE6XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcIlpwcmFjb3ZhdGVsXCIsIGlkOiAwIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwiS29tcGV0ZW50XCIsIGlkOiAxIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwiRmluYW7EjW7DrSBrb21wZXRlbnQgQVpcIiwgaWQ6IDIgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIF0sIHsga2V5OiBcImlkXCIgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGZpbHRlckZvcm1EZWZcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3J2Y3NheigpLCB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfYXpfZlwiLCBtb2RlbDogXCJtb2RlbC5zdGF2X2F6PXZhbHVlLnN0YXZfYXpcIiwgbXVsdGk6IGZhbHNlLCBsaXN0OiB0cnVlLCBpdGVtV2lkdGg6IFwiXCIsIGRpc2FibGVkOiBmYWxzZSwgaW5pdGlhbFZhbHVlOiB7IHN0YXZfYXo6IDAgfSwgXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXV0b21hdGlja8OpIG5hxI10ZW7DrSBwbyB6bcSbbsSbIGhvZG5vdHlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmZsYWdzLmlzS29udHJvbG5pRGl2IHx8IG9iai5mbGFncy5ub0NoYW5nZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkdG8gPSB7fTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlckZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlckZvcm0hLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIsIGR0byk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9maWx0ZXJGb3JtRGVmXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgLmFkZFJvdyhcIlN0YXYgQVpcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zcnZjc2F6KCksIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJzdGF2X2F6XCIsIG1vZGVsOiBcIm1vZGVsLnN0YXZfYXo9dmFsdWUuc3Rhdl9helwiLCBtdWx0aTogdHJ1ZSwgbGlzdDogdHJ1ZSwgaXRlbVdpZHRoOiBcIlwiXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmZpbHRlckZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBwcm8gRUtPXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZVVzZXJTZXR0aW5nczogW0ZpbHRlclZpZXdNb2RlLlNpbXBsZV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy9wb090ZXZyZW5pT3RldnJpdFBhbmVsUG9kbWluZWs6IGZhbHNlLCAgICAgLy8gZGVmYXVsdCBwcm8gdcW+aXZhdGVsc2vDqSBuYXN0YXZlbsOtXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBwb1Z5aGxlZGFuaVpvYnJheml0OiBcIlZ5aGxlZGFuZVBvZG1pbmt5VkJhZGdlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBhdXRvTG9hZEFmdGVyQ2hvc2VGaWx0ZXI6IGZhbHNlLCAgICAgICAgLy8gQXV0b21hdGlja8OpIHZ5aGxlZMOhbsOtIHBvIHptxJtuxJsgdWxvxb5lbsOpaG9cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGNsZWFyRmlsdGVyQnV0dG9uVmlzaWJsZTogXCJOZXZlclZpc2libGVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGRldGFpbEFjdGlvbkFzQ2hlY2tib3g6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vaWRTaW1wbGVNb2RlOlwiaWRTaW1wbGVNb2RlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBmb3JtczogW2ZpbHRlckZvcm1EZWZdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogYnVkZSBuxJtqYWvDqSBsZXDFocOtIHVrbMOhZGFjw60gb2tubyBuZWJvIGJ1ZHUgbXVzZXQgdWTEm2xhdCBzdm9qZSBhIG5hc3Rhdml0IGhvIGRvIHNhdmVPcHRpb25zRm9ybT9cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlczogW1wicm9sZVwiLCBcInN0YXZfYXpcIl0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IFwiTDRNM1MxXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB6xa9zdGFuZSB0b2hsZSB0w6ltYSBuZWJvIGJ1ZGUgcHJvIExLIGppbsOpIG5lxb4gcHJvIFRLP1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJhZGFfcHRtX2FkYWJhczJcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGZpbHRlclN0b3JhZ2VTZXJ2aWNlOiBuZXcgR29yZGljLkdpbi5GaWx0ZXJTdG9yYWdlU2VydmljZS5TdG9yZSgpLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgc2F2ZU9wdGlvbnNGb3JtOiBcImVrb1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gc3RyaWN0U3RvcEF1dG9Mb2FkOiB0cnVlLCAgICAgICAgICAgICAgIC8vIFN0cmlrdG7EmyB6YWvDocW+ZSBhdXRvbWF0aWNrw6kgbmHEjXRlbsOtIGhuZWQgcG8gb3RldsWZZW7DrSBzZXpuYW11LCBvYmzDrWJlbsO9IGZpbHRyIHNlIHBvdXplIHDFmWVkcGxuw60uXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyB0ZXh0SXRlbVRlbXBsYXRlOiBcIntkZXNjcmlwdGlvbn1cIixcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKGV2ZW50LCBvYmopIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0IHBvZGxlIGZpbHRyxa9cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsX2ZpbHRyID0gb2JqLmZpbHRlcjtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxfZmlsdHIgJiYgdGhhdC5tb2RlbF9maWx0ci5yb2xlICE9IG51bGwgKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlckR0bzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1Nlem5hbUFkYUZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uYWt0aXZpdGEgPSB7IG86IFwiSU5cIiwgdjogWzEwMCwgMzAwXSB9O1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxfZmlsdHIucm9sZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2Z1bl9ha3QgPSB7IG86IFwiPVwiLCB2OiAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCB9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLml4c19mdW5fYXogPSBudWxsO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLmtvbXAgPSBudWxsO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxfZmlsdHIucm9sZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2Z1bl9ha3QgPSBudWxsO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLml4c19mdW5fYXogPSBudWxsO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLmtvbXAgPSB7IG86IFwiPVwiLCB2OiAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCB9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxfZmlsdHIucm9sZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2Z1bl9ha3QgPSBudWxsO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLml4c19mdW5fYXogPSB7IG86IFwiPVwiLCB2OiAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCB9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLmtvbXAgPSBudWxsO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxfZmlsdHIgJiYgdGhhdC5tb2RlbF9maWx0ci5zdGF2X2F6ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5zdGF2X2F6ID0geyBvOiBcIj1cIiwgdjogdGhhdC5tb2RlbF9maWx0ci5zdGF2X2F6IH07XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyb2xlXCIsIHRoYXQubW9kZWxfZmlsdHIucm9sZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlsdGVyRHRvXCIsIGZpbHRlckR0byk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogZmlsdGVyRHRvIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbSA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdJU1BBa2NlRHRvPigpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFZsYXN0bmljdHZpKGNudC5ncmlkRm9ybWF0U2V6bmFtKTtcclxuXHJcbiAgICAgICAgICAgIGNudC5ncmlkRm9ybWF0U2V6bmFtLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgZmllbGQ6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgLy9oaWRkZW46IHRoaXMuZ2xvYmFscy5QYXJhbV9Ba2NlX0F1dFNjaHYgPT0gSW50ZXJmYWNlLlR5cEF1dG9tYXRTY2h2YWxlbmlOb3ZhQWtjZUVudW0uTmVTcHJvY2VzZW0sXHJcbiAgICAgICAgICAgICAgICAvLyB3aWR0aDogMjUsXHJcbiAgICAgICAgICAgICAgICBmb3JtYXRQcmVzZXQ6IEdvcmRpYy5HbG9iYWwuRW51bXMuR3JpZENvbHVtbkZvcm1hdEljb24uaWNvbixcclxuICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuYWt0aXZpdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1MDA6IHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlLW8gZy1zdGF0ZS1lcnJvciBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJaYW3DrXRudXRvXCIsIGNhcHRpb246IFwiWmFtw610bnV0b1wiLCB0b29sdGlwOiBcIlphbcOtdG51dG9cIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDYwMDogcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUtbyBnLXN0YXRlLWluZm8gZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiS2Ugc2NodsOhbGVuw61cIiwgY2FwdGlvbjogXCJLZSBzY2h2w6FsZW7DrVwiLCB0b29sdGlwOiBcIktlIHNjaHbDoWxlbsOtXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzMDA6IHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtd2FybmluZyBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJOw6F2cmhcIiwgY2FwdGlvbjogXCJOw6F2cmhcIiwgdG9vbHRpcDogXCJOw6F2cmhcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLy9jbnQuZ3JpZEZvcm1hdFNlem5hbVxyXG4gICAgICAgICAgICAgICAgLy8gICAgLmFkZE51bWJlckNvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGNhcHRpb246IFwiUm9rXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHdpZHRoOiA4MFxyXG4gICAgICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwiaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgY2FwdGlvbjogXCJJxIxPXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHdpZHRoOiAxNDBcclxuICAgICAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpc2xvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogY250Lmdsb2JhbHMuQkFSX1R5cF9JbnN0ID09IEludGVyZmFjZS5TcnZUeXBJbnRhbGFjZUVudW0uTU8gPyBcIsSMw61zbG8gcG9sLiBwbMOhbnVcIiA6IFwixIzDrXNsbyBha2NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGROdW1iZXJDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcInJhZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIiNcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHdpZHRoOiA2MFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzcnZzdGlwX25hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOw6F6ZXYgSVBcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X2Z1bl9wcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZllZGtsYWRhdGVsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldl9mdW5fYWt0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJacHJhY292YXRlbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Bvel9zY2h2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUZXJtw61uIHBybyBzY2h2w6FsZW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8vLyBha2NlIG5hIGtsaWsgbmEgaWtvbmt1XHJcbiAgICAgICAgICAgIC8vY29uc3QgbGlua0FjdCA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJrbGlrcHJpbG9oYVwiLFxyXG4gICAgICAgICAgICAvLyAgICBydW46IChldiwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdmFyIGxfY2lzbG86IFN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB2YXIgdnlicmFuZVJhZGt5OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HSVNQQWtjZUR0bztcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAoKGRhdGEuZGF0YXJvdy5peGIpICYmIChkYXRhLmRhdGFyb3cuaXhiICE9PSBcIlwiKSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIGV4aXN0dWplIHZ5YnJhbsO9IHrDoXpuYW1cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdmFyIGdjID0gbmV3IEdDb250ZW50KFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VJU1BTZXpuYW1cIik7IC8vZG90YcW+ZW7DrSDFmcOhZGt1IHplIHNlcnZlcnVcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBnYy5jYWxsPEdvcmRpYy5HaW4uSW50ZXJmYWNlLkdGaWxlSW5TdHJpbmdEdG8+KFwiR2V0RmlsZVpVbG96aXN0ZVwiLCB7IEl4YjogZGF0YS5kYXRhcm93Lml4YiB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKHIpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBHQnJvd3NlckV4dHJhcy5kb2N1bWVudFNhdmVPcGVuTG9jYWwoci5OYW1lISwgci5CeXRlcyEpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXRWYWwpIHsgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikgeyBHb3JkaWMuR3VpLldlYkFwcC5VdGlscy5zaG93UmVhc29uRmxhc2goZ2MsIGVycik7IH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2MuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgLy9jbnQuZ3JpZEZvcm1hdFNlem5hbS5hZGRMaW5rc0NvbHVtbih7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwib2JyYXpcIixcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJQIFwiLFxyXG4gICAgICAgICAgICAvLyAgICBjdXN0b21DbGFzczogXCJkdC1jZW50ZXJcIixcclxuICAgICAgICAgICAgLy8gICAgd2lkdGg6IDQwLFxyXG4gICAgICAgICAgICAvLyAgICBsaW5rczogKGQpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICB2YXIgaWtvbmEgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIHN3aXRjaCAoZCEuaXhiKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY2FzZSBcIlwiOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGlrb25hID0gXCJcIjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjYXNlIG51bGw6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaWtvbmEgPSBcIlwiO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaWtvbmEgPSBcImdpLWF0dGFjaG1lbnRcIjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gW3tcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBhY3Rpb246IGxpbmtBY3QsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWNvbjogaWtvbmFcclxuICAgICAgICAgICAgLy8gICAgICAgIH1dO1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7IFxyXG5cclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW1cclxuICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4YlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcIml4YlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUCBcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwVGVtcGxhdGU6IFwiUMWZw61sb2hhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiY2VudGVyIGN1cnNvcl9oZWxwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdFByZXNldDogR29yZGljLkdsb2JhbC5FbnVtcy5HcmlkQ29sdW1uRm9ybWF0SWNvbi5pY29uLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhIS5peGIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJcIjogcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBudWxsOiByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4geyBpY29uOiBcImdpLWF0dGFjaG1lbnRcIiwgdGV4dDogZGF0YS5zb3Vib3IhLCBjYXB0aW9uOiBkYXRhLnNvdWJvciEsIHRvb2x0aXA6IGRhdGEuc291Ym9yISB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGNudC5ncmlkRm9ybWF0U2V6bmFtXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNvdWJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU291Ym9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGdjID0gbmV3IEdDb250ZW50KFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VJU1BTZXpuYW1cIik7IC8vZG90YcW+ZW7DrSDFmcOhZGt1IHplIHNlcnZlcnVcclxuICAgICAgICAgICAgLy9nYy5jYWxsPEdvcmRpYy5HaW4uSW50ZXJmYWNlLkdGaWxlSW5TdHJpbmdEdG8+KFwiR2V0RmlsZVpVbG96aXN0ZVwiLCB7IEl4YjogY3R4Lml0ZW0uZGF0YS5peGIgfSlcclxuICAgICAgICAgICAgLy8gICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGlmIChyKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgR0Jyb3dzZXJFeHRyYXMuZG9jdW1lbnRTYXZlT3BlbkxvY2FsKHIuTmFtZSEsIHIuQnl0ZXMhKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0VmFsKSB7IH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChlcnIpIHsgR29yZGljLkd1aS5XZWJBcHAuVXRpbHMuc2hvd1JlYXNvbkZsYXNoKGdjLCBlcnIpOyB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGdjLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLy8uYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiaXhiXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIlDFmcOtbG9oYVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgd2lkdGg6IDBcclxuICAgICAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQubWFpblRhYmxlID0gJChcIjxkaXYgY2xhc3M9J2pzLVNlem5hbVByaXByYXZhSVAnPlwiKVxyXG4gICAgICAgICAgICAgICAgLy8uY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKG1haW5Gb3JtKVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cgPSBjbnQubWFpblRhYmxlLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5yb3cgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC50cmlnZ2VyKFwiYWRhc3ViZ3JpZHJvd3NlbGVjdGVkXCIsIHsgYWdlbmRhOiA0MCwgZGF0YTogdGhhdC5yb3cgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBjbnQuYWN0aW9ucy5hY3RHcmlkRG91YmxlQ2xpY2ssXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBzZWxlY3Rpb25JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWwgPSBjbnQubWFpblRhYmxlLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuRW5hYmxlUHJldmlldyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuU2hvd1ByZXZpZXcoc2VsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuRW5hYmxlUHJldmlldyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJ1bihldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQucm93ID0gY3R4LmNlbGxJbmZvLmRhdGE7ICAgIC8vZGF0YSwgemUga3RlcnljaCBieWwgdnl0dm9yZW4gcmFkZWtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL30pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBHb3JkaWMuQWRhLldlYkNsaWVudC5BZGFGdW5jdGlvbi56amlzdGlfc2xvdXBjZV9zZWFyY2goY250LmdyaWRGb3JtYXRTZXpuYW0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGNudC5ncmlkRm9ybWF0U2V6bmFtLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBjbnQuemppc3RpX3Nsb3VwY2UoY250LmdyaWRGb3JtYXRTZXpuYW0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3sgbmFtZTogXCJaamVkbm9kdcWhZW7DvVwiLCBjb2x1bW5MaXN0OiBcInpwcmFjb3ZhdGVsLCBha3Rpdml0YSwgY2lzbG8sIG5hemV2LCBjXzJfM183XzhfMjNfMjUsIGNfNl8xOCwgY18wLCBjX3pieXZhX2NlcnBhdCwgY2VycGFub19wcm9jXCIsIF9sb2NrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiBcIsOacGxuw71cIiwgY29sdW1uTGlzdDogdGhpcy56amlzdGlfc2xvdXBjZShjbnQuZ3JpZEZvcm1hdFNlem5hbSksIF9sb2NrZWQ6IHRydWUgfSAvL2dyaWRGb3JtYXRTZXpuYW0uY29sdW1ucy5maWx0ZXIoKGMpID0+IGMubmFtZSAhPSBcImtuaWhhXCIpLmpvaW4oKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3ZhciBmaWx0ZXJEdG86IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTZXpuYW1BZGFGaWx0ZXJEdG8gPSB7fTtcclxuICAgICAgICAgICAgLy9maWx0ZXJEdG8uc3Rhdl9heiA9IHsgbzogXCI9XCIsIHY6IHRoYXQubW9kZWxfZmlsdHIuc3Rhdl9heiB9O1xyXG4gICAgICAgICAgICAvL2ZpbHRlckR0by5peHNfZnVuX2FrdCA9IHsgbzogXCI9XCIsIHY6ICgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkuSXhzRnVuQWt0IH07XHJcbiAgICAgICAgICAgIC8vZmlsdGVyRHRvLmFrdGl2aXRhID0geyBvOiBcIklOXCIsIHY6IFsxMDAsIDMwMF0gfTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoaXMuaXNsLkFrY2VJU1AubGlzdF9LX1ByaXByYXZlKHsgZmlsdGVyczoge30sIGZyYWdtZW50czogW1wiUGVybWlzc2lvbnNcIiwgXCIqXCJdIH0pKTtcclxuXHJcbiAgICAgICAgICAgIGNudC5tYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld19JU0wpO1xyXG5cclxuICAgICAgICAgICAgLy8vLyBQcmV2aWV3IHDFmcOtbG9oeVxyXG4gICAgICAgICAgICAvL3RoaXMucHJldmlld0RpdiA9IGNudC5DcmVhdGVQcmV2aWV3UGFuZWwoKTtcclxuICAgICAgICAgICAgLy90aGlzLnJvd1RvUHJldmlldyA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuZWxlbWVudC5nc2lkZWJhcihcImFkZFBhbmVsXCIsIFwicmlnaHRcIiwge1xyXG4gICAgICAgICAgICAvLyAgICBsZWFmOiB7IGNhcHRpb246IFwiTsOhaGxlZCBwxZnDrWxvaHkgSVBcIiB9LFxyXG4gICAgICAgICAgICAvLyAgICBpZDogXCJwYW5lbFByZXZpZXdcIixcclxuICAgICAgICAgICAgLy8gICAgaWNvbjogXCJnaS1uYWhsZWRcIixcclxuICAgICAgICAgICAgLy8gICAgY3VzdG9tRGl2OiB0aGlzLnByZXZpZXdEaXYsXHJcbiAgICAgICAgICAgIC8vICAgIG9wZW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAodGhhdC5yb3dUb1ByZXZpZXcgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuTG9hZFByZXZpZXcodGhhdC5yb3dUb1ByZXZpZXcpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQucm93VG9QcmV2aWV3ID0gbnVsbDtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfSxcclxuICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgLy90aGlzLkVuYWJsZVByZXZpZXcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgemppc3RpX3Nsb3VwY2UoZ2YpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdmLmNvbHVtbnMuZmlsdGVyKGUgPT4gZS5oaWRkZW4gIT0gdHJ1ZSkubWFwKGUgPT4gZS5uYW1lKS5qb2luKCcsJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZXRhaWxfcmFka3UoZWRpdGFibGUsIG5vdmFha2NlKSB7XHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbF9jaXNsbzogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIGxfcmFkZWs6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIHZhciBsX2l4c19wbGE6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBsX2l4c19wcnI6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgdnlicmFuZVJhZGt5OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HSVNQQWtjZUR0bztcclxuICAgICAgICAgICAgdmFyIG1hbV9kZXRhaWw6IGJvb2xlYW47XHJcblxyXG4gICAgICAgICAgICB2YXIgdnlicmFuZVJhZGt5X21ldGE7XHJcblxyXG4gICAgICAgICAgICB2eWJyYW5lUmFka3lfbWV0YSA9IGNudC5maW5kKFwiLmpzLVNlem5hbVByaXByYXZhSVBcIikuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgdHJ1ZSk7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIHDFmWVzIHZ5aGxlZMOhbsOtIGdyaWR1IChwxZllcyBjbGFzcylcclxuICAgICAgICAgICAgdnlicmFuZVJhZGt5ID0gdnlicmFuZVJhZGt5X21ldGEuZGF0YTtcclxuICAgICAgICAgICAgbWFtX2RldGFpbCA9ICh2eWJyYW5lUmFka3lfbWV0YSAmJiAhdnlicmFuZVJhZGt5X21ldGEuX2lzVmlydHVhbCAmJiB2eWJyYW5lUmFka3kgJiYgKHZ5YnJhbmVSYWRreS5jaXNsbyAhPT0gdW5kZWZpbmVkKSAmJiAodnlicmFuZVJhZGt5LmNpc2xvICE9PSBcIlwiKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobWFtX2RldGFpbCkge1xyXG4gICAgICAgICAgICAgICAgbF9jaXNsbyA9IHZ5YnJhbmVSYWRreS5jaXNsbyE7XHJcbiAgICAgICAgICAgICAgICBsX3JhZGVrID0gdnlicmFuZVJhZGt5LnJhZGVrITtcclxuICAgICAgICAgICAgICAgIGxfaXhzX3BsYSA9IHZ5YnJhbmVSYWRreS5peHNfcGxhITtcclxuICAgICAgICAgICAgICAgIGxfaXhzX3ByciA9IHZ5YnJhbmVSYWRreS5peHNfcHJyITtcclxuICAgICAgICAgICAgICAgIC8vIGVkaXRhYmxlID0gZWRpdGFibGUgJiYgdnlicmFuZVJhZGt5LmFrdGl2aXRhID09IEludGVyZmFjZS5Ba3Rpdml0YUFrY2VFbnVtLkFrdGl2bmk7XHJcbiAgICAgICAgICAgICAgICBlZGl0YWJsZSA9IGVkaXRhYmxlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBncmlkUkMgPSBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKGNudC5tYWluVGFibGUpOyAvL3BvaHliIHBvIGdyaWR1XHJcblxyXG4gICAgICAgICAgICAgICAgY250LmZpbHRlciA9IHt9O1xyXG4gICAgICAgICAgICAgICAgY250LmZpbHRlci5jaXNsbyA9IGxfY2lzbG87XHJcbiAgICAgICAgICAgICAgICBjbnQuZmlsdGVyLnJhZGVrID0gbF9yYWRlaztcclxuICAgICAgICAgICAgICAgIGNudC5maWx0ZXIuaXhzX3BsYSA9IGxfaXhzX3BsYTtcclxuICAgICAgICAgICAgICAgIGNudC5maWx0ZXIuaXhzX3ByciA9IGxfaXhzX3BycjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmFkZWtJU1A6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdJU1BBa2NlRHRvOyAvLyA9IHsgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzbC5Ba2NlSVNQLnJlYWQoeyBkYXRhOiBjbnQuZmlsdGVyLCBmcmFnbWVudHM6IFtcIlBlcm1pc3Npb25zXCIsIFwiKlwiXSB9KS5nZXREYXRhKCkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhZGVrSVNQID0gZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY250LklTUEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiSVNQRm9ybXVsYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIE0tMy05LTAgTC0zLTktMCBicmVha3MtNDAwLTUwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9nT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIklTUEZvcm11bGFyI1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGFzIGFueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgY29tcGxldGU6IGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coXCJ4eHhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZHVtbXlmaWVsZFwiLCBcInctaFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJyYWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrdF9yYWRlayA9IHNlbGVjdGVkLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJCh0aGlzKS5jbG9zZXN0KFwiLmdmb3JtXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkdW1teWZpZWxkXCIsIFwidy1oXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNydnN0aXBfbmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3J2c3RpcF9uYXpldlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LWhcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX3BsYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfcGxhXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctaFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfcHJyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19wcnJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8uYWRkUm93KFwiQWt0aXZpdGFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy1oXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7YWt0aXZpdGFfdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmljdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZToge30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IGFrdGl2aXRhOiBbMTAwLCAzMDAsIDUwMCwgNjAwXSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuYWt0aXZpdGE9dmFsdWUuYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcImFrdGl2aXRhX3R4dFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZShldiwgc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQodGhpcykuY2xvc2VzdChcIi5nZm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdl9yYWRlazogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2X3JhZGVrID0gZm9ybS5maW5kRmllbGRzKFwicmFkZWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZfYWt0ID0gZm9ybS5maW5kRmllbGRzKFwiYWt0aXZpdGFcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikuYWt0aXZpdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2X3N0YXZfdGV4dCA9ICh2X2FrdCA9PSA2MDAgPyBcIktlIHNjaHbDoWxlbsOtXCIgOiAodl9ha3QgPT0gMzAwID8gXCJOw6F2cmhcIiA6ICh2X2FrdCA9PSAxMDAgPyBcIlNjaHbDoWxlbm9cIiA6IFwiWmFtw610bnV0b1wiKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInN0YXZfdGV4dFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB2X3N0YXZfdGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2plX2l4c19mdW4gPSAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdl9wcmVka2xhZGF0ZWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfZnVuX3ByZWRcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3ByZWRsb3ppdC52aXNpYmxlKHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2Vfc2NodmFsaXQudmlzaWJsZSh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3phbWl0bm91dC52aXNpYmxlKHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2VfdnJhdGl0LnZpc2libGUodHJ1ZSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZfcHJlZGtsYWRhdGVsKSB7IC8vIGplIHZ5cGxuxJtuIHByZWRrbGFkYXRlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodl9wcmVka2xhZGF0ZWwuaXhzX2Z1biA9PSBtb2plX2l4c19mdW4pIHsgLy8ganNlbSBwcmVka2xhZGF0ZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3ByZWRsb3ppdC5lbmFibGVkKGNudC5tb2h1X2VkaXRvdmF0ICYmICh2X2FrdCA9PSAzMDApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3NjaHZhbGl0LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2VfemFtaXRub3V0LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2VfdnJhdGl0LmVuYWJsZWQoY250Lm1vaHVfZWRpdG92YXQgJiYgKHZfYWt0ID09IDUwMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2VfcHJlZGxveml0LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2Vfc2NodmFsaXQuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV96YW1pdG5vdXQuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV92cmF0aXQuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3ByZWRsb3ppdC5lbmFibGVkKGNudC5tb2h1X2VkaXRvdmF0ICYmICh2X2FrdCA9PSAzMDApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2Vfc2NodmFsaXQuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3phbWl0bm91dC5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2VfdnJhdGl0LmVuYWJsZWQoY250Lm1vaHVfZWRpdG92YXQgJiYgKHZfYWt0ID09IDUwMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2J1dHRvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHsgcmVxdWlyZUVkaXQ6IGZhbHNlLCBhY3Rpb246IHRoYXQuYWtjZV96YW1pdG5vdXQgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHsgcmVxdWlyZUVkaXQ6IGZhbHNlLCBhY3Rpb246IHRoYXQuYWtjZV9zY2h2YWxpdCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmNha3RBREEoKSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LWhcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pdGVtVGVtcGxhdGU6IFwie2FrdGl2aXRhX3R4dH1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0aXZpdGFfbmV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgYWt0aXZpdGE6IFsxMDAsIDMwMCwgNTAwLCA2MDBdIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5ha3Rpdml0YV9uZXc9dmFsdWUuYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcImFrdGl2aXRhX3R4dFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZShldiwgc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHNlbGVjdGVkKSAmJiAoc2VsZWN0ZWQudmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJCh0aGlzKS5jbG9zZXN0KFwiLmdmb3JtXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZfcmFkZWs6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZfcmFkZWsgPSBmb3JtLmZpbmRGaWVsZHMoXCJyYWRla1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZfYWt0ID0gZm9ybS5maW5kRmllbGRzKFwiYWt0aXZpdGFfbmV3XCIpLmdmaWVsZChcImdldFZhbHVlXCIpLmFrdGl2aXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZfc3Rhdl90ZXh0ID0gKHZfYWt0ID09IDYwMCA/IFwiS2Ugc2NodsOhbGVuw61cIiA6ICh2X2FrdCA9PSAzMDAgPyBcIk7DoXZyaFwiIDogKHZfYWt0ID09IDEwMCA/IFwiU2NodsOhbGVub1wiIDogXCJaYW3DrXRudXRvXCIpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInN0YXZfdGV4dF9uZXdcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdl9zdGF2X3RleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY2FrdEFEQSgpKVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAuYWRkUm93KFwiUMWZZWRrbGFkYXRlbFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LWhcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX3Nyb19wcmVka2xhZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfc3JvX3ByZWRrbGFkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQodGhpcykuY2xvc2VzdChcIi5nZm9ybVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4c19zcm9fcHJlZGtsYWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZfU2VTY2h2YWxvdmFjaVJvbGk6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19zcm9fcHJlZGtsYWQgPSBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfc3JvX3ByZWRrbGFkXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpeHNfc3JvX3ByZWRrbGFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZfU2VTY2h2YWxvdmFjaVJvbGkucHVzaChpeHNfc3JvX3ByZWRrbGFkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBteV9zZXJ2ZXJGaWx0ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlU2NodmFsb3ZhY2lSb2xpOiB2X1NlU2NodmFsb3ZhY2lSb2xpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVbmlvblNjaHZhbG92YWNpUm9sZUJlelNhYmxvbnk6IHZfU2VTY2h2YWxvdmFjaVJvbGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TRGF0dW1PZFNjaHZhbG92YWNpUm9sZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TRGF0dW1Eb1NjaHZhbG92YWNpUm9sZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtLmZpbmRGaWVsZHMoXCJpeHNfZnVuX3ByZWRcIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcIml4c19mdW5fcHJlZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJzZXJ2ZXJGaWx0ZXJzXCIsIG15X3NlcnZlckZpbHRlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgIC5hZGRSb3coXCJwcmVka2xhZGF0ZWxcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy1oXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c19zcm9fc2NodmFsb3ZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3Nyb19zY2h2YWxvdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLmNsb3Nlc3QoXCIuZ2Zvcm1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpeHNfc3JvX3NjaHZhbG92OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2X1NlU2NodmFsb3ZhY2lSb2xpOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfc3JvX3NjaHZhbG92ID0gZm9ybS5maW5kRmllbGRzKFwiaXhzX3Nyb19zY2h2YWxvdlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXhzX3Nyb19zY2h2YWxvdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2X1NlU2NodmFsb3ZhY2lSb2xpLnB1c2goaXhzX3Nyb19zY2h2YWxvdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXlfc2VydmVyRmlsdGVyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZVNjaHZhbG92YWNpUm9saTogdl9TZVNjaHZhbG92YWNpUm9saSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVW5pb25TY2h2YWxvdmFjaVJvbGVCZXpTYWJsb255OiB2X1NlU2NodmFsb3ZhY2lSb2xpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU0RhdHVtT2RTY2h2YWxvdmFjaVJvbGU6IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1NEYXR1bURvU2NodmFsb3ZhY2lSb2xlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiaXhzX2Z1bl9zY2h2XCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiZGF0X3Bvel9zY2h2XCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfZnVuX3NjaHZcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiLCBteV9zZXJ2ZXJGaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY250LklTUEZvcm0uYWRkUm93KFwixIzDrXNsbyBQUFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJjaXNsb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaXNsb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNudC5JU1BGb3JtLmFkZFJvdyhcIlDFmWVkcG9rbGFkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7c3J2c3RpcF9uYXpldn1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3RpcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHZhbGlkYXRlOiAodikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmICh2ID09IG51bGwgfHwgdi5peHNfdGlwID09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfdGlwPXZhbHVlLml4c190aXA7IG1vZGVsLml4c19wbGE9PnZhbHVlLml4c19wbGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcInNydnN0aXBfbmF6ZXZcIl0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZFRyYW5zZm9ybTogZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocyA9PSBudWxsKSByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHsgaXhzX3RpcDogXCJcIiwgbmF6ZXY6IHMgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQodGhpcykuY2xvc2VzdChcIi5nZm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdl9yYWRlazogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2X3JhZGVrID0gZm9ybS5maW5kRmllbGRzKFwicmFkZWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZfcmFkZWsgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcIml4c190aXBcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkLnZhbHVlIS5wcml6X3Bvdl9peGIgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGb3JtUm93cyhcInByaWxvaGFcIikuZ2Zvcm1yb3coXCJzZXRMYWJlbFwiLCBcIlDFmcOtbG9oYSAoKilcIiwgXCJKZSBwb8W+YWRvdsOhbm8gdmxvxb5lbsOtIHDFmcOtbG9oeVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGb3JtUm93cyhcInByaWxvaGFcIikuZ2Zvcm1yb3coXCJzZXRMYWJlbFwiLCBcIlDFmcOtbG9oYVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoc2VsZWN0ZWQudmFsdWUhLml4c19zcm9fc2NodmFsb3YgIT0gbnVsbCkgJiYgKHNlbGVjdGVkLnZhbHVlIS5peHNfc3JvX3NjaHZhbG92ICE9IFwiXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcIml4c19zcm9fc2NodmFsb3ZcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgc2VsZWN0ZWQudmFsdWUhLml4c19zcm9fc2NodmFsb3YpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHNlbGVjdGVkLnZhbHVlIS5peHNfc3JvX3ByZWRrbGFkICE9IG51bGwpICYmIChzZWxlY3RlZC52YWx1ZSEuaXhzX3Nyb19wcmVka2xhZCAhPSBcIlwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfc3JvX3ByZWRrbGFkXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHNlbGVjdGVkLnZhbHVlIS5peHNfc3JvX3ByZWRrbGFkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoc2VsZWN0ZWQudmFsdWUhLm5hemV2ICE9IG51bGwpICYmIChzZWxlY3RlZC52YWx1ZSEubmF6ZXYgIT0gXCJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwic3J2c3RpcF9uYXpldlwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBzZWxlY3RlZC52YWx1ZSEubmF6ZXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zcnZzdGlwQURBQWxsKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbnQuSVNQRm9ybS5hZGRSb3coXCJTdGF2IHNwbG7Em27DrVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZXZ6Y3NwZUFEQSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNjaHZfc3BlY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmljdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtjbnQudmFsaWRhdG9yc1tcInNfaW5wXCJdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNfaW5wPXNjaHZfc3BlY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlKGV2LCBzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHZhciBmb3JtID0gJCh0aGlzKS5jbG9zZXN0KFwiLmdmb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGZvcm0uZmluZEZpZWxkcyhcIml4c190aXBcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHZhciB0aGF0ID0gJC5jb250ZW50KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh0aGF0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKHNlbGVjdGVkLnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHZhciB0eXA6IG51bWJlciA9IHNlbGVjdGVkLnZhbHVlIS5zY2h2X3NwZWMhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKCh0eXAgPT0gMSkgJiYgY250Lm1vaHVfZWRpdG92YXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfaW5wXCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB2YXIgZGF0dW1fcG9sZSA9IHRoYXQuZmluZEZpZWxkcyhcImRhdF9pbnBcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKGRhdHVtX3BvbGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfaW5wXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG5ldyBEYXRlKERhdGUubm93KCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfaW5wXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImRhdF9pbnBcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBzcGxuxJtuw61cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X2lucFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJQxZllZGtsYWRhdGVsXCIsIGhpbnQ6IFwiUMWZZWRrbGFkYXRlbFwiIH0pLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc2Z1bigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2xb5keSBwxZnDrXN0dXBuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2zDrcSNa28gamFrbyB0xZlpIHRlxI1reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZnVuX3ByZWRcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG7DoXpldiBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX2Z1bl9wcmVkPXZhbHVlLml4c19mdW5cIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG7DoXZyYXRvdsOhIGhvZG5vdGEgcG91emUgaXhzX2Z1blxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJQxZllZGtsYWRhdGVsXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSQyAyMzM1MjAyOCA6IE5vdsO9IHpwcmFjb3ZhdGVsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlKGV2LCBzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJCh0aGlzKS5jbG9zZXN0KFwiLmdmb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2plX2l4c19mdW4gPSAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdl9ha3RfcG9sZSA9IGZvcm0uZmluZEZpZWxkcyhcImFrdGl2aXRhXCIpLmdmaWVsZChcImdldFZhbHVlQXN5bmNcIikudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZfYWt0ID0gdmFsdWUuYWt0aXZpdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCAmJiBzZWxlY3RlZC52YWx1ZSAmJiBzZWxlY3RlZC52YWx1ZS5peHNfZnVuICE9IG1vamVfaXhzX2Z1bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdl9ha3QgPSAzMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGFrdGl2aXRhOiAzMDAsIGFrdGl2aXRhX3R4dDogXCJuw6F2cmhcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKHZfYWt0ID09IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdl9ha3QgPSA2MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGFrdGl2aXRhOiA2MDAsIGFrdGl2aXRhX3R4dDogXCJrZSBzY2h2w6FsZW7DrVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCAmJiBzZWxlY3RlZC52YWx1ZSkgeyAvLyBqZSB2eXBsbsSbbiBwcmVka2xhZGF0ZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZC52YWx1ZS5peHNfZnVuID09IG1vamVfaXhzX2Z1bikgeyAvLyBqc2VtIHByZWRrbGFkYXRlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3ByZWRsb3ppdC5lbmFibGVkKGNudC5tb2h1X2VkaXRvdmF0ICYmICh2X2FrdCA9PSAzMDApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV9zY2h2YWxpdC5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV96YW1pdG5vdXQuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2VfdnJhdGl0LmVuYWJsZWQoY250Lm1vaHVfZWRpdG92YXQgJiYgKHZfYWt0ID09IDUwMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNudC5ha2NlX3NjaHZhbGl0LmVuYWJsZWQoKCh2X2FrdCA9PSAzMDApIHx8ICh2X2FrdCA9PSA2MDApKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgY250LmFrY2VfemFtaXRub3V0LmVuYWJsZWQoKCh2X2FrdCA9PSAzMDApIHx8ICh2X2FrdCA9PSA2MDApKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgY250LmFrY2VfdnJhdGl0LmVuYWJsZWQoKCh2X2FrdCA9PSA1MDApIHx8ICh2X2FrdCA9PSAxMDApIHx8ICh2X2FrdCA9PSA2MDApKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWtjZV9wcmVkbG96aXQuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2Vfc2NodmFsaXQuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2VfemFtaXRub3V0LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3ZyYXRpdC5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJha3Rpdml0YV9uZXdcIikuZ2ZpZWxkKFwicmVzZXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwic3Rhdl90ZXh0X25ld1wiKS5nZmllbGQoXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3ByZWRsb3ppdC5lbmFibGVkKGNudC5tb2h1X2VkaXRvdmF0ICYmICh2X2FrdCA9PSAzMDApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5ha2NlX3NjaHZhbGl0LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2VfemFtaXRub3V0LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmFrY2VfdnJhdGl0LmVuYWJsZWQoY250Lm1vaHVfZWRpdG92YXQgJiYgKHZfYWt0ID09IDUwMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbn0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJTY2h2YWxvdmF0ZWxcIiwgaGludDogXCJTY2h2YWxvdmF0ZWxcIiB9KS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbnNmdW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9sw63EjWtvIGpha28gdMWZaSB0ZcSNa3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl9zY2h2XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuw6F6ZXYgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19mdW5fc2Nodj12YWx1ZS5peHNfZnVuXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuw6F2cmF0b3bDoSBob2Rub3RhIHBvdXplIGl4c19mdW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiU2NodmFsb3ZhdGVsXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSQyAyMzM1MjAyOCA6IE5vdsO9IHpwcmFjb3ZhdGVsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlRlcm3DrW4gcHJvIHNjaHbDoWxlbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Bvel9zY2h2XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJQxZnDrWxvaGFcIiwgcmVxdWlyZWQ6IGZhbHNlLCBuYW1lOiBcInByaWxvaGFcIiwgaGludDogXCJQxZnDrWxvaGFcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3BvcGlzOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeGJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW2NudC52YWxpZGF0b3JzW1wiaXhiXCJdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4Yj12YWx1ZS5peGJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peGI9dmFsdWUuaXhiLG1vZGVsLml4cz0+dmFsdWUuaXhzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJwb3Bpc1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRUcmFuc2Zvcm06IGZ1bmN0aW9uIChzKSB7IHJldHVybiB7IHBvcGlzOiAnJyB9OyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgaXhzOiB0aGF0LmFrdF9peHMgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZUVkaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICgocmFkZWtJU1AuaXhiKSAmJiAocmFkZWtJU1AuaXhiICE9PSBcIlwiKSkgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpbG9oYVpvYnJhekFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRvd25sb2FkXCIsIC8vXCJnaS1lYXR0YWNobWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChyYWRla0lTUC5peGIpICYmIChyYWRla0lTUC5peGIgIT09IFwiXCIpKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgZXhpc3R1amUgdnlicmFuw70gesOhem5hbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnYyA9IG5ldyBHQ29udGVudChcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBa2NlSVNQU2V6bmFtXCIpOyAvL2RvdGHFvmVuw60gxZnDoWRrdSB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2MuY2FsbDxHb3JkaWMuR2luLkludGVyZmFjZS5HRmlsZUluU3RyaW5nRHRvPihcIkdldEZpbGVaVWxvemlzdGVcIiwgeyBJeGI6IHJhZGVrSVNQLml4YiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHQnJvd3NlckV4dHJhcy5kb2N1bWVudFNhdmVPcGVuTG9jYWwoci5OYW1lISwgci5CeXRlcyEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXRWYWwpIHsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikgeyBHb3JkaWMuR3VpLldlYkFwcC5VdGlscy5zaG93UmVhc29uRmxhc2goZ2MsIGVycik7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2MuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2U6IGZ1bmN0aW9uIChldiwgc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHZhciBmb3JtID0gJCh0aGlzKS5jbG9zZXN0KFwiLmdmb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIHZfcmFkZWs6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB2X3JhZGVrID0gZm9ybS5maW5kRmllbGRzKFwicmFkZWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAodl9yYWRlayA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfdGlwXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgR29yZGljLlByZWZhYnMuU2VsZWN0LmlTUFByaWxvaGEoKSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNudC5JU1BGb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkFrdHXDoWxuw60gc3RhdlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfdGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNudC5JU1BGb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUHJvY2VzIHNjaHbDoWxlbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2J1dHRvblwiLCBcIlwiLCB7IHBhcmFtczogeyBhY3Rpb246IGNudC5ha2NlX3ByZWRsb3ppdCB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdidXR0b25cIiwgXCJcIiwgeyBwYXJhbXM6IHsgYWN0aW9uOiBjbnQuYWtjZV9zY2h2YWxpdCB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdidXR0b25cIiwgXCJcIiwgeyBwYXJhbXM6IHsgYWN0aW9uOiBjbnQuYWtjZV96YW1pdG5vdXQgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnYnV0dG9uXCIsIFwiXCIsIHsgcGFyYW1zOiB7IGFjdGlvbjogY250LmFrY2VfdnJhdGl0IH0gfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNudC5JU1BGb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJOb3bDvSBzdGF2XCIsIHsgbmFtZTogXCJyYWRla19ub3Z5X3N0YXZcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfdGV4dF9uZXdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjbnQubW9odV9lZGl0b3ZhdCA9ICgocmFkZWtJU1AuUGVybWlzc2lvbnMhLkx6ZUVkaXRvdmF0LnZhbHVlISkgJiYgKGNudC5nbG9iYWxzLlBhcmFtX1Vsb2hhX1ByaXByYXZhX0lQID09PSBJbnRlcmZhY2UuUHJpc3R1cEtVbG96ZUVudW0uQW5vX0VkaXRhY2UpKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21tYW5kQmFyOiAoTWVudVBhcmFtcyB8IEdTaW1wbGVEaWFsb2dDb21tYW5kKVtdID0gKGNudC5tb2h1X2VkaXRvdmF0ID09IHRydWUpID8gW1wib2shXCIsIFwiY2FuY2VsXCJdIDogW1wiY2FuY2VsIVwiXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvbV92eXNsZWRlayA9IGNudC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJEZXRhaWwgSVBcIiwgY250LklTUEZvcm0sIHJhZGVrSVNQLCB7IHdpZHRoOiA1MDAsIGhlaWdodDogNjAwLCBjb21tYW5kQmFyOiBjb21tYW5kQmFyIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9tX3Z5c2xlZGVrX3BybyA9IHByb21fdnlzbGVkZWsuY3JlYXRlRGlhbG9nUHJvbWlzZSggLypcImNsb3NlXCIqLy8qXCJ5ZXNcIiovLypcIm9rXCIqLy8qLCB7IGR1dm9kOiBzdHJpbmcgfSovKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJhZGVrSVNQXCIsIHJhZGVrSVNQKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuYWt0aXZpdGFfbmV3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYWt0aXZpdGFfbmV3ID0gZGF0YS5ha3Rpdml0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmFrdGl2aXRhICE9IGRhdGEuYWt0aXZpdGFfbmV3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYWt0aXZpdGEgPSBkYXRhLmFrdGl2aXRhX25ldztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5pc2wuQWtjZUlTUC51cGRhdGUoeyBkYXRhOiBkYXRhIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJhZGVrSVNQIHVsb3plbm9cIiwgcmFkZWtJU1ApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQudmlld19JU0wucmVxdWVzdERhdGEoeyBmaWx0ZXJzOiB7fSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVsb3plbm9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgIHZhciBkZXRhaWx3aW5kb3cgPSBjbnQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgW1wiR29yZGljLkFkYS5XZWJDbGllbnQuR0RldGFpbEFrY2VcIiwgeyBncmlkUmVtb3RlQ29udHJvbDogbm92YWFrY2UgPT0gZmFsc2UgPyBncmlkUkMgOiBudWxsLCBncGM6IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyhjbnQuZ3BjLCB2eWJyYW5lUmFka3kuaXhzX3BsYSEpIH1dLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgaWQ6ICdEZXRhaWxEb2tsYWR1IycsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNpc2xvOiBsX2Npc2xvLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBpeHNfY2lhOiBsX2l4c19jaWEsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIFJlemltUHJvdm96dTogdGhpcy5nbG9iYWxzLlJlemltUHJvdm96dSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgRWRpdGFibGU6IGVkaXRhYmxlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBOb3ZhQWtjZTogbm92YWFrY2VcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICB2YXIgd2luZG93Q29udGVudCA9ICQuY29udGVudChkZXRhaWx3aW5kb3cpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgIHdpbmRvd0NvbnRlbnQub24oXCJhZGFfc2F2ZWFrY2Vfc2V0X3N0YXZfYXpcIiwgZnVuY3Rpb24gKHJldFZhbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB2YXIgZmlsdGVyRHRvOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU2V6bmFtQWRhRmlsdGVyRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgZmlsdGVyRHRvLmNpc2xvID0geyBzdGFydDogcmV0VmFsLmRhdGFbMF0uY2lzbG8sIGVuZDogcmV0VmFsLmRhdGFbMF0uY2lzbG8gfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgY250LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogZmlsdGVyRHRvIH0sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgIHdpbmRvd0NvbnRlbnQuZWxlbWVudC5vbignY29udGVudGNsb3NlZCcsIChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgY250Lm1haW5UYWJsZS5nZ3JpZCgnZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH0pOyAvLyBwxZlpIHphdsWZZW7DrSBkZXRhaWx1IHNlIG5hc3RhdsOtIGZvY3VzIG5hIGdyaWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG5hc3Rhdl9zdGF2X2lwKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciB2eWJyYW5lUmFka3k6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdJU1BBa2NlRHRvW10gPSB0aGF0LmZpbmQoXCIuanMtU2V6bmFtU2NodmFsb3ZhbmlJUFwiKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTsgIC8vIG5hxI10ZW7DrSBwxZllcyB2eWhsZWTDoW7DrSBncmlkdSAocMWZZXMgY2xhc3MpXHJcbiAgICAgICAgICAgIGlmICh2eWJyYW5lUmFka3kubGVuZ3RoID4gMCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0dWplIHZ5YnJhbsO9IMWZw6FkZWtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYV9zdGF2X2F6X2FrY2VfaHJvbV9BWih0aGF0LCB0aGF0LnZpZXdfSVNMLCB0aGF0Lmdsb2JhbHMsIHZ5YnJhbmVSYWRreSwgYWt0X3JvbGUsIGFrdF9zdGF2KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgU2VsZWN0aW9uRm9yUHJldmlld0NvbnRyb2xsZXIoXHJcbiAgICAgICAgICAgIG9wdDoge1xyXG4gICAgICAgICAgICAgICAgZ2dyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD5cclxuICAgICAgICAgICAgfSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXZpZXdDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG9wdC5nZ3JpZC5nZ3JpZCgnYWN0aXZlUm93Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc19lbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXIuc2hvdyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyLnNob3dJbmZvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktdmlzaWJsZS1ub25cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5lbcOhIHDFmcOtbG9odVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWVzc2FnZTogXCJOZW3DoSBlbGVrdHJvbmlja8O9IG9icmF6XCIgLy9SQyAzMTkyNjQyOSA6IFBybyBzcGlzIG5lbsOtIG7DoWhsZWQgcG92b2xlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBDcmVhdGVQcmV2aWV3UGFuZWwoKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAkKFwiPGRpdj5cIikuZ2ZpbGVwcmV2aWV3KHsgZGlzcGxheUZpbGVOYW1lOiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBMb2FkUHJldmlldyhyb3cpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnByZXZpZXdEaXYgfHwgIXRoaXMucHJldmlld0Rpdi5oYXNDbGFzcyhcImdmaWxlcHJldmlld1wiKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAocm93KSB7IC8vIHRlc3QgbmEgcm93IC4uLiBnZ3JpZChcImdldFNlbGVjdGlvblwiKSBuZWtkeSB2cmF0aSBudWxsIGkga2R5eiBqZSBuYXBsbmVuZSBzZWxlY3Rpb25JbmZvIChwcmkgcG9tYWxlanNpY2ggb2RlenZhY2gpXHJcbiAgICAgICAgICAgICAgICBsZXQgaXhwID0gcm93Lml4cDtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJDaXNsbyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdEaXYuZ2ZpbGVwcmV2aWV3KFwiZGlzcGxheUZyb21TZXJ2ZXJcIiwgR29yZGljLldmbC5GaWxlUHJldmlldy5kaXNwbGF5RWxEb2MoaXhwLCBzZXJDaXNsbywgeyBmb3JjZU5ldzogdHJ1ZSB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmFibGVQcmV2aWV3KGVuYWJsZWQpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJldmlld0RpdiAmJiB0aGlzLnByZXZpZXdEaXYuaGFzQ2xhc3MoXCJnZmlsZXByZXZpZXdcIikpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdEaXYuZ2ZpbGVwcmV2aWV3KFwib3B0aW9uXCIsIHsgZGlzYWJsZWQ6ICFlbmFibGVkIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gICB0aGlzLnByZXZpZXdEaXYuZ2ZpbGVwcmV2aWV3KCdvcHRpb24nLCAndXNlclNldHRpbmdzJywgdGhpcy51c2VyU2V0dGluZ3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgU2hvd1ByZXZpZXcocm93KTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnQuZ3NpZGViYXIoXCJnZXRQYW5lbFwiLCBcInBhbmVsUHJldmlld1wiKS5nc2JwYW5lbChcIm9wdGlvblwiLCBcInZpc2libGVcIikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9hZFByZXZpZXcocm93KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucm93VG9QcmV2aWV3ID0gcm93O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBha3R1YWxpenVqTmFobGVkKHJvdyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnJvd1RvUHJldmlldyA9IHJvdztcclxuICAgICAgICAgICAgdGhpcy5FbmFibGVQcmV2aWV3KHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLkxvYWRQcmV2aWV3KHRoaXMucm93VG9QcmV2aWV3KTtcclxuICAgICAgICAgICAgdGhpcy5yb3dUb1ByZXZpZXcgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==
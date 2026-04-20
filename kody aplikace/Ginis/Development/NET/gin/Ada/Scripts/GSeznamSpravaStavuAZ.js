"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GSeznamSpravaStavuAZ.js                                                        </Name>
//    <Description> GAkceUct                                                                                  </Description>
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
            let GSeznamSpravaStavuAZ = class GSeznamSpravaStavuAZ extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.model_filtr = { role: 0, stav_az: 0 };
                    this.title = "Správa stavu AZ";
                    this.taskId = "actSeznamSpravaAZ"; // označení položky v taskListu
                }
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    $tab.empty();
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actZmenitStav: {
                            caption: "Změnit stav",
                            icon: "gi-pencil",
                            enabled: (that.globals.Param_Uloha_Sprava_AZ === 2 /* Interface.PristupKUlozeEnum.Ano_Editace */),
                            primary: true,
                            run: () => {
                                //that.model_filtr
                                return cnt.nastav_stav_az(that.model_filtr.role, that.model_filtr.stav_az);
                            }
                        }
                    });
                    this.actions.addRange({
                        actDetail: {
                            caption: "Detail",
                            icon: "gi-detail",
                            primary: true,
                            run: () => {
                                return that.detail_radku(false, false);
                            }
                        }
                    });
                    this.actions.addRange({
                        actGridDoubleClick: {
                            run: function (ev, ctx) {
                                // return that.detail_radku(that.globals.Param_Akce_Editace_TP, false);
                                return that.detail_radku(false, false);
                            }
                        }
                    });
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actDetail*", "actZmenitStav*"]));
                    var filterFormDef = new Gordic.Forms.Form({ tabLabel: "Kompletní filtr", layoutDescriptor: "w-L-9 w-M-9 w-S-12" })
                        .addSection();
                    filterFormDef
                        .addField("gselectbox", {
                        name: "role",
                        model: "model.role=value.id",
                        multi: false,
                        list: true,
                        initialValue: { id: 0 },
                        itemWidth: "",
                        itemTemplate: "{nazev}",
                        change: function (ev, obj) {
                            //if (obj.flags.isKontrolniDiv || obj.flags.noChange) return;
                            if (obj.flags.noChange)
                                return;
                            //                        if (obj.value != null) return;
                            var akt_role_i = 0;
                            var init_value_i = 0;
                            akt_role_i = obj.value?.id ?? 0;
                            var pole_serverFiltr_i = new Array();
                            if (akt_role_i == 0) {
                                pole_serverFiltr_i = [0, 2, 3, 1];
                                init_value_i = 0;
                            }
                            if (akt_role_i == 1) {
                                pole_serverFiltr_i = [2, 3, 1];
                                init_value_i = 2;
                            }
                            if (akt_role_i == 2) {
                                pole_serverFiltr_i = [0, 2, 1];
                                init_value_i = 2;
                            }
                            $(this).gform().findFields("stav_az_f").gfield("option", "serverFilters", { stav_az: pole_serverFiltr_i });
                            $(this).gform().findFields("stav_az_f").gfield("setValue", { stav_az: init_value_i }, { valid: false });
                            //// automatické načtení po změně hodnoty
                            //let dto = {};
                            //that.filterForm!.findFields().gfield("model", "collect", dto);
                            //that.filterForm!.gfilterpanel("applyFilter", dto);
                        },
                        data: new Gordic.Data.View([
                            { nazev: "Zpracovatel", id: 0 },
                            { nazev: "Kompetent", id: 1 },
                            { nazev: "Finanční kompetent AZ", id: 2 }
                        ], { key: "id" })
                    });
                    filterFormDef
                        .addField("gselectbox", Gordic.Prefabs.Select.srvcsaz(), {
                        name: "stav_az_f", model: "model.stav_az=value.stav_az", multi: false, list: true, itemWidth: "", disabled: false, initialValue: { stav_az: 0 },
                        change: function (ev, obj) {
                            // automatické načtení po změně hodnoty
                            if (obj.flags.isKontrolniDiv || obj.flags.noChange)
                                return;
                            let dto = {};
                            that.filterForm.findFields().gfield("model", "collect", dto);
                            that.filterForm.gfilterpanel("applyFilter", dto);
                        },
                    });
                    //filterFormDef
                    //    .addRow("Stav AZ").addField("gselectbox", Gordic.Prefabs.Select.srvcsaz(), {
                    //        name: "stav_az", model: "model.stav_az=value.stav_az", multi: true, list: true, itemWidth: ""
                    //    });
                    that.filterForm = $("<div>").appendTo(mainForm)
                        .gfilterpanel({
                        // default pro EKO
                        filterViewModeUserSettings: [FilterViewMode.Simple],
                        filterViewMode: FilterViewMode.Simple,
                        //poOtevreniOtevritPanelPodminek: false,     // default pro uživatelské nastavení
                        poVyhledaniZobrazit: "VyhledanePodminkyVBadge",
                        autoLoadAfterChoseFilter: false, // Automatické vyhledání po změně uloženého
                        clearFilterButtonVisible: "NeverVisible",
                        detailActionAsCheckbox: false,
                        //idSimpleMode:"idSimpleMode",
                        forms: [filterFormDef],
                        // TODO: bude nějaké lepší ukládací okno nebo budu muset udělat svoje a nastavit ho do saveOptionsForm?
                        favorites: ["role", "stav_az"],
                        favoriteLayoutDescriptor: "L4M3S1",
                        // TODO: zůstane tohle téma nebo bude pro LK jiné než pro TK?
                        tema: "ada_ptm_adabas2",
                        filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                        saveOptionsForm: "eko",
                        // strictStopAutoLoad: true,               // Striktně zakáže automatické načtení hned po otevření seznamu, oblíbený filtr se pouze předplní.
                        // textItemTemplate: "{description}",
                        apply: function (event, obj) {
                            // načtení dat podle filtrů
                            that.model_filtr = obj.filter;
                            if (that.model_filtr && that.model_filtr.role != null) {
                                var filterDto = {};
                                filterDto.aktivita = { o: "IN", v: [100, 300] };
                                if (that.model_filtr.role == 0) {
                                    filterDto.ixs_fun_akt = { o: "=", v: $.content("main").IxsFunAkt };
                                    filterDto.ixs_fun_az = null;
                                    filterDto.komp = null;
                                }
                                ;
                                if (that.model_filtr.role == 1) {
                                    filterDto.ixs_fun_akt = null;
                                    filterDto.ixs_fun_az = null;
                                    filterDto.komp = { o: "=", v: $.content("main").IxsFunAkt };
                                }
                                ;
                                if (that.model_filtr.role == 2) {
                                    filterDto.ixs_fun_akt = null;
                                    filterDto.ixs_fun_az = { o: "=", v: $.content("main").IxsFunAkt };
                                    filterDto.komp = null;
                                }
                                ;
                                if (that.model_filtr && that.model_filtr.stav_az != null) {
                                    filterDto.stav_az = { o: "=", v: that.model_filtr.stav_az };
                                }
                                console.log("role", that.model_filtr.role);
                                console.log("filterDto", filterDto);
                                that.view_ISL.requestData({ filters: filterDto });
                            }
                        }
                    });
                    cnt.gridFormatSeznam = new Gordic.Data.GridFormat();
                    Gordic.Eko.Grid.Column.addVlastnictvi(cnt.gridFormatSeznam);
                    //cnt.gridFormatSeznam
                    //    .addTextColumn({
                    //        name: "ixs_fun_az_nazev",
                    //        field: "ixs_fun_az_nazev",
                    //        caption: "FUN AZ",
                    //        width: 200
                    //    });
                    //cnt.gridFormatSeznam
                    //    .addIconColumn({
                    //        name: "JsemKompetentAZ",
                    //        field: "JsemKompetentAZ",
                    //        caption: "JsemKompetentAZ",
                    //        formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                    //        iconTemplate: function (data) {
                    //            switch (data!.JsemKompetentAZ) {
                    //                case true: return { icon: "gi-tick", text: "Jsem", caption: "Jsem", tooltip: "Jsem" };
                    //                case false: return { icon: "fa-fw", text: "Nejsem", caption: "Nejsem", tooltip: "Nejsem" };
                    //                default: return null;
                    //            }
                    //        }
                    //    });
                    //cnt.gridFormatSeznam
                    //.addIconColumn({
                    //    name: "stav_inp",
                    //    field: "stav_inp",
                    //    caption: "Stav IP",
                    //    formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                    //    iconTemplate: function (data) {
                    //        switch (data!.stav_inp) {
                    //            case 1: return { icon: "gi-tick", text: "Splněny", caption: "Splněny", tooltip: "Splněny" };
                    //            case 0: return { icon: "fa-fw", text: "Nesplněny", caption: "Nesplněny", tooltip: "Nesplněny" };
                    //            default: return null;
                    //        }
                    //    }
                    //});
                    cnt.gridFormatSeznam.addIconColumn({
                        name: "aktivita",
                        field: "aktivita",
                        caption: "Stav",
                        //hidden: this.globals.Param_Akce_AutSchv == Interface.TypAutomatSchvaleniNovaAkceEnum.NeSprocesem,
                        // width: 25,
                        formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                        iconTemplate: function (data) {
                            switch (data.aktivita) {
                                case 100 /* Interface.AktivitaAkceEnum.Aktivni */: return { icon: "fa-check-circle-o g-state-success g-state-text", text: "Aktivní", caption: "Aktivní", tooltip: "Aktivní" };
                                case 300 /* Interface.AktivitaAkceEnum.Navrh */: return { icon: "fa-check-circle g-state-warning g-state-text", text: "Návrh", caption: "Návrh", tooltip: "Návrh" };
                                case 500 /* Interface.AktivitaAkceEnum.Neaktivni */: return { icon: "fa-trash g-state-error g-state-text", text: "Neaktivní", caption: "Neaktivní", tooltip: "Neaktivní" };
                                case 500 /* Interface.AktivitaAkceEnum.Zrusena */: return { icon: "fa-trash g-state-error g-state-text", text: "Stornovaná", caption: "Stornovaná", tooltip: "Stornovaná" };
                                default: return null;
                            }
                        }
                    });
                    cnt.gridFormatSeznam
                        .addIconColumn({
                        name: "stav_inp",
                        field: "stav_inp",
                        caption: "Stav IP",
                        formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                        iconTemplate: function (data) {
                            switch (data.stav_inp) {
                                case 1: return { icon: "gi-tick", text: "Splněny", caption: "Splněny", tooltip: "Splněny" };
                                case 0: return { icon: "fa-fw", text: "Nesplněny", caption: "Nesplněny", tooltip: "Nesplněny" };
                                default: return null;
                            }
                        }
                    });
                    cnt.gridFormatSeznam.addIconColumn({
                        name: "aktivita",
                        field: "aktivita",
                        caption: "Stav",
                        //hidden: this.globals.Param_Akce_AutSchv == Interface.TypAutomatSchvaleniNovaAkceEnum.NeSprocesem,
                        // width: 25,
                        formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                        iconTemplate: function (data) {
                            switch (data.aktivita) {
                                case 100 /* Interface.AktivitaAkceEnum.Aktivni */: return { icon: "fa-check-circle-o g-state-success g-state-text", text: "Aktivní", caption: "Aktivní", tooltip: "Aktivní" };
                                case 300 /* Interface.AktivitaAkceEnum.Navrh */: return { icon: "fa-check-circle g-state-warning g-state-text", text: "Návrh", caption: "Návrh", tooltip: "Návrh" };
                                case 500 /* Interface.AktivitaAkceEnum.Neaktivni */: return { icon: "fa-trash g-state-error g-state-text", text: "Neaktivní", caption: "Neaktivní", tooltip: "Neaktivní" };
                                case 500 /* Interface.AktivitaAkceEnum.Zrusena */: return { icon: "fa-trash g-state-error g-state-text", text: "Stornovaná", caption: "Stornovaná", tooltip: "Stornovaná" };
                                default: return null;
                            }
                        }
                    });
                    cnt.gridFormatSeznam.addTextColumn({
                        name: "ixs_pla_txt",
                        caption: "Kniha",
                        customClass: "dt-left",
                        width: 200,
                    });
                    cnt.gridFormatSeznam.addNumberColumn({
                        name: "pocet_priloh",
                        caption: "#P",
                        tooltipTemplate: "Počet navázaných příloh",
                        customClass: "dt-center",
                        width: 40
                    });
                    cnt.gridFormatSeznam.addNumberColumn({
                        name: "pocet_kompetentu",
                        caption: "#K",
                        tooltipTemplate: "Počet navázaných kompetentů",
                        customClass: "dt-center",
                        width: 40
                    });
                    cnt.gridFormatSeznam.addNumberColumn({
                        name: "pocet_isp",
                        caption: "#IP",
                        tooltipTemplate: "Počet IP",
                        customClass: "dt-center",
                        width: 40
                    });
                    cnt.gridFormatSeznam
                        .addTextColumn({
                        name: "cislo",
                        caption: cnt.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */ ? "Číslo pol. plánu" : "Číslo akce",
                        customClass: "dt-left",
                        width: 140
                    })
                        .addTextColumn({
                        name: "nazev",
                        caption: cnt.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */ ? "Název pol. plánu" : "Název akce",
                        customClass: "dt-left",
                        width: 300,
                    })
                        .addTextColumn({
                        name: "stav_real_txt",
                        field: "stav_real_txt",
                        caption: "Stav realizace",
                        hidden: this.globals.Param_Akce_AutSchv != 3 /* Interface.TypAutomatSchvaleniNovaAkceEnum.NeSprocesem */,
                        width: 110
                    });
                    if (cnt.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */) {
                        cnt.gridFormatSeznam
                            .addTextColumn({
                            name: "stav_az_txt",
                            field: "stav_az_txt",
                            caption: "Stav AZ",
                            width: 110
                        });
                    }
                    else {
                        // toto je po staru - kde bylo jen ano/ne
                        cnt.gridFormatSeznam
                            .addIconColumn({
                            name: "priz_az",
                            field: "priz_az",
                            caption: "Stav AZ",
                            formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                            iconTemplate: function (data) {
                                switch (data.priz_az) {
                                    case 1: return { icon: "gi-tick", text: "Zabezpečeno", caption: "Zabezpečeno", tooltip: "Zabezpečeno" };
                                    case 0: return { icon: "fa-fw", text: "Nezabezpečeno", caption: "Nezabezpečeno", tooltip: "Nezabezpečeno" };
                                    default: return null;
                                }
                            }
                        });
                    }
                    cnt.gridFormatSeznam
                        .addTextColumn({
                        name: "typ_akce_sum_txt",
                        field: "typ_akce_sum_txt",
                        caption: "Typ akce",
                        width: 100
                    })
                        //.addNumberColumn({
                        //    name: "typ_akce_sum",
                        //    field: "typ_akce_sum",
                        //    caption: "Typ akce SUM",
                        //    width: 0,
                        //    hidden: true
                        //})
                        .addTextColumn({
                        name: "cis_real",
                        caption: "Realizátor",
                        customClass: "dt-left",
                        width: 110 //,
                    })
                        .addTextColumn({
                        name: "nks",
                        caption: cnt.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */ ? "ČPP" : this.globals.Titulek_Nks,
                        customClass: "dt-left",
                        width: 80 //,
                    })
                        .addTextColumn({
                        name: "t_nks",
                        caption: cnt.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */ ? "Název ČPP" : "Název " + this.globals.Titulek_Nks,
                        customClass: "dt-left",
                        width: 100 //,
                    });
                    cnt.gridFormatSeznam
                        .addDateTimeColumn({
                        name: "dat_zmena",
                        searchFields: ["*datum_zmeny_filtrace"],
                        caption: "Datum poslední změny",
                        customClass: "dt-left",
                        width: 140,
                    })
                        .addTextColumn({
                        name: "zmenu_prov_txt",
                        caption: "Poslední změnu provedl",
                        customClass: "dt-left",
                        width: 200 //,
                    })
                        .addDateColumn({
                        name: "datum_zmeny_filtrace",
                        caption: "Datum změny filtrace",
                        customClass: "dt-left",
                        hidden: true,
                        width: 140
                    })
                        .addNumberColumn({
                        name: "fin_od",
                        field: "fin_od",
                        caption: "Fin. od",
                        width: 50
                    })
                        .addNumberColumn({
                        name: "fin_do",
                        field: "fin_do",
                        caption: "Fin. do",
                        width: 50
                    })
                        .addNumberColumn({
                        name: "real_od",
                        field: "real_od",
                        caption: "Real. od",
                        width: 50
                    })
                        .addNumberColumn({
                        name: "real_do",
                        field: "real_do",
                        caption: "Real. do",
                        width: 50
                    })
                        .addTextColumn({
                        name: "ixs_fun_akt_nazev",
                        caption: "Zpracovatel",
                        customClass: "dt-left",
                        width: 200
                    });
                    cnt.mainTable = $("<div class='js-SeznamDokladuAZ'>")
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
                            { name: "Zjednodušený", columnList: "zpracovatel, aktivita, cislo, nazev, c_2_3_7_8_23_25, c_6_18, c_0, c_zbyva_cerpat, cerpano_proc", _locked: true },
                            { name: "Úplný", columnList: this.zjisti_sloupce(cnt.gridFormatSeznam), _locked: true } //gridFormatSeznam.columns.filter((c) => c.name != "kniha").join() },
                        ],
                    });
                    var filterDto = {};
                    filterDto.stav_az = { o: "=", v: that.model_filtr.stav_az };
                    filterDto.ixs_fun_akt = { o: "=", v: $.content("main").IxsFunAkt };
                    filterDto.aktivita = { o: "IN", v: [100, 300] };
                    that.view_ISL = new Gordic.Isl.View(this.isl.Akce.list({ filters: filterDto, fragments: ["Permissions", "*"] }));
                    cnt.mainTable.ggrid("setData", that.view_ISL);
                }
                zjisti_sloupce(gf) {
                    return gf.columns.filter(e => e.hidden != true).map(e => e.name).join(',');
                }
                detail_radku(editable, novaakce) {
                    var cnt = this;
                    var l_cislo = "";
                    var l_ixs_cia = "";
                    var vybraneRadky;
                    var mam_detail;
                    // vybraneRadky = cnt.find(".js-SeznamDokladuAZ").ggrid("getSelection");                        // načtení přes vyhledání gridu (přes class)
                    //if (vybraneRadky.length === 1) {                                                            // pokud existuje vybraný záznam
                    if (novaakce == true) {
                        vybraneRadky = {};
                        vybraneRadky.cislo = cnt.globals.Te1_Msk_Nula;
                        vybraneRadky.ixs_cia = "";
                        vybraneRadky.aktivita = 100 /* Interface.AktivitaAkceEnum.Aktivni */;
                        mam_detail = true;
                    }
                    else {
                        var vybraneRadky_meta;
                        vybraneRadky_meta = cnt.find(".js-SeznamDokladuAZ").ggrid("activeRow", true); // načtení přes vyhledání gridu (přes class)
                        vybraneRadky = vybraneRadky_meta.data;
                        mam_detail = (vybraneRadky_meta && !vybraneRadky_meta._isVirtual && vybraneRadky && (vybraneRadky.cislo !== undefined) && (vybraneRadky.cislo !== ""));
                    }
                    if (mam_detail) {
                        l_cislo = vybraneRadky.cislo;
                        l_ixs_cia = vybraneRadky.ixs_cia;
                        // editable = editable && vybraneRadky.aktivita == Interface.AktivitaAkceEnum.Aktivni;
                        editable = editable;
                        var gridRC = new Gordic.Components.GridRC(cnt.mainTable); //pohyb po gridu
                        var detailwindow = cnt.navigate(["Gordic.Ada.WebClient.GDetailAkce", { gridRemoteControl: novaakce == false ? gridRC : null, gpc: Gordic.Eko.Utils.createBookGpc(cnt.gpc, vybraneRadky.ixs_pla) }], {
                            id: 'DetailDokladu#',
                            cislo: l_cislo,
                            ixs_cia: l_ixs_cia,
                            RezimProvozu: this.globals.RezimProvozu,
                            Editable: editable,
                            NovaAkce: novaakce
                        });
                        var windowContent = $.content(detailwindow);
                        windowContent.on("ada_saveakce", function (retVal) {
                            var filterDto = {};
                            //filterDto.cislo = { start: l_cislo.toString().trim(), end: l_cislo.toString().trim() };
                            //cnt.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                            filterDto.cislo = { start: retVal.data.cislo.toString().trim(), end: retVal.data.cislo.toString().trim() };
                            cnt.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                        });
                        windowContent.on("ada_saveakce_schvaleni", function (retVal) {
                            var vybraneRadky_meta;
                            vybraneRadky_meta = cnt.find(".js-SeznamDokladuAZ").ggrid("activeRow", true); // načtení přes vyhledání gridu (přes class)
                            vybraneRadky_meta.data.cislo = retVal.data[0].cislo;
                            vybraneRadky_meta.key = retVal.data[0].rok + retVal.data[0].ico + retVal.data[0].cislo + retVal.data[0].ixs_cia;
                            var filterDto = {};
                            filterDto.cislo = { start: retVal.data[0].cislo, end: retVal.data[0].cislo };
                            cnt.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                        });
                        windowContent.on("ada_saveakce_set_stav_real", function (retVal) {
                            var filterDto = {};
                            filterDto.cislo = { start: retVal.data[0].cislo, end: retVal.data[0].cislo };
                            cnt.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                        });
                        windowContent.on("ada_saveakce_set_stav_az", function (retVal) {
                            var filterDto = {};
                            filterDto.cislo = { start: retVal.data[0].cislo, end: retVal.data[0].cislo };
                            cnt.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                        });
                        windowContent.element.on('contentclosed', (ev, ctx) => {
                            cnt.mainTable.ggrid('focus');
                        }); // při zavření detailu se nastaví focus na grid
                    }
                }
                nastav_stav_az(akt_role, akt_stav) {
                    var that = this;
                    var vybraneRadky = that.find(".js-SeznamDokladuAZ").ggrid("getSelection"); // načtení přes vyhledání gridu (přes class)
                    if (vybraneRadky.length > 0) { // existuje vybraný řádek
                        that.zmena_stav_az_akce_hrom_AZ(that, that.view_ISL, that.globals, vybraneRadky, akt_role, akt_stav);
                    }
                }
                zmena_stav_az_akce_hrom_AZ(gcontent, pohled, globaly, vybraneRadky, akt_role, akt_stav) {
                    var l_cislo = "";
                    var l_ixs_cia = "";
                    var l_ico = "";
                    var l_rok = 0;
                    var that = gcontent;
                    let defClose = $.Deferred();
                    var confirmQuestion = ""; // promenna na prenos mezi kroky
                    var modelDataFirst = { new_stav_az: 0 }; // použitá proměnná pro přenos mezi kroky
                    var pole_serverFiltr = new Array();
                    var init_value = 0;
                    ;
                    //{ nazev: "Zpracovatel", id: 0 },
                    //{ nazev: "Kompetent", id: 1 },
                    //{ nazev: "Finanční kompetent AZ", id: 2 }
                    if (akt_role == 0) {
                        if (akt_stav == 0) {
                            pole_serverFiltr = [2];
                            init_value = 2;
                        }
                        if (akt_stav == 2) {
                            pole_serverFiltr = [0, 3];
                            init_value = 3;
                        }
                        if (akt_stav == 3) {
                            pole_serverFiltr = [2, 1];
                            init_value = 1;
                        }
                        if (akt_stav == 1) {
                            pole_serverFiltr = [3];
                            init_value = 3;
                        }
                    }
                    if (akt_role == 1) {
                        if (akt_stav == 2) {
                            pole_serverFiltr = [3];
                            init_value = 3;
                        }
                        if (akt_stav == 3) {
                            pole_serverFiltr = [2, 1];
                            init_value = 1;
                        }
                        if (akt_stav == 1) {
                            pole_serverFiltr = [3];
                            init_value = 3;
                        }
                    }
                    if (akt_role == 2) {
                        if (akt_stav == 0) {
                            pole_serverFiltr = [2];
                            init_value = 2;
                        }
                        if (akt_stav == 2) {
                            pole_serverFiltr = [0];
                            init_value = 0;
                        }
                        if (akt_stav == 1) {
                            pole_serverFiltr = [3];
                            init_value = 3;
                        }
                    }
                    modelDataFirst.new_stav_az = init_value;
                    // , initialValue: { stav_az: init_value }
                    var l_oForm = new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L1M1S1, L-2-8-2, M-2-8-2, S-12-12-0" })
                        .addRow("Nový stav AZ").addField("gselectbox", Gordic.Prefabs.Select.srvcsaz(), {
                        name: "stav_az", model: "model.new_stav_az=value.stav_az", multi: false, list: true, itemWidth: "", disabled: false, serverFilters: { stav_az: pole_serverFiltr }, validators: [new Gordic.Validators.Required()],
                    })
                        .addRow({ label: "" });
                    var confirmQuestion = ""; // promenna na prenos mezi kroky
                    that.navigate(Gordic.Eko.Components.ThreeStepsContent, {
                        ID: "wiz_preevidence_akce",
                        keys: pohled.keys, // klic
                        gridFormat: this.gridFormatSeznam, // new Gordic.Data.GridFormat().add(that.find(".js-SeznamDokladuAZ").ggrid<Gordic.Ada.Interface.GAkceDto, "columns">("option", "columns") || []), //gridformat
                        title: "Změna stavu AZ", // titulek
                        indicatorType: "KPI",
                        firstStep: {
                            form: l_oForm, // prefab formu
                            gridTabTitle: "Záznamy ke zpracování", // popisek tabu
                            showIndicator: true, //priznak, zda zobrazit kpi panel
                            title: "Vstupní parametry",
                            fieldChangeDelegate: function (ev, obj) {
                                //Gordic.Eko.Components.runCheckAction(ev.target, this, obj.wizardModel);
                            },
                            //description: "Kopie akcí", // popisek
                            modelData: modelDataFirst,
                            nextActionName: "Změnit stav AZ",
                            nextAction: (model, input) => {
                                modelDataFirst = model;
                                var serviceContent = gcontent.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab"); // serverový objekt
                                return serviceContent
                                    .call("LzeSetStavAZAkce", {
                                    doklady: input, //input.map(function (d) { return { rok: d.rok, ico: d.ico, cislo: d.cislo } }),
                                    data: { new_stav_az: modelDataFirst.new_stav_az }
                                }).then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            //menuGridBar: // dalsi akce v gridu - podle metodiky lze zde mit detail dokladu atd. atd.
                            //    [
                            //        {
                            //            favorite: true,
                            //            action: new GAction({
                            //                // detail
                            //                name: "actDetail",
                            //                caption: "Detail",
                            //                icon: "gi-detail",
                            //                run: function (ev, ctx) {
                            //                    var cnt1 = this;
                            //                    let grid = $(ctx.grid);
                            //                    var vybranyRadek_hro: Gordic.Ada.Interface.GAkceDto = grid.ggrid("activeRow");  // načtení přes vyhledání gridu (přes class)
                            //                    if (vybranyRadek_hro.cislo != "") {                                                                  // existuje vybraný řádek
                            //                        var detailwindow = $.content(ev.target).navigate(
                            //                            ["Gordic.Ada.WebClient.GDetailAkce", { gridRemoteControl: new Gordic.Components.GridRC(grid) }],
                            //                            {
                            //                                id: 'DetailDokladu2#',
                            //                                cislo: vybranyRadek_hro.cislo,
                            //                                ixs_cia: vybranyRadek_hro.ixs_cia,
                            //                                RezimProvozu: that.globals.RezimProvozu,
                            //                                Editable: that.globals.Param_Akce_Editace_TP,
                            //                                NovaAkce: false
                            //                            });
                            //                        var windowContent = $.content(detailwindow);
                            //                        windowContent.on("close", function (ctx) {
                            //                        });
                            //                        windowContent.on("ada_saveakce", function (ctx) {
                            //                            var filterDto: Gordic.Ada.Interface.GSeznamAdaFilterDto = {};
                            //                            //filterDto.cislo = { start: vybranyRadek_hro.cislo!.toString(), end: vybranyRadek_hro.cislo!.toString() };
                            //                            filterDto.cislo = { start: ctx.data.cislo!.toString(), end: ctx.data.cislo!.toString() };
                            //                            // aktualizace gridů
                            //                            // nejprve hlavni seznam aplikace
                            //                            that.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                            //                            // a pak seznam z průvodce
                            //                            that.isl.Akce.list({ filters: filterDto, fragments: ["Permissions", "*"] })
                            //                                .getData()
                            //                                .done(function (data) {
                            //                                    cnt1.view_data = grid.ggrid("getView");
                            //                                    $.extend(true, data[0], { wiz_check: true });
                            //                                    cnt1.view_data.updateData(data, "update");
                            //                                });
                            //                        });
                            //                    }
                            //                }
                            //            })
                            //        },
                            //    ],
                        },
                        secondStep: {
                            form: l_oForm, // prefab formu
                            gridTabTitle: "Záznamy ke zpracování", // popisek tabu
                            showIndicator: true, //priznak, zda zobrazit kpi panel
                            title: "Změna stavu AZ",
                            fieldChangeDelegate: function (ev, obj) {
                                //Gordic.Eko.Components.runCheckAction(ev.target, this, obj.wizardModel);
                            },
                            //description: "Kopie akcí", // popisek
                            //modelData: modelDataFirst,
                            modelData: () => {
                                return {
                                    new_stav_az: modelDataFirst.new_stav_az
                                };
                            },
                            nextActionName: "Změnit stav AZ",
                            checkAction: (model, input) => {
                                model = modelDataFirst;
                                var serviceContent = that.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab"); // serverový objekt
                                return serviceContent
                                    .call("LzeSetStavAZAkce", {
                                    doklady: input, //input.map(function (d) { return { rok: d.rok, ico: d.ico, cislo: d.cislo } }),
                                    data: { new_stav_az: modelDataFirst.new_stav_az }
                                }).then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            nextAction: (model, input) => {
                                modelDataFirst = model;
                                var serviceContent = that.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab"); // serverový objekt
                                return serviceContent
                                    .call("SetStavAZAkce", {
                                    doklady: input, //input.map(function (d) { return { rok: d.rok, ico: d.ico, cislo: d.cislo } }),
                                    data: { new_stav_az: modelDataFirst.new_stav_az }
                                }).then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            menuGridBar: // dalsi akce v gridu - podle metodiky lze zde mit detail dokladu atd. atd.
                            [
                            //        {
                            //            favorite: true,
                            //            action: new GAction({
                            //                // detail
                            //                name: "actDetail",
                            //                caption: "Detail",
                            //                icon: "gi-detail",
                            //                run: function (ev, ctx) {
                            //                    var cnt1 = this;
                            //                    let grid = $(ctx.grid);
                            //                    var vybranyRadek_hro: Gordic.Ada.Interface.GAkceDto = grid.ggrid("activeRow");  // načtení přes vyhledání gridu (přes class)
                            //                    if (vybranyRadek_hro.cislo != "") {                                                                  // existuje vybraný řádek
                            //                        //var detailwindow = that.navigate(
                            //                        var detailwindow = $.content(ev.target).navigate(
                            //                            ["Gordic.Ada.WebClient.GDetailAkce", { gridRemoteControl: new Gordic.Components.GridRC(grid) }],
                            //                            {
                            //                                id: 'DetailDokladu2#',
                            //                                cislo: vybranyRadek_hro.cislo,
                            //                                ixs_cia: vybranyRadek_hro.ixs_cia,
                            //                                RezimProvozu: that.globals.RezimProvozu,
                            //                                Editable: that.globals.Param_Akce_Editace_TP,
                            //                                NovaAkce: false
                            //                            });
                            //                        var windowContent = $.content(detailwindow);
                            //                        windowContent.on("close", function (ctx) {
                            //                        });
                            //                        windowContent.on("ada_saveakce", function (ctx) {
                            //                            var filterDto: Gordic.Ada.Interface.GSeznamAdaFilterDto = {};
                            //                            //filterDto.cislo = { start: vybranyRadek_hro.cislo!.toString(), end: vybranyRadek_hro.cislo!.toString() };
                            //                            filterDto.cislo = { start: ctx.data.cislo!.toString(), end: ctx.data.cislo!.toString() };
                            //                            // aktualizace gridů
                            //                            // nejprve hlavni seznam aplikace
                            //                            that.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                            //                            // a pak seznam z průvodce
                            //                            //that.isl.Akce.list(
                            //                            //    rq => {
                            //                            //        return { filters: filterDto, fragments: ["Permissions", "*"] };
                            //                            //    })
                            //                            that.isl.Akce.list({ filters: filterDto, fragments: ["Permissions", "*"] })
                            //                                .getData()
                            //                                .done(function (data) {
                            //                                    cnt1.view_data = grid.ggrid("getView");
                            //                                    cnt1.view_data.updateData(data, "update");
                            //                                });
                            //                        });
                            //                    }
                            //                }
                            //            })
                            //        },
                            //{
                            //    favorite: true,
                            //    action: new GAction({
                            //        // detail
                            //        name: "actTisk",
                            //        caption: "Tisk",
                            //        run: function (ev, ctx) {
                            //        }
                            //    })
                            //}
                            ],
                        },
                        lastStep: // posledni krok
                        {
                            // fáze 2 - zobrazení výsledku storna
                            title: "Výsledek",
                            gridTabTitle: "Zpracované záznamy",
                            form: l_oForm,
                            modelData: () => {
                                return {
                                    new_stav_az: modelDataFirst.new_stav_az
                                };
                            },
                        },
                        data: vybraneRadky, // data
                        completeDelegate: (view) => {
                            //debugger;
                            //that.view_ISL.requestData({}, { updateMode: "update" });
                            var that = this;
                            var filterDto = {};
                            filterDto.aktivita = { o: "IN", v: [100, 300] };
                            if (that.model_filtr.role == 0) {
                                filterDto.ixs_fun_akt = { o: "=", v: $.content("main").IxsFunAkt };
                                filterDto.ixs_fun_az = null;
                                filterDto.komp = null;
                            }
                            ;
                            if (that.model_filtr.role == 1) {
                                filterDto.ixs_fun_akt = null;
                                filterDto.ixs_fun_az = null;
                                filterDto.komp = { o: "=", v: $.content("main").IxsFunAkt };
                            }
                            ;
                            if (that.model_filtr.role == 2) {
                                filterDto.ixs_fun_akt = null;
                                filterDto.ixs_fun_az = { o: "=", v: $.content("main").IxsFunAkt };
                                filterDto.komp = null;
                            }
                            ;
                            if (that.model_filtr && that.model_filtr.stav_az != null) {
                                filterDto.stav_az = { o: "=", v: that.model_filtr.stav_az };
                            }
                            pohled.requestData({ filters: filterDto });
                        }
                    }, { title: "Změna stavu AZ" });
                    defClose.resolve(pohled.getDataRows());
                    return defClose.promise();
                }
            };
            GSeznamSpravaStavuAZ = __decorate([
                gcontent
            ], GSeznamSpravaStavuAZ);
            WebClient.GSeznamSpravaStavuAZ = GSeznamSpravaStavuAZ;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVNwcmF2YVN0YXZ1QVouanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbIlNjcmlwdHMvR1Nlem5hbVNwcmF2YVN0YXZ1QVoudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0FnK0JmO0FBaCtCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FnK0JuQjtJQWgrQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWcrQjdCO1FBaCtCb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxPQUFBLFlBQVk7Z0JBQXREOztvQkFhWSxnQkFBVyxHQUFHLEVBQUUsSUFBSSxFQUFHLENBQUMsRUFBRSxPQUFPLEVBQUcsQ0FBQyxFQUFFLENBQUM7b0JBRWhELFVBQUssR0FBRyxpQkFBaUIsQ0FBQztvQkFDMUIsV0FBTSxHQUFHLG1CQUFtQixDQUFDLENBQUMsK0JBQStCO2dCQTI4QmpFLENBQUM7Z0JBejhCRyxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFOUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUViLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztvQkFFZixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFbEksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xC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TyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7d0JBQy9DLENBQUM7cUJBRUosRUFDRCxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUE7b0JBRTVCLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7b0JBRXZDLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM5QixDQUFDO2FBQ0osQ0FBQTtZQTM5Qlksb0JBQW9CO2dCQURoQyxRQUFRO2VBQ0ksb0JBQW9CLENBMjlCaEM7WUEzOUJZLDhCQUFvQix1QkEyOUJoQyxDQUFBO1FBQ0wsQ0FBQyxFQWgrQm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWcrQjdCO0lBQUQsQ0FBQyxFQWgrQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWcrQm5CO0FBQUQsQ0FBQyxFQWgrQlMsTUFBTSxLQUFOLE1BQU0sUUFnK0JmIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5BZGEuV2ViQ2xpZW50LkdTZXpuYW1TcHJhdmFTdGF2dUFaLmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR0FrY2VVY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQWRhLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1TcHJhdmFTdGF2dUFaIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU2V6bmFtQWRhRmlsdGVyRHRvO1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZEZvcm1hdFNlem5hbTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZUR0bz47XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZ2xvYmFsczogR29yZGljLkFkYS5XZWJDbGllbnQuRFRPLkdBZGFHbG9iYWxzRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIGZpbHRlckZvcm06IEpRdWVyeTtcclxuICAgICAgICBwcml2YXRlIG1haW5UYWJsZTogSlF1ZXJ5O1xyXG5cclxuICAgICAgICBwcml2YXRlIG1vZGVsX2ZpbHRyID0geyByb2xlIDogMCwgc3Rhdl9heiA6IDAgfTtcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcIlNwcsOhdmEgc3RhdnUgQVpcIjtcclxuICAgICAgICB0YXNrSWQgPSBcImFjdFNlem5hbVNwcmF2YUFaXCI7IC8vIG96bmHEjWVuw60gcG9sb8W+a3kgdiB0YXNrTGlzdHVcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciAkdGFiID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG5cclxuICAgICAgICAgICAgJHRhYi5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcInNldHVwXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RabWVuaXRTdGF2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJabcSbbml0IHN0YXZcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBlbmNpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICggdGhhdC5nbG9iYWxzLlBhcmFtX1Vsb2hhX1NwcmF2YV9BWiA9PT0gSW50ZXJmYWNlLlByaXN0dXBLVWxvemVFbnVtLkFub19FZGl0YWNlICksIFxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5tb2RlbF9maWx0clxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY250Lm5hc3Rhdl9zdGF2X2F6KHRoYXQubW9kZWxfZmlsdHIucm9sZSwgdGhhdC5tb2RlbF9maWx0ci5zdGF2X2F6ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRldGFpbF9yYWRrdShmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdEdyaWREb3VibGVDbGljazoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGF0LmRldGFpbF9yYWRrdSh0aGF0Lmdsb2JhbHMuUGFyYW1fQWtjZV9FZGl0YWNlX1RQLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kZXRhaWxfcmFka3UoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdERldGFpbCpcIiwgXCJhY3RabWVuaXRTdGF2KlwiXSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJLb21wbGV0bsOtIGZpbHRyXCIsIGxheW91dERlc2NyaXB0b3I6IFwidy1MLTkgdy1NLTkgdy1TLTEyXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBmaWx0ZXJGb3JtRGVmXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJvbGVcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5yb2xlPXZhbHVlLmlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGlkOiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChvYmouZmxhZ3MuaXNLb250cm9sbmlEaXYgfHwgb2JqLmZsYWdzLm5vQ2hhbmdlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouZmxhZ3Mubm9DaGFuZ2UpIHJldHVybjtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlICE9IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBha3Rfcm9sZV9pID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5pdF92YWx1ZV9pID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0X3JvbGVfaSA9IG9iai52YWx1ZT8uaWQgPz8gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvbGVfc2VydmVyRmlsdHJfaSA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFrdF9yb2xlX2kgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0cl9pID0gWzAsIDIsIDMsIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdF92YWx1ZV9pID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFrdF9yb2xlX2kgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0cl9pID0gWzIsIDMsIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdF92YWx1ZV9pID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFrdF9yb2xlX2kgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0cl9pID0gWzAsIDIsIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdF92YWx1ZV9pID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJzdGF2X2F6X2ZcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiLCB7IHN0YXZfYXo6IHBvbGVfc2VydmVyRmlsdHJfaSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJzdGF2X2F6X2ZcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBzdGF2X2F6OiBpbml0X3ZhbHVlX2kgfSwge3ZhbGlkIDogZmFsc2V9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8vIGF1dG9tYXRpY2vDqSBuYcSNdGVuw60gcG8gem3Em27EmyBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IGR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZmlsdGVyRm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZmlsdGVyRm9ybSEuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIiwgZHRvKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuRGF0YS5WaWV3KFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwiWnByYWNvdmF0ZWxcIiwgaWQ6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwiS29tcGV0ZW50XCIsIGlkOiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcIkZpbmFuxI1uw60ga29tcGV0ZW50IEFaXCIsIGlkOiAyIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXSwgeyBrZXk6IFwiaWRcIiB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmaWx0ZXJGb3JtRGVmXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zcnZjc2F6KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfYXpfZlwiLCBtb2RlbDogXCJtb2RlbC5zdGF2X2F6PXZhbHVlLnN0YXZfYXpcIiwgbXVsdGk6IGZhbHNlLCBsaXN0OiB0cnVlLCBpdGVtV2lkdGg6IFwiXCIsIGRpc2FibGVkOiBmYWxzZSwgaW5pdGlhbFZhbHVlOiB7IHN0YXZfYXo6IDAgfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhdXRvbWF0aWNrw6kgbmHEjXRlbsOtIHBvIHptxJtuxJsgaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmZsYWdzLmlzS29udHJvbG5pRGl2IHx8IG9iai5mbGFncy5ub0NoYW5nZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyRm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlckZvcm0hLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIsIGR0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9maWx0ZXJGb3JtRGVmXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRSb3coXCJTdGF2IEFaXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3J2Y3NheigpLCB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcInN0YXZfYXpcIiwgbW9kZWw6IFwibW9kZWwuc3Rhdl9hej12YWx1ZS5zdGF2X2F6XCIsIG11bHRpOiB0cnVlLCBsaXN0OiB0cnVlLCBpdGVtV2lkdGg6IFwiXCJcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhhdC5maWx0ZXJGb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKG1haW5Gb3JtKVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBwcm8gRUtPXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGVVc2VyU2V0dGluZ3M6IFtGaWx0ZXJWaWV3TW9kZS5TaW1wbGVdLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wb090ZXZyZW5pT3RldnJpdFBhbmVsUG9kbWluZWs6IGZhbHNlLCAgICAgLy8gZGVmYXVsdCBwcm8gdcW+aXZhdGVsc2vDqSBuYXN0YXZlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgcG9WeWhsZWRhbmlab2JyYXppdDogXCJWeWhsZWRhbmVQb2RtaW5reVZCYWRnZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDaG9zZUZpbHRlcjogZmFsc2UsICAgICAgICAvLyBBdXRvbWF0aWNrw6kgdnlobGVkw6Fuw60gcG8gem3Em27EmyB1bG/FvmVuw6lob1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyRmlsdGVyQnV0dG9uVmlzaWJsZTogXCJOZXZlclZpc2libGVcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxBY3Rpb25Bc0NoZWNrYm94OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL2lkU2ltcGxlTW9kZTpcImlkU2ltcGxlTW9kZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbZmlsdGVyRm9ybURlZl0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogYnVkZSBuxJtqYWvDqSBsZXDFocOtIHVrbMOhZGFjw60gb2tubyBuZWJvIGJ1ZHUgbXVzZXQgdWTEm2xhdCBzdm9qZSBhIG5hc3Rhdml0IGhvIGRvIHNhdmVPcHRpb25zRm9ybT9cclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZXM6IFtcInJvbGVcIiwgXCJzdGF2X2F6XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzFcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB6xa9zdGFuZSB0b2hsZSB0w6ltYSBuZWJvIGJ1ZGUgcHJvIExLIGppbsOpIG5lxb4gcHJvIFRLP1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwiYWRhX3B0bV9hZGFiYXMyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHb3JkaWMuR2luLkZpbHRlclN0b3JhZ2VTZXJ2aWNlLlN0b3JlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2F2ZU9wdGlvbnNGb3JtOiBcImVrb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0cmljdFN0b3BBdXRvTG9hZDogdHJ1ZSwgICAgICAgICAgICAgICAvLyBTdHJpa3RuxJsgemFrw6HFvmUgYXV0b21hdGlja8OpIG5hxI10ZW7DrSBobmVkIHBvIG90ZXbFmWVuw60gc2V6bmFtdSwgb2Jsw61iZW7DvSBmaWx0ciBzZSBwb3V6ZSBwxZllZHBsbsOtLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRleHRJdGVtVGVtcGxhdGU6IFwie2Rlc2NyaXB0aW9ufVwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKGV2ZW50LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIGRhdCBwb2RsZSBmaWx0csWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxfZmlsdHIgPSBvYmouZmlsdGVyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxfZmlsdHIgJiYgdGhhdC5tb2RlbF9maWx0ci5yb2xlICE9IG51bGwgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyRHRvOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU2V6bmFtQWRhRmlsdGVyRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uYWt0aXZpdGEgPSB7IG86IFwiSU5cIiwgdjogWzEwMCwgMzAwXSB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsX2ZpbHRyLnJvbGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5peHNfZnVuX2FrdCA9IHsgbzogXCI9XCIsIHY6ICgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkuSXhzRnVuQWt0IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLml4c19mdW5fYXogPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5rb21wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxfZmlsdHIucm9sZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLml4c19mdW5fYWt0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2Z1bl9heiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLmtvbXAgPSB7IG86IFwiPVwiLCB2OiAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tb2RlbF9maWx0ci5yb2xlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2Z1bl9ha3QgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5peHNfZnVuX2F6ID0geyBvOiBcIj1cIiwgdjogKCQuY29udGVudChcIm1haW5cIikgYXMgYW55KS5JeHNGdW5Ba3QgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8ua29tcCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsX2ZpbHRyICYmIHRoYXQubW9kZWxfZmlsdHIuc3Rhdl9heiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLnN0YXZfYXogPSB7IG86IFwiPVwiLCB2OiB0aGF0Lm1vZGVsX2ZpbHRyLnN0YXZfYXogfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJvbGVcIiwgdGhhdC5tb2RlbF9maWx0ci5yb2xlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlsdGVyRHRvXCIsIGZpbHRlckR0byk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC5yZXF1ZXN0RGF0YSh7IGZpbHRlcnM6IGZpbHRlckR0byB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW0gPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZUR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkVmxhc3RuaWN0dmkoY250LmdyaWRGb3JtYXRTZXpuYW0pO1xyXG5cclxuICAgICAgICAgICAgLy9jbnQuZ3JpZEZvcm1hdFNlem5hbVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcIml4c19mdW5fYXpfbmF6ZXZcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGZpZWxkOiBcIml4c19mdW5fYXpfbmF6ZXZcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGNhcHRpb246IFwiRlVOIEFaXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICB3aWR0aDogMjAwXHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9jbnQuZ3JpZEZvcm1hdFNlem5hbVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcIkpzZW1Lb21wZXRlbnRBWlwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZmllbGQ6IFwiSnNlbUtvbXBldGVudEFaXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjYXB0aW9uOiBcIkpzZW1Lb21wZXRlbnRBWlwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZm9ybWF0UHJlc2V0OiBHb3JkaWMuR2xvYmFsLkVudW1zLkdyaWRDb2x1bW5Gb3JtYXRJY29uLmljb24sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgc3dpdGNoIChkYXRhIS5Kc2VtS29tcGV0ZW50QVopIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgY2FzZSB0cnVlOiByZXR1cm4geyBpY29uOiBcImdpLXRpY2tcIiwgdGV4dDogXCJKc2VtXCIsIGNhcHRpb246IFwiSnNlbVwiLCB0b29sdGlwOiBcIkpzZW1cIiB9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOiByZXR1cm4geyBpY29uOiBcImZhLWZ3XCIsIHRleHQ6IFwiTmVqc2VtXCIsIGNhcHRpb246IFwiTmVqc2VtXCIsIHRvb2x0aXA6IFwiTmVqc2VtXCIgfTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vY250LmdyaWRGb3JtYXRTZXpuYW1cclxuICAgICAgICAgICAgICAgIC8vLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJzdGF2X2lucFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZmllbGQ6IFwic3Rhdl9pbnBcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiU3RhdiBJUFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZm9ybWF0UHJlc2V0OiBHb3JkaWMuR2xvYmFsLkVudW1zLkdyaWRDb2x1bW5Gb3JtYXRJY29uLmljb24sXHJcbiAgICAgICAgICAgICAgICAvLyAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgc3dpdGNoIChkYXRhIS5zdGF2X2lucCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjYXNlIDE6IHJldHVybiB7IGljb246IFwiZ2ktdGlja1wiLCB0ZXh0OiBcIlNwbG7Em255XCIsIGNhcHRpb246IFwiU3BsbsSbbnlcIiwgdG9vbHRpcDogXCJTcGxuxJtueVwiIH07XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIHsgaWNvbjogXCJmYS1md1wiLCB0ZXh0OiBcIk5lc3BsbsSbbnlcIiwgY2FwdGlvbjogXCJOZXNwbG7Em255XCIsIHRvb2x0aXA6IFwiTmVzcGxuxJtueVwiIH07XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbS5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBcImFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0YXZcIixcclxuICAgICAgICAgICAgICAgIC8vaGlkZGVuOiB0aGlzLmdsb2JhbHMuUGFyYW1fQWtjZV9BdXRTY2h2ID09IEludGVyZmFjZS5UeXBBdXRvbWF0U2NodmFsZW5pTm92YUFrY2VFbnVtLk5lU3Byb2Nlc2VtLFxyXG4gICAgICAgICAgICAgICAgLy8gd2lkdGg6IDI1LFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0UHJlc2V0OiBHb3JkaWMuR2xvYmFsLkVudW1zLkdyaWRDb2x1bW5Gb3JtYXRJY29uLmljb24sXHJcbiAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhLmFrdGl2aXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLkFrdGl2aXRhQWtjZUVudW0uQWt0aXZuaTogcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUtbyBnLXN0YXRlLXN1Y2Nlc3MgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiQWt0aXZuw61cIiwgY2FwdGlvbjogXCJBa3Rpdm7DrVwiLCB0b29sdGlwOiBcIkFrdGl2bsOtXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuQWt0aXZpdGFBa2NlRW51bS5OYXZyaDogcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS13YXJuaW5nIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIk7DoXZyaFwiLCBjYXB0aW9uOiBcIk7DoXZyaFwiLCB0b29sdGlwOiBcIk7DoXZyaFwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLkFrdGl2aXRhQWtjZUVudW0uTmVha3Rpdm5pOiByZXR1cm4geyBpY29uOiBcImZhLXRyYXNoIGctc3RhdGUtZXJyb3IgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiTmVha3Rpdm7DrVwiLCBjYXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgdG9vbHRpcDogXCJOZWFrdGl2bsOtXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuQWt0aXZpdGFBa2NlRW51bS5acnVzZW5hOiByZXR1cm4geyBpY29uOiBcImZhLXRyYXNoIGctc3RhdGUtZXJyb3IgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiU3Rvcm5vdmFuw6FcIiwgY2FwdGlvbjogXCJTdG9ybm92YW7DoVwiLCB0b29sdGlwOiBcIlN0b3Jub3ZhbsOhXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW1cclxuICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfaW5wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwic3Rhdl9pbnBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0YXYgSVBcIixcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRQcmVzZXQ6IEdvcmRpYy5HbG9iYWwuRW51bXMuR3JpZENvbHVtbkZvcm1hdEljb24uaWNvbixcclxuICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YSEuc3Rhdl9pbnApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIHsgaWNvbjogXCJnaS10aWNrXCIsIHRleHQ6IFwiU3BsbsSbbnlcIiwgY2FwdGlvbjogXCJTcGxuxJtueVwiLCB0b29sdGlwOiBcIlNwbG7Em255XCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIHsgaWNvbjogXCJmYS1md1wiLCB0ZXh0OiBcIk5lc3BsbsSbbnlcIiwgY2FwdGlvbjogXCJOZXNwbG7Em255XCIsIHRvb2x0aXA6IFwiTmVzcGxuxJtueVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW0uYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICBmaWVsZDogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdGF2XCIsXHJcbiAgICAgICAgICAgICAgICAvL2hpZGRlbjogdGhpcy5nbG9iYWxzLlBhcmFtX0FrY2VfQXV0U2NodiA9PSBJbnRlcmZhY2UuVHlwQXV0b21hdFNjaHZhbGVuaU5vdmFBa2NlRW51bS5OZVNwcm9jZXNlbSxcclxuICAgICAgICAgICAgICAgIC8vIHdpZHRoOiAyNSxcclxuICAgICAgICAgICAgICAgIGZvcm1hdFByZXNldDogR29yZGljLkdsb2JhbC5FbnVtcy5HcmlkQ29sdW1uRm9ybWF0SWNvbi5pY29uLFxyXG4gICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5ha3Rpdml0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5Ba3Rpdml0YUFrY2VFbnVtLkFrdGl2bmk6IHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlLW8gZy1zdGF0ZS1zdWNjZXNzIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIkFrdGl2bsOtXCIsIGNhcHRpb246IFwiQWt0aXZuw61cIiwgdG9vbHRpcDogXCJBa3Rpdm7DrVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLkFrdGl2aXRhQWtjZUVudW0uTmF2cmg6IHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtd2FybmluZyBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJOw6F2cmhcIiwgY2FwdGlvbjogXCJOw6F2cmhcIiwgdG9vbHRpcDogXCJOw6F2cmhcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5Ba3Rpdml0YUFrY2VFbnVtLk5lYWt0aXZuaTogcmV0dXJuIHsgaWNvbjogXCJmYS10cmFzaCBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIk5lYWt0aXZuw61cIiwgY2FwdGlvbjogXCJOZWFrdGl2bsOtXCIsIHRvb2x0aXA6IFwiTmVha3Rpdm7DrVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLkFrdGl2aXRhQWtjZUVudW0uWnJ1c2VuYTogcmV0dXJuIHsgaWNvbjogXCJmYS10cmFzaCBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIlN0b3Jub3ZhbsOhXCIsIGNhcHRpb246IFwiU3Rvcm5vdmFuw6FcIiwgdG9vbHRpcDogXCJTdG9ybm92YW7DoVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbS5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfcGxhX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLbmloYVwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbS5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwb2NldF9wcmlsb2hcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiI1BcIixcclxuICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogXCJQb8SNZXQgbmF2w6F6YW7DvWNoIHDFmcOtbG9oXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1jZW50ZXJcIixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA0MFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbS5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwb2NldF9rb21wZXRlbnR1XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIiNLXCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwVGVtcGxhdGU6IFwiUG/EjWV0IG5hdsOhemFuw71jaCBrb21wZXRlbnTFr1wiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNDBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbS5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwb2NldF9pc3BcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiI0lQXCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwVGVtcGxhdGU6IFwiUG/EjWV0IElQXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1jZW50ZXJcIixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA0MFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaXNsb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGNudC5nbG9iYWxzLkJBUl9UeXBfSW5zdCA9PSBJbnRlcmZhY2UuU3J2VHlwSW50YWxhY2VFbnVtLk1PID8gXCLEjMOtc2xvIHBvbC4gcGzDoW51XCIgOiBcIsSMw61zbG8gYWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGNudC5nbG9iYWxzLkJBUl9UeXBfSW5zdCA9PSBJbnRlcmZhY2UuU3J2VHlwSW50YWxhY2VFbnVtLk1PID8gXCJOw6F6ZXYgcG9sLiBwbMOhbnVcIiA6IFwiTsOhemV2IGFrY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3JlYWxfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwic3Rhdl9yZWFsX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3RhdiByZWFsaXphY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRoaXMuZ2xvYmFscy5QYXJhbV9Ba2NlX0F1dFNjaHYgIT0gSW50ZXJmYWNlLlR5cEF1dG9tYXRTY2h2YWxlbmlOb3ZhQWtjZUVudW0uTmVTcHJvY2VzZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY250Lmdsb2JhbHMuQkFSX1R5cF9JbnN0ID09IEludGVyZmFjZS5TcnZUeXBJbnRhbGFjZUVudW0uTU8pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X2F6X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogXCJzdGF2X2F6X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0YXYgQVpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gdG90byBqZSBwbyBzdGFydSAtIGtkZSBieWxvIGplbiBhbm8vbmVcclxuICAgICAgICAgICAgICAgIGNudC5ncmlkRm9ybWF0U2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaXpfYXpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwicHJpel9helwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0YXYgQVpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0UHJlc2V0OiBHb3JkaWMuR2xvYmFsLkVudW1zLkdyaWRDb2x1bW5Gb3JtYXRJY29uLmljb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YSEucHJpel9heikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIHsgaWNvbjogXCJnaS10aWNrXCIsIHRleHQ6IFwiWmFiZXpwZcSNZW5vXCIsIGNhcHRpb246IFwiWmFiZXpwZcSNZW5vXCIsIHRvb2x0aXA6IFwiWmFiZXpwZcSNZW5vXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiB7IGljb246IFwiZmEtZndcIiwgdGV4dDogXCJOZXphYmV6cGXEjWVub1wiLCBjYXB0aW9uOiBcIk5lemFiZXpwZcSNZW5vXCIsIHRvb2x0aXA6IFwiTmV6YWJlenBlxI1lbm9cIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNudC5ncmlkRm9ybWF0U2V6bmFtXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfYWtjZV9zdW1fdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwidHlwX2FrY2Vfc3VtX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVHlwIGFrY2VcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcInR5cF9ha2NlX3N1bVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZmllbGQ6IFwidHlwX2FrY2Vfc3VtXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIlR5cCBha2NlIFNVTVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgd2lkdGg6IDAsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBoaWRkZW46IHRydWVcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpc19yZWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSZWFsaXrDoXRvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwIC8vLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGNudC5nbG9iYWxzLkJBUl9UeXBfSW5zdCA9PSBJbnRlcmZhY2UuU3J2VHlwSW50YWxhY2VFbnVtLk1PID8gXCLEjFBQXCIgOiB0aGlzLmdsb2JhbHMuVGl0dWxla19Oa3MhLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAgLy8sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0X25rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGNudC5nbG9iYWxzLkJBUl9UeXBfSW5zdCA9PSBJbnRlcmZhY2UuU3J2VHlwSW50YWxhY2VFbnVtLk1PID8gXCJOw6F6ZXYgxIxQUFwiIDogXCJOw6F6ZXYgXCIgKyB0aGlzLmdsb2JhbHMuVGl0dWxla19Oa3MhLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwIC8vLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEZpZWxkczogW1wiKmRhdHVtX3ptZW55X2ZpbHRyYWNlXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGF0dW0gcG9zbGVkbsOtIHptxJtueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInptZW51X3Byb3ZfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb3NsZWRuw60gem3Em251IHByb3ZlZGxcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCAvLyxcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0dW1fem1lbnlfZmlsdHJhY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIHptxJtueSBmaWx0cmFjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZpbl9vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcImZpbl9vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRmluLiBvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmluX2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwiZmluX2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJGaW4uIGRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyZWFsX29kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwicmVhbF9vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUmVhbC4gb2RcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJlYWxfZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogXCJyZWFsX2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSZWFsLiBkb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl9ha3RfbmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpwcmFjb3ZhdGVsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY250Lm1haW5UYWJsZSA9ICQoXCI8ZGl2IGNsYXNzPSdqcy1TZXpuYW1Eb2tsYWR1QVonPlwiKVxyXG4gICAgICAgICAgICAgICAgLy8uY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKG1haW5Gb3JtKVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cgPSBjbnQubWFpblRhYmxlLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5yb3cgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC50cmlnZ2VyKFwiYWRhc3ViZ3JpZHJvd3NlbGVjdGVkXCIsIHsgYWdlbmRhOiA0MCwgZGF0YTogdGhhdC5yb3cgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBjbnQuYWN0aW9ucy5hY3RHcmlkRG91YmxlQ2xpY2ssXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcnVuKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5yb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IEdvcmRpYy5BZGEuV2ViQ2xpZW50LkFkYUZ1bmN0aW9uLnpqaXN0aV9zbG91cGNlX3NlYXJjaChjbnQuZ3JpZEZvcm1hdFNlem5hbSksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogY250LmdyaWRGb3JtYXRTZXpuYW0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IGNudC56amlzdGlfc2xvdXBjZShjbnQuZ3JpZEZvcm1hdFNlem5hbSlcclxuICAgICAgICAgICAgICAgICAgICB9LCBcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwiWmplZG5vZHXFoWVuw71cIiwgY29sdW1uTGlzdDogXCJ6cHJhY292YXRlbCwgYWt0aXZpdGEsIGNpc2xvLCBuYXpldiwgY18yXzNfN184XzIzXzI1LCBjXzZfMTgsIGNfMCwgY196Ynl2YV9jZXJwYXQsIGNlcnBhbm9fcHJvY1wiLCBfbG9ja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCLDmnBsbsO9XCIsIGNvbHVtbkxpc3Q6IHRoaXMuemppc3RpX3Nsb3VwY2UoY250LmdyaWRGb3JtYXRTZXpuYW0pLCBfbG9ja2VkOiB0cnVlIH0gLy9ncmlkRm9ybWF0U2V6bmFtLmNvbHVtbnMuZmlsdGVyKChjKSA9PiBjLm5hbWUgIT0gXCJrbmloYVwiKS5qb2luKCkgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGZpbHRlckR0bzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1Nlem5hbUFkYUZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgICAgICBmaWx0ZXJEdG8uc3Rhdl9heiA9IHsgbzogXCI9XCIsIHY6IHRoYXQubW9kZWxfZmlsdHIuc3Rhdl9heiB9O1xyXG4gICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2Z1bl9ha3QgPSB7IG86IFwiPVwiLCB2OiAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCB9O1xyXG4gICAgICAgICAgICBmaWx0ZXJEdG8uYWt0aXZpdGEgPSB7IG86IFwiSU5cIiwgdjogWzEwMCwgMzAwXSB9O1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuQWtjZS5saXN0KHsgZmlsdGVyczogZmlsdGVyRHRvLCBmcmFnbWVudHM6IFtcIlBlcm1pc3Npb25zXCIsIFwiKlwiXSB9KSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjbnQubWFpblRhYmxlLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdfSVNMKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB6amlzdGlfc2xvdXBjZShnZikge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2YuY29sdW1ucy5maWx0ZXIoZSA9PiBlLmhpZGRlbiAhPSB0cnVlKS5tYXAoZSA9PiBlLm5hbWUpLmpvaW4oJywnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRldGFpbF9yYWRrdShlZGl0YWJsZSwgbm92YWFrY2UpIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBsX2Npc2xvOiBTdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgbF9peHNfY2lhOiBTdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZ5YnJhbmVSYWRreTogR29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG87XHJcbiAgICAgICAgICAgIHZhciBtYW1fZGV0YWlsOiBib29sZWFuO1xyXG5cclxuICAgICAgICAgICAgLy8gdnlicmFuZVJhZGt5ID0gY250LmZpbmQoXCIuanMtU2V6bmFtRG9rbGFkdUFaXCIpLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpOyAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBwxZllcyB2eWhsZWTDoW7DrSBncmlkdSAocMWZZXMgY2xhc3MpXHJcbiAgICAgICAgICAgIC8vaWYgKHZ5YnJhbmVSYWRreS5sZW5ndGggPT09IDEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSB2eWJyYW7DvSB6w6F6bmFtXHJcbiAgICAgICAgICAgIGlmIChub3ZhYWtjZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB2eWJyYW5lUmFka3kgPSB7fTtcclxuICAgICAgICAgICAgICAgIHZ5YnJhbmVSYWRreS5jaXNsbyA9IGNudC5nbG9iYWxzLlRlMV9Nc2tfTnVsYTtcclxuICAgICAgICAgICAgICAgIHZ5YnJhbmVSYWRreS5peHNfY2lhID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHZ5YnJhbmVSYWRreS5ha3Rpdml0YSA9IEludGVyZmFjZS5Ba3Rpdml0YUFrY2VFbnVtLkFrdGl2bmk7XHJcbiAgICAgICAgICAgICAgICBtYW1fZGV0YWlsID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdnlicmFuZVJhZGt5X21ldGE7XHJcblxyXG4gICAgICAgICAgICAgICAgdnlicmFuZVJhZGt5X21ldGEgPSBjbnQuZmluZChcIi5qcy1TZXpuYW1Eb2tsYWR1QVpcIikuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgdHJ1ZSk7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIHDFmWVzIHZ5aGxlZMOhbsOtIGdyaWR1IChwxZllcyBjbGFzcylcclxuICAgICAgICAgICAgICAgIHZ5YnJhbmVSYWRreSA9IHZ5YnJhbmVSYWRreV9tZXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICBtYW1fZGV0YWlsID0gKHZ5YnJhbmVSYWRreV9tZXRhICYmICF2eWJyYW5lUmFka3lfbWV0YS5faXNWaXJ0dWFsICYmIHZ5YnJhbmVSYWRreSAmJiAodnlicmFuZVJhZGt5LmNpc2xvICE9PSB1bmRlZmluZWQpICYmICh2eWJyYW5lUmFka3kuY2lzbG8gIT09IFwiXCIpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1hbV9kZXRhaWwpIHtcclxuICAgICAgICAgICAgICAgIGxfY2lzbG8gPSB2eWJyYW5lUmFka3kuY2lzbG8hO1xyXG4gICAgICAgICAgICAgICAgbF9peHNfY2lhID0gdnlicmFuZVJhZGt5Lml4c19jaWEhO1xyXG4gICAgICAgICAgICAgICAgLy8gZWRpdGFibGUgPSBlZGl0YWJsZSAmJiB2eWJyYW5lUmFka3kuYWt0aXZpdGEgPT0gSW50ZXJmYWNlLkFrdGl2aXRhQWtjZUVudW0uQWt0aXZuaTtcclxuICAgICAgICAgICAgICAgIGVkaXRhYmxlID0gZWRpdGFibGU7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGdyaWRSQyA9IG5ldyBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkMoY250Lm1haW5UYWJsZSk7IC8vcG9oeWIgcG8gZ3JpZHVcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZGV0YWlsd2luZG93ID0gY250Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdEZXRhaWxBa2NlXCIsIHsgZ3JpZFJlbW90ZUNvbnRyb2w6IG5vdmFha2NlID09IGZhbHNlID8gZ3JpZFJDIDogbnVsbCwgZ3BjOiBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGMoY250LmdwYywgdnlicmFuZVJhZGt5Lml4c19wbGEhKSB9XSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnRGV0YWlsRG9rbGFkdSMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXNsbzogbF9jaXNsbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2NpYTogbF9peHNfY2lhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXppbVByb3ZvenU6IHRoaXMuZ2xvYmFscy5SZXppbVByb3ZvenUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVkaXRhYmxlOiBlZGl0YWJsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgTm92YUFrY2U6IG5vdmFha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdpbmRvd0NvbnRlbnQgPSAkLmNvbnRlbnQoZGV0YWlsd2luZG93KTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3dDb250ZW50Lm9uKFwiYWRhX3NhdmVha2NlXCIsIGZ1bmN0aW9uIChyZXRWYWwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlckR0bzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1Nlem5hbUFkYUZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZmlsdGVyRHRvLmNpc2xvID0geyBzdGFydDogbF9jaXNsby50b1N0cmluZygpLnRyaW0oKSwgZW5kOiBsX2Npc2xvLnRvU3RyaW5nKCkudHJpbSgpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jbnQudmlld19JU0wucmVxdWVzdERhdGEoeyBmaWx0ZXJzOiBmaWx0ZXJEdG8gfSwgeyB1cGRhdGVNb2RlOiBcInVwZGF0ZVwiIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uY2lzbG8gPSB7IHN0YXJ0OiByZXRWYWwuZGF0YS5jaXNsby50b1N0cmluZygpLnRyaW0oKSwgZW5kOiByZXRWYWwuZGF0YS5jaXNsby50b1N0cmluZygpLnRyaW0oKSB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGNudC52aWV3X0lTTC5yZXF1ZXN0RGF0YSh7IGZpbHRlcnM6IGZpbHRlckR0byB9LCB7IHVwZGF0ZU1vZGU6IFwidXBkYXRlXCIgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgd2luZG93Q29udGVudC5vbihcImFkYV9zYXZlYWtjZV9zY2h2YWxlbmlcIiwgZnVuY3Rpb24gKHJldFZhbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdnlicmFuZVJhZGt5X21ldGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdnlicmFuZVJhZGt5X21ldGEgPSBjbnQuZmluZChcIi5qcy1TZXpuYW1Eb2tsYWR1QVpcIikuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgdHJ1ZSk7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIHDFmWVzIHZ5aGxlZMOhbsOtIGdyaWR1IChwxZllcyBjbGFzcylcclxuICAgICAgICAgICAgICAgICAgICB2eWJyYW5lUmFka3lfbWV0YS5kYXRhLmNpc2xvID0gcmV0VmFsLmRhdGFbMF0uY2lzbG87XHJcbiAgICAgICAgICAgICAgICAgICAgdnlicmFuZVJhZGt5X21ldGEua2V5ID0gcmV0VmFsLmRhdGFbMF0ucm9rICsgcmV0VmFsLmRhdGFbMF0uaWNvICsgcmV0VmFsLmRhdGFbMF0uY2lzbG8gKyByZXRWYWwuZGF0YVswXS5peHNfY2lhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyRHRvOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU2V6bmFtQWRhRmlsdGVyRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLmNpc2xvID0geyBzdGFydDogcmV0VmFsLmRhdGFbMF0uY2lzbG8sIGVuZDogcmV0VmFsLmRhdGFbMF0uY2lzbG8gfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY250LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogZmlsdGVyRHRvIH0sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3dDb250ZW50Lm9uKFwiYWRhX3NhdmVha2NlX3NldF9zdGF2X3JlYWxcIiwgZnVuY3Rpb24gKHJldFZhbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyRHRvOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU2V6bmFtQWRhRmlsdGVyRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLmNpc2xvID0geyBzdGFydDogcmV0VmFsLmRhdGFbMF0uY2lzbG8sIGVuZDogcmV0VmFsLmRhdGFbMF0uY2lzbG8gfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY250LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogZmlsdGVyRHRvIH0sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3dDb250ZW50Lm9uKFwiYWRhX3NhdmVha2NlX3NldF9zdGF2X2F6XCIsIGZ1bmN0aW9uIChyZXRWYWwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlckR0bzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1Nlem5hbUFkYUZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5jaXNsbyA9IHsgc3RhcnQ6IHJldFZhbC5kYXRhWzBdLmNpc2xvLCBlbmQ6IHJldFZhbC5kYXRhWzBdLmNpc2xvIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNudC52aWV3X0lTTC5yZXF1ZXN0RGF0YSh7IGZpbHRlcnM6IGZpbHRlckR0byB9LCB7IHVwZGF0ZU1vZGU6IFwidXBkYXRlXCIgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3dDb250ZW50LmVsZW1lbnQub24oJ2NvbnRlbnRjbG9zZWQnLCAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNudC5tYWluVGFibGUuZ2dyaWQoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICB9KTsgLy8gcMWZaSB6YXbFmWVuw60gZGV0YWlsdSBzZSBuYXN0YXbDrSBmb2N1cyBuYSBncmlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBuYXN0YXZfc3Rhdl9heihha3Rfcm9sZTogbnVtYmVyLCBha3Rfc3RhdjogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHZ5YnJhbmVSYWRreTogR29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG9bXSA9IHRoYXQuZmluZChcIi5qcy1TZXpuYW1Eb2tsYWR1QVpcIikuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7ICAvLyBuYcSNdGVuw60gcMWZZXMgdnlobGVkw6Fuw60gZ3JpZHUgKHDFmWVzIGNsYXNzKVxyXG4gICAgICAgICAgICBpZiAodnlicmFuZVJhZGt5Lmxlbmd0aCA+IDApIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBleGlzdHVqZSB2eWJyYW7DvSDFmcOhZGVrXHJcbiAgICAgICAgICAgICAgICB0aGF0LnptZW5hX3N0YXZfYXpfYWtjZV9ocm9tX0FaKHRoYXQsIHRoYXQudmlld19JU0wsIHRoYXQuZ2xvYmFscywgdnlicmFuZVJhZGt5LCBha3Rfcm9sZSwgYWt0X3N0YXYpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHptZW5hX3N0YXZfYXpfYWtjZV9ocm9tX0FaKGdjb250ZW50OiBHQ29udGVudCwgcG9obGVkOiBHb3JkaWMuSXNsLlZpZXcsIGdsb2JhbHk6IGFueSwgdnlicmFuZVJhZGt5OiBBZGEuSW50ZXJmYWNlLkdBa2NlRHRvW10sIGFrdF9yb2xlOiBudW1iZXIsIGFrdF9zdGF2OiBudW1iZXIpOiBKUXVlcnlQcm9taXNlPEFkYS5JbnRlcmZhY2UuR0FrY2VEdG9bXT4ge1xyXG4gICAgICAgICAgICB2YXIgbF9jaXNsbyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBsX2l4c19jaWEgPSBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgbF9pY28gPSBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgbF9yb2sgPSAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSBnY29udGVudDtcclxuXHJcbiAgICAgICAgICAgIGxldCBkZWZDbG9zZSA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb25maXJtUXVlc3Rpb24gPSBcIlwiOyAvLyBwcm9tZW5uYSBuYSBwcmVub3MgbWV6aSBrcm9reVxyXG5cclxuICAgICAgICAgICAgdmFyIG1vZGVsRGF0YUZpcnN0ID0geyBuZXdfc3Rhdl9hejogMCB9OyAvLyBwb3XFvml0w6EgcHJvbcSbbm7DoSBwcm8gcMWZZW5vcyBtZXppIGtyb2t5XHJcbiAgICAgICAgICAgIHZhciBwb2xlX3NlcnZlckZpbHRyID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIHZhciBpbml0X3ZhbHVlID0gMDtcclxuO1xyXG4gICAgICAgICAgICAvL3sgbmF6ZXY6IFwiWnByYWNvdmF0ZWxcIiwgaWQ6IDAgfSxcclxuICAgICAgICAgICAgLy97IG5hemV2OiBcIktvbXBldGVudFwiLCBpZDogMSB9LFxyXG4gICAgICAgICAgICAvL3sgbmF6ZXY6IFwiRmluYW7EjW7DrSBrb21wZXRlbnQgQVpcIiwgaWQ6IDIgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFrdF9yb2xlID09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChha3Rfc3RhdiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0ciA9IFsyXTtcclxuICAgICAgICAgICAgICAgICAgICBpbml0X3ZhbHVlID0gMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChha3Rfc3RhdiA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0ciA9IFswLCAzXTtcclxuICAgICAgICAgICAgICAgICAgICBpbml0X3ZhbHVlID0gMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChha3Rfc3RhdiA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0ciA9IFsyLCAxXTtcclxuICAgICAgICAgICAgICAgICAgICBpbml0X3ZhbHVlID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChha3Rfc3RhdiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0ciA9IFszXTtcclxuICAgICAgICAgICAgICAgICAgICBpbml0X3ZhbHVlID0gMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFrdF9yb2xlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChha3Rfc3RhdiA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0ciA9IFszXTtcclxuICAgICAgICAgICAgICAgICAgICBpbml0X3ZhbHVlID0gMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChha3Rfc3RhdiA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0ciA9IFsyLCAxXTtcclxuICAgICAgICAgICAgICAgICAgICBpbml0X3ZhbHVlID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChha3Rfc3RhdiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0ciA9IFszXTtcclxuICAgICAgICAgICAgICAgICAgICBpbml0X3ZhbHVlID0gMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFrdF9yb2xlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChha3Rfc3RhdiA9PSAgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvbGVfc2VydmVyRmlsdHIgPSBbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdF92YWx1ZSA9IDI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWt0X3N0YXYgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvbGVfc2VydmVyRmlsdHIgPSBbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdF92YWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWt0X3N0YXYgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvbGVfc2VydmVyRmlsdHIgPSBbM107XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdF92YWx1ZSA9IDM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbW9kZWxEYXRhRmlyc3QubmV3X3N0YXZfYXogPSBpbml0X3ZhbHVlO1xyXG5cclxuLy8gLCBpbml0aWFsVmFsdWU6IHsgc3Rhdl9hejogaW5pdF92YWx1ZSB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbF9vRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6UGFyYW1zXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTItOC0yLCBNLTItOC0yLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk5vdsO9IHN0YXYgQVpcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zcnZjc2F6KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfYXpcIiwgbW9kZWw6IFwibW9kZWwubmV3X3N0YXZfYXo9dmFsdWUuc3Rhdl9helwiLCBtdWx0aTogZmFsc2UsIGxpc3Q6IHRydWUsIGl0ZW1XaWR0aDogXCJcIiwgZGlzYWJsZWQ6IGZhbHNlLCBzZXJ2ZXJGaWx0ZXJzOiB7IHN0YXZfYXo6IHBvbGVfc2VydmVyRmlsdHIgfSwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiXCIgfSlcclxuXHJcbiAgICAgICAgICAgIHZhciBjb25maXJtUXVlc3Rpb24gPSBcIlwiOyAvLyBwcm9tZW5uYSBuYSBwcmVub3MgbWV6aSBrcm9reVxyXG5cclxuICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVGhyZWVTdGVwc09wdGlvbnM8R29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+PihHb3JkaWMuRWtvLkNvbXBvbmVudHMuVGhyZWVTdGVwc0NvbnRlbnQsIHtcclxuICAgICAgICAgICAgICAgIElEOiBcIndpel9wcmVldmlkZW5jZV9ha2NlXCIsXHJcbiAgICAgICAgICAgICAgICBrZXlzOiBwb2hsZWQua2V5cywgLy8ga2xpY1xyXG5cclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IHRoaXMuZ3JpZEZvcm1hdFNlem5hbSwgLy8gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKS5hZGQodGhhdC5maW5kKFwiLmpzLVNlem5hbURva2xhZHVBWlwiKS5nZ3JpZDxHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZUR0bywgXCJjb2x1bW5zXCI+KFwib3B0aW9uXCIsIFwiY29sdW1uc1wiKSB8fCBbXSksIC8vZ3JpZGZvcm1hdFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiWm3Em25hIHN0YXZ1IEFaXCIsIC8vIHRpdHVsZWtcclxuICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7IC8vcHJ2bmkga3Jva1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm06IGxfb0Zvcm0sIC8vIHByZWZhYiBmb3JtdVxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJaw6F6bmFteSBrZSB6cHJhY292w6Fuw61cIiwgLy8gcG9waXNlayB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0luZGljYXRvcjogdHJ1ZSwgLy9wcml6bmFrLCB6ZGEgem9icmF6aXQga3BpIHBhbmVsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVnN0dXBuw60gcGFyYW1ldHJ5XCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkQ2hhbmdlRGVsZWdhdGU6IGZ1bmN0aW9uICh0aGlzOiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuRmlyc3RTdGVwPEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvPiwgZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0dvcmRpYy5Fa28uQ29tcG9uZW50cy5ydW5DaGVja0FjdGlvbihldi50YXJnZXQsIHRoaXMsIG9iai53aXphcmRNb2RlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZXNjcmlwdGlvbjogXCJLb3BpZSBha2PDrVwiLCAvLyBwb3Bpc2VrXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhOiBtb2RlbERhdGFGaXJzdCxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uTmFtZTogXCJabcSbbml0IHN0YXYgQVpcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbjogKG1vZGVsLCBpbnB1dCkgPT4geyAvLyBha2NlIHBybyBwcmVjaG9kIG1lemkga3Jva3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhRmlyc3QgPSBtb2RlbDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VydmljZUNvbnRlbnQgPSBnY29udGVudC5jcmVhdGVTZXJ2aWNlQ29udGVudChcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBa2NlSHJvbWFkbmVPcGVyYWNlVGFiXCIpOyAgICAgICAgICAvLyBzZXJ2ZXJvdsO9IG9iamVrdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZUNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKFwiTHplU2V0U3RhdkFaQWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rbGFkeTogaW5wdXQsIC8vaW5wdXQubWFwKGZ1bmN0aW9uIChkKSB7IHJldHVybiB7IHJvazogZC5yb2ssIGljbzogZC5pY28sIGNpc2xvOiBkLmNpc2xvIH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgbmV3X3N0YXZfYXo6IG1vZGVsRGF0YUZpcnN0Lm5ld19zdGF2X2F6IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXN1bHQ6IHsgcmVzdWx0OiB7IGRhdGE6IEFkYS5JbnRlcmZhY2UuR0FrY2VEdG8sIGVycm9yczogeyBtZXNzYWdlOiBzdHJpbmcgfVtdLCBraW5kOiBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kIH1bXSB9KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPEFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL21lbnVHcmlkQmFyOiAvLyBkYWxzaSBha2NlIHYgZ3JpZHUgLSBwb2RsZSBtZXRvZGlreSBsemUgemRlIG1pdCBkZXRhaWwgZG9rbGFkdSBhdGQuIGF0ZC5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gZGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgbmFtZTogXCJhY3REZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB2YXIgY250MSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9ICQoY3R4LmdyaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdmFyIHZ5YnJhbnlSYWRla19ocm86IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvID0gZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTsgIC8vIG5hxI10ZW7DrSBwxZllcyB2eWhsZWTDoW7DrSBncmlkdSAocMWZZXMgY2xhc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGlmICh2eWJyYW55UmFkZWtfaHJvLmNpc2xvICE9IFwiXCIpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBleGlzdHVqZSB2eWJyYW7DvSDFmcOhZGVrXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRldGFpbHdpbmRvdyA9ICQuY29udGVudChldi50YXJnZXQpLm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdEZXRhaWxBa2NlXCIsIHsgZ3JpZFJlbW90ZUNvbnRyb2w6IG5ldyBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkMoZ3JpZCkgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0RldGFpbERva2xhZHUyIycsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpc2xvOiB2eWJyYW55UmFkZWtfaHJvLmNpc2xvLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfY2lhOiB2eWJyYW55UmFkZWtfaHJvLml4c19jaWEsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlemltUHJvdm96dTogdGhhdC5nbG9iYWxzLlJlemltUHJvdm96dSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRWRpdGFibGU6IHRoYXQuZ2xvYmFscy5QYXJhbV9Ba2NlX0VkaXRhY2VfVFAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5vdmFBa2NlOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aW5kb3dDb250ZW50ID0gJC5jb250ZW50KGRldGFpbHdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Q29udGVudC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd0NvbnRlbnQub24oXCJhZGFfc2F2ZWFrY2VcIiwgZnVuY3Rpb24gKGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyRHRvOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU2V6bmFtQWRhRmlsdGVyRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9maWx0ZXJEdG8uY2lzbG8gPSB7IHN0YXJ0OiB2eWJyYW55UmFkZWtfaHJvLmNpc2xvIS50b1N0cmluZygpLCBlbmQ6IHZ5YnJhbnlSYWRla19ocm8uY2lzbG8hLnRvU3RyaW5nKCkgfTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uY2lzbG8gPSB7IHN0YXJ0OiBjdHguZGF0YS5jaXNsbyEudG9TdHJpbmcoKSwgZW5kOiBjdHguZGF0YS5jaXNsbyEudG9TdHJpbmcoKSB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBncmlkxa9cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWpwcnZlIGhsYXZuaSBzZXpuYW0gYXBsaWthY2VcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogZmlsdGVyRHRvIH0sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYSBwYWsgc2V6bmFtIHogcHLFr3ZvZGNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLkFrY2UubGlzdCh7IGZpbHRlcnM6IGZpbHRlckR0bywgZnJhZ21lbnRzOiBbXCJQZXJtaXNzaW9uc1wiLCBcIipcIl0gfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250MS52aWV3X2RhdGEgPSBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIGRhdGFbMF0sIHsgd2l6X2NoZWNrOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250MS52aWV3X2RhdGEudXBkYXRlRGF0YShkYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIF0sXHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRTdGVwOiB7IC8vcHJ2bmkga3Jva1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm06IGxfb0Zvcm0sIC8vIHByZWZhYiBmb3JtdVxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJaw6F6bmFteSBrZSB6cHJhY292w6Fuw61cIiwgLy8gcG9waXNlayB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0luZGljYXRvcjogdHJ1ZSwgLy9wcml6bmFrLCB6ZGEgem9icmF6aXQga3BpIHBhbmVsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiWm3Em25hIHN0YXZ1IEFaXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRDaGFuZ2VEZWxlZ2F0ZTogZnVuY3Rpb24gKHRoaXM6IEdvcmRpYy5Fa28uQ29tcG9uZW50cy5GaXJzdFN0ZXA8R29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+LCBldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vR29yZGljLkVrby5Db21wb25lbnRzLnJ1bkNoZWNrQWN0aW9uKGV2LnRhcmdldCwgdGhpcywgb2JqLndpemFyZE1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2Rlc2NyaXB0aW9uOiBcIktvcGllIGFrY8OtXCIsIC8vIHBvcGlzZWtcclxuICAgICAgICAgICAgICAgICAgICAvL21vZGVsRGF0YTogbW9kZWxEYXRhRmlyc3QsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld19zdGF2X2F6OiBtb2RlbERhdGFGaXJzdC5uZXdfc3Rhdl9helxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbk5hbWU6IFwiWm3Em25pdCBzdGF2IEFaXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tBY3Rpb246IChtb2RlbCwgaW5wdXQpID0+IHsgLy8gYWtjZSBwcm8ga29udHJvbHUgZGF0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IG1vZGVsRGF0YUZpcnN0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcnZpY2VDb250ZW50ID0gdGhhdC5jcmVhdGVTZXJ2aWNlQ29udGVudChcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBa2NlSHJvbWFkbmVPcGVyYWNlVGFiXCIpOyAgICAgICAgICAvLyBzZXJ2ZXJvdsO9IG9iamVrdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChcIkx6ZVNldFN0YXZBWkFrY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva2xhZHk6IGlucHV0LCAvL2lucHV0Lm1hcChmdW5jdGlvbiAoZCkgeyByZXR1cm4geyByb2s6IGQucm9rLCBpY286IGQuaWNvLCBjaXNsbzogZC5jaXNsbyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IG5ld19zdGF2X2F6OiBtb2RlbERhdGFGaXJzdC5uZXdfc3Rhdl9heiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzdWx0OiB7IHJlc3VsdDogeyBkYXRhOiBBZGEuSW50ZXJmYWNlLkdBa2NlRHRvLCBlcnJvcnM6IHsgbWVzc2FnZTogc3RyaW5nIH1bXSwga2luZDogR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZCB9W10gfSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxBZGEuSW50ZXJmYWNlLkdBa2NlRHRvPihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbjogKG1vZGVsLCBpbnB1dCkgPT4geyAvLyBha2NlIHBybyBwcmVjaG9kIG1lemkga3Jva3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhRmlyc3QgPSBtb2RlbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXJ2aWNlQ29udGVudCA9IHRoYXQuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZUhyb21hZG5lT3BlcmFjZVRhYlwiKTsgICAgICAgICAgLy8gc2VydmVyb3bDvSBvYmpla3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlQ29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoXCJTZXRTdGF2QVpBa2NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tsYWR5OiBpbnB1dCwgLy9pbnB1dC5tYXAoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHsgcm9rOiBkLnJvaywgaWNvOiBkLmljbywgY2lzbG86IGQuY2lzbG8gfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBuZXdfc3Rhdl9hejogbW9kZWxEYXRhRmlyc3QubmV3X3N0YXZfYXogfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3VsdDogeyByZXN1bHQ6IHsgZGF0YTogQWRhLkludGVyZmFjZS5HQWtjZUR0bywgZXJyb3JzOiB7IG1lc3NhZ2U6IHN0cmluZyB9W10sIGtpbmQ6IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQgfVtdIH0pID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8QWRhLkludGVyZmFjZS5HQWtjZUR0bz4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVHcmlkQmFyOiAvLyBkYWxzaSBha2NlIHYgZ3JpZHUgLSBwb2RsZSBtZXRvZGlreSBsemUgemRlIG1pdCBkZXRhaWwgZG9rbGFkdSBhdGQuIGF0ZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIGRldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0RGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdmFyIGNudDEgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSAkKGN0eC5ncmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHZhciB2eWJyYW55UmFkZWtfaHJvOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZUR0byA9IGdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7ICAvLyBuYcSNdGVuw60gcMWZZXMgdnlobGVkw6Fuw60gZ3JpZHUgKHDFmWVzIGNsYXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAodnlicmFueVJhZGVrX2hyby5jaXNsbyAhPSBcIlwiKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3R1amUgdnlicmFuw70gxZnDoWRla1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIGRldGFpbHdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGV0YWlsd2luZG93ID0gJC5jb250ZW50KGV2LnRhcmdldCkubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiR29yZGljLkFkYS5XZWJDbGllbnQuR0RldGFpbEFrY2VcIiwgeyBncmlkUmVtb3RlQ29udHJvbDogbmV3IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQyhncmlkKSB9XSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnRGV0YWlsRG9rbGFkdTIjJyxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lzbG86IHZ5YnJhbnlSYWRla19ocm8uY2lzbG8sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19jaWE6IHZ5YnJhbnlSYWRla19ocm8uaXhzX2NpYSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmV6aW1Qcm92b3p1OiB0aGF0Lmdsb2JhbHMuUmV6aW1Qcm92b3p1LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZGl0YWJsZTogdGhhdC5nbG9iYWxzLlBhcmFtX0FrY2VfRWRpdGFjZV9UUCxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTm92YUFrY2U6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpbmRvd0NvbnRlbnQgPSAkLmNvbnRlbnQoZGV0YWlsd2luZG93KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dDb250ZW50Lm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd0NvbnRlbnQub24oXCJhZGFfc2F2ZWFrY2VcIiwgZnVuY3Rpb24gKGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyRHRvOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU2V6bmFtQWRhRmlsdGVyRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9maWx0ZXJEdG8uY2lzbG8gPSB7IHN0YXJ0OiB2eWJyYW55UmFkZWtfaHJvLmNpc2xvIS50b1N0cmluZygpLCBlbmQ6IHZ5YnJhbnlSYWRla19ocm8uY2lzbG8hLnRvU3RyaW5nKCkgfTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uY2lzbG8gPSB7IHN0YXJ0OiBjdHguZGF0YS5jaXNsbyEudG9TdHJpbmcoKSwgZW5kOiBjdHguZGF0YS5jaXNsbyEudG9TdHJpbmcoKSB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBncmlkxa9cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWpwcnZlIGhsYXZuaSBzZXpuYW0gYXBsaWthY2VcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogZmlsdGVyRHRvIH0sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYSBwYWsgc2V6bmFtIHogcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmlzbC5Ba2NlLmxpc3QoXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4geyBmaWx0ZXJzOiBmaWx0ZXJEdG8sIGZyYWdtZW50czogW1wiUGVybWlzc2lvbnNcIiwgXCIqXCJdIH07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuQWtjZS5saXN0KHsgZmlsdGVyczogZmlsdGVyRHRvLCBmcmFnbWVudHM6IFtcIlBlcm1pc3Npb25zXCIsIFwiKlwiXSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQxLnZpZXdfZGF0YSA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250MS52aWV3X2RhdGEudXBkYXRlRGF0YShkYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBkZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJhY3RUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGNhcHRpb246IFwiVGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGxhc3RTdGVwOiAvLyBwb3NsZWRuaSBrcm9rXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZsOhemUgMiAtIHpvYnJhemVuw60gdsO9c2xlZGt1IHN0b3JuYVxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlbDvXNsZWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJacHJhY292YW7DqSB6w6F6bmFteVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm06IGxfb0Zvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdfc3Rhdl9hejogbW9kZWxEYXRhRmlyc3QubmV3X3N0YXZfYXpcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdnlicmFuZVJhZGt5LCAvLyBkYXRhXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAodmlldykgPT4geyAvLyBkZWxlZ2F0LCBrdGVyeSBzZSB2b2xhIHBvIHVrb25jZW5pIHBydXZvZGNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQudmlld19JU0wucmVxdWVzdERhdGEoe30sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJEdG86IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTZXpuYW1BZGFGaWx0ZXJEdG8gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uYWt0aXZpdGEgPSB7IG86IFwiSU5cIiwgdjogWzEwMCwgMzAwXSB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tb2RlbF9maWx0ci5yb2xlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLml4c19mdW5fYWt0ID0geyBvOiBcIj1cIiwgdjogKCQuY29udGVudChcIm1haW5cIikgYXMgYW55KS5JeHNGdW5Ba3QgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLml4c19mdW5fYXogPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8ua29tcCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxfZmlsdHIucm9sZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5peHNfZnVuX2FrdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5peHNfZnVuX2F6ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLmtvbXAgPSB7IG86IFwiPVwiLCB2OiAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsX2ZpbHRyLnJvbGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2Z1bl9ha3QgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2Z1bl9heiA9IHsgbzogXCI9XCIsIHY6ICgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkuSXhzRnVuQWt0IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5rb21wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tb2RlbF9maWx0ciAmJiB0aGF0Lm1vZGVsX2ZpbHRyLnN0YXZfYXogIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uc3Rhdl9heiA9IHsgbzogXCI9XCIsIHY6IHRoYXQubW9kZWxfZmlsdHIuc3Rhdl9heiB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwb2hsZWQucmVxdWVzdERhdGEoeyBmaWx0ZXJzOiBmaWx0ZXJEdG8gfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7IHRpdGxlOiBcIlptxJtuYSBzdGF2dSBBWlwiIH0pXHJcblxyXG4gICAgICAgICAgICBkZWZDbG9zZS5yZXNvbHZlKHBvaGxlZC5nZXREYXRhUm93cygpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZDbG9zZS5wcm9taXNlKCk7XHJcbiAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==
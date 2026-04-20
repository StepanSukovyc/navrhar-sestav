"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GSeznamPripravaGenerovani.js                                                        </Name>
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
            let GSeznamPripravaGenerovani = class GSeznamPripravaGenerovani extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.model_filtr = { role: 0, stav_az: 0 };
                    this.title = "Příprava plánu - Generování";
                    this.taskId = "actSeznamPripravaGenerovani"; // označení položky v taskListu
                    //detail_radku(editable, novaakce) {
                    //    var cnt = this;
                    //    var l_cislo: String = "";
                    //    var l_ixs_cia: String = "";
                    //    var vybraneRadky: Gordic.Ada.Interface.GAkceDto;
                    //    var mam_detail: boolean;
                    //    // vybraneRadky = cnt.find(".js-SeznamDokladuAZ").ggrid("getSelection");                        // načtení přes vyhledání gridu (přes class)
                    //    //if (vybraneRadky.length === 1) {                                                            // pokud existuje vybraný záznam
                    //    if (novaakce == true) {
                    //        vybraneRadky = {};
                    //        vybraneRadky.cislo = cnt.globals.Te1_Msk_Nula;
                    //        vybraneRadky.ixs_cia = "";
                    //        vybraneRadky.aktivita = Interface.AktivitaAkceEnum.Aktivni;
                    //        mam_detail = true;
                    //    } else {
                    //        var vybraneRadky_meta;
                    //        vybraneRadky_meta = cnt.find(".js-SeznamDokladuAZ").ggrid("activeRow", true);                        // načtení přes vyhledání gridu (přes class)
                    //        vybraneRadky = vybraneRadky_meta.data;
                    //        mam_detail = (vybraneRadky_meta && !vybraneRadky_meta._isVirtual && vybraneRadky && (vybraneRadky.cislo !== undefined) && (vybraneRadky.cislo !== ""));
                    //    }
                    //    if (mam_detail) {
                    //        l_cislo = vybraneRadky.cislo!;
                    //        l_ixs_cia = vybraneRadky.ixs_cia!;
                    //        // editable = editable && vybraneRadky.aktivita == Interface.AktivitaAkceEnum.Aktivni;
                    //        editable = editable;
                    //        var gridRC = new Gordic.Components.GridRC(cnt.mainTable); //pohyb po gridu
                    //        var detailwindow = cnt.navigate(
                    //            ["Gordic.Ada.WebClient.GDetailAkce", { gridRemoteControl: novaakce == false ? gridRC : null, gpc: Gordic.Eko.Utils.createBookGpc(cnt.gpc, vybraneRadky.ixs_pla!) }],
                    //            {
                    //                id: 'DetailDokladu#',
                    //                cislo: l_cislo,
                    //                ixs_cia: l_ixs_cia,
                    //                RezimProvozu: this.globals.RezimProvozu,
                    //                Editable: editable,
                    //                NovaAkce: novaakce
                    //            });
                    //        var windowContent = $.content(detailwindow);
                    //        windowContent.on("ada_saveakce", function (retVal) {
                    //            var filterDto: Gordic.Ada.Interface.GSeznamAdaFilterDto = {};
                    //            //filterDto.cislo = { start: l_cislo.toString().trim(), end: l_cislo.toString().trim() };
                    //            //cnt.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                    //            filterDto.cislo = { start: retVal.data.cislo.toString().trim(), end: retVal.data.cislo.toString().trim() };
                    //            cnt.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                    //        });
                    //        windowContent.on("ada_saveakce_schvaleni", function (retVal) {
                    //            var vybraneRadky_meta;
                    //            vybraneRadky_meta = cnt.find(".js-SeznamDokladuAZ").ggrid("activeRow", true);                        // načtení přes vyhledání gridu (přes class)
                    //            vybraneRadky_meta.data.cislo = retVal.data[0].cislo;
                    //            vybraneRadky_meta.key = retVal.data[0].rok + retVal.data[0].ico + retVal.data[0].cislo + retVal.data[0].ixs_cia;
                    //            var filterDto: Gordic.Ada.Interface.GSeznamAdaFilterDto = {};
                    //            filterDto.cislo = { start: retVal.data[0].cislo, end: retVal.data[0].cislo };
                    //            cnt.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                    //        });
                    //        windowContent.on("ada_saveakce_set_stav_real", function (retVal) {
                    //            var filterDto: Gordic.Ada.Interface.GSeznamAdaFilterDto = {};
                    //            filterDto.cislo = { start: retVal.data[0].cislo, end: retVal.data[0].cislo };
                    //            cnt.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                    //        });
                    //        windowContent.on("ada_saveakce_set_stav_az", function (retVal) {
                    //            var filterDto: Gordic.Ada.Interface.GSeznamAdaFilterDto = {};
                    //            filterDto.cislo = { start: retVal.data[0].cislo, end: retVal.data[0].cislo };
                    //            cnt.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                    //        });
                    //        windowContent.element.on('contentclosed', (ev, ctx) => {
                    //            cnt.mainTable.ggrid('focus');
                    //        }); // při zavření detailu se nastaví focus na grid
                    //    }
                    //}
                }
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    $tab.empty();
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actGenBAR: {
                            caption: "Generovat z BAR",
                            icon: "gi-pencil",
                            primary: true,
                            run: () => {
                                return cnt.generuj_bar();
                            }
                        }
                    });
                    //this.actions.addRange({
                    //    actDetail: {
                    //        caption: "PCN",
                    //        icon: "gi-pencil",
                    //        primary: true,
                    //        run: () => {
                    //            return null; // cnt.nastav_stav_az(that.model_filtr.role, that.model_filtr.stav_az );
                    //        }
                    //    }
                    //});
                    //this.actions.addRange({
                    //    actDetail: {
                    //        caption: "PKR",
                    //        icon: "gi-pencil",
                    //        primary: true,
                    //        run: () => {
                    //            return null; // cnt.nastav_stav_az(that.model_filtr.role, that.model_filtr.stav_az );
                    //        }
                    //    }
                    //});
                    this.actions.addRange({
                        actUlozit: {
                            caption: "Uložit",
                            icon: "gi-pencil",
                            primary: true,
                            run: () => {
                                that = this;
                                return that.uloz_akce();
                            }
                        }
                    });
                    this.actions.addRange({
                        actOdstranitOznacene: {
                            caption: "Odstranit vybrané",
                            icon: "fa-trash",
                            primary: true,
                            run: () => {
                                return cnt.odstranit_oznacene();
                            }
                        }
                    });
                    this.actions.addRange({
                        actOdstranitVse: {
                            caption: "Odstranit vše",
                            icon: "fa-trash",
                            primary: true,
                            run: () => {
                                return cnt.odstranit_vse();
                            }
                        }
                    });
                    this.actions.addRange({
                        actGridDoubleClick: {
                            run: function (ev, ctx) {
                                return null;
                            }
                        }
                    });
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actGenBAR*", "actUlozit*", "actOdstranitVse*", "actOdstranitOznacene*"]));
                    //var filterFormDef = new Gordic.Forms.Form({ tabLabel: "Kompletní filtr", layoutDescriptor: "w-L-9 w-M-9 w-S-12" })
                    //    .addSection();
                    //filterFormDef
                    //    .addField("gselectbox", {
                    //        name: "role",
                    //        model: "model.role=value.id",
                    //        multi: false,
                    //        list: true,
                    //        initialValue: { id: 0 },
                    //        itemWidth: "",
                    //        itemTemplate: "{nazev}",
                    //        change: function (ev, obj) {
                    //            if (obj.flags.noChange) return;
                    //            var akt_role_i = 0
                    //            var init_value_i = 0;
                    //            akt_role_i = obj.value?.id ?? 0;
                    //            var pole_serverFiltr_i = new Array();
                    //            if (akt_role_i == 0) {
                    //                pole_serverFiltr_i = [0, 2, 3, 1];
                    //                init_value_i = 0;
                    //            }
                    //            if (akt_role_i == 1) {
                    //                pole_serverFiltr_i = [2, 3, 1];
                    //                init_value_i = 2;
                    //            }
                    //            if (akt_role_i == 2) {
                    //                pole_serverFiltr_i = [0,2];
                    //                init_value_i = 2;
                    //            }
                    //            $(this).gform().findFields("stav_az_f").gfield("option", "serverFilters", { stav_az: pole_serverFiltr_i });
                    //            $(this).gform().findFields("stav_az_f").gfield("setValue", { stav_az: init_value_i }, {valid : false});
                    //            //// automatické načtení po změně hodnoty
                    //            //let dto = {};
                    //            //that.filterForm!.findFields().gfield("model", "collect", dto);
                    //            //that.filterForm!.gfilterpanel("applyFilter", dto);
                    //        },
                    //        data:
                    //            new Gordic.Data.View([
                    //                { nazev: "Zpracovatel", id: 0 },
                    //                { nazev: "Kompetent", id: 1 },
                    //                { nazev: "Finanční kompetent AZ", id: 2 }
                    //            ], { key: "id" })
                    //    });
                    //filterFormDef
                    //    .addField("gselectbox", Gordic.Prefabs.Select.srvcsaz(), {
                    //        name: "stav_az_f", model: "model.stav_az=value.stav_az", multi: false, list: true, itemWidth: "", disabled: false, initialValue: { stav_az: 0 }, 
                    //        change: function (ev, obj) {
                    //            // automatické načtení po změně hodnoty
                    //            if (obj.flags.isKontrolniDiv || obj.flags.noChange) return;
                    //            let dto = {};
                    //            that.filterForm!.findFields().gfield("model", "collect", dto);
                    //            that.filterForm!.gfilterpanel("applyFilter", dto);
                    //        },
                    //    });
                    //that.filterForm = $("<div>").appendTo(mainForm)
                    //    .gfilterpanel({
                    //        // default pro EKO
                    //        filterViewModeUserSettings: [FilterViewMode.Simple],
                    //        filterViewMode: FilterViewMode.Simple,
                    //        //poOtevreniOtevritPanelPodminek: false,     // default pro uživatelské nastavení
                    //        poVyhledaniZobrazit: "VyhledanePodminkyVBadge",
                    //        autoLoadAfterChoseFilter: false,        // Automatické vyhledání po změně uloženého
                    //        clearFilterButtonVisible: "NeverVisible",
                    //        detailActionAsCheckbox: false,
                    //        //idSimpleMode:"idSimpleMode",
                    //        forms: [filterFormDef],
                    //        // TODO: bude nějaké lepší ukládací okno nebo budu muset udělat svoje a nastavit ho do saveOptionsForm?
                    //        favorites: ["role", "stav_az"],
                    //        favoriteLayoutDescriptor: "L4M3S1",
                    //        // TODO: zůstane tohle téma nebo bude pro LK jiné než pro TK?
                    //        tema: "ada_ptm_adabas2",
                    //        filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                    //        saveOptionsForm: "eko",
                    //        // strictStopAutoLoad: true,               // Striktně zakáže automatické načtení hned po otevření seznamu, oblíbený filtr se pouze předplní.
                    //        // textItemTemplate: "{description}",
                    //        apply: function (event, obj) {
                    //            // načtení dat podle filtrů
                    //            that.model_filtr = obj.filter;
                    //        }
                    //    });
                    cnt.gridFormatSeznam = new Gordic.Data.GridFormat();
                    Gordic.Eko.Grid.Column.addVlastnictvi(cnt.gridFormatSeznam);
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
                    });
                    cnt.gridFormatSeznam.addTextColumn({
                        name: "ixs_pla_txt",
                        caption: "Kniha",
                        customClass: "dt-left",
                        width: 200,
                    });
                    cnt.gridFormatSeznam
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
                    });
                    cnt.mainTable = $("<div class='js-SeznamDokladuPripravaGenerovani'>")
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
                            { name: "Úplný", columnList: this.zjisti_sloupce(cnt.gridFormatSeznam), _locked: true } //gridFormatSeznam.columns.filter((c) => c.name != "kniha").join() },
                        ],
                    });
                    //var filterDto: Gordic.Ada.Interface.GSeznamAdaFilterDto = {};
                    //filterDto.stav_az = { o: "=", v: that.model_filtr.stav_az };
                    //filterDto.ixs_fun_akt = { o: "=", v: ($.content("main") as any).IxsFunAkt };
                    //filterDto.aktivita = { o: "IN", v: [100, 300] };
                }
                zjisti_sloupce(gf) {
                    return gf.columns.filter(e => e.hidden != true).map(e => e.name).join(',');
                }
                generuj_bar() {
                    var that = this;
                    that.beginOperation("generuji z BAR");
                    this.isl.AkcePriprava.generateBAR({ filters: {}, fragments: ["Permissions", "*"] }).getView({}, "cislo,nazev,nks,t_nks")
                        .then((data_view) => {
                        that.view_ISL = data_view;
                        that.mainTable.ggrid("setData", that.view_ISL);
                    })
                        .always((data_view) => {
                        that.endOperation();
                    });
                }
                uloz_akce() {
                    var that = this;
                    var radky = that.view_ISL.getDataRows(false); // řádky v gridu v průvodci, všechny
                    let defClose = $.Deferred();
                    var actualAction;
                    actualAction = this.actions.actUlozit;
                    // actualAction.setPending(0);
                    that.beginOperation("Probíhá uložení dat");
                    var serviceContent = this.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab"); // serverový objekt
                    const prom = serviceContent
                        .call("UlozitPripravaAkce", {
                        doklady: radky
                    }).then((result) => {
                        if (result.result.length >= 1) {
                            if (result.result[0].kind != 400) {
                                that.view_ISL.updateData([], "reset");
                                return true;
                            }
                            else {
                                // operace nedopadla
                                throw new GError({ message: result.result[0].errors[0].message, target: "hidden" });
                            }
                        }
                        else {
                            // operace nedopadla
                            throw new GError({ message: "Neznámá chyba", target: "hidden" });
                        }
                    })
                        .always(function () {
                        that.endOperation();
                    });
                    actualAction.setPending(prom);
                    return prom;
                }
                odstranit_oznacene() {
                    var that = this;
                    var vybraneRadky = that.find(".js-SeznamDokladuPripravaGenerovani").ggrid("getSelection"); // načtení přes vyhledání gridu (přes class)
                    if (vybraneRadky.length >= 1) { // pokud existuje vybraný záznam
                        that.view_ISL.updateData(vybraneRadky, "delete");
                    }
                    return;
                }
                odstranit_vse() {
                    var that = this;
                    that.view_ISL.updateData([], "reset");
                    return;
                }
            };
            GSeznamPripravaGenerovani = __decorate([
                gcontent
            ], GSeznamPripravaGenerovani);
            WebClient.GSeznamPripravaGenerovani = GSeznamPripravaGenerovani;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVByaXByYXZhR2VuZXJvdmFuaS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HU2V6bmFtUHJpcHJhdmFHZW5lcm92YW5pLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBOGhCZjtBQTloQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBOGhCbkI7SUE5aEJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E4aEI3QjtRQTloQm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQTBCLFNBQVEsT0FBQSxZQUFZO2dCQUEzRDs7b0JBY1ksZ0JBQVcsR0FBRyxFQUFFLElBQUksRUFBRyxDQUFDLEVBQUUsT0FBTyxFQUFHLENBQUMsRUFBRSxDQUFDO29CQUVoRCxVQUFLLEdBQUcsNkJBQTZCLENBQUM7b0JBQ3RDLFdBQU0sR0FBRyw2QkFBNkIsQ0FBQyxDQUFDLCtCQUErQjtvQkF1YXZFLG9DQUFvQztvQkFDcEMscUJBQXFCO29CQUNyQiwrQkFBK0I7b0JBQy9CLGlDQUFpQztvQkFFakMsc0RBQXNEO29CQUN0RCw4QkFBOEI7b0JBRTlCLGtKQUFrSjtvQkFDbEosb0lBQW9JO29CQUNwSSw2QkFBNkI7b0JBQzdCLDRCQUE0QjtvQkFDNUIsd0RBQXdEO29CQUN4RCxvQ0FBb0M7b0JBQ3BDLHFFQUFxRTtvQkFDckUsNEJBQTRCO29CQUU1QixjQUFjO29CQUNkLGdDQUFnQztvQkFFaEMsMkpBQTJKO29CQUMzSixnREFBZ0Q7b0JBQ2hELGlLQUFpSztvQkFDakssT0FBTztvQkFFUCx1QkFBdUI7b0JBQ3ZCLHdDQUF3QztvQkFDeEMsNENBQTRDO29CQUM1QyxnR0FBZ0c7b0JBQ2hHLDhCQUE4QjtvQkFFOUIsb0ZBQW9GO29CQUVwRiwwQ0FBMEM7b0JB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QUFDLENBQUM7d0JBQ3JFLENBQUM7b0JBQ0wsQ0FBQyxDQUFDO3lCQUNELE1BQU0sQ0FBQzt3QkFDSixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3hCLENBQUMsQ0FBQyxDQUNEO29CQUVULFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRTlCLE9BQU8sSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELGtCQUFrQjtvQkFFZCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMscUNBQXFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBd0IsNENBQTRDO29CQUM5SixJQUFJLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBNEQsZ0NBQWdDO3dCQUN2SCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3JELENBQUM7b0JBRUQsT0FBTztnQkFDWCxDQUFDO2dCQUVELGFBQWE7b0JBRVQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFFLENBQUM7b0JBRXZDLE9BQU87Z0JBQ1gsQ0FBQzthQW1HSixDQUFBO1lBemhCWSx5QkFBeUI7Z0JBRHJDLFFBQVE7ZUFDSSx5QkFBeUIsQ0F5aEJyQztZQXpoQlksbUNBQXlCLDRCQXloQnJDLENBQUE7UUFDTCxDQUFDLEVBOWhCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBOGhCN0I7SUFBRCxDQUFDLEVBOWhCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBOGhCbkI7QUFBRCxDQUFDLEVBOWhCUyxNQUFNLEtBQU4sTUFBTSxRQThoQmYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR1Nlem5hbVByaXByYXZhR2VuZXJvdmFuaS5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdBa2NlVWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkFkYS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtUHJpcHJhdmFHZW5lcm92YW5pIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvO1xyXG5cclxuLy8gICAgICAgIHByaXZhdGUgdmlld19JU0w6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZUR0bz47XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3X0lTTDogR29yZGljLkRhdGEuVmlldzxHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZUR0bz47XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXI6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTZXpuYW1BZGFGaWx0ZXJEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkRm9ybWF0U2V6bmFtOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvPjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBnbG9iYWxzOiBHb3JkaWMuQWRhLldlYkNsaWVudC5EVE8uR0FkYUdsb2JhbHNEdG87XHJcblxyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyRm9ybTogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgbWFpblRhYmxlOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW9kZWxfZmlsdHIgPSB7IHJvbGUgOiAwLCBzdGF2X2F6IDogMCB9O1xyXG5cclxuICAgICAgICB0aXRsZSA9IFwiUMWZw61wcmF2YSBwbMOhbnUgLSBHZW5lcm92w6Fuw61cIjtcclxuICAgICAgICB0YXNrSWQgPSBcImFjdFNlem5hbVByaXByYXZhR2VuZXJvdmFuaVwiOyAvLyBvem5hxI1lbsOtIHBvbG/Fvmt5IHYgdGFza0xpc3R1XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0R2VuQkFSOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJHZW5lcm92YXQgeiBCQVJcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBlbmNpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbnQuZ2VuZXJ1al9iYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgLy8gICAgYWN0RGV0YWlsOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBjYXB0aW9uOiBcIlBDTlwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgaWNvbjogXCJnaS1wZW5jaWxcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHByaW1hcnk6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gbnVsbDsgLy8gY250Lm5hc3Rhdl9zdGF2X2F6KHRoYXQubW9kZWxfZmlsdHIucm9sZSwgdGhhdC5tb2RlbF9maWx0ci5zdGF2X2F6ICk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgLy8gICAgYWN0RGV0YWlsOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBjYXB0aW9uOiBcIlBLUlwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgaWNvbjogXCJnaS1wZW5jaWxcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHByaW1hcnk6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gbnVsbDsgLy8gY250Lm5hc3Rhdl9zdGF2X2F6KHRoYXQubW9kZWxfZmlsdHIucm9sZSwgdGhhdC5tb2RlbF9maWx0ci5zdGF2X2F6ICk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0VWxveml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVbG/Fvml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wZW5jaWxcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnVsb3pfYWtjZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE9kc3RyYW5pdE96bmFjZW5lOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPZHN0cmFuaXQgdnlicmFuw6lcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXRyYXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNudC5vZHN0cmFuaXRfb3puYWNlbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE9kc3RyYW5pdFZzZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2RzdHJhbml0IHbFoWVcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXRyYXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNudC5vZHN0cmFuaXRfdnNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RHcmlkRG91YmxlQ2xpY2s6IHtcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbWVudUJhcnVcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0R2VuQkFSKlwiLCBcImFjdFVsb3ppdCpcIiwgXCJhY3RPZHN0cmFuaXRWc2UqXCIsIFwiYWN0T2RzdHJhbml0T3puYWNlbmUqXCJdKSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBmaWx0ZXJGb3JtRGVmID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwiS29tcGxldG7DrSBmaWx0clwiLCBsYXlvdXREZXNjcmlwdG9yOiBcInctTC05IHctTS05IHctUy0xMlwiIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRTZWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAvL2ZpbHRlckZvcm1EZWZcclxuICAgICAgICAgICAgLy8gICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcInJvbGVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIG1vZGVsOiBcIm1vZGVsLnJvbGU9dmFsdWUuaWRcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIG11bHRpOiBmYWxzZSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpbml0aWFsVmFsdWU6IHsgaWQ6IDAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGl0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKG9iai5mbGFncy5ub0NoYW5nZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgYWt0X3JvbGVfaSA9IDBcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgaW5pdF92YWx1ZV9pID0gMDtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBha3Rfcm9sZV9pID0gb2JqLnZhbHVlPy5pZCA/PyAwO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHZhciBwb2xlX3NlcnZlckZpbHRyX2kgPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKGFrdF9yb2xlX2kgPT0gMCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBwb2xlX3NlcnZlckZpbHRyX2kgPSBbMCwgMiwgMywgMV07XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGluaXRfdmFsdWVfaSA9IDA7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoYWt0X3JvbGVfaSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHBvbGVfc2VydmVyRmlsdHJfaSA9IFsyLCAzLCAxXTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaW5pdF92YWx1ZV9pID0gMjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlmIChha3Rfcm9sZV9pID09IDIpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0cl9pID0gWzAsMl07XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGluaXRfdmFsdWVfaSA9IDI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcInN0YXZfYXpfZlwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJzZXJ2ZXJGaWx0ZXJzXCIsIHsgc3Rhdl9hejogcG9sZV9zZXJ2ZXJGaWx0cl9pIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwic3Rhdl9hel9mXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgc3Rhdl9hejogaW5pdF92YWx1ZV9pIH0sIHt2YWxpZCA6IGZhbHNlfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLy8vIGF1dG9tYXRpY2vDqSBuYcSNdGVuw60gcG8gem3Em27EmyBob2Rub3R5XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9sZXQgZHRvID0ge307XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy90aGF0LmZpbHRlckZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL3RoYXQuZmlsdGVyRm9ybSEuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIiwgZHRvKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBkYXRhOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIG5ldyBHb3JkaWMuRGF0YS5WaWV3KFtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgeyBuYXpldjogXCJacHJhY292YXRlbFwiLCBpZDogMCB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB7IG5hemV2OiBcIktvbXBldGVudFwiLCBpZDogMSB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB7IG5hemV2OiBcIkZpbmFuxI1uw60ga29tcGV0ZW50IEFaXCIsIGlkOiAyIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBdLCB7IGtleTogXCJpZFwiIH0pXHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9maWx0ZXJGb3JtRGVmXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNydmNzYXooKSwge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJzdGF2X2F6X2ZcIiwgbW9kZWw6IFwibW9kZWwuc3Rhdl9hej12YWx1ZS5zdGF2X2F6XCIsIG11bHRpOiBmYWxzZSwgbGlzdDogdHJ1ZSwgaXRlbVdpZHRoOiBcIlwiLCBkaXNhYmxlZDogZmFsc2UsIGluaXRpYWxWYWx1ZTogeyBzdGF2X2F6OiAwIH0sIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIGF1dG9tYXRpY2vDqSBuYcSNdGVuw60gcG8gem3Em27EmyBob2Rub3R5XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKG9iai5mbGFncy5pc0tvbnRyb2xuaURpdiB8fCBvYmouZmxhZ3Mubm9DaGFuZ2UpIHJldHVybjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBsZXQgZHRvID0ge307XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5maWx0ZXJGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGR0byk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5maWx0ZXJGb3JtIS5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiLCBkdG8pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy90aGF0LmZpbHRlckZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgIC8vICAgIC5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gZGVmYXVsdCBwcm8gRUtPXHJcbiAgICAgICAgICAgIC8vICAgICAgICBmaWx0ZXJWaWV3TW9kZVVzZXJTZXR0aW5nczogW0ZpbHRlclZpZXdNb2RlLlNpbXBsZV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9wb090ZXZyZW5pT3RldnJpdFBhbmVsUG9kbWluZWs6IGZhbHNlLCAgICAgLy8gZGVmYXVsdCBwcm8gdcW+aXZhdGVsc2vDqSBuYXN0YXZlbsOtXHJcbiAgICAgICAgICAgIC8vICAgICAgICBwb1Z5aGxlZGFuaVpvYnJheml0OiBcIlZ5aGxlZGFuZVBvZG1pbmt5VkJhZGdlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBhdXRvTG9hZEFmdGVyQ2hvc2VGaWx0ZXI6IGZhbHNlLCAgICAgICAgLy8gQXV0b21hdGlja8OpIHZ5aGxlZMOhbsOtIHBvIHptxJtuxJsgdWxvxb5lbsOpaG9cclxuICAgICAgICAgICAgLy8gICAgICAgIGNsZWFyRmlsdGVyQnV0dG9uVmlzaWJsZTogXCJOZXZlclZpc2libGVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGRldGFpbEFjdGlvbkFzQ2hlY2tib3g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9pZFNpbXBsZU1vZGU6XCJpZFNpbXBsZU1vZGVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGZvcm1zOiBbZmlsdGVyRm9ybURlZl0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBUT0RPOiBidWRlIG7Em2pha8OpIGxlcMWhw60gdWtsw6FkYWPDrSBva25vIG5lYm8gYnVkdSBtdXNldCB1ZMSbbGF0IHN2b2plIGEgbmFzdGF2aXQgaG8gZG8gc2F2ZU9wdGlvbnNGb3JtP1xyXG4gICAgICAgICAgICAvLyAgICAgICAgZmF2b3JpdGVzOiBbXCJyb2xlXCIsIFwic3Rhdl9helwiXSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzFcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vIFRPRE86IHrFr3N0YW5lIHRvaGxlIHTDqW1hIG5lYm8gYnVkZSBwcm8gTEsgamluw6kgbmXFviBwcm8gVEs/XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0ZW1hOiBcImFkYV9wdG1fYWRhYmFzMlwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHb3JkaWMuR2luLkZpbHRlclN0b3JhZ2VTZXJ2aWNlLlN0b3JlKCksXHJcbiAgICAgICAgICAgIC8vICAgICAgICBzYXZlT3B0aW9uc0Zvcm06IFwiZWtvXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBzdHJpY3RTdG9wQXV0b0xvYWQ6IHRydWUsICAgICAgICAgICAgICAgLy8gU3RyaWt0bsSbIHpha8Ohxb5lIGF1dG9tYXRpY2vDqSBuYcSNdGVuw60gaG5lZCBwbyBvdGV2xZllbsOtIHNlem5hbXUsIG9ibMOtYmVuw70gZmlsdHIgc2UgcG91emUgcMWZZWRwbG7DrS5cclxuICAgICAgICAgICAgLy8gICAgICAgIC8vIHRleHRJdGVtVGVtcGxhdGU6IFwie2Rlc2NyaXB0aW9ufVwiLFxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIGFwcGx5OiBmdW5jdGlvbiAoZXZlbnQsIG9iaikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBkYXQgcG9kbGUgZmlsdHLFr1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQubW9kZWxfZmlsdHIgPSBvYmouZmlsdGVyO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNudC5ncmlkRm9ybWF0U2V6bmFtID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+KCk7XHJcblxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFZsYXN0bmljdHZpKGNudC5ncmlkRm9ybWF0U2V6bmFtKTtcclxuXHJcbiAgICAgICAgICAgIGNudC5ncmlkRm9ybWF0U2V6bmFtLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgZmllbGQ6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgLy9oaWRkZW46IHRoaXMuZ2xvYmFscy5QYXJhbV9Ba2NlX0F1dFNjaHYgPT0gSW50ZXJmYWNlLlR5cEF1dG9tYXRTY2h2YWxlbmlOb3ZhQWtjZUVudW0uTmVTcHJvY2VzZW0sXHJcbiAgICAgICAgICAgICAgICAvLyB3aWR0aDogMjUsXHJcbiAgICAgICAgICAgICAgICBmb3JtYXRQcmVzZXQ6IEdvcmRpYy5HbG9iYWwuRW51bXMuR3JpZENvbHVtbkZvcm1hdEljb24uaWNvbixcclxuICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuYWt0aXZpdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuQWt0aXZpdGFBa2NlRW51bS5Ba3Rpdm5pOiByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZS1vIGctc3RhdGUtc3VjY2VzcyBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJBa3Rpdm7DrVwiLCBjYXB0aW9uOiBcIkFrdGl2bsOtXCIsIHRvb2x0aXA6IFwiQWt0aXZuw61cIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5Ba3Rpdml0YUFrY2VFbnVtLk5hdnJoOiByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXdhcm5pbmcgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiTsOhdnJoXCIsIGNhcHRpb246IFwiTsOhdnJoXCIsIHRvb2x0aXA6IFwiTsOhdnJoXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuQWt0aXZpdGFBa2NlRW51bS5OZWFrdGl2bmk6IHJldHVybiB7IGljb246IFwiZmEtdHJhc2ggZy1zdGF0ZS1lcnJvciBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJOZWFrdGl2bsOtXCIsIGNhcHRpb246IFwiTmVha3Rpdm7DrVwiLCB0b29sdGlwOiBcIk5lYWt0aXZuw61cIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5Ba3Rpdml0YUFrY2VFbnVtLlpydXNlbmE6IHJldHVybiB7IGljb246IFwiZmEtdHJhc2ggZy1zdGF0ZS1lcnJvciBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJTdG9ybm92YW7DoVwiLCBjYXB0aW9uOiBcIlN0b3Jub3ZhbsOhXCIsIHRvb2x0aXA6IFwiU3Rvcm5vdmFuw6FcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW1cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2lzbG9cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBjbnQuZ2xvYmFscy5CQVJfVHlwX0luc3QgPT0gSW50ZXJmYWNlLlNydlR5cEludGFsYWNlRW51bS5NTyA/IFwixIzDrXNsbyBwb2wuIHBsw6FudVwiIDogXCLEjMOtc2xvIGFrY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBjbnQuZ2xvYmFscy5CQVJfVHlwX0luc3QgPT0gSW50ZXJmYWNlLlNydlR5cEludGFsYWNlRW51bS5NTyA/IFwiTsOhemV2IHBvbC4gcGzDoW51XCIgOiBcIk7DoXpldiBha2NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNudC5ncmlkRm9ybWF0U2V6bmFtLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19wbGFfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktuaWhhXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNudC5ncmlkRm9ybWF0U2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBjbnQuZ2xvYmFscy5CQVJfVHlwX0luc3QgPT0gSW50ZXJmYWNlLlNydlR5cEludGFsYWNlRW51bS5NTyA/IFwixIxQUFwiIDogdGhpcy5nbG9iYWxzLlRpdHVsZWtfTmtzISxcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwIC8vLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidF9ua3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBjbnQuZ2xvYmFscy5CQVJfVHlwX0luc3QgPT0gSW50ZXJmYWNlLlNydlR5cEludGFsYWNlRW51bS5NTyA/IFwiTsOhemV2IMSMUFBcIiA6IFwiTsOhemV2IFwiICsgdGhpcy5nbG9iYWxzLlRpdHVsZWtfTmtzISxcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCAvLyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW1cclxuICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hGaWVsZHM6IFtcIipkYXR1bV96bWVueV9maWx0cmFjZVwiXSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIHBvc2xlZG7DrSB6bcSbbnlcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6bWVudV9wcm92X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG9zbGVkbsOtIHptxJtudSBwcm92ZWRsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAgLy8sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdHVtX3ptZW55X2ZpbHRyYWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEYXR1bSB6bcSbbnkgZmlsdHJhY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDBcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmaW5fb2RcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogXCJmaW5fb2RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkZpbi4gb2RcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZpbl9kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcImZpbl9kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRmluLiBkb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmVhbF9vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcInJlYWxfb2RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlJlYWwuIG9kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyZWFsX2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwicmVhbF9kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUmVhbC4gZG9cIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY250Lm1haW5UYWJsZSA9ICQoXCI8ZGl2IGNsYXNzPSdqcy1TZXpuYW1Eb2tsYWR1UHJpcHJhdmFHZW5lcm92YW5pJz5cIilcclxuICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhtYWluRm9ybSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZShldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm93ID0gY250Lm1haW5UYWJsZS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucm93ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQudHJpZ2dlcihcImFkYXN1YmdyaWRyb3dzZWxlY3RlZFwiLCB7IGFnZW5kYTogNDAsIGRhdGE6IHRoYXQucm93IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogY250LmFjdGlvbnMuYWN0R3JpZERvdWJsZUNsaWNrLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJ1bihldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQucm93ID0gY3R4LmNlbGxJbmZvLmRhdGE7ICAgIC8vZGF0YSwgemUga3RlcnljaCBieWwgdnl0dm9yZW4gcmFkZWtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL30pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBHb3JkaWMuQWRhLldlYkNsaWVudC5BZGFGdW5jdGlvbi56amlzdGlfc2xvdXBjZV9zZWFyY2goY250LmdyaWRGb3JtYXRTZXpuYW0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGNudC5ncmlkRm9ybWF0U2V6bmFtLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBjbnQuemppc3RpX3Nsb3VwY2UoY250LmdyaWRGb3JtYXRTZXpuYW0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiBcIsOacGxuw71cIiwgY29sdW1uTGlzdDogdGhpcy56amlzdGlfc2xvdXBjZShjbnQuZ3JpZEZvcm1hdFNlem5hbSksIF9sb2NrZWQ6IHRydWUgfSAvL2dyaWRGb3JtYXRTZXpuYW0uY29sdW1ucy5maWx0ZXIoKGMpID0+IGMubmFtZSAhPSBcImtuaWhhXCIpLmpvaW4oKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3ZhciBmaWx0ZXJEdG86IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTZXpuYW1BZGFGaWx0ZXJEdG8gPSB7fTtcclxuICAgICAgICAgICAgLy9maWx0ZXJEdG8uc3Rhdl9heiA9IHsgbzogXCI9XCIsIHY6IHRoYXQubW9kZWxfZmlsdHIuc3Rhdl9heiB9O1xyXG4gICAgICAgICAgICAvL2ZpbHRlckR0by5peHNfZnVuX2FrdCA9IHsgbzogXCI9XCIsIHY6ICgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkuSXhzRnVuQWt0IH07XHJcbiAgICAgICAgICAgIC8vZmlsdGVyRHRvLmFrdGl2aXRhID0geyBvOiBcIklOXCIsIHY6IFsxMDAsIDMwMF0gfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHpqaXN0aV9zbG91cGNlKGdmKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZi5jb2x1bW5zLmZpbHRlcihlID0+IGUuaGlkZGVuICE9IHRydWUpLm1hcChlID0+IGUubmFtZSkuam9pbignLCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2VuZXJ1al9iYXIoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiZ2VuZXJ1amkgeiBCQVJcIik7IFxyXG5cclxuICAgICAgICAgICAgdGhpcy5pc2wuQWtjZVByaXByYXZhLmdlbmVyYXRlQkFSKHsgZmlsdGVyczoge30sIGZyYWdtZW50czogW1wiUGVybWlzc2lvbnNcIiwgXCIqXCJdIH0pLmdldFZpZXcoe30sIFwiY2lzbG8sbmF6ZXYsbmtzLHRfbmtzXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YV92aWV3KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IGRhdGFfdmlldztcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1haW5UYWJsZS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3X0lTTCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoZGF0YV92aWV3KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1bG96X2FrY2UoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciByYWRreSA9IHRoYXQudmlld19JU0wuZ2V0RGF0YVJvd3MoZmFsc2UpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gxZnDoWRreSB2IGdyaWR1IHYgcHLFr3ZvZGNpLCB2xaFlY2hueVxyXG5cclxuICAgICAgICAgICAgbGV0IGRlZkNsb3NlID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFjdHVhbEFjdGlvbjogR0FjdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGFjdHVhbEFjdGlvbiA9IHRoaXMuYWN0aW9ucy5hY3RVbG96aXQhO1xyXG5cclxuICAgICAgICAgICAgLy8gYWN0dWFsQWN0aW9uLnNldFBlbmRpbmcoMCk7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6EgdWxvxb5lbsOtIGRhdFwiKTsgXHJcblxyXG4gICAgICAgICAgICB2YXIgc2VydmljZUNvbnRlbnQgPSB0aGlzLmNyZWF0ZVNlcnZpY2VDb250ZW50KFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VIcm9tYWRuZU9wZXJhY2VUYWJcIik7ICAgICAgICAgIC8vIHNlcnZlcm92w70gb2JqZWt0XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwcm9tID0gc2VydmljZUNvbnRlbnRcclxuICAgICAgICAgICAgICAgIC5jYWxsKFwiVWxveml0UHJpcHJhdmFBa2NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2tsYWR5OiByYWRreSBcclxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXN1bHQ6IHsgcmVzdWx0OiB7IGRhdGE6IEFkYS5JbnRlcmZhY2UuR0FrY2VEdG8sIGVycm9yczogeyBtZXNzYWdlOiBzdHJpbmcgfVtdLCBraW5kOiBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kIH1bXSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmVzdWx0Lmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdFswXS5raW5kICE9IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShbXSwgXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9wZXJhY2UgbmVkb3BhZGxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdFcnJvcih7IG1lc3NhZ2U6IHJlc3VsdC5yZXN1bHRbMF0uZXJyb3JzWzBdLm1lc3NhZ2UsIHRhcmdldDogXCJoaWRkZW5cIiB9KTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvcGVyYWNlIG5lZG9wYWRsYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdFcnJvcih7IG1lc3NhZ2U6IFwiTmV6bsOhbcOhIGNoeWJhXCIsIHRhcmdldDogXCJoaWRkZW5cIiB9KTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgYWN0dWFsQWN0aW9uLnNldFBlbmRpbmcocHJvbSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9kc3RyYW5pdF9vem5hY2VuZSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciB2eWJyYW5lUmFka3kgPSB0aGF0LmZpbmQoXCIuanMtU2V6bmFtRG9rbGFkdVByaXByYXZhR2VuZXJvdmFuaVwiKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTsgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gcMWZZXMgdnlobGVkw6Fuw60gZ3JpZHUgKHDFmWVzIGNsYXNzKVxyXG4gICAgICAgICAgICBpZiAodnlicmFuZVJhZGt5Lmxlbmd0aCA+PSAxKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgZXhpc3R1amUgdnlicmFuw70gesOhem5hbVxyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHZ5YnJhbmVSYWRreSwgXCJkZWxldGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9kc3RyYW5pdF92c2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKFtdLCBcInJlc2V0XCIgKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZGV0YWlsX3JhZGt1KGVkaXRhYmxlLCBub3ZhYWtjZSkge1xyXG4gICAgICAgIC8vICAgIHZhciBjbnQgPSB0aGlzO1xyXG4gICAgICAgIC8vICAgIHZhciBsX2Npc2xvOiBTdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIC8vICAgIHZhciBsX2l4c19jaWE6IFN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgICAgIC8vICAgIHZhciB2eWJyYW5lUmFka3k6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvO1xyXG4gICAgICAgIC8vICAgIHZhciBtYW1fZGV0YWlsOiBib29sZWFuO1xyXG5cclxuICAgICAgICAvLyAgICAvLyB2eWJyYW5lUmFka3kgPSBjbnQuZmluZChcIi5qcy1TZXpuYW1Eb2tsYWR1QVpcIikuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIHDFmWVzIHZ5aGxlZMOhbsOtIGdyaWR1IChwxZllcyBjbGFzcylcclxuICAgICAgICAvLyAgICAvL2lmICh2eWJyYW5lUmFka3kubGVuZ3RoID09PSAxKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgZXhpc3R1amUgdnlicmFuw70gesOhem5hbVxyXG4gICAgICAgIC8vICAgIGlmIChub3ZhYWtjZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHZ5YnJhbmVSYWRreSA9IHt9O1xyXG4gICAgICAgIC8vICAgICAgICB2eWJyYW5lUmFka3kuY2lzbG8gPSBjbnQuZ2xvYmFscy5UZTFfTXNrX051bGE7XHJcbiAgICAgICAgLy8gICAgICAgIHZ5YnJhbmVSYWRreS5peHNfY2lhID0gXCJcIjtcclxuICAgICAgICAvLyAgICAgICAgdnlicmFuZVJhZGt5LmFrdGl2aXRhID0gSW50ZXJmYWNlLkFrdGl2aXRhQWtjZUVudW0uQWt0aXZuaTtcclxuICAgICAgICAvLyAgICAgICAgbWFtX2RldGFpbCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgIHZhciB2eWJyYW5lUmFka3lfbWV0YTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgIHZ5YnJhbmVSYWRreV9tZXRhID0gY250LmZpbmQoXCIuanMtU2V6bmFtRG9rbGFkdUFaXCIpLmdncmlkKFwiYWN0aXZlUm93XCIsIHRydWUpOyAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBwxZllcyB2eWhsZWTDoW7DrSBncmlkdSAocMWZZXMgY2xhc3MpXHJcbiAgICAgICAgLy8gICAgICAgIHZ5YnJhbmVSYWRreSA9IHZ5YnJhbmVSYWRreV9tZXRhLmRhdGE7XHJcbiAgICAgICAgLy8gICAgICAgIG1hbV9kZXRhaWwgPSAodnlicmFuZVJhZGt5X21ldGEgJiYgIXZ5YnJhbmVSYWRreV9tZXRhLl9pc1ZpcnR1YWwgJiYgdnlicmFuZVJhZGt5ICYmICh2eWJyYW5lUmFka3kuY2lzbG8gIT09IHVuZGVmaW5lZCkgJiYgKHZ5YnJhbmVSYWRreS5jaXNsbyAhPT0gXCJcIikpO1xyXG4gICAgICAgIC8vICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgaWYgKG1hbV9kZXRhaWwpIHtcclxuICAgICAgICAvLyAgICAgICAgbF9jaXNsbyA9IHZ5YnJhbmVSYWRreS5jaXNsbyE7XHJcbiAgICAgICAgLy8gICAgICAgIGxfaXhzX2NpYSA9IHZ5YnJhbmVSYWRreS5peHNfY2lhITtcclxuICAgICAgICAvLyAgICAgICAgLy8gZWRpdGFibGUgPSBlZGl0YWJsZSAmJiB2eWJyYW5lUmFka3kuYWt0aXZpdGEgPT0gSW50ZXJmYWNlLkFrdGl2aXRhQWtjZUVudW0uQWt0aXZuaTtcclxuICAgICAgICAvLyAgICAgICAgZWRpdGFibGUgPSBlZGl0YWJsZTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgIHZhciBncmlkUkMgPSBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKGNudC5tYWluVGFibGUpOyAvL3BvaHliIHBvIGdyaWR1XHJcblxyXG4gICAgICAgIC8vICAgICAgICB2YXIgZGV0YWlsd2luZG93ID0gY250Lm5hdmlnYXRlKFxyXG4gICAgICAgIC8vICAgICAgICAgICAgW1wiR29yZGljLkFkYS5XZWJDbGllbnQuR0RldGFpbEFrY2VcIiwgeyBncmlkUmVtb3RlQ29udHJvbDogbm92YWFrY2UgPT0gZmFsc2UgPyBncmlkUkMgOiBudWxsLCBncGM6IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyhjbnQuZ3BjLCB2eWJyYW5lUmFka3kuaXhzX3BsYSEpIH1dLFxyXG4gICAgICAgIC8vICAgICAgICAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGlkOiAnRGV0YWlsRG9rbGFkdSMnLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGNpc2xvOiBsX2Npc2xvLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGl4c19jaWE6IGxfaXhzX2NpYSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBSZXppbVByb3ZvenU6IHRoaXMuZ2xvYmFscy5SZXppbVByb3ZvenUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgRWRpdGFibGU6IGVkaXRhYmxlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIE5vdmFBa2NlOiBub3ZhYWtjZVxyXG4gICAgICAgIC8vICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICB2YXIgd2luZG93Q29udGVudCA9ICQuY29udGVudChkZXRhaWx3aW5kb3cpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgd2luZG93Q29udGVudC5vbihcImFkYV9zYXZlYWtjZVwiLCBmdW5jdGlvbiAocmV0VmFsKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgdmFyIGZpbHRlckR0bzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1Nlem5hbUFkYUZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy9maWx0ZXJEdG8uY2lzbG8gPSB7IHN0YXJ0OiBsX2Npc2xvLnRvU3RyaW5nKCkudHJpbSgpLCBlbmQ6IGxfY2lzbG8udG9TdHJpbmcoKS50cmltKCkgfTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vY250LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogZmlsdGVyRHRvIH0sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICBmaWx0ZXJEdG8uY2lzbG8gPSB7IHN0YXJ0OiByZXRWYWwuZGF0YS5jaXNsby50b1N0cmluZygpLnRyaW0oKSwgZW5kOiByZXRWYWwuZGF0YS5jaXNsby50b1N0cmluZygpLnRyaW0oKSB9O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgY250LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogZmlsdGVyRHRvIH0sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgd2luZG93Q29udGVudC5vbihcImFkYV9zYXZlYWtjZV9zY2h2YWxlbmlcIiwgZnVuY3Rpb24gKHJldFZhbCkge1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgIHZhciB2eWJyYW5lUmFka3lfbWV0YTtcclxuICAgICAgICAvLyAgICAgICAgICAgIHZ5YnJhbmVSYWRreV9tZXRhID0gY250LmZpbmQoXCIuanMtU2V6bmFtRG9rbGFkdUFaXCIpLmdncmlkKFwiYWN0aXZlUm93XCIsIHRydWUpOyAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBwxZllcyB2eWhsZWTDoW7DrSBncmlkdSAocMWZZXMgY2xhc3MpXHJcbiAgICAgICAgLy8gICAgICAgICAgICB2eWJyYW5lUmFka3lfbWV0YS5kYXRhLmNpc2xvID0gcmV0VmFsLmRhdGFbMF0uY2lzbG87XHJcbiAgICAgICAgLy8gICAgICAgICAgICB2eWJyYW5lUmFka3lfbWV0YS5rZXkgPSByZXRWYWwuZGF0YVswXS5yb2sgKyByZXRWYWwuZGF0YVswXS5pY28gKyByZXRWYWwuZGF0YVswXS5jaXNsbyArIHJldFZhbC5kYXRhWzBdLml4c19jaWE7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgdmFyIGZpbHRlckR0bzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1Nlem5hbUFkYUZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgZmlsdGVyRHRvLmNpc2xvID0geyBzdGFydDogcmV0VmFsLmRhdGFbMF0uY2lzbG8sIGVuZDogcmV0VmFsLmRhdGFbMF0uY2lzbG8gfTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICBjbnQudmlld19JU0wucmVxdWVzdERhdGEoeyBmaWx0ZXJzOiBmaWx0ZXJEdG8gfSwgeyB1cGRhdGVNb2RlOiBcInVwZGF0ZVwiIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICB3aW5kb3dDb250ZW50Lm9uKFwiYWRhX3NhdmVha2NlX3NldF9zdGF2X3JlYWxcIiwgZnVuY3Rpb24gKHJldFZhbCkge1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgIHZhciBmaWx0ZXJEdG86IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTZXpuYW1BZGFGaWx0ZXJEdG8gPSB7fTtcclxuICAgICAgICAvLyAgICAgICAgICAgIGZpbHRlckR0by5jaXNsbyA9IHsgc3RhcnQ6IHJldFZhbC5kYXRhWzBdLmNpc2xvLCBlbmQ6IHJldFZhbC5kYXRhWzBdLmNpc2xvIH07XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgY250LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogZmlsdGVyRHRvIH0sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgd2luZG93Q29udGVudC5vbihcImFkYV9zYXZlYWtjZV9zZXRfc3Rhdl9helwiLCBmdW5jdGlvbiAocmV0VmFsKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgdmFyIGZpbHRlckR0bzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1Nlem5hbUFkYUZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgZmlsdGVyRHRvLmNpc2xvID0geyBzdGFydDogcmV0VmFsLmRhdGFbMF0uY2lzbG8sIGVuZDogcmV0VmFsLmRhdGFbMF0uY2lzbG8gfTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICBjbnQudmlld19JU0wucmVxdWVzdERhdGEoeyBmaWx0ZXJzOiBmaWx0ZXJEdG8gfSwgeyB1cGRhdGVNb2RlOiBcInVwZGF0ZVwiIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gICAgICAgIHdpbmRvd0NvbnRlbnQuZWxlbWVudC5vbignY29udGVudGNsb3NlZCcsIChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBjbnQubWFpblRhYmxlLmdncmlkKCdmb2N1cycpO1xyXG4gICAgICAgIC8vICAgICAgICB9KTsgLy8gcMWZaSB6YXbFmWVuw60gZGV0YWlsdSBzZSBuYXN0YXbDrSBmb2N1cyBuYSBncmlkXHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgIH1cclxufVxyXG4iXX0=
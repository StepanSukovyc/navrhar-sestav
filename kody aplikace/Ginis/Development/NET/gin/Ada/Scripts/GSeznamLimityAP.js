"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GSeznamLimityAP.js                                                        </Name>
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
            let GSeznamLimityAP = class GSeznamLimityAP extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.model_filtr = { role: 0, stav_az: 0 };
                    this.title = "Správa limitů AP";
                    this.taskId = "actLimityAP"; // označení položky v taskListu
                }
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    $tab.empty();
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actNew: {
                            caption: "Nový", icon: "gi-plus",
                            enabled: ((that.globals.Param_Uloha_Limity_AP == 2 /* Gordic.Ada.Interface.TypSpravyLimityAPEnum.Ano_Editace */) || (that.globals.Param_Uloha_Limity_AP == 3 /* Gordic.Ada.Interface.TypSpravyLimityAPEnum.Ano_DlePristupu */)),
                            run: () => {
                                return that.detail_radku(true, true);
                            }
                        },
                        actDetail: {
                            icon: ((that.globals.Param_Uloha_Limity_AP == 2 /* Gordic.Ada.Interface.TypSpravyLimityAPEnum.Ano_Editace */) || (that.globals.Param_Uloha_Limity_AP == 3 /* Gordic.Ada.Interface.TypSpravyLimityAPEnum.Ano_DlePristupu */)) ? "gi-pencil" : "gi-detail",
                            caption: ((that.globals.Param_Uloha_Limity_AP == 2 /* Gordic.Ada.Interface.TypSpravyLimityAPEnum.Ano_Editace */) || (that.globals.Param_Uloha_Limity_AP == 3 /* Gordic.Ada.Interface.TypSpravyLimityAPEnum.Ano_DlePristupu */)) ? "Upravit" : "Detail",
                            primary: true,
                            run: () => {
                                return that.detail_radku(true, false);
                            }
                        },
                        actDelete: {
                            caption: "Odstranit", icon: "fa-trash",
                            enabled: ((that.globals.Param_Uloha_Limity_AP == 2 /* Gordic.Ada.Interface.TypSpravyLimityAPEnum.Ano_Editace */) || (that.globals.Param_Uloha_Limity_AP == 3 /* Gordic.Ada.Interface.TypSpravyLimityAPEnum.Ano_DlePristupu */)),
                            run: () => {
                                return that.smazani_radku();
                            }
                        },
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
                    this.menuBar(this.actions.createBar(["actNew*", "actDetail*", "actDelete*"]));
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
                    //            //if (obj.flags.noChange) return;
                    //            //var akt_role_i = 0
                    //            //var init_value_i = 0;
                    //            //akt_role_i = obj.value?.id ?? 0;
                    //            //var pole_serverFiltr_i = new Array();
                    //            //if (akt_role_i == 0) {
                    //            //    pole_serverFiltr_i = [0, 2, 3, 1];
                    //            //    init_value_i = 0;
                    //            //}
                    //            //if (akt_role_i == 1) {
                    //            //    pole_serverFiltr_i = [2, 3, 1];
                    //            //    init_value_i = 2;
                    //            //}
                    //            //if (akt_role_i == 2) {
                    //            //    pole_serverFiltr_i = [0, 2, 1];
                    //            //    init_value_i = 2;
                    //            //}
                    //            //$(this).gform().findFields("stav_az_f").gfield("option", "serverFilters", { stav_az: pole_serverFiltr_i });
                    //            //$(this).gform().findFields("stav_az_f").gfield("setValue", { stav_az: init_value_i }, {valid : false});
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
                    ////filterFormDef
                    ////    .addRow("Stav AZ").addField("gselectbox", Gordic.Prefabs.Select.srvcsaz(), {
                    ////        name: "stav_az", model: "model.stav_az=value.stav_az", multi: true, list: true, itemWidth: ""
                    ////    });
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
                    //            if (that.model_filtr && that.model_filtr.role != null )
                    //            {
                    //                var filterDto: Gordic.Ada.Interface.GSeznamAdaFilterDto = {};
                    //                filterDto.aktivita = { o: "IN", v: [100, 300] };
                    //                if (that.model_filtr.role == 0) {
                    //                    filterDto.ixs_fun_akt = { o: "=", v: ($.content("main") as any).IxsFunAkt };
                    //                    filterDto.ixs_fun_az = null;
                    //                    filterDto.komp = null;
                    //                };
                    //                if (that.model_filtr.role == 1) {
                    //                    filterDto.ixs_fun_akt = null;
                    //                    filterDto.ixs_fun_az = null;
                    //                    filterDto.komp = { o: "=", v: ($.content("main") as any).IxsFunAkt };
                    //                };
                    //                if (that.model_filtr.role == 2) {
                    //                    filterDto.ixs_fun_akt = null;
                    //                    filterDto.ixs_fun_az = { o: "=", v: ($.content("main") as any).IxsFunAkt };
                    //                    filterDto.komp = null;
                    //                };
                    //                if (that.model_filtr && that.model_filtr.stav_az != null) {
                    //                    filterDto.stav_az = { o: "=", v: that.model_filtr.stav_az };
                    //                }
                    //                console.log("role", that.model_filtr.role);
                    //                console.log("filterDto", filterDto);
                    //                that.view_ISL.requestData({ filters: filterDto });
                    //            }
                    //        }
                    //    });
                    cnt.gridFormatSeznam = new Gordic.Data.GridFormat();
                    //cnt.gridFormatSeznam.addNumberColumn({
                    //    name: "jsem_spravce",
                    //    caption: "S",
                    //    tooltipTemplate: "jsem_spravce",
                    //    customClass: "dt-center",
                    //    width: 60
                    //});
                    //cnt.gridFormatSeznam.addIconColumn({
                    //    name: "aktivita",
                    //    field: "aktivita",
                    //    caption: "Stav",
                    //    //hidden: this.globals.Param_Akce_AutSchv == Interface.TypAutomatSchvaleniNovaAkceEnum.NeSprocesem,
                    //    // width: 25,
                    //    formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                    //    iconTemplate: function (data) {
                    //        switch (data.aktivita) {
                    //            case Interface.AktivitaAkceEnum.Aktivni: return { icon: "fa-check-circle-o g-state-success g-state-text", text: "Aktivní", caption: "Aktivní", tooltip: "Aktivní" };
                    //            case Interface.AktivitaAkceEnum.Navrh: return { icon: "fa-check-circle g-state-warning g-state-text", text: "Návrh", caption: "Návrh", tooltip: "Návrh" };
                    //            case Interface.AktivitaAkceEnum.Neaktivni: return { icon: "fa-trash g-state-error g-state-text", text: "Neaktivní", caption: "Neaktivní", tooltip: "Neaktivní" };
                    //            case Interface.AktivitaAkceEnum.Zrusena: return { icon: "fa-trash g-state-error g-state-text", text: "Stornovaná", caption: "Stornovaná", tooltip: "Stornovaná" };
                    //            default: return null;
                    //        }
                    //    }
                    //})
                    cnt.gridFormatSeznam.addTextColumn({
                        name: "id_tzd",
                        caption: "ID TZS",
                        customClass: "dt-left",
                        width: 120,
                    });
                    cnt.gridFormatSeznam.addTextColumn({
                        name: "nazev_tzd",
                        caption: "Název TZS",
                        customClass: "dt-left",
                        width: 150,
                    });
                    cnt.gridFormatSeznam.addTextColumn({
                        name: "id_vyb",
                        caption: "ID VYB",
                        customClass: "dt-left",
                        width: 120,
                    });
                    cnt.gridFormatSeznam.addTextColumn({
                        name: "nazev_vyb",
                        caption: "Název VYB",
                        customClass: "dt-left",
                        width: 150,
                    });
                    cnt.gridFormatSeznam.addTextColumn({
                        name: "id_eds",
                        caption: "ID EDS",
                        customClass: "dt-left",
                        width: 120,
                    });
                    cnt.gridFormatSeznam.addTextColumn({
                        name: "nazev_eds",
                        caption: "Název EDS",
                        customClass: "dt-left",
                        width: 150,
                    });
                    cnt.gridFormatSeznam.addNumberColumn({
                        name: "rok_lim",
                        caption: "Rok limitu",
                        tooltipTemplate: "rok_lim",
                        customClass: "dt-center",
                        width: 60
                    });
                    cnt.gridFormatSeznam.addCurrencyColumn({
                        name: "c_limit",
                        field: "c_limit",
                        caption: "Limit",
                        width: WebClient.AdaConst.sirkaCastky
                    });
                    cnt.gridFormatSeznam.addCurrencyColumn({
                        name: "c_limit_vaz",
                        field: "c_limit_vaz",
                        caption: "Vázáno",
                        width: WebClient.AdaConst.sirkaCastky
                    });
                    cnt.gridFormatSeznam.addCurrencyColumn({
                        name: "c_limit_nevaz",
                        field: "c_limit_nevaz",
                        caption: "Nevázáno",
                        width: WebClient.AdaConst.sirkaCastky
                    });
                    cnt.gridFormatSeznam.addCurrencyColumn({
                        name: "c_mozno_zaplanovat",
                        field: "c_mozno_zaplanovat",
                        caption: "Možno vázat",
                        width: WebClient.AdaConst.sirkaCastky
                    });
                    cnt.gridFormatSeznam
                        .addDateTimeColumn({
                        name: "dat_zmena",
                        searchFields: ["*datum_zmeny_filtrace"],
                        caption: "Datum poslední změny",
                        customClass: "dt-left",
                        width: 140,
                    });
                    cnt.gridFormatSeznam
                        .addTextColumn({
                        name: "zmenu_prov_txt",
                        caption: "Poslední změnu provedl",
                        customClass: "dt-left",
                        width: 200 //,
                    });
                    cnt.mainTable = $("<div class='js-SeznamLimitu'>")
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
                    var moje_ixs_fun = $.content("main").IxsFunAkt;
                    var l_ser_fil = (that.globals.Param_Uloha_Limity_AP == 3 /* Gordic.Ada.Interface.TypSpravyLimityAPEnum.Ano_DlePristupu */) ? { ixs_fun: moje_ixs_fun } : {};
                    that.view_ISL = new Gordic.Isl.View(this.isl.LimityAP.list({ filters: l_ser_fil, fragments: ["Permissions", "*"] }));
                    cnt.mainTable.ggrid("setData", that.view_ISL);
                }
                zjisti_sloupce(gf) {
                    return gf.columns.filter(e => e.hidden != true).map(e => e.name).join(',');
                }
                smazani_radku() {
                    var that = this;
                    if ((that.row != undefined) && (that.row != null)) {
                        that.dialogs.messageBox("Dotaz", "Opravdu odstranit záznam?", Gordic.Ada.WebClient.AdaConst.mbbYesNoNegativ, GDlg.mbiQuestion)
                            .on("yes", function () {
                            that.isl.LimityAP.read({ data: that.row })
                                .getData()
                                .done(function (new_data2) {
                                that.isl.LimityAP.delete({ data: new_data2 })
                                    .get()
                                    .then(function (response) {
                                    that.view_ISL.updateData(response.data, "delete");
                                })
                                    .fail(function () {
                                });
                            });
                        });
                    }
                }
                detail_radku(editable, novaakce) {
                    var that = this;
                    if (novaakce == false) {
                        if ((that.row != undefined) && (that.row != null)) {
                            that.isl.LimityAP.read({ data: that.row })
                                .getData()
                                .done(function (new_data2) {
                                var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GSeznamLimityAPDetail", { modelLimitAP: new_data2, uid: "GSeznamLimityAPDetail#" }, "Detail limitu AP", 350, 300, true); // zobrazení modálního Tabu
                                $(l_oDiv).on('close', function (ev, ctx) {
                                    if ((ctx != undefined) && (ctx != null)) {
                                        var akt_data = ctx.data;
                                        if (akt_data != null) {
                                            that.isl.LimityAP.update({ data: ctx.data })
                                                .get()
                                                .then(function (response) {
                                                that.view_ISL.updateData(response.data, "update");
                                            })
                                                .fail(function () {
                                            });
                                        }
                                    }
                                });
                            });
                        }
                    }
                    else {
                        var novy_zaznam = {};
                        novy_zaznam.rok = parseInt(that.gpc.rok);
                        novy_zaznam.ico = that.gpc.ico;
                        //novy_zaznam.id_tzd = null;
                        //novy_zaznam.id_vyb = null;
                        //novy_zaznam.id_eds = null;
                        novy_zaznam.aktivita = 100;
                        var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GSeznamLimityAPDetail", { modelLimitAP: novy_zaznam, uid: "GSeznamLimityAPDetail#" }, "Nový limit AP", 350, 300, true); // zobrazení modálního Tabu
                        $(l_oDiv).on('close', function (ev, ctx) {
                            if ((ctx != undefined) && (ctx != null)) {
                                var akt_data = ctx.data;
                                if (akt_data != null) {
                                    that.isl.LimityAP.create({ data: ctx.data })
                                        .get()
                                        .then(function (response) {
                                        that.view_ISL.updateData(response.data, "update");
                                    })
                                        .fail(function () {
                                    });
                                }
                            }
                        });
                    }
                }
            };
            GSeznamLimityAP = __decorate([
                gcontent
            ], GSeznamLimityAP);
            WebClient.GSeznamLimityAP = GSeznamLimityAP;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUxpbWl0eUFQLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJTY3JpcHRzL0dTZXpuYW1MaW1pdHlBUC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7RUFPRTs7Ozs7OztBQUVGLElBQVUsTUFBTSxDQTJiZjtBQTNiRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EyYm5CO0lBM2JnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EyYjdCO1FBM2JvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkFBakQ7O29CQWFZLGdCQUFXLEdBQUcsRUFBRSxJQUFJLEVBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRyxDQUFDLEVBQUUsQ0FBQztvQkFFaEQsVUFBSyxHQUFHLGtCQUFrQixDQUFDO29CQUMzQixXQUFNLEdBQUcsYUFBYSxDQUFDLENBQUMsK0JBQStCO2dCQXNhM0QsQ0FBQztnQkFwYUcsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRTlCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFYixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBRWYsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWxJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixNQUFNLEVBQUU7NEJBQ0osT0FBTyxF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LE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzs0QkFDbkMsSUFBSSxDQUFDLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDO2dDQUN0QyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSyxDQUFDO2dDQUN6QixJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQ0FDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFLLEVBQUUsQ0FBQzt5Q0FDeEMsR0FBRyxFQUFFO3lDQUNMLElBQUksQ0FBQyxVQUFVLFFBQVE7d0NBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7b0NBQ3RELENBQUMsQ0FBQzt5Q0FDRCxJQUFJLENBQUM7b0NBQ04sQ0FBQyxDQUFDLENBQUM7Z0NBQ1gsQ0FBQzs0QkFDTCxDQUFDO3dCQUNMLENBQUMsQ0FBQyxDQUFDO29CQUVQLENBQUM7Z0JBRUwsQ0FBQzthQUVKLENBQUE7WUF0YlksZUFBZTtnQkFEM0IsUUFBUTtlQUNJLGVBQWUsQ0FzYjNCO1lBdGJZLHlCQUFlLGtCQXNiM0IsQ0FBQTtRQUNMLENBQUMsRUEzYm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTJiN0I7SUFBRCxDQUFDLEVBM2JnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEyYm5CO0FBQUQsQ0FBQyxFQTNiUyxNQUFNLEtBQU4sTUFBTSxRQTJiZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIS8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQWRhLldlYkNsaWVudC5HU2V6bmFtTGltaXR5QVAuanMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBHQWtjZVVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSBJbGXEjWVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxNi0wMy0wMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG4qL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5BZGEuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbUxpbWl0eUFQIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZkbGltRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU2V6bmFtQWRhRmlsdGVyRHRvO1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZEZvcm1hdFNlem5hbTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZUR0bz47XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZ2xvYmFsczogR29yZGljLkFkYS5XZWJDbGllbnQuRFRPLkdBZGFHbG9iYWxzRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIGZpbHRlckZvcm06IEpRdWVyeTtcclxuICAgICAgICBwcml2YXRlIG1haW5UYWJsZTogSlF1ZXJ5O1xyXG5cclxuICAgICAgICBwcml2YXRlIG1vZGVsX2ZpbHRyID0geyByb2xlIDogMCwgc3Rhdl9heiA6IDAgfTtcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcIlNwcsOhdmEgbGltaXTFryBBUFwiO1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0TGltaXR5QVBcIjsgLy8gb3puYcSNZW7DrSBwb2xvxb5reSB2IHRhc2tMaXN0dVxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyICR0YWIgPSAkKHRoaXMuY29udGVudERpdik7XHJcblxyXG4gICAgICAgICAgICAkdGFiLmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY250ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBtYWluRm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwic2V0dXBcIiwgeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIgfSkuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE5ldzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w71cIiwgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogKCh0aGF0Lmdsb2JhbHMuUGFyYW1fVWxvaGFfTGltaXR5X0FQID09IEdvcmRpYy5BZGEuSW50ZXJmYWNlLlR5cFNwcmF2eUxpbWl0eUFQRW51bS5Bbm9fRWRpdGFjZSkgfHwgKHRoYXQuZ2xvYmFscy5QYXJhbV9VbG9oYV9MaW1pdHlfQVAgPT0gR29yZGljLkFkYS5JbnRlcmZhY2UuVHlwU3ByYXZ5TGltaXR5QVBFbnVtLkFub19EbGVQcmlzdHVwdSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kZXRhaWxfcmFka3UodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdERldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICgodGhhdC5nbG9iYWxzLlBhcmFtX1Vsb2hhX0xpbWl0eV9BUCA9PSBHb3JkaWMuQWRhLkludGVyZmFjZS5UeXBTcHJhdnlMaW1pdHlBUEVudW0uQW5vX0VkaXRhY2UpIHx8ICh0aGF0Lmdsb2JhbHMuUGFyYW1fVWxvaGFfTGltaXR5X0FQID09IEdvcmRpYy5BZGEuSW50ZXJmYWNlLlR5cFNwcmF2eUxpbWl0eUFQRW51bS5Bbm9fRGxlUHJpc3R1cHUpKSA/IFwiZ2ktcGVuY2lsXCIgOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246ICgodGhhdC5nbG9iYWxzLlBhcmFtX1Vsb2hhX0xpbWl0eV9BUCA9PSBHb3JkaWMuQWRhLkludGVyZmFjZS5UeXBTcHJhdnlMaW1pdHlBUEVudW0uQW5vX0VkaXRhY2UpIHx8ICh0aGF0Lmdsb2JhbHMuUGFyYW1fVWxvaGFfTGltaXR5X0FQID09IEdvcmRpYy5BZGEuSW50ZXJmYWNlLlR5cFNwcmF2eUxpbWl0eUFQRW51bS5Bbm9fRGxlUHJpc3R1cHUpKSA/IFwiVXByYXZpdFwiIDogXCJEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kZXRhaWxfcmFka3UodHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3REZWxldGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9kc3RyYW5pdFwiLCBpY29uOiBcImZhLXRyYXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogKCh0aGF0Lmdsb2JhbHMuUGFyYW1fVWxvaGFfTGltaXR5X0FQID09IEdvcmRpYy5BZGEuSW50ZXJmYWNlLlR5cFNwcmF2eUxpbWl0eUFQRW51bS5Bbm9fRWRpdGFjZSkgfHwgKHRoYXQuZ2xvYmFscy5QYXJhbV9VbG9oYV9MaW1pdHlfQVAgPT0gR29yZGljLkFkYS5JbnRlcmZhY2UuVHlwU3ByYXZ5TGltaXR5QVBFbnVtLkFub19EbGVQcmlzdHVwdSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5zbWF6YW5pX3JhZGt1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0R3JpZERvdWJsZUNsaWNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRoYXQuZ2xvYmFscy5QYXJhbV9Ba2NlX0VkaXRhY2VfVFAsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRldGFpbF9yYWRrdShmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbWVudUJhcnVcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0TmV3KlwiLCBcImFjdERldGFpbCpcIiwgXCJhY3REZWxldGUqXCJdKSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBmaWx0ZXJGb3JtRGVmID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwiS29tcGxldG7DrSBmaWx0clwiLCBsYXlvdXREZXNjcmlwdG9yOiBcInctTC05IHctTS05IHctUy0xMlwiIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRTZWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAvL2ZpbHRlckZvcm1EZWZcclxuICAgICAgICAgICAgLy8gICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcInJvbGVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIG1vZGVsOiBcIm1vZGVsLnJvbGU9dmFsdWUuaWRcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIG11bHRpOiBmYWxzZSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpbml0aWFsVmFsdWU6IHsgaWQ6IDAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGl0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9pZiAob2JqLmZsYWdzLm5vQ2hhbmdlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vdmFyIGFrdF9yb2xlX2kgPSAwXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy92YXIgaW5pdF92YWx1ZV9pID0gMDtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL2FrdF9yb2xlX2kgPSBvYmoudmFsdWU/LmlkID8/IDA7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy92YXIgcG9sZV9zZXJ2ZXJGaWx0cl9pID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vaWYgKGFrdF9yb2xlX2kgPT0gMCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgIHBvbGVfc2VydmVyRmlsdHJfaSA9IFswLCAyLCAzLCAxXTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICBpbml0X3ZhbHVlX2kgPSAwO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL2lmIChha3Rfcm9sZV9pID09IDEpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICBwb2xlX3NlcnZlckZpbHRyX2kgPSBbMiwgMywgMV07XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgaW5pdF92YWx1ZV9pID0gMjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9pZiAoYWt0X3JvbGVfaSA9PSAyKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgcG9sZV9zZXJ2ZXJGaWx0cl9pID0gWzAsIDIsIDFdO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgIGluaXRfdmFsdWVfaSA9IDI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJzdGF2X2F6X2ZcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiLCB7IHN0YXZfYXo6IHBvbGVfc2VydmVyRmlsdHJfaSB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwic3Rhdl9hel9mXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgc3Rhdl9hejogaW5pdF92YWx1ZV9pIH0sIHt2YWxpZCA6IGZhbHNlfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBkYXRhOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIG5ldyBHb3JkaWMuRGF0YS5WaWV3KFtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgeyBuYXpldjogXCJacHJhY292YXRlbFwiLCBpZDogMCB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB7IG5hemV2OiBcIktvbXBldGVudFwiLCBpZDogMSB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB7IG5hemV2OiBcIkZpbmFuxI1uw60ga29tcGV0ZW50IEFaXCIsIGlkOiAyIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBdLCB7IGtleTogXCJpZFwiIH0pXHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9maWx0ZXJGb3JtRGVmXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNydmNzYXooKSwge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJzdGF2X2F6X2ZcIiwgbW9kZWw6IFwibW9kZWwuc3Rhdl9hej12YWx1ZS5zdGF2X2F6XCIsIG11bHRpOiBmYWxzZSwgbGlzdDogdHJ1ZSwgaXRlbVdpZHRoOiBcIlwiLCBkaXNhYmxlZDogZmFsc2UsIGluaXRpYWxWYWx1ZTogeyBzdGF2X2F6OiAwIH0sIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIGF1dG9tYXRpY2vDqSBuYcSNdGVuw60gcG8gem3Em27EmyBob2Rub3R5XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKG9iai5mbGFncy5pc0tvbnRyb2xuaURpdiB8fCBvYmouZmxhZ3Mubm9DaGFuZ2UpIHJldHVybjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBsZXQgZHRvID0ge307XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5maWx0ZXJGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGR0byk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5maWx0ZXJGb3JtIS5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiLCBkdG8pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLy8vZmlsdGVyRm9ybURlZlxyXG4gICAgICAgICAgICAvLy8vICAgIC5hZGRSb3coXCJTdGF2IEFaXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3J2Y3NheigpLCB7XHJcbiAgICAgICAgICAgIC8vLy8gICAgICAgIG5hbWU6IFwic3Rhdl9helwiLCBtb2RlbDogXCJtb2RlbC5zdGF2X2F6PXZhbHVlLnN0YXZfYXpcIiwgbXVsdGk6IHRydWUsIGxpc3Q6IHRydWUsIGl0ZW1XaWR0aDogXCJcIlxyXG4gICAgICAgICAgICAvLy8vICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC5maWx0ZXJGb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKG1haW5Gb3JtKVxyXG4gICAgICAgICAgICAvLyAgICAuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vIGRlZmF1bHQgcHJvIEVLT1xyXG4gICAgICAgICAgICAvLyAgICAgICAgZmlsdGVyVmlld01vZGVVc2VyU2V0dGluZ3M6IFtGaWx0ZXJWaWV3TW9kZS5TaW1wbGVdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vcG9PdGV2cmVuaU90ZXZyaXRQYW5lbFBvZG1pbmVrOiBmYWxzZSwgICAgIC8vIGRlZmF1bHQgcHJvIHXFvml2YXRlbHNrw6kgbmFzdGF2ZW7DrVxyXG4gICAgICAgICAgICAvLyAgICAgICAgcG9WeWhsZWRhbmlab2JyYXppdDogXCJWeWhsZWRhbmVQb2RtaW5reVZCYWRnZVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgYXV0b0xvYWRBZnRlckNob3NlRmlsdGVyOiBmYWxzZSwgICAgICAgIC8vIEF1dG9tYXRpY2vDqSB2eWhsZWTDoW7DrSBwbyB6bcSbbsSbIHVsb8W+ZW7DqWhvXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjbGVhckZpbHRlckJ1dHRvblZpc2libGU6IFwiTmV2ZXJWaXNpYmxlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBkZXRhaWxBY3Rpb25Bc0NoZWNrYm94OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vaWRTaW1wbGVNb2RlOlwiaWRTaW1wbGVNb2RlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBmb3JtczogW2ZpbHRlckZvcm1EZWZdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gVE9ETzogYnVkZSBuxJtqYWvDqSBsZXDFocOtIHVrbMOhZGFjw60gb2tubyBuZWJvIGJ1ZHUgbXVzZXQgdWTEm2xhdCBzdm9qZSBhIG5hc3Rhdml0IGhvIGRvIHNhdmVPcHRpb25zRm9ybT9cclxuICAgICAgICAgICAgLy8gICAgICAgIGZhdm9yaXRlczogW1wicm9sZVwiLCBcInN0YXZfYXpcIl0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBmYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IFwiTDRNM1MxXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBUT0RPOiB6xa9zdGFuZSB0b2hsZSB0w6ltYSBuZWJvIGJ1ZGUgcHJvIExLIGppbsOpIG5lxb4gcHJvIFRLP1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdGVtYTogXCJhZGFfcHRtX2FkYWJhczJcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGZpbHRlclN0b3JhZ2VTZXJ2aWNlOiBuZXcgR29yZGljLkdpbi5GaWx0ZXJTdG9yYWdlU2VydmljZS5TdG9yZSgpLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgc2F2ZU9wdGlvbnNGb3JtOiBcImVrb1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gc3RyaWN0U3RvcEF1dG9Mb2FkOiB0cnVlLCAgICAgICAgICAgICAgIC8vIFN0cmlrdG7EmyB6YWvDocW+ZSBhdXRvbWF0aWNrw6kgbmHEjXRlbsOtIGhuZWQgcG8gb3RldsWZZW7DrSBzZXpuYW11LCBvYmzDrWJlbsO9IGZpbHRyIHNlIHBvdXplIHDFmWVkcGxuw60uXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyB0ZXh0SXRlbVRlbXBsYXRlOiBcIntkZXNjcmlwdGlvbn1cIixcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBhcHBseTogZnVuY3Rpb24gKGV2ZW50LCBvYmopIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0IHBvZGxlIGZpbHRyxa9cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0Lm1vZGVsX2ZpbHRyID0gb2JqLmZpbHRlcjtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxfZmlsdHIgJiYgdGhhdC5tb2RlbF9maWx0ci5yb2xlICE9IG51bGwgKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdmFyIGZpbHRlckR0bzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1Nlem5hbUFkYUZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uYWt0aXZpdGEgPSB7IG86IFwiSU5cIiwgdjogWzEwMCwgMzAwXSB9O1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxfZmlsdHIucm9sZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2Z1bl9ha3QgPSB7IG86IFwiPVwiLCB2OiAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCB9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLml4c19mdW5fYXogPSBudWxsO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLmtvbXAgPSBudWxsO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxfZmlsdHIucm9sZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2Z1bl9ha3QgPSBudWxsO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLml4c19mdW5fYXogPSBudWxsO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLmtvbXAgPSB7IG86IFwiPVwiLCB2OiAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCB9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxfZmlsdHIucm9sZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2Z1bl9ha3QgPSBudWxsO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLml4c19mdW5fYXogPSB7IG86IFwiPVwiLCB2OiAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCB9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLmtvbXAgPSBudWxsO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxfZmlsdHIgJiYgdGhhdC5tb2RlbF9maWx0ci5zdGF2X2F6ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5zdGF2X2F6ID0geyBvOiBcIj1cIiwgdjogdGhhdC5tb2RlbF9maWx0ci5zdGF2X2F6IH07XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicm9sZVwiLCB0aGF0Lm1vZGVsX2ZpbHRyLnJvbGUpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbHRlckR0b1wiLCBmaWx0ZXJEdG8pO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC5yZXF1ZXN0RGF0YSh7IGZpbHRlcnM6IGZpbHRlckR0byB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW0gPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZUR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIC8vY250LmdyaWRGb3JtYXRTZXpuYW0uYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJqc2VtX3NwcmF2Y2VcIixcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJTXCIsXHJcbiAgICAgICAgICAgIC8vICAgIHRvb2x0aXBUZW1wbGF0ZTogXCJqc2VtX3NwcmF2Y2VcIixcclxuICAgICAgICAgICAgLy8gICAgY3VzdG9tQ2xhc3M6IFwiZHQtY2VudGVyXCIsXHJcbiAgICAgICAgICAgIC8vICAgIHdpZHRoOiA2MFxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgLy9jbnQuZ3JpZEZvcm1hdFNlem5hbS5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAvLyAgICBmaWVsZDogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIlN0YXZcIixcclxuICAgICAgICAgICAgLy8gICAgLy9oaWRkZW46IHRoaXMuZ2xvYmFscy5QYXJhbV9Ba2NlX0F1dFNjaHYgPT0gSW50ZXJmYWNlLlR5cEF1dG9tYXRTY2h2YWxlbmlOb3ZhQWtjZUVudW0uTmVTcHJvY2VzZW0sXHJcbiAgICAgICAgICAgIC8vICAgIC8vIHdpZHRoOiAyNSxcclxuICAgICAgICAgICAgLy8gICAgZm9ybWF0UHJlc2V0OiBHb3JkaWMuR2xvYmFsLkVudW1zLkdyaWRDb2x1bW5Gb3JtYXRJY29uLmljb24sXHJcbiAgICAgICAgICAgIC8vICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHN3aXRjaCAoZGF0YS5ha3Rpdml0YSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLkFrdGl2aXRhQWtjZUVudW0uQWt0aXZuaTogcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUtbyBnLXN0YXRlLXN1Y2Nlc3MgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiQWt0aXZuw61cIiwgY2FwdGlvbjogXCJBa3Rpdm7DrVwiLCB0b29sdGlwOiBcIkFrdGl2bsOtXCIgfTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjYXNlIEludGVyZmFjZS5Ba3Rpdml0YUFrY2VFbnVtLk5hdnJoOiByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXdhcm5pbmcgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiTsOhdnJoXCIsIGNhcHRpb246IFwiTsOhdnJoXCIsIHRvb2x0aXA6IFwiTsOhdnJoXCIgfTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjYXNlIEludGVyZmFjZS5Ba3Rpdml0YUFrY2VFbnVtLk5lYWt0aXZuaTogcmV0dXJuIHsgaWNvbjogXCJmYS10cmFzaCBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIk5lYWt0aXZuw61cIiwgY2FwdGlvbjogXCJOZWFrdGl2bsOtXCIsIHRvb2x0aXA6IFwiTmVha3Rpdm7DrVwiIH07XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuQWt0aXZpdGFBa2NlRW51bS5acnVzZW5hOiByZXR1cm4geyBpY29uOiBcImZhLXRyYXNoIGctc3RhdGUtZXJyb3IgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiU3Rvcm5vdmFuw6FcIiwgY2FwdGlvbjogXCJTdG9ybm92YW7DoVwiLCB0b29sdGlwOiBcIlN0b3Jub3ZhbsOhXCIgfTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30pXHJcblxyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbS5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpZF90emRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiSUQgVFpTXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW0uYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZfdHpkXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk7DoXpldiBUWlNcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbS5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpZF92eWJcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiSUQgVllCXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW0uYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZfdnliXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk7DoXpldiBWWUJcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbS5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpZF9lZHNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiSUQgRURTXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW0uYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZfZWRzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk7DoXpldiBFRFNcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW0uYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rX2xpbVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSb2sgbGltaXR1XCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwVGVtcGxhdGU6IFwicm9rX2xpbVwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNjBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbS5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfbGltaXRcIixcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBcImNfbGltaXRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTGltaXRcIixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBBZGFDb25zdC5zaXJrYUNhc3RreVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW0uYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX2xpbWl0X3ZhelwiLFxyXG4gICAgICAgICAgICAgICAgZmllbGQ6IFwiY19saW1pdF92YXpcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVsOhesOhbm9cIixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBBZGFDb25zdC5zaXJrYUNhc3RreVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW0uYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX2xpbWl0X25ldmF6XCIsXHJcbiAgICAgICAgICAgICAgICBmaWVsZDogXCJjX2xpbWl0X25ldmF6XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5ldsOhesOhbm9cIixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBBZGFDb25zdC5zaXJrYUNhc3RreVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW0uYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX21vem5vX3phcGxhbm92YXRcIixcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBcImNfbW96bm9femFwbGFub3ZhdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJNb8W+bm8gdsOhemF0XCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogQWRhQ29uc3Quc2lya2FDYXN0a3lcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEZpZWxkczogW1wiKmRhdHVtX3ptZW55X2ZpbHRyYWNlXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGF0dW0gcG9zbGVkbsOtIHptxJtueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6bWVudV9wcm92X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG9zbGVkbsOtIHptxJtudSBwcm92ZWRsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAgLy8sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGNudC5tYWluVGFibGUgPSAkKFwiPGRpdiBjbGFzcz0nanMtU2V6bmFtTGltaXR1Jz5cIilcclxuICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhtYWluRm9ybSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZShldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm93ID0gY250Lm1haW5UYWJsZS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucm93ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQudHJpZ2dlcihcImFkYXN1YmdyaWRyb3dzZWxlY3RlZFwiLCB7IGFnZW5kYTogNDAsIGRhdGE6IHRoYXQucm93IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogY250LmFjdGlvbnMuYWN0R3JpZERvdWJsZUNsaWNrLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJ1bihldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQucm93ID0gY3R4LmNlbGxJbmZvLmRhdGE7ICAgIC8vZGF0YSwgemUga3RlcnljaCBieWwgdnl0dm9yZW4gcmFkZWtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL30pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBHb3JkaWMuQWRhLldlYkNsaWVudC5BZGFGdW5jdGlvbi56amlzdGlfc2xvdXBjZV9zZWFyY2goY250LmdyaWRGb3JtYXRTZXpuYW0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGNudC5ncmlkRm9ybWF0U2V6bmFtLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBjbnQuemppc3RpX3Nsb3VwY2UoY250LmdyaWRGb3JtYXRTZXpuYW0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy97IG5hbWU6IFwiWmplZG5vZHXFoWVuw71cIiwgY29sdW1uTGlzdDogXCJ6cHJhY292YXRlbCwgYWt0aXZpdGEsIGNpc2xvLCBuYXpldiwgY18yXzNfN184XzIzXzI1LCBjXzZfMTgsIGNfMCwgY196Ynl2YV9jZXJwYXQsIGNlcnBhbm9fcHJvY1wiLCBfbG9ja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCLDmnBsbsO9XCIsIGNvbHVtbkxpc3Q6IHRoaXMuemppc3RpX3Nsb3VwY2UoY250LmdyaWRGb3JtYXRTZXpuYW0pLCBfbG9ja2VkOiB0cnVlIH0gLy9ncmlkRm9ybWF0U2V6bmFtLmNvbHVtbnMuZmlsdGVyKChjKSA9PiBjLm5hbWUgIT0gXCJrbmloYVwiKS5qb2luKCkgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbW9qZV9peHNfZnVuID0gKCQuY29udGVudChcIm1haW5cIikgYXMgYW55KS5JeHNGdW5Ba3Q7XHJcbiAgICAgICAgICAgIHZhciBsX3Nlcl9maWwgPSAodGhhdC5nbG9iYWxzLlBhcmFtX1Vsb2hhX0xpbWl0eV9BUCA9PSBHb3JkaWMuQWRhLkludGVyZmFjZS5UeXBTcHJhdnlMaW1pdHlBUEVudW0uQW5vX0RsZVByaXN0dXB1KSA/IHsgaXhzX2Z1bjogbW9qZV9peHNfZnVuIH0gOiB7fTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoaXMuaXNsLkxpbWl0eUFQLmxpc3QoeyBmaWx0ZXJzOiBsX3Nlcl9maWwsIGZyYWdtZW50czogW1wiUGVybWlzc2lvbnNcIiwgXCIqXCJdIH0pKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNudC5tYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld19JU0wpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHpqaXN0aV9zbG91cGNlKGdmKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZi5jb2x1bW5zLmZpbHRlcihlID0+IGUuaGlkZGVuICE9IHRydWUpLm1hcChlID0+IGUubmFtZSkuam9pbignLCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc21hemFuaV9yYWRrdSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKCh0aGF0LnJvdyAhPSB1bmRlZmluZWQpICYmICh0aGF0LnJvdyAhPSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJEb3RhelwiLCBcIk9wcmF2ZHUgb2RzdHJhbml0IHrDoXpuYW0/XCIsIEdvcmRpYy5BZGEuV2ViQ2xpZW50LkFkYUNvbnN0Lm1iYlllc05vTmVnYXRpdiwgR0RsZy5tYmlRdWVzdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5MaW1pdHlBUC5yZWFkKHsgZGF0YTogdGhhdC5yb3chIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAobmV3X2RhdGEyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuTGltaXR5QVAuZGVsZXRlKHsgZGF0YTogbmV3X2RhdGEyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcImRlbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBkZXRhaWxfcmFka3UoZWRpdGFibGUsIG5vdmFha2NlKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKG5vdmFha2NlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHRoYXQucm93ICE9IHVuZGVmaW5lZCkgJiYgKHRoYXQucm93ICE9IG51bGwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuTGltaXR5QVAucmVhZCh7IGRhdGE6IHRoYXQucm93IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKG5ld19kYXRhMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxfb0RpdiA9IHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HU2V6bmFtTGltaXR5QVBEZXRhaWxcIiwgeyBtb2RlbExpbWl0QVA6IG5ld19kYXRhMiwgdWlkOiBcIkdTZXpuYW1MaW1pdHlBUERldGFpbCNcIiB9LCBcIkRldGFpbCBsaW1pdHUgQVBcIiwgMzUwLCAzMDAsIHRydWUpOyAgICAvLyB6b2JyYXplbsOtIG1vZMOhbG7DrWhvIFRhYnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQobF9vRGl2KS5vbignY2xvc2UnLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY3R4ICE9IHVuZGVmaW5lZCkgJiYgKGN0eCAhPSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWt0X2RhdGEgPSBjdHguZGF0YSE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5MaW1pdHlBUC51cGRhdGUoeyBkYXRhOiBjdHguZGF0YSEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBub3Z5X3phem5hbTogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydmRsaW1EdG8gPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBub3Z5X3phem5hbS5yb2sgPSBwYXJzZUludCh0aGF0LmdwYy5yb2spO1xyXG4gICAgICAgICAgICAgICAgbm92eV96YXpuYW0uaWNvID0gdGhhdC5ncGMuaWNvO1xyXG4gICAgICAgICAgICAgICAgLy9ub3Z5X3phem5hbS5pZF90emQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgLy9ub3Z5X3phem5hbS5pZF92eWIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgLy9ub3Z5X3phem5hbS5pZF9lZHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgbm92eV96YXpuYW0uYWt0aXZpdGEgPSAxMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxfb0RpdiA9IHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HU2V6bmFtTGltaXR5QVBEZXRhaWxcIiwgeyBtb2RlbExpbWl0QVA6IG5vdnlfemF6bmFtLCB1aWQ6IFwiR1Nlem5hbUxpbWl0eUFQRGV0YWlsI1wiIH0sIFwiTm92w70gbGltaXQgQVBcIiwgMzUwLCAzMDAsIHRydWUpOyAgICAvLyB6b2JyYXplbsOtIG1vZMOhbG7DrWhvIFRhYnVcclxuICAgICAgICAgICAgICAgICQobF9vRGl2KS5vbignY2xvc2UnLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoY3R4ICE9IHVuZGVmaW5lZCkgJiYgKGN0eCAhPSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWt0X2RhdGEgPSBjdHguZGF0YSE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5MaW1pdHlBUC5jcmVhdGUoeyBkYXRhOiBjdHguZGF0YSEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIl19
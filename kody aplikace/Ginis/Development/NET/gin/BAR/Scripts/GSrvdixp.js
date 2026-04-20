"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Bar.WebClient.GSrvdixp.js                                                        </Name>
//    <Description> GSrvdixp                                                                                  </Description>
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
    var Bar;
    (function (Bar) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GSrvdixp = class GSrvdixp extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Seznam zápisů požadavku"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actSeznamzapisuPozadavku"; // označení položky v taskListu
                    this.row = null;
                    this.akt_ixp = "";
                    this.akt_radek = 0;
                    this.porizuji_novy_radek = false;
                }
                ;
                onContentReady() {
                    var that = this;
                    var cnt = this;
                    var $tab = $(this.contentDiv);
                    $tab.empty();
                    //nastavení akcí
                    cnt.actions.addRange({
                        actNacist: {
                            caption: "Načíst", icon: "fa-refresh",
                            run: function () {
                                that.nactiData();
                            }
                        },
                        //actVycistit: {
                        //    caption: "Vyčistit masku", icon: "fa-eraser",
                        //    run: function () {
                        //        that.clearFilter();
                        //        that.nactiData();
                        //    }
                        //},
                        actClose: {
                            caption: "Zrušit",
                            run: function () {
                                that.tryClose();
                            }
                        },
                        actNewZapis: {
                            caption: "Nový", icon: "gi-plus",
                            enabled: that.globals.Param_Pozadavek_Editace_FP,
                            run: function () {
                                that.porizuji_novy_radek = true;
                                var NovyRadek;
                                NovyRadek = {};
                                NovyRadek.ixp = that.ixp;
                                cnt.call("NovyZapis", { dto: NovyRadek })
                                    .then(function (data) {
                                    that.akt_ixp = data.ixp;
                                    that.akt_radek = data.radek_z;
                                    var datagrid_count = that.grid.ggrid("getView").getDataRows().length;
                                    //var vybraneRadky = o.getSelection(true);
                                    //if (vybraneRadky.length === 1) {
                                    //    var v_radek_meta = vybraneRadky[0]; // $(this).ggrid("activeRow", true);
                                    //    if (v_radek_meta && !v_radek_meta._isVirtual) {
                                    //        var v_radek = v_radek_meta.data;
                                    //$(cnt.grid).ggridroweditor("insertRow", 1, {
                                    //$(cnt.grid).ggridroweditor("addRow", {
                                    $(cnt.grid).ggridroweditor("insertRow", datagrid_count, {
                                        ixp: data.ixp,
                                        cislo: data.cislo,
                                        radek_z: data.radek_z,
                                        ico: data.ico,
                                        ucs: data.ucs,
                                        nks: data.nks,
                                        rok: data.rok,
                                        mesic: data.mesic,
                                        drd: data.drd,
                                        den: data.den,
                                        uea: data.uea,
                                        ueb: data.ueb,
                                        uec: data.uec,
                                        ued: data.ued,
                                        uee: data.uee,
                                        uef: data.uef,
                                        ueg: data.ueg,
                                        ueh: data.ueh,
                                        uei: data.uei,
                                        uej: data.uej,
                                        te0: data.te0,
                                        te1: data.te1,
                                        te2: data.te2,
                                        te3: data.te3,
                                        te4: data.te4
                                    });
                                });
                            },
                        },
                        actEditZapis: {
                            caption: "Upravit", icon: "gi-pencil",
                            enabled: that.globals.Param_Pozadavek_Editace_FP,
                            run() {
                                that.porizuji_novy_radek = false;
                                that.aktradek = that.grid.ggrid("getSelection");
                                if (that.aktradek.length === 1) { // pokud existuje vybraný záznam
                                    that.data = that.aktradek[0];
                                    that.akt_ixp = that.data.ixp;
                                    that.akt_radek = that.data.radek_z;
                                    that.grid.ggridroweditor("start");
                                }
                            }
                        },
                        actKopieZapis: {
                            caption: "Kopie", icon: "fa-magic",
                            enabled: that.globals.Param_Pozadavek_Editace_FP,
                            run() {
                                that.porizuji_novy_radek = true;
                                that.aktradek = that.grid.ggrid("getSelection");
                                if (that.aktradek.length === 1) { // pokud existuje vybraný záznam
                                    that.data = that.aktradek[0];
                                    that.akt_ixp = that.data.ixp;
                                    that.akt_radek = that.data.radek_z;
                                    that.akt_radek = -1;
                                    var datagrid_count = that.grid.ggrid("getView").getDataRows().length;
                                    //that.grid.ggridroweditor("addRow", {
                                    $(cnt.grid).ggridroweditor("insertRow", datagrid_count, {
                                        ixp: that.akt_ixp,
                                        radek_z: that.akt_radek,
                                        ico: that.data.ico,
                                        nks: that.data.nks,
                                        ucs: that.data.ucs,
                                        rok: that.data.rok,
                                        drd: that.data.drd,
                                        mesic: that.data.mesic,
                                        den: that.data.den,
                                        uea: that.data.uea,
                                        ueb: that.data.ueb,
                                        uec: that.data.uec,
                                        ued: that.data.ued,
                                        uee: that.data.uee,
                                        uef: that.data.uef,
                                        ueg: that.data.ueg,
                                        ueh: that.data.ueh,
                                        uei: that.data.uei,
                                        uej: that.data.uej,
                                        te0: that.data.te0,
                                        te1: that.data.te1,
                                        te2: that.data.te2,
                                        te3: that.data.te3,
                                        te4: that.data.te4,
                                        c0: that.data.c0,
                                        c1: that.data.c1,
                                        popis: that.data.popis
                                    });
                                }
                            }
                        }
                    });
                    //nastavení menuBaru
                    cnt.menuBar(this.actions.createBar(["actNewZapis*", "actEditZapis*", "actKopieZapis*", "actNacist*", "actVycistit*", "actClose"]));
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    cnt.gf = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "ico",
                        caption: this.globals.Titulek_Ico,
                        width: 110,
                        editor: {
                            widget: "gselectbox",
                            options: [{
                                    name: "ico",
                                    model: "model.ico=value.ico",
                                    customClass: "gporizovacConfig"
                                }, Gordic.Prefabs.Select.ekosico(), { itemTemplate: "{ico}", showSelectButton: false, validators: [new Gordic.Validators.Required()] }]
                        },
                        //pnovak: 28.1 Chyba definice sloupce - doplněn název pro políčko ve filtru nad gridem, jednoznačné oddělení políček v gridu a ve filtru
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "ico_fin", caption: this.globals.Titulek_Ico, name: "ico_fin" })
                    })
                        .addTextColumn({
                        name: "ucs",
                        caption: this.globals.Titulek_Ucs,
                        width: 110,
                        editor: {
                            widget: "gselectbox",
                            options: [{
                                    name: "ucs",
                                    model: "model.ico=value.ico,model.ucs=value.ucs",
                                    customClass: "gporizovacConfig",
                                    serverFilters: {
                                        //pnovak: 28.1 Chyba definice sloupce - špatně uvedená závislost mezi políčky
                                        //serverFiltry se zadávají tak, že je u nich závislost uvedená napřímo a není to delegát, který vrací závislost(bude se chybně vyhodnocovat) více v logu
                                        ico: new Gordic.Forms.Dependency("ico", "ico", true, () => { return {}; }, this.element)
                                    }
                                }, Gordic.Prefabs.Select.ekosucs(), { itemTemplate: "{ucs}", showSelectButton: false }]
                        },
                        serverFilter: Gordic.Eko.Filters.ucsInterval({
                            ico: this.gpc.ico, onlyActive: false, aktProhl: 100, model: "ucs", caption: this.globals.Titulek_Ucs
                        })
                    })
                        .addTextColumn({
                        name: "nks",
                        caption: that.globals.Titulek_Nks,
                        width: 110,
                        editor: {
                            widget: "gselectbox",
                            options: [{
                                    name: "nks",
                                    model: "model.ico=value.ico,model.nks=value.nks",
                                    customClass: "gporizovacConfig", //"js-DWConfig",
                                    serverFilters: {
                                        //pnovak: 28.1 Chyba definice sloupce - špatně uvedená závislost mezi políčky
                                        //serverFiltry se zadávají tak, že je u nich závislost uvedená napřímo a není to delegát, který vrací závislost(bude se chybně vyhodnocovat) více v logu
                                        ico: new Gordic.Forms.Dependency("ico", "ico", true, () => { return {}; }, this.element)
                                    }
                                }, Gordic.Prefabs.Select.ekosnks(), { itemTemplate: "{nks}", showSelectButton: false, serverFilters: { ico: this.gpc.ico } }]
                        },
                        serverFilter: Gordic.Eko.Filters.nksInterval({
                            ico: this.gpc.ico, onlyActive: false, aktProhl: 100, model: "nks", caption: this.globals.Titulek_Nks
                        })
                    })
                        .addNumberColumn({
                        name: "rok",
                        caption: "Rok",
                        width: 50,
                        editor: {
                            widget: "gnumberbox",
                            options: {
                                disabled: true,
                                name: "rok",
                                model: "model.rok=value",
                                customClass: "gporizovacConfig"
                            }
                        }, serverFilter: Gordic.Eko.Filters.integerInterval({ model: "rok_fin", caption: "Rok" })
                    })
                        .addNumberColumn({
                        name: "mesic",
                        caption: "M ",
                        width: 50,
                        editor: {
                            widget: "gnumberbox",
                            options: {
                                name: "mesic",
                                model: "model.mesic=value",
                                customClass: "gporizovacConfig"
                            }
                        }, serverFilter: Gordic.Eko.Filters.integerInterval({ model: "mesic", caption: "Měsíc" })
                    })
                        .addNumberColumn({
                        name: "drd",
                        caption: "H ",
                        width: 30,
                        description: "Druh dokladu",
                        editor: {
                            widget: "gnumberbox",
                            options: {
                                disabled: true,
                                name: "drd",
                                model: "model.drd=value",
                                customClass: "gporizovacConfig"
                            }
                        },
                        serverFilter: Gordic.Eko.Filters.drd({ model: "drd_msk_fin", caption: "Drd", showUct: true, showRoz: true, showOst: true })
                    })
                        .addSortedEkoCfuSet(Gordic.Eko.CfuUtils.getCfuSetServerFilters(this, { isRoz: true, isUct: false }), {
                        isEditable: true,
                        dataSentence: this.dataSentence,
                        managerOptions: {
                            showDataWordsInfos: true,
                            externalHelpDialog: true,
                            useNonDigital: this.globals.PrizCheckUete
                        },
                        mode: "normal", //"withoutCheck", //that.globals.Param_Kontrola_Rozvrh == true ? "normal" : "withoutCheck", 
                        fieldOptions: { te1: { mask: this.dej_masku_akce() } }
                    })
                        // .addSortedEkoCfuSet(this, { isEditable: true }) //Gordic.Eko.CfuUtils.getCfuSetServerFilters(this, { isRoz: true, isUct: false }),
                        .addCurrencyColumn({
                        name: "c0",
                        caption: "MD",
                        width: 110,
                        editor: {
                            widget: "gnumberbox",
                            options: Gordic.Eko.Prefabs.Fields.currency({
                                name: "c0",
                                model: "model.c0=value",
                                customClass: "js-MD"
                            })
                        },
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0", caption: "MD" })
                    }).addCurrencyColumn({
                        name: "c1",
                        caption: "Dal",
                        width: 110,
                        editor: {
                            widget: "gnumberbox",
                            options: Gordic.Eko.Prefabs.Fields.currency({
                                name: "c1",
                                model: "model.c1=value",
                                customClass: "js-DAL"
                            })
                        },
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c1", caption: "Dal" })
                    })
                        .addTextColumn({
                        name: "popis",
                        caption: "Popis",
                        width: 400,
                        editor: {
                            widget: "gstringbox",
                            options: {
                                disabled: false,
                                name: "popis",
                                model: "model.popis=value",
                                customClass: "js-popis"
                            }
                        },
                    })
                        .addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "Datum změny",
                        customClass: "dt-left",
                        width: 140,
                    })
                        .addTextColumn({
                        name: "zmenu_prov_txt",
                        caption: "Změnu provedl",
                        width: 400
                    });
                    that.grid = $("<div>")
                        //.css("height", "100%")
                        .appendTo(mainForm)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        defaultAction: that.actions.actEditZapis,
                        rowsEnabled: function (meta) { return ((meta._isSummary == true) || (meta.data.drd == 9)); },
                        selection: function (ev, obj) {
                            that.aktradek = that.grid.ggrid("getSelection");
                            if (that.aktradek.length === 1) { // pokud existuje vybraný záznam
                                that.akt_ixp = that.aktradek[0].ixp;
                                that.akt_radek = that.aktradek[0].radek_z;
                            }
                            //that.refreshText(that.grid);
                        },
                        searchColumns: ["*ico", "*ucs", "*nks", "*popis"],
                        columns: cnt.gf
                    }).ggrideko({
                        // součtový řádek
                        summaryRowAllowed: true,
                        //    // dlouhý seznam
                        //    longListAllowed: true,
                        //    longListModel: "Global.Bar.AppSettings",
                        //    longListCountMethod: (rq) => cnt.isl.AkceZapisy.listCount(rq).get()
                    }).ggridroweditor({
                        disabled: !that.globals.Param_Pozadavek_Editace_FP,
                        //allowCopy: true,
                        cancel: function (ev, obj) {
                        },
                        save: function (data, obj) {
                            //var data = ctx.$mainTable.ggrid("getView").getDataRows()
                            var old_data = obj.cellInfo.data; //data, ze kterych byl vytvoren radek
                            //var new_data_seznam = obj.view.getDataRows();    //data, ze kterych byl vytvoren radek
                            //var new_data = new_data_seznam[obj.cellInfo.row];
                            var new_data = data;
                            that.call("TryToSave", {
                                model: new_data, modelold: old_data, i_ixp: that.akt_ixp, radek: that.akt_radek, rok: that.gpc.rok, ico: that.gpc.ico
                            })
                                .done(function (data) {
                                that.akt_ixp = data.ixp;
                                that.akt_radek = data.radek_z;
                                new_data.radek_z = data.radek_z;
                                //cnt.view_ISL.requestData({ filters: that.modelzapisy_filter }, { updateMode: "update" });
                                that.trigger("bar_savepozadavek_zapisy", [{ data: data }]);
                            });
                        },
                        beforeStop(ev, ctx) {
                            //debugger;
                            that.porizuji_novy_radek = false;
                        },
                        start(ev, obj) {
                            if (that.porizuji_novy_radek == true) {
                                $(obj.cellInfo.rowDOM).gmagicmanager("getVerifyPromise").then((o) => {
                                    that.grid.findFields("rok").gfield("enable");
                                });
                            }
                            else {
                                $(obj.cellInfo.rowDOM).gmagicmanager("getVerifyPromise").then((o) => {
                                    that.grid.findFields("rok").gfield("disable");
                                });
                            }
                            //that.aktradek = that.grid.ggrid("getSelection");
                            //if (that.aktradek.length === 1) {                                                            // pokud existuje vybraný záznam
                            //    that.data = that.aktradek[0];
                            //    that.akt_cislo = that.data.cislo!;
                            //    that.akt_radek = that.data.radek!;
                            //}
                        }
                    });
                    that.view_ISL = new Gordic.Isl.View(this.isl.PozadavekFinProfil.list({ filters: { ixp: that.ixp } }));
                    that.grid.ggrid("setData", that.view_ISL);
                }
                dej_masku_akce() {
                    var that = this;
                    var akce_cislo = that.cislo;
                    var akce_maska = this.globals.Te1_Msk_Nula?.replace(/0/g, "A");
                    var a_maska = this.globals.Te1_Msk_Org?.replace(akce_maska, akce_cislo);
                    return a_maska;
                }
                nactiData() {
                    var that = this;
                    that.view_ISL.requestData();
                }
            };
            GSrvdixp = __decorate([
                gcontent
            ], GSrvdixp);
            WebClient.GSrvdixp = GSrvdixp;
        })(WebClient = Bar.WebClient || (Bar.WebClient = {}));
    })(Bar = Gordic.Bar || (Gordic.Bar = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NydmRpeHAuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbIlNjcmlwdHMvR1NydmRpeHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0FvZWY7QUFwZUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBb2VuQjtJQXBlZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBb2U3QjtRQXBlb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUyxTQUFRLE9BQUEsWUFBWTtnQkFBMUM7O29CQUVJLFVBQUssR0FBRyx5QkFBeUIsQ0FBQyxDQUFDLG1FQUFtRTtvQkFDdEcsV0FBTSxHQUFHLDBCQUEwQixDQUFDLENBQUMsK0JBQStCO29CQUs1RCxRQUFHLEdBQTRDLElBQUksQ0FBQztvQkFLcEQsWUFBTyxHQUFXLEVBQUUsQ0FBQztvQkFDckIsY0FBUyxHQUFXLENBQUMsQ0FBQztvQkFVdEIsd0JBQW1CLEdBQVksS0FBSyxDQUFBO2dCQXVjaEQsQ0FBQztnQkF2ZCtELENBQUM7Z0JBa0I3RCxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxHQUFHLEdBQUUsSUFBSSxDQUFDO29CQUNkLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRTlCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFHYixnQkFBZ0I7b0JBQ2hCLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNqQixTQUFTLEVBQUU7NEJBQ1AsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWTs0QkFDckMsR0FBRyxFQUFFO2dDQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs0QkFDckIsQ0FBQzt5QkFDSjt3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QUE7WUEvZFksUUFBUTtnQkFEcEIsUUFBUTtlQUNJLFFBQVEsQ0ErZHBCO1lBL2RZLGtCQUFRLFdBK2RwQixDQUFBO1FBQ0wsQ0FBQyxFQXBlb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBb2U3QjtJQUFELENBQUMsRUFwZWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW9lbkI7QUFBRCxDQUFDLEVBcGVTLE1BQU0sS0FBTixNQUFNLFFBb2VmIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CYXIuV2ViQ2xpZW50LkdTcnZkaXhwLmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR1NydmRpeHAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQmFyLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTcnZkaXhwIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcIlNlem5hbSB6w6FwaXPFryBwb8W+YWRhdmt1XCI7IC8vYWJ5IHNlIGRhbG8gcMWZaXN0b3VwaXQgeiBicmVhZGNydW1icywgamUgbmFzdGF2ZW5vIHpkZSBtw61zdG8gdiBDI1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0U2V6bmFtemFwaXN1UG96YWRhdmt1XCI7IC8vIG96bmHEjWVuw60gcG9sb8W+a3kgdiB0YXNrTGlzdHVcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW9kZWxiYXI6IEdvcmRpYy5CYXIuSW50ZXJmYWNlLkdCYXJzdmVyRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5CYXIuSW50ZXJmYWNlLkdCYXJzdmVyRHRvIHwgbnVsbCA9IG51bGw7O1xyXG4gICAgICAgIHByaXZhdGUgaXhwOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBjaXNsbzogc3RyaW5nO1xyXG5cclxuICAgICAgICBwcml2YXRlIGdmOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0O1xyXG4gICAgICAgIHByaXZhdGUgYWt0X2l4cDogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBwcml2YXRlIGFrdF9yYWRlazogbnVtYmVyID0gMDtcclxuICAgICAgICBwcml2YXRlIGFrdHJhZGVrOiBHb3JkaWMuQmFyLkludGVyZmFjZS5HU3J2ZGl4cER0b1tdO1xyXG5cclxuICAgICAgICBwcml2YXRlIGRhdGE6IEdvcmRpYy5CYXIuSW50ZXJmYWNlLkdTcnZkaXhwRHRvO1xyXG4gICAgICAgIHByaXZhdGUgZGF0YVNlbnRlbmNlOiBHb3JkaWMuRWtvLldlYkNsaWVudC5HRGF0YVNlbnRlbmNlRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIGdsb2JhbHM6IEdvcmRpYy5CYXIuV2ViQ2xpZW50LkRUTy5HQmFyR2xvYmFsc0R0bztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3X0lTTDogR29yZGljLklzbC5WaWV3PEdvcmRpYy5CYXIuSW50ZXJmYWNlLkdCYXJzdmVyRHRvPjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwb3JpenVqaV9ub3Z5X3JhZGVrOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBjbnQ9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciAkdGFiID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG5cclxuICAgICAgICAgICAgJHRhYi5lbXB0eSgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBha2PDrVxyXG4gICAgICAgICAgICBjbnQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3ROYWNpc3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5hxI3DrXN0XCIsIGljb246IFwiZmEtcmVmcmVzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hY3RpRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvL2FjdFZ5Y2lzdGl0OiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIlZ5xI1pc3RpdCBtYXNrdVwiLCBpY29uOiBcImZhLWVyYXNlclwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5jbGVhckZpbHRlcigpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQubmFjdGlEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL30sXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0Q2xvc2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpydcWhaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0TmV3WmFwaXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5vdsO9XCIsIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQuZ2xvYmFscy5QYXJhbV9Qb3phZGF2ZWtfRWRpdGFjZV9GUCEsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBvcml6dWppX25vdnlfcmFkZWsgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIE5vdnlSYWRlazogR29yZGljLkJhci5JbnRlcmZhY2UuR1NydmRpeHBEdG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5vdnlSYWRlayA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBOb3Z5UmFkZWsuaXhwID0gdGhhdC5peHA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbnQuY2FsbChcIk5vdnlaYXBpc1wiLCB7IGR0bzogTm92eVJhZGVrIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWt0X2l4cCA9IGRhdGEuaXhwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWt0X3JhZGVrID0gZGF0YS5yYWRla196O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YWdyaWRfY291bnQgPSB0aGF0LmdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKCkubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciB2eWJyYW5lUmFka3kgPSBvLmdldFNlbGVjdGlvbih0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodnlicmFuZVJhZGt5Lmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHZhciB2X3JhZGVrX21ldGEgPSB2eWJyYW5lUmFka3lbMF07IC8vICQodGhpcykuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh2X3JhZGVrX21ldGEgJiYgIXZfcmFkZWtfbWV0YS5faXNWaXJ0dWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZhciB2X3JhZGVrID0gdl9yYWRla19tZXRhLmRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vJChjbnQuZ3JpZCkuZ2dyaWRyb3dlZGl0b3IoXCJpbnNlcnRSb3dcIiwgMSwge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQoY250LmdyaWQpLmdncmlkcm93ZWRpdG9yKFwiYWRkUm93XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGNudC5ncmlkKS5nZ3JpZHJvd2VkaXRvcihcImluc2VydFJvd1wiLCBkYXRhZ3JpZF9jb3VudCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IGRhdGEuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXNsbzogZGF0YS5jaXNsbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWtfejogZGF0YS5yYWRla196LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IGRhdGEuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IGRhdGEudWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBua3M6IGRhdGEubmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IGRhdGEucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNpYzogZGF0YS5tZXNpYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJkOiBkYXRhLmRyZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVuOiBkYXRhLmRlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVhOiBkYXRhLnVlYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWViOiBkYXRhLnVlYixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVjOiBkYXRhLnVlYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVkOiBkYXRhLnVlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVlOiBkYXRhLnVlZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVmOiBkYXRhLnVlZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVnOiBkYXRhLnVlZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVoOiBkYXRhLnVlaCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVpOiBkYXRhLnVlaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVqOiBkYXRhLnVlaixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUwOiBkYXRhLnRlMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUxOiBkYXRhLnRlMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUyOiBkYXRhLnRlMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUzOiBkYXRhLnRlMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU0OiBkYXRhLnRlNFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBhY3RFZGl0WmFwaXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVwcmF2aXRcIiwgaWNvbjogXCJnaS1wZW5jaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0Lmdsb2JhbHMuUGFyYW1fUG96YWRhdmVrX0VkaXRhY2VfRlAhLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wb3JpenVqaV9ub3Z5X3JhZGVrID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrdHJhZGVrID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5ha3RyYWRlay5sZW5ndGggPT09IDEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSB2eWJyYW7DvSB6w6F6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRhdGEgPSB0aGF0LmFrdHJhZGVrWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha3RfaXhwID0gdGhhdC5kYXRhLml4cCE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrdF9yYWRlayA9IHRoYXQuZGF0YS5yYWRla196ITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZHJvd2VkaXRvcihcInN0YXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBhY3RLb3BpZVphcGlzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLb3BpZVwiLCBpY29uOiBcImZhLW1hZ2ljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5nbG9iYWxzLlBhcmFtX1BvemFkYXZla19FZGl0YWNlX0ZQISxcclxuICAgICAgICAgICAgICAgICAgICBydW4oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucG9yaXp1amlfbm92eV9yYWRlayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrdHJhZGVrID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5ha3RyYWRlay5sZW5ndGggPT09IDEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSB2eWJyYW7DvSB6w6F6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRhdGEgPSB0aGF0LmFrdHJhZGVrWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha3RfaXhwID0gdGhhdC5kYXRhLml4cCE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrdF9yYWRlayA9IHRoYXQuZGF0YS5yYWRla196ITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWt0X3JhZGVrID0gLTE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFncmlkX2NvdW50ID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cygpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZ3JpZC5nZ3JpZHJvd2VkaXRvcihcImFkZFJvd1wiLCB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChjbnQuZ3JpZCkuZ2dyaWRyb3dlZGl0b3IoXCJpbnNlcnRSb3dcIiwgZGF0YWdyaWRfY291bnQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoYXQuYWt0X2l4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRla196OiB0aGF0LmFrdF9yYWRlayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoYXQuZGF0YS5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmtzOiB0aGF0LmRhdGEubmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogdGhhdC5kYXRhLnVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IHRoYXQuZGF0YS5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJkOiB0aGF0LmRhdGEuZHJkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2ljOiB0aGF0LmRhdGEubWVzaWMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVuOiB0aGF0LmRhdGEuZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlYTogdGhhdC5kYXRhLnVlYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWI6IHRoYXQuZGF0YS51ZWIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVjOiB0aGF0LmRhdGEudWVjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZDogdGhhdC5kYXRhLnVlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWU6IHRoYXQuZGF0YS51ZWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVmOiB0aGF0LmRhdGEudWVmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZzogdGhhdC5kYXRhLnVlZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWg6IHRoYXQuZGF0YS51ZWgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVpOiB0aGF0LmRhdGEudWVpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlajogdGhhdC5kYXRhLnVlaixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTA6IHRoYXQuZGF0YS50ZTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUxOiB0aGF0LmRhdGEudGUxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMjogdGhhdC5kYXRhLnRlMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTM6IHRoYXQuZGF0YS50ZTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU0OiB0aGF0LmRhdGEudGU0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMwOiB0aGF0LmRhdGEuYzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYzE6IHRoYXQuZGF0YS5jMSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9waXM6IHRoYXQuZGF0YS5wb3BpcyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIGNudC5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0TmV3WmFwaXMqXCIsIFwiYWN0RWRpdFphcGlzKlwiLCBcImFjdEtvcGllWmFwaXMqXCIsIFwiYWN0TmFjaXN0KlwiLCBcImFjdFZ5Y2lzdGl0KlwiLCBcImFjdENsb3NlXCJdKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICBjbnQuZ2YgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuZ2xvYmFscy5UaXR1bGVrX0ljbyEsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pY289dmFsdWUuaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJncG9yaXpvdmFjQ29uZmlnXCJcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zaWNvKCksIHsgaXRlbVRlbXBsYXRlOiBcIntpY299XCIsIHNob3dTZWxlY3RCdXR0b246IGZhbHNlLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wbm92YWs6IDI4LjEgQ2h5YmEgZGVmaW5pY2Ugc2xvdXBjZSAtIGRvcGxuxJtuIG7DoXpldiBwcm8gcG9sw63EjWtvIHZlIGZpbHRydSBuYWQgZ3JpZGVtLCBqZWRub3puYcSNbsOpIG9kZMSbbGVuw60gcG9sw63EjWVrIHYgZ3JpZHUgYSB2ZSBmaWx0cnVcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImljb19maW5cIiwgY2FwdGlvbjogdGhpcy5nbG9iYWxzLlRpdHVsZWtfSWNvISwgbmFtZTogXCJpY29fZmluXCIgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLmdsb2JhbHMuVGl0dWxla19VY3MhLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaWNvPXZhbHVlLmljbyxtb2RlbC51Y3M9dmFsdWUudWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJncG9yaXpvdmFjQ29uZmlnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wbm92YWs6IDI4LjEgQ2h5YmEgZGVmaW5pY2Ugc2xvdXBjZSAtIMWhcGF0bsSbIHV2ZWRlbsOhIHrDoXZpc2xvc3QgbWV6aSBwb2zDrcSNa3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRyeSBzZSB6YWTDoXZhasOtIHRhaywgxb5lIGplIHUgbmljaCB6w6F2aXNsb3N0IHV2ZWRlbsOhIG5hcMWZw61tbyBhIG5lbsOtIHRvIGRlbGVnw6F0LCBrdGVyw70gdnJhY8OtIHrDoXZpc2xvc3QoYnVkZSBzZSBjaHlibsSbIHZ5aG9kbm9jb3ZhdCkgdsOtY2UgdiBsb2d1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJpY29cIiwgXCJpY29cIiwgdHJ1ZSwgKCkgPT4geyByZXR1cm4ge307IH0sIHRoaXMuZWxlbWVudClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdWNzKCksIHsgaXRlbVRlbXBsYXRlOiBcInt1Y3N9XCIsIHNob3dTZWxlY3RCdXR0b246IGZhbHNlIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5ncGMuaWNvLCBvbmx5QWN0aXZlOiBmYWxzZSwgYWt0UHJvaGw6IDEwMCwgbW9kZWw6IFwidWNzXCIsIGNhcHRpb246IHRoaXMuZ2xvYmFscy5UaXR1bGVrX1VjcyFcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoYXQuZ2xvYmFscy5UaXR1bGVrX05rcyEsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pY289dmFsdWUuaWNvLG1vZGVsLm5rcz12YWx1ZS5ua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImdwb3Jpem92YWNDb25maWdcIiwgLy9cImpzLURXQ29uZmlnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wbm92YWs6IDI4LjEgQ2h5YmEgZGVmaW5pY2Ugc2xvdXBjZSAtIMWhcGF0bsSbIHV2ZWRlbsOhIHrDoXZpc2xvc3QgbWV6aSBwb2zDrcSNa3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRyeSBzZSB6YWTDoXZhasOtIHRhaywgxb5lIGplIHUgbmljaCB6w6F2aXNsb3N0IHV2ZWRlbsOhIG5hcMWZw61tbyBhIG5lbsOtIHRvIGRlbGVnw6F0LCBrdGVyw70gdnJhY8OtIHrDoXZpc2xvc3QoYnVkZSBzZSBjaHlibsSbIHZ5aG9kbm9jb3ZhdCkgdsOtY2UgdiBsb2d1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJpY29cIiwgXCJpY29cIiwgdHJ1ZSwgKCkgPT4geyByZXR1cm4ge307IH0sIHRoaXMuZWxlbWVudClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zbmtzKCksIHsgaXRlbVRlbXBsYXRlOiBcIntua3N9XCIsIHNob3dTZWxlY3RCdXR0b246IGZhbHNlLCBzZXJ2ZXJGaWx0ZXJzOiB7IGljbzogdGhpcy5ncGMuaWNvIH0gfV1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLm5rc0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmdwYy5pY28sIG9ubHlBY3RpdmU6IGZhbHNlLCBha3RQcm9obDogMTAwLCBtb2RlbDogXCJua3NcIiwgY2FwdGlvbjogdGhpcy5nbG9iYWxzLlRpdHVsZWtfTmtzIVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwucm9rPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJncG9yaXpvdmFjQ29uZmlnXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7IG1vZGVsOiBcInJva19maW5cIiwgY2FwdGlvbjogXCJSb2tcIiB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTSBcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLm1lc2ljPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJncG9yaXpvdmFjQ29uZmlnXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7IG1vZGVsOiBcIm1lc2ljXCIsIGNhcHRpb246IFwiTcSbc8OtY1wiIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRyZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiSCBcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRHJ1aCBkb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkcmRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmRyZD12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZ3Bvcml6b3ZhY0NvbmZpZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRyZCh7IG1vZGVsOiBcImRyZF9tc2tfZmluXCIsIGNhcHRpb246IFwiRHJkXCIsIHNob3dVY3Q6IHRydWUsIHNob3dSb3o6IHRydWUsIHNob3dPc3Q6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNvcnRlZEVrb0NmdVNldChHb3JkaWMuRWtvLkNmdVV0aWxzLmdldENmdVNldFNlcnZlckZpbHRlcnModGhpcywgeyBpc1JvejogdHJ1ZSwgaXNVY3Q6IGZhbHNlIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNFZGl0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVNlbnRlbmNlOiB0aGlzLmRhdGFTZW50ZW5jZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFuYWdlck9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dEYXRhV29yZHNJbmZvczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVybmFsSGVscERpYWxvZzogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VOb25EaWdpdGFsOiB0aGlzLmdsb2JhbHMuUHJpekNoZWNrVWV0ZSEgYXMgYW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IFwibm9ybWFsXCIsIC8vXCJ3aXRob3V0Q2hlY2tcIiwgLy90aGF0Lmdsb2JhbHMuUGFyYW1fS29udHJvbGFfUm96dnJoID09IHRydWUgPyBcIm5vcm1hbFwiIDogXCJ3aXRob3V0Q2hlY2tcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkT3B0aW9uczogeyB0ZTE6IHsgbWFzazogdGhpcy5kZWpfbWFza3VfYWtjZSgpIH0gfSBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIC5hZGRTb3J0ZWRFa29DZnVTZXQodGhpcywgeyBpc0VkaXRhYmxlOiB0cnVlIH0pIC8vR29yZGljLkVrby5DZnVVdGlscy5nZXRDZnVTZXRTZXJ2ZXJGaWx0ZXJzKHRoaXMsIHsgaXNSb3o6IHRydWUsIGlzVWN0OiBmYWxzZSB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTURcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBHb3JkaWMuRWtvLlByZWZhYnMuRmllbGRzLmN1cnJlbmN5KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmMwPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJqcy1NRFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMFwiLCBjYXB0aW9uOiBcIk1EXCIgfSlcclxuICAgICAgICAgICAgICAgIH0pLmFkZEN1cnJlbmN5Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IEdvcmRpYy5Fa28uUHJlZmFicy5GaWVsZHMuY3VycmVuY3koe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuYzE9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLURBTFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMVwiLCBjYXB0aW9uOiBcIkRhbFwiIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc3RyaW5nYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnBvcGlzPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJqcy1wb3Bpc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEYXR1bSB6bcSbbnlcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6bWVudV9wcm92X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWm3Em251IHByb3ZlZGxcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhhdC5ncmlkID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RWRpdFphcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd3NFbmFibGVkOiBmdW5jdGlvbiAobWV0YSkgeyByZXR1cm4gKChtZXRhLl9pc1N1bW1hcnkgPT0gdHJ1ZSkgfHwgKCBtZXRhLmRhdGEuZHJkID09IDkgKSk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrdHJhZGVrID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5ha3RyYWRlay5sZW5ndGggPT09IDEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSB2eWJyYW7DvSB6w6F6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrdF9peHAgPSB0aGF0LmFrdHJhZGVrWzBdLml4cCE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrdF9yYWRlayA9IHRoYXQuYWt0cmFkZWtbMF0ucmFkZWtfeiE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlZnJlc2hUZXh0KHRoYXQuZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCIqaWNvXCIsIFwiKnVjc1wiLCBcIipua3NcIiwgXCIqcG9waXNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogY250LmdmXHJcblxyXG4gICAgICAgICAgICAgICAgfSkuZ2dyaWRla28oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzb3XEjXRvdsO9IMWZw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeVJvd0FsbG93ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gZGxvdWjDvSBzZXpuYW1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBsb25nTGlzdEFsbG93ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbG9uZ0xpc3RNb2RlbDogXCJHbG9iYWwuQmFyLkFwcFNldHRpbmdzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbG9uZ0xpc3RDb3VudE1ldGhvZDogKHJxKSA9PiBjbnQuaXNsLkFrY2VaYXBpc3kubGlzdENvdW50KHJxKS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5nZ3JpZHJvd2VkaXRvcih7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQuZ2xvYmFscy5QYXJhbV9Qb3phZGF2ZWtfRWRpdGFjZV9GUCEsXHJcbiAgICAgICAgICAgICAgICAvL2FsbG93Q29weTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNhdmU6IGZ1bmN0aW9uIChkYXRhLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhciBkYXRhID0gY3R4LiRtYWluVGFibGUuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKClcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2xkX2RhdGEgPSBvYmouY2VsbEluZm8uZGF0YTsgICAgICAgICAvL2RhdGEsIHplIGt0ZXJ5Y2ggYnlsIHZ5dHZvcmVuIHJhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgbmV3X2RhdGFfc2V6bmFtID0gb2JqLnZpZXcuZ2V0RGF0YVJvd3MoKTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIG5ld19kYXRhID0gbmV3X2RhdGFfc2V6bmFtW29iai5jZWxsSW5mby5yb3ddO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdfZGF0YSA9IGRhdGE7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJUcnlUb1NhdmVcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbmV3X2RhdGEsIG1vZGVsb2xkOiBvbGRfZGF0YSwgaV9peHA6IHRoYXQuYWt0X2l4cCwgcmFkZWs6IHRoYXQuYWt0X3JhZGVrLCByb2s6IHRoYXQuZ3BjLnJvaywgaWNvOiB0aGF0LmdwYy5pY28gfSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7ICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRlc3QgLSB2b2zDoW7DrSBtZXRvZHkgcyBEVE9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWt0X2l4cCA9IGRhdGEuaXhwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha3RfcmFkZWsgPSBkYXRhLnJhZGVrX3o7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdfZGF0YS5yYWRla196ID0gZGF0YS5yYWRla196O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jbnQudmlld19JU0wucmVxdWVzdERhdGEoeyBmaWx0ZXJzOiB0aGF0Lm1vZGVsemFwaXN5X2ZpbHRlciB9LCB7IHVwZGF0ZU1vZGU6IFwidXBkYXRlXCIgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFwiYmFyX3NhdmVwb3phZGF2ZWtfemFwaXN5XCIsIFt7IGRhdGE6IGRhdGEgfV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGJlZm9yZVN0b3AoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wb3JpenVqaV9ub3Z5X3JhZGVrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHN0YXJ0KGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5wb3JpenVqaV9ub3Z5X3JhZGVrID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChvYmouY2VsbEluZm8ucm93RE9NISkuZ21hZ2ljbWFuYWdlcihcImdldFZlcmlmeVByb21pc2VcIikudGhlbigobykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkLmZpbmRGaWVsZHMoXCJyb2tcIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQob2JqLmNlbGxJbmZvLnJvd0RPTSEpLmdtYWdpY21hbmFnZXIoXCJnZXRWZXJpZnlQcm9taXNlXCIpLnRoZW4oKG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5maW5kRmllbGRzKFwicm9rXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuYWt0cmFkZWsgPSB0aGF0LmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhhdC5ha3RyYWRlay5sZW5ndGggPT09IDEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSB2eWJyYW7DvSB6w6F6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5kYXRhID0gdGhhdC5ha3RyYWRla1swXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmFrdF9jaXNsbyA9IHRoYXQuZGF0YS5jaXNsbyE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5ha3RfcmFkZWsgPSB0aGF0LmRhdGEucmFkZWshO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLy5nZ3JpZHNlcnZlcmZpbHRlcih7XHJcbiAgICAgICAgICAgIC8vICAgICAgaW52YWxpZFZhbHVlQ2hhbmdlZDogZnVuY3Rpb24gKGV2KSB7IHRoYXQubmFjdGlEYXRhKCk7IH0sXHJcbiAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuUG96YWRhdmVrRmluUHJvZmlsLmxpc3QoeyBmaWx0ZXJzIDogeyBpeHA6IHRoYXQuaXhwIH0gfSkpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdfSVNMKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWpfbWFza3VfYWtjZSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgYWtjZV9jaXNsbzogc3RyaW5nID0gdGhhdC5jaXNsbyE7XHJcbiAgICAgICAgICAgIHZhciBha2NlX21hc2thOiBzdHJpbmcgPSB0aGlzLmdsb2JhbHMuVGUxX01za19OdWxhPy5yZXBsYWNlKC8wL2csIFwiQVwiKSE7XHJcblxyXG4gICAgICAgICAgICB2YXIgYV9tYXNrYSA9IHRoaXMuZ2xvYmFscy5UZTFfTXNrX09yZz8ucmVwbGFjZShha2NlX21hc2thLCBha2NlX2Npc2xvISk7XHJcbiAgICAgICAgICAgIHJldHVybiBhX21hc2thO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFjdGlEYXRhKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wucmVxdWVzdERhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuIl19
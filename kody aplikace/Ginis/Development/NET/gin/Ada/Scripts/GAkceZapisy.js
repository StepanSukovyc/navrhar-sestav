"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GSeznamZapisu.js                                                        </Name>
//    <Description> GSeznamZapisu                                                                                  </Description>
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
            let GSeznamZapisu = class GSeznamZapisu extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.akt_cislo = "";
                    this.akt_radek = 0;
                    this.elmDto_in = {};
                }
                //        title = this.globals.BAR_Typ_Inst == Interface.SrvTypIntalaceEnum.MO ? "Zápisy pol. plánu" : "Zápisy akce";
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    this.title = this.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */ ? "Zápisy pol. plánu " + this.filter_akce.cislo : "Zápisy akce " + this.filter_akce.cislo;
                    if (this.modelzapisy_filter.drd_msk_txt != "") {
                        this.title = this.title + " (" + this.modelzapisy_filter.drd_msk_txt + " - DRD " + this.modelzapisy_filter.drd_msk + ")";
                        that.elmDto_in.drd_msk_fin = this.modelzapisy_filter.drd_msk;
                    }
                    this.title = this.title; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    that.akt_cislo = "";
                    that.akt_radek = 0;
                    //var globals = Gordic.Ada.Globals.GAdaGlobals;
                    $tab.empty();
                    var cnt = this;
                    //nastavení akcí
                    cnt.actions.addRange({
                        actNacist: {
                            caption: "Načíst", icon: "fa-refresh",
                            run: function () {
                                that.nactiData();
                            }
                        },
                        actVycistit: {
                            caption: "Vyčistit masku", icon: "fa-eraser",
                            run: function () {
                                that.clearFilter();
                                that.nactiData();
                            }
                        },
                        actClose: {
                            caption: "Zrušit",
                            run: function () {
                                that.tryClose();
                            }
                        },
                        actNewZapis: {
                            caption: "Nový", icon: "gi-plus",
                            enabled: that.globals.Param_Akce_Editace_FP,
                            run: function () {
                                var NovyRadek;
                                NovyRadek = {};
                                NovyRadek.cislo = that.modelzapisy_filter.cislo;
                                cnt.call("NovyZapis", { dto: NovyRadek })
                                    .then(function (data) {
                                    that.akt_cislo = data.cislo;
                                    that.akt_radek = data.radek;
                                    var datagrid_count = that.grid.ggrid("getView").getDataRows().length;
                                    //var vybraneRadky = o.getSelection(true);
                                    //if (vybraneRadky.length === 1) {
                                    //    var v_radek_meta = vybraneRadky[0]; // $(this).ggrid("activeRow", true);
                                    //    if (v_radek_meta && !v_radek_meta._isVirtual) {
                                    //        var v_radek = v_radek_meta.data;
                                    //$(cnt.grid).ggridroweditor("insertRow", 1, {
                                    //$(cnt.grid).ggridroweditor("addRow", {
                                    $(cnt.grid).ggridroweditor("insertRow", datagrid_count, {
                                        cislo: data.cislo,
                                        radek: data.radek,
                                        ico: data.ico,
                                        nks: data.nks,
                                        ucs: data.ucs,
                                        rok: data.rok,
                                        drd: data.drd,
                                        den: data.den,
                                        uea: data.uea,
                                        ueb: data.ueb,
                                        ued: data.ued,
                                        uee: data.uee,
                                        uef: data.uef,
                                        ueg: data.ueg,
                                        te0: data.te0,
                                        te1: data.te1
                                    });
                                });
                            },
                        },
                        actEditZapis: {
                            caption: "Upravit", icon: "gi-pencil",
                            enabled: that.globals.Param_Akce_Editace_FP,
                            run() {
                                that.aktradek = that.grid.ggrid("getSelection");
                                if (that.aktradek.length === 1) { // pokud existuje vybraný záznam
                                    that.data = that.aktradek[0];
                                    that.akt_cislo = that.data.cislo;
                                    that.akt_radek = that.data.radek;
                                    that.grid.ggridroweditor("start");
                                }
                            }
                        },
                        actKopieZapis: {
                            caption: "Kopie", icon: "fa-magic",
                            enabled: that.globals.Param_Akce_Editace_FP,
                            run() {
                                that.aktradek = that.grid.ggrid("getSelection");
                                if (that.aktradek.length === 1) { // pokud existuje vybraný záznam
                                    that.data = that.aktradek[0];
                                    that.akt_cislo = that.data.cislo;
                                    that.akt_radek = that.data.radek;
                                    that.akt_radek = -1;
                                    var datagrid_count = that.grid.ggrid("getView").getDataRows().length;
                                    //that.grid.ggridroweditor("addRow", {
                                    $(cnt.grid).ggridroweditor("insertRow", datagrid_count, {
                                        cislo: that.akt_cislo,
                                        radek: that.akt_radek,
                                        ico: that.data.ico,
                                        nks: that.data.nks,
                                        ucs: that.data.ucs,
                                        rok: that.data.rok,
                                        drd: that.data.drd,
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
                                        uek: that.data.uek,
                                        uel: that.data.uel,
                                        uem: that.data.uem,
                                        uen: that.data.uen,
                                        te5: that.data.te5,
                                        te6: that.data.te6,
                                        te7: that.data.te7,
                                        te8: that.data.te8,
                                        te9: that.data.te9,
                                        c0: that.data.c0,
                                        c1: that.data.c1
                                    });
                                }
                            }
                        }
                    });
                    //nastavení menuBaru
                    cnt.menuBar(this.actions.createBar(["actNewZapis*", "actEditZapis*", "actKopieZapis*", "actNacist*", "actVycistit*", "actClose"]));
                    cnt.commandBar(this.actions.createBar(["actClose"]));
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
                        serverFilter: Gordic.Eko.Filters.ucsInterval({ ico: this.gpc.ico, onlyActive: false, aktProhl: 100, model: "ucs", caption: this.globals.Titulek_Ucs })
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
                                    customClass: "gporizovacConfig",
                                    serverFilters: {
                                        //pnovak: 28.1 Chyba definice sloupce - špatně uvedená závislost mezi políčky
                                        //serverFiltry se zadávají tak, že je u nich závislost uvedená napřímo a není to delegát, který vrací závislost(bude se chybně vyhodnocovat) více v logu
                                        ico: new Gordic.Forms.Dependency("ico", "ico", true, () => { return {}; }, this.element)
                                    }
                                }, Gordic.Prefabs.Select.ekosnks(), { itemTemplate: "{nks}", showSelectButton: false, serverFilters: { ico: this.gpc.ico } }]
                        },
                        serverFilter: Gordic.Eko.Filters.nksInterval({ ico: this.gpc.ico, onlyActive: false, aktProhl: 100, model: "nks", caption: this.globals.Titulek_Nks })
                    })
                        .addNumberColumn({
                        name: "rok",
                        caption: "Rok",
                        width: 50,
                        editor: {
                            widget: "gnumberbox",
                            options: {
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
                        name: "den",
                        caption: "D ",
                        width: 50,
                        editor: {
                            widget: "gnumberbox",
                            options: {
                                name: "den",
                                model: "model.den=value",
                                customClass: "gporizovacConfig"
                            }
                        }, serverFilter: Gordic.Eko.Filters.integerInterval({ model: "den", caption: "Den" })
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
                    });
                    that.view_ISL = new Gordic.Isl.View(that.isl.AkceZapisy.list({ filters: that.modelzapisy_filter }), { startEmpty: true });
                    ;
                    var headerForm = new Gordic.Forms.Form({ name: "formHeader", layoutDescriptor: "L1M1S1 LMS-1-10-1" }) // kopyto na formulář, ve finále použijeme jenom řádky.
                        .addSection()
                        .addRow(that.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */ ? "Pol. plánu" : "Akce")
                        .addField("gstringbox", "w-3", { name: "cislo", emptyValue: that.filter_akce.cislo, disabled: true })
                        .addField("gstringbox", "w-9", { name: "nazev", customClass: "js-ada-nazev_akce", emptyValue: that.nazev_akce, disabled: true })
                        .addSection(" ");
                    $("<div class='js-hlavicka'>").appendTo(that.element).gform("createFrom", headerForm);
                    this.grid = $("<div class='js-SeznamZapisu'>")
                        //.css("height", "100%")
                        .appendTo(this.element)
                        .gautofit({ resizersOnTab: false })
                        .ggrid({
                        columnMode: "full",
                        //emptyMessage: "",
                        selection: function (ev, obj) {
                            that.aktradek = that.grid.ggrid("getSelection");
                            if (that.aktradek.length === 1) { // pokud existuje vybraný záznam
                                that.akt_cislo = that.aktradek[0].cislo;
                                that.akt_radek = that.aktradek[0].radek;
                            }
                            //that.refreshText(that.grid);
                        },
                        marking: true,
                        //multi: true,
                        data: that.view_ISL,
                        rowsCheckVisible: (row) => Gordic.Eko.Grid.getRowsCheckVisible(row),
                        rowsClass: (row) => Gordic.Eko.Grid.getRowsClass(row),
                        searchColumns: Gordic.Ada.WebClient.AdaFunction.zjisti_sloupce_search(cnt.gf),
                        columns: cnt.gf,
                    })
                        .ggrideko({
                        // součtový řádek
                        summaryRowAllowed: true,
                        // dlouhý seznam
                        longListAllowed: true,
                        longListModel: "Global.Ada.AppSettings",
                        longListCountMethod: (rq) => cnt.isl.AkceZapisy.listCount(rq).get()
                    })
                        //                .ggridrowscalc({ ignoredColumns: ["rok", "mesic", "den", "drd"]})  // zapnutí kalkulačky
                        .ggridroweditor({
                        disabled: !that.globals.Param_Akce_Editace_FP,
                        //allowCopy: true,
                        cancel: function (ev, obj) {
                        },
                        save: function (data, obj) {
                            //var data = ctx.$mainTable.ggrid("getView").getDataRows()
                            //debugger;
                            var old_data = obj.cellInfo.data; //data, ze kterych byl vytvoren radek
                            //var new_data_seznam = obj.view.getDataRows();    //data, ze kterych byl vytvoren radek
                            //var new_data = new_data_seznam[obj.cellInfo.row];
                            var new_data = data;
                            that.call("TryToSave", { model: new_data, modelold: old_data, rok: that.modelzapisy_filter.rok, ico: that.modelzapisy_filter.ico, cislo: that.akt_cislo, radek: that.akt_radek })
                                .done(function (data) {
                                that.akt_cislo = data.cislo;
                                that.akt_radek = data.radek;
                                new_data.radek = data.radek;
                                //cnt.view_ISL.requestData({ filters: that.modelzapisy_filter }, { updateMode: "update" });
                            });
                        },
                        beforeStop(ev, ctx) {
                            //debugger;
                        },
                        start(ev, obj) {
                            //that.aktradek = that.grid.ggrid("getSelection");
                            //if (that.aktradek.length === 1) {                                                            // pokud existuje vybraný záznam
                            //    that.data = that.aktradek[0];
                            //    that.akt_cislo = that.data.cislo!;
                            //    that.akt_radek = that.data.radek!;
                            //}
                        }
                    })
                        .ggridserverfilter({
                        invalidValueChanged: function (ev) { that.nactiData(); },
                    });
                    that.view_ISL.requestData();
                    //.on("keyup", function (ev) {
                    //    if (ev.keyCode === 45) { // INSERT
                    //        that.nactiData();
                    //        ev.preventDefault();
                    //    }
                    //    if (ev.keyCode === 46) { // DELETE
                    //        that.clearFilter();
                    //        that.nactiData();
                    //        ev.preventDefault();
                    //    }
                    //});
                    this.grid.gshortcut({
                        key: "INSERT", description: "Načtení dat",
                        group: Gordic.Shortcuts.Groups.Grid,
                        action: new GAction({
                            name: "insAct", run: function (ev) {
                                //NOTE: Toto nebude fungovat uplne dobre. Je nutne potvrdit hodnotu v policku, teprve pak nastane na policku change
                                //      a teprve pak lze hodnotu z policka precist.
                                that.grid.find(".gformbox").gformbox("close", true);
                                that.nactiData();
                            }
                        })
                    });
                    //this.grid.gshortcut({
                    //    key: "DELETE", description: "Výmaz masky",
                    //    group: Gordic.Shortcuts.Groups.Grid,
                    //    action: new GAction({
                    //        name: "delAct", run: function (ev) {
                    //            //NOTE: Toto nebude fungovat uplne dobre. Je nutne potvrdit hodnotu v policku, teprve pak nastane na policku change
                    //            //      a teprve pak lze hodnotu z policka precist.
                    //            that.clearFilter();
                    //            that.grid.find(".gformbox").gformbox("close", true);
                    //            that.nactiData();
                    //        }
                    //    })
                    //});
                    this.grid.gshortcut({
                        key: "ctrl+lclick",
                        group: Gordic.Shortcuts.Groups.Grid,
                        description: "Přidání hodnoty buňky do filtru a vyhledání",
                        action: new GAction({
                            name: "selFilterAct",
                            run: (ev, ctx) => {
                                var $col = $(ev.target);
                                if (!ev.ctrlKey || !$col.hasClass("cell") || $col.hasClass("js-cfu-cell"))
                                    return;
                                var colIndex = $col.attr("data-column-index");
                                var colDef = that.grid.ggrid("trueColumns", false)[colIndex];
                                if (colDef.serverFilter) {
                                    var $filterFrmBox = that.grid.find(".js-cfu").findFields(colDef.name);
                                    $filterFrmBox.gfield("setValue", $col.text(), { valid: false });
                                }
                                that.nactiData();
                            }
                        })
                    });
                    that.grid.ggridserverfilter("apply", that.elmDto_in);
                    // Fokus na seznammu
                    var focusFunc = function () {
                        that.grid.ggrid('focus'); // nastavení focusu na grid
                        that.view_ISL.off('change.focus'); // odvázání události z ISL view
                    };
                    that.view_ISL.on('change.focus', focusFunc); // při změně ISL view se naváže funkce focusFunc
                    // *******************************
                    //   Sidebar - náhled na seznamu
                    // *******************************
                    var previewPanelsDefinition = {
                        tabs: [
                            Gordic.Previews.getDefaultPreviewTab({
                                viewId: "ada:Akce" // id preview, které má být zobrazeno, případně funkce která podle loadParams vrátí viewId
                            })
                        ]
                    };
                    this.previewController = new Gordic.Previews.GPreviewController(this.element, previewPanelsDefinition);
                    //this.previewController.registerPanel();
                    if (this.modelzapisy_filter.cislo !== undefined) { // jinak prazdny
                        this.isl.Akce.read({ data: { cislo: this.modelzapisy_filter.cislo, ixs_cia: "" }, fragments: ["Permissions", "*"] })
                            .getData()
                            .done(function (data) {
                            //cnt.zobrazit_nahled(data, data); 
                            cnt.previewController.enable(true);
                            cnt.previewController.show(data);
                        });
                    }
                    else {
                        cnt.previewController.enable(false);
                    }
                }
                clearFilter() {
                    var that = this;
                    $(that.grid).ggridserverfilter("clear");
                }
                // metoda vyvolání načtení dat
                nactiData() {
                    var elmDto = {};
                    var filterDto = {};
                    var that = this;
                    $(that.grid).ggridserverfilter("collect", elmDto)
                        .then(function (d) {
                        filterDto.rok = that.modelzapisy_filter.rok;
                        filterDto.ico = that.modelzapisy_filter.ico;
                        filterDto.cislo = that.modelzapisy_filter.cislo;
                        filterDto.drd_msk = that.modelzapisy_filter.drd_msk;
                        filterDto.cfuDto = elmDto;
                        //that.isl.AkceZapisy.list({ filters: filterDto })
                        //    .getData()
                        //    .done(function (data) {
                        //        that.view_ISL.updateData(data, "reset");
                        //    });
                        //that.view_ISL = new Gordic.Isl.View(that.isl.AkceZapisy.list({ filters: filterDto }), {});
                        //that.grid.ggrid("setData", that.view_ISL)
                        // Fokus na seznammu
                        var focusFunc = function () {
                            that.grid.ggrid('focus'); // nastavení focusu na grid
                            that.view_ISL.off('change.focus'); // odvázání události z ISL view
                        };
                        that.view_ISL.on('change.focus', focusFunc); // při změně ISL view se naváže funkce focusFunc
                        that.view_ISL.requestData({ filters: filterDto });
                    });
                }
                dej_masku_akce() {
                    var akce_cislo = this.modelzapisy_filter.cislo;
                    var akce_maska = this.globals.Te1_Msk_Nula?.replace(/0/g, "A");
                    var a_maska = this.globals.Te1_Msk_Org?.replace(akce_maska, akce_cislo);
                    return a_maska;
                }
            };
            GSeznamZapisu = __decorate([
                gcontent
            ], GSeznamZapisu);
            WebClient.GSeznamZapisu = GSeznamZapisu;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrY2VaYXBpc3kuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbIlNjcmlwdHMvR0FrY2VaYXBpc3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0F5bUJmO0FBem1CRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F5bUJuQjtJQXptQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXltQjdCO1FBem1Cb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLE9BQUEsWUFBWTtnQkFBL0M7O29CQTRCWSxjQUFTLEdBQVcsRUFBRSxDQUFDO29CQUN2QixjQUFTLEdBQVcsQ0FBQyxDQUFDO29CQUt0QixjQUFTLEdBQTZDLEVBQUUsQ0FBQztnQkFra0JyRSxDQUFDO2dCQWhrQkwscUhBQXFIO2dCQUU3RyxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksNENBQW1DLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7b0JBRXBLLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsQ0FBQzt3QkFDNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMs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RUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0NBQ2xCLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFB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QU8sQ0FBQyxDQUFDLENBQUMsMkJBQTJCOzRCQUNwRCxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQywrQkFBK0I7d0JBQy9FLENBQUMsQ0FBQzt3QkFDRixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxnREFBZ0Q7d0JBRTdGLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7b0JBQ3RELENBQUMsQ0FDSixDQUFBO2dCQUNMLENBQUM7Z0JBRUQsY0FBYztvQkFDVixJQUFJLFVBQVUsR0FBVyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBTSxDQUFDO29CQUN4RCxJQUFJLFVBQVUsR0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBRSxDQUFDO29CQUV4RSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQVcsQ0FBQyxDQUFDO29CQUN6RSxPQUFPLE9BQU8sQ0FBQztnQkFDbkIsQ0FBQzthQUNKLENBQUE7WUFwbUJZLGFBQWE7Z0JBRHpCLFFBQVE7ZUFDSSxhQUFhLENBb21CekI7WUFwbUJZLHVCQUFhLGdCQW9tQnpCLENBQUE7UUFDTCxDQUFDLEVBem1Cb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBeW1CN0I7SUFBRCxDQUFDLEVBem1CZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBeW1CbkI7QUFBRCxDQUFDLEVBem1CUyxNQUFNLEtBQU4sTUFBTSxRQXltQmYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR1Nlem5hbVphcGlzdS5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdTZXpuYW1aYXBpc3UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQWRhLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1aYXBpc3UgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWYXJvdmF0IHDFmWVkIG5hxI10ZW7DrW0gZGxvdWjDqWhvIHNlem5hbXVcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgTG9uZ0xpc3RXYXJuaW5nOiBib29sZWFuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBNYXhpbcOhbG7DrSBwb8SNZXQgZG9rbGFkxa8gKG3DoSB2w716bmFtIHBvdXplIHBva3VkIGplIHphcG51dMOpIHZhcm92w6Fuw60gcMWZZWQgbmHEjXRlbsOtbSBkbG91aMOpaG8gc2V6bmFtdSlcclxuICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IExvbmdMaXN0TWF4Q291bnQ6IG51bWJlcjtcclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgbW9kZWx6YXBpc3lfZmlsdGVyOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU2V6bmFtWmFwaXN1QWRhRmlsdGVyRHRvO1xyXG4gICAgICAgIHByaXZhdGUgZGF0YTogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydmRjaWFTZXpuYW1aYXBpc3VEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VudGVuY2U6IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkdEYXRhU2VudGVuY2VEdG87XHJcblxyXG4gICAgICAgIC8vICAgICAgICBwcml2YXRlIGdsb2JhbHMgPSBHb3JkaWMuQWRhLkdsb2JhbHMuR0FkYUdsb2JhbHM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBnbG9iYWxzOiBHb3JkaWMuQWRhLldlYkNsaWVudC5EVE8uR0FkYUdsb2JhbHNEdG87XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2Y6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcHJldmlld0NvbnRyb2xsZXI6IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbmF6ZXZfYWtjZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBwcml2YXRlIGFrdF9jaXNsbzogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBwcml2YXRlIGFrdF9yYWRlazogbnVtYmVyID0gMDtcclxuICAgICAgICBwcml2YXRlIGFrdHJhZGVrOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2ZGNpYVNlem5hbVphcGlzdUR0b1tdO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkFkYS5JbnRlcmZhY2UuR1NydmRjaWFTZXpuYW1aYXBpc3VEdG8+O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyX2FrY2U6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBZ0Rva2xhZHlGaWx0ZXJEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBlbG1EdG9faW46IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VBZGFEdG8gPSB7fTtcclxuXHJcbi8vICAgICAgICB0aXRsZSA9IHRoaXMuZ2xvYmFscy5CQVJfVHlwX0luc3QgPT0gSW50ZXJmYWNlLlNydlR5cEludGFsYWNlRW51bS5NTyA/IFwiWsOhcGlzeSBwb2wuIHBsw6FudVwiIDogXCJaw6FwaXN5IGFrY2VcIjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkgKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSB0aGlzLmdsb2JhbHMuQkFSX1R5cF9JbnN0ID09IEludGVyZmFjZS5TcnZUeXBJbnRhbGFjZUVudW0uTU8gPyBcIlrDoXBpc3kgcG9sLiBwbMOhbnUgXCIgKyB0aGlzLmZpbHRlcl9ha2NlLmNpc2xvIDogXCJaw6FwaXN5IGFrY2UgXCIgKyB0aGlzLmZpbHRlcl9ha2NlLmNpc2xvO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWx6YXBpc3lfZmlsdGVyLmRyZF9tc2tfdHh0ICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUgPSB0aGlzLnRpdGxlICsgXCIgKFwiICsgdGhpcy5tb2RlbHphcGlzeV9maWx0ZXIuZHJkX21za190eHQgKyBcIiAtIERSRCBcIiArIHRoaXMubW9kZWx6YXBpc3lfZmlsdGVyLmRyZF9tc2sgKyBcIilcIjsgIFxyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuZWxtRHRvX2luLmRyZF9tc2tfZmluID0gdGhpcy5tb2RlbHphcGlzeV9maWx0ZXIuZHJkX21zaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMudGl0bGU7ICAvL2FieSBzZSBkYWxvIHDFmWlzdG91cGl0IHogYnJlYWRjcnVtYnMsIGplIG5hc3RhdmVubyB6ZGUgbcOtc3RvIHYgQyNcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWt0X2Npc2xvID0gXCJcIjtcclxuICAgICAgICAgICAgdGhhdC5ha3RfcmFkZWsgPSAwO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgZ2xvYmFscyA9IEdvcmRpYy5BZGEuR2xvYmFscy5HQWRhR2xvYmFscztcclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIGFrY8OtXHJcbiAgICAgICAgICAgIGNudC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE5hY2lzdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTmHEjcOtc3RcIiwgaWNvbjogXCJmYS1yZWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFjdGlEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VnljaXN0aXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZ5xI1pc3RpdCBtYXNrdVwiLCBpY29uOiBcImZhLWVyYXNlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsZWFyRmlsdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFjdGlEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBhY3RDbG9zZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnJ1xaFpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBhY3ROZXdaYXBpczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w71cIiwgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5nbG9iYWxzLlBhcmFtX0FrY2VfRWRpdGFjZV9GUCEsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBOb3Z5UmFkZWsgOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2ZGNpYVNlem5hbVphcGlzdUR0bztcclxuICAgICAgICAgICAgICAgICAgICAgICAgTm92eVJhZGVrID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5vdnlSYWRlay5jaXNsbyA9IHRoYXQubW9kZWx6YXBpc3lfZmlsdGVyLmNpc2xvO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY250LmNhbGwoXCJOb3Z5WmFwaXNcIiwgeyBkdG86IE5vdnlSYWRlayB9IClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha3RfY2lzbG8gPSBkYXRhLmNpc2xvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWt0X3JhZGVrID0gZGF0YS5yYWRlaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFncmlkX2NvdW50ID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cygpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgdnlicmFuZVJhZGt5ID0gby5nZXRTZWxlY3Rpb24odHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHZ5YnJhbmVSYWRreS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB2YXIgdl9yYWRla19tZXRhID0gdnlicmFuZVJhZGt5WzBdOyAvLyAkKHRoaXMpLmdncmlkKFwiYWN0aXZlUm93XCIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAodl9yYWRla19tZXRhICYmICF2X3JhZGVrX21ldGEuX2lzVmlydHVhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB2YXIgdl9yYWRlayA9IHZfcmFkZWtfbWV0YS5kYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQoY250LmdyaWQpLmdncmlkcm93ZWRpdG9yKFwiaW5zZXJ0Um93XCIsIDEsIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8kKGNudC5ncmlkKS5nZ3JpZHJvd2VkaXRvcihcImFkZFJvd1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChjbnQuZ3JpZCkuZ2dyaWRyb3dlZGl0b3IoXCJpbnNlcnRSb3dcIiwgZGF0YWdyaWRfY291bnQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lzbG86IGRhdGEuY2lzbG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrOiBkYXRhLnJhZGVrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IGRhdGEuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBua3M6IGRhdGEubmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IGRhdGEudWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IGRhdGEucm9rLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJkOiBkYXRhLmRyZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbjogZGF0YS5kZW4sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWE6IGRhdGEudWVhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWI6IGRhdGEudWViLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVkOiBkYXRhLnVlZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZTogZGF0YS51ZWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWY6IGRhdGEudWVmLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVnOiBkYXRhLnVlZywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMDogZGF0YS50ZTAsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTE6IGRhdGEudGUxIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBhY3RFZGl0WmFwaXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVwcmF2aXRcIiwgaWNvbjogXCJnaS1wZW5jaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0Lmdsb2JhbHMuUGFyYW1fQWtjZV9FZGl0YWNlX0ZQISxcclxuICAgICAgICAgICAgICAgICAgICBydW4gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrdHJhZGVrID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5ha3RyYWRlay5sZW5ndGggPT09IDEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSB2eWJyYW7DvSB6w6F6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRhdGEgPSB0aGF0LmFrdHJhZGVrWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha3RfY2lzbG8gPSB0aGF0LmRhdGEuY2lzbG8hO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha3RfcmFkZWsgPSB0aGF0LmRhdGEucmFkZWshO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkcm93ZWRpdG9yKFwic3RhcnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGFjdEtvcGllWmFwaXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktvcGllXCIsIGljb246IFwiZmEtbWFnaWNcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0Lmdsb2JhbHMuUGFyYW1fQWtjZV9FZGl0YWNlX0ZQISxcclxuICAgICAgICAgICAgICAgICAgICBydW4gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrdHJhZGVrID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5ha3RyYWRlay5sZW5ndGggPT09IDEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSB2eWJyYW7DvSB6w6F6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRhdGEgPSB0aGF0LmFrdHJhZGVrWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha3RfY2lzbG8gPSB0aGF0LmRhdGEuY2lzbG8hO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha3RfcmFkZWsgPSB0aGF0LmRhdGEucmFkZWshO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha3RfcmFkZWsgPSAtMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YWdyaWRfY291bnQgPSB0aGF0LmdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKCkubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5ncmlkLmdncmlkcm93ZWRpdG9yKFwiYWRkUm93XCIsIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGNudC5ncmlkKS5nZ3JpZHJvd2VkaXRvcihcImluc2VydFJvd1wiLCBkYXRhZ3JpZF9jb3VudCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpc2xvOiB0aGF0LmFrdF9jaXNsbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRlazogdGhhdC5ha3RfcmFkZWssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGF0LmRhdGEuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5rczogdGhhdC5kYXRhLm5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHRoYXQuZGF0YS51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB0aGF0LmRhdGEucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyZDogdGhhdC5kYXRhLmRyZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZW46IHRoYXQuZGF0YS5kZW4sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlYTogdGhhdC5kYXRhLnVlYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWI6IHRoYXQuZGF0YS51ZWIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVjOiB0aGF0LmRhdGEudWVjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZDogdGhhdC5kYXRhLnVlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWU6IHRoYXQuZGF0YS51ZWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVmOiB0aGF0LmRhdGEudWVmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZzogdGhhdC5kYXRhLnVlZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWg6IHRoYXQuZGF0YS51ZWgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVpOiB0aGF0LmRhdGEudWVpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlajogdGhhdC5kYXRhLnVlaixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTA6IHRoYXQuZGF0YS50ZTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUxOiB0aGF0LmRhdGEudGUxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMjogdGhhdC5kYXRhLnRlMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTM6IHRoYXQuZGF0YS50ZTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU0OiB0aGF0LmRhdGEudGU0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlazogdGhhdC5kYXRhLnVlayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWw6IHRoYXQuZGF0YS51ZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVtOiB0aGF0LmRhdGEudWVtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlbjogdGhhdC5kYXRhLnVlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTU6IHRoYXQuZGF0YS50ZTUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU2OiB0aGF0LmRhdGEudGU2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlNzogdGhhdC5kYXRhLnRlNyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTg6IHRoYXQuZGF0YS50ZTgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU5OiB0aGF0LmRhdGEudGU5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMwOiB0aGF0LmRhdGEuYzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYzE6IHRoYXQuZGF0YS5jMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbWVudUJhcnVcclxuICAgICAgICAgICAgY250Lm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3ROZXdaYXBpcypcIiwgXCJhY3RFZGl0WmFwaXMqXCIsIFwiYWN0S29waWVaYXBpcypcIiwgXCJhY3ROYWNpc3QqXCIsIFwiYWN0VnljaXN0aXQqXCIsIFwiYWN0Q2xvc2VcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIGNudC5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0Q2xvc2VcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIGNudC5nZiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5nbG9iYWxzLlRpdHVsZWtfSWNvISxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpY29cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmljbz12YWx1ZS5pY29cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImdwb3Jpem92YWNDb25maWdcIlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3NpY28oKSwgeyBpdGVtVGVtcGxhdGU6IFwie2ljb31cIiwgc2hvd1NlbGVjdEJ1dHRvbjogZmFsc2UsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfV1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3Bub3ZhazogMjguMSBDaHliYSBkZWZpbmljZSBzbG91cGNlIC0gZG9wbG7Em24gbsOhemV2IHBybyBwb2zDrcSNa28gdmUgZmlsdHJ1IG5hZCBncmlkZW0sIGplZG5vem5hxI1uw6kgb2RkxJtsZW7DrSBwb2zDrcSNZWsgdiBncmlkdSBhIHZlIGZpbHRydVxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaWNvX2ZpblwiLCBjYXB0aW9uOiB0aGlzLmdsb2JhbHMuVGl0dWxla19JY28hLCBuYW1lOiBcImljb19maW5cIiB9KVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuZ2xvYmFscy5UaXR1bGVrX1VjcyEsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pY289dmFsdWUuaWNvLG1vZGVsLnVjcz12YWx1ZS51Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImdwb3Jpem92YWNDb25maWdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Bub3ZhazogMjguMSBDaHliYSBkZWZpbmljZSBzbG91cGNlIC0gxaFwYXRuxJsgdXZlZGVuw6EgesOhdmlzbG9zdCBtZXppIHBvbMOtxI1reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdHJ5IHNlIHphZMOhdmFqw60gdGFrLCDFvmUgamUgdSBuaWNoIHrDoXZpc2xvc3QgdXZlZGVuw6EgbmFwxZnDrW1vIGEgbmVuw60gdG8gZGVsZWfDoXQsIGt0ZXLDvSB2cmFjw60gesOhdmlzbG9zdChidWRlIHNlIGNoeWJuxJsgdnlob2Rub2NvdmF0KSB2w61jZSB2IGxvZ3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcImljb1wiLCBcImljb1wiLCB0cnVlLCAoKSA9PiB7IHJldHVybiB7fTsgfSwgdGhpcy5lbGVtZW50KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1Y3MoKSwgeyBpdGVtVGVtcGxhdGU6IFwie3Vjc31cIiwgc2hvd1NlbGVjdEJ1dHRvbjogZmFsc2UgfV1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHsgaWNvOiB0aGlzLmdwYy5pY28sIG9ubHlBY3RpdmU6IGZhbHNlLCBha3RQcm9obDogMTAwLCBtb2RlbDogXCJ1Y3NcIiwgY2FwdGlvbjogdGhpcy5nbG9iYWxzLlRpdHVsZWtfVWNzISB9KVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoYXQuZ2xvYmFscy5UaXR1bGVrX05rcyEsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pY289dmFsdWUuaWNvLG1vZGVsLm5rcz12YWx1ZS5ua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImdwb3Jpem92YWNDb25maWdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Bub3ZhazogMjguMSBDaHliYSBkZWZpbmljZSBzbG91cGNlIC0gxaFwYXRuxJsgdXZlZGVuw6EgesOhdmlzbG9zdCBtZXppIHBvbMOtxI1reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdHJ5IHNlIHphZMOhdmFqw60gdGFrLCDFvmUgamUgdSBuaWNoIHrDoXZpc2xvc3QgdXZlZGVuw6EgbmFwxZnDrW1vIGEgbmVuw60gdG8gZGVsZWfDoXQsIGt0ZXLDvSB2cmFjw60gesOhdmlzbG9zdChidWRlIHNlIGNoeWJuxJsgdnlob2Rub2NvdmF0KSB2w61jZSB2IGxvZ3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcImljb1wiLCBcImljb1wiLCB0cnVlLCAoKSA9PiB7IHJldHVybiB7fTsgfSwgdGhpcy5lbGVtZW50KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3Nua3MoKSwgeyBpdGVtVGVtcGxhdGU6IFwie25rc31cIiwgc2hvd1NlbGVjdEJ1dHRvbjogZmFsc2UsIHNlcnZlckZpbHRlcnM6IHsgaWNvOiB0aGlzLmdwYy5pY28gfSB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMubmtzSW50ZXJ2YWwoeyBpY286IHRoaXMuZ3BjLmljbywgb25seUFjdGl2ZTogZmFsc2UsIGFrdFByb2hsOiAxMDAsIG1vZGVsOiBcIm5rc1wiLCBjYXB0aW9uOiB0aGlzLmdsb2JhbHMuVGl0dWxla19Oa3MhIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnJvaz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZ3Bvcml6b3ZhY0NvbmZpZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5pbnRlZ2VySW50ZXJ2YWwoeyBtb2RlbDogXCJyb2tfZmluXCIsIGNhcHRpb246IFwiUm9rXCIgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk0gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lc2ljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5tZXNpYz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZ3Bvcml6b3ZhY0NvbmZpZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5pbnRlZ2VySW50ZXJ2YWwoeyBtb2RlbDogXCJtZXNpY1wiLCBjYXB0aW9uOiBcIk3Em3PDrWNcIiB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkQgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuZGVuPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJncG9yaXpvdmFjQ29uZmlnXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7IG1vZGVsOiBcImRlblwiLCBjYXB0aW9uOiBcIkRlblwiIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRyZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiSCBcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRHJ1aCBkb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkcmRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmRyZD12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZ3Bvcml6b3ZhY0NvbmZpZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRyZCh7IG1vZGVsOiBcImRyZF9tc2tfZmluXCIsIGNhcHRpb246IFwiRHJkXCIsIHNob3dVY3Q6IHRydWUsIHNob3dSb3o6IHRydWUsIHNob3dPc3Q6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNvcnRlZEVrb0NmdVNldChHb3JkaWMuRWtvLkNmdVV0aWxzLmdldENmdVNldFNlcnZlckZpbHRlcnModGhpcywgeyBpc1JvejogdHJ1ZSwgaXNVY3Q6IGZhbHNlIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNFZGl0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVNlbnRlbmNlOiB0aGlzLmRhdGFTZW50ZW5jZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRPcHRpb25zOiB7IHRlMTogeyBtYXNrOiB0aGlzLmRlal9tYXNrdV9ha2NlKCkgfSB9IFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gLmFkZFNvcnRlZEVrb0NmdVNldCh0aGlzLCB7IGlzRWRpdGFibGU6IHRydWUgfSkgLy9Hb3JkaWMuRWtvLkNmdVV0aWxzLmdldENmdVNldFNlcnZlckZpbHRlcnModGhpcywgeyBpc1JvejogdHJ1ZSwgaXNVY3Q6IGZhbHNlIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJNRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IEdvcmRpYy5Fa28uUHJlZmFicy5GaWVsZHMuY3VycmVuY3koe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuYzA9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLU1EXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwXCIsIGNhcHRpb246IFwiTURcIiB9KVxyXG4gICAgICAgICAgICAgICAgfSkuYWRkQ3VycmVuY3lDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogR29yZGljLkVrby5QcmVmYWJzLkZpZWxkcy5jdXJyZW5jeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5jMT12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwianMtREFMXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMxXCIsIGNhcHRpb246IFwiRGFsXCIgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhhdC5pc2wuQWtjZVphcGlzeS5saXN0KHsgZmlsdGVyczogdGhhdC5tb2RlbHphcGlzeV9maWx0ZXIgfSksIHsgc3RhcnRFbXB0eTogdHJ1ZSB9KTs7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGhlYWRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1IZWFkZXJcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTEtMTAtMVwiIH0pIC8vIGtvcHl0byBuYSBmb3JtdWzDocWZLCB2ZSBmaW7DoWxlIHBvdcW+aWplbWUgamVub20gxZnDoWRreS5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3codGhhdC5nbG9iYWxzLkJBUl9UeXBfSW5zdCA9PSBJbnRlcmZhY2UuU3J2VHlwSW50YWxhY2VFbnVtLk1PID8gXCJQb2wuIHBsw6FudVwiIDogXCJBa2NlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0zXCIsIHsgbmFtZTogXCJjaXNsb1wiLCBlbXB0eVZhbHVlOiB0aGF0LmZpbHRlcl9ha2NlLmNpc2xvLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctOVwiLCB7IG5hbWU6IFwibmF6ZXZcIiwgY3VzdG9tQ2xhc3M6IFwianMtYWRhLW5hemV2X2FrY2VcIiwgZW1wdHlWYWx1ZTogdGhhdC5uYXpldl9ha2NlLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCIgXCIpO1xyXG5cclxuICAgICAgICAgICAgJChcIjxkaXYgY2xhc3M9J2pzLWhsYXZpY2thJz5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgaGVhZGVyRm9ybSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdiBjbGFzcz0nanMtU2V6bmFtWmFwaXN1Jz5cIilcclxuICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9lbXB0eU1lc3NhZ2U6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrdHJhZGVrID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5ha3RyYWRlay5sZW5ndGggPT09IDEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSB2eWJyYW7DvSB6w6F6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrdF9jaXNsbyA9IHRoYXQuYWt0cmFkZWtbMF0uY2lzbG8hO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha3RfcmFkZWsgPSB0aGF0LmFrdHJhZGVrWzBdLnJhZGVrITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucmVmcmVzaFRleHQodGhhdC5ncmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtpbmc6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vbXVsdGk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudmlld19JU0wsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJvd3NDaGVja1Zpc2libGU6IChyb3cpID0+IEVrby5HcmlkLmdldFJvd3NDaGVja1Zpc2libGUocm93KSxcclxuICAgICAgICAgICAgICAgICAgICByb3dzQ2xhc3M6IChyb3cpID0+IEVrby5HcmlkLmdldFJvd3NDbGFzcyhyb3cpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IEdvcmRpYy5BZGEuV2ViQ2xpZW50LkFkYUZ1bmN0aW9uLnpqaXN0aV9zbG91cGNlX3NlYXJjaChjbnQuZ2YpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGNudC5nZiwgXHJcbiBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWRla28oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzb3XEjXRvdsO9IMWZw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeVJvd0FsbG93ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRsb3Vow70gc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdMaXN0QWxsb3dlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ0xpc3RNb2RlbDogXCJHbG9iYWwuQWRhLkFwcFNldHRpbmdzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdMaXN0Q291bnRNZXRob2Q6IChycSkgPT4gY250LmlzbC5Ba2NlWmFwaXN5Lmxpc3RDb3VudChycSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuXHJcbi8vICAgICAgICAgICAgICAgIC5nZ3JpZHJvd3NjYWxjKHsgaWdub3JlZENvbHVtbnM6IFtcInJva1wiLCBcIm1lc2ljXCIsIFwiZGVuXCIsIFwiZHJkXCJdfSkgIC8vIHphcG51dMOtIGthbGt1bGHEjWt5XHJcblxyXG4gICAgICAgICAgICAgICAgLmdncmlkcm93ZWRpdG9yKHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQuZ2xvYmFscy5QYXJhbV9Ba2NlX0VkaXRhY2VfRlAhLCBcclxuICAgICAgICAgICAgICAgICAgICAvL2FsbG93Q29weTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2F2ZTogZnVuY3Rpb24gKGRhdGEsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBkYXRhID0gY3R4LiRtYWluVGFibGUuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9sZF9kYXRhID0gb2JqLmNlbGxJbmZvLmRhdGE7ICAgICAgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBuZXdfZGF0YV9zZXpuYW0gPSBvYmoudmlldy5nZXREYXRhUm93cygpOyAgICAvL2RhdGEsIHplIGt0ZXJ5Y2ggYnlsIHZ5dHZvcmVuIHJhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIG5ld19kYXRhID0gbmV3X2RhdGFfc2V6bmFtW29iai5jZWxsSW5mby5yb3ddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3X2RhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYWxsKFwiVHJ5VG9TYXZlXCIsIHsgbW9kZWw6IG5ld19kYXRhLCBtb2RlbG9sZDogb2xkX2RhdGEsIHJvazogdGhhdC5tb2RlbHphcGlzeV9maWx0ZXIucm9rLCBpY286IHRoYXQubW9kZWx6YXBpc3lfZmlsdGVyLmljbywgY2lzbG86IHRoYXQuYWt0X2Npc2xvLCByYWRlazogdGhhdC5ha3RfcmFkZWsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7ICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRlc3QgLSB2b2zDoW7DrSBtZXRvZHkgcyBEVE9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrdF9jaXNsbyA9IGRhdGEuY2lzbG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha3RfcmFkZWsgPSBkYXRhLnJhZGVrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld19kYXRhLnJhZGVrID0gZGF0YS5yYWRlaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NudC52aWV3X0lTTC5yZXF1ZXN0RGF0YSh7IGZpbHRlcnM6IHRoYXQubW9kZWx6YXBpc3lfZmlsdGVyIH0sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBiZWZvcmVTdG9wKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdGFydChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5ha3RyYWRlayA9IHRoYXQuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhhdC5ha3RyYWRlay5sZW5ndGggPT09IDEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSB2eWJyYW7DvSB6w6F6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQuZGF0YSA9IHRoYXQuYWt0cmFkZWtbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQuYWt0X2Npc2xvID0gdGhhdC5kYXRhLmNpc2xvITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5ha3RfcmFkZWsgPSB0aGF0LmRhdGEucmFkZWshO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkc2VydmVyZmlsdGVyKHtcclxuICAgICAgICAgICAgICAgICAgICBpbnZhbGlkVmFsdWVDaGFuZ2VkOiBmdW5jdGlvbiAoZXYpIHsgdGhhdC5uYWN0aURhdGEoKTsgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wucmVxdWVzdERhdGEoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLy5vbihcImtleXVwXCIsIGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgaWYgKGV2LmtleUNvZGUgPT09IDQ1KSB7IC8vIElOU0VSVFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQubmFjdGlEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgIGlmIChldi5rZXlDb2RlID09PSA0NikgeyAvLyBERUxFVEVcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmNsZWFyRmlsdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5uYWN0aURhdGEoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcIklOU0VSVFwiLCBkZXNjcmlwdGlvbjogXCJOYcSNdGVuw60gZGF0XCIsXHJcbiAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuR3JpZCxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaW5zQWN0XCIsIHJ1bjogZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vTk9URTogVG90byBuZWJ1ZGUgZnVuZ292YXQgdXBsbmUgZG9icmUuIEplIG51dG5lIHBvdHZyZGl0IGhvZG5vdHUgdiBwb2xpY2t1LCB0ZXBydmUgcGFrIG5hc3RhbmUgbmEgcG9saWNrdSBjaGFuZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICBhIHRlcHJ2ZSBwYWsgbHplIGhvZG5vdHUgeiBwb2xpY2thIHByZWNpc3QuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5maW5kKFwiLmdmb3JtYm94XCIpLmdmb3JtYm94KFwiY2xvc2VcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFjdGlEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAvLyAgICBrZXk6IFwiREVMRVRFXCIsIGRlc2NyaXB0aW9uOiBcIlbDvW1heiBtYXNreVwiLFxyXG4gICAgICAgICAgICAvLyAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuR3JpZCxcclxuICAgICAgICAgICAgLy8gICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcImRlbEFjdFwiLCBydW46IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vTk9URTogVG90byBuZWJ1ZGUgZnVuZ292YXQgdXBsbmUgZG9icmUuIEplIG51dG5lIHBvdHZyZGl0IGhvZG5vdHUgdiBwb2xpY2t1LCB0ZXBydmUgcGFrIG5hc3RhbmUgbmEgcG9saWNrdSBjaGFuZ2VcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICAgIGEgdGVwcnZlIHBhayBsemUgaG9kbm90dSB6IHBvbGlja2EgcHJlY2lzdC5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmNsZWFyRmlsdGVyKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5ncmlkLmZpbmQoXCIuZ2Zvcm1ib3hcIikuZ2Zvcm1ib3goXCJjbG9zZVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0Lm5hY3RpRGF0YSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiY3RybCtsY2xpY2tcIixcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUMWZaWTDoW7DrSBob2Rub3R5IGJ1xYhreSBkbyBmaWx0cnUgYSB2eWhsZWTDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzZWxGaWx0ZXJBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkY29sID0gJChldi50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFldi5jdHJsS2V5IHx8ICEkY29sLmhhc0NsYXNzKFwiY2VsbFwiKSB8fCAkY29sLmhhc0NsYXNzKFwianMtY2Z1LWNlbGxcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29sSW5kZXggPSAkY29sLmF0dHIoXCJkYXRhLWNvbHVtbi1pbmRleFwiKSE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2xEZWYgPSB0aGF0LmdyaWQuZ2dyaWQoXCJ0cnVlQ29sdW1uc1wiLCBmYWxzZSlbY29sSW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbERlZi5zZXJ2ZXJGaWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZmlsdGVyRnJtQm94ID0gdGhhdC5ncmlkLmZpbmQoXCIuanMtY2Z1XCIpLmZpbmRGaWVsZHMoY29sRGVmLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpbHRlckZybUJveC5nZmllbGQoXCJzZXRWYWx1ZVwiLCAkY29sLnRleHQoKSwgeyB2YWxpZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFjdGlEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJhcHBseVwiLCB0aGF0LmVsbUR0b19pbik7XHJcblxyXG4gICAgICAgICAgICAvLyBGb2t1cyBuYSBzZXpuYW1tdVxyXG4gICAgICAgICAgICB2YXIgZm9jdXNGdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKCdmb2N1cycpOyAvLyBuYXN0YXZlbsOtIGZvY3VzdSBuYSBncmlkXHJcbiAgICAgICAgICAgICAgICAodGhhdC52aWV3X0lTTCBhcyBhbnkpLm9mZignY2hhbmdlLmZvY3VzJyk7IC8vIG9kdsOhesOhbsOtIHVkw6Fsb3N0aSB6IElTTCB2aWV3XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wub24oJ2NoYW5nZS5mb2N1cycsIGZvY3VzRnVuYyk7IC8vIHDFmWkgem3Em27EmyBJU0wgdmlldyBzZSBuYXbDocW+ZSBmdW5rY2UgZm9jdXNGdW5jXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAvLyAgIFNpZGViYXIgLSBuw6FobGVkIG5hIHNlem5hbXVcclxuICAgICAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICB2YXIgcHJldmlld1BhbmVsc0RlZmluaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB0YWJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZXZpZXdzLmdldERlZmF1bHRQcmV2aWV3VGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0lkOiBcImFkYTpBa2NlXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlkIHByZXZpZXcsIGt0ZXLDqSBtw6EgYsO9dCB6b2JyYXplbm8sIHDFmcOtcGFkbsSbIGZ1bmtjZSBrdGVyw6EgcG9kbGUgbG9hZFBhcmFtcyB2csOhdMOtIHZpZXdJZFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KV1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlciA9IG5ldyBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyKHRoaXMuZWxlbWVudCwgcHJldmlld1BhbmVsc0RlZmluaXRpb24pO1xyXG4gICAgICAgICAgICAvL3RoaXMucHJldmlld0NvbnRyb2xsZXIucmVnaXN0ZXJQYW5lbCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWx6YXBpc3lfZmlsdGVyLmNpc2xvICE9PSB1bmRlZmluZWQpIHtcdC8vIGppbmFrIHByYXpkbnlcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzbC5Ba2NlLnJlYWQoeyBkYXRhOiB7IGNpc2xvOiB0aGlzLm1vZGVsemFwaXN5X2ZpbHRlci5jaXNsbywgaXhzX2NpYTogXCJcIiB9LCBmcmFnbWVudHM6IFtcIlBlcm1pc3Npb25zXCIsIFwiKlwiXSAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jbnQuem9icmF6aXRfbmFobGVkKGRhdGEsIGRhdGEpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY250LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY250LnByZXZpZXdDb250cm9sbGVyLnNob3coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbnQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIGNsZWFyRmlsdGVyICgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAkKHRoYXQuZ3JpZCkuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG1ldG9kYSB2eXZvbMOhbsOtIG5hxI10ZW7DrSBkYXRcclxuICAgICAgICBuYWN0aURhdGEgKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGVsbUR0bzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdUFkYUR0byA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyRHRvOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU2V6bmFtWmFwaXN1QWRhRmlsdGVyRHRvID0ge307XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAkKHRoYXQuZ3JpZCkuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjb2xsZWN0XCIsIGVsbUR0bylcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLnJvayA9IHRoYXQubW9kZWx6YXBpc3lfZmlsdGVyLnJva1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5pY28gPSB0aGF0Lm1vZGVsemFwaXN5X2ZpbHRlci5pY29cclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uY2lzbG8gPSB0aGF0Lm1vZGVsemFwaXN5X2ZpbHRlci5jaXNsbztcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uZHJkX21zayA9IHRoYXQubW9kZWx6YXBpc3lfZmlsdGVyLmRyZF9tc2s7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvLmNmdUR0byA9IGVsbUR0bztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5pc2wuQWtjZVphcGlzeS5saXN0KHsgZmlsdGVyczogZmlsdGVyRHRvIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShkYXRhLCBcInJlc2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQudmlld19JU0wgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoYXQuaXNsLkFrY2VaYXBpc3kubGlzdCh7IGZpbHRlcnM6IGZpbHRlckR0byB9KSwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdfSVNMKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBGb2t1cyBuYSBzZXpuYW1tdVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb2N1c0Z1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZCgnZm9jdXMnKTsgLy8gbmFzdGF2ZW7DrSBmb2N1c3UgbmEgZ3JpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhhdC52aWV3X0lTTCBhcyBhbnkpLm9mZignY2hhbmdlLmZvY3VzJyk7IC8vIG9kdsOhesOhbsOtIHVkw6Fsb3N0aSB6IElTTCB2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLm9uKCdjaGFuZ2UuZm9jdXMnLCBmb2N1c0Z1bmMpOyAvLyBwxZlpIHptxJtuxJsgSVNMIHZpZXcgc2UgbmF2w6HFvmUgZnVua2NlIGZvY3VzRnVuY1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogZmlsdGVyRHRvIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWpfbWFza3VfYWtjZSgpIHtcclxuICAgICAgICAgICAgdmFyIGFrY2VfY2lzbG86IHN0cmluZyA9IHRoaXMubW9kZWx6YXBpc3lfZmlsdGVyLmNpc2xvITtcclxuICAgICAgICAgICAgdmFyIGFrY2VfbWFza2E6IHN0cmluZyA9IHRoaXMuZ2xvYmFscy5UZTFfTXNrX051bGE/LnJlcGxhY2UoLzAvZywgXCJBXCIpITtcclxuXHJcbiAgICAgICAgICAgIHZhciBhX21hc2thID0gdGhpcy5nbG9iYWxzLlRlMV9Nc2tfT3JnPy5yZXBsYWNlKGFrY2VfbWFza2EsIGFrY2VfY2lzbG8hKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFfbWFza2E7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
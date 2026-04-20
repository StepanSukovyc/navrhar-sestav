"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAkceVecnyProfil.js                                                        </Name>
//    <Description> GAkceVecnyProfil                                                                                  </Description>
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
            let GAkceVecnyProfil = class GAkceVecnyProfil extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Věcný profil"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.akt_cis = 0;
                    this.blok_selection = false;
                    this.rok_vp_tooltip = "";
                    this.data_preview = {};
                    this.model_filtr = { vp_stav: [20, 30] };
                }
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    //            var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    //            this.globals = Gordic.Ada.Globals.GAdaGlobals;
                    this.title = "Věcný profil " + this.filter_akce.cislo; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    $tab.empty();
                    var cnt = this;
                    if ((that.filter_akce.rok_od == null) || (that.filter_akce.rok_od == undefined)) {
                        that.filter_akce.rok_od = 1900;
                    }
                    if ((that.filter_akce.rok_do == null) || (that.filter_akce.rok_do == undefined)) {
                        that.filter_akce.rok_do = 2099;
                    }
                    that.rok_vp_tooltip = "Rok ( " + that.filter_akce.rok_od + " - " + that.filter_akce.rok_do + " )";
                    // ??? JI
                    this.setBreadcrumbs([
                        {
                            caption: that.title,
                            defaultAction: true
                            //action: new GAction({ name: "actBack", run: function () { that.tryCloseAllChildContents(); } }) // zavření všech oken otevřených z tohoto contentu
                        }
                    ]);
                    //var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    //nastavení akcí
                    this.actions.addRange({
                        actNovy: {
                            caption: "Nový",
                            run: function () {
                                that.novy();
                            }
                        },
                        actKopie: {
                            caption: "Kopie",
                            run: function () {
                                that.kopie();
                            }
                        },
                        actEvidence: {
                            caption: "Evidence",
                            run: function () {
                                return that.evidence();
                            }
                        },
                        actSchvalit: {
                            caption: "Schválit",
                            run: function () {
                                return that.schvalit();
                            }
                        },
                        actStorno: {
                            caption: "Storno",
                            run: function () {
                                return that.storno();
                            }
                        },
                        actSouhrn: {
                            caption: "Souhrn",
                            run: function () {
                                return that.souhrn();
                            }
                        },
                        actObcerstvit: {
                            caption: "Občerstvit", icon: "fa-refresh",
                            run: function () {
                                if (that.model_filtr && that.model_filtr.vp_stav != null) {
                                    if (that.model_filtr.vp_stav.length == 0) {
                                        that.model_filtr.vp_stav.push(99);
                                    }
                                    that.view_ISL.requestData({ filters: that.model_filtr });
                                }
                                //that.view_ISL.requestData({ updateMode: "update" });
                                that.actions.actNovy?.enabled(that.povolena_editace);
                                that.actions.actEvidence?.enabled(that.povolena_editace);
                                that.actions.actKopie?.enabled(that.povolena_editace);
                                that.actions.actStorno?.enabled(that.povolena_editace);
                                that.actions.actSchvalit?.enabled(that.povolena_editace);
                            }
                        },
                        actClose: {
                            caption: "Zrušit",
                            run: function () {
                                that.tryClose();
                            }
                        }
                    });
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actNovy*", "actKopie*", "actEvidence*", "actSchvalit*", "actStorno*", "actObcerstvit*"], ["actSouhrn*"]));
                    this.commandBar(this.actions.createBar(["actClose"]));
                    // *******************************
                    //   Sidebar - náhled na seznamu
                    // *******************************
                    this.previewPanelsDefinition = {
                        tabs: [
                            Gordic.Previews.getDefaultPreviewTab({
                                viewId: "ada:AkceVP" // id preview, které má být zobrazeno, případně funkce která podle loadParams vrátí viewId
                            })
                        ]
                    };
                    this.previewController = new Gordic.Previews.GPreviewController(this.element, this.previewPanelsDefinition);
                    // this.previewController.registerPanel();
                    this.previewController.enable(true);
                    this.gridFormatSeznamVP = new Gordic.Data.GridFormat()
                        .addNumberColumn({
                        name: "vp_stav",
                        caption: "",
                        width: 0,
                        hidden: true,
                        //                    forced: false
                    })
                        .addNumberColumn({
                        name: "cis_plan",
                        caption: "#",
                        width: 40
                    })
                        .addNumberColumn({
                        name: "rok_vp",
                        caption: "Rok",
                        width: 50
                    })
                        .addTextColumn({
                        name: "ixs_dup_nazev",
                        caption: "Typ položky VP",
                        width: 250
                    })
                        .addTextColumn({
                        name: "vp_stav_nazev",
                        caption: "Stav",
                        width: 120
                    })
                        .addTextColumn({
                        name: "nazev",
                        caption: "Název položky VP",
                        width: 200
                    })
                        .addTextColumn({
                        name: "inv_cis",
                        caption: "Inventární číslo",
                        width: 120
                    })
                        .addTextColumn({
                        name: "mat_cis",
                        caption: "KČM/VK",
                        width: 120
                    })
                        .addTextColumn({
                        name: "skp",
                        caption: "Klasifikace",
                        width: 120
                    })
                        .addTextColumn({
                        name: "mj_nazev",
                        caption: "MJ",
                        width: 120
                    })
                        .addCurrencyColumn({
                        name: "m_plan",
                        caption: "Množství",
                        width: 150,
                        format: "number(C3)",
                    })
                        .addCurrencyColumn({
                        name: "c_plan",
                        caption: "Celková částka",
                        width: 150
                    })
                        .addTextColumn({
                        name: "ucs",
                        caption: this.globals.Titulek_Ucs,
                        width: 80
                    })
                        .addTextColumn({
                        name: "nks",
                        caption: this.globals.Titulek_Nks,
                        width: 80,
                    })
                        .addTextColumn({
                        name: "nks_zad",
                        caption: this.globals.Titulek_Nks + " zadavatele",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "nazev_skp",
                        caption: "Název SKP",
                        width: 350
                    });
                    this.my_CondFormats_VP = [];
                    this.my_CondFormat_VP = { description: "Stornováno", formula: "@vp_stav == 90", text: Gordic.Components.Grid.CondFormats.CondFormatText.red };
                    this.my_CondFormats_VP.push(this.my_CondFormat_VP);
                    var filterFormDef = new Gordic.Forms.Form({ tabLabel: "Kompletní filtr", layoutDescriptor: "w-L-9 w-M-9 w-S-12" })
                        .addSection();
                    filterFormDef
                        .addField("gselectbox", Gordic.Prefabs.Select.vepcstp(), {
                        name: "vp_stav_f", model: "model.vp_stav=value.vp_stav", multi: true, list: true, itemWidth: "", disabled: false,
                        initialValue: [{ vp_stav: 20 }, { vp_stav: 30 }],
                        serverFilters: {
                            vp_stav: [20, 30, 90],
                        },
                        change: function (ev, obj) {
                            // automatické načtení po změně hodnoty
                            if (obj.flags.isKontrolniDiv || obj.flags.noChange)
                                return;
                            let dto = {};
                            that.filterForm.findFields().gfield("model", "collect", dto);
                            that.filterForm.gfilterpanel("applyFilter", dto);
                        },
                    });
                    that.filterForm = $("<div>").appendTo(this.element)
                        .gfilterpanel({
                        // default pro EKO
                        //filterViewModeUserSettings: [FilterViewMode.Simple, FilterViewMode.Detail, FilterViewMode.Normal],
                        //filterViewMode: FilterViewMode.Detail,
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
                        favorites: ["vp_stav"],
                        favoriteLayoutDescriptor: "L4M3S1",
                        // TODO: zůstane tohle téma nebo bude pro LK jiné než pro TK?
                        tema: "ada_ptm_adabas2",
                        filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                        saveOptionsForm: "eko",
                        // strictStopAutoLoad: true,               // Striktně zakáže automatické načtení hned po otevření seznamu, oblíbený filtr se pouze předplní.
                        // textItemTemplate: "{description}",
                        apply: function (event, obj) {
                            // načtení dat podle filtrů
                            that.model_filtr = obj.filter; // that.model_filtr.vp_stav
                            if (that.model_filtr && that.model_filtr.vp_stav != null) {
                                if (that.model_filtr.vp_stav.length == 0) {
                                    that.model_filtr.vp_stav.push(99);
                                }
                                that.view_ISL.requestData({ filters: that.model_filtr });
                            }
                        }
                    });
                    this.mainTable = $("<div>")
                        .css("height", "30%")
                        //.appendTo(mainForm)
                        .appendTo(this.element)
                        .gautofit({ minimalHeight: 400 })
                        .ggrid({
                        columnMode: "full",
                        searchColumns: Gordic.Ada.WebClient.AdaFunction.zjisti_sloupce_search(that.gridFormatSeznamVP),
                        selection: function (ev, o) {
                            var cnt = this;
                            //var data_preview: any = {};
                            //data_preview.data = that.view_ISL.getDataRows();
                            //that.previewController.show(data_preview);
                            ////that.previewController.show(that.view_ISL.getDataRows());
                            //fields.findFields().gfield("option", "disabled", true ) 
                            var vybraneRadky = o.getSelection(); //cnt.find(".js-SeznamDokladu").ggrid("getSelection");                        // načtení přes vyhledání gridu (přes class)
                            if (vybraneRadky.length === 1) { // pokud existuje vybraný záznam
                                that.akt_cis = vybraneRadky[0].cis_plan;
                                if ((that.akt_cis > 0) && (that.blok_selection == false)) {
                                    var Radek;
                                    Radek = {};
                                    Radek.rok = vybraneRadky[0].rok;
                                    Radek.ico = vybraneRadky[0].ico;
                                    Radek.cislo = vybraneRadky[0].cislo;
                                    Radek.cis_plan = vybraneRadky[0].cis_plan;
                                    that.isl.AkceVecnyProfil.read({ data: Radek })
                                        .get()
                                        .done(function (response) {
                                        var fields = that.mainTable2.findFields(); // všechny políčka
                                        fields.gfield("model", "apply", response.data, { initialValues: true }); // nastaví hodnoty jako initValue, pak se dá zeptat na hasChanged (porovná initialValue vs value, použije se např. v closing).
                                        fields.gfield("option", "disabled", false); //disable všech políček, podle edit
                                        fields.findFields("nazev_skp,vp_stav").gfield("option", "disabled", true);
                                        that.actions.actNovy?.enabled(that.povolena_editace);
                                        that.actions.actEvidence?.enabled(that.povolena_editace);
                                        that.actions.actKopie?.enabled(that.povolena_editace);
                                        that.actions.actStorno?.enabled(that.povolena_editace);
                                        that.actions.actSchvalit?.enabled(that.povolena_editace);
                                    })
                                        .fail(function () {
                                    });
                                }
                            }
                            else {
                                that.actions.actNovy?.enabled(that.povolena_editace);
                                that.actions.actEvidence?.enabled(false);
                                that.actions.actKopie?.enabled(false);
                                that.actions.actStorno?.enabled(false);
                                that.actions.actSchvalit?.enabled(false);
                                that.akt_cis = -1;
                            }
                            console.log("radek", that.akt_cis);
                        },
                        columns: that.gridFormatSeznamVP,
                        rowsCheckVisible: (row) => Gordic.Eko.Grid.getRowsCheckVisible(row),
                        rowsClass: (row) => Gordic.Eko.Grid.getRowsClass(row),
                        defaultProfile: {
                            columnList: this.zjisti_sloupce(that.gridFormatSeznamVP), condFormats: this.my_CondFormats_VP
                        }, //columnList: "zpracovatel, aktivita, cislo, nazev" },
                        profiles: [
                        //{ name: "Zjednodušený", columnList: "zpracovatel, aktivita, cislo, nazev", condFormats: this.my_CondFormats_VP, _locked: true },
                        //{ name: "Úplný", columnList: this.zjisti_sloupce(gridFormatSeznamVP), condFormats: this.my_CondFormats_VP } //gridFormatSeznam.columns.filter((c) => c.name != "kniha").join() },
                        ],
                    });
                    this.mainTable2 = $("<div class='js-SeznamDokladu2'>").appendTo(this.element)
                        .css("height", "60%")
                        .css("overflow", "auto")
                        .gtab({
                        title: "Detail VP", opened: true, locked: true,
                        //menuBar: this.actions.createBar(["actRozdelit*", "actNulovat*", "actUlozit*"])
                    });
                    // .gautofit({ minimalHeight: 420 });
                    this.mainTable2.gform("setup", { name: "Form_DetailVP", layoutDescriptor: "LM2S1" })
                        .gformsection("create", "Popis transakce")
                        .gformrow("addFieldsRow", "Typ položky VP", ["w-12"]).gselectbox(Gordic.Prefabs.Select.vepsdup(), { name: "ixs_dup", model: "model.ixs_dup=value.ixs_dup", dropdown: true, validators: [new Gordic.Validators.Required()] })
                        .gformrow("addFieldsRow", "Název", ["w-12"]).gstringbox({ name: "nazev", validators: [new Gordic.Validators.Required()] })
                        //                .gformrow("addFieldsRow", "Název", ["w-12"]).gstringbox({ name: "nazev", model: "model.nazev=value.nazev" })
                        .gformrow("addFieldsRow", "Rok", ["w-6"]).gnumberbox({ name: "rok_vp", tooltip: that.rok_vp_tooltip, validators: [new Gordic.Validators.Required(), new Gordic.Validators.Range({ min: that.filter_akce.rok_od, max: that.filter_akce.rok_do, message: "Chybně zadaná hodnota" })] })
                        .gformrow("addFieldsRow", "MJ", ["w-6"]).gselectbox(Gordic.Prefabs.Select.gincmej(), { name: "mj", model: "model.mj=value.mj", validators: [new Gordic.Validators.Required()] })
                        .gformrow("addFieldsRow", "Množství", ["w-6"]).gnumberbox({ name: "m_plan", decimals: 3, thousandsSeparator: " ", emptyValue: null, defaultValue: 0, validators: [new Gordic.Validators.Required()] })
                        .gformrow("addFieldsRow", "Celková částka", ["w-6"]).gnumberbox({ name: "c_plan", decimals: 2, thousandsSeparator: " ", emptyValue: null, defaultValue: 0, validators: [new Gordic.Validators.Required()] })
                        .gformsection("create", "Topologie")
                        .gformrow("addFieldsRow", this.globals.Titulek_Ucs, ["w-6"]).gselectbox(Gordic.Prefabs.Select.ekosucs(), { name: "ucs", model: "model.ico=>value.ico; model.ucs=value.ucs", serverFilters: { ico: this.gpc.ico } })
                        .gformrow("addFieldsRow", this.globals.Titulek_Nks, ["w-6"]).gselectbox(Gordic.Prefabs.Select.ekosnks(), { name: "nks", model: "model.ico=>value.ico; model.nks=value.nks", serverFilters: { ico: this.gpc.ico }, validators: [new Gordic.Validators.Required()] })
                        .gformrow("addFieldsRow", this.globals.Titulek_Nks + " zadavatele", ["w-6"]).gselectbox(Gordic.Prefabs.Select.ekosnks(), { name: "nks_zad", model: "model.ico=>value.ico; model.nks_zad=value.nks", serverFilters: { ico: this.gpc.ico } })
                        .gformrow("addFieldsRow", "Stav", ["w-6"]).gselectbox(Gordic.Prefabs.Select.vepcstp(), { name: "vp_stav", disabled: true, model: "model.vp_stav=value.vp_stav" })
                        .gformsection("create", "Interní klasifikace")
                        .gformrow("addFieldsRow", "Inventární číslo", ["w-12"]).gselectbox(Gordic.Prefabs.Select.majsmajADA(), {
                        name: "inv_cis",
                        model: "model.inv_cis=value.inv_cis",
                        change: function (ev, changeObj) {
                        },
                    })
                        .gformrow("addFieldsRow", "KČM/VK", ["w-12"]).gselectbox(Gordic.Prefabs.Select.matskcmADA(), { name: "mat_cis", model: "model.mat_cis=value.idk", validators: [new Gordic.Validators.Required()], filterMinLength: 6 })
                        //                .gformrow("addFieldsRow", "KČM/VK", ["w-12"]).gselectbox(Gordic.Prefabs.Select.majscim(), { name: "mat_cis", model: "model.mat_cis=value.mat_cis", validators: [new Gordic.Validators.Required()] })
                        //                .gformrow("addFieldsRow", "Klasifikace", ["w-12"]).gselectbox(Gordic.Prefabs.Select.ekoskla(), { name: "skp", model: "model.skp=value.skp; model.nazev_skp=value.nazev", validators: [new Gordic.Validators.Required()] })
                        .gformrow("addFieldsRow", "Klasifikace", ["w-12"]).gselectbox(Gordic.Prefabs.Select.ekoskla(), {
                        name: "skp",
                        model: "model.skp=value.skp",
                        change: function (ev, changeObj) {
                            $(ev.currentTarget).gform().findFields("nazev_skp").gfield("setValue", changeObj.value?.nazev);
                        },
                        validators: [new Gordic.Validators.Required()]
                    })
                        .gformrow("addFieldsRow", "Název klasifikace", ["w-12"]).gstringbox({ name: "nazev_skp", disabled: true })
                        .gformsection("create", "Popis")
                        .gformrow("addFieldsRow", "", ["w-12"]).gstringbox({ name: "popis", rows: 3 });
                    // nastav flag podle validatoru
                    var fields = this.findFields(); // všechny políčka
                    Gordic.Utils.Form.markRequired(fields);
                    fields.gfield("option", "disabled", true);
                    // nastavim editovatelnost na filtru
                    that.filterForm.findFields().gfield("option", "disabled", false);
                    //var filterDto: Gordic.Ada.Interface.GVepsplaFilterDto = {};
                    //filterDto.vp_stav = { o: "IN", v: [10, 20, 30] };
                    this.filter_akce.vp_stav = { o: "IN", v: [20, 30] };
                    that.view_ISL = new Gordic.Isl.View(this.isl.AkceVecnyProfil.list({ filters: this.filter_akce }), {
                        key: "rok,ico,cislo,cis_plan",
                        processors: {
                            sumarni_radek: Gordic.Eko.Grid.createSummaryProcessor(that.gridFormatSeznamVP, ["c_plan"])
                        }
                    });
                    cnt.mainTable.ggrid("setData", that.view_ISL);
                    // Fokus na seznammu
                    var focusFunc = function () {
                        cnt.mainTable.ggrid('focus'); // nastavení focusu na grid
                        cnt.view_ISL.off('change.focus'); // odvázání události z ISL view
                    };
                    cnt.view_ISL.on('change.focus', focusFunc); // při změně ISL view se naváže funkce focusFunc
                    cnt.nacti_sumy();
                    cnt.element.gshortcut({
                        key: "ctrl+shift+s",
                        group: Gordic.Shortcuts.Groups.App,
                        description: "Souhrn VP",
                        action: cnt.actions.actSouhrn
                    });
                    //this.isl.AkceVecnyProfil.list_Suma(rq => { return { filters: this.filter_akce }; })
                    //    .getData()
                    //    .then(function ( data_suma ) { 
                    //        cnt.data_preview.data = data_suma;
                    //        that.previewController.show(cnt.data_preview);
                    //    });                
                    // data
                    //   // načtení seznamu
                    //   // objekt pro předávání hodnot
                    //   interface returnObjType {
                    //       data: Gordic.Ada.Interface.GVepsplaDto[] | null
                    //   };
                    //   let returnObj: returnObjType = {
                    //       data: null
                    //   };
                    //   // deferred objekt pro zřetězení otázek
                    //   let def = $.Deferred().resolve(returnObj).promise();
                    //   // obsluha jednotlivých fází
                    //   this.beginOperation("Načítám data"); 
                    //   def.then(function (returnObj: returnObjType) {
                    //       let def = $.Deferred();
                    //   that.isl.AkceVecnyProfil.list(rq => { return { filters: that.filter_akce} })
                    //       .get()
                    //       .done(function (response) {
                    //           returnObj.data = response.data;
                    //           def.resolve(returnObj);
                    //       })
                    //       .fail(function () {
                    //           // operace nedopadla
                    //           def.reject();
                    //       });
                    //   //}
                    //   return def.promise();
                    //   })
                    //   .then(function (returnObj: returnObjType) {
                    //       let def = $.Deferred();
                    //       // úprava dat
                    //       AdaGrid.VecnyProfil.modifyDto(returnObj.data)
                    //           .done(function (data) {
                    //               returnObj.data = data;
                    //               def.resolve(returnObj);
                    //           });
                    //       return def.promise();
                    //   })
                    //.done(function(returnObj: returnObjType) {
                    //       // pohled
                    //       //that.view_ISL = new Gordic.Isl.View(returnObj.data!, { key: "rok,ico,cislo,cis_plan" });
                    //       let view = new Gordic.Data.View(returnObj.data!, { key: "rok,ico,cislo,cis_plan" });
                    //       // nastavení dat a překreslení gridu
                    //       cnt.mainTable.ggrid("setData", view); //that.view_ISL);
                    //       // nastavení okna
                    //       //that.enable();
                    //   })
                    //   .always(function() {
                    //       that.endOperation();
                    //   });
                }
                ;
                zjisti_sloupce(gf) {
                    return gf.columns.filter(e => e.hidden != true).map(e => e.name).join(',');
                }
                novy() {
                    var that = this;
                    this.mainTable2.findFields().gfield("option", "disabled", false);
                    this.mainTable2.findFields("nazev_skp,vp_stav").gfield("option", "disabled", true);
                    var zaznam = {};
                    that.akt_cis = 0;
                    zaznam.rok = this.filter_akce.rok;
                    zaznam.ico = this.filter_akce.ico;
                    zaznam.cislo = this.filter_akce.cislo;
                    zaznam.cis_plan = that.akt_cis;
                    zaznam.vp_stav = 10;
                    zaznam.c_plan = new Decimal(0);
                    zaznam.m_plan = new Decimal(0);
                    that.blok_selection = true;
                    that.view_ISL.updateData(zaznam, "add");
                    that.mainTable.ggrid("activeRow", zaznam);
                    that.blok_selection = false;
                    this.mainTable2.findFields().gfield("clear", {});
                    this.mainTable2.findFields().gfield("model", "apply", zaznam);
                    this.actions.actNovy?.enabled(false);
                    this.actions.actEvidence?.enabled(that.povolena_editace);
                    this.actions.actKopie?.enabled(false);
                    this.actions.actStorno?.enabled(false);
                    this.actions.actSchvalit?.enabled(false);
                }
                ;
                kopie() {
                    var that = this;
                    if (that.akt_cis >= 0) {
                        this.mainTable2.findFields().gfield("option", "disabled", false);
                        this.mainTable2.findFields("nazev_skp,vp_stav").gfield("option", "disabled", true);
                        var zaznam = {};
                        zaznam.rok = this.filter_akce.rok;
                        zaznam.ico = this.filter_akce.ico;
                        zaznam.cislo = this.filter_akce.cislo;
                        zaznam.cis_plan = that.akt_cis;
                        that.isl.AkceVecnyProfil.read({ data: zaznam })
                            .get()
                            .done(function (response) {
                            that.akt_cis = 0;
                            response.data.vp_stav = 10;
                            //response.data.vp_stav_nazev = "Návrh";
                            zaznam.vp_stav = 10;
                            that.view_ISL.updateData(zaznam, "add");
                            that.blok_selection = true;
                            that.mainTable.ggrid("activeRow", zaznam);
                            that.blok_selection = false;
                            that.akt_cis = 0;
                            that.mainTable2.findFields().gfield("reset");
                            that.mainTable2.findFields().gfield("model", "apply", response.data, { initialValues: true });
                            //that.mainTable2.findFields().gfield("confirm");
                        })
                            .fail(function () {
                        });
                        this.actions.actNovy?.enabled(false);
                        this.actions.actEvidence?.enabled(that.povolena_editace);
                        this.actions.actKopie?.enabled(false);
                        this.actions.actStorno?.enabled(false);
                        this.actions.actSchvalit?.enabled(false);
                    }
                }
                ;
                evidence() {
                    var that = this;
                    var zaznam = {};
                    if (that.akt_cis >= 0) {
                        zaznam.rok = this.filter_akce.rok;
                        zaznam.ico = this.filter_akce.ico;
                        zaznam.cislo = this.filter_akce.cislo;
                        zaznam.cis_plan = that.akt_cis;
                        var $cDiv = $(this.contentDiv);
                        //this.contentDiv.showFlash({ label: 'Ukladam akci ' + cislo });
                        if ($cDiv.findForms().gform("isValid", true)) {
                            //var dto = {};
                            var v_pole_detail = $cDiv.findForms("Form_DetailVP").findFields();
                            v_pole_detail.gfield("model", "collect", zaznam);
                            v_pole_detail.gfield("confirm");
                            if (that.akt_cis === 0) {
                                that.isl.AkceVecnyProfil.create({ data: zaznam })
                                    .get()
                                    .then(function (response) {
                                    //that.view_ISL.updateData(response.data, "update");
                                    that.view_ISL.requestData({ filters: that.model_filtr });
                                    that.nacti_sumy();
                                })
                                    .fail(function () {
                                });
                            }
                            else {
                                that.isl.AkceVecnyProfil.update({ data: zaznam })
                                    .get()
                                    .then(function (response) {
                                    //that.view_ISL.updateData(response.data, "update");
                                    that.view_ISL.requestData({ filters: that.model_filtr });
                                    that.nacti_sumy();
                                })
                                    .fail(function () {
                                });
                            }
                            that.view_ISL.requestData({ updateMode: "update", filters: that.model_filtr }); // xxx aktualni filtr
                            this.actions.actNovy?.enabled(that.povolena_editace);
                            this.actions.actEvidence?.enabled(that.povolena_editace);
                            this.actions.actKopie?.enabled(that.povolena_editace);
                            this.actions.actStorno?.enabled(that.povolena_editace);
                            this.actions.actSchvalit?.enabled(that.povolena_editace);
                            //    that.isl.AkceVecnyProfil.read({ data: zaznam })
                            //        .get()
                            //        .done(function (response) {
                            //            that.isl.AkceVecnyProfil.update({ data: response.data })
                            //                .get()
                            //                .then(function (response) {
                            //                    that.view_ISL.updateData(response.data, "update");
                            //                })
                            //                .fail(function () {
                            //                });
                            //        })
                            //        .fail(function () {
                            //        });
                        }
                        ;
                    }
                }
                ;
                schvalit() {
                    var that = this;
                    var zaznam = {};
                    if (that.akt_cis >= 0) {
                        zaznam.rok = this.filter_akce.rok;
                        zaznam.ico = this.filter_akce.ico;
                        zaznam.cislo = this.filter_akce.cislo;
                        zaznam.cis_plan = that.akt_cis;
                        that.isl.AkceVecnyProfil.read({ data: zaznam })
                            .get()
                            .done(function (response) {
                            that.isl.AkceVecnyProfil.schvalit({ data: response.data })
                                .get()
                                .then(function (response) {
                                //that.view_ISL.updateData(response.data, "update");
                                that.view_ISL.requestData({ filters: that.model_filtr });
                            })
                                .fail(function () {
                            });
                        })
                            .fail(function () {
                        });
                    }
                }
                ;
                storno() {
                    var that = this;
                    var zaznam = {};
                    if (that.akt_cis >= 0) {
                        zaznam.rok = this.filter_akce.rok;
                        zaznam.ico = this.filter_akce.ico;
                        zaznam.cislo = this.filter_akce.cislo;
                        zaznam.cis_plan = that.akt_cis;
                        that.isl.AkceVecnyProfil.read({ data: zaznam })
                            .get()
                            .done(function (response) {
                            if (response.data.vp_stav == 90) {
                                that.isl.AkceVecnyProfil.undelete({ data: response.data })
                                    .get()
                                    .then(function (response) {
                                    //that.view_ISL.updateData(response.data, "update");
                                    that.view_ISL.requestData({ filters: that.model_filtr });
                                    that.nacti_sumy();
                                })
                                    .fail(function () {
                                });
                            }
                            else {
                                that.isl.AkceVecnyProfil.delete({ data: response.data })
                                    .get()
                                    .then(function (response) {
                                    //that.view_ISL.updateData(response.data, "update");
                                    that.view_ISL.requestData({ filters: that.model_filtr });
                                    that.nacti_sumy();
                                })
                                    .fail(function () {
                                });
                            }
                        })
                            .fail(function () {
                        });
                        //var tlacitka: GDialogButton[];
                        //var tlacitko: GDialogButton;
                        //tlacitka = [];
                        //tlacitko = { id: "ano", text: "Ano", autofocus: false };
                        //tlacitka.push(tlacitko);
                        //tlacitko = { id: "ne", text: "Ne", autofocus: true, primary: true };
                        //tlacitka.push(tlacitko);
                        //this.dialogs.messageBox("Dotaz", "Proúčtováním dokladu dojde k přepočítání rozpočtu o xxx Kč! <br> <br> Skutečně chcete doklad zaúčtovat?", GDlg.mbbYesNo, GDlg.mbiQuestion)
                        //    .on("ano", function () {
                        //    })
                        //    .on("ne", function () {
                        //    })
                        //    ;
                    }
                }
                ;
                nacti_sumy() {
                    var that = this;
                    that.isl.AkceVecnyProfil.list_Suma({ filters: this.filter_akce })
                        .getData()
                        .then(function (data_suma) {
                        that.data_preview.data = data_suma;
                        that.previewController.show(that.data_preview);
                        if (that.l_dialog) {
                            $.content(that.l_dialog).refresh(that.data_preview.data);
                        }
                    });
                }
                ;
                souhrn() {
                    var that = this;
                    that.isl.AkceVecnyProfil.list_Suma({ filters: this.filter_akce })
                        .getData()
                        .then(function (data_suma) {
                        that.data_preview.data = data_suma;
                        that.l_dialog = that.dialogs.showWindow("Gordic.Ada.WebClient.GAkceVecnyProfilSouhrn", {
                            id: 'souhrnVP#',
                            modelSouhrnVP: that.data_preview.data,
                            filter_akce: that.filter_akce
                        }, "Souhrn VP", 600, 450, true)
                            .on("close", function () {
                            that.l_dialog = null;
                        });
                    });
                }
                ;
            };
            GAkceVecnyProfil = __decorate([
                gcontent
            ], GAkceVecnyProfil);
            WebClient.GAkceVecnyProfil = GAkceVecnyProfil;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrY2VWZWNueVByb2ZpbC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWtjZVZlY255UHJvZmlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBdTBCZjtBQXYwQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBdTBCbkI7SUF2MEJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F1MEI3QjtRQXYwQm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsT0FBQSxZQUFZO2dCQUFsRDs7b0JBRUksVUFBSyxHQUFHLGNBQWMsQ0FBQyxDQUFDLG1FQUFtRTtvQkFlbkYsWUFBTyxHQUFXLENBQUMsQ0FBQztvQkFDcEIsbUJBQWMsR0FBWSxLQUFLLENBQUM7b0JBRWhDLG1CQUFjLEdBQVcsRUFBRSxDQUFDO29CQVc1QixpQkFBWSxHQUFRLEVBQUUsQ0FBQztvQkFFdkIsZ0JBQVcsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQWl5Qi9DLENBQUM7Z0JBL3hCRyxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFMUMsZ0pBQWdKO29CQUVoSiw0REFBNEQ7b0JBRWhELElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsbUVBQW1FO29CQUUxSCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRWIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO29CQUVmLElBQUksQ0FBQyxJQUFJLENBQUMsV0FB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LGdCQUFnQixDQWswQjVCO1lBbDBCWSwwQkFBZ0IsbUJBazBCNUIsQ0FBQTtRQUNMLENBQUMsRUF2MEJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF1MEI3QjtJQUFELENBQUMsRUF2MEJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF1MEJuQjtBQUFELENBQUMsRUF2MEJTLE1BQU0sS0FBTixNQUFNLFFBdTBCZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIS8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZVZlY255UHJvZmlsLmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR0FrY2VWZWNueVByb2ZpbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSBJbGXEjWVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxNi0wMy0wMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG4qL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5BZGEuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0FrY2VWZWNueVByb2ZpbCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHRpdGxlID0gXCJWxJtjbsO9IHByb2ZpbFwiOyAvL2FieSBzZSBkYWxvIHDFmWlzdG91cGl0IHogYnJlYWRjcnVtYnMsIGplIG5hc3RhdmVubyB6ZGUgbcOtc3RvIHYgQyNcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2aWV3Q29udHJvbGxlcjogR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcjtcclxuICAgICAgICBwcml2YXRlIHByZXZpZXdQYW5lbHNEZWZpbml0aW9uO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkFkYS5JbnRlcmZhY2UuR1ZlcHNwbGFEdG8+O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyRm9ybTogSlF1ZXJ5O1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZmlsdGVyX2FrY2U6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdWZXBzcGxhRmlsdGVyRHRvO1xyXG4gICAgICAgIHByaXZhdGUgcG92b2xlbmFfZWRpdGFjZTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgLy8gICAgICAgIHByaXZhdGUgZ2xvYmFscyA9IEdvcmRpYy5BZGEuR2xvYmFscy5HQWRhR2xvYmFscztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGdsb2JhbHM6IEdvcmRpYy5BZGEuV2ViQ2xpZW50LkRUTy5HQWRhR2xvYmFsc0R0bztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBha3RfY2lzOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIHByaXZhdGUgYmxva19zZWxlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByb2tfdnBfdG9vbHRpcDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkRm9ybWF0U2V6bmFtVlAgOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0O1xyXG5cclxuICAgICAgICBwcml2YXRlIG1haW5UYWJsZTogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgbWFpblRhYmxlMjogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgbF9kaWFsb2c/OiBKUXVlcnl8bnVsbDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBteV9Db25kRm9ybWF0X1ZQOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXQ7XHJcbiAgICAgICAgcHJpdmF0ZSBteV9Db25kRm9ybWF0c19WUDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0W107XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGF0YV9wcmV2aWV3OiBhbnkgPSB7fTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RlbF9maWx0ciA9IHsgdnBfc3RhdjogWzIwLDMwXSB9O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyICR0YWIgPSAkKHRoaXMuY29udGVudERpdik7XHJcblxyXG4vLyAgICAgICAgICAgIHZhciBtYWluRm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwic2V0dXBcIiwgeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIgfSkuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIpO1xyXG5cclxuLy8gICAgICAgICAgICB0aGlzLmdsb2JhbHMgPSBHb3JkaWMuQWRhLkdsb2JhbHMuR0FkYUdsb2JhbHM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJWxJtjbsO9IHByb2ZpbCBcIiArIHRoaXMuZmlsdGVyX2FrY2UuY2lzbG87IC8vYWJ5IHNlIGRhbG8gcMWZaXN0b3VwaXQgeiBicmVhZGNydW1icywgamUgbmFzdGF2ZW5vIHpkZSBtw61zdG8gdiBDI1xyXG5cclxuICAgICAgICAgICAgJHRhYi5lbXB0eSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoKHRoYXQuZmlsdGVyX2FrY2Uucm9rX29kID09IG51bGwpIHx8ICh0aGF0LmZpbHRlcl9ha2NlLnJva19vZCA9PSB1bmRlZmluZWQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbHRlcl9ha2NlLnJva19vZCA9IDE5MDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCh0aGF0LmZpbHRlcl9ha2NlLnJva19kbyA9PSBudWxsKSB8fCAodGhhdC5maWx0ZXJfYWtjZS5yb2tfZG8gPT0gdW5kZWZpbmVkKSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maWx0ZXJfYWtjZS5yb2tfZG8gPSAyMDk5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQucm9rX3ZwX3Rvb2x0aXAgPSBcIlJvayAoIFwiICsgdGhhdC5maWx0ZXJfYWtjZS5yb2tfb2QgKyBcIiAtIFwiICsgdGhhdC5maWx0ZXJfYWtjZS5yb2tfZG8gKyBcIiApXCI7XHJcblxyXG4gICAgICAgICAgICAvLyA/Pz8gSklcclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhhdC50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hY3Rpb246IG5ldyBHQWN0aW9uKHsgbmFtZTogXCJhY3RCYWNrXCIsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnRyeUNsb3NlQWxsQ2hpbGRDb250ZW50cygpOyB9IH0pIC8vIHphdsWZZW7DrSB2xaFlY2ggb2tlbiBvdGV2xZllbsO9Y2ggeiB0b2hvdG8gY29udGVudHVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBtYWluRm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwic2V0dXBcIiwgeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIgfSkuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIGFrY8OtXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3ROb3Z5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOb3bDvVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5vdnkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0S29waWU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktvcGllXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5rb3BpZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RFdmlkZW5jZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRXZpZGVuY2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmV2aWRlbmNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFNjaHZhbGl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTY2h2w6FsaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuc2NodmFsaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0U3Rvcm5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdG9ybm9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuc3Rvcm5vKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgXHJcbiAgICAgICAgICAgICAgICBhY3RTb3Vocm46IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNvdWhyblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5zb3Vocm4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0T2JjZXJzdHZpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2LEjWVyc3R2aXRcIiwgaWNvbjogXCJmYS1yZWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsX2ZpbHRyICYmIHRoYXQubW9kZWxfZmlsdHIudnBfc3RhdiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tb2RlbF9maWx0ci52cF9zdGF2Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbF9maWx0ci52cF9zdGF2LnB1c2goOTkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC5yZXF1ZXN0RGF0YSh7IGZpbHRlcnM6IHRoYXQubW9kZWxfZmlsdHIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE5vdnk/LmVuYWJsZWQodGhhdC5wb3ZvbGVuYV9lZGl0YWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdEV2aWRlbmNlPy5lbmFibGVkKHRoYXQucG92b2xlbmFfZWRpdGFjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RLb3BpZT8uZW5hYmxlZCh0aGF0LnBvdm9sZW5hX2VkaXRhY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vPy5lbmFibGVkKHRoYXQucG92b2xlbmFfZWRpdGFjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTY2h2YWxpdD8uZW5hYmxlZCh0aGF0LnBvdm9sZW5hX2VkaXRhY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0Q2xvc2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpydcWhaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE5vdnkqXCIsIFwiYWN0S29waWUqXCIsIFwiYWN0RXZpZGVuY2UqXCIsIFwiYWN0U2NodmFsaXQqXCIsIFwiYWN0U3Rvcm5vKlwiLCBcImFjdE9iY2Vyc3R2aXQqXCJdLCBbXCJhY3RTb3Vocm4qXCJdKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RDbG9zZVwiXSkpXHJcblxyXG4gICAgICAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAvLyAgIFNpZGViYXIgLSBuw6FobGVkIG5hIHNlem5hbXVcclxuICAgICAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICB0aGlzLnByZXZpZXdQYW5lbHNEZWZpbml0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgdGFiczogW1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmV2aWV3cy5nZXREZWZhdWx0UHJldmlld1RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdJZDogXCJhZGE6QWtjZVZQXCIgIC8vIGlkIHByZXZpZXcsIGt0ZXLDqSBtw6EgYsO9dCB6b2JyYXplbm8sIHDFmcOtcGFkbsSbIGZ1bmtjZSBrdGVyw6EgcG9kbGUgbG9hZFBhcmFtcyB2csOhdMOtIHZpZXdJZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyID0gbmV3IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXIodGhpcy5lbGVtZW50LCB0aGlzLnByZXZpZXdQYW5lbHNEZWZpbml0aW9uKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5wcmV2aWV3Q29udHJvbGxlci5yZWdpc3RlclBhbmVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkRm9ybWF0U2V6bmFtVlAgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuQWRhLkludGVyZmFjZS5HVmVwc3BsYUR0bz4oKVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2cF9zdGF2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbi8vICAgICAgICAgICAgICAgICAgICBmb3JjZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaXNfcGxhblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rX3ZwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSb2tcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZHVwX25hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUeXAgcG9sb8W+a3kgVlBcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjUwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnBfc3Rhdl9uYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTsOhemV2IHBvbG/Fvmt5IFZQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImludl9jaXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkludmVudMOhcm7DrSDEjcOtc2xvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1hdF9jaXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkvEjE0vVktcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2twXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLbGFzaWZpa2FjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtal9uYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTUpcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1fcGxhblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTW5vxb5zdHbDrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBcIm51bWJlcihDMylcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wbGFuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJDZWxrb3bDoSDEjcOhc3RrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLmdsb2JhbHMuVGl0dWxla19VY3MhLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5nbG9iYWxzLlRpdHVsZWtfTmtzISxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NfemFkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5nbG9iYWxzLlRpdHVsZWtfTmtzISArIFwiIHphZGF2YXRlbGVcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZfc2twXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOw6F6ZXYgU0tQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM1MFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm15X0NvbmRGb3JtYXRzX1ZQID0gW107XHJcblxyXG4gICAgICAgICAgICB0aGlzLm15X0NvbmRGb3JtYXRfVlAgPSB7IGRlc2NyaXB0aW9uOiBcIlN0b3Jub3bDoW5vXCIsIGZvcm11bGE6IFwiQHZwX3N0YXYgPT0gOTBcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5yZWQgfTtcclxuICAgICAgICAgICAgdGhpcy5teV9Db25kRm9ybWF0c19WUC5wdXNoKHRoaXMubXlfQ29uZEZvcm1hdF9WUCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmlsdGVyRm9ybURlZiA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcIktvbXBsZXRuw60gZmlsdHJcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJ3LUwtOSB3LU0tOSB3LVMtMTJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAgIGZpbHRlckZvcm1EZWZcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnZlcGNzdHAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnBfc3Rhdl9mXCIsIG1vZGVsOiBcIm1vZGVsLnZwX3N0YXY9dmFsdWUudnBfc3RhdlwiLCBtdWx0aTogdHJ1ZSwgbGlzdDogdHJ1ZSwgaXRlbVdpZHRoOiBcIlwiLCBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBbeyB2cF9zdGF2OiAyMCB9LCB7IHZwX3N0YXY6IDMwIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnBfc3RhdjogWzIwLDMwLDkwXSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGF1dG9tYXRpY2vDqSBuYcSNdGVuw60gcG8gem3Em27EmyBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouZmxhZ3MuaXNLb250cm9sbmlEaXYgfHwgb2JqLmZsYWdzLm5vQ2hhbmdlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkdG8gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXJGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGR0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyRm9ybSEuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIiwgZHRvKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmZpbHRlckZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBwcm8gRUtPXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maWx0ZXJWaWV3TW9kZVVzZXJTZXR0aW5nczogW0ZpbHRlclZpZXdNb2RlLlNpbXBsZSwgRmlsdGVyVmlld01vZGUuRGV0YWlsLCBGaWx0ZXJWaWV3TW9kZS5Ob3JtYWxdLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLkRldGFpbCxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZVVzZXJTZXR0aW5nczogW0ZpbHRlclZpZXdNb2RlLlNpbXBsZV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3BvT3RldnJlbmlPdGV2cml0UGFuZWxQb2RtaW5lazogZmFsc2UsICAgICAvLyBkZWZhdWx0IHBybyB1xb5pdmF0ZWxza8OpIG5hc3RhdmVuw61cclxuICAgICAgICAgICAgICAgICAgICBwb1Z5aGxlZGFuaVpvYnJheml0OiBcIlZ5aGxlZGFuZVBvZG1pbmt5VkJhZGdlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvYWRBZnRlckNob3NlRmlsdGVyOiBmYWxzZSwgICAgICAgIC8vIEF1dG9tYXRpY2vDqSB2eWhsZWTDoW7DrSBwbyB6bcSbbsSbIHVsb8W+ZW7DqWhvXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJGaWx0ZXJCdXR0b25WaXNpYmxlOiBcIk5ldmVyVmlzaWJsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbEFjdGlvbkFzQ2hlY2tib3g6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2lkU2ltcGxlTW9kZTpcImlkU2ltcGxlTW9kZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbZmlsdGVyRm9ybURlZl0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogYnVkZSBuxJtqYWvDqSBsZXDFocOtIHVrbMOhZGFjw60gb2tubyBuZWJvIGJ1ZHUgbXVzZXQgdWTEm2xhdCBzdm9qZSBhIG5hc3Rhdml0IGhvIGRvIHNhdmVPcHRpb25zRm9ybT9cclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZXM6IFtcInZwX3N0YXZcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHrFr3N0YW5lIHRvaGxlIHTDqW1hIG5lYm8gYnVkZSBwcm8gTEsgamluw6kgbmXFviBwcm8gVEs/XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJhZGFfcHRtX2FkYWJhczJcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdG9yYWdlU2VydmljZTogbmV3IEdvcmRpYy5HaW4uRmlsdGVyU3RvcmFnZVNlcnZpY2UuU3RvcmUoKSxcclxuICAgICAgICAgICAgICAgICAgICBzYXZlT3B0aW9uc0Zvcm06IFwiZWtvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RyaWN0U3RvcEF1dG9Mb2FkOiB0cnVlLCAgICAgICAgICAgICAgIC8vIFN0cmlrdG7EmyB6YWvDocW+ZSBhdXRvbWF0aWNrw6kgbmHEjXRlbsOtIGhuZWQgcG8gb3RldsWZZW7DrSBzZXpuYW11LCBvYmzDrWJlbsO9IGZpbHRyIHNlIHBvdXplIHDFmWVkcGxuw60uXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGV4dEl0ZW1UZW1wbGF0ZTogXCJ7ZGVzY3JpcHRpb259XCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAoZXZlbnQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0IHBvZGxlIGZpbHRyxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbF9maWx0ciA9IG9iai5maWx0ZXI7IC8vIHRoYXQubW9kZWxfZmlsdHIudnBfc3RhdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tb2RlbF9maWx0ciAmJiB0aGF0Lm1vZGVsX2ZpbHRyLnZwX3N0YXYgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxfZmlsdHIudnBfc3Rhdi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxfZmlsdHIudnBfc3Rhdi5wdXNoKCA5OSApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC5yZXF1ZXN0RGF0YSh7IGZpbHRlcnM6IHRoYXQubW9kZWxfZmlsdHIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLm1haW5UYWJsZSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjMwJVwiKVxyXG4gICAgICAgICAgICAgICAgLy8uYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KHsgbWluaW1hbEhlaWdodDogNDAwIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IEdvcmRpYy5BZGEuV2ViQ2xpZW50LkFkYUZ1bmN0aW9uLnpqaXN0aV9zbG91cGNlX3NlYXJjaCh0aGF0LmdyaWRGb3JtYXRTZXpuYW1WUCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBkYXRhX3ByZXZpZXc6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RhdGFfcHJldmlldy5kYXRhID0gdGhhdC52aWV3X0lTTC5nZXREYXRhUm93cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucHJldmlld0NvbnRyb2xsZXIuc2hvdyhkYXRhX3ByZXZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8vdGhhdC5wcmV2aWV3Q29udHJvbGxlci5zaG93KHRoYXQudmlld19JU0wuZ2V0RGF0YVJvd3MoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2ZpZWxkcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSApIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZ5YnJhbmVSYWRreSA9IG8uZ2V0U2VsZWN0aW9uKCk7IC8vY250LmZpbmQoXCIuanMtU2V6bmFtRG9rbGFkdVwiKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTsgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gcMWZZXMgdnlobGVkw6Fuw60gZ3JpZHUgKHDFmWVzIGNsYXNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodnlicmFuZVJhZGt5Lmxlbmd0aCA9PT0gMSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIGV4aXN0dWplIHZ5YnJhbsO9IHrDoXpuYW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWt0X2NpcyA9IHZ5YnJhbmVSYWRreVswXS5jaXNfcGxhbiE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh0aGF0LmFrdF9jaXMgPiAwKSAmJiAodGhhdC5ibG9rX3NlbGVjdGlvbiA9PSBmYWxzZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgUmFkZWs6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdWZXBzcGxhRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJhZGVrID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJhZGVrLnJvayA9IHZ5YnJhbmVSYWRreVswXS5yb2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmFkZWsuaWNvID0gdnlicmFuZVJhZGt5WzBdLmljbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSYWRlay5jaXNsbyA9IHZ5YnJhbmVSYWRreVswXS5jaXNsbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSYWRlay5jaXNfcGxhbiA9IHZ5YnJhbmVSYWRreVswXS5jaXNfcGxhbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuQWtjZVZlY255UHJvZmlsLnJlYWQoeyBkYXRhOiBSYWRlayB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGRzID0gdGhhdC5tYWluVGFibGUyLmZpbmRGaWVsZHMoKTsgLy8gdsWhZWNobnkgcG9sw63EjWthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHMuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCByZXNwb25zZS5kYXRhLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7IC8vIG5hc3RhdsOtIGhvZG5vdHkgamFrbyBpbml0VmFsdWUsIHBhayBzZSBkw6EgemVwdGF0IG5hIGhhc0NoYW5nZWQgKHBvcm92bsOhIGluaXRpYWxWYWx1ZSB2cyB2YWx1ZSwgcG91xb5pamUgc2UgbmFwxZkuIHYgY2xvc2luZykuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKSAvL2Rpc2FibGUgdsWhZWNoIHBvbMOtxI1laywgcG9kbGUgZWRpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzLmZpbmRGaWVsZHMoXCJuYXpldl9za3AsdnBfc3RhdlwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3ROb3Z5Py5lbmFibGVkKHRoYXQucG92b2xlbmFfZWRpdGFjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RXZpZGVuY2U/LmVuYWJsZWQodGhhdC5wb3ZvbGVuYV9lZGl0YWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RLb3BpZT8uZW5hYmxlZCh0aGF0LnBvdm9sZW5hX2VkaXRhY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFN0b3Jubz8uZW5hYmxlZCh0aGF0LnBvdm9sZW5hX2VkaXRhY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFNjaHZhbGl0Py5lbmFibGVkKHRoYXQucG92b2xlbmFfZWRpdGFjZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE5vdnk/LmVuYWJsZWQodGhhdC5wb3ZvbGVuYV9lZGl0YWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RFdmlkZW5jZT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0S29waWU/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFN0b3Jubz8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U2NodmFsaXQ/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha3RfY2lzID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmFkZWtcIiwgdGhhdC5ha3RfY2lzKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5ncmlkRm9ybWF0U2V6bmFtVlAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJvd3NDaGVja1Zpc2libGU6IChyb3cpID0+IEVrby5HcmlkLmdldFJvd3NDaGVja1Zpc2libGUocm93KSxcclxuICAgICAgICAgICAgICAgICAgICByb3dzQ2xhc3M6IChyb3cpID0+IEVrby5HcmlkLmdldFJvd3NDbGFzcyhyb3cpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiB0aGlzLnpqaXN0aV9zbG91cGNlKHRoYXQuZ3JpZEZvcm1hdFNlem5hbVZQKSwgY29uZEZvcm1hdHM6IHRoaXMubXlfQ29uZEZvcm1hdHNfVlBcclxuICAgICAgICAgICAgICAgICAgICB9LCAvL2NvbHVtbkxpc3Q6IFwienByYWNvdmF0ZWwsIGFrdGl2aXRhLCBjaXNsbywgbmF6ZXZcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8veyBuYW1lOiBcIlpqZWRub2R1xaFlbsO9XCIsIGNvbHVtbkxpc3Q6IFwienByYWNvdmF0ZWwsIGFrdGl2aXRhLCBjaXNsbywgbmF6ZXZcIiwgY29uZEZvcm1hdHM6IHRoaXMubXlfQ29uZEZvcm1hdHNfVlAsIF9sb2NrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy97IG5hbWU6IFwiw5pwbG7DvVwiLCBjb2x1bW5MaXN0OiB0aGlzLnpqaXN0aV9zbG91cGNlKGdyaWRGb3JtYXRTZXpuYW1WUCksIGNvbmRGb3JtYXRzOiB0aGlzLm15X0NvbmRGb3JtYXRzX1ZQIH0gLy9ncmlkRm9ybWF0U2V6bmFtLmNvbHVtbnMuZmlsdGVyKChjKSA9PiBjLm5hbWUgIT0gXCJrbmloYVwiKS5qb2luKCkgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tYWluVGFibGUyID0gJChcIjxkaXYgY2xhc3M9J2pzLVNlem5hbURva2xhZHUyJz5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjYwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcIm92ZXJmbG93XCIsIFwiYXV0b1wiKVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRldGFpbCBWUFwiLCBvcGVuZWQ6IHRydWUsIGxvY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL21lbnVCYXI6IHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0Um96ZGVsaXQqXCIsIFwiYWN0TnVsb3ZhdCpcIiwgXCJhY3RVbG96aXQqXCJdKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgLy8gLmdhdXRvZml0KHsgbWluaW1hbEhlaWdodDogNDIwIH0pO1xyXG5cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLm1haW5UYWJsZTIuZ2Zvcm0oXCJzZXR1cFwiLCB7IG5hbWU6IFwiRm9ybV9EZXRhaWxWUFwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkxNMlMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIiwgXCJQb3BpcyB0cmFuc2FrY2VcIilcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlR5cCBwb2xvxb5reSBWUFwiLCBbXCJ3LTEyXCJdKS5nc2VsZWN0Ym94KEdvcmRpYy5QcmVmYWJzLlNlbGVjdC52ZXBzZHVwKCksIHsgbmFtZTogXCJpeHNfZHVwXCIsIG1vZGVsOiBcIm1vZGVsLml4c19kdXA9dmFsdWUuaXhzX2R1cFwiLCBkcm9wZG93bjogdHJ1ZSwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KVxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwiTsOhemV2XCIsIFtcInctMTJcIl0pLmdzdHJpbmdib3goeyBuYW1lOiBcIm5hemV2XCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSlcclxuLy8gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwiTsOhemV2XCIsIFtcInctMTJcIl0pLmdzdHJpbmdib3goeyBuYW1lOiBcIm5hemV2XCIsIG1vZGVsOiBcIm1vZGVsLm5hemV2PXZhbHVlLm5hemV2XCIgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJSb2tcIiwgW1widy02XCJdKS5nbnVtYmVyYm94KHsgbmFtZTogXCJyb2tfdnBcIiwgdG9vbHRpcDogdGhhdC5yb2tfdnBfdG9vbHRpcCwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IHRoYXQuZmlsdGVyX2FrY2Uucm9rX29kLCBtYXg6IHRoYXQuZmlsdGVyX2FrY2Uucm9rX2RvLCBtZXNzYWdlOiBcIkNoeWJuxJsgemFkYW7DoSBob2Rub3RhXCIgfSldIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJNSlwiLCBbXCJ3LTZcIl0pLmdzZWxlY3Rib3goR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmNtZWooKSwgeyBuYW1lOiBcIm1qXCIsIG1vZGVsOiBcIm1vZGVsLm1qPXZhbHVlLm1qXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSlcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIk1ub8W+c3R2w61cIiwgW1widy02XCJdKS5nbnVtYmVyYm94KHsgbmFtZTogXCJtX3BsYW5cIiwgZGVjaW1hbHM6IDMsIHRob3VzYW5kc1NlcGFyYXRvcjogXCIgXCIsIGVtcHR5VmFsdWU6IG51bGwsIGRlZmF1bHRWYWx1ZTogMCwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KVxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwiQ2Vsa292w6EgxI3DoXN0a2FcIiwgW1widy02XCJdKS5nbnVtYmVyYm94KHsgbmFtZTogXCJjX3BsYW5cIiwgZGVjaW1hbHM6IDIsIHRob3VzYW5kc1NlcGFyYXRvcjogXCIgXCIsIGVtcHR5VmFsdWUgOiBudWxsLCBkZWZhdWx0VmFsdWU6IDAsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIsIFwiVG9wb2xvZ2llXCIpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgdGhpcy5nbG9iYWxzLlRpdHVsZWtfVWNzISwgW1widy02XCJdKS5nc2VsZWN0Ym94KEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdWNzKCksIHsgbmFtZTogXCJ1Y3NcIiwgbW9kZWw6IFwibW9kZWwuaWNvPT52YWx1ZS5pY287IG1vZGVsLnVjcz12YWx1ZS51Y3NcIiwgc2VydmVyRmlsdGVyczogeyBpY286IHRoaXMuZ3BjLmljbyB9fSlcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCB0aGlzLmdsb2JhbHMuVGl0dWxla19Oa3MhLCBbXCJ3LTZcIl0pLmdzZWxlY3Rib3goR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3Nua3MoKSwgeyBuYW1lOiBcIm5rc1wiLCBtb2RlbDogXCJtb2RlbC5pY289PnZhbHVlLmljbzsgbW9kZWwubmtzPXZhbHVlLm5rc1wiLCBzZXJ2ZXJGaWx0ZXJzOiB7IGljbzogdGhpcy5ncGMuaWNvIH0sIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSlcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCB0aGlzLmdsb2JhbHMuVGl0dWxla19Oa3MhICsgXCIgemFkYXZhdGVsZVwiLCBbXCJ3LTZcIl0pLmdzZWxlY3Rib3goR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3Nua3MoKSwgeyBuYW1lOiBcIm5rc196YWRcIiwgbW9kZWw6IFwibW9kZWwuaWNvPT52YWx1ZS5pY287IG1vZGVsLm5rc196YWQ9dmFsdWUubmtzXCIsIHNlcnZlckZpbHRlcnM6IHsgaWNvOiB0aGlzLmdwYy5pY28gfX0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJTdGF2XCIsIFtcInctNlwiXSkuZ3NlbGVjdGJveChHb3JkaWMuUHJlZmFicy5TZWxlY3QudmVwY3N0cCgpLCB7IG5hbWU6IFwidnBfc3RhdlwiLCBkaXNhYmxlZDogdHJ1ZSwgbW9kZWw6IFwibW9kZWwudnBfc3Rhdj12YWx1ZS52cF9zdGF2XCIgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIsIFwiSW50ZXJuw60ga2xhc2lmaWthY2VcIilcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIkludmVudMOhcm7DrSDEjcOtc2xvXCIsIFtcInctMTJcIl0pLmdzZWxlY3Rib3goR29yZGljLlByZWZhYnMuU2VsZWN0Lm1hanNtYWpBREEoKSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaW52X2Npc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pbnZfY2lzPXZhbHVlLmludl9jaXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJLxIxNL1ZLXCIsIFtcInctMTJcIl0pLmdzZWxlY3Rib3goR29yZGljLlByZWZhYnMuU2VsZWN0Lm1hdHNrY21BREEoKSwgeyBuYW1lOiBcIm1hdF9jaXNcIiwgbW9kZWw6IFwibW9kZWwubWF0X2Npcz12YWx1ZS5pZGtcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgZmlsdGVyTWluTGVuZ3RoOiA2IH0pXHJcbi8vICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIkvEjE0vVktcIiwgW1widy0xMlwiXSkuZ3NlbGVjdGJveChHb3JkaWMuUHJlZmFicy5TZWxlY3QubWFqc2NpbSgpLCB7IG5hbWU6IFwibWF0X2Npc1wiLCBtb2RlbDogXCJtb2RlbC5tYXRfY2lzPXZhbHVlLm1hdF9jaXNcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KVxyXG5cclxuLy8gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwiS2xhc2lmaWthY2VcIiwgW1widy0xMlwiXSkuZ3NlbGVjdGJveChHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc2tsYSgpLCB7IG5hbWU6IFwic2twXCIsIG1vZGVsOiBcIm1vZGVsLnNrcD12YWx1ZS5za3A7IG1vZGVsLm5hemV2X3NrcD12YWx1ZS5uYXpldlwiLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJLbGFzaWZpa2FjZVwiLCBbXCJ3LTEyXCJdKS5nc2VsZWN0Ym94KEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29za2xhKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNrcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnNrcD12YWx1ZS5za3BcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZXYuY3VycmVudFRhcmdldCkuZ2Zvcm0oKS5maW5kRmllbGRzKFwibmF6ZXZfc2twXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGNoYW5nZU9iai52YWx1ZT8ubmF6ZXYpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJOw6F6ZXYga2xhc2lmaWthY2VcIiwgW1widy0xMlwiXSkuZ3N0cmluZ2JveCh7IG5hbWU6IFwibmF6ZXZfc2twXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiLCBcIlBvcGlzXCIpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJcIiwgW1widy0xMlwiXSkuZ3N0cmluZ2JveCh7IG5hbWU6IFwicG9waXNcIiwgcm93czogMyB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIHRoaXMuZ2xvYmFscy5UaXR1bGVrX05rcyEsIFtcInctNlwiXSkuZ3NlbGVjdGJveChHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc25rcygpLCB7IG5hbWU6IFwibmtzXCIgfSkgLy8gLCBtb2RlbDogXCJpY289aWNvOyBua3M9bmtzO25rc190eHQ9bmF6ZXZcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8uZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgdGhpcy5nbG9iYWxzLlRpdHVsZWtfVWNzISwgW1widy02XCJdKS5nc2VsZWN0Ym94KEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdWNzKCksIHsgbmFtZTogXCJ1Y3NcIiB9KSAvLyAsIG1vZGVsOiBcImljbz1pY287IG5rcz1ua3M7bmtzX3R4dD1uYXpldlwiIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIk1KXCIsIFtcInctNlwiXSkuZ3NlbGVjdGJveChHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY21laigpLCB7IG5hbWU6IFwibWpcIiwgbW9kZWw6IFwibW9kZWwubWo9dmFsdWUubWpcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8uZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJTdGF2XCIsIFtcInctNlwiXSkuZ3NlbGVjdGJveChHb3JkaWMuUHJlZmFicy5TZWxlY3QudmVwY3N0cCgpLCB7IG5hbWU6IFwidnBfc3RhdlwiLCBtb2RlbDogXCJtb2RlbC52cF9zdGF2PXZhbHVlLnZwX3N0YXZcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8uZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJSb2tcIiwgW1widy02XCJdKS5nbnVtYmVyYm94KHsgbmFtZTogXCJyb2tcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8uZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCLEjMOhc3RrYVwiLCBbXCJ3LTZcIl0pLmdudW1iZXJib3goeyBuYW1lOiBcImNfcGxhblwiLCBkZWNpbWFsczogMiwgdGhvdXNhbmRzU2VwYXJhdG9yOiBcIiBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8uZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJNbm/FvnN0dsOtXCIsIFtcInctNlwiXSkuZ251bWJlcmJveCh7IG5hbWU6IFwibV9wbGFuXCIsIGRlY2ltYWxzOiAzLCB0aG91c2FuZHNTZXBhcmF0b3I6IFwiIFwiIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICAvLyBuYXN0YXYgZmxhZyBwb2RsZSB2YWxpZGF0b3J1XHJcbiAgICAgICAgICAgIHZhciBmaWVsZHMgPSB0aGlzLmZpbmRGaWVsZHMoKTsgLy8gdsWhZWNobnkgcG9sw63EjWthXHJcbiAgICAgICAgICAgIFV0aWxzLkZvcm0ubWFya1JlcXVpcmVkKGZpZWxkcyk7XHJcbiAgICAgICAgICAgIGZpZWxkcy5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKSBcclxuXHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmltIGVkaXRvdmF0ZWxub3N0IG5hIGZpbHRydVxyXG4gICAgICAgICAgICB0aGF0LmZpbHRlckZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGZpbHRlckR0bzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1ZlcHNwbGFGaWx0ZXJEdG8gPSB7fTtcclxuICAgICAgICAgICAgLy9maWx0ZXJEdG8udnBfc3RhdiA9IHsgbzogXCJJTlwiLCB2OiBbMTAsIDIwLCAzMF0gfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyX2FrY2UudnBfc3RhdiA9IHsgbzogXCJJTlwiLCB2OiBbMjAsIDMwXSB9O1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuQWtjZVZlY255UHJvZmlsLmxpc3QoeyBmaWx0ZXJzOiB0aGlzLmZpbHRlcl9ha2NlIH0pLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAga2V5OiBcInJvayxpY28sY2lzbG8sY2lzX3BsYW5cIiwgXHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzb3JzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtYXJuaV9yYWRlazogR29yZGljLkVrby5HcmlkLmNyZWF0ZVN1bW1hcnlQcm9jZXNzb3IodGhhdC5ncmlkRm9ybWF0U2V6bmFtVlAsIFtcImNfcGxhblwiXSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY250Lm1haW5UYWJsZS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3X0lTTCk7XHJcblxyXG4gICAgICAgICAgICAvLyBGb2t1cyBuYSBzZXpuYW1tdVxyXG4gICAgICAgICAgICB2YXIgZm9jdXNGdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY250Lm1haW5UYWJsZS5nZ3JpZCgnZm9jdXMnKTsgLy8gbmFzdGF2ZW7DrSBmb2N1c3UgbmEgZ3JpZFxyXG4gICAgICAgICAgICAgICAgKGNudC52aWV3X0lTTCBhcyBhbnkpLm9mZignY2hhbmdlLmZvY3VzJyk7IC8vIG9kdsOhesOhbsOtIHVkw6Fsb3N0aSB6IElTTCB2aWV3XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNudC52aWV3X0lTTC5vbignY2hhbmdlLmZvY3VzJywgZm9jdXNGdW5jKTsgLy8gcMWZaSB6bcSbbsSbIElTTCB2aWV3IHNlIG5hdsOhxb5lIGZ1bmtjZSBmb2N1c0Z1bmNcclxuXHJcbiAgICAgICAgICAgIGNudC5uYWN0aV9zdW15KCk7XHJcblxyXG4gICAgICAgICAgICBjbnQuZWxlbWVudC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcImN0cmwrc2hpZnQrc1wiLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkFwcCxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNvdWhybiBWUFwiLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBjbnQuYWN0aW9ucy5hY3RTb3Vocm5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuaXNsLkFrY2VWZWNueVByb2ZpbC5saXN0X1N1bWEocnEgPT4geyByZXR1cm4geyBmaWx0ZXJzOiB0aGlzLmZpbHRlcl9ha2NlIH07IH0pXHJcbiAgICAgICAgICAgIC8vICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgLy8gICAgLnRoZW4oZnVuY3Rpb24gKCBkYXRhX3N1bWEgKSB7IFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY250LmRhdGFfcHJldmlldy5kYXRhID0gZGF0YV9zdW1hO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5zaG93KGNudC5kYXRhX3ByZXZpZXcpO1xyXG4gICAgICAgICAgICAvLyAgICB9KTsgICAgICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gZGF0YVxyXG5cclxuICAgICAgICAgLy8gICAvLyBuYcSNdGVuw60gc2V6bmFtdVxyXG4gICAgICAgICAvLyAgIC8vIG9iamVrdCBwcm8gcMWZZWTDoXbDoW7DrSBob2Rub3RcclxuICAgICAgICAgLy8gICBpbnRlcmZhY2UgcmV0dXJuT2JqVHlwZSB7XHJcbiAgICAgICAgIC8vICAgICAgIGRhdGE6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdWZXBzcGxhRHRvW10gfCBudWxsXHJcbiAgICAgICAgIC8vICAgfTtcclxuICAgICAgICAgLy8gICBsZXQgcmV0dXJuT2JqOiByZXR1cm5PYmpUeXBlID0ge1xyXG4gICAgICAgICAvLyAgICAgICBkYXRhOiBudWxsXHJcbiAgICAgICAgIC8vICAgfTtcclxuICAgICAgICAgLy8gICAvLyBkZWZlcnJlZCBvYmpla3QgcHJvIHrFmWV0xJt6ZW7DrSBvdMOhemVrXHJcbiAgICAgICAgIC8vICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKS5yZXNvbHZlKHJldHVybk9iaikucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgLy8gICAvLyBvYnNsdWhhIGplZG5vdGxpdsO9Y2ggZsOhesOtXHJcbiAgICAgICAgIC8vICAgdGhpcy5iZWdpbk9wZXJhdGlvbihcIk5hxI3DrXTDoW0gZGF0YVwiKTsgXHJcbiAgICAgICAgIC8vICAgZGVmLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgICAvLyAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgLy8gICB0aGF0LmlzbC5Ba2NlVmVjbnlQcm9maWwubGlzdChycSA9PiB7IHJldHVybiB7IGZpbHRlcnM6IHRoYXQuZmlsdGVyX2FrY2V9IH0pXHJcbiAgICAgICAgIC8vICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAvLyAgICAgICAuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgLy8gICAgICAgICAgIHJldHVybk9iai5kYXRhID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgLy8gICAgICAgICAgIGRlZi5yZXNvbHZlKHJldHVybk9iaik7XHJcbiAgICAgICAgIC8vICAgICAgIH0pXHJcbiAgICAgICAgIC8vICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgLy8gICAgICAgICAgIC8vIG9wZXJhY2UgbmVkb3BhZGxhXHJcbiAgICAgICAgIC8vICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgIC8vICAgICAgIH0pO1xyXG4gICAgICAgICAvLyAgIC8vfVxyXG4gICAgICAgICAvLyAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAvLyAgIH0pXHJcbiAgICAgICAgIC8vICAgLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgICAvLyAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAvLyAgICAgICAvLyDDunByYXZhIGRhdFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgIC8vICAgICAgIEFkYUdyaWQuVmVjbnlQcm9maWwubW9kaWZ5RHRvKHJldHVybk9iai5kYXRhKVxyXG4gICAgICAgICAvLyAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgLy8gICAgICAgICAgICAgICByZXR1cm5PYmouZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgIC8vICAgICAgICAgICAgICAgZGVmLnJlc29sdmUocmV0dXJuT2JqKTtcclxuICAgICAgICAgLy8gICAgICAgICAgIH0pO1xyXG4gICAgICAgICAvLyAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgLy8gICB9KVxyXG5cdCAgICAgICAgLy8uZG9uZShmdW5jdGlvbihyZXR1cm5PYmo6IHJldHVybk9ialR5cGUpIHtcclxuICAgICAgICAgLy8gICAgICAgLy8gcG9obGVkXHJcbiAgICAgICAgIC8vICAgICAgIC8vdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcocmV0dXJuT2JqLmRhdGEhLCB7IGtleTogXCJyb2ssaWNvLGNpc2xvLGNpc19wbGFuXCIgfSk7XHJcblxyXG4gICAgICAgICAvLyAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJldHVybk9iai5kYXRhISwgeyBrZXk6IFwicm9rLGljbyxjaXNsbyxjaXNfcGxhblwiIH0pO1xyXG4gICAgICAgICAvLyAgICAgICAvLyBuYXN0YXZlbsOtIGRhdCBhIHDFmWVrcmVzbGVuw60gZ3JpZHVcclxuICAgICAgICAgLy8gICAgICAgY250Lm1haW5UYWJsZS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7IC8vdGhhdC52aWV3X0lTTCk7XHJcbiAgICAgICAgIC8vICAgICAgIC8vIG5hc3RhdmVuw60gb2tuYVxyXG4gICAgICAgICAvLyAgICAgICAvL3RoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgIC8vICAgfSlcclxuICAgICAgICAgLy8gICAuYWx3YXlzKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAvLyAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAvLyAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfTsgXHJcblxyXG4gICAgICAgIHpqaXN0aV9zbG91cGNlKGdmKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZi5jb2x1bW5zLmZpbHRlcihlID0+IGUuaGlkZGVuIT0gdHJ1ZSkubWFwKGUgPT4gZS5uYW1lKS5qb2luKCcsJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub3Z5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblRhYmxlMi5maW5kRmllbGRzKCkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpIFxyXG4gICAgICAgICAgICB0aGlzLm1haW5UYWJsZTIuZmluZEZpZWxkcyhcIm5hemV2X3NrcCx2cF9zdGF2XCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpIFxyXG5cclxuICAgICAgICAgICAgdmFyIHphem5hbTogR29yZGljLkFkYS5JbnRlcmZhY2UuR1ZlcHNwbGFEdG8gPSB7fTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWt0X2NpcyA9IDA7XHJcbiAgICAgICAgICAgIHphem5hbS5yb2sgPSB0aGlzLmZpbHRlcl9ha2NlLnJvaztcclxuICAgICAgICAgICAgemF6bmFtLmljbyA9IHRoaXMuZmlsdGVyX2FrY2UuaWNvO1xyXG4gICAgICAgICAgICB6YXpuYW0uY2lzbG8gPSB0aGlzLmZpbHRlcl9ha2NlLmNpc2xvO1xyXG4gICAgICAgICAgICB6YXpuYW0uY2lzX3BsYW4gPSB0aGF0LmFrdF9jaXM7XHJcbiAgICAgICAgICAgIHphem5hbS52cF9zdGF2ID0gMTA7XHJcbiAgICAgICAgICAgIHphem5hbS5jX3BsYW4gPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgemF6bmFtLm1fcGxhbiA9IG5ldyBEZWNpbWFsKDApO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5ibG9rX3NlbGVjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YSh6YXpuYW0sIFwiYWRkXCIpO1xyXG4gICAgICAgICAgICB0aGF0Lm1haW5UYWJsZS5nZ3JpZChcImFjdGl2ZVJvd1wiLCB6YXpuYW0pO1xyXG4gICAgICAgICAgICB0aGF0LmJsb2tfc2VsZWN0aW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1haW5UYWJsZTIuZmluZEZpZWxkcygpLmdmaWVsZChcImNsZWFyXCIsIHt9KTtcclxuICAgICAgICAgICAgdGhpcy5tYWluVGFibGUyLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHphem5hbSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Tm92eT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RFdmlkZW5jZT8uZW5hYmxlZCh0aGF0LnBvdm9sZW5hX2VkaXRhY2UpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0S29waWU/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0U3Rvcm5vPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFNjaHZhbGl0Py5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBrb3BpZSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LmFrdF9jaXMgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluVGFibGUyLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpblRhYmxlMi5maW5kRmllbGRzKFwibmF6ZXZfc2twLHZwX3N0YXZcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSlcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgemF6bmFtOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HVmVwc3BsYUR0byA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIHphem5hbS5yb2sgPSB0aGlzLmZpbHRlcl9ha2NlLnJvaztcclxuICAgICAgICAgICAgICAgIHphem5hbS5pY28gPSB0aGlzLmZpbHRlcl9ha2NlLmljbztcclxuICAgICAgICAgICAgICAgIHphem5hbS5jaXNsbyA9IHRoaXMuZmlsdGVyX2FrY2UuY2lzbG87XHJcbiAgICAgICAgICAgICAgICB6YXpuYW0uY2lzX3BsYW4gPSB0aGF0LmFrdF9jaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuQWtjZVZlY255UHJvZmlsLnJlYWQoeyBkYXRhOiB6YXpuYW0gfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha3RfY2lzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS52cF9zdGF2ID0gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzcG9uc2UuZGF0YS52cF9zdGF2X25hemV2ID0gXCJOw6F2cmhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgemF6bmFtLnZwX3N0YXYgPSAxMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHphem5hbSwgXCJhZGRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJsb2tfc2VsZWN0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tYWluVGFibGUuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgemF6bmFtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ibG9rX3NlbGVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrdF9jaXMgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tYWluVGFibGUyLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tYWluVGFibGUyLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHJlc3BvbnNlLmRhdGEsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm1haW5UYWJsZTIuZmluZEZpZWxkcygpLmdmaWVsZChcImNvbmZpcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE5vdnk/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdEV2aWRlbmNlPy5lbmFibGVkKHRoYXQucG92b2xlbmFfZWRpdGFjZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0S29waWU/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFN0b3Jubz8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0U2NodmFsaXQ/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIGV2aWRlbmNlKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciB6YXpuYW06IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdWZXBzcGxhRHRvID0ge307XHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoYXQuYWt0X2NpcyA+PSAwICkge1xyXG5cclxuICAgICAgICAgICAgICAgIHphem5hbS5yb2sgPSB0aGlzLmZpbHRlcl9ha2NlLnJvaztcclxuICAgICAgICAgICAgICAgIHphem5hbS5pY28gPSB0aGlzLmZpbHRlcl9ha2NlLmljbztcclxuICAgICAgICAgICAgICAgIHphem5hbS5jaXNsbyA9IHRoaXMuZmlsdGVyX2FrY2UuY2lzbG87XHJcbiAgICAgICAgICAgICAgICB6YXpuYW0uY2lzX3BsYW4gPSB0aGF0LmFrdF9jaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyICRjRGl2ID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmNvbnRlbnREaXYuc2hvd0ZsYXNoKHsgbGFiZWw6ICdVa2xhZGFtIGFrY2kgJyArIGNpc2xvIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRjRGl2LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiLCB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIGR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2X3BvbGVfZGV0YWlsID0gJGNEaXYuZmluZEZvcm1zKFwiRm9ybV9EZXRhaWxWUFwiKS5maW5kRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdl9wb2xlX2RldGFpbC5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgemF6bmFtKTtcclxuICAgICAgICAgICAgICAgICAgICB2X3BvbGVfZGV0YWlsLmdmaWVsZChcImNvbmZpcm1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmFrdF9jaXMgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuQWtjZVZlY255UHJvZmlsLmNyZWF0ZSh7IGRhdGE6IHphem5hbSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogdGhhdC5tb2RlbF9maWx0ciB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYWN0aV9zdW15KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Ba2NlVmVjbnlQcm9maWwudXBkYXRlKHsgZGF0YTogemF6bmFtIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wucmVxdWVzdERhdGEoeyBmaWx0ZXJzOiB0aGF0Lm1vZGVsX2ZpbHRyIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hY3RpX3N1bXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiwgZmlsdGVyczogdGhhdC5tb2RlbF9maWx0ciB9KTsgIC8vIHh4eCBha3R1YWxuaSBmaWx0clxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Tm92eT8uZW5hYmxlZCh0aGF0LnBvdm9sZW5hX2VkaXRhY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RFdmlkZW5jZT8uZW5hYmxlZCh0aGF0LnBvdm9sZW5hX2VkaXRhY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RLb3BpZT8uZW5hYmxlZCh0aGF0LnBvdm9sZW5hX2VkaXRhY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RTdG9ybm8/LmVuYWJsZWQodGhhdC5wb3ZvbGVuYV9lZGl0YWNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0U2NodmFsaXQ/LmVuYWJsZWQodGhhdC5wb3ZvbGVuYV9lZGl0YWNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5pc2wuQWtjZVZlY255UHJvZmlsLnJlYWQoeyBkYXRhOiB6YXpuYW0gfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuaXNsLkFrY2VWZWNueVByb2ZpbC51cGRhdGUoeyBkYXRhOiByZXNwb25zZS5kYXRhIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgc2NodmFsaXQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHphem5hbTogR29yZGljLkFkYS5JbnRlcmZhY2UuR1ZlcHNwbGFEdG8gPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LmFrdF9jaXMgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgemF6bmFtLnJvayA9IHRoaXMuZmlsdGVyX2FrY2Uucm9rO1xyXG4gICAgICAgICAgICAgICAgemF6bmFtLmljbyA9IHRoaXMuZmlsdGVyX2FrY2UuaWNvO1xyXG4gICAgICAgICAgICAgICAgemF6bmFtLmNpc2xvID0gdGhpcy5maWx0ZXJfYWtjZS5jaXNsbztcclxuICAgICAgICAgICAgICAgIHphem5hbS5jaXNfcGxhbiA9IHRoYXQuYWt0X2NpcztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5Ba2NlVmVjbnlQcm9maWwucmVhZCh7IGRhdGE6IHphem5hbSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuQWtjZVZlY255UHJvZmlsLnNjaHZhbGl0KHsgZGF0YTogcmVzcG9uc2UuZGF0YSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogdGhhdC5tb2RlbF9maWx0ciB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgc3Rvcm5vKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciB6YXpuYW06IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdWZXBzcGxhRHRvID0ge307XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5ha3RfY2lzID49IDApIHtcclxuICAgICAgICAgICAgICAgIHphem5hbS5yb2sgPSB0aGlzLmZpbHRlcl9ha2NlLnJvaztcclxuICAgICAgICAgICAgICAgIHphem5hbS5pY28gPSB0aGlzLmZpbHRlcl9ha2NlLmljbztcclxuICAgICAgICAgICAgICAgIHphem5hbS5jaXNsbyA9IHRoaXMuZmlsdGVyX2FrY2UuY2lzbG87XHJcbiAgICAgICAgICAgICAgICB6YXpuYW0uY2lzX3BsYW4gPSB0aGF0LmFrdF9jaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuQWtjZVZlY255UHJvZmlsLnJlYWQoeyBkYXRhOiB6YXpuYW0gfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnZwX3N0YXYgPT0gOTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLkFrY2VWZWNueVByb2ZpbC51bmRlbGV0ZSh7IGRhdGE6IHJlc3BvbnNlLmRhdGEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmVzcG9uc2UuZGF0YSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wucmVxdWVzdERhdGEoeyBmaWx0ZXJzOiB0aGF0Lm1vZGVsX2ZpbHRyIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hY3RpX3N1bXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLkFrY2VWZWNueVByb2ZpbC5kZWxldGUoeyBkYXRhOiByZXNwb25zZS5kYXRhIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogdGhhdC5tb2RlbF9maWx0ciB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYWN0aV9zdW15KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIHRsYWNpdGthOiBHRGlhbG9nQnV0dG9uW107XHJcbiAgICAgICAgICAgICAgICAvL3ZhciB0bGFjaXRrbzogR0RpYWxvZ0J1dHRvbjtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3RsYWNpdGthID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgLy90bGFjaXRrbyA9IHsgaWQ6IFwiYW5vXCIsIHRleHQ6IFwiQW5vXCIsIGF1dG9mb2N1czogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIC8vdGxhY2l0a2EucHVzaCh0bGFjaXRrbyk7XHJcbiAgICAgICAgICAgICAgICAvL3RsYWNpdGtvID0geyBpZDogXCJuZVwiLCB0ZXh0OiBcIk5lXCIsIGF1dG9mb2N1czogdHJ1ZSwgcHJpbWFyeTogdHJ1ZSB9O1xyXG4gICAgICAgICAgICAgICAgLy90bGFjaXRrYS5wdXNoKHRsYWNpdGtvKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGlhbG9ncy5tZXNzYWdlQm94KFwiRG90YXpcIiwgXCJQcm/DusSNdG92w6Fuw61tIGRva2xhZHUgZG9qZGUgayBwxZllcG/EjcOtdMOhbsOtIHJvenBvxI10dSBvIHh4eCBLxI0hIDxicj4gPGJyPiBTa3V0ZcSNbsSbIGNoY2V0ZSBkb2tsYWQgemHDusSNdG92YXQ/XCIsIEdEbGcubWJiWWVzTm8sIEdEbGcubWJpUXVlc3Rpb24pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAub24oXCJhbm9cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgIC5vbihcIm5lXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBuYWN0aV9zdW15KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmlzbC5Ba2NlVmVjbnlQcm9maWwubGlzdF9TdW1hKHsgZmlsdGVyczogdGhpcy5maWx0ZXJfYWtjZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGFfc3VtYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGF0YV9wcmV2aWV3LmRhdGEgPSBkYXRhX3N1bWE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5zaG93KHRoYXQuZGF0YV9wcmV2aWV3KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubF9kaWFsb2cpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQ8R29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VWZWNueVByb2ZpbFNvdWhybj4odGhhdC5sX2RpYWxvZykucmVmcmVzaCh0aGF0LmRhdGFfcHJldmlldy5kYXRhIClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNvdWhybigpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5Ba2NlVmVjbnlQcm9maWwubGlzdF9TdW1hKHsgZmlsdGVyczogdGhpcy5maWx0ZXJfYWtjZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGFfc3VtYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGF0YV9wcmV2aWV3LmRhdGEgPSBkYXRhX3N1bWE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubF9kaWFsb2cgPSB0aGF0LmRpYWxvZ3Muc2hvd1dpbmRvdyhcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBa2NlVmVjbnlQcm9maWxTb3Vocm5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdzb3Vocm5WUCMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxTb3Vocm5WUDogdGhhdC5kYXRhX3ByZXZpZXcuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcl9ha2NlOiB0aGF0LmZpbHRlcl9ha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFwiU291aHJuIFZQXCIsIDYwMCwgNDUwLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sX2RpYWxvZyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0=
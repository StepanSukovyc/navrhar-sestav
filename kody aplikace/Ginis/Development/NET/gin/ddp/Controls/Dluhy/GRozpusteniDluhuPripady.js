"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GRozpusteniDluhuPripady.ts             </Name>
//    <Description> Okno případů rozpuštění dluhů                               </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-08-23                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * Rozpuštění dluhu - případy
             *
             * @author Vojtěch Čech
             * @date 23.08.2024
             */
            let GRozpusteniDluhuPripady = class GRozpusteniDluhuPripady extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.dto = [];
                    //#endregion
                }
                onContentReady() {
                    var that = this;
                    //that.taskId = "actGRozpusteniDluhu";
                    that.title = `Případy rozpouštění dluhů`;
                    that.createActions();
                    that.createMenu();
                    that.createFilter(that.createFilterForm());
                    that.createGrid();
                    that.setBreadcrumbs([{
                            caption: that.title,
                            action: that.actions["actGRozpusteniZavritPotomky"]
                        }]);
                }
                /** Vytvoří grid **/
                createGrid() {
                    const that = this;
                    that.grid = $.newDiv()
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        name: "GRozpusteniDluhuPripadyGrid",
                        columnMode: "full",
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        multi: true,
                        navigationMode: "row",
                        columns: WebClient.Common.GridFormats.RozpusteniDluhuPripady(),
                        defaultProfile: {
                            rowNumbers: true,
                            condFormats: [
                                { description: "Stav", formula: 'IF(@aktivita == 100 and EQUALS(@stav_rd, "10"), true, false, false)', text: Gordic.Components.Grid.CondFormats.CondFormatText.blue },
                                { description: "Stav2", formula: 'IF(@aktivita == 100 and EQUALS(@stav_rd, "20"), true, false, false)', text: Gordic.Components.Grid.CondFormats.CondFormatText.purple },
                            ]
                        },
                    });
                    return that.grid;
                }
                /**Metoda pro vytvoření menu na contentu */
                createMenu() {
                    const that = this;
                    let menu = [
                        {
                            caption: "Detail",
                            tooltip: "Detail rozpuštění dluhu",
                            icon: "gi-detail",
                            favorite: true,
                            action: that.actions["actGDetail"]
                        },
                        {
                            caption: "Příprava",
                            tooltip: "Připraví data pro rozpuštění dluhu",
                            icon: "gi-plus_bold",
                            favorite: true,
                            action: that.actions["actGPriprava"]
                        },
                        {
                            caption: "Zrušit",
                            tooltip: "Zrušení vybraných/všech záznamů rozpuštění dluhu",
                            icon: "gi-minus_bold",
                            favorite: true,
                            action: that.actions["actGZrusit"]
                        },
                        {
                            caption: "Schválení",
                            tooltip: "Schválení vybraných/všech záznamů rozpuštění dluhu",
                            icon: "gi-sprava_aplikace",
                            favorite: true,
                            action: that.actions["actGSchvaleni"]
                        },
                        {
                            caption: "Odschválení",
                            tooltip: "Odschválení vybraných/všech záznamů rozpuštění dluhu",
                            icon: "gi-sprava_aplikace",
                            favorite: true,
                            action: that.actions["actGOdschvaleni"]
                        },
                        {
                            caption: "Zpracování",
                            tooltip: "Realizace rozpuštění na vybraných/všech záznamech dluhu",
                            icon: "gi-sprava_aplikace",
                            favorite: true,
                            action: that.actions["actGZpracovani"]
                        }
                    ];
                    this.menuBar(menu);
                }
                /**
                * Vytvoří tlačítko nad seznamem kontrol
                */
                createActions() {
                    const that = this;
                    that.actions.addRange([
                        {
                            name: "actGRozpusteniZavritPotomky",
                            run: () => {
                                this.tryCloseAllSignificants();
                            }
                        },
                        {
                            name: "actGPriprava",
                            run: () => {
                                that.pripravitData();
                            }
                        },
                        {
                            name: "actGDetail",
                            run: () => {
                                var selection = that.grid.ggrid("getSelection");
                                if (selection.length != 0) {
                                    that.navigate("Gordic.Ddp.WebClient.GRozpusteniDluhuPripadyDetail", {
                                        ID: "DDPGRozpusteniDluhuPripadyDetail#",
                                        ixs_rdl: selection[0].ixs_rdl,
                                        typ_phl: selection[0].typ_phl,
                                        poradi: selection[0].poradi,
                                        ixp_pl: selection[0].ixp_pl,
                                        ixp_pop: selection[0].ixp_pop
                                    });
                                }
                            }
                        },
                        {
                            name: "actGZrusit",
                            run: () => {
                                const that = this;
                                var selection = that.grid.ggrid("getSelection");
                                if (selection.length != 0) {
                                    that.isl.RozpusteniDluhu.zrusit({ rq: { RequestData: selection } }).get().done(function (dto) {
                                        let somethingChanged = false;
                                        selection.forEach((row) => {
                                            if (row.aktivita == 100 && row.stav_rd == 0) {
                                                somethingChanged = true;
                                            }
                                        });
                                        if (somethingChanged)
                                            that.ziskejData(that.o_filtr);
                                    });
                                }
                            }
                        },
                        {
                            name: "actGSchvaleni",
                            run: () => {
                                const that = this;
                                var selection = that.grid.ggrid("getSelection");
                                if (selection.length != 0) {
                                    that.isl.RozpusteniDluhu.schvalit({ rq: { RequestData: selection } }).get().done(function (dto) {
                                        let somethingChanged = false;
                                        selection.forEach((row) => {
                                            if (row.stav_rd == 0) {
                                                somethingChanged = true;
                                            }
                                        });
                                        if (somethingChanged)
                                            that.ziskejData(that.o_filtr);
                                    });
                                }
                            }
                        },
                        {
                            name: "actGOdschvaleni",
                            run: () => {
                                const that = this;
                                var selection = that.grid.ggrid("getSelection");
                                if (selection.length != 0) {
                                    that.isl.RozpusteniDluhu.odschvalit({ rq: { RequestData: selection } }).get().done(function (dto) {
                                        let somethingChanged = false;
                                        selection.forEach((row) => {
                                            if (row.stav_rd == 10) {
                                                somethingChanged = true;
                                            }
                                        });
                                        if (somethingChanged)
                                            that.ziskejData(that.o_filtr);
                                    });
                                }
                            }
                        },
                        {
                            name: "actGZpracovani",
                            run: () => {
                                that.zpracovatData();
                            }
                        }
                    ]);
                }
                /**
                * Vytvoří filtr FORM pro seznam kontrol
                */
                createFilterForm() {
                    const that = this;
                    that.headerForm = new Gordic.Forms.Form({ name: "ddpRozpusteniDluhuFilter", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1" });
                    if (that.ixp_pl != null) {
                        that.headerForm
                            .addSection("Plátce")
                            .addRow("Plátce")
                            .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                            name: "ixp_pl",
                            initialValue: that.ixp_pl,
                            disabled: true
                        })
                            .addRow("Název plátce")
                            .addField("gselectbox", "w-12", {
                            name: "ixs_esu",
                            disabled: true,
                            model: "ixs_esu=ixs_esu"
                        }, Gordic.Esu.Prefabs.vyberEsu({
                            typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu, // přidání prefabu                       
                            Logovani: {
                                Ixp: this.ixp_pl ?? "", // zadání logovacích údaju je nutnost hlavně IXP
                                DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani, // vybrat z enumu
                                AktZnacka: (this.AC_AG == null ? this.ixp_pl : this.AC_AG),
                                DuvodHledaniTxt: "Detail Případu"
                            },
                        }));
                    }
                    that.headerForm
                        .addSection("Filtry")
                        .addRow({ label: "Typ pohledávky" })
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpstpp(), {
                        name: "typ_phl",
                        model: "model.typ_phl = value.typ_phl",
                        initialValue: { typ_phl: that.typ_phl }
                    })
                        .addRow("Stav")
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpStavRd(), {
                        name: "stav_rd",
                        model: "model.stav_rd = value.stav_rd"
                    })
                        .addRow({ label: "Způsob rozpuštění dl." })
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpIxsRdl(), {
                        name: "ixs_rdl",
                        model: "model.ixs_rdl = value.ixs_rdl; model.nazev = value.nazev",
                        initialValue: { ixs_rdl: that.ixs_rdl, nazev: that.nazev }
                    })
                        .addRow("Plátce")
                        .addField("gstringbox", {
                        name: "esu_txt_pl_filtr"
                    })
                        .addRow("Poplatník")
                        .addField("gstringbox", {
                        name: "esu_txt_pop_filtr"
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "aktivni",
                        label: "Zobrazit pouze aktivní",
                        initialValue: false
                    });
                    return that.headerForm;
                }
                /**
                * Vytvoří filtr pro seznam kontrol
                */
                createFilter(form) {
                    const that = this;
                    var filter = $("<div>").appendTo(that.element).
                        gfilterpanel({
                        forms: [form],
                        filterViewMode: FilterViewMode.Simple,
                        autoLoadAfterCreatePanel: true,
                        autoLoadAfterChoseFilter: true,
                        apply: (event, obj) => {
                            that.o_filtr = obj.filter;
                            that.ziskejData(that.o_filtr);
                        }
                    });
                    if (that.ixp_pl != null) {
                        filter.findFields().gfield("model", "apply", that.model);
                    }
                }
                /**
                 * Funkce pro získání filtrovaných dat
                 */
                ziskejData(filter) {
                    const that = this;
                    that.beginOperation({ id: "nacitani_dat", text: "Načítání dat..." });
                    that.isl.RozpusteniDluhu.listPripadu(rq => {
                        return {
                            filters: filter
                        };
                    }).get().done(function (dto) {
                        that.currentData = dto.data;
                        var view = new Gordic.Data.View(dto.data);
                        that.grid.ggrid("setData", view);
                        that.endOperation({ id: "nacitani_dat" });
                    });
                }
                /**
                 * příprava data na rozpuštění dluhu
                 */
                pripravitData() {
                    var that = this;
                    var ixs_rdl = that.findFields("ixs_rdl").gfield("getValue");
                    var typ_phl = that.findFields("typ_phl").gfield("getValue");
                    var ixp_pl = that.ixp_pl ?? "";
                    if (ixs_rdl == null || typ_phl == null) {
                        if (ixs_rdl != null)
                            ixs_rdl = ixs_rdl.ixs_rdl;
                        if (typ_phl != null)
                            typ_phl = typ_phl.typ_phl;
                        that.dialogs.error("Příprava pro rozpuštění dluhu", `Nelze připravit rozpuštění dluhu - nejsou zadaná správná data!\nTyp pohledávky: ${typ_phl}\nZpůsob rozpuštění: ${ixs_rdl}\n\n`, 480, 250);
                    }
                    else {
                        ixs_rdl = ixs_rdl.ixs_rdl;
                        typ_phl = typ_phl.typ_phl;
                        that.beginOperation({ id: "nacteniNazvu", text: "Načítání dat..." });
                        that.getRozpusteniDluhuNazvy(ixs_rdl, typ_phl).done(function (nazvy) {
                            that.endOperation({ id: "nacteniNazvu" });
                            if (ixp_pl.length == 12 && ixs_rdl.length == 12) {
                                that.platcePripravaRozpusteniDluhu(nazvy, ixs_rdl, typ_phl); //příprava rozpuštění dluhu pro plátce
                            }
                            else {
                                that.pripravaRozpusteniDluhu(nazvy, ixs_rdl, typ_phl); //příprava rozpuštění dluhu pro typ pohledváky
                            }
                        });
                    }
                }
                getRozpusteniDluhuNazvy(ixs_rdl, typ_phl) {
                    var that = this;
                    return that.isl.RozpusteniDluhu.nazvy({
                        typ_phl: typ_phl ?? "",
                        ixs_rdl: ixs_rdl ?? "",
                        ixp_pl: that.ixp_pl ?? ""
                    }).get();
                }
                //#region příprava rozpuštěšní na plátcovi
                platcePripravaRozpusteniDluhu(nazvy, ixs_rdl, typ_phl) {
                    var that = this;
                    that.beginOperation({ id: "kontrolaZpracovaniPlatce", text: "Načítání dat..." });
                    var ixs_rdl = ixs_rdl;
                    var typ_phl = typ_phl;
                    that.existujePripravaRozpusteniDluhuPlatce(ixs_rdl).done(function (exists) {
                        that.endOperation({ id: "kontrolaZpracovaniPlatce" });
                        if (exists) {
                            that.dialogs.error("Příprava pro rozpuštění dluhu", `Nelze připravit rozpuštění dluhu - již bylo zpracováno!\nPlátce: ${that.ixp_pl} (${nazvy.ixp_pl_txt})\nZpůsob rozpuštění: ${nazvy.ixs_rdl_txt} (${ixs_rdl})\n\n`, 480, 250);
                        }
                        else {
                            that.dialogs.confirm("Příprava pro rozpuštění dluhu", 
                            //hodí null místo názvu
                            `Opravdu chcete provést přípravu pro rozpuštění dluhu z plátce na poplatníky?\n\nPro případ: ${that.ixp_pl} (${nazvy.ixp_pl_txt})\nZpůsob rozpuštění: ${nazvy.ixs_rdl_txt} (${ixs_rdl})\n\nStávající nastavení pro případ bude zrušeno!`, 480, 250).on("close", (ev, retVal) => {
                                if (retVal === "yes") {
                                    that.beginOperation({ id: "priprava", text: "Probíhá příprava rozpouštění případu" });
                                    that.isl.RozpusteniDluhu.pripravitRozpusteniPripadu({ ixp_pl: that.ixp_pl ?? "", ixs_rdl: ixs_rdl, typ_phl: that.typ_phl_ixp_pl })
                                        .get().always(() => {
                                        that.endOperation({ id: "priprava" });
                                        that.ziskejData(that.o_filtr);
                                    });
                                }
                            });
                        }
                    });
                }
                existujePripravaRozpusteniDluhuPlatce(ixs_rdl) {
                    var that = this;
                    return that.isl.RozpusteniDluhu.existujePripravaRozpusteniDluhuPlatce({
                        ixs_rdl: ixs_rdl ?? "",
                        ixp_pl: that.ixp_pl ?? ""
                    }).get();
                }
                //#endregion
                //#region příprava rozpuštění na typu pohledávky
                pripravaRozpusteniDluhu(nazvy, ixs_rdl, typ_phl) {
                    var that = this;
                    that.beginOperation({ id: "kontrolaZpracovaniNaTypuPhl", text: "Načítání dat..." });
                    var ixs_rdl = ixs_rdl;
                    var typ_phl = typ_phl;
                    that.existujePripravaRozpusteniDluhuNaTypuPhl(ixs_rdl, typ_phl).done(function (exists) {
                        that.endOperation({ id: "kontrolaZpracovaniNaTypuPhl" });
                        if (exists) {
                            that.dialogs.confirm("Příprava pro rozpuštění dluhu", `Typ pohledávky je již částečně zpracován, budou dogenerovány zbývající případy!\n\nTyp pohledávky: ${typ_phl} (${nazvy.typ_phl_txt})\nZpůsob rozpuštění: ${nazvy.ixs_rdl_txt} (${ixs_rdl})\n\nChcete opravdu pokračovat?`, 480, 250).on("close", (ev, retVal) => {
                                if (retVal === "yes") {
                                    that.dialogForm(ixs_rdl, typ_phl, nazvy);
                                }
                            });
                        }
                        else {
                            that.dialogForm(ixs_rdl, typ_phl, nazvy);
                        }
                    });
                }
                dialogForm(ixs_rdl, typ_phl, nazvy) {
                    var that = this;
                    that.dialogs.confirm("Příprava pro rozpuštění dluhu", `Opravdu chcete provést přípravu pro rozpuštění dluhu z plátce na poplatníky?\n\nTyp pohledávky : ${typ_phl} (${nazvy.typ_phl_txt})\nZpůsob rozpuštění: ${nazvy.ixs_rdl_txt} (${ixs_rdl})\n\nStávající nastavení pro NEZPRACOVANÉ a NESCHVÁLENÉ záznamy pro typ pohledávky bude zrušeno!`, 480, 250).on("close", (ev, retVal) => {
                        if (retVal === "yes") {
                            var dto = that.dto;
                            var l_vybranePripady = that.vybranePripady;
                            var len = that.vybranePripady.length;
                            for (var i = 0; i < len; i++) {
                                dto[i] = {
                                    ixp_pl: l_vybranePripady[i].ixp,
                                    ixs_rdl: ixs_rdl,
                                    typ_phl: l_vybranePripady[i].typ_phl
                                };
                            }
                            that.beginOperation({ id: "priprava", text: "Probíhá příprava rozpouštění" });
                            that.isl.RozpusteniDluhu.pripravitRozpusteniPohledavky({ dtos: dto }).get().always(() => {
                                that.endOperation({ id: "priprava" });
                                that.ziskejData(that.o_filtr);
                            });
                        }
                    });
                }
                existujePripravaRozpusteniDluhuNaTypuPhl(ixs_rdl, typ_phl) {
                    var that = this;
                    return that.isl.RozpusteniDluhu.existujePripravaRozpusteniDluhuNaTypuPhl({
                        ixs_rdl: ixs_rdl ?? "",
                        typ_phl: typ_phl ?? ""
                    }).get();
                }
                //#endregion
                //#region zpracování rozpuštění
                zpracovatData() {
                    var that = this;
                    var ixs_rdl = that.findFields("ixs_rdl").gfield("getValue").ixs_rdl;
                    var typ_phl = that.findFields("typ_phl").gfield("getValue").typ_phl;
                    var ixp_pl = that.ixp_pl ?? "";
                    that.beginOperation({ id: "nacteniNazvu", text: "Načítání dat..." });
                    that.getRozpusteniDluhuNazvy(ixs_rdl, typ_phl).done(function (nazvy) {
                        that.endOperation({ id: "nacteniNazvu" });
                        if (ixp_pl.length == 12 && ixs_rdl.length == 12) {
                            that.platceRozpusteniDluhu(nazvy, ixs_rdl, typ_phl); //příprava rozpuštění dluhu pro plátce
                        }
                        else {
                            that.rozpusteniDluhu(nazvy, ixs_rdl, typ_phl); //příprava rozpuštění dluhu pro typ pohledváky
                        }
                    });
                }
                platceRozpusteniDluhu(nazvy, ixs_rdl, typ_phl) {
                    var that = this;
                    that.beginOperation({ id: "kontrolaZpracovaniPlatce", text: "Načítání dat..." });
                    var ixs_rdl = ixs_rdl;
                    var typ_phl = typ_phl;
                    that.existujeRozpusteniDluhuPlatce(ixs_rdl, typ_phl).done(function (exists) {
                        that.endOperation({ id: "kontrolaZpracovaniPlatce" });
                        if (exists) {
                            that.dialogs.error("Zpracování rozpuštění dluhu", `Nelze zpracovat rozpuštění dluhu - existují neschválená rozpuštění dluhů!\nPlátce: ${that.ixp_pl} (${nazvy.ixp_pl_txt})\nZpůsob rozpuštění: ${nazvy.ixs_rdl_txt} (${ixs_rdl})\n\n`, 480, 250);
                        }
                        else {
                            that.beginOperation({ id: "rozpusteni", text: "Probíhá rozpuštění dluhu případu" });
                            that.isl.RozpusteniDluhu.rozpusteniDluhuPripadu({ ixs_rdl: ixs_rdl, ixp_pl: that.ixp_pl ?? "", typ_phl: that.typ_phl_ixp_pl })
                                .get().always(() => {
                                that.endOperation({ id: "rozpusteni" });
                                that.ziskejData(that.o_filtr);
                            });
                        }
                    });
                }
                existujeRozpusteniDluhuPlatce(ixs_rdl, typ_phl) {
                    var that = this;
                    return that.isl.RozpusteniDluhu.existujeRozpusteniDluhuPlatce({
                        ixs_rdl: ixs_rdl ?? "",
                        typ_phl: typ_phl ?? "",
                        ixp_pl: that.ixp_pl ?? ""
                    }).get();
                }
                rozpusteniDluhu(nazvy, ixs_rdl, typ_phl) {
                    var that = this;
                    that.beginOperation({ id: "kontrolaZpracovaniNaTypuPhl", text: "Načítání dat..." });
                    var ixs_rdl = ixs_rdl;
                    var typ_phl = typ_phl;
                    that.existujeRozpusteniDluhuNaTypuPhl(ixs_rdl, typ_phl).done(function (exists) {
                        that.endOperation({ id: "kontrolaZpracovaniNaTypuPhl" });
                        if (exists) {
                            that.dialogs.error("Zpracování rozpuštění dluhu", `Nelze zpracovat rozpuštění dluhu - existují neschválená rozpuštění dluhů!\n\nTyp pohledávky: ${typ_phl} (${nazvy.typ_phl_txt})\nZpůsob rozpuštění: ${nazvy.ixs_rdl_txt} (${ixs_rdl})`, 480, 250);
                        }
                        else {
                            var dto = that.dto;
                            var l_vybranePripady = that.vybranePripady;
                            var len = that.vybranePripady.length;
                            for (var i = 0; i < len; i++) {
                                dto[i] = {
                                    ixp_pl: l_vybranePripady[i].ixp,
                                    ixs_rdl: ixs_rdl,
                                    typ_phl: l_vybranePripady[i].typ_phl
                                };
                            }
                            that.beginOperation({ id: "rozpusteni", text: "Probíhá rozpuštění dluhu" });
                            that.isl.RozpusteniDluhu.rozpusteniDluhuPohledavky({ dtos: dto }).get().always(() => {
                                that.endOperation({ id: "rozpusteni" });
                                that.ziskejData(that.o_filtr);
                            });
                        }
                    });
                }
                existujeRozpusteniDluhuNaTypuPhl(ixs_rdl, typ_phl) {
                    var that = this;
                    return that.isl.RozpusteniDluhu.existujeRozpusteniDluhuNaTypuPhl({
                        ixs_rdl: ixs_rdl ?? "",
                        typ_phl: typ_phl ?? ""
                    }).get();
                }
            };
            GRozpusteniDluhuPripady = __decorate([
                Decorators.gcontent
            ], GRozpusteniDluhuPripady);
            WebClient.GRozpusteniDluhuPripady = GRozpusteniDluhuPripady;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JvenB1c3RlbmlEbHVodVByaXBhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUm96cHVzdGVuaURsdWh1UHJpcGFkeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQWtsQmY7QUFsbEJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtsQm5CO0lBbGxCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBa2xCN0I7UUFsbEJvQixXQUFBLFNBQVM7WUFDMUI7Ozs7O2VBS0c7WUFFSCxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF3QixTQUFRLE9BQUEsWUFBWTtnQkFBekQ7O29CQWdCSSxRQUFHLEdBQXFELEVBQUUsQ0FBQztvQkF3akIzRCxZQUFZO2dCQUNoQixDQUFDO2dCQXZqQkcsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLHNDQUFzQztvQkFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRywyQkFBMkIsQ0FBQztvQkFFekMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUVsQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7NEJBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSzs0QkFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUM7eUJBQ3RELENBQUMsQ0FBQyxDQUFDO2dCQUNSLENBQUM7Z0JBRUQsb0JBQW9CO2dCQUNaLFVBQVU7b0JB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QWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLENBQUMsQ0FBQzs0QkFDNUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMseUJBQXlCLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO2dDQUNoRixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7Z0NBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUNsQyxDQUFDLENBQUMsQ0FBQTt3QkFDTixDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRUQsZ0NBQWdDLENBQUMsT0FBTyxFQUFFLE9BQU87b0JBQzdDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtvQkFDZixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLGdDQUFnQyxDQUFDO3dCQUM3RCxPQUFPLEVBQUUsT0FBTyxJQUFJLEVBQUU7d0JBQ3RCLE9BQU8sRUFBRSxPQUFPLElBQUksRUFBRTtxQkFDekIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNiLENBQUM7YUFFSixDQUFBO1lBemtCWSx1QkFBdUI7Z0JBRG5DLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsdUJBQXVCLENBeWtCbkM7WUF6a0JZLGlDQUF1QiwwQkF5a0JuQyxDQUFBO1FBQ0wsQ0FBQyxFQWxsQm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWtsQjdCO0lBQUQsQ0FBQyxFQWxsQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWtsQm5CO0FBQUQsQ0FBQyxFQWxsQlMsTUFBTSxLQUFOLE1BQU0sUUFrbEJmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdSb3pwdXN0ZW5pRGx1aHVQcmlwYWR5LnRzICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIHDFmcOtcGFkxa8gcm96cHXFoXTEm27DrSBkbHVoxa8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICB2Y2VjaCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNC0wOC0yMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogUm96cHXFoXTEm27DrSBkbHVodSAtIHDFmcOtcGFkeVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIFZvanTEm2NoIMSMZWNoXHJcbiAgICAgKiBAZGF0ZSAyMy4wOC4yMDI0XHJcbiAgICAgKi8gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnQgICAgICAgXHJcbiAgICBleHBvcnQgY2xhc3MgR1JvenB1c3RlbmlEbHVodVByaXBhZHkgZXh0ZW5kcyBHQ29udGVudEJhc2UgeyAgICBcclxuICAgICAgXHJcbiAgICAgICAgdHlwX3BobDogc3RyaW5nO1xyXG4gICAgICAgIGl4c19yZGw6IHN0cmluZztcclxuICAgICAgICBpeHBfcGw6IHN0cmluZztcclxuICAgICAgICB0eXBfcGhsX2l4cF9wbDogc3RyaW5nO1xyXG4gICAgICAgIG5hemV2OiBzdHJpbmc7XHJcbiAgICAgICAgQUNfQUc6IHN0cmluZztcclxuICAgICAgICBtb2RlbDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHB1YmxpYyBoZWFkZXJGb3JtOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuICAgICAgICBwdWJsaWMgb19maWx0cjtcclxuXHJcbiAgICAgICAgY3VycmVudERhdGE7XHJcbiAgICAgICAgdnlicmFuZVByaXBhZHk7XHJcbiAgICAgICAgZHRvOiBEZHAuSW50ZXJmYWNlLkxLLklzbC5HUm96cHVzdGVuaURsdWh1U2ltcGxlRHRvW10gPSBbXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy90aGF0LnRhc2tJZCA9IFwiYWN0R1JvenB1c3RlbmlEbHVodVwiO1xyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gYFDFmcOtcGFkeSByb3pwb3XFoXTEm27DrSBkbHVoxa9gO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlTWVudSgpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUZpbHRlcih0aGF0LmNyZWF0ZUZpbHRlckZvcm0oKSk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdGhhdC50aXRsZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R1JvenB1c3RlbmlaYXZyaXRQb3RvbWt5XCJdXHJcbiAgICAgICAgICAgIH1dKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZw60gZ3JpZCAqKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKTogSlF1ZXJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmdyaWQgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1JvenB1c3RlbmlEbHVodUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiR1JvenB1c3RlbmlEbHVodVByaXBhZHlHcmlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5Sb3pwdXN0ZW5pRGx1aHVQcmlwYWR5KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZGVzY3JpcHRpb246IFwiU3RhdlwiLCBmb3JtdWxhOiAnSUYoQGFrdGl2aXRhID09IDEwMCBhbmQgRVFVQUxTKEBzdGF2X3JkLCBcIjEwXCIpLCB0cnVlLCBmYWxzZSwgZmFsc2UpJywgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ibHVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRlc2NyaXB0aW9uOiBcIlN0YXYyXCIsIGZvcm11bGE6ICdJRihAYWt0aXZpdGEgPT0gMTAwIGFuZCBFUVVBTFMoQHN0YXZfcmQsIFwiMjBcIiksIHRydWUsIGZhbHNlLCBmYWxzZSknLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LnB1cnBsZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuZ3JpZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKk1ldG9kYSBwcm8gdnl0dm/FmWVuw60gbWVudSBuYSBjb250ZW50dSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBtZW51OiBNZW51UGFyYW1zW10gPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIkRldGFpbCByb3pwdcWhdMSbbsOtIGRsdWh1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdEZXRhaWxcIl1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZnDrXByYXZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJQxZlpcHJhdsOtIGRhdGEgcHJvIHJvenB1xaF0xJtuw60gZGx1aHVcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBsdXNfYm9sZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R1ByaXByYXZhXCJdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnJ1xaFpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiWnJ1xaFlbsOtIHZ5YnJhbsO9Y2gvdsWhZWNoIHrDoXpuYW3FryByb3pwdcWhdMSbbsOtIGRsdWh1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1taW51c19ib2xkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHWnJ1c2l0XCJdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU2NodsOhbGVuw61cIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlNjaHbDoWxlbsOtIHZ5YnJhbsO9Y2gvdsWhZWNoIHrDoXpuYW3FryByb3pwdcWhdMSbbsOtIGRsdWh1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zcHJhdmFfYXBsaWthY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdTY2h2YWxlbmlcIl1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPZHNjaHbDoWxlbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPZHNjaHbDoWxlbsOtIHZ5YnJhbsO9Y2gvdsWhZWNoIHrDoXpuYW3FryByb3pwdcWhdMSbbsOtIGRsdWh1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zcHJhdmFfYXBsaWthY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdPZHNjaHZhbGVuaVwiXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpwcmFjb3bDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiUmVhbGl6YWNlIHJvenB1xaF0xJtuw60gbmEgdnlicmFuw71jaC92xaFlY2ggesOhem5hbWVjaCBkbHVodVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc3ByYXZhX2FwbGlrYWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHWnByYWNvdmFuaVwiXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKG1lbnUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBWeXR2b8WZw60gdGxhxI3DrXRrbyBuYWQgc2V6bmFtZW0ga29udHJvbCBcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUm96cHVzdGVuaVphdnJpdFBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUHJpcHJhdmFcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmlwcmF2aXREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdSb3pwdXN0ZW5pRGx1aHVQcmlwYWR1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdSb3pwdXN0ZW5pRGx1aHVQcmlwYWR5RGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogXCJERFBHUm96cHVzdGVuaURsdWh1UHJpcGFkeURldGFpbCNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3JkbDogc2VsZWN0aW9uWzBdLml4c19yZGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHNlbGVjdGlvblswXS50eXBfcGhsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3JhZGk6IHNlbGVjdGlvblswXS5wb3JhZGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9wbDogc2VsZWN0aW9uWzBdLml4cF9wbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX3BvcDogc2VsZWN0aW9uWzBdLml4cF9wb3BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdacnVzaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdSb3pwdXN0ZW5pRGx1aHVQcmlwYWR1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUm96cHVzdGVuaURsdWh1LnpydXNpdCh7IHJxOiB7IFJlcXVlc3REYXRhOiBzZWxlY3Rpb24gfSB9KS5nZXQoKS5kb25lKGZ1bmN0aW9uIChkdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc29tZXRoaW5nQ2hhbmdlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24uZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cuYWt0aXZpdGEgPT0gMTAwICYmIHJvdy5zdGF2X3JkID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzb21ldGhpbmdDaGFuZ2VkKSB0aGF0Lnppc2tlakRhdGEodGhhdC5vX2ZpbHRyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdTY2h2YWxlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdSb3pwdXN0ZW5pRGx1aHVQcmlwYWR1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUm96cHVzdGVuaURsdWh1LnNjaHZhbGl0KHsgcnE6IHsgUmVxdWVzdERhdGE6IHNlbGVjdGlvbiB9IH0pLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzb21ldGhpbmdDaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5zdGF2X3JkID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNvbWV0aGluZ0NoYW5nZWQpIHRoYXQuemlza2VqRGF0YSh0aGF0Lm9fZmlsdHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R09kc2NodmFsZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUm96cHVzdGVuaURsdWh1UHJpcGFkdUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlJvenB1c3RlbmlEbHVodS5vZHNjaHZhbGl0KHsgcnE6IHsgUmVxdWVzdERhdGE6IHNlbGVjdGlvbiB9IH0pLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzb21ldGhpbmdDaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5zdGF2X3JkID09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb21ldGhpbmdDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc29tZXRoaW5nQ2hhbmdlZCkgdGhhdC56aXNrZWpEYXRhKHRoYXQub19maWx0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHWnByYWNvdmFuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnpwcmFjb3ZhdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogXHJcbiAgICAgICAgKiBWeXR2b8WZw60gZmlsdHIgRk9STSBwcm8gc2V6bmFtIGtvbnRyb2wgXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlckZvcm0oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5oZWFkZXJGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJkZHBSb3pwdXN0ZW5pRGx1aHVGaWx0ZXJcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEsIEwtMy04LTEsIE0tMTItMTEtMSwgUy0xMi0xMS0xXCIgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5peHBfcGwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5oZWFkZXJGb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJQbMOhdGNlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBsw6F0Y2VcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFByZWZhYnMuU3RyaW5nLml4cyh0cnVlKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9wbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoYXQuaXhwX3BsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIk7DoXpldiBwbMOhdGNlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c19lc3U9aXhzX2VzdVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5QcmVmYWJzLnZ5YmVyRXN1KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cDogR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLlR5cFpvYnJhemVuaUthcm90ZWthLlNlbGVjdEVzdSwgLy8gcMWZaWTDoW7DrSBwcmVmYWJ1ICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ292YW5pOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogdGhpcy5peHBfcGwgPz8gXCJcIiwgLy8gemFkw6Fuw60gbG9nb3ZhY8OtY2ggw7pkYWp1IGplIG51dG5vc3QgaGxhdm7EmyBJWFBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRXN1VkhsZWRhbmksIC8vIHZ5YnJhdCB6IGVudW11XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiAodGhpcy5BQ19BRyEgPT0gbnVsbCA/IHRoaXMuaXhwX3BsISA6IHRoaXMuQUNfQUchKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmlUeHQ6IFwiRGV0YWlsIFDFmcOtcGFkdVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBhcyBHU2VsZWN0Qm94T3B0aW9uczxhbnk+KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGF0LmhlYWRlckZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiRmlsdHJ5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiVHlwIHBvaGxlZMOhdmt5XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZGRwc3RwcCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3BobCA9IHZhbHVlLnR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgdHlwX3BobDogdGhhdC50eXBfcGhsIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3RhdlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5kZHBTdGF2UmQoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl9yZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnN0YXZfcmQgPSB2YWx1ZS5zdGF2X3JkXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiWnDFr3NvYiByb3pwdcWhdMSbbsOtIGRsLlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmRkcEl4c1JkbCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfcmRsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX3JkbCA9IHZhbHVlLml4c19yZGw7IG1vZGVsLm5hemV2ID0gdmFsdWUubmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgaXhzX3JkbDogdGhhdC5peHNfcmRsLCBuYXpldjogdGhhdC5uYXpldiB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBsw6F0Y2VcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X3R4dF9wbF9maWx0clwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvcGxhdG7DrWtcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X3R4dF9wb3BfZmlsdHJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFrdGl2bmlcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJab2JyYXppdCBwb3V6ZSBha3Rpdm7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5oZWFkZXJGb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICogVnl0dm/FmcOtIGZpbHRyIHBybyBzZXpuYW0ga29udHJvbCBcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyKGZvcm0pIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXIgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5cclxuICAgICAgICAgICAgICAgIGdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFtmb3JtXSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDcmVhdGVQYW5lbDogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvYWRBZnRlckNob3NlRmlsdGVyOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IChldmVudCwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub19maWx0ciA9IG9iai5maWx0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSh0aGF0Lm9fZmlsdHIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0Lml4cF9wbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5tb2RlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBGdW5rY2UgcHJvIHrDrXNrw6Fuw60gZmlsdHJvdmFuw71jaCBkYXQgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB6aXNrZWpEYXRhKGZpbHRlcjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibmFjaXRhbmlfZGF0XCIsIHRleHQ6IFwiTmHEjcOtdMOhbsOtIGRhdC4uLlwiIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5Sb3pwdXN0ZW5pRGx1aHUubGlzdFByaXBhZHVcclxuICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5nZXQoKS5kb25lKGZ1bmN0aW9uIChkdG8pIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY3VycmVudERhdGEgPSBkdG8uZGF0YTtcclxuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibmFjaXRhbmlfZGF0XCIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogcMWZw61wcmF2YSBkYXRhIG5hIHJvenB1xaF0xJtuw60gZGx1aHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHByaXByYXZpdERhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBpeHNfcmRsID0gdGhhdC5maW5kRmllbGRzKFwiaXhzX3JkbFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIHR5cF9waGwgPSB0aGF0LmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgaXhwX3BsID0gdGhhdC5peHBfcGwgPz8gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIGlmIChpeHNfcmRsID09IG51bGwgfHwgdHlwX3BobCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZihpeHNfcmRsICE9IG51bGwpIGl4c19yZGwgPSBpeHNfcmRsLml4c19yZGxcclxuICAgICAgICAgICAgICAgIGlmICh0eXBfcGhsICE9IG51bGwpIHR5cF9waGwgPSB0eXBfcGhsLnR5cF9waGxcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcclxuICAgICAgICAgICAgICAgICAgICBcIlDFmcOtcHJhdmEgcHJvIHJvenB1xaF0xJtuw60gZGx1aHVcIixcclxuICAgICAgICAgICAgICAgICAgICBgTmVsemUgcMWZaXByYXZpdCByb3pwdcWhdMSbbsOtIGRsdWh1IC0gbmVqc291IHphZGFuw6Egc3Byw6F2bsOhIGRhdGEhXFxuVHlwIHBvaGxlZMOhdmt5OiAke3R5cF9waGx9XFxuWnDFr3NvYiByb3pwdcWhdMSbbsOtOiAke2l4c19yZGx9XFxuXFxuYCxcclxuICAgICAgICAgICAgICAgICAgICA0ODAsXHJcbiAgICAgICAgICAgICAgICAgICAgMjUwXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGl4c19yZGwgPSBpeHNfcmRsLml4c19yZGxcclxuICAgICAgICAgICAgICAgIHR5cF9waGwgPSB0eXBfcGhsLnR5cF9waGxcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibmFjdGVuaU5henZ1XCIsIHRleHQ6IFwiTmHEjcOtdMOhbsOtIGRhdC4uLlwiIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuZ2V0Um96cHVzdGVuaURsdWh1TmF6dnkoaXhzX3JkbCwgdHlwX3BobCkuZG9uZShmdW5jdGlvbiAobmF6dnkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIm5hY3RlbmlOYXp2dVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpeHBfcGwubGVuZ3RoID09IDEyICYmIGl4c19yZGwubGVuZ3RoID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxhdGNlUHJpcHJhdmFSb3pwdXN0ZW5pRGx1aHUobmF6dnksIGl4c19yZGwsIHR5cF9waGwpOyAvL3DFmcOtcHJhdmEgcm96cHXFoXTEm27DrSBkbHVodSBwcm8gcGzDoXRjZVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJpcHJhdmFSb3pwdXN0ZW5pRGx1aHUobmF6dnksIGl4c19yZGwsIHR5cF9waGwpOyAvL3DFmcOtcHJhdmEgcm96cHXFoXTEm27DrSBkbHVodSBwcm8gdHlwIHBvaGxlZHbDoWt5XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0Um96cHVzdGVuaURsdWh1TmF6dnkoaXhzX3JkbCwgdHlwX3BobCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5Sb3pwdXN0ZW5pRGx1aHUubmF6dnkoe1xyXG4gICAgICAgICAgICAgICAgdHlwX3BobDogdHlwX3BobCA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgaXhzX3JkbDogaXhzX3JkbCA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgaXhwX3BsOiB0aGF0Lml4cF9wbCA/PyBcIlwiXHJcbiAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIHDFmcOtcHJhdmEgcm96cHXFoXTEm8WhbsOtIG5hIHBsw6F0Y292aVxyXG4gICAgICAgIHBsYXRjZVByaXByYXZhUm96cHVzdGVuaURsdWh1KG5henZ5LCBpeHNfcmRsLCB0eXBfcGhsKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImtvbnRyb2xhWnByYWNvdmFuaVBsYXRjZVwiLCB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBkYXQuLi5cIiB9KTtcclxuICAgICAgICAgICAgdmFyIGl4c19yZGwgPSBpeHNfcmRsO1xyXG4gICAgICAgICAgICB2YXIgdHlwX3BobCA9IHR5cF9waGw7XHJcbiAgICAgICAgICAgIHRoYXQuZXhpc3R1amVQcmlwcmF2YVJvenB1c3RlbmlEbHVodVBsYXRjZShpeHNfcmRsKS5kb25lKGZ1bmN0aW9uIChleGlzdHMpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwia29udHJvbGFacHJhY292YW5pUGxhdGNlXCIgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlDFmcOtcHJhdmEgcHJvIHJvenB1xaF0xJtuw60gZGx1aHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYE5lbHplIHDFmWlwcmF2aXQgcm96cHXFoXTEm27DrSBkbHVodSAtIGppxb4gYnlsbyB6cHJhY292w6FubyFcXG5QbMOhdGNlOiAke3RoYXQuaXhwX3BsfSAoJHtuYXp2eS5peHBfcGxfdHh0fSlcXG5acMWvc29iIHJvenB1xaF0xJtuw606ICR7bmF6dnkuaXhzX3JkbF90eHR9ICgke2l4c19yZGx9KVxcblxcbmAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQ4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMjUwXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUMWZw61wcmF2YSBwcm8gcm96cHXFoXTEm27DrSBkbHVodVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2hvZMOtIG51bGwgbcOtc3RvIG7DoXp2dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgT3ByYXZkdSBjaGNldGUgcHJvdsOpc3QgcMWZw61wcmF2dSBwcm8gcm96cHXFoXTEm27DrSBkbHVodSB6IHBsw6F0Y2UgbmEgcG9wbGF0bsOta3k/XFxuXFxuUHJvIHDFmcOtcGFkOiAke3RoYXQuaXhwX3BsfSAoJHtuYXp2eS5peHBfcGxfdHh0fSlcXG5acMWvc29iIHJvenB1xaF0xJtuw606ICR7bmF6dnkuaXhzX3JkbF90eHR9ICgke2l4c19yZGx9KVxcblxcblN0w6F2YWrDrWPDrSBuYXN0YXZlbsOtIHBybyBwxZnDrXBhZCBidWRlIHpydcWhZW5vIWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQ4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMjUwXHJcbiAgICAgICAgICAgICAgICAgICAgKS5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJwcmlwcmF2YVwiLCB0ZXh0OiBcIlByb2LDrWjDoSBwxZnDrXByYXZhIHJvenBvdcWhdMSbbsOtIHDFmcOtcGFkdVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Sb3pwdXN0ZW5pRGx1aHUucHJpcHJhdml0Um96cHVzdGVuaVByaXBhZHUoeyBpeHBfcGw6IHRoYXQuaXhwX3BsID8/IFwiXCIsIGl4c19yZGw6IGl4c19yZGwsIHR5cF9waGw6IHRoYXQudHlwX3BobF9peHBfcGwgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJwcmlwcmF2YVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEodGhhdC5vX2ZpbHRyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhpc3R1amVQcmlwcmF2YVJvenB1c3RlbmlEbHVodVBsYXRjZShpeHNfcmRsKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuUm96cHVzdGVuaURsdWh1LmV4aXN0dWplUHJpcHJhdmFSb3pwdXN0ZW5pRGx1aHVQbGF0Y2Uoe1xyXG4gICAgICAgICAgICAgICAgaXhzX3JkbDogaXhzX3JkbCA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgaXhwX3BsOiB0aGF0Lml4cF9wbCA/PyBcIlwiXHJcbiAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIHDFmcOtcHJhdmEgcm96cHXFoXTEm27DrSBuYSB0eXB1IHBvaGxlZMOhdmt5XHJcbiAgICAgICAgcHJpcHJhdmFSb3pwdXN0ZW5pRGx1aHUobmF6dnksIGl4c19yZGwsIHR5cF9waGwpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwia29udHJvbGFacHJhY292YW5pTmFUeXB1UGhsXCIsIHRleHQ6IFwiTmHEjcOtdMOhbsOtIGRhdC4uLlwiIH0pO1xyXG4gICAgICAgICAgICB2YXIgaXhzX3JkbCA9IGl4c19yZGw7XHJcbiAgICAgICAgICAgIHZhciB0eXBfcGhsID0gdHlwX3BobDtcclxuICAgICAgICAgICAgdGhhdC5leGlzdHVqZVByaXByYXZhUm96cHVzdGVuaURsdWh1TmFUeXB1UGhsKGl4c19yZGwsIHR5cF9waGwpLmRvbmUoZnVuY3Rpb24gKGV4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJrb250cm9sYVpwcmFjb3ZhbmlOYVR5cHVQaGxcIiB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChleGlzdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJQxZnDrXByYXZhIHBybyByb3pwdcWhdMSbbsOtIGRsdWh1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGBUeXAgcG9obGVkw6F2a3kgamUgamnFviDEjcOhc3RlxI1uxJsgenByYWNvdsOhbiwgYnVkb3UgZG9nZW5lcm92w6FueSB6YsO9dmFqw61jw60gcMWZw61wYWR5IVxcblxcblR5cCBwb2hsZWTDoXZreTogJHt0eXBfcGhsfSAoJHtuYXp2eS50eXBfcGhsX3R4dH0pXFxuWnDFr3NvYiByb3pwdcWhdMSbbsOtOiAke25henZ5Lml4c19yZGxfdHh0fSAoJHtpeHNfcmRsfSlcXG5cXG5DaGNldGUgb3ByYXZkdSBwb2tyYcSNb3ZhdD9gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0ODAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDI1MFxyXG4gICAgICAgICAgICAgICAgICAgICkub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ0Zvcm0oaXhzX3JkbCwgdHlwX3BobCwgbmF6dnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9nRm9ybShpeHNfcmRsLCB0eXBfcGhsLCBuYXp2eSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGlhbG9nRm9ybShpeHNfcmRsLCB0eXBfcGhsLCBuYXp2eSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFxyXG4gICAgICAgICAgICAgICAgXCJQxZnDrXByYXZhIHBybyByb3pwdcWhdMSbbsOtIGRsdWh1XCIsXHJcbiAgICAgICAgICAgICAgICBgT3ByYXZkdSBjaGNldGUgcHJvdsOpc3QgcMWZw61wcmF2dSBwcm8gcm96cHXFoXTEm27DrSBkbHVodSB6IHBsw6F0Y2UgbmEgcG9wbGF0bsOta3k/XFxuXFxuVHlwIHBvaGxlZMOhdmt5IDogJHt0eXBfcGhsfSAoJHtuYXp2eS50eXBfcGhsX3R4dH0pXFxuWnDFr3NvYiByb3pwdcWhdMSbbsOtOiAke25henZ5Lml4c19yZGxfdHh0fSAoJHtpeHNfcmRsfSlcXG5cXG5TdMOhdmFqw61jw60gbmFzdGF2ZW7DrSBwcm8gTkVaUFJBQ09WQU7DiSBhIE5FU0NIVsOBTEVOw4kgesOhem5hbXkgcHJvIHR5cCBwb2hsZWTDoXZreSBidWRlIHpydcWhZW5vIWAsXHJcbiAgICAgICAgICAgICAgICA0ODAsXHJcbiAgICAgICAgICAgICAgICAyNTBcclxuICAgICAgICAgICAgKS5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGR0byA9IHRoYXQuZHRvO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsX3Z5YnJhbmVQcmlwYWR5ID0gdGhhdC52eWJyYW5lUHJpcGFkeTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlbiA9IHRoYXQudnlicmFuZVByaXBhZHkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHRvW2ldID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX3BsOiBsX3Z5YnJhbmVQcmlwYWR5W2ldLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19yZGw6IGl4c19yZGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiBsX3Z5YnJhbmVQcmlwYWR5W2ldLnR5cF9waGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcInByaXByYXZhXCIsIHRleHQ6IFwiUHJvYsOtaMOhIHDFmcOtcHJhdmEgcm96cG91xaF0xJtuw61cIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlJvenB1c3RlbmlEbHVodS5wcmlwcmF2aXRSb3pwdXN0ZW5pUG9obGVkYXZreSh7IGR0b3M6IGR0byB9KS5nZXQoKS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInByaXByYXZhXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSh0aGF0Lm9fZmlsdHIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhpc3R1amVQcmlwcmF2YVJvenB1c3RlbmlEbHVodU5hVHlwdVBobChpeHNfcmRsLCB0eXBfcGhsKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuUm96cHVzdGVuaURsdWh1LmV4aXN0dWplUHJpcHJhdmFSb3pwdXN0ZW5pRGx1aHVOYVR5cHVQaGwoe1xyXG4gICAgICAgICAgICAgICAgaXhzX3JkbDogaXhzX3JkbCA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdHlwX3BobDogdHlwX3BobCA/PyBcIlwiXHJcbiAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIHpwcmFjb3bDoW7DrSByb3pwdcWhdMSbbsOtXHJcbiAgICAgICAgenByYWNvdmF0RGF0YSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGl4c19yZGwgPSB0aGF0LmZpbmRGaWVsZHMoXCJpeHNfcmRsXCIpLmdmaWVsZChcImdldFZhbHVlXCIpLml4c19yZGw7XHJcbiAgICAgICAgICAgIHZhciB0eXBfcGhsID0gdGhhdC5maW5kRmllbGRzKFwidHlwX3BobFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKS50eXBfcGhsO1xyXG4gICAgICAgICAgICB2YXIgaXhwX3BsID0gdGhhdC5peHBfcGwgPz8gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJuYWN0ZW5pTmF6dnVcIiwgdGV4dDogXCJOYcSNw610w6Fuw60gZGF0Li4uXCIgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmdldFJvenB1c3RlbmlEbHVodU5henZ5KGl4c19yZGwsIHR5cF9waGwpLmRvbmUoZnVuY3Rpb24gKG5henZ5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIm5hY3RlbmlOYXp2dVwiIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpeHBfcGwubGVuZ3RoID09IDEyICYmIGl4c19yZGwubGVuZ3RoID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF0Y2VSb3pwdXN0ZW5pRGx1aHUobmF6dnksIGl4c19yZGwsIHR5cF9waGwpOyAvL3DFmcOtcHJhdmEgcm96cHXFoXTEm27DrSBkbHVodSBwcm8gcGzDoXRjZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnJvenB1c3RlbmlEbHVodShuYXp2eSwgaXhzX3JkbCwgdHlwX3BobCk7IC8vcMWZw61wcmF2YSByb3pwdcWhdMSbbsOtIGRsdWh1IHBybyB0eXAgcG9obGVkdsOha3lcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBsYXRjZVJvenB1c3RlbmlEbHVodShuYXp2eSwgaXhzX3JkbCwgdHlwX3BobCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJrb250cm9sYVpwcmFjb3ZhbmlQbGF0Y2VcIiwgdGV4dDogXCJOYcSNw610w6Fuw60gZGF0Li4uXCIgfSk7XHJcbiAgICAgICAgICAgIHZhciBpeHNfcmRsID0gaXhzX3JkbDtcclxuICAgICAgICAgICAgdmFyIHR5cF9waGwgPSB0eXBfcGhsO1xyXG4gICAgICAgICAgICB0aGF0LmV4aXN0dWplUm96cHVzdGVuaURsdWh1UGxhdGNlKGl4c19yZGwsIHR5cF9waGwpLmRvbmUoZnVuY3Rpb24gKGV4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJrb250cm9sYVpwcmFjb3ZhbmlQbGF0Y2VcIiB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJacHJhY292w6Fuw60gcm96cHXFoXTEm27DrSBkbHVodVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgTmVsemUgenByYWNvdmF0IHJvenB1xaF0xJtuw60gZGx1aHUgLSBleGlzdHVqw60gbmVzY2h2w6FsZW7DoSByb3pwdcWhdMSbbsOtIGRsdWjFryFcXG5QbMOhdGNlOiAke3RoYXQuaXhwX3BsfSAoJHtuYXp2eS5peHBfcGxfdHh0fSlcXG5acMWvc29iIHJvenB1xaF0xJtuw606ICR7bmF6dnkuaXhzX3JkbF90eHR9ICgke2l4c19yZGx9KVxcblxcbmAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQ4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMjUwXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcInJvenB1c3RlbmlcIiwgdGV4dDogXCJQcm9iw61ow6Egcm96cHXFoXTEm27DrSBkbHVodSBwxZnDrXBhZHVcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlJvenB1c3RlbmlEbHVodS5yb3pwdXN0ZW5pRGx1aHVQcmlwYWR1KHsgaXhzX3JkbDogaXhzX3JkbCwgaXhwX3BsOiB0aGF0Lml4cF9wbCA/PyBcIlwiLCB0eXBfcGhsOiB0aGF0LnR5cF9waGxfaXhwX3BsIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJyb3pwdXN0ZW5pXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEodGhhdC5vX2ZpbHRyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleGlzdHVqZVJvenB1c3RlbmlEbHVodVBsYXRjZShpeHNfcmRsLCB0eXBfcGhsKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuUm96cHVzdGVuaURsdWh1LmV4aXN0dWplUm96cHVzdGVuaURsdWh1UGxhdGNlKHtcclxuICAgICAgICAgICAgICAgIGl4c19yZGw6IGl4c19yZGwgPz8gXCJcIixcclxuICAgICAgICAgICAgICAgIHR5cF9waGw6IHR5cF9waGwgPz8gXCJcIixcclxuICAgICAgICAgICAgICAgIGl4cF9wbDogdGhhdC5peHBfcGwgPz8gXCJcIlxyXG4gICAgICAgICAgICB9KS5nZXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJvenB1c3RlbmlEbHVodShuYXp2eSwgaXhzX3JkbCwgdHlwX3BobCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJrb250cm9sYVpwcmFjb3ZhbmlOYVR5cHVQaGxcIiwgdGV4dDogXCJOYcSNw610w6Fuw60gZGF0Li4uXCIgfSk7XHJcbiAgICAgICAgICAgIHZhciBpeHNfcmRsID0gaXhzX3JkbDtcclxuICAgICAgICAgICAgdmFyIHR5cF9waGwgPSB0eXBfcGhsO1xyXG4gICAgICAgICAgICB0aGF0LmV4aXN0dWplUm96cHVzdGVuaURsdWh1TmFUeXB1UGhsKGl4c19yZGwsIHR5cF9waGwpLmRvbmUoZnVuY3Rpb24gKGV4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJrb250cm9sYVpwcmFjb3ZhbmlOYVR5cHVQaGxcIiB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChleGlzdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiWnByYWNvdsOhbsOtIHJvenB1xaF0xJtuw60gZGx1aHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYE5lbHplIHpwcmFjb3ZhdCByb3pwdcWhdMSbbsOtIGRsdWh1IC0gZXhpc3R1asOtIG5lc2NodsOhbGVuw6Egcm96cHXFoXTEm27DrSBkbHVoxa8hXFxuXFxuVHlwIHBvaGxlZMOhdmt5OiAke3R5cF9waGx9ICgke25henZ5LnR5cF9waGxfdHh0fSlcXG5acMWvc29iIHJvenB1xaF0xJtuw606ICR7bmF6dnkuaXhzX3JkbF90eHR9ICgke2l4c19yZGx9KWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQ4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMjUwXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZHRvID0gdGhhdC5kdG87XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxfdnlicmFuZVByaXBhZHkgPSB0aGF0LnZ5YnJhbmVQcmlwYWR5O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuID0gdGhhdC52eWJyYW5lUHJpcGFkeS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdG9baV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfcGw6IGxfdnlicmFuZVByaXBhZHlbaV0uaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3JkbDogaXhzX3JkbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IGxfdnlicmFuZVByaXBhZHlbaV0udHlwX3BobFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJyb3pwdXN0ZW5pXCIsIHRleHQ6IFwiUHJvYsOtaMOhIHJvenB1xaF0xJtuw60gZGx1aHVcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Sb3pwdXN0ZW5pRGx1aHUucm96cHVzdGVuaURsdWh1UG9obGVkYXZreSh7IGR0b3M6IGR0byB9KS5nZXQoKS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInJvenB1c3RlbmlcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56aXNrZWpEYXRhKHRoYXQub19maWx0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleGlzdHVqZVJvenB1c3RlbmlEbHVodU5hVHlwdVBobChpeHNfcmRsLCB0eXBfcGhsKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuUm96cHVzdGVuaURsdWh1LmV4aXN0dWplUm96cHVzdGVuaURsdWh1TmFUeXB1UGhsKHtcclxuICAgICAgICAgICAgICAgIGl4c19yZGw6IGl4c19yZGwgPz8gXCJcIixcclxuICAgICAgICAgICAgICAgIHR5cF9waGw6IHR5cF9waGwgPz8gXCJcIlxyXG4gICAgICAgICAgICB9KS5nZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICB9XHJcbn1cclxuIl19
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var WebClient;
        (function (WebClient) {
            let GPokPredpisyTab = class GPokPredpisyTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    that.servisZmena = false;
                    this.title = 'Zobrazení náhledu zaúčtování předpisu/dokladu';
                    var tabmanager = $("<div>")
                        .appendTo(this.element)
                        .gtabmanager({
                        groups: [
                            {
                                id: "groupZpusobZauctovani",
                                caption: "Způsob zaúčtování"
                            },
                            //{
                            //    id: "groupZpusobZauctovaniPokladna",
                            //    caption: "Způsob zaúčtování - POK"
                            //},
                            {
                                id: "groupDetailpredkontace",
                                caption: "Detail předkontace"
                            },
                            {
                                id: "groupFucPohyby",
                                caption: "FUC pohyby"
                            }
                        ],
                        scopeElement: this.element
                    });
                    //Skupina způsob zaúčtování
                    let groupZpusobZauctovani = $("<div>").appendTo(this.element)
                        .ggroupable({
                        group: { id: "groupZpusobZauctovani" },
                        conceal: function (ev, ctx) {
                            if (ctx.conceal)
                                groupZpusobZauctovani.addClass("concealed");
                            else
                                groupZpusobZauctovani.removeClass("concealed");
                        }
                    });
                    //Skupina způsob zaúčtování pokladna
                    //let groupZpusobZauctovaniPokladna = $("<div>").appendTo(this.element)
                    //    .ggroupable({
                    //        group: { id: "groupZpusobZauctovaniPokladna" },
                    //        conceal: function (ev, ctx) {                      
                    //            if (ctx.conceal) groupZpusobZauctovaniPokladna.addClass("concealed"); else groupZpusobZauctovaniPokladna.removeClass("concealed");
                    //        }
                    //    });
                    //Skupina detail předkontace
                    let groupDetailPredkontace = $("<div>").appendTo(this.element)
                        .ggroupable({
                        group: { id: "groupDetailpredkontace" },
                        conceal: function (ev, ctx) {
                            if (ctx.conceal)
                                groupDetailPredkontace.addClass("concealed");
                            else
                                groupDetailPredkontace.removeClass("concealed");
                        }
                    });
                    //Skupina fuc pohyby
                    let groupFucPohyby = $("<div>").appendTo(this.element)
                        .ggroupable({
                        group: { id: "groupFucPohyby" },
                        conceal: function (ev, ctx) {
                            if (ctx.conceal)
                                groupFucPohyby.addClass("concealed");
                            else
                                groupFucPohyby.removeClass("concealed");
                        }
                    });
                    let formZpusobZauctovani = new Gordic.Forms.Form({ layoutDescriptor: "L3M3S1" })
                        .addSection()
                        .addField("gcheck", {
                        name: "hodnotyPolozky", label: "Doplňovat hodnoty z položky", initialValue: false, change: function (ev, changeObj) {
                            that.findFields("zauctovaniDokladu").gfield("setInitial", false);
                            if (changeObj.value == true) {
                                that.findFields("kumulace").gfield("disable");
                            }
                            else {
                                that.findFields("kumulace").gfield("enable");
                            }
                            that.nactiZauctovani();
                        }
                    })
                        .addSection()
                        .addField("gcheck", {
                        name: "zauctovaniDokladu", label: "Náhled na zaúčtování dokladu", initialValue: false, change: function (ev, changeObj) {
                            that.findFields("hodnotyPolozky").gfield("setInitial", false);
                            if (changeObj.value == true) {
                                that.findFields("kumulace").gfield("enable");
                            }
                            else {
                                that.findFields("kumulace").gfield("disable");
                            }
                            that.nactiZauctovani();
                        }
                    })
                        .addSection("Kumulace")
                        .addField("gradio", {
                        name: "kumulace",
                        itemClass: "",
                        initialValue: 10,
                        disabled: true,
                        change: function (ev, changeObj) {
                            that.nactiZauctovani();
                        },
                        radios: [
                            { value: 10, label: 'Bez kumulace', },
                            {
                                value: 20, label: 'Kumulovat vše',
                            }
                        ]
                    });
                    //let formZpusobZauctovaniPokladna = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" });
                    let formDetailPredkontace = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" });
                    let formFucPohyby = new Gordic.Forms.Form({ layoutDescriptor: "L3M3S1" })
                        .addSection()
                        .addField("gcheck", {
                        name: "pohybNavazene", label: "Pouze navázané (!!!)", initialValue: true, change: function (ev, changeObj) { that.nactiUcetPohyb(); }
                    })
                        .addField("gcheck", {
                        name: "pohybUcetni", label: "Účetní pohyby", initialValue: true, change: function (ev, changeObj) { that.nactiUcetPohyb(); }
                    })
                        .addSection()
                        .addField("gcheck", {
                        name: "pohybRezervacni", label: "Rezervační pohyby", initialValue: true, change: function (ev, changeObj) { that.nactiUcetPohyb(); }
                    })
                        .addField("gcheck", {
                        name: "pohabyPokBezne", label: "POK - Běžné", initialValue: true, change: function (ev, changeObj) { that.nactiUcetPohyb(); }
                    })
                        .addSection()
                        .addField("gcheck", {
                        name: "pohybPreceneni", label: "Přecenění záloh", initialValue: true, change: function (ev, changeObj) { that.nactiUcetPohyb(); }
                    })
                        .addField("gcheck", {
                        name: "pohybPolozka", label: "Pro položku", initialValue: true, change: function (ev, changeObj) { that.nactiUcetPohyb(); }
                    });
                    $("<div>").appendTo(groupZpusobZauctovani).gform("createFrom", formZpusobZauctovani);
                    this.gridZpusobZauctovani = $("<div>").appendTo(groupZpusobZauctovani).gautofit()
                        .ggrid({
                        columnMode: "fit",
                        columns: this.createGridFormatFuc()
                    });
                    //$("<div>").appendTo(groupZpusobZauctovaniPokladna).gform("createFrom", formZpusobZauctovaniPokladna);
                    //this.gridZpusobZauctovaniPok = $("<div>").appendTo(groupZpusobZauctovaniPokladna).gautofit()
                    //    .ggrid({
                    //        columnMode: "fit",
                    //        columns: this.createGridFormatPok()
                    //    });
                    $("<div>").appendTo(groupDetailPredkontace).gform("createFrom", formDetailPredkontace);
                    this.gridDetailPredkontace = $("<div>").appendTo(groupDetailPredkontace).gautofit()
                        .ggrid({
                        columnMode: "fit",
                        columns: this.createGridFormatPredkontace(),
                        rowNumbers: true,
                    });
                    $("<div>").appendTo(groupFucPohyby).gform("createFrom", formFucPohyby);
                    this.gridPohybyFuc = $("<div>").appendTo(groupFucPohyby).gautofit()
                        .ggrid({
                        columnMode: "fit",
                        columns: this.createGridFormatPohyby()
                    });
                    tabmanager.gtabmanager("refresh");
                    that.nactiDetailKontace();
                    that.nactiUcetPohyb();
                    that.nactiZauctovani();
                }
                nactiDetailKontace() {
                    var that = this;
                    that.isl.PokKontace.read({
                        data: { ixs_kon: this.pokladniPolozka.ixs_kon },
                        fragments: ["pokskon_txt", "*", "Vlastnosti"]
                    })
                        .get().done(function (data) {
                        //neexistuje zálohová kontace
                        if (data.data.ixs_kon_zal == null || data.data.ixs_kon_zal == "") {
                            that.zobrazData(data.data, null);
                        }
                        else {
                            that.isl.PokKontace.read({
                                data: { ixs_kon: data.data.ixs_kon_zal },
                                // fragments: ["*"]
                            })
                                .get().done(function (dataZaloha) {
                                that.zobrazData(data.data, dataZaloha.data);
                            });
                        }
                    });
                }
                nactiZauctovani() {
                    var that = this;
                    that.beginOperation("Probíhá načítání...");
                    let filterHodnotyPolozka;
                    let filterZauctovaniDokladu;
                    let filterKumulace;
                    filterHodnotyPolozka = that.findFields("hodnotyPolozky").gfield("getValue");
                    filterZauctovaniDokladu = that.findFields("zauctovaniDokladu").gfield("getValue");
                    filterKumulace = that.findFields("kumulace").gfield("getValue");
                    if (filterHodnotyPolozka || filterZauctovaniDokladu) {
                        if (filterHodnotyPolozka) { // doplnění z pokladní položky
                            that.isl.PokKontace.radkyZpuZauFucPolozky(rq => {
                                return {
                                    ixp: that.pokladniDoklad.ixp,
                                    radek: that.pokladniPolozka.radek,
                                    ktgUpo: that.ktgUcPripadu,
                                    typUpr: that.typUcPripadu
                                };
                            }).get().done(function (data) {
                                that.setDataZpusobZauctovani(data);
                                that.endOperation();
                            })
                                .fail(function () {
                                that.endOperation();
                            });
                        }
                        else { //náhled zaúčtování
                            that.isl.PokDoklad.nahledZauctovani(rq => {
                                return {
                                    ixp: that.pokladniDoklad.ixp,
                                    kumulovane: filterKumulace == 10 ? false : true
                                };
                            }).get().done(function (data) {
                                that.setDataZpusobZauctovani(data);
                                that.endOperation();
                            })
                                .fail(function () {
                                that.endOperation();
                            });
                        }
                    }
                    else { //zobrazení způsobu zaúčtování
                        that.isl.PokKontace.radkyZpuZauFuc(rq => {
                            return {
                                ixsKon: that.pokladniPolozka.ixs_kon,
                                ktgUpo: that.ktgUcPripadu,
                                typUpr: that.typUcPripadu
                            };
                        }).get().done(function (data) {
                            that.setDataZpusobZauctovani(data);
                            that.endOperation();
                        })
                            .fail(function () {
                            that.endOperation();
                        });
                    }
                }
                setDataZpusobZauctovani(data) {
                    var that = this;
                    var view = new Gordic.Data.View(data, { key: "ixs_zpz" });
                    that.gridZpusobZauctovani.ggrid("setData", view); //true = prekresleni gridu
                }
                nactiUcetPohyb() {
                    let pohybDto;
                    var that = this;
                    that.beginOperation("Načítání účetních pohybů");
                    let filterPolozka = that.findFields("pohybPolozka").gfield("getValue");
                    let filternavazane = that.findFields("pohybNavazene").gfield("getValue");
                    let filterUcetni = that.findFields("pohybUcetni").gfield("getValue");
                    let filterRezervacni = that.findFields("pohybRezervacni").gfield("getValue");
                    let filterPokBezne = that.findFields("pohabyPokBezne").gfield("getValue");
                    let filterPreceneni = that.findFields("pohybPreceneni").gfield("getValue");
                    let filterHodnotaUcRe;
                    let filterHodnotaKtgUpo;
                    let filterHodnotaPolozka;
                    if (filterUcetni && filterRezervacni) {
                        filterHodnotaUcRe = [10, 60];
                    }
                    else if (filterUcetni) {
                        filterHodnotaUcRe = [10];
                    }
                    else if (filterRezervacni) {
                        filterHodnotaUcRe = [60];
                    }
                    if (filterPreceneni && filterPokBezne) {
                        filterHodnotaKtgUpo = [300, 330, 400, 430, 320, 420];
                    }
                    else if (filterPreceneni) {
                        filterHodnotaKtgUpo = [320, 420];
                    }
                    else if (filterPokBezne) {
                        filterHodnotaKtgUpo = [300, 330, 400, 430];
                    }
                    filterHodnotaPolozka = [];
                    if (filterPolozka) {
                        if (that.pokladniPolozka.radek_upo)
                            filterHodnotaPolozka.push(that.pokladniPolozka.radek_upo);
                        if (that.pokladniPolozka.radek_upo_rez)
                            filterHodnotaPolozka.push(that.pokladniPolozka.radek_upo_rez);
                        if (that.pokladniPolozka.radek_upo_prec)
                            filterHodnotaPolozka.push(that.pokladniPolozka.radek_upo_prec);
                    }
                    //zatím tady načítání pohybů
                    that.isl.FinPohyb.list(rq => {
                        return {
                            filters: {
                                ixp_upr: that.pokladniDoklad.ixp,
                                upo_typ_upo: filterHodnotaUcRe,
                                upo_ktg_upo: filterHodnotaKtgUpo,
                                upo_radek_upo: filterHodnotaPolozka
                            }
                        };
                    }).getData()
                        .done(function (data) {
                        pohybDto = data;
                        //var view = new Gordic.Data.View(data.data, { key: "ixp_upr" });
                        // that.gridPohybyFuc.ggrid("setData", view);//true = prekresleni gridu
                    })
                        .then(function () {
                        let def = $.Deferred();
                        //nalezeno ve FUC jak donačítat texty sloupců
                        //let dataFuccsuo: Data.Readers.FuccsuoDto[];
                        let dataEkocsto;
                        let promises = [];
                        //  promises.push(new Gordic.Data.Readers.Fuccsuo().getData().then((dataReader) => { dataFuccsuo = dataReader; }));
                        promises.push(new Gordic.Data.Readers.Ekocsto().getData().then((dataReader) => { dataEkocsto = dataReader; }));
                        $.when.apply(null, promises).then(() => {
                            pohybDto.forEach(function (item) {
                                // stav pohybu
                                //let suo = dataFuccsuo.find(function (element) { return (element.s_upo === item.s_upo); });
                                //if (suo !== undefined) {
                                //    // TODO: ještě předělat
                                //    if (item.druh_poh === 10) item.s_upo_txt = (suo.s_upo_rez_txt || "").toUpperCase();
                                //    else item.s_upo_txt = (suo.s_upo_txt || "").toUpperCase();
                                //}
                                // stav storna
                                let sto = dataEkocsto.find(function (element) { return (element.s_sto === item.s_sto); });
                                if (sto !== undefined)
                                    item.s_sto_txt = (sto.s_sto_txt || "").toUpperCase();
                            });
                            def.resolve();
                        });
                        return def.promise();
                    }).done(function () {
                        var view = new Gordic.Data.View(pohybDto, { key: "ixp_upr" });
                        that.gridPohybyFuc.ggrid("setData", view); //true = prekresleni gridut
                        that.endOperation();
                    });
                }
                zobrazData(data, dataZaloha) {
                    var that = this;
                    let finalDto = [];
                    finalDto.push({ column1: "Typ kontace", column2: data.typ_kon });
                    finalDto.push({ column1: "Kód kontace", column2: data.kod });
                    finalDto.push({ column1: "Název kontace", column2: data.nazev });
                    finalDto.push({ column1: "PID kontace", column2: data.ixs_kon });
                    finalDto.push({ column1: "Typ účetního případu", column2: that.typUcPripaduTxt });
                    finalDto.push({ column1: "Kategorie uč. pohybu", column2: that.ktgUcPripaduTxt });
                    //informace o ZPZ
                    let detailHlavickaZpzView = new Gordic.Data.View(that.detailHlavickaZpz);
                    detailHlavickaZpzView.getDataRows().forEach(function (row) {
                        finalDto.push({ column1: row["nazev"], column2: row["hodnota"] });
                    });
                    //zálohová kontace
                    finalDto.push({ column1: "Typ zálohové kontace", column2: dataZaloha ? dataZaloha.typ_kon : "" });
                    finalDto.push({ column1: "Kód zálohové kontace", column2: dataZaloha ? dataZaloha.kod : "" });
                    finalDto.push({ column1: "Název zálohové kontace", column2: dataZaloha ? dataZaloha.nazev : "" });
                    finalDto.push({ column1: "PID zálohové kontace", column2: data.ixs_kon_zal });
                    finalDto.push({ column1: "Povinnost pár. symbolu", column2: data.pov_vs_txt });
                    finalDto.push({ column1: "Typ pohledávky DDP", column2: data.typ_phl + " - " + data.typ_phl_txt });
                    //DPH
                    let povoleneDphTxt;
                    povoleneDphTxt = "";
                    let i = 0;
                    let filterVlastnostiDaneDto = data.Vlastnosti.filter((zaznam) => zaznam.vlk == 600 && zaznam.aktivita == 100);
                    filterVlastnostiDaneDto.forEach(function (row) {
                        i++;
                        povoleneDphTxt = povoleneDphTxt + row.hodnota_txt;
                        if (filterVlastnostiDaneDto.length == i) {
                            finalDto.push({ column1: "Povolené DPH", column2: povoleneDphTxt });
                        }
                        else {
                            povoleneDphTxt = povoleneDphTxt + ",";
                        }
                    });
                    finalDto.push({ column1: "Podkategorie dokumentu", column2: data.ixs_typ_txt }); //ixs_typ
                    finalDto.push({ column1: "Měrná jednotka", column2: data.mj });
                    finalDto.push({ column1: "Cena za MJ", column2: data.cmj?.toString() });
                    let priznakTzhText;
                    switch (data.priz_tzh) {
                        case 0:
                            priznakTzhText = "bez TZH";
                            break;
                        case 10:
                            priznakTzhText = "povinné TZH";
                            break;
                        case 20:
                            priznakTzhText = "nepovinné TZH";
                            break;
                        default: priznakTzhText = "";
                    }
                    finalDto.push({ column1: "TZH", column2: priznakTzhText });
                    finalDto.push({ column1: "Typ TZH", column2: data.tzh_typ_txt });
                    //Vlastnosti kontací
                    let hotoveVlastnosti;
                    hotoveVlastnosti = [];
                    data.Vlastnosti.forEach(function (row) {
                        let filterDtoPokvvkhdto;
                        filterDtoPokvvkhdto = [];
                        if (hotoveVlastnosti.indexOf(row.vlk) > -1) {
                            return;
                        }
                        if (row.aktivita == 100) {
                            filterDtoPokvvkhdto = data.Vlastnosti.filter((zaznam) => zaznam.vlk == row.vlk);
                            hotoveVlastnosti.push(row.vlk);
                        }
                        let y = 0;
                        let vyslednyTxt;
                        vyslednyTxt = "";
                        filterDtoPokvvkhdto.forEach(function (row) {
                            y++;
                            if (row.aktivita == 100) {
                                vyslednyTxt = vyslednyTxt + row.hodnota_txt;
                                if (filterDtoPokvvkhdto.length == y) {
                                    finalDto.push({ column1: row.vlk_txt, column2: vyslednyTxt });
                                }
                                else {
                                    vyslednyTxt = vyslednyTxt + ",";
                                }
                            }
                        });
                    });
                    if (that.pokParams.PokRadPsPovol) {
                        finalDto.push({ column1: "Prodejní materiál", column2: that.prodejniMaterial });
                    }
                    var view = new Gordic.Data.View(finalDto, { key: "ixp" });
                    that.gridDetailPredkontace.ggrid("setData", view); //true = prekresleni gridu
                }
                createGridFormatPredkontace() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "column1", caption: "Parametr překontace" });
                    gridFormat.addTextColumn({ name: "column2", caption: "Hodnota" });
                    return gridFormat;
                }
                createGridFormatFuc() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    let kumul = false;
                    if (!kumul) {
                        gridFormat.addTextColumn({ name: "ixs_zpz", caption: "Idetifikátor", width: 90 });
                        gridFormat.addNumberColumn({ name: "radek", caption: "#", width: 20 });
                    }
                    gridFormat.addTextColumn({
                        name: "nks",
                        caption: "jres:31302118", //dotáhnout název   GHplCommon.UserProcess.Configuration.GetDatabaseShortcut("nks")    //RC 31302118 : NKS  
                        width: 45
                    });
                    gridFormat.addSortedEkoCfuSet(this, true);
                    gridFormat.addTextColumn({ name: "popis_t", caption: "Popis" });
                    gridFormat.addTextColumn({ name: "c0", caption: "MD", width: 60 });
                    gridFormat.addTextColumn({ name: "c1", caption: "DAL", width: 60 });
                    if (this.pokParams.PrizIissp != 0) {
                        gridFormat.addTextColumn({ name: "id_hrd_ris", caption: "ID RIS" });
                        gridFormat.addNumberColumn({ name: "radek_hdr", caption: "Ř. RIS" });
                    }
                    return gridFormat;
                }
                //private createGridFormatPok(): Gordic.Data.GridFormat<GPokUniverzalniDto> {
                //    var gridFormat = new Gordic.Data.GridFormat<GPokUniverzalniDto>();
                //    gridFormat.addTextColumn({ name: "column1", caption: "Test" });
                //    gridFormat.addTextColumn({ name: "column2", caption: "test" });
                //    return gridFormat;
                //}
                createGridFormatPohyby() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addNumberColumn({ name: "radek_upo", caption: "Řádek pohybu" });
                    gridFormat.addTextColumn({ name: "s_upo_txt", caption: "Stav pohybu" });
                    gridFormat.addNumberColumn({ name: "s_upo", caption: "Stav pohybu" });
                    gridFormat.addTextColumn({ name: "typ_upo_txt", caption: "Typ" });
                    gridFormat.addNumberColumn({ name: "typ_upo", caption: "Typ" });
                    gridFormat.addTextColumn({ name: "ktg_upo_txt", caption: "Kategorie" });
                    gridFormat.addTextColumn({ name: "s_sto_txt", caption: "Stav storna" });
                    gridFormat.addCurrencyColumn({ name: "c_upo", caption: "Částka" });
                    gridFormat.addDateColumn({ name: "dat_upo", caption: "Datum UPP" });
                    gridFormat.addTextColumn({ name: "popis_upo", caption: "Popis" });
                    return gridFormat;
                }
            };
            GPokPredpisyTab = __decorate([
                Decorators.gcontent
            ], GPokPredpisyTab);
            WebClient.GPokPredpisyTab = GPokPredpisyTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1ByZWRwaXN5VGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bva1ByZWRwaXN5VGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0EybUJQO0FBM21CVCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EybUJYO0lBM21CUSxXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EybUJyQjtRQTNtQlksV0FBQSxTQUFTO1lBRzFCLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsT0FBQSxZQUFZO2dCQW9CN0MsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUV6QixJQUFJLENBQUMsS0FBSyxHQUFHLCtDQUErQyxDQUFDO29CQUU3RCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO3lCQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDdEIsV0FBVyxDQUFDO3dCQUNULE1BQU0sRUFBRTs0QkFDSjtnQ0FDSSxFQUFFLEVBQUUsdUJBQXVCO2dDQUMzQixPQUFPLEVBQUUsbUJBQW1COzZCQUMvQjs0QkFDRCxHQUFHOzRCQUNILDBDQUEwQzs0QkFDMUMsd0NBQXdDOzRCQUN4QyxJQUFJOzRCQUNKO2dDQUNJLEVBQUUsRUFBRSx3QkFBd0I7Z0NBQzVCLE9BQU8sRUFBRSxvQkFBb0I7NkJBQ2hDOzRCQUNEO2dDQUNJLEVBQUUsRUFBRSxnQkFBZ0I7Z0NBQ3BCLE9BQU8sRUFBRSxZQUFZOzZCQUN4Qjt5QkFDSjt3QkFDRCxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU87cUJBQzdCLENBQUMsQ0FBQztvQkFJUCwyQkFBMkI7b0JBQzNCLElBQUkscUJBQXFCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN4RCxV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LEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQ2hFLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO29CQUN4RSxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztvQkFDeEUsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDbkUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7b0JBQ3BFLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUdsRSxPQUFPLFVBQVUsQ0FBQztnQkFFdEIsQ0FBQzthQUNKLENBQUE7WUF2bUJZLGVBQWU7Z0JBRDNCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsZUFBZSxDQXVtQjNCO1lBdm1CWSx5QkFBZSxrQkF1bUIzQixDQUFBO1FBQ0csQ0FBQyxFQTNtQlksU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBMm1CckI7SUFBRCxDQUFDLEVBM21CUSxHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEybUJYO0FBQUQsQ0FBQyxFQTNtQkMsTUFBTSxLQUFOLE1BQU0sUUEybUJQIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Qb2suV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2tQcmVkcGlzeVRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICBcclxuICAgICAgICBwcml2YXRlIGdyaWRacHVzb2JaYXVjdG92YW5pOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkWnB1c29iWmF1Y3RvdmFuaVBvazogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZERldGFpbFByZWRrb250YWNlOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkUG9oeWJ5RnVjOiBKUXVlcnk7ICAgICBcclxuICAgICAgICBwb2tQYXJhbXM6IEdQb2tQYXJhbUR0bztcclxuICAgICAgICBwb2tsYWRuaVBvbG96a2E6IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tQb2xvemt5RHRvO1xyXG4gICAgICAgIHBva2xhZG5pRG9rbGFkOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvO1xyXG4gICAgICAgIHR5cFVjUHJpcGFkdVR4dDogc3RyaW5nO1xyXG4gICAgICAgIGt0Z1VjUHJpcGFkdVR4dDogc3RyaW5nO1xyXG4gICAgICAgIHR5cFVjUHJpcGFkdTogc3RyaW5nO1xyXG4gICAgICAgIGt0Z1VjUHJpcGFkdTogbnVtYmVyO1xyXG4gICAgICAgIGRldGFpbEhsYXZpY2thWnB6O1xyXG4gICAgICAgIHByb2Rlam5pTWF0ZXJpYWw6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIHNlcnZpc1ptZW5hOiBib29sZWFuO1xyXG4gICAgICBcclxuICAgICAgIFxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuc2VydmlzWm1lbmEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSAnWm9icmF6ZW7DrSBuw6FobGVkdSB6YcO6xI10b3bDoW7DrSBwxZllZHBpc3UvZG9rbGFkdSc7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFibWFuYWdlciA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5ndGFibWFuYWdlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImdyb3VwWnB1c29iWmF1Y3RvdmFuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJacMWvc29iIHphw7rEjXRvdsOhbsOtXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZDogXCJncm91cFpwdXNvYlphdWN0b3ZhbmlQb2tsYWRuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIlpwxa9zb2IgemHDusSNdG92w6Fuw60gLSBQT0tcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImdyb3VwRGV0YWlscHJlZGtvbnRhY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsIHDFmWVka29udGFjZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImdyb3VwRnVjUG9oeWJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkZVQyBwb2h5YnlcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGVFbGVtZW50OiB0aGlzLmVsZW1lbnRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvL1NrdXBpbmEgenDFr3NvYiB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICBsZXQgZ3JvdXBacHVzb2JaYXVjdG92YW5pID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmdncm91cGFibGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcImdyb3VwWnB1c29iWmF1Y3RvdmFuaVwiIH0sXHJcbiAgICAgICAgICAgICAgICBjb25jZWFsOiBmdW5jdGlvbiAoZXYsIGN0eCkgeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmNvbmNlYWwpIGdyb3VwWnB1c29iWmF1Y3RvdmFuaS5hZGRDbGFzcyhcImNvbmNlYWxlZFwiKTsgZWxzZSBncm91cFpwdXNvYlphdWN0b3ZhbmkucmVtb3ZlQ2xhc3MoXCJjb25jZWFsZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vU2t1cGluYSB6cMWvc29iIHphw7rEjXRvdsOhbsOtIHBva2xhZG5hXHJcbiAgICAgICAgICAgIC8vbGV0IGdyb3VwWnB1c29iWmF1Y3RvdmFuaVBva2xhZG5hID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgLy8gICAgLmdncm91cGFibGUoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiZ3JvdXBacHVzb2JaYXVjdG92YW5pUG9rbGFkbmFcIiB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY29uY2VhbDogZnVuY3Rpb24gKGV2LCBjdHgpIHsgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKGN0eC5jb25jZWFsKSBncm91cFpwdXNvYlphdWN0b3ZhbmlQb2tsYWRuYS5hZGRDbGFzcyhcImNvbmNlYWxlZFwiKTsgZWxzZSBncm91cFpwdXNvYlphdWN0b3ZhbmlQb2tsYWRuYS5yZW1vdmVDbGFzcyhcImNvbmNlYWxlZFwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL1NrdXBpbmEgZGV0YWlsIHDFmWVka29udGFjZVxyXG4gICAgICAgICAgICBsZXQgZ3JvdXBEZXRhaWxQcmVka29udGFjZSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyb3VwYWJsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiZ3JvdXBEZXRhaWxwcmVka29udGFjZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29uY2VhbDogZnVuY3Rpb24gKGV2LCBjdHgpIHsgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC5jb25jZWFsKSBncm91cERldGFpbFByZWRrb250YWNlLmFkZENsYXNzKFwiY29uY2VhbGVkXCIpOyBlbHNlIGdyb3VwRGV0YWlsUHJlZGtvbnRhY2UucmVtb3ZlQ2xhc3MoXCJjb25jZWFsZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL1NrdXBpbmEgZnVjIHBvaHlieVxyXG4gICAgICAgICAgICBsZXQgZ3JvdXBGdWNQb2h5YnkgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncm91cGFibGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcImdyb3VwRnVjUG9oeWJ5XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb25jZWFsOiBmdW5jdGlvbiAoZXYsIGN0eCkgeyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHguY29uY2VhbCkgZ3JvdXBGdWNQb2h5YnkuYWRkQ2xhc3MoXCJjb25jZWFsZWRcIik7IGVsc2UgZ3JvdXBGdWNQb2h5YnkucmVtb3ZlQ2xhc3MoXCJjb25jZWFsZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybVpwdXNvYlphdWN0b3ZhbmkgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwzTTNTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaG9kbm90eVBvbG96a3lcIiwgbGFiZWw6IFwiRG9wbMWIb3ZhdCBob2Rub3R5IHogcG9sb8W+a3lcIiwgaW5pdGlhbFZhbHVlOiBmYWxzZSwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ6YXVjdG92YW5pRG9rbGFkdVwiKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZU9iai52YWx1ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJrdW11bGFjZVwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwia3VtdWxhY2VcIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hY3RpWmF1Y3RvdmFuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiemF1Y3RvdmFuaURva2xhZHVcIiwgbGFiZWw6IFwiTsOhaGxlZCBuYSB6YcO6xI10b3bDoW7DrSBkb2tsYWR1XCIsIGluaXRpYWxWYWx1ZTogZmFsc2UsIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHsgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJob2Rub3R5UG9sb3preVwiKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VPYmoudmFsdWUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwia3VtdWxhY2VcIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwia3VtdWxhY2VcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYWN0aVphdWN0b3ZhbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJLdW11bGFjZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt1bXVsYWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hY3RpWmF1Y3RvdmFuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDEwLCBsYWJlbDogJ0JleiBrdW11bGFjZScsIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyMCwgbGFiZWw6ICdLdW11bG92YXQgdsWhZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vbGV0IGZvcm1acHVzb2JaYXVjdG92YW5pUG9rbGFkbmEgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0wLTEyLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwiIH0pO1xyXG4gICAgICAgICAgICBsZXQgZm9ybURldGFpbFByZWRrb250YWNlID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KTtcclxuICAgICAgICAgICAgbGV0IGZvcm1GdWNQb2h5YnkgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwzTTNTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9oeWJOYXZhemVuZVwiLCBsYWJlbDogXCJQb3V6ZSBuYXbDoXphbsOpICghISEpXCIsIGluaXRpYWxWYWx1ZTogdHJ1ZSwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikgeyB0aGF0Lm5hY3RpVWNldFBvaHliKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvaHliVWNldG5pXCIsIGxhYmVsOiBcIsOaxI1ldG7DrSBwb2h5YnlcIiwgaW5pdGlhbFZhbHVlOiB0cnVlLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7IHRoYXQubmFjdGlVY2V0UG9oeWIoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb2h5YlJlemVydmFjbmlcIiwgbGFiZWw6IFwiUmV6ZXJ2YcSNbsOtIHBvaHlieVwiLCBpbml0aWFsVmFsdWU6IHRydWUsIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHsgdGhhdC5uYWN0aVVjZXRQb2h5YigpOyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvaGFieVBva0Jlem5lXCIsIGxhYmVsOiBcIlBPSyAtIELEm8W+bsOpXCIsIGluaXRpYWxWYWx1ZTogdHJ1ZSwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikgeyB0aGF0Lm5hY3RpVWNldFBvaHliKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9oeWJQcmVjZW5lbmlcIiwgbGFiZWw6IFwiUMWZZWNlbsSbbsOtIHrDoWxvaFwiLCBpbml0aWFsVmFsdWU6IHRydWUsIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHsgdGhhdC5uYWN0aVVjZXRQb2h5YigpOyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvaHliUG9sb3prYVwiLCBsYWJlbDogXCJQcm8gcG9sb8W+a3VcIiwgaW5pdGlhbFZhbHVlOiB0cnVlLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7IHRoYXQubmFjdGlVY2V0UG9oeWIoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhncm91cFpwdXNvYlphdWN0b3ZhbmkpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtWnB1c29iWmF1Y3RvdmFuaSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZFpwdXNvYlphdWN0b3ZhbmkgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8oZ3JvdXBacHVzb2JaYXVjdG92YW5pKS5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0RnVjKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8kKFwiPGRpdj5cIikuYXBwZW5kVG8oZ3JvdXBacHVzb2JaYXVjdG92YW5pUG9rbGFkbmEpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtWnB1c29iWmF1Y3RvdmFuaVBva2xhZG5hKTtcclxuICAgICAgICAgICAgLy90aGlzLmdyaWRacHVzb2JaYXVjdG92YW5pUG9rID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKGdyb3VwWnB1c29iWmF1Y3RvdmFuaVBva2xhZG5hKS5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgIC8vICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0UG9rKClcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiPGRpdj5cIikuYXBwZW5kVG8oZ3JvdXBEZXRhaWxQcmVka29udGFjZSkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1EZXRhaWxQcmVka29udGFjZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZERldGFpbFByZWRrb250YWNlID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKGdyb3VwRGV0YWlsUHJlZGtvbnRhY2UpLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXRQcmVka29udGFjZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IHRydWUsICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhncm91cEZ1Y1BvaHlieSkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1GdWNQb2h5YnkpO1xyXG4gICAgICAgICAgIHRoaXMuZ3JpZFBvaHlieUZ1YyA9ICAkKFwiPGRpdj5cIikuYXBwZW5kVG8oZ3JvdXBGdWNQb2h5YnkpLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXRQb2h5YnkoKVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGFibWFuYWdlci5ndGFibWFuYWdlcihcInJlZnJlc2hcIik7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm5hY3RpRGV0YWlsS29udGFjZSgpO1xyXG4gICAgICAgICAgICB0aGF0Lm5hY3RpVWNldFBvaHliKCk7XHJcbiAgICAgICAgICAgIHRoYXQubmFjdGlaYXVjdG92YW5pKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBuYWN0aURldGFpbEtvbnRhY2UoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmlzbC5Qb2tLb250YWNlLnJlYWQoe1xyXG4gICAgICAgICAgICAgICAgZGF0YTogeyBpeHNfa29uOiB0aGlzLnBva2xhZG5pUG9sb3prYS5peHNfa29uIH0sXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudHM6IFtcInBva3Nrb25fdHh0XCIsIFwiKlwiLCBcIlZsYXN0bm9zdGlcIl1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9uZWV4aXN0dWplIHrDoWxvaG92w6Ega29udGFjZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmRhdGEuaXhzX2tvbl96YWwgPT0gbnVsbCB8fCBkYXRhLmRhdGEuaXhzX2tvbl96YWwgPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnpvYnJhekRhdGEoZGF0YS5kYXRhLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlBva0tvbnRhY2UucmVhZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IGl4c19rb246IGRhdGEuZGF0YS5peHNfa29uX3phbCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZnJhZ21lbnRzOiBbXCIqXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZGF0YVphbG9oYSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnpvYnJhekRhdGEoZGF0YS5kYXRhLCBkYXRhWmFsb2hhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBuYWN0aVphdWN0b3ZhbmkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIG5hxI3DrXTDoW7DrS4uLlwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgZmlsdGVySG9kbm90eVBvbG96a2EgOiBib29sZWFuO1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyWmF1Y3RvdmFuaURva2xhZHUgOiBib29sZWFuO1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyS3VtdWxhY2U6IG51bWJlcjtcclxuXHJcblxyXG4gICAgICAgICAgICBmaWx0ZXJIb2Rub3R5UG9sb3prYSA9IHRoYXQuZmluZEZpZWxkcyhcImhvZG5vdHlQb2xvemt5XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBmaWx0ZXJaYXVjdG92YW5pRG9rbGFkdSA9IHRoYXQuZmluZEZpZWxkcyhcInphdWN0b3ZhbmlEb2tsYWR1XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBmaWx0ZXJLdW11bGFjZSA9IHRoYXQuZmluZEZpZWxkcyhcImt1bXVsYWNlXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZpbHRlckhvZG5vdHlQb2xvemthIHx8IGZpbHRlclphdWN0b3ZhbmlEb2tsYWR1KSB7XHJcbiAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlckhvZG5vdHlQb2xvemthKSB7IC8vIGRvcGxuxJtuw60geiBwb2tsYWRuw60gcG9sb8W+a3lcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9rS29udGFjZS5yYWRreVpwdVphdUZ1Y1BvbG96a3kocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0LnBva2xhZG5pRG9rbGFkLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrOiB0aGF0LnBva2xhZG5pUG9sb3prYS5yYWRlayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z1VwbzogdGhhdC5rdGdVY1ByaXBhZHUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBVcHI6IHRoYXQudHlwVWNQcmlwYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKS5nZXQoKS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhWnB1c29iWmF1Y3RvdmFuaShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgeyAvL27DoWhsZWQgemHDusSNdG92w6Fuw61cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9rRG9rbGFkLm5haGxlZFphdWN0b3ZhbmkocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0LnBva2xhZG5pRG9rbGFkLml4cCEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdW11bG92YW5lOiBmaWx0ZXJLdW11bGFjZSA9PSAxMD8gZmFsc2UgOiB0cnVlIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0RGF0YVpwdXNvYlphdWN0b3ZhbmkoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgeyAvL3pvYnJhemVuw60genDFr3NvYnUgemHDusSNdG92w6Fuw61cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9rS29udGFjZS5yYWRreVpwdVphdUZ1YyhycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhzS29uOiB0aGF0LnBva2xhZG5pUG9sb3prYS5peHNfa29uISxcclxuICAgICAgICAgICAgICAgICAgICAgICAga3RnVXBvOiB0aGF0Lmt0Z1VjUHJpcGFkdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwVXByOiB0aGF0LnR5cFVjUHJpcGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhWnB1c29iWmF1Y3RvdmFuaShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldERhdGFacHVzb2JaYXVjdG92YW5pKGRhdGE6IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tSYWRreVpwdVphdWN0b3ZhbmlEdG9bXSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEsIHsga2V5OiBcIml4c196cHpcIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5ncmlkWnB1c29iWmF1Y3RvdmFuaS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7Ly90cnVlID0gcHJla3Jlc2xlbmkgZ3JpZHVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbmFjdGlVY2V0UG9oeWIoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGxldCBwb2h5YkR0bzogR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvW107XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiTmHEjcOtdMOhbsOtIMO6xI1ldG7DrWNoIHBvaHlixa9cIik7XHJcblxyXG4gICAgICAgICAgICBsZXQgZmlsdGVyUG9sb3prYSA9IHRoYXQuZmluZEZpZWxkcyhcInBvaHliUG9sb3prYVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGZpbHRlcm5hdmF6YW5lID0gdGhhdC5maW5kRmllbGRzKFwicG9oeWJOYXZhemVuZVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGZpbHRlclVjZXRuaSA9IHRoYXQuZmluZEZpZWxkcyhcInBvaHliVWNldG5pXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyUmV6ZXJ2YWNuaSA9IHRoYXQuZmluZEZpZWxkcyhcInBvaHliUmV6ZXJ2YWNuaVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGZpbHRlclBva0Jlem5lID0gdGhhdC5maW5kRmllbGRzKFwicG9oYWJ5UG9rQmV6bmVcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJQcmVjZW5lbmkgPSB0aGF0LmZpbmRGaWVsZHMoXCJwb2h5YlByZWNlbmVuaVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJIb2Rub3RhVWNSZTogbnVtYmVyW107XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJIb2Rub3RhS3RnVXBvOiBudW1iZXJbXTtcclxuICAgICAgICAgICAgbGV0IGZpbHRlckhvZG5vdGFQb2xvemthOiBudW1iZXJbXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmaWx0ZXJVY2V0bmkgJiYgZmlsdGVyUmV6ZXJ2YWNuaSkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVySG9kbm90YVVjUmUgPSBbMTAsIDYwXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZpbHRlclVjZXRuaSkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVySG9kbm90YVVjUmUgPSBbMTBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZmlsdGVyUmV6ZXJ2YWNuaSkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVySG9kbm90YVVjUmUgPSBbNjBdXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmaWx0ZXJQcmVjZW5lbmkgJiYgZmlsdGVyUG9rQmV6bmUpIHsgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZmlsdGVySG9kbm90YUt0Z1VwbyA9IFszMDAsIDMzMCwgNDAwLCA0MzAsIDMyMCwgNDIwXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChmaWx0ZXJQcmVjZW5lbmkpIHsgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZmlsdGVySG9kbm90YUt0Z1VwbyA9IFsgMzIwLCA0MjBdO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlclBva0Jlem5lKSB7ICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZpbHRlckhvZG5vdGFLdGdVcG8gPSBbMzAwLCAzMzAsIDQwMCwgNDMwXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZmlsdGVySG9kbm90YVBvbG96a2EgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmaWx0ZXJQb2xvemthKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5wb2tsYWRuaVBvbG96a2EucmFkZWtfdXBvKVxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlckhvZG5vdGFQb2xvemthLnB1c2godGhhdC5wb2tsYWRuaVBvbG96a2EucmFkZWtfdXBvKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LnBva2xhZG5pUG9sb3prYS5yYWRla191cG9fcmV6KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlckhvZG5vdGFQb2xvemthLnB1c2godGhhdC5wb2tsYWRuaVBvbG96a2EucmFkZWtfdXBvX3Jleik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5wb2tsYWRuaVBvbG96a2EucmFkZWtfdXBvX3ByZWMpXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVySG9kbm90YVBvbG96a2EucHVzaCh0aGF0LnBva2xhZG5pUG9sb3prYS5yYWRla191cG9fcHJlYyk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy96YXTDrW0gdGFkeSBuYcSNw610w6Fuw60gcG9oeWLFr1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5GaW5Qb2h5Yi5saXN0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfdXByOiB0aGF0LnBva2xhZG5pRG9rbGFkLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBvX3R5cF91cG86IGZpbHRlckhvZG5vdGFVY1JlICAsICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwb19rdGdfdXBvOiBmaWx0ZXJIb2Rub3RhS3RnVXBvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cG9fcmFkZWtfdXBvOiBmaWx0ZXJIb2Rub3RhUG9sb3prYVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcG9oeWJEdG8gPSBkYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3ZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YS5kYXRhLCB7IGtleTogXCJpeHBfdXByXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhhdC5ncmlkUG9oeWJ5RnVjLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTsvL3RydWUgPSBwcmVrcmVzbGVuaSBncmlkdVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9uYWxlemVubyB2ZSBGVUMgamFrIGRvbmHEjcOtdGF0IHRleHR5IHNsb3VwY8WvXHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgZGF0YUZ1Y2NzdW86IERhdGEuUmVhZGVycy5GdWNjc3VvRHRvW107XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFFa29jc3RvOiBEYXRhLlJlYWRlcnMuRWtvY3N0b0R0b1tdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9taXNlczogSlF1ZXJ5UHJvbWlzZTxhbnk+W10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgcHJvbWlzZXMucHVzaChuZXcgR29yZGljLkRhdGEuUmVhZGVycy5GdWNjc3VvKCkuZ2V0RGF0YSgpLnRoZW4oKGRhdGFSZWFkZXIpID0+IHsgZGF0YUZ1Y2NzdW8gPSBkYXRhUmVhZGVyOyB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgR29yZGljLkRhdGEuUmVhZGVycy5Fa29jc3RvKCkuZ2V0RGF0YSgpLnRoZW4oKGRhdGFSZWFkZXIpID0+IHsgZGF0YUVrb2NzdG8gPSBkYXRhUmVhZGVyOyB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJC53aGVuLmFwcGx5KG51bGwsIHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaHliRHRvLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0YXYgcG9oeWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBzdW8gPSBkYXRhRnVjY3N1by5maW5kKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiAoZWxlbWVudC5zX3VwbyA9PT0gaXRlbS5zX3Vwbyk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoc3VvICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vIFRPRE86IGplxaF0xJsgcMWZZWTEm2xhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKGl0ZW0uZHJ1aF9wb2ggPT09IDEwKSBpdGVtLnNfdXBvX3R4dCA9IChzdW8uc191cG9fcmV6X3R4dCB8fCBcIlwiKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZWxzZSBpdGVtLnNfdXBvX3R4dCA9IChzdW8uc191cG9fdHh0IHx8IFwiXCIpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0YXYgc3Rvcm5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RvID0gZGF0YUVrb2NzdG8uZmluZChmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gKGVsZW1lbnQuc19zdG8gPT09IGl0ZW0uc19zdG8pOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdG8gIT09IHVuZGVmaW5lZCkgaXRlbS5zX3N0b190eHQgPSAoc3RvLnNfc3RvX3R4dCB8fCBcIlwiKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhwb2h5YkR0bywgeyBrZXk6IFwiaXhwX3VwclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZFBvaHlieUZ1Yy5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7Ly90cnVlID0gcHJla3Jlc2xlbmkgZ3JpZHV0XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIHpvYnJhekRhdGEoZGF0YTogR29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva3Nrb25EdG8sIGRhdGFaYWxvaGE6IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tza29uRHRvfG51bGwpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBmaW5hbER0bzogR1Bva1VuaXZlcnphbG5pRHRvW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZpbmFsRHRvLnB1c2goeyBjb2x1bW4xOiBcIlR5cCBrb250YWNlXCIsIGNvbHVtbjI6IGRhdGEudHlwX2tvbiB9KTtcclxuICAgICAgICAgICAgZmluYWxEdG8ucHVzaCh7IGNvbHVtbjE6IFwiS8OzZCBrb250YWNlXCIsIGNvbHVtbjI6IGRhdGEua29kIH0pO1xyXG4gICAgICAgICAgICBmaW5hbER0by5wdXNoKHsgY29sdW1uMTogXCJOw6F6ZXYga29udGFjZVwiLCBjb2x1bW4yOiBkYXRhLm5hemV2IH0pO1xyXG4gICAgICAgICAgICBmaW5hbER0by5wdXNoKHsgY29sdW1uMTogXCJQSUQga29udGFjZVwiLCBjb2x1bW4yOiBkYXRhLml4c19rb24gfSk7XHJcbiAgICAgICAgICAgIGZpbmFsRHRvLnB1c2goeyBjb2x1bW4xOiBcIlR5cCDDusSNZXRuw61obyBwxZnDrXBhZHVcIiwgY29sdW1uMjogdGhhdC50eXBVY1ByaXBhZHVUeHQgfSk7XHJcbiAgICAgICAgICAgIGZpbmFsRHRvLnB1c2goeyBjb2x1bW4xOiBcIkthdGVnb3JpZSB1xI0uIHBvaHlidVwiLCBjb2x1bW4yOiB0aGF0Lmt0Z1VjUHJpcGFkdVR4dCB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vaW5mb3JtYWNlIG8gWlBaXHJcbiAgICAgICAgICAgIGxldCBkZXRhaWxIbGF2aWNrYVpwelZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGF0LmRldGFpbEhsYXZpY2thWnB6KTtcclxuICAgICAgICAgICAgZGV0YWlsSGxhdmlja2FacHpWaWV3LmdldERhdGFSb3dzKCkuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgICAgICBmaW5hbER0by5wdXNoKHsgY29sdW1uMTogcm93W1wibmF6ZXZcIl0sIGNvbHVtbjI6IHJvd1tcImhvZG5vdGFcIl0gfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy96w6Fsb2hvdsOhIGtvbnRhY2VcclxuICAgICAgICAgICAgZmluYWxEdG8ucHVzaCh7IGNvbHVtbjE6IFwiVHlwIHrDoWxvaG92w6kga29udGFjZVwiLCBjb2x1bW4yOiBkYXRhWmFsb2hhID8gZGF0YVphbG9oYS50eXBfa29uIDogXCJcIiB9KTtcclxuICAgICAgICAgICAgZmluYWxEdG8ucHVzaCh7IGNvbHVtbjE6IFwiS8OzZCB6w6Fsb2hvdsOpIGtvbnRhY2VcIiwgY29sdW1uMjogZGF0YVphbG9oYSA/IGRhdGFaYWxvaGEua29kIDogXCJcIiB9KTtcclxuICAgICAgICAgICAgZmluYWxEdG8ucHVzaCh7IGNvbHVtbjE6IFwiTsOhemV2IHrDoWxvaG92w6kga29udGFjZVwiLCBjb2x1bW4yOiBkYXRhWmFsb2hhID8gZGF0YVphbG9oYS5uYXpldiA6IFwiXCIgfSk7XHJcbiAgICAgICAgICAgIGZpbmFsRHRvLnB1c2goeyBjb2x1bW4xOiBcIlBJRCB6w6Fsb2hvdsOpIGtvbnRhY2VcIiwgY29sdW1uMjogZGF0YS5peHNfa29uX3phbCB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBmaW5hbER0by5wdXNoKHsgY29sdW1uMTogXCJQb3Zpbm5vc3QgcMOhci4gc3ltYm9sdVwiLCBjb2x1bW4yOiBkYXRhLnBvdl92c190eHQgfSk7XHJcbiAgICAgICAgICAgIGZpbmFsRHRvLnB1c2goeyBjb2x1bW4xOiBcIlR5cCBwb2hsZWTDoXZreSBERFBcIiwgY29sdW1uMjogZGF0YS50eXBfcGhsICsgXCIgLSBcIiArIGRhdGEudHlwX3BobF90eHQgfSk7XHJcblxyXG4gICAgICAgICAgICAvL0RQSFxyXG4gICAgICAgICAgICBsZXQgcG92b2xlbmVEcGhUeHQ6IHN0cmluZztcclxuICAgICAgICAgICAgcG92b2xlbmVEcGhUeHQgPSBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgaSA9IDA7XHJcblxyXG4gICAgICAgICAgICBsZXQgZmlsdGVyVmxhc3Rub3N0aURhbmVEdG8gPSBkYXRhLlZsYXN0bm9zdGkhLmZpbHRlcigoemF6bmFtOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rdnZraER0bykgPT4gemF6bmFtLnZsayA9PSA2MDAgJiYgemF6bmFtLmFrdGl2aXRhID09IDEwMCk7XHJcblxyXG4gICAgICAgICAgICBmaWx0ZXJWbGFzdG5vc3RpRGFuZUR0by5mb3JFYWNoKGZ1bmN0aW9uIChyb3c6IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2t2dmtoRHRvKSB7XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICBwb3ZvbGVuZURwaFR4dCA9IHBvdm9sZW5lRHBoVHh0ICsgcm93LmhvZG5vdGFfdHh0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJWbGFzdG5vc3RpRGFuZUR0by5sZW5ndGggPT0gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbmFsRHRvLnB1c2goeyBjb2x1bW4xOiBcIlBvdm9sZW7DqSBEUEhcIiwgY29sdW1uMjogcG92b2xlbmVEcGhUeHQgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvdm9sZW5lRHBoVHh0ID0gcG92b2xlbmVEcGhUeHQgKyBcIixcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgZmluYWxEdG8ucHVzaCh7IGNvbHVtbjE6IFwiUG9ka2F0ZWdvcmllIGRva3VtZW50dVwiLCBjb2x1bW4yOiBkYXRhLml4c190eXBfdHh0IH0pOyAvL2l4c190eXBcclxuICAgICAgICAgICAgZmluYWxEdG8ucHVzaCh7IGNvbHVtbjE6IFwiTcSbcm7DoSBqZWRub3RrYVwiLCBjb2x1bW4yOiBkYXRhLm1qIH0pO1xyXG4gICAgICAgICAgICBmaW5hbER0by5wdXNoKHsgY29sdW1uMTogXCJDZW5hIHphIE1KXCIsIGNvbHVtbjI6IGRhdGEuY21qPy50b1N0cmluZygpIH0pO1xyXG4gICAgICAgICAgICBsZXQgcHJpem5ha1R6aFRleHQ7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5wcml6X3R6aCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBwcml6bmFrVHpoVGV4dCA9IFwiYmV6IFRaSFwiOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTA6IHByaXpuYWtUemhUZXh0ID0gXCJwb3Zpbm7DqSBUWkhcIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIwOiBwcml6bmFrVHpoVGV4dCA9IFwibmVwb3Zpbm7DqSBUWkhcIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBwcml6bmFrVHpoVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmluYWxEdG8ucHVzaCh7IGNvbHVtbjE6IFwiVFpIXCIsIGNvbHVtbjI6IHByaXpuYWtUemhUZXh0IH0pO1xyXG4gICAgICAgICAgICBmaW5hbER0by5wdXNoKHsgY29sdW1uMTogXCJUeXAgVFpIXCIsIGNvbHVtbjI6IGRhdGEudHpoX3R5cF90eHQgfSk7XHJcblxyXG4gICAgICAgICAgICAvL1ZsYXN0bm9zdGkga29udGFjw61cclxuICAgICAgICAgICAgbGV0IGhvdG92ZVZsYXN0bm9zdGk6IG51bWJlcltdO1xyXG4gICAgICAgICAgICBob3RvdmVWbGFzdG5vc3RpID0gW107XHJcblxyXG4gICAgICAgICAgICBkYXRhLlZsYXN0bm9zdGkhLmZvckVhY2goZnVuY3Rpb24gKHJvdzogR29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva3Z2a2hEdG8pIHtcclxuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJEdG9Qb2t2dmtoZHRvOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rdnZraER0b1tdO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyRHRvUG9rdnZraGR0byA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChob3RvdmVWbGFzdG5vc3RpLmluZGV4T2Yocm93LnZsayEpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyb3cuYWt0aXZpdGEgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyRHRvUG9rdnZraGR0byA9IGRhdGEuVmxhc3Rub3N0aSEuZmlsdGVyKCh6YXpuYW06IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2t2dmtoRHRvKSA9PiB6YXpuYW0udmxrID09IHJvdy52bGspO1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdG92ZVZsYXN0bm9zdGkucHVzaChyb3cudmxrISk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZ5c2xlZG55VHh0OiBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICB2eXNsZWRueVR4dCA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgZmlsdGVyRHRvUG9rdnZraGR0by5mb3JFYWNoKGZ1bmN0aW9uIChyb3c6IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2t2dmtoRHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuYWt0aXZpdGEgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ5c2xlZG55VHh0ID0gdnlzbGVkbnlUeHQgKyByb3cuaG9kbm90YV90eHQ7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlckR0b1Bva3Z2a2hkdG8ubGVuZ3RoID09IHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsRHRvLnB1c2goeyBjb2x1bW4xOiByb3cudmxrX3R4dCwgY29sdW1uMjogdnlzbGVkbnlUeHQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2eXNsZWRueVR4dCA9IHZ5c2xlZG55VHh0ICsgXCIsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LnBva1BhcmFtcy5Qb2tSYWRQc1Bvdm9sKSB7XHJcbiAgICAgICAgICAgICAgICBmaW5hbER0by5wdXNoKHsgY29sdW1uMTogXCJQcm9kZWpuw60gbWF0ZXJpw6FsXCIsIGNvbHVtbjI6IHRoYXQucHJvZGVqbmlNYXRlcmlhbCB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhmaW5hbER0bywgeyBrZXk6IFwiaXhwXCIgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZERldGFpbFByZWRrb250YWNlLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTsvL3RydWUgPSBwcmVrcmVzbGVuaSBncmlkdVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdFByZWRrb250YWNlKCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R1Bva1VuaXZlcnphbG5pRHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R1Bva1VuaXZlcnphbG5pRHRvPigpO1xyXG5cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJjb2x1bW4xXCIsIGNhcHRpb246IFwiUGFyYW1ldHIgcMWZZWtvbnRhY2VcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJjb2x1bW4yXCIsIGNhcHRpb246IFwiSG9kbm90YVwiIH0pOyBcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdEZ1YygpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdQb2tVbml2ZXJ6YWxuaUR0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdQb2tVbml2ZXJ6YWxuaUR0bz4oKTtcclxuICAgICAgICAgICAgbGV0IGt1bXVsOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWt1bXVsKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4c196cHpcIiwgY2FwdGlvbjogXCJJZGV0aWZpa8OhdG9yXCIsIHdpZHRoOiA5MCB9KTtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHsgbmFtZTogXCJyYWRla1wiLCBjYXB0aW9uOiBcIiNcIiwgd2lkdGg6IDIwIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjExOFwiLCAgIC8vZG90w6Fobm91dCBuw6F6ZXYgICBHSHBsQ29tbW9uLlVzZXJQcm9jZXNzLkNvbmZpZ3VyYXRpb24uR2V0RGF0YWJhc2VTaG9ydGN1dChcIm5rc1wiKSAgICAvL1JDIDMxMzAyMTE4IDogTktTICBcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA0NVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRTb3J0ZWRFa29DZnVTZXQodGhpcywgdHJ1ZSlcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJwb3Bpc190XCIsIGNhcHRpb246IFwiUG9waXNcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJjMFwiLCBjYXB0aW9uOiBcIk1EXCIsIHdpZHRoOiA2MCB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJjMVwiLCBjYXB0aW9uOiBcIkRBTFwiLCB3aWR0aDogNjAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wb2tQYXJhbXMuUHJpeklpc3NwICE9IDApIHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaWRfaHJkX3Jpc1wiLCBjYXB0aW9uOiBcIklEIFJJU1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oe25hbWU6IFwicmFkZWtfaGRyXCIsIGNhcHRpb246IFwixZguIFJJU1wifSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdFBvaygpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdQb2tVbml2ZXJ6YWxuaUR0bz4ge1xyXG4gICAgICAgIC8vICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R1Bva1VuaXZlcnphbG5pRHRvPigpO1xyXG5cclxuICAgICAgICAvLyAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImNvbHVtbjFcIiwgY2FwdGlvbjogXCJUZXN0XCIgfSk7XHJcbiAgICAgICAgLy8gICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJjb2x1bW4yXCIsIGNhcHRpb246IFwidGVzdFwiIH0pO1xyXG5cclxuICAgICAgICAvLyAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuXHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdFBvaHlieSgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHsgbmFtZTogXCJyYWRla191cG9cIiwgY2FwdGlvbjogXCLFmMOhZGVrIHBvaHlidVwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInNfdXBvX3R4dFwiLCBjYXB0aW9uOiBcIlN0YXYgcG9oeWJ1XCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHsgbmFtZTogXCJzX3Vwb1wiLCBjYXB0aW9uOiBcIlN0YXYgcG9oeWJ1XCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwidHlwX3Vwb190eHRcIiwgY2FwdGlvbjogXCJUeXBcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInR5cF91cG9cIiwgY2FwdGlvbjogXCJUeXBcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJrdGdfdXBvX3R4dFwiLCBjYXB0aW9uOiBcIkthdGVnb3JpZVwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInNfc3RvX3R4dFwiLCBjYXB0aW9uOiBcIlN0YXYgc3Rvcm5hXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfdXBvXCIsIGNhcHRpb246IFwixIzDoXN0a2FcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGREYXRlQ29sdW1uKHsgbmFtZTogXCJkYXRfdXBvXCIsIGNhcHRpb246IFwiRGF0dW0gVVBQXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwicG9waXNfdXBvXCIsIGNhcHRpb246IFwiUG9waXNcIiB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuIl19
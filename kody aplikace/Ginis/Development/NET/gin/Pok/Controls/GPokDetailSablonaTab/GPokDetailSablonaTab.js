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
            let GPokDetailSablonaTab = class GPokDetailSablonaTab extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.setValueCastkaRunning = false;
                    this.ekocdapReader = new Gordic.Data.Readers.Ekocdap();
                }
                onContentReady() {
                    var that = this;
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    if (this.ixsPit) { //detailŠablony
                        that.beginOperation("Načtení detailu pokladní šablony");
                        Gordic.Isl.PokSablona.read({
                            ixs_pit: that.ixsPit,
                            fragments: ["POKSPIT", "POKSPIT_TXT", "pokdpetDto", "pokdpetDto.POKDPET", "pokdpetDto", "*"]
                        })
                            .getData()
                            .done(function (dto) {
                            that.model = dto;
                            const ixsTypArray = that.sslstyp.filter(item => item.ktg_typ == that.model.ktg_typ);
                            if (ixsTypArray.length == 1) {
                                that.model.ixs_typ = ixsTypArray[0].ixs_typ;
                            }
                            else {
                                console.log("Existuje více nebo žádná kategorie dokladu stejné hodnoty!");
                                that.model.ixs_typ = ixsTypArray[0].ixs_typ;
                            }
                            if (that.model.ixs_esu == "0000SE00000M")
                                that.model.ixs_esu = null;
                            that.model.ico = that.gpc.ico; //kvůli políčku NKS
                            tab.findFields().gfield("model", "apply", that.model, { initialValues: true });
                            that.endOperation();
                            if (that.pokParams.PokRadPoedsa == 300) { //pouze vlastní
                                that.findForms().findFields("vlastni").gcheck("setValue", true);
                            }
                            else {
                                that.findForms().findFields("vlastni").gcheck("setValue", that.model.ixs_fun == that.ixsFun);
                                that.findForms().findFields("vlastni").gcheck("enable");
                            }
                            that.grid.ggrid("setData", that.model.pokdpetDto.filter(x => x.aktivita == 100));
                            that.zmenDaneGridFormat(that.model.druh_dok == 10);
                            if (that.model.pokdpetDto?.length > 0) {
                                that.maxRadek = Math.max(...that.model.pokdpetDto.map(t => t.radek));
                            }
                            else {
                                that.maxRadek = 0;
                            }
                        });
                    }
                    else {
                        let prazdnyData = {};
                        that.maxRadek = 0;
                        prazdnyData.nks = that.nks;
                        prazdnyData.ico = that.gpc.ico; //kvůli políčku NKS
                        prazdnyData.druh_dok = 10 /* Hpl.Interface.DruhDokladu.nedanovy */;
                        prazdnyData.ktg_typ = 1500;
                        prazdnyData.ktg_dok = 0;
                        prazdnyData.zpus_platby = that.pokParams.PokDokZpuspla == 30 ? 10 : 0;
                        prazdnyData.ixs_fun = that.ixsFun;
                        prazdnyData.ixp_den = that.ixpDen;
                        const ixsTypArray = that.sslstyp.filter(item => item.ktg_typ == prazdnyData.ktg_typ);
                        if (ixsTypArray.length == 1) {
                            prazdnyData.ixs_typ = ixsTypArray[0].ixs_typ;
                        }
                        else {
                            console.log("Existuje více nebo žádná kategorie dokladu stejné hodnoty!");
                            prazdnyData.ixs_typ = ixsTypArray[0].ixs_typ;
                        }
                        that.model = prazdnyData;
                    }
                    var headerForm = new Gordic.Forms.Form({ name: "pokSablonaDetail" })
                        .addSection("Hlavička pokladní šablony")
                        .addRow("Identifikátor")
                        .addField("gstringbox", { name: "ixs_pit", disabled: true })
                        .addRow("Název šablony", true)
                        .addField("gstringbox", { name: "nazev_sablony", validators: [new Gordic.Validators.Required()] })
                        .addField("gcheck", { name: "vlastni", label: "Uložit jako vlastní", disabled: that.pokParams.PokRadPoedsa == 300, initialValue: true });
                    headerForm.addSection("Hlavička pokladního dokladu")
                        .addRow("jres:31302118") //RC 31302118 : NKS
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosnks(), {
                        name: "nks",
                        model: "model.nks=value.nks,model.ico=value.ico",
                        dropdown: false,
                        serverFilters: { ico: that.gpc.ico },
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addRow("jres:31302029") //RC 31302029 : Druh dokladu 
                        .addField("gselectbox", Gordic.Prefabs.Select.pokcdru(), {
                        validators: [new Gordic.Validators.Required()],
                        name: "druh_dok",
                        model: "druh_dok=druh_dok",
                        dropdown: true,
                        change: function (ev, changeObj) {
                            if (changeObj.value.druh_dok === 10) // nedaňový
                             {
                                that.zmenDaneGridFormat(true);
                            }
                            else {
                                that.zmenDaneGridFormat(false);
                            }
                        }
                    })
                        .addRow("jres:31302006") //RC 31302006 : Typ dokladu
                        .addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), {
                        name: "ktg_typ",
                        model: "model.ktg_typ=value.ktg_typ,model.ixs_typ=value.ixs_typ", //;ktg_typ_txt=ktg_typ_txt 
                        serverFilters: { ktg_typ: [1500, 1510] },
                        dropdown: false,
                    })
                        .addRow("jres:31302028") //RC 31302028 : Kategorie dokladu
                        .addField("gselectbox", Gordic.Prefabs.Select.pokcktg(), {
                        validators: [new Gordic.Validators.Required()],
                        name: "ktg_dok",
                        model: "ktg_dok=ktg_dok", //;ktg_dok_txt=ktg_dok_txt
                        dropdown: true,
                        serverFilters: {
                            ktg_dok: function () {
                                return that.findFields("ktg_typ").gfield("getValue").ktg_typ === 1510 ? [0, 100, 200] : [0, 200];
                            }
                        }
                    })
                        .addRow("jres:31302121") //RC 31302121 : Způsob úhrady
                        .addField("gselectbox", Gordic.Prefabs.Select.pokczpp(), {
                        validators: [new Gordic.Validators.Required()],
                        name: "zpus_platby",
                        model: "zpus_platby=zpus_platby",
                        dropdown: true,
                        graphicInput: "exclusive",
                        disabled: (that.pokParams.PokDokZpuspla == -1 || that.pokParams.PokDokZpuspla == 30),
                        serverFilters: {
                            zpus_platby: function () {
                                let filter;
                                if (that.pokParams.PokDokZpuspla == -1)
                                    return 0;
                                if (that.pokParams.PokDokZpuspla == 30)
                                    return 10;
                            }
                        },
                        itemTemplate: (value) => {
                            const icon = value?.zpus_platby === 0 ? "gi-bankovka" : "fa-credit-card";
                            return value ? "{0} <span>{1}</span>".format(new Gordic.Utils.IconBuilder().createIcon(icon), value.zpus_platby_txt ?? " ") : "";
                        },
                        //change: function (ev, changeObj) { that.Editovano = true }
                    })
                        .addRow({ label: "jres:31302117", hint: "Okno pro výběr smlouvy..." }) //RC 31302117 : Smlouva/objednávka    
                        .addField("gselectbox", Gordic.Prefabs.Select.ekoVyberSmlouvy({
                        inputDto: { rokSml: that.gpc.rok, rokPol: Number(that.gpc.rok) },
                        esuLogovani: {
                            Ixp: "0000X0000003",
                            AktZnacka: "0000X0000003",
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani,
                            DuvodHledaniTxt: "Výběr Smlouvy\Objednávky na detailu pokladní šablony"
                        },
                        init: function (inputDto, filter) {
                            var values = {};
                            ////priprava enumu
                            var pripady = Gordic.Eko.GVyberSmlouvy.PripadyEnum;
                            filter.smluvni_pripady = [pripady.SeSchvalenouPolozkou, pripady.SVyhovujiciPolozkou];
                            let kompetent = that.findFields("ixs_fun_vyriz").gfield("getValue");
                            if (kompetent != null) {
                                filter.cis_real = kompetent.cis_real;
                                inputDto.ixs_fun_vyriz = kompetent.ixs_fun;
                            }
                            let ixs_esu = that.findFields("ixs_esu").gfield("getValue");
                            if (ixs_esu != null) {
                                filter.ixs_esu = ixs_esu.ixs_esu;
                            }
                        },
                        related: that
                    }), {
                        name: "ps_sml",
                        model: "model.ps_sml=value.ixp_sml_pri",
                        // buttons: [{ action: akce.actSmlEsu }],
                        change: function (ev, ctx) {
                        }
                    })
                        .addRow("Externí subjekt")
                        .addField("gselectbox", {
                        name: "ixs_esu",
                        model: "ixs_esu=ixs_esu"
                    }, Gordic.Esu.Prefabs.vyberEsu({
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu, // přidání prefabu   
                        Logovani: {
                            Ixp: "0000X0000003",
                            AktZnacka: "0000X0000003",
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani,
                            DuvodHledaniTxt: "Výběr externího subjektu na detailu pokladní šablony"
                        },
                    })).addSection({ name: "sekcePolozky" });
                    that.actions.addRange({
                        actUlozit: {
                            caption: "jres:31302277", //RC 31302277 : Uložit
                            icon: "gi-save",
                            run: function (ev, ctx) {
                                that.ulozitDetail();
                            }
                        },
                        actPolozkaPridat: {
                            caption: "Přidat",
                            icon: "gi-plus",
                            run: function (ev, ctx) {
                                let nks = that.findFields("nks").gfield("getValue");
                                let row;
                                that.maxRadek = that.maxRadek + 1;
                                row = { radek: that.maxRadek, c_dan: parseDecimal(0), nks: nks.nks, dan_typ: 0, c_zak: parseDecimal(0), c_dan_m: parseDecimal(0), c_zak_m: parseDecimal(0), c_celkem_m: parseDecimal(0), c_celkem: parseDecimal(0), kurz: parseDecimal(1), ico: that.gpc.ico, aktivita: 100 };
                                //jen když je daňový
                                let druhDokladu = that.element.findFields("druh_dok").gfield("getValue").druh_dok; //0 - danový / 10 - nedanovy / 20 - zj. danovy
                                if (druhDokladu != 10) {
                                    const kat = that.ekocdat.find(function (element) { return element.dan_typ == row.dan_typ; });
                                    if (kat !== undefined)
                                        row.dan_typ_txt = kat.dan_typ_txt;
                                    row.dan_skup = 0;
                                    const kat2 = that.pokcdas.find(function (element) { return element.dan_skup == row.dan_skup; });
                                    if (kat2 !== undefined)
                                        row.dan_skup_txt = kat2.dan_skup_txt;
                                }
                                that.grid.ggrid("getView").updateData(row, "add");
                            }
                        },
                        actPolozkaSmazat: {
                            caption: "Smazat",
                            icon: "gi-save",
                            run: function (ev, ctx) {
                                let radek = that.grid.ggrid("getSelection")[0];
                                if (radek) {
                                    let view = that.grid.ggrid("getView").getDataRows(false);
                                    let indexRadek = view.indexOf(radek);
                                    radek.aktivita = 900;
                                    view[indexRadek] = radek;
                                    that.grid.ggrid("setData", view);
                                    that.grid.ggrid("activeRow", radek);
                                }
                            }
                        }
                    });
                    let tab = $("<div>").appendTo(this.element).gform("createFrom", headerForm);
                    if (that.model && that.model.ixs_pit == null) //nastavení prázdného DTO pro novou šablonu
                     {
                        tab.findFields().gfield("model", "apply", that.model);
                    }
                    let polozkyForm = $("<div>").appendTo(tab.findFormSections("sekcePolozky")).gtab({
                        title: "Pokladní položky",
                        opened: true,
                        locked: true,
                        visible: true,
                        menuBar: [
                            { action: that.actions.actPolozkaPridat, favorite: true },
                            { action: that.actions.actPolozkaSmazat, favorite: true },
                        ]
                    });
                    this.grid =
                        $("<div>")
                            .appendTo(tab.findFormSections("sekcePolozky"))
                            .gautofit()
                            .ggrid({
                            data: [],
                            renderMode: "auto",
                            columnMode: "fit",
                            navigationMode: "cell",
                            rowNumbers: false,
                            columns: this.createGridFormat()
                        }).ggridcelleditor();
                    this.menuBar([
                        { action: this.actions.actUlozit, favorite: true }
                    ]);
                    that.upravViditelnostSloupcuUcetniVety();
                }
                upravViditelnostSloupcuUcetniVety() {
                    const that = this;
                    let gridFormat = that.grid.ggrid("option", "columns");
                    if (gridFormat) {
                        let sloupecUea = gridFormat.get("uea");
                        if (sloupecUea)
                            sloupecUea.hidden = !that.pokParams.PokShowUea;
                        let sloupecUeb = gridFormat.get("ueb");
                        if (sloupecUeb)
                            sloupecUeb.hidden = !that.pokParams.PokShowUeb;
                        let sloupecUec = gridFormat.get("uec");
                        if (sloupecUec)
                            sloupecUec.hidden = !that.pokParams.PokShowUec;
                        let sloupecUed = gridFormat.get("ued");
                        if (sloupecUed)
                            sloupecUed.hidden = !that.pokParams.PokShowUed;
                        let sloupecUee = gridFormat.get("uee");
                        if (sloupecUee)
                            sloupecUee.hidden = !that.pokParams.PokShowUee;
                        let sloupecUef = gridFormat.get("uef");
                        if (sloupecUef)
                            sloupecUef.hidden = !that.pokParams.PokShowUef;
                        let sloupecUeg = gridFormat.get("ueg");
                        if (sloupecUeg)
                            sloupecUeg.hidden = !that.pokParams.PokShowUeg;
                        let sloupecUeh = gridFormat.get("ueh");
                        if (sloupecUeh)
                            sloupecUeh.hidden = !that.pokParams.PokShowUeh;
                        let sloupecUei = gridFormat.get("uei");
                        if (sloupecUei)
                            sloupecUei.hidden = !that.pokParams.PokShowUei;
                        let sloupecUej = gridFormat.get("uej");
                        if (sloupecUej)
                            sloupecUej.hidden = !that.pokParams.PokShowUej;
                        let sloupecUek = gridFormat.get("uek");
                        if (sloupecUek)
                            sloupecUek.hidden = !that.pokParams.PokShowUek;
                        let sloupecUel = gridFormat.get("uel");
                        if (sloupecUel)
                            sloupecUel.hidden = !that.pokParams.PokShowUel;
                        let sloupecUem = gridFormat.get("uem");
                        if (sloupecUem)
                            sloupecUem.hidden = !that.pokParams.PokShowUem;
                        let sloupecUen = gridFormat.get("uen");
                        if (sloupecUen)
                            sloupecUen.hidden = !that.pokParams.PokShowUen;
                        let sloupecTe0 = gridFormat.get("te0");
                        if (sloupecTe0)
                            sloupecTe0.hidden = !that.pokParams.PokShowTe0;
                        let sloupecTe1 = gridFormat.get("te1");
                        if (sloupecTe1)
                            sloupecTe1.hidden = !that.pokParams.PokShowTe1;
                        let sloupecTe2 = gridFormat.get("te2");
                        if (sloupecTe2)
                            sloupecTe2.hidden = !that.pokParams.PokShowTe2;
                        let sloupecTe3 = gridFormat.get("te3");
                        if (sloupecTe3)
                            sloupecTe3.hidden = !that.pokParams.PokShowTe3;
                        let sloupecTe4 = gridFormat.get("te4");
                        if (sloupecTe4)
                            sloupecTe4.hidden = !that.pokParams.PokShowTe4;
                        let sloupecTe5 = gridFormat.get("te5");
                        if (sloupecTe5)
                            sloupecTe5.hidden = !that.pokParams.PokShowTe5;
                        let sloupecTe6 = gridFormat.get("te6");
                        if (sloupecTe6)
                            sloupecTe6.hidden = !that.pokParams.PokShowTe6;
                        let sloupecTe7 = gridFormat.get("te7");
                        if (sloupecTe7)
                            sloupecTe7.hidden = !that.pokParams.PokShowTe7;
                        let sloupecTe8 = gridFormat.get("te8");
                        if (sloupecTe8)
                            sloupecTe8.hidden = !that.pokParams.PokShowTe8;
                        let sloupecTe9 = gridFormat.get("te9");
                        if (sloupecTe9)
                            sloupecTe9.hidden = !that.pokParams.PokShowTe9;
                    }
                }
                uloz(params) {
                    const that = this;
                    that.beginOperation("Ukládání...");
                    if (params.ixs_pit != null) {
                        that.isl.PokSablona.update(rq => {
                            return { data: params };
                        })
                            .get()
                            .done(function (data) {
                            Gordic.Pok.WebClient.GPokFlash.showFlashSuccess(that, "Šablona byla uložena pod názvem " + data.data.nazev_sablony);
                            that.actions.actUlozit.setPending(100);
                            that.findForms().findFields().gfield("model", "apply", data.data);
                            that.grid.ggrid("setData", that.model.pokdpetDto.filter(x => x.aktivita == 100));
                        })
                            .fail(function (xhr, type, vobj) {
                            if (type === "exception") {
                                if (vobj.baseType === "Gordic.General.GHplValidationException" || vobj.exceptionType === "Gordic.General.GHplValidationException") {
                                    vobj.handled = true;
                                    Gordic.Pok.WebClient.GPokFlash.showFlashError(that, vobj.baseMessage);
                                }
                            }
                        })
                            .always(function () {
                            that.endOperation();
                        });
                    }
                    else {
                        that.isl.PokSablona.create(rq => {
                            return { data: params };
                        })
                            .get()
                            .done(function (data) {
                            Gordic.Pok.WebClient.GPokFlash.showFlashSuccess(that, "Šablona byla uložena pod názvem " + data.data.nazev_sablony);
                            that.actions.actUlozit.setPending(100);
                            that.findForms().findFields().gfield("model", "apply", data.data);
                            that.grid.ggrid("setData", that.model.pokdpetDto.filter(x => x.aktivita == 100));
                        })
                            .fail(function (xhr, type, vobj) {
                            if (type === "exception") {
                                if (vobj.baseType === "Gordic.General.GHplValidationException" || vobj.exceptionType === "Gordic.General.GHplValidationException") {
                                    vobj.handled = true;
                                    Gordic.Pok.WebClient.GPokFlash.showFlashError(that, vobj.baseMessage);
                                }
                            }
                        })
                            .always(function () {
                            that.endOperation();
                        });
                    }
                }
                ulozitDetail() {
                    const that = this;
                    if (!this.findForms().gform("isValid"))
                        return;
                    let fields = this.findFields();
                    fields.gfield("model", "collect", this.model);
                    let vlastni = that.findForms().findFields("vlastni").gcheck("getValue");
                    if (!vlastni)
                        that.model.ixs_fun = "";
                    let view = that.grid.ggrid("getView").getDataRows(false);
                    that.model.pokdpetDto = view;
                    that.uloz(that.model);
                }
                dotazCDanM() {
                    var def = $.Deferred();
                    this.dialogs.messageBox("jres:31302301", "Výběr upravované částky v položce, vyberte částku k úpravě:", [{ text: "Základ", id: "zaklad" }, { text: "Celkem", id: "celkem" }], undefined, 400, 200)
                        .on("close", function (ev, retVal) {
                        if (retVal === "zaklad") {
                            def.resolve("Z");
                        }
                        if (retVal === "celkem") {
                            def.resolve("C");
                        }
                    });
                    return def.promise();
                }
                zaokrouhliNaDve(cislo) {
                    return cislo.toDP(2, 4);
                }
                dopoctiCastky(radek) {
                    var that = this;
                    var def = $.Deferred();
                    that.provedVypocet(radek)
                        .done(function (s) {
                        def.resolve(s);
                    });
                    return def.promise();
                }
                danZeZakladu(zaklad, procento) {
                    ;
                    let returnValue = Gordic.Gin.WebClient.Utils.calculateDPH(parseDecimal(zaklad), parseDecimal(procento), true);
                    let novyVypocet = returnValue.tax;
                    return parseDecimal(novyVypocet);
                }
                danZCelku(celkem, procento) {
                    let returnValue = Gordic.Gin.WebClient.Utils.calculateDPH(parseDecimal(celkem), parseDecimal(procento), false);
                    let novyVypocet = returnValue.tax;
                    return parseDecimal(novyVypocet);
                }
                getProcentoDane(danTyp) {
                    var rokDph = new Date().getFullYear();
                    var mesicDph = new Date().getMonth();
                    //var rokDph = that.findFields("rok_dph").gfield("getValue");
                    //var mesicDph = that.findFields("mesic_dph").gfield("getValue");
                    var hodnota = Decimal.add(Decimal.mul(rokDph, 100).d[0], mesicDph).d[0];
                    return this.ekocdapReader.getData({ dan_typ: danTyp, rokmes_od: "<= " + hodnota, rokmes_do: ">= " + hodnota }).then((tax) => { return tax.length === 1 ? parseDecimal(tax[0].dan_proc ?? 0) : new Decimal(0); });
                }
                provedVypocet(radek) {
                    var that = this;
                    var procento;
                    if (radek.dan_typ === 0) //bez dph
                     {
                        procento = $.Deferred().resolve(new Decimal(0)).promise();
                    }
                    else {
                        procento = (radek.dan_skup === 10) ? // osvobozeno
                            $.Deferred().resolve(new Decimal(0)).promise() :
                            that.getProcentoDane(radek.dan_typ); // dodělat načítání sazeb DPH
                    }
                    return procento.then((dan_proc) => {
                        radek.dan_proc = dan_proc;
                        if (radek.vklad_castka === "Z") {
                            if (radek.c_zak == null) {
                                radek.c_dan = new Decimal(0);
                                radek.c_celkem = new Decimal(0);
                            }
                            else {
                                radek.c_dan = this.danZeZakladu(radek.c_zak, radek.dan_proc);
                                radek.c_celkem = Decimal.add(radek.c_zak, radek.c_dan);
                            }
                            if (radek.c_zak_m == null) {
                                radek.c_dan_m = new Decimal(0);
                                radek.c_celkem_m = new Decimal(0);
                            }
                            else {
                                radek.c_dan_m = this.danZeZakladu(radek.c_zak_m, radek.dan_proc);
                                radek.c_celkem_m = Decimal.add(radek.c_zak_m, radek.c_dan_m);
                            }
                        }
                        else if (radek.vklad_castka === "C") {
                            if (radek.c_celkem == null) {
                                radek.c_dan = new Decimal(0);
                                radek.c_zak = new Decimal(0);
                            }
                            else {
                                radek.c_dan = this.danZCelku(radek.c_celkem, radek.dan_proc);
                                radek.c_zak = new Decimal(radek.c_celkem).minus(radek.c_dan);
                            }
                            if (radek.c_celkem_m == null) {
                                radek.c_dan_m = new Decimal(0);
                                radek.c_zak_m = new Decimal(0);
                            }
                            else {
                                radek.c_dan_m = this.danZCelku(radek.c_celkem_m, radek.dan_proc);
                                radek.c_zak_m = new Decimal(radek.c_celkem_m).minus(radek.c_dan_m);
                            }
                        }
                        return radek;
                    });
                }
                prepoctiCastky(zdroj, row) {
                    var def = $.Deferred();
                    var that = this;
                    let druhDokladu = this.element.findFields("druh_dok").gfield("getValue").druh_dok; //0 - danový / 10 - nedanovy / 20 - zj. danovy
                    //aktuální řádek s kterým parcuji
                    let radek = row;
                    //mul - násobení
                    //sub - minus
                    //div - dělení
                    switch (zdroj) {
                        case "c_dan_m":
                            that.dotazCDanM()
                                .done(function (f) {
                                radek.vklad_castka = f;
                                radek.c_dan_m = radek.c_dan_m == null ? new Decimal(0) : radek.c_dan_m;
                                radek.c_dan = that.zaokrouhliNaDve(Decimal.mul(radek.kurz, radek.c_dan_m)); // zaorkouhli na 2
                                if (radek.vklad_castka === "Z") {
                                    radek.c_zak_m = Decimal.sub(radek.c_celkem_m, radek.c_dan_m);
                                    radek.c_zak = Decimal.sub(radek.c_celkem, radek.c_dan);
                                }
                                else if (radek.vklad_castka === "C") {
                                    radek.c_celkem_m = Decimal.add(radek.c_zak_m, radek.c_dan_m);
                                    radek.c_celkem = Decimal.add(radek.c_zak, radek.c_dan);
                                }
                                //that.doplnCastkyCelkem();
                                def.resolve(radek);
                            });
                            break;
                        case "c_celkem":
                            radek.c_celkem = radek.c_celkem == null ? new Decimal(0) : radek.c_celkem;
                            radek.vklad_castka = "C";
                            radek.c_celkem_m = that.zaokrouhliNaDve(Decimal.div(radek.c_celkem, radek.kurz)); // zaokrouhli na 2                  
                            break;
                        case "c_celkem_m":
                            radek.c_celkem_m = radek.c_celkem_m == null ? new Decimal(0) : radek.c_celkem_m;
                            radek.vklad_castka = "C";
                            radek.c_celkem = that.zaokrouhliNaDve(Decimal.mul(radek.c_celkem_m, radek.kurz)); // zaokrouhli na 2                  
                            break;
                        case "c_zak":
                            radek.c_zak = radek.c_zak == null ? new Decimal(0) : radek.c_zak;
                            radek.vklad_castka = "Z";
                            radek.c_zak_m = that.zaokrouhliNaDve(Decimal.div(radek.c_zak, radek.kurz)); // zaokrouhli na 2
                            break;
                        case "c_zak_m":
                            radek.c_zak_m = radek.c_zak_m == null ? new Decimal(0) : radek.c_zak_m;
                            radek.vklad_castka = "Z";
                            radek.c_zak = that.zaokrouhliNaDve(Decimal.mul(radek.c_zak_m, radek.kurz)); // zaokrouhli na 2
                            break;
                        case "dan_skup":
                            radek.dan_typ = (radek.dan_skup === 10) ? 0 : radek.dan_typ; // osvobozeno
                            var kat = that.ekocdat.find(function (element) { return element.dan_typ == radek.dan_typ; });
                            if (kat !== undefined)
                                radek.dan_typ_txt = kat.dan_typ_txt;
                            break;
                        case "dan_typ":
                            radek.dan_skup = (radek.dan_skup === 10 && radek.dan_typ !== 0) ? 0 : radek.dan_skup; //osvobozeno / bezDph
                            var kat2 = that.pokcdas.find(function (element) { return element.dan_skup == radek.dan_skup; });
                            if (kat2 !== undefined)
                                radek.dan_skup_txt = kat2.dan_skup_txt;
                            break;
                        case "kurz":
                            if (radek.vklad_castka === "Z") {
                                radek.c_zak = that.zaokrouhliNaDve(Decimal.mul(radek.kurz, radek.c_zak_m)); // zaokrouhli na 2
                            }
                            else if (radek.vklad_castka === "C") {
                                radek.c_celkem = that.zaokrouhliNaDve(Decimal.mul(radek.kurz, radek.c_celkem_m)); // zaokrouhli na 2
                            }
                            break;
                        case "m":
                        case "mjm":
                            if (radek.m != null && radek.mjm != null) {
                                if (new Decimal(radek.m).isZero() || new Decimal(radek.mjm).isZero()) {
                                }
                                else {
                                    radek.vklad_castka = that.pokParams.HplRadDokCje == 100 ? "C" : "Z";
                                    if (radek.vklad_castka === "Z") {
                                        radek.c_zak_m = that.zaokrouhliNaDve(Decimal.mul(radek.m, radek.mjm)); // zaokoruhli na 2
                                        radek.c_zak = that.zaokrouhliNaDve(Decimal.mul(radek.kurz, radek.c_zak_m)); // zaokrouhli na 2
                                        if (that.mena != 0) { //cizí měna
                                            if (!new Decimal(radek.mjm_czk).isZero()) // mám prodejní cenu z majetku
                                             {
                                                radek.c_zak = that.zaokrouhliNaDve(Decimal.mul(radek.m, radek.mjm_czk)); // zaokrouhli na 2
                                            }
                                        }
                                    }
                                    else if (radek.vklad_castka === "C") {
                                        radek.c_celkem_m = that.zaokrouhliNaDve(Decimal.mul(radek.m, radek.mjm)); // zaokrouhli na 2
                                        radek.c_celkem = that.zaokrouhliNaDve(Decimal.mul(radek.kurz, radek.c_celkem_m)); // zaokrouhli na 2
                                        if (that.mena != 0) { //cizí měna
                                            if (!new Decimal(radek.mjm_czk).isZero()) // mám prodejní cenu z majetku
                                             {
                                                radek.c_celkem = that.zaokrouhliNaDve(Decimal.mul(radek.m, radek.mjm_czk)); // zaokrouhli na 2
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        case "maj":
                            if (radek.m == null || radek.mjm == null) {
                                break;
                            }
                            radek.vklad_castka = that.pokParams.HplRadDokCje == 100 ? "C" : "Z";
                            if (radek.vklad_castka === "Z") {
                                radek.c_zak_m = that.zaokrouhliNaDve(Decimal.mul(radek.m, radek.mjm)); // zaokoruhli na 2
                                radek.c_zak = that.zaokrouhliNaDve(Decimal.mul(radek.kurz, radek.c_zak_m)); // zaokrouhli na 2
                                if (that.mena != 0) {
                                    radek.c_zak = that.zaokrouhliNaDve(Decimal.mul(radek.m, radek.mjm_czk)); // držím českou prodejní cenu
                                }
                            }
                            else if (radek.vklad_castka === "C") {
                                radek.c_celkem_m = that.zaokrouhliNaDve(Decimal.mul(radek.m, radek.mjm)); // zaokrouhli na 2
                                radek.c_celkem = that.zaokrouhliNaDve(Decimal.mul(radek.kurz, radek.c_celkem_m)); // zaokrouhli na 2
                                if (that.mena != 0) {
                                    radek.c_celkem = that.zaokrouhliNaDve(Decimal.mul(radek.m, radek.mjm_czk)); // držím českou prodejní cenu
                                }
                            }
                            radek.dan_skup = (radek.dan_skup === 10 && radek.dan_typ !== 0) ? 0 : radek.dan_skup; //osvobozeno / bezDph
                            var kat2 = that.pokcdas.find(function (element) { return element.dan_skup == radek.dan_skup; });
                            if (kat2 !== undefined)
                                radek.dan_skup_txt = kat2.dan_skup_txt;
                            radek.dan_typ = (radek.dan_skup === 10) ? 0 : radek.dan_typ; // osvobozeno
                            var kat = that.ekocdat.find(function (element) { return element.dan_typ == radek.dan_typ; });
                            if (kat !== undefined)
                                radek.dan_typ_txt = kat.dan_typ_txt;
                            break;
                    }
                    switch (zdroj) {
                        case "kurz":
                            that.dopoctiCastky(radek)
                                .done(function (r) {
                                //that.doplnCastkyCelkem();
                                return def.resolve(r);
                            });
                            break;
                        case "dan_typ":
                        case "dan_skup":
                        case "c_celkem":
                        case "c_celkem_m":
                        case "c_zak":
                        case "c_zak_m":
                        case "m":
                        case "mjm":
                        case "maj":
                            that.dopoctiCastky(radek)
                                .done(function (r) {
                                //that.doplnCastkyCelkem();
                                return def.resolve(r);
                            });
                            break;
                    }
                    return def.promise();
                }
                zmenDaneGridFormat(hidden) {
                    const that = this;
                    let zobrazCiziMena = this.mena != 0;
                    let gridFormat = that.grid.ggrid("option", "columns");
                    if (gridFormat) {
                        let sloupecCZakM = gridFormat.get("c_zak_m");
                        let sloupecCZak = gridFormat.get("c_zak");
                        let sloupecCDanM = gridFormat.get("c_dan_m");
                        let sloupecCDan = gridFormat.get("c_dan");
                        let sloupecProDan = gridFormat.get("dan_proc");
                        let sloupecDanTyp = gridFormat.get("dan_typ_txt");
                        let sloupecDanSkup = gridFormat.get("dan_skup_txt");
                        if (zobrazCiziMena) {
                            if (sloupecCZak)
                                sloupecCZak.hidden = hidden;
                            if (sloupecCDan)
                                sloupecCDan.hidden = hidden;
                        }
                        if (sloupecCZakM)
                            sloupecCZakM.hidden = hidden;
                        if (sloupecCDanM)
                            sloupecCDanM.hidden = hidden;
                        if (sloupecProDan)
                            sloupecProDan.hidden = hidden;
                        if (sloupecDanTyp)
                            sloupecDanTyp.hidden = hidden;
                        if (sloupecDanSkup)
                            sloupecDanSkup.hidden = hidden;
                        that.grid.ggrid("option", "columns", gridFormat);
                    }
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    const that = this;
                    const changeFunction = function (fieldName) {
                        return function () {
                            if (!that.setValueCastkaRunning) {
                                that.setValueCastkaRunning = true;
                                let radek = that.grid.ggrid("getSelection")[0];
                                that.prepoctiCastky(fieldName, radek)
                                    .done(function (f) {
                                    let view = that.grid.ggrid("getView").getDataRows(false);
                                    let indexRadek = view.indexOf(radek);
                                    view[indexRadek] = f;
                                    that.grid.ggrid("setData", view);
                                    that.grid.ggrid("activeRow", f);
                                    that.setValueCastkaRunning = false;
                                });
                            }
                        };
                    };
                    let zobrazDan = false;
                    if (that.model)
                        that.model.druh_dok !== 10;
                    let zobrazCiziMena = this.mena != 0;
                    gridFormat.
                        addIconColumn({
                        name: "stav_grid",
                        caption: "",
                        width: 30,
                        fixedWidth: true,
                        sortable: false,
                        description: "",
                        customClass: (ctx) => {
                            return "ui-disabled";
                        },
                        iconTemplate: function (row) {
                            switch (row.aktivita) {
                                case 900:
                                    return { icon: "gi-window-close", text: "", tooltip: "" };
                                default:
                                    return { icon: "gin/nic", text: "", tooltip: "" };
                            }
                        }
                    });
                    gridFormat.addNumberColumn({
                        name: "radek",
                        caption: "#",
                        sortable: false,
                        width: 20,
                        fixedWidth: true,
                        customClass: (ctx) => {
                            return "ui-disabled";
                        },
                    });
                    gridFormat.addTextColumn({
                        name: "kod_kon",
                        caption: "jres:31302135", //RC 31302135 : Kód předkontace
                        sortable: false,
                        width: 200,
                        editor: {
                            widget: "gselectbox",
                            options: [
                                {
                                    helperItemTemplate: function (value) {
                                        return value.kod_kon + " - " + value.nazev;
                                    },
                                    model: "model.ixs_kon=value.ixs_kon;model.kod_kon=value.kod_kon",
                                    name: "kod_kon",
                                    serverFilters: { ixs_vpk: that.ixsVpk, ktg_typ: new Gordic.Forms.Dependency("ktg_typ", (mw) => { return mw.ktg_typ; }, true, false, this.element) },
                                    validators: [new Gordic.Validators.Required()],
                                    selector: function (options) {
                                        var def = $.Deferred();
                                        //zatím funguje, ale časem nemusí
                                        let ParamsJSON = { ixsVpk: that.ixsVpk, ktgTyp: that.element.findFields("ktg_typ").gfield("getValue").ktg_typ, ixpDen: that.ixpDen, uid: "'GPokVyberKontaceTab#'" };
                                        that.dialogs.showModalWindow("Gordic.Pok.WebClient.GPokVyberKontaceTab", ParamsJSON, { width: 800, height: 800 })
                                            .on("close", function (ev, data) {
                                            if (data == undefined) {
                                                def.reject();
                                            }
                                            else {
                                                def.resolve(data);
                                            }
                                        });
                                        return def.promise();
                                    },
                                    change: function (ev, changeObj) {
                                        var text = changeObj.value.nazev;
                                        let radek = that.grid.ggrid("getSelection")[0];
                                        that.call("VyplnUcetniVetu", { ixsKon: changeObj.value.ixs_kon, ktgDok: that.element.findFields("ktg_typ").gfield("getValue").ktg_typ, zpusPlatby: that.element.findFields("zpus_platby").gfield("getValue").zpus_platby, radek: radek })
                                            .done(function (row) {
                                            //that.grid.ggrid<Gordic.Hpl.Interface.GPokdpetDto>("getView").updateData(row, "update");
                                            let view = that.grid.ggrid("getView").getDataRows(false);
                                            let indexRadek = view.indexOf(radek);
                                            view[indexRadek] = row;
                                            that.grid.ggrid("setData", view);
                                            that.grid.ggrid("activeRow", row);
                                        });
                                    }
                                }, Gordic.Prefabs.Select.pokskonLk()
                            ]
                        }
                    }).addTextColumn({
                        name: "pokskon_nazev",
                        caption: "jres:31302136", //RC 31302136 : Název
                        sortable: false,
                        customClass: "ui-disabled",
                        editor: {
                            widget: "gstringbox",
                            options: [{
                                    name: "pokskon_nazev",
                                    disabled: true,
                                    customClass: "ui-state-disabled"
                                }],
                        }
                    })
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:31302013", //RC 31302013 : Popis
                        sortable: false,
                        editor: {
                            widget: "gstringbox",
                            options: [{
                                    name: "nazev",
                                    change: function () {
                                    }
                                }]
                        }
                    });
                    gridFormat.addTextColumn({
                        name: "dan_skup_txt",
                        caption: "jres:31302137", //RC 31302137 : Daň. skupina
                        sortable: false,
                        editor: {
                            widget: "gselectbox",
                            options: [{
                                    name: "dan_skup_txt",
                                    change: changeFunction("dan_skup"),
                                    model: "dan_skup=dan_skup;dan_skup_txt=dan_skup_txt"
                                }, Gordic.Prefabs.Select.pokcdas()]
                        },
                        hidden: !zobrazDan
                    })
                        .addTextColumn({
                        name: "dan_typ_txt",
                        caption: "jres:31302138", //RC 31302138 : Typ daně
                        sortable: false,
                        editor: {
                            widget: "gselectbox",
                            options: [{
                                    name: "dan_typ_txt",
                                    serverFilters: { dan_typ: [0, 10, 20] }, //zatím natvrdo
                                    change: changeFunction("dan_typ"),
                                    model: "dan_typ=dan_typ;dan_typ_txt=dan_typ_txt"
                                }, Gordic.Prefabs.Select.ekocdat()]
                        },
                        hidden: !zobrazDan
                    })
                        //musím použít editovatelné pole, když je needitovatelné tak se tam nedoplňuje hodnota pomoci model apply
                        //když použiji disabled true tak vzhled políčka je jako editovatelné ale nic tam psát nejde
                        //pravděpodobně reader na ekocdap
                        .addNumberColumn({
                        name: "dan_proc",
                        caption: "jres:31302139", //RC 31302139 : %DPH
                        sortable: false,
                        customClass: "ui-disabled",
                        editor: {
                            widget: "gnumberbox",
                            options: [{
                                    name: "dan_proc",
                                    model: "model.dan_proc=value",
                                    disabled: true,
                                    customClass: "ui-disabled"
                                }, Gordic.Prefabs.Number.decimal()]
                        },
                        hidden: !zobrazDan
                    });
                    gridFormat.addTextColumn({
                        name: "nks",
                        caption: "jres:31302118", //dotáhnout název   GHplCommon.UserProcess.Configuration.GetDatabaseShortcut("nks")    //RC 31302118 : NKS              
                        editor: {
                            widget: "gselectbox",
                            options: [{
                                    dropdown: true,
                                    name: "nks",
                                    model: "model.ico=value.ico,model.nks=value.nks",
                                    //,
                                    serverFilters: { ico: this.gpc.ico },
                                }, Gordic.Prefabs.Select.ekosnks()]
                        }
                    });
                    //gridFormat.addSortedEkoCfuSet(this, true);
                    gridFormat.addSortedEkoCfuSet(this, true);
                    gridFormat.addDecimalColumn({
                        name: "m",
                        caption: "jres:31302140", //RC 31302140 : Množství
                        sortable: false,
                        editor: {
                            widget: "gnumberbox",
                            options: [{
                                    name: "m",
                                    change: //pořešit maximální možné dostupné množství majetku
                                    changeFunction("m"),
                                    model: "model.m=value"
                                }, Gordic.Prefabs.Number.decimal()]
                        }
                    })
                        .addTextColumn({
                        name: "mj",
                        caption: "jres:31302141", //RC 31302141 : Měrná jednotka
                        sortable: false,
                        editor: {
                            widget: "gselectbox",
                            options: [{
                                    name: "mj",
                                    model: "model.mj=value.mj",
                                    change: function () {
                                    }
                                }, Gordic.Prefabs.Select.gincmej()]
                        }
                    })
                        .addCurrencyColumn({
                        name: "mjm",
                        caption: "jres:31302142", //RC 31302142 : Cena/jednotku
                        sortable: false,
                        editor: {
                            widget: "gnumberbox",
                            options: [{
                                    name: "mjm",
                                    change: changeFunction("m"),
                                    model: "model.mjm=value"
                                }, Gordic.Prefabs.Number.currency()]
                        }
                    })
                        .addCurrencyColumn({
                        name: "mjm_czk",
                        caption: "Cena/jednotku v CZK",
                        sortable: false,
                        customClass: (ctx) => {
                            return "ui-disabled";
                        },
                        hidden: !zobrazCiziMena
                    });
                    gridFormat.addCurrencyColumn({
                        name: "c_zak_m",
                        caption: "jres:31302144" + this.menaZkr, //RC 31302144 : Základ v 
                        sortable: false,
                        editor: {
                            widget: "gnumberbox",
                            options: [{
                                    name: "c_zak_m",
                                    change: changeFunction("c_zak_m"),
                                    model: "model.c_zak_m=value"
                                }, Gordic.Prefabs.Number.currency()]
                        },
                        hidden: !zobrazDan
                    }) //danove           
                        .addCurrencyColumn({
                        name: "c_dan_m",
                        caption: "jres:31302145" + this.menaZkr, //RC 31302145 : Daň v 
                        sortable: false,
                        editor: {
                            widget: "gnumberbox",
                            options: [{
                                    name: "c_dan_m",
                                    change: changeFunction("c_dan_m"),
                                    model: "model.c_dan_m=value"
                                }, Gordic.Prefabs.Number.currency()]
                        },
                        hidden: !zobrazDan
                    }); //danove
                    gridFormat.addCurrencyColumn({
                        name: "c_celkem_m",
                        caption: "jres:31302146" + this.menaZkr, //RC 31302146 : Celkem v 
                        sortable: false,
                        editor: {
                            widget: "gnumberbox",
                            options: [{
                                    name: "c_celkem_m",
                                    validators: this.globalSettings.get("Pok.Nastaveni.MazatBezCastky") ? [] : [new Gordic.Validators.Required()],
                                    change: changeFunction("c_celkem_m"),
                                    model: "model.c_celkem_m=value"
                                }, Gordic.Prefabs.Number.currency()]
                        }
                    });
                    if (zobrazCiziMena) {
                        gridFormat.addCurrencyColumn({
                            name: "kurz",
                            caption: "jres:31302147", //RC 31302147 : Kurz
                            sortable: false,
                            editor: {
                                widget: "gnumberbox",
                                options: [{
                                        name: "kurz",
                                        change: changeFunction("kurz"),
                                        model: "model.kurz=value"
                                    }, Gordic.Prefabs.Number.decimal(3), { fixed: true, returnType: "decimal", thousandsSeparator: '' }]
                            },
                            hidden: !zobrazCiziMena
                        }) //cizi mena a danove
                            .addCurrencyColumn({
                            name: "c_zak",
                            caption: "jres:31302144" + "CZK", //RC 31302144 : Základ v //účetní měna
                            sortable: false,
                            customClass: (ctx) => {
                                return "ui-disabled";
                            },
                            editor: {
                                widget: "gnumberbox",
                                options: [{
                                        name: "c_zak",
                                        change: changeFunction("c_zak"),
                                        model: "model.c_zak=value"
                                    }, Gordic.Prefabs.Number.currency()]
                            },
                            hidden: !(zobrazCiziMena && zobrazDan)
                        }) //cizi mena
                            .addCurrencyColumn({
                            name: "c_dan",
                            caption: "jres:31302145" + "CZK", //RC 31302145 : Daň v // účetní měna
                            sortable: false,
                            customClass: (ctx) => {
                                return "ui-disabled";
                            },
                            editor: {
                                widget: "gnumberbox",
                                options: [{
                                        name: "c_dan",
                                        change: changeFunction("c_dan"),
                                        model: "model.c_dan=value"
                                    }, Gordic.Prefabs.Number.currency()]
                            },
                            hidden: !(zobrazCiziMena && zobrazDan)
                        }) //cizi mena a danove
                            .addCurrencyColumn({
                            name: "c_celkem",
                            caption: "jres:31302146" + "CZK", //RC 31302146 : Celkem v //účetní měna
                            sortable: false,
                            customClass: (ctx) => {
                                return "ui-disabled";
                            },
                            editor: {
                                widget: "gnumberbox",
                                options: [{
                                        name: "c_celkem",
                                        change: changeFunction("c_celkem"),
                                        model: "model.c_celkem=value"
                                    }, Gordic.Prefabs.Number.currency()]
                            },
                            hidden: !zobrazCiziMena
                        });
                    }
                    ;
                    gridFormat.addTextColumn({
                        name: "poznamka",
                        caption: "jres:31302130", //RC 31302130 : Poznámka
                        sortable: false,
                        editor: {
                            widget: "gstringbox",
                            options: [{
                                    name: "poznamka",
                                    change: function () {
                                    }
                                }]
                        }
                    });
                    return gridFormat;
                }
            };
            GPokDetailSablonaTab = __decorate([
                Decorators.gcontent
            ], GPokDetailSablonaTab);
            WebClient.GPokDetailSablonaTab = GPokDetailSablonaTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0RldGFpbFNhYmxvbmFUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9rRGV0YWlsU2FibG9uYVRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBODBDZjtBQTkwQ0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBODBDbkI7SUE5MENnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E4MEM3QjtRQTkwQ29CLFdBQUEsU0FBUztZQUcxQixJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFxQixTQUFRLE9BQUEsWUFBWTtnQkFBdEQ7O29CQTJnQlksMEJBQXFCLEdBQUcsS0FBSyxDQUFDO29CQStEdEMsa0JBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQWd3QnRELENBQUM7Z0JBL3pDRyxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFcEUsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxlQUFlO3dCQUU5QixJQUFJLENBQUMsY0FBYyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7d0JBRXhELE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzs0QkFDdkIsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNOzRCQUNwQixTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxZQUFZLEVBQUMsR0FBRyxDQUFDO3lCQUM5RixDQUFDOzZCQUNHLE9BQU8sRUFBRTs2QkFDVCxJQUFJLENBQUMsVUFBVSxHQUFxQzs0QkFFakQsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7NEJBRWpCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUVwRixJQUFJLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7Z0NBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7NEJBQ2hELENBQUM7aUNBQ0ksQ0FBQztnQ0FDRixPQUFPLENBQUMsR0FBRyxDQUFDLDREQUE0RCxDQUFDLENBQUE7Z0NBQ3pFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7NEJBQ2hELENBQUM7NEJBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxjQUFjO2dDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs0QkFDcEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxtQkFBbUI7NEJBRWxELEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7NEJBQy9FLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs0QkFFcEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLGVBQWU7Z0NBRXJELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFDcEUsQ0FBQztpQ0FDSSxDQUFDO2dDQUVGLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQzdGLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUM1RCxDQUFDOzRCQUVELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQ2xGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQTs0QkFDbEQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxNQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0NBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUMxRSxDQUFDO2lDQUFNLENBQUM7Z0NBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7NEJBQ3RCLENBQUM7d0JBRUwsQ0FBQyxDQUFDLENBQUM7b0JBRVgsQ0FBQzt5QkFDSSxDQUFDO3dCQUVGLElBQUksV0FBVyxHQUFxQyxFQUFFLENBQUM7d0JBRXZELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO3dCQUVsQixXQUFXLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7d0JBQzNCLFdBQVcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxtQkFBbUI7d0JBQ25ELFdBQVcsQ0FBQyxRQUFRLDhDQUFxQyxDQUFDO3dCQUMxRCxXQUFXLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzt3QkFDM0IsV0FBVyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7d0JBQ3hCLFdBQVcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEUsV0FBVyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO3dCQUNsQyxXQUFXLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7d0JBQ2xDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBRXJGLElBQUksV0FBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQzs0QkFDMUIsV0FBVyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUNqRCxDQUFDOzZCQUNJLENBQUM7NEJBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0REFBNEQsQ0FBQyxDQUFBOzRCQUN6RSxXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQ2pELENBQUM7d0JBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7b0JBRzdCLENBQUM7b0JBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxDQUFDO3lCQUMvRCxVQUFVLENBQUMsMkJBQTJCLENBQUM7eUJBQ3ZDLE1BQU0sQ0FBQyxlQUFlLENBQUM7eUJBQ3ZCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzt5QkFDM0QsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUM7eUJBQzdCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7eUJBQ2pHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLElBQUksR0FBRyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUU3SSxVQUFVLENBQUMsVUFBVSxDQUFDLDZCQUE2QixDQUFDO3lCQUMvQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsbUJBQW1CO3lCQUMzQyxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO3dCQUNyRCxJQUFJLEVBQUUsS0FBSzt3QkFDWCxLQUFLLEVBQUUseUNBQXlDO3dCQUNoRCxRQUFRLEVBQUUsS0FBSzt3QkFDZixhQUFhLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7d0JBQ3BDLFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDakQsQ0FBQzt5QkFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsNkJBQTZCO3lCQUNyRCxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO3dCQUNyRCxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQzlDLElBQUksRUFBRSxVQUFVO3dCQUNoQixLQUFLLEVBQUUsbUJBQW1CO3dCQUMxQixRQUFRLEVBQUUsSUFBSTt3QkFDZCxNQUFNLEVBQUUsVUFBVSxFQUFPLEVBQUUsU0FBYzs0QkFFckMsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxFQUFFLEVBQUUsV0FBVzs2QkFDaEQsQ0FBQztnQ0FFRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ2xDLENBQUM7aUNBQ0ksQ0FBQztnQ0FFRixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ25DLENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFDO3lCQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQywyQkFBMkI7eUJBQ25ELFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7d0JBQ3JELElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSx5REFBeUQsRUFBQywyQkFBMkI7d0JBQzVGLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTt3QkFDeEMsUUFBUSxFQUFFLEtBQUs7cUJBQ2xCLENBQUM7eUJBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGlDQUFpQzt5QkFDekQsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDckQsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUM5QyxJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUUsaUJBQWlCLEVBQUMsMEJBQTBCO3dCQUNuRCxRQUFRLEVBQUUsSUFBSTt3QkFDZCxhQUFhLEVBQUU7NEJBQ1gsT0FBTyxFQUFFO2dDQUNMLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTs0QkFDcEcsQ0FBQzt5QkFDSjtxQkFDSixDQUFDO3lCQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyw2QkFBNkI7eUJBQ3JELFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7d0JBQ3JELFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDOUMsSUFBSSxFQUFFLGFBQWE7d0JBQ25CLEtBQUssRUFBRSx5QkFBeUI7d0JBQ2hDLFFBQVEsRUFBRSxJQUFJO3dCQUNkLFlBQVksRUFBRSxXQUFXO3dCQUN6QixRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7d0JBQ3BGLGFBQWEsRUFBRTs0QkFDWCxXQUFXLEVBQUU7Z0NBRVQsSUFBSSxNQUFNLENBQUM7Z0NBRVgsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUM7b0NBQ2xDLE9BQU8sQ0FBQyxDQUFDO2dDQUViLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLElBQUksRUFBRTtvQ0FDbEMsT0FBTyxFQUFFLENBQUM7NEJBRWxCLENBQUM7eUJBQ0o7d0JBQ0QsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7NEJBRXBCLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFBRSxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDOzRCQUN6RSxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLGVBQWUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3dCQUdySSxDQUFDO3dCQUVELDREQUE0RDtxQkFDL0QsQ0FBQzt5QkFDRCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSwyQkFBMkIsRUFBRSxDQUFDLENBQUMsc0NBQXNDO3lCQUM1RyxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQzt3QkFDMUQsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDaEUsV0FBVyxFQUFFOzRCQUNULEdBQUcsRUFBRSxjQUFjOzRCQUNuQixTQUFTLEVBQUUsY0FBYzs0QkFDekIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQWlCOzRCQUN4RSxlQUFlLEVBQUUsc0RBQXNEO3lCQUMxRTt3QkFDRCxJQUFJLEVBQUUsVUFBVSxRQUFRLEVBQUUsTUFBTTs0QkFDNUIsSUFBSSxNQUFNLEdBQVEsRUFBRSxDQUFDOzRCQUVyQixrQkFBa0I7NEJBQ2xCLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQzs0QkFDbkQsTUFBTSxDQUFDLGVBQWUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs0QkFHckYsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBRXBFLElBQUksU0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO2dDQUVwQixNQUFNLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7Z0NBQ3JDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQzs0QkFFL0MsQ0FBQzs0QkFFRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFFNUQsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7Z0NBQ2xCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQTs0QkFDcEMsQ0FBQzt3QkFFTCxDQUFDO3dCQUNELE9BQU8sRUFBRSxJQUFJO3FCQUNoQixDQUFDLEVBQ0U7d0JBQ0ksSUFBSSxFQUFFLFFBQVE7d0JBQ2QsS0FBSyxFQUFFLGdDQUFnQzt3QkFDdkMseUNBQXlDO3dCQUN6QyxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzt3QkFDekIsQ0FBQztxQkFDSixDQUFDO3lCQUNMLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQzt5QkFDekIsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsS0FBSyxFQUFFLGlCQUFpQjtxQkFDM0IsRUFDRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ3hCLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFvQyxxQkFBcUI7d0JBQ3JILFFBQVEsRUFDUjs0QkFDSSxHQUFHLEVBQUUsY0FBYzs0QkFDbkIsU0FBUyxFQUFFLGNBQWM7NEJBQ3pCLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLGlCQUFpQjs0QkFDeEUsZUFBZSxFQUFFLHNEQUFzRDt5QkFDMUU7cUJBQ0osQ0FBMkIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO29CQUkzRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsU0FBUyxFQUFFOzRCQUNQLE9BQU8sRUFBRSxlQUFlLEVBQUMsc0JBQXNCOzRCQUMvQyxJQUFJLEVBQUUsU0FBUzs0QkFDZixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUN4QixDQUFDO3lCQUNKO3dCQUNELGdCQUFnQixFQUFFOzRCQUNkLE9BQU8sRUFBRSxRQUFROzRCQUNqQixJQUFJLEVBQUUsU0FBUzs0QkFDZixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FFbEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Z0NBRXBELElBQUksR0FBcUMsQ0FBQztnQ0FDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztnQ0FDbEMsR0FBRyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUksR0FBRyxFQUFFLENBQUM7Z0NBSWhSLG9CQUFvQjtnQ0FDcEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLDhDQUE4QztnQ0FDakksSUFBSSxXQUFXLElBQUksRUFBRSxFQUFFLENBQUM7b0NBQ3BCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsT0FBTyxJQUFJLE9BQU8sT0FBTyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQzVGLElBQUksR0FBRyxLQUFLLFNBQVM7d0NBQUUsR0FBRyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsV0FBWSxDQUFDO29DQUUxRCxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztvQ0FDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxPQUFPLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDL0YsSUFBSSxJQUFJLEtBQUssU0FBUzt3Q0FBRSxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFhLENBQUM7Z0NBQ2xFLENBQUM7Z0NBSUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQzs0QkFJdEQsQ0FBQzt5QkFDSjt3QkFDRCxnQkFBZ0IsRUFBRTs0QkFDZCxPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBRWxCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUMvQyxJQUFJLEtBQUssRUFBRSxDQUFDO29DQUVSLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUE0QixTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQ3BGLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQ3JDLEtBQUssQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO29DQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDO29DQUd6QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7b0NBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztnQ0FDeEMsQ0FBQzs0QkFFTCxDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUU1RSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFLDJDQUEyQztxQkFDekYsQ0FBQzt3QkFDRyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUkxRCxDQUFDO29CQUVELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUM3RSxLQUFLLEVBQUUsa0JBQWtCO3dCQUN6QixNQUFNLEVBQUUsSUFBSTt3QkFDWixNQUFNLEVBQUUsSUFBSTt3QkFDWixPQUFPLEVBQUUsSUFBSTt3QkFDYixPQUFPLEVBQUU7NEJBQ0wsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFOzRCQUN6RCxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7eUJBQzVEO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsSUFBSTt3QkFDTCxDQUFDLENBQUMsT0FBTyxDQUFDOzZCQUNMLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7NkJBQzlDLFFBQVEsRUFBRTs2QkFDVixLQUFLLENBQUM7NEJBQ0gsSUFBSSxFQUFFLEVBQUU7NEJBQ1IsVUFBVSxFQUFFLE1BQU07NEJBQ2xCLFVBQVUsRUFBRSxLQUFLOzRCQUNqQixjQUFjLEVBQUUsTUFBTTs0QkFDdEIsVUFBVSxFQUFFLEtBQUs7NEJBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7eUJBQ25DLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFHN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDVCxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO3FCQUNyRCxDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7Z0JBRTdDLENBQUM7Z0JBRU8saUNBQWlDO29CQUVyQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQTJCLENBQUM7b0JBQ2hGLElBQUksVUFBVSxFQUFFLENBQUM7d0JBR2IsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDbkQsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxVQUFVOzRCQUNWLFVBQVUsQ0FBQyxNQUFNLEdBQUcs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YSxDQUFDO3dCQUNyQixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsT0FBTyxFQUFFLGVBQWUsRUFBRSx3QkFBd0I7d0JBQ2xELFFBQVEsRUFBRSxLQUFLO3dCQUNmLE1BQU0sRUFBRTs0QkFDSixNQUFNLEVBQUUsWUFBWTs0QkFDcEIsT0FBTyxFQUFFLENBQUM7b0NBQ04sSUFBSSxFQUFFLFVBQVU7b0NBQ2hCLE1BQU0sRUFBRTtvQ0FHUixDQUFDO2lDQUNKLENBQUM7eUJBQ0w7cUJBQ0osQ0FBQyxDQUFBO29CQUVGLE9BQU8sVUFBVSxDQUFDO2dCQUV0QixDQUFDO2FBQ0osQ0FBQTtZQTEwQ1ksb0JBQW9CO2dCQURoQyxVQUFVLENBQUMsUUFBUTtlQUNQLG9CQUFvQixDQTAwQ2hDO1lBMTBDWSw4QkFBb0IsdUJBMDBDaEMsQ0FBQTtRQUNMLENBQUMsRUE5MENvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE4MEM3QjtJQUFELENBQUMsRUE5MENnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE4MENuQjtBQUFELENBQUMsRUE5MENTLE1BQU0sS0FBTixNQUFNLFFBODBDZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuUG9rLldlYkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUG9rRGV0YWlsU2FibG9uYVRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7ICAgXHJcbiAgICAgICAgcHVibGljIG1vZGVsOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rc3BpdER0bztcclxuICAgICAgICBwdWJsaWMgaXhzUGl0OiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGl4c0Z1bjogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBua3M6IHN0cmluZztcclxuICAgICAgICBzc2xzdHlwOiBHb3JkaWMuRGF0YS5SZWFkZXJzLlNzbHN0eXBEdG9bXTtcclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHVibGljIGl4cERlbjogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgbWF4UmFkZWs6IG51bWJlcjtcclxuICAgICAgICBwb2tQYXJhbXM6IEdQb2tQYXJhbUR0bztcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7IGNhcHRpb246IHRoaXMudGl0bGUsIGRlZmF1bHRBY3Rpb246IHRydWUgfV0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXhzUGl0KSB7IC8vZGV0YWlsxaBhYmxvbnlcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiTmHEjXRlbsOtIGRldGFpbHUgcG9rbGFkbsOtIMWhYWJsb255XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuUG9rU2FibG9uYS5yZWFkKHtcclxuICAgICAgICAgICAgICAgICAgICBpeHNfcGl0OiB0aGF0Lml4c1BpdCxcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IFtcIlBPS1NQSVRcIiwgXCJQT0tTUElUX1RYVFwiLCBcInBva2RwZXREdG9cIiwgXCJwb2tkcGV0RHRvLlBPS0RQRVRcIiwgXCJwb2tkcGV0RHRvXCIsXCIqXCJdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZHRvOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rc3BpdER0bykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbCA9IGR0bztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl4c1R5cEFycmF5ID0gdGhhdC5zc2xzdHlwLmZpbHRlcihpdGVtID0+IGl0ZW0ua3RnX3R5cCA9PSB0aGF0Lm1vZGVsLmt0Z190eXApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl4c1R5cEFycmF5Lmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsLml4c190eXAgPSBpeHNUeXBBcnJheVswXS5peHNfdHlwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFeGlzdHVqZSB2w61jZSBuZWJvIMW+w6FkbsOhIGthdGVnb3JpZSBkb2tsYWR1IHN0ZWpuw6kgaG9kbm90eSFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuaXhzX3R5cCA9IGl4c1R5cEFycmF5WzBdLml4c190eXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsLml4c19lc3UgPT0gXCIwMDAwU0UwMDAwME1cIikgdGhhdC5tb2RlbC5peHNfZXN1ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbC5pY28gPSB0aGF0LmdwYy5pY287IC8va3bFr2xpIHBvbMOtxI1rdSBOS1NcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYi5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5wb2tQYXJhbXMuUG9rUmFkUG9lZHNhID09IDMwMCkgeyAvL3BvdXplIHZsYXN0bsOtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwidmxhc3RuaVwiKS5nY2hlY2soXCJzZXRWYWx1ZVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJ2bGFzdG5pXCIpLmdjaGVjayhcInNldFZhbHVlXCIsIHRoYXQubW9kZWwuaXhzX2Z1biA9PSB0aGF0Lml4c0Z1bik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJ2bGFzdG5pXCIpLmdjaGVjayhcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0Lm1vZGVsLnBva2RwZXREdG8hLmZpbHRlcih4ID0+IHguYWt0aXZpdGEgPT0gMTAwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem1lbkRhbmVHcmlkRm9ybWF0KHRoYXQubW9kZWwuZHJ1aF9kb2sgPT0gMTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsLnBva2RwZXREdG8/Lmxlbmd0aCEgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1heFJhZGVrID0gTWF0aC5tYXgoLi4udGhhdC5tb2RlbC5wb2tkcGV0RHRvIS5tYXAodCA9PiB0LnJhZGVrKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1heFJhZGVrID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHByYXpkbnlEYXRhOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rc3BpdER0byA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQubWF4UmFkZWsgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIHByYXpkbnlEYXRhLm5rcyA9IHRoYXQubmtzO1xyXG4gICAgICAgICAgICAgICAgcHJhemRueURhdGEuaWNvID0gdGhhdC5ncGMuaWNvOyAvL2t2xa9saSBwb2zDrcSNa3UgTktTXHJcbiAgICAgICAgICAgICAgICBwcmF6ZG55RGF0YS5kcnVoX2RvayA9IEhwbC5JbnRlcmZhY2UuRHJ1aERva2xhZHUubmVkYW5vdnk7XHJcbiAgICAgICAgICAgICAgICBwcmF6ZG55RGF0YS5rdGdfdHlwID0gMTUwMDtcclxuICAgICAgICAgICAgICAgIHByYXpkbnlEYXRhLmt0Z19kb2sgPSAwO1xyXG4gICAgICAgICAgICAgICAgcHJhemRueURhdGEuenB1c19wbGF0YnkgPSB0aGF0LnBva1BhcmFtcy5Qb2tEb2tacHVzcGxhID09IDMwID8gMTAgOiAwO1xyXG4gICAgICAgICAgICAgICAgcHJhemRueURhdGEuaXhzX2Z1biA9IHRoYXQuaXhzRnVuO1xyXG4gICAgICAgICAgICAgICAgcHJhemRueURhdGEuaXhwX2RlbiA9IHRoYXQuaXhwRGVuO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXhzVHlwQXJyYXkgPSB0aGF0LnNzbHN0eXAuZmlsdGVyKGl0ZW0gPT4gaXRlbS5rdGdfdHlwID09IHByYXpkbnlEYXRhLmt0Z190eXApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpeHNUeXBBcnJheS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByYXpkbnlEYXRhLml4c190eXAgPSBpeHNUeXBBcnJheVswXS5peHNfdHlwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFeGlzdHVqZSB2w61jZSBuZWJvIMW+w6FkbsOhIGthdGVnb3JpZSBkb2tsYWR1IHN0ZWpuw6kgaG9kbm90eSFcIilcclxuICAgICAgICAgICAgICAgICAgICBwcmF6ZG55RGF0YS5peHNfdHlwID0gaXhzVHlwQXJyYXlbMF0uaXhzX3R5cDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsID0gcHJhemRueURhdGE7XHJcbiAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGhlYWRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInBva1NhYmxvbmFEZXRhaWxcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJIbGF2acSNa2EgcG9rbGFkbsOtIMWhYWJsb255XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiSWRlbnRpZmlrw6F0b3JcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcIml4c19waXRcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJOw6F6ZXYgxaFhYmxvbnlcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcIm5hemV2X3NhYmxvbnlcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJ2bGFzdG5pXCIsIGxhYmVsOiBcIlVsb8W+aXQgamFrbyB2bGFzdG7DrVwiLCBkaXNhYmxlZDogdGhhdC5wb2tQYXJhbXMuUG9rUmFkUG9lZHNhID09IDMwMCwgaW5pdGlhbFZhbHVlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgaGVhZGVyRm9ybS5hZGRTZWN0aW9uKFwiSGxhdmnEjWthIHBva2xhZG7DrWhvIGRva2xhZHVcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMTE4XCIpIC8vUkMgMzEzMDIxMTggOiBOS1NcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3Nua3MoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwubmtzPXZhbHVlLm5rcyxtb2RlbC5pY289dmFsdWUuaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgaWNvOiB0aGF0LmdwYy5pY28gfSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMDI5XCIpIC8vUkMgMzEzMDIwMjkgOiBEcnVoIGRva2xhZHUgXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5wb2tjZHJ1KCksIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZHJ1aF9kb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkcnVoX2Rvaz1kcnVoX2Rva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2OiBhbnksIGNoYW5nZU9iajogYW55KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlT2JqLnZhbHVlLmRydWhfZG9rID09PSAxMCkgLy8gbmVkYcWIb3bDvVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56bWVuRGFuZUdyaWRGb3JtYXQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56bWVuRGFuZUdyaWRGb3JtYXQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMDA2XCIpIC8vUkMgMzEzMDIwMDYgOiBUeXAgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3Nsc3R5cCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3RnX3R5cD12YWx1ZS5rdGdfdHlwLG1vZGVsLml4c190eXA9dmFsdWUuaXhzX3R5cFwiLC8vO2t0Z190eXBfdHh0PWt0Z190eXBfdHh0IFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsga3RnX3R5cDogWzE1MDAsIDE1MTBdIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMDI4XCIpIC8vUkMgMzEzMDIwMjggOiBLYXRlZ29yaWUgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QucG9rY2t0ZygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt0Z19kb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJrdGdfZG9rPWt0Z19kb2tcIiwvLztrdGdfZG9rX3R4dD1rdGdfZG9rX3R4dFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga3RnX2RvazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZmluZEZpZWxkcyhcImt0Z190eXBcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikua3RnX3R5cCA9PT0gMTUxMCA/IFswLCAxMDAsIDIwMF0gOiBbMCwgMjAwXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMTIxXCIpIC8vUkMgMzEzMDIxMjEgOiBacMWvc29iIMO6aHJhZHlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnBva2N6cHAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6cHVzX3BsYXRieVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInpwdXNfcGxhdGJ5PXpwdXNfcGxhdGJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY0lucHV0OiBcImV4Y2x1c2l2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAodGhhdC5wb2tQYXJhbXMuUG9rRG9rWnB1c3BsYSA9PSAtMSB8fCB0aGF0LnBva1BhcmFtcy5Qb2tEb2tacHVzcGxhID09IDMwKSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpwdXNfcGxhdGJ5OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5wb2tQYXJhbXMuUG9rRG9rWnB1c3BsYSA9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5wb2tQYXJhbXMuUG9rRG9rWnB1c3BsYSA9PSAzMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2YWx1ZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWNvbiA9IHZhbHVlPy56cHVzX3BsYXRieSA9PT0gMCA/IFwiZ2ktYmFua292a2FcIiA6IFwiZmEtY3JlZGl0LWNhcmRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID8gXCJ7MH0gPHNwYW4+ezF9PC9zcGFuPlwiLmZvcm1hdChuZXcgR29yZGljLlV0aWxzLkljb25CdWlsZGVyKCkuY3JlYXRlSWNvbihpY29uKSwgdmFsdWUuenB1c19wbGF0YnlfdHh0ID8/IFwiIFwiKSA6IFwiXCI7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHsgdGhhdC5FZGl0b3Zhbm8gPSB0cnVlIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMTMwMjExN1wiLCBoaW50OiBcIk9rbm8gcHJvIHbDvWLEm3Igc21sb3V2eS4uLlwiIH0pIC8vUkMgMzEzMDIxMTcgOiBTbWxvdXZhL29iamVkbsOhdmthICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvVnliZXJTbWxvdXZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dER0bzogeyByb2tTbWw6IHRoYXQuZ3BjLnJvaywgcm9rUG9sOiBOdW1iZXIodGhhdC5ncGMucm9rKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVzdUxvZ292YW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogXCIwMDAwWDAwMDAwMDNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiBcIjAwMDBYMDAwMDAwM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRXN1VkhsZWRhbmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogXCJWw71ixJtyIFNtbG91dnlcXE9iamVkbsOhdmt5IG5hIGRldGFpbHUgcG9rbGFkbsOtIMWhYWJsb255XCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChpbnB1dER0bywgZmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZXM6IGFueSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8vL3ByaXByYXZhIGVudW11XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmlwYWR5ID0gR29yZGljLkVrby5HVnliZXJTbWxvdXZ5LlByaXBhZHlFbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuc21sdXZuaV9wcmlwYWR5ID0gW3ByaXBhZHkuU2VTY2h2YWxlbm91UG9sb3prb3UsIHByaXBhZHkuU1Z5aG92dWppY2lQb2xvemtvdV07XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtvbXBldGVudCA9IHRoYXQuZmluZEZpZWxkcyhcIml4c19mdW5fdnlyaXpcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa29tcGV0ZW50ICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuY2lzX3JlYWwgPSBrb21wZXRlbnQuY2lzX3JlYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dER0by5peHNfZnVuX3Z5cml6ID0ga29tcGV0ZW50Lml4c19mdW47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXhzX2VzdSA9IHRoYXQuZmluZEZpZWxkcyhcIml4c19lc3VcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXhzX2VzdSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuaXhzX2VzdSA9IGl4c19lc3UuaXhzX2VzdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRlZDogdGhhdFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBzX3NtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5wc19zbWw9dmFsdWUuaXhwX3NtbF9wcmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnV0dG9uczogW3sgYWN0aW9uOiBha2NlLmFjdFNtbEVzdSB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJFeHRlcm7DrSBzdWJqZWt0XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfZXN1PWl4c19lc3VcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRXN1LlByZWZhYnMudnliZXJFc3Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXA6IEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmlLYXJvdGVrYS5TZWxlY3RFc3UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHByZWZhYnUgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nb3Zhbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogXCIwMDAwWDAwMDAwMDNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogXCIwMDAwWDAwMDAwMDNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlFc3VWSGxlZGFuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogXCJWw71ixJtyIGV4dGVybsOtaG8gc3ViamVrdHUgbmEgZGV0YWlsdSBwb2tsYWRuw60gxaFhYmxvbnlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pIGFzIEdTZWxlY3RCb3hPcHRpb25zPGFueT4pLmFkZFNlY3Rpb24oeyBuYW1lOiBcInNla2NlUG9sb3preVwiIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0VWxveml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMjc3XCIsLy9SQyAzMTMwMjI3NyA6IFVsb8W+aXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudWxveml0RGV0YWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFBvbG96a2FQcmlkYXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWlkYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmtzID0gdGhhdC5maW5kRmllbGRzKFwibmtzXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdzogR29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva2RwZXREdG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubWF4UmFkZWsgPSB0aGF0Lm1heFJhZGVrICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0geyByYWRlazogdGhhdC5tYXhSYWRlaywgY19kYW46IHBhcnNlRGVjaW1hbCgwKSwgbmtzOiBua3MubmtzLCBkYW5fdHlwOiAwLCBjX3phazogcGFyc2VEZWNpbWFsKDApLCBjX2Rhbl9tOiBwYXJzZURlY2ltYWwoMCksIGNfemFrX206IHBhcnNlRGVjaW1hbCgwKSwgY19jZWxrZW1fbTogcGFyc2VEZWNpbWFsKDApLCBjX2NlbGtlbTogcGFyc2VEZWNpbWFsKDApLCBrdXJ6OiBwYXJzZURlY2ltYWwoMSksIGljbzogdGhhdC5ncGMuaWNvLCBha3Rpdml0YSAgOiAxMDAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2plbiBrZHnFviBqZSBkYcWIb3bDvVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZHJ1aERva2xhZHUgPSB0aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcImRydWhfZG9rXCIpLmdmaWVsZChcImdldFZhbHVlXCIpLmRydWhfZG9rOyAvLzAgLSBkYW5vdsO9IC8gMTAgLSBuZWRhbm92eSAvIDIwIC0gemouIGRhbm92eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHJ1aERva2xhZHUgIT0gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGthdCA9IHRoYXQuZWtvY2RhdC5maW5kKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBlbGVtZW50LmRhbl90eXAgPT0gcm93LmRhbl90eXAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2F0ICE9PSB1bmRlZmluZWQpIHJvdy5kYW5fdHlwX3R4dCA9IGthdC5kYW5fdHlwX3R4dCE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmRhbl9za3VwID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGthdDIgPSB0aGF0LnBva2NkYXMuZmluZChmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudC5kYW5fc2t1cCA9PSByb3cuZGFuX3NrdXAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2F0MiAhPT0gdW5kZWZpbmVkKSByb3cuZGFuX3NrdXBfdHh0ID0ga2F0Mi5kYW5fc2t1cF90eHQhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcImdldFZpZXdcIikudXBkYXRlRGF0YShyb3csIFwiYWRkXCIpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RQb2xvemthU21hemF0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTbWF6YXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmFkZWsgPSB0aGF0LmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRlaykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gdGhhdC5ncmlkLmdncmlkPEhwbC5JbnRlcmZhY2UuR1Bva2RwZXREdG8+KFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXhSYWRlayA9IHZpZXcuaW5kZXhPZihyYWRlayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRlay5ha3Rpdml0YSA9IDkwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdbaW5kZXhSYWRla10gPSByYWRlaztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiLCByYWRlayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0YWIgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgaGVhZGVyRm9ybSk7ICAgXHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5tb2RlbCAmJiB0aGF0Lm1vZGVsLml4c19waXQgPT0gbnVsbCkgLy9uYXN0YXZlbsOtIHByw6F6ZG7DqWhvIERUTyBwcm8gbm92b3UgxaFhYmxvbnVcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFiLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWwpO1xyXG4gICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHBvbG96a3lGb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRhYi5maW5kRm9ybVNlY3Rpb25zKFwic2VrY2VQb2xvemt5XCIpKS5ndGFiKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlBva2xhZG7DrSBwb2xvxb5reVwiLFxyXG4gICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbG9ja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFBvbG96a2FQcmlkYXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RQb2xvemthU21hemF0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9XHJcbiAgICAgICAgICAgICAgICAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiLmZpbmRGb3JtU2VjdGlvbnMoXCJzZWtjZVBvbG96a3lcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcImNlbGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZ2dyaWRjZWxsZWRpdG9yKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VWxveml0LCBmYXZvcml0ZTogdHJ1ZSB9ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudXByYXZWaWRpdGVsbm9zdFNsb3VwY3VVY2V0bmlWZXR5KCk7ICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1cHJhdlZpZGl0ZWxub3N0U2xvdXBjdVVjZXRuaVZldHkoKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBncmlkRm9ybWF0ID0gdGhhdC5ncmlkLmdncmlkKFwib3B0aW9uXCIsIFwiY29sdW1uc1wiKSBhcyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0O1xyXG4gICAgICAgICAgICBpZiAoZ3JpZEZvcm1hdCkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc2xvdXBlY1VlYSA9IGdyaWRGb3JtYXQuZ2V0KFwidWVhXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3VwZWNVZWEpIFxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3VwZWNVZWEuaGlkZGVuID0gIXRoYXQucG9rUGFyYW1zLlBva1Nob3dVZWE7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHNsb3VwZWNVZWIgPSBncmlkRm9ybWF0LmdldChcInVlYlwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzbG91cGVjVWViKVxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3VwZWNVZWIuaGlkZGVuID0gIXRoYXQucG9rUGFyYW1zLlBva1Nob3dVZWI7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xvdXBlY1VlYyA9IGdyaWRGb3JtYXQuZ2V0KFwidWVjXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3VwZWNVZWMpXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdXBlY1VlYy5oaWRkZW4gPSAhdGhhdC5wb2tQYXJhbXMuUG9rU2hvd1VlYztcclxuICAgICAgICAgICAgICAgIGxldCBzbG91cGVjVWVkID0gZ3JpZEZvcm1hdC5nZXQoXCJ1ZWRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xvdXBlY1VlZClcclxuICAgICAgICAgICAgICAgICAgICBzbG91cGVjVWVkLmhpZGRlbiA9ICF0aGF0LnBva1BhcmFtcy5Qb2tTaG93VWVkO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNsb3VwZWNVZWUgPSBncmlkRm9ybWF0LmdldChcInVlZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzbG91cGVjVWVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3VwZWNVZWUuaGlkZGVuID0gIXRoYXQucG9rUGFyYW1zLlBva1Nob3dVZWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xvdXBlY1VlZiA9IGdyaWRGb3JtYXQuZ2V0KFwidWVmXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3VwZWNVZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdXBlY1VlZi5oaWRkZW4gPSAhdGhhdC5wb2tQYXJhbXMuUG9rU2hvd1VlZjtcclxuICAgICAgICAgICAgICAgIGxldCBzbG91cGVjVWVnID0gZ3JpZEZvcm1hdC5nZXQoXCJ1ZWdcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xvdXBlY1VlZylcclxuICAgICAgICAgICAgICAgICAgICBzbG91cGVjVWVnLmhpZGRlbiA9ICF0aGF0LnBva1BhcmFtcy5Qb2tTaG93VWVnO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNsb3VwZWNVZWggPSBncmlkRm9ybWF0LmdldChcInVlaFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzbG91cGVjVWVoKVxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3VwZWNVZWguaGlkZGVuID0gIXRoYXQucG9rUGFyYW1zLlBva1Nob3dVZWg7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xvdXBlY1VlaSA9IGdyaWRGb3JtYXQuZ2V0KFwidWVpXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3VwZWNVZWkpXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdXBlY1VlaS5oaWRkZW4gPSAhdGhhdC5wb2tQYXJhbXMuUG9rU2hvd1VlaTtcclxuICAgICAgICAgICAgICAgIGxldCBzbG91cGVjVWVqID0gZ3JpZEZvcm1hdC5nZXQoXCJ1ZWpcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xvdXBlY1VlailcclxuICAgICAgICAgICAgICAgICAgICBzbG91cGVjVWVqLmhpZGRlbiA9ICF0aGF0LnBva1BhcmFtcy5Qb2tTaG93VWVqO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNsb3VwZWNVZWsgPSBncmlkRm9ybWF0LmdldChcInVla1wiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzbG91cGVjVWVrKVxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3VwZWNVZWsuaGlkZGVuID0gIXRoYXQucG9rUGFyYW1zLlBva1Nob3dVZWs7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xvdXBlY1VlbCA9IGdyaWRGb3JtYXQuZ2V0KFwidWVsXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3VwZWNVZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdXBlY1VlbC5oaWRkZW4gPSAhdGhhdC5wb2tQYXJhbXMuUG9rU2hvd1VlbDtcclxuICAgICAgICAgICAgICAgIGxldCBzbG91cGVjVWVtID0gZ3JpZEZvcm1hdC5nZXQoXCJ1ZW1cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xvdXBlY1VlbSlcclxuICAgICAgICAgICAgICAgICAgICBzbG91cGVjVWVtLmhpZGRlbiA9ICF0aGF0LnBva1BhcmFtcy5Qb2tTaG93VWVtO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNsb3VwZWNVZW4gPSBncmlkRm9ybWF0LmdldChcInVlblwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzbG91cGVjVWVuKVxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3VwZWNVZW4uaGlkZGVuID0gIXRoYXQucG9rUGFyYW1zLlBva1Nob3dVZW47XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xvdXBlY1RlMCA9IGdyaWRGb3JtYXQuZ2V0KFwidGUwXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3VwZWNUZTApXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdXBlY1RlMC5oaWRkZW4gPSAhdGhhdC5wb2tQYXJhbXMuUG9rU2hvd1RlMDtcclxuICAgICAgICAgICAgICAgIGxldCBzbG91cGVjVGUxID0gZ3JpZEZvcm1hdC5nZXQoXCJ0ZTFcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xvdXBlY1RlMSlcclxuICAgICAgICAgICAgICAgICAgICBzbG91cGVjVGUxLmhpZGRlbiA9ICF0aGF0LnBva1BhcmFtcy5Qb2tTaG93VGUxO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNsb3VwZWNUZTIgPSBncmlkRm9ybWF0LmdldChcInRlMlwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzbG91cGVjVGUyKVxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3VwZWNUZTIuaGlkZGVuID0gIXRoYXQucG9rUGFyYW1zLlBva1Nob3dUZTI7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xvdXBlY1RlMyA9IGdyaWRGb3JtYXQuZ2V0KFwidGUzXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3VwZWNUZTMpXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdXBlY1RlMy5oaWRkZW4gPSAhdGhhdC5wb2tQYXJhbXMuUG9rU2hvd1RlMztcclxuICAgICAgICAgICAgICAgIGxldCBzbG91cGVjVGU0ID0gZ3JpZEZvcm1hdC5nZXQoXCJ0ZTRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xvdXBlY1RlNClcclxuICAgICAgICAgICAgICAgICAgICBzbG91cGVjVGU0LmhpZGRlbiA9ICF0aGF0LnBva1BhcmFtcy5Qb2tTaG93VGU0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHNsb3VwZWNUZTUgPSBncmlkRm9ybWF0LmdldChcInRlNVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzbG91cGVjVGU1KVxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3VwZWNUZTUuaGlkZGVuID0gIXRoYXQucG9rUGFyYW1zLlBva1Nob3dUZTU7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xvdXBlY1RlNiA9IGdyaWRGb3JtYXQuZ2V0KFwidGU2XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3VwZWNUZTYpXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdXBlY1RlNi5oaWRkZW4gPSAhdGhhdC5wb2tQYXJhbXMuUG9rU2hvd1RlNjtcclxuICAgICAgICAgICAgICAgIGxldCBzbG91cGVjVGU3ID0gZ3JpZEZvcm1hdC5nZXQoXCJ0ZTdcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xvdXBlY1RlNylcclxuICAgICAgICAgICAgICAgICAgICBzbG91cGVjVGU3LmhpZGRlbiA9ICF0aGF0LnBva1BhcmFtcy5Qb2tTaG93VGU3O1xyXG4gICAgICAgICAgICAgICAgbGV0IHNsb3VwZWNUZTggPSBncmlkRm9ybWF0LmdldChcInRlOFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzbG91cGVjVGU4KVxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3VwZWNUZTguaGlkZGVuID0gIXRoYXQucG9rUGFyYW1zLlBva1Nob3dUZTg7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xvdXBlY1RlOSA9IGdyaWRGb3JtYXQuZ2V0KFwidGU5XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3VwZWNUZTkpXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdXBlY1RlOS5oaWRkZW4gPSAhdGhhdC5wb2tQYXJhbXMuUG9rU2hvd1RlOTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVsb3oocGFyYW1zOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rc3BpdER0bykge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiVWtsw6Fkw6Fuw60uLi5cIilcclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5peHNfcGl0ICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5Qb2tTYWJsb25hLnVwZGF0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogcGFyYW1zIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRmxhc2guc2hvd0ZsYXNoU3VjY2Vzcyh0aGF0LCBcIsWgYWJsb25hIGJ5bGEgdWxvxb5lbmEgcG9kIG7DoXp2ZW0gXCIgKyBkYXRhLmRhdGEubmF6ZXZfc2FibG9ueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RVbG96aXQhLnNldFBlbmRpbmcoMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBkYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQubW9kZWwucG9rZHBldER0byEuZmlsdGVyKHggPT4geC5ha3Rpdml0YSA9PSAxMDApKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgdm9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZvYmouYmFzZVR5cGUgPT09IFwiR29yZGljLkdlbmVyYWwuR0hwbFZhbGlkYXRpb25FeGNlcHRpb25cIiB8fCB2b2JqLmV4Y2VwdGlvblR5cGUgPT09IFwiR29yZGljLkdlbmVyYWwuR0hwbFZhbGlkYXRpb25FeGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaEVycm9yKHRoYXQsIHZvYmouYmFzZU1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlBva1NhYmxvbmEuY3JlYXRlKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBwYXJhbXMgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hTdWNjZXNzKHRoYXQsIFwixaBhYmxvbmEgYnlsYSB1bG/FvmVuYSBwb2QgbsOhenZlbSBcIiArIGRhdGEuZGF0YS5uYXpldl9zYWJsb255KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFVsb3ppdCEuc2V0UGVuZGluZygxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC5tb2RlbC5wb2tkcGV0RHRvIS5maWx0ZXIoeCA9PiB4LmFrdGl2aXRhID09IDEwMCkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoeGhyLCB0eXBlLCB2b2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9iai5iYXNlVHlwZSA9PT0gXCJHb3JkaWMuR2VuZXJhbC5HSHBsVmFsaWRhdGlvbkV4Y2VwdGlvblwiIHx8IHZvYmouZXhjZXB0aW9uVHlwZSA9PT0gXCJHb3JkaWMuR2VuZXJhbC5HSHBsVmFsaWRhdGlvbkV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRmxhc2guc2hvd0ZsYXNoRXJyb3IodGhhdCwgdm9iai5iYXNlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1bG96aXREZXRhaWwoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maW5kRm9ybXMoKS5nZm9ybShcImlzVmFsaWRcIikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgZmllbGRzID0gdGhpcy5maW5kRmllbGRzKCk7XHJcbiAgICAgICAgICAgIGZpZWxkcy5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgdGhpcy5tb2RlbCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmxhc3RuaSA9IHRoYXQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInZsYXN0bmlcIikuZ2NoZWNrKFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXZsYXN0bmkpXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsLml4c19mdW4gPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZpZXcgPSB0aGF0LmdyaWQuZ2dyaWQ8SHBsLkludGVyZmFjZS5HUG9rZHBldER0bz4oXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKGZhbHNlKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1vZGVsLnBva2RwZXREdG8gPSB2aWV3O1xyXG5cclxuICAgICAgICAgICAgdGhhdC51bG96KHRoYXQubW9kZWwpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgc2V0VmFsdWVDYXN0a2FSdW5uaW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZG90YXpDRGFuTSgpOiBKUXVlcnlQcm9taXNlPHN0cmluZz4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMTMwMjMwMVwiLCBcIlbDvWLEm3IgdXByYXZvdmFuw6kgxI3DoXN0a3kgdiBwb2xvxb5jZSwgdnliZXJ0ZSDEjcOhc3RrdSBrIMO6cHJhdsSbOlwiLCBbeyB0ZXh0OiBcIlrDoWtsYWRcIiwgaWQ6IFwiemFrbGFkXCIgfSwgeyB0ZXh0OiBcIkNlbGtlbVwiLCBpZDogXCJjZWxrZW1cIiB9XSwgdW5kZWZpbmVkLCA0MDAsIDIwMClcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChldiwgcmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ6YWtsYWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShcIlpcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcImNlbGtlbVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKFwiQ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB6YW9rcm91aGxpTmFEdmUoY2lzbG86IERlY2ltYWwpOiBEZWNpbWFsIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNpc2xvLnRvRFAoMiwgNCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkb3BvY3RpQ2FzdGt5KHJhZGVrOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rZHBldER0byk6IEpRdWVyeVByb21pc2U8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva2RwZXREdG8+IHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQucHJvdmVkVnlwb2NldChyYWRlaylcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUocyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkYW5aZVpha2xhZHUoemFrbGFkOiBKc29uRGVjaW1hbCwgcHJvY2VudG86IEpzb25EZWNpbWFsKTogRGVjaW1hbCB7XHJcbiAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZSA9IEdvcmRpYy5HaW4uV2ViQ2xpZW50LlV0aWxzLmNhbGN1bGF0ZURQSChwYXJzZURlY2ltYWwoemFrbGFkKSwgcGFyc2VEZWNpbWFsKHByb2NlbnRvKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGxldCBub3Z5Vnlwb2NldCA9IHJldHVyblZhbHVlLnRheDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZURlY2ltYWwobm92eVZ5cG9jZXQhKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkYW5aQ2Vsa3UoY2Vsa2VtOiBKc29uRGVjaW1hbCwgcHJvY2VudG86IEpzb25EZWNpbWFsKTogRGVjaW1hbCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmV0dXJuVmFsdWUgPSBHb3JkaWMuR2luLldlYkNsaWVudC5VdGlscy5jYWxjdWxhdGVEUEgocGFyc2VEZWNpbWFsKGNlbGtlbSksIHBhcnNlRGVjaW1hbChwcm9jZW50byksIGZhbHNlKTtcclxuICAgICAgICAgICAgbGV0IG5vdnlWeXBvY2V0ID0gcmV0dXJuVmFsdWUudGF4O1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VEZWNpbWFsKG5vdnlWeXBvY2V0ISk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWtvY2RhcFJlYWRlciA9IG5ldyBHb3JkaWMuRGF0YS5SZWFkZXJzLkVrb2NkYXAoKTtcclxuICAgICAgICBla29jZGF0OiBHb3JkaWMuRGF0YS5SZWFkZXJzLkVrb2NkYXREdG9bXTtcclxuICAgICAgICBwb2tjZGFzOiBHUG9rY2Rhc0R0b1tdO1xyXG4gICAgICAgIG1lbmE6IGFueTtcclxuICAgICAgICBtZW5hWmtyOiBzdHJpbmc7XHJcbiAgICAgICAgaXhzVnBrOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0UHJvY2VudG9EYW5lKGRhblR5cDogbnVtYmVyKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHJva0RwaCA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgdmFyIG1lc2ljRHBoID0gbmV3IERhdGUoKS5nZXRNb250aCgpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgcm9rRHBoID0gdGhhdC5maW5kRmllbGRzKFwicm9rX2RwaFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgLy92YXIgbWVzaWNEcGggPSB0aGF0LmZpbmRGaWVsZHMoXCJtZXNpY19kcGhcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGhvZG5vdGEgPSBEZWNpbWFsLmFkZChEZWNpbWFsLm11bChyb2tEcGgsIDEwMCkuZFswXSwgbWVzaWNEcGgpLmRbMF07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5la29jZGFwUmVhZGVyLmdldERhdGEoeyBkYW5fdHlwOiBkYW5UeXAsIHJva21lc19vZDogXCI8PSBcIiArIGhvZG5vdGEsIHJva21lc19kbzogXCI+PSBcIiArIGhvZG5vdGEgfSkudGhlbigodGF4KSA9PiB7IHJldHVybiB0YXgubGVuZ3RoID09PSAxID8gcGFyc2VEZWNpbWFsKHRheFswXS5kYW5fcHJvYyA/PyAwKSA6IG5ldyBEZWNpbWFsKDApIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwcm92ZWRWeXBvY2V0KHJhZGVrOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rZHBldER0byk6IEpRdWVyeVByb21pc2U8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva2RwZXREdG8+IHtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBwcm9jZW50bzogSlF1ZXJ5UHJvbWlzZTxEZWNpbWFsPjtcclxuXHJcbiAgICAgICAgICAgIGlmIChyYWRlay5kYW5fdHlwID09PSAwKSAvL2JleiBkcGhcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHJvY2VudG8gPSAkLkRlZmVycmVkKCkucmVzb2x2ZShuZXcgRGVjaW1hbCgwKSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJvY2VudG8gPSAocmFkZWsuZGFuX3NrdXAgPT09IDEwKSA/IC8vIG9zdm9ib3plbm9cclxuICAgICAgICAgICAgICAgICAgICAkLkRlZmVycmVkKCkucmVzb2x2ZShuZXcgRGVjaW1hbCgwKSkucHJvbWlzZSgpIDpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmdldFByb2NlbnRvRGFuZShyYWRlay5kYW5fdHlwKTsgLy8gZG9kxJtsYXQgbmHEjcOtdMOhbsOtIHNhemViIERQSFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9jZW50by50aGVuKChkYW5fcHJvYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmFkZWsuZGFuX3Byb2MgPSBkYW5fcHJvYztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmFkZWsudmtsYWRfY2FzdGthID09PSBcIlpcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYWRlay5jX3phayA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrLmNfZGFuID0gbmV3IERlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrLmNfY2Vsa2VtID0gbmV3IERlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsuY19kYW4gPSB0aGlzLmRhblplWmFrbGFkdShyYWRlay5jX3phaywgcmFkZWsuZGFuX3Byb2MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRlay5jX2NlbGtlbSA9IERlY2ltYWwuYWRkKHJhZGVrLmNfemFrLCByYWRlay5jX2Rhbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrLmNfemFrX20gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRlay5jX2Rhbl9tID0gbmV3IERlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrLmNfY2Vsa2VtX20gPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsuY19kYW5fbSA9IHRoaXMuZGFuWmVaYWtsYWR1KHJhZGVrLmNfemFrX20sIHJhZGVrLmRhbl9wcm9jKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsuY19jZWxrZW1fbSA9IERlY2ltYWwuYWRkKHJhZGVrLmNfemFrX20sIHJhZGVrLmNfZGFuX20pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmFkZWsudmtsYWRfY2FzdGthID09PSBcIkNcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmFkZWsuY19jZWxrZW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRlay5jX2RhbiA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRlay5jX3phayA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrLmNfZGFuID0gdGhpcy5kYW5aQ2Vsa3UocmFkZWsuY19jZWxrZW0sIHJhZGVrLmRhbl9wcm9jKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsuY196YWsgPSBuZXcgRGVjaW1hbChyYWRlay5jX2NlbGtlbSkubWludXMocmFkZWsuY19kYW4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrLmNfY2Vsa2VtX20gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRlay5jX2Rhbl9tID0gbmV3IERlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrLmNfemFrX20gPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsuY19kYW5fbSA9IHRoaXMuZGFuWkNlbGt1KHJhZGVrLmNfY2Vsa2VtX20sIHJhZGVrLmRhbl9wcm9jKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsuY196YWtfbSA9IG5ldyBEZWNpbWFsKHJhZGVrLmNfY2Vsa2VtX20pLm1pbnVzKHJhZGVrLmNfZGFuX20pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhZGVrO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBwcmVwb2N0aUNhc3RreSh6ZHJvajogc3RyaW5nLCByb3c6IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tkcGV0RHRvKTogSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rZHBldER0bz4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRydWhEb2tsYWR1ID0gdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoXCJkcnVoX2Rva1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKS5kcnVoX2RvazsgLy8wIC0gZGFub3bDvSAvIDEwIC0gbmVkYW5vdnkgLyAyMCAtIHpqLiBkYW5vdnlcclxuXHJcbiAgICAgICAgICAgIC8vYWt0dcOhbG7DrSDFmcOhZGVrIHMga3RlcsO9bSBwYXJjdWppXHJcbiAgICAgICAgICAgIGxldCByYWRlayA9IHJvdztcclxuXHJcbiAgICAgICAgICAgIC8vbXVsIC0gbsOhc29iZW7DrVxyXG4gICAgICAgICAgICAvL3N1YiAtIG1pbnVzXHJcbiAgICAgICAgICAgIC8vZGl2IC0gZMSbbGVuw61cclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoemRyb2opIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJjX2Rhbl9tXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kb3RhekNEYW5NKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGYpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRlay52a2xhZF9jYXN0a2EgPSBmO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrLmNfZGFuX20gPSByYWRlay5jX2Rhbl9tID09IG51bGwgPyBuZXcgRGVjaW1hbCgwKSA6IHJhZGVrLmNfZGFuX207XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRlay5jX2RhbiA9IHRoYXQuemFva3JvdWhsaU5hRHZlKERlY2ltYWwubXVsKHJhZGVrLmt1cnohLCByYWRlay5jX2Rhbl9tKSk7Ly8gemFvcmtvdWhsaSBuYSAyXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrLnZrbGFkX2Nhc3RrYSA9PT0gXCJaXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRlay5jX3pha19tID0gRGVjaW1hbC5zdWIocmFkZWsuY19jZWxrZW1fbSwgcmFkZWsuY19kYW5fbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsuY196YWsgPSBEZWNpbWFsLnN1YihyYWRlay5jX2NlbGtlbSwgcmFkZWsuY19kYW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmFkZWsudmtsYWRfY2FzdGthID09PSBcIkNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrLmNfY2Vsa2VtX20gPSBEZWNpbWFsLmFkZChyYWRlay5jX3pha19tLCByYWRlay5jX2Rhbl9tKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRlay5jX2NlbGtlbSA9IERlY2ltYWwuYWRkKHJhZGVrLmNfemFrLCByYWRlay5jX2Rhbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5kb3BsbkNhc3RreUNlbGtlbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUocmFkZWspO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJjX2NlbGtlbVwiOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICByYWRlay5jX2NlbGtlbSA9IHJhZGVrLmNfY2Vsa2VtID09IG51bGwgPyBuZXcgRGVjaW1hbCgwKSA6IHJhZGVrLmNfY2Vsa2VtO1xyXG4gICAgICAgICAgICAgICAgICAgIHJhZGVrLnZrbGFkX2Nhc3RrYSA9IFwiQ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJhZGVrLmNfY2Vsa2VtX20gPSB0aGF0Lnphb2tyb3VobGlOYUR2ZShEZWNpbWFsLmRpdihyYWRlay5jX2NlbGtlbSwgcmFkZWsua3VyeiEpKTsgLy8gemFva3JvdWhsaSBuYSAyICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJjX2NlbGtlbV9tXCI6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGVrLmNfY2Vsa2VtX20gPSByYWRlay5jX2NlbGtlbV9tID09IG51bGwgPyBuZXcgRGVjaW1hbCgwKSA6IHJhZGVrLmNfY2Vsa2VtX207XHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWsudmtsYWRfY2FzdGthID0gXCJDXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWsuY19jZWxrZW0gPSB0aGF0Lnphb2tyb3VobGlOYUR2ZShEZWNpbWFsLm11bChyYWRlay5jX2NlbGtlbV9tLCByYWRlay5rdXJ6ISkpOyAvLyB6YW9rcm91aGxpIG5hIDIgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBcImNfemFrXCI6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGVrLmNfemFrID0gcmFkZWsuY196YWsgPT0gbnVsbCA/IG5ldyBEZWNpbWFsKDApIDogcmFkZWsuY196YWs7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWsudmtsYWRfY2FzdGthID0gXCJaXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWsuY196YWtfbSA9IHRoYXQuemFva3JvdWhsaU5hRHZlKERlY2ltYWwuZGl2KHJhZGVrLmNfemFrLCByYWRlay5rdXJ6ISkpOyAvLyB6YW9rcm91aGxpIG5hIDJcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBcImNfemFrX21cIjpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWsuY196YWtfbSA9IHJhZGVrLmNfemFrX20gPT0gbnVsbCA/IG5ldyBEZWNpbWFsKDApIDogcmFkZWsuY196YWtfbTtcclxuICAgICAgICAgICAgICAgICAgICByYWRlay52a2xhZF9jYXN0a2EgPSBcIlpcIjtcclxuICAgICAgICAgICAgICAgICAgICByYWRlay5jX3phayA9IHRoYXQuemFva3JvdWhsaU5hRHZlKERlY2ltYWwubXVsKHJhZGVrLmNfemFrX20sIHJhZGVrLmt1cnohKSk7IC8vIHphb2tyb3VobGkgbmEgMlxyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBcImRhbl9za3VwXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWsuZGFuX3R5cCA9IChyYWRlay5kYW5fc2t1cCA9PT0gMTApID8gMCA6IHJhZGVrLmRhbl90eXA7IC8vIG9zdm9ib3plbm9cclxuICAgICAgICAgICAgICAgICAgICB2YXIga2F0ID0gdGhhdC5la29jZGF0LmZpbmQoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIGVsZW1lbnQuZGFuX3R5cCA9PSByYWRlay5kYW5fdHlwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrYXQgIT09IHVuZGVmaW5lZCkgcmFkZWsuZGFuX3R5cF90eHQgPSBrYXQuZGFuX3R5cF90eHQhO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJkYW5fdHlwXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWsuZGFuX3NrdXAgPSAocmFkZWsuZGFuX3NrdXAgPT09IDEwICYmIHJhZGVrLmRhbl90eXAgIT09IDApID8gMCA6IHJhZGVrLmRhbl9za3VwIC8vb3N2b2JvemVubyAvIGJlekRwaFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBrYXQyID0gdGhhdC5wb2tjZGFzLmZpbmQoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIGVsZW1lbnQuZGFuX3NrdXAgPT0gcmFkZWsuZGFuX3NrdXAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGthdDIgIT09IHVuZGVmaW5lZCkgcmFkZWsuZGFuX3NrdXBfdHh0ID0ga2F0Mi5kYW5fc2t1cF90eHQhO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJrdXJ6XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrLnZrbGFkX2Nhc3RrYSA9PT0gXCJaXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsuY196YWsgPSB0aGF0Lnphb2tyb3VobGlOYUR2ZShEZWNpbWFsLm11bChyYWRlay5rdXJ6ISwgcmFkZWsuY196YWtfbSkpOyAvLyB6YW9rcm91aGxpIG5hIDJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmFkZWsudmtsYWRfY2FzdGthID09PSBcIkNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRlay5jX2NlbGtlbSA9IHRoYXQuemFva3JvdWhsaU5hRHZlKERlY2ltYWwubXVsKHJhZGVrLmt1cnohLCByYWRlay5jX2NlbGtlbV9tKSk7IC8vIHphb2tyb3VobGkgbmEgMlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1cIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJtam1cIjpcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmFkZWsubSAhPSBudWxsICYmIHJhZGVrLm1qbSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXcgRGVjaW1hbChyYWRlay5tKS5pc1plcm8oKSB8fCBuZXcgRGVjaW1hbChyYWRlay5tam0pLmlzWmVybygpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrLnZrbGFkX2Nhc3RrYSA9IHRoYXQucG9rUGFyYW1zLkhwbFJhZERva0NqZSA9PSAxMDAgPyBcIkNcIiA6IFwiWlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrLnZrbGFkX2Nhc3RrYSA9PT0gXCJaXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsuY196YWtfbSA9IHRoYXQuemFva3JvdWhsaU5hRHZlKERlY2ltYWwubXVsKHJhZGVrLm0sIHJhZGVrLm1qbSkpOyAvLyB6YW9rb3J1aGxpIG5hIDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRlay5jX3phayA9IHRoYXQuemFva3JvdWhsaU5hRHZlKERlY2ltYWwubXVsKHJhZGVrLmt1cnohLCByYWRlay5jX3pha19tKSk7IC8vIHphb2tyb3VobGkgbmEgMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1lbmEgIT0gMCkgeyAvL2NpesOtIG3Em25hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmV3IERlY2ltYWwocmFkZWsubWptX2N6ayEpLmlzWmVybygpKSAvLyBtw6FtIHByb2Rlam7DrSBjZW51IHogbWFqZXRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRlay5jX3phayA9IHRoYXQuemFva3JvdWhsaU5hRHZlKERlY2ltYWwubXVsKHJhZGVrLm0sIHJhZGVrLm1qbV9jemshKSk7IC8vIHphb2tyb3VobGkgbmEgMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmFkZWsudmtsYWRfY2FzdGthID09PSBcIkNcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRlay5jX2NlbGtlbV9tID0gdGhhdC56YW9rcm91aGxpTmFEdmUoRGVjaW1hbC5tdWwocmFkZWsubSwgcmFkZWsubWptKSk7IC8vIHphb2tyb3VobGkgbmEgMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrLmNfY2Vsa2VtID0gdGhhdC56YW9rcm91aGxpTmFEdmUoRGVjaW1hbC5tdWwocmFkZWsua3VyeiEsIHJhZGVrLmNfY2Vsa2VtX20pKTsgLy8gemFva3JvdWhsaSBuYSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubWVuYSAhPSAwKSB7IC8vY2l6w60gbcSbbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXcgRGVjaW1hbChyYWRlay5tam1fY3prISkuaXNaZXJvKCkpIC8vIG3DoW0gcHJvZGVqbsOtIGNlbnUgeiBtYWpldGt1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrLmNfY2Vsa2VtID0gdGhhdC56YW9rcm91aGxpTmFEdmUoRGVjaW1hbC5tdWwocmFkZWsubSwgcmFkZWsubWptX2N6ayEpKTsgLy8gemFva3JvdWhsaSBuYSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJtYWpcIjpcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmFkZWsubSA9PSBudWxsIHx8IHJhZGVrLm1qbSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWsudmtsYWRfY2FzdGthID0gdGhhdC5wb2tQYXJhbXMuSHBsUmFkRG9rQ2plID09IDEwMCA/IFwiQ1wiIDogXCJaXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrLnZrbGFkX2Nhc3RrYSA9PT0gXCJaXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsuY196YWtfbSA9IHRoYXQuemFva3JvdWhsaU5hRHZlKERlY2ltYWwubXVsKHJhZGVrLm0sIHJhZGVrLm1qbSkpOyAvLyB6YW9rb3J1aGxpIG5hIDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsuY196YWsgPSB0aGF0Lnphb2tyb3VobGlOYUR2ZShEZWNpbWFsLm11bChyYWRlay5rdXJ6ISwgcmFkZWsuY196YWtfbSkpIC8vIHphb2tyb3VobGkgbmEgMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tZW5hICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrLmNfemFrID0gdGhhdC56YW9rcm91aGxpTmFEdmUoRGVjaW1hbC5tdWwocmFkZWsubSwgcmFkZWsubWptX2N6ayEpKTsgLy8gZHLFvsOtbSDEjWVza291IHByb2Rlam7DrSBjZW51XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJhZGVrLnZrbGFkX2Nhc3RrYSA9PT0gXCJDXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsuY19jZWxrZW1fbSA9IHRoYXQuemFva3JvdWhsaU5hRHZlKERlY2ltYWwubXVsKHJhZGVrLm0sIHJhZGVrLm1qbSkpOyAvLyB6YW9rcm91aGxpIG5hIDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsuY19jZWxrZW0gPSB0aGF0Lnphb2tyb3VobGlOYUR2ZShEZWNpbWFsLm11bChyYWRlay5rdXJ6ISwgcmFkZWsuY19jZWxrZW1fbSkpOyAvLyB6YW9rcm91aGxpIG5hIDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubWVuYSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRlay5jX2NlbGtlbSA9IHRoYXQuemFva3JvdWhsaU5hRHZlKERlY2ltYWwubXVsKHJhZGVrLm0sIHJhZGVrLm1qbV9jemshKSk7IC8vIGRyxb7DrW0gxI1lc2tvdSBwcm9kZWpuw60gY2VudVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICByYWRlay5kYW5fc2t1cCA9IChyYWRlay5kYW5fc2t1cCA9PT0gMTAgJiYgcmFkZWsuZGFuX3R5cCAhPT0gMCkgPyAwIDogcmFkZWsuZGFuX3NrdXAgLy9vc3ZvYm96ZW5vIC8gYmV6RHBoXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGthdDIgPSB0aGF0LnBva2NkYXMuZmluZChmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudC5kYW5fc2t1cCA9PSByYWRlay5kYW5fc2t1cCB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoa2F0MiAhPT0gdW5kZWZpbmVkKSByYWRlay5kYW5fc2t1cF90eHQgPSBrYXQyLmRhbl9za3VwX3R4dCE7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICByYWRlay5kYW5fdHlwID0gKHJhZGVrLmRhbl9za3VwID09PSAxMCkgPyAwIDogcmFkZWsuZGFuX3R5cDsgLy8gb3N2b2JvemVub1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBrYXQgPSB0aGF0LmVrb2NkYXQuZmluZChmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudC5kYW5fdHlwID09IHJhZGVrLmRhbl90eXAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGthdCAhPT0gdW5kZWZpbmVkKSByYWRlay5kYW5fdHlwX3R4dCA9IGthdC5kYW5fdHlwX3R4dCE7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoemRyb2opIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJrdXJ6XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kb3BvY3RpQ2FzdGt5KHJhZGVrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmRvcGxuQ2FzdGt5Q2Vsa2VtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJkYW5fdHlwXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGFuX3NrdXBcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJjX2NlbGtlbVwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcImNfY2Vsa2VtX21cIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJjX3pha1wiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcImNfemFrX21cIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJtXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibWptXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibWFqXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kb3BvY3RpQ2FzdGt5KHJhZGVrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmRvcGxuQ2FzdGt5Q2Vsa2VtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB6bWVuRGFuZUdyaWRGb3JtYXQoaGlkZGVuOiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHpvYnJhekNpemlNZW5hID0gdGhpcy5tZW5hICE9IDA7XHJcblxyXG4gICAgICAgICAgICBsZXQgZ3JpZEZvcm1hdCA9IHRoYXQuZ3JpZC5nZ3JpZChcIm9wdGlvblwiLCBcImNvbHVtbnNcIikgYXMgR29yZGljLkRhdGEuR3JpZEZvcm1hdDtcclxuICAgICAgICAgICAgaWYgKGdyaWRGb3JtYXQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzbG91cGVjQ1pha00gPSBncmlkRm9ybWF0LmdldChcImNfemFrX21cIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xvdXBlY0NaYWsgPSBncmlkRm9ybWF0LmdldChcImNfemFrXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzbG91cGVjQ0Rhbk0gPSBncmlkRm9ybWF0LmdldChcImNfZGFuX21cIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xvdXBlY0NEYW4gPSBncmlkRm9ybWF0LmdldChcImNfZGFuXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc2xvdXBlY1Byb0RhbiA9IGdyaWRGb3JtYXQuZ2V0KFwiZGFuX3Byb2NcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xvdXBlY0RhblR5cCA9IGdyaWRGb3JtYXQuZ2V0KFwiZGFuX3R5cF90eHRcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xvdXBlY0RhblNrdXAgPSBncmlkRm9ybWF0LmdldChcImRhbl9za3VwX3R4dFwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHpvYnJhekNpemlNZW5hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsb3VwZWNDWmFrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG91cGVjQ1phay5oaWRkZW4gPSBoaWRkZW47XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2xvdXBlY0NEYW4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsb3VwZWNDRGFuLmhpZGRlbiA9IGhpZGRlbjtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3VwZWNDWmFrTSlcclxuICAgICAgICAgICAgICAgICAgICBzbG91cGVjQ1pha00uaGlkZGVuID0gaGlkZGVuO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzbG91cGVjQ0Rhbk0pXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdXBlY0NEYW5NLmhpZGRlbiA9IGhpZGRlbjtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3VwZWNQcm9EYW4pXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdXBlY1Byb0Rhbi5oaWRkZW4gPSBoaWRkZW47XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3VwZWNEYW5UeXApXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdXBlY0RhblR5cC5oaWRkZW4gPSBoaWRkZW47XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3VwZWNEYW5Ta3VwKVxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3VwZWNEYW5Ta3VwLmhpZGRlbiA9IGhpZGRlbjtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwib3B0aW9uXCIsIFwiY29sdW1uc1wiLCBncmlkRm9ybWF0KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rZHBldER0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tkcGV0RHRvPigpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VGdW5jdGlvbiA9IGZ1bmN0aW9uIChmaWVsZE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5zZXRWYWx1ZUNhc3RrYVJ1bm5pbmcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFZhbHVlQ2FzdGthUnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByYWRlayA9IHRoYXQuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJlcG9jdGlDYXN0a3koZmllbGROYW1lLCByYWRlaylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSB0aGF0LmdyaWQuZ2dyaWQ8SHBsLkludGVyZmFjZS5HUG9rZHBldER0bz4oXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXhSYWRlayA9IHZpZXcuaW5kZXhPZihyYWRlayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld1tpbmRleFJhZGVrXSA9IGY7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiLCBmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRWYWx1ZUNhc3RrYVJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCB6b2JyYXpEYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYodGhhdC5tb2RlbClcclxuICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuZHJ1aF9kb2sgIT09IDEwO1xyXG4gICAgICAgICAgICBsZXQgem9icmF6Q2l6aU1lbmEgPSB0aGlzLm1lbmEgIT0gMDtcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuXHJcbiAgICAgICAgICAgICAgICBhZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfZ3JpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiAoY3R4KSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInVpLWRpc2FibGVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChyb3c6IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tkcGV0RHRvKTogSWNvblRlbXBsYXRlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyb3cuYWt0aXZpdGEpIHsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgOTAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsIHRleHQ6IFwiXCIsIHRvb2x0aXA6IFwiXCIgfTsgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImdpbi9uaWNcIiwgdGV4dDogXCJcIiwgdG9vbHRpcDogXCJcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbihcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCIjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMCxcclxuICAgICAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiAoY3R4KSA9PiB7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidWktZGlzYWJsZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwia29kX2tvblwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMTM1XCIsIC8vUkMgMzEzMDIxMzUgOiBLw7NkIHDFmWVka29udGFjZVxyXG4gICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMCwgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlckl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5rb2Rfa29uICsgXCIgLSBcIiArIHZhbHVlLm5hemV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19rb249dmFsdWUuaXhzX2tvbjttb2RlbC5rb2Rfa29uPXZhbHVlLmtvZF9rb25cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia29kX2tvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyBpeHNfdnBrOiB0aGF0Lml4c1Zwaywga3RnX3R5cDogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwia3RnX3R5cFwiLCAobXc6IGFueSkgPT4geyByZXR1cm4gbXcua3RnX3R5cCB9LCB0cnVlLCBmYWxzZSwgdGhpcy5lbGVtZW50KSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vemF0w61tIGZ1bmd1amUsIGFsZSDEjWFzZW0gbmVtdXPDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBQYXJhbXNKU09OID0geyBpeHNWcGs6IHRoYXQuaXhzVnBrLCBrdGdUeXA6IHRoYXQuZWxlbWVudC5maW5kRmllbGRzKFwia3RnX3R5cFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKS5rdGdfdHlwLCBpeHBEZW46IHRoYXQuaXhwRGVuLCB1aWQ6IFwiJ0dQb2tWeWJlcktvbnRhY2VUYWIjJ1wiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tWeWJlcktvbnRhY2VUYWJcIiwgUGFyYW1zSlNPTiwgeyB3aWR0aDogODAwLCBoZWlnaHQ6IDgwMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIGRhdGEpIHsgLy8gcG90w6kgY28gc2Ugb2tubyB6YXbFmWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmo6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gY2hhbmdlT2JqLnZhbHVlLm5hemV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByYWRlayA9IHRoYXQuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYWxsKFwiVnlwbG5VY2V0bmlWZXR1XCIsIHsgaXhzS29uOiBjaGFuZ2VPYmoudmFsdWUuaXhzX2tvbiwga3RnRG9rOiB0aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcImt0Z190eXBcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikua3RnX3R5cCwgenB1c1BsYXRieTogdGhhdC5lbGVtZW50LmZpbmRGaWVsZHMoXCJ6cHVzX3BsYXRieVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKS56cHVzX3BsYXRieSwgcmFkZWs6IHJhZGVrIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyb3c6IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tkcGV0RHRvKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva2RwZXREdG8+KFwiZ2V0Vmlld1wiKS51cGRhdGVEYXRhKHJvdywgXCJ1cGRhdGVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSB0aGF0LmdyaWQuZ2dyaWQ8SHBsLkludGVyZmFjZS5HUG9rZHBldER0bz4oXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmRleFJhZGVrID0gdmlldy5pbmRleE9mKHJhZGVrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdbaW5kZXhSYWRla10gPSByb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIsIHJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBHb3JkaWMuUHJlZmFicy5TZWxlY3QucG9rc2tvbkxrKCldXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwb2tza29uX25hemV2XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzEzMDIxMzZcIiwgLy9SQyAzMTMwMjEzNiA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidWktZGlzYWJsZWRcIixcclxuICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc3RyaW5nYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb2tza29uX25hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1aS1zdGF0ZS1kaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfV0sXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMDEzXCIsIC8vUkMgMzEzMDIwMTMgOiBQb3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyAvL2Rhbm92ZVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYW5fc2t1cF90eHRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjEzN1wiLCAvL1JDIDMxMzAyMTM3IDogRGHFiC4gc2t1cGluYVxyXG4gICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLCAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhbl9za3VwX3R4dFwiLCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogY2hhbmdlRnVuY3Rpb24oXCJkYW5fc2t1cFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiZGFuX3NrdXA9ZGFuX3NrdXA7ZGFuX3NrdXBfdHh0PWRhbl9za3VwX3R4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgR29yZGljLlByZWZhYnMuU2VsZWN0LnBva2NkYXMoKV1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46ICF6b2JyYXpEYW5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgLy9kYW5vdmVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhbl90eXBfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMTM4XCIsIC8vUkMgMzEzMDIxMzggOiBUeXAgZGFuxJtcclxuICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhbl90eXBfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IGRhbl90eXA6IFswLCAxMCwgMjBdIH0sIC8vemF0w61tIG5hdHZyZG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogY2hhbmdlRnVuY3Rpb24oXCJkYW5fdHlwXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiZGFuX3R5cD1kYW5fdHlwO2Rhbl90eXBfdHh0PWRhbl90eXBfdHh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb2NkYXQoKV1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbjogIXpvYnJhekRhblxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL211c8OtbSBwb3XFvsOtdCBlZGl0b3ZhdGVsbsOpIHBvbGUsIGtkecW+IGplIG5lZWRpdG92YXRlbG7DqSB0YWsgc2UgdGFtIG5lZG9wbMWIdWplIGhvZG5vdGEgcG9tb2NpIG1vZGVsIGFwcGx5XHJcbiAgICAgICAgICAgICAgICAvL2tkecW+IHBvdcW+aWppIGRpc2FibGVkIHRydWUgdGFrIHZ6aGxlZCBwb2zDrcSNa2EgamUgamFrbyBlZGl0b3ZhdGVsbsOpIGFsZSBuaWMgdGFtIHBzw6F0IG5lamRlXHJcbiAgICAgICAgICAgICAgICAvL3ByYXZkxJtwb2RvYm7EmyByZWFkZXIgbmEgZWtvY2RhcFxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7IC8vZGFub3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYW5fcHJvY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjEzOVwiLCAvL1JDIDMxMzAyMTM5IDogJURQSFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1aS1kaXNhYmxlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYW5fcHJvY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuZGFuX3Byb2M9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidWktZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuZGVjaW1hbCgpXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiAhem9icmF6RGFuXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMTE4XCIsICAgLy9kb3TDoWhub3V0IG7DoXpldiAgIEdIcGxDb21tb24uVXNlclByb2Nlc3MuQ29uZmlndXJhdGlvbi5HZXREYXRhYmFzZVNob3J0Y3V0KFwibmtzXCIpICAgIC8vUkMgMzEzMDIxMTggOiBOS1MgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaWNvPXZhbHVlLmljbyxtb2RlbC5ua3M9dmFsdWUubmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IGljbzogdGhpcy5ncGMuaWNvIH0sICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3Nua3MoKV1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9ncmlkRm9ybWF0LmFkZFNvcnRlZEVrb0NmdVNldCh0aGlzLCB0cnVlKTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRTb3J0ZWRFa29DZnVTZXQodGhpcyx0cnVlKTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGREZWNpbWFsQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMTQwXCIsIC8vUkMgMzEzMDIxNDAgOiBNbm/FvnN0dsOtXHJcbiAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogICAgICAgICAgICAgICAgICAgICAgICAvL3BvxZllxaFpdCBtYXhpbcOhbG7DrSBtb8W+bsOpIGRvc3R1cG7DqSBtbm/FvnN0dsOtIG1hamV0a3VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VGdW5jdGlvbihcIm1cIilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwubT12YWx1ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgR29yZGljLlByZWZhYnMuTnVtYmVyLmRlY2ltYWwoKV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1qXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMTQxXCIsIC8vUkMgMzEzMDIxNDEgOiBNxJtybsOhIGplZG5vdGthXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLCAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtalwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwubWo9dmFsdWUubWpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY21laigpXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1qbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjE0MlwiLCAvL1JDIDMxMzAyMTQyIDogQ2VuYS9qZWRub3RrdVxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1qbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBjaGFuZ2VGdW5jdGlvbihcIm1cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5tam09dmFsdWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1qbV9jemtcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkNlbmEvamVkbm90a3UgdiBDWktcIixcclxuICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IChjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidWktZGlzYWJsZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbjogIXpvYnJhekNpemlNZW5hXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY196YWtfbVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMTQ0XCIgKyB0aGlzLm1lbmFaa3IsIC8vUkMgMzEzMDIxNDQgOiBaw6FrbGFkIHYgXHJcbiAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfemFrX21cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBjaGFuZ2VGdW5jdGlvbihcImNfemFrX21cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmNfemFrX209dmFsdWVcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGhpZGRlbjogIXpvYnJhekRhblxyXG4gICAgICAgICAgICB9KSAvL2Rhbm92ZSAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kYW5fbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjE0NVwiICsgdGhpcy5tZW5hWmtyLCAvL1JDIDMxMzAyMTQ1IDogRGHFiCB2IFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZGFuX21cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogY2hhbmdlRnVuY3Rpb24oXCJjX2Rhbl9tXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuY19kYW5fbT12YWx1ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiAhem9icmF6RGFuXHJcbiAgICAgICAgICAgICAgICB9KSAvL2Rhbm92ZVxyXG5cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfY2Vsa2VtX21cIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjE0NlwiICsgdGhpcy5tZW5hWmtyLCAvL1JDIDMxMzAyMTQ2IDogQ2Vsa2VtIHYgXHJcbiAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19jZWxrZW1fbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiB0aGlzLmdsb2JhbFNldHRpbmdzIS5nZXQoXCJQb2suTmFzdGF2ZW5pLk1hemF0QmV6Q2FzdGt5XCIpID8gW10gOiBbbmV3IFZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogY2hhbmdlRnVuY3Rpb24oXCJjX2NlbGtlbV9tXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5jX2NlbGtlbV9tPXZhbHVlXCJcclxuICAgICAgICAgICAgICAgICAgICB9LCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoem9icmF6Q2l6aU1lbmEpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3VyelwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjE0N1wiLCAvL1JDIDMxMzAyMTQ3IDogS3VyelxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdXJ6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGNoYW5nZUZ1bmN0aW9uKFwia3VyelwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmt1cno9dmFsdWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuZGVjaW1hbCgzKSwgeyBmaXhlZDogdHJ1ZSwgcmV0dXJuVHlwZTogXCJkZWNpbWFsXCIsIHRob3VzYW5kc1NlcGFyYXRvcjogJycgfV1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbjogIXpvYnJhekNpemlNZW5hXHJcbiAgICAgICAgICAgICAgICB9KSAvL2NpemkgbWVuYSBhIGRhbm92ZVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196YWtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMTQ0XCIgKyBcIkNaS1wiLCAvL1JDIDMxMzAyMTQ0IDogWsOha2xhZCB2IC8vw7rEjWV0bsOtIG3Em25hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IChjdHgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ1aS1kaXNhYmxlZFwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfemFrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBjaGFuZ2VGdW5jdGlvbihcImNfemFrXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmNfemFrPXZhbHVlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgaGlkZGVuOiAhKHpvYnJhekNpemlNZW5hICYmIHpvYnJhekRhbilcclxuICAgICAgICAgICAgICAgICAgICB9KSAvL2NpemkgbWVuYVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kYW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMTQ1XCIgKyBcIkNaS1wiLCAvL1JDIDMxMzAyMTQ1IDogRGHFiCB2IC8vIMO6xI1ldG7DrSBtxJtuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiAoY3R4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidWktZGlzYWJsZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZGFuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBjaGFuZ2VGdW5jdGlvbihcImNfZGFuXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmNfZGFuPXZhbHVlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW46ICEoem9icmF6Q2l6aU1lbmEgJiYgem9icmF6RGFuKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pIC8vY2l6aSBtZW5hIGEgZGFub3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2NlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzEzMDIxNDZcIiArIFwiQ1pLXCIsIC8vUkMgMzEzMDIxNDYgOiBDZWxrZW0gdiAvL8O6xI1ldG7DrSBtxJtuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiAoY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ1aS1kaXNhYmxlZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19jZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGNoYW5nZUZ1bmN0aW9uKFwiY19jZWxrZW1cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuY19jZWxrZW09dmFsdWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGRlbjogIXpvYnJhekNpemlNZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzEzMDIxMzBcIiwgLy9SQyAzMTMwMjEzMCA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc3RyaW5nYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
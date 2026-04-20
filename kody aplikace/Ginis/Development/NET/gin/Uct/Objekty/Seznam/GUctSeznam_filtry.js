"use strict";
var Gordic;
(function (Gordic) {
    var Uct;
    (function (Uct) {
        var WebClient;
        (function (WebClient) {
            var Seznam;
            (function (Seznam) {
                /**
                 * export function CreateFilterForm
                 *  Vytvoreni filtrovaciho formulare
                 * @param {GContent} content
                 * @returns {any}
                 */
                function CreateFilterForm(content, dokumentParams) {
                    return [
                        _CreateFilterZalozkaObecna(content),
                        _CreateFilterZalozkaStavy(content),
                        _CreateFilterZalozkaUcetniZapisy(content),
                        _CreateFilterZalozkaKHDPH(content),
                        _CreateFilterVlastnosti(content),
                        _CreateFilterDokument(content, dokumentParams)
                    ];
                }
                Seznam.CreateFilterForm = CreateFilterForm;
                /**
                * function _CreateFilterZalozkaObecna
                *
                * Obecna zalozka
                * @param {GContent} content
                * @returns {any}
                */
                function _CreateFilterZalozkaObecna(content) {
                    //var that = this;
                    var filterFormDef = new Gordic.Forms.Form({ opened: true, layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1", tabLabel: "jres:30250676" }) //RC 30250676 : Obecná
                        .addSection()
                        .addField('gstringbox', Gordic.Prefabs.String.ixs(true), { name: "ixp" })
                        //.addRow("jres:30250026").addField("gstringbox", { name: "ixp" }) //RC 30250026 : Identifikátor
                        .addRow("jres:30250093").addField(//RC 30250093 : Typ dokladu
                    "gselectbox", Gordic.Prefabs.Select.sslstyp(), {
                        name: "ixs_typ",
                        model: "model.ixs_typ=value.ixs_typ",
                        multi: false, //vyhledani z vice hodnot (IN)
                        serverFilters: {
                            PouzeUCT: 1,
                            //typ_ag: 40,
                        },
                    })
                        .addRow("jres:30250094") //RC 30250094 : Druh dokladu
                        .addField("gselectbox", Gordic.Prefabs.Select.ekocdrd() /*Gordic.Prefabs.Select.ekocdrdRoz()*/, {
                        dropdown: true,
                        name: "drd",
                        model: "model.drd=value.drd",
                        serverFilters: {
                            drd: [0, 1, 4, 5],
                        },
                    })
                        .addRow("jres:30250116").addField("gselectbox", //RC 30250116 : Účtárna
                    Gordic.Prefabs.Select.ekosuus(), {
                        name: "uus", dropdown: false,
                        model: "model.ico1=value.ico;model.ucs1=value.ucs;model.uus=value.uus",
                        itemTemplate: "{uus:trim:encode}",
                        serverFilters: {
                            rok_od: "<= " + content.Globals.EkoParams?.Rok,
                            rok_do: ">= " + content.Globals.EkoParams?.Rok,
                            aktivita: 100,
                            ico: content.Globals.EkoParams?.ICO,
                            ucs: content.Globals.EkoParams?.UCS,
                        },
                    })
                        .addRow("jres:30250213").addField("gselectbox", "w-5", //RC 30250213 : Subřada
                    Gordic.Prefabs.Select.uctddde(), {
                        name: "subrada",
                        model: "model.ico2=value.ico;model.rok2=value.rok;model.subrada=value.subrada",
                        serverFilters: {
                            aktivita: 100,
                            ico: content.Globals.EkoParams?.ICO,
                            rok: content.Globals.EkoParams?.Rok,
                        },
                    })
                        //.addField(" ", "w-1")
                        .addRow({ name: 'int_dok' })
                        .addField("gcheck" /*, "w-6"*/, { name: "int_dok", label: "jres:30250214", initialValue: false, emptyValue: false }) //RC 30250214 : Interní daňový doklad
                        .addSection()
                        // druhy sloupec
                        //--------------
                        .addRow({ name: 'vlastni_doklady' })
                        .addField("gcheck", { name: "vlastni_doklady", label: "jres:30250271", initialValue: false, emptyValue: false }) //RC 30250271 : Vlastní doklady
                        .addRow("jres:30250211").addField("gselectbox", "w-8", //RC 30250211 : Zpracovatel
                    Gordic.Prefabs.Select.ginsfun(), {
                        name: "ixs_fun_cil" //model: "model.ixs_fun=value.ixs_fun",
                        //model: "model.ixs_fun_cil=value.ixs_fun_cil",
                        ,
                        model: "ixs_fun_cil=ixs_fun;ixs_fun_txt=nazev;ixs_fun_ref_txt=nazev_ref;ixs_fun_su_txt=nazev_su"
                        //pathInModel: "model.ixs_fun_cil",
                        ,
                        serverFilters: {
                            aktivita: 100,
                            DlePovolenychAgend: true,
                            //VrfuTypAg: "BBD",
                            VrfuAktivita: 100,
                            VrfuIxpDen: content.Globals.EkoParams.IxpDen, //content.serverContext.ixp_den,
                            VrfuSubrada: content.Globals.EkoParams.Subrada,
                            // TODO: Zkontrolovat
                        },
                    }) // historie
                        .addField("gcheck", "w-4", { name: "fun_hist", label: "jres:30250212", initialValue: false, /*, modelDefaults: false,*/ emptyValue: false }) //RC 30250212 : Historie
                        //.addSection()
                        .addRow("jres:30250091").addField("gselectbox", //RC 30250091 : Realizátor
                    Gordic.Prefabs.Select.ekosrea(), {
                        name: "cis_real", dropdown: false,
                        model: "ico3=ico; cis_real=cis_real;cis_real_txt=nazev",
                        serverFilters: {
                            aktivita: 100,
                            ico: content.Globals.EkoParams?.ICO,
                        },
                    })
                        .addRow("jres:30250090").addField("gselectbox", //RC 30250090 : Kompetent
                    Gordic.Prefabs.Select.ekoskom(), {
                        name: "ixs_fun_vyriz",
                        model: "model.ico4=value.ico;model.ixs_fun_vyriz=value.ixs_fun",
                        serverFilters: {
                            aktivita: 100,
                            priz_kom: 10,
                            ico: content.Globals.EkoParams?.ICO,
                        },
                    })
                        .addSection()
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "string",
                        label: "jres:30250031" //RC 30250031 : Agendové číslo od-do
                        ,
                        name: "ac_ag",
                        pathInModel: "model.ac_ag",
                        emptyValue: null
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "string",
                        label: "jres:30250543" //RC 30250543 : Evidenční číslo od-do
                        ,
                        name: "ac",
                        pathInModel: "model.ac",
                        emptyValue: null
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "string",
                        label: "jres:30250215" //RC 30250215 : Číslo dokladu o zaúčtování od-do
                        ,
                        name: "ac_ixe",
                        pathInModel: "model.ac_ixe",
                        emptyValue: null
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "jres:30250018" //RC 30250018 : Částka od-do
                        ,
                        name: "c",
                        pathInModel: "model.c",
                        emptyValue: null,
                        customOptAll: { decimals: 2, returnType: "decimal", thousandsSeparator: ' ', fixed: false, }
                    }))
                        .addRow("jres:30250163" /*, "w-L-4 w-M-4 w-S-12"*/) //RC 30250163 : Bankovní účet, Účet SU / AU 
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosuvl(), {
                        //customClass: "w-4",
                        name: "bu_vl",
                        model: "model.rok10=value.rok;model.bu_vl=value.bu_vl; model.sk_vl=value.sk_vl",
                        serverFilters: {
                            aktivita: [100],
                            rok: content.Globals.EkoParams?.Rok,
                            ucs: content.Globals.EkoParams?.UCS,
                            ico: content.Globals.EkoParams?.ICO,
                            aktivniRozpoctovyReprezentant: 1,
                        },
                    })
                        .addSection()
                        //.addPrefab(Gordic.Gin.Prefabs.interval(
                        //    {
                        //        type: "number"
                        //        , label: "jres:30250187" //RC 30250187 : Rok
                        //        , name: "rok"
                        //        , pathInModel: "model.rok"
                        //        , emptyValue: null
                        //    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "jres:30250186" //RC 30250186 : Měsíc od-do
                        ,
                        name: "mesic",
                        pathInModel: "model.mesic",
                        emptyValue: null
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "jres:30250185" //RC 30250185 : Den od-do
                        ,
                        name: "den",
                        pathInModel: "model.den",
                        emptyValue: null
                    }))
                        .addRow("jres:30250216").addField("gnumberbox", Gordic.Prefabs.Number.decimal(0), //RC 30250216 : Posledních
                    {
                        name: "num_row",
                        returnType: "number",
                        step: 10,
                        minValue: 0,
                        emptyValue: null
                        //,defaultValue: null
                        //, label: "jres:30250216" //RC 30250216 : Posledních
                    })
                        //                .addSection()
                        .addSection({ customClass: "w-L-12 w-M-12 w-S-12" })
                        .addRow("jres:30250115").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "popis_doklad"
                    }) //RC 30250115 : Popis dokladu
                        //.addSection({ customClass: "w-L-12 w-M-12 w-S-12" })
                        .addRow("jres:30250218").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "poznamka_ixp"
                    }) //RC 30250218 : Poznámka dokladu
                        // ks_db
                        // TODO: Klicova slova???
                        .addRow("jres:30250795").addField("gselectbox", Gordic.Prefabs.Select.wflKlicSlova(), {
                        name: "ks_db",
                        placeholder: "jres:30250796", //RC 30250796 : Zadejte klíčová slova
                        //model: "model.ks_db=value.ks_db",
                        model: "model.ks_db=value.kl_slovo",
                        multi: true,
                        dropdown: true,
                        showSelectButton: true,
                        verticalButtons: false,
                    });
                    return filterFormDef;
                }
                /**
                 * function _CreateFilterZalozkaStavy
                 *  Zalozka stavy
                 * @type {function (content:GContent):any {}
                 */
                function _CreateFilterZalozkaStavy(content) {
                    var filterFormDef = new Gordic.Forms.Form({ opened: false, layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1", tabLabel: "jres:30250219" }) //RC 30250219 : Stavy
                        .addSection("jres:30250220") //RC 30250220 : Stavy dokladů
                        .addRow("jres:30250241").addField("gselectbox", {
                        name: "s_zau", multi: false, list: false, itemWidth: "",
                        dropdown: true
                        //, model: "model.s_zau=value.s_zau", itemTemplate: "{s_zau_txt}"
                        ,
                        itemTemplate: "{s_zau_txt}",
                        model: "model.s_zau=value.s_zau",
                        helperColumns: ["s_zau_txt"],
                        data: new Gordic.Data.View([
                            { s_zau_txt: "jres:30250223", s_zau: -1 } //RC 30250223 : neurčeno
                            ,
                            { s_zau_txt: "jres:30250222", s_zau: 5 } //RC 30250222 : návrh
                            ,
                            { s_zau_txt: "jres:30250221", s_zau: 700 } //RC 30250221 : nepřipraveno k uzávěrce
                            ,
                            { s_zau_txt: "jres:30250224", s_zau: 800 } //RC 30250224 : neuzavřeno
                            ,
                            { s_zau_txt: "jres:30250225", s_zau: 0 } //RC 30250225 : nezaúčtováno
                            ,
                            { s_zau_txt: "jres:30250226", s_zau: 30 } //RC 30250226 : schváleno
                            ,
                            { s_zau_txt: "jres:30250534", s_zau: 300 } //RC 30250534 : ke schválení
                            ,
                            { s_zau_txt: "jres:30250227", s_zau: 90 } //RC 30250227 : storno
                            ,
                            { s_zau_txt: "jres:30250228", s_zau: 50 } //RC 30250228 : uzavřeno
                            ,
                            { s_zau_txt: "jres:30250229", s_zau: 40 } //RC 30250229 : zaúčtováno
                            ,
                            { s_zau_txt: "jres:30250533", s_zau: 400 } //RC 30250533 : k zaúčtování
                            ,
                            { s_zau_txt: "jres:30250230", s_zau: 10 } //RC 30250230 : zaúčtováno částečně
                        ], { key: "s_zau" })
                    })
                        .addRow("jres:30250239").addField("gselectbox", {
                        name: "stav_evi", multi: false, list: false, itemWidth: "",
                        dropdown: true
                        //, model: "model.s_zau=value.stav_evi", itemTemplate: "{stav_evi_txt}"
                        ,
                        helperColumns: ["stav_evi_txt"],
                        itemTemplate: "{stav_evi_txt}",
                        model: "model.stav_evi=value.stav_evi", initialValue: { stav_evi_txt: "jres:30250231", stav_evi: 10 },
                        data: new Gordic.Data.View([
                            { stav_evi_txt: "jres:30250231", stav_evi: 10 } //RC 30250231 : evidované
                            ,
                            { stav_evi_txt: "jres:30250232", stav_evi: 20 } //RC 30250232 : neevidované
                            ,
                            { stav_evi_txt: "jres:30250233", stav_evi: 30 } //RC 30250233 : aktuálně evidované
                            ,
                            { stav_evi_txt: "jres:30250234", stav_evi: 40 } //RC 30250234 : přeevidované z
                            ,
                            { stav_evi_txt: "jres:30250235", stav_evi: 50 } //RC 30250235 : přeevidované do
                            ,
                            { stav_evi_txt: "jres:30250236", stav_evi: 60 } //RC 30250236 : původní
                        ], { key: "stav_evi" })
                    })
                        //.addSection()
                        .addSection("Zobrazení")
                        .addRow("jres:30250240").addField("gselectbox", {
                        name: "priz_view", multi: false, list: false, itemWidth: "",
                        dropdown: true
                        //, model: "model.s_zau=value.priz_view", itemTemplate: "{priz_view_txt}"
                        ,
                        helperColumns: ["priz_view_txt"],
                        itemTemplate: "{priz_view_txt}",
                        model: "model.priz_view=value.priz_view",
                        emptyValue: null
                        //, modelDefaults: { priz_view_txt: "jres:30250223", priz_view: -1 }//RC 30250270 : Nenastaveno
                        ,
                        data: new Gordic.Data.View([
                            //{ priz_view_txt: "jres:30250223", priz_view: -1 } //RC 30250223 : neurčeno
                            { priz_view_txt: "jres:30250237", priz_view: 0 } //RC 30250237 : přečteno
                            ,
                            { priz_view_txt: "jres:30250238", priz_view: 10 } //RC 30250238 : nepřečteno
                        ], { key: "priz_view" })
                    });
                    return filterFormDef;
                }
                /**
                 * Zalozka Ucetni zapisy
                */
                function _CreateFilterZalozkaUcetniZapisy(content) {
                    //var cfuGF = this.contextProp("cfuGridFormat")
                    var gf = new Gordic.Data.GridFormat();
                    gf.addTextColumn({
                        name: "nks", //Je povinny pro spravne mapovani nazvu property a caption!
                        caption: Gordic.Consts.DbShortcuts.nks,
                        width: 60,
                        /*cellTemplate: "{nks:trim:encode}",
                        
                        cellTemplate: (d) => {
                            debugger;
                            return d.start && d.start ? "=" + d.start : "";
                            return Gordic.Eko.Prefabs.cellTemplate("nks", d);
                        }, */
                        cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("nks", d); }, //Nutne pridat cellTemplate pro spravne zobrazeni hodnoty (lze pouzit default)
                        editor: Gordic.Eko.Filters.nksInterval({
                            ico: content.Globals.EkoParams.ICO, onlyActive: true, aktProhl: 100, caption: Gordic.Consts.DbShortcuts.nks, model: "nks"
                        })
                        /*
                        editor: {
                            widget: "gselectbox",
                            options: $.extend(Gordic.Prefabs.Select.ekosnks(), {
                                name: "nks2"
                                , modelDefaults: { ico: content.CurrentIco, aktivita: "100", aktProhl:100 } as Gordic.Eko.Filters.IGModelDefaults
                                , itemTemplate: "{nks:trim:encode}"
                                , model: "model.nks=value.nks"
                          
                            }
                            )
                        }*/
                    });
                    gf.add(Gordic.Eko.CfuUtils.getCfuSetEditors(content, { checkUete: content.Globals.EkoParams?.PrizCheckUete, wildcard: content.Globals.Others?.Wildcard }));
                    gf.addCurrencyColumn({
                        name: "c0",
                        caption: "jres:30250019", //RC 30250019 : MD
                        width: 120,
                        //cellTemplate: function (dto) { return Gordic.Eko.Filters.Utils.formatIntervalValue(dto.c0); },
                        cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("c0", d); },
                        editor: Gordic.Eko.Filters.decimalInterval({ model: "c0", caption: "MD" })
                    });
                    gf.addCurrencyColumn({
                        name: "c1",
                        caption: "jres:30250131", //RC 30250131 : Dal
                        width: 120,
                        cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("c1", d); },
                        editor: Gordic.Eko.Filters.decimalInterval({ model: "c1", caption: "Dal" })
                    });
                    var filterFormDef = new Gordic.Forms.Form({
                        opened: false,
                        layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1",
                        tabLabel: "jres:30250169" //RC 30250169 : Položky
                    });
                    filterFormDef.addSection({ label: "jres:30250276", customClass: "w-L-12 w-M-12 w-S-12" }); //RC 30250276 : Účetní profil
                    filterFormDef.addRow("jres:30250169") //RC 30250169 : Položky
                        .addField("gselectbox", Gordic.Eko.Prefabs.cfuElements({
                        gridFormat: gf, title: "jres:30250840" //RC 30250840 : Zápisy
                        /*inlineDialogOptions: {
                            width: 900
                        }*/
                    }), { name: "zapisy" });
                    filterFormDef.addSection({ label: "jres:30250769" /*,  customClass: "w-L-6 w-M-6 w-S-6" */ }) //RC 30250769 : Smlouva
                        //.addRow("jres:30250243") //RC 30250243 : Obsahuje smlouvu
                        .addField("gcheck", { name: "priz_sml", emptyValue: false, label: "jres:30250243" })
                        .addRow("jres:30250542").addField("gstringbox", //RC 30250542 : Identifikator smlouvy
                    {
                        name: "ixp_sml"
                    })
                        .addRow("jres:30250298").addField("gstringbox", //RC 30250298 : Evidenční číslo smlouvy
                    {
                        name: "ac_sml"
                    })
                        .addRow("jres:30250245").addField("gnumberbox", //RC 30250245 : Číslo položky
                    {
                        emptyValue: null,
                        name: "cislo_sml",
                        defaultValue: null
                    })
                        .addSection({ customClass: "w-L-12 w-M-12 w-S-12" })
                        .addRow("jres:30250242" /*{ caption:"jres:30250115", layoutDescriptor: "L1M1S1" }*/).addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "popis_pep"
                    }) //RC 30250115 : Popis dokladu
                    ;
                    return filterFormDef;
                }
                /**
                 * Zalozka Podklady KH DPH
                */
                function _CreateFilterZalozkaKHDPH(content) {
                    var polozka = { priz_ozp_kh_txt: "jres:30250270", priz_ozp_kh: -1 }; //RC 30250270 : Nenastaveno
                    var polozkaTypPlneni = { priz_zpl_kh_txt: "jres:30250270", priz_zpl_kh: -1 }; //RC 30250270 : Nenastaveno
                    var polozkaPomer = { priz_pomer_kh_txt: "jres:30250270", priz_pomer_kh: -1 }; //RC 30250270 : Nenastaveno
                    var polozkaZdaneni = { priz_zahr_kh_txt: "jres:30250270", priz_zahr_kh: -1 }; //RC 30250270 : Nenastaveno
                    var filterFormDef = new Gordic.Forms.Form({ opened: false, layoutDescriptor: "L1M1S1, L-3-8-1, M-12-11-1, S-12-11-1", tabLabel: "jres:30250246" }) //RC 30250246 : Podklady KH DPH
                        .addRow("jres:30250030").addField("gstringbox", //RC 30250030 : Evid. číslo daň. dokladu
                    {
                        name: "ec_dd_kh"
                    })
                        .addRow("jres:30250247") //RC 30250247 : Dodavatel / Odběratel
                        .addField("gselectbox", {
                        name: "ixs_esu_kh",
                        model: "model.ixs_esu_kh=value.ixs_esu"
                    }, Gordic.Esu.Prefabs.vyberEsu({
                        typ: 1, // přidání prefabu   možnost vyberu z karoteky  viz. níže (def 3)
                        Logovani: {
                            Ixp: '0000X0000003', // zadání logovacích údaju je nutnost hlavně IXP
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani // vybrat z enumu
                            ,
                            DuvodHledaniTxt: 'jres:30250248' //RC 30250248 : Nastaveni ESU do masky dokladů
                            ,
                            AktZnacka: ""
                        }
                    }))
                        .addSection()
                        .addSection("jres:30250253") //RC 30250253 : Údaje daňového dokladu
                        .addRow("jres:30250249") //RC 30250249 : Typy plnění
                        .addField("gselectbox", {
                        name: "priz_zpl_kh", multi: false, list: true, itemWidth: "",
                        dropdown: false,
                        model: "model.priz_zpl_kh=value.priz_zpl_kh",
                        itemTemplate: "{priz_zpl_kh_txt}",
                        modelDefaults: { priz_zpl_kh: -1 }
                        //, emptyValue: polozkaTypPlneni
                        ,
                        data: new Gordic.Data.View([
                            //polozkaTypPlneni
                            { priz_zpl_kh_txt: "jres:30250250", priz_zpl_kh: 1 } //RC 30250250 : Přijatá plnění
                            ,
                            { priz_zpl_kh_txt: "jres:30250251", priz_zpl_kh: 0 } //RC 30250251 : Uskutečněná plnění
                        ], { key: "priz_zpl_kh" })
                    })
                        .addRow("jres:30250254") //RC 30250254 : Zdanitelné plnění
                        .addField("gselectbox", {
                        name: "priz_ozp_kh", multi: false, list: true, itemWidth: "",
                        dropdown: false,
                        model: "model.priz_ozp_kh=value.priz_ozp_kh"
                        //, model: "model.s_zau=value.s_zau", itemTemplate: "{s_zau_txt}"
                        ,
                        itemTemplate: "{priz_ozp_kh_txt}",
                        modelDefaults: { priz_ozp_kh: -1 }
                        //, emptyValue: polozka
                        ,
                        data: new Gordic.Data.View([
                            //polozka
                            { priz_ozp_kh_txt: "jres:30250255", priz_ozp_kh: 1 } //RC 30250255 : Ostatní zdanitelné plnění do 10 tis. Kč
                            ,
                            { priz_ozp_kh_txt: "jres:30250257", priz_ozp_kh: 0 } //RC 30250257 : Plnění nad 10 tis. Kč
                        ], { key: "priz_ozp_kh" })
                    })
                        .addRow("jres:30250258") //RC 30250258 : Použití poměru pro odpočet dle §75 ZDPH
                        .addField("gselectbox", {
                        name: "priz_pomer_kh", multi: false, list: true, itemWidth: "",
                        dropdown: false,
                        model: "model.priz_pomer_kh=value.priz_pomer_kh",
                        itemTemplate: "{priz_pomer_kh_txt}",
                        modelDefaults: { priz_pomer_kh: -1 }
                        //, emptyValue: polozkaPomer
                        ,
                        data: new Gordic.Data.View([
                            //polozkaPomer                    
                            { priz_pomer_kh_txt: "jres:30250259", priz_pomer_kh: 1 } //RC 30250259 : Ano
                            ,
                            { priz_pomer_kh_txt: "jres:30250260", priz_pomer_kh: 0 } //RC 30250260 : Ne
                        ], { key: "priz_pomer_kh" })
                    })
                        .addRow("jres:30250262") //RC 30250262 : Zdanění příjemcem
                        .addField("gselectbox", {
                        name: "priz_zahr_kh", multi: false, list: true, itemWidth: "",
                        model: "priz_zahr_kh = value.priz_zahr_kh",
                        dropdown: false
                        //, model: "model.s_zau=value.s_zau", itemTemplate: "{s_zau_txt}"
                        ,
                        itemTemplate: "{priz_zahr_kh_txt}"
                        //,emptyValue: -1
                        ,
                        modelDefaults: { priz_zahr_kh: -1 }
                        //, emptyValue: polozkaZdaneni
                        ,
                        data: new Gordic.Data.View([
                            //polozkaZdaneni                   
                            { priz_zahr_kh_txt: "jres:30250263", priz_zahr_kh: 0 } //RC 30250263 : Plnění - tuzemské
                            ,
                            { priz_zahr_kh_txt: "jres:30250264", priz_zahr_kh: 1 } //RC 30250264 : Plnění - zahraniční
                        ], { key: "priz_zahr_kh" })
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "jres:30250265" //RC 30250265 : Datum doručení od-do
                        ,
                        name: "dat_dor_kh",
                        pathInModel: "model.dat_dor_kh"
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "jres:30250266" //RC 30250266 : Datum vystavení od-do
                        ,
                        name: "dat_vyst_kh",
                        pathInModel: "model.dat_vyst_kh"
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "jres:30250267" //RC 30250267 : Datum evidence od-do
                        ,
                        name: "dat_evid_kh",
                        pathInModel: "model.dat_evid_kh"
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "jres:30250268" //RC 30250268 : Datum uplatnění daně od-do
                        ,
                        name: "dat_upd_kh",
                        pathInModel: "model.dat_upd_kh"
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "jres:30250269" //RC 30250269 : Datum zdanitelného plnění od-do
                        ,
                        name: "dat_zdan_kh",
                        pathInModel: "model.dat_zdan_kh"
                    }));
                    return filterFormDef;
                }
                /**
                 * function _CreateFilterVlastnosti
                 *  Zalozka vlastnosti
                 * @type {function (content:GContent):any {}
                 */
                function _CreateFilterVlastnosti(content) {
                    let sxsTyp = [{ sxs: null, typ_obj: 434 /* Uct.Interface.GETypObjektu.KnihaUCT */ }];
                    let filterFormDef = new Gordic.Forms.Form({ tabLabel: "jres:30250826" }) //RC 30250826 : Vlastnosti
                        .addSection()
                        // TODO: jsou parametry prefabů správně?
                        .addRow("jres:30250827").addPrefab(Gordic.Gin.Prefabs.Field.GGinVlastnostiExtPropsFilterField(//RC 30250827 : Rozšiřující vlastnosti
                    {
                        name: "vlastnosti_r",
                        esuLogovani: {
                            Ixp: "",
                            AktZnacka: "",
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani
                        }
                    }, {
                        rpp_ixs_typ: content.ixsTypy,
                        typ_obj: [434 /* Uct.Interface.GETypObjektu.KnihaUCT */],
                        t_sxs: sxsTyp
                    }));
                    return filterFormDef;
                }
                /**
                 * function _CreateFilterdokument
                 *  Zalozka dokument
                 * @type {function (content:GContent):any {}
                 */
                function _CreateFilterDokument(content, param) {
                    let filterFormDef = Gordic.Ssl.WebClient.GDokumentIsl.AddDokumentFilterFieldsImmediate({
                        content: content,
                        params: param,
                        form: new Gordic.Forms.Form({ tabLabel: "Dokument" }).addSection(),
                        //initialValues: dokumentParams,
                        fields: Seznam.presetDokumentFields,
                        scope: {
                            scopeLevels: [
                                // Všechny napojené filtry budou mít v názvu prefix "dokument" (zde tedy filtrační enum bude obsahovat hodnoty dokument_ixp, dokument_ixs_fun_akt a dokument_nazev). Tím je možné odlišit filtry, které spravuji sám jako autor entity a ty, které si řeší dokument sám.
                                { scope: "dokument" }
                            ]
                        },
                        fieldsOptions: {}
                    });
                    return filterFormDef;
                }
            })(Seznam = WebClient.Seznam || (WebClient.Seznam = {}));
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjdFNlem5hbV9maWx0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVWN0U2V6bmFtX2ZpbHRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBd25CZjtBQXhuQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBd25CbkI7SUF4bkJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F3bkI3QjtRQXhuQm9CLFdBQUEsU0FBUztZQUFDLElBQUEsTUFBTSxDQXduQnBDO1lBeG5COEIsV0FBQSxNQUFNO2dCQUdqQzs7Ozs7bUJBS0c7Z0JBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsT0FBbUIsRUFBRSxjQUF3RTtvQkFFMUgsT0FBTzt3QkFDSCwwQkFBMEIsQ0FBQyxPQUFPLENBQUM7d0JBQ2pDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQzt3QkFDbEMsZ0NBQWdDLENBQUMsT0FBTyxDQUFDO3dCQUN6Qyx5QkFBeUIsQ0FBQyxPQUFPLENBQUM7d0JBQ2xDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQzt3QkFDaEMscUJBQXFCLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQztxQkFDbkQsQ0FBQztnQkFDTixDQUFDO2dCQVZlLHVCQUFnQixtQkFVL0IsQ0FBQTtnQkFHQTs7Ozs7O2tCQU1FO2dCQUNILFNBQVMsMEJBQTBCLENBQUMsT0FBbUI7b0JBQ25ELGtCQUFrQjtvQkFHbEIsSUFBSSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsdUNBQXVDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsc0JBQXNCO3lCQUNuSyxVQUFVLEVBQUU7eUJBQ1osUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FB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bmFtZXNwYWNlIEdvcmRpYy5VY3QuV2ViQ2xpZW50LlNlem5hbSB7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZUZpbHRlckZvcm1cclxuICAgICAqICBWeXR2b3JlbmkgZmlsdHJvdmFjaWhvIGZvcm11bGFyZVxyXG4gICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudFxyXG4gICAgICogQHJldHVybnMge2FueX1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZUZpbHRlckZvcm0oY29udGVudDogR1VjdFNlem5hbSwgZG9rdW1lbnRQYXJhbXM6IEdvcmRpYy5Tc2wuSW50ZXJmYWNlLkdEb2t1bWVudEdldENvbHVtblBhcmFtc1Jlc3BvbnNlRHRvKTphbnkge1xyXG5cclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBfQ3JlYXRlRmlsdGVyWmFsb3prYU9iZWNuYShjb250ZW50KVxyXG4gICAgICAgICAgICAsIF9DcmVhdGVGaWx0ZXJaYWxvemthU3RhdnkoY29udGVudClcclxuICAgICAgICAgICAgLCBfQ3JlYXRlRmlsdGVyWmFsb3prYVVjZXRuaVphcGlzeShjb250ZW50KVxyXG4gICAgICAgICAgICAsIF9DcmVhdGVGaWx0ZXJaYWxvemthS0hEUEgoY29udGVudClcclxuICAgICAgICAgICAgLCBfQ3JlYXRlRmlsdGVyVmxhc3Rub3N0aShjb250ZW50KVxyXG4gICAgICAgICAgICAsIF9DcmVhdGVGaWx0ZXJEb2t1bWVudChjb250ZW50LCBkb2t1bWVudFBhcmFtcylcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiBmdW5jdGlvbiBfQ3JlYXRlRmlsdGVyWmFsb3prYU9iZWNuYVxyXG4gICAgICogICAgICBcclxuICAgICAqIE9iZWNuYSB6YWxvemthXHJcbiAgICAgKiBAcGFyYW0ge0dDb250ZW50fSBjb250ZW50XHJcbiAgICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBfQ3JlYXRlRmlsdGVyWmFsb3prYU9iZWNuYShjb250ZW50OiBHVWN0U2V6bmFtKTphbnkge1xyXG4gICAgICAgIC8vdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgdmFyIGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBvcGVuZWQ6IHRydWUsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMVwiLCB0YWJMYWJlbDogXCJqcmVzOjMwMjUwNjc2XCIgfSkgLy9SQyAzMDI1MDY3NiA6IE9iZWNuw6FcclxuICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoJ2dzdHJpbmdib3gnLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7IG5hbWU6IFwiaXhwXCIgfSlcclxuICAgICAgICAgICAgLy8uYWRkUm93KFwianJlczozMDI1MDAyNlwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcIml4cFwiIH0pIC8vUkMgMzAyNTAwMjYgOiBJZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDA5M1wiKS5hZGRGaWVsZCggLy9SQyAzMDI1MDA5MyA6IFR5cCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zc2xzdHlwKCksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX3R5cD12YWx1ZS5peHNfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdnlobGVkYW5pIHogdmljZSBob2Rub3QgKElOKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUG91emVVQ1Q6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdHlwX2FnOiA0MCxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwOTRcIikgLy9SQyAzMDI1MDA5NCA6IERydWggZG9rbGFkdVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jZHJkKCkvKkdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jZHJkUm96KCkqLywge1xyXG4gICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRyZFwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuZHJkPXZhbHVlLmRyZFwiLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyZDogWzAsIDEsIDQsIDVdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAxMTZcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsLy9SQyAzMDI1MDExNiA6IMOaxI10w6FybmFcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdXVzKCksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1dXNcIiwgZHJvcGRvd246IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5pY28xPXZhbHVlLmljbzttb2RlbC51Y3MxPXZhbHVlLnVjczttb2RlbC51dXM9dmFsdWUudXVzXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGl0ZW1UZW1wbGF0ZTogXCJ7dXVzOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9rX29kOiBcIjw9IFwiICsgY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2tfZG86IFwiPj0gXCIgKyBjb250ZW50Lkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljbzogY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcz8uSUNPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IGNvbnRlbnQuR2xvYmFscy5Fa29QYXJhbXM/LlVDUyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMjEzXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNVwiLC8vUkMgMzAyNTAyMTMgOiBTdWLFmWFkYVxyXG4gICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU2VsZWN0LnVjdGRkZGUoKSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN1YnJhZGFcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwibW9kZWwuaWNvMj12YWx1ZS5pY287bW9kZWwucm9rMj12YWx1ZS5yb2s7bW9kZWwuc3VicmFkYT12YWx1ZS5zdWJyYWRhXCJcclxuICAgICAgICAgICAgICAgICAgICAsIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiBjb250ZW50Lkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvazogY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8uYWRkRmllbGQoXCIgXCIsIFwidy0xXCIpXHJcbiAgICAgICAgICAgIC5hZGRSb3coeyBuYW1lOiAnaW50X2RvaycgfSlcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIvKiwgXCJ3LTZcIiovLCB7IG5hbWU6IFwiaW50X2Rva1wiLCBsYWJlbDogXCJqcmVzOjMwMjUwMjE0XCIsIGluaXRpYWxWYWx1ZTogZmFsc2UsIGVtcHR5VmFsdWU6IGZhbHNlIH0pIC8vUkMgMzAyNTAyMTQgOiBJbnRlcm7DrSBkYcWIb3bDvSBkb2tsYWRcclxuXHJcbiAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgLy8gZHJ1aHkgc2xvdXBlY1xyXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIC5hZGRSb3coeyBuYW1lOiAndmxhc3RuaV9kb2tsYWR5J30pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwidmxhc3RuaV9kb2tsYWR5XCIsIGxhYmVsOiBcImpyZXM6MzAyNTAyNzFcIiwgaW5pdGlhbFZhbHVlOiBmYWxzZSwgZW1wdHlWYWx1ZTogZmFsc2UgfSkgLy9SQyAzMDI1MDI3MSA6IFZsYXN0bsOtIGRva2xhZHlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAyMTFcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy04XCIsLy9SQyAzMDI1MDIxMSA6IFpwcmFjb3ZhdGVsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc2Z1bigpLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl9jaWxcIiAvL21vZGVsOiBcIm1vZGVsLml4c19mdW49dmFsdWUuaXhzX2Z1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbW9kZWw6IFwibW9kZWwuaXhzX2Z1bl9jaWw9dmFsdWUuaXhzX2Z1bl9jaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcIml4c19mdW5fY2lsPWl4c19mdW47aXhzX2Z1bl90eHQ9bmF6ZXY7aXhzX2Z1bl9yZWZfdHh0PW5hemV2X3JlZjtpeHNfZnVuX3N1X3R4dD1uYXpldl9zdVwiXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wYXRoSW5Nb2RlbDogXCJtb2RlbC5peHNfZnVuX2NpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICwgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBEbGVQb3ZvbGVueWNoQWdlbmQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVnJmdVR5cEFnOiBcIkJCRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWcmZ1QWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnJmdUl4cERlbjogY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcyEuSXhwRGVuLCAvL2NvbnRlbnQuc2VydmVyQ29udGV4dC5peHBfZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWcmZ1U3VicmFkYTogY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcyEuU3VicmFkYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogWmtvbnRyb2xvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pIC8vIGhpc3RvcmllXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNFwiLFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwiZnVuX2hpc3RcIiwgbGFiZWw6IFwianJlczozMDI1MDIxMlwiLCBpbml0aWFsVmFsdWU6IGZhbHNlLC8qLCBtb2RlbERlZmF1bHRzOiBmYWxzZSwqLyBlbXB0eVZhbHVlOiBmYWxzZSB9XHJcbiAgICAgICAgICAgICkgLy9SQyAzMDI1MDIxMiA6IEhpc3RvcmllXHJcbiAgICAgICAgICAgIC8vLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDA5MVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwvL1JDIDMwMjUwMDkxIDogUmVhbGl6w6F0b3JcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zcmVhKCksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaXNfcmVhbFwiLCBkcm9wZG93bjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcImljbzM9aWNvOyBjaXNfcmVhbD1jaXNfcmVhbDtjaXNfcmVhbF90eHQ9bmF6ZXZcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY286IGNvbnRlbnQuR2xvYmFscy5Fa29QYXJhbXM/LklDTyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwOTBcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsLy9SQyAzMDI1MDA5MCA6IEtvbXBldGVudFxyXG4gICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3Nrb20oKSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5fdnlyaXpcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwibW9kZWwuaWNvND12YWx1ZS5pY287bW9kZWwuaXhzX2Z1bl92eXJpej12YWx1ZS5peHNfZnVuXCJcclxuICAgICAgICAgICAgICAgICAgICAsIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpel9rb206IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY286IGNvbnRlbnQuR2xvYmFscy5Fa29QYXJhbXM/LklDTyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBsYWJlbDogXCJqcmVzOjMwMjUwMDMxXCIgLy9SQyAzMDI1MDAzMSA6IEFnZW5kb3bDqSDEjcOtc2xvIG9kLWRvXHJcbiAgICAgICAgICAgICAgICAgICAgLCBuYW1lOiBcImFjX2FnXCJcclxuICAgICAgICAgICAgICAgICAgICAsIHBhdGhJbk1vZGVsOiBcIm1vZGVsLmFjX2FnXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGVtcHR5VmFsdWU6IG51bGxcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBsYWJlbDogXCJqcmVzOjMwMjUwNTQzXCIgLy9SQyAzMDI1MDU0MyA6IEV2aWRlbsSNbsOtIMSNw61zbG8gb2QtZG9cclxuICAgICAgICAgICAgICAgICAgICAsIG5hbWU6IFwiYWNcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgcGF0aEluTW9kZWw6IFwibW9kZWwuYWNcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZW1wdHlWYWx1ZTogbnVsbFxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGxhYmVsOiBcImpyZXM6MzAyNTAyMTVcIiAvL1JDIDMwMjUwMjE1IDogxIzDrXNsbyBkb2tsYWR1IG8gemHDusSNdG92w6Fuw60gb2QtZG9cclxuICAgICAgICAgICAgICAgICAgICAsIG5hbWU6IFwiYWNfaXhlXCJcclxuICAgICAgICAgICAgICAgICAgICAsIHBhdGhJbk1vZGVsOiBcIm1vZGVsLmFjX2l4ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBlbXB0eVZhbHVlOiBudWxsXHJcblxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGxhYmVsOiBcImpyZXM6MzAyNTAwMThcIiAvL1JDIDMwMjUwMDE4IDogxIzDoXN0a2Egb2QtZG9cclxuICAgICAgICAgICAgICAgICAgICAsIG5hbWU6IFwiY1wiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBwYXRoSW5Nb2RlbDogXCJtb2RlbC5jXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGVtcHR5VmFsdWU6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAsIGN1c3RvbU9wdEFsbDogeyBkZWNpbWFsczogMiwgcmV0dXJuVHlwZTogXCJkZWNpbWFsXCIsIHRob3VzYW5kc1NlcGFyYXRvcjogJyAnLCBmaXhlZDogZmFsc2UsICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMTYzXCIvKiwgXCJ3LUwtNCB3LU0tNCB3LVMtMTJcIiovKSAvL1JDIDMwMjUwMTYzIDogQmFua292bsOtIMO6xI1ldCwgw5rEjWV0IFNVIC8gQVUgXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1dmwoKSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2N1c3RvbUNsYXNzOiBcInctNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYnVfdmxcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5yb2sxMD12YWx1ZS5yb2s7bW9kZWwuYnVfdmw9dmFsdWUuYnVfdmw7IG1vZGVsLnNrX3ZsPXZhbHVlLnNrX3ZsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogWzEwMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvazogY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IGNvbnRlbnQuR2xvYmFscy5Fa29QYXJhbXM/LlVDUyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiBjb250ZW50Lkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2bmlSb3pwb2N0b3Z5UmVwcmV6ZW50YW50OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAvLy5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKFxyXG4gICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0eXBlOiBcIm51bWJlclwiXHJcbiAgICAgICAgICAgIC8vICAgICAgICAsIGxhYmVsOiBcImpyZXM6MzAyNTAxODdcIiAvL1JDIDMwMjUwMTg3IDogUm9rXHJcbiAgICAgICAgICAgIC8vICAgICAgICAsIG5hbWU6IFwicm9rXCJcclxuICAgICAgICAgICAgLy8gICAgICAgICwgcGF0aEluTW9kZWw6IFwibW9kZWwucm9rXCJcclxuICAgICAgICAgICAgLy8gICAgICAgICwgZW1wdHlWYWx1ZTogbnVsbFxyXG5cclxuICAgICAgICAgICAgLy8gICAgfSkpXHJcbiAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGxhYmVsOiBcImpyZXM6MzAyNTAxODZcIiAvL1JDIDMwMjUwMTg2IDogTcSbc8OtYyBvZC1kb1xyXG4gICAgICAgICAgICAgICAgICAgICwgbmFtZTogXCJtZXNpY1wiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBwYXRoSW5Nb2RlbDogXCJtb2RlbC5tZXNpY1wiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBlbXB0eVZhbHVlOiBudWxsXHJcblxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGxhYmVsOiBcImpyZXM6MzAyNTAxODVcIiAvL1JDIDMwMjUwMTg1IDogRGVuIG9kLWRvXHJcbiAgICAgICAgICAgICAgICAgICAgLCBuYW1lOiBcImRlblwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBwYXRoSW5Nb2RlbDogXCJtb2RlbC5kZW5cIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZW1wdHlWYWx1ZTogbnVsbFxyXG5cclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDIxNlwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmRlY2ltYWwoMCksIC8vUkMgMzAyNTAyMTYgOiBQb3NsZWRuw61jaFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibnVtX3Jvd1wiXHJcbiAgICAgICAgICAgICAgICAgICAgLCByZXR1cm5UeXBlOiBcIm51bWJlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBzdGVwOiAxMFxyXG4gICAgICAgICAgICAgICAgICAgICwgbWluVmFsdWU6IDBcclxuICAgICAgICAgICAgICAgICAgICAsIGVtcHR5VmFsdWU6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAvLyxkZWZhdWx0VmFsdWU6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAvLywgbGFiZWw6IFwianJlczozMDI1MDIxNlwiIC8vUkMgMzAyNTAyMTYgOiBQb3NsZWRuw61jaFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG5cclxuICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBjdXN0b21DbGFzczogXCJ3LUwtMTIgdy1NLTEyIHctUy0xMlwiIH0pXHJcblxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDExNVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoRWtvLkZpbHRlcnMuZ2V0U3RyaW5nT3BlcmF0b3JzKCkpLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzX2Rva2xhZFwiXHJcbiAgICAgICAgICAgIH0pIC8vUkMgMzAyNTAxMTUgOiBQb3BpcyBkb2tsYWR1XHJcbiAgICAgICAgICAgIC8vLmFkZFNlY3Rpb24oeyBjdXN0b21DbGFzczogXCJ3LUwtMTIgdy1NLTEyIHctUy0xMlwiIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMjE4XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyhFa28uRmlsdGVycy5nZXRTdHJpbmdPcGVyYXRvcnMoKSksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYV9peHBcIlxyXG4gICAgICAgICAgICAgICAgfSkgLy9SQyAzMDI1MDIxOCA6IFBvem7DoW1rYSBkb2tsYWR1XHJcblxyXG4gICAgICAgICAgICAvLyBrc19kYlxyXG4gICAgICAgICAgICAvLyBUT0RPOiBLbGljb3ZhIHNsb3ZhPz8/XHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwNzk1XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Qud2ZsS2xpY1Nsb3ZhKCksIHsgLy9SQyAzMDI1MDc5NSA6IEtsw63EjW92w6Egc2xvdmFcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwia3NfZGJcIixcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcImpyZXM6MzAyNTA3OTZcIiwgLy9SQyAzMDI1MDc5NiA6IFphZGVqdGUga2zDrcSNb3bDoSBzbG92YVxyXG4gICAgICAgICAgICAgICAgLy9tb2RlbDogXCJtb2RlbC5rc19kYj12YWx1ZS5rc19kYlwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3NfZGI9dmFsdWUua2xfc2xvdm9cIixcclxuXHJcbiAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHZlcnRpY2FsQnV0dG9uczogZmFsc2UsXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICA7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gZmlsdGVyRm9ybURlZjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogZnVuY3Rpb24gX0NyZWF0ZUZpbHRlclphbG96a2FTdGF2eVxyXG4gICAgICogIFphbG96a2Egc3RhdnlcclxuICAgICAqIEB0eXBlIHtmdW5jdGlvbiAoY29udGVudDpHQ29udGVudCk6YW55IHt9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIF9DcmVhdGVGaWx0ZXJaYWxvemthU3RhdnkoY29udGVudDpHQ29udGVudCk6YW55IHtcclxuICAgICAgICB2YXIgZmlsdGVyRm9ybURlZiA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG9wZW5lZDogZmFsc2UsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMVwiLCB0YWJMYWJlbDogXCJqcmVzOjMwMjUwMjE5XCIgfSkgLy9SQyAzMDI1MDIxOSA6IFN0YXZ5XHJcbiAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMDI1MDIyMFwiKSAvL1JDIDMwMjUwMjIwIDogU3RhdnkgZG9rbGFkxa9cclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAyNDFcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgLy9SQyAzMDI1MDI0MSA6IFN0YXYgemHDusSNdG92YW7DrVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzX3phdVwiLCBtdWx0aTogZmFsc2UsIGxpc3Q6IGZhbHNlLCBpdGVtV2lkdGg6IFwiXCJcclxuICAgICAgICAgICAgICAgICwgZHJvcGRvd246IHRydWVcclxuICAgICAgICAgICAgICAgIC8vLCBtb2RlbDogXCJtb2RlbC5zX3phdT12YWx1ZS5zX3phdVwiLCBpdGVtVGVtcGxhdGU6IFwie3NfemF1X3R4dH1cIlxyXG4gICAgICAgICAgICAgICAgLCBpdGVtVGVtcGxhdGU6IFwie3NfemF1X3R4dH1cIlxyXG4gICAgICAgICAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5zX3phdT12YWx1ZS5zX3phdVwiXHJcbiAgICAgICAgICAgICAgICAsIGhlbHBlckNvbHVtbnM6IFtcInNfemF1X3R4dFwiXVxyXG4gICAgICAgICAgICAgICAgLCBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzX3phdV90eHQ6IFwianJlczozMDI1MDIyM1wiLCBzX3phdTogLTEgfSAvL1JDIDMwMjUwMjIzIDogbmV1csSNZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgLCB7IHNfemF1X3R4dDogXCJqcmVzOjMwMjUwMjIyXCIsIHNfemF1OiA1IH0gLy9SQyAzMDI1MDIyMiA6IG7DoXZyaFxyXG4gICAgICAgICAgICAgICAgICAgICwgeyBzX3phdV90eHQ6IFwianJlczozMDI1MDIyMVwiLCBzX3phdTogNzAwIH0gLy9SQyAzMDI1MDIyMSA6IG5lcMWZaXByYXZlbm8gayB1esOhdsSbcmNlXHJcbiAgICAgICAgICAgICAgICAgICAgLCB7IHNfemF1X3R4dDogXCJqcmVzOjMwMjUwMjI0XCIsIHNfemF1OiA4MDAgfSAvL1JDIDMwMjUwMjI0IDogbmV1emF2xZllbm9cclxuICAgICAgICAgICAgICAgICAgICAsIHsgc196YXVfdHh0OiBcImpyZXM6MzAyNTAyMjVcIiwgc196YXU6IDAgfSAvL1JDIDMwMjUwMjI1IDogbmV6YcO6xI10b3bDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgLCB7IHNfemF1X3R4dDogXCJqcmVzOjMwMjUwMjI2XCIsIHNfemF1OiAzMCB9IC8vUkMgMzAyNTAyMjYgOiBzY2h2w6FsZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgLCB7IHNfemF1X3R4dDogXCJqcmVzOjMwMjUwNTM0XCIsIHNfemF1OiAzMDAgfSAvL1JDIDMwMjUwNTM0IDoga2Ugc2NodsOhbGVuw61cclxuICAgICAgICAgICAgICAgICAgICAsIHsgc196YXVfdHh0OiBcImpyZXM6MzAyNTAyMjdcIiwgc196YXU6IDkwIH0gLy9SQyAzMDI1MDIyNyA6IHN0b3Jub1xyXG4gICAgICAgICAgICAgICAgICAgICwgeyBzX3phdV90eHQ6IFwianJlczozMDI1MDIyOFwiLCBzX3phdTogNTAgfSAvL1JDIDMwMjUwMjI4IDogdXphdsWZZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgLCB7IHNfemF1X3R4dDogXCJqcmVzOjMwMjUwMjI5XCIsIHNfemF1OiA0MCB9IC8vUkMgMzAyNTAyMjkgOiB6YcO6xI10b3bDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgLCB7IHNfemF1X3R4dDogXCJqcmVzOjMwMjUwNTMzXCIsIHNfemF1OiA0MDAgfSAvL1JDIDMwMjUwNTMzIDogayB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICwgeyBzX3phdV90eHQ6IFwianJlczozMDI1MDIzMFwiLCBzX3phdTogMTAgfSAvL1JDIDMwMjUwMjMwIDogemHDusSNdG92w6FubyDEjcOhc3RlxI1uxJtcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAsIHsga2V5OiBcInNfemF1XCIgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAyMzlcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgLy9SQyAzMDI1MDIzOSA6IFN0YXYgZXZpZGVuY2VcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl9ldmlcIiwgbXVsdGk6IGZhbHNlLCBsaXN0OiBmYWxzZSwgaXRlbVdpZHRoOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAsIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAvLywgbW9kZWw6IFwibW9kZWwuc196YXU9dmFsdWUuc3Rhdl9ldmlcIiwgaXRlbVRlbXBsYXRlOiBcIntzdGF2X2V2aV90eHR9XCJcclxuICAgICAgICAgICAgICAgICwgaGVscGVyQ29sdW1uczogW1wic3Rhdl9ldmlfdHh0XCJdXHJcbiAgICAgICAgICAgICAgICAsIGl0ZW1UZW1wbGF0ZTogXCJ7c3Rhdl9ldmlfdHh0fVwiXHJcbiAgICAgICAgICAgICAgICAsIG1vZGVsOiBcIm1vZGVsLnN0YXZfZXZpPXZhbHVlLnN0YXZfZXZpXCIsIGluaXRpYWxWYWx1ZTogeyBzdGF2X2V2aV90eHQ6IFwianJlczozMDI1MDIzMVwiLCBzdGF2X2V2aTogMTAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAsIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFtcclxuICAgICAgICAgICAgICAgICAgICB7IHN0YXZfZXZpX3R4dDogXCJqcmVzOjMwMjUwMjMxXCIsIHN0YXZfZXZpOiAxMCB9IC8vUkMgMzAyNTAyMzEgOiBldmlkb3ZhbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgLCB7IHN0YXZfZXZpX3R4dDogXCJqcmVzOjMwMjUwMjMyXCIsIHN0YXZfZXZpOiAyMCB9IC8vUkMgMzAyNTAyMzIgOiBuZWV2aWRvdmFuw6lcclxuICAgICAgICAgICAgICAgICAgICAsIHsgc3Rhdl9ldmlfdHh0OiBcImpyZXM6MzAyNTAyMzNcIiwgc3Rhdl9ldmk6IDMwIH0gLy9SQyAzMDI1MDIzMyA6IGFrdHXDoWxuxJsgZXZpZG92YW7DqVxyXG4gICAgICAgICAgICAgICAgICAgICwgeyBzdGF2X2V2aV90eHQ6IFwianJlczozMDI1MDIzNFwiLCBzdGF2X2V2aTogNDAgfSAvL1JDIDMwMjUwMjM0IDogcMWZZWV2aWRvdmFuw6kgelxyXG4gICAgICAgICAgICAgICAgICAgICwgeyBzdGF2X2V2aV90eHQ6IFwianJlczozMDI1MDIzNVwiLCBzdGF2X2V2aTogNTAgfSAvL1JDIDMwMjUwMjM1IDogcMWZZWV2aWRvdmFuw6kgZG9cclxuICAgICAgICAgICAgICAgICAgICAsIHsgc3Rhdl9ldmlfdHh0OiBcImpyZXM6MzAyNTAyMzZcIiwgc3Rhdl9ldmk6IDYwIH0gLy9SQyAzMDI1MDIzNiA6IHDFr3ZvZG7DrVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICwgeyBrZXk6IFwic3Rhdl9ldmlcIiB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLy5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJab2JyYXplbsOtXCIpXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMjQwXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7IC8vUkMgMzAyNTAyNDAgOiBQxZnDrXpuYWsgem9icmF6ZW7DrVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X3ZpZXdcIiwgbXVsdGk6IGZhbHNlLCBsaXN0OiBmYWxzZSwgaXRlbVdpZHRoOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAsIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAvLywgbW9kZWw6IFwibW9kZWwuc196YXU9dmFsdWUucHJpel92aWV3XCIsIGl0ZW1UZW1wbGF0ZTogXCJ7cHJpel92aWV3X3R4dH1cIlxyXG4gICAgICAgICAgICAgICAgLCBoZWxwZXJDb2x1bW5zOiBbXCJwcml6X3ZpZXdfdHh0XCJdXHJcbiAgICAgICAgICAgICAgICAsIGl0ZW1UZW1wbGF0ZTogXCJ7cHJpel92aWV3X3R4dH1cIlxyXG4gICAgICAgICAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5wcml6X3ZpZXc9dmFsdWUucHJpel92aWV3XCJcclxuICAgICAgICAgICAgICAgICwgZW1wdHlWYWx1ZTogbnVsbFxyXG4gICAgICAgICAgICAgICAgLy8sIG1vZGVsRGVmYXVsdHM6IHsgcHJpel92aWV3X3R4dDogXCJqcmVzOjMwMjUwMjIzXCIsIHByaXpfdmlldzogLTEgfS8vUkMgMzAyNTAyNzAgOiBOZW5hc3RhdmVub1xyXG4gICAgICAgICAgICAgICAgLCBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgLy97IHByaXpfdmlld190eHQ6IFwianJlczozMDI1MDIyM1wiLCBwcml6X3ZpZXc6IC0xIH0gLy9SQyAzMDI1MDIyMyA6IG5ldXLEjWVub1xyXG4gICAgICAgICAgICAgICAgICAgIHsgcHJpel92aWV3X3R4dDogXCJqcmVzOjMwMjUwMjM3XCIsIHByaXpfdmlldzogMCB9IC8vUkMgMzAyNTAyMzcgOiBwxZllxI10ZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgLCB7IHByaXpfdmlld190eHQ6IFwianJlczozMDI1MDIzOFwiLCBwcml6X3ZpZXc6IDEwIH0gLy9SQyAzMDI1MDIzOCA6IG5lcMWZZcSNdGVub1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICwgeyBrZXk6IFwicHJpel92aWV3XCIgfSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICByZXR1cm4gZmlsdGVyRm9ybURlZjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogWmFsb3prYSBVY2V0bmkgemFwaXN5XHJcbiAgICAqL1xyXG4gICAgZnVuY3Rpb24gX0NyZWF0ZUZpbHRlclphbG96a2FVY2V0bmlaYXBpc3koY29udGVudDogR1VjdFNlem5hbSk6YW55IHtcclxuICAgICAgICAvL3ZhciBjZnVHRiA9IHRoaXMuY29udGV4dFByb3AoXCJjZnVHcmlkRm9ybWF0XCIpXHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGdmID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKTtcclxuICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgbmFtZTogXCJua3NcIiwgICAgICAgIC8vSmUgcG92aW5ueSBwcm8gc3ByYXZuZSBtYXBvdmFuaSBuYXp2dSBwcm9wZXJ0eSBhIGNhcHRpb24hXHJcbiAgICAgICAgICAgIGNhcHRpb246IEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMubmtzISwgICBcclxuICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAvKmNlbGxUZW1wbGF0ZTogXCJ7bmtzOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdGFydCAmJiBkLnN0YXJ0ID8gXCI9XCIgKyBkLnN0YXJ0IDogXCJcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwibmtzXCIsIGQpO1xyXG4gICAgICAgICAgICB9LCAqL1xyXG4gICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwibmtzXCIsIGQpOyB9LCAvL051dG5lIHByaWRhdCBjZWxsVGVtcGxhdGUgcHJvIHNwcmF2bmUgem9icmF6ZW5pIGhvZG5vdHkgKGx6ZSBwb3V6aXQgZGVmYXVsdClcclxuICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMubmtzSW50ZXJ2YWwoeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vTnV0bmUgcHJpZGF0IGVkaXRvciAocHJlZmFieSBqc291IHYgTlMgR29yZGljLkVrby5GaWx0ZXJzKVxyXG4gICAgICAgICAgICAgICAgaWNvOiBjb250ZW50Lkdsb2JhbHMuRWtvUGFyYW1zIS5JQ08gYXMgYW55LCBvbmx5QWN0aXZlOiB0cnVlLCBha3RQcm9obDogMTAwLCBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLm5rcyEsIG1vZGVsOiBcIm5rc1wiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6ICQuZXh0ZW5kKEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zbmtzKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rczJcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgbW9kZWxEZWZhdWx0czogeyBpY286IGNvbnRlbnQuQ3VycmVudEljbywgYWt0aXZpdGE6IFwiMTAwXCIsIGFrdFByb2hsOjEwMCB9IGFzIEdvcmRpYy5Fa28uRmlsdGVycy5JR01vZGVsRGVmYXVsdHNcclxuICAgICAgICAgICAgICAgICAgICAsIGl0ZW1UZW1wbGF0ZTogXCJ7bmtzOnRyaW06ZW5jb2RlfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5ua3M9dmFsdWUubmtzXCIgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICB9KTtcclxuICAgICAgICBnZi5hZGQoR29yZGljLkVrby5DZnVVdGlscy5nZXRDZnVTZXRFZGl0b3JzKGNvbnRlbnQsIHsgY2hlY2tVZXRlOiBjb250ZW50Lkdsb2JhbHMuRWtvUGFyYW1zPy5Qcml6Q2hlY2tVZXRlLCB3aWxkY2FyZDogY29udGVudC5HbG9iYWxzLk90aGVycz8uV2lsZGNhcmQgfSkpIFxyXG4gICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMTlcIiwgLy9SQyAzMDI1MDAxOSA6IE1EXHJcbiAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgIC8vY2VsbFRlbXBsYXRlOiBmdW5jdGlvbiAoZHRvKSB7IHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0SW50ZXJ2YWxWYWx1ZShkdG8uYzApOyB9LFxyXG4gICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuZGVjaW1hbEludGVydmFsQ2VsbFRlbXBsYXRlKFwiYzBcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwXCIsIGNhcHRpb246IFwiTURcIiB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMzFcIiwgLy9SQyAzMDI1MDEzMSA6IERhbFxyXG4gICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuZGVjaW1hbEludGVydmFsQ2VsbFRlbXBsYXRlKFwiYzFcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMxXCIsIGNhcHRpb246IFwiRGFsXCIgfSlcclxuICAgICAgICB9KTsgXHJcblxyXG4gICAgICAgIHZhciBmaWx0ZXJGb3JtRGVmID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgb3BlbmVkOiBmYWxzZVxyXG4gICAgICAgICAgICAsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMVwiXHJcbiAgICAgICAgICAgICwgdGFiTGFiZWw6IFwianJlczozMDI1MDE2OVwiLy9SQyAzMDI1MDE2OSA6IFBvbG/Fvmt5XHJcblxyXG5cclxuICAgICAgICB9KTsgXHJcbiAgICAgICAgZmlsdGVyRm9ybURlZi5hZGRTZWN0aW9uKHsgbGFiZWw6IFwianJlczozMDI1MDI3NlwiLCBjdXN0b21DbGFzczogXCJ3LUwtMTIgdy1NLTEyIHctUy0xMlwiIH0pOyAvL1JDIDMwMjUwMjc2IDogw5rEjWV0bsOtIHByb2ZpbFxyXG5cclxuICAgICAgICBmaWx0ZXJGb3JtRGVmLmFkZFJvdyhcImpyZXM6MzAyNTAxNjlcIikgLy9SQyAzMDI1MDE2OSA6IFBvbG/Fvmt5XHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLkVrby5QcmVmYWJzLmNmdUVsZW1lbnRzKHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IGdmLCB0aXRsZTpcImpyZXM6MzAyNTA4NDBcIiAvL1JDIDMwMjUwODQwIDogWsOhcGlzeVxyXG4gICAgICAgICAgICAgICAgLyppbmxpbmVEaWFsb2dPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDkwMFxyXG4gICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgfSksIHsgbmFtZTogXCJ6YXBpc3lcIiB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBmaWx0ZXJGb3JtRGVmLmFkZFNlY3Rpb24oe2xhYmVsOiBcImpyZXM6MzAyNTA3NjlcIi8qLCAgY3VzdG9tQ2xhc3M6IFwidy1MLTYgdy1NLTYgdy1TLTZcIiAqL30pIC8vUkMgMzAyNTA3NjkgOiBTbWxvdXZhXHJcbiAgICAgICAgICAgIC8vLmFkZFJvdyhcImpyZXM6MzAyNTAyNDNcIikgLy9SQyAzMDI1MDI0MyA6IE9ic2FodWplIHNtbG91dnVcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJwcml6X3NtbFwiLCBlbXB0eVZhbHVlOiBmYWxzZSwgbGFiZWw6IFwianJlczozMDI1MDI0M1wiIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwNTQyXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCAvL1JDIDMwMjUwNTQyIDogSWRlbnRpZmlrYXRvciBzbWxvdXZ5XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfc21sXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMjk4XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCAvL1JDIDMwMjUwMjk4IDogRXZpZGVuxI1uw60gxI3DrXNsbyBzbWxvdXZ5XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19zbWxcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAyNDVcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIC8vUkMgMzAyNTAyNDUgOiDEjMOtc2xvIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpc2xvX3NtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTpudWxsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkU2VjdGlvbih7IGN1c3RvbUNsYXNzOiBcInctTC0xMiB3LU0tMTIgdy1TLTEyXCIgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAyNDJcIi8qeyBjYXB0aW9uOlwianJlczozMDI1MDExNVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0qLykuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKEVrby5GaWx0ZXJzLmdldFN0cmluZ09wZXJhdG9ycygpKSwgeyAvL1JDIDMwMjUwMjQyIDogUG9waXMgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNfcGVwXCJcclxuICAgICAgICAgICAgfSkgLy9SQyAzMDI1MDExNSA6IFBvcGlzIGRva2xhZHVcclxuXHJcbiAgICAgICAgICAgIDtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiBmaWx0ZXJGb3JtRGVmO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogWmFsb3prYSBQb2RrbGFkeSBLSCBEUEhcclxuICAgICovXHJcbiAgICBmdW5jdGlvbiBfQ3JlYXRlRmlsdGVyWmFsb3prYUtIRFBIKGNvbnRlbnQ6IEdDb250ZW50KTogYW55IHtcclxuICAgICAgICB2YXIgcG9sb3prYSA9IHsgcHJpel9venBfa2hfdHh0OiBcImpyZXM6MzAyNTAyNzBcIiwgcHJpel9venBfa2g6IC0xIH07IC8vUkMgMzAyNTAyNzAgOiBOZW5hc3RhdmVub1xyXG4gICAgICAgIHZhciBwb2xvemthVHlwUGxuZW5pID0geyBwcml6X3pwbF9raF90eHQ6IFwianJlczozMDI1MDI3MFwiLCBwcml6X3pwbF9raDogLTEgfSAvL1JDIDMwMjUwMjcwIDogTmVuYXN0YXZlbm9cclxuICAgICAgICB2YXIgcG9sb3prYVBvbWVyID0geyBwcml6X3BvbWVyX2toX3R4dDogXCJqcmVzOjMwMjUwMjcwXCIsIHByaXpfcG9tZXJfa2g6IC0xIH0gLy9SQyAzMDI1MDI3MCA6IE5lbmFzdGF2ZW5vXHJcbiAgICAgICAgdmFyIHBvbG96a2FaZGFuZW5pID17IHByaXpfemFocl9raF90eHQ6IFwianJlczozMDI1MDI3MFwiLCBwcml6X3phaHJfa2g6IC0xIH0gLy9SQyAzMDI1MDI3MCA6IE5lbmFzdGF2ZW5vXHJcbiAgICAgICAgdmFyIGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBvcGVuZWQ6IGZhbHNlLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTFcIiwgdGFiTGFiZWw6IFwianJlczozMDI1MDI0NlwiIH0pIC8vUkMgMzAyNTAyNDYgOiBQb2RrbGFkeSBLSCBEUEhcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwMzBcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIC8vUkMgMzAyNTAwMzAgOiBFdmlkLiDEjcOtc2xvIGRhxYguIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVjX2RkX2toXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMjQ3XCIpIC8vUkMgMzAyNTAyNDcgOiBEb2RhdmF0ZWwgLyBPZGLEm3JhdGVsXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19lc3Vfa2hcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwibW9kZWwuaXhzX2VzdV9raD12YWx1ZS5peHNfZXN1XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuRXN1LlByZWZhYnMudnliZXJFc3UoXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXA6IDEsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gcHJlZmFidSAgIG1vxb5ub3N0IHZ5YmVydSB6IGthcm90ZWt5ICB2aXouIG7DrcW+ZSAoZGVmIDMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ292YW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6ICcwMDAwWDAwMDAwMDMnLCAgICAgICAgICAgICAgIC8vIHphZMOhbsOtIGxvZ292YWPDrWNoIMO6ZGFqdSBqZSBudXRub3N0IGhsYXZuxJsgSVhQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRXN1VkhsZWRhbmkgLy8gdnlicmF0IHogZW51bXVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgRHV2b2RIbGVkYW5pVHh0OiAnanJlczozMDI1MDI0OCcgLy9SQyAzMDI1MDI0OCA6IE5hc3RhdmVuaSBFU1UgZG8gbWFza3kgZG9rbGFkxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgQWt0Wm5hY2thOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICApXHJcbiAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMwMjUwMjUzXCIpIC8vUkMgMzAyNTAyNTMgOiDDmmRhamUgZGHFiG92w6lobyBkb2tsYWR1XHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMjQ5XCIpIC8vUkMgMzAyNTAyNDkgOiBUeXB5IHBsbsSbbsOtXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyAvL1JDIDMwMjUwMjQxIDogU3RhdiB6YcO6xI10b3ZhbsOtXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInByaXpfenBsX2toXCIsIG11bHRpOiBmYWxzZSwgbGlzdDogdHJ1ZSwgaXRlbVdpZHRoOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAsIGRyb3Bkb3duOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5wcml6X3pwbF9raD12YWx1ZS5wcml6X3pwbF9raFwiICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLCBpdGVtVGVtcGxhdGU6IFwie3ByaXpfenBsX2toX3R4dH1cIlxyXG4gICAgICAgICAgICAgICAgLCBtb2RlbERlZmF1bHRzOiB7IHByaXpfenBsX2toOiAtMSB9XHJcbiAgICAgICAgICAgICAgICAvLywgZW1wdHlWYWx1ZTogcG9sb3prYVR5cFBsbmVuaVxyXG4gICAgICAgICAgICAgICAgLCBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wb2xvemthVHlwUGxuZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgIHsgcHJpel96cGxfa2hfdHh0OiBcImpyZXM6MzAyNTAyNTBcIiwgcHJpel96cGxfa2g6IDEgfSAvL1JDIDMwMjUwMjUwIDogUMWZaWphdMOhIHBsbsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgLCB7IHByaXpfenBsX2toX3R4dDogXCJqcmVzOjMwMjUwMjUxXCIsIHByaXpfenBsX2toOiAwIH0gLy9SQyAzMDI1MDI1MSA6IFVza3V0ZcSNbsSbbsOhIHBsbsSbbsOtXHJcblxyXG4gICAgICAgICAgICAgICAgXSwgeyBrZXk6IFwicHJpel96cGxfa2hcIiB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDI1NFwiKSAvL1JDIDMwMjUwMjU0IDogWmRhbml0ZWxuw6kgcGxuxJtuw61cclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInByaXpfb3pwX2toXCIsIG11bHRpOiBmYWxzZSwgbGlzdDogdHJ1ZSwgaXRlbVdpZHRoOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAsIGRyb3Bkb3duOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5wcml6X296cF9raD12YWx1ZS5wcml6X296cF9raFwiXHJcbiAgICAgICAgICAgICAgICAvLywgbW9kZWw6IFwibW9kZWwuc196YXU9dmFsdWUuc196YXVcIiwgaXRlbVRlbXBsYXRlOiBcIntzX3phdV90eHR9XCJcclxuICAgICAgICAgICAgICAgICwgaXRlbVRlbXBsYXRlOiBcIntwcml6X296cF9raF90eHR9XCJcclxuICAgICAgICAgICAgICAgICwgbW9kZWxEZWZhdWx0czogeyBwcml6X296cF9raDotMSB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8sIGVtcHR5VmFsdWU6IHBvbG96a2FcclxuICAgICAgICAgICAgICAgICwgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcG9sb3prYVxyXG4gICAgICAgICAgICAgICAgICAgICB7IHByaXpfb3pwX2toX3R4dDogXCJqcmVzOjMwMjUwMjU1XCIsIHByaXpfb3pwX2toOiAxIH0gLy9SQyAzMDI1MDI1NSA6IE9zdGF0bsOtIHpkYW5pdGVsbsOpIHBsbsSbbsOtIGRvIDEwIHRpcy4gS8SNXHJcbiAgICAgICAgICAgICAgICAgICAgLCB7IHByaXpfb3pwX2toX3R4dDogXCJqcmVzOjMwMjUwMjU3XCIsIHByaXpfb3pwX2toOiAwIH0gLy9SQyAzMDI1MDI1NyA6IFBsbsSbbsOtIG5hZCAxMCB0aXMuIEvEjVxyXG5cclxuICAgICAgICAgICAgICAgIF0sIHsga2V5OiBcInByaXpfb3pwX2toXCIgfSlcclxuICAgICAgICAgICAgfSBhcyBhbnkpXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMjU4XCIpIC8vUkMgMzAyNTAyNTggOiBQb3XFvml0w60gcG9txJtydSBwcm8gb2Rwb8SNZXQgZGxlIMKnNzUgWkRQSFxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpel9wb21lcl9raFwiLCBtdWx0aTogZmFsc2UsIGxpc3Q6IHRydWUsIGl0ZW1XaWR0aDogXCJcIlxyXG4gICAgICAgICAgICAgICAgLCBkcm9wZG93bjogZmFsc2VcclxuICAgICAgICAgICAgICAgICwgbW9kZWw6IFwibW9kZWwucHJpel9wb21lcl9raD12YWx1ZS5wcml6X3BvbWVyX2toXCJcclxuICAgICAgICAgICAgICAgICwgaXRlbVRlbXBsYXRlOiBcIntwcml6X3BvbWVyX2toX3R4dH1cIlxyXG4gICAgICAgICAgICAgICAgLCBtb2RlbERlZmF1bHRzOiB7IHByaXpfcG9tZXJfa2g6IC0xIH1cclxuICAgICAgICAgICAgICAgIC8vLCBlbXB0eVZhbHVlOiBwb2xvemthUG9tZXJcclxuICAgICAgICAgICAgICAgICwgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoIFtcclxuICAgICAgICAgICAgICAgICAgICAvL3BvbG96a2FQb21lciAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgIHsgcHJpel9wb21lcl9raF90eHQ6IFwianJlczozMDI1MDI1OVwiLCBwcml6X3BvbWVyX2toOiAxIH0gLy9SQyAzMDI1MDI1OSA6IEFub1xyXG4gICAgICAgICAgICAgICAgICAgICwgeyBwcml6X3BvbWVyX2toX3R4dDogXCJqcmVzOjMwMjUwMjYwXCIsIHByaXpfcG9tZXJfa2g6IDAgfSAvL1JDIDMwMjUwMjYwIDogTmVcclxuXHJcbiAgICAgICAgICAgICAgICBdLCB7IGtleTogXCJwcml6X3BvbWVyX2toXCIgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAyNjJcIikgLy9SQyAzMDI1MDI2MiA6IFpkYW7Em27DrSBwxZnDrWplbWNlbVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpel96YWhyX2toXCIsIG11bHRpOiBmYWxzZSwgbGlzdDogdHJ1ZSwgaXRlbVdpZHRoOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInByaXpfemFocl9raCA9IHZhbHVlLnByaXpfemFocl9raFwiXHJcbiAgICAgICAgICAgICAgICAsIGRyb3Bkb3duOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgLy8sIG1vZGVsOiBcIm1vZGVsLnNfemF1PXZhbHVlLnNfemF1XCIsIGl0ZW1UZW1wbGF0ZTogXCJ7c196YXVfdHh0fVwiXHJcbiAgICAgICAgICAgICAgICAsIGl0ZW1UZW1wbGF0ZTogXCJ7cHJpel96YWhyX2toX3R4dH1cIlxyXG4gICAgICAgICAgICAgICAgLy8sZW1wdHlWYWx1ZTogLTFcclxuICAgICAgICAgICAgICAgICwgbW9kZWxEZWZhdWx0czogeyBwcml6X3phaHJfa2g6IC0xIH1cclxuICAgICAgICAgICAgICAgIC8vLCBlbXB0eVZhbHVlOiBwb2xvemthWmRhbmVuaVxyXG4gICAgICAgICAgICAgICAgLCBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wb2xvemthWmRhbmVuaSAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgeyBwcml6X3phaHJfa2hfdHh0OiBcImpyZXM6MzAyNTAyNjNcIiwgcHJpel96YWhyX2toOiAwIH0gLy9SQyAzMDI1MDI2MyA6IFBsbsSbbsOtIC0gdHV6ZW1za8OpXHJcbiAgICAgICAgICAgICAgICAgICAgLCB7IHByaXpfemFocl9raF90eHQ6IFwianJlczozMDI1MDI2NFwiLCBwcml6X3phaHJfa2g6IDEgfSAvL1JDIDMwMjUwMjY0IDogUGxuxJtuw60gLSB6YWhyYW5pxI1uw61cclxuXHJcbiAgICAgICAgICAgICAgICBdLCB7IGtleTpcInByaXpfemFocl9raFwiIH0pICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRhdGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgbGFiZWw6IFwianJlczozMDI1MDI2NVwiIC8vUkMgMzAyNTAyNjUgOiBEYXR1bSBkb3J1xI1lbsOtIG9kLWRvXHJcbiAgICAgICAgICAgICAgICAgICAgLCBuYW1lOiBcImRhdF9kb3Jfa2hcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgcGF0aEluTW9kZWw6IFwibW9kZWwuZGF0X2Rvcl9raFwiXHJcblxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBsYWJlbDogXCJqcmVzOjMwMjUwMjY2XCIgLy9SQyAzMDI1MDI2NiA6IERhdHVtIHZ5c3RhdmVuw60gb2QtZG9cclxuICAgICAgICAgICAgICAgICAgICAsIG5hbWU6IFwiZGF0X3Z5c3Rfa2hcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgcGF0aEluTW9kZWw6IFwibW9kZWwuZGF0X3Z5c3Rfa2hcIlxyXG5cclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRhdGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgbGFiZWw6IFwianJlczozMDI1MDI2N1wiIC8vUkMgMzAyNTAyNjcgOiBEYXR1bSBldmlkZW5jZSBvZC1kb1xyXG4gICAgICAgICAgICAgICAgICAgICwgbmFtZTogXCJkYXRfZXZpZF9raFwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBwYXRoSW5Nb2RlbDogXCJtb2RlbC5kYXRfZXZpZF9raFwiXHJcblxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBsYWJlbDogXCJqcmVzOjMwMjUwMjY4XCIgLy9SQyAzMDI1MDI2OCA6IERhdHVtIHVwbGF0bsSbbsOtIGRhbsSbIG9kLWRvXHJcbiAgICAgICAgICAgICAgICAgICAgLCBuYW1lOiBcImRhdF91cGRfa2hcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgcGF0aEluTW9kZWw6IFwibW9kZWwuZGF0X3VwZF9raFwiXHJcblxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBsYWJlbDogXCJqcmVzOjMwMjUwMjY5XCIgLy9SQyAzMDI1MDI2OSA6IERhdHVtIHpkYW5pdGVsbsOpaG8gcGxuxJtuw60gb2QtZG9cclxuICAgICAgICAgICAgICAgICAgICAsIG5hbWU6IFwiZGF0X3pkYW5fa2hcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgcGF0aEluTW9kZWw6IFwibW9kZWwuZGF0X3pkYW5fa2hcIlxyXG5cclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICA7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gZmlsdGVyRm9ybURlZjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGZ1bmN0aW9uIF9DcmVhdGVGaWx0ZXJWbGFzdG5vc3RpXHJcbiAgICAgKiAgWmFsb3prYSB2bGFzdG5vc3RpXHJcbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb24gKGNvbnRlbnQ6R0NvbnRlbnQpOmFueSB7fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBfQ3JlYXRlRmlsdGVyVmxhc3Rub3N0aShjb250ZW50OiBHVWN0U2V6bmFtKTogYW55IHtcclxuICAgICAgICBsZXQgc3hzVHlwOiB7IHN4czogc3RyaW5nIHwgbnVsbCwgdHlwX29iajogbnVtYmVyIH1bXSA9IFt7IHN4czogbnVsbCwgdHlwX29iajogVWN0LkludGVyZmFjZS5HRVR5cE9iamVrdHUuS25paGFVQ1QgfV07XHJcbiAgICAgICAgbGV0IGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJqcmVzOjMwMjUwODI2XCIgfSkgLy9SQyAzMDI1MDgyNiA6IFZsYXN0bm9zdGlcclxuICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBqc291IHBhcmFtZXRyeSBwcmVmYWLFryBzcHLDoXZuxJs/XHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwODI3XCIpLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuRmllbGQuR0dpblZsYXN0bm9zdGlFeHRQcm9wc0ZpbHRlckZpZWxkKCAvL1JDIDMwMjUwODI3IDogUm96xaFpxZl1asOtY8OtIHZsYXN0bm9zdGlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZsYXN0bm9zdGlfclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVzdUxvZ292YW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRXN1VkhsZWRhbmlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJwcF9peHNfdHlwOiBjb250ZW50Lml4c1R5cHksXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwX29iajogW1VjdC5JbnRlcmZhY2UuR0VUeXBPYmpla3R1LktuaWhhVUNUXSxcclxuICAgICAgICAgICAgICAgICAgICB0X3N4czogc3hzVHlwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgIC8vLmFkZFJvdyhcImpyZXM6MzAyNTA4MjhcIikuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5GaWVsZC5HR2luVmxhc3Rub3N0aUZpbHRlckZpZWxkKCAvL1JDIDMwMjUwODI4IDogUG9waXNuw6kgdmxhc3Rub3N0aVxyXG4gICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcInZsYXN0bm9zdGlfc1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZXN1TG9nb3Zhbmk6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBJeHA6IFwiXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgQWt0Wm5hY2thOiBcIlwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlFc3VWSGxlZGFuaVxyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vKSlcclxuICAgICAgICAgICAgO1xyXG4gICAgICAgIHJldHVybiBmaWx0ZXJGb3JtRGVmO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZnVuY3Rpb24gX0NyZWF0ZUZpbHRlcmRva3VtZW50XHJcbiAgICAgKiAgWmFsb3prYSBkb2t1bWVudFxyXG4gICAgICogQHR5cGUge2Z1bmN0aW9uIChjb250ZW50OkdDb250ZW50KTphbnkge31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gX0NyZWF0ZUZpbHRlckRva3VtZW50KGNvbnRlbnQ6IEdDb250ZW50LCBwYXJhbTogR29yZGljLlNzbC5JbnRlcmZhY2UuR0Rva3VtZW50R2V0Q29sdW1uUGFyYW1zUmVzcG9uc2VEdG8pOiBhbnkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBmaWx0ZXJGb3JtRGVmID0gR29yZGljLlNzbC5XZWJDbGllbnQuR0Rva3VtZW50SXNsLkFkZERva3VtZW50RmlsdGVyRmllbGRzSW1tZWRpYXRlKHtcclxuICAgICAgICAgICAgY29udGVudDogY29udGVudCxcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbSxcclxuICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwiRG9rdW1lbnRcIiB9KS5hZGRTZWN0aW9uKCksXHJcbiAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlczogZG9rdW1lbnRQYXJhbXMsXHJcbiAgICAgICAgICAgIGZpZWxkczogcHJlc2V0RG9rdW1lbnRGaWVsZHMsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBzY29wZUxldmVsczogW1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFbFoWVjaG55IG5hcG9qZW7DqSBmaWx0cnkgYnVkb3UgbcOtdCB2IG7DoXp2dSBwcmVmaXggXCJkb2t1bWVudFwiICh6ZGUgdGVkeSBmaWx0cmHEjW7DrSBlbnVtIGJ1ZGUgb2JzYWhvdmF0IGhvZG5vdHkgZG9rdW1lbnRfaXhwLCBkb2t1bWVudF9peHNfZnVuX2FrdCBhIGRva3VtZW50X25hemV2KS4gVMOtbSBqZSBtb8W+bsOpIG9kbGnFoWl0IGZpbHRyeSwga3RlcsOpIHNwcmF2dWppIHPDoW0gamFrbyBhdXRvciBlbnRpdHkgYSB0eSwga3RlcsOpIHNpIMWZZcWhw60gZG9rdW1lbnQgc8OhbS5cclxuICAgICAgICAgICAgICAgICAgICB7IHNjb3BlOiBcImRva3VtZW50XCIgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWVsZHNPcHRpb25zOiB7fVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmaWx0ZXJGb3JtRGVmO1xyXG4gICAgfVxyXG5cclxufSJdfQ==
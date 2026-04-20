"use strict";
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var AppSettings;
        (function (AppSettings) {
            /**
             * Uživatelské nastavení
             *
             * @author Martin Hanuš
             * @since 489.1.0.0
             */
            /**
             * Definice formulářů pro uživatelské nastavení
             *
             * @param data
             * @returns {Forms.Form[]} formuláře
             */
            function ListsSettingsForm(data) {
                const forms = [
                    Gordic.Report.WebClient.GReportsUserSettings(),
                    Gordic.Wfl.AppSettings.AttachmentOpenSettingsForm(),
                    Gordic.Wfl.AppSettings.ColorPickerSettingsForm(),
                    Gordic.Eko.Utils.EkoUserSettingsPid(data.gin_gen_ixp),
                    Gordic.Eko.Utils.EkoUserSettingsEkoBook(),
                    Gordic.Eko.Utils.EkoUserSettingsList(),
                    /**
                    * ↓ @author vcech
                    */
                    PodaniSettings(),
                    OdeslaniDokElPostouSettings(),
                    DatumySettings(),
                    UpozorneniSettings(),
                    //TypPhlSettings(), //nezapojeno, výběr typu pohledávky je dělán jinak
                    PopisyPoliSettings(),
                    //SeznamPripaduSettings(), // není potřeba, lze si v tabulce prostě uložit vlastní nastavení sloupců
                    ZpusobyUhradySettings(),
                    RadOblSettings(),
                    OblibeneCtvrtiSettings(),
                    OblibeneKtgUpoSettings(),
                    ROBSettings(),
                    ZasilkySettings()
                ];
                // Pokud se jedná o striktní režim (armáda), tak se čte skupina jinak, tak nebude nic defaultně nastaveno
                if (data.striktniRezim == "False")
                    forms.push(GeneraceVymahaniSettings());
                return forms;
                //Na TS zavolat následovně:
                //that.globalSettings!.get("Global.Ddp.NázevSekce.NázevHodnotyVModelu");
                //Na CS lze pouze přečíst následovně:
                //GlobalSettings.Get("Global.Ddp.NázevSekce.NázevHodnotyVModelu", "Hodnota co se načte pokud ve storage není hodnota");
            }
            AppSettings.ListsSettingsForm = ListsSettingsForm;
            /** Definice formuláře do uživatelského nastavení, podání
            *
            * @returns {Forms.Form}
            */
            function PodaniSettings() {
                //ixxinit, nazvy, 
                let form = new Gordic.Forms
                    .Form({ name: "PodaniForm", tabOptions: { title: "Podání", opened: false } })
                    //.addRow("Předplnění identifikátoru dokladu") // již společná komponenta
                    //.addField("gstringbox", { 
                    //    name: "ixx_init",
                    //    model: "Global.Ddp.ObecneSettings.PredplneniPID=value",
                    //    customClass: "userSettings-saveWithoutNotice"
                    //}) //
                    .addRow("Předplnění způsobu úhrady")
                    .addField("gselectbox", Gordic.Prefabs.Select.ekocizp(), {
                    name: "pred_zp_uhr",
                    model: "Global.Ddp.ObecneSettings.PredplneniZpUhr=value.zp",
                    customClass: "userSettings-saveWithoutNotice"
                });
                return form;
            }
            AppSettings.PodaniSettings = PodaniSettings;
            /** Definice formuláře do uživatelského nastavení, email pro odeslání dokumentu el. poštou
            *
            * @returns {Forms.Form}
            */
            function OdeslaniDokElPostouSettings() {
                let form = new Gordic.Forms
                    .Form({ name: "OdeslaniDokForm", tabOptions: { title: "Odeslání dokumentu el. poštou", opened: false } })
                    .addRow("E-mailová adresa odesílatele (uživatele)")
                    .addField("gstringbox", {
                    name: "email",
                    model: "Global.Ddp.ObecneSettings.EmailOdesilatele=value",
                    customClass: "userSettings-saveWithoutNotice",
                    change: (_ev, obj) => {
                        var content = $.content("main");
                        content.isl.DdpUserSettings.ulozEmail({ email: obj.value }).get();
                    }
                });
                return form;
            }
            AppSettings.OdeslaniDokElPostouSettings = OdeslaniDokElPostouSettings;
            /** Definice formuláře do uživatelského nastavení, email pro odeslání dokumentu el. poštou
            *
            * @returns {Forms.Form}
            */
            function DatumySettings() {
                //!!!Ukázka jak získat hodnotu datumu napojení a salda!!!
                //Je nutno volat takto, jelikož chceme aby byly tyto datumy nastaveny jen pro tuto session
                //#region ukázka získání hodnoty datumů
                //var datumNapojeni;
                //var datumSalda;
                //that.isl.DdpUserSettings.priznakyDatumu({ save: false }).get().done(function (priznakNacteniDatumu) {
                //    if (priznakNacteniDatumu) { //pokud je příznak true, tak můžeme načíst data z usersettings
                //        datumNapojeni = that.globalSettings!.get("Global.Ddp.ObecneSettings.DatumNapojeni");
                //        datumSalda = that.globalSettings!.get("Global.Ddp.ObecneSettings.DatumSalda");
                //    }
                //    else {
                //        datumNapojeni = null;
                //        datumSalda = null;
                //    }
                //});
                //#endregion
                let form = new Gordic.Forms
                    .Form({ name: "DatumyForm", tabOptions: { title: "Datumy", opened: false } })
                    .addText("Platí pouze pro dobu přihlášení")
                    .addRow("Datum napojení poplatníků")
                    .addField("gdatebox", {
                    name: "dat_nap",
                    customClass: "userSettings-saveWithoutNotice",
                    model: function (operation) {
                        var content = $.content("main");
                        switch (operation) {
                            case "apply": //onload
                                var that = $(this);
                                content.isl.DdpUserSettings.priznakyDatumu({ save: false }).get().done(function (priznakNacteniDatumu) {
                                    if (!priznakNacteniDatumu) {
                                        that.gfield("setValue", null);
                                        content.globalSettings.set("Global.Ddp.ObecneSettings.DatumNapojeni", null);
                                    }
                                    else {
                                        var datumNapojeni = content.globalSettings.get("Global.Ddp.ObecneSettings.DatumNapojeni");
                                        that.gfield("setInitial", datumNapojeni);
                                    }
                                });
                                return;
                            case "collect": //onchange
                                var datumNapojeni = $(this).gfield("getValue");
                                var content = $.content("main");
                                content.isl.DdpUserSettings.priznakyDatumu({ save: true }).get();
                                content.globalSettings.set("Global.Ddp.ObecneSettings.DatumNapojeni", datumNapojeni);
                                return;
                        }
                    }
                })
                    .addRow("Datum salda")
                    .addField("gdatebox", {
                    name: "dat_saldo",
                    customClass: "userSettings-saveWithoutNotice",
                    model: function (operation) {
                        var content = $.content("main");
                        switch (operation) {
                            case "apply": //onload
                                var that = $(this);
                                content.isl.DdpUserSettings.priznakyDatumu({ save: false }).get().done(function (priznakNacteniDatumu) {
                                    if (!priznakNacteniDatumu) {
                                        that.gfield("setValue", null);
                                        content.globalSettings.set("Global.Ddp.ObecneSettings.DatumSalda", null);
                                    }
                                    else {
                                        var datumSalda = content.globalSettings.get("Global.Ddp.ObecneSettings.DatumSalda");
                                        that.gfield("setInitial", datumSalda);
                                    }
                                });
                                return;
                            case "collect": //onchange
                                var datumSalda = $(this).gfield("getValue");
                                var content = $.content("main");
                                content.isl.DdpUserSettings.priznakyDatumu({ save: true }).get();
                                content.globalSettings.set("Global.Ddp.ObecneSettings.DatumSalda", datumSalda);
                                return;
                        }
                    }
                });
                return form;
            }
            AppSettings.DatumySettings = DatumySettings;
            /** Definice formuláře do uživatelského nastavení, upozornění
            *
            * @returns {Forms.Form}
            */
            function UpozorneniSettings() {
                let form = new Gordic.Forms
                    .Form({ name: "UpozorneniForm", layoutDescriptor: "L2M2S1, L-2-8-2, M-0-12-0, S-0-12-0", tabOptions: { title: "Upozornění", opened: false } })
                    .addRow()
                    .addField("gcheck", "w-6", {
                    name: "other_user",
                    label: "Upozornit na prohlížení cizích případů",
                    model: "Global.Ddp.ObecneSettings.OtherUser=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addField("gcheck", "w-6", {
                    name: "other_phl",
                    label: "Upozornit na prohlížení případů z jiných typů pohledávek",
                    model: "Global.Ddp.ObecneSettings.OtherPhl=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addField("gcheck", "w-6", {
                    name: "other_den",
                    label: "Upozornit na prohlížení případů z jiných knih",
                    model: "Global.Ddp.ObecneSettings.OtherDen=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addField("gcheck", "w-6", {
                    name: "show_dat_poc_warn",
                    label: "Upozornit na chybné datum počátku",
                    model: "Global.Ddp.ObecneSettings.ShowDatPocWarn=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addRow()
                    .addField("gcheck", "w-6", {
                    name: "rozdil",
                    label: "Upozornit na nesouhlas částek předpisů a celkové částky",
                    model: "Global.Ddp.ObecneSettings.Rozdil=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addField("gcheck", "w-6", {
                    name: "kont_saz_poc",
                    label: "Upozornit na nesouhlas částky případu a sazba*počet",
                    model: "Global.Ddp.ObecneSettings.KontSazPoc=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addField("gcheck", "w-6", {
                    name: "tisk_vym_dotaz",
                    label: "Dotaz na správnost tisku vymáhání",
                    model: "Global.Ddp.ObecneSettings.TiskVymDotaz=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addField("gcheck", "w-6", {
                    name: "kont_splvzn",
                    label: "Kontrola data splatnosti menšího než datum vzniku",
                    model: "Global.Ddp.ObecneSettings.KontSplvzn=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addField("gcheck", "w-6", {
                    name: "kont_dat",
                    label: "Kontrola zadaných datumů mimo interval 1980 - 2050",
                    model: "Global.Ddp.ObecneSettings.KontDat=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addField("gcheck", "w-6", {
                    name: "kont_del_vs",
                    label: "Kontrola délky zadávaného VS",
                    model: "Global.Ddp.ObecneSettings.KontDelVS=value",
                    customClass: "userSettings-saveWithoutNotice"
                });
                return form;
            }
            AppSettings.UpozorneniSettings = UpozorneniSettings;
            /** Definice formuláře do uživatelského nastavení, výběr typu pohledávky
            *
            * @returns {Forms.Form}
            */
            function TypPhlSettings() {
                let form = new Gordic.Forms
                    .Form({ name: "TypPhlForm", tabOptions: { title: "Výběr typu pohledávky", opened: false } })
                    .addRow()
                    .addField("gcheck", {
                    name: "typ_phl_vyber_auto",
                    label: "Při startu vybírat poslední použitý",
                    model: "Global.Ddp.ObecneSettings.TypPhlVyberAuto=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addRow()
                    .addField("gcheck", {
                    name: "typ_phl_vyber_maska",
                    label: "Pamatovat si masku",
                    model: "Global.Ddp.ObecneSettings.TypPhlVyberMaska=value",
                    customClass: "userSettings-saveWithoutNotice"
                });
                return form;
            }
            AppSettings.TypPhlSettings = TypPhlSettings;
            /** Definice formuláře do uživatelského nastavení, popisy polí
            *
            * @returns {Forms.Form}
            */
            function PopisyPoliSettings() {
                let form = new Gordic.Forms
                    .Form({ name: "PopisyPoliForm", tabOptions: { title: "Popisy polí", opened: false } })
                    .addRow("Popis pole 'Částka v CZK'")
                    .addField("gstringbox", {
                    name: "popis_castka",
                    model: "Global.Ddp.ObecneSettings.PopisCastka=value",
                    customClass: "userSettings-saveWithoutNotice"
                });
                return form;
            }
            AppSettings.PopisyPoliSettings = PopisyPoliSettings;
            /** Definice formuláře do uživatelského nastavení, seznam případů
            *
            * @returns {Forms.Form}
            */
            function SeznamPripaduSettings() {
                let form = new Gordic.Forms
                    .Form({ name: "SeznamPripaduForm", tabOptions: { title: "Seznam případů", opened: false } })
                    .addRow()
                    .addField("gcheck", {
                    name: "seznam_pripadu_zvlast",
                    label: "Pamatovat si nastavení sloupců pro každý typ pohledávky samostatně",
                    model: "Global.Ddp.ObecneSettings.SeznamPripaduZvlast=value",
                    customClass: "userSettings-saveWithoutNotice"
                });
                return form;
            }
            AppSettings.SeznamPripaduSettings = SeznamPripaduSettings;
            /** Definice formuláře do uživatelského nastavení, způsoby úhrady
            *
            * @returns {Forms.Form}
            */
            function ZpusobyUhradySettings() {
                var loadedValue;
                var lastTypPhl;
                var view;
                var formName = "ZpusobyUhradyForm";
                var content = $.content("main");
                let form = new Gordic.Forms
                    .Form({ name: formName, tabOptions: { title: "Způsob úhrady", opened: false } })
                    .addRow("Kniha")
                    .addField("gselectbox", Gordic.Prefabs.Select.ddpKniha(), {
                    name: "ixp_den",
                    itemTemplate: "{nazev}",
                    customClass: "userSettings-saveWithoutNotice",
                    //model: "Global.Ddp.ZpusobyUhradySettings.Kniha=value",
                    change: () => {
                        // Když se změní hodnota pole tak to vyhodí toast nofikaci, a ono toho je strašně moc tak je mažu
                        removeNotifications();
                        //setValueNull();
                    },
                    model: function (operation) {
                        var that = $(this);
                        switch (operation) {
                            case "apply":
                                content.isl.DdpUserSettings.getEkoParams()
                                    .get().done((result) => {
                                    that.gfield("setValue", { ixp_den: result.ixp_den, nazev: result.nazev });
                                    var form = $.content().findForms(formName);
                                    form.findFields("typ_phl").gfield("setValue", { typ_phl: result.typ_phl, nazev: result.nazev_typ_phl });
                                });
                                break;
                        }
                    }
                })
                    .addRow("Typ pohledávky")
                    .addField("gselectbox", Gordic.Prefabs.Select.typPohledavky(), {
                    name: "typ_phl",
                    itemTemplate: "{typ_phl} - {nazev}",
                    dropdown: true,
                    serverFilters: {
                        ixp_den: new Gordic.Forms.Dependency("ixp_den", "ixp_den", true),
                        phl_pro_roky: true,
                        aktivita: 100
                    },
                    change: () => {
                        removeNotifications();
                        emptyGridInit(formName, lastTypPhl);
                    },
                    model: function (operation) {
                        var form = $.content().findForms(formName);
                        var ixp_den = form.findFields("ixp_den").gfield("getValue")?.ixp_den || null;
                        var typ_phl = form.findFields("typ_phl").gfield("getValue")?.typ_phl || null;
                        if (typ_phl != null)
                            lastTypPhl = typ_phl;
                        switch (operation) {
                            case "collect":
                                var content = $.content("main");
                                if (ixp_den != null && typ_phl != null) {
                                    content.isl.DdpUserSettings.zpusobyUhrady()
                                        .get().done((dto) => {
                                        view = new Gordic.Data.View(dto.data);
                                        loadedValue = content.globalSettings.get("Global.Ddp.ZpusobyUhradySettings.UseZp" + ixp_den + typ_phl);
                                        if (loadedValue != null) {
                                            var rows = view.getDataRows(true);
                                            var splitValues = loadedValue.split(","); // split saved global settings values
                                            rows.forEach((row) => {
                                                if (splitValues.includes(row.data.zp?.toString())) {
                                                    row.checked = true;
                                                }
                                            });
                                            view = new Gordic.Data.View(rows);
                                        }
                                        fullGridInit(formName, view);
                                    });
                                }
                        }
                        return;
                    }
                })
                    .addRow()
                    .addField("ggrid", {
                    rowHeight: 35,
                    columns: Gordic.Ddp.WebClient.Common.GridFormats.ZpusobyUhradySettings(),
                    customClass: "gform-ignorefield", //gform-ignorefield
                    data: [],
                    multi: true,
                    showTopPanel: false,
                    showBottomPanel: false,
                    selection: () => {
                        //když se mění zaškrtnutí tak to vyhodí toast nofikaci, a ono toho je strašně moc tak mažu
                        removeNotifications();
                    }
                })
                    .addField("gstringbox", {
                    name: "use_zp",
                    disabled: true,
                    customClass: "userSettings-saveWithoutNotice hidden",
                    model: function (operation, dto) {
                        loadedValue = invisFieldActions(formName, "ZpusobyUhradySettings.UseZp", operation, dto, this, loadedValue);
                    }
                })
                    .addField("gbutton", {
                    params: {
                        action: new GAction({
                            name: "btnSave",
                            caption: "Uložit",
                            run: function () {
                                var selectedValues = "";
                                var grid = $('div[data-form="ZpusobyUhradyForm"] .gform-field.ggrid');
                                var grid_view = grid.ggrid("getView");
                                var rows = grid_view.getDataRows(true);
                                rows.forEach((row) => {
                                    if (row.checked) {
                                        selectedValues += row.data.zp + ",";
                                    }
                                });
                                selectedValues += "0";
                                $.content().findFields("use_zp").gfield("setValue", selectedValues);
                            }
                        })
                    }
                });
                return form;
            }
            AppSettings.ZpusobyUhradySettings = ZpusobyUhradySettings;
            //oblíbené řádky se ukládájí ve formátu: rad_obl_l + Identifikátor knihy + Typ pohledávky
            //var oblibene_radky = that.globalSettings!.get("Global.Ddp.RadOblSettings.rad_obl_l" + that.IxpDen + that.typ_phl); //oblíbené řádky
            //do této cesty se to hodí jako string: "0,10,20,..."
            /** Definice formuláře do uživatelského nastavení, oblíbené řádky na knize/typu pohledávky
            *
            * @returns {Forms.Form}
            */
            function RadOblSettings() {
                var view;
                var lastTypPhl;
                var loadedValue;
                var formName = "RadOblForm";
                var content = $.content("main");
                var form = new Gordic.Forms
                    .Form({ name: formName, tabOptions: { title: "Oblíbené řádky", opened: false } })
                    .addRow("Kniha")
                    .addField("gselectbox", Gordic.Prefabs.Select.ddpKniha(), {
                    name: "ixp_den",
                    itemTemplate: "{nazev}",
                    customClass: "userSettings-saveWithoutNotice",
                    //model: "Global.Ddp.RadOblSettings.Kniha=value",
                    change: () => {
                        removeNotifications();
                        //setValueNull();
                    },
                    model: function (operation) {
                        var that = $(this);
                        switch (operation) {
                            case "apply":
                                content.isl.DdpUserSettings.getEkoParams()
                                    .get().done((result) => {
                                    that.gfield("setValue", { ixp_den: result.ixp_den, nazev: result.nazev });
                                    var form = $.content().findForms(formName);
                                    form.findFields("typ_phl").gfield("setValue", { typ_phl: result.typ_phl, nazev: result.nazev_typ_phl });
                                });
                                break;
                        }
                    }
                })
                    .addRow("Typ pohledávky")
                    .addField("gselectbox", Gordic.Prefabs.Select.typPohledavky(), {
                    name: "typ_phl",
                    itemTemplate: "{typ_phl} - {nazev}",
                    dropdown: true,
                    serverFilters: {
                        ixp_den: new Gordic.Forms.Dependency("ixp_den", "ixp_den", true),
                        phl_pro_roky: true,
                        aktivita: 100
                    },
                    change: () => {
                        removeNotifications();
                        emptyGridInit(formName, lastTypPhl);
                    },
                    model: function (operation) {
                        var form = $.content().findForms(formName);
                        var ixp_den = form.findFields("ixp_den").gfield("getValue")?.ixp_den || null;
                        var typ_phl = form.findFields("typ_phl").gfield("getValue")?.typ_phl || null;
                        if (typ_phl != null)
                            lastTypPhl = typ_phl;
                        switch (operation) {
                            case "collect":
                                var content = $.content("main");
                                if (ixp_den != null && typ_phl != null) {
                                    const filter = {
                                        ixp_den: ixp_den,
                                        typ_phl: typ_phl
                                    };
                                    content.isl.DdpUserSettings.oblibeneRadky(() => {
                                        return {
                                            filters: filter
                                        };
                                    }).get().done((dto) => {
                                        view = new Gordic.Data.View(dto.data);
                                        loadedValue = content.globalSettings.get("Global.Ddp.RadOblSettings.rad_obl_l" + ixp_den + typ_phl);
                                        if (loadedValue != null) {
                                            var rows = view.getDataRows(true);
                                            var splitValues = loadedValue.split(","); //rozdělení uložených hodnot v globalsettings
                                            rows.forEach((row) => {
                                                if (splitValues.includes(row.data.ddp_radek?.toString())) {
                                                    row.checked = true;
                                                }
                                            });
                                            view = new Gordic.Data.View(rows);
                                        }
                                        fullGridInit(formName, view);
                                    });
                                }
                        }
                        return;
                    }
                })
                    .addRow()
                    .addField("ggrid", {
                    rowHeight: 35,
                    columns: Gordic.Ddp.WebClient.Common.GridFormats.UserSettingsNazev(),
                    customClass: "gform-ignorefield",
                    data: [],
                    multi: true,
                    showTopPanel: false,
                    showBottomPanel: false,
                    selection: () => {
                        removeNotifications();
                    }
                })
                    .addField("gstringbox", {
                    name: "oblibene_radky",
                    disabled: true,
                    customClass: "userSettings-saveWithoutNotice hidden",
                    model: function (operation, dto) {
                        loadedValue = invisFieldActions(formName, "RadOblSettings.rad_obl_l", operation, dto, this, loadedValue);
                    }
                })
                    .addField("gbutton", {
                    params: {
                        action: new GAction({
                            name: "btnSave",
                            caption: "Uložit",
                            run: function () {
                                var selectedValues = "";
                                //not selected, but checked
                                var grid_view = $('div[data-form="RadOblForm"] .gform-field.ggrid').ggrid("getView");
                                var rows = grid_view.getDataRows(true);
                                rows.forEach((row) => {
                                    if (row.checked) {
                                        selectedValues += row.data.ddp_radek + ",";
                                    }
                                });
                                if (selectedValues != "")
                                    selectedValues = selectedValues.replace(/,$/, "");
                                $.content().findFields("oblibene_radky").gfield("setValue", selectedValues);
                            }
                        })
                    }
                });
                return form;
            }
            AppSettings.RadOblSettings = RadOblSettings;
            //oblíbené čtvrti se ukládájí ve formátu: ctv_obl_l + Identifikátor knihy + Typ pohledávky
            //var oblibene_ctvrti = that.globalSettings!.get("Global.Ddp.OblibenaCtvrtSettings.ctv_obl_l" + that.IxpDen + that.typ_phl); //oblíbené čtvrti
            //do této cesty se to hodí jako string: "0,10,20,..."
            /** Definice formuláře do uživatelského nastavení, oblíbené čtvrti na knize/typu pohledávky
            *
            * @returns {Forms.Form}
            */
            function OblibeneCtvrtiSettings() {
                var loadedValue;
                var lastTypPhl;
                var view;
                var form_name = "OblibeneCtvrtiForm";
                var content = $.content("main");
                var form = new Gordic.Forms.Form({ name: "OblibeneCtvrtiForm", tabOptions: { title: "Oblíbené čtvrti", opened: false } })
                    .addRow("Kniha")
                    .addField("gselectbox", Gordic.Prefabs.Select.ddpKniha(), {
                    name: "ixp_den",
                    itemTemplate: "{nazev}",
                    customClass: "userSettings-saveWithoutNotice",
                    //model: "Global.Ddp.OblibeneCtvrtiSettings.Kniha=value",
                    change: () => {
                        removeNotifications();
                        //setValueNull();
                    },
                    model: function (operation) {
                        var that = $(this);
                        switch (operation) {
                            case "apply":
                                content.isl.DdpUserSettings.getEkoParams()
                                    .get().done((result) => {
                                    that.gfield("setValue", { ixp_den: result.ixp_den, nazev: result.nazev });
                                    var form = $.content().findForms("OblibeneCtvrtiForm");
                                    form.findFields("typ_phl").gfield("setValue", { typ_phl: result.typ_phl, nazev: result.nazev_typ_phl });
                                });
                                break;
                        }
                    }
                })
                    .addRow("Typ pohledávky")
                    .addField("gselectbox", Gordic.Prefabs.Select.typPohledavky(), {
                    name: "typ_phl",
                    itemTemplate: "{typ_phl} - {nazev}",
                    dropdown: true,
                    serverFilters: {
                        ixp_den: new Gordic.Forms.Dependency("ixp_den", "ixp_den", true),
                        phl_pro_roky: true,
                        aktivita: 100
                    },
                    change: () => {
                        removeNotifications();
                        emptyGridInit(form_name, lastTypPhl);
                    },
                    model: function (operation) {
                        var form = $.content().findForms("OblibeneCtvrtiForm");
                        var ixp_den = form.findFields("ixp_den").gfield("getValue")?.ixp_den || null;
                        var typ_phl = form.findFields("typ_phl").gfield("getValue")?.typ_phl || null;
                        if (typ_phl != null)
                            lastTypPhl = typ_phl;
                        switch (operation) {
                            case "collect":
                                var content = $.content("main");
                                if (ixp_den != null && typ_phl != null) {
                                    const filter = {
                                        ixp_den: ixp_den,
                                        typ_phl: typ_phl
                                    };
                                    content.isl.DdpUserSettings.oblibeneCtvrti(() => {
                                        return {
                                            filters: filter
                                        };
                                    }).get().done(function (dto) {
                                        view = new Gordic.Data.View(dto.data);
                                        loadedValue = content.globalSettings.get("Global.Ddp.OblibeneCtvrtiSettings.ctv_obl_l" + ixp_den + typ_phl);
                                        if (loadedValue != null) {
                                            var rows = view.getDataRows(true);
                                            var splitValues = loadedValue.split(","); //rozdělení uložených hodnot v globalsettings
                                            rows.forEach((row) => {
                                                if (splitValues.includes(row.data.ddp_ctvrt?.toString())) {
                                                    row.checked = true;
                                                }
                                            });
                                            view = new Gordic.Data.View(rows);
                                        }
                                        fullGridInit("OblibeneCtvrtiForm", view);
                                    });
                                }
                        }
                        return;
                    }
                })
                    .addRow()
                    .addField("ggrid", {
                    rowHeight: 35,
                    columns: Gordic.Ddp.WebClient.Common.GridFormats.UserSettingsNazev(),
                    customClass: "gform-ignorefield",
                    data: [],
                    multi: true,
                    showTopPanel: false,
                    showBottomPanel: false,
                    selection: () => {
                        removeNotifications();
                    }
                })
                    .addField("gstringbox", {
                    name: "oblibene_ctvrti",
                    disabled: true,
                    customClass: "userSettings-saveWithoutNotice hidden",
                    model: function (operation, dto) {
                        loadedValue = invisFieldActions("OblibeneCtvrtiForm", "OblibeneCtvrtiSettings.ctv_obl_l", operation, dto, this, loadedValue);
                    }
                })
                    .addField("gbutton", {
                    params: {
                        action: new GAction({
                            name: "btnSave",
                            caption: "Uložit",
                            run: function () {
                                var selectedValues = "";
                                var grid_view = $('div[data-form="OblibeneCtvrtiForm"] .gform-field.ggrid').ggrid("getView");
                                var rows = grid_view.getDataRows(true);
                                rows.forEach((row) => {
                                    if (row.checked) {
                                        selectedValues += row.data.ddp_ctvrt + ",";
                                    }
                                });
                                if (selectedValues != "")
                                    selectedValues = selectedValues.replace(/,$/, "");
                                $.content().findFields("oblibene_ctvrti").gfield("setValue", selectedValues);
                            }
                        })
                    }
                });
                return form;
            }
            AppSettings.OblibeneCtvrtiSettings = OblibeneCtvrtiSettings;
            /** Definice formuláře do uživatelského nastavení, oblíbené kategorie pohybu
            *
            * @returns {Forms.Form}
            */
            function OblibeneKtgUpoSettings() {
                var loadedValue;
                var lastTypPhl;
                var view;
                var form_name = "OblibeneKtgUpoForm";
                var content = $.content("main");
                var form = new Gordic.Forms
                    .Form({ name: "OblibeneKtgUpoForm", tabOptions: { title: "Oblíbené kategorie pohybu", opened: false } })
                    .addRow("Kniha")
                    .addField("gselectbox", Gordic.Prefabs.Select.ddpKniha(), {
                    name: "ixp_den",
                    itemTemplate: "{nazev}",
                    customClass: "userSettings-saveWithoutNotice",
                    //model: "Global.Ddp.OblibeneKtgUpoSettings.Kniha=value",
                    change: () => {
                        removeNotifications();
                        //setValueNull();
                    },
                    model: function (operation) {
                        var that = $(this);
                        switch (operation) {
                            case "apply":
                                content.isl.DdpUserSettings.getEkoParams()
                                    .get().done((result) => {
                                    that.gfield("setValue", { ixp_den: result.ixp_den, nazev: result.nazev });
                                    var form = $.content().findForms("OblibeneKtgUpoForm");
                                    form.findFields("typ_phl").gfield("setValue", { typ_phl: result.typ_phl, nazev: result.nazev_typ_phl });
                                });
                                break;
                        }
                    }
                })
                    .addRow("Typ pohledávky")
                    .addField("gselectbox", Gordic.Prefabs.Select.typPohledavky(), {
                    name: "typ_phl",
                    itemTemplate: "{typ_phl} - {nazev}",
                    dropdown: true,
                    serverFilters: {
                        ixp_den: new Gordic.Forms.Dependency("ixp_den", "ixp_den", true),
                        phl_pro_roky: true,
                        aktivita: 100
                    },
                    change: () => {
                        removeNotifications();
                        emptyGridInit(form_name, lastTypPhl);
                    },
                    model: function (operation) {
                        var form = $.content().findForms("OblibeneKtgUpoForm");
                        var ixp_den = form.findFields("ixp_den").gfield("getValue")?.ixp_den || null;
                        var typ_phl = form.findFields("typ_phl").gfield("getValue")?.typ_phl || null;
                        if (typ_phl != null)
                            lastTypPhl = typ_phl;
                        switch (operation) {
                            case "collect":
                                var content = $.content("main");
                                var fuccupo_all = content.globalSettings.get("Global.Ddp.OblibeneKtgUpoSettings.fuccupo_all");
                                if (ixp_den != null && typ_phl != null) {
                                    const filter = {
                                        ixp_den: ixp_den,
                                        typ_phl: typ_phl,
                                        fuccupo_all: fuccupo_all
                                    };
                                    content.isl.DdpUserSettings.oblibeneKtgUpo(() => {
                                        return {
                                            filters: filter
                                        };
                                    }).get().done(function (dto) {
                                        view = new Gordic.Data.View(dto.data);
                                        loadedValue = content.globalSettings.get("Global.Ddp.OblibeneKtgUpoSettings.UseUpo" + ixp_den + typ_phl);
                                        if (loadedValue != null) {
                                            var rows = view.getDataRows(true);
                                            var splitValues = loadedValue.split(","); //rozdělení uložených hodnot v globalsettings
                                            rows.forEach((row) => {
                                                if (splitValues.includes(row.data.ktg_upo?.toString())) {
                                                    row.checked = true;
                                                }
                                            });
                                            view = new Gordic.Data.View(rows);
                                        }
                                        fullGridInit("OblibeneKtgUpoForm", view);
                                    });
                                }
                        }
                        return;
                    }
                })
                    .addField("gcheck", {
                    name: "fuccupo_all",
                    label: "Zobrazit všechny",
                    model: "Global.Ddp.OblibeneKtgUpoSettings.fuccupo_all=value",
                    customClass: "userSettings-saveWithoutNotice",
                    change: (_ev, obj) => {
                        var fuccupo_all;
                        if (obj.value == true)
                            fuccupo_all = true; //zobrazit všechny
                        else
                            fuccupo_all = false; //nezobrazovat všechny
                        var form = $.content().findForms("OblibeneKtgUpoForm");
                        var ixp_den = form.findFields("ixp_den").gfield("getValue")?.ixp_den || null;
                        var typ_phl = form.findFields("typ_phl").gfield("getValue")?.typ_phl || null;
                        if (ixp_den == null || typ_phl == null)
                            return;
                        const filter = {
                            ixp_den: ixp_den,
                            typ_phl: typ_phl,
                            fuccupo_all: fuccupo_all
                        };
                        var content = $.content("main");
                        content.isl.DdpUserSettings.oblibeneKtgUpo(() => ({ filters: filter })).get()
                            .done((dto) => {
                            view = new Gordic.Data.View(dto.data);
                            var loadedValue = content.globalSettings.get("Global.Ddp.OblibeneKtgUpoSettings.UseUpo" + ixp_den + typ_phl);
                            if (loadedValue != null) {
                                var rows = view.getDataRows(true);
                                var splitValues = loadedValue.split(","); //rozdělení uložených hodnot v globalsettings
                                rows.forEach((row) => {
                                    if (splitValues.includes(row.data.ktg_upo?.toString())) {
                                        row.checked = true;
                                    }
                                });
                                view = new Gordic.Data.View(rows);
                            }
                            $('div[data-form="OblibeneKtgUpoForm"] .gform-field.ggrid').ggrid("setData", view);
                        });
                    }
                })
                    .addRow()
                    .addField("ggrid", {
                    rowHeight: 35,
                    columns: Gordic.Ddp.WebClient.Common.GridFormats.OblibeneKtgUpoSettings(),
                    customClass: "gform-ignorefield",
                    data: [],
                    multi: true,
                    showTopPanel: false,
                    showBottomPanel: false,
                    selection: () => {
                        removeNotifications();
                    }
                })
                    .addField("gstringbox", {
                    name: "ktg_upo",
                    disabled: true,
                    customClass: "userSettings-saveWithoutNotice hidden",
                    model: function (operation, dto) {
                        loadedValue = invisFieldActions("OblibeneKtgUpoForm", "OblibeneKtgUpoSettings.UseUpo", operation, dto, this, loadedValue);
                    }
                })
                    .addField("gbutton", {
                    params: {
                        action: new GAction({
                            name: "btnSave",
                            caption: "Uložit",
                            run: function () {
                                var selectedValues = "";
                                var grid_view = $('div[data-form="OblibeneKtgUpoForm"] .gform-field.ggrid').ggrid("getView");
                                var rows = grid_view.getDataRows(true);
                                // First, ensure ktg_upo == 100 is always checked
                                var has100 = false;
                                rows.forEach((row) => {
                                    if (row.data.ktg_upo == 100) {
                                        row.checked = true;
                                        has100 = true;
                                    }
                                });
                                // Collect all checked values
                                rows.forEach((row) => {
                                    if (row.checked) {
                                        selectedValues += row.data.ktg_upo + ",";
                                    }
                                });
                                // Remove trailing comma
                                if (selectedValues != "") {
                                    selectedValues = selectedValues.replace(/,$/, "");
                                }
                                // Update grid view once if we modified it
                                if (has100) {
                                    view = new Gordic.Data.View(rows);
                                    $('div[data-form="OblibeneKtgUpoForm"] .gform-field.ggrid').ggrid("setData", view);
                                }
                                $.content().findFields("ktg_upo").gfield("setValue", selectedValues);
                            }
                        })
                    }
                });
                //.addField("gbutton", {
                //    params: {
                //        action: new GAction({
                //            name: "btnSave",
                //            caption: "Uložit",
                //            run: function () {
                //                var selectedValues = "";
                //                var grid_view = $('div[data-form="OblibeneKtgUpoForm"] .gform-field.ggrid').ggrid<Gordic.Ddp.Interface.LK.Isl.GDdpUserSettingsDto>("getView");
                //                var rows = grid_view.getDataRows(true);
                //                rows.forEach((row) => {
                //                    if (row.checked) {
                //                        selectedValues += row.data.ktg_upo + ",";
                //                    }
                //                })
                //                if (selectedValues != "") {
                //                    rows.forEach((row) => {
                //                        debugger;
                //                        if (row.data.ktg_upo == 100 && row.checked != true) {
                //                            row.checked = true;
                //                            selectedValues += row.data.ktg_upo;
                //                            view = new Gordic.Data.View(rows);
                //                            $('div[data-form="OblibeneKtgUpoForm"] .gform-field.ggrid').ggrid("setData", view);
                //                        }
                //                    })
                //                    selectedValues = selectedValues.replace(/,$/, "");
                //                }
                //                $.content().findFields("ktg_upo").gfield("setValue", selectedValues);
                //            }
                //        })
                //    }
                //})
                return form;
            }
            AppSettings.OblibeneKtgUpoSettings = OblibeneKtgUpoSettings;
            /** Definice formuláře do uživatelského nastavení, kontrola na ROB
            *
            * @returns {Forms.Form}
            */
            function ROBSettings() {
                var form = new Gordic.Forms
                    .Form({ name: "ROBForm", tabOptions: { title: "Kontrola na ROB", opened: false } })
                    .addRow()
                    .addField("gcheck", "w-4", {
                    name: "rob_chk_ulice",
                    label: "Ulice",
                    model: "Global.Ddp.ROBSettings.rob_chk_ulice=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addField("gcheck", "w-4", {
                    name: "rob_chk_cpop",
                    label: "Číslo popisné",
                    model: "Global.Ddp.ROBSettings.rob_chk_cpop=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addField("gcheck", "w-4", {
                    name: "rob_chk_cor",
                    label: "Číslo orientační",
                    model: "Global.Ddp.ROBSettings.rob_chk_cor=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addField("gcheck", "w-4", {
                    name: "rob_chk_cobce",
                    label: "Část obce",
                    model: "Global.Ddp.ROBSettings.rob_chk_cobce=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addField("gcheck", "w-4", {
                    name: "rob_chk_mcast",
                    label: "Městská část",
                    model: "Global.Ddp.ROBSettings.rob_chk_mcast=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addField("gcheck", "w-4", {
                    name: "rob_chk_obec",
                    label: "Obec",
                    model: "Global.Ddp.ROBSettings.rob_chk_obec=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addField("gcheck", "w-4", {
                    name: "rob_chk_psc",
                    label: "PSČ",
                    model: "Global.Ddp.ROBSettings.rob_chk_psc=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addText("Vyberte pole, která jsou důležitá při kontrole externích subjektů proti ROB");
                return form;
            }
            AppSettings.ROBSettings = ROBSettings;
            /** Definice formuláře do uživatelského nastavení, zásilky
            *
            * @returns {Forms.Form}
            */
            function ZasilkySettings() {
                var form = new Gordic.Forms
                    .Form({ name: "ZasilkyForm", tabOptions: { title: "Parametry pro odesílání zásilek", opened: false } })
                    //.addSection("Parametry pro odesílání zásilek")
                    .addRow("Typ vyhodnocení")
                    .addField("gselectbox", Gordic.Prefabs.Select.wflctdo(), {
                    name: "wflctdo",
                    model: "Global.Ddp.ZasilkySettings.default_wflctdo=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addRow("Typ tisku")
                    .addField("gselectbox", Gordic.Prefabs.Select.wflctti(), {
                    name: "wflctti",
                    model: "Global.Ddp.ZasilkySettings.default_wflctti=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addRow("Typ archivace")
                    .addField("gselectbox", Gordic.Prefabs.Select.wflctar(), {
                    name: "wflctar",
                    model: "Global.Ddp.ZasilkySettings.default_wflctar=value",
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addRow("Typ konverze")
                    .addField("gselectbox", Gordic.Prefabs.Select.wflctko(), {
                    name: "wflctko",
                    model: "Global.Ddp.ZasilkySettings.default_wflctko=value",
                    customClass: "userSettings-saveWithoutNotice"
                });
                return form;
            }
            AppSettings.ZasilkySettings = ZasilkySettings;
            /** Definice formuláře do uživatelského nastavení, generace vymáhání
            *
            * @returns {Forms.Form}
            */
            function GeneraceVymahaniSettings() {
                var kniha = "";
                var typPhl = "";
                var skupina = "";
                var zmenaTypPhl = false;
                var zmenaSkupiny = false;
                var content = $.content("main");
                var form = new Gordic.Forms
                    .Form({ name: "GeneraceVymahaniForm", tabOptions: { title: "Generování vymáhání", opened: false } })
                    .addRow("Kniha")
                    .addField("gselectbox", Gordic.Prefabs.Select.ddpKniha(), {
                    name: "ixp_den",
                    itemTemplate: "{nazev}",
                    //customClass: "userSettings-saveWithoutNotice",
                    //model: "Global.Ddp.GeneraceVymahaniSettings.Kniha=value",
                    change: (ev, obj) => {
                        removeNotifications();
                    },
                    model: function (operation) {
                        var that = $(this);
                        switch (operation) {
                            case "collect":
                                // Změna knihy
                                var fieldValue = that.gfield("getValue");
                                kniha = fieldValue.ixp_den;
                                break;
                            case "apply":
                                content.isl.DdpUserSettings.getEkoParams()
                                    .get().done((result) => {
                                    kniha = result.ixp_den;
                                    typPhl = result.typ_phl;
                                    that.gfield("setValue", { ixp_den: result.ixp_den, nazev: result.nazev });
                                    var form = $.content().findForms("GeneraceVymahaniForm");
                                    form.findFields("typ_phl").gfield("setValue", { typ_phl: typPhl, nazev: result.nazev_typ_phl });
                                });
                                break;
                        }
                    }
                })
                    .addRow("Typ pohledávky")
                    .addField("gselectbox", Gordic.Prefabs.Select.typPohledavky(), {
                    name: "typ_phl",
                    itemTemplate: "{typ_phl} - {nazev}",
                    dropdown: true,
                    serverFilters: {
                        ixp_den: new Gordic.Forms.Dependency("ixp_den", "ixp_den", true),
                        phl_pro_roky: true,
                        aktivita: 100
                    },
                    change: (ev, obj) => {
                        removeNotifications();
                    },
                    model: function (operation) {
                        var form = $.content().findForms("GeneraceVymahaniForm");
                        var that = $(this);
                        switch (operation) {
                            case "collect": // Změna v poli
                                // Nastala změna v poli typ pohledávky, tedy musíme přečíst skupinu z userSettings a vložit do pole
                                if (that.gfield("getValue") == null)
                                    return;
                                if (that.gfield("getValue").typ_phl != typPhl) {
                                    zmenaTypPhl = true;
                                    typPhl = that.gfield("getValue").typ_phl;
                                }
                                var skupina = content.globalSettings.get(`Global.Ddp.GeneraceVymahaniSettings.Skupina${kniha}${typPhl}`);
                                if (skupina != null) {
                                    form.findFields("ixs_skv").gfield("setValue", skupina);
                                }
                                break;
                        }
                    }
                })
                    .addRow("Skupina")
                    .addField("gselectbox", Gordic.Prefabs.Select.skupinaVymahaniNoveVym(), {
                    name: "ixs_skv",
                    //model: `Global.Ddp.GeneraceVymahaniSettings.Skupina${kniha}${typPhl}=value`,
                    graphicInput: "hidden",
                    customClass: Gordic.Components.GFieldAssist.ignoreClass + " userSettings-saveWithoutNotice",
                    serverFilters: {
                        typ_phl: new Gordic.Forms.Dependency("typ_phl", "typ_phl", true),
                        aktivita: 100
                    },
                    itemTemplate: (data) => {
                        let bg = data?.barva != null ? `background-color: ${Gordic.Ddp.WebClient.Common.Base.GetHexColor(data?.barva)};` : "";
                        return `<div style="display: flex; align-items: center;"><div style="${bg} height: 18px; width: 18px; border: 1px solid gray; margin-right: 5px;"></div>${data?.nazev}</div>`;
                    },
                    model: function (operation) {
                        var form = $.content().findForms("GeneraceVymahaniForm");
                        var that = $(this);
                        switch (operation) {
                            case "collect": // Proběhla změna v poli
                                var typPhlFormValue = form.findFields("typ_phl").gfield("getValue");
                                if (typPhlFormValue == null)
                                    break;
                                // Pokud je uložený typ pohledávky stejný jako v poli, tak to znamená že se změnila pouze skupina, tedy měníme userSetting
                                var fieldValue = that.gfield("getValue");
                                if (!zmenaTypPhl) {
                                    content.globalSettings.set(`Global.Ddp.GeneraceVymahaniSettings.Skupina${kniha}${typPhl}`, fieldValue);
                                }
                                else
                                    zmenaTypPhl = false;
                                if (fieldValue != null) {
                                    if (fieldValue.ixs_skv != skupina) {
                                        if (skupina != "")
                                            zmenaSkupiny = true;
                                        skupina = that.gfield("getValue").ixs_skv;
                                    }
                                    var algoritmus = content.globalSettings.get(`Global.Ddp.GeneraceVymahaniSettings.Algoritmus${kniha}${typPhl}${fieldValue.ixs_skv}`);
                                    if (algoritmus != null) {
                                        form.findFields("algoritmus").gfield("setValue", algoritmus);
                                    }
                                }
                                break;
                        }
                        return;
                    }
                })
                    .addRow("Algoritmus")
                    .addField("gselectbox", Gordic.Prefabs.Select.ddpcagv(), {
                    name: "algoritmus",
                    customClass: "userSettings-saveWithoutNotice",
                    serverFilters: {
                        alg_vym: "!= 0",
                        ixs_skv: new Gordic.Forms.Dependency("ixs_skv", "ixs_skv", true)
                    },
                    change: (ev, obj) => {
                        if (zmenaSkupiny || obj.value == null) {
                            removeNotifications();
                            zmenaSkupiny = false;
                        }
                    },
                    model: function (operation) {
                        var form = $.content().findForms("GeneraceVymahaniForm");
                        var that = $(this);
                        switch (operation) {
                            case "collect": // Proběhla změna v poli
                                var skupinaFormValue = form.findFields("ixs_skv").gfield("getValue");
                                if (skupinaFormValue == null)
                                    break;
                                var skupina = skupinaFormValue.ixs_skv;
                                var fieldValue = that.gfield("getValue");
                                if (!zmenaSkupiny) {
                                    content.globalSettings.set(`Global.Ddp.GeneraceVymahaniSettings.Algoritmus${kniha}${typPhl}${skupina}`, fieldValue);
                                }
                                break;
                        }
                        return;
                    }
                });
                return form;
            }
            AppSettings.GeneraceVymahaniSettings = GeneraceVymahaniSettings;
            //#region pomocné funkce
            /**
             *  Nastavení všech políček co jsou propojené na null, jelikož se na poprví nenačítají skrz userSettings (hodí se tam první hodnota), což vypadá divně když se to otevře znovu a všechno je jinak
             */
            function setValueNull() {
                var content = $.content("main");
                content.globalSettings.set("Global.Ddp.ZpusobyUhradySettings.Kniha", null);
                content.globalSettings.set("Global.Ddp.RadOblSettings.Kniha", null);
                content.globalSettings.set("Global.Ddp.OblibeneCtvrtiSettings.Kniha", null);
                content.globalSettings.set("Global.Ddp.OblibeneKtgUpoSettings.Kniha", null);
            }
            /**
             * Funkce k mazání zbytečných toast notifikačích oznámení
             */
            function removeNotifications() {
                $(".gnotificationlist").gnotificationlist("clearToasts");
            }
            /**
             * Fukce k nastavení tabulky, když je prázdná
             * @param form_name
             * @param lastTypPhl
             */
            function emptyGridInit(form_name, lastTypPhl) {
                var form = $.content().findForms(form_name);
                var typ_phl = form.findFields("typ_phl").gfield("getValue")?.typ_phl || null;
                if (typ_phl == null && lastTypPhl != null) {
                    var view = [];
                    var grid = $('div[data-form="' + form_name + '"] .gform-field.ggrid');
                    grid.ggrid("setData", view);
                    grid.height("70px");
                    grid.ggrid("fitV");
                }
            }
            /**
             * Funkce k nastavení, tabulky když je plná
             * @param form_name
             * @param view
             */
            function fullGridInit(form_name, view) {
                var grid = $('div[data-form="' + form_name + '"] .gform-field.ggrid');
                grid.ggrid("setData", view);
                grid.height("200px");
                grid.ggrid("fitV");
            }
            /**
             * Funkce pro neviditelné políčko, přes které se ukládá do UserSettings
             * @param form_name
             * @param path
             * @param operation
             * @param dto
             * @param that
             * @param loadedValue
             * @returns
             */
            function invisFieldActions(form_name, path, operation, dto, that, loadedValue) {
                var form = $.content().findForms(form_name);
                var ixp_den = form.findFields("ixp_den").gfield("getValue")?.ixp_den || null;
                var typ_phl = form.findFields("typ_phl").gfield("getValue")?.typ_phl || null;
                switch (operation) {
                    case "apply":
                        $(that).gfield("setInitial", "initialValue");
                        return loadedValue;
                    case "collect":
                        var fieldValue = $(that).gfield("getValue");
                        if (loadedValue != fieldValue) {
                            Gordic.Utils.setValueByKeyPath("Global.Ddp." + path + ixp_den + typ_phl, dto, fieldValue);
                            loadedValue = fieldValue;
                        }
                        $(that).gfield("setInitial", "initialValue");
                        return loadedValue;
                }
                return loadedValue;
            }
            //#endregion
        })(AppSettings = Ddp.AppSettings || (Ddp.AppSettings = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlclNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVXNlclNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0FxekNmO0FBcnpDRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FxekNuQjtJQXJ6Q2dCLFdBQUEsR0FBRztRQUFDLElBQUEsV0FBVyxDQXF6Qy9CO1FBcnpDb0IsV0FBQSxXQUFXO1lBRTVCOzs7OztlQUtHO1lBRUg7Ozs7O2VBS0c7WUFDSCxTQUFnQixpQkFBaUIsQ0FBQyxJQUFTO2dCQUV2QyxNQUFNLEtBQUssR0FBaUI7b0JBQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixFQUFFO29CQUM5QyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQywwQkFBMEIsRUFBRTtvQkFDbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEVBQUU7b0JBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7b0JBQ3JELE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFO29CQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRTtvQkFFdEM7O3NCQUVFO29CQUVGLGNBQWMsRUFBRTtvQkFDaEIsMkJBQTJCLEVBQUU7b0JBQzdCLGNBQWMsRUFBRTtvQkFDaEIsa0JBQWtCLEVBQUU7b0JBQ3BCLHNFQUFzRTtvQkFDdEUsa0JBQWtCLEVBQUU7b0JBQ3BCLG9HQUFvRztvQkFDcEcscUJBQXFCLEVBQUU7b0JBQ3ZCLGNBQWMsRUFBRTtvQkFDaEIsc0JBQXNCLEVBQUU7b0JBQ3hCLHNCQUFzQixFQUFFO29CQUN4QixXQUFXLEVBQUU7b0JBQ2IsZUFBZSxFQUFFO2lCQUNwQixDQUFDO2dCQUVGLHlHQUF5RztnQkFDekcsSUFBSSxJ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QUFHLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7NEJBQ25GLFdBQVcsR0FBRyxVQUFVLENBQUM7d0JBQzdCLENBQUM7d0JBQ0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7d0JBQzdDLE9BQU8sV0FBVyxDQUFDO2dCQUMzQixDQUFDO2dCQUVELE9BQU8sV0FBVyxDQUFDO1lBQ3ZCLENBQUM7WUFDRCxZQUFZO1FBQ2hCLENBQUMsRUFyekNvQixXQUFXLEdBQVgsZUFBVyxLQUFYLGVBQVcsUUFxekMvQjtJQUFELENBQUMsRUFyekNnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFxekNuQjtBQUFELENBQUMsRUFyekNTLE1BQU0sS0FBTixNQUFNLFFBcXpDZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuRGRwLkFwcFNldHRpbmdzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFXFvml2YXRlbHNrw6kgbmFzdGF2ZW7DrVxyXG4gICAgICpcclxuICAgICAqIEBhdXRob3IgTWFydGluIEhhbnXFoVxyXG4gICAgICogQHNpbmNlIDQ4OS4xLjAuMFxyXG4gICAgICovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmljZSBmb3JtdWzDocWZxa8gcHJvIHXFvml2YXRlbHNrw6kgbmFzdGF2ZW7DrVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBcclxuICAgICAqIEByZXR1cm5zIHtGb3Jtcy5Gb3JtW119IGZvcm11bMOhxZllXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBMaXN0c1NldHRpbmdzRm9ybShkYXRhOiBhbnkpOiBGb3Jtcy5Gb3JtW10gIHtcclxuXHJcbiAgICAgICAgY29uc3QgZm9ybXM6IEZvcm1zLkZvcm1bXSA9IFtcclxuICAgICAgICAgICAgR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydHNVc2VyU2V0dGluZ3MoKSwgICAgICAgICAgXHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuQXBwU2V0dGluZ3MuQXR0YWNobWVudE9wZW5TZXR0aW5nc0Zvcm0oKSxcclxuICAgICAgICAgICAgR29yZGljLldmbC5BcHBTZXR0aW5ncy5Db2xvclBpY2tlclNldHRpbmdzRm9ybSgpLFxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLlV0aWxzLkVrb1VzZXJTZXR0aW5nc1BpZChkYXRhLmdpbl9nZW5faXhwKSxcclxuICAgICAgICAgICAgR29yZGljLkVrby5VdGlscy5Fa29Vc2VyU2V0dGluZ3NFa29Cb29rKCksXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uVXRpbHMuRWtvVXNlclNldHRpbmdzTGlzdCgpLCBcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIOKGkyBAYXV0aG9yIHZjZWNoXHJcbiAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgICAgICBQb2RhbmlTZXR0aW5ncygpLFxyXG4gICAgICAgICAgICBPZGVzbGFuaURva0VsUG9zdG91U2V0dGluZ3MoKSxcclxuICAgICAgICAgICAgRGF0dW15U2V0dGluZ3MoKSxcclxuICAgICAgICAgICAgVXBvem9ybmVuaVNldHRpbmdzKCksXHJcbiAgICAgICAgICAgIC8vVHlwUGhsU2V0dGluZ3MoKSwgLy9uZXphcG9qZW5vLCB2w71ixJtyIHR5cHUgcG9obGVkw6F2a3kgamUgZMSbbMOhbiBqaW5ha1xyXG4gICAgICAgICAgICBQb3Bpc3lQb2xpU2V0dGluZ3MoKSxcclxuICAgICAgICAgICAgLy9TZXpuYW1QcmlwYWR1U2V0dGluZ3MoKSwgLy8gbmVuw60gcG90xZllYmEsIGx6ZSBzaSB2IHRhYnVsY2UgcHJvc3TEmyB1bG/Fvml0IHZsYXN0bsOtIG5hc3RhdmVuw60gc2xvdXBjxa9cclxuICAgICAgICAgICAgWnB1c29ieVVocmFkeVNldHRpbmdzKCksXHJcbiAgICAgICAgICAgIFJhZE9ibFNldHRpbmdzKCksXHJcbiAgICAgICAgICAgIE9ibGliZW5lQ3R2cnRpU2V0dGluZ3MoKSxcclxuICAgICAgICAgICAgT2JsaWJlbmVLdGdVcG9TZXR0aW5ncygpLFxyXG4gICAgICAgICAgICBST0JTZXR0aW5ncygpLFxyXG4gICAgICAgICAgICBaYXNpbGt5U2V0dGluZ3MoKVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIC8vIFBva3VkIHNlIGplZG7DoSBvIHN0cmlrdG7DrSByZcW+aW0gKGFybcOhZGEpLCB0YWsgc2UgxI10ZSBza3VwaW5hIGppbmFrLCB0YWsgbmVidWRlIG5pYyBkZWZhdWx0bsSbIG5hc3RhdmVub1xyXG4gICAgICAgIGlmIChkYXRhLnN0cmlrdG5pUmV6aW0gPT0gXCJGYWxzZVwiKSBmb3Jtcy5wdXNoKEdlbmVyYWNlVnltYWhhbmlTZXR0aW5ncygpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1zO1xyXG5cclxuICAgICAgICAvL05hIFRTIHphdm9sYXQgbsOhc2xlZG92bsSbOlxyXG4gICAgICAgIC8vdGhhdC5nbG9iYWxTZXR0aW5ncyEuZ2V0KFwiR2xvYmFsLkRkcC5Ow6F6ZXZTZWtjZS5Ow6F6ZXZIb2Rub3R5Vk1vZGVsdVwiKTtcclxuXHJcbiAgICAgICAgLy9OYSBDUyBsemUgcG91emUgcMWZZcSNw61zdCBuw6FzbGVkb3ZuxJs6XHJcbiAgICAgICAgLy9HbG9iYWxTZXR0aW5ncy5HZXQoXCJHbG9iYWwuRGRwLk7DoXpldlNla2NlLk7DoXpldkhvZG5vdHlWTW9kZWx1XCIsIFwiSG9kbm90YSBjbyBzZSBuYcSNdGUgcG9rdWQgdmUgc3RvcmFnZSBuZW7DrSBob2Rub3RhXCIpO1xyXG4gICAgfVxyXG4gICBcclxuICAgIC8qKiBEZWZpbmljZSBmb3JtdWzDocWZZSBkbyB1xb5pdmF0ZWxza8OpaG8gbmFzdGF2ZW7DrSwgcG9kw6Fuw61cclxuICAgICogXHJcbiAgICAqIEByZXR1cm5zIHtGb3Jtcy5Gb3JtfVxyXG4gICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBQb2RhbmlTZXR0aW5ncygpOiBGb3Jtcy5Gb3JtIHtcclxuICAgICAgICAvL2l4eGluaXQsIG5henZ5LCBcclxuICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXNcclxuICAgICAgICAgICAgLkZvcm0oeyBuYW1lOiBcIlBvZGFuaUZvcm1cIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJQb2TDoW7DrVwiLCBvcGVuZWQ6IGZhbHNlIH0gfSBhcyBhbnkpXHJcbiAgICAgICAgICAgIC8vLmFkZFJvdyhcIlDFmWVkcGxuxJtuw60gaWRlbnRpZmlrw6F0b3J1IGRva2xhZHVcIikgLy8gamnFviBzcG9sZcSNbsOhIGtvbXBvbmVudGFcclxuICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgXHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiaXh4X2luaXRcIixcclxuICAgICAgICAgICAgLy8gICAgbW9kZWw6IFwiR2xvYmFsLkRkcC5PYmVjbmVTZXR0aW5ncy5QcmVkcGxuZW5pUElEPXZhbHVlXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZVwiXHJcbiAgICAgICAgICAgIC8vfSkgLy9cclxuICAgICAgICAgICAgLmFkZFJvdyhcIlDFmWVkcGxuxJtuw60genDFr3NvYnUgw7pocmFkeVwiKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jaXpwKCksIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicHJlZF96cF91aHJcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5EZHAuT2JlY25lU2V0dGluZ3MuUHJlZHBsbmVuaVpwVWhyPXZhbHVlLnpwXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2VcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERlZmluaWNlIGZvcm11bMOhxZllIGRvIHXFvml2YXRlbHNrw6lobyBuYXN0YXZlbsOtLCBlbWFpbCBwcm8gb2Rlc2zDoW7DrSBkb2t1bWVudHUgZWwuIHBvxaF0b3VcclxuICAgICogXHJcbiAgICAqIEByZXR1cm5zIHtGb3Jtcy5Gb3JtfVxyXG4gICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBPZGVzbGFuaURva0VsUG9zdG91U2V0dGluZ3MoKTogRm9ybXMuRm9ybSB7XHJcblxyXG4gICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtc1xyXG4gICAgICAgICAgICAuRm9ybSh7IG5hbWU6IFwiT2Rlc2xhbmlEb2tGb3JtXCIsIHRhYk9wdGlvbnM6IHsgdGl0bGU6IFwiT2Rlc2zDoW7DrSBkb2t1bWVudHUgZWwuIHBvxaF0b3VcIiwgb3BlbmVkOiBmYWxzZSB9IH0gYXMgYW55KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiRS1tYWlsb3bDoSBhZHJlc2Egb2Rlc8OtbGF0ZWxlICh1xb5pdmF0ZWxlKVwiKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZW1haWxcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5EZHAuT2JlY25lU2V0dGluZ3MuRW1haWxPZGVzaWxhdGVsZT12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCIsXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IChfZXY6IGFueSwgb2JqOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9ICQuY29udGVudChcIm1haW5cIikgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuaXNsLkRkcFVzZXJTZXR0aW5ncy51bG96RW1haWwoeyBlbWFpbDogb2JqLnZhbHVlIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSBcclxuICAgICAgICAgICBcclxuICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogRGVmaW5pY2UgZm9ybXVsw6HFmWUgZG8gdcW+aXZhdGVsc2vDqWhvIG5hc3RhdmVuw60sIGVtYWlsIHBybyBvZGVzbMOhbsOtIGRva3VtZW50dSBlbC4gcG/FoXRvdVxyXG4gICAgKiBcclxuICAgICogQHJldHVybnMge0Zvcm1zLkZvcm19XHJcbiAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIERhdHVteVNldHRpbmdzKCk6IEZvcm1zLkZvcm0ge1xyXG5cclxuICAgICAgICAvLyEhIVVrw6F6a2EgamFrIHrDrXNrYXQgaG9kbm90dSBkYXR1bXUgbmFwb2plbsOtIGEgc2FsZGEhISFcclxuICAgICAgICAvL0plIG51dG5vIHZvbGF0IHRha3RvLCBqZWxpa2/FviBjaGNlbWUgYWJ5IGJ5bHkgdHl0byBkYXR1bXkgbmFzdGF2ZW55IGplbiBwcm8gdHV0byBzZXNzaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiB1a8OhemthIHrDrXNrw6Fuw60gaG9kbm90eSBkYXR1bcWvXHJcbiAgICAgICAgLy92YXIgZGF0dW1OYXBvamVuaTtcclxuICAgICAgICAvL3ZhciBkYXR1bVNhbGRhO1xyXG4gICAgICAgIC8vdGhhdC5pc2wuRGRwVXNlclNldHRpbmdzLnByaXpuYWt5RGF0dW11KHsgc2F2ZTogZmFsc2UgfSkuZ2V0KCkuZG9uZShmdW5jdGlvbiAocHJpem5ha05hY3RlbmlEYXR1bXUpIHtcclxuICAgICAgICAvLyAgICBpZiAocHJpem5ha05hY3RlbmlEYXR1bXUpIHsgLy9wb2t1ZCBqZSBwxZnDrXpuYWsgdHJ1ZSwgdGFrIG3Fr8W+ZW1lIG5hxI3DrXN0IGRhdGEgeiB1c2Vyc2V0dGluZ3NcclxuICAgICAgICAvLyAgICAgICAgZGF0dW1OYXBvamVuaSA9IHRoYXQuZ2xvYmFsU2V0dGluZ3MhLmdldChcIkdsb2JhbC5EZHAuT2JlY25lU2V0dGluZ3MuRGF0dW1OYXBvamVuaVwiKTtcclxuICAgICAgICAvLyAgICAgICAgZGF0dW1TYWxkYSA9IHRoYXQuZ2xvYmFsU2V0dGluZ3MhLmdldChcIkdsb2JhbC5EZHAuT2JlY25lU2V0dGluZ3MuRGF0dW1TYWxkYVwiKTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgIGRhdHVtTmFwb2plbmkgPSBudWxsO1xyXG4gICAgICAgIC8vICAgICAgICBkYXR1bVNhbGRhID0gbnVsbDtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy99KTtcclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zXHJcbiAgICAgICAgICAgIC5Gb3JtKHsgbmFtZTogXCJEYXR1bXlGb3JtXCIsIHRhYk9wdGlvbnM6IHsgdGl0bGU6IFwiRGF0dW15XCIsIG9wZW5lZDogZmFsc2UgfSB9IGFzIGFueSlcclxuICAgICAgICAgICAgLmFkZFRleHQoXCJQbGF0w60gcG91emUgcHJvIGRvYnUgcMWZaWhsw6HFoWVuw61cIilcclxuICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIG5hcG9qZW7DrSBwb3BsYXRuw61rxa9cIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfbmFwXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2VcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSAkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6IC8vb25sb2FkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmlzbC5EZHBVc2VyU2V0dGluZ3MucHJpem5ha3lEYXR1bXUoeyBzYXZlOiBmYWxzZSB9KS5nZXQoKS5kb25lKGZ1bmN0aW9uIChwcml6bmFrTmFjdGVuaURhdHVtdTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcHJpem5ha05hY3RlbmlEYXR1bXUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nZmllbGQoXCJzZXRWYWx1ZVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5nbG9iYWxTZXR0aW5ncyEuc2V0KFwiR2xvYmFsLkRkcC5PYmVjbmVTZXR0aW5ncy5EYXR1bU5hcG9qZW5pXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXR1bU5hcG9qZW5pID0gY29udGVudC5nbG9iYWxTZXR0aW5ncyEuZ2V0KFwiR2xvYmFsLkRkcC5PYmVjbmVTZXR0aW5ncy5EYXR1bU5hcG9qZW5pXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdmaWVsZChcInNldEluaXRpYWxcIiwgZGF0dW1OYXBvamVuaSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOiAvL29uY2hhbmdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0dW1OYXBvamVuaSA9ICQodGhpcykuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9ICQuY29udGVudChcIm1haW5cIikgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5pc2wuRGRwVXNlclNldHRpbmdzLnByaXpuYWt5RGF0dW11KHsgc2F2ZTogdHJ1ZSB9KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZ2xvYmFsU2V0dGluZ3MhLnNldChcIkdsb2JhbC5EZHAuT2JlY25lU2V0dGluZ3MuRGF0dW1OYXBvamVuaVwiLCBkYXR1bU5hcG9qZW5pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBzYWxkYVwiKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfc2FsZG9cIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZVwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9ICQuY29udGVudChcIm1haW5cIikgYXMgYW55O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjogLy9vbmxvYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuaXNsLkRkcFVzZXJTZXR0aW5ncy5wcml6bmFreURhdHVtdSh7IHNhdmU6IGZhbHNlIH0pLmdldCgpLmRvbmUoZnVuY3Rpb24gKHByaXpuYWtOYWN0ZW5pRGF0dW11OiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwcml6bmFrTmFjdGVuaURhdHVtdSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdmaWVsZChcInNldFZhbHVlXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50Lmdsb2JhbFNldHRpbmdzIS5zZXQoXCJHbG9iYWwuRGRwLk9iZWNuZVNldHRpbmdzLkRhdHVtU2FsZGFcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdHVtU2FsZGEgPSBjb250ZW50Lmdsb2JhbFNldHRpbmdzIS5nZXQoXCJHbG9iYWwuRGRwLk9iZWNuZVNldHRpbmdzLkRhdHVtU2FsZGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCBkYXR1bVNhbGRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IC8vb25jaGFuZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXR1bVNhbGRhID0gJCh0aGlzKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmlzbC5EZHBVc2VyU2V0dGluZ3MucHJpem5ha3lEYXR1bXUoeyBzYXZlOiB0cnVlIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5nbG9iYWxTZXR0aW5ncyEuc2V0KFwiR2xvYmFsLkRkcC5PYmVjbmVTZXR0aW5ncy5EYXR1bVNhbGRhXCIsIGRhdHVtU2FsZGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZWZpbmljZSBmb3JtdWzDocWZZSBkbyB1xb5pdmF0ZWxza8OpaG8gbmFzdGF2ZW7DrSwgdXBvem9ybsSbbsOtXHJcbiAgICAqIFxyXG4gICAgKiBAcmV0dXJucyB7Rm9ybXMuRm9ybX1cclxuICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gVXBvem9ybmVuaVNldHRpbmdzKCk6IEZvcm1zLkZvcm0ge1xyXG5cclxuICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXNcclxuICAgICAgICAgICAgLkZvcm0oeyBuYW1lOiBcIlVwb3pvcm5lbmlGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTItOC0yLCBNLTAtMTItMCwgUy0wLTEyLTBcIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJVcG96b3JuxJtuw61cIiwgb3BlbmVkOiBmYWxzZSB9IH0gYXMgYW55KVxyXG4gICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIsIHsgXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm90aGVyX3VzZXJcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIlVwb3pvcm5pdCBuYSBwcm9obMOtxb5lbsOtIGNpesOtY2ggcMWZw61wYWTFr1wiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLkRkcC5PYmVjbmVTZXR0aW5ncy5PdGhlclVzZXI9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNlwiLCB7IFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJvdGhlcl9waGxcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIlVwb3pvcm5pdCBuYSBwcm9obMOtxb5lbsOtIHDFmcOtcGFkxa8geiBqaW7DvWNoIHR5cMWvIHBvaGxlZMOhdmVrXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuRGRwLk9iZWNuZVNldHRpbmdzLk90aGVyUGhsPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2VcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTZcIix7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm90aGVyX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiVXBvem9ybml0IG5hIHByb2hsw63FvmVuw60gcMWZw61wYWTFryB6IGppbsO9Y2gga25paFwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLkRkcC5PYmVjbmVTZXR0aW5ncy5PdGhlckRlbj12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIse1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzaG93X2RhdF9wb2Nfd2FyblwiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiVXBvem9ybml0IG5hIGNoeWJuw6kgZGF0dW0gcG/EjcOhdGt1XCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuRGRwLk9iZWNuZVNldHRpbmdzLlNob3dEYXRQb2NXYXJuPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2VcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIse1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJyb3pkaWxcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIlVwb3pvcm5pdCBuYSBuZXNvdWhsYXMgxI3DoXN0ZWsgcMWZZWRwaXPFryBhIGNlbGtvdsOpIMSNw6FzdGt5XCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuRGRwLk9iZWNuZVNldHRpbmdzLlJvemRpbD12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIse1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJrb250X3Nhel9wb2NcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIlVwb3pvcm5pdCBuYSBuZXNvdWhsYXMgxI3DoXN0a3kgcMWZw61wYWR1IGEgc2F6YmEqcG/EjWV0XCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuRGRwLk9iZWNuZVNldHRpbmdzLktvbnRTYXpQb2M9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNlwiLHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidGlza192eW1fZG90YXpcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRvdGF6IG5hIHNwcsOhdm5vc3QgdGlza3Ugdnltw6Fow6Fuw61cIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5EZHAuT2JlY25lU2V0dGluZ3MuVGlza1Z5bURvdGF6PXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2VcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTZcIix7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImtvbnRfc3BsdnpuXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJLb250cm9sYSBkYXRhIHNwbGF0bm9zdGkgbWVuxaHDrWhvIG5lxb4gZGF0dW0gdnpuaWt1XCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuRGRwLk9iZWNuZVNldHRpbmdzLktvbnRTcGx2em49dmFsdWVcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNlwiLHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwia29udF9kYXRcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIktvbnRyb2xhIHphZGFuw71jaCBkYXR1bcWvIG1pbW8gaW50ZXJ2YWwgMTk4MCAtIDIwNTBcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5EZHAuT2JlY25lU2V0dGluZ3MuS29udERhdD12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIse1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJrb250X2RlbF92c1wiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiS29udHJvbGEgZMOpbGt5IHphZMOhdmFuw6lobyBWU1wiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLkRkcC5PYmVjbmVTZXR0aW5ncy5Lb250RGVsVlM9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZVwiXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZWZpbmljZSBmb3JtdWzDocWZZSBkbyB1xb5pdmF0ZWxza8OpaG8gbmFzdGF2ZW7DrSwgdsO9YsSbciB0eXB1IHBvaGxlZMOhdmt5XHJcbiAgICAqIFxyXG4gICAgKiBAcmV0dXJucyB7Rm9ybXMuRm9ybX1cclxuICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gVHlwUGhsU2V0dGluZ3MoKTogRm9ybXMuRm9ybSB7XHJcblxyXG4gICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtc1xyXG4gICAgICAgICAgICAuRm9ybSh7IG5hbWU6IFwiVHlwUGhsRm9ybVwiLCB0YWJPcHRpb25zOiB7IHRpdGxlOiBcIlbDvWLEm3IgdHlwdSBwb2hsZWTDoXZreVwiLCBvcGVuZWQ6IGZhbHNlIH0gfSBhcyBhbnkpXHJcbiAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsX3Z5YmVyX2F1dG9cIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIlDFmWkgc3RhcnR1IHZ5YsOtcmF0IHBvc2xlZG7DrSBwb3XFvml0w71cIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5EZHAuT2JlY25lU2V0dGluZ3MuVHlwUGhsVnliZXJBdXRvPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2VcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobF92eWJlcl9tYXNrYVwiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiUGFtYXRvdmF0IHNpIG1hc2t1XCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuRGRwLk9iZWNuZVNldHRpbmdzLlR5cFBobFZ5YmVyTWFza2E9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZVwiXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZWZpbmljZSBmb3JtdWzDocWZZSBkbyB1xb5pdmF0ZWxza8OpaG8gbmFzdGF2ZW7DrSwgcG9waXN5IHBvbMOtXHJcbiAgICAqIFxyXG4gICAgKiBAcmV0dXJucyB7Rm9ybXMuRm9ybX1cclxuICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUG9waXN5UG9saVNldHRpbmdzKCk6IEZvcm1zLkZvcm0ge1xyXG5cclxuICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXNcclxuICAgICAgICAgICAgLkZvcm0oeyBuYW1lOiBcIlBvcGlzeVBvbGlGb3JtXCIsIHRhYk9wdGlvbnM6IHsgdGl0bGU6IFwiUG9waXN5IHBvbMOtXCIsIG9wZW5lZDogZmFsc2UgfSB9IGFzIGFueSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIlBvcGlzIHBvbGUgJ8SMw6FzdGthIHYgQ1pLJ1wiKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNfY2FzdGthXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuRGRwLk9iZWNuZVNldHRpbmdzLlBvcGlzQ2FzdGthPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2VcIlxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogRGVmaW5pY2UgZm9ybXVsw6HFmWUgZG8gdcW+aXZhdGVsc2vDqWhvIG5hc3RhdmVuw60sIHNlem5hbSBwxZnDrXBhZMWvXHJcbiAgICAqIFxyXG4gICAgKiBAcmV0dXJucyB7Rm9ybXMuRm9ybX1cclxuICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gU2V6bmFtUHJpcGFkdVNldHRpbmdzKCk6IEZvcm1zLkZvcm0ge1xyXG5cclxuICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXNcclxuICAgICAgICAgICAgLkZvcm0oeyBuYW1lOiBcIlNlem5hbVByaXBhZHVGb3JtXCIsIHRhYk9wdGlvbnM6IHsgdGl0bGU6IFwiU2V6bmFtIHDFmcOtcGFkxa9cIiwgb3BlbmVkOiBmYWxzZSB9IH0gYXMgYW55KVxyXG4gICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2V6bmFtX3ByaXBhZHVfenZsYXN0XCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJQYW1hdG92YXQgc2kgbmFzdGF2ZW7DrSBzbG91cGPFryBwcm8ga2HFvmTDvSB0eXAgcG9obGVkw6F2a3kgc2Ftb3N0YXRuxJtcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5EZHAuT2JlY25lU2V0dGluZ3MuU2V6bmFtUHJpcGFkdVp2bGFzdD12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCJcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERlZmluaWNlIGZvcm11bMOhxZllIGRvIHXFvml2YXRlbHNrw6lobyBuYXN0YXZlbsOtLCB6cMWvc29ieSDDumhyYWR5XHJcbiAgICAqIFxyXG4gICAgKiBAcmV0dXJucyB7Rm9ybXMuRm9ybX1cclxuICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gWnB1c29ieVVocmFkeVNldHRpbmdzKCk6IEZvcm1zLkZvcm0geyAvL3DFmWlkYXQgbmEga29uZWMgMFxyXG4gICAgICAgIHZhciBsb2FkZWRWYWx1ZTogc3RyaW5nO1xyXG4gICAgICAgIHZhciBsYXN0VHlwUGhsOiBhbnk7XHJcbiAgICAgICAgdmFyIHZpZXc6IGFueVtdIHwgR29yZGljLkRhdGEuVmlldzxhbnk+O1xyXG4gICAgICAgIHZhciBmb3JtTmFtZSA9IFwiWnB1c29ieVVocmFkeUZvcm1cIjtcclxuICAgICAgICB2YXIgY29udGVudCA9ICQuY29udGVudChcIm1haW5cIikgYXMgYW55O1xyXG5cclxuICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXNcclxuICAgICAgICAgICAgLkZvcm0oeyBuYW1lOiBmb3JtTmFtZSwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJacMWvc29iIMO6aHJhZHlcIiwgb3BlbmVkOiBmYWxzZSB9IH0gYXMgYW55KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiS25paGFcIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZGRwS25paGEoKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie25hemV2fVwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCIsXHJcbiAgICAgICAgICAgICAgICAvL21vZGVsOiBcIkdsb2JhbC5EZHAuWnB1c29ieVVocmFkeVNldHRpbmdzLktuaWhhPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBLZHnFviBzZSB6bcSbbsOtIGhvZG5vdGEgcG9sZSB0YWsgdG8gdnlob2TDrSB0b2FzdCBub2Zpa2FjaSwgYSBvbm8gdG9obyBqZSBzdHJhxaFuxJsgbW9jIHRhayBqZSBtYcW+dVxyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vdGlmaWNhdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3NldFZhbHVlTnVsbCgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5pc2wuRGRwVXNlclNldHRpbmdzLmdldEVrb1BhcmFtcygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpLmRvbmUoKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBpeHBfZGVuOiByZXN1bHQuaXhwX2RlbiwgbmF6ZXY6IHJlc3VsdC5uYXpldiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkLmNvbnRlbnQoKS5maW5kRm9ybXMoZm9ybU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgdHlwX3BobDogcmVzdWx0LnR5cF9waGwsIG5hemV2OiByZXN1bHQubmF6ZXZfdHlwX3BobCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgcG9obGVkw6F2a3lcIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QudHlwUG9obGVkYXZreSgpLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7dHlwX3BobH0gLSB7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJpeHBfZGVuXCIsIFwiaXhwX2RlblwiLCB0cnVlKSxcclxuICAgICAgICAgICAgICAgICAgICBwaGxfcHJvX3Jva3k6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vdGlmaWNhdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eUdyaWRJbml0KGZvcm1OYW1lLCBsYXN0VHlwUGhsIClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJC5jb250ZW50KCkuZmluZEZvcm1zKGZvcm1OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXhwX2RlbiA9IGZvcm0uZmluZEZpZWxkcyhcIml4cF9kZW5cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik/Lml4cF9kZW4gfHwgbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwX3BobCA9IGZvcm0uZmluZEZpZWxkcyhcInR5cF9waGxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik/LnR5cF9waGwgfHwgbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cF9waGwgIT0gbnVsbCkgbGFzdFR5cFBobCA9IHR5cF9waGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9ICQuY29udGVudChcIm1haW5cIikgYXMgYW55O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpeHBfZGVuICE9IG51bGwgJiYgdHlwX3BobCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5pc2wuRGRwVXNlclNldHRpbmdzLnpwdXNvYnlVaHJhZHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKS5kb25lKChkdG86IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkZWRWYWx1ZSA9IGNvbnRlbnQuZ2xvYmFsU2V0dGluZ3MhLmdldChcIkdsb2JhbC5EZHAuWnB1c29ieVVocmFkeVNldHRpbmdzLlVzZVpwXCIgKyBpeHBfZGVuICsgdHlwX3BobCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9hZGVkVmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvd3MgPSB2aWV3LmdldERhdGFSb3dzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNwbGl0VmFsdWVzID0gbG9hZGVkVmFsdWUuc3BsaXQoXCIsXCIpOyAvLyBzcGxpdCBzYXZlZCBnbG9iYWwgc2V0dGluZ3MgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzLmZvckVhY2goKHJvdykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGxpdFZhbHVlcy5pbmNsdWRlcyhyb3cuZGF0YS56cD8udG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJvd3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxsR3JpZEluaXQoZm9ybU5hbWUsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnZ3JpZFwiLCB7XHJcbiAgICAgICAgICAgICAgICByb3dIZWlnaHQ6IDM1LFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogR29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLlpwdXNvYnlVaHJhZHlTZXR0aW5ncygpLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZ2Zvcm0taWdub3JlZmllbGRcIiwgLy9nZm9ybS1pZ25vcmVmaWVsZFxyXG4gICAgICAgICAgICAgICAgZGF0YTogW10sXHJcbiAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNob3dUb3BQYW5lbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaG93Qm90dG9tUGFuZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9rZHnFviBzZSBtxJtuw60gemHFoWtydG51dMOtIHRhayB0byB2eWhvZMOtIHRvYXN0IG5vZmlrYWNpLCBhIG9ubyB0b2hvIGplIHN0cmHFoW7EmyBtb2MgdGFrIG1hxb51XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm90aWZpY2F0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidXNlX3pwXCIsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZSBoaWRkZW5cIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uLCBkdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkZWRWYWx1ZSA9IGludmlzRmllbGRBY3Rpb25zKGZvcm1OYW1lLCBcIlpwdXNvYnlVaHJhZHlTZXR0aW5ncy5Vc2VacFwiLCBvcGVyYXRpb24sIGR0bywgdGhpcywgbG9hZGVkVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnYnV0dG9uXCIsIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJ0blNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVbG/Fvml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkVmFsdWVzID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JpZCA9ICQoJ2RpdltkYXRhLWZvcm09XCJacHVzb2J5VWhyYWR5Rm9ybVwiXSAuZ2Zvcm0tZmllbGQuZ2dyaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncmlkX3ZpZXcgPSBncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HRGRwVXNlclNldHRpbmdzRHRvPihcImdldFZpZXdcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvd3MgPSBncmlkX3ZpZXcuZ2V0RGF0YVJvd3ModHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzLmZvckVhY2goKHJvdykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFZhbHVlcyArPSByb3cuZGF0YS56cCArIFwiLFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVmFsdWVzICs9IFwiMFwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudCgpLmZpbmRGaWVsZHMoXCJ1c2VfenBcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgc2VsZWN0ZWRWYWx1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICB9XHJcblxyXG4gICAgLy9vYmzDrWJlbsOpIMWZw6Fka3kgc2UgdWtsw6Fkw6Fqw60gdmUgZm9ybcOhdHU6IHJhZF9vYmxfbCArIElkZW50aWZpa8OhdG9yIGtuaWh5ICsgVHlwIHBvaGxlZMOhdmt5XHJcbiAgICAvL3ZhciBvYmxpYmVuZV9yYWRreSA9IHRoYXQuZ2xvYmFsU2V0dGluZ3MhLmdldChcIkdsb2JhbC5EZHAuUmFkT2JsU2V0dGluZ3MucmFkX29ibF9sXCIgKyB0aGF0Lkl4cERlbiArIHRoYXQudHlwX3BobCk7IC8vb2Jsw61iZW7DqSDFmcOhZGt5XHJcbiAgICAvL2RvIHTDqXRvIGNlc3R5IHNlIHRvIGhvZMOtIGpha28gc3RyaW5nOiBcIjAsMTAsMjAsLi4uXCJcclxuICAgIC8qKiBEZWZpbmljZSBmb3JtdWzDocWZZSBkbyB1xb5pdmF0ZWxza8OpaG8gbmFzdGF2ZW7DrSwgb2Jsw61iZW7DqSDFmcOhZGt5IG5hIGtuaXplL3R5cHUgcG9obGVkw6F2a3lcclxuICAgICpcclxuICAgICogQHJldHVybnMge0Zvcm1zLkZvcm19XHJcbiAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFJhZE9ibFNldHRpbmdzKCk6IEZvcm1zLkZvcm0ge1xyXG4gICAgICAgIHZhciB2aWV3OiBhbnlbXSB8IERhdGEuVmlldzxhbnk+O1xyXG4gICAgICAgIHZhciBsYXN0VHlwUGhsOiBzdHJpbmc7XHJcbiAgICAgICAgdmFyIGxvYWRlZFZhbHVlOiBzdHJpbmc7XHJcbiAgICAgICAgdmFyIGZvcm1OYW1lID0gXCJSYWRPYmxGb3JtXCI7XHJcbiAgICAgICAgdmFyIGNvbnRlbnQgPSAkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueTtcclxuXHJcbiAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zXHJcbiAgICAgICAgICAgIC5Gb3JtKHsgbmFtZTogZm9ybU5hbWUsIHRhYk9wdGlvbnM6IHsgdGl0bGU6IFwiT2Jsw61iZW7DqSDFmcOhZGt5XCIsIG9wZW5lZDogZmFsc2UgfSB9IGFzIGFueSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIktuaWhhXCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmRkcEtuaWhhKCksIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntuYXpldn1cIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZVwiLFxyXG4gICAgICAgICAgICAgICAgLy9tb2RlbDogXCJHbG9iYWwuRGRwLlJhZE9ibFNldHRpbmdzLktuaWhhPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVOb3RpZmljYXRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZXRWYWx1ZU51bGwoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuaXNsLkRkcFVzZXJTZXR0aW5ncy5nZXRFa29QYXJhbXMoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKS5kb25lKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdmaWVsZChcInNldFZhbHVlXCIsIHsgaXhwX2RlbjogcmVzdWx0Lml4cF9kZW4sIG5hemV2OiByZXN1bHQubmF6ZXYgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJC5jb250ZW50KCkuZmluZEZvcm1zKGZvcm1OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwidHlwX3BobFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IHR5cF9waGw6IHJlc3VsdC50eXBfcGhsLCBuYXpldjogcmVzdWx0Lm5hemV2X3R5cF9waGwgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiVHlwIHBvaGxlZMOhdmt5XCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnR5cFBvaGxlZGF2a3koKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3R5cF9waGx9IC0ge25hemV2fVwiLFxyXG4gICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwiaXhwX2RlblwiLCBcIml4cF9kZW5cIiwgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgcGhsX3Byb19yb2t5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVOb3RpZmljYXRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlHcmlkSW5pdChmb3JtTmFtZSwgbGFzdFR5cFBobCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQuY29udGVudCgpLmZpbmRGb3Jtcyhmb3JtTmFtZSlcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXhwX2RlbiA9IGZvcm0uZmluZEZpZWxkcyhcIml4cF9kZW5cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik/Lml4cF9kZW4gfHwgbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwX3BobCA9IGZvcm0uZmluZEZpZWxkcyhcInR5cF9waGxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik/LnR5cF9waGwgfHwgbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cF9waGwgIT0gbnVsbCkgbGFzdFR5cFBobCA9IHR5cF9waGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9ICQuY29udGVudChcIm1haW5cIikgYXMgYW55O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpeHBfZGVuICE9IG51bGwgJiYgdHlwX3BobCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiBpeHBfZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiB0eXBfcGhsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5pc2wuRGRwVXNlclNldHRpbmdzLm9ibGliZW5lUmFka3koKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogZmlsdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZ2V0KCkuZG9uZSgoZHRvOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGR0by5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVkVmFsdWUgPSBjb250ZW50Lmdsb2JhbFNldHRpbmdzIS5nZXQoXCJHbG9iYWwuRGRwLlJhZE9ibFNldHRpbmdzLnJhZF9vYmxfbFwiICsgaXhwX2RlbiArIHR5cF9waGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9hZGVkVmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvd3MgPSB2aWV3LmdldERhdGFSb3dzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNwbGl0VmFsdWVzID0gbG9hZGVkVmFsdWUuc3BsaXQoXCIsXCIpOyAvL3JvemTEm2xlbsOtIHVsb8W+ZW7DvWNoIGhvZG5vdCB2IGdsb2JhbHNldHRpbmdzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzLmZvckVhY2goKHJvdykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGxpdFZhbHVlcy5pbmNsdWRlcyhyb3cuZGF0YS5kZHBfcmFkZWs/LnRvU3RyaW5nKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhyb3dzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsbEdyaWRJbml0KGZvcm1OYW1lLCB2aWV3KTsgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnZ3JpZFwiLCB7XHJcbiAgICAgICAgICAgICAgICByb3dIZWlnaHQ6IDM1LFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogR29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLlVzZXJTZXR0aW5nc05hemV2KCksXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnZm9ybS1pZ25vcmVmaWVsZFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogW10sXHJcbiAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNob3dUb3BQYW5lbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaG93Qm90dG9tUGFuZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm90aWZpY2F0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwib2JsaWJlbmVfcmFka3lcIixcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlIGhpZGRlblwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRlZFZhbHVlID0gaW52aXNGaWVsZEFjdGlvbnMoZm9ybU5hbWUsIFwiUmFkT2JsU2V0dGluZ3MucmFkX29ibF9sXCIsIG9wZXJhdGlvbiwgZHRvLCB0aGlzLCBsb2FkZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdidXR0b25cIiwge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYnRuU2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZXMgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ub3Qgc2VsZWN0ZWQsIGJ1dCBjaGVja2VkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JpZF92aWV3ID0gJCgnZGl2W2RhdGEtZm9ybT1cIlJhZE9ibEZvcm1cIl0gLmdmb3JtLWZpZWxkLmdncmlkJykuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdEZHBVc2VyU2V0dGluZ3NEdG8+KFwiZ2V0Vmlld1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93cyA9IGdyaWRfdmlldy5nZXREYXRhUm93cyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3MuZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVmFsdWVzICs9IHJvdy5kYXRhLmRkcF9yYWRlayArIFwiLFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkVmFsdWVzICE9IFwiXCIpIHNlbGVjdGVkVmFsdWVzID0gc2VsZWN0ZWRWYWx1ZXMucmVwbGFjZSgvLCQvLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudCgpLmZpbmRGaWVsZHMoXCJvYmxpYmVuZV9yYWRreVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBzZWxlY3RlZFZhbHVlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgIH1cclxuXHJcbiAgICAvL29ibMOtYmVuw6kgxI10dnJ0aSBzZSB1a2zDoWTDoWrDrSB2ZSBmb3Jtw6F0dTogY3R2X29ibF9sICsgSWRlbnRpZmlrw6F0b3Iga25paHkgKyBUeXAgcG9obGVkw6F2a3lcclxuICAgIC8vdmFyIG9ibGliZW5lX2N0dnJ0aSA9IHRoYXQuZ2xvYmFsU2V0dGluZ3MhLmdldChcIkdsb2JhbC5EZHAuT2JsaWJlbmFDdHZydFNldHRpbmdzLmN0dl9vYmxfbFwiICsgdGhhdC5JeHBEZW4gKyB0aGF0LnR5cF9waGwpOyAvL29ibMOtYmVuw6kgxI10dnJ0aVxyXG4gICAgLy9kbyB0w6l0byBjZXN0eSBzZSB0byBob2TDrSBqYWtvIHN0cmluZzogXCIwLDEwLDIwLC4uLlwiXHJcbiAgICAvKiogRGVmaW5pY2UgZm9ybXVsw6HFmWUgZG8gdcW+aXZhdGVsc2vDqWhvIG5hc3RhdmVuw60sIG9ibMOtYmVuw6kgxI10dnJ0aSBuYSBrbml6ZS90eXB1IHBvaGxlZMOhdmt5XHJcbiAgICAqXHJcbiAgICAqIEByZXR1cm5zIHtGb3Jtcy5Gb3JtfVxyXG4gICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBPYmxpYmVuZUN0dnJ0aVNldHRpbmdzKCk6IEZvcm1zLkZvcm0ge1xyXG4gICAgICAgIHZhciBsb2FkZWRWYWx1ZTogc3RyaW5nO1xyXG4gICAgICAgIHZhciBsYXN0VHlwUGhsOiBhbnk7XHJcbiAgICAgICAgdmFyIHZpZXc6IGFueVtdIHwgR29yZGljLkRhdGEuVmlldzxhbnk+O1xyXG4gICAgICAgIHZhciBmb3JtX25hbWUgPSBcIk9ibGliZW5lQ3R2cnRpRm9ybVwiO1xyXG4gICAgICAgIHZhciBjb250ZW50ID0gJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnk7XHJcblxyXG4gICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJPYmxpYmVuZUN0dnJ0aUZvcm1cIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJPYmzDrWJlbsOpIMSNdHZydGlcIiwgb3BlbmVkOiBmYWxzZSB9IH0gYXMgYW55KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiS25paGFcIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZGRwS25paGEoKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie25hemV2fVwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCIsXHJcbiAgICAgICAgICAgICAgICAvL21vZGVsOiBcIkdsb2JhbC5EZHAuT2JsaWJlbmVDdHZydGlTZXR0aW5ncy5LbmloYT12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm90aWZpY2F0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2V0VmFsdWVOdWxsKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmlzbC5EZHBVc2VyU2V0dGluZ3MuZ2V0RWtvUGFyYW1zKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCkuZG9uZSgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGl4cF9kZW46IHJlc3VsdC5peHBfZGVuLCBuYXpldjogcmVzdWx0Lm5hemV2IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQuY29udGVudCgpLmZpbmRGb3JtcyhcIk9ibGliZW5lQ3R2cnRpRm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwidHlwX3BobFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IHR5cF9waGw6IHJlc3VsdC50eXBfcGhsLCBuYXpldjogcmVzdWx0Lm5hemV2X3R5cF9waGwgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiVHlwIHBvaGxlZMOhdmt5XCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnR5cFBvaGxlZGF2a3koKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3R5cF9waGx9IC0ge25hemV2fVwiLFxyXG4gICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwiaXhwX2RlblwiLCBcIml4cF9kZW5cIiwgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgcGhsX3Byb19yb2t5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVOb3RpZmljYXRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlHcmlkSW5pdChmb3JtX25hbWUsIGxhc3RUeXBQaGwpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkLmNvbnRlbnQoKS5maW5kRm9ybXMoXCJPYmxpYmVuZUN0dnJ0aUZvcm1cIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXhwX2RlbiA9IGZvcm0uZmluZEZpZWxkcyhcIml4cF9kZW5cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik/Lml4cF9kZW4gfHwgbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwX3BobCA9IGZvcm0uZmluZEZpZWxkcyhcInR5cF9waGxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik/LnR5cF9waGwgfHwgbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cF9waGwgIT0gbnVsbCkgbGFzdFR5cFBobCA9IHR5cF9waGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9ICQuY29udGVudChcIm1haW5cIikgYXMgYW55O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpeHBfZGVuICE9IG51bGwgJiYgdHlwX3BobCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiBpeHBfZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiB0eXBfcGhsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5pc2wuRGRwVXNlclNldHRpbmdzLm9ibGliZW5lQ3R2cnRpKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bzogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkdG8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlZFZhbHVlID0gY29udGVudC5nbG9iYWxTZXR0aW5ncyEuZ2V0KFwiR2xvYmFsLkRkcC5PYmxpYmVuZUN0dnJ0aVNldHRpbmdzLmN0dl9vYmxfbFwiICsgaXhwX2RlbiArIHR5cF9waGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9hZGVkVmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvd3MgPSB2aWV3LmdldERhdGFSb3dzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNwbGl0VmFsdWVzID0gbG9hZGVkVmFsdWUuc3BsaXQoXCIsXCIpOyAvL3JvemTEm2xlbsOtIHVsb8W+ZW7DvWNoIGhvZG5vdCB2IGdsb2JhbHNldHRpbmdzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzLmZvckVhY2goKHJvdzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwbGl0VmFsdWVzLmluY2x1ZGVzKHJvdy5kYXRhLmRkcF9jdHZydD8udG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcocm93cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxHcmlkSW5pdChcIk9ibGliZW5lQ3R2cnRpRm9ybVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2dyaWRcIiwge1xyXG4gICAgICAgICAgICAgICAgcm93SGVpZ2h0OiAzNSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbW1vbi5HcmlkRm9ybWF0cy5Vc2VyU2V0dGluZ3NOYXpldigpLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZ2Zvcm0taWdub3JlZmllbGRcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IFtdLFxyXG4gICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzaG93VG9wUGFuZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0JvdHRvbVBhbmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vdGlmaWNhdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm9ibGliZW5lX2N0dnJ0aVwiLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2UgaGlkZGVuXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZGVkVmFsdWUgPSBpbnZpc0ZpZWxkQWN0aW9ucyhcIk9ibGliZW5lQ3R2cnRpRm9ybVwiLCBcIk9ibGliZW5lQ3R2cnRpU2V0dGluZ3MuY3R2X29ibF9sXCIsIG9wZXJhdGlvbiwgZHRvLCB0aGlzLCBsb2FkZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdidXR0b25cIiwge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYnRuU2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZXMgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyaWRfdmlldyA9ICQoJ2RpdltkYXRhLWZvcm09XCJPYmxpYmVuZUN0dnJ0aUZvcm1cIl0gLmdmb3JtLWZpZWxkLmdncmlkJykuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdEZHBVc2VyU2V0dGluZ3NEdG8+KFwiZ2V0Vmlld1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93cyA9IGdyaWRfdmlldy5nZXREYXRhUm93cyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3MuZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVmFsdWVzICs9IHJvdy5kYXRhLmRkcF9jdHZydCArIFwiLFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkVmFsdWVzICE9IFwiXCIpIHNlbGVjdGVkVmFsdWVzID0gc2VsZWN0ZWRWYWx1ZXMucmVwbGFjZSgvLCQvLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudCgpLmZpbmRGaWVsZHMoXCJvYmxpYmVuZV9jdHZydGlcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgc2VsZWN0ZWRWYWx1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERlZmluaWNlIGZvcm11bMOhxZllIGRvIHXFvml2YXRlbHNrw6lobyBuYXN0YXZlbsOtLCBvYmzDrWJlbsOpIGthdGVnb3JpZSBwb2h5YnVcclxuICAgICpcclxuICAgICogQHJldHVybnMge0Zvcm1zLkZvcm19XHJcbiAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIE9ibGliZW5lS3RnVXBvU2V0dGluZ3MoKTogRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgdmFyIGxvYWRlZFZhbHVlOiBzdHJpbmc7XHJcbiAgICAgICAgdmFyIGxhc3RUeXBQaGw6IGFueTtcclxuICAgICAgICB2YXIgdmlldzogYW55W10gfCBHb3JkaWMuRGF0YS5WaWV3PGFueT47XHJcbiAgICAgICAgdmFyIGZvcm1fbmFtZSA9IFwiT2JsaWJlbmVLdGdVcG9Gb3JtXCI7XHJcbiAgICAgICAgdmFyIGNvbnRlbnQgPSAkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueTtcclxuXHJcbiAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zXHJcbiAgICAgICAgICAgIC5Gb3JtKHsgbmFtZTogXCJPYmxpYmVuZUt0Z1Vwb0Zvcm1cIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJPYmzDrWJlbsOpIGthdGVnb3JpZSBwb2h5YnVcIiwgb3BlbmVkOiBmYWxzZSB9IH0gYXMgYW55KSAgIFxyXG4gICAgICAgICAgICAuYWRkUm93KFwiS25paGFcIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZGRwS25paGEoKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie25hemV2fVwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCIsXHJcbiAgICAgICAgICAgICAgICAvL21vZGVsOiBcIkdsb2JhbC5EZHAuT2JsaWJlbmVLdGdVcG9TZXR0aW5ncy5LbmloYT12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm90aWZpY2F0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2V0VmFsdWVOdWxsKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmlzbC5EZHBVc2VyU2V0dGluZ3MuZ2V0RWtvUGFyYW1zKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCkuZG9uZSgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGl4cF9kZW46IHJlc3VsdC5peHBfZGVuLCBuYXpldjogcmVzdWx0Lm5hemV2IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQuY29udGVudCgpLmZpbmRGb3JtcyhcIk9ibGliZW5lS3RnVXBvRm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwidHlwX3BobFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IHR5cF9waGw6IHJlc3VsdC50eXBfcGhsLCBuYXpldjogcmVzdWx0Lm5hemV2X3R5cF9waGwgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiVHlwIHBvaGxlZMOhdmt5XCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnR5cFBvaGxlZGF2a3koKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3R5cF9waGx9IC0ge25hemV2fVwiLFxyXG4gICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwiaXhwX2RlblwiLCBcIml4cF9kZW5cIiwgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgcGhsX3Byb19yb2t5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVOb3RpZmljYXRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlHcmlkSW5pdChmb3JtX25hbWUsIGxhc3RUeXBQaGwpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkLmNvbnRlbnQoKS5maW5kRm9ybXMoXCJPYmxpYmVuZUt0Z1Vwb0Zvcm1cIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXhwX2RlbiA9IGZvcm0uZmluZEZpZWxkcyhcIml4cF9kZW5cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik/Lml4cF9kZW4gfHwgbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwX3BobCA9IGZvcm0uZmluZEZpZWxkcyhcInR5cF9waGxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik/LnR5cF9waGwgfHwgbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cF9waGwgIT0gbnVsbCkgbGFzdFR5cFBobCA9IHR5cF9waGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9ICQuY29udGVudChcIm1haW5cIikgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZ1Y2N1cG9fYWxsID0gY29udGVudC5nbG9iYWxTZXR0aW5ncyEuZ2V0KFwiR2xvYmFsLkRkcC5PYmxpYmVuZUt0Z1Vwb1NldHRpbmdzLmZ1Y2N1cG9fYWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXhwX2RlbiAhPSBudWxsICYmIHR5cF9waGwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogaXhwX2RlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogdHlwX3BobCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVjY3Vwb19hbGw6IGZ1Y2N1cG9fYWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5pc2wuRGRwVXNlclNldHRpbmdzLm9ibGliZW5lS3RnVXBvKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bzogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkdG8uZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkZWRWYWx1ZSA9IGNvbnRlbnQuZ2xvYmFsU2V0dGluZ3MhLmdldChcIkdsb2JhbC5EZHAuT2JsaWJlbmVLdGdVcG9TZXR0aW5ncy5Vc2VVcG9cIiArIGl4cF9kZW4gKyB0eXBfcGhsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRlZFZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3dzID0gdmlldy5nZXREYXRhUm93cyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzcGxpdFZhbHVlcyA9IGxvYWRlZFZhbHVlLnNwbGl0KFwiLFwiKTsgLy9yb3pkxJtsZW7DrSB1bG/FvmVuw71jaCBob2Rub3QgdiBnbG9iYWxzZXR0aW5nc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cy5mb3JFYWNoKChyb3c6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGxpdFZhbHVlcy5pbmNsdWRlcyhyb3cuZGF0YS5rdGdfdXBvPy50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhyb3dzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsbEdyaWRJbml0KFwiT2JsaWJlbmVLdGdVcG9Gb3JtXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImZ1Y2N1cG9fYWxsXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJab2JyYXppdCB2xaFlY2hueVwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLkRkcC5PYmxpYmVuZUt0Z1Vwb1NldHRpbmdzLmZ1Y2N1cG9fYWxsPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2VcIixcclxuICAgICAgICAgICAgICAgIGNoYW5nZTogKF9ldjogYW55LCBvYmo6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmdWNjdXBvX2FsbDogYm9vbGVhbjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlID09IHRydWUpIGZ1Y2N1cG9fYWxsID0gdHJ1ZTsgLy96b2JyYXppdCB2xaFlY2hueVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgZnVjY3Vwb19hbGwgPSBmYWxzZTsvL25lem9icmF6b3ZhdCB2xaFlY2hueVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQuY29udGVudCgpLmZpbmRGb3JtcyhcIk9ibGliZW5lS3RnVXBvRm9ybVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpeHBfZGVuID0gZm9ybS5maW5kRmllbGRzKFwiaXhwX2RlblwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKT8uaXhwX2RlbiB8fCBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBfcGhsID0gZm9ybS5maW5kRmllbGRzKFwidHlwX3BobFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKT8udHlwX3BobCB8fCBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXhwX2RlbiA9PSBudWxsIHx8IHR5cF9waGwgPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IGl4cF9kZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1Y2N1cG9fYWxsOiBmdWNjdXBvX2FsbFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5pc2wuRGRwVXNlclNldHRpbmdzLm9ibGliZW5lS3RnVXBvKCgpID0+ICh7IGZpbHRlcnM6IGZpbHRlciB9KSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGR0bzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxvYWRlZFZhbHVlID0gY29udGVudC5nbG9iYWxTZXR0aW5ncyEuZ2V0KFwiR2xvYmFsLkRkcC5PYmxpYmVuZUt0Z1Vwb1NldHRpbmdzLlVzZVVwb1wiICsgaXhwX2RlbiArIHR5cF9waGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRlZFZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93cyA9IHZpZXcuZ2V0RGF0YVJvd3ModHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNwbGl0VmFsdWVzID0gbG9hZGVkVmFsdWUuc3BsaXQoXCIsXCIpOyAvL3JvemTEm2xlbsOtIHVsb8W+ZW7DvWNoIGhvZG5vdCB2IGdsb2JhbHNldHRpbmdzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cy5mb3JFYWNoKChyb3c6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BsaXRWYWx1ZXMuaW5jbHVkZXMocm93LmRhdGEua3RnX3Vwbz8udG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJvd3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJ2RpdltkYXRhLWZvcm09XCJPYmxpYmVuZUt0Z1Vwb0Zvcm1cIl0gLmdmb3JtLWZpZWxkLmdncmlkJykuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2dyaWRcIiwge1xyXG4gICAgICAgICAgICAgICAgcm93SGVpZ2h0OiAzNSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbW1vbi5HcmlkRm9ybWF0cy5PYmxpYmVuZUt0Z1Vwb1NldHRpbmdzKCksXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnZm9ybS1pZ25vcmVmaWVsZFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogW10sXHJcbiAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNob3dUb3BQYW5lbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaG93Qm90dG9tUGFuZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm90aWZpY2F0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2UgaGlkZGVuXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZGVkVmFsdWUgPSBpbnZpc0ZpZWxkQWN0aW9ucyhcIk9ibGliZW5lS3RnVXBvRm9ybVwiLCBcIk9ibGliZW5lS3RnVXBvU2V0dGluZ3MuVXNlVXBvXCIsIG9wZXJhdGlvbiwgZHRvLCB0aGlzLCBsb2FkZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdidXR0b25cIiwge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYnRuU2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZXMgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyaWRfdmlldyA9ICQoJ2RpdltkYXRhLWZvcm09XCJPYmxpYmVuZUt0Z1Vwb0Zvcm1cIl0gLmdmb3JtLWZpZWxkLmdncmlkJykuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdEZHBVc2VyU2V0dGluZ3NEdG8+KFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3dzID0gZ3JpZF92aWV3LmdldERhdGFSb3dzKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpcnN0LCBlbnN1cmUga3RnX3VwbyA9PSAxMDAgaXMgYWx3YXlzIGNoZWNrZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoYXMxMDAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3MuZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5kYXRhLmt0Z191cG8gPT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzMTAwID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDb2xsZWN0IGFsbCBjaGVja2VkIHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cy5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93LmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRWYWx1ZXMgKz0gcm93LmRhdGEua3RnX3VwbyArIFwiLFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0cmFpbGluZyBjb21tYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkVmFsdWVzICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFZhbHVlcyA9IHNlbGVjdGVkVmFsdWVzLnJlcGxhY2UoLywkLywgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIGdyaWQgdmlldyBvbmNlIGlmIHdlIG1vZGlmaWVkIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFzMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJvd3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJ2RpdltkYXRhLWZvcm09XCJPYmxpYmVuZUt0Z1Vwb0Zvcm1cIl0gLmdmb3JtLWZpZWxkLmdncmlkJykuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudCgpLmZpbmRGaWVsZHMoXCJrdGdfdXBvXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHNlbGVjdGVkVmFsdWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ2J1dHRvblwiLCB7XHJcbiAgICAgICAgICAgIC8vICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJidG5TYXZlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY2FwdGlvbjogXCJVbG/Fvml0XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHZhciBzZWxlY3RlZFZhbHVlcyA9IFwiXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHZhciBncmlkX3ZpZXcgPSAkKCdkaXZbZGF0YS1mb3JtPVwiT2JsaWJlbmVLdGdVcG9Gb3JtXCJdIC5nZm9ybS1maWVsZC5nZ3JpZCcpLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HRGRwVXNlclNldHRpbmdzRHRvPihcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHZhciByb3dzID0gZ3JpZF92aWV3LmdldERhdGFSb3dzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcm93cy5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVmFsdWVzICs9IHJvdy5kYXRhLmt0Z191cG8gKyBcIixcIjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFZhbHVlcyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByb3dzLmZvckVhY2goKHJvdykgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cuZGF0YS5rdGdfdXBvID09IDEwMCAmJiByb3cuY2hlY2tlZCAhPSB0cnVlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRWYWx1ZXMgKz0gcm93LmRhdGEua3RnX3VwbztcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJvd3MpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCdkaXZbZGF0YS1mb3JtPVwiT2JsaWJlbmVLdGdVcG9Gb3JtXCJdIC5nZm9ybS1maWVsZC5nZ3JpZCcpLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRWYWx1ZXMgPSBzZWxlY3RlZFZhbHVlcy5yZXBsYWNlKC8sJC8sIFwiXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5maW5kRmllbGRzKFwia3RnX3Vwb1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBzZWxlY3RlZFZhbHVlcyk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30pXHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZWZpbmljZSBmb3JtdWzDocWZZSBkbyB1xb5pdmF0ZWxza8OpaG8gbmFzdGF2ZW7DrSwga29udHJvbGEgbmEgUk9CXHJcbiAgICAqXHJcbiAgICAqIEByZXR1cm5zIHtGb3Jtcy5Gb3JtfVxyXG4gICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBST0JTZXR0aW5ncygpOiBGb3Jtcy5Gb3JtIHtcclxuICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXNcclxuICAgICAgICAgICAgLkZvcm0oeyBuYW1lOiBcIlJPQkZvcm1cIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJLb250cm9sYSBuYSBST0JcIiwgb3BlbmVkOiBmYWxzZSB9IH0gYXMgYW55KSAgIFxyXG4gICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy00XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicm9iX2Noa191bGljZVwiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiVWxpY2VcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5EZHAuUk9CU2V0dGluZ3Mucm9iX2Noa191bGljZT12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy00XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicm9iX2Noa19jcG9wXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCLEjMOtc2xvIHBvcGlzbsOpXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuRGRwLlJPQlNldHRpbmdzLnJvYl9jaGtfY3BvcD12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy00XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicm9iX2Noa19jb3JcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIsSMw61zbG8gb3JpZW50YcSNbsOtXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuRGRwLlJPQlNldHRpbmdzLnJvYl9jaGtfY29yPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2VcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTRcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJyb2JfY2hrX2NvYmNlXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCLEjMOhc3Qgb2JjZVwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLkRkcC5ST0JTZXR0aW5ncy5yb2JfY2hrX2NvYmNlPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2VcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTRcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJyb2JfY2hrX21jYXN0XCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJNxJtzdHNrw6EgxI3DoXN0XCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuRGRwLlJPQlNldHRpbmdzLnJvYl9jaGtfbWNhc3Q9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInJvYl9jaGtfb2JlY1wiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiT2JlY1wiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLkRkcC5ST0JTZXR0aW5ncy5yb2JfY2hrX29iZWM9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInJvYl9jaGtfcHNjXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJQU8SMXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuRGRwLlJPQlNldHRpbmdzLnJvYl9jaGtfcHNjPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2VcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkVGV4dChcIlZ5YmVydGUgcG9sZSwga3RlcsOhIGpzb3UgZMWvbGXFvml0w6EgcMWZaSBrb250cm9sZSBleHRlcm7DrWNoIHN1Ympla3TFryBwcm90aSBST0JcIilcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERlZmluaWNlIGZvcm11bMOhxZllIGRvIHXFvml2YXRlbHNrw6lobyBuYXN0YXZlbsOtLCB6w6FzaWxreVxyXG4gICAgKlxyXG4gICAgKiBAcmV0dXJucyB7Rm9ybXMuRm9ybX1cclxuICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gWmFzaWxreVNldHRpbmdzKCk6IEZvcm1zLkZvcm0ge1xyXG4gICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtc1xyXG4gICAgICAgICAgICAuRm9ybSh7IG5hbWU6IFwiWmFzaWxreUZvcm1cIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJQYXJhbWV0cnkgcHJvIG9kZXPDrWzDoW7DrSB6w6FzaWxla1wiLCBvcGVuZWQ6IGZhbHNlIH0gfSBhcyBhbnkpXHJcbiAgICAgICAgICAgIC8vLmFkZFNlY3Rpb24oXCJQYXJhbWV0cnkgcHJvIG9kZXPDrWzDoW7DrSB6w6FzaWxla1wiKVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiVHlwIHZ5aG9kbm9jZW7DrVwiKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC53ZmxjdGRvKCksIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwid2ZsY3Rkb1wiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLkRkcC5aYXNpbGt5U2V0dGluZ3MuZGVmYXVsdF93ZmxjdGRvPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2VcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiVHlwIHRpc2t1XCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LndmbGN0dGkoKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ3ZmxjdHRpXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuRGRwLlphc2lsa3lTZXR0aW5ncy5kZWZhdWx0X3dmbGN0dGk9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgYXJjaGl2YWNlXCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LndmbGN0YXIoKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ3ZmxjdGFyXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuRGRwLlphc2lsa3lTZXR0aW5ncy5kZWZhdWx0X3dmbGN0YXI9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJUeXAga29udmVyemVcIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Qud2ZsY3RrbygpLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIndmbGN0a29cIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5EZHAuWmFzaWxreVNldHRpbmdzLmRlZmF1bHRfd2ZsY3Rrbz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCJcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERlZmluaWNlIGZvcm11bMOhxZllIGRvIHXFvml2YXRlbHNrw6lobyBuYXN0YXZlbsOtLCBnZW5lcmFjZSB2eW3DoWjDoW7DrVxyXG4gICAgKlxyXG4gICAgKiBAcmV0dXJucyB7Rm9ybXMuRm9ybX1cclxuICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2VuZXJhY2VWeW1haGFuaVNldHRpbmdzKCk6IEZvcm1zLkZvcm0ge1xyXG4gICAgICAgIHZhciBrbmloYTogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB2YXIgdHlwUGhsOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHZhciBza3VwaW5hOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHZhciB6bWVuYVR5cFBobDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHZhciB6bWVuYVNrdXBpbnk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICB2YXIgY29udGVudCA9ICQuY29udGVudChcIm1haW5cIikgYXMgYW55O1xyXG5cclxuICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXNcclxuICAgICAgICAgICAgLkZvcm0oeyBuYW1lOiBcIkdlbmVyYWNlVnltYWhhbmlGb3JtXCIsIHRhYk9wdGlvbnM6IHsgdGl0bGU6IFwiR2VuZXJvdsOhbsOtIHZ5bcOhaMOhbsOtXCIsIG9wZW5lZDogZmFsc2UgfSB9IGFzIGFueSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIktuaWhhXCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmRkcEtuaWhhKCksIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntuYXpldn1cIixcclxuICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCIsXHJcbiAgICAgICAgICAgICAgICAvL21vZGVsOiBcIkdsb2JhbC5EZHAuR2VuZXJhY2VWeW1haGFuaVNldHRpbmdzLktuaWhhPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm90aWZpY2F0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBabcSbbmEga25paHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZFZhbHVlID0gdGhhdC5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtuaWhhID0gZmllbGRWYWx1ZS5peHBfZGVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5pc2wuRGRwVXNlclNldHRpbmdzLmdldEVrb1BhcmFtcygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpLmRvbmUoKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtuaWhhID0gcmVzdWx0Lml4cF9kZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cFBobCA9IHJlc3VsdC50eXBfcGhsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdmaWVsZChcInNldFZhbHVlXCIsIHsgaXhwX2RlbjogcmVzdWx0Lml4cF9kZW4sIG5hemV2OiByZXN1bHQubmF6ZXYgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQuY29udGVudCgpLmZpbmRGb3JtcyhcIkdlbmVyYWNlVnltYWhhbmlGb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgdHlwX3BobDogdHlwUGhsLCBuYXpldjogcmVzdWx0Lm5hemV2X3R5cF9waGwgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiVHlwIHBvaGxlZMOhdmt5XCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnR5cFBvaGxlZGF2a3koKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3R5cF9waGx9IC0ge25hemV2fVwiLFxyXG4gICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwiaXhwX2RlblwiLCBcIml4cF9kZW5cIiwgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgcGhsX3Byb19yb2t5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm90aWZpY2F0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkLmNvbnRlbnQoKS5maW5kRm9ybXMoXCJHZW5lcmFjZVZ5bWFoYW5pRm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogLy8gWm3Em25hIHYgcG9saVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmFzdGFsYSB6bcSbbmEgdiBwb2xpIHR5cCBwb2hsZWTDoXZreSwgdGVkeSBtdXPDrW1lIHDFmWXEjcOtc3Qgc2t1cGludSB6IHVzZXJTZXR0aW5ncyBhIHZsb8W+aXQgZG8gcG9sZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikudHlwX3BobCAhPSB0eXBQaGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6bWVuYVR5cFBobCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwUGhsID0gdGhhdC5nZmllbGQoXCJnZXRWYWx1ZVwiKS50eXBfcGhsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2t1cGluYSA9IGNvbnRlbnQuZ2xvYmFsU2V0dGluZ3MhLmdldChgR2xvYmFsLkRkcC5HZW5lcmFjZVZ5bWFoYW5pU2V0dGluZ3MuU2t1cGluYSR7a25paGF9JHt0eXBQaGx9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2t1cGluYSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiaXhzX3NrdlwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBza3VwaW5hKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIlNrdXBpbmFcIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5za3VwaW5hVnltYWhhbmlOb3ZlVnltKCksIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3NrdlwiLFxyXG4gICAgICAgICAgICAgICAgLy9tb2RlbDogYEdsb2JhbC5EZHAuR2VuZXJhY2VWeW1haGFuaVNldHRpbmdzLlNrdXBpbmEke2tuaWhhfSR7dHlwUGhsfT12YWx1ZWAsXHJcbiAgICAgICAgICAgICAgICBncmFwaGljSW5wdXQ6IFwiaGlkZGVuXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogR29yZGljLkNvbXBvbmVudHMuR0ZpZWxkQXNzaXN0Lmlnbm9yZUNsYXNzICsgXCIgdXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCIsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwidHlwX3BobFwiLCBcInR5cF9waGxcIiwgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYmcgPSBkYXRhPy5iYXJ2YSAhPSBudWxsID8gYGJhY2tncm91bmQtY29sb3I6ICR7R29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLkJhc2UuR2V0SGV4Q29sb3IoZGF0YT8uYmFydmEpfTtgIDogXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyO1wiPjxkaXYgc3R5bGU9XCIke2JnfSBoZWlnaHQ6IDE4cHg7IHdpZHRoOiAxOHB4OyBib3JkZXI6IDFweCBzb2xpZCBncmF5OyBtYXJnaW4tcmlnaHQ6IDVweDtcIj48L2Rpdj4ke2RhdGE/Lm5hemV2fTwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQuY29udGVudCgpLmZpbmRGb3JtcyhcIkdlbmVyYWNlVnltYWhhbmlGb3JtXCIpOyAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogLy8gUHJvYsSbaGxhIHptxJtuYSB2IHBvbGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eXBQaGxGb3JtVmFsdWUgPSBmb3JtLmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cFBobEZvcm1WYWx1ZSA9PSBudWxsKSBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBqZSB1bG/FvmVuw70gdHlwIHBvaGxlZMOhdmt5IHN0ZWpuw70gamFrbyB2IHBvbGksIHRhayB0byB6bmFtZW7DoSDFvmUgc2Ugem3Em25pbGEgcG91emUgc2t1cGluYSwgdGVkeSBtxJtuw61tZSB1c2VyU2V0dGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSB0aGF0LmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF6bWVuYVR5cFBobCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZ2xvYmFsU2V0dGluZ3MhLnNldChgR2xvYmFsLkRkcC5HZW5lcmFjZVZ5bWFoYW5pU2V0dGluZ3MuU2t1cGluYSR7a25paGF9JHt0eXBQaGx9YCwgZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Ugem1lbmFUeXBQaGwgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRWYWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkVmFsdWUuaXhzX3NrdiAhPSBza3VwaW5hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChza3VwaW5hICE9IFwiXCIpIHptZW5hU2t1cGlueSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNrdXBpbmEgPSB0aGF0LmdmaWVsZChcImdldFZhbHVlXCIpLml4c19za3Y7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWxnb3JpdG11cyA9IGNvbnRlbnQuZ2xvYmFsU2V0dGluZ3MhLmdldChgR2xvYmFsLkRkcC5HZW5lcmFjZVZ5bWFoYW5pU2V0dGluZ3MuQWxnb3JpdG11cyR7a25paGF9JHt0eXBQaGx9JHtmaWVsZFZhbHVlLml4c19za3Z9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFsZ29yaXRtdXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJhbGdvcml0bXVzXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGFsZ29yaXRtdXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIkFsZ29yaXRtdXNcIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5kZHBjYWd2KCksIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWxnb3JpdG11c1wiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCIsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxnX3Z5bTogXCIhPSAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXhzX3NrdjogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwiaXhzX3NrdlwiLCBcIml4c19za3ZcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHptZW5hU2t1cGlueSB8fCBvYmoudmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVOb3RpZmljYXRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHptZW5hU2t1cGlueSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQuY29udGVudCgpLmZpbmRGb3JtcyhcIkdlbmVyYWNlVnltYWhhbmlGb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOiAvLyBQcm9ixJtobGEgem3Em25hIHYgcG9saVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNrdXBpbmFGb3JtVmFsdWUgPSBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfc2t2XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNrdXBpbmFGb3JtVmFsdWUgPT0gbnVsbCkgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNrdXBpbmEgPSBza3VwaW5hRm9ybVZhbHVlLml4c19za3Y7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGRWYWx1ZSA9IHRoYXQuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF6bWVuYVNrdXBpbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50Lmdsb2JhbFNldHRpbmdzIS5zZXQoYEdsb2JhbC5EZHAuR2VuZXJhY2VWeW1haGFuaVNldHRpbmdzLkFsZ29yaXRtdXMke2tuaWhhfSR7dHlwUGhsfSR7c2t1cGluYX1gLCBmaWVsZFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgfVxyXG5cclxuICAgIC8vI3JlZ2lvbiBwb21vY27DqSBmdW5rY2VcclxuICAgIC8qKlxyXG4gICAgICogIE5hc3RhdmVuw60gdsWhZWNoIHBvbMOtxI1layBjbyBqc291IHByb3BvamVuw6kgbmEgbnVsbCwgamVsaWtvxb4gc2UgbmEgcG9wcnbDrSBuZW5hxI3DrXRhasOtIHNrcnogdXNlclNldHRpbmdzIChob2TDrSBzZSB0YW0gcHJ2bsOtIGhvZG5vdGEpLCBjb8W+IHZ5cGFkw6EgZGl2bsSbIGtkecW+IHNlIHRvIG90ZXbFmWUgem5vdnUgYSB2xaFlY2hubyBqZSBqaW5ha1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBzZXRWYWx1ZU51bGwoKSB7XHJcbiAgICAgICAgdmFyIGNvbnRlbnQgPSAkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueTtcclxuICAgICAgICBjb250ZW50Lmdsb2JhbFNldHRpbmdzIS5zZXQoXCJHbG9iYWwuRGRwLlpwdXNvYnlVaHJhZHlTZXR0aW5ncy5LbmloYVwiLCBudWxsKTtcclxuICAgICAgICBjb250ZW50Lmdsb2JhbFNldHRpbmdzIS5zZXQoXCJHbG9iYWwuRGRwLlJhZE9ibFNldHRpbmdzLktuaWhhXCIsIG51bGwpO1xyXG4gICAgICAgIGNvbnRlbnQuZ2xvYmFsU2V0dGluZ3MhLnNldChcIkdsb2JhbC5EZHAuT2JsaWJlbmVDdHZydGlTZXR0aW5ncy5LbmloYVwiLCBudWxsKTtcclxuICAgICAgICBjb250ZW50Lmdsb2JhbFNldHRpbmdzIS5zZXQoXCJHbG9iYWwuRGRwLk9ibGliZW5lS3RnVXBvU2V0dGluZ3MuS25paGFcIiwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5rY2UgayBtYXrDoW7DrSB6Ynl0ZcSNbsO9Y2ggdG9hc3Qgbm90aWZpa2HEjcOtY2ggb3puw6FtZW7DrVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZW1vdmVOb3RpZmljYXRpb25zKCkge1xyXG4gICAgICAgICQoXCIuZ25vdGlmaWNhdGlvbmxpc3RcIikuZ25vdGlmaWNhdGlvbmxpc3QoXCJjbGVhclRvYXN0c1wiKTsgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdWtjZSBrIG5hc3RhdmVuw60gdGFidWxreSwga2R5xb4gamUgcHLDoXpkbsOhXHJcbiAgICAgKiBAcGFyYW0gZm9ybV9uYW1lXHJcbiAgICAgKiBAcGFyYW0gbGFzdFR5cFBobFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBlbXB0eUdyaWRJbml0KGZvcm1fbmFtZTogc3RyaW5nLCBsYXN0VHlwUGhsOiBhbnkpIHtcclxuICAgICAgICB2YXIgZm9ybSA9ICQuY29udGVudCgpLmZpbmRGb3Jtcyhmb3JtX25hbWUpO1xyXG4gICAgICAgIHZhciB0eXBfcGhsID0gZm9ybS5maW5kRmllbGRzKFwidHlwX3BobFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKT8udHlwX3BobCB8fCBudWxsO1xyXG4gICAgICAgIGlmICh0eXBfcGhsID09IG51bGwgJiYgbGFzdFR5cFBobCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWV3ID0gW107XHJcbiAgICAgICAgICAgIHZhciBncmlkID0gJCgnZGl2W2RhdGEtZm9ybT1cIicgKyBmb3JtX25hbWUgKyAnXCJdIC5nZm9ybS1maWVsZC5nZ3JpZCcpO1xyXG4gICAgICAgICAgICBncmlkLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgZ3JpZC5oZWlnaHQoXCI3MHB4XCIpO1xyXG4gICAgICAgICAgICBncmlkLmdncmlkKFwiZml0VlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5rY2UgayBuYXN0YXZlbsOtLCB0YWJ1bGt5IGtkecW+IGplIHBsbsOhXHJcbiAgICAgKiBAcGFyYW0gZm9ybV9uYW1lXHJcbiAgICAgKiBAcGFyYW0gdmlld1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBmdWxsR3JpZEluaXQoZm9ybV9uYW1lOiBzdHJpbmcsIHZpZXc6IGFueSkge1xyXG4gICAgICAgIHZhciBncmlkID0gJCgnZGl2W2RhdGEtZm9ybT1cIicgKyBmb3JtX25hbWUgKyAnXCJdIC5nZm9ybS1maWVsZC5nZ3JpZCcpO1xyXG4gICAgICAgIGdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgIGdyaWQuaGVpZ2h0KFwiMjAwcHhcIik7XHJcbiAgICAgICAgZ3JpZC5nZ3JpZChcImZpdFZcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5rY2UgcHJvIG5ldmlkaXRlbG7DqSBwb2zDrcSNa28sIHDFmWVzIGt0ZXLDqSBzZSB1a2zDoWTDoSBkbyBVc2VyU2V0dGluZ3NcclxuICAgICAqIEBwYXJhbSBmb3JtX25hbWVcclxuICAgICAqIEBwYXJhbSBwYXRoXHJcbiAgICAgKiBAcGFyYW0gb3BlcmF0aW9uXHJcbiAgICAgKiBAcGFyYW0gZHRvXHJcbiAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICogQHBhcmFtIGxvYWRlZFZhbHVlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpbnZpc0ZpZWxkQWN0aW9ucyhmb3JtX25hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nLCBvcGVyYXRpb246IHN0cmluZywgZHRvOiBhbnksIHRoYXQ6IGFueSwgbG9hZGVkVmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgdmFyIGZvcm0gPSAkLmNvbnRlbnQoKS5maW5kRm9ybXMoZm9ybV9uYW1lKTtcclxuICAgICAgICB2YXIgaXhwX2RlbiA9IGZvcm0uZmluZEZpZWxkcyhcIml4cF9kZW5cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik/Lml4cF9kZW4gfHwgbnVsbDtcclxuICAgICAgICB2YXIgdHlwX3BobCA9IGZvcm0uZmluZEZpZWxkcyhcInR5cF9waGxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik/LnR5cF9waGwgfHwgbnVsbDtcclxuXHJcbiAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAkKHRoYXQpLmdmaWVsZChcInNldEluaXRpYWxcIiwgXCJpbml0aWFsVmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9hZGVkVmFsdWU7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOlxyXG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSAkKHRoYXQpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRlZFZhbHVlICE9IGZpZWxkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBVdGlscy5zZXRWYWx1ZUJ5S2V5UGF0aChcIkdsb2JhbC5EZHAuXCIgKyBwYXRoICsgaXhwX2RlbiArIHR5cF9waGwsIGR0bywgZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZGVkVmFsdWUgPSBmaWVsZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJCh0aGF0KS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIFwiaW5pdGlhbFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvYWRlZFZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxvYWRlZFZhbHVlO1xyXG4gICAgfVxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbn0iXX0=
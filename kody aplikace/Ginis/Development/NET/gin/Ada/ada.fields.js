"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Ada.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const cached = "cached"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const selector = "selector"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const graphicInput = "graphicInput"; const itemTooltipTemplate = "itemTooltipTemplate"; const verticalButtons = "verticalButtons"; const states = "states"; const doNotSearch = "doNotSearch"; const filterPanelOpts = "filterPanelOpts"; const dropdown = "dropdown"; const helperItemTemplate = "helperItemTemplate";

// GReaderDokumentADA.fields.js
Readers.DokumentADA = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDokumentADA",keys:["ixp"],[columns]:["ixp", "akt_znacka", "Vlastnictvi", "umisteni", "poc_priloh", "typ_ag"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.DokumentADA.inheritsFrom(ReadersBase);
Fields.dokumentADA = (prefabOptions) => { return {data:new Readers.DokumentADA(),[itemTemplate]:"{ixp}",[helperColumns]:["ixp"],[selector]:(options) => newDefaultSelector($.extend(Selectors.dokumentADA(),prefabOptions,options)).show()};};
Selectors.dokumentADA = () => { return {data:new Readers.DokumentADA(),[gridOpts]:{
		columnMode: "full",
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "ixp", caption: "jres:30450047", width: 130, forced: true })
		.addTextColumn({ name: "akt_znacka", caption: "jres:30450048", width: 140 })
		.addTextColumn({ name: "poznamka", caption: "jres:30450052", width: 140 })
		.addTextColumn({ name: "nazev", caption: "jres:30450049", width: 190 })
		.addTextColumn({ name: "Vlastnictvi", caption: "jres:30450050", width: 300 })
		.addTextColumn({ name: "umisteni", caption: "jres:30450054", width: 40 })
		.addNumberColumn({ name: "poc_priloh", caption: "jres:30450057", width: 40 }),[userSettings]:usRoot+"dokumentADA",[isolatedUserSettings]:true};};

// GReaderEkoskomADA.fields.js
Readers.EkoskomADA = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoskomADA",keys:["ico","ixs_fun"],[columns]:["nazev_ref", "nazev", "cis_real", "num_komp"],[rowSize]:100,[readAll]:false,[cached]:0,[permanent]:false}, options); };
Readers.EkoskomADA.inheritsFrom(ReadersBase);
Fields.ekoskomADA = (prefabOptions) => { return {data:new Readers.EkoskomADA(),[itemTemplate]:function (row) {
        var text = Gordic.Prefabs.Utils.getTrimEncodeString(row.cis_real) ;         return ("{0}<br><i>{1}{2}</i>").format(Gordic.Prefabs.Utils.getTrimEncodeString(row.nazev_ref), Gordic.Prefabs.Utils.getTrimEncodeString(row.nazev), !Gordic.Prefabs.Utils.isEmpty(text) ? " ( " + text + " )" : "");
    },[graphicInput]:"oninput",[itemTooltipTemplate]:function (row) {
        var text = Gordic.Prefabs.Utils.getTrimEncodeString(row.cis_real);         return ("{0}<br><i>{1}{2}</i>").format(Gordic.Prefabs.Utils.getTrimEncodeString(row.nazev_ref), Gordic.Prefabs.Utils.getTrimEncodeString(row.nazev), !Gordic.Prefabs.Utils.isEmpty(text) ? " ( " + text + " )" : "");
    },[verticalButtons]:true,[helperColumns]:["nazev_ref", "nazev", "cis_real", "num_komp"],[states]:[{
        icon: "gi-user",
        align: "opposite",
        customClass: "g-inactive-prefabState"
    }],[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoskomADA(),prefabOptions,options)).show()};};
Fields.ekoskomADAMini = (prefabOptions) => { return {data:new Readers.EkoskomADA(),[itemTemplate]:"{nazev_rf:trim:encode} (Realizátor: {cis_real:trim:encode})",[itemTooltipTemplate]:"{nazev_rf:trim:encode} (Realizátor: {cis_real:trim:encode})",[graphicInput]:"oninput",[verticalButtons]:true,[helperColumns]:["nazev_rf"],[states]:[{
        icon: "gi-user",
        align: "opposite",
        customClass: "g-inactive-prefabState"
    }],[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoskomADA(),prefabOptions,options)).show()};};
Selectors.ekoskomADA = () => { return {data:new Readers.EkoskomADA(),[userSettings]:usRoot+"ekoskomADA",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev_ref", "nazev", "cis_real", "num_komp"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev_ref", caption: "jres:30450039", width: 120, forced: true}).addTextColumn({name: "nazev", caption: "jres:30450038", width: 260}).addTextColumn({name: "cis_real", caption: "jres:30450037", width: 60}).addTextColumn({name: "num_komp", caption: "jres:30450043", width: 100})};};

// GReaderEkosrarADA.fields.js
Readers.EkosrarADA = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosrarADA",keys:["ico"],[columns]:["ico","nazev","aktivita","dor2","org","typ_org"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.EkosrarADA.inheritsFrom(ReadersBase);
Fields.ekosrarADA = (prefabOptions) => { return {data:new Readers.EkosrarADA(),[itemTemplate]:"{ico} {nazev}",[helperColumns]:["ico", "nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosrarADA(),prefabOptions,options)).show()};};
Selectors.ekosrarADA = () => { return {data:new Readers.EkosrarADA(),[userSettings]:usRoot+"ekosrarADA",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ico", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "ico", caption: "jres:30450044", width: 150, forced: true}).addTextColumn({name: "nazev", caption: "jres:30450045", width: 300})};};

// GReaderEvzcspeADA.fields.js
Readers.EvzcspeADA = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzcspeADA",keys:["schv_spec"],[columns]:["schv_spec","schv_spec_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.EvzcspeADA.inheritsFrom(ReadersBase);
Fields.evzcspeADA = (prefabOptions) => { return {data:new Readers.EvzcspeADA(),[itemTemplate]:"{schv_spec_txt}",[helperColumns]:["schv_spec_txt"]};};

// GReaderGincaktADA.fields.js
Readers.GincaktADA = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincaktADA",keys:["aktivita"],[columns]:["aktivita","aktivita_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GincaktADA.inheritsFrom(ReadersBase);
Fields.gincaktADA = (prefabOptions) => { return {data:new Readers.GincaktADA(),[itemTemplate]:"{aktivita_txt:trim:encode}",[helperColumns]:["aktivita", "aktivita_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gincaktADA(),prefabOptions,options)).show()};};
Selectors.gincaktADA = () => { return {data:new Readers.GincaktADA(),[userSettings]:usRoot+"gincaktADA",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["aktivita", "aktivita_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "aktivita", caption: "jres:30450020", width: 150, forced: true}).addTextColumn({name: "aktivita_txt", caption: "jres:30450021", width: 300})};};

// GReaderISPPriloha.fields.js
Readers.ISPPriloha = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderISPPriloha",keys:["ixb"],[columns]:["ixb","ixs","popis"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.ISPPriloha.inheritsFrom(ReadersBase);
Fields.iSPPriloha = (prefabOptions) => { return {data:new Readers.ISPPriloha(),[itemTemplate]:"{popis}",[helperColumns]:["popis"],[selector]:(options) => newDefaultSelector($.extend(Selectors.iSPPriloha(),prefabOptions,options)).show()};};
Selectors.iSPPriloha = () => { return {data:new Readers.ISPPriloha(),[userSettings]:usRoot+"iSPPriloha",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["popis"]},[gridFormat]:newGridFormat().addTextColumn({name: "popis", caption: "jres:30450034", width: 100, forced: true})};};

// GReaderMajsmajADA.fields.js
Readers.MajsmajADA = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajsmajADA",keys:["inv_cis"],[columns]:["inv_cis","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.MajsmajADA.inheritsFrom(ReadersBase);
Fields.majsmajADA = (prefabOptions) => { return {data:new Readers.MajsmajADA(),[itemTemplate]:"{inv_cis} - {nazev}",[helperColumns]:["inv_cis", "nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majsmajADA(),prefabOptions,options)).show()};};
Selectors.majsmajADA = () => { return {data:new Readers.MajsmajADA(),[userSettings]:usRoot+"majsmajADA",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["inv_cis", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "inv_cis", caption: "jres:30450029", width: 100, forced: true}).addTextColumn({name: "nazev", caption: "jres:30450030", width: 200})};};

// GReaderMatskcmADA.fields.js
Readers.MatskcmADA = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMatskcmADA",keys:["idk"],[columns]:["idk","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.MatskcmADA.inheritsFrom(ReadersBase);
Fields.matskcmADA = (prefabOptions) => { return {data:new Readers.MatskcmADA(),[itemTemplate]:"{idk} - {nazev}",[helperColumns]:["idk", "nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.matskcmADA(),prefabOptions,options)).show()};};
Selectors.matskcmADA = () => { return {data:new Readers.MatskcmADA(),[doNotSearch]:true,[filterPanelOpts]:{
        forms: [
            new Gordic.Forms.Form({ tabLabel: "Kompletní filtr" })
                .addSection()
                .addRow("IDK").addField("gstringbox", Gordic.Prefabs.String.withOperators(), {
                    name: "idk", model: "model.idk = value",
                                                                                                                                                                                                                                                                                                                                })
                .addRow("Název").addField("gstringbox", Gordic.Prefabs.String.withOperators(), {
                    name: "nazev", model: "model.nazev = value",
                                                                                                                                                                                                                                                                                                                                                                                                            })
        ],
        favorites: ["idk", "nazev"],
        favoriteLayoutDescriptor: "L4M3S1",
        filterStorageService: null,
        filterItemTemplate: "{name}",
        filterPanelOpts: {
            clearFilterButtonVisible: "AlwaysVisible"
        },
        textItemTemplate: "{description}"
    },[userSettings]:usRoot+"matskcmADA",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["idk", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "idk", caption: "jres:30450031", width: 100, forced: true}).addTextColumn({name: "nazev", caption: "jres:30450032", width: 200})};};

// GReaderSpisADA.fields.js
Readers.SpisADA = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSpisADA",keys:["ixp"],[columns]:["ixp", "akt_znacka", "Vlastnictvi", "umisteni"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SpisADA.inheritsFrom(ReadersBase);
Fields.spisADA = (prefabOptions) => { return {data:new Readers.SpisADA(),[itemTemplate]:"{akt_znacka}",[helperColumns]:["akt_znacka"],[selector]:(options) => newDefaultSelector($.extend(Selectors.spisADA(),prefabOptions,options)).show()};};
Selectors.spisADA = () => { return {data:new Readers.SpisADA(),[gridOpts]:{
		columnMode: "full",
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "ixp", caption: "jres:30450047", width: 140, forced: true })
		.addTextColumn({ name: "akt_znacka", caption: "jres:30450048", width: 180 })
		.addTextColumn({ name: "poznamka", caption: "jres:30450053", width: 140 })
		.addTextColumn({ name: "Vlastnictvi", caption: "jres:30450051", width: 300 })
		.addTextColumn({ name: "umisteni", caption: "jres:30450055", width: 40 })
		.addTextColumn({ name: "nazev", caption: "jres:30450056", width: 300 }),[doNotSearch]:false,[filterPanelOpts]:{
        forms: [
            new Gordic.Forms.Form({ tabLabel: "Kompletní filtr" })
                .addSection()
                .addRow("PID dokumentu").addField("gstringbox", Gordic.Prefabs.String.withOperators(), { name: "ixp_top", model: "model.ixp_top = value" })
                .addRow("Značka dokumentu").addField("gstringbox", Gordic.Prefabs.String.withOperators(), { name: "ixs_ext", model: "model.ixs_ext = value" })
                .addRow("Věc dokumentu").addField("gstringbox", Gordic.Prefabs.String.withOperators(), { name: "ixs_spu", model: "model.ixs_spu = value" })
                .addRow("Vlastník dokumentu").addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), { name: "ixs_fun_wfl", model: "model.ixs_fun_wfl = value.ixs_fun" })
        ],
        favorites: ["ixp_top", "ixs_ext", "ixs_spu","ixs_fun_wfl"],
        favoriteLayoutDescriptor: "L4M3S1",
        filterStorageService: null,
        filterItemTemplate: "{name}",
        filterPanelOpts: {
            clearFilterButtonVisible: "AlwaysVisible"
        },
        textItemTemplate: "{description}"
    },[userSettings]:usRoot+"spisADA",[isolatedUserSettings]:true};};

// GReaderSrvcsaz.fields.js
Readers.Srvcsaz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvcsaz",keys:["stav_az"],[columns]:["stav_az","stav_az_txt"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Srvcsaz.inheritsFrom(ReadersBase);
Fields.srvcsaz = (prefabOptions) => { return {data:new Readers.Srvcsaz(),[itemTemplate]:"{stav_az_txt}",[helperColumns]:["stav_az_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.srvcsaz(),prefabOptions,options)).show()};};
Selectors.srvcsaz = () => { return {data:new Readers.Srvcsaz(),[userSettings]:usRoot+"srvcsaz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stav_az_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "stav_az_txt", caption: "jres:30450046", width: 100, forced: true})};};

// GReaderSrvcsre.fields.js
Readers.Srvcsre = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvcsre",keys:["stav_real"],[columns]:["stav_real","stav_real_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Srvcsre.inheritsFrom(ReadersBase);
Fields.srvcsre = (prefabOptions) => { return {data:new Readers.Srvcsre(),[itemTemplate]:"{stav_real_txt}",[helperColumns]:["stav_real_txt"]};};

// GReaderSrvcstz.fields.js
Readers.GSrvcstz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGSrvcstz",keys:["stav_rozpis"],[columns]:["stav_rozpis","stav_rozpis_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GSrvcstz.inheritsFrom(ReadersBase);
Fields.gSrvcstz = (prefabOptions) => { return {data:new Readers.GSrvcstz(),[itemTemplate]:"{stav_rozpis_txt}",[helperColumns]:["stav_rozpis_txt"]};};

// GReaderSrvctas.fields.js
Readers.Srvctas = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvctas",keys:["typ_akce_sum"],[columns]:["typ_akce_sum","typ_akce_sum_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Srvctas.inheritsFrom(ReadersBase);
Fields.srvctas = (prefabOptions) => { return {data:new Readers.Srvctas(),[itemTemplate]:"{typ_akce_sum_txt}",[helperColumns]:["typ_akce_sum_txt"]};};

// GReaderSrvctva.fields.js
Readers.Srvctva = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvctva",keys:["typ_vzb"],[columns]:["typ_vzb", "typ_vzb_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Srvctva.inheritsFrom(ReadersBase);
Fields.srvctva = (prefabOptions) => { return {data:new Readers.Srvctva(),[itemTemplate]:"{typ_vzb_txt}",[helperColumns]:["typ_vzb_txt"]};};

// GReaderSrvscia.fields.js
Readers.Srvscia = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvscia",keys:["cislo"],[columns]:["cislo","nazev","rok","ico","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Srvscia.inheritsFrom(ReadersBase);
Fields.srvscia = (prefabOptions) => { return {data:new Readers.Srvscia(),[itemTemplate]:"{cislo}",[helperColumns]:["cislo" ],[selector]:(options) => newDefaultSelector($.extend(Selectors.srvscia(),prefabOptions,options)).show()};};
Selectors.srvscia = () => { return {data:new Readers.Srvscia(),[userSettings]:usRoot+"srvscia",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["cislo" ]},[gridFormat]:newGridFormat().addTextColumn({name: "cislo", caption: "jres:30450040", width: 120, forced: true}).addTextColumn({name: "nazev", caption: "jres:30450012", width: 400}).addTextColumn({name: "typ_akce_sum_txt", caption: "jres:30450041", width: 100})};};

// GReaderSrvsdde.fields.js
Readers.Srvsdde = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvsdde",keys:["subrada"],[columns]:["rok","ico","ixs_pla","subrada","nazev","maska","cislo_od","cislo_do"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Srvsdde.inheritsFrom(ReadersBase);
Fields.srvsdde = (prefabOptions) => { return {data:new Readers.Srvsdde(),[itemTemplate]:"{subrada}-{nazev}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.srvsdde(),prefabOptions,options)).show()};};
Selectors.srvsdde = () => { return {data:new Readers.Srvsdde(),[userSettings]:usRoot+"srvsdde",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addNumberColumn({name: "subrada", caption: "jres:30450024", width: 10, forced: true}).addTextColumn({name: "nazev", caption: "jres:30450025", width: 80}).addTextColumn({name: "maska", caption: "jres:30450026", width: 40}).addTextColumn({name: "cislo_od", caption: "jres:30450027", width: 40}).addTextColumn({name: "cislo_do", caption: "jres:30450028", width: 40})};};

// GReaderSrvsobl.fields.js
Readers.Srvsobl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvsobl",keys:["id_tzd","id_vyb","id_eds"],[columns]:["id_tzd", "nazev_tzd", "id_vyb", "nazev_vyb", "id_eds", "nazev_vyb"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Srvsobl.inheritsFrom(ReadersBase);
Fields.srvsobl = (prefabOptions) => { return {data:new Readers.Srvsobl(),[graphicInput]:"oninput",[verticalButtons]:true,[itemTemplate]:function (row) {
		var text = ("Typ zdroje: {0} - {1} <br><br>Výdajový blok: {2} - {3}<br><br>Projekt EDS: {4} - {5}")
			.format(
				row.id_tzd,
				row.nazev_tzd,
				row.id_vyb,
				row.nazev_vyb,
				row.id_eds,
				row.nazev_eds
														);
		return text;
	},[helperColumns]:["id_tzd", "id_vyb", "id_eds"],[selector]:(options) => newDefaultSelector($.extend(Selectors.srvsobl(),prefabOptions,options)).show()};};
Selectors.srvsobl = () => { return {data:new Readers.Srvsobl(),[userSettings]:usRoot+"srvsobl",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["id_tzd", "id_vyb", "id_eds"]},[gridFormat]:newGridFormat().addTextColumn({name: "id_tzd", caption: "jres:30450018", width: 20, forced: true}).addTextColumn({name: "id_vyb", caption: "jres:30450058", width: 20}).addTextColumn({name: "id_eds", caption: "jres:30450059", width: 20}).addTextColumn({name: "nazev_tzd", caption: "jres:30450062", width: 20}).addTextColumn({name: "nazev_vyb", caption: "jres:30450063", width: 20}).addTextColumn({name: "nazev_eds", caption: "jres:30450061", width: 20})};};

// GReaderSrvspla.fields.js
Readers.Srvspla = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvspla",keys:["ixs_pla"],[columns]:["ixs_pla","nazev","rok","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Srvspla.inheritsFrom(ReadersBase);
Fields.srvspla = (prefabOptions) => { return {data:new Readers.Srvspla({ readerParams: {} }),[dropdown]:true,[itemTemplate]:"{nazev} - {rok}",[helperColumns]:["ixs_pla", "nazev", "rok"],[selector]:(options) => newDefaultSelector($.extend(Selectors.srvspla(),prefabOptions,options)).show()};};
Selectors.srvspla = () => { return {data:new Readers.Srvspla(),[userSettings]:usRoot+"srvspla",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixs_pla", "nazev", "rok"]},[gridFormat]:newGridFormat().add({name: "nazev", caption: "jres:30450012", width: 400, forced: true}).add({name: "rok", caption: "jres:30450013", width: 100})};};

// GReaderSrvsprr.fields.js
Readers.Srvsprr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvsprr",keys:["ixs_prr"],[columns]:["ixs_prr","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Srvsprr.inheritsFrom(ReadersBase);
Fields.srvsprr = (prefabOptions) => { return {data:new Readers.Srvsprr(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderSrvspsk.fields.js
Readers.Srvspsk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvspsk",keys:["ixs_csp","skp_akc","psk_akc"],[columns]:["ixs_csp","skp_akc","psk_akc","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Srvspsk.inheritsFrom(ReadersBase);
Fields.srvspsk = (prefabOptions) => { return {data:new Readers.Srvspsk(),[dropdown]:true,[itemTemplate]:"{psk_akc} - {nazev}",[helperColumns]:["psk_akc", "nazev"]};};

// GReaderSrvspsp.fields.js
Readers.Srvspsp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvspsp",keys:["id_psp"],[columns]:["id_psp","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Srvspsp.inheritsFrom(ReadersBase);
Fields.srvspsp = (prefabOptions) => { return {data:new Readers.Srvspsp(),[itemTemplate]:"{id_psp} - {nazev}",[helperColumns]:["id_psp", "nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.srvspsp(),prefabOptions,options)).show()};};
Selectors.srvspsp = () => { return {data:new Readers.Srvspsp(),[userSettings]:usRoot+"srvspsp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["id_psp", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "id_psp", caption: "jres:30450019", width: 20, forced: true}).addTextColumn({name: "nazev", caption: "jres:30450015", width: 80})};};

// GReaderSrvsskp.fields.js
Readers.Srvsskp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvsskp",keys:["ixs_csp","skp_akc"],[columns]:["ixs_csp", "skp_akc", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Srvsskp.inheritsFrom(ReadersBase);
Fields.srvsskp = (prefabOptions) => { return {data:new Readers.Srvsskp(),[dropdown]:true,[itemTemplate]:"{skp_akc} - {nazev}",[helperColumns]:["skp_akc", "nazev"]};};

// GReaderSrvstip.fields.js
Readers.Srvstip = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvstip",keys:["ixs_tip"],[columns]:["ixs_tip", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Srvstip.inheritsFrom(ReadersBase);
Fields.srvstip = (prefabOptions) => { return {data:new Readers.Srvstip(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderSrvstipADA.fields.js
Readers.SrvstipADA = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvstipADA",keys:["ixs_tip"],[columns]:["ixs_tip", "nazev", "priz_pov"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SrvstipADA.inheritsFrom(ReadersBase);
Fields.srvstipADA = (prefabOptions) => { return {data:new Readers.SrvstipADA(),[itemTemplate]:"{nazev}",[helperItemTemplate]:function (row) {
		var moreInfo = ""
		if (row.priz_pov == 0) {
			moreInfo = row.nazev;
		}
		else {
			moreInfo = "<i class='fa fa-star'></i> " + row.nazev;
        }

		return moreInfo;
	},[helperColumns]:["nazev"]};};

// GReaderSrvstipADAAll.fields.js
Readers.SrvstipADAAll = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvstipADAAll",keys:["ixs_tip"],[columns]:["ixs_tip","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SrvstipADAAll.inheritsFrom(ReadersBase);
Fields.srvstipADAAll = (prefabOptions) => { return {data:new Readers.SrvstipADAAll(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderSrvstri.fields.js
Readers.Srvstri = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvstri",keys:["ixs_tri"],[columns]:["ixs_tri","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Srvstri.inheritsFrom(ReadersBase);
Fields.srvstri = (prefabOptions) => { return {data:new Readers.Srvstri(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderSrvstzd.fields.js
Readers.Srvstzd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvstzd",keys:["id_tzd"],[columns]:["id_tzd", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Srvstzd.inheritsFrom(ReadersBase);
Fields.srvstzd = (prefabOptions) => { return {data:new Readers.Srvstzd(),[itemTemplate]:"{id_tzd} - {nazev}",[helperColumns]:["id_tzd", "nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.srvstzd(),prefabOptions,options)).show()};};
Selectors.srvstzd = () => { return {data:new Readers.Srvstzd(),[userSettings]:usRoot+"srvstzd",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["id_tzd", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "id_tzd", caption: "jres:30450018", width: 20, forced: true}).addTextColumn({name: "nazev", caption: "jres:30450014", width: 80})};};

// GReaderSrvsvyb.fields.js
Readers.Srvsvyb = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvsvyb",keys:["id_vyb"],[columns]:["id_vyb","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Srvsvyb.inheritsFrom(ReadersBase);
Fields.srvsvyb = (prefabOptions) => { return {data:new Readers.Srvsvyb(),[itemTemplate]:"{id_vyb} - {nazev}",[helperColumns]:["id_vyb", "nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.srvsvyb(),prefabOptions,options)).show()};};
Selectors.srvsvyb = () => { return {data:new Readers.Srvsvyb(),[userSettings]:usRoot+"srvsvyb",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["id_vyb", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "id_vyb", caption: "jres:30450060", width: 20, forced: true}).addTextColumn({name: "nazev", caption: "jres:30450014", width: 80})};};

// GReaderSrvsxpf.fields.js
Readers.Srvsxpf = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvsxpf",keys:["xpf_pf"],[columns]:["xpf_pf","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Srvsxpf.inheritsFrom(ReadersBase);
Fields.srvsxpf = (prefabOptions) => { return {data:new Readers.Srvsxpf(),[itemTemplate]:"{xpf_pf} - {nazev}",[helperColumns]:["xpf_pf", "nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.srvsxpf(),prefabOptions,options)).show()};};
Selectors.srvsxpf = () => { return {data:new Readers.Srvsxpf(),[userSettings]:usRoot+"srvsxpf",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["xpf_pf", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "xpf_pf", caption: "jres:30450017", width: 20, forced: true}).addTextColumn({name: "nazev", caption: "jres:30450016", width: 80})};};

// GReaderSrvvprrADA.fields.js
Readers.SrvvprrADA = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvvprrADA",keys:["ixs_tip","ixs_prr"],[columns]:["ixs_tip", "nazev", "priz_pov"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SrvvprrADA.inheritsFrom(ReadersBase);
Fields.srvvprrADA = (prefabOptions) => { return {data:new Readers.SrvvprrADA(),[itemTemplate]:"{nazev}",[helperItemTemplate]:function (row) {
		var moreInfo = ""
		if (row.priz_pov == 0) {
			moreInfo = row.nazev;
		}
		else {
			moreInfo = "<i class='fa fa-star'></i> " + row.nazev;
		}

		return moreInfo;
	},[helperColumns]:["nazev"]};};

// GReaderSrvvtipADA.fields.js
Readers.SrvvtipADA = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvvtipADA",keys:["ixs_tip","ixs_pla"],[columns]:["ixs_tip", "nazev", "priz_pov"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SrvvtipADA.inheritsFrom(ReadersBase);
Fields.srvvtipADA = (prefabOptions) => { return {data:new Readers.SrvvtipADA(),[itemTemplate]:"{nazev}",[helperItemTemplate]:function (row) {
		var moreInfo = ""
		if (row.priz_pov == 0) {
			moreInfo = row.nazev;
		}
		else {
			moreInfo = "<i class='fa fa-star'></i> " + row.nazev;
		}

		return moreInfo;
	},[helperColumns]:["nazev"]};};

// GReaderVepcstp.fields.js
Readers.Vepcstp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderVepcstp",keys:["vp_stav"],[columns]:["vp_stav","vp_stav_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Vepcstp.inheritsFrom(ReadersBase);
Fields.vepcstp = (prefabOptions) => { return {data:new Readers.Vepcstp(),[itemTemplate]:"{vp_stav_txt}",[helperColumns]:["vp_stav_txt"]};};

// GReaderZadavatel.fields.js
Readers.Zadavetel = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderZadavetel",keys:["ico","ixs_fun"],[columns]:["nazev", "nazev_rf", "nazev_su", "nazev_orj"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Zadavetel.inheritsFrom(ReadersBase);
Fields.zadavetel = (prefabOptions) => { return {data:new Readers.Zadavetel(),[itemTemplate]:function (row) {
        return ("{0}").format(row.nazev_rf);
    },[graphicInput]:"oninput",[itemTooltipTemplate]:function (row) {
        return ("{0}").format(row.nazev_rf);
    },[verticalButtons]:true,[helperColumns]:["nazev_ref", "nazev", "nazev_su", "nazev_orj"],[states]:[{
        icon: "gi-user",
        align: "opposite",
        customClass: "g-inactive-prefabState"
    }],[selector]:(options) => newDefaultSelector($.extend(Selectors.zadavetel(),prefabOptions,options)).show()};};
Fields.zadavetelMini = (prefabOptions) => { return {data:new Readers.Zadavetel(),[itemTemplate]:"{nazev_ref:trim:encode}",[itemTooltipTemplate]:"{nazev_ref:trim:encode}",[graphicInput]:"oninput",[verticalButtons]:true,[helperColumns]:["nazev_ref"],[states]:[{
        icon: "gi-user",
        align: "opposite",
        customClass: "g-inactive-prefabState"
    }],[selector]:(options) => newDefaultSelector($.extend(Selectors.zadavetel(),prefabOptions,options)).show()};};
Selectors.zadavetel = () => { return {data:new Readers.Zadavetel(),[userSettings]:usRoot+"zadavetel",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev_ref", "nazev", "nazev_su", "nazev_orj"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev_rf", caption: "jres:30450022", width: 260, forced: true}).addTextColumn({name: "nazev_ref", caption: "jres:30450023", width: 120})};};

})(jQuery);

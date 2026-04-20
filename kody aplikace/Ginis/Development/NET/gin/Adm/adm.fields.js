"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Adm.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const dropdown = "dropdown"; const graphicInput = "graphicInput"; const selector = "selector"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const columnMode = "columnMode"; const cached = "cached"; const helperItemTemplate = "helperItemTemplate"; const verticalButtons = "verticalButtons"; const states = "states"; const processOnStart = "processOnStart"; const itemTooltipTemplate = "itemTooltipTemplate"; const change = "change"; const chekSettings = "chekSettings"; const doNotSearch = "doNotSearch";

// GReaderAdeDdpstpp.fields.js
Readers.AdeDdpstpp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeDdpstpp",keys:["typ_phl"],[columns]:["typ_phl","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeDdpstpp.inheritsFrom(ReadersBase);
Fields.adeDdpstpp = (prefabOptions) => { return {data:new Readers.AdeDdpstpp(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"]};};

// GReaderAdeEkocpov.fields.js
Readers.AdeEkocpov = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeEkocpov",keys:["priz_osv"],[columns]:["priz_osv","priz_osv_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdeEkocpov.inheritsFrom(ReadersBase);
Fields.adeEkocpov = (prefabOptions) => { return {data:new Readers.AdeEkocpov(),[itemTemplate]:"{priz_osv_txt}",[helperColumns]:["priz_osv_txt"]};};

// GReaderAdeEkocprk.fields.js
Readers.AdeEkocprk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeEkocprk",keys:["priz_kom"],[columns]:["priz_kom","priz_kom_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdeEkocprk.inheritsFrom(ReadersBase);
Fields.adeEkocprk = (prefabOptions) => { return {data:new Readers.AdeEkocprk(),[itemTemplate]:"{priz_kom_txt}",[helperColumns]:["priz_kom_txt"]};};

// GReaderAdeEkocrpr.fields.js
Readers.AdeEkocrpr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeEkocrpr",keys:["priz_rpr"],[columns]:["priz_rpr","priz_rpr_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeEkocrpr.inheritsFrom(ReadersBase);
Fields.adeEkocrpr = (prefabOptions) => { return {data:new Readers.AdeEkocrpr(),[itemTemplate]:"{priz_rpr_txt}",[helperColumns]:["priz_rpr_txt"]};};

// GReaderAdeEkoctel.fields.js
Readers.AdeEkoctel = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeEkoctel",keys:["typ_elem"],[columns]:["typ_elem","typ_elem_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdeEkoctel.inheritsFrom(ReadersBase);
Fields.adeEkoctel = (prefabOptions) => { return {data:new Readers.AdeEkoctel(),[itemTemplate]:"{typ_elem_txt}",[helperColumns]:["typ_elem_txt"]};};

// GReaderAdeEkoctyg.fields.js
Readers.AdeEkoctyg = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeEkoctyg",keys:["typ_ose"],[columns]:["typ_ose","typ_ose_txt","k_v","k_s","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeEkoctyg.inheritsFrom(ReadersBase);
Fields.adeEkoctyg = (prefabOptions) => { return {data:new Readers.AdeEkoctyg(),[itemTemplate]:"{typ_ose_txt:trim:encode}",[helperColumns]:["typ_ose_txt"]};};

// GReaderAdeEkoctyo.fields.js
Readers.AdeEkoctyo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeEkoctyo",keys:["typ_ose"],[columns]:["typ_ose","typ_ose_txt","k_v","k_s","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeEkoctyo.inheritsFrom(ReadersBase);
Fields.adeEkoctyo = (prefabOptions) => { return {data:new Readers.AdeEkoctyo(),[itemTemplate]:"{typ_ose_txt}",[helperColumns]:["typ_ose_txt"]};};

// GReaderAdeEkoKniha.fields.js
Readers.AdeEkoKniha = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeEkoKniha",keys:["ixp_den"],[columns]:["ixp_den","ico","nazev","rok","aktivita","agenda","stav_txt", "ucs"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeEkoKniha.inheritsFrom(ReadersBase);
Fields.adeEkoKniha = (prefabOptions) => { return {data:new Readers.AdeEkoKniha(),[itemTemplate]:"<b>{nazev} ({agenda})</b><br><i>jres:23920034: {rok} | jres:33000014: {stav_txt} | jres:23920027: {ico}</i>",[helperColumns]:["nazev"],[dropdown]:false,[graphicInput]:"oninput",[selector]:(options) => newDefaultSelector($.extend(Selectors.adeEkoKniha(),prefabOptions,options)).show()};};
Selectors.adeEkoKniha = () => { return {data:new Readers.AdeEkoKniha(),[userSettings]:usRoot+"adeEkoKniha",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "agenda", caption: "jres:33000016", width: 30, forced: true}).addNumberColumn({name: "rok", caption: "jres:23920034", width: 40}).addTextColumn({name: "nazev", caption: "jres:33000015", width: 150}).addTextColumn({name: "stav_txt", caption: "jres:33000014", width: 70}).addTextColumn({name: "ucs", caption: "jres:23920042", width: 70}).addTextColumn({name: "ixp_den", caption: "jres:23920021", width: 50}).addTextColumn({name: "ico", caption: "jres:23920039", width: 30})};};

// GReaderAdeEkoskto.fields.js
Readers.AdeEkoskto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeEkoskto",keys:["ixs_kto"],[columns]:["ixs_kto", "nazev", "zkratka", "poznamka", "aktivita", "dat_zmena", "zmenu_prov", "max_typ_ose","max_typ_ose_txt","rokmes_od","rokmes_do"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeEkoskto.inheritsFrom(ReadersBase);
Fields.adeEkoskto = (prefabOptions) => { return {data:new Readers.AdeEkoskto(),[itemTemplate]:"<b>{nazev:trim:encode}</b> | {max_typ_ose_txt:trim:encode}",[helperColumns]:["nazev"],[graphicInput]:"oninput"};};

// GReaderAdeEkosnks.fields.js
Readers.AdeEkosnks = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeEkosnks",keys:["ico","nks"],[columns]:["ico","nks","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeEkosnks.inheritsFrom(ReadersBase);
Fields.adeEkosnks = (prefabOptions) => { return {data:new Readers.AdeEkosnks(),[itemTemplate]:"{nks} - {nazev}",[helperColumns]:["nks", "nazev"]};};

// GReaderAdeEkosose.fields.js
Readers.adeEkosose = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeEkosose",keys:["ixs_ose"],[columns]:["ixs_ose", "ixs_kto_txt", "nazev", "poznamka", "dat_od", "dat_do"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.adeEkosose.inheritsFrom(ReadersBase);
Fields.adeEkosose = (prefabOptions) => { return {data:new Readers.adeEkosose(),[itemTemplate]:(row) => {
		let result = "";
		result += "<b>{0}</b> | jres:29925969: {1}".format(row.nazev, (row.ixs_kto_txt ? row.ixs_kto_txt : "<i>jres:33000008</i>"));
		return result;
	},[helperColumns]:["nazev", "ixs_kto_txt", "poznamka", "ixs_ose"],[graphicInput]:"oninput",[dropdown]:false,[selector]:(options) => newDefaultSelector($.extend(Selectors.adeEkosose(),prefabOptions,options)).show()};};
Selectors.adeEkosose = () => { return {data:new Readers.adeEkosose(),[userSettings]:"defaultSelectors.ekosose",[isolatedUserSettings]:true,[gridOpts]:{
		searchColumns: ["nazev", "ixs_kto_txt", "poznamka", "ixs_ose"],
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({
			name: "nazev",
			caption: "jres:23920018"
		})
		.addTextColumn({
			name: "poznamka",
			caption: "jres:29929908"
		})
		.addTextColumn({
			name: "typ_ose_txt",
			caption: "jres:33000003"
		})
		.addTextColumn({
			name: "zkratka",
			caption: "jres:23920019"
		})
		.addTextColumn({
			name: "rokmes_od",
			caption: "jres:33000004",
			cellTemplate: (row) => {
				if (row.rokmes_od) {
					return `${row.rokmes_od.slice(0, 4)} / ${row.rokmes_od.slice(4, 6)}`
				} else
					return "";
			}
		})
		.addTextColumn({
			name: "rokmes_do",
			caption: "jres:33000005",
			cellTemplate: (row) => {
				if (row.rokmes_do) {
					return `${row.rokmes_do.slice(0, 4)} / ${row.rokmes_do.slice(4, 6)}`
				} else
					return "";
			}
		})
		.addTextColumn({
			name: "ixs_kto_txt",
			caption: "jres:29925969"
		})};};

// GReaderAdeSrvcrre.fields.js
Readers.AdeSrvcrre = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeSrvcrre",keys:["rezim_real"],[columns]:["rezim_real","rezim_real_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdeSrvcrre.inheritsFrom(ReadersBase);
Fields.adeSrvcrre = (prefabOptions) => { return {data:new Readers.AdeSrvcrre(),[itemTemplate]:"{rezim_real_txt}",[helperColumns]:["rezim_real_txt"]};};

// GReaderAdeSrvctsp.fields.js
Readers.AdeSrvctsp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeSrvctsp",keys:["typ_spec"],[columns]:["typ_spec","typ_spec_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeSrvctsp.inheritsFrom(ReadersBase);
Fields.adeSrvctsp = (prefabOptions) => { return {data:new Readers.AdeSrvctsp(),[itemTemplate]:"{typ_spec_txt}",[helperColumns]:["typ_spec_txt"]};};

// GReaderAdeSrvczdd.fields.js
Readers.AdeSrvczdd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeSrvczdd",keys:["zdroj_dok"],[columns]:["zdroj_dok","zdroj_dok_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdeSrvczdd.inheritsFrom(ReadersBase);
Fields.adeSrvczdd = (prefabOptions) => { return {data:new Readers.AdeSrvczdd(),[itemTemplate]:"{zdroj_dok_txt}",[helperColumns]:["zdroj_dok_txt"]};};

// GReaderAdeSrvczps.fields.js
Readers.AdeSrvczps = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeSrvczps",keys:["zpusob_schv"],[columns]:["zpusob_schv","zpusob_schv_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdeSrvczps.inheritsFrom(ReadersBase);
Fields.adeSrvczps = (prefabOptions) => { return {data:new Readers.AdeSrvczps(),[itemTemplate]:"{zpusob_schv_txt}",[helperColumns]:["zpusob_schv_txt"]};};

// GReaderAdeSrvsobl.fields.js
Readers.AdeSrvsobl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeSrvsobl",keys:["ico","rok","id_tzd","id_vyb","id_eds"],[columns]:["ico","rok","id_tzd","id_vyb","id_eds","id_tzd_txt","id_vyb_txt","id_eds_txt","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeSrvsobl.inheritsFrom(ReadersBase);
Fields.adeSrvsobl = (prefabOptions) => { return {data:new Readers.AdeSrvsobl(),[itemTemplate]:"jres:33000031: <b>{id_tzd_txt}</b> | jres:33000032: <b>{id_vyb_txt}</b> | jres:33000033: <b>{id_eds_txt}</b> <br /> jres:23920039: <b>{ico}</b> | jres:23920034: <b>{rok}</b>",[helperColumns]:["id_tzd_txt", "id_vyb_txt", "id_eds_txt", "rok", "ico"],[graphicInput]:"oninput",[dropdown]:true};};

// GReaderAdeSrvstzd.fields.js
Readers.AdeSrvstzd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeSrvstzd",keys:["id_tzd"],[columns]:["id_tzd","nazev","zkratka","poznamka","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeSrvstzd.inheritsFrom(ReadersBase);
Fields.adeSrvstzd = (prefabOptions) => { return {data:new Readers.AdeSrvstzd(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"],[dropdown]:false,[selector]:(options) => newDefaultSelector($.extend(Selectors.adeSrvstzd(),prefabOptions,options)).show()};};
Selectors.adeSrvstzd = () => { return {data:new Readers.AdeSrvstzd(),[userSettings]:"defaultSelectors.adeSrvstzd",[isolatedUserSettings]:true,[gridOpts]:{
		searchColumns: ["nazev", "zkratka", "poznamka"],
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addIconColumn({
			name: "aktivita",
			caption: "jres:29924152",
			iconTemplate: (row) => {
				return Gordic.Prefabs.Utils.createAktivitaIconTemplate(row.aktivita);
			}
		}).addTextColumn({
			name: "nazev",
			caption: "jres:23920018"
		}).addTextColumn({
			name: "zkratka",
			caption: "jres:23920019"
		})};};

// GReaderAdeSrvsvyb.fields.js
Readers.AdeSrvsvyb = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeSrvsvyb",keys:["ico","id_vyb"],[columns]:["ico","id_vyb","kod","nazev","rok_od","rok_do","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeSrvsvyb.inheritsFrom(ReadersBase);
Fields.adeSrvsvyb = (prefabOptions) => { return {data:new Readers.AdeSrvsvyb(),[itemTemplate]:"<b>{nazev}</b> ({kod})<br /><i>jres:23920027: {ico}</i>|<i>jres:23920021: {id_vyb}</i>|<i>jres:33000030: {rok_od} - {rok_do}</i>",[helperColumns]:["nazev", "kod", "id_vyb", "kod"],[graphicInput]:"oninput",[dropdown]:false,[selector]:(options) => newDefaultSelector($.extend(Selectors.adeSrsvyb(),prefabOptions,options)).show()};};
Selectors.adeSrsvyb = () => { return {data:new Readers.AdeSrvsvyb(),[userSettings]:"defaultSelectors.adeSrvsvyb",[isolatedUserSettings]:true,[gridOpts]:{
		searchColumns: ["nazev", "kod", "id_vyb", "kod"],
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addIconColumn({
			name: "aktivita",
			caption: "jres:29924152",
			iconTemplate: (row) => {
				return Gordic.Prefabs.Utils.createAktivitaIconTemplate(row.aktivita);
			}
		}).addTextColumn({
			name: "nazev",
			caption: "jres:23920018"
		}).addTextColumn({
			name: "kod",
			caption: "jres:33000027" 		}).addTextColumn({
			name: "id_vyb",
			caption: "jres:23920021"
		}).addNumberColumn({
			name: "rok_od",
			caption: "jres:33000028" 		}).addNumberColumn({
			name: "rok_do",
			caption: "jres:33000029" 		}).addTextColumn({
			name: "ico",
			caption: "jres:23920027"
		})};};

// GReaderAdeSrvsxpf.fields.js
Readers.AdeSrvsxpf = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeSrvsxpf",keys:["xpf_pf","uroven"],[columns]:["xpf_pf","uroven","nazev","rok_od","rok_do","aktivita","priz_eds"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeSrvsxpf.inheritsFrom(ReadersBase);
Fields.adeSrvsxpf = (prefabOptions) => { return {data:new Readers.AdeSrvsxpf(),[itemTemplate]:"<b>{nazev}</b> ({xpf_pf})<br /><i>jres:23920027: {ico}</i>|<i>jres:33000030: {rok_od} - {rok_do}</i>",[helperColumns]:["nazev"],[graphicInput]:"oninput",[dropdown]:false,[selector]:(options) => newDefaultSelector($.extend(Selectors.adeSrvsxpf(),prefabOptions,options)).show()};};
Selectors.adeSrvsxpf = () => { return {data:new Readers.AdeSrvsxpf(),[userSettings]:"defaultSelectors.adeSrvsxpf",[isolatedUserSettings]:true,[columnMode]:"full",[gridOpts]:{
		searchColumns: ["xpf_pf", "nazev"],
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addIconColumn({
			name: "aktivita",
			caption: "jres:29924152",
			iconTemplate: (row) => {
				return Gordic.Prefabs.Utils.createAktivitaIconTemplate(row.aktivita);
			}
		}).addTextColumn({
			name: "xpf_pf",
			caption: "jres:33000027",
		}).addTextColumn({
			name: "nazev",
			caption: "jres:23920018",
			width: 400
		}).addNumberColumn({
			name: "rok_od",
			caption: "jres:33000028" 		}).addNumberColumn({
			name: "rok_do",
			caption: "jres:33000029" 		}).addTextColumn({
			name: "ico",
			caption: "jres:23920027"
		})};};

// GReaderAdeUctdrozOrj.fields.js
Readers.AdeUctdrozOrj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeUctdrozOrj",keys:["te0"],[columns]:["te0", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeUctdrozOrj.inheritsFrom(ReadersBase);
Fields.adeUctdrozOrj = (prefabOptions) => { return {data:new Readers.AdeUctdrozOrj(),[itemTemplate]:"{te0} {nazev}",[helperColumns]:["te0", "nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.adeUctdrozOrj(),prefabOptions,options)).show()};};
Selectors.adeUctdrozOrj = () => { return {data:new Readers.AdeUctdrozOrj(),[userSettings]:usRoot+"adeUctdrozOrj",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["te0", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "te0", caption: "jres:33000006", width: 150, forced: true}).addTextColumn({name: "nazev", caption: "jres:33000007", width: 250})};};

// GReaderAdmEkocpii.fields.js
Readers.AdmEkocpii = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmEkocpii",keys:["priz_iissp"],[columns]:["priz_iissp","priz_iissp_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmEkocpii.inheritsFrom(ReadersBase);
Fields.admEkocpii = (prefabOptions) => { return {data:new Readers.AdmEkocpii(),[itemTemplate]:"{priz_iissp_txt}",[helperColumns]:["priz_iissp_txt", "priz_iissp"],[dropdown]:true};};

// GReaderAdmEkoctii.fields.js
Readers.AdmEkoctii = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmEkoctii",keys:["typ_kom_iissp"],[columns]:["typ_kom_iissp","typ_kom_iissp_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmEkoctii.inheritsFrom(ReadersBase);
Fields.admEkoctii = (prefabOptions) => { return {data:new Readers.AdmEkoctii(),[itemTemplate]:"{typ_kom_iissp_txt}",[helperColumns]:["typ_kom_iissp", "typ_kom_iissp_txt"],[dropdown]:true};};

// GReaderAdmEkosdro.fields.js
Readers.AdmEkosdro = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmEkosdro",keys:["id_druh"],[columns]:["id_druh","kod_druh","nazev","poznamka","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmEkosdro.inheritsFrom(ReadersBase);
Fields.admEkosdro = (prefabOptions) => { return {data:new Readers.AdmEkosdro(),[itemTemplate]:"<b>{kod_druh}</b> - {nazev}",[helperColumns]:["id_druh", "kod_druh", "nazev", "poznamka"],[dropdown]:true,[graphicInput]:"oninput"};};

// GReaderAdmEkospdo.fields.js
Readers.AdmEkospdo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmEkospdo",keys:["id_druh","id_poddruh"],[columns]:["id_druh","id_poddruh","kod_poddruh","nazev","poznamka","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmEkospdo.inheritsFrom(ReadersBase);
Fields.admEkospdo = (prefabOptions) => { return {data:new Readers.AdmEkospdo(),[itemTemplate]:"<b>{kod_poddruh}</b> - {nazev}",[helperColumns]:["id_druh", "id_poddruh", "kod_poddruh", "nazev", "poznamka"],[dropdown]:true,[graphicInput]:"oninput"};};

// GReaderAdmEkosuvl.fields.js
Readers.AdmEkosuvl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmEkosuvl",keys:["rok","bu_vl","sk_vl"],[columns]:["bu_txt","rok","bu_vl","sk_vl","ico","ucs"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmEkosuvl.inheritsFrom(ReadersBase);
Fields.admEkosuvl = (prefabOptions) => { return {data:new Readers.AdmEkosuvl(),[itemTemplate]:"<b>{bu_txt}</b><br /><i>jres:23920043: {rok} | jres:30011134: {ico}</i>",[helperColumns]:["bu_txt"],[graphicInput]:"oninput",[selector]:(options) => newDefaultSelector($.extend(Selectors.admEkosuvl(),prefabOptions,options)).show()};};
Selectors.admEkosuvl = () => { return {data:new Readers.AdmEkosuvl(),[userSettings]:usRoot+"admEkosuvl",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["bu_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "bu_txt", caption: "jres:33000017", width: 150, forced: true}).addNumberColumn({name: "rok", caption: "jres:23920043", width: 50}).addTextColumn({name: "ico", caption: "jres:30011134", width: 80}).addTextColumn({name: "ucs", caption: "jres:23920042", width: 80})};};

// GReaderEkocref.fields.js
Readers.Ekocref = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocref",keys:["rezim_fin"],[columns]:["rezim_fin","rezim_fin_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekocref.inheritsFrom(ReadersBase);
Fields.ekocref = (prefabOptions) => { return {data:new Readers.Ekocref(),[itemTemplate]:"{rezim_fin_txt}",[helperColumns]:["rezim_fin_txt"]};};

// GReaderGincprf.fields.js
Readers.Gincprf = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincprf",keys:["pri_fun"],[columns]:["pri_fun","pri_fun_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincprf.inheritsFrom(ReadersBase);
Fields.gincprf = (prefabOptions) => { return {data:new Readers.Gincprf(),[itemTemplate]:"{pri_fun_txt:trim:encode}",[helperColumns]:["pri_fun","pri_fun_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gincprf(),prefabOptions,options)).show()};};
Selectors.gincprf = () => { return {data:new Readers.Gincprf(),[userSettings]:usRoot+"gincprf",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["pri_fun","pri_fun_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "pri_fun", caption: "jres:29925173", width: 150, forced: true}).addTextColumn({name: "pri_fun_txt", caption: "jres:29925175", width: 300})};};

// GReaderGincpri.fields.js
Readers.Gincpri = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincpri",keys:["priorita_max"],[columns]:["priorita_max","priorita_max_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincpri.inheritsFrom(ReadersBase);
Fields.gincpri = (prefabOptions) => { return {data:new Readers.Gincpri(),[itemTemplate]:"{priorita_max_txt:trim:encode}",[helperColumns]:["priorita_max","priorita_max_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gincpri(),prefabOptions,options)).show()};};
Selectors.gincpri = () => { return {data:new Readers.Gincpri(),[userSettings]:usRoot+"gincpri",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priorita_max","priorita_max_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "priorita_max", caption: "jres:29925182", width: 150, forced: true}).addTextColumn({name: "priorita_max_txt", caption: "jres:29925184", width: 300})};};

// GReaderGincstf.fields.js
Readers.Gincstf = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincstf",keys:["status_fun"],[columns]:["status_fun","status_fun_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincstf.inheritsFrom(ReadersBase);
Fields.gincstf = (prefabOptions) => { return {data:new Readers.Gincstf(),[itemTemplate]:"{status_fun_txt:trim:encode}",[helperColumns]:["status_fun","status_fun_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gincstf(),prefabOptions,options)).show()};};
Selectors.gincstf = () => { return {data:new Readers.Gincstf(),[userSettings]:usRoot+"gincstf",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["status_fun","status_fun_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "status_fun", caption: "jres:29925473", width: 150, forced: true}).addTextColumn({name: "status_fun_txt", caption: "jres:29925475", width: 300})};};

// GReaderGincufu.fields.js
Readers.Gincufu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincufu",keys:["uroven_fun"],[columns]:["uroven_fun","uroven_fun_txt","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincufu.inheritsFrom(ReadersBase);
Fields.gincufu = (prefabOptions) => { return {data:new Readers.Gincufu(),[itemTemplate]:"{uroven_fun_txt:trim:encode}",[helperColumns]:["uroven_fun","uroven_fun_txt","aktivita"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gincufu(),prefabOptions,options)).show()};};
Selectors.gincufu = () => { return {data:new Readers.Gincufu(),[userSettings]:usRoot+"gincufu",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["uroven_fun","uroven_fun_txt","aktivita"]},[gridFormat]:newGridFormat().addNumberColumn({name: "uroven_fun", caption: "jres:29925838", width: 150, forced: true}).addTextColumn({name: "uroven_fun_txt", caption: "jres:29925839", width: 300}).addNumberColumn({name: "aktivita", caption: "jres:29925834", width: 150})};};

// GReaderGinsspu.fields.js
Readers.Ginsspu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsspu",keys:["ixs_spu"],[columns]:["ixs_spu","zkratka","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsspu.inheritsFrom(ReadersBase);
Fields.ginsspu = (prefabOptions) => { return {data:new Readers.Ginsspu(),[itemTemplate]:function (row) {
		if (row.ktg_spu != null && row.ktg_spu != undefined) {
			if (row.ktg_spu == 4)
				return "<b>{0}:</b> {1}".format(row.ktg_spu_txt, row.nazev)
			else
				return "<b>{0}</b>".format(row.nazev)
		}
		return row.nazev
	},[helperColumns]:["nazev"],[graphicInput]:"oninput"};};

// GReaderGinszap.fields.js
Readers.Ginszap = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinszap",keys:["ixs_zap"],[columns]:["ixs_zap","ktg_zap","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginszap.inheritsFrom(ReadersBase);
Fields.ginszap = (prefabOptions) => { return {data:new Readers.Ginszap(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.ginszap(),prefabOptions,options)).show()};};
Selectors.ginszap = () => { return {data:new Readers.Ginszap(),[userSettings]:usRoot+"ginszap",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "ixs_zap", caption: "jres:29932204", width: 300, forced: true}).addNumberColumn({name: "ktg_zap", caption: "jres:29925969", width: 150}).addTextColumn({name: "nazev", caption: "jres:29932206", width: 300}).addNumberColumn({name: "aktivita", caption: "jres:29932202", width: 150})};};

// GReaderAdmGincaib.fields.js
Readers.AdmGincaib = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincaib",keys:["aib_modul"],[columns]:["aib_modul","aib_modul_txt","pol","ppol"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGincaib.inheritsFrom(ReadersBase);
Fields.admGincaib = (prefabOptions) => { return {data:new Readers.AdmGincaib(),[itemTemplate]:function (item) {
		var itemTemplate = `<b>${item.aib_modul_txt}</b>`;
		if (item.pol && item.ppol)
			itemTemplate += ` | jres:33000044: ${item.pol} | jres:33000045: ${item.ppol}`; 		return itemTemplate;
	},[helperColumns]:["aib_modul_txt", "pol", "ppol"],[graphicInput]:"oninput",[dropdown]:true};};

// GReaderAdmGincaiv.fields.js
Readers.AdmGincaiv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincaiv",keys:["aiv_poskyt"],[columns]:["aiv_poskyt","aiv_poskyt_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGincaiv.inheritsFrom(ReadersBase);
Fields.admGincaiv = (prefabOptions) => { return {data:new Readers.AdmGincaiv(),[itemTemplate]:"{aiv_poskyt_txt}",[helperColumns]:["aiv_poskyt_txt"]};};

// GReaderAdmGincakt.fields.js
Readers.AdmGincakt = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincakt",keys:["aktivita"],[columns]:["aktivita","aktivita_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGincakt.inheritsFrom(ReadersBase);
Fields.admGincakt = (prefabOptions) => { return {data:new Readers.AdmGincakt(),[itemTemplate]:"{aktivita_txt}",[helperColumns]:["aktivita_txt", "aktivita"],[dropdown]:true};};

// GReaderAdmGincdsd.fields.js
Readers.AdmGincdsd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincdsd",keys:["priz_spis"],[columns]:["priz_spis","priz_spis_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGincdsd.inheritsFrom(ReadersBase);
Fields.admGincdsd = (prefabOptions) => { return {data:new Readers.AdmGincdsd(),[itemTemplate]:"{priz_spis_txt}",[helperColumns]:["priz_spis_txt"]};};

// GReaderAdmGincfat.fields.js
Readers.AdmGincfat = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincfat",keys:["faze_typ"],[columns]:["faze_typ","faze_typ_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmGincfat.inheritsFrom(ReadersBase);
Fields.admGincfat = (prefabOptions) => { return {data:new Readers.AdmGincfat(),[itemTemplate]:"{faze_typ_txt}",[helperColumns]:["faze_typ_txt"]};};

// GReaderAdmGinckts.fields.js
Readers.AdmGinckts = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinckts",keys:["ktg_spu"],[columns]:["ktg_spu","ktg_spu_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmGinckts.inheritsFrom(ReadersBase);
Fields.admGinckts = (prefabOptions) => { return {data:new Readers.AdmGinckts(),[itemTemplate]:"{ktg_spu_txt}",[helperColumns]:["ktg_spu_txt"]};};

// GReaderAdmGinclap.fields.js
Readers.AdmGinclap = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinclap",keys:["lap_typ"],[columns]:["lap_typ","lap_typ_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinclap.inheritsFrom(ReadersBase);
Fields.admGinclap = (prefabOptions) => { return {data:new Readers.AdmGinclap(),[itemTemplate]:"{lap_typ_txt}",[helperColumns]:["lap_typ_txt"]};};

// GReaderAdmGinclgc.fields.js
Readers.AdmGinclgc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinclgc",keys:["lgcontent"],[columns]:["lgcontent","lgcontent_txt","lgcontent_uid"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinclgc.inheritsFrom(ReadersBase);
Fields.admGinclgc = (prefabOptions) => { return {data:new Readers.AdmGinclgc(),[itemTemplate]:"{lgcontent_txt}",[helperColumns]:["lgcontent_uid"]};};

// GReaderAdmGinclma.fields.js
Readers.AdmGinclma = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinclma",keys:["lm_api_typ"],[columns]:["lm_api_typ","lm_api_typ_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinclma.inheritsFrom(ReadersBase);
Fields.admGinclma = (prefabOptions) => { return {data:new Readers.AdmGinclma(),[itemTemplate]:"{lm_api_typ_txt}",[helperColumns]:["lm_api_typ_txt"]};};

// GReaderAdmGinclmk.fields.js
Readers.AdmGinclmk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinclmk",keys:["lmodel_typ"],[columns]:["lmodel_typ","lmodel_typ_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinclmk.inheritsFrom(ReadersBase);
Fields.admGinclmk = (prefabOptions) => { return {data:new Readers.AdmGinclmk(),[itemTemplate]:"{lmodel_typ_txt}",[helperColumns]:["lmodel_typ_txt"]};};

// GReaderAdmGinclps.fields.js
Readers.AdmGinclps = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinclps",keys:["lpsluzby_typ"],[columns]:["lpsluzby_typ","lpsluzby_typ_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinclps.inheritsFrom(ReadersBase);
Fields.admGinclps = (prefabOptions) => { return {data:new Readers.AdmGinclps(),[itemTemplate]:"{lpsluzby_typ_txt}",[helperColumns]:["lpsluzby_typ_txt"]};};

// GReaderAdmGinclps2.fields.js

// GReaderAdmGinclvy.fields.js
Readers.AdmGinclvy = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinclvy",keys:["lap_vystup_typ"],[columns]:["lap_vystup_typ","lap_vystup_typ_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinclvy.inheritsFrom(ReadersBase);
Fields.admGinclvy = (prefabOptions) => { return {data:new Readers.AdmGinclvy(),[itemTemplate]:"{lap_vystup_typ_txt}",[helperColumns]:["lap_vystup_typ_txt"]};};

// GReaderAdmGincmis.fields.js
Readers.AdmGincmis = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincmis",keys:["mistnost_druh"],[columns]:["mistnost_druh","mistnost_druh_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmGincmis.inheritsFrom(ReadersBase);
Fields.admGincmis = (prefabOptions) => { return {data:new Readers.AdmGincmis(),[itemTemplate]:"{mistnost_druh_txt}",[helperColumns]:["mistnost_druh_txt"]};};

// GReaderAdmGincoap.fields.js
Readers.AdmGincoap = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincoap",keys:["prompt"],[columns]:["prompt","prompt_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmGincoap.inheritsFrom(ReadersBase);
Fields.admGincoap = (prefabOptions) => { return {data:new Readers.AdmGincoap(),[itemTemplate]:"{prompt_txt}",[helperColumns]:["prompt_txt"]};};

// GReaderAdmGincpat.fields.js
Readers.AdmGincpat = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincpat",keys:["priz_automat"],[columns]:["priz_automat","priz_automat_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGincpat.inheritsFrom(ReadersBase);
Fields.admGincpat = (prefabOptions) => { return {data:new Readers.AdmGincpat(),[itemTemplate]:"{priz_automat_txt:trim:encode}",[helperColumns]:["priz_automat_txt"]};};

// GReaderAdmGincpav.fields.js
Readers.AdmGincpav = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincpav",keys:["priz_aut_vyriz"],[columns]:["priz_aut_vyriz","priz_aut_vyriz_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGincpav.inheritsFrom(ReadersBase);
Fields.admGincpav = (prefabOptions) => { return {data:new Readers.AdmGincpav(),[itemTemplate]:"{priz_aut_vyriz_txt}",[helperColumns]:["priz_aut_vyriz_txt"]};};

// GReaderAdmGincpba.fields.js
Readers.AdmGincpba = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincpba",keys:["priz_ba"],[columns]:["priz_ba","priz_ba_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGincpba.inheritsFrom(ReadersBase);
Fields.admGincpba = (prefabOptions) => { return {data:new Readers.AdmGincpba(),[itemTemplate]:"{priz_ba_txt:trim:encode}",[helperColumns]:["priz_ba_txt"]};};

// GReaderAdmGincpip.fields.js
Readers.AdmGincpip = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincpip",keys:["priz_ip_adr"],[columns]:["priz_ip_adr","priz_ip_adr_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmGincpip.inheritsFrom(ReadersBase);
Fields.admGincpip = (prefabOptions) => { return {data:new Readers.AdmGincpip(),[itemTemplate]:"{priz_ip_adr_txt}",[helperColumns]:["priz_ip_adr_txt"]};};

// GReaderAdmGincpkf.fields.js
Readers.AdmGincpkf = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincpkf",keys:["priz_kon_form"],[columns]:["priz_kon_form","priz_kon_form_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGincpkf.inheritsFrom(ReadersBase);
Fields.admGincpkf = (prefabOptions) => { return {data:new Readers.AdmGincpkf(),[itemTemplate]:"{priz_kon_form_txt}",[helperColumns]:["priz_kon_form_txt"]};};

// GReaderAdmGincpna.fields.js
Readers.AdmGincpna = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincpna",keys:["priz_povol_nda"],[columns]:["priz_povol_nda","priz_povol_nda_txt","ktg_povol_nda","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmGincpna.inheritsFrom(ReadersBase);
Fields.admGincpna = (prefabOptions) => { return {data:new Readers.AdmGincpna(),[itemTemplate]:"{priz_povol_nda_txt}",[helperColumns]:["priz_povol_nda_txt"]};};

// GReaderAdmGincprv.fields.js
Readers.AdmGincprv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincprv",keys:["priz_vaz"],[columns]:["priz_vaz","priz_vaz_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGincprv.inheritsFrom(ReadersBase);
Fields.admGincprv = (prefabOptions) => { return {data:new Readers.AdmGincprv(),[itemTemplate]:"{priz_vaz_txt}",[helperColumns]:["priz_vaz_txt"]};};

// GReaderAdmGincpve.fields.js
Readers.AdmGincpve = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincpve",keys:["priz_val_esu"],[columns]:["priz_val_esu","priz_val_esu_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGincpve.inheritsFrom(ReadersBase);
Fields.admGincpve = (prefabOptions) => { return {data:new Readers.AdmGincpve(),[itemTemplate]:"{priz_val_esu_txt}",[helperColumns]:["priz_val_esu_txt"]};};

// GReaderAdmGincren.fields.js
Readers.AdmGincren = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincren",keys:["rezim_nakl"],[columns]:["rezim_nakl","rezim_nakl_txt","k_v","k_s","rezim_nakl_rsx"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmGincren.inheritsFrom(ReadersBase);
Fields.admGincren = (prefabOptions) => { return {data:new Readers.AdmGincren(),[itemTemplate]:"{rezim_nakl_txt}",[helperColumns]:["rezim_nakl_txt"]};};

// GReaderAdmGincsbu.fields.js
Readers.AdmGincsbu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincsbu",keys:["segment_druh"],[columns]:["segment_druh","segment_druh_txt"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmGincsbu.inheritsFrom(ReadersBase);
Fields.admGincsbu = (prefabOptions) => { return {data:new Readers.AdmGincsbu(),[itemTemplate]:"{segment_druh_txt}",[helperColumns]:["segment_druh_txt"]};};

// GReaderAdmGinctao.fields.js
Readers.AdmGinctao = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinctao",keys:["typ_aut_oauth"],[columns]:["typ_aut_oauth","typ_aut_oauth_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinctao.inheritsFrom(ReadersBase);
Fields.admGinctao = (prefabOptions) => { return {data:new Readers.AdmGinctao(),[itemTemplate]:"{typ_aut_oauth_txt:trim:encode}",[helperColumns]:["typ_aut_oauth_txt"]};};

// GReaderAdmGinctcl.fields.js
Readers.AdmGinctcl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinctcl",keys:["typ_cloudu"],[columns]:["typ_cloudu","typ_cloudu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinctcl.inheritsFrom(ReadersBase);
Fields.admGinctcl = (prefabOptions) => { return {data:new Readers.AdmGinctcl(),[itemTemplate]:"{typ_cloudu_txt:trim:encode}",[helperColumns]:["typ_cloudu_txt"]};};

// GReaderAdmGincvps.fields.js
Readers.AdmGincvps = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincvps",keys:["typ_vps"],[columns]:["typ_vps","typ_vps_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGincvps.inheritsFrom(ReadersBase);
Fields.admGincvps = (prefabOptions) => { return {data:new Readers.AdmGincvps(),[itemTemplate]:"{typ_vps_txt:trim:encode}",[helperColumns]:["typ_vps_txt"]};};

// GReaderAdmGincvsk.fields.js
Readers.AdmGincvsk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincvsk",keys:["obd_vsk"],[columns]:["obd_vsk","obd_vsk_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGincvsk.inheritsFrom(ReadersBase);
Fields.admGincvsk = (prefabOptions) => { return {data:new Readers.AdmGincvsk(),[itemTemplate]:function (row) {
		var result = row.obd_vsk_txt;
		if (row.poznamka != null && row.poznamka != undefined && row.poznamka != "")
			result += " <i>({0})</i>".format(row.poznamka);
        return result;
	},[helperColumns]:["obd_vsk_txt"],[graphicInput]:"oninput"};};

// GReaderAdmGinsalv.fields.js
Readers.AdmGinsalv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinsalv",keys:["ixs_alv"],[columns]:["ixs_alv","nazev","id_ses","tema","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinsalv.inheritsFrom(ReadersBase);
Fields.admGinsalv = (prefabOptions) => { return {data:new Readers.AdmGinsalv(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.admGinsalv(),prefabOptions,options)).show()};};
Selectors.admGinsalv = () => { return {data:new Readers.AdmGinsalv(),[userSettings]:usRoot+"admGinsalv",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:29932206", width: 254, forced: true}).addTextColumn({name: "id_ses", caption: "jres:23920046", width: 100}).addTextColumn({name: "tema", caption: "jres:23920047", width: 100})};};

// GReaderAdmGinsfrm.fields.js
Readers.AdmGinsfrm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinsfrm",keys:["ixs_frm"],[columns]:["ixs_frm","nazev","tema","poznamka","rokmes_od","rokmes_do","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false,[dropdown]:false}, options); };
Readers.AdmGinsfrm.inheritsFrom(ReadersBase);
Fields.admGinsfrm = (prefabOptions) => { return {data:new Readers.AdmGinsfrm(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.admGinsfrm(),prefabOptions,options)).show()};};
Selectors.admGinsfrm = () => { return {data:new Readers.AdmGinsfrm(),[userSettings]:usRoot+"admGinsfrm",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:33000034", width: 200, forced: true}).addTextColumn({name: "ixs_frm", caption: "jres:23920021", width: 80})};};

// GReaderAdmGinsfsp.fields.js
Readers.AdmGinsfsp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinsfsp",keys:["pronom_id"],[columns]:["pronom_id","puid","nazev","verze"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinsfsp.inheritsFrom(ReadersBase);
Fields.admGinsfsp = (prefabOptions) => { return {data:new Readers.AdmGinsfsp(),[itemTemplate]:"<b>{nazev}</b> ({pronom_id}) | {koncovky}",[helperColumns]:["nazev", "pronom_id", "koncovky"],[graphicInput]:"oninput",[selector]:(options) => newDefaultSelector($.extend(Selectors.admGinsfsp(),prefabOptions,options)).show()};};
Selectors.admGinsfsp = () => { return {data:new Readers.AdmGinsfsp(),[userSettings]:usRoot+"admGinsfsp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "pronom_id", "koncovky"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:23920018", width: 200, forced: true}).addNumberColumn({name: "pronom_id", caption: "jres:33000050", width: 80}).addTextColumn({name: "koncovky", caption: "jres:33000051", width: 150})};};

// GReaderAdmGinsfun.fields.js
Readers.AdmGinsfun = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinsfun",keys:["ixs_fun"],[columns]:["ixs_fun","nazev","nazev_ref","nazev_su","nazev_orj","ico","aktivita","ixs_su","ixs_orj","ixs_ref","ixs_zmp","cs_nazev","nazev_rf", "priz_servis"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.AdmGinsfun.inheritsFrom(ReadersBase);
Fields.admGinsfun = (prefabOptions) => { return {data:new Readers.AdmGinsfun(),[itemTemplate]:function (row) {
				return ("{0} {1}<br><i>{2}</i>").format(new Gordic.Utils.IconBuilder().createIcon(Gordic.Prefabs.Utils.createAktivitaIconTemplate(row.aktivita).icon), FieldFunction.getTrimEncodeString(row.nazev_ref), FieldFunction.getFormatedString([row.nazev, row.nazev_su], ", "), FieldFunction.createAktivitaTxt(row.aktivita))
	},[graphicInput]:"oninput",[helperItemTemplate]:function (row) {
						var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:33000012": row.nazev, "jres:33000013": row.nazev_su });  		return FieldFunction.getInfoNoEncodeStr({ "info": "{0} {1}".format(new Gordic.Utils.IconBuilder().createIcon(Gordic.Prefabs.Utils.createAktivitaIconTemplate(row.aktivita).icon), row.nazev_rf), "more": moreInfo });
    },[verticalButtons]:true,[helperColumns]:["nazev_rf", "nazev", "nazev_su"],[states]:[{
        icon: "gi-user",
        align: "opposite",
        customClass: "g-inactive-prefabState"
    }],[selector]:(options) => newDefaultSelector($.extend(Selectors.admGinsfun(),prefabOptions,options)).show()};};
Fields.admGinsfunMini = (prefabOptions) => { return {data:new Readers.AdmGinsfun(),[itemTemplate]:function (row) {
		return ("{0} {1}").format(new Gordic.Utils.IconBuilder().createIcon(Gordic.Prefabs.Utils.createAktivitaIconTemplate(row.aktivita).icon), FieldFunction.getTrimEncodeString(row.nazev_rf))
	},[graphicInput]:"oninput",[helperItemTemplate]:function (row) {
		var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:33000012": row.nazev, "jres:33000013": row.nazev_su });  		return FieldFunction.getInfoNoEncodeStr({ "info": `${new Gordic.Utils.IconBuilder().createIcon(Gordic.Prefabs.Utils.createAktivitaIconTemplate(row.aktivita).icon)}  ${row.nazev_rf}`, "more": moreInfo });
	},[verticalButtons]:true,[helperColumns]:["nazev_rf", "nazev", "nazev_su"],[states]:[{
		icon: "gi-user",
		align: "opposite",
		customClass: "g-inactive-prefabState"
	}],[selector]:(options) => newDefaultSelector($.extend(Selectors.admGinsfun(),prefabOptions,options)).show()};};
Selectors.admGinsfun = () => { return {data:new Gordic.Data.Readers.AdmGinsfun(),key:"ixs_fun",[processOnStart]:true,[userSettings]:"defaultSelectors.admGinsfun",[isolatedUserSettings]:true,[gridOpts]:{
		columnMode: "full",
		sort: "nazev",
		defaultProfile: {
			columnList: "aktivita,nazev,nazev_ref,nazev_su,nazev_orj,priz_servis,ico,ixs_fun",
			searchColumns: "nazev,nazev_ref,nazev_su,nazev_orj,ico,ixs_fun"
		}
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addIconColumn({
			name: "aktivita",
			caption: "jres:29924152",
			iconTemplate: function (row) {
				return Gordic.Prefabs.Utils.createAktivitaIconTemplate(row.aktivita);
			} 
		})
		.addTextColumn({
			name: "nazev",
			caption: "jres:23920018",
			width: 200
		}).addTextColumn({
			name: "nazev_ref",
			caption: "jres:33000009",
			width: 220
		}).addTextColumn({
			name: "nazev_su",
			caption: "jres:23920040",
			width: 160
		}).addTextColumn({
			name: "nazev_orj",
			caption: "jres:33000010",
			width: 160
		}).addBooleanColumn({
			name: "priz_servis",
			caption: "jres:33000052" 		}).addTextColumn({
			name: "ico",
			caption: "jres:33000011",
			width: 100
		}).addTextColumn({
			name: "ixs_fun",
			caption: "jres:23920021",
			width: 125
		})};};

// GReaderAdmGinsgdt.fields.js
Readers.AdmGinsgdt = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinsgdt",keys:["ixs_gdt"],[columns]:["ixs_gdt","nazev","popis","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinsgdt.inheritsFrom(ReadersBase);
Fields.admGinsgdt = (prefabOptions) => { return {data:new Readers.AdmGinsgdt(),[itemTemplate]:"<b>{nazev}</b><br /><i>jres:23920021: {ixs_gdt}</i> | <i>jres:30011356: {popis}</i>",[helperColumns]:["nazev", "ixs_gdt", "popis"],[graphicInput]:"oninput"};};

// GReaderAdmGinskey.fields.js
Readers.AdmGinskey = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinskey",keys:["acckey"],[columns]:["acckey","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinskey.inheritsFrom(ReadersBase);
Fields.admGinskey = (prefabOptions) => { return {data:new Readers.AdmGinskey(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderAdmGinskov.fields.js
Readers.AdmGinskov = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinskov",keys:["kod_vyu"],[columns]:["kod_vyu","kod_vyu_txt","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinskov.inheritsFrom(ReadersBase);
Fields.admGinskov = (prefabOptions) => { return {data:new Readers.AdmGinskov(),[itemTemplate]:"{kod_vyu_txt}",[helperColumns]:["kod_vyu_txt"]};};

// GReaderAdmGinsmbx.fields.js
Readers.AdmGinsmbx = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsmbx",keys:["mailbox"],[columns]:["mailbox","ixs_su_txt","nazev", "poznamka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinsmbx.inheritsFrom(ReadersBase);
Fields.admGinsmbx = (prefabOptions) => { return {data:new Readers.AdmGinsmbx(),[itemTemplate]:"{mailbox:trim:encode}",[helperColumns]:["mailbox", "ixs_su_txt", "nazev", "poznamka"],[selector]:(options) => newDefaultSelector($.extend(Selectors.admGinsmbx(),prefabOptions,options)).show()};};
Selectors.admGinsmbx = () => { return {data:new Readers.AdmGinsmbx(),[userSettings]:usRoot+"admGinsmbx",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["mailbox", "ixs_su_txt", "nazev", "poznamka"]},[gridFormat]:newGridFormat().add({name: "mailbox", caption: "jres:29930300", width: 80, forced: true}).addTextColumn({name: "ixs_su_txt", caption: "jres:29930294", width: 80}).add({name: "nazev", caption: "jres:29930301", width: 80}).add({name: "poznamka", caption: "jres:29930307", width: 100})};};

// GReaderAdmGinspod.fields.js
Readers.AdmGinspod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinspod",keys:["ixs_su"],[columns]:["ixs_su","nazev","zkratka","ico","lic_adr","ofic_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinspod.inheritsFrom(ReadersBase);
Fields.admGinspod = (prefabOptions) => { return {data:new Readers.AdmGinspod(),[itemTemplate]:"{nazev}",[helperColumns]:["zkratka"],[selector]:(options) => newDefaultSelector($.extend(Selectors.admGinspod(),prefabOptions,options)).show()};};
Selectors.admGinspod = () => { return {data:new Readers.AdmGinspod(),[userSettings]:usRoot+"admGinspod",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zkratka"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:23920018", width: 200, forced: true}).addTextColumn({name: "zkratka", caption: "jres:23920019", width: 200})};};

// GReaderAdmGinsref.fields.js
Readers.AdmGinsref = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinsref",keys:["ixs_ref"],[columns]:["zkratka", "nazev", "jmeno", "prijmeni", "tit_pred", "tit_za", "login_name"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinsref.inheritsFrom(ReadersBase);
Fields.admGinsref = (prefabOptions) => { return {data:new Readers.AdmGinsref(),[itemTemplate]:"{nazev:trim:encode}",[itemTooltipTemplate]:"{nazev:trim:encode}",[graphicInput]:"oninput",[verticalButtons]:true,[helperColumns]:["zkratka", "nazev", "jmeno", "prijmeni", "tit_pred", "tit_za", "login_name"],[states]:[{
        icon: "gi-user",
        align: "opposite",
        customClass: "g-inactive-prefabState"
    }],[selector]:(options) => newDefaultSelector($.extend(Selectors.admGinsref(),prefabOptions,options)).show()};};
Fields.admGinsrefFoto = (prefabOptions) => { return {data:new Readers.AdmGinsref(),[itemTemplate]:function (row) {

        var name = [row.tit_pred, row.jmeno, row.prijmeni, row.tit_za].filter(function (it) { return !!it; }).join(" ");
        var secondRow = FieldFunction.getFormatedLabeledString({ "jres:23920019": row.zkratka, "jres:29930298": row.login_name, "jres:29931151": name });
        return ("<div class='{3}'>{2}</div><b>{0}</b><br>{1}").format(FieldFunction.getTrimEncodeString(row.nazev), secondRow, row.image ? row.image : "", row.image ? "foto" : "fa fa-user minifoto");
    },[graphicInput]:"oninput",[verticalButtons]:true,[helperColumns]:["nazev_ref", "nazev", "nazev_su"],[helperItemTemplate]:function (row) {


        var name = [row.tit_pred, row.jmeno, row.prijmeni, row.tit_za].filter(function (it) { return !!it; }).join(" ");
        var secondRow = FieldFunction.getFormatedLabeledString({ "jres:23920019": row.zkratka, "jres:29930298": row.login_name, "jres:29931151": name });
        return ("<div class='fa fa-user minifoto'></div><b>{0}</b><br>{1}").format(FieldFunction.getTrimEncodeString(row.nazev), secondRow);

    },[change]:function (ev, obj) {
        if (!obj || !obj.value || !obj.value["ixs_ref"]) return;
        new GContent("Gordic.Gui.WebControls.GDataReaderService").call("GetPhoto", { ixsRef: obj.value["ixs_ref"] }).done(function (image) {
            var img = "<img src='data:image/png;base64, " + image + "'/>";
            obj.value.image = !!image ? img : null;
            $(ev.target).gselectbox("setValue", obj.value);

        });

    },[selector]:(options) => newDefaultSelector($.extend(Selectors.admGinsref(),prefabOptions,options)).show()};};
Selectors.admGinsref = () => { return {data:new Readers.AdmGinsref(),[chekSettings]:true,[gridOpts]:{
        defaultProfile: {
            columnList: "nazev,tit_pred,jmeno,prijmeni,tit_za,login_name,zkratka",
            searchColumns: "nazev,tit_pred,jmeno,prijmeni,tit_za,login_name,zkratka" 
        }
    },[userSettings]:usRoot+"admGinsref",[isolatedUserSettings]:true,[gridFormat]:newGridFormat().add({name: "nazev", caption: "jres:23920018", width: 120, forced: true}).add({name: "tit_pred", caption: "jres:33000036", width: 40}).add({name: "jmeno", caption: "jres:29931151", width: 80}).add({name: "prijmeni", caption: "jres:33000037", width: 80}).add({name: "tit_za", caption: "jres:33000038", width: 40}).add({name: "login_name", caption: "jres:29930298", width: 60}).add({name: "zkratka", caption: "jres:23920019", width: 60}).add({name: "ico", caption: "jres:23920020", width: 60})};};
Selectors.admGinsrefFoto = () => { return {data:new Readers.AdmGinsref(),[userSettings]:usRoot+"admGinsrefFoto",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zkratka", "nazev", "jmeno", "prijmeni", "tit_pred", "tit_za", "login_name"]},[gridFormat]:newGridFormat().add({name: "nazev", caption: "jres:23920018", width: 120, forced: true}).add({name: "tit_pred", caption: "jres:33000036", width: 40}).add({name: "jmeno", caption: "jres:29931151", width: 80}).add({name: "prijmeni", caption: "jres:33000037", width: 80}).add({name: "tit_za", caption: "jres:33000038", width: 40}).add({name: "login_name", caption: "jres:29930298", width: 60}).add({name: "zkratka", caption: "jres:23920019", width: 60}).add({name: "ico", caption: "jres:23920020", width: 60})};};

// GReaderAdmGinsskr.fields.js
Readers.AdmGinsskr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinsskr",keys:["ixs_skr"],[columns]:["ixs_skr", "zkratka", "nazev", "poznamka", "skar_znak", "skar_lhuta", "dat_od", "dat_do", "aktivita", "ixs_spu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinsskr.inheritsFrom(ReadersBase);
Fields.admGinsskr = (prefabOptions) => { return {data:new Readers.AdmGinsskr(),[itemTemplate]:"<b>{nazev}</b><br /><i>jres:33000026: {ixs_spu_txt}</i>|<i>jres:30011413: {skar_znak}</i>|<i>jres:30011411: {skar_lhuta}</i>",[helperColumns]:["zkratka", "nazev"],[graphicInput]:"oninput",[dropdown]:false,[selector]:(options) => newDefaultSelector($.extend(Selectors.admGinsskr(),prefabOptions,options)).show()};};
Selectors.admGinsskr = () => { return {data:new Readers.AdmGinsskr(),[userSettings]:"defaultSelectors.admGinsskr",[isolatedUserSettings]:true,[gridOpts]:{
		searchColumns: ["zkratka", "nazev"],
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addIconColumn({
			name: "aktivita",
			caption: "jres:29924152",
			iconTemplate: (row) => {
				return Gordic.Prefabs.Utils.createAktivitaIconTemplate(row.aktivita);
			}
		}).addIconColumn({
			name: "platnost",
			caption: "jres:23920037",
			iconTemplate: (row) => {
				return Gordic.Prefabs.Utils.createDatOdDoIconTemplate(row.dat_od, row.dat_do)
			}
		}).addTextColumn({
			name: "nazev",
			caption: "jres:23920018"
		}).addTextColumn({
			name: "skar_znak",
			width: 30,
			caption: "jres:30011413"
		}).addNumberColumn({
			name: "skar_lhuta",
			width: 50,
			caption: "jres:30011411"
		}).addTextColumn({
			name: "ixs_spu_txt",
			caption: "jres:33000026" 		}).addTextColumn({
			name: "zkratka",
			caption: "jres:23920019"
		}).addDateColumn({
			width: 120,
			name: "dat_od",
			caption: "jres:33000004"
		}).addDateColumn({
			width: 120,
			name: "dat_do",
			caption: "jres:33000005"
		})};};

// GReaderAdmGinsspn.fields.js
Readers.AdmGinsspn = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinsspn",keys:["ixs_spn"],[columns]:["ixs_spn","nazev","poznamka","dat_od","dat_do","aktivita","ixs_spn_prev","ixs_spn_next"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinsspn.inheritsFrom(ReadersBase);
Fields.admGinsspn = (prefabOptions) => { return {data:new Readers.AdmGinsspn(),[helperColumns]:["ixs_spn", "nazev"],[graphicInput]:"oninput",[dropdown]:true,[itemTemplate]:(row) => {
		return `<b>${row?.nazev}</b><br /><i>jres:33000004: ${Gordic.Templates.Formatters.datetime(row?.dat_od, "datetime")}</i> | <i>jres:33000005: ${Gordic.Templates.Formatters.datetime(row?.dat_do, "datetime")} </i> | <i>jres:23920021: ${row?.ixs_spn}</i>`
	}};};

// GReaderAdmGinstre.fields.js
Readers.AdmGinstre = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinstre",keys:["ixs_tre"],[columns]:["ixs_tre","nazev", "ico" ],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinstre.inheritsFrom(ReadersBase);
Fields.admGinstre = (prefabOptions) => { return {data:new Readers.AdmGinstre(),[graphicInput]:"oninput",[itemTemplate]:function (row) {
		return ("{0} {1}").format(new Gordic.Utils.IconBuilder().createIcon(Gordic.Prefabs.Utils.createAktivitaIconTemplate(row.aktivita).icon), FieldFunction.getTrimEncodeString(row.nazev))
	},[helperColumns]:["ico","nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.admGinstre(),prefabOptions,options)).show()};};
Selectors.admGinstre = () => { return {data:new Gordic.Data.Readers.AdmGinstre(),key:"ixs_tre",[processOnStart]:true,[userSettings]:"defaultSelectors.admGinstre",[isolatedUserSettings]:true,[gridOpts]:{
		columnMode: "fit",
		sort: "nazev",
		defaultProfile: {
			columnList: "aktivita,nazev,ico,ixs_tre",
			searchColumns: "aktivita,nazev,ico,ixs_tre"
		}
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addIconColumn({
			name: "aktivita",
			caption: "jres:29924152",
			iconTemplate: function (row) {
				return Gordic.Prefabs.Utils.createAktivitaIconTemplate(row.aktivita);
			}
		})
		.addTextColumn({
			name: "nazev",
			caption: "jres:23920018",
			width: 200
		}).addTextColumn({
			name: "ico",
			caption: "jres:33000011",
			width: 100
		}).addTextColumn({
			name: "ixs_tre",
			caption: "jres:23920021",
			width: 125
		})};};

// GReaderAdmGinsvsk.fields.js
Readers.AdmGinsvsk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGinsvsk",keys:["ixs_vsk"],[columns]:["ixs_vsk","ico","nazev","dat_od","dat_do","spis_znak","spis_znak_short","ixs_vsk_nad","ixs_skr","urceni_spis_z","zpus_prid_cj","format_cj","priz_trvskar","ixs_spn_od","ixs_spn_do","ixs_vsk_prev","ixs_vsk_next","poznamka","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGinsvsk.inheritsFrom(ReadersBase);
Fields.admGinsvsk = (prefabOptions) => { return {data:new Readers.AdmGinsvsk(),[graphicInput]:"oninput",[itemTemplate]:"<b>{nazev}</b><br /><span><i>jres:23920021: {ixs_vsk}</i> | <i>jres:30011145: {spis_znak}</i></span>",[helperColumns]:["nazev", "spis_znak", "ixs_vsk"],[selector]:(options) => newDefaultSelector($.extend(Selectors.admGinsvsk(),prefabOptions,options)).show()};};
Selectors.admGinsvsk = () => { return {data:function () {
		return new Gordic.Data.View(new Gordic.Data.Readers.AdmGinsvsk().getData(this.serverFilters), {
			key: "ixs_vsk",
			processOnStart: true,
			processors: {
				tree: new Gordic.Data.Tree(Gordic.Data.Tree.parentIdOrganizer("ixs_vsk_nad"), {
					defaultState: "open"
				})
			}
		})
	},key:"ixs_vsk",[processOnStart]:true,[gridFormat]:new Gordic.Data.GridFormat()
		.addStructureColumn({
			name: "spis_znak",
			caption: "jres:30011145", 
			width: 120,
			fixedWidth: false,
			sortable: false,
			formatPreset: "full",
			forced: true,
		})
		.addIconColumn({
			name: "aktivita",
			caption: "jres:29924152",
			iconTemplate: (row) => {
				return Gordic.Prefabs.Utils.createAktivitaIconTemplate(row.aktivita);
			}
		})
		.addIconColumn({
			name: "platnost",
			caption: "jres:23920037",
			iconTemplate: (row) => {
				return Gordic.Prefabs.Utils.createDatOdDoIconTemplate(row.dat_od, row.dat_do)
			}
		})
		.addTextColumn({
			name: "nazev",
			caption: "jres:23920018"
		})
		.addTextColumn({
			name: "ixs_skr_txt",
			caption: "jres:33000039" 		})
		.addBooleanColumn({
			name: "priz_trvskar",
			caption: "jres:33000040", 			width: 100
		})
		.addDateTimeColumn({
			name: "dat_od",
			caption: "jres:23920035",
			width: 150 
		}).addDateTimeColumn({
			name: "dat_do",
			caption: "jres:23920036",
			width: 150
		}).addTextColumn({
			name: "ixs_vsk",
			caption: "jres:23920021",
			width: 120
		}),[doNotSearch]:false,[gridOpts]:{
		rowsEnabled: function (dataRow) {
			if (dataRow && dataRow.data && (dataRow.data.urceni_spis_z == 2 || dataRow.data.urceni_spis_z == 5 || dataRow.data.urceni_spis_z == 7))
				return true;
			else
				return false;
		},
		columnMode: "full",
		searchColumns: ["nazev", "spis_znak_short", "spis_znak", "dat_od", "dat_do", "ixs_vsk", "ixs_skr_txt"],
		sort: "cs2_spis_znak"
	},[userSettings]:usRoot+"admGinsvsk",[isolatedUserSettings]:true};};

// GReaderAdmInterniSubjekt.fields.js
Readers.AdmInterniSubjekt = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmInterniSubjekt",keys:["ixs_esu"],[columns]:["ixs_esu","esu_txt","zkratka","poznamka","ico","dic","priz_hlavni_txt","ob_jmeno","ulice","cor","cpop","cast_obce","obec","psc","tel","mail","fax","st1","st2","st3","st4","st5","st6","st7","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmInterniSubjekt.inheritsFrom(ReadersBase);
Fields.admInterniSubjekt = (prefabOptions) => { return {data:new Readers.AdmInterniSubjekt(),[itemTemplate]:"{esu_txt}",[helperColumns]:["esu_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.admInterniSubjekt(),prefabOptions,options)).show()};};
Selectors.admInterniSubjekt = () => { return {data:new Readers.AdmInterniSubjekt(),[userSettings]:usRoot+"admInterniSubjekt",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["esu_txt"]},[gridFormat]:newGridFormat().add({name: "ico", caption: "jres:23920027", width: 40, forced: true}).add({name: "nazev", caption: "jres:30011354", width: 120}).add({name: "esu_txt", caption: "jres:30027512", width: 120}).addTextColumn({name: "priz_hlavni_txt", caption: "jres:23920031", width: 80})};};

// GReaderAdmIxsBase.fields.js
Readers.AdmIxsBase = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmIxsBase",keys:["ixs"],[columns]:["ixs","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmIxsBase.inheritsFrom(ReadersBase);
Fields.admIxsBase = (prefabOptions) => { return {data:new Readers.AdmIxsBase(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderAdmSrvspla.fields.js
Readers.AdmSrvspla = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmSrvspla",keys:["ixs_pla"],[columns]:["ixs_pla", "nazev", "aktivita", "rok", "ico", "zkratka"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.AdmSrvspla.inheritsFrom(ReadersBase);
Fields.admSrvspla = (prefabOptions) => { return {data:new Readers.AdmSrvspla(),[helperColumns]:["rok", "nazev", "zkratka"],[itemTemplate]:"<b>{nazev:trim:encode}</b><br /><i>jres:33000001: {rok} | jres:33000002: {ico:trim:encode}</i>",[graphicInput]:"oninput",[selector]:(options) => newDefaultSelector($.extend(Selectors.admSrvspla(),prefabOptions,options)).show()};};
Selectors.admSrvspla = () => { return {data:new Readers.AdmSrvspla(),[userSettings]:usRoot+"admSrvspla",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["rok", "nazev", "zkratka"]},[gridFormat]:newGridFormat().add({name: "nazev", caption: "jres:23920045", width: 250, forced: true}).add({name: "rok", caption: "jres:33000001", width: 100}).add({name: "ico", caption: "jres:33000002", width: 100})};};

// GReaderAdmSrvsprr.fields.js
Readers.AdmSrvsprr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmSrvsprr",keys:["ixs_prr"],[columns]:["ixs_prr","nazev","poznamka","aktivita","zkratka"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.AdmSrvsprr.inheritsFrom(ReadersBase);
Fields.admSrvsprr = (prefabOptions) => { return {data:new Readers.AdmSrvsprr(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderAdmSrvstip.fields.js
Readers.AdmSrvstip = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmSrvstip",keys:["ixs_tip"],[columns]:["ixs_tip", "nazev", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.AdmSrvstip.inheritsFrom(ReadersBase);
Fields.admSrvstip = (prefabOptions) => { return {data:new Readers.AdmSrvstip(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderAdmSrvstri.fields.js
Readers.AdmSrvstri = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmSrvstri",keys:["ixs_tri"],[columns]:["ixs_tri","nazev","aktivita","zkratka","poznamka","rok_od","rok_do"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmSrvstri.inheritsFrom(ReadersBase);
Fields.admSrvstri = (prefabOptions) => { return {data:new Readers.AdmSrvstri(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderAdmSzrsaro.fields.js
Readers.AdmSzrsaro = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmSzrsaro",keys:["agendova_role"],[columns]:["agendova_role","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmSzrsaro.inheritsFrom(ReadersBase);
Fields.admSzrsaro = (prefabOptions) => { return {data:new Readers.AdmSzrsaro(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderDbLogins.fields.js
Readers.DbLogins = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDbLogins",keys:["name"],[columns]:["name"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DbLogins.inheritsFrom(ReadersBase);
Fields.dbLogins = (prefabOptions) => { return {data:new Readers.DbLogins(),[itemTemplate]:"{name}",[helperColumns]:["name"]};};

// GReaderGincaut.fields.js
Readers.Gincaut = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincaut",keys:["typ_aute"],[columns]:["typ_aute","typ_aute_txt"],[rowSize]:100,[readAll]:true,[permanent]:true}, options); };
Readers.Gincaut.inheritsFrom(ReadersBase);
Fields.gincaut = (prefabOptions) => { return {data:new Readers.Gincaut(),[dropdown]:true,[itemTemplate]:"{typ_aute_txt}",[helperColumns]:["typ_aute_txt"]};};

// GReaderGinccfg.fields.js
Readers.Ginccfg = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinccfg",keys:["uroven_cfg"],[columns]:["uroven_cfg","uroven_cfg_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginccfg.inheritsFrom(ReadersBase);
Fields.ginccfg = (prefabOptions) => { return {data:new Readers.Ginccfg(),[itemTemplate]:"{uroven_cfg_txt}",[helperColumns]:["uroven_cfg_txt"],[dropdown]:true};};

// GReaderGinccst.fields.js
Readers.Ginccst = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinccst",keys:["csas_type"],[columns]:["csas_type","csas_type","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.Ginccst.inheritsFrom(ReadersBase);
Fields.ginccst = (prefabOptions) => { return {data:new Readers.Ginccst(),[itemTemplate]:"{csas_type_txt}",[helperColumns]:["csas_type_txt"]};};

// GReaderGincdat.fields.js
Readers.Gincdat = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincdat",keys:["dat_typ"],[columns]:["dat_typ","dat_typ_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincdat.inheritsFrom(ReadersBase);
Fields.gincdat = (prefabOptions) => { return {data:new Readers.Gincdat(),[dropdown]:true,[itemTemplate]:"{dat_typ_txt}",[helperColumns]:["dat_typ_txt"]};};

// GReaderGincevn.fields.js
Readers.Gincevn = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincevn",keys:["ktg_evn"],[columns]:["ktg_evn","ktg_evn_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincevn.inheritsFrom(ReadersBase);
Fields.gincevn = (prefabOptions) => { return {data:new Readers.Gincevn(),[dropdown]:true,[itemTemplate]:"{ktg_evn_txt}",[helperColumns]:["ktg_evn_txt"]};};

// GReaderGincmbx.fields.js
Readers.Gincmbx = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincmbx",keys:["typ_mbx"],[columns]:["typ_mbx","typ_mbx_txt"],[rowSize]:100,[readAll]:true,[permanent]:true}, options); };
Readers.Gincmbx.inheritsFrom(ReadersBase);
Fields.gincmbx = (prefabOptions) => { return {data:new Readers.Gincmbx(),[dropdown]:true,[itemTemplate]:"{typ_mbx_txt}",[helperColumns]:["typ_mbx_txt"]};};

// GReaderGincoat.fields.js
Readers.Gincoat = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincoat",keys:["oa_token_typ"],[columns]:["oa_token_typ","oa_token_typ_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincoat.inheritsFrom(ReadersBase);
Fields.gincoat = (prefabOptions) => { return {data:new Readers.Gincoat(),[itemTemplate]:"{oa_token_typ_txt}",[helperColumns]:["oa_token_typ_txt"]};};

// GReaderGincorj.fields.js
Readers.Gincorj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincorj",keys:["uroven_orj"],[columns]:["uroven_orj", "uroven_orj_txt", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincorj.inheritsFrom(ReadersBase);
Fields.gincorj = (prefabOptions) => { return {data:new Readers.Gincorj(),[dropdown]:true,[itemTemplate]:"{uroven_orj_txt}",[helperColumns]:["uroven_orj_txt"]};};

// GReaderGincpar.fields.js
Readers.Gincpar = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincpar",keys:["param"],[columns]:["param", "param_txt", "aktivita", "popis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincpar.inheritsFrom(ReadersBase);
Fields.gincpar = (prefabOptions) => { return {data:new Readers.Gincpar(),[itemTemplate]:function (item) {
		var result = "";
		if (item.param_txt)
			result += item.param_txt.trim().encode();
		if (item.param)
			result += " | " + item.param.trim().encode();
		if (item.priz_zobr_adm == 0)
			result += " | <i>jres:33000041</i>"; 		return result;
	},[helperColumns]:["param_txt", "param"],[graphicInput]:"oninput",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincpar(),prefabOptions,options)).show()};};
Selectors.gincpar = () => { return {data:new Readers.Gincpar(),[userSettings]:usRoot+"gincpar",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["param_txt", "param"]},[gridFormat]:newGridFormat().addTextColumn({name: "param", caption: "jres:23920029", width: 80, forced: true}).addTextColumn({name: "param_txt", caption: "jres:23920030", width: 150})};};

// GReaderGincsve.fields.js
Readers.Gincsve = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincsve",keys:["svetadil"],[columns]:["svetadil","svetadil_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincsve.inheritsFrom(ReadersBase);
Fields.gincsve = (prefabOptions) => { return {data:new Readers.Gincsve(),[dropdown]:true,[itemTemplate]:"{svetadil_txt}",[helperColumns]:["svetadil_txt"]};};

// GReaderGinctau.fields.js
Readers.Ginctau = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinctau",keys:["typ_aut"],[columns]:["typ_aut","typ_aut_txt"],[rowSize]:100,[readAll]:true,[permanent]:true}, options); };
Readers.Ginctau.inheritsFrom(ReadersBase);
Fields.ginctau = (prefabOptions) => { return {data:new Readers.Ginctau(),[dropdown]:true,[itemTemplate]:"{typ_aut_txt}",[helperColumns]:["typ_aut_txt"]};};

// GReaderGinctvp.fields.js
Readers.Ginctvp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinctvp",keys:["typ_vla"],[columns]:["typ_vla","typ_vla_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginctvp.inheritsFrom(ReadersBase);
Fields.ginctvp = (prefabOptions) => { return {data:new Readers.Ginctvp(),[dropdown]:true,[itemTemplate]:"{typ_vla_txt}",[helperColumns]:["typ_vla_txt"]};};

// GReaderGincuvl.fields.js
Readers.Gincuvl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincuvl",keys:["uroven_vla"],[columns]:["uroven_vla","uroven_vla_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincuvl.inheritsFrom(ReadersBase);
Fields.gincuvl = (prefabOptions) => { return {data:new Readers.Gincuvl(),[itemTemplate]:"{uroven_vla_txt}",[helperColumns]:["uroven_vla_txt"]};};

// GReaderGincvau.fields.js
Readers.Gincvau = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincvau",keys:["typ_vau"],[columns]:["typ_vau","typ_vau_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincvau.inheritsFrom(ReadersBase);
Fields.gincvau = (prefabOptions) => { return {data:new Readers.Gincvau(),[itemTemplate]:"{typ_vau_txt}",[helperColumns]:["typ_vau_txt"]};};

// GReaderGinchop.fields.js
Readers.Ginchop = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinchop",keys:["param","config"],[columns]:["param","config","config_txt","popis","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginchop.inheritsFrom(ReadersBase);
Fields.ginchop = (prefabOptions) => { return {data:new Readers.Ginchop(),[dropdown]:true,[itemTemplate]:"{config_txt}",[helperColumns]:["config_txt"]};};

// GReaderGinsins.fields.js
Readers.Ginsins = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsins",keys:["ixs_ins"],[columns]:["ixs_ins","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsins.inheritsFrom(ReadersBase);
Fields.ginsins = (prefabOptions) => { return {data:new Readers.Ginsins(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsins(),prefabOptions,options)).show()};};
Selectors.ginsins = () => { return {data:new Readers.Ginsins(),[userSettings]:"defaultSelectors.ginsins",[isolatedUserSettings]:true,[gridOpts]:{
		searchColumns: ["nazev", "faze"],
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addIconColumn({
			name: "aktivita",
			caption: "jres:29924152",
			iconTemplate: (row) => {
				return Gordic.Prefabs.Utils.createAktivitaIconTemplate(row.aktivita);
			}
		}).addTextColumn({
			name: "nazev",
			caption: "jres:23920018"
		}).addTextColumn({
			name: "faze",
			caption: "jres:23920028"
		}).addTextColumn({
			name: "poznamka",
			caption: "jres:29929908"
		})};};

// GReaderGinssta.fields.js
Readers.Ginssta = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinssta",keys:["ip_adr"],[columns]:["ip_adr","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginssta.inheritsFrom(ReadersBase);
Fields.ginssta = (prefabOptions) => { return {data:new Readers.Ginssta(),[itemTemplate]:"{ip_adr:trim:encode}",[helperItemTemplate]:"<b>{ip_adr:trim:encode}</b>&nbsp;<span>{nazev:trim:encode}</span>",[helperColumns]:["ip_adr", "nazev"],[graphicInput]:"oninput",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginssta(),prefabOptions,options)).show()};};
Selectors.ginssta = () => { return {data:new Readers.Ginssta(),[userSettings]:usRoot+"ginssta",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ip_adr", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "ip_adr", caption: "jres:23920026", width: 120, forced: true}).addTextColumn({name: "nazev", caption: "jres:29931494", width: 120})};};

// GReaderSrvscsp.fields.js
Readers.Srvscsp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvscsp",keys:["ixs_csp"],[columns]:["ixs_csp","nazev","zkratka","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Srvscsp.inheritsFrom(ReadersBase);
Fields.srvscsp = (prefabOptions) => { return {data:new Readers.Srvscsp(),[itemTemplate]:(obj) => {
		var result = "";
		result += "{0}".format(obj.nazev)
		if (obj.zkratka != null && obj.zkratka != undefined) {
			if (obj.zkratka.trim() != "")
				result += " ({0})".format(obj.zkratka)
		}
		return result
	},[helperColumns]:["nazev", "zkratka"]};};

// GReaderSslcpco.fields.js
Readers.Sslcpco = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslcpco",keys:["priz_cj_only"],[columns]:["priz_cj_only","priz_cj_only_txt"],[rowSize]:100,[readAll]:true,[permanent]:true}, options); };
Readers.Sslcpco.inheritsFrom(ReadersBase);
Fields.sslcpco = (prefabOptions) => { return {data:new Readers.Sslcpco(),[dropdown]:true,[itemTemplate]:"{priz_cj_only_txt}",[helperColumns]:["priz_cj_only_txt"]};};

// GReaderSslcpdc.fields.js
Readers.Sslcpdc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslcpdc",keys:["priz_den_cj"],[columns]:["priz_den_cj","priz_den_cj_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslcpdc.inheritsFrom(ReadersBase);
Fields.sslcpdc = (prefabOptions) => { return {data:new Readers.Sslcpdc(),[itemTemplate]:"{priz_den_cj_txt}",[helperColumns]:["priz_den_cj_txt"]};};

// GReaderSslcpuz.fields.js
Readers.Sslcpuz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslcpuz",keys:["priz_uzav"],[columns]:["priz_uzav","priz_uzav_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslcpuz.inheritsFrom(ReadersBase);
Fields.sslcpuz = (prefabOptions) => { return {data:new Readers.Sslcpuz(),[itemTemplate]:"{priz_uzav_txt}",[helperColumns]:["priz_uzav_txt"]};};

// GReaderSslctyd.fields.js
Readers.Sslctyd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslctyd",keys:["typ_den"],[columns]:["typ_den","typ_den_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslctyd.inheritsFrom(ReadersBase);
Fields.sslctyd = (prefabOptions) => { return {data:new Readers.Sslctyd(),[itemTemplate]:"{typ_den_txt}",[helperColumns]:["typ_den_txt"]};};

// GReaderSslsump.fields.js
Readers.Sslsump = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslsump",keys:["umisteni"],[columns]:["umisteni","umisteni_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslsump.inheritsFrom(ReadersBase);
Fields.sslsump = (prefabOptions) => { return {data:new Readers.Sslsump(),[itemTemplate]:"{umisteni_txt}",[helperColumns]:["umisteni_txt"]};};

// GReaderWflcpak.fields.js
Readers.Wflcpak = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcpak",keys:["priz_akr"],[columns]:["priz_akr","priz_akr_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcpak.inheritsFrom(ReadersBase);
Fields.wflcpak = (prefabOptions) => { return {data:new Readers.Wflcpak(),[itemTemplate]:"{priz_akr_txt}",[helperColumns]:["priz_akr_txt"]};};

// GReaderWindowsLogins.fields.js
Readers.WindowsLogins = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWindowsLogins",keys:["name"],[columns]:["name"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.WindowsLogins.inheritsFrom(ReadersBase);
Fields.windowsLogins = (prefabOptions) => { return {data:new Readers.WindowsLogins(),[itemTemplate]:"{name}",[helperColumns]:["name"]};};

// GReaderIntcpes.fields.js
Readers.Intcpes = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderIntcpes",keys:["priz_ess"],[columns]:["priz_ess","priz_ess_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Intcpes.inheritsFrom(ReadersBase);
Fields.intcpes = (prefabOptions) => { return {data:new Readers.Intcpes(),[itemTemplate]:"{priz_ess_txt}",[helperColumns]:["priz_ess_txt"]};};

// GReaderAmdGdesslo.fields.js
Readers.AdmGdesslo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGdesslo",keys:["tabulka","sloupec"],[columns]:["tabulka","sloupec"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGdesslo.inheritsFrom(ReadersBase);
Fields.admGdesslo = (prefabOptions) => { return {data:new Readers.AdmGdesslo(),[itemTemplate]:"{sloupec}",[helperColumns]:["sloupec"]};};

// GReaderAmdGdestab.fields.js
Readers.AdmGdestab = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGdestab",keys:["tabulka"],[columns]:["tabulka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGdestab.inheritsFrom(ReadersBase);
Fields.admGdestab = (prefabOptions) => { return {data:new Readers.AdmGdestab(),[itemTemplate]:"{tabulka}",[helperColumns]:["tabulka"]};};

// GReaderAmdGdevpra.fields.js
Readers.AdmGdevpra = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGdevpra",keys:["pravidlo_id","tabulka","sloupec"],[columns]:["pravidlo_id","tabulka","sloupec","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmGdevpra.inheritsFrom(ReadersBase);
Fields.admGdevpra = (prefabOptions) => { return {data:new Readers.AdmGdevpra(),[itemTemplate]:"{tabulka} - {sloupec}",[helperColumns]:["tabuka", "sloupec", "pravidlo_id"]};};

// GReaderAdmRakcden.fields.js
Readers.AdmRakcden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmRakcden",keys:["typ_dk"],[columns]:["typ_dk","typ_dk_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:true,[dropdown]:true}, options); };
Readers.AdmRakcden.inheritsFrom(ReadersBase);
Fields.admRakcden = (prefabOptions) => { return {data:new Readers.AdmRakcden(),[itemTemplate]:"{typ_dk_txt}",[helperColumns]:["typ_dk_txt"]};};

// GReaderAdmRaksden.fields.js
Readers.AdmRaksden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmRaksden",keys:["ixp_den"],[columns]:["ixp_den","nazev","zkratka","poznamka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmRaksden.inheritsFrom(ReadersBase);
Fields.admRaksden = (prefabOptions) => { return {data:new Readers.AdmRaksden(),[itemTemplate]:"<b>{nazev}</b><br /><i>{poznamka}</i>",[helperColumns]:["nazev", "zkratka", "poznamka"],[graphicInput]:"oninput"};};

// GReaderAdmSslcstu.fields.js
Readers.AdmSslcstu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmSslcstu",keys:["stav_uzav"],[columns]:["stav_uzav","stav_uzav_txt","k_v","k_s","stav_uzav_rsx"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmSslcstu.inheritsFrom(ReadersBase);
Fields.admSslcstu = (prefabOptions) => { return {data:new Readers.AdmSslcstu(),[dropdown]:true,[itemTemplate]:"{stav_uzav_txt}",[helperColumns]:["stav_uzav_txt"]};};

// GReaderAdmSslczpc.fields.js
Readers.AdmSslczpc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmSslczpc",keys:["zpus_prid_cj"],[columns]:["zpus_prid_cj","zpus_prid_cj_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmSslczpc.inheritsFrom(ReadersBase);
Fields.admSslczpc = (prefabOptions) => { return {data:new Readers.AdmSslczpc(),[itemTemplate]:"{zpus_prid_cj_txt}",[helperColumns]:["zpus_prid_cj_txt"]};};

// GReaderAdmSsldden.fields.js
Readers.AdmSsldden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmSsldden",keys:["sslden","rok"],[columns]:["sslden","rok","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmSsldden.inheritsFrom(ReadersBase);
Fields.admSsldden = (prefabOptions) => { return {data:new Readers.AdmSsldden(),[itemTemplate]:"{rok}",[helperColumns]:["rok"]};};

// GReaderSslcpfy.fields.js
Readers.Sslcpfy = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslcpfy",keys:["priz_fyz"],[columns]:["priz_fyz","priz_fyz_txt","k_v","k_s","priz_fyz_rsx"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslcpfy.inheritsFrom(ReadersBase);
Fields.sslcpfy = (prefabOptions) => { return {data:new Readers.Sslcpfy(),[itemTemplate]:"{priz_fyz_txt:trim:encode}",[helperColumns]:["priz_fyz_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.sslcpfy(),prefabOptions,options)).show()};};
Selectors.sslcpfy = () => { return {data:new Readers.Sslcpfy(),[userSettings]:usRoot+"sslcpfy",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_fyz_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "priz_fyz", caption: "jres:30010576", width: 150, forced: true}).addTextColumn({name: "priz_fyz_txt", caption: "jres:30010578", width: 300}).addNumberColumn({name: "k_v", caption: "jres:30010575", width: 150}).addTextColumn({name: "k_s", caption: "jres:30010574", width: 300}).addNumberColumn({name: "priz_fyz_rsx", caption: "jres:30010577", width: 150})};};

// GReaderSslcusz.fields.js
Readers.Sslcusz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslcusz",keys:["urceni_spis_z"],[columns]:["urceni_spis_z","urceni_spis_z_txt","k_v","k_s","urceni_spis_z_rsx"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslcusz.inheritsFrom(ReadersBase);
Fields.sslcusz = (prefabOptions) => { return {data:new Readers.Sslcusz(),[itemTemplate]:"{urceni_spis_z_txt:trim:encode}",[helperColumns]:["urceni_spis_z","urceni_spis_z_txt","k_v","k_s","urceni_spis_z_rsx"],[selector]:(options) => newDefaultSelector($.extend(Selectors.sslcusz(),prefabOptions,options)).show()};};
Selectors.sslcusz = () => { return {data:new Readers.Sslcusz(),[userSettings]:usRoot+"sslcusz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["urceni_spis_z","urceni_spis_z_txt","k_v","k_s","urceni_spis_z_rsx"]},[gridFormat]:newGridFormat().addNumberColumn({name: "urceni_spis_z", caption: "jres:30010706", width: 150, forced: true}).addTextColumn({name: "urceni_spis_z_txt", caption: "jres:30010708", width: 300}).addNumberColumn({name: "k_v", caption: "jres:30010705", width: 150}).addTextColumn({name: "k_s", caption: "jres:30010704", width: 300}).addNumberColumn({name: "urceni_spis_z_rsx", caption: "jres:30010707", width: 150})};};

// GReaderSslsden.fields.js
Readers.AdmSslsden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslsden",keys:["sslden"],[columns]:["sslden","aktivita","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmSslsden.inheritsFrom(ReadersBase);
Fields.admsslsden = (prefabOptions) => { return {data:new Readers.AdmSslsden(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["sslden","aktivita","nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.admsslsden(),prefabOptions,options)).show()};};
Selectors.admsslsden = () => { return {data:new Readers.AdmSslsden(),[userSettings]:usRoot+"admsslsden",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["sslden","aktivita","nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "sslden", caption: "jres:30011146", width: 300, forced: true}).addNumberColumn({name: "aktivita", caption: "jres:30011125", width: 150}).addTextColumn({name: "nazev", caption: "jres:30011136", width: 300})};};

// GReaderSslsspl.fields.js
Readers.AdmSslsspl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslsspl",keys:["spis_pl"],[columns]:["spis_pl","aktivita","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmSslsspl.inheritsFrom(ReadersBase);
Fields.admsslsspl = (prefabOptions) => { return {data:new Readers.AdmSslsspl(),[itemTemplate]:"<b>{nazev:trim:encode}</b> ({spis_pl})",[helperColumns]:["spis_pl", "aktivita", "nazev"],[graphicInput]:"oninput",[selector]:(options) => newDefaultSelector($.extend(Selectors.admsslsspl(),prefabOptions,options)).show()};};
Selectors.admsslsspl = () => { return {data:new Readers.AdmSslsspl(),[userSettings]:usRoot+"admsslsspl",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["spis_pl", "aktivita", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "spis_pl", caption: "jres:30011365", width: 300, forced: true}).addNumberColumn({name: "aktivita", caption: "jres:29924152", width: 150}).addTextColumn({name: "nazev", caption: "jres:30011354", width: 300})};};

// GReaderSslsspz.fields.js
Readers.AdmSslsspz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslsspz",keys:["spis_pl","spis_znak"],[columns]:["spis_pl", "spis_znak", "aktivita", "nazev", "spis_znak_pod_next", "ixs_skr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmSslsspz.inheritsFrom(ReadersBase);
Fields.admsslsspz = (prefabOptions) => { return {data:new Readers.AdmSslsspz(),[graphicInput]:"exclusive",[itemTemplate]:function (row) {
		return ("<b>{0}</b><br>{1}").format(FieldFunction.getTrimEncodeString(row.spis_znak), row.nazev ? FieldFunction.getTrimEncodeString(row.nazev) : "");
	},[helperColumns]:["spis_pl", "spis_znak", "aktivita", "nazev", "spis_znak_pod_next", "ixs_skr"],[selector]:(options) => newDefaultSelector($.extend(Selectors.admsslsspz(),prefabOptions,options)).show()};};
Selectors.admsslsspz = () => { return {data:new Readers.AdmSslsspz(),[userSettings]:usRoot+"admsslsspz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["spis_pl", "spis_znak", "aktivita", "nazev", "spis_znak_pod_next", "ixs_skr"]},[gridFormat]:newGridFormat().addTextColumn({name: "spis_pl", caption: "jres:30011365", width: 300, forced: true}).addTextColumn({name: "spis_znak", caption: "jres:30011416", width: 300}).addNumberColumn({name: "aktivita", caption: "jres:30011390", width: 150}).addTextColumn({name: "nazev", caption: "jres:30011402", width: 300}).addTextColumn({name: "spis_znak_pod_next", caption: "jres:30011418", width: 300})};};

// GReaderAdmWflcgra.fields.js
Readers.AdmWflcgra = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflcgra",keys:["typ_gra"],[columns]:["typ_gra","typ_gra_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmWflcgra.inheritsFrom(ReadersBase);
Fields.admWflcgra = (prefabOptions) => { return {data:new Readers.AdmWflcgra(),[itemTemplate]:"{typ_gra_txt}",[helperColumns]:["typ_gra_txt"]};};

// GReaderAdmWflckzd.fields.js
Readers.AdmWflckzd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflckzd",keys:["ktg_zp_dor"],[columns]:["ktg_zp_dor","ktg_zp_dor_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmWflckzd.inheritsFrom(ReadersBase);
Fields.admWflckzd = (prefabOptions) => { return {data:new Readers.AdmWflckzd(),[itemTemplate]:"{ktg_zp_dor_txt}",[helperColumns]:["ktg_zp_dor_txt"],[dropdown]:true};};

// GReaderAdmWflcltv.fields.js
Readers.AdmWflcltv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflcltv",keys:["typ_ltv"],[columns]:["typ_ltv","typ_ltv_txt"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmWflcltv.inheritsFrom(ReadersBase);
Fields.admWflcltv = (prefabOptions) => { return {data:new Readers.AdmWflcltv(),[itemTemplate]:"{typ_ltv_txt}",[helperColumns]:["typ_ltv_txt"]};};

// GReaderAdmWflcozv.fields.js
Readers.AdmWflcozv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflcozv",keys:["operace"],[columns]:["operace","operace_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmWflcozv.inheritsFrom(ReadersBase);
Fields.admWflcozv = (prefabOptions) => { return {data:new Readers.AdmWflcozv(),[itemTemplate]:"{operace_txt}",[helperColumns]:["operace_txt"]};};

// GReaderAdmWflcpkv.fields.js
Readers.AdmWflcpkv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflcpkv",keys:["priz_kvcrt"],[columns]:["priz_kvcrt","priz_kvcrt_txt"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmWflcpkv.inheritsFrom(ReadersBase);
Fields.admWflcpkv = (prefabOptions) => { return {data:new Readers.AdmWflcpkv(),[itemTemplate]:"{priz_kvcrt_txt}",[helperColumns]:["priz_kvcrt_txt"]};};

// GReaderAdmWflcpri.fields.js
Readers.AdmWflcpri = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflcpri",keys:["priz_spis"],[columns]:["priz_spis","priz_spis_txt","k_v","k_s","k_xml","priz_spis_rsx"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmWflcpri.inheritsFrom(ReadersBase);
Fields.admWflcpri = (prefabOptions) => { return {data:new Readers.AdmWflcpri(),[itemTemplate]:"{priz_spis_txt}",[helperColumns]:["priz_spis"]};};

// GReaderAdmWflcprp.fields.js
Readers.AdmWflcprp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflcprp",keys:["priz_podp"],[columns]:["priz_podp","priz_podp_txt"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmWflcprp.inheritsFrom(ReadersBase);
Fields.admWflcprp = (prefabOptions) => { return {data:new Readers.AdmWflcprp(),[itemTemplate]:"{priz_podp_txt}",[helperColumns]:["priz_podp_txt"]};};

// GReaderAdmWflcpts.fields.js
Readers.AdmWflcpts = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflcpts",keys:["priz_ts"],[columns]:["priz_ts","priz_ts_txt"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmWflcpts.inheritsFrom(ReadersBase);
Fields.admWflcpts = (prefabOptions) => { return {data:new Readers.AdmWflcpts(),[itemTemplate]:"{priz_ts_txt}",[helperColumns]:["priz_ts_txt"]};};

// GReaderAdmWflcpvp.fields.js
Readers.AdmWflcpvp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflcpvp",keys:["poz_viz_podp"],[columns]:["poz_viz_podp","poz_viz_podp_txt"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmWflcpvp.inheritsFrom(ReadersBase);
Fields.admWflcpvp = (prefabOptions) => { return {data:new Readers.AdmWflcpvp(),[itemTemplate]:"{poz_viz_podp_txt}",[helperColumns]:["poz_viz_podp_txt"]};};

// GReaderAdmWflcrsp.fields.js
Readers.AdmWflcrsp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflcrsp",keys:["rezim_sch"],[columns]:["rezim_sch","rezim_sch_zkr","rezim_sch_txt","k_v","k_s","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmWflcrsp.inheritsFrom(ReadersBase);
Fields.admWflcrsp = (prefabOptions) => { return {data:new Readers.AdmWflcrsp(),[itemTemplate]:"{rezim_sch_txt}",[helperColumns]:["rezim_sch_txt"]};};

// GReaderAdmWflcsvp.fields.js
Readers.AdmWflcsvp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflcsvp",keys:["str_viz_podp"],[columns]:["str_viz_podp","str_viz_podp_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmWflcsvp.inheritsFrom(ReadersBase);
Fields.admWflcsvp = (prefabOptions) => { return {data:new Readers.AdmWflcsvp(),[itemTemplate]:"{str_viz_podp_txt}",[helperColumns]:["str_viz_podp_txt"]};};

// GReaderAdmWflctdz.fields.js
Readers.AdmWflctdz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflctdz",keys:["typ_dok_zaz"],[columns]:["typ_dok_zaz","typ_dok_zaz_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmWflctdz.inheritsFrom(ReadersBase);
Fields.admWflctdz = (prefabOptions) => { return {data:new Readers.AdmWflctdz(),[itemTemplate]:"{typ_dok_zaz_txt}",[helperColumns]:["typ_dok_zaz_txt", "typ_dok_zaz"]};};

// GReaderAdmWflctkr.fields.js
Readers.AdmWflctkr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflctkr",keys:["typ_krok"],[columns]:["typ_krok","typ_krok_txt","k_v","k_s","typ_krok_rsx"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmWflctkr.inheritsFrom(ReadersBase);
Fields.admWflctkr = (prefabOptions) => { return {data:new Readers.AdmWflctkr(),[itemTemplate]:"{typ_krok_txt}",[helperColumns]:["typ_krok_txt"]};};

// GReaderAdmWflctsu.fields.js
Readers.AdmWflctsu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflctsu",keys:["typ_subj"],[columns]:["typ_subj", "typ_subj_txt"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmWflctsu.inheritsFrom(ReadersBase);
Fields.admWflctsu = (prefabOptions) => { return {data:new Readers.AdmWflctsu(),[itemTemplate]:"{typ_subj_txt:trim:encode}",[helperColumns]:["typ_subj_txt"]};};

// GReaderAdmWflctvp.fields.js
Readers.AdmWflctvp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflctvp",keys:["typ_viz_podpis"],[columns]:["typ_viz_podpis","typ_viz_podpis_txt"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmWflctvp.inheritsFrom(ReadersBase);
Fields.admWflctvp = (prefabOptions) => { return {data:new Readers.AdmWflctvp(),[itemTemplate]:"{typ_viz_podpis_txt}",[helperColumns]:["typ_viz_podpis_txt"]};};

// GReaderAdmWflctyp.fields.js
Readers.AdmWflctyp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflctyp",keys:["typ"],[columns]:["typ", "typ_txt"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdmWflctyp.inheritsFrom(ReadersBase);
Fields.admWflctyp = (prefabOptions) => { return {data:new Readers.AdmWflctyp(),[itemTemplate]:"{typ_txt:trim:encode}",[helperColumns]:["typ_txt"]};};

// GReaderAdmWflcupr.fields.js
Readers.AdmWflcupr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflcupr",keys:["uroven_prist"],[columns]:["uroven_prist","uroven_prist_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmWflcupr.inheritsFrom(ReadersBase);
Fields.admWflcupr = (prefabOptions) => { return {data:new Readers.AdmWflcupr(),[itemTemplate]:"{uroven_prist_txt}",[helperColumns]:["uroven_prist_txt"]};};

// GReaderAdmWflcwsl.fields.js
Readers.AdmWflcwsl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflcwsl",keys:["priz_wsl"],[columns]:["priz_wsl","priz_wsl_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmWflcwsl.inheritsFrom(ReadersBase);
Fields.admWflcwsl = (prefabOptions) => { return {data:new Readers.AdmWflcwsl(),[itemTemplate]:"{priz_wsl_txt}",[helperColumns]:["priz_wsl_txt"]};};

// GReaderAdmWflczve.fields.js
Readers.AdmWflczve = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflczve",keys:["ktg_zve"],[columns]:["ktg_zve","ktg_zve_txt","k_v","k_s","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmWflczve.inheritsFrom(ReadersBase);
Fields.admWflczve = (prefabOptions) => { return {data:new Readers.AdmWflczve(),[itemTemplate]:"{ktg_zve_txt}",[helperColumns]:["ktg_zve_txt"]};};

// GReaderAdmWflsblk.fields.js
Readers.AdmWflsblk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflsblk",keys:["ixs_blk"],[columns]:["ixs_blk","nazev","poznamka","dat_od","dat_do","typ","typ_subj"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.AdmWflsblk.inheritsFrom(ReadersBase);
Fields.admWflsblk = (prefabOptions) => { return {data:new Readers.AdmWflsblk(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev", "poznamka", "typ_subj"],[selector]:(options) => newDefaultSelector($.extend(Selectors.admWflsblk(),prefabOptions,options)).show()};};
Selectors.admWflsblk = () => { return {data:new Readers.AdmWflsblk(),[userSettings]:usRoot+"admWflsblk",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "poznamka", "typ_subj"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:23920018", width: 150, forced: true}).addTextColumn({name: "poznamka", caption: "jres:29929908", width: 150})};};

// GReaderAdmWflscer.fields.js
Readers.AdmWflscer = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflscer",keys:["ixs_cer"],[columns]:["jmeno_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmWflscer.inheritsFrom(ReadersBase);
Fields.admWflscer = (prefabOptions) => { return {data:new Readers.AdmWflscer(),[dropdown]:true,[graphicInput]:"oninput",[itemTemplate]:function (row) {
		return "<b>{0}</b><br><span><i>jres:23920037: {1} - {2} | jres:30027525: {3}</i></span>".format(row.jmeno, Gordic.Templates.Formatters.datetime(row.dat_od), Gordic.Templates.Formatters.datetime(row.dat_do), row.otisk)
	},[helperColumns]:["jmeno_txt"]};};

// GReaderAdmWflsssk.fields.js
Readers.AdmWflsssk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmWflsssk",keys:["ixs_slo"],[columns]:["ixs_slo","nazev","mailbox","typ_slo_upvs"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmWflsssk.inheritsFrom(ReadersBase);
Fields.admWflsssk = (prefabOptions) => { return {data:new Readers.AdmWflsssk(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderWflcpdo.fields.js
Readers.Wflcpdo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcpdo",keys:["priz_doruc"],[columns]:["priz_doruc","priz_doruc_txt","k_v","k_s","k_xml","priz_doruc_rsx"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcpdo.inheritsFrom(ReadersBase);
Fields.wflcpdo = (prefabOptions) => { return {data:new Readers.Wflcpdo(),[itemTemplate]:"{priz_doruc_txt:trim:encode}",[helperColumns]:["priz_doruc_txt"]};};

// GReaderWflcpso.fields.js
Readers.Wflcpso = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcpso",keys:["priz_poz_skar"],[columns]:["priz_poz_skar","priz_poz_skar_txt","k_v","k_s","priz_poz_skar_rsx"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcpso.inheritsFrom(ReadersBase);
Fields.wflcpso = (prefabOptions) => { return {data:new Readers.Wflcpso(),[itemTemplate]:"{priz_poz_skar_txt:trim:encode}",[helperColumns]:["priz_poz_skar","priz_poz_skar_txt","k_v","k_s","priz_poz_skar_rsx"],[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcpso(),prefabOptions,options)).show()};};
Selectors.wflcpso = () => { return {data:new Readers.Wflcpso(),[userSettings]:usRoot+"wflcpso",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_poz_skar","priz_poz_skar_txt","k_v","k_s","priz_poz_skar_rsx"]},[gridFormat]:newGridFormat().addNumberColumn({name: "priz_poz_skar", caption: "jres:30025625", width: 150, forced: true}).addTextColumn({name: "priz_poz_skar_txt", caption: "jres:30025627", width: 300}).addNumberColumn({name: "k_v", caption: "jres:30025624", width: 150}).addTextColumn({name: "k_s", caption: "jres:30025623", width: 300}).addNumberColumn({name: "priz_poz_skar_rsx", caption: "jres:30025626", width: 150})};};

// GReaderWflscau.fields.js
Readers.Wflscau = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflscau",keys:["ixs_cau"],[columns]:["ixs_cau","jmeno","id_cert","otisk","dat_od","dat_do","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflscau.inheritsFrom(ReadersBase);
Fields.wflscau = (prefabOptions) => { return {data:new Readers.Wflscau(),[itemTemplate]:"{jmeno:trim:encode}",[helperColumns]:["ixs_cau","jmeno","id_cert","otisk","dat_od","dat_do","aktivita"],[selector]:(options) => newDefaultSelector($.extend(Selectors.wflscau(),prefabOptions,options)).show()};};
Selectors.wflscau = () => { return {data:new Readers.Wflscau(),[userSettings]:usRoot+"wflscau",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixs_cau","jmeno","id_cert","otisk","dat_od","dat_do","aktivita"]},[gridFormat]:newGridFormat().addTextColumn({name: "ixs_cau", caption: "jres:30027520", width: 300, forced: true}).addTextColumn({name: "jmeno", caption: "jres:30027523", width: 300}).addTextColumn({name: "id_cert", caption: "jres:30027519", width: 300}).addTextColumn({name: "otisk", caption: "jres:30027525", width: 300}).addDateTimeColumn({name: "dat_od", caption: "jres:30027515", width: 150}).addDateTimeColumn({name: "dat_do", caption: "jres:30027514", width: 150}).addNumberColumn({name: "aktivita", caption: "jres:29924152", width: 150})};};

// GReaderWflsksl.fields.js
Readers.AdmWflsksl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflsksl",keys:["komb_sluzeb"],[columns]:["komb_sluzeb", "komb_sluzeb_txt", "aktivita", "dat_zmena", "zmenu_prov", "filtr_format"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdmWflsksl.inheritsFrom(ReadersBase);
Fields.admWflsksl = (prefabOptions) => { return {data:new Readers.AdmWflsksl(),[itemTemplate]:"<b>{komb_sluzeb_txt:trim:encode}</b> - {nazev:trim:encode}",[helperColumns]:["komb_sluzeb", "komb_sluzeb_txt"],[graphicInput]:"oninput"};};

//INCLUDE fieldGlobalFunctions.fields.js
var Forms = namespace("Gordic.Prefabs.Selector.Forms");
var FilterForms = namespace("Gordic.Prefabs.Selector.FilterForms");
var SubTasks = namespace("Gordic.Prefabs.Selector.SubTasks");
var FieldFunction = namespace("Gordic.Prefabs.Utils");


var defSeparator = " | ";
var simSeparator = " - ";
var iconBuilder;

$.extend(FieldFunction, {
    getRangeString: function (first, second) {
        var result = "";

        if (first === second) {
            result = first;
        }
        else if (first && second) {
            result = first + " - " + second;
        }
        else if (first) {
            result = "od " + first;
        }
        else {
            result = "do " + second;
        }
        return result;
    },

    getDatum: function (datum) {
        var date = new Date(datum);
        return date.toLocaleDateString();
    },
    getDateFromTo: function(fromDate, toDate)
    {
        return this.getRangeString(this.getDatum(fromDate), this.getDatum(toDate));
    },
    isEmpty: function(value)
    {
        if (value == null) return true;
        var str = value.toString();
        return !str || str.length === 0 || /^\s*$/.test(str);
    },
    getFormatedString: function (values, separator)
    {
        var _this = this;
        return values.filter(function (it) { return !!_this.getTrimEncodeString(it); }).join(separator);
    },
    /* options: "fb" - prvni tucne, "sb" - druhe tucne, vse ostatni - bez zvyrazneni */
    getSimpleInfoString: function (info, more, options)
    {
        info = info == null ? "" : this.getTrimEncodeString(info);
        more = more == null ? "" : this.getTrimEncodeString(more);

        if (options === "fb") return ("<b>{0}</b>{1}").format(info, this.isEmpty(more) ? "" : simSeparator + more ); //first bold
        else if (options === "sb") return ("{0}{1}").format(info, this.isEmpty(more) ? "" : simSeparator + "<b>" + more + "</b>"); //second bold

        else {
            return ("{0}{1}").format(info, this.isEmpty(more) ? "" : simSeparator + more); //no bold       
        }
    },
    getFormatedLabeledString: function (dictionary) {
        var formatedLabeledString = ""; 
        for (var key in dictionary) {
            if (!this.isEmpty(dictionary[key])) {
                formatedLabeledString += (defSeparator + "{0}: {1}").format(key, this.getTrimEncodeString(dictionary[key]));
            }
        }

        return formatedLabeledString.replace(/^\s*\|/g, "").trim();
    },
    getInfoStr: function(obj) {
        var headInfo = this.getTrimEncodeString(obj.info);
        var moreInfoTxt = obj.more;
        return ("<b>{0}</b><span class=\"moreInfo\">{1}</span>").format(headInfo, this.isEmpty(moreInfoTxt) ? "" : defSeparator + moreInfoTxt);
    },
    /**
    * Vraci encodovane obe hodnoty
    */
    getInfoStrEncode: function (obj) {
        var headInfo = this.getTrimEncodeString(obj.info);
        var moreInfoTxt = obj.more;
        return ("<b>{0}</b><span class=\"moreInfo\">{1}</span>").format(headInfo, this.isEmpty(moreInfoTxt) ? "" : defSeparator + this.getTrimEncodeString(moreInfoTxt));
    },
    /**
    * Vraci neencodovane hodnoty - jiz byly encodovany
    */
    getInfoNoEncodeStr: function (obj) { 
        var headInfo = obj.info;
        var moreInfoTxt = obj.more;
        return ("<b>{0}</b><span class=\"moreInfo\">{1}</span>").format(headInfo, this.isEmpty(moreInfoTxt) ? "" : defSeparator + moreInfoTxt);
    },
    getTrimEncodeString: function (val)
    {
        if (typeof val !== "string") return val;
        return Gordic.Templates.Formatters.encode(Gordic.Templates.Formatters.trim(val));
    },

    getDoubleLineInfo: function (obj) {
        if (iconBuilder == null) iconBuilder = new Gordic.Utils.IconBuilder();
        return "<div class='doubleLineInfo'><div class='iconInfo'>{0}</div><div class='mainInfo'>{1}<br>{2}</div></div>".format(
            obj.icon ? typeof obj.icon === "string" && obj.icon.startsWith("<") ? obj.icon : iconBuilder.createIcon(obj.icon) : "",
            obj != null && obj.infoElement != null ? obj.infoElement : "<b>{0}</b>".format(this.getTrimEncodeString(obj.info != null ? obj.info : "")),
            obj != null && obj.moreElement != null ? obj.moreElement : "<span class='moreInfo'>{0}</span>".format(this.getTrimEncodeString(obj.more != null ? obj.more : "")) );        
    },

    getSingleLineInfo: function (obj) {
        if (iconBuilder == null) iconBuilder = new Gordic.Utils.IconBuilder();
        return "{0} {1}".format(
            obj.icon ? typeof obj.icon === "string" && obj.icon.startsWith("<") ? obj.icon : iconBuilder.createIcon(obj.icon) : "",
            obj != null && obj.infoElement != null ? obj.infoElement : this.getTrimEncodeString(obj.info != null ? obj.info : ""));
    },

    //30.1.2020 - pnovak - funkce určená POUZE pro generování v MAKARECH
    /**
     * funkce určená POUZE pro generování v MAKARECH
     * @param {HtmlElement} fieldElem policko
     * @param {any} selectorOptions options selelektoru
     * @returns {JQueryPromise<any>} promise selektoru
     */
    _showSelectorGen: function (fieldElem, selectorOptions) {

        var field = $(fieldElem).gfield("instance");
        var selectorPromise = new Selectors.DefaultSelector(selectorOptions).show();
        selectorPromise
            .always(function () {
                if (document.activeElement === document.body) {
                    field.focus();
                }
            });

        return selectorPromise;
    },
    createAktivitaIconTemplate: function (aktivita) {
        var text = "";
        var icon = "";
        switch (aktivita) {
            case 100:
                text = "jres:33000018"; //RC 33000018 : Aktivní
                icon = "fa-check-circle g-state-text g-state-success"
                break;
            case 300:
                text = "jres:33000019"; //RC 33000019 : Připraven
                icon = "fa-exclamation-triangle g-state-text g-state-info";
                break;
            case 500:
                text = "jres:33000020"; //RC 33000020 : Neaktivní
                icon = "fa-exclamation-triangle g-state-text g-state-warning";
                break;
            case 600:
                text = "jres:33000021" //RC 33000021 : Návrh
                icon = "fa-exclamation-triangle g-state-text g-state-info";
                break;
            case 900:
                text = "jres:33000022" //RC 33000022 : Zrušen
                icon = "fa-times-circle g-state-text g-state-error";
                break;
            default:
                text = ""
                icon = ""
                break;
        }
        return { icon: icon, text: text, tooltip: text };
    },
    createAktivitaTxt: function (aktivita) {
        switch (aktivita) {
            case 100:
                return "jres:33000018".toLowerCase(); //RC 33000018 : Aktivní
            case 300:
                return "jres:33000019".toLowerCase(); //RC 33000019 : Připraven
            case 500:
                return "jres:33000020".toLowerCase(); //RC 33000020 : Neaktivní
            case 600:
                return "jres:33000021".toLowerCase() //RC 33000021 : Návrh
            case 900:
                return "jres:33000022".toLowerCase() //RC 33000022 : Zrušen
            default:
                return ""
        }
    },
    createDatOdDoIconTemplate: function (dat_od, dat_do) {
        var color = "";
        var text = "";
        var currentDateTime = new Date();
        if (dat_od && !dat_do) {
            var datOd = new Date(dat_od);
            if (datOd > currentDateTime) {
                color = "g-state-info";
                text = "jres:33000023"; //RC 33000023 : Před platností
            } else {
                color = "g-state-success";
                text = "jres:33000024" //RC 33000024 : Platné
            }
        } else if (!dat_od && dat_do) {
            var datDo = new Date(dat_do);
            if (datDo > currentDateTime) {
                color = "g-state-success";
                text = "jres:33000024" //RC 33000024 : Platné
            }
            else {
                color = "g-state-warning";
                text = "jres:33000025" //RC 33000025 : Po platnosti
            }
        } else if (dat_od && dat_do) {
            var datOd = new Date(dat_od);
            var datDo = new Date(dat_do);
            if (datOd > currentDateTime) {
                color = "g-state-info";
                text = "jres:33000023"; //RC 33000023 : Před platností
            }
            else if (datOd < currentDateTime && datDo > currentDateTime) {
                color = "g-state-success";
                text = "jres:33000024" //RC 33000024 : Platné
            }
            else {
                color = "g-state-warning";
                text = "jres:33000025" //RC 33000025 : Po platnosti
            }
        }
        if (color != "")
            return { icon: `gi-time g-state-text ${color}`, text: text }
        else 
            return { icon: "", text: ""}
    }
});


})(jQuery);

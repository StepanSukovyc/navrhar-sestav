"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Sml.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const cached = "cached"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const helperItemTemplate = "helperItemTemplate"; const graphicInput = "graphicInput"; const selector = "selector"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const dropdown = "dropdown"; const doNotSearch = "doNotSearch"; const filterPanelOpts = "filterPanelOpts";

// Gordic.Sml.Client.GReaderSmlapidSml.fields.js
Readers.SmlapidSml = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlapidSml",keys:["ixp_sml_pri"],[columns]:["ixp_sml_pri", "ac_sml", "popis"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SmlapidSml.inheritsFrom(ReadersBase);
Fields.smlapidSml = (prefabOptions) => { return {data:new Readers.SmlapidSml(),[itemTemplate]:function (row) { return "{0}  <i>EČ: {1}<br>{2}</i>".format(row.ixp_sml_pri, row.ac_sml, row.popis); },[helperColumns]:["ixp", "ac_sml", "popis"],[helperItemTemplate]:function (row) { return "{0}  <i>EČ: {1}  Popis: {2}</i>".format(row.ixp_sml_pri, row.ac_sml, row.popis); },[graphicInput]:"oninput",[selector]:(options) => newDefaultSelector($.extend(Selectors.smlapidSml(),prefabOptions,options)).show()};};
Selectors.smlapidSml = () => { return {data:new Readers.SmlapidSml(),[userSettings]:usRoot+"smlapidSml",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixp", "ac_sml", "popis"]},[gridFormat]:newGridFormat().addTextColumn({name: "ixp_sml_pri", caption: "jres:24100001", width: 110, forced: true}).addTextColumn({name: "ac_sml", caption: "jres:24100003", width: 120}).addTextColumn({name: "popis", caption: "jres:24100004", width: 200})};};

// Gordic.Sml.Client.GReaderSmlcpop.fields.js
Readers.Smlcpop = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlcpop",keys:["priz_opce"],[columns]:["priz_opce","priz_opce_txt","priz_opce_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Smlcpop.inheritsFrom(ReadersBase);
Fields.smlcpop = (prefabOptions) => { return {data:new Readers.Smlcpop(),[dropdown]:true,[itemTemplate]:"{priz_opce_txt}",[helperColumns]:["priz_opce_txt", "priz_opce_zkr"]};};

// Gordic.Sml.Client.GReaderSmlcprz.fields.js
Readers.Smlcprz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlcprz",keys:["priz_zaz"],[columns]:["priz_zaz","priz_zaz_txt"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.Smlcprz.inheritsFrom(ReadersBase);
Fields.smlcprz = (prefabOptions) => { return {data:new Readers.Smlcprz(),[dropdown]:true,[itemTemplate]:"{priz_zaz_txt}",[helperColumns]:["priz_zaz_txt"]};};

// Gordic.Sml.Client.GReaderSmlcsta.fields.js
Readers.Smlcsta = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlcsta",keys:["sml_stav"],[columns]:["sml_stav","sml_stav_txt","sml_stav_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Smlcsta.inheritsFrom(ReadersBase);
Fields.smlcsta = (prefabOptions) => { return {data:new Readers.Smlcsta(),[dropdown]:true,[itemTemplate]:"{sml_stav_txt}",[helperColumns]:["sml_stav_txt","sml_stav_zkr"]};};

// Gordic.Sml.Client.GReaderSmlEsuVerZak.fields.js
Readers.SmlEsuVerZak = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlEsuVerZak",keys:["ixs_esu","ixp_nab","por_cis_nab"],[columns]:["ico","nazev","obec","zkratka","dic","bu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SmlEsuVerZak.inheritsFrom(ReadersBase);
Fields.smlEsuVerZak = (prefabOptions) => { return {data:new Readers.SmlEsuVerZak(),[itemTemplate]:"{nazev}",[helperColumns]:["ico","nazev","obec","zkratka","dic","bu_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.smlEsuVerZak(),prefabOptions,options)).show()};};
Selectors.smlEsuVerZak = () => { return {data:new Readers.SmlEsuVerZak(),[gridOpts]:{
		searchColumns: ["ico", "nazev", "obec", "zkratka", "dic", "bu_txt"]
	},[gridFormat]:new Gordic.Data.GridFormat()
				.addTextColumn({ name: "naz_prj", caption: "Název projektu", width: 125/*, hidden: !(typ_ag_blok === Sml.Globals.Enums.TypAg.VFP)*/ })
		.addTextColumn({ name: "ico", caption: "IČO", width: 80 })
		.addTextColumn({ name: "nazev", caption: "Název subjektu", width: 200 })
		.addTextColumn({ name: "obec", caption: "Obec", width: 200 })
		.addTextColumn({ name: "zkratka", caption: "Zkratka", width: 100 })
		.addTextColumn({ name: "dic", caption: "DIČ", width: 100 })
		.addTextColumn({ name: "bu_txt", caption: "Bankovní účet", width: 150 }),[userSettings]:usRoot+"smlEsuVerZak",[isolatedUserSettings]:true};};

// Gordic.Sml.Client.GReaderSmlSoutez.fields.js
Readers.SmlSoutez = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlSoutez",keys:["soutez"],[columns]:["soutez","soutez_txt"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SmlSoutez.inheritsFrom(ReadersBase);
Fields.smlSoutez = (prefabOptions) => { return {data:new Readers.SmlSoutez(),[itemTemplate]:"{soutez_txt}",[helperColumns]:["soutez","soutez_txt"]};};

// Gordic.Sml.Client.GReaderSmlspid.fields.js
Readers.Smlspid = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlspid",keys:["ixp"],[columns]:["ixp","ac","ac_sml","popis"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Smlspid.inheritsFrom(ReadersBase);
Fields.smlspid = (prefabOptions) => { return {data:new Readers.Smlspid(),[itemTemplate]:function (row) { return "{0}  <i>AČ: {1}  EČ: {2}<br>{3}</i>".format(row.ixp, row.ac, row.ac_sml, row.popis); },[helperColumns]:["ixp", "ac", "ac_sml", "popis"],[helperItemTemplate]:function (row) { return "{0}  <i>AČ: {1}  EČ: {2}  Popis: {3}</i>".format(row.ixp, row.ac, row.ac_sml, row.popis); },[graphicInput]:"oninput",[selector]:(options) => newDefaultSelector($.extend(Selectors.smlspid(),prefabOptions,options)).show()};};
Selectors.smlspid = () => { return {data:new Readers.Smlspid(),[userSettings]:usRoot+"smlspid",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixp", "ac", "ac_sml", "popis"]},[gridFormat]:newGridFormat().add({name: "ixp", caption: "jres:24100001", width: 110, forced: true}).addTextColumn({name: "ac", caption: "jres:24100002", width: 120}).addTextColumn({name: "ac_sml", caption: "jres:24100003", width: 120}).addTextColumn({name: "sml_stav_zkr", caption: "jres:24100010", width: 80}).addTextColumn({name: "ixs_typ_txt", caption: "jres:24100005", width: 200}).addTextColumn({name: "popis", caption: "jres:24100004", width: 200}).addTextColumn({name: "mena_zkr", caption: "jres:24100007", width: 80}).addNumberColumn({name: "c_mena", caption: "jres:24100009", width: 120}).addNumberColumn({name: "c_mena_doc", caption: "jres:24100008", width: 120}).addDateTimeColumn({name: "dat_prij_pod", caption: "jres:24100011", width: 80}).addTextColumn({name: "ixp_den_txt", caption: "jres:24100006", width: 150})};};

// GReaderSmlcsts.fields.js
Readers.Smlcsts = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlcsts",keys:["sgn_stav"],[columns]:["sgn_stav","sgn_stav_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Smlcsts.inheritsFrom(ReadersBase);
Fields.smlcsts = (prefabOptions) => { return {data:new Readers.Smlcsts(),[dropdown]:true,[itemTemplate]:"{sgn_stav_txt}",[helperColumns]:["sgn_stav_txt"]};};

// GReaderSmlctpl.fields.js
Readers.Smlctpl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlctpl",keys:["typ_platnost"],[columns]:["typ_platnost","typ_platnost_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Smlctpl.inheritsFrom(ReadersBase);
Fields.smlctpl = (prefabOptions) => { return {data:new Readers.Smlctpl(),[dropdown]:true,[itemTemplate]:"{typ_platnost_txt}",[helperColumns]:["typ_platnost_txt"]};};

// GReaderSmlctyc.fields.js
Readers.Smlctyc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlctyc",keys:["typ_ceny"],[columns]:["typ_ceny","typ_ceny_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Smlctyc.inheritsFrom(ReadersBase);
Fields.smlctyc = (prefabOptions) => { return {data:new Readers.Smlctyc(),[dropdown]:true,[itemTemplate]:"{typ_ceny_txt}",[helperColumns]:["typ_ceny_txt"]};};

// GReaderSmlctyk.fields.js
Readers.Smlctyk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlctyk",keys:["typ_kurz"],[columns]:["typ_kurz","typ_kurz_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Smlctyk.inheritsFrom(ReadersBase);
Fields.smlctyk = (prefabOptions) => { return {data:new Readers.Smlctyk(),[dropdown]:true,[itemTemplate]:"{typ_kurz_txt}",[helperColumns]:["typ_kurz_txt"]};};

// GReaderSmlczuk.fields.js
Readers.Smlczuk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlczuk",keys:["ktg_zuk"],[columns]:["ktg_zuk","ktg_zuk_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Smlczuk.inheritsFrom(ReadersBase);
Fields.smlczuk = (prefabOptions) => { return {data:new Readers.Smlczuk(),[dropdown]:true,[itemTemplate]:"{ktg_zuk_txt}",[helperColumns]:["ktg_zuk_txt"]};};

// GReaderSmlFunVyriz.fields.js
Readers.SmlFunVyriz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlFunVyriz",keys:["ixs_fun"],[columns]:["ixs_fun", "nazev_ref", "nazev_rf", "nazev", "cs_nazev", "ixs_orj"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SmlFunVyriz.inheritsFrom(ReadersBase);
Fields.smlFunVyriz = (prefabOptions) => { return {data:new Readers.SmlFunVyriz(),[itemTemplate]:"{nazev_ref:trim:encode}, {nazev:trim:encode}",[helperColumns]:["nazev_ref", "nazev"]};};

// GReaderSmlKniha.fields.js
Readers.SmlKniha = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlKniha",keys:["ixp_den","subrada"],[columns]:["nazev","ixp_den","subrada","id","rok","ktg_den"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SmlKniha.inheritsFrom(ReadersBase);
Fields.smlKniha = (prefabOptions) => { return {data:new Readers.SmlKniha(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GReaderSmlKomp.fields.js
Readers.SmlKomp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlKomp",keys:["ixs_fun"],[columns]:["nazev_rf", "nazev", "ixs_orj"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SmlKomp.inheritsFrom(ReadersBase);
Fields.smlKomp = (prefabOptions) => { return {data:new Readers.SmlKomp(),[itemTemplate]:"{nazev_rf:trim:encode}",[helperColumns]:["nazev_rf", "nazev"],[helperItemTemplate]:"{nazev_rf:trim:encode} - {nazev:trim:encode}"};};

// GReaderSmlOrj.fields.js
Readers.SmlOrj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlOrj",keys:["ixs_orj"],[columns]:["ixs_orj","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SmlOrj.inheritsFrom(ReadersBase);
Fields.smlOrj = (prefabOptions) => { return {data:new Readers.SmlOrj(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"]};};

// GReaderSmlRefAll.fields.js
Readers.SmlRefAll = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlRefAll",keys:["ixs_ref"],[columns]:["ixs_ref","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SmlRefAll.inheritsFrom(ReadersBase);
Fields.smlRefAll = (prefabOptions) => { return {data:new Readers.SmlRefAll(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderSmlVepsdup.fields.js
Readers.SmlVepsdup = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlVepsdup",keys:["ixs_dup"],[columns]:["ktg_poz_txt","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SmlVepsdup.inheritsFrom(ReadersBase);
Fields.smlVepsdup = (prefabOptions) => { return {data:new Readers.SmlVepsdup(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.smlVepsdup(),prefabOptions,options)).show()};};
Selectors.smlVepsdup = () => { return {data:new Readers.SmlVepsdup(),[userSettings]:usRoot+"smlVepsdup",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "ktg_poz_txt", caption: "jres:26600001", width: 100, forced: true}).addTextColumn({name: "nazev", caption: "jres:26600002", width: 100})};};

// GReaderSmlAcVerZak.fields.js
Readers.SmlAcVerZak = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlAcVerZak",keys:["ixs_pri","typ_ag_blok"],[columns]:["ixs_pri","typ_ag_blok","ac_ver_zak","ac_ag","nazev","soutez","fin_od","fin_do","typ_po","typ_fin"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SmlAcVerZak.inheritsFrom(ReadersBase);

// GReaderSmlRozaaat.fields.js
Readers.SmlRozaaat = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlRozaaat",keys:["ixp","rok","nks","cislo","xuete"],[columns]:["ixp", "cislo", "rok"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SmlRozaaat.inheritsFrom(ReadersBase);

// GReaderCisReal.fields.js
Readers.CisReal = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderCisReal",keys:["ixs_sml_pri","cis_real"],[columns]:["ixs_sml_pri","ico","cis_real","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.CisReal.inheritsFrom(ReadersBase);
Fields.cisReal = (prefabOptions) => { return {data:new Readers.CisReal(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"]};};

// GReaderDdpstpp_vl.fields.js
Readers.Ddpstpp_vl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpstpp_vl",keys:["typ_phl"],[columns]:["typ_phl","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpstpp_vl.inheritsFrom(ReadersBase);
Fields.ddpstpp_vl = (prefabOptions) => { return {data:new Readers.Ddpstpp_vl(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderEkosuvlSml.fields.js
Readers.EkosuvlSml = function(options) { ReadersBase.call(this,{[readerClass]:"Gordic.Sml.Client.GReaderEkosuvlSml",keys:["rok", "bu_vl", "sk_vl"],[columns]:["typ_bu_zkr", "bu_vl", "sk_vl", "bu_txt", "nazev", "uea_uc", "ueb_uc"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.EkosuvlSml.inheritsFrom(ReadersBase);
Fields.ekosuvlSml = (prefabOptions) => { return {data:new Readers.EkosuvlSml(),[itemTemplate]:"{bu_vl:trim:encode} / {sk_vl:trim:encode}",[helperColumns]:["bu_vl", "sk_vl", "nazev", "uea_uc", "ueb_uc"],[helperItemTemplate]:function (row) {
                var moreInfo = Gordic.Prefabs.Utils.getFormatedLabeledString({ "jres:Gordic.ControlsLogic.Client:31850004": row.nazev, "jres:Gordic.ControlsLogic.Client:31850062": row.uea_uc, "jres:Gordic.ControlsLogic.Client:31850063": row.ueb_uc });         var infoText = row.bu_vl + " / " + row.sk_vl;
        return Gordic.Prefabs.Utils.getInfoStr({ "info": infoText, "more": moreInfo });
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosuvlSml(),prefabOptions,options)).show()};};
Selectors.ekosuvlSml = () => { return {data:new Readers.EkosuvlSml(),[gridOpts]:{
        searchColumns: ["typ_bu_zkr", "bu_vl", "sk_vl", "nazev", "ktg_bu_txt", "uus"],
        defaultProfile: {
            columnList: "typ_bu_zkr,bu_vl,sk_vl,nazev,ktg_bu_txt,uus,uea_uc,ueb_uc,uea_rr,ueb_rr"
        }
    },[gridFormat]:[
        { name: "typ_bu_zkr", caption: "jres:Gordic.ControlsLogic.Client:31850006", description: "jres:Gordic.ControlsLogic.Client:31850290", width: 30 },
        { name: "bu_vl", caption: "jres:Gordic.ControlsLogic.Client:31850291", width: 90 },
        { name: "sk_vl", caption: "jres:Gordic.ControlsLogic.Client:31850292", width: 55 },
        { name: "nazev", caption: "jres:Gordic.ControlsLogic.Client:31850287", width: 120 },
        { name: "ktg_bu_txt", caption: "jres:Gordic.ControlsLogic.Client:31850293", width: 120 },
        { name: "uus", caption: Gordic.Consts.DbShortcuts.uus, width: 40 },
        { name: "uea_uc", caption: "jres:Gordic.Sml.Client:33600009", width: 40 },         { name: "ueb_uc", caption: "jres:Gordic.Sml.Client:33600010", width: 40 },         { name: "uea_rr", caption: "jres:Gordic.Sml.Client:33600011", width: 40 },         { name: "ueb_rr", caption: "jres:Gordic.Sml.Client:33600012", width: 40 },                 { name: "uea_lim", caption: "jres:Gordic.Sml.Client:33600013", width: 40 },         { name: "ueb_lim", caption: "jres:Gordic.Sml.Client:33600014", width: 40 },         { name: "priz_sr", caption: "jres:Gordic.Sml.Client:33600015"}         
    ],[userSettings]:usRoot+"ekosuvlSml",[isolatedUserSettings]:true};};

// GReaderEkovabu.fields.js
Readers.Ekovabu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkovabu",keys:["rok","ico","ucs","uea_uc","ueb_uc"],[columns]:["uea", "ueb", "uea_uc", "ueb_uc", "popis", "typ_sa_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekovabu.inheritsFrom(ReadersBase);
Fields.ekovabu = (prefabOptions) => { return {data:new Readers.Ekovabu(),[itemTemplate]:"{uea:trim:encode}",[helperColumns]:["uea"],[selector]:(options) => newDefaultSelector($.extend(Selectors.ekovabu(),prefabOptions,options)).show()};};
Selectors.ekovabu = () => { return {data:new Readers.Ekovabu(),[userSettings]:usRoot+"ekovabu",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["uea"]},[gridFormat]:newGridFormat().addTextColumn({name: "uea", caption: "jres:33600019", width: 120, forced: true}).addTextColumn({name: "ueb", caption: "jres:33600020", width: 120}).addTextColumn({name: "uea_uc", caption: "jres:33600017", width: 120}).addTextColumn({name: "ueb_uc", caption: "jres:33600018", width: 120}).addTextColumn({name: "popis", caption: "jres:33600021", width: 300}).addTextColumn({name: "typ_sa_txt", caption: "jres:33600022", width: 300})};};

// GReaderEsuVerejneZakazce.fields.js
Readers.EsuVerejneZakazce = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEsuVerejneZakazce",keys:["ixp_p"],[columns]:["typ_ag_blok_p","ixp_p","ixs_pri_p"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.EsuVerejneZakazce.inheritsFrom(ReadersBase);
Fields.esuVerejneZakazce = (prefabOptions) => { return {data:new Readers.EsuVerejneZakazce(),[itemTemplate]:"{ixs_pri_p}",[helperColumns]:["ixs_pri_p"],[selector]:(options) => newDefaultSelector($.extend(Selectors.esuVerejneZakazce(),prefabOptions,options)).show()};};
Selectors.esuVerejneZakazce = () => { return {data:new Readers.EsuVerejneZakazce(),[gridOpts]:{
		searchColumns: ["ico", "dic", "esu_txt"]
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "ico", caption: "ico", width: 120 })
		.addTextColumn({ name: "dic", caption: "dic", width: 120 })
		.addTextColumn({ name: "esu_txt", caption: "esu_txt", width: 120 }),[userSettings]:usRoot+"esuVerejneZakazce",[isolatedUserSettings]:true};};

// GReaderMajsmajSml.fields.js
Readers.MajsmajSml = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajsmajSml",keys:["ixs_maj"],[columns]:["ixs_maj", "nazev", "inv_cis", "ser_cis", "evi_cis", "vyr_cis", "skp", "nazev_skp", "drh_id", "skupina_id", "mj", "mat_cis", "sarze"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.MajsmajSml.inheritsFrom(ReadersBase);
Fields.majsmajSml = (prefabOptions) => { return {data:new Readers.MajsmajSml(),[itemTemplate]:"{ixs_maj:trim:encode}",[helperColumns]:["ixs_maj"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majsmajSml(),prefabOptions,options)).show()};};
Selectors.majsmajSml = () => { return {data:new Readers.MajsmajSml(),[gridOpts]:{
		searchColumns: ["ixs_maj"]
	},[userSettings]:usRoot+"majsmajSml",[isolatedUserSettings]:true,[gridFormat]:newGridFormat().addNumberColumn({name: "drh_id", caption: "jres:33600005", width: 55, forced: true}).addNumberColumn({name: "skupina_id", caption: "jres:33600004", width: 55}).addTextColumn({name: "inv_cis", caption: "jres:33600006", width: 120}).addTextColumn({name: "ixs_maj", caption: "jres:33600007", width: 120}).addTextColumn({name: "nazev_skp", caption: "jres:33600008", width: 200})};};

// GReaderMatskcm.fields.js
Readers.Matskcm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMatskcm",keys:["idk"],[columns]:["idk", "ids", "kod_druh", "mat_usk", "mj", "zkratka", "status_nsn", "nsc", "ziv_cyklus"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Matskcm.inheritsFrom(ReadersBase);
Fields.matskcm = (prefabOptions) => { return {data:new Readers.Matskcm(),[itemTemplate]:"{idk:trim:encode}",[helperColumns]:["idk"],[selector]:(options) => newDefaultSelector($.extend(Selectors.matskcm(),prefabOptions,options)).show()};};
Selectors.matskcm = () => { return {data:new Readers.Matskcm(),[gridOpts]:{
        searchColumns: ["idk", "zkratka"]
    },[gridFormat]:new Gordic.Data.GridFormat()
            .addTextColumn({ name: "idk", caption: "Katalogové číslo", width: 55 })
            .addTextColumn({ name: "zkratka", caption: "Zkrácený název", width: 120 })
            .addTextColumn({ name: "mj", caption: "MJ", width: 55 })
            .addTextColumn({ name: "ids", caption: "SKP", width: 55 })
            .addTextColumn({ name: "kod_druh", caption: "kod_druh", width: 55 }),[doNotSearch]:true,[filterPanelOpts]:{
        forms: [
            new Gordic.Forms.Form({tabLabel: "Kompletní filtr"})
                .addSection()
                .addRow("IDK").addField("gstringbox", Gordic.Prefabs.String.withOperators(), {
                    name: "idk", model: "model.idk = value",
                    validators: [new Gordic.Validators.Base({
                        message: "Alespoň v jednom filtru musí být zadáno 6 znaků",
                        errorType: "error",
                        validate: (value, source) => {
                            let zkratka = source.gform().findFields("zkratka").gfield("getValue");
                            return ((value != null && value.length >= 6) || (zkratka != null && zkratka.length >= 6)) 
                        }
                    })]
                })
                .addRow("Zkratka").addField("gstringbox", Gordic.Prefabs.String.withOperators(), {
                    name: "zkratka", model: "model.zkratka = value",
                    validators: [new Gordic.Validators.Base({
                        message: "Alespoň v jednom filtru musí být zadáno 6 znaků",
                        errorType: "error",
                        validate: (value, source) => {

                            let idk = source.gform().findFields("idk").gfield("getValue");
                            return ((idk != null && idk.length >= 6) || (value != null && value.length >= 6))
                        }
                    })]
                })
        ],
        favorites: ["idk", "zkratka"],
        filterPanelOpts: {
            clearFilterButtonVisible: "AlwaysVisible"
        },
        filterViewMode: FilterViewMode.Simple,
        filterStorageService: null,
    },[userSettings]:usRoot+"matskcm",[isolatedUserSettings]:true};};

// GReaderMatsmaj.fields.js
Readers.Matsmaj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMatsmaj",keys:["ixs_maj"],[columns]:["ixs_maj", "nazev", "inv_cis", "vyr_cis", "idk", "idk_kat", "ueab_evi", "cmj", "pmj", "c", "ico", "ucs", "nks", "drh_id", "skupina_id", "tev", "tka", "mat_akt", "mj", "dev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Matsmaj.inheritsFrom(ReadersBase);
Fields.matsmaj = (prefabOptions) => { return {data:new Readers.Matsmaj(),[itemTemplate]:"{inv_cis:trim:encode}",[helperColumns]:["inv_cis"],[selector]:(options) => newDefaultSelector($.extend(Selectors.matsmaj(),prefabOptions,options)).show()};};
Selectors.matsmaj = () => { return {data:new Readers.Matsmaj(),[gridOpts]:{
		searchColumns: ["inv_cis", "nazev"]
	},[gridFormat]:new Gordic.Data.GridFormat()
			.addNumberColumn({ name: "skupina_id", caption: "Skupina", width: 50 })
			.addNumberColumn({ name: "drh_id", caption: "Druh", width: 40 })
			.addNumberColumn({ name: "tev", caption: "TEV", width: 30 })
			.addNumberColumn({ name: "tka", caption: "TKA", width: 30 })
			.addNumberColumn({ name: "dev", caption: "DEV", width: 30 })
			.addTextColumn({ name: "ixs_maj", caption: "Katalogové číslo", width: 80 })
			.addTextColumn({ name: "inv_cis", caption: "Inventární číslo", width: 80 })
			.addTextColumn({ name: "ueab_evi", caption: "SU/AU", width: 60 })
			.addTextColumn({ name: "nazev", caption: "nazev", width: 160 })
			.addTextColumn({ name: "mj", caption: "MJ", width: 40 }),[userSettings]:usRoot+"matsmaj",[isolatedUserSettings]:true};};

// GReaderSmlKalIxsEsuSml.fields.js
Readers.SmlKalIxsEsuSml = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlKalIxsEsuSml",keys:["ixs_esu","ixp_sml_pri"],[columns]:["ico","ixs_esu","ixp_sml_pri","ixp","bu_ci","sk_ci","esu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SmlKalIxsEsuSml.inheritsFrom(ReadersBase);
Fields.smlKalIxsEsuSml = (prefabOptions) => { return {data:new Readers.SmlKalIxsEsuSml(),[itemTemplate]:"{esu_txt:trim:encode}",[helperColumns]:["esu_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.smlKalIxsEsuSml(),prefabOptions,options)).show()};};
Selectors.smlKalIxsEsuSml = () => { return {data:new Readers.SmlKalIxsEsuSml(),[gridOpts]:{
		searchColumns: ["ico", "ixp", "esu_txt"]
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "ico", caption: "IČO", width: 120 })
		.addTextColumn({ name: "ixp", caption: "Identifikátor", width: 120 })
		.addTextColumn({ name: "esu_txt", caption: "Název", width: 120 }),[userSettings]:usRoot+"smlKalIxsEsuSml",[isolatedUserSettings]:true};};

// GReaderSmlsesu.fields.js
Readers.Smlsesu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlsesu",keys:["ixp_sml_pri"],[columns]:["ico_esu","ixs_esu_txt","typ_esu","ixs_esu","sk_ci","bu_ci","ixp","ixp_sml_pri"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Smlsesu.inheritsFrom(ReadersBase);
Fields.smlsesu = (prefabOptions) => { return {data:new Readers.Smlsesu(),[itemTemplate]:"{ixs_esu_txt:trim:encode}",[helperColumns]:["ixs_esu_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.smlsesu(),prefabOptions,options)).show()};};
Selectors.smlsesu = () => { return {data:new Readers.Smlsesu(),[gridOpts]:{
        searchColumns: ["ico_esu", "ixp", "ixs_esu_txt"]
    },[gridFormat]:new Gordic.Data.GridFormat()
            .addTextColumn({ name: "ico_esu", caption: "jres:33600001", width: 55 })             .addTextColumn({ name: "ixp", caption: "jres:33600002", width: 55 })             .addTextColumn({ name: "ixs_esu_txt", caption: "jres:33600003", width: 120 }),[userSettings]:usRoot+"smlsesu",[isolatedUserSettings]:true};};

// GReaderSmlsste.fields.js
Readers.Smlsste = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlsste",keys:["ixs_ste"],[columns]:["ixs_ste", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Smlsste.inheritsFrom(ReadersBase);
Fields.smlsste = (prefabOptions) => { return {data:new Readers.Smlsste(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.smlsste(),prefabOptions,options)).show()};};
Selectors.smlsste = () => { return {data:new Readers.Smlsste(),[userSettings]:usRoot+"smlsste",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "ixs_ste", caption: "jres:33500005", width: 300, forced: true}).addTextColumn({name: "nazev", caption: "jres:33500006", width: 300})};};

// GReaderSmlszuk.fields.js
Readers.Smlszuk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlszuk",keys:["ixs_zuk"],[columns]:["ixs_zuk","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Smlszuk.inheritsFrom(ReadersBase);
Fields.smlszuk = (prefabOptions) => { return {data:new Readers.Smlszuk(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderSmlTypDokladu.fields.js
Readers.SmlTypDokladu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlTypDokladu",keys:["ixs_typ","ktg_den"],[columns]:["nazev","ixs_typ","ktg_typ","st_utaj_id","spis_pl","spis_znak", "zkratka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SmlTypDokladu.inheritsFrom(ReadersBase);
Fields.smlTypDokladu = (prefabOptions) => { return {data:new Readers.SmlTypDokladu(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev", "zkratka"],[helperItemTemplate]:"{nazev:trim:encode}"};};

// GReaderSmlVlastnik.fields.js
Readers.SmlVlastnik = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlVlastnik",keys:["ixs_fun"],[columns]:["ixs_fun","nazev_rf","cs_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SmlVlastnik.inheritsFrom(ReadersBase);
Fields.smlVlastnik = (prefabOptions) => { return {data:new Readers.SmlVlastnik(),[itemTemplate]:"{nazev_rf:trim:encode}",[helperColumns]:["nazev_rf"]};};

// GReaderSmlWflctyv.fields.js
Readers.SmlWflctyv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlWflctyv",keys:["typ_vazby"],[columns]:["typ_vazby_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SmlWflctyv.inheritsFrom(ReadersBase);
Fields.SmlWflctyv = (prefabOptions) => { return {data:new Readers.SmlWflctyv(),[dropdown]:true,[itemTemplate]:"{typ_vazby_txt:trim:encode}",[helperColumns]:["typ_vazby_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.SmlWflctyv(),prefabOptions,options)).show()};};
Selectors.SmlWflctyv = () => { return {data:new Readers.SmlWflctyv(),[userSettings]:usRoot+"SmlWflctyv",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_vazby_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_vazby_txt", caption: "jres:33500004", width: 100, forced: true})};};

// GReaderSmlZastoupenaOsoba.fields.js
Readers.SmlZastoupenaOsoba = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlZastoupenaOsoba",keys:["ixs_esu","lic","por_zast"],[columns]:["ixs_esu", "lic, IsKey = true", "tit_pred", "jmeno", "prijmeni", "tit_za", "funkce"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SmlZastoupenaOsoba.inheritsFrom(ReadersBase);
Fields.SmlZastoupenaOsoba = (prefabOptions) => { return {data:new Readers.SmlZastoupenaOsoba(),[dropdown]:true,[itemTemplate]:"{prijmeni:trim:encode} {jmeno:trim:encode} {tit_pred:trim:encode}",[helperColumns]:["tit_pred", "jmeno", "prijmeni", "tit_za", "funkce"],[helperItemTemplate]:function (row) {
        return "{0} {1} {2} {3} {4}".format(row.tit_pred ? row.tit_pred.trim() : "",
            row.jmeno ? row.jmeno.trim() : "",
            row.prijmeni ? row.prijmeni.trim() : "",
            row.tit_za ? row.tit_za.trim() : "",
            row.funkce ? row.funkce.trim() : "");
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.SmlZastoupenaOsoba(),prefabOptions,options)).show()};};
Selectors.SmlZastoupenaOsoba = () => { return {data:new Readers.SmlZastoupenaOsoba(),[gridOpts]:{
        searchColumns: ["tit_pred", "jmeno", "prijmeni", "tit_za", "funkce" ]
    },[gridFormat]:new Gordic.Data.GridFormat()
            .addTextColumn({ name: "tit_pred", caption: "Titul před", width: 55 })
            .addTextColumn({ name: "jmeno", caption: "Jméno", width: 55 })
            .addTextColumn({ name: "prijmeni", caption: "Přijmení", width: 120 })
            .addTextColumn({ name: "tit_za", caption: "Titul za", width: 40 })
            .addTextColumn({ name: "funkce", caption: "Funkce", width: 40 }),[userSettings]:usRoot+"SmlZastoupenaOsoba",[isolatedUserSettings]:true};};

// GReaderVepssmo.fields.js
Readers.Vepssmo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderVepssmo",keys:["ixp_smo","cis_smo","ixp_sml_pri"],[columns]:["ixp_smo", "cis_smo", "m_sml", "m_obj_sml", "m_maj", "c_sml", "c_obj_sml", "c_maj", "nazev", "ixp_sml_pri", "c_sml_mena_z", "cis_smo_sml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Vepssmo.inheritsFrom(ReadersBase);
Fields.vepssmo = (prefabOptions) => { return {data:new Readers.Vepssmo(),[itemTemplate]:"{cis_smo}",[helperColumns]:["cis_smo"],[selector]:(options) => newDefaultSelector($.extend(Selectors.vepssmo(),prefabOptions,options)).show()};};
Selectors.vepssmo = () => { return {data:new Readers.Vepssmo(),[gridOpts]:{
		searchColumns: ["cis_smo", "nazev"]
	},[gridFormat]:new Gordic.Data.GridFormat()
			.addNumberColumn({ name: "cis_smo", caption: "#", width: 55 })
			.addTextColumn({ name: "nazev_typ", caption: "Typ položky", width: 120 })
			.addTextColumn({ name: "nazev", caption: "Název položky", width: 200 })
			.addTextColumn({ name: "mena_zkr", caption: "Měna", width: 55 })
			.addTextColumn({ name: "m_sml", caption: "Nasmlouvané množství", width: 55 })
			.addCurrencyColumn({ name: "c_sml_mena_z", caption: "Částka v měně", width: 55 })
			.addCurrencyColumn({ name: "c_sml", caption: "Částka v CZK", width: 55 })
			.addTextColumn({ name: "m_obj_sml", caption: "Blokované mn objednávkami", width: 55 })
			.addCurrencyColumn({ name: "c_obj_sml", caption: "Blokovaná částka objednávkami v CZK", width: 55 })
			.addTextColumn({ name: "popis", caption: "Popis", width: 120 }),[userSettings]:usRoot+"vepssmo",[isolatedUserSettings]:true};};

// GReaderVyberPolozky.fields.js
Readers.VyberPolozky = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderVyberPolozky",keys:["ixp","rok","cislo"],[columns]:["ixp","rok","ac","ac_sml","popis","cislo","c","c_rok"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.VyberPolozky.inheritsFrom(ReadersBase);
Fields.vyberPolozky = (prefabOptions) => { return {data:new Readers.VyberPolozky(),[itemTemplate]:"{ixp:trim:encode}",[helperColumns]:["ixp"],[selector]:(options) => newDefaultSelector($.extend(Selectors.vyberPolozky(),prefabOptions,options)).show()};};
Selectors.vyberPolozky = () => { return {data:new Readers.VyberPolozky(),[gridOpts]:{
		searchColumns: ["ixp"]
	},[gridFormat]:new Gordic.Data.GridFormat()
			.addTextColumn({ name: "ixp", caption: "jres:33600023", width: 250 })
			.addTextColumn({ name: "ac", caption: "jres:33600024", width: 250 })
			.addTextColumn({ name: "ac_sml", caption: "jres:33600025", width: 250 })
			.addTextColumn({ name: "popis", caption: "jres:33600026", width: 300 })
			.addNumberColumn({ name: "cislo", caption: "jres:33600027", width: 100 })
			.addCurrencyColumn({ name: "c", caption: "jres:33600028", width: 200 }),[userSettings]:usRoot+"vyberPolozky",[isolatedUserSettings]:true};};

// GReaderVyberUkazatele.fields.js
Readers.VyberUkazatele = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderVyberUkazatele",keys:["ixs_uka","ixs_fun"],[columns]:["ixs_uka","ixs_fun","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.VyberUkazatele.inheritsFrom(ReadersBase);
Fields.vyberUkazatele = (prefabOptions) => { return {data:new Readers.VyberUkazatele(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.vyberUkazatele(),prefabOptions,options)).show()};};
Selectors.vyberUkazatele = () => { return {data:new Readers.VyberUkazatele(),[gridOpts]:{
		searchColumns: ["nazev"]
	},[userSettings]:usRoot+"vyberUkazatele",[isolatedUserSettings]:true,[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:33600016", width: 200, forced: true})};};

//INCLUDE smlAcVerZak.fields.js
Fields.smlAcVerZak = function (userOptions) {
    var result = {
        itemTemplate: "{ac_ver_zak:trim:encode}",
        helperColumns: ["ac_ver_zak"] //, "nks", "xuete", "drd"
    }
    result.data = new Readers.SmlAcVerZak();
    result.selector = function (options) {
        return new Selectors.SmlAcVerZak($.extend({ data: result.data }, userOptions, options)).show();
    };

    return result;
}

Selectors.SmlAcVerZak = CreateClass(Selectors.BaseSelector, {
    _fieldSettings: {},

    _constructor: function (options) {
        this._base({ content: Gordic.Sml.WebClient.GSmlAcVerZak, data: null });

        this._fieldSettings = options;
    },
    
    show: function (options) {
        options = $.extend({}, {
            width: 1200,
            height: 900,
            related: this._fieldSettings.relatedCnt
        }, options);
        
        var def = $.Deferred();
        var gdlg = GDlg;
        gdlg = this._fieldSettings.relatedCnt.dialogs;
        var dlg = gdlg.showModalWindow([this.content, { uid: "smlAcVerZak#" }], { ...this._fieldSettings}, options);

        dlg.on('close', function (ev, retVal) {
            dlg.remove(); // Bohous: kvuli inline dialogu - jinak se na chrome honi focus mezi polickem a bunkou v dialogu az spadne na stackoverflow
            if (retVal) {
                def.resolve(retVal);
            } else {
                def.reject(); //RC 31750001 : Uživatel zrušil nápovědu
            }
        });
        return def.promise();
    }
});

//INCLUDE smlRozaaat.fields.js
Fields.smlRozaaat = function (userOptions) {
    var result = {
        itemTemplate: "{cislo:trim:encode}",
        helperColumns: ["cislo"] //, "nks", "xuete", "drd"
    }
    result.data = new Readers.SmlRozaaat();//-- vytvořit reader
    result.selector = function (options) {
        return new Selectors.SmlRozaaat($.extend({ data: result.data }, userOptions, options)).show();
    };

    return result;
}

Selectors.SmlRozaaat = CreateClass(Selectors.BaseSelector, {
    _fieldSettings: {},

    _constructor: function (options) {
        this._base({ content: Gordic.Sml.WebClient.GSmlRozaaat, data: null });

        this._fieldSettings = options;
    },

    show: function (options) {
        options = $.extend({}, {
            width: 1200,
            height: 900,
            related: this._fieldSettings.relatedCnt
        }, options);

        var def = $.Deferred();
        var gdlg = GDlg;
        gdlg = this._fieldSettings.relatedCnt.dialogs;

        var dlg = gdlg.showModalWindow([this.content, { uid: "smlRozaaat#" }], { ...this._fieldSettings, gridAutoload: true }, options);

        dlg.on('close', function (ev, retVal) {
            dlg.remove(); // Bohous: kvuli inline dialogu - jinak se na chrome honi focus mezi polickem a bunkou v dialogu az spadne na stackoverflow
            if (retVal) {
                def.resolve(retVal);
            } else {
                def.reject(); //RC 31750001 : Uživatel zrušil nápovědu
            }
        });
        return def.promise();
    }
});

})(jQuery);

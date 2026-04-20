"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Ade.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const selector = "selector"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings";

// GReaderAdeEkocakr.fields.js
Readers.AdeEkocakr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeEkocakr",keys:["akt_subrady"],[columns]:["akt_subrady", "akt_subrady_txt", "k_v", "k_s", "k_xml"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdeEkocakr.inheritsFrom(ReadersBase);
Fields.adeEkocakr = (prefabOptions) => { return {data:new Readers.AdeEkocakr(),[itemTemplate]:"{akt_subrady_txt}",[helperColumns]:["akt_subrady_txt"]};};

// GReaderAdeEkoskur.fields.js
Readers.AdeEkoskur = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeEkoskur",keys:["ixp_kur"],[columns]:["ixp_kur", "rada_kur", "cislo", "rok", "mesic", "den", "dat_mpd", "dat_platnost_od", "prep_zp"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeEkoskur.inheritsFrom(ReadersBase);
Fields.adeEkoskur = (prefabOptions) => { return {data:new Readers.AdeEkoskur(),[itemTemplate]:"{den}.{mesic}.{rok} - {rada_kur}",[helperColumns]:["ixp_kur", "rada_kur", "cislo", "rok", "mesic", "den", "dat_mpd", "dat_platnost_od", "prep_zp"],[selector]:(options) => newDefaultSelector($.extend(Selectors.adeEkoskur(),prefabOptions,options)).show()};};
Selectors.adeEkoskur = () => { return {data:new Readers.AdeEkoskur(),[gridOpts]:{
        searchColumns: ["bu_txt", "sk_vl", "rok"]
    },[gridFormat]:new Gordic.Data.GridFormat()
        .addTextColumn({ name: "rada_kur", caption: "Kurzovní  lístek", cellTemplate: (row) => { return row.den.toString() + "." + row.mesic.toString() + "." + row.rok.toString() + " - " + row.rada_kur; }, width: 110 })
        .addNumberColumn({ name: "cislo", caption: "Číslo", width: 90 })
        .addTextColumn({ name: "den", caption: "Den", cellTemplate: (row) => { return row.den.toString() + "." + row.mesic.toString() + "." + row.rok.toString(); }, width: 90 })
        .addTextColumn({ name: "rada_kur", caption: "Řada", width: 110 }),[userSettings]:usRoot+"adeEkoskur",[isolatedUserSettings]:true};};

// GReaderAdeEkosuvl.fields.js
Readers.AdeEkosuvl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeEkosuvl",keys:["rok","bu_vl","sk_vl"],[columns]:["rok","bu_vl","sk_vl","ico","ucs","bu_txt","ktg_bu","aktivita","dat_od","dat_do","uea_lim","ueb_lim","ixs_esu_ban","c_lim","c_kuhr","c_uhr","typ_bu","nazev","zkratka","mena","uea_uc","ueb_uc","subrada_duz","priz_up_bu","ixp_den_buc","sbu","dat_bvy","c_ps","c_rok_db","c_rok_kr","c_zust","druh_bu","cis_bvy","ixp_bvy","c_lim_max","uus","iban","zc_vyp","per_vyp","ur_prist_bu","priz_isprofin","kod_vys","kon_maxlim","par_vyp","c_lim_ban","c_zust_ban","dat_bvy_ban","dat_ttv","priz_sr","id_hdr_ris_kr","radek_hdr_kr","priz_rozp","priz_spol_u","ode_sp","ukl_pri","id_nt_max","fidoo"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeEkosuvl.inheritsFrom(ReadersBase);
Fields.adeEkosuvl = (prefabOptions) => { return {data:new Readers.AdeEkosuvl(),[itemTemplate]:"{bu_txt}",[helperColumns]:["rok", "ico", "ucs", "bu_vl", "sk_vl", "bu_txt", "ktg_bu", "aktivita", "dat_od", "dat_do", "uea_lim", "ueb_lim", "ixs_esu_ban", "c_lim", "c_kuhr", "c_uhr", "typ_bu", "nazev", "zkratka", "mena", "uea_uc", "ueb_uc", "subrada_duz", "priz_up_bu", "ixp_den_buc", "sbu", "dat_bvy", "c_ps", "c_rok_db", "c_rok_kr", "c_zust", "druh_bu", "cis_bvy", "ixp_bvy", "c_lim_max", "uus", "iban", "zc_vyp", "per_vyp", "ur_prist_bu", "priz_isprofin", "kod_vys", "kon_maxlim", "par_vyp", "c_lim_ban", "c_zust_ban", "dat_bvy_ban", "dat_ttv", "priz_sr", "id_hdr_ris_kr", "radek_hdr_kr", "priz_rozp", "priz_spol_u", "ode_sp", "ukl_pri", "id_nt_max", "fidoo"],[selector]:(options) => newDefaultSelector($.extend(Selectors.adeEkosuvl(),prefabOptions,options)).show()};};
Selectors.adeEkosuvl = () => { return {data:new Readers.AdeEkosuvl(),[gridOpts]:{
        searchColumns: ["bu_txt", "sk_vl", "rok"]
    },[gridFormat]:new Gordic.Data.GridFormat()
        .addTextColumn({ name: "bu_txt", caption: "Bankovní účet", width: 110 })
        .addNumberColumn({ name: "rok", caption: "Rok", width: 90 }),[userSettings]:usRoot+"adeEkosuvl",[isolatedUserSettings]:true};};

// GReaderAdeFucstup.fields.js
Readers.AdeFucstup = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeFucstup",keys:["typ_upr"],[columns]:["typ_upr", "nazev_upr", "ktg_tup", "typ_zauc", "ktg_typ", "aktivita", "real_upr", "k_v", "k_k", "cs_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeFucstup.inheritsFrom(ReadersBase);
Fields.adeFucstup = (prefabOptions) => { return {data:new Readers.AdeFucstup(),[itemTemplate]:"{nazev_upr}",[helperColumns]:["typ_upr", "nazev_upr", "ktg_tup", "typ_zauc", "ktg_typ", "aktivita", "real_upr", "k_v", "k_k", "cs_nazev"]};};

// GReaderAdeGinspod.fields.js
Readers.AdeGinspod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeGinspod",keys:["ixs_su"],[columns]:["ixs_su", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeGinspod.inheritsFrom(ReadersBase);
Fields.adeGinspod = (prefabOptions) => { return {data:new Readers.AdeGinspod(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.adeGinspod(),prefabOptions,options)).show()};};
Selectors.adeGinspod = () => { return {data:new Readers.AdeGinspod(),[userSettings]:usRoot+"adeGinspod",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().add({name: "nazev", caption: "jres:23920040", width: 25, forced: true}).add({name: "ico", caption: "jres:23920041", width: 10}).addTextColumn({name: "ucs", caption: "jres:23920042", width: 10}).addNumberColumn({name: "rok", caption: "jres:23920043", width: 10}).add({name: "lic", caption: "jres:23920044", width: 10})};};

// GReaderAdeMzacktd.fields.js
Readers.AdeMzacktd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeMzacktd",keys:["ktg_den"],[columns]:["ktg_den", "ktg_den_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdeMzacktd.inheritsFrom(ReadersBase);
Fields.adeMzacktd = (prefabOptions) => { return {data:new Readers.AdeMzacktd(),[itemTemplate]:"{ktg_den_txt}",[helperColumns]:["ktg_den_txt"]};};

// GReaderAdePsccktd.fields.js
Readers.AdePsccktd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdePsccktd",keys:["ktg_den"],[columns]:["ktg_den", "ktg_den_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdePsccktd.inheritsFrom(ReadersBase);
Fields.adePsccktd = (prefabOptions) => { return {data:new Readers.AdePsccktd(),[itemTemplate]:"{ktg_den_txt}",[helperColumns]:["ktg_den", "ktg_den_txt", "k_v", "k_s"]};};

// GReaderAdePscctna.fields.js
Readers.AdePscctna = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdePscctna",keys:["ktg_tna"],[columns]:["ktg_tna", "ktg_tna_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdePscctna.inheritsFrom(ReadersBase);
Fields.adePscctna = (prefabOptions) => { return {data:new Readers.AdePscctna(),[itemTemplate]:"{ktg_tna_txt}",[helperColumns]:["ktg_tna", "ktg_tna_txt", "k_v", "k_s"]};};

// GReaderAdePscctyp.fields.js
Readers.AdePscctyp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdePscctyp",keys:["typ_poz"],[columns]:["typ_poz", "typ_poz_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdePscctyp.inheritsFrom(ReadersBase);
Fields.adePscctyp = (prefabOptions) => { return {data:new Readers.AdePscctyp(),[itemTemplate]:"{typ_poz_txt}",[helperColumns]:["typ_poz", "typ_poz_txt", "k_v", "k_s"]};};

// GReaderAdePscczpd.fields.js
Readers.AdePscczpd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdePscczpd",keys:["zp_dopr"],[columns]:["zp_dopr", "zp_dopr_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdePscczpd.inheritsFrom(ReadersBase);
Fields.adePscczpd = (prefabOptions) => { return {data:new Readers.AdePscczpd(),[itemTemplate]:"{zp_dopr_txt}",[helperColumns]:["zp_dopr", "zp_dopr_txt", "k_v", "k_s"]};};

// GReaderAdePscczpv.fields.js
Readers.AdePscczpv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdePscczpv",keys:["zp_vyp","typ_poz"],[columns]:["zp_vyp", "zp_vyp_txt", "k_v", "k_s", "typ_poz"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdePscczpv.inheritsFrom(ReadersBase);
Fields.adePscczpv = (prefabOptions) => { return {data:new Readers.AdePscczpv(),[itemTemplate]:"{zp_vyp_txt}",[helperColumns]:["zp_vyp", "zp_vyp_txt", "k_v", "k_s", "typ_poz"]};};

// GReaderAdePscrdac.fields.js
Readers.AdePscrdac = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdePscrdac",keys:["ixp_den","subrada"],[columns]:["ixp_den", "subrada", "zkratka", "nazev", "akt_subrady", "ac_cislo_do", "ac_cislo_od", "ac_cislo_max", "mesic", "ixs_su"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdePscrdac.inheritsFrom(ReadersBase);
Fields.adePscrdac = (prefabOptions) => { return {data:new Readers.AdePscrdac(),[itemTemplate]:"{zkratka}",[helperColumns]:["ixp_den", "subrada", "zkratka", "nazev", "akt_subrady", "ac_cislo_do", "ac_cislo_od", "ac_cislo_max", "mesic", "ixs_su"]};};

// GReaderAdePscscle.fields.js
Readers.AdePscscle = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdePscscle",keys:["ixs_cle"],[columns]:["ixs_cle", "nazev", "kod_cle", "poznamka", "uea", "ueb", "uec", "ued", "uee", "uef", "ueg", "ueh", "uei", "uej", "te0", "te1", "te2", "te3", "te4", "aktivita", "uek", "uel", "uem", "uen", "te5", "te6", "te7", "te8", "te9"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdePscscle.inheritsFrom(ReadersBase);
Fields.adePscscle = (prefabOptions) => { return {data:new Readers.AdePscscle(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_cle", "nazev", "kod_cle", "poznamka", "uea", "ueb", "uec", "ued", "uee", "uef", "ueg", "ueh", "uei", "uej", "te0", "te1", "te2", "te3", "te4", "aktivita", "uek", "uel", "uem", "uen", "te5", "te6", "te7", "te8", "te9"]};};

// GReaderAdePscsden.fields.js
Readers.AdePscsden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdePscsden",keys:["ixp_den"],[columns]:["ixp_den", "lic", "arw", "dat_od", "dat_do", "ico", "ucs", "nazev", "rok", "typ_den", "ktg_den", "por_cislo_max", "subrada_max", "subrada_duz", "len_ac", "krok_uza", "ixp_den_old", "uus", "prefix", "suffix", "poznamka", "aktivita", "rok_sberu", "priz_plan"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdePscsden.inheritsFrom(ReadersBase);
Fields.adePscsden = (prefabOptions) => { return {data:new Readers.AdePscsden(),[itemTemplate]:"{nazev}",[helperColumns]:["ixp_den", "lic", "arw", "dat_od", "dat_do", "ico", "ucs", "nazev", "rok", "typ_den", "ktg_den", "por_cislo_max", "subrada_max", "subrada_duz", "len_ac", "krok_uza", "ixp_den_old", "uus", "prefix", "suffix", "poznamka", "aktivita", "rok_sberu", "priz_plan"]};};

// GReaderAdePscsnkh.fields.js
Readers.AdePscsnkh = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdePscsnkh",keys:["ico","rok"],[columns]:["ico","rok","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdePscsnkh.inheritsFrom(ReadersBase);
Fields.adePscsnkh = (prefabOptions) => { return {data:new Readers.AdePscsnkh(),[itemTemplate]:"{nazev}",[helperColumns]:["ico", "rok", "nazev", "aktivita"]};};

// GReaderAdePscstna.fields.js
Readers.AdePscstna = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdePscstna",keys:["ixs_tna"],[columns]:["ixs_tna", "ktg_tna", "ixs_zpz", "nazev", "dat_od", "dat_do", "aktivita", "kod_tna"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdePscstna.inheritsFrom(ReadersBase);
Fields.adePscstna = (prefabOptions) => { return {data:new Readers.AdePscstna(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_tna", "ktg_tna", "ixs_zpz", "nazev", "dat_od", "dat_do", "aktivita", "kod_tna"]};};

// GReaderAdePscsvna.fields.js
Readers.AdePscsvna = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdePscsvna",keys:["kod_vna"],[columns]:["kod_vna", "ixs_zpz", "nazev", "ixs_tna", "zp_dopr", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdePscsvna.inheritsFrom(ReadersBase);
Fields.adePscsvna = (prefabOptions) => { return {data:new Readers.AdePscsvna(),[itemTemplate]:"{nazev}",[helperColumns]:["kod_vna", "ixs_zpz", "nazev", "ixs_tna", "zp_dopr", "aktivita"]};};

// GReaderAdePscsvpk.fields.js
Readers.AdePscsvpk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdePscsvpk",keys:["ixs_vpk"],[columns]:["ixs_vpk", "aktivita", "nazev", "poznamka", "dat_od", "dat_do", "ico", "ucs"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdePscsvpk.inheritsFrom(ReadersBase);
Fields.adePscsvpk = (prefabOptions) => { return {data:new Readers.AdePscsvpk(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_vpk", "aktivita", "nazev", "poznamka", "dat_od", "dat_do", "ico", "ucs"]};};

// GReaderAdePscszpz.fields.js
Readers.AdePscszpz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdePscszpz",keys:["ixs_zpz"],[columns]:["ixs_zpz", "aktivita", "kod", "zkratka", "nazev", "poznamka", "dat_od", "dat_do", "k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdePscszpz.inheritsFrom(ReadersBase);
Fields.adePscszpz = (prefabOptions) => { return {data:new Readers.AdePscszpz(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_zpz", "aktivita", "kod", "zkratka", "nazev", "poznamka", "dat_od", "dat_do", "k_v"]};};

// GReaderAdePokskon.fields.js
Readers.AdePokskon = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdePokskon",keys:["ixs_kon"],[columns]:["ixs_kon", "aktivita", "kod", "zkratka", "nazev", "poznamka", "dat_od", "dat_do", "mj", "dan_typ", "mena", "typ_kon", "k_v", "ixs_zpz", "pov_vs", "typ_phl", "ixs_kon_zal", "cmj", "ixs_zpz_bhp", "pov_dan", "priz_tzh", "tzh_typ", "ixs_typ", "typ_kon_txt", "rok"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdePokskon.inheritsFrom(ReadersBase);
Fields.adePokskon = (prefabOptions) => { return {data:new Readers.AdePokskon(),[itemTemplate]:"{kod:trim:encode} - {nazev:trim:encode} ({typ_kon:trim:encode} - {typ_kon_txt:trim:encode})",[helperColumns]:["ixs_kon", "aktivita", "kod", "zkratka", "nazev", "poznamka", "dat_od", "dat_do", "mj", "dan_typ", "mena", "typ_kon", "k_v", "ixs_zpz", "pov_vs", "typ_phl", "ixs_kon_zal", "cmj", "ixs_zpz_bhp", "pov_dan", "priz_tzh", "tzh_typ", "ixs_typ"],[selector]:(options) => newDefaultSelector($.extend(Selectors.adePokskon(),prefabOptions,options)).show()};};
Selectors.adePokskon = () => { return {data:new Readers.AdePokskon(),[gridOpts]:{
		searchColumns: ["kod", "nazev", "typ_kon_txt", "rok"]
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "typ_kon", caption: "Typ kontace", width: 80 })
		.addTextColumn({ name: "kod", caption: "Kód", width: 100 })
		.addTextColumn({ name: "nazev", caption: "Název", width: 150 })
		.addTextColumn({ name: "typ_kon_txt", caption: "Název typu kontace", width: 150 })
		.addTextColumn({ name: "ixs_kon", caption: "ID kontace", width: 110 })
		.addNumberColumn({ name: "rok", caption: "Rok", width: 60 }),[userSettings]:usRoot+"adePokskon",[isolatedUserSettings]:true};};

// GReaderAdeRcncdvn.fields.js
Readers.AdeRcncdvn = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRcncdvn",keys:["dvn"],[columns]:["dvn", "dvn_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRcncdvn.inheritsFrom(ReadersBase);
Fields.adeRcncdvn = (prefabOptions) => { return {data:new Readers.AdeRcncdvn(),[itemTemplate]:"{dvn_txt}",[helperColumns]:["dvn", "dvn_txt", "k_v", "k_s"]};};

// GReaderAdeRcncktd.fields.js
Readers.AdeRcncktd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRcncktd",keys:["ktg_den"],[columns]:["ktg_den", "ktg_den_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRcncktd.inheritsFrom(ReadersBase);
Fields.adeRcncktd = (prefabOptions) => { return {data:new Readers.AdeRcncktd(),[itemTemplate]:"{ktg_den_txt}",[helperColumns]:["ktg_den", "ktg_den_txt", "k_v", "k_s"]};};

// GReaderAdeRcncphm.fields.js
Readers.AdeRcncphm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRcncphm",keys:["phm"],[columns]:["phm", "phm_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRcncphm.inheritsFrom(ReadersBase);
Fields.adeRcncphm = (prefabOptions) => { return {data:new Readers.AdeRcncphm(),[itemTemplate]:"{phm_txt}",[helperColumns]:["phm", "phm_txt", "k_v", "k_s"]};};

// GReaderAdeRcncsas.fields.js
Readers.AdeRcncsas = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRcncsas",keys:["usek"],[columns]:["usek", "usek_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRcncsas.inheritsFrom(ReadersBase);
Fields.adeRcncsas = (prefabOptions) => { return {data:new Readers.AdeRcncsas(),[itemTemplate]:"{usek_txt}",[helperColumns]:["usek", "usek_txt", "k_v", "k_s"]};};

// GReaderAdeRcnctna.fields.js
Readers.AdeRcnctna = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRcnctna",keys:["ktg_tna"],[columns]:["ktg_tna", "ktg_tna_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRcnctna.inheritsFrom(ReadersBase);
Fields.adeRcnctna = (prefabOptions) => { return {data:new Readers.AdeRcnctna(),[itemTemplate]:"{ktg_tna_txt}",[helperColumns]:["ktg_tna", "ktg_tna_txt", "k_v", "k_s"]};};

// GReaderAdeRcnctos.fields.js
Readers.AdeRcnctos = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRcnctos",keys:["typ_dos"],[columns]:["typ_dos", "typ_dos_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRcnctos.inheritsFrom(ReadersBase);
Fields.adeRcnctos = (prefabOptions) => { return {data:new Readers.AdeRcnctos(),[itemTemplate]:"{typ_dos_txt}",[helperColumns]:["typ_dos", "typ_dos_txt", "k_v", "k_s"]};};

// GReaderAdeRcnctpo.fields.js
Readers.AdeRcnctpo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRcnctpo",keys:["typ_pozt"],[columns]:["typ_pozt", "typ_pozt_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRcnctpo.inheritsFrom(ReadersBase);
Fields.adeRcnctpo = (prefabOptions) => { return {data:new Readers.AdeRcnctpo(),[itemTemplate]:"{typ_pozt_txt}",[helperColumns]:["typ_pozt", "typ_pozt_txt", "k_v", "k_s"]};};

// GReaderAdeRcncurn.fields.js
Readers.AdeRcncurn = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRcncurn",keys:["urn"],[columns]:["urn", "urn_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRcncurn.inheritsFrom(ReadersBase);
Fields.adeRcncurn = (prefabOptions) => { return {data:new Readers.AdeRcncurn(),[itemTemplate]:"{urn_txt}",[helperColumns]:["urn", "urn_txt", "k_v", "k_s"]};};

// GReaderAdeRcnczpd.fields.js
Readers.AdeRcnczpd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRcnczpd",keys:["zp_dopr"],[columns]:["zp_dopr", "zp_dopr_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRcnczpd.inheritsFrom(ReadersBase);
Fields.adeRcnczpd = (prefabOptions) => { return {data:new Readers.AdeRcnczpd(),[itemTemplate]:"{zp_dopr_txt}",[helperColumns]:["zp_dopr", "zp_dopr_txt", "k_v", "k_s"]};};

// GReaderAdeRcnrdac.fields.js
Readers.AdeRcnrdac = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRcnrdac",keys:["ixp_den","subrada"],[columns]:["ixp_den", "subrada", "zkratka", "nazev", "akt_subrady", "ac_cislo_do", "ac_cislo_od", "ac_cislo_max", "mesic", "ixs_su"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRcnrdac.inheritsFrom(ReadersBase);
Fields.adeRcnrdac = (prefabOptions) => { return {data:new Readers.AdeRcnrdac(),[itemTemplate]:"{zkratka}",[helperColumns]:["ixp_den", "subrada", "zkratka", "nazev", "akt_subrady", "ac_cislo_do", "ac_cislo_od", "ac_cislo_max", "mesic", "ixs_su"]};};

// GReaderAdeRcnsden.fields.js
Readers.AdeRcnsden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRcnsden",keys:["ixp_den"],[columns]:["ixp_den", "lic", "aktivita", "arw", "poznamka", "dat_od", "dat_do", "ico", "ucs", "nazev", "rok", "typ_den", "ktg_den", "por_cislo_max", "subrada_max", "subrada_duz", "len_ac", "krok_uza", "ixp_den_old", "uus", "prefix", "suffix", "uex", "ixp_kur", "ixp_den_sml", "ixs_typ_sml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRcnsden.inheritsFrom(ReadersBase);
Fields.adeRcnsden = (prefabOptions) => { return {data:new Readers.AdeRcnsden(),[itemTemplate]:"{nazev}",[helperColumns]:["ixp_den", "lic", "aktivita", "arw", "poznamka", "dat_od", "dat_do", "ico", "ucs", "nazev", "rok", "typ_den", "ktg_den", "por_cislo_max", "subrada_max", "subrada_duz", "len_ac", "krok_uza", "ixp_den_old", "uus", "prefix", "suffix", "uex", "ixp_kur", "ixp_den_sml", "ixs_typ_sml"]};};

// GReaderAdeRcnsmsm.fields.js
Readers.AdeRcnsmsm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRcnsmsm",keys:["ixs_msm"],[columns]:["ixs_msm", "stat", "nazev", "kod_ustan", "publikace", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRcnsmsm.inheritsFrom(ReadersBase);
Fields.adeRcnsmsm = (prefabOptions) => { return {data:new Readers.AdeRcnsmsm(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_msm", "stat", "nazev", "kod_ustan", "publikace", "aktivita"]};};

// GReaderAdeRcnssna.fields.js
Readers.AdeRcnssna = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRcnssna",keys:["ixs_sna"],[columns]:["ixs_sna", "kod_sna", "nazev_sna", "ixs_zpz", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRcnssna.inheritsFrom(ReadersBase);
Fields.adeRcnssna = (prefabOptions) => { return {data:new Readers.AdeRcnssna(),[itemTemplate]:"{nazev_sna}",[helperColumns]:["ixs_sna", "kod_sna", "nazev_sna", "ixs_zpz", "aktivita"]};};

// GReaderAdeRcnstna.fields.js
Readers.AdeRcnstna = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRcnstna",keys:["ixs_tna"],[columns]:["ixs_tna", "ktg_tna", "ixs_zpz", "nazev", "dat_od", "dat_do", "aktivita", "priz_nah", "kod_tna", "ixs_sna"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRcnstna.inheritsFrom(ReadersBase);
Fields.adeRcnstna = (prefabOptions) => { return {data:new Readers.AdeRcnstna(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_tna", "ktg_tna", "ixs_zpz", "nazev", "dat_od", "dat_do", "aktivita", "priz_nah", "kod_tna", "ixs_sna"]};};

// GReaderAdeRcnstos.fields.js
Readers.AdeRcnstos = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRcnstos",keys:["ixs_tos"],[columns]:["ixs_tos", "nazev", "kod_tos", "poznamka", "typ_dos", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRcnstos.inheritsFrom(ReadersBase);
Fields.adeRcnstos = (prefabOptions) => { return {data:new Readers.AdeRcnstos(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_tos", "nazev", "kod_tos", "poznamka", "typ_dos", "aktivita"]};};

// GReaderAdeRzacktd.fields.js
Readers.AdeRzacktd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRzacktd",keys:["ktg_den"],[columns]:["ktg_den","ktg_den_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRzacktd.inheritsFrom(ReadersBase);
Fields.adeRzacktd = (prefabOptions) => { return {data:new Readers.AdeRzacktd(),[itemTemplate]:"{ktg_den_txt}",[helperColumns]:["ktg_den_txt"]};};

// GReaderAdeSmlsden.fields.js
Readers.AdeSmlsden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeSmlsden",keys:["ixp_den"],[columns]:["ixp_den", "lic", "aktivita", "arw", "poznamka", "dat_od", "dat_do", "ico", "ucs", "nazev", "rok", "typ_den", "ktg_den", "por_cislo_max", "subrada_max", "len_ac", "krok_uza", "ixp_den_old", "prefix", "suffix", "uus"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeSmlsden.inheritsFrom(ReadersBase);
Fields.adeSmlsden = (prefabOptions) => { return {data:new Readers.AdeSmlsden(),[itemTemplate]:"{nazev}",[helperColumns]:["ixp_den", "lic", "aktivita", "arw", "poznamka", "dat_od", "dat_do", "ico", "ucs", "nazev", "rok", "typ_den", "ktg_den", "por_cislo_max", "subrada_max", "len_ac", "krok_uza", "ixp_den_old", "prefix", "suffix", "uus"]};};

// GReaderAdeSslstyp.fields.js
Readers.AdeSslstyp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeSslstyp",keys:["ixs_typ"],[columns]:["ixs_typ", "lic", "aktivita", "arw", "poznamka", "dat_od", "dat_do", "nazev", "ktg_typ", "popis", "st_utaj_id", "lhuta_vyr", "zkratka", "ixs_ulz", "aktivita_ssl", "spis_pl", "spis_znak", "ofic_nazev", "s_gen_cj", "ixs_esu", "ixs_lpc", "z_int", "cs_nazev", "priz_vycet", "ixs_cin", "poc_dnu_vyp_dor", "ixs_typ_opr", "priz_rsp", "ixs_frm_gform", "priz_epk", "predpl_vec", "typ_vazby", "ixp_sablony", "ixs_frm_gform_spi", "priz_dupli", "over_duver", "zakon_duvod_gdpr", "s_dotaz_irp", "plan_zve", "priz_fyz", "ixs_zap", "ixs_fsk", "ico", "id_ext_alt", "ixs_skr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeSslstyp.inheritsFrom(ReadersBase);
Fields.adeSslstyp = (prefabOptions) => { return {data:new Readers.AdeSslstyp(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_typ", "lic", "aktivita", "arw", "poznamka", "dat_od", "dat_do", "nazev", "ktg_typ", "popis", "st_utaj_id", "lhuta_vyr", "zkratka", "ixs_ulz", "aktivita_ssl", "spis_pl", "spis_znak", "ofic_nazev", "s_gen_cj", "ixs_esu", "ixs_lpc", "z_int", "cs_nazev", "priz_vycet", "ixs_cin", "poc_dnu_vyp_dor", "ixs_typ_opr", "priz_rsp", "ixs_frm_gform", "priz_epk", "predpl_vec", "typ_vazby", "ixp_sablony", "ixs_frm_gform_spi", "priz_dupli", "over_duver", "zakon_duvod_gdpr", "s_dotaz_irp", "plan_zve", "priz_fyz", "ixs_zap", "ixs_fsk", "ico", "id_ext_alt", "ixs_skr"]};};

// GReaderAdeUctddde.fields.js
Readers.AdeUctddde = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeUctddde",keys:["rok","ico","subrada"],[columns]:["rok", "ico", "subrada", "zkratka", "nazev", "aktivita", "ac_cislo_do", "ac_cislo_od", "mesic_od"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeUctddde.inheritsFrom(ReadersBase);
Fields.adeUctddde = (prefabOptions) => { return {data:new Readers.AdeUctddde(),[itemTemplate]:"{subrada}",[helperColumns]:["rok", "ico", "subrada", "zkratka", "nazev", "aktivita", "ac_cislo_do", "ac_cislo_od", "mesic_od"],[selector]:(options) => newDefaultSelector($.extend(Selectors.adeUctddde(),prefabOptions,options)).show()};};
Selectors.adeUctddde = () => { return {data:new Readers.AdeUctddde(),[gridOpts]:{
        searchColumns: ["bu_txt", "sk_vl", "rok"]
    },[gridFormat]:new Gordic.Data.GridFormat()
        .addTextColumn({ name: "ico", caption: "I�o", width: 110 })
        .addNumberColumn({ name: "rok", caption: "Rok", width: 90 })
        .addNumberColumn({ name: "subrada", caption: "Sub�ada", width: 90 })
        .addTextColumn({ name: "nazev", caption: "N�zev", width: 110 }),[userSettings]:usRoot+"adeUctddde",[isolatedUserSettings]:true};};

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

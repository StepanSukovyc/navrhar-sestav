"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Buc.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const dropdown = "dropdown"; const selector = "selector"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings";

// Gordic.Buc.Client.GReaderBuccbvyX.fields.js
Readers.BuccbvyX = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBuccbvyX",keys:["s_bvy"],[columns]:["s_bvy","s_bvy_txt","s_bvy_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.BuccbvyX.inheritsFrom(ReadersBase);
Fields.buccbvyX = (prefabOptions) => { return {data:new Readers.BuccbvyX(),[itemTemplate]:"{s_bvy_txt}",[helperColumns]:["s_bvy_txt"]};};

// Gordic.Buc.Client.GReaderBucspba.fields.js
Readers.Bucspba = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBucspba",keys:["ico","ucs","ixs_esu","sbu"],[columns]:["ico", "ucs", "ixs_esu", "sbu", "nazev_sbu", "sk_vl", "naz_ban", "mis_pob"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Bucspba.inheritsFrom(ReadersBase);
Fields.bucspba = (prefabOptions) => { return {data:new Readers.Bucspba(),[dropdown]:true,[itemTemplate]:"{nazev_sbu}",[helperColumns]:["nazev_sbu"]};};

// GReaderBuccssb.fields.js
Readers.Buccssb = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBuccssb",keys:["s_slob"],[columns]:["s_slob","s_slob_txt","k_v","k_s","ide_rea","s_uhrp_okn"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Buccssb.inheritsFrom(ReadersBase);
Fields.buccssb = (prefabOptions) => { return {data:new Readers.Buccssb(),[itemTemplate]:"{s_slob_txt:trim:encode}",[helperColumns]:["s_slob_txt"],[dropdown]:true};};

// GReaderBucctyk.fields.js
Readers.Bucctyk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBucctyk",keys:["typ_kum"],[columns]:["typ_kum","typ_kum_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Bucctyk.inheritsFrom(ReadersBase);
Fields.bucctyk = (prefabOptions) => { return {data:new Readers.Bucctyk(),[dropdown]:true,[itemTemplate]:"{typ_kum_txt:trim:encode}",[helperColumns]:["typ_kum_txt"]};};

// GReaderBucctyv.fields.js
Readers.Bucctyv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBucctyv",keys:["typ_vypis"],[columns]:["typ_vypis","typ_vypis_txt","typ_vypis_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Bucctyv.inheritsFrom(ReadersBase);
Fields.bucctyv = (prefabOptions) => { return {data:new Readers.Bucctyv(),[dropdown]:true,[itemTemplate]:"{typ_vypis_zkr:trim:encode}",[helperColumns]:["typ_vypis_zkr", "typ_vypis_txt"]};};

// GReaderBucdpep.fields.js
Readers.Bucdpep = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBucdpep",keys:["ixp","radek_uhr"],[columns]:["ucet_ci", "c", "c_par", "c_roz", "vs", "ks", "ss", "dat_spl", "mena_txt", "c_mena", "c_par_mena", "c_roz_mena", "zkr_ag", "ac", "ixp", "nazev", "ico", "radek_uhr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Bucdpep.inheritsFrom(ReadersBase);
Fields.bucdpep = (prefabOptions) => { return {data:new Readers.Bucdpep(),[itemTemplate]:"{vs:trim:encode}",[helperColumns]:["vs"],[selector]:(options) => newDefaultSelector($.extend(Selectors.bucdpep(),prefabOptions,options)).show()};};
Selectors.bucdpep = () => { return {data:new Readers.Bucdpep(),[gridOpts]:{
		columnMode: "full"
	},[gridFormat]:new Gordic.Data.GridFormat()
			.addTextColumn({ name: "ucet_ci", caption: "jres:33600001", width: 150, forced: true })
			.addCurrencyColumn({ name: "c", caption: "jres:33600002" })
			.addCurrencyColumn({ name: "c_par", caption: "jres:33600003" })
			.addCurrencyColumn({ name: "c_roz", caption: "jres:33600004" })
			.addTextColumn({ name: "vs", caption: "jres:33600017", width: 120 })
			.addTextColumn({ name: "ks", caption: "jres:33600005", width: 120 })
			.addTextColumn({ name: "ss", caption: "jres:33600006", width: 120 })
			.addDateColumn({ name: "dat_spl", caption: "jres:33600007" })
			.addTextColumn({ name: "mena_txt", caption: "jres:33600008", width: 60 })
			.addCurrencyColumn({ name: "c_mena", caption: "jres:33600009" })
			.addCurrencyColumn({ name: "c_par_mena", caption: "jres:33600010" })
			.addCurrencyColumn({ name: "c_roz_mena", caption: "jres:33600011" })
			.addTextColumn({ name: "zkr_ag", caption: "jres:33600012", width: 60 })
			.addTextColumn({ name: "ac", caption: "jres:33600013", width: 110 })
			.addTextColumn({ name: "ixp", caption: "jres:33600014", width: 120 })
			.addTextColumn({ name: "nazev", caption: "jres:33600015", width: 200 })
			.addTextColumn({ name: "ico", caption: "jres:33600016", width: 80 }),[userSettings]:usRoot+"bucdpep",[isolatedUserSettings]:true};};

// GReaderZpracFuc.fields.js
Readers.ZpracFuc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderZpracFuc",keys:["ixs_fun"],[columns]:["ixs_fun","nazev_rf"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.ZpracFuc.inheritsFrom(ReadersBase);
Fields.zpracFuc = (prefabOptions) => { return {data:new Readers.ZpracFuc(),[itemTemplate]:"{nazev_rf:trim:encode}",[helperColumns]:["nazev_rf"]};};

})(jQuery);

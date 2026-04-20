"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Prr.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const selector = "selector"; const gridFormat = "gridFormat"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const gridOpts = "gridOpts"; const cached = "cached"; const dropdown = "dropdown";

// GReaderPrrBarvy.fields.js
Readers.PrrBarvy = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrrBarvy",keys:["ixs_brv"],[columns]:["ixs_brv","popis","poznamka","aktivita","aktivita_txt","zkratka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PrrBarvy.inheritsFrom(ReadersBase);
Fields.prrBarvy = (prefabOptions) => { return {data:new Readers.PrrBarvy(),[itemTemplate]:"{popis}",[helperColumns]:["popis"]};};

// GReaderPrrCastkyUdalostiDeniku.fields.js
Readers.PrrCastkyUdalostiDeniku = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrrCastkyUdalostiDeniku",keys:["ixs_rad","typ_uda","typ_pla"],[columns]:["ixs_rad","typ_uda","typ_pla","castka","poznamka","aktivita","dat_zmena","zmenu_prov","typ_uda_txt","typ_pla_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PrrCastkyUdalostiDeniku.inheritsFrom(ReadersBase);
Fields.prrCastkyUdalostiDeniku = (prefabOptions) => { return {data:new Readers.PrrCastkyUdalostiDeniku(),[itemTemplate]:"{castka}",[helperColumns]:["castka"]};};

// GReaderPrrFormulare.fields.js
Readers.PrrFormulare = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrrFormulare",keys:["sablona"],[columns]:["sablona","ixs_typ","nazev","poznamka","aktivita","umisteni","ktg_typ","s_frm","typ_uda"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PrrFormulare.inheritsFrom(ReadersBase);
Fields.prrFormulare = (prefabOptions) => { return {data:new Readers.PrrFormulare(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.prrFormulare(),prefabOptions,options)).show()};};
Selectors.prrFormulare = () => { return {data:new Readers.PrrFormulare(),[gridFormat]:[
        { name: "nazev", caption: "Formulář", width: 150 },
    ],[userSettings]:usRoot+"prrFormulare",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]}};};

// GReaderPrrGinsfrm.fields.js
Readers.PrrGinsfrm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrrGinsfrm",keys:["ixs_frm"],[columns]:["ixs_frm","nazev","filtr_frm","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PrrGinsfrm.inheritsFrom(ReadersBase);
Fields.prrGinsfrm = (prefabOptions) => { return {data:new Readers.PrrGinsfrm(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_frm", "nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.prrGinsfrm(),prefabOptions,options)).show()};};
Selectors.prrGinsfrm = () => { return {data:new Readers.PrrGinsfrm(),[gridFormat]:[
            { name: "ixs_frm", caption: "jres:2580045", width: 150 },             { name: "nazev", caption: "jres:2580044" }         ],[userSettings]:usRoot+"prrGinsfrm",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixs_frm", "nazev"]}};};

// GReaderPrrParagrafy.fields.js
Readers.PrrParagrafy = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrrParagrafy",keys:["ixs_mpr"],[columns]:["ixs_mpr","nazev","zakonik","rok","paragraf","odstavec","pismeno","bod","par_txt","poznamka","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PrrParagrafy.inheritsFrom(ReadersBase);
Fields.prrParagrafy = (prefabOptions) => { return {data:new Readers.PrrParagrafy(),[itemTemplate]:"{par_txt}",[helperColumns]:["zakonik", "rok", "paragraf", "odstavec", "pismeno", "bod"]};};

// GReaderPrrPlemenaPsu.fields.js
Readers.PrrPlemenaPsu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrrPlemenaPsu",keys:["plemeno"],[columns]:["plemeno","plemeno_txt","k_v","k_s","nazev_orig","zkratka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PrrPlemenaPsu.inheritsFrom(ReadersBase);
Fields.prrPlemenaPsu = (prefabOptions) => { return {data:new Readers.PrrPlemenaPsu(),[itemTemplate]:"{plemeno_txt}",[helperColumns]:["plemeno","plemeno_txt"]};};

// GReaderPrrsfrm.fields.js
Readers.Prrsfrm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrrsfrm",keys:["sablona"],[columns]:["sablona","nazev","aktivita","s_mp"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Prrsfrm.inheritsFrom(ReadersBase);
Fields.prrsfrm = (prefabOptions) => { return {data:new Readers.Prrsfrm(),[itemTemplate]:"{nazev}",[helperColumns]:["sablona", "nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.prrsfrm(),prefabOptions,options)).show()};};
Selectors.prrsfrm = () => { return {data:new Readers.Prrsfrm(),[gridFormat]:[
            { name: "sablona", caption: "jres:39900003", width:150 },             { name: "nazev", caption: "jres:39900004" }         ],[userSettings]:usRoot+"prrsfrm",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["sablona", "nazev"]}};};

// GReaderPrrsrad.fields.js
Readers.Prrsrad = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrrsrad",keys:["ixs_rad"],[columns]:["ixs_rad","typ_den_txt","typ_den","nazev","rok","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Prrsrad.inheritsFrom(ReadersBase);
Fields.prrsrad = (prefabOptions) => { return {data:new Readers.Prrsrad(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_rad", "rok"],[selector]:(options) => newDefaultSelector($.extend(Selectors.prrsrad(),prefabOptions,options)).show()};};
Selectors.prrsrad = () => { return {data:new Readers.Prrsrad(),[gridFormat]:[
        { name: "nazev", caption: "jres:39900005" },         { name: "rok", caption: "jres:2580042", width: 40 }     ],[userSettings]:usRoot+"prrsrad",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixs_rad", "rok"]}};};

// GReaderPrrStraznici.fields.js
Readers.PrrStraznici = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrrStraznici",keys:["ixs_fun"],[columns]:["ixs_fun","ginsfun_nazev_ref","ginsfun_nazev_rf","ginsfun_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PrrStraznici.inheritsFrom(ReadersBase);
Fields.prrStraznici = (prefabOptions) => { return {data:new Readers.PrrStraznici(),[itemTemplate]:"{ginsfun_nazev_rf}",[helperColumns]:["ginsfun_nazev_rf"],[selector]:(options) => newDefaultSelector($.extend(Selectors.prrStraznici(),prefabOptions,options)).show()};};
Selectors.prrStraznici = () => { return {data:new Readers.PrrStraznici(),[gridFormat]:[
		{ name: "ginsfun_nazev_rf", caption: "Strážník", width: 150 }
	],[userSettings]:usRoot+"prrStraznici",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ginsfun_nazev_rf"]}};};

// GReaderPrrTovarniZnacky.fields.js
Readers.PrrTovarniZnacky = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrrTovarniZnacky",keys:["ixs_tzv"],[columns]:["ixs_tzv","typ_tvo","popis","poznamka","aktivita","dat_zmena","zmenu_prov","aktivita_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PrrTovarniZnacky.inheritsFrom(ReadersBase);
Fields.prrTovarniZnacky = (prefabOptions) => { return {data:new Readers.PrrTovarniZnacky(),[itemTemplate]:"{popis}",[helperColumns]:["popis"]};};

// GReaderPrrTypyReseni.fields.js
Readers.PrrTypyReseni = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrrTypyReseni",keys:["typ_uda"],[columns]:["typ_uda","typ_uda_txt","k_v","k_s","stav_rize","s_prr","s_prm","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PrrTypyReseni.inheritsFrom(ReadersBase);
Fields.prrTypyReseni = (prefabOptions) => { return {data:new Readers.PrrTypyReseni(),[itemTemplate]:"{typ_uda_txt}",[helperColumns]:["typ_uda_txt", "typ_uda"]};};

// GReaderPrrTypySkutku.fields.js
Readers.PrrTypySkutku = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrrTypySkutku",keys:["ixs_uts"],[columns]:["ixs_uts","nazev","poznamka","aktivita","s_mp"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PrrTypySkutku.inheritsFrom(ReadersBase);
Fields.prrTypySkutku = (prefabOptions) => { return {data:new Readers.PrrTypySkutku(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderPrrTypyUcastnika.fields.js
Readers.PrrTypyUcastnika = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrrTypyUcastnika",keys:["typ_uca"],[columns]:["typ_uca","typ_uca_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PrrTypyUcastnika.inheritsFrom(ReadersBase);
Fields.prrTypyUcastnika = (prefabOptions) => { return {data:new Readers.PrrTypyUcastnika(),[itemTemplate]:"{typ_uca_txt}",[helperColumns]:["typ_uca_txt"]};};

// GReaderPrrctpl.fields.js
Readers.Prrctpl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrrctpl",keys:["typ_pla"],[columns]:["typ_pla","typ_pla_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Prrctpl.inheritsFrom(ReadersBase);
Fields.prrctpl = (prefabOptions) => { return {data:new Readers.Prrctpl(),[itemTemplate]:"{typ_pla_txt}",[helperColumns]:["typ_pla", "typ_pla_txt"]};};

// GReaderPrrcuda.fields.js
Readers.Prrcuda = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrrcuda",keys:["typ_uda"],[columns]:["typ_uda", "typ_uda_txt", "k_v", "k_s", "stav_rize", "k_xml", "s_prr", "s_prm"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Prrcuda.inheritsFrom(ReadersBase);
Fields.prrcuda = (prefabOptions) => { return {data:new Readers.Prrcuda(),[itemTemplate]:"{typ_uda_txt:trim:encode}",[helperColumns]:["typ_uda", "typ_uda_txt", "k_v", "k_s", "stav_rize", "k_xml", "s_prr", "s_prm"],[dropdown]:true,[selector]:(options) => newDefaultSelector($.extend(Selectors.prrcuda(),prefabOptions,options)).show()};};
Selectors.prrcuda = () => { return {data:new Readers.Prrcuda(),[userSettings]:usRoot+"prrcuda",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_uda", "typ_uda_txt", "k_v", "k_s", "stav_rize", "k_xml", "s_prr", "s_prm"]}};};

// GReaderPrrsudm.fields.js
Readers.Prrsudm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrrsudm",keys:["ixs_udm"],[columns]:["ixs_udm","nazev","ixs_vud","prrscud_nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Prrsudm.inheritsFrom(ReadersBase);
Fields.prrsudm = (prefabOptions) => { return {data:new Readers.Prrsudm(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GReaderSprcspr.fields.js
Readers.Sprcspr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprcspr",keys:["spr"],[columns]:["spr","spr_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sprcspr.inheritsFrom(ReadersBase);
Fields.sprcspr = (prefabOptions) => { return {data:new Readers.Sprcspr(),[itemTemplate]:"{spr_txt}",[helperColumns]:["spr", "spr_txt"]};};

})(jQuery);

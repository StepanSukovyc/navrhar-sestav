"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Pcn.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const gridOpts = "gridOpts"; const selector = "selector"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const gridFormat = "gridFormat";

// GReaderBalanc.fields.js
Readers.Balanc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBalanc",keys:["priz_nebalanc"],[columns]:["priz_nebalanc","priz_nebalanc_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Balanc.inheritsFrom(ReadersBase);
Fields.balanc = (prefabOptions) => { return {data:new Readers.Balanc(),[itemTemplate]:"{priz_nebalanc_txt}",[helperColumns]:["priz_nebalanc", "priz_nebalanc_txt"]};};

// GReaderPsccdos.fields.js
Readers.Psccdos = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPsccdos",keys:["stav_dos"],[columns]:["stav_dos", "stav_dos_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Psccdos.inheritsFrom(ReadersBase);
Fields.psccdos = (prefabOptions) => { return {data:new Readers.Psccdos(),[itemTemplate]:"{stav_dos_txt}",[helperColumns]:["stav_dos", "stav_dos_txt", "k_v", "k_s"]};};

// GReaderPsccmis.fields.js
Readers.Psccmis = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPsccmis",keys:["viditelnost"],[columns]:["viditelnost", "viditelnost_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Psccmis.inheritsFrom(ReadersBase);
Fields.psccmis = (prefabOptions) => { return {data:new Readers.Psccmis(),[itemTemplate]:"{viditelnost_txt}",[helperColumns]:["viditelnost", "viditelnost_txt", "k_v", "k_s"]};};

// GReaderPsccpsc.fields.js
Readers.Psccpsc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPsccpsc",keys:["stav_psc"],[columns]:["stav_psc", "stav_psc_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Psccpsc.inheritsFrom(ReadersBase);
Fields.psccpsc = (prefabOptions) => { return {data:new Readers.Psccpsc(),[itemTemplate]:"{stav_psc_txt}",[helperColumns]:["stav_psc", "stav_psc_txt", "k_v", "k_s"]};};

// GReaderPsccrec.fields.js
Readers.Psccrec = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPsccrec",keys:["priz_recip"],[columns]:["priz_recip", "priz_recip_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Psccrec.inheritsFrom(ReadersBase);
Fields.psccrec = (prefabOptions) => { return {data:new Readers.Psccrec(),[itemTemplate]:"{priz_recip_txt}",[helperColumns]:["priz_recip", "priz_recip_txt", "k_v", "k_s"]};};

// GReaderPscctfz.fields.js
Readers.Pscctfz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPscctfz",keys:["kod_tfz"],[columns]:["kod_tfz", "kod_tfz_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pscctfz.inheritsFrom(ReadersBase);
Fields.pscctfz = (prefabOptions) => { return {data:new Readers.Pscctfz(),[itemTemplate]:"{kod_tfz_txt}",[helperColumns]:["kod_tfz", "kod_tfz_txt", "k_v", "k_s"]};};

// GReaderPscctyp.fields.js
Readers.Pscctyp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPscctyp",keys:["typ_poz"],[columns]:["typ_poz", "typ_poz_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pscctyp.inheritsFrom(ReadersBase);
Fields.pscctyp = (prefabOptions) => { return {data:new Readers.Pscctyp(),[itemTemplate]:"{typ_poz_txt}",[helperColumns]:["typ_poz", "typ_poz_txt", "k_v", "k_s"]};};

// GReaderPscczmr.fields.js
Readers.Pscczmr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPscczmr",keys:["stav_zmr"],[columns]:["stav_zmr", "stav_zmr_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pscczmr.inheritsFrom(ReadersBase);
Fields.pscczmr = (prefabOptions) => { return {data:new Readers.Pscczmr(),[itemTemplate]:"{stav_zmr_txt}",[helperColumns]:["stav_zmr", "stav_zmr_txt"]};};

// GReaderPscczpv.fields.js
Readers.Pscczpv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPscczpv",keys:["zp_vyp","typ_poz"],[columns]:["zp_vyp", "zp_vyp_txt", "k_v", "k_s", "typ_poz"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pscczpv.inheritsFrom(ReadersBase);
Fields.pscczpv = (prefabOptions) => { return {data:new Readers.Pscczpv(),[itemTemplate]:"{zp_vyp_txt}",[helperColumns]:["zp_vyp", "zp_vyp_txt", "k_v", "k_s", "typ_poz"]};};

// GReaderPsccztp.fields.js
Readers.Psccztp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPsccztp",keys:["typ_zmr"],[columns]:["typ_zmr", "typ_zmr_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Psccztp.inheritsFrom(ReadersBase);
Fields.psccztp = (prefabOptions) => { return {data:new Readers.Psccztp(),[itemTemplate]:"{typ_zmr_txt}",[helperColumns]:["typ_zmr", "typ_zmr_txt", "k_v", "k_s"]};};

// GReaderPscdkpr.fields.js
Readers.Pscdkpr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPscdkpr",keys:["rok","kat_pri","radek"],[columns]:["rok", "kat_pri", "radek", "popis", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pscdkpr.inheritsFrom(ReadersBase);
Fields.pscdkpr = (prefabOptions) => { return {data:new Readers.Pscdkpr(),[itemTemplate]:"{popis}",[helperColumns]:["rok", "kat_pri", "radek", "popis", "aktivita"]};};

// GReaderPscscle.fields.js
Readers.Pscscle = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPscscle",keys:["ixs_cle","typ_poz","ixp_den"],[columns]:["ixs_cle", "nazev", "kod_cle", "poznamka", "typ_poz", "ixp_den", "ixs_vpk", "aktivita", "typ_poz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pscscle.inheritsFrom(ReadersBase);
Fields.pscscle = (prefabOptions) => { return {data:new Readers.Pscscle(),[itemTemplate]:function (row) { return Gordic.Prefabs.Utils.getSimpleInfoString(row.nazev, row.typ_poz_txt); },[helperColumns]:["ixs_cle", "nazev"],[gridOpts]:{
        searchColumns: ["ixs_cle", "typ_poz", "nazev"]
    }};};

// GReaderPscsden.fields.js
Readers.Pscsden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPscsden",keys:["ixp_den"],[columns]:["ixp_den", "nazev", "rok", "aktivita", "priz_plan"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pscsden.inheritsFrom(ReadersBase);
Fields.pscsden = (prefabOptions) => { return {data:new Readers.Pscsden(),[itemTemplate]:function (row) { return Gordic.Prefabs.Utils.getSimpleInfoString(row.nazev, row.rok); },[helperColumns]:["nazev", "rok", "ixp_den"],[selector]:(options) => newDefaultSelector($.extend(Selectors.pscsden(),prefabOptions,options)).show()};};
Selectors.pscsden = () => { return {data:new Readers.Pscsden(),[gridOpts]:{
		searchColumns: ["rok", "ixp_den", "nazev"]
	},[userSettings]:usRoot+"pscsden",[isolatedUserSettings]:true,[gridFormat]:newGridFormat().addTextColumn({name: "ixp_den", caption: "jres:28300017", width: 110, forced: true}).addTextColumn({name: "nazev", caption: "jres:28300015", width: 200}).addNumberColumn({name: "rok", caption: "jres:28300016", width: 60})};};

// GReaderPscsdod.fields.js
Readers.Pscsdod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPscsdod",keys:["ixp"],[columns]:["ixp", "nazev", "ixp_den", "dat_od", "dat_do", "aktivita", ],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pscsdod.inheritsFrom(ReadersBase);
Fields.pscsdod = (prefabOptions) => { return {data:new Readers.Pscsdod(),[itemTemplate]:"{nazev}",[helperColumns]:["ixp", "ixp_den", "nazev", "dat_od", "dat_do", "aktivita", ]};};

// GReaderPscskpr.fields.js
Readers.Pscskpr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPscskpr",keys:["rok","kat_pri"],[columns]:["rok", "kat_pri", "nazev", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pscskpr.inheritsFrom(ReadersBase);
Fields.pscskpr = (prefabOptions) => { return {data:new Readers.Pscskpr(),[itemTemplate]:"{nazev}",[helperColumns]:["rok", "kat_pri", "nazev", "aktivita"]};};

// GReaderPscsmis.fields.js
Readers.Pscsmis = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPscsmis",keys:["id_misto"],[columns]:["id_misto", "misto", "aktivita", "viditelnost"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pscsmis.inheritsFrom(ReadersBase);
Fields.pscsmis = (prefabOptions) => { return {data:new Readers.Pscsmis(),[itemTemplate]:"{misto}",[helperColumns]:["id_misto", "misto", "aktivita", "viditelnost"]};};

// GReaderPscsnkh.fields.js
Readers.Pscsnkh = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPscsnkh",keys:["ico","rok"],[columns]:["ico", "rok", "nazev", "aktivita", ],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pscsnkh.inheritsFrom(ReadersBase);
Fields.pscsnkh = (prefabOptions) => { return {data:new Readers.Pscsnkh(),[itemTemplate]:"{nazev}",[helperColumns]:["ico", "rok", "nazev", "aktivita", ]};};

// GReaderPscstna.fields.js
Readers.Pscstna = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPscstna",keys:["ixs_tna"],[columns]:["ixs_tna", "nazev", "ktg_tna", "dat_od", "dat_do", "aktivita", "kod_tna"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pscstna.inheritsFrom(ReadersBase);
Fields.pscstna = (prefabOptions) => { return {data:new Readers.Pscstna(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_tna", "nazev", "ktg_tna", "dat_od", "dat_do", "aktivita", "kod_tna"]};};

})(jQuery);

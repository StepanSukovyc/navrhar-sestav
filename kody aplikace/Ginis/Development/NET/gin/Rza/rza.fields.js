"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Rza.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const cached = "cached"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const selector = "selector"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings";

// Gordic.Rza.Client.GReaderDokumentRZA.fields.js
Readers.DokumentRZA = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDokumentRZA",keys:["ixp"],[columns]:["ixp","akt_znacka","poznamka","nazev","Vlastnictvi","umisteni","poc_priloh"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.DokumentRZA.inheritsFrom(ReadersBase);
Fields.dokumentRZA = (prefabOptions) => { return {data:new Readers.DokumentRZA(),[itemTemplate]:"{ixp}",[helperColumns]:["ixp"],[selector]:(options) => newDefaultSelector($.extend(Selectors.dokumentRZA(),prefabOptions,options)).show()};};
Selectors.dokumentRZA = () => { return {data:new Readers.DokumentRZA(),[gridOpts]:{
		columnMode: "full",
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "ixp", caption: "jres:26600008", width: 130, forced: true })
		.addTextColumn({ name: "akt_znacka", caption: "jres:26600010", width: 140 })
		.addTextColumn({ name: "poznamka", caption: "jres:26600009", width: 140 })
		.addTextColumn({ name: "nazev", caption: "jres:26600011", width: 190 })
		.addTextColumn({ name: "Vlastnictvi", caption: "jres:26600012", width: 300 })
		.addTextColumn({ name: "umisteni", caption: "jres:26600013", width: 40 })
		.addNumberColumn({ name: "poc_priloh", caption: "jres:26600014", width: 40 }),[userSettings]:usRoot+"dokumentRZA",[isolatedUserSettings]:true};};

// Gordic.Rza.Client.GReaderRzacdri.fields.js
Readers.Rzacdri = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzacdri",keys:["dri_pri"],[columns]:["dri_pri","dri_pri_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzacdri.inheritsFrom(ReadersBase);
Fields.rzacdri = (prefabOptions) => { return {data:new Readers.Rzacdri(),[itemTemplate]:"{dri_pri_txt:trim:encode}",[helperColumns]:["dri_pri_txt"]};};

// Gordic.Rza.Client.GReaderRzacduz.fields.js
Readers.Rzacduz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzacduz",keys:["duz_zak"],[columns]:["duz_zak","duz_zak_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzacduz.inheritsFrom(ReadersBase);
Fields.rzacduz = (prefabOptions) => { return {data:new Readers.Rzacduz(),[itemTemplate]:"{duz_zak_txt:trim:encode}",[helperColumns]:["duz_zak_txt"]};};

// Gordic.Rza.Client.GReaderRzacdzd.fields.js
Readers.Rzacdzd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzacdzd",keys:["dis_zad"],[columns]:["dis_zad","dis_zad_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzacdzd.inheritsFrom(ReadersBase);
Fields.rzacdzd = (prefabOptions) => { return {data:new Readers.Rzacdzd(),[itemTemplate]:"{dis_zad_txt:trim:encode}",[helperColumns]:["dis_zad_txt"]};};

// Gordic.Rza.Client.GReaderRzacesh.fields.js
Readers.Rzacesh = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzacesh",keys:["s_esh"],[columns]:["s_esh","s_esh_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzacesh.inheritsFrom(ReadersBase);
Fields.rzacesh = (prefabOptions) => { return {data:new Readers.Rzacesh(),[itemTemplate]:"{s_esh_txt:trim:encode}",[helperColumns]:["s_esh_txt"]};};

// Gordic.Rza.Client.GReaderRzacesn.fields.js
Readers.Rzacesn = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzacesn",keys:["s_esn"],[columns]:["s_esn","s_esn_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzacesn.inheritsFrom(ReadersBase);
Fields.rzacesn = (prefabOptions) => { return {data:new Readers.Rzacesn(),[itemTemplate]:"{s_esn_txt:trim:encode}",[helperColumns]:["s_esn_txt"]};};

// Gordic.Rza.Client.GReaderRzacess.fields.js
Readers.Rzacess = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzacess",keys:["s_ess"],[columns]:["s_ess","s_ess_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzacess.inheritsFrom(ReadersBase);
Fields.rzacess = (prefabOptions) => { return {data:new Readers.Rzacess(),[itemTemplate]:"{s_ess_txt:trim:encode}",[helperColumns]:["s_ess_txt"]};};

// Gordic.Rza.Client.GReaderRzacesv.fields.js
Readers.Rzacesv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzacesv",keys:["s_esv"],[columns]:["s_esv","s_esv_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzacesv.inheritsFrom(ReadersBase);
Fields.rzacesv = (prefabOptions) => { return {data:new Readers.Rzacesv(),[itemTemplate]:"{s_esv_txt:trim:encode}",[helperColumns]:["s_esv_txt"]};};

// Gordic.Rza.Client.GReaderRzackpz.fields.js
Readers.Rzackpz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzackpz",keys:["kat_pza"],[columns]:["kat_pza","kat_pza_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzackpz.inheritsFrom(ReadersBase);
Fields.rzackpz = (prefabOptions) => { return {data:new Readers.Rzackpz(),[itemTemplate]:"{kat_pza_txt:trim:encode}",[helperColumns]:["kat_pza_txt"]};};

// Gordic.Rza.Client.GReaderRzacleg.fields.js
Readers.Rzacleg = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzacleg",keys:["leg_usm"],[columns]:["leg_usm","leg_usm_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzacleg.inheritsFrom(ReadersBase);
Fields.rzacleg = (prefabOptions) => { return {data:new Readers.Rzacleg(),[itemTemplate]:"{leg_usm_txt}",[helperColumns]:["leg_usm_txt"]};};

// Gordic.Rza.Client.GReaderRzacner.fields.js
Readers.Rzacner = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzacner",keys:["ner_zak"],[columns]:["ner_zak","ner_zak_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzacner.inheritsFrom(ReadersBase);
Fields.rzacner = (prefabOptions) => { return {data:new Readers.Rzacner(),[itemTemplate]:"{ner_zak_txt:trim:encode}",[helperColumns]:["ner_zak_txt"]};};

// Gordic.Rza.Client.GReaderRzacpri.fields.js
Readers.Rzacpri = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzacpri",keys:["pri_zak"],[columns]:["pri_zak","pri_zak_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzacpri.inheritsFrom(ReadersBase);
Fields.rzacpri = (prefabOptions) => { return {data:new Readers.Rzacpri(),[itemTemplate]:"{pri_zak_txt}",[helperColumns]:["pri_zak_txt"]};};

// Gordic.Rza.Client.GReaderRzacrez.fields.js
Readers.Rzacrez = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzacrez",keys:["rez_pri"],[columns]:["rez_pri","rez_pri_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzacrez.inheritsFrom(ReadersBase);
Fields.rzacrez = (prefabOptions) => { return {data:new Readers.Rzacrez(),[itemTemplate]:"{rez_pri_txt:trim:encode}",[helperColumns]:["rez_pri_txt"]};};

// Gordic.Rza.Client.GReaderRzacsji.fields.js
Readers.Rzacsji = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzacsji",keys:["sta_jis"],[columns]:["sta_jis","sta_jis_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzacsji.inheritsFrom(ReadersBase);
Fields.rzacsji = (prefabOptions) => { return {data:new Readers.Rzacsji(),[itemTemplate]:"{sta_jis_txt:trim:encode}",[helperColumns]:["sta_jis_txt"]};};

// Gordic.Rza.Client.GReaderRzacsza.fields.js
Readers.Rzacsza = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzacsza",keys:["s_zak"],[columns]:["s_zak","s_zak_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzacsza.inheritsFrom(ReadersBase);
Fields.rzacsza = (prefabOptions) => { return {data:new Readers.Rzacsza(),[itemTemplate]:"{s_zak_txt:trim:encode}",[helperColumns]:["s_zak_txt"]};};

// Gordic.Rza.Client.GReaderRzactfi.fields.js
Readers.Rzactfi = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzactfi",keys:["tfi_pri"],[columns]:["tfi_pri","tfi_pri_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzactfi.inheritsFrom(ReadersBase);
Fields.rzactfi = (prefabOptions) => { return {data:new Readers.Rzactfi(),[itemTemplate]:"{tfi_pri_txt:trim:encode}",[helperColumns]:["tfi_pri_txt"]};};

// Gordic.Rza.Client.GReaderRzacvri.fields.js
Readers.Rzacvri = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzacvri",keys:["vri_pri"],[columns]:["vri_pri","vri_pri_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzacvri.inheritsFrom(ReadersBase);
Fields.rzacvri = (prefabOptions) => { return {data:new Readers.Rzacvri(),[itemTemplate]:"{vri_pri_txt:trim:encode}",[helperColumns]:["vri_pri_txt"]};};

// Gordic.Rza.Client.GReaderRzaczpo.fields.js
Readers.Rzaczpo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzaczpo",keys:["zpu_pod"],[columns]:["zpu_pod","zpu_pod_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzaczpo.inheritsFrom(ReadersBase);
Fields.rzaczpo = (prefabOptions) => { return {data:new Readers.Rzaczpo(),[itemTemplate]:"{zpu_pod_txt:trim:encode}",[helperColumns]:["zpu_pod_txt"]};};

// Gordic.Rza.Client.GReaderRzaczpr.fields.js
Readers.Rzaczpr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzaczpr",keys:["zpu_rea"],[columns]:["zpu_rea","zpu_rea_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzaczpr.inheritsFrom(ReadersBase);
Fields.rzaczpr = (prefabOptions) => { return {data:new Readers.Rzaczpr(),[itemTemplate]:"{zpu_rea_txt}",[helperColumns]:["zpu_rea_txt"]};};

// Gordic.Rza.Client.GReaderRzasesu.fields.js
Readers.Rzasesu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzasesu",keys:["ixs_esu"],[columns]:["ixs_esu","ixs_esu_txt","por_cis_nab","dat_pre_nab","ixp_nab"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzasesu.inheritsFrom(ReadersBase);
Fields.rzasesu = (prefabOptions) => { return {data:new Readers.Rzasesu(),[itemTemplate]:"{ixs_esu_txt}",[helperColumns]:["ixs_esu_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.Rzasesu(),prefabOptions,options)).show()};};
Selectors.Rzasesu = () => { return {data:new Readers.Rzasesu(),[userSettings]:usRoot+"Rzasesu",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixs_esu_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "ixs_esu_txt", caption: "jres:26600018", width: 300, forced: true}).addNumberColumn({name: "por_cis_nab", caption: "jres:26600019", width: 60}).addDateTimeColumn({name: "dat_pre_nab", caption: "jres:26600020", width: 150}).addTextColumn({name: "ixp_nab", caption: "jres:26600021", width: 150})};};

// Gordic.Rza.Client.GReaderRzaskpu.fields.js
Readers.Rzaskpu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRzaskpu",keys:["kpr_urc"],[columns]:["kpr_urc","nazev","zkratka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rzaskpu.inheritsFrom(ReadersBase);
Fields.rzaskpu = (prefabOptions) => { return {data:new Readers.Rzaskpu(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.rzaskpu(),prefabOptions,options)).show()};};
Selectors.rzaskpu = () => { return {data:new Readers.Rzaskpu(),[userSettings]:usRoot+"rzaskpu",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addNumberColumn({name: "kpr_urc", caption: "jres:26600015", width: 100, forced: true}).addTextColumn({name: "nazev", caption: "jres:26600016", width: 300}).addTextColumn({name: "zkratka", caption: "jres:26600017", width: 100})};};

})(jQuery);

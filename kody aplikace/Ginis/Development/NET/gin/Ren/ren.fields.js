"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Ren.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const dropdown = "dropdown";

// Gordic.Ren.Client.GReaderNemscob.fields.js
Readers.Nemscob = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemscob",keys:["kod_casti_obce"],[columns]:["kod_casti_obce","kod_obce","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemscob.inheritsFrom(ReadersBase);
Fields.nemscob = (prefabOptions) => { return {data:new Readers.Nemscob(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// Gordic.Ren.Client.GReaderNemscos.fields.js
Readers.Nemscos = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemscos",keys:["char_opr_subj"],[columns]:["char_opr_subj","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemscos.inheritsFrom(ReadersBase);
Fields.nemscos = (prefabOptions) => { return {data:new Readers.Nemscos(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// Gordic.Ren.Client.GReaderNemsdav.fields.js
Readers.Nemsdav = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemsdav",keys:["ixs_dav"],[columns]:["ixs_dav","popis","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemsdav.inheritsFrom(ReadersBase);
Fields.nemsdav = (prefabOptions) => { return {data:new Readers.Nemsdav(),[itemTemplate]:"{popis}",[helperColumns]:["popis"]};};

// Gordic.Ren.Client.GReaderNemsdcp.fields.js
Readers.Nemsdcp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemsdcp",keys:["druh_cis_par"],[columns]:["druh_cis_par","popis","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemsdcp.inheritsFrom(ReadersBase);
Fields.nemsdcp = (prefabOptions) => { return {data:new Readers.Nemsdcp(),[itemTemplate]:"{popis}",[helperColumns]:["popis"]};};

// Gordic.Ren.Client.GReaderNemsdpo.fields.js
Readers.Nemsdpo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemsdpo",keys:["druh_poz"],[columns]:["druh_poz","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemsdpo.inheritsFrom(ReadersBase);
Fields.nemsdpo = (prefabOptions) => { return {data:new Readers.Nemsdpo(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev", "druh_poz"]};};

// Gordic.Ren.Client.GReaderNemskat.fields.js
Readers.Nemskat = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemskat",keys:["kod_kat_uzemi"],[columns]:["kod_kat_uzemi","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemskat.inheritsFrom(ReadersBase);
Fields.nemskat = (prefabOptions) => { return {data:new Readers.Nemskat(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// Gordic.Ren.Client.GReaderNemsobc.fields.js
Readers.Nemsobc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemsobc",keys:["kod_obce"],[columns]:["kod_obce","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemsobc.inheritsFrom(ReadersBase);
Fields.nemsobc = (prefabOptions) => { return {data:new Readers.Nemsobc(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// Gordic.Ren.Client.GReaderNemsokr.fields.js
Readers.Nemsokr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemsokr",keys:["kod_okresu"],[columns]:["kod_okresu","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemsokr.inheritsFrom(ReadersBase);
Fields.nemsokr = (prefabOptions) => { return {data:new Readers.Nemsokr(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// Gordic.Ren.Client.GReaderNemstbu.fields.js
Readers.Nemstbu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemstbu",keys:["typ_budovy"],[columns]:["typ_budovy","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemstbu.inheritsFrom(ReadersBase);
Fields.nemstbu = (prefabOptions) => { return {data:new Readers.Nemstbu(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// Gordic.Ren.Client.GReaderNemstje.fields.js
Readers.Nemstje = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemstje",keys:["typ_jednotky"],[columns]:["typ_jednotky","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemstje.inheritsFrom(ReadersBase);
Fields.nemstje = (prefabOptions) => { return {data:new Readers.Nemstje(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// Gordic.Ren.Client.GReaderNemstpa.fields.js
Readers.Nemstpa = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemstpa",keys:["typ_parcely"],[columns]:["typ_parcely","popis","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemstpa.inheritsFrom(ReadersBase);
Fields.nemstpa = (prefabOptions) => { return {data:new Readers.Nemstpa(),[itemTemplate]:"{popis}",[helperColumns]:["popis"]};};

// Gordic.Ren.Client.GReaderNemstza.fields.js
Readers.Nemstza = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemstza",keys:["ixs_tza"],[columns]:["ixs_tza","nazev_tza"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemstza.inheritsFrom(ReadersBase);
Fields.nemstza = (prefabOptions) => { return {data:new Readers.Nemstza(),[dropdown]:true,[itemTemplate]:"{nazev_tza}",[helperColumns]:["ixs_tza", "nazev_tza", "aktivita"]};};

// Gordic.Ren.Client.GReaderNemszpz.fields.js
Readers.Nemszpz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemszpz",keys:["zdroj_par_ze"],[columns]:["zdroj_par_ze","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemszpz.inheritsFrom(ReadersBase);
Fields.nemszpz = (prefabOptions) => { return {data:new Readers.Nemszpz(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// Gordic.Ren.Client.GReaderNemszvb.fields.js
Readers.Nemszvb = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemszvb",keys:["zp_vyuz_bud"],[columns]:["zp_vyuz_bud","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemszvb.inheritsFrom(ReadersBase);
Fields.nemszvb = (prefabOptions) => { return {data:new Readers.Nemszvb(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev", "zp_vyuz_bud"]};};

// Gordic.Ren.Client.GReaderNemszvj.fields.js
Readers.Nemszvj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemszvj",keys:["zp_vyuz_jed"],[columns]:["zp_vyuz_jed","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemszvj.inheritsFrom(ReadersBase);
Fields.nemszvj = (prefabOptions) => { return {data:new Readers.Nemszvj(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev", "zp_vyuz_jed"]};};

// Gordic.Ren.Client.GReaderNemszvp.fields.js
Readers.Nemszvp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemszvp",keys:["zp_vyuz_poz"],[columns]:["zp_vyuz_poz","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemszvp.inheritsFrom(ReadersBase);
Fields.nemszvp = (prefabOptions) => { return {data:new Readers.Nemszvp(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// Gordic.Ren.Client.GReaderUcelNahlizeni.fields.js
Readers.UcelNahlizeni = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUcelNahlizeni",keys:["kod_ucelu"],[columns]:["kod_ucelu","nazev_ucelu"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.UcelNahlizeni.inheritsFrom(ReadersBase);
Fields.ucelNahlizeni = (prefabOptions) => { return {data:new Readers.UcelNahlizeni(),[itemTemplate]:"{nazev_ucelu}",[helperColumns]:["nazev_ucelu"]};};

// Gordic.Ren.Client.GRenReaderNemsdav.fields.js
Readers.GRenReaderNemsdav = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GRenReaderNemsdav",keys:["ixs_dav"],[columns]:["ixs_dav","popis","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GRenReaderNemsdav.inheritsFrom(ReadersBase);
Fields.gRenReaderNemsdav = (prefabOptions) => { return {data:new Readers.GRenReaderNemsdav(),[itemTemplate]:"{popis}",[helperColumns]:["popis"]};};

// Gordic.Ren.Client.GRenReaderNemstza.fields.js
Readers.RenNemstza = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GRenReaderNemstza",keys:["ixs_tza"],[columns]:["ixs_tza", "nazev_tza"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.RenNemstza.inheritsFrom(ReadersBase);
Fields.rennemstza = (prefabOptions) => { return {data:new Readers.RenNemstza(),[dropdown]:true,[itemTemplate]:"{nazev_tza}",[helperColumns]:["ixs_tza", "nazev_tza", "aktivita"]};};

// GReaderNemcdavDto.fields.js
Readers.NemcdavDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"Controls.GReaderNemcdavDto",keys:["typ_dav"],[columns]:["typ_dav","typ_dav_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.NemcdavDto.inheritsFrom(ReadersBase);
Fields.nemcdavDto = (prefabOptions) => { return {data:new Readers.NemcdavDto(),[dropdown]:true,[itemTemplate]:"{typ_dav_txt}",[helperColumns]:["typ_dav", "typ_dav_txt"]};};

})(jQuery);

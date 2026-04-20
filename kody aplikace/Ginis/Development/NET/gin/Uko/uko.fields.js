"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Uko.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const cached = "cached";

// Gordic.Uko.Client.GCisReaderSslstypSod.fields.js
Readers.SslstypSod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslstypSod",keys:["ixs_typ"],[columns]:["ixs_typ","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SslstypSod.inheritsFrom(ReadersBase);
Fields.sslstypSod = (prefabOptions) => { return {data:new Readers.SslstypSod(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"]};};

// Gordic.Uko.Client.GCisReaderUkocpra.fields.js
Readers.Ukocpra = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUkocpra",keys:["mer_prac"],[columns]:["mer_prac","mer_prac_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ukocpra.inheritsFrom(ReadersBase);
Fields.ukocpra = (prefabOptions) => { return {data:new Readers.Ukocpra(),[itemTemplate]:"{mer_prac_txt}",[helperColumns]:["mer_prac", "mer_prac_txt"]};};

// Gordic.Uko.Client.GCisReaderUkocstu.fields.js
Readers.Ukocstu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUkocstu",keys:["stav_uko"],[columns]:["stav_uko","stav_uko_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ukocstu.inheritsFrom(ReadersBase);
Fields.ukocstu = (prefabOptions) => { return {data:new Readers.Ukocstu(),[itemTemplate]:"{stav_uko_txt}",[helperColumns]:["stav_uko", "stav_uko_txt"]};};

// Gordic.Uko.Client.GCisReaderUkoPrijemci.fields.js
Readers.UkoPrijemci = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUkoPrijemci",keys:["ixs_fun"],[columns]:["ixs_fun","nazev_rf","razeni"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.UkoPrijemci.inheritsFrom(ReadersBase);
Fields.ukoPrijemci = (prefabOptions) => { return {data:new Readers.UkoPrijemci(),[itemTemplate]:"{nazev_rf:trim:encode}",[helperColumns]:["nazev_rf"]};};

// Gordic.Uko.Client.GCisReaderUkoPrijemciMulti.fields.js
Readers.UkoPrijemciMulti = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUkoPrijemciMulti",keys:["ixs_fun"],[columns]:["ixs_fun","nazev_rf","razeni"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.UkoPrijemciMulti.inheritsFrom(ReadersBase);
Fields.ukoPrijemciMulti = (prefabOptions) => { return {data:new Readers.UkoPrijemciMulti(),[itemTemplate]:"{nazev_rf:trim:encode}",[helperColumns]:["nazev_rf"]};};

// Gordic.Uko.Client.GCisReaderUkosden.fields.js
Readers.Ukosden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUkosden",keys:["ukoden"],[columns]:["ukoden","ukoden_kod"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ukosden.inheritsFrom(ReadersBase);
Fields.ukosden = (prefabOptions) => { return {data:new Readers.Ukosden(),[itemTemplate]:"{ukoden}",[helperColumns]:["ukoden", "ukoden_kod"]};};

// Gordic.Uko.Client.GCisReaderUkovrfu.fields.js
Readers.Ukovrfu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUkovrfu",keys:["ukoden"],[columns]:["ukoden","ukoden_kod"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ukovrfu.inheritsFrom(ReadersBase);
Fields.ukovrfu = (prefabOptions) => { return {data:new Readers.Ukovrfu(),[itemTemplate]:"{ukoden}",[helperColumns]:["ukoden"]};};

// GReaderUkosrio.fields.js
Readers.Ukosrio = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUkosrio",keys:["ixs_rio"],[columns]:["ixs_rio","stupen","nazev","zkratka","popis","aktivita","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ukosrio.inheritsFrom(ReadersBase);
Fields.ukosrio = (prefabOptions) => { return {data:new Readers.Ukosrio(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

})(jQuery);

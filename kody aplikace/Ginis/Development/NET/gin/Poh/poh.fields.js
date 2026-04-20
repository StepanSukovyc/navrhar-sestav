"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Poh.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns";

// GPohReaderSaldotDuvodZamitnuti.fields.js
Readers.GPohReaderSaldotDuvodZamitnuti = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPohReaderSaldotDuvodZamitnuti",keys:["id"],[columns]:["id","klic","text"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPohReaderSaldotDuvodZamitnuti.inheritsFrom(ReadersBase);
Fields.gPohReaderSaldotDuvodZamitnuti = (prefabOptions) => { return {data:new Readers.GPohReaderSaldotDuvodZamitnuti(),[itemTemplate]:"{text}",[helperColumns]:["text"]};};

// GPohReaderSaldotKontrola.fields.js
Readers.GPohReaderSaldotKontrola = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPohReaderSaldotKontrola",keys:["zkratka"],[columns]:["id","zkratka","text"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPohReaderSaldotKontrola.inheritsFrom(ReadersBase);
Fields.gPohReaderSaldotKontrola = (prefabOptions) => { return {data:new Readers.GPohReaderSaldotKontrola(),[itemTemplate]:"{text}",[helperColumns]:["text"]};};

// GPohReaderSaldotKontrola2.fields.js
Readers.GPohReaderSaldotKontrola2 = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPohReaderSaldotKontrola2",keys:["zkratka"],[columns]:["id","zkratka","text"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPohReaderSaldotKontrola2.inheritsFrom(ReadersBase);
Fields.gPohReaderSaldotKontrola2 = (prefabOptions) => { return {data:new Readers.GPohReaderSaldotKontrola2(),[itemTemplate]:"{text}",[helperColumns]:["text"]};};

// GPohReaderSaldotSzr.fields.js
Readers.GPohReaderSaldotSzr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPohReaderSaldotSzr",keys:["id"],[columns]:["id","text"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPohReaderSaldotSzr.inheritsFrom(ReadersBase);
Fields.gPohReaderSaldotSzr = (prefabOptions) => { return {data:new Readers.GPohReaderSaldotSzr(),[itemTemplate]:"{text}",[helperColumns]:["text"]};};

// GPohReaderTypyDokumentu.fields.js
Readers.GPohReaderTypyDokumentu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPohReaderTypyDokumentu",keys:["ixs_typ"],[columns]:["ixs_typ","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPohReaderTypyDokumentu.inheritsFrom(ReadersBase);
Fields.gPohReaderTypyDokumentu = (prefabOptions) => { return {data:new Readers.GPohReaderTypyDokumentu(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GPohReaderTypZasilky.fields.js
Readers.GPohReaderTypZasilky = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPohReaderTypZasilky",keys:["ixp"],[columns]:["ixp","typ"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPohReaderTypZasilky.inheritsFrom(ReadersBase);
Fields.gPohReaderTypZasilky = (prefabOptions) => { return {data:new Readers.GPohReaderTypZasilky(),[itemTemplate]:"{typ}",[helperColumns]:["typ"]};};

// GPohReaderVyberFormulare.fields.js
Readers.GPohReaderVyberFormulare = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPohReaderVyberFormulare",keys:["ixp_fmr"],[columns]:["ixp_fmr","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPohReaderVyberFormulare.inheritsFrom(ReadersBase);
Fields.gPohReaderVyberFormulare = (prefabOptions) => { return {data:new Readers.GPohReaderVyberFormulare(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GPohReaderVyberNovaFunkce.fields.js
Readers.GPohReaderVyberNovaFunkce = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPohReaderVyberNovaFunkce",keys:["ixs_fun"],[columns]:["ixs_fun","jmeno"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPohReaderVyberNovaFunkce.inheritsFrom(ReadersBase);
Fields.gPohReaderVyberNovaFunkce = (prefabOptions) => { return {data:new Readers.GPohReaderVyberNovaFunkce(),[itemTemplate]:"{jmeno}",[helperColumns]:["jmeno"]};};

// GPohReaderVyberOsoby.fields.js
Readers.GPohReaderVyberOsoby = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPohReaderVyberOsoby",keys:["ixs_fun"],[columns]:["ixs_fun","jmeno"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPohReaderVyberOsoby.inheritsFrom(ReadersBase);
Fields.gPohReaderVyberOsoby = (prefabOptions) => { return {data:new Readers.GPohReaderVyberOsoby(),[itemTemplate]:"{jmeno}",[helperColumns]:["jmeno"]};};

// GPohReaderVyberPodminka.fields.js
Readers.GPohReaderVyberPodminka = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPohReaderVyberPodminka",keys:["id"],[columns]:["id","text"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPohReaderVyberPodminka.inheritsFrom(ReadersBase);
Fields.gPohReaderVyberPodminka = (prefabOptions) => { return {data:new Readers.GPohReaderVyberPodminka(),[itemTemplate]:"{text}",[helperColumns]:["text"]};};

// GPohReaderVyberStavFormulare.fields.js
Readers.GPohReaderVyberStavFormulare = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPohReaderVyberStavFormulare",keys:["kod_stav"],[columns]:["kod_stav","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPohReaderVyberStavFormulare.inheritsFrom(ReadersBase);
Fields.gPohReaderVyberStavFormulare = (prefabOptions) => { return {data:new Readers.GPohReaderVyberStavFormulare(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GPohReaderZpusobVyuzitiNem.fields.js
Readers.GPohReaderZpusobVyuzitiNem = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPohReaderZpusobVyuzitiNem",keys:["zp_vyuz_bud"],[columns]:["zp_vyuz_bud","nazev","zkratka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPohReaderZpusobVyuzitiNem.inheritsFrom(ReadersBase);
Fields.gPohReaderZpusobVyuzitiNem = (prefabOptions) => { return {data:new Readers.GPohReaderZpusobVyuzitiNem(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderPostTest.fields.js
Readers.PostTest = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPostTest",keys:["DAN_SKUP"],[columns]:["DAN_SKUP","DAN_SKUP_TXT","K_V","K_S","K_XML"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PostTest.inheritsFrom(ReadersBase);
Fields.postTest = (prefabOptions) => { return {data:new Readers.PostTest(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

})(jQuery);

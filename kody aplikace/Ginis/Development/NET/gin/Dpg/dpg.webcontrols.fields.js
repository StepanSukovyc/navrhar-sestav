"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Dpg.WebControls.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperItemTemplate = "helperItemTemplate"; const helperColumns = "helperColumns";

// GDpgReaderAutenticator.fields.js
Readers.GDpgReaderAutenticator = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GDpgReaderAutenticator",keys:["faze"],[columns]:["faze", "level_exp", "popis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GDpgReaderAutenticator.inheritsFrom(ReadersBase);
Fields.gDpgReaderAutenticator = (prefabOptions) => { return {data:new Readers.GDpgReaderAutenticator(),[itemTemplate]:"{faze} | {popis}",[helperItemTemplate]:"<b>{faze}</b> | {popis}",[helperColumns]:["faze", "level_exp", "popis"]};};

// GDpgReaderFaze.fields.js
Readers.GDpgReaderFaze = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GDpgReaderFaze",keys:"faze",[columns]:["faze", "faze_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GDpgReaderFaze.inheritsFrom(ReadersBase);
Fields.gDpgReaderFaze = (prefabOptions) => { return {data:new Readers.GDpgReaderFaze(),[itemTemplate]:"{faze} | {faze_txt}",[helperItemTemplate]:"<b>{faze}</b> | {faze_txt}",[helperColumns]:["faze", "faze_txt"]};};

// GReaderDostupneLicence.fields.js
Readers.DostupneLicence = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDostupneLicence",keys:["lic_fyz"],[columns]:["lic_fyz", "nazev", "verze_db", "sub_verze_db", "revize_adz"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DostupneLicence.inheritsFrom(ReadersBase);
Fields.dostupneLicence = (prefabOptions) => { return {data:new Readers.DostupneLicence(),[itemTemplate]:"{lic_fyz} | {nazev}",[helperItemTemplate]:"<b>{lic_fyz}</b> | {nazev}",[helperColumns]:["lic_fyz", "nazev"]};};

// GReaderDostupneLicenceIxsFun.fields.js
Readers.DostupneLicenceIxsFun = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDostupneLicenceIxsFun",keys:["lic_fyz"],[columns]:["lic_fyz","nazev","verze_db","sub_verze_db","revize_adz"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DostupneLicenceIxsFun.inheritsFrom(ReadersBase);
Fields.dostupneLicenceIxsFun = (prefabOptions) => { return {data:new Readers.DostupneLicenceIxsFun(),[itemTemplate]:"{lic_fyz} | {nazev}",[helperItemTemplate]:"<b>{lic_fyz}</b> | {nazev}",[helperColumns]:["lic_fyz", "nazev"]};};

// GReaderDostupneVerze.fields.js
Readers.DostupneVerze = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDostupneVerze",keys:["verze_db"],[columns]:["verze_db","sub_verze_db","revize_adz"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DostupneVerze.inheritsFrom(ReadersBase);
Fields.dostupneVerze = (prefabOptions) => { return {data:new Readers.DostupneVerze(),[itemTemplate]:"{verze_db}.{sub_verze_db}.{revize_adz}",[helperColumns]:["verze_db", "sub_verze_db", "revize_adz"]};};

// GReaderDostupneVerzeGdesrev.fields.js
Readers.DostupneVerzeGdesrev = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDostupneVerzeGdesrev",keys:["verze_db"],[columns]:["verze_db"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DostupneVerzeGdesrev.inheritsFrom(ReadersBase);
Fields.dostupneVerzeGdesrev = (prefabOptions) => { return {data:new Readers.DostupneVerzeGdesrev(),[itemTemplate]:"{verze_db}",[helperColumns]:["verze_db"]};};

// GReaderDostupneVerzeRevize.fields.js
Readers.DostupneVerzeRevize = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDostupneVerzeRevize",keys:["verze_db"],[columns]:["verze_db","sub_verze_db"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DostupneVerzeRevize.inheritsFrom(ReadersBase);
Fields.dostupneVerzeRevize = (prefabOptions) => { return {data:new Readers.DostupneVerzeRevize(),[itemTemplate]:"{verze_db}.{sub_verze_db}",[helperItemTemplate]:"{verze_db}.{sub_verze_db}",[helperColumns]:["verze_db", "sub_verze_db", "verze_db_txt"]};};

})(jQuery);

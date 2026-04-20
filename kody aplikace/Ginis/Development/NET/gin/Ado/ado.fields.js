"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Ado.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const dropdown = "dropdown"; const graphicInput = "graphicInput";

// GNutsReader.fields.js
Readers.GNutsReader = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GNutsReader",keys:["nuts"],[columns]:["nuts","nuts_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GNutsReader.inheritsFrom(ReadersBase);
Fields.gNutsReader = (prefabOptions) => { return {data:new Readers.GNutsReader(),[itemTemplate]:"<b>{nuts}</b> - {nuts_txt}",[helperColumns]:["nuts", "nuts_txt"],[dropdown]:true,[graphicInput]:"oninput"};};

// GReaderAdoEkocado.fields.js
Readers.AdoEkocado = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdoEkocado",keys:["typ_org"],[columns]:["typ_org","typ_org_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdoEkocado.inheritsFrom(ReadersBase);
Fields.adoEkocado = (prefabOptions) => { return {data:new Readers.AdoEkocado(),[itemTemplate]:"{typ_org_txt}",[helperColumns]:["typ_org_txt"],[dropdown]:true,[graphicInput]:"oninput"};};

// GReaderAdoEkoctuj.fields.js
Readers.AdoEkoctuj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdoEkoctuj",keys:["tuj"],[columns]:["tuj","tuj_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdoEkoctuj.inheritsFrom(ReadersBase);
Fields.adoEkoctuj = (prefabOptions) => { return {data:new Readers.AdoEkoctuj(),[itemTemplate]:"<b>{tuj}</b> - {tuj_txt}",[helperColumns]:["tuj", "tuj_txt"],[dropdown]:true,[graphicInput]:"oninput"};};

// GReaderAdoEkosoke.fields.js
Readers.AdoEkosoke = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdoEkosoke",keys:["okec"],[columns]:["okec","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdoEkosoke.inheritsFrom(ReadersBase);
Fields.adoEkosoke = (prefabOptions) => { return {data:new Readers.AdoEkosoke(),[itemTemplate]:"<b>{okec}</b> - {nazev}",[graphicInput]:"oninput",[dropdown]:true,[helperColumns]:["okec", "nazev"]};};

// GReaderAdoEkosrar.fields.js
Readers.AdoEkosrar = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdoEkosrar",keys:["ixs_rar"],[columns]:["ixs_rar","orgnum","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdoEkosrar.inheritsFrom(ReadersBase);
Fields.adoEkosrar = (prefabOptions) => { return {data:new Readers.AdoEkosrar(),[itemTemplate]:"<b>{ixs_rar} - {nazev}</b>",[helperColumns]:["ixs_rar", "nazev"],[dropdown]:true,[graphicInput]:"oninput"};};

// GReaderAdoEkoszuj.fields.js
Readers.AdoEkoszuj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdoEkoszuj",keys:["zuje"],[columns]:["zuje","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdoEkoszuj.inheritsFrom(ReadersBase);
Fields.adoEkoszuj = (prefabOptions) => { return {data:new Readers.AdoEkoszuj(),[itemTemplate]:"<b>{zuje}</b> - {nazev}",[helperColumns]:["zuje", "nazev"],[graphicInput]:"oninput",[dropdown]:true};};

// GReaderAdoGincdur.fields.js
Readers.AdoGincdur = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdoGincdur",keys:["dur"],[columns]:["dur","dur_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdoGincdur.inheritsFrom(ReadersBase);
Fields.adoGincdur = (prefabOptions) => { return {data:new Readers.AdoGincdur(),[itemTemplate]:"<b>{dur}</b> - {dur_txt}",[helperColumns]:["dur", "dur_txt"],[graphicInput]:"oninput",[dropdown]:true};};

// GReaderAdoVykcoke.fields.js
Readers.AdoVykcoke = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdoVykcoke",keys:["okec"],[columns]:["okec","okec_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdoVykcoke.inheritsFrom(ReadersBase);
Fields.adoVykcoke = (prefabOptions) => { return {data:new Readers.AdoVykcoke(),[itemTemplate]:"<b>{okec}</b> - {okec_txt}",[graphicInput]:"oninput",[dropdown]:true,[helperColumns]:["okec", "okec_txt"]};};

})(jQuery);

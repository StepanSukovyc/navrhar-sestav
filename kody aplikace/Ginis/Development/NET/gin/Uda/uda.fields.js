"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Uda.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const dropdown = "dropdown";

// GReaderGUdeszud.fields.js
Readers.Udeszud = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUdeszud",keys:["ixs_zud"],[columns]:["ixs_zud","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Udeszud.inheritsFrom(ReadersBase);
Fields.udeszud = (prefabOptions) => { return {data:new Readers.Udeszud(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderUdecszv.fields.js
Readers.Udecszv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUdecszv",keys:["s_zverej"],[columns]:["s_zverej", "s_zverej_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Udecszv.inheritsFrom(ReadersBase);
Fields.udecszv = (prefabOptions) => { return {data:new Readers.Udecszv(),[itemTemplate]:"{s_zverej_txt}",[helperColumns]:["s_zverej_txt"],[dropdown]:true};};

})(jQuery);

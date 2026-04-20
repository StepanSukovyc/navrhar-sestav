"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Ozn.WebClient.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const dropdown = "dropdown"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns";

// GReaderGincums.fields.js
Readers.Gincums = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincums",keys:["uroven_msg"],[columns]:["uroven_msg","uroven_msg_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincums.inheritsFrom(ReadersBase);
Fields.gincums = (prefabOptions) => { return {data:new Readers.Gincums(),[dropdown]:true,[itemTemplate]:"{uroven_msg_txt}",[helperColumns]:["uroven_msg", "uroven_msg_txt"]};};

})(jQuery);

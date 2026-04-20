"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Esu.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const cached = "cached"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns";

// GReaderGinsesuPol.fields.js
Readers.GinsesuPol = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsesuPol",keys:["ixs_esu","lic","por_zast"],[columns]:["ixs_esu","lic","aktivita","nazev","ico","num_zast","esu_txt","id_ds","por_zast","zast_txt","aktivita_zast","typ_esu","insolvence","ur_pri","anonymizovano","iszr","iszrTxt","rc","dic","stat","dat_nar","stat_txt","obec","psc","ulice","tel","zkratka","mail"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.GinsesuPol.inheritsFrom(ReadersBase);
Fields.ginsesuPol = (prefabOptions) => { return {data:new Readers.GinsesuPol({ readerParams: {Ixp:arguments[0]}}),[itemTemplate]:"{esu_txt}",[helperColumns]:["esu_txt"]};};

})(jQuery);

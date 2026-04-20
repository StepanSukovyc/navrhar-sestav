"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Bar.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const cached = "cached"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const selector = "selector"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat";

// GReaderBarsverBar.fields.js
Readers.BarsverBar = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBarsverBar",keys:["verze_c","verze_k"],[columns]:["verze_c", "verze_k"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.BarsverBar.inheritsFrom(ReadersBase);
Fields.barsverBar = (prefabOptions) => { return {data:new Readers.BarsverBar(),[itemTemplate]:"{verze_c}-{verze_k}",[helperColumns]:["verze_c", "verze_k"],[selector]:(options) => newDefaultSelector($.extend(Selectors.barsverBar(),prefabOptions,options)).show()};};
Selectors.barsverBar = () => { return {data:new Readers.BarsverBar(),[userSettings]:usRoot+"barsverBar",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["verze_c", "verze_k"]},[gridFormat]:newGridFormat().addTextColumn({name: "verze_c", caption: "jres:30450002", width: 50, forced: true}).addNumberColumn({name: "verze_k", caption: "jres:30450003", width: 50})};};

// GReaderEkosrarBAR.fields.js
Readers.EkosrarBAR = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosrarBAR",keys:["ico"],[columns]:["ico", "nazev", "aktivita", "dor2", "org", "typ_org"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.EkosrarBAR.inheritsFrom(ReadersBase);
Fields.ekosrarBAR = (prefabOptions) => { return {data:new Readers.EkosrarBAR(),[itemTemplate]:"{ico} - {nazev}",[helperColumns]:["ico", "nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosrarBAR(),prefabOptions,options)).show()};};
Selectors.ekosrarBAR = () => { return {data:new Readers.EkosrarBAR(),[userSettings]:usRoot+"ekosrarBAR",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ico", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "ico", caption: "jres:30450004", width: 150, forced: true}).addTextColumn({name: "nazev", caption: "jres:30450005", width: 300})};};

})(jQuery);

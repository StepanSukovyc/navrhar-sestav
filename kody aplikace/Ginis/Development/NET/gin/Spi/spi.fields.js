"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Spi.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const cached = "cached"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const selector = "selector"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat";

// Gordic.Spi.Client.GReaderSpisska.fields.js
Readers.Spisska = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSpisska",keys:["ixs_ska"],[columns]:["ixs_ska", "ixs_spi", "nazev", "nazev_add", "skar_znak", "priz_skar", "priz_mimskr", "priz_ske", "rok_skartace", "aktivita", "ixs_esu", "dat_zmena", "zmenu_prov", "nazev_rf"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Spisska.inheritsFrom(ReadersBase);
Fields.spisska = (prefabOptions) => { return {data:new Readers.Spisska(),[itemTemplate]:"{nazev_add}",[helperColumns]:["nazev_add", "skar_znak", "ixs_ska"],[selector]:(options) => newDefaultSelector($.extend(Selectors.spisska(),prefabOptions,options)).show()};};
Selectors.spisska = () => { return {data:new Readers.Spisska(),[userSettings]:usRoot+"spisska",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev_add", "skar_znak", "ixs_ska"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev_add", caption: "jres:23120221", width: 150, forced: true}).addDateTimeColumn({name: "dat_zmena", caption: "jres:23120230", width: 120}).addTextColumn({name: "skar_znak", caption: "jres:23120228", width: 50}).addTextColumn({name: "nazev_rf", caption: "jres:23120229", width: 100})};};

// GReaderSpiSpisulm.fields.js
Readers.SpiSpisulm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSpiSpisulm",keys:["ixs_ulm"],[columns]:["ixs_ulm","aktivita","popis","budova_kod","segment_kod","mistnost_kod","budova_naz","segment_naz","mistnost_naz","ixs_spi"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.SpiSpisulm.inheritsFrom(ReadersBase);
Fields.spiSpisulm = (prefabOptions) => { return {data:new Readers.SpiSpisulm(),[itemTemplate]:"{popis}",[helperColumns]:["popis", "ixs_ulm"],[selector]:(options) => newDefaultSelector($.extend(Selectors.spiSpisulm(),prefabOptions,options)).show()};};
Selectors.spiSpisulm = () => { return {data:new Readers.SpiSpisulm(),[userSettings]:usRoot+"spiSpisulm",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["popis", "ixs_ulm"]},[gridFormat]:newGridFormat().addTextColumn({name: "popis", caption: "jres:23120235", width: 100, forced: true}).addTextColumn({name: "budova_naz", caption: "jres:23120236", width: 80}).addTextColumn({name: "segment_naz", caption: "jres:23120237", width: 80}).addTextColumn({name: "mistnost_naz", caption: "jres:23120238", width: 80})};};

})(jQuery);

"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Bpl.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const cached = "cached"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const graphicInput = "graphicInput"; const itemTooltipTemplate = "itemTooltipTemplate"; const verticalButtons = "verticalButtons"; const helperColumns = "helperColumns"; const states = "states"; const selector = "selector"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat";

// GReaderBplEkoskom.fields.js
Readers.BplEkoskom = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBplEkoskom",keys:["ico","ixs_fun"],[columns]:["ico", "ixs_fun", "nazev_ref", "nazev", "cis_real", "num_komp"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.BplEkoskom.inheritsFrom(ReadersBase);
Fields.bplEkoskom = (PouzitRezimy,DokladJeEvidovany,Dvouradkovy,prefabOptions) => { return {data:new Readers.BplEkoskom({ readerParams: { PouzitRezimy: PouzitRezimy, DokladJeEvidovany: DokladJeEvidovany } }),[itemTemplate]:function (row) {
        const FieldFunction = Gordic.Prefabs.Utils;
        var text = FieldFunction.getFormatedString(["Realizátor", row.cis_real], ": ");
        return (Dvouradkovy !== false ? "{0}<br><i>{1}{2}</i>" : "{0}, {1}").format(FieldFunction.getTrimEncodeString(row.nazev_ref), FieldFunction.getTrimEncodeString(row.nazev), !FieldFunction.isEmpty(text) ? " ( " + text + " )" : "");
    },[graphicInput]:"oninput",[itemTooltipTemplate]:function (row) {
        const FieldFunction = Gordic.Prefabs.Utils;
        var text = FieldFunction.getFormatedString(["Realizátor", row.cis_real], ": ");
        return (Dvouradkovy !== false ? "{0}<br><i>{1}{2}</i>" : "{0}, {1}").format(FieldFunction.getTrimEncodeString(row.nazev_ref), FieldFunction.getTrimEncodeString(row.nazev), !FieldFunction.isEmpty(text) ? " ( " + text + " )" : "");
    },[verticalButtons]:true,[helperColumns]:["nazev_ref", "nazev", "cis_real", "num_komp"],[states]:[{
        icon: "gi-user",
        align: "opposite",
        customClass: "g-inactive-prefabState"
    }],[selector]:(options) => newDefaultSelector($.extend(Selectors.bplEkoskom(PouzitRezimy,DokladJeEvidovany,Dvouradkovy),prefabOptions,options)).show()};};
Selectors.bplEkoskom = (PouzitRezimy,DokladJeEvidovany) => { return {data:new Readers.BplEkoskom({ readerParams: { PouzitRezimy: PouzitRezimy, DokladJeEvidovany: DokladJeEvidovany } }),[userSettings]:usRoot+"bplEkoskom",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev_ref", "nazev", "cis_real", "num_komp"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev_ref", caption: "jres:29690089", width: 120, forced: true}).addTextColumn({name: "nazev", caption: "jres:29690090", width: 260}).addTextColumn({name: "cis_real", caption: "jres:29690091", width: 60}).addTextColumn({name: "num_komp", caption: "jres:29690092", width: 60})};};

// GReaderBplskon.fields.js
Readers.Bplskon = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBplskon",keys:["ixs_kon"],[columns]:["ixs_kon","kod","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Bplskon.inheritsFrom(ReadersBase);
Fields.bplskon = (Agenda,prefabOptions) => { return {data:new Readers.Bplskon({ readerParams: { Agenda: Agenda } }),[itemTemplate]:"{kod} - {nazev}",[helperColumns]:["kod", "nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.bplskon(Agenda),prefabOptions,options)).show()};};
Selectors.bplskon = (Agenda) => { return {data:new Readers.Bplskon({ readerParams: { Agenda: Agenda } }),[userSettings]:usRoot+"bplskon",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["kod", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "kod", caption: "jres:29690050", width: 100, forced: true}).addTextColumn({name: "nazev", caption: "jres:29690051", width: 100})};};

})(jQuery);

"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Hpl.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns";

// Gordic.Hpl.Client.GReaderBucskap.fields.js
Readers.PokBucskap = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBucskap",keys:["pos_id"],[columns]:["pos_id","kac_txt","cis_obch"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PokBucskap.inheritsFrom(ReadersBase);
Fields.bucskap = (prefabOptions) => { return {data:new Readers.PokBucskap(),[itemTemplate]:"{pos_id}",[helperColumns]:["pos_id"]};};

// Gordic.Hpl.Client.GReaderPOKDdpstpp.fields.js
Readers.POKDdpstpp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPOKDdpstpp",keys:["typ_phl"],[columns]:["typ_phl","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.POKDdpstpp.inheritsFrom(ReadersBase);
Fields.POKDdpstpp = (prefabOptions) => { return {data:new Readers.POKDdpstpp(),[itemTemplate]:"{typ_phl} - {nazev}",[helperColumns]:["typ_phl", "nazev"]};};

// Gordic.Hpl.Client.GReaderPoksden.fields.js
Readers.Poksden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPoksden",keys:["ixp_den"],[columns]:["ixp_den","aktivita","nazev","rok"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Poksden.inheritsFrom(ReadersBase);
Fields.poksden = (prefabOptions) => { return {data:new Readers.Poksden(),[itemTemplate]:function (row) { return Gordic.Prefabs.Utils.getSimpleInfoString(row.nazev, row.rok); },[helperColumns]:["nazev"]};};

// Gordic.Hpl.Client.GReaderPokskonLk.fields.js
Readers.PokskonLk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPokskonLk",keys:["ixs_kon"],[columns]:["ixs_kon","nazev","typ_kon","kod","kod_kon","ktg_typ","kod_kon"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PokskonLk.inheritsFrom(ReadersBase);
Fields.pokskonLk = (prefabOptions) => { return {data:new Readers.PokskonLk(),[itemTemplate]:"{kod_kon}",[helperColumns]:["kod_kon"]};};

// Gordic.Hpl.Client.GReaderPoksvpk.fields.js
Readers.Poksvpk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPoksvpk",keys:["ixs_vpk"],[columns]:["ixs_vpk","aktivita","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Poksvpk.inheritsFrom(ReadersBase);
Fields.poksvpk = (prefabOptions) => { return {data:new Readers.Poksvpk(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// Gordic.Hpl.Client.GReaderPokUctdroz.fields.js
Readers.PokUctdroz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPokUctdroz",keys:["ueb"],[columns]:["ueb", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PokUctdroz.inheritsFrom(ReadersBase);
Fields.pokUctdroz = (prefabOptions) => { return {data:new Readers.PokUctdroz(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// Gordic.Hpl.Client.GReaderPokOcekavanePlatbyLk.fields.js
Readers.PokOcekavanePlatbyLk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPokOcekavanePlatbyLk",keys:["ixp","radek_uhr"],[columns]:["ixp","vs","radek_uhr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PokOcekavanePlatbyLk.inheritsFrom(ReadersBase);
Fields.pokOcekavanePlatbyLk = (prefabOptions) => { return {data:new Readers.PokOcekavanePlatbyLk(),[itemTemplate]:"{vs}",[helperColumns]:["vs"]};};

})(jQuery);

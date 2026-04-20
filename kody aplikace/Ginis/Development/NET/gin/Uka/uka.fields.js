"use strict";
(function($) {
var Readers = namespace("Gordic.Data.Readers");
var Fields = namespace("Gordic.Prefabs.Select");
var Selectors = namespace("Gordic.Data.Selectors");

// GReaderSmlcstauka.fields.js
Readers.Smlcstauka = function(options) { this._base({readerClass:"Gordic.Uka.Client.Readers.GReaderSmlcstauka",keys:['sml_stav'],columns:["sml_stav", "sml_stav_txt", "k_v"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Smlcstauka.inheritsFrom(Readers.Base);
Fields.smlcstauka = function() { return {data:new Readers.Smlcstauka(),dropdown:true,itemTemplate:"{sml_stav_txt}",helperColumns:["sml_stav_txt"]};};

})(jQuery);

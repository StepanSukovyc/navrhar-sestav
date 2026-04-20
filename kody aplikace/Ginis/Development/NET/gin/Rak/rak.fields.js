"use strict";
(function($) {
var Readers = namespace("Gordic.Data.Readers");
var Fields = namespace("Gordic.Prefabs.Select");
var Selectors = namespace("Gordic.Data.Selectors");

// Gordic.Rak.Client.GReaderRakcden.fields.js
Readers.Rakcden = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Rak.Client.GReaderRakcden",keys:["typ_dk"],columns:["typ_dk","typ_dk_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rakcden.inheritsFrom(Readers.Base);
Fields.rakcden = function(prefabOptions) { return {data:new Readers.Rakcden(),itemTemplate:"{typ_dk_txt}",helperColumns:["typ_dk_txt"]};};

})(jQuery);

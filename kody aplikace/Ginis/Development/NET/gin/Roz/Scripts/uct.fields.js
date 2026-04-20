"use strict";
(function($) {
var Readers = namespace("Gordic.Data.Readers");
var Fields = namespace("Gordic.Prefabs.Select");

// GReaderRozcadr.fields.js
Readers.Rozcadr = function(options) { this._base({readerClass:"Gordic.Uct.Client.GReaderRozcadr",keys:['a_druh'],columns:["a_druh","a_druh_txt","k_s"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rozcadr.inheritsFrom(Readers.Base);
Fields.rozcadr = function() { return {data:new Readers.Rozcadr(),itemTemplate:"{k_s} - {a_druh_txt}",helperColumns:["a_druh", "a_druh_txt", "k_s"]};};

// GReaderRozcast.fields.js
Readers.Rozcast = function(options) { this._base({readerClass:"Gordic.Uct.Client.GReaderRozcast",keys:['a_stav'],columns:["a_stav","a_stav_txt","k_v","k_s"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rozcast.inheritsFrom(Readers.Base);
Fields.rozcast = function() { return {data:new Readers.Rozcast(),itemTemplate:"{a_stav_txt}",helperColumns:["a_stav", "a_stav_txt"]};};

})(jQuery);

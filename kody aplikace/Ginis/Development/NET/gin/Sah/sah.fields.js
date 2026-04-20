"use strict";
(function($) {
var Readers = namespace("Gordic.Data.Readers");
var Fields = namespace("Gordic.Prefabs.Select");
var Selectors = namespace("Gordic.Data.Selectors");

// Gordic.Sah.Client.GReaderRekcpdv.fields.js
Readers.Rekcpdv = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Sah.Client.GReaderRekcpdv",keys:["typ_pdv"],columns:["typ_pdv","typ_pdv_txt","k_v"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rekcpdv.inheritsFrom(Readers.Base);
Fields.rekcpdv = function(prefabOptions) { return {data:new Readers.Rekcpdv(),itemTemplate:"{typ_pdv_txt}",helperColumns:["typ_pdv_txt"]};};

// Gordic.Sah.Client.GReaderRekskli.fields.js
Readers.Rekskli = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Sah.Client.GReaderRekskli",keys:["ixs_kli"],columns:["ixs_kli","ico","nazev","id_klient","obec","esu_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rekskli.inheritsFrom(Readers.Base);
Fields.rekskli = function(prefabOptions) { return {data:new Readers.Rekskli(),itemTemplate:"{nazev}",helperColumns:["nazev"]};};

})(jQuery);

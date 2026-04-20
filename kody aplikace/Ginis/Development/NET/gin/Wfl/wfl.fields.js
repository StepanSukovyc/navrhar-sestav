"use strict";
(function($) {
var Readers = namespace("Gordic.Data.Readers");
var Fields = namespace("Gordic.Prefabs.Select");
var Selectors = namespace("Gordic.Data.Selectors");

// GReaderGinsmbxField.fields.js
Readers.GinsmbxField = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Wfl.Client.GReaderGinsmbxField",keys:["mailbox"],columns:["mailbox", "ixs_su", "nazev"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.GinsmbxField.inheritsFrom(Readers.Base);
Fields.ginsmbxField = function(prefabOptions) { return {data:new Readers.GinsmbxField(),dropdown:true,itemTemplate:"{nazev}, {mailbox}",helperColumns:["nazev", "mailbox"]};};

// GReaderWflshpz.fields.js
Readers.Wflshpz = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Wfl.Client.GReaderWflshpz",keys:["ixs_hpz"],columns:["ixs_hpz","nazev","popis","kod_stand_zak","kod_dopln_slu","k_s","aktivita","dat_zmena","zmenu_prov"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Wflshpz.inheritsFrom(Readers.Base);
Fields.wflshpz = function(prefabOptions) { return {data:new Readers.Wflshpz(),dropdown:true,itemTemplate:"{nazev}",helperColumns:["nazev"]};};

// GReaderWflsksl.fields.js
Readers.Wflsksl = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Wfl.Client.GReaderWflsksl",keys:["komb_sluzeb"],columns:["komb_sluzeb","komb_sluzeb_txt","zkratka","nazev","aktivita","dat_zmena","zmenu_prov","filtr_format"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Wflsksl.inheritsFrom(Readers.Base);
Fields.wflsksl = function(prefabOptions) { return {data:new Readers.Wflsksl(),dropdown:true,itemTemplate:"{zkratka} - {nazev}",helperColumns:["komb_sluzeb_txt", "zkratka", "nazev"]};};

// Gordic.Wfl.Client.GKlicSlovaReader.fields.js
Readers.WflKlicSlova = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Wfl.Client.GReaderWflKlicSlova",keys:["kl_slovo"],columns:["kl_slovo","edit","pocet_zmenu_prov"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.WflKlicSlova.inheritsFrom(Readers.Base);
Fields.wflKlicSlova = function(prefabOptions) { return {data:new Readers.WflKlicSlova(),dropdown:true,multi:true,strict:false,sortable:true,itemWidth:"",showSelectButton:false,verticalButtons:true,itemTemplate:"{kl_slovo}",helperColumns:["kl_slovo"]};};

})(jQuery);

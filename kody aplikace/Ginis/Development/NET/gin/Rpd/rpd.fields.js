"use strict";
(function($) {
var Readers = namespace("Gordic.Data.Readers");
var Fields = namespace("Gordic.Prefabs.Select");
var Selectors = namespace("Gordic.Data.Selectors");

// Gordic.Rpd.Client.GReaderRpdcdop.fields.js
Readers.Rpdcdop = function(options) { this._base({readerClass:"Gordic.Rpd.Client.GReaderRpdcdop",keys:['kod_dopl'],columns:["kod_dopl","kod_dopl_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rpdcdop.inheritsFrom(Readers.Base);
Fields.rpdcdop = function() { return {data:new Readers.Rpdcdop(),dropdown:true,itemTemplate:"{kod_dopl_txt}",helperColumns:["kod_dopl", "kod_dopl_txt"]};};

// Gordic.Rpd.Client.GReaderRpdcpcr.fields.js
Readers.Rpdcpcr = function(options) { this._base({readerClass:"Gordic.Rpd.Client.GReaderRpdcpcr",keys:['kod_cerpani'],columns:["kod_cerpani","kod_cerpani_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rpdcpcr.inheritsFrom(Readers.Base);
Fields.rpdcpcr = function() { return {data:new Readers.Rpdcpcr(),dropdown:true,itemTemplate:"{kod_cerpani_txt}",helperColumns:["kod_cerpani", "kod_cerpani_txt"]};};

// Gordic.Rpd.Client.GReaderRpdcrez.fields.js
Readers.Rpdcrez = function(options) { this._base({readerClass:"Gordic.Rpd.Client.GReaderRpdcrez",keys:['rezim_pd'],columns:["rezim_pd","rezim_pd_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rpdcrez.inheritsFrom(Readers.Base);
Fields.rpdcrez = function() { return {data:new Readers.Rpdcrez(),dropdown:true,itemTemplate:"{rezim_pd_txt}",helperColumns:["rezim_pd", "rezim_pd_txt"]};};

// Gordic.Rpd.Client.GReaderRpdcszn.fields.js
Readers.Rpdcszn = function(options) { this._base({readerClass:"Gordic.Rpd.Client.GReaderRpdcszn",keys:['stav_zaznamu'],columns:["stav_zaznamu","stav_kch_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rpdcszn.inheritsFrom(Readers.Base);
Fields.rpdcszn = function() { return {data:new Readers.Rpdcszn(),dropdown:true,itemTemplate:"{stav_kch_txt}",helperColumns:["stav_zaznamu", "stav_kch_txt"]};};

// Gordic.Rpd.Client.GReaderRpdczsm.fields.js
Readers.Rpdczsm = function(options) { this._base({readerClass:"Gordic.Rpd.Client.GReaderRpdczsm",keys:['kod_zmeny'],columns:["kod_zmeny","kod_zmeny_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rpdczsm.inheritsFrom(Readers.Base);
Fields.rpdczsm = function() { return {data:new Readers.Rpdczsm(),dropdown:true,itemTemplate:"{kod_zmeny_txt}",helperColumns:["kod_zmeny", "kod_zmeny_txt"]};};

// GReaderFuccsuo.fields.js
Readers.Fuccsuo = function(options) { this._base({readerClass:"Gordic.Rpd.Client.GReaderFuccsuo",keys:['s_upo'],columns:["s_upo","s_upo_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Fuccsuo.inheritsFrom(Readers.Base);
Fields.fuccsuo = function() { return {data:new Readers.Fuccsuo(),itemTemplate:"{?}",helperColumns:["?"]};};

// GReaderRpdcpolUed.fields.js
Readers.RpdcpolUed = function(options) { this._base({readerClass:"Gordic.Rpd.Client.GReaderRpdcpolUed",keys:['ued'],columns:["ued"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.RpdcpolUed.inheritsFrom(Readers.Base);
Fields.rpdcpolUed = function() { return {data:new Readers.RpdcpolUed(),dropdown:false,itemTemplate:"{ued}",helperColumns:["ued"]};};

// GReaderRpdcpolUee.fields.js
Readers.RpdcpolUee = function(options) { this._base({readerClass:"Gordic.Rpd.Client.GReaderRpdcpolUee",keys:['uee'],columns:["uee"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.RpdcpolUee.inheritsFrom(Readers.Base);
Fields.rpdcpolUee = function() { return {data:new Readers.RpdcpolUee(),dropdown:false,itemTemplate:"{uee}",helperColumns:["uee"]};};

// GReaderRpdctdo.fields.js
Readers.Rpdctdo = function(options) { this._base({readerClass:"Gordic.Rpd.Client.GReaderRpdctdo",keys:['typ_dot'],columns:["typ_dot","typ_dot_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rpdctdo.inheritsFrom(Readers.Base);
Fields.rpdctdo = function() { return {data:new Readers.Rpdctdo(),itemTemplate:"{?}",helperColumns:["?"]};};

})(jQuery);

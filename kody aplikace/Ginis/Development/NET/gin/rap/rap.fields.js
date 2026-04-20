"use strict";
(function($) {
var Readers = namespace("Gordic.Data.Readers");
var Fields = namespace("Gordic.Prefabs.Select");
var Selectors = namespace("Gordic.Data.Selectors");

// Gordic.Rap.Client.GReaderGinsvex.fields.js
Readers.Ginsvex = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Rap.Client.GReaderGinsvex",keys:["verif_exu"],columns:["verif_exu","nazev"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Ginsvex.inheritsFrom(Readers.Base);
Fields.ginsvex = function(prefabOptions) { return {data:new Readers.Ginsvex(),itemTemplate:"{?}",helperColumns:["?"]};};

// GReaderDefiniceOmezenehoPristupu.fields.js
Readers.DefiniceOmezenehoPristupu = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Rap.Client.GReaderDefiniceOmezenehoPristupu",keys:["ixs_tpp"],columns:["ixs_tpp","nazev","typ_prist_nah","typ_prist_nah_txt","poc_hod_exp","poc_dni_exp","poc_hod_exp_max","poc_dni_exp_max","aktivita"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.DefiniceOmezenehoPristupu.inheritsFrom(Readers.Base);
Fields.definiceOmezenehoPristupu = function(prefabOptions) { return {data:new Readers.DefiniceOmezenehoPristupu(),itemTemplate:"{nazev}",helperColumns:["ixs_tpp","nazev"]};};

// GReaderRapcplm.fields.js
Readers.Rapcplm = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Rap.Client.GReaderRapcplm",keys:["priz_plm"],columns:["priz_plm","priz_plm_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rapcplm.inheritsFrom(Readers.Base);
Fields.rapcplm = function(prefabOptions) { return {data:new Readers.Rapcplm(),dropdown:true,itemTemplate:"{priz_plm_txt}",helperColumns:["priz_plm", "priz_plm_txt"]};};

// GReaderRapcspn.fields.js
Readers.Rapcspn = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Rap.Client.GReaderRapcspn",keys:["stav_spn"],columns:["stav_spn","stav_spn_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rapcspn.inheritsFrom(Readers.Base);
Fields.rapcspn = function(prefabOptions) { return {data:new Readers.Rapcspn(),dropdown:true,itemTemplate:"{stav_spn_txt}",helperColumns:["stav_sps", "stav_spn_txt"]};};

// GReaderRapctpp.fields.js
Readers.Rapctpp = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Rap.Client.GReaderRapctpp",keys:["typ_prist_nah"],columns:["typ_prist_nah","typ_prist_nah_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rapctpp.inheritsFrom(Readers.Base);
Fields.rapctpp = function(prefabOptions) { return {data:new Readers.Rapctpp(),dropdown:true,itemTemplate:"{typ_prist_nah_txt}",helperColumns:["typ_prist_nah","typ_prist_nah_txt"]};};

// GReaderRapczpo.fields.js
Readers.Rapczpo = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Rap.Client.GReaderRapczpo",keys:["zp_overeni"],columns:["zp_overeni","zp_overeni_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rapczpo.inheritsFrom(Readers.Base);
Fields.rapczpo = function(prefabOptions) { return {data:new Readers.Rapczpo(),dropdown:true,itemTemplate:"{zp_overeni_txt}",helperColumns:["zp_overeni","zp_overeni_txt"]};};

// GReaderStrukturaPopisuZivotniSituace.fields.js
Readers.StrukturaPopisuZivotniSituace = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Rap.Client.GReaderStrukturaPopisuZivotniSituace",keys:["kod_sps"],columns:["kod_sps","kod_sps_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.StrukturaPopisuZivotniSituace.inheritsFrom(Readers.Base);
Fields.strukturaPopisuZivotniSituace = function(prefabOptions) { return {data:new Readers.StrukturaPopisuZivotniSituace(),dropdown:true,itemTemplate:"{kod_sps_txt}",helperColumns:["kod_sps", "kod_sps_txt"]};};

})(jQuery);

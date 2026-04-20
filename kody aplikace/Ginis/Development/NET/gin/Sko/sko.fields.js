"use strict";
(function($) {
var Readers = namespace("Gordic.Data.Readers");
var Fields = namespace("Gordic.Prefabs.Select");
var Selectors = namespace("Gordic.Data.Selectors");

// Gordic.Sko.Client.GReaderSkocdslDto.fields.js
Readers.SkocdslDto = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Sko.Client.GReaderSkocdslDto",keys:["duv_sl"],columns:["duv_sl","duv_sl_txt","k_v","k_s","k_xml"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.SkocdslDto.inheritsFrom(Readers.Base);
Fields.skocdslDto = function(prefabOptions) { return {data:new Readers.SkocdslDto(),dropdown:true,itemTemplate:"{duv_sl_txt}",helperColumns:["duv_sl_txt"]};};

// Gordic.Sko.Client.GReaderSkoEkososeFun.fields.js
Readers.SkoEkososeFun = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Sko.Client.GReaderSkoEkososeFun",keys:["ixs_ose"],columns:["ixs_ose","nazev"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.SkoEkososeFun.inheritsFrom(Readers.Base);
Fields.skoEkososeFun = function(prefabOptions) { return {data:new Readers.SkoEkososeFun(),itemTemplate:"{nazev}",helperColumns:["ixs_ose", "nazev"]};};

// Gordic.Sko.Client.GReaderSkoSeznamFunkciDdp.fields.js
Readers.SkoSeznamFunkciDdp = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Sko.Client.GReaderSkoSeznamFunkciDdp",keys:["ixs_fun"],columns:["ixs_fun","nazev_rf", "nks"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.SkoSeznamFunkciDdp.inheritsFrom(Readers.Base);
Fields.skoSeznamFunkciDdp = function(prefabOptions) { return {data:new Readers.SkoSeznamFunkciDdp(),itemTemplate:"{nazev_rf}",helperColumns:["nazev_rf", "nks"]};};

// Gordic.Sko.Client.GReaderSkoSeznamFunkciNksDdp.fields.js
Readers.SkoSeznamFunkciNksDdp = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Sko.Client.GReaderSkoSeznamFunkciNksDdp",keys:["ixs_fun","nks"],columns:["ixs_fun","nks","nazev_rf"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.SkoSeznamFunkciNksDdp.inheritsFrom(Readers.Base);
Fields.skoSeznamFunkciNksDdp = function(prefabOptions) { return {data:new Readers.SkoSeznamFunkciNksDdp(),itemTemplate:"{nazev_rf}",helperColumns:["nazev_rf", "nks"]};};

// Gordic.Sko.Client.GReaderSkoSeznamNks.fields.js
Readers.SkoSeznamNks = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Sko.Client.GReaderSkoSeznamNks",keys:["nks"],columns:["nks","nazev"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.SkoSeznamNks.inheritsFrom(Readers.Base);
Fields.skoSeznamNks = function(prefabOptions) { return {data:new Readers.SkoSeznamNks(),itemTemplate:"{nks}",helperColumns:["nks", "nazev"],selector:function(options) {return new Selectors.DefaultSelector($.extend(options,Selectors.prrGinsfrm(),prefabOptions)).show();}};};
Selectors.prrGinsfrm = function() { return {data:new Readers.SkoSeznamNks(),gridFormat:[
        { name: "nks", caption: "jres:25302061", width: 150 },         { name: "nazev", caption: "jres:25302062" }     ],userSettings:"defaultSelectors.prrGinsfrm",isolatedUserSettings:true,gridOpts:{searchColumns:["nks", "nazev"]}};};

// Gordic.Sko.Client.GReaderSkoSeznamSpravcuPohledavek.fields.js
Readers.SkoSeznamSpravcuPohledavek = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Sko.Client.GReaderSkoSeznamSpravcuPohledavek",keys:["ico","cis_spr"],columns:["nazev","dat_od","dat_do"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.SkoSeznamSpravcuPohledavek.inheritsFrom(Readers.Base);
Fields.skoSeznamSpravcuPohledavek = function(prefabOptions) { return {data:new Readers.SkoSeznamSpravcuPohledavek(),itemTemplate:"{cis_spr}-{nazev}",helperColumns:["cis_spr", "nazev"]};};

// Gordic.Sko.Client.GReaderSkoSeznamTypuPohledavek.fields.js
Readers.SkoSeznamTypuPohledavek = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Sko.Client.GReaderSkoSeznamTypuPohledavek",keys:["typ_phl"],columns:["typ_phl","nazev"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.SkoSeznamTypuPohledavek.inheritsFrom(Readers.Base);
Fields.skoSeznamTypuPohledavek = function(prefabOptions) { return {data:new Readers.SkoSeznamTypuPohledavek(),itemTemplate:"{typ_phl}-{nazev}",helperColumns:["typ_phl", "nazev"]};};

// Gordic.Sko.Client.GReaderSkosmauDto.fields.js
Readers.SkosmauDto = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Sko.Client.GReaderSkosmauDto",keys:["kod_mau"],columns:["kod_mau","popis"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.SkosmauDto.inheritsFrom(Readers.Base);
Fields.skosmauDto = function(prefabOptions) { return {data:new Readers.SkosmauDto(),itemTemplate:"{kod_mau} - {popis}",helperColumns:["kod_mau", "popis"]};};

// Gordic.Sko.Client.GReaderSkosmauKodTisk.fields.js
Readers.SkosmauKodTisk = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Sko.Client.GReaderSkosmauKodTisk",keys:["kod_mau"],columns:["kod_mau","kod_mau_kod"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.SkosmauKodTisk.inheritsFrom(Readers.Base);
Fields.skosmauKodTisk = function(prefabOptions) { return {data:new Readers.SkosmauKodTisk(),itemTemplate:"{kod_mau}",helperColumns:["kod_mau"]};};

// Gordic.Sko.Client.GReaderSkosmauTisk.fields.js
Readers.SkosmauTisk = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Sko.Client.GReaderSkosmauTisk",keys:["kod_mau"],columns:["kod_mau","popis"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.SkosmauTisk.inheritsFrom(Readers.Base);
Fields.skosmauTisk = function(prefabOptions) { return {data:new Readers.SkosmauTisk(),itemTemplate:"{kod_mau} - {popis}",helperColumns:["kod_mau","popis"]};};

// Gordic.Sko.Client.GReaderSkosoosDtos.fields.js
Readers.SkosoosDtos = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Sko.Client.GReaderSkosoosDtos",keys:["kod_oos"],columns:["kod_oos","popis"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.SkosoosDtos.inheritsFrom(Readers.Base);
Fields.skosoosDtos = function(prefabOptions) { return {data:new Readers.SkosoosDtos(),itemTemplate:"{kod_oos}-{popis}",helperColumns:["kod_oos", "popis"]};};

// Gordic.Sko.Client.GReaderSkospvsDtos.fields.js
Readers.SkospvsDtos = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Sko.Client.GReaderSkospvsDtos",keys:["kod_spv","kod_pvs"],columns:["kod_spv", "kod_pvs", "popis"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.SkospvsDtos.inheritsFrom(Readers.Base);
Fields.skospvsDtos = function(prefabOptions) { return {data:new Readers.SkospvsDtos(),itemTemplate:"{kod_pvs} - {popis}",helperColumns:["kod_pvs", "popis"]};};

// Gordic.Sko.Client.GReaderSkosspvDtos.fields.js
Readers.SkosspvDtos = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Sko.Client.GReaderSkosspvDtos",keys:["kod_spv"],columns:["kod_spv","popis"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.SkosspvDtos.inheritsFrom(Readers.Base);
Fields.skosspvDtos = function(prefabOptions) { return {data:new Readers.SkosspvDtos(),itemTemplate:"{kod_spv} - {popis}",helperColumns:["kod_spv", "popis"]};};

// Gordic.Sko.Client.GReaderSkostsuDtos.fields.js
Readers.SkostsuDtos = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Sko.Client.GReaderSkostsuDtos",keys:["kod_tsu"],columns:["kod_tsu","popis"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.SkostsuDtos.inheritsFrom(Readers.Base);
Fields.skostsuDtos = function(prefabOptions) { return {data:new Readers.SkostsuDtos(),itemTemplate:"{kod_tsu}-{popis}",helperColumns:["kod_tsu", "popis"]};};

})(jQuery);

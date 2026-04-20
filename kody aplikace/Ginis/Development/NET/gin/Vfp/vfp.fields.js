"use strict";
(function($) {
var Readers = namespace("Gordic.Data.Readers");
var Fields = namespace("Gordic.Prefabs.Select");
var Selectors = namespace("Gordic.Data.Selectors");

// Gordic.Vfp.Client.GReaderVfpcdgr.fields.js
Readers.Vfpcdgr = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Vfp.Client.GReaderVfpcdgr",keys:["s_dgr"],columns:["s_dgr","s_dgr_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Vfpcdgr.inheritsFrom(Readers.Base);
Fields.vfpcdgr = function(prefabOptions) { return {data:new Readers.Vfpcdgr(),itemTemplate:"{s_dgr_txt:trim:encode}",helperColumns:["s_dgr_txt"]};};

// Gordic.Vfp.Client.GReaderVfpcevs.fields.js
Readers.Vfpcevs = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Vfp.Client.GReaderVfpcevs",keys:["vfp_stav"],columns:["vfp_stav","vfp_stav_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Vfpcevs.inheritsFrom(Readers.Base);
Fields.vfpcevs = function(prefabOptions) { return {data:new Readers.Vfpcevs(),itemTemplate:"{vfp_stav_txt:trim:encode}",helperColumns:["vfp_stav_txt"]};};

// Gordic.Vfp.Client.GReaderVfpcpur.fields.js
Readers.Vfpcpur = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Vfp.Client.GReaderVfpcpur",keys:["pro_urc"],columns:["pro_urc","pro_urc_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Vfpcpur.inheritsFrom(Readers.Base);
Fields.vfpcpur = function(prefabOptions) { return {data:new Readers.Vfpcpur(),itemTemplate:"{pro_urc_txt:trim:encode}",helperColumns:["pro_urc_txt"]};};

// Gordic.Vfp.Client.GReaderVfpcsdg.fields.js
Readers.Vfpcsdg = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Vfp.Client.GReaderVfpcsdg",keys:["s_sdg"],columns:["s_sdg","s_sdg_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Vfpcsdg.inheritsFrom(Readers.Base);
Fields.vfpcsdg = function(prefabOptions) { return {data:new Readers.Vfpcsdg(),itemTemplate:"{s_sdg_txt:trim:encode}",helperColumns:["s_sdg_txt"]};};

// Gordic.Vfp.Client.GReaderVfpctdg.fields.js
Readers.Vfpctdg = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Vfp.Client.GReaderVfpctdg",keys:["typ_dgr"],columns:["typ_dgr","typ_dgr_txt","k_v","k_s"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Vfpctdg.inheritsFrom(Readers.Base);
Fields.vfpctdg = function(prefabOptions) { return {data:new Readers.Vfpctdg(),itemTemplate:"{typ_dgr_txt:trim:encode}",helperColumns:["typ_dgr_txt"]};};

// Gordic.Vfp.Client.GReaderVfpczfi.fields.js
Readers.Vfpczfi = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Vfp.Client.GReaderVfpczfi",keys:["zps_fin"],columns:["zps_fin","zps_fin_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Vfpczfi.inheritsFrom(Readers.Base);
Fields.vfpczfi = function(prefabOptions) { return {data:new Readers.Vfpczfi(),itemTemplate:"{zps_fin_txt:trim:encode}",helperColumns:["zps_fin_txt"]};};

// Gordic.Vfp.Client.GReaderVfpczpd.fields.js
Readers.Vfpczpd = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Vfp.Client.GReaderVfpczpd",keys:["zpus_pd"],columns:["zpus_pd","zpus_pd_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Vfpczpd.inheritsFrom(Readers.Base);
Fields.vfpczpd = function(prefabOptions) { return {data:new Readers.Vfpczpd(),itemTemplate:"{zpus_pd_txt:trim:encode}",helperColumns:["zpus_pd_txt"]};};

// Gordic.Vfp.Client.GReaderVfpsesu.fields.js
Readers.Vfpsesu = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Vfp.Client.GReaderVfpsesu",keys:["ixs_esu"],columns:["ixs_esu","cis_por","nazev","ico","dat_jis","dat_pis","s_jis_txt","prijal","cj_vz","cj_dgr","naz_prj","misto_pod","cj_po","popis","s_spis","ixs_pri","por_cis_nab","ktg_typ"],rowSize:100,readAll:false,permanent:false,cached:0}, options); };
Readers.Vfpsesu.inheritsFrom(Readers.Base);
Fields.vfpsesu = function(prefabOptions) { return {data:new Readers.Vfpsesu(),itemTemplate:"{nazev:trim:encode}",helperColumns:["nazev"],selector:function(options) {return new Selectors.DefaultSelector($.extend(Selectors.Vfpsesu(),prefabOptions,options)).show();}};};
Selectors.Vfpsesu = function() { return {data:new Readers.Vfpsesu(),userSettings:"defaultSelectors.Vfpsesu",isolatedUserSettings:true,gridOpts:{searchColumns:["nazev"]},gridFormat:new Gordic.Data.GridFormat().addTextColumn({name: "nazev", caption: "jres:26600001", width: 300}).addNumberColumn({name: "por_cis_nab", caption: "jres:26600006", width: 60}).addDateTimeColumn({name: "dat_pis", caption: "jres:26600002", width: 150}).addTextColumn({name: "cj_dgr", caption: "jres:26600003", width: 100}).addTextColumn({name: "naz_prj", caption: "jres:26600005", width: 300})};};

// Gordic.Vfp.Client.GReaderVfpsobl.fields.js
Readers.Vfpsobl = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Vfp.Client.GReaderVfpsobl",keys:["oblast_dt"],columns:["oblast_dt","nazev"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Vfpsobl.inheritsFrom(Readers.Base);
Fields.vfpsobl = function(prefabOptions) { return {data:new Readers.Vfpsobl(),itemTemplate:"{nazev:trim:encode}",helperColumns:["nazev"]};};

})(jQuery);

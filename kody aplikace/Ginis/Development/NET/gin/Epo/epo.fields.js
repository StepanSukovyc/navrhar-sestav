"use strict";
(function($) {
var Readers = namespace("Gordic.Data.Readers");
var Fields = namespace("Gordic.Prefabs.Select");
var Selectors = namespace("Gordic.Data.Selectors");

// Gordic.Epo.Client.GReaderEpocevs.fields.js
Readers.Epocevs = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Epo.Client.GReaderEpocevs",keys:["epo_stav"],columns:["epo_stav","epo_stav_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Epocevs.inheritsFrom(Readers.Base);
Fields.epocevs = function(prefabOptions) { return {data:new Readers.Epocevs(),itemTemplate:"{epo_stav_txt:trim:encode}",helperColumns:["epo_stav_txt"]};};

// Gordic.Epo.Client.GReaderEpockri.fields.js
Readers.Epockri = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Epo.Client.GReaderEpockri",keys:["cis_kri"],columns:["cis_kri","cis_kri_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Epockri.inheritsFrom(Readers.Base);
Fields.epockri = function(prefabOptions) { return {data:new Readers.Epockri(),itemTemplate:"{cis_kri_txt:trim:encode}",helperColumns:["cis_kri_txt"]};};

// Gordic.Epo.Client.GReaderEpoclim.fields.js
Readers.Epoclim = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Epo.Client.GReaderEpoclim",keys:["lim_zac"],columns:["lim_zac","lim_zac_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Epoclim.inheritsFrom(Readers.Base);
Fields.epoclim = function(prefabOptions) { return {data:new Readers.Epoclim(),itemTemplate:"{lim_zac_txt:trim:encode}",helperColumns:["lim_zac_txt"]};};

// Gordic.Epo.Client.GReaderEpocpru.fields.js
Readers.Epocpru = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Epo.Client.GReaderEpocpru",keys:["pred_urc"],columns:["pred_urc","pred_urc_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Epocpru.inheritsFrom(Readers.Base);
Fields.epocpru = function(prefabOptions) { return {data:new Readers.Epocpru(),itemTemplate:"{pred_urc_txt:trim:encode}",helperColumns:["pred_urc_txt"]};};

// Gordic.Epo.Client.GReaderEpocspo.fields.js
Readers.Epocspo = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Epo.Client.GReaderEpocspo",keys:["s_po"],columns:["s_po","s_po_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Epocspo.inheritsFrom(Readers.Base);
Fields.epocspo = function(prefabOptions) { return {data:new Readers.Epocspo(),itemTemplate:"{s_po_txt:trim:encode}",helperColumns:["s_po_txt"]};};

// Gordic.Epo.Client.GReaderEpocsso.fields.js
Readers.Epocsso = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Epo.Client.GReaderEpocsso",keys:["s_sou"],columns:["s_sou","s_sou_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Epocsso.inheritsFrom(Readers.Base);
Fields.epocsso = function(prefabOptions) { return {data:new Readers.Epocsso(),itemTemplate:"{s_sou_txt:trim:encode}",helperColumns:["s_sou_txt"]};};

// Gordic.Epo.Client.GReaderEpoctda.fields.js
Readers.Epoctda = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Epo.Client.GReaderEpoctda",keys:["typ_datum"],columns:["typ_datum","typ_datum_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Epoctda.inheritsFrom(Readers.Base);
Fields.epoctda = function(prefabOptions) { return {data:new Readers.Epoctda(),itemTemplate:"{typ_datum_txt:trim:encode}",helperColumns:["typ_datum_txt"]};};

// Gordic.Epo.Client.GReaderEposesu.fields.js
Readers.Eposesu = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Epo.Client.GReaderEposesu",keys:["ixs_esu"],columns:["ixs_esu","cis_por","nazev","ico","dat_jis","dat_pis","s_jis_txt","prijal","cj_po","popis","s_spis","ixs_pri","por_cis_nab","ktg_typ"],rowSize:100,readAll:false,permanent:false,cached:0}, options); };
Readers.Eposesu.inheritsFrom(Readers.Base);
Fields.eposesu = function(prefabOptions) { return {data:new Readers.Eposesu(),itemTemplate:"{nazev:trim:encode}",helperColumns:["nazev"],selector:function(options) {return new Selectors.DefaultSelector($.extend(Selectors.Eposesu(),prefabOptions,options)).show();}};};
Selectors.Eposesu = function() { return {data:new Readers.Eposesu(),userSettings:"defaultSelectors.Eposesu",isolatedUserSettings:true,gridOpts:{searchColumns:["nazev"]},gridFormat:new Gordic.Data.GridFormat().addTextColumn({name: "nazev", caption: "jres:26600001", width: 300}).addNumberColumn({name: "por_cis_nab", caption: "jres:26600009", width: 60}).addDateTimeColumn({name: "dat_pis", caption: "jres:26600002", width: 150}).addTextColumn({name: "prijal", caption: "jres:26600003", width: 200}).addTextColumn({name: "cj_po", caption: "jres:26600004", width: 100})};};

// Gordic.Epo.Client.GReaderEpossop.fields.js
Readers.Epossop = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Epo.Client.GReaderEpossop",keys:["soutez_po"],columns:["soutez_po", "typ_po_txt","soutez_po_txt","pred_urc_txt","lim_zac_txt","typ_po","lim_zac","pred_urc"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Epossop.inheritsFrom(Readers.Base);
Fields.epossop = function(prefabOptions) { return {data:new Readers.Epossop(),itemTemplate:"{soutez_po_txt:trim:encode}",helperColumns:["soutez_po_txt"],selector:function(options) {return new Selectors.DefaultSelector($.extend(Selectors.epossop(),prefabOptions,options)).show();}};};
Selectors.epossop = function() { return {data:new Readers.Epossop(),userSettings:"defaultSelectors.epossop",isolatedUserSettings:true,gridOpts:{searchColumns:["soutez_po_txt"]},gridFormat:new Gordic.Data.GridFormat().addTextColumn({name: "typ_po_txt", caption: "jres:26600005", width: 100}).addTextColumn({name: "soutez_po_txt", caption: "jres:26600006", width: 300}).addTextColumn({name: "pred_urc_txt", caption: "jres:26600007", width: 100}).addTextColumn({name: "lim_zac_txt", caption: "jres:26600008", width: 100})};};

})(jQuery);

"use strict";
(function($) {
var Readers = namespace("Gordic.Data.Readers");
var Fields = namespace("Gordic.Prefabs.Select");
var Selectors = namespace("Gordic.Data.Selectors");

// GReaderGexcdbs.fields.js
Readers.Gexcdbs = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Agx.WebClient.GReaderGexcdbs",keys:["dbstate"],columns:["dbstate","dbstate_txt","k_v","k_s"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Gexcdbs.inheritsFrom(Readers.Base);
Fields.gexcdbs = function(prefabOptions) { return {data:new Readers.Gexcdbs(),dropdown:true,itemTemplate:"{dbstate_txt}",helperColumns:["dbstate_txt"]};};

// GReaderGexcdbt.fields.js
Readers.Gexcdbt = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Agx.WebClient.GReaderGexcdbt",keys:["dbtype"],columns:["dbtype","dbtype_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Gexcdbt.inheritsFrom(Readers.Base);
Fields.gexcdbt = function(prefabOptions) { return {data:new Readers.Gexcdbt(),dropdown:true,itemTemplate:"{dbtype_txt}",helperColumns:["dbtype_txt"]};};

})(jQuery);

"use strict";
(function($) {
var Readers = namespace("Gordic.Data.Readers");
var Fields = namespace("Gordic.Prefabs.Select");
var Selectors = namespace("Gordic.Data.Selectors");

// Gordic.Mtk.Client.GReaderRobctyp.fields.js
Readers.Robctyp = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Mtk.Client.GReaderRobctyp",keys:["ktg_den"],columns:["ktg_den","ktg_den_txt","k_v"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Robctyp.inheritsFrom(Readers.Base);
Fields.robctyp = function(prefabOptions) { return {data:new Readers.Robctyp(),itemTemplate:"{ktg_den_txt}",helperColumns:["ktg_den_txt"]};};

// Gordic.Mtk.Client.GReaderRobcvid.fields.js
Readers.Robcvid = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Mtk.Client.GReaderRobcvid",keys:["typ_vid"],columns:["typ_vid","typ_vid_txt","k_v"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Robcvid.inheritsFrom(Readers.Base);
Fields.robcvid = function(prefabOptions) { return {data:new Readers.Robcvid(),itemTemplate:"{typ_vid_txt}",helperColumns:["typ_vid", "typ_vid_txt", "k_v", "k_s"]};};

// Gordic.Mtk.Client.GReaderPokvkonDto.fields.js
Readers.PokvkonDto = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Mtk.Client.GReaderPokvkonDto",keys:["ixs_vpk","ixs_kon"],columns:["ixs_vpk","ixs_kon","aktivita","dat_zmena","zmenu_prov","typ_kon","kod","nazev","zkratka"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.PokvkonDto.inheritsFrom(Readers.Base);
Fields.pokvkonDto = function(prefabOptions) { return {data:new Readers.PokvkonDto(),itemTemplate:"{kod}",helperColumns:["ixs_kon", "kod", "nazev"],selector:function(options) {return new Selectors.DefaultSelector($.extend(Selectors.pokvkonDto(),prefabOptions,options)).show();}};};
Selectors.pokvkonDto = function() { return {data:new Readers.PokvkonDto(),gridFormat:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "kod", caption: "Kód", width: 80 })
		.addTextColumn({ name: "nazev", caption: "Kontace", width: 100 }),userSettings:"defaultSelectors.pokvkonDto",isolatedUserSettings:true,gridOpts:{searchColumns:["ixs_kon", "kod", "nazev"]}};};

// GReaderPokvrfuDto.fields.js
Readers.PokvrfuDto = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Mtk.Client.GReaderPokvrfuDto",keys:["ixs_fun","ixp_den","subrada"],columns:["ixs_fun","ixp_den","subrada","aktivita","dat_od","dat_do","dat_zmena","zmenu_prov","ixs_fun","nazev"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.PokvrfuDto.inheritsFrom(Readers.Base);
Fields.pokvrfuDto = function(prefabOptions) { return {data:new Readers.PokvrfuDto(),itemTemplate:"{nazev}",helperColumns:["nazev"]};};

// Gordic.Mtk.Client.GReaderPoksden.fields.js
Readers.Poksden = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Mtk.Client.GReaderPoksden",keys:["ixp_den"],columns:["ixp_den","nazev","ixs_vpk"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Poksden.inheritsFrom(Readers.Base);
Fields.poksden = function(prefabOptions) { return {data:new Readers.Poksden(),itemTemplate:"{nazev}",helperColumns:["nazev"]};};

// Gordic.Mtk.Client.GReaderPokvkon.fields.js
Readers.Pokvkon = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Mtk.Client.GReaderPokvkon",keys:["ixs_kon"],columns:["ixs_kon","kod","nazev"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Pokvkon.inheritsFrom(Readers.Base);
Fields.pokvkon = function(prefabOptions) { return {data:new Readers.Pokvkon(),itemTemplate:"{kod}",helperColumns:["ixs_kon", "kod", "nazev"],selector:function(options) {return new Selectors.DefaultSelector($.extend(Selectors.pokvkon(),prefabOptions,options)).show();}};};
Selectors.pokvkon = function() { return {data:new Readers.Pokvkon(),gridFormat:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "kod", caption: "Kód", width: 80 })
		.addTextColumn({ name: "nazev", caption: "Kontace", width: 100 }),userSettings:"defaultSelectors.pokvkon",isolatedUserSettings:true,gridOpts:{searchColumns:["ixs_kon", "kod", "nazev"]}};};

// Gordic.Mtk.Client.GReaderPokvrfu.fields.js
Readers.Pokvrfu = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Mtk.Client.GReaderPokvrfu",keys:["ixs_fun"],columns:["ixs_fun","nazev"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Pokvrfu.inheritsFrom(Readers.Base);
Fields.pokvrfu = function(prefabOptions) { return {data:new Readers.Pokvrfu(),itemTemplate:"{nazev}",helperColumns:["nazev"]};};

// Gordic.Mtk.Client.GReaderRobsdmd.fields.js
Readers.Robsdmd = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Mtk.Client.GReaderRobsdmd",keys:["ixp_dmd"],columns:["ixp_dmd","nazev","rok"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Robsdmd.inheritsFrom(Readers.Base);
Fields.robsdmd = function(prefabOptions) { return {data:new Readers.Robsdmd(),dropdown:false,itemTemplate:"{nazev}",helperColumns:["ixp_dmd", "nazev", "rok"],selector:function(options) {return new Selectors.DefaultSelector($.extend(Selectors.robsdmd(),prefabOptions,options)).show();}};};
Selectors.robsdmd = function() { return {data:new Readers.Robsdmd(),gridFormat:new Gordic.Data.GridFormat()
        
        .addTextColumn({ name: "nazev", caption: "Název knihy", width: 160 })         .addNumberColumn({ name: "rok", caption: "Ročník", width: 100 })             
                                                /*gridFormat: new Gordic.Data.GridFormat()*/,userSettings:"defaultSelectors.robsdmd",isolatedUserSettings:true,gridOpts:{searchColumns:["ixp_dmd", "nazev", "rok"]}};};

// Gordic.Mtk.Client.GReaderRobsjme.fields.js
Readers.Robsjme = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Mtk.Client.GReaderRobsjme",keys:["jmeno"],columns:["jmeno","aktivita"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Robsjme.inheritsFrom(Readers.Base);
Fields.robsjme = function(prefabOptions) { return {data:new Readers.Robsjme(),itemTemplate:"{jmeno}",helperColumns:["jmeno"]};};

// Gordic.Mtk.Client.GReaderRobspri.fields.js
Readers.Robspri = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Mtk.Client.GReaderRobspri",keys:["prijmeni"],columns:["prijmeni","aktivita"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Robspri.inheritsFrom(Readers.Base);
Fields.robspri = function(prefabOptions) { return {data:new Readers.Robspri(),itemTemplate:"{prijmeni}",helperColumns:["prijmeni"]};};

})(jQuery);

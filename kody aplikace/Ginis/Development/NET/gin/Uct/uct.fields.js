"use strict";
(function($) {
var Readers = namespace("Gordic.Data.Readers");
var Fields = namespace("Gordic.Prefabs.Select");
var Selectors = namespace("Gordic.Data.Selectors");

// GReaderRozcadr.fields.js
Readers.Rozcadr = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Uct.Client.GReaderRozcadr",keys:["a_druh"],columns:["a_druh","a_druh_txt","k_s"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rozcadr.inheritsFrom(Readers.Base);
Fields.rozcadr = function(prefabOptions) { return {data:new Readers.Rozcadr(),itemTemplate:"{k_s} - {a_druh_txt}",helperColumns:["a_druh", "a_druh_txt", "k_s"]};};

// GReaderRozcast.fields.js
Readers.Rozcast = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Uct.Client.GReaderRozcast",keys:["a_stav"],columns:["a_stav","a_stav_txt","k_v","k_s"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rozcast.inheritsFrom(Readers.Base);
Fields.rozcast = function(prefabOptions) { return {data:new Readers.Rozcast(),itemTemplate:"{a_stav_txt}",helperColumns:["a_stav", "a_stav_txt"]};};

// GReaderRozvrh.fields.js
Readers.Rozvrh = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Uct.Client.GReaderRozvrh",keys:["ixs_roz"],columns:["ixs_roz","code","nazev"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rozvrh.inheritsFrom(Readers.Base);
Fields.rozvrh = function(prefabOptions) { return {data:new Readers.Rozvrh(),itemTemplate:"{code} - {nazev}",helperColumns:["code", "nazev"]};};

// GReaderEkocdrd.fields.js
Readers.EkocdrdRoz = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Uct.Client.GReaderEkocdrdRoz",keys:["drd"],columns:["drd","drd_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.EkocdrdRoz.inheritsFrom(Readers.Base);
Fields.ekocdrdRoz = function(prefabOptions) { return {data:new Readers.EkocdrdRoz(),itemTemplate:"{drd} - {drd_txt:encode:trim}",helperColumns:["drd", "drd_txt"]};};

// GReaderRozsahl.fields.js
Readers.Rozsahl = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Uct.Client.GReaderRozsahl",keys:["ixs_ahl"],columns:["ixs_ahl","a_cislo","nazev","c0","c1","a_stav_txt","rok","a_druh_txt","c0_upl","c1_upl","c0_valid","c1_valid","popis","aktivita"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rozsahl.inheritsFrom(Readers.Base);
Fields.rozsahl = function(prefabOptions) { return {data:new Readers.Rozsahl(),itemTemplate:"{nazev:encode:trim}",helperColumns:["code", "nazev"],selector:function(options) {return new Selectors.DefaultSelector($.extend(Selectors.rozsahl(),prefabOptions,options)).show();}};};
Selectors.rozsahl = function() { return {data:new Readers.Rozsahl(),userSettings:"defaultSelectors.rozsahl",isolatedUserSettings:true,gridOpts:{searchColumns:["code", "nazev"]},gridFormat:new Gordic.Data.GridFormat().addTextColumn({name: "a_cislo", caption: "jres:30150292", width: 50, forced: true}).addTextColumn({name: "nazev", caption: "jres:30150291", width: 100}).addNumberColumn({name: "c0", caption: "jres:30150293", width: 50}).addNumberColumn({name: "c1", caption: "jres:30150294", width: 50}).addTextColumn({name: "a_stav_txt", caption: "jres:30150295", width: 50}).addNumberColumn({name: "rok", caption: "jres:30150296", width: 30}).addTextColumn({name: "a_druh_txt", caption: "jres:30150297", width: 100})};};

// GReaderRozsobd.fields.js
Readers.Rozsobd = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Uct.Client.GReaderRozsobd",keys:["id"],columns:["id","cislo","nazev"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Rozsobd.inheritsFrom(Readers.Base);
Fields.rozsobd = function(prefabOptions) { return {data:new Readers.Rozsobd(),itemTemplate:"{cislo} - {nazev}",helperColumns:["cislo", "nazev"]};};

// Gordic.Uct.Client.GCisReaderUcrMesic.fields.js
Readers.UcrMesic = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Uct.Client.GReaderUcrMesic",keys:["mesic"],columns:["mesic","mesic_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.UcrMesic.inheritsFrom(Readers.Base);
Fields.ucrMesic = function(prefabOptions) { return {data:new Readers.UcrMesic(),itemTemplate:"{mesic_txt:trim:encode}",helperColumns:["mesic_txt"]};};

// Gordic.Uct.Client.GCisReaderUcrRok.fields.js
Readers.UcrRok = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Uct.Client.GReaderUcrRok",keys:["rok"],columns:["rok","rok_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.UcrRok.inheritsFrom(Readers.Base);
Fields.ucrRok = function(prefabOptions) { return {data:new Readers.UcrRok(),itemTemplate:"{rok_txt:trim:encode}",helperColumns:["rok_txt"]};};

})(jQuery);

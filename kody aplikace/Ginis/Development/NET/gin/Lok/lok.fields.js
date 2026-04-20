"use strict";
(function($) {
var Readers = namespace("Gordic.Data.Readers");
var Fields = namespace("Gordic.Prefabs.Select");
var Selectors = namespace("Gordic.Data.Selectors");

// Gordic.Lok.Client.GReaderGinckul.fields.js
Readers.Ginckul = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Lok.Client.GReaderGinckul",keys:["kultura"],columns:["kultura","kultura_zkr","kultura_txt","k_v"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Ginckul.inheritsFrom(Readers.Base);
Fields.ginckul = function(prefabOptions) { return {data:new Readers.Ginckul(),itemTemplate:"{kultura_txt}",helperColumns:["kultura", "kultura_txt"],dropdown:true};};

// Gordic.Lok.Client.GReaderGinclot.fields.js
Readers.Ginclot = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Lok.Client.GReaderGinclot",keys:["typ_lot"],columns:["typ_lot","typ_lot_txt","k_v"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Ginclot.inheritsFrom(Readers.Base);
Fields.ginclot = function(prefabOptions) { return {data:new Readers.Ginclot(),itemTemplate:"{typ_lot_txt}",helperColumns:["typ_lot_txt"],dropdown:true};};

// Gordic.Lok.Client.GReaderPriorita.fields.js
Readers.Priorita = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Lok.Client.GReaderPriorita",keys:["priorita"],columns:["priorita","priorita_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.Priorita.inheritsFrom(Readers.Base);
Fields.priorita = function(prefabOptions) { return {data:new Readers.Priorita(),itemTemplate:"{priorita_txt}",helperColumns:["priorita_txt", "priorita"],dropdown:true};};

// Gordic.Lok.Client.GReaderResXMasky.fields.js
Readers.ResXMasky = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Lok.Client.GReaderResXMasky",keys:["verze_db","skup_resx"],columns:["verze_db","skup_resx","aktivita","nazev"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.ResXMasky.inheritsFrom(Readers.Base);
Fields.resXMasky = function(prefabOptions) { return {data:new Readers.ResXMasky(),itemTemplate:"{skup_resx}",helperColumns:["skup_resx", "nazev"],helperItemTemplate:function (row) { return fieldFunction.getSimpleInfoString(row.skup_resx, row.nazev, "fb");},dropdown:true};};

// Gordic.Lok.Client.GReaderVerzeDB.fields.js
Readers.VerzeDB = function(options) { Readers.Base.call(this, {readerClass:"Gordic.Lok.Client.GReaderVerzeDB",keys:["verze_db"],columns:["verze_db","verze_db_txt"],rowSize:100,readAll:false,permanent:false}, options); };
Readers.VerzeDB.inheritsFrom(Readers.Base);
Fields.verzeDB = function(prefabOptions) { return {data:new Readers.VerzeDB(),itemTemplate:"{verze_db_txt}",helperColumns:["verze_db_txt"],dropdown:true};};

//INCLUDE Utils.fields.js

var simSeparator = " - ";
/* options: "fb" - prvni tucne, "sb" - druhe tucne, vse ostatni - bez zvyrazneni */

var fieldFunction = {
    isEmpty: function (value) {
        if (value == null) return true;
        var str = value.toString();
        return !str || str.length === 0 || /^\s*$/.test(str);
    },
    getSimpleInfoString: function (info, more, options) {
        info = info.trim();
        more = more.trim();
        if (options === "fb") return ("<b>{0}</b>{1}").format(info, !this.isEmpty(more) ? simSeparator + more : ""); //first bold
        else if (options === "sb") return ("{0}{1}").format(info, !this.isEmpty(more) ? simSeparator + "<b>" + more + "</b>" : ""); //second bold
        else return ("{0}{1}").format(info, !this.isEmpty(more) ? simSeparator + more : ""); //no bold       
    }
}


})(jQuery);

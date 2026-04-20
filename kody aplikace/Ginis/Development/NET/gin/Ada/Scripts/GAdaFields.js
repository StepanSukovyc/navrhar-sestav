// vlastni policka
"use strict";
(function ($) {
    var Readers = namespace("Gordic.Data.Readers");
    var Fields = namespace("Gordic.Prefabs.Select");

    // policko ekosrar
    Readers.EkosrarADA = function (options) { this._base({ readerClass: "Gordic.Ada.Client.GReaderEkosrarADA", keys: ['ico'], columns: ["ico"], rowSize: 100, readAll: false, permanent: false }, options); };
    Readers.EkosrarADA.inheritsFrom(Readers.Base);
    Fields.ekosrarADA = function () { return { data: new Readers.EkosrarADA(), dropdown: true, itemTemplate: "{ico}", helperColumns: ["ico"] }; };

    // policko stav akce (aktivita ADA)
    Readers.gincaktADA = function (options) { this._base({ readerClass: "Gordic.Ada.Client.GReaderGincaktADA", keys: ['aktivita'], columns: ["aktivita_txt"], rowSize: 100, readAll: false, permanent: false }, options); };
    Readers.gincaktADA.inheritsFrom(Readers.Base);
    Fields.gincaktADA = function () { return { data: new Readers.gincaktADA(), dropdown: true, itemTemplate: "{aktivita_txt}", helperColumns: ["aktivita"] }; };

    // policko ISP (ISP)
    Readers.srvstipADA = function (options) { this._base({ readerClass: "Gordic.Ada.Client.GReaderSrvstipADA", keys: ['ixs_tip'], columns: ["nazev"], rowSize: 100, readAll: false, permanent: false }, options); };
    Readers.srvstipADA.inheritsFrom(Readers.Base);
    Fields.srvstipADA = function () { return { data: new Readers.srvstipADA(), dropdown: true, itemTemplate: "{nazev}", helperColumns: ["ixs_tip"] }; };

    // policko stav ISP (ISP)
    Readers.evzcspeADA = function (options) { this._base({ readerClass: "Gordic.Ada.Client.GReaderEvzcspeADA", keys: ['schv_spec'], columns: ["schv_spec_txt"], rowSize: 100, readAll: false, permanent: false }, options); };
    Readers.evzcspeADA.inheritsFrom(Readers.Base);
    Fields.evzcspeADA = function () { return { data: new Readers.evzcspeADA(), dropdown: true, itemTemplate: "{schv_spec_txt}", helperColumns: ["schv_spec"] }; };

})(jQuery);
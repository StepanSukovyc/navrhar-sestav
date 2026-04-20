// vlastni policka
"use strict";
(function ($) {
    var Readers = namespace("Gordic.Data.Readers");
    var Fields = namespace("Gordic.Prefabs.Select");

    // policko ekosrar
    Readers.BarsverBAR = function (options) { this._base({ readerClass: "Gordic.BAR.Client.GReaderBarsverBAR", keys: ['verze_c,verze_k'], columns: ["verze_c,verze_k"], rowSize: 100, reBARll: false, permanent: false }, options); };
    Readers.BarsverBAR.inheritsFrom(Readers.Base);
    Fields.BarsverBAR = function () { return { data: new Readers.BarsverBAR(), dropdown: true, itemTemplate: "{verze_c}.{verze_k}", helperColumns: ["verze_c"] }; };

})(jQuery);
"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Rls.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const dropdown = "dropdown"; const selector = "selector"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const cached = "cached";

// Gordic.Rls.Client.GReaderRlscals.fields.js
Readers.Rlscals = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRlscals",keys:["druh_akce"],[columns]:["druh_akce","druh_akce_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rlscals.inheritsFrom(ReadersBase);
Fields.rlscals = (prefabOptions) => { return {data:new Readers.Rlscals(),[itemTemplate]:"{druh_akce_txt:trim:encode}",[helperColumns]:["druh_akce", "druh_akce_txt", "k_v"],[dropdown]:true,[selector]:(options) => newDefaultSelector($.extend(Selectors.rlscals(),prefabOptions,options)).show()};};
Selectors.rlscals = () => { return {data:new Readers.Rlscals(),[userSettings]:usRoot+"rlscals",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["druh_akce", "druh_akce_txt", "k_v"]}};};

// GReaderDtoRlscakc.fields.js
Readers.DtoRlscakc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDtoRlscakc",keys:["typ_akce_rls"],[columns]:["typ_akce_rls","typ_akce_rls_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DtoRlscakc.inheritsFrom(ReadersBase);
Fields.rlscakc = (prefabOptions) => { return {data:new Readers.DtoRlscakc(),[itemTemplate]:"{typ_akce_rls_txt:trim:encode}",[helperColumns]:["typ_akce_rls", "typ_akce_rls_txt", "k_v", "k_s"],[dropdown]:true,[selector]:(options) => newDefaultSelector($.extend(Selectors.rlscakc(),prefabOptions,options)).show()};};
Selectors.rlscakc = () => { return {data:new Readers.DtoRlscakc(),[userSettings]:usRoot+"rlscakc",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_akce_rls", "typ_akce_rls_txt", "k_v", "k_s"]}};};

// GReaderDtoRlscktd.fields.js
Readers.Rlscktd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDtoRlscktd",keys:["kat_dokladu"],[columns]:["kat_dokladu", "kat_dokladu_txt", "k_v", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Rlscktd.inheritsFrom(ReadersBase);
Fields.rlscktd = (prefabOptions) => { return {data:new Readers.Rlscktd(),[itemTemplate]:"{kat_dokladu_txt:trim:encode}",[helperColumns]:["kat_dokladu", "kat_dokladu_txt", "k_v", "k_s", "aktivita"]};};

// GReaderDtoRlscspz.fields.js
Readers.DtoRlscspz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDtoRlscspz",keys:["stav_spz"],[columns]:["stav_spz","stav_spz_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DtoRlscspz.inheritsFrom(ReadersBase);
Fields.dtoRlscspz = (prefabOptions) => { return {data:new Readers.DtoRlscspz(),[dropdown]:true,[itemTemplate]:"{stav_spz_txt}",[helperColumns]:["stav_spz", "stav_spz_txt", "k_v", "k_s"]};};

// GReaderDtoRlscstk.fields.js
Readers.DtoRlscstk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDtoRlscstk",keys:["stav_karty"],[columns]:["stav_karty","stav_karty_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DtoRlscstk.inheritsFrom(ReadersBase);
Fields.rlscstk = (prefabOptions) => { return {data:new Readers.DtoRlscstk(),[itemTemplate]:"{stav_karty_txt:trim:encode}",[helperColumns]:["stav_karty", "stav_karty_txt", "k_v", "k_s"],[dropdown]:true,[selector]:(options) => newDefaultSelector($.extend(Selectors.rlscstk(),prefabOptions,options)).show()};};
Selectors.rlscstk = () => { return {data:new Readers.DtoRlscstk(),[userSettings]:usRoot+"rlscstk",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stav_karty", "stav_karty_txt", "k_v", "k_s"]}};};

// GReaderDtoRlscstl.fields.js
Readers.DtoRlscstl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDtoRlscstl",keys:["stav_licence"],[columns]:["stav_licence","stav_licence_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DtoRlscstl.inheritsFrom(ReadersBase);
Fields.rlscstl = (prefabOptions) => { return {data:new Readers.DtoRlscstl(),[itemTemplate]:"{stav_licence_txt:trim:encode}",[helperColumns]:["stav_licence", "stav_licence_txt", "k_v", "k_s"],[dropdown]:true,[selector]:(options) => newDefaultSelector($.extend(Selectors.rlscstl(),prefabOptions,options)).show()};};
Selectors.rlscstl = () => { return {data:new Readers.DtoRlscstl(),[userSettings]:usRoot+"rlscstl",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stav_licence", "stav_licence_txt", "k_v", "k_s"]}};};

// GReaderDtoRlscsto.fields.js
Readers.DtoRlscsto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDtoRlscsto",keys:["stav_obj"],[columns]:["stav_obj","stav_obj_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DtoRlscsto.inheritsFrom(ReadersBase);
Fields.rlscsto = (prefabOptions) => { return {data:new Readers.DtoRlscsto(),[itemTemplate]:"{stav_obj_txt:trim:encode}",[helperColumns]:["stav_obj", "stav_obj_txt", "k_v", "k_s"],[dropdown]:true,[selector]:(options) => newDefaultSelector($.extend(Selectors.rlscsto(),prefabOptions,options)).show()};};
Selectors.rlscsto = () => { return {data:new Readers.DtoRlscsto(),[userSettings]:usRoot+"rlscsto",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stav_obj", "stav_obj_txt", "k_v", "k_s"]}};};

// GReaderDtoRlscstp.fields.js
Readers.DtoRlscstp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDtoRlscstp",keys:["stav_pz"],[columns]:["stav_pz", "stav_pz_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DtoRlscstp.inheritsFrom(ReadersBase);
Fields.rlscstp = (prefabOptions) => { return {data:new Readers.DtoRlscstp(),[itemTemplate]:"{stav_pz_txt:trim:encode}",[helperColumns]:["stav_pz", "stav_pz_txt", "k_v", "k_s"],[dropdown]:true,[selector]:(options) => newDefaultSelector($.extend(Selectors.rlscstp(),prefabOptions,options)).show()};};
Selectors.rlscstp = () => { return {data:new Readers.DtoRlscstp(),[userSettings]:usRoot+"rlscstp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stav_pz", "stav_pz_txt", "k_v", "k_s"]}};};

// GReaderDtoRlscszk.fields.js
Readers.DtoRlscszk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDtoRlscszk",keys:["stav_zzk"],[columns]:["stav_zzk","stav_zzk_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DtoRlscszk.inheritsFrom(ReadersBase);
Fields.dtoRlscszk = (prefabOptions) => { return {data:new Readers.DtoRlscszk(),[dropdown]:true,[itemTemplate]:"{stav_zzk_txt}",[helperColumns]:["stav_zzk", "stav_zzk_txt", "k_v", "k_s"]};};

// GReaderDtoRlsctko.fields.js
Readers.Rlsctko = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDtoRlsctko",keys:["typ_kontr"],[columns]:["typ_kontr", "typ_kontr_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rlsctko.inheritsFrom(ReadersBase);
Fields.rlsctko = (prefabOptions) => { return {data:new Readers.Rlsctko(),[itemTemplate]:"{typ_kontr_txt:trim:encode}",[helperColumns]:["typ_kontr", "typ_kontr_txt", "k_v", "k_s"],[dropdown]:true,[selector]:(options) => newDefaultSelector($.extend(Selectors.rlsctko(),prefabOptions,options)).show()};};
Selectors.rlsctko = () => { return {data:new Readers.Rlsctko(),[userSettings]:usRoot+"rlsctko",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_kontr", "typ_kontr_txt", "k_v", "k_s"]}};};

// GReaderDtoRlscvmi.fields.js
Readers.Rlscvmi = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDtoRlscvmi",keys:["vydejni_misto"],[columns]:["vydejni_misto", "vydejni_misto_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rlscvmi.inheritsFrom(ReadersBase);
Fields.rlscvmi = (prefabOptions) => { return {data:new Readers.Rlscvmi(),[itemTemplate]:"{vydejni_misto_txt:trim:encode}",[helperColumns]:["vydejni_misto", "vydejni_misto_txt", "k_v", "k_s"],[dropdown]:true,[selector]:(options) => newDefaultSelector($.extend(Selectors.rlscvmi(),prefabOptions,options)).show()};};
Selectors.rlscvmi = () => { return {data:new Readers.Rlscvmi(),[userSettings]:usRoot+"rlscvmi",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["vydejni_misto", "vydejni_misto_txt", "k_v", "k_s"]}};};

// GReaderDtoRlscvzd.fields.js
Readers.Rlscvzd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDtoRlscvzd",keys:["vzdel"],[columns]:["vzdel", "vzdel_txt", "k_v", "k_s", "aktivita", "dat_zmena", "zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Rlscvzd.inheritsFrom(ReadersBase);
Fields.rlscvzd = (prefabOptions) => { return {data:new Readers.Rlscvzd(),[itemTemplate]:"{vzdel_txt:trim:encode}",[helperColumns]:["vzdel", "vzdel_txt", "k_v", "k_s", "aktivita", "dat_zmena", "zmenu_prov"],[dropdown]:true,[selector]:(options) => newDefaultSelector($.extend(Selectors.rlscvzd(),prefabOptions,options)).show()};};
Selectors.rlscvzd = () => { return {data:new Readers.Rlscvzd(),[userSettings]:usRoot+"rlscvzd",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["vzdel", "vzdel_txt", "k_v", "k_s", "aktivita", "dat_zmena", "zmenu_prov"]}};};

// GReaderDtoRlsczvy.fields.js
Readers.Rlsczvy = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDtoRlsczvy",keys:["zpusob_vyroz"],[columns]:["zpusob_vyroz", "zpusob_vyroz_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rlsczvy.inheritsFrom(ReadersBase);
Fields.rlsczvy = (prefabOptions) => { return {data:new Readers.Rlsczvy(),[itemTemplate]:"{zpusob_vyroz_txt:trim:encode}",[helperColumns]:["zpusob_vyroz", "zpusob_vyroz_txt", "k_v", "k_s"],[dropdown]:true,[selector]:(options) => newDefaultSelector($.extend(Selectors.rlsczvy(),prefabOptions,options)).show()};};
Selectors.rlsczvy = () => { return {data:new Readers.Rlsczvy(),[userSettings]:usRoot+"rlsczvy",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zpusob_vyroz", "zpusob_vyroz_txt", "k_v", "k_s"]}};};

// GReaderDtoRlsskzk.fields.js
Readers.DtoRlsskzk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDtoRlsskzk",keys:["ixs_kzk"],[columns]:["ixs_kzk","nazev","nazev_zkr","dat_plat_od","dat_plat_do"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DtoRlsskzk.inheritsFrom(ReadersBase);
Fields.dtoRlsskzk = (prefabOptions) => { return {data:new Readers.DtoRlsskzk(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["ixs_kzk", "nazev", "nazev_zkr", "dat_plat_od", "dat_plat_do"],[selector]:(options) => newDefaultSelector($.extend(Selectors.rlsskzk(),prefabOptions,options)).show()};};
Selectors.rlsskzk = () => { return {data:new Readers.DtoRlsskzk(),[userSettings]:usRoot+"rlsskzk",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixs_kzk", "nazev", "nazev_zkr", "dat_plat_od", "dat_plat_do"]}};};

// GReaderDtoRlsstzk.fields.js
Readers.DtoRlsstzk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDtoRlsstzk",keys:["ixs_tzk"],[columns]:["ixs_tzk","dat_termin"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DtoRlsstzk.inheritsFrom(ReadersBase);
Fields.dtoRlsstzk = (prefabOptions) => { return {data:new Readers.DtoRlsstzk(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

})(jQuery);

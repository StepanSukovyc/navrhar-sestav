"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Evz.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const selector = "selector"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const cached = "cached";

// Gordic.Evz.Client.GEvzReaderXxxVprc.fields.js
Readers.EvzXxxvprc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzXxxvprc",keys:["cislo"],[columns]:["cislo","nazev","ixs_pla","ico","ucs","typ","typ_txt","adresa1","cis_real","ktg_akce","ktg_akce_txt","priz_az","stav_inp","ixs_cia","sip_val1","sip_val2","sip_val3","sip_val4","priz_sta1","priz_sta2"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.EvzXxxvprc.inheritsFrom(ReadersBase);
Fields.evzXxxvprc = (prefabOptions) => { return {data:new Readers.EvzXxxvprc(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.evzXxxvprc(),prefabOptions,options)).show()};};
Selectors.evzXxxvprc = () => { return {data:new Readers.EvzXxxvprc(),[userSettings]:usRoot+"evzXxxvprc",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "cislo", caption: "jres:26600014", width: 150, forced: true}).addTextColumn({name: "nazev", caption: "jres:26600015", width: 300}).addTextColumn({name: "vyber_txt", caption: "jres:26600022", width: 300}).addTextColumn({name: "priz_az_txt", caption: "jres:26600016", width: 200}).addTextColumn({name: "stav_inp_txt", caption: "jres:26600017", width: 200}).addTextColumn({name: "sip_val1", caption: "jres:26600018", width: 100}).addTextColumn({name: "sip_val2", caption: "jres:26600019", width: 100}).addTextColumn({name: "sip_val3", caption: "jres:26600020", width: 100}).addTextColumn({name: "sip_val4", caption: "jres:26600021", width: 100})};};

// Gordic.Evz.Client.GReaderEvzcdzd.fields.js
Readers.Evzcdzd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzcdzd",keys:["dis_zad"],[columns]:["dis_zad","dis_zad_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzcdzd.inheritsFrom(ReadersBase);
Fields.evzcdzd = (prefabOptions) => { return {data:new Readers.Evzcdzd(),[itemTemplate]:"{dis_zad_txt:trim:encode}",[helperColumns]:["dis_zad_txt"]};};

// Gordic.Evz.Client.GReaderEvzcevs.fields.js
Readers.Evzcevs = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzcevs",keys:["evz_stav"],[columns]:["evz_stav","evz_stav_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzcevs.inheritsFrom(ReadersBase);
Fields.evzcevs = (prefabOptions) => { return {data:new Readers.Evzcevs(),[itemTemplate]:"{evz_stav_txt:trim:encode}",[helperColumns]:["evz_stav_txt"]};};

// Gordic.Evz.Client.GReaderEvzcjis.fields.js
Readers.Evzcjis = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzcjis",keys:["s_jis"],[columns]:["s_jis","s_jis_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzcjis.inheritsFrom(ReadersBase);
Fields.evzcjis = (prefabOptions) => { return {data:new Readers.Evzcjis(),[itemTemplate]:"{s_jis_txt:trim:encode}",[helperColumns]:["s_jis_txt"]};};

// Gordic.Evz.Client.GReaderEvzckri.fields.js
Readers.Evzckri = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzckri",keys:["cis_kri"],[columns]:["cis_kri","cis_kri_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzckri.inheritsFrom(ReadersBase);
Fields.evzckri = (prefabOptions) => { return {data:new Readers.Evzckri(),[itemTemplate]:"{cis_kri_txt:trim:encode}",[helperColumns]:["cis_kri_txt"]};};

// Gordic.Evz.Client.GReaderEvzclim.fields.js
Readers.Evzclim = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzclim",keys:["lim_zac"],[columns]:["lim_zac","lim_zac_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzclim.inheritsFrom(ReadersBase);
Fields.evzclim = (prefabOptions) => { return {data:new Readers.Evzclim(),[itemTemplate]:"{lim_zac_txt:trim:encode}",[helperColumns]:["lim_zac_txt"]};};

// Gordic.Evz.Client.GReaderEvzcpru.fields.js
Readers.Evzcpru = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzcpru",keys:["pred_urc"],[columns]:["pred_urc","pred_urc_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzcpru.inheritsFrom(ReadersBase);
Fields.evzcpru = (prefabOptions) => { return {data:new Readers.Evzcpru(),[itemTemplate]:"{pred_urc_txt:trim:encode}",[helperColumns]:["pred_urc_txt"]};};

// Gordic.Evz.Client.GReaderEvzcreg.fields.js
Readers.Evzcreg = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzcreg",keys:["regi_list"],[columns]:["regi_list","regi_list_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzcreg.inheritsFrom(ReadersBase);
Fields.evzcreg = (prefabOptions) => { return {data:new Readers.Evzcreg(),[itemTemplate]:"{regi_list_txt:trim:encode}",[helperColumns]:["regi_list_txt"]};};

// Gordic.Evz.Client.GReaderEvzcspe.fields.js
Readers.Evzcspe = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzcspe",keys:["schv_spec"],[columns]:["schv_spec","schv_spec_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzcspe.inheritsFrom(ReadersBase);
Fields.evzcspe = (prefabOptions) => { return {data:new Readers.Evzcspe(),[itemTemplate]:"{schv_spec_txt:trim:encode}",[helperColumns]:["schv_spec_txt"]};};

// Gordic.Evz.Client.GReaderEvzcsso.fields.js
Readers.Evzcsso = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzcsso",keys:["s_sou"],[columns]:["s_sou","s_sou_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzcsso.inheritsFrom(ReadersBase);
Fields.evzcsso = (prefabOptions) => { return {data:new Readers.Evzcsso(),[itemTemplate]:"{s_sou_txt:trim:encode}",[helperColumns]:["s_sou_txt"]};};

// Gordic.Evz.Client.GReaderEvzcsta.fields.js
Readers.Evzcsta = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzcsta",keys:["stan_jak"],[columns]:["stan_jak","stan_jak_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzcsta.inheritsFrom(ReadersBase);
Fields.evzcsta = (prefabOptions) => { return {data:new Readers.Evzcsta(),[itemTemplate]:"{stan_jak_txt:trim:encode}",[helperColumns]:["stan_jak_txt"]};};

// Gordic.Evz.Client.GReaderEvzcsvr.fields.js
Readers.Evzcsvr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzcsvr",keys:["stan_svr"],[columns]:["stan_svr","stan_svr_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzcsvr.inheritsFrom(ReadersBase);
Fields.evzcsvr = (prefabOptions) => { return {data:new Readers.Evzcsvr(),[itemTemplate]:"{stan_svr_txt:trim:encode}",[helperColumns]:["stan_svr_txt"]};};

// Gordic.Evz.Client.GReaderEvzcsvz.fields.js
Readers.Evzcsvz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzcsvz",keys:["s_vz"],[columns]:["s_vz","s_vz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzcsvz.inheritsFrom(ReadersBase);
Fields.evzcsvz = (prefabOptions) => { return {data:new Readers.Evzcsvz(),[itemTemplate]:"{s_vz_txt:trim:encode}",[helperColumns]:["s_vz_txt"]};};

// Gordic.Evz.Client.GReaderEvzctks.fields.js
Readers.Evzctks = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzctks",keys:["id_tks"],[columns]:["id_tks","id_tks_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzctks.inheritsFrom(ReadersBase);
Fields.evzctks = (prefabOptions) => { return {data:new Readers.Evzctks(),[itemTemplate]:"{id_tks_txt:trim:encode}",[helperColumns]:["id_tks_txt"]};};

// Gordic.Evz.Client.GReaderEvzcuks.fields.js
Readers.Evzcuks = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzcuks",keys:["id_uks"],[columns]:["id_uks","id_uks_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzcuks.inheritsFrom(ReadersBase);
Fields.evzcuks = (prefabOptions) => { return {data:new Readers.Evzcuks(),[itemTemplate]:"{id_uks_txt:trim:encode}",[helperColumns]:["id_uks_txt"]};};

// Gordic.Evz.Client.GReaderEvzcvri.fields.js
Readers.Evzcvri = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzcvri",keys:["vys_riz"],[columns]:["vys_riz","vys_riz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzcvri.inheritsFrom(ReadersBase);
Fields.evzcvri = (prefabOptions) => { return {data:new Readers.Evzcvri(),[itemTemplate]:"{vys_riz_txt:trim:encode}",[helperColumns]:["vys_riz_txt"]};};

// Gordic.Evz.Client.GReaderEvzczoz.fields.js
Readers.Evzczoz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzczoz",keys:["odu_zz"],[columns]:["odu_zz","odu_zz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzczoz.inheritsFrom(ReadersBase);
Fields.evzczoz = (prefabOptions) => { return {data:new Readers.Evzczoz(),[itemTemplate]:"{odu_zz_txt:trim:encode}",[helperColumns]:["odu_zz_txt"]};};

// Gordic.Evz.Client.GReaderEvzczpo.fields.js
Readers.Evzczpo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzczpo",keys:["zpu_pod"],[columns]:["zpu_pod","zpu_pod_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzczpo.inheritsFrom(ReadersBase);
Fields.evzczpo = (prefabOptions) => { return {data:new Readers.Evzczpo(),[itemTemplate]:"{zpu_pod_txt:trim:encode}",[helperColumns]:["zpu_pod_txt"]};};

// Gordic.Evz.Client.GReaderEvzsaza.fields.js
Readers.Evzsaza = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzsaza",keys:["ixs_aza"],[columns]:["ixs_aza","nazev","zkratka","profil","url_zadava","poznamka","dat_zmena"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzsaza.inheritsFrom(ReadersBase);
Fields.evzsaza = (prefabOptions) => { return {data:new Readers.Evzsaza(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.Evzsaza(),prefabOptions,options)).show()};};
Selectors.Evzsaza = () => { return {data:new Readers.Evzsaza(),[userSettings]:usRoot+"Evzsaza",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "ixs_aza", caption: "jres:26600024", width: 230, forced: true}).addTextColumn({name: "poznamka", caption: "jres:26600025", width: 150}).addTextColumn({name: "nazev", caption: "jres:26600023", width: 320}).addTextColumn({name: "zkratka", caption: "jres:26600026", width: 100}).addTextColumn({name: "profil", caption: "jres:26600027", width: 250}).addTextColumn({name: "url_zadava", caption: "jres:26600028", width: 150}).addDateTimeColumn({name: "dat_zmena", caption: "jres:26600029", width: 100})};};

// Gordic.Evz.Client.GReaderEvzsesu.fields.js
Readers.Evzsesu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzsesu",keys:["ixs_esu"],[columns]:["ixs_esu","cis_por","nazev","ico","dat_jis","dat_pis","s_jis_txt","prijal","cj_vz","cj_dgr","misto_pod","naz_prj","cj_po","popis","s_spis","ixs_pri","por_cis_nab","ktg_typ"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Evzsesu.inheritsFrom(ReadersBase);
Fields.evzsesu = (prefabOptions) => { return {data:new Readers.Evzsesu(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.Evzsesu(),prefabOptions,options)).show()};};
Selectors.Evzsesu = () => { return {data:new Readers.Evzsesu(),[userSettings]:usRoot+"Evzsesu",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:26600009", width: 300, forced: true}).addNumberColumn({name: "por_cis_nab", caption: "jres:26600013", width: 60}).addDateTimeColumn({name: "dat_pis", caption: "jres:26600010", width: 150}).addTextColumn({name: "cj_vz", caption: "jres:26600011", width: 100}).addTextColumn({name: "misto_pod", caption: "jres:26600012", width: 300})};};

// Gordic.Evz.Client.GReaderEvzskdn.fields.js
Readers.Evzskdn = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzskdn",keys:["ixs_kdn"],[columns]:["ixs_kdn","nazev","zkratka","poznamka","dat_od","dat_do"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Evzskdn.inheritsFrom(ReadersBase);
Fields.evzskdn = (prefabOptions) => { return {data:new Readers.Evzskdn(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"]};};

// Gordic.Evz.Client.GReaderEvzskpu.fields.js
Readers.Evzskpu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzskpu",keys:["kat_pru"],[columns]:["kat_pru","nazev","zkratka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzskpu.inheritsFrom(ReadersBase);
Fields.evzskpu = (prefabOptions) => { return {data:new Readers.Evzskpu(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"]};};

// Gordic.Evz.Client.GReaderEvzsoko.fields.js
Readers.Evzsoko = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzsoko",keys:["ixs_oko"],[columns]:["ixs_oko", "nazev", "jmeno", "prijmeni", "zkratka", "poznamka", "dat_od", "dat_do"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Evzsoko.inheritsFrom(ReadersBase);
Fields.evzsoko = (prefabOptions) => { return {data:new Readers.Evzsoko(),[itemTemplate]:"{ixs_oko:trim:encode}",[helperColumns]:["jmeno", "prijmeni"],[selector]:(options) => newDefaultSelector($.extend(Selectors.evzsoko(),prefabOptions,options)).show()};};
Selectors.evzsoko = () => { return {data:new Readers.Evzsoko(),[userSettings]:usRoot+"evzsoko",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["jmeno", "prijmeni"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:26600001", width: 100, forced: true}).addTextColumn({name: "jmeno", caption: "jres:26600002", width: 100}).addTextColumn({name: "prijmeni", caption: "jres:26600003", width: 150}).addTextColumn({name: "zkratka", caption: "jres:26600004", width: 100}).addTextColumn({name: "poznamka", caption: "jres:26600005", width: 200}).addDateColumn({name: "dat_od", caption: "jres:26600006", width: 100}).addDateColumn({name: "dat_do", caption: "jres:26600007", width: 100})};};

})(jQuery);

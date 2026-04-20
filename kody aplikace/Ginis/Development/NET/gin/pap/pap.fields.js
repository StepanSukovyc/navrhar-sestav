"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Pap.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const selector = "selector"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const cached = "cached";

// Gordic.Pap.Client.GPapReaderMzacdru.fields.js
Readers.GPapReaderMzacdru = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderMzacdru",keys:["druh_zak"],[columns]:["druh_zak","druh_zak_txt","popis","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderMzacdru.inheritsFrom(ReadersBase);
Fields.gPapReaderMzacdru = (prefabOptions) => { return {data:new Readers.GPapReaderMzacdru(),[itemTemplate]:"{k_xml:trim:encode}",[helperColumns]:["k_xml"]};};

// Gordic.Pap.Client.GPapReaderMzacros.fields.js
Readers.GPapReaderMzacros = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderMzacros",keys:["role_ez"],[columns]:["role_ez","role_ez_txt","popis","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderMzacros.inheritsFrom(ReadersBase);
Fields.gPapReaderMzacros = (prefabOptions) => { return {data:new Readers.GPapReaderMzacros(),[itemTemplate]:"{k_xml:trim:encode}",[helperColumns]:["k_xml"]};};

// Gordic.Pap.Client.GPapReaderMzacsou.fields.js
Readers.GPapReaderMzacsou = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderMzacsou",keys:["druh_zad_riz"],[columns]:["druh_zad_riz","druh_zad_riz_txt","popis","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderMzacsou.inheritsFrom(ReadersBase);
Fields.gPapReaderMzacsou = (prefabOptions) => { return {data:new Readers.GPapReaderMzacsou(),[itemTemplate]:"{k_xml:trim:encode}",[helperColumns]:["k_xml"]};};

// Gordic.Pap.Client.GPapReaderMzacstc.fields.js
Readers.GPapReaderMzacstc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderMzacstc",keys:["stav_caza"],[columns]:["stav_caza","stav_caza_txt","popis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderMzacstc.inheritsFrom(ReadersBase);
Fields.gPapReaderMzacstc = (prefabOptions) => { return {data:new Readers.GPapReaderMzacstc(),[itemTemplate]:"{k_xml:trim:encode}",[helperColumns]:["k_xml"]};};

// Gordic.Pap.Client.GPapReaderMzacstz.fields.js
Readers.GPapReaderMzacstz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderMzacstz",keys:["stav_zak"],[columns]:["stav_zak","stav_zak_txt","popis","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderMzacstz.inheritsFrom(ReadersBase);
Fields.gPapReaderMzacstz = (prefabOptions) => { return {data:new Readers.GPapReaderMzacstz(),[itemTemplate]:"{k_xml:trim:encode}",[helperColumns]:["k_xml"]};};

// Gordic.Pap.Client.GPapReaderMzacsys.fields.js
Readers.GPapReaderMzacsys = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderMzacsys",keys:["syst_ez"],[columns]:["syst_ez","syst_ez_txt","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderMzacsys.inheritsFrom(ReadersBase);
Fields.gPapReaderMzacsys = (prefabOptions) => { return {data:new Readers.GPapReaderMzacsys(),[itemTemplate]:"{k_xml:trim:encode}",[helperColumns]:["k_xml"]};};

// Gordic.Pap.Client.GPapReaderMzactpo.fields.js
Readers.GPapReaderMzactpo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderMzactpo",keys:["typ_poza"],[columns]:["typ_poza","typ_poza_txt","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderMzactpo.inheritsFrom(ReadersBase);
Fields.gPapReaderMzactpo = (prefabOptions) => { return {data:new Readers.GPapReaderMzactpo(),[itemTemplate]:"{k_xml:trim:encode}",[helperColumns]:["k_xml"]};};

// Gordic.Pap.Client.GPapReaderMzactra.fields.js
Readers.GPapReaderMzactra = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderMzactra",keys:["typ_ram_sml"],[columns]:["typ_ram_sml","typ_ram_sml_txt","popis","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderMzactra.inheritsFrom(ReadersBase);
Fields.gPapReaderMzactra = (prefabOptions) => { return {data:new Readers.GPapReaderMzactra(),[itemTemplate]:"{k_xml:trim:encode}",[helperColumns]:["k_xml"]};};

// Gordic.Pap.Client.GPapReaderMzactyd.fields.js
Readers.GPapReaderMzactyd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderMzactyd",keys:["typ_doza"],[columns]:["typ_doza","typ_doza_txt","popis","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderMzactyd.inheritsFrom(ReadersBase);
Fields.gPapReaderMzactyd = (prefabOptions) => { return {data:new Readers.GPapReaderMzactyd(),[itemTemplate]:"{k_xml:trim:encode}",[helperColumns]:["k_xml"]};};

// Gordic.Pap.Client.GPapReaderMzactys.fields.js
Readers.GPapReaderMzactys = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderMzactys",keys:["typ_sml"],[columns]:["typ_sml","typ_sml_txt","popis","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderMzactys.inheritsFrom(ReadersBase);
Fields.gPapReaderMzactys = (prefabOptions) => { return {data:new Readers.GPapReaderMzactys(),[itemTemplate]:"{k_xml:trim:encode}",[helperColumns]:["k_xml"]};};

// Gordic.Pap.Client.GPapReaderMzactzp.fields.js
Readers.GPapReaderMzactzp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderMzactzp",keys:["typ_zpra"],[columns]:["typ_zpra","typ_zpra_txt, k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderMzactzp.inheritsFrom(ReadersBase);
Fields.gPapReaderMzactzp = (prefabOptions) => { return {data:new Readers.GPapReaderMzactzp(),[itemTemplate]:"{k_xml:trim:encode}",[helperColumns]:["k_xml"]};};

// Gordic.Pap.Client.GPapReaderMzacuve.fields.js
Readers.GPapReaderMzacuve = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderMzacuve",keys:["priz_uve"],[columns]:["priz_uve","priz_uve_txt","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderMzacuve.inheritsFrom(ReadersBase);
Fields.gPapReaderMzacuve = (prefabOptions) => { return {data:new Readers.GPapReaderMzacuve(),[itemTemplate]:"{k_xml:trim:encode}",[helperColumns]:["k_xml"]};};

// Gordic.Pap.Client.GPapReaderMzaczdv.fields.js
Readers.GPapReaderMzaczdv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderMzaczdv",keys:["duv_vyra"],[columns]:["duv_vyra","duv_vyra_txt","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderMzaczdv.inheritsFrom(ReadersBase);
Fields.gPapReaderMzaczdv = (prefabOptions) => { return {data:new Readers.GPapReaderMzaczdv(),[itemTemplate]:"{k_xml:trim:encode}",[helperColumns]:["k_xml"]};};

// Gordic.Pap.Client.GPapReaderMzacztz.fields.js
Readers.GPapReaderMzacztz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderMzacztz",keys:["typ_ez"],[columns]:["typ_ez","typ_ez_txt","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderMzacztz.inheritsFrom(ReadersBase);
Fields.gPapReaderMzacztz = (prefabOptions) => { return {data:new Readers.GPapReaderMzacztz(),[itemTemplate]:"{k_xml:trim:encode}",[helperColumns]:["k_xml"]};};

// Gordic.Pap.Client.GPapReaderMzaczzz.fields.js
Readers.GPapReaderMzaczzz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderMzaczzz",keys:["zpus_zah"],[columns]:["zpus_zah","zpus_zah_txt","popis","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderMzaczzz.inheritsFrom(ReadersBase);
Fields.gPapReaderMzaczzz = (prefabOptions) => { return {data:new Readers.GPapReaderMzaczzz(),[itemTemplate]:"{k_xml:trim:encode}",[helperColumns]:["k_xml"]};};

// Gordic.Pap.Client.GPapReaderRzacfzc.fields.js
Readers.GPapReaderRzacfzc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderRzacfzc",keys:["def_fzc"],[columns]:["def_fzc","def_fzc_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderRzacfzc.inheritsFrom(ReadersBase);
Fields.gPapReaderRzacfzc = (prefabOptions) => { return {data:new Readers.GPapReaderRzacfzc(),[itemTemplate]:"{def_fzc_txt:trim:encode}",[helperColumns]:["def_fzc_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gPapReaderRzacfzc(),prefabOptions,options)).show()};};
Selectors.gPapReaderRzacfzc = () => { return {data:new Readers.GPapReaderRzacfzc(),[userSettings]:usRoot+"gPapReaderRzacfzc",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["def_fzc_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "def_fzc_txt", caption: "jres:26600086", width: 100, forced: true})};};

// Gordic.Pap.Client.GPapReaderRzaclim.fields.js
Readers.GPapReaderRzaclim = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderRzaclim",keys:["lim_zak"],[columns]:["lim_zak","lim_zak_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderRzaclim.inheritsFrom(ReadersBase);
Fields.gPapReaderRzaclim = (prefabOptions) => { return {data:new Readers.GPapReaderRzaclim(),[itemTemplate]:"{lim_zak_txt:trim:encode}",[helperColumns]:["lim_zak_txt"]};};

// Gordic.Pap.Client.GPapReaderRzactpru.fields.js
Readers.GPapReaderRzacpru = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderRzacpru",keys:["pre_urc"],[columns]:["pre_urc","pre_urc_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderRzacpru.inheritsFrom(ReadersBase);
Fields.gPapReaderRzacpru = (prefabOptions) => { return {data:new Readers.GPapReaderRzacpru(),[itemTemplate]:"{pre_urc_txt:trim:encode}",[helperColumns]:["pre_urc_txt"]};};

// Gordic.Pap.Client.GPapReaderRzactza.fields.js
Readers.GPapReaderRzactza = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderRzactza",keys:["pap_tza"],[columns]:["pap_tza","pap_tza_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderRzactza.inheritsFrom(ReadersBase);
Fields.gPapReaderRzactza = (prefabOptions) => { return {data:new Readers.GPapReaderRzactza(),[itemTemplate]:"{pap_tza_txt:trim:encode}",[helperColumns]:["pap_tza_txt"]};};

// Gordic.Rza.Client.GPapReaderRzasleg.fields.js
Readers.GPapReaderRzasleg = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderRzasleg",keys:["leg_usm_par"],[columns]:["leg_usm_par", "nazev", "zkratka", "pap_tza", "pre_urc", "lim_zak", "dat_od", "dat_do"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.GPapReaderRzasleg.inheritsFrom(ReadersBase);
Fields.gPapReaderRzasleg = (prefabOptions) => { return {data:new Readers.GPapReaderRzasleg(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gPapReaderRzasleg(),prefabOptions,options)).show()};};
Selectors.gPapReaderRzasleg = () => { return {data:new Readers.GPapReaderRzasleg(),[userSettings]:usRoot+"gPapReaderRzasleg",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:26600077", width: 300, forced: true}).addTextColumn({name: "zkratka", caption: "jres:26600078", width: 100}).addTextColumn({name: "pap_tza_txt", caption: "jres:26600079", width: 100}).addTextColumn({name: "pre_urc_txt", caption: "jres:26600080", width: 100}).addTextColumn({name: "lim_zak_txt", caption: "jres:26600081", width: 100}).addDateColumn({name: "dat_od", caption: "jres:26600082", width: 100}).addDateColumn({name: "dat_do", caption: "jres:26600083", width: 100})};};

// Gordic.Pap.Client.GPapReaderDdpstpp.fields.js
Readers.GPapReaderDdpstpp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderDdpstpp",keys:["typ_phl"],[columns]:["typ_phl","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderDdpstpp.inheritsFrom(ReadersBase);
Fields.gPapReaderDdpstpp = (prefabOptions) => { return {data:new Readers.GPapReaderDdpstpp(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"]};};

// Gordic.Pap.Client.GPapReaderEkosrea.fields.js
Readers.PapEkosrea = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPapEkosrea",keys:["cis_real","ico"],[columns]:["cis_real","ico","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PapEkosrea.inheritsFrom(ReadersBase);
Fields.papEkosrea = (prefabOptions) => { return {data:new Readers.PapEkosrea(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"]};};

// Gordic.Pap.Client.GPapReaderIxpDen.fields.js
Readers.GPapReaderIxpDen = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderIxpDen",keys:["ixp_den"],[columns]:["ixp_den","nazev","rok","ktg_den","subrada"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderIxpDen.inheritsFrom(ReadersBase);
Fields.gPapReaderIxpDen = (prefabOptions) => { return {data:new Readers.GPapReaderIxpDen(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gPapReaderIxpDen(),prefabOptions,options)).show()};};
Selectors.gPapReaderIxpDen = () => { return {data:new Readers.GPapReaderIxpDen(),[userSettings]:usRoot+"gPapReaderIxpDen",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "ixp_den", caption: "jres:26600060", width: 120, forced: true}).addTextColumn({name: "nazev", caption: "jres:26600087", width: 300}).addNumberColumn({name: "rok", caption: "jres:26600088", width: 120}).addNumberColumn({name: "ktg_den", caption: "jres:26600089", width: 120}).addNumberColumn({name: "subrada", caption: "jres:26600090", width: 120})};};

// Gordic.Pap.Client.GPapReaderIxsPri.fields.js
Readers.GPapReaderIxsPri = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderIxsPri",keys:["ixs_pri"],[columns]:["ixs_pri","nazev","ac","ac_ag","rok"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderIxsPri.inheritsFrom(ReadersBase);
Fields.gPapReaderIxsPri = (prefabOptions) => { return {data:new Readers.GPapReaderIxsPri(),[itemTemplate]:"{ixs_pri:trim:encode}",[helperColumns]:["ixs_pri", "nazev", "ac", "ac_ag", "rok"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gPapReaderIxsPri(),prefabOptions,options)).show()};};
Selectors.gPapReaderIxsPri = () => { return {data:new Readers.GPapReaderIxsPri(),[userSettings]:usRoot+"gPapReaderIxsPri",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixs_pri", "nazev", "ac", "ac_ag", "rok"]},[gridFormat]:newGridFormat().addTextColumn({name: "ixs_pri", caption: "jres:26600060", width: 120, forced: true}).addTextColumn({name: "nazev", caption: "jres:26600061", width: 300}).addTextColumn({name: "ac", caption: "jres:26600062", width: 120}).addTextColumn({name: "ac_ag", caption: "jres:26600063", width: 120}).addNumberColumn({name: "rok", caption: "jres:26600064", width: 80})};};

// Gordic.Pap.Client.GPapReaderlxssbl.fields.js
Readers.GPapReaderIxssbl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderIxssbl",keys:["ixs_sbl"],[columns]:["ixs_sbl","nazev","zkratka","poznamka","dat_uzavreni","dat_platnost","nazev_den"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.GPapReaderIxssbl.inheritsFrom(ReadersBase);
Fields.gPapReaderIxssbl = (prefabOptions) => { return {data:new Readers.GPapReaderIxssbl(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gPapReaderIxssbl(),prefabOptions,options)).show()};};
Selectors.gPapReaderIxssbl = () => { return {data:new Readers.GPapReaderIxssbl(),[userSettings]:usRoot+"gPapReaderIxssbl",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:26600030", width: 300, forced: true}).addTextColumn({name: "zkratka", caption: "jres:26600029", width: 200}).addTextColumn({name: "poznamka", caption: "jres:26600031", width: 350}).addDateColumn({name: "dat_uzavreni", caption: "jres:26600036", width: 180}).addDateColumn({name: "dat_platnost", caption: "jres:26600037", width: 180}).addTextColumn({name: "nazev_den", caption: "jres:26600045", width: 300})};};

// Gordic.Pap.Client.GPapReaderSmlckts.fields.js
Readers.GPapReaderSmlckts = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderSmlckts",keys:["ktg_sml"],[columns]:["ktg_sml","ktg_sml_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderSmlckts.inheritsFrom(ReadersBase);
Fields.gPapReaderSmlckts = (prefabOptions) => { return {data:new Readers.GPapReaderSmlckts(),[itemTemplate]:"{ktg_sml_txt:trim:encode}",[helperColumns]:["ktg_sml_txt"]};};

// Gordic.Pap.Client.GPapReaderSmlctyc.fields.js
Readers.GPapReaderSmlctyc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderSmlctyc",keys:["typ_ceny"],[columns]:["typ_ceny","typ_ceny_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderSmlctyc.inheritsFrom(ReadersBase);
Fields.gPapReaderSmlctyc = (prefabOptions) => { return {data:new Readers.GPapReaderSmlctyc(),[itemTemplate]:"{typ_ceny_txt:trim:encode}",[helperColumns]:["typ_ceny_txt"]};};

// Gordic.Pap.Client.GPapReaderSmlsden.fields.js
Readers.GPapReaderSmlsden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderSmlsden",keys:["ixp_den"],[columns]:["ixp_den","text1","text2","nazev","rok","subrada"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderSmlsden.inheritsFrom(ReadersBase);
Fields.gPapReaderSmlsden = (prefabOptions) => { return {data:new Readers.GPapReaderSmlsden(),[itemTemplate]:"{text2:trim:encode}",[helperColumns]:["text2"]};};

// Gordic.Pap.Client.GPapReaderSmlssou.fields.js
Readers.GPapReaderSmlssou = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderSmlssou",keys:["soutez"],[columns]:["soutez","soutez_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderSmlssou.inheritsFrom(ReadersBase);
Fields.gPapReaderSmlssou = (prefabOptions) => { return {data:new Readers.GPapReaderSmlssou(),[itemTemplate]:"{soutez_txt:trim:encode}",[helperColumns]:["soutez_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gPapReaderSmlssou(),prefabOptions,options)).show()};};
Selectors.gPapReaderSmlssou = () => { return {data:new Readers.GPapReaderSmlssou(),[userSettings]:usRoot+"gPapReaderSmlssou",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["soutez_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "soutez", caption: "jres:26600055", width: 120, forced: true}).addTextColumn({name: "soutez_txt", caption: "jres:26600056", width: 300})};};

// Gordic.Pap.Client.GPapReaderSmlvfun.fields.js
Readers.GPapReaderSmlvfun = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderSmlvfun",keys:["ixs_fun"],[columns]:["ixs_fun","nazev_rf","nazev_ref","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderSmlvfun.inheritsFrom(ReadersBase);
Fields.gPapReaderSmlvfun = (prefabOptions) => { return {data:new Readers.GPapReaderSmlvfun(),[itemTemplate]:"{nazev_rf:trim:encode}",[helperColumns]:["nazev_rf"]};};

// Gordic.Pap.Client.GPapReaderSslstyp.fields.js
Readers.GPapReaderSslstyp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderSslstyp",keys:["ixs_typ"],[columns]:["ixs_typ","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderSslstyp.inheritsFrom(ReadersBase);
Fields.gPapReaderSslstyp = (prefabOptions) => { return {data:new Readers.GPapReaderSslstyp(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gPapReaderSslstyp(),prefabOptions,options)).show()};};
Selectors.gPapReaderSslstyp = () => { return {data:new Readers.GPapReaderSslstyp(),[userSettings]:usRoot+"gPapReaderSslstyp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:26600065", width: 300, forced: true})};};

// Gordic.Pap.Client.GPapReaderSslstypSml.fields.js
Readers.GPapReaderSslstypSml = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderSslstypSml",keys:["ixs_typ"],[columns]:["ixs_typ","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderSslstypSml.inheritsFrom(ReadersBase);
Fields.gPapReaderSslstypSml = (prefabOptions) => { return {data:new Readers.GPapReaderSslstypSml(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"]};};

// Gordic.Pap.Client.GPapReaderVlastnik.fields.js
Readers.GPapReaderVlastnik = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderVlastnik",keys:["ixs_fun"],[columns]:["ixs_fun","nazev_rf","cs_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderVlastnik.inheritsFrom(ReadersBase);
Fields.gPapReaderVlastnik = (prefabOptions) => { return {data:new Readers.GPapReaderVlastnik(),[itemTemplate]:"{nazev_rf:trim:encode}",[helperColumns]:["nazev_rf"]};};

// Gordic.Pap.Client.GPapReaderWsHist.fields.js
Readers.GPapReaderWsHist = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderWsHist",keys:["dat_zmena"],[columns]:["dat_zmena","nazev_rf","ixs_zmp"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.GPapReaderWsHist.inheritsFrom(ReadersBase);
Fields.gPapReaderWsHist = (prefabOptions) => { return {data:new Readers.GPapReaderWsHist(),[itemTemplate]:"{dat_zmena:datetime}",[helperColumns]:["dat_zmena"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gPapReaderWsHist(),prefabOptions,options)).show()};};
Selectors.gPapReaderWsHist = () => { return {data:new Readers.GPapReaderWsHist(),[userSettings]:usRoot+"gPapReaderWsHist",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["dat_zmena"]},[gridFormat]:newGridFormat().addDateTimeColumn({name: "dat_zmena", caption: "jres:26600066", width: 70, forced: true}).addTextColumn({name: "nazev_rf", caption: "jres:26600067", width: 260})};};

// Gordic.Pap.Client.GPapReaderXxxcdri.fields.js
Readers.GPapReaderXxxcdri = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderXxxcdri",keys:["dru_riz"],[columns]:["dru_riz","dru_riz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderXxxcdri.inheritsFrom(ReadersBase);
Fields.gPapReaderXxxcdri = (prefabOptions) => { return {data:new Readers.GPapReaderXxxcdri(),[itemTemplate]:"{dru_riz_txt:trim:encode}",[helperColumns]:["dru_riz_txt"]};};

// Gordic.Pap.Client.GPapReaderXxxcduz.fields.js
Readers.GPapReaderXxxcduz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderXxxcduz",keys:["cis_duz"],[columns]:["cis_duz","cis_duz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderXxxcduz.inheritsFrom(ReadersBase);
Fields.gPapReaderXxxcduz = (prefabOptions) => { return {data:new Readers.GPapReaderXxxcduz(),[itemTemplate]:"{cis_duz_txt:trim:encode}",[helperColumns]:["cis_duz_txt"]};};

// Gordic.Pap.Client.GPapReaderXxxcess.fields.js
Readers.GPapReaderXxxcess = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderXxxcess",keys:["s_ess"],[columns]:["s_ess","s_ess_txt"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.GPapReaderXxxcess.inheritsFrom(ReadersBase);
Fields.gPapReaderXxxcess = (prefabOptions) => { return {data:new Readers.GPapReaderXxxcess(),[itemTemplate]:"{s_ess_txt:trim:encode}",[helperColumns]:["s_ess_txt"]};};

// Gordic.Pap.Client.GPapReaderXxxcner.fields.js
Readers.GPapReaderXxxcner = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderXxxcner",keys:["cis_ner"],[columns]:["cis_ner","cis_ner_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderXxxcner.inheritsFrom(ReadersBase);
Fields.gPapReaderXxxcner = (prefabOptions) => { return {data:new Readers.GPapReaderXxxcner(),[itemTemplate]:"{cis_ner_txt:trim:encode}",[helperColumns]:["cis_ner_txt"]};};

// Gordic.Pap.Client.GPapReaderXxxcpri.fields.js
Readers.GPapReaderXxxcpri = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderXxxcpri",keys:["pri_pri"],[columns]:["pri_pri","pri_pri_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderXxxcpri.inheritsFrom(ReadersBase);
Fields.gPapReaderXxxcpri = (prefabOptions) => { return {data:new Readers.GPapReaderXxxcpri(),[itemTemplate]:"{pri_pri_txt:trim:encode}",[helperColumns]:["pri_pri_txt"]};};

// Gordic.Pap.Client.GPapReaderXxxcrez.fields.js
Readers.GPapReaderXxxcrez = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderXxxcrez",keys:["rezim_pri"],[columns]:["rezim_pri","rezim_pri_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderXxxcrez.inheritsFrom(ReadersBase);
Fields.gPapReaderXxxcrez = (prefabOptions) => { return {data:new Readers.GPapReaderXxxcrez(),[itemTemplate]:"{rezim_pri_txt:trim:encode}",[helperColumns]:["rezim_pri_txt"]};};

// Gordic.Pap.Client.GPapReaderXxxctfi.fields.js
Readers.GPapReaderXxxctfi = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderXxxctfi",keys:["typ_fin"],[columns]:["typ_fin","typ_fin_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderXxxctfi.inheritsFrom(ReadersBase);
Fields.gPapReaderXxxctfi = (prefabOptions) => { return {data:new Readers.GPapReaderXxxctfi(),[itemTemplate]:"{typ_fin_txt:trim:encode}",[helperColumns]:["typ_fin_txt"]};};

// Gordic.Pap.Client.GPapReaderXxxctyk.fields.js
Readers.GPapReaderXxxctyk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPapReaderXxxctyk",keys:["typ_kurz"],[columns]:["typ_kurz","typ_kurz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPapReaderXxxctyk.inheritsFrom(ReadersBase);
Fields.gPapReaderXxxctyk = (prefabOptions) => { return {data:new Readers.GPapReaderXxxctyk(),[itemTemplate]:"{typ_kurz_txt:trim:encode}",[helperColumns]:["typ_kurz_txt"]};};

// Gordic.Pap.Client.GPapReaderXxxSOho.fields.js
Readers.PapXxxSOho = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPapXxxSOho",keys:["xxx_dt"],[columns]:["xxx_dt","nazev","zkratka","poznamka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PapXxxSOho.inheritsFrom(ReadersBase);
Fields.papXxxSOho = (prefabOptions) => { return {data:new Readers.PapXxxSOho(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.papXxxSOho(),prefabOptions,options)).show()};};
Selectors.papXxxSOho = () => { return {data:new Readers.PapXxxSOho(),[userSettings]:usRoot+"papXxxSOho",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "xxx_dt", caption: "jres:26600047", width: 100, forced: true}).addTextColumn({name: "nazev", caption: "jres:26600048", width: 100}).addTextColumn({name: "zkratka", caption: "jres:26600029", width: 100}).addTextColumn({name: "poznamka", caption: "jres:26600031", width: 200})};};

// Gordic.Pap.Client.GPapReaderXxxSPouOrp.fields.js
Readers.PapXxxSPouOrp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPapXxxSPouOrp",keys:["xxx_dt"],[columns]:["xxx_dt","nazev","zkratka","poznamka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PapXxxSPouOrp.inheritsFrom(ReadersBase);
Fields.papXxxSPouOrp = (prefabOptions) => { return {data:new Readers.PapXxxSPouOrp(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.papXxxSPouOrp(),prefabOptions,options)).show()};};
Selectors.papXxxSPouOrp = () => { return {data:new Readers.PapXxxSPouOrp(),[userSettings]:usRoot+"papXxxSPouOrp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "xxx_dt", caption: "jres:26600046", width: 100, forced: true}).addTextColumn({name: "nazev", caption: "jres:26600030", width: 100}).addTextColumn({name: "zkratka", caption: "jres:26600029", width: 100}).addTextColumn({name: "poznamka", caption: "jres:26600031", width: 200})};};

// Gordic.Pap.Client.GPapReaderXxxVprc.fields.js
Readers.PapXxxvprc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPapXxxvprc",keys:["cislo"],[columns]:["cislo","nazev","ixs_pla","ixs_cia","ico","ucs","typ","typ_txt","adresa1","cis_real","ktg_akce","ktg_akce_txt","sip_val1","sip_val2","sip_val3","sip_val4","priz_sta1","priz_sta2","priz_az","stav_inp"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.PapXxxvprc.inheritsFrom(ReadersBase);
Fields.papXxxvprc = (prefabOptions) => { return {data:new Readers.PapXxxvprc(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.papXxxvprc(),prefabOptions,options)).show()};};
Selectors.papXxxvprc = () => { return {data:new Readers.PapXxxvprc(),[userSettings]:usRoot+"papXxxvprc",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "cislo", caption: "jres:26600054", width: 100, forced: true}).addTextColumn({name: "nazev", caption: "jres:26600030", width: 300})};};

})(jQuery);

"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Rob.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const selector = "selector"; const gridFormat = "gridFormat"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const gridOpts = "gridOpts"; const dropdown = "dropdown"; const selectorFormat = "selectorFormat";

// Gordic.Rob.Client.GJmenoReader.fields.js
Readers.GJmenoReader = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GJmenoReader",keys:["jmeno"],[columns]:["jmeno","aktivita","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GJmenoReader.inheritsFrom(ReadersBase);
Fields.gJmenoReader = (prefabOptions) => { return {data:new Readers.GJmenoReader(),[itemTemplate]:"{jmeno}",[helperColumns]:["jmeno"]};};

// Gordic.Rob.Client.GPrijmeniReader.fields.js
Readers.GPrijmeniReader = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GPrijmeniReader",keys:["prijmeni"],[columns]:["prijmeni","aktivita","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GPrijmeniReader.inheritsFrom(ReadersBase);
Fields.gPrijmeniReader = (prefabOptions) => { return {data:new Readers.GPrijmeniReader(),[itemTemplate]:"{prijmeni}",[helperColumns]:["prijmeni"]};};

// Gordic.Rob.Client.GReaderObec.fields.js
Readers.Obec = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderObec",keys:["obec"],[columns]:["obec_nuts","okres_nuts","obec","okres","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Obec.inheritsFrom(ReadersBase);
Fields.obec = (prefabOptions) => { return {data:new Readers.Obec(),[itemTemplate]:"{obec}",[helperColumns]:["obec_nuts", "obec", "okres"],[selector]:(options) => newDefaultSelector($.extend(Selectors.obec(),prefabOptions,options)).show()};};
Selectors.obec = () => { return {data:new Readers.Obec(),[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "obec_nuts", caption: "NUTS", width: 80 })
		.addTextColumn({ name: "obec", caption: "Obec", width: 100 })
		.addTextColumn({ name: "okres", caption: "Okres", width: 160 }),[userSettings]:usRoot+"obec",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["obec_nuts", "obec", "okres"]}};};

// Gordic.Rob.Client.GReaderRobcakc.fields.js
Readers.Robcakc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcakc",keys:["typ_akce"],[columns]:["typ_akce","typ_akce_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcakc.inheritsFrom(ReadersBase);
Fields.robcakc = (prefabOptions) => { return {data:new Readers.Robcakc(),[dropdown]:true,[itemTemplate]:"{typ_akce_txt:trim:encode}",[helperColumns]:["typ_akce_txt"]};};

// Gordic.Rob.Client.GReaderRobcczz.fields.js
Readers.Robcczz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcczz",keys:["z_z"],[columns]:["z_z","z_z_txt","z_z_txt_cro","z_z_txt_plne","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcczz.inheritsFrom(ReadersBase);
Fields.robcczz = (prefabOptions) => { return {data:new Readers.Robcczz(),[itemTemplate]:"{z_z_txt}",[helperColumns]:["z_z_txt"]};};

// Gordic.Rob.Client.GReaderRobcczz_cro.fields.js
Readers.Robcczz_cro = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcczz_cro",keys:["z_z"],[columns]:["z_z","z_z_txt","z_z_txt_cro","z_z_txt_plne","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcczz_cro.inheritsFrom(ReadersBase);
Fields.robcczz_cro = (prefabOptions) => { return {data:new Readers.Robcczz_cro(),[itemTemplate]:"{z_z_txt_cro}",[helperColumns]:["z_z_txt_cro"]};};

// Gordic.Rob.Client.GReaderRobcczz_plne.fields.js
Readers.Robcczz_plne = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcczz_plne",keys:["z_z"],[columns]:["z_z","z_z_txt","z_z_txt_cro","z_z_txt_plne","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcczz_plne.inheritsFrom(ReadersBase);
Fields.robcczz_plne = (prefabOptions) => { return {data:new Readers.Robcczz_plne(),[itemTemplate]:"{z_z_txt_plne}",[helperColumns]:["z_z_txt_plne"]};};

// Gordic.Rob.Client.GReaderRobcdcd.fields.js
Readers.Robcdcd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcdcd",keys:["dcd"],[columns]:["dcd","dcd_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcdcd.inheritsFrom(ReadersBase);
Fields.robcdcd = (prefabOptions) => { return {data:new Readers.Robcdcd(),[itemTemplate]:"{dcd_txt}",[helperColumns]:["dcd","dcd_txt"]};};

// Gordic.Rob.Client.GReaderRobcdrs.fields.js
Readers.Robcdrs = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcdrs",keys:["rod_stav"],[columns]:["rod_stav","rod_stav_txt","rod_stav_ginis","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcdrs.inheritsFrom(ReadersBase);
Fields.robcdrs = (prefabOptions) => { return {data:new Readers.Robcdrs(),[itemTemplate]:"{rod_stav_txt}",[helperColumns]:["rod_stav"]};};

// Gordic.Rob.Client.GReaderRobcdtp.fields.js
Readers.Robcdtp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcdtp",keys:["typ_pob"],[columns]:["typ_pob","typ_pob_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcdtp.inheritsFrom(ReadersBase);
Fields.robcdtp = (prefabOptions) => { return {data:new Readers.Robcdtp(),[itemTemplate]:"{typ_pob_txt}",[helperColumns]:["typ_pob_txt"]};};

// Gordic.Rob.Client.GReaderRobcduo.fields.js
Readers.Robcduo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcduo",keys:["duvod_odmitnuti"],[columns]:["duvod_odmitnuti","duvod_odmitnuti_tx","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcduo.inheritsFrom(ReadersBase);
Fields.robcduo = (prefabOptions) => { return {data:new Readers.Robcduo(),[itemTemplate]:"{duvod_odmitnuti_tx}",[helperColumns]:["duvod_odmitnuti_tx"]};};

// Gordic.Rob.Client.GReaderRobcdus.fields.js
Readers.Robcdus = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcdus",keys:["duvod_steh"],[columns]:["duvod_steh","duvod_steh_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcdus.inheritsFrom(ReadersBase);
Fields.robcdus = (prefabOptions) => { return {data:new Readers.Robcdus(),[itemTemplate]:"{duvod_steh_txt}",[helperColumns]:["duvod_steh_txt"]};};

// Gordic.Rob.Client.GReaderRobcdzm.fields.js
Readers.Robcdzm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcdzm",keys:["duv_zm"],[columns]:["duv_zm","duv_zm_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcdzm.inheritsFrom(ReadersBase);
Fields.robcdzm = (prefabOptions) => { return {data:new Readers.Robcdzm(),[itemTemplate]:"{duv_zm_txt}",[helperColumns]:["duv_zm_txt"]};};

// Gordic.Rob.Client.GReaderRobceak.fields.js
Readers.Robceak = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobceak",keys:["ekon_aktivita"],[columns]:["ekon_aktivita","ekon_aktivita_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robceak.inheritsFrom(ReadersBase);
Fields.robceak = (prefabOptions) => { return {data:new Readers.Robceak(),[itemTemplate]:"{ekon_aktivita_txt}",[helperColumns]:["ekon_aktivita_txt"]};};

// Gordic.Rob.Client.GReaderRobcjme.fields.js
Readers.Robcjme = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcjme",keys:["typ_jme"],[columns]:["typ_jme","typ_jme_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcjme.inheritsFrom(ReadersBase);
Fields.robcjme = (prefabOptions) => { return {data:new Readers.Robcjme(),[itemTemplate]:"{typ_jme_txt}",[helperColumns]:["typ_jme_txt"]};};

// Gordic.Rob.Client.GReaderRobckon.fields.js
Readers.Robckon = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobckon",keys:["stav_rob"],[columns]:["stav_rob","stav_rob_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robckon.inheritsFrom(ReadersBase);
Fields.robckon = (prefabOptions) => { return {data:new Readers.Robckon(),[itemTemplate]:"{stav_rob_txt}",[helperColumns]:["stav_rob","stav_rob_txt"]};};

// Gordic.Rob.Client.GReaderRobckso.fields.js
Readers.Robckso = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobckso",keys:["kval_st_obc"],[columns]:["kval_st_obc","kval_st_obc_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robckso.inheritsFrom(ReadersBase);
Fields.robckso = (prefabOptions) => { return {data:new Readers.Robckso(),[itemTemplate]:"{kval_st_obc_txt}",[helperColumns]:["kval_st_obc_txt"]};};

// Gordic.Rob.Client.GReaderRobckto.fields.js
Readers.Robckto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobckto",keys:["ktg_obyv"],[columns]:["ktg_obyv","ktg_obyv_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robckto.inheritsFrom(ReadersBase);
Fields.robckto = (prefabOptions) => { return {data:new Readers.Robckto(),[dropdown]:true,[itemTemplate]:"{ktg_obyv_txt:trim:encode}",[helperColumns]:["ktg_obyv_txt"]};};

// Gordic.Rob.Client.GReaderRobcpoh.fields.js
Readers.Robcpoh = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcpoh",keys:["pohlavi"],[columns]:["pohlavi","pohlavi_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcpoh.inheritsFrom(ReadersBase);
Fields.robcpoh = (prefabOptions) => { return {data:new Readers.Robcpoh(),[dropdown]:true,[itemTemplate]:"{pohlavi_txt:trim:encode}",[helperColumns]:["pohlavi_txt"]};};

// Gordic.Rob.Client.GReaderRobcsos.fields.js
Readers.Robcsos = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcsos",keys:["stav_oso"],[columns]:["stav_oso","stav_oso_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcsos.inheritsFrom(ReadersBase);
Fields.robcsos = (prefabOptions) => { return {data:new Readers.Robcsos(),[dropdown]:true,[itemTemplate]:"{stav_oso_txt:trim:encode}",[helperColumns]:["stav_oso_txt"]};};

// Gordic.Rob.Client.GReaderRobcstb.fields.js
Readers.Robcstb = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcstb",keys:["stav_bydl"],[columns]:["stav_bydl","stav_bydl_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcstb.inheritsFrom(ReadersBase);
Fields.grobcstb = (prefabOptions) => { return {data:new Readers.Robcstb(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// Gordic.Rob.Client.GReaderRobcstz.fields.js
Readers.Robcstz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcstz",keys:["stav_zprac"],[columns]:["stav_zprac","stav_zprac_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcstz.inheritsFrom(ReadersBase);
Fields.robcstz = (prefabOptions) => { return {data:new Readers.Robcstz(),[itemTemplate]:"{stav_zprac_txt}",[helperColumns]:["stav_zprac_txt"]};};

// Gordic.Rob.Client.GReaderRobcszm.fields.js
Readers.Robcszm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcszm",keys:["szr_zmena"],[columns]:["szr_zmena","szr_zmena_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcszm.inheritsFrom(ReadersBase);
Fields.Robcszm = (prefabOptions) => { return {data:new Readers.Robcszm(),[itemTemplate]:"{szr_zmena_txt}",[helperColumns]:["szr_zmena", "szr_zmena_txt", "k_v"]};};

// Gordic.Rob.Client.GReaderRobcvbp.fields.js
Readers.Robcvbp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcvbp",keys:["vztah_bp"],[columns]:["vztah_bp","vztah_bp_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcvbp.inheritsFrom(ReadersBase);
Fields.robcvbp = (prefabOptions) => { return {data:new Readers.Robcvbp(),[itemTemplate]:"{vztah_bp_txt}",[helperColumns]:["vztah_bp_txt"]};};

// Gordic.Rob.Client.GReaderRobcvzd.fields.js
Readers.Robcvzd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcvzd",keys:["vzdelani"],[columns]:["vzdelani","vzdelani_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcvzd.inheritsFrom(ReadersBase);
Fields.robcvzd = (prefabOptions) => { return {data:new Readers.Robcvzd(),[itemTemplate]:"{vzdelani_txt}",[helperColumns]:["vzdelani_txt"]};};

// Gordic.Rob.Client.GReaderRobczad.fields.js
Readers.Robczad = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobczad",keys:["zmena_adr"],[columns]:["zmena_adr","zmena_adr_det_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robczad.inheritsFrom(ReadersBase);
Fields.grobczad = (prefabOptions) => { return {data:new Readers.Robczad(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// Gordic.Rob.Client.GReaderRobczam.fields.js
Readers.Robczam = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobczam",keys:["zamestnani"],[columns]:["zamestnani","zamestnani_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robczam.inheritsFrom(ReadersBase);
Fields.robczam = (prefabOptions) => { return {data:new Readers.Robczam(),[itemTemplate]:"{zamestnani_txt}",[helperColumns]:["zamestnani_txt"]};};

// Gordic.Rob.Client.GReaderRobczui.fields.js
Readers.Robczui = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobczui",keys:["zpusob_vyriz"],[columns]:["zpusob_vyriz","zpusob_vyriz_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robczui.inheritsFrom(ReadersBase);
Fields.robczui = (prefabOptions) => { return {data:new Readers.Robczui(),[itemTemplate]:"{zpusob_vyriz_txt}",[helperColumns]:["zpusob_vyriz", "zpusob_vyriz_txt", "k_v"]};};

// Gordic.Rob.Client.GReaderRobsduv.fields.js
Readers.Robsduv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobsduv",keys:["ixs_duv"],[columns]:["ixs_duv","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robsduv.inheritsFrom(ReadersBase);
Fields.robsduv = (prefabOptions) => { return {data:new Readers.Robsduv(),[dropdown]:true,[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"]};};

// Gordic.Rob.Client.GReaderRobsnar.fields.js
Readers.Robsnar = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobsnar",keys:["narodnost"],[columns]:["narodnost","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robsnar.inheritsFrom(ReadersBase);
Fields.robsnar = (prefabOptions) => { return {data:new Readers.Robsnar(),[itemTemplate]:"{narodnost}",[helperColumns]:["narodnost"]};};

// Gordic.Rob.Client.GReaderRobsobn.fields.js
Readers.Robsobn = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobsobn",keys:["obec_nuts"],[columns]:["obec_nuts", "obec", "okres"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robsobn.inheritsFrom(ReadersBase);
Fields.robsobn = (prefabOptions) => { return {data:new Readers.Robsobn(),[dropdown]:false,[itemTemplate]:"{obec}",[helperColumns]:["obec_nuts", "obec", "okres"],[selector]:(options) => newDefaultSelector($.extend(Selectors.robsobn(),prefabOptions,options)).show()};};
Selectors.robsobn = () => { return {data:new Readers.Robsobn(),[gridFormat]:new Gordic.Data.GridFormat()
        .addTextColumn({ name: "obec_nuts", caption: "NUTS", width: 80 }) 
        .addTextColumn({ name: "obec", caption: "Obec", width: 100 }) 
        .addTextColumn({ name: "okres", caption: "Okres", width: 160 }),[userSettings]:usRoot+"robsobn",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["obec_nuts", "obec", "okres"]}};};

// Gordic.Rob.Client.GReaderRobstdoROB.fields.js
Readers.RobstdoROB = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobstdoROB",keys:["ixs_tdo"],[columns]:["ixs_tdo","nazev","aktivita","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.RobstdoROB.inheritsFrom(ReadersBase);
Fields.robstdoROB = (prefabOptions) => { return {data:new Readers.RobstdoROB(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.robstdoROB(),prefabOptions,options)).show()};};
Selectors.robstdoROB = () => { return {data:new Readers.RobstdoROB(),[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "ixs_tdo", caption: "Identifikátor", width: 80 })
		.addTextColumn({ name: "nazev", caption: "Popis", width: 100 }),[userSettings]:usRoot+"robstdoROB",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]}};};

// Gordic.Rob.Client.GReaderSzrsmop.fields.js
Readers.Szrsmop = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSzrsmop",keys:["mop_kod"],[columns]:["mop_kod","mop_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Szrsmop.inheritsFrom(ReadersBase);
Fields.szrsmop = (prefabOptions) => { return {data:new Readers.Szrsmop(),[itemTemplate]:"{mop_kod,mop_nazev}",[helperColumns]:["mop_kod","mop_nazev"]};};

// Gordic.Rob.Client.GReaderPoksden.fields.js
Readers.PoksdenROB = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPoksden",keys:["ixp_den"],[columns]:["ixp_den","nazev","ixs_vpk"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PoksdenROB.inheritsFrom(ReadersBase);
Fields.poksdenROB = (prefabOptions) => { return {data:new Readers.PoksdenROB(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// Gordic.Rob.Client.GReaderPokvkon.fields.js
Readers.PokvkonROB = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPokvkon",keys:["ixs_kon"],[columns]:["ixs_kon","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PokvkonROB.inheritsFrom(ReadersBase);
Fields.pokvkonROB = (prefabOptions) => { return {data:new Readers.PokvkonROB(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// Gordic.Rob.Client.GReaderNemskat.fields.js
Readers.Nemskat = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemskat",keys:["kod_kat_uzemi"],[columns]:["kod_kat_uzemi","nazev","kod_obce","obec_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemskat.inheritsFrom(ReadersBase);
Fields.nemskat = (prefabOptions) => { return {data:new Readers.Nemskat(),[itemTemplate]:"{nazev}",[helperColumns]:["kod_kat_uzemi","nazev","kod_obce","obec_nazev"]};};

// Gordic.Rob.Client.GReaderNemsobc.fields.js
Readers.Nemsobc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemsobc",keys:["kod_obce"],[columns]:["kod_obce","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemsobc.inheritsFrom(ReadersBase);
Fields.nemsobc = (prefabOptions) => { return {data:new Readers.Nemsobc(),[itemTemplate]:"{nazev}",[helperColumns]:["kod_obce", "nazev"]};};

// Gordic.Rob.Client.GReaderRobsprn.fields.js
Readers.Robsprn = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobsprn",keys:["ixs_prn"],[columns]:["ixs_prn","nazev","popis","dat_ulozeni"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robsprn.inheritsFrom(ReadersBase);
Fields.robsprn = (prefabOptions) => { return {data:new Readers.Robsprn(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_prn", "nazev", "popis", "dat_ulozeni"]};};

// Gordic.Rob.Client.GReaderRobctpoDto.fields.js
Readers.RobctpoDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobctpoDto",keys:["typ_pobytu"],[columns]:["typ_pobytu","typ_pobytu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.RobctpoDto.inheritsFrom(ReadersBase);
Fields.robctpoDto = (prefabOptions) => { return {data:new Readers.RobctpoDto(),[dropdown]:true,[itemTemplate]:"{typ_pobytu_txt:trim:encode}",[helperColumns]:["typ_pobytu_txt"]};};

// Gordic.Rob.Client.GReaderRobsadr.fields.js
Readers.Robsadr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobsadr",keys:["ixs_adr"],[columns]:["ixs_adr","blok_domu","vchod","byt","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robsadr.inheritsFrom(ReadersBase);
Fields.robsadr = (prefabOptions) => { return {data:new Readers.Robsadr(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// Gordic.Rob.Client.GReaderRobsido.fields.js
Readers.Robsido = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobsido",keys:["ixs_ido"],[columns]:["ixs_ido","id","obec","castobce","ulice","cd","dcd","cor","pcor","cs_obec","cs_cast_obce","cs_ulice"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robsido.inheritsFrom(ReadersBase);
Fields.robsido = (prefabOptions) => { return {data:new Readers.Robsido(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// Gordic.Rob.Client.GReaderRobsidoCastObceOnly.fields.js
Readers.RobsidoCastObceOnly = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobsidoCastObceOnly",keys:["castobce"],[columns]:["castobce","cs_cast_obce"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.RobsidoCastObceOnly.inheritsFrom(ReadersBase);
Fields.robsidoCastObceOnly = (prefabOptions) => { return {data:new Readers.RobsidoCastObceOnly(),[itemTemplate]:"{castobce:trim:encode}",[helperColumns]:["castobce"]};};

// Gordic.Rob.Client.GReaderRobsidoObec.fields.js
Readers.RobsidoObec = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobsidoObec",keys:["obec"],[columns]:["obec","cs_obec"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.RobsidoObec.inheritsFrom(ReadersBase);
Fields.robsidoObec = (prefabOptions) => { return {data:new Readers.RobsidoObec(),[itemTemplate]:"{obec:trim:encode}",[helperColumns]:["obec"]};};

// Gordic.Rob.Client.GReaderRobsidoUliceOnly.fields.js
Readers.RobsidoUliceOnly = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobsidoUliceOnly",keys:["ulice"],[columns]:["ulice","cs_ulice"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.RobsidoUliceOnly.inheritsFrom(ReadersBase);
Fields.robsidoUliceOnly = (prefabOptions) => { return {data:new Readers.RobsidoUliceOnly(),[itemTemplate]:"{ulice:trim:encode}",[helperColumns]:["ulice"]};};

// Gordic.Rob.Client.GReaderRobsosoRC.fields.js
Readers.RobsosoRC = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobsosoRC",keys:["ixs_oso"],[columns]:["ixs_oso","rc","prijmeni","jmeno","stav_oso_txt","stav_oso","typ_pobytu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.RobsosoRC.inheritsFrom(ReadersBase);
Fields.robsosoRC = (prefabOptions) => { return {data:new Readers.RobsosoRC(),[itemTemplate]:"{rc}",[helperColumns]:["rc", "prijmeni", "jmeno", "typ_pobytu_txt", "stav_oso_txt"]};};

// Gordic.Rob.Client.GReaderRobsvdnTb.fields.js
Readers.RobsvdnTb = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobsvdnTb",keys:["druh_nez"],[columns]:["druh_nez","zkratka","popis","s_vyradit_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.RobsvdnTb.inheritsFrom(ReadersBase);
Fields.robsvdnTb = (prefabOptions) => { return {data:new Readers.RobsvdnTb(),[itemTemplate]:"{zkratka} - {popis}",[helperColumns]:["zkratka", "zkratka"],[selector]:(options) => newDefaultSelector($.extend(Selectors.robsvdnTb(),prefabOptions,options)).show()};};
Selectors.robsvdnTb = () => { return {data:new Readers.RobsvdnTb(),[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "zkratka", caption: "zkratka", width: 80 })
		.addTextColumn({ name: "popis", caption: "popis", width: 100 })
		.addTextColumn({ name: "s_vyradit_txt", caption: "s_vyradit_txt", width: 160 }),[userSettings]:usRoot+"robsvdnTb",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zkratka", "zkratka"]}};};

// Gordic.Rob.Client.GReaderRobsvok.fields.js
Readers.Robsvok = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobsvok",keys:["okrsek"],[columns]:["okrsek","popis","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robsvok.inheritsFrom(ReadersBase);
Fields.grobsvok = (prefabOptions) => { return {data:new Readers.Robsvok(),[itemTemplate]:"{okrsek}",[helperColumns]:["okrsek", "popis"],[selectorFormat]:new Gordic.Data.GridFormat()
			.addNumberColumn({ name: "okrsek", caption: "jres:25720003", width: 10 }) 			.addTextColumn({ name: "popis", caption: "jres:25720004", width: 100 })};};

})(jQuery);

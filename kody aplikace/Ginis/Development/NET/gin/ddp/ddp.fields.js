"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Ddp.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const dropdown = "dropdown"; const selector = "selector"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings";

// GReaderDdpsskv.fields.js
Readers.Ddpsskv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpsskv",keys:["ixs_skv"],[columns]:["ixs_skv", "nazev", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpsskv.inheritsFrom(ReadersBase);
Fields.ddpsskv = (prefabOptions) => { return {data:new Readers.Ddpsskv(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_skv", "nazev"]};};

// IGReaderCiselnikCtvrti.fields.js
Readers.CiselnikCtvrti = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderCiselnikCtvrti",keys:["ixp_den","typ_phl","ddp_ctvrt"],[columns]:["ixp_den","typ_phl","ddp_ctvrt","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.CiselnikCtvrti.inheritsFrom(ReadersBase);
Fields.ciselnikCtvrti = (prefabOptions) => { return {data:new Readers.CiselnikCtvrti(),[dropdown]:true,[itemTemplate]:"{ddp_ctvrt} - {nazev}",[helperColumns]:["ddp_ctvrt","nazev"]};};

// GReaderCiselnikRadku.fields.js
Readers.CiselnikRadku = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderCiselnikRadku",keys:["ixp_den","typ_phl","ddp_radek"],[columns]:["ixp_den","typ_phl","ddp_radek","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.CiselnikRadku.inheritsFrom(ReadersBase);
Fields.ciselnikRadku = (prefabOptions) => { return {data:new Readers.CiselnikRadku(),[dropdown]:true,[itemTemplate]:"{ddp_radek} - {nazev}",[helperColumns]:["ddp_radek", "nazev"]};};

// GReaderCisloSazby.fields.js
Readers.CisloSazby = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderCisloSazby",keys:["cis_sazby","typ_phl"],[columns]:["cis_sazby","popis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.CisloSazby.inheritsFrom(ReadersBase);
Fields.cisloSazby = (prefabOptions) => { return {data:new Readers.CisloSazby(),[itemTemplate]:"{cis_sazby} - {popis}",[helperColumns]:["cis_sazby", "popis"]};};

// GReaderDdpBucckps.fields.js
Readers.DdpBucckps = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpBucckps",keys:["kod_popl_sipo"],[columns]:["kod_popl_sipo","kod_popl_sipo_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DdpBucckps.inheritsFrom(ReadersBase);
Fields.ddpBucckps = (prefabOptions) => { return {data:new Readers.DdpBucckps(),[itemTemplate]:"{kod_popl_sipo} - {kod_popl_sipo_txt}",[helperColumns]:["kod_popl_sipo", "kod_popl_sipo_txt"]};};

// GReaderDdpcagv.fields.js
Readers.Ddpcagv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpcagv",keys:["alg_vym"],[columns]:["alg_vym", "alg_vym_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpcagv.inheritsFrom(ReadersBase);
Fields.ddpcagv = (prefabOptions) => { return {data:new Readers.Ddpcagv(),[dropdown]:true,[itemTemplate]:"{alg_vym} - {alg_vym_txt}",[helperColumns]:["alg_vym", "alg_vym_txt"]};};

// GReaderDdpcdvg.fields.js
Readers.Ddpcdvg = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpcdvg",keys:["zp_dvg"],[columns]:["zp_dvg","zp_dvg_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpcdvg.inheritsFrom(ReadersBase);
Fields.ddpcdvg = (prefabOptions) => { return {data:new Readers.Ddpcdvg(),[dropdown]:true,[itemTemplate]:"{zp_dvg} - {zp_dvg_txt}",[helperColumns]:["zp_dvg", "zp_dvg_txt"]};};

// GReaderDdpcpre.fields.js
Readers.Ddpcpre = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpcpre",keys:["stav_pred"],[columns]:["stav_pred","stav_pred_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpcpre.inheritsFrom(ReadersBase);
Fields.ddpcpre = (prefabOptions) => { return {data:new Readers.Ddpcpre(),[dropdown]:true,[itemTemplate]:"{stav_pred} - {stav_pred_txt}",[helperColumns]:["stav_pred", "stav_pred_txt"]};};

// GReaderDdpcpvy.fields.js
Readers.Ddpcpvy = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpcpvy",keys:["priz_vym"],[columns]:["priz_vym", "priz_vym_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpcpvy.inheritsFrom(ReadersBase);
Fields.ddpcpvy = (prefabOptions) => { return {data:new Readers.Ddpcpvy(),[dropdown]:true,[itemTemplate]:"{priz_vym} - {priz_vym_txt}",[helperColumns]:["priz_vym", "priz_vym_txt"]};};

// GReaderDdpcsdu.fields.js
Readers.Ddpcsdu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpcsdu",keys:["typ_sdu"],[columns]:["typ_sdu","typ_sdu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpcsdu.inheritsFrom(ReadersBase);
Fields.ddpcsdu = (prefabOptions) => { return {data:new Readers.Ddpcsdu(),[dropdown]:true,[itemTemplate]:"{typ_sdu} - {typ_sdu_txt}",[helperColumns]:["typ_sdu", "typ_sdu_txt"]};};

// GReaderDdpcsvyd.fields.js
Readers.DdpcsvyDDP = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpcsvyd",keys:["stav_vym"],[columns]:["stav_vym", "stav_vym_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DdpcsvyDDP.inheritsFrom(ReadersBase);
Fields.DdpcsvyDDP = (prefabOptions) => { return {data:new Readers.DdpcsvyDDP(),[dropdown]:true,[itemTemplate]:"{stav_vym} - {stav_vym_txt}",[helperColumns]:["stav_vym", "stav_vym_txt"]};};

// GReaderDdpctgp.fields.js
Readers.Ddpctgp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpctgp",keys:["pri_tgp"],[columns]:["pri_tgp","pri_tgp_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpctgp.inheritsFrom(ReadersBase);
Fields.ddpctgp = (prefabOptions) => { return {data:new Readers.Ddpctgp(),[dropdown]:true,[itemTemplate]:"{pri_tgp} - {pri_tgp_txt}",[helperColumns]:["pri_tgp", "pri_tgp_txt"]};};

// GReaderDdpdsaz.fields.js
Readers.Ddpdsaz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpdsaz",keys:["cis_sazby","typ_phl"],[columns]:["cis_sazby","typ_phl","popis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpdsaz.inheritsFrom(ReadersBase);
Fields.ddpdsaz = (prefabOptions) => { return {data:new Readers.Ddpdsaz(),[itemTemplate]:"{cis_sazby} - {popis}",[helperColumns]:["cis_sazby", "popis", "typ_phl"]};};

// GReaderDdpEkocakt.fields.js
Readers.DdpEkocakt = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpEkocakt",keys:["eko_akt"],[columns]:["eko_akt", "eko_akt_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DdpEkocakt.inheritsFrom(ReadersBase);
Fields.ddpEkocakt = (prefabOptions) => { return {data:new Readers.DdpEkocakt(),[itemTemplate]:"{eko_akt_txt}",[helperColumns]:["eko_akt", "eko_akt_txt"]};};

// GReaderDdpGinsfun.fields.js
Readers.DdpGinsfun = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpGinsfun",keys:["ixs_fun"],[columns]:["ixs_fun", "nazev_rf"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DdpGinsfun.inheritsFrom(ReadersBase);
Fields.ddpGinsfun = (prefabOptions) => { return {data:new Readers.DdpGinsfun(),[itemTemplate]:"{nazev_rf}",[helperColumns]:["ixs_fun", "nazev_rf"]};};

// GReaderDdpGinsref.fields.js
Readers.DdpGinsref = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpGinsref",keys:["ixs_ref"],[columns]:["ixs_ref","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DdpGinsref.inheritsFrom(ReadersBase);
Fields.ddpGinsref = (prefabOptions) => { return {data:new Readers.DdpGinsref(),[dropdown]:true,[itemTemplate]:"{nazev}",[helperColumns]:["ixs_ref", "nazev"]};};

// GReaderDdpIxsRdl.fields.js
Readers.DdpIxsRdl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpIxsRdl",keys:["ixs_rdl","nazev"],[columns]:["ixs_rdl","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DdpIxsRdl.inheritsFrom(ReadersBase);
Fields.ddpIxsRdl = (prefabOptions) => { return {data:new Readers.DdpIxsRdl(),[dropdown]:true,[itemTemplate]:"{nazev}",[helperColumns]:["ixs_rdl", "nazev"]};};

// GReaderDdpKniha.fields.js
Readers.DdpKniha = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpKniha",keys:["ixp_den"],[columns]:["ixp_den", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DdpKniha.inheritsFrom(ReadersBase);
Fields.ddpKniha = (prefabOptions) => { return {data:new Readers.DdpKniha(),[dropdown]:true,[itemTemplate]:"{nazev}",[helperColumns]:["ixp_den"]};};

// GReaderDdpLhuta.fields.js
Readers.DdpLhuta = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpLhuta",keys:["ixs_lhu"],[columns]:["ixs_lhu","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DdpLhuta.inheritsFrom(ReadersBase);
Fields.ddpLhuta = (prefabOptions) => { return {data:new Readers.DdpLhuta(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev", "ixs_lhu"]};};

// GReaderDdpLhuta2.fields.js
Readers.DdpLhuta2 = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpLhuta2",keys:["ixs_lhu"],[columns]:["ixs_lhu", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DdpLhuta2.inheritsFrom(ReadersBase);
Fields.ddpLhuta2 = (prefabOptions) => { return {data:new Readers.DdpLhuta2(),[dropdown]:true,[itemTemplate]:"{nazev}",[helperColumns]:["nazev", "ixs_lhu"]};};

// GReaderDdpsdsa.fields.js
Readers.Ddpsdsa = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpsdsa",keys:["ixs_dsa"],[columns]:["ixs_dsa","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpsdsa.inheritsFrom(ReadersBase);
Fields.ddpsdsa = (prefabOptions) => { return {data:new Readers.Ddpsdsa(),[dropdown]:true,[itemTemplate]:"{nazev}",[helperColumns]:["nazev", "ixs_dsa"]};};

// GReaderDdpsona.fields.js
Readers.Ddpsona = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpsona",keys:["ixs_ona"],[columns]:["ixs_ona","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpsona.inheritsFrom(ReadersBase);
Fields.ddpsona = (prefabOptions) => { return {data:new Readers.Ddpsona(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_ona", "nazev"]};};

// GReaderDdpStavRd.fields.js
Readers.DdpStavRd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpStavRd",keys:["stav_rd"],[columns]:["stav_rd", "stav_rd_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DdpStavRd.inheritsFrom(ReadersBase);
Fields.ddpStavRd = (prefabOptions) => { return {data:new Readers.DdpStavRd(),[dropdown]:true,[itemTemplate]:"{stav_rd_txt}",[helperColumns]:["stav_rd"]};};

// GReaderDdpTypRdl.fields.js
Readers.DdpTypRdl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpTypRdl",keys:["typ_rdl"],[columns]:["typ_rdl","typ_rdl_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DdpTypRdl.inheritsFrom(ReadersBase);
Fields.ddpTypRdl = (prefabOptions) => { return {data:new Readers.DdpTypRdl(),[itemTemplate]:"{typ_rdl_txt}",[helperColumns]:["typ_rdl"]};};

// GReaderDdpUkon.fields.js
Readers.DdpUkon = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpUkon",keys:["typ_uko"],[columns]:["typ_uko_txt","typ_uko"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DdpUkon.inheritsFrom(ReadersBase);
Fields.ddpUkon = (prefabOptions) => { return {data:new Readers.DdpUkon(),[dropdown]:true,[itemTemplate]:"{typ_uko_txt}",[helperColumns]:["typ_uko_txt", "typ_uko"]};};

// GReaderDdpUkon2.fields.js
Readers.DdpUkon2 = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpUkon2",keys:["typ_uko"],[columns]:["typ_uko_txt","typ_uko"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DdpUkon2.inheritsFrom(ReadersBase);
Fields.ddpUkon2 = (prefabOptions) => { return {data:new Readers.DdpUkon2(),[dropdown]:true,[itemTemplate]:"{typ_uko_txt}",[helperColumns]:["typ_uko_txt", "typ_uko"]};};

// GReaderDdpZaokrouhleni.fields.js
Readers.DdpZaokrouhleni = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpZaokrouhleni",keys:["typ_zcg"],[columns]:["typ_zcg_txt", "typ_zcg"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DdpZaokrouhleni.inheritsFrom(ReadersBase);
Fields.ddpZaokrouhleni = (prefabOptions) => { return {data:new Readers.DdpZaokrouhleni(),[dropdown]:true,[itemTemplate]:"{typ_zcg_txt}",[helperColumns]:["typ_zcg_txt", "typ_zcg"]};};

// GReaderDdpZpracovatel.fields.js
Readers.DdpZpracovatel = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpZpracovatel",keys:["ixs_fun","typ_phl"],[columns]:["ixs_fun","nazev_rf"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DdpZpracovatel.inheritsFrom(ReadersBase);
Fields.ddpZpracovatel = (prefabOptions) => { return {data:new Readers.DdpZpracovatel(),[itemTemplate]:"{nazev_rf}",[helperColumns]:["ixs_fun"]};};

// GReaderDoplUdaje.fields.js
Readers.DoplUdaje = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDoplUdaje",keys:["naz_text","text_number","typ_phl"],[columns]:["naz_text","text_number","typ_phl"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DoplUdaje.inheritsFrom(ReadersBase);
Fields.doplUdaje = (prefabOptions) => { return {data:new Readers.DoplUdaje(),[dropdown]:true,[itemTemplate]:"{naz_text}",[helperColumns]:["naz_text", "typ_phl", "text_number"]};};

// GReaderEkosobdAktivni.fields.js
Readers.EkosobdAktivni = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosobdAktivni",keys:["nazev","rok"],[columns]:["nazev", "rok"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.EkosobdAktivni.inheritsFrom(ReadersBase);
Fields.ekosobdAktivni = (prefabOptions) => { return {data:new Readers.EkosobdAktivni(),[dropdown]:true,[itemTemplate]:"{rok} - {nazev}",[helperColumns]:["rok", "nazev"]};};

// GReaderIntervalAktualizace.fields.js
Readers.IntervalAktualizace = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderIntervalAktualizace",keys:["typ_vyp_stav"],[columns]:["typ_vyp_stav","typ_vyp_stav_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.IntervalAktualizace.inheritsFrom(ReadersBase);
Fields.intervalAktualizace = (prefabOptions) => { return {data:new Readers.IntervalAktualizace(),[dropdown]:true,[itemTemplate]:"{typ_vyp_stav_txt}",[helperColumns]:["typ_vyp_stav", "typ_vyp_stav_txt"]};};

// GReaderKniha.fields.js
Readers.Kniha = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderKniha",keys:["ixp_den"],[columns]:["ixp_den", "nazev", "rok"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Kniha.inheritsFrom(ReadersBase);
Fields.kniha = (prefabOptions) => { return {data:new Readers.Kniha(),[dropdown]:true,[itemTemplate]:"{nazev} - {rok}",[helperColumns]:["ixp_den", "nazev"]};};

// GReaderKrokyVymNoveVym.fields.js
Readers.KrokyVymNoveVym = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderKrokyVymNoveVym",keys:["stav_vym"],[columns]:["stav_vym", "stav_vym_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.KrokyVymNoveVym.inheritsFrom(ReadersBase);
Fields.krokyVymNoveVym = (prefabOptions) => { return {data:new Readers.KrokyVymNoveVym(),[dropdown]:true,[itemTemplate]:"{stav_vym} - {stav_vym_txt}",[helperColumns]:["stav_vym", "stav_vym_txt"]};};

// GReaderKtgPhl.fields.js
Readers.KtgPhl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderKtgPhl",keys:["ktg_phl"],[columns]:["ktg_phl"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.KtgPhl.inheritsFrom(ReadersBase);
Fields.ktgPhl = (prefabOptions) => { return {data:new Readers.KtgPhl(),[itemTemplate]:"{ktg_phl} - {ktg_phl_txt}",[helperColumns]:["ktg_phl", "ktg_phl_txt"]};};

// GReaderMajcobj.fields.js
Readers.Majcobj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajcobj",keys:["typ_obj"],[columns]:["typ_obj", "typ_obj_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majcobj.inheritsFrom(ReadersBase);
Fields.majcobj = (prefabOptions) => { return {data:new Readers.Majcobj(),[dropdown]:true,[itemTemplate]:"{typ_obj} - {typ_obj_txt}",[helperColumns]:["typ_obj", "typ_obj_txt"]};};

// GReaderMestskaCast.fields.js
Readers.MestskaCast = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMestskaCast",keys:["mom_kod"],[columns]:["mom_kod","mom_nazev","obec_kod","mop_kod","spr_kod","cas_odpovedi","aktivita","cs_mom_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.MestskaCast.inheritsFrom(ReadersBase);
Fields.mestskaCast = (prefabOptions) => { return {data:new Readers.MestskaCast(),[dropdown]:true,[itemTemplate]:"{mom_kod} - {mom_nazev}",[helperColumns]:["mom_kod", "mom_nazev"]};};

// GReaderNastaveniPredpisuPriRocniUzaverce.fields.js
Readers.NastaveniPredpisuPriRocniUzaverce = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNastaveniPredpisuPriRocniUzaverce",keys:["typ_nap"],[columns]:["typ_nap","typ_nap_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.NastaveniPredpisuPriRocniUzaverce.inheritsFrom(ReadersBase);
Fields.nastaveniPredpisuPriRocniUzaverce = (prefabOptions) => { return {data:new Readers.NastaveniPredpisuPriRocniUzaverce(),[dropdown]:true,[itemTemplate]:"{typ_nap_txt}",[helperColumns]:["typ_nap","typ_nap_txt"]};};

// GReaderNemscob.fields.js
Readers.Nemscob = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemscob",keys:["kod_casti_obce"],[columns]:["kod_casti_obce","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemscob.inheritsFrom(ReadersBase);
Fields.nemscob = (prefabOptions) => { return {data:new Readers.Nemscob(),[dropdown]:true,[itemTemplate]:"{kod_casti_obce} - {nazev}",[helperColumns]:["kod_casti_obce", "nazev"]};};

// GReaderNemskat.fields.js
Readers.Nemskat = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemskat",keys:["kod_kat_uzemi"],[columns]:["kod_kat_uzemi","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemskat.inheritsFrom(ReadersBase);
Fields.nemskat = (prefabOptions) => { return {data:new Readers.Nemskat(),[dropdown]:true,[itemTemplate]:"{kod_kat_uzemi} - {nazev}",[helperColumns]:["kod_kat_uzemi", "nazev"]};};

// GReaderNemskrj.fields.js
Readers.Nemskrj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemskrj",keys:["kod_kraje"],[columns]:["kod_kraje", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemskrj.inheritsFrom(ReadersBase);
Fields.nemskrj = (prefabOptions) => { return {data:new Readers.Nemskrj(),[dropdown]:true,[itemTemplate]:"{kod_kraje} - {nazev}",[helperColumns]:["kod_kraje", "nazev"]};};

// GReaderNemsobc.fields.js
Readers.Nemsobc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemsobc",keys:["kod_obce"],[columns]:["kod_obce","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemsobc.inheritsFrom(ReadersBase);
Fields.nemsobc = (prefabOptions) => { return {data:new Readers.Nemsobc(),[dropdown]:true,[itemTemplate]:"{kod_obce} - {nazev}",[helperColumns]:["kod_obce", "nazev"]};};

// GReaderNemsokr.fields.js
Readers.Nemsokr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemsokr",keys:["kod_okresu"],[columns]:["kod_okresu","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemsokr.inheritsFrom(ReadersBase);
Fields.nemsokr = (prefabOptions) => { return {data:new Readers.Nemsokr(),[dropdown]:true,[itemTemplate]:"{kod_okresu} - {nazev}",[helperColumns]:["kod_okresu", "nazev"]};};

// GReaderNemstbu.fields.js
Readers.Nemstbu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemstbu",keys:["typ_budovy"],[columns]:["typ_budovy","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemstbu.inheritsFrom(ReadersBase);
Fields.nemstbu = (prefabOptions) => { return {data:new Readers.Nemstbu(),[itemTemplate]:"{typ_budovy} - {nazev}",[helperColumns]:["typ_budovy", "nazev"]};};

// GReaderNemstje.fields.js
Readers.Nemstje = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemstje",keys:["typ_jednotky"],[columns]:["typ_jednotky","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemstje.inheritsFrom(ReadersBase);
Fields.nemstje = (prefabOptions) => { return {data:new Readers.Nemstje(),[itemTemplate]:"{typ_jednotky} - {nazev}",[helperColumns]:["typ_jednotky", "nazev"]};};

// GReaderNemszvb.fields.js
Readers.Nemszvb = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemszvb",keys:["zp_vyuz_bud"],[columns]:["zp_vyuz_bud","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemszvb.inheritsFrom(ReadersBase);
Fields.nemszvb = (prefabOptions) => { return {data:new Readers.Nemszvb(),[itemTemplate]:"{zp_vyuz_bud} - {nazev}",[helperColumns]:["zp_vyuz_bud", "nazev"]};};

// GReaderNemszvj.fields.js
Readers.Nemszvj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNemszvj",keys:["zp_vyuz_jed"],[columns]:["zp_vyuz_jed","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Nemszvj.inheritsFrom(ReadersBase);
Fields.nemszvj = (prefabOptions) => { return {data:new Readers.Nemszvj(),[itemTemplate]:"{zp_vyuz_jed} - {nazev}",[helperColumns]:["zp_vyuz_jed", "nazev"]};};

// GReaderOmezenePredpisy.fields.js
Readers.OmezenePredpisy = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderOmezenePredpisy",keys:["ktg_upo"],[columns]:["ktg_upo","ktg_upo_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.OmezenePredpisy.inheritsFrom(ReadersBase);
Fields.omezenePredpisy = (prefabOptions) => { return {data:new Readers.OmezenePredpisy(),[dropdown]:true,[itemTemplate]:"{ktg_upo} - {ktg_upo_txt}",[helperColumns]:["ktg_upo", "ktg_upo_txt"]};};

// GReaderPousden.fields.js
Readers.Pousden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPousden",keys:["ixp_den"],[columns]:["ixp_den","nazev","rok","ico","ucs"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pousden.inheritsFrom(ReadersBase);
Fields.pousden = (prefabOptions) => { return {data:new Readers.Pousden(),[itemTemplate]:"{nazev} | Rok:{rok}, IČO:{ico}, UCS:{ucs}",[helperColumns]:["ixp_den", "nazev"]};};

// GReaderPousste.fields.js
Readers.Pousste = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPousste",keys:["ixs_ste"],[columns]:["ixs_ste","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pousste.inheritsFrom(ReadersBase);
Fields.pousste = (prefabOptions) => { return {data:new Readers.Pousste(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev", "ixs_ste"]};};

// GReaderPredKrokyVymNoveVym.fields.js
Readers.PredKrokyVymNoveVym = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPredKrokyVymNoveVym",keys:["stav_vym"],[columns]:["stav_vym", "stav_vym_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PredKrokyVymNoveVym.inheritsFrom(ReadersBase);
Fields.predKrokyVymNoveVym = (prefabOptions) => { return {data:new Readers.PredKrokyVymNoveVym(),[dropdown]:true,[itemTemplate]:"{stav_vym} - {stav_vym_txt}",[helperColumns]:["stav_vym", "stav_vym_txt"]};};

// GReaderPripadyEsuLk.fields.js
Readers.PripadyEsuLk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPripadyEsuLk",keys:["ixp"],[columns]:["ixp", "vs", "ixs_esu", "esu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PripadyEsuLk.inheritsFrom(ReadersBase);
Fields.pripadyEsuLk = (prefabOptions) => { return {data:new Readers.PripadyEsuLk(),[dropdown]:true,[itemTemplate]:"PID:{ixp}, VS:{vs}, {esu_txt} ",[helperColumns]:["ixp", "vs", "ixs_esu", "esu_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.pripadyEsuLk(),prefabOptions,options)).show()};};
Selectors.pripadyEsuLk = () => { return {data:new Readers.PripadyEsuLk(),[gridOpts]:{
		columnMode: "fit",
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "ixp", caption: "Identifikátor", width: 100, forced: true })			.addTextColumn({ name: "vs", caption: "VS", width: 100 })									.addTextColumn({ name: "ixs_esu", caption: "Identifikátor ESU", width: 100, })				.addTextColumn({ name: "esu_txt", caption: "Poplatník", width: 200 }),[userSettings]:usRoot+"pripadyEsuLk",[isolatedUserSettings]:true};};

// GReaderPriznakParovani.fields.js
Readers.PriznakParovani = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPriznakParovani",keys:["priz_par"],[columns]:["priz_par","priz_par_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PriznakParovani.inheritsFrom(ReadersBase);
Fields.priznakParovani = (prefabOptions) => { return {data:new Readers.PriznakParovani(),[itemTemplate]:"{priz_par_txt}",[helperColumns]:["priz_par", "priz_par_txt"]};};

// GReaderPriznakPrevodu.fields.js
Readers.PriznakPrevodu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPriznakPrevodu",keys:["stav_pr"],[columns]:["stav_pr", "stav_pr_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PriznakPrevodu.inheritsFrom(ReadersBase);
Fields.priznakPrevodu = (prefabOptions) => { return {data:new Readers.PriznakPrevodu(),[dropdown]:true,[itemTemplate]:"{stav_pr_txt}",[helperColumns]:["stav_pr", "stav_pr_txt"]};};

// GReaderPriznakTisku.fields.js
Readers.PriznakTisku = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPriznakTisku",keys:["priz_tisk_dd"],[columns]:["priz_tisk_dd","priz_tisk_dd_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PriznakTisku.inheritsFrom(ReadersBase);
Fields.priznakTisku = (prefabOptions) => { return {data:new Readers.PriznakTisku(),[dropdown]:true,[itemTemplate]:"{priz_tisk_dd_txt}",[helperColumns]:["priz_tisk_dd", "priz_tisk_dd_txt"]};};

// GReaderPriznakVymazuVyrovnanychPoplatniku.fields.js
Readers.PriznakVymazuVyrovnanychPoplatniku = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPriznakVymazuVyrovnanychPoplatniku",keys:["priz_vymaz"],[columns]:["priz_vymaz","priz_vymaz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PriznakVymazuVyrovnanychPoplatniku.inheritsFrom(ReadersBase);
Fields.priznakVymazuVyrovnanychPoplatniku = (prefabOptions) => { return {data:new Readers.PriznakVymazuVyrovnanychPoplatniku(),[dropdown]:true,[itemTemplate]:"{priz_vymaz_txt}",[helperColumns]:["priz_vymaz","priz_vymaz_txt"]};};

// GReaderRezimRezervaceVS.fields.js
Readers.RezimRezervaceVS = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRezimRezervaceVS",keys:["priz_rzv"],[columns]:["priz_rzv","priz_rzv_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.RezimRezervaceVS.inheritsFrom(ReadersBase);
Fields.rezimRezervaceVS = (prefabOptions) => { return {data:new Readers.RezimRezervaceVS(),[dropdown]:true,[itemTemplate]:"{priz_rzv_txt}",[helperColumns]:["priz_rzv", "priz_rzv_txt"]};};

// GReaderRezimVypoctuSalda.fields.js
Readers.RezimVypoctuSalda = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRezimVypoctuSalda",keys:["rez_vyp"],[columns]:["rez_vyp","rez_vyp_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.RezimVypoctuSalda.inheritsFrom(ReadersBase);
Fields.rezimVypoctuSalda = (prefabOptions) => { return {data:new Readers.RezimVypoctuSalda(),[dropdown]:true,[itemTemplate]:"{rez_vyp_txt}",[helperColumns]:["rez_vyp", "rez_vyp_txt"]};};

// GReaderRobcesu.fields.js
Readers.Robcesu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcesu",keys:["typ_zmeny"],[columns]:["typ_zmeny","typ_zmeny_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcesu.inheritsFrom(ReadersBase);
Fields.robcesu = (prefabOptions) => { return {data:new Readers.Robcesu(),[dropdown]:true,[itemTemplate]:"{typ_zmeny} - {typ_zmeny_txt}",[helperColumns]:["typ_zmeny"]};};

// GReaderRobctpo.fields.js
Readers.Robctpo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobctpo",keys:["typ_pobytu"],[columns]:["typ_pobytu","typ_pobytu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robctpo.inheritsFrom(ReadersBase);
Fields.robctpo = (prefabOptions) => { return {data:new Readers.Robctpo(),[dropdown]:true,[itemTemplate]:"{typ_pobytu} - {typ_pobytu_txt}",[helperColumns]:["typ_pobytu"]};};

// GReaderRodneCislo.fields.js
Readers.RodneCislo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRodneCislo",keys:["ixs_esu"],[columns]:["rc", "ixs_esu"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.RodneCislo.inheritsFrom(ReadersBase);
Fields.rodneCislo = (prefabOptions) => { return {data:new Readers.RodneCislo(),[itemTemplate]:"{rc}",[helperColumns]:["ixs_esu"]};};

// GReaderRok.fields.js
Readers.Rok = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRok",keys:["rok"],[columns]:["rok"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rok.inheritsFrom(ReadersBase);
Fields.rok = (prefabOptions) => { return {data:new Readers.Rok(),[dropdown]:true,[itemTemplate]:"{rok}",[helperColumns]:["rok"]};};

// GReaderSkupinaVymahani.fields.js
Readers.SkupinaVymahani = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSkupinaVymahani",keys:["ixs_skv"],[columns]:["ixs_skv","nazev","aktivita","barva"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SkupinaVymahani.inheritsFrom(ReadersBase);
Fields.skupinaVymahani = (prefabOptions) => { return {data:new Readers.SkupinaVymahani(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_skv", "nazev"]};};

// GReaderSkupinaVymahaniDetail.fields.js
Readers.SkupinaVymahaniDetail = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSkupinaVymahaniDetail",keys:["ixs_skv"],[columns]:["ixs_skv","nazev","aktivita","barva","ixp_den"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SkupinaVymahaniDetail.inheritsFrom(ReadersBase);
Fields.skupinaVymahaniDetail = (prefabOptions) => { return {data:new Readers.SkupinaVymahaniDetail(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_skv", "nazev"]};};

// GReaderSkupinaVymahaniNoveVym.fields.js
Readers.SkupinaVymahaniNoveVym = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSkupinaVymahaniNoveVym",keys:["ixs_skv"],[columns]:["ixs_skv", "nazev", "aktivita", "barva"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SkupinaVymahaniNoveVym.inheritsFrom(ReadersBase);
Fields.skupinaVymahaniNoveVym = (prefabOptions) => { return {data:new Readers.SkupinaVymahaniNoveVym(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_skv", "nazev"]};};

// GReaderSpravce.fields.js
Readers.Spravce = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSpravce",keys:["cis_spr"],[columns]:["cis_spr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Spravce.inheritsFrom(ReadersBase);
Fields.spravce = (prefabOptions) => { return {data:new Readers.Spravce(),[itemTemplate]:"{cis_spr} - {nazev}",[helperColumns]:["cis_spr", "nazev"]};};

// GReaderSpravceGrid.fields.js
Readers.SpravceGrid = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSpravceGrid",keys:["cis_spr"],[columns]:["cis_spr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SpravceGrid.inheritsFrom(ReadersBase);
Fields.spravceGrid = (prefabOptions) => { return {data:new Readers.SpravceGrid(),[itemTemplate]:"{cis_spr} - {nazev}",[helperColumns]:["cis_spr", "nazev"]};};

// GReaderStavPohybu.fields.js
Readers.StavPohybu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderStavPohybu",keys:["s_upo"],[columns]:["s_upo", "s_upo_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.StavPohybu.inheritsFrom(ReadersBase);
Fields.stavPohybu = (prefabOptions) => { return {data:new Readers.StavPohybu(),[dropdown]:true,[itemTemplate]:"{s_upo} - {s_upo_txt}",[helperColumns]:["s_upo", "s_upo_txt"]};};

// GReaderStavPorizeni.fields.js
Readers.StavPorizeni = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderStavPorizeni",keys:["stav_por"],[columns]:["stav_por", "stav_por_txt", "typ_phl"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.StavPorizeni.inheritsFrom(ReadersBase);
Fields.stavPorizeni = (prefabOptions) => { return {data:new Readers.StavPorizeni(),[dropdown]:true,[itemTemplate]:"{stav_por} - {stav_por_txt}",[helperColumns]:["stav_por", "stav_por_txt", "typ_phl"]};};

// GReaderStavUzaverky.fields.js
Readers.StavUzaverky = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderStavUzaverky",keys:["stav_uz_pr"],[columns]:["stav_uz_pr", "stav_uz_pr_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.StavUzaverky.inheritsFrom(ReadersBase);
Fields.stavUzaverky = (prefabOptions) => { return {data:new Readers.StavUzaverky(),[dropdown]:true,[itemTemplate]:"{stav_uz_pr_txt}",[helperColumns]:["stav_uz_pr", "stav_uz_pr_txt"]};};

// GReaderStavVymahani.fields.js
Readers.StavVymahani = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderStavVymahani",keys:["stav_vym"],[columns]:["stav_vym","stav_vym_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.StavVymahani.inheritsFrom(ReadersBase);
Fields.stavVymahani = (prefabOptions) => { return {data:new Readers.StavVymahani(),[dropdown]:true,[itemTemplate]:"{stav_vym} - {stav_vym_txt}",[helperColumns]:["stav_vym", "stav_vym_txt"]};};

// GReaderStavVymahaniDetail.fields.js
Readers.StavVymahaniDetail = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderStavVymahaniDetail",keys:["stav_vym"],[columns]:["stav_vym","stav_vym_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.StavVymahaniDetail.inheritsFrom(ReadersBase);
Fields.stavVymahaniDetail = (prefabOptions) => { return {data:new Readers.StavVymahaniDetail(),[itemTemplate]:"{stav_vym} - {stav_vym_txt}",[helperColumns]:["stav_vym", "stav_vym_txt"]};};

// GReaderTypDataVzniku.fields.js
Readers.TypDataVzniku = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderTypDataVzniku",keys:["typ_dat_vz"],[columns]:["typ_dat_vz","typ_dat_vz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.TypDataVzniku.inheritsFrom(ReadersBase);
Fields.typDataVzniku = (prefabOptions) => { return {data:new Readers.TypDataVzniku(),[dropdown]:true,[itemTemplate]:"{typ_dat_vz_txt}",[helperColumns]:["typ_dat_vz", "typ_dat_vz_txt"]};};

// GReaderTypEvidovanychPripadu.fields.js
Readers.TypEvidovanychPripadu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderTypEvidovanychPripadu",keys:["typ_evid"],[columns]:["typ_evid","typ_evid_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.TypEvidovanychPripadu.inheritsFrom(ReadersBase);
Fields.typEvidovanychPripadu = (prefabOptions) => { return {data:new Readers.TypEvidovanychPripadu(),[dropdown]:true,[itemTemplate]:"{typ_evid_txt}",[helperColumns]:["typ_evid","typ_evid_txt"]};};

// GReaderTypKontroly.fields.js
Readers.TypKontroly = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderTypKontroly",keys:["typ_kont"],[columns]:["typ_kont", "typ_kont_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.TypKontroly.inheritsFrom(ReadersBase);
Fields.typKontroly = (prefabOptions) => { return {data:new Readers.TypKontroly(),[dropdown]:true,[itemTemplate]:"{typ_kont_txt}",[helperColumns]:["typ_kont", "typ_kont_txt"]};};

// GReaderTypPhlSimple.fields.js
Readers.TypPhlSimple = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderTypPhlSimple",keys:["typ_phl"],[columns]:["typ_phl","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.TypPhlSimple.inheritsFrom(ReadersBase);
Fields.typPhlSimple = (prefabOptions) => { return {data:new Readers.TypPhlSimple(),[dropdown]:true,[itemTemplate]:"{typ_phl} - {nazev}",[helperColumns]:["typ_phl", "nazev"]};};

// GReaderTypPohledavky.fields.js
Readers.TypPohledavky = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderTypPohledavky",keys:["typ_phl"],[columns]:["typ_phl", "nazev", "pom_rok", "pom_priz_spr", "pom_priz_spr_txt", "pom_spr_dat_uzav"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.TypPohledavky.inheritsFrom(ReadersBase);
Fields.typPohledavky = (prefabOptions) => { return {data:new Readers.TypPohledavky(),[dropdown]:true,[itemTemplate]:"{typ_phl} - {nazev}",[helperColumns]:["typ_phl", "nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.TypPohledavky(),prefabOptions,options)).show()};};
Selectors.TypPohledavky = () => { return {data:new Readers.TypPohledavky(),[gridOpts]:{
		columnMode: "fit", 	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({
			name: "typ_phl",
			field: "typ_phl",
			fragment: "Default",
			caption: "Typ",
			description: "Typ Pohledávky",
			align: "right",
			width: 55,
		})
		.addTextColumn({
			name: "nazev",
			field: "nazev",
			fragment: "Default",
			caption: "Název",
			description: "Název Pohledávky",
			width: 200,
		})
		.addNumberColumn({
			name: "pom_rok",
			field: "pom_rok",
			fragment: "Nastaveni.Extended1",
			caption: "Rok",
			description: "Rok Pohledávky",
			width: 55,
		})
		.addDateColumn({
			name: "pom_dat_uzav",
			field: "pom_dat_uzav",
			fragment: "Nastaveni.Extended1",
			caption: "Dat. uzáv.",
			description: "Datum uzávěrky",
			width: 80,
		})
		.addTextColumn({
			name: "pom_priz_spr_txt",
			field: "pom_priz_spr_txt",
			fragment: "Nastaveni.Extended1",
			caption: "SPR",
			description: "Příznak spravované pohledávky",
			width: 50,
		})
		.addDateColumn({
			name: "pom_spr_dat_uzav",
			field: "pom_spr_dat_uzav",
			fragment: "pomocneProPrevod",
			caption: "Dat. uz. spr.",
			description: "Datum uzávěrky správce",
			width: 80,
		}),[userSettings]:usRoot+"TypPohledavky",[isolatedUserSettings]:true};};

// GReaderUrPri.fields.js
Readers.UrPri = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUrPri",keys:["ur_pri"],[columns]:["ur_pri"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.UrPri.inheritsFrom(ReadersBase);
Fields.urPri = (prefabOptions) => { return {data:new Readers.UrPri(),[dropdown]:true,[itemTemplate]:"{ur_pri}",[helperColumns]:["ur_pri"]};};

// GReaderVazbaSubPrip.fields.js
Readers.VazbaSubPrip = function(options) { ReadersBase.call(this,{[readerClass]:"Gordic.ControlsLogic.Client.GReaderVazbaSubPrip",keys:["typ_svp"],[columns]:["typ_svp", "typ_svp_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.VazbaSubPrip.inheritsFrom(ReadersBase);
Fields.vazbaSubPrip = (prefabOptions) => { return {data:new Readers.VazbaSubPrip(),[dropdown]:true,[itemTemplate]:"{typ_svp_txt}",[helperColumns]:["typ_svp", "typ_svp_txt"]};};

// GReaderWflcvpp.fields.js
Readers.Wflcvpp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcvpp",keys:["typ_vpp"],[columns]:["typ_vpp","typ_vpp_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcvpp.inheritsFrom(ReadersBase);
Fields.wflcvpp = (prefabOptions) => { return {data:new Readers.Wflcvpp(),[dropdown]:true,[itemTemplate]:"{typ_vpp_txt}",[helperColumns]:["typ_vpp"]};};

// GReaderZpusobDohledavaniVazeb.fields.js
Readers.ZpusobDohledavaniVazeb = function(options) { ReadersBase.call(this,{[readerClass]:"Gordic.ControlsLogic.Client.GReaderZpusobDohledavaniVazeb",keys:["typ_zvp"],[columns]:["typ_zvp", "typ_zvp_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.ZpusobDohledavaniVazeb.inheritsFrom(ReadersBase);
Fields.zpusobDohledavaniVazeb = (prefabOptions) => { return {data:new Readers.ZpusobDohledavaniVazeb(),[dropdown]:true,[itemTemplate]:"{typ_zvp_txt}",[helperColumns]:["typ_zvp", "typ_zvp_txt"]};};

// GReaderZpusobVypoctuPenale.fields.js
Readers.ZpusobVypoctuPenale = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderZpusobVypoctuPenale",keys:["zp_uhr"],[columns]:["zp_uhr","zp_uhr_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.ZpusobVypoctuPenale.inheritsFrom(ReadersBase);
Fields.zpusobVypoctuPenale = (prefabOptions) => { return {data:new Readers.ZpusobVypoctuPenale(),[dropdown]:true,[itemTemplate]:"{zp_uhr_txt}",[helperColumns]:["zp_uhr", "zp_uhr_txt"]};};

// GReaderZpusobVypoctuPocatecnichStavu.fields.js
Readers.ZpusobVypoctuPocatecnichStavu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderZpusobVypoctuPocatecnichStavu",keys:["typ_vps"],[columns]:["typ_vps","typ_vps_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.ZpusobVypoctuPocatecnichStavu.inheritsFrom(ReadersBase);
Fields.zpusobVypoctuPocatecnichStavu = (prefabOptions) => { return {data:new Readers.ZpusobVypoctuPocatecnichStavu(),[dropdown]:true,[itemTemplate]:"{typ_vps_txt}",[helperColumns]:["typ_vps","typ_vps_txt"]};};

// GReaderZpusobVypoctuUroku.fields.js
Readers.ZpusobVypoctuUroku = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderZpusobVypoctuUroku",keys:["typ_zvu"],[columns]:["typ_zvu","typ_zvu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.ZpusobVypoctuUroku.inheritsFrom(ReadersBase);
Fields.zpusobVypoctuUroku = (prefabOptions) => { return {data:new Readers.ZpusobVypoctuUroku(),[dropdown]:true,[itemTemplate]:"{typ_zvu_txt}",[helperColumns]:["typ_zvu_txt","typ_zvu"]};};

// Gordic.Ddp.Client.GNReaderDdpdsaz.fields.js
Readers.GNReaderDdpdsaz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GNReaderDdpdsaz",keys:["cis_sazby"],[columns]:["typ_phl", "cis_sazby", "sazba", "pocet", "poc_splatek", "c_celk", "popis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GNReaderDdpdsaz.inheritsFrom(ReadersBase);
Fields.gNReaderDdpdsaz = (prefabOptions) => { return {data:new Readers.GNReaderDdpdsaz(),[itemTemplate]:"{cis_sazby} - {popis}",[helperColumns]:["cis_sazby", "popis"]};};

// Gordic.Ddp.Client.GNReaderDdpsctv.fields.js
Readers.GNReaderDdpsctv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GNReaderDdpsctv",keys:["ixp_den","typ_phl","ddp_ctvrt"],[columns]:["ixp_den", "typ_phl", "ddp_ctvrt", "nazev", "poznamka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GNReaderDdpsctv.inheritsFrom(ReadersBase);
Fields.gNReaderDdpsctv = (prefabOptions) => { return {data:new Readers.GNReaderDdpsctv(),[itemTemplate]:"{nazev}",[helperColumns]:["ddp_ctvrt", "nazev"]};};

// Gordic.Ddp.Client.GNReaderDdpsrad.fields.js
Readers.GNReaderDdpsrad = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GNReaderDdpsrad",keys:["ixp_den","typ_phl","ddp_radek"],[columns]:["ixp_den", "typ_phl", "ddp_radek", "nazev", "poznamka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GNReaderDdpsrad.inheritsFrom(ReadersBase);
Fields.gNReaderDdpsrad = (prefabOptions) => { return {data:new Readers.GNReaderDdpsrad(),[itemTemplate]:"{nazev}",[helperColumns]:["ddp_radek", "nazev"]};};

// Gordic.Ddp.Client.GReaderNEkosobd.fields.js
Readers.NEkosobd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNEkosobd",keys:["rok"],[columns]:["rok", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.NEkosobd.inheritsFrom(ReadersBase);
Fields.nEkosobd = (prefabOptions) => { return {data:new Readers.NEkosobd(),[itemTemplate]:"{nazev}",[helperColumns]:["rok", "nazev"],[dropdown]:true};};

})(jQuery);

"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Fuc.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const cached = "cached"; const selector = "selector"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const dropdown = "dropdown"; const helperItemTemplate = "helperItemTemplate"; const graphicInput = "graphicInput";

// Gordic.Fuc.Client.GReaderBuccbvyZL.fields.js
Readers.BuccbvyZL = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBuccbvyZL",keys:["s_bvy"],[columns]:["s_bvy","s_bvy_zl_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.BuccbvyZL.inheritsFrom(ReadersBase);
Fields.buccbvyZL = (prefabOptions) => { return {data:new Readers.BuccbvyZL(),[itemTemplate]:"{s_bvy_zl_txt}",[helperColumns]:["s_bvy_zl_txt"]};};

// Gordic.Fuc.Client.GReaderBucspid.fields.js
Readers.Bucspid = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBucspid",keys:["ixp"],[columns]:["ixp","bu_vl","sk_vl","cis_pid","dat_nov_zus","rok_pid"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Bucspid.inheritsFrom(ReadersBase);
Fields.bucspid = (prefabOptions) => { return {data:new Readers.Bucspid(),[itemTemplate]:function (row) { return "jres:24100092".format(row.bu_vl, row.sk_vl, row.rok_pid, row.cis_pid, Gordic.Templates.Formatters.datetime(row.dat_nov_zus, "d. M. yyyy")); },[helperColumns]:["bu_vl", "sk_vl", "cis_pid", "rok_pid", "dat_nov_zus"],[selector]:(options) => newDefaultSelector($.extend(Selectors.bucspid(),prefabOptions,options)).show()};};
Selectors.bucspid = () => { return {data:new Readers.Bucspid(),[userSettings]:usRoot+"bucspid",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["bu_vl", "sk_vl", "cis_pid", "rok_pid", "dat_nov_zus"]},[gridFormat]:newGridFormat().addTextColumn({name: "bu_vl", caption: "jres:24100101", width: 120, forced: true}).addTextColumn({name: "sk_vl", caption: "jres:24100102", width: 60}).addNumberColumn({name: "rok_pid", caption: "jres:24100103", width: 60}).addNumberColumn({name: "cis_pid", caption: "jres:24100104", width: 60}).addDateColumn({name: "dat_nov_zus", caption: "jres:24100105", width: 100})};};

// Gordic.Fuc.Client.GReaderEkoaden.fields.js
Readers.Ekoaden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoaden",keys:["ixp_den"],[columns]:["ixp_den","nazev","typ_ag","zkr_ag"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Ekoaden.inheritsFrom(ReadersBase);
Fields.ekoaden = (prefabOptions) => { return {data:new Readers.Ekoaden(),[itemTemplate]:"[{zkr_ag}] {nazev}",[helperColumns]:["nazev"]};};

// Gordic.Fuc.Client.GReaderEkoakon.fields.js
Readers.Ekoakon = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoakon",keys:["ixs_kon"],[columns]:["ixs_kon","kod","nazev","typ_ag","zkr_ag"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Ekoakon.inheritsFrom(ReadersBase);
Fields.ekoakon = (prefabOptions) => { return {data:new Readers.Ekoakon(),[itemTemplate]:"[{zkr_ag}] {kod} - {nazev}",[helperColumns]:["kod","nazev"]};};

// Gordic.Fuc.Client.GReaderEkocsuh.fields.js
Readers.Ekocsuh = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocsuh",keys:["s_uhr"],[columns]:["s_uhr","s_uhr_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekocsuh.inheritsFrom(ReadersBase);
Fields.ekocsuh = (prefabOptions) => { return {data:new Readers.Ekocsuh(),[dropdown]:true,[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// Gordic.Fuc.Client.GReaderFuccdpo.fields.js
Readers.Fuccdpo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFuccdpo",keys:["druh_poh"],[columns]:["druh_poh","druh_poh_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fuccdpo.inheritsFrom(ReadersBase);
Fields.fuccdpo = (prefabOptions) => { return {data:new Readers.Fuccdpo(),[dropdown]:true,[itemTemplate]:"{druh_poh_txt}",[helperColumns]:["druh_poh_txt"]};};

// Gordic.Fuc.Client.GReaderFuccdup.fields.js
Readers.Fuccdup = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFuccdup",keys:["druh_upo"],[columns]:["druh_upo","druh_upo_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fuccdup.inheritsFrom(ReadersBase);
Fields.fuccdup = (prefabOptions) => { return {data:new Readers.Fuccdup(),[dropdown]:true,[itemTemplate]:"{druh_upo_txt}",[helperColumns]:["druh_upo_txt"]};};

// Gordic.Fuc.Client.GReaderFucckup.fields.js
Readers.Fucckup = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFucckup",keys:["uct_poh"],[columns]:["uct_poh","uct_poh_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fucckup.inheritsFrom(ReadersBase);
Fields.fucckup = (prefabOptions) => { return {data:new Readers.Fucckup(),[dropdown]:true,[itemTemplate]:"{uct_poh_txt}",[helperColumns]:["uct_poh_txt"]};};

// Gordic.Fuc.Client.GReaderFuccpod.fields.js
Readers.Fuccpod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFuccpod",keys:["priz_odl"],[columns]:["priz_odl","priz_odl_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fuccpod.inheritsFrom(ReadersBase);
Fields.fuccpod = (prefabOptions) => { return {data:new Readers.Fuccpod(),[dropdown]:true,[itemTemplate]:"{priz_odl_txt}",[helperColumns]:["priz_odl_txt"]};};

// Gordic.Fuc.Client.GReaderFuccsmp.fields.js
Readers.Fuccsmp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFuccsmp",keys:["stav_mp"],[columns]:["stav_mp","stav_mp_txt","stav_mp_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fuccsmp.inheritsFrom(ReadersBase);
Fields.fuccsmp = (prefabOptions) => { return {data:new Readers.Fuccsmp(),[dropdown]:true,[itemTemplate]:"{stav_mp_txt}",[helperColumns]:["stav_mp_txt"]};};

// Gordic.Fuc.Client.GReaderFuccsod.fields.js
Readers.Fuccsod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFuccsod",keys:["s_ode"],[columns]:["s_ode","s_ode_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fuccsod.inheritsFrom(ReadersBase);
Fields.fuccsod = (prefabOptions) => { return {data:new Readers.Fuccsod(),[dropdown]:true,[itemTemplate]:"{s_ode_txt}",[helperColumns]:["s_ode_txt"]};};

// Gordic.Fuc.Client.GReaderFuccspa.fields.js
Readers.Fuccspa = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFuccspa",keys:["s_par"],[columns]:["s_par","s_par_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fuccspa.inheritsFrom(ReadersBase);
Fields.fuccspa = (prefabOptions) => { return {data:new Readers.Fuccspa(),[dropdown]:true,[itemTemplate]:"{s_par_txt}",[helperColumns]:["s_par_txt"]};};

// Gordic.Fuc.Client.GReaderFuccspr.fields.js
Readers.Fuccspr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFuccspr",keys:["s_prip"],[columns]:["s_prip","s_prip_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fuccspr.inheritsFrom(ReadersBase);
Fields.fuccspr = (prefabOptions) => { return {data:new Readers.Fuccspr(),[dropdown]:true,[itemTemplate]:"{s_prip_txt}",[helperColumns]:["s_prip_txt"]};};

// Gordic.Fuc.Client.GReaderFuccsso.fields.js
Readers.Fuccsso = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFuccsso",keys:["s_soup"],[columns]:["s_soup","s_soup_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fuccsso.inheritsFrom(ReadersBase);
Fields.fuccsso = (prefabOptions) => { return {data:new Readers.Fuccsso(),[dropdown]:true,[itemTemplate]:"{s_soup_txt}",[helperColumns]:["s_soup_txt"]};};

// Gordic.Fuc.Client.GReaderFuccsuc.fields.js
Readers.Fuccsuc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFuccsuc",keys:["stav_uctovani"],[columns]:["stav_uctovani","stav_uctovani_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fuccsuc.inheritsFrom(ReadersBase);
Fields.fuccsuc = (prefabOptions) => { return {data:new Readers.Fuccsuc(),[dropdown]:true,[itemTemplate]:"{stav_uctovani_txt}",[helperColumns]:["stav_uctovani_txt"]};};

// Gordic.Fuc.Client.GReaderFuccsuo.fields.js
Readers.Fuccsuo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFuccsuo",keys:["s_upo"],[columns]:["s_upo","s_upo_ur_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fuccsuo.inheritsFrom(ReadersBase);
Fields.fuccsuo = (prefabOptions) => { return {data:new Readers.Fuccsuo(),[dropdown]:true,[itemTemplate]:"{s_upo_ur_txt}",[helperColumns]:["s_upo_ur_txt"]};};

// Gordic.Fuc.Client.GReaderFuccsuoR.fields.js
Readers.FuccsuoR = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFuccsuoR",keys:["s_upo"],[columns]:["s_upo","s_upo_rez_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.FuccsuoR.inheritsFrom(ReadersBase);
Fields.fuccsuoR = (prefabOptions) => { return {data:new Readers.FuccsuoR(),[dropdown]:true,[itemTemplate]:"{s_upo_rez_txt}",[helperColumns]:["s_upo_rez_txt"]};};

// Gordic.Fuc.Client.GReaderFuccsuoU.fields.js
Readers.FuccsuoU = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFuccsuoU",keys:["s_upo"],[columns]:["s_upo","s_upo_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.FuccsuoU.inheritsFrom(ReadersBase);
Fields.fuccsuoU = (prefabOptions) => { return {data:new Readers.FuccsuoU(),[dropdown]:true,[itemTemplate]:"{s_upo_txt}",[helperColumns]:["s_upo_txt"]};};

// Gordic.Fuc.Client.GReaderFuccsup.fields.js
Readers.Fuccsup = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFuccsup",keys:["s_upr"],[columns]:["s_upr","s_upr_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fuccsup.inheritsFrom(ReadersBase);
Fields.fuccsup = (prefabOptions) => { return {data:new Readers.Fuccsup(),[dropdown]:true,[itemTemplate]:"{s_upr_txt}",[helperColumns]:["s_upr_txt"]};};

// Gordic.Fuc.Client.GReaderFucctuf.fields.js
Readers.Fucctuf = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFucctuf",keys:["typ_uct_fuc"],[columns]:["typ_uct_fuc","typ_uct_fuc_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fucctuf.inheritsFrom(ReadersBase);
Fields.fucctuf = (prefabOptions) => { return {data:new Readers.Fucctuf(),[dropdown]:true,[itemTemplate]:"{typ_uct_fuc_txt}",[helperColumns]:["typ_uct_fuc_txt"]};};

// Gordic.Fuc.Client.GReaderFucspid.fields.js
Readers.Fucspid = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFucspid",keys:["ixp"],[columns]:["ixp","ac_ag","ac","typ_ag","popis","rok","s_soup"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Fucspid.inheritsFrom(ReadersBase);
Fields.fucspid = (prefabOptions) => { return {data:new Readers.Fucspid(),[itemTemplate]:function (row) { return "jres:24100099".format(row.ixp, row.ac_ag, row.ac, row.popis); },[helperColumns]:["ixp", "ac_ag", "ac", "typ_ag", "popis"],[helperItemTemplate]:function (row) { return "jres:24100100".format(row.ixp, row.ac_ag, row.ac, row.popis); },[graphicInput]:"oninput",[selector]:(options) => newDefaultSelector($.extend(Selectors.fucspid(),prefabOptions,options)).show()};};
Selectors.fucspid = () => { return {data:new Readers.Fucspid(),[userSettings]:usRoot+"fucspid",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixp", "ac_ag", "ac", "typ_ag", "popis"]},[gridFormat]:newGridFormat().add({name: "ixp", caption: "jres:24100095", width: 110, forced: true}).addTextColumn({name: "ac_ag", caption: "jres:24100097", width: 120}).addTextColumn({name: "ac", caption: "jres:24100096", width: 120}).addTextColumn({name: "popis", caption: "jres:24100098", width: 200})};};

// Gordic.Fuc.Client.GReaderIdIissp.fields.js
Readers.IdIissp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderIdIissp",keys:["id_hdr_ris","radek_hdr"],[columns]:["id_hdr_ris","radek_hdr"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.IdIissp.inheritsFrom(ReadersBase);
Fields.idIissp = (prefabOptions) => { return {data:new Readers.IdIissp(),[itemTemplate]:"{id_hdr_ris}, {radek_hdr}",[helperColumns]:["id_hdr_ris","radek_hdr"]};};

// Gordic.Fuc.Client.GReaderIntsdav.fields.js
Readers.Intsdav = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderIntsdav",keys:["ixs_dav"],[columns]:["ixs_dav","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Intsdav.inheritsFrom(ReadersBase);
Fields.intsdav = (prefabOptions) => { return {data:new Readers.Intsdav(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev", "ixs_dav"]};};

// Gordic.Fuc.Client.GReaderIntsroz.fields.js
Readers.Intsroz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderIntsroz",keys:["ixp_exs"],[columns]:["ixp_exs","nazev","aktivita","ixs_ext","ixs_ext_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Intsroz.inheritsFrom(ReadersBase);
Fields.intsroz = (prefabOptions) => { return {data:new Readers.Intsroz(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev", "ixp_exs", "ixs_ext", "ixs_ext_txt"]};};

// Gordic.Fuc.Client.GReaderPrizDdPoh.fields.js
Readers.PrizDdPoh = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPrizDdPoh",keys:["priz_dd"],[columns]:["priz_dd","priz_dd_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PrizDdPoh.inheritsFrom(ReadersBase);
Fields.prizDdPoh = (prefabOptions) => { return {data:new Readers.PrizDdPoh(),[dropdown]:true,[itemTemplate]:"{priz_dd_txt}",[helperColumns]:["priz_dd_txt"]};};

// Gordic.Fuc.Client.GReaderTypPolZL.fields.js
Readers.TypPolZL = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderTypPolZL",keys:["typ_pol"],[columns]:["typ_pol", "typ_pol_txt", "ktg_typ"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.TypPolZL.inheritsFrom(ReadersBase);
Fields.typPolZL = (prefabOptions) => { return {data:new Readers.TypPolZL(),[dropdown]:true,[itemTemplate]:"{typ_pol_txt}",[helperColumns]:["typ_pol_txt"]};};

})(jQuery);

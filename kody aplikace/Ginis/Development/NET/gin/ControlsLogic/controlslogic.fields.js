"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.ControlsLogic.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const helperItemTemplate = "helperItemTemplate"; const itemTooltipTemplate = "itemTooltipTemplate"; const selector = "selector"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const dropdown = "dropdown"; const cached = "cached"; const helperLimit = "helperLimit"; const subTaskOpts = "subTaskOpts"; const graphicInput = "graphicInput"; const verticalButtons = "verticalButtons"; const states = "states"; const serverFilters = "serverFilters"; const clientFilterEvaluator = "clientFilterEvaluator"; const menuBar = "menuBar"; const filterMinLength = "filterMinLength"; const doNotSearch = "doNotSearch"; const modifyGridOptions = "modifyGridOptions"; const filterPanelOpts = "filterPanelOpts"; const change = "change"; const validators = "validators"; const hasFavorite = "hasFavorite";

// GReaderGincaku.fields.js
Readers.Gincaku = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincaku",keys:["typ_aku"],[columns]:["typ_aku","typ_aku_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincaku.inheritsFrom(ReadersBase);
Fields.gincaku = (prefabOptions) => { return {data:new Readers.Gincaku(),[itemTemplate]:"{typ_aku:trim:encode}",[helperColumns]:["typ_aku", "typ_aku_txt"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.typ_aku, row.typ_aku_txt, "fb"); },[itemTooltipTemplate]:"{typ_aku:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincaku(),prefabOptions,options)).show()};};
Selectors.gincaku = () => { return {data:new Readers.Gincaku(),[userSettings]:usRoot+"gincaku",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_aku", "typ_aku_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_aku", caption: "jres:31850096", width: 100, forced: true}).addTextColumn({name: "typ_aku_txt", caption: "jres:31850097", width: 150})};};

// GReaderGincavo.fields.js
Readers.Gincavo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincavo",keys:["id_avo"],[columns]:["id_avo","id_avo_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincavo.inheritsFrom(ReadersBase);
Fields.gincavo = (prefabOptions) => { return {data:new Readers.Gincavo(),[dropdown]:true,[itemTemplate]:"{id_avo_txt:trim:encode}",[helperColumns]:["id_avo_txt"],[itemTooltipTemplate]:"{id_avo_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincavo(),prefabOptions,options)).show()};};
Selectors.gincavo = () => { return {data:new Readers.Gincavo(),[userSettings]:usRoot+"gincavo",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["id_avo_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "id_avo_txt", caption: "jres:31850194", width: 100, forced: true})};};

// GReaderGincdtp.fields.js
Readers.Gincdtp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincdtp",keys:["dat_typ"],[columns]:["dat_typ", "dat_typ_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincdtp.inheritsFrom(ReadersBase);
Fields.gincdtp = (prefabOptions) => { return {data:new Readers.Gincdtp(),[dropdown]:true,[itemTemplate]:"{dat_typ_txt:trim:encode}",[helperColumns]:["dat_typ_txt"],[itemTooltipTemplate]:"{dat_typ_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincdtp(),prefabOptions,options)).show()};};
Selectors.gincdtp = () => { return {data:new Readers.Gincdtp(),[userSettings]:usRoot+"gincdtp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["dat_typ_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "dat_typ_txt", caption: "jres:31850040", width: 100, forced: true})};};

// GReaderGinckon.fields.js
Readers.Ginckon = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinckon",keys:["typ_koch"],[columns]:["typ_koch","typ_koch_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginckon.inheritsFrom(ReadersBase);
Fields.ginckon = (prefabOptions) => { return {data:new Readers.Ginckon(),[itemTemplate]:"{typ_koch_txt:trim:encode}",[helperColumns]:["typ_koch", "typ_koch_txt"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.typ_koch, row.typ_koch_txt, "sb"); },[itemTooltipTemplate]:"{typ_koch_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginckon(),prefabOptions,options)).show()};};
Selectors.ginckon = () => { return {data:new Readers.Ginckon(),[userSettings]:usRoot+"ginckon",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_koch", "typ_koch_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_koch_txt", caption: "jres:31850098", width: 200, forced: true}).addNumberColumn({name: "typ_koch", caption: "jres:31850099", width: 20})};};

// GReaderGincktu.fields.js
Readers.Gincktu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincktu",keys:["ktg_uda"],[columns]:["ktg_uda", "ktg_uda_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincktu.inheritsFrom(ReadersBase);
Fields.gincktu = (prefabOptions) => { return {data:new Readers.Gincktu(),[dropdown]:true,[itemTemplate]:"{ktg_uda_txt:trim:encode}",[helperColumns]:["ktg_uda_txt"],[itemTooltipTemplate]:"{ktg_uda_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincktu(),prefabOptions,options)).show()};};
Selectors.gincktu = () => { return {data:new Readers.Gincktu(),[userSettings]:usRoot+"gincktu",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ktg_uda_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "ktg_uda_txt", caption: "jres:31850197", width: 100, forced: true})};};

// GReaderGincppa.fields.js
Readers.Gincppa = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincppa",keys:["id_ppa"],[columns]:["id_ppa", "id_ppa_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincppa.inheritsFrom(ReadersBase);
Fields.gincppa = (prefabOptions) => { return {data:new Readers.Gincppa(),[dropdown]:true,[itemTemplate]:"{id_ppa_txt:trim:encode}",[helperColumns]:["id_ppa_txt"],[itemTooltipTemplate]:"{id_ppa_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincppa(),prefabOptions,options)).show()};};
Selectors.gincppa = () => { return {data:new Readers.Gincppa(),[userSettings]:usRoot+"gincppa",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["id_ppa_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "id_ppa_txt", caption: "jres:31850199", width: 100, forced: true})};};

// GReaderGincprp.fields.js
Readers.Gincprp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincprp",keys:["priz_pov"],[columns]:["priz_pov", "priz_pov_txt"],[rowSize]:50,[readAll]:false,[permanent]:false}, options); };
Readers.Gincprp.inheritsFrom(ReadersBase);
Fields.gincprp = (prefabOptions) => { return {data:new Readers.Gincprp(),[dropdown]:true,[itemTemplate]:"{priz_pov_txt:trim:encode}",[helperColumns]:["priz_pov_txt"],[itemTooltipTemplate]:"{priz_pov_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincprp(),prefabOptions,options)).show()};};
Selectors.gincprp = () => { return {data:new Readers.Gincprp(),[userSettings]:usRoot+"gincprp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_pov_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "priz_pov_txt", caption: "jres:31850200", width: 100, forced: true})};};

// GReaderGincpru.fields.js
Readers.Gincpru = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincpru",keys:["priorita_uda"],[columns]:["priorita_uda", "priorita_uda_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincpru.inheritsFrom(ReadersBase);
Fields.gincpru = (prefabOptions) => { return {data:new Readers.Gincpru(),[dropdown]:true,[itemTemplate]:"{priorita_uda_txt:trim:encode}",[helperColumns]:["priorita_uda_txt"],[itemTooltipTemplate]:"{priorita_uda_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincpru(),prefabOptions,options)).show()};};
Selectors.gincpru = () => { return {data:new Readers.Gincpru(),[userSettings]:usRoot+"gincpru",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priorita_uda_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "priorita_uda_txt", caption: "jres:31850201", width: 100, forced: true})};};

// GReaderGincsud.fields.js
Readers.Gincsud = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincsud",keys:["stav_uda"],[columns]:["stav_uda", "stav_uda_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincsud.inheritsFrom(ReadersBase);
Fields.gincsud = (prefabOptions) => { return {data:new Readers.Gincsud(),[dropdown]:true,[itemTemplate]:"{stav_uda_txt:trim:encode}",[helperColumns]:["stav_uda_txt"],[itemTooltipTemplate]:"{stav_uda_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincsud(),prefabOptions,options)).show()};};
Selectors.gincsud = () => { return {data:new Readers.Gincsud(),[userSettings]:usRoot+"gincsud",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stav_uda_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "stav_uda_txt", caption: "jres:31850206", width: 100, forced: true})};};

// GReaderGincuda.fields.js
Readers.Gincuda = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincuda",keys:["id_uda"],[columns]:["id_uda","id_uda_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincuda.inheritsFrom(ReadersBase);
Fields.gincuda = (prefabOptions) => { return {data:new Readers.Gincuda(),[itemTemplate]:"{id_uda:trim:encode}",[helperColumns]:["id_uda", "id_uda_txt"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.id_uda, row.id_uda_txt, "fb"); },[itemTooltipTemplate]:"{id_uda:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincuda(),prefabOptions,options)).show()};};
Selectors.gincuda = () => { return {data:new Readers.Gincuda(),[userSettings]:usRoot+"gincuda",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["id_uda", "id_uda_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "id_uda", caption: "jres:31850144", width: 100, forced: true}).addTextColumn({name: "id_uda_txt", caption: "jres:31850145", width: 150})};};

// GReaderAgpscam.fields.js
Readers.Agpscam = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAgpscam",keys:["cis_cam"],[columns]:["cis_cam","cis_cam_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Agpscam.inheritsFrom(ReadersBase);
Fields.agpscam = (prefabOptions) => { return {data:new Readers.Agpscam(),[itemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.cis_cam, row.cis_cam_txt);},[helperColumns]:["cis_cam", "cis_cam_txt"],[itemTooltipTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.cis_cam, row.cis_cam_txt); },[selector]:(options) => newDefaultSelector($.extend(Selectors.agpscam(),prefabOptions,options)).show()};};
Selectors.agpscam = () => { return {data:new Readers.Agpscam(),[userSettings]:usRoot+"agpscam",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["cis_cam", "cis_cam_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "cis_cam_txt", caption: "jres:31850089", width: 120, forced: true}).addNumberColumn({name: "cis_cam", caption: "jres:31850090", width: 30})};};

// GReaderAgpscka.fields.js
Readers.Agpscka = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAgpscka",keys:["cis_katastr"],[columns]:["cis_katastr","cis_katastr_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Agpscka.inheritsFrom(ReadersBase);
Fields.agpscka = (prefabOptions) => { return {data:new Readers.Agpscka(),[itemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.cis_katastr, row.cis_katastr_txt);},[helperColumns]:["cis_katastr", "cis_katastr_txt"],[itemTooltipTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.cis_katastr, row.cis_katastr_txt); },[selector]:(options) => newDefaultSelector($.extend(Selectors.agpscka(),prefabOptions,options)).show()};};
Selectors.agpscka = () => { return {data:new Readers.Agpscka(),[userSettings]:usRoot+"agpscka",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["cis_katastr", "cis_katastr_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "cis_katastr_txt", caption: "jres:31850089", width: 120, forced: true}).addNumberColumn({name: "cis_katastr", caption: "jres:31850090", width: 30})};};

// GReaderAgpsmca.fields.js
Readers.Agpsmca = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAgpsmca",keys:["cis_mc"],[columns]:["cis_mc","cis_mc_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Agpsmca.inheritsFrom(ReadersBase);
Fields.agpsmca = (prefabOptions) => { return {data:new Readers.Agpsmca(),[itemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.cis_mc, row.cis_mc_txt);},[helperColumns]:["cis_mc", "cis_mc_txt"],[itemTooltipTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.cis_mc, row.cis_mc_txt); },[selector]:(options) => newDefaultSelector($.extend(Selectors.agpsmca(),prefabOptions,options)).show()};};
Selectors.agpsmca = () => { return {data:new Readers.Agpsmca(),[userSettings]:usRoot+"agpsmca",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["cis_mc", "cis_mc_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "cis_mc", caption: "jres:31850091", width: 30, forced: true}).addTextColumn({name: "cis_mc_txt", caption: "jres:31850092", width: 120})};};

// GReaderBarctyk.fields.js
Readers.Barctyk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBarctyk",keys:["typ_komp"],[columns]:["typ_komp", "typ_komp_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Barctyk.inheritsFrom(ReadersBase);
Fields.barctyk = (prefabOptions) => { return {data:new Readers.Barctyk(),[dropdown]:true,[itemTemplate]:"{typ_komp_txt:trim:encode}",[helperColumns]:["typ_komp_txt"],[itemTooltipTemplate]:"{typ_komp_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.barctyk(),prefabOptions,options)).show()};};
Selectors.barctyk = () => { return {data:new Readers.Barctyk(),[userSettings]:usRoot+"barctyk",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_komp_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_komp_txt", caption: "jres:31850183", width: 100, forced: true})};};

// GReaderBarsver.fields.js
Readers.Barsver = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBarsver",keys:["ico","rok","komp_dec","verze_c","verze_k"],[columns]:["verze_k", "popis", "priz_sehr_txt", "ico", "rok", "komp_dec", "verze_c"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Barsver.inheritsFrom(ReadersBase);
Fields.barsver = (prefabOptions) => { return {data:new Readers.Barsver(),[itemTemplate]:"{verze_k}",[helperColumns]:["priz_sehr_txt","verze_k", "popis" ],[helperItemTemplate]:function (row) {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850037": row.priz_sehr_txt, "jres:31850015": row.popis });
        return FieldFunction.getInfoStr({ "info": row.verze_k, "more": moreInfo });
    },[itemTooltipTemplate]:"{verze_k}",[selector]:(options) => newDefaultSelector($.extend(Selectors.barsver(),prefabOptions,options)).show()};};
Selectors.barsver = () => { return {data:new Readers.Barsver(),[userSettings]:usRoot+"barsver",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_sehr_txt","verze_k", "popis" ]},[gridFormat]:newGridFormat().addNumberColumn({name: "verze_k", caption: "jres:31850151", width: 50, forced: true}).addTextColumn({name: "priz_sehr_txt", caption: "jres:31850037", width: 50}).addTextColumn({name: "popis", caption: "jres:31850015", width: 200})};};

// GReaderBlrsver.fields.js
Readers.Blrsver = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBlrsver",keys:["ico","rok","komp_dec","verze_c","verze_k"],[columns]:["ico", "rok", "komp_dec", "verze_c", "verze_k", "popis", "priz_sehr_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Blrsver.inheritsFrom(ReadersBase);
Fields.blrsver = (prefabOptions) => { return {data:new Readers.Blrsver(),[itemTemplate]:"{verze_k}",[helperColumns]:["verze_k", "popis", "priz_sehr_txt"],[helperItemTemplate]:function (row) {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850037": row.priz_sehr_txt, "jres:31850015": row.popis });
        return FieldFunction.getInfoStr({ "info": row.verze_k, "more": moreInfo });      
    },[itemTooltipTemplate]:"{verze_k}",[selector]:(options) => newDefaultSelector($.extend(Selectors.blrsver(),prefabOptions,options)).show()};};
Selectors.blrsver = () => { return {data:new Readers.Blrsver(),[userSettings]:usRoot+"blrsver",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["verze_k", "popis", "priz_sehr_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "verze_k", caption: "jres:31850151", width: 50, forced: true}).addTextColumn({name: "priz_sehr_txt", caption: "jres:31850037", width: 50}).addTextColumn({name: "popis", caption: "jres:31850015", width: 200})};};

// GReaderBplsste.fields.js
Readers.Bplsste = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBplsste",keys:["ixs_ste"],[columns]:["ixs_ste", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Bplsste.inheritsFrom(ReadersBase);
Fields.bplsste = (TypAg,prefabOptions) => { return {data:new Readers.Bplsste({ readerParams: { TypAg: TypAg } }),[dropdown]:true,[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.bplsste(TypAg),prefabOptions,options)).show()};};
Selectors.bplsste = (TypAg) => { return {data:new Readers.Bplsste({ readerParams: { TypAg: TypAg } }),[userSettings]:usRoot+"bplsste",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]}};};

// GReaderBuccdpd.fields.js
Readers.Buccdpd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBucdpd",keys:["s_dpb"],[columns]:["s_dpb", "s_dpb_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Buccdpd.inheritsFrom(ReadersBase);
Fields.buccdpd = (prefabOptions) => { return {data:new Readers.Buccdpd(),[dropdown]:true,[itemTemplate]:"{s_dpb_txt}",[helperColumns]:["s_dpb_txt"]};};

// GReaderBuccpne.fields.js
Readers.Buccpne = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBuccpne",keys:["priz_nepar"],[columns]:["priz_nepar","priz_nepar_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Buccpne.inheritsFrom(ReadersBase);
Fields.buccpne = (prefabOptions) => { return {data:new Readers.Buccpne(),[dropdown]:true,[itemTemplate]:"{priz_nepar_txt}",[helperColumns]:["priz_nepar_txt"]};};

// GReaderBuccspo.fields.js
Readers.Buccspo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBuccspo",keys:["s_pol"],[columns]:["s_pol", "s_pol_txt", "s_pol_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Buccspo.inheritsFrom(ReadersBase);
Fields.buccspo = (prefabOptions) => { return {data:new Readers.Buccspo(),[itemTemplate]:"{s_pol_zkr:trim:encode}",[helperColumns]:["s_pol_zkr"],[helperItemTemplate]:function (row) { return Gordic.Prefabs.Utils.getSimpleInfoString(row.s_pol_zkr, row.s_pol_txt, "fb") },[itemTooltipTemplate]:"{s_pol_zkr:trim:encode}"};};

// GReaderBuccuhr.fields.js
Readers.Buccuhr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBuccuhr",keys:["s_uhrp"],[columns]:["s_uhrp", "s_uhrp_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Buccuhr.inheritsFrom(ReadersBase);
Fields.buccuhr = (prefabOptions) => { return {data:new Readers.Buccuhr(),[itemTemplate]:"{s_uhrp_txt:trim:encode}",[helperColumns]:["s_uhrp_txt"],[itemTooltipTemplate]:"{s_uhrp_txt:trim:encode}"};};

// GReaderBucsden.fields.js
Readers.Bucsden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBucsden",keys:["ixp_den"],[columns]:["ixp_den", "nazev", "rok"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Bucsden.inheritsFrom(ReadersBase);
Fields.bucsden = (prefabOptions) => { return {data:new Readers.Bucsden(),[dropdown]:true,[itemTemplate]:"{nazev:trim:encode} ({rok})",[helperColumns]:["nazev", "rok"],[itemTooltipTemplate]:"{nazev:trim:encode} ({rok})"};};

// GReaderEkoczuh.fields.js
Readers.Ekoczuh = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoczuh",keys:["zu"],[columns]:["zu","zu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoczuh.inheritsFrom(ReadersBase);
Fields.ekoczuh = (prefabOptions) => { return {data:new Readers.Ekoczuh(),[dropdown]:true,[itemTemplate]:"{zu_txt}",[helperColumns]:["zu_txt"]};};

// GReaderCntctym.fields.js
Readers.Cntctym = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"Cnt.GReaderCntctym",keys:["typ_masky"],[columns]:["typ_masky", "typ_masky_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Cntctym.inheritsFrom(ReadersBase);
Fields.cntctym = (prefabOptions) => { return {data:new Readers.Cntctym(),[dropdown]:true,[itemTemplate]:"{typ_masky_zkr:trim:encode}",[helperColumns]:["typ_masky", "typ_masky_zkr"]};};

// GReaderDdpcatv.fields.js
Readers.Ddpcatv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpcatv",keys:["alg_typ"],[columns]:["alg_typ","alg_typ_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpcatv.inheritsFrom(ReadersBase);
Fields.ddpcatv = (prefabOptions) => { return {data:new Readers.Ddpcatv(),[dropdown]:true,[itemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.alg_typ, row.alg_typ_txt);},[helperColumns]:["alg_typ", "alg_typ_txt"],[itemTooltipTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.alg_typ, row.alg_typ_txt); },[selector]:(options) => newDefaultSelector($.extend(Selectors.ddpcatv(),prefabOptions,options)).show()};};
Selectors.ddpcatv = () => { return {data:new Readers.Ddpcatv(),[userSettings]:usRoot+"ddpcatv",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["alg_typ", "alg_typ_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "alg_typ", caption: "jres:31850048", width: 100, forced: true}).addTextColumn({name: "alg_typ_txt", caption: "jres:31850182", width: 100})};};

// GReaderDdpcdsl.fields.js
Readers.Ddpcdsl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpcdsl",keys:["druh_slv"],[columns]:["druh_slv","druh_slv_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpcdsl.inheritsFrom(ReadersBase);
Fields.ddpcdsl = (prefabOptions) => { return {data:new Readers.Ddpcdsl(),[dropdown]:true,[itemTemplate]:"{druh_slv_txt:trim:encode}",[helperColumns]:["druh_slv_txt"],[itemTooltipTemplate]:"{druh_slv_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ddpcdsl(),prefabOptions,options)).show()};};
Selectors.ddpcdsl = () => { return {data:new Readers.Ddpcdsl(),[userSettings]:usRoot+"ddpcdsl",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["druh_slv_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "druh_slv_txt", caption: "jres:31850176", width: 100, forced: true})};};

// GReaderDdpcitp.fields.js
Readers.Ddpcitp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpcitp",keys:["typ_poz"],[columns]:["typ_poz","typ_poz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpcitp.inheritsFrom(ReadersBase);
Fields.ddpcitp = (prefabOptions) => { return {data:new Readers.Ddpcitp(),[dropdown]:true,[itemTemplate]:"{typ_poz_txt:trim:encode}",[helperColumns]:["typ_poz_txt"],[itemTooltipTemplate]:"{typ_poz_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ddpcitp(),prefabOptions,options)).show()};};
Selectors.ddpcitp = () => { return {data:new Readers.Ddpcitp(),[userSettings]:usRoot+"ddpcitp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_poz_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_poz_txt", caption: "jres:31850177", width: 100, forced: true})};};

// GReaderDdpcktp.fields.js
Readers.Ddpcktp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpcktp",keys:["ktg_phl"],[columns]:["ktg_phl","ktg_phl_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpcktp.inheritsFrom(ReadersBase);
Fields.ddpcktp = (prefabOptions) => { return {data:new Readers.Ddpcktp(),[dropdown]:true,[itemTemplate]:"{ktg_phl_txt:trim:encode}",[helperColumns]:["ktg_phl_txt"],[itemTooltipTemplate]:"{ktg_phl_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ddpcktp(),prefabOptions,options)).show()};};
Selectors.ddpcktp = () => { return {data:new Readers.Ddpcktp(),[userSettings]:usRoot+"ddpcktp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ktg_phl_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "ktg_phl_txt", caption: "jres:31850178", width: 100, forced: true})};};

// GReaderDdpcsaz.fields.js
Readers.Ddpcsaz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpcsaz",keys:["typ_saz"],[columns]:["typ_saz","typ_saz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpcsaz.inheritsFrom(ReadersBase);
Fields.ddpcsaz = (prefabOptions) => { return {data:new Readers.Ddpcsaz(),[dropdown]:true,[itemTemplate]:"{typ_saz_txt:trim:encode}",[helperColumns]:["typ_saz_txt"],[itemTooltipTemplate]:"{typ_saz_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ddpcsaz(),prefabOptions,options)).show()};};
Selectors.ddpcsaz = () => { return {data:new Readers.Ddpcsaz(),[userSettings]:usRoot+"ddpcsaz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_saz_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_saz_txt", caption: "jres:31850179", width: 100, forced: true})};};

// GReaderDdpcsdo.fields.js
Readers.Ddpcsdo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpcsdo",keys:["stav_doruc"],[columns]:["stav_doruc", "stav_doruc_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpcsdo.inheritsFrom(ReadersBase);
Fields.ddpcsdo = (prefabOptions) => { return {data:new Readers.Ddpcsdo(),[dropdown]:true,[itemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.stav_doruc, row.stav_doruc_txt);},[helperColumns]:["stav_doruc", "stav_doruc_txt"],[itemTooltipTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.stav_doruc, row.stav_doruc_txt); },[selector]:(options) => newDefaultSelector($.extend(Selectors.ddpcsdo(),prefabOptions,options)).show()};};
Selectors.ddpcsdo = () => { return {data:new Readers.Ddpcsdo(),[userSettings]:usRoot+"ddpcsdo",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stav_doruc", "stav_doruc_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "stav_doruc", caption: "jres:31850048", width: 100, forced: true}).addTextColumn({name: "stav_doruc_txt", caption: "jres:31850352", width: 100})};};

// GReaderDdpcslv.fields.js
Readers.Ddpcslv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpcslv",keys:["typ_slv"],[columns]:["typ_slv","typ_slv_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpcslv.inheritsFrom(ReadersBase);
Fields.ddpcslv = (prefabOptions) => { return {data:new Readers.Ddpcslv(),[dropdown]:true,[itemTemplate]:"{typ_slv_txt:trim:encode}",[helperColumns]:["typ_slv_txt"],[itemTooltipTemplate]:"{typ_slv_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ddpcslv(),prefabOptions,options)).show()};};
Selectors.ddpcslv = () => { return {data:new Readers.Ddpcslv(),[userSettings]:usRoot+"ddpcslv",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_slv_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_slv_txt", caption: "jres:31850181", width: 100, forced: true})};};

// GReaderDdpcstp.fields.js
Readers.Ddpcstp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpcstp",keys:["stav_phl"],[columns]:["stav_phl","stav_phl_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpcstp.inheritsFrom(ReadersBase);
Fields.ddpcstp = (prefabOptions) => { return {data:new Readers.Ddpcstp(),[dropdown]:true,[itemTemplate]:"{stav_phl_txt:trim:encode}",[helperColumns]:["stav_phl_txt"],[itemTooltipTemplate]:"{stav_phl_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ddpcstp(),prefabOptions,options)).show()};};
Selectors.ddpcstp = () => { return {data:new Readers.Ddpcstp(),[userSettings]:usRoot+"ddpcstp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stav_phl_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "stav_phl_txt", caption: "jres:31850175", width: 100, forced: true})};};

// GReaderDdpcsvy.fields.js
Readers.Ddpcsvy = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpcsvy",keys:["stav_vym"],[columns]:["stav_vym", "stav_vym_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpcsvy.inheritsFrom(ReadersBase);
Fields.ddpcsvy = (prefabOptions) => { return {data:new Readers.Ddpcsvy(),[dropdown]:true,[itemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.stav_vym, row.stav_vym_txt);},[helperColumns]:["stav_vym", "stav_vym_txt"],[itemTooltipTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.stav_vym, row.stav_vym_txt); },[selector]:(options) => newDefaultSelector($.extend(Selectors.ddpcsvy(),prefabOptions,options)).show()};};
Selectors.ddpcsvy = () => { return {data:new Readers.Ddpcsvy(),[userSettings]:usRoot+"ddpcsvy",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stav_vym", "stav_vym_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "stav_vym", caption: "jres:31850048", width: 100, forced: true}).addTextColumn({name: "stav_vym_txt", caption: "jres:31850174", width: 100})};};

// GReaderDdpctpe.fields.js
Readers.Ddpctpe = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpctpe",keys:["typ_pen"],[columns]:["typ_pen", "typ_pen_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpctpe.inheritsFrom(ReadersBase);
Fields.ddpctpe = (prefabOptions) => { return {data:new Readers.Ddpctpe(),[dropdown]:true,[itemTemplate]:function (row){ return FieldFunction.getSimpleInfoString(row.typ_pen, row.typ_pen_txt); },[helperColumns]:["typ_pen", "typ_pen_txt"],[itemTooltipTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.typ_pen, row.typ_pen_txt); },[selector]:(options) => newDefaultSelector($.extend(Selectors.ddpctpe(),prefabOptions,options)).show()};};
Selectors.ddpctpe = () => { return {data:new Readers.Ddpctpe(),[userSettings]:usRoot+"ddpctpe",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_pen", "typ_pen_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "typ_pen", caption: "jres:31850048", width: 100, forced: true}).addTextColumn({name: "typ_pen_txt", caption: "jres:31850172", width: 100})};};

// GReaderDdpcvsm.fields.js
Readers.Ddpcvsm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpcvsm",keys:["typ_vsm"],[columns]:["typ_vsm","typ_vsm_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpcvsm.inheritsFrom(ReadersBase);
Fields.ddpcvsm = (prefabOptions) => { return {data:new Readers.Ddpcvsm(),[dropdown]:true,[itemTemplate]:"{typ_vsm_txt:trim:encode}",[helperColumns]:["typ_vsm_txt"],[itemTooltipTemplate]:"{typ_vsm_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ddpcvsm(),prefabOptions,options)).show()};};
Selectors.ddpcvsm = () => { return {data:new Readers.Ddpcvsm(),[userSettings]:usRoot+"ddpcvsm",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_vsm_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_vsm_txt", caption: "jres:31850173", width: 100, forced: true})};};

// GReaderDdpsden.fields.js
Readers.Ddpsden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpsden",keys:["ixp_den"],[columns]:["ixp_den","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpsden.inheritsFrom(ReadersBase);
Fields.ddpsden = (prefabOptions) => { return {data:new Readers.Ddpsden(),[dropdown]:true,[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ddpsden(),prefabOptions,options)).show()};};
Selectors.ddpsden = () => { return {data:new Readers.Ddpsden(),[userSettings]:usRoot+"ddpsden",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850251", width: 100, forced: true})};};

// GReaderDdpstpp.fields.js
Readers.Ddpstpp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpstpp",keys:["typ_phl"],[columns]:["typ_phl","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpstpp.inheritsFrom(ReadersBase);
Fields.ddpstpp = (prefabOptions) => { return {data:new Readers.Ddpstpp(),[dropdown]:true,[itemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.typ_phl, row.nazev);},[helperColumns]:["typ_phl", "nazev"],[itemTooltipTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.typ_phl, row.nazev); },[selector]:(options) => newDefaultSelector($.extend(Selectors.ddpstpp(),prefabOptions,options)).show()};};
Selectors.ddpstpp = () => { return {data:new Readers.Ddpstpp(),[userSettings]:usRoot+"ddpstpp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_phl", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_phl", caption: "jres:31850110", width: 75, forced: true}).addTextColumn({name: "nazev", caption: "jres:31850004", width: 180})};};

// GReaderEkocakt.fields.js
Readers.Ekocakt = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocakt",keys:["eko_akt"],[columns]:["eko_akt","eko_akt_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekocakt.inheritsFrom(ReadersBase);
Fields.ekocakt = (prefabOptions) => { return {data:new Readers.Ekocakt(),[dropdown]:true,[itemTemplate]:"{eko_akt_txt:trim:encode}",[helperColumns]:["eko_akt_txt"],[itemTooltipTemplate]:"{eko_akt_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekocakt(),prefabOptions,options)).show()};};
Selectors.ekocakt = () => { return {data:new Readers.Ekocakt(),[userSettings]:usRoot+"ekocakt",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["eko_akt_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "eko_akt_txt", caption: "jres:31850171", width: 100, forced: true})};};

// GReaderEkocdap.fields.js
Readers.Ekocdap = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocdap",keys:["dan_typ","rokmes_od"],[columns]:["dan_typ","rokmes_od","rokmes_do","dan_proc","dan_typ_txt","dan_typ_zkr","dan_typ_upl"],[rowSize]:100,[readAll]:true,[permanent]:false}, options); };
Readers.Ekocdap.inheritsFrom(ReadersBase);
Fields.ekocdap = (prefabOptions) => { return {data:new Readers.Ekocdap(),[itemTemplate]:"{dan_typ_txt:trim:encode} ({dan_proc:number(C0)}%)",[helperColumns]:["dan_proc", "dan_typ_txt"],[itemTooltipTemplate]:"{dan_typ_txt:trim:encode} ({dan_proc:number(C0)}%)",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekocdap(),prefabOptions,options)).show()};};
Selectors.ekocdap = () => { return {data:new Readers.Ekocdap(),[userSettings]:usRoot+"ekocdap",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["dan_proc", "dan_typ_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "dan_typ_txt", caption: "jres:31850337", width: 100, forced: true}).addNumberColumn({name: "dan_proc", caption: "jres:31850338", width: 100})};};

// GReaderEkocdat.fields.js
Readers.Ekocdat = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocdat",keys:["dan_typ"],[columns]:["dan_typ","dan_typ_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekocdat.inheritsFrom(ReadersBase);
Fields.ekocdat = (prefabOptions) => { return {data:new Readers.Ekocdat(),[dropdown]:true,[itemTemplate]:"{dan_typ_txt:trim:encode}",[helperColumns]:["dan_typ_txt"],[itemTooltipTemplate]:"{dan_typ_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekocdat(),prefabOptions,options)).show()};};
Selectors.ekocdat = () => { return {data:new Readers.Ekocdat(),[userSettings]:usRoot+"ekocdat",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["dan_typ_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "dan_typ_txt", caption: "jres:31850170", width: 100, forced: true})};};

// GReaderEkocdch.fields.js
Readers.Ekocdch = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocdch",keys:["druh_char"],[columns]:["druh_char","druh_char_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekocdch.inheritsFrom(ReadersBase);
Fields.ekocdch = (prefabOptions) => { return {data:new Readers.Ekocdch(),[dropdown]:true,[itemTemplate]:"{druh_char_txt:trim:encode}",[helperColumns]:["druh_char_txt"],[itemTooltipTemplate]:"{druh_char_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekocdch(),prefabOptions,options)).show()};};
Selectors.ekocdch = () => { return {data:new Readers.Ekocdch(),[userSettings]:usRoot+"ekocdch",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["druh_char_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "druh_char_txt", caption: "jres:31850169", width: 100, forced: true})};};

// GReaderEkocdrd.fields.js
Readers.Ekocdrd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocdrd",keys:["drd"],[columns]:["drd", "drd_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekocdrd.inheritsFrom(ReadersBase);
Fields.ekocdrd = (prefabOptions) => { return {data:new Readers.Ekocdrd(),[dropdown]:true,[itemTemplate]:function (row){ return FieldFunction.getSimpleInfoString(row.drd, row.drd_txt);},[helperColumns]:["drd", "drd_txt"],[helperLimit]:"15",[itemTooltipTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.drd, row.drd_txt); },[selector]:(options) => newDefaultSelector($.extend(Selectors.ekodrd(),prefabOptions,options)).show()};};
Selectors.ekodrd = () => { return {data:new Readers.Ekocdrd(),[userSettings]:usRoot+"ekodrd",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["drd", "drd_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "drd", caption: "jres:31850209", width: 100, forced: true}).addTextColumn({name: "drd_txt", caption: "jres:31850343", width: 100})};};

// GReaderEkocevp.fields.js
Readers.Ekocevp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocevp",keys:["typ_oper_uka"],[columns]:["typ_oper_uka","typ_oper_uka_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekocevp.inheritsFrom(ReadersBase);
Fields.ekocevp = (prefabOptions) => { return {data:new Readers.Ekocevp(),[dropdown]:true,[itemTemplate]:"{typ_oper_uka_txt:trim:encode}",[helperColumns]:["typ_oper_uka_txt"],[itemTooltipTemplate]:"{typ_oper_uka_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekocevp(),prefabOptions,options)).show()};};
Selectors.ekocevp = () => { return {data:new Readers.Ekocevp(),[userSettings]:usRoot+"ekocevp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_oper_uka_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_oper_uka_txt", caption: "jres:31850168", width: 100, forced: true})};};

// GReaderEkocizp.fields.js
Readers.Ekocizp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocizp",keys:["zp"],[columns]:["zp","zp_txt","zp_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekocizp.inheritsFrom(ReadersBase);
Fields.ekocizp = (prefabOptions) => { return {data:new Readers.Ekocizp(),[itemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.zp_zkr, row.zp_txt); },[dropdown]:true,[helperColumns]:["zp_zkr", "zp_txt"],[itemTooltipTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.zp_zkr, row.zp_txt); },[selector]:(options) => newDefaultSelector($.extend(Selectors.ekocizp(),prefabOptions,options)).show()};};
Selectors.ekocizp = () => { return {data:new Readers.Ekocizp(),[userSettings]:usRoot+"ekocizp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zp_zkr", "zp_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "zp_zkr", caption: "jres:31850370", width: 35, forced: true}).addTextColumn({name: "zp_txt", caption: "jres:31850311", width: 100})};};

// GReaderEkocktd.fields.js
Readers.Ekocktd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocktd",keys:["ktg_den"],[columns]:["ktg_den","ktg_den_txt","typ_ag","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekocktd.inheritsFrom(ReadersBase);
Fields.ekocktd = (prefabOptions) => { return {data:new Readers.Ekocktd(),[itemTemplate]:"{ktg_den_txt:trim:encode}",[helperColumns]:["ktg_den_txt"],[itemTooltipTemplate]:"{ktg_den_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekocktd(),prefabOptions,options)).show()};};
Selectors.ekocktd = () => { return {data:new Readers.Ekocktd(),[userSettings]:usRoot+"ekocktd",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ktg_den_txt"]},[gridFormat]:newGridFormat().add({name: "ktg_den_txt", caption: "jres:31850361", width: 100, forced: true})};};

// GReaderEkocmen.fields.js
Readers.Ekocmen = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocmen",keys:["mena"],[columns]:["mena", "mena_txt", "mena_sis_aaa", "mena_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekocmen.inheritsFrom(ReadersBase);
Fields.ekocmen = (prefabOptions) => { return {data:new Readers.Ekocmen(),[itemTemplate]:"{mena_sis_aaa:trim:encode}",[helperItemTemplate]:function (row) {return FieldFunction.getSimpleInfoString(row.mena_sis_aaa,  row.mena_txt, "fb")},[helperColumns]:["mena_sis_aaa", "mena_txt"],[itemTooltipTemplate]:"{mena_sis_aaa:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekocmen(),prefabOptions,options)).show()};};
Selectors.ekocmen = () => { return {data:new Readers.Ekocmen(),[gridOpts]:{
        searchColumns: ["mena_zkr", "mena_txt", "mena_sis_aaa"],
    },[userSettings]:usRoot+"ekocmen",[isolatedUserSettings]:true,[gridFormat]:newGridFormat().addTextColumn({name: "mena_sis_aaa", caption: "jres:31850080", width: 80, forced: true}).addTextColumn({name: "mena_txt", caption: "jres:31850079", width: 150}).addTextColumn({name: "mena_zkr", caption: "jres:31850078", width: 80})};};

// GReaderEkocodu.fields.js
Readers.Ekocodu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocodu",keys:["typ_oduk"],[columns]:["typ_oduk","typ_oduk_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekocodu.inheritsFrom(ReadersBase);
Fields.ekocodu = (prefabOptions) => { return {data:new Readers.Ekocodu(),[dropdown]:true,[itemTemplate]:"{typ_oduk_txt:trim:encode}",[helperColumns]:["typ_oduk_txt"],[itemTooltipTemplate]:"{typ_oduk_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekocodu(),prefabOptions,options)).show()};};
Selectors.ekocodu = () => { return {data:new Readers.Ekocodu(),[userSettings]:usRoot+"ekocodu",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_oduk_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_oduk_txt", caption: "jres:31850184", width: 100, forced: true})};};

// GReaderEkocpeb.fields.js
Readers.Ekocpeb = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocpeb",keys:["s_deb"],[columns]:["s_deb", "s_deb_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekocpeb.inheritsFrom(ReadersBase);
Fields.ekocpeb = (prefabOptions) => { return {data:new Readers.Ekocpeb(),[itemTemplate]:"{s_deb_txt:trim:encode}",[helperColumns]:["s_deb_txt"],[itemTooltipTemplate]:"{s_deb_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekocpeb(),prefabOptions,options)).show()};};
Selectors.ekocpeb = () => { return {data:new Readers.Ekocpeb(),[userSettings]:usRoot+"ekocpeb",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["s_deb_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "s_deb_txt", caption: "jres:31850312", width: 100, forced: true})};};

// GReaderEkocpch.fields.js
Readers.Ekocpch = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocpch",keys:["priz_char"],[columns]:["priz_char", "priz_char_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekocpch.inheritsFrom(ReadersBase);
Fields.ekocpch = (prefabOptions) => { return {data:new Readers.Ekocpch(),[dropdown]:true,[itemTemplate]:"{priz_char_txt:trim:encode}",[helperColumns]:["priz_char_txt"],[itemTooltipTemplate]:"{priz_char_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekocpch(),prefabOptions,options)).show()};};
Selectors.ekocpch = () => { return {data:new Readers.Ekocpch(),[userSettings]:usRoot+"ekocpch",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_char_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "priz_char_txt", caption: "jres:31850185", width: 100, forced: true})};};

// GReaderEkocrcc.fields.js
Readers.Ekocrcc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocrcc",keys:["id_sci"],[columns]:["id_sci","nazev_sci","popis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekocrcc.inheritsFrom(ReadersBase);
Fields.ekocrcc = (prefabOptions) => { return {data:new Readers.Ekocrcc(),[itemTemplate]:"{nazev_sci:trim:encode}",[helperColumns]:["id_sci", "popis", "nazev_sci"],[helperItemTemplate]:function (row)
    {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850034": row.id_sci, "jres:31850015": row.popis });
        return FieldFunction.getInfoStr({ "info": row.nazev_sci, "more": moreInfo })
    },[itemTooltipTemplate]:"{nazev_sci:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekocrcc(),prefabOptions,options)).show()};};
Selectors.ekocrcc = () => { return {data:new Readers.Ekocrcc(),[userSettings]:usRoot+"ekocrcc",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["id_sci", "popis", "nazev_sci"]},[gridFormat]:newGridFormat().addNumberColumn({name: "id_sci", caption: "jres:31850034", width: 15, forced: true}).addTextColumn({name: "nazev_sci", caption: "jres:31850004", width: 100}).addTextColumn({name: "popis", caption: "jres:31850015", width: 200})};};

// GReaderEkocsop.fields.js
Readers.Ekocsop = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocsop",keys:["s_opak"],[columns]:["s_opak","s_opak_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekocsop.inheritsFrom(ReadersBase);
Fields.ekocsop = (prefabOptions) => { return {data:new Readers.Ekocsop(),[dropdown]:true,[itemTemplate]:"{s_opak_txt:trim:encode}",[helperColumns]:["s_opak_txt"],[itemTooltipTemplate]:"{s_opak_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekocsop(),prefabOptions,options)).show()};};
Selectors.ekocsop = () => { return {data:new Readers.Ekocsop(),[userSettings]:usRoot+"ekocsop",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["s_opak_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "s_opak_txt", caption: "jres:31850186", width: 100, forced: true})};};

// GReaderEkocsto.fields.js
Readers.Ekocsto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkocsto",keys:["s_sto"],[columns]:["s_sto","s_sto_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekocsto.inheritsFrom(ReadersBase);
Fields.ekocsto = (prefabOptions) => { return {data:new Readers.Ekocsto(),[dropdown]:true,[itemTemplate]:"{s_sto_txt:trim:encode}",[helperColumns]:["s_sto_txt"],[itemTooltipTemplate]:"{s_sto_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekocsto(),prefabOptions,options)).show()};};
Selectors.ekocsto = () => { return {data:new Readers.Ekocsto(),[userSettings]:usRoot+"ekocsto",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["s_sto_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "s_sto_txt", caption: "jres:31850243", width: 100, forced: true})};};

// GReaderEkoctis.fields.js
Readers.Ekoctis = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoctis",keys:["s_tis"],[columns]:["s_tis", "s_tis_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoctis.inheritsFrom(ReadersBase);
Fields.ekoctis = (prefabOptions) => { return {data:new Readers.Ekoctis(),[dropdown]:true,[itemTemplate]:"{s_tis_txt:trim:encode}",[helperColumns]:["s_tis_txt"],[itemTooltipTemplate]:"{s_tis_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoctis(),prefabOptions,options)).show()};};
Selectors.ekoctis = () => { return {data:new Readers.Ekoctis(),[userSettings]:usRoot+"ekoctis",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["s_tis_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "s_tis_txt", caption: "jres:31850187", width: 100, forced: true})};};

// GReaderEkoctku.fields.js
Readers.Ekoctku = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoctku",keys:["typ_kuk"],[columns]:["typ_kuk", "typ_kuk_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoctku.inheritsFrom(ReadersBase);
Fields.ekoctku = (prefabOptions) => { return {data:new Readers.Ekoctku(),[dropdown]:true,[itemTemplate]:"{typ_kuk_txt:trim:encode}",[helperColumns]:["typ_kuk_txt"],[itemTooltipTemplate]:"{typ_kuk_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoctku(),prefabOptions,options)).show()};};
Selectors.ekoctku = () => { return {data:new Readers.Ekoctku(),[userSettings]:usRoot+"ekoctku",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_kuk_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_kuk_txt", caption: "jres:31850188", width: 100, forced: true})};};

// GReaderEkoctpe.fields.js
Readers.Ekoctpe = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoctpe",keys:["typ_pen"],[columns]:["typ_pen", "typ_pen_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoctpe.inheritsFrom(ReadersBase);
Fields.ekoctpe = (prefabOptions) => { return {data:new Readers.Ekoctpe(),[dropdown]:true,[itemTemplate]:"{typ_pen_txt:trim:encode}",[helperColumns]:["typ_pen_txt"],[itemTooltipTemplate]:"{typ_pen_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoctpe(),prefabOptions,options)).show()};};
Selectors.ekoctpe = () => { return {data:new Readers.Ekoctpe(),[userSettings]:usRoot+"ekoctpe",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_pen_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_pen_txt", caption: "jres:31850189", width: 100, forced: true})};};

// GReaderEkoctsp.fields.js
Readers.Ekoctsp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoctsp",keys:["typ_spo"],[columns]:["typ_spo", "typ_spo_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoctsp.inheritsFrom(ReadersBase);
Fields.ekoctsp = (prefabOptions) => { return {data:new Readers.Ekoctsp(),[itemTemplate]:"{typ_spo_txt:trim:encode}",[helperColumns]:["typ_spo_txt"],[itemTooltipTemplate]:"{typ_spo_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoctsp(),prefabOptions,options)).show()};};
Selectors.ekoctsp = () => { return {data:new Readers.Ekoctsp(),[userSettings]:usRoot+"ekoctsp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_spo_txt"]},[gridFormat]:newGridFormat().add({name: "typ_spo_txt", caption: "jres:31850331", width: 100, forced: true})};};

// GReaderEkoctst.fields.js
Readers.Ekoctst = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoctst",keys:["typ_ste"],[columns]:["typ_ste", "typ_ste_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoctst.inheritsFrom(ReadersBase);
Fields.ekoctst = (prefabOptions) => { return {data:new Readers.Ekoctst(),[dropdown]:true,[itemTemplate]:"{typ_ste_txt:trim:encode}",[helperColumns]:["typ_ste_txt"],[itemTooltipTemplate]:"{typ_ste_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoctst(),prefabOptions,options)).show()};};
Selectors.ekoctst = () => { return {data:new Readers.Ekoctst(),[userSettings]:usRoot+"ekoctst",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_ste_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_ste_txt", caption: "jres:31850190", width: 100, forced: true})};};

// GReaderEkoctyb.fields.js
Readers.Ekoctyb = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoctyb",keys:["typ_ban"],[columns]:["typ_ban", "typ_ban_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoctyb.inheritsFrom(ReadersBase);
Fields.ekoctyb = (prefabOptions) => { return {data:new Readers.Ekoctyb(),[dropdown]:true,[itemTemplate]:"{typ_ban_txt:trim:encode}",[helperColumns]:["typ_ban_txt"],[itemTooltipTemplate]:"{typ_ban_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoctyb(),prefabOptions,options)).show()};};
Selectors.ekoctyb = () => { return {data:new Readers.Ekoctyb(),[userSettings]:usRoot+"ekoctyb",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_ban_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_ban_txt", caption: "jres:31850244", width: 100, forced: true})};};

// GReaderEkoczak.fields.js
Readers.Ekoczak = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoczak",keys:["zak_upr"],[columns]:["zak_upr", "zak_upr_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoczak.inheritsFrom(ReadersBase);
Fields.ekoczak = (prefabOptions) => { return {data:new Readers.Ekoczak(),[dropdown]:true,[itemTemplate]:"{zak_upr_txt:trim:encode}",[helperColumns]:["zak_upr_txt"],[itemTooltipTemplate]:"{zak_upr_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoczak(),prefabOptions,options)).show()};};
Selectors.ekoczak = () => { return {data:new Readers.Ekoczak(),[userSettings]:usRoot+"ekoczak",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zak_upr_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "zak_upr_txt", caption: "jres:31850262", width: 100, forced: true})};};

// GReaderEkoczpr.fields.js
Readers.Ekoczpr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoczpr",keys:["s_zprac_eb"],[columns]:["s_zprac_eb", "s_zprac_eb_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoczpr.inheritsFrom(ReadersBase);
Fields.ekoczpr = (prefabOptions) => { return {data:new Readers.Ekoczpr(),[itemTemplate]:"{s_zprac_eb_txt:trim:encode}",[helperColumns]:["s_zprac_eb_txt"],[itemTooltipTemplate]:"{s_zprac_eb_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoczpr(),prefabOptions,options)).show()};};
Selectors.ekoczpr = () => { return {data:new Readers.Ekoczpr(),[userSettings]:usRoot+"ekoczpr",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["s_zprac_eb_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "s_zprac_eb_txt", caption: "jres:31850344", width: 100, forced: true})};};

// GReaderEkoczpz.fields.js
Readers.Ekoczpz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoczpz",keys:["zp_z"],[columns]:["zp_z","zp_z_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoczpz.inheritsFrom(ReadersBase);
Fields.ekoczpz = (prefabOptions) => { return {data:new Readers.Ekoczpz(),[dropdown]:true,[itemTemplate]:"{zp_z_txt:trim:encode}",[helperColumns]:["zp_z_txt"],[itemTooltipTemplate]:"{zp_z_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoczpz(),prefabOptions,options)).show()};};
Selectors.ekoczpz = () => { return {data:new Readers.Ekoczpz(),[userSettings]:usRoot+"ekoczpz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zp_z_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "zp_z_txt", caption: "jres:31850191", width: 100, forced: true})};};

// GReaderEkoduus.fields.js
Readers.Ekoduus = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoduus",keys:["ico","ucs","uus","rok"],[columns]:["ico", "ucs", "uus", "rok", "nks_vl", "nazev_nks"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoduus.inheritsFrom(ReadersBase);
Fields.ekoduus = (prefabOptions) => { return {data:new Readers.Ekoduus(),[itemTemplate]:"{nks_vl:trim:encode}",[helperColumns]:["nks_vl", "rok", "nazev_nks"],[helperItemTemplate]:function (row) {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850004": row.nazev_nks, "jres:31850007": row.rok });
        return FieldFunction.getInfoStr({ "info": row.nks_vl, "more": moreInfo });
    },[itemTooltipTemplate]:"{nks_vl:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoduus(),prefabOptions,options)).show()};};
Selectors.ekoduus = () => { return {data:new Readers.Ekoduus(),[gridFormat]:new Gordic.Data.GridFormat().addTextColumn({ name: "nks_vl", caption: "jres:31850289" + Gordic.Consts.DbShortcuts.nks, width: 80 }).addNumberColumn({ name: "rok", caption: "jres:31850007", width: 40 }).addTextColumn({ name: "nazev_nks", caption: "jres:31850004", width: 150 }),[userSettings]:usRoot+"ekoduus",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nks_vl", "rok", "nazev_nks"]}};};

// GReaderEkochra.fields.js
Readers.Ekochra = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkochra",keys:["hra_pop"],[columns]:["hra_pop", "hra_pop_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekochra.inheritsFrom(ReadersBase);
Fields.ekochra = (prefabOptions) => { return {data:new Readers.Ekochra(),[dropdown]:true,[itemTemplate]:"{hra_pop_txt:trim:encode}",[helperColumns]:["hra_pop_txt"],[itemTooltipTemplate]:"{hra_pop_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekochra(),prefabOptions,options)).show()};};
Selectors.ekochra = () => { return {data:new Readers.Ekochra(),[userSettings]:usRoot+"ekochra",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["hra_pop_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "hra_pop_txt", caption: "jres:31850193", width: 100, forced: true})};};

// GReaderEkoscsk.fields.js
Readers.Ekoscsk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoscsk",keys:["sk"],[columns]:["sk","nazev","obec","esu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoscsk.inheritsFrom(ReadersBase);
Fields.ekoscsk = (prefabOptions) => { return {data:new Readers.Ekoscsk(),[itemTemplate]:"{sk:trim:encode}",[helperColumns]:["sk","nazev","esu_txt"],[helperItemTemplate]:function (row) {
	    	    var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850004": row.nazev, "jres:31850026": row.esu_txt });
	    return FieldFunction.getInfoStr({ "info": row.sk, "more": moreInfo });
	},[itemTooltipTemplate]:"{sk:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoscsk(),prefabOptions,options)).show()};};
Selectors.ekoscsk = () => { return {data:new Readers.Ekoscsk(),[userSettings]:usRoot+"ekoscsk",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["sk","nazev","esu_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "sk", caption: "jres:31850060", width: 60, forced: true}).addTextColumn({name: "nazev", caption: "jres:31850004", width: 150}).addTextColumn({name: "bic", caption: "jres:23350006", width: 60}).addTextColumn({name: "obec", caption: "jres:31850127", width: 70}).addTextColumn({name: "esu_txt", caption: "jres:31850026", width: 100})};};

// GReaderEkoscss.fields.js
Readers.Ekoscss = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoscss",keys:["bu_ci","sk_ci","ss"],[columns]:["bu_ci", "sk_ci", "ss", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoscss.inheritsFrom(ReadersBase);
Fields.ekoscss = (prefabOptions) => { return {data:new Readers.Ekoscss(),[itemTemplate]:"{ss:trim:encode}",[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.ss, row.nazev, "fb"); },[helperColumns]:["ss", "nazev"],[itemTooltipTemplate]:"{ss:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoscss(),prefabOptions,options)).show()};};
Selectors.ekoscss = () => { return {data:new Readers.Ekoscss(),[subTaskOpts]:Gordic.Prefabs.Selector.SubTasks.Aktivita,[userSettings]:usRoot+"ekoscss",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ss", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "bu_ci", caption: "jres:31850303", width: 70, forced: true}).addTextColumn({name: "sk_ci", caption: "jres:31850304", width: 40}).addTextColumn({name: "ss", caption: "jres:31850305", width: 60}).addTextColumn({name: "nazev", caption: "jres:31850004", width: 80}).addTextColumn({name: "zkratka", caption: "jres:31850003", width: 30})};};

// GReaderEkosico.fields.js
Readers.Ekosico = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosico",keys:["ico"],[columns]:["ico","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekosico.inheritsFrom(ReadersBase);
Fields.ekosico = (prefabOptions) => { return {data:new Readers.Ekosico(),[itemTemplate]:"{ico:trim:encode}",[helperColumns]:["ico", "nazev"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.ico, row.nazev, "fb"); },[itemTooltipTemplate]:"{ico:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosico(),prefabOptions,options)).show()};};
Selectors.ekosico = () => { return {data:new Readers.Ekosico(),[gridFormat]:new Gordic.Data.GridFormat().addTextColumn({ name: "ico", caption: Gordic.Consts.DbShortcuts.ico, width: 100 }).addTextColumn({ name: "nazev", caption: "jres:31850004", width: 100 }),[userSettings]:usRoot+"ekosico",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ico", "nazev"]}};};

// GReaderEkoskla.fields.js
Readers.Ekoskla = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoskla",keys:["skp"],[columns]:["skp","typ_kla_txt","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoskla.inheritsFrom(ReadersBase);
Fields.ekoskla = (prefabOptions) => { return {data:new Readers.Ekoskla(),[itemTemplate]:"{skp:trim:encode}",[helperColumns]:["skp", "nazev", "typ_kla_txt"],[helperItemTemplate]:function (row) {
	    	    var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850004": row.nazev, "jres:31850006": row.typ_kla_txt });
	    return FieldFunction.getInfoStr({ "info": row.skp, "more": moreInfo });
	},[itemTooltipTemplate]:"{skp:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoskla(),prefabOptions,options)).show()};};
Selectors.ekoskla = () => { return {data:new Readers.Ekoskla(),[userSettings]:usRoot+"ekoskla",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["skp", "nazev", "typ_kla_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "skp", caption: "jres:31850043", width: 100, forced: true}).addTextColumn({name: "typ_kla_txt", caption: "jres:31850006", width: 40}).addTextColumn({name: "nazev", caption: "jres:31850004", width: 300})};};

// GReaderEkoskom.fields.js
Readers.Ekoskom = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoskom",keys:["ico","ixs_fun"],[columns]:["nazev_ref", "nazev", "cis_real", "num_komp", "ico", "ixs_fun"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Ekoskom.inheritsFrom(ReadersBase);
Fields.ekoskom = (prefabOptions) => { return {data:new Readers.Ekoskom(),[itemTemplate]:function (row)
        {
        var text = FieldFunction.getFormatedString(["Realizátor", row.cis_real], ": ");        
        return ("{0}<br><i>{1}{2}</i>").format(FieldFunction.getTrimEncodeString(row.nazev_ref), FieldFunction.getTrimEncodeString(row.nazev), !FieldFunction.isEmpty(text) ? " ( " + text + " )" : "");
        },[graphicInput]:"oninput",[itemTooltipTemplate]:function (row) {
        var text = FieldFunction.getFormatedString(["Realizátor", row.cis_real], ": ");        
        return ("{0}<br><i>{1}{2}</i>").format(FieldFunction.getTrimEncodeString(row.nazev_ref), FieldFunction.getTrimEncodeString(row.nazev), !FieldFunction.isEmpty(text) ? " ( " + text + " )" : "");
    },[verticalButtons]:true,[helperColumns]:["nazev_ref", "nazev", "cis_real", "num_komp"],[states]:[{
        icon: "gi-user",
        align: "opposite",
        customClass: "g-inactive-prefabState"
    }],[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoskom(),prefabOptions,options)).show()};};
Fields.ekoskomMini = (prefabOptions) => { return {data:new Readers.Ekoskom(),[itemTemplate]:"{nazev_rf:trim:encode}",[itemTooltipTemplate]:"{nazev_rf:trim:encode}",[graphicInput]:"oninput",[verticalButtons]:true,[helperColumns]:["nazev_rf"],[states]:[{
        icon: "gi-user",
        align: "opposite",
        customClass: "g-inactive-prefabState"
    }],[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoskom(),prefabOptions,options)).show()};};
Selectors.ekoskom = () => { return {data:new Readers.Ekoskom(),[userSettings]:usRoot+"ekoskom",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev_ref", "nazev", "cis_real", "num_komp"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev_ref", caption: "jres:23350043", width: 120, forced: true}).addTextColumn({name: "nazev", caption: "jres:23350040", width: 260}).addTextColumn({name: "cis_real", caption: "jres:23350041", width: 60}).addTextColumn({name: "num_komp", caption: "jres:23350042", width: 60})};};

// GReaderEkoskos.fields.js
Readers.Ekoskos = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoskos",keys:["ks"],[columns]:["ks","ks_txt","ks_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoskos.inheritsFrom(ReadersBase);
Fields.ekoskos = (prefabOptions) => { return {data:new Readers.Ekoskos(),[itemTemplate]:"{ks:trim:encode}",[helperColumns]:["ks_zkr", "ks", "ks_txt"],[helperItemTemplate]:function (row)
	{
	    	    var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850003": row.ks_zkr, "jres:31850015": row.ks_txt });
	    return FieldFunction.getInfoStr({ "info": row.ks, "more": moreInfo })
	        },[itemTooltipTemplate]:"{ks:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoskos(),prefabOptions,options)).show()};};
Selectors.ekoskos = () => { return {data:new Readers.Ekoskos(),[gridOpts]:{

        searchColumns: ["ks_zkr", "ks", "ks_txt"],
        rowsEnabled: function (meta) {
            return (meta && meta.data && meta.data.aktivita === 100 ? true : false);
        }
    },[serverFilters]:{ aktivita: 100 },[subTaskOpts]:Gordic.Prefabs.Selector.SubTasks.Aktivita
    /*menuBar: [{
        favorite: true, action: new GAction({
            name: "all",
            caption: "jres:31850276",             run: function (ev, ctx) {
                ctx.dialogCnt.actualFilters = { aktivita: [100, 500] };
                ctx.dialogCnt.filterData();
            }
        })
    },
    {
        favorite: true, action: new GAction({
            name: "active",
            caption: "jres:31850272",             run: function (ev, ctx) {
                ctx.dialogCnt.actualFilters = { aktivita: 100 };
                ctx.dialogCnt.filterData();
            }
        })
    },
    {
        favorite: true, action: new GAction({
            name: "nonactive",
            caption: "jres:31850275",             run: function (ev, ctx) {
                ctx.dialogCnt.actualFilters = { aktivita: 500 };
                ctx.dialogCnt.filterData();
            }
        })
    }]*/,[userSettings]:usRoot+"ekoskos",[isolatedUserSettings]:true,[gridFormat]:newGridFormat().addTextColumn({name: "ks", caption: "jres:31850095", width: 150, forced: true}).addTextColumn({name: "ks_txt", caption: "jres:31850015", width: 200}).addTextColumn({name: "ks_zkr", caption: "jres:31850003", width: 40})};};

// GReaderEkoskto.fields.js
Readers.Ekoskto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoskto",keys:["ixs_kto"],[columns]:["nazev", "typ_ose_txt", "ixs_kto"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoskto.inheritsFrom(ReadersBase);
Fields.ekoskto = (prefabOptions) => { return {data:new Readers.Ekoskto(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "typ_ose_txt"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.nazev, row.typ_ose_txt, "fb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoskto(),prefabOptions,options)).show()};};
Selectors.ekoskto = () => { return {data:new Readers.Ekoskto(),[userSettings]:usRoot+"ekoskto",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "typ_ose_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 200, forced: true}).addTextColumn({name: "typ_ose_txt", caption: "jres:31850133", width: 100})};};

// GReaderEkosnks.fields.js
Readers.Ekosnks = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosnks",keys:["ico","nks"],[columns]:["ico", "nks", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekosnks.inheritsFrom(ReadersBase);
Fields.ekosnks = (prefabOptions) => { return {data:new Readers.Ekosnks(),[itemTemplate]:function (row) {
        return FieldFunction.getSimpleInfoString(row.nks, row.nazev);
    },[helperColumns]:["nks", "nazev"],[itemTooltipTemplate]:function (row) {
        return FieldFunction.getSimpleInfoString(row.nks, row.nazev);
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosnks(),prefabOptions,options)).show()};};
Selectors.ekosnks = () => { return {data:new Readers.Ekosnks(),[gridOpts]:{
        searchColumns: ["ico", "nks", "nazev"]
    },[gridFormat]:new Gordic.Data.GridFormat().addTextColumn({ name: "nks", caption: Gordic.Consts.DbShortcuts.nks, width: 70 }).addTextColumn({ name: "nazev", caption: "jres:31850004", width: 120 }).addTextColumn({ name: "ico", caption: Gordic.Consts.DbShortcuts.ico, width: 70 }),[userSettings]:usRoot+"ekosnks",[isolatedUserSettings]:true};};

// GReaderEkosplt.fields.js
Readers.Ekosplt = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosplt",keys:["pla_tit"],[columns]:["pla_tit","pla_tit_txt","pla_tit_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekosplt.inheritsFrom(ReadersBase);
Fields.ekosplt = (prefabOptions) => { return {data:new Readers.Ekosplt(),[itemTemplate]:"{pla_tit_txt:trim:encode}",[helperColumns]:["pla_tit", "pla_tit_zkr", "pla_tit_txt"],[helperItemTemplate]:function (row)
    {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850002": row.pla_tit, "jres:31850003": row.pla_tit_zkr });
        return FieldFunction.getInfoStr({"info": row.pla_tit_txt, "more": moreInfo});
    },[itemTooltipTemplate]:"{pla_tit_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosplt(),prefabOptions,options)).show()};};
Selectors.ekosplt = () => { return {data:new Readers.Ekosplt(),[userSettings]:usRoot+"ekosplt",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["pla_tit", "pla_tit_zkr", "pla_tit_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "pla_tit", caption: "jres:31850002", width: 50, forced: true}).addTextColumn({name: "pla_tit_txt", caption: "jres:31850004", width: 300}).addTextColumn({name: "pla_tit_zkr", caption: "jres:31850003", width: 50})};};

// GReaderEkosrar.fields.js
Readers.Ekosrar = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosrar",keys:["ixs_rar"],[columns]:["ico", "nazev", "ixs_rar"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekosrar.inheritsFrom(ReadersBase);
Fields.ekosrar = (prefabOptions) => { return {data:new Readers.Ekosrar(),[itemTemplate]:"{ico:trim:encode}",[helperColumns]:["ico", "nazev"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.ico, row.nazev, "fb"); },[itemTooltipTemplate]:"{ico:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosrar(),prefabOptions,options)).show()};};
Selectors.ekosrar = () => { return {data:new Readers.Ekosrar(),[gridFormat]:new Gordic.Data.GridFormat().addTextColumn({ name: "ico", caption: Gordic.Consts.DbShortcuts.ico, width: 70 }).addTextColumn({ name: "nazev", caption: "jres:31850004", width: 70 }),[userSettings]:usRoot+"ekosrar",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ico", "nazev"]}};};

// GReaderEkosrea.fields.js
Readers.Ekosrea = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosrea",keys:["ico","cis_real"],[columns]:["cis_real","nazev", "ico"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekosrea.inheritsFrom(ReadersBase);
Fields.ekosrea = (prefabOptions) => { return {data:new Readers.Ekosrea(),[dropdown]:true,[itemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.cis_real, row.nazev);},[helperColumns]:["cis_real", "nazev"],[itemTooltipTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.cis_real, row.nazev); },[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosrea(),prefabOptions,options)).show()};};
Selectors.ekosrea = () => { return {data:new Readers.Ekosrea(),[userSettings]:usRoot+"ekosrea",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["cis_real", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "cis_real", caption: "jres:31850313", width: 70, forced: true}).addTextColumn({name: "nazev", caption: "jres:31850004", width: 100})};};

// GReaderEkossds.fields.js
Readers.Ekossds = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkossds",keys:["sds"],[columns]:["sds","sds_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekossds.inheritsFrom(ReadersBase);
Fields.ekossds = (prefabOptions) => { return {data:new Readers.Ekossds(),[itemTemplate]:"{sds_txt:trim:encode}",[helperColumns]:["sds", "sds_txt"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.sds, row.sds_txt, "sb"); },[itemTooltipTemplate]:"{sds_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekossds(),prefabOptions,options)).show()};};
Selectors.ekossds = () => { return {data:new Readers.Ekossds(),[userSettings]:usRoot+"ekossds",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["sds", "sds_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "sds", caption: "jres:31850048", width: 50, forced: true}).addTextColumn({name: "sds_txt", caption: "jres:31850004", width: 350})};};

// GReaderEkostuk.fields.js
Readers.Ekostuk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkostuk",keys:["ixs_tuk"],[columns]:["nazev", "zkratka", "ixs_tuk"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekostuk.inheritsFrom(ReadersBase);
Fields.ekostuk = (prefabOptions) => { return {data:new Readers.Ekostuk(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["zkratka", "nazev"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.zkratka, row.nazev, "sb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekostuk(),prefabOptions,options)).show()};};
Selectors.ekostuk = () => { return {data:new Readers.Ekostuk(),[userSettings]:usRoot+"ekostuk",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zkratka", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 150, forced: true}).addTextColumn({name: "zkratka", caption: "jres:31850003", width: 70})};};

// GReaderEkosuci.fields.js
Readers.Ekosuci = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosuci",keys:["ixs_esu","bu_ci","sk_ci"],[columns]:["ixs_esu", "bu_ci", "sk_ci", "esu_txt", "nazev", "nazev_ban", "mena_zkr", "bic", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Ekosuci.inheritsFrom(ReadersBase);
Fields.ekosuci = (prefabOptions) => { return {data:new Readers.Ekosuci(),[itemTemplate]:"{bu_ci:trim:encode} / {sk_ci:trim:encode}",[helperItemTemplate]:function(row) 
    {    
        var info = ("<b>{0}</b>").format(FieldFunction.getFormatedString([row.bu_ci, row.sk_ci], "/"));
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850004": row.nazev, "jres:31850013": row.esu_txt });         return FieldFunction.getInfoNoEncodeStr({ "info": info, "more": moreInfo });
    },[helperColumns]:["bu_ci", "sk_ci", "nazev", "esu_txt"],[itemTooltipTemplate]:"{bu_ci:trim:encode} / {sk_ci:trim:encode}",[clientFilterEvaluator]:new Gordic.Data.Filtering.BankAccountResolver(["bu_ci", "sk_ci"]),[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosuci(),prefabOptions,options)).show()};};
Selectors.ekosuci = () => { return {data:new Readers.Ekosuci(),[gridOpts]:{
        columnMode: "full",
        searchColumns: ["bu_ci", "sk_ci", "nazev", "nazev_ban", "mena_zkr", "bic", "esu_txt"],
        rowsEnabled: function (meta) {
            return meta && meta.data && meta.data.aktivita === 100 ? true : false;
        }
    },[serverFilters]:{ aktivita: 100 },[subTaskOpts]:Gordic.Prefabs.Selector.SubTasks.Aktivita
   /* serverFilters: { aktivita: [100, 500] },[menuBar]:[{
        favorite: true, action: new GAction({
            name: "all",
            caption: "jres:31850276",             run: function (ev, ctx) {
                ctx.dialogCnt.actualFilters = { aktivita: [100, 500] };
                ctx.dialogCnt.filterData();
            }
        })
    },
    {
        favorite: true, action: new GAction({
            name: "active",
            caption: "jres:31850272",             run: function (ev, ctx) {
                ctx.dialogCnt.actualFilters = { aktivita: 100 };
                ctx.dialogCnt.filterData();
            }
        })
    },
    {
        favorite: true, action: new GAction({
            name: "nonactive",
            caption: "jres:31850275",             run: function (ev, ctx) {
                ctx.dialogCnt.actualFilters = { aktivita: 500 };
                ctx.dialogCnt.filterData();
            }
        })
    }]*/,[userSettings]:usRoot+"ekosuci",[isolatedUserSettings]:true,[gridFormat]:newGridFormat().addTextColumn({name: "bu_ci", caption: "jres:31850283", width: 120, forced: true}).addTextColumn({name: "sk_ci", caption: "jres:31850284", width: 90}).addTextColumn({name: "nazev_ban", caption: "jres:31850285", width: 150}).addTextColumn({name: "mena_zkr", caption: "jres:31850286", width: 140}).addTextColumn({name: "bic", caption: "jres:31850061", width: 120}).addTextColumn({name: "nazev", caption: "jres:31850287", width: 170}).addTextColumn({name: "esu_txt_ban", caption: "jres:31850288", width: 300})};};

// GReaderEkosuciBezEsu.fields.js
Readers.EkosuciBezEsu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosuciBezEsu",keys:["bu_ci","sk_ci"],[columns]:["ixs_esu", "bu_ci", "sk_ci", "nazev_ban", "mena_zkr", "bic"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.EkosuciBezEsu.inheritsFrom(ReadersBase);
Fields.ekosuciBezEsu = (prefabOptions) => { return {data:new Readers.EkosuciBezEsu(),[itemTemplate]:"{bu_ci:trim:encode} / {sk_ci:trim:encode}",[helperItemTemplate]:function (row) {
        var info = ("<b>{0}</b>").format(FieldFunction.getFormatedString([row.bu_ci, row.sk_ci], "/"));
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850004": row.nazev });         return FieldFunction.getInfoNoEncodeStr({ "info": info, "more": moreInfo });
    },[helperColumns]:["bu_ci", "sk_ci", "nazev"],[itemTooltipTemplate]:"{bu_ci:trim:encode} / {sk_ci:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosuciBezEsu(),prefabOptions,options)).show()};};
Selectors.ekosuciBezEsu = () => { return {data:new Readers.EkosuciBezEsu(),[gridOpts]:{
        columnMode: "full",
        searchColumns: ["bu_ci", "sk_ci", "nazev_ban", "mena_zkr", "bic"],
        rowsEnabled: function (meta) {
            return meta && meta.data && meta.data.aktivita === 100 ? true : false;
        }
    },[serverFilters]:{ aktivita: 100 },[subTaskOpts]:Gordic.Prefabs.Selector.SubTasks.Aktivita
    /* serverFilters: { aktivita: [100, 500] },[menuBar]:[{
         favorite: true, action: new GAction({
             name: "all",
             caption: "jres:31850276",  
             run: function (ev, ctx) {
                 ctx.dialogCnt.actualFilters = { aktivita: [100, 500] };
                 ctx.dialogCnt.filterData();
             }
         })
     },
     {
         favorite: true, action: new GAction({
             name: "active",
             caption: "jres:31850272",  
             run: function (ev, ctx) {
                 ctx.dialogCnt.actualFilters = { aktivita: 100 };
                 ctx.dialogCnt.filterData();
             }
         })
     },
     {
         favorite: true, action: new GAction({
             name: "nonactive",
             caption: "jres:31850275",  
             run: function (ev, ctx) {
                 ctx.dialogCnt.actualFilters = { aktivita: 500 };
                 ctx.dialogCnt.filterData();
             }
         })
     }]*/,[userSettings]:usRoot+"ekosuciBezEsu",[isolatedUserSettings]:true,[gridFormat]:newGridFormat().addTextColumn({name: "bu_ci", caption: "jres:31850283", width: 120, forced: true}).addTextColumn({name: "sk_ci", caption: "jres:31850284", width: 90}).addTextColumn({name: "nazev_ban", caption: "jres:31850285", width: 150}).addTextColumn({name: "mena_zkr", caption: "jres:31850286", width: 140}).addTextColumn({name: "bic", caption: "jres:31850061", width: 120})};};

// GReaderEkosucs.fields.js
Readers.Ekosucs = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosucs",keys:["ico","ucs"],[columns]:["ico","ucs","nazev","zkratka","rok_od","rok_do", "poznamka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekosucs.inheritsFrom(ReadersBase);
Fields.ekosucs = (prefabOptions) => { return {data:new Readers.Ekosucs(),[itemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.ucs, row.nazev);},[helperItemTemplate]:function(row) 
    {
        var dateRange = FieldFunction.getRangeString(row.rok_od, row.rok_do);
                var more = FieldFunction.getFormatedLabeledString({ "jres:31850003": row.zkratka, "jres:31850009": row.ico, "jres:31850008": dateRange });
        var info = FieldFunction.getSimpleInfoString(row.ucs, row.nazev);

        return FieldFunction.getInfoNoEncodeStr({"info": info, "more": more});

    },[helperColumns]:["ucs", "nazev", "zkratka", "ico"],[itemTooltipTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.ucs, row.nazev); },[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosucs(),prefabOptions,options)).show()};};
Selectors.ekosucs = () => { return {data:new Readers.Ekosucs(),[gridOpts]:{
        searchColumns: ["ucs", "zkratka", "nazev", "ico", "rok_od", "rok_do", "poznamka"]
    },[gridFormat]:new Gordic.Data.GridFormat().addTextColumn({ name: "ico", caption: Gordic.Consts.DbShortcuts.ico, width: 80 }).addTextColumn({ name: "ucs", caption: Gordic.Consts.DbShortcuts.ucs, width: 80 }).addTextColumn({ name: "zkratka", caption: "jres:31850003", width: 120 }).addTextColumn({ name: "nazev", caption: "jres:31850004", width: 120 }).addNumberColumn({ name: "rok_od", caption: "jres:31850081", width: 60 }).addNumberColumn({ name: "rok_do", caption: "jres:31850082", width: 60 }).addTextColumn({ name: "poznamka", caption: "jres:31850038", width: 150 }),[userSettings]:usRoot+"ekosucs",[isolatedUserSettings]:true};};

// GReaderEkosuus.fields.js
Readers.Ekosuus = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosuus",keys:["ico","ucs","uus"],[columns]:["ico", "ucs", "uus", "nazev", "zkratka", "rok_od", "rok_do", "poznamka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekosuus.inheritsFrom(ReadersBase);
Fields.ekosuus = (prefabOptions) => { return {data:new Readers.Ekosuus(),[itemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.uus, row.nazev); },[helperItemTemplate]:function(row)
    {
        var dateRange = FieldFunction.getRangeString(row.rok_od, row.rok_do);
                var more = FieldFunction.getFormatedLabeledString({ "jres:31850003": row.zkratka, "jres:31850009": row.ico, "jres:31850011": row.ucs, "jres:31850008": dateRange });
        var info = FieldFunction.getSimpleInfoString(row.uus, row.nazev);

        return FieldFunction.getInfoNoEncodeStr({ "info": info, "more": more });
    },[helperColumns]:["uus", "zkratka", "nazev", "ico", "ucs"],[itemTooltipTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.uus, row.nazev); },[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosuus(),prefabOptions,options)).show()};};
Selectors.ekosuus = () => { return {data:new Readers.Ekosuus(),[gridOpts]:{
        searchColumns: ["ico", "ucs", "uus", "nazev", "zkratka", "rok_od", "rok_do", "poznamka"]
    },[gridFormat]:new Gordic.Data.GridFormat().addTextColumn({ name: "uus", caption: Gordic.Consts.DbShortcuts.uus, width: 80 }).addTextColumn({ name: "zkratka", caption: "jres:31850003", width: 120 }).addTextColumn({ name: "nazev", caption: "jres:31850004", width: 120 }).addTextColumn({ name: "ico", caption: Gordic.Consts.DbShortcuts.ico, width: 80 })
        .addTextColumn({ name: "ucs", caption: Gordic.Consts.DbShortcuts.ucs, width: 80 }).addNumberColumn({ name: "rok_od", caption: "jres:31850081", width: 60 }).addNumberColumn({ name: "rok_do", caption: "jres:31850082", width: 60 }).addTextColumn({ name: "poznamka", caption: "jres:31850038", width: 80 }),[userSettings]:usRoot+"ekosuus",[isolatedUserSettings]:true};};

// GReaderEkosuvl.fields.js
Readers.Ekosuvl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosuvl",keys:["rok","bu_vl","sk_vl"],[columns]:["rok","bu_vl", "sk_vl", "bu_txt", "nazev", "uea_uc", "ueb_uc"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekosuvl.inheritsFrom(ReadersBase);
Fields.ekosuvl = (prefabOptions) => { return {data:new Readers.Ekosuvl(),[itemTemplate]:"{bu_vl:trim:encode} / {sk_vl:trim:encode}",[helperColumns]:["bu_vl", "sk_vl", "nazev", "uea_uc", "ueb_uc"],[helperItemTemplate]:function (row)     {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850004": row.nazev, "jres:31850062": row.uea_uc, "jres:31850063": row.ueb_uc });         var infoText = row.bu_vl + " / " + row.sk_vl;
        return FieldFunction.getInfoStr({ "info": infoText, "more": moreInfo });   
    },[itemTooltipTemplate]:"{bu_vl:trim:encode} / {sk_vl:trim:encode}",[clientFilterEvaluator]:new Gordic.Data.Filtering.BankAccountResolver(["bu_vl", "sk_vl"]),[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosuvl(),prefabOptions,options)).show()};};
Selectors.ekosuvl = () => { return {data:new Readers.Ekosuvl(),[gridOpts]:{
        searchColumns: ["typ_bu_zkr", "bu_vl", "sk_vl", "nazev", "ktg_bu_txt", "uus"]
    },[gridFormat]:new Gordic.Data.GridFormat().addTextColumn({ name: "typ_bu_zkr", caption: "jres:31850006", description: "jres:31850290", width: 30 }).addTextColumn({ name: "bu_vl", caption: "jres:31850291", width: 90 }).addTextColumn({ name: "sk_vl", caption: "jres:31850292", width: 55 }).addTextColumn({ name: "nazev", caption: "jres:31850287", width: 120 })
        .addTextColumn({ name: "ktg_bu_txt", caption: "jres:31850293", width: 120 }).addTextColumn({ name: "uus", caption: Gordic.Consts.DbShortcuts.uus, width: 40 }),[userSettings]:usRoot+"ekosuvl",[isolatedUserSettings]:true};};

// GReaderEkosvut.fields.js
Readers.Ekosvut = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosvut",keys:["vu"],[columns]:["vu","nks","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekosvut.inheritsFrom(ReadersBase);
Fields.ekosvut = (prefabOptions) => { return {data:new Readers.Ekosvut(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["vu", "nks", "nazev"],[helperItemTemplate]:function (row)
	{
	    	    var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850029": row.nks, "jres:31850030": row.vu });
	    return FieldFunction.getInfoStr({ "info": row.nazev, "more": moreInfo });
	},[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosvut(),prefabOptions,options)).show()};};
Selectors.ekosvut = () => { return {data:new Readers.Ekosvut(),[gridFormat]:new Gordic.Data.GridFormat().addTextColumn({ name: "vu", caption: "jres:31850030", width: 70 }).addTextColumn({ name: "nazev", caption: "jres:31850004", width: 150 }).addTextColumn({ name: "nks", caption: Gordic.Consts.DbShortcuts.nks, width: 70 }),[userSettings]:usRoot+"ekosvut",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["vu", "nks", "nazev"]}};};

// GReaderEkoszpo.fields.js
Readers.Ekoszpo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoszpo",keys:["kod_zdrav_poj"],[columns]:["kod_zdrav_poj","ixs_esu","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoszpo.inheritsFrom(ReadersBase);
Fields.ekoszpo = (prefabOptions) => { return {data:new Readers.Ekoszpo(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["kod_zdrav_poj", "nazev"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.kod_zdrav_poj, row.nazev, "sb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekoszpo(),prefabOptions,options)).show()};};
Selectors.ekoszpo = () => { return {data:new Readers.Ekoszpo(),[userSettings]:usRoot+"ekoszpo",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["kod_zdrav_poj", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 100, forced: true}).addTextColumn({name: "kod_zdrav_poj", caption: "jres:31850048", width: 35})};};

// GReaderEkovucl.fields.js
Readers.Ekovucl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkovucl",keys:["rok","ico","ucs","lic"],[columns]:["rok", "ico", "ucs", "lic", "nks_vl"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekovucl.inheritsFrom(ReadersBase);
Fields.ekovucl = (prefabOptions) => { return {data:new Readers.Ekovucl(),[itemTemplate]:"{nks_vl:trim:encode}",[helperColumns]:["nks_vl", "rok"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.nks_vl, row.rok, "fb"); },[itemTooltipTemplate]:"{nks_vl:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ekovucl(),prefabOptions,options)).show()};};
Selectors.ekovucl = () => { return {data:new Readers.Ekovucl(),[userSettings]:usRoot+"ekovucl",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nks_vl", "rok"]},[gridFormat]:newGridFormat().addTextColumn({name: "nks_vl", caption: "jres:31850083", width: 80, forced: true}).addNumberColumn({name: "rok", caption: "jres:31850007", width: 60})};};

// GReaderWflcstvEko.fields.js
Readers.WflcstvEko = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcstvEko",keys:["stav_vyriz"],[columns]:["stav_vyriz","stav_vyriz_eko_txt","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.WflcstvEko.inheritsFrom(ReadersBase);
Fields.wflcstvEko = (prefabOptions) => { return {data:new Readers.WflcstvEko(),[dropdown]:true,[itemTemplate]:"{stav_vyriz_eko_txt:trim:encode}",[helperColumns]:["stav_vyriz_eko_txt"],[itemTooltipTemplate]:"{stav_vyriz_eko_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcstvEko(),prefabOptions,options)).show()};};
Selectors.wflcstvEko = () => { return {data:new Readers.WflcstvEko(),[userSettings]:usRoot+"wflcstvEko",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stav_vyriz_eko_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "stav_vyriz_eko_txt", caption: "jres:31850257", width: 100, forced: true})};};

// GReaderGinsesu.fields.js
Readers.Ginsesu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsesu",keys:["ixs_esu"],[columns]:["ixs_esu", "nazev","ico","rc","oc"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsesu.inheritsFrom(ReadersBase);
Fields.ginsesu = (prefabOptions) => { return {data:new Readers.Ginsesu(),[filterMinLength]:2,[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "ico", "rc", "oc"],[helperItemTemplate]:function (row)
    {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850009": row.ico, "jres:31850058": row.rc, "jres:31850059": row.oc });
        return FieldFunction.getInfoStr({ "info": row.nazev, "more": moreInfo }); 
    },[itemTooltipTemplate]:"{nazev:trim:encode}"};};

// GReaderSzrsage.fields.js
Readers.Szrsage = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSzrsage",keys:["agenda"],[columns]:["agenda","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Szrsage.inheritsFrom(ReadersBase);
Fields.szrsage = (prefabOptions) => { return {data:new Readers.Szrsage(),[itemTemplate]:function (row) { return FieldFunction.getFormatedString([row.agenda, row.nazev], " ");},[helperColumns]:["agenda", "nazev"],[itemTooltipTemplate]:function (row) { return FieldFunction.getFormatedString([row.agenda, row.nazev], " "); },[selector]:(options) => newDefaultSelector($.extend(Selectors.szrsage(),prefabOptions,options)).show()};};
Selectors.szrsage = () => { return {data:new Readers.Szrsage(),[userSettings]:usRoot+"szrsage",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["agenda", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "agenda", caption: "jres:31850102", width: 50, forced: true}).addTextColumn({name: "nazev", caption: "jres:31850004", width: 100})};};

// GReaderSzrsagr.fields.js
Readers.Szrsagr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSzrsagr",keys:["agenda","agendova_role"],[columns]:["agenda","agendova_role","agenda_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Szrsagr.inheritsFrom(ReadersBase);
Fields.szrsagr = (prefabOptions) => { return {data:new Readers.Szrsagr(),[itemTemplate]:function (row) 
    {
        return FieldFunction.getFormatedString([row.agenda, row.agendova_role, row.nazev], " ");
    },[helperColumns]:["agenda", "agendova_role", "agenda_nazev", "nazev"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.agenda + " " + row.agendova_role, row.agenda_nazev + " - " + row.nazev, "fb"); },[itemTooltipTemplate]:function (row) {
        return FieldFunction.getFormatedString([row.agenda, row.agendova_role, row.nazev], " ");
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.szrsagr(),prefabOptions,options)).show()};};
Selectors.szrsagr = () => { return {data:new Readers.Szrsagr(),[userSettings]:usRoot+"szrsagr",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["agenda", "agendova_role", "agenda_nazev", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "agenda", caption: "jres:31850102", width: 50, forced: true}).addTextColumn({name: "agendova_role", caption: "jres:31850126", width: 50}).addTextColumn({name: "nazev_aro", caption: "jres:31850004", width: 300}).addTextColumn({name: "seznam_udaju", caption: "jres:23350029", width: 300}).addTextColumn({name: "seznam_udaju_ros", caption: "jres:23350030", width: 300})};};

// GReaderSzrsobc.fields.js
Readers.Szrsobc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSzrsobc",keys:["cast_obce_kod"],[columns]:["cast_obce_kod", "cast_obce_nazev", "obec_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Szrsobc.inheritsFrom(ReadersBase);
Fields.szrsobc = (prefabOptions) => { return {data:new Readers.Szrsobc(),[itemTemplate]:"{cast_obce_nazev:trim:encode}",[helperColumns]:["cast_obce_nazev", "obec_nazev"],[helperItemTemplate]:function (row) { return FieldFunction.getInfoStr({ "info": row.cast_obce_nazev, "more": row.obec_nazev }); },[itemTooltipTemplate]:"{cast_obce_nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.szrsobc(),prefabOptions,options)).show()};};
Selectors.szrsobc = () => { return {data:new Readers.Szrsobc(),[userSettings]:usRoot+"szrsobc",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["cast_obce_nazev", "obec_nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "cast_obce_nazev", caption: "jres:31850103", width: 100, forced: true}).addTextColumn({name: "obec_nazev", caption: "jres:31850104", width: 100})};};

// GReaderSzrsobe.fields.js
Readers.Szrsobe = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSzrsobe",keys:["obec_kod"],[columns]:["obec_kod", "obec_nazev","okres_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Szrsobe.inheritsFrom(ReadersBase);
Fields.szrsobe = (prefabOptions) => { return {data:new Readers.Szrsobe(),[itemTemplate]:"{obec_nazev:trim:encode}",[helperColumns]:["obec_nazev", "okres_nazev"],[helperItemTemplate]:function (row) { return FieldFunction.getInfoStr({ "info": row.obec_nazev, "more": row.okres_nazev }); },[itemTooltipTemplate]:"{obec_nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.szrsobe(),prefabOptions,options)).show()};};
Selectors.szrsobe = () => { return {data:new Readers.Szrsobe(),[userSettings]:usRoot+"szrsobe",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["obec_nazev", "okres_nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "obec_nazev", caption: "jres:31850104", width: 100, forced: true}).addTextColumn({name: "okres_nazev", caption: "jres:31850105", width: 100})};};

// GReaderSzrsokr.fields.js
Readers.Szrsokr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSzrsokr",keys:["okres_kod"],[columns]:["okres_kod", "okres_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Szrsokr.inheritsFrom(ReadersBase);
Fields.szrsokr = (prefabOptions) => { return {data:new Readers.Szrsokr(),[itemTemplate]:"{okres_nazev:trim:encode}",[helperColumns]:["okres_nazev"],[itemTooltipTemplate]:"{okres_nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.szrsokr(),prefabOptions,options)).show()};};
Selectors.szrsokr = () => { return {data:new Readers.Szrsokr(),[userSettings]:usRoot+"szrsokr",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["okres_nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "okres_nazev", caption: "jres:31850105", width: 100, forced: true})};};

// GReaderSzrsprf.fields.js
Readers.Szrsprf = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSzrsprf",keys:["kod_pravni_formy"],[columns]:["kod_pravni_formy","nazev_prav_formy","cas_odpovedi","aktivita","dat_zmena","zmenu_prov","typ_org"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Szrsprf.inheritsFrom(ReadersBase);
Fields.szrsprf = (prefabOptions) => { return {data:new Readers.Szrsprf(),[itemTemplate]:"{nazev_prav_formy:trim:encode}",[helperColumns]:["kod_pravni_formy", "nazev_prav_formy"],[helperItemTemplate]:function (row) {
                                var moreInfo = FieldFunction.getFormatedLabeledString({
            "jres:23350022": row.kod_pravni_formy         });

                        return FieldFunction.getInfoStr({
            info: row.nazev_prav_formy,
            more: moreInfo
        });
    },[itemTooltipTemplate]:"{nazev_prav_formy:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.szrsprf(),prefabOptions,options)).show()};};
Selectors.szrsprf = () => { return {data:new Readers.Szrsprf(),[userSettings]:usRoot+"szrsprf",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["kod_pravni_formy", "nazev_prav_formy"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev_prav_formy", caption: "jres:23350021", width: 100, forced: true})};};

// GReaderSzrspsc.fields.js
Readers.Szrspsc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSzrspsc",keys:["posta_kod"],[columns]:["posta_kod","posta_nazev","psc"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Szrspsc.inheritsFrom(ReadersBase);
Fields.szrspsc = (prefabOptions) => { return {data:new Readers.Szrspsc(),[itemTemplate]:function (row) { return FieldFunction.getFormatedString([row.psc, row.posta_nazev], " "); },[helperColumns]:["psc", "posta_nazev"],[itemTooltipTemplate]:function (row) { return FieldFunction.getFormatedString([row.psc, row.posta_nazev], " "); },[selector]:(options) => newDefaultSelector($.extend(Selectors.szrspsc(),prefabOptions,options)).show()};};
Selectors.szrspsc = () => { return {data:new Readers.Szrspsc(),[userSettings]:usRoot+"szrspsc",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["psc", "posta_nazev"]},[gridFormat]:newGridFormat().addNumberColumn({name: "posta_kod", caption: "jres:31850069", width: 30, forced: true}).addTextColumn({name: "posta_nazev", caption: "jres:31850070", width: 100})};};

// GReaderSzrsuli.fields.js
Readers.Szrsuli = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSzrsuli",keys:["ulice_kod"],[columns]:["ulice_kod","ulice_nazev","obec_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Szrsuli.inheritsFrom(ReadersBase);
Fields.szrsuli = (prefabOptions) => { return {data:new Readers.Szrsuli(),[itemTemplate]:"{ulice_nazev:trim:encode}",[helperColumns]:["ulice_nazev", "obec_nazev"],[helperItemTemplate]:function (row) { return FieldFunction.getInfoStr({ "info": row.ulice_nazev, "more": row.obec_nazev }); },[itemTooltipTemplate]:"{ulice_nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.szrsuli(),prefabOptions,options)).show()};};
Selectors.szrsuli = () => { return {data:new Readers.Szrsuli(),[userSettings]:usRoot+"szrsuli",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ulice_nazev", "obec_nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "ulice_nazev", caption: "jres:31850109", width: 100, forced: true}).addTextColumn({name: "obec_nazev", caption: "jres:31850104", width: 100})};};

// GReaderEvzsden.fields.js
Readers.Evzsden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEvzsden",keys:["ixp_den"],[columns]:["ixp_den","nazev","rok"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Evzsden.inheritsFrom(ReadersBase);
Fields.evzsden = (prefabOptions) => { return {data:new Readers.Evzsden(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "rok"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.nazev, row.rok, "fb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.evzsden(),prefabOptions,options)).show()};};
Selectors.evzsden = () => { return {data:new Readers.Evzsden(),[userSettings]:usRoot+"evzsden",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "rok"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 120, forced: true}).addNumberColumn({name: "rok", caption: "jres:31850007", width: 60})};};

// GReaderFucckat.fields.js
Readers.Fucckat = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFucckat",keys:["ktg_typ"],[columns]:["ktg_typ","ktg_typ_txt","ktg_upr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fucckat.inheritsFrom(ReadersBase);
Fields.fucckat = (prefabOptions) => { return {data:new Readers.Fucckat(),[dropdown]:true,[itemTemplate]:"{ktg_typ_txt:trim:encode}",[helperColumns]:["ktg_typ_txt"],[itemTooltipTemplate]:"{ktg_typ_txt:trim:encode}"};};

// GReaderFuccsza.fields.js
Readers.Fuccsza = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFuccsza",keys:["s_zau"],[columns]:["s_zau","s_zau_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fuccsza.inheritsFrom(ReadersBase);
Fields.fuccsza = (prefabOptions) => { return {data:new Readers.Fuccsza(),[dropdown]:true,[itemTemplate]:"{s_zau_txt:trim:encode}",[helperColumns]:["s_zau_txt"],[itemTooltipTemplate]:"{s_zau_txt:trim:encode}"};};

// GReaderFucctup.fields.js
Readers.Fucctup = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFucctup",keys:["typ_upo"],[columns]:["typ_upo","typ_upo_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fucctup.inheritsFrom(ReadersBase);
Fields.fucctup = (prefabOptions) => { return {data:new Readers.Fucctup(),[dropdown]:true,[itemTemplate]:"{typ_upo_txt:trim:encode}",[helperColumns]:["typ_upo_txt"],[itemTooltipTemplate]:"{typ_upo_txt:trim:encode}"};};

// GReaderFuccupo.fields.js
Readers.Fuccupo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFuccupo",keys:["ktg_upo"],[columns]:["ktg_upo","ktg_upo_txt","druh_upo"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fuccupo.inheritsFrom(ReadersBase);
Fields.fuccupo = (prefabOptions) => { return {data:new Readers.Fuccupo(),[dropdown]:true,[itemTemplate]:"{ktg_upo_txt:trim:encode}",[helperColumns]:["ktg_upo", "ktg_upo_txt"],[itemTooltipTemplate]:"{ktg_upo_txt:trim:encode}"};};

// GReaderFuccupr.fields.js
Readers.Fuccupr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFuccupr",keys:["ktg_upr"],[columns]:["ktg_upr", "ktg_upr_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Fuccupr.inheritsFrom(ReadersBase);
Fields.fuccupr = (prefabOptions) => { return {data:new Readers.Fuccupr(),[dropdown]:true,[itemTemplate]:"{ktg_upr_txt:trim:encode}",[helperColumns]:["ktg_upr_txt"],[itemTooltipTemplate]:"{ktg_upr_txt:trim:encode}"};};

// GReaderFucsden.fields.js
Readers.Fucsden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFucsden",keys:["ixp_den"],[columns]:["ixp_den", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Fucsden.inheritsFrom(ReadersBase);
Fields.fucsden = (prefabOptions) => { return {data:new Readers.Fucsden(),[dropdown]:true,[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[itemTooltipTemplate]:"{nazev:trim:encode}"};};

// GReaderFucstup.fields.js
Readers.Fucstup = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderFucstup",keys:["typ_upr"],[columns]:["typ_upr","nazev_upr"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Fucstup.inheritsFrom(ReadersBase);
Fields.fucstup = (prefabOptions) => { return {data:new Readers.Fucstup(),[itemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.typ_upr, row.nazev_upr);},[helperColumns]:["typ_upr", "nazev_upr"],[itemTooltipTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.typ_upr, row.nazev_upr); }};};

// GReaderBankovniPobocky.fields.js
Readers.BankovniPobocky = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderBankovniPobocky",keys:["ixs_esu"],[columns]:["ixs_esu", "nazev","esu_txt","ob_jmeno","zkratka","sk","bic"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.BankovniPobocky.inheritsFrom(ReadersBase);
Fields.bankovniPobocky = (prefabOptions) => { return {data:new Readers.BankovniPobocky(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "esu_txt", "ob_jmeno", "zkratka", "sk", "bic"],[helperItemTemplate]:function (row) {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850026": row.esu_txt, "jres:31850003": row.zkratka, "jres:31850060": row.sk, "jres:31850061": row.bic});
        return FieldFunction.getInfoStr({ "info": row.ob_jmeno, "more": moreInfo });
    },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.bankovniPobocky(),prefabOptions,options)).show()};};
Selectors.bankovniPobocky = () => { return {data:new Readers.BankovniPobocky(),[userSettings]:usRoot+"bankovniPobocky",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "esu_txt", "ob_jmeno", "zkratka", "sk", "bic"]},[gridFormat]:newGridFormat().addTextColumn({name: "sk", caption: "jres:31850060", width: 50, forced: true}).addTextColumn({name: "zkratka", caption: "jres:31850003", width: 50}).addTextColumn({name: "ob_jmeno", caption: "jres:31850004", width: 100}).addTextColumn({name: "esu_txt", caption: "jres:31850026", width: 200}).addTextColumn({name: "bic", caption: "jres:31850061", width: 70})};};

// GReaderGincadr.fields.js
Readers.Gincadr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincadr",keys:["typ_adr"],[columns]:["typ_adr","typ_adr_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincadr.inheritsFrom(ReadersBase);
Fields.gincadr = (prefabOptions) => { return {data:new Readers.Gincadr(),[itemTemplate]:"{typ_adr_txt}",[helperColumns]:["typ_adr", "typ_adr_txt"]};};

// GReaderGincakt.fields.js
Readers.Gincakt = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincakt",keys:["aktivita"],[columns]:["aktivita","aktivita_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincakt.inheritsFrom(ReadersBase);
Fields.gincakt = (prefabOptions) => { return {data:new Readers.Gincakt(),[itemTemplate]:"{aktivita_txt:trim:encode}",[helperColumns]:["aktivita", "aktivita_txt"],[itemTooltipTemplate]:"{aktivita_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincakt(),prefabOptions,options)).show()};};
Selectors.gincakt = () => { return {data:new Readers.Gincakt(),[userSettings]:usRoot+"gincakt",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["aktivita", "aktivita_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "aktivita", caption: "jres:29924152", width: 150, forced: true}).addTextColumn({name: "aktivita_txt", caption: "jres:29924154", width: 300}).addNumberColumn({name: "k_v", caption: "jres:29924156", width: 150}).addNumberColumn({name: "aktivita_rsx", caption: "jres:29924153", width: 150})};};

// GReaderGincbla.fields.js
Readers.Gincbla = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincbla",keys:["priz_blg_all"],[columns]:["priz_blg_all", "priz_blg_all_txt", "k_v", "k_s", "k_xml", "priz_blg_all_rsx"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincbla.inheritsFrom(ReadersBase);
Fields.gincbla = (prefabOptions) => { return {data:new Readers.Gincbla(),[itemTemplate]:"{priz_blg_all_txt:trim:encode}",[helperColumns]:["priz_blg_all", "priz_blg_all_txt", "k_v", "k_s", "k_xml", "priz_blg_all_rsx"]};};

// GReaderGincblg.fields.js
Readers.Gincblg = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincblg",keys:["typ_blg"],[columns]:["typ_blg","typ_blg_txt"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Gincblg.inheritsFrom(ReadersBase);
Fields.gincblg = (prefabOptions) => { return {data:new Readers.Gincblg(),[itemTemplate]:"{typ_blg_txt:trim:encode}",[helperColumns]:["typ_blg", "typ_blg_txt"],[itemTooltipTemplate]:"{typ_blg_txt:trim:encode}"};};

// GReaderGincbud.fields.js
Readers.Gincbud = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincbud",keys:["budova_druh"],[columns]:["budova_druh","budova_druh_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincbud.inheritsFrom(ReadersBase);
Fields.gincbud = (prefabOptions) => { return {data:new Readers.Gincbud(),[itemTemplate]:"{budova_druh_txt:trim:encode}",[helperColumns]:["budova_druh", "budova_druh_txt"],[itemTooltipTemplate]:"{budova_druh_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincbud(),prefabOptions,options)).show()};};
Selectors.gincbud = () => { return {data:new Readers.Gincbud(),[userSettings]:usRoot+"gincbud",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["budova_druh", "budova_druh_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "budova_druh_txt", caption: "jres:31850022", width: 100, forced: true})};};

// GReaderGincclb.fields.js
Readers.Gincclb = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincclb",keys:["priorita_clb"],[columns]:["priorita_clb","priorita_clb_txt"],[rowSize]:100,[readAll]:false,[dropdown]:true,[permanent]:false}, options); };
Readers.Gincclb.inheritsFrom(ReadersBase);
Fields.gincclb = (prefabOptions) => { return {data:new Readers.Gincclb(),[itemTemplate]:"{priorita_clb_txt:trim:encode}",[helperColumns]:["priorita_clb", "priorita_clb_txt"],[itemTooltipTemplate]:"{priorita_clb_txt:trim:encode}"};};

// GReaderGincdph.fields.js
Readers.Gincdph = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincdph",keys:["priz_dph"],[columns]:["priz_dph", "priz_dph_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincdph.inheritsFrom(ReadersBase);
Fields.gincdph = (prefabOptions) => { return {data:new Readers.Gincdph(),[dropdown]:true,[itemTemplate]:"{priz_dph_txt:trim:encode}",[helperColumns]:["priz_dph_txt"],[helperItemTemplate]:"{priz_dph_txt:encode:trim}",[itemTooltipTemplate]:"{priz_dph_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincdph(),prefabOptions,options)).show()};};
Selectors.gincdph = () => { return {data:new Readers.Gincdph(),[userSettings]:usRoot+"gincdph",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_dph_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "priz_dph_txt", caption: "jres:31850195", width: 100, forced: true})};};

// GReaderGincesu.fields.js
Readers.Gincesu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincesu",keys:["typ_esu"],[columns]:["typ_esu", "typ_esu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincesu.inheritsFrom(ReadersBase);
Fields.gincesu = (prefabOptions) => { return {data:new Readers.Gincesu(),[dropdown]:true,[itemTemplate]:"{typ_esu_txt:trim:encode}",[helperColumns]:["typ_esu_txt"],[itemTooltipTemplate]:"{typ_esu_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincesu(),prefabOptions,options)).show()};};
Selectors.gincesu = () => { return {data:new Readers.Gincesu(),[userSettings]:usRoot+"gincesu",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_esu_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_esu_txt", caption: "jres:31850196", width: 100, forced: true})};};

// GReaderGincfaz.fields.js
Readers.Gincfaz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincfaz",keys:["faze"],[columns]:["faze", "faze_txt", "submodel", "priz_ext", "priz_gentag"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincfaz.inheritsFrom(ReadersBase);
Fields.gincfaz = (prefabOptions) => { return {data:new Readers.Gincfaz(),[itemTemplate]:"{faze:trim:encode}",[helperColumns]:["faze", "faze_txt", "submodel"],[helperItemTemplate]:function (row) {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850004": row.faze_txt, "jres:31850028": row.submodel });
        return FieldFunction.getInfoStr({ "info": row.faze, "more": moreInfo });
    },[itemTooltipTemplate]:"{faze:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincfaz(),prefabOptions,options)).show()};};
Selectors.gincfaz = () => { return {data:new Readers.Gincfaz(),[userSettings]:usRoot+"gincfaz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["faze", "faze_txt", "submodel"]},[gridFormat]:newGridFormat().addTextColumn({name: "faze", caption: "jres:31850135", width: 80, forced: true}).addTextColumn({name: "faze_txt", caption: "jres:31850134", width: 160}).addTextColumn({name: "submodel", caption: "jres:31850028", width: 40})};};

// GReaderGincisr.fields.js
Readers.Gincisr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincisr",keys:["druh_stav_rizeni"],[columns]:["druh_stav_rizeni", "druh_stav_r_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincisr.inheritsFrom(ReadersBase);
Fields.gincisr = (prefabOptions) => { return {data:new Readers.Gincisr(),[dropdown]:true,[itemTemplate]:"{druh_stav_r_txt:trim:encode}",[helperColumns]:["druh_stav_r_txt"],[itemTooltipTemplate]:"{druh_stav_r_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincisr(),prefabOptions,options)).show()};};
Selectors.gincisr = () => { return {data:new Readers.Gincisr(),[userSettings]:usRoot+"gincisr",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["druh_stav_r_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "druh_stav_r_txt", caption: "jres:31850250", width: 100, forced: true})};};

// GReaderGinckat.fields.js
Readers.Ginckat = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinckat",keys:["ktg_typ"],[columns]:["ktg_typ", "ktg_typ_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginckat.inheritsFrom(ReadersBase);
Fields.ginckat = (prefabOptions) => { return {data:new Readers.Ginckat(),[itemTemplate]:"{ktg_typ_txt:trim:encode}",[helperColumns]:["ktg_typ_txt"],[itemTooltipTemplate]:"{ktg_typ_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginckat(),prefabOptions,options)).show()};};
Selectors.ginckat = () => { return {data:new Readers.Ginckat(),[userSettings]:usRoot+"ginckat",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ktg_typ_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "ktg_typ_txt", caption: "jres:31850316", width: 100, forced: true}).addNumberColumn({name: "typ_ag", caption: "jres:31850317", width: 70}).addTextColumn({name: "spis_pl", caption: "jres:31850264", width: 70}).addTextColumn({name: "spis_znak", caption: "jres:31850318", width: 100})};};

// GReaderGincmej.fields.js
Readers.Gincmej = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincmej",keys:["mj"],[columns]:["mj","mj_txt","mj_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincmej.inheritsFrom(ReadersBase);
Fields.gincmej = (prefabOptions) => { return {data:new Readers.Gincmej(),[itemTemplate]:"{mj_zkr:trim:encode}",[helperColumns]:["mj_zkr", "mj", "mj_txt"],[helperItemTemplate]:function (row)
    {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850027": row.mj, "jres:31850004": row.mj_txt });
        return FieldFunction.getInfoStr({ "info": row.mj_zkr, "more": moreInfo });
    },[itemTooltipTemplate]:"{mj_zkr:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincmej(),prefabOptions,options)).show()};};
Selectors.gincmej = () => { return {data:new Readers.Gincmej(),[userSettings]:usRoot+"gincmej",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["mj_zkr", "mj", "mj_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "mj", caption: "jres:31850128", width: 40, forced: true}).addTextColumn({name: "mj_zkr", caption: "jres:31850003", width: 40}).addTextColumn({name: "mj_txt", caption: "jres:31850004", width: 200})};};

// GReaderGincokr.fields.js
Readers.Gincokr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincokr",keys:["id_okres"],[columns]:["id_okres","id_okres_txt","id_okres_zkr","id_kraj","kod_okr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincokr.inheritsFrom(ReadersBase);
Fields.gincokr = (prefabOptions) => { return {data:new Readers.Gincokr(),[itemTemplate]:"{id_okres_txt:trim:encode}",[helperColumns]:["id_okres", "id_okres_txt", "id_okres_zkr", "id_kraj", "kod_okr"],[itemTooltipTemplate]:"{id_okres_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincokr(),prefabOptions,options)).show()};};
Selectors.gincokr = () => { return {data:new Readers.Gincokr(),[userSettings]:usRoot+"gincokr",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["id_okres", "id_okres_txt", "id_okres_zkr", "id_kraj", "kod_okr"]},[gridFormat]:newGridFormat().addTextColumn({name: "id_okres", caption: "jres:31850339", width: 100, forced: true}).addTextColumn({name: "id_okres_txt", caption: "jres:31850340", width: 100}).addTextColumn({name: "id_okres_zkr", caption: "jres:31850003", width: 100}).addTextColumn({name: "id_kraj", caption: "jres:31850341", width: 100}).addNumberColumn({name: "kod_okr", caption: "jres:31850342", width: 100})};};

// GReaderGincose.fields.js
Readers.Gincose = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincose",keys:["oauth_service"],[columns]:["oauth_service","oauth_service_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincose.inheritsFrom(ReadersBase);
Fields.gincose = (prefabOptions) => { return {data:new Readers.Gincose(),[dropdown]:true,[itemTemplate]:"{oauth_service_txt:trim:encode}",[helperColumns]:["oauth_service_txt"],[itemTooltipTemplate]:"{oauth_service_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincose(),prefabOptions,options)).show()};};
Selectors.gincose = () => { return {data:new Readers.Gincose(),[userSettings]:usRoot+"gincose",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["oauth_service_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "oauth_service_txt", caption: "jres:23350047", width: 160, forced: true})};};

// GReaderGincpai.fields.js
Readers.Gincpai = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincpai",keys:["partner_iissp"],[columns]:["partner_iissp","partner_uct","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincpai.inheritsFrom(ReadersBase);
Fields.gincpai = (prefabOptions) => { return {data:new Readers.Gincpai(),[itemTemplate]:"{partner_uct:trim:encode}",[helperColumns]:["partner_uct", "partner_iissp", "nazev"],[helperItemTemplate]:function (row) 
    {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850004": row.nazev, "jres:31850017": row.partner_iissp });
        return FieldFunction.getInfoStr({ "info": row.partner_uct, "more": moreInfo })
            },[itemTooltipTemplate]:"{partner_uct:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincpai(),prefabOptions,options)).show()};};
Selectors.gincpai = () => { return {data:new Readers.Gincpai(),[userSettings]:usRoot+"gincpai",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["partner_uct", "partner_iissp", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "partner_iissp", caption: "jres:31850114", width: 45, forced: true}).addTextColumn({name: "partner_uct", caption: "jres:31850115", width: 45}).addTextColumn({name: "nazev", caption: "jres:31850004", width: 300})};};

// GReaderGincpan.fields.js
Readers.Gincpan = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincpan",keys:["priz_an"],[columns]:["priz_an", "priz_an_txt"],[rowSize]:50,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Gincpan.inheritsFrom(ReadersBase);
Fields.gincpan = (prefabOptions) => { return {data:new Readers.Gincpan(),[dropdown]:true,[itemTemplate]:"{priz_an_txt:trim:encode}",[helperColumns]:["priz_an_txt"],[itemTooltipTemplate]:"{priz_an_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincpan(),prefabOptions,options)).show()};};
Selectors.gincpan = () => { return {data:new Readers.Gincpan(),[userSettings]:usRoot+"gincpan",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_an_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "priz_an_txt", caption: "jres:31850198", width: 100, forced: true})};};

// GReaderGincpdd.fields.js
Readers.Gincpdd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincpdd",keys:["priz_dd"],[columns]:["priz_dd", "priz_dd_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincpdd.inheritsFrom(ReadersBase);
Fields.gincpdd = (prefabOptions) => { return {data:new Readers.Gincpdd(),[dropdown]:true,[itemTemplate]:"{priz_dd_txt:trim:encode}",[helperColumns]:["priz_dd_txt"],[itemTooltipTemplate]:"{priz_dd_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincpdd(),prefabOptions,options)).show()};};
Selectors.gincpdd = () => { return {data:new Readers.Gincpdd(),[userSettings]:usRoot+"gincpdd",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_dd_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "priz_dd_txt", caption: "jres:31850260", width: 100, forced: true})};};

// GReaderGincpfo.fields.js
Readers.Gincpfo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincpfo",keys:["pr_forma"],[columns]:["pr_forma","pr_forma_txt","dat_od","dat_akt","pr_forma_def"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincpfo.inheritsFrom(ReadersBase);
Fields.gincpfo = (prefabOptions) => { return {data:new Readers.Gincpfo(),[itemTemplate]:"{pr_forma_txt:trim:encode}",[helperColumns]:["pr_forma_txt"],[itemTooltipTemplate]:"{pr_forma_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincpfo(),prefabOptions,options)).show()};};
Selectors.gincpfo = () => { return {data:new Readers.Gincpfo(),[userSettings]:usRoot+"gincpfo",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["pr_forma_txt"]},[gridFormat]:newGridFormat().add({name: "pr_forma", caption: "jres:31850333", width: 50, forced: true}).add({name: "pr_forma_txt", caption: "jres:31850334", width: 200}).add({name: "dat_od", caption: "jres:31850152", width: 50}).add({name: "dat_akt", caption: "jres:31850336", width: 50}).add({name: "pr_forma_def", caption: "jres:31850335", width: 200})};};

// GReaderGincpoh.fields.js
Readers.Gincpoh = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincpoh",keys:["pohlavi"],[columns]:["pohlavi", "pohlavi_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincpoh.inheritsFrom(ReadersBase);
Fields.gincpoh = (prefabOptions) => { return {data:new Readers.Gincpoh(),[dropdown]:true,[itemTemplate]:"{pohlavi_txt:trim:encode}",[helperColumns]:["pohlavi_txt"],[itemTooltipTemplate]:"{pohlavi_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincpoh(),prefabOptions,options)).show()};};
Selectors.gincpoh = () => { return {data:new Readers.Gincpoh(),[userSettings]:usRoot+"gincpoh",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["pohlavi_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "pohlavi_txt", caption: "jres:31850245", width: 100, forced: true})};};

// GReaderGincpss.fields.js
Readers.Gincpss = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincpss",keys:["priz_ssu"],[columns]:["priz_ssu", "priz_ssu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincpss.inheritsFrom(ReadersBase);
Fields.gincpss = (prefabOptions) => { return {data:new Readers.Gincpss(),[dropdown]:true,[itemTemplate]:"{priz_ssu_txt:trim:encode}",[helperColumns]:["priz_ssu_txt"],[itemTooltipTemplate]:"{priz_ssu_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincpss(),prefabOptions,options)).show()};};
Selectors.gincpss = () => { return {data:new Readers.Gincpss(),[userSettings]:usRoot+"gincpss",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_ssu_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "priz_ssu_txt", caption: "jres:31850202", width: 100, forced: true})};};

// GReaderGincrzd.fields.js
Readers.Gincrzd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincrzd",keys:["typ_rzd"],[columns]:["typ_rzd", "typ_rzd_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincrzd.inheritsFrom(ReadersBase);
Fields.gincrzd = (prefabOptions) => { return {data:new Readers.Gincrzd(),[dropdown]:true,[itemTemplate]:"{typ_rzd_txt:trim:encode}",[helperColumns]:["typ_rzd_txt"],[itemTooltipTemplate]:"{typ_rzd_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincrzd(),prefabOptions,options)).show()};};
Selectors.gincrzd = () => { return {data:new Readers.Gincrzd(),[userSettings]:usRoot+"gincrzd",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_rzd_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_rzd_txt", caption: "jres:31850203", width: 100, forced: true})};};

// GReaderGincses.fields.js
Readers.Gincses = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincses",keys:["stupen_ver"],[columns]:["stupen_ver", "stav_ver_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincses.inheritsFrom(ReadersBase);
Fields.gincses = (prefabOptions) => { return {data:new Readers.Gincses(),[dropdown]:true,[itemTemplate]:"{stav_ver_txt:trim:encode}",[helperColumns]:["stav_ver_txt"],[itemTooltipTemplate]:"{stav_ver_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincses(),prefabOptions,options)).show()};};
Selectors.gincses = () => { return {data:new Readers.Gincses(),[userSettings]:usRoot+"gincses",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stav_ver_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "stav_ver_txt", caption: "jres:31850204", width: 100, forced: true})};};

// GReaderGincssu.fields.js
Readers.Gincssu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincssu",keys:["typ_ssu"],[columns]:["typ_ssu", "typ_ssu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincssu.inheritsFrom(ReadersBase);
Fields.gincssu = (prefabOptions) => { return {data:new Readers.Gincssu(),[dropdown]:true,[itemTemplate]:"{typ_ssu_txt:trim:encode}",[helperColumns]:["typ_ssu_txt"],[itemTooltipTemplate]:"{typ_ssu_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincssu(),prefabOptions,options)).show()};};
Selectors.gincssu = () => { return {data:new Readers.Gincssu(),[userSettings]:usRoot+"gincssu",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_ssu_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_ssu_txt", caption: "jres:31850205", width: 100, forced: true})};};

// GReaderGincsta.fields.js
Readers.Gincsta = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincsta",keys:["stat"],[columns]:["stat", "stat_txt", "stat_txt_orig", "stat_sis_aa"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincsta.inheritsFrom(ReadersBase);
Fields.gincsta = (prefabOptions) => { return {data:new Readers.Gincsta(),[itemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.stat_txt, row.stat_sis_aa);},[helperColumns]:["stat_txt", "stat_sis_aa"],[itemTooltipTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.stat_txt, row.stat_sis_aa); },[selector]:(options) => newDefaultSelector($.extend(Selectors.gincsta(),prefabOptions,options)).show()};};
Selectors.gincsta = () => { return {data:new Readers.Gincsta(),[gridOpts]:{
        searchColumns: ["stat_txt", "stat_txt_orig", "stat_sis_aa"]
    },[userSettings]:usRoot+"gincsta",[isolatedUserSettings]:true,[gridFormat]:newGridFormat().addTextColumn({name: "stat_txt", caption: "jres:31850076", width: 120, forced: true}).addTextColumn({name: "stat_sis_aa", caption: "jres:31850003", width: 80}).addTextColumn({name: "stat_txt_orig", caption: "jres:31850077", width: 120})};};

// GReaderGincstu.fields.js
Readers.Gincstu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincstu",keys:["st_utaj_id"],[columns]:["st_utaj_id", "st_utaj_id_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincstu.inheritsFrom(ReadersBase);
Fields.gincstu = (prefabOptions) => { return {data:new Readers.Gincstu(),[dropdown]:true,[graphicInput]:"hidden",[itemTemplate]:"{st_utaj_id_txt:trim:encode}",[helperColumns]:["st_utaj_id_txt"],[itemTooltipTemplate]:"{st_utaj_id_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.gincstu(),prefabOptions,options)).show()};};
Selectors.gincstu = () => { return {data:new Readers.Gincstu(),[userSettings]:usRoot+"gincstu",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["st_utaj_id_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "st_utaj_id_txt", caption: "jres:31850165", width: 100, forced: true})};};

// GReaderGinctag.fields.js
Readers.Ginctag = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinctag",keys:["typ_ag"],[columns]:["typ_ag", "typ_ag_txt","zkr_ag"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginctag.inheritsFrom(ReadersBase);
Fields.ginctag = (prefabOptions) => { return {data:new Readers.Ginctag(),[dropdown]:true,[itemTemplate]:"{zkr_ag:trim:encode}",[helperColumns]:["zkr_ag", "typ_ag_txt"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.zkr_ag, row.typ_ag_txt, "fb"); },[itemTooltipTemplate]:"{zkr_ag:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginctag(),prefabOptions,options)).show()};};
Selectors.ginctag = () => { return {data:new Readers.Ginctag(),[userSettings]:usRoot+"ginctag",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zkr_ag", "typ_ag_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "zkr_ag", caption: "jres:31850156", width: 30, forced: true}).addTextColumn({name: "typ_ag_txt", caption: "jres:31850157", width: 120})};};

// GReaderGincted.fields.js
Readers.Gincted = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGincted",keys:["typ_ed"],[columns]:["typ_ed","typ_ed_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Gincted.inheritsFrom(ReadersBase);
Fields.gincted = (prefabOptions) => { return {data:new Readers.Gincted(),[dropdown]:true,[itemTemplate]:"{typ_ed} - {typ_ed_txt}",[helperColumns]:["typ_ed", "typ_ed_txt"]};};

// GReaderGinctem.fields.js
Readers.Ginctem = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinctem",keys:["tema"],[columns]:["tema","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginctem.inheritsFrom(ReadersBase);
Fields.ginctem = (prefabOptions) => { return {data:new Readers.Ginctem(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "tema"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.nazev, row.tema, "fb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginctem(),prefabOptions,options)).show()};};
Selectors.ginctem = () => { return {data:new Readers.Ginctem(),[userSettings]:usRoot+"ginctem",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "tema"]},[gridFormat]:newGridFormat().addTextColumn({name: "tema", caption: "jres:31850112", width: 80, forced: true}).addTextColumn({name: "nazev", caption: "jres:31850004", width: 200})};};

// GReaderGinctps.fields.js
Readers.Ginctps = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinctps",keys:["typ_prist_sfu"],[columns]:["typ_prist_sfu","typ_prist_sfu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginctps.inheritsFrom(ReadersBase);
Fields.ginctps = (prefabOptions) => { return {data:new Readers.Ginctps(),[itemTemplate]:"{typ_prist_sfu_txt:trim:encode}",[helperColumns]:["typ_prist_sfu", "typ_prist_sfu_txt"],[itemTooltipTemplate]:"{typ_prist_sfu_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginctps(),prefabOptions,options)).show()};};
Selectors.ginctps = () => { return {data:new Readers.Ginctps(),[userSettings]:usRoot+"ginctps",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_prist_sfu", "typ_prist_sfu_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "typ_prist_sfu", caption: "jres:29925688", width: 150, forced: true}).addTextColumn({name: "typ_prist_sfu_txt", caption: "jres:29925689", width: 300})};};

// GReaderGinctyo.fields.js
Readers.Ginctyo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinctyo",keys:["typ_org"],[columns]:["typ_org", "typ_isdsorg_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginctyo.inheritsFrom(ReadersBase);
Fields.ginctyo = (prefabOptions) => { return {data:new Readers.Ginctyo(),[dropdown]:true,[itemTemplate]:"{typ_isdsorg_txt:trim:encode}",[helperColumns]:["typ_isdsorg_txt"],[itemTooltipTemplate]:"{typ_isdsorg_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginctyo(),prefabOptions,options)).show()};};
Selectors.ginctyo = () => { return {data:new Readers.Ginctyo(),[userSettings]:usRoot+"ginctyo",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_isdsorg_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_org_txt", caption: "jres:31850263", width: 100, forced: true})};};

// GReaderGinsblg.fields.js
Readers.Ginsblg = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsblg",keys:["ixs_blg"],[columns]:["ixs_blg", "nazev", "typ_blg", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Ginsblg.inheritsFrom(ReadersBase);
Fields.ginsblg = (prefabOptions) => { return {data:new Readers.Ginsblg(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[itemTooltipTemplate]:"{nazev:trim:encode}"};};

// GReaderGinsbud.fields.js
Readers.Ginsbud = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsbud",keys:["ico","budova_kod"],[columns]:["ico", "budova_kod","budova_naz"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsbud.inheritsFrom(ReadersBase);
Fields.ginsbud = (prefabOptions) => { return {data:new Readers.Ginsbud(),[itemTemplate]:"{budova_naz:trim:encode}",[helperColumns]:["budova_kod", "budova_naz"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.budova_naz, row.budova_kod, "fb"); },[itemTooltipTemplate]:"{budova_naz:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsbud(),prefabOptions,options)).show()};};
Selectors.ginsbud = () => { return {data:new Readers.Ginsbud(),[userSettings]:usRoot+"ginsbud",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["budova_kod", "budova_naz"]},[gridFormat]:newGridFormat().addTextColumn({name: "budova_naz", caption: "jres:31850020", width: 150, forced: true})};};

// GReaderGinscis.fields.js
Readers.Ginscis = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinscis",keys:["ixs_cis"],[columns]:["ixs_cis", "nazev","zkratka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginscis.inheritsFrom(ReadersBase);
Fields.ginscis = (prefabOptions) => { return {data:new Readers.Ginscis(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "zkratka"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.nazev, row.zkratka, "fb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginscis(),prefabOptions,options)).show()};};
Selectors.ginscis = () => { return {data:new Readers.Ginscis(),[userSettings]:usRoot+"ginscis",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "zkratka"]},[gridFormat]:newGridFormat().addTextColumn({name: "zkratka", caption: "jres:31850003", width: 70, forced: true}).addTextColumn({name: "nazev", caption: "jres:31850004", width: 140})};};

// GReaderGinscisCiselnik.fields.js
Readers.GinscisCiselnik = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinscisCiselnik",keys:["klic"],[columns]:["klic","hodnota"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.GinscisCiselnik.inheritsFrom(ReadersBase);
Fields.ginscisCiselnik = (IxsCis,prefabOptions) => { return {data:new Readers.GinscisCiselnik({ readerParams: { IxsCis: IxsCis } }),[itemTemplate]:"{hodnota:trim:encode}",[helperItemTemplate]:function (row) {
        return FieldFunction.getSingleLineLeftRightInfo({ left: FieldFunction.getTrimEncodeString(row.hodnota), right: "("+FieldFunction.getTrimEncodeString(row.klic)+")", mini:true });/* "{hodnota:trim:encode} <i class='faded-out'>- {klic:trim:encode}</i>"*/ },[helperColumns]:["klic","hodnota"],[itemTooltipTemplate]:"{hodnota:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginscisCiselnik(IxsCis),prefabOptions,options)).show()};};
Selectors.ginscisCiselnik = (IxsCis) => { return {data:new Readers.GinscisCiselnik({ readerParams: { IxsCis: IxsCis } }),[gridFormat]:new Gordic.Data.GridFormat().addTextColumn({ name: "klic", caption: "jres:23350044",width:50 }).addTextColumn({ name: "hodnota", caption:"jres:31850330",width:100}),[userSettings]:usRoot+"ginscisCiselnik",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["klic","hodnota"]}};};

// GReaderGinsfun.fields.js
Readers.Ginsfun = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsfun",keys:["ixs_fun"],[columns]:["ixs_fun", "ixs_su", "nazev", "nazev_ref", "nazev_su", "nazev_rf", "nazev_orj", "ico"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Ginsfun.inheritsFrom(ReadersBase);
Fields.ginsfunMini = (prefabOptions) => { return {data:new Readers.Ginsfun(),[itemTemplate]:"{nazev_rf:trim:encode}",[graphicInput]:"oninput",[itemTooltipTemplate]:"{nazev_rf:trim:encode}",[verticalButtons]:true,[helperColumns]:["nazev_rf"],[states]:[{
        icon: "gi-user",
        align: "opposite",
        customClass: "g-inactive-prefabState"
    }],[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsfun(),prefabOptions,options)).show()};};
Fields.ginsfun = (prefabOptions) => { return {data:new Readers.Ginsfun(),[itemTemplate]:function (row) { return ("{0}<br><i>{1}</i>").format(FieldFunction.getTrimEncodeString(row.nazev_ref), FieldFunction.getFormatedString([row.nazev, row.nazev_su], ", ")) },[graphicInput]:"oninput",[itemTooltipTemplate]:function (row) { return ("{0}<br><i>{1}</i>").format(FieldFunction.getTrimEncodeString(row.nazev_ref), FieldFunction.getFormatedString([row.nazev, row.nazev_su], ", ")) },[helperItemTemplate]:function (row) {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850064": row.nazev, "jres:31850065": row.nazev_su });          return FieldFunction.getInfoStr({ "info": row.nazev_rf, "more": moreInfo });
    },[verticalButtons]:true,[helperColumns]:["nazev_rf", "nazev", "nazev_su"],[states]:[{
        icon: "gi-user",
        align: "opposite",
        customClass: "g-inactive-prefabState"
    }],[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsfun(),prefabOptions,options)).show()};};
Selectors.ginsfun = () => { return {data:new Readers.Ginsfun(),[doNotSearch]:false,[modifyGridOptions]:function (gridOptions) {
        return $.content().createServiceContent("Gordic.Gui.WebControls.GSelectorService").call("CheckSettings").then((result) => {
            if (!result.allowExportData) {
                gridOptions.exportOptions = false;
            }
            return gridOptions;
        });
    },[filterPanelOpts]:{
        forms: [Gordic.Prefabs.Selector.FilterForms.Ginsfun],
        favorites: ["nazev", "nazev_su", "nazev_ref", "nazev_rf"],
        favoriteLayoutDescriptor: "L4M3S1",
        filterStorageService: null,
        filterItemTemplate: "{name}",
        textItemTemplate: "{description}"
    },[userSettings]:usRoot+"ginsfun",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev_rf"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850085", width: 150, forced: true}).addTextColumn({name: "nazev_ref", caption: "jres:31850086", width: 100}).addTextColumn({name: "nazev_su", caption: "jres:31850087", width: 100}).addTextColumn({name: "nazev_orj", caption: "jres:31850068", width: 100})};};

// GReaderGinsgrf.fields.js
Readers.Ginsgrf = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsgrf",keys:["ixs_grf"],[columns]:["ixs_grf","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsgrf.inheritsFrom(ReadersBase);
Fields.ginsgrf = (prefabOptions) => { return {data:new Readers.Ginsgrf(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsgrf(),prefabOptions,options)).show()};};
Selectors.ginsgrf = () => { return {data:new Readers.Ginsgrf(),[userSettings]:usRoot+"ginsgrf",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:23350025", width: 100, forced: true})};};

// GReaderGinshvl.fields.js
Readers.Ginshvl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinshvl",keys:["ixs_vla","hovla"],[columns]:["ixs_vla","hovla","hovla_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginshvl.inheritsFrom(ReadersBase);
Fields.ginshvl = (prefabOptions) => { return {data:new Readers.Ginshvl(),[itemTemplate]:"{hovla_txt:trim:encode}",[helperColumns]:["hovla", "hovla_txt"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.hovla, row.hovla_txt, "sb"); },[itemTooltipTemplate]:"{hovla_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginshvl(),prefabOptions,options)).show()};};
Selectors.ginshvl = () => { return {data:new Readers.Ginshvl(),[userSettings]:usRoot+"ginshvl",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["hovla", "hovla_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "hovla_txt", caption: "jres:31850100", width: 100, forced: true}).addTextColumn({name: "hovla", caption: "jres:31850101", width: 80})};};

// GReaderGinsico.fields.js
Readers.Ginsico = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsico",keys:["ico"],[columns]:["ico", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsico.inheritsFrom(ReadersBase);
Fields.ginsico = (prefabOptions) => { return {data:new Readers.Ginsico(),[itemTemplate]:"{ico:trim:encode} - {nazev:trim:encode}",[helperColumns]:["ico", "nazev"],[helperItemTemplate]:"{ico:trim:encode} - {nazev:trim:encode}",[itemTooltipTemplate]:"{ico:trim:encode} - {nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsico(),prefabOptions,options)).show()};};
Selectors.ginsico = () => { return {data:new Readers.Ginsico(),[gridFormat]:new Gordic.Data.GridFormat().addTextColumn({ name: "ico", caption: Gordic.Consts.DbShortcuts.ico, width: 100 }).addTextColumn({ name: "nazev", caption: "jres:31850004", width: 100 }),[userSettings]:usRoot+"ginsico",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ico", "nazev"]}};};

// GReaderGinsmbx.fields.js
Readers.Ginsmbx = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsmbx",keys:["mailbox"],[columns]:["mailbox","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsmbx.inheritsFrom(ReadersBase);
Fields.ginsmbx = (prefabOptions) => { return {data:new Readers.Ginsmbx(),[dropdown]:true,[itemTemplate]:"{mailbox:trim:encode}",[helperColumns]:["mailbox"],[itemTooltipTemplate]:"{mailbox:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsmbx(),prefabOptions,options)).show()};};
Selectors.ginsmbx = () => { return {data:new Readers.Ginsmbx(),[userSettings]:usRoot+"ginsmbx",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["mailbox"]},[gridFormat]:newGridFormat().addTextColumn({name: "mailbox", caption: "jres:23350020", width: 80, forced: true})};};

// GReaderGinsmis.fields.js
Readers.Ginsmis = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsmis",keys:["ico","budova_kod","segment_kod","mistnost_kod"],[columns]:["ico", "budova_kod", "segment_kod", "mistnost_kod", "budova_naz","segment_naz","mistnost_naz","patro"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsmis.inheritsFrom(ReadersBase);
Fields.ginsmis = (prefabOptions) => { return {data:new Readers.Ginsmis(),[itemTemplate]:"{mistnost_naz:trim:encode}",[helperColumns]:["mistnost_naz", "budova_naz", "budova_naz", "mistnost_kod", "patro"],[helperItemTemplate]:function (row)
    {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850048": row.mistnost_kod, "jres:31850021": row.segment_kod, "jres:31850020": row.budova_kod, "jres:31850049": row.patro });
        return FieldFunction.getInfoStr({ "info": row.mistnost_naz, "more": moreInfo });
    },[itemTooltipTemplate]:"{mistnost_naz:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsmis(),prefabOptions,options)).show()};};
Selectors.ginsmis = () => { return {data:new Readers.Ginsmis(),[userSettings]:usRoot+"ginsmis",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["mistnost_naz", "budova_naz", "budova_naz", "mistnost_kod", "patro"]},[gridFormat]:newGridFormat().addTextColumn({name: "budova_naz", caption: "jres:31850020", width: 80, forced: true}).addTextColumn({name: "segment_naz", caption: "jres:31850021", width: 80}).addTextColumn({name: "mistnost_naz", caption: "jres:31850024", width: 150}).addTextColumn({name: "patro", caption: "jres:31850049", width: 30})};};

// GReaderGinsoap.fields.js
Readers.Ginsoap = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsoap",keys:["ixs_oap"],[columns]:["ixs_oap","nazev","dat_od","dat_do","tenant_id","typ_cloudu","clie_id","o365_url","typ_aut_oauth","aktivita","poznamka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsoap.inheritsFrom(ReadersBase);
Fields.ginsoap = (prefabOptions) => { return {data:new Readers.Ginsoap(),[graphicInput]:"oninput",[itemTemplate]:"<b>{nazev}</b><br /><i>{poznamka}</i>",[helperColumns]:["nazev", "poznamka"],[itemTooltipTemplate]:"<b>{nazev}</b><br /><i>{poznamka}</i>",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsoap(),prefabOptions,options)).show()};};
Selectors.ginsoap = () => { return {data:new Readers.Ginsoap(),[userSettings]:usRoot+"ginsoap",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "poznamka"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:23350048", width: 100, forced: true}).addDateTimeColumn({name: "dat_od", caption: "jres:23350049", width: 80}).addDateTimeColumn({name: "dat_do", caption: "jres:23350050", width: 80})};};

// GReaderGinsorj.fields.js
Readers.Ginsorj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsorj",keys:["ixs_orj"],[columns]:["ixs_orj", "zkratka","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsorj.inheritsFrom(ReadersBase);
Fields.ginsorj = (prefabOptions) => { return {data:new Readers.Ginsorj(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["zkratka", "nazev", "ixs_orj"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.zkratka, row.nazev, "sb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsorj(),prefabOptions,options)).show()};};
Selectors.ginsorj = () => { return {data:new Readers.Ginsorj(),[modifyGridOptions]:function (gridOptions) {
        return $.content().createServiceContent("Gordic.Gui.WebControls.GSelectorService").call("CheckSettings").then((result) => {
            if (!result.allowExportData) {
                gridOptions.exportOptions = false;
            }
            return gridOptions;
        });
    },[userSettings]:usRoot+"ginsorj",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zkratka", "nazev", "ixs_orj"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850068", width: 150, forced: true}).addTextColumn({name: "zkratka", caption: "jres:31850003", width: 50})};};

// GReaderGinspod.fields.js
Readers.Ginspod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinspod",keys:["ixs_su"],[columns]:["ixs_su", "nazev","ofic_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginspod.inheritsFrom(ReadersBase);
Fields.ginspod = (prefabOptions) => { return {data:new Readers.Ginspod(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "ofic_nazev"],[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginspod(),prefabOptions,options)).show()};};
Selectors.ginspod = () => { return {data:new Readers.Ginspod(),[modifyGridOptions]:function (gridOptions) {
		return $.content().createServiceContent("Gordic.Gui.WebControls.GSelectorService").call("CheckSettings").then((result) => {
			if (!result.allowExportData) {
				gridOptions.exportOptions = false;
			}
			return gridOptions;
		});
	},[userSettings]:usRoot+"ginspod",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "ofic_nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 80, forced: true}).addTextColumn({name: "ofic_nazev", caption: "jres:31850116", width: 120})};};

// GReaderGinspro.fields.js
Readers.Ginspro = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinspro",keys:["ixs_pro"],[columns]:["ixs_pro", "nazev", "zkratka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginspro.inheritsFrom(ReadersBase);
Fields.ginspro = (prefabOptions) => { return {data:new Readers.Ginspro(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "zkratka"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.nazev, row.zkratka, "fb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginspro(),prefabOptions,options)).show()};};
Selectors.ginspro = () => { return {data:new Readers.Ginspro(),[userSettings]:usRoot+"ginspro",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "zkratka"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 150, forced: true}).addTextColumn({name: "zkratka", caption: "jres:31850003", width: 80})};};

// GReaderGinspsc.fields.js
Readers.Ginspsc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinspsc",keys:["stat","psc"],[columns]:["psc", "posta", "stat_txt","stat"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginspsc.inheritsFrom(ReadersBase);
Fields.ginspsc = (prefabOptions) => { return {data:new Readers.Ginspsc(),[itemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.psc, row.posta); },[helperColumns]:["psc", "posta"],[itemTooltipTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.psc, row.posta); },[selector]:(options) => newDefaultSelector($.extend(Selectors.ginspsc(),prefabOptions,options)).show()};};
Selectors.ginspsc = () => { return {data:new Readers.Ginspsc(),[gridOpts]:{
        searchColumns: ["psc", "posta", "stat_txt"],
        rowsEnabled: function (meta) {
            return (meta && meta.data && meta.data.aktivita === 100 ? true : false);
        }
       
    },[serverFilters]:{ aktivita: 100 },[subTaskOpts]:Gordic.Prefabs.Selector.SubTasks.Aktivita,[menuBar]:[/*{

        id: "menuShow", caption: "jres:31850282", type: "static", favorite: true, children: [             {
                id: "menuShowAll",
                action: new GAction({
                    name: "all",
                    caption: "jres:31850276",                     run: function (ev, ctx) {
                        ctx.dialogCnt.actualFilters = { aktivita: [100, 500] };
                        ctx.dialogCnt.filterData();
                    }
                })
            },
            {
                id: "menuShowActive",
                action: new GAction({
                    name: "active",
                    caption: "jres:31850272",                     run: function (ev, ctx) {
                        ctx.dialogCnt.actualFilters = { aktivita: 100 };
                        ctx.dialogCnt.filterData();
                    }
                })
            },
            {
                id: "menuShowNonActive",
                action: new GAction({
                    name: "nonactive",
                    caption: "jres:31850275",                     run: function (ev, ctx) {
                        ctx.dialogCnt.actualFilters = { aktivita: 500 };
                        ctx.dialogCnt.filterData();
                    }
                })
            }
        ]


            
    },*/
    {
        favorite: true, action: new GAction({
            name: "newRecord",
            caption: "jres:31850279",             run: function (ev, ctx) {
                var dlg = ctx.dialogCnt.dialogs.showModalWindow(Gordic.Prefabs.Selector.Content.EditNewContent, {
                    dataService: "NewPSC",
                    
                    form: Gordic.Prefabs.Selector.Forms.Ginspsc,
                    readerClass: "Gordic.ControlsLogic.Client.GReaderGinspsc",
                    model: (ctx && ctx.props && ctx.props.model) ? ctx.props.model : {stat: "42", aktivita: 100}
                }, "jres:31850327");                 dlg.on("close", function (ev, retVal) {
                    ctx.dialogCnt.clearLoadedData();
                    ctx.dialogCnt.filterDataAndRefresh();
                });
                /**/
            }
        })
    },
    {
        favorite: true, action: new GAction({
            name: "editRecord",
            caption: "jres:31850280",             run: function (ev, ctx) {
                var arr = ctx.dialogCnt.grid.ggrid("getSelection");
                var dlg = ctx.dialogCnt.dialogs.showModalWindow(Gordic.Prefabs.Selector.Content.EditNewContent, {
                    dataService: "NewPSC",            
                    form: Gordic.Prefabs.Selector.Forms.Ginspsc,
                    edit: true,
                    readerClass: "Gordic.ControlsLogic.Client.GReaderGinspsc",
                    model: arr.length === 1 ? arr[0] : {}
                }, "jres:31850328");                 dlg.findFields("stat,psc").gfield("option", "disabled", true);
                dlg.on("close", function (ev, retVal) {
                    ctx.dialogCnt.clearLoadedData();
                    ctx.dialogCnt.filterDataAndRefresh();

                });
                /*ctx.dialogCnt.actualFilters = { aktivita: 100 };
                ctx.dialogCnt.filterData();*/
            }
        })
    }],[userSettings]:usRoot+"ginspsc",[isolatedUserSettings]:true,[gridFormat]:newGridFormat().addTextColumn({name: "psc", caption: "jres:31850069", width: 50, forced: true}).addTextColumn({name: "posta", caption: "jres:31850070", width: 120}).addTextColumn({name: "stat_txt", caption: "jres:31850076", width: 150})};};

// GReaderGinspso.fields.js
Readers.Ginspso = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinspso",keys:["stat","psc","obec"],[columns]:["obec", "obec_kod", "id_okres", "okres_txt", "stat", "psc"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginspso.inheritsFrom(ReadersBase);
Fields.ginspso = (prefabOptions) => { return {data:new Readers.Ginspso(),[itemTemplate]:"{obec:trim:encode}",[helperColumns]:["obec", "okres_txt"],[helperItemTemplate]:function (row) { return FieldFunction.getInfoStr({ "info": row.obec, "more": row.okres_txt }); },[itemTooltipTemplate]:"{obec:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginspso(),prefabOptions,options)).show()};};
Selectors.ginspso = () => { return {data:new Readers.Ginspso(),[userSettings]:usRoot+"ginspso",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["obec", "okres_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "psc", caption: "jres:31850069", width: 100, forced: true}).addTextColumn({name: "obec", caption: "jres:31850104", width: 100}).addTextColumn({name: "okres_txt", caption: "jres:31850105", width: 100})};};

// GReaderGinsref.fields.js
Readers.Ginsref = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsref",keys:["ixs_ref"],[columns]:["ixs_ref", "zkratka", "nazev", "jmeno", "prijmeni", "tit_pred", "tit_za", "login_name"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsref.inheritsFrom(ReadersBase);
Fields.ginsref = (prefabOptions) => { return {data:new Readers.Ginsref(),[itemTemplate]:"{nazev:trim:encode}",[itemTooltipTemplate]:"{nazev:trim:encode}",[graphicInput]:"oninput",[verticalButtons]:true,[helperColumns]:["nazev_ref", "nazev"],[states]:[{
        icon: "gi-user",
        align: "opposite",
        customClass: "g-inactive-prefabState"
    }],[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsref(),prefabOptions,options)).show()};};
Fields.ginsrefFoto = (prefabOptions) => { return {data:new Readers.Ginsref(),[itemTemplate]:function (row) {

        var name = [row.tit_pred, row.jmeno, row.prijmeni, row.tit_za].filter(function (it) { return !!it; }).join(" ");
                var secondRow = FieldFunction.getFormatedLabeledString({ "jres:31850003": row.zkratka, "jres:31850046": row.login_name, "jres:31850047": name });
        return ("<div class='{3}'>{2}</div><b>{0}</b><br>{1}").format(FieldFunction.getTrimEncodeString(row.nazev), secondRow, row.image ? row.image : "", row.image ? "foto" : "fa fa-user minifoto");
    },[graphicInput]:"oninput",[verticalButtons]:true,[helperColumns]:["nazev_ref", "nazev", "nazev_su"],[helperItemTemplate]:function (row) {


        var name = [row.tit_pred, row.jmeno, row.prijmeni, row.tit_za].filter(function (it) { return !!it; }).join(" ");
                var secondRow = FieldFunction.getFormatedLabeledString({ "jres:31850003": row.zkratka, "jres:31850046": row.login_name, "jres:31850047": name });
        return ("<div class='fa fa-user minifoto'></div><b>{0}</b><br>{1}").format(FieldFunction.getTrimEncodeString(row.nazev), secondRow);

    },[change]:function (ev, obj) {
        if (!obj || !obj.value || !obj.value["ixs_ref"]) return;
        new GContent("Gordic.Gui.WebControls.GDataReaderService").call("GetPhoto", { ixsRef: obj.value["ixs_ref"] }).done(function (image) {

                        var img = "<img src='data:image/png;base64, " + image + "'/>";
            obj.value.image = !!image ? img : null;
            $(ev.target).gselectbox("setValue", obj.value);

        });

    },[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsref(),prefabOptions,options)).show()};};
Selectors.ginsref = () => { return {data:new Readers.Ginsref(),[modifyGridOptions]:function (gridOptions) {
        return $.content().createServiceContent("Gordic.Gui.WebControls.GSelectorService").call("CheckSettings").then((result) => {
            if (!result.allowExportData) {
                gridOptions.exportOptions = false;
            }
            return gridOptions;
        });
    },[gridOpts]:{
        defaultProfile: {
            columnList: "nazev,tit_pred,jmeno,prijmeni,tit_za,login_name,zkratka,mail"
        }
    },[userSettings]:usRoot+"ginsref",[isolatedUserSettings]:true,[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 120, forced: true}).addTextColumn({name: "tit_pred", caption: "jres:31850146", width: 40}).addTextColumn({name: "jmeno", caption: "jres:31850047", width: 80}).addTextColumn({name: "prijmeni", caption: "jres:31850147", width: 80}).addTextColumn({name: "tit_za", caption: "jres:31850148", width: 40}).addTextColumn({name: "login_name", caption: "jres:31850046", width: 60}).addTextColumn({name: "zkratka", caption: "jres:31850003", width: 60}).addTextColumn({name: "ico", caption: "jres:31850360", width: 60})};};
Selectors.ginsrefFoto = () => { return {data:new Readers.Ginsref(),[modifyGridOptions]:function (gridOptions) {
        return $.content().createServiceContent("Gordic.Gui.WebControls.GSelectorService").call("CheckSettings").then((result) => {
            if (!result.allowExportData) {
                gridOptions.exportOptions = false;
            }
            return gridOptions;
        });
    },[userSettings]:usRoot+"ginsrefFoto",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev_ref", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 120, forced: true}).addTextColumn({name: "tit_pred", caption: "jres:31850146", width: 40}).addTextColumn({name: "jmeno", caption: "jres:31850047", width: 80}).addTextColumn({name: "prijmeni", caption: "jres:31850147", width: 80}).addTextColumn({name: "tit_za", caption: "jres:31850148", width: 40}).addTextColumn({name: "login_name", caption: "jres:31850046", width: 60}).addTextColumn({name: "zkratka", caption: "jres:31850003", width: 60}).addTextColumn({name: "ico", caption: "jres:31850360", width: 60})};};

// GReaderGinssbu.fields.js
Readers.Ginssbu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinssbu",keys:["ico","budova_kod","segment_kod"],[columns]:["ico", "budova_kod", "segment_kod", "budova_naz","segment_naz"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginssbu.inheritsFrom(ReadersBase);
Fields.ginssbu = (prefabOptions) => { return {data:new Readers.Ginssbu(),[itemTemplate]:"{segment_naz:trim:encode}",[helperColumns]:["budova_naz", "segment_kod", "segment_naz"],[helperItemTemplate]:function (row)
    {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850020": row.budova_kod, "jres:31850021": row.segment_kod });
        return FieldFunction.getInfoStr({ "info": row.segment_naz, "more": moreInfo });
    },[itemTooltipTemplate]:"{segment_naz:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginssbu(),prefabOptions,options)).show()};};
Selectors.ginssbu = () => { return {data:new Readers.Ginssbu(),[userSettings]:usRoot+"ginssbu",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["budova_naz", "segment_kod", "segment_naz"]},[gridFormat]:newGridFormat().addTextColumn({name: "budova_naz", caption: "jres:31850020", width: 80, forced: true}).addTextColumn({name: "segment_naz", caption: "jres:31850021", width: 150})};};

// GReaderGinssfu.fields.js
Readers.Ginssfu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinssfu",keys:["ixs_sfu"],[columns]:["ixs_sfu","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginssfu.inheritsFrom(ReadersBase);
Fields.ginssfu = (prefabOptions) => { return {data:new Readers.Ginssfu(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["ixs_sfu", "nazev"],[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginssfu(),prefabOptions,options)).show()};};
Selectors.ginssfu = () => { return {data:new Readers.Ginssfu(),[userSettings]:usRoot+"ginssfu",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixs_sfu", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850356", width: 100, forced: true})};};

// GReaderGinsskr.fields.js
Readers.Ginsskr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsskr",keys:["ixs_skr"],[columns]:["ixs_skr","ixs_spu","zkratka","nazev","poznamka","komentar","skar_znak","skar_lhuta","dat_od","dat_do","aktivita","kontrolni_lhuta","rok_vyrazeni","lic","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsskr.inheritsFrom(ReadersBase);
Fields.ginsskr = (prefabOptions) => { return {data:new Readers.Ginsskr(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsskr(),prefabOptions,options)).show()};};
Selectors.ginsskr = () => { return {data:new Readers.Ginsskr(),[userSettings]:usRoot+"ginsskr",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850372", width: 250, forced: true}).addTextColumn({name: "skar_znak", caption: "jres:31850373", width: 50}).addNumberColumn({name: "skar_lhuta", caption: "jres:31850374", width: 50}).addTextColumn({name: "komentar", caption: "jres:31850375", width: 160}).addTextColumn({name: "oduvodneni", caption: "jres:31850376", width: 250})};};

// GReaderGinssoz.fields.js
Readers.Ginssoz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinssoz",keys:["faze","ip_adr"],[columns]:["faze", "ip_adr","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginssoz.inheritsFrom(ReadersBase);
Fields.ginssoz = (prefabOptions) => { return {data:new Readers.Ginssoz(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "ip_adr"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.nazev, row.ip_adr, "fb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginssoz(),prefabOptions,options)).show()};};
Selectors.ginssoz = () => { return {data:new Readers.Ginssoz(),[userSettings]:usRoot+"ginssoz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "ip_adr"]},[gridFormat]:newGridFormat().addTextColumn({name: "ip_adr", caption: "jres:31850122", width: 80, forced: true}).addTextColumn({name: "nazev", caption: "jres:31850015", width: 150})};};

// GReaderGinsstr.fields.js
Readers.Ginsstr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsstr",keys:["ixs_str"],[columns]:["ixs_str", "nazev","poznamka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsstr.inheritsFrom(ReadersBase);
Fields.ginsstr = (prefabOptions) => { return {data:new Readers.Ginsstr(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "poznamka"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.nazev, row.poznamka, "fb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsstr(),prefabOptions,options)).show()};};
Selectors.ginsstr = () => { return {data:new Readers.Ginsstr(),[userSettings]:usRoot+"ginsstr",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "poznamka"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 150, forced: true}).addTextColumn({name: "poznamka", caption: "jres:31850038", width: 200})};};

// GReaderGinsstv.fields.js
Readers.Ginsstv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsstv",keys:["ixs_stv"],[columns]:["ixs_stv", "nazev", "zkratka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsstv.inheritsFrom(ReadersBase);
Fields.ginsstv = (prefabOptions) => { return {data:new Readers.Ginsstv(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["zkratka", "nazev"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.nazev, row.zkratka, "fb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsstv(),prefabOptions,options)).show()};};
Selectors.ginsstv = () => { return {data:new Readers.Ginsstv(),[gridFormat]:new Gordic.Data.GridFormat().addTextColumn({
        name: "nazev", 
        caption: "jres:23350038",
        width: 150
    }).addTextColumn({
        name: "zkratka",
        caption: "jres:31850003",
        width: 80
    }).addTextColumn({
        name: "priz_vir",
        caption: "jres:23350038",
        width: 100,
        cellTemplate: function (row) {
            if (row.priz_vir == 1)
                return "jres:23350039";             return "jres:33050001"         }
    }),[userSettings]:usRoot+"ginsstv",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zkratka", "nazev"]}};};

// GReaderGinstre.fields.js
Readers.Ginstre = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinstre",keys:["ixs_tre"],[columns]:["ixs_tre","zkratka","nazev","poznamka","aktivita","dat_zmena","zmenu_prov","ico"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginstre.inheritsFrom(ReadersBase);
Fields.ginstre = (prefabOptions) => { return {data:new Readers.Ginstre(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["zkratka", "nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.ginstre(),prefabOptions,options)).show()};};
Selectors.ginstre = () => { return {data:new Readers.Ginstre(),[userSettings]:usRoot+"ginstre",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zkratka", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:33600003", width: 300, forced: true}).addTextColumn({name: "zkratka", caption: "jres:33600002", width: 300}).addTextColumn({name: "ico", caption: "jres:33600004", width: 300})};};

// GReaderGinsurl.fields.js
Readers.Ginsurl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsurl",keys:["faze"],[columns]:["faze", "description", "shortcut", "icon", "url", "license"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsurl.inheritsFrom(ReadersBase);
Fields.ginsurl = (prefabOptions) => { return {data:new Readers.Ginsurl(),[itemTemplate]:"{faze}",[helperColumns]:["faze"],[itemTooltipTemplate]:"{faze}"};};

// GReaderGinsurp.fields.js
Readers.Ginsurp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsurp",keys:["ur_pri"],[columns]:["ur_pri","ur_pri_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsurp.inheritsFrom(ReadersBase);
Fields.ginsurp = (prefabOptions) => { return {data:new Readers.Ginsurp(),[dropdown]:true,[itemTemplate]:"{ur_pri} - {ur_pri_txt:trim:encode}",[helperColumns]:["ur_pri", "ur_pri_txt"],[itemTooltipTemplate]:"{ur_pri} - {ur_pri_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsurp(),prefabOptions,options)).show()};};
Selectors.ginsurp = () => { return {data:new Readers.Ginsurp(),[userSettings]:usRoot+"ginsurp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ur_pri", "ur_pri_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "ur_pri", caption: "jres:31850320", width: 100, forced: true}).addTextColumn({name: "ur_pri_txt", caption: "jres:31850004", width: 100})};};

// GReaderGinsusr.fields.js
Readers.Ginsusr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsusr",keys:["ixs_usr"],[columns]:["ixs_usr","poznamka","zkratka","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsusr.inheritsFrom(ReadersBase);
Fields.ginsusr = (prefabOptions) => { return {data:new Readers.Ginsusr(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["zkratka", "nazev", "poznamka"],[helperItemTemplate]:function (row) {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850003": row.zkratka, "jres:31850038": row.poznamka });
        return FieldFunction.getInfoStr({ "info": row.nazev, "more": moreInfo });
    },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsusr(),prefabOptions,options)).show()};};
Selectors.ginsusr = () => { return {data:new Readers.Ginsusr(),[userSettings]:usRoot+"ginsusr",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zkratka", "nazev", "poznamka"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 150, forced: true}).addTextColumn({name: "zkratka", caption: "jres:31850003", width: 80}).addTextColumn({name: "poznamka", caption: "jres:31850038", width: 100})};};

// GReaderGinsvla.fields.js
Readers.Ginsvla = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsvla",keys:["ixs_vla"],[columns]:["ixs_vla", "nazev", "zkratka", "velikost", "maska", "dat_typ_txt", "rpp_name"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginsvla.inheritsFrom(ReadersBase);
Fields.ginsvla = (prefabOptions) => { return {data:new Readers.Ginsvla(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "zkratka", "dat_typ_txt", "velikost", "maska"],[helperItemTemplate]:function (row){
                var moreInfo = FieldFunction.getFormatedLabeledString($.extend({ "jres:31850003": row.zkratka, "jres:31850039": row.velikost, "jres:31850040": row.dat_typ_txt, "jres:31850041": row.maska }, row.rpp_name ? { "jres:23350069": row.rpp_name } : {}));         return FieldFunction.getInfoStr({ "info": row.nazev, "more": moreInfo });
    },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsvla(),prefabOptions,options)).show()};};
Selectors.ginsvla = () => { return {data:new Readers.Ginsvla(),[gridOpts]:{
        defaultProfile: {
            columnList: "nazev, zkratka, velikost, maska, dat_typ_txt"
        }
    },[userSettings]:usRoot+"ginsvla",[isolatedUserSettings]:true,[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 100, forced: true}).addTextColumn({name: "zkratka", caption: "jres:31850003", width: 80}).addTextColumn({name: "dat_typ_txt", caption: "jres:31850154", width: 80}).addNumberColumn({name: "velikost", caption: "jres:31850039", width: 80}).addTextColumn({name: "maska", caption: "jres:31850041", width: 80}).addTextColumn({name: "rpp_name", caption: "jres:23350069", width: 100})};};

// GReaderGinsvsk.fields.js
Readers.Ginsvsk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsvsk",keys:["ixs_vsk"],[columns]:["ixs_vsk", "ico", "dat_od", "dat_do", "spis_znak", "spis_znak_short", "ixs_vsk_nad", "aktivita", "dat_zmena", "nazev", "poznamka", "zmenu_prov", "cs2_spis_znak", "ixs_skr", "skar_znak", "skar_lhuta", "nazev_spu", "urceni_spis_z", "obd_vsk", "pocet_obd_vsk", "priz_poz_skar"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Ginsvsk.inheritsFrom(ReadersBase);
Fields.ginsvsk = (prefabOptions) => { return {data:new Readers.Ginsvsk(),[itemTemplate]:"{nazev} - {spis_znak} | {skar_znak}/{skar_lhuta}| {nazev_spu}",[helperColumns]:["nazev", "spis_znak"],[validators]:[
        new Gordic.Validators.Base({
            message: "jres:23350070",             validate: function (value, changeObj) {
                if(!value) {                     return true; 
                } else if (value.VskUserPermission === 1) {
                    return true;
                }
                return false;
            }
        })
    ],[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsvsk(),prefabOptions,options)).show()};};
Selectors.ginsvsk = () => { return {data:function () {
        return new Gordic.Data.View(new Gordic.Data.Readers.Ginsvsk().getData(this.serverFilters), {
            key: "ixs_vsk",
            processOnStart: true,
            processors: {
                tree: new Gordic.Data.Tree(Gordic.Data.Tree.parentIdOrganizer("ixs_vsk_nad"), {
                    defaultState: "open"
                })
            }
        });
    },[gridFormat]:new Gordic.Data.GridFormat()
        .addIconColumn({
            name: "ico_perm",
            caption: "jres:23350072",             width: 30,
            customClass: "center",
            fixedWidth: true,
            iconTemplate: function (row) {
                if(row && row.VskUserPermission == 1) {
                    return undefined;
                } else {
                    return { icon: "gi-detail |gi-window-close gi-stack-pos--rb gi-bgw g-state-text g-state-error", text: "jres:23350074", tooltip: "jres:23350073" };                 }
            }
        })
        .addStructureColumn({
            name: "nazev",
            caption: "jres:23350052",             width: 120,
            fixedWidth: false,
            sortable: false,
            formatPreset: "full",
            forced: true,
        }).addTextColumn({
            name: "spis_znak", caption: "jres:23350054", width: 170         }).addTextColumn({
            name: "spis_znak_short", caption: "jres:23350053", width: 70,         }).addTextColumn({
            name: "skar_znak", caption: "jres:23350061", width: 30,         }).addNumberColumn({
            name: "skar_lhuta", caption: "jres:23350062", width: 40,         }).addTextColumn({
            name: "poznamka", caption: "jres:23350065", width: 100         }).addDateTimeColumn({
            name: "dat_od", caption: "jres:23350055", width: 100         }).addDateTimeColumn({
            name: "dat_do", caption: "jres:23350056", width: 100         }).addTextColumn({
            name: "nazev_spu", caption: "jres:23350067", width: 160         }).addTextColumn({
            name: "ixs_vsk", caption: "jres:23350066", width: 80         }),[doNotSearch]:false,[filterPanelOpts]:{
        forms: [Gordic.Prefabs.Selector.FilterForms.Ginsvsk],
        favorites: ["nazev", "spis_znak", "dat_od", "dat_do"],
        favoriteLayoutDescriptor: "L4M3S1",
        filterStorageService: null,
        filterItemTemplate: "{name}",
        textItemTemplate: "{description}"
    },[gridOpts]:{
        rowsEnabled: function (dataRow) {
            if (dataRow && dataRow.data && (/*dataRow.data.ixs_vsk_nad == null || dataRow.data.ixs_skr == null || */ dataRow.data.aktivita != 100 || dataRow.data.VskUserPermission != 1)) { 
                return false;             } else {
                return true;
            }
        },
        searchColumns: ["nazev", "spis_znak", "spis_znak_short", "skar_znak", "skar_lhuta", "poznamka", "dat_od", "dat_do", "nazev_spu"]
    },[userSettings]:usRoot+"ginsvsk",[isolatedUserSettings]:true};};

// GReaderGinswgp.fields.js
Readers.Ginswgp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinswgp",keys:["ixs_wgp"],[columns]:["ixs_wgp", "nazev","poznamka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginswgp.inheritsFrom(ReadersBase);
Fields.ginswgp = (prefabOptions) => { return {data:new Readers.Ginswgp(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "poznamka"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.nazev, row.poznamka, "fb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginswgp(),prefabOptions,options)).show()};};
Selectors.ginswgp = () => { return {data:new Readers.Ginswgp(),[userSettings]:usRoot+"ginswgp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "poznamka"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 150, forced: true}).addTextColumn({name: "poznamka", caption: "jres:31850038", width: 100})};};

// GReaderGinszmp.fields.js
Readers.Ginszmp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinszmp",keys:["ixs_zmp"],[columns]:["ixs_zmp","nazev_ref","nazev_fun","nazev_su"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginszmp.inheritsFrom(ReadersBase);
Fields.ginszmp = (prefabOptions) => { return {data:new Readers.Ginszmp(),[itemTemplate]:function (row) { return ("{0}<br><i>{1}</i>").format(FieldFunction.getTrimEncodeString(row.nazev_ref), FieldFunction.getFormatedString([row.nazev_fun, row.nazev_su], ", ")) },[graphicInput]:"oninput",[verticalButtons]:true,[itemTooltipTemplate]:function (row) { return ("{0}<br><i>{1}</i>").format(FieldFunction.getTrimEncodeString(row.nazev_ref), FieldFunction.getFormatedString([row.nazev_fun, row.nazev_su], ", ")) },[helperColumns]:["nazev_ref", "nazev_fun", "nazev_su"],[states]:[{
        icon: "gi-user",
        align: "opposite",
         customClass: "g-inactive-prefabState"
    }],[selector]:(options) => newDefaultSelector($.extend(Selectors.ginszmp(),prefabOptions,options)).show()};};
Fields.ginszmpMini = (prefabOptions) => { return {data:new Readers.Ginszmp(),[itemTemplate]:"{nazev_ref:trim:encode}",[graphicInput]:"oninput",[verticalButtons]:true,[itemTooltipTemplate]:"{nazev_ref:trim:encode}",[helperColumns]:["nazev_ref"],[states]:[{
        icon: "gi-user",
        align: "opposite",
        customClass: "g-inactive-prefabState"
    }],[selector]:(options) => newDefaultSelector($.extend(Selectors.ginszmp(),prefabOptions,options)).show()};};
Selectors.ginszmp = () => { return {data:new Readers.Ginszmp(),[modifyGridOptions]:function (gridOptions) {
        return $.content().createServiceContent("Gordic.Gui.WebControls.GSelectorService").call("CheckSettings").then((result) => {
            if (!result.allowExportData) {
                gridOptions.exportOptions = false;
            }
            return gridOptions;
        });
    },[userSettings]:usRoot+"ginszmp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev_ref", "nazev_fun", "nazev_su"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev_ref", caption: "jres:31850067", width: 160, forced: true}).addTextColumn({name: "nazev_fun", caption: "jres:31850064", width: 160}).addTextColumn({name: "nazev_su", caption: "jres:31850125", width: 160})};};

// GReaderGinvpsu.fields.js
Readers.Ginvpsu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinvpsu",keys:["ixs_su","cj_ext"],[columns]:["ixs_su","cj_ext","k_v","aktivita","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginvpsu.inheritsFrom(ReadersBase);
Fields.ginvpsu = (prefabOptions) => { return {data:new Readers.Ginvpsu(),[itemTemplate]:"{cj_ext}",[helperColumns]:["cj_ext"],[dropdown]:true};};

// GReaderIntsext.fields.js
Readers.Intsext = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderIntsext",keys:["ixs_ext"],[columns]:["ixs_ext", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Intsext.inheritsFrom(ReadersBase);
Fields.intsext = (prefabOptions) => { return {data:new Readers.Intsext(),[dropdown]:true,[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "mutace_ess"],[itemTooltipTemplate]:"{nazev:trim:encode}",[helperItemTemplate]:function (row) {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850378": row.mutace_ess });         return FieldFunction.getInfoStr({ "info": row.nazev, "more": moreInfo });
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.intsext(),prefabOptions,options)).show()};};
Selectors.intsext = () => { return {data:new Readers.Intsext(),[userSettings]:usRoot+"intsext",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "mutace_ess"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 120, forced: true}).addTextColumn({name: "mutace_ess", caption: "jres:31850377", width: 120})};};

// GReaderMajcdrm.fields.js
Readers.Majcdrm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajcdrm",keys:["drh_id"],[columns]:["drh_id","skupina_zkr","drh_txt","drh_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majcdrm.inheritsFrom(ReadersBase);
Fields.majcdrm = (prefabOptions) => { return {data:new Readers.Majcdrm(),[itemTemplate]:"{drh_txt:trim:encode}",[helperColumns]:["drh_id", "drh_zkr", "drh_txt"],[helperItemTemplate]:function(row) 
    {
                var moreInfo = FieldFunction.getFormatedLabeledString({"jres:31850003": row.drh_zkr, "jres:31850055": row.drh_id, "jres:31850056": row.skupina_zkr});
        return FieldFunction.getInfoStr({"info": row.drh_txt, "more": moreInfo});
    },[itemTooltipTemplate]:"{drh_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.majcdrm(),prefabOptions,options)).show()};};
Selectors.majcdrm = () => { return {data:new Readers.Majcdrm(),[userSettings]:usRoot+"majcdrm",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["drh_id", "drh_zkr", "drh_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "drh_id", caption: "jres:31850140", width: 30, forced: true}).addTextColumn({name: "skupina_zkr", caption: "jres:31850056", width: 40}).addTextColumn({name: "drh_txt", caption: "jres:31850141", width: 100}).addTextColumn({name: "drh_zkr", caption: "jres:31850003", width: 50}).addTextColumn({name: "mode_odp_txt", caption: "jres:31850142", width: 40}).addTextColumn({name: "typ_rp_txt", caption: "jres:31850143", width: 100})};};

// GReaderMajcppr.fields.js
Readers.Majcppr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajcppr",keys:["s_prodej"],[columns]:["s_prodej", "s_prodej_txt", "s_prodej_zkr", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majcppr.inheritsFrom(ReadersBase);
Fields.majcppr = (prefabOptions) => { return {data:new Readers.Majcppr(),[dropdown]:true,[itemTemplate]:"{s_prodej_txt:trim:encode}",[helperColumns]:["s_prodej", "s_prodej_txt", "s_prodej_zkr", "k_v", "k_s"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majcppr(),prefabOptions,options)).show()};};
Selectors.majcppr = () => { return {data:new Readers.Majcppr(),[userSettings]:usRoot+"majcppr",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["s_prodej", "s_prodej_txt", "s_prodej_zkr", "k_v", "k_s"]},[gridFormat]:newGridFormat().addNumberColumn({name: "s_prodej", caption: "jres:26850001", width: 150, forced: true}).addTextColumn({name: "s_prodej_txt", caption: "jres:26850002", width: 300}).addTextColumn({name: "s_prodej_zkr", caption: "jres:26850003", width: 300}).addNumberColumn({name: "k_v", caption: "jres:21050002", width: 150}).addTextColumn({name: "k_s", caption: "jres:21050001", width: 300})};};

// GReaderMajcskm.fields.js
Readers.Majcskm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajcskm",keys:["skupina_id"],[columns]:["skupina_id", "skupina_txt","skupina_zkr","mode_odp_txt","skupina_typ_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majcskm.inheritsFrom(ReadersBase);
Fields.majcskm = (prefabOptions) => { return {data:new Readers.Majcskm(),[itemTemplate]:"{skupina_txt:trim:encode}",[helperColumns]:["skupina_zkr", "skupina_txt", "mode_odp_txt", "skupina_typ_zkr"],[helperItemTemplate]:function(row) {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850003": row.skupina_zkr, "jres:31850006": row.skupina_typ_zkr, "jres:31850042": row.mode_odp_txt });
        return FieldFunction.getInfoStr({ "info": row.skupina_txt, "more": moreInfo });
    },[itemTooltipTemplate]:"{skupina_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.majcskm(),prefabOptions,options)).show()};};
Selectors.majcskm = () => { return {data:new Readers.Majcskm(),[userSettings]:usRoot+"majcskm",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["skupina_zkr", "skupina_txt", "mode_odp_txt", "skupina_typ_zkr"]},[gridFormat]:newGridFormat().addTextColumn({name: "skupina_zkr", caption: "jres:31850003", width: 40, forced: true}).addTextColumn({name: "skupina_txt", caption: "jres:31850149", width: 100}).addTextColumn({name: "mode_odp_txt", caption: "jres:31850142", width: 40}).addTextColumn({name: "skupina_typ_zkr", caption: "jres:31850006", width: 40}).addTextColumn({name: "typ_dm_zkr", caption: "jres:31850150", width: 40})};};

// GReaderMajscim.fields.js
Readers.Majscim = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajscim",keys:["mat_cis"],[columns]:["mat_cis","skp","nazev","pmj_min","pmj_max","dan_typ","mj"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majscim.inheritsFrom(ReadersBase);
Fields.majscim = (prefabOptions) => { return {data:new Readers.Majscim(),[itemTemplate]:"{mat_cis:trim:encode} - {nazev:trim:encode} ",[helperColumns]:["mat_cis", "skp", "nazev", "mj",],[helperItemTemplate]:function (row)
    {
                        var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850004": row.nazev, "jres:31850043": row.skp, "jres:31850027": row.mj });
        return FieldFunction.getInfoStr({ "info": row.mat_cis, "more": moreInfo });
    },[itemTooltipTemplate]:"{mat_cis:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.majscim(),prefabOptions,options)).show()};};
Selectors.majscim = () => { return {data:new Readers.Majscim(),[userSettings]:usRoot+"majscim",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["mat_cis", "skp", "nazev", "mj",]},[gridFormat]:newGridFormat().addTextColumn({name: "mat_cis", caption: "jres:31850136", width: 100, forced: true}).addTextColumn({name: "nazev", caption: "jres:31850004", width: 300}).addTextColumn({name: "skp", caption: "jres:31850043", width: 100}).addTextColumn({name: "mj", caption: "jres:31850027", width: 40}).addNumberColumn({name: "pmj_min", caption: "jres:31850139", width: 80}).addNumberColumn({name: "pmj_max", caption: "jres:31850138", width: 80}).addNumberColumn({name: "dan_typ", caption: "jres:31850137", width: 50})};};

// GReaderMajsmaj.fields.js
Readers.Majsmaj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajsmaj",keys:["ixs_maj"],[columns]:["ixs_maj", "inv_cis","mat_cis","drh_zkr","nazev","ueab_evi","vyr_cis","dat_zar"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majsmaj.inheritsFrom(ReadersBase);
Fields.majsmaj = (prefabOptions) => { return {data:new Readers.Majsmaj(),[itemTemplate]:"{inv_cis:trim:encode}",[helperColumns]:["inv_cis"],[helperItemTemplate]:function (row) {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850004": row.nazev, "jres:31850001": row.mat_cis, "jres:31850022": row.drh_zkr, "jres:31850053": row.vyr_cislo, "jres:31850054": row.ueab_evi});                  return FieldFunction.getInfoStr({ "info": row.inv_cis, "more": moreInfo });
    },[itemTooltipTemplate]:"{inv_cis:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.majsmaj(),prefabOptions,options)).show()};};
Selectors.majsmaj = () => { return {data:new Readers.Majsmaj(),[userSettings]:usRoot+"majsmaj",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["inv_cis"]},[gridFormat]:newGridFormat().addTextColumn({name: "inv_cis", caption: "jres:31850295", width: 100, forced: true}).addTextColumn({name: "mat_cis", caption: "jres:31850136", width: 70}).addTextColumn({name: "drh_zkr", caption: "jres:31850022", width: 40}).addTextColumn({name: "nazev", caption: "jres:31850296", width: 200}).addTextColumn({name: "ueab_evi", caption: "jres:31850297", width: 60}).addNumberColumn({name: "c", caption: "jres:31850298", width: 100}).addTextColumn({name: "stredisko", caption: "jres:31850299", width: 30}).addDateTimeColumn({name: "dat_zar", caption: "jres:31850301", width: 80})};};

// GReaderGinslok.fields.js
Readers.Ginslok = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinslok",keys:["lic"],[columns]:["lic","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginslok.inheritsFrom(ReadersBase);
Fields.ginslok = (prefabOptions) => { return {data:new Readers.Ginslok(),[itemTemplate]:"{lic:trim:encode}",[helperColumns]:["lic", "nazev"],[itemTooltipTemplate]:"{lic:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.ginslok(),prefabOptions,options)).show()};};
Selectors.ginslok = () => { return {data:new Readers.Ginslok(),[userSettings]:usRoot+"ginslok",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["lic", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "lic", caption: "jres:23250001", width: 100, forced: true}).addTextColumn({name: "nazev", caption: "jres:23250002", width: 150})};};

// GReaderMpdctpr.fields.js
Readers.Mpdctpr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMpdctpr",keys:["typ_pren"],[columns]:["typ_pren","pop"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Mpdctpr.inheritsFrom(ReadersBase);
Fields.mpdctpr = (prefabOptions) => { return {data:new Readers.Mpdctpr(),[itemTemplate]:"{typ_pren:trim:encode}",[helperColumns]:["typ_pren", "pop"],[itemTooltipTemplate]:"{typ_pren:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.mpdctpr(),prefabOptions,options)).show()};};
Selectors.mpdctpr = () => { return {data:new Readers.Mpdctpr(),[userSettings]:usRoot+"mpdctpr",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_pren", "pop"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_pren", caption: "jres:23250003", width: 100, forced: true}).addTextColumn({name: "pop", caption: "jres:23250004", width: 150})};};

// GReaderPamcslo.fields.js
Readers.Pamcslo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPamcslo",keys:["slozka_mzdy"],[columns]:["slozka_mzdy", "slozka_mzdy_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pamcslo.inheritsFrom(ReadersBase);
Fields.pamcslo = (prefabOptions) => { return {data:new Readers.Pamcslo(),[dropdown]:true,[itemTemplate]:"{slozka_mzdy_txt:trim:encode}",[helperColumns]:["slozka_mzdy_txt"],[itemTooltipTemplate]:"{slozka_mzdy_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.pamcslo(),prefabOptions,options)).show()};};
Selectors.pamcslo = () => { return {data:new Readers.Pamcslo(),[userSettings]:usRoot+"pamcslo",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["slozka_mzdy_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "slozka_mzdy_txt", caption: "jres:31850258", width: 100, forced: true})};};

// GReaderPamctys.fields.js
Readers.Pamctys = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPamctys",keys:["typ_slozky"],[columns]:["typ_slozky","typ_slozky_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pamctys.inheritsFrom(ReadersBase);
Fields.pamctys = (prefabOptions) => { return {data:new Readers.Pamctys(),[dropdown]:true,[itemTemplate]:"{typ_slozky_txt:trim:encode}",[helperColumns]:["typ_slozky_txt"],[itemTooltipTemplate]:"{typ_slozky_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.pamctys(),prefabOptions,options)).show()};};
Selectors.pamctys = () => { return {data:new Readers.Pamctys(),[userSettings]:usRoot+"pamctys",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_slozky_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_slozky_txt", caption: "jres:31850207", width: 100, forced: true})};};

// GReaderPokcdas.fields.js
Readers.Pokcdas = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPokcdas",keys:["dan_skup"],[columns]:["dan_skup", "dan_skup_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pokcdas.inheritsFrom(ReadersBase);
Fields.pokcdas = (prefabOptions) => { return {data:new Readers.Pokcdas(),[dropdown]:true,[itemTemplate]:"{dan_skup_txt:trim:encode}",[helperColumns]:["dan_skup_txt"],[itemTooltipTemplate]:"{dan_skup_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.pokcdas(),prefabOptions,options)).show()};};
Selectors.pokcdas = () => { return {data:new Readers.Pokcdas(),[userSettings]:usRoot+"pokcdas",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["dan_skup_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "dan_skup_txt", caption: "jres:31850208", width: 100, forced: true})};};

// GReaderPokcdru.fields.js
Readers.Pokcdru = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPokcdru",keys:["druh_dok"],[columns]:["druh_dok", "druh_dok_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pokcdru.inheritsFrom(ReadersBase);
Fields.pokcdru = (prefabOptions) => { return {data:new Readers.Pokcdru(),[dropdown]:true,[itemTemplate]:"{druh_dok_txt:trim:encode}",[helperColumns]:["druh_dok_txt"],[itemTooltipTemplate]:"{druh_dok_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.pokcdru(),prefabOptions,options)).show()};};
Selectors.pokcdru = () => { return {data:new Readers.Pokcdru(),[userSettings]:usRoot+"pokcdru",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["druh_dok_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "druh_dok_txt", caption: "jres:31850209", width: 100, forced: true})};};

// GReaderPokcktg.fields.js
Readers.Pokcktg = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPokcktg",keys:["ktg_dok"],[columns]:["ktg_dok", "ktg_dok_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pokcktg.inheritsFrom(ReadersBase);
Fields.pokcktg = (prefabOptions) => { return {data:new Readers.Pokcktg(),[dropdown]:true,[itemTemplate]:"{ktg_dok_txt:trim:encode}",[helperColumns]:["ktg_dok_txt"],[itemTooltipTemplate]:"{ktg_dok_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.pokcktg(),prefabOptions,options)).show()};};
Selectors.pokcktg = () => { return {data:new Readers.Pokcktg(),[userSettings]:usRoot+"pokcktg",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ktg_dok_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "ktg_dok_txt", caption: "jres:31850210", width: 100, forced: true})};};

// GReaderPokctyp.fields.js
Readers.Pokctyp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPokctyp",keys:["typ_pok"],[columns]:["typ_pok", "druh_dok_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pokctyp.inheritsFrom(ReadersBase);
Fields.pokctyp = (prefabOptions) => { return {data:new Readers.Pokctyp(),[dropdown]:true,[itemTemplate]:"{druh_dok_txt:trim:encode}",[helperColumns]:["druh_dok_txt"],[itemTooltipTemplate]:"{druh_dok_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.pokctyp(),prefabOptions,options)).show()};};
Selectors.pokctyp = () => { return {data:new Readers.Pokctyp(),[userSettings]:usRoot+"pokctyp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["druh_dok_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "druh_dok_txt", caption: "jres:31850211", width: 100, forced: true})};};

// GReaderPokcups.fields.js
Readers.Pokcups = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPokcups",keys:["up_stav"],[columns]:["up_stav", "up_stav_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pokcups.inheritsFrom(ReadersBase);
Fields.pokcups = (prefabOptions) => { return {data:new Readers.Pokcups(),[dropdown]:true,[itemTemplate]:"{up_stav_txt:trim:encode}",[helperColumns]:["up_stav_txt"],[itemTooltipTemplate]:"{up_stav_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.pokcups(),prefabOptions,options)).show()};};
Selectors.pokcups = () => { return {data:new Readers.Pokcups(),[userSettings]:usRoot+"pokcups",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["up_stav_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "up_stav_txt", caption: "jres:31850113", width: 100, forced: true})};};

// GReaderPokczpp.fields.js
Readers.Pokczpp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPokczpp",keys:["zpus_platby"],[columns]:["zpus_platby", "zpus_platby_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pokczpp.inheritsFrom(ReadersBase);
Fields.pokczpp = (prefabOptions) => { return {data:new Readers.Pokczpp(),[dropdown]:true,[itemTemplate]:"{zpus_platby_txt:trim:encode}",[helperColumns]:["zpus_platby_txt"],[itemTooltipTemplate]:"{zpus_platby_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.pokczpp(),prefabOptions,options)).show()};};
Selectors.pokczpp = () => { return {data:new Readers.Pokczpp(),[userSettings]:usRoot+"pokczpp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zpus_platby_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "zpus_platby_txt", caption: "jres:31850212", width: 100, forced: true})};};

// GReaderPscczpd.fields.js
Readers.Pscczpd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPscczpd",keys:["zp_dopr"],[columns]:["zp_dopr","zp_dopr_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pscczpd.inheritsFrom(ReadersBase);
Fields.pscczpd = (prefabOptions) => { return {data:new Readers.Pscczpd(),[itemTemplate]:"{zp_dopr_txt:trim:encode}",[helperColumns]:["zp_dopr", "zp_dopr_txt"],[itemTooltipTemplate]:"{zp_dopr_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.pscczpd(),prefabOptions,options)).show()};};
Selectors.pscczpd = () => { return {data:new Readers.Pscczpd(),[gridFormat]:new Gordic.Data.GridFormat().addNumberColumn({ name: "zp_dopr", caption: "jres:31850345", width: 100 }).addTextColumn({ name: "zp_dopr_txt", caption: "jres:23350034", width: 100 }),[userSettings]:usRoot+"pscczpd",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zp_dopr", "zp_dopr_txt"]}};};

// GReaderPscscfa.fields.js
Readers.Pscscfa = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPscscfa",keys:["rok","uex_akt"],[columns]:["rok","uex_akt","nazev","poznamka","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pscscfa.inheritsFrom(ReadersBase);
Fields.pscscfa = (prefabOptions) => { return {data:new Readers.Pscscfa(),[itemTemplate]:"{uex_akt:trim:encode} - {nazev}",[helperColumns]:["rok", "uex_akt", "nazev"],[itemTooltipTemplate]:"{uex_akt:trim:encode} - {nazev}",[selector]:(options) => newDefaultSelector($.extend(Selectors.pscscfa(),prefabOptions,options)).show()};};
Selectors.pscscfa = () => { return {data:new Readers.Pscscfa(),[userSettings]:usRoot+"pscscfa",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["rok", "uex_akt", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "uex_akt", caption: "jres:23350031", width: 100, forced: true}).addTextColumn({name: "nazev", caption: "jres:31850346", width: 200})};};

// GReaderPscskho.fields.js
Readers.Pscskho = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPscskho",keys:["ico","rok","kat_hod","typ_poz"],[columns]:["ico","rok","kat_hod","kat_hod_txt","filtr","poznamka","aktivita","dat_zmena","zmenu_prov","typ_poz"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Pscskho.inheritsFrom(ReadersBase);
Fields.pscskho = (prefabOptions) => { return {data:new Readers.Pscskho(),[itemTemplate]:"{kat_hod} - {kat_hod_txt:trim:encode}",[helperColumns]:["ico", "rok", "kat_hod", "typ_poz", "kat_hod_txt"],[itemTooltipTemplate]:"{kat_hod} - {kat_hod_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.pscskho(),prefabOptions,options)).show()};};
Selectors.pscskho = () => { return {data:new Readers.Pscskho(),[gridOpts]:{
		searchColumns: ["kat_hod", "kat_hod_txt"]
	},[userSettings]:usRoot+"pscskho",[isolatedUserSettings]:true,[gridFormat]:newGridFormat().addTextColumn({name: "kat_hod", caption: "jres:31850348", width: 100, forced: true}).addTextColumn({name: "kat_hod_txt", caption: "jres:31850347", width: 100})};};

// GReaderRcnctos.fields.js
Readers.Rcnctos = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnctos",keys:["typ_dos"],[columns]:["typ_dos","typ_dos_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnctos.inheritsFrom(ReadersBase);
Fields.rcnctos = (prefabOptions) => { return {data:new Readers.Rcnctos(),[itemTemplate]:"{typ_dos_txt:trim:encode}",[helperColumns]:["typ_dos", "typ_dos_txt"],[itemTooltipTemplate]:"{typ_dos_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.rcnctos(),prefabOptions,options)).show()};};
Selectors.rcnctos = () => { return {data:new Readers.Rcnctos(),[userSettings]:usRoot+"rcnctos",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_dos", "typ_dos_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "typ_dos", caption: "jres:31850349", width: 100, forced: true})};};

// GReaderRcnczpd.fields.js
Readers.Rcnczpd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnczpd",keys:["zp_dopr"],[columns]:["zp_dopr", "zp_dopr_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnczpd.inheritsFrom(ReadersBase);
Fields.rcnczpd = (prefabOptions) => { return {data:new Readers.Rcnczpd(),[itemTemplate]:"{zp_dopr_txt}",[helperColumns]:["zp_dopr", "zp_dopr_txt"],[itemTooltipTemplate]:"{zp_dopr_txt}",[helperItemTemplate]:function (row) {
		var more = Gordic.Prefabs.Utils.getFormatedLabeledString({ "Popis": row.zp_dopr_txt });
		var info = Gordic.Prefabs.Utils.getSimpleInfoString(row.k_s);
		return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": info, "more": more });
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.rcnczpd(),prefabOptions,options)).show()};};
Selectors.rcnczpd = () => { return {data:new Readers.Rcnczpd(),[gridOpts]:{
		searchColumns: ["zp_dopr", "k_s", "zp_dopr_txt"]
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "k_s", caption: "Zkratka", width: 80 })
		.addTextColumn({ name: "zp_dopr_txt", caption: "Způsob dopravy", width: 150 }),[userSettings]:usRoot+"rcnczpd",[isolatedUserSettings]:true};};

// GReaderRcnsbla.fields.js
Readers.Rcnsbla = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnsbla",keys:["ixs_bla"],[columns]:["ixs_bla","nazev","poznamka","aktivita","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnsbla.inheritsFrom(ReadersBase);
Fields.rcnsbla = (prefabOptions) => { return {data:new Readers.Rcnsbla(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["ixs_bla", "nazev"],[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.rcnsbla(),prefabOptions,options)).show()};};
Selectors.rcnsbla = () => { return {data:new Readers.Rcnsbla(),[userSettings]:usRoot+"rcnsbla",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixs_bla", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850350", width: 100, forced: true})};};

// GReaderRcnskho.fields.js
Readers.Rcnskho = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnskho",keys:["ico","rok","kat_hod"],[columns]:["ico","rok","kat_hod","kat_hod_txt","poznamka","aktivita","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnskho.inheritsFrom(ReadersBase);
Fields.rcnskho = (prefabOptions) => { return {data:new Readers.Rcnskho(),[itemTemplate]:"{kat_hod} - {kat_hod_txt:trim:encode}",[helperColumns]:["ico", "rok", "kat_hod", "kat_hod_txt"],[itemTooltipTemplate]:"{kat_hod} - {kat_hod_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.rcnskho(),prefabOptions,options)).show()};};
Selectors.rcnskho = () => { return {data:new Readers.Rcnskho(),[gridOpts]:{
		searchColumns: ["kat_hod", "kat_hod_txt"]
	},[userSettings]:usRoot+"rcnskho",[isolatedUserSettings]:true,[gridFormat]:newGridFormat().addTextColumn({name: "kat_hod", caption: "jres:31850348", width: 100, forced: true}).addTextColumn({name: "kat_hod_txt", caption: "jres:31850348", width: 100})};};

// GReaderRcnstna.fields.js
Readers.Rcnstna = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnstna",keys:["ixs_tna"],[columns]:["ixs_tna","ktg_tna","ktg_tna_txt","ixs_zpz","nazev","dat_od","dat_do","aktivita","dat_zmena","zmenu_prov","priz_nah","kod_tna","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnstna.inheritsFrom(ReadersBase);
Fields.rcnstna = (prefabOptions) => { return {data:new Readers.Rcnstna(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["ixs_tna", "nazev"],[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.rcnstna(),prefabOptions,options)).show()};};
Selectors.rcnstna = () => { return {data:new Readers.Rcnstna(),[userSettings]:usRoot+"rcnstna",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixs_tna", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850351", width: 100, forced: true})};};

// GReaderRobcpru.fields.js
Readers.Robcpru = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcpru",keys:["typ_pruk"],[columns]:["typ_pruk", "typ_pruk_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcpru.inheritsFrom(ReadersBase);
Fields.robcpru = (prefabOptions) => { return {data:new Readers.Robcpru(),[dropdown]:true,[itemTemplate]:"{typ_pruk_txt:trim:encode}",[helperColumns]:["typ_pruk_txt"],[itemTooltipTemplate]:"{typ_pruk_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.robcpru(),prefabOptions,options)).show()};};
Selectors.robcpru = () => { return {data:new Readers.Robcpru(),[userSettings]:usRoot+"robcpru",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_pruk_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_pruk_txt", caption: "jres:31850213", width: 100, forced: true})};};

// GReaderRobcrst.fields.js
Readers.Robcrst = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRobcrst",keys:["rod_stav"],[columns]:["rod_stav","rod_stav_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robcrst.inheritsFrom(ReadersBase);
Fields.robcrst = (prefabOptions) => { return {data:new Readers.Robcrst(),[dropdown]:true,[itemTemplate]:"{rod_stav_txt:trim:encode}",[helperColumns]:["rod_stav_txt"],[itemTooltipTemplate]:"{rod_stav_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.robcrst(),prefabOptions,options)).show()};};
Selectors.robcrst = () => { return {data:new Readers.Robcrst(),[userSettings]:usRoot+"robcrst",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["rod_stav_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "rod_stav_txt", caption: "jres:31850252", width: 100, forced: true})};};

// GReaderRobctyv.fields.js
Readers.Robctyv = function(options) { ReadersBase.call(this,{[readerClass]:"Gordic.Rob.Client.GReaderRobctyv",keys:["typ_vztahu"],[columns]:["typ_vztahu", "typ_vztahu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Robctyv.inheritsFrom(ReadersBase);
Fields.robctyv = (prefabOptions) => { return {data:new Readers.Robctyv(),[dropdown]:true,[itemTemplate]:"{typ_vztahu_txt:trim:encode}",[helperColumns]:["typ_vztahu_txt"],[itemTooltipTemplate]:"{typ_vztahu_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.robctyv(),prefabOptions,options)).show()};};
Selectors.robctyv = () => { return {data:new Readers.Robctyv(),[userSettings]:usRoot+"robctyv",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_vztahu_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_vztahu_txt", caption: "jres:31850214", width: 100, forced: true})};};

// GReaderRozddde.fields.js
Readers.Rozddde = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRozddde",keys:["rok","ico","subrada"],[columns]:["subrada", "nazev", "zkratka", "ac_cislo_od", "ac_cislo_do", "rok", "ico"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rozddde.inheritsFrom(ReadersBase);
Fields.rozddde = (prefabOptions) => { return {data:new Readers.Rozddde(),[itemTemplate]:"*{subrada}",[helperColumns]:["subrada", "nazev", "zkratka", "ac_cislo_od", "ac_cislo_do"],[helperItemTemplate]:function (row) { 
        var range = FieldFunction.getRangeString(row.ac_cislo_od, row.ac_cislo_do);
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850004": row.nazev, "jres:31850003": row.zkratka, "jres:31850005": range });
        return FieldFunction.getInfoStr({ "info": row.subrada, "more": moreInfo });
    },[itemTooltipTemplate]:"*{subrada}",[selector]:(options) => newDefaultSelector($.extend(Selectors.rozddde(),prefabOptions,options)).show()};};
Selectors.rozddde = () => { return {data:new Readers.Rozddde(),[userSettings]:usRoot+"rozddde",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["subrada", "nazev", "zkratka", "ac_cislo_od", "ac_cislo_do"]},[gridFormat]:newGridFormat().addNumberColumn({name: "subrada", caption: "jres:31850130", width: 50, forced: true}).addTextColumn({name: "zkratka", caption: "jres:31850003", width: 50}).addTextColumn({name: "nazev", caption: "jres:31850131", width: 200}).addNumberColumn({name: "ac_cislo_od", caption: "jres:31850132", width: 50}).addNumberColumn({name: "ac_cislo_do", caption: "jres:31850129", width: 50})};};

// GReaderRozsden.fields.js
Readers.Rozsden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRozsden",keys:["ixp_den"],[columns]:["rok", "nazev", "subrada_max", "ixp_den"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rozsden.inheritsFrom(ReadersBase);
Fields.rozsden = (prefabOptions) => { return {data:new Readers.Rozsden(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["rok", "nazev", "subrada_max"],[helperItemTemplate]:function (row) {
        var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850007": row.rok, "jres:31850035": row.subrada_max });
        return FieldFunction.getInfoStr({ "info": row.nazev, "more": moreInfo });
            },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.rozsden(),prefabOptions,options)).show()};};
Selectors.rozsden = () => { return {data:new Readers.Rozsden(),[userSettings]:usRoot+"rozsden",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["rok", "nazev", "subrada_max"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 200, forced: true}).addNumberColumn({name: "rok", caption: "jres:31850007", width: 50}).addNumberColumn({name: "subrada_max", caption: "jres:31850035", width: 50})};};

// GReaderSmlapid.fields.js
Readers.Smlapid = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlapid",keys:["ixp_sml_pri"],[columns]:["ixp_sml_pri","ac","ac_sml","ktg_sml_txt","popis","ixs_esu"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Smlapid.inheritsFrom(ReadersBase);
Fields.smlapid = (prefabOptions) => { return {data:new Readers.Smlapid(),[itemTemplate]:function (row)
    {
        return FieldFunction.getSimpleInfoString(row.ac_sml, row.popis);
    },[helperColumns]:["ixp_sml_pri", "ac", "ac_sml", "ktg_sml_txt", "popis", "ixs_esu"],[helperItemTemplate]:function (row)
    {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850057": row.ac, "jres:31850032": row.ktg_sml_txt });         var infoStr = FieldFunction.getSimpleInfoString(row.ac_sml, row.popis);
        return FieldFunction.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
    },[itemTooltipTemplate]:function (row) {
        return FieldFunction.getSimpleInfoString(row.ac_sml, row.popis);
    }};};

// GReaderSmlsden.fields.js
Readers.Smlsden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlsden",keys:["ixp_den"],[columns]:["ixp_den","nazev","rok"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Smlsden.inheritsFrom(ReadersBase);
Fields.smlsden = (prefabOptions) => { return {data:new Readers.Smlsden(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "rok"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.nazev, row.rok, "fb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.smlsden(),prefabOptions,options)).show()};};
Selectors.smlsden = () => { return {data:new Readers.Smlsden(),[userSettings]:usRoot+"smlsden",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "rok"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 120, forced: true}).addNumberColumn({name: "rok", caption: "jres:31850007", width: 60})};};

// GReaderSpictsp.fields.js
Readers.Spictsp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSpictsp",keys:["typ_spi"],[columns]:["typ_spi", "typ_spi_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Spictsp.inheritsFrom(ReadersBase);
Fields.spictsp = (prefabOptions) => { return {data:new Readers.Spictsp(),[dropdown]:true,[itemTemplate]:"{typ_spi_txt:trim:encode}",[helperColumns]:["typ_spi_txt"],[itemTooltipTemplate]:"{typ_spi_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.spictsp(),prefabOptions,options)).show()};};
Selectors.spictsp = () => { return {data:new Readers.Spictsp(),[userSettings]:usRoot+"spictsp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_spi_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_spi_txt", caption: "jres:31850215", width: 100, forced: true})};};

// GReaderSpictyu.fields.js
Readers.Spictyu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSpictyu",keys:["kod_tyu"],[columns]:["kod_tyu", "kod_tyu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Spictyu.inheritsFrom(ReadersBase);
Fields.spictyu = (prefabOptions) => { return {data:new Readers.Spictyu(),[dropdown]:true,[itemTemplate]:"{kod_tyu_txt:trim:encode}",[helperColumns]:["kod_tyu_txt"],[itemTooltipTemplate]:"{kod_tyu_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.spictyu(),prefabOptions,options)).show()};};
Selectors.spictyu = () => { return {data:new Readers.Spictyu(),[userSettings]:usRoot+"spictyu",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["kod_tyu_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "kod_tyu_txt", caption: "jres:31850216", width: 100, forced: true})};};

// GReaderSpictyz.fields.js
Readers.Spictyz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSpictyz",keys:["kod_tyz"],[columns]:["kod_tyz", "kod_tyz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Spictyz.inheritsFrom(ReadersBase);
Fields.spictyz = (prefabOptions) => { return {data:new Readers.Spictyz(),[dropdown]:true,[itemTemplate]:"{kod_tyz_txt:trim:encode}",[helperColumns]:["kod_tyz_txt"],[itemTooltipTemplate]:"{kod_tyz_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.spictyz(),prefabOptions,options)).show()};};
Selectors.spictyz = () => { return {data:new Readers.Spictyz(),[userSettings]:usRoot+"spictyz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["kod_tyz_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "kod_tyz_txt", caption: "jres:31850217", width: 100, forced: true})};};

// GReaderSpisspi.fields.js
Readers.Spisspi = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSpisspi",keys:["ixs_spi"],[columns]:["ixs_spi", "zkratka","nazev","typ_spi_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Spisspi.inheritsFrom(ReadersBase);
Fields.spisspi = (prefabOptions) => { return {data:new Readers.Spisspi(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["zkratka", "typ_spi_txt", "nazev"],[helperItemTemplate]:function (row)
    {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850006": row.typ_spi_txt, "jres:31850003": row.zkratka });
        return FieldFunction.getInfoStr({ "info": row.nazev, "more": moreInfo });
    },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.spisspi(),prefabOptions,options)).show()};};
Selectors.spisspi = () => { return {data:new Readers.Spisspi(),[userSettings]:usRoot+"spisspi",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zkratka", "typ_spi_txt", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 150, forced: true}).addTextColumn({name: "zkratka", caption: "jres:31850003", width: 80}).addTextColumn({name: "typ_spi_txt", caption: "jres:31850006", width: 80})};};

// GReaderSpisulm.fields.js
Readers.Spisulm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSpisulm",keys:["ixs_ulm"],[columns]:["ixs_ulm", "mistnost_kod","segment_kod","budova_kod","kod_tyu","popis"],[rowSize]:100,[readAll]:false,[cached]:0,[permanent]:false}, options); };
Readers.Spisulm.inheritsFrom(ReadersBase);
Fields.spisulm = (prefabOptions) => { return {data:new Readers.Spisulm(),[itemTemplate]:"{popis:trim:encode}",[helperColumns]:["popis", "kod_tyu", "budova_kod", "segment_kod", "mistnost_kod"],[helperItemTemplate]:function (row)
	{
	    		var moreInfo = FieldFunction.getFormatedLabeledString({
			"jres:31850006": row.kod_tyu, "jres:31850020": row.budova_kod, "jres:31850021": row.segment_kod, "jres:31850024": row.mistnost_kod }); 	    return FieldFunction.getInfoStr({ "info": row.popis, "more": moreInfo });
	},[itemTooltipTemplate]:"{popis:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.spisulm(),prefabOptions,options)).show()};};
Selectors.spisulm = () => { return {data:new Readers.Spisulm(),[userSettings]:usRoot+"spisulm",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["popis", "kod_tyu", "budova_kod", "segment_kod", "mistnost_kod"]},[gridFormat]:newGridFormat().addTextColumn({name: "popis", caption: "jres:31850015", width: 100, forced: true}).addNumberColumn({name: "kod_tyu", caption: "jres:31850006", width: 80}).addTextColumn({name: "budova_kod", caption: "jres:31850020", width: 80}).addTextColumn({name: "segment_kod", caption: "jres:31850021", width: 80}).addTextColumn({name: "mistnost_kod", caption: "jres:31850024", width: 80})};};

// GReaderSrvckta.fields.js
Readers.Srvckta = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvckta",keys:["ktg_akce"],[columns]:["ktg_akce", "ktg_akce_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Srvckta.inheritsFrom(ReadersBase);
Fields.srvckta = (prefabOptions) => { return {data:new Readers.Srvckta(),[dropdown]:true,[itemTemplate]:"{ktg_akce_txt:trim:encode}",[helperColumns]:["ktg_akce_txt"],[itemTooltipTemplate]:"{ktg_akce_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.srvckta(),prefabOptions,options)).show()};};
Selectors.srvckta = () => { return {data:new Readers.Srvckta(),[userSettings]:usRoot+"srvckta",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ktg_akce_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "ktg_akce_txt", caption: "jres:31850096", width: 100, forced: true})};};

// GReaderSrvcpsk.fields.js
Readers.Srvcpsk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvcpsk",keys:["skp_akce","psk_akce"],[columns]:["skp_akce", "psk_akce", "psk_akce_txt"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Srvcpsk.inheritsFrom(ReadersBase);
Fields.srvcpsk = (prefabOptions) => { return {data:new Readers.Srvcpsk(),[dropdown]:true,[itemTemplate]:"{psk_akce_txt:trim:encode}",[helperColumns]:["psk_akce_txt"],[itemTooltipTemplate]:"{psk_akce_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.srvcpsk(),prefabOptions,options)).show()};};
Selectors.srvcpsk = () => { return {data:new Readers.Srvcpsk(),[userSettings]:usRoot+"srvcpsk",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["psk_akce_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "psk_akce_txt", caption: "jres:31850218", width: 100, forced: true})};};

// GReaderSrvcskp.fields.js
Readers.Srvcskp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvcskp",keys:["skp_akce"],[columns]:["skp_akce", "skp_akce_txt"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Srvcskp.inheritsFrom(ReadersBase);
Fields.srvcskp = (prefabOptions) => { return {data:new Readers.Srvcskp(),[dropdown]:true,[itemTemplate]:"{skp_akce_txt:trim:encode}",[helperColumns]:["skp_akce_txt"],[itemTooltipTemplate]:"{skp_akce_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.srvcskp(),prefabOptions,options)).show()};};
Selectors.srvcskp = () => { return {data:new Readers.Srvcskp(),[userSettings]:usRoot+"srvcskp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["skp_akce_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "skp_akce_txt", caption: "jres:31850056", width: 100, forced: true})};};

// GReaderSrvctya.fields.js
Readers.Srvctya = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvctya",keys:["typ_akce"],[columns]:["typ_akce", "typ_akce_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Srvctya.inheritsFrom(ReadersBase);
Fields.srvctya = (prefabOptions) => { return {data:new Readers.Srvctya(),[dropdown]:true,[itemTemplate]:"{typ_akce_txt:trim:encode}",[helperColumns]:["typ_akce_txt"],[itemTooltipTemplate]:"{typ_akce_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.srvctya(),prefabOptions,options)).show()};};
Selectors.srvctya = () => { return {data:new Readers.Srvctya(),[userSettings]:usRoot+"srvctya",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_akce_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_akce_txt", caption: "jres:31850096", width: 100, forced: true})};};

// GReaderSslceke.fields.js
Readers.Sslceke = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslceke",keys:["stav_materialu"],[columns]:["stav_materialu","stav_materialu_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslceke.inheritsFrom(ReadersBase);
Fields.sslceke = (prefabOptions) => { return {data:new Readers.Sslceke(),[itemTemplate]:"{stav_materialu_txt}",[helperColumns]:["stav_materialu_txt"]};};

// GReaderSslcekm.fields.js
Readers.Sslcekm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslcekm",keys:["typ_materialu"],[columns]:["typ_materialu", "typ_materialu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslcekm.inheritsFrom(ReadersBase);
Fields.sslcekm = (prefabOptions) => { return {data:new Readers.Sslcekm(),[dropdown]:true,[itemTemplate]:"{typ_materialu_txt}",[helperColumns]:["typ_materialu_txt"]};};

// GReaderSslcekp.fields.js
Readers.Sslcekp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslcekp",keys:["typ_pril"],[columns]:["typ_pril","typ_pril_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslcekp.inheritsFrom(ReadersBase);
Fields.sslcekp = (prefabOptions) => { return {data:new Readers.Sslcekp(),[itemTemplate]:"{typ_pril_txt}",[helperColumns]:["typ_pril_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.sslcekp(),prefabOptions,options)).show()};};
Selectors.sslcekp = () => { return {data:new Readers.Sslcekp(),[hasFavorite]:true,[userSettings]:usRoot+"sslcekp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_pril_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_pril_txt", caption: "jres:23350051", width: 100, forced: true})};};

// GReaderSslceks.fields.js
Readers.Sslceks = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslceks",keys:["stav_rizeni"],[columns]:["stav_rizeni","stav_rizeni_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslceks.inheritsFrom(ReadersBase);
Fields.sslceks = (prefabOptions) => { return {data:new Readers.Sslceks(),[dropdown]:true,[itemTemplate]:"{stav_rizeni_txt}",[helperColumns]:["stav_rizeni_txt"]};};

// GReaderSslcekt.fields.js
Readers.Sslcekt = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslcekt",keys:["typ_pripominky"],[columns]:["typ_pripominky","typ_pripominky_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslcekt.inheritsFrom(ReadersBase);
Fields.sslcekt = (prefabOptions) => { return {data:new Readers.Sslcekt(),[itemTemplate]:"{typ_pripominky_txt}",[helperColumns]:["typ_pripominky_txt"]};};

// GReaderSslcpdt.fields.js
Readers.Sslcpdt = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslcpdt",keys:["priz_den_ts"],[columns]:["priz_den_ts","priz_den_ts_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslcpdt.inheritsFrom(ReadersBase);
Fields.sslcpdt = (prefabOptions) => { return {data:new Readers.Sslcpdt(),[itemTemplate]:"{priz_den_ts_txt:trim:encode}",[helperColumns]:["priz_den_ts", "priz_den_ts_txt"],[itemTooltipTemplate]:"{priz_den_ts_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.sslcpdt(),prefabOptions,options)).show()};};
Selectors.sslcpdt = () => { return {data:new Readers.Sslcpdt(),[userSettings]:usRoot+"sslcpdt",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_den_ts", "priz_den_ts_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "priz_den_ts", caption: "jres:30010568", width: 150, forced: true}).addTextColumn({name: "priz_den_ts_txt", caption: "jres:30010569", width: 300})};};

// GReaderSslcskz.fields.js
Readers.Sslcskz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslcskz",keys:["skar_znak"],[columns]:["skar_znak","skar_znak_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslcskz.inheritsFrom(ReadersBase);
Fields.sslcskz = (prefabOptions) => { return {data:new Readers.Sslcskz(),[dropdown]:true,[itemTemplate]:"{skar_znak:trim:encode}",[helperColumns]:["skar_znak", "skar_znak_txt"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.skar_znak, row.skar_znak_txt, "fb"); },[itemTooltipTemplate]:"{skar_znak:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.sslcskz(),prefabOptions,options)).show()};};
Selectors.sslcskz = () => { return {data:new Readers.Sslcskz(),[userSettings]:usRoot+"sslcskz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["skar_znak", "skar_znak_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "skar_znak_txt", caption: "jres:31850246", width: 100, forced: true})};};

// GReaderSslctvy.fields.js
Readers.Sslctvy = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslctvy",keys:["typ_vyriz"],[columns]:["typ_vyriz", "typ_vyriz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslctvy.inheritsFrom(ReadersBase);
Fields.sslctvy = (prefabOptions) => { return {data:new Readers.Sslctvy(),[dropdown]:true,[itemTemplate]:"{typ_vyriz_txt:trim:encode}",[helperColumns]:["typ_vyriz_txt"],[itemTooltipTemplate]:"{typ_vyriz_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.sslctvy(),prefabOptions,options)).show()};};
Selectors.sslctvy = () => { return {data:new Readers.Sslctvy(),[userSettings]:usRoot+"sslctvy",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_vyriz_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_vyriz_txt", caption: "jres:31850219", width: 100, forced: true})};};

// GReaderSslcvsp.fields.js
Readers.Sslcvsp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslcvsp",keys:["vztah_spis"],[columns]:["vztah_spis", "vztah_spis_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslcvsp.inheritsFrom(ReadersBase);
Fields.sslcvsp = (prefabOptions) => { return {data:new Readers.Sslcvsp(),[dropdown]:true,[itemTemplate]:"{vztah_spis_txt:trim:encode}",[helperColumns]:["vztah_spis_txt"],[itemTooltipTemplate]:"{vztah_spis_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.sslcvsp(),prefabOptions,options)).show()};};
Selectors.sslcvsp = () => { return {data:new Readers.Sslcvsp(),[userSettings]:usRoot+"sslcvsp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["vztah_spis_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "vztah_spis_txt", caption: "jres:31850220", width: 100, forced: true})};};

// GReaderSslsden.fields.js
Readers.Sslsden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslsden",keys:["sslden"],[columns]:["sslden", "zkratka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslsden.inheritsFrom(ReadersBase);
Fields.sslsden = (prefabOptions) => { return {data:new Readers.Sslsden(),[dropdown]:true,[itemTemplate]:"{zkratka:trim:encode}",[helperColumns]:["zkratka"],[itemTooltipTemplate]:"{zkratka:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.sslsden(),prefabOptions,options)).show()};};
Selectors.sslsden = () => { return {data:new Readers.Sslsden(),[userSettings]:usRoot+"sslsden",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zkratka"]},[gridFormat]:newGridFormat().addTextColumn({name: "zkratka", caption: "jres:31850255", width: 100, forced: true})};};

// GReaderSslsdenMO.fields.js
Readers.SslsdenMO = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslsdenMO",keys:["sslden"],[columns]:["sslden", "zkratka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SslsdenMO.inheritsFrom(ReadersBase);
Fields.sslsdenMO = (prefabOptions) => { return {data:new Readers.SslsdenMO(),[dropdown]:true,[itemTemplate]:"{zkratka:trim:encode}",[helperColumns]:["zkratka"],[itemTooltipTemplate]:"{zkratka:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.sslsdenMO(),prefabOptions,options)).show()};};
Selectors.sslsdenMO = () => { return {data:new Readers.SslsdenMO(),[userSettings]:usRoot+"sslsdenMO",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zkratka"]},[gridFormat]:newGridFormat().addTextColumn({name: "zkratka", caption: "jres:31850255", width: 100, forced: true})};};

// GReaderSslsspl.fields.js
Readers.Sslsspl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslsspl",keys:["spis_pl"],[columns]:["spis_pl"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslsspl.inheritsFrom(ReadersBase);
Fields.sslsspl = (prefabOptions) => { return {data:new Readers.Sslsspl(),[dropdown]:true,[itemTemplate]:"{spis_pl:trim:encode}",[helperColumns]:["spis_pl"],[itemTooltipTemplate]:"{spis_pl:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.sslsspl(),prefabOptions,options)).show()};};
Selectors.sslsspl = () => { return {data:new Readers.Sslsspl(),[userSettings]:usRoot+"sslsspl",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["spis_pl"]},[gridFormat]:newGridFormat().addTextColumn({name: "spis_pl", caption: "jres:31850264", width: 100, forced: true})};};

// GReaderSslsspz.fields.js
Readers.Sslsspz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslsspz",keys:["spis_pl","spis_znak"],[columns]:["spis_pl","spis_znak","nazev","skar_znak","skar_lhuta", "spis_znak_comma"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslsspz.inheritsFrom(ReadersBase);
Fields.sslsspz = (prefabOptions) => { return {data:new Readers.Sslsspz(),[itemTemplate]:"{spis_znak:trim:encode}",[helperColumns]:["spis_znak", "spis_pl", "nazev", "skar_znak", "skar_lhuta", "spis_znak_comma"],[helperItemTemplate]:function (row)
    {
                var moreInfoTxt = FieldFunction.getFormatedLabeledString({ "jres:31850004": row.nazev, "jres:31850050": row.spis_pl, "jres:31850051": row.skar_znak, "jres:31850052": row.skar_lhuta });          return FieldFunction.getInfoStr({ "info": row.spis_znak, "more": moreInfoTxt });
    },[itemTooltipTemplate]:"{spis_znak:trim:encode}",[validators]:[
        new Gordic.Validators.Base({
            message: "jres:23350068",             validate: function (value, changeObj) {

                if(value && (value.skar_znak == null || value.skar_lhuta == null || value.aktivita != 100)) {
                    return false;
                }

                return true;
            }
        }) 
    ],[selector]:(options) => newDefaultSelector($.extend(Selectors.sslsspz(),prefabOptions,options)).show()};};
Selectors.sslsspz = () => { return {data:new Readers.Sslsspz(),[hasFavorite]:true,[gridFormat]:new Gordic.Data.GridFormat().addTextColumn({
        name: "spis_pl", caption: "jres:31850264", width: 40, forced: true,     }).addTextColumn({
        name: "spis_znak", caption: "jres:31850306", width: 30, filter: [new Gordic.Wfl.Utils.GTextFilterFullTextStartsWithAndUseCommaForDot("spis_znak"), new Gordic.Data.Filters.GSelectionFilterVariant("spis_znak", { columnName: "spis_znak", columnType: "text" })]     }).addTextColumn({
        name: "skar_znak", caption: "jres:31850307", width: 20     }).addTextColumn({
        name: "skar_lhuta_txt", caption: "jres:31850308", width: 30     }).addTextColumn({
        name: "nazev", caption: "jres:31850004", width: 100     }).addTextColumn({
        name: "popis", caption: "jres:31850015", width: 60     }).addTextColumn({
        name: "poznamka", caption: "jres:31850038", width: 60     }),[doNotSearch]:false,[filterPanelOpts]:{
        forms: [Gordic.Prefabs.Selector.FilterForms.Sslsspz],
        favorites: ["spis_pl", "skar_znak", "skar_lhuta"],
        favoriteLayoutDescriptor: "L4M3S1",
        filterStorageService: null,
        filterItemTemplate: "{name}",
        textItemTemplate: "{description}"
    },[gridOpts]:{
        rowsEnabled: function (dataRow) {
            if(dataRow && dataRow.data && (dataRow.data.skar_znak == null || dataRow.data.skar_lhuta == null || dataRow.data.aktivita != 100)) {
                return false; 
            } else {
                return true;
            }
        },
        searchColumns: ["spis_znak", "spis_pl", "nazev", "skar_znak", "skar_lhuta", "spis_znak_comma"]
    },[userSettings]:usRoot+"sslsspz",[isolatedUserSettings]:true};};

// GReaderSslstss.fields.js
Readers.Sslstss = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslstss",keys:["ixs_tss"],[columns]:["ixs_tss", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslstss.inheritsFrom(ReadersBase);
Fields.sslstss = (prefabOptions) => { return {data:new Readers.Sslstss(),[dropdown]:true,[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.sslstss(),prefabOptions,options)).show()};};
Selectors.sslstss = () => { return {data:new Readers.Sslstss(),[userSettings]:usRoot+"sslstss",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850265", width: 100, forced: true})};};

// GReaderSslstyp.fields.js
Readers.Sslstyp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslstyp",keys:["ixs_typ"],[columns]:["ixs_typ", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Sslstyp.inheritsFrom(ReadersBase);
Fields.sslstyp = (prefabOptions) => { return {data:new Readers.Sslstyp(),[itemTemplate]:function (value) {
        if (value && value.nazev) {
            return htmlEncode(value.nazev.trim()) + (value.skar_znak != null && value.skar_lhuta != null ? (" | " + value.skar_znak + "/" + value.skar_lhuta) : "") + (value.nazev_spu != null ? (" | " + value.nazev_spu) : "");
        }
    },[helperColumns]:["nazev"],[itemTooltipTemplate]:function (value) {
        if (value && value.nazev) {
            return htmlEncode(value.nazev.trim()) + (value.skar_znak != null && value.skar_lhuta != null ? (" | " + value.skar_znak + "/" + value.skar_lhuta) : "") + (value.nazev_spu != null ? (" | " + value.nazev_spu) : "");
        }
    },[graphicInput]:"oninput",[selector]:(options) => newDefaultSelector($.extend(Selectors.sslstyp(),prefabOptions,options)).show()};};
Selectors.sslstyp = () => { return {data:new Readers.Sslstyp(),[hasFavorite]:true,[gridFormat]:new Gordic.Data.GridFormat().addTextColumn({
            name: "nazev", caption: Gordic.Wfl.WebClient.GetGWflDBParams().gin_n23_vecsk == 0 ?
                "jres:31850161" :                 "jres:23350075",             width: 250,
            forced: true
        })
            .addTextColumn({ name: "st_utaj_id_txt", caption: "jres:31850162", width: 80 })
            .addNumberColumn({ name: "lhuta_vyr", caption: "jres:31850163", width: 50 })
            .addNumberColumn({ name: "szr_agenda_count", caption: "jres:31850164", width: 45 })
            .addTextColumn({ name: "popis", caption: "jres:31850015", width: 100 })
            .addTextColumn({ name: "zakon_duvod_gdpr", caption: "jres:23350009", width: 100 })
            .addTextColumn({ name: "ktg_typ_txt", caption: "jres:31850359", width: 80 })
            .addTextColumn({ name: "nazev_spu", caption: "jres:23350071", width: 30 })
            .addTextColumn({ name: "skar_znak", caption: "jres:23350063", width: 30 })
            .addNumberColumn({ name: "skar_lhuta", caption: "jres:23350064", width: 30 }),[userSettings]:usRoot+"sslstyp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]}};};

// GReaderSslsumi.fields.js
Readers.Sslsumi = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslsumi",keys:["umisteni"],[columns]:["umisteni", "poznamka","umisteni_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sslsumi.inheritsFrom(ReadersBase);
Fields.sslsumi = (prefabOptions) => { return {data:new Readers.Sslsumi(),[itemTemplate]:function (row) {
                var moreInfoTxt = FieldFunction.getFormatedLabeledString({ "jres:31850368": row.poznamka, "jres:31850369": row.nazev_su });          return FieldFunction.getInfoStr({ info: row.umisteni_txt, more: moreInfoTxt });
    },[helperColumns]:["umisteni_txt", "poznamka", "nazev_su"],[graphicInput]:"oninput",[itemTooltipTemplate]:function (row) {
                var moreInfoTxt = FieldFunction.getFormatedLabeledString({ "jres:31850368": row.poznamka, "jres:31850369": row.nazev_su });          return FieldFunction.getInfoStr({ info: row.umisteni_txt, more: moreInfoTxt });
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.sslsumi(),prefabOptions,options)).show()};};
Selectors.sslsumi = () => { return {data:new Readers.Sslsumi(),[gridOpts]:{
        searchColumns: ["umisteni_txt", "poznamka", "nazev_su"],
        rowsEnabled: function (meta) {
            return (meta && meta.data && meta.data.aktivita === 100) ? true : false; 
        },
        profiles: [
            {
                "name": "jres:31850366",                 "_locked": true,
            },
            {
                "name": "jres:31850367",                 "_locked": true,
                "grouping": "nazev_su",
                "columns": {
                    "nazev_su": {
                        "grouping": {
                            "defaultState": "open"
                        }
                    }
                },
                "_id": "SeskupenoDleSU"
            }
        ]
        
    },[gridFormat]:new Gordic.Data.GridFormat().addTextColumn({ name: "umisteni_txt", caption: "jres:31850271", width: 100 })
        .addTextColumn({
            name: "nazev_su", caption: "jres:31850365", width: 100
        })
        .addTextColumn({ name: "poznamka", caption: "jres:31850038", width: 160 }),[serverFilters]:{ aktivita: 100 },[subTaskOpts]:Gordic.Prefabs.Selector.SubTasks.Aktivita,[menuBar]:[
    {
        favorite: true, action: new GAction({
            name: "newRecord",
            caption: "jres:31850279",             run: function (ev, ctx) {
                var dlg = ctx.dialogCnt.dialogs.showModalWindow(Gordic.Prefabs.Selector.Content.EditNewContent, {
                    dataService: "EditSslsumi",
                    readerClass: "Gordic.ControlsLogic.Client.GReaderSslsumi",
                    form: Gordic.Prefabs.Selector.Forms.Sslsumi,
                    model: {aktivita: 100}
                }); 
                dlg.on("close", function (ev, retVal) {
                                                          ctx.dialogCnt.filterDataAndRefresh(undefined, true);
                });
                /**/
            }
        })
    },
    {
        favorite: true, action: new GAction({
            name: "editRecord",
            caption: "jres:31850280",             run: function (ev, ctx) {
                var arr = ctx.dialogCnt.grid.ggrid("getSelection");
                var dlg = ctx.dialogCnt.dialogs.showModalWindow(Gordic.Prefabs.Selector.Content.EditNewContent, {
                    dataService: "EditSslsumi",
                    form: Gordic.Prefabs.Selector.Forms.Sslsumi,
                    readerClass: "Gordic.ControlsLogic.Client.GReaderSslsumi",
                    edit: true,
                    model: arr.length === 1 ? arr[0] : {}
                });                 dlg.on("close", function (ev, retVal) {
                                       ctx.dialogCnt.filterDataAndRefresh(undefined, true);
                    
                                   });
                /*ctx.dialogCnt.actualFilters = { aktivita: 100 };
                ctx.dialogCnt.filterData();*/
            }
        })
    },
    {
        favorite: true, action: new GAction({
            name: "actSpisUzel",
            checked: false,
            caption: "jres:31850309",             description: "jres:31850310",             run: function (ev, ctx) {

                ctx.dialogCnt.actualFilters = $.extend({}, ctx.dialogCnt.actualFilters, { AktualSpisUzel: !this.checked() });
                ctx.dialogCnt.filterDataAndRefresh(undefined, true);
                this.update({ checked: !this.checked() });
                
                
                /*ctx.dialogCnt.actualFilters = { aktivita: 100 };
                ctx.dialogCnt.filterData();*/
            }
        })
    }],[userSettings]:usRoot+"sslsumi",[isolatedUserSettings]:true};};

// GReaderSslszvs.fields.js
Readers.Sslszvs = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslszvs",keys:["zp_vyriz"],[columns]:["zp_vyriz", "zp_vyriz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Sslszvs.inheritsFrom(ReadersBase);
Fields.sslszvs = (prefabOptions) => { return {data:new Readers.Sslszvs(),[dropdown]:true,[itemTemplate]:"{zp_vyriz_txt:trim:encode}",[helperColumns]:["zp_vyriz_txt"],[itemTooltipTemplate]:"{zp_vyriz_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.sslszvs(),prefabOptions,options)).show()};};
Selectors.sslszvs = () => { return {data:new Readers.Sslszvs(),[userSettings]:usRoot+"sslszvs",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zp_vyriz_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "zp_vyriz_txt", caption: "jres:31850221", width: 100, forced: true})};};

// GReaderCntUctdroz.fields.js
Readers.CntUctdroz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderCntUctdroz",keys:["code"],[columns]:["code","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.CntUctdroz.inheritsFrom(ReadersBase);
Fields.cntUctdroz = (prefabOptions) => { return {data:new Readers.CntUctdroz(),[itemTemplate]:"{code:trim:encode} - {nazev:trim:encode}",[helperColumns]:["code", "nazev"],[itemTooltipTemplate]:"{code:trim:encode} - {nazev:trim:encode}"};};

// GReaderSspcrsp.fields.js
Readers.Sspcrsp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSspcrsp",keys:["s_rezsp"],[columns]:["s_rezsp", "s_rezsp_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sspcrsp.inheritsFrom(ReadersBase);
Fields.sspcrsp = (prefabOptions) => { return {data:new Readers.Sspcrsp(),[dropdown]:true,[itemTemplate]:"{s_rezsp_txt:trim:encode}",[helperColumns]:["s_rezsp_txt"],[itemTooltipTemplate]:"{s_rezsp_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.sspcrsp(),prefabOptions,options)).show()};};
Selectors.sspcrsp = () => { return {data:new Readers.Sspcrsp(),[userSettings]:usRoot+"sspcrsp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["s_rezsp_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "s_rezsp_txt", caption: "jres:31850261", width: 100, forced: true})};};

// GReaderSspcsvy.fields.js
Readers.Sspcsvy = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSspcsvy",keys:["s_vyriz_rezsp"],[columns]:["s_vyriz_rezsp", "s_vyriz_rezsp_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Sspcsvy.inheritsFrom(ReadersBase);
Fields.sspcsvy = (prefabOptions) => { return {data:new Readers.Sspcsvy(),[dropdown]:true,[itemTemplate]:"{s_vyriz_rezsp_txt:trim:encode}",[helperColumns]:["s_vyriz_rezsp_txt"],[itemTooltipTemplate]:"{s_vyriz_rezsp_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.sspcsvy(),prefabOptions,options)).show()};};
Selectors.sspcsvy = () => { return {data:new Readers.Sspcsvy(),[userSettings]:usRoot+"sspcsvy",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["s_vyriz_rezsp_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "s_vyriz_rezsp_txt", caption: "jres:31850222", width: 100, forced: true})};};

// GReaderUctddde.fields.js
Readers.Uctddde = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUctddde",keys:["rok","ico","subrada"],[columns]:["rok","ico","subrada","nazev","zkratka","ac_cislo_od","ac_cislo_do"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Uctddde.inheritsFrom(ReadersBase);
Fields.uctddde = (prefabOptions) => { return {data:new Readers.Uctddde(),[itemTemplate]:"*{subrada}",[helperColumns]:["subrada", "nazev", "zkratka", "ac_cislo_od", "ac_cislo_do"],[helperItemTemplate]:function (row)
    {
        var range = FieldFunction.getRangeString(row.ac_cislo_od, row.ac_cislo_do);
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850004": row.nazev, "jres:31850003": row.zkratka, "jres:31850005": range });
        return FieldFunction.getInfoStr({"info": row.subrada, "more": moreInfo});
    },[itemTooltipTemplate]:"*{subrada}",[selector]:(options) => newDefaultSelector($.extend(Selectors.uctddde(),prefabOptions,options)).show()};};
Selectors.uctddde = () => { return {data:new Readers.Uctddde(),[userSettings]:usRoot+"uctddde",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["subrada", "nazev", "zkratka", "ac_cislo_od", "ac_cislo_do"]},[gridFormat]:newGridFormat().addNumberColumn({name: "subrada", caption: "jres:31850130", width: 50, forced: true}).addTextColumn({name: "zkratka", caption: "jres:31850003", width: 50}).addTextColumn({name: "nazev", caption: "jres:31850131", width: 200}).addNumberColumn({name: "ac_cislo_od", caption: "jres:31850132", width: 50}).addNumberColumn({name: "ac_cislo_do", caption: "jres:31850129", width: 50})};};

// GReaderUctdroz.fields.js
Readers.Uctdroz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUctdroz",keys:["xuete","ixs_roz","uroven_kon"],[columns]:["xuete", "ixs_roz", "uroven_kon", "code","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Uctdroz.inheritsFrom(ReadersBase);
Fields.uctdroz = (prefabOptions) => { return {data:new Readers.Uctdroz(),[itemTemplate]:"{code:trim:encode} - {nazev:trim:encode}",[helperColumns]:["code", "nazev"],[itemTooltipTemplate]:"{code:trim:encode} - {nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.uctdroz(),prefabOptions,options)).show()};};
Selectors.uctdroz = () => { return {data:new Readers.Uctdroz(),[userSettings]:usRoot+"uctdroz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["code", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "code", caption: "jres:31850048", width: 120, forced: true}).addTextColumn({name: "nazev", caption: "jres:31850004", width: 250})};};

// GReaderUctsden.fields.js
Readers.Uctsden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUctsden",keys:["ixp_den"],[columns]:["ixp_den", "rok","nazev","subrada_max"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Uctsden.inheritsFrom(ReadersBase);
Fields.uctsden = (prefabOptions) => { return {data:new Readers.Uctsden(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["rok", "nazev", "subrada_max"],[helperItemTemplate]:function (row) {
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850007": row.rok, "jres:31850035": row.subrada_max });
        return FieldFunction.getInfoStr({ "info": row.nazev, "more": moreInfo });
    },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.uctsden(),prefabOptions,options)).show()};};
Selectors.uctsden = () => { return {data:new Readers.Uctsden(),[userSettings]:usRoot+"uctsden",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["rok", "nazev", "subrada_max"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850155", width: 200, forced: true}).addNumberColumn({name: "rok", caption: "jres:31850007", width: 50}).addNumberColumn({name: "subrada_max", caption: "jres:31850035", width: 50})};};

// GReaderUctsroz.fields.js
Readers.Uctsroz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUctsroz",keys:["ixs_roz"],[columns]:["ixs_roz", "dat_od","dat_do","zkratka","nazev","rok","typ_rzv_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Uctsroz.inheritsFrom(ReadersBase);
Fields.uctsroz = (prefabOptions) => { return {data:new Readers.Uctsroz(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["zkratka", "nazev", "rok", "typ_rzv_txt", "dat_od", "dat_do"],[helperItemTemplate]:function (row)
    {
        var dateRange = FieldFunction.getDateFromTo(row.dat_od, row.dat_do);
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850003": row.zkratka, "jres:31850006": row.typ_rzv_txt, "jres:31850007": row.rok, "jres:31850008": dateRange });
        return FieldFunction.getInfoStr({ "info": row.nazev, "more": moreInfo });    
    },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.uctsroz(),prefabOptions,options)).show()};};
Selectors.uctsroz = () => { return {data:new Readers.Uctsroz(),[userSettings]:usRoot+"uctsroz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zkratka", "nazev", "rok", "typ_rzv_txt", "dat_od", "dat_do"]},[gridFormat]:newGridFormat().addNumberColumn({name: "rok", caption: "jres:31850007", width: 50, forced: true}).addTextColumn({name: "zkratka", caption: "jres:31850003", width: 50}).addTextColumn({name: "nazev", caption: "jres:31850004", width: 200}).addTextColumn({name: "typ_rzv_txt", caption: "jres:31850006", width: 50}).addDateColumn({name: "dat_od", caption: "jres:31850152", width: 80}).addDateColumn({name: "dat_do", caption: "jres:31850153", width: 80})};};

// GReaderVepsdup.fields.js
Readers.Vepsdup = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderVepsdup",keys:["ixs_dup"],[columns]:["ixs_dup", "nazev","ktg_poz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Vepsdup.inheritsFrom(ReadersBase);
Fields.vepsdup = (prefabOptions) => { return {data:new Readers.Vepsdup(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "ktg_poz_txt"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.nazev, row.ktg_poz_txt, "fb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.vepsdup(),prefabOptions,options)).show()};};
Selectors.vepsdup = () => { return {data:new Readers.Vepsdup(),[userSettings]:usRoot+"vepsdup",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "ktg_poz_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "ktg_poz_txt", caption: "jres:31850120", width: 100, forced: true}).addTextColumn({name: "nazev", caption: "jres:31850119", width: 100})};};

// GReaderWflaprj.fields.js
Readers.Wflaprj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflaprj",keys:["typ_adr"],[columns]:["typ_adr","def_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflaprj.inheritsFrom(ReadersBase);
Fields.wflaprj = (prefabOptions) => { return {data:new Readers.Wflaprj(),[dropdown]:true,[itemTemplate]:"{def_txt:trim:encode}",[helperColumns]:["def_txt"],[itemTooltipTemplate]:"{def_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflaprj(),prefabOptions,options)).show()};};
Selectors.wflaprj = () => { return {data:new Readers.Wflaprj(),[userSettings]:usRoot+"wflaprj",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["def_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "def_txt", caption: "jres:31850259", width: 100, forced: true})};};

// GReaderWflcbyp.fields.js
Readers.Wflcbyp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcbyp",keys:["byvaly_policista"],[columns]:["byvaly_policista", "byvaly_policista_t"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcbyp.inheritsFrom(ReadersBase);
Fields.wflcbyp = (prefabOptions) => { return {data:new Readers.Wflcbyp(),[dropdown]:true,[itemTemplate]:"{byvaly_policista_t:trim:encode}",[helperColumns]:["byvaly_policista_t"],[itemTooltipTemplate]:"{byvaly_policista_t:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcbyp(),prefabOptions,options)).show()};};
Selectors.wflcbyp = () => { return {data:new Readers.Wflcbyp(),[userSettings]:usRoot+"wflcbyp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["byvaly_policista_t"]},[gridFormat]:newGridFormat().addTextColumn({name: "byvaly_policista_t", caption: "jres:31850223", width: 100, forced: true})};};

// GReaderWflccsk.fields.js
Readers.Wflccsk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflccsk",keys:["id_csk"],[columns]:["id_csk","id_csk_txt","csk_class","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflccsk.inheritsFrom(ReadersBase);
Fields.wflccsk = (prefabOptions) => { return {data:new Readers.Wflccsk(),[dropdown]:true,[itemTemplate]:"{id_csk_txt:trim:encode}",[helperColumns]:["id_csk_txt", "csk_class"],[helperItemTemplate]:function (row) {
                                var moreInfo = FieldFunction.getFormatedLabeledString({
            "jres:31850330": row.csk_class         });

                        return FieldFunction.getInfoStr({
            info: row.id_csk_txt,
            more: moreInfo
        });
    },[itemTooltipTemplate]:"{id_csk_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflccsk(),prefabOptions,options)).show()};};
Selectors.wflccsk = () => { return {data:new Readers.Wflccsk(),[userSettings]:usRoot+"wflccsk",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["id_csk_txt", "csk_class"]},[gridFormat]:newGridFormat().addTextColumn({name: "id_csk_txt", caption: "jres:23350016", width: 100, forced: true}).addTextColumn({name: "csk_class", caption: "jres:31850330", width: 100})};};

// GReaderWflcdrz.fields.js
Readers.Wflcdrz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcdrz",keys:["druh_zas"],[columns]:["druh_zas", "druh_zas_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcdrz.inheritsFrom(ReadersBase);
Fields.wflcdrz = (prefabOptions) => { return {data:new Readers.Wflcdrz(),[dropdown]:true,[graphicInput]:"hidden",[itemTemplate]:"{druh_zas_txt:trim:encode}",[helperColumns]:["druh_zas_txt"],[itemTooltipTemplate]:"{druh_zas_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcdrz(),prefabOptions,options)).show()};};
Selectors.wflcdrz = () => { return {data:new Readers.Wflcdrz(),[userSettings]:usRoot+"wflcdrz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["druh_zas_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "druh_zas_txt", caption: "jres:31850123", width: 100, forced: true})};};

// GReaderWflcdzz.fields.js
Readers.Wflcdzz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcdzz",keys:["druh_zas_zach"],[columns]:["druh_zas_zach", "druh_zas_zach_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcdzz.inheritsFrom(ReadersBase);
Fields.wflcdzz = (prefabOptions) => { return {data:new Readers.Wflcdzz(),[dropdown]:true,[graphicInput]:"hidden",[itemTemplate]:"{druh_zas_zach_txt:trim:encode}",[helperColumns]:["druh_zas_zach_txt"],[itemTooltipTemplate]:"{druh_zas_zach_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcdzz(),prefabOptions,options)).show()};};
Selectors.wflcdzz = () => { return {data:new Readers.Wflcdzz(),[userSettings]:usRoot+"wflcdzz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["druh_zas_zach_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "druh_zas_zach_txt", caption: "jres:31850167", width: 100, forced: true})};};

// GReaderWflceps.fields.js
Readers.Wflceps = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflceps",keys:["typ_eps"],[columns]:["typ_eps","typ_eps_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflceps.inheritsFrom(ReadersBase);
Fields.wflceps = (prefabOptions) => { return {data:new Readers.Wflceps(),[itemTemplate]:"{typ_eps_txt:trim:encode}",[helperColumns]:["typ_eps", "typ_eps_txt"],[itemTooltipTemplate]:"{typ_eps_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflceps(),prefabOptions,options)).show()};};
Selectors.wflceps = () => { return {data:new Readers.Wflceps(),[userSettings]:usRoot+"wflceps",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_eps", "typ_eps_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "typ_eps", caption: "jres:30025342", width: 150, forced: true}).addTextColumn({name: "typ_eps_txt", caption: "jres:30025344", width: 300})};};

// GReaderWflcfor.fields.js
Readers.Wflcfor = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcfor",keys:["forma_prilohy"],[columns]:["forma_prilohy","forma_prilohy_txt","k_v","typ_prilohy"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcfor.inheritsFrom(ReadersBase);
Fields.wflcfor = (prefabOptions) => { return {data:new Readers.Wflcfor(),[itemTemplate]:"{forma_prilohy_txt:trim:encode}",[helperColumns]:["forma_prilohy_txt"],[itemTooltipTemplate]:"{forma_prilohy_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcfor(),prefabOptions,options)).show()};};
Selectors.wflcfor = () => { return {data:new Readers.Wflcfor(),[userSettings]:usRoot+"wflcfor",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["forma_prilohy_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "forma_prilohy_txt", caption: "jres:23350037", width: 100, forced: true})};};

// GReaderWflcfsk.fields.js
Readers.Wflcfsk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcfsk",keys:["typ_zarazeni"],[columns]:["typ_zarazeni", "typ_zarazeni_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcfsk.inheritsFrom(ReadersBase);
Fields.wflcfsk = (prefabOptions) => { return {data:new Readers.Wflcfsk(),[itemTemplate]:"{typ_zarazeni_txt:trim:encode}",[helperColumns]:["typ_zarazeni_txt"],[itemTooltipTemplate]:"{typ_zarazeni_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcfsk(),prefabOptions,options)).show()};};
Selectors.wflcfsk = () => { return {data:new Readers.Wflcfsk(),[userSettings]:usRoot+"wflcfsk",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_zarazeni_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "typ_zarazeni", caption: "jres:21350007", width: 150, forced: true}).addTextColumn({name: "typ_zarazeni_txt", caption: "jres:21350007", width: 150})};};

// GReaderWflckdp.fields.js
Readers.Wflckdp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflckdp",keys:["ktg_duv_podp"],[columns]:["ktg_duv_podp","ktg_duv_podp_txt","k_v","k_s","pri_multi","ktg_duv_podp_rsx"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflckdp.inheritsFrom(ReadersBase);
Fields.wflckdp = (prefabOptions) => { return {data:new Readers.Wflckdp(),[itemTemplate]:"{ktg_duv_podp_txt:trim:encode}",[helperColumns]:["ktg_duv_podp_txt"],[dropdown]:true,[itemTooltipTemplate]:"{ktg_duv_podp_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflckdp(),prefabOptions,options)).show()};};
Selectors.wflckdp = () => { return {data:new Readers.Wflckdp(),[userSettings]:usRoot+"wflckdp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ktg_duv_podp_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "ktg_duv_podp_txt", caption: "jres:31850355", width: 150, forced: true})};};

// GReaderWflckrs.fields.js
Readers.Wflckrs = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflckrs",keys:["krg_rsp"],[columns]:["krg_rsp", "krg_rsp_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflckrs.inheritsFrom(ReadersBase);
Fields.wflckrs = (prefabOptions) => { return {data:new Readers.Wflckrs(),[dropdown]:true,[itemTemplate]:"{krg_rsp_txt:trim:encode}",[helperColumns]:["krg_rsp_txt"],[itemTooltipTemplate]:"{krg_rsp_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflckrs(),prefabOptions,options)).show()};};
Selectors.wflckrs = () => { return {data:new Readers.Wflckrs(),[userSettings]:usRoot+"wflckrs",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["krg_rsp_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "krg_rsp_txt", caption: "jres:23350023", width: 100, forced: true})};};

// GReaderWflcksr.fields.js
Readers.Wflcksr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcksr",keys:["ktg_sch_role"],[columns]:["ktg_sch_role", "ktg_sch_role_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcksr.inheritsFrom(ReadersBase);
Fields.wflcksr = (prefabOptions) => { return {data:new Readers.Wflcksr(),[dropdown]:true,[itemTemplate]:"{ktg_sch_role_txt:trim:encode}",[helperColumns]:["ktg_sch_role_txt"],[itemTooltipTemplate]:"{ktg_sch_role_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcksr(),prefabOptions,options)).show()};};
Selectors.wflcksr = () => { return {data:new Readers.Wflcksr(),[userSettings]:usRoot+"wflcksr",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ktg_sch_role_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "ktg_sch_role_txt", caption: "jres:31850266", width: 100, forced: true})};};

// GReaderWflcktp.fields.js
Readers.Wflcktp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcktp",keys:["ktg_typ_pri"],[columns]:["ktg_typ_pri", "ktg_typ_pri_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcktp.inheritsFrom(ReadersBase);
Fields.wflcktp = (prefabOptions) => { return {data:new Readers.Wflcktp(),[dropdown]:true,[itemTemplate]:"{ktg_typ_pri_txt:trim:encode}",[helperColumns]:["ktg_typ_pri_txt"],[itemTooltipTemplate]:"{ktg_typ_pri_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcktp(),prefabOptions,options)).show()};};
Selectors.wflcktp = () => { return {data:new Readers.Wflcktp(),[userSettings]:usRoot+"wflcktp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ktg_typ_pri_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "ktg_typ_pri_txt", caption: "jres:31850224", width: 100, forced: true})};};

// GReaderWflcopa.fields.js
Readers.Wflcopa = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcopa",keys:["priz_opa"],[columns]:["priz_opa","priz_opa_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcopa.inheritsFrom(ReadersBase);
Fields.wflcopa = (prefabOptions) => { return {data:new Readers.Wflcopa(),[itemTemplate]:"{priz_opa_txt:trim:encode}",[helperColumns]:["priz_opa", "priz_opa_txt"],[itemTooltipTemplate]:"{priz_opa_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcopa(),prefabOptions,options)).show()};};
Selectors.wflcopa = () => { return {data:new Readers.Wflcopa(),[userSettings]:usRoot+"wflcopa",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_opa", "priz_opa_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "priz_opa", caption: "jres:21350002", width: 150, forced: true}).addTextColumn({name: "priz_opa_txt", caption: "jres:21350002", width: 300})};};

// GReaderWflcori.fields.js
Readers.Wflcori = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcori",keys:["s_orig"],[columns]:["s_orig", "s_orig_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcori.inheritsFrom(ReadersBase);
Fields.wflcori = (prefabOptions) => { return {data:new Readers.Wflcori(),[dropdown]:true,[itemTemplate]:"{s_orig_txt:trim:encode}",[helperColumns]:["s_orig_txt"],[itemTooltipTemplate]:"{s_orig_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcori(),prefabOptions,options)).show()};};
Selectors.wflcori = () => { return {data:new Readers.Wflcori(),[userSettings]:usRoot+"wflcori",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["s_orig_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "s_orig_txt", caption: "jres:31850225", width: 100, forced: true})};};

// GReaderWflcpcj.fields.js
Readers.Wflcpcj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcpcj",keys:["priz_cj"],[columns]:["priz_cj", "priz_cj_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcpcj.inheritsFrom(ReadersBase);
Fields.wflcpcj = (prefabOptions) => { return {data:new Readers.Wflcpcj(),[dropdown]:true,[itemTemplate]:"{priz_cj_txt:trim:encode}",[helperColumns]:["priz_cj_txt"],[itemTooltipTemplate]:"{priz_cj_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcpcj(),prefabOptions,options)).show()};};
Selectors.wflcpcj = () => { return {data:new Readers.Wflcpcj(),[userSettings]:usRoot+"wflcpcj",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_cj_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "priz_cj_txt", caption: "jres:31850226", width: 100, forced: true})};};

// GReaderWflcpet.fields.js
Readers.Wflcpet = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcpet",keys:["priz_edit_termin"],[columns]:["priz_edit_termin", "priz_edit_termin_t"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcpet.inheritsFrom(ReadersBase);
Fields.wflcpet = (prefabOptions) => { return {data:new Readers.Wflcpet(),[itemTemplate]:"{priz_edit_termin_t:trim:encode}",[helperColumns]:["priz_edit_termin_t"],[itemTooltipTemplate]:"{priz_edit_termin_t:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcpet(),prefabOptions,options)).show()};};
Selectors.wflcpet = () => { return {data:new Readers.Wflcpet(),[userSettings]:usRoot+"wflcpet",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_edit_termin_t"]},[gridFormat]:newGridFormat().addNumberColumn({name: "priz_edit_termin", caption: "jres:21350003", width: 150, forced: true}).addTextColumn({name: "priz_edit_termin_t", caption: "jres:21350003", width: 300})};};

// GReaderWflcplz.fields.js
Readers.Wflcplz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcplz",keys:["plan_zve"],[columns]:["plan_zve","plan_zve_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcplz.inheritsFrom(ReadersBase);
Fields.wflcplz = (prefabOptions) => { return {data:new Readers.Wflcplz(),[itemTemplate]:"{plan_zve_txt:trim:encode}",[helperColumns]:["plan_zve_txt"],[dropdown]:true,[itemTooltipTemplate]:"{plan_zve_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcplz(),prefabOptions,options)).show()};};
Selectors.wflcplz = () => { return {data:new Readers.Wflcplz(),[userSettings]:usRoot+"wflcplz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["plan_zve_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "plan_zve_txt", caption: "jres:31850354", width: 120, forced: true})};};

// GReaderWflcpob.fields.js
Readers.Wflcpob = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcpob",keys:["priz_obal"],[columns]:["priz_obal", "priz_obal_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcpob.inheritsFrom(ReadersBase);
Fields.wflcpob = (prefabOptions) => { return {data:new Readers.Wflcpob(),[dropdown]:true,[itemTemplate]:"{priz_obal_txt:trim:encode}",[helperColumns]:["priz_obal_txt"],[itemTooltipTemplate]:"{priz_obal_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcpob(),prefabOptions,options)).show()};};
Selectors.wflcpob = () => { return {data:new Readers.Wflcpob(),[userSettings]:usRoot+"wflcpob",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_obal_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "priz_obal_txt", caption: "jres:31850227", width: 100, forced: true})};};

// GReaderWflcpok.fields.js
Readers.Wflcpok = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcpok",keys:["priz_opak"],[columns]:["priz_opak", "priz_opak_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcpok.inheritsFrom(ReadersBase);
Fields.wflcpok = (prefabOptions) => { return {data:new Readers.Wflcpok(),[itemTemplate]:"{priz_opak_txt:trim:encode}",[helperColumns]:["priz_opak_txt"],[itemTooltipTemplate]:"{priz_opak_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcpok(),prefabOptions,options)).show()};};
Selectors.wflcpok = () => { return {data:new Readers.Wflcpok(),[userSettings]:usRoot+"wflcpok",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_opak_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "priz_opak", caption: "jres:21350004", width: 150, forced: true}).addTextColumn({name: "priz_opak_txt", caption: "jres:21350004", width: 300})};};

// GReaderWflcpos.fields.js
Readers.Wflcpos = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcpos",keys:["post_sluzba"],[columns]:["post_sluzba", "post_sluzba_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcpos.inheritsFrom(ReadersBase);
Fields.wflcpos = (prefabOptions) => { return {data:new Readers.Wflcpos(),[dropdown]:true,[itemTemplate]:"{post_sluzba_txt:trim:encode}",[helperColumns]:["post_sluzba_txt"],[itemTooltipTemplate]:"{post_sluzba_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcpos(),prefabOptions,options)).show()};};
Selectors.wflcpos = () => { return {data:new Readers.Wflcpos(),[userSettings]:usRoot+"wflcpos",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["post_sluzba_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "post_sluzba_zkr", caption: "jres:23350035", width: 25, forced: true}).addTextColumn({name: "post_sluzba_txt", caption: "jres:31850267", width: 100})};};

// GReaderWflcpro.fields.js
Readers.Wflcpro = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcpro",keys:["priz_ro"],[columns]:["priz_ro","priz_ro_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcpro.inheritsFrom(ReadersBase);
Fields.wflcpro = (prefabOptions) => { return {data:new Readers.Wflcpro(),[itemTemplate]:"{priz_ro_txt:trim:encode}",[helperColumns]:["priz_ro", "priz_ro_txt"],[itemTooltipTemplate]:"{priz_ro_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcpro(),prefabOptions,options)).show()};};
Selectors.wflcpro = () => { return {data:new Readers.Wflcpro(),[userSettings]:usRoot+"wflcpro",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_ro", "priz_ro_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "priz_ro", caption: "jres:30025603", width: 150, forced: true}).addTextColumn({name: "priz_ro_txt", caption: "jres:30025605", width: 300})};};

// GReaderWflcprt.fields.js
Readers.Wflcprt = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcprt",keys:["typ_prilohy"],[columns]:["typ_prilohy","typ_prilohy_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcprt.inheritsFrom(ReadersBase);
Fields.wflcprt = (prefabOptions) => { return {data:new Readers.Wflcprt(),[itemTemplate]:"{typ_prilohy_txt:trim:encode}",[helperColumns]:["typ_prilohy_txt"],[itemTooltipTemplate]:"{typ_prilohy_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcprt(),prefabOptions,options)).show()};};
Selectors.wflcprt = () => { return {data:new Readers.Wflcprt(),[userSettings]:usRoot+"wflcprt",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_prilohy_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_prilohy_txt", caption: "jres:23350036", width: 100, forced: true})};};

// GReaderWflcpsp.fields.js
Readers.Wflcpsp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcpsp",keys:["priz_rsp"],[columns]:["priz_rsp", "priz_rsp_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcpsp.inheritsFrom(ReadersBase);
Fields.wflcpsp = (prefabOptions) => { return {data:new Readers.Wflcpsp(),[dropdown]:true,[itemTemplate]:"{priz_rsp_txt:trim:encode}",[helperColumns]:["priz_rsp_txt"],[itemTooltipTemplate]:"{priz_rsp_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcpsp(),prefabOptions,options)).show()};};
Selectors.wflcpsp = () => { return {data:new Readers.Wflcpsp(),[userSettings]:usRoot+"wflcpsp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_rsp_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "priz_rsp_txt", caption: "jres:31850247", width: 100, forced: true})};};

// GReaderWflcpub.fields.js
Readers.Wflcpub = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcpub",keys:["priz_pub"],[columns]:["priz_pub","priz_pub_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcpub.inheritsFrom(ReadersBase);
Fields.wflcpub = (prefabOptions) => { return {data:new Readers.Wflcpub(),[itemTemplate]:"{priz_pub_txt:trim:encode}",[helperColumns]:["priz_pub", "priz_pub_txt"],[itemTooltipTemplate]:"{priz_pub_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcpub(),prefabOptions,options)).show()};};
Selectors.wflcpub = () => { return {data:new Readers.Wflcpub(),[userSettings]:usRoot+"wflcpub",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_pub", "priz_pub_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "priz_pub", caption: "jres:30025640", width: 150, forced: true}).addTextColumn({name: "priz_pub_txt", caption: "jres:30025642", width: 300})};};

// GReaderWflcpud.fields.js
Readers.Wflcpud = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcpud",keys:["priz_ud"],[columns]:["priz_ud","priz_ud_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcpud.inheritsFrom(ReadersBase);
Fields.wflcpud = (prefabOptions) => { return {data:new Readers.Wflcpud(),[itemTemplate]:"{priz_ud_txt:trim:encode}",[helperColumns]:["priz_ud", "priz_ud_txt"],[itemTooltipTemplate]:"{priz_ud_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcpud(),prefabOptions,options)).show()};};
Selectors.wflcpud = () => { return {data:new Readers.Wflcpud(),[userSettings]:usRoot+"wflcpud",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_ud", "priz_ud_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "priz_ud", caption: "jres:30029012", width: 150, forced: true}).addTextColumn({name: "priz_ud_txt", caption: "jres:30025647", width: 300})};};

// GReaderWflcpuv.fields.js
Readers.Wflcpuv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcpuv",keys:["puvod"],[columns]:["puvod", "puvod_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcpuv.inheritsFrom(ReadersBase);
Fields.wflcpuv = (prefabOptions) => { return {data:new Readers.Wflcpuv(),[dropdown]:true,[itemTemplate]:"{puvod_txt:trim:encode}",[helperColumns]:["puvod_txt"],[itemTooltipTemplate]:"{puvod_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcpuv(),prefabOptions,options)).show()};};
Selectors.wflcpuv = () => { return {data:new Readers.Wflcpuv(),[userSettings]:usRoot+"wflcpuv",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["puvod_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "puvod_txt", caption: "jres:31850228", width: 100, forced: true})};};

// GReaderWflcsdo.fields.js
Readers.Wflcsdo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcsdo",keys:["s_dor"],[columns]:["s_dor", "s_dor_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcsdo.inheritsFrom(ReadersBase);
Fields.wflcsdo = (prefabOptions) => { return {data:new Readers.Wflcsdo(),[dropdown]:true,[itemTemplate]:"{s_dor_txt:trim:encode}",[helperColumns]:["s_dor_txt"],[itemTooltipTemplate]:"{s_dor_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcsdo(),prefabOptions,options)).show()};};
Selectors.wflcsdo = () => { return {data:new Readers.Wflcsdo(),[userSettings]:usRoot+"wflcsdo",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["s_dor_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "s_dor_txt", caption: "jres:31850229", width: 100, forced: true})};};

// GReaderWflcspu.fields.js
Readers.Wflcspu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcspu",keys:["sch_pov"],[columns]:["sch_pov", "sch_pov_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcspu.inheritsFrom(ReadersBase);
Fields.wflcspu = (prefabOptions) => { return {data:new Readers.Wflcspu(),[itemTemplate]:"{sch_pov_txt:trim:encode}",[helperColumns]:["sch_pov_txt"],[itemTooltipTemplate]:"{sch_pov_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcspu(),prefabOptions,options)).show()};};
Selectors.wflcspu = () => { return {data:new Readers.Wflcspu(),[userSettings]:usRoot+"wflcspu",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["sch_pov_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "sch_pov", caption: "jres:21350001", width: 150, forced: true}).addTextColumn({name: "sch_pov_txt", caption: "jres:23350026", width: 300})};};

// GReaderWflcstp.fields.js
Readers.Wflcstp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcstp",keys:["stav_pis"],[columns]:["stav_pis", "stav_pis_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcstp.inheritsFrom(ReadersBase);
Fields.wflcstp = (prefabOptions) => { return {data:new Readers.Wflcstp(),[dropdown]:true,[itemTemplate]:"{stav_pis_txt:trim:encode}",[helperColumns]:["stav_pis_txt"],[itemTooltipTemplate]:"{stav_pis_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcstp(),prefabOptions,options)).show()};};
Selectors.wflcstp = () => { return {data:new Readers.Wflcstp(),[userSettings]:usRoot+"wflcstp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stav_pis_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "stav_pis_txt", caption: "jres:31850230", width: 100, forced: true})};};

// GReaderWflcstv.fields.js
Readers.Wflcstv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcstv",keys:["stav_vyriz"],[columns]:["stav_vyriz", "stav_vyriz_zkr","stav_vyriz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcstv.inheritsFrom(ReadersBase);
Fields.wflcstv = (prefabOptions) => { return {data:new Readers.Wflcstv(),[dropdown]:true,[itemTemplate]:"{stav_vyriz_txt:trim:encode}",[helperColumns]:["stav_vyriz_txt", "stav_vyriz_zkr"],[helperItemTemplate]:function (row) { return FieldFunction.getInfoStr({ "info": row.stav_vyriz_txt, "more": row.stav_vyriz_zkr }); },[itemTooltipTemplate]:"{stav_vyriz_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcstv(),prefabOptions,options)).show()};};
Selectors.wflcstv = () => { return {data:new Readers.Wflcstv(),[userSettings]:usRoot+"wflcstv",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stav_vyriz_txt", "stav_vyriz_zkr"]},[gridFormat]:newGridFormat().addTextColumn({name: "stav_vyriz_txt", caption: "jres:31850257", width: 100, forced: true}).addTextColumn({name: "stav_vyriz_zkr", caption: "jres:31850256", width: 100})};};

// GReaderWflcsve.fields.js
Readers.Wflcsve = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcsve",keys:["stav_verif"],[columns]:["stav_verif", "stav_verif_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcsve.inheritsFrom(ReadersBase);
Fields.wflcsve = (prefabOptions) => { return {data:new Readers.Wflcsve(),[dropdown]:true,[itemTemplate]:"{stav_verif_txt:trim:encode}",[helperColumns]:["stav_verif_txt"],[itemTooltipTemplate]:"{stav_verif_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcsve(),prefabOptions,options)).show()};};
Selectors.wflcsve = () => { return {data:new Readers.Wflcsve(),[userSettings]:usRoot+"wflcsve",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stav_verif_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "stav_verif_txt", caption: "jres:31850093", width: 100, forced: true})};};

// GReaderWflcsza.fields.js
Readers.Wflcsza = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcsza",keys:["sluzebne_zarazeni"],[columns]:["sluzebne_zarazeni", "sluzebne_zaraz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcsza.inheritsFrom(ReadersBase);
Fields.wflcsza = (prefabOptions) => { return {data:new Readers.Wflcsza(),[dropdown]:true,[itemTemplate]:"{sluzebne_zaraz_txt:trim:encode}",[helperColumns]:["sluzebne_zaraz_txt"],[itemTooltipTemplate]:"{sluzebne_zaraz_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcsza(),prefabOptions,options)).show()};};
Selectors.wflcsza = () => { return {data:new Readers.Wflcsza(),[userSettings]:usRoot+"wflcsza",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["sluzebne_zaraz_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "sluzebne_zaraz_txt", caption: "jres:31850248", width: 100, forced: true})};};

// GReaderWflcszp.fields.js
Readers.Wflcszp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcszp",keys:["stav_zpv"],[columns]:["stav_zpv","stav_zpv_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcszp.inheritsFrom(ReadersBase);
Fields.wflcszp = (prefabOptions) => { return {data:new Readers.Wflcszp(),[itemTemplate]:"{stav_zpv_txt:trim:encode}",[helperColumns]:["stav_zpv_txt"],[dropdown]:true,[itemTooltipTemplate]:"{stav_zpv_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcszp(),prefabOptions,options)).show()};};
Selectors.wflcszp = () => { return {data:new Readers.Wflcszp(),[userSettings]:usRoot+"wflcszp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stav_zpv_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "stav_zpv_txt", caption: "jres:31850353", width: 180, forced: true})};};

// GReaderWflctar.fields.js
Readers.Wflctar = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflctar",keys:["typ_archivace"],[columns]:["typ_archivace", "typ_archivace_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflctar.inheritsFrom(ReadersBase);
Fields.wflctar = (prefabOptions) => { return {data:new Readers.Wflctar(),[dropdown]:true,[itemTemplate]:"{typ_archivace_txt:trim:encode}",[helperColumns]:["typ_archivace_txt"],[itemTooltipTemplate]:"{typ_archivace_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflctar(),prefabOptions,options)).show()};};
Selectors.wflctar = () => { return {data:new Readers.Wflctar(),[userSettings]:usRoot+"wflctar",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_archivace_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_archivace_txt", caption: "jres:31850231", width: 100, forced: true})};};

// GReaderWflctdo.fields.js
Readers.Wflctdo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflctdo",keys:["typ_vyh_dor"],[columns]:["typ_vyh_dor", "typ_vyh_dor_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflctdo.inheritsFrom(ReadersBase);
Fields.wflctdo = (prefabOptions) => { return {data:new Readers.Wflctdo(),[dropdown]:true,[itemTemplate]:"{typ_vyh_dor_txt:trim:encode}",[helperColumns]:["typ_vyh_dor_txt"],[itemTooltipTemplate]:"{typ_vyh_dor_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflctdo(),prefabOptions,options)).show()};};
Selectors.wflctdo = () => { return {data:new Readers.Wflctdo(),[userSettings]:usRoot+"wflctdo",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_vyh_dor_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_vyh_dor_txt", caption: "jres:31850232", width: 100, forced: true})};};

// GReaderWflctko.fields.js
Readers.Wflctko = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflctko",keys:["typ_konverze"],[columns]:["typ_konverze","typ_konverze_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflctko.inheritsFrom(ReadersBase);
Fields.wflctko = (prefabOptions) => { return {data:new Readers.Wflctko(),[dropdown]:true,[itemTemplate]:"{typ_konverze_txt:trim:encode}",[helperColumns]:["typ_konverze_txt"],[itemTooltipTemplate]:"{typ_konverze_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflctko(),prefabOptions,options)).show()};};
Selectors.wflctko = () => { return {data:new Readers.Wflctko(),[userSettings]:usRoot+"wflctko",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_konverze_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_konverze_txt", caption: "jres:31850233", width: 100, forced: true})};};

// GReaderWflctob.fields.js
Readers.Wflctob = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflctob",keys:["typ_obs_ob"],[columns]:["typ_obs_ob", "typ_obs_ob_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflctob.inheritsFrom(ReadersBase);
Fields.wflctob = (prefabOptions) => { return {data:new Readers.Wflctob(),[dropdown]:true,[itemTemplate]:"{typ_obs_ob_txt:trim:encode}",[helperColumns]:["typ_obs_ob_txt"],[itemTooltipTemplate]:"{typ_obs_ob_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflctob(),prefabOptions,options)).show()};};
Selectors.wflctob = () => { return {data:new Readers.Wflctob(),[userSettings]:usRoot+"wflctob",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_obs_ob_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_obs_ob_txt", caption: "jres:31850234", width: 100, forced: true})};};

// GReaderWflctpp.fields.js
Readers.Wflctpp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflctpp",keys:["typ_pozad_pod"],[columns]:["typ_pozad_pod", "typ_pozad_pod_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflctpp.inheritsFrom(ReadersBase);
Fields.wflctpp = (prefabOptions) => { return {data:new Readers.Wflctpp(),[itemTemplate]:"{typ_pozad_pod_txt:trim:encode}",[helperColumns]:["typ_pozad_pod_txt"],[itemTooltipTemplate]:"{typ_pozad_pod_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflctpp(),prefabOptions,options)).show()};};
Selectors.wflctpp = () => { return {data:new Readers.Wflctpp(),[userSettings]:usRoot+"wflctpp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_pozad_pod_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_pozad_pod_txt", caption: "jres:31850235", width: 100, forced: true})};};

// GReaderWflctsk.fields.js
Readers.Wflctsk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflctsk",keys:["typ_slo_upvs"],[columns]:["typ_slo_upvs", "typ_slo_upvs_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflctsk.inheritsFrom(ReadersBase);
Fields.wflctsk = (prefabOptions) => { return {data:new Readers.Wflctsk(),[dropdown]:true,[itemTemplate]:"{typ_slo_upvs_txt:trim:encode}",[helperColumns]:["typ_slo_upvs_txt"],[itemTooltipTemplate]:"{typ_slo_upvs_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflctsk(),prefabOptions,options)).show()};};
Selectors.wflctsk = () => { return {data:new Readers.Wflctsk(),[userSettings]:usRoot+"wflctsk",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_slo_upvs_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_slo_upvs_txt", caption: "jres:31850207", width: 100, forced: true})};};

// GReaderWflctsr.fields.js
Readers.Wflctsr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflctsr",keys:["typ_srv"],[columns]:["typ_srv","typ_srv_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflctsr.inheritsFrom(ReadersBase);
Fields.wflctsr = (prefabOptions) => { return {data:new Readers.Wflctsr(),[itemTemplate]:"{typ_srv_txt:trim:encode}",[helperColumns]:["typ_srv", "typ_srv_txt"],[itemTooltipTemplate]:"{typ_srv_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflctsr(),prefabOptions,options)).show()};};
Selectors.wflctsr = () => { return {data:new Readers.Wflctsr(),[userSettings]:usRoot+"wflctsr",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_srv", "typ_srv_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "typ_srv", caption: "jres:30028709", width: 150, forced: true}).addTextColumn({name: "typ_srv_txt", caption: "jres:30025945", width: 300})};};

// GReaderWflctti.fields.js
Readers.Wflctti = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflctti",keys:["typ_tisku"],[columns]:["typ_tisku", "typ_tisku_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflctti.inheritsFrom(ReadersBase);
Fields.wflctti = (prefabOptions) => { return {data:new Readers.Wflctti(),[dropdown]:true,[itemTemplate]:"{typ_tisku_txt:trim:encode}",[helperColumns]:["typ_tisku_txt"],[itemTooltipTemplate]:"{typ_tisku_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflctti(),prefabOptions,options)).show()};};
Selectors.wflctti = () => { return {data:new Readers.Wflctti(),[userSettings]:usRoot+"wflctti",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_tisku_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_tisku_txt", caption: "jres:31850236", width: 100, forced: true})};};

// GReaderWflctys.fields.js
Readers.Wflctys = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflctys",keys:["typ_spis"],[columns]:["typ_spis", "typ_spis_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflctys.inheritsFrom(ReadersBase);
Fields.wflctys = (prefabOptions) => { return {data:new Readers.Wflctys(),[dropdown]:true,[itemTemplate]:"{typ_spis_txt:trim:encode}",[helperColumns]:["typ_spis_txt"],[itemTooltipTemplate]:"{typ_spis_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflctys(),prefabOptions,options)).show()};};
Selectors.wflctys = () => { return {data:new Readers.Wflctys(),[userSettings]:usRoot+"wflctys",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_spis_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_spis_txt", caption: "jres:31850237", width: 100, forced: true})};};

// GReaderWflctyv.fields.js
Readers.Wflctyv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflctyv",keys:["typ_vazby"],[columns]:["typ_vazby", "typ_vazby_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflctyv.inheritsFrom(ReadersBase);
Fields.wflctyv = (prefabOptions) => { return {data:new Readers.Wflctyv(),[dropdown]:true,[itemTemplate]:"{typ_vazby_txt:trim:encode}",[helperColumns]:["typ_vazby_txt"],[itemTooltipTemplate]:"{typ_vazby_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflctyv(),prefabOptions,options)).show()};};
Selectors.wflctyv = () => { return {data:new Readers.Wflctyv(),[userSettings]:usRoot+"wflctyv",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_vazby_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_vazby_txt", caption: "jres:31850238", width: 100, forced: true})};};

// GReaderWflcvap.fields.js
Readers.Wflcvap = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcvap",keys:["ktg_typ","var_proc"],[columns]:["ktg_typ","var_proc","var_proc_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcvap.inheritsFrom(ReadersBase);
Fields.wflcvap = (prefabOptions) => { return {data:new Readers.Wflcvap(),[dropdown]:true,[itemTemplate]:"{var_proc_txt:trim:encode}",[helperColumns]:["var_proc_txt"],[itemTooltipTemplate]:"{var_proc_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcvap(),prefabOptions,options)).show()};};
Selectors.wflcvap = () => { return {data:new Readers.Wflcvap(),[userSettings]:usRoot+"wflcvap",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["var_proc_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "var_proc_txt", caption: "jres:23350024", width: 100, forced: true})};};

// GReaderWflcver.fields.js
Readers.Wflcver = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflcver",keys:["priz_verif"],[columns]:["priz_verif", "priz_verif_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflcver.inheritsFrom(ReadersBase);
Fields.wflcver = (prefabOptions) => { return {data:new Readers.Wflcver(),[dropdown]:true,[itemTemplate]:"{priz_verif_txt:trim:encode}",[helperColumns]:["priz_verif_txt"],[itemTooltipTemplate]:"{priz_verif_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflcver(),prefabOptions,options)).show()};};
Selectors.wflcver = () => { return {data:new Readers.Wflcver(),[userSettings]:usRoot+"wflcver",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_verif_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "priz_verif_txt", caption: "jres:31850239", width: 100, forced: true})};};

// GReaderWflczip.fields.js
Readers.Wflczip = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflczip",keys:["typ_zip"],[columns]:["typ_zip","typ_zip_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflczip.inheritsFrom(ReadersBase);
Fields.wflczip = (prefabOptions) => { return {data:new Readers.Wflczip(),[itemTemplate]:"{typ_zip_txt:trim:encode}",[helperColumns]:["typ_zip", "typ_zip_txt"],[itemTooltipTemplate]:"{typ_zip_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflczip(),prefabOptions,options)).show()};};
Selectors.wflczip = () => { return {data:new Readers.Wflczip(),[userSettings]:usRoot+"wflczip",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_zip", "typ_zip_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "typ_zip", caption: "jres:30027725", width: 150, forced: true}).addTextColumn({name: "typ_zip_txt", caption: "jres:30026072", width: 300})};};

// GReaderWflczpd.fields.js
Readers.Wflczpd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflczpd",keys:["zpusob_dor"],[columns]:["zpusob_dor", "zpusob_dor_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflczpd.inheritsFrom(ReadersBase);
Fields.wflczpd = (prefabOptions) => { return {data:new Readers.Wflczpd(),[dropdown]:true,[graphicInput]:"hidden",[itemTemplate]:"{zpusob_dor_txt:trim:encode}",[helperColumns]:["zpusob_dor_txt"],[itemTooltipTemplate]:"{zpusob_dor_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflczpd(),prefabOptions,options)).show()};};
Selectors.wflczpd = () => { return {data:new Readers.Wflczpd(),[userSettings]:usRoot+"wflczpd",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zpusob_dor_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "zpusob_dor_txt", caption: "jres:31850166", width: 100, forced: true})};};

// GReaderWfldulz.fields.js
Readers.Wfldulz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWfldulz",keys:["ixs_ulz","ktg_dms"],[columns]:["ixs_ulz", "ktg_dms", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wfldulz.inheritsFrom(ReadersBase);
Fields.wfldulz = (prefabOptions) => { return {data:new Readers.Wfldulz(),[dropdown]:true,[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wfldulz(),prefabOptions,options)).show()};};
Selectors.wfldulz = () => { return {data:new Readers.Wfldulz(),[userSettings]:usRoot+"wfldulz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850249", width: 100, forced: true})};};

// GReaderWflchod.fields.js
Readers.Wflchod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflchod",keys:["hodnost"],[columns]:["hodnost", "hodnost_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflchod.inheritsFrom(ReadersBase);
Fields.wflchod = (prefabOptions) => { return {data:new Readers.Wflchod(),[dropdown]:true,[itemTemplate]:"{hodnost_txt:trim:encode}",[helperColumns]:["hodnost_txt"],[itemTooltipTemplate]:"{hodnost_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflchod(),prefabOptions,options)).show()};};
Selectors.wflchod = () => { return {data:new Readers.Wflchod(),[userSettings]:usRoot+"wflchod",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["hodnost_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "hodnost_txt", caption: "jres:31850240", width: 100, forced: true})};};

// GReaderWflscer.fields.js
Readers.Wflscer = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflscer",keys:["ixs_cer"],[columns]:["ixs_cer", "jmeno_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflscer.inheritsFrom(ReadersBase);
Fields.wflscer = (prefabOptions) => { return {data:new Readers.Wflscer(),[dropdown]:true,[itemTemplate]:"{jmeno_txt:trim:encode}",[helperColumns]:["jmeno_txt"],[itemTooltipTemplate]:"{jmeno_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflscer(),prefabOptions,options)).show()};};
Selectors.wflscer = () => { return {data:new Readers.Wflscer(),[userSettings]:usRoot+"wflscer",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["jmeno_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "jmeno_txt", caption: "jres:31850268", width: 100, forced: true})};};

// GReaderWflsdos.fields.js
Readers.Wflsdos = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflsdos",keys:["dor_sluzba"],[columns]:["dor_sluzba","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflsdos.inheritsFrom(ReadersBase);
Fields.wflsdos = (prefabOptions) => { return {data:new Readers.Wflsdos(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["dor_sluzba", "nazev"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.dor_sluzba, row.nazev, "sb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflsdos(),prefabOptions,options)).show()};};
Selectors.wflsdos = () => { return {data:new Readers.Wflsdos(),[userSettings]:usRoot+"wflsdos",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["dor_sluzba", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850106", width: 120, forced: true}).addTextColumn({name: "dor_sluzba", caption: "jres:31850107", width: 80})};};

// GReaderWflsdpo.fields.js
Readers.Wflsdpo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflsdpo",keys:["ixs_dpo"],[columns]:["ixs_dpo", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflsdpo.inheritsFrom(ReadersBase);
Fields.wflsdpo = (prefabOptions) => { return {data:new Readers.Wflsdpo(),[dropdown]:true,[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflsdpo(),prefabOptions,options)).show()};};
Selectors.wflsdpo = () => { return {data:new Readers.Wflsdpo(),[userSettings]:usRoot+"wflsdpo",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850269", width: 100, forced: true})};};

// GReaderWflsdva.fields.js
Readers.Wflsdva = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflsdva",keys:["ixs_dva"],[columns]:["ixs_dva", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflsdva.inheritsFrom(ReadersBase);
Fields.wflsdva = (prefabOptions) => { return {data:new Readers.Wflsdva(),[dropdown]:true,[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflsdva(),prefabOptions,options)).show()};};
Selectors.wflsdva = () => { return {data:new Readers.Wflsdva(),[userSettings]:usRoot+"wflsdva",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850241", width: 100, forced: true})};};

// GReaderWflsfsk.fields.js
Readers.Wflsfsk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflsfsk",keys:["ixs_fsk"],[columns]:["ixs_fsk", "nazev", "eform_id", "eformversion"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Wflsfsk.inheritsFrom(ReadersBase);
Fields.wflsfsk = (prefabOptions) => { return {data:new Readers.Wflsfsk(),[itemTemplate]:function (item) {
        var itemTemplate = "";
        if (item) {
                        if (item.nazev) {
                itemTemplate = item.nazev.trim(" ");
            } else {
                itemTemplate = item.eform_id;
            }

            if (itemTemplate) {
                itemTemplate = itemTemplate.trim();
            }
        }
        return itemTemplate;
    },[helperColumns]:["ixs_fsk", "nazev", "eform_id"],[itemTooltipTemplate]:function (item) {
        var itemTemplate = "";
        if (item) {
                        if (item.nazev) {
                itemTemplate = item.nazev.trim(" ");
            } else {
                itemTemplate = item.eform_id;
            }

            if (itemTemplate) {
                itemTemplate = itemTemplate.trim();
            }
        }
        return itemTemplate;
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.wflsfsk(),prefabOptions,options)).show()};};
Selectors.wflsfsk = () => { return {data:new Readers.Wflsfsk(),[userSettings]:usRoot+"wflsfsk",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixs_fsk", "nazev", "eform_id"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:23350019", width: 6, forced: true}).addTextColumn({name: "eform_id", caption: "jres:23350017", width: 6}).addTextColumn({name: "eformversion", caption: "jres:23350018", width: 2})};};

// GReaderWflsgra.fields.js
Readers.Wflsgra = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflsgra",keys:["spis_graf"],[columns]:["spis_graf","aktivita","nazev","typ_gra"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflsgra.inheritsFrom(ReadersBase);
Fields.wflsgra = (prefabOptions) => { return {data:new Readers.Wflsgra(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["spis_graf", "aktivita", "nazev", "typ_gra"],[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflsgra(),prefabOptions,options)).show()};};
Selectors.wflsgra = () => { return {data:new Readers.Wflsgra(),[userSettings]:usRoot+"wflsgra",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["spis_graf", "aktivita", "nazev", "typ_gra"]},[gridFormat]:newGridFormat().addTextColumn({name: "spis_graf", caption: "jres:21350008", width: 300, forced: true}).addNumberColumn({name: "aktivita", caption: "jres:31850171", width: 150}).addTextColumn({name: "nazev", caption: "jres:31850004", width: 300}).addNumberColumn({name: "typ_gra", caption: "jres:21350009", width: 150})};};

// GReaderWflsmvk.fields.js
Readers.Wflsmvk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflsmvk",keys:["mvkraj"],[columns]:["mvkraj", "mvkraj_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflsmvk.inheritsFrom(ReadersBase);
Fields.wflsmvk = (prefabOptions) => { return {data:new Readers.Wflsmvk(),[dropdown]:true,[itemTemplate]:"{mvkraj_txt:trim:encode}",[helperColumns]:["mvkraj_txt"],[itemTooltipTemplate]:"{mvkraj_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflsmvk(),prefabOptions,options)).show()};};
Selectors.wflsmvk = () => { return {data:new Readers.Wflsmvk(),[userSettings]:usRoot+"wflsmvk",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["mvkraj_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "mvkraj_txt", caption: "jres:31850242", width: 100, forced: true})};};

// GReaderWflsmvo.fields.js
Readers.Wflsmvo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflsmvo",keys:["mvokr"],[columns]:["mvokr", "mvokr_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflsmvo.inheritsFrom(ReadersBase);
Fields.wflsmvo = (prefabOptions) => { return {data:new Readers.Wflsmvo(),[dropdown]:true,[itemTemplate]:"{mvokr_txt:trim:encode}",[helperColumns]:["mvokr_txt"],[itemTooltipTemplate]:"{mvokr_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflsmvo(),prefabOptions,options)).show()};};
Selectors.wflsmvo = () => { return {data:new Readers.Wflsmvo(),[userSettings]:usRoot+"wflsmvo",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["mvokr_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "mvokr_txt", caption: "jres:31850253", width: 100, forced: true})};};

// GReaderWflsser.fields.js
Readers.Wflsser = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflsser",keys:["server_name"],[columns]:["server_name","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflsser.inheritsFrom(ReadersBase);
Fields.wflsser = (prefabOptions) => { return {data:new Readers.Wflsser(),[itemTemplate]:"{server_name:trim:encode}",[helperColumns]:["server_name", "nazev"],[itemTooltipTemplate]:"{server_name:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflsser(),prefabOptions,options)).show()};};
Selectors.wflsser = () => { return {data:new Readers.Wflsser(),[userSettings]:usRoot+"wflsser",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["server_name", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "server_name", caption: "jres:30028705", width: 300, forced: true}).addTextColumn({name: "nazev", caption: "jres:30028701", width: 300})};};

// GReaderWflssro.fields.js
Readers.Wflssro = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflssro",keys:["ixs_sro"],[columns]:["ixs_sro", "zkratka","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflssro.inheritsFrom(ReadersBase);
Fields.wflssro = (prefabOptions) => { return {data:new Readers.Wflssro(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "zkratka"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.zkratka, row.nazev, "sb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflssro(),prefabOptions,options)).show()};};
Selectors.wflssro = () => { return {data:new Readers.Wflssro(),[userSettings]:usRoot+"wflssro",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "zkratka"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 120, forced: true}).addTextColumn({name: "zkratka", caption: "jres:31850003", width: 40})};};

// GReaderWflsssa.fields.js
Readers.Wflsssa = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflsssa",keys:["ixs_ssa"],[columns]:["ixs_ssa", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Wflsssa.inheritsFrom(ReadersBase);
Fields.wflsssa = (UdajePrimarnihoDokladuWK, type,prefabOptions) => { return {data:new Readers.Wflsssa({ readerParams: { UdajePrimarnihoDokladuWK: UdajePrimarnihoDokladuWK } }),[dropdown]:true,[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflsssa(UdajePrimarnihoDokladuWK),prefabOptions,options)).show()};};
Selectors.wflsssa = (UdajePrimarnihoDokladuWK, type) => { return {data:new Readers.Wflsssa({ readerParams: { UdajePrimarnihoDokladuWK: UdajePrimarnihoDokladuWK } }),[hasFavorite]:true,[userSettings]:usRoot+"wflsssa",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "ixs_ssa", caption: "jres:31850362", width: 100, forced: true}).addTextColumn({name: "nazev", caption: "jres:31850270", width: 100}).addTextColumn({name: "krg_rsp_txt", caption: "jres:31850363", width: 100}).addTextColumn({name: "ktg_typ_txt", caption: "jres:31850364", width: 100})};};

// GReaderWflsssl.fields.js
Readers.Wflsssl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflsssl",keys:["druh_zas","sablona_sluzeb"],[columns]:["druh_zas", "sablona_sluzeb","nazev","druh_zas_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflsssl.inheritsFrom(ReadersBase);
Fields.wflsssl = (prefabOptions) => { return {data:new Readers.Wflsssl(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "druh_zas_txt", "sablona_sluzeb"],[helperItemTemplate]:function (row) 
    { 
                var moreInfo = FieldFunction.getFormatedLabeledString({ "jres:31850022": row.druh_zas_txt, "jres:31850023": row.sablona_sluzeb });
        return FieldFunction.getInfoStr({ "info": row.nazev, "more": moreInfo});
    },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflsssl(),prefabOptions,options)).show()};};
Selectors.wflsssl = () => { return {data:new Readers.Wflsssl(),[userSettings]:usRoot+"wflsssl",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "druh_zas_txt", "sablona_sluzeb"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850124", width: 120, forced: true}).addTextColumn({name: "druh_zas_txt", caption: "jres:31850123", width: 40}).addTextColumn({name: "sablona_sluzeb", caption: "jres:31850023", width: 40})};};

// GReaderWflsstp.fields.js
Readers.Wflsstp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflsstp",keys:["stav_schvproc"],[columns]:["stav_schvproc","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflsstp.inheritsFrom(ReadersBase);
Fields.wflsstp = (prefabOptions) => { return {data:new Readers.Wflsstp(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["stav_schvproc", "nazev"],[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflsstp(),prefabOptions,options)).show()};};
Selectors.wflsstp = () => { return {data:new Readers.Wflsstp(),[userSettings]:usRoot+"wflsstp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stav_schvproc", "nazev"]},[gridFormat]:newGridFormat().addNumberColumn({name: "stav_schvproc", caption: "jres:21350006", width: 150, forced: true}).addTextColumn({name: "nazev", caption: "jres:21350006", width: 300})};};

// GReaderWflstra.fields.js
Readers.Wflstra = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflstra",keys:["ixs_tra"],[columns]:["ixs_tra", "nazev","poznamka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflstra.inheritsFrom(ReadersBase);
Fields.wflstra = (prefabOptions) => { return {data:new Readers.Wflstra(),[dropdown]:true,[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "poznamka"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.nazev, row.poznamka, "fb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflstra(),prefabOptions,options)).show()};};
Selectors.wflstra = () => { return {data:new Readers.Wflstra(),[userSettings]:usRoot+"wflstra",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "poznamka"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850094", width: 120, forced: true}).addTextColumn({name: "poznamka", caption: "jres:31850038", width: 200})};};

// GReaderWflsulz.fields.js
Readers.Wflsulz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflsulz",keys:["ixs_ulz"],[columns]:["ixs_ulz", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflsulz.inheritsFrom(ReadersBase);
Fields.wflsulz = (prefabOptions) => { return {data:new Readers.Wflsulz(),[dropdown]:true,[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev"],[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflsulz(),prefabOptions,options)).show()};};
Selectors.wflsulz = () => { return {data:new Readers.Wflsulz(),[userSettings]:usRoot+"wflsulz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850254", width: 100, forced: true})};};

// GReaderWflsutv.fields.js
Readers.Wflsutv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflsutv",keys:["utvar"],[columns]:["utvar", "utvar_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflsutv.inheritsFrom(ReadersBase);
Fields.wflsutv = (prefabOptions) => { return {data:new Readers.Wflsutv(),[dropdown]:true,[itemTemplate]:"{utvar_txt:trim:encode}",[helperColumns]:["utvar_txt"],[itemTooltipTemplate]:"{utvar_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflsutv(),prefabOptions,options)).show()};};
Selectors.wflsutv = () => { return {data:new Readers.Wflsutv(),[userSettings]:usRoot+"wflsutv",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["utvar_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "utvar_txt", caption: "jres:31850319", width: 100, forced: true})};};

// GReaderWflszpv.fields.js
Readers.Wflszpv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflszpv",keys:["ixs_zpv"],[columns]:["ixs_zpv", "nazev","popis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Wflszpv.inheritsFrom(ReadersBase);
Fields.wflszpv = (prefabOptions) => { return {data:new Readers.Wflszpv(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["nazev", "popis"],[helperItemTemplate]:function (row) { return FieldFunction.getSimpleInfoString(row.nazev, row.popis, "fb"); },[itemTooltipTemplate]:"{nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.wflszpv(),prefabOptions,options)).show()};};
Selectors.wflszpv = () => { return {data:new Readers.Wflszpv(),[userSettings]:usRoot+"wflszpv",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "popis"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31850004", width: 120, forced: true}).addTextColumn({name: "popis", caption: "jres:31850038", width: 200})};};

//INCLUDE fieldGlobalFunctions.fields.js
var Forms = namespace("Gordic.Prefabs.Selector.Forms");
var FilterForms = namespace("Gordic.Prefabs.Selector.FilterForms");
var SubTasks = namespace("Gordic.Prefabs.Selector.SubTasks");
var FieldFunction = namespace("Gordic.Prefabs.Utils");
//#region Forms
Forms.Sslsumi = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0, breaks-500-1000" })
    .addSection()
    .addRow("jres:31850271").addField("gstringbox", { name: "umisteni_txt", validators: [new Gordic.Validators.Required()] }) //RC 31850271 : Umístění
    .addRow("jres:31850038").addField("gstringbox", { name: "poznamka" }) //RC 31850038 : Poznámka
    .addRow().addField("gcheck", "", { 
        name: "aktivita", label: "jres:31850277", //RC 31850277 : Aktivní
        modelValueTransform: {
            apply: function (modelValue) { return modelValue === 100; },
            collect: function (fieldValue) { return fieldValue === true ? 100 : 500; }
        }
    });

Forms.Ginspsc = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0, breaks-500-1000" })
    .addSection()
    .addRow("jres:31850076").addField("gselectbox", Gordic.Prefabs.Select.gincsta(), { //RC 31850076 : Stát
        name: "stat",
        model: "model.stat=value.stat",
        dropdown: true,
        itemTemplate: "{stat_txt}"
    })
    .addRow("jres:31850069").addField("gstringbox", { name: "psc" }) //RC 31850069 : PSČ
    .addRow("jres:31850070").addField("gstringbox", { name: "posta" }) //RC 31850070 : Pošta
    .addRow().addField("gcheck", "", {
        name: "aktivita",
        label: "jres:31850277", //RC 31850277 : Aktivní
        modelValueTransform: {
            apply: function (modelValue) { return modelValue === 100; },
            collect: function (fieldValue) { return fieldValue === true ? 100 : 500; }
        }
    });
//#endregion
// #region FilterForms


FilterForms.Sslsspz = new Gordic.Forms.Form({ tabLabel: "Kompletni filtr" })
    .addSection()
    .addRow("jres:31850264").addField("gstringbox", Gordic.Prefabs.String.withOperators(), { name: "spis_pl", model: "model.spis_pl = value" }) //RC 31850264 : Spisový plán
    .addRow("jres:31850307").addField("gstringbox", Gordic.Prefabs.String.withOperators(), { name: "skar_znak", model: "model.skar_znak = value" }) //RC 31850307 : Skartační znak
    .addRow("jres:31850308").addField("gstringbox", Gordic.Prefabs.Number.withOperators(), { name: "skar_lhuta", model: "model.skar_lhuta = value" }) //RC 31850308 : Skartační lhůta

//.addRow("Oblíbené").addField("gcheck", { name: "Oblibene", model: "model.nazev_rf = value" })

//.addRow("Aktivita").addField("gselectbox", { name: "aktivita", model: "model.aktivita = value.aktivita", itemTemplate: "{aktivita}" })
/*.addRow("Aktivita").addField(
"gselectbox",
{
    name: "aktivita",
    model: "model.aktivita = value.aktivita",
    dropdown: true,
    data: new Gordic.Data.View([{ aktivita: 100, text: "Aktivní" }, { aktivita: 500, text: "Neaktivní" }, { aktivita: 900, text: "Smazané" }], { key: "aktivita" }),
    itemTemplate: "{text}"
});
*/

FilterForms.Ginsvsk = new Gordic.Forms.Form({ tabLabel: "Kompletni filtr" })
    .addSection()
    .addRow("jres:23350057").addField("gstringbox", Gordic.Prefabs.String.withOperators(), { name: "nazev", model: "model.nazev = value" }) //RC 23350057 : Název věcné skupiny
    .addRow("jres:23350058").addField("gstringbox", Gordic.Prefabs.String.withOperators(), { name: "spis_znak", model: "model.spis_znak = value" }) //RC 23350058 : Úplný spisový znak
    .addRow("jres:23350059").addField("gdatebox", Gordic.Prefabs.Date.withOperators(), { name: "dat_od", model: "model.dat_od = value", valueType: "datetime" }) //RC 23350059 : Platnost od
    .addRow("jres:23350060").addField("gdatebox", Gordic.Prefabs.Date.withOperators(), { name: "dat_do", model: "model.dat_do = value", valueType: "datetime" }) //RC 23350060 : Platnost do


FilterForms.Ginsfun = new Gordic.Forms.Form({ tabLabel: "Kompletni filtr" })
    .addSection()
    .addRow("jres:31850324").addField("gstringbox", Gordic.Prefabs.String.withOperators(), { name: "nazev", model: "model.nazev = value" }) //RC 31850324 : Název funkč. místa
    .addRow("jres:31850325").addField("gstringbox", Gordic.Prefabs.String.withOperators(), { name: "nazev_su", model: "model.nazev_su = value" }) //RC 31850325 : Název spis. uzlu
    .addRow("jres:31850067").addField("gstringbox", Gordic.Prefabs.String.withOperators(), { name: "nazev_ref", model: "model.nazev_ref = value" }) //RC 31850067 : Název referenta
    .addRow("jres:31850326").addField("gstringbox", Gordic.Prefabs.String.withOperators(), { name: "nazev_rf", model: "model.nazev_rf = value" }) //RC 31850326 : Název referenta - úplné
    .addSection()
    /*.addRow("Identifikátor FUN").addField("gstringbox", { name: "ixs_fun", model: "model.ixs_fun = value" })
    .addRow("Identifikátor SU").addField("gstringbox", { name: "ixs_su", model: "model.ixs_su = value" })
    .addRow("Identifikátor ORJ").addField("gstringbox", { name: "ixs_orj", model: "model.ixs_orj = value" })
    .addRow("Identifikátor REF").addField("gstringbox", { name: "ixs_ref", model: "model.ixs_ref = value" })
    .addSection()*/
    //.addRow("Aktivita").addField("gselectbox", { name: "aktivita", model: "model.aktivita = value.aktivita", itemTemplate: "{aktivita}" })
    .addRow("Aktivita").addField(
    "gselectbox",
    {
        name: "aktivita",
        model: "model.aktivita = value.aktivita",
        list: true,
        multi: true,
        itemWidth: "",
        itemClass: "spaced",
        //RC 31850277 : Aktivní, 31850321 : Připraven, 31850278 : Neaktivní, 31850322 : Návrh, 31850323 : Zrušen
        data: new Gordic.Data.View([{ aktivita: 100, text: "jres:31850277" }, { aktivita: 300, text: "jres:31850321" }, { aktivita: 500, text: "jres:31850278" }, { aktivita: 600, text: "jres:31850322" }, { aktivita: 900, text: "jres:31850323" }], { key: "aktivita" }),  //RC 
        itemTemplate: "{text}"
    })
// #endregion

$.extend(FieldFunction, {
   

    //30.1.2020 - pnovak - funkce určená POUZE pro generování v MAKARECH
    /**
     * funkce určená POUZE pro generování v MAKARECH
     * @param {HtmlElement} fieldElem policko
     * @param {any} selectorOptions options selelektoru
     * @returns {JQueryPromise<any>} promise selektoru
     */
    _showSelectorGen: function (fieldElem, selectorOptions) {

        var field = $(fieldElem).gfield("instance");
        var selectorPromise = new Selectors.DefaultSelector(selectorOptions).show();
        selectorPromise
            .always(function () {
                if (document.activeElement === document.body) {
                    field.focus();
                }
            });

        return selectorPromise;
    }
});


})(jQuery);

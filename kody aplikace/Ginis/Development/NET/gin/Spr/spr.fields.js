"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Spr.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const dropdown = "dropdown"; const dropDown = "dropDown"; const selector = "selector"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings";

// Gordic.Spr.Client.GReaderDdpvrfu.fields.js
Readers.Ddpvrfu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDdpvrfu",keys:["ixs_fun"],[columns]:["ixs_fun", "nazev", "ixp_den"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ddpvrfu.inheritsFrom(ReadersBase);
Fields.ddpvrfu = (prefabOptions) => { return {data:new Readers.Ddpvrfu(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderSprcdplDto.fields.js
Readers.SprcdplDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprcdplDto",keys:["druh_pl"],[columns]:["druh_pl","druh_pl_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprcdplDto.inheritsFrom(ReadersBase);
Fields.sprcdplDto = (prefabOptions) => { return {data:new Readers.SprcdplDto(),[dropdown]:true,[itemTemplate]:"{druh_pl_txt}",[helperColumns]:["druh_pl", "druh_pl_txt"]};};

// GReaderSprcdpzDto.fields.js
Readers.SprcdpzDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprcdpzDto",keys:["duv_dotc"],[columns]:["duv_dotc","duv_dotc_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprcdpzDto.inheritsFrom(ReadersBase);
Fields.sprcdpzDto = (prefabOptions) => { return {data:new Readers.SprcdpzDto(),[itemTemplate]:"{duv_dotc_txt}",[helperColumns]:["duv_dotc","duv_dotc_txt"]};};

// GReaderSprcdsaDto.fields.js
Readers.SprcdsaDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprcdsaDto",keys:["druh_sa"],[columns]:["druh_sa","druh_sa_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprcdsaDto.inheritsFrom(ReadersBase);
Fields.sprcdsaDto = (prefabOptions) => { return {data:new Readers.SprcdsaDto(),[dropdown]:true,[itemTemplate]:"{druh_sa_txt}",[helperColumns]:["druh_sa", "druh_sa_txt"]};};

// GReaderSprcdurDto.fields.js
Readers.SprcdurDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprcdurDto",keys:["duv_urc"],[columns]:["duv_urc","duv_urc_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprcdurDto.inheritsFrom(ReadersBase);
Fields.sprcdurDto = (prefabOptions) => { return {data:new Readers.SprcdurDto(),[dropdown]:true,[itemTemplate]:"{duv_urc_txt}",[helperColumns]:["duv_urc_txt"]};};

// GReaderSprcmprDto.fields.js
Readers.SprcmprDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprcmprDto",keys:["mpr"],[columns]:["mpr","mpr_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprcmprDto.inheritsFrom(ReadersBase);
Fields.sprcmprDto = (prefabOptions) => { return {data:new Readers.SprcmprDto(),[itemTemplate]:"{mpr_txt}",[helperColumns]:["mpr", "mpr_txt", "k_v", "k_s", "k_xml"]};};

// GReaderSprcpodDto.fields.js
Readers.SprcpodDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprcpodDto",keys:["typ_pod"],[columns]:["typ_pod","typ_pod_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprcpodDto.inheritsFrom(ReadersBase);
Fields.sprcpodDto = (prefabOptions) => { return {data:new Readers.SprcpodDto(),[itemTemplate]:"{typ_pod_txt}",[helperColumns]:["typ_pod", "typ_pod_txt"]};};

// GReaderSprcpvdDto.fields.js
Readers.SprcpvdDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprcpvdDto",keys:["typ_pvd"],[columns]:["typ_pvd","typ_pvd_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprcpvdDto.inheritsFrom(ReadersBase);
Fields.sprcpvdDto = (prefabOptions) => { return {data:new Readers.SprcpvdDto(),[itemTemplate]:"{typ_pvd_txt}",[helperColumns]:["typ_pvd", "typ_pvd_txt"]};};

// GReaderSprcrciDto.fields.js
Readers.SprcrciDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprcrciDto",keys:["rozsah_cin"],[columns]:["rozsah_cin","rozsah_cin_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprcrciDto.inheritsFrom(ReadersBase);
Fields.sprcrciDto = (prefabOptions) => { return {data:new Readers.SprcrciDto(),[itemTemplate]:"{rozsah_cin_txt}",[helperColumns]:["rozsah_cin", "rozsah_cin_txt"]};};

// GReaderSprcrsl.fields.js
Readers.SprcrslDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprcrslDto",keys:["rozsah_sl"],[columns]:["rozsah_sl","rozsah_sl_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprcrslDto.inheritsFrom(ReadersBase);
Fields.sprcrslDto = (prefabOptions) => { return {data:new Readers.SprcrslDto(),[itemTemplate]:"{rozsah_sl_txt}",[helperColumns]:["rozsah_sl","rozsah_sl_txt"]};};

// GReaderSprcscjDto.fields.js
Readers.SprcscjDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprcscjDto",keys:["s_cj_jazyk"],[columns]:["s_cj_jazyk","s_cj_jazyk_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprcscjDto.inheritsFrom(ReadersBase);
Fields.sprcscjDto = (prefabOptions) => { return {data:new Readers.SprcscjDto(),[itemTemplate]:"{s_cj_jazyk_txt}",[helperColumns]:["s_cj_jazyk","s_cj_jazyk_txt"]};};

// GReaderSprcslhDto.fields.js
Readers.SprcslhDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprcslhDto",keys:["stav_lh"],[columns]:["stav_lh","stav_lh_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprcslhDto.inheritsFrom(ReadersBase);
Fields.sprcslhDto = (prefabOptions) => { return {data:new Readers.SprcslhDto(),[itemTemplate]:"{stav_lh_txt}",[helperColumns]:["stav_lh","stav_lh_txt"]};};

// GReaderSprcstaDto.fields.js
Readers.SprcstaDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprcstaDto",keys:["stav"],[columns]:["stav","stav_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprcstaDto.inheritsFrom(ReadersBase);
Fields.sprcstaDto = (prefabOptions) => { return {data:new Readers.SprcstaDto(),[itemTemplate]:"{stav_txt}",[helperColumns]:["stav_txt"]};};

// GReaderSprcstuDto.fields.js
Readers.SprcstuDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprcstuDto",keys:["stav_ukn"],[columns]:["stav_ukn","stav_ukn_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprcstuDto.inheritsFrom(ReadersBase);
Fields.sprcstuDto = (prefabOptions) => { return {data:new Readers.SprcstuDto(),[itemTemplate]:"{stav_ukn_txt}",[helperColumns]:["stav_ukn", "stav_ukn_txt", "k_v", "k_s"]};};

// GReaderSprctpz.fields.js
Readers.SprctpzDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprctpzDto",keys:["typ_pz"],[columns]:["typ_pz","typ_pz_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprctpzDto.inheritsFrom(ReadersBase);
Fields.sprctpzDto = (prefabOptions) => { return {data:new Readers.SprctpzDto(),[dropDown]:true,[itemTemplate]:"{typ_pz_txt}",[helperColumns]:["typ_pz","typ_pz_txt"]};};

// GReaderSprctrmDto.fields.js
Readers.SprctrmDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprctrmDto",keys:["typ_term"],[columns]:["typ_term","typ_term_txt","k_v","k_s","k_xml","s_cas"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprctrmDto.inheritsFrom(ReadersBase);
Fields.sprctrmDto = (prefabOptions) => { return {data:new Readers.SprctrmDto(),[itemTemplate]:"{typ_term_txt}",[helperColumns]:["typ_term","typ_term_txt"]};};

// GReaderSprctscDto.fields.js
Readers.SprctscDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprctscDto",keys:["typ_sc"],[columns]:["typ_sc","typ_sc_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprctscDto.inheritsFrom(ReadersBase);
Fields.sprctscDto = (prefabOptions) => { return {data:new Readers.SprctscDto(),[dropdown]:true,[itemTemplate]:"{typ_sc_txt}",[helperColumns]:["typ_sc_txt"]};};

// GReaderSprctzkDto.fields.js
Readers.SprctzkDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprctzkDto",keys:["typ_zk"],[columns]:["typ_zk","typ_zk_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprctzkDto.inheritsFrom(ReadersBase);
Fields.sprctzkDto = (prefabOptions) => { return {data:new Readers.SprctzkDto(),[itemTemplate]:"{typ_zk_txt}",[helperColumns]:["typ_zk","typ_zk_txt"]};};

// GReaderSprcuciDto.fields.js
Readers.SprcuciDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprcuciDto",keys:["ucinnost"],[columns]:["ucinnost","ucinnost_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprcuciDto.inheritsFrom(ReadersBase);
Fields.sprcuciDto = (prefabOptions) => { return {data:new Readers.SprcuciDto(),[dropdown]:true,[itemTemplate]:"{ucinnost_txt}",[helperColumns]:["ucinnost_txt"]};};

// GReaderSprcucjDto.fields.js
Readers.SprcucjDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprcucjDto",keys:["typ_ucj"],[columns]:["typ_ucj","typ_ucj_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprcucjDto.inheritsFrom(ReadersBase);
Fields.sprcucjDto = (prefabOptions) => { return {data:new Readers.SprcucjDto(),[itemTemplate]:"{typ_ucj_txt}",[helperColumns]:["typ_ucj","typ_ucj_txt"]};};

// GReaderSprczarDto.fields.js
Readers.SprczarDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprczarDto",keys:["druh_zar"],[columns]:["druh_zar","druh_zar_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprczarDto.inheritsFrom(ReadersBase);
Fields.sprczarDto = (prefabOptions) => { return {data:new Readers.SprczarDto(),[itemTemplate]:"{druh_zar_txt}",[helperColumns]:["druh_zar_txt", "druh_zar"]};};

// GReaderSprczprDto.fields.js
Readers.SprczprDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprczprDto",keys:["zp_roz"],[columns]:["zp_roz","zp_roz_txt","k_v","k_s","k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprczprDto.inheritsFrom(ReadersBase);
Fields.sprczprDto = (prefabOptions) => { return {data:new Readers.SprczprDto(),[itemTemplate]:"{zp_roz_txt}",[helperColumns]:["zp_roz_txt"]};};

// GReaderSprczpuDto.fields.js
Readers.SprczpuDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprczpuDto",keys:["zpu_pl"],[columns]:["zpu_pl","zpu_pl_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprczpuDto.inheritsFrom(ReadersBase);
Fields.sprczpuDto = (prefabOptions) => { return {data:new Readers.SprczpuDto(),[dropdown]:true,[itemTemplate]:"{zpu_pl_txt}",[helperColumns]:["zpu_pl", "zpu_pl_txt"]};};

// GReaderSprsdukDto.fields.js
Readers.SprsdukDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprsdukDto",keys:["ixs_duk"],[columns]:["ixs_duk","nazev","zakon_txt","topic_pokyn","topic_vzor","topic_pozn","s_lhuta","s_vyriz","lhuta","typ_ukn","skupina","podskupina","nazev_uziv"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprsdukDto.inheritsFrom(ReadersBase);
Fields.sprsdukDto = (prefabOptions) => { return {data:new Readers.SprsdukDto(),[dropdown]:false,[itemTemplate]:"{nazev}",[helperColumns]:["nazev", "zakon_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.sprsdukDto(),prefabOptions,options)).show()};};
Selectors.sprsdukDto = () => { return {data:new Readers.SprsdukDto(),[gridOpts]:{
        searchColumns: ["nazev", "zakon_txt"],
        rowsEnabled: function (meta) {
            return (meta && meta.data) ? true : false;
        },
        rowsClass: function (row, trueColumns, rowIndex) {
            if (row.data.s_vyriz === 1) {
                return "bold";
            }
        }
    },[gridFormat]:new Gordic.Data.GridFormat()
        .addIconColumn(Gordic.Spr.Globals.ListSupport.ImgVyrizujiciColumn())
        .addTextColumn({ name: "ixs_duk", caption: "jres:25200007", width: 80 })         .addTextColumn({ name: "nazev", caption: "jres:25200005", width: 100 })         .addTextColumn({ name: "zakon_txt", caption: "jres:25200006", width: 160 }),[userSettings]:usRoot+"sprsdukDto",[isolatedUserSettings]:true};};

// GReaderSprsouoAllDto.fields.js
Readers.SprsouoAllDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprsouoAllDto",keys:["ixs_ouo"],[columns]:["ixs_ouo","nazev","poznamka","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprsouoAllDto.inheritsFrom(ReadersBase);
Fields.sprsouoAllDto = (prefabOptions) => { return {data:new Readers.SprsouoAllDto(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev", "ixs_ouo"]};};

// GReaderSprsouoDto.fields.js
Readers.SprsouoDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprsouoDto",keys:["ixs_ouo"],[columns]:["ixs_ouo", "ixs_ref", "ixs_fun", "nazev_ouo", "nazev_ref", "nazev_fun", "nazev_rf", "typ_ouo_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprsouoDto.inheritsFrom(ReadersBase);
Fields.sprsouoDto = (prefabOptions) => { return {data:new Readers.SprsouoDto(),[itemTemplate]:"{nazev_rf}",[helperColumns]:["nazev_rf", "typ_ouo_txt"]};};

// GReaderSprspsrDto.fields.js
Readers.SprspsrDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprspsrDto",keys:["ixs_psr"],[columns]:["ixs_psr","nazev","typ_sr","poznamka","aktivita","dat_zmena","zmenu_prov","nazev_4p","nazev_2p"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprspsrDto.inheritsFrom(ReadersBase);
Fields.sprspsrDto = (prefabOptions) => { return {data:new Readers.SprspsrDto(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_psr","nazev"]};};

// GReaderSprsvprDto.fields.js
Readers.SprsvprDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSprsvprDto",keys:["ixs_vpr"],[columns]:["ixs_vpr","zakon_txt","zakonik","paragraf","odstavec","pismeno","poznamka","aktivita","dat_zmena","zmenu_prov","typ_vpr","kategorie"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SprsvprDto.inheritsFrom(ReadersBase);
Fields.sprsvprDto = (prefabOptions) => { return {data:new Readers.SprsvprDto(),[itemTemplate]:"{zakon_txt}",[helperColumns]:["ixs_vpr","zakon_txt"]};};

// GReaderWflsdvaSprDto.fields.js
Readers.WflsdvaSprDto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderWflsdvaSprDto",keys:["ixs_dva"],[columns]:["ixs_dva","nazev","typ_vazby","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.WflsdvaSprDto.inheritsFrom(ReadersBase);
Fields.wflsdvaSprDto = (prefabOptions) => { return {data:new Readers.WflsdvaSprDto(),[dropdown]:true,[itemTemplate]:"{nazev}",[helperColumns]:["ixs_dva", "nazev"]};};

})(jQuery);

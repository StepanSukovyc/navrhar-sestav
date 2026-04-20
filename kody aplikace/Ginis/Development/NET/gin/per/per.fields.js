"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Per.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const selector = "selector"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const serverFilters = "serverFilters"; const title = "title"; const menuBar = "menuBar";

// GCisReaderDruhPres.fields.js
Readers.GCisReaderDruhPres = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderDruhPres",keys:["druh"],[columns]:["druh","druh_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderDruhPres.inheritsFrom(ReadersBase);
Fields.gCisReaderDruhPres = (prefabOptions) => { return {data:new Readers.GCisReaderDruhPres(),[itemTemplate]:"{druh_txt}",[helperColumns]:["druh_txt"]};};

// GCisReaderDruhPreveleni.fields.js
Readers.GCisReaderDruhPreveleni = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderDruhPreveleni",keys:["druh"],[columns]:["druh","druh_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderDruhPreveleni.inheritsFrom(ReadersBase);
Fields.gCisReaderDruhPreveleni = (prefabOptions) => { return {data:new Readers.GCisReaderDruhPreveleni(),[itemTemplate]:"{druh_txt}",[helperColumns]:["druh_txt"]};};

// GCisReaderDruhZarazeni.fields.js
Readers.GCisReaderDruhZarazeni = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderDruhZarazeni",keys:["druh"],[columns]:["druh","druh_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderDruhZarazeni.inheritsFrom(ReadersBase);
Fields.gCisReaderDruhZarazeni = (prefabOptions) => { return {data:new Readers.GCisReaderDruhZarazeni(),[itemTemplate]:"{druh_txt}",[helperColumns]:["druh_txt"]};};

// GCisReaderFiltrAkreditace.fields.js
Readers.GCisReaderFiltrAkreditace = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderFiltrAkreditace",keys:["stav"],[columns]:["stav","stav_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderFiltrAkreditace.inheritsFrom(ReadersBase);
Fields.gCisReaderFiltrAkreditace = (prefabOptions) => { return {data:new Readers.GCisReaderFiltrAkreditace(),[itemTemplate]:"{stav_txt}",[helperColumns]:["stav_txt"]};};

// GCisReaderFiltrPozadavky.fields.js
Readers.GCisReaderFiltrPozadavky = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderFiltrPozadavky",keys:["stav"],[columns]:["stav","stav_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderFiltrPozadavky.inheritsFrom(ReadersBase);
Fields.gCisReaderFiltrPozadavky = (prefabOptions) => { return {data:new Readers.GCisReaderFiltrPozadavky(),[itemTemplate]:"{stav_txt}",[helperColumns]:["stav_txt"]};};

// GCisReaderFiltrTurnus.fields.js
Readers.GCisReaderFiltrTurnus = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderFiltrTurnus",keys:["stav"],[columns]:["stav","stav_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderFiltrTurnus.inheritsFrom(ReadersBase);
Fields.gCisReaderFiltrTurnus = (prefabOptions) => { return {data:new Readers.GCisReaderFiltrTurnus(),[itemTemplate]:"{stav_txt}",[helperColumns]:["stav_txt"]};};

// GCisReaderNaborPrispevek.fields.js
Readers.GCisReaderNaborPrispevek = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderNaborPrispevek",keys:["c_prisp"],[columns]:["prisp","c_prisp","kod","prisp_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderNaborPrispevek.inheritsFrom(ReadersBase);
Fields.gCisReaderNaborPrispevek = (prefabOptions) => { return {data:new Readers.GCisReaderNaborPrispevek(),[itemTemplate]:"{prisp_txt}",[helperColumns]:["prisp_txt"]};};

// GCisReaderPehcddv.fields.js
Readers.GCisReaderPehcddv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPehcddv",keys:["dosazen_vys"],[columns]:["dosazen_vys","dosazen_vys_txt","dosazen_vys_cele"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPehcddv.inheritsFrom(ReadersBase);
Fields.gCisReaderPehcddv = (prefabOptions) => { return {data:new Readers.GCisReaderPehcddv(),[itemTemplate]:"{dosazen_vys_txt}",[helperColumns]:["dosazen_vys_txt"]};};

// GCisReaderPehcsho.fields.js
Readers.GCisReaderPehcsho = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPehcsho",keys:["stav_hod"],[columns]:["stav_hod","stav_hod_txt","stav_hod_sz","stav_hod_per"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPehcsho.inheritsFrom(ReadersBase);
Fields.gCisReaderPehcsho = (prefabOptions) => { return {data:new Readers.GCisReaderPehcsho(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GCisReaderPehsbod.fields.js
Readers.GCisReaderPehsbod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPehsbod",keys:["ixs_bod"],[columns]:["ixs_bod","nazev","ixs_fun_autor","ixs_fun_autor_txt","ixs_fun_spravce","ixs_fun_spravce_txt","dat_vznik","aktivita","dat_zmena","zmenu_prov","zmenu_prov_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPehsbod.inheritsFrom(ReadersBase);
Fields.gCisReaderPehsbod = (prefabOptions) => { return {data:new Readers.GCisReaderPehsbod(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderPercado.fields.js
Readers.GCisReaderPercado = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPercado",keys:["typ_ado"],[columns]:["typ_ado","typ_ado_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPercado.inheritsFrom(ReadersBase);
Fields.gCisReaderPercado = (prefabOptions) => { return {data:new Readers.GCisReaderPercado(),[itemTemplate]:"{typ_ado_txt}",[helperColumns]:["typ_ado_txt"]};};

// GCisReaderPercdou.fields.js
Readers.GCisReaderPercdou = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPercdou",keys:["typ_uu"],[columns]:["typ_uu","typ_uu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPercdou.inheritsFrom(ReadersBase);
Fields.gCisReaderPercdou = (prefabOptions) => { return {data:new Readers.GCisReaderPercdou(),[itemTemplate]:"{typ_uu_txt}",[helperColumns]:["typ_uu_txt"]};};

// GCisReaderPercdpx.fields.js
Readers.GCisReaderPercdpx = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPercdpx",keys:["druh_praxe"],[columns]:["druh_praxe","druh_praxe_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPercdpx.inheritsFrom(ReadersBase);
Fields.gCisReaderPercdpx = (prefabOptions) => { return {data:new Readers.GCisReaderPercdpx(),[itemTemplate]:"{druh_praxe_txt}",[helperColumns]:["druh_praxe_txt"]};};

// GCisReaderPercsos.fields.js
Readers.GCisReaderPercsos = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPercsos",keys:["stav_oso"],[columns]:["stav_oso","stav_oso_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPercsos.inheritsFrom(ReadersBase);
Fields.gCisReaderPercsos = (prefabOptions) => { return {data:new Readers.GCisReaderPercsos(),[itemTemplate]:"{stav_oso_txt}",[helperColumns]:["stav_oso_txt"]};};

// GCisReaderPercsto.fields.js
Readers.GCisReaderPercsto = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPercsto",keys:["stav_odeslani"],[columns]:["stav_odeslani","stav_odeslani_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPercsto.inheritsFrom(ReadersBase);
Fields.gCisReaderPercsto = (prefabOptions) => { return {data:new Readers.GCisReaderPercsto(),[itemTemplate]:"{stav_odeslani_txt}",[helperColumns]:["stav_odeslani_txt"]};};

// GCisReaderPercstp.fields.js
Readers.GCisReaderPercstp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPercstp",keys:["stav_puj"],[columns]:["stav_puj","stav_puj_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPercstp.inheritsFrom(ReadersBase);
Fields.gCisReaderPercstp = (prefabOptions) => { return {data:new Readers.GCisReaderPercstp(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GCisReaderPercsze.fields.js
Readers.GCisReaderPercsze = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPercsze",keys:["stav_isoss"],[columns]:["stav_isoss","stav_isoss_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPercsze.inheritsFrom(ReadersBase);
Fields.gCisReaderPercsze = (prefabOptions) => { return {data:new Readers.GCisReaderPercsze(),[itemTemplate]:"{stav_isoss_txt}",[helperColumns]:["stav_isoss_txt"]};};

// GCisReaderPercszn.fields.js
Readers.GCisReaderPercszn = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPercszn",keys:["stav_zazn"],[columns]:["stav_zazn","stav_zazn_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPercszn.inheritsFrom(ReadersBase);
Fields.gCisReaderPercszn = (prefabOptions) => { return {data:new Readers.GCisReaderPercszn(),[itemTemplate]:"{stav_zazn_txt}",[helperColumns]:["stav_zazn_txt"]};};

// GCisReaderPercszp.fields.js
Readers.GCisReaderPercszp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPercszp",keys:["stav_zprac"],[columns]:["stav_zprac","stav_zprac_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPercszp.inheritsFrom(ReadersBase);
Fields.gCisReaderPercszp = (prefabOptions) => { return {data:new Readers.GCisReaderPercszp(),[itemTemplate]:"{stav_zprac_txt}",[helperColumns]:["stav_zprac_txt"]};};

// GCisReaderPerctpd.fields.js
Readers.GCisReaderPerctpd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPerctpd",keys:["typ_per_dav"],[columns]:["typ_per_dav","typ_per_dav_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPerctpd.inheritsFrom(ReadersBase);
Fields.gCisReaderPerctpd = (prefabOptions) => { return {data:new Readers.GCisReaderPerctpd(),[itemTemplate]:"{typ_per_dav_txt}",[helperColumns]:["typ_per_dav_txt"]};};

// GCisReaderPerctpv.fields.js
Readers.GCisReaderPerctpv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPerctpv",keys:["typ_pvv"],[columns]:["typ_pvv","typ_pvv_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPerctpv.inheritsFrom(ReadersBase);
Fields.gCisReaderPerctpv = (prefabOptions) => { return {data:new Readers.GCisReaderPerctpv(),[itemTemplate]:"{typ_pvv_txt}",[helperColumns]:["typ_pvv_txt"]};};

// GCisReaderPerctvz.fields.js
Readers.GCisReaderPerctvz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPerctvz",keys:["typ_vztahu"],[columns]:["typ_vztahu","typ_vztahu_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPerctvz.inheritsFrom(ReadersBase);
Fields.gCisReaderPerctvz = (prefabOptions) => { return {data:new Readers.GCisReaderPerctvz(),[itemTemplate]:"{typ_vztahu_txt}",[helperColumns]:["typ_vztahu_txt"]};};

// GCisReaderPerctyt.fields.js
Readers.GCisReaderPerctyt = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPerctyt",keys:["typ_tit"],[columns]:["typ_tit","typ_tit_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPerctyt.inheritsFrom(ReadersBase);
Fields.gCisReaderPerctyt = (prefabOptions) => { return {data:new Readers.GCisReaderPerctyt(),[itemTemplate]:"{typ_tit_txt}",[helperColumns]:["typ_tit_txt"]};};

// GCisReaderPerczpu.fields.js
Readers.GCisReaderPerczpu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPerczpu",keys:["typ_zam_uraz"],[columns]:["typ_zam_uraz","typ_zam_uraz_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPerczpu.inheritsFrom(ReadersBase);
Fields.gCisReaderPerczpu = (prefabOptions) => { return {data:new Readers.GCisReaderPerczpu(),[itemTemplate]:"{typ_zam_uraz_txt}",[helperColumns]:["typ_zam_uraz_txt"]};};

// GCisReaderPerczpv.fields.js
Readers.GCisReaderPerczpv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPerczpv",keys:["zpv_pp"],[columns]:["zpv_pp","zpv_pp_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPerczpv.inheritsFrom(ReadersBase);
Fields.gCisReaderPerczpv = (prefabOptions) => { return {data:new Readers.GCisReaderPerczpv(),[itemTemplate]:"{zpv_pp_txt}",[helperColumns]:["zpv_pp_txt"]};};

// GCisReaderPerczup.fields.js
Readers.GCisReaderPerczup = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPerczup",keys:["zpu_plat"],[columns]:["zpu_plat","zpu_plat_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPerczup.inheritsFrom(ReadersBase);
Fields.gCisReaderPerczup = (prefabOptions) => { return {data:new Readers.GCisReaderPerczup(),[itemTemplate]:"{zpu_plat_txt}",[helperColumns]:["zpu_plat_txt"]};};

// GCisReaderPersrsm.fields.js
Readers.GCisReaderPersrsm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPersrsm",keys:["uroven_rsm"],[columns]:["uroven_rsm","uroven_rsm_txt","ico","slozka_pohyb","slozka_pohyb_txt","pomer_pohyb","slozka_pevna","slozka_pevna_txt","pomer_pevna","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPersrsm.inheritsFrom(ReadersBase);
Fields.gCisReaderPersrsm = (prefabOptions) => { return {data:new Readers.GCisReaderPersrsm(),[itemTemplate]:"{uroven_rsm_txt}",[helperColumns]:["uroven_rsm_txt"]};};

// GCisReaderPescsza.fields.js
Readers.GCisReaderPescsza = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPescsza",keys:["stupen_zatez"],[columns]:["stupen_zatez","stupen_zatez_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPescsza.inheritsFrom(ReadersBase);
Fields.gCisReaderPescsza = (prefabOptions) => { return {data:new Readers.GCisReaderPescsza(),[itemTemplate]:"{stupen_zatez_txt}",[helperColumns]:["stupen_zatez_txt"]};};

// GCisReaderPesctpf.fields.js
Readers.GCisReaderPesctpf = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPesctpf",keys:["typ_prist_fun"],[columns]:["typ_prist_fun","typ_prist_fun_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPesctpf.inheritsFrom(ReadersBase);
Fields.gCisReaderPesctpf = (prefabOptions) => { return {data:new Readers.GCisReaderPesctpf(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GCisReaderPesctyv.fields.js
Readers.GCisReaderPesctyv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPesctyv",keys:["kod_tyv"],[columns]:["kod_tyv","kod_tyv_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPesctyv.inheritsFrom(ReadersBase);
Fields.gCisReaderPesctyv = (prefabOptions) => { return {data:new Readers.GCisReaderPesctyv(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GCisReaderPescvos.fields.js
Readers.GCisReaderPescvos = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPescvos",keys:["stav_zver"],[columns]:["stav_zver","stav_zver_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPescvos.inheritsFrom(ReadersBase);
Fields.gCisReaderPescvos = (prefabOptions) => { return {data:new Readers.GCisReaderPescvos(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GCisReaderPessrsl.fields.js
Readers.GCisReaderPessrsl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPessrsl",keys:["klic"],[columns]:["klic","slozka_mzdy","poradi","dat_od","dat_do","c_od","c_do","popis","poznamka","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPessrsl.inheritsFrom(ReadersBase);
Fields.gCisReaderPessrsl = (zobrazitPoznamku,prefabOptions) => { return {data:new Readers.GCisReaderPessrsl(),[itemTemplate]:zobrazitPoznamku ? "{poznamka}" : "{popis}",[helperColumns]:zobrazitPoznamku ? ["poznamka"] : ["popis"]};};

// GCisReaderPevcdvp.fields.js
Readers.GCisReaderPevcdvp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPevcdvp",keys:["druh_vzniku"],[columns]:["druh_vzniku","druh_vzniku_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPevcdvp.inheritsFrom(ReadersBase);
Fields.gCisReaderPevcdvp = (prefabOptions) => { return {data:new Readers.GCisReaderPevcdvp(),[itemTemplate]:"{druh_vzniku_txt}",[helperColumns]:["druh_vzniku_txt"]};};

// GCisReaderPevcdza.fields.js
Readers.GCisReaderPevcdza = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPevcdza",keys:["druh_zruseni"],[columns]:["druh_zruseni","druh_zruseni_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPevcdza.inheritsFrom(ReadersBase);
Fields.gCisReaderPevcdza = (prefabOptions) => { return {data:new Readers.GCisReaderPevcdza(),[itemTemplate]:"{druh_zruseni_txt}",[helperColumns]:["druh_zruseni_txt"]};};

// GCisReaderPevcprt.fields.js
Readers.GCisReaderPevcprt = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPevcprt",keys:["prubeh"],[columns]:["prubeh","prubeh_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPevcprt.inheritsFrom(ReadersBase);
Fields.gCisReaderPevcprt = (prefabOptions) => { return {data:new Readers.GCisReaderPevcprt(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GCisReaderPevcsau.fields.js
Readers.GCisReaderPevcsau = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPevcsau",keys:["stav_abs"],[columns]:["stav_abs","stav_abs_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPevcsau.inheritsFrom(ReadersBase);
Fields.gCisReaderPevcsau = (prefabOptions) => { return {data:new Readers.GCisReaderPevcsau(),[itemTemplate]:"{stav_abs_txt}",[helperColumns]:["stav_abs_txt"]};};

// GCisReaderPevcsta.fields.js
Readers.GCisReaderPevcsta = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPevcsta",keys:["stav"],[columns]:["stav","stav_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPevcsta.inheritsFrom(ReadersBase);
Fields.gCisReaderPevcsta = (prefabOptions) => { return {data:new Readers.GCisReaderPevcsta(),[itemTemplate]:"{stav_txt}",[helperColumns]:["stav_txt"]};};

// GCisReaderPevcsuc.fields.js
Readers.GCisReaderPevcsuc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPevcsuc",keys:["stav_uc"],[columns]:["stav_uc","stav_uc_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPevcsuc.inheritsFrom(ReadersBase);
Fields.gCisReaderPevcsuc = (prefabOptions) => { return {data:new Readers.GCisReaderPevcsuc(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GCisReaderPevctkp.fields.js
Readers.GCisReaderPevctkp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPevctkp",keys:["typ_kv_predp"],[columns]:["typ_kv_predp","typ_kv_predp_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPevctkp.inheritsFrom(ReadersBase);
Fields.gCisReaderPevctkp = (prefabOptions) => { return {data:new Readers.GCisReaderPevctkp(),[itemTemplate]:"{typ_kv_predp_txt}",[helperColumns]:["typ_kv_predp_txt"]};};

// GCisReaderPevctlk.fields.js
Readers.GCisReaderPevctlk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPevctlk",keys:["typ_lek"],[columns]:["typ_lek","typ_lek_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPevctlk.inheritsFrom(ReadersBase);
Fields.gCisReaderPevctlk = (prefabOptions) => { return {data:new Readers.GCisReaderPevctlk(),[itemTemplate]:"{typ_lek_txt}",[helperColumns]:["typ_lek_txt"]};};

// GCisReaderPlanyOsoby.fields.js
Readers.GCisReaderPlanyOsoby = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPlanyOsoby",keys:["ixs_plv"],[columns]:["ixs_plv","nazev","zkratka","dat_od","dat_do","ixs_esu"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPlanyOsoby.inheritsFrom(ReadersBase);
Fields.gCisReaderPlanyOsoby = (prefabOptions) => { return {data:new Readers.GCisReaderPlanyOsoby(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderPodtypOtazky.fields.js
Readers.GCisReaderPodtypOtazky = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPodtypOtazky",keys:["podtyp_ota"],[columns]:["podtyp_ota","podtyp_ota_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPodtypOtazky.inheritsFrom(ReadersBase);
Fields.gCisReaderPodtypOtazky = (prefabOptions) => { return {data:new Readers.GCisReaderPodtypOtazky(),[itemTemplate]:"{podtyp_ota_txt}",[helperColumns]:["podtyp_ota_txt"]};};

// GCisReaderRokPehsgen.fields.js
Readers.GCisReaderRokPehsgen = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderRokPehsgen",keys:["rok","typ_hodnoceni"],[columns]:["rok","rok_txt","typ_hodnoceni"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderRokPehsgen.inheritsFrom(ReadersBase);
Fields.gCisReaderRokPehsgen = (prefabOptions) => { return {data:new Readers.GCisReaderRokPehsgen(),[itemTemplate]:"{rok_txt}",[helperColumns]:["rok_txt"]};};

// GCisReaderRokPehshod.fields.js
Readers.GCisReaderRokPehshod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderRokPehshod",keys:["rok","typ_hodnoceni"],[columns]:["rok","rok_txt","typ_hodnoceni"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderRokPehshod.inheritsFrom(ReadersBase);
Fields.gCisReaderRokPehshod = (prefabOptions) => { return {data:new Readers.GCisReaderRokPehshod(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GCisReaderSsldspi.fields.js
Readers.GCisReaderSsldspi = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderSsldspi",keys:["ixp"],[columns]:["ixp","ixp_spis","por_cislo","typ_spis","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderSsldspi.inheritsFrom(ReadersBase);
Fields.gCisReaderSsldspi = (prefabOptions) => { return {data:new Readers.GCisReaderSsldspi(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GCisReaderStavAnoNe.fields.js
Readers.GCisReaderStavAnoNe = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderStavAnoNe",keys:["priznak"],[columns]:["priznak","priznak_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderStavAnoNe.inheritsFrom(ReadersBase);
Fields.gCisReaderStavAnoNe = (prefabOptions) => { return {data:new Readers.GCisReaderStavAnoNe(),[itemTemplate]:"{priznak_txt}",[helperColumns]:["priznak_txt"]};};

// GCisReaderTypOpak.fields.js
Readers.GCisReaderTypOpak = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderTypOpak",keys:["druh"],[columns]:["druh","druh_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderTypOpak.inheritsFrom(ReadersBase);
Fields.gCisReaderTypOpak = (prefabOptions) => { return {data:new Readers.GCisReaderTypOpak(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GCisReaderTypRozkazu.fields.js
Readers.GCisReaderTypRozkazu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderTypRozkazu",keys:["typ_rzk"],[columns]:["typ_rzk","typ_rzk_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderTypRozkazu.inheritsFrom(ReadersBase);
Fields.gCisReaderTypRozkazu = (prefabOptions) => { return {data:new Readers.GCisReaderTypRozkazu(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GCisReaderUrovenCiziJazyk.fields.js
Readers.GCisReaderUrovenCiziJazyk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderUrovenCiziJazyk",keys:["uroven_zcj"],[columns]:["uroven_zcj","uroven_zcj_txt","uroven_popis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderUrovenCiziJazyk.inheritsFrom(ReadersBase);
Fields.gCisReaderUrovenCiziJazyk = (prefabOptions) => { return {data:new Readers.GCisReaderUrovenCiziJazyk(),[itemTemplate]:"{uroven_zcj_txt}",[helperColumns]:["uroven_zcj_txt"]};};

// GCisReaderUrovenKurzu.fields.js
Readers.GCisReaderUrovenKurzu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderUrovenKurzu",keys:["typ_kur"],[columns]:["typ_kur","typ_kur_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderUrovenKurzu.inheritsFrom(ReadersBase);
Fields.gCisReaderUrovenKurzu = (prefabOptions) => { return {data:new Readers.GCisReaderUrovenKurzu(),[itemTemplate]:"{typ_kur_txt}",[helperColumns]:["typ_kur_txt"]};};

// GCisReaderDoplnkoveUdaje.fields.js
Readers.GCisReaderDoplnkoveUdaje = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderDoplnkoveUdaje",keys:["ixs_dou"],[columns]:["ixs_dou","poradi","typ_uu","typ_uu_txt","nazev","zkratka","dat_od","dat_do","kod","vyznam","poznamka","aktivita","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderDoplnkoveUdaje.inheritsFrom(ReadersBase);
Fields.gCisReaderDoplnkoveUdaje = (prefabOptions) => { return {data:new Readers.GCisReaderDoplnkoveUdaje(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gCisReaderDoplnkoveUdaje(),prefabOptions,options)).show()};};
Selectors.gCisReaderDoplnkoveUdaje = () => { return {data:new Readers.GCisReaderDoplnkoveUdaje(),[gridOpts]:{
        userSettings: true,
                        defaultProfile: {
            sort: "id"
        }
    },[gridFormat]:new Gordic.Data.GridFormat()
        .addTextColumn({ name: "typ_uu_txt", caption: "jres:34900054" })         .addTextColumn({ name: "nazev", caption: "jres:34900026" })         .addTextColumn({ name: "vyznam", caption: "jres:34900055" }),[userSettings]:usRoot+"gCisReaderDoplnkoveUdaje",[isolatedUserSettings]:true};};

// GCisReaderGincokr.fields.js
Readers.GCisReaderGincokr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderGincokr",keys:["id_okres"],[columns]:["id_okres","id_okres_txt","id_kraj","kod_okr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderGincokr.inheritsFrom(ReadersBase);
Fields.gCisReaderGincokr = (prefabOptions) => { return {data:new Readers.GCisReaderGincokr(),[itemTemplate]:"{id_okres_txt}",[helperColumns]:["id_okres_txt"]};};

// GCisReaderGinsesuLek.fields.js
Readers.GCisReaderGinsesuLek = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderGinsesuLek",keys:["ixs_esu"],[columns]:["ixs_esu","ixs_esu_per","typ_esu","nazev","ob_jmeno","rc","oc","jmeno","prijmeni","tit_pred","tit_za","typ_lek","typ_lek_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderGinsesuLek.inheritsFrom(ReadersBase);
Fields.gCisReaderGinsesuLek = (prefabOptions) => { return {data:new Readers.GCisReaderGinsesuLek(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderISoSSCiselnik.fields.js
Readers.GCisReaderISoSSCiselnik = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderISoSSCiselnik",keys:["ixs_uci","kod_isoss"],[columns]:["ixs_hci","ixs_uci","id","nazev","zkratka","ciselnik","ciselnik_sloupec","dat_od","dat_do","ciselnik_dat_od","ciselnik_dat_do","aktivita","kod_isoss"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderISoSSCiselnik.inheritsFrom(ReadersBase);
Fields.gCisReaderISoSSCiselnik = (prefabOptions) => { return {data:new Readers.GCisReaderISoSSCiselnik(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"],[serverFilters]:{
        dat_od: { o: "<=", v: new Date() },
        dat_do: { o: ">=", v: new Date() },
        ciselnik_dat_od: { o: "<=", v: new Date() },
        ciselnik_dat_do: { o: ">=", v: new Date() },
        aktivita: 100
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.gCisReaderISoSSCiselnik(),prefabOptions,options)).show()};};
Selectors.gCisReaderISoSSCiselnik = () => { return {data:new Readers.GCisReaderISoSSCiselnik(),[gridOpts]:{
        userSettings: true,
    },[gridFormat]:new Gordic.Data.GridFormat()
        .addTextColumn({ name: "kod_isoss", caption: "jres:34900034", width: 50 })
        .addTextColumn({ name: "nazev", caption: "jres:34900026", width: 360 })
        .addTextColumn({ name: "zkratka", caption: "jres:34900051", width: 50 }),[userSettings]:usRoot+"gCisReaderISoSSCiselnik",[isolatedUserSettings]:true};};

// GCisReaderKalendar.fields.js
Readers.GCisReaderKalendar = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderKalendar",keys:["ixs_kal"],[columns]:["ixs_kal","ixs_vaj","ixs_vaj_txt","typ_kal","typ_kal_txt","per_len","per_fond","per_distr","poc_hodin_kr","dat_plan_od","dat_plan_do","dat_per_poc","nazev","poznamka","aktivita","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderKalendar.inheritsFrom(ReadersBase);
Fields.gCisReaderKalendar = (prefabOptions) => { return {data:new Readers.GCisReaderKalendar(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderKomModel.fields.js
Readers.GCisReaderKomModel = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderKomModel",keys:["ixs_kmo"],[columns]:["ixs_kmo","nazev","poznamka","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderKomModel.inheritsFrom(ReadersBase);
Fields.gCisReaderKomModel = (prefabOptions) => { return {data:new Readers.GCisReaderKomModel(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gCisReaderKomModel(),prefabOptions,options)).show()};};
Selectors.gCisReaderKomModel = () => { return {data:new Readers.GCisReaderKomModel(),[title]:"jres:34900025",[gridOpts]:{
        userSettings: true,
                columnMode: "fit",
                            },[gridFormat]:new Gordic.Data.GridFormat()
            .addTextColumn({ name: "nazev", caption: "jres:34900026", width: 360 })             .addTextColumn({ name: "poznamka", caption: "jres:34900027", width: 50 }),[userSettings]:usRoot+"gCisReaderKomModel",[isolatedUserSettings]:true};};

// GCisReaderObce.fields.js
Readers.GCisReaderObce = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderObce",keys:["obec_kod"],[columns]:["ixs_vsu","obec_kod","obec_nazev","okres_kod","obec_pover_kod","obec_pover_nazev","obec_roz_pus_kod","obec_roz_pus_nazev","okres_nazev","kraj_kod","kraj_nazev","oblast_kod","oblast_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderObce.inheritsFrom(ReadersBase);
Fields.gCisReaderObce = (prefabOptions) => { return {data:new Readers.GCisReaderObce(),[itemTemplate]:"{obec_nazev}",[helperColumns]:["obec_nazev"]};};

// GCisReaderOCE.fields.js
Readers.GCisReaderOCE = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderOCE",keys:["ixs_oce"],[columns]:["ixs_oce", "ixs_oce_nad", "ixs_vos", "typ_prist_fun", "id_oce", "nazev_oce", "zkratka_oce", "dat_od_oce", "dat_do_oce", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderOCE.inheritsFrom(ReadersBase);
Fields.gCisReaderOCE = (zobrazitStrukturu, aktivniOnly,prefabOptions) => { return {data:new Readers.GCisReaderOCE(),[serverFilters]:{
        typ_prist_fun: { o: ">", v: 0 },
        aktivita: (aktivniOnly ?? false) ? "100" : undefined,
        dat_do_oce: (aktivniOnly ?? false) ? { o: ">=", v: new Date() } : undefined
    },[itemTemplate]:"{nazev_oce}",[helperColumns]:["nazev_oce"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gCisReaderOCE(zobrazitStrukturu),prefabOptions,options)).show()};};
Selectors.gCisReaderOCE = (zobrazitStrukturu) => { return {data:(zobrazitStrukturu ?? false) ? function () {
                const data = new Gordic.Data.Readers.GCisReaderOCE().getData(this.serverFilters);
        const view = new Gordic.Data.View(data, {
            key: "ixs_oce",
            processors: {
                tree: new Gordic.Data.Tree(Gordic.Data.Tree.parentIdOrganizer("ixs_oce_nad"), {
                    defaultState: "open",
                    filterKeepStructure: true,
                    filterIncludeChildren: true,
                })
            }
        })

                return view;
    } : new Readers.GCisReaderOCE(),[gridOpts]:{
                        columnMode: "fit",
        defaultProfile: {
            sort: "oce_cesta",
            columnList: (zobrazitStrukturu ?? false) ? "nazev_oce,id_oce" : "id_oce, nazev_oce, zkratka_oce, dat_od_oce, dat_do_oce, oce_cesta",
        },
                                                                                                    },[gridFormat]:(zobrazitStrukturu??false)?
            new Gordic.Data.GridFormat()
                .addStructureColumn({ name: "tree", caption: "jres:34900001", cellTemplate: "{nazev_oce}" })                                 .addTextColumn({ name: "id_oce", caption: "jres:34900012", width: 50 })                 .addDateColumn({ name: "dat_od_oce", caption: "jres:34900042", width: 70 })                 .addDateColumn({ name: "dat_do_oce", caption: "jres:34900043", width: 70 })                 .addTextColumn({ name: "oce_cesta", caption: "jres:34900003", width: 650 })             :
            new Gordic.Data.GridFormat()
                .addTextColumn({ name: "id_oce", caption: "jres:34900012", width: 50 })                 .addTextColumn({ name: "nazev_oce", caption: "jres:34900016", width: 200 })                 .addTextColumn({ name: "zkratka_oce", caption: "jres:34900035", width: 50 })                 .addDateColumn({ name: "dat_od_oce", caption: "jres:34900042", width: 70 })                 .addDateColumn({ name: "dat_do_oce", caption: "jres:34900043", width: 70 })                 .addTextColumn({ name: "oce_cesta", caption: "jres:34900003", width: 650 }),[userSettings]:usRoot+"gCisReaderOCE",[isolatedUserSettings]:true};};

// GCisReaderOCENad.fields.js
Readers.GCisReaderOCENad = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderOCENad",keys:["ixs_oce_pod"],[columns]:["ixs_oce_pod","ixs_oce","ixs_vos","typ_prist_fun","id_oce","nazev_oce","zkratka_oce","dat_od_oce","dat_do_oce","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderOCENad.inheritsFrom(ReadersBase);
Fields.gCisReaderOCENad = (prefabOptions) => { return {data:new Readers.GCisReaderOCENad(),[itemTemplate]:"{nazev_oce}",[helperColumns]:["nazev_oce"]};};

// GCisReaderOdbornaZpusobilost.fields.js
Readers.GCisReaderOdbornaZpusobilost = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderOdbornaZpusobilost",keys:["ixs_hci_ozp","poradi_ozp"],[columns]:["ixs_hci_ozp","ixs_hci_ozp_txt","ixs_hci_typr","ixs_hci_typr_txt","poradi_ozp","nazev_ozp","popis_ozp","poznamka","aktivita","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderOdbornaZpusobilost.inheritsFrom(ReadersBase);
Fields.gCisReaderOdbornaZpusobilost = (prefabOptions) => { return {data:new Readers.GCisReaderOdbornaZpusobilost(),[itemTemplate]:"{nazev_ozp}",[helperColumns]:["nazev_ozp"],[serverFilters]:{
        aktivita: 100
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.gCisReaderOdbornaZpusobilost(),prefabOptions,options)).show()};};
Selectors.gCisReaderOdbornaZpusobilost = () => { return {data:new Readers.GCisReaderOdbornaZpusobilost(),[gridFormat]:new Gordic.Data.GridFormat()
        .addTextColumn({ name: "nazev_ozp", caption: "jres:34900026", width: 200 })
        .addTextColumn({ name: "popis_ozp", caption: "jres:34900052", width: 360 })         .addTextColumn({ name: "ixs_hci_ozp_txt", caption: "jres:34900053", width: 100 }),[userSettings]:usRoot+"gCisReaderOdbornaZpusobilost",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev_ozp"]}};};

// GCisReaderPamcfpd.fields.js
Readers.GCisReaderPamcfpd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPamcfpd",keys:["fond_pd"],[columns]:["fond_pd","fond_pd_txt","ixs_kal","ixs_kal_txt","prum_hod"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPamcfpd.inheritsFrom(ReadersBase);
Fields.gCisReaderPamcfpd = (prefabOptions) => { return {data:new Readers.GCisReaderPamcfpd(),[itemTemplate]:"{fond_pd_txt}",[helperColumns]:["fond_pd_txt"]};};

// GCisReaderPamctab.fields.js
Readers.GCisReaderPamctab = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPamctab",keys:["druh_tab"],[columns]:["druh_tab", "druh_tab_txt", "dat_od", "dat_do", "slozka_mzdy", "slozka_mzdy_txt", "k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPamctab.inheritsFrom(ReadersBase);
Fields.gCisReaderPamctab = (ukazovatPlatnost, jenVybCiselniky,prefabOptions) => { return {data:new Readers.GCisReaderPamctab(),[itemTemplate]:"{druh_tab}",[helperColumns]:["druh_tab_txt"],[serverFilters]:{
        k_v: (jenVybCiselniky ?? true) ? 0 : undefined,
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.gCisReaderPamctab(),prefabOptions,options)).show()};};
Selectors.gCisReaderPamctab = (ukazovatPlatnost) => { return {data:new Readers.GCisReaderPamctab(),[gridOpts]:{
        userSettings: false,
                        defaultProfile: {
            sort: "druh_tab"
        }
    },[gridFormat]:(ukazovatPlatnost ?? false) ?
            new Gordic.Data.GridFormat()
                .addTextColumn({ name: "druh_tab", caption: "jres:34900061", width: 50 })             .addTextColumn({ name: "druh_tab_txt", caption: "jres:34900062", width: 360 })             .addDateColumn({ name: "dat_od", caption: "jres:34900063", width: 360 })             .addDateColumn({ name: "dat_do", caption: "jres:34900064", width: 360 })             :
        new Gordic.Data.GridFormat()
            .addTextColumn({ name: "druh_tab", caption: "jres:34900061", width: 50 })             .addTextColumn({ name: "druh_tab_txt", caption: "jres:34900062", width: 360 }),[userSettings]:usRoot+"gCisReaderPamctab",[isolatedUserSettings]:true};};

// GCisReaderPamctta.fields.js
Readers.GCisReaderPamctta = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPamctta",keys:["druh_tab","plat_trida","plat_stupen"],[columns]:["druh_tab","druh_tab_view","druh_tab_txt","plat_trida","plat_stupen","dat_od","dat_do","c_tarif","slozka_mzdy","slozka_mzdy_txt","roky_praxe_min","roky_praxe_max"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPamctta.inheritsFrom(ReadersBase);
Fields.gCisReaderPamctta = (prefabOptions) => { return {data:new Readers.GCisReaderPamctta(),[itemTemplate]:"{druh_tab_txt}",[helperColumns]:["druh_tab_txt","druh_tab"]};};

// GCisReaderPamsdrh.fields.js
Readers.GCisReaderPamsdrh = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPamsdrh",keys:["slozka_mzdy","druh"],[columns]:["slozka_mzdy", "druh", "nazev", "poznamka", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPamsdrh.inheritsFrom(ReadersBase);
Fields.gCisReaderPamsdrh = (prefabOptions) => { return {data:new Readers.GCisReaderPamsdrh(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.GCisReaderPamsdrh(),prefabOptions,options)).show()};};
Selectors.GCisReaderPamsdrh = () => { return {data:new Readers.GCisReaderPamsdrh(),[title]:"jres:34900028",[gridOpts]:{
        userSettings: false,
        columnMode: "fit",
        defaultProfile: {
            sort: "nazev",
        },
    },[gridFormat]:new Gordic.Data.GridFormat()
            .addNumberColumn({ name: "druh", caption: "jres:34900029", width: 80 })             .addTextColumn({ name: "nazev", caption: "jres:34900026", width: 300 }),[userSettings]:usRoot+"GCisReaderPamsdrh",[isolatedUserSettings]:true};};

// GCisReaderPamskvm.fields.js
Readers.GCisReaderPamskvm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPamskvm",keys:["ixs_kvm"],[columns]:["ixs_kvm","ixs_kvu","kod_kvm","podskupina","nazev","poznamka","aktivita","typ_inst","impl"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPamskvm.inheritsFrom(ReadersBase);
Fields.gCisReaderPamskvm = (prefabOptions) => { return {data:new Readers.GCisReaderPamskvm(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderPamskza.fields.js
Readers.GCisReaderPamskza = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPamskza",keys:["ixs_skk","ixs_hci_kzam"],[columns]:["ixs_skk","ixs_hci_kzam","kzam","nazev","poznamka","dat_od","dat_do","ciselnik_dat_od","ciselnik_dat_do"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPamskza.inheritsFrom(ReadersBase);
Fields.gCisReaderPamskza = (prefabOptions) => { return {data:new Readers.GCisReaderPamskza(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderPamsslo.fields.js
Readers.GCisReaderPamsslo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPamsslo",keys:["ixs_tks","slozka_mzdy"],[columns]:["ixs_tks","slozka_mzdy","slozka_mzdy_txt","prav_predpis","priz_pl_vym","typ_slozky"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPamsslo.inheritsFrom(ReadersBase);
Fields.gCisReaderPamsslo = (prefabOptions) => { return {data:new Readers.GCisReaderPamsslo(),[itemTemplate]:"{slozka_mzdy_txt}",[helperColumns]:["slozka_mzdy_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.GCisReaderPamsslo(),prefabOptions,options)).show()};};
Selectors.GCisReaderPamsslo = () => { return {data:new Readers.GCisReaderPamsslo(),[title]:"jres:34900030",[gridOpts]:{
        userSettings: false,
        columnMode: "fit",
        defaultProfile: {
            sort: "slozka_mzdy",
        },
    },[gridFormat]:new Gordic.Data.GridFormat()
        .addNumberColumn({ name: "slozka_mzdy", caption: "jres:34900031", width: 80 })         .addTextColumn({ name: "slozka_mzdy_txt", caption: "jres:34900026", width: 300 })         .addTextColumn({ name: "prav_predpis", caption: "jres:34900032", width: 300 }),[userSettings]:usRoot+"GCisReaderPamsslo",[isolatedUserSettings]:true};};

// GCisReaderPehshod.fields.js
Readers.GCisReaderPehshod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPehshod",keys:["ixs_hod"],[columns]:["ixs_hod","ixs_gen","ixs_vzo","ixs_vzo_txt","stav_hod","stav_hod_txt","dat_vznik","dat_otazky_od","dat_otazky_do","dat_priprava_od","dat_pohovor_od","dat_pohovor_do","dat_vyjadreni_od","dat_vyjadreni_do","dat_nadrizeni_od","dat_nadrizeni_do","dat_uzavreno_od","dat_zruseno_od","ixs_ppv_autor","ixs_ppv_spravce","sxs_hneho","typ_hneho","ixs_ppv_hneho","ixs_esu_hneho","rc_hneho","oc_hneho","oc_sz_hneho","nazev_hneho","ixs_sym_hneho","sym_id_hneho","sym_zkratka_hneho","sym_nazev_hneho","oce_id_hneho","oce_nazev_hneho","odbor_id_hneho","odbor_nazev_hneho","oce_cesta_hneho","ixs_nav","dat_zacatek_obd","dat_konec_obd","vysledek","dosazen_vys","dosazen_vys_txt","typ_hodnoceni","typ_hodnoceni_txt","ixs_hod_pred","ixs_hod_nasl","duvod_zruseni","ixs_htel","nazev_htel","zaver_h","zaver_h_txt","ixs_htel_nad","nazev_htel_nad","vyjadreni_h","vyjadreni_h_txt","ma_sebehod","ma_sebehod_txt","aktivita","dat_zmena","zmenu_prov","zmenu_prov_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPehshod.inheritsFrom(ReadersBase);
Fields.gCisReaderPehshod = (prefabOptions) => { return {data:new Readers.GCisReaderPehshod(),[itemTemplate]:"{typ_hodnoceni_txt}",[helperColumns]:["typ_hodnoceni_txt"]};};

// GCisReaderPehsvzo.fields.js
Readers.GCisReaderPehsvzo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPehsvzo",keys:["ixs_vzo"],[columns]:["ixs_vzo","nazev","ixs_fun_autor","ixs_fun_autor_txt","ixs_fun_spravce","ixs_fun_spravce_txt","dat_vznik","ixs_kmo","ixs_kmo_txt","aktivita","dat_zmena"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPehsvzo.inheritsFrom(ReadersBase);
Fields.gCisReaderPehsvzo = (prefabOptions) => { return {data:new Readers.GCisReaderPehsvzo(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderPehUzivatel.fields.js
Readers.GCisReaderPehUzivatel = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPehUzivatel",keys:["ixs_fun"],[columns]:["ixs_fun","ixs_su","nazev_su","nazev","ixs_ref","nazev_ref","ixs_zmp","nazev_rf","ixs_orj","nazev_orj","platne","uroven_cfg","adminis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPehUzivatel.inheritsFrom(ReadersBase);
Fields.gCisReaderPehUzivatel = (prefabOptions) => { return {data:new Readers.GCisReaderPehUzivatel(),[itemTemplate]:"{nazev_ref}",[helperColumns]:["nazev_ref"]};};

// GCisReaderPerdslo.fields.js
Readers.GCisReaderPerdslo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPerdslo",keys:["ixs_ppv","poradi"],[columns]:["ixs_ppv","poradi","ixs_tks","slozka_mzdy","slozka_mzdy_txt","dat_od","dat_do","druh","stat","dat_rel_od","c","mena","c_mena","c_sazba","proc_saz","poznamka","dat_zmena","je_aktivni","ixp","poradi_vpo","poradi_vpo_uk","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPerdslo.inheritsFrom(ReadersBase);
Fields.gCisReaderPerdslo = (prefabOptions) => { return {data:new Readers.GCisReaderPerdslo(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GCisReaderPerGinsstr.fields.js
Readers.GCisReaderPerGinsstr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPerGinsstr",keys:["ixs_str"],[columns]:["ixs_str","nazev","tema","poznamka","k_v","ixs_str_nad","aktivita","rokmes_od","rokmes_do","priz_dist","priz_root","priz_oper","poc_pod_tem","poc_pod_ses","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPerGinsstr.inheritsFrom(ReadersBase);
Fields.gCisReaderPerGinsstr = (prefabOptions) => { return {data:new Readers.GCisReaderPerGinsstr(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderPerGinvalv.fields.js
Readers.GCisReaderPerGinvalv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPerGinvalv",keys:["ixs_alv"],[columns]:["ixs_alv","ixs_str","nazev_str","aktivita_str","tema","nazev","id_ses","ixs_frm","ixs_xme","file_name","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPerGinvalv.inheritsFrom(ReadersBase);
Fields.gCisReaderPerGinvalv = (prefabOptions) => { return {data:new Readers.GCisReaderPerGinvalv(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderPersoso.fields.js
Readers.GCisReaderPersoso = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPersoso",keys:["ixs_esu"],[columns]:["ixs_esu","ixs_esu_gin","typ_esu","stav_oso","stav_oso_txt","rc","oc","oc_sz","dat_evid_od","dat_evid_do","nazev","nazev_ofic","jmeno","prijmeni","tit_pred","tit_za","aktivita","typ_prist_fun","ixs_ppv_zar","ppv_dat_od","ppv_dat_do","ixs_sym","ixs_hci_drpp","ixs_hci_drpp_txt","sym_id","sym_zkratka","sym_nazev","oce_id","oce_nazev","odbor_id","odbor_nazev","oce_cesta"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPersoso.inheritsFrom(ReadersBase);
Fields.gCisReaderPersoso = (prefabOptions) => { return {data:new Readers.GCisReaderPersoso(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderPersosoPpv.fields.js
Readers.GCisReaderPersosoPpv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPersosoPpv",keys:["ixs_ppv_zar"],[columns]:["ixs_esu", "ixs_esu_gin", "typ_esu", "stav_oso", "stav_oso_txt", "rc", "oc", "oc_sz", "dat_evid_od", "dat_evid_do", "nazev", "nazev_ofic", "jmeno", "prijmeni", "tit_pred", "tit_za", "aktivita", "typ_prist_fun", "ixs_ppv_zar", "ppv_dat_od", "ppv_dat_do", "ixs_sym", "ixs_hci_drpp", "ixs_hci_drpp_txt", "sym_id", "sym_zkratka", "sym_nazev", "oce_id", "oce_nazev", "odbor_id", "odbor_nazev", "oce_cesta", "ppv_txt", "ixs_oce"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPersosoPpv.inheritsFrom(ReadersBase);
Fields.gCisReaderPersosoPpv = (filterDatum,filterPpv,jsouZobrVedouci,zobrazitVedouci,pouzeVedouci,jePovStatZam,datum,prefabOptions) => { return {data:new Readers.GCisReaderPersosoPpv(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"],[serverFilters]:{
        aktivita: 100,
        sym_je_ved: (pouzeVedouci ?? false) ? 1 : undefined,
        typ_prist_fun: !(pouzeVedouci ?? false) ? { o: ">", v: 0 } : undefined,
        ixs_hci_drpp: !(pouzeVedouci ?? false) ? ['0000BHR0073H', '0000BHR0074C', '0000BHR00757', '0000BHR00762', '0000BHR0079N', '0000BHR007AI', '0000BHR007BD', '0000BHR097P6'] : undefined,
        ppv_dat_od: datum != null ? { o: "<=", v: datum } : undefined,
        ppv_dat_do: datum != null ? { o: ">=", v: datum } : { o: ">=", v: new Date() }
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.gCisReaderPersosoPpv(filterDatum,filterPpv,jsouZobrVedouci,zobrazitVedouci),prefabOptions,options)).show()};};
Selectors.gCisReaderPersosoPpv = (filterDatum,filterPpv,jsouZobrVedouci,zobrazitVedouci,jePovStatZam,datum) => { return {data:new Readers.GCisReaderPersosoPpv(),[gridFormat]:(jsouZobrVedouci ?? false) ? new Gordic.Data.GridFormat()
        .addTextColumn({ name: "oce_nazev", caption: "jres:34900001", width: 250 })         .addTextColumn({ name: "nazev", caption: "jres:34900004", width: 150 })         .addTextColumn({ name: "ixs_hci_drpp_txt", caption: "jres:34900005", width: 116 })         .addDateColumn({ name: "ppv_dat_od", caption: "jres:34900006", width: 70 })         .addDateColumn({ name: "ppv_dat_do", caption: "jres:34900007", width: 70 })         .addTextColumn({ name: "pracoviste", caption: "jres:34900008", width: 150 })         .addTextColumn({ name: "sym_id", caption: "jres:34900009", width: 80 })         .addTextColumn({ name: "sym_zkratka", caption: "jres:34900010", width: 80 })         .addTextColumn({ name: "sym_nazev", caption: "jres:34900011", width: 100 })         .addTextColumn({ name: "oce_id", caption: "jres:34900012", width: 80 })         .addTextColumn({ name: "odbor_id", caption: "jres:34900013", width: 80 })         .addTextColumn({ name: "odbor_nazev", caption: "jres:34900014", width: 265 })         .addTextColumn({ name: "oce_cesta", caption: "jres:34900003", width: 200 })         :
        (zobrazitVedouci ?? false) ? new Gordic.Data.GridFormat()
            .addTextColumn({ name: "oce_cesta", caption: "jres:34900003", width: 200 })             .addTextColumn({ name: "nazev", caption: "jres:34900015", width: 100 })             .addTextColumn({ name: "oc", caption: "jres:34900002", width: 75 })             .addTextColumn({ name: "ixs_hci_drpp_txt", caption: "jres:34900005", width: 116 })             .addDateColumn({ name: "ppv_dat_od", caption: "jres:34900006", width: 70 })             .addDateColumn({ name: "ppv_dat_do", caption: "jres:34900007", width: 70 })             .addTextColumn({ name: "pracoviste", caption: "jres:34900008", width: 150 })             .addTextColumn({ name: "sym_id", caption: "jres:34900009", width: 80 })             .addTextColumn({ name: "sym_zkratka", caption: "jres:34900010", width: 80 })             .addTextColumn({ name: "sym_nazev", caption: "jres:34900011", width: 100 })             .addTextColumn({ name: "oce_id", caption: "jres:34900012", width: 80 })             .addTextColumn({ name: "oce_nazev", caption: "jres:34900016", width: 320 })             .addTextColumn({ name: "odbor_id", caption: "jres:34900013", width: 80 })             .addTextColumn({ name: "odbor_nazev", caption: "jres:34900014", width: 265 })             : (jePovStatZam ?? false) ?
                new Gordic.Data.GridFormat()
                    .addTextColumn({ name: "oc", caption: "jres:34900002", width: 75 })                     .addTextColumn({ name: "oc_sz", caption: "jres:34900017", width: 75 })                     .addTextColumn({ name: "nazev", caption: "jres:34900015", width: 100 })                     .addTextColumn({ name: "ixs_hci_drpp_txt", caption: "jres:34900005", width: 116 })                     .addDateColumn({ name: "ppv_dat_od", caption: "jres:34900006", width: 70 })                     .addDateColumn({ name: "ppv_dat_do", caption: "jres:34900007", width: 70 })                     .addTextColumn({ name: "pracoviste", caption: "jres:34900008", width: 150 })                     .addTextColumn({ name: "sym_id", caption: "jres:34900009", width: 80 })                     .addTextColumn({ name: "sym_zkratka", caption: "jres:34900010", width: 80 })                     .addTextColumn({ name: "sym_nazev", caption: "jres:34900011", width: 100 })                     .addTextColumn({ name: "oce_id", caption: "jres:34900012", width: 80 })                     .addTextColumn({ name: "oce_nazev", caption: "jres:34900016", width: 320 })                     .addTextColumn({ name: "odbor_id", caption: "jres:34900013", width: 80 })                     .addTextColumn({ name: "odbor_nazev", caption: "jres:34900014", width: 265 })                     .addTextColumn({ name: "oce_cesta", caption: "jres:34900003", width: 200 })                 : new Gordic.Data.GridFormat()
                    .addTextColumn({ name: "oc", caption: "jres:34900002", width: 75 })                     .addTextColumn({ name: "nazev", caption: "jres:34900015", width: 100 })                     .addTextColumn({ name: "ixs_hci_drpp_txt", caption: "jres:34900005", width: 116 })                     .addDateColumn({ name: "ppv_dat_od", caption: "jres:34900006", width: 70 })                     .addDateColumn({ name: "ppv_dat_do", caption: "jres:34900007", width: 70 })                     .addTextColumn({ name: "pracoviste", caption: "jres:34900008", width: 150 })                     .addTextColumn({ name: "sym_id", caption: "jres:34900009", width: 80 })                     .addTextColumn({ name: "sym_zkratka", caption: "jres:34900010", width: 80 })                     .addTextColumn({ name: "sym_nazev", caption: "jres:34900011", width: 100 })                     .addTextColumn({ name: "oce_id", caption: "jres:34900012", width: 80 })                     .addTextColumn({ name: "oce_nazev", caption: "jres:34900016", width: 320 })                     .addTextColumn({ name: "odbor_id", caption: "jres:34900013", width: 80 })                     .addTextColumn({ name: "odbor_nazev", caption: "jres:34900014", width: 265 })                     .addTextColumn({ name: "oce_cesta", caption: "jres:34900003", width: 200 }),[gridOpts]:{
        defaultProfile: {
            columnList: (jsouZobrVedouci ?? false) ? "oce_nazev,nazev" : (zobrazitVedouci ?? false) ? "oce_cesta,nazev,oc" : "oc,oc_sz,nazev,ixs_hci_drpp_txt,ppv_dat_od,ppv_dat_do,sym_nazev,oce_cesta"
        }
    },[menuBar]:[
        {
            favorite: true,
            action: new GAction({
                name: "act_FilterDate",
                caption: "jres:34900018",                 icon: "gi-filter-cancel",
                tooltip: "jres:34900019",                 visible: (jsouZobrVedouci ?? false),
                enabled: filterDatum ?? true,
                run: function (ev, ctx) {
                    jsouZobrVedouci = false;
                    debugger
                    ctx.dialogCnt.grid
                                                                                                                                                                                                                                                                                                                                                }
            })
        },
        {
            favorite: true,
            action: new GAction({
                name: "act_FilterDate",
                caption: "jres:34900018",                 icon: "gi-filter-cancel",
                tooltip: "jres:34900019",                 visible: (filterDatum ?? true) && !(jsouZobrVedouci ?? false),
                enabled: filterDatum ?? true,
                run: function (ev, ctx) {
                    if (this.caption === "jres:34900018") {                         this.update({ caption: "jres:34900020", icon: "gi-filter" });                         delete ctx.dialogCnt.actualFilters.ppv_dat_od;
                        delete ctx.dialogCnt.actualFilters.ppv_dat_do;
                        ctx.dialogCnt.filterDataAndRefresh(null, true);
                    }
                    else {
                        this.update({ caption: "jres:34900018", icon: "gi-filter-cancel" });                         if (datum != null) {
                            ctx.dialogCnt.actualFilters.ppv_dat_od = { o: "<=", v: datum };
                            ctx.dialogCnt.actualFilters.ppv_dat_do = { o: ">=", v: datum };
                        } else {
                            ctx.dialogCnt.actualFilters.ppv_dat_do = { o: ">=", v: new Date() };
                        }
                        ctx.dialogCnt.filterDataAndRefresh(null, true);
                    }
                }
            })
        },
        {
            favorite: true,
            action: new GAction({
                name: "act_FilterPPV",
                caption: "jres:34900021",                 icon: "gi-filter-cancel",
                tooltip: "jres:34900022",                 visible: (filterPpv ?? true) && !(pouzeVedouci ?? false) && !(jsouZobrVedouci ?? false),
                enabled: filterPpv ?? true,
                run: function (ev, ctx) {
                    if (this.caption === "jres:34900023") {                         this.update({ caption: "jres:34900021", icon: "gi-filter-cancel" });                         ctx.dialogCnt.actualFilters.ixs_hci_drpp = { o: "IN", v: ["0000BHR0073H", "0000BHR0074C", "0000BHR00757", "0000BHR00762", "0000BHR0079N", "0000BHR007AI", "0000BHR007BD", "0000BHR097P6"] };
                        ctx.dialogCnt.filterDataAndRefresh(null, true);
                    }
                    else {
                        this.update({ caption: "jres:34900023", icon: "gi-filter" });                         delete ctx.dialogCnt.actualFilters.ixs_hci_drpp;
                        ctx.dialogCnt.filterDataAndRefresh(null, true);
                    }
                }
            })
        },
        {
            favorite: true,
            action: new GAction({
                name: "act_RefreshData",
                caption: "jres:34900024",                 icon: "gi-refresh",
                visible: !(jsouZobrVedouci ?? false),
                run: function (ev, ctx) {
                    ctx.dialogCnt.filterDataAndRefresh(null, true);
                }
            })
        }
    ],[userSettings]:usRoot+"gCisReaderPersosoPpv",[isolatedUserSettings]:true};};

// GCisReaderPersppv.fields.js
Readers.GCisReaderPersppv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPersppv",keys:["ixs_ppv"],[columns]:["ixs_ppv","ixs_esu","ixs_esu_gin","typ_esu","nazev_esu","nazev_esu_ofic","oc_esu","rc_esu","ixs_sym","id_sym","nazev_sym","zpv_pp","zpv_pp_txt","ixs_hci_drpp","ixs_hci_drpp_txt","ixs_hci_drpp_id","dat_od","dat_do","ixs_hci_fmzi","ixs_hci_fmzi_txt","ixs_hci_duvp","ixs_hci_duvp_txt","ixs_hci_duvu","ixs_hci_duvu_txt","ixp","poznamka","aktivita","typ_prist_fun"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPersppv.inheritsFrom(ReadersBase);
Fields.gCisReaderPersppv = (zobrazovatSym,zobrazitOsobu,zobrazitPlatnost,prefabOptions) => { return {data:new Readers.GCisReaderPersppv(),[itemTemplate]:(zobrazitOsobu ?? false) ? "{nazev_esu}" : "{ixs_hci_drpp_txt}" + ((zobrazitPlatnost ?? false) ? " {dat_od:date} - {dat_do:date}" : ""),[helperColumns]:(zobrazitOsobu ?? false) ? ["nazev_esu"] : ["ixs_hci_drpp_txt"],[serverFilters]:{
        aktivita: 100,
        typ_prist_fun: { o: ">", v: 0 },
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.gCisReaderPersppv(),prefabOptions,options)).show()};};
Selectors.gCisReaderPersppv = (zobrazovatSym) => { return {data:new Readers.GCisReaderPersppv(),[gridOpts]:{
        userSettings: true,
                                            },[gridFormat]:(zobrazovatSym ?? false) ? new Gordic.Data.GridFormat()
        .addTextColumn({ name: "nazev_esu", caption: "jres:34900015", width: 130 })
        .addTextColumn({ name: "ixs_hci_drpp_txt", caption: "jres:34900041", width: 120 })         .addDateColumn({ name: "dat_od", caption: "jres:34900042", width: 70 })         .addDateColumn({ name: "dat_do", caption: "jres:34900043", width: 70 })         .addTextColumn({ name: "nazev_sym", caption: "jres:34900011", width: 150 })     :
        new Gordic.Data.GridFormat()
            .addTextColumn({ name: "nazev_esu", caption: "jres:34900015", width: 130 })
            .addTextColumn({ name: "ixs_hci_drpp_txt", caption: "jres:34900041", width: 120 })             .addDateColumn({ name: "dat_od", caption: "jres:34900042", width: 70 })             .addDateColumn({ name: "dat_do", caption: "jres:34900043", width: 70 }),[userSettings]:usRoot+"gCisReaderPersppv",[isolatedUserSettings]:true};};

// GCisReaderPersroc.fields.js
Readers.GCisReaderPersroc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPersroc",keys:["rada_oc"],[columns]:["rada_oc","zkratka","nazev","oc_cislo_od","oc_cislo_do","oc_cislo_max","krok_oc","prefix","suffix","poznamka","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPersroc.inheritsFrom(ReadersBase);
Fields.gCisReaderPersroc = (prefabOptions) => { return {data:new Readers.GCisReaderPersroc(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderPerssop.fields.js
Readers.GCisReaderPerssop = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPerssop",keys:["ixs_sop"],[columns]:["ixs_sop","nazev","poznamka","cerpano","aktivita","dat_zmena","zmenu_prov","zmenu_prov_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPerssop.inheritsFrom(ReadersBase);
Fields.gCisReaderPerssop = (prefabOptions) => { return {data:new Readers.GCisReaderPerssop(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderPersspp.fields.js
Readers.GCisReaderPersspp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPersspp",keys:["ixs_spp"],[columns]:["ixs_spp","nazev","popis","dat_vznik","dat_zruseni","ixs_fun_autor","ixs_fun_spravce","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPersspp.inheritsFrom(ReadersBase);
Fields.gCisReaderPersspp = (prefabOptions) => { return {data:new Readers.GCisReaderPersspp(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderPersuci.fields.js
Readers.GCisReaderPersuci = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPersuci",keys:["ixs_uci"],[columns]:["ixs_uci","nazev","zkratka","typ_uci","druh","prav_predpis","dat_od","dat_do"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPersuci.inheritsFrom(ReadersBase);
Fields.gCisReaderPersuci = (prefabOptions) => { return {data:new Readers.GCisReaderPersuci(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderPervpkp.fields.js
Readers.GCisReaderPervpkp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPervpkp",keys:["ixs_hci_fce","ixs_hci_kzam"],[columns]:["ixs_hci_fce","id_fce","nazev_fce","ixs_hci_kzam","id_kzam","nazev_kzam"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPervpkp.inheritsFrom(ReadersBase);
Fields.gCisReaderPervpkp = (prefabOptions) => { return {data:new Readers.GCisReaderPervpkp(),[itemTemplate]:"{id_kzam} - {nazev_kzam}",[helperColumns]:["nazev_kzam"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gCisReaderPervpkp(),prefabOptions,options)).show()};};
Selectors.gCisReaderPervpkp = () => { return {data:new Readers.GCisReaderPervpkp(),[gridFormat]:new Gordic.Data.GridFormat()
            .addTextColumn({ name: "id_kzam", caption: "jres:34900034", width: 50 })             .addTextColumn({ name: "nazev_kzam", caption: "jres:34900026", width: 360 }),[userSettings]:usRoot+"gCisReaderPervpkp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev_kzam"]}};};

// GCisReaderPesckpr.fields.js
Readers.GCisReaderPesckpr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPesckpr",keys:["ixs_hci_kpr","plat_trida_kpr","poradi_kpr","dat_od_kpr"],[columns]:["druh_tab", "druh_tab_view", "druh_tab_txt", "plat_trida", "plat_stupen", "dat_od", "dat_do", "c_tarif", "slozka_mzdy", "slozka_mzdy_txt", "roky_praxe_min", "roky_praxe_max","kod_kpr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPesckpr.inheritsFrom(ReadersBase);
Fields.gCisReaderPesckpr = (prefabOptions) => { return {data:new Readers.GCisReaderPesckpr(),[itemTemplate]:"{kod_kpr}",[helperColumns]:["kod_kpr"]};};

// GCisReaderPessidr.fields.js
Readers.GCisReaderPessidr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPessidr",keys:["idm_role"],[columns]:["idm_role","nazev","zkratka","poznamka","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPessidr.inheritsFrom(ReadersBase);
Fields.gCisReaderPessidr = (prefabOptions) => { return {data:new Readers.GCisReaderPessidr(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderPesskmv.fields.js
Readers.GCisReaderPesskmv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPesskmv",keys:["ixs_kmv"],[columns]:["ixs_kmv","ixs_hci_urkm1","ixs_hci_urkm2","ixs_hci_urkm3","ixs_hci_urkm4","ixs_hci_urkm5","ixs_hci_urkm6","ixs_hci_urkm_txt1","ixs_hci_urkm_txt2","ixs_hci_urkm_txt3","ixs_hci_urkm_txt4","ixs_hci_urkm_txt5","ixs_hci_urkm_txt6","popis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPesskmv.inheritsFrom(ReadersBase);
Fields.gCisReaderPesskmv = (prefabOptions) => { return {data:new Readers.GCisReaderPesskmv(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GCisReaderPessrio.fields.js
Readers.GCisReaderPessrio = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPessrio",keys:["rada_id"],[columns]:["rada_id","nazev","id_cislo_od","id_cislo_do","id_cislo_max","krok_id","dopl_nulu","prefix","suffix","poznamka","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPessrio.inheritsFrom(ReadersBase);
Fields.gCisReaderPessrio = (prefabOptions) => { return {data:new Readers.GCisReaderPessrio(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GCisReaderPessris.fields.js
Readers.GCisReaderPessris = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPessris",keys:["rada_id"],[columns]:["rada_id","nazev","id_cislo_od","id_cislo_do","id_cislo_max","krok_id","dopl_nulu","prefix","suffix","poznamka","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPessris.inheritsFrom(ReadersBase);
Fields.gCisReaderPessris = (prefabOptions) => { return {data:new Readers.GCisReaderPessris(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderPevskur.fields.js
Readers.GCisReaderPevskur = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPevskur",keys:["ixs_kur"],[columns]:["ixs_kur","kod","nazev","zkratka","ixs_esu","nazev_esu","rozsah_dny","rozsah_hod","ixs_hci_dukz","ixs_hci_dukz_txt","platnost_mes","priz_akred","priz_akred_txt","dat_akred","cislo_ak","poc_kreditu","stav","stav_txt","ixs_hci_frmk","ixs_hci_frmk_txt","poznamka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPevskur.inheritsFrom(ReadersBase);
Fields.gCisReaderPevskur = (prefabOptions) => { return {data:new Readers.GCisReaderPevskur(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderPevskvp.fields.js
Readers.GCisReaderPevskvp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPevskvp",keys:["ixs_kvp"],[columns]:["ixs_kvp","kod","nazev","zkratka","platnost_mes","dat_od","dat_do","typ_kv_predp","ixs_hci_drsp","ixs_hci_typv","typ_kv_predp_txt","ixs_hci_drsp_txt","ixs_hci_typv_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPevskvp.inheritsFrom(ReadersBase);
Fields.gCisReaderPevskvp = (prefabOptions) => { return {data:new Readers.GCisReaderPevskvp(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gCisReaderPevskvp(),prefabOptions,options)).show()};};
Selectors.gCisReaderPevskvp = () => { return {data:new Readers.GCisReaderPevskvp(),[gridFormat]:new Gordic.Data.GridFormat()
            .addTextColumn({ name: "nazev", caption: "jres:34900026", width: 360 })
            .addTextColumn({ name: "kod", caption: "jres:34900033", width: 50 }),[userSettings]:usRoot+"gCisReaderPevskvp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev"]}};};

// GCisReaderPevsplv.fields.js
Readers.GCisReaderPevsplv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPevsplv",keys:["ixs_plv"],[columns]:["ixs_plv","nazev","zkratka","dat_od","dat_do"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPevsplv.inheritsFrom(ReadersBase);
Fields.gCisReaderPevsplv = (prefabOptions) => { return {data:new Readers.GCisReaderPevsplv(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderPevstur.fields.js
Readers.GCisReaderPevstur = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPevstur",keys:["ixs_kur","poradi"],[columns]:["ixs_kur","poradi","kod_kurz","nazev_kurz","zkratka_kurz","dat_od","dat_do","dat_uzav","max_pocet","misto","ucebna","ixs_esu_org","c_celk","c_jed","c_mat","stav_kurz","stav","stav_txt","prubeh","prubeh_txt","ac_fak","ac_obj"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPevstur.inheritsFrom(ReadersBase);
Fields.gCisReaderPevstur = (prefabOptions) => { return {data:new Readers.GCisReaderPevstur(),[itemTemplate]:"{nazev_kurz}",[helperColumns]:["nazev_kurz"]};};

// GCisReaderPevsvzo.fields.js
Readers.GCisReaderPevsvzo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPevsvzo",keys:["ixs_esu"],[columns]:["ixs_esu","ixs_prev","typ_esu","ic","ob_jmeno","esu_adr_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPevsvzo.inheritsFrom(ReadersBase);
Fields.gCisReaderPevsvzo = (prefabOptions) => { return {data:new Readers.GCisReaderPevsvzo(),[itemTemplate]:"{ob_jmeno}",[helperColumns]:["ob_jmeno"]};};

// GCisReaderPevvlek.fields.js
Readers.GCisReaderPevvlek = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPevvlek",keys:["ixs_esu_lek","ixs_esu_vzo"],[columns]:["ixs_esu_lek","typ_esu_lek","nazev_lek","rc_lek","oc_lek","ixs_esu_per","ixs_esu_vzo","nazev_vzo","ob_jmeno_vzo","ic_vzo","dat_od","dat_do","typ_lek","typ_lek_txt","zp_vypl","zp_vypl_txt","poznamka","dat_zmena","zmenu_prov","zmenu_prov_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPevvlek.inheritsFrom(ReadersBase);
Fields.gCisReaderPevvlek = (prefabOptions) => { return {data:new Readers.GCisReaderPevvlek(),[itemTemplate]:"{nazev_lek}",[helperColumns]:["nazev_lek"]};};

// GCisReaderPpvSym.fields.js
Readers.GCisReaderPpvSym = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPpvSym",keys:["ixs_ppv"],[columns]:["ixs_ppv","typ_prist_fun","poradi_vazba","dat_od_vazba","dat_do_vazba","uvazek_vazba","dat_od_ppv","dat_do_ppv","ixs_hci_drpp","ixs_hci_drpp_txt","popis_dr_pr","ixs_hci_duvp","popis_duvp","uvazek_ppv","pov_zast","pov_zast_txt","ixs_esu","ixs_esu_gin","typ_esu","nazev_esu","rc_esu","oc_esu","ixs_sym","dat_od_sym","dat_do_sym","id_sym","nazev_sym","zkratka_sym","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPpvSym.inheritsFrom(ReadersBase);
Fields.gCisReaderPpvSym = (prefabOptions) => { return {data:new Readers.GCisReaderPpvSym(),[itemTemplate]:"{ixs_hci_drpp_txt}",[helperColumns]:["ixs_hci_drpp_txt"]};};

// GCisReaderPracoviste.fields.js
Readers.GCisReaderPracoviste = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPracoviste",keys:["ixs_pra"],[columns]:["ixs_pra","povoleno_fce","pracoviste","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPracoviste.inheritsFrom(ReadersBase);
Fields.gCisReaderPracoviste = (prefabOptions) => { return {data:new Readers.GCisReaderPracoviste(),[itemTemplate]:"{nazev}",[helperColumns]:["pracoviste", "nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.CisReaderPracoviste(),prefabOptions,options)).show()};};
Selectors.CisReaderPracoviste = () => { return {data:new Readers.GCisReaderPracoviste(),[gridFormat]:new Gordic.Data.GridFormat()
        .addTextColumn({ name: "pracoviste", caption: "jres:34900008", width: 50 })
        .addTextColumn({ name: "nazev", caption: "jres:34900026", width: 360 }),[userSettings]:usRoot+"CisReaderPracoviste",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["pracoviste", "nazev"]}};};

// GCisReaderPredPred.fields.js
Readers.GCisReaderPredPred = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderPredPred",keys:["id"],[columns]:["id","nazev","zkratka","poznamka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderPredPred.inheritsFrom(ReadersBase);
Fields.gCisReaderPredPred = (prefabOptions) => { return {data:new Readers.GCisReaderPredPred(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GCisReaderRozkazy.fields.js
Readers.GCisReaderRozkazy = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderRozkazy",keys:["ixs_rzk"],[columns]:["ixs_rzk","cislo_rzk","autor","autor_ppv","utvar","datum_vyd","schvalil","schvalil_funkce","schvalil_esu","zpracoval","zpracoval_funkce","zpracoval_esu","dat_vznik","poznamka","aktivita","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderRozkazy.inheritsFrom(ReadersBase);
Fields.gCisReaderRozkazy = (prefabOptions) => { return {data:new Readers.GCisReaderRozkazy(),[itemTemplate]:"{cislo_rzk}",[helperColumns]:["cislo_rzk"]};};

// GCisReaderSlozkyVyneti.fields.js
Readers.GCisReaderSlozkyVyneti = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderSlozkyVyneti",keys:["slozka_mzdy","ixs_hci_drvn"],[columns]:["slozka_mzdy", "ixs_hci_drvn", "dat_od", "dat_do", "slozka_mzdy_txt", "k_v", "typ_frm", "zp_vyp", "ktg_upo", "c_saz1", "c_saz2", "c_imp", "typ_saz_imp", "typ_saz", "typ_upr", "typ_slozky", "dat_mpd", "priz_pl_vym", "poradi_vypoctu", "pv_lock", "vsloord"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderSlozkyVyneti.inheritsFrom(ReadersBase);
Fields.gCisReaderSlozkyVyneti = (prefabOptions) => { return {data:new Readers.GCisReaderSlozkyVyneti(),[itemTemplate]:"{slozka_mzdy_txt}",[helperColumns]:["slozka_mzdy_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.gCisReaderSlozkyVyneti(),prefabOptions,options)).show()};};
Selectors.gCisReaderSlozkyVyneti = () => { return {data:new Readers.GCisReaderSlozkyVyneti(),[gridOpts]:{
                                defaultProfile: {
            sort: "slozka_mzdy"
        }
    },[gridFormat]:new Gordic.Data.GridFormat()
            .addNumberColumn({ name: "slozka_mzdy", caption: "jres:34900031", width: 80 })             .addTextColumn({ name: "slozka_mzdy_txt", caption: "jres:34900056", width: 300 }),[userSettings]:usRoot+"gCisReaderSlozkyVyneti",[isolatedUserSettings]:true};};

// GCisReaderSM.fields.js
Readers.GCisReaderSM = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderSM",keys:["ixs_sym"],[columns]:["ixs_sym","ixs_vos","id_sm","nazev_sm","zkratka_sm","dat_od_sm","dat_do_sm","ixs_kmo","aktivita","ixs_oce","id_oce","nazev_oce","zkratka_oce"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderSM.inheritsFrom(ReadersBase);
Fields.gCisReaderSM = (prefabOptions) => { return {data:new Readers.GCisReaderSM(),[itemTemplate]:"{nazev_sm}",[helperColumns]:["nazev_sm"]};};

// GCisReaderSpisOso.fields.js
Readers.GCisReaderSpisOso = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderSpisOso",keys:["ixp_spis"],[columns]:["ixs_ppv","ixs_esu","ixs_esu_gin","typ_esu","nazev_esu","nazev_esu_ofic","oc_esu","rc_esu","ixs_hci_drpp","dat_od","dat_do","ixp_spis","druh_spis_txt","nazev","akt_znacka","stav_pis","ktg_typ","ixs_typ","priz_cj"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderSpisOso.inheritsFrom(ReadersBase);
Fields.gCisReaderSpisOso = (prefabOptions) => { return {data:new Readers.GCisReaderSpisOso(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GCisReaderStjzk.fields.js
Readers.GCisReaderStjzk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderStjzk",keys:["kod_stjzk"],[columns]:["kod_stjzk","kod_stjzk_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderStjzk.inheritsFrom(ReadersBase);
Fields.gCisReaderStjzk = (prefabOptions) => { return {data:new Readers.GCisReaderStjzk(),[itemTemplate]:"{kod_stjzk_txt}",[helperColumns]:["kod_stjzk_txt"]};};

// GCisReaderStvzd.fields.js
Readers.GCisReaderStvzd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderStvzd",keys:["kod_vzd"],[columns]:["kod_vzd","kod_vzd_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderStvzd.inheritsFrom(ReadersBase);
Fields.gCisReaderStvzd = (prefabOptions) => { return {data:new Readers.GCisReaderStvzd(),[itemTemplate]:"{kod_vzd_txt}",[helperColumns]:["kod_vzd_txt"]};};

// GCisReaderVyjimkaIoSS.fields.js
Readers.GCisReaderVyjimkaIoSS = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderVyjimkaIoSS",keys:["typ","id"],[columns]:["typ","id","nazev","zkratka","poznamka"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderVyjimkaIoSS.inheritsFrom(ReadersBase);
Fields.gCisReaderVyjimkaIoSS = (prefabOptions) => { return {data:new Readers.GCisReaderVyjimkaIoSS(),[itemTemplate]:"{?}",[helperColumns]:["?"]};};

// GCisReaderZarazeniNaSM.fields.js
Readers.GCisReaderZarazeniNaSM = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderZarazeniNaSM",keys:["ixs_sym"],[columns]:["ixs_sym", "ixs_vos", "id_sm", "nazev_sm", "zkratka_sm", "dat_od_sm", "dat_do_sm", "ixs_hci_ksm", "aktivita", "ixs_oce", "id_oce", "nazev_oce", "zkratka_oce", "ixs_ppv_zar", "dat_od_zar", "dat_do_zar", "ixs_esu_gin", "typ_esu", "nazev_zar", "oc_zar", "typ_prist_fun","oce_cesta"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderZarazeniNaSM.inheritsFrom(ReadersBase);
Fields.gCisReaderZarazeniNaSM = (btnKatSym,rozlisovatKatSym,sluzKatSym,aktivniOnly,prefabOptions) => { return {data:new Readers.GCisReaderZarazeniNaSM(),[itemTemplate]:"{nazev_sm}",[helperColumns]:["nazev_sm"],[serverFilters]:(rozlisovatKatSym ?? false) ? {
        ixs_hci_ksm: { o: (sluzKatSym ?? true) ? "IN" : "NOT IN", v: ["0000BHR03TYT", "0000BHR0980G"] },
        typ_prist_fun: { o: ">", v: 0 },
        aktivita: (aktivniOnly ?? false) ? "100" : undefined,
        dat_do_sm: (aktivniOnly ?? false) ? { o: ">=", v: new Date() } : undefined
    } : {
        typ_prist_fun: { o: ">", v: 0 },
        aktivita: (aktivniOnly ?? false) ? "100" : undefined,
        dat_do_sm: (aktivniOnly ?? false) ? { o: ">=", v: new Date() } : undefined
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.gCisReaderZarazeniNaSM(btnKatSym,rozlisovatKatSym,sluzKatSym),prefabOptions,options)).show()};};
Selectors.gCisReaderZarazeniNaSM = (btnKatSym,rozlisovatKatSym,sluzKatSym) => { return {data:new Readers.GCisReaderZarazeniNaSM(),[gridOpts]:{
        userSettings: true,
        columnMode: "full",
        defaultProfile: {
            columns: "id_oce,nazev_oce,id_sm,nazev_sm,nazev_zar,dat_od_sm,dat_do_sm,dat_od_zar,dat_do_zar,oce_cesta",
        },
    },[gridFormat]:new Gordic.Data.GridFormat()
        .addTextColumn({ name: "id_oce", caption: "jres:34900012", width: 50 })
        .addTextColumn({ name: "nazev_oce", caption: "jres:34900016", width: 180 })
        .addTextColumn({ name: "zkratka_oce", caption: "jres:34900035", width: 50 })         .addTextColumn({ name: "id_sm", caption: "jres:34900009", width: 80 })
        .addTextColumn({ name: "nazev_sm", caption: "jres:34900011", width: 180 })
        .addTextColumn({ name: "zkratka_sm", caption: "jres:34900010", width: 50 })
        .addTextColumn({ name: "nazev_zar", caption: "jres:34900036", width: 350 })         .addDateColumn({ name: "dat_od_sm", caption: "jres:34900037", width: 70 })         .addDateColumn({ name: "dat_do_sm", caption: "jres:34900038", width: 70 })         .addDateColumn({ name: "dat_od_zar", caption: "jres:34900039", width: 70 })         .addDateColumn({ name: "dat_do_zar", caption: "jres:34900040", width: 70 })         .addTextColumn({ name: "oce_cesta", caption: "jres:34900003", width: 650 }),[menuBar]:[
        {
            favorite: true,
            action: new GAction({
                name: "actFilter",
                caption: (rozlisovatKatSym ?? false) ? "jres:34900046" : (sluzKatSym ?? true) ? "jres:34900047" : "jres:34900048",                 tooltip: (sluzKatSym ?? true) ? "jres:34900049": "jres:34900050",                 icon: "gi-filter-cancel",
                visible: btnKatSym ?? false,
                run: function (ev, ctx) {
                    if (this.caption === "jres:34900046") {
                        this.update({ caption: (sluzKatSym ?? true) ? "jres:34900047" : "jres:34900048", icon: "gi-filter" });
                        delete ctx.dialogCnt.actualFilters.ixs_hci_ksm;
                        ctx.dialogCnt.filterDataAndRefresh(null, true);
                    } else {
                        this.update({ caption: "jres:34900046", icon: "gi-filter-cancel" });
                        ctx.dialogCnt.actualFilters.ixs_hci_ksm = { o: (sluzKatSym ?? true) ? "IN" : "NOT IN", v: ["0000BHR03TYT", "0000BHR0980G"] };
                        ctx.dialogCnt.filterDataAndRefresh(null, true);
                    }
                }
            })
        },
    ],[userSettings]:usRoot+"gCisReaderZarazeniNaSM",[isolatedUserSettings]:true};};

// GCisReaderCasCiselnik.fields.js
Readers.GCisReaderCasCiselnik = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GCisReaderCasCiselnik",keys:["ixs_hci"],[columns]:["ixs_hci", "ixs_uci", "id", "idl", "nazev", "zkratka", "ciselnik", "ciselnik_sloupec", "dat_od", "dat_do", "ciselnik_dat_od", "ciselnik_dat_do", "aktivita", "kod_isoss"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GCisReaderCasCiselnik.inheritsFrom(ReadersBase);
Fields.gCisReaderCasCiselnik = (prefabOptions) => { return {data:new Readers.GCisReaderCasCiselnik(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"],[serverFilters]:{
        dat_od: { o: "<=", v: new Date() },
        dat_do: { o: ">=", v: new Date() },
        ciselnik_dat_od: { o: "<=", v: new Date() },
        ciselnik_dat_do: { o: ">=", v: new Date() },
        aktivita: 100
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.gCisReaderCasCiselnik(),prefabOptions,options)).show()};};
Selectors.gCisReaderCasCiselnik = () => { return {data:new Readers.GCisReaderCasCiselnik(),[gridOpts]:{
        userSettings: true,
                        defaultProfile: {
            sort: "id"
        }
    },[gridFormat]:new Gordic.Data.GridFormat()
            .addTextColumn({ name: "id", caption: "ID", width: 50 })
            .addTextColumn({ name: "nazev", caption: "Název", width: 360 })
            .addTextColumn({ name: "zkratka", caption: "Zkratka", width: 50 }),[userSettings]:usRoot+"gCisReaderCasCiselnik",[isolatedUserSettings]:true};};

// GReaderPamcttaPredpoklady.fields.js
Readers.PamcttaPredpoklady = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"Controls.GReaderPamcttaPredpoklady",keys:["druh_tab","plat_trida","plat_stupen"],[columns]:["druh_tab","druh_tab_view","druh_tab_txt","plat_trida","plat_stupen","dat_od","dat_do","c_tarif","slozka_mzdy","slozka_mzdy_txt","roky_praxe_min","roky_praxe_max","predpoklady","predpoklady_sp","predpoklady_sz"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.PamcttaPredpoklady.inheritsFrom(ReadersBase);
Fields.pamcttaPredpoklady = (jeStatZam,jeSluzba,prefabOptions) => { return {data:new Readers.PamcttaPredpoklady(),[itemTemplate]:"{plat_trida}",[helperColumns]:["plat_trida"],[selector]:(options) => newDefaultSelector($.extend(Selectors.pamcttaPredpoklady(),prefabOptions,options)).show()};};
Selectors.pamcttaPredpoklady = (jeStatZam,jeSluzba) => { return {data:new Readers.PamcttaPredpoklady(),[gridFormat]:new Gordic.Data.GridFormat()
			.addTextColumn({ name: "plat_trida", caption: "jres:34900045", width: 30 }) 			.addTextColumn({ name: jeStatZam ? "predpoklady_sz" : jeSluzba ? "predpoklady_sp" : "predpoklady", caption: "jres:34900044", width: 100 }),[userSettings]:usRoot+"pamcttaPredpoklady",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["plat_trida"]}};};

})(jQuery);

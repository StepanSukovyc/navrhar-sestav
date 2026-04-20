"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Adt.WebControls.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperItemTemplate = "helperItemTemplate"; const helperColumns = "helperColumns";

// GAdtReaderAgenda.fields.js
Readers.GAdtReaderAgenda = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderAgenda",keys:["typ_ag"],[columns]:["typ_ag","typ_ag_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderAgenda.inheritsFrom(ReadersBase);
Fields.gAdtReaderAgenda = (prefabOptions) => { return {data:new Readers.GAdtReaderAgenda(),[itemTemplate]:"{typ_ag} | {typ_ag_txt}",[helperItemTemplate]:"<b>{typ_ag}</b> |{typ_ag_txt}",[helperColumns]:["typ_ag", "typ_ag_txt"]};};

// GAdtReaderAgt.fields.js
Readers.GAdtReaderAgt = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderAgt",keys:["agt"],[columns]:["agt","agt_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderAgt.inheritsFrom(ReadersBase);
Fields.gAdtReaderAgt = (prefabOptions) => { return {data:new Readers.GAdtReaderAgt(),[itemTemplate]:"{agt} | {agt_txt}",[helperItemTemplate]:"<b>{agt}</b> |{agt_txt}",[helperColumns]:["agt", "agt_txt"]};};

// GAdtReaderAutenticator.fields.js
Readers.GAdtReaderAutenticator = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderAutenticator",keys:["faze"],[columns]:["faze","level_exp","popis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderAutenticator.inheritsFrom(ReadersBase);
Fields.gAdtReaderAutenticator = (prefabOptions) => { return {data:new Readers.GAdtReaderAutenticator(),[itemTemplate]:"{faze} | {popis}",[helperItemTemplate]:"<b>{faze}</b> | {popis}",[helperColumns]:["faze", "level_exp", "popis"]};};

// GAdtReaderBalikyLicenci.fields.js
Readers.GAdtReaderBalikyLicenci = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderBalikyLicenci",keys:["ixs_lip"],[columns]:["nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderBalikyLicenci.inheritsFrom(ReadersBase);
Fields.gAdtReaderBalikyLicenci = (prefabOptions) => { return {data:new Readers.GAdtReaderBalikyLicenci(),[itemTemplate]:"{nazev}",[helperItemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GAdtReaderCenik.fields.js
Readers.GAdtReaderCenik = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderCenik",keys:["ixp_ccm","nazev"],[columns]:["ixp_ccm","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderCenik.inheritsFrom(ReadersBase);
Fields.gAdtReaderCenik = (prefabOptions) => { return {data:new Readers.GAdtReaderCenik(),[itemTemplate]:"{nazev}",[helperItemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GAdtReaderCenikovePolozky.fields.js
Readers.GAdtReaderCenikovePolozky = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderCenikovePolozky",keys:["pol", "ppol"],[columns]:["pol", "ppol"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderCenikovePolozky.inheritsFrom(ReadersBase);
Fields.gAdtReaderCenikovePolozky = (prefabOptions) => { return {data:new Readers.GAdtReaderCenikovePolozky(),[itemTemplate]:"{pol} | {ppol}",[helperItemTemplate]:"<b>{pol}</b> | {ppol}",[helperColumns]:["pol", "ppol"]};};

// GAdtReaderCloud.fields.js
Readers.GAdtReaderCloud = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderCloud",keys:["provoz_cloud"],[columns]:["provoz_cloud_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderCloud.inheritsFrom(ReadersBase);
Fields.gAdtReaderCloud = (prefabOptions) => { return {data:new Readers.GAdtReaderCloud(),[itemTemplate]:"{provoz_cloud_txt}",[helperItemTemplate]:"{provoz_cloud_txt}",[helperColumns]:["provoz_cloud_txt"]};};

// GAdtReaderDalsiSoubory.fields.js
Readers.GAdtReaderDalsiSoubory = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderDalsiSoubory",keys:["ixs_dif"],[columns]:["ixs_dif"/"nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderDalsiSoubory.inheritsFrom(ReadersBase);
Fields.gAdtReaderDalsiSoubory = (prefabOptions) => { return {data:new Readers.GAdtReaderDalsiSoubory(),[itemTemplate]:"{nazev}",[helperItemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GAdtReaderDistributor.fields.js
Readers.GAdtReaderDistributor = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderDistributor",keys:["distributor"],[columns]:["nazev_distributor"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderDistributor.inheritsFrom(ReadersBase);
Fields.gAdtReaderDistributor = (prefabOptions) => { return {data:new Readers.GAdtReaderDistributor(),[itemTemplate]:"{nazev_distributor}",[helperItemTemplate]:"{nazev_distributor}",[helperColumns]:["nazev_distributor"]};};

// GAdtReaderDostupneVerzeRevize.fields.js
Readers.GAdtReaderDostupneVerzeRevize = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderDostupneVerzeRevize",keys:["verze_db"],[columns]:["verze_db", "sub_verze_db"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderDostupneVerzeRevize.inheritsFrom(ReadersBase);
Fields.gAdtReaderDostupneVerzeRevize = (prefabOptions) => { return {data:new Readers.GAdtReaderDostupneVerzeRevize(),[itemTemplate]:"{verze_db}.{sub_verze_db}",[helperColumns]:["verze_db", "sub_verze_db"]};};

// GAdtReaderFaze.fields.js
Readers.GAdtReaderFaze = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderFaze",keys:"faze",[columns]:["faze","faze_txt","submodel"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderFaze.inheritsFrom(ReadersBase);
Fields.gAdtReaderFaze = (prefabOptions) => { return {data:new Readers.GAdtReaderFaze(),[itemTemplate]:"{faze} | {faze_txt}",[helperItemTemplate]:"<b>{faze}</b> | {faze_txt}",[helperColumns]:["faze", "faze_txt","submodel"]};};

// GAdtReaderGDZBaliky.fields.js
Readers.GAdtReaderGDZBaliky = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderGDZBaliky",keys:"ixs_gdt",[columns]:["ixs_gdt", "popis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderGDZBaliky.inheritsFrom(ReadersBase);
Fields.gAdtReaderGDZBaliky = (prefabOptions) => { return {data:new Readers.GAdtReaderGDZBaliky(),[itemTemplate]:"{ixs_gdt} | {popis}",[helperItemTemplate]:"<b>{ixs_gdt}</b> | {popis}",[helperColumns]:["ixs_gdt", "popis"]};};

// GAdtReaderIcoAdministrace.fields.js
Readers.GAdtReaderIcoAdministrace = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderIcoAdministrace",keys:["ico_adm"],[columns]:["ico_adm", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderIcoAdministrace.inheritsFrom(ReadersBase);
Fields.gAdtReaderIcoAdministrace = (prefabOptions) => { return {data:new Readers.GAdtReaderIcoAdministrace(),[itemTemplate]:"{ico_adm} | {nazev}",[helperItemTemplate]:"<b>{ico_adm}</b> | {nazev}",[helperColumns]:["ico_adm", "nazev"]};};

// GAdtReaderIcoFakturace.fields.js
Readers.GAdtReaderIcoFakturace = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderIcoFakturace",keys:["ico_fakt"],[columns]:["ico_fakt", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderIcoFakturace.inheritsFrom(ReadersBase);
Fields.gAdtReaderIcoFakturace = (prefabOptions) => { return {data:new Readers.GAdtReaderIcoFakturace(),[itemTemplate]:"{ico_fakt} | {nazev}",[helperItemTemplate]:"<b>{ico_fakt}</b> | {nazev}",[helperColumns]:["ico_fakt", "nazev"]};};

// GAdtReaderLicenceDatabazi.fields.js
Readers.GAdtReaderLicenceDatabazi = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderLicenceDatabazi",keys:["lic_fyz"],[columns]:["lic_fyz","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderLicenceDatabazi.inheritsFrom(ReadersBase);
Fields.gAdtReaderLicenceDatabazi = (prefabOptions) => { return {data:new Readers.GAdtReaderLicenceDatabazi(),[itemTemplate]:"{lic_fyz} | {nazev}",[helperItemTemplate]:"<b>{lic_fyz}</b> | {nazev}",[helperColumns]:["lic_fyz", "nazev"]};};

// GAdtReaderObc.fields.js
Readers.GAdtReaderObc = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderObc",keys:["obchodnik","distributor"],[columns]:["nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderObc.inheritsFrom(ReadersBase);
Fields.gAdtReaderObc = (prefabOptions) => { return {data:new Readers.GAdtReaderObc(),[itemTemplate]:"{nazev_obc}",[helperItemTemplate]:"{nazev_obc}",[helperColumns]:["nazev_obc"]};};

// GAdtReaderORJ.fields.js
Readers.GAdtReaderORJ = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderORJ",keys:"orj",[columns]:["orj", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderORJ.inheritsFrom(ReadersBase);
Fields.gAdtReaderORJ = (prefabOptions) => { return {data:new Readers.GAdtReaderORJ(),[itemTemplate]:"{orj} | {nazev}",[helperItemTemplate]:"<b>{orj}</b> | {nazev}",[helperColumns]:["orj", "nazev"]};};

// GAdtReaderPol.fields.js
Readers.GAdtReaderPol = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderPol",keys:"pol",[columns]:["pol","popis_pol"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderPol.inheritsFrom(ReadersBase);
Fields.gAdtReaderPol = (prefabOptions) => { return {data:new Readers.GAdtReaderPol(),[itemTemplate]:"{pol} | {popis_pol}",[helperItemTemplate]:"<b>{pol}</b> | {popis_pol}",[helperColumns]:["pol", "popis_pol"]};};

// GAdtReaderPolBezLicPopl.fields.js
Readers.GAdtReaderPolBezLicPopl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderPolBezLicPopl",keys:"pol",[columns]:["pol", "popis_pol"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderPolBezLicPopl.inheritsFrom(ReadersBase);
Fields.gAdtReaderPolBezLicPopl = (prefabOptions) => { return {data:new Readers.GAdtReaderPolBezLicPopl(),[itemTemplate]:"{pol} | {popis_pol}",[helperItemTemplate]:"<b>{pol}</b> | {popis_pol}",[helperColumns]:["pol", "popis_pol"]};};

// GAdtReaderPpol.fields.js
Readers.GAdtReaderPpol = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderPpol",keys:"ppol",[columns]:["ppol","popis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderPpol.inheritsFrom(ReadersBase);
Fields.gAdtReaderPpol = (prefabOptions) => { return {data:new Readers.GAdtReaderPpol(),[itemTemplate]:"{ppol} | {popis}",[helperItemTemplate]:"<b>{ppol}</b> | {popis}",[helperColumns]:["ppol", "popis"]};};

// GAdtReaderProdListy.fields.js
Readers.GAdtReaderProdListy = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderProdListy",keys:["id_listu"],[columns]:["id_listu","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderProdListy.inheritsFrom(ReadersBase);
Fields.gAdtReaderProdListy = (prefabOptions) => { return {data:new Readers.GAdtReaderProdListy(),[itemTemplate]:"{id_listu} | {nazev}",[helperItemTemplate]:"<b>{id_listu}</b> | {nazev}",[helperColumns]:["id_listu", "nazev"]};};

// GAdtReaderRevize.fields.js
Readers.GAdtReaderRevize = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderRevize",keys:["revize"],[columns]:["revize"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderRevize.inheritsFrom(ReadersBase);
Fields.gAdtReaderRevize = (prefabOptions) => { return {data:new Readers.GAdtReaderRevize(),[itemTemplate]:"{revize}",[helperItemTemplate]:"<b>{revize}</b>",[helperColumns]:["revize"]};};

// GAdtReaderRoleRegLic.fields.js
Readers.GAdtReaderRoleRegLic = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderRoleRegLic",keys:["role_fun_lip"],[columns]:["role_fun_lip_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderRoleRegLic.inheritsFrom(ReadersBase);
Fields.gAdtReaderRoleRegLic = (prefabOptions) => { return {data:new Readers.GAdtReaderRoleRegLic(),[itemTemplate]:"{role_fun_lip_txt}",[helperItemTemplate]:"{role_fun_lip_txt}",[helperColumns]:["role_fun_lip_txt"]};};

// GAdtReaderSkupinyDatabazi.fields.js
Readers.GAdtReaderSkupinyDatabazi = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderSkupinyDatabazi",keys:["ixs_sdb"],[columns]:["ixs_sdb", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderSkupinyDatabazi.inheritsFrom(ReadersBase);
Fields.gAdtReaderSkupinyDatabazi = (prefabOptions) => { return {data:new Readers.GAdtReaderSkupinyDatabazi(),[itemTemplate]:"{ixs_sdb} | {nazev}",[helperItemTemplate]:"<b>{ixs_sdb}</b> | {nazev}",[helperColumns]:["ixs_sdb", "nazev"]};};

// GAdtReaderStavRevize.fields.js
Readers.GAdtReaderStavRevize = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderStavRevize",keys:["stav_revize"],[columns]:["stav_revize_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderStavRevize.inheritsFrom(ReadersBase);
Fields.gAdtReaderStavRevize = (prefabOptions) => { return {data:new Readers.GAdtReaderStavRevize(),[itemTemplate]:(obj) => {
		if (obj.stav_revize == 0) {
						return "<div class='fa fa-check-circle g-state-text g-state-success'></div>  " +"<b>" + obj.stav_revize_txt + "</b>"; 
		}
		else if (obj.stav_revize == 20) {
			return "<div class='fa fa-exclamation-circle g-state-text g-state-warning'></div>  " + "<b>" + obj.stav_revize_txt + "</b>";
		}
		else if (obj.stav_revize == 50) {
			return "<div class='fa fa-exclamation-circle g-state-text g-state-important'></div>  " + "<b>" + obj.stav_revize_txt + "</b>";
		}
	},[helperItemTemplate]:(obj) => {
		if (obj.stav_revize == 0) {
			return "<div class='fa fa-check-circle g-state-text g-state-success minifoto'></div> " + "<b>" + obj.stav_revize_txt + "</b><br><i>" + "Doporučená revize distribučního balíku"; 
		}
		else if (obj.stav_revize == 20) {
			return "<div class='fa fa-exclamation-circle g-state-text g-state-warning minifoto'></div> " + "<b>" + obj.stav_revize_txt + "</b><br><i>" + "Testovací revize distribučního balíku";
		}
		else if (obj.stav_revize == 50) {
			return "<div class='fa fa-exclamation-circle g-state-text g-state-important minifoto'></div> " + "<b>" + "Nedoporučená" + "</b><br><i>" + "Nedoporučená revize, k omezenému použití";
		}
	},[helperColumns]:["stav_revize_txt"]};};

// GAdtReaderSubsystem.fields.js
Readers.GAdtReaderSubsystem = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderSubsystem",keys:["subsyst"],[columns]:["subsyst","subsyst_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderSubsystem.inheritsFrom(ReadersBase);
Fields.gAdtReaderSubsystem = (prefabOptions) => { return {data:new Readers.GAdtReaderSubsystem(),[itemTemplate]:"{subsyst} | {subsyst_txt}",[helperItemTemplate]:"<b>{subsyst}</b> |{subsyst_txt}",[helperColumns]:["subsyst", "subsyst_txt"]};};

// GAdtReaderTypFaze.fields.js
Readers.GAdtReaderTypFaze = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderTypFaze",keys:["faze_typ"],[columns]:["faze_typ","faze_typ_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderTypFaze.inheritsFrom(ReadersBase);
Fields.gAdtReaderTypFaze = (prefabOptions) => { return {data:new Readers.GAdtReaderTypFaze(),[itemTemplate]:"{faze_typ_txt}",[helperItemTemplate]:"{faze_typ_txt}",[helperColumns]:["faze_typ_txt"]};};

// GAdtReaderTypImpl.fields.js
Readers.GAdtReaderTypImpl = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderTypImpl",keys:["tyi"],[columns]:["tyi","tyi_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderTypImpl.inheritsFrom(ReadersBase);
Fields.gAdtReaderTypImpl = (prefabOptions) => { return {data:new Readers.GAdtReaderTypImpl(),[itemTemplate]:"{tyi} | {tyi_txt}",[helperItemTemplate]:"<b>{tyi}</b> |{tyi_txt}",[helperColumns]:["tyi","tyi_txt"]};};

// GAdtReaderVerzeDB.fields.js
Readers.GAdtReaderVerzeDB = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderVerzeDB",keys:["verze_db"],[columns]:["verze_db"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderVerzeDB.inheritsFrom(ReadersBase);
Fields.gAdtReaderVerzeDB = (prefabOptions) => { return {data:new Readers.GAdtReaderVerzeDB(),[itemTemplate]:"{verze_db}",[helperItemTemplate]:"{verze_db}",[helperColumns]:["verze_db"]};};

// GAdtReaderVerzeGDZBaliku.fields.js
Readers.GAdtReaderVerzeGDZBaliku = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderVerzeGDZBaliku",keys:["verze_db"],[columns]:["verze_db", "sub_verze_db", "revize_adz"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderVerzeGDZBaliku.inheritsFrom(ReadersBase);
Fields.gAdtReaderVerzeGDZBaliku = (prefabOptions) => { return {data:new Readers.GAdtReaderVerzeGDZBaliku(),[itemTemplate]:"{verze_db}.{sub_verze_db}.{revize_adz}",[helperColumns]:["verze_db", "sub_verze_db", "revize_adz"]};};

// GAdtReaderVlastniLicDB.fields.js
Readers.GAdtReaderVlastniLicDB = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderVlastniLicDB",keys:"lic",[columns]:["lic", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderVlastniLicDB.inheritsFrom(ReadersBase);
Fields.gAdtReaderVlastniLicDB = (prefabOptions) => { return {data:new Readers.GAdtReaderVlastniLicDB(),[itemTemplate]:"{lic} | {nazev}",[helperItemTemplate]:"<b>{lic}</b> | {nazev}",[helperColumns]:["lic", "nazev"]};};

// GAdtReaderVlastniLicRad.fields.js
Readers.GAdtReaderVlastniLicRad = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderVlastniLicRad",keys:"lic",[columns]:["lic", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderVlastniLicRad.inheritsFrom(ReadersBase);
Fields.gAdtReaderVlastniLicRad = (prefabOptions) => { return {data:new Readers.GAdtReaderVlastniLicRad(),[itemTemplate]:"{lic} | {nazev}",[helperItemTemplate]:"<b>{lic}</b> | {nazev}",[helperColumns]:["lic", "nazev"]};};

// GAdtReaderZAK.fields.js
Readers.GAdtReaderZAK = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GAdtReaderZAK",keys:["zak"],[columns]:["zak","zak_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GAdtReaderZAK.inheritsFrom(ReadersBase);
Fields.gAdtReaderZAK = (prefabOptions) => { return {data:new Readers.GAdtReaderZAK(),[itemTemplate]:"{zak} | {zak_txt}",[helperItemTemplate]:"<b>{zak}</b> | {zak_txt}",[helperColumns]:["zak", "zak_txt"]};};

})(jQuery);

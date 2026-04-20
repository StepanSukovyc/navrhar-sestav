"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Rcn.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const helperItemTemplate = "helperItemTemplate"; const cached = "cached"; const selector = "selector"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const filterMinLength = "filterMinLength";

// GReaderPoksden.fields.js
Readers.Poksden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPoksden",keys:["ixp_den"],[columns]:["ixp_den", "ico", "ucs", "uus", "rok", "mena", "mena_txt", "nazev", "aktivita", "ktg_den"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Poksden.inheritsFrom(ReadersBase);
Fields.poksden = (prefabOptions) => { return {data:new Readers.Poksden(),[itemTemplate]:"{nazev}",[helperColumns]:["ixp_den", "nazev", "rok"]};};

// GReaderPoksoso.fields.js
Readers.Poksoso = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPoksoso",keys:["ixs_fun","ixp_den"],[columns]:["ixs_fun", "rok", "aktivita", "ixp_den", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Poksoso.inheritsFrom(ReadersBase);
Fields.poksoso = (prefabOptions) => { return {data:new Readers.Poksoso(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_fun", "ixp_den", "nazev", "rok"]};};

// GReaderRcncadr.fields.js
Readers.Rcncadr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcncadr",keys:["drh_aus"],[columns]:["drh_aus","drh_aus_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcncadr.inheritsFrom(ReadersBase);
Fields.rcncadr = (prefabOptions) => { return {data:new Readers.Rcncadr(),[itemTemplate]:"{drh_aus_txt}",[helperColumns]:["drh_aus","drh_aus_txt"]};};

// GReaderRcncdos.fields.js
Readers.Rcncdos = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcncdos",keys:["stav_dos"],[columns]:["stav_dos", "stav_dos_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcncdos.inheritsFrom(ReadersBase);
Fields.rcncdos = (prefabOptions) => { return {data:new Readers.Rcncdos(),[itemTemplate]:"{stav_dos_txt}",[helperColumns]:["stav_dos", "stav_dos_txt", "k_v", "k_s"]};};

// GReaderRcncdpa.fields.js
Readers.Rcncdpa = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcncdpa",keys:["druh_pas"],[columns]:["druh_pas", "druh_pas_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcncdpa.inheritsFrom(ReadersBase);
Fields.rcncdpa = (prefabOptions) => { return {data:new Readers.Rcncdpa(),[itemTemplate]:"{druh_pas_txt}",[helperColumns]:["druh_pas", "druh_pas_txt", "k_v", "k_s"]};};

// GReaderRcncdrh.fields.js
Readers.Rcncdrh = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcncdrh",keys:["druh_rcn"],[columns]:["druh_rcn", "druh_rcn_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcncdrh.inheritsFrom(ReadersBase);
Fields.rcncdrh = (prefabOptions) => { return {data:new Readers.Rcncdrh(),[itemTemplate]:"{druh_rcn_txt}",[helperColumns]:["druh_rcn", "druh_rcn_txt", "k_v", "k_s"]};};

// GReaderRcncdvi.fields.js
Readers.Rcncdvi = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcncdvi",keys:["druh_viza"],[columns]:["druh_viza", "druh_viza_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcncdvi.inheritsFrom(ReadersBase);
Fields.rcncdvi = (prefabOptions) => { return {data:new Readers.Rcncdvi(),[itemTemplate]:"{druh_viza_txt}",[helperColumns]:["druh_viza", "druh_viza_txt", "k_v", "k_s"]};};

// GReaderRcnckav.fields.js
Readers.Rcnckav = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnckav",keys:["kat_aus"],[columns]:["kat_aus","kat_aus_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnckav.inheritsFrom(ReadersBase);
Fields.rcnckav = (prefabOptions) => { return {data:new Readers.Rcnckav(),[itemTemplate]:"{kat_aus_txt}",[helperColumns]:["kat_aus", "kat_aus_txt"]};};

// GReaderRcncktg.fields.js
Readers.Rcncktg = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcncktg",keys:["ktg_rcn"],[columns]:["ktg_rcn", "ktg_rcn_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcncktg.inheritsFrom(ReadersBase);
Fields.rcncktg = (prefabOptions) => { return {data:new Readers.Rcncktg(),[itemTemplate]:"{ktg_rcn_txt}",[helperColumns]:["ktg_rcn", "ktg_rcn_txt", "k_v", "k_s"]};};

// GReaderRcncphm.fields.js
Readers.Rcncphm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcncphm",keys:["phm"],[columns]:["phm", "phm_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcncphm.inheritsFrom(ReadersBase);
Fields.rcncphm = (prefabOptions) => { return {data:new Readers.Rcncphm(),[itemTemplate]:"{phm_txt}",[helperColumns]:["phm", "phm_txt", "k_v", "k_s"]};};

// GReaderRcncpid.fields.js
Readers.Rcncpid = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcncpid",keys:["stav_prik"],[columns]:["stav_prik", "stav_prik_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcncpid.inheritsFrom(ReadersBase);
Fields.rcncpid = (prefabOptions) => { return {data:new Readers.Rcncpid(),[itemTemplate]:function (row) { return Gordic.Prefabs.Utils.getSimpleInfoString(row.stav_prik_txt, row.k_s); },[helperColumns]:["stav_prik", "stav_prik_txt", "k_v", "k_s"]};};

// GReaderRcncplk.fields.js
Readers.Rcncplk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcncplk",keys:["stav_plk"],[columns]:["stav_plk", "stav_plk_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcncplk.inheritsFrom(ReadersBase);
Fields.rcncplk = (prefabOptions) => { return {data:new Readers.Rcncplk(),[itemTemplate]:"{stav_plk_txt}",[helperColumns]:["stav_plk", "stav_plk_txt", "k_v", "k_s"]};};

// GReaderRcncrcn.fields.js
Readers.Rcncrcn = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcncrcn",keys:["stav_rcn"],[columns]:["stav_rcn", "stav_rcn_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcncrcn.inheritsFrom(ReadersBase);
Fields.rcncrcn = (prefabOptions) => { return {data:new Readers.Rcncrcn(),[itemTemplate]:"{stav_rcn_txt}",[helperColumns]:["stav_rcn", "stav_rcn_txt", "k_v", "k_s"]};};

// GReaderRcncret.fields.js
Readers.Rcncret = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcncret",keys:["typ_rsv"],[columns]:["typ_rsv","typ_rsv_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcncret.inheritsFrom(ReadersBase);
Fields.rcncret = (prefabOptions) => { return {data:new Readers.Rcncret(),[itemTemplate]:"{typ_rsv_txt}",[helperColumns]:["typ_rsv", "typ_rsv_txt"]};};

// GReaderRcncrsv.fields.js
Readers.Rcncrsv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcncrsv",keys:["stav_rsv"],[columns]:["stav_rsv","stav_rsv_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcncrsv.inheritsFrom(ReadersBase);
Fields.rcncrsv = (prefabOptions) => { return {data:new Readers.Rcncrsv(),[itemTemplate]:"{stav_rsv_txt}",[helperColumns]:["stav_rsv", "stav_rsv_txt"]};};

// GReaderRcncspa.fields.js
Readers.Rcncspa = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcncspa",keys:["stav_pas"],[columns]:["stav_pas", "stav_pas_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcncspa.inheritsFrom(ReadersBase);
Fields.rcncspa = (prefabOptions) => { return {data:new Readers.Rcncspa(),[itemTemplate]:"{stav_pas_txt}",[helperColumns]:["stav_pas", "stav_pas_txt", "k_v", "k_s"]};};

// GReaderRcnctpa.fields.js
Readers.Rcnctpa = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnctpa",keys:["typ_pas"],[columns]:["typ_pas", "typ_pas_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnctpa.inheritsFrom(ReadersBase);
Fields.rcnctpa = (prefabOptions) => { return {data:new Readers.Rcnctpa(),[itemTemplate]:"{typ_pas_txt}",[helperColumns]:["typ_pas", "typ_pas_txt", "k_v", "k_s"]};};

// GReaderRcnczpk.fields.js
Readers.Rcnczpk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnczpk",keys:["zp_vyriz"],[columns]:["zp_vyriz", "zp_vyriz_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnczpk.inheritsFrom(ReadersBase);
Fields.rcnczpk = (prefabOptions) => { return {data:new Readers.Rcnczpk(),[itemTemplate]:"{zp_vyriz_txt}",[helperColumns]:["zp_vyriz", "zp_vyriz_txt", "k_v", "k_s"]};};

// GReaderRcnczuh.fields.js
Readers.Rcnczuh = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnczuh",keys:["zp_uhr"],[columns]:["zp_uhr", "zp_uhr_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnczuh.inheritsFrom(ReadersBase);
Fields.rcnczuh = (prefabOptions) => { return {data:new Readers.Rcnczuh(),[itemTemplate]:"{zp_uhr_txt}",[helperColumns]:["zp_uhr", "zp_uhr_txt", "k_v", "k_s"],[helperItemTemplate]:function (row) {
        var more = Gordic.Prefabs.Utils.getSimpleInfoString(row.zp_uhr_txt);
        var info = Gordic.Prefabs.Utils.getSimpleInfoString(row.k_s);

        return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": info, "more": more });
    }};};

// GReaderRcnczvv.fields.js
Readers.Rcnczvv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnczvv",keys:["zp_vyriz"],[columns]:["zp_vyriz", "zp_vyriz_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnczvv.inheritsFrom(ReadersBase);
Fields.rcnczvv = (prefabOptions) => { return {data:new Readers.Rcnczvv(),[itemTemplate]:"{zp_vyriz_txt}",[helperColumns]:["zp_vyriz", "zp_vyriz_txt", "k_v", "k_s"]};};

// GReaderRcnczzp.fields.js
Readers.Rcnczzp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnczzp",keys:["zp_zneh"],[columns]:["zp_zneh", "zp_zneh_txt", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnczzp.inheritsFrom(ReadersBase);
Fields.rcnczzp = (prefabOptions) => { return {data:new Readers.Rcnczzp(),[itemTemplate]:"{zp_zneh_txt}",[helperColumns]:["zp_zneh", "zp_zneh_txt", "k_v", "k_s"]};};

// GReaderRcnsaus.fields.js
Readers.Rcnsaus = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnsaus",keys:["ixp_aus"],[columns]:["ixp_aus", "ac", "evi_cis", "druh_aus", "typ_aus", "vin", "spz", "aktivita", "ixp_den", "poznamka"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Rcnsaus.inheritsFrom(ReadersBase);
Fields.rcnsaus = (prefabOptions) => { return {data:new Readers.Rcnsaus(),[itemTemplate]:"{spz}, {typ_aus}",[helperColumns]:["ixp_aus", "typ_aus", "spz"],[helperItemTemplate]:function (row) {
		var more = Gordic.Prefabs.Utils.getFormatedLabeledString({ "Kat": row.kat_aus_txt, "Typ": row.typ_aus, "Poznámka": row.poznamka }); 		var info = Gordic.Prefabs.Utils.getSimpleInfoString(row.spz);

		return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": info, "more": more });
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.rcnsaus(),prefabOptions,options)).show()};};
Selectors.rcnsaus = () => { return {data:new Readers.Rcnsaus(),[gridOpts]:{
		searchColumns: ["spz", "typ_aus", "poznamka"]
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "spz", caption: "RZ", width: 80 })
		.addTextColumn({ name: "typ_aus", caption: "Tovární značka, model", width: 150 })
		.addTextColumn({ name: "vin", caption: "VIN", width: 150 })
		.addTextColumn({ name: "poznamka", caption: "Poznámka", width: 150 }),[userSettings]:usRoot+"rcnsaus",[isolatedUserSettings]:true};};

// GReaderRcnsden.fields.js
Readers.Rcnsden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GRcnsdenReader",keys:["ixp_den"],[columns]:["ixp_den", "nazev", "rok", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnsden.inheritsFrom(ReadersBase);
Fields.rcnsden = (prefabOptions) => { return {data:new Readers.Rcnsden(),[itemTemplate]:function (row) { return Gordic.Prefabs.Utils.getSimpleInfoString(row.nazev, row.rok); },[helperColumns]:["nazev", "rok", "ixp_den"],[selector]:(options) => newDefaultSelector($.extend(Selectors.rcnsden(),prefabOptions,options)).show()};};
Selectors.rcnsden = () => { return {data:new Readers.Rcnsden(),[gridOpts]:{
		searchColumns: ["rok", "ixp_den", "nazev"],
		rowsClass: (row, tc, index) => {
			if ((row != null) && (row.data.aktivita != undefined))
			{
				switch (row.data.aktivita)
				{
					case 300:
						{
							return "g-state-text g-state-info";
							break;
						}
					case 500:
						{
							return "g-state-text g-state-warning";
							break;
						}
					case 600:
						{
							return "g-state-text g-state-info";
							break;
						}
					case 900:
						{
							return "g-state-text g-state-error";
							break;
						}
					default: return "";
				}
			}
			else return "";
		}
	},[userSettings]:usRoot+"rcnsden",[isolatedUserSettings]:true,[gridFormat]:newGridFormat().add({name: "ixp_den", caption: "jres:28100078", width: 110, forced: true}).add({name: "nazev", caption: "jres:28100079", width: 200}).add({name: "rok", caption: "jres:28100080", width: 60})};};

// GReaderRcnsdvn.fields.js
Readers.Rcnsdvn = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnsdvn",keys:["dvn","rok"],[columns]:["dvn", "rok", "kod_dvn", "nazev", "poznamka", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnsdvn.inheritsFrom(ReadersBase);
Fields.rcnsdvn = (prefabOptions) => { return {data:new Readers.Rcnsdvn(),[itemTemplate]:"{nazev}",[helperColumns]:["dvn", "rok", "kod_dvn", "nazev", "poznamka", "aktivita"]};};

// GReaderRcnsosr.fields.js
Readers.Rcnsosr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnsosr",keys:["ixs_osr"],[columns]:["ixs_osr", "typ_osr", "jmeno", "prijmeni", "tit_pred", "tit_za", "hodnost", "os_cislo", "ixs_esu", "ixs_ref", "dat_od", "dat_do", "poznamka", "aktivita", "nazev", "ico", "ucs", "uus", "ixs_orj", "adresa", "nks", "vkn", "typ_dos", "ixs_tos", "stav_dos"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0,[filterMinLength]:2}, options); };
Readers.Rcnsosr.inheritsFrom(ReadersBase);
Fields.rcnsosr = (prefabOptions) => { return {data:new Readers.Rcnsosr(),[filterMinLength]:2,[itemTemplate]:"{nazev}",[helperColumns]:["ixs_osr", "typ_osr", "jmeno", "prijmeni", "tit_pred", "tit_za", "hodnost", "os_cislo", "ixs_esu", "ixs_ref", "dat_od", "dat_do", "poznamka", "aktivita", "nazev", "ico", "ucs", "uus", "ixs_orj", "adresa", "nks", "vkn", "typ_dos", "ixs_tos", "stav_dos"],[selector]:(options) => newDefaultSelector($.extend(Selectors.rcnsosr(),prefabOptions,options)).show()};};
Selectors.rcnsosr = () => { return {data:new Readers.Rcnsosr(),[filterMinLength]:2,[gridOpts]:{
        searchColumns: ["ixs_osr", "jmeno", "prijmeni", "tit_pred", "tit_za", "hodnost", "os_cislo", "nazev", "cislo_plk"]
    },[gridFormat]:new Gordic.Data.GridFormat()
        .addTextColumn({ name: "os_cislo", caption: "Osobní číslo", width: 70 })
        .addTextColumn({ name: "nazev", caption: "Osoba", width: 230 }),[userSettings]:usRoot+"rcnsosr",[isolatedUserSettings]:true};};

// GReaderRcnspas.fields.js
Readers.Rcnspas = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnspas",keys:["ixp_pas"],[columns]:["ixp_pas", "ixp_den", "rok", "ac", "evi_cis", "cislo_pas", "druh_pas", "typ_pas", "stav_pas", "zp_zneh", "dat_platnost", "dat_evi_od", "dat_evi_do", "dat_vyd_oso", "kontakt_oso", "dat_nav_oso", "dat_vra", "poznamka", "aktivita", "dat_vyd_do", "ixs_osr"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Rcnspas.inheritsFrom(ReadersBase);
Fields.rcnspas = (prefabOptions) => { return {data:new Readers.Rcnspas(),[itemTemplate]:"{cislo_pas}",[helperColumns]:["ixp_pas", "ixp_den", "rok", "ac", "evi_cis", "cislo_pas", "druh_pas", "typ_pas", "stav_pas", "zp_zneh", "dat_platnost", "dat_evi_od", "dat_evi_do", "dat_vyd_oso", "kontakt_oso", "dat_nav_oso", "dat_vra", "poznamka", "aktivita", "dat_vyd_do", "ixs_osr"],[selector]:(options) => newDefaultSelector($.extend(Selectors.rcnspas(),prefabOptions,options)).show()};};
Selectors.rcnspas = () => { return {data:new Readers.Rcnspas(),[gridOpts]:{
		searchColumns: ["cislo_pas", "ixs_osr", "ixs_osr_txt", "typ_pas", "typ_pas_txt", "druh_pas", "druh_pas_txt"]
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "cislo_pas", caption: "Číslo pasu", width: 100 })
		.addTextColumn({ name: "druh_pas_txt", caption: "Druh pasu", width: 100 })
		.addTextColumn({ name: "typ_pas_txt", caption: "Typ pasu", width: 100 })
		.addTextColumn({ name: "ixs_osr_txt", caption: "Osoba", width: 100 }),[userSettings]:usRoot+"rcnspas",[isolatedUserSettings]:true};};

// GReaderRcnsplk.fields.js
Readers.Rcnsplk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnsplk",keys:["ixp_plk"],[columns]:["ixp_plk", "ixp_den", "rok", "ac", "evi_cis", "cislo_plk", "typ_plk", "stav_plk", "ucet", "banka", "dat_platnost", "c_limit_atm", "c_limit_cas", "c_limit_agr", "dat_od", "dat_do", "popis", "aktivita", "ixs_osr", "ico", "ucs", "uus", "ixp_aus"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Rcnsplk.inheritsFrom(ReadersBase);
Fields.rcnsplk = (prefabOptions) => { return {data:new Readers.Rcnsplk(),[itemTemplate]:"{cislo_plk}",[helperColumns]:["ixp_plk", "ixp_den", "rok", "ac", "evi_cis", "cislo_plk", "typ_plk", "stav_plk", "ucet", "banka", "dat_platnost", "c_limit_atm", "c_limit_cas", "c_limit_agr", "dat_od", "dat_do", "popis", "aktivita", "ixs_osr", "ico", "ucs", "uus", "ixp_aus"],[helperItemTemplate]:function (row) {
		var more = Gordic.Prefabs.Utils.getFormatedLabeledString({ "Účet": row.ucet, "Banka": row.banka });
		var info = Gordic.Prefabs.Utils.getSimpleInfoString(row.cislo_plk);

		return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": info, "more": more });
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.rcnsplk(),prefabOptions,options)).show()};};
Selectors.rcnsplk = () => { return {data:new Readers.Rcnsplk(),[gridOpts]:{
		searchColumns: ["cislo_plk", "ucet", "banka"]
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "cislo_plk", caption: "Číslo platební karty", width: 200 })
		.addTextColumn({ name: "ucet", caption: "Číslo účtu", width: 150 })
		.addTextColumn({ name: "banka", caption: "Banka", width: 150 }),[userSettings]:usRoot+"rcnsplk",[isolatedUserSettings]:true};};

// GReaderRcnsrcn.fields.js
Readers.Rcnsrcn = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnsrcn",keys:["ixs_rcn"],[columns]:["ixs_rcn", "ixp_den", "ixp_pcn", "rok", "uex_akt", "ac", "evi_cis", "stav_rcn", "nazev", "rozkaz", "stat", "misto", "ucel", "zkr_dopr", "misto_n", "dat_n", "misto_u", "dat_u", "misto_hra1", "dat_hra1", "misto_hra2", "dat_hra2", "podm_uskut", "podm_vypoc", "ico_fin", "nks_fin", "ico_sdr", "nks_sdr", "ico_real", "nks_real", "ixs_fun_real", "ixs_fun_zad", "ixs_fun_akt", "ico", "ucs", "uus", "nks", "aktivita", "ixp_kur", "ixs_fun_komp", "ixp_sml", "ktg_rcn", "urn", "ixs_zmp_zad", "te1_p", "rok_cia", "ico_cia", "cislo_cia", "ixs_cia", "typ_zmr", "ixp_zmr", "ixs_cle", "typ_poz", "hodnota_te1", "osob_zahranici", "osob_doprovod", "priz_view"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Rcnsrcn.inheritsFrom(ReadersBase);
Fields.rcnsrcn = (prefabOptions) => { return {data:new Readers.Rcnsrcn(),[itemTemplate]:"{ixs_rcn}, {ac}, {nazev}",[helperColumns]:["ixs_rcn", "ixp_den", "ixp_pcn", "rok", "uex_akt", "ac", "evi_cis", "stav_rcn", "nazev", "rozkaz", "stat", "misto", "ucel", "zkr_dopr", "misto_n", "dat_n", "misto_u", "dat_u", "misto_hra1", "dat_hra1", "misto_hra2", "dat_hra2", "podm_uskut", "podm_vypoc", "ico_fin", "nks_fin", "ico_sdr", "nks_sdr", "ico_real", "nks_real", "ixs_fun_real", "ixs_fun_zad", "ixs_fun_akt", "ico", "ucs", "uus", "nks", "aktivita", "ixp_kur", "ixs_fun_komp", "ixp_sml", "ktg_rcn", "urn", "ixs_zmp_zad", "te1_p", "rok_cia", "ico_cia", "cislo_cia", "ixs_cia", "typ_zmr", "ixp_zmr", "ixs_cle", "typ_poz", "hodnota_te1", "osob_zahranici", "osob_doprovod", "priz_view"],[selector]:(options) => newDefaultSelector($.extend(Selectors.rcnsrcn(),prefabOptions,options)).show()};};
Selectors.rcnsrcn = () => { return {data:new Readers.Rcnsrcn(),[gridOpts]:{
        searchColumns: ["ixs_rcn", "ac", "nazev"]
    },[gridFormat]:new Gordic.Data.GridFormat()
        .addTextColumn({ name: "ixs_rcn", caption: "Pid cesty", width: 110 })
        .addTextColumn({ name: "ac", caption: "Agendové číslo", width: 90 })
        .addTextColumn({ name: "nazev", caption: "Název", width: 250 }),[userSettings]:usRoot+"rcnsrcn",[isolatedUserSettings]:true};};

// GReaderRcnsrsv.fields.js
Readers.Rcnsrsv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnsrsv",keys:["ixs_rsv"],[columns]:["ixs_rsv","ac","nazev","misto_n","dat_n"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Rcnsrsv.inheritsFrom(ReadersBase);
Fields.rcnsrsv = (prefabOptions) => { return {data:new Readers.Rcnsrsv(),[itemTemplate]:"{ixs_rsv}, {nazev}, {stav_rsv_txt}, {ac}",[helperColumns]:["nazev", "ixs_rsv","ac"],[selector]:(options) => newDefaultSelector($.extend(Selectors.rcnsrsv(),prefabOptions,options)).show()};};
Selectors.rcnsrsv = () => { return {data:new Readers.Rcnsrsv(),[gridOpts]:{
		searchColumns: ["ixs_rsv", "nazev", "stav_rsv_txt", "ac"]
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "ixs_rsv", caption: "Pid rezervace", width: 110 })
		.addTextColumn({ name: "nazev", caption: "Popis", width: 250 })
		.addTextColumn({ name: "stav_rsv_txt", caption:"Stav", width: 90 })
		.addTextColumn({ name: "ac", caption: "Agendové číslo", width: 90 }),[userSettings]:usRoot+"rcnsrsv",[isolatedUserSettings]:true};};

// GReaderRcnstor.fields.js
Readers.Rcnstor = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnstor",keys:["ixs_tor"],[columns]:["ixs_tor", "nazev", "ixs_tos", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnstor.inheritsFrom(ReadersBase);
Fields.rcnstor = (prefabOptions) => { return {data:new Readers.Rcnstor(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_tor", "nazev", "ixs_tos", "aktivita"]};};

// GReaderRcnstos.fields.js
Readers.Rcnstos = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnstos",keys:["ixs_tos"],[columns]:["ixs_tos", "nazev", "kod_tos", "poznamka", "typ_dos", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnstos.inheritsFrom(ReadersBase);
Fields.rcnstos = (prefabOptions) => { return {data:new Readers.Rcnstos(),[itemTemplate]:"{nazev}",[helperColumns]:["ixs_tos", "nazev", "kod_tos", "poznamka", "typ_dos", "aktivita"]};};

// GReaderRcnstpk.fields.js
Readers.Rcnstpk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnstpk",keys:["typ_plk"],[columns]:["typ_plk", "typ_plk_txt", "popis", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnstpk.inheritsFrom(ReadersBase);
Fields.rcnstpk = (prefabOptions) => { return {data:new Readers.Rcnstpk(),[itemTemplate]:"{typ_plk_txt}",[helperColumns]:["typ_plk", "typ_plk_txt", "popis", "aktivita"]};};

// GReaderRcnsurn.fields.js
Readers.Rcnsurn = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnsurn",keys:["urn"],[columns]:["urn", "kod_urn", "nazev", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnsurn.inheritsFrom(ReadersBase);
Fields.rcnsurn = (prefabOptions) => { return {data:new Readers.Rcnsurn(),[itemTemplate]:"{nazev}",[helperColumns]:["urn", "kod_urn", "nazev", "aktivita"]};};

// GReaderRcnsvkn.fields.js
Readers.Rcnsvkn = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderRcnsvkn",keys:["code","nks"],[columns]:["code", "name", "nks"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Rcnsvkn.inheritsFrom(ReadersBase);
Fields.rcnsvkn = (prefabOptions) => { return {data:new Readers.Rcnsvkn(),[itemTemplate]:function (row) {
		return Gordic.Prefabs.Utils.getSimpleInfoString(row.code, row.name);
	},[helperColumns]:["code", "name"],[selector]:(options) => newDefaultSelector($.extend(Selectors.rcnsvkn(),prefabOptions,options)).show()};};
Selectors.rcnsvkn = () => { return {data:new Readers.Rcnsvkn(),[gridOpts]:{
		searchColumns: ["code", "name"]
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "code", caption: "Výkon", width: 100 })
		.addTextColumn({ name: "name", caption: "Název", width: 230 }),[userSettings]:usRoot+"rcnsvkn",[isolatedUserSettings]:true};};

})(jQuery);

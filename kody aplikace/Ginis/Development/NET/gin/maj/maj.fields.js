"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Maj.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const helperItemTemplate = "helperItemTemplate"; const selector = "selector"; const title = "title"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const itemTooltipTemplate = "itemTooltipTemplate"; const dropdown = "dropdown";

// Gordic.Maj.Client.GReaderDatUupTrf.fields.js
Readers.DatUupTrf = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderDatUupTrf",keys:["dat_uup"],[columns]:["typ_dok", "dat_uup", "popis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.DatUupTrf.inheritsFrom(ReadersBase);
Fields.datUupTrf = (prefabOptions) => { return {data:new Readers.DatUupTrf(),[itemTemplate]:"{dat_uup:date}",[helperColumns]:["dat_uup", "popis"],[helperItemTemplate]:function (row) {

				var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(Gordic.Templates.Formatters.date(row.dat_uup));
		var moreInfo = Gordic.Prefabs.Utils.getSimpleInfoString(row.popis);

		return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.datUupTrf(),prefabOptions,options)).show()};};
Selectors.datUupTrf = () => { return {data:new Readers.DatUupTrf(),[title]:"jres:24532131",[userSettings]:usRoot+"datUupTrf",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["dat_uup", "popis"]},[gridFormat]:newGridFormat().addDateColumn({name: "dat_uup", caption: "jres:24532130", width: 80, forced: true}).addTextColumn({name: "popis", caption: "jres:24532023", width: 200})};};

// Gordic.Maj.Client.GReaderInvCisPol.fields.js
Readers.InvCisPol = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderInvCisPol",keys:["inv_cis"],[columns]:["inv_cis","nazev","nazev_skp","ixs_maj"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.InvCisPol.inheritsFrom(ReadersBase);
Fields.invCisPol = (prefabOptions) => { return {data:new Readers.InvCisPol(),[itemTemplate]:"{inv_cis}",[helperColumns]:["inv_cis", "nazev", "nazev_skp"]};};

// Gordic.Maj.Client.GReaderNksEvsKomp.fields.js
Readers.NksEvsKomp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderNksEvsKomp",keys:["item"],[columns]:["item", "nazev", "priz_isl"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.NksEvsKomp.inheritsFrom(ReadersBase);
Fields.nksEvsKomp = (prefabOptions) => { return {data:new Readers.NksEvsKomp(),[itemTemplate]:"{item}",[helperColumns]:["item", "nazev"],[helperItemTemplate]:function (row) {

		var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.item);
		var moreInfo = Gordic.Prefabs.Utils.getSimpleInfoString(row.nazev);

		return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.nksEvsKomp(),prefabOptions,options)).show()};};
Selectors.nksEvsKomp = () => { return {data:new Readers.NksEvsKomp(),[title]:"jres:24532037",[userSettings]:usRoot+"nksEvsKomp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["item", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "item", caption: "jres:24532007", width: 80, forced: true}).addTextColumn({name: "nazev", caption: "jres:24532008", width: 200}).addNumberColumn({name: "priz_isl", caption: "jres:24532032", width: 80})};};

// Gordic.Maj.Client.GReaderVlastniciDok.fields.js
Readers.VlastniciDok = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderVlastniciDok",keys:["ixs_fun"],[columns]:["ixs_fun","nazev_rf"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.VlastniciDok.inheritsFrom(ReadersBase);
Fields.vlastniciDok = (prefabOptions) => { return {data:new Readers.VlastniciDok(),[itemTemplate]:"{nazev_rf}",[helperColumns]:["nazev_rf"],[helperItemTemplate]:"{nazev_rf:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.vlastniciDok(),prefabOptions,options)).show()};};
Selectors.vlastniciDok = () => { return {data:new Readers.VlastniciDok(),[title]:"jres:24532121",[userSettings]:usRoot+"vlastniciDok",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev_rf"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev_rf", caption: "jres:24532120", width: 200, forced: true})};};

// Gordic.Maj.Client.GReaderEkosobj.fields.js
Readers.Ekosobj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosobj",keys:["objekt"],[columns]:["objekt","nazev","aktivita_txt", "stredisko"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekosobj.inheritsFrom(ReadersBase);
Fields.ekosobj = (prefabOptions) => { return {data:new Readers.Ekosobj(),[itemTemplate]:"{objekt}",[helperColumns]:["objekt", "nazev"],[helperItemTemplate]:function (row) {

        var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.objekt);
        var moreInfo = Gordic.Prefabs.Utils.getSimpleInfoString(row.nazev);

        return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosobj(),prefabOptions,options)).show()};};
Selectors.ekosobj = () => { return {data:new Readers.Ekosobj(),[title]:"jres:24532025",[userSettings]:usRoot+"ekosobj",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["objekt", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "objekt", caption: "jres:24532026", width: 80, forced: true}).addTextColumn({name: "nazev", caption: "jres:24532008", width: 180}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 80}).addTextColumn({name: "stredisko", caption: "jres:24532007", width: 80})};};

// Gordic.Maj.Client.GReaderEkosstr.fields.js
Readers.Ekosstr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosstr",keys:["ico","stredisko"],[columns]:["ico", "stredisko", "nazev", "priz_isl", "priz_isl_txt", "aktivita", "aktivita_txt"],[rowSize]:101,[readAll]:false,[permanent]:false}, options); };
Readers.Ekosstr.inheritsFrom(ReadersBase);
Fields.ekosstr = (prefabOptions) => { return {data:new Readers.Ekosstr(),[itemTemplate]:"{stredisko}",[helperColumns]:["stredisko", "nazev"],[helperItemTemplate]:function (row) {

        var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.stredisko);
        var moreInfo = Gordic.Prefabs.Utils.getSimpleInfoString(row.nazev);

        return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosstr(),prefabOptions,options)).show()};};
Selectors.ekosstr = () => { return {data:new Readers.Ekosstr(),[title]:"jres:24532031",[userSettings]:usRoot+"ekosstr",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["stredisko", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "stredisko", caption: "jres:24532007", width: 80, forced: true}).addTextColumn({name: "nazev", caption: "jres:24532008", width: 140}).addTextColumn({name: "priz_isl_txt", caption: "jres:24532032", width: 80}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 80})};};

// Gordic.Maj.Client.GReaderEkovkzo.fields.js
Readers.Ekovkzo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkovkzo",keys:["skp","skupina_odp","polozka_odp"],[columns]:["skp","skupina_odp","polozka_odp","rok_od","rok_do","doba_uc","c_sazba_uc","nazev_dp", "aktivita", "typ_kla"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekovkzo.inheritsFrom(ReadersBase);
Fields.ekovkzo = (prefabOptions) => { return {data:new Readers.Ekovkzo(),[itemTemplate]:"{skupina_odp}",[helperColumns]:["skupina_odp", "nazev_dp"],[helperItemTemplate]:function (row) {

		var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.skupina_odp);
		var moreInfo = Gordic.Prefabs.Utils.getFormatedLabeledString({
			"jres:24532045": row.skp, 		});
		
		return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.ekovkzo(),prefabOptions,options)).show()};};
Selectors.ekovkzo = () => { return {data:new Readers.Ekovkzo(),[title]:"jres:24532053",[userSettings]:usRoot+"ekovkzo",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["skupina_odp", "nazev_dp"]},[gridFormat]:newGridFormat().addTextColumn({name: "skp", caption: "jres:24532045", width: 70, forced: true}).addTextColumn({name: "skupina_odp", caption: "jres:24532046", width: 35}).addNumberColumn({name: "polozka_odp", caption: "jres:24532047", width: 50}).addNumberColumn({name: "rok_od", caption: "jres:24532048", width: 64}).addNumberColumn({name: "rok_do", caption: "jres:24532049", width: 64}).addNumberColumn({name: "doba_uc", caption: "jres:24532050", width: 80}).addNumberColumn({name: "c_sazba_uc", caption: "jres:24532051", width: 40}).addTextColumn({name: "nazev_dp", caption: "jres:24532052", width: 180})};};

// Gordic.Maj.Client.GReaderGinsbud.fields.js
Readers.GinsbudMaj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsbud",keys:["budova_kod"],[columns]:["budova_kod", "budova_naz", "ixs_maj", "aktivita", "aktivita_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GinsbudMaj.inheritsFrom(ReadersBase);
Fields.ginsbudmaj = (prefabOptions) => { return {data:new Readers.GinsbudMaj(),[itemTemplate]:"{budova_kod:trim:encode}",[helperColumns]:["budova_kod", "budova_naz"],[helperItemTemplate]:function (row) {

        var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.budova_kod);
        var moreInfo = Gordic.Prefabs.Utils.getSimpleInfoString(row.budova_naz);

        return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsbudmaj(),prefabOptions,options)).show()};};
Selectors.ginsbudmaj = () => { return {data:new Readers.GinsbudMaj(),[title]:"jres:24532014",[userSettings]:usRoot+"ginsbudmaj",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["budova_kod", "budova_naz"]},[gridFormat]:newGridFormat().addTextColumn({name: "budova_kod", caption: "jres:24532011", width: 40, forced: true}).addTextColumn({name: "budova_naz", caption: "jres:24532008", width: 120}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 50})};};

// Gordic.Maj.Client.GReaderGinskov.fields.js
Readers.Ginskov = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinskov",keys:["kod_vyu"],[columns]:["kod_vyu","kod_vyu_txt","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ginskov.inheritsFrom(ReadersBase);
Fields.ginskov = (prefabOptions) => { return {data:new Readers.Ginskov(),[itemTemplate]:"{kod_vyu_txt}",[helperColumns]:["kod_vyu", "kod_vyu_txt"],[helperItemTemplate]:function (row) {

		var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.kod_vyu_txt);
		
		return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr });
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.ginskov(),prefabOptions,options)).show()};};
Selectors.ginskov = () => { return {data:new Readers.Ginskov(),[title]:"jres:24532081",[userSettings]:usRoot+"ginskov",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["kod_vyu", "kod_vyu_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "kod_vyu", caption: "jres:24532011", width: 40, forced: true}).addTextColumn({name: "kod_vyu_txt", caption: "jres:24532008", width: 150}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 50})};};

// Gordic.Maj.Client.GReaderGinsmis.fields.js
Readers.GinsmisMaj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinsmis",keys:["mistnost_kod","budova_kod","segment_kod"],[columns]:["mistnost_kod","mistnost_naz","budova_kod","segment_kod","aktivita","aktivita_txt", "patro", "id_kod", "ixs_ref"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GinsmisMaj.inheritsFrom(ReadersBase);
Fields.ginsmismaj = (prefabOptions) => { return {data:new Readers.GinsmisMaj(),[itemTemplate]:"{mistnost_kod:trim:encode}",[helperColumns]:["mistnost_kod", "mistnost_naz"],[helperItemTemplate]:function (row) {

        var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.mistnost_kod);
        var moreInfo = Gordic.Prefabs.Utils.getSimpleInfoString(row.mistnost_naz);

        return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.ginsmismaj(),prefabOptions,options)).show()};};
Selectors.ginsmismaj = () => { return {data:new Readers.GinsmisMaj(),[title]:"jres:24532018",[userSettings]:usRoot+"ginsmismaj",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["mistnost_kod", "mistnost_naz"]},[gridFormat]:newGridFormat().addTextColumn({name: "mistnost_kod", caption: "jres:24532077", width: 40, forced: true}).addTextColumn({name: "budova_kod", caption: "jres:24532015", width: 40}).addTextColumn({name: "segment_kod", caption: "jres:24532075", width: 40}).addTextColumn({name: "mistnost_naz", caption: "jres:24532008", width: 120}).addTextColumn({name: "id_kod", caption: "jres:24532078", width: 50}).addTextColumn({name: "patro", caption: "jres:24532076", width: 40}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 45})};};

// Gordic.Maj.Client.GReaderGinssbu.fields.js
Readers.GinssbuMaj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderGinssbu",keys:["segment_kod","budova_kod"],[columns]:["segment_kod", "segment_naz", "budova_kod", "aktivita", "aktivita_txt", "patro"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.GinssbuMaj.inheritsFrom(ReadersBase);
Fields.ginssbumaj = (prefabOptions) => { return {data:new Readers.GinssbuMaj(),[itemTemplate]:"{segment_kod:trim:encode}",[helperColumns]:["segment_kod", "segment_naz"],[helperItemTemplate]:function (row) {

        var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.segment_kod);
        var moreInfo = Gordic.Prefabs.Utils.getSimpleInfoString(row.segment_naz);

        return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.ginssbumaj(),prefabOptions,options)).show()};};
Selectors.ginssbumaj = () => { return {data:new Readers.GinssbuMaj(),[title]:"jres:24532016",[userSettings]:usRoot+"ginssbumaj",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["segment_kod", "segment_naz"]},[gridFormat]:newGridFormat().addTextColumn({name: "segment_kod", caption: "jres:24532075", width: 40, forced: true}).addTextColumn({name: "budova_kod", caption: "jres:24532015", width: 40}).addTextColumn({name: "segment_naz", caption: "jres:24532008", width: 120}).addTextColumn({name: "patro", caption: "jres:24532076", width: 40}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 40})};};

// Gordic.Maj.Client.GReaderMajccsv.fields.js
Readers.Majccsv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajccsv",keys:["mp_stav"],[columns]:["mp_stav","mp_stav_txt","mp_stav_zkr","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majccsv.inheritsFrom(ReadersBase);
Fields.majccsv = (prefabOptions) => { return {data:new Readers.Majccsv(),[itemTemplate]:"{mp_stav_txt}",[helperColumns]:["mp_stav_txt", "mp_stav_zkr"],[helperItemTemplate]:function (row) {
		return Gordic.Prefabs.Utils.getSimpleInfoString(row.mp_stav_zkr, row.mp_stav_txt, "sb");
	}};};

// Gordic.Maj.Client.GReaderMajcdem.fields.js
Readers.Majcdem = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajcdem",keys:["dev"],[columns]:["dev", "dev_zkr", "dev_txt"],[rowSize]:100,[readAll]:true,[permanent]:true}, options); };
Readers.Majcdem.inheritsFrom(ReadersBase);
Fields.majcdem = (prefabOptions) => { return {data:new Readers.Majcdem(),[itemTemplate]:"{dev_zkr}",[helperColumns]:["dev_zkr", "dev_txt"],[helperItemTemplate]:function (row) {

		var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.dev_zkr);		
		var moreInfo = Gordic.Prefabs.Utils.getSimpleInfoString(row.dev_txt);

		if (row.dev_zkr.trim().length == 0)
			return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": moreInfo });
		else
			return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.majcdem(),prefabOptions,options)).show()};};
Selectors.majcdem = () => { return {data:new Readers.Majcdem(),[title]:"jres:24532117",[userSettings]:usRoot+"majcdem",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["dev_zkr", "dev_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "dev_zkr", caption: "jres:24532028", width: 50, forced: true}).addTextColumn({name: "dev_txt", caption: "jres:24532023", width: 120})};};

// Gordic.Maj.Client.GReaderMajcdrm.fields.js

// Gordic.Maj.Client.GReaderMajckdp.fields.js
Readers.Majckdp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajckdp",keys:["kt_pap"],[columns]:["kt_pap","kt_pap_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majckdp.inheritsFrom(ReadersBase);
Fields.majckdp = (prefabOptions) => { return {data:new Readers.Majckdp(),[itemTemplate]:"{kt_pap}",[helperColumns]:["kt_pap", "kt_pap_txt"],[helperItemTemplate]:function (row) {

		var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.kt_pap);
		var moreInfo = Gordic.Prefabs.Utils.getSimpleInfoString(row.kt_pap_txt);

		if (row.kt_pap_txt.trim().length == 0)
			return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": moreInfo });
		else
			return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.majckdp(),prefabOptions,options)).show()};};
Selectors.majckdp = () => { return {data:new Readers.Majckdp(),[title]:"jres:24532090",[userSettings]:usRoot+"majckdp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["kt_pap", "kt_pap_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "kt_pap", caption: "jres:24532011", width: 10, forced: true}).addTextColumn({name: "kt_pap_txt", caption: "jres:24532023", width: 90})};};

// Gordic.Maj.Client.GReaderMajckep.fields.js
Readers.Majckep = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajckep",keys:["ke_pap"],[columns]:["ke_pap","ke_pap_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majckep.inheritsFrom(ReadersBase);
Fields.majckep = (prefabOptions) => { return {data:new Readers.Majckep(),[itemTemplate]:"{ke_pap:trim:encode}",[helperColumns]:["ke_pap", "ke_pap_txt"],[helperItemTemplate]:function (row) {
		return Gordic.Prefabs.Utils.getSimpleInfoString(row.ke_pap, row.ke_pap_txt, "fb");
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.majckep(),prefabOptions,options)).show()};};
Selectors.majckep = () => { return {data:new Readers.Majckep(),[title]:"jres:24532079",[userSettings]:usRoot+"majckep",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ke_pap", "ke_pap_txt"]},[gridFormat]:newGridFormat().addTextColumn({name: "ke_pap", caption: "jres:24532011", width: 40, forced: true}).addTextColumn({name: "ke_pap_txt", caption: "jres:24532023", width: 200})};};

// Gordic.Maj.Client.GReaderMajckkp.fields.js
Readers.Majckkp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajckkp",keys:["ktg_kp"],[columns]:["ktg_kp","ktg_kp_txt","ktg_kp_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majckkp.inheritsFrom(ReadersBase);
Fields.majckkp = (prefabOptions) => { return {data:new Readers.Majckkp(),[itemTemplate]:"{ktg_kp_txt}",[helperColumns]:["ktg_kp_txt"]};};

// Gordic.Maj.Client.GReaderMajcods.fields.js
Readers.Majcods = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajcods",keys:["skupina_odp"],[columns]:["skupina_odp","skupina_odp_zkr","skupina_odp_txt","doba_odp"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majcods.inheritsFrom(ReadersBase);
Fields.majcods = (prefabOptions) => { return {data:new Readers.Majcods(),[itemTemplate]:"{skupina_odp_zkr}",[helperColumns]:["skupina_odp_zkr"],[helperItemTemplate]:function (row) {
		return Gordic.Prefabs.Utils.getSimpleInfoString(row.skupina_odp_zkr, row.skupina_odp_txt, "fb");
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.majcods(),prefabOptions,options)).show()};};
Selectors.majcods = () => { return {data:new Readers.Majcods(),[title]:"jres:24532119",[userSettings]:usRoot+"majcods",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["skupina_odp_zkr"]},[gridFormat]:newGridFormat().addTextColumn({name: "skupina_odp_zkr", caption: "jres:24532028", width: 40, forced: true}).addTextColumn({name: "skupina_odp_txt", caption: "jres:24532008", width: 200})};};

// Gordic.Maj.Server.GReaderMajcskm.fields.js

// Gordic.Maj.Client.GReaderMajcstp.fields.js
Readers.Majcstp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajcstp",keys:["typ_dok"],[columns]:["typ_dok_zkr","typ_dok_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majcstp.inheritsFrom(ReadersBase);
Fields.majcstp = (prefabOptions) => { return {data:new Readers.Majcstp(),[itemTemplate]:"{typ_dok_txt}",[helperColumns]:["typ_dok_txt", "typ_dok_zkr"],[helperItemTemplate]:function (row) {
        return Gordic.Prefabs.Utils.getSimpleInfoString(row.typ_dok_zkr, row.typ_dok_txt, "sb");
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.majcstp(),prefabOptions,options)).show()};};
Selectors.majcstp = () => { return {data:new Readers.Majcstp(),[title]:"jres:24532027",[userSettings]:usRoot+"majcstp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_dok_txt", "typ_dok_zkr"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_dok_zkr", caption: "jres:24532028", width: 40, forced: true}).addTextColumn({name: "typ_dok_txt", caption: "jres:24532008", width: 200})};};

// Gordic.Maj.Client.GReaderMajctem.fields.js
Readers.Majctem = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajctem",keys:["tev"],[columns]:["tev","tev_txt","tev_zkr","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majctem.inheritsFrom(ReadersBase);
Fields.majctem = (prefabOptions) => { return {data:new Readers.Majctem(),[itemTemplate]:"{tev_zkr}",[helperColumns]:["tev_zkr"]};};

// Gordic.Maj.Client.GReaderMajctyk.fields.js
Readers.Majctyk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajctyk",keys:["tka"],[columns]:["tka","tka_txt","tka_zkr","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majctyk.inheritsFrom(ReadersBase);
Fields.majctyk = (prefabOptions) => { return {data:new Readers.Majctyk(),[itemTemplate]:"{tka_zkr}",[helperColumns]:["tka_zkr", "tka_txt"]};};

// Gordic.Maj.Client.GReaderMajctyz.fields.js
Readers.Majctyz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajctyz",keys:["typ_zodp"],[columns]:["typ_zodp","typ_zodp_txt","typ_zodp_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majctyz.inheritsFrom(ReadersBase);
Fields.majctyz = (prefabOptions) => { return {data:new Readers.Majctyz(),[itemTemplate]:"{typ_zodp_txt}",[helperColumns]:["typ_zodp_zkr", "typ_zodp_txt"]};};

// Gordic.Maj.Client.GReaderMajczev.fields.js
Readers.Majczev = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajczev",keys:["zev"],[columns]:["zev","zev_txt","zev_zkr","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majczev.inheritsFrom(ReadersBase);
Fields.majczev = (prefabOptions) => { return {data:new Readers.Majczev(),[itemTemplate]:"{zev_zkr}",[helperColumns]:["zev_zkr", "zev_txt"]};};

// Gordic.Maj.Client.GReaderMajscim.fields.js
Readers.majscim2 = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajscim",keys:["mat_cis"],[columns]:["mat_cis","skp","nazev","pmj_min","pmj_max","mj_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.majscim2.inheritsFrom(ReadersBase);
Fields.majscim2 = (prefabOptions) => { return {data:new Readers.majscim2(),[itemTemplate]:"{mat_cis}",[helperColumns]:["mat_cis", "nazev"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majscim2(),prefabOptions,options)).show()};};
Selectors.majscim2 = () => { return {data:new Readers.majscim2(),[title]:"jres:24532060",[userSettings]:usRoot+"majscim2",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["mat_cis", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "mat_cis", caption: "jres:24532060", width: 50, forced: true}).addTextColumn({name: "nazev", caption: "jres:24532008", width: 120}).addTextColumn({name: "skp", caption: "jres:24532061", width: 50}).addTextColumn({name: "mj_txt", caption: "jres:24532062", width: 35})};};

// Gordic.Maj.Client.GReaderMajsdrm.fields.js
Readers.Majsdrm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajsdrm",keys:["drh_id"],[columns]:["ixs_drm","drh_id","skupina_id","skupina_id_zkr","drh_txt","drh_zkr","mode_odp","mode_odp_txt","typ_rp","typ_rp_zkr","s_prodej","s_prodej_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majsdrm.inheritsFrom(ReadersBase);
Fields.majsdrm = (prefabOptions) => { return {data:new Readers.Majsdrm(),[itemTemplate]:"{drh_zkr}",[helperColumns]:["drh_zkr", "drh_txt"],[helperItemTemplate]:function (row) {
		return Gordic.Prefabs.Utils.getSimpleInfoString(row.drh_zkr, row.drh_txt, "fb");
	},[itemTooltipTemplate]:"{drh_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.majsdrm(),prefabOptions,options)).show()};};
Selectors.majsdrm = () => { return {data:new Readers.Majsdrm(),[title]:"jres:24532073",[userSettings]:usRoot+"majsdrm",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["drh_zkr", "drh_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "drh_id", caption: "jres:24532063", width: 25, forced: true}).addTextColumn({name: "skupina_zkr", caption: "jres:24532071", width: 55}).addTextColumn({name: "drh_txt", caption: "jres:24532023", width: 120}).addTextColumn({name: "drh_zkr", caption: "jres:24532064", width: 40}).addTextColumn({name: "mode_odp_txt", caption: "jres:24532065", width: 30}).addTextColumn({name: "typ_rp_zkr", caption: "jres:24532072", width: 50}).addTextColumn({name: "s_prodej_txt", caption: "jres:24532066", width: 55}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 45}).addNumberColumn({name: "k_v", caption: "jres:24532069", width: 40})};};

// Gordic.Maj.Client.GReaderMajsel1.fields.js
Readers.Majsel1 = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajsel1",keys:["ext_1"],[columns]:["ext_1","ext_1_zkr","ext_1_txt","aktivita","aktivita_txt","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majsel1.inheritsFrom(ReadersBase);
Fields.majsel1 = (prefabOptions) => { return {data:new Readers.Majsel1(),[itemTemplate]:"{ext_1_txt}",[helperColumns]:["ext_1_zkr", "ext_1_txt"],[helperItemTemplate]:function (row) {

        var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.ext_1_txt);
        var moreInfo = Gordic.Prefabs.Utils.getSimpleInfoString(row.ext_1_zkr);

        return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.majsel1(),prefabOptions,options)).show()};};
Selectors.majsel1 = () => { return {data:new Readers.Majsel1(),[title]:"jres:24532036" + " 1",[userSettings]:usRoot+"majsel1",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ext_1_zkr", "ext_1_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "ext_1", caption: "jres:24532035", width: 40, forced: true}).addTextColumn({name: "ext_1_zkr", caption: "jres:24532028", width: 40}).addTextColumn({name: "ext_1_txt", caption: "jres:24532008", width: 200}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 50})};};

// Gordic.Maj.Client.GReaderMajsel2.fields.js
Readers.Majsel2 = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajsel2",keys:["ext_2"],[columns]:["ext_2","ext_2_zkr","ext_2_txt","aktivita","aktivita_txt","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majsel2.inheritsFrom(ReadersBase);
Fields.majsel2 = (prefabOptions) => { return {data:new Readers.Majsel2(),[itemTemplate]:"{ext_2_txt}",[helperColumns]:["ext_2_zkr", "ext_2_txt"],[helperItemTemplate]:function (row) {

        var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.ext_2_txt);
        var moreInfo = Gordic.Prefabs.Utils.getSimpleInfoString(row.ext_2_zkr);

        return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.majsel2(),prefabOptions,options)).show()};};
Selectors.majsel2 = () => { return {data:new Readers.Majsel2(),[title]:"jres:24532036" + " 2",[userSettings]:usRoot+"majsel2",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ext_2_zkr", "ext_2_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "ext_2", caption: "jres:24532035", width: 40, forced: true}).addTextColumn({name: "ext_2_zkr", caption: "jres:24532028", width: 40}).addTextColumn({name: "ext_2_txt", caption: "jres:24532008", width: 200}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 50})};};

// Gordic.Maj.Client.GReaderMajsel3.fields.js
Readers.Majsel3 = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajsel3",keys:["ext_3"],[columns]:["ext_3","ext_3_zkr","ext_3_txt","aktivita","aktivita_txt","dat_zmena","zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majsel3.inheritsFrom(ReadersBase);
Fields.majsel3 = (prefabOptions) => { return {data:new Readers.Majsel3(),[itemTemplate]:"{ext_3_txt}",[helperColumns]:["ext_3_zkr", "ext_3_txt"],[helperItemTemplate]:function (row) {

        var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.ext_3_txt);
        var moreInfo = Gordic.Prefabs.Utils.getSimpleInfoString(row.ext_3_zkr);

        return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.majsel3(),prefabOptions,options)).show()};};
Selectors.majsel3 = () => { return {data:new Readers.Majsel3(),[title]:"jres:24532036" + " 3",[userSettings]:usRoot+"majsel3",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ext_3_zkr", "ext_3_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "ext_3", caption: "jres:24532035", width: 40, forced: true}).addTextColumn({name: "ext_3_zkr", caption: "jres:24532028", width: 40}).addTextColumn({name: "ext_3_txt", caption: "jres:24532008", width: 200}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 50})};};

// Gordic.Maj.Client.GReaderMajsktz.fields.js
Readers.Majsktz = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajsktz",keys:["ktg_zar"],[columns]:["ktg_zar","ktg_zar_txt","ktg_zar_zkr","aktivita_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majsktz.inheritsFrom(ReadersBase);
Fields.majsktz = (prefabOptions) => { return {data:new Readers.Majsktz(),[itemTemplate]:"{ktg_zar_txt}",[helperColumns]:["ktg_zar_txt", "ktg_zar_zkr"],[helperItemTemplate]:function (row) {

		var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.ktg_zar_txt);
		
		var moreInfo = Gordic.Prefabs.Utils.getFormatedLabeledString(			
			{
				"jres:24532011": row.ktg_zar, 				"jres:24532028": row.ktg_zar_zkr 			}
		);

		return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.majsktz(),prefabOptions,options)).show()};};
Selectors.majsktz = () => { return {data:new Readers.Majsktz(),[title]:"jres:24532083",[userSettings]:usRoot+"majsktz",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ktg_zar_txt", "ktg_zar_zkr"]},[gridFormat]:newGridFormat().addNumberColumn({name: "ktg_zar", caption: "jres:24532082", width: 15, forced: true}).addTextColumn({name: "ktg_zar_zkr", caption: "jres:24532028", width: 10}).addTextColumn({name: "ktg_zar_txt", caption: "jres:24532008", width: 60}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 15})};};

// Gordic.Maj.Client.GReaderMajsmob.fields.js
Readers.Majsmob = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajsmob",keys:["mobilita"],[columns]:["mobilita","mobilita_txt","mobilita_zkr","aktivita_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majsmob.inheritsFrom(ReadersBase);
Fields.majsmob = (prefabOptions) => { return {data:new Readers.Majsmob(),[itemTemplate]:"{mobilita_txt}",[helperColumns]:["mobilita_txt", "mobilita_zkr"],[helperItemTemplate]:function (row) {

		var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.mobilita_txt);

		var moreInfo = Gordic.Prefabs.Utils.getFormatedLabeledString(
			{
				"jres:24532011": row.mobilita, 				"jres:24532028": row.mobilita_zkr 			}
		);

		return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.majsmob(),prefabOptions,options)).show()};};
Selectors.majsmob = () => { return {data:new Readers.Majsmob(),[title]:"jres:24532086",[userSettings]:usRoot+"majsmob",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["mobilita_txt", "mobilita_zkr"]},[gridFormat]:newGridFormat().addNumberColumn({name: "mobilita", caption: "jres:24532086", width: 15, forced: true}).addTextColumn({name: "mobilita_zkr", caption: "jres:24532028", width: 15}).addTextColumn({name: "mobilita_txt", caption: "jres:24532008", width: 55}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 15})};};

// Gordic.Maj.Client.GReaderMajspoh.fields.js
Readers.Majspoh = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajspoh",keys:["kod_poh","typ_dok","dev"],[columns]:["kod_poh","typ_dok","dev","typ_dok_zkr","dev_zkr","storno_poh_zkr","nazev","kod_poh_anti_txt","typ_dok_anti_txt","storno_poh","nks_cil","priz_ps","druh_poh","druh_poh_zkr","id_poh","id_poh_anti"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majspoh.inheritsFrom(ReadersBase);
Fields.majspoh = (prefabOptions) => { return {data:new Readers.Majspoh(),[itemTemplate]:"{kod_poh}",[helperColumns]:["kod_poh", "nazev"],[helperItemTemplate]:"<b>{kod_poh}</b> | Typ: <b>{typ_dok_zkr:trim:encode}</b> | DEV: <b>{dev_zkr:trim:encode}</b> | {nazev:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.majspoh(),prefabOptions,options)).show()};};
Selectors.majspoh = () => { return {data:new Readers.Majspoh(),[title]:"jres:24532030",[userSettings]:usRoot+"majspoh",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["kod_poh", "nazev"]},[gridFormat]:newGridFormat().addNumberColumn({name: "kod_poh", caption: "jres:24532011", width: 30, forced: true}).addTextColumn({name: "typ_dok_zkr", caption: "jres:24532012", width: 36}).addTextColumn({name: "dev_zkr", caption: "jres:24532013", width: 36}).addTextColumn({name: "storno_poh_zkr", caption: "jres:24532029", width: 40}).addTextColumn({name: "nazev", caption: "jres:24532008", width: 200}).addTextColumn({name: "kod_poh_anti_txt", caption: "jres:24532123", width: 36}).addTextColumn({name: "typ_dok_anti_txt", caption: "jres:24532125", width: 36}).addTextColumn({name: "nks_cil", caption: "jres:24532044", width: 50}).addNumberColumn({name: "priz_ps", caption: "jres:24532127", width: 50}).addTextColumn({name: "druh_poh_zkr", caption: "jres:24532129", width: 36})};};

// Gordic.Maj.Client.GReaderMajsrip.fields.js
Readers.Majsrip = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajsrip",keys:["riziko_por"],[columns]:["riziko_por","riziko_por_txt","riziko_por_zkr","aktivita_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majsrip.inheritsFrom(ReadersBase);
Fields.majsrip = (prefabOptions) => { return {data:new Readers.Majsrip(),[itemTemplate]:"{riziko_por_txt}",[helperColumns]:["riziko_por_txt", "riziko_por_zkr"],[helperItemTemplate]:function (row) {

		var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.riziko_por_txt);

		var moreInfo = Gordic.Prefabs.Utils.getFormatedLabeledString(
			{
				"jres:24532011": row.riziko_por, 				"jres:24532028": row.riziko_por_zkr 			}
		);

		return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.majsrip(),prefabOptions,options)).show()};};
Selectors.majsrip = () => { return {data:new Readers.Majsrip(),[title]:"jres:24532089",[userSettings]:usRoot+"majsrip",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["riziko_por_txt", "riziko_por_zkr"]},[gridFormat]:newGridFormat().addNumberColumn({name: "riziko_por", caption: "jres:24532089", width: 15, forced: true}).addTextColumn({name: "riziko_por_zkr", caption: "jres:24532028", width: 10}).addTextColumn({name: "riziko_por_txt", caption: "jres:24532008", width: 60}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 15})};};

// Gordic.Maj.Client.GReaderMajsskm.fields.js
Readers.Majsskm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajsskm",keys:["skupina_id"],[columns]:["skupina_id", "skupina_txt", "skupina_zkr", "mode_odp", "mode_odp_txt", "skupina_typ", "skupina_typ_zkr", "typ_dm", "typ_dm_zkr", "s_unique", "s_prodej", "s_prodej_txt", "aktivita", "aktivita_txt", "k_v", "typ_pristup"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majsskm.inheritsFrom(ReadersBase);
Fields.majsskm = (prefabOptions) => { return {data:new Readers.Majsskm(),[itemTemplate]:"{skupina_zkr}",[helperColumns]:["skupina_zkr", "skupina_txt"],[helperItemTemplate]:function (row) {
		return Gordic.Prefabs.Utils.getSimpleInfoString(row.skupina_zkr, row.skupina_txt, "fb");
	},[itemTooltipTemplate]:"{skupina_txt:trim:encode}",[selector]:(options) => newDefaultSelector($.extend(Selectors.majsskm(),prefabOptions,options)).show()};};
Selectors.majsskm = () => { return {data:new Readers.Majsskm(),[title]:"jres:24532070",[userSettings]:usRoot+"majsskm",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["skupina_zkr", "skupina_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "skupina_id", caption: "jres:24532063", width: 25, forced: true}).addTextColumn({name: "skupina_txt", caption: "jres:24532023", width: 120}).addTextColumn({name: "skupina_zkr", caption: "jres:24532064", width: 40}).addTextColumn({name: "mode_odp_txt", caption: "jres:24532065", width: 30}).addTextColumn({name: "skupina_typ_zkr", caption: "jres:24532012", width: 25}).addTextColumn({name: "typ_dm_zkr", caption: "jres:24532067", width: 40}).addNumberColumn({name: "s_unique", caption: "jres:24532068", width: 35}).addTextColumn({name: "s_prodej_txt", caption: "jres:24532066", width: 55}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 40}).addNumberColumn({name: "k_v", caption: "jres:24532069", width: 40})};};

// Gordic.Maj.Client.GReaderMajsstp.fields.js
Readers.Majsstp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajsstp",keys:["prev_stav"],[columns]:["prev_stav","prev_stav_txt","prev_stav_zkr","aktivita_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majsstp.inheritsFrom(ReadersBase);
Fields.majsstp = (prefabOptions) => { return {data:new Readers.Majsstp(),[itemTemplate]:"{prev_stav_txt}",[helperColumns]:["prev_stav_txt", "prev_stav_zkr"],[helperItemTemplate]:function (row) {

		var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.prev_stav_txt);

		var moreInfo = Gordic.Prefabs.Utils.getFormatedLabeledString(
			{
				"jres:24532011": row.prev_stav, 				"jres:24532028": row.prev_stav_zkr 			}
		);

		return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.majsstp(),prefabOptions,options)).show()};};
Selectors.majsstp = () => { return {data:new Readers.Majsstp(),[title]:"jres:24532084",[userSettings]:usRoot+"majsstp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["prev_stav_txt", "prev_stav_zkr"]},[gridFormat]:newGridFormat().addNumberColumn({name: "prev_stav", caption: "jres:24532085", width: 10, forced: true}).addTextColumn({name: "prev_stav_zkr", caption: "jres:24532028", width: 15}).addTextColumn({name: "prev_stav_txt", caption: "jres:24532008", width: 60}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 15})};};

// Gordic.Maj.Client.GReaderMajstod.fields.js
Readers.Majstod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajstod",keys:["typ_odp","rok_start_typ"],[columns]:["typ_odp", "rok_start_typ", "rok_stop_typ", "zkratka", "nazev", "def_odp", "def_odp_zkr", "dan_def", "dan_def_zkr", "pocet_odp", "aktivita_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majstod.inheritsFrom(ReadersBase);
Fields.majstod = (prefabOptions) => { return {data:new Readers.Majstod(),[itemTemplate]:"{zkratka}",[helperColumns]:["zkratka", "nazev", "rok_start_typ", "rok_stop_typ"],[helperItemTemplate]:function (row) {

        var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.zkratka);
        
        var moreInfo = Gordic.Prefabs.Utils.getSimpleInfoString(
            row.nazev,
            "jres:24532115" + ": " + row.rok_start_typ + "-" + row.rok_stop_typ,                     );

        return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.majstod(),prefabOptions,options)).show()};};
Selectors.majstod = () => { return {data:new Readers.Majstod(),[title]:"jres:24532054",[userSettings]:usRoot+"majstod",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["zkratka", "nazev", "rok_start_typ", "rok_stop_typ"]},[gridFormat]:newGridFormat().addNumberColumn({name: "typ_odp", caption: "jres:24532055", width: 20, forced: true}).addNumberColumn({name: "rok_start_typ", caption: "jres:24532056", width: 35}).addNumberColumn({name: "rok_stop_typ", caption: "jres:24532057", width: 35}).addTextColumn({name: "zkratka", caption: "jres:24532028", width: 45}).addTextColumn({name: "nazev", caption: "jres:24532008", width: 100}).addTextColumn({name: "def_odp_zkr", caption: "jres:24532058", width: 50}).addTextColumn({name: "dan_def_zkr", caption: "jres:24532059", width: 30}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 45})};};

// Gordic.Maj.Client.GReaderMajstrb.fields.js
Readers.Majstrb = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajstrb",keys:["trida_bezp"],[columns]:["trida_bezp","trida_bezp_txt","trida_bezp_zkr","aktivita_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majstrb.inheritsFrom(ReadersBase);
Fields.majstrb = (prefabOptions) => { return {data:new Readers.Majstrb(),[itemTemplate]:"{trida_bezp_txt}",[helperColumns]:["trida_bezp_txt", "trida_bezp_zkr"],[helperItemTemplate]:function (row) {

		var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.trida_bezp_txt);

		var moreInfo = Gordic.Prefabs.Utils.getFormatedLabeledString(
			{
				"jres:24532011": row.trida_bezp, 				"jres:24532028": row.trida_bezp_zkr 			}
		);

		return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.majstrb(),prefabOptions,options)).show()};};
Selectors.majstrb = () => { return {data:new Readers.Majstrb(),[title]:"jres:24532087",[userSettings]:usRoot+"majstrb",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["trida_bezp_txt", "trida_bezp_zkr"]},[gridFormat]:newGridFormat().addNumberColumn({name: "trida_bezp", caption: "jres:24532088", width: 15, forced: true}).addTextColumn({name: "trida_bezp_zkr", caption: "jres:24532028", width: 15}).addTextColumn({name: "trida_bezp_txt", caption: "jres:24532008", width: 55}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 15})};};

// Gordic.Maj.Client.GReaderMajstri.fields.js
Readers.Majstri = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajstri",keys:["trida"],[columns]:["trida","nazev","ico","nks_komp","dat_zmena","zmenu_prov","aktivita","aktivita_txt","hs_nks"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majstri.inheritsFrom(ReadersBase);
Fields.majstri = (prefabOptions) => { return {data:new Readers.Majstri(),[itemTemplate]:"{trida}",[helperColumns]:["trida", "nazev"],[helperItemTemplate]:function (row) {

        var infoStr = Gordic.Prefabs.Utils.getSimpleInfoString(row.trida);        
        var moreInfo = Gordic.Prefabs.Utils.getSimpleInfoString(row.nazev);
           
        return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": infoStr, "more": moreInfo });
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.majstri(),prefabOptions,options)).show()};};
Selectors.majstri = () => { return {data:new Readers.Majstri(),[title]:"jres:24532034",[userSettings]:usRoot+"majstri",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["trida", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "trida", caption: "jres:24532033", width: 40, forced: true}).addTextColumn({name: "nazev", caption: "jres:24532008", width: 150}).addTextColumn({name: "nks_komp", caption: "jres:24532074", width: 60}).addTextColumn({name: "aktivita_txt", caption: "jres:24532010", width: 50})};};

// Gordic.Maj.Client.GReaderMajsuea.fields.js
Readers.Majsuea = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajsuea",keys:["drh_id","dev","uea","ueb","ixs_vue"],[columns]:["drh_id","drh_zkr","dev","dev_zkr","uea","ueb","ixs_vue","ueab_xxx","popis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majsuea.inheritsFrom(ReadersBase);
Fields.majsuea = (prefabOptions) => { return {data:new Readers.Majsuea(),[itemTemplate]:"{ueab_xxx:trim:encode}",[helperColumns]:["ueab_xxx", "drh_zkr"],[helperItemTemplate]:function (row) {
        var moreInfo = Gordic.Prefabs.Utils.getFormatedLabeledString(
            {
                "jres:24532118": row.drh_zkr,                  "jres:24532013": row.dev_zkr,                 "jres:24532020": row.uea             });
        return Gordic.Prefabs.Utils.getInfoStr({ "info": row.ueab_xxx, "more": moreInfo });
    },[selector]:(options) => newDefaultSelector($.extend(Selectors.majsuea(),prefabOptions,options)).show()};};
Selectors.majsuea = () => { return {data:new Readers.Majsuea(),[title]:"jres:24532024",[userSettings]:usRoot+"majsuea",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ueab_xxx", "drh_zkr"]},[gridFormat]:newGridFormat().addTextColumn({name: "drh_zkr", caption: "jres:24532019", width: 80, forced: true}).addTextColumn({name: "dev_zkr", caption: "jres:24532013", width: 30}).addTextColumn({name: "uea", caption: "jres:24532020", width: 40}).addTextColumn({name: "ueb", caption: "jres:24532021", width: 40}).addTextColumn({name: "ueab_xxx", caption: "jres:24532022", width: 80}).addTextColumn({name: "popis", caption: "jres:24532023", width: 200})};};

// Gordic.Maj.Client.GReaderSrvscia.fields.js
Readers.Srvscia = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSrvscia",keys:["rok","ico","cislo"],[columns]:["rok","ico","cislo","nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Srvscia.inheritsFrom(ReadersBase);
Fields.srvscia = (prefabOptions) => { return {data:new Readers.Srvscia(),[itemTemplate]:"{cislo:trim:encode}",[helperColumns]:["cislo", "nazev"],[helperItemTemplate]:"<b>{cislo:trim:encode}</b> - {nazev:trim:encode}"};};

// GReaderEkosdpr.fields.js
Readers.Ekosdpr = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosdpr",keys:["rez_dph","rokmes_od"],[columns]:["rez_dph", "rokmes_od", "rokmes_do", "zj", "rez_dph_zkr", "rez_dph_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekosdpr.inheritsFrom(ReadersBase);
Fields.ekosdpr = (prefabOptions) => { return {data:new Readers.Ekosdpr(),[itemTemplate]:"{rez_dph_txt:trim:encode}",[helperColumns]:["rez_dph", "rokmes_od", "rokmes_do", "zj", "rez_dph_zkr", "rez_dph_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosdpr(),prefabOptions,options)).show()};};
Selectors.ekosdpr = () => { return {data:new Readers.Ekosdpr(),[userSettings]:usRoot+"ekosdpr",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["rez_dph", "rokmes_od", "rokmes_do", "zj", "rez_dph_zkr", "rez_dph_txt"]},[gridFormat]:newGridFormat().addNumberColumn({name: "rez_dph", caption: "jres:26850004", width: 150, forced: true}).addTextColumn({name: "rokmes_od", caption: "jres:26850005", width: 300}).addTextColumn({name: "rokmes_do", caption: "jres:26850006", width: 300}).addTextColumn({name: "zj", caption: "jres:26850007", width: 300}).addTextColumn({name: "rez_dph_zkr", caption: "jres:26850008", width: 300}).addTextColumn({name: "rez_dph_txt", caption: "jres:26850009", width: 300})};};

// GReaderMajcaod.fields.js
Readers.Majcaod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajcaod",keys:["def_odp"],[columns]:["def_odp", "zkratka", "nazev", "k_v", "aktivita", "dan_def"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majcaod.inheritsFrom(ReadersBase);
Fields.majcaod = (prefabOptions) => { return {data:new Readers.Majcaod(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["def_odp", "zkratka", "nazev", "k_v", "aktivita", "dan_def"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majcaod(),prefabOptions,options)).show()};};
Selectors.majcaod = () => { return {data:new Readers.Majcaod(),[userSettings]:usRoot+"majcaod",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["def_odp", "zkratka", "nazev", "k_v", "aktivita", "dan_def"]},[gridFormat]:newGridFormat().addTextColumn({name: "zkratka", caption: "jres:26850014", width: 300, forced: true}).addTextColumn({name: "nazev", caption: "jres:26850009", width: 300})};};

// GReaderMajceod.fields.js
Readers.Majceod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajceod",keys:["priz_odp"],[columns]:["priz_odp", "priz_odp_txt", "priz_odp_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majceod.inheritsFrom(ReadersBase);
Fields.majceod = (prefabOptions) => { return {data:new Readers.Majceod(),[itemTemplate]:"{priz_odp_txt:trim:encode}",[helperColumns]:["priz_odp", "priz_odp_txt", "priz_odp_zkr", "k_v", "k_s", "k_xml"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majceod(),prefabOptions,options)).show()};};
Selectors.majceod = () => { return {data:new Readers.Majceod(),[userSettings]:usRoot+"majceod",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["priz_odp", "priz_odp_txt", "priz_odp_zkr", "k_v", "k_s", "k_xml"]},[gridFormat]:newGridFormat().addNumberColumn({name: "priz_odp", caption: "jres:26850033", width: 150, forced: true}).addTextColumn({name: "priz_odp_txt", caption: "jres:26850009", width: 300}).addTextColumn({name: "priz_odp_zkr", caption: "jres:26850014", width: 300}).addNumberColumn({name: "k_v", caption: "jres:26850025", width: 150}).addTextColumn({name: "k_s", caption: "jres:26850026", width: 300}).addTextColumn({name: "k_xml", caption: "jres:26850034", width: 300})};};

// GReaderMajciod.fields.js
Readers.Majciod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajciod",keys:["interval_odp"],[columns]:["interval_odp", "interval_odp_txt", "interval_odp_zkr", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majciod.inheritsFrom(ReadersBase);
Fields.majciod = (prefabOptions) => { return {data:new Readers.Majciod(),[itemTemplate]:"{interval_odp_txt:trim:encode}",[helperColumns]:["interval_odp", "interval_odp_txt", "interval_odp_zkr", "k_v", "k_s"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majciod(),prefabOptions,options)).show()};};
Selectors.majciod = () => { return {data:new Readers.Majciod(),[userSettings]:usRoot+"majciod",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["interval_odp", "interval_odp_txt", "interval_odp_zkr", "k_v", "k_s"]},[gridFormat]:newGridFormat().addNumberColumn({name: "interval_odp", caption: "jres:26850024", width: 150, forced: true}).addTextColumn({name: "interval_odp_txt", caption: "jres:26850009", width: 300}).addTextColumn({name: "interval_odp_zkr", caption: "jres:26850014", width: 300}).addNumberColumn({name: "k_v", caption: "jres:26850025", width: 150}).addTextColumn({name: "k_s", caption: "jres:26850026", width: 300})};};

// GReaderMajcktp.fields.js
Readers.Majcktp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajcktp",keys:["ktg_pri"],[columns]:["ktg_pri", "ktg_pri_txt", "ktg_pri_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majcktp.inheritsFrom(ReadersBase);
Fields.majcktp = (prefabOptions) => { return {data:new Readers.Majcktp(),[itemTemplate]:"{ktg_pri_zkr} - {ktg_pri_txt:trim:encode}",[helperColumns]:["ktg_pri_zkr", "ktg_pri_txt", "ktg_pri_zkr"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majcktp(),prefabOptions,options)).show()};};
Selectors.majcktp = () => { return {data:new Readers.Majcktp(),[userSettings]:usRoot+"majcktp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ktg_pri_zkr", "ktg_pri_txt", "ktg_pri_zkr"]},[gridFormat]:newGridFormat().addNumberColumn({name: "ktg_pri", caption: "jres:26850010", width: 150, forced: true}).addTextColumn({name: "ktg_pri_txt", caption: "jres:26850009", width: 300}).addTextColumn({name: "ktg_pri_zkr", caption: "jres:26850008", width: 300})};};

// GReaderMajcosm.fields.js
Readers.Majcosm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajcosm",keys:["skupina_odp"],[columns]:["skupina_odp", "doba_odp", "aktivita", "k_v", "k_s", "doba_opr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majcosm.inheritsFrom(ReadersBase);
Fields.majcosm = (prefabOptions) => { return {data:new Readers.Majcosm(),[itemTemplate]:"{:trim:encode}",[helperColumns]:["skupina_odp", "doba_odp", "aktivita", "k_v", "k_s", "doba_opr"]};};

// GReaderMajcpod.fields.js
Readers.Majcpod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajcpod",keys:["odpis_pomer"],[columns]:["odpis_pomer", "odpis_pomer_txt", "odpis_pomer_zkr", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majcpod.inheritsFrom(ReadersBase);
Fields.majcpod = (prefabOptions) => { return {data:new Readers.Majcpod(),[itemTemplate]:"{odpis_pomer_txt:trim:encode}",[helperColumns]:["odpis_pomer", "odpis_pomer_txt", "odpis_pomer_zkr", "k_v", "k_s"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majcpod(),prefabOptions,options)).show()};};
Selectors.majcpod = () => { return {data:new Readers.Majcpod(),[userSettings]:usRoot+"majcpod",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["odpis_pomer", "odpis_pomer_txt", "odpis_pomer_zkr", "k_v", "k_s"]},[gridFormat]:newGridFormat().addNumberColumn({name: "odpis_pomer", caption: "jres:26850029", width: 150, forced: true}).addTextColumn({name: "odpis_pomer_txt", caption: "jres:26850009", width: 300}).addTextColumn({name: "odpis_pomer_zkr", caption: "jres:26850014", width: 300}).addNumberColumn({name: "k_v", caption: "jres:26850025", width: 150}).addTextColumn({name: "k_s", caption: "jres:26850026", width: 300})};};

// GReaderMajcsod.fields.js
Readers.Majcsod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajcsod",keys:["start_odp"],[columns]:["start_odp", "start_odp_txt", "start_odp_zkr", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majcsod.inheritsFrom(ReadersBase);
Fields.majcsod = (prefabOptions) => { return {data:new Readers.Majcsod(),[itemTemplate]:"{start_odp_txt:trim:encode}",[helperColumns]:["start_odp", "start_odp_txt", "start_odp_zkr", "k_v", "k_s"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majcsod(),prefabOptions,options)).show()};};
Selectors.majcsod = () => { return {data:new Readers.Majcsod(),[userSettings]:usRoot+"majcsod",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["start_odp", "start_odp_txt", "start_odp_zkr", "k_v", "k_s"]},[gridFormat]:newGridFormat().addNumberColumn({name: "start_odp", caption: "jres:26850028", width: 150, forced: true}).addTextColumn({name: "start_odp_txt", caption: "jres:26850009", width: 300}).addTextColumn({name: "start_odp_zkr", caption: "jres:26850014", width: 300}).addNumberColumn({name: "k_v", caption: "jres:26850025", width: 150}).addTextColumn({name: "k_s", caption: "jres:26850026", width: 300})};};

// GReaderMajctdm.fields.js
Readers.Majctdm = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajctdm",keys:["typ_dm"],[columns]:["typ_dm", "typ_dm_txt", "typ_dm_zkr", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majctdm.inheritsFrom(ReadersBase);
Fields.majctdm = (prefabOptions) => { return {data:new Readers.Majctdm(),[itemTemplate]:"{typ_dm} - {typ_dm_txt:trim:encode}",[helperColumns]:["typ_dm", "typ_dm_txt", "typ_dm_zkr", "k_v", "k_s"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majctdm(),prefabOptions,options)).show()};};
Selectors.majctdm = () => { return {data:new Readers.Majctdm(),[userSettings]:usRoot+"majctdm",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_dm", "typ_dm_txt", "typ_dm_zkr", "k_v", "k_s"]},[gridFormat]:newGridFormat().addNumberColumn({name: "typ_dm", caption: "jres:26850015", width: 100, forced: true}).addTextColumn({name: "typ_dm_txt", caption: "jres:26850013", width: 300}).addTextColumn({name: "typ_dm_zkr", caption: "jres:26850014", width: 300})};};

// GReaderMajctod.fields.js
Readers.Majctod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajctod",keys:["odp_12_month"],[columns]:["odp_12_month", "odp_12_month_txt", "odp_12_month_zkr", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majctod.inheritsFrom(ReadersBase);
Fields.majctod = (prefabOptions) => { return {data:new Readers.Majctod(),[itemTemplate]:"{odp_12_month_txt:trim:encode}",[helperColumns]:["odp_12_month", "odp_12_month_txt", "odp_12_month_zkr", "k_v", "k_s"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majctod(),prefabOptions,options)).show()};};
Selectors.majctod = () => { return {data:new Readers.Majctod(),[userSettings]:usRoot+"majctod",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["odp_12_month", "odp_12_month_txt", "odp_12_month_zkr", "k_v", "k_s"]},[gridFormat]:newGridFormat().addNumberColumn({name: "odp_12_month", caption: "jres:26850030", width: 150, forced: true}).addTextColumn({name: "odp_12_month_txt", caption: "jres:26850009", width: 300}).addTextColumn({name: "odp_12_month_zkr", caption: "jres:26850014", width: 300}).addNumberColumn({name: "k_v", caption: "jres:26850025", width: 150}).addTextColumn({name: "k_s", caption: "jres:26850026", width: 300})};};

// GReaderMajctrp.fields.js
Readers.Majctrp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajctrp",keys:["typ_rp"],[columns]:["typ_rp", "typ_rp_txt", "typ_rp_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majctrp.inheritsFrom(ReadersBase);
Fields.majctrp = (prefabOptions) => { return {data:new Readers.Majctrp(),[itemTemplate]:"{typ_rp} - {typ_rp_txt:trim:encode}",[helperColumns]:["typ_rp", "typ_rp_txt", "typ_rp_zkr"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majctrp(),prefabOptions,options)).show()};};
Selectors.majctrp = () => { return {data:new Readers.Majctrp(),[userSettings]:usRoot+"majctrp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_rp", "typ_rp_txt", "typ_rp_zkr"]},[gridFormat]:newGridFormat().addNumberColumn({name: "typ_rp", caption: "jres:26850002", width: 150, forced: true}).addTextColumn({name: "typ_rp_txt", caption: "jres:26850001", width: 300}).addTextColumn({name: "typ_rp_zkr", caption: "jres:26850003", width: 300})};};

// GReaderMajctsk.fields.js
Readers.Majctsk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajctsk",keys:["skupina_typ"],[columns]:["skupina_typ", "skupina_typ_txt", "skupina_typ_zkr", "k_v", "k_s", "k_xml"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majctsk.inheritsFrom(ReadersBase);
Fields.majctsk = (prefabOptions) => { return {data:new Readers.Majctsk(),[itemTemplate]:"{skupina_typ} - {skupina_typ_txt:trim:encode}",[helperColumns]:["skupina_typ", "skupina_typ_txt", "skupina_typ_zkr", "k_v", "k_s", "k_xml"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majctsk(),prefabOptions,options)).show()};};
Selectors.majctsk = () => { return {data:new Readers.Majctsk(),[userSettings]:usRoot+"majctsk",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["skupina_typ", "skupina_typ_txt", "skupina_typ_zkr", "k_v", "k_s", "k_xml"]},[gridFormat]:newGridFormat().addNumberColumn({name: "skupina_typ", caption: "jres:26850012", width: 150, forced: true}).addTextColumn({name: "skupina_typ_txt", caption: "jres:26850013", width: 300}).addTextColumn({name: "skupina_typ_zkr", caption: "jres:26850014", width: 300})};};

// GReaderMajctvp.fields.js
Readers.Majctvp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajctvp",keys:["typ_vyp_pri"],[columns]:["typ_vyp_pri", "typ_vyp_pri_txt", "typ_vyp_pri_zkr", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majctvp.inheritsFrom(ReadersBase);
Fields.majctvp = (prefabOptions) => { return {data:new Readers.Majctvp(),[itemTemplate]:"{typ_vyp_pri_zkr} - {typ_vyp_pri_txt:trim:encode}",[helperColumns]:["typ_vyp_pri", "typ_vyp_pri_txt", "typ_vyp_pri_zkr", "k_v", "k_s"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majctvp(),prefabOptions,options)).show()};};
Selectors.majctvp = () => { return {data:new Readers.Majctvp(),[userSettings]:usRoot+"majctvp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_vyp_pri", "typ_vyp_pri_txt", "typ_vyp_pri_zkr", "k_v", "k_s"]},[gridFormat]:newGridFormat().addNumberColumn({name: "typ_vyp_pri", caption: "jres:26850011", width: 150, forced: true}).addTextColumn({name: "typ_vyp_pri_txt", caption: "jres:26850009", width: 300}).addTextColumn({name: "typ_vyp_pri_zkr", caption: "jres:26850008", width: 300})};};

// GReaderMajcudp.fields.js
Readers.Majcudp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajcudp",keys:["dph_pri"],[columns]:["dph_pri", "dph_pri_txt", "dph_pri_zkr", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majcudp.inheritsFrom(ReadersBase);
Fields.majcudp = (prefabOptions) => { return {data:new Readers.Majcudp(),[itemTemplate]:"{dph_pri_zkr} - {dph_pri_txt:trim:encode}",[helperColumns]:["dph_pri", "dph_pri_txt", "dph_pri_zkr", "k_v", "k_s"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majcudp(),prefabOptions,options)).show()};};
Selectors.majcudp = () => { return {data:new Readers.Majcudp(),[userSettings]:usRoot+"majcudp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["dph_pri", "dph_pri_txt", "dph_pri_zkr", "k_v", "k_s"]},[gridFormat]:newGridFormat().addNumberColumn({name: "dph_pri", caption: "jres:26850011", width: 150, forced: true}).addTextColumn({name: "dph_pri_txt", caption: "jres:26850009", width: 300}).addTextColumn({name: "dph_pri_zkr", caption: "jres:26850008", width: 300})};};

// GReaderMajcvod.fields.js
Readers.Majcvod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajcvod",keys:["odp_vyr_m"],[columns]:["odp_vyr_m", "odp_vyr_m_txt", "odp_vyr_m_zkr", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majcvod.inheritsFrom(ReadersBase);
Fields.majcvod = (prefabOptions) => { return {data:new Readers.Majcvod(),[itemTemplate]:"{odp_vyr_m_txt:trim:encode}",[helperColumns]:["odp_vyr_m", "odp_vyr_m_txt", "odp_vyr_m_zkr", "k_v", "k_s"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majcvod(),prefabOptions,options)).show()};};
Selectors.majcvod = () => { return {data:new Readers.Majcvod(),[userSettings]:usRoot+"majcvod",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["odp_vyr_m", "odp_vyr_m_txt", "odp_vyr_m_zkr", "k_v", "k_s"]},[gridFormat]:newGridFormat().addNumberColumn({name: "odp_vyr_m", caption: "jres:26850032", width: 150, forced: true}).addTextColumn({name: "odp_vyr_m_txt", caption: "jres:26850009", width: 300}).addTextColumn({name: "odp_vyr_m_zkr", caption: "jres:26850014", width: 300}).addNumberColumn({name: "k_v", caption: "jres:26850025", width: 150}).addTextColumn({name: "k_s", caption: "jres:26850026", width: 300})};};

// GReaderMajcxod.fields.js
Readers.Majcxod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajcxod",keys:["presnost_odp"],[columns]:["presnost_odp", "presnost_odp_txt", "presnost_odp_zkr", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majcxod.inheritsFrom(ReadersBase);
Fields.majcxod = (prefabOptions) => { return {data:new Readers.Majcxod(),[itemTemplate]:"{presnost_odp_txt:trim:encode}",[helperColumns]:["presnost_odp", "presnost_odp_txt", "presnost_odp_zkr", "k_v", "k_s"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majcxod(),prefabOptions,options)).show()};};
Selectors.majcxod = () => { return {data:new Readers.Majcxod(),[userSettings]:usRoot+"majcxod",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["presnost_odp", "presnost_odp_txt", "presnost_odp_zkr", "k_v", "k_s"]},[gridFormat]:newGridFormat().addNumberColumn({name: "presnost_odp", caption: "jres:26850031", width: 150, forced: true}).addTextColumn({name: "presnost_odp_txt", caption: "jres:26850009", width: 300}).addTextColumn({name: "presnost_odp_zkr", caption: "jres:26850014", width: 300}).addNumberColumn({name: "k_v", caption: "jres:26850025", width: 150}).addTextColumn({name: "k_s", caption: "jres:26850026", width: 300})};};

// GReaderMajczod.fields.js
Readers.Majczod = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajczod",keys:["typ_round"],[columns]:["typ_round", "typ_round_txt", "typ_round_zkr", "k_v", "k_s"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majczod.inheritsFrom(ReadersBase);
Fields.majczod = (prefabOptions) => { return {data:new Readers.Majczod(),[itemTemplate]:"{typ_round_txt:trim:encode}",[helperColumns]:["typ_round", "typ_round_txt", "typ_round_zkr", "k_v", "k_s"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majczod(),prefabOptions,options)).show()};};
Selectors.majczod = () => { return {data:new Readers.Majczod(),[userSettings]:usRoot+"majczod",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_round", "typ_round_txt", "typ_round_zkr", "k_v", "k_s"]},[gridFormat]:newGridFormat().addNumberColumn({name: "typ_round", caption: "jres:26850027", width: 150, forced: true}).addTextColumn({name: "typ_round_txt", caption: "jres:26850009", width: 300}).addTextColumn({name: "typ_round_zkr", caption: "jres:26850014", width: 300}).addNumberColumn({name: "k_v", caption: "jres:26850025", width: 150}).addTextColumn({name: "k_s", caption: "jres:26850026", width: 300})};};

// GReaderMajsvue.fields.js
Readers.Majsvue = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajsvue",keys:["ixs_vue"],[columns]:["ixs_vue", "aktivita", "nazev", "poznamka", "dat_od", "dat_do", "dat_zmena", "zmenu_prov"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Majsvue.inheritsFrom(ReadersBase);
Fields.majsvue = (prefabOptions) => { return {data:new Readers.Majsvue(),[itemTemplate]:"{nazev:trim:encode}",[helperColumns]:["ixs_vue", "aktivita", "nazev", "poznamka", "dat_od", "dat_do", "dat_zmena", "zmenu_prov"],[dropdown]:true,[selector]:(options) => newDefaultSelector($.extend(Selectors.majsvue(),prefabOptions,options)).show()};};
Selectors.majsvue = () => { return {data:new Readers.Majsvue(),[userSettings]:usRoot+"majsvue",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixs_vue", "aktivita", "nazev", "poznamka", "dat_od", "dat_do", "dat_zmena", "zmenu_prov"]},[gridFormat]:newGridFormat().addTextColumn({name: "ixs_vue", caption: "jres:26850017", width: 300, forced: true}).addNumberColumn({name: "aktivita", caption: "jres:26850018", width: 150}).addTextColumn({name: "nazev", caption: "jres:26850019", width: 300}).addTextColumn({name: "poznamka", caption: "jres:26850020", width: 300}).addDateColumn({name: "dat_od", caption: "jres:26850021", width: 150}).addDateColumn({name: "dat_do", caption: "jres:26850022", width: 150})};};

//INCLUDE KlasifikaceSkupina.fields.js
Selectors.KlasifikaceSkupina = CreateClass(Selectors.BaseSelector, {
  _fieldSettings: {},

  _constructor: function (options) {
    this._base({ content: Gordic.Maj.GKlasifikaceSkupina, data: null, });

    this._fieldSettings = {
      //mode: options.mode || 'maj',
      //multi: options.multi || false,
      //serverFilters: options.serverFilters,
      //canSelectEmpty: options.canSelectEmpty === false ? false : true,
      //inputDto: options.inputDto || {},
      //canNewAndRefund: options.canNewAndRefund || false,
      related: /*options.related ||*/ options.parentContent,
      //init: options.init || null,
      //esuLogovani: $.extend({
      //  // Ixp: 'testIxpVol2',
      //  // AktZnacka: 'aktZnacka',
      //  DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani, // vybrat z enumu
      //  DuvodHledaniTxt: this.isSmlSelect ? 'jres:31750007' : //RC 31750007 : Filtrace při výběru smlouvy/ objednávky/ jiného případu SML.
      //    'jres:31750008', //RC 31750008 : Filtrace při výběru položky smlouvy/ objednávky/ jiného případu SML.
      //}, (options.esuLogovani || {})),
      //smlSelectName: options.smlSelectName
    };
  },

  show: function (options) {
    options = $.extend({}, {
      width: 1200,
      height: 900,
      related: options.parent
    }, options);

    var def = $.Deferred();
    var gdlg = GDlg;
    if (this._fieldSettings.related) {
        gdlg = this._fieldSettings.related.dialogs;
    }
      var dlg = gdlg.showModalWindow([this.content, { uid: /*this._fieldSettings.mode === 'maj' ?*/ "majVyberKlasifikaceSkupina#" /*: "ekoVyberPolozkySmlouvy#"*/ }], this._fieldSettings, options);

    var gDlgContent = dlg.gcontent();

    dlg.on('close', function (ev, retVal) {
      dlg.remove(); // Bohous: kvuli inline dialogu - jinak se na chrome honi focus mezi polickem a bunkou v dialogu az spadne na stackoverflow
      if (gDlgContent.dialogResult !== undefined) {
        def.resolve(gDlgContent.dialogResult);
      } else {
        def.reject('jres:31750001'); //RC 31750001 : Uživatel zrušil nápovědu
      }
    });
    return def.promise();
  },
});

//namespace("Gordic.Prefabs.Select.ItemTemplates", {
//    ekoVyberPolozkySmlouvy: function (data) {

//        //if (data.isNew || data.rok_smlsden != null) { //pokud je rok_smlsden -> datovy zdroj byly smlouvy a ne polozky
//        //    return Gordic.Templates.ensureTemplate((data.ac_sml != null ? "{ac_sml}" : "---") + (data.rok_smlsden != null ? " {rok_smlsden} Nová položka" : " {rok} - Nová položka" )).render(data);
//        //} else {
//        //    return Gordic.Templates.ensureTemplate((data.ac_sml != null? "{ac_sml}" : "---") +" {rok} {cislo}").render(data);
//        //}
//        var ac_sml = (data.ac_sml && data.ac_sml.toString() || '').trim();
//        return ac_sml ? '{0}-{1}-{2}'.format(ac_sml,
//            data.rok_smlsden || data.rok || data.rokPol || data.rok_sml || '',
//            data.cislo || data.cislo_sml || ((data.isNew || ac_sml) ? 'jres:31750004' : '')) : ""; //RC 31750004 : Nová položka

//    }
//});

Fields.majKlasifikaceSkupina = function (userOptions) {
  //if (!userOptions || !(userOptions.parentContent || userOptions.related)) {
  //      throw new GError('majVyberKlasifikaceSkupina needs related option');
  //}
  //userOptions.related = userOptions.related || userOptions.parentContent

    //var result = Fields.smlapid();
    var result = Gordic.Prefabs.Select.ekoskla();
    //result = { data: null, itemTemplate: "{value}" };
    result.selector = function (options) {
        return new Selectors.KlasifikaceSkupina(/*($.extend({ mode: 'sml' }, */userOptions/*)*/, options).show({ parent: this });
    };
    result.itemTemplate = "{skp:trim:encode} - {nazev:trim:encode}"; //*/  (value) => { debugger;  return value.klasifikace.skp }; //trim kvůli informix, encode kvůli tomu, aby tam nikdo neposílal javascript - to to přechroupe
    //result.data = (d) => { debugger; }
    //var result = {
    //    //result.helperColumns.splice(1, 0, 'rok_smlsden');
    //    //result.filterMinLength = 2;
    //    data: Gordic.Prefabs.Select.E.Maj.Readers..CreateClass.e = new Readers.Smlapid2();
    //    selector: function (options) {
    //        return new Selectors.KlasifikaceSkupina(/*($.extend({ mode: 'sml' }, */userOptions/*)*/, options).show({ parent: this });
    //    };
    //}

  return result;
};


//Fields.majVyberKlasifikaceSkupina2 = function (userOptions) {

//  if (!userOptions || !(userOptions.parentContent || userOptions.related) ) {
//        throw new GError('ekoVyberPolozkySmlouvy needs related option');
//    }

//    userOptions.related = userOptions.related || userOptions.parentContent
//  var form = new Gordic.Forms.Form()
//    .addSection()
//    .addRow('jres:31750025') //RC 31750025 : Smlouva pro novou položku
//    .addField('gselectbox', { name: 'ac_sml', });

//    var currentOptions = userOptions; // $.extend({ mode: 'smlPol', }, userOptions);

//    return {

//      //modelValueTransform: {
//      //    collect: function (value) {
//      //        if (typeof value === "string") {
//      //            //const splitted = value.split(/- /);
//      //            //if (splitted.length == 3) 
//      //            //    return { ac_sml: splitted[0], rok: splitted[1], cislo: splitted[2] };
//      //            //else if (splitted.length <= 2)
//      //            //    return { ac_sml: splitted[0] || void 0, rok: splitted?.[1] || void 0, isNew: true };
//      //            //else
//      //            return null;
//      //        }
//      //        return value;
//      //    }
//      //},
//      itemTemplate: Gordic.Prefabs.Select.ItemTemplates.ekoVyberPolozkySmlouvy,
//      //function(data) {

//    //  //if (data.isNew || data.rok_smlsden != null) { //pokud je rok_smlsden -> datovy zdroj byly smlouvy a ne polozky
//    //  //    return Gordic.Templates.ensureTemplate((data.ac_sml != null ? "{ac_sml}" : "---") + (data.rok_smlsden != null ? " {rok_smlsden} Nová položka" : " {rok} - Nová položka" )).render(data);
//    //  //} else {
//    //  //    return Gordic.Templates.ensureTemplate((data.ac_sml != null? "{ac_sml}" : "---") +" {rok} {cislo}").render(data);
//    //  //}
//    //      var ac_sml = (data.ac_sml && data.ac_sml.toString() || '').trim();
//    //      return '{0}-{1}-{2}'.format(ac_sml,
//    //    data.rok_smlsden || data.rok || data.rokPol || '',
//    //          data.cislo || ((data.isNew || ac_sml) ? 'jres:31750004' : '')); //RC 31750004 : Nová položka

//    //},
//    helperCustomizer: function (data) {
//      if (currentOptions.canNewAndRefund &&
//          (data.length <= 0 || data.findIndex(function (it) { return it.isNew === true; }) < 0)) {
//        data.splice(0, 0, { isNew: true, });
//      }
//      return data;
//    },
//    helperChoice: function (data) {
//      var field = $(this);
//      if (data.isNew === true) {
//        var newUserOpts;
//        if (userOptions.newPolSelectOptions) {
//          newUserOpts = userOptions.newPolSelectOptions();
//        } else {
//          newUserOpts = $.extend({}, userOptions, {
//            init: function (inputDto, filters) {
//              if (userOptions.init) {
//                userOptions.init.apply(userOptions, arguments);
//              }
//              var filter;
//              if (filters.smluvni_pripady) {
//                for (var i = filters.smluvni_pripady.length - 1, ii = 0; i >= ii; i--) {
//                  filter = filters.smluvni_pripady[i];
//                  if (filter >= Gordic.Eko.GVyberSmlouvyPripadyEnum.SVyhovujiciPolozkou &&
//                    filter <= Gordic.Eko.GVyberSmlouvyPripadyEnum.ProVratku) {
//                    filters.smluvni_pripady.splice(i, 1);
//                  }
//                }
//              } else {
//                filters.smluvni_pripady = [];
//              }

//              filters.smluvni_pripady.push(Gordic.Eko.GVyberSmlouvyPripadyEnum.ProNovouPolozku);
//            },
//          });
//        }

//        var opts = $.extend({}, newUserOpts, { mode: 'sml', smlSelectName: 'jres:31750003', }); //RC 31750003 : Vybrat případ pro novou položku

//        new Selectors.EkoVyberSmlouvy(opts).show({ parent: this }).then(function (result) {
//          data.ixp = result.ixp_sml_pri;
//          data.rok = userOptions.inputDto && userOptions.inputDto.rokPol;
//          data.ac_sml = result.ac_sml;
//          field.gfield('setValue', data);
//        });
//        return false;
//      }
//      if(typeof data === "object")
//          field.gfield('setValue', data);

//      return data;
//    },
//    helperItemTemplate: function (data) {
//      // ( != null && data.nazev.trim().length > 0 ? "{nazev}: " : "") + (data.c != null ? "Částka: {c:number(C2)}" : "")
//      if (data.isNew === true) {
//        return '<b>jres:31750004</b>'; //RC 31750004 : Nová položka
//      }

//      var moreInfo = Gordic.Prefabs.Utils.getFormatedLabeledString({ 'jres:31750005': data.nazev && data.nazev.trim(), 'jres:31750006': data.c && data.c.toString().trim(), }); //RC 31750006 : Částka
//      var infoStr = '{0}-{1}-{2}'.format((data.ac_sml && data.ac_sml.toString() || '---').trim(), data.rok_smlsden || data.rok || data.rokPol || '', data.cislo || ''); // (data.ac_sml != null ? "{ac_sml}" : "---") + (data.rok_smlsden != null ? " {rok_smlsden}" : " {rok} {cislo}")
//      return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ 'info': infoStr, 'more': moreInfo, });

//      // pokud je rok_smlsden -> datovy zdroj byly smlouvy a ne polozky
//      // return Gordic.Templates.ensureTemplate( + " | " + ).render(data);
//    },
//    helperColumns: ['ac_sml', 'rok', 'cislo', 'ixp', 'nazev'],
//    data: function () {
//      var prepared = Gordic.Eko.GVyberSmlouvy.prepareInputDtoAndDefaultFilter(currentOptions);
//      var filterProm = Gordic.Eko.GVyberSmlouvy.prepareFilter(prepared.defaultFilter, currentOptions.serverFilters || {}, currentOptions.inputDto.prijmy ? currentOptions.inputDto.prijmy() : null);
//      return filterProm.then(function (filter) {
//        return userOptions.related.createServiceContent({
//          className: 'Gordic.Eko.WebClient.GVyberSmlouvy',
//          serverParams: { inputDto: prepared.inputDto, },
//        })
//          .call('LoadSmlPolDirect', {
//            filter: filter,
//          }).then(function (responseDto) {
//            return responseDto.data;
//          });
//      });
//    },
//    selector: function (options) {
//        return new Selectors.EkoVyberSmlouvy(currentOptions, options).show({parent: this});
//    },
//    // buttons: [{ name: "btnNewPol", action: new GAction({ name: "actNewPol", run: function () { } }), enabled: options.canNewAndRefund }],
//    // factors: [{ caption: "E", tooltip:"Existující", factor: 0}, { caption: "N", tooltip:"Nová", factor: 1 }],
//    //  factorChange: function (ev, ctx) { $(this).gfield("option", "data", ctx.factor === 0 ? new Readers.Smlspol() : new Readers.Smlapid2()); $(this).gfield("clear");},
//    // form: form,
//    // mode:"inlineimmediate"
//  };
//};


})(jQuery);

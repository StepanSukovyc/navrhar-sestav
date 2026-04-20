"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Adx.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const graphicInput = "graphicInput"; const dropdown = "dropdown"; const cached = "cached"; const selector = "selector"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const processOnStart = "processOnStart";

// GReaderAdeMzardac.fields.js
Readers.AdeMzardac = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeMzardac",keys:["ixp_den","subrada"],[columns]:["ixp_den", "subrada", "zkratka", "nazev", "akt_subrady", "ac_cislo_do", "ac_cislo_od", "ac_cislo_max", "mesic", "dat_zmena", "zmenu_prov", "ixs_su", "ixp_den_txt", "ucs", "ico"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeMzardac.inheritsFrom(ReadersBase);
Fields.adeMzardac = (prefabOptions) => { return {data:new Readers.AdeMzardac(),[itemTemplate]:"<b>{ixp_den_txt}</b> | jres:33000030: {ucs} | jres:33000029: {ico}",[helperColumns]:["ixp_den_txt"],[graphicInput]:"oninput"};};

// GReaderAdeRzardac.fields.js
Readers.AdeRzardac = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdeRzardac",keys:["ixp_den","subrada"],[columns]:["ixp_den", "subrada", "zkratka", "nazev", "akt_subrady", "ac_cislo_do", "ac_cislo_od", "ac_cislo_max", "mesic", "dat_zmena", "zmenu_prov", "ixs_su", "ixp_den_txt", "ucs", "ico"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdeRzardac.inheritsFrom(ReadersBase);
Fields.adeRzardac = (prefabOptions) => { return {data:new Readers.AdeRzardac(),[itemTemplate]:"<b>{ixp_den_txt}</b> | jres:33000030: {ucs} | jres:33000029: {ico}",[helperColumns]:["ixp_den_txt"],[graphicInput]:"oninput"};};

// GReaderAdxEkosobd.fields.js
Readers.AdxEkosobd = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdxEkosobd",keys:["rok"],[columns]:["rok","nazev","dat_od","dat_do","zkratka","aktivita","dat_zmena","zmenu_prov","apl_lock","ixs_roz_vlzr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdxEkosobd.inheritsFrom(ReadersBase);
Fields.adxEkosobd = (prefabOptions) => { return {data:new Readers.AdxEkosobd(),[itemTemplate]:function (data) {
		return `${data['rok']}`
	},[helperColumns]:["rok"],[graphicInput]:"oninput"};};

// GReaderAdxGincakt.fields.js
Readers.AdxGincakt = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdxGincakt",keys:["aktivita"],[columns]:["aktivita","aktivita_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdxGincakt.inheritsFrom(ReadersBase);
Fields.adxGincakt = (prefabOptions) => { return {data:new Readers.AdxGincakt(),[itemTemplate]:"{aktivita_txt}",[helperColumns]:["aktivita_txt", "aktivita"],[dropdown]:true};};

// GReaderAdxGincmis.fields.js
Readers.AdxGincmis = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdxGincmis",keys:["mistnost_druh"],[columns]:["mistnost_druh","mistnost_druh_txt","k_v","k_s"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdxGincmis.inheritsFrom(ReadersBase);
Fields.adxGincmis = (prefabOptions) => { return {data:new Readers.AdxGincmis(),[itemTemplate]:"{mistnost_druh_txt}",[helperColumns]:["mistnost_druh_txt"]};};

// GReaderAdxGincobj.fields.js
Readers.AdxGincobj = function(options) { ReadersBase.call(this,{[readerClass]:"Gordic.Adm.Client.GReaderAdxGincobj",keys:["typ_obj"],[columns]:["typ_obj","typ_obj_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdxGincobj.inheritsFrom(ReadersBase);
Fields.adxGincobj = (prefabOptions) => { return {data:new Readers.AdxGincobj(),[itemTemplate]:"{typ_obj_txt:trim:encode}",[helperColumns]:["typ_obj", "typ_obj_txt"]};};

// GReaderAdxGincorj.fields.js
Readers.AdxGincorj = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdxGincorj",keys:["uroven_orj"],[columns]:["uroven_orj", "uroven_orj_txt", "aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdxGincorj.inheritsFrom(ReadersBase);
Fields.adxGincorj = (prefabOptions) => { return {data:new Readers.AdxGincorj(),[dropdown]:true,[itemTemplate]:"{uroven_orj_txt}",[helperColumns]:["uroven_orj_txt"]};};

// GReaderAdxGincsbu.fields.js
Readers.AdxGincsbu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdmGincsbu",keys:["segment_druh"],[columns]:["segment_druh","segment_druh_txt"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdxGincsbu.inheritsFrom(ReadersBase);
Fields.adxGincsbu = (prefabOptions) => { return {data:new Readers.AdxGincsbu(),[itemTemplate]:"{segment_druh_txt}",[helperColumns]:["segment_druh_txt"]};};

// GReaderAdxGinskey.fields.js
Readers.AdxGinskey = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdxGinskey",keys:["acckey"],[columns]:["acckey","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdxGinskey.inheritsFrom(ReadersBase);
Fields.adxGinskey = (prefabOptions) => { return {data:new Readers.AdxGinskey(),[itemTemplate]:"<b>{acckey}</b> | {nazev}",[helperColumns]:["nazev", "acckey"],[graphicInput]:"oninput"};};

// GReaderAdxGinskov.fields.js
Readers.AdxGinskov = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdxGinskov",keys:["kod_vyu"],[columns]:["kod_vyu","kod_vyu_txt","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdxGinskov.inheritsFrom(ReadersBase);
Fields.adxGinskov = (prefabOptions) => { return {data:new Readers.AdxGinskov(),[itemTemplate]:"{kod_vyu_txt}",[helperColumns]:["kod_vyu_txt"]};};

// GReaderAdxGinvovp.fields.js
Readers.AdxGinvovp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdxGinvovp",keys:["typ_obj","ixs","ico"],[columns]:["typ_obj", "ixs", "ico", "typ_vps", "typ_vsp_txt", "poznamka", "aktivita", "nazev"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.AdxGinvovp.inheritsFrom(ReadersBase);
Fields.adxGinvovp = (prefabOptions) => { return {data:new Readers.AdxGinvovp(),[itemTemplate]:"<b>{typ_vps_txt:trim:encode}</b>:&nbsp;{nazev:trim:encode}",[helperColumns]:["typ_vsp_txt", "nazev"],[graphicInput]:"oninput",[selector]:(options) => newDefaultSelector($.extend(Selectors.adxGinvovp(),prefabOptions,options)).show()};};
Selectors.adxGinvovp = () => { return {data:new Readers.AdxGinvovp(),[userSettings]:usRoot+"adxGinvovp",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_vsp_txt", "nazev"]},[gridFormat]:newGridFormat().addTextColumn({name: "typ_vps_txt", caption: "jres:33000038", width: 60, forced: true}).addTextColumn({name: "nazev", caption: "jres:33000039", width: 120})};};

// GReaderAdxKnihaIxp.fields.js
Readers.AdxKnihaIxp = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdxKnihaIxp",keys:["ixp_den"],[columns]:["ixp_den","nazev","rok","ico","ucs","ucs_txt","agenda","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdxKnihaIxp.inheritsFrom(ReadersBase);
Fields.adxKnihaIxp = (prefabOptions) => { return {data:new Readers.AdxKnihaIxp(),[graphicInput]:"oninput",[itemTemplate]:function (row) {
		if (row.agenda == "ADA")
			return "<b>{0}</b> | <b>{1}</b><br /><i>jres:33000031: {2}</i> | <i>jres:33000032: {3}</i> | <i>jres:33000033: {4}</i>"
				.format(
					row.nazev,
					row.agenda,
					row.ixp_den,
					row.ico,
					row.rok
				);
        return "<b>{0}</b> | <b>{1}</b><br /><i>jres:33000031: {2}</i> | <i>jres:33000032: {3}</i> | <i>jres:33000033: {4}</i> | <i>jres:33000034: {5}</i>"
            .format(
                row.nazev,
                row.agenda,
                row.ixp_den,
                row.ico,
                row.rok,
                row.ucs_txt
            );
	},[helperColumns]:["nazev", "ixp_den", "rok", "agenda"],[dropdown]:false,[selector]:(options) => newDefaultSelector($.extend(Selectors.adxKnihaIxp(),prefabOptions,options)).show()};};
Selectors.adxKnihaIxp = () => { return {data:new Gordic.Data.Readers.AdxKnihaIxp(),key:"ixp_den",[processOnStart]:true,[userSettings]:"defaultSelectors.adxKnihaIxp",[isolatedUserSettings]:true,[gridOpts]:{
		columnMode: "fit",
		sort: "nazev",
		defaultProfile: {
			columnList: "aktivita,agenda,rok,nazev,ucs_txt,ixp_den,ico",
			searchColumns: "agenda,rok,nazev,ucs_txt,ixp_den,ico"
		}
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addIconColumn({
			name: "aktivita",
			caption: "jres:29924152",
			iconTemplate: function (row) {
				return Gordic.Prefabs.Utils.createAktivitaIconTemplate(row.aktivita);
			}
		}).addTextColumn({
			name: "agenda",
			caption: "jres:33000035",
			width: 30
		}).addNumberColumn({
			name: "rok",
			caption: "jres:33000033",
			width: 40
		}).addTextColumn({
			name: "nazev",
			caption: "jres:33000036",
			width: 120
		}).addTextColumn({
			name: "ucs_txt",
			caption: "jres:33000034",
			width: 120
		}).addTextColumn({
			name: "ixp_den",
			caption: "jres:33000037",
			width: 80
		}).addTextColumn({
			name: "ico",
			caption: "jres:33000032",
			width: 80
		})};};

// GReaderAdxWflctsu.fields.js
Readers.AdxWflctsu = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdxWflctsu",keys:["typ_subj"],[columns]:["typ_subj","typ_subj_txt","tab_name"],[rowSize]:100,[readAll]:false,[permanent]:true}, options); };
Readers.AdxWflctsu.inheritsFrom(ReadersBase);
Fields.adxWflctsu = (prefabOptions) => { return {data:new Readers.AdxWflctsu(),[itemTemplate]:"{typ_subj_txt:trim:encode}",[helperColumns]:["typ_subj_txt"],[selector]:(options) => newDefaultSelector($.extend(Selectors.adxWflctsu(),prefabOptions,options)).show()};};
Selectors.adxWflctsu = () => { return {data:new Readers.AdxWflctsu(),[userSettings]:usRoot+"adxWflctsu",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["typ_subj_txt"]}};};

// GReaderAdxWflsblk.fields.js
Readers.AdxWflsblk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderAdxWflsblk",keys:["ixs_blk"],[columns]:["ixs_blk","nazev","poznamka","dat_od","dat_do","typ","typ_subj"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.AdxWflsblk.inheritsFrom(ReadersBase);
Fields.adxWflsblk = (prefabOptions) => { return {data:new Readers.AdxWflsblk(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev", "poznamka", "typ_subj"],[selector]:(options) => newDefaultSelector($.extend(Selectors.adxWflsblk(),prefabOptions,options)).show()};};
Selectors.adxWflsblk = () => { return {data:new Readers.AdxWflsblk(),[userSettings]:usRoot+"adxWflsblk",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["nazev", "poznamka", "typ_subj"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:33000027", width: 150, forced: true}).addTextColumn({name: "poznamka", caption: "jres:33000028", width: 150})};};

//INCLUDE fieldGlobalFunctions.fields.js
var Forms = namespace("Gordic.Prefabs.Selector.Forms");
var FilterForms = namespace("Gordic.Prefabs.Selector.FilterForms");
var SubTasks = namespace("Gordic.Prefabs.Selector.SubTasks");
var FieldFunction = namespace("Gordic.Prefabs.Utils");


var defSeparator = " | ";
var simSeparator = " - ";
var iconBuilder;

$.extend(FieldFunction, {
    getRangeString: function (first, second) {
        var result = "";

        if (first === second) {
            result = first;
        }
        else if (first && second) {
            result = first + " - " + second;
        }
        else if (first) {
            result = "od " + first;
        }
        else {
            result = "do " + second;
        }
        return result;
    },

    getDatum: function (datum) {
        var date = new Date(datum);
        return date.toLocaleDateString();
    },
    getDateFromTo: function(fromDate, toDate)
    {
        return this.getRangeString(this.getDatum(fromDate), this.getDatum(toDate));
    },
    isEmpty: function(value)
    {
        if (value == null) return true;
        var str = value.toString();
        return !str || str.length === 0 || /^\s*$/.test(str);
    },
    getFormatedString: function (values, separator)
    {
        var _this = this;
        return values.filter(function (it) { return !!_this.getTrimEncodeString(it); }).join(separator);
    },
    /* options: "fb" - prvni tucne, "sb" - druhe tucne, vse ostatni - bez zvyrazneni */
    getSimpleInfoString: function (info, more, options)
    {
        info = info == null ? "" : this.getTrimEncodeString(info);
        more = more == null ? "" : this.getTrimEncodeString(more);

        if (options === "fb") return ("<b>{0}</b>{1}").format(info, this.isEmpty(more) ? "" : simSeparator + more ); //first bold
        else if (options === "sb") return ("{0}{1}").format(info, this.isEmpty(more) ? "" : simSeparator + "<b>" + more + "</b>"); //second bold

        else {
            return ("{0}{1}").format(info, this.isEmpty(more) ? "" : simSeparator + more); //no bold       
        }
    },
    getFormatedLabeledString: function (dictionary) {
        var formatedLabeledString = ""; 
        for (var key in dictionary) {
            if (!this.isEmpty(dictionary[key])) {
                formatedLabeledString += (defSeparator + "{0}: {1}").format(key, this.getTrimEncodeString(dictionary[key]));
            }
        }

        return formatedLabeledString.replace(/^\s*\|/g, "").trim();
    },
    getInfoStr: function(obj) {
        var headInfo = this.getTrimEncodeString(obj.info);
        var moreInfoTxt = obj.more;
        return ("<b>{0}</b><span class=\"moreInfo\">{1}</span>").format(headInfo, this.isEmpty(moreInfoTxt) ? "" : defSeparator + moreInfoTxt);
    },
    /**
    * Vraci encodovane obe hodnoty
    */
    getInfoStrEncode: function (obj) {
        var headInfo = this.getTrimEncodeString(obj.info);
        var moreInfoTxt = obj.more;
        return ("<b>{0}</b><span class=\"moreInfo\">{1}</span>").format(headInfo, this.isEmpty(moreInfoTxt) ? "" : defSeparator + this.getTrimEncodeString(moreInfoTxt));
    },
    /**
    * Vraci neencodovane hodnoty - jiz byly encodovany
    */
    getInfoNoEncodeStr: function (obj) { 
        var headInfo = obj.info;
        var moreInfoTxt = obj.more;
        return ("<b>{0}</b><span class=\"moreInfo\">{1}</span>").format(headInfo, this.isEmpty(moreInfoTxt) ? "" : defSeparator + moreInfoTxt);
    },
    getTrimEncodeString: function (val)
    {
        if (typeof val !== "string") return val;
        return Gordic.Templates.Formatters.encode(Gordic.Templates.Formatters.trim(val));
    },

    getDoubleLineInfo: function (obj) {
        if (iconBuilder == null) iconBuilder = new Gordic.Utils.IconBuilder();
        return "<div class='doubleLineInfo'><div class='iconInfo'>{0}</div><div class='mainInfo'>{1}<br>{2}</div></div>".format(
            obj.icon ? typeof obj.icon === "string" && obj.icon.startsWith("<") ? obj.icon : iconBuilder.createIcon(obj.icon) : "",
            obj != null && obj.infoElement != null ? obj.infoElement : "<b>{0}</b>".format(this.getTrimEncodeString(obj.info != null ? obj.info : "")),
            obj != null && obj.moreElement != null ? obj.moreElement : "<span class='moreInfo'>{0}</span>".format(this.getTrimEncodeString(obj.more != null ? obj.more : "")) );        
    },

    getSingleLineInfo: function (obj) {
        if (iconBuilder == null) iconBuilder = new Gordic.Utils.IconBuilder();
        return "{0} {1}".format(
            obj.icon ? typeof obj.icon === "string" && obj.icon.startsWith("<") ? obj.icon : iconBuilder.createIcon(obj.icon) : "",
            obj != null && obj.infoElement != null ? obj.infoElement : this.getTrimEncodeString(obj.info != null ? obj.info : ""));
    },

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
    },
    createAktivitaIconTemplate: function (aktivita) {
        var text = "";
        var icon = "";
        switch (aktivita) {
            case 100:
                text = "jres:33000018"; //RC 33000018 : Aktivní
                icon = "fa-check-circle g-state-text g-state-success"
                break;
            case 300:
                text = "jres:33000019"; //RC 33000019 : Připraven
                icon = "fa-exclamation-triangle g-state-text g-state-info";
                break;
            case 500:
                text = "jres:33000020"; //RC 33000020 : Neaktivní
                icon = "fa-exclamation-triangle g-state-text g-state-warning";
                break;
            case 600:
                text = "jres:33000021" //RC 33000021 : Návrh
                icon = "fa-exclamation-triangle g-state-text g-state-info";
                break;
            case 900:
                text = "jres:33000022" //RC 33000022 : Zrušen
                icon = "fa-times-circle g-state-text g-state-error";
                break;
            default:
                text = ""
                icon = ""
                break;
        }
        return { icon: icon, text: text, tooltip: text };
    },

    createDatOdDoIconTemplate: function (dat_od, dat_do) {
        var color = "";
        var text = "";
        var currentDateTime = new Date();
        if (dat_od && !dat_do) {
            var datOd = new Date(dat_od);
            if (datOd > currentDateTime) {
                color = "g-state-info";
                text = "jres:33000023"; //RC 33000023 : Před platností
            } else {
                color = "g-state-success";
                text = "jres:33000024" //RC 33000024 : Platné
            }
        } else if (!dat_od && dat_do) {
            var datDo = new Date(dat_do);
            if (datDo > currentDateTime) {
                color = "g-state-success";
                text = "jres:33000024" //RC 33000024 : Platné
            }
            else {
                color = "g-state-warning";
                text = "jres:33000025" //RC 33000025 : Po platnosti
            }
        } else if (dat_od && dat_do) {
            var datOd = new Date(dat_od);
            var datDo = new Date(dat_do);
            if (datOd > currentDateTime) {
                color = "g-state-info";
                text = "jres:33000023"; //RC 33000023 : Před platností
            }
            else if (datOd < currentDateTime && datDo > currentDateTime) {
                color = "g-state-success";
                text = "jres:33000024" //RC 33000024 : Platné
            }
            else {
                color = "g-state-warning";
                text = "jres:33000025" //RC 33000025 : Po platnosti
            }
        }
        if (color != "")
            return { icon: `gi-time g-state-text ${color}`, text: text }
        else 
            return { icon: "", text: ""}
    }
});


})(jQuery);

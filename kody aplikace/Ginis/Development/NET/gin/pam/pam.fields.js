"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Pam.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const cached = "cached"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const helperItemTemplate = "helperItemTemplate"; const selector = "selector"; const title = "title"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings";

// GReaderPamvpus05.fields.js
Readers.Pamvpus05 = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPamvpus05",keys:["kod_uct"],[columns]:["kod_uct","popis"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.Pamvpus05.inheritsFrom(ReadersBase);
Fields.pamvpus05 = (prefabOptions) => { return {data:new Readers.Pamvpus05(),[itemTemplate]:function(d) {
		return d.kod_uct.trim() + " - " + (d.popis ?? '').trim();
	},[helperColumns]:["kod_uct", "popis"],[helperItemTemplate]:function (row) {
		var more = Gordic.Prefabs.Utils.getFormatedLabeledString({ "Kód UCT": row.kod_uct, "Popis": row.popis });
		var info = Gordic.Prefabs.Utils.getSimpleInfoString(row.popis);

		return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": info, "more": more });
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.pamvpus05(),prefabOptions,options)).show()};};
Selectors.pamvpus05 = () => { return {data:new Readers.Pamvpus05(),[title]:"Výběr úlohy",[gridOpts]:{
		searchColumns: ["kod_uct", "popis"]
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "kod_uct", caption: "Kód pro účtování", width: 90 })
		.addTextColumn({ name: "popis", caption: "Popis úlohy/projektu", width: 250 }),[userSettings]:usRoot+"pamvpus05",[isolatedUserSettings]:true};};

// GReaderPracPomery05.fields.js
Readers.PracPomery05 = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderPracPomeryPdm",keys:["ixs_ppv","dat_plat_od"],[columns]:["ixs_ppv","dat_plat_od","ixs_esu","oc","nazev","rc","dat_od","dat_do","druh_ppv","ixs_tpr","druh_ppv_txt","nazev_sablony","zkrprdl","zkrprdz","sez_zac","sez_kon","ixs_kal","ixs_pra","ixs_vyp","dat_plat_dor","presun_ixs_pra","presun_pracoviste","kod_ppv"],[rowSize]:100,[readAll]:false,[permanent]:false,[cached]:0}, options); };
Readers.PracPomery05.inheritsFrom(ReadersBase);
Fields.pracPomery05 = (prefabOptions) => { return {data:new Readers.PracPomery05(),[itemTemplate]:function (d) {
				return d.oc.trim() + "-" + d.nazev.trim() + " | " + d.druh_ppv_txt.trim() + " | " + d.nazev_sablony.trim() + " (" + Gordic.Templates.Formatters.date(d.dat_od) + ")";
	},[helperColumns]:["oc", "nazev"],[helperItemTemplate]:function (row) {
		var more = Gordic.Prefabs.Utils.getFormatedLabeledString({ "OC": row.oc, "Druh PPV": row.druh_ppv_txt });
		var muchmore = Gordic.Prefabs.Utils.getFormatedLabeledString({ "Dat.od": row.dat_od });
		var info = Gordic.Prefabs.Utils.getSimpleInfoString(row.nazev);

		return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ "info": info, "more": more, "muchmore": muchmore });
	},[selector]:(options) => newDefaultSelector($.extend(Selectors.pracPomery05(),prefabOptions,options)).show()};};
Selectors.pracPomery05 = () => { return {data:new Readers.PracPomery05(),[title]:"Výběr pracovního poměru",[gridOpts]:{
		searchColumns: ["oc", "nazev"]
	},[gridFormat]:new Gordic.Data.GridFormat()
		.addTextColumn({ name: "oc", caption: "Os.číslo", width: 90 })
		.addTextColumn({ name: "nazev", caption: "Jméno", width: 150 })
		.addTextColumn({ name: "druh_ppv_txt", caption: "Druh PPV", width: 120 })
		.addTextColumn({ name: "nazev_sablony", caption: "Šablona", width: 100 })
		.addDateColumn({ name: "dat_od", caption: "Dat.PPV od", width: 90 }),[userSettings]:usRoot+"pracPomery05",[isolatedUserSettings]:true};};

// GReaderSzrAdresaObec.fields.js
Readers.szradr_obec = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"szradr_obec",keys:["obec_kod"],[columns]:["okres_kod", "okres_nazev", "obec_kod", "obec_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.szradr_obec.inheritsFrom(ReadersBase);
Fields.szradr_obec = (prefabOptions) => { return {data:new Readers.szradr_obec(),[itemTemplate]:"{obec_nazev:trim:encode}",[helperColumns]:["obec_nazev", "okres_nazev"],[helperItemTemplate]:function (row) { return FieldFunction.getInfoStr({ "info": row.obec_nazev, "more": row.okres_nazev }); },[selector]:(options) => newDefaultSelector($.extend(Selectors.szradr_obec(),prefabOptions,options)).show()};};
Selectors.szradr_obec = () => { return {data:new Readers.szradr_obec(),[title]:"Výběr obce",[gridOpts]:{
        userSettings: false,
        searchColumns: ["obec_nazev"],
        defaultProfile: {
                    }
    },[gridFormat]:new Gordic.Data.GridFormat()
            .addTextColumn({ name: "obec_nazev", caption: "Obec", width: 100 })
            .addTextColumn({ name: "okres_nazev", caption: "Okres", width: 100 }),[userSettings]:usRoot+"szradr_obec",[isolatedUserSettings]:true};};

// GReaderSzrAdresaObecCast.fields.js
Readers.szradr_obeccast = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"szradr_obeccast",keys:["cast_obce_kod"],[columns]:["obec_kod", "obec_nazev", "cast_obce_kod", "cast_obce_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.szradr_obeccast.inheritsFrom(ReadersBase);
Fields.szradr_obeccast = (prefabOptions) => { return {data:new Readers.szradr_obeccast(),[itemTemplate]:"{cast_obce_nazev:trim:encode}",[helperColumns]:["cast_obce_nazev", "obec_nazev"],[helperItemTemplate]:function (row) { return FieldFunction.getInfoStr({ "info": row.cast_obce_nazev, "more": row.obec_nazev }); },[selector]:(options) => newDefaultSelector($.extend(Selectors.szradr_obeccast(),prefabOptions,options)).show()};};
Selectors.szradr_obeccast = () => { return {data:new Readers.szradr_obeccast(),[title]:"Výběr části obce",[gridOpts]:{
        userSettings: false,
        searchColumns: ["cast_obce_nazev"],
        defaultProfile: {
                    }
    },[gridFormat]:new Gordic.Data.GridFormat()
            .addTextColumn({ name: "cast_obce_nazev", caption: "Část obce", width: 100 })
            .addTextColumn({ name: "obec_nazev", caption: "Obec", width: 100 }),[userSettings]:usRoot+"szradr_obeccast",[isolatedUserSettings]:true};};

// GReaderSzrAdresaUlice.fields.js
Readers.szradr_ulice = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"szradr_ulice",keys:["ulice_kod"],[columns]:["obec_kod", "obec_nazev", "cast_obce_kod", "cast_obce_nazev", "ulice_kod", "ulice_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.szradr_ulice.inheritsFrom(ReadersBase);
Fields.szradr_ulice = (prefabOptions) => { return {data:new Readers.szradr_ulice(),[itemTemplate]:"{ulice_nazev:trim:encode}",[helperColumns]:["ulice_nazev", "obec_nazev", "cast_obce_nazev"],[helperItemTemplate]:function (row) { return FieldFunction.getInfoStr({ "info": row.ulice_nazev, "more": row.cast_obce_nazev, "muchmore": row.obec_nazev }); },[selector]:(options) => newDefaultSelector($.extend(Selectors.szradr_ulice(),prefabOptions,options)).show()};};
Selectors.szradr_ulice = () => { return {data:new Readers.szradr_ulice(),[title]:"Výběr ulice",[gridOpts]:{
        userSettings: false,
        searchColumns: ["ulice_nazev"],
        defaultProfile: {
                    }
    },[gridFormat]:new Gordic.Data.GridFormat()
            .addTextColumn({ name: "ulice_nazev", caption: "Ulice", width: 100 })
            .addTextColumn({ name: "cast_obce_nazev", caption: "Část obce", width: 50 })
            .addTextColumn({ name: "obec_nazev", caption: "Obec", width: 50 }),[userSettings]:usRoot+"szradr_ulice",[isolatedUserSettings]:true};};

// GReaderSzrAdresaUliceCislo.fields.js
Readers.szradr_ulicecislo = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"szradr_ulicecislo",keys:["adresni_misto_kod"],[columns]:["adresni_misto_kod", "obec_kod", "obec_nazev", "cast_obce_kod", "cast_obce_nazev", "ulice_kod", "ulice_nazev", "cpop", "cpop_nazev", "cor", "ulicecislo_nazev"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.szradr_ulicecislo.inheritsFrom(ReadersBase);
Fields.szradr_ulicecislo = (prefabOptions) => { return {data:new Readers.szradr_ulicecislo(),[itemTemplate]:"{ulicecislo_nazev:trim:encode}",[helperColumns]:["ulicecislo_nazev"],[helperItemTemplate]:function (row) { return FieldFunction.getInfoStr({ "info": row.ulicecislo_nazev, "more": row.ulice_nazev, "muchmore": row.cast_obce_nazev, "muchmuchmore": row.obec_nazev }); },[selector]:(options) => newDefaultSelector($.extend(Selectors.szradr_ulicecislo(),prefabOptions,options)).show()};};
Selectors.szradr_ulicecislo = () => { return {data:new Readers.szradr_ulicecislo(),[title]:"Výběr čísla ulice",[gridOpts]:{
        userSettings: false,
        searchColumns: ["cpop", "cor"],
        defaultProfile: {
                    }
    },[gridFormat]:new Gordic.Data.GridFormat()
            .addTextColumn({ name: "cpop_nazev", caption: "Číslo popisné", width: 25 })
            .addTextColumn({ name: "cor", caption: "Číslo orientační", width: 25 })
            .addTextColumn({ name: "ulice_nazev", caption: "Ulice", width: 50 })
            .addTextColumn({ name: "cast_obce_nazev", caption: "Část obce", width: 50 })
            .addTextColumn({ name: "obec_nazev", caption: "Obec", width: 50 }),[userSettings]:usRoot+"szradr_ulicecislo",[isolatedUserSettings]:true};};

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
        var muchmoreInfoTxt = obj.muchmore;
        var muchmuchmoreInfoTxt = obj.muchmuchmore; 
        return ("<b>{0}</b><span class=\"moreInfo\">{1}{2}{3}</span>").format(headInfo, this.isEmpty(moreInfoTxt) ? "" : defSeparator + moreInfoTxt, this.isEmpty(muchmoreInfoTxt) ? "" : defSeparator + muchmoreInfoTxt, this.isEmpty(muchmuchmoreInfoTxt) ? "" : defSeparator + muchmuchmoreInfoTxt);
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
    }
});


})(jQuery);

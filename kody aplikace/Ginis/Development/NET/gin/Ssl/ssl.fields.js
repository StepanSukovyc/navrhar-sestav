"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Ssl.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const graphicInput = "graphicInput"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const selector = "selector"; const processOnStart = "processOnStart"; const gridFormat = "gridFormat"; const doNotSearch = "doNotSearch"; const gridOpts = "gridOpts"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings";

// GReaderSslGinsvsk.fields.js
Readers.SslGinsvsk = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSslGinsvsk",keys:["ixs_vsk"],[columns]:["ixs_vsk","ico","nazev","dat_od","dat_do","spis_znak","spis_znak_short","ixs_vsk_nad","ixs_skr","urceni_spis_z","zpus_prid_cj","format_cj","priz_trvskar","ixs_spn_od","ixs_spn_do","ixs_vsk_prev","ixs_vsk_next","poznamka","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.SslGinsvsk.inheritsFrom(ReadersBase);
Fields.sslGinsvsk = (prefabOptions) => { return {data:new Readers.SslGinsvsk(),[graphicInput]:"oninput",[itemTemplate]:"<b>{nazev}</b><br /><span><i>jres:32195014: {ixs_vsk}</i> | <i>jres:32195015: {spis_znak}</i></span>",[helperColumns]:["nazev", "spis_znak", "ixs_vsk"],[selector]:(options) => newDefaultSelector($.extend(Selectors.sslGinsvsk(),prefabOptions,options)).show()};};
Selectors.sslGinsvsk = () => { return {data:function () {
		return new Gordic.Data.View(new Gordic.Data.Readers.SslGinsvsk().getData(this.serverFilters), {
			key: "ixs_vsk",
			processOnStart: true,
			processors: {
				tree: new Gordic.Data.Tree(Gordic.Data.Tree.parentIdOrganizer("ixs_vsk_nad"), {
					defaultState: "open"
				})
			}
		})
	},key:"ixs_vsk",[processOnStart]:true,[gridFormat]:new Gordic.Data.GridFormat()
		.addStructureColumn({
			name: "spis_znak",
			caption: "jres:32195016",  			width: 120,
			fixedWidth: false,
			sortable: false,
			formatPreset: "full",
			forced: true,
		})
		.addIconColumn({
			name: "aktivita",
			caption: "jres:32195017", 			iconTemplate: (row) => {
				return Gordic.Prefabs.Utils.createAktivitaIconTemplateSsl(row.aktivita);
			}
		})
		.addIconColumn({
			name: "platnost",
			caption: "jres:32195018", 			iconTemplate: (row) => {
				return Gordic.Prefabs.Utils.createDatOdDoIconTemplateSsl(row.dat_od, row.dat_do)
			}
		})
		.addTextColumn({
			name: "nazev",
			caption: "jres:32195019" 		})
		.addTextColumn({
			name: "ixs_skr_txt",
			caption: "jres:32195020" 		})
		.addBooleanColumn({
			name: "priz_trvskar",
			caption: "jres:32195021", 			width: 100
		})
		.addDateTimeColumn({
			name: "dat_od",
			caption: "jres:32195022", 			width: 150 
		}).addDateTimeColumn({
			name: "dat_do",
			caption: "jres:32195023", 			width: 150
		}).addTextColumn({
			name: "ixs_vsk",
			caption: "jres:32195024", 			width: 120
		}),[doNotSearch]:false,[gridOpts]:{
		rowsEnabled: function (dataRow) {
			if (dataRow && dataRow.data && (dataRow.data.urceni_spis_z == 2 || dataRow.data.urceni_spis_z == 5 || dataRow.data.urceni_spis_z == 7))
				return true;
			else
				return false;
		},
		columnMode: "full",
		searchColumns: ["nazev", "spis_znak_short", "spis_znak", "dat_od", "dat_do", "ixs_vsk", "ixs_skr_txt"],
		sort: "cs2_spis_znak"
	},[userSettings]:usRoot+"sslGinsvsk",[isolatedUserSettings]:true};};

//INCLUDE fieldGlobalFunctions.fields.js
var Forms = namespace("Gordic.Prefabs.Selector.Forms");
var FilterForms = namespace("Gordic.Prefabs.Selector.FilterForms");
var SubTasks = namespace("Gordic.Prefabs.Selector.SubTasks");
var FieldFunction = namespace("Gordic.Prefabs.Utils");


var defSeparator = " | ";
var simSeparator = " - ";
var iconBuilder;

$.extend(FieldFunction, {
    createAktivitaIconTemplateSsl: function (aktivita) {
        var text = "";
        var icon = "";
        switch (aktivita) {
            case 100:
                text = "jres:32195003"; //RC 32195003 : Aktivní
                icon = "fa-check-circle g-state-text g-state-success"
                break;
            case 300:
                text = "jres:32195002"; //RC 32195002 : Připraven
                icon = "fa-exclamation-triangle g-state-text g-state-info";
                break;
            case 500:
                text = "jres:32195004"; //RC 32195004 : Neaktivní
                icon = "fa-exclamation-triangle g-state-text g-state-warning";
                break;
            case 600:
                text = "jres:32195005" //RC 32195005 : Návrh
                icon = "fa-exclamation-triangle g-state-text g-state-info";
                break;
            case 900:
                text = "jres:32195006" //RC 32195006 : Zrušen
                icon = "fa-times-circle g-state-text g-state-error";
                break;
            default:
                text = ""
                icon = ""
                break;
        }
        return { icon: icon, text: text, tooltip: text };
    },

    createDatOdDoIconTemplateSsl: function (dat_od, dat_do) {
        var color = "";
        var text = "";
        var currentDateTime = new Date();
        if (dat_od && !dat_do) {
            var datOd = new Date(dat_od);
            if (datOd > currentDateTime) {
                color = "g-state-info";
                text = "jres:32195007"; //RC 32195007 : Před platností
            } else {
                color = "g-state-success";
                text = "jres:32195008" //RC 32195008 : Platné
            }
        } else if (!dat_od && dat_do) {
            var datDo = new Date(dat_do);
            if (datDo > currentDateTime) {
                color = "g-state-success";
                text = "jres:32195009" //RC 32195009 : Platné
            }
            else {
                color = "g-state-warning";
                text = "jres:32195010" //RC 32195010 : Po platnosti
            }
        } else if (dat_od && dat_do) {
            var datOd = new Date(dat_od);
            var datDo = new Date(dat_do);
            if (datOd > currentDateTime) {
                color = "g-state-info";
                text = "jres:32195011"; //RC 32195011 : Před platností
            }
            else if (datOd < currentDateTime && datDo > currentDateTime) {
                color = "g-state-success";
                text = "jres:32195012" //RC 32195012 : Platné
            }
            else {
                color = "g-state-warning";
                text = "jres:32195013" //RC 32195013 : Po platnosti
            }
        }
        if (color != "")
            return { icon: `gi-time g-state-text ${color}`, text: text }
        else 
            return { icon: "", text: ""}
    }
});


})(jQuery);

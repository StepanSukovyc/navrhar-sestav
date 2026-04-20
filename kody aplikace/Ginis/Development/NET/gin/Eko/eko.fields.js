"use strict";
(function($) {
const Readers = namespace("Gordic.Data.Readers");
const Fields = namespace("Gordic.Prefabs.Select");
const Selectors = namespace("Gordic.Data.Selectors");
const ReadersBase = Readers.Base;
const newDefaultSelector = (opts) => new Selectors.DefaultSelector(opts);
const newGridFormat = () => new Gordic.Data.GridFormat();
const rootName = "Gordic.Eko.Client.";
const usRoot = "defaultSelectors.";

const columns = "columns"; const rowSize = "rowSize"; const readAll = "readAll"; const permanent = "permanent"; const readerClass = "readerClass"; const itemTemplate = "itemTemplate"; const helperColumns = "helperColumns"; const dropdown = "dropdown"; const selector = "selector"; const userSettings = "userSettings"; const isolatedUserSettings = "isolatedUserSettings"; const gridOpts = "gridOpts"; const gridFormat = "gridFormat"; const helperItemTemplate = "helperItemTemplate"; const menuBar = "menuBar"; const serverFilters = "serverFilters"; const subTaskOpts = "subTaskOpts";

// GReaderEkockry.fields.js
Readers.Ekockry = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkockry",keys:["s_kry"],[columns]:["s_kry","s_kry_txt","s_kry_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekockry.inheritsFrom(ReadersBase);
Fields.ekockry = (prefabOptions) => { return {data:new Readers.Ekockry(),[itemTemplate]:"{s_kry_txt}",[helperColumns]:["s_kry_txt"]};};

// GReaderEkoclik.fields.js
Readers.Ekoclik = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoclik",keys:["s_lik"],[columns]:["s_lik","s_lik_txt","s_lik_zkr"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoclik.inheritsFrom(ReadersBase);
Fields.ekoclik = (prefabOptions) => { return {data:new Readers.Ekoclik(),[itemTemplate]:"{s_lik_txt}",[helperColumns]:["s_lik_txt"]};};

// GReaderEkosden.fields.js
Readers.Ekosden = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosden",keys:["ixp_den"],[columns]:["ixp_den","nazev","rok","aktivita", "prefix", "suffix"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekosden.inheritsFrom(ReadersBase);
Fields.ekosden = (TypAg,prefabOptions) => { return {data:new Readers.Ekosden({ readerParams: { TypAg: TypAg } }),[dropdown]:true,[itemTemplate]:"{nazev} ({rok})",[helperColumns]:["ixp_den", "nazev", "rok"],[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosden(TypAg),prefabOptions,options)).show()};};
Selectors.ekosden = (TypAg) => { return {data:new Readers.Ekosden({ readerParams: { TypAg: TypAg} }),[userSettings]:usRoot+"ekosden",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixp_den", "nazev", "rok"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31750002", width: 300, forced: true}).addTextColumn({name: "ktg_den_txt", caption: "jres:31850001", width: 200}).addNumberColumn({name: "rok", caption: "jres:21000004", width: 100})};};

// GReaderEkosdenAll.fields.js
Readers.EkosdenAll = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosdenAll",keys:["ixp_den"],[columns]:["ixp_den", "nazev", "rok", "aktivita", "prefix", "suffix"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.EkosdenAll.inheritsFrom(ReadersBase);
Fields.ekosdenAll = (TypAg,prefabOptions) => { return {data:new Readers.EkosdenAll({ readerParams: { TypAg: TypAg } }),[dropdown]:true,[itemTemplate]:"{nazev} ({rok})",[helperColumns]:["ixp_den", "nazev", "rok"],[selector]:(options) => newDefaultSelector($.extend(Selectors.ekosdenAll(TypAg),prefabOptions,options)).show()};};
Selectors.ekosdenAll = (TypAg) => { return {data:new Readers.EkosdenAll({ readerParams: { TypAg: TypAg } }),[userSettings]:usRoot+"ekosdenAll",[isolatedUserSettings]:true,[gridOpts]:{searchColumns:["ixp_den", "nazev", "rok"]},[gridFormat]:newGridFormat().addTextColumn({name: "nazev", caption: "jres:31750002", width: 400, forced: true}).addNumberColumn({name: "rok", caption: "jres:21000004", width: 100})};};

// GReaderEkoskls.fields.js
Readers.Ekoskls = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkoskls",keys:["kod_klas"],[columns]:["kod_klas","typ_klas","nazev","aktivita"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekoskls.inheritsFrom(ReadersBase);
Fields.ekoskls = (prefabOptions) => { return {data:new Readers.Ekoskls(),[itemTemplate]:"{kod_klas} - {nazev}",[helperColumns]:["kod_klas", "nazev"]};};

// GReaderEkosuvlKon.fields.js
Readers.EkosuvlKon = function(options) { ReadersBase.call(this,{[readerClass]:"Gordic.Eko.Client.GReaderEkosuvlKon",keys:["rok", "bu_vl", "sk_vl"],[columns]:["bu_vl", "sk_vl", "bu_txt", "nazev", "uea_uc", "ueb_uc"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.EkosuvlKon.inheritsFrom(ReadersBase);
Fields.ekosuvlKon = (prefabOptions) => { return {data:new Readers.EkosuvlKon(),[itemTemplate]:"{bu_vl:trim:encode} / {sk_vl:trim:encode}",[helperColumns]:["bu_vl", "sk_vl", "nazev", "uea_uc", "ueb_uc"],[helperItemTemplate]:function (row) {
                var moreInfo = Gordic.Prefabs.Utils.getFormatedLabeledString({ "jres:Gordic.ControlsLogic.Client:31850004": row.nazev, "jres:Gordic.ControlsLogic.Client:31850062": row.uea_uc, "jres:Gordic.ControlsLogic.Client:31850063": row.ueb_uc });         var infoText = row.bu_vl + " / " + row.sk_vl;
        return Gordic.Prefabs.Utils.getInfoStr({ "info": infoText, "more": moreInfo });
    },[selector]:function (options) {
        var visNavazSmlouvu = !!options.serverFilters.IxpSml;
        return new Selectors.DefaultSelector($.extend(Selectors.ekosuvlKon(visNavazSmlouvu), prefabOptions, options)).show();
    }};};
Selectors.ekosuvlKon = (visNavazSmlouva) => { return {data:new Readers.EkosuvlKon(),[gridOpts]:{
        searchColumns: ["typ_bu_zkr", "bu_vl", "sk_vl", "nazev", "ktg_bu_txt", "uus"]
    },[gridFormat]:[
        { name: "typ_bu_zkr", caption: "jres:Gordic.ControlsLogic.Client:31850006", description: "jres:Gordic.ControlsLogic.Client:31850290", width: 30 },
        { name: "bu_vl", caption: "jres:Gordic.ControlsLogic.Client:31850291", width: 90 },
        { name: "sk_vl", caption: "jres:Gordic.ControlsLogic.Client:31850292", width: 55 },
        { name: "nazev", caption: "jres:Gordic.ControlsLogic.Client:31850287", width: 120 },
        { name: "ktg_bu_txt", caption: "jres:Gordic.ControlsLogic.Client:31850293", width: 120 },
        { name: "uus", caption: Gordic.Consts.DbShortcuts.uus, width: 40 },
        { name: "uea_uc", caption: "SU", width: 40 },
        { name: "ueb_uc", caption: "AU", width: 40 },
        { name: "uea_rr", caption: "SU rr", width: 40 },
        { name: "ueb_rr", caption: "AU rr", width: 40 }
    ],[menuBar]:[
        {
            favorite: true,
            action: new GAction({
                name: "actNavSmluv",
                caption: "jres:31850032",                 checked: true,
                visible: visNavazSmlouva || false,
                run: function (ev, ctx) {
                    if (ctx.dialogCnt.actualFilters.IxpSml) {
                        ctx.dialogCnt.navSmluv = ctx.dialogCnt.actualFilters.IxpSml;
                    }
                    let checked = this.checked();
                    if (checked) {
                        ctx.dialogCnt.actualFilters.IxpSml = null;
                    }
                    else {
                        ctx.dialogCnt.actualFilters.IxpSml = ctx.dialogCnt.navSmluv;
                    }

                    ctx.dialogCnt.filterDataAndRefresh(undefined, true);
                    this.checked(!checked);
                    var dlg = ctx.dialogCnt.dialogs;
                    /**/
                }
            })
        },
    ],[userSettings]:"defaultSelectors.ekosuvlKon",[isolatedUserSettings]:true};};

// GReaderKofspol.fields.js
Readers.Kofspol = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderKofspol",keys:["kod_pol"],[columns]:["kod_pol", "nazev", "mj", "cmj", "dan_proc", "obch_pri", "typ_pol", "mat_cis", "aktivita", "dat_zmena", "zmenu_prov", "dan_typ", "ico", "typ_klas"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Kofspol.inheritsFrom(ReadersBase);
Fields.kofspol = (Ico,prefabOptions) => { return {data:new Readers.Kofspol({ readerParams: { Ico: Ico } }),[itemTemplate]:"{kod_pol}",[helperColumns]:["kod_pol"],[selector]:(options) => newDefaultSelector($.extend(Selectors.kofspol(Ico),prefabOptions,options)).show()};};
Selectors.kofspol = (Ico) => { return {data:new Readers.Kofspol({ readerParams: { Ico: Ico } }),[gridOpts]:{
                rowsEnabled: function (meta) {
            return meta && meta.data && meta.data.aktivita === 100;
        },
        defaultProfile: {
            columnList: "kod_pol,nazev,mj,cmj,dan_proc,dan_typ_txt,obch_pri,typ_klas,kod_klas,typ_pol_txt,typ_pol,aktivita_txt",
            condFormats: [{
                "bg": "gray",
                "formula": "IF(@typ_klas, @typ_klas, -1, -1) > DECIMAL(0)"
            },
            {
                "bold": true,
                "formula": "EQUALS(@typ_pol,40)"
            }]
        }

    },[gridFormat]:new Gordic.Data.GridFormat()
            .addTextColumn({ name: "kod_pol", caption: "jres:31850007", width: 75, forced: true })
            .addTextColumn({ name: "nazev", caption: "jres:31850008", width: 250 })
            .addTextColumn({ name: "mj", caption: "jres:31850009", width: 75 })
            .addCurrencyColumn({ name: "cmj", caption: "jres:31850010", width: 150 })
            .addTextColumn({ name: "dan_typ_txt", caption: "jres:31850040", width: 100 })
            .addCurrencyColumn({ name: "dan_proc", caption: "jres:31850011", width: 100 })
            .addCurrencyColumn({ name: "obch_pri", caption: "jres:31850012", width: 50 })             .addNumberColumn({ name: "typ_klas", caption: "jres:31850042", width: 100 })             .addTextColumn({ name: "typ_klas_txt", caption: "jres:31850045", width: 100 })             .addTextColumn({ name: "kod_klas", caption: "jres:31850043", width: 100 })             .addTextColumn({ name: "kod_predmetu_nazev", caption: "jres:31850046", width: 100 })             .addTextColumn({ name: "typ_pol_txt", caption: "jres:31850013", width: 100 })
            .addNumberColumn({ name: "typ_pol", caption: "jres:31850019", width: 50 })
            .addTextColumn({ name: "ico", caption: "jres:31850041", width: 75 })             .addTextColumn({ name: "aktivita_txt", caption: "jres:31850044", width: 75 }),[serverFilters]:{ aktivita: 100 },[subTaskOpts]:Gordic.Prefabs.Selector.SubTasks.Aktivita,[menuBar]:[
        {
            favorite: true, action: new GAction({
                name: "newRecord",
                caption: "jres:31850014",                 run: function (ev, ctx) {
                    var cnt = ctx.dialogCnt.createServiceContent("Gordic.Eko.WebClient.GServiceContent");
                    var dlg = ctx.dialogCnt.dialogs.simpleForm("jres:31850027", Gordic.Prefabs.Selector.Forms.getKofspolForm(false), {}, { ID: "PolozkaEdit", height: 600 });                     var def = $.Deferred();
                    dlg.on("close", function (ev, retValue, content) {
                        if (retValue) {
                            def.resolve(retValue);
                        }
                        else {
                            def.reject("Uživatel zrušil dialog.");
                        }
                    });
                    this.setPending(def.promise().then(function (data) {
                        return cnt.call("AddEditKofPol", { row: data });
                    }).then(function () {
                        ctx.dialogCnt.clearLoadedData();

                        ctx.dialogCnt.filterDataAndRefresh();
                        return;
                    }).always(function () {
                        Gordic.Data.readerCache.clearCache("Gordic.Eko.Client.GReaderKofspol");
                        cnt.close();
                    }));
                }
            })
        },
        {
            favorite: true, action: new GAction({
                name: "editRecord",
                caption: "jres:31850016",                 run: function (ev, ctx) {
                    var row = ctx.dialogCnt.grid.ggrid("getSelection")[0];
                    if (row.typ_pol === 40) {
                        this.setPending(-1);
                        ctx.dialogCnt.dialogs.warning("jres:31850029", "jres:31850031");                     }
                    else {

                        var cnt = ctx.dialogCnt.createServiceContent("Gordic.Eko.WebClient.GServiceContent");
                        var dlg = ctx.dialogCnt.dialogs.simpleForm("jres:31850017", Gordic.Prefabs.Selector.Forms.getKofspolForm(true), row, { ID: "PolozkaEdit", height: 600 });                         var def = $.Deferred();
                        dlg.on("close", function (ev, retValue, content) {
                            if (retValue) {
                                def.resolve(retValue);
                            }
                            else {
                                def.reject("Uživatel zrušil dialog.");
                            }
                        });
                        this.setPending(def.promise().then(function (data) {
                            return cnt.call("AddEditKofPol", { row: data });
                        }).then(function () {
                            ctx.dialogCnt.clearLoadedData();

                            ctx.dialogCnt.filterDataAndRefresh();
                            return;
                        }).always(function () {
                            Gordic.Data.readerCache.clearCache("Gordic.Eko.Client.GReaderKofspol");
                            cnt.close();
                        }));
                    }
                }

            })
        },
        {
            favorite: true, action: new GAction({
                name: "removeRecord",
                caption: "jres:31850018",                 run: function (ev, ctx) {
                    var row = ctx.dialogCnt.grid.ggrid("getSelection")[0];
                    var cnt = ctx.dialogCnt.createServiceContent("Gordic.Eko.WebClient.GServiceContent");
                    if (row.typ_pol === 40) {
                        this.setPending(-1);
                        ctx.dialogCnt.dialogs.warning("jres:31850029", "jres:31850030");                     }
                    else {
                        this.setPending(cnt.call("RemoveKofPol", { kodPol: row.kod_pol, ico: row.ico }).always(function () {
                            Gordic.Data.readerCache.clearCache("Gordic.Eko.Client.GReaderKofspol");
                            ctx.dialogCnt.clearLoadedData();
                            ctx.dialogCnt.filterDataAndRefresh();

                            cnt.close();
                        }));
                    }
                }
            })
        },
        {
            favorite: true, action: new GAction({
                name: "agenda",
                caption: "jres:31850033",                 run: function (ev, ctx) {
                    var filterChecked = !this.checked();

                    var cnt = $.content(ev.target);
                    cnt.clearLoadedData();
                    cnt.actualFilters = $.extend({}, cnt.actualFilters, { agenda: filterChecked });                     this.checked(filterChecked);
                    cnt.filterDataAndRefresh();                 }
            })
        }],[userSettings]:usRoot+"kofspol",[isolatedUserSettings]:true};};

// GReaderMajsmajEko.fields.js
Readers.MajsmajEko = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderMajsmajEko",keys:["inv_cis"],[columns]:["ixs_maj", "nazev", "inv_cis", "ser_cis", "evi_cis", "vyr_cis", "skp", "nazev_skp", "drh_id", "skupina_id", "mj", "mat_cis", "sarze"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.MajsmajEko.inheritsFrom(ReadersBase);
Fields.majsmajEko = (prefabOptions) => { return {data:new Readers.MajsmajEko(),[itemTemplate]:"{inv_cis:trim:encode}",[helperColumns]:["inv_cis"],[selector]:(options) => newDefaultSelector($.extend(Selectors.majsmajEko(),prefabOptions,options)).show()};};
Selectors.majsmajEko = () => { return {data:new Readers.MajsmajEko(),[gridOpts]:{
		searchColumns: ["inv_cis"]
	},[userSettings]:usRoot+"majsmajEko",[isolatedUserSettings]:true,[gridFormat]:newGridFormat().addNumberColumn({name: "skupina_id", caption: "jres:31850002", width: 55, forced: true}).addNumberColumn({name: "drh_id", caption: "jres:31850003", width: 55}).addTextColumn({name: "inv_cis", caption: "jres:31850004", width: 120}).addTextColumn({name: "ixs_maj", caption: "jres:31850005", width: 120}).addTextColumn({name: "nazev_skp", caption: "jres:31850006", width: 200})};};

// GReaderSmlapid2.fields.js
Readers.Smlapid2 = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlapid2",keys:["ixp_sml_pri"],[columns]:["ixp_sml_pri","ac_sml","ac","ktg_sml","ktg_typ","ktg_typ_txt","ixs_prev","bu_ci","sk_ci","zak_upr","typ_pen","typ_spo","c_sazba_pen","c_spo","c_fak","c_mena","kurz","mena","proc_sazba_pen","proc_spo","priz_uroc","priz_spo","priz_pzp","popis","nazev","dat_platnost","dat_ucinnost","dat_uzavreni","fin_od","fin_do","ico","ico_esu","rc_esu","ucs","nks","sml_stav","typ_ag_blok","typ_ceny","ixs_esu"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Smlapid2.inheritsFrom(ReadersBase);

// GReaderSmlspol.fields.js
Readers.Smlspol = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderSmlspol",keys:["ixp","rok","cislo"],[columns]:["ixp","rok","cislo","lic","ac_sml","cis_pol_pla","nazev","up_stav","c","ico","ucs","nks","uea","ueb","uec","ued","uee","uef","ueg","ueh","uei","uej","te0","te1","te2","te3","te4","sk_vl","bu_vl","c_fak","dat_zmena","zmenu_prov","dat_vznik","c_obj_sml","drd","ixp_sml","rok_sml","cislo_sml","uea_rr","ueb_rr","ixs_pri","por_cis","typ_ag_blok","znam","xuete","priz_zaz","c_zbyva"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Smlspol.inheritsFrom(ReadersBase);

// GReaderUctdtra.fields.js
Readers.Uctdtra = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUctdtra",keys:["ico","ucs","uea_reg","ueb_reg"],[columns]:["ico","ucs","uea_reg","ueb_reg","popis"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Uctdtra.inheritsFrom(ReadersBase);
Fields.uctdtra = (prefabOptions) => { return {data:new Readers.Uctdtra(),[itemTemplate]:"{uea_reg}",[helperColumns]:["uea_reg", "ueb_reg", "popis"],[gridFormat]:[
        { name: "uea_reg", caption: "SU", width: 40 },
        { name: "ueb_reg", caption: "AU", width: 40 },
        { name: "popis", caption: "Popis", width: 40 },
    ],[selector]:(options) => newDefaultSelector($.extend(Selectors.uctdtra(),prefabOptions,options)).show()};};
Selectors.uctdtra = () => { return {data:new Readers.Uctdtra(),[gridOpts]:{
        searchColumns: ["uea_reg", "ueb_reg"]
    },[gridFormat]:[
        { name: "uea_reg", caption: "SU", width: 40 },
        { name: "ueb_reg", caption: "AU", width: 40 },
        { name: "popis", caption: "Popis", width: 40 },
    ],[userSettings]:usRoot+"uctdtra",[isolatedUserSettings]:true};};

// GReaderEkosose.fields.js
Readers.Ekosose = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderEkosose",keys:["ixs_ose"],[columns]:["ixs_ose","aktivita","poznamka","dat_od","dat_do","nazev","zkratka","priz_osv","typ_elem","typ_ose","dat_zmena","zmenu_prov","ixs_kto","rokmes_od","rokmes_do","typ_ose_txt","k_s","aktivita_typ"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Ekosose.inheritsFrom(ReadersBase);
Fields.ekosose = (prefabOptions) => { return {data:new Readers.Ekosose(),[itemTemplate]:"{nazev}",[helperColumns]:["nazev"]};};

// GReaderUctcdrv.fields.js
Readers.Uctcdrv = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUctcdrv",keys:["ktg_ueab"],[columns]:["ktg_ueab","ktg_ueab_txt"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Uctcdrv.inheritsFrom(ReadersBase);
Fields.uctcdrv = (prefabOptions) => { return {data:new Readers.Uctcdrv(),[dropdown]:true,[itemTemplate]:"{ktg_ueab_txt}",[helperColumns]:["ktg_ueab", "ktg_ueab_txt"]};};

// GReaderUctcsud.fields.js
Readers.Uctcsud = function(options) { ReadersBase.call(this,{[readerClass]:rootName+"GReaderUctcsud",keys:["druh_sud"],[columns]:["druh_sud","druh_sud_txt","k_v"],[rowSize]:100,[readAll]:false,[permanent]:false}, options); };
Readers.Uctcsud.inheritsFrom(ReadersBase);
Fields.uctcsud = (prefabOptions) => { return {data:new Readers.Uctcsud(),[dropdown]:true,[itemTemplate]:"{druh_sud_txt}",[helperColumns]:["druh_sud_txt"]};};

//INCLUDE ekoVyberSmlouvy.fields.js
Selectors.EkoVyberSmlouvy = CreateClass(Selectors.BaseSelector, {
  _fieldSettings: {},

  _constructor: function (options) {
    this._base({ content: Gordic.Eko.GVyberSmlouvy, data: null, });

    this._fieldSettings = {
      mode: options.mode || 'sml',
      multi: options.multi || false,
      serverFilters: options.serverFilters,
      canSelectEmpty: options.canSelectEmpty === false ? false : true,
      inputDto: options.inputDto || {},
      canNewAndRefund: options.canNewAndRefund || false,
      related: options.related || options.parentContent,
      init: options.init || null,
      esuLogovani: $.extend({
        // Ixp: 'testIxpVol2',
        // AktZnacka: 'aktZnacka',
        DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani, // vybrat z enumu
        DuvodHledaniTxt: this.isSmlSelect ? 'jres:31750007' : //RC 31750007 : Filtrace při výběru smlouvy/ objednávky/ jiného případu SML.
          'jres:31750008', //RC 31750008 : Filtrace při výběru položky smlouvy/ objednávky/ jiného případu SML.
      }, (options.esuLogovani || {})),
      smlSelectName: options.smlSelectName
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
      var dlg = gdlg.showModalWindow([this.content, { uid: this._fieldSettings.mode === 'sml' ? "ekoVyberSmlouvy#" : "ekoVyberPolozkySmlouvy#" }], this._fieldSettings, options);

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

namespace("Gordic.Prefabs.Select.ItemTemplates", {
    ekoVyberPolozkySmlouvy: function (data) {

        //if (data.isNew || data.rok_smlsden != null) { //pokud je rok_smlsden -> datovy zdroj byly smlouvy a ne polozky
        //    return Gordic.Templates.ensureTemplate((data.ac_sml != null ? "{ac_sml}" : "---") + (data.rok_smlsden != null ? " {rok_smlsden} Nová položka" : " {rok} - Nová položka" )).render(data);
        //} else {
        //    return Gordic.Templates.ensureTemplate((data.ac_sml != null? "{ac_sml}" : "---") +" {rok} {cislo}").render(data);
        //}
        var ac_sml = (data.ac_sml && data.ac_sml.toString() || '').trim();
        return ac_sml ? '{0}-{1}-{2}'.format(ac_sml,
            data.rok_smlsden || data.rok || data.rokPol || data.rok_sml || '',
            data.cislo || data.cislo_sml || ((data.isNew || ac_sml) ? 'jres:31750004' : '')) : ""; //RC 31750004 : Nová položka

    }
});

Fields.ekoVyberSmlouvy = function (userOptions) {
    if (!userOptions || !(userOptions.parentContent || userOptions.related)) {
        throw new GError('ekoVyberSmlouvy needs related option');
  }
    userOptions.related = userOptions.related || userOptions.parentContent

  var result = Fields.smlapid();

  result.helperColumns.splice(1, 0, 'rok_smlsden');
  result.filterMinLength = 2;
  result.data = new Readers.Smlapid2();
  result.selector = function (options) {
      return new Selectors.EkoVyberSmlouvy($.extend({ mode: 'sml' }, userOptions), options).show({parent: this});
  };

  return result;
};

Fields.ekoVyberPolozkySmlouvy = function (userOptions) {

  if (!userOptions || !(userOptions.parentContent || userOptions.related) ) {
        throw new GError('ekoVyberPolozkySmlouvy needs related option');
    }

    userOptions.related = userOptions.related || userOptions.parentContent
  var form = new Gordic.Forms.Form()
    .addSection()
    .addRow('jres:31750025') //RC 31750025 : Smlouva pro novou položku
    .addField('gselectbox', { name: 'ac_sml', });

    var currentOptions = $.extend({ mode: 'smlPol', }, userOptions);
  var smlspolReader = null

    return {

      //modelValueTransform: {
      //    collect: function (value) {
      //        if (typeof value === "string") {
      //            //const splitted = value.split(/- /);
      //            //if (splitted.length == 3) 
      //            //    return { ac_sml: splitted[0], rok: splitted[1], cislo: splitted[2] };
      //            //else if (splitted.length <= 2)
      //            //    return { ac_sml: splitted[0] || void 0, rok: splitted?.[1] || void 0, isNew: true };
      //            //else
      //            return null;
      //        }
      //        return value;
      //    }
      //},
      itemTemplate: Gordic.Prefabs.Select.ItemTemplates.ekoVyberPolozkySmlouvy,
      //function(data) {

    //  //if (data.isNew || data.rok_smlsden != null) { //pokud je rok_smlsden -> datovy zdroj byly smlouvy a ne polozky
    //  //    return Gordic.Templates.ensureTemplate((data.ac_sml != null ? "{ac_sml}" : "---") + (data.rok_smlsden != null ? " {rok_smlsden} Nová položka" : " {rok} - Nová položka" )).render(data);
    //  //} else {
    //  //    return Gordic.Templates.ensureTemplate((data.ac_sml != null? "{ac_sml}" : "---") +" {rok} {cislo}").render(data);
    //  //}
    //      var ac_sml = (data.ac_sml && data.ac_sml.toString() || '').trim();
    //      return '{0}-{1}-{2}'.format(ac_sml,
    //    data.rok_smlsden || data.rok || data.rokPol || '',
    //          data.cislo || ((data.isNew || ac_sml) ? 'jres:31750004' : '')); //RC 31750004 : Nová položka

    //},
    helperCustomizer: function (data) {
      if (currentOptions.canNewAndRefund &&
          (data.length <= 0 || data.findIndex(function (it) { return it.isNew === true; }) < 0)) {
        data.splice(0, 0, { isNew: true, });
      }
      return data;
    },
    helperChoice: function (data) {
      var field = $(this);
      if (data.isNew === true) {
        var newUserOpts;
        if (userOptions.newPolSelectOptions) {
          newUserOpts = userOptions.newPolSelectOptions();
        } else {
          newUserOpts = $.extend({}, userOptions, {
            init: function (inputDto, filters) {
              if (userOptions.init) {
                userOptions.init.apply(userOptions, arguments);
              }
              var filter;
              if (filters.smluvni_pripady) {
                for (var i = filters.smluvni_pripady.length - 1, ii = 0; i >= ii; i--) {
                  filter = filters.smluvni_pripady[i];
                  if (filter >= Gordic.Eko.GVyberSmlouvyPripadyEnum.SVyhovujiciPolozkou &&
                    filter <= Gordic.Eko.GVyberSmlouvyPripadyEnum.ProVratku) {
                    filters.smluvni_pripady.splice(i, 1);
                  }
                }
              } else {
                filters.smluvni_pripady = [];
              }

              filters.smluvni_pripady.push(Gordic.Eko.GVyberSmlouvyPripadyEnum.ProNovouPolozku);
            },
          });
        }

        var opts = $.extend({}, newUserOpts, { mode: 'sml', smlSelectName: 'jres:31750003', }); //RC 31750003 : Vybrat případ pro novou položku

        new Selectors.EkoVyberSmlouvy(opts).show({ parent: this }).then(function (result) {
          data.ixp = result.ixp_sml_pri;
          data.rok = userOptions.inputDto && userOptions.inputDto.rokPol;
          data.ac_sml = result.ac_sml;
          field.gfield('setValue', data);
        });
        return false;
      }
      if(typeof data === "object")
          field.gfield('setValue', data);

      return data;
    },
    helperItemTemplate: function (data) {
      // ( != null && data.nazev.trim().length > 0 ? "{nazev}: " : "") + (data.c != null ? "Částka: {c:number(C2)}" : "")
      if (data.isNew === true) {
        return '<b>jres:31750004</b>'; //RC 31750004 : Nová položka
      }

      var moreInfo = Gordic.Prefabs.Utils.getFormatedLabeledString({ 'jres:31750005': data.nazev && data.nazev.trim(), 'jres:31750006': data.c && data.c.toString().trim(), }); //RC 31750006 : Částka
      var infoStr = '{0}-{1}-{2}'.format((data.ac_sml && data.ac_sml.toString() || '---').trim(), data.rok_smlsden || data.rok || data.rokPol || '', data.cislo || ''); // (data.ac_sml != null ? "{ac_sml}" : "---") + (data.rok_smlsden != null ? " {rok_smlsden}" : " {rok} {cislo}")
      return Gordic.Prefabs.Utils.getInfoNoEncodeStr({ 'info': infoStr, 'more': moreInfo, });

      // pokud je rok_smlsden -> datovy zdroj byly smlouvy a ne polozky
      // return Gordic.Templates.ensureTemplate( + " | " + ).render(data);
    },
        helperColumns: ['displayName', 'ixp', 'nazev','castka'],
        verify: function (value) {
            var verifyValue = value;
            if (typeof value === "object") {
                verifyValue = $.extend({}, value);
                verifyValue.ixp = value.ixp ?? value.ixp_sml_pri;
                verifyValue.rok = value.rok ?? value.rok_pol;
            }
            return (smlspolReader = smlspolReader || new Gordic.Data.Readers.Smlspol()).verify(verifyValue, $(this));
        },
    data: function () {
      var prepared = Gordic.Eko.GVyberSmlouvy.prepareInputDtoAndDefaultFilter(currentOptions);
      var filterProm = Gordic.Eko.GVyberSmlouvy.prepareFilter(prepared.defaultFilter, currentOptions.serverFilters || {}, currentOptions.inputDto.prijmy ? currentOptions.inputDto.prijmy() : null);
      return filterProm.then(function (filter) {
        return userOptions.related.createServiceContent({
          className: 'Gordic.Eko.WebClient.GVyberSmlouvy',
          serverParams: { inputDto: prepared.inputDto, },
        })
          .call('LoadSmlPolDirect', {
            filter: filter,
          }).then(function (responseDto) {
              for (let i = 0, ii = responseDto.data.length; i < ii; i++) {
                  let item = responseDto.data[i];
                  item.displayName = '{0}-{1}-{2}'.format((item.ac_sml && item.ac_sml.toString() || '---').trim(), item.rok_smlsden || item.rok || item.rokPol || '', item.cislo || '')
              }
              return new Gordic.Data.View(responseDto.data, {key:"ixp,rok,cislo"});
          });
      });
    },
    selector: function (options) {
        return new Selectors.EkoVyberSmlouvy(currentOptions, options).show({parent: this});
    },
    // buttons: [{ name: "btnNewPol", action: new GAction({ name: "actNewPol", run: function () { } }), enabled: options.canNewAndRefund }],
    // factors: [{ caption: "E", tooltip:"Existující", factor: 0}, { caption: "N", tooltip:"Nová", factor: 1 }],
    //  factorChange: function (ev, ctx) { $(this).gfield("option", "data", ctx.factor === 0 ? new Readers.Smlspol() : new Readers.Smlapid2()); $(this).gfield("clear");},
    // form: form,
    // mode:"inlineimmediate"
  };
};


//INCLUDE prefabForms.fields.js
var Forms = namespace("Gordic.Prefabs.Selector.Forms");

//#region Forms
Forms.getKofspolForm = function (isEdit) {
    var date = new Date();
    var month = date.getMonth() + 1;

    var strDate = "{0}{1}".format(date.getFullYear(), month > 9 ? month : "0" + month)
    return new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0, breaks-500-1000" })
        .addSection()
        .addRow({ label: "jres:31850020", required: !isEdit }).addField("gstringbox", { name: "kod_pol", disabled: isEdit, validators: isEdit? [] : [new Gordic.Validators.Required()] }) //RC 31850020 : Kód položky


        
        .addRow({ label: "jres:31850037", required: !isEdit }).addField("gselectbox", { name: "typ_pol", dropdown: true, initialValue: { text: "jres:31850021", value: 0 }, disabled: true, itemTemplate: "{text}", model: "model.typ_pol<=value.value" }) //RC 31850037 : Typ položky
        .addRow({ label: "jres:31850022", required: true }).addField("gstringbox", { name: "nazev", validators: [new Gordic.Validators.Required()] }) //RC 31850022 : Název položky
        .addRow({ label: "jres:31850023", required: true }).addField("gnumberbox", Gordic.Eko.Prefabs.Fields.currency({ name: "cmj" })) //RC 31850023 : Cena za MJ bez DPH
        .addRow({ label: "jres:31850024", required: true }).addField("gnumberbox", Gordic.Eko.Prefabs.Fields.currency({ name: "obch_pri" })) //RC 31850024 : Přirážka (+) sleva (-) v %
        .addRow({ label: "jres:31850025", required: true }).addField("gselectbox", Gordic.Prefabs.Select.gincmej(), { initialValue: { mj: 0 }, name: "mj", model: "model.mj<=value.mj_zkr", validators: [new Gordic.Validators.Required()]  }) //RC 31850025 : Měrná jednotka
        .addRow({ label: "jres:31850026", required: true }).addField("gselectbox", Gordic.Prefabs.Select.ekocdap(), {
            validators: [new Gordic.Validators.Required()],
            name: "dan_proc", model: "model.dan_proc=value.dan_proc", dropdown: true, serverFilters: {
                rokmes_od: "<= " + strDate , rokmes_do: ">= " + strDate
            }, change: function (ev, val) {
                if (val.value) {
                    $.content(this).findFields("sazba_dph_proc").gfield("setValue", new Decimal(val.value.dan_proc))
                }
            }
        }) //RC 31850026 : Sazba DPH
        .addRow({ label: "jres:31850038" }).addField("gnumberbox", Gordic.Eko.Prefabs.Fields.currency({ name: "sazba_dph_proc" })) //RC 31850038 : Sazba DPH v %
        .addRow({ label: "jres:31850039", required: true }).addField("gselectbox", Gordic.Prefabs.Select.gincakt(), { //RC 31850039 : Aktivita
            name: "aktivita",
            initialValue: isEdit ? null : { aktivita: 100, aktivita_txt: "aktivní"  },
            dropdown: true,
            model:"model.aktivita=value.aktivita"
        }).addField("gdummyfield", "w-h",{name:"ico"});
}
//#endregion

})(jQuery);

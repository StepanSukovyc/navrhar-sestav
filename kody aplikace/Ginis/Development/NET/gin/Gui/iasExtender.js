/* GORDIC Inteligentni Assistent */
"use strict";
//$(document).ready(function () {

//});
//$(window).load(function () {

//});




(function ($) {
 
    /* ======================================================= */
    /* GWebAppBase extension */
    /* ======================================================= */
    var uuid = 1;
    namespace("Gordic.WebApp.IASExtender", {
        onWebAppReadyIas: function (result) {
            var _this = this;

            this.ias = true;

            this.iasFieldAssistStart();
        },
        iasFieldAssistHelper: function () {
            var _this = this; 

            var form = new Gordic.Forms.Form("LMS-0-12-0")
                .addRow().addText("jres:25000109".format("<img src='gin/img/iasFieldAssist.png' style='width:300px; float:left; margin:1rem;'/>")) //RC 25000109 : <h4>Inteligentní asistent - Oblíbené hodnoty formuláře</h4>{0}<br>Pomůcka pro vyplňování hodnot ve formuláři. Každé vhodné políčko umožňuje využít extra nápovědu obsahující poslední zadané hodnoty a umožňuje uložit oblíbené hodnoty daného políčka.<br><br>Přístup k extra nápovědě se provádí klávesovou zkratkou <b>Ctrl&nbsp;+&nbsp;Mezerník</b> nebo <b>delším podržením pravého tlačítka myši</b>. U políček podporujících extra nápovědu je po najetí zobrazena malá ikona Inteligentního asistenta v pravém dolním rohu.
                .addRow().addField("gcheck", { name: "enabled", initialValue: true, label: "jres:25000110" }) //RC 25000110 : Zapnout funkci Oblíbené hodnoty formuláře
                .addRow().addText(null, "w-1").addField("gcheck", "w-11", { name: "fieldTagVisible", initialValue: true, label: "jres:25000111" }); //RC 25000111 : Zobrazovat indikátor na políčkách
            var options = this.globalSettings.get("Global.core.IAS.FieldAssist");
            GDlg.simpleForm("jres:25000112", form, options, { width: 760, height: 460 }) //RC 25000112 : Inteligentní assistent
                .on("close", function (ev, data) {
                    if (data) {
                        _this.globalSettings.merge("Global.core.IAS.FieldAssist", data);
                        _this.iasFieldAssistRefresh();
                    }
                });
        },
        iasFieldAssistStart: function () {
            var _this = this;
            if (this._iasFieldAssist) return; 

            // IASSTOR 
            if (this.iasSettingsStor);  // predplnene nekde jinde v onContentReady 
            else if (this.iasSettingsData == null)
                this.iasSettingsStor = new Gordic.Data.Storage({}, { locked: true }); // neukladana verze pokud neni pouzit vychozi mechanizmus GINIS nastaveni
            else 
                this.iasSettingsStor = new Gordic.Data.Storage(this.iasSettingsData, {
                    saveWaiting: 15000,
                    saveDelay: 60000,
                    save: function (data) {
                        _this.isl.UserCustomStorage.upsert({ sxs_una: "global.iasFieldAssist", obsah: b64EncodeUnicode(JSON.stringify(data)) }).get(null, { fire: _this._iasFieldAssist === null });
                    }
                });

            // START IAS
            this._iasFieldAssist = new Gordic.Components.GFieldAssist($(document.body), this.iasSettingsStor);
            this.iasFieldAssistRefresh();
            this.applicationEnd(function () {
                _this._iasFieldAssist && _this._iasFieldAssist.destroy();
                _this._iasFieldAssist = null;
                _this.iasSettingsStor.save(true); // muzeme ponechat naplnene, opetovne volani Start by recyklovalo znovu recyklovalo jiz vytvoreny store
            });
            // PROTOTYP

            /*$(document.body).on("focusin", ".gcontrolbox", function (ev) {
                $(this).gfield("tag", { id: "ias", text: "<i class='gi gi-ias bold'/>", state: "info", tooltip: "IA", action: new GAction({ name: "actIASFieldAssistShow", run: $.noop }) });
            });
            $(document.body).on("focusout", ".gcontrolbox", function (ev) {
                $(this).gfield("tag", { id: "ias", text: null });
            });*/
        },
        iasFieldAssistRefresh: function () {
            if (!this._iasFieldAssist) return; 

            var options = this.globalSettings.apply({ enabled: true, fieldTagVisible: true }, "Global.core.IAS.FieldAssist");
            this._iasFieldAssist.enable(options);
        }
    });
})(jQuery);

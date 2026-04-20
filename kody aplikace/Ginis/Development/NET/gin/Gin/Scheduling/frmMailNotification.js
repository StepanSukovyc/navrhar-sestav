///<reference path="../../../Scripts/_references.js" />

(function ($) {
    "use strict";

    //#region Static data

    var makePackageData = [
        { c: "jres:31110018", v: "No" }, //RC 31110018 : Ne
        { c: "jres:31110019", v: "Yes" }, //RC 31110019 : Ano
        { c: "jres:31110020", v: "BigOnly" }]; //RC 31110020 : Velké soubory

    var dmsZpus = [
        { c: "jres:31110047", v: 0,  class: "js-dms-zp-0" }, //RC 31110047 : Neevidovaný výstup
        { c: "jres:31110049", v: 10, class: "js-dms-zp-10" }, //RC 31110049 : Elektronický obraz
        { c: "jres:31110048", v: 20, class: "js-dms-zp-20" }, //RC 31110048 : Elektronická příloha
        { c: "jres:31110050", v: 30, class: "js-dms-zp-30" }, //RC 31110050 : Evidovaný výstup
        { c: "jres:31110051", v: 40, class: "js-dms-zp-40" } //RC 31110051 : Nový dokument
    ];

    //#endregion


    var defaultOptions = {
        modelPath: "",
        fileSaveDisabled: false,
        sendMailDisabled: false,
        eventInvocationDisabled: false,
        dmsSaveDisabled: false
    };

    namespace("Gordic.Gin.frmMailNotification", function (opts) {
        opts = $.extend({}, defaultOptions, opts);

        if (opts.modelPath && opts.modelPath[opts.modelPath.length] !== '.')
            opts.modelPath += ".";

        var frm = new Gordic.Forms.Form(opts);
        frm.addSection()
            .addSection("jres:31110031")//RC 31110031 : Uložit do souboru
                .addRow()
                    .addField("gcheck", { name: "ShouldSaveFile", 
                        model: opts.modelPath + "ShouldSaveFile=value",
                        defaultValue: null, //kvuli vyvolani change()
                        label: "jres:31110034", //RC 31110034 : Uložit do souboru v přednastaveném adresáři
                        disabled: opts.fileSaveDisabled
                    })
                .addRow({ 
                    label: "jres:31110032", //RC 31110032 : Přednastavený adresář
                    hint: "jres:31110062"  //RC 31110062 : Adresář je nastaven databázovým parametrem gin_grr_odlfil nebo klíčem Reporter-schedule-path v souboru web.config.
                    }) 
                    .addField("gstringbox", { name: "SchedulePath", model: opts.modelPath + "SchedulePath", disabled: true })
                .addRow({ label: "jres:31110033" }) //RC 31110033 : Název souboru
                    .addField("gstringbox", {
                        name: "FileName",
                        model: opts.modelPath + "FileName",
                        validators: [
                            new Gordic.Validators.Base({
                                message: "jres:31110045", //RC 31110045 : Povinná hodnota
                                validate: function (value, field) {
                                    var shouldSaveFile = field.closest(".gform").findFields("ShouldSaveFile").gfield("getValue");
                                    if (!shouldSaveFile) return true;
                                    return !!value;
                                }
                            })
                        ]
                    })
            
            .addSection("jres:31110046") //RC 31110046 : Uložit do Workflow / SSL
                .addRow("jres:31110052") //RC 31110052 : Způsob uložení
                    .addField("gselectbox", {
                        name: "DmsZpusob",
                        model: opts.modelPath + "DmsZpus=value.v",
                        data: new Gordic.Data.View(dmsZpus, { key: "v" }),
                        defaultValue: dmsZpus[0],
                        itemTemplate: "{c}",
                        dropdown: true,
                        disabled: opts.dmsSaveDisabled,
                        change: function (ev, o) {
                            var c = o && o.value ? o.value.class : null;
                            var v = o && o.value ? o.value.v : null;

                            var form = $(ev.target).closest(".gform");
                            form.find(".js-dms").addClass("hidden");

                            if (!c) return;

                            form.find("." + c).removeClass("hidden");

                            if (typeof v !== "undefined") {
                                form.findFields("DmsTypDok,DmsFun,DmsSpisPl")
                                    .gfield("resetValidations")
                                    .gfield("option", "validators", v === 40 ? [new Gordic.Validators.Required()] : []); //40 = Novy dokument
                            }
                        }
                    })
                .addRow({ label:"jres:31110053", customClass: "js-dms js-dms-zp-10 js-dms-zp-20 hidden" }) //RC 31110053 : K dokumentu
                    .addField("gstringbox", "w-6", { name: "DmsPid1", model: opts.modelPath + "DmsPid1=value" })
                    .addField("gcheck", "w-3", { name: "DmsSign", model: opts.modelPath + "DmsSign", label: "jres:31110054" }) //RC 31110054 : Podepsat
                    .addField("gcheck", "w-3", { name: "DmsTimestamp", model: opts.modelPath + "DmsTimestamp", label: "jres:31110055" }) //RC 31110055 : Časové razítko
                .addRow({ label: "jres:31110056", customClass: "js-dms js-dms-zp-40 hidden" }) //RC 31110056 : Typ dokumentu
                    .addField("gselectbox", "w-4", Gordic.Prefabs.Select.sslstyp(), { name: "DmsTypDok", model: opts.modelPath + "DmsTypDok=value.ixs_typ" })
                    .addField("gcheck", "w-4", { name: "DmsSign2", model: opts.modelPath + "DmsSign2", label: "jres:31110054" }) //RC 31110054 : Podepsat
                    .addField("gcheck", "w-4", { name: "DmsTimestamp2", model: opts.modelPath + "DmsTimestamp2", label: "jres:31110055" }) //RC 31110055 : Časové razítko
                .addRow({ label: "jres:31110057", customClass: "js-dms js-dms-zp-40 hidden" }) //RC 31110057 : Související s
                    .addField("gstringbox", { name: "DmsPid2", model: opts.modelPath + "DmsPid2=value" })
                .addRow({ label: "jres:31110058", customClass: "js-dms js-dms-zp-40 hidden" }) //RC 31110058 : Název
                    .addField("gstringbox", { name: "DmsBody", model: opts.modelPath + "DmsBody=value" })
                .addRow({ label: "jres:31110059", customClass: "js-dms js-dms-zp-40 hidden" }) //RC 31110059 : Značka
                    .addField("gstringbox", { name: "DmsPoznamka", model: opts.modelPath + "DmsPoznamka=value" })
                .addRow({ label: "jres:31110060", customClass: "js-dms js-dms-zp-40 hidden" }) //RC 31110060 : Předat funkci
                    .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), { name: "DmsFun", model: opts.modelPath + "DmsFun=value.ixs_fun" })
                .addRow({ label: "jres:31110061", customClass: "js-dms js-dms-zp-40 hidden" }) //RC 31110061 : Spisový znak
                    .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sslsspl(), {
                        name: "DmsSpisPl",
                        model: opts.modelPath + "DmsSpisPl=value.spis_pl"
                    })
                    .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sslsspz(), {
                        name: "DmsSpisZn",
                        model: opts.modelPath + "DmsSpisZn=value.spis_znak",
                        serverFilters: {
                            spis_pl: new Gordic.Forms.Dependency("DmsSpisPl", "spis_pl")
                        }
                    })
            .addSection("jres:31110030") //RC 31110030 : Poslat email
                .addRow({ name: "", label: "jres:31110021" }) //RC 31110021 : Adresáti
                    .addField("gselectbox", "w-12", Gordic.Prefabs.Select.gmail(), {
                        name: "Recipients",
                        model: opts.modelPath + "Recipients",
                        disabled: opts.sendMailDisabled
                    })
                .addRow({ label: "jres:31110022" }).addField("gstringbox", { name: "Subject", model: opts.modelPath + "Subject", disabled: opts.sendMailDisabled }) //RC 31110022 : Předmět
                .addRow({ label: "jres:31110023" }) //RC 31110023 : Komprimovat
                    .addField("gselectbox", "w-6", {
                        name: "MakePackage",
                        model: opts.modelPath + "MakePackage=value.v",
                        disabled: opts.sendMailDisabled,
                        data: new Gordic.Data.View(makePackageData, { key: "v" }),
                        initialValue: makePackageData[0],
                        itemTemplate: "{c}",
                        dropdown: true
                    })
                .addRow({ label: "jres:31110024" }).addField("gstringbox", { name: "Content", model: opts.modelPath + "Content", disabled: opts.sendMailDisabled, rows: 4 }) //RC 31110024 : Obsah
            .addSection("jres:31110037") //RC 31110037 : Vyvolat událost 
                .addRow("jres:31110036") //RC 31110036 : Událost
                    .addField("gselectbox", Gordic.Prefabs.Select.gincuda(), {
                        name: "uda_uda",
                        model: opts.modelPath + "IdUda=value.id_uda",
                        disabled: opts.eventInvocationDisabled
                    })
            ;

        return frm;
    });
})(jQuery);
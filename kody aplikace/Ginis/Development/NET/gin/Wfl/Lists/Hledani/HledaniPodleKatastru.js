(function ($) {
    "use strict";
    namespace("Gordic.Wfl.Hledani.HledaniPodleKatastru", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26228123"; //RC 26228123 : Hledání katastrů

            var dateFactors = [
                { caption: "jres:26225290", factor: "DP" }, //RC 26225290 : Datum podání
            ];

            var filterForm = new Gordic.Forms.Form({ name: "FormHledaniKatastru", tabLabel: "jres:26227188", layoutDescriptor: "L2M2S1, L-4-7-1, M-12-11-1, S-12-11-1" })
                .addSection()
                .addRow({ label: "jres:26228124", required: true }) //RC 26228124 : Katastrální území
                .addField("gselectbox",
                    Gordic.Prefabs.Select.agpscka(),
                    {
                        name: "katastralniUzemiField",
                        model: "CisKatastr = cis_katastr",
                        //favoriteRequiredFields: ["praha110Field", "mestskaCastField"], // namePrvnihoFielduVRadku nebo nameRadku
                    })

                .addRow({ label: "jres:26228125", required: true }) //RC 26228125 : Praha 1 - 10
                .addField("gselectbox",
                    Gordic.Prefabs.Select.agpsmca(),
                    {
                        name: "praha110Field",
                        model: "CisMc = cis_mc",
                        //favoriteRequiredFields: ["katastralniUzemiField", "mestskaCastField"], // namePrvnihoFielduVRadku nebo nameRadku
                    })

                .addRow({ label: "jres:26228126", required: true }) //RC 26228126 : Městská část
                .addField("gselectbox",
                    Gordic.Prefabs.Select.agpscam(),
                    {
                        name: "mestskaCastField",
                        model: "CisCam = cis_cam",
                        //favoriteRequiredFields: ["katastralniUzemiField", "praha110Field"], // namePrvnihoFielduVRadku nebo nameRadku
                    })

                .addRow({ label: "jres:26228127", required: true }) //RC 26228127 : Parcelní číslo
                .addField("gnumberbox", "w-6", {
                    name: "cisloParcely1Field",
                    model: "CisloParcely1",
                    initialValue: this.model.CisloParcely1,
                    emptyValue: "",
                    defaultValue: "",
                    minValue: 0,
                    maxValue: 9999,
                    step: 1,
                })
                .addField("gnumberbox", "w-6", {
                    name: "cisloParcely2Field",
                    model: "CisloParcely2",
                    initialValue: this.model.CisloParcely2,
                    emptyValue: "",
                    defaultValue: "",
                    minValue: 0,
                    maxValue: 9999,
                    step: 1,
                })

                .addRow({ label: "jres:26228128" }) //RC 26228128 : Číslo popisné
                .addField("gstringbox", {
                    name: "cisloPopisneField",
                    model: "CisloPopisne",
                    initialValue: this.model.CisloPopisne
                })

                .addRow({ label: "jres:26225312" }) //RC 26225312 : Poznámka
                .addField("gstringbox", {
                    name: "poznamkaField",
                    model: "Poznamka",
                    initialValue: this.model.Poznamka,
                    //validators: [
                    //    {
                    //        "message": "jres:26227184", //RC 26227184 : Musíte zadat minimálně 2 znaky.
                    //        "validate": function (value, changeObj) {
                    //            return value !== null && value.length >= 2;
                    //        },
                    //        "group": "customValidation"
                    //    }
                    //],
                    favoriteRequiredFields: ["suField", "dateIntervalField"] // namePrvnihoFielduVRadku nebo nameRadku
                })
                .addRow({ label: "jres:26225535", favoriteRowLayoutDescriptor: "w-L-6 w-M-8 w-S-12" }) //RC 26225535 : Vlastník
                .addField("gselectbox", "w-5", Gordic.Gin.Fields.ginspodSSU(
                {
                    name: "suField",
                    initialValue: { ixs_su: this.model.IxsSuVlastnik },
                    model: "IxsSuVlastnik = ixs_su",
                    serverFilters: {
                        aktivita: [100, 500],
                    },
                    validators: [
                        {
                            "message": "jres:26227183", //RC 26227183 : Zadejte vlastníka nebo datum podání.
                            "validate": function (value, changeObj) {
                                return that.ValidateCustomFields(value, changeObj);
                            },
                            "group": "customValidation"
                        }
                    ],
                    favoriteRequiredFields: ["poznamkaField", "dateIntervalField"] // namePrvnihoFielduVRadku nebo nameRadku
                    }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.BEZNE))
                .addField("gselectbox", "w-7", Gordic.Gin.Fields.ginsfunSSU(
                {
                    name: "funField",
                    initialValue: { ixs_fun: this.model.IxsFunVlastnik },
                    model: "IxsFunVlastnik = ixs_fun",
                    serverFilters: {
                        aktivita: [100, 500],
                        //  VazbaNaSpisovyDenik: l_bVazbaNaSpisDenik,
                        ixs_su: new Gordic.Forms.Dependency("suField", "ixs_su")
                    },
                    }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.BEZNE, "suField"))
                .addRow({ label: "jres:26227174", favoriteRowLayoutDescriptor: "w-L-6 w-M-8 w-S-12" }) //RC 26227174 : Od-do
                .addField("gdatecombobox", {
                    contextMenu: { daysRange: 60 },
                    userSettings: this.userSettings,
                    name: "dateIntervalField",
                    defaultInitialValue: this.model.DateInterval,
                    model: "model.DateInterval=value; model.DatumAplikovatNa=factor",
                    customClass: "js-interval",
                    daysRangeMax: that.DaysRangeMax,
                    factors: dateFactors,
                    validators: [
                        {
                            "message": "jres:26227183", //RC 26227183 : Zadejte vlastníka nebo datum podání.
                            "validate": function (value, changeObj) {
                                return that.ValidateCustomFields(value, changeObj);
                            },
                            "group": "customValidation"
                        }
                    ],
                    favoriteRequiredFields: ["poznamkaField", "suField"] // namePrvnihoFielduVRadku nebo nameRadku
                })
                .addPrefab(Gordic.Wfl.Prefabs.FilterHledaniTypDb({
                    name: "filterHledaniTypDb",
                    //  label: "jres:26255267",
                    initialValue: this.model.TypDatabase,
                    model: "model.TypDatabase=value.id",
                }));

            this.$filterForm = $("<div>")
                .appendTo(this.element)
                .gfilterpanel({
                    forms: [filterForm],                                                  //predani definic formularu
                    favorites: ["katastralniUzemiField", "praha110Field", "mestskaCastField", "cisloParcely1Field", "cisloParcely2Field", "cisloPopisneField", "poznamkaField", "suField", "dateIntervalField"],        //defaulty oblibenych polozek - udava se name radku, nebo name prvniho prvku v radku (nefunguje uvedeni name policka, pokud lezi na radku s definovanym name)
                    tema: "ssl_ptm_hledpoz",
                    //#region Pouziti standardni storage service pro ulozene filtry
                    filterStorageService: new Gordic.Gin.FilterStorageService.Store(),       //standardni sluzba pro pristup k ulozenym filtrum
                    saveOptionsForm: "all",                                                  // připravené ukládací formuláře  „all“ / „eko“
                    userDefaultFilter: true,                                                 // default true,  hvězda v selectboxu, přes kterou jde ukládat defaultní filter, podle kterého se vyhledá hned při načtení detailu (později bude řešené asi přes tři tečky). Pro správnou funkci je potřeba přesunout definici listeneru ještě nad definici gfilterpanelu
                    favoriteLayoutDescriptor: "L4M3S1",
                    //#endregion
                    validators: this.validators,
                    autoLoadAfter: Gordic.Wfl.Utils.AutoLoadAfterUS(this.globalSettings),
                    apply: function (event, obj) {                                           //funkce volana v momente, kdy uzivatel klepne na tlac. filtrovat
                        // console.log("filterForm.apply", obj);
                        that.Reload(obj.filter);                                  //pristup k datum z gfilterpanelu (DTO filtru)
                    }
                });

            //this.$filterForm.gfilterpanel("applyFilter", null, true, true); //dsebesta na odebrán model 19.5.2020

            this.PrepareHledani();
        },
        ValidateCustomFields: function (value, changeObj) {
            var formData = {};
          //  this.findFields().gfield("model", "collect", formData);
            $(changeObj).gform().findFields().gfield("model", "collect", formData);

            var intervalValid = false;
            var vlastnikValid = formData.IxsSuVlastnik !== null && formData.IxsSuVlastnik !== "";

            if(formData.DateInterval !== null) {
                if (formData.DateInterval.date.start !== null && formData.DateInterval.date.end !== null) {
                    intervalValid = true;
                }
            }

            if(vlastnikValid || intervalValid) {
                return true;
            } else {
                return false;
            }
        }


    }, { extendIntellisense: GContent });
})(jQuery);
(function ($) {
    "use strict";
    namespace("Gordic.Wfl.Hledani.HledaniPodleVeci", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26225123"; //RC 26225123 : Hledání podle věci

            this.loadGridImmediately = false;

            var dateFactors = [
                { caption: "jres:26225290", factor: "DP" }, //RC 26225290 : Datum podání
            ];

            var filterForm = new Gordic.Forms.Form({ name: "FormHledaniVec", tabLabel: "jres:26227188", layoutDescriptor: "L2M2S1, L-4-7-1, M-12-11-1, S-12-11-1" })
                .addSection()
                .addRow({ label: "jres:26225443", required: true }) //RC 26225443 : Věc
                .addField("gstringbox", {
                    name: "vecField",
                    //model: "Vec", //NOTE (BM 2024-08-22): Model tu byl duplicitne, coz je spatne dle striktniho modu JS!!!
                    model: "model.Vec=value; model.ZpusobHledaniVeci=factor",
                    initialValue: this.model.Vec,
                    //validators: [
                    //    {
                    //        "message": "jres:26227184", //RC 26227184 : Musíte zadat minimálně 2 znaky.
                    //        "validate": function (value, changeObj) {
                    //            return value !== null && value.length >= 2;
                    //        },
                    //        "group": "customValidation"
                    //    }
                    //],
                    factors: [
                        { caption: "jres:26228022", factor: "VZ" }, //RC 26228022 : Začíná na
                        { caption: "jres:26228023", factor: "VO" } //RC 26228023 : Obsahuje
                    ],
                    favoriteRequiredFields: ["suField", "dateIntervalField"] // namePrvnihoFielduVRadku nebo nameRadku
                })
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
                    favoriteRequiredFields: ["vecField", "suField"] // namePrvnihoFielduVRadku nebo nameRadku
                })
                .addPrefab(Gordic.Wfl.Prefabs.FilterUpresneniHledani({
                    name: "filterUpresneniHledani",
                    //  label: "jres:26255267",
                    initialValue: this.model.UpresneniFilter,
                    model: "model.UpresneniFilter=value.id",
                    VecPodrobneVisible: true,
                    DiaktitikaVisible: true,
                    VlastnikHistorickyVisible: true,
                }))
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
                    favoriteRequiredFields: ["vecField", "dateIntervalField"] // namePrvnihoFielduVRadku nebo nameRadku
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
                    }
                }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.BEZNE, "suField"))
                .addPrefab(Gordic.Wfl.Prefabs.FilterHledaniTypDb({
                    name: "filterHledaniTypDb",
                    //  label: "jres:26255267",
                    initialValue: this.model.TypDatabase,
                    model: "model.TypDatabase=value.id",
                }))
                .addRow() //RC 26227177 : Nápověda
                .addField("gloadlink", {
                    caption: "jres:26227177", //RC 26227177 : Nápověda
                    /* serverClass: "Gordic.Uka.WebClient.GloadLink",
                     methodName: "LoadLinkClass",*/
                    load: function(parentDiv) {
                        $("<span>jres:26225552</span>").appendTo(parentDiv) //RC 26225552 : Ve věci je nutné vyplnit minimálně 2 znaky, k tomu je nutné vyplnit vlastníka (aktuální lokalizace dokumentu nebo spisu), nebo datum podání.

                        /* var form = $("<div>").appendTo(obj.parentDiv);
                         var Form = new Gordic.Forms.Form("L1M1S1, L-12-12-0 , M-12-12-0, S-12-12-0, breaks-800-1000");

                         Form.addRow("jres:26225552"); //RC 26225552 : Ve věci je nutné vyplnit minimálně 2 znaky, k tomu je nutné vyplnit vlastníka (aktuální lokalizace dokumentu nebo spisu), nebo datum podání.
                         form.gform("createFrom", Form);*/
                    }
                });

            this.$filterForm = $("<div>")
                .appendTo(this.element)
                .gfilterpanel({
                    forms: [filterForm],                                                  //predani definic formularu
                    favorites: ["vecField", "suField", "dateIntervalField"],  //defaulty oblibenych polozek - udava se name radku, nebo name prvniho prvku v radku (nefunguje uvedeni name policka, pokud lezi na radku s definovanym name)
                    tema: "ssl_ptm_hledvec",
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
        ValidateCustomFields: function(value, changeObj) {
            var formData = {};
           // this.findFields().gfield("model", "collect", formData);
            $(changeObj).gform().findFields().gfield("model", "collect", formData);

            var intervalValid = false;

            if(formData.DateInterval !== null) {
                if (formData.DateInterval.date.start !== null && formData.DateInterval.end !== null) {
                    intervalValid = true;
                }
            }

            if ((formData.IxsSuVlastnik === null || formData.IxsSuVlastnik === "") && !intervalValid) {
                return false;
            } else {
                return true;
            }
        }



    }, { extendIntellisense: GContent });
})(jQuery);
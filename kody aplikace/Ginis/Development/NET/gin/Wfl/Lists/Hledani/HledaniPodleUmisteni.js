(function ($) {
    "use strict";
    namespace("Gordic.Wfl.Hledani.HledaniPodleUmisteni", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26225129"; //RC 26225129 : Hledání podle umístění

            var dateFactors = [
                { caption: "jres:26225290", factor: "DP" }, //RC 26225290 : Datum podání
            ];

            var filterForm = new Gordic.Forms.Form({ name: "FormHledaniUmisteni", tabLabel: "jres:26227188", layoutDescriptor: "L2M2S1, L-4-7-1, M-12-11-1, S-12-11-1" })
                .addSection()
                .addRow({ label: "jres:26225810" }) //RC 26225810 : Umístění

            filterForm
                .addField("gselectbox", 
                Gordic.Prefabs.Select.sslsumi(),
                {
                    name: "umisteniField",
                    model: "Umisteni = umisteni",
                    serverFilters: {
                        AktualStrediskoSU: true,
                    },
                    //itemTemplate: function (value) {
                    //    if (value) {
                    //        return "" + value.umisteni_txt + (value.poznamka ? (" - " + value.poznamka) : "");
                    //    }
                    //}, 
                    validators: [
                        {
                            "message": "jres:32000754", //RC 32000754 : Pokud nechcete vyplnit pole, zaškrtněte políčko "Umístění není vyplněno".
                            "validate": function (value, changeObj) {
                                that.findFields("umisteniField").gfield("resetErrors");
                                return that.validateUmisteni(value, changeObj);
                            },
                            "group": "customValidation"
                        }
                    ],
                    favoriteRequiredFields: ["filterUpresneniHledani", "dateIntervalField"], // namePrvnihoFielduVRadku nebo nameRadku
                    change: function (ev, obj) {
                        if(obj.value != null)
                            that.findFields("filterUpresneniHledani").gfield("clear");
                    }
                })

            filterForm
                .addPrefab(Gordic.Wfl.Prefabs.FilterUpresneniHledani({
                    name: "filterUpresneniHledani",
                    //  label: "jres:26255267",
                    initialValue: this.model.UpresneniFilter,
                    model: "model.UpresneniFilter=value.id",
                    VlastnikHistorickyVisible: true,
                    NevyplnenoUmisteniVisible: true,
                    favoriteRequiredFields: ["umisteniField", "dateIntervalField"], // namePrvnihoFielduVRadku nebo nameRadku
                    change: function (ev, selected) {
                        var sel = selected.value;

                        // v es6 by slo resit destrukturalizaci
                        for(var i = 0; i < sel.length; i++) {
                            if (sel[i].id == 14) {
                                // v pripade zaskrtnuti volby 'umisteni nevyplneno', vymazu obsah policka Umisteni
                                that.findFields("umisteniField").gfield("clear");
                                break;
                            }
                        }
                    },
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

            filterForm
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
                            "message": "jres:26228011", //RC 26228011 : V případě nevyplnění pole "Umístění" je maximální rozsah intervalu 1 rok.
                            "validate": function (value, changeObj) {
                                that.findFields("dateIntervalField").gfield("resetErrors");
                                return that.validateDateInterval(value, changeObj);
                            },
                            "group": "customValidation"
                        }
                    ],
                    favoriteRequiredFields: ["umisteniField", "filterUpresneniHledani"] // namePrvnihoFielduVRadku nebo nameRadku
                })
                .addPrefab(Gordic.Wfl.Prefabs.FilterHledaniSkupina({
                    name: "filterSkupinaHledani",
                    //  label: "jres:26255267",
                    initialValue: this.model.SkupinaFilter,
                    model: "model.SkupinaFilter=value.id",
                }))
                .addPrefab(Gordic.Wfl.Prefabs.FilterHledaniTypDb({
                    name: "filterHledaniTypDb",
                    //  label: "jres:26255267",
                    initialValue: this.model.TypDatabase,
                    model: "model.TypDatabase=value.id",
                    validators: [new Gordic.Validators.Required()]
                }))
                .addRow() //RC 26227177 : Nápověda
                .addField("gloadlink", {
                    caption: "jres:26227177", //RC 26227177 : Nápověda
                    /* serverClass: "Gordic.Uka.WebClient.GloadLink",
                     methodName: "LoadLinkClass",*/
                    load: function(parentDiv) {
                        $("<span>jres:26225551</span>").appendTo(parentDiv) //RC 26225551 : Při tomto hledání musí být vyplněno umístění. Pokud není vyplněno, je třeba zadat datum podání s maximálním rozsahem 1 rok.
                    }
                });

            this.$filterForm = $("<div>")
                .appendTo(this.element)
                .gfilterpanel({
                    forms: [filterForm],                                                  //predani definic formularu
                    favorites: ["umisteniField", "suField", "dateIntervalField", "filterUpresneniHledani"],  //defaulty oblibenych polozek - udava se name radku, nebo name prvniho prvku v radku (nefunguje uvedeni name policka, pokud lezi na radku s definovanym name)
                    tema: "ssl_ptm_hledumi",
                    //#region Pouziti standardni storage service pro ulozene filtry
                    filterStorageService: new Gordic.Gin.FilterStorageService.Store(),       //standardni sluzba pro pristup k ulozenym filtrum
                    saveOptionsForm: "all",                                                  // připravené ukládací formuláře  „all“ / „eko“
                    userDefaultFilter: true,                                                 // default true,  hvězda v selectboxu, přes kterou jde ukládat defaultní filter, podle kterého se vyhledá hned při načtení detailu (později bude řešené asi přes tři tečky). Pro správnou funkci je potřeba přesunout definici listeneru ještě nad definici gfilterpanelu
                    favoriteLayoutDescriptor: "L4M3S1",
                    //#endregion
                    //validators: this.validators,
                    autoLoadAfter: Gordic.Wfl.Utils.AutoLoadAfterUS(this.globalSettings),
                    apply: function (event, obj) {                                           //funkce volana v momente, kdy uzivatel klepne na tlac. filtrovat
                        // console.log("filterForm.apply", obj);
                        that.Reload(obj.filter);                                  //pristup k datum z gfilterpanelu (DTO filtru)
                    }
                });

            //this.$filterForm.gfilterpanel("applyFilter", null, true, true); //dsebesta na odebrán model 19.5.2020

            this.PrepareHledani();
        },


        validateDateInterval: function (value, changeObj) {
            var formData = {};
            $(changeObj).gform().findFields().gfield("model", "collect", formData);
            var bezUmisteniChecked = formData.UpresneniFilter.indexOf(14) != -1;
            var valid = false;
  debugger;
            if(formData.DateInterval != null && formData.DateInterval.date != null) {                                      // thazmuka (21.07.2021) - oprava validace intervalu
                if(formData.DateInterval.date.start !== null && formData.DateInterval.date.end !== null) {
                    // pokud neni zadano umisteni, provedu kontrolu intervalu na rozsah max. 1 rok
                    if(bezUmisteniChecked === true) {
                        // k Od pridam rok a porovnam s Do

                        const dt = Gordic.Utils.DateTime;
                        var datePom = dt.addYears(formData.DateInterval.date.start, 1);

                        var rozdil = dt.diff(datePom, formData.DateInterval.date.end, "days");
                        if(rozdil <= 0) {
                            valid = true;
                        } else {
                            valid = false;
                            // max 1. rok errMsg
                        }

                        //var datePom = moment(formData.DateInterval.date.start).add(1, 'y');
                        //if (moment(datePom).isSameOrAfter(formData.DateInterval.date.end))
                        //    valid = true;
                    } else {
                        valid = true;
                    }
                }
            } else {
                // pokud je umisteni vyplneno AND není zaškrtnuto bez umístění (tudíž nemusí být vyplněn interval)
                if(formData.Umisteni !== null && bezUmisteniChecked === false) {
                    valid = true;
                }  
            }

            return valid;
        },

        validateUmisteni: function (value, changeObj) {
            var formData = {};
            var gform = $(changeObj).gform();
            gform.findFields().gfield("model", "collect", formData);
            var bezUmisteniChecked = formData.UpresneniFilter.indexOf(14) != -1;
            var valid = false;
            if (formData.Umisteni !== null || bezUmisteniChecked === true) {    
                if (formData.DateInterval == null)      // odstraneni zbytecneho validatoru
                    gform.findFields("dateIntervalField").gfield("resetErrors");
                valid = true;
            }
            return valid;
        }


    }, { extendIntellisense: GContent });
})(jQuery);
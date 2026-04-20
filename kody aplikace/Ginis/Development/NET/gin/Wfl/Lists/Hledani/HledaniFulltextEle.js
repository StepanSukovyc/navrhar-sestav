(function ($) {
    "use strict";
    namespace("Gordic.Wfl.Hledani.HledaniFulltextEle", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26227347"; //RC 26227347 : Hledání v elektronickém úložišti

            var filterForm = new Gordic.Forms.Form({ name: "FormHledaniFulltextEle", tabLabel: "jres:26227188", layoutDescriptor: "L2M2S1, L-4-5-3, M-12-11-1, S-12-11-1" })
                .addSection()
                .addRow({ label: "jres:26226645", required: true }) //RC 26226645 : Hledaný text
                .addField("gstringbox", {
                    name: "hledanyTextField",
                    model: "HledanyText",
                    initialValue: this.model.HledanyText,
                    //validators: [
                    //    {
                    //        "message": "jres:26227184", //RC 26227184 : Musíte zadat minimálně 2 znaky.
                    //        "validate": function (value, changeObj) {
                    //            return value !== null && value.length >= 2;
                    //        },
                    //        "group": "customValidation"
                    //    }
                    //],

                    //favoriteRequiredFields: ["filterAlgHledani", "filterOblastHledani"] // namePrvnihoFielduVRadku nebo nameRadku
                })

                .addRow({ label: "jres:32001109" }) //RC 32001109 : Datum podání
                .addField("gdatecombobox", {
                    daysRangeMax: this.DaysRangeMax,
                    defaultInitialValue: "all",
                    name: "OblastHledaniDateFilter",
                    //model: "model.OblastHledaniDateFilter=value.date",
                    userSettings: this.userSettings,
                    contextMenu: { daysRange: 60 },
                })
                .addRow({ label: "jres:32001110" }) //RC 32001110 : Vlastník (U referenta)
                .addField("gselectbox", "w-12", (Gordic.Gin.Fields.ginsfunSSU({
                    name: "OblastHledaniIxsFunFilter",
                    model: "model.OblastHledaniIxsFunFilter=value.ixs_fun",
                    serverFilters: {
                        aktivita: [100]
                    }
                }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)))

                .addPrefab(Gordic.Wfl.Prefabs.FilterOblastHledaniEle({
                    name: "filterOblastHledani",
                    initialValue: this.model.OblastHledaniEleFilter,
                    model: "model.OblastHledaniEleFilter=value.id",
                }))
                .addPrefab(Gordic.Wfl.Prefabs.FilterAlgHledaniEle({
                    name: "filterAlgHledani",
                    initialValue: this.model.AlgHledaniEleFilter,
                    model: "model.AlgHledaniEleFilter=value.id",
                    prizFtx: this.PrizFtx,
                }));

            //if(this.PrizFtx != 1) {
                filterForm
                    .addPrefab(Gordic.Wfl.Prefabs.FilterZpusobZobrazeniHledaniEle({
                        name: "filterZpusobZobrazeniHledaniEle",
                        initialValue: this.model.TypSeznamuFilter,
                        model: "model.TypSeznamuFilter=value.id"
                    }));
            //}

            filterForm
                .addRow() //RC 26227177 : Nápověda
                .addField("gloadlink", {
                    caption: "jres:26227177", //RC 26227177 : Nápověda
                    /* serverClass: "Gordic.Uka.WebClient.GloadLink",
                     methodName: "LoadLinkClass",*/
                    load: function (parentDiv) {
                        $("<span>jres:26226655</span>").appendTo(parentDiv) //RC 26226655 : Při tomto hledání musí být vyplněn hledaný text. Slova kratší než 2 znaky budou z hledání vypuštěna.
                    }
                });

            this.$filterForm = $("<div>")
                .appendTo(this.element)
                .gfilterpanel({
                    forms: [filterForm],                                                  //predani definic formularu
                    favorites: ["hledanyTextField", "OblastHledaniDateFilter", "OblastHledaniIxsFunFilter","filterOblastHledani", "filterAlgHledani", "filterZpusobZobrazeniHledaniEle"],  //defaulty oblibenych polozek - udava se name radku, nebo name prvniho prvku v radku (nefunguje uvedeni name policka, pokud lezi na radku s definovanym name)
                    tema: "usu_ptm_hledele",
                    //#region Pouziti standardni storage service pro ulozene filtry
                    filterStorageService: new Gordic.Gin.FilterStorageService.Store(),       //standardni sluzba pro pristup k ulozenym filtrum
                    saveOptionsForm: "all",                                                  // připravené ukládací formuláře  „all“ / „eko“
                    userDefaultFilter: true,                                                 // default true,  hvězda v selectboxu, přes kterou jde ukládat defaultní filter, podle kterého se vyhledá hned při načtení detailu (později bude řešené asi přes tři tečky). Pro správnou funkci je potřeba přesunout definici listeneru ještě nad definici gfilterpanelu
                    favoriteLayoutDescriptor: "L4M3S1",
                    //#endregion
                    validators: this.validators,
                    autoLoadAfter: Gordic.Wfl.Utils.AutoLoadAfterUS(this.globalSettings),
                    apply: function (event, obj) {                                           //funkce volana v momente, kdy uzivatel klepne na tlac. filtrovat
                        that.TypVysledkuHledani = obj.filter.TypSeznamuFilter;
                        // console.log("filterForm.apply", obj);
                        that.Reload(obj.filter, true);                                  //pristup k datum z gfilterpanelu (DTO filtru)
                    }
                });

            //this.$filterForm.gfilterpanel("applyFilter", null, true, true); //dsebesta na odebrán model 19.5.2020

            this.PrepareHledani();
        },

    }, { extendIntellisense: GContent });
})(jQuery);
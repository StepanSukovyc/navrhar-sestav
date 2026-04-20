(function ($) {
    "use strict";
    namespace("Gordic.Wfl.Hledani.HledaniPodleAdresata", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26225126"; //RC 26225126 : Hledání podle adresáta

            var dateFactors = [
                { caption: "jres:26225290", factor: "DP" }, //RC 26225290 : Datum podání
            ];

            var filterForm = new Gordic.Forms.Form({ name: "FormHledaniAdresata", tabLabel: "jres:26227188", layoutDescriptor: "L2M2S1, L-4-7-1, M-12-11-1, S-12-11-1" }) //RC 26227188 : Kompletní filtr
                .addSection()
                .addRow({ label: "jres:26225297", required: true }) //RC 26225297 : Adresát
                .addField("gselectbox", {
                    name: "adresatField",
                   // initialValue: this.model.SelectedEsu,
                    model: "model.SelectedEsu[ixs_esu]=value.ixs_esu; model.SelectedEsu[lic]=value.lic; model.SelectedEsu[por_zast]=value.por_zast",
                    validators: [new Gordic.Validators.Required],
                  //  itemTemplate: "{esu_txt} - {zast_txt}",
                    change: function (ev, changeObj) {

                    },
                }, Gordic.Esu.Prefabs.vyberEsu({
                    typ: 3,
                    Logovani: this.LogovaniEsu
                }))
                //typ
                // Režim výběru jednoho externího subjektu
                // typ=1 = SelectEsu,
                // Režim výběru jednoho externího subjektu nebo jedné zástupné osoby
                // typ=2 = SelectEsuOrZo,
                // Režim výběru více externích subjektů a více zástupných osob
                // typ=3 = SelectMultiEsuAndZo    (default)
                .addRow("jres:26225443") //RC 26225443 : Věc
                .addField("gstringbox", {
                    name: "vecField",
                    model: "Vec",
                    initialValue: this.model.Vec,
                })
                .addPrefab(Gordic.Wfl.Prefabs.FilterUpresneniHledani({
                    name: "filterUpresneniHledani",
                    //  label: "jres:26255267",
                    initialValue: this.model.UpresneniFilter,
                    model: "model.UpresneniFilter=value.id",
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
                    }, true)
                )
                .addField("gselectbox", "w-7",
                    Gordic.Gin.Fields.ginsfunSSU(
                    {
                        name: "funField",
                        initialValue: { ixs_fun: this.model.IxsFunVlastnik },
                        model: "IxsFunVlastnik = ixs_fun",
                        serverFilters: {
                            aktivita: [100, 500],
                            //  VazbaNaSpisovyDenik: l_bVazbaNaSpisDenik,
                            ixs_su: new Gordic.Forms.Dependency("suField", "ixs_su")
                        }
                        }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.BEZNE, "suField")
                )
                .addRow({ label: "jres:26227174", favoriteRowLayoutDescriptor: "w-L-6 w-M-8 w-S-12" }) //RC 26227174 : Od-do
                .addField("gdatecombobox", {
                    userSettings: this.userSettings,
                    contextMenu: { daysRange: 60 },
                    name: "dateIntervalField",
                    defaultInitialValue: this.model.DateInterval,
                    model: "model.DateInterval=value; model.DatumAplikovatNa=factor",
                    customClass: "js-interval",
                    daysRangeMax: that.DaysRangeMax,
                    factors: dateFactors,
                })
                .addPrefab(Gordic.Wfl.Prefabs.FilterHledaniTypDb({
                    name: "filterHledaniTypDb",
                    //  label: "jres:26255267",
                    initialValue: this.model.TypDatabase,
                    model: "model.TypDatabase=value.id",
                }))
                .addPrefab(Gordic.Wfl.Prefabs.FilterHledaniSkupina({
                    name: "filterSkupinaHledani",
                    //  label: "jres:26255267",
                    initialValue: this.model.SkupinaFilter,
                    model: "model.SkupinaFilter=value.id",
                }))
                .addRow() //RC 26227177 : Nápověda
                .addField("gloadlink", {
                    caption: "jres:26227177", //RC 26227177 : Nápověda
                    /* serverClass: "Gordic.Uka.WebClient.GloadLink",
                     methodName: "LoadLinkClass",*/
                    load: function(parentDiv) {
                        $("<span>jres:26225555</span>").appendTo(parentDiv) //RC 26225555 : Při tomto hledání musí být vyplněn adresát, doporučujeme vybrat i jednu z dalších položek.
                    }
                });

            this.$filterForm = $("<div>")
                .appendTo(this.element)
                .gfilterpanel({
                    forms: [filterForm],                                                  //predani definic formularu
                    favorites: ["adresatField", "suField", "dateIntervalField"],  //defaulty oblibenych polozek - udava se name radku, nebo name prvniho prvku v radku (nefunguje uvedeni name policka, pokud lezi na radku s definovanym name)
                    tema: "ssl_ptm_hledadr",
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


    }, { extendIntellisense: GContent });
})(jQuery);
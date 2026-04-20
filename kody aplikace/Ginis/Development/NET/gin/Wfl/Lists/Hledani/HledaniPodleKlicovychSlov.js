(function ($) {
    "use strict";
    namespace("Gordic.Wfl.Hledani.HledaniPodleKlicovychSlov", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26225127"; //RC 26225127 : Hledání podle klíčových slov

            var dateFactors = [
                { caption: "jres:26225290", factor: "DP" }, //RC 26225290 : Datum podání
            ];

            that.ksButtonsAction = new GAction({
                name: 'actChecker',
                icon: 'gi-uzel',
                tooltip: "jres:32000067", //RC 32000067 : Výběr ze spisového uzlu
                run: function (ev, ctx) {
                    let ksButtonsAction = that.ksButtonsAction;

                    if(ksButtonsAction.selectAll) {
                        ksButtonsAction.selectAll = false;
                        ksButtonsAction.update({
                            "icon": "gi-uzel",
                            "tooltip": "jres:32000067" //RC 32000067 : Výběr ze spisového uzlu
                        });

                        // nastavení filterů
                        that.findFields("klicSlovaField").gfield("option", {
                            serverFilters: {
                                "ixs_su": that.IxsSuAkt
                            }
                        });
                        Gordic.Data.readerCache.clearCache("Gordic.Wfl.Client.GReaderWflKlicSlova"); // smazání cache z Readeru
                    } else {
                        ksButtonsAction.selectAll = true;
                        ksButtonsAction.update({
                            "icon": "fa-globe",
                            tooltip: "jres:32000066" //RC 32000066 : Výběr ze všeho
                        });

                        // vynulování filterů
                        that.findFields("klicSlovaField").gfield("option", {
                            serverFilters: null
                        });
                        Gordic.Data.readerCache.clearCache("Gordic.Wfl.Client.GReaderWflKlicSlova"); // smazání cache z Readeru
                    }

                }
            })

            that.ksButtonsAction.selectAll = false;

            var filterForm = new Gordic.Forms.Form({ name: "FormHledaniKlicovychSlov", tabLabel: "Kompletní filtr", layoutDescriptor: "L2M2S1, L-4-7-1, M-12-11-1, S-12-11-1" })
                .addSection()
                .addRow({ label: "jres:26227187", required: true }) //RC 26227187 : Klíč. slova
                .addField("gselectbox", Gordic.Prefabs.Select.wflKlicSlova(), {
                    name: "klicSlovaField",
                    placeholder: "jres:26227205", //RC 26227205 : Zadejte klíčová slova
                    multi: true,
                    dropdown: true,
                    showSelectButton: true,
                    verticalButtons: false,
                    buttons: [{
                        action: that.ksButtonsAction
                    }],
                    model: "model.KlicSlova=value.kl_slovo",
                    serverFilters: {
                        "ixs_su": that.IxsSuAkt
                    }
                })
                .addPrefab(Gordic.Wfl.Prefabs.FilterUpresneniHledani({
                    name: "filterUpresneniHledani",
                    //  label: "jres:26255267",
                    initialValue: this.model.UpresneniFilter,
                    model: "model.UpresneniFilter=value.id",
                    VlastnikHistorickyVisible: true,
                    VyskytVsechSlovVisible: true,
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
                }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.BEZNE)).addField("gselectbox", "w-7",
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
                })
                .addPrefab(Gordic.Wfl.Prefabs.FilterHledaniTypDb({
                    name: "filterHledaniTypDb",
                    //  label: "jres:26255267",
                    initialValue: this.model.TypDatabase,
                    model: "model.TypDatabase=value.id",
                }))
                .addPrefab(Gordic.Wfl.Prefabs.FilterHledaniDleVyrizeni({
                    name: "filterDleVyrizeni",
                    //  label: "jres:26255267",
                    initialValue: this.model.VyrizeniFilter,
                    model: "model.VyrizeniFilter=value.id",
                }))
                .addRow("jres:26225921") //RC 26225921 : Deník dok
                .addField("gselectbox",
                    {
                        name: "denikDokField",
                        model: "DenikDok = sslden",
                        serverFilters: {
                            priz_den_cj: [1, 2],
                            aktivita: [100, 500],
                            PouzeUzivatelskeDeniky: true,
                        },
                    }, Gordic.Prefabs.Select.sslsden())
                .addRow("jres:26225922") //RC 26225922 : Deník spisů
                .addField("gselectbox",
                {
                    name: "denikSpisuField",
                    model: "DenikSpisu = sslden",
                    serverFilters: {
                        priz_den_cj: [0, 1, 2, 3],
                        aktivita: [100, 500],
                        PouzeUzivatelskeDeniky: false,
                    },
                }, Gordic.Prefabs.Select.sslsden())
                .addRow() //RC 26227177 : Nápověda
                .addField("gloadlink", {
                    caption: "jres:26227177", //RC 26227177 : Nápověda
                    /* serverClass: "Gordic.Uka.WebClient.GloadLink",
                     methodName: "LoadLinkClass",*/
                    load: function(parentDiv) {
                        $("<span>jres:26225546</span>").appendTo(parentDiv) //RC 26225546 : Při tomto hledání musí být vyplněno alespoň klíčové slovo.
                    }
                })
                ;

          /*  $("<div>").appendTo(this.element)
                .gform("createFrom", filterForm);*/

            this.$filterForm = $("<div>")
                .appendTo(this.element)
                .gfilterpanel({
                    forms: [filterForm],                                                  //predani definic formularu
                    favorites: ["klicSlovaField", "suField", "dateIntervalField"],  //defaulty oblibenych polozek - udava se name radku, nebo name prvniho prvku v radku (nefunguje uvedeni name policka, pokud lezi na radku s definovanym name)
                    tema: "ssl_ptm_hledkls",
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
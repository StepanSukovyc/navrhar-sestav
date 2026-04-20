(function ($) {
    "use strict";
    // Pracovni prostor
    namespace("Gordic.Roz.WebClient.GRozSeznamAHlavicek", {

        taskId: "seznamSpravaHlavicek",  // link aktivni ulohy v taskbaru 

        //////////////////////////////////////////
        //#region Metoda onContentReady
        onContentReady: function ()
        {
            // Priprava contentu. Lze vlozit bud z C# tridy (metoda OnPreRender) nebo vytvorit rovnou v js zde
            console.log("Gordic.Roz.WebClient.GRozSeznamAHlavicek.prepareContent", this);

            // This se neustale meni dle objektu. Zde si tedy ulozim odkaz na cely Content
            var that = this;

            // nastaveni dynamicky vytvorenych breadcrumbs; vice breadcrumbs na content
            this.setBreadcrumbs([
                { caption: "Správa a-hlaviček" },
                { caption: "Seznam", action: new GAction({ name: "actBack", run: function () { _this.tryCloseAllChildContents(); } }) } // pokus o uzavreni vsech podrizenych oken 
            ]);

            // Pridani akci do menubaru
            that.akceSeznamu();

            // Vytvoreni gridu 
            that.gridCreate();

            // Zobrazeni dat
            that.actions.actObcerstvit.run();

        },
        //#endregion
        //////////////////////////////////////////

        //////////////////////////////////////////
        //#region Udalost closing - podminene uzavreni formulare
        closing: function () { // podmineny userClose 
            var def = $.Deferred();

            this.dialogs.messageBox("dotaz", "Opravdu chcete zavřít seznam a-hlaviček ?", GDlg.mbbYesNo, GDlg.mbiQuestion)
                .on("yes", def.resolve)
                .on("close", def.reject);

            return def.promise();
        },
        //#endregion
        //////////////////////////////////////////


        //////////////////////////////////////////
        //#region Metoda gridCreate
        gridCreate: function ()
        {
            console.log("Gordic.Roz.WebClient.GRozSeznamAHlavicek.gridCreate", this);
            var that = this;

            // Grid si ulozim do modularni promenne, abych se na nej nemusel vsude odkazovat
            that.$grid = $("<div class='js-seznamHlavicek'>") // Vytvor div pro grid
//                .css("height", "calc(100% - " + $filterForm.height() + "px)") // nastav mu vysku
                .css("height", "100%")
                .appendTo(this.element) // vloz grid do this.element
                .ggrid({ // struktura gridu
                    //#region ColumnMode - typ zobrazeni gridu
                    columnMode: "fit",     // absolutni sirky sloupcu (default fit - responzivni) / full
                    //#endregion

                    //#region Multi - moznost vyberu vice radku
                    multi: true,
                    //#endregion

                    //#region defaultAction - nastavení DEFAULT akce pro DVOJKLIK na gridu nebo ENTER
                    defaultAction: null,
                    //#endregion

                    //#region searchColumns - sloupce, podle kterých se vyhledává v searchboxu
                    searchColumns: ["ixp", "popis"],
                    //#endregion

                    // #region GridFormat
                    columns: new Gordic.Data.GridFormat()
                        // Pid dokladu
                        .addTextColumn({
                            name: "ixs_ahl",
                            caption: "Identifikátor",
                            width: 120,
                            fixedWidth: true,
                            customClass: "ui-disabled"
                        })
                        // Cisla a-hlavicky
                        .addTextColumn({
                            name: "a_cislo",
                            caption: "Číslo hlavicky"
                        })
                        // Nazev
                        .addTextColumn({
                            name: "nazev",
                            caption: "Název"
                        })
                        // Prijmy
                        .addCurrencyColumn({
                            name: "c0",
                            caption: "Příjmy",
                            width: 70,
                        })
                        // Vydaje
                        .addCurrencyColumn({
                            name: "c1",
                            caption: "Výdaje",
                            width: 70,
                        })
                        // Stav a-hlavicky
                        .addTextColumn({
                            name: "a_stav_txt",
                            caption: "Stav"
                        })
                        // Druh a-hlavicky
                        .addTextColumn({
                            name: "a_druh_txt",
                            caption: "Druh"
                        })
                        // Datum evidence
                        .addDateTimeColumn({
                            name: "dat_evid",
                            caption: "Datum evidence"
                        })
                    // #endregion
                });


        },
        //#endregion
        //////////////////////////////////////////


        //////////////////////////////////////////
        //#region Metoda loadData
        loadData: function () {
            console.log("Gordic.Roz.WebClient.GRozSeznamAHlavicek.loadData", this);
            var that = this;
            that.beginOperation("jres:30150038"); //RC 30150038 : Načítám data
            // Uplatneni promise - volani metody -> IList<GRozSeznamDokladuDto> GetSeznamDokladu(GString ixs_msk)
            that.call("GetSeznamHlavicek")
                .done(function (data) {
                    var view = new Gordic.Data.View(data, { key: "ixs_ahl" });  // key je dulezity kvuli pripadnemu vyhledavani radku
                    that.$grid.ggrid("setData", view, true);                     // true = prekresleni gridu
                })
                .always(function () { that.endOperation(); });
        },
        //#endregion
        //////////////////////////////////////////


        //////////////////////////////////////////
        //#region Metoda akceSeznamu
        akceSeznamu: function ()
        {
            console.log("Gordic.Roz.WebClient.GRozSeznamAHlavicek.akceSeznamu", this);
            var that = this;

            
            // !! POZOR, neumi priradit kolekci, musi se to po jednom !!
            that.actions.add({
                name: "actNova",
                caption: "jres:30150047", //RC 30150047 : Nová
                icon: "",
                run: function (ev, ctx)
                {
                    console.log("actNova", ctx);

                    // Vsechny vstupni parametry gcontentu (jsou oznaceny atributem [JsonProperty])
                    that.navigate('Gordic.Roz.WebClient.GRozDetailAHlavicka', { ixs_ahl: null });

                    // Po ukonceni prace s hlavickou obnov seznam
                    //that.actions.actObcerstvit.run();
                }
            });
            that.actions.add({
                name: "actObcerstvit",
                caption: "jres:30150046", //RC 30150046 : Občerstvit
                icon: "fa-refresh",
                run: function (ev, ctx) {
                    console.log("actObcerstvit", ctx);
                    that.loadData();
                }
            });

            // Definovane akce pridam do menu (atribut favorite zobrazi polozku v hornim panelu)
            that.menuBar([
                { action: that.actions.actNova, favorite: true },
                { action: that.actions.actObcerstvit, favorite: true }
            ]);
        },
        //#endregion
        //////////////////////////////////////////

        //////////////////////////////////////////
        //#region Metody akci menu
        akceNova : function()
        {
            console.log("Gordic.Roz.WebClient.GRozSeznamAHlavicek.akceNova", this);
            var that = this;

        }


        //#endregion
        //////////////////////////////////////////

    }, { extendIntellisense: GContent });
})(jQuery);

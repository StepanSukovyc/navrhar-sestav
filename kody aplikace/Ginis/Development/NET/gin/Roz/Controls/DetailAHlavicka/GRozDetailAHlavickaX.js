(function ($) {
    "use strict";
    namespace("Gordic.Roz.WebClient.GRozDetailAHlavicka", {
        //////////////////////////////////////////
        //#region Metoda onContentReady
        onContentReady: function () {
            // Priprava contentu. Lze vlozit bud z C# tridy (metoda OnPreRender) nebo vytvorit rovnou v js zde
            console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.onContentReady", this);
            
            // This se neustale meni dle objektu. Zde si tedy ulozim odkaz na cely Content
            var that = this;

            // Vytvoreni formatu detailu
            that.detailCreate();

            // Predani dat z DTO do policek - metoda apply - https://xwiki.gordic.cz/NET/widgets/gfield#Hmodel-1
            that.prefillDtoToFields();

            // Pridani akci do menubaru
            that.akceDetailu();

            // Pridani potvrzovacich tlacitek (ulozit/zrusit)
            that.akceFormulare();
        },
        //#endregion
        //////////////////////////////////////////


        //////////////////////////////////////////
        //#region Metoda detailCreate
        detailCreate: function () 
        {
            console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.detailCreate", this);
            var that = this;

            that.defaultForm = $("<div>")  //Je nutne priradit tento formular jako promennou 'defaultForm' pro pozdejsi volani validace
                .appendTo(this.element)
                .gform("setup", { layoutDescriptor: "L2M2S1" })
                    .gtab({ title: "A-hlavička", opened: true })
                        .gformsection("create", "Detail A-hlavičky")
                            .gformrow("addFieldsRow", "Identifikátor").gstringbox({ name: "ixs_ahl", disabled: true })
                            .gformrow("addFieldsRow", "Číslo A-hlavičky").gnumberbox({ name: "a_cislo", returnType: "string" })
                            .gformrow("addFieldsRow", "Název").gstringbox({ name: "nazev" })
                            .gformrow("addFieldsRow", "Popis").gstringbox({ name: "popis", rows: 3 })
                            .gformrow("addFieldsRow", "Rok").gnumberbox({ name: "rok", disabled: true })
                            .gformrow("addFieldsRow", "Druh").gselectbox(                           
                                Gordic.Prefabs.Select.rozcadr(),    //ziskani definice policka, viz: https://xwiki.gordic.cz/NET/javascript/Gordic.Prefabs.Select/
                                {
                                    name: "a_druh",
                                    dropdown: true,
                                    model: "model.a_druh=value.a_druh", //oznaceni, ktere hodnoty z DTO/modelu se maji nacist do tohoto pole, viz: https://xwiki.gordic.cz/NET/widgets/gfield#HZE1kladnEDtextovE9definice
                                    change: function (ev, changeObj) {                                  //viz: https://xwiki.gordic.cz/NET/widgets/gfield#Hchange
                                        console.log("a_druh changed", changeObj.value);
                                    }
                                }
                            )
                            .gformrow("addFieldsRow", "Stav").gselectbox( //.gstringbox({ name: "a_stav", disabled: true })
                                Gordic.Prefabs.Select.rozcast(),
                                {
                                    name: "a_stav",
                                    dropdown: true,
                                    model: "model.a_stav=value.a_stav", //oznaceni, ktere hodnoty z DTO/modelu se maji nacist do tohoto pole, viz: https://xwiki.gordic.cz/NET/widgets/gfield#HZE1kladnEDtextovE9definice
                                    change: function (ev, changeObj) {                                  //viz: https://xwiki.gordic.cz/NET/widgets/gfield#Hchange
                                        console.log("a_stav changed", changeObj.value);
                                    }
                                }
                            )
                            .gformrow("addFieldsRow", "Příjem").gstringbox({ name: "c0" })
                            .gformrow("addFieldsRow", "Výdej").gstringbox({ name: "c1" })
                            .gformrow("addFieldsRow", "Evidováno").gdatebox({ name: "dat_evid", disabled: true })
                            .gformrow("addFieldsRow", "Zpracovat do").gdatebox({ name: "dat_zpr" })
                .gform("complete");
        },
        //#endregion
        //////////////////////////////////////////

        //////////////////////////////////////////
        //#region Metoda prefillDtoToFields
        prefillDtoToFields : function()
        {
            console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.prefillDtoToFields", this);
            var that = this;

            // Predani dat z DTO do policek - metoda apply - https://xwiki.gordic.cz/NET/widgets/gfield#Hmodel-1
            that.findFields()
                .gfield("model", "apply", that.model) // Predani modelu (z c#: ContentValues.AddObject("model", model);
                .gfield("model", "validators", that.validators); // Predani validatoru (z c#: ContentValues.AddObject("validators", model.GetValidators()); 
        },

        //#endregion
        //////////////////////////////////////////


        //////////////////////////////////////////
        //#region Metoda akceDetailu
        akceDetailu: function () 
        {
            console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.akceDetailu", this);
            var that = this;

            that.actions.add({
                name: "actObcerstvit",
                caption: "Občerstvit",
                icon: "fa-refresh",
                run: function (ev, ctx) {
                    console.log("actObcerstvit", ctx);
                }
            });

            // Definovane akce pridam do menu (atribut favorite zobrazi polozku v hornim panelu)
            that.menuBar([
                { action: that.actions.actObcerstvit, favorite: true }
            ]);
        },
        //#endregion
        //////////////////////////////////////////
        
        
        //////////////////////////////////////////
        //#region Metoda akceFormulare
        akceFormulare: function ()
        {
            console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.akceFormulare", this);
            var that = this;

            // Pridani tlacitek do spodni casti contentu
            that.actions.add({
                name: "actSave",
                caption: "Uložit",
                icon: "fa-save",
                run: function (ev, ctx)
                {
                    that.saveDetail();
                }
            });

            that.actions.add({
                name: "actClose",
                caption: "Zavřít",
                icon: null,
                run: function (ev, ctx)
                {
                    that.close();
                }
            });
            that.commandBar([
                { action: that.actions.actSave, favorite: true, customClass: "g-button--primary" },
                { action: that.actions.actClose, favorite: true }
            ]);
        },
        //#endregion
        //////////////////////////////////////////


        //////////////////////////////////////////
        //#region Metoda zpracovani jednotlivych tlacitek
        saveDetail: function()
        {
            console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.saveDetail", this);
            var that = this;

            // Vyvolani validace (pouze v JS bez volani serveru)
            if (!that.defaultForm.gform("isValid")) return;

            // Prenese data z policek do DTO, metoda collect (hromadna operace) - https://xwiki.gordic.cz/NET/widgets/gfield#Hmodel-1
            var formFields = that.findFields().gfield("model", "collect", that.model);

            // Zavolani serverove metody pro ulozeni
            that.call("SaveDetail", { model: that.model } )
            .done(function (r) {
                console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.saveDetail.done()");

                // Zobrazeni info okna
                that.showFlash({ label: "Uložení bylo úspěšné", timer: 3000, customClass: 'g-state-info' });  // FLASH indikace

                // Preplneni hodnot z DTO do policek
                formFields.gfield("model", "apply", that.model);
            })
            .fail(function (xhr, type, vobj) {
                //console.log("GUkazka01.SaveDetail().fail()");
                if (type === "validation") {
                    var msg = "Chyba validace (server):<br/>";
                    $.each(vobj, function (k, v) {
                        for (var i = 0; i < v.length; i++)
                            msg += k + ": " + v[i].message + "<br/>";
                    });
                    GDlg.error(msg);
                }
            });

        }
        //#endregion
        //////////////////////////////////////////

    }, { extendIntellisense: GContent });
})(jQuery);
(function ($) {
    "use strict";
    namespace("Gordic.Roz.WebClient.GRozDetailDokladu", {
        //////////////////////////////////////////
        //#region Metoda onContentReady
        onContentReady: function () {
            // Priprava contentu. Lze vlozit bud z C# tridy (metoda OnPreRender) nebo vytvorit rovnou v js zde
            console.log("Gordic.Roz.WebClient.GRozDetailDokladu.onContentReady", this);
            
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
            console.log("Gordic.Roz.WebClient.GRozDetailDokladu.detailCreate", this);
            var that = this;

            that.defaultForm = $("<div>")  //Je nutne priradit tento formular jako promennou 'defaultForm' pro pozdejsi volani validace
                .appendTo(this.element)
                .gform("setup", { layoutDescriptor: "L2M2S1" })
                    .gtab({ title: "jres:30150048", opened: true }) //RC 30150048 : Detail rozpočtového dokladu
                        .gformsection("create", "jres:30150008") //RC 30150008 : Identifikace dokladu
                            .gformrow("addFieldsRow", "jres:30650012").gstringbox({ name: "ixp", disabled: true }) //RC 30650012 : Identifikátor
                            .gformrow("addFieldsRow", "jres:30150010").gstringbox({ name: "ac", disabled: true }) //RC 30150010 : Evidenční číslo
                            .gformrow("addFieldsRow", "jres:30150011").gstringbox({ name: "ac_ag", disabled: true }) //RC 30150011 : Agendové číslo
                            .gformrow("addFieldsRow", "jres:30150012").gstringbox({ name: "ac_ixe"}) //RC 30150012 : Číslo dokladu

                        .gformsection("create", "Vlastnictví")
                            .gformrow("addFieldsRow", "Zpracovatel").gstringbox({ name: "ixs_fun_akt" })
                            .gformrow("addFieldsRow", "Kompetent").gstringbox({ name: "ixs_fun_vyriz" })
                            .gformrow("addFieldsRow", "Realizátor").gstringbox({ name: "cis_real" })

                        .gformsection("create", "Stav dokladu")
                            .gformrow("addFieldsRow", "Typ dokladu").gstringbox({ name: "ixs_typ" })
                            .gformrow("addFieldsRow", "Druh dokladu").gnumberbox({ name: "drd" })
                            .gformrow("addFieldsRow", "Datum dokladu").gdatebox()
                            .gformrow("addFieldsRow", "Stav dokladu").gnumberbox({ name: "s_zau" })

                        .gformsection("create", "Doplňující informace")
                            .gformrow("addFieldsRow", "Částka dokladu").gnumberbox({ name: "c" })
                            .gformrow("addFieldsRow", "Číslo účtárny").gstringbox({ name: "uus" })
                            .gformrow("addFieldsRow", "Popis dokladu").gstringbox({ name: "popis", rows: 3 })
                .gform("complete");
/*
                $("<div class='ggrid'>").appendTo("body").gtab({ title: "Rozpočtové zápisy", opened: true });

                $("<div class='giissp'>").appendTo("body").gform("setup", { layoutDescriptor: "L2M2S1" }).gtab({ title: "Informace o státní pokladně", opened: true }).
                   gformsection("create", "Identifikace dokladu").
                    gformrow("addFieldsRow", "Číslo ROP v IISSP").gnumberbox().
                    gformrow("addFieldsRow", "A-hlavicka").gstringbox({ buttons: [{ icon: 'fa-search', action: new GAction({ name: 'actTest', run: $.noop }) }] }).
                    gformrow("addFieldsRow", "Číslo šablony EDS/SMVS").gstringbox(
                  { buttons: [{ icon: 'fa-search', action: new GAction({ name: 'actTest', run: $.noop }) }] }
                    ).
                   gformsection("create", "")
                ;
 */
        },
        //#endregion
        //////////////////////////////////////////

        //////////////////////////////////////////
        //#region Metoda prefillDtoToFields
        prefillDtoToFields : function()
        {
            console.log("Gordic.Roz.WebClient.GRozDetailDokladu.prefillDtoToFields", this);
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
            console.log("Gordic.Roz.WebClient.GRozDetailDokladu.akceDetailu", this);
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
            console.log("Gordic.Roz.WebClient.GRozDetailDokladu.akceFormulare", this);
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
            console.log("Gordic.Roz.WebClient.GRozDetailDokladu.saveDetail", this);
            var that = this;

            // Vyvolani validace (pouze v JS bez volani serveru)
            if (!that.defaultForm.gform("isValid")) return;

            // Prenese data z policek do DTO, metoda collect (hromadna operace) - https://xwiki.gordic.cz/NET/widgets/gfield#Hmodel-1
            var formFields = that.findFields().gfield("model", "collect", that.model);

            // Zavolani serverove metody pro ulozeni
            that.call("SaveDetail", { model: that.model } )
            .done(function (r) {
                console.log("Gordic.Uka.WebClient.saveDetail.done()");

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
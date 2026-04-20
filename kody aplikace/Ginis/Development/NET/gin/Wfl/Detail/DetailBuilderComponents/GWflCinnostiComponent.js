(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflCinnosti: {
            create: function (componentDto) {
                var eventName = Gordic.Wfl.WebClient.WflOps.eventName;
                var ops = Gordic.Wfl.WebClient.WflOps.WflOpsEnum;
                var isNotUkraine = Gordic.Wfl.WebClient.GetGWflDBParams().IsUkraine !== true;
                var modOtevreni = Gordic.Global.Enums.ModOtevreni;

                var result = {
                    activeOpEvents: [eventName],
                    onMenuBuild : [
                        function (builder, menus) {
                            this.enableWflCinosti();
                        }
                    ],
                    onBuild: [
                        function () {
                          this.setShortCuts();
                        }
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                        // přidané funkce s thisem
                        zadostOPodpis: function () {
                            var that = this;
                            var options = {
                                ListIxp: componentDto.ixp,
                                HromadnaAkce: false
                            };
                            Gordic.Wfl.Dialogs.ZadostOPodpis(that, options, "navigate").done(function (retVal) {
                                if (retVal) {
                                    that.element.trigger(eventName, Gordic.Wfl.WebClient.WflOps.prepareOpts(ops.zadostOPodpis, "jres:31926144", "g-state-success")); //RC 31926144 : Úspěšně vloženo do podpisové knihy
                                }
                            });
                        },
                        // 13.06.2019 - TFeik
                        // Použití preakce otevřenídialogu odeslání. Díky tomu není nutná samostatná funkce pro akci.
                        //otevriOdeslani: function () {
                        //},
                        trasyDokumentu: function () {
                            var that = this;
                            var opt = {
                                Ixp: componentDto.ixp,
                                SelectRowEnabled: false
                            };
                            Gordic.Ssl.Dialogs.TrasyDokumentuDlg(this, opt, modOtevreni.navigate)
                                .on("closed", function (ev, retVal) {
                                    if (retVal) {
                                      //  that.tryReloadDetail();
                                    }
                                });
                        },
                        formaDokumentuCinnosti: function () {
                            var opt = {
                                Ixp: componentDto.ixp
                            };
                            Gordic.Wfl.WebClient.GWflDetailUtils.FormaDokumentu(this, opt);
                        },
                        konvertovatSchvalit: function () {
                            var that = this;
                            var opt = {
                                Ixp: componentDto.ixp,
                            };
                            
                            Gordic.Wfl.Dialogs.KonverzePdfDlg(this, opt, modOtevreni.navigate)
                                .on("closed", function (ev, retVal) {
                                    that.element.trigger(eventName, Gordic.Wfl.WebClient.WflOps.prepareOpts(ops.konvertovatSchvalit));
                                });
                        },
                        schvalovaciProces: function () {
                            var that = this;
                            var opt = {
                                Ixp: componentDto.ixp
                            };

                            Gordic.Wfl.Dialogs.GSchvalovaciProcesPozadavekDlg(this, opt, modOtevreni.navigate)
                            .done(function (retval) {
                                if (retval && retval.stav) {
                                    that.element.trigger(eventName, Gordic.Wfl.WebClient.WflOps.prepareOpts(ops.schvalovaciProces));
                                }
                            });
                        },
                        autorizovanaKonverzeZadost: function () {
                            var that = this;

                            var opt = {
                                Ixp: componentDto.ixp
                            };

                            Gordic.Wfl.Dialogs.GAutorizovanaKonverzeZadostDlg(this, opt, modOtevreni.navigate)
                            .done(function (retval) {
                                if (retval && retval.stav) {
                                    that.element.trigger(eventName, Gordic.Wfl.WebClient.WflOps.prepareOpts(ops.autorizovanaKonverze));
                                }
                            });
                        },
                        zmenaFormatuZadost: function () {
                            var that = this;
                            var opt = {
                                Ixp: componentDto.ixp
                            };
                         
                            Gordic.Wfl.Dialogs.GZmenaFormatuZadostDlg(this, opt, modOtevreni.navigate)
                                .done(function (retval) {
                                    if (retval && retval.state) {
                                        that.element.trigger(eventName, Gordic.Wfl.WebClient.WflOps.prepareOpts(ops.zmenaFormatu));
                                    }
                                });
                            
                        },
                        schvalit: function (pSchval) {
                            var that = this;
                            var opt = {
                                Ixp: componentDto.ixp
                            };
                            if (pSchval) {
                                //SchvaleniDlg
                                Gordic.Ssl.Dialogs.SchvaleniDlg(this, opt, modOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                    if (retVal) {
                                        that.element.trigger(eventName, Gordic.Wfl.WebClient.WflOps.prepareOpts(ops.schvalit, "jres:31926145", "g-state-success"));//RC 31926145 : Schválení proběhlo úspěšně.                                        
                                    }
                                });
                            } else {
                                opt = {
                                    Ixp: componentDto.ixp
                                };
                                var srv = that.createServiceContent({ className: "Gordic.Ssl.WebClient.GDetailUtils", params: {} });  //servisni sluzba/content
                                srv.call("ZrusitSchvaleni", opt)
                                    .done(function (rv) {
                                        if (rv.StavBool) {
                                            that.element.trigger(eventName, Gordic.Wfl.WebClient.WflOps.prepareOpts(ops.zrusitSchvaleni, "jres:31926146", "g-state-success"));  //RC 31926146 : Zrušení schválení proběhlo úspěšně.
                                        } else {
                                            that.dialogs.alert("jres:31926147"); //RC 31926147 : Nepodařilo se zrušit schválení.
                                        }
                                    }).always(function(){
                                        srv.close(); // úklid, protože už nebude potřeba, příště se vyrobí znovu ... 
                                    });
                            }
                        },

                        posoudit: function () {
                            var that = this;
                            var opt = {
                                Ixp: componentDto.ixp,
                                IxsFun: componentDto.IxsFun
                            }
                            Gordic.Wfl.WebClient.GWflDetailUtils.Posoudit(this, opt);
                        },

                        zmenitDatumVytvoreniWfl: function () {
                            var that = this;
                            if (componentDto.IsSpis) {

                                var form = new Gordic.Forms.Form()
                                    .addRow("jres:31926558") //RC 31926558 :  Datum vytvoření spisu
                                    .addField("gdatebox", {
                                        name: "DatVytvoreni",
                                        model: "model.DatVytvoreni=value",
                                        valueType: "datetime",
                                        validators: [new Gordic.Validators.Required()]
                                    })
                                    ;
                                  
                                var simpleFormOpt = {
                                    DatVytvoreni: componentDto.DatPod
                                };
                                var simpeForm = this.dialogs.simpleForm("jres:31926557", form, simpleFormOpt, { width: 400, height: 350 });  //RC 31926557 : Změnit datum vytvoření spisu

                                simpeForm.on("ok", function (ev, data) {
                                    if (data && data.DatVytvoreni) {
                                        var opt = {
                                            Ixp: componentDto.ixp,
                                            DatVytvoreni: data.DatVytvoreni,
                                            DatZmena: componentDto.DatZmena,
                                        };
                                        var srv = that.createServiceContent({ className: "Gordic.Ssl.WebClient.GDetailUtils", params: {} });  //servisni sluzba/content
                                        srv.call("ZmenitDatumVytvoreniWfl", opt)
                                            .done(function (retVal) {
                                                if (retVal.StavBool) {
                                                    that.tryReloadDetail(undefined, {
                                                        flashMessage: "jres:31926559", //RC 31926559 : Došlo ke změně datumu vytvoření spisu
                                                        flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                    });
                                                }
                                            });
                                    }
                                });
                            }
                        },

                        enableWflCinosti: function () {

                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }
                            var acts = this.actions;
                            var isNotSpis = !componentDto.IsSpis;
                            var isNotTS_S_D = !componentDto.IsTS_S_D;
                            var isNotUkraine = Gordic.Wfl.WebClient.GetGWflDBParams().IsUkraine !== true;

                            acts.actWflCinnostiOdeslani.update({ enabled: l_bActionEnabled });
                            acts.actWflCinnostiTrasy.update({ enabled: l_bActionEnabled && componentDto.LzeTrasy });
                            acts.actWflCinnostiFormaDokumentu.update({ enabled: l_bActionEnabled  });
                            acts.actWflCinnostiKonvSchvalit.update({ enabled: l_bActionEnabled && componentDto.LzeKonverzeSchvaleni, visible: isNotSpis && isNotUkraine });
                            acts.actWflCinnostiZadostOPodpis.update({ enabled: l_bActionEnabled && componentDto.LzePridatZadostOPodpis, visible: isNotTS_S_D }); // nyní nově i na spisu // visible: isNotTS_S_D
                            acts.actWflCinnostiSchvalovaciProces.update({ enabled: l_bActionEnabled && componentDto.LzeSchvalovaciProces }); // dsebesta 17.12.2020 odebráno , visible: isNotSpis protože už chceme aby to bylo i na spisu 
                            acts.actWflCinnostiAutKonverze.update({ enabled: l_bActionEnabled && componentDto.LzeRakVytvoritZadostAkNeAk, visible: isNotSpis });
                            acts.actWflCinnostiZmenaFormatu.update({ enabled: l_bActionEnabled && componentDto.LzeRakVytvoritZadostZdf, visible: isNotSpis && isNotUkraine });
                            acts.actWflCinnostiPosoudit.update({ enabled: l_bActionEnabled && componentDto.LzePosoudit, visible: l_bActionEnabled && isNotSpis && componentDto.LzePosoudit });
                            
                            acts.actZmenitDatumVytvoreniWfl.update({
                                enabled: l_bActionEnabled && componentDto.LzeZmenitDatumVytvoreni,
                                visible: componentDto.IsSpis && isNotTS_S_D && componentDto.IsSslAgenda
                            });

                            var caption = "jres:26226983"; //RC 26226983 : Pouze schválit
                            var icon = "gi-schvaleno g-state-text g-state-success"
                            var schvaleniEnabled = true;
                            var schvalovat = true;
                            if (l_bActionEnabled && componentDto.LzeSchvalit) {
                                caption = "jres:26226983"; //RC 26226983 : Pouze schválit
                            } else if (l_bActionEnabled && componentDto.LzeOdSchvalit) {
                                caption = "jres:26226984"; //RC 26226984 : Zrušit schválení
                                icon = ["gi-schvaleno g-state-text g-state-success", "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"];
                                schvalovat = false;
                            } else {
                                schvaleniEnabled = false;
                            }
                            this.actions.actWflCinnostiSchvalit.schvalitZrusit = schvalovat;
                            this.actions.actWflCinnostiSchvalit.update({ enabled: schvaleniEnabled, icon: icon, caption: caption, visible: isNotSpis });

                            
                            if(componentDto.IsTS_S_D) {
                                acts.actWflCinnostiOdeslani.update({ visible: false, enabled: false });
                                acts.actWflCinnostiTrasy.update({ visible: false, enabled: false });
                                acts.actWflCinnostiFormaDokumentu.update({ visible: false, enabled: false });
                                acts.actWflCinnostiKonvSchvalit.update({ visible: false, enabled: false });
                                acts.actWflCinnostiZadostOPodpis.update({ visible: false, enabled: false });
                                acts.actWflCinnostiSchvalovaciProces.update({ visible: false, enabled: false });
                                acts.actWflCinnostiAutKonverze.update({ visible: false, enabled: false });
                                acts.actWflCinnostiZmenaFormatu.update({ visible: false, enabled: false });
                                acts.actWflCinnostiPosoudit.update({ visible: false, enabled: false });

                                acts.actZmenitDatumVytvoreniWfl.update({ visible: false, enabled: false });
                                this.actions.actWflCinnostiSchvalit.update({ visible: false, enabled: false });
                            }
                        },

                        /**
                         * nastav klávesové zkratky
                         */
                        setShortCuts: function () {

                            // SCHVALOVACÍ PROCES
                            if (componentDto.IsSpis === false) {
                            this.element.gshortcut({
                                key: "alt+s",												// klávesová zkratka
                                action: this.actions.actWflCinnostiSchvalovaciProces,		// akce, která je spuštěna po zmáčknutí kombinace. Pokud akce není enabled, není enabled ani zkratka.
                                description: "jres:31926148",			                    // popis klávesové zkratky pro zobrazení v nápovědě. Pokud není zadán, je použit caption z akce. //RC 31926148 : Otevření schvalovacího procesu
                                group: Gordic.Shortcuts.Groups.Task
                            });
                            }

                            // ŽÁDOST O AUTORIZOVANOU KONVERZI
                            if (componentDto.IsSpis === false) {
                                this.element.gshortcut({
                                    key: "alt+a",									        // klávesová zkratka
                                    action: this.actions.actWflCinnostiAutKonverze,		    // akce, která je spuštěna po zmáčknutí kombinace. Pokud akce není enabled, není enabled ani zkratka.
                                    description: "jres:32000975",			                // popis klávesové zkratky pro zobrazení v nápovědě. Pokud není zadán, je použit caption z akce. //RC 32000975 : Otevření žádosti autorizované konverze
                                    group: Gordic.Shortcuts.Groups.Task
                                });
                            }

                        }
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt
                        // ODESLANI
                        // 13.06.2019 - TFeik
                        // Použití preakce otevřenídialogu odeslání pro budoucí potenciální změny (volba mezi otevřením odeslání či průvodce odesláním).
                        actWflCinnostiOdeslani: $.extend(
                            Gordic.Wfl.PreActions.OtevriOdeslani({
                                inputData: {
                                    //parentContent: content,   // Nejsem schopen zde najít content, ale preakce či dialogs se o to postarají a dokáží jej najít.
                                    ModOtevreni: modOtevreni.navigate,
                                    opt: {
                                        Ixp: componentDto.ixp
                                    }
                                },
                                done: function (retVal) {
                                    if (retVal && retVal.ulozeno) {
                                        $.content(this).tryReloadDetail();
                                    }
                                }
                            }),
                            {
                                // Extenduji name akce, tak, abych mohl pracovat se stávajícím zápisem torby komponenty a ponechal stejné jméno akce.
                                name: "actWflCinnostiOdeslani"
                            }
                        ),
                        actWflCinnostiTrasy: {
                            run: function () {
                                $.content(this).trasyDokumentu();
                            },
                            caption: "jres:26225133", //RC 26225133 : Trasy
                            icon: Gordic.Gin.Icons.EntityEnum.trasy, // alternativne fa-sitemap
                            visible: isNotUkraine
                        },
                        actWflCinnostiFormaDokumentu: {
                            run: function () {
                                $.content(this).formaDokumentuCinnosti();
                            },
                            caption: "jres:26227082", //RC 26227082 : Přehled a možnost změny formy
                            visible: false //dsebesta 13.11.2019 skryto na základě duplikace s akcí v Spis/Formada dokumentu  // Gordic.Wfl.WebClient.GetGWflDBParams().IsUkraine !== true
                        },
                        actWflCinnostiKonvSchvalit: {
                            run: function () {
                                $.content(this).konvertovatSchvalit();
                            },
                            icon: "fa-file-pdf-o",
                            caption: "jres:26226947", //RC 26226947 : Konvertovat do PDF / podepsat / schválit
                            visible: isNotUkraine
                        },
                        actWflCinnostiZadostOPodpis: {
                            run: function () {
                                $.content(this).zadostOPodpis();
                            },
                            icon: ["gi-epk", "fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            caption: "jres:26226555" //RC 26226555 : Vložit do podpisové knihy
                        },
                        /*
                        actWflCinnostiZrusitZadostOPodpis: {
                            run: function () {
                                $.content(this).zrusitZadostOPodpis();
                            },
                            caption: "jres:26226316" //RC 26226316 : Zrušit žádost o podpis
                        },
                        */
                        actWflCinnostiSchvalovaciProces: {
                            run: function () {
                                $.content(this).schvalovaciProces();
                            },
                            icon:"gi-schvyr",
                            caption: "jres:26226488" //RC 26226488 : Schvalovací proces
                        },
                        actWflCinnostiAutKonverze: {
                            icon:"gi-convert",
                            run: function () {
                                $.content(this).autorizovanaKonverzeZadost();
                            },
                            caption: "jres:26226982" //RC 26226982 : Žádost o autorizovanou konverzi
                        },
                        actWflCinnostiZmenaFormatu: {
                            icon: ["gi-paper_question", "fa-arrow-right g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).zmenaFormatuZadost();
                            },
                            caption: "jres:31926149", //RC 31926149 : Žádost o změnu datového formátu
                            visible: isNotUkraine
                        },
                        actWflCinnostiSchvalit: {
                            schvalitZrusit: true,
                            run: function () {
                                $.content(this).schvalit(this.schvalitZrusit);
                            },
                            caption: "jres:26226983" //RC 26226983 : Pouze schválit
                        },
                        actWflCinnostiPosoudit: {
                            
                            run: function () {
                                    $.content(this).posoudit();
                            },
                            icon: Gordic.Gin.Icons.ActionEnum.posoudit,
                            caption: "jres:31926404" //RC 31926404 : Posoudit (souhlasit/nesouhlasit)
                        },
                        actZmenitDatumVytvoreniWfl: {
                            icon: ["gi-time", "gi-pencil g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).zmenitDatumVytvoreniWfl();
                            },
                            caption: "jres:31926556" //RC 31926556 : Změnit datum vytvoření
                        }
                    },
                    menuBar: [
                        Gordic.Wfl.Globals.MenuDefinitions.detailCinnosti(),
                        { action: "actWflCinnostiOdeslani", parent: "menuWflCinnosti", favorite: true},
                        { action: "actWflCinnostiTrasy", parent: "menuWflCinnosti", after: "menuWflCinnostiOdeslani" },
                        { action: "actWflCinnostiFormaDokumentu", parent: "menuWflCinnosti", after: "menuWflCinnostiTrasy" },
                        { action: "actWflCinnostiKonvSchvalit", parent: "menuWflCinnosti", after: "menuWflCinnostiFormaDokumentu" },
                        { action: "actWflCinnostiZadostOPodpis", parent: "menuWflCinnosti", after: "menuWflCinnostiKonvSchvalit", favorite: true },
                        { action: "actWflCinnostiSchvalovaciProces", parent: "menuWflCinnosti", after: "menuWflCinnostiZadostOPodpis", favorite: true },
                        { action: "actWflCinnostiAutKonverze", parent: "menuWflCinnosti", after: "menuWflCinnostiSchvalovaciProces", favorite: true  },
                        { action: "actWflCinnostiPosoudit", parent: "menuWflCinnosti", after: "menuWflCinnostiSchvalovaciProces" },
                        { action: "actWflCinnostiZmenaFormatu", parent: "menuWflCinnosti", after: "menuWflCinnostiAutKonverze" },
                        { action: "actWflCinnostiSchvalit", parent: "menuWflCinnosti", after: "menuWflCinnostiZmenaFormatu" },
                        { action: "actZmenitDatumVytvoreniWfl", parent: "menuWflCinnosti" }
                        
                    ]
                };
                return result;
            }
        },

    }, { extendIntellisense: GContent, pure: true });
})(jQuery);
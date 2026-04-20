/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       gwflcomponents.js
*    project     q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gordic.Wfl.WebClient.csproj
*    created     2026-02-16 14:41:31
*    files       Gin\Wfl\Detail\DetailBuilderComponents\GWflCalendarComponent.js
*                Gin\Wfl\Detail\DetailBuilderComponents\GWflCinnostiComponent.js
*                Gin\Wfl\Detail\DetailBuilderComponents\GWflHeaderFormComponent.js
*                Gin\Wfl\Detail\DetailBuilderComponents\GWflHistoryComponent.js
*                Gin\Wfl\Detail\DetailBuilderComponents\GWflListControlsComponent.js
*                Gin\Wfl\Detail\DetailBuilderComponents\GWflLinkedDocsComponent.js
*                Gin\Wfl\Detail\DetailBuilderComponents\GWflNotesComponent.js
*                Gin\Wfl\Detail\DetailBuilderComponents\GWflPrilohyComponent.js
*                Gin\Wfl\Detail\DetailBuilderComponents\GWflRedistribuceComponent.js
*                Gin\Wfl\Detail\DetailBuilderComponents\GWflVazbyComponent.js
*                Gin\Wfl\Detail\DetailBuilderComponents\GWflDetailComponent.js
*                Gin\Wfl\Detail\DetailBuilderComponents\GWflGfrmComponent.js
*                Gin\Wfl\Detail\DetailBuilderComponents\GWflSKFormComponent.js
*                Gin\Wfl\Detail\DetailBuilderComponents\GWflStatusBarComponent.js
*/

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\DetailBuilderComponents\GWflCalendarComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflCalendar: {
            create: function (content,componentDto) {
                return Gordic.Gin.DetailBuilderComponents.GinCalendar.create(content,componentDto);
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\DetailBuilderComponents\GWflCinnostiComponent.js 

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

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\DetailBuilderComponents\GWflHeaderFormComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {

        WflHeaderForm: {
            create: function (componentDto) {
                var ginComponents = Gordic.Gin.DetailBuilderComponents;
                
                var headerForm = ginComponents.GinHeaderFormLayout.create(componentDto).headerForm;
                var infoSection = Gordic.Wfl.DetailBuilderComponents.WflHeaderFormInfoSection.create(componentDto).headerForm.form.sections;
                var dataSections = ginComponents.GinHeaderFormDataSections.create(componentDto).headerForm.form.sections;

                headerForm.addPrefab(infoSection, "sections");
                headerForm.addPrefab(dataSections, "sections");

                return { headerForm: headerForm };
            }
        },

        WflHeaderFormInfoSection: {
            create: function (componentDto) {
                var headerForm = Gordic.Gin.DetailBuilderComponents.GinHeaderFormInfoSection.create(componentDto).headerForm;
                headerForm.form.sections[0].rows[0].fields[0].widget = "gwflpidbar";

                return { headerForm: headerForm };
            }
        }

    }, {extendIntellisense: GContent, pure:true});
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\DetailBuilderComponents\GWflHistoryComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflHistory: {
            create: function (componentDto) {
                var extension = {
                    contentExtensions: {}
                };

                extension.contentExtensions[Gordic.Gin.DetailBuilderComponents.GinHistory.openDelegateName] = function (dto, componentDto) {
                    Gordic.Wfl.Dialogs.GWflHistorieDlg(this, dto, "showModalWindow");
                }

                return $.extend(Gordic.Gin.DetailBuilderComponents.GinHistory.create(componentDto), extension);
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\DetailBuilderComponents\GWflListControlsComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflListControls: {
            create: function (content) {
                var detailControls = Gordic.Gin.DetailBuilderComponents.GinListControls.create(content);
                detailControls.contentExtensions.detailControls_GetDataCaption = function (data) {
                    return data.ixp;
                };
                return detailControls;
            }
        },
    }, { pure: true });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\DetailBuilderComponents\GWflLinkedDocsComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflLinkedDocs: {
            create: function (content, componentDto) {
                /// <summary> Creates a definition of button and openAction for wflHistorie.</summary>
                /// <remarks> Vmaca, 02.03.2017. </remarks>
                /// <param name="data"> The data with following properties. 
                ///                     TargetContent[string] - namespace of target AjaxContent/AjaxContentControl. 
                ///                     TargetContentDto[object] - dto with data required by TargetContent, 
                ///                     Title[string] - name of button and dialogWindow. </param>
                /// <returns> Object with actionDefinitions and statusBarDefinitions ready for insert into content. </returns>

                //var wflOps = Gordic.Wfl.WebClient.WflOps;
                var reloadFunc = null;
                var title = "jres:26226470";//RC 26226470 : Související / Vazby
                var loadedClass = "js-linked-docs-loaded";
                var closeNamespace = '.wfllinkeddocs_close';

                var badge = new GObservableObject({});
                var updateBadge = function (count) {
                    if (badge) {
                        badge.update({ value: count != null && count > 0 ? count.toString() : "" });
                    }
                };
                updateBadge(componentDto.Count);

                var result = {
                    onBuild: [function () {
                        var that = this;
                        this.element.off(closeNamespace).on('contentclose' + closeNamespace, function (ev) { if (ev.target === that.element[0]) { badge = null; reloadFunc = null; updateBadge = null; that.element.off(closeNamespace); } });
                    }],
                    // příprava na případný reload .. je potřeba k tomu dodělat operaci/eventu
                    //onBuild: [function () {
                    //    var that = this;
                    //    this.element.off('.wfllinkeddocs').on(wflOps.eventName + '.wfllinkeddocs', function (ev, ctx) {
                    //        if(ctx.operation === wflOps.WflOpsEnum.)
                    //        var panel = this.element.gsidebar("getPanel", 'panelLinkedDocs')
                    //        if (panel.hasClass(loadedClass) && reloadFunc) {
                    //            reloadFunc();
                    //        } else {
                    //            var cnt = that.createServiceContent({ className: "Gordic.Wfl.WebClient.SouvisejiciDokumentyDlg", serverParams: { Ixp: componentDto.Ixp } });
                    //            cnt.call("PocetSouvisejicichDokumentu")
                    //                .done(function (count) {
                    //                    badge.update({ value: count != null ? count.toString() : "?" });
                    //                })
                    //                .always(function () {
                    //                    cnt.close();
                    //                });
                    //        }
                    //    });
                    //}],
                    sidePanels: {
                        panelLinkedDocs: {
                            side: "right",
                            leaf: { caption: title, badge: badge, icon: "gi-navazany_zaznam" },
                            caption: title,
                            customClass:"gwfl-linked-docs",
                            minWidth: 300,
                            width: 400,
                            open: function () {
                                var customDiv = $(this);
                                if (!customDiv.hasClass(loadedClass)) {
                                    customDiv.addClass(loadedClass);
                                    customDiv.gcover();
                                    var actSwitchBack = new GAction({
                                        name: "actSwitchBack", run: function () {
                                            customDiv.gswitcher("showPrev");
                                            this.enabled(false);
                                        },
                                        enabled: false
                                    });

                                    var gridRC = null;

                                    var actDown = new GAction({
                                        name: "actDown", run: function () {
                                            var res = gridRC.move(true);
                                            this.enabled(res != null && res.nextRow != null);
                                        },
                                        
                                    });

                                    var actUp = new GAction({
                                        name: "actUp", run: function () {
                                            var res = gridRC.move(false);
                                            this.enabled(res!= null && res.prevRow != null);
                                        },
                                        
                                    });

                                    var grid = $("<div>").appendTo(customDiv);

                                    var actOpenInAgenda = new GAction({
                                        name: "actOrevriVNoveZalozce",
                                        caption: "jres:31926449", //RC 31926449 : Otevřít v agendě
                                        icon: "gi-detail",
                                        enabled: false,
                                        run: function (ev, ctx) {
                                            if (grid) {
                                                var selection = grid.ggrid("getSelection");
                                                if (selection && selection.length === 1) {
                                                    if (selection && selection[0].ixp_vis) {
                                                        var opt = {
                                                            //content: $.content(this),
                                                            ixx1: selection[0].ixp_vis
                                                        }
                                                        Gordic.Wfl.Utils.ZkusOtevritPrislusnyModulVNoveZalozce(opt);
                                                    }
                                                }
                                            }
                                        }
                                    });

                                    customDiv.gsbpanel("menuBar", [{
                                        icon: "gi-arrow gi-rot180", action: actSwitchBack, tooltip: "jres:31926150" //RC 31926150 : Zpět na seznam
                                    },{
                                            caption: "", action: actOpenInAgenda, tooltip: "jres:31926451" //RC 31926451 : Otevřít vybraný dokument v příslušné agendě
                                    },{
                                        icon: "gi-arrow gi-rot270", action: actUp, align: "opposite", tooltip: "jres:31750057" //RC 31750057 : Předchozí
                                    },
                                    {
                                        icon: "gi-arrow gi-rot90", action: actDown, align: "opposite", tooltip: "jres:32105436"//RC 32105436 : Následující
                                    }]); 
                                   
                                    var hasSwitcher = false, previewDiv = null, switcherField= null;

                                    var switchToPreview = Utils.debounced(function (data, view, switchToPreview) {
                                        if (!hasSwitcher) {
                                            hasSwitcher = true;
                                            previewDiv = $('<div class="gwfl-linked-docs--content">').appendTo(customDiv);
                                            switcherField = $('<div class="gwfl-linked-docs--switch">').appendTo(previewDiv).gselectbox(
                                                {
                                                    name: "fieldLinkedDocs",
                                                    data: view.getDataRows(),
                                                    itemTemplate: "<b>{zkr_ag} - {nazev_typ}</b><br><i>{ixp_vis} - {nazev}</i>",
                                                    elperColumns: ["nazev"],
                                                    graphicInput: "oninput",
                                                    dropdown: true,
                                                    change: function (ev, ctx) {
                                                        grid.ggrid("activeRow", ctx.value);
                                                        previewDiv.gpreview("loadAll", $.extend({ ixp: ctx.value.ixp_vis }, ctx.value), true);

                                                    }
                                                });

                                            previewDiv.gpreview(
                                                {
                                                    tabs: [
                                                        {
                                                            caption: "jres:31926106", //RC 31926106 : Souhrn
                                                            customLoad: function () { if (Gordic.Previews != null && Gordic.Previews.render != null) Gordic.Previews.render("wfl:Dokument", this.customDiv, this.loadParams); }
                                                        }, {
                                                            caption: "jres:31926004", //RC 31926004 : Náhled
                                                            customLoad: function () { //subtask was clicked
                                                                if (this.customDiv.hasClass("gfilepreview")) {
                                                                    this.customDiv.gwflfilepreview("displayElDoc", this.loadParams.ixp);
                                                                }
                                                            },

                                                            content: {
                                                                prepareContent: function () {
                                                                    if (!this.element.hasClass("gfilepreview")) {
                                                                        this.element.gwflfilepreview();
                                                                    }
                                                                }
                                                            }
                                                        }]
                                                });


                                            customDiv.gswitcher({
                                                items: [grid, previewDiv],
                                                animator: Gordic.Prefabs.Effects.slide,
                                                animatorParams: {
                                                    axis: 'horizontal',
                                                    speed: 250,
                                                    perspective: "0px",
                                                    keepHiddenItemsInDOM: false,
                                                },
                                            });
                                        }
                                        switcherField.gfield("setValue", data);

                                        if (switchToPreview !== false) {
                                            actSwitchBack.enabled(true);
                                            customDiv.gswitcher("showNext");
                                        }
                                    }, 100);

                                    grid.gautofit().ggrid({
                                        columns: Gordic.Wfl.GWflCommonDlg.getGridSouvisejiciDokumentKolonky(null, componentDto.TypAg, componentDto.IxsFun, true),// new Gordic.Data.GridFormat().addTextColumn({ name: "ixp_vis", caption: "Identifikátor" }),//Gordic.Wfl.GWflCommonDlg.getGridSouvisejiciDokumentKolonky(false, componentDto.TypAg, componentDto.IxsFunAkt, true),
                                        defaultAction: new GAction({
                                            name: "actDefault", run: function (ev, ctx) {
                                                switchToPreview(ctx.cellInfo.data, ctx.view);
                                            }
                                        }),
                                        cellActivate: function (ev, ctx) {
                                            if (ctx && ctx.cellInfo && ctx.cellInfo.data) {
                                                actOpenInAgenda.enabled(true);
                                            }
                                            gridRC.current(ctx.cellInfo);
                                            switchToPreview(ctx.cellInfo.data, ctx.view, false);
                                        },
                                        contextMenu: function (cellContext) {
                                            return [
                                                {
                                                    action: actOpenInAgenda
                                                }
                                            ]
                                        },
                                    });

                                    gridRC = new Gordic.Components.GridRC(grid).on("gridrcmoved", function (ctx) {
                                        actUp.enabled(ctx.state.prevRow != null);
                                        actDown.enabled(ctx.state.nextRow != null);
                                    });

                                    reloadFunc = function () {
                                        if (!customDiv.hasClass('gcover')) {
                                            customDiv.gcover();
                                        }

                                        var cnt = content.createServiceContent({ className: "Gordic.Wfl.WebClient.SouvisejiciDokumentyDlg", serverParams: { Ixp: componentDto.Ixp } });
                                        cnt.call("LoadData", { LoadDto: { pouzeAktivni: true } }).done(function (data) {
                                            actUp.enabled(data.SouvisejiciDokumenty.length > 0);
                                            actDown.enabled(data.SouvisejiciDokumenty.length > 0);
                                            if (grid && grid.hasClass('ggrid')) {
                                                grid.ggrid("setData", new Gordic.Data.View(data.SouvisejiciDokumenty), true);
                                            }
                                            updateBadge(data.SouvisejiciDokumenty.length);
                                        }).always(function () {
                                            if (customDiv.hasClass('gcover')) {
                                                customDiv.gcover("destroy");
                                            }
                                            cnt.close();
                                        });
                                    };

                                    reloadFunc();
                                }
                            }
                        }
                    }
                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\DetailBuilderComponents\GWflNotesComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflNotes: {
            /**
             * Creates component for DetailBuilder - Wfl notes.
             * @param {type} content
             * @param {type} componentDto
             * @returns {type} 
             */
            create: function (content, inputDto, componentDto) {
                return Gordic.Gin.DetailBuilderComponents.GinNotes.create(content, $.extend(componentDto, { ixp: inputDto.ixp }));
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\DetailBuilderComponents\GWflPrilohyComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflPrilohy: {
            create: function (inputDto, componentDto, opts) {

               
                var defaultOpts = {
                    sidepanelTitle: "jres:31926004", //RC 31926004 : Náhled
                    useMainAttachment: true,
                    attachmentPreviewOpts: {},
                    kpiAttachmentUploaderOpts: {},
                    readMainAttachment : function (cnt, ixp) {
                        return Gordic.Wfl.AttachmentUtils.GetFavorite(cnt, ixp);
                    },
                    refreshAttachments: function (cnt) {
                        // update všeho - pokud je načten grid příloh, vyvoláme jeho refresh
                        var grid = (cnt || this).element.find('.gattachmentgrid');
                        if (grid.length > 0) {
                            grid.gattachmentgrid('refresh', true);
                            return true;
                        }
                        return false;
                    },
                    getContentParams: function (inputDto, componentDto) {
                        return {
                            className: componentDto.attachmentMainContent,
                            serverParams: componentDto.attachmentMainContentDto || {
                                ID: "detail_prilohy#",
                                Ixp: inputDto.ixp,
                                NazevUDA: componentDto.NazevUDA,
                                PopisUda: componentDto.PopisUda,
                                PovoleniAkci: componentDto.PovoleniAkci
                            }
                        }
                    },
                    initTab: function (tab) {
                    }
                }


                opts = $.extend(true, defaultOpts, opts || {});

                var result = {
                    activeOpEvents: ["mainattachmentchange","attachmentsactivecountchange"],
                    contentExtensions: {},
                    actions: [], menuBar: [], statusBar: [], sidePanels: [], tabs: [], onBuild: [], onInit: []
                };

                //get master content hack
                var masterCnt;
                result.onInit.push(function (builder) {
                    masterCnt = builder.content
                })

                result.actions.push({
                    name: "actWflPrilohyOpen",
                    run: function () {
                        var cnt = $.content(this);
                        if (cnt && cnt.element) {
                            var tabmanager = cnt.element.find('.' + Gordic.Gin.DetailBuilder.classes.tabmanager);
                            tabmanager.gtabmanager('setActive', Gordic.Prefabs.TabGroups.Prilohy().id);

                            var tab = cnt.element.find("[data-param-id=tabAttachments]");
                            tab.gtab("open");

                            setTimeout(function () {
                                if (tab.length > 0)
                                    tab.get(0).scrollIntoView();
                            }, 200);
                        }
                    }
                });

                var mainAttachmentTooltipPrefab = "jres:26227657"; //RC 26227657 : Hlavní příloha (el. obraz)/počet záznamů o přílohách: {0}/{1}
                var tooltipPrefab = "jres:26227658";  //RC 26227658 : počet záznamů o přílohách: {0}
                var createBadge = function (mainAttachmentCount, attachmentsCount, ixbElp) {
                    var badgeValue = "";

                    if(ixbElp == null) {
                        // ne ve všech případech ho události pošlou (je zbytečné ho extra selectovat, když už je na komponentě znám)
                        ixbElp = componentDto.ixb_elp;
                    }

                    if(componentDto.UsePlusFormatInCounts) {
                        //pro atestace používáme formát mainAttachmentCount + attachmentsCount + originalCount
 
                        if(ixbElp != null && ixbElp != "") {
                            badgeValue = mainAttachmentCount.toString() + "+" + attachmentsCount.toString() + "+1"; // navíc +1 pro originál doručené zprávy
                            mainAttachmentTooltipPrefab = "jres:26228071"; //RC 26228071 : Hlavní příloha (el. obraz) + počet záznamů o přílohách + originál doručené zprávy: {0}+{1}+1
                        } else {
                            badgeValue = attachmentsCount > 0 || mainAttachmentCount > 0 ? opts.useMainAttachment ? mainAttachmentCount.toString() + "+" + attachmentsCount.toString() : (attachmentsCount + mainAttachmentCount).toString() : "";
                            mainAttachmentTooltipPrefab = "jres:26228070"; //RC 26228070 : Hlavní příloha (el. obraz) + počet záznamů o přílohách: {0}+{1}
                        }
                    } else {
                        badgeValue = attachmentsCount > 0 || mainAttachmentCount > 0 ? opts.useMainAttachment ? mainAttachmentCount.toString() + "/" + attachmentsCount.toString() : (attachmentsCount + mainAttachmentCount).toString() : "";
                    }

                    return {
                        id: "statusWflPrilohyBadge",
                        value: badgeValue,
                        tooltip: opts.useMainAttachment ? mainAttachmentTooltipPrefab.format(mainAttachmentCount, attachmentsCount) : tooltipPrefab.format(attachmentsCount + mainAttachmentCount),
                        customClass: "g-state-info" //zobrazeni, akt. moznosti: g-state-info, g-state-important, g-state-warning, g-state-error
                    };
                };

                var attachmentsCount = componentDto.attachmentsCount;

                var mainAttachmentCount = 0;
                if (attachmentsCount > 0 && componentDto.mainAttachmentInfo != null) {
                    mainAttachmentCount = 1;
                    attachmentsCount = attachmentsCount - 1;
                }
                
                var attachmentsBadge = new GObservableObject(createBadge(mainAttachmentCount, attachmentsCount, componentDto.ixb_elp));
                result.statusBar.push({
                    id: "statusWflPrilohy",
                    action: "actWflPrilohyOpen",
                    align: GMenu.menuRootAlignTypes.opposite,
                    captionVisible: GAction.captionVisibility.never,
                    badge: attachmentsBadge,
                    icon: "gi-attachment"
                });

                var dto = $.extend({ ixp: inputDto.ixp, aiVisualiserOptions: {} }, opts.attachmentPreviewOpts);

                if (dto.dao == null && componentDto.attachmentPreviewContent != null) {
                    dto.serviceContent = componentDto.attachmentPreviewContent;
                }

                if (componentDto.ixb_elp != null) {
                    dto.ixb_elp = componentDto.ixb_elp;
                }

                if (componentDto.emptyMessage != null) {
                    dto.emptyMessage = componentDto.emptyMessage;
                }

                if (componentDto.attachmentPreviewAsyncTask != null) {
                    dto.previewLoadOptions = dto.previewLoadOptions || {};
                    dto.previewLoadOptions.gcontent = componentDto.attachmentPreviewAsyncTask;
                }

                var attachmentGrid = null;

                var panelAttachmetsOpened = false;
                var refreshOnOpen = false;
                var innerPanelAttachments = null;
                var panelEvents = null;
                var changeEventName = "panelattachmentschange";
                var previewChangeEventName = "previewchangefile";


                if (componentDto.NahledEleVisible) {
                    innerPanelAttachments = $("<div class='gattachment__panel'>");
                    result.sidePanels.push({
                            id: "panelAttachments",
                            side: "right",
                            leaf: { caption: opts.sidepanelTitle, badge: attachmentsBadge, icon: "gi-nahled" }, //RC 31926004 : Náhled
                            caption: opts.sidepanelTitle,
                            userSetting: this.userSetting,
                            customDiv: innerPanelAttachments,
                            open: function (ev, ctx) {
                                var attachmentsCnt; // pokud jde o obecné přílohy, koukáme na getSelection na contentu ... chtělo by to vyřešit nějak sofistikovaněji

                                if (innerPanelAttachments && !innerPanelAttachments.hasClass('gattachment')) {
                                    dto.aiVisualiserOptions.relatedElement = dto.aiVisualiserOptions.relatedElement || masterCnt && masterCnt.element;//(attachmentsCnt = attachmentsCnt || $.content(attachmentGrid)) && attachmentsCnt && attachmentsCnt.parentContent && attachmentsCnt.parentContent.element
                                    $(innerPanelAttachments).gattachment(dto);
                                }

                                if (refreshOnOpen && innerPanelAttachments) {
                                    innerPanelAttachments.gattachment("refresh");
                                    refreshOnOpen = false;
                                }

                                if (attachmentGrid != null) {
                                    var grid = attachmentGrid.find(".gattachmentgrid")
                                    var selection = grid.length > 0 ? grid.gattachmentgrid("getSelection") : (attachmentsCnt = attachmentsCnt || $.content(attachmentGrid)) && attachmentsCnt.getSelection ? attachmentsCnt.getSelection() : [];
                                    if (selection && selection.length > 0 && innerPanelAttachments) {
                                        innerPanelAttachments.gattachment("setActive", selection[0] && selection[0]._isMeta == true ? selection[0].data : selection[0]);
                                    }
                                }

                                panelAttachmetsOpened = true;
                            },
                            close: function (ev, ctx) {
                                panelAttachmetsOpened = false;
                            }
                    });

                    panelEvents = new GEvents();
                    panelEvents.on(changeEventName, Utils.debounced(function (ctx) {
                        if (panelAttachmetsOpened && innerPanelAttachments && innerPanelAttachments.hasClass('gattachment')) {
                            innerPanelAttachments.gattachment("refresh");
                        } else {
                            refreshOnOpen = true;
                        }
                    },100)); 

                    panelEvents.on(previewChangeEventName, Utils.debounced(function (ctx) {
                        let prilohaRow = ctx.row;
                        if (prilohaRow && panelAttachmetsOpened && innerPanelAttachments && innerPanelAttachments.hasClass('gattachment')) {
                            innerPanelAttachments.gattachment("setActive", prilohaRow);
                        }
                    },100));

                }

                if (opts.useMainAttachment) {
                    var emptyKpiClass = 'gattachment__kpi gattachment__kpi--noeldoc ' + (componentDto.LzeVlozitElObraz ? '' : 'gattachment__kpi--disabled');

                    var kpiObject = new GObservableObject({
                        name: 'kpiPrilohy',
                        action: new GAction({ // action || 'actWflPrilohyOpen'
                            name: 'actAttachmentKpiOpen',
                            run: function (ev, ctx) {
                                var cnt = $.content(ev.target);
                                if (cnt && kpiObject.attachment) {
                                    const perms = Gordic.Wfl.WebClient.Attachment.GAttachmentPermissionsEnum;
                                    const openElEnabled = (kpiObject.attachment.Permissions & perms.OpenElDokumenty) === perms.OpenElDokumenty;

                                    if(openElEnabled) {
                                        Gordic.Wfl.AttachmentUtils.OpenAttachment(cnt, kpiObject.attachment, true, false, void 0, {
                                            filePreviewOptions: componentDto.attachmentPreviewAsyncTask != null ? { gcontent: componentDto.attachmentPreviewAsyncTask, } : void 0,
                                            downloaderType: componentDto.attachmentDownloader,
                                            uploaderType: componentDto.attachmentUploader
                                        })
                                            .done(function (args) {
                                                // console.log("OpenAttachment Completed", this, args);

                                                if(args && args.rv == "uploaded") {
                                                    cnt.reloadDetail(undefined, undefined);
                                                }
                                            })
                                            .fail(function (errObj) {
                                                if(errObj != null) {
                                                    console.error(errObj);
                                                    GDlg.alert(errObj);
                                                }
                                            });
                                    } else {
                                        cnt.dialogs.alert("jres:26227913"); //RC 26227913 : Nemáte oprávnění otevřít hlavní přílohu.
                                    }
                                   
                                } else {
                                    if (cnt && cnt._kpiAttachmentUploader) {
                                        cnt._kpiAttachmentUploader.uploadMainAttachment();
                                    }
                                }
                            }
                        }),
                    });

                    result.kpis = [kpiObject];


                    var createFilledKpi = function (attachment, action) {
                        var file = attachment.File;
                        var statusLockIconDefinition = Gordic.Wfl.AttachmentUtils.GetStatusLockIconDefinition(attachment);
                        var mainIcon = Gordic.Utils.File.getFileTypeIconClass(file.Name.replace(/[\r|\r\n|\n]+/g, '<br>') || '');
                        var icon = mainIcon;

                        if(statusLockIconDefinition) {
                            icon = [mainIcon, statusLockIconDefinition.icon + " gi-stack-fw gi-stack-pos--rb gi-bgw"];
                        }

                        return {
                            attachment: attachment,
                            primaryText: '{0} ({1})'.format(Gordic.Utils.shortenToVisibleChars(file.Name.replace(new RegExp('/[\r|\r\n|\n]+/g', 'g'), '<br>')), Gordic.Utils.File.getFileSize(file.Size)),
                            secondaryText: 'jres:31750061: {0}'.format(file.VersionCount) +
                                (file.IsVerified ? ' | jres:26226548' : '') +
                                (file.IsArchived ? ' | jres:31750059' : ''), //RC 31750059 : K archivaci
                            icon: icon,
                            tooltip: function () {
                                var tooltipRet = [
                                    'jres:26227437: <b>' + file.Name.replace(/[\r|\r\n|\n]+/g, '<br>') + '</b>', //RC 26227437 : Hlavní příloha
                                    'jres:26225953: ' + attachment.Name.replace(/[\r|\r\n|\n]+/g, '<br>') || '-', //RC 26225953 : Titulek
                                    'jres:26225604: ' + attachment.Description.replace(/[\r|\r\n|\n]+/g, '<br>') || '-', //RC 26225604 : Popis
                                    'jres:31750061: {0}'.format(file.VersionCount), //RC 31750061 : Verzí
                                    'jres:26227260: {0}'.format(Gordic.Utils.File.getFileSize(file.Size)), //RC 26227260 : Velikost
                                    ' ',
                                    'jres:31750060: ' + Gordic.Templates.Formatters.datetime(file.LastChangeDate), //RC 31750060 : Vložil
                                    file.LastChangeUser,
                                    ' ',
                                    file.IsVerified ? 'jres:26226548' : '',
                                    file.IsArchived ? 'jres:31750059' : '',
                                    statusLockIconDefinition != null ? statusLockIconDefinition.tooltip : '',
                                ].filter(Boolean).join('<br>');
                                return { tooltip: tooltipRet };
                            },
                            customClass: 'gattachment__kpi',
                            itemTemplate: Gordic.Prefabs.Panels.kpiIconTwoRowsTextTemplate().itemTemplate
                            //   itemTemplate: Gordic.Prefabs.Panels.kpiIconOneRowTextTemplate().itemTemplate
                        };
                    };

                    var createEmptyKpi = function () {
                        return {
                            customClass: emptyKpiClass,
                            attachment: null,
                            primaryText: 'jres:31750053', //RC 31750053 : Bez hl. přílohy
                            tooltip: componentDto.LzeVlozitElObraz ? '<b>jres:31750062</b> <br> jres:31750058' : '',//RC 31750062 : Bez hlavní elektronické přílohy
                            //RC 31750058 : Kliknutím nebo přetažením souboru vložíte novou hlavní elektronickou přílohu.
                            icon: 'gi-paper_elobraz',
                            itemTemplate: componentDto.mainAttachmentKpiMode === 1 ? Gordic.Prefabs.Panels.kpiSingleIconTemplate().itemTemplate : Gordic.Prefabs.Panels.kpiIconOneRowTextTemplate().itemTemplate
                        }
                    }


                    if (componentDto.mainAttachmentInfo) {
                        $.extend(kpiObject, createFilledKpi(componentDto.mainAttachmentInfo));
                    } else {
                        $.extend(kpiObject, createEmptyKpi());
                        kpiObject.action.enabled(!!componentDto.LzeVlozitElObraz);
                    }
                }
                result.tabs.push({
                    id: "tabAttachments",
                    tabParams: {
                        title: "jres:26228027", //RC 26228027 : Přílohy (komponenty)
                        group: $.extend(Gordic.Prefabs.TabGroups.Prilohy(), { badge: attachmentsBadge }),
                        open: function () {
                            attachmentGrid = $(this);
                        }
                    },
                    contentParams: opts.getContentParams(inputDto,componentDto)
                    , hasFastInit:true,
                    init: function (tab) {
                        $(tab).on("attachmentscountchange", function (ev, ctx) {
                            componentDto.attachmentsCount = ctx.attachmentsCount;
                            componentDto.mainAttachmentCount = ctx.mainAttachmentCount;
                            if(attachmentsBadge) {
                                attachmentsBadge.update(createBadge(ctx.mainAttachmentCount, ctx.attachmentsCount));
                            }

                            if (!ctx.firstTimeLoad) {
                                tab.trigger("attachmentsactivecountchange", ctx);

                                if (panelEvents) {
                                    panelEvents.trigger(changeEventName, [ctx]);
                                }
                            }

                            if (opts.useMainAttachment) {
                                if (ctx.mainAttachment && kpiObject) {
                                    tab.find('.gattachment__kpi--noeldoc').removeClass(emptyKpiClass);
                                    kpiObject.update(createFilledKpi(ctx.mainAttachment))
                                    kpiObject.action.enabled(true);
                                } else if (kpiObject) {
                                    kpiObject.update(createEmptyKpi());
                                    kpiObject.action.enabled(!!componentDto.LzeVlozitElObraz);
                                }
                            }
                        }).on("setpreviewactivefile", function (ev, ctx) {
                            if (panelEvents) {
                                panelEvents.trigger(previewChangeEventName, [ctx]);
                            }
                        }).on("attachmentsselection", function (ev, ctx) {
                            if (panelEvents) {
                                panelEvents.trigger(previewChangeEventName, [{ row: ctx.activeRow ? ctx.activeRow.data : ctx.selection && ctx.selection[0] && ctx.selection[0].data}]);
                            }
                        });

                        opts.initTab(tab);
                        attachmentGrid = $(tab);
                    }
                });

                if (opts.useMainAttachment) {
                    result.onBuild.push(function () {
                        var cnt = this;
                        var attachmentUploader = this._kpiAttachmentUploader = new Gordic.Wfl.GAttachmentUploader(inputDto.ixp, $.extend(true,{
                            parentContent: this,
                            uploadOptions: {
                                stUtajIdFilter: undefined,
                                wflPristupyPri: componentDto.WflPristupyPri,
                                prizRezimUtaj: componentDto.PrizRezimUtaj,
                                pouzitPristup: componentDto.PouzitPristup,
                                defaultStUtajId: componentDto.StUtajId
                            },//přístup - stačí říct použít/nepoužít - zbytek si zjistí attachment uploader sám,
                            mode: 'mainAttachment',
                            done: function (params) {
                                var ctx = { stopRefresh: false };
                                cnt.element.trigger("mainattachmentchange", ctx);
                                if (!ctx.stopRefresh) {
                                    // update badge
                                    if (kpiObject.customClass === emptyKpiClass && attachmentsBadge) {
                                        attachmentsBadge.update(createBadge(1, componentDto.attachmentsCount));
                                    }
                                    cnt.beginOperation();
                                    opts.readMainAttachment(cnt, inputDto.ixp).then(function (data) {
                                        // update kpi - než to načte grid tak to trvá
                                        cnt.find('.gattachment__kpi--noeldoc').removeClass(emptyKpiClass);
                                        kpiObject.update($.extend({ customClass: '' }, createFilledKpi(data, cnt.actions.actWflPrilohyOpen)));

                                        if (!opts.refreshAttachments(cnt)) { //panel events je potřeba zavolat, když se nezavolá grid refresh - jinak to jde přes něj

                                            cnt.element.trigger("attachmentsactivecountchange", { mainAttachment: data, attachmentsCount: componentDto.attachmentsCount, mainAttachmentCount: 1 });
                                            if (innerPanelAttachments && innerPanelAttachments.hasClass('gattachment') && panelEvents) {
                                                panelEvents.trigger(changeEventName);
                                            }
                                        }
                                    }).always(function () { cnt.endOperation(); });
                                }
                            }, 
                        }, opts.kpiAttachmentUploaderOpts));
                        attachmentUploader.addDropZone(this.element.find('.gkpipanel [data-item="kpiPrilohy"]'));
                        attachmentUploader.enable(!!componentDto.LzeVlozitElObraz);

                        var offNamespace = '.wfleldockpi_close';
                        this.element.off(offNamespace).on('contentclose' + offNamespace, function (ev) {
                            if (ev.target === cnt.element[0]) {
                                attachmentUploader.destroy();
                                // úklid globálních proměnných, aby se nedržely reference
                                panelEvents = null;
                                innerPanelAttachments = null;
                                attachmentGrid = null;
                                cnt.element.off(offNamespace);
                            }
                        });
                    });
                }

                result.contentExtensions.refreshAttachments = function () {
                    if (!opts.refreshAttachments(this) && attachmentsBadge) {
                        if (opts.getCount) {
                            var countPromise = opts.getCount(componentDto.ixp);
                            if (countPromise) countPromise.then(function (d) {
                                if (attachmentsBadge) {
                                    attachmentsBadge.update(createBadge(d.mainAttachmentCount, d.attachmentCount));
                                }
                            });
                        }

                        if (innerPanelAttachments && innerPanelAttachments.hasClass('gattachment') && panelEvents) {
                            panelEvents.trigger(changeEventName);
                        }
                    }
                    return true;
                };

                return result;
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\DetailBuilderComponents\GWflRedistribuceComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents.WflRedistribuce", {
        /**
         * Creates redistribuce component for detail builder.
         *
         * @param {GContent} content Current GContent, where this component will be used.
         * @param {Object} inputDto DTO with input data for this component. Currently is used only Ixp.
         * @param {Object} componentDto DTO with data for WflRedistribuceComponent.
         * @param {String} callbackContent GContent to call callbacks on or String with class for callbacks.
         */
        create: function (inputDto, componentDto) {

            var wflOps = Gordic.Wfl.WebClient.WflOps;
            var ucelRedistribuce = Gordic.Wfl.Globals.Enums.UcelRedistribuce;
            var result = { contentExtensions: {}, actions: [], menuBar: [], onBuild: [] };

            result.contentExtensions.wflRedistribuce_callbackContent = null; //toto tu musí být, aby se s reloadem zajistil výmaz starého contentu
            result.contentExtensions.wflRedistribuce_initData = null;
            result.contentExtensions.getWflRedistribuce_callbackContent = function () {
                if (this.wflRedistribuce_callbackContent !== null) {
                    return this.wflRedistribuce_callbackContent;
                }

                var callbackContent = this.className === "Gordic.Wfl.WebClient.GWflRedistribuceComponent" ? this : componentDto.RedistribuceTargetCallbackClass;

                if (callbackContent instanceof GContent) { // pokud je předán přímo GContent, volat metody na předaném GContentu

                    return this.wflRedistribuce_callbackContent = callbackContent;

                } else if (typeof callbackContent === "string" && callbackContent.length > 0) {
                    //pokud je předán namespace string, vytvořit GContent podle stringu a volat metody na něm.
                    return this.wflRedistribuce_callbackContent = this.createServiceContent(callbackContent);
                }

                // jinak vytvořit gcontent s defaultním namespace a volat metody tam.
                return this.wflRedistribuce_callbackContent = this.createServiceContent("Gordic.Wfl.WebClient.GWflRedistribuceComponent");
            };


            result.contentExtensions.showVRedistribuciFlashMesage = function () {
                this.showFlash({
                    label: "jres:31926346" + " | "  +//RC 31926346 : V REDISTRIBUCI
                        componentDto.FlashMessageText,
                    state: "warning",
                    noClose: true,
                    id:"idFlashVRedistribuci"
                    //icon:"",
                    //customClass: "g-state-warning"
                });

            };

            result.contentExtensions.hideVRedistribuciFlashMesage = function () {
                this.hideFlash("idFlashVRedistribuci")

            };

            result.contentExtensions.kontrolaDostupnostiDokumentuPoPredaniPrideleni = function () {
                var that = this;
                var opt = {
                    Ixp: inputDto.ixp
                };
                var srv = that.createServiceContent("Gordic.Wfl.WebClient.GWflDetailUtils");  //servisni sluzba/content
                srv.call("TestZdaJeOpravneniNaDokument", opt)
                    .done(function (retVal) {
                        if (retVal.StavBool) {
                            that.element.trigger(wflOps.eventName, {
                                operation: wflOps.WflOpsEnum.predani,
                                flashMessage: "jres:31926156", //RC 31926156 : Předání dopadlo úspěšně.
                                flashMessageClass: "g-state-success",
                            });
                        } else {
                            var text = "jres:31926580" + " " +  retVal.StavTxt; //RC 31926580 : Akce byla úspěšně dokončena.
                            that.notification("showToast", {
                                icon: "fa-check",
                                content: text, 
                                state: "success"
                            }, { delay: 6 });
                            that.tryClose();

                        }
                    }).always(function () { srv.close(); });

               

            };

            var defaultOptions = {
                ListIxp: inputDto.ixp,
                StopRedis: false,
                HromadnaAkce: false,
            };

            result.actions.push({
                name: "actWflRedistribucePredaniSsl",
                icon: componentDto.isPrevzit ? "gi-prevzit" : "gi-predat",
                run: function () {
                    var content = $.content(this);
                    if (componentDto.isPrevzit) {
                        content.dialogs.messageBox("jres:31926151", "jres:31926152", GDlg.mbbYesNo).createDialogPromise('yes') //RC 31926152 : Opravdu chcete převzít tento dokument?
                            .done(function () {
                                console.log("yes");
                                content.getWflRedistribuce_callbackContent().call("Prevzit", { Ixp: inputDto.ixp }).done(function (retVal) {
                                    if (retVal) {
                                        content.element.trigger(wflOps.eventName, {
                                            operation: wflOps.WflOpsEnum.prevzeti,
                                            flashMessage: "jres:31926154", //RC 31926154 : Převzetí dopadlo úspěšně.
                                            flashMessageClass: "g-state-success",
                                        });
                                        //content.load().done(function () {
                                        //    content.showFlash("Převzetí dopadlo úspěšně.", "g-state-success");
                                        //});
                                    }
                                });
                            }).fail(function () {
                                content.showFlash("jres:31926159", "g-state-info"); //RC 31926159 : Převzetí bylo přerušeno uživatelem.
                            });
                    } else {
                        if (content.SimpleMode) {
                            var TypPredani = 1; //"Dokument";

                            if (componentDto.PrizSpis == 1) { // TODO
                                TypPredani = 2;//"Spis";
                            }

                            var opt = {
                                IXPs: inputDto.ixp,
                                TypPredani: TypPredani
                            };

                            Gordic.Wfl.Dialogs.GPrimePredaniDokumentuDlg(content, opt, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                .done(function (retVal) {
                                    if (retVal && retVal.ulozeno) {
                                        content.kontrolaDostupnostiDokumentuPoPredaniPrideleni();
                                        //content.element.trigger(wflOps.eventName, {
                                        //    operation: wflOps.WflOpsEnum.predani,
                                        //    flashMessage: "jres:31926156", //RC 31926156 : Předání dopadlo úspěšně.
                                        //    flashMessageClass: "g-state-success",
                                        //});
                                    }
                                });
                        } else {
                            var options = $.extend({}, defaultOptions, {
                                Ucel: ucelRedistribuce.PREDANI,
                            });

                            Gordic.Wfl.Dialogs.PredaniPrideleniSsl($.content(this), options)

                                .done(function (retVal, cnt) {
                                    content.kontrolaDostupnostiDokumentuPoPredaniPrideleni();
                                    //content.element.trigger(wflOps.eventName, {
                                    //    operation: wflOps.WflOpsEnum.predani,
                                    //    flashMessage: "jres:31926156", //RC 31926156 : Předání dopadlo úspěšně.
                                    //    flashMessageClass: "g-state-success",
                                    //});
                            });
                        }
                    }
                },
                enabled: componentDto.isPredaniOrPrevzetiEnabled,
                visible: !componentDto.IsTS_S_D,
                caption: componentDto.isPrevzit ?
                    "jres:26225203" //RC 26225203 : Převzít
                    : "jres:31926161" //RC 31926161 : Přímo předat
            });

            result.actions.push(
                {
                    name: "actWflRedistribucePrideleniSsl",
                    icon: "gi-pridelit",
                    run: function () {
                        var content = $.content(this);
                        var options = $.extend({}, defaultOptions, {
                            Ucel: ucelRedistribuce.PRIDELENI,
                        });

                        Gordic.Wfl.Dialogs.PredaniPrideleniSsl(content, options).done(function (retVal, cnt) {
                            content.element.trigger(wflOps.eventName, {
                                operation: wflOps.WflOpsEnum.prideleni,
                                flashMessage: "jres:31926402", //RC 31926402 : Přidělení dopadlo úspěšně
                                flashMessageClass: "g-state-success",
                            });
                        });
                    },
                    enabled: componentDto.isPrideleniEnabled,
                    visible: !componentDto.IsTS_S_D,
                    caption: "jres:26225198" //RC 26225198 : Přidělit
                },
                {
                    name: "actWflRedistribuceZrusitPrideleni",
                    run: function () {
                        var content = $.content(this);
                        content.dialogs.messageBox("jres:31926163", "jres:31926164", GDlg.mbbYesNo).createDialogPromise('yes') //RC 31926164 : Opravdu chcete zrušit přidělení?
                            .done(function () {
                                content.getWflRedistribuce_callbackContent().call("ZrusitPrideleni", { Ixp: inputDto.ixp }).done(function (retVal) {
                                    switch (retVal) {
                                        case "0": {
                                            content.showFlash("jres:31926165", "g-state-error"); //RC 31926165 : Zrušení přidělení selhalo.
                                            break;
                                        }
                                        case "1": {
                                            content.element.trigger(wflOps.eventName, {
                                                operation: wflOps.WflOpsEnum.prideleni,
                                                flashMessage: "jres:31926166", //RC 31926166 : Přidělení bylo úspěšně zrušeno.
                                                flashMessageClass: "g-state-success"
                                            });
                                            break;
                                        }
                                        default: {
                                            content.showFlash(retVal, "g-state-warning");
                                        }
                                    }
                                });
                            }).fail(function () {
                                content.showFlash("jres:31926167", "g-state-info"); //RC 31926167 : Zrušení přidělení bylo přerušeno uživatelem.
                            });
                    },
                    icon: ["gi-pridelit", "gi-window-close g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
                    enabled: componentDto.isZrusitPrideleniEnabled,
                    visible: !componentDto.IsTS_S_D,
                    caption: "jres:26225201" //RC 26225201 : Zrušit přidělení
                }
            );

            // Menu
            result.menuBar = [
                Gordic.Wfl.Globals.MenuDefinitions.detailRedistribuce(),
                //{ action: componentDto.isEKO ? "actWflRedistribucePredaniEko" : "actWflRedistribucePredaniSsl", parent: "menuWflRedistribuce", favorite: true },
                { action:  "actWflRedistribucePredaniSsl", parent: "menuWflRedistribuce", favorite: true },
                { action: "actWflRedistribucePrideleniSsl", parent: "menuWflRedistribuce", favorite: true },
                { action: "actWflRedistribuceZrusitPrideleni", parent: "menuWflRedistribuce" }
            ];
          
            // TAB
            result.onBuild.push(function () {
                this.hideVRedistribuciFlashMesage();
            });

            if (componentDto.isPredatniPrideleniTabVisible) {
                //result.statusBar = [
                //    {
                //        name: "actWflRedistribuceStatus",
                //        caption: "jres:31926346", //RC 31926346 : V REDISTRIBUCI
                //        type: "static",
                //        //customClass: "g-state-info g-state-text",
                //        after: "statusDoplnujiciInformaceStatus"
                //    }
                //];
                result.onBuild.push(function () {
                    this.nasetujRedistribuci(this.WflRedistribuce_Dto);
                    this.showVRedistribuciFlashMesage();

                });

                /**
                   var divik = $("<div>").gflashpanel({ icon: "fa-plane", label: label, noClose: true, customClass: undefined });; //g-state-warning
                   this.element.find(".header-form").before(divik);
                 */

                result.contentExtensions.nasetujRedistribuci = function (dto) {
                    var form = this.findForms("formSslRedistribuce");

                    if (form.length <= 0) { // lazy load
                        this.wflRedistribuce_initData = dto;
                        return;
                    }

                    var fields = form.findFields();

                    fields.gfield("model", "apply", dto);
                    //fields.gfield("model", "validators", componentDto.Validators);

                };

                result.tabs = {
                    SslRedistribuce: {
                        tabParams: {
                            title: "jres:26226820", //RC 26226820 : Redistribuce
                            group: Gordic.Prefabs.TabGroups.Redistribuce()
                        },

                        init: function (tab) {
                            //#region definice tab dokumentu
                            var that = $.content(tab);
                            tab.one('gtabopen', function () {
                                var redistribuceForm = new Gordic.Forms
                                    .Form({ name: "formSslRedistribuce" })
                                    .addSection();
                                //1
                                redistribuceForm

                                    .addRow("jres:31926168") //RC 31926168 : Start
                                    .addField("gstringbox", "w-5", {
                                        name: "StartSU",
                                        disabled: true
                                    })
                                    .addField("gstringbox", "w-7", {
                                        name: "StartFunRef",
                                        disabled: true
                                    })

                                    .addRow("jres:31926169") //RC 31926169 : Aktuálně
                                    .addField("gstringbox", "w-5", {
                                        name: "AktSU",
                                        disabled: true
                                    })
                                    .addField("gstringbox", "w-7", {
                                        name: "AktFunRef",
                                        disabled: true
                                    })


                                    .addRow("jres:31926170") //RC 31926170 : Další cíl
                                    .addField("gstringbox", {
                                        name: "DalCilSU",
                                        disabled: true
                                    })

                                    .addRow("jres:31926171") //RC 31926171 : Konečný cíl
                                    .addField("gstringbox", "w-5", {
                                        name: "KonCilSU",
                                        disabled: true
                                    })
                                    .addField("gstringbox", "w-7", {
                                        name: "KonCilFunRef",
                                        disabled: true
                                    })

                                    .addRow("jres:31926172") //RC 31926172 : Účel distribuce
                                    .addField("gstringbox", {
                                        name: "UcelDistribuce",
                                        disabled: true
                                    })

                                    .addRow("jres:26225619") //RC 26225619 : Stav
                                    .addField("gstringbox", {
                                        name: "Stav",
                                        disabled: true
                                    })
                                    ;

                                $("<div>").appendTo(tab)
                                    .gform("createFrom", redistribuceForm);

                                if (componentDto.GridDataTable && componentDto.GridDataTable.length > 0) {
                                    //grid
                                    var gridKolonky = new Gordic.Data.GridFormat()

                                        .addDateTimeColumn({
                                            name: "dat_zmena",
                                            caption: "jres:26225280", //RC 26225280 : Datum změny
                                        })

                                        .addTextColumn({
                                            name: "nazev_su_od",
                                            caption: "jres:26226962", //RC 26226962 : Od uzlu
                                        })
                                        .addTextColumn({
                                            name: "nazev_rf_od",
                                            caption: "jres:26226963", //RC 26226963 : Od referenta
                                        })
                                        .addTextColumn({
                                            name: "nazev_su_do",
                                            caption: "jres:26226964", //RC 26226964 : Uzlu
                                        })
                                        .addTextColumn({
                                            name: "nazev_rf_do",
                                            caption: "jres:26226965", //RC 26226965 : Referentovi
                                        });

                                    var redistribuceFormSekce = new Gordic.Forms
                                        .Form({ name: "formSslRedistribuceSekce" })
                                        .addSection("jres:31926173"); //RC 31926173 : Historie redistribuce

                                    $("<div>").appendTo(tab)
                                        .gform("createFrom", redistribuceFormSekce);

                                    var viewRedistribuce = new Gordic.Data.View(componentDto.GridDataTable);
                                    $("<div>").appendTo(tab)
                                        .gautofit()
                                        .ggrid({
                                            name: "GridRedistribuce",
                                            data: viewRedistribuce,
                                            renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                                            columnMode: "fit",  // fit, full
                                            navigationMode: "row", // row, cell

                                            columns: gridKolonky,
                                        });
                                }

                                // lazy load on open
                                if (that.wflRedistribuce_initData !== null) {
                                    that.nasetujRedistribuci(that.wflRedistribuce_initData);
                                    that.wflRedistribuce_initData = null;
                                }
                            });
                            //#endregion
                        }
                    }
                }
            } // end if componentDto.isPredatniPrideleniTabVisible

            return result;
        },
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\DetailBuilderComponents\GWflVazbyComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {

        WflVazby: {
            create: function (componentDto) {
                var eventName = Gordic.Wfl.WebClient.WflOps.eventName;
                var ops = Gordic.Wfl.WebClient.WflOps.WflOpsEnum;
                var prepareOpts = Gordic.Wfl.WebClient.WflOps.prepareOpts;
                var badge = new GObservableObject({
                    id: "BadgePocetSouvisejicichDokumentuMenuAction",
                    value: componentDto.PocetSouvisejicichDokumentu.toString(),
                    tooltip: "Počet souvisejících dokumentů",
                    customClass: "g-state-info" //zobrazeni, akt. moznosti: g-state-info, g-state-important, g-state-warning, g-state-error
                });
                
                var result = {
                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableWflVazby();
                        }
                    ],
                    onBuild: [
                        function () {
                            /*
                            var closeNamespace = '.DetailDocSpis';
                            this.element.on('souvisrefresh' + closeNamespace, function (ev, ctx) {
                                //this.updateBadgePocetSouvisejicichDokumentuMenuAction(xxx);
                            });
                            this.element.on('souvisdokloaded' + closeNamespace, function (ev, ctx) {
                                //this.updateBadgePocetSouvisejicichDokumentuMenuAction(xxx);
                            });
                            //this.on('souvisrefresh' + closeNamespace, function (ev, ctx) {
                            //    //this.updateBadgePocetSouvisejicichDokumentuMenuAction(xxx);
                            //});
                            */
                        }
                    ],

                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                        // přidané funkce s thisem
                        dotceneSubjekty: function (ixpInput) {
                            var that = this;
                            var odesilatel = this.findFields("Odesilatel");
                            var ixs_esu = null;

                            if (odesilatel && odesilatel.gfield("getValue")) {
                                ixs_esu = odesilatel.gfield("getValue").ixs_esu;
                            }

                            var options = {
                                Ixp: ixpInput ? ixpInput : componentDto.ixp,
                                AktualniEsu: ixs_esu,
                            };

                            Gordic.Wfl.Dialogs.DotceneSubjektyDlg(this, options, "navigate").on("closed", function (ev, retVal) {
                                if (retVal && retVal.dosloKeZmene) {
                                    that.element.trigger(
                                        eventName,
                                        prepareOpts(
                                            ops.dotceneSubjekty,
                                            "jres:31926306",
                                            "g-state-success"
                                        )
                                    ); //RC 31926306 : V dialogu dotčených subjektů došlo ke změně.
                                }
                            });
                        },
                        //klicovaSlova: function () {
                        //    var det = this.contentDiv;

                        //    var l_oOnComplete = function (klicSlovaRetVal) {
                        //        if (this.PrizSpis == 1) {
                        //            var l_sSelectedKlicSlova = klicSlovaRetVal.retPar1;
                        //            $get(m_oKlicSlovaTextBoxCID).value = this.xreplace(l_sSelectedKlicSlova, "|", ", ");
                        //        }
                        //    }

                        //    Wfl_OtevriKlicSlova(this.PIDTextBox.value, "", l_oOnComplete);
                        //},
                        //prilohyDokumentu: function () {
                        //    var det = this.contentDiv;

                        //    var l_sIxp = this.PIDTextBox.value;

                        //    var retVal = Wfl_OtevriPrilohy(l_sIxp);
                        //    //var retVal = Wfl_OtevriPrilohyDokumentu(l_sIxp); // stary modal dialog
                        //    //var retVal = Wfl_OtevriPrilohyDokumentuUKO(Ixp.value, "1"); // test volani uko mode

                        //    // Mody UKO:
                        //    // 0 - standardni chovani rizeni pristupu k ELE dle USU
                        //    // 1 - plny pristup pro (UKO)
                        //    // 2 - plny pristup bez mazani­ (pro UKO)
                        //    // 3 - jen pro cteni (pro UKO)
                        //},
                        /*
                        updateBadgePocetSouvisejicichDokumentuMenuAction: function (count) {
                            if (badge) {
                                badge.update({ value: count != null && count > 0 ? count.toString() : "" });
                            }
                        },
                        */
                        souvisejiciDokumenty: function () {
                            var that = this;
                            var options = {
                                Ixp: componentDto.ixp
                            };
                            // puvidní řešení
                            Gordic.Wfl.Dialogs.SouvisejiciDokumentyDlg(this, options, "navigate")
                                .on("closed", function (ev, retVal) {
                                    if (retVal && retVal.dosloKeZmene) {
                                        that.element.trigger(eventName, prepareOpts(ops.souvisejiciDokumenty, "jres:31926305", "g-state-success")); //RC 31926305 : V dialogu souvisejících dokumentů došlo ke změně.
                                    }
                                });
                            

                            /*
                            // nový dialog 
                            var title = "jres:26226470";//RC 26226470 : Související / Vazby
                            //const tabs = (componentDto.Tabs || ["all", "tree", "active", "spisy", "dotcenySubj", "odesilatel", "ukoly"])
                            var tabs = (["all", "spisy", "active", "tree", "dotcenySubj", "ukoly", "odesilatel"] || ["all", "tree", "active", "spisy", "dotcenySubj", "odesilatel", "ukoly"]).map(function (t) { return Gordic.Wfl.WebClient.SouvisejiciDokumenty.Catalogue[t](); });
                            that.navigate(Gordic.Wfl.WebClient.SouvisejiciDokumenty.SouvisejiciDokumentyMain, {
                                title: title,
                                ixp: componentDto.ixp,
                                tabs: tabs
                            }).on('closed', (ev, ctx) => {
                                if (ctx && ctx.dosloKeZmene) {
                                    that.element.trigger(
                                        Gordic.Wfl.WebClient.WflOps.eventName,
                                        Gordic.Wfl.WebClient.WflOps.prepareOpts(Gordic.Wfl.WebClient.WflOps.WflOpsEnum.souvisejiciDokumenty, "jres:31926305", "g-state-success") //RC 31926305 : V dialogu souvisejících dokumentů došlo ke změně.
                                    ); 
                                    //panel.show({ ixp: componentDto.Ixp });
                                }
                            });
                            */
                        },
                        /*
                        souvisejiciDokumentyStaryDialog: function () {
                            var that = this;
                            var options = {
                                Ixp: componentDto.ixp
                            };
                            // puvidní řešení
                            Gordic.Wfl.Dialogs.SouvisejiciDokumentyDlg(this, options, "navigate")
                                .on("closed", function (ev, retVal) {
                                    if (retVal && retVal.dosloKeZmene) {
                                        that.element.trigger(eventName, prepareOpts(ops.souvisejiciDokumenty, "jres:31926305", "g-state-success")); //RC 31926305 : V dialogu souvisejících dokumentů došlo ke změně.
                                    }
                                });

                        },
                        */
                        evidovaneVystupy: function () {
                            var l_sIxp = componentDto.ixp;

                            var parsJSON = {
                                //Wrid: "",              //Filtr na ID sestavy
                                //Tema: "",            //Filtr na téma
                                //IxsAlv: "",            //Filtr na IxsAlv
                                Ixp: l_sIxp,                 //Filtr na ixp…ten te asi zajima nejvic 
                                //Rok: 2002,           //Filtr na rok – jedna se o short
                                //Ico: "",                  //Filtr na ICO
                                //IxsFun: ""            //Filtr na funkcni misto
                            };

                            this.dialogs.showWindow("Gordic.Report.WebClient.GStoredReports", parsJSON,{ width: 1200, height: 400 });
                        },
                        //editace
                        enableWflVazby: function () {
                            var l_bActionEnabled = true;

                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }
                            var wflDBParams = Gordic.Wfl.WebClient.GetGWflDBParams();


                            this.actions.actDotcSubjekty.update({
                                enabled: l_bActionEnabled
                                   // && ((wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false)
                            });
                           // this.actions.actKlicSlova.update({ enabled: l_bActionEnabled });
                            //this.actions.actPrilohy.update({ enabled: l_bActionEnabled });
                            
                            this.actions.actEvidVystupy.update({ enabled: l_bActionEnabled });
                            this.actions.actDialogKlicovaSlova.update({
                                enabled:
                                    (l_bActionEnabled
                                        && ((componentDto.IsSsl === false) || (componentDto.IsSsl && componentDto.LzeKlicovaSlova))
                                        && ((wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false)
                                    )
                            });


                            //stará povlovačka
                            //this.actions.actSouvisejici.update({ enabled: l_bActionEnabled });
                            //this.actions.actSouvisejiciStaryDialog.update({ enabled: l_bActionEnabled });

                            //enable nové vlastovi akce 
                            //this.actions.actRunSouvDok.update({ enabled: l_bActionEnabled });
                            //this.actions.actSouvisDokNew.update({ enabled: l_bActionEnabled });

                        }
                        //RezimPodani == RezimPodaniEnum.None && !EditMode;
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt
                        actDotcSubjekty: {
                            caption: "jres:26226930", //RC 26226930 : Dotčené subjekty
                            icon: "gi-group |fa-link g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                            run: function () {
                                $.content(this).dotceneSubjekty();
                            },
                            visible: !componentDto.IsTS_S_D,
                        },
                        /*
                        actSouvisejici: {
                            caption: "jres:26226470", //RC 26226470 : Související / Vazby
                            icon: "gi-navazany_zaznam",
                          
                            run: function () {
                                $.content(this).souvisejiciDokumenty();
                            }
                        },
                        */
                       /*
                        actSouvisejiciStaryDialog: {
                            caption: "jres:31926582", //RC 31926582 : Související / Vazby (starší verze)
                            tooltip: "jres:31926583", //RC 31926583 : Související / Vazby (starší verze dialogu)
                            icon: "gi-navazany_zaznam",

                            run: function () {
                                $.content(this).souvisejiciDokumentyStaryDialog();
                            }
                        },
                        */
                        actEvidVystupy: {
                            caption: "jres:26226985", //RC 26226985 : Evidované výstupy
                            icon: ["gi-exit", "gi-pencil g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).evidovaneVystupy();
                            },
                            visible: !componentDto.IsTS_S_D,
                        },
                        actDialogKlicovaSlova: $.extend(
                            Gordic.Wfl.PreActions.OtevriDialogProPridaniKlicovychSlov({
                                inputData: function () {
                                    var def = $.Deferred();
                                    var ret = {
                                        Ixp: componentDto.ixp
                                    };
                                    if (componentDto.IsSsl) {
                                        if (componentDto.LzeKlicovaSlova) {
                                          
                                            def.resolve(ret);
                                        } else {
                                            def.reject();
                                        }
                                    } else { // nejde o ssl povolovačky
                                        def.resolve(ret);
                                    }
                                    return def.promise();
                                   

                                } ,
                                done: function (retVal) {
                                    if (retVal && retVal.ulozeno) {
                                        var cont = $.content(this);
                                        cont.element.trigger(
                                            eventName,
                                            prepareOpts(
                                                "ZmenaKlicovaSlova",
                                                "jres:31926311",  //RC 31926311 : Proběhlo občerstvení kvůli dialogu klíčových slov.
                                                "g-state-success"
                                            )
                                        ); 
                                    }
                                
                                }
                            }),
                            {
                                // Extenduji name akce, tak, abych mohl pracovat se stávajícím zápisem torby komponenty a ponechal stejné jméno akce.
                                name: "actDialogKlicovaSlova",
                                visible: !componentDto.IsTS_S_D,
                            }
                        ),
                    },

                    menuBar: [
                        $.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailVazby(), { favorite: true}),
                        { action: "actDotcSubjekty", parent: "menuWflVazby" },
                        //{ action: "actSouvisejici", parent: "menuWflVazby" }, //, badge: badge
                        //{ action: "actSouvisejiciStaryDialog", parent: "menuWflVazby" /*, parent: "menuWflVazby"*/ }, //, badge: badge
                        { action: "actEvidVystupy", parent: "menuWflVazby" },
                        { action: "actDialogKlicovaSlova", parent: "menuWflVazby" }
                    ],
                }
                return result;
            }
        },
    }, { extendIntellisense: GContent, pure: true });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\DetailBuilderComponents\GWflDetailComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflDetail: {
            create: function (componentDto) {
                const dbProfile =$.content()?.prop("dbProfile");

                var result = {
                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableWflDetail();
                        }
                    ],

                    onBuild: [
                        function () {
                            var that = this;
                            this.initWFlDetailAfterLoad();
                            this.initWFlDetailAfterReload();
                            
                            this.setBaseWflValue();
                            
                            if (componentDto.OznacitDokumentJakoPrectenyAfterLoad) {
                                this.oznacDokumentJakoPrecteny([componentDto.ixp]);
                            }
                            this.element.off('.wfldetailcomponent');
                            this.off(".wfldetailcomponent");

                            this.element.on("mainattachmentchange.wfldetailcomponent", function (ev, ctx) {
                                var flashParams = ctx;
                                var cnt = $.content(this);

                                if (ctx.stopRefresh === true) {
                                    that.indikaceZdaDosloKReloaduContentu = true;
                                    return; // Pokud už někdo před námi nastavil stopRefresh=true, tak nemá cenu dělat znova reload -> postaral se o něj někdo další
                                }

                                ctx.stopRefresh = true;
                                // tady je potřeba dát možnost browseru běh zpracování rozstřihnout,
                                // protože reload zruší toho kdo ten event vyvolal, tak aby to mělo šanci nějak dopadnout..
                                setTimeout(function () { cnt.reloadDetail(undefined, flashParams); }, 10);
                            });

                            //on wflCinnosti akce done -> reload
                            this.element.on('{0}.wfldetailcomponent'.format(Gordic.Wfl.WebClient.WflOps.eventName), function (ev, ctx) {
                                var flashParams = ctx;
                                var cnt = $.content(this);
                                setTimeout(function () { cnt.reloadDetail(undefined, flashParams); }, 10);
                            });

                            //při zavření detailu
                            this.on("close.wfldetailcomponent", function () {
                                that.element.off(".wfldetailcomponent");
                            });
                            //this.element.on("contentclose", );
                        },
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                        //#region společné funkce
                        //obnovení některých věci po reloadu detailu
                        ReadOnlyEko: (componentDto.ReadOnlyEko != null ? componentDto.ReadOnlyEko : false),
                        SSL: componentDto.SSL,
                        ReadOnlySSL: (componentDto.ReadOnlySSL != null ? componentDto.ReadOnlySSL : false),
                        JinaAgenda: (componentDto.JinaAgenda != null ? componentDto.JinaAgenda : false),
                        initWFlDetailAfterLoad: function () {
                            // otevření otevřeného panelu v momentě reloadu
                            
                            // zvoleního aktivního panelu
                            var prichoziIDDoDialogu;
                            if (this.IdZalozkyNeboPaneluKOtevreni) {
                                prichoziIDDoDialogu = this.IdZalozkyNeboPaneluKOtevreni;
                                this.IdZalozkyNeboPaneluKOtevreni = null;
                            }

                            //this.element.on("rememberinitialopen", function (ev, ctx) {
                            //    return false; // zakáže zapamatování si co bylo otevřeno naposled + otevření defaultních záložek&panelů
                            //});

                            this.element.on("initialopen", function (ev, ctx) {
                                ctx.tabGroup = prichoziIDDoDialogu || ""; // nastavit tabGroup k otevření
                                ctx.panel = prichoziIDDoDialogu || ""; // nastavit panel k otevření
                                // return false; // vypnout otevírání defaultní záložky&panelu
                            });
                        },
                        initWFlDetailAfterReload: function () {
                             //otevření otevřeného panelu v momentě reloadu
                            if (this.afterReloadData) {
                                this.flagEvidovat = false; // 6.11.2020 přidáno protože po podání cizíhodokumentu zustal vyset flag Evidovat a pokud uživatel znovu editoval, neuložili se změny. 
                                ;// begin tady udělat něco jen po reloadu

                                this.WithKontrolaMetadat = undefined;

                                // end tady udělat něco jen po reloadu

                                this.afterReloadData = null;
                            }
                        },
                        setBaseWflValue: function () {
                            this.datZmena = componentDto.DatZmena;
                        },
                        otevriNovyDetail: function (opt) {
                            var that = this;
                            Gordic.Ssl.Dialogs.Detail(this, opt)
                                .done(function (retPromis) {
                                    if (retPromis && retPromis.length > 0) {
                                        retPromis.createDialogPromise()
                                            .then(function (retVal) {
                                                if (retVal && retVal.naDetailuDosloKeZmene) {
                                                    if (that.EditMode === true || (that.RezimPodani != null && that.RezimPodani != 0)) {
                                                        that.showFlash(
                                                            "jres:31926440", //RC 31926440 : Nedošlo k automatockému občerstvení detailu, protože na detailu mohou být neuložené změny.
                                                            Gordic.Global.Enums.ColorStateClass.warning
                                                        );
                                                    } else {
                                                        that.tryReloadDetail();
                                                    }
                                                    
                                                }
                                            });
                                    }
                                });
                        },
                        tryReloadDetail: function (params, opt) {
                            //přtižitelná funkce pro  potřebné věci před reloadem
                            this.reloadDetail(params ? params : undefined, opt);
                        },
                        reloadDetail: function (params, opt) {
                            var that = this;
                            // pokusím se zavřít všechny okna
                            this.tryCloseAllSignificants().done(function (ret) {
                                // pokud se povede vyvolam v komponentach uložení dat pro inicializaci
                                that.beforeReloadDetail().done(function () {
                                    that.indikaceZdaDosloKReloaduContentu = true;
                                    var cont = that.load(params)
                                        .done(function () {
                                            // vše dobře dopadlo a nic nedělm
                                        })
                                        .fail(function (a, b, c) {
                                            // chyba o reloadu
                                            if (c && c.baseType === "Gordic.Wfl.Interface.GWflSecurityException") {
                                                that.zavritBezKontrolyZmen = true;
                                                that.tryClose(); // nevolá se tryClose, aby se nevyhodnocovali změny na detailu
                                            }
                                        })
                                        ;
                                    if (opt && opt.flashMessage) {
                                        cont.done(function () {
                                            that.showFlash(opt.flashMessage, opt.flashMessageClass, opt.flashID ? opt.flashID : "IDWflDetail");
                                        });
                                    }
                                });
                            });
                        },

                        beforeReloadDetail: function () {
                            // incializace komponent pžed uložením
                            var mainPromis = $.Deferred();
                            this.afterReloadData = {};
                            var arrOfPromise = [];

                            //wfl zaklad
                            if (this.predReloademWflDetail) {
                                var promisWflDetail = this.predReloademWflDetail();
                                promisWflDetail.done(function (retVal) {
                                    // asi nic
                                });
                                arrOfPromise.push(promisWflDetail);
                            }

                            this.element.trigger("wfldetailbeforereload", { promises: arrOfPromise });

                            //čekání na všchny;
                            if (arrOfPromise.length > 0) {
                                $.when.apply(null, arrOfPromise).done(function () {
                                    mainPromis.resolve();
                                }).fail(()=>mainPromis.reject());
                            } else {
                                mainPromis.resolve();
                            }
                            return mainPromis.promise();
                        },
                        predReloademWflDetail: function () {
                            var promis = $.Deferred();
                            //zapamatování otevřeného sidebaru
                            this.element.trigger('rememberinitialopen');
                            promis.resolve();
                            return promis;
                        },
                       

                        //#endregion

                        //#region Dokument
                        najdiDokument: function () {
                            var that = this;
                            this.hledatIdentDokSpi(
                                function (retVal) {
                                    that.otevriNovyDetail(
                                        {
                                            DetailDto: { ixp: retVal.ixp }
                                        });
                                }
                            );
                        },
                        hledatIdentDokSpi: function (funkceAfter,opt) {
                            var options = opt ? opt : {};
                            Gordic.Wfl.Dialogs.HledatIdentDokSpisDlg(this, options).on("closed", function (ev, retVal) {
                                if (retVal) {
                                    funkceAfter(retVal);
                                }
                            });
                        },
                        individualniPristup: function () {
                            var Ixp = componentDto.ixp;
                            var options = {
                                Ixp: Ixp,
                            };
                            Gordic.Wfl.Dialogs.GRizenyPristupDlg(this, options);
                        },
                        formaDokumentu: function () { 
                            var opt = {
                                Ixp: componentDto.ixp
                            };
                            Gordic.Wfl.WebClient.GWflDetailUtils.FormaDokumentu(this, opt);
                        },
                        oznacDokumentJakoPrecteny: function (ArrOfIxp) {
                            var that = this;
                            var l_oJSONPars = {
                                "SelectedIxp": ArrOfIxp,
                                "FlagPrecteni": true
                            };
                            var srv = that.createServiceContent({ className: 'Gordic.Wfl.WebClient.GWflDetailUtils', params: {} });
                            srv.call('OznacDokumentyJakoPrectene', l_oJSONPars)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.naDetailuDosloKeZmene = true;
                                        // mozna relaodseznamu pod tím
                                    }
                                })
                                .always(function () {
                                    srv.close();
                                });
                        },
                        obcerstvit: function () {
                            var that = this;
                            this.tryReloadDetail(undefined, {
                                flashMessage: "jres:31926345", //RC 31926345 : Občerstveno
                                flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                            });
                        },
                        enableWflDetail: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }
                            var acts = this.actions;
                            acts.actObnovit.update({ enabled: l_bActionEnabled});
                            acts.actPristup.update({ visible: (this.RezimPodani === 0 && componentDto.IsPristupVisible) }); // enabled: l_bActionEnabled
                            acts.actFormaDokumentu.update({ enabled: l_bActionEnabled });
                            var wflDBParams = Gordic.Wfl.WebClient.GetGWflDBParams();
                            acts.actTiskUzivatelskePoznamky.update({ enabled: (wflDBParams && wflDBParams.gin_rad_konao === 1)? true : false });
                            acts.actTiskHistorie.update({ enabled: (wflDBParams && wflDBParams.gin_rad_konao === 1)? true : false });
                        },
                        //#endregion
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt
                        //#region Dokument
                        actFindRecord: {
                            caption: "jres:26225865", //RC 26225865 : Hledat
                            icon: "gi-magglass",
                            tooltip:"jres:26226977", //RC 26226977 : Detail dokumentu/spisu se zadaným PID
                            run: function () {
                                $.content(this).najdiDokument();
                            }
                        },

                        actOtevriDokumentDoNoveZalozkyVeStejneFazi: Gordic.Wfl.PreActions.OtevriDokumentDoNoveZalozkyVeStejneFazi({
                            inputData: {
                                ixp: componentDto.ixp
                            },
                            done: function (retVal) {
                                var content = $.content(this);
                             
                            },
                            fail: function () {
                                $.content(this).showFlash(
                                    "jres:31926498", //RC 31926498 : Novou záložku se nepodařilo otevřít.
                                    Gordic.Global.Enums.ColorStateClass.error,
                                    undefined,
                                    "actOteveniNoveZalozky"
                                );
                            },
                            /*
                            actionParams: {
                                name: "actVytvoritBalik",
                                caption: "jres:26255568" //RC 26255568 : Vytvořit balík a vložit
                            }
                            */
                        }),

                        //actZavrit: {
                        //    caption: "jres:26225591", //RC 26225591 : Zavřít
                        //    icon: "gi-window-close",
                        //    tooltip: "jres:26225591", //RC 26225591 : Zavřít
                        //    run: function () {
                        //        $.content(this).closeDetail();
                        //    }
                        //},
                        //#endregion

                        //#region Zobrazit

                        actObnovit: {
                            caption: "jres:26226484", //RC 26226484 : Občerstvit
                            icon: "gi-refresh",
                            run: function () {
                                $.content(this).obcerstvit();
                            }
                        },
                        actPristup: {
                            caption: "jres:26226931", //RC 26226931 : Přístup
                            icon:"gi-universal-access_pencil",
                            run: function () {
                                $.content(this).individualniPristup();
                            }
                        },
                        actFormaDokumentu: {
                            caption: "jres:26226223", //RC 26226223 : Forma entity
                            icon:"gi-paper_question",
                            run: function () {
                                $.content(this).formaDokumentu();
                            }
                        },
                        actTiskUzivatelskePoznamky: GAction.createPrintAction({
                            name: "actTiskUzivatelskePoznamky",
                            tema: "ssl_ptm_uzvpozn", 
                            icon: "gi-print|gi-paper2 gi-bgw gi-stack-pos--rb g-state-text g-state-info",
                            caption: "jres:31926472", //RC 31926472 : Uživatelské poznámky
                            reportStarting: function (rep) {
                                rep.params.X0000 = componentDto.ixp;
                                rep.params.X0009 = componentDto.X0009;
                                rep.params.IXP = componentDto.ixp;
                               
                            },
                            //reportFinished: function (rep) {
                            //    $.content(this).tryReloadDetail();
                            //}
                        }),
                        actTiskHistorie: GAction.createPrintAction({
                            name: "actTiskHistorie",
                            tema: "usu_ptm_detpis1",
                            icon: "gi-print|gi-history gi-bgw gi-stack-pos--rb g-state-text g-state-info",
                            caption: "jres:31926473", //RC 31926473 : Historie
                            reportStarting: function (rep) {
                                rep.params.X0000 = componentDto.ixp;
                                rep.params.X0009 = componentDto.X0009;
                                rep.params.IXP = componentDto.ixp;

                            },
                            //reportFinished: function (rep) {
                            //    $.content(this).tryReloadDetail();
                            //}
                        }),
                        //#endregion
                    },

                    menuBar: [
                        Gordic.Wfl.Globals.MenuDefinitions.detailDokument(componentDto.TypSpis),
                        { action: "actFindRecord", parent: "menuDokument" },
                        { action: "actOtevriDokumentDoNoveZalozkyVeStejneFazi", parent: "menuDokument" },
                        { id: "menuDokumentSeparator44", type: "separator", parent: "menuDokument", after: "menuFindRecord" },
                        { action: "actFormaDokumentu", parent: "menuDokument", favorite: false },


                       // Gordic.Wfl.Globals.MenuDefinitions.detailZobrazit(),
                        { action: "actObnovit", favorite: true }, // after: "menuUlozitZmeny" 

                        $.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailTisk(), { favorite: true }),
                        { action: "actTiskUzivatelskePoznamky", parent: "menuTisk" },
                        { action: "actTiskHistorie", parent: "menuTisk" },

                        Gordic.Wfl.Globals.MenuDefinitions.detailCinnosti(),
                        { action: "actPristup", parent: "menuWflCinnosti", after: "menuWflCinnostiTrasy" },

                        // 12.06.2020 - TFeik
                        // Sdílení detailu přesunuto z ssl ddo wfl.
                        Gordic.Gin.Prefabs.MenuParams && Gordic.Gin.Prefabs.MenuParams.ShareCommandUrl
                            ? $.extend({}, Gordic.Gin.Prefabs.MenuParams.ShareCommandUrl({
                                commandUrl: Gordic.WebApp.Utility.createCommandUrl(null, 'OpenDetail', $.extend({
                                    ixx1: componentDto.ixp,
                                },  dbProfile != null ? {Profile: dbProfile} : {})),
                                vlozitDoKalendareOptions: {
                                    ixx: componentDto.ixp,
                                    ixs_fun: componentDto.IxsFunPrihlasenehoUzivatele
                                },
                                prehledUdalostiOptions: {
                                    ixp: componentDto.ixp
                                },
                                emailOptions: {
                                    subject: componentDto.Nazev
                                }
                            }), {favorite: true})
                            : undefined
                    ],
                  
                    //commandBar: [
                    //    "actZavrit"
                    //],
                      /*
                    statusBar: { //ukázka zadání jako objektu
                        statusMyComponentObjednano: {
                            "caption": "OBJEDNANO",
                            "type": "static",
                            "customClass": "g-state-warning g-state-text"
                        },

                        statusMyComponentSeparator1: {
                            "type": "separator"
                        },

                        statusMyComponentZaplaceno: {
                            "caption": "ZAPLACENO",
                            "type": "static",
                            "customClass": "g-state-info g-state-text"
                        },


                        statusMyComponentSeparator2: {
                            "type": "separator"
                        },

                        statusMyComponentVyrizeno: {
                            "caption": "VYRIZENO",
                            "type": "static",
                            "customClass": "g-state-success g-state-text"
                        }
                    },
                    */
                };
                return result;
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\DetailBuilderComponents\GWflGfrmComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflGfrm: {
            create: function (content, componentDto) {
                var result = {
                    onInit: [function (builder) {
                        var that = this;
                        var moveFunkce = function (arr, old_index, new_index) {
                            if (new_index >= arr.length) {
                                var k = new_index - arr.length + 1;
                                while (k--) {
                                    arr.push(undefined);
                                }
                            }
                            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
                            return arr; // for testing
                        };
                        if (builder.tabDefinitions != null && builder.tabDefinitions.length > 0) {
                            var tempStrAr = [];
                            for (var i = 0; i < builder.tabDefinitions.length; i++) {
                                if (builder.tabDefinitions[i].id && builder.tabDefinitions[i].id.indexOf("WflGfrmDalsi") > -1) {
                                    tempStrAr.push(builder.tabDefinitions[i].id);
                                }
                            }

                            for (var y = 0; y < tempStrAr.length; y++) {
                                var tgGfrmKybezObj = builder.getDefinition(tempStrAr[y], GDbd.DefinitionKind.Tab);
                                if (tgGfrmKybezObj && tgGfrmKybezObj.length > 0 && tgGfrmKybezObj[0].index >= 0) {
                                    var kybezObj = tgGfrmKybezObj[0];
                                    moveFunkce(kybezObj.array, kybezObj.index, kybezObj.array.length - 1);
                                }
                            }
                        }

                        this.element.off(".gfrm").on("gtabmanageropen.gfrm",
                            function (ev, ctx) {
                                if (ctx && ctx.id && ctx.id.includes("tgGfrm")) {
                                    that.zkusVyvolatRefreshVGfrm(ctx);
                                }
                            });
                    }],
                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableGFRMActions();
                        },
                    ],

                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        enableGFRMActions: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }
                            this.actions.actPridavatAOdebiratFormulare.update({ visible: (l_bActionEnabled && componentDto.LzePridavatAOdebiratFormulare) });
                        },

                        zkusVyvolatRefreshVGfrm: function (ctx) {
                            var id = ctx.id;
                            var divs = this.element.find(".tab-group-{0}:not(.concealed)".format(id));
                            if (divs.length > 0) {
                                var div = divs.eq(0);
                                if (div.hasClass('gcontent')) {
                                    var $gfrmContent = div.gcontent();
                                    if ($gfrmContent.refresh) {
                                        $gfrmContent.refresh();
                                    }
                                } else {
                                    div.gtab('open');
                                }
                            }

                        },

                        zaregistrujReloadPoUlozeniNaGFRM: function (element) {
                            var that = this;
                            element.on("greportformcontrolsaved", function (ev, obj) {
                                //ev.reloadovat = false;
                                if (obj && obj.reloadovatPoUlozeni) {
                                    obj.reloadovatPoUlozeni = false;
                                }
                                that.element.trigger(Gordic.Wfl.WebClient.WflOps.eventName, {
                                    operation: Gordic.Wfl.WebClient.WflOps.WflOpsEnum.gfrmUlozeni,
                                    flashMessage: "jres:31926276",  //RC 31926276 : Proběhlo uložení formuláře.
                                    flashMessageClass: "g-state-success"
                                });
                            });
                        },

                        vytvorNoveMenuVGfrmTabu: function (gfrm) {
                            var gfrmContent = $.content(gfrm);
                            var _this = this;
                            if (gfrmContent.readyAwait) {
                                gfrmContent.readyAwait.then(function () {
                                    var acts = gfrmContent.actions;
                                    var actionPDFDoObrazu = new GAction({
                                        name: "actPdfobraz",
                                        enabled: componentDto.LzeVlozitElObraz,
                                        //icon: "gi-save",
                                        caption: "jres:31926693", //RC 31926693 : Uložit PDF do hlavní přílohy
                                        run: function () {
                                            content.beginOperation("jres:31926692"); //RC 31926692 : PDF se ukládá do hlavní přílohy
                                            gfrmContent.savepdf(true).then(
                                                function (ret) {
                                                    //ret.fileInfo
                                                    var opt = {
                                                        Ixp: componentDto.ixp,
                                                        FileInfo: ret.fileInfo
                                                    };
                                                    var srv = content.createServiceContent("Gordic.Wfl.WebClient.GWflDetailUtils");  //servisni sluzba/content
                                                    srv.call("UlozitDoObrazu", opt)
                                                        .done(function (retVal) {
                                                            if (retVal.StavBool) {
                                                                content.element.trigger(Gordic.Wfl.WebClient.WflOps.eventName, {
                                                                    operation: Gordic.Wfl.WebClient.WflOps.WflOpsEnum.gfrmUlozeni,
                                                                    flashMessage: "jres:31926691",  //RC 31926691 : Proběhlo uložení formuláře do obrazu.
                                                                    flashMessageClass: "g-state-success"
                                                                });
                                                            } 
                                                        }).always(function () {
                                                            content.endOperation();
                                                            if (ret.fileInfo != null && ret.fileInfo.guid) {
                                                                var file = new GFile();
                                                                file.removeFile(ret.fileInfo.guid);
                                                            }
                                                            srv.close();
                                                        });
                                                },
                                                function () {
                                                    content.endOperation();
                                                }
                                            );
                                        }
                                    });

                                    var actionPDFDoPrilohy = new GAction({
                                        name: "actPdfprilohy",
                                        enabled: componentDto.LzePridatElPrilohy,
                                        //icon: "gi-save",
                                        caption: "jres:31926697", //RC 31926697 : Uložit PDF jako přílohu
                                        run: function () {
                                            content.beginOperation("jres:31926698"); //RC 31926698 : PDF se ukládá jako příloha
                                            gfrmContent.savepdf(true).then(
                                                function (ret) {
                                                    //ret.fileInfo
                                                    var opt = {
                                                        Ixp: componentDto.ixp,
                                                        FileInfo: ret.fileInfo
                                                    };
                                                    var srv = content.createServiceContent("Gordic.Wfl.WebClient.GWflDetailUtils");  //servisni sluzba/content
                                                    srv.call("UlozitJakoPrilohu", opt)
                                                        .done(function (retVal) {
                                                            if (retVal.StavBool) {
                                                                content.element.trigger(Gordic.Wfl.WebClient.WflOps.eventName, {
                                                                    operation: Gordic.Wfl.WebClient.WflOps.WflOpsEnum.gfrmUlozeni,
                                                                    flashMessage: "jres:31926699",  //RC 31926699 : Proběhlo uložení formuláře do přílohy
                                                                    flashMessageClass: "g-state-success"
                                                                });
                                                            }
                                                        }).always(function () {
                                                            content.endOperation();
                                                            if (ret.fileInfo != null && ret.fileInfo.guid) {
                                                                var file = new GFile();
                                                                file.removeFile(ret.fileInfo.guid);
                                                            }
                                                            srv.close();
                                                        });
                                                },
                                                function () {
                                                    content.endOperation();
                                                }
                                            );
                                        }
                                    });

                                    acts.savePdfAct.update({ caption: "jres:31926720" }); //RC 31926720 : Stáhnout PDF
                                    acts.saveSignedPdfAct.update({ caption: "jres:31926721" }); //RC 31926721 : Stáhnout PDF s podpisem

                                    var noveMenu = [
                                        //{ action: this.actions.refreshAct, favorite: true },
                                        { action: acts.saveAct, favorite: true },
                                        { action: acts.checkAct, favorite: true },
                                        { action: acts.saveXmlAct, favorite: false },
                                        { action: actionPDFDoObrazu, favorite: true },
                                        { action: actionPDFDoPrilohy, favorite: true },
                                        { action: acts.savePdfAct, favorite: true },
                                        { action: acts.saveSignedPdfAct, favorite: true },
                                    ];
                                    if (_this.actions.actPridavatAOdebiratFormulare) {
                                        noveMenu.push({ action: _this.actions.actPridavatAOdebiratFormulare, favorite: true });
                                    }

                                    acts.saveAct.enabled(componentDto.LzeInterniFormularUlozitNovouVerzi);
                                    acts.savePdfAct.enabled(componentDto.LzeInterniFormularUlozitNovouVerzi);
                                    acts.saveSignedPdfAct.enabled(componentDto.LzeInterniFormularUlozitNovouVerzi);
                                    

                                    gfrmContent.menuBar(noveMenu);
                                });
                            }
                            else {
                                //NOTE (BM 2022-11-08): Po prechodu na readyAwait tento blok kodu smazat
                                var acts = gfrmContent.actions;
                                var noveMenu = [
                                    //{ action: this.actions.refreshAct, favorite: true },
                                    { action: acts.saveAct, favorite: true },
                                    { action: acts.checkAct, favorite: true },
                                    { action: acts.savePdfAct, favorite: true },
                                    { action: acts.saveSignedPdfAct, favorite: true },
                                    { action: acts.saveXmlAct, favorite: false }
                                ];
                                if (_this.actions.actPridavatAOdebiratFormulare) {
                                    noveMenu.push({ action: _this.actions.actPridavatAOdebiratFormulare, favorite: true });
                                }

                                acts.saveAct.enabled(componentDto.LzeInterniFormularUlozitNovouVerzi);
                                acts.savePdfAct.enabled(componentDto.LzeInterniFormularUlozitNovouVerzi);
                                acts.saveSignedPdfAct.enabled(componentDto.LzeInterniFormularUlozitNovouVerzi);

                                gfrmContent.menuBar(noveMenu);
                            }
                        },
                        pridavatAOdebiratFormulare: function () {
                            var that = this;
                            var opt = {
                                Ixp: componentDto.ixp
                            };

                            Gordic.Wfl.Dialogs.NastavFormulareKDokumentuDlg(this, opt, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                .done(function (retval) {
                                    if (retval && retval.isSaved) {
                                        that.tryReloadDetail();
                                    }
                                }
                                );

                        }
                    },
                    actions: {
                        actPridavatAOdebiratFormulare: {
                            caption: "jres:31926687",   //RC 31926687 : Přidat nebo odebrat formulář
                            icon: "gi-formular_plus",
                            run: function () {
                                $.content(this).pridavatAOdebiratFormulare();
                            }
                        }
                    },

                    menuBar: [
                        //#region Vazby

                        $.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailVazby(), { favorite: true }),
                        { action: "actPridavatAOdebiratFormulare", parent: "menuWflVazby" },

                    ],
                    tabs: {},
                };

                // hlavní
                // Form parametr pro GReportFormControl
                var formSelectorTemplate = "wfl-form:{0}|ixs-form:{1}|guid:{2}";
                var getFormSelector = function (ixp, ixsform, guid) { return formSelectorTemplate.format(ixp, ixsform, guid); };
                /* // původní řešení
                var formSelectorTemplate = "wfl-form:{0}|ixs-form:{1}";
                var getFormSelector = function (ixp, ixsform, guid) { return formSelectorTemplate.format(ixp, ixsform); };
                */
                if (componentDto.IxsFrmGform != null && componentDto.IxsFrmGform !== "") {
                    result.tabs.WflGfrm = {
                        tabParams: {
                            title: "jres:26226940",  //RC 26226940 : Formulář
                            group: Gordic.Prefabs.TabGroups.Gfrm(),
                            customLoad: function (loadParams) {
                                var cnt = $.content(this);
                                var gfrm = $(this).gcontent([Gordic.Report.WebClient.GReportFormControl, {
                                    autoLoadParams: {
                                        Form: getFormSelector(componentDto.ixp, componentDto.IxsFrmGform, componentDto.guid),
                                        server: 'Gordic.Wfl.WebClient.GWflReportFormControl'
                                    },
                                    parentContent: cnt
                                }]); //.load();
                                if (cnt && cnt.zaregistrujReloadPoUlozeniNaGFRM) {
                                    cnt.zaregistrujReloadPoUlozeniNaGFRM(gfrm);
                                    cnt.vytvorNoveMenuVGfrmTabu(gfrm);
                                } else {
                                    content.dialogs.messageBox("", "jres:31926545").on("closed", function (ev, retVal) { //RC 31926545 : Formulář se nepodařilo vykreslit
                                       
                                    });
                                }
                            }

                        },
                    };
                }
                
                // přiřazené k formuláři
                if (componentDto.SeznamVsechPrirazenychFormularukDokumentu != null && componentDto.SeznamVsechPrirazenychFormularukDokumentu.length > 0) {
                    var x = componentDto.SeznamVsechPrirazenychFormularukDokumentu;
                  
                    var tempfunction = function (index) {
                        var xItem = x[index];
                        var shortName = "jres:31926705"; //RC 31926705 : Bez názvu
                        if (xItem.nazev) { 
                            var shortName = xItem.nazev.substring(0, 10) + (xItem.nazev.length > 10 ? "…" : "");
                        }
                        //var txtTab = "{0} - {1}".format(index + 1, shortName);
                        var txtTab = "{0}: {1}".format(index + 1, shortName);
                        return {
                            tabParams: {
                                title: shortName,
                                group: $.extend(Gordic.Prefabs.TabGroups.Gfrm(index), { caption: txtTab, tooltip: xItem.nazev }),
                                indexRadku: index,
                                customLoad: function (loadParams, xxx) {
                                    var cnt = $.content(this);

                                    var gfrm = $(this).gcontent([Gordic.Report.WebClient.GReportFormControl, {
                                        autoLoadParams: {
                                            Form: getFormSelector(componentDto.ixp, xItem.ixs_frm_gform, componentDto.guid),
                                            server: 'Gordic.Wfl.WebClient.GWflReportFormControl'
                                        },
                                        parentContent: cnt
                                    }]);
                                    if (cnt && cnt.zaregistrujReloadPoUlozeniNaGFRM) {
                                        cnt.zaregistrujReloadPoUlozeniNaGFRM(gfrm);
                                        cnt.vytvorNoveMenuVGfrmTabu(gfrm);
                                    } else {
                                        content.dialogs.messageBox("", "jres:31926545").on("closed", function (ev, retVal) { //RC 31926545 : Formulář se nepodařilo vykreslit

                                        });
                                    }
                                }
                            }
                        };
                    };

                    for (var iy = 0; iy < x.length; iy++) {
                        result.tabs["WflGfrmDalsi" + iy] = tempfunction(iy);
                    }
                }
                /*
                // ODSTRANENA SPECIALNI ZALOZKA KYBEZ
                // potencionální
                if (componentDto.IxsFrmKybez != null) {
                    var kybezTitle = "jres:31926270";//RC 31926270 : KYBEZ
                    result.tabs.WflGfrmKybez = {
                        tabParams: {
                            title: kybezTitle,
                            group: $.extend(Gordic.Prefabs.TabGroups.Gfrm('Kybez'), { caption: kybezTitle }),
                            customLoad: function (loadParams) {
                                var cnt = $.content(this);

                                var gfrm = $(this).gcontent([Gordic.Report.WebClient.GReportFormControl, {
                                    autoLoadParams: {
                                        Form: getFormSelector(componentDto.ixp, componentDto.IxsFrmKybez, componentDto.guid),
                                        server: 'Gordic.Wfl.WebClient.GWflReportFormControl'
                                    },
                                    parentContent: cnt
                                }]);
                                if (cnt && cnt.zaregistrujReloadPoUlozeniNaGFRM) {
                                    cnt.zaregistrujReloadPoUlozeniNaGFRM(gfrm);
                                    cnt.vytvorNoveMenuVGfrmTabu(gfrm);
                                } else {
                                    content.dialogs.messageBox("", "jres:31926545").on("closed", function (ev, retVal) { //RC 31926545 : Formulář se nepodařilo vykreslit

                                    });
                                }
                            }
                        }
                    };
                    
                }
                */
                return result;
            }
        },
    }, { extendIntellisense: GContent, pure: true });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\DetailBuilderComponents\GWflSKFormComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {

        WflSKform: {
            create: function (componentDto) {
                var result = {
                    onBuild: [
                        function () {
                            var that = this;
                            this.enableWflSkForm();
                            this.wflSkFormZkontrolujHlasku();
                            //this.find(".gtabmanager").on("gtabmanageropen", function (ev, ctx) {
                            //    if (ctx.id === "tgGfrm") {
                            //        //that.opravZarovnaniSKForm();
                            //        that.find("*[data-param-id='WflGfrm']").gtab("open");
                            //    }
                            //});
                        },
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady


                        saveDataToGinisFromSkForm: function () {
                            var that = this;
                            var skContent = $.content(this.iframeDivSkForm);
                            var ret = skContent.SaveXmlAsReturn();
                            if (ret !== undefined && ret !== null) { 
                                this.vyresJmenoPrilohySFormularem(ret.fileName);
                                //servisa pro ukládání
                                if (this._contentSaveSKForm == null) {
                                    this._contentSaveSKForm = that.createServiceContent({
                                        className: "Gordic.Wfl.WebClient.GAttachmentService",
                                        serverParams: {
                                          //  Ixp: componentDto.ixp
                                        }
                                    });
                                }
                                var fileName = "Formular.xml";
                                //var data = this.getBytesFromXml(ret.xml);
                                var fd = new FormData();
                            
                                //fd.append("test", new Blob([ret.xml], { type: "text/xml" }), fileName);
                                var file = new GFile();
                                //application/vnd.gov.sk.xmldatacontainer+xml; charset=UTF-8
                                //application/vnd.gov.sk.xmldatacontainer+xdcf; charset=UTF-8
                                //application/x-eform-xml
                                file.chunkUpload(new Blob([ret.xml], { type: "application/vnd.gov.sk.xmldatacontainer+xml; charset=UTF-8" }), fileName).then(function (fileInfo) { //"text/xml"
                                    that._addSKFile(fileInfo[0], { isFavorite:true });
                                });
                            }
                            return ret;
                        },

                      
                        wflSkFormZkontrolujHlasku: function () {
                            if (componentDto.ChybovaHlaska) {
                                this.dialogs.warning(
                                    "jres:26227134", //RC 26227134 : Varování
                                    componentDto.ChybovaHlaska);
                            }

                        },

                        getBytesFromXml: function (stringXml) {
                            var data = null;
                            return data;
                        },

                        vyresJmenoPrilohySFormularem: function (newName) {
                            
                            if (this.tempSKFormPrilohaName == null) {
                                this.tempSKFormPrilohaName = newName;
                            }


                        },

                        vratAdekvatniJmenoSKForm: function (navrhovane) {

                            var vys = "";
                            if (this.tempSKFormPrilohaName != null) {

                                var splitedGeneratedName = navrhovane.split(".");
                                var splitedSKFormPrilohaName = this.tempSKFormPrilohaName.split(".");
                                splitedSKFormPrilohaName[splitedSKFormPrilohaName.length - 1] = splitedGeneratedName[splitedGeneratedName.length - 1];
                                var vyslednyNazev = splitedSKFormPrilohaName.join(".");
                                vys = vyslednyNazev;
                            } else {
                                vys =  navrhovane;
                            }
                            return vys;
                        },

                        opravZarovnaniSKForm: function () {
                    
                            var skContent = $.content(this.iframeDivSkForm);
                            var ret = skContent.resizeIframe();
                        },

                        poUlozeniSKFormu: function (data) {
                            this.tryReloadDetail(undefined, {
                                flashMessage: "jres:31926221", //RC 31926221 : Data formuláře byly úspěšně uloženy do příloh.
                                flashMessageClass: "g-state-success",
                            });
                        },

                        _addSKFile: function (fileInfo, customData) { //: Gordic.General.ApplicationInterface.GFileInfoDto
                            var that = this;
                            var isFavorite = false;

                            var coverMsg = "jres:26227268"; //RC 26227268 : Vkládá se elektronická příloha.

                            if (customData != null && customData.isFavorite != null) {
                                isFavorite = customData.isFavorite;

                                if (isFavorite) {
                                    coverMsg = "jres:26227267"; //RC 26227267 : Vkládá se elektronický obraz.
                                }
                            }

                            var porCislo = null;
                            //if (customData != null && customData.porCislo != null) {
                            //    porCislo = customData.porCislo;
                            //}

                            //jmeno pro soubor
                   
                            fileInfo.filename = this.vratAdekvatniJmenoSKForm(fileInfo.filename);
                         
                            this.beginOperation(coverMsg);
                         
                           // var opt = $.extend({}, { isFavorite: isFavorite, porCislo: porCislo });
                            this._contentSaveSKForm.call("CreateFromFileSK", { ixp: componentDto.ixp, isFavorite: isFavorite, porCislo: porCislo, ixb: null, fileInfo: fileInfo })
                                .done(function (data) {
                                    that.poUlozeniSKFormu(data);
                                })
                                .always(function () {
                                    that.endOperation();
                                });

                        },

                        _vytvorSKForm: function (typeOfEform,novaData) {
                            var that = this;;
                            var options = {
                                ixs_fsk: componentDto.ixs_fsk,
                                typeOfEform: typeOfEform
                            };
                            
                            if (novaData) { // nová data
                                options.xmlDataBase64 = novaData;
                            }
                            else if (componentDto.fileDataBase64) { // pokud již nějalé data pro form jsou v příloze tak nastavím.
                               options.xmlDataBase64 = componentDto.fileDataBase64;
                            }
                            if (this.iframeDivSkForm != null) {
                                this.iframeDivSkForm.remove();
                            }
                            this.iframeDivSkForm = $("<div>");
                           // style='position: relative;'
                            this.iframeDivSkForm.appendTo(that.wflSKFormTab);
                            this.iframeDivSkForm.gcontent([Gordic.Wfl.WebClient.GEformSK, { inputOpt: options }]);
                            this.iframeDivSkForm.on("gtabopen", function () {
                              
                                $(that.iframeDivSkForm).resizeIframe();
                                //$.that(that.iframeDivSkForm).resizeIframe();
                            });
                            this.wflSKFormTab.on("gtabopen", function () {
                             
                                $.content(that.iframeDivSkForm).resizeIframe();
                                //$.that(that.iframeDivSkForm).resizeIframe();
                            });

                        },
                        editovatFormular: function () {
                            var that = this;
                            if (this.aktualneSeEditujeSKForm) {
                                this.actions.actEditovatSKForm.update({ caption: "jres:31926626" }); //RC 31926626 : Editovat formulář
                                this.actions.actUlozDataZFormulare.update({ enabled: false });
                                this.actions.actPredplnitZDokumentuSkComponent.update({ enabled: false });
                                this.aktualneSeEditujeSKForm = false;
                                this._vytvorSKForm(20);
                            }
                            else {
                               
                                this.actions.actEditovatSKForm.update({ caption: "jres:31926627" }); //RC 31926627 : Zrušit editaci
                                this.actions.actUlozDataZFormulare.update({ enabled: true });
                                this.actions.actPredplnitZDokumentuSkComponent.update({ enabled: true });
                                this.aktualneSeEditujeSKForm = true;
                                this._vytvorSKForm(10);
                            }
                            

                        },

                        predplnitZDokumentuSkComponent: function () {
                            var that = this;
                            var srv = this.createServiceContent("Gordic.Wfl.WebClient.GAttachmentService"); 
                            this.beginOperation();
                            var opt = {
                                Ixs_fsk: componentDto.ixs_fsk,
                                XmlDataBase64: componentDto.fileDataBase64 != null ? componentDto.fileDataBase64 : null,
                                Ixp: componentDto.ixp
                            };

                            srv.call("NaplnitSkForm", opt)
                                .then(function (retVal) {
                                    if (retVal) {
                                        //that.fileDataBase64String = retVal;
                                        that._vytvorSKForm(10, retVal);
                                    }
                                })
                                .always(function () {
                                    that.endOperation();
                                })
                                ;
                        },

                        enableWflSkForm: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }
                        
                            var lzeEditovatForm = true;
                            if (!l_bActionEnabled || !componentDto.lzeEditovat) {
                                lzeEditovatForm = false;
                            }

                            this.actions.actEditovatSKForm.update({ enabled: lzeEditovatForm });
                            this.actions.actGenerovatSkPdfAPridatDoPriloh.update({ enabled: l_bActionEnabled && componentDto.lzeEditovatPrilohy });
                            
                            this.aktualneSeEditujeSKForm = false;
                        },
                        showSimpleHtml: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                            var lzeEditovatForm = true;
                            if (!l_bActionEnabled || !componentDto.lzeEditovat) {
                                lzeEditovatForm = false;
                             }

                             this.actions.actEditovatSKForm.update({ caption: "jres:31926628" }); //RC 31926628 : Editovat formulář
                             this.actions.actUlozDataZFormulare.update({ enabled: false });
                             this.actions.actPredplnitZDokumentuSkComponent.update({ enabled: false });
                             this.actions.actEditovatSKForm.update({ enabled: lzeEditovatForm });
                             this.aktualneSeEditujeSKForm = false;
                             this._vytvorSKForm(0);
                        },
                        klasickeZobrazeni: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                            var lzeEditovatForm = true;
                            if (!l_bActionEnabled || !componentDto.lzeEditovat) {
                                lzeEditovatForm = false;
                            }

                            this.actions.actEditovatSKForm.update({ caption: "jres:31926628" }); //RC 31926628 : Editovat formulář
                            this.actions.actUlozDataZFormulare.update({ enabled: false });
                            this.actions.actPredplnitZDokumentuSkComponent.update({ enabled: false });
                            this.actions.actEditovatSKForm.update({ enabled: lzeEditovatForm });
                            this.aktualneSeEditujeSKForm = false;
                            this._vytvorSKForm(20);
                        },

                        generovatSkPdfAPridatDoPriloh: function () {

                            var that = this;
                            var data = null;
                            if (componentDto.fileDataBase64) {
                                data = componentDto.fileDataBase64;
                            }
                            var fileName = this.vratAdekvatniJmenoSKForm("Formulář" + ".pdf");
                            if (data) {
                                this.beginOperation();
                                var islOpt = {
                                    Ixs_fsk: componentDto.ixs_fsk,
                                    XmlDataBase64: data,
                                    Ixp: componentDto.ixp,
                                    FileName: fileName
                                };
                                Gordic.Isl.WflUPSR.vygenerujPDFZFormulare(islOpt).getData() //createEditableEform, createNoNEditableEform, createSimpleHtmlEform
                                    .done(function (retVal) {
                                        that.endOperation();
                                        that.poUlozeniSKFormu(data);
                                    }).fail(function () {
                                        that.endOperation();
                                    });
                            }
                        },

                        generovatSkPdf: function () {
                            var that = this;
                            var data = null;
                            if (componentDto.fileDataBase64) {
                                data = componentDto.fileDataBase64;
                            }
                            var fileName = this.vratAdekvatniJmenoSKForm("Formulář" + ".pdf");
                            //if (data) {
                                var callOpt = {
                                    Ixs_fsk: componentDto.ixs_fsk,
                                    XmlDataBase64: data,
                                    FileName: fileName
                                };
                                
                                this.beginOperation();
                                var srv = that.createServiceContent({ className: 'Gordic.Wfl.WebClient.GWflDetailUtils', params: {} });
                                srv.call('GnereovatPdfZSKForm', { inputDto: callOpt })
                                    .done(function (retVal) {
                                        if (retVal.Probehlo) { 
                                            that.stahniSouborPodleGuid(retVal.GUID);

                                        }

                                    })
                                    .always(function () {
                                        that.endOperation();
                                    });
                            //}
                        },

                        stahniSouborPodleGuid: function (guid) {

                            var f = new GFile();
                            var prom = f.download({ guid: guid });
                            prom.done(function() {
                                f.removeFile(guid);

                            });
                        },

                        otevriHistoriKonverzaceSkComponent: function () {
                            Gordic.Wfl.Dialogs.HistorieKonverzaceSKZpravDlg({
                                parentContent: this,
                                opt: {
                                    Dto: {
                                        ixb: componentDto.ixb_epod 
                                    },
                                    Ixp: componentDto.ixp,
                                    TypZobrazeni: 0
                                }
                            })

                        },

                        tiskObsahuIframe: function () {
                            var that = this;
                            var znacka = this.SslHeader_Dto.AktZnacka;
                            var datPodano = this.SslProfilDokument_Dto.DatPodano;

                            var skContent = $.content(this.iframeDivSkForm);
                            skContent.tiskObsahuIframe(znacka, datPodano);
                        }
                        /*
                        BASE64_MARKER : ';base64,',
                        convertDataURIToBinary:function(dataURI) {
                            var base64Index = dataURI.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
                            var base64 = dataURI.substring(base64Index);
                            var raw = window.atob(base64);
                            var rawLength = raw.length;
                            var array = new Uint8Array(new ArrayBuffer(rawLength));

                            for (i = 0; i < rawLength; i++) {
                                array[i] = raw.charCodeAt(i);
                            }
                            return array;
                        },

                        base64ToByteArray:function(base64String) {
                            try {
                                var sliceSize = 1024;
                                var byteCharacters = atob(base64String);
                                var bytesLength = byteCharacters.length;
                                var slicesCount = Math.ceil(bytesLength / sliceSize);
                                var byteArrays = new Array(slicesCount);

                                for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                                    var begin = sliceIndex * sliceSize;
                                    var end = Math.min(begin + sliceSize, bytesLength);

                                    var bytes = new Array(end - begin);
                                    for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                                        bytes[i] = byteCharacters[offset].charCodeAt(0);
                                    }
                                    byteArrays[sliceIndex] = new Uint8Array(bytes);
                                }
                                return byteArrays;
                            } catch (e) {
                                console.log("Couldn't convert to byte array: " + e);
                                return undefined;
                            }
                        }
                        */
                    },
                    actions: { //může být zadáno jako pole nebo jako objekt

                        actUlozDataZFormulare: {
                            caption: "jres:31926629", //RC 31926629 : Uložit jako hl. přílohu
                            //icon: undefined,
                            enabled: false,
                            run: function () {
                                $.content(this).saveDataToGinisFromSkForm();
                            }
                        },
                        actEditovatSKForm: {
                           
                            caption: "jres:31926630", //RC 31926630 : Editovat formulář
                           // icon: "",
                            run: function () {
                                $.content(this).editovatFormular();
                            }
                        },
                        
                        actResizeSKForm: {
                            caption: "jres:31926631", //RC 31926631 : Oprav zarovnání formuláře
                            //icon: "",
                            run: function () {
                                $.content(this).opravZarovnaniSKForm();
                            }
                        },
                        actShowSimpleHtml: {
                            caption: "jres:31926632", //RC 31926632 : Jednoduchý náhled
                            //icon: "",
                            run: function () {
                                $.content(this).showSimpleHtml();
                            }
                        },
                        actKlasickeZobrazeni: {
                            caption: "jres:31926678", //RC 31926678 : Klasické zobrazení
                            //icon: "",
                            run: function () {
                                $.content(this).klasickeZobrazeni();
                            }
                        },
                        actGenerovatSkPdf: {
                            caption: "jres:31926633", //RC 31926633 : Generovat PDF
                            //icon: "",
                            run: function () {
                                $.content(this).generovatSkPdf();
                                
                            }
                        },
                        actGenerovatSkPdfAPridatDoPriloh: {
                            caption: "jres:31926634", //RC 31926634 : Přidat jako PDF
                            //icon: "",
                            run: function () {
                                
                                $.content(this).generovatSkPdfAPridatDoPriloh();

                            }
                        },
                        actOtevriHistoriKonverzaceSkComponent: {
                            caption: "jres:31926635", //RC 31926635 : Související zprávy
                            icon:"gi-edesk",
                            enabled: true,
                            run: function () {
                                $.content(this).otevriHistoriKonverzaceSkComponent();
                            }
                        },
                        actPredplnitZDokumentuSkComponent: {
                            caption: "jres:31926636", //RC 31926636 : Předplnit z dokumentu
                            //icon: "gi-edesk",
                            enabled: false,
                            run: function () {
                                $.content(this).predplnitZDokumentuSkComponent();
                            }
                        },
                        actTiskObsahuStranky: {
                            caption: "jres:31926679", //RC 31926679 : Tisk stránky
                            //icon: "gi-edesk",
                            enabled: true,
                            run: function () {
                                $.content(this).tiskObsahuIframe();
                            }
                        },


                    },
                    menuBar: [

                        Gordic.Wfl.Globals.MenuDefinitions.detailVazby(),
                        { action: "actOtevriHistoriKonverzaceSkComponent", parent: "menuWflVazby" },
                        //{ action: "actSouvisejici", parent: "menuWflVazby" },
                        //{ action: "actEvidVystupy", parent: "menuWflVazby" }

                    ],

                    tabs: {
                        WflGfrm: {
                            tabParams: {
                                title: "jres:26226940", //RC 26226940 : Formulář
                                //opened: false,
                                group: Gordic.Prefabs.TabGroups.Gfrm(),
                                menuBar: [
                                    { action: "actEditovatSKForm", favorite: true },
                                    { action: "actUlozDataZFormulare", favorite: true },
                                    { action: "actShowSimpleHtml", favorite: true },
                                    { action: "actKlasickeZobrazeni", favorite: true },
                                    { action: "actGenerovatSkPdf", favorite: true },
                                    { action: "actGenerovatSkPdfAPridatDoPriloh", favorite: true },
                                    { action: "actPredplnitZDokumentuSkComponent", favorite: true },
                                    { action: "actTiskObsahuStranky", favorite: true },
                                    { action: "actResizeSKForm" },
                                    
                                    
                                    
                                ],
                                customLoad: function (loadParams) {

                                    var content = $.content(this);
                                    content.wflSKFormTab = $(this);
                                    
                                    // nastavení jméno souboru
                                    if (componentDto.file_name != null && componentDto.file_name != "") {
                                        content.tempSKFormPrilohaName = componentDto.file_name;
                                    }
                                    

                                    var typeOfEform = 20;  // init po reloadu
                                     /*
                                        // typeOfEform:
                                        Pouhy html přehled hodnot
                                        SimpleHtml=0,
                                        Editovatelný formulář
                                        Editable=10,
                                        Needitovatelný formulář
                                        NonEditable=20,

                                        PdfForm = 30
                                        */
                                  
                                    content._vytvorSKForm(typeOfEform);


                                }

                            }
                            //contentParams: [Gordic.Report.WebClient.GReportFormControl, {
                            //    autoLoadParams: {
                            //        Form: "wfl-form:DEMOX000XBF7",  // componentDto.IxsFrmGform //$.content(this).DetailDto.ixp
                            //        server: 'Gordic.Wfl.WebClient.GWflReportFormControl'
                            //    }
                            //}]
                        }
                    },
                    sidePanels: {
                        panelSKKonverzace: {
                            side: "right",
                            leaf: { caption: "jres:31926637" },  //RC 31926637 : Související zprávy
                            caption: "jres:31926638", //RC 31926638 : Související zprávy
                            customClass: "js-UpsrSk",
                            icon: "fa-comments-o",
                            minWidth: 300,
                            width: 400,
                            open: function () {
                                var this_ = $(this);
                               
                                if (!this_.hasClass("HistorieKonverzaceSKZpravDlgLoaded")) { 
                                    var cnt = $.content(this_);
                                    var opt = {
                                        Dto: {
                                            ixb: componentDto.ixb_epod
                                        },
                                        Ixp: componentDto.ixp,
                                        TypZobrazeni: 0
                                    };

                                    // Možnost 1
                                    //var panelContent = new GContent(GContent.createInitializer(["Gordic.Wfl.WebClient.HistorieKonverzaceSKZpravDlg", {  serverParams: opt, parentContent: cnt }]), this)
                                    //panelContent.load();

                                    // možnost 2
                                    var newDiv = $.newDiv();
                                    newDiv.appendTo(this)
                                    var panelContent = new GContent(GContent.createInitializer(["Gordic.Wfl.WebClient.HistorieKonverzaceSKZpravDlg", { serverParams: opt, parentContent: cnt, id: "idHistorieKonverzaceSKZpravDlgSideBar" }]), newDiv)
                                    panelContent.load();

                                    this_.addClass("HistorieKonverzaceSKZpravDlgLoaded");
                                }
                            
                                // původní verze 
                                /*
                                $.content(this_).className = "Gordic.Wfl.WebClient.HistorieKonverzaceSKZpravDlg";
                                
                                this_.gcontent("load", {
                                    Dto: {
                                        ixb: componentDto.ixb_epod       
                                    },
                                    Ixp: componentDto.ixp,
                                    TypZobrazeni: 0
,
                                });
                                */
                            }
                        }
                    }
                };
                return result;
            }

           
        },
    }, { extendIntellisense: GContent, pure: true });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\DetailBuilderComponents\GWflStatusBarComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflStatusBar: {
            create: function (componentDto) {
                var vytvorStatusActionParams = function (koleckeIkonDoStatusBaru) {
                    var statusActionParamsTemp = koleckeIkonDoStatusBaru;
                    var statusActionParams = {
                        icon: statusActionParamsTemp.icon,
                        caption: statusActionParamsTemp.caption,
                        tooltip: statusActionParamsTemp.tooltip,
                        name: statusActionParamsTemp.name
                    };

                    if (statusActionParams.icon === "fa-fw" || (Array.isArray(statusActionParams.icon) && statusActionParams.icon.length > 0 && statusActionParams.icon[0] === "fa-fw")) {
                        statusActionParams.icon = "gi-radio";
                        statusActionParams.enabled = false;
                    }

                    return statusActionParams;
                };

                var result = {
                    contentExtensions: { // sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                        WflStatusBar_Dto: componentDto, // aby byla jistota, že tam bude
                        // Refresh statusbaru
                        setWflStatusBar_Dto: function (newWflStatusBar_Dto) {
                            var that = this;
                            this.WflStatusBar_Dto = newWflStatusBar_Dto;
                            if (this.WflStatusBar_Dto.IconCalculatorDto) {
                                this.WflStatusBar_Dto.koleckeIkonDoStatusBaru = Gordic.Wfl.Globals.ListSupport.StatusBarKolekceIkon(this.WflStatusBar_Dto.IconCalculatorDto, { PrizVBaliku: componentDto.PrizVBaliku, TypSpis: componentDto.TypSpis, withNevyrizenoIcon:true});

                                var pedantuvArrayLength = this.WflStatusBar_Dto.koleckeIkonDoStatusBaru.length;
                                for (var i = 0; i < pedantuvArrayLength; i++) {
                                    var statusActionParams = vytvorStatusActionParams(this.WflStatusBar_Dto.koleckeIkonDoStatusBaru[i]);
                                    that.actions[statusActionParams.name].update(statusActionParams);
                                }
                            }
                        },
                    },
                    actions: {}
                };

                // vytvoření akcí do statusbaru statusbaru
                if (componentDto.IconCalculatorDto) {
                    componentDto.koleckeIkonDoStatusBaru = Gordic.Wfl.Globals.ListSupport.StatusBarKolekceIkon(componentDto.IconCalculatorDto, { PrizVBaliku: componentDto.PrizVBaliku, TypSpis: componentDto.TypSpis, withNevyrizenoIcon: true });
                    // inicializuju statusbar      
                    if (result.statusBar === null || result.statusBar === undefined) { result.statusBar = []; }

                    var pedantuvArrayLength = componentDto.koleckeIkonDoStatusBaru.length;
                    for (var i = 0; i < pedantuvArrayLength; i++) {
                        var statusActionParams = vytvorStatusActionParams(componentDto.koleckeIkonDoStatusBaru[i]);
                        result.actions[statusActionParams.name] = statusActionParams;
                        // přidám do statusbaru
                        result.statusBar.push({ action: statusActionParams.name });
                    }
                }

                //PrioritniInfo
                if (componentDto.PrioritniInfo != null && componentDto.PrioritniInfo !=="" ) {
                    if (result.statusBar === null || result.statusBar === undefined) { result.statusBar = []; }
                    result.statusBar.push(
                        {
                            type: "static",
                            id: "staticPrioritniInfo",
                            caption: componentDto.PrioritniInfo,
                            tooltip: componentDto.PrioritniInfo,
                            customClass: "g-state-text g-state-important"
                            //action: new GAction({
                            //    name: "actPrioritniInfo",
                            //    caption: componentDto.PrioritniInfo,
                            //    run: function () {
                            //        ;
                            //    }
                            //})
                        });
                }

                //existuje žádost v RAK
                if (componentDto.IsZadostVRak) {
                    if (result.statusBar === null || result.statusBar === undefined) { result.statusBar = []; }
                    result.statusBar.push(
                        {
                            type: "static",
                            id: "staticExistujeZadostVRakInfo",
                            caption: "jres:31926606", //RC 31926606 : ŽÁDOST V RAK
                            tooltip: "jres:31926605", //RC 31926605 : Existuje nevyřízená žádost v RAK
                            customClass: "g-state-text g-state-warning"
                            //action: new GAction({
                            //    name: "actPrioritniInfo",
                            //    caption: componentDto.PrioritniInfo,
                            //    run: function () {
                            //        ;
                            //    }
                            //})
                        });
                }
           

                return result;
            }           
        },
    }, { extendIntellisense: GContent, pure: true });
})(jQuery);

//#endregion


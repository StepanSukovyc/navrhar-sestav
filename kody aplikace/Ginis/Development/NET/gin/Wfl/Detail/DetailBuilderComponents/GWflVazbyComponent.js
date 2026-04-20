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
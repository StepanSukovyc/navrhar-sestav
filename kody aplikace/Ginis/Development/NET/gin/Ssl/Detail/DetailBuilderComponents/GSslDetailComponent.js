(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {
        SslDetail: {

            create: function (content, componentDto) {
                var result = {
                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableSslDetail();
                        },
                        function (builder, menus) {
                            content.element.addHelpContext('PostraniPanelVzory');
                        }
                    ],

                    onBuild: [
                        function () {
                            if (this.RezimPodani == null || this.RezimPodani === 0) {
                                this.ulozNavstivenyDokument();
                            }
                            this.hideFlash("idflashBalik");
                        }
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                        VlozitDoSpisuVyriditRequest: "jres:26255224", //RC 26255224 : Přejete si před vložením do spisu dokument vyřídit?
                        PolozkyDoplnenyZeSpisuRequest: "jres:26255225", //RC 26255225 : V případě, že nejsou vyplněny povinné položky, budou doplněny ze spisu.
                        SpisNovyDokErrText: "jres:26255206", //RC 26255206 : Do tohoto spisu nelze vložit nový dokument.
                        VlastniDokErrText: "jres:26255203", //RC 26255203 : V editačním módu nelze vytvářet vlastní dokument.
                        CiziDokErrText: "jres:26255204", //RC 26255204 : V editačním módu nelze vytvořit cizí dokument.
                        VyrizujiciDokErrText: "jres:26255205", //RC 26255205 : V editačním módu nelze vytvářet vyřizující dokument.
                        PrevzetiRequestText: "jres:26255169", //RC 26255169 : Opravdu chcete převzít dokument, když je ve vlastnictví jiného spisového uzlu?
                        VyrizeniDokumentuWinTitle: "jres:26255198", //RC 26255198 : Vyřízení dokumentu
                        VyriditSpisJineAgendyRequest: "jres:26255236", //RC 26255236 : Přejete si opravdu vyřídit spis? Ve spise jsou vloženy dokumenty jiných agend. Počet:
                        // VyrizeniSpZnMessage: "jres:26255106", //RC 26255106 : Některý z dokumentů vložených ve spisu má silnější skartační znak nebo delší skartační lhůtu než spis!
                        UlozeniSpisuWinTitle: "jres:26255200", //RC 26255200 : Uložení spisu
                        VyrizeniVyplnitVecText: "jres:26255238", //RC 26255238 : Před vyřízením dokumentu je potřeba vyplnit věc!
                        ZrusitPrideleniRequest: "jres:26255111", //RC 26255111 : Opravdu chcete zrušit redistribuci a provést akci?
                       // DuvodZtratyDokumentuSpisuWinTitle: "jres:26256361", //RC 26256361 : Důvod ztráty dokumentu/spisu
                        DuvodZtratyDokumentuSpisuWinTitle: "jres:26257253", //RC 26257253 : Záznam o ztrátě / poškození.
                        PreruseniVyrizovaniWinTitle: "jres:26255185", //RC 26255185 : Přerušení vyřizování dokumentu
                        PravniMocWinTitle: "jres:26255186", //RC 26255186 : Nabytí právní moci dokumentu
                        DuvodStornaSpisuWinTitle: componentDto.gin_n23_vedd == 0 ? "jres:26255183" : "jres:26257240", //RC 26257240 : Důvod znepřístupnění (storna) spisu
                        DuvodStornaDokumentuWinTitle: componentDto.gin_n23_vedd == 0 ? "jres:26255184" : "jres:26257241", //RC 26257241 : Důvod znepřístupnění (storna) dokumentu
                        StornoSpisuRequest: "jres:26255228", //RC 26255228 : Opravdu chcete spis stornovat? Budou stornovány i všechny dokumenty vložené!
                        StornoVyrizDokRequestText: "jres:26255531", //RC 26255531 : Opravdu chcete stornovat tento dokument (bude stornován i vyřizující
                        ZnovupodatRequest: "jres:26255229", //RC 26255229 : Opravdu chcete dokument znovupodat?
                        VyriditAdActaRequest: "jres:26255235", //RC 26255235 : Chcete opravdu vyřídit dokument?

                        // přidané funkce s thisem


                        hotfixi: function () {

                            //#region HotFixi
                            // odstranění mezer u hlaviček
                            this.findFormSections().eq(3).css("padding-top", "0rem");
                            //this.findFormSections().eq(4).css("padding-top", "0rem");
                            //#endregion
                        },

                        ulozNavstivenyDokument: function () {
                            if (!componentDto.IsZastup) {
                                var obj = {
                                    Ixp: componentDto.ixp,
                                    //SEle: componentDto.SEle,
                                    //PrizSpis: componentDto.PrizSpis,
                                    //Nazev: componentDto.Nazev,
                                    //AktZnacka: componentDto.AktZnacka
                                };
                                Gordic.Ssl.Globals.PosledniNavstiveny.pridejPosledniNavstivenyDoc(this.globalSettings, obj);
                            }

                        },



                        zmenaEditace: function (opt) {
                            var that = this;
                            var param = this.dataProZmnenuEditace();
                            //this.element.trigger('rememberinitialopen');
                            this.tryReloadDetail(param, opt);
                        },
                        /*
                        obcerstvit: function () {
                            var that = this;
                            this.tryReloadDetail(undefined, {
                                flashMessage: "jres:31937163", //RC 31937163 : Občerstveno
                                flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                            });
                        },
                        */
                        dataProZmnenuEditace: function () {
                            var param = {
                                DetailDto: this.DetailDto,
                                RezimPodani: 0,
                                InicDok: this.InicDok,
                                EditMode: !this.EditMode

                            };

                            if (param.EditMode) {

                                var activeTab = this.element.find('.gtabmanager').gtabmanager('getActive')
                                if (activeTab === Gordic.Prefabs.TabGroups.PopisneVlastnosti().id) { 
                                    param.IdZalozkyNeboPaneluKOtevreni = Gordic.Prefabs.TabGroups.PopisneVlastnosti().id;
                                }
                                else if (activeTab === Gordic.Prefabs.TabGroups.RozsirujiciVlastnosti().id) {
                                    param.IdZalozkyNeboPaneluKOtevreni = Gordic.Prefabs.TabGroups.RozsirujiciVlastnosti().id;
                                }
                                else if (activeTab === Gordic.Prefabs.TabGroups.Zverejneni().id) {
                                    param.IdZalozkyNeboPaneluKOtevreni = Gordic.Prefabs.TabGroups.Zverejneni().id;
                                }
                                else if (activeTab === Gordic.Prefabs.TabGroups.Doruceni().id) {
                                    param.IdZalozkyNeboPaneluKOtevreni = Gordic.Prefabs.TabGroups.Doruceni().id;
                                }
                                else if (activeTab === Gordic.Prefabs.TabGroups.EklepPredplneni().id) {
                                    param.IdZalozkyNeboPaneluKOtevreni = Gordic.Prefabs.TabGroups.EklepPredplneni().id;
                                }
                                else {
                                    if (componentDto.IsSpis) {
                                        param.IdZalozkyNeboPaneluKOtevreni = Gordic.Prefabs.TabGroups.Spis().id;
                                    } else {
                                        param.IdZalozkyNeboPaneluKOtevreni = Gordic.Prefabs.TabGroups.Dokument().id;
                                    }
                                }
                           //     param.IdZalozkyNeboPaneluKOtevreni = "SslProfil";
                            }

                            return param;
                        },
                        ulozitZmeny: function (model) {
                            var that = this;
                            this.pockejNaVerifyPolicek().then(function () {
                                if (that.validuj()) {
                                    model = model ? model : {};
                                    //this.findForms("formSpisHeader").findFields().gfield("model", "collect", model);
                                    that.zkontrolujComponenty(model);
                                }
                            });
                        },


                        zkontrolujComponenty: function (model) {
                            var that = this;

                            var arrOfPromise = [];
                            var all = {};
                            //header
                            //if (this.saveSslHeader) {
                            //    $.extend(all, this.saveSslHeader());
                            //}
                            if (this.saveSslHeader) {

                                var promisHeader = this.saveSslHeader();
                                promisHeader.done(function (retVal) {
                                    $.extend(all, retVal);
                                });
                                arrOfPromise.push(promisHeader);

                            }


                            //vyrizeni
                            if (this.predUlozenimSslDetailVyrizeni) {
                                var promisVyrizeni = this.predUlozenimSslDetailVyrizeni();
                                promisVyrizeni.done(function (retVal) {
                                    $.extend(all, retVal);
                                });
                                arrOfPromise.push(promisVyrizeni);
                            }
                            //doruceni
                            if (this.saveSslDetailDoruceni) {
                                $.extend(all, this.saveSslDetailDoruceni());
                            }
                            //profil dokument
                            if (this.saveSslProfil) {
                                $.extend(all, this.saveSslProfil());
                            }
                            if (this.saveEkoProfil) {
                                $.extend(all, this.saveEkoProfil());
                            }

                            //profil spis
                            if (this.saveSslProfilSpis) {

                                var promisProfilSpis= this.saveSslProfilSpis();
                                promisProfilSpis.done(function (retVal) {
                                    $.extend(all, retVal);
                                });
                                arrOfPromise.push(promisProfilSpis);

                            }

                            //vlastnosti
                            if (this.predUlozenimSslDetailVlastnosti) {
                                var promisVlastnosti = this.predUlozenimSslDetailVlastnosti();
                                promisVlastnosti.done(function (retVal) {
                                    $.extend(all, retVal);
                                });
                                arrOfPromise.push(promisVlastnosti);
                            }

                            //zveřejnění
                            if (this.saveZverejneni) {
                                var promisZverejneni = this.saveZverejneni();
                                promisZverejneni.done(function (retVal) {
                                    $.extend(all, retVal);
                                });
                                arrOfPromise.push(promisZverejneni);
                            }

                            //doruceni
                            if (this.saveSslDetailEklepPredplneni) {
                                $.extend(all, this.saveSslDetailEklepPredplneni());
                            }

                            //ruzne
                            this.sezbirejPromenne(model);


                            //čekání až se splní všechny
                            if (arrOfPromise.length > 0) {
                                $.when.apply(null, arrOfPromise).done(function () {
                                    $.extend(model, all);
                                    that.ulozitZmenyFinal(model);
                                });
                            } else {
                                $.extend(model, all);
                                that.ulozitZmenyFinal(model);
                            }
                        },
                        sezbirejPromenne: function (model) {
                            model.FlagEvidovat = this.flagEvidovat;
                            //model.SelectedDenik = this.selectedDenikToSave; dsebesta nyní tady není potřeba 

                        },

                        pockejNaVerifyPolicek: function () {
                            var that = this;
                            var formy = this.findForms();
                            return formy.gform("waitForValues")

                        },

                        validuj: function () {
                            var formy = this.findForms();
                            return formy.gform("isValid");
                        },


                        closing: function () { // podmineny userClose 
                            var def = $.Deferred();
                            var naDetailuDosloKeZmene = false;
                            if (this.indikaceZdaDosloKReloaduContentu || this.naDetailuDosloKeZmene) {
                                naDetailuDosloKeZmene = true;
                            }
                            var retVal = {
                                naDetailuDosloKeZmene: naDetailuDosloKeZmene
                            };


                            if (!this.zavritBezKontrolyZmen && (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0))) {
                                var dosloKeZmene = false;
                                var formy = this.findForms();
                                for (var i = 0; i < formy.length; i++) {
                                    if (formy.eq(i).gform("hasChanged")) {
                                        dosloKeZmene = true;
                                    }
                                }
                                if (dosloKeZmene) {
                                    this.dialogs.messageBox("jres:26255319", //RC 26255319 : Zavřít
                                        "jres:31937152", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 31937152 : Na detailu jsou neuložené změny, přejete si přesto detail zavřít?
                                        .on("yes",
                                            function () {
                                                def.resolve(retVal);
                                            })
                                        .on("closed",
                                            function () {
                                                def.reject();
                                            });
                                } else {
                                    def.resolve(retVal);
                                }
                            } else {
                                def.resolve(retVal);
                            }
                       
                            
                            return def.promise();
                        },



                        //#region Dokument
                        //vlastni pisemnost
                        vlastniPisemnost: function () {
                            var that = this;
                            var optVlastni = {};
                            var showDialog = true;
                            if (!this.EditMode) {
                                if (componentDto.IsSpis) {
                                    if (componentDto.LzeVlozitDoSpisu) {
                                        if (componentDto.IsSpisVyrizen) {
                                            showDialog = false;
                                            this.dialogs.confirm("?", this.VlozitDoSpisuVyriditRequest + "\n" + this.PolozkyDoplnenyZeSpisuRequest).on("closed", function (ev, retVal) {
                                                if (retVal) {
                                                    if (retVal === "yes") {
                                                        optVlastni.FlagVyridit = 1;
                                                        that.zadaniIdNovehoDokumentuVlastni(optVlastni); // dsebesta 16.11.2022 přesunuto do ifu protože peklo T23434
                                                    }
                                                    //that.zadaniIdNovehoDokumentuVlastni(optVlastni);
                                                }
                                            });
                                        } 
                                    } else {
                                        this.dialogs.alert("jres:31937042", this.SpisNovyDokErrText); //RC 31937042 : Pozor
                                        return;
                                    }
                                }
                                if (showDialog) {
                                    that.zadaniIdNovehoDokumentuVlastni(optVlastni);
                                }
                            } else {
                                this.dialogs.alert("jres:31937042", this.VlastniDokErrText); //RC 31937042 : Pozor
                            }
                        },
                        zadaniIdNovehoDokumentuVlastni: function (optVlastni) {
                            var that = this;
                            var options = {
                                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                                TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp
                            };
                            Gordic.Wfl.Dialogs.GenerovaniIxp(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).done(function (retVal, content) {
                                that.zadaniIdNovehoDokumentuOnCompleteFunction(retVal, optVlastni);  //l_oZadaniIdNovehoDokumentuOnCompleteFunction(retVal);
                            });
                        },
                        zadaniIdNovehoDokumentuOnCompleteFunction: function (retVal, optVlastni) {
                            var that = this;
                            if (retVal != null) {
                                if (retVal.IxpExist === false) {
                                    if (!componentDto.IsSpis) {
                                        var params = {
                                            DetailDto: { ixp: retVal.Ixp },
                                            RezimPodani: 1
                                        };
                                        //that.tryReloadDetail(params); //puvodně se reloadoval  aktualni dokument
                                        that.otevriNovyDetail(params);
                                    } else {
                                        var l_sIxpSpis = componentDto.ixp;

                                        optVlastni.DetailDto = { ixp: retVal.Ixp };
                                        optVlastni.RezimPodani = 1;
                                        optVlastni.IxpSpisProNovePodani = l_sIxpSpis;
                                        optVlastni.StUtajIdProNovePodaniDoSpisu = componentDto.StUtajIdWfl; // T39512
                                        optVlastni.PredplneniDatProPodani = { // T39512
                                            st_utaj_id: componentDto.StUtajIdWfl 
                                        };
                                        that.otevriNovyDetail(optVlastni);
                                    }
                                } else { // pokud ixp jiz existuje zobrazim detail
                                    that.otevriNovyDetail(
                                        {
                                            DetailDto: { ixp: retVal.Ixp }
                                        }
                                    );
                                }
                            }
                        },

                        //cizi pisemnost
                        ciziPisemnost: function () {
                            var that = this;
                            var optCizi = {};
                            var showDialog = true;
                           
                            if (!this.EditMode) {
                                if (componentDto.IsSpis) {
                                    if (componentDto.LzeVlozitDoSpisu) {
                                        if (componentDto.IsSpisVyrizen) {
                                            showDialog = false;
                                            this.dialogs.confirm("?", this.VlozitDoSpisuVyriditRequest + "\n" + this.PolozkyDoplnenyZeSpisuRequest).on("closed", function (ev, retVal) {
                                                if (retVal) {
                                                    if (retVal === "yes") {
                                                        optCizi.FlagVyridit = 1;
                                                        that.zadaniIdNovehoDokumentuCizi(optCizi);// dsebesta 16.11.2022 přesunuto do ifu protože peklo T23434
                                                    }
                                                    //that.zadaniIdNovehoDokumentuCizi(optCizi);// dsebesta 16.11.2022 přesunuto do ifu protože peklo T23434
                                                }
                                            });
                                        }
                                    } else {
                                        this.dialogs.alert("jres:31937042", this.SpisNovyDokErrText); //RC 31937042 : Pozor
                                        return;
                                    }
                                }
                                if (showDialog) {
                                    that.zadaniIdNovehoDokumentuCizi(optCizi);
                                }
                            } else {
                                this.dialogs.alert("jres:31937042", this.VlastniDokErrText); //RC 31937042 : Pozor
                            }
                        },
                        zadaniIdNovehoDokumentuCizi: function (optCizi) {
                            var that = this;
                            var options = {
                                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Cizi,
                                TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp
                            };
                            Gordic.Wfl.Dialogs.GenerovaniIxp(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).done(function (retVal, content) {
                                that.zadaniIdNovehoDokumentuOnCompleteFunctionCizi(retVal, optCizi);
                            });
                        },
                        zadaniIdNovehoDokumentuOnCompleteFunctionCizi: function (retVal, optCizi) {
                            var that = this;
                            if (retVal != null) {
                                if (retVal.IxpExist === false) {
                                    if (!componentDto.IsSpis) {
                                        var params = {
                                            DetailDto: { ixp: retVal.Ixp },
                                            RezimPodani: 2
                                        };
                                        //that.tryReloadDetail(params); //puvodně se reloadoval  aktualni dokument
                                        that.otevriNovyDetail(params);
                                    } else {
                                        var l_sIxpSpis = componentDto.ixp;
                                        optCizi.DetailDto = { ixp: retVal.Ixp };
                                        optCizi.RezimPodani = 2;
                                        optCizi.IxpSpisProNovePodani = l_sIxpSpis;
                                        optCizi.StUtajIdProNovePodaniDoSpisu = componentDto.StUtajIdWfl; // T39512
                                        optCizi.PredplneniDatProPodani = { // T39512
                                            st_utaj_id: componentDto.StUtajIdWfl
                                        };
                                        that.otevriNovyDetail(optCizi);
                                    }
                                } else { // pokud ixp jiz existuje zobrazim detail
                                    that.otevriNovyDetail(
                                        {
                                            DetailDto: { ixp: retVal.Ixp }
                                        }
                                    );
                                }
                            }
                        },
                        //souvisejiciUkol
                        souvisejiciUkol: function () {
                            var that = this;
                           
                           
                            var isUko = false;
                            for (var i = 0; i < Gordic.Consts.Apps.length; i++) {
                                if (Gordic.Consts.Apps[i].faze === "GWAUKO05") {
                                    isUko = true;
                                }
                            }
                            if (isUko) {
                                Gordic.WebApp.Utility.openApp(
                                    "GWAUKO05",
                                    'VytvorUkolZDokumentu',
                                    {
                                        ixx1: componentDto.ixp,
                                        ixx2: null,
                                        ixx3: null
                                    }
                                    /*
                                    ,
                                    {
                                        ticketType: Gordic.Enums.TicketType.WithLoginAndContext
                                    }
                                    */
                                );
                            } else {
                                this.dialogs.warning(
                                    "jres:31937246", //RC 31937246 : Modul UKO nenalezen
                                    "jres:31937245"); //RC 31937245 : Modul UKO nelze otevřít, kontaktujte prosím správce.
                            }

                        },
                        /*
                        souvisejiciUkolZalozit: function (selectedDenik) {
                            var that = this;
                            var opt = {
                                Ixp: componentDto.ixp,
                                SelectedDenik: selectedDenik
                            };
                            var srv = this.createServiceContent({ className: "Gordic.Ssl.WebClient.GDetailUtils", params: {} });  //servisni sluzba/content
                            srv.call("ZalozitSouvisejiciUkol", opt)
                                .done(function (rv) {
                                    if (rv.Message) {
                                        that.showFlash(rv.Message, Gordic.Global.Enums.ColorStateClass.success, that.flashTimer);
                                    } else if (rv.ErrorMessage) {
                                        that.showFlash(rv.ErrorMessage, Gordic.Global.Enums.ColorStateClass.important, that.flashTimer);
                                    }
                                });
                        },
                        */
                        ulozitDoPoznamkovehoBloku: function () {
                            var that = this;
                            
                            let vyberPoznBloku = this.globalSettings.get("Global.Wfl.AppSettings.OthersSettings.PoznBlokViceBloku");

                            if(vyberPoznBloku === true) {
                                let opt = { TypBlp: Gordic.Wfl.Globals.Enums.TypBlp.dokspis };
                                Gordic.Wfl.Dialogs.PracovniBlokyDlg(that, opt).done(function (retVal) {
                                    if(retVal) {
                                        that.pridatIxpDoPoznamkovehoBloku(componentDto.ixp, retVal.ixsBlp);
                                    }
                                });
                            } else {
                                that.pridatIxpDoPoznamkovehoBloku(componentDto.ixp, "");
                            }

                        },
                        pridatIxpDoPoznamkovehoBloku: function (ixp, ixsBlp) {
                            var that = this;
                            var opt = {
                                ixp: ixp,
                                ixsBlp: ixsBlp
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("PridatIxpDoPoznamkovehoBloku", opt)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.showFlash("jres:26256860", Gordic.Global.Enums.ColorStateClass.success, that.flashTimer);//RC 26256860 : Dokument byl vložen do pracovního bloku
                                    }
                                }).always(function () { srv.close(); });
                        },

                        poslatDokumentEmailem: function () {
                            var flashId = 'poslatDokumentEmailem';
                            var l_sIxp = componentDto.ixp;
                            var l_oJSONPars = { Ixp: l_sIxp };
                            var that = this;

                            Gordic.Wfl.Dialogs.GOdeslaniEmailNedokladoveDlg(this, l_oJSONPars)
                                .done(function (retVal) {
                                    // 29.12.2022 - TFeik
                                    // State není enum / číslo, ale jeden ze stringů 'canceled' | 'done' | 'failed'.
                                    // Pro TS to je Gordic.Wfl.WebClient.GOdeslaniPredpisBaseDlgResult.
                                    if (retVal && retVal.state === 'done') {
                                        that.showFlash('jres:26255237', Gordic.Global.Enums.ColorStateClass.success, flashId); //RC 26255237 : Email byl úspěšně odeslán.
                                    } else if (retVal && retVal.state === 'canceled') {
                                        that.showFlash('jres:32170010', Gordic.Global.Enums.ColorStateClass.warning, flashId); //RC 32170010 : Odeslání emailu zrušeno uživatelem.
                                    } else {
                                        that.showFlash('jres:31937021', Gordic.Global.Enums.ColorStateClass.error, flashId); //RC 31937021 : Email se nepodařilo odeslat.
                                    }
                                })
                                .fail(function (retFail) {
                                    that.showFlash("jres:31937021", Gordic.Global.Enums.ColorStateClass.error, flashId); //RC 31937021 : Email se nepodařilo odeslat.
                                    // možná l_sErrMessage.
                                });
                        },

                        //#endregion

                        //#region Zobrazit

                        zmenyDulezitychPolozek: function () {
                            var options = {
                                Ixp: componentDto.ixp
                            };
                            var retVal = Gordic.Ssl.Dialogs.ZmenyDulezitychPolozekDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if (retVal) {
                                    // netřeba  that.tryReloadDetail();
                                }
                            });
                        },

                        //#endregion


                        //#region Cinnosti

                        nabytPravniMoc: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var l_sId = "Pisemnost";
                            if (componentDto.IsSpis) {
                                l_sId = "Spis";
                            }
                            var l_oParamsJSON = { Ixp: l_sIxp, Dokument: l_sId };

                            Gordic.Ssl.Dialogs.NabytPravniMocDlg(that, l_oParamsJSON, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if (retVal) {
                                    that.tryReloadDetail();
                                }
                            });

                        },

                        zmenaSpouUdalosti: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            
                            var l_oParamsJSON = { Ixp: l_sIxp};

                            Gordic.Wfl.Dialogs.ZmenaSpouUdalostiDlg({ parentContent: this, opt: l_oParamsJSON, ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow })
                                .done(function (retVal) {
                                    if (retVal && retVal.zmena) {
                                        that.tryReloadDetail();
                                    }
                            });

                        },

                        stornovat: function () {
                            var that = this;

                            var winTitle = "";

                            if (componentDto.IsSpis) {
                                winTitle = this.DuvodStornaSpisuWinTitle;

                                this.dialogs.confirm("jres:26255281", this.StornoSpisuRequest).on("closed", function (ev, retVal) { //RC 26255281 : Storno
                                    if (retVal) {
                                        if (retVal === "yes") {
                                            that.zadatDuvodStorna(winTitle);
                                        }
                                    }
                                });

                            } else {
                                winTitle = this.DuvodStornaDokumentuWinTitle;
                                this.zadatDuvodStorna(winTitle);
                            }
                        },

                        zadatDuvodStorna: function (winTitle) {
                            var that = this;
                            var options = {
                                winTitle: winTitle
                            };
                            var $div = Gordic.Ssl.Dialogs.AddDuvodDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if (retVal && retVal.duvod) {
                                    that.zkontrolovatZdaIniciacni_Storno(retVal.duvod);
                                }
                            });

                        },
                        zkontrolovatZdaIniciacni_Storno: function (duvod) {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var provadetHned = true;
                            if (!componentDto.IsSpis) { // jedna se o dokument
                                if (componentDto.PrizCj != 0) {
                                    if (componentDto.IxpInit == l_sIxp && componentDto.IxpVyriz) { // pokud se jedna o iniciacni dok a zaroven ma i vyrizujici dokument
                                        provadetHned = false;

                                        this.dialogs.confirm("Storno", that.StornoVyrizDokRequestText + " " + componentDto.IxpVyriz + ")?").on("closed", function (ev, retVal) {
                                            if (retVal) {
                                                if (retVal === "yes") {
                                                    that.provedStorno(duvod);
                                                }
                                            }
                                        });
                                    }
                                }
                            }

                            if (provadetHned) {
                                that.provedStorno(duvod);
                            }
                        },
                        provedStorno: function (duvod) {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var opt = {
                                "Ixp": l_sIxp,
                                "Duvod": duvod
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("StornovatDokument", opt)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail(undefined, {
                                            flashMessage: componentDto.gin_n23_vedd == 0 ? "jres:31937044" : "jres:26257242", //RC 26257242 : Úspěšně znepřístupněno (stornováno)
                                            flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                        });
                                    }
                                }).always(function () { srv.close(); });
                        },

                        zrusitStorno: function () {
                            var that = this;
                            var options = {
                                winTitle: componentDto.gin_n23_vedd == 0 ? "jres:26257257" : "jres:26257256" //RC 26257256 : Zrušení znepřístupnění (storna) dokumentu/spisu
                            };
                            var $div = Gordic.Ssl.Dialogs.AddDuvodDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if (retVal && retVal.duvod) {
                                    var opt = {
                                        "Ixp": componentDto.ixp,
                                        "Duvod": retVal.duvod,
                                        "DatZmena": componentDto.DatZmena
                                    };
                                    var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                    srv.call("ZrusitStornoDokumentu", opt)
                                        .done(function (retVal) {
                                            if (retVal.StavBool) {
                                                that.tryReloadDetail(undefined, {
                                                    flashMessage: componentDto.gin_n23_vedd == 0 ? "jres:31937449" : "jres:26257243", //RC 26257243 : Znepřístupnění (storno) bylo úspěšně zrušeno
                                                    flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                });
                                            }
                                        }).always(function () { srv.close(); });
                                }
                            });


                        },

                        predatPrevzitExtAg: function (FlagPredatPrevzit) {
                            var that = this;

                            if (FlagPredatPrevzit == "Predat") { // predani
                                Gordic.Wfl.Dialogs.VyberExtAgDlg(that, { IxsTyp: componentDto.IxsTyp, TypSpis: componentDto.TypSpis }, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                    if (retVal && retVal.IxsExt) {
                                        that.predatPrevzitExtAg_AgendaVybrana(retVal.IxsExt);
                                    }
                                });
                            } else { // prevzeti
                                if (componentDto.gin_n23_vedd > 0) {
                                    let dotaz = "jres:26257384"; //RC 26257384 : Dotaz

                                    that.dialogs.prompt(dotaz, "jres:26257382") //RC 26257382 : Zadejte důvod převzetí z externí agendy
                                        .on("ok", function (ev, duvod) {
                                            if (duvod != null && duvod.trim() != "") {
                                                that.predatPrevzitExtAg_AgendaVybrana("", duvod);
                                            } else {
                                                that.dialogs.alert("jres:26257383"); //RC 26257383 : Musíte uvést důvod převzetí z externí agendy
                                            }
                                        })
                                } else {
                                    that.predatPrevzitExtAg_AgendaVybrana("");
                                }
                            }
                        },
                        predatPrevzitExtAg_AgendaVybrana: function (selectedEA, duvod) {
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            var opt = {
                                "Ixp": l_sIxp,
                                "IxsExt": selectedEA,
                                "Duvod": duvod ? duvod : undefined
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("PredaniDoExtAgendy", opt)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {

                                        that.tryReloadDetail(undefined, {
                                            flashMessage: retVal.Message,
                                            flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                        });
                                    }
                                }).always(function () { srv.close(); });
                        },
                        InformovatExtAgendu: function () {
                            var that = this;
                       
                            Gordic.Wfl.Dialogs.InformovatExtAgenduDlg(this, { IxsTyp: componentDto.IxsTyp }, Gordic.Global.Enums.ModOtevreni.showModalWindow)

                                .done(function (retVal) {
                                    if (retVal && retVal.IxsExt) {
                                        var opt = {
                                            Ixp: componentDto.ixp,
                                            IxsExt: retVal.IxsExt
                                        };

                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("InformovatExtAgendu", opt)
                                            .done(function (retVal) {
                                                if (retVal.StavBool) {
                                                    that.tryReloadDetail(undefined, {
                                                        flashMessage: "jres:31937326", //RC 31937326 : Informace externí agendy / systému byla dokončena
                                                        flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                    });
                                                }
                                            }).always(function () { srv.close(); });
                                    }
                            });
                         
                        },

                        znovupodatDokument: function () {
                            var l_sIxp = componentDto.ixp;
                            var that = this;
                            this.dialogs.confirm("jres:31937045", this.ZnovupodatRequest).on("closed", function (ev, retVal) { //RC 31937045 : Znovu podat
                                if (retVal) {
                                    if (retVal === "yes") {
                                        var opt = {
                                            "Ixp": l_sIxp
                                        };
                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("ZnovupodatDokument", opt)
                                            .done(function (retVal) {
                                                if (retVal.StavBool) {
                                                    that.tryReloadDetail(undefined, {
                                                        flashMessage: "jres:31937046", //RC 31937046 : Úspěšně podáno
                                                        flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                    });
                                                }
                                            }).always(function () { srv.close(); });
                                    }
                                }
                            });
                        },
                        prerusit: function (behaviour) {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var l_sId = "Pisemnost";

                            if (componentDto.IsSpis) {
                                l_sId = "Spis";
                            }
                            if (behaviour == "Prerusit") {
                                var options = {
                                    Ixp: l_sIxp,
                                    Dokument: l_sId,
                                    FlagHromadne: false,
                                    winTitle: this.PreruseniVyrizovaniWinTitle
                                };
                                var $div = Gordic.Ssl.Dialogs.PrerusitDokumentDlg(that, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                    if (retVal) {
                                        that.tryReloadDetail(undefined, {
                                            flashMessage: "jres:31937047", //RC 31937047 : Úspěšně přerušeno
                                            flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                        });
                                    }
                                });

                            } else {
                                var opt = { "Ixp": l_sIxp };

                                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                srv.call("ObnovitDokument", opt)
                                    .done(function (retVal) {
                                        if (retVal.StavBool) {
                                            that.tryReloadDetail(undefined, {
                                                flashMessage: "jres:31937048", //RC 31937048 : Úspěšně obnoveno
                                                flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                            });
                                        }
                                    }).always(function () { srv.close(); });
                            }
                        },
                        ztratit: function (behaviour) {

                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            if (behaviour == 'Ztratit') {

                                var options = {
                                    winTitle: this.DuvodZtratyDokumentuSpisuWinTitle,
                                    fieldLabel: "jres:26257254", //RC 26257254 : Číslo dokumentu, kterým je ztráta/poškození řešena
                                };
                                var $div = Gordic.Ssl.Dialogs.AddDuvodDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                    if (retVal) {
                                        var options = { "Ixp": l_sIxp, "FlagZtratit": true, "Duvod": retVal.duvod };
                                        that.ztratit_call(options);
                                    }
                                });

                            } else {
                                var options = { "Ixp": l_sIxp, "FlagZtratit": false, "Duvod": "" };
                                that.ztratit_call(options);
                            }
                        },
                        ztratit_call: function (options) {
                            var that = this;
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("Ztratit", options)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail(undefined, {
                                            flashMessage: retVal.Message,
                                            flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                        });
                                    }
                                }).always(function () { srv.close(); });;
                        },

                        // 18.06.2019 - TFeik
                        // Pro vkládání do balíku použita preakce ze Spi.
                        //vlozitDoBaliku: function () {
                        //    var that = this;
                        //    var l_sIxp = componentDto.ixp;
                        //    // 18.06.2019 - TFeik
                        //    // Zapojení hledání balíku dle identifikátoru.
                        //    Gordic.Spi.Dialogs.GHledaniBalikuDleIdentifikatoruDlg(that)
                        //        .done(function (retValHledaniBalikuDleIdentifikatoru) {
                        //            if (retValHledaniBalikuDleIdentifikatoru) {
                        //                var l_sIxsZup;
                        //                if (retValHledaniBalikuDleIdentifikatoru[0]
                        //                    && !Gordic.Utils.GString.IsNullOrWhiteSpace(retValHledaniBalikuDleIdentifikatoru[0].ixs_zup))
                        //                {
                        //                    l_sIxsZup = retValHledaniBalikuDleIdentifikatoru[0].ixs_zup;
                        //                }
                        //                var options = { "Ixp": l_sIxp, "IxsZup": l_sIxsZup };

                        //                var srv = this.createServiceContent({ className: "Gordic.Ssl.WebClient.GDetailUtils", params: {} });  //servisni sluzba/content
                        //                srv.call("DotazZdaVlozitDoBalikuIParovyDokument", options)
                        //                    .done(function (retVal) {
                        //                        if (retVal.StavTxt) {
                        //                            retVal.l_sIxsZup = l_sIxsZup;
                        //                            retVal.l_sIxp = l_sIxp;
                        //                            that.vlozitDoBaliku_dotaz(retVal);
                        //                        }
                        //                    });
                        //            }
                        //        });

                        //},
                        //vlozitDoBaliku_dotaz: function (opt) {
                        //    var that = this;
                        //    if (opt.StavTxt && opt.Message) {
                        //        this.dialogs.confirm("?", opt.Message).on("closed", function (ev, retVal) {
                        //            if (retVal) {
                        //                if (retVal === "yes") {
                        //                    that.vlozitDoBaliku_work(opt);
                        //                }
                        //            }
                        //        });
                        //    }


                        //},
                        //vlozitDoBaliku_work: function (opt) {
                        //    var that = this;
                        //    var options = {
                        //        "Ixp": opt.l_sIxp,
                        //        "IxsZup": opt.l_sIxsZup,
                        //        "IxpParovehoDokumentu": opt.StavTxt
                        //    };

                        //    var srv = this.createServiceContentt({ className: "Gordic.Ssl.WebClient.GDetailUtils", params: {} });  //servisni sluzba/content
                        //    srv.call("VlozitDoBaliku", options)
                        //        .done(function (retVal) {
                        //            if (retVal.StavBool) {
                        //                that.tryReloadDetail(undefined, {
                        //                    flashMessage: "jres:31937049", //RC 31937049 : Vloženo do balíku
                        //                    flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                        //                });
                        //            }
                        //        });
                        //},
                        vyjmoutZBaliku: function () {
                            // 18.06.2019 - TFeik
                            // that nebylo definované.
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            var options = {
                                "Ixp": l_sIxp
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("VyjmoutZBaliku", options)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail(undefined, {
                                            flashMessage: "jres:31937050", //RC 31937050 : Vyjmuto z balíku
                                            flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                        });
                                    }
                                })
                                .fail(function () {
                                    that.showFlash("jres:32170003", Gordic.Global.Enums.ColorStateClass.error); //RC 32170003 : Vyjmutí z balíku se nezdařilo.
                                }).always(function () { srv.close(); });
                        },
                        //vytvorBalik: function () {
                        //    //TODO
                        //    console.log("TODO vytvorBalik")
                        //    /*
                        //    var det = this.contentDiv;
                        //    var QueryString = "?Novy=a&CloseWin=a" + this.PrepareSpisPlanZnakQueryString();
                        //    var retVal = Spi_OtevriDetailBaliku(1, QueryString);
                        //    if (retVal != null) {
                        //        var l_sIxp = this.PIDTextBox.value;
                        //        var l_sIxsZup = retVal.values[0];
                        //        var l_oUserContext = { ctx: this, IxsZup: l_sIxsZup };
                        //        var l_oJSONPars = { "Ixp": l_sIxp, "IxsZup": l_sIxsZup };
                        //        callAsync("~/Gin/Ssl/WS/WSOperationSSL.asmx/DotazZdaVlozitDoBalikuIParovyDokument", l_oJSONPars, this.DotazVlozitDoBalikuIParovyDokumentOnSucceeded, null, l_oUserContext);
                        //    }
                        //    */
                        //},
                        kontrolaMetadat: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var options = { "Ixp": l_sIxp };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("KontrolaMetadatPrepare", options)
                                .done(function (retVal) {
                                    that.kontrolaMetadat_succes(retVal);
                                }).always(function () { srv.close(); });

                        },
                        kontrolaMetadat_succes: function (retVal) {
                            
                            this.hideFlash("KontrolaMetadatIdFlash");
                            if (!retVal.StavBool) {
                                this.actions[Gordic.Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam].update({ enabled: true });
                                this.actions[Gordic.Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam].run();

                                /* nejspíš 
                                this.showFlash({
                                    id: "KontrolaMetadatIdFlash",
                                    state: "error",
                                    content: retVal.Message
                                });
                                */


                                //var l_sIxp = componentDto.ixp;
                                //// thazmuka (24.05.2021) - úprava předání typu režimu
                                //// 3 - spis, 2 - dokument   
                                //var TypRezimu = componentDto.IsSpis == null ? 0 : componentDto.IsSpis === true ? 3 : 2; 
                                //var opt = {
                                //    Ixp: l_sIxp,
                                //    TypRezimu: TypRezimu
                                //};
                                //Gordic.Wfl.Dialogs.KontrolaMetadatDlg(that, opt).done(function (retVal) {
                                //    if (retVal && retVal.stav) {
                                //        that.tryReloadDetail(undefined, {
                                //            flashMessage: "jres:31937051", //RC 31937051 : Kontrola metadat dokončena.
                                //            flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                //        });
                                //    }
                                //});
                            }
                            else if (retVal.StavBool) {
                                this.tryReloadDetail(undefined, {
                                    flashMessage: "jres:26256691", //RC 26256691 : Kontrola metadat proběhla bez chyb.
                                    flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                });
                               
                            }
                            //_this.Reload();
                        },

                        // volano z vysich
                        vyridit: function (behaviour) {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            if (behaviour != "") {
                                var showDialog = true;
                                var aDokumentUrl = "";

                                var isDokument = componentDto.TypSpis == 0;
                                var isSpis = componentDto.TypSpis == 1;
                                var isSoucast = componentDto.TypSpis == 3 || componentDto.TypSpis == 5;
                                var isTS = componentDto.TypSpis == 2;
                                var isDil = componentDto.TypSpis == 4;


                                if(isDil) {
                                    this.dialogs.alert(26257295); //RC 26257295 : Díly jsou dle NSESSS vyřizovány automaticky na základě období zadané na věcné skupině.
                                    return;
                                } else if (isSoucast) {
                                    this.dialogs.confirm("?", "jres:26257296").on("closed", function (ev, retVal) { //RC 26257296 : Opravdu chcete uzavřít součást?
                                        if(retVal === "yes") {
                                            //that.vyriditSoucast();
                                        }
                                    });
                                } else if(isDokument) { // dokument

                                    var wflDBParams = Gordic.Wfl.WebClient.GetGWflDBParams();

                                    // SSL - Povinnost vyplnění spisového plánu a znaku na dokumentu
                                    if (wflDBParams.ssl_povin_spzn != null && wflDBParams.ssl_povin_spzn > 0) {
                                        if (componentDto.SpisZnak == null || componentDto.SpisZnak === "") {
                                            //RC 31937042 : Pozor
                                            this.dialogs.alert("jres:31937042", "jres:32000135");   //RC 32000135 : Není vyplněna povinná položka Spisový znak.
                                            return;
                                        }
                                    }

                                    var l_sVec = null;
                                    var field = this.findFields("vec");
                                    if (field) {
                                        l_sVec = field.gfield("getValue");
                                    }
                                    if (componentDto.PrizCj == 0) {
                                        this.dialogs.alert("jres:31937042", "jres:26256541");  //RC 31937042 : Pozor
                                        return;
                                    }

                                    if (!l_sVec) {
                                        showDialog = false;
                                        this.dialogs.alert("jres:31937042", this.VyrizeniVyplnitVecText); //RC 31937042 : Pozor

                                    }
                                } else { // spis
                                    if (this.VyrizeniSpZnWarnText) {
                                        this.dialogs.alert("jres:31937042", this.VyrizeniSpZnWarnText); //RC 31937042 : Pozor
                                    }

                                    var pocJinoagDok = this.JinoagDokCount;

									if (pocJinoagDok && pocJinoagDok != 0) {

                                        this.dialogs.confirm("?", this.VyriditSpisJineAgendyRequest + pocJinoagDok).on("closed", function (ev, retVal) { //RC 26256696 : Opravdu vytvořit duplikát s následným vložením do spisu?
                                            if (retVal === "yes") {
                                                that.vyriditShowDialog();
                                            }
                                        });
                                    }
                                }

                                if (showDialog) {
                                    that.vyriditShowDialog();
                                }
                            }
                        },
                        vyriditShowDialog: function () {

                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var opt = {
                                Ixp: l_sIxp
                            };

                            var promise  = Gordic.Ssl.Dialogs.GVyrizeniDlg(this, opt);
                            promise.done(function (retVal) {
                                if (retVal) {
                                    that.tryReloadDetail(undefined, {
                                        flashMessage: retVal.message, 
                                        flashMessageClass: retVal.stav === true ? Gordic.Global.Enums.ColorStateClass.success : Gordic.Global.Enums.ColorStateClass.important
                                    });
                                } else {
                                    that.tryReloadDetail();
                                }
								

                            });
                        },


                        zmenaTerVyrizeni: function (DatVyrizDoField, DatVyrizDoOrig, LhutaTypDok) { // vola se jako static (nejsou k dispozici content values)
                            //(DatVyrizDoTextBox, DatVyrizDoOrigTxt, LhutaTypDok)
                            /*  ZmenaTerVyrizeni: function (pSpis) {
                                  var DatVyrizIdTxt = "";
                                  if (pSpis == 1) {
                                      DatVyrizIdTxt = m_oDatVyrizDoTextBoxCID;
                                  } else {
                                      DatVyrizIdTxt = m_oDatVyrDoTextBoxCID;
                                  }

                                  var DatVyrizDoTextBox = document.getElementById(DatVyrizIdTxt);*/

                            var ZmTerVyrRealized = false;
                            var DatVyrizDo = DatVyrizDoField.gfield("getValue");
                            if (DatVyrizDoField && DatVyrizDoField.length > 0 &&  DatVyrizDo) {
                                if (DatVyrizDoOrig) {
                                    // porovná zda došlo ke změněn  funguje nějak divně žýe nebere v potaz časové pásma ale v momentě psaní jsme přesně todle potřebovali.
                                    if (new Date(DatVyrizDoOrig).toDateString() !== DatVyrizDo.toDateString()) {
                                        ZmTerVyrRealized = true;
                                    }
                                } else {
                                    ZmTerVyrRealized = false;
                                }
                                if (ZmTerVyrRealized) {
                                    var OneDayMiliSeconds = 24 * 60 * 60 * 100;
                                    var ParSslZmenaLhuty = componentDto.ssl_zmena_lhuty;

                                    if (ParSslZmenaLhuty == 1) { // Povolena zmena max. do lhuty zadane na typu pisemnosti.
                                        if (LhutaTypDok != 0) { // pokud je typ dok bez terminu, umoznim neomezenou zmenu terminu, jinak provedu kontrolu
                                            if ((DatVyrizDoOrig.getTime() + (LhutaTypDok * OneDayMiliSeconds)) < DatVyrizDo.getTime()) {
                                                DatVyrizDoField.gfield("setValue", DatVyrizDoOrig);
                                                ZmTerVyrRealized = false;
                                                $.content(DatVyrizDoField).dialogs.alert("jres:26255239" + LhutaTypDok + "jres:26255240"); //RC 26255239 : Není povoleno měnit termín vyřízení dokumentu/spisu o více než
                                            }
                                        }
                                    }
                                    if (ParSslZmenaLhuty == 2) { // Povolena zmena do 60 dnu.
                                        if ((DatVyrizDoOrig.getTime() + (60 * OneDayMiliSeconds)) < DatVyrizDo.getTime()) {
                                            DatVyrizDoField.gfield("setValue", DatVyrizDoOrig);
                                            ZmTerVyrRealized = false;
                                            $.content(DatVyrizDoField).dialogs.alert("jres:26255241"); //RC 26255241 : Není povoleno měnit termín vyřízení dokumentu/spisu o více než 60 dnů!
                                        }
                                    }
                                    if (ParSslZmenaLhuty == 3) { // Zmena neni povolena.
                                        DatVyrizDoField.gfield("setValue", DatVyrizDoOrig);
                                        ZmTerVyrRealized = false;
                                        $.content(DatVyrizDoField).dialogs.alert("jres:26255242"); //RC 26255242 : Není povoleno měnit termín vyřízení dokumentu/spisu!
                                    }
                                }
                            }
                            return ZmTerVyrRealized;
                        },

                        //#endregion

                        //#region společné funkce pro Sbernyarch na spisu a dokument



                        dotazIRPNaVlozeniDokumentuDoSpisu: function (IxpSpis, IxpDok) { // toto bych mel nejak sdilet s contentem sberneho archu
                            var that = this;
                            var opt = {
                                "IxpSpis": IxpSpis,
                                "IxpDok": IxpDok
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("ZobrazitDotazIRPPriVkladaniDokumentuDoSpisu", opt)
                                .done(function (retVal) {
                                    that.dotazIRPNaVlozeniDokumentuDoSpisuOnSucceeded(retVal, opt);
                                }).always(function () { srv.close(); });

                        },
                        dotazIRPNaVlozeniDokumentuDoSpisuOnSucceeded: function (result, opt) {
                            var that = this;
                            //var l_sCes = userContext.ces;


                            var succesFun = function (l_nSetRP, opt, prebratZeSpisu) {
                                that.vlozitDoSpisuSubmit(l_nSetRP, opt, prebratZeSpisu);
                            };

                            var dotazNaPrevzatiIrpPrav = function (l_nSetRP, options) {

                                var prebratZeSpisu = 0;
                                if (result.BoolParam1
                                    && ((!result.StavBool) || (result.StavBool && l_nSetRP == 1)) // tady pokud by si to uživatel rozmyslel, a v předchozí otázce máčkl ne, tak to nebude dávat smysl tato otázka 
                                ) {
                                    options.content.dialogs.confirm("jres:31937466", //RC 31937466 : Dotaz
                                        "jres:31937465").on("closed", function (ev, retVal) { //RC 31937465 : Přejete si převzít všechna práva ze spisu do kterého je dokument vkládán?
                                            if (retVal === "yes") {
                                                prebratZeSpisu = 1;
                                            }
                                            succesFun(l_nSetRP, options, prebratZeSpisu);
                                        });
                                } else {
                                    succesFun(l_nSetRP, options, prebratZeSpisu);
                                }
                            };


                            var l_nSetRP = 0;
                            if (result.StavBool) {
                                that.dialogs.confirm("jres:26256644", "jres:Gordic.Ssl.WebClient:26256444").on("closed", function (ev, retVal) { //RC 26256644 : Řízený přístup
                                    if (retVal === "yes") {
                                        l_nSetRP = 1;
                                    }
                                    dotazNaPrevzatiIrpPrav(l_nSetRP, opt);
                                });
                            } else {
                                dotazNaPrevzatiIrpPrav(l_nSetRP, opt);
                            }

                        },

                        vlozitDoSpisuSubmit: function (pNastaveniRP, opt, prebratZeSpisu) {
                            var that = this;
                            var l_sSetRPValue = "";

                            if (pNastaveniRP == 1) {
                                l_sSetRPValue = "NastaveniRP";
                            }

                            this.IDSpisVlozitDoSpisu = this.IDSpisVlozitDoSpisu + "|" + l_sSetRPValue;
                            var l_sIxp = opt.IxpDok;
                            this.vlozitVyjmoutZeSpisu(true, l_sIxp, prebratZeSpisu);
                        },

                        vlozitVyjmoutZeSpisu: function (FlagVlozit, ixpDok, prebratZeSpisu) {
                            var that = this;

                            var opt = {
                                "Ixp": ixpDok,
                                "FlagVlozit": FlagVlozit,
                                "IDSpisVlozitDoSpisu": this.IDSpisVlozitDoSpisu,
                                "PrebratZeSpisu": prebratZeSpisu != null ? prebratZeSpisu : 0
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("VlozitVyjmoutZeSpisu", opt)
                                .done(function (retVal) {
                                    that.vlozitVyjmoutZeSpisuOnSucceeded(retVal, FlagVlozit);
                                }).always(function () { srv.close(); });
                        },
                        vlozitVyjmoutZeSpisuOnSucceeded: function (retVal, FlagVlozit) {
                            var that = this;
                            this.IDSpisVlozitDoSpisu = "";
                            var l_bReloadEnabled = false;
                            if (retVal.StavBool) {
                                var l_bReloadEnabled = true;
                                if (retVal.Script) {
                                    l_bReloadEnabled = false;
                                    switch (retVal.Script) {
                                        case "vlozitVyjmoutParovyDokumentDoSpisu":
                                            that.dialogs.confirm("jres:31937052", retVal.StrParam1).on("closed", function (ev, odpoved) { //RC 31937052 : Párový dokument
                                                if (odpoved === "yes") {
                                                    that.vlozitVyjmoutParovyDokumentDoSpisu(retVal.StrParam2, retVal.StrParam3, retVal.BoolParam1);
                                                }
                                            });
                                            break;
                                    }
                                }
                            } else {
                                that.dialogs.alert("jres:31937053", //RC 31937053 : Nepovedlo se
                                    FlagVlozit ? "jres:31937054" //RC 31937054 : Písemnost nelze vložit do spisu.
                                        : "jres:31937055"); //RC 31937055 : Písemnost nelze vyjmout ze spisu.
                                l_bReloadEnabled = false;
                            }
                            if (l_bReloadEnabled) {
                                that.tryReloadDetail();
                            }
                        },

                        vlozitVyjmoutParovyDokumentDoSpisu: function (ixpDok, ixpSpis, flagVlozit) {
                            var that = this;
                            var opt = { "IxpDok": ixpDok, "IxpSpis": ixpSpis, "FlagVlozit": flagVlozit };

                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("VlozitVyjmoutParovyDokumentDoSpisu", opt)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail();
                                    }
                                }).always(function () { srv.close(); });

                        },

                        ulozitSpis: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            var options = {
                                Ixp: l_sIxp,
                                winTitle: this.UlozeniSpisuWinTitle
                            };
                            Gordic.Ssl.Dialogs.DetailUlozitSpisDlg(this, options).on("closed", function (ev, retVal) {
                                if (retVal) {
                                    that.tryReloadDetail();
                                }
                            });
                        },

                        showWinVyberDeniku: function (model) {
                            var that = this;
                            var def = $.Deferred();
                            Gordic.Ssl.Dialogs.VyberDenikuDlg(this, {}, 'showWindow').on("closed", function (ev, retVal) {
                                if (retVal) {
                                    var denikToSave = retVal.denik + "|" + retVal.poradi + "|" + retVal.rok;
                                    //that.selectedDenikToSave = denikToSave;
                                   
                                    // znovu pustím funkci evidovat
                                    //that.evidovat(); // puvodni řešení

                                    that.flagEvidovat = true;
                                    // přeuložím do modelu
                                    model.FlagEvidovat = that.flagEvidovat;
                                    model.SelectedDenik = denikToSave;
                                    def.resolve(model);
                                } else {
                                    that.flagEvidovat = false;
                                    def.reject();
                                }
                            });
                            return def.promise();
                        },

                        //pridavatAOdebiratFormulare: function () {
                        //    var that = this;
                        //    var opt = {
                        //        Ixp: componentDto.ixp
                        //    };

                        //    Gordic.Wfl.Dialogs.NastavFormulareKDokumentuDlg(this, opt, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                        //        .done(function (retval) {
                        //            if (retval && retval.isSaved) {
                        //                that.tryReloadDetail();
                        //            }
                        //        }
                        //    );

                        //},

                        zmenitStupenUtajeni: function () {
                            
                            var that = this;
                            var stupenUtajeniDto = {
                                StuUtajId: componentDto.StUtajIdWfl,
                                Duvod: undefined,
                                VsechnyStupneUtajeni: componentDto.IsSpis ? true : false
                            };
                            Gordic.Wfl.Dialogs.StupenUtajeniDlg({ parentContent: this, opt: { dto: stupenUtajeniDto }, ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow })
                                .done(function (data) {
                                    if (data && data.stupenUtajeniDto) {
                                        var opt = {
                                            "Ixp": componentDto.ixp,
                                            "DatZmena": componentDto.DatZmena,
                                            "StUtajId": data.stupenUtajeniDto.StuUtajId,
                                            "Duvod": data.stupenUtajeniDto.Duvod,
                                            "Platnost": data.stupenUtajeniDto.Platnost
                                        };
                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("ZmenitStupenUtajeni", opt)
                                            .done(function (retVal) {
                                                if (retVal.StavBool) {
                                                    var mess = "jres:31937218"; //RC 31937218 : Došlo ke změně stupně utajení. 
                                                    if (data.stupenUtajeniDto.ZmenilaSePouzePlatnostNeboDuvod) {
                                                        mess = "jres:31937420" //RC 31937420 : Došlo ke změně platnosti nebo důvodu stupně utajení.
                                                    }
                                                    that.tryReloadDetail(undefined, {
                                                        flashMessage: mess, //RC 31937218 : Došlo ke změně stupně utajení. 
                                                        flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                    });
                                                }
                                            }).always(function () { srv.close(); });
                                    }
                                });
                        },

                        nastavitPriznakZobrazitelnostiZastupemIRP: function () {
                            var that = this;
                            var dtoinput = {
                                PrizZobZast: componentDto.PrizZobZast,
                                Duvod: undefined
                            };
                            Gordic.Wfl.Dialogs.NastaveniPrizZobZastupemDlg({ parentContent: this, opt: { dto: dtoinput }, ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow })
                                .done(function (data) {
                                    if (data && data.outputDto != null && data.outputDto.PrizZobZast != null) {
                                        var opt = {
                                            "Ixp": componentDto.ixp,
                                            "DatZmena": componentDto.DatZmena,
                                            "PrizZobZast": data.outputDto.PrizZobZast,
                                            "Duvod": data.outputDto.Duvod
                                        };
                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("NastavitPriznakZobrazitelnostiZastupemIRP", opt)
                                            .done(function (retVal) {
                                                if (retVal.StavBool) {
                                                    var mess = "jres:31937497"; //RC 31937497 : Došlo k nastavení příznaku zobrazitelnosti zastupem IRP
                                                    that.tryReloadDetail(undefined, {
                                                        flashMessage: mess, //RC 31937218 : Došlo ke změně stupně utajení. 
                                                        flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                    });
                                                }
                                            }).always(function () { srv.close(); });
                                    }
                                });
                        },

                        tiskSablonyKonvenceGoridc: function () {
                            var that = this;
                            this.beginOperation();
                            var opt = {
                                ixp: componentDto.ixp,
                            };
                            var type = componentDto.IsSpis ? 1 : 0;
                            var srv = that.createServiceContent( "Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("GetDataGDocumentDataSet", opt)
                                .done(function (retVal) {
                                    if (retVal && retVal.Main && retVal.Main.length > 0) {
                                        var dataProTeplates = retVal.Main[0];
                                        var dialogSablony = that.dialogs.showModalWindow(['Gordic.Report.WebClient.GTemplatesControl'], { ID: "GTemplatesControl", data: JSON.stringify(dataProTeplates), type: type }, "", 800, 500);

                                        dialogSablony.on("closed", function (retValZESablon, retValzZeSablon) {
                                            if (retValzZeSablon != null && (retValzZeSablon.isMainAttachment || retValzZeSablon.isNewAttachment)){
                                                var textdoFlashe = "jres:31937237"; //RC 31937237 : Šablona byla uložena jako příloha
                                                if (retValzZeSablon.isMainAttachment) {
                                                    textdoFlashe = "jres:31937238"; //RC 31937238 : Šablona byla uložena jako hlavní příloha
                                                }

                                                that.tryReloadDetail(undefined, {
                                                    flashMessage: textdoFlashe,
                                                    flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                });

                                            }
                                        });
                                    }
                                })
                                .always(function () {
                                    that.endOperation();
                                    srv.close();
                                })
                                ;


                           

                            //<Templates-directory>C:\test\GINIS_FRM_sablony_konvence_gordic_ukazka_new</Templates-directory>
                        },

                        zrusitOdeslaniJakoOriginalu: function () {

                            var that = this;
                            var options = {
                                winTitle: "jres:31937293" //RC 31937293 : Důvod zrušení odeslání
                            };
                            Gordic.Ssl.Dialogs.AddDuvodDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if (retVal && retVal.duvod) {
                                    var opt = {
                                        ixp: componentDto.ixp,
                                        duvod: retVal.duvod,
                                        datZmena: componentDto.DatZmena

                                    };
                                    var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                    srv.call("ZrusOdeslaniJakoOriginal", opt)
                                        .done(function (retValZrus) {
                                            if (retValZrus.StavBool) {
                                                that.tryReloadDetail(undefined, {
                                                    flashMessage: "jres:31937294", //RC 31937294 : Proběhlo zrušení odeslání jako originál
                                                    flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                });
                                            }
                                        }).always(function () { srv.close(); });
                                }
                            });
                        },


                        doloznkaNabytiPravniMoci: function () {
                            var that = this;
                            this.beginOperation();
                            var opt = {
                                ixp: componentDto.ixp,
                            };
                            var type = 2;
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");
                            this.beginOperation("jres:31937597") //RC 31937597 : Probíhá vytvoření doložky
                            srv.call("GetDataGDocumentDataSet", opt)
                                .done(function (retVal) {
                                    that.endOperation();
                                    if (retVal && retVal.Main && retVal.Main.length > 0) {
                                        var dataProTeplates = retVal.Main[0];
                                        var dialogSablony = that.dialogs.showModalWindow(['Gordic.Report.WebClient.GTemplatesControl'], { ID: "GTemplatesControl", data: JSON.stringify(dataProTeplates), type: type }, "", 800, 500);

                                        dialogSablony.on("closed", function (retValZESablon, retValzZeSablon) {
                                            var dto = {
                                                DownloaderType: "Gordic.Wfl.WebClient.WflGuidDownloader",
                                                UploaderType: "Gordic.Wfl.WebClient.WflGuidUploader",
                                                EnableSaving: true,
                                                AutoUpload: true,
                                                Context: { "signer": Gordic.Gin.WebClient.DefaultSigner },
                                                CustomData: {
                                                    "Guid": retValzZeSablon.guid
                                                }
                                            };

                                            var doc = new GDocument(that);
                                            that.log.trace("zobrazitZpravuFinalPresDoplnek guid:" + retValzZeSablon.guid);
                                            that.beginOperation("jres:31937598");    //RC 31937598 : Dokument doložky se zpracovává
                                            doc.downloadDocument(dto)
                                                .then(function (ret1) {
                                                    that.endOperation();
                                                    that.hideFlash("pfupdwn");
                                                    if (ret1 != null && ret1.CustomData != null && ret1.CustomData.GuidEditovany != null) {
                                                        that.beginOperation("jres:31937598") //RC 31937598 : Dokument doložky se zpracovává
                                                        return Gordic.Isl.Sslspid.pripravSouborDolozky({
                                                            Data: {
                                                                FileinfoInput: {
                                                                    guid: ret1.CustomData.GuidEditovany,
                                                                    filename: ret1.CustomData.fileName
                                                                },
                                                                Ixp: componentDto.ixp
                                                            }
                                                        }).get()

                                                        //that.tryReloadDetail(undefined, {
                                                        //    flashMessage: textdoFlashe,
                                                        //    flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                        //});
                                                    } else {
                                                        that.dialogs.alert(
                                                            "jres:31937603", //RC 31937603 : Tvorba doložky
                                                            "jres:31937605" //RC 31937605 : Doložku se nepodařilo vytvořit
                                                        );
                                                        return $.Deferred().reject().promise();
                                                    }

                                                })
                                                .then(function (ret2) {
                                                    that.endOperation();
                                                    if (ret2 != null && ret2.Data != null && ret2.Data.FileinfoResponse != null && ret2.Data.FileinfoResponse.guid != null) {
                                                        that.beginOperation("jres:31937600"); //RC 31937600 : Probíhá pdepsání nově vytvořené hlavní přílohy s doložkou.
                                                        var localGsgn = new Gordic.Wfl.WebClient.GByteSigner();
                                                        return localGsgn.sign
                                                            ({
                                                                file: ret2.Data.FileinfoResponse.guid,
                                                                fileName: ret2.Data.FileinfoResponse.filename,
                                                                signTime: new Date(),
                                                                //signWithTimeStamp: dto.SignWithTimeStamp ? true : false,

                                                                idSigningReason: componentDto.IxsDpoDolozka,
                                                            }, { title: "jres:31937596" }) //RC 31937596 : Výběr certifikátu pro tvorbu doložky
                                                    } else {
                                                        that.dialogs.alert(
                                                            "jres:31937603", //RC 31937603 : Tvorba doložky
                                                            "jres:31937604" //RC 31937604 : Spojení doložky s původním dokumentem se nezdařilo
                                                        );
                                                        return $.Deferred().reject().promise();
                                                    }

                                                })
                                                .then((signedConfig) => {
                                                    that.endOperation();
                                                    that.beginOperation("jres:31937599") //RC 31937599 : Dokument se ukládá jako hlavní příloha
                                                    if (signedConfig != null && signedConfig.guid != null) { 
                                                        return Gordic.Isl.Sslspid.ulozeniSouboruDolozky({
                                                            Data: {
                                                                FileinfoInput: {
                                                                    guid: signedConfig.guid
                                                                },
                                                                Ixp: componentDto.ixp
                                                            }
                                                        }).get();
                                                    } else {
                                                        that.dialogs.alert(
                                                            "jres:31937603", //RC 31937603 : Tvorba doložky
                                                            "jres:31937606" //RC 31937606 : Podepsání doložky se nezdařilo
                                                        );
                                                        return $.Deferred().reject().promise();
                                                    }
                                                })
                                                .then((retVys) => {
                                                    that.endOperation();
                                                    if (retVys != null && retVys.Data != null && retVys.Data.Vysledek != null && retVys.Data.Vysledek) {
                                                        that.tryReloadDetail(undefined, {
                                                            flashMessage: "jres:31937601", //RC 31937601 : Doložka byla uložena jako nová verze hlavní přílohy
                                                            flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                        });
                                                    } else {
                                                        that.dialogs.alert(
                                                            "jres:31937603", //RC 31937603 : Tvorba doložky
                                                            "jres:31937607" //RC 31937607 : Finální uložení doložky se nezdařilo
                                                        );
                                                    }
                                                })
                                                .fail(function () {
                                                    that.endOperation();
                                                });
                                        });
                                    }
                                })
                                .always(function () {
                                    that.endOperation();
                                    srv.close();
                                })
                                ;




                            //<Templates-directory>C:\test\GINIS_FRM_sablony_konvence_gordic_ukazka_new</Templates-directory>
                        },
                        //#endregion


                        enableSslDetail: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }
                            var wflDBParams = Gordic.Wfl.WebClient.GetGWflDBParams();
                            this.actions.actEditovat.update({
                                caption: !l_bActionEnabled ? "jres:26255621" : "jres:31937001", //this.EditMode ? //RC 31937001 : Editovat
                                icon: !l_bActionEnabled ? "gi-window-close" : "gi-pencil" //this.EditMode ?
                            });
                            //, customclass: obj.EditMode ? "gi-save g-button--primary" : "gi-save"
                            
                            this.actions.actUlozitZmeny.update({ enabled: !l_bActionEnabled /* primary: this.EditMode ? true : false*/ });

                            //#region Dokument
                            if (l_bActionEnabled && componentDto.IsSpis) {
                                this.actions.actPodaniVlastni.update({
                                    caption: "jres:31937241", //RC 31937241 : Nový vlastní
                                    tooltip: "jres:26255487" //RC 26255487 : Nové podání vlastního dokumentu s následným vložením do spisu
                                }); 
                                this.actions.actPodaniCizi.update({
                                    caption: "jres:31937242", //RC 31937242 : Nový doručený (cizí)
                                    tooltip: "jres:26255488" //RC 26255488 : Nové podání doručeného (cizího) dokumentu s následným vložením do spisu
                                }); 
                            }
                            this.actions.actPodaniVlastni.update({ enabled: (l_bActionEnabled && !componentDto.ZakazatPodaniSSLComponent && ((wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false) ) });
                            this.actions.actPodaniCizi.update({ enabled: (l_bActionEnabled && !componentDto.ZakazatPodaniSSLComponent && ((wflDBParams && wflDBParams.gin_rad_konao === 1 && wflDBParams.usu_pod_cizi === 1) ? true : false) ) });

                            this.actions.actSouvisejiciUkol.update({ enabled: (l_bActionEnabled && componentDto.LzeVytvoritSouvisejiciUkol) });
                            this.actions.actPridatDoPoznamkovehoBloku.update({ enabled: l_bActionEnabled });
                            this.actions.actOdeslatEmailem.update({ enabled: l_bActionEnabled && componentDto.LzeOdeslatNedokladovane });

                            // sekce pro SSD 

                            this.actions.actPridatDoPoznamkovehoBloku.update({ visible: this.SimpleMode ? false : true });
                            this.actions.actSouvisejiciUkol.update({ visible: this.SimpleMode ? false : true });
                            //#endregion

                            //#region Zobrazit
                            this.actions.actZmenyPolozek.update({ enabled: l_bActionEnabled });
                            //#endregion

                            //#region Činnosti
                            this.actions.actNabytPravMoc.update({ enabled: (l_bActionEnabled && componentDto.LzeNabytPravniMoc) });

                            this.actions.actDoloznkaNabytiPravniMoci.update({ enabled: (l_bActionEnabled && componentDto.LzeElObrazVytvoritDolozkuAPodepsatDoPdf) });
                            this.actions.actDoloznkaNabytiPravniMoci.update({ visible: (l_bActionEnabled && componentDto.LzeElObrazVytvoritDolozkuAPodepsatDoPdf) });

                            this.actions.actStornovat.update({ enabled: (l_bActionEnabled && componentDto.LzeStornovat) });

                            this.actions.actZrusitStorno.update({ enabled: (l_bActionEnabled && componentDto.LzeOdStornovat) });
                            this.actions.actZrusitStorno.update({ visible: componentDto.LzeOdStornovat ? true : false });


                            //actPredatPrevzitExtAg
                            var captionPrevzitPredat = "jres:31937254"; //RC 31937254 : Předat/převzít externí agenda
                            var actPredatPrevzitEnabled = true;
                            var rezim = 'Predat';
                            if (l_bActionEnabled && componentDto.LzePrevzitZEA) {
                                captionPrevzitPredat = "jres:26255971"; //RC 26255971 : Převzít z externí agendy
                                rezim = 'Prevzit';
                            } else if (l_bActionEnabled && componentDto.LzePredatDoEA) {
                                captionPrevzitPredat = "jres:26255969"; //RC 26255969 : Předat do externí agendy
                                rezim = 'Predat';
                            } else {
                                actPredatPrevzitEnabled = false;
                            }
                            this.actions.actPredatPrevzitExtAg.rezim = rezim;
                            this.actions.actPredatPrevzitExtAg.update({ enabled: actPredatPrevzitEnabled, caption: captionPrevzitPredat });

                            this.actions.actInformovatExtAgendu.update({ enabled: (l_bActionEnabled && componentDto.LzeInformovatEA) });

                            this.actions.actZnovupodat.update({ enabled: (l_bActionEnabled && componentDto.LzeZnovupodat) });
                            this.actions.actZnovupodat.update({ visible: !componentDto.IsSpis});

                            //actPrerusitObnovit
                            var captionPrerusit = "jres:26255158"; //RC 26255158 : Přerušit
                            var icon = "fa-pause-circle-o";
                            var actPrerusitEnabled = true;
                            var rezimPrerusit = 'Obnovit';
                            if(l_bActionEnabled && componentDto.LzeObnovit) {
                                captionPrerusit = "jres:26255326"; //RC 26255326 : Obnovit
                                icon = ["fa-pause-circle-o", "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"];
                                rezimPrerusit = 'Obnovit';
                            } else if(l_bActionEnabled && componentDto.LzePrerusit) {
                                captionPrerusit = "jres:26255158"; //RC 26255158 : Přerušit
                                rezimPrerusit = 'Prerusit';
                            } else {
                                actPrerusitEnabled = false;
                            }
                            this.actions.actPrerusitObnovit.rezim = rezimPrerusit;
                            this.actions.actPrerusitObnovit.update({ enabled: actPrerusitEnabled, icon: icon, caption: captionPrerusit });

                            //actZtratitNalezt
                            var captionZtratit = "jres:26255333"; //RC 26255333 : Ztratit
                            var icon = "fa-ban";
                            var actZtratitEnabled = true;
                            var rezimZtratit = '';
                            if (l_bActionEnabled && componentDto.LzeNalezt) {
                                captionZtratit = "jres:26255332"; //RC 26255332 : Nalézt
                                icon = ["fa-ban", "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"];
                                rezimZtratit = '';
                            } else if (l_bActionEnabled && componentDto.LzeZtratit) {
                                captionZtratit = "jres:26255333"; //RC 26255333 : Ztratit
                                rezimZtratit = 'Ztratit';
                            } else {
                                actZtratitEnabled = false;
                            }
                            this.actions.actZtratitNalezt.rezim = rezimZtratit;
                            this.actions.actZtratitNalezt.update({ enabled: actZtratitEnabled, icon: icon, caption: captionZtratit, rezim: rezimZtratit });

                        

                            this.actions.actVlozitDoBaliku.update({ enabled: (l_bActionEnabled && componentDto.LzeVlozitDoBaliku) });
                            this.actions.actVyjmoutZBaliku.update({ enabled: (l_bActionEnabled && componentDto.LzeVyjmoutZBaliku) });
                            this.actions.actVytvoritBalik.update({ enabled: (l_bActionEnabled && componentDto.LzeVlozitDoBaliku) });


                           
                            this.actions.actZmenaSpouUdalosti.update({
                                enabled: (
                                    l_bActionEnabled
                                    && (
                                        (componentDto.gin_n23_vecsk == 0 && componentDto.LzeEditovatSpousteciUdalostPoUzavreni)
                                        || (componentDto.gin_n23_vecsk == 1 && componentDto.LzeEditovatSpousteciUdalostNsesss2023)
                                    )
                                )
                            });

                            this.actions.actKontrolaMetadat.update({ visible: (l_bActionEnabled && componentDto.KontrolaMetadatEnabled && (wflDBParams.IsUkraine !== true)) });
                            this.actions[Gordic.Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam].update({ visible: (l_bActionEnabled && componentDto.KontrolaMetadatEnabled && (wflDBParams.IsUkraine !== true)) });

                            //this.actions.actPridavatAOdebiratFormulare.update({ visible: (l_bActionEnabled && componentDto.LzePridavatAOdebiratFormulare) });
                            

                            this.actions.actZmenitStupenUtajeni.update({ visible: componentDto.ZmenitStupenUtajeniVisible });
                            this.actions.actZmenitStupenUtajeni.update({ enabled: (l_bActionEnabled && componentDto.ZmenitStupenUtajeniEnabled) });

                            this.actions.actNastavitPriznakZobrazitelnostiZastupemIRP.update({ visible: componentDto.ZmenitStupenUtajeniVisible });
                            this.actions.actNastavitPriznakZobrazitelnostiZastupemIRP.update({ enabled: (l_bActionEnabled && componentDto.ZmenitStupenUtajeniEnabled) });

                            this.actions.actTiskSablonyGordic.update({ visible: (l_bActionEnabled && componentDto.Usu_rp_sablony == 1) });
                            this.actions.actTiskSablonyGordic.update({ enabled: ((l_bActionEnabled && componentDto.Usu_rp_sablony == 1) && (wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false) });

                            this.actions.actZrusitOdeslaniOriginalu.update({ visible: (l_bActionEnabled && componentDto.LzeZrusOdeslaniJakoOriginalVisible) });
                            this.actions.actZrusitOdeslaniOriginalu.update({ enabled: (l_bActionEnabled && componentDto.LzeZrusOdeslaniJakoOriginalEnable) });

                          
                            this.actions.actTiskSablonyWord.update({ enabled: (wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false });

                            this.actions.actVystupAct.update({ enabled: l_bActionEnabled });
                            this.actions.actVystupActSpis.update({ enabled: l_bActionEnabled }); 
                            if (componentDto.TypSpis == 1 && componentDto.gin_n23_vedd == 1) {
                                this.actions.actVystupAct.update({ visible: false });
                            } else {
                                this.actions.actVystupActSpis.update({ visible: false}); 
                            }

                            

                            //#endregion

                            var isTS = componentDto.TypSpis == 2;
                            var isSoucast = componentDto.TypSpis == 3 || componentDto.TypSpis == 5;
                            var isDil = componentDto.TypSpis == 4;

                            if(isTS || isSoucast || isDil) {
                              //  this.actions.actEditovat.update({ visible: false, enabled: false });
                              //  this.actions.actUlozitZmeny.update({ visible: false, enabled: false });

                                //#region Dokument
                                this.actions.actPodaniVlastni.update({ visible: false, enabled: false });
                                this.actions.actPodaniCizi.update({ visible: false, enabled: false });

                                this.actions.actSouvisejiciUkol.update({ visible: false, enabled: false });
                                this.actions.actPridatDoPoznamkovehoBloku.update({ visible: false, enabled: false });
                                this.actions.actOdeslatEmailem.update({ visible: false, enabled: false });

                                // sekce pro SSD 
                                this.actions.actSouvisejiciUkol.update({ visible: false, enabled: false });
                                //#endregion

                                //#region Zobrazit
                                this.actions.actZmenyPolozek.update({ enabled: l_bActionEnabled });
                                //#endregion

                                //#region Činnosti
                                this.actions.actNabytPravMoc.update({ visible: false, enabled: false });
                                this.actions.actDoloznkaNabytiPravniMoci.update({ visible: false, enabled: false });
                                this.actions.actStornovat.update({ visible: false, enabled: false });
                                this.actions.actZrusitStorno.update({ visible: false, enabled: false });
                                this.actions.actPredatPrevzitExtAg.update({ visible: false, enabled: false });
                                this.actions.actInformovatExtAgendu.update({ visible: false, enabled: false });
                                this.actions.actZnovupodat.update({ visible: false, enabled: false });
                                this.actions.actPrerusitObnovit.update({ visible: false, enabled: false });
                                this.actions.actZtratitNalezt.update({ visible: false, enabled: false });
                                this.actions.actVlozitDoBaliku.update({ visible: false, enabled: false });
                                this.actions.actVyjmoutZBaliku.update({ visible: false, enabled: false });
                                this.actions.actVytvoritBalik.update({ visible: false, enabled: false });
                                this.actions.actZmenaSpouUdalosti.update({ visible: false, enabled: false });

                                this.actions.actKontrolaMetadat.update({ visible: false, enabled: false });
                                this.actions[Gordic.Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam].update({ visible: false, enabled: false });

                                this.actions.actZmenitStupenUtajeni.update({ visible: false, enabled: false });
                                this.actions.actZmenitStupenUtajeni.update({ visible: false, enabled: false });

                                this.actions.actNastavitPriznakZobrazitelnostiZastupemIRP.update({ visible: false, enabled: false });
                                this.actions.actNastavitPriznakZobrazitelnostiZastupemIRP.update({ visible: false, enabled: false });

                                this.actions.actTiskSablonyGordic.update({ visible: false, enabled: false });
                                this.actions.actTiskSablonyWord.update({ visible: false, enabled: false });

                                this.actions.actZrusitOdeslaniOriginalu.update({ visible: false, enabled: false });
                                this.actions.actZrusitOdeslaniOriginalu.update({ visible: false, enabled: false });

                            }
                        }

                    },

                    actions: { //může být zadáno jako pole nebo jako objekt
                        actEditovat: {
                            caption: "jres:31937001", //RC 31937001 : Editovat
                            icon: "gi-pencil",
                            enabled: componentDto.LzeEditacniRezimPovolen,
                            run: function () {
                                $.content(this).zmenaEditace();
                            }
                        },
                        /*
                        actObcerstvit: {
                            caption: "jres:26255299", //RC 26255299 : Občerstvit
                            icon: "gi-refresh",
                            run: function () {
                                $.content(this).obcerstvit();
                            }
                        },
                        */
                        actUlozitZmeny: {
                            caption: "jres:26255270", //RC 26255270 : Uložit
                            icon: "gi-save",
                            //customClass: /*this.EditMode */ true ? " g-button--primary " : "" ,
                            run: function () {
                                $.content(this).ulozitZmeny();
                            }
                        },

                        //#region Dokument
                        actPodaniVlastni: {
                            caption: "jres:26255314", //RC 26255314 :  Podání vlastního dokumentu
                            icon: "gi-doc_vlastni |fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                            run: function () {
                                $.content(this).vlastniPisemnost();
                            }
                        },
                        actPodaniCizi: {
                            caption: "jres:26255315", //RC 26255315 : Podání doručeného dokumentu
                            icon: "gi-doc_ciz |fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                            run: function () {
                                $.content(this).ciziPisemnost();
                            }
                        },
                        actSouvisejiciUkol: {
                            caption: "jres:26256364", //RC 26256364 :  Vytvořit související úkol
                            icon: "gi-paper |gi-bell gi-bgw gi-stack-pos--rb",
                            run: function () {
                                $.content(this).souvisejiciUkol();
                            }
                        },
                        actPridatDoPoznamkovehoBloku: {
                            caption: "jres:26256859", //RC 26256859 : Přidat do pracovního bloku
                            icon: ["gi-calendar-interval", "fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).ulozitDoPoznamkovehoBloku();
                            }
                        },
                        actOdeslatEmailem: {
                            caption: "jres:26255251", //RC 26255251 : Odeslat elektronickou poštou
                            icon: Gordic.Gin.Globals.Icons.Email().icon,
                            run: function () {
                                $.content(this).poslatDokumentEmailem();
                            }
                        },
                        //#endregion

                        //#region Zobrazit
                        actZmenyPolozek: {
                            caption: "jres:26256106", //RC 26256106 : Změny důležitých položek
                            icon: [
                                'gi-list',
                                //'gi-exclam gi-stack-pos--lb g-state-text g-state-important gi-bgw',
                                'gi-save gi-stack-pos--rb gi-bgw--rect g-state-text g-state-info'
                            ],
                            run: function () {
                                $.content(this).zmenyDulezitychPolozek();
                            }
                        },
                        //#endregion

                        //#region Činnosti
                        actNabytPravMoc: {
                            caption: "jres:26255327", //RC 26255327 : Nabýt právní moc
                            icon: ["gi-justice", "gi-arrow-down gi-rot180 g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).nabytPravniMoc();
                            }
                        },
                        actZmenaSpouUdalosti: {
                            caption: "jres:31937405", //RC 31937405 : Spouštěcí událost
                            icon: ["gi-paper_bell", "gi-arrow-down gi-rot180 g-state-text g-state-success gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).zmenaSpouUdalosti();
                            }
                        },
                        actStornovat: {
                            caption: componentDto.gin_n23_vedd == 0 ? "jres:26256654" : "jres:26257244", //RC 26257244 : Znepřístupnit (stornovat)
                            icon: Gordic.Gin.Globals.Icons.Stornovano().icon,
                            run: function () {
                                $.content(this).stornovat();
                            }
                        },
                        actZrusitStorno: {
                            caption: componentDto.gin_n23_vedd == 0 ? "jres:31937448" : "jres:26257245", //RC 26257245 : Zrušit znepřístupnění (storno)
                            icon: Gordic.Gin.Globals.Icons.ZrusitStorno().icon,
                            run: function () {
                                $.content(this).zrusitStorno();
                            }
                        },
                        actPredatPrevzitExtAg: {
                            caption: "jres:26255969", //RC 26255969 : Předat do externí agendy
                            rezim: "Predat",
                            icon: ["gi-predat", "gi-arrow-down gi-rot270 g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            //icon: "gi-save",
                            run: function () {
                                $.content(this).predatPrevzitExtAg(this.rezim);
                            }
                        },
                        actInformovatExtAgendu: {
                            caption: "jres:31937327", //RC 31937327 : Avizace externí agendě
                            tooltip: "jres:31937324", //RC 31937324 : Avizace synchronizace dat externí agendě / systému
                            icon: ["gi-bell", "gi-arrow-down gi-rot270 g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            //icon: "gi-save",
                            run: function () {
                                $.content(this).InformovatExtAgendu();
                            }
                        },
                        actZnovupodat: {
                            caption: "jres:26255331", //RC 26255331 : Znovupodat
                            icon: "gi-podatelna",
                            run: function () {
                                $.content(this).znovupodatDokument();
                            }
                        },

                        actPrerusitObnovit: {
                            caption: "jres:26255158", //RC 26255158 : Přerušit
                            rezim: "Prerusit",
                            run: function () {
                                $.content(this).prerusit(this.rezim);
                            }
                        },
                        actZtratitNalezt: {
                            caption: "jres:26255333", //RC 26255333 : Ztratit
                            rezim: '',
                            run: function () {
                                $.content(this).ztratit(this.rezim);
                            }
                        },

                        // 18.06.2019 - TFeik
                        // Pro vkládání do balíku použita preakce ze Spi.
                        actVlozitDoBaliku: Gordic.Spi.PreActions.VlozitDokumentSpisDoBaliku({
                            // 12.11.2021 - TFeik
                            // Předávání režimu spisovny do hledání balíku.
                            inputData: function () {
                                var isRezimSpisovna;
                                if (componentDto.SUloz != null) {
                                    // Hodnota 0 je přípravna, vše ostatní (aktuálně pouze hodnota 1) spisovna.
                                    isRezimSpisovna = componentDto.SUloz !== 0;
                                }

                                return {
                                    //parentContent: content,   // Nejsem schopen zde najít content, ale preakce či dialogs se o to postarají a dokáží jej najít.
                                    ModOtevreni: Gordic.Global.Enums.ModOtevreni.navigate,
                                    opt: {
                                        Ixps: [componentDto.ixp],
                                        //ContinueWhenInsertFails: true,
                                        SelectedGDataAkceSslProfil: [{
                                            ixp: componentDto.ixp,
                                            SpPlan: componentDto.SpisPl,// o.spis_pl,
                                            SpZnak: componentDto.SpisZnak, //o.spis_znak,
                                            SkartZnak: componentDto.SkarZnak, // o.skar_znak,
                                            SkartLhuta: componentDto.SkarLhuta, // o.skar_lhuta,
                                            SkartLhutaSpra: componentDto.SkartLhutaSpra, //   o.skar_lhuta_spra,
                                            RokSkartace: componentDto.RokSkartace,
                                            IxsVsk: componentDto.IxsVsk
                                        }],
                                        IsRezimSpisovna: isRezimSpisovna
                                    }
                                }
                            },
                            done: function () {
                                $.content(this).tryReloadDetail();
                            },
                            actionParams: {
                                name: "actVlozitDoBaliku",
                                caption: "jres:26255569" //RC 26255569 : Vložit do balíku
                            }
                        }),

                        actVyjmoutZBaliku: {
                            caption: "jres:26256491", //RC 26256491 : Vyjmout z balíku
                            //rezim: '',
                            icon: ["gi-vlozit_do_baliku", "gi-window-close  g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).vyjmoutZBaliku();
                            }
                        },

                        // 13.08.2019 - TFeik
                        // Použita preakce pro vytvoření a vložení do balíku.
                        actVytvoritBalik: Gordic.Ssl.PreActions.VytvoritBalikAVlozitSeznam({
                            // 05.11.2021 - TFeik
                            // Předávání režimu spisovny do balíku.
                            inputData: function () {
                                var isRezimSpisovna;
                                if (componentDto.SUloz != null) {
                                    // Hodnota 0 je přípravna, vše ostatní (aktuálně pouze hodnota 1) spisovna.
                                    isRezimSpisovna = componentDto.SUloz !== 0;
                                }

                                return {
                                    ListSelectedRowsInfo: [
                                        { Ixp: componentDto.ixp }
                                    ],
                                    isRezimSpisovna: isRezimSpisovna,
                                    spisovyZnakDisabled: true
                                };
                            },
                            done: function (retVal) {
                                var content = $.content(this);
                                if (retVal && retVal.GroupResult && retVal.GroupResult[0]) {
                                    if (retVal.GroupResult[0].IsError) {
                                        content.showFlash(
                                            retVal.GroupResult[0].Error,
                                            Gordic.Global.Enums.ColorStateClass.error,
                                            undefined,
                                            "actVytvoritBalikFlashId"
                                        );
                                    } else {
                                        content.showFlash(
                                            "jres:32170007", //RC 32170007 : Vytvoření a vložení do balíku je úspěšné.
                                            Gordic.Global.Enums.ColorStateClass.success,
                                            undefined,
                                            "actVytvoritBalikFlashId"
                                        );
                                        content.tryReloadDetail();
                                    }
                                }
                                else {
                                    content.showFlash(
                                        "jres:32170006", //RC 32170006 : Vytváření a vkládání do balíku se nezdařilo.
                                        Gordic.Global.Enums.ColorStateClass.error,
                                        undefined,
                                        "actVytvoritBalikFlashId"
                                    );
                                }
                            },
                            fail: function () {
                                $.content(this).showFlash(
                                    "jres:32170006", //RC 32170006 : Vytváření a vkládání do balíku se nezdařilo.
                                    Gordic.Global.Enums.ColorStateClass.error,
                                    undefined,
                                    "actVytvoritBalikFlashId"
                                );
                            },
                            actionParams: {
                                name: "actVytvoritBalik",
                                caption: "jres:26255568" //RC 26255568 : Vytvořit balík a vložit
                            }
                        }),
                        //actVytvoritBalik: {
                        //    caption: "jres:26255568", //RC 26255568 : Vytvořit balík a vložit
                        //    //rezim: '',
                        //    //icon: "gi-save",
                        //    run: function () {
                        //        $.content(this).vytvorBalik();
                        //    }
                        //},

                        actKontrolaMetadat: {
                            caption: "jres:26256830", //RC 26256830 : Kontrola metadat
                            icon: Gordic.Gin.Icons.ActionEnum.kontrolaMetadat ,//Gordic.Gin.Icons.ActionEnum.kontrolaMetadat,
                            run: function () {
                                $.content(this).kontrolaMetadat();
                            },
                            visible: Gordic.Wfl.WebClient.GetGWflDBParams().IsUkraine !== true
                        },
                        actOpravitMetadataPoKontroleSeznam:
                            Gordic.Ssl.PreActions.OpravitMetadataPoKontroleSeznam({  //(Gordic as any).Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam
                                inputData: function () {
                                    var IxpArray = [componentDto.ixp];
                                    return { IxpArray: IxpArray, CallingSource: "DetailSSL" };
                                },
                                done: function (retVal) {
                                    content.tryReloadDetail();
                                },
                                fail: function () {
                                    content.tryReloadDetail();
                                    //$.content(this).showFlash(
                                    //    "jres:31937298", //RC 31937298 : Oprava metadat se nezdařila
                                    //    Gordic.Global.Enums.ColorStateClass.error,
                                    //    undefined,
                                    //    "idOpravitMetadataPoKontrole"
                                    //);
                                },
                            })
                        ,

                        actTiskSablonyWord: GAction.createPrintAction({
                            name: "actTiskSablonyWord",
                            icon: "gi-print|fa-file-word-o gi-bgw gi-stack-pos--rb g-state-text g-state-info",
                            tema: !componentDto.IsSpis ? "usu_ptm_sdetpis" : "usu_ptm_sdetspi",    //nazev tematu
                            caption: "jres:26255343", //RC 26255343 : Šablony (Word,..)
                            serverRestrictionAlfMethod: "Gordic.Ssl.WebClient.GSslDetailComponent:GetRestrictionAlfTiskSablonyWord",
                            reportStarting: function (rep) {
                                var def = $.Deferred();
                                rep.params.X0000 = $.content(this).DetailDto.ixp;
                                rep.params.Preselect = false;
                                rep.params.IXP = $.content(this).DetailDto.ixp;
                                //if (componentDto.Ssl_tnazev_dok && componentDto.Ssl_tnazev_dok !== "") {
                                //    rep.params.EleFilename = componentDto.Ssl_tnazev_dok;

                                //}
                               
                                rep.params.OBSAH = rep.originalName;

                                var srv = $.content(this).createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                var optGenerujNazev = {
                                    ixp: rep.params.X0000,
                                    param: "ssl_tnazev_dok",
                                    alvName: rep.originalName ? rep.originalName:""  // originalName  name
                                };
                               
                                srv.call("GenerujNazevFileNameTisk", optGenerujNazev)
                                    .done(function (retVal) {
                                        if (retVal.StrParam1 && retVal.StrParam1 !== "") {
                                            rep.params.EleFilename = retVal.StrParam1;

                                        }
                                        def.resolve();
                                    }).always(function () { srv.close(); });
                                return def.promise();
                            },
                            reportFinished: function (ev, ri) {
                                var cnt = $.content(this);
                                if (ri) {
                                    const zpUloz = parseInt(ri.customData["zpUloz"] != null ? ri.customData["zpUloz"] : "0");
                                    Gordic.Ginis.DbModel.GGinczulEnumValues()
                                        .then(function (vals) {
                                            //const zpUlozDto = vals.find((v) => v.value === zpUloz);
  
                                            const zpUlozDto = vals.find(function (v) {
                                                 return v.value === zpUloz
                                            });
                                            var textFlash = "jres:31937394"; //RC 31937394 : Šablona byla vygenerována.
                                            if (zpUlozDto && zpUlozDto.meta.zpus_uloz_txt && zpUlozDto.meta.zpus_uloz != 0) { // neevidovaný výstup 0 se neukládá do ULO
                                                var zpusob = zpUlozDto.meta.zpus_uloz_txt;
                                                textFlash = textFlash + " " + String.Format("jres:31937397", zpusob); //RC 31937397 : Způsob uložení: {0}
                                                cnt.tryReloadDetail(undefined, {
                                                    flashMessage: textFlash,
                                                    flashMessageClass: "g-state-success",
                                                });
                                            } else {
                                                cnt.tryReloadDetail(undefined, {
                                                    flashMessage: textFlash,
                                                    flashMessageClass: "g-state-success",
                                                });
                                            }
                                        });
                                }
                            }
                        }),
                        actVystupAct: GAction.createPrintAction({
                            name: "actVystupAct",
                            tema: componentDto.VystupActTema,        
                            //tema: "ssl_ptm_ztvspi",
                            caption: "jres:31937562", //RC 31937562 : Ztvárnění metadat
                            title: "jres:31937561", //RC 31937561 : Ztvárnění metadat
                            //dialogOpening: () => {
                            //    var dfd = $.Deferred();
                            //    this.waitForValues(this.element)
                            //        .then((isValid) => { isValid === true ? dfd.resolve() : dfd.reject(); })
                            //        .fail(() => { dfd.reject(); })
                            //    return dfd.promise();
                            //},
                            //serverParameterMethod: "Gordic.Ved.WebControls.GVedReportParamConverter:ServerParameterMethod",
                            reportStarting: (rep) => {
                                rep.params["X0000"] = componentDto.ixp;   // Předat ID 
                                rep.params["X0001"] = componentDto.NazevRf; 
                            },
                            parentContent: content,
                            fullScreen: true,
                            reportFinished: function (rep, dva) {
                                const srv = content.createServiceContent({ className: "Gordic.Ssl.WebClient.GSslUtils", params: {} });  //servisni sluzba/content
                                srv.call("AddToHistory", { Ixp: componentDto.ixp });
                            },
                        }),

                        actVystupActSpis:
                            Gordic.Wfl.PreActions.ZtvarneniMetadatSpisuHromadne({  //(Gordic as any).Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam
                                inputData: function () {
                                    var IxpArray = [componentDto.ixp];
                                    return {
                                        parentContent: content,
                                        opt: IxpArray
                                    };
                                },
                                done: function (retVal) {
                                    //content.tryReloadDetail();
                                },
                                fail: function () {
                                    //content.tryReloadDetail();
                                   
                                },
                                actionParams: {
                                    name: "actVystupActSpis",
                                    icon: "gi-print"
                                }
                            })
                        ,


                        //actPridavatAOdebiratFormulare: {
                        //    caption: "jres:31937142",   //RC 31937142 : Přidat nebo odebrat formulář
                        //    icon: "gi-formular_plus",
                        //    run: function () {
                        //        $.content(this).pridavatAOdebiratFormulare();
                        //    }
                        //},
                        actZmenitStupenUtajeni: {
                            caption: "jres:31937419", //RC 31937419 : Stupeň utajení (změnit,zrušit,platnost)
                            tittle: "jres:31937418", //RC 31937418 : Změnit nebo zrušit stupeň utajení nebo nastavit platnost
                            icon:"fa-user-secret",
                            run: function () {
                                $.content(this).zmenitStupenUtajeni();
                            }
                        },
                        actNastavitPriznakZobrazitelnostiZastupemIRP: {
                            caption: "jres:31937495", //RC 31937495 : Zobrazitelnost zástupem
                            tittle: "jres:31937494", //RC 31937494 : Nastavit příznak zobrazitelnosti zástupem
                            icon: "fa-users",
                            run: function () {
                                $.content(this).nastavitPriznakZobrazitelnostiZastupemIRP();
                            }
                        },
                        actTiskSablonyGordic: {
                            caption: "jres:31937223", //RC 31937223 : Šablony konvence Gordic
                            icon: "gi-print|gi-gordic gi-bgw gi-stack-pos--rb g-state-text g-state-infog-state-text g-state-info",
                            run: function () {
                                $.content(this).tiskSablonyKonvenceGoridc();
                            }
                        },
                        actZrusitOdeslaniOriginalu: {
                            caption: "jres:31937291", //RC 31937291 : Zrušit odeslání jako originálu
                            icon: ["gi-send", "gi-window-close g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).zrusitOdeslaniJakoOriginalu();
                            }
                        },

                        actDoloznkaNabytiPravniMoci: {
                            caption: "jres:31937608", //RC 31937608 : Doložka nabytí právní moci
                            icon: ["gi-justice", "gi-paper2 gi-rot180 g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            tooltip:"jres:31937602", //RC 31937602 : Do hlavní přílohy bude na první stranu vložena doložka nabytí právní moci
                            run: function () {
                                $.content(this).doloznkaNabytiPravniMoci();
                            }
                        },
                     
                        //#endregion
                    },

                    menuBar: [
                        
                        { action: "actEditovat", favorite: true, after: "menuObnovit" }, //actObnovit
                        { action: "actUlozitZmeny", favorite: true, after: "menuObnovit" },
                        //{ action: "actObcerstvit", favorite: true },
                        //#region Dokument
                        Gordic.Wfl.Globals.MenuDefinitions.detailDokument(),
                        { id: "menuDokumentSeparator1", type: "separator", parent: "menuDokument", after: "menuFindRecord" },
                        { action: "actPodaniVlastni", parent: "menuDokument", after: "menuDokumentSeparator1"},
                        { action: "actPodaniCizi", parent: "menuDokument", after: "menuPodaniVlastni" },
                        { id: "menuDokumentSeparator2", type: "separator", parent: "menuDokument", after: "menuPodaniCizi" },
                        { action: "actSouvisejiciUkol", parent: "menuDokument", after: "menuDokumentSeparator2"},
                        { action: "actPridatDoPoznamkovehoBloku", parent: "menuDokument", after: "menuSouvisejiciUkol" },
                        { action: "actOdeslatEmailem", parent: "menuDokument", after: "menuPridatDoPoznamkovehoBloku" },
                        //#endregion

                        //#region Zobrazit
                        Gordic.Wfl.Globals.MenuDefinitions.detailZobrazit(),
                        { action: "actZmenyPolozek", parent: "menuZobrazit", after: "menuObnovit" },
                        //#endregion

                        $.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailTisk(), { favorite: true }),
                        { action: "actTiskSablonyWord", parent: "menuTisk" },
                        { action: "actTiskSablonyGordic", parent: "menuTisk" },
                        { action: "actVystupAct", parent: "menuTisk" },
                        { action: "actVystupActSpis", parent: "menuTisk" },
                        

                        

                        //$.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailVazby(), { favorite: true }),
                        //{ action: "actPridavatAOdebiratFormulare", parent: "menuWflVazby" },

                        ////#region Činnosti

                        Gordic.Wfl.Globals.MenuDefinitions.detailCinnosti(),
                        { id: "menuCinnostiSeparator1", type: "separator", parent: "menuWflCinnosti", before: "menuWflCinnostiOdeslani" },
                        { action: "actNabytPravMoc", parent: "menuWflCinnosti", after: "menuCinnostiSeparator1" },
                        { action: "actDoloznkaNabytiPravniMoci", parent: "menuWflCinnosti", after: "menuStornovat" },
                        { action: "actZmenaSpouUdalosti", parent: "menuWflCinnosti", after: "menuNabytPravMoc" },
                        { action: "actStornovat", parent: "menuWflCinnosti", after: "menuZmenaSpouUdalosti" },
                        { action: "actZrusitStorno", parent: "menuWflCinnosti", after: "menuStornovat" },
                        { action: "actPredatPrevzitExtAg", parent: "menuWflCinnosti", after: "menuZrusitStorno" },
                        { action: "actInformovatExtAgendu", parent: "menuWflCinnosti", after: "menuStornovat" },
                        { id: "menuCinnostiSeparator2", type: "separator", parent: "menuWflCinnosti", after: "menuPredatPrevzitExtAg" },
                        { action: "actZnovupodat", parent: "menuWflCinnosti", after: "menuCinnostiSeparator2" },
                        { id: "menuCinnostiSeparator3", type: "separator", parent: "menuWflCinnosti", after: "menuZnovupodat" },
                        { action: "actPrerusitObnovit", parent: "menuWflCinnosti", after: "menuCinnostiSeparator3" },
                        { action: "actZtratitNalezt", parent: "menuWflCinnosti", after: "menuPrerusitObnovit" },
                        { id: "menuCinnostiSeparator4", type: "separator", parent: "menuWflCinnosti", after: "menuZtratitNalezt" },
                        {
                            id: "menuBaliky", type: "static", parent: "menuWflCinnosti", icon: Gordic.Gin.Globals.Icons.Balik().icon, caption: "jres:26256241", after: "menuCinnostiSeparator4", //RC 26256241 : Balíky
                            children: [
                                { action: "actVlozitDoBaliku", favorite: true },
                                { action: "actVyjmoutZBaliku" },
                                { action: "actVytvoritBalik" }
                            ]
                        },
                        { action: "actKontrolaMetadat", parent: "menuWflCinnosti", after: "menuBaliky", favorite: true },
                        //{ action: Gordic.Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam, parent: "menuWflCinnosti", after: "menuBaliky", favorite: true },

                        { action: "actZmenitStupenUtajeni", parent: "menuWflCinnosti", after: "menuStornovat" },
                        { action: "actNastavitPriznakZobrazitelnostiZastupemIRP", parent: "menuWflCinnosti", after: "menuStornovat" },
                        { action: "actZrusitOdeslaniOriginalu", parent: "menuWflCinnosti", after: "menuStornovat" },
                        //#endregion

                        //{
                        //    id: "menuCinnosti", caption: "jres:26255309", type: "static", children: [ //RC 26255309 : Činnosti
                        //{ action: "actOdeslaniTest", caption: "BOO", after: "menuWflCinnostiZadostOPodpis" }, //actWflCinnostiZadostOPodpis   //menuWflCinnosti
                        //    ]
                        //}

                        //// 12.06.2020 - TFeik
                        //// Sdílení detailu přesunuto z ssl ddo wfl.
                        //// 08.04.2020 - TFeik
                        //// Přidáno sdílení detailu.
                        //Gordic.Gin.Prefabs.MenuParams && Gordic.Gin.Prefabs.MenuParams.ShareCommandUrl
                        //    ? Gordic.Gin.Prefabs.MenuParams.ShareCommandUrl({
                        //        commandUrl: Gordic.WebApp.Utility.createCommandUrl(null, 'OpenDetail', {
                        //            ixx1: componentDto.ixp
                        //        }),
                        //        vlozitDoKalendareOptions: {
                        //            ixx: componentDto.ixp,
                        //            ixs_fun: componentDto.IxsFunPrihlasenehoUzivatele
                        //        },
                        //        prehledUdalostiOptions: {
                        //            ixp: componentDto.ixp
                        //        }
                        //    })
                        //    : undefined
                    ],
                    statusBar: [
                        {
                            type: "widget",
                            init: function () {
                                return $("<div>").gcolorpicker({
                                    globalSettings: content.globalSettings,
                                    uzo: componentDto.Uzo,//this.options.dto.uzo,
                                    readonly: !componentDto.ZmenaBarvyDokumetuEnable,
                                    change: function (uzo) {
                                        Gordic.Isl.ColorpickerService.setUzo({ Opt: { Ixp: componentDto.ixp, Type: 0, Uzo: uzo } }).getData();
                                        content.naDetailuDosloKeZmene = true;
                                    }
                                });
                                // nahradím //Gordic.Isl.ColorpickerService.setUzo({ Opt: { Ixp: componentDto.ixp, Type: 0, Uzo: uzo } }).getData();
                            }
                            //action: "actVybratBarvu"
                        }
                    ],

                    commandBar: [
                        // 13.05.2024 - TFeik
                        // Jako primary nově označuju i pokud je režim podání.
                        { action: "actUlozitZmeny", before: "commandCloseButtonClick", primary: (content.EditMode || content.RezimPodani) ? true : false }
                        //"actUlozitZmeny"
                    ]/*,
                    
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
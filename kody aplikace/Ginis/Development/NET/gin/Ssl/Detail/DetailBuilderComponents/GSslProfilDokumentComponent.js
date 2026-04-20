(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslProfilDokument: {

            create: function (componentDto) {
                
                var result = {
                    onMenuBuild: [
                        function (builder, menus) {
                           this.enableProfilActions();
                        }
                    ],
                    onbuild: [
                        function () {
                            this.isSimpleModeProfil();
                            //if (componentDto.RezimPodani === 0) {
                               //this.vytvoritKlicvaSlova();
                            //}
                            this.nasetujProfil(this.SslProfilDokument_Dto); // dsebesta 2.05.2022 prohozeni pořadí s enableprofil
                            this.enableProfil(); // enable profilu
                            this.kontrolaPoctuPriloh();
                            this.eventaProUpdatePoctuPriloh();
                            this.setAILinkProfil();

                        }
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        saveSslProfil: function () {
                            var profilModel = {
                                IsSslProfil: true
                            };
                            var profilForm = this.findForms("formWflDokument");
                            profilForm.findFields().gfield("model", "collect", profilModel);
                            if (profilForm.gform("hasChanged")) { //
                                profilModel.MetadataChanged = true;
                            }


                            var odesilatel = this.findFields("Odesilatel");
                            if (odesilatel.length > 0) {
                                var valueOdesilatel = odesilatel.gfield("getValue");
                                if (valueOdesilatel) {
                                    profilModel.IxsEsu_zast_txt = valueOdesilatel.zast_txt;
                                }
                            }
                            //this.findFields("Keywords").gkeywordsbar("save"); // přesunuto do dokument.js
                            return profilModel;
                        },

                        predUlozenimSslDetailVyrizeni: function () {
                            var promis = $.Deferred();
                            var retVal = {};
                            this.findForms("formWflDokument").findFields("DatVyrDo").gfield("model", "collect", retVal);
                            var ZmTerVyrRealized = this.zmenaTerVyrizeni(this.findFields("DatVyrDo"), componentDto.DatVyrizDoOrig, componentDto.LhutaTypDok);
                            if (ZmTerVyrRealized && componentDto.ssl_zmeterspidu === 1) {
                                var that = this;
                                var options = {
                                    winTitle: "jres:26255153"
                                };
                                var $div = Gordic.Ssl.Dialogs.AddDuvodDlg(that, options, Gordic.Global.Enums.ModOtevreni.showModalWindow); //RC 26255153 : Důvod změny termínu
                                $div.on("closed", function (ev, retValDuvod) {
                                    if (retValDuvod) {
                                        retVal.MetadataChanged = true;
                                        that.DuvodZmenyTerminuCj = retValDuvod.duvod;
                                        retVal.DuvodZmenyTerminuCj = retValDuvod.duvod;
                                        promis.resolve(retVal);
                                    } else {
                                        promis.reject(retVal);
                                    }
                                });
                            } else {
                                promis.resolve(retVal);
                            }
                            return promis;
                        },
                        

                        sslProfProfFieldsName:
                            "VecPodrobne,Poznamka,VecnaSkupina,SpisPl,SpisZnak,SkartRezim,SkartZnak,SkartLhuta,Umisteni,IxsFunResitel,IxsFunWfl," +
                            "PocListu,PocStran,PocPriloh,PocListuPriloh,PocKopii," +
                            "TerminDate,TerminDuvod,DatPodano,DatEvidovano,DatPredpUzav,DatVyrizeno,UlozeniHodnota,DatPrMoc,DatVykonav,FieldUloz,FieldUlozDatum,IdExtArch,PorCisloObd,PorCisloVSpisu," +
                            "DatDel"
                        ,

                        sslProfVyrizFieldsName: "DatVyrDo,DatUzav,ZpusobVyrizeni,InicDok,VyrizDok,DatVyr,Schvalovatel,Zpracovatel,Komentar,IxsFunUzavrel," +
                            "SkartRezim,RokSpUdal,RokKonSpu,PopisSpousteciUdalosti,IxpTss,DuvodPozSkar,PrizPozSkar,RokDoPozSkar,SkartRizeni,UlozenoNlPriloh,UlozenoListuDok" //, SkartZnak, SkartLhuta   -> tyhle přesunuty do profil Fields aby se neschvoaval row
                        ,

                        nasetujProfil: function (dto) {
                            var form = this.findForms("formWflDokument");
                            var SslProfProfVyrizFields = form.findFields(this.sslProfProfFieldsName + "," + this.sslProfVyrizFieldsName);
                            SslProfProfVyrizFields.gfield("model", "apply", dto);
                            this.zkusNasetovatOdesilatele(dto);
                            
                            SslProfProfVyrizFields.gfield("model", "validators", componentDto.Validators);
                            form.gform("waitForValues").done(function () {
                                var fieldyVConfirmu = form.findFields();
                                if (!Gordic.Utils.WidgetExists("gform", form)) {
                                    return;
                                }
                                Utils.Form.markRequired(fieldyVConfirmu);
                                fieldyVConfirmu.gfield("confirm");
                                
                            });
                            this.nastavPosledniUzivatelskouPoznamu();

                        },
                        setAILinkProfil: function () {
                            var form = this.findForms("formWflDokument");
                            this.aiAttachments?.upsert({
                                id: "formWflDokument",
                                caption: "Profil dokumtu",
                                dataWrapper: {
                                    kind: "form",
                                    form: form // source formulář typu JQuery<HTMLElement>
                                }
                            });
                            // předávání konkrétních informací například z KPI
                            //this.aiAttachments?.upsert({
                            //    id: "form", caption: "Něco", dataWrapper: {
                            //        kind: "delegate",
                            //        dataFn: function () {
                            //            return [{ popis: "Stav dokumentu", hodnota: "Stornováno" }];
                            //        }
                            //    }


                            //});

                            //attachment
                            //this.aiAttachments?.upsert({
                            //    id: "form",
                            //    caption: "Něco",
                            //    dataWrapper: {
                            //        kind: "promise",
                            //        dataPromise: this.isl.Dokument.read({ data: { Ixp: this.DetailDto.ixp } }).get().then(o => { FileInfoDto: "o.xxxx"})
                            //    }
                            //})
                            //;



                        },
                        zmenaPoznamkyVUzivatelskychPoznamkach: function (param, data) { //param: "create" | "update" | "delete" | "changeColor", data: IGNoteDto | null
                            this.nastavPosledniUzivatelskouPoznamu();
                        },
                        nastavPosledniUzivatelskouPoznamu: function () {
                            var that = this;
                            if (componentDto.RezimPodani === 0 && this.globalSettings.get("Global.Ssl.AppSettings.DetailSettings.ZobrazUzivPozn") ) { 
                                var uzivPoznamkaField = this.findFields("UzivPoznamka");
                                uzivPoznamkaField.gfield("clear");
                                if (!this.closed) {
                                    this.createServiceContent({ className: "Gordic.Wfl.WebClient,Gordic.Wfl.WebClient.GWfldpozContent", serverParams: { Ixp: componentDto.ixp } }).call("ReadLastOne")
                                        .then(function (res) {
                                            if (res && res.text) {
                                                var newText = res.text.replace(/(?:<br>)/g, ' \r\n');
                                                if (!Gordic.Utils.WidgetExists("gfield", uzivPoznamkaField)) {
                                                    return;
                                                }
                                                uzivPoznamkaField.gfield("setValue", newText);
                                            }

                                        });
                                }
                            }
                        },

                        zkusNasetovatOdesilatele: function (dto) {
                            if (dto.SPrij === 1) {
                                var field = this.findFields("Odesilatel");
                                field.gfield("model", "apply", dto, { setFlags: { uvodniNastaveni: true } });
                                field.gfield("confirm");
                            } else {
                                if (dto.MistoVzniku) {
                                    var mistoVznikuField = this.findFields("MistoVzniku");
                                    mistoVznikuField.gfield("setValue", dto.MistoVzniku);
                                    mistoVznikuField.gfield("confirm");
                                }
                            }
                        },
                        enableProfil: function () {
                            this.setPodaniMode();
                            this.enableProfilBase();
                            /*
                            if (this.ReadOnlyEko) {
                                this.enableReadOnlyEkoProfil();
                            }
                            */
                            this.enableSslDetailVyrizeni();
                        },

                        setPodaniMode: function () {
                            if(componentDto.RezimPodani !== 0){
                                this.findFields(this.sslProfVyrizFieldsName).gformrow().hide();
                                if (componentDto.RezimPodani === 1) {
                                    this.element.addHelpContext("NovyVlastni");
                                } else if (componentDto.RezimPodani === 2) {
                                    this.element.addHelpContext("NovyCizi");
                                }
                            }
                        },
                        //#endregion
                        enableSslDetailVyrizeni: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }

                            this.findFields("IxsFunResitel").gfield("option", "disabled", l_bActionEnabled); // dsebesta přidáno protože nevím ty podmínky kdy mužu editovat
                            var fieldEnabled = (this.EditMode !== false) && !componentDto.DatVyrDoDisabled;
                            var field = this.findFields("DatVyrDo");
                            if (field) {
                                field.gfield("option", "disabled", !fieldEnabled);
                            }
                            if (componentDto.gin_n23_vedd != 0) { // 12.05.2025 nové skrývačky podle TK
                                if (!componentDto.PrizPozSkarRokDoPozSkarVisible) {
                                    this.findFields("PrizPozSkar").gformrow().hide();
                                }
                                if (!componentDto.DuvodPozSkarVisible) {
                                    this.findFields("DuvodPozSkar").gformrow().hide();
                                }
                                if (!componentDto.DatVyrizenoVisible) {
                                   // this.findFields("DatVyrizeno").gformrow().hide(); // zatím si nejsem uplně jistej jestli skrývat i tenhledatum, protože oproti TK je spojenej s více hodnotama
                                }
                                if (!componentDto.InicDokVisible) {
                                    this.findFields("InicDok").gformrow().hide();
                                }
                                if (!componentDto.VyrizDokVisible) {
                                    this.findFields("VyrizDok").gformrow().hide();
                                }
                                if (!componentDto.KomentarVisible) {
                                    this.findFields("Komentar").gformrow().hide();
                                }
                                if (!componentDto.ZpusobVyrizeniVisible) {
                                    this.findFields("ZpusobVyrizeni").gformrow().hide();
                                }
                               


                            }


                        },
                        isSimpleModeProfil: function () {
                            var isSoucast = componentDto.TypSpis == 3 || componentDto.TypSpis == 5;
                            var isTS = componentDto.TypSpis == 2;
                            var isDil = componentDto.TypSpis == 4;

                            if (this.SimpleMode) {
                                this.findFields("TerminDate").gformrow().hide();
                                //this.findFields("DatVyrDo").gformrow().hide(); // dodělat jen pro SSD ale s Radek říkal nedávat, Tak nedávat
                                this.findFields("Umisteni").gformrow().hide();
                                //this.findFields("StUtajIdWfl").gformrow().hide(); // dsebesta 31.08.2020 nově přístup i pro SSD
                                this.find(".js-labelDatEvidovano").hide();
                                this.findFields("DatEvidovano").hide(); //  dsebesta 22.12.2020 na řádku je společně s datPod proto skrývám pouze Datum evidence
                                this.findFields("Zpracovatel").gformrow().hide(); // Pozor nyni je políčko v hlavičce
                                //jakysi stav nejspíš ještě
                                var visible = this.isSetPodrobnostiSSD ? true : false;
                                this.showhideSSDPodrobnosti(visible);
                            }

                            if (isTS || isSoucast || isDil) {
                                this.findFields("PocPriloh").gformrow().hide();
                              //  this.findFields("Umisteni").gformrow().hide();
                            }
                        },
                        showhideSSDPodrobnosti: function (visible) {
                            if (visible) {
                                this.findFields("SpisZnak").gformrow().show();
                               // this.findFields("IxsFunWfl").gformrow().show(); 
                            } else {
                               
                                //if (UserProcess.Configuration.GetParameter("ssd_det_spznak", 1) == 0) { // TODO
                                //    componentDto.SSDSpisZnakVisible = false; // už nachystano
                                //}

                                if (!componentDto.SSDSpisZnakVisible) {
                                    this.findFields("SpisZnak").gformrow().hide();
                                }

                                //if (!componentDto.SSDVlastnikVisible) {
                                //    this.findFields("IxsFunWfl").gformrow().hide(); //vlastnik
                                //}//end if
                            }
                        },

                        enableProfilActions: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }
                            this.actions.actSSLPodrobnostiDokumentu.update({ enabled: l_bActionEnabled });

                            if (this.SimpleMode) {
                                this.actions.actSSLPodrobnostiDokumentu.update({ visible: true });
                            }

                            this.actions.actAddDilciTermin.update({ enabled: l_bActionEnabled && componentDto.AddTerminEnabled });
                            this.actions.actSplnitDilciTermin.update({ enabled: l_bActionEnabled && componentDto.SplnitTerminEnabled });

                        },

                        enableProfilBase: function () {
                            var that = this;
                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }
                            
                            // OdesilatelFlagPredplneniOdesilatele ???????
                            this.findFields("Odesilatel,MistoVzniku").gfield("option", "disabled", componentDto.BaseEnabledDto.OdesilatelRO);
                            if ($.content("main").wflDBParams.gin_poc_priloa > 0 && ((!l_bActionEnabled) || (componentDto.RezimPodani !== 0))) {
                                //this.findFields("PocPriloh").gfield("option", "disabled", componentDto.BaseEnabledDto.PoctyListuAllElementsRO); 
                            } else {
                                this.findFields("PocPriloh").gfield("option", "disabled", componentDto.BaseEnabledDto.PoctyListuAllElementsRO); 
                            }
                            this.findFields("PocListu,PocStran,PocListuPriloh,PocKopii").gfield("option", "disabled", componentDto.BaseEnabledDto.PoctyListuAllElementsRO); 
                            this.findFields("Poznamka").gfield("option", "disabled", (componentDto.BaseEnabledDto.PoznamkaRO || (this.SSl == 0)));
                           // this.findFields("VecnaSkupina").gfield("option", "disabled", componentDto.BaseEnabledDto.VecnaSkupinaRO);
                            this.findFields("SpisPl").gfield("option", "disabled", componentDto.BaseEnabledDto.SpisPlanRO);
                            this.findFields("SpisZnak").gfield("option", "disabled", componentDto.BaseEnabledDto.SpisZnakRO);
                            //this.findFields("StUtajIdWfl").gfield("option", "disabled", componentDto.BaseEnabledDto.StupUtajRO);
                            //this.findFields("IxsTyp").gfield("option", "disabled", componentDto.BaseEnabledDto.TypPisRO);
                            this.findFields("Umisteni").gfield("option", "disabled", (componentDto.BaseEnabledDto.UmisteniRO || (this.SSl == 0)));
                            this.findFields("VecPodrobne").gfield("option", "disabled", (componentDto.BaseEnabledDto.VecPodrobneRO || (this.SSl == 0) || !componentDto.JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno));
     
                            if (componentDto.RezimPodani === 0) {
                                var disabledKeyWords = !(l_bActionEnabled === false && !componentDto.BaseEnabledDto.KeywordsRO);
                                var keyWordsField = this.findFields("Keywords");
                                keyWordsField.gfield("option", "disabled", disabledKeyWords); // natvrdo KeyWord   měl jsem Keywords
                                if (disabledKeyWords) {
                                    Gordic.Ssl.WebClient.GDetailUtils.UpravKeywordsProOtevreniDialogu(this, keyWordsField, componentDto.LzeKlicovaSlova);
                                }
                            }
                            this.findFields("DatPodano").gfield("option", "disabled", componentDto.BaseEnabledDto.DatPodanoRO);

                            var form = this.findForms("formWflDokument");
                            form.gform("waitForValues").done(function () {
                                var valueUmisteni = that.findFields("Umisteni").gfield("getValue");
                                if (valueUmisteni && componentDto.LzeOperativneUlozit && valueUmisteni.priz_oper !== 0) {
                                    that.actions.actDocasneUloziste.update({ visible: true });
                                } else {
                                    that.actions.actDocasneUloziste.update({ visible: false });
                                }
                            });
                            this.actions.actDocasneUloziste.update({ enabled: l_bActionEnabled });
                            

                            
                            //butonek pro předvyplnění
                            this.pridejButonekDoOdesilatel();
                        },
                        /*
                        enableReadOnlyEkoProfil: function () { //ReadOnlyEkoProfil
                            //this.SSL
                            //tbEsu.ReadOnly = readOnlyEkoProfil;
                            this.findFields("Odesilatel,MistoVzniku").gfield("option", "disabled", true);
                            //tbVecPodrobne.ReadOnly = readOnlyEkoProfil || DocInfo.SSl == 0;
                            this.findFields("VecPodrobne").gfield("option", "disabled", true);
                            //tbSpZn.ReadOnly = readOnlyEkoProfil;
                            this.findFields("SpisZnak").gfield("option", "disabled", true);
                           
                            //tbPoznamka.ReadOnly = readOnlyEkoProfil || DocInfo.SSl == 0; 
                            this.findFields("Poznamka").gfield("option", "disabled", true);
                            //tbPocetListuStran.tbListu.ReadOnly = readOnlyEkoProfil;
                            //tbPocetListuStran.tbStran.ReadOnly = readOnlyEkoProfil;
                            //tbPocetListuStran.tbPriloh.ReadOnly = readOnlyEkoProfil;
                            //tbPocetListuStran.tbKopii.ReadOnly = readOnlyEkoProfil;
                            //tbPocetListuStran.tbListuPriloh.ReadOnly = readOnlyEkoProfil;
                            this.findFields("PocListu,PocStran,PocPriloh,PocListuPriloh,PocKopii").gfield("option", "disabled", true); 
                            //tbTypDok.ReadOnly = readOnlyEkoProfil;
                            this.findFields("IxsTyp").gfield("option", "disabled", true);
                            //cbPristup.ReadOnly = readOnlyEkoProfil
                            this.findFields("StUtajIdWfl").gfield("option", "disabled", true);
                            
                         
                            //tbUmisteni.ReadOnly = readOnlyEkoProfil || DocInfo.SSl == 0;
                            this.findFields("Umisteni").gfield("option", "disabled", true);
                        },
                        */
                        pridejButonekDoOdesilatel: function () {
                            
                            if (componentDto.SPrij === 1 && !componentDto.BaseEnabledDto.OdesilatelRO) {
                                var jeVyplneno = Gordic.Gin.Globals.GetUserSettings("Global.Ssl.AppSettings.DetailSettings.Odesilatel.IxsEsu", null);
                                if (jeVyplneno) { 
                                    var field = this.findFields("Odesilatel");
                                    field.gfield("addButton", {
                                        icon: 'gi-take',
                                        tooltip:"jres:31937019", //RC 31937019 : Předplní pole z uživatelského nastavení
                                        action: new GAction({
                                            name: 'actPredplnitSub', run: function (ev, ctx) {
                                                var obj = {
                                                    IxsEsu: Gordic.Gin.Globals.GetUserSettings("Global.Ssl.AppSettings.DetailSettings.Odesilatel.IxsEsu", null),
                                                    LicZast: Gordic.Gin.Globals.GetUserSettings("Global.Ssl.AppSettings.DetailSettings.Odesilatel.LicZast", null),
                                                    PorZast: Gordic.Gin.Globals.GetUserSettings("Global.Ssl.AppSettings.DetailSettings.Odesilatel.PorZast", null)
                                                };
                                                if (obj.IxsEsu) {
                                                    $(ctx.field).gfield("model", "apply", obj);
                                                }
                                            }
                                        })
                                    });
                                }

                            }

                        },
                        addDilciTermin: function () {
                            var that = this;
                            var options = {
                                Ixp: componentDto.ixp
                            };
                            Gordic.Ssl.Dialogs.AddDilciTerminDlg(that, options,"showModalWindow")
                                .on("closed", function (ev, retVal) {
                                    if (retVal) {
                                        that.reloadDetail();
                                    }
                                });
                        },
                        splnitDilciTermin: function () {
                            var that = this;
                            this.dialogs.confirm("jres:26256504").on("closed", function (ev, retVal) { //RC 26256504 : Chcete zaznamenat splnění dílčího termínu?
                                if (retVal) {
                                    if (retVal === "yes") {
                                        var colect = {};
                                        that.findFields("TerminDate,TerminDuvod").gfield("model", "collect", colect);
                                        var opt = {
                                            Ixp: componentDto.ixp,
                                            DatZmena: componentDto.DatZmena, //??
                                            DatTermin: colect.TerminDate,
                                            Duvod: colect.TerminDuvod,
                                            Mode: 2
                                        };
                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("ZpracovatDilciTermin", opt )
                                            .done(function (rv) {
                                                if (rv) {
                                                    that.reloadDetail();
                                                } else {
                                                    that.dialogs.alert("jres:31937098");  //RC 31937098 : Splnění termínu se nepodařilo.
                                                }
                                                
                                            })
                                            .fail(function (rv) {
                                                that.dialogs.alert("jres:31937098"); //RC 31937098 : Splnění termínu se nepodařilo.
                                            }).always(function () { srv.close(); });
                                    }
                                }
                            });
                        },

                         // ##################### !!!!!!! Vyřízení !!!!!!!!!!!!!!!! #####################
                        showInicVyrizDokument: function (flagInicVyriz) {
                            var that = this;
                            var aIxp = null;
                            if (flagInicVyriz == 0) {
                                aIxp = this.findFields("InicDok").gfield("getValue");
                            } else {
                                aIxp = this.findFields("VyrizDok").gfield("getValue");
                            }
                            if (aIxp) {
                                that.otevriNovyDetail(
                                    {
                                        DetailDto: { ixp: aIxp }
                                    });
                            } else {
                                that.showFlash("jres:31937075", "g-state-warning"); //RC 31937075 : Není vyplněný identifikátor
                            }

                        },

                        removeVyrizDok: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var VyrizDok = this.findFields("VyrizDok").gfield("getValue");
                            if (VyrizDok) {
                                var options = {
                                    "Ixp": l_sIxp,
                                    "IxpVyriz": VyrizDok
                                };
                                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                srv.call("RemoveVyrizujiciDokumentCj", options)
                                    .done(function (retVal) {
                                        if (retVal.StavBool) {
                                            that.tryReloadDetail(undefined, {
                                                flashMessage: "jres:31937077", //RC 31937077 : Vyřizující dokument byl odebrán
                                                flashMessageClass: "g-state-success"
                                            });
                                        }
                                    }).always(function () { srv.close(); });

                            }

                        },

                        sslPodrobnostiDokumentu: function () {
                            var that = this;
                            var options = {
                                Ixp: componentDto.ixp,
                            };
                            var $div = Gordic.Ssl.Dialogs.PodrobnostiDockumentuDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow);

                            $div.on("closed", function (ev, retVal) {
                                if (retVal) {
                                    that.tryReloadDetail(undefined, {
                                        flashMessage: "jres:31937173", //RC 31937173 : V podrobnostech dokumentu došlo ke změně.
                                        flashMessageClass: "g-state-success",
                                    });
                                }
                            });

                        },

                        kontrolaPoctuPriloh: function () {
                            if (componentDto.ssl_kon_poc_pri === 1
                                && $.content("main").wflDBParams.gin_poc_priloa == 0) {  // ALF 29.1.2016 SSL - kontrolovat shodu na počet příloh v evidenční položce na detailu dokumentu a v seznamu příloh
                                //componentDto.PocetPrilohPisemnosti
                                var field = this.findFields("PocPriloh");
                                var pocPrilohInDetail = field.gfield("getValue");
                                if (componentDto.PocetPrilohPisemnosti !== null && componentDto.PocetPrilohPisemnosti !== undefined
                                    && pocPrilohInDetail !== null && pocPrilohInDetail !== undefined
                                    && pocPrilohInDetail !== componentDto.PocetPrilohPisemnosti) {
                                    var warningText = "jres:31937239".format(componentDto.PocetPrilohPisemnosti) //RC 31937239 : Rozpor v počtu příloh, v dialogu příloh jich je zadáno {0}

                                    field.gfield("addState", {
                                        id: "IdKontrolaPoctuPriloh",     // nepovinný, pouze pokud bude potřeba ikonu adresovat/měnit
                                        icon: "fa-exclamation-triangle g-state-text g-state-warning",
                                        //customClass: "g-state-warning",
                                        tooltip: warningText
                                    });
                                } else {
                                    var prilohyState = field.gfield("getState", "IdKontrolaPoctuPriloh");
                                    if (prilohyState != null && prilohyState.length > 0 ) {
                                        prilohyState.remove();
                                    }
                                }
                            }
                            // pridani noveho stavu
                            // odstraneni stavové ikony
                                
                        },
                        kontrolaESUVRegistrech: function() {
                            var that = this;
                            var usSetting = this.globalSettings.get("Global.Ssl.AppSettings.DetailSettings.OveritOdesilateleVSZR")
                            if (usSetting == undefined) { usSetting = true; }
                            var gin_esu_n23ao = $.content("main").wflDBParams.gin_esu_n23ao;
                            if (gin_esu_n23ao > 0
                                && componentDto.SPrij === 1
                                && (gin_esu_n23ao == 1 || (gin_esu_n23ao == 2 && usSetting))
                                && (this.EditMode || componentDto.RezimPodani !== 0)
                            ) {
                                var dtoOdesilatel= {};
                                var fieldSubjekt = this.findFields("Odesilatel");

                                fieldSubjekt.gfield("model", "collect", dtoOdesilatel);
                                if (dtoOdesilatel.IxsEsu != null
                                    && dtoOdesilatel.IxsEsu != this.IxsEsuOdesilatelePoKontrole
                                ) {
                                    this.beginOperation("jres:31937530") //RC 31937530 : Probíhá ověření ESU v egistrech
                                    var fieldSubjektValue = fieldSubjekt.gfield("getValue");

                                    var opt  = {
                                        ZpusDor: 0,
                                        IxsEsuOdesilatele: dtoOdesilatel.IxsEsu,
                                        ESUStupenVer: fieldSubjektValue.stupen_ver,
                                        ESUIdDs: fieldSubjektValue.id_ds
                                    };
                                    Gordic.Wfl.Utils.KontrolaESUVRegistrech(this, opt)
                                        .then(function (retVal) {
                                            if (retVal) {
                                                if (retVal.NewIxsEsuOdesilatele != null) {
                                                    that.IxsEsuOdesilatelePoKontrole = retVal.NewIxsEsuOdesilatele;
                                                    dtoOdesilatel.IxsEsu = retVal.NewIxsEsuOdesilatele;
                                                    fieldSubjekt.gfield("model", "apply", dtoOdesilatel);
                                                    that.notification("add", { icon: "gi-info", content: "jres:31937531", state: "success" }); //RC 31937531 : Na základě ověření ESU v regisrech bylo ESU aktualizováno
                                                } else {
                                                    that.IxsEsuOdesilatelePoKontrole = retVal.IxsEsuOdesilatele;
                                                }
                                                if (retVal.OtevritDetailEsu) {
                                                    var vyberESUDetBut = fieldSubjekt.gfield("getButton", "actDetail");
                                                    if (vyberESUDetBut != null && vyberESUDetBut.length > 0) {
                                                        vyberESUDetBut.click();
                                                    }
                                                }
                                            }
                                        })
                                        .fail(function (msg) {

                                        })
                                        .always(function (msg) {
                                            that.endOperation();
                                        })
                                        ;

                                }
                            }
                        },

                        eventaProUpdatePoctuPriloh: function () {
                            var that = this;
                            if($.content("main").wflDBParams.gin_poc_priloa > 0) { 
                                this.element.on("attachmentscountchange", function (ev, ctx) {
                                    if (ctx && ctx.firstTimeLoad) {
                                        ;
                                     //první načtení nedělám asi nic
                                    }
                                    else { 
                                        var opt = {
                                            ixp: componentDto.ixp
                                        };
                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("ZjistiAktualniPocetPriloh", opt)
                                            .done(function (retVal) {
                                                if (retVal && retVal.StavBool) {
                                                    componentDto.PocetPrilohPisemnosti = retVal.NumParam1;
                                                    that.findFields("PocPriloh").gfield("setValue", retVal.NumParam1);
                                                } 

                                            })
                                            .fail(function (rv) {
                                            }).always(function () { srv.close(); });
                                    }
                                    /*
                                    // starý postup z eventy
                                    if (ctx && ctx.attachmentsCount != null) { //ctx.mainAttachmentCount, ctx.attachmentsCount
                                        // Poznamka RTOMES: Davide, nyní se už nemůžeš spolehnout, že zde bude správný počet pro pole Počet příloh. Musíš si to líznout z db - T13193
                                        componentDto.PocetPrilohPisemnosti = ctx.attachmentsCount;
                                        that.findFields("PocPriloh").gfield("setValue", ctx.attachmentsCount);
                                    }
                                    */
                                });
                            }
                        }

                        
                    },
                    tabs: {
                        SslProfil: {
                            tabParams: {
                                title: componentDto.Title, 
                                opened: true,  //1. tab je pro agednovou hlavičku, ta je pro dokumenty, spisy, zakázky atp. vždy L2M2S1. BO detaily mimo wfl (tzn. dokumenty, spisy) jsou v L1M1S1 //RC 26255308 : Dokument
                                group: Gordic.Prefabs.TabGroups.Dokument(componentDto.Title),
                                headerClass: "hidden"
                                /*
                                menuBar:  [
                                    { action: "actAddVyrizDok", favorite: true },
                                    { action: "actRemoveVyrizDok", favorite: true },
                                    { action: "actVyriditDok", favorite: true },
                                    { action: "actSSLPodrobnostiDokumentu", favorite: true }
                                ]
                                */
                            },
                            init: function (tab) {
                                //#region definice tab dokumentu
                                var that = $.content(tab);

                                var isSoucast = componentDto.TypSpis == 3 || componentDto.TypSpis == 5;
                                var isTS = componentDto.TypSpis == 2;
                                var isDil = componentDto.TypSpis == 4;
                                var isSpis = componentDto.TypSpis == 1; // na tomto formuláři by nemělo nastat
                                var isDokument = componentDto.TypSpis == 0;

                                var profilForm = new Gordic.Forms
                                    .Form({
                                        name: "formWflDokument",
                                        layoutDescriptor: "L2M2S1, L-3-9-0, M-3-9-0, S-12-12-0"
                                    })
                                    .addSection({ label: componentDto.Title, layoutDescriptor: "L-2-10-0, M-3-9-0, S-12-12-0", customClass: "w-L-7 w-M-7 w-S-12" });
                                if (componentDto.SPrij === 1) {
                                    profilForm
                                        .addRow("jres:26255430") //RC 26255430 : Odesílatel
                                        .addField("gselectbox", {
                                            name: "Odesilatel",
                                            model: "model.IxsEsu=value.ixs_esu;model.LicZast=value.lic;model.PorZast=value.por_zast",
                                            change: function (ev, changeObj) {
                                                if (changeObj && changeObj.value && !(changeObj.flags && changeObj.flags.uvodniNastaveni)) {
                                                    that.kontrolaESUVRegistrech();
                                                }
                                            },

                                            disabled: false,
                                            validators: componentDto.usu_povin_odes === 1 ? [new Gordic.Validators.Required()] : undefined,

                                        }, Gordic.Esu.Prefabs.vyberEsu({
                                            typ: 2,// 2 a 3 puvodně 2 
                                            Logovani: that.Logovani,
                                            VyberESUDialogClose: function (opt, retVal) {
                                                debugger;
                                            },
                                            //FieldsToFilterpanel: [Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Nazev]
                                            //ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow
                                            //strictEnableChangeZoInDisabled:true
                                        })
                                        );
                                } else {
                                    profilForm
                                        .addRow("jres:26255430") //RC 26255430 : Odesílatel)
                                        .addField("gstringbox", {
                                            name: "MistoVzniku",
                                            model: "model.MistoVzniku=value",
                                            validators: componentDto.usu_povin_odes === 1 ? [new Gordic.Validators.Required()] : undefined,
                                        });
                                }

                                var vecPodrobneLabel = "jres:26255458"; //RC 26255458 : Věc podrobně

                                switch (componentDto.TypSpis) {
                                    case 2: { // TS
                                        vecPodrobneLabel = "jres:26257350"; //RC 26257350 : Název - podrobně
                                        break;
                                    }
                                    case 3: { // Součást koncová
                                        vecPodrobneLabel = "jres:26257351"; //RC 26257351 : Obsah podrobně
                                        break;
                                    }
                                    case 5: { // Součást
                                        vecPodrobneLabel = "jres:26257351"; //RC 26257351 : Obsah podrobně
                                        break;
                                    }
                                }

                                profilForm
                                    .addRow(vecPodrobneLabel) //RC 26255458 : Věc podrobně
                                    .addField("gstringbox", Gordic.Prefabs.Field.charCounter(componentDto.VecPodrobneMaxLength), {
                                        name: "VecPodrobne",
                                        model: "model.ObsahText=value",
                                        rows: 4,
                                        validators: [new Gordic.Validators.Length({ max: componentDto.VecPodrobneMaxLength, message: "jres:31937028" })], //RC 31937028 : Hodnota v poli je moc dlouhá
                                    });

                                var podanoLabel = "jres:26255493"; //RC 26255493 : Podáno

                                if(isTS || isSoucast || isSpis) {
                                    podanoLabel = "jres:26257386"; //RC 26257386 : Dat. založení
                                } else if(isDil) {
                                    podanoLabel = "jres:26257293"; //RC 26257293 : Dat. otevření
                                }

                                profilForm.addRow(podanoLabel)
                                    .addField("gdatebox", "w-5",
                                        {
                                            name: "DatPodano",
                                            valueType: isDokument ? "datetime" : "date",
                                            disabled: true,
                                            validators: [
                                                new Gordic.Validators.Range({
                                                    max: new Date(new Date().getTime() + 86400000) // přidán validátor na maximální datum dneska + jeden den
                                                })
                                            ],
                                            minValue: Gordic.Ssl.Utils.MinimalDate

                                        });

                                if(isDil) { // jen díly a dokumenty s odlišným obsahem
                                    if(componentDto.StavPis >= 20) {
                                        profilForm
                                            .addText("jres:26257357", "w-3 right js-labelDatEvidovano") //RC 26257357 : Dat. uzavření
                                            .addField("gdatebox", "w-4",
                                                {
                                                    name: "DatUzav",
                                                    disabled: true,
                                                    minValue: Gordic.Ssl.Utils.MinimalDate
                                                });
                                    } else {
                                        profilForm
                                            .addText("jres:26257294", "w-3 right js-labelDatEvidovano") //RC 26257294 : Předp. uzavření
                                            .addField("gdatebox", "w-4",
                                                {
                                                    name: "DatPredpUzav",
                                                    disabled: true,
                                                    minValue: Gordic.Ssl.Utils.MinimalDate
                                                });
                                    }
                                    
                                } else if (!isTS && !isSoucast) {
                                    profilForm
                                        .addText(componentDto.DatEvidovanoLabel, "w-3 right js-labelDatEvidovano")
                                        .addField("gdatebox", "w-4",
                                            {
                                                name: "DatEvidovano",
                                                disabled: true,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            });
                                }


                                var spznRequired = componentDto.ssl_povin_spzn === 2 || (that.EditMode === true && componentDto.ssl_povin_spzn === 1)

                                if(componentDto.gin_n23_vecsk == 1) {

                                    profilForm
                                        .addRow("jres:26257232") //RC 26257232 : Věcná skupina
                                        .addField("gselectbox", Gordic.Prefabs.Select.ginsvsk(), {
                                            name: "VecnaSkupina",
                                            model: "model.IxsVsk=value.ixs_vsk",
                                            disabled: true,
                                            graphicInput: "oninput",
                                            itemTemplate: Gordic.Wfl.GWflCommonDlg.ginsvskItemTemplate({ casObdobiVisible: isSoucast, nezobrazovatTucnyNazev: true }), // mozna doplnit isKoncovaSoucast, ale policko si s tím poradí i tak
                                            itemTooltipTemplate: Gordic.Wfl.GWflCommonDlg.ginsvskItemTooltipTemplate({ casObdobiVisible: isSoucast, nezobrazovatTucnyNazev: true }), // mozna doplnit isKoncovaSoucast, ale policko si s tím poradí i tak

                                            //validators: spznRequired ? [new Gordic.Validators.Required()] : undefined, 
                                            serverFilters: {
                                                JenKoncove: !isTS, 
                                                urceni_spis_z: isSoucast ? [6] : [1, 3]
                                            }

                                        })
                                } else {
                                    var prefabSslsspzOptions = Gordic.Prefabs.Select.sslsspz();

                                    if(spznRequired) {
                                        prefabSslsspzOptions.validators.push(new Gordic.Validators.Required());
                                    } 

                                    profilForm
                                        .addRow("jres:26255820") //RC 26255820 : Spisový znak
                                        .addField("gselectbox", "w-3", Gordic.Prefabs.Select.sslsspl(), { //"w-2"
                                            name: "SpisPl",
                                            model: "model.SpisPl=value.spis_pl",
                                            validators: spznRequired ? [new Gordic.Validators.Required()] : undefined,
                                            /* serverFilters: {
                                                    aktivita: [100]
                                                }*/

                                        })
                                        .addField("gselectbox", "w-9", prefabSslsspzOptions, { //"w-6"
                                            name: "SpisZnak",
                                            graphicInput: "oninput",
                                            itemTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTemplate(),
                                            itemTooltipTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTooltipTemplate(),
                                            model: function (operation, dto, modelOptions) {
                                                switch (operation) {
                                                    case "apply": $(this).gfield("setValue", { spis_pl: dto.SpisPl, spis_znak: dto.SpisZnak }, { valid: false }); return;
                                                    case "collect": dto.SpisZnak = ($(this).gfield("getValue") ? $(this).gfield("getValue").spis_znak : null); return;
                                                    default: return "SpisZnak ";
                                                }
                                            },
                                            //model:"model.SpisPl=value.spis_pl;model.SpisZnak=value.spis_znak",
                                            serverFilters: {
                                                //  aktivita: [100],
                                                spis_pl: new Gordic.Forms.Dependency("SpisPl", "spis_pl") //, true)
                                            },
                                        });
                                }

                                if (componentDto.UsingDilciTermin === true) {
                                    profilForm
                                        .addRow("jres:26255478") //RC 26255478 : Termín
                                        .addField("gdatebox", "w-4",
                                            {
                                                name: "TerminDate",
                                                disabled: true,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            })
                                        .addField("gstringbox", "w-8",
                                            {
                                                name: "TerminDuvod",
                                                disabled: true,

                                                buttons: [
                                                    { requireEdit: false, action: that.actions.actAddDilciTermin },
                                                    { requireEdit: false, action: that.actions.actSplnitDilciTermin }

                                                ]
                                            });
                                }

                                if (componentDto.RezimPodani === 0 && componentDto.gin_n23_vedd === 1) {
                                    profilForm
                                        .addRow({
                                            label: "jres:31937552",//RC 31937552 : Poř. č. ve spisu
                                            hint: "jres:31937549"//RC 31937549 : Pořadové číslo ve spisu
                                        })
                                        .addField("gnumberbox", {
                                            name: "PorCisloVSpisu",
                                            tooltip: "jres:31937550", //RC 31937550 : Pořadové číslo ve spisu
                                            disabled: true,

                                        })
                                        .addRow({
                                            label: "jres:31937553", //RC 31937553 : Poř. č. v období
                                            hint: "jres:31937554", //RC 31937554 : Pořadové číslo dokumentu v rámci určeného časového období
                                        })
                                        .addField("gnumberbox", {
                                            name: "PorCisloObd",
                                            tooltip: "jres:31937554", //RC 31937554 : Pořadové číslo dokumentu v rámci určeného časového období
                                            disabled: true,

                                        });
                                }


                                profilForm.addSection({ label: "jres:31937118", layoutDescriptor: "L-3-9-0, M-3-9-0, S-12-12-0", customClass: "w-L-5 w-M-5 w-S-12" }); //RC 31937118 : Další údaje




                                if (componentDto.RezimPodani === 0) {
                                    profilForm.addRow({ label: "jres:26255342" })
                                        //.addText("", "js-budouciKlicovaSlova"); //RC 26255342 : Klíčová slova
                                        .addField("gkeywordsbar", {
                                            ixp: componentDto.ixp,
                                            parentGcontent: that,
                                            name: "Keywords",
                                            disabled: true,
                                            saveData: "save",
                                            tooltip: "jres:26255342" //RC 26255342 : Klíčová slova
                                        }
                                        );
                                }

                                profilForm
                                    .addRow("jres:26255397") //RC 26255397 : Poznámka
                                    .addField("gstringbox", Gordic.Prefabs.Field.charCounter(
                                        componentDto.Validators && componentDto.Validators.Poznamka && componentDto.Validators.Poznamka[0] && componentDto.Validators.Poznamka[0].max
                                            ? componentDto.Validators.Poznamka[0].max
                                            : undefined
                                    ),
                                        {
                                            name: "Poznamka"
                                        });

                                if (componentDto.RezimPodani === 0 && that.globalSettings.get("Global.Ssl.AppSettings.DetailSettings.ZobrazUzivPozn")) {
                                    profilForm
                                        .addRow({
                                            label: "jres:31937451", //RC 31937451 : Uživatelská poznámka
                                            hint: "jres:31937452" //RC 31937452 : Poslední uživatelská poznámka
                                        }) //RC 26255397 : Poznámka
                                        .addField("gstringbox",
                                            {
                                                name: "UzivPoznamka",
                                                tooltip: "jres:31937453", //RC 31937453 : Poslední uživatelská poznámka
                                                disabled: true,
                                                rows: 2,
                                            });
                                }

                                var jeTypovaEntitaAVypnemeRequiredUPoctu = componentDto.TypSpis > 1;

                                var prefab = Gordic.Wfl.Prefabs.GPocetListu(

                                    $.content("main").wflDBParams, // nejde zatím číst z mainu protože se používá i v hybridu
                                    {
                                        model: "model.PocListu=value",
                                        // defaultValue: (componentDto.PocListu === "" || componentDto.PocListu === null) ? null : 0, // ref T37589
                                        defaultValue: null, // ref T37589
                                    },
                                    {
                                        model: "model.PocStran=value",
                                        // defaultValue: componentDto.PocStran === null ? null : 0, // ref T37589
                                        defaultValue: null, // ref T37589
                                    },
                                    {
                                        model: "model.PocPriloh=value",
                                        change: function (ev, changeObj) {

                                            that.kontrolaPoctuPriloh();
                                        },
                                        // defaultValue: componentDto.PocPriloh === null ? null : 0, // ref T37589
                                        defaultValue: null, // ref T37589
                                    },
                                    {
                                        model: "model.PocListuPriloh=value",
                                        // defaultValue: (componentDto.PocListuPriloh === "" || componentDto.PocListuPriloh === null) ? null : 0, // ref T37589
                                        defaultValue: null, // ref T37589
                                    },
                                    {
                                        model: "model.PocKopii=value",
                                        // defaultValue: componentDto.PocKopii === null ? null : 0, // ref T37589
                                        defaultValue: null, // ref T37589
                                    },
                                    {

                                    },
                                    componentDto.SFyz,
                                    false,
                                    jeTypovaEntitaAVypnemeRequiredUPoctu
                                );

                                profilForm.addPrefab(prefab);

                                if (componentDto.ssl_dok_zprac === 1) {
                                    profilForm
                                        .addRow("jres:26255517") //RC 26255517 : Zpracovatel
                                        .addField("gselectbox",
                                            Gordic.Gin.Fields.ginsfunSSU(
                                                {
                                                    name: "IxsFunResitel",
                                                    model: "model.IxsFunResitel = value.ixs_fun",
                                                    disabled: true,
                                                    serverFilters: {
                                                        aktivita: [100],
                                                    },
                                                }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)
                                        );
                                    /*
                                         Gordic.Gin.Fields.ginspodSSU(
                                         {
                                             name: "IxsFunAktIxsSU",
                                             model: "model.IxsFunAktIxsSU = value.ixs_su",
                                             disabled: true,
                                             serverFilters: {
                                                 aktivita: [100],
                                             },
                                         }, false))
                                        .addField("gselectbox",//"w-8",
                                            Gordic.Gin.Fields.ginsfunSSU(
                                            {
                                                name: "IxsFunResitel",
                                                disabled: true,
                                                model: "model.IxsFunResitel = value.ixs_fun",
                                                serverFilters: {
                                                    aktivita: [100],
                                                    //DlePovolenychAgend: true,
                                                    ixs_su: new Gordic.Forms.Dependency("IxsFunAktIxsSU", "ixs_su")
                                                },
                                            }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO, "IxsFunAktIxsSU"));
                                            */
                                }

                                //profilForm
                                //    .addRow("jres:31937119") //RC 31937119 : Agendový vlastník
                                //    .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(),
                                //        {
                                //            name: "IxsFunWfl",
                                //            model: "model.IxsFunWfl = value.ixs_fun",
                                //            disabled: true
                                //        });

                                profilForm
                                    .addRow("jres:26255482") //RC 26255482 : Umístění
                                    .addField("gselectbox", Gordic.Prefabs.Select.sslsumi(),
                                        {
                                            name: "Umisteni",
                                            model: "model.Umisteni=value.umisteni",
                                            //itemTemplate: function (value) {
                                            //    if (value && value.umisteni_txt) {
                                            //        return "" + value.umisteni_txt + (value.poznamka ? (" - " + value.poznamka) : "");
                                            //    } else {
                                            //        return null
                                            //    }
                                            //}, 
                                            serverFilters: {
                                                aktivita: [100],
                                                ixs_su: componentDto.IxsSuAkt
                                            },
                                            buttons: [
                                                {
                                                    icon: 'gi-detail',
                                                    requireEdit: false,
                                                    action: that.actions.add(
                                                        new GAction({
                                                            name: 'actDocasneUloziste',
                                                            caption: '',
                                                            //tooltip: "jres:31937099", //RC 31937099 : Zobrazit balík
                                                            icon: 'gi-detail',
                                                            visible: false,
                                                            run: function (ev, ctx) {
                                                                var field = $(ctx.field);
                                                                var opt = {
                                                                    parentContent: that,
                                                                    opt: {
                                                                        Ixp: componentDto.ixp,
                                                                        AktUmisteni: undefined
                                                                    },
                                                                    ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow
                                                                };
                                                                Gordic.Wfl.Dialogs.DocasneUlozisteDlg(opt).done(function (retVal) {
                                                                    if (retVal && retVal.DosloKeZmene) {
                                                                        that.reloadDetail();
                                                                    }
                                                                });
                                                            }
                                                        }
                                                        ))
                                                }]
                                        });

                                if(!isTS && !isSoucast && !isDil) {
                                    profilForm
                                        .addRow("jres:26255513") //RC 26255513 : Stav
                                        .addText(componentDto.VyrizenoLabel, "w-6")
                                        .addField("gdatebox", "w-6",
                                            {
                                                name: "DatVyrizeno",
                                                disabled: true,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            });
                                }

                                var buttons = [
                                    {
                                        icon: 'gi-detail',
                                        requireEdit: false,
                                        action: that.actions.add(new GAction(Gordic.Spi.PreActions.OtevriDetailBaliku({
                                            inputData: {
                                                parentContent: that,
                                                opt: {
                                                    IxsZup: componentDto.IxsZup
                                                }
                                            },
                                            actionParams: {
                                                name: 'actBalik',
                                                caption: '',
                                                tooltip: "jres:31937099", //RC 31937099 : Zobrazit balík
                                                icon: 'fa-archive '
                                            }
                                        })))
                                    }];
                                if (componentDto.FieldUlozDatumVisible) {
                                    profilForm.addRow(componentDto.FieldUlozLabel)
                                    profilForm
                                        .addField("gdatebox",
                                            {
                                                name: "FieldUlozDatum",
                                                valueType: "datetime",
                                                disabled: true,
                                                buttons: componentDto.TlacitkoBalikVisible ? buttons : undefined,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            });
                                }
                                if (componentDto.FieldUlozVisible) {
                                    profilForm.addRow(componentDto.FieldUlozLabel)
                                    profilForm
                                        .addField("gstringbox",
                                            {
                                                name: "FieldUloz",
                                                disabled: true,
                                                buttons: componentDto.TlacitkoBalikVisible ? buttons : undefined,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            });
                                }
                                if (componentDto.IdExtArch) {
                                    profilForm.addRow("jres:31937483")   //RC 31937483 : Id archivu
                                        .addField("gstringbox", {
                                            name: "IdExtArch",
                                            disabled: true,
                                        })
                                }

                                if (componentDto.DatPrMocVisible) {
                                    profilForm
                                        .addRow("jres:26256668")  //RC 26256668 : Nabytí právní moci
                                        .addField("gdatebox",
                                            {
                                                name: "DatPrMoc",
                                                valueType: "datetime",
                                                disabled: true,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            });
                                }
                                if (componentDto.DatVykonavVisible) {
                                    profilForm
                                        .addRow("jres:31937462")  //RC 31937462 : Vykonavatelnost
                                        .addField("gdatebox",
                                            {
                                                name: "DatVykonav",
                                                valueType: "datetime",
                                                disabled: true,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            });
                                }

                                if (isDil) {
                                    profilForm
                                        .addRow('jres:32170475') //RC 32170475 : Datum zničení
                                        .addField('gdatebox', {
                                            name: 'DatDel',
                                            valueType: 'datetime',
                                            disabled: true
                                        })
                                        ;
                                }

                                if (componentDto.IsSSLVyrizeni) {

                                    profilForm.addSection({ label: "jres:26255161", layoutDescriptor: "L-2-10-0, M-3-9-0, S-12-12-0", customClass: "w-L-7 w-M-7 w-S-12" }); //RC 26255161 : Vyřízení

                                    profilForm
                                        .addRow("jres:26255561") //RC 26255561 : Termín vyřízení
                                        .addField("gdatebox", {
                                            name: "DatVyrDo",
                                            disabled: true,
                                            minValue: Gordic.Ssl.Utils.MinimalDate
                                        })

                                        .addRow("jres:26255431") //RC 26255431 : Způsob vyřízení
                                        .addField("gstringbox", {
                                            name: "ZpusobVyrizeni",
                                            disabled: true
                                        })

                                        .addRow("jres:26255503") //RC 26255503 : Iniciační dok.
                                        .addField("gstringbox", {
                                            name: "InicDok",
                                            buttons: [
                                                { icon: 'gi-detail', action: that.actions.actShowInicDokument, requireEdit: false }
                                            ],
                                            disabled: true
                                        })
                                        .addRow("jres:26255504") //RC 26255504 : Vyřizující dok.
                                        .addField("gstringbox", {
                                            name: "VyrizDok",
                                            buttons: [
                                                { icon: 'gi-detail', action: that.actions.actShowVyrizDokument, requireEdit: false }
                                            ],
                                            disabled: true
                                        })
                                        //.addRow("jres:31937124") //RC 31937124 : Schválil
                                        //.addField("gselectbox", Gordic.Prefabs.Select.ginsfun(),
                                        //    {
                                        //        name: "Schvalovatel",
                                        //        model: "model.Schvalovatel = value.ixs_fun",
                                        //        disabled: true
                                        //    })





                                        ////.addRow("jres:26255517") //RC 26255517 : Zpracovatel
                                        //.addField("gselectbox", "w-8", Gordic.Prefabs.Select.ginsfun(),
                                        //    {
                                        //        name: "Zpracovatel",
                                        //        model: "model.Zpracovatel = value.ixs_fun",
                                        //        disabled: true
                                        //    })

                                        .addRow({ label: "jres:31937126", hint: "jres:31937126" }) //RC 31937126 : Datum uzavření, uzavřel
                                        .addField("gdatebox", "w-4",
                                            {
                                                name: "DatUzav",
                                                disabled: true,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            })

                                        .addField("gselectbox", "w-8",

                                            Gordic.Gin.Fields.ginsfunSSU(
                                                {
                                                    name: "IxsFunUzavrel",
                                                    model: "model.IxsFunUzavrel = value.ixs_fun",
                                                    disabled: true,
                                                    serverFilters: {
                                                        aktivita: [100],
                                                    },
                                                }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)

                                        )
                                        .addRow("jres:26255507") //RC 26255507 : Komentář
                                        .addField("gstringbox", {
                                            name: "Komentar",
                                            rows: 2,
                                            disabled: true
                                        })
                                        ;
                                    //.addRow("jres:26255660") //RC 26255660 : Datum vyřízení
                                    //.addField("gdatebox", {
                                    //    name: "DatVyr",
                                    //    disabled: true
                                    //})
                                    if (componentDto.UlozenoNlPrilohAUlozenoListuDokVisible) {
                                        profilForm
                                            .addRow({ label: "jres:31937416" }) //RC 31937416 : Uloženo listů
                                            .addField("gnumberbox", {
                                                name: "UlozenoListuDok",
                                                disabled: true,

                                            });
                                        profilForm
                                            .addRow({ label: "jres:31937417", hint: "jres:31937417" }) //RC 31937417 : Uloženo nelistinných příloh
                                            .addField("gstringbox", {
                                                name: "UlozenoNlPriloh",
                                                disabled: true
                                            });
                                    }

                                }

                                if(componentDto.IsSSLVyrizeni) {

                                    profilForm.addSection({label:"jres:31937081", layoutDescriptor: "L-3-9-0, M-3-9-0, S-12-12-0", customClass: "w-L-5 w-M-5 w-S-12" }); //RC 31937081 : Skartace

                                    if(componentDto.gin_n23_vecsk > 0) {
                                        profilForm
                                            .addRow({ label: "jres:26257353", hint: "jres:26257353" }) //RC 26257353 : Skartační režim
                                            .addField("gselectbox", Gordic.Prefabs.Select.ginsskr(), {
                                                name: "SkartRezim",
                                                placeholder: 'jres:26257354', //RC 26257354 : Sk. režim
                                                model: "model.IxsSkr=value.ixs_skr",
                                                disabled: true
                                            });
                                    } else {
                                        profilForm
                                            .addRow({ label: "jres:31937162", hint: "jres:31937162" }) //RC 31937162 : Skartační znak, lhůta
                                            .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sslcskz(), { //"w-2"
                                                name: "SkartZnak",
                                                placeholder: 'jres:31937146', //RC 31937146 : Sk. znak
                                                model: "model.SkartZnak=value.skar_znak",
                                                disabled: true
                                            })
                                            // .addRow("jres:32000028") //RC 32000028 : Skartační lhůta //"w-2"
                                            .addField("gnumberbox", "w-6", {
                                                name: "SkartLhuta",
                                                placeholder: 'jres:31937147', //RC 31937147 : Sk. lhůta
                                                disabled: true,
                                                emptyValue: null
                                            });
                                    }

                                    profilForm
                                        .addRow({ label: "jres:32000031", hint: "jres:32000031" }) //RC 32000031 : Rok spouštěcí události
                                        .addField("gnumberbox", {
                                            name: "RokSpUdal",
                                            disabled: true,
                                            emptyValue: null
                                        })
                                        .addRow({
                                            label: "jres:31937535", //RC 31937535 : Rok kontroly spouštěcí události
                                            hint: "jres:31937534" //RC 31937534 : Rok kontroly spouštěcí události
                                        }) //RC 32000031 : Rok spouštěcí události
                                        .addField("gnumberbox", {
                                            name: "RokKonSpu",
                                            disabled: true,
                                            emptyValue: null
                                        });

                                    if(componentDto.IsSkartaceMet2023) {
                                        profilForm
                                            .addRow({
                                                label: "jres:31937082",//RC 31937082 : Popis spoušť. u.
                                                hint: "jres:31937403" //RC 31937403 : Popis spouštěcí události.
                                            })
                                            .addField("gstringbox", {
                                                name: "PopisSpousteciUdalosti",
                                                disabled: true
                                            });
                                    }

                                    if(componentDto.gin_n23_vecsk == 0) {
                                        profilForm
                                            .addRow({ label: "jres:32000030", hint: "jres:32000030" }) //RC 32000030 : Popis spouštěcí události
                                            .addField("gstringbox", {
                                                name: "PopisSpousteciUdalosti",
                                                disabled: true
                                            });
                                    }

                                    if (componentDto.IxpTssVisible) {
                                        profilForm
                                            .addRow({ label: "jres:31937571"})  //RC 31937571 : PID TSS
                                            .addField("gstringbox", {
                                                name: "IxpTss",
                                                disabled: true
                                            });
                                    }



                                    profilForm
                                        .addRow({ label: "jres:31937402", hint: "jres:31937402" }) //RC 31937402 : Pozastavení skartační operace do roku

                                        .addField("gcheck", "w-4", {
                                            name: "PrizPozSkar",
                                            disabled: true,
                                            modelValueTransform: {
                                                apply: function (modelValue) { return modelValue === 1; },
                                                collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                                            }
                                        })
                                        .addField("gnumberbox", "w-8", {
                                            name: "RokDoPozSkar",
                                            disabled: true,
                                        })

                                        .addRow({ label: "jres:31937122", hint: "jres:31937122" }) //RC 31937122 : Důvod pozastavení skartační operace
                                        .addField("gstringbox", {
                                            name: "DuvodPozSkar",
                                            disabled: true
                                        })
                                        .addRow({ label: "jres:26257362", hint: "jres:26257363" })  //RC 26257363 : Rok skartačního řízení / Rok vyřazení
                                        .addField("gnumberbox", { // "w-4",
                                            name: "SkartRizeni",
                                            disabled: true,
                                            emptyValue: null,
                                            customClass: " bold",
                                        });

                                    if (componentDto.PrizKonfliktSka) {
                                        profilForm
                                            .addRow()
                                            .addText("jres:31937546", //RC 31937546 : Nevypořádaný konflikt skartační události
                                                " g-state-text" // g-state-important
                                            );
                                    }

                                        /*
                                        .addText(componentDto.SkartaceArchivaceLabel, "w-4 right") 
                                        .addField("gdatebox", "w-4", {
                                            name: "DatSkartace",
                                            valueType: "datetime",
                                            disabled: true
                                        })
                                        */

                                        ;

                                }
                              
                                $.newDiv()
                                    .appendTo(tab)
                                    .gform("createFrom", profilForm);
                                //#endregion

                            
                            }
                        }
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt
                        
                        actSplnitDilciTermin: {
                            caption: null,
                            icon: "gi-tick g-state-text " + (componentDto.StavTermin === 10 ? "g-state-success " : "g-state-info"),
                            tooltip: (componentDto.StavTermin === 10 ? "Splněn" : "jres:26256503")
                                + ((componentDto.EditMode === true) ? " (jres:31937279)" : ""), //RC 31937279 : akci nelze provést při otevřené editaci dokumentu
                            //customclass: "g-state-text " + (componentDto.StavTermin === 10 ? "g-state-success " : "g-state-info") ,
                            enabled:  componentDto.SplnitTerminEnabled,
                            visible: componentDto.SplnitTerminVisible,
                            run: function () {
                                
                                $.content(this).splnitDilciTermin();
                            }
                        },
                        actAddDilciTermin: {
                            caption: "jres:26255478", //RC 26255478 : Termín
                            enabled: componentDto.AddTerminEnabled,
                            tooltip: "jres:26255478" //RC 26255478 : Termín
                                + ((componentDto.EditMode === true) ? " (jres:31937280)" : ""), //RC 31937280 : akci nelze provést při otevřené editaci dokumentu
                            run: function (event, actionContext) {
                                
                                $.content(this).addDilciTermin();
                            }
                        },

                           // ##################### !!!!!!! Vyřízení !!!!!!!!!!!!!!!! #####################

                        actShowInicDokument: {
                            tooltip: "jres:31937078",  //RC 31937078 : Zobrazit iniciační dok.
                            enabled: componentDto.InicDokEnable,
                            visible: componentDto.InicDokEnable,
                            run: function () {
                                $.content(this).showInicVyrizDokument(0);
                            }
                        },
                        actShowVyrizDokument: {
                            tooltip: "jres:31937079", //RC 31937079 : Zobrazit vyřizujíci dok.
                            enabled: componentDto.VyrizDokEnable, 
                            visible: componentDto.VyrizDokEnable,
                            run: function () {
                                $.content(this).showInicVyrizDokument(1);
                            }
                        },
                        /*,
                   
                        actRemoveVyrizDok: {
                            caption: "jres:26255269", //RC 26255269 : Odebrat vyřiz.
                            run: function () {
                                $.content(this).removeVyrizDok();
                            }
                        },
                        actVyriditDok: {
                            caption: "jres:26255323", //RC 26255323 : Vyřídit ČJ
                            run: function () {
                                var content = $.content(this);
                                if (componentDto.LzeVyriditDokumentSOhledemNaEpkDotaz) {
                                    this.dialogs.confirm("jres:31937143").on("closed", function (ev, retVal) { //RC 31937143 : Existuje nevyřízená žádost v EPK, přejete si pokračovat?
                                        if (retVal) {
                                            if (retVal === "yes") {
                                                content.vyridit("Vyridit");
                                            }
                                        }
                                    });
                                } else {
                                    content.vyridit("Vyridit");
                                }
                            }
                        },
                         */
                        actSSLPodrobnostiDokumentu: {
                            caption: "jres:26256222", //RC 26256222 : Podrobnosti
                            visible: false,
                            run: function () {
                                $.content(this).sslPodrobnostiDokumentu();
                            }
                        }
                       
                    },
                    menuBar: [
                        { action: "actSSLPodrobnostiDokumentu" }
                    //    {
                    //        id: "menuWflPraceSCJ", parent: "menuWflCinnosti", before: "menuWflCinnostiOdeslani", type: "static", caption: "jres:31937174", //RC 31937174 : Práce s ČJ
                    //        children: [
                    //            { action: "actAddVyrizDok" },
                    //            { action: "actRemoveVyrizDok" },
                    //            { action: "actVyriditDok"},
                    //            { action: "actSSLPodrobnostiDokumentu"}
                    //        ]
                    //    }
                    ]
                 
                    
                };

                return result;
            }

        //#region zmeny Dsebesta
        // ixsTyp přsunut do hlavičky
        // StUtajIdWfl přesunut do hlavičky
        //#endregion
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);
(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslProfilSpis: {

            create: function (content, componentDto) {

                //#region asdasd
                var getTabGroupsProProfil = function () {
                    var ret = Gordic.Prefabs.TabGroups.Spis();

                    if (componentDto.IsTypovySpis) {
                        ret.caption = "jres:31937183"; //RC 31937183 : Typový spis
                    } else if (componentDto.IsSoucast) {
                        ret.caption = "jres:31937184"; //RC 31937184 : Součást
                    } else if (componentDto.IsDil) {
                        ret.caption = "jres:31937185"; //RC 31937185 : Díl
                    }
                    return ret;
                };

                //#endregion

                var result = {
                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableProfilActions();
                        }
                    ],
                    onbuild: [
                        function () {
                            this.isSimpleModeProfil();
                            this.nasetujProfil(this.SslProfilSpis_Dto);
                            this.enableProfil(); // enable profilu
                        
                            //Z vyrizenis 
                            //this.enableSslDetailVyrizeniSpis();
                            this.nasetujVyrizeniSpis(this.SslProfilSpis_Dto);
                        }
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        saveSslProfilSpis: function () {
                            var that = this;
                            var promis = $.Deferred();
                            
                            var profilModel = {
                                IsSslProfil: true
                            };
                            var profilForm = this.findForms("formWflSpis");
                            profilForm.findFields().gfield("model", "collect", profilModel);

                            var ulozenoListuField = this.findFields("UlozenoListu");
                            if (profilForm.gform("hasChanged") || (Gordic.Utils.WidgetExists("gfield", ulozenoListuField) && ulozenoListuField.gfield('hasChanged'))) { //
                                profilModel.MetadataChanged = true;
                            }

                            var odesilatel = this.findFields("Odesilatel");
                            if (odesilatel.length > 0) {
                                var valueOdesilatel = odesilatel.gfield("getValue");
                                if (valueOdesilatel) {
                                    profilModel.IxsEsu_zast_txt = valueOdesilatel.zast_txt;
                                }
                            }

                            var schvalovatel = this.findFields("IxsFunSchval").gfield("getValue");
                            if (schvalovatel) {
                                profilModel.IxsFunSchvalIxsSU = schvalovatel.ixs_su;
                            }

                            if (Gordic.Utils.WidgetExists("gfield", ulozenoListuField)) {
                                var ulozenoListu = ulozenoListuField.gfield("getValue");
                                if (ulozenoListu != null) {
                                    profilModel.UlozenoListu = ulozenoListu;
                                }
                            }

                            //if (profilModel.StUtajIdWfl === 40 && profilModel.StUtajIdWfl != componentDto.StUtajIdWfl) {
                            //    that.dialogs.confirm("Řízený přístup", "jres:26256449").on("closed", function (ev, retValConfirm) {
                            //        //RC 26256449 : Přejete si nastavit řízený přístup i u vložených dokumentů?
                            //        if (retValConfirm === "yes") {
                            //            profilModel.NastavitRPVlozDokHidden = "1";
                            //            that.saveSslProfilSpis_step2(promis,profilModel);
                            //        }
                            //    });
                            //} else {
                                that.saveSslProfilSpis_step2(promis, profilModel);
                            //}

                            //this.findFields("Keywords").gkeywordsbar("save"); // uložení klírovích slov PŘESUNUTO do spis.js

                            return promis;
                        },
                        saveSslProfilSpis_step2: function (promis, profilModel) {

                            //var retVal = {};
                            //this.findForms("formWflSpis").findFields("DatVyrizDo").gfield("model", "collect", retVal);
                            var ZmTerVyrRealized = this.zmenaTerVyrizeni(this.findForms("formWflSpis").findFields("DatVyrizDo"), componentDto.DatVyrizDo, componentDto.LhutaTypDok);
                            if (ZmTerVyrRealized && componentDto.ssl_zmeterspidu === 1) {
                                var that = this;

                                var options = {
                                    winTitle: "jres:26255153"
                                };
                                var $div = Gordic.Ssl.Dialogs.AddDuvodDlg(that, options, Gordic.Global.Enums.ModOtevreni.showModalWindow); //RC 26255153 : Důvod změny termínu

                                

                                $div.on("closed", function (ev, retValDuvod) {
                                    if (retValDuvod) {
                                        profilModel.MetadataChanged = true;
                                        that.DuvodZmenyTerminuHidden = retValDuvod.duvod;

                                        profilModel.DuvodZmenyTerminuHidden = retValDuvod.duvod;

                                        promis.resolve(profilModel);
                                    } else {
                                        promis.reject();
                                    }
                                });
                            } else {
                                promis.resolve(profilModel);
                            }

                        },
                        nasetujProfil: function (dto) {
                            
                            var form = this.findForms("formWflSpis");
                            
                            var fields = form.findFields();

                            fields.gfield("model", "apply", dto);
                            fields.gfield("model", "validators", dto.Validators);
                            this.zkusNasetovatOdesilatele(dto);

                            Utils.Form.markRequired(fields);

                            form.gform("waitForValues").done(function () {
                                if (Gordic.Utils.WidgetExists("gfield", fields)) {
                                    fields.gfield("confirm");
                                }
                            });
                            this.nastavPosledniUzivatelskouPoznamu();
                        },

                        zmenaPoznamkyVUzivatelskychPoznamkach: function (param, data) { //param: "create" | "update" | "delete" | "changeColor", data: IGNoteDto | null
                            this.nastavPosledniUzivatelskouPoznamu();
                        },
                        nastavPosledniUzivatelskouPoznamu: function () {
                            var that = this;
                            if (this.globalSettings.get("Global.Ssl.AppSettings.DetailSettings.ZobrazUzivPozn")) {
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
                            this.enableProfilBase();
                            if (this.ReadOnlyEko) {
                                this.enableReadOnlyEkoProfil();
                            }
                            if (this.ReadOnlySSL) {
                                this.enableReadOnlySslProfil();
                            }
                            if (componentDto.IsTypovySpis || componentDto.IsSoucast || componentDto.IsDil) {
                                this.enableTypSoucastDil();
                            }
                            
                        },
                        enableProfilActions: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }
                            this.actions.actSSLPodrobnostiSpisu.update({ enabled: l_bActionEnabled });

                            if (this.SimpleMode) {
                                this.actions.actSSLPodrobnostiSpisu.update({ visible: true });
                            }
                        },
                        enableProfilBase: function () {
                           // this.findFields("DatPodano").gfield("option", "disabled", componentDto.BaseEnabledDto.DatPodanoRO);
                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }
                           
                           
                            var disabledKeyWords = !(l_bActionEnabled === false && componentDto.LzeKlicovaSlova);
                            var keyWordsField = this.findFields("Keywords");
                            keyWordsField.gfield("option", "disabled", disabledKeyWords); // natvrdo KeyWord   měl jsem Keywords
                            if (disabledKeyWords) {
                                Gordic.Ssl.WebClient.GDetailUtils.UpravKeywordsProOtevreniDialogu(this, keyWordsField, componentDto.LzeKlicovaSlova);
                            }
                            
                            var stavNeuzavreno = (componentDto.StavPis == 0 || componentDto.StavPis == 10);
                            var readOnlySslProfil = !stavNeuzavreno;
                            ; if (componentDto.EditMode && componentDto.LzeEditacniRezimPovolit) {

                                /*if (componentDto.JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno) {
                                    this.findFields("VecPodrobne").gfield("option", "disabled", false);
                                }*/

                                this.findFields("VecPodrobne").gfield("option", "disabled", !componentDto.LzeEditovatVecPodrobne);
                                this.findFields("Poznamka").gfield("option", "disabled", false);
                                this.findFields("SpisZnak").gfield("option", "disabled", false);
                                this.findFields("SpisPl").gfield("option", "disabled", false);
                                this.findFields("VecnaSkupina").gfield("option", "disabled", false);
                                this.findFields("Umisteni").gfield("option", "disabled", !componentDto.LzeEditovatUmisteni);

                                if (componentDto.LzeEditovatTerminSpisuJenKontrolaParam) {
                                    this.findFields("DatVyrizDo").gfield("option", "disabled", readOnlySslProfil);
                                }

                                this.findFields("IxsFunSchval").gfield("option", "disabled", readOnlySslProfil);
                                this.findFields("IxsFunResitel").gfield("option", "disabled", readOnlySslProfil);

                                //this.findFields("Keywords").gfield("option", "disabled", false);

                                //this.findFields("IxsFunResitel").gfield("option", "disabled", false);

                                //if (componentDto.LzeEditovatTypSpisu) {
                                
                                //    this.findFields("IxsTyp").gfield("option", "disabled", false);
                                //}
                                    
                                //var aPristup = this.findFields("IxsTyp"); // přístup
                                //if (aPristup) {

                                //    for (i = 0; i < PristupDropDownList.options.length; i++) {
                                //        if (PristupDropDownList.options[i].value == aPristup) {
                                //            PristupDropDownList.options[i].selected = true;
                                //        }
                                //    }
                                //}
                              

                                //if (componentDto.LzeEditovatPristup) {
                                //    this.findFields("StUtajIdWfl").gfield("option", "disabled", false);
                                //}
                                //if (!m_oTypPis.ReadOnly) {
                                //    m_oTypPis.OnChangeClientFunction = "function() { $.content(this).NastavPristup(); }";
                                //}

                                this.findFields("UlozenoListu").gfield("option", "disabled", !componentDto.LzeEditovatUlozenoListu);
                            }
                        },
                        enableReadOnlyEkoProfil: function () {
                          
                            //tbEsu.ReadOnly = readOnlyEkoProfil;
                            this.findFields("Odesilatel,MistoVzniku").gfield("option", "disabled", true);
                            //tbTypDok.ReadOnly = readOnlyEkoProfil;
                            this.findFields("IxsTyp").gfield("option", "disabled", true);
                            //cbPristup.ReadOnly = readOnlySslProfil || irpBezMoznostiPrepnuti || readOnlyEkoProfil || !DocInfo.LzeEditovatPristup;
                            //this.findFields("StUtajIdWfl").gfield("option", "disabled", true); // dsebesta 24.06.2021 odstraněno přesunuto do componenty hlavicky

                        },
                        enableReadOnlySslProfil: function () {
       
                            //tbVecPodrobne.ReadOnly = readOnlySslProfil;
                            this.findFields("VecPodrobne").gfield("option", "disabled", true);
                            //tbPoznamka.ReadOnly = readOnlySslProfil;// = readOnlyEkoProfil || DocInfo.SSl == 0;
                            this.findFields("Poznamka").gfield("option", "disabled", true);
                            //bPristup.ReadOnly = readOnlySslProfil || irpBezMoznostiPrepnuti || readOnlyEkoProfil || !DocInfo.LzeEditovatPristup;
                            //this.findFields("StUtajIdWfl").gfield("option", "disabled", true); // dsebesta 24.06.2021 odstraněno přesunuto do componenty hlavicky
                            this.findFields("IxsFunResitel").gfield("option", "disabled", true);
                            
                        },    
                        enableTypSoucastDil: function () {

                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }
                            this.findFields("SpisZnak").gfield("option", "disabled", true);
                            //gSpisControl.TbDataSpisZnak.PoleSkartZnak.Visible = false;
                            //gSpisControl.TbDataSpisZnak.Visible = true;    
                            //this.findFields("StUtajIdWfl").gfield("option", "disabled", true); // dsebesta 24.06.2021 odstraněno přesunuto do componenty hlavicky
                            this.findFields("DatVyrizDo").gfield("option", "disabled", true);
                            
                            this.findFields("IxsFunSchval").gformrow().hide();
                          

                            if (componentDto.IsTypovySpis) {
                                this.findFields("Odesilatel").gformrow().hide();
                                this.findFields("MistoVzniku").gformrow().hide();

                               
                                this.findFields("DatVyrizDo").gformrow().hide();
                                this.findFields("IxsFunResitel").gformrow().hide();
                                this.findFields("IxsTyp").gformrow().hide();
                                this.findFields("IxsTyp").gfield("option", "disabled", true);

                                this.findFields("PocetVlozenychDok").gformrow("setLabel", "jres:31937179"); //RC 31937179 : Počet součástí
                            } else if (componentDto.IsSoucast) {

                                this.findFields("DatVyrizDo").gformrow().hide();
                                this.findFields("IxsFunResitel").gformrow().hide();
                                this.findFields("IxsTyp").gformrow().hide();
                                this.findFields("IxsTyp").gfield("option", "disabled", true);

                                this.findFields("PocetVlozenychDok").gformrow("setLabel", "jres:31937198"); //RC 31937198 : Počet dílů
                            } else if (componentDto.IsDil) {
                                ;
                            }

                        },

                        isSimpleModeProfil: function () {
                            if (this.SimpleMode) {
                                this.findFields("Umisteni").gformrow().hide();
                                //this.findFields("StUtajIdWfl").gformrow().hide();
                                this.findFields("PriorovanoKam").gformrow().hide();
                                this.findFields("IxsFunResitel").gformrow().hide(); // Pozor nyni je políčko v hlavičce
                                this.findFields("IxsFunSchval").gformrow().hide(); // Pozor nyni je políčko v hlavičce
                                //schvalovatel myslím že byl vykopanej na žádost Vojty
                                
                                

                                this.findFields("TerminDate").gformrow().hide();
                                //this.findFields("DatVyrDo").gformrow().hide(); // dodělat jen pro SSD ale s Radek říkal nedávat, Tak nedávat
                                
                              
                                this.findFields("DatEvidovano").gformrow().hide();

                                var visible = this.isSetPodrobnostiSSD ? true : false;
                                this.showhideSSDPodrobnosti(visible);

                            }
                        },

                        showhideSSDPodrobnosti: function (visible) {
                            // po domluvě rtomes,aprasil,pjurik se v SSD zobrazuje pole Vlastnik vždy ref T38168

                            if (visible) {
                                this.findFields("SpisZnak").gformrow().show();
                              //  this.findFields("IxsFunAkt").gformrow().show(); 
                                this.findFields("Umisteni").gformrow().show();
                            } else {

                                //if (UserProcess.Configuration.GetParameter("ssd_det_spznak", 1) == 0) { // TODO
                                //    componentDto.SSDSpisZnakVisible = false; // už nachystano
                                //}

                                if (!componentDto.SSDSpisZnakVisible) {
                                  //  this.findFields("SpisZnak").gformrow().hide(); //u spisu není proto koment
                                }

                             //   if (!componentDto.SSDVlastnikVisible) {
                             //       this.findFields("IxsFunAkt").gformrow().hide(); //vlastnik
                             //   }//end if
                            }
                        },

                       



                        //#region Z vyrizeni

                        nasetujVyrizeniSpis: function (dto) {
                            var form = this.findForms("formSslVyrizeniSpis"); 
                            var fields = form.findFields();
                            fields.gfield("model", "apply", dto);
                            fields.gfield("model", "validators", dto.Validators);
                            if (fields.length > 0) { 
                                Utils.Form.markRequired(fields);
                            }
                        },

                        sslVyriditSpis_VyriditSpis: function () {
                            this.sslSpisVyridit();      // ssldetailspisucomponent -> sslDetailComponent
                        },

                        sslVyriditSpis_Ulozit: function () {
                            this.SSLUlozitSpis();           // ssldetailspisucomponent
                        },

                        sslVyriditSpis_NabytPravniMoc: function () {
                            this.nabytPravniMoc();               // ssldetailspisucomponent
                        },
                        sslVyriditSpis_ZmenaLhuty: function () {
                            this.zmenaLhuty();              // ssldetailspisucomponent
                        },

                        sslPodrobnostiSpisu: function () {
                            var that = this;
                            var options = {
                                Ixp: componentDto.ixp,
                            };
                            var $div = Gordic.Ssl.Dialogs.PodrobnostiSpisuDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow);

                            $div.on("closed", function (ev, retVal) {
                                if (retVal) {
                                    that.tryReloadDetail(undefined, {
                                        flashMessage: "jres:31937172", //RC 31937172 : V podrobnostech spisu došlo ke změně.
                                        flashMessageClass: "g-state-success",
                                    });
                                }
                            });

                        },
                        otevriDetailBaliku: function (IxsZup) {
                            
                            var opt = {
                                IxsZup: IxsZup
                            };
                            Gordic.Spi.Dialogs.GDetailBalikuDlg(this, opt, Gordic.Global.Enums.ModOtevreni.navigate);
                        },
                        kontrolaESUVRegistrech: function () {
                            var that = this;
                            var usSetting = this.globalSettings.get("Global.Ssl.AppSettings.DetailSettings.OveritOdesilateleVSZR")
                            if (usSetting == undefined) { usSetting = true; }
                            var gin_esu_n23ao = $.content("main").wflDBParams.gin_esu_n23ao;
                            if (gin_esu_n23ao > 0
                                && componentDto.SPrij === 1
                                && (gin_esu_n23ao == 1 || (gin_esu_n23ao == 2 && usSetting))
                                && this.EditMode
                            ) {
                                var dtoOdesilatel = {};
                                var fieldSubjekt = this.findFields("Odesilatel");

                                fieldSubjekt.gfield("model", "collect", dtoOdesilatel);
                                if (dtoOdesilatel.IxsEsu != null
                                    && dtoOdesilatel.IxsEsu != this.IxsEsuOdesilatelePoKontrole
                                ) {
                                    this.beginOperation("jres:31937530") //RC 31937530 : Probíhá ověření ESU v egistrech
                                    var fieldSubjektValue = fieldSubjekt.gfield("getValue");

                                    var opt = {
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
                        }
                        
                       /*
                        enableSslDetailVyrizeniSpis: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }
                            this.actions.actSSLVyriditSpisVyridit.update({
                                enabled:
                                    l_bActionEnabled
                                    && componentDto.LzeVyridit
                                    && (componentDto.LzeVyriditDokumentSOhledemNaEpk || componentDto.LzeVyriditDokumentSOhledemNaEpkDotaz)
                            });
                            this.actions.actSSLVyriditSpisUlozit.update({ enabled: l_bActionEnabled && componentDto.LzeZmenitUlozeni });
                            this.actions.actSSLVyriditSpisPravMoc.update({ enabled: l_bActionEnabled && componentDto.LzeNabytPravniMoc });
                            this.actions.actSSLVyriditSpisZmenaLhuty.update({ enabled: l_bActionEnabled && componentDto.ZmenaLhutyEnabled });
                            
                            
                        }
                        */
                        //#endregion
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt
                        /*
                        actSSLVyriditSpisVyridit: {
                            caption: "jres:26255275",  //RC 26255275 : Vyřídit/uzavřít
                            run: function () {

                                var content = $.content(this);
                                if (componentDto.LzeVyriditDokumentSOhledemNaEpkDotaz) {
                                    this.dialogs.confirm("jres:31937143").on("closed", function (ev, retVal) { //RC 31937143 : Existuje nevyřízená žádost v EPK, přejete si pokračovat?
                                        if (retVal) {
                                            if (retVal === "yes") {
                                                content.sslVyriditSpis_VyriditSpis();
                                            }
                                        }
                                    });
                                } else {
                                    content.sslVyriditSpis_VyriditSpis();
                                }
                            }
                        },
                        actSSLVyriditSpisUlozit: {
                            caption: "jres:26255270", //RC 26255270 : Uložit
                            run: function () {
                                $.content(this).sslVyriditSpis_Ulozit();
                            }
                        },
                        actSSLVyriditSpisPravMoc: {
                            caption: "jres:26255276", //RC 26255276 : Právní moc
                            run: function () {
                                $.content(this).sslVyriditSpis_NabytPravniMoc();
                            }
                        },
                        actSSLVyriditSpisZmenaLhuty: {
                            caption: "jres:26255277", //RC 26255277 : Změna lhůty
                            run: function () {
                                $.content(this).sslVyriditSpis_ZmenaLhuty();
                            }
                        },
                        */
                        actSSLPodrobnostiSpisu: {
                            caption: "jres:26256222", //RC 26256222 : Podrobnosti
                            visible: false,
                            run: function () {
                                $.content(this).sslPodrobnostiSpisu();
                            }
                        }
                        
                    },

                    tabs: {
                        SslProfil: {
                            tabParams: {
                                title: componentDto.Title,
                                opened: true,  //1. tab je pro agednovou hlavičku, ta je pro dokumenty, spisy, zakázky atp. vždy L2M2S1. BO detaily mimo wfl (tzn. dokumenty, spisy) jsou v L1M1S1 //RC 26255308 : Dokument
                                group: getTabGroupsProProfil(),//Gordic.Prefabs.TabGroups.Spis(),
                                headerClass: "hidden",
                                //menuBar: content.isSSLVyrizeni ? [
                                //    { action: "actSSLVyriditSpisVyridit", favorite: true },
                                //    { action: "actSSLVyriditSpisUlozit", favorite: true },
                                //    { action: "actSSLVyriditSpisPravMoc", favorite: true },
                                //    //,{ action: "actSSLVyriditSpisZmenaLhuty", favorite: true }
                                //    { action: "actSSLPodrobnostiSpisu", favorite: true }

                                    
                                //] : undefined,
                            },
                            init: function (tab) {
                                //#region definice tab dokumentu
                                var that = $.content(tab);
                                var profilForm = new Gordic.Forms
                                    .Form({
                                        name: "formWflSpis",
                                        layoutDescriptor: "L2M2S1, L-3-9-0, M-3-9-0, S-12-12-0"
                                    })
                                    .addSection({label:"jres:26255257", layoutDescriptor: "L-2-10-0, M-3-9-0, S-12-12-0", customClass: "w-L-7 w-M-7 w-S-12" }); //RC 26255257 : Spis
                                if (componentDto.SPrij === 1) {
                                    profilForm
                                        .addRow("jres:26255430") //RC 26255430 : Odesílatel
                                        .addField("gselectbox", Gordic.Esu.Prefabs.vyberEsu({
                                            typ: 2,
                                            Logovani: that.Logovani
                                        })
                                        , {
                                            name: "Odesilatel",
                                            model: "model.IxsEsu=value.ixs_esu;model.LicZast=value.lic;model.PorZast=value.por_zast",
                                            change: function (ev, changeObj) {
                                                if (changeObj && changeObj.value && !(changeObj.flags && changeObj.flags.uvodniNastaveni)) {
                                                    that.kontrolaESUVRegistrech();
                                                }
                                            },
                                            disabled: true,
                                        });
                                } else {
                                    profilForm
                                        .addRow("jres:26255430") //RC 26255430 : Odesílatel)
                                        .addField("gstringbox", { name: "MistoVzniku", model: "model.MistoVzniku=value", disabled: true, });
                                }

                                profilForm
                                    .addRow("jres:26255458") //RC 26255458 : Věc podrobně
                                    .addField("gstringbox", Gordic.Prefabs.Field.charCounter(componentDto.VecPodrobneMaxLength), {
                                        name: "VecPodrobne",
                                        model: "model.ObsahText=value",
                                        rows: 4,
                                        disabled: true,
                                        validators: [
                                            new Gordic.Validators.Length({ max: componentDto.VecPodrobneMaxLength, message: "jres:31937028" }), //RC 31937028 : Hodnota v poli je moc dlouhá
                                            spznRequired ? [new Gordic.Validators.Required()] : undefined
                                        ],
                                    })

                                var spznRequired = componentDto.ssl_povin_spzs === 1;

                                if(componentDto.gin_n23_vecsk == 1) {
                                    var prefabGinsvskOptions = Gordic.Prefabs.Select.ginsvsk();
                                    prefabGinsvskOptions.validators.push(new Gordic.Validators.Required());

                                    profilForm
                                        .addRow("jres:26257232") //RC 26257232 : Věcná skupina
                                        .addField("gselectbox", prefabGinsvskOptions, {
                                            name: "VecnaSkupina",
                                            model: "model.IxsVsk=value.ixs_vsk",
                                            graphicInput: "oninput",
                                            itemTemplate: Gordic.Wfl.GWflCommonDlg.ginsvskItemTemplate({ casObdobiVisible: false }),
                                            itemTooltipTemplate: Gordic.Wfl.GWflCommonDlg.ginsvskItemTooltipTemplate({ casObdobiVisible: false }),
                                          //  validators: [new Gordic.Validators.Required()],
                                            serverFilters: {
                                                JenKoncove: true, 
                                                urceni_spis_z: [2, 3]
                                            },
                                            disabled: true
                                        })
                                } else {
                                    var prefabSslsspzOptions = Gordic.Prefabs.Select.sslsspz();

                                    if(spznRequired) {
                                        prefabSslsspzOptions.validators.push(new Gordic.Validators.Required());
                                    } 

                                    profilForm
                                        .addRow("jres:26255820") //RC 26255820 : Spisový znak
                                        .addField("gselectbox", "w-3", Gordic.Prefabs.Select.sslsspl(), {
                                            name: "SpisPl",
                                            model: "model.SpisPl=value.spis_pl",
                                            disabled: true

                                        })
                                        .addField("gselectbox", "w-9", prefabSslsspzOptions, {
                                            name: "SpisZnak",
                                            graphicInput: "oninput",
                                            itemTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTemplate({ poznamkaVisible: true }),
                                            itemTooltipTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTooltipTemplate({ poznamkaVisible: true }),
                                            model: "model.SpisPl=>value.spis_pl;model.SpisZnak=value.spis_znak",
                                            serverFilters: {
                                                spis_pl: new Gordic.Forms.Dependency("SpisPl", "spis_pl")
                                            },
                                            disabled: true
                                        })


                                    /*
                                    .addRow("jres:26255820") //RC 26255820 : Spisový znak
                                    .addField("gselectbox", "w-3", Gordic.Prefabs.Select.sslsspl(), {
                                        name: "SpisPl",
                                        disabled: true,
                                        model: "model.SpisPl=value.spis_pl",
                                        
                                    })
                                    .addField("gselectbox", "w-9", Gordic.Prefabs.Select.sslsspz(), {
                                        name: "SpisZnak",
                                        disabled: true,
                                        graphicInput: "oninput",
                                        itemTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTemplate(),
                                        itemTooltipTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTooltipTemplate(),
                                        model: function (operation, dto, modelOptions) {
                                            switch (operation) {
                                                case "apply": $(this).gfield("setValue", { spis_pl: dto.SpisPl, spis_znak: dto.SpisZnak, }, { valid: false }); return;
                                                case "collect": dto.SpisZnak = ($(this).gfield("getValue") ? $(this).gfield("getValue").spis_znak : null); return;
                                                default: return "SpisZnak ";
                                            }
                                        },
                                        //model:"model.SpisPl=value.spis_pl;model.SpisZnak=value.spis_znak",
                                        serverFilters: {
                                            //  aktivita: [100],
                                            spis_pl: new Gordic.Forms.Dependency("SpisPl", "spis_pl")
                                        }
                                    })
                                    */
                                }

                                profilForm
                                    .addRow("jres:26256081") //RC 26256081 : Počet dokumentů
                                    .addField("gnumberbox", {
                                        name: "PocetVlozenychDok",
                                        disabled: true
                                    })

                                    .addRow("jres:26255511") //RC 26255511 : Dat.vyř.do.
                                    .addField("gdatebox", "w-5",
                                        {
                                            name: "DatVyrizDo",
                                            disabled: true,
                                            minValue: Gordic.Ssl.Utils.MinimalDate
                                        })

                                    .addText(componentDto.DatVyrizLabel, "w-2 right")
                                    .addField("gdatebox", "w-5",
                                        {
                                            name: "DatVyriz",
                                            disabled: true,
                                            minValue: Gordic.Ssl.Utils.MinimalDate
                                        })

                                    .addRow("jres:32170288") //RC 32170288 : Datum založení
                                    .addField("gdatebox", {
                                        name: "DatZal",
                                        disabled: true,
                                        minValue: Gordic.Ssl.Utils.MinimalDate
                                    })

                                    .addSection({ label: "jres:31937118", layoutDescriptor: "L-3-9-0, M-3-9-0, S-12-12-0", customClass: "w-L-5 w-M-5 w-S-12" }); //RC 31937118 : Další údaje

                                profilForm
                                    .addRow({ label: "jres:26255342" })
                                    .addField("gkeywordsbar", {
                                        ixp: componentDto.ixp,
                                        name: "Keywords",
                                        parentGcontent: that,
                                        disabled: true,
                                        saveData: "save",
                                        tooltip: "jres:26255342" //RC 26255342 : Klíčová slova
                                    })

                                    .addRow("jres:26255397") //RC 26255397 : Poznámka
                                    .addField("gstringbox", Gordic.Prefabs.Field.charCounter(
                                            componentDto.Validators && componentDto.Validators.Poznamka && componentDto.Validators.Poznamka[0] && componentDto.Validators.Poznamka[0].max
                                                ? componentDto.Validators.Poznamka[0].max
                                                : undefined
                                        ),
                                        {
                                            name: "Poznamka",
                                            disabled: true
                                        });
                                if (that.globalSettings.get("Global.Ssl.AppSettings.DetailSettings.ZobrazUzivPozn")) {
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




                                profilForm
                                    .addRow("jres:26255826") //RC 26255826 : Schvalovatel
                                    .addField("gselectbox",
                                        Gordic.Gin.Fields.ginsfunSSU(
                                            {
                                                name: "IxsFunSchval",
                                                model: "model.IxsFunSchval = value.ixs_fun",
                                                disabled: true,
                                                serverFilters: {
                                                    aktivita: [100],
                                                },
                                            }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)
                                );




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
                      
                                if (componentDto.PriorovanoKamVisible) {
                                    profilForm
                                        .addRow("jres:31937100") //RC 31937100 : Přesunuto kam
                                        .addField("gstringbox",
                                            {
                                                name: "PriorovanoKam",
                                                disabled: true,
                                                buttons: [
                                                    {
                                                        icon: 'gi-detail', requireValue: true, requireEdit: false, action: new GAction({
                                                            name: 'actOtevriDetail',
                                                            run: function (ev, ctx) {
                                                                var field = $(ctx.field);
                                                                var val = $(ctx.field).gfield("getValue");
                                                                that.otevriNovyDetail({ DetailDto: { ixp: val } });
                                                            }
                                                        })
                                                    }
                                                ]
                                            })
                                        ;
                                }
                              
                                profilForm
                                    .addRow("jres:26255482") //RC 26255482 : Umístění
                                    .addField("gselectbox", Gordic.Prefabs.Select.sslsumi(),
                                        {
                                            name: "Umisteni",
                                            disabled: true,
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
                                            }
                                        });


                                profilForm
                                    .addRow("jres:26255513") //RC 26255513 : Stav
                                    .addField("gstringbox",
                                        {
                                            name: "StavSpisu",
                                            disabled: true,
                                        });

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
                                                buttons: componentDto.TlacitkoBalikVisible ? buttons : undefined
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



                                $("<div>").appendTo(tab)
                                    .gform("createFrom", profilForm);




                                // Vyřízení
                                if (componentDto.IsSSLVyrizeni ) {
                                    var vyrizeniForm = new Gordic.Forms
                                        .Form({
                                            name: "formSslVyrizeniSpis",
                                            layoutDescriptor: "L2M2S1, L-3-9-0, M-3-9-0, S-12-12-0"
                                        })
                                        .addSection({label:"jres:26255161", layoutDescriptor: "L-2-10-0, M-3-9-0, S-12-12-0", customClass: "w-L-7 w-M-7 w-S-12" }); //RC 26255161 : Vyřízení

                                    vyrizeniForm
                                        //1
                                        .addRow("jres:26255431") //RC 26255431 : Způsob vyřízení
                                        .addField("gstringbox", {
                                            name: "ZpusobVyrizeni",
                                            disabled: true
                                        })


                                        .addRow("jres:26255660") //RC 26255660 : Datum vyřízení
                                        .addField("gdatebox", {
                                            name: "DatVyr",
                                            disabled: true,
                                            minValue: Gordic.Ssl.Utils.MinimalDate
                                        })

                                        //2

                                        .addRow("jres:26255506") //RC 26255506 : Datum uzavření
                                        .addField("gdatebox", {
                                            name: "DatUzav",
                                            disabled: true,
                                            minValue: Gordic.Ssl.Utils.MinimalDate
                                        })



                                        .addRow("jres:31937083") //RC 31937083 : Svazků příloh
                                        .addField("gnumberbox", {
                                            name: "SvPriloh",
                                            disabled: true,
                                            emptyValue: null

                                        });
                                    if (componentDto.OdeslanoListuVisible) {
                                        vyrizeniForm
                                            .addRow("jres:32000025") //RC 32000025 : Odesláno listů
                                            .addField("gnumberbox", {
                                                name: "OdeslanoListu",
                                                disabled: true,
                                                emptyValue: null

                                            });
                                    }
                                    if (componentDto.UlozenoListuVisible) {
                                        vyrizeniForm
                                            .addRow("jres:26256582") //RC 26256582 : Uloženo listů
                                            .addField("gnumberbox", {
                                                name: "UlozenoListu",
                                                disabled: true,
                                                emptyValue: null
                                            });
                                    }
                                    vyrizeniForm
                                        //sekce 2
                                        
                                        .addRow("jres:26255507") //RC 26255507 : Komentář
                                        .addField("gstringbox", {
                                            name: "Komentar",
                                            rows: 2,
                                            disabled: true
                                        });

                             


                                    vyrizeniForm
                                        .addRow("jres:26256055") //RC 26256055 : Uzavřel
                                        .addField("gselectbox",
                                            Gordic.Gin.Fields.ginsfunSSU(
                                                {
                                                    name: "IxsZmpUzav",
                                                    model: "model.IxsZmpUzav = value.ixs_fun",
                                                    disabled: true,
                                                    serverFilters: {
                                                        aktivita: [100],
                                                    },
                                                }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)
                                        )
                                        .addSection({ label: "jres:31937081", layoutDescriptor: "L-3-9-0, M-3-9-0, S-12-12-0", customClass: "w-L-5 w-M-5 w-S-12" }); //RC 31937081 : Skartace

                                    if(componentDto.gin_n23_vecsk > 0) {
                                        vyrizeniForm
                                            .addRow({ label: "jres:26257353", hint: "jres:26257353" }) //RC 26257353 : Skartační režim
                                            .addField("gselectbox", Gordic.Prefabs.Select.ginsskr(), {
                                                name: "SkartRezim",
                                                placeholder: 'jres:26257354', //RC 26257354 : Sk. režim
                                                model: "model.IxsSkr=value.ixs_skr",
                                                disabled: true
                                            });
                                    } else {
                                        vyrizeniForm
                                            .addRow({ label: "jres:31937162", hint: "jres:31937162" }) //RC 31937162 : Skartační znak, lhůta
                                            .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sslcskz(), {
                                                name: "SkartZnak",
                                                placeholder: 'jres:31937146', //RC 31937146 : Sk. znak
                                                model: "model.SkartZnak=value.skar_znak",
                                                //tooltip: "Nadřazený skartační znak",
                                                disabled: true
                                            })
                                            //.addRow("jres:32000028") //RC 32000028 : Skartační lhůta
                                            .addField("gnumberbox", "w-6", {
                                                name: "SkartLhuta",
                                                disabled: true,
                                                placeholder: 'jres:31937147', //RC 31937147 : Sk. lhůta
                                                // tooltip: "Nadřazená skartační lhůta",
                                                emptyValue: null
                                            });
                                    }

                                    vyrizeniForm
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

                                    if(componentDto.gin_n23_vecsk == 0) {
                                        vyrizeniForm
                                            .addRow({
                                                label: "jres:31937082",//RC 31937082 : Popis spoušť. u.
                                                hint: "jres:31937403" //RC 31937403 : Popis spouštěcí události.
                                            })
                                            .addField("gstringbox", {
                                                name: "PopisSpousteciUdalosti",
                                                disabled: true
                                            });
                                    }

                                    vyrizeniForm
                                        .addRow({ label: "jres:31937404", hint: "jres:31937404" }) //RC 31937404 : Pozastavení skartační operace do roku

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
                                        .addField("gnumberbox", { //"w-4",
                                            name: "SkartRizeni",
                                            disabled: true,
                                            emptyValue: null,
                                            customClass: " bold",
                                        });
                                    if (componentDto.PrizKonfliktSka) {
                                        vyrizeniForm
                                            .addRow()  
                                            .addText("jres:31937546", //RC 31937546 : Nevypořádaný konflikt skartační události
                                                " g-state-text" // g-state-important
                                            );
                                    }
                                        
                                        
                                        //.addText(componentDto.SkartaceArchivaceLabel, "w-4 right")
                                        //.addField("gdatebox", "w-4", {
                                        //    name: "DatSkartace",
                                        //    valueType: "datetime",
                                        //    disabled: true
                                        //})
                                        ;


                                    $("<div>").appendTo(tab)
                                        .gform("createFrom", vyrizeniForm);

                                    //#region definice gridu

                                    var gridKolonky = new Gordic.Data.GridFormat();
                                    gridKolonky
                                        .addTextColumn({
                                            name: "s_dor_txt",
                                            caption: "jres:26255409" //RC 26255409 : Stav doručení
                                        })
                                        .addTextColumn({
                                            name: "esu_txt",
                                            caption: "jres:26255410" //RC 26255410 : Externí subjekt
                                        })
                                        .addDateColumn({
                                            name: "dat_odes",
                                            caption: "jres:26255411" //RC 26255411 : Datum odeslání
                                        })
                                        .addTextColumn({
                                            name: "pod_cislo",
                                            caption: "jres:26255412" //RC 26255412 : Podací číslo
                                        })
                                        .addTextColumn({
                                            name: "zpusob_dor_txt",
                                            caption: "jres:26255413" //RC 26255413 : Způsob doručení
                                        })
                                        .addTextColumn({
                                            name: "komb_sluzeb_txt",
                                            caption: "jres:26255974" //RC 26255974 : Služby
                                        })
                                        .addTextColumn({
                                            name: "druh_zas_zach_txt",
                                            caption: "jres:26255415" //RC 26255415 : Druh zacházení se zásilkou
                                        })
                                        .addTextColumn({
                                            name: "id_dorucenky",
                                            caption: "jres:26255416", //RC 26255416 : Id doručenky
                                            width: 110,
                                            fixedWidth: true
                                        })
                                        .addDateColumn({
                                            name: "dat_potvrz",
                                            caption: "jres:26255417" //RC 26255417 : Datum doručování
                                        })

                                        ;


                                    /*
                                    $.content(this).actions.add({
                                        name: "actOtevriDetailEsu",
                                        run: function (ev, ctx) {
                                            console.log(ctx.cellInfo.data);
                                            that.detailEditace();
    
                                        }
                                    });
                                    */
                                    // that.viewVyrizeniSpis = new Gordic.Data.View(componentDto.DataSource, { key: "id_dorucenky" });
                                    that.viewVyrizeniSpis = new Gordic.Data.View(componentDto.DataSource);
                                    that.gridVyrizeniSpis = $("<div>").appendTo(tab)
                                        //.height(900)
                                        .gautofit()
                                        .ggrid({
                                            name: "GridVyrizeniSpis",
                                            data: that.viewVyrizeniSpis,
                                            renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                                            columnMode: "fit",  // fit, full
                                            navigationMode: "row", // row, cell
                                            //defaultAction: $.content(this).actions.actOtevriDetailEsu, //selectAction
                                            //rowsClass: function (dataRow) {
                                            //    if (dataRow && dataRow.data && dataRow.data.trideni === 0) {
                                            //        return "bold";
                                            //    } else return "  ";
                                            //},
                                            //selection: 
                                            //cellActivate: function (ev, row) {

                                            //    that.sslSbernyArchNastavEnableAkceZRadkuGridu(row);

                                            //},

                                            multi: false,

                                            scrollHelperTemplate: "{esu_txt}",  // "{ixs_esu} - {nazev}",
                                            //searchColumns: ["nazev_ext"],

                                            columns: gridKolonky
                                        });
                                }
                            }
                        }
                        
                    },
                    menuBar: [
                        { action: "actSSLPodrobnostiSpisu" }
                        //{
                            //id: "menuWflPraceSCJ", parent: "menuWflCinnosti", before: "actWflCinnostiOdeslani"/*menuWflCinnostiOdeslani*/, type: "static", caption: "jres:31937174", //RC 31937174 : Práce s ČJ
                            //children: [
                            //    { action: "actSSLVyriditSpisVyridit" },
                            //    { action: "actSSLVyriditSpisUlozit" },
                            //    { action: "actSSLVyriditSpisPravMoc" },
                            //    { action: "actSSLPodrobnostiSpisu" }
                            //]
                        //}
                    ]
               
                   
                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);
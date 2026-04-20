(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslDetailDokumentu: {

            create: function (content, componentDto) {

                var pocetKopiistatusBarBadge = new GObservableObject({
                    value: "?",
                    tooltip: "jres:31937475" //RC 31937475 : Počet kopií dokumentu.
                });
                var result = {
                    flagEvidovat: false,

                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableSslDetailDokumentu();

                            var isTypovaEntita = componentDto.TypSpis > 1;

                            if(isTypovaEntita) {
                                this.enableSslDetailTypoveEntity();
                            }
                        }
                    ],
                    onBuild: [
                        function () {
                            this.nactiPocetKopiiStatusbar();
                        },
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        MakeSpisConfirmStatus: {
                            None: 0,
                            Confirm: 1,
                            Confirmed: 2,
                            ConfirmedAndPrepared: 3
                        },

                        //VyrizujiciDokErrText: "jres:26255205",  //RC 26255205 : V editačním módu nelze vytvářet vyřizující dokument.
                        OpravduVytvoritNovySpisRequest: "jres:26255234", //RC 26255234 : Opravdu chcete vytvořit nový spis?
                        NovySpisRequest: "jres:26255233", //RC 26255233 : Tento dokument (nebo jeho mateřský) již byl vložen v jiném spisu, chcete opravdu vytvořit nový spis?

                        vyrizujiciDokument: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var options = {
                                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                                TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp
                            };
                            Gordic.Wfl.Dialogs.GenerovaniIxp(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                .done(function (retVal, content) {
                                if (retVal) {
                                    var opt = {
                                        DetailDto: { ixp: retVal.Ixp },
                                        RezimPodani: 1, // Vlastni
                                        InicDok: l_sIxp
                                    };
                                    that.otevriNovyDetail(opt);
                                }
                            });

                        },

                       
                        vytvoritDuplikat: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            if (componentDto.PrizDupli == 1) {
                                var title = l_sIxp + " - " + "jres:Gordic.Ssl.WebClient:26256571"; //RC 26256571 : tvorba nového duplikátu.

                                var options = { Ixp: l_sIxp };
                                Gordic.Ssl.Dialogs.DuplikatNovyDlg(that, options).on("closed", function (ev, retVal) {
                                    if(retVal) {
                                        that.tryReloadDetail();
                                    }
                                });
                            } else {
                                this.dialogs.confirm("jres:26256789", "jres:Gordic.Ssl.WebClient:26256696").on("closed", function (ev, retVal) { //RC 26256789 : Duplikát
                                    if (retVal === "yes") {
                                        Gordic.Ssl.Utils.GetInfoProZalozeniCjSKontrolouTvorbyCjProDokument(undefined,undefined,that).done(function (cjInfo) {
                                            var denikInfo = cjInfo.DenikInfo;
                                            if (denikInfo.Poradi == '') {
                                                denikInfo.Poradi = null; // osetreni pro starsi dialogy, ktere vracely string
                                            }

                                            var opt = {
                                                "Ixp": l_sIxp,
                                                "PridelitCj": cjInfo.PridelitCj,
                                                "CjInfo": denikInfo
                                            };
                                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                            srv.call("VytvoritDuplikat", opt)
                                                .done(function (retVal) {
                                                    if (retVal.StavBool) {
                                                        if (retVal.StavTxt) {
                                                            var opt = {
                                                                DetailDto: { ixp: retVal.StavTxt },
                                                            };
                                                            that.otevriNovyDetail(opt);
                                                        } else {
                                                            that.tryReloadDetail();
                                                        }
                                                    }
                                                }).always(function () { srv.close(); });
                                        });
                                    }
                                });
                            }
                        },

                        sslDetailDokumentu_oznaceniPreevidovani: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            var options = { Ixp: l_sIxp, OznaceniPreevidovaneho: true };

                            Gordic.Ssl.Dialogs.PreevidenceDoSamostatneEvidenceDlg(that, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if (retVal) {
                                    that.tryReloadDetail();
                                }
                            });

                        },

                        //#region vytvorit spis
                        vytvoritSpis: function (VytvoreniSpisuDto) {
                            var that = this;
                            if (VytvoreniSpisuDto == null) VytvoreniSpisuDto = {};
                            var l_sIxp = componentDto.ixp;
                            if(componentDto.ShowMsgBoxMakeSpis) {
                                this.dialogs.confirm("jres:26256038", this.OpravduVytvoritNovySpisRequest).on("closed", function (ev, retVal) { //RC 26256038 : Nový spis
                                    if(retVal === "yes") {
                                        that.vytvoritSpisWS(l_sIxp, "", that.MakeSpisConfirmStatus.None, false, VytvoreniSpisuDto);
                                    }
                                });
                            } else {
                                this.vytvoritSpisWS(l_sIxp, "", this.MakeSpisConfirmStatus.None, false, VytvoreniSpisuDto);
                            }
                        },
                        vytvoritSpisWS: function (IxpDok, SelectedDenik, StatusConfirmVytvoreniSpisu, FlagDirect, VytvoreniSpisuDto) {
                            var that = this;
                            var opt = {
                                "IxpDok": IxpDok,
                                "SelectedDenik": SelectedDenik,
                                "StatusConfirmVytvoreniSpisu": StatusConfirmVytvoreniSpisu,
                                "FlagDirect": FlagDirect,
                                "DtovytvoreniSpisu": VytvoreniSpisuDto
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("VytvoritSpis", opt)
                                .done(function (retVal) {
                                    that.vytvoritSpisOnSucceeded(retVal, VytvoreniSpisuDto);
                                }).always(function () { srv.close(); });

                        },
                        vytvoritSpisOnSucceeded: function (retVal, VytvoreniSpisuDto) {
                            var that = this;
                            var l_bReloadEnabled = true;

                            if (retVal.StavBool) {
                                if (retVal.ErrorMessage) {
                                    that.dialogs.alert(retVal.ErrorMessage); // zobrazim pripadnou vyjimku
                                }
                                if (retVal.Script) { //Script
                                    l_bReloadEnabled = false;
                                    switch (retVal.Script) {
                                        case "makeSpisConfirmInSpisHistory": that.makeSpisConfirmInSpisHistory(VytvoreniSpisuDto); break;
                                        case "vytvoritSpisSelectDenik": that.vytvoritSpisSelectDenik(VytvoreniSpisuDto);  break;
                                        case "vytvoritSpisNespojRadaDirect": that.vytvoritSpisNespojRadaDirect(retVal.StrParam1, retVal.StrParam2, retVal.StrParam3, VytvoreniSpisuDto ); break; // StrParam1 StrParam2 StrParam3 
                                        case "vytvoritSpisInsertInputValues": that.vytvoritSpisInsertInputValues(VytvoreniSpisuDto); break;
                                        case "vlozitVyjmoutParovyDokumentDoSpisu":
                                            that.dialogs.confirm("jres:31937052", retVal.StrParam1).on("closed", function (ev, odpoved) {  //RC 31937052 : Párový dokument
                                                if (odpoved === "yes") {
                                                    that.vlozitVyjmoutParovyDokumentDoSpisu(retVal.StrParam2, retVal.StrParam3, retVal.BoolParam1);
                                                }
                                            });
                                            break; 
                                    }
                                    
                                }
                            } else if (retVal.ErrorMessage) {
                                that.dialogs.alert(retVal.ErrorMessage); // zobrazim pripadnou vyjimku
                            }
                            if (l_bReloadEnabled && VytvoreniSpisuDto && VytvoreniSpisuDto.PokracujSvytvorenimOdpovedi) {
                                l_bReloadEnabled = false;
                                this.odpovedVeSpisuPokracuj();

                            }
                            if (l_bReloadEnabled) {
                                that.tryReloadDetail(undefined, {
                                    flashMessage: "jres:31937114", //RC 31937114 : Spis byl vytvořen.
                                    flashMessageClass: "g-state-success"
                                });
                            }
                        },
                        makeSpisConfirmInSpisHistory: function (VytvoreniSpisuDto) {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            this.dialogs.confirm("jres:26256038", this.NovySpisRequest).on("closed", function (ev, retVal) {  //RC 26256038 : Nový spis
                                if (retVal === "yes") {
                                    var statusConfirm = that.MakeSpisConfirmStatus.ConfirmedAndPrepared;

                                    if(componentDto.gin_n23_vecsk != 0) {
                                        statusConfirm = that.MakeSpisConfirmStatus.Confirmed;
                                    }

                                    that.vytvoritSpisWS(l_sIxp, "", statusConfirm, false, VytvoreniSpisuDto);
                                }
                            });
                        },

                        vytvoritSpisSelectDenik: function (VytvoreniSpisuDto) {
                            var that = this;
                            //TODO dialog 
                            Gordic.Ssl.Dialogs.VyberDenikuSpzDlg(this, { RezimNakl: componentDto.RezimNakl }, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if (retVal) {
                                    that.functionOnSelectDenikSpz(retVal.sslden, retVal.typDen, retVal.prizDenCj, VytvoreniSpisuDto);
                                }
                            });
                        },
                        functionOnSelectDenikSpz: function (sslden, typDen, prizDenCj, VytvoreniSpisuDto) {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var l_oVytvSpisuOnCompleteFunction = function (VytvoreniSpisuDto) {
                                var l_sSsldenSerialized = sslden + "|" + typDen + "|" + prizDenCj;

                                that.vytvoritSpisWS(l_sIxp, l_sSsldenSerialized, that.MakeSpisConfirmStatus.ConfirmedAndPrepared, true, VytvoreniSpisuDto);
                            };

                            if (((typDen == "10" || typDen == "20") && prizDenCj != "3") || componentDto.gin_n23_vecsk != 0) { // nespojita rada nebo kombinovana (a nejsou odvozeny od rady dokumentu), nutno zobrazit okno pro zadani poradi

                                var l_oParamsJSON = {
                                    "Sslden": sslden,
                                    Ixp: componentDto.ixp
                                };
                                var $div = Gordic.Ssl.Dialogs.VytvSpisBezInicPisDlg(that, l_oParamsJSON, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                    .done(function (VytvoreniSpisuDtoIn) {

                                        if (VytvoreniSpisuDtoIn) {
                                            if (VytvoreniSpisuDto) {
                                                $.extend(VytvoreniSpisuDtoIn, VytvoreniSpisuDto);
                                            }
                                            l_oVytvSpisuOnCompleteFunction($.extend(VytvoreniSpisuDtoIn));
                                        }
                                });

                                // POZOR!!! Neni dodelan RefreshDetail(); pri zavreni dialogu pres krizek nebo tl. Zavrit
                            } else {
                                l_oVytvSpisuOnCompleteFunction(VytvoreniSpisuDto);
                            }

                        },

                        vytvoritSpisNespojRadaDirect: function (sslden, typDen, prizDenCj, VytvoreniSpisuDto) {
                           
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            var l_oVytvSpisuOnCompleteFunction = function (VytvoreniSpisuDtoInIn) {
                                var l_sSsldenSerialized = sslden + "|" + typDen + "|" + prizDenCj;

                                that.vytvoritSpisWS(l_sIxp, l_sSsldenSerialized, that.MakeSpisConfirmStatus.ConfirmedAndPrepared, true, VytvoreniSpisuDtoInIn);
                            }
                            var l_oParamsJSON = {
                                "Sslden": sslden,
                                Ixp: componentDto.ixp
                            };
                            Gordic.Ssl.Dialogs.VytvSpisBezInicPisDlg(that, l_oParamsJSON, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                .done(function (VytvoreniSpisuDtoIn) {
                                    if (VytvoreniSpisuDtoIn) {
                                        if (VytvoreniSpisuDto) {
                                            $.extend(VytvoreniSpisuDtoIn, VytvoreniSpisuDto);
                                        }
                                        l_oVytvSpisuOnCompleteFunction(VytvoreniSpisuDtoIn);
                                    }
                             });
                            // POZOR!!! Neni dodelan RefreshDetail(); pri zavreni dialogu pres krizek nebo tl. Zavrit
                        },

                        vytvoritSpisInsertInputValues: function (VytvoreniSpisuDto) {
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            var l_oVytvSpisuOnCompleteFunction = function (VytvoreniSpisuDtoInIn) {

                                that.vytvoritSpisWS(l_sIxp, "", that.MakeSpisConfirmStatus.ConfirmedAndPrepared, false, VytvoreniSpisuDtoInIn);
                            }
                            var l_oParamsJSON = {
                                Ixp: componentDto.ixp
                            };
                            Gordic.Ssl.Dialogs.VytvSpisBezInicPisDlg(that, l_oParamsJSON, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                .done(function (VytvoreniSpisuDtoIn) {
                                    if (VytvoreniSpisuDtoIn) {
                                        if (VytvoreniSpisuDto) {
                                            $.extend(VytvoreniSpisuDtoIn, VytvoreniSpisuDto);
                                        }
                                        l_oVytvSpisuOnCompleteFunction(VytvoreniSpisuDtoIn);
                                    }
                            });
                        },

                        vytvoritSpisDoSoucasti: function () {
                            var that = this;

                            var l_oParamsJSON = {
                                Ixp: componentDto.ixp,
                                BezInicPis: false,
                                DoSoucasti: true,
                                NezakladatMistoTohoVratitHodnoty: true
                            };

                            Gordic.Ssl.Dialogs.VytvSpisBezInicPisDlg(that, l_oParamsJSON, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                .done(function (newSpisDto) {
                                    if(newSpisDto) {
                                        var ixpSoucasti = componentDto.ixp;
                                
                                        var opt = {
                                            "IxpDok": "",
                                            "IxpSoucasti": ixpSoucasti,
                                            "NewSpisDto": newSpisDto
                                        };

                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("VytvoritSpisDoSoucasti", opt)
                                            .done(function (retVal) {

                                                if(retVal.StavBool && retVal.StrParam1) {
                                                    var opt = {
                                                        DetailDto: { ixp: retVal.StrParam1 },
                                                        EditMode: false
                                                    };
                                                    that.otevriNovyDetail(opt);
                                                }

                                                //that.tryReloadDetail(undefined, {
                                                //    flashMessage: "jres:31937114", //RC 31937114 : Spis byl vytvořen.
                                                //    flashMessageClass: "g-state-success"
                                                //});
                                            }).always(function () { srv.close(); });
                                    }
                                });

                        },
                        odpovedVeSpisu: function () {
                            var that = this;
                            if (componentDto.PrizSpis === 2) {
                                this.odpovedVeSpisuPokracuj();
                            } else {
                                this.vytvoritSpis({ PokracujSvytvorenimOdpovedi: true });
                            }
                            
                        },
                        odpovedVeSpisuPokracuj: function () {
                            var that = this;
                            var l_oJSONPars = {
                                Ixp: componentDto.ixp
                            };
                            this.beginOperation();
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("OdpovedVeSpisu", l_oJSONPars)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        if (retVal.StrParam1) {
                                            var opt = {
                                                DetailDto: { ixp: retVal.StrParam1 },
                                                EditMode:true
                                            };
                                            that.otevriNovyDetail(opt);
                                        }

                                        //that.tryReloadDetail(undefined, {
                                        //    flashMessage: "paráda", //RC 31937056 : Vyřízení bylo zrušeno
                                        //    flashMessageClass: "g-state-success",
                                        //});
                                    } else {
                                        that.tryReloadDetail(undefined, {
                                            flashMessage: "jres:31937487", //RC 31937487 : Nelze vytvořit odpověď
                                            flashMessageClass: "g-state-error",
                                        });
                                    }
                                }).always(function () {
                                    that.endOperation();
                                    srv.close();
                                });
                        },

                        //#endregion

                        //#region vlozit do spisu

                        sslVlozitDoSoucasti: function () {
                            var that = this;

                            if (componentDto.wfl_typspisy != 0) {
                                var typSpis = 3;
                                if (componentDto.TypSpis === 3) {
                                    typSpis = 2; //new GInt16(2);
                                }   // ALF 6.8.2019 pro součást by se měl nabídnout typový spisy
                                //ok = l_oHledatDokumentTab.VyhledejPosledniNadrizenouEntitu(typSpis, DocInfo.Ixp);

                                Gordic.Wfl.Dialogs.GHledatIdentDokSpisDlg(this, { IxpVkladanehoDok: componentDto.Ixp, TypSpis: typSpis }) 
                                    .then(function (retVal) {
                                        if (retVal && retVal.ixp) {
                                            var opt = {
                                                Ixp: componentDto.ixp,
                                                IxpDo: retVal.ixp
                                            };
                                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                            srv.call("VlozitDoSoucasti", opt)
                                                .done(function (retVal) {
                                                    if (retVal.StavBool) {
                                                        that.tryReloadDetail(undefined, {
                                                            flashMessage: "jres:31937192", //RC 31937192 : Úspěšně vložení
                                                            flashMessageClass: "g-state-success",
                                                        });
                                                    }
                                                }).always(function () { srv.close(); });
                                        }
                                    });
                            }
                        },

                        sslVyjmoutZeSoucasti: function () {
                            var that = this;
     
                            var opt = {
                                IxpNadrazeneEntity: componentDto.IxpSpis, // Ixp nadřízené entity. U dílu ixp soucasti (IxpSpis)
                                IxpVyjimaneEntity: componentDto.ixp,
                                IxsVskSpisu: "" 
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("VyjmoutZNadrizeneEntity", opt)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail(undefined, {
                                            flashMessage: "jres:31937191", //RC 31937191 : Úspěšně vyjmuto
                                            flashMessageClass: "g-state-success",
                                        });
                                    }
                                }).always(function () { srv.close(); });
                        },

                        vlozitDoSpisu: function (FlagVlozit) {
                         
                            var that = this;
                            var opt = {
                                IxpDok: componentDto.ixp,
                                PIDSpisZnovuVlozit: componentDto.PIDSpisZnovuVlozit,
                                content: this,
                                SVyriz: componentDto.SVyriz,
                                ssl_rem_dokd: componentDto.ssl_rem_dokd
                            };
                            if (this.SimpleMode) {
                                opt.HledaniSpisuProVlozeniDokumentuSimpleDlg = true;
                            }
                            this.beginOperation();
                            Gordic.Ssl.Utils.vlozitDoSpisuUtils(FlagVlozit, opt)
                                .done(function (rv) {
                                    that.tryReloadDetail(undefined, {
                                        flashMessage:
                                            FlagVlozit
                                                ? "jres:31937318" //RC 31937318 : Dokument byl vložen do spisu
                                                : "jres:31937319", //RC 31937319 : Dokument byl vyjmut ze spisu
                                        flashMessageClass: "g-state-success"
                                    });

                                }).fail(function () {
                                    that.tryReloadDetail(undefined, {
                                        flashMessage:
                                            FlagVlozit
                                                ? "jres:31937320" //RC 31937320 : Vkládání do spisu nebylo dokončeno
                                                : "jres:31937321", //RC 31937321 : Vyjmutí ze spisu nebylo dokončeno
                                        flashMessageClass: "g-state-error"
                                    });
                                })
                                .always(function () {
                                 
                                    that.endOperation();
                                   
                                });
                        },


                        zrusitVyrizeniCJ: function () {
                           
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var options = {
                                winTitle: "jres:26255182" //RC 26255182 : Důvod zrušení vyřízení ČJ
                            };
                            var $div = Gordic.Ssl.Dialogs.AddDuvodDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if (retVal) {
                                    var l_oJSONPars = {
                                        "Ixp": l_sIxp,
                                        "Duvod": retVal.duvod
                                    };
                                    var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                    srv.call("ZrusitVyrizeniCj", l_oJSONPars)
                                        .done(function (retVal) {
                                            if (retVal.StavBool) {
                                                that.tryReloadDetail(undefined, {
                                                    flashMessage: "jres:31937056", //RC 31937056 : Vyřízení bylo zrušeno
                                                    flashMessageClass: "g-state-success",
                                                });
                                            } else {
                                                that.tryReloadDetail(undefined, {
                                                    flashMessage: "jres:31937132", //RC 31937132 : Vyřízení nelze zrušit
                                                    flashMessageClass: "g-state-error",
                                                });
                                            }
                                        }).always(function () { srv.close(); });
                                }
                            });

                        },
                         // VyriditAdActa
                        vyriditAdActa: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            if (componentDto.ssl_vyrkonmet != 0) {
                                var l_oJSONPars = { "ixp": l_sIxp };
                                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                srv.call("KontrolaMetadatProIxp", l_oJSONPars)
                                    .done(function (retVal) {
                                        that.kontrolaMetadatDokSpisOnSucceeded(retVal);
                                    }).always(function () { srv.close(); });
                                
                            } else {
                                this.vyriditPisemnostInternal();
                            }
                        },

                        uzavritTypovySpis: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var l_oJSONPars = { Ixp: l_sIxp };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("UzavritTypovySpis", l_oJSONPars)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail();
                                    }
                                }).always(function () { srv.close(); });
                        },

                        uzavritSoucast: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var l_oJSONPars = { Ixp: l_sIxp };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("UzavritSoucast", l_oJSONPars)
                                .done(function (retVal) {
                                    if(retVal.StavBool) {
                                        that.tryReloadDetail();
                                    }
                                }).always(function () { srv.close(); });
                        },

                        kontrolaMetadatDokSpisOnSucceeded: function (retVal) {

                            var that = this;
                            var l_bIsValid = retVal.Result;
                            var l_sKontrolaMetadatHlaska = retVal.Message;
                            var l_sIxp = retVal.Ixp;

                            if (l_sKontrolaMetadatHlaska) {
                                this.dialogs.alert("jres:31937042",l_sKontrolaMetadatHlaska); //RC 31937042 : Pozor
                            }
                            if (!l_bIsValid) {

								var opt = {
                                    Ixp: l_sIxp,
                                    TypKontrolySpisZnakuProp: 0
								};

                                Gordic.Wfl.Dialogs.OpravaMetadatDlg(that, opt).done(function (retVal) {

									if ((retVal && retVal.stav) || componentDto.ssl_vyrkonmet === 1) {
										that.vyriditPisemnostInternal();
									}
								});
                               
                                
                            } else {
                                that.vyriditPisemnostInternal();
                            }
                        },
                        vyriditPisemnostInternal: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var l_oVyrizeniDokumentuAdActaFunction = function (selectedTermin) {
                                var l_oJSONPars = { "Ixp": l_sIxp, "DatVyrAdActa": selectedTermin };
                                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                srv.call("VyrizeniDokumentuAdActa", l_oJSONPars)
                                    .done(function (retVal) {
                                        if (retVal.StavBool) {
                                            that.tryReloadDetail();
                                        }
                                    }).always(function () { srv.close(); });
                            };
  
                            if (this.RezimPodani == 0 && (componentDto.LzeVyriditDokumentVeSpisuVeStareMetodice || (componentDto.PrizSpis == 2 && componentDto.ssl_smvyrivespi == 1 && componentDto.gin_n23_vedd > 0))) { // T42963
                                // volani okna pro MVCR
                                var l_sTitle = "jres:Gordic.Ssl.WebClient:26256549"; //RC 26256549 : Vyřízení dokumentu vloženého ve spisu
                                var l_oParamsJSON = { Ixp: l_sIxp };
                                Gordic.Ssl.Dialogs.VyrizeniDokVeSpisuDlg(that, l_oParamsJSON).then(function (retVal) {
                                    if (retVal) {
                                        that.tryReloadDetail();
                                    }
                                });
                            } else if (componentDto.ssl_adac_datvy == 1) {
                                var options = {
                                    winTitle: "jres:31937305", //RC 31937305 : Vyřízení dokumentu
                                    LabelText: "jres:31937306", //RC 31937306 : Datum vyřízení
                                    Using: Gordic.Ssl.Dialogs.ZmenaTerminuDlgUsing.VYRIZENI_AD_ACTA
                                };
                                Gordic.Ssl.Dialogs.ZmenaTerminuDlg(that, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                    if (retVal) {
                                        var l_oSelectedDate = retVal.TerminField;

                                        var l_nYear = new Number(l_oSelectedDate.getYear());

                                        if (l_nYear < 1900) {
                                            l_nYear = l_nYear + 1900;
                                        }

                                        var l_sSelectedDate = l_oSelectedDate.getDate() + "." + (l_oSelectedDate.getMonth() + 1) + "." + l_nYear;

                                        l_oVyrizeniDokumentuAdActaFunction(l_sSelectedDate);
                                    }
                                });
                            } else {
                                this.dialogs.confirm("jres:26255260", this.VyriditAdActaRequest).on("closed", function (ev, retVal) {  //RC 26255260 : Vyřídit
                                    if (retVal === "yes") {
                                        l_oVyrizeniDokumentuAdActaFunction("");
                                    }
                                });
                            }
                        },

                        // zruseniUzavreniTypovehoSpisu
                        zruseniUzavreniTypovehoSpisu: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            var l_oJSONPars = {
                                "Ixp": l_sIxp
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("ZruseniUzavreniTypovehoSpisu", l_oJSONPars)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail();
                                    }
                                }).always(function () { srv.close(); });
                        },

                        // ZruseniVyrizeniDokumentu
                        zruseniVyrizeniDokumentu: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            var l_oJSONPars = {
                                "Ixp": l_sIxp
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("ZruseniVyrizeniDokumentu", l_oJSONPars)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail();
                                    }
                                }).always(function () { srv.close(); });
                        },
                        detailSpisu: function () {
                            var that = this;
                            if (componentDto.IxpSpisPrir) {
                                var opt = {
                                    DetailDto: {
                                        ixp: componentDto.IxpSpisPrir
                                    },
                                };
                                this.otevriNovyDetail(opt);

                            } else if (componentDto.IxpSpis) {
                                var opt = {
                                    DetailDto: {
                                        ixp: componentDto.IxpSpis
                                    },
                                };
                                this.otevriNovyDetail(opt);
                            }  
                        },


                        addVyrizDok: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            this.hledatIdentDokSpi(
                                function (retVal) {
                                    if (retVal) {
                                        var options = { "Ixp": l_sIxp, "IxpVyriz": retVal.ixp };
                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("AddVyrizujiciDokumentCj", options)
                                            .done(function (retValAdd) {
                                                if (retValAdd.StavBool) {
                                                    that.tryReloadDetail(undefined, {
                                                        flashMessage: "jres:31937076", //RC 31937076 : Vyřizující dokument byl přidán
                                                        flashMessageClass: "g-state-success"
                                                    });
                                                }
                                            }).always(function () { srv.close(); });
                                    }
                                }
                            );


                        },

                        //#endregion
                        kopieDokumentu: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var options = {
                                Ixp: l_sIxp
                            };
                            Gordic.Ssl.Dialogs.KopieDlg(this, options).on("closed", function (ev, retVal) { 
                                that.nactiPocetKopiiStatusbar();
                            });;
                        },
                        katastralniProfil: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var options = { "Ixp": l_sIxp };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("ZalozitKatastralniProfil", options)
                                .done(function (retValAdd) {
                                    if (retValAdd.StavBool) {
                                        that.tryReloadDetail(undefined, {
                                            flashMessage: "jres:26257418", //RC 26257418 : Katastrální profil byl vytvořen.
                                            flashMessageClass: "g-state-success"
                                        });
                                    }
                                }).always(function () { srv.close(); });
                        },
                        //#region commandbar
                        evidovat: function () {
                            
                            var that = this;
                            if (componentDto.LzeEvidovatCj) {
                                this.flagEvidovat = true;
                                this.ulozitZmeny();
                                // spuštění save detail na serveru.
                                //this.postCall(["SaveDetail", null]).done(function (retVal, content) { if (retVal) { _this.ReloadWithNewContent(); } });
                            } else {
                                this.showFlash("jres:31937469", "warning", "idFlashInfo") //RC 31937469 : Nepovolená akce
                            }
                        },

                        //#endregion


                        priraditKeSpisu: function () {
                            var that = this;
                            var opt = {
                                DisableCJ: true,
                                IxpVkladanehoDok: componentDto.ixp,
                                TypSpis: 1,
                                CustomTitle: "jres:31937400", //RC 31937400 : Přiřadit ke spisu
                                CustomActionButtonCaption:"jres:31937401" //RC 31937401 : Přiřadit
                            };

                            Gordic.Wfl.Dialogs.GHledatIdentDokSpisDlg(this, opt)
                                .done(function(retVal){
                                    if (retVal && retVal.ixp && (retVal.ixp !== componentDto.ixp)) {
                                        var opt = {
                                            "IxpSpis": retVal.ixp,
                                            "IxpDoc": componentDto.ixp,
                                            "DatZmena": componentDto.DatZmena
                                        };
                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("PriraditDokumentKeSpisu", opt)
                                            .done(function (retVal) {
                                                if (retVal.StavBool) {
                                                    that.tryReloadDetail(undefined, {
                                                        flashMessage: "jres:31937283", //RC 31937283 : Dokument byl přiřazen ke spisu
                                                        flashMessageClass: "g-state-success"
                                                    });
                                                }
                                            }).always(function () { srv.close(); });
                                    } 
                                })
                                .fail(function () {
                                    
                                });
                        },

                        priraditKeSpisuZrusit: function () {
                            var that = this;
                            var opt = {
                                "IxpSpisPrir": componentDto.IxpSpisPrir,
                                "Ixp": componentDto.ixp,
                                "DatZmena": componentDto.DatZmena
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("PriraditDokumentKeSpisuZrusit", opt)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail(undefined, {
                                            flashMessage: "jres:31937285", //RC 31937285 : Přiřazení dokumentu ke spisu bylo zrušeno.
                                            flashMessageClass: "g-state-success"
                                        });
                                    }
                                }).always(function () { srv.close(); });
                        },
                      
                        vytvoritVlastniDokumentsVazbou: function () {
                            var that = this;
                            var options = {
                                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                                TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp
                            };
                            Gordic.Wfl.Dialogs.GenerovaniIxp(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow)

                                .done(function (retVal, content) {
                                    var optNewDok = {};
                                    optNewDok.DetailDto = { ixp: retVal.Ixp };
                                    optNewDok.RezimPodani = 1;
                                    optNewDok.IxpInitProVazbuSouvisejicich = componentDto.ixp;
                                    var nazevObj = that.findFields("Vec").gfield("getValue");
                                    var saveSslProfil = that.saveSslProfil();
                                    optNewDok.PredplneniDatProPodani = {
                                        nazev: nazevObj && nazevObj.data ? nazevObj.data : undefined ,
                                        obsah_text: saveSslProfil.ObsahText,
                                        spis_pl: saveSslProfil.SpisPl,
                                        spis_znak: saveSslProfil.SpisZnak
                                    };
                                    that.otevriNovyDetail(optNewDok);
                                }); 

                        },
                        pocetKopiistatusBarBadge: pocetKopiistatusBarBadge,
                        nactiPocetKopiiStatusbar: function () {
                            if (Gordic.Isl.Sslspid && !content.SimpleMode && (this.RezimPodani == null || this.RezimPodani == 0)) {
                                Gordic.Isl.Sslspid.getPocetKopii({ Data: { IxpOriginalu: componentDto.IxpOriginalu } }).get()
                                    .done(function (ret) {
                                        if (ret != null && ret.Data != null && ret.Data.Pocet != null && ret.Data.Pocet > 0 ) {
                                            content.pocetKopiistatusBarBadge.value = ret.Data.Pocet;
                                            content.pocetKopiistatusBarBadge.update();
                                            content.actions.actPocetKopiiStatusBar.update({ visible: true });
                                        } else {
                                            content.actions.actPocetKopiiStatusBar.update({ visible: false });
                                        }


                                    });
                            }
                        },

                        odeslatPripominku: function () {
                            var that = this;
                            var options = {
                                parentContent: that,
                                opt: { Ixp: componentDto.ixp }
                            };
                            Gordic.Ssl.Dialogs.GSslEklepPripominkaDlg(options)
                                .then(function (retVal) {
                                    if (retVal) {
                                        //that.tryReloadDetail();
                                    }
                            });

                        }, 
                        odeslatNovePripominkoveRizeni: function () {
                            var that = this;
                            var options = {
                                parentContent: that,
                                opt: { Ixp: componentDto.ixp }
                            };
                            Gordic.Ssl.Dialogs.GSslEklepNovePripominkoveRizeniDlg(options)
                                .then(function (retVal) {
                                    if (retVal) {
                                        //that.tryReloadDetail();
                                    }
                                });

                        }, 

                        odeslanepripominky: function () {
                            var that = this;
                            
                            Gordic.Ssl.Dialogs.GEklepPripominkyPripominkovehoRizeniSeznamDlg({
                                parentContent: this,
                                opt: {
                                    StartFilter: {
                                        ixp_vyriz_eklep: componentDto.ixp
                                    }
                                }
                            })

                        }, 

                        sslDetailDokumentu_preevidence: function () {
                            var that = this;

                            Gordic.Ssl.Dialogs.PreevidenceDoSamostatneEvidenceDlg(that, { Ixp: componentDto.ixp }, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if(retVal) {
                                    that.tryReloadDetail();
                                }
                            });

                        },

                        enableSslDetailDokumentu: function () {

                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                             //#region Dokument
                            this.actions.actVyrizujiciDokument.update({ enabled: (l_bActionEnabled && componentDto.LzeZalozitVyrizujiciDok) });
                            this.actions.actVytvoritDuplikat.update({ enabled: (l_bActionEnabled && componentDto.LzeVytvoritDuplikat) });
                            this.actions.actOznaceniPreevidovaniNahradniEvidence.update({ enabled: (l_bActionEnabled && componentDto.LzeOznacitJakoPreevidovaniZNahradniEvidence) });
                            this.actions.actVytvoritSpis.update({ enabled: (l_bActionEnabled && componentDto.LzeVytvoritSpis) });
                            this.actions.actVytvoritSpisDoSoucasti.update({ visible: false, enabled: (l_bActionEnabled && componentDto.actVytvoritSpisDoSoucasti) }); // u dokumentu neviditelné a disabled
                            
                            //#endregion

                            //#region Činnosti
                            //actVlozitDoSpisu
                            
                            var captionVlozitDoSpisu = "jres:26255159"; //RC 26255159 : Vložit do spisu
                            var icon = "gi-vlozit_do_spisu";
                            var actVlozitDoSpisuEnabled = true;
                            var rezim = true;
                            if (l_bActionEnabled && componentDto.LzePisemnostVyjmout) {
                                captionVlozitDoSpisu = "jres:26255325"; //RC 26255325 : Vyjmout ze spisu
                                icon = "gi-vyjmout_do_spisu";
                                rezim = false;
                            } else if (l_bActionEnabled && componentDto.LzePisemnostVlozit) {
                                captionVlozitDoSpisu = "jres:26255159"; //RC 26255159 : Vložit do spisu
                                rezim = true;
                            } else {
                                actVlozitDoSpisuEnabled = false;
                            }

                            this.actions.actVlozitDoSpisu.rezim = rezim;
                            this.actions.actVlozitDoSpisu.update({ enabled: actVlozitDoSpisuEnabled, icon: icon, caption: captionVlozitDoSpisu });
                            this.actions.actOdpovedVeSpisu.update({
                                enabled: (l_bActionEnabled && componentDto.LzeOdpovedVeSpisu),
                                visible: (l_bActionEnabled && componentDto.LzeOdpovedVeSpisu)
                            });

                            this.actions.actVyriditCJ.update({ enabled: (l_bActionEnabled && componentDto.LzeVyriditCj) });
                            this.actions.actZrusitVyrizeniCJ.update({ enabled: (l_bActionEnabled && componentDto.LzeOdvyriditCj) });
                            this.actions.actVyridit.update({ enabled: (l_bActionEnabled && componentDto.LzeVyriditAdActa) });
                            this.actions.actZrusitVyrizeni.update({ enabled: (l_bActionEnabled && componentDto.LzeZrusitVyrizeniAdActa) });
    
                            this.actions.actPriraditKeSpisu.update({ enabled: (l_bActionEnabled && componentDto.LzeDokumentPriraditKeSpisu) });
                            this.actions.actPriraditKeSpisuZrusit.update({ enabled: (l_bActionEnabled && componentDto.LzeDokumentPriraditKeSpisuZrusit) });

                            //#endregion

                            //#region Vazby
                            this.actions.actKopie.update({ enabled: l_bActionEnabled });
                            this.actions.actKatastralniProfil.update({ enabled: l_bActionEnabled && componentDto.LzeVytvoritKatastralniProfil });
                            //#endregion

                            //#region Tisk
                            this.actions.actTiskSablony.update({ enabled: (l_bActionEnabled && (componentDto.IxsSuAkt === componentDto.IxsSu)) });
                            //#endregion

                            //#region Ostatni
                            this.actions.actSpis.update({ enabled: (l_bActionEnabled && ((componentDto.PrizSpis === 2) || (componentDto.IxpSpisPrir != null))) });
                            //#endregion

                            //#region comandbar
                            this.actions.actEvidovat.update({ enabled: (l_bActionEnabled && componentDto.LzeEvidovatCj) });
                            this.actions.actEvidovatComandBar.update({ visible: (l_bActionEnabled && componentDto.LzeEvidovatCj) });
                            //#endregion


                            var permisionActAddVyrizDok = l_bActionEnabled  && componentDto.AddVyrizDokEnabled;
                            this.actions.actAddVyrizDok.update({ enabled: permisionActAddVyrizDok });
                            this.actions.actSouboryNearchivniFormat.update({ enabled: l_bActionEnabled && componentDto.SouboryNearchivniFormatEnabled });


                            this.actions.actVytvoritVlastniDokumentsVazbou.update({ enabled: l_bActionEnabled && componentDto.LzeVytvoritVlastniDokumentsVazbou });

                            // připomínky
                            this.actions.actOdeslatPripominku.update({ enabled: l_bActionEnabled && componentDto.OdeslatPripominkuEnabled });
                            this.actions.actOdeslatPripominku.update({ visible: l_bActionEnabled && componentDto.IsEKlepPripominka && (componentDto.gin_eklep_role > 1) });

                            this.actions.actOdeslanePripominky.update({ enabled: l_bActionEnabled && componentDto.IsEKlepPripominka });
                            this.actions.actOdeslanePripominky.update({ visible: l_bActionEnabled && componentDto.IsEKlepPripominka });

                            this.actions.actVytvorenePripominkoveRizeni.update({ enabled: l_bActionEnabled && componentDto.IsEKlepPripominka });
                            this.actions.actVytvorenePripominkoveRizeni.update({ visible: l_bActionEnabled && componentDto.IsEKlepPripominka });

                            // připomínkové žízení
                            this.actions.actOdeslatNovePripominkoveRizeni.update({ enabled: l_bActionEnabled && componentDto.OdeslatNovePripominkoveRizeniEnabled });
                            this.actions.actOdeslatNovePripominkoveRizeni.update({ visible: l_bActionEnabled && componentDto.IsEKlepPripominka && (componentDto.gin_eklep_mrol > 1) });

                        },

                        enableSslDetailTypoveEntity: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                            this.actions.actVyrizujiciDokument.update({ visible: false, enabled: false });
                            this.actions.actVytvoritDuplikat.update({ visible: false, enabled: false });
                            this.actions.actOznaceniPreevidovaniNahradniEvidence.update({ visible: false, enabled: false });

                            //#region Činnosti
                            this.actions.actVytvoritSpis.update({ visible: false, enabled: false });

                            var isTS = componentDto.TypSpis == 2;
                            var isSoucast = componentDto.TypSpis == 3 || componentDto.TypSpis == 5;
                            var isDil = componentDto.TypSpis == 4;

                            if(isSoucast) {
                                this.actions.actVytvoritSpisDoSoucasti.update({ visible: true, enabled: (l_bActionEnabled && componentDto.LzeVytvoritSpisDoSoucasti) });
                            } else {
                                this.actions.actVytvoritSpisDoSoucasti.update({ visible: false, enabled: false });
                            }

                            if(isSoucast || isDil) {
                                this.actions.actVlozitDoSpisu.update({ caption: "jres:26257277" }); //RC 26257277 : Vložit do součásti
                                this.actions.actVlozitDoSpisu.update({ visible: true, enabled: (l_bActionEnabled && isDil) }); // TODO pridat spravne lze. Aktualne v TK u soucasti false a u dilu se neomezuje vůbec

                                this.actions.actVyjmoutZeSoucasti.update({ visible: true, enabled: (l_bActionEnabled && isDil) }); // TODO lze
                            } else {
                                this.actions.actVlozitDoSpisu.update({ visible: false, enabled: false });
                            }

                            this.actions.actOdpovedVeSpisu.update({ visible: false, enabled: false });

                            this.actions.actVyriditCJ.update({ visible: false, enabled: false });
                            this.actions.actZrusitVyrizeniCJ.update({ visible: false, enabled: false });

                            if(isSoucast) {
                                this.actions.actVyridit.update({ visible: true, enabled: l_bActionEnabled && componentDto.LzeUzavritSoucast, icon: "gi-vyrizenouza", caption: "jres:26257298" }); //RC 26257298 : Uzavřít součást
                            } else if(isTS) {
                                this.actions.actVyridit.update({ visible: true, enabled: l_bActionEnabled && componentDto.LzeUzavritTypovySpis, icon: "gi-vyrizenouza", caption: "jres:26257301" }); //RC 26257301 : Uzavřít typový spis
                            } else {
                                this.actions.actVyridit.update({ visible: false, enabled: false });
                            }
                           
                            if(isTS) {
                                this.actions.actZrusitVyrizeni.update({ visible: true, enabled: l_bActionEnabled && componentDto.LzeZrusitUzavreniTypovehoSpisu, icon: ["gi-vyrizenouza", "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"], caption: "jres:26257327" }); //RC 26257327 : Zrušit uzavření typového spisu
                            } else {
                                this.actions.actZrusitVyrizeni.update({ visible: false, enabled: false });
                            }

                            this.actions.actPriraditKeSpisu.update({ visible: false, enabled: false });
                            this.actions.actPriraditKeSpisuZrusit.update({ visible: false, enabled: false });

                            //#endregion

                            //#region Vazby
                            this.actions.actKopie.update({ visible: false, enabled: false });
                            this.actions.actKatastralniProfil.update({ visible: false, enabled: false });
                            //#endregion

                            //#region Tisk
                            this.actions.actTiskSablony.update({ visible: false, enabled: false });
                            //#endregion

                            //#region Ostatni
                            this.actions.actSpis.update({ visible: false, enabled: false });// TODO odkaz na nadrizenou entitu
                            //#endregion

                            //#region comandbar
                            this.actions.actEvidovat.update({ visible: false, enabled: false });
                            this.actions.actEvidovatComandBar.update({ visible: false, enabled: false });
                            //#endregion

                            this.actions.actAddVyrizDok.update({ visible: false, enabled: false });
                            this.actions.actSouboryNearchivniFormat.update({ visible: false, enabled: false });

                            this.actions.actVytvoritVlastniDokumentsVazbou.update({ visible: false, enabled: false });

                            this.actions.actOdeslatPripominku.update({ visible: false, enabled: false });
                            this.actions.actOdeslanePripominky.update({ visible: false, enabled: false });
                            this.actions.actVytvorenePripominkoveRizeni.update({ visible: false, enabled: false });

                            this.actions.actOdeslatNovePripominkoveRizeni.update({ visible: false, enabled: false });
                            
                            this.actions.actSslDetailDokumentuPreevidence.update({ visible: false, enabled: false });
                        },
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt
                        //#region Dokument
                        actVyrizujiciDokument: {
                            caption: "jres:26255246", //RC 26255246 : Nové podání vyřizujícího dokumentu
                            icon: "gi-paper |gi-tick gi-bgw gi-stack-pos--rb",
                            run: function () {
                                $.content(this).vyrizujiciDokument();
                            }
                        },
                        actVytvoritDuplikat: {
                            caption: "jres:26256695",  //RC 26256695 : Vytvořit duplikát
                            icon: "gi-copy",
                            run: function () {
                                $.content(this).vytvoritDuplikat();
                            }
                        },
                        actOznaceniPreevidovaniNahradniEvidence: {
                            caption: "jres:26257258", //RC 26257258 : Označení jako přeevidování z náhradní evidence
                            // icon: "gi-paper_question",
                            run: function () {
                                $.content(this).sslDetailDokumentu_oznaceniPreevidovani();
                            }
                        },
                        //#endregion

                        //#region Činnosti
                        actVytvoritSpis: {
                            caption: "jres:26255262", //RC 26255262 : Vytvořit spis
                            icon: "gi-spis gi-stack-bg|fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                            run: function () {
                                $.content(this).vytvoritSpis();
                            }
                        },
                        actVytvoritSpisDoSoucasti: {
                            caption: "jres:26257274", //RC 26257274 : Vytvořit spis do součásti
                            icon: "gi-spis gi-stack-bg|fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                            run: function () {
                                $.content(this).vytvoritSpisDoSoucasti();
                            }
                        },
                        actOdpovedVeSpisu: {
                            caption: "jres:31937485", //RC 31937485 : Odpověď ve spisu
                            icon: "gi-spis gi-stack-bg|gi-arrow g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                            toolip:"jres:31937488", //RC 31937488 : Vytvoření vlastního dokumentu do spisu - odpověď na podání
                            run: function () {
                                $.content(this).odpovedVeSpisu();
                            }
                        },
                        actVlozitDoSpisu: {
                            caption: "jres:26255159",  //RC 26255159 : Vložit do spisu
                            //icon: "gi-pencil",
                            rezim:true,
                            run: function () {
                                var isSoucast = componentDto.TypSpis == 3 || componentDto.TypSpis == 5;
                                var isDil = componentDto.TypSpis == 4;

                                if(componentDto.wfl_typspisy != 0 && (isSoucast || isDil)) {
                                    $.content(this).sslVlozitDoSoucasti();
                                } else {
                                    $.content(this).vlozitDoSpisu(this.rezim);
                                }
                            }
                        },
                        actVyjmoutZeSoucasti: {
                            caption: "jres:26257325",  //RC 26257325 : Vyjmout
                            //icon: "gi-pencil",
                            visible: false,
                            run: function () {
                                $.content(this).sslVyjmoutZeSoucasti();
                            }
                        },
                        actVyriditCJ: {
                            caption: "jres:26255323",  //RC 26255323 : Vyřídit ČJ
                            icon: "gi-vyrizeno",
                            run: function () {
                                $.content(this).vyridit('Vyridit');
                            }
                        },
                        actZrusitVyrizeniCJ: {
                            caption: "jres:26255324",  //RC 26255324 : Zrušit vyřízení ČJ
                            icon: ["gi-vyrizeno", "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).zrusitVyrizeniCJ();
                            }
                        },
                        actVyridit: {
                            caption: "jres:26255260", //RC 26255260 : Vyřídit
                            icon: "gi-vyrizeno",
                            run: function () {
                                var that = $.content(this);

                                var isDokument = componentDto.TypSpis == 0;
                                var isSoucast = componentDto.TypSpis == 3 || componentDto.TypSpis == 5;
                                var isTS = componentDto.TypSpis == 2;
                                var isDil = componentDto.TypSpis == 4;

                                if (isDokument) {
                                    that.vyriditAdActa();
                                } else if (isTS) {
                                    that.dialogs.confirm("?", "jres:26257302").on("closed", function (ev, retVal) { //RC 26257302 : Opravdu chcete uzavřít typový spis?
                                        if (retVal === "yes") {
                                            that.uzavritTypovySpis();
                                        }
                                    });
                                } else if (isSoucast) {
                                    that.dialogs.confirm("?", "jres:26257296").on("closed", function (ev, retVal) { //RC 26257296 : Opravdu chcete uzavřít součást?
                                        if (retVal === "yes") {
                                            that.uzavritSoucast();
                                        }
                                    });
                                } else if (isDil) {
                                    that.dialogs.alert("jres:26257295"); //RC 26257295 : Díly jsou dle NSESSS vyřizovány automaticky na základě období zadané na věcné skupině.
                                    return;
                                } else {
                                    return;
                                }
                            }
                        },
                        actZrusitVyrizeni: {
                            caption: "jres:26255330",  //RC 26255330 : Zrušit vyřízení
                            icon: ["gi-vyrizeno", "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                var isTS = componentDto.TypSpis == 2;

                                if(isTS) {
                                    $.content(this).zruseniUzavreniTypovehoSpisu();
                                } else {
                                    $.content(this).zruseniVyrizeniDokumentu();
                                }

                            }
                        },

                        actPriraditKeSpisu: {
                            caption: "jres:31937286",  //RC 31937286 : Přiřadit ke spisu
                            tooltip: "jres:31937286",  //RC 31937286 : Přiřadit ke spisu
                            icon: Gordic.Gin.Globals.Icons.EntitaPrirazenaKeSpisu().icon,
                            run: function () {
                                $.content(this).priraditKeSpisu();
                            }
                        },
                        actPriraditKeSpisuZrusit: {
                            caption: "jres:31937287",  //RC 31937287 : Zrušit přiřazení ke spisu
                            tooltip: "jres:31937287",  //RC 31937287 : Zrušit přiřazení ke spisu
                            icon: [
                                Gordic.Gin.Globals.Icons.EntitaPrirazenaKeSpisu().icon[0],
                                "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"
                            ],
                            run: function () {
                                $.content(this).priraditKeSpisuZrusit();
                            }
                        },


                        //#endregion

                        //#region Vazby
                        actKopie: {
                            caption: "jres:26255193",  //RC 26255193 : Kopie dokumentu
                            icon: "gi-copy",
                            run: function () {
                                $.content(this).kopieDokumentu();
                            }
                        },

                        actKatastralniProfil: {
                            caption: "jres:26257416",  //RC 26257416 : Katastrální profil
                            //icon: "gi-copy",
                            run: function () {
                                $.content(this).katastralniProfil();
                            }
                        },
                        //#endregion

                        //#region Tisk
                        actTiskSablony: GAction.createPrintAction({
                            name: "actTiskSablony",
                            tema: "usu_ptm_pisdet",
                            icon: "gi-print|gi-index gi-bgw gi-stack-pos--rb g-state-text g-state-info",
                            caption: "jres:26255344", //RC 26255344 : Šablony
                            reportStarting: function (rep) {
                                var def = $.Deferred();
                                rep.params.X0000 = componentDto.ixp;
                                rep.params.Preselect = false;
                                rep.params.IXP = componentDto.ixp;

                                //if (componentDto.Ssl_tnazev_doko && componentDto.Ssl_tnazev_doko !== "") {
                                //    rep.params.EleFilename = componentDto.Ssl_tnazev_doko;
                                //}
                                rep.params.OBSAH = rep.originalName;
                                var srv = $.content(this).createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                var optGenerujNazev = {
                                    ixp: rep.params.X0000,
                                    param: "ssl_tnazev_doko",
                                    alvName: rep.originalName ? rep.originalName : ""  // originalName  name
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
                                            const zpUlozDto = vals.find(function (v) {
                                                return v.value === zpUloz
                                            });
                                            var textFlash = "jres:31937394"; //RC 31937394 : Šablona byla vygenerována.
                                            if (zpUlozDto && zpUlozDto.meta.zpus_uloz_txt && zpUlozDto.meta.zpus_uloz != 0) { // neevidovaný výstup 0 se neukládá do ULO
                                                var zpusob = zpUlozDto.meta.zpus_uloz_txt;
                                                textFlash = textFlash + " " + String.Format("jres:31937396", zpusob); //RC 31937396 : Způsob uložení: {0}
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
                        //#endregion

                        //#region Ostatni
                        actSpis: {
                            caption: "jres:31937057",  //RC 31937057 : Detail spisu
                            icon: "gi-spis",
                            run: function () {
                                $.content(this).detailSpisu();
                            }
                        },
                         //#endregion

                        //#region comandbar
                        actEvidovat: {
                            caption: "jres:26255346", //RC 26255346 : Evidovat
                            icon: Gordic.Gin.Icons.ActionEnum.evidovatCj,
                            run: function () {
                                $.content(this).evidovat();
                            }
                        },
                        actEvidovatComandBar: {
                            caption: "jres:26255346", //RC 26255346 : Evidovat
                            //icon: "gi-pencil",
                            customClass: "g-button--primary",
                            run: function () {
                                $.content(this).evidovat();
                            }
                        },
                        actAddVyrizDok: {
                            caption: "jres:31937315", //RC 31937315 : Přidat vyřizující dokument
                            toolip: "jres:31937316", //RC 31937316 : Přidat existující vyřizující dokument
                            icon: ["gi-vyrizeno", "gi-plus_bold g-state-text g-state-success gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).addVyrizDok();
                            }
                        },

                        actSouboryNearchivniFormat: new GAction(Gordic.Ssl.PreActions.SouboryNearchivniFormat({
                            inputData: function (action, event, ctx, param) {
                              
                                var def = $.Deferred();
                                def.resolve(
                                    {
                                        ListSelectedRowsInfo: [
                                            {
                                            Ixp: componentDto.ixp,
                                            DatZmena: componentDto.DatZmena,
                                            PrizSpis: componentDto.PrizSpis
                                            }
                                        ]
                                });
                                return def.promise();

                            },
                            done: function (retVal) {
                                
                                //if (retVal != null) {
                                //    content.zpracujResultSGroupResult(retVal);

                                //}

                            },
                        })),

                        actVytvoritVlastniDokumentsVazbou: {
                            caption: "jres:31937407", //RC 31937407 : Podání dokumentu s vazbou
                            toolip: "jres:31937406", //RC 31937406 : Podání vlastního dokumentu s vazbou
                            icon: ["gi-navazany_zaznam", "gi-plus g-state-text g-state-success gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).vytvoritVlastniDokumentsVazbou();
                            }
                        },
                        actPocetKopiiStatusBar: {
                            caption: "jres:31937476", //RC 31937476 : KOPIÍ
                            tooltip: "jres:31937477", //RC 31937477 : Počet kopií dokumentu
                            visible: false,
                            //badge: new GObservableObject({
                            //    value: "0",
                            //    tooltip: "jres:31937472" //RC 31937472 : Počet kopií dokumentu.
                            //}),
                            run: function (ev, cv) {
                                if (content.actions.actKopie) {
                                    content.actions.actKopie.run();
                                }
                            }
                        },
                        actOdeslatPripominku: {
                            caption: "jres:31937501", //RC 31937501 : Odeslat připomínku
                            toolip: "jres:31937502", //RC 31937502 : Odeslat připomínku do eKLEP
                            icon: ["gi-budova", "gi-send g-state-text g-state-success gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).odeslatPripominku();
                            }
                        },

                        
                        actOdeslanePripominky: new GAction(Gordic.Ssl.PreActions.OtevriEklepPripominkyPripominkovehoRizeni({
                            actionParams: {
                                name: "actOdeslanePripominky",
                            },
                            inputData: function (action, event, ctx, param) {
                                var def = $.Deferred();
                                def.resolve(
                                    {
                                        parentContent: content,
                                        requestDto: {
                                            StartFilter: {
                                                ixp_vyriz_eklep: componentDto.ixp
                                                //pid_eklep
                                            }
                                        }
                                    });
                                return def.promise();

                            },
                            done: function (retVal) {
                                ;
                            },
                        })),
                        
                        actVytvorenePripominkoveRizeni: new GAction(Gordic.Ssl.PreActions.OtevriEklepPripominkovaRizeni({
                            actionParams: {
                                name: "actVytvorenePripominkoveRizeni",
                            },
                            inputData: function (action, event, ctx, param) {
                                var def = $.Deferred();

                                def.resolve({
                                    parentContent: content,
                                    opt: {
                                        StartFilter: {
                                            ixp_doc: componentDto.ixp
                                        }
                                    }
                                });

                                return def.promise();
                            }
                        })),

                        actOdeslatNovePripominkoveRizeni: {
                            caption: "jres:31937572",  //RC 31937572 : Odeslání připomínkového řízení
                            toolip: "jres:31937572.",  //RC 31937572 : Odeslání připomínkového řízení
                            icon: ["gi-budova", "gi-plus g-state-text g-state-success gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).odeslatNovePripominkoveRizeni();
                            }
                        },


                        actSslDetailDokumentuPreevidence: {
                            caption: "jres:26257213", //RC 26257213 : Přeevidence do samostatné evidence
                            toolip: "jres:26257213", //RC 26257213 : Přeevidence do samostatné evidence
                            icon: ["gi-CJ", "fa-times-circle g-state-text g-state-success gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            visible: componentDto.gin_n23_vedd == 1, // + případně rozšířit o verzi DB, která je uvedena v dialogu
                            run: function () {
                                $.content(this).sslDetailDokumentu_preevidence();
                            }
                        },
                       
                        //#endregion

 
                    },

                    menuBar: [

                        //#region Dokument
                        Gordic.Wfl.Globals.MenuDefinitions.detailDokument(),
                        { action: "actSpis", parent: "menuDokument", before: "menuDokumentSeparator1", favorite: true  },
                        { id:"menuDokumentSeparator4", type: "separator", parent: "menuDokument", after: "menuPodaniCizi" }, 
                        { action: "actVyrizujiciDokument", parent: "menuDokument", after: "menuDokumentSeparator4" },
                        { action: "actVytvoritDuplikat", parent: "menuDokument", after: "menuVyrizujiciDokument" },
                        { action: "actOznaceniPreevidovaniNahradniEvidence", parent: "menuDokument", after: "menuVytvoritDuplikat" },
                        //#endregion

                        //#region Činnosti
                        Gordic.Wfl.Globals.MenuDefinitions.detailCinnosti(),
                        
                       
                        { action: "actVytvoritSpis", parent: "menuWflCinnosti", before: "menuCinnostiSeparator1", favorite: true },
                        { action: "actVytvoritSpisDoSoucasti", parent: "menuWflCinnosti", before: "menuCinnostiSeparator1", favorite: true },
                        { action: "actVlozitDoSpisu", parent: "menuWflCinnosti", after: "menuVytvoritSpis", favorite: true },
                        { action: "actVyjmoutZeSoucasti", parent: "menuWflCinnosti", after: "menuVytvoritSpis", favorite: true },
                        { action: "actOdpovedVeSpisu", parent: "menuWflCinnosti", after: "menuVytvoritSpis", favorite: true },

                        { action: "actPriraditKeSpisu", parent: "menuWflCinnosti", after: "menuVlozitDoSpisu", favorite: true },
                        { action: "actPriraditKeSpisuZrusit", parent: "menuWflCinnosti", after: "menuPriraditKeSpisu", favorite: true },

                        { action: "actSouboryNearchivniFormat", parent: "menuWflCinnosti", after: "menuPriraditKeSpisuZrusit"},
                        { id: "menuCinnostiSeparator6", type: "separator", parent: "menuWflCinnosti", after: "menuSouboryNearchivniFormat" },
                        { action: "actAddVyrizDok", parent: "menuWflCinnosti", after: "menuCinnostiSeparator6" },
                        { action: "actVyriditCJ", parent: "menuWflCinnosti", after: "menuCinnostiSeparator6" },
                        { action: "actZrusitVyrizeniCJ", parent: "menuWflCinnosti", after: "menuVyriditCJ" },
                        { id: "menuCinnostiSeparator7", type: "separator", parent: "menuWflCinnosti", after: "menuZrusitVyrizeniCJ" }, 
                        { action: "actVyridit", parent: "menuWflCinnosti", after: "menuCinnostiSeparator7" },
                        { action: "actZrusitVyrizeni", parent: "menuWflCinnosti", after: "menuVyridit" },
                        { action: "actEvidovat", parent: "menuWflCinnosti", before: "menuZrusitVyrizeni" },
                        { action: "actSslDetailDokumentuPreevidence", parent: "menuWflCinnosti", after: "menuEvidovat" },
                        //#endregion

                        //#region Vazby

                        $.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailVazby(), { favorite: true }),
                        { action: "actVytvoritVlastniDokumentsVazbou", parent: "menuWflVazby", favorite: true }, /*after: "menuSouvisejici",*/

                        { action: "actKopie", parent: "menuWflVazby", after: "menuDotcSubjekty", favorite: true }, 
                        { action: "actKatastralniProfil", parent: "menuWflVazby", after: "menuKopie", favorite: true }, 
                        //#endregion

                        //#region Tisk
                        $.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailTisk(), { favorite: true }),
                        { action: "actTiskSablony", parent: "menuTisk", after: "menuTiskSablonyWord" }

                        
                        
                        //#endregion

                    
                    ],
                    commandBar: [
                         { action: "actEvidovatComandBar", before: "commandCloseButtonClick", primary: true }
                    ],
                    statusBar: [
                        {
                            action: "actPocetKopiiStatusBar", badge: pocetKopiistatusBarBadge, after: "statusDoplnujiciInformaceStatus" } //actDoplnujiciInformaceStatus
                    ],

                };

                if (componentDto.IsEKlepPripominka) {
                    result.menuBar.push($.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailEKlep()));
                    result.menuBar.push({ action: "actOdeslatPripominku", parent: "menuEKlep" });
                    result.menuBar.push({ action: "actOdeslanePripominky", parent: "menuEKlep" });
                    result.menuBar.push({ id: "menuDokumentSeparator41", type: "separator", parent: "menuEKlep" });
                    result.menuBar.push({ action: "actOdeslatNovePripominkoveRizeni", parent: "menuEKlep" });
                    result.menuBar.push({ action: "actVytvorenePripominkoveRizeni", parent: "menuEKlep" });

                }

               
                //#endregion


                return result;
               
            }

        }

    }, { pure: true, extendIntellisense: GContent });
})(jQuery);
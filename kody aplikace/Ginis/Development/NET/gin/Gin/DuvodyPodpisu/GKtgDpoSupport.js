var GKtgDpoSupport = (function ($) {
    "use strict";

    // DuvodPodpisuTxt od 26.1.2021 nahrazuje signingReason (je nutne tuto property dostat v dto az na server) ... vyhledove odstranit

    function GKtgDpoSupport(Content, DbParams) {
        var that = this;
        this.isInicialized = false;
        this._content = Content;
        // použijeme vstupní parametry, případně je zkusíme najít na contentu (nebo jeho parentech)
        this._dbParams = DbParams || this._content && this._content.prop && this._content.prop('KtgDpoSupportDbParamsDto');
        this._srv = _GetSrv(Content);
        this._ixsDpo = null;
        this._ixsDpoList = [];
        this._duvodPodpisuTxt = null;
        this._zobrazitVyberDuvoduVzdy = false;
        //  this._ignorovatParametry = false;
        this._timeStampParam = null;
        this._typDok = 0; // 0-obraz; 1 - priloha
        this._typSgn = 0; // 0-vnejsi; 1 - vnitrni PDF
        this._typKtg = -1;
        this._makeTS = false;

        // Parametry pro praci s cas raz
        this._timeStampParam = -1;
        this._timeStampParamObr = -1;
        this._timeStampParamPri = -1;
        //   this._typLtv = this._dbParams.gin_ele_pdfltv; // Typ LTV podpisu
        //   this._disableEZ = false; // Moznost zakazat pouziti EZ bez ohledu na param ci nastaveni DPO

        this._wflsdpoConfig = null;
        // pokud nebyly parametry na vstupu ani na contentu, dojdeme pro ně na server.
        this.loadingPromise = this._dbParams ? $.Deferred().resolve(this._dbParams).promise() : this._srv.call('GetKtgDpoDBParams');
        this.loadingPromise.done(function (dbParams) {
            that._dpoEnabled = dbParams.gin_sgn_ktgdp == 1;
            that._cannAddTSParam = dbParams.gin_ele_pcasraz;
            that._timeStampParamObr = dbParams.gin_ele_craz_ob;
            that._timeStampParamPri = dbParams.gin_ele_craz_pr;
            that._forceValidateSignOnInsert = dbParams.gin_ele_umneovl === 0;
            that._enablePDFConversionOnInsert = dbParams.gin_ele_vloskon === 1;
            that._enableStandaloneTimestamp = dbParams.gin_sgn_samoraz === 1;
        });

        //  this._pozVizPodpParam = this._dbParams.gin_pdf_pictpos;

        /**
         * Inicializace pro single operace.
         * @author  RTomes
         *
         * @param  {Gordic.Gin.Globals.Enums.KtgDuvPodp}    TypKategorie    Typ kategorie podpisu
         * @param  {boolean}                                ShowDialog      Vynucení zobrazení výběru kategorie, pokud je k dispozici více kategorií
         * @return  {promise} IxsDpo
         */
        this.Init = function (TypKategorie, ShowDialog) {
            var that = this;
            return this.loadingPromise.then(function () {

                if(ShowDialog == undefined) {
                    ShowDialog = true;
                }

                return that._srv.call("GetDpoTable", { TypKategorie: TypKategorie })
                    .then(function (retVal) {
                        that._ixsDpoList = retVal;
                        that._typKtg = TypKategorie;

                        if (that._ixsDpoList.length === 0) {
                            return $.Deferred().reject({ IxsDpo: null, ErrMsg: "jres:26275137" }).promise(); //RC 26275137 : Nenalezeny důvody podpisu
                        } else if (that._ixsDpoList.length === 1) {
                            var rowDpo = that._ixsDpoList[0];

                            that._NastavKategorieInternal(rowDpo);

                            if (rowDpo.priz_edit_text == 1 || rowDpo.priz_ts == -1 || rowDpo.priz_ts == 2 || rowDpo.priz_ts == 3) {
                                // mam jen jednu sablonu, ale pokud je nastavena editovatelnost duvodu nebo razitka, musim zobrazit dialog
                                if (ShowDialog) {
                                    return that.GetIxsDpoFromDialog();
                                }

                                return { IxsDpo: rowDpo.ixs_dpo };
                            }

                            return { IxsDpo: rowDpo.ixs_dpo, signingReason: rowDpo.duvod_txt, DuvodPodpisuTxt: rowDpo.duvod_txt, MakePodpis: rowDpo.priz_podpis == 1, MakeZnacka: rowDpo.priz_znacka == 1, MakeTs: rowDpo.priz_ts == 1 };
                        } else if (ShowDialog) {
                            return that.GetIxsDpoFromDialog()/*.then(function(data) { return { IxsDpo: data}; })*/;
                        }

                        return { IxsDpo: null };
                    });
            });
            //.done(function (filter) { })  
            //.always(function () { that.endOperation(); });
        };

        /**
	     * Inicializace pro hromadné operace.
	     * @author  RTomes
	     *
	     * @param  {string}                                 IxsDpo          Id kategorie podpisu
	     * @param  {Gordic.Gin.Globals.Enums.KtgDuvPodp}    TypKategorie    Typ kategorie podpisu, nepovinný
	     * @return  promise { IxsDpo }
	     */
        this.InitBulkOperation = function (IxsDpo, TypKategorie) {
            var that = this;
            return this.loadingPromise.then(function () {
                that._timeStampParam = that._timeStampParamObr;

                if (that._typDok == 1) {
                    that._timeStampParam = that._timeStampParamPri;
                }

                that._ixsDpo = IxsDpo;

                if (TypKategorie != null) {
                    that._typKtg = TypKategorie;
                }

                var ret = $.Deferred().resolve({ IxsDpo: null }).promise();

                if (IxsDpo != null && IxsDpo != "") {
                    if (IxsDpo === "0000AW40000I") {
                        return $.Deferred().resolve({ IxsDpo: IxsDpo }).promise();
                    }

                    return ret.then(function (data) {
                        return that._srv.call("GetSignReasonReplaced", { IxsDpo: IxsDpo })
                            .then(function (retVal) {
                                if (retVal != null) {
                                    that._duvodPodpisuTxt = retVal.DuvodPodpisuTxt;
                                    that._makeTS = retVal.WflsdpoConfig.PrizCasRaz == 1;
                                    that._wflsdpoConfig = retVal.WflsdpoConfig;
                                    that.isInicialized = true; // uz obsolete

                                    // pro jednotnost naplnim interni seznam dpo
                                    that._ixsDpoList = [];
                                    that._ixsDpoList.push({ ixs_dpo: IxsDpo, nazev: retVal.signingReason, duvod_txt: retVal.DuvodPodpisuTxt, priz_ts: retVal.WflsdpoConfig.PrizCasRaz, priz_edit_text: retVal.WflsdpoConfig.PrizEditText }); // chybi nazev

                                    return { IxsDpo: IxsDpo, signingReason: retVal.DuvodPodpisuTxt, DuvodPodpisuTxt: retVal.DuvodPodpisuTxt };
                                } else {
                                    //TODO: co kdyz nenajdu zadny?
                                    $.Deferred().reject("jres:26275138").promise(); //RC 26275138 : Nenalezen žádný důvod podpisu.
                                }
                                return { IxsDpo: null };
                            });
                    });
                }

                return ret;
            });
        };

        /**
         * Funkce vrací objekt s kategorií. nabídne výběr, pokud jich je více nebo pokud je třeba doplnit důvod či razítko
         * @author  RTomes
         *
         * @return  promise { IxsDpo, signingReason, DuvodPodpisuTxt, MakeTs }
         */
        this.InitMultiReason = function () {
            var that = this;
            return this.loadingPromise.then(function () {
                var def = $.Deferred();

                var canUseDialog = that._ixsDpo == null || that._ixsDpo == "" || that._zobrazitVyberDuvoduVzdy;

                if (that._ixsDpoList.length === 1) {
                    var rowDpo = that._ixsDpoList[0];
                    var useDialog = rowDpo.priz_edit_text == 1 || rowDpo.priz_ts == -1 || rowDpo.priz_ts == 2 || rowDpo.priz_ts == 3; // vyzadovano upresneni od uzivatele

                    that._NastavKategorieInternal(rowDpo);

                    if (useDialog && canUseDialog) {
                        return that.GetIxsDpoFromDialog();
                    }

                    def.resolve({ IxsDpo: rowDpo.ixs_dpo, signingReason: that._duvodPodpisuTxt, DuvodPodpisuTxt: that._duvodPodpisuTxt, MakePodpis: rowDpo.priz_podpis == 1, MakeZnacka: rowDpo.priz_znacka == 1, MakeTs: that._makeTS });

                } else if (that._ixsDpoList.length > 1 && canUseDialog) {

                    return that.GetIxsDpoFromDialog();
                } else {
                    def.resolve({ IxsDpo: null });
                }

                return def.promise();
            });
        };

        this.GetIxsDpoFromDialog = function () {
            var that = this;
            return this.loadingPromise.then(function () {
                var cnt = that._content;

                if (cnt instanceof Window) {
                    cnt = null;
                }
          
                var options = {
                    DpoList: that._ixsDpoList,
                };
                return Gordic.Gin.Dialogs.VyberDuvoduPodpisu(cnt, options, "showModalWindow").createDialogPromise()
                    .then(function (retVal) {
                        if (retVal && retVal.IxsDpo) {
                            that._duvodPodpisuTxt = retVal.duvod;
                            that._makeTS = retVal.ts;
                            that._wflsdpoConfig = retVal.wflsdpoConfig;

                            return { IxsDpo: retVal.IxsDpo, signingReason: retVal.duvod, DuvodPodpisuTxt: retVal.duvod, MakePodpis: retVal.wflsdpoConfig.PrizPodpis == 1, MakeZnacka: retVal.wflsdpoConfig.PrizZnacka == 1, MakeTs: retVal.ts };
                            //return that.InitBulkOperation(retVal.IxsDpo);
                        }

                        return $.Deferred().reject({ IxsDpo: null, ErrMsg: "jres:26275136" }).promise(); //RC 26275136 : Akce byla zrušena uživatelem.
                        //return { IxsDpo: null, signingReason: null, DuvodPodpisuTxt: null, MakeTs: false };

                    }, function (reason) {
                        return $.Deferred().reject({ IxsDpo: null, ErrMsg: "jres:26275136" }).promise(); //RC 26275136 : Akce byla zrušena uživatelem.
                    });
            });
        };

        // nahrazeno pruvodcem
        /*    this.CheckDuvodPodpisuTxt = function () {
                var dpoCheck = this._wflsdpoConfig && this._dpoEnabled; 
                var ret = $.Deferred().resolve({ DuvodPodpisu: dpoCheck ? this._duvodPodpisuTxt : ""}).promise();
    
                if (dpoCheck &&  this._wflsdpoConfig.PrizEditText == 1) 
                    return ret.then(function(data) { 
                        var l_sLabel = "jres:26275140"; //RC 26275140 : Důvod podpisu
    
                        return GDlg.prompt("jres:26275139", l_sLabel, data.DuvodPodpisu).createDialogPromise().then(function(retVal) { 
                            if (retVal && retVal.text && retVal.text.trim()) {
                                return { DuvodPodpisu: retVal.text };
                            } else {
                                return $.Deferred.reject({ ErrMsg: "jres:26275136" }).promise(); //RC 26275136 : Akce byla zrušena uživatelem.
                            }
                        });
                    });
                else return ret; 
            };*/

        this._NastavKategorieInternal = function (rowDpo) {
            this._ixsDpo = rowDpo.ixs_dpo;
            this._duvodPodpisuTxt = rowDpo.duvod_txt;
            this._makeTS = rowDpo.priz_ts == 1;
        };

        this.DpoEnabled = function () {
            this._checkLoaded();
            return this._dpoEnabled;
        };

        this.IxsDpo = function () {
            this._checkLoaded();
            return this._ixsDpo;
        };

        this.signingReason = function () {
            this._checkLoaded();
            return this._duvodPodpisuTxt;
        };

        // obsolete od 26.1.2021
        this.DuvodPodpisuTxt = function () {
            this._checkLoaded();
            return this._duvodPodpisuTxt;
        };

        this.DpoConfig = function () {
            this._checkLoaded();
            return this._wflsdpoConfig;
        };

        this.TypKtg = function () {
            this._checkLoaded();
            return this._typKtg;
        };

        /**
         *  @Deprecated  nepouziva se
         *  @returns {number} typ_ltv
         */
        this.TypeLTV = function () {
            this._checkLoaded();

            if (this._wflsdpoConfig == null) {
                return this._typLtv == null ? 0 : this._typLtv;
            }

            return this._wflsdpoConfig.TypLtv;
        };

        /// 0-obraz; 1 - priloha
        this.TypDokumentu = function () {
            this._checkLoaded();
            return this._typDok;
        };

        ///// Moznost zakazat pouziti EZ bez ohledu na param ci nastaveni DPO
        ///// Obsolete, nepouziva se
        //this.DisableEZ = function () {
        //    return this._disableEZ;
        //}

        /// Moznost zakazat pouziti EZ bez ohledu na param ci nastaveni DPO
        this.ZobrazitVyberDuvoduVzdy = function (value) {
            this._checkLoaded();
            if (value != null) {
                this._zobrazitVyberDuvoduVzdy = value;
            }
            return this._zobrazitVyberDuvoduVzdy;
        };

        /**
         * @deprecated  Použijte this.ZobrazitVyberDuvoduVzdy(true/false)
         */
        this.SetZobrazitVyberDuvoduVzdy = function (value) {
            this._checkLoaded();
            this._zobrazitVyberDuvoduVzdy = value;
        };

        /// priznak moznosti pouziti PODPIS
        this.CanAddSign = function () { // zatim se nikde nepouziva
            this._checkLoaded();

            if (this._wflsdpoConfig == null || this._wflsdpoConfig.PrizPodpis == -1 || !this._dpoEnabled) {
                return 1;
            }

            return this._wflsdpoConfig.PrizPodpis > 0 ? 1 : 0;
        };

        /// priznak moznosti pouziti CAS RAZ
        this.CanAddTS = function () {
            this._checkLoaded();

            if(this._wflsdpoConfig == null || this._wflsdpoConfig.PrizCasRaz == -1 || !this._dpoEnabled) {
                return this._cannAddTSParam > 0; // hodnota parametru gin_ele_pcasraz (0,1,2) Hodnota 2 je jen u konverzního dialogu a při jiném použití, třeba na upload dialogu, to nebude správné.
            }

            return this._wflsdpoConfig.PrizCasRaz > 0; // hodnota výčtu způsobu použití a přednastavení razítka (0,1,2,3)
        };

        this.GetElDokTsParam = function (typDok) {
            this._checkLoaded();

            if (this._wflsdpoConfig == null || this._wflsdpoConfig.PrizCasRaz == -1 || !this._dpoEnabled) {
                return typDok == 0 ? this._timeStampParamObr : this._timeStampParamPri;
            }

            return this._wflsdpoConfig.PrizCasRazToUse;
        }
        ///// Pozice obrázku přidávaného do PDF při podpisu
        ///// Záleží na konfiguraci DPO. Bud se pouzije toto nebo DB parametr (pokud ve wflsdpo je NULL)
        ///// Obsolete, nepouziva se
        //this.PicturePosition = function () {
        //    if(this._wflsdpoConfig == null || !this._dpoEnabled || this._wflsdpoConfig.PozVizPodpis == -1 || this._wflsdpoConfig.PozVizPodpis == null) {
        //        return this._pozVizPodpParam;
        //    } else {
        //        return this._wflsdpoConfig.PozVizPodpis;
        //    }
        //}

        /// Parametr rikajici jakou hodnotu pouzit pro vyber TS
        /// Zalezi na nacteni konf DPO. Bud se pouzije toto nebo DB parametr
        this.PrizCasRazToUse = function () {
            this._checkLoaded();

            if (this._wflsdpoConfig == null || this._wflsdpoConfig.PrizCasRaz == -1 || !this._dpoEnabled) {
                return -1;
            }

            return this._wflsdpoConfig.PrizCasRaz;
        };

        /// Parametr rikajici jakou hodnotu pouzit pro vyber TS pro typ dokumentu 0- obraz, 1-priloha
        /// Zalezi na nacteni konf DPO. Bud se pouzije toto nebo DB parametr
        this.GetMakeTsForTypDok = function (typDok) {
            this._checkLoaded();

            if (typDok == 0) {
                return this.MakeTsToUseElObraz();
            }

            return this.MakeTsToUseElPriloha();
        };

        /// Parametr rikajici jakou hodnotu pouzit pro vyber TS pro typ dokumentu 0- obraz, 1-priloha
        /// Zalezi na nacteni konf DPO. Bud se pouzije toto nebo DB parametr
        this.MakeTsForTypDok = function () {
            this._checkLoaded();
            if (this.TypDokumentu() == 0) {
                return this.MakeTsToUseElObraz();
            }

            return this.MakeTsToUseElPriloha();
        };

        /// Parametr rikajici jakou hodnotu pouzit pro vyber TS pro el obraz - vraci bool
        /// Zalezi na nacteni konf DPO. Bud se pouzije toto nebo DB parametr
        this.MakeTsToUseElObraz = function () {
            this._checkLoaded();

            if (this._dpoEnabled) {
                return this._makeTS;
            }

            return this._timeStampParamObr == 1;
        };

        /// Parametr rikajici jakou hodnotu pouzit pro vyber TS pro prilohu - vraci bool
        /// Zalezi na nacteni konf DPO. Bud se pouzije toto nebo DB parametr
        this.MakeTsToUseElPriloha = function () {
            this._checkLoaded();

            if (this._dpoEnabled) {
                return this._makeTS;
            }

            return this._timeStampParamPri == 1;
        }

        /// Parametr rikajici jakou hodnotu pouzit pro vyber TS pro obecny soubor - vraci bool
        /// Bere se jen z konfigurace DPO.
        this.MakeTsToUseCommonFile = function () {
            this._checkLoaded();

            if (this._dpoEnabled) {
                return this._makeTS;
            }

            // v tomto pripade by se funkce vubec nemela volat
            throw "Nelze určit. Nejsou zapnuty kategorie podpisu. Nutno použít původní obsluhu na formuláři.";

        };

        this.isLoaded = function () {
            return this.loadingPromise.state !== 'pending';
        };

        this._checkLoaded = function () {
            if (!this.isLoaded()) {
                throw new GError('Wait for KtgDpoDBParams to be loaded. Use KtgDpoSupport.loadingPromise or KtgDpoSupport.isLoaded or use for your Init method promise.')
            }
        };

        this.ForceValidateSignOnInsert = function () {
            return this._forceValidateSignOnInsert;
        }

        this.EnablePDFConversionOnInsert = function () {
            return this._enablePDFConversionOnInsert;
        }

        this.EnableStandaloneTimestamp = function () {
            return this._enableStandaloneTimestamp;
        }

        ///// Zda se maji Ignorovat DB parametry pro vyber certs
        ///// Obsolete, nepouziva se
        //this.IgnorovatParametry = function () {
        //    return this._ignorovatParametry;
        //}
    }

    function _GetSrv(cnt) {
        return cnt && !(cnt instanceof Window) && cnt.createServiceContent ? cnt.createServiceContent({ className: "Gordic.Gin.WebClient.GKtgDpoSupport", params: {} })
            : new GContent({ className: "Gordic.Gin.WebClient.GKtgDpoSupport", params: {} });  //servisni sluzba/content
    }

    return GKtgDpoSupport;
})(jQuery);

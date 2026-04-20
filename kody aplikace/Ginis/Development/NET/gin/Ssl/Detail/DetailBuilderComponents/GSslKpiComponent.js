(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslKpi: {

            create: function (detailContent, componentDto) {

                var result = {};
                result.onInit = [function (builder) {

                    var that = this;
                    // defaulní akce pro kpi panel, zde je nutné oifovat všechny panely včetně potonků
                    builder.kpiPanelOptions = $.extend({}, builder.kpiPanelOptions,  Gordic.Prefabs.Panels.kpiIconTwoRowsTextTemplate() ,
                        {
                            toolbarOptions: {
                                top: {
                                    allowMenuButton: true
                                }
                            },

                            tooltipOptions: function (kpiparam) {
                                if (kpiparam.name === "kpiTechnickeVlastnosti") {

                                    return { tooltip: componentDto.KpiTooltip };
                                }
                                if (kpiparam.name === "kpiKopieAPoznamka") {

                                    return { tooltip: componentDto.TextJeKopieAPoznamka };
                                }
                                if (kpiparam.name === "kpiPrizVBaliku") {
                                    
                                    return { tooltip: Gordic.Gin.Globals.Icons.VBaliku().tooltip };
                                }
                                if (kpiparam.name === "kpiDotceneSubjekty") {

                                    return { tooltip: componentDto.KpiDotceneSubjektyTooltip };
                                }
                                if (kpiparam.name === "kpiOdeslaneZasilky") {

                                    return { tooltip: "jres:31937433" }; //RC 31937433 : Zásilky celkem / Odeslané / Vypravené / Doručené
                                }
                            },
                            toolbar: {
                                top: function (menuParams) {

                                    //#region -- nastavení analogové formy --
                                    var menu = [];
                                    if (menuParams.name === "kpiEntita" && componentDto.IsDocWithoutForm === true) {
                                        
                                        var paramSetAnalog = {
                                            action: new GAction({
                                                name: "selectBtnAnalogForm",
                                                icon: "gi-paper",
                                                caption: "",
                                                tooltip: 'jres:32000106', //RC 32000106 : Nastavit analogovou formu
                                                run: function (ev, ctx) {

                                                    if (that.gcontentForma == null) 
                                                        that.gcontentForma = detailContent.createServiceContent("Gordic.Wfl.WebClient.GFormaDokSpis");

                                                    that.gcontentForma.call("Save", {
                                                        Ixp: componentDto.ixp,
                                                        SFyz: 2,
                                                        SEle: 0
                                                    }).then(function () {
                                                        that.tryReloadDetail();
                                                    });
                                                }
                                            })
                                        };
                                        menu.push(paramSetAnalog);
                                        return menu;
                                    }
                                    else if (menuParams.name === "kpiTechnickeVlastnosti") {
                                       
                                        var paramsPocetPodpisu = {
                                            action: new GAction({
                                                name: "actPocetPodpisu",
                                                //icon: "gi-paper",
                                                //caption: componentDto.KpiSignCount,
                                                tooltip: componentDto.KpiTooltip, 
                                                run: function (ev, ctx) {
                                                    that.clickKpiTechnickeVlastnosti(); 
                                                }
                                            }),
                                            badge: {  //ref T24079
                                                id: "badgePocetPodpisu",
                                                value: componentDto.KpiSignCount,
                                                tooltip: componentDto.KpiTooltip,
                                                customClass: "g-state-info" //zobrazeni, akt. moznosti: g-state-info, g-state-important, g-state-warning, g-state-error
                                            }
                                        };
                                        menu.push(paramsPocetPodpisu);
                                        return menu;
                                    }
                                    else if (menuParams.name === "kpiDotceneSubjekty") {
                                        if (componentDto.JeVeSpisu || componentDto.PrirazenoKeSpisu || componentDto.JeVSoucastiNeboTypovemSpisu) {
                                            var ixp = null;
                                            if (componentDto.IxpSpisPrir) {
                                                ixp = componentDto.IxpSpisPrir;
                                            }
                                            else if (componentDto.TypSpis == 0 && componentDto.IxpSpisWfl) { // dokument ve spisu
                                                ixp = componentDto.IxpSpisWfl;
                                            } else if (componentDto.TypSpis == 1 && componentDto.IxpSoucast) {// spis v součásti
                                                ixp = componentDto.IxpSoucast;
                                            } else if (componentDto.TypSpis == 4 && componentDto.IxpSoucast) { // díl v součásti
                                                ixp = componentDto.IxpSoucast;
                                            } else if ((componentDto.TypSpis == 3 || componentDto.TypSpis == 5) && componentDto.IxpSpisWfl) { // součást v součásti nebo typovém spisu
                                                ixp = componentDto.IxpSpisWfl;
                                            }
                                            var paramsPocetPodpisu = {
                                                action: new GAction({
                                                    name: "actkpiDotceneSubjektySpis",
                                                    icon: "gi-spis",
                                                    //caption: componentDto.KpiSignCount,
                                                    tooltip: "jres:31937468", //RC 31937468 : Dotčené subjekty spisu
                                                    run: function (ev, ctx) {

                                                        if (detailContent.dotceneSubjekty) {
                                                            detailContent.dotceneSubjekty(ixp);
                                                        }
                                                    }
                                                })
                                            };
                                            menu.push(paramsPocetPodpisu);
                                            return menu;
                                        }
                                    }
                                    
                                    
                                    return [];
                                 
                                    //#endregion
                                }
                            },
                         
                            defaultAction: new GAction({
                                name: "actEntitaKpis",
                                run: function (ev, ctx) {
                                    //if (ctx.item.data.name === "kpiEntita") {
                                    //    detailContent.formaDokumentu(); //, Gordic.Global.Enums.ModOtevreni.navigateTask
                                    //}

                                    if (ctx.item.data.name === "kpiIsEpkPanel") {
                                        if (detailContent && detailContent.schvalovaciProces) {
                                            detailContent.schvalovaciProces();
                                        }

                                        /*
                                        var panelSEPK = detailContent.element.gsidebar("getPanel", "panelEpk");
                                        if (panelSEPK && panelSEPK.length > 0) {
                                            panelSEPK.gsbpanel("show");
                                        }
                                        */
                                    }

                                    //if (ctx.item.data.name === "kpiPoziceSpis") {
                                    //    detailContent.detailSpisu(); //, Gordic.Global.Enums.ModOtevreni.navigateTask
                                    //}
                                    
                                    //if (ctx.item.data.name === "kpiTechnickeVlastnosti") {
                                    //    detailContent.clickKpiTechnickeVlastnosti();                                     
                                    //}
                                    
                                }
                            }),
                        }
                    );
                    this.moveKpiPosouzeni(builder);
                }];
                    
                result.onBuild = [function (builder) {
                    this.showFlashJinaAgenda();
                    this.SslKpisNastavKpi();
                    this.SslKpisnastavKorokyFlash();
                    

                }];
                result.contentExtensions = { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                    moveKpiPosouzeni: function (builder) {
                        if (builder && builder.kpiDefinitions) {
                            //builder.kpiDefinitions.map((elem, index) => {
                            //    if (elem.name === "kpiPosouzeni") {
                            //        builder.kpiDefinitions.splice(index, 1);
                            //        builder.kpiDefinitions.push(elem);
                            //    }
                            //})
                            var indexKpi = null;
                            for (var i = 0; i < builder.kpiDefinitions.length; i++) {
                                if (builder.kpiDefinitions[i].name === "kpiPosouzeni") {
                                    indexKpi = i;
                                }
                            }
                            if (indexKpi != null) { 
                                builder.kpiDefinitions.push(builder.kpiDefinitions.splice(indexKpi, 1)[0]);
                            }
                        }
                    },


                    SslKpisNastavKpi: function () {

                        //ukazka
                        //if (this.kpis.kpiOne) {
                        //    this.kpis.kpiOne.value = 25;
                        //    this.kpis.kpiOne.data = 25;
                        //    //this.kpis.kpiOne.update();
                        //    this.kpis.kpiOne.update();
                        //}

                        var ikonaStav = "fa-fw";
                        var textStav = "";
                        var entitaTextRow1 = "";
                        var entitaTextRow2 = "";
                        var entitaIcon = "fa-fw";
                        var technickeVlastnostiText = "";
                        var technickeVlastnostiIcon = "fa-fw";

                        var poziceSpisText = "";
                        var poziceSpisIcon = "fa-fw";
                        
                        var polestavu = null;
                        if (this.WflStatusBar_Dto) {
                            polestavu = this.WflStatusBar_Dto.koleckeIkonDoStatusBaru;
                        }
                        
                        if (polestavu) {
                            for (var i = 0; i < polestavu.length; i++) {
                                //stav
                                if (polestavu[i].name === "actStavZpracovaniStatus") {
                                    ikonaStav = polestavu[i].icon;
                                    textStav = polestavu[i].tooltip;
                                }

                                // typ entity
                                if (polestavu[i].name === "actTypEntityStatus") {
                                    entitaIcon = polestavu[i].icon;
                                    entitaTextRow1 = polestavu[i].txtRow1;
                                    entitaTextRow2 = polestavu[i].txtRow2;
                                }

                                // technicke vlastnosti
                                if (polestavu[i].name === "actTechnickeVlastnostiStatus") {
                                    technickeVlastnostiIcon = polestavu[i].icon;
                                    technickeVlastnostiText = polestavu[i].tooltip;
                                }

                                // pozice spis
                                if (polestavu[i].name === "actPoziceSpisStatus") {
                                    poziceSpisIcon = polestavu[i].icon;
                                    poziceSpisText = polestavu[i].tooltip;
                                }
                            }
                        }

                        if (this.kpis.kpiStav) {
                            this.kpis.kpiStav.icon = ((ikonaStav === "fa-fw") || (ikonaStav && (ikonaStav.length > 0) && ( ikonaStav[0] === "fa-fw" )) ) ? undefined : ikonaStav ;
                            var temIcoText = null;
                            if (ikonaStav && Array.isArray(ikonaStav)) {
                                temIcoText = ikonaStav[0];
                            } else {
                                temIcoText = ikonaStav;
                            }
                            var meaning = undefined;
                            if (temIcoText) { //g-state-info, g-state-important, g-state-warning, g-state-error
                                if (temIcoText.indexOf("g-state-info") !== -1) {
                                    meaning = "info";
                                }
                                if ((temIcoText.indexOf("g-state-important") !== -1) || (temIcoText.indexOf("g-state-error") !== -1)) {
                                    meaning = "negative";
                                }
                                if (temIcoText.indexOf("g-state-success") !== -1) {
                                    meaning = "positive";
                                }
                            }

                            this.kpis.kpiStav.meaning = meaning;//componentDto.stav_pisColour;
                            this.kpis.kpiStav.primaryText = textStav;    
                            //this.kpis.kpiStav.secondaryText = componentDto.stav_pisTxt;              
                            this.kpis.kpiStav.update();
                        }
                        if (this.kpis.kpiEntita) {
                            this.kpis.kpiEntita.icon = entitaIcon;
                            this.kpis.kpiEntita.primaryText = entitaTextRow1;
                            this.kpis.kpiEntita.secondaryText = entitaTextRow2;
                            this.kpis.kpiEntita.update();
                        }

                        if (this.kpis.kpiPoziceSpis) {
                            if (poziceSpisText != null && poziceSpisText != "") {
                                this.kpis.kpiPoziceSpis.action.visible(true);
                                this.kpis.kpiPoziceSpis.icon = poziceSpisIcon;
                                this.kpis.kpiPoziceSpis.primaryText = poziceSpisText;
                                //this.kpis.kpiPoziceSpis.secondaryText = poziceSpisText;
                                this.kpis.kpiPoziceSpis.update();
                            } else {
                                this.kpis.kpiPoziceSpis.action.visible(false);
                            }
                            
                        }
                        
                        if (this.kpis.kpiKopieAPoznamka) {
                            //this.kpis.kpiKopieAPoznamka.icon = poziceSpisIcon;
                            //this.kpis.kpiKopieAPoznamka.primaryText = poziceSpisText;
                            var textKpiPoznamka = componentDto.TextJeKopieAPoznamka;
                            if (textKpiPoznamka && textKpiPoznamka.length > 26) {
                                textKpiPoznamka = textKpiPoznamka.substr(0, 25) + "...";
                            }
                            this.kpis.kpiKopieAPoznamka.secondaryText = textKpiPoznamka;
                            this.kpis.kpiKopieAPoznamka.update();
                        }

                        if (this.kpis.kpiTechnickeVlastnosti) {
                            this.kpis.kpiTechnickeVlastnosti.icon = technickeVlastnostiIcon;
                             
                            //this.kpis.kpiTechnickeVlastnosti.primaryText = componentDto.KpiPodpisText1;
                            //this.kpis.kpiTechnickeVlastnosti.secondaryText = componentDto.KpiPodpisText2; 

                            //this.kpis.kpiTechnickeVlastnosti.primaryText = componentDto.KpiSignCount;
                            //this.kpis.kpiTechnickeVlastnosti.secondaryText = componentDto.KpiSignCount;
                            //this.kpis.kpiTechnickeVlastnosti.bigValue = componentDto.KpiSignCount;
                            this.kpis.kpiTechnickeVlastnosti.details = [];
                            if (componentDto.KpiPodpisText1 != null || componentDto.KpiPodpisText2 != null) {
                                if (componentDto.KpiPodpisText1) this.kpis.kpiTechnickeVlastnosti.details.push({ description: componentDto.KpiPodpisText1 });
                                if (componentDto.KpiPodpisText2) this.kpis.kpiTechnickeVlastnosti.details.push({ description: componentDto.KpiPodpisText2 });
                            } else {
                                this.kpis.kpiTechnickeVlastnosti.details.push({ description: "jres:31937178"}); //RC 31937178 : Podpis neověřen
                            }
                            this.kpis.kpiTechnickeVlastnosti.update();
                        }

                        if (this.kpis.kpiDilciTermin) {
                            var dat_spl_Dil = Gordic.Utils.DateTime.getStartOfDay(new Date(componentDto.TerminDilciDate))                                                                          // datum splatnosti
                            var dat_dns_Dil = Gordic.Utils.DateTime.getStartOfDay(new Date());
                            // dnešní datum
                            var prekrocenTermin = false;
                            var rozdil = Gordic.Utils.DateTime.diff(dat_dns_Dil, dat_spl_Dil, 'days');
                            if (rozdil < 0) {
                                prekrocenTermin = true;
                            }

                            var rozdilAbs = Math.abs(rozdil);                                                                   // rozdíl dnů - absolutní hodnota

                            this.kpis.kpiDilciTermin.value = rozdilAbs;                                                                                        // naplnění value

                            this.kpis.kpiDilciTermin.icon = prekrocenTermin ? "gi-vyrizenopo_bold  g-state-text g-state-error" : "gi-vyrizenopred_bold  g-state-text g-state-warning";
                            this.kpis.kpiDilciTermin.primaryText = prekrocenTermin ? "jres:31937092" : "jres:31937091";             //RC 31937092 : Počet dní <b>po dílčím termínu</b>
                            this.kpis.kpiDilciTermin.secondaryText = rozdilAbs;
                            this.kpis.kpiDilciTermin.secondaryText = "<b>" + Gordic.Templates.Formatters.datetime(new Date(componentDto.TerminDilciDate), "d.M.yyyy") + "</b>"
                                + " jres:31937171"  //RC 31937171 : to je
                                + " <b>" + rozdilAbs + "</b>"
                                + " jres:26256072"; //RC 26256072 : dní
                            this.kpis.kpiDilciTermin.meaning = prekrocenTermin ? "negative" : "warning"; //"positive" "info"
                            this.kpis.kpiDilciTermin.update();
                        }
                        if (this.kpis.kpiDotceneSubjekty) {
                            var textDotceneSubjekty = componentDto.PocetSubjektuEntity;

                            if (componentDto.PocetSubjektuNaSpisuVeKteremJeEntitaVlozena != null) {
                                textDotceneSubjekty = textDotceneSubjekty + " / " + componentDto.PocetSubjektuNaSpisuVeKteremJeEntitaVlozena;
                            }
                            this.kpis.kpiDotceneSubjekty.secondaryText = textDotceneSubjekty;
                            this.kpis.kpiDotceneSubjekty.update();
                        }

                        if (this.kpis.kpiOdeslaneZasilky) {
                            var textOdeslaneZasilky = "0 / 0 / 0 / 0";
                            
                            var meaning = undefined;
                            /*
                                case Meaning.positive:
                                case Meaning.success:
                                element.addClass("positive-value"); break;
                                case Meaning.negative:
                                case Meaning.error:
                                element.addClass("negative-value"); break;
                                case Meaning.info:
                                element.addClass("neutral-value"); break;
                                case Meaning.important:
                                element.addClass("important-value"); break;
                                case Meaning.warning:
                                element.addClass("warning-value"); break;
                                case Meaning.normal:
                                element.addClass("neutral-value-black"); break;
                                case Meaning.purple:
                                element.addClass("purple-value"); break;
                                case Meaning.yellow:
                                element.addClass("yellow-value"); break;
                            */

                            
                            if (componentDto.KpiOdeslaneZasilkyDto) {
                                textOdeslaneZasilky =
                                    (componentDto.KpiOdeslaneZasilkyDto.celkem ? componentDto.KpiOdeslaneZasilkyDto.celkem : "0") + " / " +
                                    (componentDto.KpiOdeslaneZasilkyDto.odeslane ? componentDto.KpiOdeslaneZasilkyDto.odeslane : "0") + " / " +
                                    (componentDto.KpiOdeslaneZasilkyDto.vypravene ? componentDto.KpiOdeslaneZasilkyDto.vypravene : "0") + " / " +
                                    (componentDto.KpiOdeslaneZasilkyDto.dorucene ? componentDto.KpiOdeslaneZasilkyDto.dorucene : "0");


                                if (componentDto.KpiOdeslaneZasilkyDto.celkem > 0) {
                                    meaning = "warning";
                                    if (componentDto.KpiOdeslaneZasilkyDto.celkem === componentDto.KpiOdeslaneZasilkyDto.dorucene) {
                                        meaning = "positive";
                                        textOdeslaneZasilky =
                                            "<b>" + (componentDto.KpiOdeslaneZasilkyDto.celkem ? componentDto.KpiOdeslaneZasilkyDto.celkem : "0") + "</b> / " +
                                            (componentDto.KpiOdeslaneZasilkyDto.odeslane ? componentDto.KpiOdeslaneZasilkyDto.odeslane : "0") + " / " +
                                            (componentDto.KpiOdeslaneZasilkyDto.vypravene ? componentDto.KpiOdeslaneZasilkyDto.vypravene : "0") + " / " +
                                            "<b>" + (componentDto.KpiOdeslaneZasilkyDto.dorucene ? componentDto.KpiOdeslaneZasilkyDto.dorucene : "0") + "</b>";
                                    }
                                } 
                            }
                            this.kpis.kpiOdeslaneZasilky.meaning = meaning;
                            this.kpis.kpiOdeslaneZasilky.secondaryText = textOdeslaneZasilky;
                            this.kpis.kpiOdeslaneZasilky.update();
                        }
                        
                    },

                    SslKpisnastavKorokyFlash: function () {
                       
                        //componentDto.TrasaUserInfoOAktualnimKrokuTrasyPisemnosti 
                        //componentDto.PorCisloTrasy
                        //componentDto.LzeTrasy 
                        //componentDto.ButtonSplnitEnabled
                        //componentDto.ButtonAnoEnabled
                        //componentDto.ButtonNeEnabled
                        //componentDto.ButtonSplnitVisible 
                        //componentDto.ButtonAnoNeVisible 
                        if (componentDto.LzeTrasy) { 
                            //label
                            var label = $("<a>").html(componentDto.TrasaUserInfoOAktualnimKrokuTrasyPisemnosti);

                            if (componentDto.ButtonSplnitVisible) { 
                                //label = label.add($("&nbsp; &nbsp; &nbsp;"));
                                this.actions.actSslKpisTrasaSplnit.enabled(componentDto.ButtonSplnitEnabled);
                                label = label.add($("<a>").glink({
                                    params: {
                                        action: this.actions.actSslKpisTrasaSplnit
                                    },
                                    }));
                            }

                            if (componentDto.ButtonAnoNeVisible) {
                                
                                this.actions.actSslKpisTrasaAno.enabled(componentDto.ButtonAnoEnabled);
                                this.actions.actSslKpisTrasaNe.enabled(componentDto.ButtonNeEnabled);
                                label = label.add($("<a>").glink({
                                    params: {
                                        action: this.actions.actSslKpisTrasaAno
                                    },
                                    
                                }));
                                label = label.add($("<a>").glink({
                                    params: {
                                        action: this.actions.actSslKpisTrasaNe
                                    },
                                }));
                            }
                            var divik = $("<div>").gflashpanel({ icon: "fa-plane", label: label, noClose: true, customClass: undefined });; //g-state-warning
                            this.element.find(".header-form").before(divik);
                        }
                    },
                    SslKpisSplnitClick: function (event) {
                        this.SslKpisGIAT_UserClickInternal(1);
                    },
                    SslKpisAnoClick: function () {

                        this.SslKpisGIAT_UserClickInternal(1);
                    },
                    SslKpisNeClick: function (clientID) {

                        SslKpisGIAT_UserClickInternal(0, clientID);
                    },
                    SslKpisGIAT_UserClickInternal: function (UserChoice) {  // internal
                        var that = this;
                        this.beginOperation("jres:26256622"); //RC 26256622 : Realizuje se aktuální krok trasy.
                        var opt = {
                            "ixp": componentDto.ixp,
                            "porCislo": componentDto.PorCisloTrasy,
                            "response": UserChoice
                        };
                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                        srv.call("RealizaceKrokuTrasy", opt)
                            .done(function (retVal) {
                                that.endOperation();
                                if (retVal.StavBool) {

                                    that.tryReloadDetail(undefined, {
                                        flashMessage: "jres:31937024", //RC 31937024 : Proběhla realizace kroku trasy
                                        flashMessageClass: "g-state-success",
                                    });
                                } else {
                                    that.dialogs.alert("jres:31937087"); //RC 31937087 : Nelze provést realizaci kroku trasy
                                }
                            }).fail(function () {
                                that.endOperation();
                                that.dialogs.alert("jres:31937087"); //RC 31937087 : Nelze provést realizaci kroku trasy
                            }).always(function () { srv.close(); });
                    },

                    //akce po kliku na technické vlastnosti, takže nejčastěji podpis
                    clickKpiTechnickeVlastnosti: function () {
                        //actOveritPodpis
                        var that = this;
                        if (componentDto.Ixb) { 
                            Gordic.Wfl.Dialogs.HistorieOvereniDlg(this, { Ixb: componentDto.Ixb, mode: 0 });
                        }
                        /* // dřívější postup, kdy se pouštělo ověření podpisu
                        this.beginOperation();
                        var prilohyDiv = this.find('[data-param-id="tabAttachments"]').gtab("open");
                        if (prilohyDiv && prilohyDiv.length > 0) {
                            prilohyDiv.gtab("open");
                            prilohyDiv.gcontent('loadingAwait').done(function (o1, o2) {
                                var contentPriloh = $.content(prilohyDiv);
                                var grid = contentPriloh.element.find('.gattachmentgrid');
                                if (grid.length > 0) {
                                    var updateActionsDeferred = grid.gattachmentgrid('getUpdateActionsDeferred');
                                    updateActionsDeferred.done(function () {
                                        if (contentPriloh && contentPriloh.actions && contentPriloh.actions.actOveritPodpis && contentPriloh.actions.actOveritPodpis.enabled()) {
                                            contentPriloh.actions.actOveritPodpis.run(); // spustí akci ověření podpisů
                                            that.endOperation();
                                        }
                                    });
                                }
                            });
                        }
                        */
                    },

                    clickKpiPosouzeni: function () {
                        var that = this;
                        if (componentDto.gin_epk_schval != null && componentDto.gin_epk_schval !== 0) {
                            var opt = {
                                Ixp: componentDto.ixp
                            };
                            Gordic.Wfl.Dialogs.GSchvalovaciProcesPozadavekDlg(this, opt)
                                .done(function (retval) {
                                    //if (retval && retval.stav) {
                                    //    that.element.trigger(eventName, Gordic.Wfl.WebClient.WflOps.prepareOpts(ops.schvalovaciProces));
                                    //}
                                    that.tryReloadDetail();
                                });
                        }
                        else {
                            if (componentDto.JeEpkPosouzeni) {
                                var opt = {
                                    Ixp: componentDto.ixp,
                                    IxsFun: componentDto.IxsFun
                                }
                                Gordic.Wfl.WebClient.GWflDetailUtils.Posoudit(this, opt);
                            } else {
                                var options = {
                                    ListIxp: [componentDto.ixp],
                                    HromadnaAkceDokumenty: true
                                };
                                Gordic.Wfl.Dialogs.ZadostOPodpisDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                    .on("closed", function (ev, retVal) {
                                        that.tryReloadDetail();
                                    });
                            }
                        }
                    },
                    
                    showFlashJinaAgenda: function () {
                        this.hideFlash("jinaAgendaFlash");
                        if (componentDto.JinaAgenda || componentDto.JinejExterniSystem) {
                            var label = $("<a>").html("");
                            if (componentDto.JinaAgenda) { 
                                label = label.add($("<a>").html("jres:31937575 ")); //RC 31937575 : Vedeno v jiné agendě
                                //this.actions.actOtevriAgenduVNoveZalozceFlash.enabled(true);
                                if (componentDto.TextJinaAgenda) { 
                                    this.actions.actOtevriAgenduVNoveZalozceFlash.update({ caption: componentDto.TextJinaAgenda });
                                    label = label.add($("<a>").glink({
                                        params: {
                                            action: this.actions.actOtevriAgenduVNoveZalozceFlash
                                        },
                                    }));
                                }
                            }
                            if (componentDto.JinejExterniSystem) {
                                label = label.add($("<a>").html(" jres:31937576 ")); //RC 31937576 : Externí systém:
                                //this.actions.actOtevriAgenduVNoveZalozceFlash.enabled(true);
                                this.actions.actOtevriExterniSystemVNoveZalozceFlash.update({ caption: componentDto.TextJinejExterniSystem });
                                label = label.add($("<a>").glink({
                                    params: {
                                        action: this.actions.actOtevriExterniSystemVNoveZalozceFlash
                                    },
                                }));
                            }


                            this.showFlash(
                                //"jres:31937206".format(componentDto.TextJinaAgenda), //RC 31937206 : Vedeno v jiné agendě {0}
                                label,
                                "warning",
                                "jinaAgendaFlash");
                        }
                        
                        
                    },

                    clickKopieAPoznamka: function () {
                        
                        var that = this;

                        /*
                        this.beginOperation();
                        var prilohyDiv = this.find('[data-param-id="tabAttachments"]').gtab("open");
                        if (prilohyDiv && prilohyDiv.length > 0) {
                            prilohyDiv.gtab("open");
                            prilohyDiv.gcontent('loadingAwait').done(function (o1, o2) {
                                that.endOperation();
                            });

                        }
                        */
                        var tabManager = this.find('.' + Gordic.Gin.DetailBuilder.classes.tabmanager); //.gtabmanager("GetActive")
                        if (tabManager.hasClass('gtabmanager')) {
                            tabManager.gtabmanager("setActive", "tgPrilohy");
                          
                        }
                    },

                    detailSpisuKpiComponent: function () {
                        var that = this;
                        var ixp = null;
                        if (componentDto.IxpSpisPrir) {
                            ixp = componentDto.IxpSpisPrir;
                        }
                        else if (componentDto.TypSpis == 0 && componentDto.IxpSpisWfl) { // dokument ve spisu
                            ixp = componentDto.IxpSpisWfl;
                        } else if (componentDto.TypSpis == 1 && componentDto.IxpSoucast) {// spis v součásti
                            ixp = componentDto.IxpSoucast;
                        } else if (componentDto.TypSpis == 4 && componentDto.IxpSoucast) { // díl v součásti
                            ixp = componentDto.IxpSoucast;
                        } else if ((componentDto.TypSpis == 3 || componentDto.TypSpis == 5) && componentDto.IxpSpisWfl) { // součást v součásti nebo typovém spisu
                            ixp = componentDto.IxpSpisWfl;
                        }

                        if (ixp) {
                            var opt = {
                                DetailDto: {
                                    ixp: ixp
                                },
                            };
                            this.otevriNovyDetail(opt);
                        }
                    }
                };
                //bar = 0,
                //pie = 1,
                //line = 2,
                //area = 3,
                //liquid = 4,
                //gauge = 5,
                //gauge2 = 6,
                //valueCard = 7
                result.kpis = [];
                /*
                // trasy
                if (componentDto.TrasaUserInfoOAktualnimKrokuTrasyPisemnosti) {
                    var valueTxt = "";
                    if (componentDto.ButtonSplnitVisible) {
                        valueTxt = valueTxt + "Splňit";
                    }
                    if (componentDto.ButtonAnoNeVisible) {
                        valueTxt = valueTxt + "Ano    Ne";
                    }
                    result.kpis.push(
                        new GObservableObject({
                            name: "kpiSteps",
                            //chartType: "valueCard",
                            icon: "gi-group g-state-text g-state-warning",
                            //titlePosition: "left", //right left
                            title: "jres:31937088", //RC 31937088 : Krok trasy
                            //chartVisible: false,
                            //meaning: "positive",
                            unit: " ",
                            text: componentDto.TrasaUserInfoOAktualnimKrokuTrasyPisemnosti.replace("jres:31937089",""),//, //RC 31937089 : Krok trasy:
                            isCurrency: false,
                            value: valueTxt,
                           
                            actionOnTitle: false,
                            action: new GAction({
                                name: "selectTermSpiPredKpi",
                                caption: "asdasdasdasd", //RC 26256752 : Vybrat
                                run: function (ev, ctx) {
                                    var dlg = null;
                                    var closeFun = function () {
                                        dlg.ginlinedialog("close");
                                    }

                                    var arrayofAct = [];
                                    arrayofAct.push({
                                        actionContext: { inlineDlgClsoeFun: closeFun },
                                        action: detailContent.actions.actSslKpisTrasaOkno
                                    });

                                    if (componentDto.ButtonSplnitVisible) {
                                        //label = label.add($("&nbsp; &nbsp; &nbsp;"));
                                        detailContent.actions.actSslKpisTrasaSplnit.enabled(componentDto.ButtonSplnitEnabled);
                                        arrayofAct.push({
                                            actionContext: { inlineDlgClsoeFun: closeFun },
                                            action: detailContent.actions.actSslKpisTrasaSplnit
                                        });
                                    }

                                    if (componentDto.ButtonAnoNeVisible) {

                                        detailContent.actions.actSslKpisTrasaAno.enabled(componentDto.ButtonAnoEnabled);
                                        detailContent.actions.actSslKpisTrasaNe.enabled(componentDto.ButtonNeEnabled);
                                        arrayofAct.push({
                                            actionContext: { inlineDlgClsoeFun: closeFun },
                                            action: detailContent.actions.actSslKpisTrasaAno
                                        });
                                        arrayofAct.push({
                                            actionContext: { inlineDlgClsoeFun: closeFun },
                                            action: detailContent.actions.actSslKpisTrasaNe
                                        });

                                    }


                                    var frmPoznamka = new Gordic.Forms.Form("L-0-12-0 M-0-12-0 S-0-12-0")
                                        .addRow()
                                        .addField("gbuttonpanel", {
                                            mode: "link",
                                            customClass: "gbuttonpanel--transparent",
                                            params: arrayofAct
                                        });
                                        
                                    
                                    var dialogOpts ={
                                        autoClose: true,
                                        related: $(ev.currentTarget), // this.element NOTE: Musi byt table, jinak zlobi padding a pozice. V UCR je lehce posunute (asi o 1px)
                                    }
                                    var isImmediateClose = true;
                                    if (isImmediateClose) {
                                        dialogOpts.commandBar = [];
                                        dialogOpts.closeButton = null;
                                        dialogOpts.createClosed = true; //NOTE: Musi byt vytvoreno skryte a az po vytvoreni otevrit, aby se vyvolala udalost 'open' v momente, kdy jsou jiz registrovane ev. handlery
                                    }

                                    dlg = Gordic.InlineDialogs.simpleForm({
                                        formDescriptor: frmPoznamka,
                                        data: {as:"asssss"},
                                        options: dialogOpts
                                    });

                                    dlg.ginlinedialog("open");
                                }
                            })
                        })
                    );
                }
                */

                //entita
                result.kpis.push(
                    new GObservableObject({ //observable object bude přidán do this.kpis.kpiOne 
                        name: "kpiEntita",
                        //icon: "fa-fw",
                        primaryText: "jres:31937144",  //RC 31937144 : Entita
                        action: new GAction({
                            name: "actKpiEntita", caption:"", run: function () { //RC 29250138 : Vybrat
                                detailContent.formaDokumentu();
                            }
                        })
                        //secondaryText: "",
                    })
                );
                if (componentDto.JeVeSpisu || componentDto.PrirazenoKeSpisu || componentDto.JeVSoucastiNeboTypovemSpisu) {
                    result.kpis.push(
                        new GObservableObject({ //observable object bude přidán do this.kpis.kpiOne 
                            name: "kpiPoziceSpis",
                            icon: "fa-fw",
                            primaryText: "",  //RC 31937159 : Ve spisu
                            //secondaryText: "",
                            action: new GAction({
                                name: "actKpiPoziceSpis", caption: "", run: function () { //RC 29250138 : Vybrat
                                    detailContent.detailSpisuKpiComponent(); //, Gordic.Global.Enums.ModOtevreni.navigateTask
                                }
                            }),
                            toolbar: {
                                top: function () {
                                    return [ {
                                        action: new GAction(
                                                Gordic.Wfl.PreActions.OtevriDokumentDoNoveZalozkyVeStejneFazi({
                                                //inputData: {
                                                //    ixp: componentDto.ixp
                                                //},
                                                inputData: function () {
                                                    var ixp = null;
                                                    if (componentDto.IxpSpisPrir) {
                                                        ixp = componentDto.IxpSpisPrir;
                                                    }
                                                    else if (componentDto.TypSpis == 0 && componentDto.IxpSpisWfl) { // dokument ve spisu
                                                        ixp = componentDto.IxpSpisWfl;
                                                    } else if (componentDto.TypSpis == 1 && componentDto.IxpSoucast) {// spis v součásti
                                                        ixp = componentDto.IxpSoucast;
                                                    } else if (componentDto.TypSpis == 4 && componentDto.IxpSoucast) { // díl v součásti
                                                        ixp = componentDto.IxpSoucast;
                                                    } else if ((componentDto.TypSpis == 3 || componentDto.TypSpis == 5) && componentDto.IxpSpisWfl) { // součást v součásti nebo typovém spisu
                                                        ixp = componentDto.IxpSpisWfl;
                                                    }
                                                    return { ixp: ixp };
                                                },
                                                done: function (retVal) {
                                                    ;
                                                },
                                                fail: function () {
                                                    $.content(this).showFlash(
                                                        "jres:31937457", //RC 31937457 : Novou záložku se nepodařilo otevřít.
                                                        Gordic.Global.Enums.ColorStateClass.error,
                                                        undefined,
                                                        "actOteveniNoveZalozky"
                                                    );
                                                },
                                                actionParams: {
                                                    name: "actOtevreSpisDoNoveZalozky",
                                                    icon: "fa-external-link",
                                                    captionVisible: "never",
                                                    tooltip: 'jres:31937456', //RC 31937456 : Otevře spis do nové záložky
                                                }
                                           
                                            })
                                        )
                                    }];
                                }
                            }
                        })
                    );
                }
                
                if (componentDto.JsouTechnickeVlastnosti) {
                    result.kpis.push(
                        new GObservableObject({ //observable object bude přidán do this.kpis.kpiOne 
                            name: "kpiTechnickeVlastnosti",
                            icon: "fa-fw",
                            //primaryText: componentDto.KpiSignCount, //"jres:26256014", //RC 26256014 : Podpis
                            //secondaryText: componentDto.KpiSignCount,
                            customClass: "kpi-technickeVlastnosti",
                            detailsDirection: "vertical",//"horizontal",
                            meaning:"important",
                            //details:[
                            //    {
                            //        description: componentDto.KpiPodpisText1
                            //    },
                            //    {
                            //        description: componentDto.KpiPodpisText2
                            //    }
                            //],

                            //details: [{ description: " " }, { description: " " }],
                        
                            //secondaryText: ""
                            action: new GAction({
                                name: "actKpiTechnickeVlastnosti", caption: "", run: function () { //RC 29250138 : Vybrat
                                    detailContent.clickKpiTechnickeVlastnosti(); 
                                }
                            })
                        })
                    );
                }
                result.kpis.push(
                    new GObservableObject({ //observable object bude přidán do this.kpis.kpiOne 
                        name: "kpiStav",
                        icon: "gi-detail",
                        primaryText: "jres:26255513", //RC 26255513 : Stav
                        //secondaryText: ""
                        action: new GAction({
                            name: "actkpiStav", caption: "", run: function () { //RC 29250138 : Vybrat
                                if (componentDto.StavPis === 90) {
                                    if (componentDto.IxpPrior != null) {
                                        
                                        var opt = {
                                            DetailDto: {
                                                ixp: componentDto.IxpPrior
                                            }
                                        };
                                        detailContent.otevriNovyDetail(opt);
                                    }
                                }
                            }
                        })
                    })
                );
                
                // trasy
                if (componentDto.psDsgZpravyVisible) {
                    var valueTxt = componentDto.pocetDsgZprav;
                    result.kpis.push(
                        new GObservableObject({
                            name: "kpiDsg",
                            icon: "gi-mail",
                            meaning:"info",
                            primaryText: "jres:31937090", //RC 31937090 : Zprávy DSG
                            secondaryText: valueTxt
                            /*
                            action: new GAction({
                                name: "selectTermSpiPredKpi",
                                caption: "x", //RC 26256752 : Vybrat
                                run: function (ev, ctx) {
                                    //GControlsResultsTab tab = new GControlsResultsTab(
                                    //    new GFilter < GControlsSystemCommon.GControlsResultsFilter > []
                                    //        {
                                    //        new GFilter<GControlsSystemCommon.GControlsResultsFilter>(GControlsSystemCommon.GControlsResultsFilter.ixx_1, OperatorEnum.Equal, Ixp), // pid oteviraneho dokladu
                                    //        new GFilter<GControlsSystemCommon.GControlsResultsFilter>(GControlsSystemCommon.GControlsResultsFilter.typ_ag, OperatorEnum.Equal, UserProcess.SessionInfo.TypAg), // výsledek je určen pro aktuální agendu
                                    //        // Zobrazovat vsechny zpravy tykajici se dokladu (pidu)
                                    //        //new GFilter<GControlsSystemCommon.GControlsResultsFilter>(GControlsSystemCommon.GControlsResultsFilter.ixs_fun_akt, OperatorEnum.Equal, UserProcess.SessionInfo.IxsFun), // výsledek je určen pro aktuální funkci
                                    //        new GFilter<GControlsSystemCommon.GControlsResultsFilter>(GControlsSystemCommon.GControlsResultsFilter.dat_navedomi, OperatorEnum.Equal, GDate.Null), // výsledek dosud nebyl vzat na vědomí
                                    //        new GFilter<GControlsSystemCommon.GControlsResultsFilter>(GControlsSystemCommon.GControlsResultsFilter.typ_vkon, OperatorEnum.NotEqual, new GInt16(10)), // nejedná se o eskalaci
                                    //        new GFilter<GControlsSystemCommon.GControlsResultsFilter>(GControlsSystemCommon.GControlsResultsFilter.typ_vkon, OperatorEnum.NotEqual, new GInt16(900)), // nejedná se o technologický záznam
                                    //        new GFilter<GControlsSystemCommon.GControlsResultsFilter>(GControlsSystemCommon.GControlsResultsFilter.aktivita, OperatorEnum.Equal, new GInt16(100)) // výsledek je aktivní
                                    //    }
                                    //);
                                    //GTab.FindTab(this).Task.AddModalWin("Zprávy DSG", tab, false, FormWindowState.Normal);
                                    //tab.Closed += delegate {
                                    //    OnStateChanged();
                                    //};
                                }
                            })
                            */
                        })
                    );
                }

                if (componentDto.JeKopieAPoznamka) {
                    result.kpis.push(
                        new GObservableObject({ //observable object bude přidán do this.kpis.kpiOne 
                            name: "kpiKopieAPoznamka",
                            icon: "gi-copy",
                            primaryText: "jres:31937255",  //RC 31937255 : Interní úřadování
                            action: new GAction({
                                name: "actKopieAPoznamka", caption: "", run: function () { //RC 29250138 : Vybrat
                                    detailContent.clickKopieAPoznamka(); //, Gordic.Global.Enums.ModOtevreni.navigateTask
                                }
                            })
                        })
                    );
                }

                if (componentDto.PrizVBaliku > 0) {
                    var iconTemplateVBaliku = Gordic.Gin.Globals.Icons.VBaliku();
                    result.kpis.push(
                        new GObservableObject({ //observable object bude přidán do this.kpis.kpiOne 
                            name: "kpiPrizVBaliku",
                            icon: iconTemplateVBaliku.icon,
                            primaryText: iconTemplateVBaliku.text,  //RC 31937255 : Interní úřadování
                            action:
                                new GAction({
                                    name: "actkpiPrizVBaliku",
                                    caption: "",
                                    run: function () { //RC 29250138 : Vybrat
                                        if (detailContent.actions.actBalik) {
                                            detailContent.actions.actBalik.run(); 
                                        }
                                }
                            })
                            
                        })
                    );
                }

                if (componentDto.JeEpkPosouzeni && !componentDto.IsSpis) {
                    result.kpis.push(
                        new GObservableObject({ 
                            name: "kpiPosouzeni",
                            customClass: "kpi-posouzeni" + componentDto.PosouzeniCustomClass ? componentDto.PosouzeniCustomClass : "" ,
                            icon: Gordic.Gin.Icons.ActionEnum.posoudit,
                            meaning: componentDto.PosouzeniColour, // TODO zkontrolovat
                            primaryText: "jres:31937414", //RC 31937414 : Posouzení
                            secondaryText: componentDto.PosouzeniText,

                            action: new GAction({
                                name: "actkpiPosouzeni",
                                caption: "",
                                run: function () { 
                                    detailContent.clickKpiPosouzeni();
                                }
                            })
                        })
                    );
                }

                if (componentDto.TerminDilciDate) {
                    result.kpis.push(new GObservableObject({
                        name: "kpiDilciTermin",
                        icon: "gi-detail",
                        primaryText: "jres:31937428", //RC 31937428 : Dilčí termín
                        secondaryText: ""
                    }));
                }

                if (componentDto.KpiDotceneSubjekty) {
                    result.kpis.push(new GObservableObject({
                        name: "kpiDotceneSubjekty",
                        icon: "gi-group |fa-link g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                        primaryText: "jres:31937427", //RC 31937427 : Dotč. subjekty
                        secondaryText: "",
                        action: new GAction({
                            name: "actDotceneSubjektyKpi", caption: "", run: function () { //RC 29250138 : Vybrat
                                if (detailContent.dotceneSubjekty) {
                                    detailContent.dotceneSubjekty(); 
                                }
                            }
                        })
                    }));
                }

                if (componentDto.IsKpiOdeslaneZasilky) {
                    result.kpis.push(new GObservableObject({
                        name: "kpiOdeslaneZasilky",
                        icon: Gordic.Gin.Globals.Icons.Odeslani().icon,
                        primaryText: "jres:31937432",  //RC 31937432 : Zásilky
                        secondaryText: "0/0/0/0",
                        action: new GAction({
                            name: "actOdeslaneZasilkyKpi", caption: "", run: function () { 
                                if (detailContent.actions.actWflCinnostiOdeslani) {
                                    detailContent.actions.actWflCinnostiOdeslani.run()
                                }
                            }
                        })
                    }));
                }

                if(componentDto.PrizKonfliktSka) {
                    result.kpis.push(new GObservableObject({
                        name: "KpiKonfliktSkartace",
                        icon: "gi-skartace",
                        //meaning: "important",
                        primaryText: "jres:31937547", //RC 31937547 : Skartační konflikt
                        tooltip: "jres:31937548", //RC 31937548 : Nevypořádaný konflikt skartační události
                        secondaryText: ""
                    }));
                }
               

                result.actions = { //může být zadáno jako pole nebo jako objekt

                    actSslKpisTrasaOkno: {
                        caption: "jres:26255201", //RC 26255201 : Trasy
                        run: function (event, actionContext) {
                            if (actionContext.inlineDlgClsoeFun) {
                                actionContext.inlineDlgClsoeFun();
                            }
                            $.content(this).trasyDokumentu();
                        }
                    },

                    actSslKpisTrasaSplnit: {
                        caption: "jres:26256625",  //RC 26256625 : Splnit
                        enabled: true,// componentDto.ButtonSplnitEnabled,
                        visible: true,// componentDto.ButtonSplnitVisible,
                        run: function (event, actionContext) {
                            if (actionContext.inlineDlgClsoeFun) {
                                actionContext.inlineDlgClsoeFun();
                            }
                            $.content(this).SslKpisSplnitClick();
                        }
                    },
                    actSslKpisTrasaAno: {
                        caption: "jres:26256626",  //RC 26256626 : Ano
                        enabled: true,//componentDto.ButtonAnoEnabled,
                        visible: true,// componentDto.ButtonAnoNeVisible,
                        run: function (event, actionContext) {
                            if (actionContext.inlineDlgClsoeFun) {
                                actionContext.inlineDlgClsoeFun();
                            }
                            $.content(this).SslKpisAnoClick();
                        }
                    },
                    actSslKpisTrasaNe: {
                        caption: "jres:26256627",  //RC 26256627 : Ne
                        enabled: true,// componentDto.ButtonNeEnabled,
                        visible: true,//componentDto.ButtonAnoNeVisible,
                        run: function (event, actionContext) {
                            if (actionContext.inlineDlgClsoeFun) {
                                actionContext.inlineDlgClsoeFun();
                            }
                            $.content(this).SslKpisNeClick();
                        }
                    },
                    actOtevriAgenduVNoveZalozceFlash: {
                        caption: "jres:31937251",  //RC 31937251 : Agenda
                        enabled: true,
                        visible: true,
                        run: function (event, actionContext) {
                            var opt = {
                                content: $.content(this),
                                ixx1: componentDto.ixp
                            }
                            Gordic.Wfl.Utils.ZkusOtevritPrislusnyModulVNoveZalozce(opt);
                        }
                    },
                    actOtevriExterniSystemVNoveZalozceFlash: {
                        caption: " ",  //RC 31937251 : Agenda
                        enabled: true,
                        visible: true,
                        run: function (event, actionContext) {
                            var opt = {
                                content: $.content(this),
                                ixx1: componentDto.ixp
                            }
                            Gordic.Wfl.Utils.ZkusOtevritPrislusnyModulVNoveZalozce(opt);
                        }
                    }
                };
                return result;
            }
        }

    }, { pure: true, extendIntellisense: GContent });
})(jQuery);
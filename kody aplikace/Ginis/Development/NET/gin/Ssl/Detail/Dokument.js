(function ($) {
    "use strict";
    namespace("Gordic.Ssl.WebClient.Details.Dokument", {
        flashTimer: 5000,
        logOptions: { name: "Gordic.Ssl.WebClient.Details.Dokument", fileName: "Dokument.js", authorCode: 484 },
        onContentReady: function () {
            this.log.debug("Detail dokumentu JS - onContentReady - start");
            var that = this;

            var caption = this.EntityTittle; //RC 26255308 : Dokument

            var generPidVlastni = this.globalSettings.get("Global.Wfl.AppSettings.OthersSettings.GenerPidVlastni");
            this.log.debug("JS - Global.Wfl.AppSettings.OthersSettings.GenerPidVlastni: " + (generPidVlastni ? "true" : "false"));
            this.log.debug("JS - Dokument UID " + this.uid);

            if (this.RezimPodani === 1) {
                caption = "jres:26256563" + " " + caption; //RC 26256563 : Nový
            }
            else if (this.RezimPodani === 2) {
                caption = "jres:26256563" + " " + //RC 26256563 : Nový
                    "jres:31937036" + " " + //RC 31937036 : cizí
                    caption;
            }

            if (this.SimpleMode) {
                this.dokumentSimpleMode();
            }
            //Gordic.PopisneVlastnosti.applyValues(this, this.vlastnosti);
            //var colect = Gordic.PopisneVlastnosti.collectValues(this);

            if (this.hotfixi != null) {
                this.hotfixi(); // GSslDetailComponent.js
            }
            this.element.on({
                "contexthelp": function (ev, obj) {
                    obj.toc.chapter({ id: "content", title: "Davidův dokument" });
                }

            });
            if (this.ISLVolaniKomponent) {
                this.showFlash("ISL", "success", "islInfoID");
            }

            if(this.JeDokumentZNeuplnehoElPodani) { // T35065
                //this.showFlash("jres:26257194" //RC 26257194 : Tento dokument vznikl z neúspěšně zpracovaného el. podání a neproběhlo jeho systémové storno.
                //    + " "
                //    + "jres:26257195", "g-state-warning");  //RC 26257195 : Je třeba tento dokument stornovat a el. podání zpracovat znovu pro vznik kompletního dokumentu.

                this.dialogs.warning("jres:26257194" //RC 26257194 : Tento dokument vznikl z neúspěšně zpracovaného el. podání a neproběhlo jeho systémové storno.
                    + "\n\n"
                    + "jres:26257195"); //RC 26257195 : Je třeba tento dokument stornovat a el. podání zpracovat znovu pro vznik kompletního dokumentu.
            }

            if(this.WithKontrolaMetadat == true) {

                var SelectedRowsInfo = { Ixp: this.DetailDto.ixp };
                var ListSelectedRowsInfo = [];
                ListSelectedRowsInfo.push(SelectedRowsInfo);
                Gordic.Ssl.Utils.SouboryVNearchFormatu(that, ListSelectedRowsInfo) //Wfl.Interface.SelectedRowInfoDto
                    .done(function (rv) {
                        if (rv.groupResult) {
                            var isErr = false;
                            for (var i = 0; i < rv.groupResult.length; i++) {
                                if (rv.groupResult[i].IsError) {
                                    isErr = true;
                                    break;
                                }
                            }
                            if (!isErr) {
                                that.dialogs.alert("jres:26257299"); //RC 26257299 : Nebyly nalezeny žádné soubory s nearchivním formátem.
                            }
                        }
                    }) 
                    .always(function () {
                        that.tryReloadDetail();
                    });
            }

            this.log.debug("Detail dokumentu JS - onContentReady - end");
        },

        // inicializace detaibuildru 
        onDetailBuilderInit: function (builder) {
            this.log.debug("Detail dokumentu JS - onDetailBuilderInit - start");
            var that = this;
            // V této funkci je možné ovlivňovat komponenty, s kterými builder bude pracovat.
            if (this.RezimPodani != null && this.RezimPodani != 0) {
                if (builder.getComponent("SslDetailDoruceni")) {
                    builder.moveComponentBefore("SslProfilDokument", "SslDetailDoruceni");
                }
            } else {
                builder.moveComponentBefore("SslProfilDokument", "WflPrilohy");
            }
           
            builder.moveComponentBefore("WflGfrm", "SslProfilDokument");

            builder.moveComponentAfter("WflRedistribuce", "WflPrilohy");

            //Agendove componenty
            builder.moveComponentBefore("WflZalozkaZverejneniComponent", "SslProfilDokument");
            builder.moveComponentBefore("WflZverejneniComponent", null);
            this.log.debug("Detail dokumentu JS - onDetailBuilderInit - end");
        },

        onDetailBuilderBuild: function (builder) {
            this.log.debug("Detail dokumentu JS - onDetailBuilderBuild - start");
            //pokud chci aby funkce vyhrála tak sem, jinak o funkce přijdu.
            //this.closeDetail = function () {
            //    debugger;
            //    this.tryClose();
            //};
            builder.removeDefinition("desc_props*", GDbd.DefinitionKind.ActiveOpEvent)

            this.prebudujMenuStromSimpleMode(builder);
           // if (this.RezimPodani !== 0) { 
                builder.autofocusSelector = ".js-VlastaFocus";
           // }
            // V této metodě už builder sjednotil všechny definice z komponent.
            // Je možné je upravovat v závislosti na ostatních - např. řadit.

            //updatovat
            //      builder.updateDefinition("menuWflElDocOtevritElObraz", { favorite: false, caption:"My Wfl el doc open." });

            //přesouvat - moveBefore / moveAfter
            //      builder.moveDefinitionBefore("menuMyComponent2", "menuWflOvereni");

            //vkládat - insertAfter / insertBefore
            //      builder.insertAfterDefinition("menuMyComponent2", { id: "menuMyComponent3", caption: "MyCustomMenuItem3", type: "static" });

            if (this.RezimPodani != null && this.RezimPodani != 0) {
                builder.menuBarDefinitions = [];
            }
           
            // šipky
            if (this.listControls_setup) {
                this.listControls_setup({
                    //funkce, která řádek z gridu přetransformuje v dto pro zavolání this.load(dto); Může vracet promise.
                    //rowToDto: function (gridState) {
                    // 
                    //    return {
                    //        DetailDto: { ixp: gridState.currentRow.data.ixp },
                    //        EditMode: false, //this.EditMode
                    //        // grid: this.grid
                    //    };
                    //},
                    /*
                    gginlistcontrols - přidání option 'load', která umožní kompletně řídit načtení dalšího/předchozího detailu (klidně i jiný
                    content místo reload). Pokud z funkce rowToDto/load je vráceno true (reject(true)) - bude proveden pokus o načtení dalšího
                    následujícího/předchozího - v případě false ((reject(false)) nebude proveden pokus o získání dalšího a nebude proveden reload.
                    V případě vrácení objektu (resolve(...)) bude proveden reload.
                    */
                    
                    load: function (state) {
                        var that = this;
                        if (state != null) {
                            this._remoteGridState = state;

                            var parentik = that.parentContent; 
                            var loadParams = {
                                DetailDto: { ixp: state.currentRow.data.ixp },
                                EditMode: false, //this.EditMode
                                //grid: that.grid,
                                grid: that.gridRemoteControl,
                                //grid: parentik.mainGrid
                                //mainGrid
                            };
                            var def = $.Deferred(); //takhle blbě to je, protože nechceme předávat žádný výstup z loadovacích promise ven.
                            that.tryClose().then(function () {
                                return Gordic.Ssl.Dialogs.Detail(parentik, loadParams).then(function () { def.resolve() }, function () { def.reject(); });
                                //_this.load(loadParams);
                            })
                            return def.promise();
                        }

                        return false;
                    },
                    
                    //template pro tooltip na šipce následující
                    nextItemTemplate: "jres:31937135:" + //RC 31937135 : Následující
                        " {ixp} <br> jres:31937136", //RC 31937136 : entita
                    //template pro tooltip na šipce předchozí
                    prevItemTemplate: "jres:31937137:" + //RC 31937137 : Předchozí
                        " {ixp} <br> jres:31937136" //RC 31937136 : entita
                });
            }
            builder.moveDefinitionBefore("TabZverejneni", null, GDbd.DefinitionKind.Tab);
            //this.aiAttachments?.upsert({ id: "dokument", caption: "Dokument", dataWrapper: {kind: "promise", dataPromise: this.isl.Dokument.read({data: {Ixp: this.DetailDto.ixp}}).get().then(o=>o) } })
            this.log.debug("Detail dokumentu JS - onDetailBuilderBuild - end");
        },
       
        

        prebudujMenuStromSimpleMode: function (builder) {
            
            if (this.SimpleMode) {
                // if (this.actions.xxxxx) this.actions.xxxxx.visible = false;
                var indexToDelete = [];
                var pole = builder.menuBarDefinitions;


                for (var i = 0; i < pole.length; i++) {
                    //smazaní menu zobrazit
                    var poleID = pole[i].id;
                    if (poleID === "menuZobrazit" || pole[i].parent === "menuZobrazit") {

                        if (indexToDelete.indexOf(i) === -1) { indexToDelete.push(i); }
                    }

                    //smazaní akcí z menu redistribuce
                    if (poleID === "menuWflRedistribucePrideleniSsl") { // || poleID === "menuWflRedistribuceZrusitPrideleni" zrušit redistribuci přidáno protože v ssd se některé dokumenty dostaly do redistribuce z podeatelny
                        //actWflRedistribucePredaniSsl
                        if (indexToDelete.indexOf(i) === -1) { indexToDelete.push(i); }
                    }

                    //var poleID = pole[i].id;
                    //if (poleID === "actWflRedistribucePrideleniSsl" || poleID === "menuWflRedistribucePrideleniSsl" ) {
                    //    //actWflRedistribucePredaniSsl
                    //    //if (indexToDelete.indexOf(i) === -1) { indexToDelete.push(i); }
                    //    debugger;
                    //}

                    //componentDto.isEKO ? "actWflRedistribucePredaniEko" : "actWflRedistribucePredaniSsl",
                    //    "actWflRedistribucePrideleniSsl",
                    //    "actWflRedistribuceZrusitPrideleni"
                }
                indexToDelete.reverse();
                for (var j = 0; j < indexToDelete.length; j++) {
                    builder.menuBarDefinitions.splice(indexToDelete[j], 1);
                }
            

            }
        },

        dokumentSimpleMode: function () {
            this.zakazNeSimpleModeAkce();

        },

        zakazNeSimpleModeAkce: function () {
            if (this.SimpleMode) {
               //deaktivace akcí
                if (this.actions.actNabytPravMoc) this.actions.actNabytPravMoc.visible(false);
                if (this.actions.actWflCinnostiTrasy) this.actions.actWflCinnostiTrasy.visible(false);
                if (this.actions.actWflCinnostiSchvalovaciProces) this.actions.actWflCinnostiSchvalovaciProces.visible(false);
                if (this.actions.actWflCinnostiZmenaFormatu) this.actions.actWflCinnostiZmenaFormatu.visible(false);

                if (this.ssd_dotc_subj === 0) {
                    if (this.actions.actDotcSubjekty) this.actions.actDotcSubjekty.visible(false);
                }

                if (this.actions.actKopie) this.actions.actKopie.visible(false);

               


                //if (this.actions.actSouvisejici) this.actions.actSouvisejici.visible(false); // T42331 zpřístupněno pro SSD 
                if (this.actions.actSouvisejiciStaryDialog) this.actions.actSouvisejiciStaryDialog.visible(false);
                if (this.actions.actVytvoritVlastniDokumentsVazbou) this.actions.actVytvoritVlastniDokumentsVazbou.visible(false);

                if (this.actions.actEvidVystupy) this.actions.actEvidVystupy.visible(false);

                // přiřazení ke spisu
                if (this.actions.actPriraditKeSpisu) this.actions.actPriraditKeSpisu.visible(false);
                if (this.actions.actPriraditKeSpisuZrusit) this.actions.actPriraditKeSpisuZrusit.visible(false);

                if (this.specialnipovoleniProSchvalovaciProcess && this.actions.actWflCinnostiSchvalovaciProces) {
                    this.actions.actWflCinnostiSchvalovaciProces.visible(true);
                }

            }
        },



        ulozitZmenyFinal: function (model) {
            var that = this;
            model.StavVlozeniDospisuPriUlozeni = this.stavVlozeniDospisuPriUlozeni;

            if(this.IxpSpisProNovePodani != null && this.StUtajIdProNovePodaniDoSpisu == 40 && model.StUtajIdWfl == 40 && this.gin_ssl_vlopirp == 1) {
                this.dialogs.confirm("jres:31937466", //RC 31937466 : Dotaz
                    "jres:31937465").on("closed", function (ev, retVal) { //RC 31937465 : Přejete si převzít všechna práva ze spisu, do kterého je dokument vkládán?
                        if (retVal === "yes") {
                            model.PrebratIrpZeSpisu = true;
                        }

                        that.call("SaveDetail", { model: model })
                            .done(function (retVal) {
                                if (retVal.StavBool) {
                                    if (retVal.StrParam1) {
                                        that.stavVlozeniDospisuPriUlozeni = retVal.StrParam1;
                                    }
                                    if (retVal.BoolParam1) {
                                        that.zalozenRozsirenyProfilVlastnosti = retVal.BoolParam1;
                                    }
                                    that.reloadPoUlozeni();

                                } else if (retVal.StavTxt === "showWinVyberDeniku") {
                                    that.log.debug("JS - Dokument výběr deníku při podání dokumentu");

                                    that.showWinVyberDeniku(model)
                                        .done(function (modelPoVyberuDeniku) {
                                            that.ulozitZmenyFinal(modelPoVyberuDeniku);
                                        }
                                        );
                                }
                            })
                            .fail(function (xhr, type, vobj) {
                                //vobj.containsNonFatal
                                //vobj.isNonFatal
                                //vobj.nonFatalMessage
                                if (vobj.isNonFatal) {
                                    that.reloadPoUlozeni();
                                }

                            })
                            ;

                    });
            } else {
                this.call("SaveDetail", { model: model })
                    .done(function (retVal) {
                        if (retVal.StavBool) {
                            if (retVal.StrParam1) {
                                that.stavVlozeniDospisuPriUlozeni = retVal.StrParam1;
                            }
                            if(retVal.BoolParam1) {
                                that.zalozenRozsirenyProfilVlastnosti = retVal.BoolParam1;
                            }
                            that.reloadPoUlozeni();

                        } else if (retVal.StavTxt === "showWinVyberDeniku") {
                            that.log.debug("JS - Dokument výběr deníku při podání dokumentu");

                            that.showWinVyberDeniku(model)
                                .done(function (modelPoVyberuDeniku) {
                                    that.ulozitZmenyFinal(modelPoVyberuDeniku);
                                }
                                );
                        }
                    })
                    .fail(function (xhr, type, vobj) {
                        //vobj.containsNonFatal
                        //vobj.isNonFatal
                        //vobj.nonFatalMessage
                        if (vobj.isNonFatal) {
                            that.reloadPoUlozeni();
                        }

                    })
                    ;
            }


        },

        reloadPoUlozeni: function () {
            var that = this;
            var editMode = false;
            var idZalozkyNeboPaneluKOtevreni = undefined;

            if (that.RezimPodani === 0) {
                var keywordField = that.findFields("Keywords");
                if (keywordField && keywordField.length > 0) {
                    keywordField.gkeywordsbar("save");
                }
            } else {
                if(this.zalozenRozsirenyProfilVlastnosti === true) {
                    editMode = true;
                    idZalozkyNeboPaneluKOtevreni = Gordic.Prefabs.TabGroups.RozsirujiciVlastnosti().id;

                    this.zalozenRozsirenyProfilVlastnosti = false; // pro jistotu shodím už nepotřebný příznak
                }
            }
            var opt = {
                flashMessage: "jres:26255361", //RC 26255361 : Uloženo
                flashMessageClass: "g-state-success",
            };
            var paramDetailu = {
                DetailDto: that.DetailDto,
                RezimPodani: 0,
                InicDok: null,
                EditMode: editMode,
                IdZalozkyNeboPaneluKOtevreni: idZalozkyNeboPaneluKOtevreni
            };
            that.tryReloadDetail(paramDetailu, opt);
        }


    }, { extendIntellisense: GContent });
})(jQuery);
(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslDetailDoruceni: {

            create: function (componentDto) {
                var result = {
                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableSslDetailDoruceniActions();
                        }
                    ],
                    onBuild: [
                        function () {
                            this.enableSslDetailDoruceni();
                            this.nasetujDoruceni(this.SslDetailDoruceni_Dto);

                            if (this.ReadOnlyEko && this.JinaAgenda) {
                                this.enableReadOnlyEkoDoruceni();
                            }
                            this.setAILinkDoruceni();
                        },
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        nasetujDoruceni: function (dto) {
                            var that = this;
                            var form = this.findForms("formSslDoruceni");
                            //form.addHelpContext("DetailDoruceni");

                            var fields = form.findFields();

                            fields.gfield("model", "apply", dto);
                            fields.gfield("model", "validators", componentDto.Validators);
                            form.gform("waitForValues").done(function () {
                                if (Gordic.Utils.WidgetExists("gfield", fields)) {
                                    Utils.Form.markRequired(fields);
                                    fields.gfield("confirm");
                                }
                            });
                        },

                        

                        saveSslDetailDoruceni: function () {
                            var doruceniModel = {
                                IsDetailDoruceni: true
                            };
                            var doruceniForm = this.findForms("formSslDoruceni");
                            doruceniForm.findFields().gfield("model", "collect", doruceniModel);
                            if (doruceniForm.gform("hasChanged")) {
                                doruceniModel.MetadataChanged = true;
                            }
                            return doruceniModel;
                        },

                        saveSslDetailDoruceniEko: function () {

                            var doruceniModel = {
                                IsDetailDoruceni: true
                            };
                            var doruceniForm = this.findForms("formSslDoruceni");
                            doruceniForm.findFields().gfield("model", "collect", doruceniModel);
                            if (doruceniForm.gform("hasChanged")) {
                                doruceniModel.MetadataChanged = true;
                            }

                            var retDto = {};

                            retDto.Doruceni = retDto.Doruceni ? retDto.Doruceni : {};
                            retDto.Doruceni.stat = doruceniModel.StatDoruceni;
                            retDto.Doruceni.psc = doruceniModel.PscDoruceni;
                            retDto.Doruceni.dat_odes = doruceniModel.DatOdes;
                            retDto.Doruceni.znacka_odes = doruceniModel.ZnackaOdesilateleDoruceni;
                            retDto.Doruceni.dat_ze_dne = doruceniModel.DatZeDneDoruceni;
                            retDto.Doruceni.pod_cis = doruceniModel.PodaciCislo;
                            retDto.Doruceni.pod_cis = doruceniModel.SKMessageId;
                            retDto.Doruceni.zpusob_dor = doruceniModel.ZpusobDoruceni;
                            retDto.Doruceni.druh_zas = doruceniModel.DruhZasilkyDoruceni;
                            retDto.Doruceni.druh_zas_zach = doruceniModel.ZachazeniDoruceni;
                            retDto.Doruceni.poznamka = doruceniModel.PoznamkaDoruceni;
                            retDto.Doruceni.dat_prij_pod = componentDto.DatPrijPod;
                            retDto.Doruceni.sp_zn_odes = doruceniModel.SpZnOdes;
                            retDto.Doruceni.dat_doruc = componentDto.DatDoruc;



                            return retDto;
                        },

                        setAILinkDoruceni: function () {
                            var form = this.findForms("formSslDoruceni");
                            this.aiAttachments?.upsert({
                                id: "formSslDoruceni",
                                caption: "Doručení",
                                dataWrapper: {
                                    kind: "form",
                                    form: form // source formulář typu JQuery<HTMLElement>
                                }
                            });

                        },

                        //#region akce
                        //Detail DZ
                        detailDZClick: function (prizNadr) {
                            var that = this;
                            var ixp = componentDto.ixp;
                            var opt = {
                                "Ixp": ixp,
                                "PrizNadr": prizNadr
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("GetScriptShowDetailDZ", opt)
                                .done(function (retVal) {
                                    if (retVal) {
                                        // telo presunout do spolecne funkce wfl utils nebo attachments utils
                                        // pridat dotaz na duvod otevirani atd.
                                        var dto = {
                                            DownloaderType: "Gordic.Wfl.WebClient.Prilohy.GFileDownloader",
                                            AutoDownload: true,
                                            DisablePluginDownload: true,
                                            CustomData: {
                                                "ixp": ixp,
                                                "ixb": retVal,
                                                //"verze": porCislo,
                                            }
                                        };
                                        var doc = new GDocument(that);
                                        doc.downloadDocument(dto, function (args) {
                                            // console.log("doc.downloadCompleted", this, args);
                                        });
                                    }
                                }).always(function () { srv.close(); });
                        },
                       

                        otevriOknoInfoDZ: function () {
                            var that = this;
                            var ixp = componentDto.ixp;

                            //Wfl_OtevriOknoInfoDZ(componentDto.MessageId, componentDto.Mailbox, ixp, false);
                            // dialog Jirky Š.
                            /*
                            var opt = {
                                idZpravy: componentDto.MessageId,
                                mailbox: componentDto.Mailbox,
                                ixp: componentDto.ixp,
                            };
                            Gordic.Wfl.Dialogs.DatovaZpravaInfoDlg(this, opt, Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow);
                            */
                            // dialog Tomáše
                            var opt = {
                                IdDatoveZpravy: componentDto.MessageId,
                                IdDatoveSchranky: componentDto.Mailbox,
                                Ixp: componentDto.ixp,
                                PovolitTiskDorucenky: true
                            };
                            var optDialog = {
                                parentContent: this,
                                opt: opt,
                                ModOtevreni: Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow
                            };

                            Gordic.Wfl.Dialogs.GDatovaZpravaIsdsInfoDlg(optDialog);

                        },
                        //OpravaMetadat
                        //opravaMetadat: function () {
                        //    var that = this;
                        //    var ixp = componentDto.ixp;
                        //    console.log("TODO");
                        //    var url = encodeURI("~/ElPodani/OpravaMetadatElPodani.aspx?ixp=" + ixp);
                        //    var retVal = ShowModalWindowEx(url, "Oprava", 700, 600, false, false, false);
                        //},
                        //#endregion
                        enableSslDetailDoruceniActions: function () {
                            var l_bActionEnabled = true;
                            if (componentDto.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }
                            this.actions.actTiskPruvodkyDoruceni.update({ enabled: componentDto.TiskPruvodkyEnabled, visible: componentDto.TiskPruvodkyVisible });
                            this.actions.actDetailDZDoruceni.update({ enabled: componentDto.DetailDZEnabled, visible: componentDto.DetailDZVisible });
                            this.actions.actDetailNadrDZDoruceni.update({ enabled: componentDto.DetailNadrDZEnabled, visible: componentDto.DetailNadrDZEnabled });
                            this.actions.actInfoISDSDoruceni.update({ enabled: componentDto.InfoISDSEnabled, visible: componentDto.InfoISDSVisible });
                            // this.actions.actOpravaMetadatDoruceni.update({ enabled: componentDto.OpravaMetadatEnabled, visible: componentDto.OpravaMetadatVisible });

                        },
                        enableSslDetailDoruceni: function () {

                            var l_bActionEnabled = true;
                            if (componentDto.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                            var fieldEnabled = componentDto.EditMode || this.RezimPodani != 0;
                            this.findFields("ZpusobDoruceni,ZachazeniDoruceni,DruhZasilkyDoruceni,PodaciCislo,SKMessageId,PscDoruceni,StatDoruceni,DatDoruc,DatZeDneDoruceni," +
                                "DatOdeslDoruceni,ZnackaOdesilateleDoruceni,SpZnOdes,PoznamkaDoruceni"
                            ).gfield("option", "disabled", !fieldEnabled);

                        },
                        enableReadOnlyEkoDoruceni: function () {
                            //m_oCbZpusDoruceni.ReadOnly = readOnlyEkoProfil;
                            //cbDruhZachazeni.ReadOnly = readOnlyEkoProfil;
                            //m_oCbDruhZasilky.ReadOnly = readOnlyEkoProfil;
                            //m_oTbPodaciCislo.ReadOnly = readOnlyEkoProfil;
                            //m_oTbDatumOdeslani.ReadOnly = readOnlyEkoProfil;
                            //m_oTbDatumZeDne.ReadOnly = readOnlyEkoProfil;  // ALF 14.11.2014 - proč by nemělo jít editovat datum ze dne? || DocInfo.SSl == 1;
                            //tbZnOdesilatele.ReadOnly =
                            //    tbSpisZnOdes.ReadOnly = readOnlyEkoProfil; // ALF 14.11.2014 || DocInfo.SSl == 1;
                            //m_oTPostaStatPsc.ReadOnly = readOnlyEkoProfil; // ALF 14.11.2014 || DocInfo.SSl == 1;
                            //m_oTbPoznamka.ReadOnly = readOnlyEkoProfil; // ALF 14.11.2014 || DocInfo.SSl == 1;

                            this.findFields("ZpusobDoruceni,ZachazeniDoruceni,DruhZasilkyDoruceni,PodaciCislo,SKMessageId,PscDoruceni,StatDoruceni,DatDoruc,DatZeDneDoruceni," +
                                "DatOdeslDoruceni,ZnackaOdesilateleDoruceni,SpZnOdes,PoznamkaDoruceni"
                            ).gfield("option", "disabled", true);


                            //?? nevím zda jde editovat
                            //m_oTbDatDoruceni.Enabled = !readOnlyEkoProfil;  // ALF 14.11.2014 - proč by nemělo jít editovat datum ze dne? || DocInfo.SSl == 1;
                            //this.findFields("DatOdeslDoruceni").gfield("option", "disabled", true);






                        }
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt

                        actTiskPruvodkyDoruceni: GAction.createPrintAction({
                            name: "actTiskPruvodkyDoruceni",
                            tema: "pod_ptm_pruelpo",
                            caption: "jres:26255551", //RC 26255551 : Tisk průvodky
                            reportStarting: function (rep) {
                                rep.params.X0000 = $.content(this).findFields("IdElPodani").gfield("getValue");
                                rep.params.X0001 = componentDto.IxsIsu;
                                rep.params.X0002 = componentDto.ixp;
                                rep.params.Preselect = false;
                                rep.params.IXP = componentDto.ixp;
                            },
                        }),
                        actDetailDZDoruceni: {
                            caption: "jres:31937540",  //RC 31937540 : Původní zpráva
                            tittle: "jres:31937541", //RC 31937541 : Původní podoba zprávy elektronického podání
                            
                            run: function () {
                                $.content(this).detailDZClick(false);
                            }
                        },
                        actDetailNadrDZDoruceni: {
                            caption: "jres:31937542", //RC 31937542 : Původní zpráva nerozebraná
                            tittle: "jres:31937543", //RC 31937543 : Původní podoba zprávy nerozebraného/nerozloženého podání
                            run: function () {
                                $.content(this).detailDZClick(true);
                            }
                        },
                        actInfoISDSDoruceni: {
                            caption: "jres:31937061", //RC 31937061 : Info z ISDS
                            run: function () {
                                $.content(this).otevriOknoInfoDZ();
                            }
                        },
                        //actOpravaMetadatDoruceni: {
                        //    caption: "jres:31937062", //RC 31937062 : Oprava metadat
                        //    run: function () {
                        //        $.content(this).opravaMetadat();
                        //    }
                        //},

                   
                    },

                    tabs: {
                        SslDoruceni: {
                            tabParams: {
                                title: "jres:26255294" //RC 26255294 : Doručení
                                , opened: true,  //1. tab je pro agednovou hlavičku, ta je pro dokumenty, spisy, zakázky atp. vždy L2M2S1. BO detaily mimo wfl (tzn. dokumenty, spisy) jsou v L1M1S1 //RC 26255308 : Dokument
                                menuBar: [
                                    { action: "actTiskPruvodkyDoruceni", favorite: true },
                                    { action: "actDetailDZDoruceni", favorite: true },
                                    { action: "actDetailNadrDZDoruceni", favorite: true },
                                    { action: "actInfoISDSDoruceni", favorite: true },
                                  // { action: "actOpravaMetadatDoruceni", favorite: true },
                                ],
                                group: Gordic.Prefabs.TabGroups.Doruceni()
                            },
                            /*{
                    id: "tabAttachments",
                        tabParams: { title: "Přílohy" },
            contentParams: { className: componentDto.attachmentMainContent, serverParams: componentDto.attachmentMainContentDto || { Ixp: inputDto.ixp, NazevUDA: componentDto.NazevUDA, PopisUda: componentDto.PopisUda } }
        }*/
                            init: function (tab) {
                                //#region definice tab dokumentu
                                var that = $.content(tab);

                                var doruceniForm = new Gordic.Forms
                                    .Form({ 
                                            name: "formSslDoruceni", 
                                              layoutDescriptor: "L2M2S1, L-3-9-0, M-3-9-0, S-12-12-0"
                                        });
                              
                                doruceniForm
                                    .addSection("jres:32170293") //RC 32170293 : Způsob doručení
                                    .addRow("jres:26255413")  //RC 26255413 : Způsob doručení
                                    .addField("gselectbox", Gordic.Prefabs.Select.wflczpd(), {
                                        name: "ZpusobDoruceni",
                                        model: "model.ZpusobDoruceni=value.zpusob_dor",
                                        validators: [
                                            new Gordic.Validators.Base({
                                                message: "jres:26257184", //RC 26257184 : Nelze zadat hodnotu neurčeno.
                                                validate: function (value) {
                                                    /// <summary>s the specified value.</summary>
                                                    /// <param name="value">The value.</param>
                                                    /// <returns></returns>
                                                    if (componentDto.ssl_pod_zpdorp === 1 && value && value.zpusob_dor === 0) {
                                                        return false;
                                                    }
                                                    return true;
                                                },

                                            })
                                        ],
                                        // 06.06.2024 - TFeik
                                        // Přidán filtr priz_pro_doruc.
                                        // https://phabricator.gordic.cz/T35255
                                        serverFilters: {
                                            priz_pro_doruc: 1,
                                            zpusob_dor: componentDto.ssl_pod_zpdorp === 1 ? "!= 0" : undefined
                                        }
                                        //serverFilters: componentDto.ssl_pod_zpdorp === 1 ? { zpusob_dor: "!= 0" } : undefined,
                                        //(UserProcess.Configuration.GetDatabaseParameter("ssl_pod_zpdorp", 0) == 1) && (o.ZpusobDoruceni.ZpusobDor.IsNull || o.ZpusobDoruceni.ZpusobDor== 0);
                                    })
                                    .addRow("jres:26255497") //RC 26255497 : Druh zacházení
                                    .addField("gselectbox", Gordic.Prefabs.Select.wflcdzz(), {
                                        name: "ZachazeniDoruceni",
                                        model: "model.ZachazeniDoruceni=value.druh_zas_zach"
                                    })
                                    .addRow("jres:26255498") //RC 26255498 : Druh zásilky dor. poš.
                                    .addField("gselectbox", Gordic.Prefabs.Select.wflcdrz(), {
                                        name: "DruhZasilkyDoruceni",
                                        model: "model.DruhZasilkyDoruceni=value.druh_zas"
                                    });
                                if (componentDto.SKMessageId != null) { // Místo podacího čísla zobrazím message ID
                                    doruceniForm.addRow("jres:31937482") //RC 31937482 : Identifikátor zprávy
                                        .addField("gstringbox", {
                                            name: "SKMessageId",
                                        });    
                                } 
                                else {
                                    doruceniForm.addRow("jres:26255412") //RC 26255412 : Podací číslo
                                        .addField("gstringbox", {
                                            name: "PodaciCislo",
                                        });
                                }
                                doruceniForm
                                    .addRow("jres:26255411") //RC 26255411 : Datum odeslání
                                    .addField("gdatebox", {
                                        name: "DatOdeslDoruceni",
                                        valueType: "datetime",
                                        hideZeroTime: false,
                                        minValue: Gordic.Ssl.Utils.MinimalDate,
                                    })

                                    .addRow("jres:31937127") //RC 31937127 : PSČ, Stát
                                    .addField("gselectbox", "w-7", Gordic.Prefabs.Select.ginspsc(componentDto.DbCulture === 10 ? { props: { menuBar: { model: { stat: "235", aktivita: 100 } } } } : undefined), {
                                        name: "PscDoruceni",
                                        model: "model.StatDoruceni=value.stat;model.PscDoruceni=value.psc",
                                    })
                                    // .addRow("jres:26255611") //RC 26255611 : Stát
                                    .addField("gselectbox", "w-5", Gordic.Prefabs.Select.gincsta(), {
                                        name: "StatDoruceni",
                                        model: "model.StatDoruceni=value.stat",
                                    });
 
                                if(componentDto.gin_ssl_ddoruc === 1) {
                                    doruceniForm
                                        .addRow("jres:26257215") //RC 26257215 : Datum doručení
                                        .addField("gdatebox", {
                                            name: "DatDoruc",
                                            valueType: "datetime",
                                            minValue: Gordic.Ssl.Utils.MinimalDate,
                                            //disabled: true,
                                            //validators: componentDto.ssl_pod_zpdorp === 1 ? [new Gordic.Validators.Required()] : undefined, 
                                        });
                                }

                                doruceniForm
                                    .addSection("jres:31937128") //RC 31937128 : Identifikátory odesílatele

                                    .addRow("jres:26256223") //RC 26256223 : Identifikátor el. podání
                                    .addField("gstringbox", {
                                        name: "IdElPodani",
                                        disabled: true
                                    })
                                    .addRow("jres:26256580") //RC 26256580 : Identifikátor původního el. podání
                                    .addField("gstringbox", {
                                        name: "IdRozlElPodani",
                                        disabled: true
                                    })
                                    .addRow("jres:26255501") //RC 26255501 : Datum ze dne
                                    .addField("gdatebox", {
                                        name: "DatZeDneDoruceni",
                                        valueType: "datetime",
                                        minValue: Gordic.Ssl.Utils.MinimalDate
                                    })
                                   // .addSection()
                                    .addRow("jres:26255502") //RC 26255502 : Značka odesílatele
                                    .addField("gstringbox",{
                                        name: "ZnackaOdesilateleDoruceni",
                                    })
                                    .addRow("jres:26256228") //RC 26256228 : Sp.Zn. odesílatele
                                    .addField("gstringbox", {
                                        name: "SpZnOdes",
                                    })
                                    .addRow("jres:31937129") //RC 31937129 : Původní značka
                                    .addField("gstringbox", {
                                        name: "ZnackaNase",
                                        disabled: true
                                    })
                                    .addRow("jres:31937130") //RC 31937130 : Sp.Zn. Původní
                                    .addField("gstringbox", {
                                        name: "SpZnNase",
                                        disabled: true
                                    })
                                    ;

                                doruceniForm
                                    .addRow("jres:26255397") //RC 26255397 : Poznámka
                                    .addField("gstringbox", {
                                        name: "PoznamkaDoruceni",
                                    })
                                    ;
                      

                                if (componentDto.ZPORowDivVisible) {

                                    doruceniForm
                                        .addSection(" ") 
                                        .addRow("jres:26256257") //RC 26256257 : K rukám
                                        .addField("gstringbox", {
                                            name: "KRukam",
                                            disabled: true
                                        })
                                        ;
                                    //7
                                    doruceniForm
                                        .addRow("jres:26256258") //RC 26256258 : Zákon (rok/číslo)
                                        .addField("gnumberbox", "w-6", {
                                            name: "ZakonRok",
                                            disabled: true
                                        })
                                        .addField("gnumberbox", "w-6", {
                                            name: "ZakonCislo",
                                            disabled: true
                                        })
                                        .addRow("jres:26256260") //RC 26256260 : Paragraf
                                        .addField("gstringbox", {
                                            name: "Paragraf",
                                            disabled: true
                                        })
                                        .addRow("jres:26256259") //RC 26256259 : Odstavec, písmeno
                                        .addField("gstringbox", "w-6", {
                                            name: "Odstavec",
                                            disabled: true
                                        })
                                        .addField("gstringbox", "w-6", {
                                            name: "OdstavecPismeno ",
                                            disabled: true
                                        })
                                        .addRow("jres:31937589") //RC 31937589 : Útvar
                                        .addField("gstringbox", {
                                            name: "Utvar",
                                            disabled: true
                                        })
                                        .addSection() 
                                        ;
                                }
                               // doruceniForm.addSection();

                                $("<div>").appendTo(tab)
                                    .gform("createFrom", doruceniForm);
                                //#endregion
                            }
                        }
                    },

                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);
(function ($) {
    "use strict";
    namespace("Gordic.Ssl.Lists.Soubory", {
        flashTimer: 5000,
        lastVecSettingsId: "lastVec",
        _$fileField: null,
        _uploadedFileInfo: null,
        _uploadedFileCustomData: null,
        _fileService: null,

        onContentReady: function () {
            var that = this;
            this.title = "jres:26256900"; //RC 26256900 : Podání ze souborového systému

            this._fileService = this.createServiceContent('Gordic.Gui.WebControls.GFileServiceProvider');

            this._$fileField = $("<div>").gfilefield({
                validators: [new Gordic.Validators.Required()],
                fileUploaded: function (event, data) {
                   // that._$fileField.gfilefield("clear");
                  //  that.SelectFile(data.fileInfo, data.customData);

                    that._uploadedFileInfo = data.fileInfo;
                    that._uploadedFileCustomData = data.customData;
                },
            });
           // this._$fileField.gfilefield("addDropzone", this.element); // nemohu použít, protože dropzona zasahuje do políčka Věc a nelze do něj psát.
            this._$fileField.gfilefield("addDropzone");
            this._$fileField.gfilefield("option", "maxFileCount", 1); // zatim eviduji pouze 1 soubor, casem rozsirit i o moznost vice najednou

            this.model.Vec = this.userSettings.get(this.lastVecSettingsId);
        
            this.actions.addRange({
                actEvidovat: {
                    name: "actEvidovat",
                    icon: ["gi-file", "fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                    //caption: "jres:26256899", //RC 26256899 : Vložit soubor a podat
                    caption: "jres:26257058", //RC 26257058 : Evidovat soubor
                    run: function (ev, ctx) {
                        //that.Evidovat();
                        if(that.defaultForm.gform("isValid")) {
                            that.SelectFile(that._uploadedFileInfo, that._uploadedFileCustomData);
                        }                      
                    }
                },
                actCancel: {
                    icon: undefined,
                    caption: "jres:26256543", //RC 26256543 : Zavří­t
                    run: function (ev, ctx) {
                        that.tryClose();
                    }
                },
            });

            this.menuBar([
                { action: this.actions.actEvidovat, favorite: true },
            ]);

            this.commandBar([
                { action: this.actions.actCancel },
            ]);

            var form = new Gordic.Forms
                .Form({ name: "FormEVFI" }/*, layoutDescriptor: "L3M2S1" */);

            //console.log(Gordic.Wfl.Prefabs.GVec(
            //    that.userSettings,
            //    {
            //        model: "model.Vec=value.data",
            //        disabled: false,
            //    }
            //));

            form.addPrefab(Gordic.Wfl.Prefabs.GVec(
                that.userSettings,
                {
                    model: "model.Vec=value.data",
                    disabled: false,
                }
            ))
                //.addSection("")
                //.addRow("jres:26255425") //RC 26255425 : Věc
            //.addField("gstringbox", "w-12", { name: "vecField", model: "Vec" });

            var typDokLabel = this.gin_n23_vecsk == 0 ? "jres:31937228" : "jres:26257355"; //RC 31937228 : Typ dokumentu RC 26257355 : Druh dokumentu

            form.addRow(typDokLabel).addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), {
                    name: "TypPis",
                    model: "model.TypPis=value.ixs_typ",
                    serverFilters: {
                        aktivita_ssl: 100
                    }
                })

            form.addPrefab(Gordic.Ssl.Prefabs.FilterTypEvidenceDokumentu({ name: "filterTypEvidence", model: "model.TypFiltruEvidence=value.id" }));
            form.addPrefab(Gordic.Ssl.Prefabs.FilterTypTvorbyIxp({ name: "filterTypTvorbyIxp", model: "model.TypTvorbyIxp=value.id" }));

            // vytvoření formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            // pokud chci viditelné pole pro soubor
            this.defaultForm/*.gformsection("create", "Soubor")*/.gformrow("addFieldsRow", "jres:26257057").append(this._$fileField); //RC 26257057 : Soubor

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }
        },

        // *** Evidence souboru ***

        //Evidovat: function () {
        //    var that = this;

        //   // this._$fileField.gfilefield("option", "customData", function () { return { dto: docDto } });  
        //    this._$fileField.gfilefield("instance").inputDiv.trigger("click")
        //},
        SelectFile: function (fileInfo, customData) {
            var that = this;
            this.findFields().gfield("model", "collect", this.model);

            //if(this.model.Vec == null || this.model.Vec == "") {
            //    this.showFlash("jres:26256898", "g-state-error"); //RC 26256898 : Vyplňte pole Věc.
            //    return;
            //}

            //if(this.model.TypPis == null || this.model.TypPis == "") {
            //    this.showFlash("jres:26257040", "g-state-error"); //RC 26257040 : Vyplňte pole Typ dokumentu.
            //    return;
            //}

            // kontroly na velikost, priponu, zakazane znaky ...
            var rvCheck = Gordic.Wfl.AttachmentUtils.CheckPropertiesOfFile(fileInfo);

            if(!rvCheck.isValid) {
                if(rvCheck.err != "") {
                    this.showFlash(rvCheck.err, "g-state-error"); //RC 26256898 : Vyplňte pole Věc.
                }
                return;
            }

            this.userSettings.set(this.lastVecSettingsId, this.model.Vec);

            var spisPlan = Gordic.Gin.Globals.GetUserSettings("Global.Ssl.AppSettings.DetailSettings.SpisPl", null);
            var spisZnak = Gordic.Gin.Globals.GetUserSettings("Global.Ssl.AppSettings.DetailSettings.SpisZnak", null);

            var docDto = {
                Ixp: "",
                Vec: this.model.Vec,
                IxsEsu: null,
                PorZast: null,
                LicZast: null,
                ZastTxt: null,
                RezimPodani: this.model.TypFiltruEvidence, // zde pozor! 2 typy, ktere jsou totozne, ale nesmi se to rozjet [RezimPodani/TypEvidenceDokumentu]
                PridelitCJ: false,
                InfoCj: null,
                SpisPlan: spisPlan,
                SpisZnak: spisZnak,
                FileInfo: fileInfo,
            };

            // zadani ixp ...
            var typTvorbyIxpEnum = Gordic.Ssl.Globals.Enums.TypTvorbyIxp;

            if (that.model.TypTvorbyIxp == typTvorbyIxpEnum.ZADAVAT_DIALOGEM) { // zadani v dialogu
                var options = {
                    TypDok: that.model.TypFiltruEvidence,
                    TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp
                };
                Gordic.Wfl.Dialogs.GenerovaniIxp(that, options, 'showWindow').done(function (rv, content) {
                    if (rv) {
                        docDto.Ixp = rv.Ixp;
                        that.TvorbaCJPriEvidenci(docDto);
                    }
                });
            } else { // vygeneruju
                Gordic.Wfl.Utils.GenerateIxp(that).done(function (rv) {
                    docDto.Ixp = rv.Ixp;
                    that.TvorbaCJPriEvidenci(docDto);
                });
            }
        },
        TvorbaCJPriEvidenci: function (docDto) {
            var that = this;

            var ixsTypUserSettings = Gordic.Gin.Globals.GetUserSettings("Global.Ssl.AppSettings.DetailSettings.TypPis", null);
            var flagCizi = docDto.RezimPodani == Gordic.Ssl.Globals.Enums.TypEvidenceDokumentu.CIZI;    

            docDto.IxsTyp = ixsTypUserSettings;

            Gordic.Ssl.Utils.GetInfoProZalozeniCjSKontrolouTvorbyCjProDokument(ixsTypUserSettings, flagCizi, this).done(function (cjInfo) {
                var denikInfo = cjInfo.DenikInfo;

                //if(denikInfo.Poradi == undefined) {
                //    denikInfo.Poradi = null;
                //}
                //if(denikInfo.Rok == undefined) {
                //    denikInfo.Rok = null;
                //}

                denikInfo.Poradi = denikInfo.Poradi || null;
                denikInfo.Rok = denikInfo.Rok || null;

                docDto.PridelitCJ = cjInfo.PridelitCj;
                docDto.InfoCj = denikInfo;

                that.VyberOdesilatele(docDto);
            });
        },
        VyberOdesilatele: function (docDto) {
            var that = this;
            var typEvidenceDokumentuEnum = Gordic.Ssl.Globals.Enums.TypEvidenceDokumentu;

            if(docDto.RezimPodani == typEvidenceDokumentuEnum.CIZI) {
                var options = {
                    Ucel: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectMultiEsuAndZo,
                    Logovani: { Ixp: docDto.Ixp, DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniOdesilatele, AktZnacka: '', DuvodHledaniTxt: '' },
                };

                Gordic.Esu.Dialogs.KartotekaEsuDlg(that, options).on("close", function (ev, retVal) {
                    if (retVal && retVal.subjekty && retVal.subjekty.length > 0) {

                        var selectedEsu = retVal.subjekty[0];
                        docDto.IxsEsu = selectedEsu.ixs_esu;
                        docDto.PorZast = selectedEsu.por_zast;
                        docDto.LicZast = selectedEsu.lic;
                        docDto.ZastTxt = selectedEsu.zast_txt;

                        that.EvidujFile(docDto);
                    }
                });
            } else {
                this.EvidujFile(docDto);
            }

        },
        EvidujFile: function (docDto) {
            var that = this;

            this.beginOperation();

            docDto.IxsTyp = this.model.TypPis;

            var srv = this.createServiceContent({ className: "Gordic.Ssl.WebClient.GDetailUtils", params: {} });  //servisni sluzba/content
            srv.call("EvidujFile", { dto: docDto })
                .done(function (retVal) {
                    var ixp = retVal;

                    var options = {
                        ixp: ixp,
                        grid: null
                    };
                    Gordic.Wfl.MainApp.ShowDetail(that, options);
                })
                .always(function () {
                    that.endOperation();
                });
        },

        removeFile: function (guid) {
            var that = this;

            this._fileService.fire('RemoveFile', { uid: guid });
        },

        closing: function () {
            const that = this;
            this.beginOperation();

            // úklid po zavření dialogu  ... 
            this._$fileField.gfilefield('removeDropzone');
            return this._$fileField.gfield('getValueAsync').then(function (values) {
                const promises = new Array();

                for(let i = 0, ii = values.length; i < ii; i++) {
                    that.removeFile(values[i].guid);
                    promises.push(that._$fileField.gfilefield('removeFile', values[i]));
                }

                that._fileService.close();

                return $.when(promises).then(function(o) { o }, function() { $.Deferred().resolve().promise() }).always(function() {
                    that._$fileField.gfield('clear');
                    that._$fileField.detach();
                    that.endOperation();
                });
            });
        },

    }, { extendIntellisense: GContent });
})(jQuery);

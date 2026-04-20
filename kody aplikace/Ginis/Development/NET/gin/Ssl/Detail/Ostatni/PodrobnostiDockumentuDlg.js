(function ($) {
    "use strict";
    namespace("Gordic.Ssl.PODOK", {
        JizJsteVEditModuErrText: "jres:26255209", //RC 26255209 : Již jste v editačním módu.
        NejsteEditModeErrText: "jres:26255154", //RC 26255154 : Nejste v editačním režimu
        DokumentNelzeEditovatErrText: "jres:26255208", //RC 26255208 : Daný dokument nelze editovat.
        ZrusitZmenyRequest: "jres:26255230", //RC 26255230 : Opravdu chcete zrušit provedené změny?
        OknoZavritRequest: "jres:26255622", //RC 26255622 : Opravdu chcete okno zavřít? Neuložená data budou ztracena.
        PristupFieldVisible: false, // zakazano protoze ani v orig okne nebylo viditelne
        probehloUlozeni: false,
        onContentReady: function () {
            var _this = this;

            this.commandBar([
                { action: this.actions.actOK, primary: true },
                { action: this.actions.actCancel }
            ]);

            var form = new Gordic.Forms
                .Form({ name: "FormPOSPI", layoutDescriptor: "L2M2S2" })
                .addSection()

            if(this.gin_n23_vecsk == 1) {
                form
                    .addRow({ label: "jres:26257232", name: "vecnaSkupinaRow" }) //RC 26257232 : Věcná skupina
                    .addField("gselectbox", Gordic.Prefabs.Select.ginsvsk(), {
                        name: "VecnaSkupinaField",
                        model: "model.IxsVsk=value.ixs_vsk",
                        disabled: true,
                        graphicInput: "oninput",
                        itemTemplate: Gordic.Wfl.GWflCommonDlg.ginsvskItemTemplate({ casObdobiVisible: false }),
                        itemTooltipTemplate: Gordic.Wfl.GWflCommonDlg.ginsvskItemTooltipTemplate({ casObdobiVisible: false }),
                        serverFilters: {
                            aktivita: [100]
                        }
                    });
            } else {
                form
                    .addRow({ label: "jres:26255492", name: "spZnakRow" }) //RC 26255492 : Spis.znak
                    .addField("gselectbox", "w-3",
                        Gordic.Prefabs.Select.sslsspl(),
                        {
                            name: "spPlField",
                            model: "SpisPlan = spis_pl",
                            serverFilters: {
                                aktivita: [100]
                            }
                        })
                    .addField("gselectbox", "w-9",
                        Gordic.Prefabs.Select.sslsspz(),
                        {
                            name: "spZnField",
                            model: "SpisPlan=>spis_pl;SpisZnak = spis_znak",
                            graphicInput: "oninput",
                            itemTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTemplate(),
                            itemTooltipTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTooltipTemplate(),
                            serverFilters: {
                                aktivita: [100],
                                spis_pl: new Gordic.Forms.Dependency("spPlField", "spis_pl")
                            }
                        });
            }

            var prefab = Gordic.Wfl.Prefabs.GPocetListu(

                $.content("main").wflDBParams, // nejde zatím číst z mainu protože se používá i v hybridu
                {
                    model: "model.PocListu=value"
                     
                },
                {
                    model: "model.PocStran=value"

                },
                {
                    model: "model.PocPriloh=value"

                },
                {
                    model: "model.PocListuPriloh=value"

                },
                {
                    model: "model.PocKopii=value"

                },
                {

                },
                this.model.SFyz
            );

            form.addPrefab(prefab);

            form.addRow({ label: "jres:26255496", name: "pristupRow" }) //RC 26255496 : Přístup
                .addField("gselectbox", "w-12",
                    Gordic.Prefabs.Select.gincstu(),
                    {
                        name: "pristupField",
                        model: "StupUtaj = st_utaj_id"
                    });

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            this.SetReadOnly(true);
            
            if (this.ssd_det_spznak == 1) {
                this.findFormRows("spZnakRow").hide();
                this.findFormRows("vecnaSkupinaRow").hide();
            }

            if(!this.PristupFieldVisible) {
                this.findFormRows("pristupRow").hide(); //ToDO zatím není povolen "přístup"
            }
            
        },
        PrepnoutEditacniMode: function () {
            var that = this;
            if(this.model.EditMode) {
                this.dialogs.alert(this.JizJsteVEditModuErrText);
                return;
            }

            if(this.model.Editable == "false") {
                this.dialogs.alert(this.DokumentNelzeEditovatErrText);
                return;
            }

            if(this.model.Editable == "true") {
                this.CreateMenu(true);
                return;
            }

            if(this.model.Editable == "redistribuce") {
                var _this = this;

                var qDialog = this.dialogs.messageBox("jres:26256676", this.EditModeRedistribuceRequest, [GDlg.mbbYesNo], GDlg.mbiQuestion); //RC 26256676 : Dotaz

                qDialog.on("closed", function (event) {
                    if(event.returnValue === 'yes') {
                        _this.CreateMenu(true);
                    }
                });
            }
        },
        ZrusitZmenyClick: function () {
            if (!this.model.EditMode) {
                this.dialogs.alert(this.NejsteEditModeErrText);
                return;
            }

            var _this = this;
            var qDialog = this.dialogs.messageBox("jres:26256676", this.ZrusitZmenyRequest, [GDlg.mbbYesNo], GDlg.mbiQuestion); //RC 26256676 : Dotaz

            qDialog.on("closed", function (event) {
                if(event.returnValue === 'yes') {
                    // nastaveni default hodnot:

                    var fields = _this.findFields();

                    fields.gfield("model", "apply", _this.model);

                    _this.CreateMenu(false);
                }
            });

        },
        SaveChanges: function (flagCloseWin) {
            if(!this.defaultForm.gform("isValid")) {
                return;
            }

            this.findFields().gfield("model", "collect", this.model);

            if(!this.model.EditMode) {
                this.dialogs.alert(this.NejsteEditModeErrText);
                return;
            }

            var _this = this;
            var l_oParamsJSON = { "ixp": this.Ixp, "model": this.model };

            this.call(["SavePodrobnostiDokumentu", l_oParamsJSON]).done(
                function (data, content) {
                    _this.probehloUlozeni = true;
                    _this.CreateMenu(false);
                   
                    if(flagCloseWin) {
                        _this.DetailWindowClose();
                    }
                }
            );
        },
        DetailWindowClose: function () {
            var that = this;
            if (!this.model.EditMode) {
                this.tryClose(this.probehloUlozeni);
            } else {
                var _this = this;
                var qDialog = this.dialogs.messageBox("jres:26256676", this.OknoZavritRequest, [GDlg.mbbYesNo], GDlg.mbiQuestion); //RC 26256676 : Dotaz

                qDialog.on("closed", function (event) {
                    if(event.returnValue === 'yes') {
                        _this.tryClose(that.probehloUlozeni);
                    }
                });
            }
        },
        CreateMenu: function (EditMode) {
            this.model.EditMode = EditMode;

            this.actions.actOK.enabled(EditMode);
            this.actions.actZrusitZmeny.enabled(EditMode);
            this.actions.actUlozit.enabled(EditMode);

            if(EditMode) {
                this.actions.actEditace.enabled(false);
            } else {
                this.actions.actEditace.enabled(this.model.Editable != "false");
            }

            this.SetReadOnly(!EditMode);
        },
        SetReadOnly: function (readOnly) {

            if (this.ssd_det_spznak != 1) {
                this.findFields("spPlField").gfield("option", { disabled: readOnly });
                this.findFields("spZnField").gfield("option", { disabled: readOnly });
                this.findFields("VecnaSkupinaField").gfield("option", { disabled: readOnly });
            }

            if(this.PristupFieldVisible) {
                this.findFields("pristupField").gfield("option", { disabled: readOnly });
            }

            this.findFields("PocListu,PocStran,PocPriloh,PocListuPriloh,PocKopii").gfield("option", "disabled", readOnly);

        }
    }, { pure: true });
})(jQuery);
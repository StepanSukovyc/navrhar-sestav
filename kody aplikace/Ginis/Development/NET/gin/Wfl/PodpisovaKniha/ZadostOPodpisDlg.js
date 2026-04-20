(function ($) {
    "use strict";
    namespace("Gordic.Wfl.ZAPO", {
        GroupResult: null,
        GroupResultVlozeniEPK: null,
        KpiSelectedSubjectsItems: [],
        onContentReady: function () {

            this.createMenuBar();
            var commandBarActions = [];

            if (this.actions.actLocationSignature) {
                commandBarActions.push({ action: this.actions.actLocationSignature });
            }

            commandBarActions.push({ action: this.actions.actVlozitDoEpk, primary: true });
            commandBarActions.push({ action: this.actions.actCancel });

            this.commandBar(commandBarActions);

            this.getBadgeHandVisualSign();

            var that = this;
            this.comparisonBadge = new GObservableObject({ value: 0 });
            var l_aFilterTypPozadPod = [];

            this.createSidePanels();

            if (this.IsSpis) { // SPIS
                // shodné jak dokument, pouze nedávají logiku úkony 10 (podepsat) a 30 (podepsat a schválit)

                if(this.SslEpkPlusPar === 1) { // SSL EPK - Rozšíření pro posuzování/odsouhlasení dokumentů (EPK+)
                    l_aFilterTypPozadPod = [20, 40];
                } else if (this.SslEpkPlusPar === 2) {
                    l_aFilterTypPozadPod = [20, 40, 50];
                } else if (this.SslEpkPlusPar === 3) {
                    l_aFilterTypPozadPod = [20, 40, 50, 60];
                } else {
                    l_aFilterTypPozadPod = [20]; // na spisu nemůže dát žádný požadavek než schválit, povolení vložení spisu do EPK je řízeno gin_rad_epkprs - GIN EPK - Povolení pořídit / přidat žádost o posouzení, schválení, vzetí na vědomí spisu ref T7412
                }

                if(this.ElObrazDto && this.ElObrazDto.File) {
                    l_aFilterTypPozadPod.push(10);
                }

                if(!this.Schvalen) {
                    l_aFilterTypPozadPod.push(20);
                }

                if(l_aFilterTypPozadPod.length == 0) {
                    l_aFilterTypPozadPod = [-1]; // prazdne pole se chape jako bez filtru a zobrazi vše - proto nesmyslna hodnota
                }
            } else { // DOKUMENT
                if(this.LzePridatZadostOPodpis) {
                    if (this.SslEpkPlusPar === 1) { // SSL EPK - Rozšíření pro posuzování/odsouhlasení dokumentů (EPK+)
                        if (this.Schvalen) {
                            l_aFilterTypPozadPod = [10, 40];
                        } else {
                            l_aFilterTypPozadPod = [10, 20, 30, 40];
                        }
                    } else if (this.SslEpkPlusPar === 2) {
                        if (this.Schvalen) {
                            l_aFilterTypPozadPod = [10, 40, 50];
                        } else {
                            l_aFilterTypPozadPod = [10, 20, 30, 40, 50];
                        }
                    } else if (this.SslEpkPlusPar === 3) {
                        if (this.Schvalen) {
                            l_aFilterTypPozadPod = [10, 40, 50, 60];
                        } else {
                            l_aFilterTypPozadPod = [10, 20, 30, 40, 50, 60];
                        }
                    } else if (this.SslEpkPlusPar === -1) { // jen podepsat a podepsat se schválením ref T8608
                        if (this.Schvalen) {
                            l_aFilterTypPozadPod = [10];
                        } else {
                            l_aFilterTypPozadPod = [10, 30];
                        }
                    } else if (this.Schvalen) {
                        l_aFilterTypPozadPod = [10];
                    } else {
                        l_aFilterTypPozadPod = [10, 20, 30];
                    }
                } else if (this.LzePridatZadostDoEpkPouzeVzitNaVedomi) {
                    l_aFilterTypPozadPod = [50];
                }
            }
  
            //if(this.EpkUkonpripPar > 0 && this.model.PrizSpis == 2) { // T43058
            //    if(this.model.IxsTyp == this.model.IxsTyp_dokument_eKlep) {// IDentifikátor typu dokumentu pro připomínkové řízení eKlep
            //        l_aFilterTypPozadPod.push(70); // Připomínkovat
            //    }
            //    if(this.model.IxsTyp == this.model.IxsTyp_material_pro_eKlep) { // IDentifikátor typu dokumentu pro Materiál pro eKLEP
            //        l_aFilterTypPozadPod.push(80); // Zpracovat
            //    }

            //   // l_aFilterTypPozadPod = l_aFilterTypPozadPod.concat([70, 80]); 
            //}

            var skFunkciData = [{ value: "_", label: 'jres:26225926' }]; //RC 26225926 : Vše

            this.SeznamFunkciDataTable.forEach(function (entry) {
                skFunkciData.push({ value: entry.ixs_sfu, label: entry.nazev_sfu });
            });

            // predplneni policka duvod podle posledne vybrane hodnoty
            var l_nTypPozadUserSetting = this.userSettings.get("TypPozad");
            var l_sPopisUserSetting = this.userSettings.get("Popis");
            var l_sIxsSfuUserSetting = this.userSettings.get("IxsSfu");
            var l_sPrioritaUserSetting = this.userSettings.get("Priorita");
            var l_sUzoUserSetting = this.userSettings.get("Uzo");
            var l_sIxsDpoUserSetting = this.userSettings.get("IxsDpo");

            if(l_nTypPozadUserSetting != null) {
                this.model.TypPozad = l_nTypPozadUserSetting;
            }
            if(l_sPopisUserSetting != null) {
                this.model.Popis = l_sPopisUserSetting;
            }
            if(l_sIxsSfuUserSetting != null) {
                this.model.IxsSfu = l_sIxsSfuUserSetting;
            }
            if(l_sPrioritaUserSetting != null) {
                this.model.Priorita = l_sPrioritaUserSetting;
            }
            if(l_sUzoUserSetting != null) {
                this.model.Uzo = l_sUzoUserSetting;
            }
            if(this.DpoEnabled) {
                this.model.ixsDpo = l_sIxsDpoUserSetting;
            }

            var form = new Gordic.Forms
                .Form({ name: "FormZAPO", layoutDescriptor: "L1M1S1" })
                .addSection()
                .addRow({ label: "jres:26226259", required: true }) //RC 26226259 : Požadavek
                .addField("gselectbox", "w-12",
                    Gordic.Prefabs.Select.wflctpp(),
                    {
                        name: "duvodField",
                        model: "TypPozad=typ_pozad_pod",
                        serverFilters: {
                            typ_pozad_pod: l_aFilterTypPozadPod,
                        },
                        dropdown: true,
                        validators: [new Gordic.Validators.Required],
                        change: function (ev, data) {
                            if (data.value) {
                                that.ZmenaPozadavku(data.value.typ_pozad_pod);
                            }
                        },
                        helperCustomizer: function (data) {
                            var addByKeyTypPozadPod = function (oldData, newData, typPozadPod) {
                                var result = oldData.find(function (obj) {
                                    return obj.typ_pozad_pod === typPozadPod
                                })

                                if (result) {
                                    newData.push(result);
                                }

                                return newData;
                            }

                            var newData = [];
                            newData = addByKeyTypPozadPod(data, newData, 40); // posoudit 40
                            newData = addByKeyTypPozadPod(data, newData, 20); // schválit 20
                            newData = addByKeyTypPozadPod(data, newData, 30); // podepsat schválit 30
                            newData = addByKeyTypPozadPod(data, newData, 10); // podepsat 10
                            newData = addByKeyTypPozadPod(data, newData, 50); // vzit na vědomí 50
                            newData = addByKeyTypPozadPod(data, newData, 60); // splnit 60 
                            newData = addByKeyTypPozadPod(data, newData, 70); // Připomínkovat 70 
                            newData = addByKeyTypPozadPod(data, newData, 80); // Zpracovat 80 
                            // techto 8 hodnot mi diky serverovym filtrum staci, ostatni resit nemusim (klidne pridam, kdyz mi nekdo upresni poradi)

                            return newData;
                        }
                    })
                .addRow("jres:26226314") //RC 26226314 : Upřesnění
              //  .addField("gstringbox", "w-12", { name: "popisField", model: "Popis" });
                .addField("gselectbox", "w-12",
                    {
                        model: "model.Popis=value.data"
                    },
                    Gordic.Gin.Prefabs.gmemorySelectbox({
                        userSettings: this.userSettings,            // (povinne)instance usersettings z contentu 
                        name: "popisField",                       // (povinne) name políčka, použije se i jako klíč pod který se boudou ukládat hodnoty v gstore
                        type: "string",                             // (nepovine) zatím jen jeden typ
                        //rememberLast: true,                         // (nepovine) default false   zda se má nastavovat jako initialValue poslední hodnota co ručně napsal/vybral uživatel
                        //staticData: ["staticke data", "dalsi"],  //(nepovine) staticke hodnoty co se budou nabízet uživateli pokaždé nezavisle na countOfRemembered
                        //countOfRemembered: 20        //(nepovine) default 10     počet pamatovaných hodnot           !!!!!!! šetřit gstor
                    })
                ); 

            if (!this.ListMode) {
                form.addRow({ label: "jres:26226260", required: true }) //RC 26256045 : Spisovému uzlu/funkci/osobě
                    .addField("gselectbox", "w-12",
                        Gordic.Gin.Fields.ginsfunSSU(
                            {
                                name: "funField",
                                model: "NadrizeneIxsFun=ixs_fun",
                                validators: [new Gordic.Validators.Required],
                            }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO));
            } else {
                form.addRow("jres:26226358") //RC 26226358 : Sk. funkcí
                    .addField("gselectbox", {
                        name: "skupinyFunkciField",
                        model: "model.IxsSfu=value.value",
                        dropdown: true,
                        itemTemplate: "{label}",
                        data: new Gordic.Data.View(skFunkciData, { key: "value" }),
                        change: function (ev, data) {
                            that.SkupinyFunkciChange(data.value);
                        }
                    })
            }
             
            form.addRow({ label: "jres:26227366", required: this.model.UseTermin }) //RC 26227366 : Termín
                .addField("gdatebox", "w-12", { name: "terminField", model: "model.Termin=value", minValue: new Date() })
                .addRow({ label: "jres:32000028", required: true }) //RC 32000028 : Priorita
                .addField("gselectbox", {
                    name: "fieldPriorita",
                    multi: false,
                    // list: true,
                    dropdown: true,
                    //verticalButtons: true,
                    itemTemplate: "{nazev}",
                    // itemWidth: "",
                    //helperColumns: ["nazev"],
                    //itemClass: function (value) {
                    //    if((value as any).disabled) {
                    //        return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
                    //    }
                    //},
                    data: new Gordic.Data.View([
                        { nazev: "jres:26227438", id: 0 }, //RC 26227438 : Nízká
                        { nazev: "jres:26227439", id: 1 }, //RC 26227439 : Střední
                        { nazev: "jres:26227440", id: 2 }, //RC 26227440 : Vysoká
                        { nazev: "jres:26227471", id: 3 } //RC 26227471 : Kritická
                    ], { key: "id" }),
                    model: "model.Priorita=value.id",
                    initialValue: { id: 0 },
                    change: function (ev, selected) {

                    },
                    validators: [new Gordic.Validators.Required()]
                });

            if(this.DpoEnabled) {
                form.addRow("jres:26227276") //RC 26227276 : Šablona podpisu
                    .addField("gselectbox", Gordic.Prefabs.Select.wflsdpo(),
                        {
                            name: "sablonaPodpisu",
                            model: "model.ixsDpo = value.ixs_dpo",
                            serverFilters: {
                                ktg_duv_podp: [80, 90, 100, 110],
                            },
                            change: function (ev, changeObj) {
  
                            },
                        });
            }

            form.addRow({ label: "jres:26227377", required: true }) //RC 26227377 : Barevné označení
                .addField("gcolorpickerfield", {
                    name: "fieldColor",
                    uzo: this.model.Uzo, // vstupní hodnota
                    model: "model.Uzo=value",
                    //type: "epk"
                });

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            //if(this.validators) {
            //    fields.gfield("model", "validators", this.validators);
            //    Gordic.Utils.Form.markRequired(this.defaultForm);
            //}

            var terminField = this.findFields("terminField");
            terminField.gfield("option", { validators: [new Gordic.Validators.Required] });

            if(!this.model.UseTermin) {
                terminField.gfield("option", { disabled: true });
            }

            if(this.ListMode) {
                form.addSection();
                this.LoadGrid();
            } else {
                this.findFields("funField").gfield("option", { disabled: true });
            }

            // gpreset by do budoucna mohl nahradit stávající přednastavování. Otestováno, funguje, ale zatím není v sudé větvi, takže přepnu chování až později (a třeba až po schválení, že to tam může být)
            //if(this.element.gpreset) {
            //    this.element.gpreset({ placeTo: PlaceEnum.menu, elements: this.findFields("duvodField,popisField,funField,skupinyFunkciField,fieldPriorita,sablonaPodpisu,fieldColor"), userSettings: this.userSettings }/* as GPresetOptions<IGPresetDefaultRecord>*/);
            //    this.element.gpreset("apply");
            //}
        },

        createSidePanels: function () {
            var that = this;
            //#region vytvoření gsidebaru pro seznam vybraných subjektů
            this.sidepanelEnabled = true;//

            if(this.sidepanelEnabled) {
                if(this.ListIxp.length == 1) { // jen pokud vkládám jen 1 dokument
                    this.element.gsidebar("addPanel", "right", {
                        side: "right",
                        leaf: { caption: "jres:26227740" }, //RC 26227740 : Schvalovací proces
                        caption: "jres:26227740", //RC 26227740 : Schvalovací proces
                        icon: "gi-schvyr",
                        customClass: "gssl-epk",
                        minWidth: 260,
                        width: 260,
                        open: function () {
                            var _this = $(this);

                            var opt = {
                                ID: "IDEpkHistorieSchvalovani",
                                taskId: "EpkHistorieSchvalovaniDetail",
                                Ixp: that.Ixp,
                                //SerCislo: componentDto.SerCislo           // thazmuka (12.04.2020) - vzhledem k tomu, že chci načíst všechny probíhající procesy, tak serCislo nepotřebuji
                                //IxsSpd: this.row.ixs_spd
                            };

                            var panelContent = new GContent(GContent.createInitializer(["Gordic.Wfl.WebClient.GHistorieSchvalovani", { serverParams: opt, parentContent: that }]), this)
                            panelContent.load();

                            _this.addClass("GHistorieSchvalovaniLoaded");

                        },
                        userSettings: that.userSettings
                    });
                }

                if(this.ListMode) {
                    this.element.gsidebar("addPanel", "right", {
                        id: "panelEpkSubjects",
                        side: "right",
                        leaf: {
                            caption: "jres:26227733", //RC 26227733 : Vybrané subjekty pro žádost o schválení/podpis
                            badge: that.comparisonBadge,
                        },
                        caption: "jres:26227733", //RC 26227733 : Vybrané subjekty pro žádost o schválení/podpis
                        icon: "fa-group",
                        customClass: "gssl-add-epk-sp",
                        minWidth: 220,
                        width: 220,
                        pinned: true,
                        open: function () {
                            var _this = $(that);

                            var opt = {
                                ID: "IDSubjektyVlozeniEpk",
                                taskId: "SubjektyVlozeniEpk",
                                kpiItems: that.KpiSelectedSubjectsItems
                            };

                            var panelContent = new GContent(GContent.createInitializer(["Gordic.Wfl.WebClient.SubjektyVlozeniEpk", { serverParams: opt, parentContent: that }]), this)
                            panelContent.load();

                            _this.addClass("GSubjektyVlozeniEpkLoaded");

                        },
                        userSettings: that.userSettings
                    });
                }
            }
            //#endregion
        },

        /** 
         * Výchozí načtení badge pro vizuální podpis (VP)
         * - je to pro situaci, kdy je VP navázán na Ixb při uložení na přílohách
         * thazmuka (31.3.2022)
         * */
        getBadgeHandVisualSign() {

            var that = this;
            var name = "Gordic.Wfl.Server.GEpkVisualSignAsyncTask";
            var priloha = this.ElObrazDto;

            if (priloha != null) {
                Gordic.Async.GTaskManager.cancel(name);     // ukončení async. úlohy pokud existovala
                var Ixb = priloha.File != null ? priloha.File.Ixb : "";
                let asyncTask = Gordic.Async.GTaskManager.start(name, { Ixp: priloha.Ixp, Ixb: Ixb });
                asyncTask
                    .getPromise()
                    .then(function (output) {
                        if (that.closed === true) {
                            Gordic.Async.GTaskManager.cancel(asyncTask);
                            return;
                        }
                        var handVisualSign = false; // příznak ručního viz. podpisu
                        if (output != null && output.result != null && output.result.VisualSignCount != null && output.result.VisualSignCount > 0)  // kontrola na neexistenci property
                            handVisualSign = true;
                        that.updateBadgeUmisteniPodpisu(handVisualSign);
                    })
                    .always(function() {
                        Gordic.Async.GTaskManager.clean(asyncTask);
                    })
            }
            else {
                this.updateBadgeUmisteniPodpisu(false);
            }
        },

        /**
         * update badge pro vizuální podpis
         * @param {any} handle
         */
        updateBadgeUmisteniPodpisu(handle) {

            var id = "idHandVisualSignPositionBadge";
            var value = "jres:32000690"; //RC 32000690 : Ručně
            var tooltip = "jres:32000691"; //RC 32000691 : Obsahuje ručně zadaný vizuální podpis

            if (this.badgeUmisteni == null) {
                this.badgeUmisteni = new GObservableObject({
                    id: id,
                    value: handle === true ? value : "",
                    tooltip: handle === true ? tooltip : ""
                })
            }
            else {
                this.badgeUmisteni.update({
                    id: id,
                    value: handle === true ? value : "",
                    tooltip: handle === true ? tooltip : ""
                });
            }
        },

        updateBadgeUmisteniPodpisuAttachment(handle) {
            var id = "idHandVisualSignPositionBadgeAttachment";
            var value = "jres:32000690"; //RC 32000690 : Ručně
            var tooltip = "jres:32000691"; //RC 32000691 : Obsahuje ručně zadaný vizuální podpis
            if (this.badgeUmisteniAttachment == null) {
                this.badgeUmisteniAttachment = new GObservableObject({
                    id: id,
                    value: handle === true ? value : "",
                    tooltip: handle === true ? tooltip : ""
                })
            }
            else {
                this.badgeUmisteniAttachment.update({
                    id: id,
                    value: handle === true ? value : "",
                    tooltip: handle === true ? tooltip : ""
                });
            }
        },

        /** vytvořit menu pro dialog */
        createMenuBar: function() {

            var that = this;

            var menuBar = [];

            menuBar.push({
                favorite: true,
                primary: true,
                action: this.actions.actVlozitDoEpk
            });

            if(this.gin_pdf_pictpos !== 0 && this.epk_povumipod !== 0) {

                if (this.ElObrazDto && this.ElObrazDto.File) {
                    var extension = this.ElObrazDto.File.Type.toLowerCase();

                    if (extension === "pdf") {

                        this.updateBadgeUmisteniPodpisu(false);
                        menuBar.push({
                            favorite: true,
                            badge: this.badgeUmisteni,
                            action: this.actions.add(new GAction({
                                name: "actLocationSignature",
                                caption: "jres:26227443", //RC 26227443 : Umístit podpis na el. obraz
                                icon: "fa-map-marker",
                                run: function () {
                                    var cnt = that;
                                    var priloha = cnt.ElObrazDto;
                                    Gordic.Wfl.AttachmentUtils.addSignatureLocationWithTempConfig({
                                        cnt: cnt,
                                        ixp: priloha.Ixp,
                                        data: priloha,
                                        wflSignCreateConfig: that.tempWflSignCreateConfig
                                    })
                                        .then(function (opt) {
                                            if (opt != null && opt.tempWflSignCreateConfig != null) {
                                                // thazmuka (31.03.2022)
                                                if (opt.tempWflSignCreateConfig.VisualSignConfig != null &&
                                                    (opt.tempWflSignCreateConfig.VisualSignConfig.SignaturePositions != null &&
                                                        opt.tempWflSignCreateConfig.VisualSignConfig.SignaturePositions.length > 0)) {
                                                    that.tempWflSignCreateConfig = opt.tempWflSignCreateConfig;          // global (this) property
                                                    if (opt.badgeUmisteniPodpisu === true)
                                                        that.updateBadgeUmisteniPodpisu(true);
                                                }
                                                // zavření komponenty
                                            }
                                    })


                                }
                            }))
                        });

                    }
                } else {
                    that.showFlash("jres:26227564", "g-state-error", 8000, "idPositionSign"); //RC 26227564 : Dokument/spis nemá hlavní přílohu
                }

                if (this.omedis === 1) {
                    this.updateBadgeUmisteniPodpisuAttachment(false);
                    menuBar.push({
                        badge: this.badgeUmisteniAttachment,
                        action: this.actions.add(new GAction({
                            name: "actVisualSignAttachments",
                            run: () => {

                                Gordic.Wfl.Dialogs.GEpkVisualAttachmentGridDlg(this, {
                                    Ixp: that.Ixp
                                }).on('close', (output, data) => {
                                    if (data != null) {
                                        that.tempSignConfig = data;
                                        that.tempWflSignCreateConfigAttachments = Object.values(data); // to arr
                                        this.updateBadgeUmisteniPodpisuAttachment(true);
                                    }
                                })

                            },
                            icon: "fa-map-marker",
                            caption: "jres:32001140", //RC 32001140 : Umístit podpis na el. přílohy
                        })),
                        favorite: true
                    });
                }
            }

            menuBar.push({
                favorite: true,
                action: this.actions.add(new GAction({
                    name: "actZrusit",
                    icon: "fa-times",
                    caption: "jres:26227629", //RC 26227629 : Zrušit požadavek
                    tooltip: "jres:26227628", //RC 26227628 : Zrušit existující požadavek
                    enabled: false,
                    run: function () {
                        that.ZrusitClick();
                    }
                }))
            });

            menuBar.push({
                id: "akceSepar1",
                type: "separator",
            });

            menuBar.push({
                favorite: true,
                action: this.actions.add(new GAction({
                    name: "actSave",
                    icon: "gi-save|gi-settings gi-stack-pos--rb gi-bgw",
                    caption: "jres:26226283", //RC 26226283 : Uložit nastavení
                    run: function () {
                        that.SaveDuvodZadosti();
                    }
                }))
            });

            menuBar.push({
                favorite: false,
                action: this.actions.add(new GAction({
                    name: "actClearSettings",
                    icon: "gi-minus_bold|gi-settings gi-stack-pos--rb gi-bgw",
                    caption: "jres:26227993", //RC 26227993 : Smazat nastavení
                    run: function () {
                        that.ClearSettings();
                    }
                }))
            });

            this.menuBar(menuBar);

        },

        LoadGrid: function () {
            var that = this;

            var gridColumnsDefinition = new Gordic.Data.GridFormat();

        //    if(this.GroupResult != null) {
                gridColumnsDefinition.addIconColumn({
                    name: "ico_status",
                    caption: "jres:26226691", //RC 26226691 : Výsledek operace
                    width: 30,
                    customClass: "center",
                    fixedWidth: true,
                    iconTemplate: function (row) {
                        if(that.GroupResult != null) {
                            var obj = that.GroupResult.find(function (obj) {
                                //if(row.ser_cislo_pozadavku != null) {
                                //    return obj.Key === (that.Ixp + row.ser_cislo_pozadavku);
                                //}
                               //return false;

                                return obj.Key === (that.Ixp + row.ixs_sfu + row.ixs_fun);
                            });

                            if (obj != null) {
                               // if (obj.IsError === true) {
                                if(obj.Error !== "") { // nestandardni obsluha jen pro tento dialog
                                    return { icon: Gordic.Gin.Icons.StavEnum.neprovedeno, tooltip: obj.Error };
                                } else {
                                    return { icon: Gordic.Gin.Icons.StavEnum.provedeno, text: "", tooltip: ""};
                                }
                            }
                        }

                        return null;
                    }
                })
          //  }

            gridColumnsDefinition.addIconColumn({
                name: "ico_pozadavek_exist",
                caption: "jres:26227738", //RC 26227738 : Požadavek zadán
                width: 30,
                customClass: "center",
                fixedWidth: true,
                iconTemplate: function (row) {
                    if(row.dat_pozadavku != null) { // nestandardni obsluha jen pro tento dialog
                        return { icon: "gi-epk_vlozit", tooltip: "jres:26227739" + " " + $.datepicker.formatDate('dd.mm.yy', new Date(row.dat_pozadavku)) }; //RC 26227739 : Požadavek na toto funkční místo byl už zadán dne:
                    }

                    return null;
                }
            })

            gridColumnsDefinition.addIconColumn({
                name: "ico_pozadavek_stav",
                caption: "jres:26227890", //RC 26227890 : Stav požadavku
                width: 30,
                customClass: "center",
                fixedWidth: true,
                iconTemplate: function (row) {
                    if (row.zpus_vyriz_pozadavku != null && row.zpus_vyriz_pozadavku == 2) { // nestandardni obsluha jen pro tento dialog
                        return { icon: "fa-times-circle", tooltip: "jres:26227891" }; //RC 26227891 : Nevyřízeno/vráceno k přepracování
                    }

                    return null;
                }
            })

            gridColumnsDefinition.addTextColumn({
                    name: "nazev_rf",
                    caption: "jres:26226281", //RC 26226281 : O schválení/podpis žádat
                })
                .addDateColumn({
                    name: "dat_pozadavku",
                    caption: "jres:26226360", //RC 26226360 : Požadavek vložen
                    width: 100,
                    fixedWidth: true,
                });


            this.gridSeznamOpravnenychOsob = $("<div>").appendTo(this.element)
                .gautofit()
                .ggrid({
                    name: "GridSeznamOpravnenychOsob",
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit (defaultne by melo byt toto), full
                    customClass: "js-gridKartoteka",
                    navigationMode: "row", // row, cell
                    rowsChecked: "checked",
                    //rowsEnabled: function (dataRow) {
                    //    if(dataRow && dataRow.data && dataRow.data.dat_pozadavku != null) {
                    //        return false;
                    //    }
                    //    return true;
                    //},
                    rowsClass: function (dataRow) {
                        if(dataRow && dataRow.data && dataRow.data.dat_pozadavku != null) {
                            return " grid-noview-wfl-list ";
                        } else return "  ";
                    },
                    searchColumns: ["nazev_rf", "dat_pozadavku"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                    multi: that.model.GridShowSelectAll,
                    selection: function (ev, ctx) {
                        var selection = ctx.getSelection();
                        var zrusitEnabled = false;

                        if(selection.length === 1 && that.HromadnaAkce === false) {
                            var row = selection[0];

                            if(that.GinEpkNadrfunPar == "" && row != null) {
                                //if (row.dat_pozadavku != null) {
                                if (row.ser_cislo_pozadavku != null) {
                                    zrusitEnabled = true;
                                }
                            }
                        }

                        // info: (thazmuka 2.7.2024)
                        // v případě, že je vybráno více funkčních míst, tak je vizuální umístění zakázáno
                        if (selection != null && selection.length > 1) {
                            if (that.actions.actLocationSignature != null) {
                                that.actions.actLocationSignature.enabled(false);
                            }
                        }
                        else {
                            if (that.actions.actLocationSignature != null) {
                                that.actions.actLocationSignature.enabled(true);
                            }
                        }


                        that.actions.actZrusit.enabled(zrusitEnabled);
                        // aktualizace batch
                        that.comparisonBadge.value = selection.length;
                        that.comparisonBadge.update();

                        // aktualizace sidepanel
                        that.LoadSidePanelSubjects(selection);
                    },
                });

            this.LoadData();
        },
        LoadData: function () {
            var that = this;
            this.findFields().gfield("model", "collect", this.model);

            //nacteni dat do gridu
            this.call("GetGridData", { "model": this.model })
                .done(function (retVal) {
                    if (retVal) {
                        // oznacim radky, ktere jsou zapamatovany v US
                        that.SelectedIxsFunUS = that.userSettings.get("SelectedIxsFun");
 
                        $(that.GridData).each(function (index, element) {
                            if($.inArray(element.ixs_fun, that.SelectedIxsFunUS) != -1 && element.dat_pozadavku == null) { // pro zaskrtnuti nesmi pozadavek existovat
                                element.checked = true;
                            }
                        });

                        var view = new Gordic.Data.View(that.GridData, { key: "ixs_fun" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                        that.gridSeznamOpravnenychOsob.ggrid("setData", view, true);     //true = prekresleni gridu

                        that.DataView = view;

                        that.actions.actVlozitDoEpk.enabled(that.VlozitEnabled === true);

                        that.comparisonBadge.value = that.GetSelectedRowsInList().length;
                        that.comparisonBadge.update();
                    }
                });
        },
        Reload: function () {
            this.LoadData();
        },
        LoadSidePanelSubjects: function (Selection) {
            var that = this;

            this.KpiSelectedSubjectsItems = [];

            $(Selection).each(function (index, element) {
                that.KpiSelectedSubjectsItems.push({
                    Title: element.nazev_rf,
                    Text: element.nazev_rf,
                    Tooltip: element.nazev_rf
                })
            });

            var sidebar = $.content(this.element.gsidebar("getPanel", "panelEpkSubjects")?.find(".epk-subjekty-sidebar-class"))

            if(sidebar != null) {
                sidebar.createKpi(this.KpiSelectedSubjectsItems);
            }

            //$.content(this.element.gsidebar("getPanel", "panelEpkSubjects")?.find(".epk-subjekty-sidebar-class"))?.load({ // server load, ale ten je pomalý
            //    ID: "IDSubjektyVlozeniEpk",
            //    taskId: "SubjektyVlozeniEpk",
            //    kpiItems: kpiItems,
            //});
        },
        SkupinyFunkciChange: function (IxsSfu) {
            if(this.model.IxsSfu !== IxsSfu.value) { // jen pokud doslo ke zmene
                this.LoadData();
            }
        },
        GetSelectedRowsInList: function () {
            var l_asSelectedRows = []; // u stareho chovani posilam "" - to znamena, ze se nema ukladat, aby nedoslo k prepsani jiz drive ulozenych hodnot

            if(this.ListMode) { // nove chovani - seznam funkci
                var l_aoSelections = this.gridSeznamOpravnenychOsob.ggrid("getSelection", true);
               // var l_aoSelections = this.gridSeznamOpravnenychOsob.ggrid("getSelection", true, true); // pouze zaškrtnuté bez aktivního

                if(l_aoSelections.length > 0) {

                    l_aoSelections.forEach(function (entry) {
                        var rowData = entry.data;

                        l_asSelectedRows.push(rowData.ixs_fun);
                    });
                }
            }

            return l_asSelectedRows;
        },
        SaveDuvodZadosti: function () {
            var that = this;
            this.findFields().gfield("model", "collect", this.model);

            var l_asSelectedIxsFun = this.GetSelectedRowsInList();

            this.userSettings.set("TypPozad", this.model.TypPozad);
            this.userSettings.set("Popis", this.model.Popis);
            this.userSettings.set("SelectedIxsFun", l_asSelectedIxsFun);
   
            this.userSettings.set("Priorita", this.model.Priorita);
            this.userSettings.set("Uzo", this.model.Uzo);
 
            if(this.DpoEnabled) {
                this.userSettings.set("IxsDpo", this.model.ixsDpo);
            }

            if(this.ListMode) {
                this.userSettings.set("IxsSfu", this.model.IxsSfu);
            }
        },
        ClearSettings: function () {
            var that = this;

            this.dialogs.confirm("jres:26227994", "jres:26227995", 500, 150).on("close", function (ev, retVal) { //RC 26227995 : Opravdu chcete smazat uživatelské nastavení dialogu?
                if(retVal === "yes") {
                    that.userSettings.set("TypPozad", null);
                    that.userSettings.set("Popis", null);
                    that.userSettings.set("SelectedIxsFun", []);

                    that.userSettings.set("Priorita", 0);
                    that.userSettings.set("Uzo", "0");

                    if(that.DpoEnabled) {
                        that.userSettings.set("IxsDpo", null);
                    }

                    if(that.ListMode) {
                        that.userSettings.set("IxsSfu", "_");
                    }
                }
            });

        },
     /*   OznacitClick: function () {
            var that = this;
            this.findFields().gfield("model", "collect", this.model);

            var l_asSelectedIxsFun = this.GetSelectedRowsInList();

            var l_oJSONPars = { "model": this.model, "SelectedIxsFun": l_asSelectedIxsFun };

            this.call(["OznacitClick", l_oJSONPars]).done(
                function(retVal, content) {
                    if(retVal) {
                        var view = new Gordic.Data.View(that.GridData, { key: "ixs_fun" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                        that.gridSeznamOpravnenychOsob.ggrid("setData", view, true);     //true = prekresleni gridu
                    }
                }
            );
        },
        OdznacitClick: function () {
            var that = this;
            this.findFields().gfield("model", "collect", this.model);

            var l_asSelectedIxsFun = this.GetSelectedRowsInList();

            var l_oJSONPars = { "model": this.model, "SelectedIxsFun": l_asSelectedIxsFun };

            this.call(["OdznacitClick", l_oJSONPars]).done(
                function (retVal, content) {
                    if(retVal) {
                        var view = new Gordic.Data.View(that.GridData, { key: "ixs_fun" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                        that.gridSeznamOpravnenychOsob.ggrid("setData", view, true);     //true = prekresleni gridu
                    }
                }
            );
        },*/
        VlozitDoEpkClick: function () {

            var that = this;

            if(!this.defaultForm.gform("isValid")) {
                return;
            }

            this.findFields().gfield("model", "collect", this.model);
            var l_asSelectedIxsFun = [];

            if(this.GinEpkNadrfunPar === "") { // nove chovani - seznam funkci
                l_asSelectedIxsFun = this.GetSelectedRowsInList();

                if(this.GinEpkpri1Par === 1) {
                    if(l_asSelectedIxsFun.length > 1) {
                        GDlg.alert("jres:26226313"); //RC 26226313 : Lze zadat pouze jednu žádost o podpis.
                        return;
                    }
                }

                if(l_asSelectedIxsFun.length == 0) {
                    GDlg.alert("jres:26227568"); //RC 26227568 : Není vybráno žádné funkční místo.
                    return;
                }
            } else {
                l_asSelectedIxsFun.push(this.model.NadrizeneIxsFun);
            }

          //  this.model.Uzo = this.findFields("fieldColor").gfield("getValue");

            var visualSignConfigArr = [];

            // EL. OBRAZ
            if (that.tempWflSignCreateConfig != null) {
                visualSignConfigArr.push(that.tempWflSignCreateConfig);
            }
            // EL. PŘÍLOHY
            if (that.tempWflSignCreateConfigAttachments != null &&
                that.tempWflSignCreateConfigAttachments.length > 0) {
                visualSignConfigArr = visualSignConfigArr.concat(that.tempWflSignCreateConfigAttachments);
            }

            var l_oJSONPars = {
                "model": this.model,
                "SelectedIxsFun": l_asSelectedIxsFun,
                "TempWflSignCreateConfig": visualSignConfigArr
            };

            this.call(["VlozitDoEpkClick", l_oJSONPars]).done(
                function (retVal, content) {
                    if (retVal) {
                        if(that.HromadnaAkce && that.GroupResultVlozeniEPK != null) {
                            that.retValue = { GroupResult: that.GroupResultVlozeniEPK };
                        } else {
                            that.retValue = true; // TODO sjednotit rv a vždy vracet GroupResult
                        }
                        
                        that.tryClose();
                    }
                }
            );
        },

        ZmenaPozadavku: function (typ_pozad_pod) {
            var fieldSablonaPodpisu = $.content(this).findFields("sablonaPodpisu");

            if(this.DpoEnabled && fieldSablonaPodpisu != null) {
                var enabled = typ_pozad_pod == 10 || typ_pozad_pod == 30;

                fieldSablonaPodpisu.gfield("option", "disabled", !enabled);
            }
        },

        ZrusitClick: function () {
            var that = this;
            this.GroupResult = [];

            var selection = this.gridSeznamOpravnenychOsob.ggrid("getSelection", true);

            if(selection.length === 1) {
                var row = selection[0].data;

                var l_oJSONPars = {
                    "model": this.model,
                    "serCislo": row.ser_cislo_pozadavku,
                    "ixsSfu": row.ixs_sfu,
                    "ixsFun": row.ixs_fun
                };

                this.call(["ZrusitClick", l_oJSONPars])
                    //.done(function (retVal, content) {
                    //    that.gridSeznamOpravnenychOsob.ggrid("refreshRows");
                    //})
                    //fail(function (val) {
                    //    that.gridSeznamOpravnenychOsob.ggrid("refreshRows");
                    //})
                    .always(function (rv) {
                        if(rv != null && rv != "") {
                            that.dialogs.error(rv);
                        }
                        that.Reload();
                       // that.gridSeznamOpravnenychOsob.ggrid("refreshRows");
                    });
            }
        },

        closing: function () {
            var def = $.Deferred();
            if (this.retValue) {
                def.resolve(this.retValue);
            } else {
                def.resolve();
            }

            return def.promise();
        },
    }, { pure: true });
})(jQuery);
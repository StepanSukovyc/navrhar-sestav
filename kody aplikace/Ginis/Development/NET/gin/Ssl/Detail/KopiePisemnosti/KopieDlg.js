(function ($) {
    "use strict";
    namespace("Gordic.Ssl.KopieDlg", {
        flashPanelTimer: 5000,
        IxpKopieArray: [],

        onContentReady: function () {
            var that = this;
            this.title = "jres:26255193"; //RC 26255193 : Kopie dokumentu

            this.actions.addRange({
                actMother: {
                    icon: "gi-paper",
                    caption: "jres:26255283", //RC 26255283 : Mateřský
                    tooltip: "jres:26256337", //RC 26256337 : Mateřský dokument
                    run: function (ev, ctx) {
                        that.MaterskyDokument();
                    }
                },
                actNova: {
                    icon: ["gi-copy", "fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                    caption: "jres:26256778", //RC 26256778 : Nová kopie
                    //   tooltip: "jres:26256778", //RC 26256778 : Nová kopie
                    enabled: that.LzeVytvoritKopiiPisemnosti,
                    run: function (ev, ctx) {
                        that.NovaKopie();
                    }
                },
                actDupl: {
                    icon: "gi-copy",
                    caption: "jres:26256779", //RC 26256779 : Nový duplikát
                    enabled: that.LzeVytvoritDuplikat,
                    run: function (ev, ctx) {
                        that.NovyDuplikat();
                    }
                },
                actHrom: {
                    icon: ["gi-copy", "gi-refresh g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                    caption: "jres:26255285", //RC 26255285 : Hromadně
                    enabled: that.LzeVytvoritKopiiPisemnosti,
                    run: function (ev, ctx) {
                        that.Hromadne();
                    }
                },
                actVlozitVseDoPoznBloku: new GAction(Gordic.Wfl.PreActions.PoznamkovyBlokPridatHromadne({
                    inputData: function (action, event, ctx, param) {
                        var deferred = $.Deferred();

                        var ixpArr = that.IxpKopieArray;
                        if (ixpArr.length > 0) {
                            return deferred.resolve({
                                IxpArr: ixpArr
                            }).promise();
                        } else {
                            that.dialogs.error("jres:26257054"); //RC 26257054 : Nejsou záznamy pro provedení akce.
                            return deferred.reject();
                        }
                    },
                    done: function (retVal) {

                        if(retVal != null) {
                            //if (retVal.GroupResult) {
                            //    that.GroupResult = retVal.GroupResult;
                            //} else {
                            //    that.GroupResult = undefined;
                            //}

                            that.dialogs.alert("jres:26257055"); //RC 26257055 : Kopie byly vloženy do pracovního bloku.
                        }
                    },
                    //fail: function (retVal) {
                    //    that.dialogs.error("jres:26256857"); //RC 26256857 : Nepodařilo se vložit do pracovního bloku.
                    //},
                    always: function (retVal) {
                        that.Reload();
                    }
                })),
                actOpravitMetadataPoKontroleSeznam:
                    Gordic.Ssl.PreActions.OpravitMetadataPoKontroleSeznam({  //(Gordic as any).Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam
                        inputData: function () {
                            var IxpArray = [that.model.IxpOriginalu];
                            return { IxpArray: IxpArray, CallingSource: "DetailSSL" };
                        },
                        done: function (retVal) {
                            //content.tryReloadDetail();
                        },
                        fail: function () {
                            //content.tryReloadDetail();
                        },
                    })
                ,
                actCancel: {
                    icon: undefined,
                    caption: "jres:26256543", //RC 26256543 : Zavří­t
                    run: function (ev, ctx) {
                        that.close();
                    }
                },
            });

            that.actions[Gordic.Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam].update({ enabled: false });

            this.menuBar([
                { action: this.actions.actMother, favorite: true },
                { action: this.actions.actNova, favorite: true },
                { action: this.actions.actDupl, favorite: true },
                { action: this.actions.actHrom, favorite: true },
                { action: this.actions.actVlozitVseDoPoznBloku, favorite: true }
            ]);

            this.commandBar([
                { action: this.actions.actCancel },
            ]);

            var znackaW = this.model.CjExtVisible ? "w-8" : "w-12";

            var form = new Gordic.Forms
                .Form({ name: "FormKOPIE", layoutDescriptor: "L2M2S2" })
                .addSection()
              //  .addRow("jres:26256337")  //RC 26256337 : Mateřský dokument
              //  .addField("gstringbox", {
                //    name: "IxpMotherField",
                //    //label: "jres:26255541", //RC 26255541 : Generovat ident.
                //    model: "IxpOriginalu",
                //    disabled: true,
                //})
                .addPrefab(Gordic.Wfl.Prefabs.GIdentifikatorDokumnetuSpisu(
                    {
                        fieldOpt: {
                            name: "IxpMotherField",
                            model: "IxpOriginalu",
                            disabled: true
                        }
                    },
                    {
                            label: "jres:26256337" //RC 26256337 : Mateřský dokument
                    }
                ))
                .addRow(that.ZnackaLabelText)    // Značka
                .addField("gstringbox", znackaW, {
                    name: "ZnackaField",
                    //label: "jres:26255541", //RC 26255541 : Generovat ident.
                    model: "Znacka",
                    disabled: true,
                });

            if(this.model.CjExtVisible) {
                form.addField("gstringbox", "w-4", {
                    name: "CjExtField",
                    model: "CjExt",
                    disabled: true,
                })
            }

            form.addRow(that.SpZnLabelText) // Spisová značka
                .addField("gstringbox", "w-8", {
                    name: "SpZnField",
                    model: "SpZn",
                    disabled: true
                })
                .addField("gstringbox", "w-4", {
                    name: "PorCisloSpisField",
                    model: "PorCisloSpis",
                    disabled: true,
                })
                .addRow("jres:26256780") // Spisová značka //RC 26256780 : Počet kopií/duplikátů
                .addField("gstringbox", "w-6", {
                    name: "PocetKopiiField",
                    model: "PocetKopii",
                    disabled: true
                })
                .addField("gstringbox", "w-6", {
                    name: "PocetDuplikatuField",
                    model: "PocetDuplikatu",
                    disabled: true,
                });

            if(this.model.GenerovatVisible) { 
                form.addField("gcheck", {
                    name: 'generCheck',
                    label: "jres:26255541", //RC 26255541 : Generovat ident.
                    model: "GenerovatChecked",
                    disabled: !that.model.GenerovatEnabled,
                    change: function (ev, data) {
                        that.GenerovatCheckedChange(data.value);
                    }
                })
            }

            form.addSection();

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            this.LoadGrid();
        },
        LoadGrid: function () {
            var that = this;

            var gridColumnsDefinition = new Gordic.Data.GridFormat()

                .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypEntityColumnDlg({}))
                .addIconColumn({
                    name: "stav_dist", caption: "",
                    customClass: "center cursor_help",
                    width: 30,
                    fixedWidth: true,
                    iconTemplate: function (row) {
                        if (row.stav_dist !== 0) {
                            return { icon: "gi-refresh", tooltip: "jres:26255778" }; //RC 26255778 : V redistribuci
                        } else {
                            return null;
                        }
                    }
                })
                .addTextColumn({
                    name: "predat_kam",
                    caption: "jres:26255560", //RC 26255560 : Další cíl
                    width: 200,
                })
                .addTextColumn({
                    name: "ixp_kop",
                    caption: "jres:26255438", //RC 26255438 : PID kopie
                    width: 120,
                    fixedWidth: true,
                })
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26255425", //RC 26255425 : Věc
                    width: 300,
                })
                .addTextColumn({
                    name: "akt_znacka",
                    caption: this.ZnackaTextDBParam,
                    sortOrder: Gordic.Ssl.Utils.SortSpzn 
                })
                .addTextColumn({
                    name: "cislo_spisu",
                    caption: this.SslTextCjZnParam,
                    sortOrder: Gordic.Ssl.Utils.SortSpzn 
                });

                if(this.MinVerzeColumnPoznamka) {
                    gridColumnsDefinition.addTextColumn({
                        name: "poznamka",
                        caption: "jres:26257009", //RC 26257009 : Poznámka
                    });
                }

                gridColumnsDefinition.addTextColumn({
                    name: "nazev_rf",
                    caption: "jres:26255429", //RC 26255429 : Změnu provedl
                    width: 250,
                })
                .addDateColumn({
                    name: "dat_zmena",
                    caption: "jres:26255404", //RC 26255404 : Datum změny
                    width: 100,
                })
                .addTextColumn({
                    name: "vlastnik",
                    caption: "jres:26255402", //RC 26255402 : Aktuální vlastník
                    width: 250,
                });


            this.gridKopie = $("<div>").appendTo(this.element)
                .css("height", "calc(100% - " + this.defaultForm.height() + "px)")
                .ggrid({
                    name: "GridKopie",
                    //    data: that.ViewTabulkaSubjektu,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "full",  // fit (defaultne by melo byt toto), full
                    customClass: "js-gridKartoteka",
                    navigationMode: "row", // row, cell
                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                            var options = {
                                ixp: rowData.ixp_kop,
                                grid: that.gridKopie
                            };
                            Gordic.Wfl.MainApp.ShowDetail(that, options);
                        }
                    }),
                    /*selection: function (ev, selectionInfo) {
                        if (selectionInfo.count === 1) { // u single modu vzdy 1 ale pro jistotu testuji
                            var rowData = that.gridTrasy.ggrid("getSelection");
                            that.VyberRadkuClick(rowData[0]);
                        }
                    },*/
                    // multi: true,

                    //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                    searchColumns: ["predat_kam", "ixp_kop", "nazev", "akt_znacka", "cislo_spisu", "nazev_rf", "dat_zmena", "vlastnik"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                });

            this.LoadData();
        },
        LoadData: function () {
            var that = this;

            //nacteni dat do gridu
            this.call("GetSeznamKopii", { model: this.model })
                .done(function (data) {
                    var view = new Gordic.Data.View(data, { key: "ixp_kop" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    that.gridKopie.ggrid("setData", view, true);           //true = prekresleni gridu

                    // mastavim pocet kopii podle poctu radku v gridu
                    that.model.PocetKopii = data.length;

                    that.IxpKopieArray = [];

                    data.forEach(function (rowData) {
                        that.IxpKopieArray.push(rowData.ixp_kop);
                    });

                    //nacteni dat do gridu
                    that.call("PocetDuplikatu", { Ixp: that.Ixp })
                        .done(function (data) {
                            var pocetDuplikatu = data;
                            that.model.PocetDuplikatu = pocetDuplikatu;

                            that.findFields()
                                .gfield("model", "apply", that.model)
                                .gfield("model", "validators", that.validators);
                        });

                });
        },
        Reload: function () {
            this.LoadData();
        },
        MaterskyDokument: function () {

            if(this.model.IxpOriginalu != null) {
                var options = {
                    ixp: this.model.IxpOriginalu,
                    grid: null
                };
                Gordic.Wfl.MainApp.ShowDetail(this, options);
            }
        },
        GenerovatCheckedChange: function (checkboxChecked) {
            this.globalSettings.set("Global.Wfl.Kopie.GenerovatId", checkboxChecked);

           /* this.call("KopieGenerovatCheckingSave", { GenerovatChecked: checkboxChecked })
                .done(function (data) {

                });*/
        },
        NovyDuplikat: function () {
            var that = this;
            this.kontrolaMetadat().done(function () {

                var options = {
                    Ixp: that.model.IxpOriginalu,
                };

            
                Gordic.Ssl.Dialogs.DuplikatNovyDlg(that, options).on("close", function (ev, retVal) {
                    if (retVal) {
                        that.Reload();
                        that.showFlash("jres:26256795", "g-state-info", that.flashPanelTimer); //RC 26256795 : Duplikát dokumentu byl úspěšně vytvořen.
                    }
                });

            });
           
        },
        Hromadne: function () {
            var that = this;
            this.findFields().gfield("model", "collect", this.model);

            this.kontrolaMetadat().done(function () {
                var options = {
                    Ixp: that.model.IxpOriginalu,
                    GenerovatIxp: that.model.GenerovatChecked,
                };
                Gordic.Ssl.Dialogs.KopieHromadneDlg(that, options).on("close", function (ev, retVal) {
                    if(retVal) {
                        that.Reload();
                    }
                });
            });
        },
        NovaKopie: function () {
            var that = this;
            this.kontrolaMetadat().done(function () {
                that.findFields().gfield("model", "collect", that.model);

                if (that.model.GenerovatVisible) {
                    if (that.model.GenerovatChecked) {
                        Gordic.Wfl.Utils.GenerateIxp(that).done(function (rv) {
                            that.NewCopy(rv.Ixp);
                        });
                    } else {
                        that.NewCopy("");
                    }
                } else {
                    that.NewCopy("");
                }
            });
        },
        NewCopy: function (ixp) {
            var that = this;

            var l_nEle = 0;
            var l_nPriCopy = 0;
            var l_bCjMake = false;
            var l_bVlaCopy = false;
            var l_bContinue = true;

            if(this.ShowKopieRequester) {
                l_bContinue = false;

                var options = {
                    IxpMaterske: this.model.IxpOriginalu,
                    IxpNove: ixp
                };
                var $div = Gordic.Ssl.Dialogs.NovaKopieRequesterDlg(this, options, 'showWindow');

                $div.on("close", function (ev, retVal) {
                    if(retVal) {
                        that.MakeCopyPoUpresneni(retVal.IxpNove, retVal.CopyEleVal, retVal.CopyPriVal, retVal.MakeCjVal, retVal.CopyVlaVal);
                    }
                });
            } else {
                if (this.PrizCj != 0 && this.SslKopCjPridPar == 1) { // vzdy
                    l_bCjMake = true;
                }
                if (this.SslKopVlaPar == 2) {// vzdy
                    l_bVlaCopy = true;
                }
            }

            if (l_bContinue) {
                this.MakeCopyPoUpresneni(ixp, l_nEle, l_nPriCopy, l_bCjMake, l_bVlaCopy);
            }
        },
        MakeCopyPoUpresneni: function (ixp, copyEleVal, copyPriVal, makeCjVal, copyVlaVal) {
            var that = this;
            var async = false;

            if(ixp == "") {
                async = true;

                var options = {
                    TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                    TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp
                };
                Gordic.Wfl.Dialogs.GenerovaniIxp(this, options, 'showWindow').done(function (rv, content) {
                    if(rv) {
                        ixp = rv.Ixp;
                    }

                    if(ixp != "") {
                        that.KontrolaVyberDeniku(ixp, copyEleVal, copyPriVal, copyVlaVal, makeCjVal);
                    }
                });
            }

            if(ixp != "" && !async) {
                this.KontrolaVyberDeniku(ixp, copyEleVal, copyPriVal, copyVlaVal, makeCjVal);
            }
        },
        KontrolaVyberDeniku: function (ixp, copyEleVal, copyPriVal, copyVlaVal, makeCjVal) {
            var that = this;

            this.modelNovaKopie.IxpNovaKopie = ixp;
            this.modelNovaKopie.ElObrazCopy = copyEleVal;
            this.modelNovaKopie.PriCopy = copyPriVal;
            this.modelNovaKopie.FlagVlaCopy = copyVlaVal;

            this.modelNovaKopie.FlagMakeCJ = makeCjVal;

            if (makeCjVal && this.ShowVyberDeniku) {
                Gordic.Ssl.Dialogs.VyberDenikuDlg(this, {}, 'showWindow').on("close", function (ev, retVal) {
                    if (retVal) {
                        that.modelNovaKopie.DenikCj.Denik = retVal.denik;
                        that.modelNovaKopie.DenikCj.Poradi = retVal.poradi;
                        that.modelNovaKopie.DenikCj.Rok = retVal.rok;
                        that.MakeNovaKopie();
                    }
                });
            } else {
                this.MakeNovaKopie();
            }
        },
        MakeNovaKopie: function () {
            var that = this;

            if(this.modelNovaKopie.DenikCj.Denik == null) {
                this.modelNovaKopie.DenikCj.Denik = this.DefaultDenik;
            }

            Gordic.Ssl.Utils.NovaKopie(this.modelNovaKopie, this).done(function (rv) {
                that.Reload();
                that.showFlash("jres:26256783", "g-state-info", that.flashPanelTimer); //RC 26256783 : Kopie dokumentu byla úspěšně vytvořena.
            });
        },
        kontrolaMetadat: function () {
            var that = this;
            var defer = $.Deferred();
            if ((that.ssl_kop_konmeta == null) || (that.ssl_kop_konmeta === 0)) {
                defer.resolve();
            } else {
                var options = { "Ixp": this.model.IxpOriginalu };
                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                srv.call("KontrolaMetadatPrepare", options)
                    .done(function (retVal) {
                        that.hideFlash("KontrolaMetadatIdFlash");
                        if (!retVal.StavBool) {
                            if (that.ssl_kop_konmeta === 1) {
                                var but = [
                                    { text: 'Ano', id: 'yes'},
                                    { text: 'Oprava', id: 'oprava', primary: true },
                                    { text: 'Ne', id: 'no' }
                                ]
                                that.dialogs.messageBox(
                                    "jres:31937480", //RC 31937480 : Kontrola metadat
                                    "jres:31937481", //RC 31937481 : Při kontrole metadat byly nalezeny chyby. Přejete si přesto pokračovat v tvorbě kopií?
                                    but,
                                    Gordic.Dialogs.Icons.mbiQuestion)
                                    .on("closed", function (ev, odpoved) { //RC 23900067 : Dotaz
                                        if (odpoved === "yes") {
                                            defer.resolve();
                                        } else if (odpoved === "oprava"){
                                            that.actions[Gordic.Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam].update({ enabled: true });
                                            that.actions[Gordic.Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam].run();
                                        } else {
                                            defer.reject();
                                        }
                                    });
                            
                            } else if (that.ssl_kop_konmeta === 2) {
                                that.actions[Gordic.Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam].update({ enabled: true });
                                that.actions[Gordic.Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam].run();
                            }
                        }
                        else if (retVal.StavBool) {
                            defer.resolve();
                        }
                    }).always(function () {
                        srv.close();
                    });
            }
            return defer.promise();
        },

    }, { pure: true });
})(jQuery);
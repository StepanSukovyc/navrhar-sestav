(function ($) {
    "use strict";
    namespace("Gordic.Ssl.Lists.RedistribuceOstatni", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26257096"; //RC 26257096 : Přehledy redistribuce

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_predi01",
               // ["suField", "funField", "dateIntervalRow", "filterRedistribucniPrevzeti", "filterSubjekt"],
                ["subjektRow", "dateIntervalRow", "filterRedistribucniPrevzeti", "filterSubjekt"],
                "FilterPanelPredaneMimoUzel"
            )

            this.loadGridImmediately = true;

            this.actions.addRange({
                actManipulacniKnihaTisk: GAction.createPrintAction({
                    name: "actManipulacniKnihaTisk",
                    caption: "jres:26257095", //RC 26257095 : Tisk manipulační knihy
                    icon: "gi-print",
                    enabled: true,
                    visible: false,
                    tema: "ssl_ptm_umankni",
                    reportStarting: function (rep) {
                        return that.manipulacniKnihaReportRetreive(rep);
                    }
                }),
            });

            // TODO - nelze pouzit tiskovou sestavu pres temp tabulku, kvuli duplicitnim zaznamum. Nema zadne RestrictionALF - ani neni akce v menu baru
            // Smysl dává operativni tisk přes grid. Ten dosud neni funkcni.

            this.menuBar(
                this.actions.createBar(["actDetailWfl*", "actOtevriDokumentDoNoveZalozkyVeStejneFazi*", "actPredatWfl*", "actPridelitWfl*", "-", "actPoznamkovyBlokPridatSsl*", "-", "actUzivatelskeSloupceVlastnostiWfl", "-", "actManipulacniKnihaTisk*", "-", "actObcerstvitWfl"])
            );

            this.contextMenu = [
                {
                    action: this.actions.actPredatWfl,
                },
                {
                    action: this.actions.actPridelitWfl,
                },
                {
                    action: this.actions.actPoznamkovyBlokPridatSsl,
                },
                {
                    action: this.actions.actUzivatelskeSloupceVlastnostiWfl,
                },
                {
                    action: this.actions.actManipulacniKnihaTisk,
                },
                {
                    action: this.actions.actObcerstvitWfl,
                },
            ];

            $("<div>").appendTo(this.element)
                .gsubtasks({
                    params: [
                        { caption: "jres:26256146", action: this.actions.actPredaneMimoUzel }, //RC 26256146 : Předané mimo uzel
                        { caption: "jres:26256147", action: this.actions.actPredaneVRamciUzlu }, //RC 26256147 : Předané v rámci uzlu
                        { caption: "jres:26256148", action: this.actions.actPrevzate }, //RC 26256148 : Převzaté
                    ]
                })
                .gsubtasks("setActive", this.model.SubTask);

            // samotná definice gfilterpanelu
            this.filterForm = $("<div>")
                .appendTo(this.element)
                .on("gfilterpanelapply", function (event, obj) {         // eventa která je vyvolána při vyhledávání. obj.filter -> hledaný seznam podmínek
                    //that.Reload(obj.filter);
                    that.NacistClick(obj.filter);
                // 02.08.2022 - TFeik
                // Zrušení duplicitního vytváření filterpanelu.
                //}).gfilterpanel({
                //    forms: null, // poleFormu ktere budou pouzity pro podminky
                //    simpleMode: true,
                //    favoriteLayoutDescriptor: "L3M2S1",
                });

            this.PrepareSubtask();
        },
        CreateFilterForms: function () {
            var that = this;

            this.actions.actManipulacniKnihaTisk.visible(this.model.SubTask === this.RedistribuceOstatniSubTask.Prevzate);

            var filterForm = new Gordic.Forms.Form({ name: "FormRediOstatniList", tabLabel: "jres:26256764", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" })
            filterForm.addSection();

            if(this.model.SubTask == this.RedistribuceOstatniSubTask.PredaneVRamciUzlu) {
               // this.loadGridImmediately = false; // zakazu prvotni nacteni gridu
                this.loadGridImmediately = true;

                filterForm.addRow("jres:26255691").addField("gselectbox", "w-12", //RC 26255691 : Od subjektu
                    Gordic.Gin.Fields.ginsfunSSU(
                        {
                            name: "funField",
                            model: "IxsFun = ixs_fun",
                            serverFilters: {
                                aktivita: [100],
                                ixs_su: that.IxsSuAkt
                            },
                            initialValue: this.model.IxsFun
                        }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.BEZNE));
                filterForm.addRow("jres:26255692").addField("gselectbox", "w-12", //RC 26255692 : Subjektu
                    Gordic.Gin.Fields.ginsfunSSU(
                        {
                            name: "fun2Field",
                            model: "IxsFun2 = ixs_fun",
                            serverFilters: {
                                aktivita: [100],
                                ixs_su: that.IxsSuAkt
                            },
                            initialValue: this.model.IxsFun2
                        }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.BEZNE));

            } else {
                this.loadGridImmediately = true; // povolim prvotni nacteni gridu
                var labelSubjektu = "jres:26255692"; //RC 26255692 : Subjektu

                if(this.model.SubTask == this.RedistribuceOstatniSubTask.Prevzate) {
                    var labelSubjektu = "jres:26255691"; //RC 26255691 : Od subjektu
                }

                filterForm.addRow({ label: labelSubjektu, name:"subjektRow" }).addField("gselectbox", "w-4", 
                    Gordic.Gin.Fields.ginspodSSU(
                        {
                            name: "suField",
                            model: "IxsSu = ixs_su",
                            serverFilters: {
                                aktivita: [100],
                            },
                            initialValue: this.model.IxsSu
                            /*  change: function (ev, data) {
                                  that.AnableActions();
                              }*/
                        }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.BEZNE)).addField("gselectbox", "w-8",
                        Gordic.Gin.Fields.ginsfunSSU(
                            {
                                name: "funField",
                                model: "IxsFun = ixs_fun",
                                serverFilters: {
                                    aktivita: [100],
                                    ixs_su: new Gordic.Forms.Dependency("suField", "ixs_su")
                                },
                                initialValue: this.model.IxsFun
                                /*  change: function (ev, data) {
                                      that.AnableActions();
                                  }*/
                            }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.BEZNE, "suField")
                    );
            }
            filterForm.addRow({ label: "jres:26256714", name: "dateIntervalRow" }) //RC 26256714 : Od-do
                .addField("gdatecombobox", {
                    name: "dateIntervalField",
                    initialValue: this.model.DateInterval,
                    model: "model.DateInterval=value",
                    daysRangeMax: that.DaysRangeMax,
                    userSettings: that.userSettings,
                    contextMenu: {
                       // daysRange: that.predplneniPocetDni
                    },
                    change: function (ev, obj) {

                    }
                });

            if (this.model.SubTask == this.RedistribuceOstatniSubTask.PredaneVRamciUzlu) {
                var filterSubjektInitialValue = this.DefaultSubjectSu;
                filterSubjektInitialValue.SubjectStructOrg = Gordic.Ssl.Globals.Enums.SubjectStructOrg.AKTUALNI_SPIS_UZEL;
               // filterSubjektInitialValue.SubjectStructOrg = 1;

                filterForm.addSection(Gordic.Wfl.Prefabs.FilterSubjekt({
                    name: "filterSubjekt",
                    model: "model.SelectedSubject.Ixs=value.Ixs;model.SelectedSubject.Name=value.Name;model.SelectedSubject.TypeIxs=value.TypeIxs;model.SelectedSubject.SubjectStructOrg=value.SubjectStructOrg;model.SelectedSubject.pIxs=value.pIxs",
                    typSubjektuFilter: Gordic.Ssl.Globals.Enums.TypSubjektuFilter.JEN_SU,
                    onChange: function (ev, data) {
                        if (data.value && that.model.IxsSu != data.value.Ixs) {
                            that.model.IxsSu = data.value.Ixs;

                            var funField = that.findFields("funField");
                            var funField2 = that.findFields("fun2Field");

                            funField.gfield("clear");
                            funField2.gfield("clear");
                            funField.gfield("option", "serverFilters", $.extend(funField.gfield("option", "serverFilters"), { ixs_su: data.value.Ixs }));
                            funField2.gfield("option", "serverFilters", $.extend(funField2.gfield("option", "serverFilters"), { ixs_su: data.value.Ixs }));
                        }
                    },
                    label: "jres:26256861", //RC 26256861 : Za spisový uzel
                   // initialValue: this.model.SelectedSubject
                    initialValue: filterSubjektInitialValue,
                    ignoreUsuShowSu: true,
                }, this)); 
            } else {
                filterForm.addSection(Gordic.Ssl.Prefabs.FilterTypRedistribucniPrevzeti({
                    name: "filterRedistribucniPrevzeti",
                    model: "model.TypRedistribucniPrevzetiFilter=value.id",/*, label: l_sTypRedistribucnihoSubjektuLabel*/
                    initialValue: this.model.TypRedistribucniPrevzetiFilter
                }));

                if(this.UsuShowSuPar == 1) {
                    var l_sPohledZaLabel = "jres:26256879"; // start //RC 26256879 : Předané od

                    if(this.model.SubTask == this.RedistribuceOstatniSubTask.Prevzate) {
                        l_sPohledZaLabel = "jres:26256880"; // cil  //RC 26256880 : Převzaté na
                    }

                    filterForm.addSection(Gordic.Wfl.Prefabs.FilterSubjekt({
                        name: "filterSubjekt",
                        model: "model.SelectedSubject.Ixs=value.Ixs;model.SelectedSubject.Name=value.Name;model.SelectedSubject.TypeIxs=value.TypeIxs;model.SelectedSubject.SubjectStructOrg=value.SubjectStructOrg;model.SelectedSubject.pIxs=value.pIxs",
                        label: l_sPohledZaLabel,
                        initialValue: this.model.SelectedSubject
                    }, this));
                    // filterForm.addSection(Gordic.Ssl.Prefabs.FilterPohledZa({ name: "filterPohledZa", model: "model.PohledZaFilter=value.id", label: l_sPohledZaLabel }));
                }
            }
            
            return [filterForm];
        },
        LoadGrid: function () {
            var that = this;
            this.gridColumnsDefinition = new Gordic.Data.GridFormat();

            this.gridColumnsDefinition.addIconColumn(this.VysledekOperaceIcoColumn());

            // nove ikonove sloupce
            Gordic.Wfl.GWflCommonDlg.AddDokumentyColumnsDlg(this.gridColumnsDefinition, {}); // extendObj nepovinné



            this.gridColumnsDefinition
                .addTextColumn({
                    name: "ixp",
                    caption: "jres:26255367", //RC 26255367 : PID
                    width: 120,
                    //  fixedWidth: true,
                })
                .addTextColumn({
                    name: "akt_znacka",
                    caption: this.ZnackaShortText,
                    width: 150,
                    //   fixedWidth: true,
                    sortOrder: Gordic.Ssl.Utils.SortSpzn,
                })
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26255640", //RC 26255640 : Věc-obsah
                    width: 250,
                })
                .addTextColumn({
                    name: "Nazev__sslstyp",
                    caption: this.gin_n23_vecsk == 0 ? "jres:31937228" : "jres:26257355", //RC 31937228 : Typ dokumentu RC 26257355 : Druh dokumentu
                    width: 200,
                });

            if(this.model.SubTask == this.RedistribuceOstatniSubTask.PredaneVRamciUzlu) {
                this.gridColumnsDefinition
                    .addTextColumn({
                        name: "Predano__od__osoby",
                        caption: "jres:26257157", //RC 26257157 : Předáno od osoby
                        width: 200,
                    })
                    .addTextColumn({
                        name: "Predano__osobe",
                        caption: "jres:26255684", //RC 26255684 : Předáno osobě
                        width: 200,
                    })
            } else { 
                this.gridColumnsDefinition
                    .addTextColumn({
                        name: "Predano__uzlu",
                        caption: "jres:26255683", //RC 26255683 : Předáno uzlu
                        width: 200,
                    })
                    .addTextColumn({
                        name: "Predano__osobe",
                        caption: "jres:26255684", //RC 26255684 : Předáno osobě
                        width: 200,
                    })
            }

            this.gridColumnsDefinition
                .addTextColumn({
                    name: "misto_vzniku",
                    caption: "jres:26255430", //RC 26255430 : Odesílatel
                    width: 200,
                })
                .addDateTimeColumn({
                    name: "dat_zmena",
                    caption: "jres:26255404", //RC 26255404 : Datum změny
                });

            // 30.06.2025 - TFeik
            // Sloupec vlastník přidán i pro Predané mimo uzel.
            // https://phabricator.gordic.cz/T42530
            if (this.model.SubTask == this.RedistribuceOstatniSubTask.Prevzate || this.model.SubTask == this.RedistribuceOstatniSubTask.PredaneMimoUzel) {
                this.gridColumnsDefinition
                    .addTextColumn({
                        name: "vlastnik",
                        caption: "jres:26257192", //RC 26257192 : Vlastník
                        width: 200,
                    })
            } 

            this.AddUserColumnsToGridFormat(this.gridColumnsDefinition); // zvazit presun do funkce onGetGridData

            this.mainGrid.ggrid({
                name: "GridDocs",
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
                            ixp: rowData.ixp,
                            grid: that.mainGrid
                        };
                        Gordic.Wfl.MainApp.ShowDetail(that, options);
                    }
                }),
                /*
                selection: function (ev, selectionInfo) {
                    var activeRow = that.GetActiveRow();

                    that.aktualizujNahled(activeRow);
                },
                */
                selection: function (ev, ctx) {
                    if (that.SelectionForPreviewController) {
                        var opt = {
                            ggrid: $(this)
                        };
                        that.SelectionForPreviewController(opt);
                    }
                },
                contextMenu: function (cellContext) {
                    return that.contextMenu;
                },
                multiMenu: this.multiMenu,
                multi: true,

                //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                searchColumns: ["ixp", "akt_znacka", "nazev", "ixs_typ_txt", "nazev_rf", "nazev_rf", "misto_vzniku", "dat_zmena"], //sloupce, podle kterych se vyhledava v searchboxu
                columns: this.gridColumnsDefinition,
            });

            this.LoadData();
        },
        onGetGridData: function (GridData) {
            // pridani sloupcu az na zaklade hodnot ve filtr panelu nebo v datech. Problem je ten, ze data dostavam az po definici sloupcu. Musim tedy sloupce pridavat dodatecne, ale grid je nacita az v okamziku prekresleni a diky referenci to zafunguje
            var that = this;
  
            if(GridData != null && GridData.length > 0) {
                if(this.model.SubTask == this.RedistribuceOstatniSubTask.PredaneMimoUzel || this.model.SubTask == this.RedistribuceOstatniSubTask.Prevzate) {
                    if (that.model.TypRedistribucniPrevzetiFilter == 2) { // cilene
                        var existingColumn = this.gridColumnsDefinition.get("ucel_dist_txt");

                        if(existingColumn == null) {
                            this.gridColumnsDefinition
                                .addTextColumn({
                                    name: "ucel_dist_txt",
                                    caption: "jres:26257369", //RC 26257369 : Účel distribuce
                                    width: 200,
                                });
                        }
                    }
                }
            }

            this.AddUserColumnsToGridFormat(this.gridColumnsDefinition);
        },
        VyberRadkuClick: function (rowData) {
            var that = this;

        },
        NacistClick: function (filter) {
            $.extend(this.model, filter);
            var that = this;
            //this.findFields().gfield("model", "collect", this.model);

            var isValid = false;

            //if(this.model.SubTask == this.RedistribuceOstatniSubTask.PredaneVRamciUzlu) {
            //    if(this.model.IxsFun == null) {
            //        GDlg.warning("jres:26256876"); //RC 26256876 : Není vybráno pole Od subjektu
            //    } else if(this.model.IxsFun2 == null) {
            //        GDlg.warning("jres:26256877"); //RC 26256877 : Není vybráno pole subjektu
            //    } else {
            //        isValid = true;
            //    }
            //} else {
            //    isValid = true;
            //}

            isValid = true;

            if (isValid) {
               // this.LoadGrid();

                this.call("GetUzivatelskeSloupce", { "model": this.model })
                    .done(function (data) {
                        that.UserColumnsVlastnosti = data;
                    })
                    .always(function () {
                        that.LoadGrid();
                    });
            }
        },
        manipulacniKnihaReportRetreive: function (rep) {
            this.findFields().gfield("model", "collect", this.model);

            var odPredanoString = $.datepicker.formatDate('yy-mm-dd', this.model.DateInterval.date.start);
            var doPredanoString = $.datepicker.formatDate('yy-mm-dd', this.model.DateInterval.date.end);

            rep.params.X0000 = this.IxsFunAkt;
            rep.params.X0001 = odPredanoString;
            rep.params.X0002 = doPredanoString;
        },
        ClearFilters: function () {
            this.model.IxsSu = null;
            this.model.IxsFun = null;
            this.model.IxsFun2 = null;
            this.model.TypRedistribucniPrevzetiFilter = 1;
        },
        PredaneMimoUzelClick: function () {
            this.model.SubTask = this.RedistribuceOstatniSubTask.PredaneMimoUzel;
            this.model.SelectedSubject = this.DefaultSubjectFun;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_predi01",
               // ["suField", "funField", "dateIntervalRow", "filterRedistribucniPrevzeti", "filterSubjekt"],
                ["subjektRow", "dateIntervalRow", "filterRedistribucniPrevzeti", "filterSubjekt"],
                "FilterPanelPredaneMimoUzel"
            )

            this.ClearFilters();
            this.PrepareSubtask();
        },
        PredaneVRamciUzluClick: function () {
            this.model.SubTask = this.RedistribuceOstatniSubTask.PredaneVRamciUzlu;
            this.model.SelectedSubject = this.DefaultSubjectSu;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_predi02",
                ["funField", "fun2Field", "dateIntervalRow", "filterSubjekt"],
                "FilterPanelPredaneVRamciUzlu"
            )

            this.ClearFilters();
            this.PrepareSubtask();
        },
        PrevzateClick: function () {
            this.model.SubTask = this.RedistribuceOstatniSubTask.Prevzate;
            this.model.SelectedSubject = this.DefaultSubjectFun;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_predi03",
               // ["suField", "funField", "dateIntervalRow", "filterRedistribucniPrevzeti", "filterSubjekt"],
                ["subjektRow", "dateIntervalRow", "filterRedistribucniPrevzeti", "filterSubjekt"],
                "FilterPanelPrevzate"
            )

            this.ClearFilters();
            this.PrepareSubtask();
        },

        RedistribuceOstatniSubTask: {
            PredaneMimoUzel: 0,
            PredaneVRamciUzlu: 1,
            Prevzate: 2,
        },
    }, { extendIntellisense: GContent });
})(jQuery);
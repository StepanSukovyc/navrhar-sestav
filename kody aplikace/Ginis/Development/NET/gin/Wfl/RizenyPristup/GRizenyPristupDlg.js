(function ($) {
    "use strict";
    namespace("Gordic.Wfl.GRizenyPristupDlg", {
        //opravneniAktListDto: [],
        //opravneniPidListDto: [],
        //opravneniTypListDto: [],
        changeDone: false,
        filterProcessor: null,
        GroupResult: null,

        onContentReady: function () {
            var that = this;
            this.title = "jres:26226387"; //RC 26226387 : Oprávnění k přístupu

            this.actions.addRange({
                // Aktuální oprávnění k entitě
                actPridatCurrent: {
                    icon: "gi-plus",
                    caption: "jres:26225238", //RC 26225238 : Přidat
                    run: function (ev, ctx) {
                        that.PridatCurrentClick();
                    }
                },
                actOdebratCurrent: {
                    icon: "fa-remove",
                    caption: "jres:26225239", //RC 26225239 : Odebrat
                    run: function (ev, ctx) {
                        that.OdebratClick(1);
                    }
                },
                actZmenitCurrent: {
                    icon: "gi-pencil",
                    caption: "jres:26225842", //RC 26225842 : Změnit
                    run: function (ev, ctx) {
                        that.ZmenitCurrentClick();
                    }
                },
                actZobrazitCurrent: {
                    icon: "gi-detail",
                    caption: "jres:26226388", //RC 26226388 : Zobrazit
                    run: function (ev, ctx) {
                        that.ZobrazitRowCurrentClick();
                    }
                },
                actAplikovatCurrent: {
                    icon: "fa-arrow-right",
                    caption: "jres:26226410", //RC 26226410 : Aplikovat na
                    run: function (ev, ctx) {
                        that.AplikovatClick(1);
                    }
                },
                actPrevzitCurrent: {
                    icon: "fa-arrow-left",
                    caption: "jres:26226411", //RC 26226411 : Převzít ze spisu
                    run: function (ev, ctx) {
                        that.PrevzitClick();
                    }
                },
                // Pravidla pro tuto entitu
                actPridatPid: {
                    icon: "gi-plus",
                    caption: "jres:26225238", //RC 26225238 : Přidat
                    run: function (ev, ctx) {
                        that.PridatPidClick();
                    }
                },
                actOdebratPid: {
                    icon: "fa-remove",
                    caption: "jres:26225239", //RC 26225239 : Odebrat
                    run: function (ev, ctx) {
                        that.OdebratClick(2);
                    }
                },
                actZmenitPid: {
                    icon: "gi-pencil",
                    caption: "jres:26225842", //RC 26225842 : Změnit
                    run: function (ev, ctx) {
                        that.ZmenitPidClick();
                    }
                },
                actZobrazitPid: {
                    icon: "gi-detail",
                    caption: "jres:26226388", //RC 26226388 : Zobrazit
                    run: function (ev, ctx) {
                        that.ZobrazitRowPidClick();
                    }
                },
            /*    actAplikovatPid: {
                    icon: "fa-arrow-right",
                    caption: "jres:26226410", //RC 26226410 : Aplikovat na
                    run: function (ev, ctx) {
                        that.AplikovatClick(2);
                    }
                },
                actPrevzitPid: {
                    icon: "fa-arrow-left",
                    caption: "jres:26226411", //RC 26226411 : Převzít ze spisu
                    run: function (ev, ctx) {

                    }
                },*/
                // Pravidla spojená s typem dokumentu/entity
                actPridatTyp: {
                    icon: "gi-plus",
                    caption: "jres:26225238", //RC 26225238 : Přidat
                    run: function (ev, ctx) {

                    }
                },
                actOdebratTyp: {
                    icon: "fa-remove",
                    caption: "jres:26225239", //RC 26225239 : Odebrat
                    run: function (ev, ctx) {

                    }
                },
                actZmenitTyp: {
                    icon: "gi-pencil",
                    caption: "jres:26225842", //RC 26225842 : Změnit
                    run: function (ev, ctx) {

                    }
                },
                actZobrazitTyp: {
                    icon: "gi-detail",
                    caption: "jres:26226388", //RC 26226388 : Zobrazit
                    run: function (ev, ctx) {
                        that.ZobrazitRowTypClick();
                    }
                },
                // spolecne
                actVyslednaOpravneni: {
                    icon: "gi-detail",
                    caption: "jres:26227171", //RC 26227171 : Výsledná oprávnění
                    run: function (ev, ctx) {
                        that.VyslednaOpravneni();
                    }
                },
            });

            this.menuBar([
                {
                    action: this.actions.actVyslednaOpravneni,
                    favorite: true
                }
            ]);

            var statusBar = [{
                type: "static",
                caption: this.model.PristupTxt,
                customClass: "g-state-text g-state-info"
            }];
            this.statusBar(statusBar);

            //var form = new Gordic.Forms
            //    .Form({ name: "FormGNPR" })
            //    .addSection()
            //    .addRow(this.model.PristupTxt);

            //// vytvoření  formuláře    
            //this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            this.tabAktOpravneniDok = $("<div>")
                .appendTo(this.element)
                .gtab({
                    title: "jres:26227163", //RC 26227163 : Aktuální oprávnění k entitě
                    opened: true,
                    menuBar: [
                        {
                            action: this.actions.actPridatCurrent,
                            favorite: true
                        },
                        {
                            action: this.actions.actOdebratCurrent,
                            favorite: true
                        },
                        {
                            action: this.actions.actZmenitCurrent,
                            favorite: true
                        },
                        {
                            action: this.actions.actZobrazitCurrent,
                            favorite: true
                        },
                        {
                            action: this.actions.actAplikovatCurrent,
                            favorite: true
                        },
                        {
                            action: this.actions.actPrevzitCurrent,
                            favorite: true
                        }
                    ]
                }); 

            this.tabOpravneniPid = $("<div>")
                .appendTo(this.element)
                .gtab({
                    title: "jres:26227164", //RC 26227164 : Pravidla pro tuto entitu
                    menuBar: [
                        {
                            action: this.actions.actPridatPid,
                            favorite: true
                        },
                        {
                            action: this.actions.actOdebratPid,
                            favorite: true
                        },
                        {
                            action: this.actions.actZmenitPid,
                            favorite: true
                        },
                        {
                            action: this.actions.actZobrazitPid,
                            favorite: true
                        },
                      /*  {
                            action: this.actions.actAplikovatPid,
                            favorite: true
                        },
                        {
                            action: this.actions.actPrevzitPid,
                            favorite: true
                        }*/
                    ]
                }); 

            this.tabOpravneniTypDok = $("<div>")
                .appendTo(this.element)
                .gtab({
                    title: "jres:26227165", //RC 26227165 : Pravidla spojená s typem dokumentu/entity
                    menuBar: [
                        {
                            action: this.actions.actPridatTyp,
                            favorite: true
                        },
                        {
                            action: this.actions.actOdebratTyp,
                            favorite: true
                        },
                        {
                            action: this.actions.actZmenitTyp,
                            favorite: true
                        },
                        {
                            action: this.actions.actZobrazitTyp,
                            favorite: true
                        }
                    ]
                });

            this.filterProcessor = new Gordic.Data.FilterProcessor(function(value) {
                var data = value.data;
                var aktivita = data.aktivita;
                var status = data.status;
                if(aktivita == null) {
                    return true;
                } else if ((aktivita == 100 || aktivita == 300 || aktivita == 600) && status != 4) {
                    return true;
                } else {
                    return false;
                }

            });


            this.LoadTabAktOpravneniDok(false);
            this.LoadTabOpravneniPid(false);
            this.LoadTabOpravneniTypDok(); 

            this.AllowActionsForAllTabs();

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(fields);
            }
        },
        LoadTabAktOpravneniDok: function (fromSession) {
            var that = this;

            var formCurrent = new Gordic.Forms.Form({ name: "FormGNPRCurrent" })
                .addSection({ layoutDescriptor: "L-12-0-0, M-12-0-0, S-0-12-0" })
                    .addRow({ label: "jres:26226915" }); //RC 26226915 : Zobrazení aktuálního stavu přiřazených oprávnění subjektů k dokumentu.

            $("<div>").appendTo(this.tabAktOpravneniDok).gform("createFrom", formCurrent);

            var gridColumnsDefinition = new Gordic.Data.GridFormat()
                .addIconColumn({
                    name: "ico_status",
                    caption: "jres:26226691", //RC 26226691 : Výsledek operace
                    width: 30,
                    customClass: "center",
                    fixedWidth: true,
                    iconTemplate: function (row) {
                        var gr = that.GroupResult;
                       
                        if (gr != null) {
                            var obj = gr.find(function (obj) { return obj.Key == row.id_row; });

                            if (obj != null) {
                                if (obj.IsError === true) {
                                    return { icon: Gordic.Gin.Icons.StavEnum.neprovedeno, tooltip: obj.Error };
                                } else {
                                    return { icon: Gordic.Gin.Icons.StavEnum.provedeno, text: "", tooltip: "" };
                                }
                            }
                        }

                        return null;
                    }
                })
                .addTextColumn({
                    name: "typ_subjektu",
                    caption: "jres:26226361", //RC 26226361 : Typ subjektu
                })
                .addTextColumn({
                    name: "aktivita_irp_txt",
                    caption: "jres:26228067", //RC 26228067 : IRP aktivita
                })
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26226362", //RC 26226362 : Název subjektu
                })
                .addTextColumn({
                    name: "uroven_prist_txt",
                    caption: "jres:26226363", //RC 26226363 : Úroveň přístupu
                })
                .addTextColumn({
                    name: "duvod_prist_txt",
                    caption: "jres:26226364", //RC 26226364 : Důvod přidělení přístupu
                })
                .addTextColumn({
                    name: "duvod_txt",
                    caption: "jres:26226365", //RC 26226365 : Zdůvodnění přidělení práv
                })
                .addTextColumn({
                    name: "zmenu_prov_txt",
                    caption: "jres:26225279", //RC 26225279 : Změnu provedl
                });

            this.gridAktOpravneniDok = $("<div>").appendTo(this.tabAktOpravneniDok)
                .gautofit()
                .ggrid({
                    name: "GridAktOpravneniDok",
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit (defaultne by melo byt toto), full
                    navigationMode: "row", // row, cell
                    searchColumns: ["typ_subjektu", "nazev", "uroven_prist_txt", "duvod_prist_txt", "duvod_txt", "zmenu_prov_txt"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                            var l_oParamsJSON = {
                                Ixp: that.Ixp,
                                IdRow: rowData.id_row,
                                Ro: 1,
                                AktOpravneniDTInput: that.AktOpravneniDT,
                                StUtajId: that.StUtajId
                            };
                            
                            var $div = Gordic.Wfl.Dialogs.GNastaveniPravAktualniDlg(that,l_oParamsJSON);

                            $div.on("close", function (ev, retVal) {
                                if (retVal) {
                                    that.AktOpravneniDT = data;
                                    that.LoadAktOpravneniDok(true);
                                }
                            });
                        }
                    }),
                    selection: function (ev, selectionInfo) {
                        if(selectionInfo.count === 1) { // u single modu vzdy 1 ale pro jistotu testuji
                            that.GridSelection(1);
                        }
                    },
                    multi: true,
                    rowsClass: function (dataRow) {
                        if(dataRow && dataRow.data && dataRow.data.duvod_prist > 0) {
                            //return " ui-disabled grid-disabled-wfl-rp";
                            return "grid-disabled-wfl-rp";
                       // } else if (dataRow && dataRow.data && dataRow.data.aktivita !== 100) {
                       //     return " ui-disabled data-deleted "; // poznamka, neaktivni radky jsou uz odfiltrovany, takže tato část už je zbytečná
                        } else {
                            return " ";
                        }
                    },
                   /* rowsEnabled: function (dataRow) {
                        if(dataRow && dataRow.data && dataRow.data.duvod_prist > 0) {
                            return false;
                        } else {
                            return true;
                        }
                    },*/
                });

            this.LoadAktOpravneniDok(fromSession);
        },
        LoadAktOpravneniDok: function (fromSession) {
            var that = this;
            //  this.findFields().gfield("model", "collect", this.model);

            //nacteni dat do gridu
            this.call("SeznamAktOpravneniDok", { fromSession: fromSession, model: this.model, SessionList: that.AktOpravneniDT || []})
                .done(function (retVal) {
                    that.UserAccess = retVal.UserAccess;
                    that.UserSubjects = retVal.UserSubjects;
                    that.AktOpravneniDT = retVal.AktOpravneniDT;

                    var view = new Gordic.Data.View(retVal.AktOpravneniDT, {
                        key: "nazev",
                        startEmpty: false,
                        processors: {
                            filter: that.filterProcessor
                        }
                    });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    that.gridAktOpravneniDok.ggrid("setData", view, true);  //true = prekresleni gridu
                });
           
        },

        LoadTabOpravneniPid: function (fromSession) {
            var that = this;

            var formPid = new Gordic.Forms.Form({ name: "FormGNPRPid" })
                .addSection({ layoutDescriptor: "L-12-0-0, M-12-0-0, S-12-0-0" })
                .addRow({ label: "jres:26226916" }); //RC 26226916 : Pravidla přidělování oprávnění pro subjekty, automaticky spojované s tímto dokumentem v průběhu jeho životního cyklu.

            $("<div>").appendTo(this.tabOpravneniPid).gform("createFrom", formPid);

            var gridColumnsDefinition = new Gordic.Data.GridFormat()
                .addIconColumn({
                    name: "ico_status",
                    caption: "jres:26226691", //RC 26226691 : Výsledek operace
                    width: 30,
                    customClass: "center",
                    fixedWidth: true,
                    iconTemplate: function (row) {
                        var gr = that.GroupResult;

                        if (gr != null) {
                            var obj = gr.find(function (obj) { return obj.Key == row.id_row; });

                            if (obj != null) {
                                if(obj.IsError === true) {
                                    return { icon: Gordic.Gin.Icons.StavEnum.neprovedeno, tooltip: obj.Error };
                                } else {
                                    return { icon: Gordic.Gin.Icons.StavEnum.provedeno, text: "", tooltip: "" };
                                }
                            }
                        }

                        return null;
                    }
                })
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26226366", //RC 26226366 : Subjektu
                })
                .addTextColumn({
                    name: "uroven_prist_txt",
                    caption: "jres:26226363", //RC 26226363 : Úroveň přístupu
                })
                .addTextColumn({
                    name: "duvod_prist_txt",
                    caption: "jres:26226364", //RC 26226364 : Důvod přidělení přístupu
                })
                .addTextColumn({
                    name: "duvod_txt",
                    caption: "jres:26226365", //RC 26226365 : Zdůvodnění přidělení práv
                })
                .addTextColumn({
                    name: "zmenu_prov_txt",
                    caption: "jres:26225279", //RC 26225279 : Změnu provedl
                });

            this.gridOpravneniPid = $("<div>").appendTo(this.tabOpravneniPid)
                .gautofit()
                .ggrid({
                    name: "GridOpravneniPid",
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit (defaultne by melo byt toto), full
                    navigationMode: "row", // row, cell
                    searchColumns: ["nazev", "uroven_prist_txt", "duvod_prist_txt", "duvod_txt", "zmenu_prov_txt"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                            var l_oParamsJSON = {
                                Ixp: that.Ixp,
                                IdRow: rowData.id_row,
                                Ro: 1,
                                DokumentDTInput: that.DokumentDT
                            };

                            var $div = Gordic.Wfl.Dialogs.GNastaveniPravPIDDlg(that,l_oParamsJSON);

                            $div.on("close", function (ev, retVal) {
                                if (retVal) {
                                    that.DokumentDT = retVal;
                                    that.LoadOpravneniPid(true);
                                }
                            });
                        }
                    }),
                    selection: function (ev, selectionInfo) {
                        if(selectionInfo.count === 1) { // u single modu vzdy 1 ale pro jistotu testuji
                            that.GridSelection(2);
                        }
                    },
                    multi: true,
                    rowsClass: function (dataRow) {
                        if (dataRow && dataRow.data && dataRow.data.aktivita !== 100) {
                            return " ui-disabled data-deleted ";
                        } else {
                            return " ";
                        }
                    },
                });

            this.LoadOpravneniPid(fromSession);
        },
        LoadOpravneniPid: function (fromSession) {
            var that = this;
            //  this.findFields().gfield("model", "collect", this.model);
            //nacteni dat do gridu
            this.call("SeznamOpravneniPid", { fromSession: fromSession, model: this.model, SessionList: that.DokumentDT || []})
                .done(function (retVal) {
                    that.DokumentDT = retVal.DokumentDT;
                    that.UserAccess = retVal.UserAccess;
                    that.UserSubjects = retVal.UserSubjects;
                    //var filterProcessor = new Gordic.Data.FilterProcessor(function (value) {
                    //    if (value.data.aktivita !== 100) {
                    //        return false;
                    //    } else {
                    //        return true;
                    //    }
                    //});
                    
                    var view = new Gordic.Data.View(retVal.DokumentDT, {
                        key: "nazev",
                        processors: {
                            filter: that.filterProcessor
                        }
                    });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    that.gridOpravneniPid.ggrid("setData", view, true);           //true = prekresleni gridu
                });
        },

        LoadTabOpravneniTypDok: function () {
            var that = this;
             
            var formTyp = new Gordic.Forms.Form({ name: "FormGNPRTyp" })
                .addSection()
                    .addRow("jres:26226917") //RC 26226917 : Pravidla spojená s typem dokumentu:
                        .addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), { model: "model.IxsTyp = value.ixs_typ", disabled: true });
  
            $("<div>").appendTo(this.tabOpravneniTypDok).gform("createFrom", formTyp);

            var gridColumnsDefinition = new Gordic.Data.GridFormat()
                .addIconColumn({
                    name: "ico_status",
                    caption: "jres:26226691", //RC 26226691 : Výsledek operace
                    width: 30,
                    customClass: "center",
                    fixedWidth: true,
                    iconTemplate: function (row) {
                        var gr = that.GroupResult;

                        if(gr != null) {
                            var obj = gr.find(function (obj) { return obj.Key == row.id_row; });

                            if (obj != null) {
                                if (obj.IsError === true) {
                                    return { icon: Gordic.Gin.Icons.StavEnum.neprovedeno, tooltip: obj.Error };
                                } else {
                                    return { icon: Gordic.Gin.Icons.StavEnum.provedeno, text: "", tooltip: "" };
                                }
                            }
                        }

                        return null;
                    }
                })
                .addTextColumn({
                    name: "typ_subjektu",
                    caption: "jres:26226361", //RC 26226361 : Typ subjektu
                })
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26226362", //RC 26226362 : Název subjektu
                })
                .addTextColumn({
                    name: "uroven_prist_txt",
                    caption: "jres:26226363", //RC 26226363 : Úroveň přístupu
                })
                .addTextColumn({
                    name: "duvod_prist_txt",
                    caption: "jres:26226364", //RC 26226364 : Důvod přidělení přístupu
                })
                .addTextColumn({
                    name: "duvod_txt",
                    caption: "jres:26226365", //RC 26226365 : Zdůvodnění přidělení práv
                })
                .addTextColumn({
                    name: "zmenu_prov_txt",
                    caption: "jres:26225279", //RC 26225279 : Změnu provedl
                });

            this.gridOpravneniTypDok = $("<div>").appendTo(this.tabOpravneniTypDok)
                .gautofit()
                .ggrid({
                    name: "GridOpravneniTypDok",
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit (defaultne by melo byt toto), full
                    navigationMode: "row", // row, cell
                    searchColumns: ["typ_subjektu", "nazev", "uroven_prist_txt", "duvod_prist_txt", "duvod_txt", "zmenu_prov_txt"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek

                            var l_oParamsJSON = { Ixp: that.Ixp, IdRow: rowData.id_row, Ro: 1, TypDokDTInput: that.TypDokDT };
                            var $div = Gordic.Wfl.Dialogs.GNastaveniPravTypDlg(that,l_oParamsJSON);
                        }
                    }),
                    selection: function (ev, selectionInfo) {
                        if(selectionInfo.count === 1) { // u single modu vzdy 1 ale pro jistotu testuji
                            that.GridSelection(3);
                        }
                    },
                    multi: true,
                    rowsClass: function (dataRow) {
                        if (dataRow && dataRow.data && dataRow.data.duvod_prist > 0) {
                           // return " ui-disabled grid-disabled-wfl-rp";
                            return "grid-disabled-wfl-rp";
                        } else if (dataRow && dataRow.data && dataRow.data.aktivita !== 100) {
                            return " ui-disabled data-deleted ";
                        } else {
                            return " ";
                        }
                    },
                });

            this.LoadOpravneniTypDok();
        },
        LoadOpravneniTypDok: function () {
            var that = this;
            //  this.findFields().gfield("model", "collect", this.model);

            //nacteni dat do gridu
            this.call("SeznamOpravneniTypDok", {})
                .done(function (data) {
                    that.TypDokDT = data;
                    var view = new Gordic.Data.View(data, { key: "nazev" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    that.gridOpravneniTypDok.ggrid("setData", view, true);           //true = prekresleni gridu
                });
        },
        LoadData: function (fromSession) {
            var that = this;
            this.LoadAktOpravneniDok(fromSession);
            this.LoadOpravneniPid(fromSession);
            this.LoadOpravneniTypDok();
        },
        Reload: function () {
            var that = this;
            this.LoadData(true);
        },

        AllowActionsForAllTabs: function () {
            var that = this;
            var l_bPridatCurrentEnabled = this.model.LzeIRPPridatOpravneni;
            var l_bOdebratCurrentEnabled = false;
            var l_bEditovatCurrentEnabled = false;
            var l_bPridatCurrentVisible = true;
            var l_bOdebratCurrentVisible = true;
            var l_bEditovatCurrentVisible = true;
            var l_bZobrazitCurrentVisible = true;

            var l_bPridatCurrentEnabled = true;
            var l_bOdebratPidEnabled = false;
            var l_bEditovatPidEnabled = false;
            var l_bPridatPidVisible = true;
            var l_bOdebratPidVisible = true;
            var l_bEditovatPidVisible = true;
            var l_bZobrazitPidVisible = true;

            var l_bPridatTypVisible = false;
            var l_bOdebratTypVisible = false;
            var l_bEditovatTypVisible = false;
            var l_bZobrazitTypVisible = true;

            this.ZpristupniTlacitkaProTab(1); // aktualni
            this.ZpristupniTlacitkaProTab(2); // pid
            this.AllowActionsForRow(-1, 0, "", 0, this.model.UserAccess, 3); // typ

           /* if(IdTab == 3) { // historie
                l_bPridatButtonVisible = false;
                l_bOdebratButtonVisible = false;
                l_bEditovatButtonVisible = false;
            }*/

            // Aktualni
            this.actions.actOdebratCurrent.visible(l_bOdebratCurrentVisible);
            this.actions.actZmenitCurrent.visible(l_bEditovatCurrentVisible);
            this.actions.actPridatCurrent.visible(l_bPridatCurrentVisible);
            this.actions.actZobrazitCurrent.visible(l_bZobrazitCurrentVisible);
            this.actions.actAplikovatCurrent.visible(this.PrizSpis == 1 && l_bPridatCurrentVisible);
            this.actions.actPrevzitCurrent.visible(this.PrizSpis == 2 && l_bPridatCurrentVisible);

            // Pid
            this.actions.actOdebratPid.visible(l_bOdebratPidVisible);
            this.actions.actZmenitPid.visible(l_bEditovatPidVisible);
            this.actions.actPridatPid.visible(l_bPridatPidVisible);
            this.actions.actOdebratPid.visible(l_bOdebratPidVisible);
            this.actions.actZmenitPid.visible(l_bEditovatPidVisible);
          /*  this.actions.actAplikovatPid.visible(this.PrizSpis == 1 && l_bPridatPidVisible);
            this.actions.actPrevzitPid.visible(this.PrizSpis == 2 && l_bPridatPidVisible);*/

            // Typ
            this.actions.actOdebratTyp.visible(l_bOdebratTypVisible);
            this.actions.actZmenitTyp.visible(l_bEditovatTypVisible);
            this.actions.actPridatTyp.visible(l_bPridatTypVisible);
            this.actions.actZobrazitTyp.visible(l_bZobrazitTypVisible);
        },
        AllowActionsForRow: function (duvodPristupu, IsSubjectMember, IX, UrovenOpravneni, UserAccess, IdTab) {
            var that = this;
            var l_bActionPridatEnabled = false;
            var l_bActionOdebratEnabled = false;
            var l_bActionZmenitEnabled = false;
            var l_bActionZobrazitEnabled = true;

            if (IdTab == 1) { // Aktualni
                l_bActionPridatEnabled = this.model.LzeIRPPridatOpravneni;

                //pokud je subject member tak nemuze editovat
                var l_bCanChange = IsSubjectMember == 0 && l_bActionPridatEnabled;
 
                if(duvodPristupu == 0) {
                    if(UserAccess == 20 || UserAccess == 30 || UserAccess == 50 || UserAccess == 70 && l_bCanChange) { //mam pravo menit && nemenim opravneni sve ci sveho funkcniho mista
                        l_bActionZmenitEnabled = this.WflPristpriusrPar == 1;
                    }
                 
                    //if(UserAccess == 70 && l_bCanChange) {
                    //    l_bActionOdebratEnabled = this.WflPristpriusrPar == 1;
                    //}

                    if(UserAccess == 70) { // viz. TK. Stejná podmínka se řeší výše, ale asi pro 70 bez obledu na l_bCanChange
                        l_bActionZmenitEnabled = this.WflPristpriusrPar == 1;
                    }
                }

                this.actions.actPridatCurrent.enabled(l_bActionPridatEnabled);
               // this.actions.actOdebratCurrent.enabled(l_bActionOdebratEnabled);
                this.actions.actOdebratCurrent.enabled(true); // nově je akce hromadná, takže ji povoluji vždy a kontrolu provádím až v rámci metody mazání
                this.actions.actZmenitCurrent.enabled(l_bActionZmenitEnabled);
                this.actions.actZobrazitCurrent.enabled(l_bActionZobrazitEnabled);

                this.actions.actAplikovatCurrent.enabled(this.PrizSpis == 1 && l_bActionPridatEnabled);
                this.actions.actPrevzitCurrent.enabled(this.PrizSpis == 2 && l_bActionPridatEnabled);

            } else if (IdTab == 2) { // Pid
                l_bActionPridatEnabled = this.model.LzeIRPPridatPravidlo;
              //  l_bActionOdebratEnabled = this.model.LzeIRPPridatPravidlo && duvodPristupu != -1;
                l_bActionZmenitEnabled = this.model.LzeIRPPridatPravidlo && duvodPristupu != -1;

                this.actions.actPridatPid.enabled(l_bActionPridatEnabled);
              //  this.actions.actOdebratPid.enabled(l_bActionOdebratEnabled);
                this.actions.actOdebratCurrent.enabled(true); // nově je akce hromadná, takže ji povoluji vždy a kontrolu provádím až v rámci metody mazání
                this.actions.actZmenitPid.enabled(l_bActionZmenitEnabled);
                this.actions.actZobrazitPid.enabled(l_bActionZobrazitEnabled);

               /* this.actions.actAplikovatPid.enabled(this.PrizSpis == 1 && l_bActionPridatEnabled);
                this.actions.actPrevzitPid.enabled(this.PrizSpis == 2 && l_bActionPridatEnabled);*/
            } else if(IdTab == 3) { // Typ
                this.actions.actPridatTyp.enabled(l_bActionPridatEnabled);
                this.actions.actOdebratTyp.enabled(l_bActionOdebratEnabled);
                this.actions.actZmenitTyp.enabled(l_bActionZmenitEnabled);
                this.actions.actZobrazitTyp.enabled(l_bActionZobrazitEnabled);
            }

        },
        ZpristupniTlacitkaProTab: function (IdTab) {
            var that = this;
            var listSelection = this.GetSelection(IdTab);

            if(listSelection.length == 0) {
                this.AllowActionsForRow(-1, 0, "", 0, this.model.UserAccess, IdTab);
            } else if (listSelection.length == 1) {
                var RowInfoArray = listSelection.split(',');
                var l_nDuvodPristupu = new Number(RowInfoArray[0]);
                var l_nIsSubjectMember = new Number(RowInfoArray[1]);
                var l_sIX = RowInfoArray[2];
                var l_nUrovenOpravneni = new Number(RowInfoArray[3]);
                var l_nUserAccess = new Number(RowInfoArray[4]);

                this.AllowActionsForRow(l_nDuvodPristupu, l_nIsSubjectMember, l_sIX, l_nUrovenOpravneni, l_nUserAccess, IdTab);
            } else {

            }
        },
        GetSelection: function (IdTab) {
            var that = this;
            var selection = null;

            if(IdTab == 1) {
                selection = this.gridAktOpravneniDok.ggrid("getSelection");
            } else if(IdTab == 2) {
                selection = this.gridOpravneniPid.ggrid("getSelection");
            } else if(IdTab == 3) {
                selection = this.gridOpravneniTypDok.ggrid("getSelection");
            } else if(IdTab == 4) {
               // selection = that.gridPoznBloky.ggrid("getSelection");
            }

            return selection;
        },
        GridSelection: function (IdTab) {
            var that = this;
            var selection = this.GetSelection(IdTab);
            
            if(selection.length == 1) {
                var rowData = selection[0];

                var l_nDuvodPristupu = rowData.duvod_prist;
                var l_nIsSubjectMember = rowData.IsUserSubjectMember;
                var l_sIX = rowData.ix;
                var l_nUrovenOpravneni = rowData.uroven_prist;
                var l_nUserAccess = this.model.UserAccess; // GRizenyPristupCommon.UserAccess.ToString()

                this.AllowActionsForRow(l_nDuvodPristupu, l_nIsSubjectMember, l_sIX, l_nUrovenOpravneni, l_nUserAccess, IdTab);
            } else {
                this.AllowActionsForAllTabs();
            }
        },
        PridatCurrentClick: function () {
            var that = this;

            var l_oParamsJSON = {
                Ixp: this.Ixp,
                AktOpravneniDTInput: that.AktOpravneniDT,
                StUtajId: that.StUtajId
            };

            var $div = Gordic.Wfl.Dialogs.GNastaveniPravAktualniDlg(that,l_oParamsJSON);

            $div.on("close", function (ev, retVal) {
                if(retVal) {
                    that.changeDone = true; 
                    that.AktOpravneniDT = retVal;
                    that.LoadAktOpravneniDok(true);
                }
            });
        },
        PridatPidClick: function () {
            var that = this;

            var l_oParamsJSON = {
                Ixp: this.Ixp,
                DokumentDTInput: that.DokumentDT
            };

            var $div = Gordic.Wfl.Dialogs.GNastaveniPravPIDDlg(that,l_oParamsJSON);

            $div.on("close", function (ev, retVal) {
                if(retVal) {
                    that.changeDone = true;
                    that.DokumentDT = retVal;
                    that.LoadOpravneniPid(true);
                }
            });
        },

        OdebratClick: function (idTab) {
            var that = this;
            that.idTab = idTab;

            var selection = this.GetSelection(idTab);

            if(selection.length !== 0) {
          //      var rowData = selection[0];

                var l_oParamsJSON = {
                    model: this.model,
                    "SelectedTabNum": idTab,
                    //Row: rowData,
                    Rows: selection,
                    AktOpravneniDT: that.AktOpravneniDT || [],
                    DokumentDT: that.DokumentDT || []
                };

                this.call(["OdebratOpravneni", l_oParamsJSON])
                    .done(
                        function (data, content) {
                            that.changeDone = true;

                            if(data.GroupResult) {
                                that.GroupResult = data.GroupResult;
                            } 

                            if (that.idTab == 1) {
                                that.AktOpravneniDT = data.AktOpravneniDT;
                                that.LoadAktOpravneniDok(true);
                            } else {
                                that.DokumentDT = data.DokumentDT;
                                that.LoadOpravneniPid(true);
                            }

                        }
                    )
                    .always(function () {

                    });
            } else {
                this.dialogs.alert("jres:26225103"); //RC 26225103 : Není vybrán žádný řádek.
            }
        },

        ZmenitCurrentClick: function () {
            var that = this;

            var selection = this.GetSelection(1);

            if(selection.length !== 0) {
                if(selection.length == 1) {
                    var rowData = selection[0];

                    var l_oParamsJSON = {
                        Ixp: this.Ixp,
                        IdRow: rowData.id_row,
                        AktOpravneniDTInput: that.AktOpravneniDT,
                        StUtajId: that.StUtajId
                    };

                    var $div = Gordic.Wfl.Dialogs.GNastaveniPravAktualniDlg(that, l_oParamsJSON);

                    $div.on("close", function (ev, retVal) {
                        if (retVal) {
                            that.AktOpravneniDT = retVal;
                            that.changeDone = true;

                            that.GroupResult = [{ Key: rowData.id_row, IsError: false, Error: "" }];

                            that.LoadAktOpravneniDok(true);
                        }
                    });
                } else {
                    this.dialogs.alert("jres:26228135"); //RC 26228135 : Vyberte jen jeden řádek
                }
            } else {
                this.dialogs.alert("jres:26225103"); //RC 26225103 : Není vybrán žádný řádek.
            }
        },
        ZmenitPidClick: function () {
            var that = this;

            var selection = this.GetSelection(2);

            if(selection.length !== 0) {
                if(selection.length == 1) {
                    var rowData = selection[0];
                    var l_oParamsJSON = {
                        Ixp: this.Ixp,
                        IdRow: rowData.id_row,
                        DokumentDTInput: that.DokumentDT
                    };

                    var $div = Gordic.Wfl.Dialogs.GNastaveniPravPIDDlg(that,l_oParamsJSON);

                    $div.on("close", function (ev, retVal) {
                        if (retVal) {
                            that.changeDone = true;
                            that.DokumentDT = retVal;



                            that.LoadOpravneniPid(true);
                        }
                    });
                } else {
                    this.dialogs.alert("jres:26228135"); //RC 26228135 : Vyberte jen jeden řádek
                }
            } else {
                this.dialogs.alert("jres:26225103"); //RC 26225103 : Není vybrán žádný řádek.
            }
        },

        ZobrazitRowCurrentClick: function () {
            var that = this;
            var selection = this.GetSelection(1);

            if(selection.length !== 0) {
                if(selection.length == 1) {
                    var rowData = selection[0];

                    var l_oParamsJSON = {
                        Ixp: this.Ixp,
                        IdRow: rowData.id_row,
                        Ro: 1,
                        AktOpravneniDTInput: that.AktOpravneniDT,
                        StUtajId: that.StUtajId
                    };
                    var $div = Gordic.Wfl.Dialogs.GNastaveniPravAktualniDlg(this, l_oParamsJSON); //RO nemělo by dojít ke změně
                } else {
                    this.dialogs.alert("jres:26228135"); //RC 26228135 : Vyberte jen jeden řádek
                }
            } else {
                this.dialogs.alert("jres:26225103"); //RC 26225103 : Není vybrán žádný řádek.
            }
        },
        ZobrazitRowPidClick: function () {
            var that = this;
            var selection = this.GetSelection(2);

            if(selection.length !== 0) {
                if(selection.length == 1) {
                    var rowData = selection[0];

                    var l_oParamsJSON = {
                        Ixp: this.Ixp,
                        IdRow: rowData.id_row,
                        Ro: 1,
                        DokumentDTInput: that.DokumentDT
                    };
                    var $div = Gordic.Wfl.Dialogs.GNastaveniPravPIDDlg(this, l_oParamsJSON);
                } else {
                    this.dialogs.alert("jres:26228135"); //RC 26228135 : Vyberte jen jeden řádek
                }
            } else {
                this.dialogs.alert("jres:26225103"); //RC 26225103 : Není vybrán žádný řádek.
            }
        },
        ZobrazitRowTypClick: function () {
            var that = this;
            var selection = this.GetSelection(3);

            if (selection.length !== 0) {
                if (selection.length == 1) {
                    var rowData = selection[0];

                    var l_oParamsJSON = { Ixp: this.Ixp, IdRow: rowData.id_row, Ro: 1, TypDokDTInput: this.TypDokDT };
                    var $div = Gordic.Wfl.Dialogs.GNastaveniPravTypDlg(this, l_oParamsJSON);
                } else {
                    this.dialogs.alert("jres:26228135"); //RC 26228135 : Vyberte jen jeden řádek
                }
            } else {
                this.dialogs.alert("jres:26225103"); //RC 26225103 : Není vybrán žádný řádek.
            }
        },
        AplikovatClick: function (idTab) {
            var that = this;
            that.idTab = idTab;

            var selection = this.GetSelection(idTab);

            if(selection.length !== 0) {
                if(selection.length == 1) {
                    var rowData = selection[0];

                    var l_oParamsJSON = {
                        "idRow": rowData.id_row,
                        "model": this.model,
                        row: rowData,
                        AktOpravneniDT: that.AktOpravneniDT || []
                    };

                    this.call(["AplikovatOpravneni", l_oParamsJSON])
                        .done(
                            function (data, content) {
                                that.changeDone = true;
                                if(that.idTab == 1) {
                                
                                  //  that.LoadAktOpravneniDok(true);
                                    that.AktOpravneniDT = data.AktOpravneniDT;
                                    that.dialogs.messageBox("Oprávnění", data.Text)
                                } else {
                                    that.LoadOpravneniPid(true);
                                }
                            }
                        )
                        .always(function () {

                        });
                } else {
                    this.dialogs.alert("jres:26228135"); //RC 26228135 : Vyberte jen jeden řádek
                }
            } else {
                this.dialogs.alert("jres:26225103"); //RC 26225103 : Není vybrán žádný řádek.
            }
        },
        PrevzitClick: function () {
            var that = this;

            if(this.IxpSpis != "") {
                var options = {
                    Ixp: this.IxpSpis
                };
                var $div = Gordic.Wfl.Dialogs.GRizenyPristupPrevzitDlg(this,options);

                $div.on("close", function (ev, retVal) {
                    if(retVal) {
                        that.AktOpravneniSpisDT = retVal;
                        var selectedRows = [];

                        retVal.forEach(function (row) {
                            selectedRows.push(row.id_row);
                        });

                        var l_oParamsJSON = {
                            "selectedRows": selectedRows,
                            "model": that.model,
                            AktOpravneniDT: that.AktOpravneniDT || [],
                            AktOpravneniSpisDT: that.AktOpravneniSpisDT || []
                        };

                        that.call(["PrevzitOpravneni", l_oParamsJSON])
                            .done(
                                function (data, content) {
                                    that.changeDone = true;
                                    that.AktOpravneniDT = data.AktOpravneniDT;
                                    that.AktOpravneniSpisDT = data.AktOpravneniSpisDT;
                                 //   if (that.idTab == 1) {
                                        that.LoadAktOpravneniDok(true);
                                  /*  } else {
                                        that.LoadOpravneniPid(true);
                                    }*/
                                }
                            )
                            .always(function () {

                            }
                        );
                    }
                });
            }
        },
        VyslednaOpravneni: function () {
            var that = this;
            var options = {
                Ixp: this.Ixp
            };
            var $div = Gordic.Wfl.Dialogs.GRizenyPristupVyslednaOpravneniDlg(that, options);
        },
        OKClick: function () {
            var that = this;

            return this.call(["UlozitOpravneni", {
                "Ixp": that.Ixp,
                AktOpravneniDT: that.AktOpravneniDT || [],
                DokumentDT: that.DokumentDT || []
            }])
                .done(
                    function (data, content) {
                        that.changeDone = false;

                        that.retValue = true;
                        that.tryClose(true);
                    }
                )
                .always(function () {

                });
        },
        //isAllSaved: function () {

        //    for(i = 0; i < this.opravneniAktListDto.length; i++) {
        //        if(this.opravneniAktListDto[i].status == 2) {
        //            return false;
        //        }
        //    }
        //    for(i = 0; i < this.opravneniPidListDto.length; i++) {
        //        if(this.opravneniPidListDto[i].status == 2) {
        //            return false;
        //        }
        //    }
        //    for(i = 0; i < this.opravneniTypListDto.length; i++) {
        //        if(this.opravneniTypListDto[i].status == 2) {
        //            return false;
        //        }
        //    }

        //    return true;
        //},
        closing: function (afterSave) {
            var that = this;
            var def = $.Deferred();

            if(!afterSave) {
                var dotazDef = $.Deferred();
               // var allSaved = this.isAllSaved(); // todo row se status == 2

                if(that.changeDone) {
                    this.dialogs.messageBox("jres:26227532", //RC 26227532 : Uložení
                        "jres:26227533", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 26227533 : Formulář obsahuje neuložená data. Přejete si je před zavřením uložit?
                        .on("yes", dotazDef.resolve)
                        .on("close", dotazDef.reject);

                    dotazDef.done(function () {
                        return that.call(["UlozitOpravneni", {
                            "Ixp": that.Ixp,
                            AktOpravneniDT: that.AktOpravneniDT || [],
                            DokumentDT: that.DokumentDT || []
                        }])
                            .done(
                                function (data, content) {
                                    that.retValue = true;
                                    def.resolve(that.retValue);
                                }
                            );
                    }).fail(function () {
                        // def.reject(); // pokud bych nechtel okno zavrit
                        def.resolve(that.retValue); // zavru s infem o zmene, pokud nastala
                    });
                } else {
                    def.resolve(this.retValue);
                }
            } else {
                def.resolve(this.retValue);
            }
                       
            return def.promise();
        },
    }, { pure: true });
})(jQuery);